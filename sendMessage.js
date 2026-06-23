function sendMessage(){

    const input = document.getElementById('userInput');
    const texto = input.value.trim();


    
    if(texto === ''){
        return;
    }

    // Adiciona a mensagem do usuário
    addMessage(texto, 'user');

    // Limpa o input
    input.value = '';
input.style.height = 'auto';

    // Exibe Bot está digitando...
    showTyping();

    // Simula uma resposta da API
    setTimeout(() => {

        // Remove o indicador
        hideTyping();

        // Adiciona a resposta do bot
        addMessage('Recebi sua mensagem: ' + texto, 'bot');

    }, 2000);
}




const userInput = document.getElementById('userInput');

userInput.addEventListener('keydown', function(event){

    // Se pressionar Enter sem Shift
    if(event.key === 'Enter' && !event.shiftKey){

        // Impede a quebra de linha padrão
        event.preventDefault();

        // Envia a mensagem
        sendMessage();
    }

    // Se for Shift + Enter, o navegador fará a quebra de linha normalmente
});

/*document.getElementById('userInput').addEventListener('keydown', (event) => {

    if(event.key === 'Enter'){
        event.preventDefault();
        sendMessage();
    }

});*/