const HttpReponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpReponse.serverError()
    }

    const { email, password } = httpRequest.body
    if (!email) {
      return HttpReponse.badRequest('email')
    }
    if (!password) {
      return HttpReponse.badRequest('password')
    }

    const accessToken = this.authUseCase.auth(email, password)
    if (!accessToken) {
      return HttpReponse.unauthorizedUser()
    }

    return HttpReponse.ok()
  }
}
