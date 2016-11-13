'use strict';
const btn_add = document.getElementById('add-btn')
const btn_remove = document.getElementById('remove-task')
const container = document.getElementById('task-container')
let count = 0

btn_add.addEventListener('click', () => {
  let task = document.getElementById('tarea')
  let div =  document.createElement('div')
  let htmltags = '<input class="check" type="checkbox" /><span>'+ task.value +'</span>'
  div.classList.add('task-box')
  div.innerHTML = htmltags
  if (count < 14 && task.value != '' ) {
    count++;
    container.appendChild(div)
  }
  (task.value.length != 0)? task.value = '':task.value;
})

btn_remove.addEventListener('click', () => {
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
})
