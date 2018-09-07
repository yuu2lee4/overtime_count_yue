import React from 'react'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { width, text, host  } = this.props;
    return (
        <entry style={{ width: width|| 200  }} defaultText={host[text]} onTextChange={ele => host[text] = ele.getText()}/>
    )
  }
}
