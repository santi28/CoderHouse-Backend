import express from 'express'

const app = express()
const PORT = process.env.PORT || 8080

app.listen(
  3000,
  console.log(
    `🚀 Server running on url http://localhost:${PORT} 👨‍🚀 Good Luck Astronaut!`
  )
)
