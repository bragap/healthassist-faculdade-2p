### 3.3.2 Processo 2 – GERENCIAR PACIENTE

Apresente aqui o nome e as oportunidades de melhoria para o processo 2. 
Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 2](images/process.png "Modelo BPMN do Processo 2.")


#### Detalhamento das atividades

O cliente acessa o site e realiza a busca pelos profissionais e horários de seu interesse, se o cliente já possui um cadastro, ele é redirecionado para uma tela de login, onde deve inserir seu email e senha para acessar sua conta. Caso o cliente não tenha um cadastro prévio, ele precisa realizar tanto o cadastro quanto o login separadamente, nesse caso, ele preenche as informações necessárias para criar sua conta. 
Após o login ou cadastro bem-sucedidos, o cliente está apto a marcar sua consulta de forma simples e rápida.

Os tipos de dados a serem utilizados são:

* **Área de texto** - campo texto de múltiplas linhas
* **Caixa de texto** - campo texto de uma linha
* **Número** - campo numérico
* **Data** - campo do tipo data (dd-mm-aaaa)
* **Hora** - campo do tipo hora (hh:mm:ss)
* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)
* **Imagem** - campo - contendo uma imagem
* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivos (tradicional radio button ou combobox)
* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)
* **Arquivo** - campo de upload de documento
* **Link** - campo que armazena uma URL
* **Tabela** - campo formado por uma matriz de valores

**Cadastrar paciente**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Cadastrar | Caixa de Texto  |          -      |            -       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar            | Início do proceso de cadastro  |      -             |



