-- Adicionando TIMESTAMP
-- ALTER TABLE healthassist.medico
-- ADD data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- ALTER TABLE healthassist.medico
-- DROP COLUMN especialidade;

ALTER TABLE healthassist.medico
ADD id_especialidade_medico INT,
ADD FOREIGN KEY (id_especialidade_medico) REFERENCES especialidade_medico(id);