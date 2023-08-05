import { NextFunction, Request, Response } from "express"

class tokenExist {
  public static async handle(request: Request, response: Response , next: NextFunction) {
    const token = request.header('Authorization')
    if (!token) {
      return response.status(401).json({
        status: 'error',
        message: 'Token not provided'
      })
    }
    await next()
  }
}

export default tokenExist
