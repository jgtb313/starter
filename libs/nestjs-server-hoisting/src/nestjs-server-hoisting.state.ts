import { ControllerOptions, RouteOptions } from '@/interfaces'

type CustomRouteOptions = RouteOptions & {
  operationId: string
}

export class StateManager {
  private static controllers: Record<string, ControllerOptions> = {}
  private static routes: Record<string, CustomRouteOptions[]> = {}

  static addController(name: string, options: ControllerOptions) {
    const controllerName = `${name}Controller`

    this.controllers[controllerName] = options
  }

  static addRoute(name: string, options: CustomRouteOptions) {
    this.routes[name] = [...(this.routes[name] ?? []), options]
  }

  static getState(): State {
    return {
      controllers: this.controllers,
      routes: this.routes,
    }
  }

  static getController(target: Function): ControllerOptions | undefined {
    return this.controllers[target.name]
  }
}

export type State = {
  controllers: Record<string, ControllerOptions>
  routes: Record<string, CustomRouteOptions[]>
}
