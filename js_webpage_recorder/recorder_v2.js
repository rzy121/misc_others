// binding html elements to variables
const startButton = document.getElementById('btn_start');
const stopButton = document.getElementById('btn_stop');
//const playButton = document.getElementById('btn_play');
const submitButton = document.getElementById('btn_send');
const player = document.getElementById('player');

// initialize new recorder object, and takes the stream object as input

stopButton.disabled = true;
submitButton.disabled = true;

const mic = async () => {

  // request access to mic; if granted, return a stream object
  const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});

  // initialize empty array to store recorded data
  const recorder = new MediaRecorder(stream);

  // initialize empty array to store recording
  var audioChunks = [];

  startButton.addEventListener('click', () => {
    // send a signal for recorder to start
    recorder.start();
    console.log(recorder.state);
    console.log('recorder started');
    stopButton.disabled = false;
    startButton.disabled = true;
  });

  // push audio to the empty array
  recorder.addEventListener('dataavailable', e => {
    audioChunks.push(e.data);
  });

  // once "stop" is clicked, send the recording to the player object
  stopButton.addEventListener('click', () => {
    // send a signal for recorder to stop
    recorder.stop();
    console.log(recorder.state);
    console.log('recorder stopped');

    // once recorder is stopped, get data from array into a blob, and set it to the player for playback
    recorder.addEventListener('stop', () => {
      // create new blob from the recording
      const audioBlob = new Blob(audioChunks);
      // clear previous recording
      audioChunks = [];
      var audioUrl = URL.createObjectURL(audioBlob);
      // put recording to the player
      player.src = audioUrl;
      console.log('playback ready')
    })

    stopButton.disabled = true;
    startButton.disabled = false;
  });
};

window.onload = mic();
