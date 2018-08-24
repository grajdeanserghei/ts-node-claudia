import * as express from 'express'

import { Controller } from '../api/controller'
import { TodoAll, TodoCreate, TodoDetail, TodoList, TodoModify, TodoMultiRemove, TodoRemove, TodoToggle } from '../api/todo'
import { TodoDemo } from '../api/todo/demo';

const router = express.Router()

router
  .get('/hello-world', Controller.api(TodoDemo.controller))
  .get('/todo/list/all', Controller.api(TodoAll.controller))
  .get('/todo', Controller.api(TodoList.controller))
  .get('/todo/:ID', Controller.api(TodoDetail.controller))
  .post('/todo', Controller.api(TodoCreate.controller))
  .put('/todo/:ID', Controller.api(TodoModify.controller))
  .put('/todo/toggle/:ID', Controller.api(TodoToggle.controller))
  .delete('/todo/:ID', Controller.api(TodoRemove.controller))
  .post('/todo/multiRemove', Controller.api(TodoMultiRemove.controller))

export default router
