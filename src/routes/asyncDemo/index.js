import React, { Component } from 'react'
import { Form, Input, Icon, Button, Modal, Radio, Select, DatePicker } from 'antd'
import 'react-redux'
import { getUrl } from '../../actions'
import './index.less'
import moment from 'moment'
import 'moment/locale/zh-cn'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
let uuid = 0

@Form.create()
class AsyncDemo extends Component {
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  remove = (k) => {
    const {form} = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }
  add = (type) => {
    const {form} = this.props
    console.log(form)
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    uuid++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    })
    this.hideModal()
  }
  handleSubmit = (e) => {
    this.props.dispatch(getUrl(this.state.url))
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      url: '',
      visible: false,
      type: 'input'
    }
    this.add = this.add.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.switchItem = this.switchItem.bind(this)
  }

  switchItem (type) {
    this.add()
    switch (type) {
      case 'input':
        return <Input style={{width: '100%'}} />
      case 'char':
        return <Input style={{width: '100%'}} />
      case 'date':
        return <DatePicker style={{width: '100%'}} />
      case 'select':
        return (
          <Select />
        )
      case 'radio':
        return (
          <RadioGroup />
        )
      case 'textArea':
        return <TextArea />
      default:
        return <Input />
    }
  }
  createFunc () {
    console.log('执行')
    return () => {
      console.log('a')
    }
  }

  render () {
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
    getFieldDecorator('keys', {initialValue: []})
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayoutWithOutLabel}
          // label={index === 0 ? '123456' : ''}
          required={false}
          key={k}
        >
          <Input style={{width: '100px'}} defaultValue='label' />
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: 'Please input passenger\'s name or delete this field.'
            }]
          })(
            <Input style={{width: '70%', marginRight: 8}} />
          )}
          {keys.length > 1 ? (
            <Icon
              className='dynamic-delete-button'
              type='minus-circle-o'
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
          <Radio></Radio>
        </FormItem>
      )
    })
    return (
      <div>
        <div style={{marginBottom: 16}}>
          <Input addonBefore="Http://somefor" defaultValue="请输入自定义URL" style={{width: '500px'}}
                 onChange={(e) => {this.setState({url: e.target.value})}} />
        </div>
        <Form onSubmit={this.handleSubmit} className='create-form'>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type='dashed' onClick={this.showModal} style={{width: '60%'}}>
              <Icon type='plus' /> Add field
            </Button>
            <Modal
              title='选择添加表单类型'
              visible={this.state.visible}
              onOk={this.hideModal}
              onCancel={this.hideModal}
              okText="确认"
              cancelText="取消"
            >
              <div onClick={this.switchItem.bind(this , 'input')} ><p>type:input</p></div>
              <p>type:radio</p>
              <p>type:textArea</p>
              <p>type:Select</p>
            </Modal>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">Submit</Button>
          </FormItem>
        </Form>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url
  }
}

// export default connect(mapStateToProps())(AsyncDemo)
export default AsyncDemo
