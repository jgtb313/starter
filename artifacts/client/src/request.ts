import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { state } from '@/config'

const client = axios.create()

client.interceptors.request.use((config: AxiosRequestConfig) => {
  return {
    ...config,
    baseURL: state.baseURL(),
    headers: {
      ...config.headers,
      Authorization: state.authorization ? `Bearer ${state.authorization}` : null,
    },
  }
})

client.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error?.response?.data || error)
  },
)

export default client
