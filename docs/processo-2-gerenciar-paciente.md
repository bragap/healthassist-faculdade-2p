### 3.3.2 Processo 2 – GERENCIAR PACIENTE

  Hoje em dia, a gestão de paciente em muitas clínicas ainda se mostra antiquada e pouco eficiente. Ela é conduzida de forma manual, onde um funcionário da clínica é encarregado de registrar as informações pessoais de um paciente. Assim o processo que estamos desenvolvendo tem como objetivo otimizar essa tarefa e reduzir as chances de erros. Agora, o próprio paciente terá a capacidade de cadastrar-se remotamente na plataforma, inserindo suas informações pessoais, seus documentos e receber seus exames de maneira automatizada.


![Modelo BPMN do PROCESSO 2](images/processo_2_gerenciar_paciente.png "BPMN do Processo 2.")


**Detalhamento das atividades**

**Inserir os dados para o cadastro**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Endereço | Caixa de texto  |    -            |        -           |
| Idade | Número  |                |                   |
| Data de Nascimento | Data |        -        |    -               |
| Código de registro | Caixa de texto |        -        |    -               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar |  Enviar dados para cadastro  | Confirm |
| Cancelar |  Cancela envio dos dados  | Cancel |



**Enviar as dúvidas encontradas a secretária**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Ticket | Número  |       -         |           -        |
| Titulo | Caixa de texto |    -            |        -           |
| Descrição | Caixa de texto |    -            |        -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar |  Envia os ticket para análise pela secretária  | Confirm |
| Cancelar |  Cancela envio do ticket  | Cancel |


**Analisar as dúvidas**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Visualizar dados | Tabela  |               |           -        |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Responder |  É direcinado para uma página de para realizar a reposta do ticket | Confirm |
| Cancelar |  Não reponde ao ticket momentaneamente   | Cancel |



**Enviar ao cliente uma resposta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Ticket Resposta | Número  |       -         |           -        |
| Titulo | Caixa de texto |    -            |        -           |
| Descrição | Caixa de texto |    -            |        -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar |  Envia os ticket para análise pela secretária  | Confirm |
| Cancelar |  Cancela envio do ticket  | Cancel |



**Validar os dados inseridos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Visualizar dados | Tabela  |               |           -        |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Confirmar |  Direncionar para a página do perfil | Confirm |
| Cancelar |  Não reponde ao ticket momentaneamente   | Cancel |


**Reescrever os dados**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Endereço | Caixa de texto  |    -            |        -           |
| Idade | Número  |                |                   |
| Data de Nascimento | Data |        -        |    -               |
| Código de registro | Caixa de texto |        -        |    -               |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar |  Enviar dados para atualização do perfil  | Confirm |
| Cancelar |  Cancela envio dos dados  | Cancel |


**Cadastrar e anexar dados médicos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Titulo | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Descrição | Caixa de texto  |    -            |        -           |
| Resultado | Arquivo  |                |                   |
| Data de Resultado | Data |        -        |    -               |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Inserir |  Enviar Dados  | Confirm |
| Cancelar |  Cancelar o envio dos dados  | Cancel |


**Validar os dados inseridos de Anexos de Documentos **
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Visualizar dados | Tabela  |               |           -        |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Aprovar | Confirmar os Anexos fonecidos  | Confirm |
| Desparovar | Confirmar os Anexos fonecidos  | Cancel |
| Cancelar |  Cancelar a validação dados enviado  | Return |

**Enviar resultado dos exames médicos**



| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Titulo | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Descrição | Caixa de texto  |    -            |        -           |
| Resultado | Arquivo  |                |                   |
| Data do Resultado | Data |        -        |    -               |
| Data da Consulta | Data |        -        |    -               |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Inserir |  Enviar Dados  | Confirm |
| Cancelar |  Cancelar a avaliação dos dados  | Return |


**Enviar ao Paciente o motivo da invalidade**
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Titulo | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Descrição | Caixa de texto  |    -            |        -           |
| Resultado | Arquivo  |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Inserir |  Enviar motivos  | Confirm |
| Cancelar |  Cancela envio dos motivos  | Return |

