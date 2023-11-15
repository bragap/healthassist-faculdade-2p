// elements
const painelDoutor = document.querySelector('#painel-doctor');
const painelPaciente = document.querySelector('#painel-paciente');
let listDoctors = "";
let listPatients = "";

// endpoints
const urlPaciente = "http://localhost:8080/paciente"
const urlDoutor = "http://localhost:8080/medico"


// FUNÇÕES

// get de todos os médicos
axios.get(urlDoutor)
    .then(response => {
        const dados = response.data;

        dados.forEach((doctor) => {
            listDoctors += `
        <div id="card-section">
                    <div id="card-conteudo">
                        <div id="card-esquerda">
                            <p id="nome-usuario">${doctor.nomeCompleto}</p>
                            <p>Data de Nascimento: ${doctor.dataNasc}</p>
                            <p>Código de registro: ${doctor.codigoDeRegistro}</p>
                            <p>Especialidade: ${doctor.especialidadeMedico.especialidade}</p>
                            <p>Aprovação: ${doctor.aprovacao}</p>
                            <p id="id-medico">${doctor.id}</p>
                        </div>
                        <div id="card-direita">
    
                            <button class="aceitar-doctor">ACEITAR</button>
                            <button class="rejeitar-doctor">REJEITAR</button>
                        </div>
                    </div>
                </div>

        `;

        })
        painelDoutor.innerHTML = listDoctors;
        // Adicionar event listeners aos novos botões
        adicionarEventListenersBotoesMedicos();
    })
    .catch(error => {
        console.error('Error fetching doctor data:', error);
    });

// aprovar médico
function handleAprovarMedico(medicoId) {
    
    axios.put(`${urlDoutor}/${medicoId}/atualizar-status`, { "aprovacao": true })
        .then(response => {
            alert("Médico aprovado!");
            console.log('Doctor approved successfully');
            atualizarListaMedicos();
        })
        .catch(error => {
            console.error('Error approving doctor:', error);
        });
}

// rejeitar médico
function handleRejeitarMedico(medicoId) {
    axios.put(`${urlDoutor}/${medicoId}/atualizar-status`, { "aprovacao": false })
        .then(response => {
            console.log('Doctor rejected successfully');
            atualizarListaMedicos();
        })
        .catch(error => {
            console.error('Error rejecting doctor:', error);
        });
}

// Função para atualizar a lista de médicos
function atualizarListaMedicos() {
    axios.get(urlDoutor)
        .then(response => {
            const dados = response.data;
            let updatedListDoctors = "";

            dados.forEach((doctor) => {
                updatedListDoctors += `
                    <div id="card-section">
                        <div id="card-conteudo">
                            <div id="card-esquerda">
                                <p id="nome-usuario">${doctor.nomeCompleto}</p>
                                <p>Data de Nascimento: ${doctor.dataNasc}</p>
                                <p>Código de registro: ${doctor.codigoDeRegistro}</p>
                                <p>Especialidade: ${doctor.especialidadeMedico.especialidade}</p>
                                <p>Aprovação: ${doctor.aprovacao}</p>
                                <p id="id-medico">${doctor.id}</p>
                            </div>
                            <div id="card-direita">
                                <button class="aceitar-doctor">ACEITAR</button>
                                <button class="rejeitar-doctor">REJEITAR</button>
                            </div>
                        </div>
                    </div>`;
            });

            painelDoutor.innerHTML = updatedListDoctors;

            // Adicionar event listeners aos novos botões
            adicionarEventListenersBotoesMedicos();
        })
        .catch(error => {
            console.error('Error fetching updated doctor list:', error);
        });
}

// evento nos botões de médicos
function adicionarEventListenersBotoesMedicos() {
    document.querySelectorAll('.aceitar-doctor').forEach(button => {
        button.addEventListener('click', function () {
            const medicoId = this.closest('#card-section').querySelector('#id-medico').innerHTML;
            console.log(medicoId);
            handleAprovarMedico(medicoId);
        });
    });

    document.querySelectorAll('.rejeitar-doctor').forEach(button => {
        button.addEventListener('click', function () {
            const medicoId = this.closest('#card-section').querySelector('#id-medico').innerHTML;
            handleRejeitarMedico(medicoId);
        });
    });
}


// get de todos os pacientes
axios.get(urlPaciente)
    .then(response => {
        const dados = response.data;

        dados.forEach((paciente) => {

            listPatients += `
    <div id="card-section">
        <div id="card-conteudo">
            <div id="card-esquerda">
                <p id="nome-usuario">Nome do paciente: ${paciente.nomeCompleto}</p>
                <p>Data de nascimento: ${paciente.dataNasc}</p>
                <p>Endereço: ${paciente.endereco}</p>
                <p>Aprovação: ${paciente.aprovacao}</p>
                <p id="id-paciente">${paciente.id}</p>
            </div>
            <div id="card-direita">

                <button class="aceitar">ACEITAR</button>
                <button class="rejeitar">REJEITAR</button>
            </div>
        </div>
    </div>
        `
        })
        painelPaciente.innerHTML = listPatients;

        adicionarEventListenersBotoes();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


// aprovar paciente
function handleAprovarPaciente(pacienteId) {
    axios.put(`${urlPaciente}/${pacienteId}/atualizar-status`, { id: pacienteId, aprovacao: true })
        .then(response => {
            alert("Paciente aprovado!");
            console.log('Patient approved successfully');
            atualizarListaPacientes();

        })
        .catch(error => {
            console.error('Error approving patient:', error);
        });
}

//rejeitar paciente
function handleRejeitarPaciente(pacienteId) {
    axios.put(`${urlPaciente}/${pacienteId}/atualizar-status`, { id: pacienteId, aprovacao: false })
        .then(response => {
            console.log('Patient rejected successfully');
            atualizarListaPacientes();

        })
        .catch(error => {
            console.error('Error rejecting patient:', error);
        });
}

// exibiçao tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}

// redirecionamento
function redirectTo(destination) {
    showLoading();
    setTimeout(function () {
        window.location.href = destination;
    }, 2000);
}

// Função para atualizar a lista de pacientes
function atualizarListaPacientes() {
    // Refazer a requisição GET para obter a lista atualizada de pacientes
    axios.get(urlPaciente)
        .then(response => {
            const dados = response.data;
            let updatedListPatients = "";

            dados.forEach((paciente) => {
                updatedListPatients += `
                    <div id="card-section">
                    <div id="card-conteudo">
                            <div id="card-esquerda">
                                <p id="nome-usuario">Nome do paciente: ${paciente.nomeCompleto}</p>
                                <p>Data de nascimento: ${paciente.dataNasc}</p>
                                <p>Endereço: ${paciente.endereco}</p>
                                <p>Aprovação: ${paciente.aprovacao}</p>
                                <p id="id-paciente">${paciente.id}</p>
                            </div>
                            <div id="card-direita">
                                <button class="aceitar">ACEITAR</button>
                                <button class="rejeitar">REJEITAR</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Atualizar o conteúdo HTML com a lista de pacientes atualizada
            painelPaciente.innerHTML = updatedListPatients;

            // Adicionar event listeners aos novos botões, se necessário
            adicionarEventListenersBotoes();
        })
        .catch(error => {
            console.error('Error fetching updated patient list:', error);
        });
}

// evento nos botões
function adicionarEventListenersBotoes() {
    document.querySelectorAll('.aceitar').forEach(button => {
        button.addEventListener('click', function () {
            const pacienteIdElement = this.closest('#card-section').querySelector('#id-paciente');
            if (pacienteIdElement) {
                const pacienteId = pacienteIdElement.innerHTML;
                handleAprovarPaciente(pacienteId);
            }
        });
    });

    document.querySelectorAll('.rejeitar').forEach(button => {
        button.addEventListener('click', function () {
            const pacienteId = this.closest('#card-section').querySelector('#id-paciente').innerHTML;
            handleRejeitarPaciente(pacienteId);
        });
    });
}