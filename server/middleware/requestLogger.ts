import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log the request
  console.log(`📥 ${req.method} ${req.path} - ${timestamp}`);

  // Override res.end to log the response
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any) {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 400 ? "❌" : res.statusCode >= 300 ? "⚠️" : "✅";

    console.log(
      `${statusColor} ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`,
    );

    originalEnd.call(this, chunk, encoding);
  };

  next();
};
