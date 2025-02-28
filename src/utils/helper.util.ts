import { Request, Response } from 'express';

export function returnSuccess(
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  data: any
) {
  const returnResponse = {
    status: 'OK',
    message,
    data,
  };
  return res.status(statusCode).json(returnResponse);
}

export function returnNonSuccess(
  req: Request,
  res: Response,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ status: 'ERROR', message });
}
