'use strict';
const container = document.getElementById('task-container')
const btn_add = document.getElementById('button-add')
const btn_remove = document.getElementById('button-remove')
const btn_close = document.getElementById('button-close')
const {closeWin} = require('electron').remote.require('./main')

let count = 0
let tecla = []
const KEY_ENTER = 13


const addTask = () => {
  let task = document.getElementById('tarea')
  let div =  document.createElement('div')
  let htmltags = '&nbsp;<input class="check" type="checkbox" />&nbsp;<span>'+ task.value +'</span>'
  div.classList.add('task-box')
  div.innerHTML = htmltags
  if (count < 14 && task.value != '' ) {
    count++;
    container.appendChild(div)
  }
  (task.value.length != 0)? task.value = '':task.value;
}

const removeTask = () => {
  let checkbox = document.getElementsByClassName('check')
  let div = document.getElementsByClassName('task-box')
  for (var i = 0; i < checkbox.length; i++) {
    console.log('isChecked? '+checkbox[i].checked+' Index: '+i);
    if(checkbox[i].checked){
      container.removeChild(div[i])
      break;
    }
  }
  console.log('Removiste un elemento');
}

btn_add.addEventListener('click', addTask)

btn_remove.addEventListener('click', removeTask )

btn_close.addEventListener('click', ()=> closeWin('todo'))

document.addEventListener('keydown', (e)=>{
  tecla[e.keyCode] = true
  if(tecla[KEY_ENTER]){
    addTask()
  }
})

document.addEventListener('keyup', (e)=> {
  tecla[e.keyCode] = false
})
