### 3.3.5 Processo 5 – ATUALIZAR PRONTUÁRIO

O processo de Atualizar Prontuário tem como objetivo manter registros médicos precisos e atualizados dos pacientes, garantindo que todas as informações relevantes das consultas sejam registradas adequadamente. Isso inclui detalhes sobre o histórico médico, diagnósticos, tratamentos, prescrições e qualquer outra informação importante relacionada às consultas médicas. Este processo modernizado melhora a qualidade da assistência médica, fortalece a conformidade regulatória e aprimora a continuidade do cuidado ao paciente, substituindo eficazmente um processo anteriormente propenso a imprecisões e ineficiências.
 
![Exemplo de um Modelo BPMN do PROCESSO 5](images/processo_5_atualizar_prontuario.png "Modelo BPMN do Processo 5.")



#### Detalhamento das atividades


**Rating dos Profissionais**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Dar nota ao Profissional] | [tipo de dados]  |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Avaliar ] | Número de 1-5 representando qualidade do serviço  | (número  ) |


**Rating da Clínica**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Dar nota a Clinica] | [numéro ]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Avaliar ] | Número de 1-5 representando qualidade do serviço  | (número ) |
|                      |                                |                   |
