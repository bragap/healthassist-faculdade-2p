-- Adicionando TIMESTAMP
ALTER TABLE healthassist.paciente
ADD data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP;