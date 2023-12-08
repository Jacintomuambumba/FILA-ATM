document.addEventListener('DOMContentLoaded', function () {
    const userPositionElement = document.getElementById('userPosition');
    const markForm = document.getElementById('markForm');
    const nameInput = document.getElementById('nameInput');
    const operationInput = document.getElementById('operationInput');
    const reservationTypeInput = document.getElementById('reservationType');
    const timeInput = document.getElementById('timeInput');
    const markButton = document.getElementById('markButton');
    const virtualQueueElement = document.getElementById('virtualQueue');
    const queueCountElement = document.getElementById('queueCount'); // Adicionado elemento para exibir a quantidade de pessoas na fila
  
    let virtualQueue = [];
    const userMarkedTimes = {}; // Armazena o tempo em que cada usuário fez sua última marcação
  
    // Adicionado intervalo para verificar se mudou o dia e zerar a lista
    setInterval(checkAndResetQueue, 60 * 1000); // Verifica a cada minuto
  
    markButton.addEventListener('click', function () {
      const userName = nameInput.value.trim();
      const operation = operationInput.value.trim();
      const reservationType = reservationTypeInput.value;
      const reservationTime = timeInput.value.trim();
      
      if (userName === '' || operation === '') {
        alert('Por favor, insira seu nome e escolha o tipo de operação.');
        return;
      }
  
      if (reservationType === 'schedule') {
        const selectedDate = new Date(reservationTime);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
          alert('Você não pode agendar uma data no passado.');
          return;
        }
  
        const userScheduled = virtualQueue.find(user => user.name === userName && user.reservationType === 'schedule' && user.time === reservationTime);
        if (userScheduled) {
          alert('Você já possui uma marcação agendada para esta data.');
          return;
        }
      }
  
      if (userMarkedTimes[userName] && Date.now() - userMarkedTimes[userName] < 5 * 60 * 1000) {
        alert('Você só pode fazer uma marcação a cada 5 minutos.');
        return;
      }
  
      const newUserPosition = virtualQueue.length + 1;
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  
      virtualQueue.push({ position: newUserPosition, name: userName, operation: operation, reservationType: reservationType, time: reservationTime, date: formattedDate, confirmed: false });
      
      userPositionElement.textContent = newUserPosition;
  
      const li = document.createElement('li');
      li.textContent = `Posição: ${newUserPosition} - ${userName} (${operation}) - Reservado para ${reservationType === 'now' ? 'Agora' : reservationTime} (${formattedDate})`;
      virtualQueueElement.appendChild(li);
  
      userMarkedTimes[userName] = Date.now();
  
      highlightNextUser();
      updateQueueCount(); // Atualiza a quantidade de pessoas na fila
    });
  
    function highlightNextUser() {
      virtualQueueElement.querySelectorAll('li').forEach(li => {
        li.classList.remove('highlighted');
      });
  
      const nextUser = virtualQueue.find(user => !user.confirmed);
  
      if (nextUser) {
        const nextUserElement = virtualQueueElement.querySelector(`li:contains('${nextUser.name}')`);
        if (nextUserElement) {
          nextUserElement.classList.add('highlighted');
        }
      }
    }
  
    function updateQueueCount() {
      queueCountElement.textContent = `Pessoas na Fila: ${virtualQueue.length}`;
    }
  
    // Adicionada função para verificar se mudou o dia e zerar a lista
    function checkAndResetQueue() {
      const currentDate = new Date();
      const lastResetDate = localStorage.getItem('lastResetDate');
  
      if (!lastResetDate || currentDate.getDate() !== new Date(parseInt(lastResetDate)).getDate()) {
        // Zera a lista e atualiza a data de reset no armazenamento local
        virtualQueue = [];
        localStorage.setItem('lastResetDate', currentDate.getTime().toString());
  
        // Remove os elementos da interface
        while (virtualQueueElement.firstChild) {
          virtualQueueElement.removeChild(virtualQueueElement.firstChild);
        }
  
        // Atualiza a quantidade de pessoas na fila
        updateQueueCount();
      }
    }
  });
  