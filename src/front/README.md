# Sistema de Rotas do FrontEnd

| Arquivo | Rota de destino | Autorização |
| :---         |     :---:      |    :---:      |
| /  | /login    | Public   |
| /login   | /login/paciente ou /login/medico     | Public      |
| /login/paciente   | /paciente/cadastro ou /paciente/home     | Paciente     |
| /login/medico   | /medico/cadastro ou /medico/home     | Médico      |
| /home/paciente   | /paciente/avaliar-consulta      | Paciente    |
