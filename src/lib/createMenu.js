import gui from 'gui'
import alert from '../components/alert'

export default function({ router }) {
    return gui.MenuBar.create([
        {
          label: 'File',
          submenu: [{
                label: '关于',
                onClick: () => alert('code by yuri(yuu2lee4@qq.com)')
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