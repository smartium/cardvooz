import './cadastro.scss';
import './cadastro.html';

Template.cadastro.onRendered(()=> {
  $('#txtNome').focus();
});

Template.cadastro.events({
  'submit form'(e) {
    e.preventDefault();
    if (e.target.name.value) {
      Meteor.call('cadastrar', e.target.name.value);
      // e.target.button.disabled = true;
      $('#button').hide();
      Meteor.setTimeout(()=> {
        cabineState.set('play');
        console.log(cabineState.get());
        e.target.name.value = null;
        // e.target.button.disabled = false;
        $('#button').show();
        alert
      }, 3000);
    }
    else {
      alert('Necessário entrar com um nome.')
    }
  }
});
