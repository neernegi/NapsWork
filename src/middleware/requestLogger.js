import { logger } from "../utils/ApiLogger.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log request
  logger.info("Request received", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    body: sanitizeBody(req.body), // Remove sensitive data
  });

  // Capture response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;

    // Log response
    logger.info("Response sent", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: res.get("Content-Length"),
      responseBody: sanitizeResponse(data, res.statusCode),
    });

    originalSend.call(this, data);
  };

  next();
};

// Remove sensitive data from request body
function sanitizeBody(body) {
  const sanitized = { ...body };
  if (sanitized.password) sanitized.password = "****";
  if (sanitized.token) sanitized.token = "****";
  return sanitized;
}

// Sanitize response data
function sanitizeResponse(data, statusCode) {
  if (statusCode >= 400) {
    return data; // Log full error responses
  }

  try {
    const parsed = JSON.parse(data);
    if (parsed.token) parsed.token = "****";
    return JSON.stringify(parsed);
  } catch {
    return data; // Return as-is if not JSON
  }
}
