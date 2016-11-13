'use strict';
const path = require('path');
const notifier = require('node-notifier');
const spanSegundos = document.getElementById('segundos');
const spanMinutos = document.getElementById('minutos');
const audio = document.getElementsByTagName('audio');
var counter;
let count = 0;

exports.stopTimer = () => {
  clearInterval(counter);
  spanSegundos.innerHTML = '00';
  spanMinutos.innerHTML = '00';
};

exports.timer = (minutos, segundos, isPomodoro) => {
  count = (count == 4)? 0:count;
  exports.stopTimer()
  counter = setInterval( () => {
    if (segundos == -1) {
      minutos--;
      segundos = 59;
    }

    (segundos < 10) ? spanSegundos.innerHTML = '0' + segundos : spanSegundos.innerHTML = segundos;
    (minutos < 10) ? spanMinutos.innerHTML = '0' + minutos : spanMinutos.innerHTML = minutos;
    segundos--;

    if (minutos == -1) {
      if (isPomodoro) {
        let total = document.getElementById('total')
        count++
        total.innerHTML = count
      }
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
