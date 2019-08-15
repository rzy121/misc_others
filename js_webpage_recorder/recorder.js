// wrapper function that returns promise that is essentially the mediaRecorder
const recordAudio = () =>

  new Promise(async resolve => {

    // wait for access to mic to be granted
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // create a new instance of MediaRecorder
    const mediaRecorder = new MediaRecorder(stream);

    // initialize empty array to hold audio data
    const audioChunks = [];

    // create addEventListener and pushes audio data to array when data is available
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    // fucntion to start recording, native method of mediaRecorder
    const start = () => mediaRecorder.start();

    // create new promise that resolves when mediaRecorder is stopped
    // once mediaRecorder stops, push data to array and play back the recording
    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });
        // fucntion to stop recording, native method of mediaRecorder
        mediaRecorder.stop();
      });
    // once promise resolves, run start & stop functions
    resolve({ start, stop });
  });


async function record_start () {

  const recorder = await recordAudio();
  recorder.start();
  const audio = await recorder.stop();

}

async function record_playback () {

  const audio = await recorder.stop();
  audio.play();

}


// unit test below with 3-second recording
const sleep = time => new Promise(resolve => setTimeout(resolve, time));


// test function for functionality
async function record_playback () {

  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
};
