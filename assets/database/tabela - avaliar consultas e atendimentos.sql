CREATE TABLE healthassist.avaliar_consulta (
id_consulta INT, -- essa chave representa a consulta
titulo ENUM('Qualidade no atendimento'),
comentario TEXT,
FOREIGN KEY (id_consulta) REFERENCES consulta (id)
)