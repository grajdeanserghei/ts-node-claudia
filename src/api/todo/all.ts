import * as express from 'express';

import { DocName } from '../../enum/docName';
import { IResult } from '../../interface/result';
import { ITodo } from '../../interface/todo';
import { QueryTodoSchema } from '../../joi/todo';
import { Validator } from '../../joi/validator';
import { FindManyByQuery } from '../commonActions/findManyByQuery';

export const TodoAll = async (req: express.Request): Promise<IResult<ITodo[]>> => {
  const query = await Validator<ITodo>(req.query, QueryTodoSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: query.Title }
  }
  const docs = await FindManyByQuery<ITodo>(conditions, DocName.Todos);
  return { statusCode: 200, data: docs };
};
