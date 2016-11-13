'use strict';
const {ipcRenderer} = require('electron')
const chronometer = require('./modules/chronometer');
const notifier = require('node-notifier');
const path = require('path');
const {closeWin} = require('electron').remote.require('./main')
const btn_close = document.getElementById('button-close')

let isPomodoro = false;

var initPomodoro = () => {
  let count_segundos = -1;
  let count_minutos = 25;
  chronometer.timer(count_minutos, count_segundos, !isPomodoro)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
}

var shortBreak = () => {
  let count_segundos = -1;
  let count_minutos = 5;
  chronometer.timer(count_minutos, count_segundos, isPomodoro)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Short Break, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
}

var longBreak = () => {
  let count_segundos = -1;
  let count_minutos = 15;
  chronometer.timer(count_minutos, count_segundos, isPomodoro)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Long Break, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
}

//Menssages from Main process
ipcRenderer.on('init-pomodoro', initPomodoro)
ipcRenderer.on('short-break', shortBreak)
ipcRenderer.on('long-break', longBreak)
ipcRenderer.on('stop', chronometer.stopTimer)
//Listeners
btn_close.addEventListener('click', ()=> closeWin('main'))
