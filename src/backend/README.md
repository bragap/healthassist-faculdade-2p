# Sistema de Rotas do Back-end

| Método | Rota                  | Descrição                                         |
|--------|-----------------------|---------------------------------------------------|
| POST   | /usuario/login        | Autenticação do Usuário                           |
| POST   | /usuario              | Cadastro do Usuário                               |
| POST   | /usuario/medico       | Armazenar dados do médico                         |
| POST   | /usuario/paciente     | Armazenar dados do paciente                       |
| POST   | /avaliar-consulta     | Armazenar avaliação da consulta                   |
| POST   | /consulta             | Armazenar dados da consulta                       |
| PUT    | /medico/confirmacao   | Atualizar status de confirmação dados do médico   |
| PUT    | /paciente/confirmacao | Atualizar status de confirmação dados do paciente |
| GET    | /consulta             | Informações da consulta                           |
| GET    | /medico               | Informações do médico                             |
| GET    | /paciente             | Informações do paciente                           |
| GET    | /avaliar-consulta     | Informações da avaliação da consulta              |
