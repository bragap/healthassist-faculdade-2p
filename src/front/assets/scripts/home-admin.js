// elements
const painelDoutor = document.querySelector('#painel-doctor');
const painelPaciente = document.querySelector('#painel-paciente');
const sucessMessage = document.querySelector('#sucess-message');
const sucessMessage2 = document.querySelector('#sucess-message-2');
let listDoctors = "";
let listPatients = "";

// endpoints
const urlPaciente = "http://localhost:8080/paciente"
const urlDoutor = "http://localhost:8080/medico"

//tipo usuario
const tipoUsuario = localStorage.getItem('tipoUsuario');

// FUNÇÕES

// Função para verificar a autorização do usuário
function checkAuthorization() {

    if (tipoUsuario === "MEDICO" || tipoUsuario === "PACIENTE") {
        redirectTo('error.html');
    }
}

checkAuthorization();

// VERIFICA SE ESTAO APROVADOS - medicos
function verificarAprovacaoTotal(dados, tipo) {
    const todosAprovados = dados.every(item => item.aprovacao === "APROVADO");
    const mensagemElement = document.getElementById('mensagem');

    if (todosAprovados) {
        const mensagem = tipo === 'medico' ? "Nenhum médico para ser aprovado." : "Nenhum paciente para ser aprovado.";
        mensagemElement.innerHTML = `<p>${mensagem}</p>`;
    } else {
        mensagemElement.innerHTML = '';
    }
}

function verificarAprovacaoTotalPacientes(dados, tipo) {
    const todosAprovados = dados.every(item => item.aprovacao === "APROVADO");
    const mensagemElement = document.getElementById('mensagem-2');
    if (todosAprovados) {
        const mensagem = tipo === 'medico' ? "Nenhum médico para ser aprovado." : "Nenhum paciente para ser aprovado.";
        mensagemElement.innerHTML = `<p>${mensagem}</p>`;
    } else {
        mensagemElement.innerHTML = '';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    axios.get(urlDoutor)
        .then(response => {
            const dados = response.data;

            dados.forEach((doctor) => {
                if (doctor.aprovacao === "APROVADO") {
                    verificarAprovacaoTotal(dados, 'medico');
                } else {

                    listDoctors += `
            <div id="card-section">
                        <div id="card-conteudo">
                            <div id="card-esquerda">
                                <p id="nome-usuario">Dr. ${doctor.nomeCompleto}</p>
                                <p>Data de Nascimento: ${doctor.dataNasc}</p>
                                <p>Código de registro: ${doctor.codigoDeRegistro}</p>
                                <p>Especialidade: ${doctor.especialidades.map((m) => m.nome).join(', ')}</p>
                                <p>Aprovação: ${doctor.aprovacao}</p>
                                <p id="id-medico">Id do médico: ${doctor.id}</p>
                            </div>
                            <div id="card-direita">
        
                                <button class="aceitar-doctor">ACEITAR</button>
                                <button class="rejeitar-doctor">REJEITAR</button>
                            </div>
                        </div>
                    </div>
    
            `;

                }

                painelDoutor.innerHTML = listDoctors;

                verificarAprovacaoTotal(dados, 'medico');

                adicionarEventListenersBotoesMedicos();
            })
        })
        .catch(error => {
            console.error('Error fetching doctor data:', error);
        });

})

// aprovar médico
function handleAprovarMedico(medicoId) {


    const medicoIdCorreto = medicoId.split(':')[1].trim();


    axios.put(`${urlDoutor}/${medicoIdCorreto}/atualizar-status`, { id: medicoIdCorreto, "aprovacao": "APROVADO" })
        .then(response => {
            console.log('Resposta do servidor:', response.data);
            sucessMessage.innerHTML = `<p>Médico aprovado!</p>`;
            localStorage.setItem('aprovacao', 'APROVADO');
            console.log('Doctor approved successfully');
            setTimeout(function () {
                atualizarListaMedicos();
            }, 2000);
        })
        .catch(error => {
            console.log('Resposta do servidor:', error.response.data)
            console.error('Error approving doctor:', error);
        });
}

// rejeitar médico
function handleRejeitarMedico(medicoId) {

    const medicoIdCorreto = medicoId.split(':')[1].trim();


    axios.put(`${urlDoutor}/${medicoIdCorreto}/atualizar-status`, { id: medicoIdCorreto, "aprovacao": "REPROVADO" })
        .then(response => {
            console.log('Resposta do servidor:', response.data);
            localStorage.setItem('aprovacao', 'REPROVADO');
            console.log('Doctor rejected successfully');
            atualizarListaMedicos();
        })
        .catch(error => {
            console.log('Resposta do servidor:', error.response.data)
            console.error('Error rejecting doctor:', error);
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

document.addEventListener('DOMContentLoaded', function () {

    // get de todos os pacientes
    axios.get(urlPaciente)
        .then(response => {
            const dados = response.data;

            dados.forEach((paciente) => {

                if (paciente.aprovacao === "APROVADO") {

                    verificarAprovacaoTotalPacientes(dados, 'paciente');
                } else {

                    listPatients += `
        <div id="card-section">
            <div id="card-conteudo">
                <div id="card-esquerda">
                    <p id="nome-usuario">Paciente: ${paciente.nomeCompleto}</p>
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
                }

                verificarAprovacaoTotal(dados, 'paciente');

                painelPaciente.innerHTML = listPatients;

                adicionarEventListenersBotoes();
            })

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});



// aprovar paciente
function handleAprovarPaciente(pacienteId) {
    axios.put(`${urlPaciente}/${pacienteId}/atualizar-status`, { id: pacienteId, aprovacao: "APROVADO" })
        .then(response => {
            sucessMessage2.innerHTML = `<p>Paciente aprovado!</p>`;
            console.log('Patient approved successfully');
            localStorage.setItem('aprovacao', 'APROVADO');
            setTimeout(function () {
                atualizarListaPacientes();
            }, 2000);
        })
        .catch(error => {
            console.log('Resposta do servidor:', error.response.data)
            console.error('Error approving patient:', error);
        });
}

function handleRejeitarPaciente(pacienteId) {
    axios.put(`${urlPaciente}/${pacienteId}/atualizar-status`, { id: pacienteId, aprovacao: "REPROVADO" })
        .then(response => {
            sucessMessage2.innerHTML = `<p>Paciente REPROVADO!</p>`;
            console.log('Patient approved successfully');
            localStorage.setItem('aprovacao', 'REPROVADO');
            setTimeout(function () {
                atualizarListaPacientes();
            }, 2000);
        })
        .catch(error => {
            console.log('Resposta do servidor:', error.response.data)
            console.error('Error approving patient:', error);
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