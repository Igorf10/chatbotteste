// ======================
// VARIÁVEIS GLOBAIS
// ======================

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

const btnAudio = document.getElementById('btnAudio');


// ======================
// EVENTO DO BOTÃO
// ======================

btnAudio.addEventListener('click', async () => {

    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }

});


// ======================
// INICIAR GRAVAÇÃO
// ======================

async function startRecording() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        mediaRecorder = new MediaRecorder(stream);

        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {

            const audioBlob = new Blob(audioChunks, {
                type: 'audio/webm'
            });

            // Mostra no chat
            addAudioMessage(audioBlob, 'user');

            // Envia para API
            await sendAudio(audioBlob);

            // Libera o microfone
            stream.getTracks().forEach(track => track.stop());

        };
mediaRecorder.start();

isRecording = true;

// Ícone quando estiver gravando
isRecording = true;

btnAudio.innerHTML =
    '<i class="bi bi-stop-fill"></i>';

btnAudio.classList.add('recording');

const input = document.getElementById('userInput');
const recording = document.getElementById('recordingIndicator');

input.style.display = 'none';
recording.classList.remove('hidden');
} catch (error) {

    console.error(error);

    alert('Não foi possível acessar o microfone.');

}
}


// ======================
// PARAR GRAVAÇÃO
// ======================

function stopRecording() {

    if (mediaRecorder && isRecording) {

        mediaRecorder.stop();

        isRecording = false;

isRecording = false;

btnAudio.innerHTML =
    '<i class="bi bi-mic-fill"></i>';

btnAudio.classList.remove('recording');

const input = document.getElementById('userInput');
const recording = document.getElementById('recordingIndicator');

recording.classList.add('hidden');
input.style.display = 'block';

  }
}

// ======================
// EXIBIR ÁUDIO NO CHAT
// ======================

function addAudioMessage(audioBlob, sender){

    const messages = document.getElementById('messages');

    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', sender);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');

if (sender === 'user') {
    avatar.innerHTML = '<i class="bi bi-person-fill"></i>';
} else {
    avatar.innerHTML = '<i class="bi bi-person-circle"></i>';
}

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if(sender === 'user'){
        messageDiv.classList.add('user-message');
    }else{
        messageDiv.classList.add('bot-message');
    }

    // Player
    const audio = document.createElement('audio');

    audio.controls = true;
    audio.src = URL.createObjectURL(audioBlob);

    // Hora
    const hora = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = hora;

    messageDiv.appendChild(audio);
    messageDiv.appendChild(timeDiv);

    if(sender === 'user'){
        wrapper.appendChild(messageDiv);
        wrapper.appendChild(avatar);
    }else{
        wrapper.appendChild(avatar);
        wrapper.appendChild(messageDiv);
    }

    messages.appendChild(wrapper);

    messages.scrollTop = messages.scrollHeight;

}


// ======================
// ENVIO PARA API
// ======================

async function sendAudio(audioBlob){

    const formData = new FormData();

    formData.append(
        'audio',
        audioBlob,
        'audio.webm'
    );

    try {

        showTyping();

        // EXEMPLO DE ENVIO

        /*
        const response = await fetch('SUA_API', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        hideTyping();

        addMessage(data.resposta, 'bot');
        */

        // Simulação temporária

        setTimeout(() => {

            hideTyping();

            addMessage(
                'Áudio recebido com sucesso.',
                'bot'
            );

        }, 2000);

    } catch (error) {

        hideTyping();

        console.error(error);

        addMessage(
            'Erro ao enviar o áudio.',
            'bot'
        );

    }

}