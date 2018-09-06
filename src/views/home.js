import React from 'react'
import gui from 'gui'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filePaths: []
    }
  }
  render() {
    const {filePaths} = this.state;
    console.log('render');
    console.log(filePaths);
    return (
      <container>
        <button title="选择文件" onClick={() => this.selectFile()}/>
        <button title="下一步" onClick={() => this.nextStep()}/>
        {
          filePaths.map((path, i) => (
            <container key={path} style={{flexDirection: 'row'}}>
              <label text={path}/>
              <button title="删除" onClick={this.delPath.bind(this, i)}/>
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
      console.log(newFilePaths);
      for (const filePath of newFilePaths) {
        if (!filePaths.includes(filePath)) filePaths.push(filePath);
      }
      this.setState({
        filePaths
      })
    }
  }
  nextStep() {
    this.props.router.push({ name: 'filedMatch', query: { filePaths: this.state.filePaths } });
  }
  delPath(i) {
    const {filePaths} = this.state;
    const temp = filePaths.slice(0);
    console.log(i)
    console.log(temp)
    temp.splice(i, 1);
    console.log(temp)
    let test = [];
    test = temp;
    this.setState({
      filePaths: test
    })
  }
}
