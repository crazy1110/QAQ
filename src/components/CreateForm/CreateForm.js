import React, {Component} from 'react'
import {Button} from 'antd'
import InputForm from '../InputForm/InputForm'
import RadioForm from '../RadioForm/index'
import TextAreaForm from '../TextareaForm/TextareaForm'

class CreateForm extends Component{

  constructor () {
    super()
    this.state = {
      input: [] ,
      radio: [] ,
    }
  }

  handleAddInput=(value) => {
    this.setState({
      input:[value]
    })
  }
  handleAddRadio=(value) => {
    this.setState({
      radio:[value]
    })
  }

  render() {
    return (
      <div>
        <Button onClick={()=>{console.log(this.state)}}>show state </Button>
        <InputForm handleAddInput={this.handleAddInput} />,
        <RadioForm handleAddRadio={this.handleAddRadio}/>,
        <TextAreaForm />
      </div>
    )
  }
}

export default CreateForm
