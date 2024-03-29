-- Create Database --
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'healthassist') THEN
    CREATE DATABASE healthassist;
END IF;
END $$;

-- Tabela para armazenar os dias da semana
CREATE TABLE dia_da_semana (
                           id serial PRIMARY KEY,
                           nome_dia character varying(20) check (nome_dia in ('SEGUNDA','TERCA','QUARTA','QUINTA','SEXTA','SABADO','DOMINGO')) not null
);

-- Tabela para armazenar especialidades médicas
CREATE TABLE especialidade (
                          id serial PRIMARY KEY,
                          especialidade character varying(50) COLLATE "pg_catalog"."default"
);

-- Tabela para armazenar informações de usuários
CREATE TABLE usuario (
                         id serial PRIMARY KEY,
                         apelido character varying(50) NOT NULL,
                         email character varying(50) NOT NULL,
                         senha character varying(50) NOT NULL,
                         autorizacao character varying(20) check (autorizacao in ('MEDICO','PACIENTE','ADMINISTRADOR')),
                         data_criacao timestamp DEFAULT now()
);

-- Tabela para armazenar informações de médicos
CREATE TABLE medico (
                        id serial PRIMARY KEY,
                        endereco character varying(255) COLLATE "pg_catalog"."default",
                        data_nasc date,
                        codigo_de_registro character varying(255) COLLATE "pg_catalog"."default",
                        data_criacao timestamp DEFAULT now(),
                        nome_completo character varying(100) COLLATE "pg_catalog"."default",
                        id_usuario integer,
                        aprovacao character varying(20) check (aprovacao in ('APROVADO','REPROVADO','ANALISE')) not null,
                        UNIQUE (codigo_de_registro),
                        FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

-- Tabela relação medico-especialidade
create table medico_especialidade (
                      id_medico int not null,
                      id_especialidade int not null,
                      primary key (id_medico, id_especialidade),
                      foreign key (id_medico) references medico(id),
                      foreign key (id_especialidade) references especialidade(id)
);

-- Tabela para armazenar informações de pacientes
CREATE TABLE paciente (
                          id serial PRIMARY KEY,
                          endereco character varying(255) COLLATE "pg_catalog"."default",
                          data_nasc date,
                          data_criacao timestamp DEFAULT now(),
                          nome_completo character varying(100) COLLATE "pg_catalog"."default",
                          id_usuario integer,
                          aprovacao character varying(20) check (aprovacao in ('APROVADO','REPROVADO','ANALISE')) not null,
                          FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

-- Tabela para armazenar informações de consulta
CREATE TABLE consulta (
                          id serial PRIMARY KEY,
                          id_medico integer,
                          id_paciente integer,
                          data_hora_consulta timestamp,
                          resposta_anamnese text,
                          data_criacao timestamp DEFAULT now(),
                          FOREIGN KEY (id_medico) REFERENCES medico (id),
                          FOREIGN KEY (id_paciente) REFERENCES paciente (id)
);

-- Tabela para avaliar consultas
CREATE TABLE avaliar_consulta (
                                  id_consulta integer,
                                  titulo character varying(100) COLLATE "pg_catalog"."default",
                                  comentario text,
                                  data_criacao timestamp DEFAULT now(),
                                  id serial PRIMARY KEY,
                                  FOREIGN KEY (id_consulta) REFERENCES consulta (id)
);

-- Tabela para armazenar disponibilidade de horários
CREATE TABLE disponibilidade_de_horario (
                                            id_medico integer,
                                            horario_inicio time,
                                            horario_fim time,
                                            id_dia_semana integer,
                                            id serial PRIMARY KEY,
                                            FOREIGN KEY (id_medico) REFERENCES medico (id),
                                            FOREIGN KEY (id_dia_semana) REFERENCES dia_da_semana (id)
);

-- Tabela para armazenar arquivos médicos
CREATE TABLE arquivos_medico (
                                 id_medico integer,
                                 nome_arquivo varchar(255),
                                 tipo_mime varchar(100),
                                 dados_arquivo bytea,
                                 motivo_inviabilidade varchar(255),
                                 id serial PRIMARY KEY,
                                 aprovacao character varying(20) check (aprovacao in ('APROVADO','REPROVADO','ANALISE')) not null,
                                 FOREIGN KEY (id_medico) REFERENCES medico (id)
);

-- Tabela para armazenar arquivos de pacientes
CREATE TABLE arquivos_paciente (
                                   id_paciente integer,
                                   nome_arquivo varchar(255),
                                   tipo_mime varchar(100),
                                   dados_arquivo bytea,
                                   motivo_inviabilidade varchar(255),
                                   id serial PRIMARY KEY,
                                   aprovacao character varying(20) check (aprovacao in ('APROVADO','REPROVADO','ANALISE')) not null,
                                   FOREIGN KEY (id_paciente) REFERENCES paciente (id)
);



-- POVOAMENTO TABELA ESPECIALIDADE

INSERT INTO public.especialidade (especialidade) VALUES ('Clínico Geral');
INSERT INTO public.especialidade (especialidade) VALUES ('Dermatologista');
INSERT INTO public.especialidade (especialidade) VALUES ('Endocrinologista');
INSERT INTO public.especialidade (especialidade) VALUES ('Otorrinolarinogologista');
INSERT INTO public.especialidade (especialidade) VALUES ('Ginecologista');
INSERT INTO public.especialidade (especialidade) VALUES ('Pediatra');
INSERT INTO public.especialidade (especialidade) VALUES ('Urologista');
INSERT INTO public.especialidade (especialidade) VALUES ('Cardiologia');
INSERT INTO public.especialidade (especialidade) VALUES ('Neurologia');
INSERT INTO public.especialidade (especialidade) VALUES ('Oncologista');

-- POVOAMENTO TABELA USUARIO

INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Margot', 'claudine06@example.net', '893609', 'MEDICO', '2023-11-06 21:47:37');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Herman', 'kris.sabryna@example.org', '520511', 'MEDICO', '2023-05-25 16:44:38');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Beth', 'ofriesen@example.com', '958173', 'MEDICO', '2023-09-16 20:41:02');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Rudolph', 'crutherford@example.com', '275259', 'MEDICO', '2023-01-12 17:27:24');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Ibrahim', 'vinnie06@example.com', '703989', 'MEDICO', '2023-01-21 08:57:11');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Amya', 'little.fabiola@example.org', '807273', 'MEDICO', '2023-06-29 06:24:23');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Wava', 'fkshlerin@example.net', '780259', 'PACIENTE', '2023-07-20 16:56:00');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Daisy', 'bashirian.mathilde@example.com', '922321', 'PACIENTE', '2023-11-08 11:50:01');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Jerald', 'janelle.king@example.net', '160516', 'PACIENTE', '2023-07-10 19:44:14');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Barney', 'swift.eugenia@example.com', '421641', 'PACIENTE', '2023-05-25 13:21:25');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Halie', 'adolphus.stiedemann@example.com', '430330', 'PACIENTE', '2023-05-10 07:41:57');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Raheem', 'raymond19@example.org', '546324', 'PACIENTE', '2023-05-29 04:15:31');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Wilbert', 'erica74@example.org', '123933', 'MEDICO', '2023-11-08 16:33:17');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Jade', 'gleichner.tyrique@example.com', '553967', 'MEDICO', '2023-06-10 23:11:01');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Tracy', 'karolann07@example.net', '621962', 'MEDICO', '2023-05-28 04:44:29');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Van', 'jessica.hills@example.org', '733554', 'MEDICO', '2022-12-09 06:03:34');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Elnora', 'sid.ruecker@example.com', '300923', 'MEDICO', '2023-04-24 22:36:50');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Stephon', 'angelita.satterfield@example.com', '361715', 'MEDICO', '2023-02-20 12:28:36');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Caesar', 'jacobs.adelia@example.com', '607206', 'MEDICO', '2023-01-18 20:47:11');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Belle', 'rylee59@example.com', '322868', 'MEDICO', '2023-11-11 03:45:28');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Sonny', 'alexzander02@example.net', '608564', 'MEDICO', '2023-07-03 06:03:13');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Bettye', 'wendy.murazik@example.org', '194016', 'MEDICO', '2022-12-17 18:26:51');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Abagail', 'lemke.braeden@example.net', '808615', 'PACIENTE', '2023-02-09 02:57:56');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Dandre', 'towne.olga@example.com', '296401', 'PACIENTE', '2023-03-01 06:18:35');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Nadia', 'jany.legros@example.net', '529731', 'PACIENTE', '2023-08-28 19:23:30');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Bryon', 'swaniawski.joana@example.org', '906165', 'PACIENTE', '2023-09-23 22:34:06');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Vicky', 'dmcdermott@example.net', '660964', 'PACIENTE', '2023-11-15 21:09:29');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Mya', 'caitlyn41@example.net', '702516', 'PACIENTE', '2023-03-28 14:20:53');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Mary', 'lauretta28@example.org', '402539', 'PACIENTE', '2022-12-01 11:00:42');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Alicia', 'pbeier@example.net', '219927', 'PACIENTE', '2023-08-01 16:38:35');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Wyatt', 'lbahringer@example.org', '613017', 'PACIENTE', '2023-07-03 23:17:54');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Charlotte', 'rodriguez.taya@example.org', '702823', 'PACIENTE', '2023-07-12 20:09:22');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Juston', 'colton.jenkins@example.com', '536977', 'PACIENTE', '2023-04-03 11:29:09');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Maddison', 'ruecker.lucius@example.org', '643350', 'PACIENTE', '2023-03-11 02:12:38');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Sedrick', 'elmo.lemke@example.com', '230864', 'PACIENTE', '2023-07-03 14:05:19');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Golda', 'apagac@example.com', '319373', 'PACIENTE', '2022-12-23 12:32:31');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Kailey', 'giovanny.harris@example.com', '414598', 'PACIENTE', '2023-03-18 13:13:38');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Jennyfer', 'oleta14@example.com', '683577', 'PACIENTE', '2023-08-10 20:41:13');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Jabari', 'bbrown@example.net', '472573', 'PACIENTE', '2023-01-12 23:07:58');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Bridgette', 'predovic.ines@example.com', '411873', 'PACIENTE', '2023-07-25 02:52:34');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Clay', 'gladys.pacocha@example.org', '810887', 'PACIENTE', '2023-04-19 03:24:39');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Piper', 'zwill@example.org', '690474', 'PACIENTE', '2023-05-29 20:50:47');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Kieran', 'jazmyn30@example.com', '681489', 'PACIENTE', '2023-08-12 00:30:26');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Jaylan', 'robert68@example.org', '502868', 'PACIENTE', '2023-01-12 00:16:40');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Pat', 'jblanda@example.org', '191137', 'PACIENTE', '2023-04-08 00:40:20');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Ward', 'cierra.harvey@example.org', '562438', 'PACIENTE', '2023-11-06 23:32:24');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Faustino', 'amina20@example.com', '381676', 'PACIENTE', '2023-11-03 02:03:45');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Dewayne', 'eichmann.jeffrey@example.com', '922236', 'PACIENTE', '2023-10-25 01:13:41');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Rachelle', 'rowena.terry@example.org', '698709', 'PACIENTE', '2023-01-21 20:17:57');
INSERT INTO public.usuario (apelido, email, senha, autorizacao, data_criacao) VALUES ('Hobart', 'uadams@example.org', '593765', 'PACIENTE', '2023-10-27 16:54:25');

-- POVOAMENTO TABELA MEDICO

INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('46838-019, Av. Franco Burgos, 7. Apto 7\nSão Constância - BA', '1982-02-20', '359554', '2023-10-04 09:13:59', 'Dr. Bianca Ramires', 10, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('07054-712, R. Catarina Dias, 535. 8º Andar\nRomero d\Oeste - SE', '1999-10-16', '298345', '2023-05-05 13:23:37', 'Dra. Isabella Ortega Neto', 9, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('30767-363, Av. Ferreira, 2492\nMateus do Norte - RN', '1988-04-10', '350355', '2023-04-06 02:15:29', 'Dra. Beatriz Grego Sobrinho', 4, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('66387-912, R. Carrara, 539. Fundos\nPorto Abgail - SE', '1997-04-06', '134726', '2022-12-20 21:00:05', 'Dr. Noelí Dias Sobrinho', 8, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('34155-256, Avenida Amanda, 355\nDias do Leste - MS', '1977-12-09', '983404', '2023-10-13 00:28:46', 'Dr. Ivan Bonilha Sobrinho', 7, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('84652-027, Avenida de Souza, 8\nPaula do Norte - SP', '2012-03-29', '348115', '2023-10-31 10:16:36', 'Dr. Constância Rosa', 2, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('18955-454, Travessa Andrea Ramos, 1\nPorto Sebastião - SC', '2010-01-02', '477272', '2023-04-06 21:47:14', 'Dr. Matias Alan Fernandes Jr.', 1, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('44083-435, R. Mariana Queirós, 3961\nSão Nádia - AM', '2003-05-05', '306338', '2023-09-27 04:47:53', 'Dr. Fernando Queirós Casanova Jr.', 3, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('15833-851, Av. Christopher, 2. Bloco C\nSepúlveda do Sul - CE', '1980-12-03', '747368', '2022-11-10 22:50:30', 'Dra. Laura Soares de Oliveira', 5, 'ANALISE');
INSERT INTO public.medico (endereco, data_nasc, codigo_de_registro, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('33477-814, Avenida Perez, 0801. Bloco A\nRafael do Leste - AC', '2018-07-24', '215874', '2023-02-20 09:29:14', 'Dr. Simon Queirós Cordeiro Jr.', 6, 'ANALISE');

-- POVOAMENTO TABELA PACIENTE

INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 365', '1974-08-06', '2023-03-10 10:36:36', 'Sr. Christian Thales Corona', 38, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 2953', '1983-12-03', '2022-11-28 15:47:19', 'Dr. João Leon Corona Jr.', 23, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 31', '1975-01-05', '2023-06-06 12:11:54', 'Luzia Galindo', 22, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 059', '1981-03-16', '2021-11-25 06:24:39', 'Dr. Elizabeth Lira', 13, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bloco C', '2002-05-28', '2021-12-05 09:20:07', 'Dr. Samuel Ramires Sobrinho', 24, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 79', '2018-12-22', '2022-11-09 15:51:21', 'Ziraldo Christian Vega', 26, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bloco B', '1987-07-22', '2023-05-12 09:26:43', 'Luis Felipe Reis Filho', 14, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('766º Andar', '2003-07-03', '2022-11-09 17:23:03', 'Dr. Josué Fontes', 42, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('375º Andar', '1986-03-28', '2023-03-17 17:28:08', 'Sr. David Chaves Neto', 49, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('F', '2000-02-14', '2022-04-20 09:06:16', 'Jasmin Feliciano Neto', 46, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 2', '1992-11-16', '2022-07-21 17:50:09', 'Giovane Valdez Rezende Sobrinho', 40, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('1º Andar', '1988-04-26', '2022-12-04 13:47:50', 'Christopher Padrão Neto', 44, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('461º Andar', '1983-11-21', '2022-12-05 12:46:43', 'Hernani Miguel Padilha Neto', 19, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 049', '1980-05-22', '2023-01-20 15:17:29', 'Vitória Isabella Mendes', 18, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bc. 97 Ap. 60', '1998-07-24', '2021-11-29 10:40:19', 'Srta. Nádia Beatriz Matos', 21, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Anexo', '1988-12-19', '2022-03-31 17:29:39', 'Dr. Pablo Barros', 28, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 7', '2017-07-20', '2023-10-10 12:35:29', 'Adriano Mendes Sepúlveda Jr.', 20, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Fundos', '2018-09-27', '2022-03-28 06:49:17', 'Srta. Amélia Luzia Marques', 37, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 90', '1974-06-03', '2022-07-03 16:58:30', 'Dr. Emília Silvana Padilha Filho', 16, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('52º Andar', '2000-10-03', '2023-04-01 08:10:05', 'Srta. Catarina Norma Quintana', 50, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bc. 76 Ap. 58', '1985-02-17', '2022-01-10 11:25:45', 'Sr. Eduardo Mendes Sobrinho', 47, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bloco A', '1983-08-17', '2022-09-22 11:23:03', 'Dr. Suzana Verdara da Rosa', 12, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 1638', '1984-01-04', '2023-03-24 13:02:25', 'Dr. João Chaves Burgos Sobrinho', 11, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('520º Andar', '1988-08-09', '2022-11-10 17:26:26', 'Pâmela Nicole Grego', 33, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('F', '1979-03-20', '2022-03-09 12:29:17', 'Dr. Natal Burgos Espinoza Sobrinho', 48, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Fundos', '1984-09-03', '2023-03-08 06:44:21', 'Martinho Martinho Aranda Sobrinho', 17, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Fundos', '2000-09-17', '2022-11-14 10:07:51', 'Dr. José Dante Queirós Neto', 25, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bloco B', '2001-06-17', '2022-06-03 12:25:22', 'Sebastião Urias', 27, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('83º Andar', '1992-01-22', '2022-04-20 09:00:59', 'Srta. Giovana Escobar Neto', 39, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Anexo', '2011-04-29', '2021-12-27 13:17:00', 'Adriano Bittencourt', 30, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Apto 2', '2001-03-11', '2023-11-14 11:19:20', 'Srta. Madalena Batista Fonseca Jr.', 31, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('08º Andar', '1986-05-14', '2023-01-21 08:09:07', 'Ketlin Valência', 36, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('F', '1976-05-09', '2022-02-17 12:25:06', 'Sra. Emília Rico Rocha Filho', 32, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bloco B', '2013-01-22', '2023-01-25 17:12:31', 'Dr. Jácomo Santana Neto', 34, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('47º Andar', '1982-12-20', '2022-12-08 06:09:43', 'Sra. Andrea Garcia Dominato', 35, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('2º Andar', '2007-05-18', '2022-10-05 11:35:52', 'Dr. Maximiano Azevedo', 29, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('998º Andar', '2006-03-13', '2022-06-28 08:16:01', 'Ivana Carmona Ferreira', 41, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('F', '1982-01-16', '2022-02-11 15:21:44', 'Sra. Alexa Brito Delatorre', 43, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Bc. 8 Ap. 34', '1999-06-06', '2023-01-09 14:38:40', 'Fábio Santana Marques Sobrinho', 15, 'ANALISE');
INSERT INTO public.paciente (endereco, data_nasc, data_criacao, nome_completo, id_usuario, aprovacao) VALUES ('Anexo', '1978-06-08', '2022-03-14 10:26:03', 'Elias Serrano Faro', 45, 'ANALISE');

-- POVOAMENTO TABELA CONSULTA

INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (1, 1, '2023-03-31 11:48:02', 'Deserunt sint aut esse cupiditate molestiae eius. Et dicta voluptates hic et nisi quaerat. Explicabo id quo atque et dolor occaecati velit.', '2023-05-08 21:58:39');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (2, 2, '2023-07-18 12:37:03', 'Veniam sunt asperiores et quasi. Perspiciatis sed et perspiciatis molestiae aut. Illum a placeat ab.', '2022-10-13 18:25:02');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (3, 3, '2021-11-26 07:15:00', 'Velit et iusto expedita quo. Illo dicta unde sint ut. Soluta blanditiis sit ratione ut expedita sed eius.', '2022-01-19 03:07:36');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (4, 4, '2023-07-19 12:37:06', 'Sint minima fugiat voluptates vitae unde. Dolor neque quam tenetur necessitatibus qui quis hic. Quia voluptatum labore asperiores et odit.', '2022-01-24 08:23:36');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (5, 5, '2023-05-24 12:45:28', 'Qui sed ullam et repellat sit modi consectetur eum. Fugiat labore qui placeat eos voluptatem. Et quas a et numquam ut.', '2023-11-09 04:31:46');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (6, 6, '2023-07-17 13:16:09', 'Aut non consequatur consequatur culpa. Est quidem est fugiat velit corporis autem sunt. Accusantium qui sint esse qui.', '2023-07-25 12:05:13');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (7, 7, '2022-04-07 18:26:25', 'Eos dolorem quia iste optio. Sit explicabo rem sunt. Et ipsa dolores fuga qui. Fugiat quos ut qui explicabo soluta rerum.', '2022-01-05 22:58:44');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (8, 8, '2023-05-25 14:21:49', 'Tenetur enim et provident ex quam fugiat. Enim velit voluptatibus aut delectus autem sunt sunt.', '2022-03-17 20:50:48');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (9, 9, '2023-09-01 14:03:10', 'Qui repudiandae excepturi ea sit. Nisi et inventore qui aut minima ut. Porro dolorem aut soluta modi eos. Ab officia ipsa in quos.', '2021-12-20 01:13:29');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (10, 10, '2022-12-23 12:15:18', 'Sint provident odit quia. Possimus tempore voluptatem cum nihil. Voluptas aut sit doloribus totam. In magni iure vero excepturi et.', '2022-09-03 01:19:26');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (1, 11, '2022-06-10 19:43:37', 'Dignissimos eligendi impedit qui tempore voluptatum voluptatem dolorem. Ab qui maxime ut quia in praesentium. Ea ut unde totam non.', '2022-09-26 10:00:25');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (2, 12, '2021-12-21 13:40:41', 'Ut dolores architecto voluptate et explicabo et. Quisquam soluta unde provident non magni ut laudantium. Eos in veritatis voluptas dolorem soluta.', '2022-11-16 03:49:42');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (3, 13, '2022-06-16 07:45:39', 'Expedita praesentium voluptas est nesciunt velit quidem. Dolor dicta id quia quia unde minus sapiente. Veniam voluptatum dolorem illo quo totam odio.', '2023-05-22 23:05:49');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (4, 14, '2022-04-27 12:03:04', 'Et rem dolores esse corrupti hic est assumenda. Necessitatibus accusantium sint dolorem dolorum sed. Ea cumque repellat eum omnis ab.', '2023-08-16 16:05:36');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (5, 15, '2022-09-20 10:51:59', 'Quasi vel cupiditate expedita. Facilis ad et consectetur tempora. Doloribus autem voluptatem officiis hic quibusdam maiores.', '2022-04-21 05:09:03');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (6, 16, '2022-08-01 16:30:45', 'Harum aut sit est harum. Et eos voluptas sit.', '2023-10-17 00:03:01');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (7, 17, '2023-08-06 17:46:34', 'Omnis esse qui voluptates est. Dicta earum sed qui fuga porro repellat. Laudantium dolores quam et non aliquam omnis.', '2023-10-02 16:01:38');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (8, 18, '2022-03-26 14:22:05', 'Consequatur deserunt harum nihil saepe molestiae qui assumenda. Voluptas et numquam inventore. Architecto quia fugiat cumque dicta.', '2022-08-22 05:54:55');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (9, 19, '2022-04-14 16:49:15', 'Exercitationem ab asperiores placeat in. Qui ipsam nisi autem molestias qui quia molestiae. Et dolores ea eaque.', '2023-07-03 07:11:42');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (10, 20, '2022-02-07 12:16:47', 'Fuga ut quos nesciunt reiciendis ut consectetur est. Nulla animi rerum culpa error expedita. Error officia nam minus doloribus.', '2022-08-22 06:02:45');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (1, 21, '2022-04-26 10:56:21', 'Quas eum consequatur beatae eveniet. Ipsam praesentium aliquid sint molestias. Id ut voluptatem cumque esse quia ut.', '2023-04-26 22:57:05');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (2, 22, '2023-02-23 17:42:10', 'Voluptatem omnis dolores deleniti aut. Nam autem nesciunt minima est vero facilis et. Esse dicta sit perspiciatis voluptas deserunt.', '2022-09-26 06:09:38');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (3, 23, '2022-03-11 11:22:35', 'Voluptas in quaerat magni quis voluptatem illum explicabo. Non sed sapiente libero nihil corrupti qui. Omnis at error ea exercitationem facilis.', '2022-11-20 05:58:50');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (4, 24, '2023-03-14 17:19:36', 'Inventore non hic enim saepe consequatur quasi. In quisquam pariatur quis deserunt illo aut impedit. Rerum sed fugit sequi. Illum rem illum et ipsum.', '2023-06-25 04:53:16');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (5, 25, '2022-10-16 15:57:49', 'Nihil saepe sequi et et nihil pariatur mollitia consequatur. Ipsum illum ut fuga debitis quo et nihil aliquam.', '2023-06-21 01:16:17');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (6, 26, '2022-11-27 14:37:56', 'Earum qui quaerat voluptatibus atque quos et. Sint maxime eveniet tempora. Veniam repellat sit nam a odio.', '2023-01-27 10:27:15');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (7, 27, '2022-07-15 10:17:05', 'Expedita assumenda quos dolores ea rem quam rerum. Nobis qui nisi ea.', '2023-07-14 21:14:08');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (8, 28, '2022-12-16 14:45:44', 'Beatae modi voluptatem quisquam ipsum id harum. Facere excepturi minus aperiam est quo velit error. Minima provident velit ab deserunt vero quia.', '2023-04-14 06:57:44');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (9, 29, '2023-10-06 14:21:30', 'Aliquam quis quia omnis enim eum sed suscipit. Ad aut dolorum quos. Consequatur illum rerum quo fugiat quae deserunt molestias.', '2022-08-05 04:08:22');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (10, 30, '2021-12-15 19:10:45', 'Debitis quis magni reiciendis reprehenderit. Voluptatem quia officia maxime quasi magnam. Dolor eos corporis reiciendis vitae et nisi.', '2022-12-10 09:47:07');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (1, 31, '2023-08-27 06:55:04', 'Cupiditate ea omnis voluptatum soluta. Aut et rerum est quaerat sint magni consectetur. Facere eveniet aut voluptatum cupiditate.', '2022-04-16 20:40:05');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (2, 32, '2023-07-29 12:42:52', 'Error inventore dolore quis unde pariatur. Unde rerum molestiae fuga provident nesciunt. Doloremque quas veniam quia sequi iure adipisci.', '2022-09-17 20:42:31');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (3, 33, '2023-06-21 10:40:26', 'Illum sequi aut at qui. Quae quia voluptas repellendus earum laborum. Inventore iste dolores aliquam illo cumque quo.', '2022-04-09 20:13:41');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (4, 34, '2022-05-27 08:07:45', 'Sed quod in sequi accusantium. Minima incidunt sit sit adipisci.', '2023-11-05 08:35:21');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (5, 35, '2022-06-19 06:52:40', 'Et tempore autem eum. Est eius quae rerum dolorum pariatur.', '2022-03-21 13:40:34');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (6, 36, '2022-06-21 08:43:44', 'Tempora totam et ut quod quas quis. Sunt et ut dolor voluptatem vero. Molestias eos consectetur asperiores.', '2022-02-17 13:06:26');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (7, 37, '2022-01-14 08:36:54', 'Consequatur quas vitae harum consequuntur consequatur odit ut nostrum. Earum iure omnis delectus iure reiciendis.', '2023-10-03 15:31:12');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (8, 38, '2023-07-29 12:03:00', 'Aut explicabo accusantium et et voluptas impedit. Totam nobis ex assumenda ut assumenda ut. Id ab aut ut laboriosam beatae alias quasi rerum.', '2023-01-05 13:13:48');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (9, 39, '2022-02-09 18:37:16', 'Accusamus dolores nisi similique. Totam alias fugiat et laborum. Fugit quae fugit autem aut ut. Reprehenderit officia fuga ducimus qui qui.', '2022-10-27 07:19:18');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (10, 40, '2023-06-24 14:57:52', 'Qui repellat dolor qui ex deleniti. Accusantium voluptatem velit praesentium cum quod laboriosam. Sequi facere id sed est.', '2022-09-05 20:18:42');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (1, 1, '2023-04-01 05:33:07', 'Labore minima aspernatur eum placeat sit quia. Officiis ipsam et accusamus fuga.', '2022-12-28 01:24:16');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (2, 2, '2023-10-01 10:58:44', 'Placeat dolorum inventore ab est eos dolor. Aspernatur eius nihil natus. Omnis incidunt molestiae esse voluptatem voluptatem ea.', '2023-03-14 14:23:01');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (3, 3, '2022-12-28 14:12:13', 'Omnis accusantium labore possimus earum. Eum qui officia enim molestiae consequatur.', '2022-03-08 16:19:09');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (4, 4, '2022-12-27 06:17:32', 'Non ea aut necessitatibus reiciendis. Exercitationem non ut fuga hic dignissimos id.', '2022-03-22 13:16:39');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (5, 5, '2022-12-18 20:27:18', 'Veniam maiores nihil quis dolorem dolorem. Non accusamus provident ipsum ab. Est nesciunt in quis dolores.', '2022-07-22 20:53:38');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (6, 6, '2023-11-01 10:04:34', 'Aut praesentium assumenda ut rem accusamus. Eum quis quo aut qui cum dolorum ab. Quo blanditiis quo corrupti nam eos dolorum.', '2023-05-28 13:23:16');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (7, 7, '2023-07-15 21:24:50', 'Aspernatur vero eveniet ut amet laborum perspiciatis maxime expedita. Autem aut ut eos eaque ut. Sit velit nihil pariatur porro est voluptatem quia.', '2023-09-09 05:02:24');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (8, 8, '2023-07-04 10:53:29', 'Qui aliquam sint dicta id saepe. Ipsum cupiditate voluptatibus ea explicabo. Quam nulla ex nulla et enim.', '2023-05-08 10:40:49');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (9, 9, '2023-05-29 10:03:54', 'Quibusdam deleniti molestiae quam eos assumenda odit. Harum reiciendis assumenda est aliquid autem. Labore possimus esse adipisci.', '2022-02-23 19:43:25');
INSERT INTO public.consulta (id_medico, id_paciente, data_hora_consulta, resposta_anamnese, data_criacao) VALUES (10, 10, '2022-04-26 11:47:31', 'Nostrum qui labore facilis enim dolorem distinctio et. Minus consequuntur natus consequatur dolor consectetur quae eum.', '2023-02-19 11:39:45');

-- POVOAMENTO TABELA AVALIAR_CONSULTA


INSERT INTO avaliar_consulta (id_consulta, titulo, comentario) VALUES
           (1, 'Atendimento do Médico', 'Excelente atendimento, médico muito atencioso.'),
           (2, 'Atendimento da Clínica', 'A clínica possui uma ótima estrutura e equipe.'),
           (3, 'Críticas e Sugestões', 'Gostaria de sugerir melhorias na recepção.'),
           (4, 'Atendimento da Clínica', 'Fui bem recebido, mas o tempo de espera foi longo.'),
           (5, 'Atendimento do Médico', 'Consulta rápida e eficiente, médico experiente.'),
           (6, 'Críticas e Sugestões', 'O ambiente da clínica poderia ser mais acolhedor.'),
           (7, 'Atendimento do Médico', 'Médico atencioso, explicou tudo de forma clara.'),
           (8, 'Atendimento da Clínica', 'Tempo de espera aceitável, equipe educada.'),
           (9, 'Críticas e Sugestões', 'Sugiro mais opções de revistas na sala de espera.'),
           (10, 'Atendimento do Médico', 'Consulta rápida, mas eficaz.'),
           (11, 'Atendimento da Clínica', 'A clínica poderia ter mais estacionamento.'),
           (12, 'Críticas e Sugestões', 'Gostaria de elogiar a limpeza do local.'),
           (13, 'Atendimento do Médico', 'Médico experiente, diagnóstico preciso.'),
           (14, 'Atendimento da Clínica', 'A equipe foi prestativa em todo o processo.'),
           (15, 'Críticas e Sugestões', 'Sugiro uma área de recreação para crianças.'),
           (16, 'Atendimento do Médico', 'Consulta pontual, sem atrasos.'),
           (17, 'Atendimento da Clínica', 'A sala de espera é confortável.'),
           (18, 'Críticas e Sugestões', 'Poderiam oferecer café na recepção.'),
           (19, 'Atendimento do Médico', 'Médico gentil, explicou todas as opções de tratamento.'),
           (20, 'Atendimento da Clínica', 'O sistema de agendamento online é prático.'),
           (21, 'Críticas e Sugestões', 'Mais opções de especialidades seriam ótimas.'),
           (22, 'Atendimento do Médico', 'Consulta eficiente, médico atencioso.'),
           (23, 'Atendimento da Clínica', 'A recepcionista foi muito educada.'),
           (24, 'Críticas e Sugestões', 'Sugiro uma área de espera exclusiva para idosos.'),
           (25, 'Atendimento do Médico', 'Médico dedicado, ouviu minhas preocupações.'),
           (26, 'Atendimento da Clínica', 'A clínica está bem localizada.'),
           (27, 'Críticas e Sugestões', 'Seria útil ter um sistema de lembrete de consulta por SMS.'),
           (28, 'Atendimento do Médico', 'Boa variedade de especialidades na clínica.'),
           (29, 'Atendimento da Clínica', 'A espera foi compensada pelo atendimento.'),
           (30, 'Críticas e Sugestões', 'Sugiro mais informações sobre os médicos online.'),
           (31, 'Atendimento do Médico', 'Consulta rápida, médico eficiente.'),
           (32, 'Atendimento da Clínica', 'A sala de espera é espaçosa e bem iluminada.'),
           (33, 'Críticas e Sugestões', 'Gostaria de sugerir uma área de descanso.'),
           (34, 'Atendimento do Médico', 'Médico pontual, explicou detalhadamente o tratamento.'),
           (35, 'Atendimento da Clínica', 'A clínica poderia ter mais opções de exames.'),
           (36, 'Críticas e Sugestões', 'Sugiro um sistema de agendamento mais flexível.'),
           (37, 'Atendimento do Médico', 'Atendimento humanizado, médico empático.'),
           (38, 'Atendimento da Clínica', 'Facilidade de estacionamento na clínica.'),
           (39, 'Críticas e Sugestões', 'Acho que a clínica pode melhorar na organização.'),
           (40, 'Atendimento do Médico', 'Médico experiente, consultório bem equipado.'),
           (41, 'Atendimento da Clínica', 'A recepção poderia ser mais ágil.'),
           (42, 'Críticas e Sugestões', 'Gostaria de sugerir um sistema de pagamento online.'),
           (43, 'Atendimento do Médico', 'Consulta foi além das minhas expectativas.'),
           (44, 'Atendimento da Clínica', 'A clínica oferece um ambiente tranquilo.'),
           (45, 'Críticas e Sugestões', 'Sugiro uma área de espera exclusiva para gestantes.'),
           (46, 'Atendimento do Médico', 'Médico atencioso, respondeu todas as dúvidas.'),
           (47, 'Atendimento da Clínica', 'A clínica poderia ter mais informações online.'),
           (48, 'Críticas e Sugestões', 'Sugiro uma área de espera para casos de emergência.'),
           (49, 'Atendimento do Médico', 'Consulta eficiente, médico competente.'),
           (50, 'Críticas e Sugestões', 'Gostaria de sugerir mais opções de horários para agendamento.');

-- POVOAMENTO TABELA DIA DA SEMANA

insert into dia_da_semana (nome_dia) values
           ('DOMINGO'),('SEGUNDA'),('TERCA'),('QUARTA'),('QUINTA'),('SEXTA'),('SABADO');

-- POVOAMENTO TABELA MEDICO ESPECILIDADE

INSERT INTO public.medico_especialidade VALUES (1, 7);
INSERT INTO public.medico_especialidade VALUES (1, 9);
INSERT INTO public.medico_especialidade VALUES (1, 10);
INSERT INTO public.medico_especialidade VALUES (2, 7);
INSERT INTO public.medico_especialidade VALUES (2, 1);
INSERT INTO public.medico_especialidade VALUES (2, 2);
INSERT INTO public.medico_especialidade VALUES (3, 7);
INSERT INTO public.medico_especialidade VALUES (3, 3);
INSERT INTO public.medico_especialidade VALUES (3, 1);
INSERT INTO public.medico_especialidade VALUES (4, 5);
INSERT INTO public.medico_especialidade VALUES (4, 1);
INSERT INTO public.medico_especialidade VALUES (4, 3);
INSERT INTO public.medico_especialidade VALUES (4, 8);
INSERT INTO public.medico_especialidade VALUES (5, 1);
INSERT INTO public.medico_especialidade VALUES (5, 4);
INSERT INTO public.medico_especialidade VALUES (5, 2);
INSERT INTO public.medico_especialidade VALUES (6, 1);
INSERT INTO public.medico_especialidade VALUES (6, 9);
INSERT INTO public.medico_especialidade VALUES (6, 10);
INSERT INTO public.medico_especialidade VALUES (7, 2);
INSERT INTO public.medico_especialidade VALUES (7, 1);
INSERT INTO public.medico_especialidade VALUES (7, 10);
INSERT INTO public.medico_especialidade VALUES (8, 1);
INSERT INTO public.medico_especialidade VALUES (8, 10);
INSERT INTO public.medico_especialidade VALUES (9, 1);
INSERT INTO public.medico_especialidade VALUES (9, 4);
INSERT INTO public.medico_especialidade VALUES (10, 1);
INSERT INTO public.medico_especialidade VALUES (10, 10);

-- Atualizar a tabela usuario com valores de autorizacao
UPDATE usuario
SET autorizacao = 'MEDICO'
WHERE id IN (SELECT id_usuario FROM medico);

UPDATE usuario
SET autorizacao = 'PACIENTE'
WHERE id IN (SELECT id_usuario FROM paciente);