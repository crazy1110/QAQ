import React from 'react'
import axios from 'axios'
import {Button, Input} from 'antd'
import InputForm from '../InputForm/InputForm'
import RadioForm from '../RadioForm/index'
// import TextAreaForm from '../TextareaForm/TextareaForm'
import CollegeForm from '../collegeForm/collegeFrom'

let A_Z = ''
for (let i = 65; i < 91; i++) {
  A_Z += String.fromCharCode(i)
}
let URL = 'http://form.sealbaby.cn/'

class CreateForm extends React.Component {
  constructor () {
    super()
    this.state = {
      url: '',
      input: {
        name: [],
        require: [],
        values: [],
        type: '',
        rules: []
      },
      radio: {
        name: [],
        require: [],
        values: [],
        type: '',
        rules: []
      },
      textArea: {
        name: [],
        require: [],
        values: [],
        type: '',
        rules: []
      },
      values: {}
    }
  }

  handleAddInput = (values) => {
    this.setState({
      input: values
    })
  }
  handleAddRadio = (values) => {
    this.setState({
      radio: values
    })
  }
  handleAddTextArea = (values) => {
    this.setState({
      textArea: values
    })
  }

  handleSubmit = () => {
    let id = -1
    let lenInput = this.state.input.name.length, lenRadio = this.state.radio.name.length,
      lenTextArea = this.state.textArea.name.length
    let obj = {}
    obj.attributes = {}
    obj.url = this.state.url
    for (let i = 0; i < lenInput; i++) {
      let OBJ = {}
      id++
      let require = this.state.input.require, name = this.state.input.name, rules = this.state.input.rules,
        type = this.state.input.type
      OBJ[A_Z[id]] = {
        require: require[i],
        type: type,
        value: '',
        name: name[i],
        rules: rules[i]
      }
      obj.attributes = {...obj.attributes, ...OBJ}
    }
    for (let i = 0; i < lenRadio; i++) {
      let OBJ = {}, valueStr = ''
      id++
      let require = this.state.radio.require, name = this.state.radio.name, values = this.state.radio.values,
        type = this.state.radio.type
      let singleValue = values[i]
      for (let j = 0; j < singleValue.length; j++) {
        if (j === 0) {
          valueStr = valueStr + singleValue[j]
        } else {
          valueStr = valueStr + ',' + singleValue[j]
        }
      }
      OBJ[A_Z[id]] = {
        require: require[i],
        type: type,
        values: valueStr,
        name: name[i],
        rules: ''
      }
      obj.attributes = {...obj.attributes, ...OBJ}
    }
    for (let i = 0; i < lenTextArea; i++) {
      let OBJ = {}
      id++
      let require = this.state.input.require, name = this.state.input.name, rules = this.state.input.rules,
        type = this.state.input.type
      OBJ[A_Z[id]] = {
        require: require[i],
        type: type,
        values: '',
        name: name[i],
        rules: rules[i]
      }
      obj.attributes = {...obj.attributes, ...OBJ}
    }
    this.setState({values: obj})
    let urlh = URL + 'form/add'
    const config = {
      method: 'post',
      url: urlh,
      headers: {'Content-Type': 'application/json'},
      data: obj
    }
    console.log('config: ', config)
    axios(config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    let url = this.state.url
    this.props.history.push(`/home/${url}`)
  }

  render () {
    return (
      <div>
        <Button type='primary' onClick={() => { console.log(this.state) }}>测试state</Button>
        <Input addonBefore={URL} placeholder='请输入自定义URL' style={{width: '500px'}} onChange={(e) => {
          this.setState({url: e.target.value})
        }} />
        <InputForm handleAddInput={this.handleAddInput} type={'input'} />,
        <RadioForm handleAddRadio={this.handleAddRadio} />,
        <InputForm handleAddTextArea={this.handleAddTextArea} type={'textArea'} />
        <CollegeForm />
        <Button type='primary' onClick={() => {
          this.handleSubmit()
        }}>创建完成</Button>
      </div>
    )
  }
}

export default CreateForm
