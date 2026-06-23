function showTyping(){

    const messages = document.getElementById('messages');

    // Evita duplicação
    if(document.getElementById('typingIndicator'))
        return;

    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.classList.add('typing-indicator');

    typing.innerHTML = `
        <div<i class="bi bi-person-circle"></i></div>

        <div class="typing-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;
}

function hideTyping(){

    const typing = document.getElementById('typingIndicator');

    if(typing){
        typing.remove();
    }
}