import React, { Component } from 'react'
import { Form, InputNumber, Input, DatePicker, Button, Select } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'antd/dist/antd.css'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

// 后台返回的数据格式
const data = [
  {
    'field': 'name',
    'text': '姓名',
    'errorMessage': '请输入姓名',
    'required': true,
    'type': 'input',
    // 'value': 100
  },{
    'field': 'date',
    'text': '日期',
    'errorMessage': '请输入日期',
    'required': false,
    'type': 'date',
    // 'value': '2017-10-20'
  },{
    'field': 'stuid',
    'text': '学号',
    'errorMessage': '请输入学号',
    'required': true,
    'type': 'char',
    // 'value': 'hello world'
  },{
    'field': 'department',
    'text': '学院',
    'errorMessage': '请输入学院',
    'required': true,
    'type': 'select',
    'value': '计算机与通信工程学院',
    'options': ['计算机科学与技术', '物联网工程', '电子信息工程', '通信工程', '生物医学工程']
  }
]

// formItem css 样式
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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
  width: '90%',
  marginTop: 100,
  marginLeft: 'auto',
  marginRight: 'auto'
}

@Form.create()
export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      data:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getForm = this.getForm.bind(this)
  }
  componentWillMount(){
    console.log(this.props)
  }
  getForm(){
    fetch('url').then((res) =>{
      const data = res
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  /**
   * 根据后台返回的 data 中 type 类型生成不同的组件
   * @param item  json
   * @param Component
   */
  switchItem(item) {
    const type = item.type;
    switch (type) {
      case 'int':
        return <InputNumber style={{ width: '100%' }} />;
        break;
      case 'char':
        return <Input />;
        break;
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
        break;
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
      default:
        return <Input />;
        break;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={formLayout}>
        {
          data.map((item, index) => {
            // type 为 date 日期格式需要强制转化为 moment 格式
            item.value = item.type == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
            return (
              <FormItem
                key={index}
                {...formItemLayout}
                label={item.text}
                hasFeedback
              >
                {getFieldDecorator(item.field, {
                  initialValue: item.value,
                  rules: [{
                    required: item.required,
                    message: item.errorMessage
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
            保存
          </Button>
        </FormItem>
      </Form>
    )
  }
}