import gui from 'gui'
import createMenu from './lib/createMenu'
import createRouter from './lib/createRouter'
import routerConfig from './router'

// Create a window and a root container:
const win = gui.Window.create({})
win.setContentSize({ width: 400, height: 250 })
win.center()
win.activate()

const router = createRouter({
  config: routerConfig,
  window: win
})

const menu = createMenu({ router });

if (process.platform == 'darwin') {
  gui.app.setApplicationMenu(menu)
} else {
  win.setMenuBar(menu)
}

// Start your app
if (!process.versions.yode) {
  gui.MessageLoop.run()
  process.exit(0)
}
