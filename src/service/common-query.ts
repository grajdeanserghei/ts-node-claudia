import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  InsertWriteOpResult,
  ObjectID,
  UpdateWriteOpResult,
} from 'mongodb'

import { Convert } from '../helper/convert'
import { Paging } from '../helper/paging'
import { PagingQuery } from '../models/controller/query'
import { Metadata } from '../models/controller/result'
import { DbClient } from './db-client'

const insertOne = async<T>(data: any, collectionName: string): Promise<InsertOneWriteOpResult> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).insertOne(data, { w: 1 })
}

const insertMany = async<T>(data: any[], collectionName: string): Promise<InsertWriteOpResult> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).insertMany(data, { w: 1 })
}

const updateOneById = async<T>(id: string | ObjectID, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const conditions = {
    _id: Convert.toObjectID(id)
  }
  return updateOneByQuery<T>(conditions, update, collectionName)
}

const updateOneByQuery = async<T>(conditions: any, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).updateOne(conditions, update)
}

const updateManyByIds = async<T>(ids: string[] | ObjectID[], update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const conditions = {
    _id: { $in: Convert.toObjectIDs(ids) }
  }
  return updateManyByQuery<T>(conditions, update, collectionName)
}

const updateManyByQuery = async<T>(conditions: any, update: any, collectionName: string): Promise<UpdateWriteOpResult> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).updateMany(conditions, update)
}

const deleteOneById = async<T>(id: string | ObjectID, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const conditions = {
    _id: Convert.toObjectID(id)
  }
  return deleteOneByQuery<T>(conditions, collectionName)
}

const deleteOneByQuery = async<T>(conditions: any, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).deleteOne(conditions)
}

const deleteManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const conditions = {
    _id: { $in: Convert.toObjectIDs(ids) }
  }
  return deleteManyByQuery<T>(conditions, collectionName)
}

const deleteManyByQuery = async<T>(conditions: any, collectionName: string): Promise<DeleteWriteOpResultObject> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).deleteMany(conditions)
}

const findOneById = async<T>(id: string | ObjectID, collectionName: string): Promise<T> => {
  const conditions = {
    _id: Convert.toObjectID(id)
  }
  return findOneByQuery<T>(conditions, collectionName)
}

const findOneByQuery = async<T>(conditions: any, collectionName: string): Promise<T> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).findOne(conditions)
}

const findManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string): Promise<T[]> => {
  const conditions = {
    _id: { $in: Convert.toObjectIDs(ids) }
  }
  return findManyByQuery<T>(conditions, collectionName)
}

const findManyByQuery = async<T>(conditions: any, collectionName: string): Promise<T[]> => {
  const db = await DbClient.getDb()
  return db.collection<T>(collectionName).find(conditions).toArray()
}

const findWithPaging = async<T>(
  conditions: any,
  collectionName: string,
  url: string,
  paging: PagingQuery,
  defaultSortObj: any = { CreateOn: -1 }): Promise<{ data: T[], metadata: Metadata }> => {
  const db = await DbClient.getDb()
  const dbQuery = db.collection<T>(collectionName).find(conditions)
  const count = await dbQuery.count()
  const metadata = Paging.getPaging(count, paging, url, defaultSortObj)
  const data = await dbQuery
    .sort(metadata.sort)
    .skip(paging.Limit * (paging.Page - 1))
    .limit(paging.Limit)
    .toArray()
  return { data, metadata }
}

export const CommonQuery = {
  insertOne,
  insertMany,
  updateOneById,
  updateOneByQuery,
  updateManyByIds,
  updateManyByQuery,
  deleteOneById,
  deleteOneByQuery,
  deleteManyByIds,
  deleteManyByQuery,
  findOneById,
  findOneByQuery,
  findManyByIds,
  findManyByQuery,
  findWithPaging
}
