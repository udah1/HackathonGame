import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript,
    finalTranscript
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  props.submitGuess(finalTranscript, interimTranscript);
  if(finalTranscript) {
    console.log('finalTranscript: ' + finalTranscript);
    console.log('transcript: ' + transcript);
    resetTranscript();
  }
  return (
    <div className="row guessedSection">
      {/*<p>Microphone: {listening ? 'on' : 'off'}</p>*/}
      {/*<button onClick={SpeechRecognition.startListening}>Start</button>*/}
      {/*<button onClick={SpeechRecognition.stopListening}>Stop</button>*/}
      {/*<button onClick={resetTranscript}>Reset</button>*/}
      <p>-{transcript}</p>
      <p>+{interimTranscript}</p>
      <p>/{finalTranscript}</p>
    </div>
  );
};
export default Dictaphone;
