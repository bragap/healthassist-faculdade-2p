# Sistema de Rotas do Back-end

| Método | Rota                  | Descrição                                         |
|--------|-----------------------|---------------------------------------------------|
| POST   | /usuario/login        | Autenticação do Usuário                           |
| POST   | /usuario              | Cadastro do Usuário                               |
| POST   | /usuario/id/medico    | Armazenar dados do médico                         |
| POST   | /usuario/id/paciente  | Armazenar dados do paciente                       |
| POST   | /avaliar-consulta     | Armazenar avaliação da consulta                   |
| POST   | /consulta             | Armazenar dados da consulta                       |
| PUT    | /medico/confirmacao   | Atualizar status de confirmação dados do médico   |
| PUT    | /paciente/confirmacao | Atualizar status de confirmação dados do paciente |
| GET    | /consultas/           | Informações da consulta                           |
| GET    | /medicos/             | Informações do médico                             |
| GET    | /avaliar-consulta/    | Informações da avaliação da consulta              |

