export * from './HTTP.port'
export * from './HTTP.support'

type HttpResponses = 200 | 201 | 204 | 401 | 403 | 404 | 409 | 500

type IRouterPathResponses<T extends HttpResponses> = T extends 200 | 201
  ? {
      description?: string
      schema: number
    }
  : {
      description: string
    }

type ResponsesForStatus<T extends HttpResponses> = T extends 200 | 201
  ? IRouterPathResponses<T> | IRouterPathResponses<T>[]
  : IRouterPathResponses<T>[]

export type responses = {
  [T in HttpResponses]?: ResponsesForStatus<T>
}

export const res: responses = {
  200: {
    description: '123123',
    schema: 100,
  },
}
