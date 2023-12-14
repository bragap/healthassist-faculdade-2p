# HealthAssist

O objetivo deste trabalho é desenvolver um sistema para facilitar o gerenciamento e os processos de consultas em clínicas médicas.

## Integrantes

* Arthur Ferreira Costa
* Fernando Antônio Ferreira Ibrahim
* Jhonata Silveira Dias
* Pedro Henrique Braga de Castro

## Professor

* Hugo Bastos de Paula
* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho

## Instruções de utilização

### 1 - Instalação de Dependências
#### 1.1 - Docker:

#### Certifique-se de ter o Docker instalado no seu sistema. Siga as instruções no site oficial do Docker para a instalação.
* Navegue até o diretório : 'backend/' e execute o comando docker-compose up --build, para criar as tabelas do Bando De Dados e rodar o BackEnd.
* Certique-se de rodar a aplicação SpringBoot no arquivo main.

### 2 - Acesso à Aplicação:
#### 2.1 - As rotas do BackEnd funcionam na seguinte rota: 'http://localhost:8080', sendo possíveis acessar os seguintes endpoints: 
* /usuario 
* /paciente
* /medico
* /consulta
* /avaliar-consulta

#### 2.2 - Para acessar o FrontEnd, inicia-se no index.html, e posteriormente, acesso à página interna através do login.
* Todas as rotas estão autenticadas, portanto, ao tentar acessar a parte interna, certifique-se de fazer o logout, pois assim limpará o LocalStorage com o tipo de Permissão.

## Histórico de versões

* 0.1.1
    * CHANGE: Atualização das documentações. Código permaneceu inalterado.
* 0.1.0
    * Implementação da funcionalidade X pertencente ao processo P.
* 0.0.1
    * Trabalhando na modelagem do processo de negócio.

