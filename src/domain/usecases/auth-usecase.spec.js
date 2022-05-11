const { MissingParamError, InvalidParamError } = require('../../utils/errors')

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
    if (!this.LoadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }
    if (!this.LoadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository')
    }
    await this.LoadUserByEmailRepository.load(email)
  }
}

const makeSut = () => {
  class LoadUserByEmailRepository {
    async load (email) {

    }
  }

  const LoadUserByEmailRepositorySpy = new LoadUserByEmailRepository()
  const sut = new AuthUseCase(LoadUserByEmailRepositorySpy)

  return { sut, LoadUserByEmailRepositorySpy }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).reject.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@email.com')
    expect(promise).reject.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, LoadUserByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@email.com', 'any_password')
    expect(LoadUserByEmailRepositorySpy.email).toBe('any_email@email.com')
  })

  test('Should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).reject.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth('any_email@email.com', 'any_password')
    expect(promise).reject.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })
})
