# HealthAssist


**Arthur Ferreira Costa, 1456541@sga.pucminas.br**

**Fernando Antônio Ferreira Ibrahim, 1443215@sga.pucminas.br**

**Ian Matsuhara Ferraz,	1132917@sga.pucminas.br**

**Jhonata Silveira Dias, 1449072@sga.pucminas.br**

**Pedro Henrique Braga de Castro, 1452503@sga.pucminas.br**

---

Professores:

* Hugo Bastos de Paula
* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final, 
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---


## 1. Introdução

Apresentamos o HealthAssist: a solução que simplifica e aprimora a marcação de consultas. Este projeto utiliza tecnologia avançada para aprimorar o processo de agendamento em clínicas.

### 1.1 Contextualização

De acordo com estudos feitos pela Organização Mundial da Saúde (OMS) em 2019, estima-se que a grande maioria dos agendamentos de consultas médicas em alguns países apresentam dificuldades, como longos tempos de espera , falta de vagas e problemas na marcação. Diante do exposto, centenas de pessoas ficam sem atendimento médico pela dificuldade de atendimento em clínicas especializadas, ficando a mercê de sistemas de agendamento de consulta pouco amigáveis e não centralizados, dificultando muito o acesso à saúde para pacientes que têm dificuldade com tecnologia, como pacientes mais idosos. 

### 1.2 Problema

A problemática atual que estamos buscando resolver se refere aos desafios enfrentados no processo tradicional de gerenciamento e agendamento de consultas em clínicas. Esse processo muitas vezes envolve trocas de informações manuais, telefonemas e papelada, resultando em ineficiências operacionais e experiências insatisfatórias para pacientes e profissionais de saúde. 
O agendamento manual pode levar a erros de comunicação, longos períodos de espera e dificuldades na coordenação das agendas dos médicos. Além disso, a falta de visibilidade sobre horários disponíveis pode limitar as opções dos pacientes.


### 1.3 Objetivo geral

O objetivo deste trabalho é desenvolver um sistema para facilitar o gerenciamento e os processos de consultas em clínicas médicas.

#### 1.3.1 Objetivos específicos

Para abordar a grande parte das questões ligadas ao agendamento de consultas, é essencial conceber um software que visa a proporcionar:
* Gerenciamentos de Consultas
* Cadastro de Consultas
* Cadastro de Médicos
* Cadastro de Clientes
* Rating dos profissionais/Atendimentos.
* Lembrete de consulta.

### 1.4 Justificativas

No cenário atual, clínicas médicas enfrentam desafios na organização de horários para pacientes e médicos, resultando em longos tempos de espera e conflitos de agendamento. Pesquisas recentes indicam que a falta de sistemas modernos têm contribuído para erros, perda de informações e dificuldades na recuperação de históricos médicos. Além disso, pacientes frequentemente encontram dificuldades em localizar profissionais qualificados e marcar consultas de forma eficaz, enquanto a ausência de lembretes de consultas tem impactado negativamente a pontualidade e a utilização eficiente dos recursos. Nesse contexto, a proposta de um sistema de reserva de horários visa otimizar agendamentos, melhorar a experiência do paciente e promover uma prática clínica mais eficiente e informada.

## 2. Participantes do processo

* Pacientes: 

Perfil: Indivíduos em busca de atendimento médico.
Características Relevantes: Necessidades de saúde, preferências de horários, histórico médico.
Papel: Utilizar o sistema para agendar consultas, visualizar horários disponíveis, receber lembretes de consultas, acessar informações sobre médicos e clínicas.


* Profissionais de Saúde (Médicos e Equipe Clínica): 

Perfil: Médicos, enfermeiros, especialistas clínicos.
Características Relevantes: Conhecimento médico, expertise clínica, agenda de consultas, especialização, agenda ocupada, necessidade de coordenação eficiente.
Papel: Os profissionais de saúde usarão o sistema para visualizar, atualizar e gerenciar suas agendas de consultas. Eles precisarão de uma visão clara dos horários disponíveis e recursos para ajustar compromissos, garantindo uma distribuição equilibrada de consultas.


* Secretaria: 

Perfil: Equipe administrativa, recepcionistas.
Características Relevantes: Conhecimento da operação da clínica, habilidades de atendimento ao cliente.
Papel: Os administradores serão responsáveis por configurar e manter o sistema, gerenciar usuários, supervisionar o fluxo de consultas e solucionar problemas técnicos, se necessário.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

No cenário atual, o gerenciamento e agendamento de consultas em clínicas médicas ocorrem principalmente de forma manual. Pacientes entram em contato por telefone ou presencialmente para agendar consultas, fornecendo informações pessoais e preferências de horários. As recepcionistas registram essas informações em sistemas rudimentares ou planilhas, o que pode resultar em erros de digitação ou perda de dados. Os médicos e profissionais de saúde muitas vezes mantêm suas próprias agendas em papel ou sistemas pessoais, dificultando a coordenação eficaz.
A falta de um sistema centralizado leva a desafios na atribuição de horários, muitas vezes resultando em longos períodos de espera para os pacientes. As comunicações com pacientes são feitas principalmente por telefone, o que pode levar a problemas de comunicação, como atrasos ou cancelamentos não notificados. A ausência de lembretes automáticos de consultas também pode resultar em ausências ou atrasos de pacientes.
Em resumo, o agendamento e gerenciamento de consultas em clínicas médicas atualmente são conduzidos por meio de processos manuais e comunicação direta, resultando em ineficiências operacionais, falta de sincronização de horários e experiências do paciente aquém do desejado.


### 3.2. Descrição geral da proposta

A visão de futuro para o gerenciamento e agendamento de consultas em clínicas médicas busca uma abordagem automatizada e integrada, melhorando significativamente a eficiência e a experiência do paciente. A transição para um sistema centralizado começa com a introdução de um software funcional para agendamento de consultas. Os pacientes agora podem acessar um portal online, podendo se cadastrar, fornecer suas informações pessoais e preferências de horários, permitindo uma seleção eficiente de slots disponíveis. A implementação de calendários compartilhados simplifica a coordenação de horários dos médicos, eliminando conflitos e reduzindo os tempos de espera. Lembretes automáticos são enviados aos pacientes por mensagens de texto. As comunicações com os pacientes agora são facilitadas por meio de notificações eletrônicas, resultando em maior clareza e menos cancelamentos não notificados. Os médicos e profissionais de saúde podem acessar suas agendas de maneira centralizada, permitindo uma visão geral e facilitando o ajuste de horários. Além de um gerenciamento de tempo eficaz também é importante saber o feedback do paciente, pois ouvir o paciente tem como aspecto primordial para que seu negócio siga em frente e ganhe destaque no mercado. Em resumo, a transição para um sistema de agendamento e gerenciamento de consultas automatizado e integrado resulta em processos otimizados, maior conveniência para os pacientes, coordenação eficiente de horários e uma experiência geral melhorada tanto para pacientes quanto para profissionais de saúde.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Gerenciar profissional de saúde](processo-1-gerenciar-profissionais-de-saude.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Gerenciar paciente](processo-2-gerenciar-paciente.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Gerenciar consulta online](processo-3-gerenciar-consultas-online.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Gerenciar horários](processo-4-gerenciar-horarios.md "Detalhamento do Processo 4.")

[PROCESSO 5 - Realizar consulta](processo-5-realizar-consulta.md "Detalhamento do Processo 5.")

[PROCESSO 6 - Avaliar consultas e atendimentos](processo-6-avaliar-consultas-e-atendimentos.md "Detalhamento do Processo 6.")

## 4. Projeto da solução

O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas cinco seções que descrevem, respectivamente: diagrama de classes, diagrama de componentes, diagrama de entidade-relacionamento, tecnologias utilizadas e guias de estilo.

[Projeto da solução](solution-design.md "Detalhamento do Projeto da solução: classes, componentes, der, tecnologias e guias de estilo.")


## 5. Indicadores de desempenho

O documento a seguir apresenta os indicadores de desempenho dos processos.

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

A sessão a seguir apresenta a descrição do produto de software desenvolvido. 

[Documentação da interface do sistema](interface.md)

## 7. Testes

A sessão a seguir apresenta a descrição dos testes de unidade e testes de usabilidade realizados. 

[Testes do sistema](tests.md)

## 8. Conclusão

_Apresente aqui a conclusão do seu trabalho. Discussão dos resultados obtidos no trabalho, onde se verifica as observações pessoais de cada aluno. Poderá também apresentar sugestões de novas linhas de estudo._

# REFERÊNCIAS


**[1.1]** - _Moura C., Giovanella L., Emmerich A., Theodoro E.. **Tempo de espera e absenteísmo na atenção especializada: um desafio para os sistemas universais de saúde**. Scielo Saúde Pública, Saúde debate 43 (spe5), https://scielosp.org/article/sdeb/2019.v43nspe5/190-204/#

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/arquivo.pdf)


[Vídeo da apresentação final](video/arquivo.mp4)






