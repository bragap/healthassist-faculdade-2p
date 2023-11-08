# Sistema de Rotas do Back-end

| Método | Rota                       | Descrição                                         |
|--------|----------------------------|---------------------------------------------------|
| POST   | /usuario/login             | Autenticação do Usuário                           |
| POST   | /usuario                   | Cadastro do Usuário                               |
| POST   | /medico                    | Armazenar dados do médico                         |
| POST   | /especialidade-medico      | Armazenar dados especialidade do medico           |
| POST   | /paciente                  | Armazenar dados do paciente                       |
| POST   | /avaliar-consulta          | Armazenar avaliação da consulta                   |
| POST   | /consulta                  | Armazenar dados da consulta                       |
| PUT    | /medico/{id}/confirmacao   | Atualizar status de confirmação dados do médico   |
| PUT    | /paciente/{id}/confirmacao | Atualizar status de confirmação dados do paciente |
| PUT    | /paciente/{id}             | Alterar dados do paciente                         |
| PUT    | /medico/{id}               | Alterar dados do medico                           |
| GET    | /usuario                   | Informações de todos os usuários                  |
| GET    | /usuario/{id}              | Informação do usuário por id                      |
| GET    | /consultas                 | Informações da consulta                           |
| GET    | /consultas/{id}            | Informações da consulta                           |
| GET    | /medico                    | Informações de todos os médicos                   |
| GET    | /medico/{id}               | Informação do médico pelo id                      |
| GET    | /paciente                  | Informações de todos os pacientes                 |
| GET    | /paciente/{id}             | Informação do paciente pelo id                    |
| GET    | /avaliar-consulta          | Informações da avaliação da consulta              |
| GET    | /especialidade-medico      | Informações das especialidades do medico          |
| GET    | /especialidade-medico/{id} | Informações das especialidades do medico          |
