let mobilenet;
let classifier;
let video;
let label = 'Loading model';
let maskonButton,maskoffButton;
let saveButton; 
let trainButton;

function modelReady() {
  console.log('Model is ready!!!');
  classifier.load('model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'model ready';
}

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  var canvas = createCanvas(600, 450);

  savebtn = createButton('Start');
  savebtn.class('btn-start');
  savebtn.mousePressed(function() {
    classifier.classify(gotResults);
  });

  canvas.parent('video_holder');

  video = createCapture(VIDEO);
  video.hide();

  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
}

function draw() {
  background(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 600, 450);
  pop();  

select('#displayText').html(label)

if(label == 'Mask On'){
  select('#body').class('mask-on-bg');
  select('#showAdvice').class('showAdviceON');
  select('#displayText').class('mask-on-title');
  select('#showAdvice').html("YOUR MASK IS ON")
  select('#showAdvice').html("<lottie-player src='https://assets9.lottiefiles.com/packages/lf20_aibtg4s1.json' background='transparent' speed='1' style='width: 300px; height: 300px;' loop autoplay></lottie-player>");
}
else if(label == 'Mask Off'){
  select('#body').class('mask-off-bg');
  select('#showAdvice').class('showAdviceOFF');
  select('#displayText').class('mask-off-title');
  select('#showAdvice').html("YOUR MASK IS OFF");
}

else if(label == 'Mask Wrong'){
  select('#body').class('mask-wrong-bg');
  select('#showAdvice').class('showAdviceWRONG');
  select('#displayText').class('mask-wrong-title');
  select('#showAdvice').html("YOUR MASK IS WRONG");
  select('#showAdvice').html("<lottie-player src='https://assets5.lottiefiles.com/packages/lf20_d7zirht6.json' background='transparent' speed='1' style='width: 300px; height: 300px;' loop autoplay></lottie-player>");
}
}
function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result[0].label;
    classifier.classify(gotResults);
  }
}