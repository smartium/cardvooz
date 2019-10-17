/*
 * @name Video Capture
 * @frame 710,240
 * @description <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 * at least one video file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p><br><br>
 * Capture video from the webcam and display
 * on the canvas as well with invert filter. Note that by
 * default the capture feed shows up, too. You can hide the
 * feed by uncommenting the capture.hide() line.
 */
let capture;

function setup() {
  createCanvas(504, 378);
  capture = createCapture(VIDEO);
  capture.size(504, 378);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 504, 378);
  // filter('POSTERIZE', 5);
}
