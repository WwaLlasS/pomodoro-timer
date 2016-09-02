const path = require('path');
const notifier = require('node-notifier');
const spanSegundos = document.getElementById('segundos');
const spanMinutos = document.getElementById('minutos');
const audio = document.getElementsByTagName('audio');
var counter;

exports.stopTimer = function () {
  clearInterval(counter);
  spanSegundos.innerHTML = '00';
  spanMinutos.innerHTML = '00';
};

exports.timer = function (minutos, segundos) {
  exports.stopTimer()
  minutos = (minutos > 30)? 30: minutos;
  minutos = (minutos < 0)? 0 : minutos;

  counter = setInterval(function() {
    if (segundos == -1) {
      minutos--;
      segundos = 59;
    }

    if(segundos < 10) spanSegundos.innerHTML = '0' + segundos;
    else spanSegundos.innerHTML = segundos;

    if(minutos < 10) spanMinutos.innerHTML = '0' + minutos;
    else spanMinutos.innerHTML = minutos;

    segundos--;

    if (minutos == -1) {
      exports.stopTimer();
      audio[0].play();
      notifier.notify({
        'title': 'Pomodoro Timer',
        'message': 'El tiempo a finalizado',
        'icon': path.join(__dirname,'../resources/clock-red.png')
      });

    }

  },1000)
};
