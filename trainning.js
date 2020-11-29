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

select('#display_text').html(label)
if(label == 'Mask On'){
  select('#body').style('background-color','#1F000A');
  select('#showAdvice').style('color','green');
	select('#showAdvice').html("Mask ok")
}
else if(label == 'Mask Off'){
  select('#body').style('background-color','#e3e2df')
  select('#showAdvice').style('color','red');
	select('#showAdvice').html("Please use Mask!!")
}
else if(label == 'Mask Wrong'){
  select('#body').style('background-color','#e3e2df')
  select('#showAdvice').style('color','yellow');
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