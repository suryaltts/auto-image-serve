import express from 'express'
const store = require('data-store')
import * as path from 'path';
import * as AppConfig from './configs'

const store_ref = new store({
  path: path.join(__dirname, './stats.json')
});

export const init_stats = () => {
  store_ref.set(AppConfig.DEFAULT_STATS)
}

const request_stats = (request: express.Request, response: express.Response) => {
  const statsData = get_all_stats()
  response.send(statsData)
}

export const store_stats = (type: string, value: string) => {
  store_ref.set(type, value); 
}

const get_all_stats = () => {
  return store_ref.data
}

export const updateTotalRequest = () => {
  const _prevCount = store_ref.get("request.total_requests") || 0
  const _newCount = parseInt(_prevCount) + 1
  store_stats("request.total_requests", _newCount.toString())
}

export const updateCacheRequest = () => {
  const _prevCount = store_ref.get("request.cache_hits") || 0
  const _newCount = parseInt(_prevCount) + 1
  store_stats("request.cache_hits", _newCount.toString())
}

export const updateNewRequest = () => {
  const _prevCount = store_ref.get("request.new_hits") || 0
  const _newCount = parseInt(_prevCount) + 1
  store_stats("request.new_hits", _newCount.toString())
}

export const updateRawImageCount = (count: number) => {
  store_stats("images.raw_images", count.toString())
}

export const updateProcessedImageCount = (count: number) => {
  store_stats("images.processed_images", count.toString())
}

export default request_stats