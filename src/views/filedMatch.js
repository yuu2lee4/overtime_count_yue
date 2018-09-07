import React from 'react'
import gui from 'gui'
import Input from '../components/input'
import { read, write } from '../lib/excelHandler';
import alert from '../components/alert'

export default class FiledMatch extends React.Component {
  constructor(props) {
    super(props)
    const { store } = props;
    this.setting = store.getState().setting;
    console.log(this.props.query)
  }
  render() {
    const {router} = this.props;
    const setting = this.setting;
    return (
        <container>
            <button title="返回" onClick={() => router.push({name: 'home'})}/>
            <container style={{flexDirection: 'row'}}>
              <label text="姓名"/>
              <Input text="name" host={setting}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text="部门"/>
              <Input text="department" host={setting}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text="日期"/>
              <Input text="date" host={setting}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text="上班时间"/>
              <Input text="workStart" host={setting}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text="下班时间"/>
              <Input text="workEnd" host={setting}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text="姓读取的工作表"/>
              <Input text="sheet" host={setting}/>
            </container>
            <button title="导出" onClick={() => this.selectFilename()}/>
        </container>
    )
  }
  selectFilename() {
    const dialog = gui.FileSaveDialog.create();
    dialog.setFilters([
      { description: 'excel', extensions: ['xlsx'] }
    ])
    if (dialog.run()) {
      const filename = dialog.getResult();
      console.log(filename)
      this.exportFile(filename);
    }
  }
  exportFile(filename) {
    const setting = this.setting;
    const {filePaths} = this.props.query;
    const data = [];
    for (const filePath of filePaths) {
        data.push(...read(filePath, setting));
    }
    write(data, { filename, subsidies: setting.subsidies }).then(() => {
        alert('导出完成!');
    }).catch(() => {
        alert('导出失败!');
    });
  }
}
