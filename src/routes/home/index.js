import React, { Component } from 'react'
import { Form, InputNumber, Input, DatePicker, Button, Select, Radio } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
// 后台返回的数据格式
// formItem css 样式
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  }
}

const formLayout = {
  width: '80%',
  marginTop: 100,
  marginLeft: 'auto',
  marginRight: 'auto'
}

@Form.create()
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: ' ',
      data: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getForm = this.getForm.bind(this)
  }

  componentWillMount () {
    this.getForm()
    console.log(this.props)
  }

  getForm () {
    let path0 = this.props.match.url
    let path = path0.slice(6)
    console.log(path)
    fetch(`http://form.sealbaby.cn/form/url/${path}`).then((json) => {
      return json.json()
    }).then(res => {
      console.log(res)
      const form = res.form.attributes
      let keys = []
      let values = []
      for (let key in form) {
        keys.push(key)
        values.push(form[key])
      }
     const options = values.map((item, index) => {

     })
      this.setState({data: values})
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  /**
   * 根据后台返回的 data 中 type 类型生成不同的组件
   * @param item  json
   * @param Component
   */
  switchItem (item) {
    const type = item.type
    switch (type) {
      case 'input':
        return <Input />
      case 'char':
        return <InputNumber style={{width: '100%'}} />
      case 'date':
        return <DatePicker style={{width: '100%'}} />
      case 'select':
        return (
          <Select>
            {/*{*/}
              {/*item.options.map((option, index) => {*/}
                {/*return (<Option key={index} value={option}>{option}</Option>)*/}
              {/*})*/}
            {/*}*/}
          </Select>
        )
      case 'radio':
        return (
          <RadioGroup>
            {
              (item.values || []).split(',').map((option, index) => {
                return (<Radio key={index} value={option}>{option}</Radio>)
              })
            }
          </RadioGroup>
        )
      case 'textArea':
        return <TextArea />
      default:
        return <Input />
    }
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const data = this.state.data
    return (
      <Form onSubmit={this.handleSubmit} style={formLayout}>
        {
          data.map((item, index) => {
            // type 为 date 日期格式需要强制转化为 moment 格式
            // item.value === item.type === 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value
            return (
              <FormItem
                key={index}
                {...formItemLayout}
                label={item.name}
                hasFeedback
              >
                {getFieldDecorator(item.name, {
                  initialValue: item.value,
                  rules: [{
                    required: item.required,
                  }],
                })(
                  this.switchItem(item)
                )}
              </FormItem>
            )
          })
        }
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}