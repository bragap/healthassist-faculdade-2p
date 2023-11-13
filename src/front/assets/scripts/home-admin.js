// elements
const painelDoutor  = document.querySelector('#painel-doctor');
const painelPaciente = document.querySelector('#painel-paciente');
let listDoctors = "";
let listPatients = "";
let confirmButton = document.querySelector('.aceitar');
let recuseButton = document.querySelector('.recusar');


// endpoints
const url = "https://jsonplaceholder.typicode.com/users"


// FUNÇÕES

// get de todos os médicos
axios.get(url)
.then(response => {
    const dados = response.data;

    dados.forEach((doctor) => {
        listDoctors+=`
        <div id="card-section">
                    <div id="card-conteudo">
                        <div id="card-esquerda">
                            <p id="nome-usuario">Nome do médico: ${doctor.name}</p>
                            <p>${doctor.address.street},${doctor.address.suite},${doctor.address.city}</p>
                            <p>Especialidade: ${doctor.phone}</p>
                            <p>Documento</p>
                            <p>Data de Nascimento: ${doctor.phone}</p>
                            <p>Código de registro: ${doctor.id}</p>
                            <p>Disponibilidade de horários: ${doctor.username}</p>
                        </div>
                        <div id="card-direita">
    
                            <button class="aceitar">ACEITAR</button>
                            <button class="rejeitar">REJEITAR</button>
                        </div>
                    </div>
                </div>

        `;
      
})
painelDoutor.innerHTML = listDoctors;
})
  
// get de todos os pacientes
axios.get(url)
.then(response => {
    const dados = response.data;

    dados.forEach((doctor) => {
       
        listPatients+=`
    <div id="card-section">
        <div id="card-conteudo">
            <div id="card-esquerda">
                <p id="nome-usuario">Nome do paciente: ${doctor.name}</p>
                <p>Histórico de doenças: ${doctor.phone}</p>
                <p>Exame</p>
                <p>Problemas : ${doctor.email}</p>
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
})
  

// PUT, DELETE a serem implementados
