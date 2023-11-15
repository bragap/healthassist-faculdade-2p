
// id do usuario
const idUsuario = localStorage.getItem('idUsuario');

// endpoints
const url = "http://localhost:8080/consulta";


//elements
let consultasJson = [];
let consultasParaFullCalendar = [];

axios.get(url)
    .then(response => {
        consultasJson = response.data;
        consultasJson.forEach(consulta => {
            if (consulta.medico.usuario.id == idUsuario && !consulta.respostaAnamnese) {
                consultasParaFullCalendar.push({
                    title: consulta.paciente.nomeCompleto,
                    start: consulta.dataHoraConsulta
                })
            }
            console.log(consultasJson)
                var calendarEl = document.getElementById('calendar');
        
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    initialView: 'dayGridMonth',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }
                });
        
                for (const event of consultasParaFullCalendar) {
                    calendar.addEvent(event);
                }
                calendar.render();
        });
    })
    .catch(error => {
        console.log(error)
    })





// exibiçao tela de loading
function showLoading() {

    document.getElementById('loading').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';

    }, 2000);
}
function redirectTo(destination) {
    showLoading();
    setTimeout(function () {
        window.location.href = destination;
    }, 2000);
}
