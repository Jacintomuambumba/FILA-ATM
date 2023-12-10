const botaoVamos = document.getElementById('vamos');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const voltarButton = document.getElementById('voltar');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

voltar.addEventListener('click', () => {
    container.classList.toggle("right-panel-active");
});