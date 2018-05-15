import {Form, Icon, Input, Button, Select, Modal} from 'antd'
import './index.css'

const FormItem = Form.Item
const Option = Select.Option
let ID = 0

class RadioModel extends React.Component {
  componentDidMount () {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let Values = []
        let Title = this.props.form.getFieldValue('title')
        let Rule = this.props.form.getFieldValue('rule')
        let Require = this.props.form.getFieldValue('require')
        if (this.props.formType === 'radio') {
          for (let i = 0; i < 100; i++) {
            let name = 'key' + i
            let radioValue = this.props.form.getFieldValue(name)

            if (radioValue) {
              Values.push(radioValue)
            }
          }
          this.props.handleSubmitRadio(Values, Title, Require)
        } else if (this.props.formType === 'input') {
          console.log(Rule)
          this.props.handleSubmitInput(Values, Title, Rule, Require)

        } else if (this.props.formType === 'text') {
          console.log(Rule)
          this.props.handleSubmitText(Values, Title, Rule, Require)
        }

        console.log('[value]===', Values, '[title]===', Title)

      }
    })
  }

  hideModel = () => {
    this.props.hideModel()
  }

  addRadio = () => {

    const keys = Form.getFieldValue('keys')
    const nextKeys = keys.concat(ID)
    ID++

    Form.setFieldsValue({
      keys: nextKeys
    })
  }

  remove = (k) => {
    const {form} = this.props
    const keys = form.getFieldValue('keys')
    let options = {keys: keys.filter(key => key !== k)}

    form.setFieldsValue(options)

  }

  render () {
    const {getFieldDecorator, getFieldValue} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }

    getFieldDecorator('keys', {initialValue: []})

    const radioKeys = getFieldValue('keys')

    const inputFormItems = radioKeys.map((k, index) => {
      let inputType = 'key' + k
        // console.log(inputType)
      return (
        <FormItem
          required={false}
          key={k}
          >
          {getFieldDecorator(inputType, {
            rules: [{required: true, message: ''}]
          })(
            <Input placeholder={inputType} />
            )}
          <Icon
            className='dynamic-delete-button'
            type='minus-circle-o'
            onClick={() => this.remove(k)}
            />

        </FormItem>
      )
    })

    return (
      <Modal
        title='title'
        visible={this.props.visible}
        onCancel={this.hideModel}
        onOk={this.handleSubmit}
      >
        <Form layout='inline' onSubmit={this.handleSubmit}>

          <FormItem
            label={'标题：'}
            key={100}
          >
            {getFieldDecorator('title', {
              rules: [{required: true, message: '请输入标题'}]
            })(
              <Input placeholder='输入标题' />
            )}
          </FormItem>
          <FormItem
            label={'是否必选：'}
            key={101}
          >
            {getFieldDecorator('require', {
              rules: [{required: true, message: '请选择是否必选'}]
            })(
              <Select placeholder='Please select rule' style={{width: 200}}>
                <Option value={1}>是</Option>
                <Option value={0}>否</Option>
              </Select>
            )}
          </FormItem>

          {this.props.formType === 'input' ? (<FormItem
            label={'规则：'}
          >
            {getFieldDecorator('rule', {
              rules: [
                { required: true, message: '请输入校验规则' }
              ]
            })(
              <Select placeholder='Please select rule' style={{width: 200}}>
                <Option value='0'>无规则</Option>
                <Option value='1'>只能数字</Option>
                <Option value='2'>只能中文</Option>
              </Select>
            )}
          </FormItem>) : null }

          <br />

          {this.props.formType === 'radio' ? (<Button
            type='primary' onClick={() => {
              this.addRadio()
            }}>添加</Button>) : null}
          <br />
          {this.props.formType === 'radio' ? inputFormItems : null}
        </Form>
      </Modal>

    )
  }
}

const radioModel = Form.create()(RadioModel)
export default radioModel
