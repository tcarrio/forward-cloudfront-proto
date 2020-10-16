import type { NextFunction, Request, RequestHandler, Response } from "express";

const cfHeader = "cloudfront-forwarded-proto";
const xHeader = "x-forwarded-proto";

export const forwardCloudfrontProto: RequestHandler = function(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.headers[cfHeader]) {
    req.headers[xHeader] = req.headers[cfHeader];
  }

  return next();
};

export default forwardCloudfrontProto;
