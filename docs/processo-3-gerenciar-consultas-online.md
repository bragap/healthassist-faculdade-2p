### 3.3.5 Processo 3 – GERENCIAR CONSULTA ONLINE

O processo de gerenciamento das consultas online é mister para o funcionamento da uma clíinica onde as atividades dependem de horários marcados pré-definidos para funcionarem, logo a necessidade deste processo. Um bom processo de gerenciamento de horários afeta positivamente o funcionamento da empresa, como a satisfação dos pacientes. Este processo tem como objetivo simplificar o dia a dia do paciente e dos profissionais da clínica, possibilitando aos mesmos acesso direto e facilitado à agenda.


![Exemplo de um Modelo BPMN do PROCESSO 3](images/processo_3_gerenciar_consultas_online.png "Modelo BPMN do Processo 3.")


#### Detalhamento das atividades

Descreva aqui cada uma das propriedades das atividades do processo 6. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente.


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

**Registrar consulta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data | Data  |      dd-mm-aaaa          |       hoje (dd-mm-aaaa)            |
| Horário | Hora  |      hh:mm:ss          |       00:00:00           |
|                 |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar | Fim do Processo 3  |  |
| 