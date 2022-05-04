# Clean node API
> API REST em NodeJS usando TDD, Clean Architecture e Design Patterns;

Projeto instruido por [Rodrigo Manguinho](https://www.linkedin.com/in/rmanguinho/) em seu curso de [NodeJs, TDD e Clean Architecture](https://www.youtube.com/playlist?list=PL9aKtVrF05DyEwK5kdvzrYXFdpZfj1dsG)

1. [Project setup](#project-setup)
2. [Decoupling components](#decoupling-components)
3. [Login Router 1/4](#login-router-14)
4. [Login Router 2/4](#login-router-24)
5. [Login Router 3/4](#login-router-34)
6. [Login Router 4/4](#login-router-44)
7. [CI e Jest 1/2](#ci-e-jest-12)
8. [CI e Jest 2/2](#ci-e-jest-22)
9. [Email Validator](#email-validator)

## Project setup
Criação do projeto no GitHub e instação das primeiras dependências do projeto. Dependências: Jest, Lint-Staged, Husky e Standard.

## Decoupling components
Exemplo em que foi ensinado como desacomplar componentes desacoplar de frameworks como express e mongoose.

Foi criado um exemplo de uma rota de cadastro de usuário. A rota POST `'/signup'`:
- recebe os dados `email`, `password` e `repeatPassword`
- verifica se `password` e `repeatPassword` são iguais, se sim:
    - cria o usuário
    - retorna o model `user`
- se `password` e `repeatPassword` não são iguais retorna o status 400, informando o usuário que as senhas devem ser iguais

Segundo o Clean Architecture, devem estar desaclopadas:
- Regras de negócio, em `UseCases`, camada de __Domain__
- Acesso a banco de dados, em `Repository`, camada de __Infra__
- Rotas devem estar desacompladas do framework, em `Router` e `RouterAdapter`, camada de __Presentation__

Essa arquitetura fica bem maior mas bem definida, parece _overengineering_ mas as classes estão reduzidas e bem definidas com uma única responsabilidade.

## Login Router 1/4
Utilização do TDD, do zero e criação de testes unitários do compotente Router

## Login Router 2/4
Desacomplamento de componentes router e utilização de test doubles, no caso um spy, para testar a integração entre dois componentes.

- Código 401: Usado quando o sistema não indentifica o usuário
- Código 403: Usado quando o sistema consegue identificar o usuário mas ele não tem permissão de acesso para executar a determinada ação

## Login Router 3/4
Finalização dos testes unitários relacionados a integração com o use case de autenticação e alguns refactorings para melhorar a legibilidade do código.

## Login Router 4/4
Integração do LoginRouter com um validador de email, sem acoplá-la a nenhum framework.

## CI e Jest 1/2
Utilização do Jest para gerar scripts cada vez mais personalizados, gerar cobertura de testes e gerar um script para rodar sempre antes do push.

## CI e Jest 2/2
Utilização de configurações do Jest para gerar scripts específicos para testes unitários e de integração.

## Email Validator
Criação da classe EmailValidator e como testar uma classe que depende de um framework externo