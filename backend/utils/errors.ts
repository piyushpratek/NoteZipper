export class ProjectError extends Error {
  constructor(...args: string[]) {
    super(...args)
    this.name = this.constructor.name
  }
}

export class WaitForTimeoutError extends ProjectError {}
