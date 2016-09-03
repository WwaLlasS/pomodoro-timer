'use strict';
const {ipcRenderer} = require('electron')
const chronometer = require('./modules/chronometer');
const notifier = require('node-notifier');
const path = require('path');

const btn_start = document.getElementById('start');
const btn_stop = document.getElementById('stop')
const btn_shortBreak = document.getElementById('short')
const btn_longBreak = document.getElementById('long')

var initPomodoro = () => {
  let count_segundos = -1;
  let count_minutos = document.getElementById('tiempo').value;
  count_minutos = parseInt(count_minutos);
  chronometer.timer(count_minutos, count_segundos)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
    'icon': path.join(__dirname, '/resources/clock-red.png')
  })
}

var shortBreak = () => {
  let count_segundos = -1;
  let count_minutos = 5;
  chronometer.timer(count_minutos, count_segundos)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
}

var longBreak = () => {
  let count_segundos = -1;
  let count_minutos = 15;
  chronometer.timer(count_minutos, count_segundos)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
}

// ipcRenderer.on('Init-pomodoro', () => {
//   let count_segundos = -1;
//   let count_minutos = 25;
//   chronometer.timer(count_minutos, count_segundos)
//   notifier.notify({
//     'title':'Pomodoro Timer',
//     'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
//     'icon':  path.join(__dirname, '/resources/clock-red.png')
// })

btn_start.addEventListener('click', initPomodoro)
btn_stop.addEventListener('click', chronometer.stopTimer)

btn_shortBreak.addEventListener('click', shortBreak)
btn_longBreak.addEventListener('click', longBreak)
