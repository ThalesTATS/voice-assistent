window.SpeechRecognition = window.SpeechRecongnition || webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();

recognition.continuous = true;


recognition.addEventListener('result', onSpeaking);



recognition.addEventListener('end', function() {
    recognition.start();
});
