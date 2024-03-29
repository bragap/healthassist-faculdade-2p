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
const urlArquivosDoutor = "http://localhost:8080/api/medico/arquivo"
const urlArquivosPaciente = "http://localhost:8080/api/paciente/arquivo"

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
function verificarAprovacaoTotal(dados) {
    const todosAprovados = dados.every(item => item.aprovacao === "APROVADO");
    const mensagemElement = document.getElementById('mensagem');

    if (todosAprovados) {
        mensagemElement.innerHTML = "Nenhum doutor para ser aprovado"
    } else {
        mensagemElement.innerHTML = '';
    }
}

function verificarAprovacaoTotalPacientes(dados) {
    const todosAprovados = dados.every(item => item.aprovacao === "APROVADO");
    const mensagemElement2 = document.getElementById('mensagem-2');

    if (todosAprovados) {
        mensagemElement2.innerHTML = "Nenhum paciente para ser aprovado"
    } else {
        mensagemElement2.innerHTML = '';
    }
}

const imagePacientes = [
    { id: 1, image: 'assets/images/pacientes/paciente1.png' },
    { id: 2, image: 'assets/images/pacientes/paciente2.png' },
    { id: 3, image: 'assets/images/pacientes/paciente3.png' },
    { id: 4, image: 'assets/images/pacientes/paciente4.png' },
    { id: 5, image: 'assets/images/pacientes/paciente5.png'}
]

const imageDoctors = [
    { id: 1, image: 'assets/images/medicos/medico1.png' },
    { id: 2, image: 'assets/images/medicos/medico2.png' },
    { id: 3, image: 'assets/images/medicos/medico3.png' },
    { id: 4, image: 'assets/images/medicos/medico4.png' },
    { id: 5, image: 'assets/images/medicos/medico5.png' }
]


// pegar todos os médicos que nao foram aprovados ainda
document.addEventListener('DOMContentLoaded', function () {
    axios.get(urlDoutor)
        .then(response => {
            const dados = response.data;

            dados.forEach((doctor,index) => {
                if (doctor.aprovacao === "APROVADO" || doctor.aprovacao === "REPROVADO") {
                    verificarAprovacaoTotal(dados, 'medico');
                } else {
                    const imagePath = index % 5 + 1;
                    const imageCorreta = imageDoctors[index % 5].image;

                    listDoctors += `
                    <li class="booking-card " id="card-section"
                    style="background-image: url('${imageCorreta}')">
                    <div class="book-container">
                        <div class="content">
                        <button class="aceitar-doctor">ACEITAR</button>
                        <button class="rejeitar-doctor">REJEITAR</button>
                        </div>
                    </div>
                    <div class="informations-container">
                        <h2 class="title"> ${doctor.nomeCompleto}</h2>
                        <p class="sub-title">CRM: ${doctor.codigoDeRegistro}</p>
                        <p class="price">Nascimento: ${doctor.dataNasc}</p>
                                    <p>Especialidade: ${doctor.especialidades.map((m) => m.nome).join(', ')}</p>
                                    <p id="id-medico">Id do médico: ${doctor.id}</p>
                            </div>
                        </div>
                    </div>
                    <p id="nome">${doctor.nomeCompleto} </p>
                </li>
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
            window.location.reload();     
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
            window.location.reload();     
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


// pegar todos os pacientes que nao foram aprovados ainda
document.addEventListener('DOMContentLoaded', function () {

    // get de todos os pacientes
    axios.get(urlPaciente)
        .then(response => {
            const dados = response.data;

            dados.forEach((paciente,index) => {

                if (paciente.aprovacao === "APROVADO" || paciente.aprovacao === "REPROVADO") {

                    verificarAprovacaoTotalPacientes(dados, 'paciente');
                } else {

                    const imagePath = index % 5 + 1;
                    const imageCorreta = imagePacientes[index % 5].image;


                    listPatients += `
                    <li class="booking-card " id="card-section"
                    style="background-image: url('${imageCorreta}')">
                    <div class="book-container">
                        <div class="content">
                        <button class="aceitar">ACEITAR</button>
                    <button class="rejeitar">REJEITAR</button>
                        </div>
                    </div>
                    <div class="informations-container">
                    <h2 class="title"> ${paciente.nomeCompleto}</h2>
                    <p class="sub-title">Nascimento ${paciente.dataNasc}</p>
                    <p class="price">Endereço: ${paciente.endereco}</p>
                    <p>Aprovação: ${paciente.aprovacao}</p>
                    <p id="id-paciente">Id do paciente: ${paciente.id}</p>
                    </div>
                    </div>
                    </div>
                    <p id="nome">${paciente.nomeCompleto} </p>
                </li>
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
    const pacienteIdNumero = parseInt(pacienteId.split(':')[1].trim(), 10);
    axios.put(`${urlPaciente}/${pacienteIdNumero}/atualizar-status`, { id: pacienteIdNumero, aprovacao: "APROVADO" })
        .then(response => {
            sucessMessage2.innerHTML = `<p>Paciente aprovado!</p>`;
            console.log('Patient approved successfully');
            localStorage.setItem('aprovacao', 'APROVADO');
            window.location.reload();     

        })
        .catch(error => {
            console.log('Resposta do servidor:', error.response.data)
            console.error('Error approving patient:', error);
        });
}

function handleRejeitarPaciente(pacienteId) {
    const pacienteIdNumero = parseInt(pacienteId.split(':')[1].trim(), 10);

    axios.put(`${urlPaciente}/${pacienteIdNumero}/atualizar-status`, { id: pacienteIdNumero, aprovacao: "REPROVADO" })
        .then(response => {
            sucessMessage2.innerHTML = `<p>Paciente REPROVADO!</p>`;
            console.log('Patient approved successfully');
            localStorage.setItem('aprovacao', 'REPROVADO');
            window.location.reload();     

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