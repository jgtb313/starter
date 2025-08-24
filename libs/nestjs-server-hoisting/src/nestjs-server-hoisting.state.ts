import type { ControllerOptions, RouteOptions } from '@/interfaces'

type CustomControllerOptions = ControllerOptions & {
	authenticated: boolean
}

type CustomRouteOptions = RouteOptions & {
	operationId: string
}

export type State = {
	controllers: Record<string, CustomControllerOptions>
	routes: Record<string, CustomRouteOptions[]>
}

export class StateManager {
	private static controllers: Record<string, CustomControllerOptions> = {}
	private static routes: Record<string, CustomRouteOptions[]> = {}

	static addController(name: string, options: CustomControllerOptions) {
		const controllerName = `${name}Controller`

		StateManager.controllers[controllerName] = options
	}

	static addRoute(name: string, options: CustomRouteOptions) {
		const previousRoutes = StateManager.routes[name] ?? []

		StateManager.routes[name] = [
			...previousRoutes,
			options,
		]
	}

	static getState(): State {
		return {
			controllers: StateManager.controllers,
			routes: StateManager.routes,
		}
	}

	static getController(target: Function): CustomControllerOptions | undefined {
		return StateManager.controllers[target.name]
	}
}
