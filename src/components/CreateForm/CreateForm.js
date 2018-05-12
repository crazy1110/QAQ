import React from 'react'
import InputForm from '../InputForm/InputForm'
import RadioForm from '../RadioForm/index'
import TextAreaForm from '../TextareaForm/TextareaForm'

class CreateForm extends React.Component{
  render() {
    return (
      <div>
        <InputForm />,
        <RadioForm />,
        <TextAreaForm />
      </div>
    )
  }
}

export default CreateForm