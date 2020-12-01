let mobilenet;
let classifier;
let video;
let label = 'Loading model';
let maskonButton, maskoffButton;
let saveButton;
let trainButton;
let prevstate = 'start'
let state = ''

function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('./SDIGR7_model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'Model ready!';
}

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  var canvas = createCanvas(600, 450);

  savebtn = createButton('Start');
  savebtn.class('btn-start');
  savebtn.mousePressed(function () {
    classifier.classify(gotResults);
  });

  canvas.parent('video_holder');

  video = createCapture(VIDEO);
  video.hide();

  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  var patch
  $.get('./pd_patch/TestFreq.pd', function (patchStr) {

    patch = Pd.loadPatch(patchStr)
    Pd.send('freq', [parseFloat("0")])
    Pd.start()
  })
}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, 600, 450);
  pop();

  select('#displayText').html(label)

  if (label == 'Mask On') {
    select('#body').class('mask-on-bg');
    select('#showAdvice').class('showAdviceON');
    select('#displayText').class('mask-on-title');
    select('#showAdvice').html("YOUR MASK IS ON");
    select('#video_holder').class('video-mask-on');
    select('#gif').html("<img src='Gifs/animation_500_ki4d2vec-min.gif' width='250px'>");

    state = 'on'
    if (state != prevstate) {
      Pd.send('freq', [parseFloat("450")])

      prevstate = state
    }
    else { }
  }
  else if (label == 'Mask Off') {
    select('#body').class('mask-off-bg');
    select('#showAdvice').class('showAdviceOFF');
    select('#displayText').class('mask-off-title');
    select('#showAdvice').html("YOUR MASK IS OFF");
    select('#video_holder').class('video-mask-off');
    select('#gif').html("<img src='Gifs/animation_500_ki4dqc5j-min.gif' width='250px'>");

    state = 'off'
    if (state != prevstate) {
      Pd.send('freq', [parseFloat("45")])

      prevstate = state
    }
    else { }
  }
  else if (label == 'Mask Wrong') {
    select('#body').class('mask-wrong-bg');
    select('#showAdvice').class('showAdviceWRONG');
    select('#displayText').class('mask-wrong-title');
    select('#showAdvice').html("YOUR MASK IS WRONG");
    select('#video_holder').class('video-mask-wrong');
    select('#gif').html("<img src='Gifs/animation_500_ki4iedyn.gif' width='250px'>");

    state = 'wrong'
    if (state != prevstate) {
      Pd.send('freq', [parseFloat("200")])

      prevstate = state
    }
    else { }
  }
  else if (label == 'Neutral') {
    select('#body').class('mask-neutral-bg');
    select('#showAdvice').class('showAdviceNeutral');
    select('#displayText').class('mask-neutral-title');
    select('#showAdvice').html("");
    select('#video_holder').class('video-mask-neutral');
    select('#gif').html("<img src='Gifs/ZZZZZZZZZZZ.gif' width='250px'>");

    state = 'neutral'
    if (state != prevstate) {
      Pd.send('freq', [parseFloat("0")])

      prevstate = state
    }
    else { }
  }
}
function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    if (result[0].label == 0) {
      label = "Mask Off"
    } else if ((result[0].label == 1)) { label = "Mask On" }
    else if ((result[0].label == 2)) { label = "Mask Wrong" }
    else { label = "Neutral" }
    //label = result[0].label;
    classifier.classify(gotResults);
  }
}