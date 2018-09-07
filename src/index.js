import gui from 'gui'
import createMenu from './lib/createMenu'
import createRouter from './lib/createRouter'
import routerConfig from './config/router'
import { readStatic } from './lib/staticHandler'
import { createAppStore } from './store/index'

readStatic('setting.json').then(res => {
  const store = createAppStore()
  store.dispatch({
    type: 'setSetting',
    data: JSON.parse(res),
  })
  // Create a window and a root container:
  const win = gui.Window.create({})
  win.setContentSize({ width: 400, height: 250 })
  win.center()
  win.activate()

  const router = createRouter({
    config: routerConfig,
    window: win,
    store
  })

  const menu = createMenu({ router });

  if (process.platform == 'darwin') {
    gui.app.setApplicationMenu(menu)
  } else {
    win.setMenuBar(menu)
  }
}).catch(e => alert(e.toString()));

// Start your app
if (!process.versions.yode) {
  gui.MessageLoop.run()
  process.exit(0)
}
