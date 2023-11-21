// tipo usuario
const tipoUsuario = localStorage.getItem('tipoUsuario');

// elements
const button = document.querySelector('#btn-reprove');

// função que redireciona o usuario pra sua home
button.addEventListener('click', function () {

       redirectTo('index.html');

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