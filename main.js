'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, Tray} = electron
const path = require('path');

let tray = null;

app.on('ready', () => {
  let mainWin = new BrowserWindow({
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

  // Emitted when the window is closed.
  mainWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWin = null
  })

  //load Index.html in BrowserWindow
  mainWin.loadURL(`file://${__dirname}/index.html`)

  //Create tray Menu

  tray = new Tray(path.join(__dirname, 'resources/pomodoro-counter-empty.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label:'Iniciar pomodoro'},
    {label:'separador', type:'separator'},
    {label:'Descanso breve'},
    {label:'Descanso prolongado'}
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Pomodoro Timer')



})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWin === null) {
    createWindow()
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
