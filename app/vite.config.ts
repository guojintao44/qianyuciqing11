import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

function wecomWebhookProxy(webhookUrl: string | undefined): Plugin {
  return {
    name: "wecom-webhook-proxy",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== "POST" || req.url !== "/api/wecom/booking") return next()

        if (!webhookUrl) {
          res.statusCode = 500
          res.setHeader("Content-Type", "application/json; charset=utf-8")
          res.end(JSON.stringify({ errcode: 500, errmsg: "missing WECOM_WEBHOOK_URL" }))
          return
        }

        let rawBody = ""
        req.on("data", (chunk) => {
          rawBody += chunk
        })

        req.on("end", async () => {
          try {
            const data = rawBody ? JSON.parse(rawBody) : {}

            const name = data?.name ?? ""
            const phone = data?.phone ?? ""
            const wechat = data?.wechat ?? ""
            const service = data?.service ?? ""
            const message = data?.message ?? ""
            const time = new Date().toLocaleString("zh-CN", { hour12: false })

            const wecomPayload = {
              msgtype: "markdown",
              markdown: {
                content:
                  `### 新预约\n` +
                  `- 姓名：${name}\n` +
                  `- 电话：${phone}\n` +
                  `- 微信号：${wechat}\n` +
                  `- 服务类型：${service}\n` +
                  `- 留言：${message}\n` +
                  `- 时间：${time}\n`,
              },
            }

            const wecomRes = await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(wecomPayload),
            })

            const text = await wecomRes.text()
            res.statusCode = wecomRes.status
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.end(text)
          } catch (error) {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.end(JSON.stringify({ errcode: 500, errmsg: String(error) }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const webhookUrl = env.WECOM_WEBHOOK_URL || process.env.WECOM_WEBHOOK_URL

  return {
    base: "./",
    plugins: [wecomWebhookProxy(webhookUrl), inspectAttr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
