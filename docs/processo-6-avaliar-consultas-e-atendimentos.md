### 3.3.4 Processo 6 – AVALIAR CONSULTAS E ATENDIMENTOS

O processo de avaliação do atendimento pode ser útil para mensurar a qualidade do atendimento oferecido pela empresa como um todo. Esse processo de melhoria de qualidade afeta muito positivamente a continuidade da empresa, como aumento da satisfação com os pacientes, reputação, competitividade e eficiência operacional.

![BPMN do PROCESSO 6](images/processo_6_avaliar_consultas_e_atendimentos.png "Processo 6 - Avaliar Consultas e Atendimentos.")


#### Detalhamento das atividades

Descreva aqui cada uma das propriedades das atividades do processo 4. 
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

**Registrar avaliação do atendimento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Avaliar | Seleção única  |      campo com várias opções de valores que são mutuamente exclusivos (min: 1 - max: 5)         |        0            |
| Comentário | Caixa de texto  |      400 caracteres          |                   | 

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar | Fim do Processo 6  |  |


**Avaliar a qualidade através do histórico**
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Período  | Data e Hora  |     (dd-mm-aaaa, hh:mm:ss)       |                  |
| Informações  | Tabela  |            |                  |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Gerar relatório | Fim do Processo 6  |  |
