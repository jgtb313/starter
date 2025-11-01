import axios, {
	type AxiosHeaders,
	type AxiosRequestConfig,
	type AxiosResponse,
} from 'axios'

export type RequestConfig<TData = unknown> = {
	url?: string
	method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
	params?: object
	data?: TData | FormData
	responseType?:
		| 'arraybuffer'
		| 'blob'
		| 'document'
		| 'json'
		| 'text'
		| 'stream'
	signal?: AbortSignal
	headers?: HeadersInit
}

export type ResponseConfig<TData = unknown> = {
	data: TData
	status: number
	statusText: string
}

export type ResponseErrorConfig<TError = unknown> = {
	data: TError
	status: number
	statusText: string
}

const api = axios.create({
	baseURL: 'http://localhost:4000',
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken')

	if (token) {
		config.headers.Authorization = JSON.parse(token)
	}

	return config
})

const client = async <TData, TError = unknown, TVariables = unknown>(
	config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
	const axiosConfig: AxiosRequestConfig = {
		url: config.url,
		method: config.method,
		params: config.params,
		data: config.data,
		responseType: config.responseType as AxiosRequestConfig['responseType'],
		signal: config.signal,
		headers: config.headers as AxiosHeaders,
	}

	console.log({} as TError)

	const response: AxiosResponse<TData> = await api(axiosConfig)

	return {
		data: response.data,
		status: response.status,
		statusText: response.statusText,
	}
}

export default client
