import {Form, Icon, Button, Radio, Input} from 'antd'
import {Component} from 'react'
import RadioModel from './radioModel/index'
import './index.css'

const FormItem = Form.Item
// const RadioButton = Radio.Button
const RadioGroup = Radio.Group

let ID = 0, radioValueList = [], radioTitleList = [], radioRequireList = []

class DynamicFieldSet extends Component {
  constructor () {
    super()
    this.state = {
      radioVisible: false,
      radioValues: []
    }
  }

  remove = (k, typeKeys) => {
    const {form} = this.props
    const keys = form.getFieldValue(typeKeys)
    console.log('remove: ', keys)

    for (let i = 0; i < keys.length; i++) {
      if (k === keys[i]) {
        keys[i] = -1
      }
    }
    let obj = {}
    obj[typeKeys] = keys
    console.log('obj: ', obj)
    form.setFieldsValue(obj)
    this.handleChange()
  }

  addRadio = () => {
    // can use data-binding to get

    this.setState({
      radioVisible: true
    })
  }

  handleChange=() => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const keys = this.props.form.getFieldValue('radioKeys')
        let name = [], values = [], require = []
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== -1) {
            name.push(radioTitleList[i])
            values.push(radioValueList[i])
            require.push(radioRequireList[i])
          }
        }

        let obj = {}
        obj.require = require
        obj.type = 'radio'
        obj.name = name
        obj.values = values
        // obj.name=inputTitle
        // obj.rules=inputRules
        this.props.handleAddRadio(obj)
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const keys = this.props.form.getFieldValue('radioKeys')
        let name = [], values = [], require = []
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== -1) {
            name.push(radioTitleList[i])
            values.push(radioValueList[i])
            require.push(radioRequireList[i])
          }
        }

        let obj = {}
        obj.require = require
        obj.type = 'radio'
        obj.name = name
        obj.values = values
        // obj.name=inputTitle
        // obj.rules=inputRules
        console.log('radioObj', obj)
        this.props.handleAddRadio(obj)

        console.log('!!obj!!:', obj)
        console.log('value: ', values)
        console.log('radioList', radioValueList)
      }
    })
  }

  handleSubmitRadio = (values, title, require) => {
    const {form} = this.props

    radioValueList.push(values)
    radioTitleList.push(title)
    radioRequireList.push(require)
    this.setState({
      radioVisible: false
    })
    const keys = form.getFieldValue('radioKeys')
    const nextKeys = keys.concat(ID)
    ID++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      radioKeys: nextKeys
    })
    this.handleChange()
  }

  render () {
    const {radioVisible} = this.state
    const {getFieldDecorator, getFieldValue} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20}
      }
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4}
      }
    }
    getFieldDecorator('radioKeys', {initialValue: []})
    const radioKeys = getFieldValue('radioKeys')

    const radioFormItems = radioKeys.map((k, index) => {
      // let radioValues=this.state.radioValues
      let radioType = 'radio' + k
      let currentRadioValues = radioValueList[index]
      let len = currentRadioValues.length
      let options = []
      let title = radioTitleList[index]
      let bool = radioRequireList[index] === 1
      for (let i = 0; i < len; i++) {
        if (radioValueList[index][i]) {
          options.push({label: radioValueList[index][i], value: radioValueList[index][i]})
        }
      }
      if (k !== -1) {
        return (
          <FormItem
            {...formItemLayout}
            label={title}
            required={bool}
            key={k}
          >
            {getFieldDecorator(radioType)(
              <div>
                <RadioGroup options={options} />
              </div>
            )}

            {radioKeys.length > 0 ? (
              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                disabled={radioKeys.length === 0}
                onClick={() => this.remove(k, 'radioKeys')}
              />
            ) : null}
            <br />
          </FormItem>
        )
      }
    })

    return (
      <div>

        <Form onSubmit={this.handleSubmit}>
          {radioFormItems}
          <FormItem {...formItemLayoutWithOutLabel} >
            <Button type='primary' onClick={this.addRadio} style={{width: '20%'}} className='addButton' >
              <Icon type='plus' /> 添加单选框
            </Button>
          </FormItem>
        </Form>
        <div>
          <RadioModel handleSubmitRadio={this.handleSubmitRadio} formType={'radio'} hideModel={() => { this.setState({radioVisible: false}) }} visible={this.state.radioVisible} />
        </div>
      </div>

    )
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet)

export default WrappedDynamicFieldSet
