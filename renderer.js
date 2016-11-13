'use strict';
const {ipcRenderer} = require('electron')
const chronometer = require('./modules/chronometer');
const notifier = require('node-notifier');
const path = require('path');

let isPomodoro

var shortBreak = () => {
  isPomodoro = false;
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
  isPomodoro = false
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
ipcRenderer.on('init-pomodoro', (event) => {
  isPomodoro = true
  let count_segundos = -1;
  let count_minutos = 25;
  chronometer.timer(count_minutos, count_segundos, isPomodoro)
  notifier.notify({
    'title':'Pomodoro Timer',
    'message':'Pomodoro iniciado, tiempo: ' + count_minutos + 'min.',
    'icon':  path.join(__dirname, '/resources/clock-red.png')
  })
})

ipcRenderer.on('short-break', (event) => {
  shortBreak()
})

ipcRenderer.on('long-break', (event) => {
  longBreak()
})

ipcRenderer.on('stop', (event) => {
  chronometer.stopTimer()
})
