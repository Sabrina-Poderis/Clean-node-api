# Clean node API
> API REST em NodeJS usando TDD, Clean Architecture e Design Patterns;

Projeto instruido por [Rodrigo Manguinho](https://www.linkedin.com/in/rmanguinho/) em seu curso de [NodeJs, TDD e Clean Architecture](https://www.youtube.com/playlist?list=PL9aKtVrF05DyEwK5kdvzrYXFdpZfj1dsG)

1. [Project setup](##Project-setup)
2. [Decoupling components](##Decoupling-components)

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