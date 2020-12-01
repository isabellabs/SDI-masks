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
  var cnv = createCanvas(600, 450);
  cnv.parent('video_holder');

  // var x = (windowWidth - width) / 2;
  // var y = (windowHeight - height) / 2;
  // cnv.position(x, y);

  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor('MobileNet', { numLabels: 4 }, modelReady);
  classifier = mobilenet.classification(video, 4, videoReady);

  maskonbtn = createButton('Mask On');
  maskonbtn.class('btn-train');
  maskonbtn.mousePressed(function() {
    classifier.addImage('1');
  });
  
  maskoffButton = createButton('Mask Off');
  maskoffButton.class('btn-train');
  maskoffButton.mousePressed(function() {
    classifier.addImage('0');
  });

  maskWrongButton = createButton('Mask wrong');
  maskWrongButton.class('btn-train');
  maskWrongButton.mousePressed(function() {
    classifier.addImage('2');
  });

  neutralButton = createButton('Neutral');
  neutralButton.class('btn-train');
  neutralButton.mousePressed(function() {
    classifier.addImage('3');
  });

  trainButton = createButton('Train');
  trainButton.class('btn-train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveButton = createButton('Save');
  saveButton.class('btn-train');
  saveButton.mousePressed(function() {
    classifier.save();
  });

 }

function draw() {
  background(0);
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, 600, 450);
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