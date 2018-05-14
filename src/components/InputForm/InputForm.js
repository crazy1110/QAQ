import { Form, Input, Icon, Button, Modal } from 'antd';
import InputModel from '../RadioForm/radioModel/index'
const FormItem = Form.Item;
const {TextArea} = Input
let ID = 0;

let inputTitle=[],inputRules=[],inputRequire=[]

class DynamicFieldSet extends React.Component {

  constructor(){
    super()
    this.state={
      visible:false
    }
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
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
  }

  add = () => {
    this.setState({
      visible:true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        const keys=this.props.form.getFieldValue('keys')
        let name=[],rules=[],require=[]
        for (let i=0;i<keys.length;i++) {

          if (keys[i] !== -1){
            name.push(inputTitle[i])
            rules.push(inputRules[i])
            require.push(inputRequire[i])
          }
        }

        let obj={}
        obj.require=require
        obj.type=this.props.type
        obj.name=name
        obj.rules=rules
        // obj.name=inputTitle
        // obj.rules=inputRules
        console.log('inputObj',obj)
        if(this.props.type === 'input') {
          this.props.handleAddInput(obj)
        }else if(this.props.type === 'textArea'){
          this.props.handleAddTextArea(obj)
        }


        console.log('Received values of form: ', values);
      }
    });
  }

  handleSubmitInput=(values,title,rule,require)=>{

    const {form}=this.props

    console.log('value:',values,'title: ',title,'rule: ',rule,'require: ',require)
    this.setState({
      visible: false
    })

    inputTitle.push(title)
    inputRules.push(rule)
    inputRequire.push(require)

    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(ID)
    ID++
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })

  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {

      let inputType='input'+k
      let title=inputTitle[index]
      let bool=inputRequire[index] === 1 ? true : false
      let type=this.props.type
      if (k !== -1){
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
                  message: "Please input passenger's name or delete this field.",
                }],
              })(
                <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} /> ,
              )}

              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />

            </FormItem>
          );
        }else if(type==='textArea'){
          return(
            <FormItem
              label={title}
              required={bool}
              key={k}
            >
              {getFieldDecorator(inputType, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  message: "Please input passenger's name or delete this field.",
                }],
              })(
                <TextArea rows={4} />
              )}

              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />

            </FormItem>
          )
        }


      }

    });
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> 添加{this.props.type}
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">确认</Button>
          </FormItem>
        </Form>

        <div>
          <Modal title="Title"
                 visible={this.state.visible}
                 onCancel={() => {this.setState({visible: false})}}
            // confirmLoading={confirmLoading}
          >
            <InputModel handleSubmitInput={this.handleSubmitInput} formType={'input'}/>

          </Modal>
        </div>
      </div>

    );
  }
}

const InputForm = Form.create()(DynamicFieldSet)
export default InputForm
