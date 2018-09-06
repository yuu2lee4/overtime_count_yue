import gui from 'gui'

export default function({ router }) {
    return gui.MenuBar.create([
        {
          label: 'File',
          submenu: [{
                label: '关于'
            }, {
                label: '规则设置',
                onClick: () => router.push({ name: 'setting' })
            }, {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
                onClick: () => gui.messageLoop.quit()
           }],
        }
    ])
}