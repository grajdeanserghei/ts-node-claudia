import * as express from 'express'

import { TodoSchema } from '.'
import { Result } from '../../models/controller/result'
import { DocName } from '../../models/doc-name'
import { Todo } from '../../models/todo'
import { CommonQueryService } from '../../service/common-query.service'
import { Validator } from '../../validation/validator'

const controller = async (req: express.Request): Promise<Result<any>> => {
  
  return { statusCode: 200, data: "Hello world from aws lambda!" }
}

export const TodoDemo = {
  controller
}
