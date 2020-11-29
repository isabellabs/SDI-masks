let mobilenet;
let classifier;
let video;
let label = 'Needs to be trained';
let maskonbtn, maskoffbtn, trainbtn, savebtn;

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function setup() {
  var cnv = createCanvas(600, 500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  maskonbtn = createButton('Mask On');
  maskonbtn.class('btn-start');
  maskonbtn.mousePressed(function() {
    classifier.addImage('Mask On');
  });
  
  maskoffButton = createButton('Mask Off');
  maskoffButton.class('btn-start');
  maskoffButton.mousePressed(function() {
    classifier.addImage('Mask Off');
  });


  maskoffButton = createButton('Mask wrong');
  maskoffButton.class('btn-start');
  maskoffButton.mousePressed(function() {
    classifier.addImage('Mask wrong');
  });

  trainbtn = createButton('Train');
  trainbtn.class('btn-start');
  trainbtn.mousePressed(function() {
    classifier.train(whileTraining);
  });

  savebtn = createButton('Save');
  savebtn.class('btn-start');
  savebtn.mousePressed(function() {
    classifier.save();
  });

 }



function draw() {
  background(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 600, 460);
  pop();
  
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
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