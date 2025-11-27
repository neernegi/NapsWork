import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
];

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // In development, allow all origins for easier testing
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
});
