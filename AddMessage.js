function addMessage(text, sender){

    const messages = document.getElementById('messages');

    // Container principal
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', sender);

    // Avatar
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');

if (sender === 'user') {
    avatar.innerHTML = '<i class="bi bi-person-fill"></i>';
} else {
    avatar.innerHTML = '<i class="bi bi-person-circle"></i>';
}

    // Bolha
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if(sender === 'user'){
        messageDiv.classList.add('user-message');
    }else{
        messageDiv.classList.add('bot-message');
    }

    // Hora
    const hora = new Date().toLocaleTimeString('pt-BR',{
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        ${text}
        <div class="message-time">${hora}</div>
    `;

    // Ordem dos elementos
    if(sender === 'user'){
        wrapper.appendChild(messageDiv);
        wrapper.appendChild(avatar);
    }else{
        wrapper.appendChild(avatar);
        wrapper.appendChild(messageDiv);
    }

    messages.appendChild(wrapper);

    // Scroll automático
    messages.scrollTop = messages.scrollHeight;
}



userInput.addEventListener('input', function(){

    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';

});
