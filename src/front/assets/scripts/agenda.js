data = [
    {
        title: 'João Ricardo',
        start: '2023-11-16T10:00:00'

    },
    {
        title: 'Roberto Davila',
        start: '2023-11-16T07:00:00'
    },

    {
        title: 'João Costa',
        start: '2023-11-16T08:00:00'
    },
    {
        title: 'Adalberto da Silva',
        start: '2023-11-19T09:00:00'
    },
    {
        title: 'João Costa',
        start: '2023-11-10T07:00:00'
    },
    {
        title: 'Rose Gouveia',
        start: '2023-11-03T12:00:00'
    },
    {
        title: 'Rose Gouveia',
        start: '2023-12-01T11:00:00'
    },
    {
        title: 'Rose Gouveia',
        start: '2023-11-14T10:00:00'
    },
    {
        title: 'Rose Gouveia',
        start: '2023-11-18T08:00:00'
    },
    {
        title: 'Rose Gouveia',
        start: '2023-11-22T09:00:00'
    }
]

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
            console.log(consultasParaFullCalendar)
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