import {Request, Response} from 'express';

export const getApi = (req: Request, res: Response) => {
  return res.status(200).send({title: 'Order API'});
};
