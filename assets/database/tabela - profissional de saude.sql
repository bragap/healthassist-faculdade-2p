CREATE TABLE healthassist.medico (
id INT NOT NULL AUTO_INCREMENT,
primeiro_nome VARCHAR(50) NOT NULL,
ultimo_nome VARCHAR(50) NOT NULL,
endereco VARCHAR(255) NOT NULL,
data_nasc DATE,
código_de_registro VARCHAR(255) UNIQUE NOT NULL,
especialidade ENUM('Cardiologista', 'Oftalmologista'),
PRIMARY KEY (id)
);

CREATE TABLE healthassist.disponibilidade_de_horario (
id_medico INT,
horario_incio TIME,
horario_fim TIME,
dia_da_semana INT,
FOREIGN KEY (id_medico) REFERENCES medico(id),
FOREIGN KEY (dia_da_semana) REFERENCES dia_da_semana(id)
);

CREATE TABLE healthassist.horario_de_atendimento (
id_medico INT,
horario_inicio TIME,
horario_fim TIME,
dia_da_semana INT,
FOREIGN KEY (id_medico) REFERENCES medico(id),
FOREIGN KEY (dia_da_semana) REFERENCES dia_da_semana(id)
);

CREATE TABLE healthassist.arquivos_medico (
  id_medico INT,
  nome_arquivo varchar(255) DEFAULT NULL,
  tipo_mime varchar(100) DEFAULT NULL,
  dados_arquivo longblob,
  FOREIGN KEY (id_medico) REFERENCES medico(id)
);

CREATE TABLE healthassist.dia_da_semana (
id INT NOT NULL AUTO_INCREMENT,
nome_dia ENUM('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'),
PRIMARY KEY(id)
)
