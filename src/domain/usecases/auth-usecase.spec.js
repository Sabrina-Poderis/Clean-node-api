const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  constructor (LoadUserByEmailRepository) {
    this.LoadUserByEmailRepository = LoadUserByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.LoadUserByEmailRepository.load(email)
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).reject.toThrow(new MissingParamError('email'))
  })
  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com')
    expect(promise).reject.toThrow(new MissingParamError('password'))
  })
  test('Should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepository {
      async load (email) {

      }
    }

    const LoadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
    const sut = new AuthUseCase(LoadUserByEmailRepositorySpy)
    await sut.auth('any_email@email.com', 'any_password')
    expect(LoadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })
})
