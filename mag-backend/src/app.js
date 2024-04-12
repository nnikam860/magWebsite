import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fempreneurmagazine.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import adminRoutes from "./routes/admin.routes.js"
import articleRoutes from "./routes/article.routes.js"


// routes declaration

app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/article", articleRoutes )
app.use("/api/v1/article", articleRoutes)

//http://localhost:8000/api/v1/admin/register

export {app}