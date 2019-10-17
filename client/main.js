import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
html2canvas = require('html2canvas');

import './main.html';
import './tablet';

audioVolume = new ReactiveVar(00);

peakMeterStyle = new ReactiveVar({
  width: '4em',
  height: '672px',
  bottom: '408px'
});

Meteor.startup(()=> {
});

Template.body.onRendered(function bodyOnRendered() {
  if (document.location.toString().split('/')[3] == 'tablet') {
    // import '../imports/tablet.scss';
  }
  else {
    // import '../imports/libraries/p5.min';
    // import '../imports/libraries/p5.dom.min';
    // import '../imports/libraries/P5_js_Capture';
    import AudioAnalyzer from '../imports/AudioAnalyzer/AudioAnalyzer';
    import scene from '../imports/scene';

    audioAnalyzer = new AudioAnalyzer({
      volSens: 2,
      beatHoldTime: 45,
      beatDecayRate: .9,
      beatMin: .2
    });

    audioAnalyzer.start((audioData) => {
      scene(audioData);

      // $("h1").css("top", 1050+(audioData.volume*1050)*-1);
      $("h1").css("top", '20px');

      if (audioData.volume < 0.3) {
        audioVolume.set(0);
      }

      // console.log(audioData.volume);
      // if (audioData.volume > 0.1) {
      audioVolume.set(Math.round(audioData.volume*100));
      // }
      if (audioData.volume < 0.7) {
        $("h1").css("color", "#00FF00");
      }
      if (audioData.volume > 0.7) {
        $("h1").css("color", "#FFFF00");

      }
      if (audioData.volume > 0.9) {
        $("h1").css("color", "#FF0000");
      }
    });

    // Meteor.setTimeout(()=> {
    //   html2canvas(document.body).then(function(canvas) {
    //     document.body.appendChild(canvas);
    //   });
    // }, 8000);
  }
});

Template.body.helpers({
  renderPage(page) {
    return document.location.toString().split('/')[3] == page ? true : false;
  },

  audioVolume() {
    return audioVolume.get();
  },

  peakMeterStyle() {
    return peakMeterStyle.get();
  }
});

Template.body.events({
  'click #fullScreen'(e) {
    e.preventDefault();
    var elem = document.getElementsByTagName("BODY")[0];
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }

    $('.intro').hide();
    $('.content').show();
  }
});

function normalize(min, max) {
  var delta = max - min;
  return function (val) {
    return (val - min) / delta;
  };
}
