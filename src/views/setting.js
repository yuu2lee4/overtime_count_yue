import React from 'react'
import alert from '../components/alert'
import Input from '../components/input'
import { writeStatic } from '../lib/staticHandler'

export default class Setting extends React.Component {
  constructor(props) {
    super(props)
    const { store } = props;
    this.state = {
      setting: store.getState().setting,
      peopleSettingShow: false,
      tmpPeople: ''
    }
  }
  render() {
    const {router} = this.props;
    const {peopleSettingShow,setting,tmpPeople} = this.state;
    return (
        <container>
          <button title="返回" onClick={() => router.push({name: 'home'})}/>
          <container style={{flexDirection: 'row'}}>
            <label text="超过晚上"/>
            <Input text="overtime" host={setting}/>
            <label text="点算加班"/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="超过"/>
            <Input text="takeTaxi" host={setting}/>
            <label text="可以打车"/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="餐补"/>
            <Input text="subsidies" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="(字段匹配)姓名"/>
            <Input text="name" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="(字段匹配)部门"/>
            <Input text="department" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="(字段匹配)日期"/>
            <Input text="date" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="(字段匹配)上班时间"/>
            <Input text="workStart" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="(字段匹配)下班时间"/>
            <Input text="workEnd" host={setting}/>
          </container>
          <container style={{flexDirection: 'row'}}>
            <label text="要读取的工作表"/>
            <Input text="sheet" host={setting}/>
          </container>
          <button title="人员配置" onClick={() => this.setPeopleSettingShow(true)}/>
          <button title="保存" onClick={() => this.save()}/>
          <container style={{position:'absolute',left:'50%',top:'20%',backgroundColor: '#FFCC33', flexWrap: 'wrap'}} visible={peopleSettingShow}>
            <container style={{flexDirection: 'row'}}>
              <button title="关闭" onClick={() => this.setPeopleSettingShow(false)}/>
            </container>
            { 
              setting.peopleList && setting.peopleList.length ?
                setting.peopleList.map((people) => (
                  <container key={people} style={{flexDirection: 'row'}}>
                    <label text={people}/>
                    <button title="删除" onClick={() => this.delPeople(people)}/>
                  </container>
                )) :
              <label text='暂未配置导出人员'/>
            }
            <container style={{flexDirection: 'row'}}>
              <entry style={{width:50}} defaultText={tmpPeople} onTextChange={ele => this.setEntryText('tmpPeople', ele)}/>
              <button title="增加" onClick={() => this.addPeople()}/>
            </container>
            <container style={{flexDirection: 'row'}}>
              <label text='*修改之后别忘了点保存哦'/>
            </container>
          </container>
        </container>
    )
  }
  setEntryText(filed, target) {
    this.setState({
      [filed]: target.getText()
    })
  }
  setPeopleSettingShow(status) {
    this.setState({
      peopleSettingShow: status
    })
    this.setState({
      peopleSettingShow: status
    })
  }
  save() {
    const {setting} = this.state;

    if (setting.overtime > 24) {
      return alert('加班时间格式不对');
    }
    if (setting.takeTaxi > 24) {
      return alert('打车时间格式不对');
    }
    writeStatic('setting.json', JSON.stringify(setting)).then(() => {
      const { store } = this.props;
      store.dispatch({
        type: 'setSetting',
        data: setting,
      })
      alert('保存成功！');
    }).catch(e => alert(e.toString()));
  }
  addPeople() {
    const {setting} = this.state; 
    console.log(this.state.tmpPeople)
    const tmpPeople = this.state.tmpPeople.trim();
    if (!tmpPeople) return;
    if (setting.peopleList.includes(tmpPeople)) {
        return alert('已经包含该人员!');
    }
    setting.peopleList.push(tmpPeople);
    this.setState({
      setting
    })
  }
  delPeople(people) {
    const {setting} = this.state; 
    const i = setting.peopleList.indexOf(people);
    if (i !== -1) {
      setting.peopleList.splice(i, 1);
      this.setState({
        setting
      })
    }
  }
}
