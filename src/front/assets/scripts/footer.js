class Footer extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.root.innerHTML = `	
        <style>
        footer{
            position: fixed;
            bottom: 0;
            left:0;
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
            margin: 0;
            padding: 0;
            color: #0367A6;
            font-weight: bold;
            user-select: none;
        }
        </style>

        <footer>
        <p> Copyright &copy; 2023 HealthAssist. Todos os direitos reservados.</p>
    </footer>
`
    }
}

customElements.define('footer-component', Footer);