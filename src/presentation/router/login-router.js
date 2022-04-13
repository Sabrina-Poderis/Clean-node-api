const HttpReponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpReponse.badRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpReponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpReponse.unauthorizedUser()
      }

      return HttpReponse.ok({ accessToken })
    } catch (error) {
      return HttpReponse.serverError()
    }
  }
}
