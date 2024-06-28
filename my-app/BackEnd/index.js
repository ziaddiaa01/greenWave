import express from 'express'
import initApp from './index.router.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

//set directory dirname 
const __dirname=path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path:path.join(__dirname, './config/.env')})

const app = express()
const port = process.env.PORT || 3000

initApp(app,express)
app.listen(port,()=>console.log(`App is listening on port ${port}!`))

