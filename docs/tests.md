## 7. Testes da solução

# Teste de Unidade

**Caso de Teste** | **CT01 - Cadastrar usuário**
 :--------------: | ------------
**Procedimento**  | Cadastrar novo usuário. |
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testNewUser()` |

**Caso de Teste** | **CT02 - Cadastrar usuário já existente**
 :--------------: | ------------
**Procedimento**  | Cadastrar usuário já existente.
**Dados de entrada** | Inserção de dados válidos com nome de usuário já existente no banco.
**Resultado obtido** | Dado não cadastrado.
**Teste unitário associado** | `UsuarioTest.testExistingUser()` |


**Caso de Teste** | **CT03 - Marcar nova consulta**
 :--------------: | ------------
**Procedimento**  | Marcar nova consulta. 
**Dados de entrada** | Selecionar data e horário. |
**Resultado obtido** | Consulta registrada com sucesso. |
**Teste unitário associado** | `UsuarioTest.testNewConsult()` |


**Caso de Teste** | **CT05 - Atualizar anamnese**
 :--------------: | ------------
**Procedimento**  | Atualizar anamnese. 
**Dados de entrada** | Inserção de dados válidos no formulário de atualização. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testAttAnamnese()` |


**Caso de Teste** | **CT06 - Avaliar consulta**
 :--------------: | ------------
**Procedimento**  | Avaliar consulta. 
**Dados de entrada** | Inserção de dados válidos no formulário de avaliação. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testAvConsult()` |


**Caso de Teste** | **CT07 - Avaliar consulta não terminada**
 :--------------: | ------------
**Procedimento**  | Avaliar consulta que não foi terminada. 
**Dados de entrada** | Inserção de dados válidos no formulário de avaliação. |
**Resultado obtido** | Dado não cadastrado. |
**Teste unitário associado** | `UsuarioTest.testNotFinishedAvConsult()` |


## Avaliação dos Testes de Unidade

A análise dos resultados dos testes de unidade proporcionou uma visão aprofundada sobre a solução implementada. Identificamos que os pontos fortes estão alinhados com uma implementação precisa dos requisitos, evidenciando a robustez das funcionalidades testadas. No entanto, ao identificar pontos fracos, destacamos áreas específicas que podem requerer ajustes ou melhorias.

Esses pontos fracos, que podem variar desde inconsistências na lógica de negócios até possíveis melhorias na eficiência operacional, serão tratados proativamente pelo grupo. A abordagem planejada para as próximas iterações do desenvolvimento envolve uma análise aprofundada desses pontos, seguida de ajustes incrementais para aprimorar ainda mais a qualidade e confiabilidade da solução. Essa estratégia reforça nosso compromisso contínuo com a entrega de um software sólido e eficaz.



# Testes de Usabilidade

## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja marcar uma consulta médica. Encontre no sistema um médico disponível na data desejada e agende a consulta.|
| 2             | Você é um doutor que deseja atualizar a anamnese do paciente durante a consulta. |
| 3             | Você é um paciente que deseja avaliar sua última consulta. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja marcar uma consulta médica. Encontre no sistema um médico disponível na data desejada e agende a consulta.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | ~29 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 9.54 segundos |


    Feedback dos usuários: O site foi considerado excelente, com uma interface intuitiva que facilitou a navegação. Não enfrentei dificuldades e percebo que a experiência geral foi bastante intuitiva.




Cenário 2: Você é um doutor que deseja atualizar a anamnese do paciente durante a consulta.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 25.54 segundos                          |
| 2       | SIM             | 4                    | 41.42 segundos                          |
| 3       | SIM             | 3                    | 56.21 segundos                          |
|  |  |  |  |
| **Média**     | 0%           | 4                | ~39 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 38.43 segundos |


    Feedback dos usuários: A parte para atualizar a anamnese não ficou tão intuitiva da primeira vez de uso. Porém, ao acostumar
    com a interface, o uso é mais fluido.

Cenário 3: Você é um paciente que deseja avaliar sua última consulta.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 15.34 segundos                          |
| 2       | SIM             | 5                    | 10.42 segundos                          |
| 3       | SIM             | 5                    | 21.21 segundos                          |
|  |  |  |  |
| **Média**     | 0%           | 100%                | ~16 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Feedback dos usuários: Interface do sistema é bem intuitiva. O site é bonito e é fácil de encontrar a área para
    avaliar as consultas passadas.


## Avaliação dos Testes de Usabilidade

Os resultados dos testes de usabilidade revelam uma taxa de sucesso global de 83% nos cenários, acompanhada por uma satisfação subjetiva média de 4.17. É encorajador observar que os usuários manifestaram feedback positivo, especialmente destacando a facilidade de uso do sistema.

No entanto, a identificação de algumas dificuldades durante a conclusão do primeiro cenário sugere áreas específicas que requerem atenção. O reconhecimento desses desafios serve como um guia valioso para o processo de melhoria contínua. O grupo está comprometido em aprimorar ainda mais a experiência do usuário na próxima iteração do desenvolvimento, concentrando-se nas áreas identificadas e implementando ajustes estratégicos para garantir uma usabilidade excepcional. Essa abordagem reflete nosso compromisso em fornecer não apenas um sistema funcional, mas uma experiência integrada que atenda eficazmente às necessidades e expectativas dos usuários.

