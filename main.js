'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, Tray, ipcMain} = electron
const path = require('path');

let mainWin
let tray
let todoWin

var createMainWindow = (screenWidth, screenHeight) =>{
  mainWin = new BrowserWindow({
    width: 400,
    height: 160,
    autoHideMenuBar:true,
    resizable:false,
    alwaysOnTop:true,
    x: screenWidth - 410,
    y: 40,
    frame:false,
    icon: path.join(__dirname, '/resources/pomodoro-counter-empty.png')
  })
  mainWin.loadURL(`file://${__dirname}/index.html`)
  //event Handler
  mainWin.on('close', (e) => {
    app.quit()
  })
}

var createTodoWindow = (screenWidth, screenHeight) => {
  todoWin = new BrowserWindow({
    width:400,
    minHeight:500,
    resizable:false,
    show:false,
    backgroundColor:'#03A9F4',
    alwaysOnTop:true,
    frame:false,
    x:screenWidth - 410,
    y:40,
    offscreen: true
  })
  todoWin.loadURL(`file://${__dirname}/todo.html`)
}
  //Dev tools chrome
  // mainWin.openDevTools()

app.on('ready', () => {
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  createMainWindow(width, height)
  createTodoWindow(width, height)
  //Create tray Menu
  tray = new Tray(path.join(__dirname, '/resources/pomodoro-counter-empty.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label:'Iniciar pomodoro', click() {mainWin.webContents.send('init-pomodoro')}},
    {label:'Detener pomodoro', click() {mainWin.webContents.send('stop')} },
    {label:'Break', type:'separator'},
    {label:'Descanso breve',click() {mainWin.webContents.send('short-break')}},
    {label:'Descanso prolongado', click() {mainWin.webContents.send('long-break')}},
    {label:'to-do', type:'separator'},
    {label:'Tareas a realizar', click() {todoWin.isVisible() ? todoWin.hide() : todoWin.show()}},
    // {label:'Recordatorios', type:'checkbox'},
    {label:'Division', type:'separator'},
    {label:'Salir', click(){!app.quit()}}
  ])

  //Event Click Handler
  tray.on('click', () => {
    mainWin.isVisible() ? mainWin.hide() : mainWin.show();
  })

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Pomodoro Timer')

})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    createMainWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//Close Buttons
exports.closeWin = function (win) {
  if (win === 'todo') {
    todoWin.hide()
  }else if (win === 'main') {
    mainWin.hide()
  }
};
