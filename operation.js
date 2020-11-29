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
  select('#body').class('bodyON');
  select('#showAdvice').class('showAdviceON');
  select('#displayText').class('displayTextON');
	select('#showAdvice').html("Mask ok")
}
else if(label == 'Mask Off'){
  select('#body').class('bodyOFF');
  select('#showAdvice').class('showAdviceOFF');
  select('#displayText').class('displayTextOFF');
	select('#showAdvice').html("Please use Mask!!")
}
else if(label == 'Mask Wrong'){
  select('#body').class('bodyWrong');
  select('#showAdvice').class('showAdviceWRONG');
  select('#displayText').class('displayTextWRONG');
	select('#showAdvice').html("Please adjust Your Mask")
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