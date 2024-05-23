window.SpeechRecognition = window.SpeechRecongnition || webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();

recognition.continuous = true;


recognition.addEventListener('result', onSpeaking);

function onSpeaking(result){
    let index = result.resultIndex
    let transcript = result.results[index][0].transcript;

    var onSpeakingEvent = new CustomEvent("onSpeakingEvent", {
        detail: transcript
    });

    window.dispatchEvent(onSpeakingEvent);
}

recognition.addEventListener('end', function() {
    recognition.start();
});
