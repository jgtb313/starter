import axios, { AxiosResponse, AxiosError } from 'axios'

import { state } from '@/config'

export const request = axios.create()

request.interceptors.request.use((config) => {
  config.baseURL = state.baseURL()

  if (state.authorization) {
    config.headers['Authorization'] = `Bearer ${state.authorization}`
  }

  return config
})

request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error)
  },
)
