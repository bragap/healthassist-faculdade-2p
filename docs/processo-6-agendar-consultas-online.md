### 3.3.5 Processo 6 – Lembrete de Consulta

Oportunidades de melhorias para este processo incluem que o lembrete de consulta posso ser cusomtizado, com de texto escolhidos pelo usuário. (OPORTUNIDADE)


![Exemplo de um Modelo BPMN do PROCESSO 5](imagens/process.png "Modelo BPMN do Processo 5.")


#### Detalhamento das atividades

O lembrete de consultas acontecerá ao momento que o usuário tem uma consulta se aproximando da data local do sistema. Através de um intervalo de tempo definfido previamente pelo usuário ao tempo do seu cadasdtro, o sistema irá disparar e-mails de acrodo com os respectivos intervalos lemrbando o mesmo da sua consulta.



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

**Lembrete de Consulta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Data e Hora ] | [Data e Hora]  |                |                   |
| [Tabela de Lembretes ] | [Tabela ]  |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Gravar Lembrete ] | Tabela de Lembretes contendo intervalos de tempo definidos pelo usuário  | (Tabela  ) |
