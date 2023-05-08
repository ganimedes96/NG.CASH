<h1 align="center">
   
   NG.CASH
</h1>
<h2 align="center">
   
  Carteira digital
</h2>

<p align="center">
  Somos o app financeiro da Nova Geração! Uma plataforma tecnológica com tudo o que é necessário para dar início à uma vida financeira responsável e controlada. Nosso propósito é fazer com que a GenZ se torne a geração mais independente com relação ao seu dinheiro, estando preparada para enfrentar todo e qualquer desafio que venha a aparecer!
</p>

<h2>Desafio</h2>
<h3 >
  Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.
</h3>

## 🚀 Technologies

<h3>FRONT-END</h3>


- [NextJs](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindui.com)
- [React-hook-form](https://react-hook-form.com)
- [Zod](https://github.com/colinhacks/zod)
- [ContextAPI](https://reactjs.org/docs/context.html)
- [Axios](https://axios-http.com/docs/intro)
<h3>BACK-END</h3>

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrismaORM](https://www.prisma.io)
- [Postgres](https://www.postgresql.org)
- [Jwt](https://jwt.io)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com)


 **Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/ganimedes96/NG.CASH && cd NG.CASH
```
**Siga as etapas abaixo para instalar as dependências necessárias**

```bash
# Install the dependencies web
# Aplicacao web esta rodando na porta 3000
$ npm install

# Install the dependencies server
# Aplicacao server esta rodando no porta 3001
$ npm install

```
<h2>
   🐋 Rodando no Docker
  
</h2>

**:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. ou na documentação como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
> :information_source: Rode os serviços docker com o comando `docker-compose up -d --build`.
- O postgres esta usando a porta padrão (`5432`), ou adapte, caso queria fazer uso da aplicação localmente;
- Esses serviços irão inicializar um container chamado `NG.CASH-FrondEnd` e outro chamado `prisma-postgres-api`;
- Depois rode os comandos `npm run dev` para inicar a aplicacao `web` e o mesmo comando vale para iniciar o `server`

<h2 align="center">FRONT-END</h2>
<h3>Pagina de Login</h3>
- Para acessar fazer o login na aplicação e necessário inserir um username e password

![Screenshot_5](https://user-images.githubusercontent.com/59948274/205455621-5a0e3c4d-6586-4416-83da-cbdbc887d0ea.png)

<h3>Pagina de cadastro</h3>

Página para realizar o cadastro na plataforma e necessário informar username e password seguindo as seguintes regras, USERNAME: no minimo tres caracteres PASSWORD: no minimo 8 caracters e 1 letra Maiúscula, 1 Caracteres especial e 1 numero 
![Screenshot_1](https://user-images.githubusercontent.com/59948274/205455782-8462ff61-d691-4d12-be2d-381a71ffdbb4.png)

<h3>Dashbord</h3>

 - Nessa pagina e apresentado ao cliente um header com boas vindas e um botao de Logout
 - Um botao de Nova transacao por onde o cliente irar fazer as transações
 - Tres cartoes informando um resumo de suas transacoes entrada, saida e saldo
 - Uma tabela mostrando todas as transacoes que o cliente participou  
![Screenshot_3](https://user-images.githubusercontent.com/59948274/205456395-88ffc39c-9ae0-4da7-85f2-1c772b2eb2ee.png)

<h2 align="center">BACK-END</h2>

<h3>Rota de registro</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/users/register  
{
  "username": "John Doe",
  "password": "Jhondoe@123"
}

```

<h3>Rota de Login</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/login  
{
  "username": "John Doe",
  "password": "Jhondoe@123"
}

```

<h3>Rota para informacoes da conta do usuario</h3>
- <p>Nessa rota e retornado um JSON no seguinte formato</p>

```bash
#Rota GET http://localhost:3001/users/account
{
	"id": "clay3tj0b0000uxz0vcsiem6k",
	"username": "John Doe",
	"accountId": "clay3tj0b0001uxz0ixlptwxm",
	"Account": {
		"balance": 100
	}
}

```
<h3>Rota para fazer as transacoes</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/transactions
{
	"recipient": " Jane Doe",
	"value": 50
}

```

<h3>Rota para fazer a filtragem das transacoes </h3>
- <p>Nessa rota e retornado um JSON no seguinte formato</p>

```bash
#Rota GET http://localhost:3001/transactions/filter
[
	{
		"id": "clb6kl6lt0001ux68gf72ejao",
		"debitedAccountId": "clay3tj0b0001uxz0ixlptwxm",
		"creditedAccountId": "clay1c2bt0001ux988uyyvftu",
		"value": 10,
		"createdAt": "2022-12-02T13:57:09.408Z",
		"debitAccount": {
			"id": "clay3tj0b0001uxz0ixlptwxm",
			"User": [
				{
					"id": "clay3tj0b0000uxz0vcsiem6k",
					"username": "Jhon Doe"
				}
			]
		},
		"creditAccount": {
			"id": "clay1c2bt0001ux988uyyvftu",
			"User": [
				{
					"id": "clay1c2bs0000ux982s40jahp",
					"username": "Jone Doe"
				}
			]
		}
	},
  ]

```

<h3>Para fazer a filtragem das transacoes  sera necessario passar por query as seguintes informacoes</h3>

```bash
  date: "YYYY-MM-DD"
  filter: 'cash-in' ou 'cash-out'
```
