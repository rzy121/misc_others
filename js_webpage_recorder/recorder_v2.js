const player = document.getElementsById('player');

const mic = stream => {

  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  porcessor.onaudioprocess = e => {

    console.log(e.inputButter);

  };

};


const
