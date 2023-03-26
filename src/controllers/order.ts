import {Request, Response} from 'express';
// eslint-disable-next-line node/no-extraneous-import
import {groupBy} from 'lodash';
import {default as Order} from '../model/order';
import {OrderStatus} from '../model/orderStatus';

let orders: Array<Order> = [];

export const getOrder = (req: Request, res: Response) => {
  const id = req.params.id;
  const order = orders.find(obj => obj.id === Number(id));
  const httpStatusCode = order ? 200 : 404;
  return res.status(httpStatusCode).send(order);
};

export const addOrder = (req: Request, res: Response) => {
  const order: Order = {
    // generic random value from 1 to 100 only for tests so far
    id: Math.floor(Math.random() * 100) + 1,
    userId: req.body.userId,
    quantity: req.body.quantity,
    shipDate: req.body.shipDate,
    status: OrderStatus.Placed,
    complete: false,
  };
  orders.push(order);
  return res.status(201).send(order);
};

export const removeOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const orderIndex = orders.findIndex(item => item.id === id);

  if (orderIndex === -1) {
    return res.status(404).send();
  }

  orders = orders.filter(item => item.id !== id);

  return res.status(204).send();
};

export const getInventory = (req: Request, res: Response) => {
  const grouppedOrders = groupBy(orders, 'userId');
  return res.status(200).send(grouppedOrders);
};
