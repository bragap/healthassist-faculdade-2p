CREATE TABLE healthassist.consulta (
id INT NOT NULL AUTO_INCREMENT,
id_medico INT,
id_paciente INT,
data DATE,
horario_inicio TIME,
horario_fim TIME,
PRIMARY KEY (id),
FOREIGN KEY (id_medico) REFERENCES medico(id),
FOREIGN KEY (id_paciente) REFERENCES paciente(id)
)