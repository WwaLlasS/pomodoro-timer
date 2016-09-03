'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, Tray, ipcMain} = electron
const path = require('path');

let mainWin
let tray

var createMainWindow = () =>{
    mainWin = new BrowserWindow({
    width: 400,
    height: 500,
    autoHideMenuBar:true,
    backgroundColor:'#03A9F4',
    resizable:false,
    center:true,
    icon: path.join(__dirname, 'resources/pomodoro-counter-empty.png')
  })

  //Dev tools chrome
  mainWin.openDevTools()

  //load Index.html in the Browser's Window
  mainWin.loadURL(`file://${__dirname}/index.html`)

  mainWin.on('closed', () => {
    app.quit()
  })
}

app.on('ready', () => {
  createMainWindow()

  let todoWin = new BrowserWindow({
    width:400,
    height:500,
    resizable:false,
    show:false,
    backgroundColor:'#03A9F4',
    alwaysOnTop:true,
    frame:false,
    x:960, y:0,
    offscreen: true
  })
  todoWin.loadURL(`file://${__dirname}/todo.html`)

  //Create tray Menu

  tray = new Tray(path.join(__dirname, 'resources/pomodoro-counter-empty.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label:'Iniciar pomodoro', click() { } },
    {label:'Break', type:'separator'},
    {label:'Descanso breve'},
    {label:'Descanso prolongado'},
    {label:'TO DO', type:'separator'},
    {label:'Tareas a realizar', click() { todoWin.isVisible() ? todoWin.hide() : todoWin.show()}},
    {label:'Recordatorios', type:'checkbox'}
  ])

  //Event Click Handler
  tray.on('click', () => {
    mainWin.isVisible() ? mainWin.hide() : mainWin.show()
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
