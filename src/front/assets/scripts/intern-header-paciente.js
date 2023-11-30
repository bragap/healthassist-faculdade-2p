class InterHeaderPaciente extends HTMLElement {
    constructor() {
      super();
  
      this.mobileMenu = null;
      this.navList = null;
      this.navLinks = null;
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
  
  
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'closed' });
      // HTML do componente
      shadowRoot.innerHTML = `
        <style>
        a {
            color: #fff;
            text-decoration: none;
            transition: 0.3s;
          }
          
          a:hover {
            opacity: 0.7;
          }
          
          .logo img{
           width: 50%;
          }
          
          nav {
            position:fixed;
            top:0;
            width:100%;
            z-index:1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-family: "Poppins", sans-serif;
            background:  #0367A6;
            color: #fff;
            height: 13vh;
          }
          .nav-list {
            list-style: none;
            display: flex;
          }
          
          .nav-list li {
            letter-spacing: 2px;
            margin-left: 32px;
            color: #0367A6;
          
          }
          
          .mobile-menu {
            display: none;
            cursor: pointer;
          }
          
          .mobile-menu div {
            width: 32px;
            height: 2px;
            background: #fff;
            margin: 8px;
            transition: 0.3s;
          }
          .nav-list.active {
            transform: translateX(0);
            
          }
          
          @keyframes navLinkFade {
            from {
              opacity: 0;
              transform: translateY(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .mobile-menu.active .line1 {
            transform: rotate(-45deg) translate(-8px, 8px);
          }
          
          .mobile-menu.active .line2 {
            opacity: 0;
          }
          
          .mobile-menu.active .line3 {
            transform: rotate(45deg) translate(-5px, -7px);
          }
          
          @media (max-width: 999px) {
            body {
              overflow-x: hidden;  
            }  
            main {
              height: 160vh;
              margin: 0 auto;
            }    
            nav {
                height: 8vh;
                padding-top: 13px;
            }    
            .logo img {
                width: 45%;
              }    
            .nav-list {
              position: absolute;  
              top: 6vh;
              right: 0;
              width: 50vw;
              height: 92vh;
              background: #0367A6;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              transform: translateX(100%);
              transition: transform 0.3s ease-in;
              
            } 
            .nav-list li a{
                color: #fff;
            }
          
            .nav-list li {
              margin-left: 0;  
              opacity: 0;
            }  
            .mobile-menu {
              display: block;  
            }  
        </style>
        <header>
          <nav>
            <a class="logo" href="home-paciente.html"><img src="./assets/images/logo-v9.png"></a>
            <div class="mobile-menu">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
            <ul class="nav-list">
              <li><a href="home-paciente.html">Início</a></li>
              <li><a href="avaliar-consulta.html">Consultas</a></li>
              <li><a href="perfil-paciente.html">Perfil</a></li>
              <li><a href="#" class="btn-out" onclick="redirectTo('index.html')">Sair</a></li>
              </ul>
          </nav>
        </header>
      `;
  
      this.mobileMenu = shadowRoot.querySelector('.mobile-menu');
      this.navList = shadowRoot.querySelector('.nav-list');
      this.navLinks = shadowRoot.querySelectorAll('.nav-list li');
      this.btnOut = shadowRoot.querySelector('.btn-out');
  
      this.mobileMenu.addEventListener('click', this.handleClick);
      this.btnOut.addEventListener('click', this.limparLocalStorage);

      this.animateLinks();
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
    }

    limparLocalStorage(){
      localStorage.clear();
    }

    redirectTo(path) {
      window.location.href = path;
    }
  
  }
  
  customElements.define('intern-header-paciente', InterHeaderPaciente);
  