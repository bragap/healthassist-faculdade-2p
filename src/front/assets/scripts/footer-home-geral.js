class FooterHome extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.root.innerHTML = `	
        <style>
        footer{
            margin-top: 120px;
            width: 100%;
            background-color: #0367a6;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        footer img{
            width: 100%;
            max-width: 200px;
            padding: 20px;
        }
        footer ul{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        footer ul li{
            width: 100%;
            list-style: none;
            padding-bottom: 20px;
        }
        </style>

        <footer>
        <img src="./assets/images/logo-v4.png" alt="Logo HealthAssist">
        <ul>
            <li>Copyright &copy; 2023.Todos os direitos reservados.</li>
        </ul>
    </footer>
`
    }
}

customElements.define('footer-home', FooterHome);