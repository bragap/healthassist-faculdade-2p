### 3.3.3 Processo 1 – GERENCIAR MÉDICO
O processo de Gerenciar Médico tem como objetivo manter um registro preciso e atualizado de todos os profissionais médicos e de saúde associados à clínica, garantindo que eles estejam disponíveis para consultas, atualizando suas informações pessoais e profissionais. Assim, a existência deste cadastro de forma online traz benefícios significativos para a clínica. Isso porque permite a edição das informações e facilita o controle a todos os profissionais.

![Modelo BPMN do PROCESSO 1](images/processo_1_gerenciar_medico.png "Modelo BPMN do Processo 1.")


**Detalhamento das atividades**

**Inserir dados na área de cadastro**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome de usuário | Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Email | Caixa de texto  |    -            |        -           |
| Senha | Caixa de texto  |          Mínimo de 6 caracteres          |        -          |
| Confirmação de Senha | Caixa de texto  |           Mínimo de 6 caracteres        |        -       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar |  Enviar dados para cadastro  | Confirm |

**Realizar login no sistema**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome de usuário | Caixa de texto  |    -            |        -           |
| Senha | Caixa de texto  |          Mínimo de 6 caracteres          |       -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Entrar |  Acessar a plataforma HealthAssist  | Confirm |


**Criar perfil profissional**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome Completo| Caixa de texto  |      Mínimo de 2 caracteres        |           -        |
| Endereço | Caixa de texto  |    -            |        -           |
| Idade | Número  |                |                   |
| Data de Nascimento | Data |        -        |    -               |
| Código de registro | Caixa de texto |        -        |    -               |
| Especialidade médica | Caixa de texto |        -        |    -               |
| Arquivos pessoais | Arquivos |            -            |                   |
| Dia da Semana | Caixa de texto  |       -         |           -        |
| Horário de Início | Hora |    -            |        -           |
| Horário de Fim | Hora |    -            |        -           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Cadastrar |  Enviar dados para cadastro  | Confirm |


**Confirmar registro do profissional**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Exibição dos dados inseridos pelo Profissional | Tabela  |       -         |           -        |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Confirmar |  Cadastra no HealthAssist e envia mensagem por email  | Confirm |
| Cancelar |  Cancela cadastro e envia mensagem por email | Cancel |