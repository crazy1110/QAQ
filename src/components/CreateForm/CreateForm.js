import React from 'react'
import {Button} from 'antd'
import InputForm from '../InputForm/InputForm'
import RadioForm from '../RadioForm/index'
import TextAreaForm from '../TextareaForm/TextareaForm'
import CollegeForm from '../collegeForm/collegeFrom'

class CreateForm extends React.Component{
  constructor (){
    super()
    this.state={
      input:[],
      radio:[]
    }
  }

  handleAddInput=(values)=>{
    this.setState({
      input:[values]
    })
  }
  handleAddRadio=(values)=>{
    this.setState({
      radio:[values]
    })
  }

  render() {
    return (
      <div>
        <Button onClick={()=>{console.log(this.state)}}>show state </Button>
        <InputForm handleAddInput={this.handleAddInput} />,
        <RadioForm handleAddRadio={this.handleAddRadio}/>,
        <TextAreaForm />
        <CollegeForm />
      </div>
    )
  }
}

export default CreateForm