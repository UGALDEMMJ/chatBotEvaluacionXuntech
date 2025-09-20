import express from 'express';
import fs from 'fs';
import https from 'https';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiLimiter } from './middleware/rateLimit.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database/connection.js';
import conversacionRouter from './src/routes/conversacionRoutes.js';
import chatRouter from './src/routes/chatRoutes.js';
import preguntasRouter from './src/routes/preguntasRoutes.js';
import respuestasRouter from './src/routes/respuestasRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import { apiKeyValidator } from './middleware/authMiddleWare.js';


function buildApp({ allowedOrigin, apiKey }) {
    const app = express();

    app.disable('x-powered-by');
    app.use(helmet());
    app.use(express.json({ limit: '50kb' }));
    app.use(morgan('tiny'));

    app.use(cors({
        origin: allowedOrigin,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.use('/api/', apiLimiter);


    // Add root route handler
    app.get('/', (req, res) => {
        res.json({
            status: 'ok',
            message: 'API is running'
        });
    });

    app.use('/api/conversacion', apiKeyValidator(apiKey), conversacionRouter);
    app.use('/api/chat', apiKeyValidator(apiKey), chatRouter);
    app.use('/api/preguntas', apiKeyValidator(apiKey), preguntasRouter);
    app.use('/api/respuestas', apiKeyValidator(apiKey), respuestasRouter);
    app.use('/api/user', apiKeyValidator(apiKey),userRouter);

    return app;
}
dotenv.config();

async function server() {
    await connectDB();

    const app = buildApp({
        allowedOrigin: process.env.ALLOWED_ORIGINS,
        apiKey: process.env.API_KEY,
    });

    try {
        const key = fs.readFileSync('./certs/localhost-key.pem');
        const cert = fs.readFileSync('./certs/localhost.pem');

        https.createServer({ key, cert }, app).listen(process.env.PORT, () => {
            console.log(`Server running on https://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    }
}

server().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});