CREATE TABLE healthassist.paciente (
id INT NOT NULL AUTO_INCREMENT,
primeiro_nome VARCHAR(50) NOT NULL,
ultimo_nome VARCHAR(50) NOT NULL,
endereco VARCHAR(255) NOT NULL,
data_nasc DATE,
prioridade BOOLEAN,
PRIMARY KEY(id)
);

CREATE TABLE healthassist.duvidas (
id_paciente INT,
titulo ENUM('Consulta', 'Cadastro', 'Documentos'), -- titulo deve ser categorizado
descricao TEXT,
resposta TEXT, -- resposta da secretaria
FOREIGN KEY (id_paciente) REFERENCES paciente(id)
);

CREATE TABLE healthassist.arquivos_paciente (
  id_paciente INT,
  nome_arquivo varchar(255) DEFAULT NULL,
  tipo_mime varchar(100) DEFAULT NULL,
  dados_arquivo longblob,
  FOREIGN KEY (id_paciente) REFERENCES paciente(id)
)

