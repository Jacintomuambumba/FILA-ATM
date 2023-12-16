const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');
const voltarButton = document.getElementById('voltar');
const procurarButton = document.getElementById('procurarButton');
const popup = document.getElementById('popup');

function abrirPopup() {
    popup.style.display = 'block';
}

function fecharPopup() {
    popup.style.display = 'none';
}

procurarButton.addEventListener('click', () => {
    abrirPopup();
    loadATMs();
});

voltarButton.addEventListener('click', () => {
    container.classList.toggle("right-panel-active");
});

// Atualize a definição dos ATMs com URLs de imagem simuladas
const atms = [
    { name: 'ATM Banco Sol', location: 'Rua do Banco Sol', image: '/img/banco sol atm.jpg' },
    { name: 'ATM Kibabo', location: '21 de Janeiro', image: '/img/ATM Kibabo.jpg' },
    { name: 'ATM BPC', location: 'Gamek a Direita', image: '/img/atm bpc.jpg' },
    { name: 'ATM Angomart', location: 'Kilamba', image: '/img/atm angomart.jpeg' },
];

// Atualize a função loadATMs para criar cards
function loadATMs() {
    const atmContainer = document.getElementById('atm-container');
    atmContainer.innerHTML = '';

    atms.forEach((atm, index) => {
        const atmElement = document.createElement('div');
        atmElement.classList.add('atm-card');
        atmElement.innerHTML = `
            <img src="${atm.image}" alt="${atm.name}">
            <p>${atm.name}</p>
            <p>Localização: ${atm.location}</p>
            <button onclick="reservarLugar('${atm.name}')">Reservar Lugar</button>
        `;
        atmContainer.appendChild(atmElement);
    });
}

function reservarLugar(atmName) {
    const nome = document.getElementById('nome').value;
    const localizacao = document.getElementById('localizacao').value;

    if (nome && localizacao !== '...') {
        // Implemente a lógica para reservar um lugar na fila aqui
        const numeroPessoasEspera = Math.floor(Math.random() * 25); // Simulação de pessoas na fila
        exibirInformacoesPrincipais(nome, localizacao, atmName, numeroPessoasEspera);
    } else {
        alert('Por favor, preencha todas as informações na página inicial.');
    }
}

function exibirInformacoesPrincipais(nome, localizacao, atmName, numeroPessoasEspera) {
    const tempoEspera = 2 * numeroPessoasEspera;
    const tempoEsperaFormatado = formatarTempoEspera(tempoEspera);

    const popupContent = `
        <p>Nome: ${nome}</p>
        <p>Localização: ${localizacao}</p>
        <p>ATM Selecionado: ${atmName}</p>
        <p>Pessoas na fila: ${numeroPessoasEspera}</p>
        <p>Sua posição na fila: ${Math.min(numeroPessoasEspera + 1, 25)}</p>
        <p>Tempo de espera estimado: ${tempoEsperaFormatado}</p>
    `;

    const popup = window.open('', 'InformacoesPopup', 'width=400,height=300');
    popup.document.body.innerHTML = popupContent;
}

function formatarTempoEspera(tempoMinutos) {
    const horas = Math.floor(tempoMinutos / 60);
    const minutos = tempoMinutos % 60;
    return `${horas}h ${minutos}min`;
}

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
