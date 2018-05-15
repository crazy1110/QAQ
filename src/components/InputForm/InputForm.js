import { Form, Input, Icon, Button } from 'antd'
import InputModel from '../RadioForm/radioModel/index'
const FormItem = Form.Item
const {TextArea} = Input
let ID = 0

// let inputTitle = [], inputRules = [], inputRequire = []
let test = [], num = 1

class DynamicFieldSet extends React.Component {
  constructor () {
    super()
    this.state = {
      inputTitle: [],
      inputRules: [],
      inputRequire: [],
      visible: false
    }
  }

  remove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger

    // can use data-binding to set
    for (let i = 0; i < keys.length; i++) {
      if (k === keys[i]) {
        keys[i] = -1
      }
    }
    let obj = {}
    obj['keys'] = keys
    // console.log('obj: ', obj)
    form.setFieldsValue(obj)
    this.handleChange()
  }

  add = () => {
    this.setState({
      visible: true
    })
  }

  handleChange= () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const keys = this.props.form.getFieldValue('keys')
        let name = [], rules = [], require = []
        let inputTitle = this.state.inputTitle, inputRules = this.state.inputRules, inputRequire = this.state.inputRequire
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== -1) {
            name.push(inputTitle[i])
            rules.push(inputRules[i])
            require.push(inputRequire[i])
          }
        }

        let obj = {}
        obj.require = require
        obj.type = this.props.type
        obj.name = name
        obj.rules = rules
        if (this.props.type === 'input') {
          this.props.handleAddInput(obj)
          console.log('inputTitle: ', inputTitle)
        } else if (this.props.type === 'textArea') {
          console.log('textAreaTitle: ', inputTitle)
          this.props.handleAddTextArea(obj)
        }
      }
    })
  }

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       const keys = this.props.form.getFieldValue('keys')
  //       let name = [], rules = [], require = []
  //       for (let i = 0; i < keys.length; i++) {
  //         if (keys[i] !== -1) {
  //           name.push(inputTitle[i])
  //           rules.push(inputRules[i])
  //           require.push(inputRequire[i])
  //         }
  //       }
  //
  //       let obj = {}
  //       obj.require = require
  //       obj.type = this.props.type
  //       obj.name = name
  //       obj.rules = rules
  //       // obj.name=inputTitle
  //       // obj.rules=inputRules
  //       console.log('inputObj', obj)
  //       if (this.props.type === 'input') {
  //         this.props.handleAddInput(obj)
  //       } else if (this.props.type === 'textArea') {
  //         this.props.handleAddTextArea(obj)
  //       }
  //
  //       console.log('Received values of form: ', values)
  //     }
  //   })
  // }

  handleSubmitInput=(values, title, rule, require) => {
    const {form} = this.props

    console.log('value:', values, 'title: ', title, 'rule: ', rule, 'require: ', require)
    this.setState({
      visible: false
    })
    let inputTitle = this.state.inputTitle, inputRules = this.state.inputRules, inputRequire = this.state.inputRequire

    inputTitle.push(title)
    inputRules.push(rule)
    inputRequire.push(require)

    this.setState({
      inputTitle: inputTitle,
      inputRules: inputRules,
      inputRequire: inputRequire
    })

    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(ID)
    ID++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
    this.handleChange()
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    //   },
    // };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    }
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      let inputType = 'input' + k
      let title = this.state.inputTitle[index]
      let bool = this.state.inputRequire[index]
      let type = this.props.type
      if (k !== -1) {
        if (type === 'input') {
          return (
            <FormItem
              label={title}
              required={bool}
              key={k}
            >
              {getFieldDecorator(inputType, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  message: "Please input passenger's name or delete this field."
                }]
              })(
                <Input placeholder='passenger name' style={{ width: '60%', marginRight: 8 }} />
              )}

              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                onClick={() => this.remove(k)}
              />

            </FormItem>
          )
        } else if (type === 'textArea') {
          return (
            <FormItem
              label={title}
              required={bool}
              key={k}
            >
              {getFieldDecorator(inputType, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  message: "Please input passenger's name or delete this field."
                }]
              })(
                <TextArea rows={4} />
              )}

              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                onClick={() => this.remove(k)}
              />

            </FormItem>
          )
        }
      }
    })
    return (
      <div>
        <Button onClick={() => { test.push(num++) }}>++</Button>
        <Button onClick={() => { console.log(num) }}>显示num</Button>

        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
              <Icon type='plus' /> 添加{this.props.type}
            </Button>
          </FormItem>
        </Form>

        <div>
          <InputModel handleSubmitInput={this.handleSubmitInput} hideModel={() => { this.setState({visible: false}) }} formType={'input'} visible={this.state.visible} />
        </div>
      </div>

    )
  }
}

const InputForm = Form.create()(DynamicFieldSet)
export default InputForm
