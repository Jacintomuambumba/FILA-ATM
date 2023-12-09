const signUpButton = document.getElementById('Vamos');
const signInButton = document.getElementById('Procurar');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

voltar.addEventListener('click', () => {
    container.classList.toggle("right-panel-active");
});
