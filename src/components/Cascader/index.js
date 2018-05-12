import { Button, Cascader, Col, Form, Input, message, Radio, Row } from 'antd'
import React from 'react'
import options from '../../utils/turningOptions'
import verify from '../../utils/Verify'
import 'antd/dist/antd.css'

const FormItem = Form.Item

export default class Cascader extends React.Component {
  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
      }
    }
    return (
      <FormItem
        label='专业'
        {...formItemLayout}
      >
        {getFieldDecorator('major', {
          rules: [{
            required: true, message: '请选择专业'
          }]
        })(
          <Cascader options={options} placeholder="请选择专业" className='form-content-input' />
        )}
      </FormItem>
    )
  }
}