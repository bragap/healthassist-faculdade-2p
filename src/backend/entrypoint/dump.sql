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
CREATE TABLE especialidade_medico (
                                      id serial PRIMARY KEY,
                                      especialidade character varying(50) COLLATE "pg_catalog"."default"
);

-- Tabela para armazenar informações de usuários
CREATE TABLE usuario (
                         id serial PRIMARY KEY,
                         apelido character varying(50) NOT NULL,
                         email character varying(50) NOT NULL,
                         senha character varying(50) NOT NULL,
                         autorizacao character varying(20) check (autorizacao in ('MEDICO','PACIENTE','ADMINISTRADOR')) not null,
                         data_criacao timestamp DEFAULT now()
);

-- Tabela para armazenar informações de médicos
CREATE TABLE medico (
                        id serial PRIMARY KEY,
                        endereco character varying(255) COLLATE "pg_catalog"."default",
                        data_nasc date,
                        codigo_de_registro character varying(255) COLLATE "pg_catalog"."default",
                        data_criacao timestamp DEFAULT now(),
                        id_especialidade_medico integer,
                        nome_completo character varying(100) COLLATE "pg_catalog"."default",
                        id_usuario integer,
                        UNIQUE (codigo_de_registro),
                        FOREIGN KEY (id_usuario) REFERENCES usuario (id),
                        FOREIGN KEY (id_especialidade_medico) REFERENCES especialidade_medico (id)
);

-- Tabela para armazenar informações de pacientes
CREATE TABLE paciente (
                          id serial PRIMARY KEY,
                          endereco character varying(255) COLLATE "pg_catalog"."default",
                          data_nasc date,
                          data_criacao timestamp DEFAULT now(),
                          nome_completo character varying(100) COLLATE "pg_catalog"."default",
                          id_usuario integer,
                          FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

-- Tabela para armazenar informações de consulta
CREATE TABLE consulta (
                          id serial PRIMARY KEY,
                          id_medico integer,
                          id_paciente integer,
                          data date,
                          horario_inicio time,
                          horario_fim time,
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
                                            horario_incio time,
                                            horario_fim time,
                                            dia_da_semana integer,
                                            id serial PRIMARY KEY,
                                            FOREIGN KEY (id_medico) REFERENCES medico (id),
                                            FOREIGN KEY (dia_da_semana) REFERENCES dia_da_semana (id)
);





-- Tabela para armazenar arquivos médicos
CREATE TABLE arquivos_medico (
                                 id_medico integer,
                                 nome_arquivo varchar(255),
                                 tipo_mime varchar(100),
                                 dados_arquivo bytea,
                                 aprovado smallint,
                                 motivo_inviabilidade varchar(255),
                                 id serial PRIMARY KEY,
                                 FOREIGN KEY (id_medico) REFERENCES medico (id)
);

-- Tabela para armazenar arquivos de pacientes
CREATE TABLE arquivos_paciente (
                                   id_paciente integer,
                                   nome_arquivo varchar(255),
                                   tipo_mime varchar(100),
                                   dados_arquivo bytea,
                                   aprovado smallint,
                                   motivo_inviabilidade varchar(255),
                                   id serial PRIMARY KEY,
                                   FOREIGN KEY (id_paciente) REFERENCES paciente (id)
);
