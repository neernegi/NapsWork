import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./src/routes/auth.routes.js";
import postsRoutes from "./src/routes/post.routes.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { accessLogStream } from "./src/utils/logger.js";
import { authLimiter, generalLimiter } from "./src/middleware/rateLimiter.js";
import { corsMiddleware } from "./src/middleware/cors.middleware.js";
import { requestLogger } from "./src/middleware/requestLogger.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Winston request logging
app.use(requestLogger);

// Morgan logging
app.use(morgan("combined", { stream: accessLogStream }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiter
app.use(authLimiter);
app.use(generalLimiter);

// Routes
app.use("/api", authRoutes);
app.use("/api/posts", postsRoutes);

// Health check
app.get("/", (req, res) => res.json({ ok: true }));

// Error Handler
app.use(errorHandler);

export default app;
