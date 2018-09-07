import React from 'react'
import gui from 'gui'
import alert from '../components/alert'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filePaths: []
    }
  }
  render() {
    const {filePaths} = this.state;
    return (
      <container>
        <button title="选择文件" onClick={() => this.selectFile()}/>
        <button title="下一步" onClick={() => this.nextStep()}/>
        {
          filePaths.map((path, i) => (
            <container key={path} style={{flexDirection: 'row'}}>
              <label text={path}/>
              <button title="删除" onClick={this.delPath.bind(this, path)}/>
            </container>
          ))
        }
      </container>
    )
  }
  selectFile() {
    const dialog = gui.FileOpenDialog.create();
    dialog.setOptions(gui.FileDialog.optionShowHidden)
    dialog.setOptions(gui.FileDialog.optionMultiSelect)
    dialog.setFilters([
      { description: 'excel', extensions: ['xlsx', 'xls'] }
    ])
    if (dialog.run()) {
      const {filePaths} = this.state;
      const newFilePaths = dialog.getResults();
      for (const filePath of newFilePaths) {
        if (!filePaths.includes(filePath)) filePaths.push(filePath);
      }
      this.setState({
        filePaths
      })
    }
  }
  nextStep() {
    const { store } = this.props;
    if (!this.state.filePaths.length) {
      return alert('请选择文件！');
    }
    if (!store.getState().setting.peopleList.length) {
      return alert('请在规则设置里配置人员！');
    }
    this.props.router.push({ name: 'filedMatch', query: { filePaths: this.state.filePaths } });
  }
  delPath(path) {
    const {filePaths} = this.state;
    const i = filePaths.indexOf(path);

    if (i !== -1) {
      filePaths.splice(i, 1);
      this.setState({
        filePaths
      })
    }
  }
}
