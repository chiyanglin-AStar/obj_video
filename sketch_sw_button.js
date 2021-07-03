// Copyright (c) 2021 chiyanglin@gmail.com
// Modified for Mobilenet Education
//
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let resultsP;

var windows_height = document.body.clientHeight; // for fit windows size
var windows_width = document.body.clientWidth;
var user_language = navigator.language;
let switchFlag = false;
let switchBtn;

var options = {
     video: {
         facingMode: "user"
    }
   };


function setup() {

  var x = "Language of the browser: " + user_language;
  noCanvas();
  // Create a camera input
  //video = createCapture(VIDEO);
  video = createCapture(options);

  switchBtn = createButton('Switch Camera');
  switchBtn.position(40, 40);
  switchBtn.mousePressed(switchCamera);

  video.size(width,height);
  console.log(" video facing mode : ", video.facingMode);
  console.log(" windows width =" ,windows_width);
  console.log(" windows height =" ,windows_height);
  console.log(" Capture width =" ,width);
  console.log(" Capture height =" ,height);
  console.log(x);
  document.getElementById("demo").innerHTML = x;

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  classifyVideo();
}

function switchCamera()
{
  switchFlag = !switchFlag;
  stopCapture();
  if(switchFlag==true)
  {
   video.remove();

   options = {
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   };
  }
  else
  {
   video.remove();

   options = {
     video: {
         facingMode:"user"
     }
   };
  }
  capture = createCapture(options);
  video.size(width,height);
  console.log(" Capture width =" ,width);
  console.log(" Capture height =" ,height);
}

function stopCapture() {
  let stream = video.elt.srcObject;

  if(stream){
    tracks = stream.getTracks();
    if(tracks){
      tracks.forEach(function(track) {
        track.stop();
      });
    }
  }

  video.elt.srcObject = null;
}
