import '../imports/tablet.scss';
import './tablet.html';

Template.tablet.events({
  'click button'(e) {
    switch (e.target.id) {
      case 'oscButton1':
      Meteor.call('sendOsc', '/composition/columns/1/connect');
      break;

      case 'oscButton2':
      Meteor.call('sendOsc', '/composition/columns/2/connect');
      break;

      case 'oscButton3':
      Meteor.call('sendOsc', '/composition/columns/3/connect');
      break;

      case 'oscButton4':
      Meteor.call('sendOsc', '/composition/columns/4/connect');
      break;

      case 'oscButton5':
      Meteor.call('sendOsc', '/composition/columns/5/connect');
      break;

      case 'oscButton6':
      Meteor.call('sendOsc', '/composition/columns/6/connect');
      break;
    }
  }
});
