import { Form, Input, Icon, Button,Radio,Modal } from 'antd';
import RadioModel from './radioModel/index'
import './index.css'
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


let ID=0
let radioValueList=[],radioTitleList=[]
class DynamicFieldSet extends React.Component {

  constructor(){
    super()
    this.state={
      radioVisible: false,
      radioValues:[]
    }
  }

  remove = (k,typeKeys) => {
    const { form } = this.props;
    const keys = form.getFieldValue(typeKeys);
    console.log('remove: ',keys)

    for(let i=0;i<keys.length;i++){
      if(k===keys[i]){
        keys[i]=-1
      }
    }
    let obj={}
    obj[typeKeys]=keys
    console.log('obj: ',obj)
    form.setFieldsValue(obj)
  }


  addRadio= ()=>{
    // can use data-binding to get

    this.setState({
      radioVisible:true
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        let obj={}
        obj.require='1'
        obj.type='radio'
        obj.name=radioTitleList
        obj.valuesList=radioValueList

        // this.props.handleAddRadio(obj)

        console.log('!!obj!!:',obj)
        console.log('value: ', values);
        console.log('radioList',radioValueList)
      }
    });



  }

  handleSubmitRadio=(values,title)=>{

    const { form } = this.props;

    radioValueList.push(values)
    radioTitleList.push(title)

    this.setState({
      radioVisible:false,
    })
    const keys = form.getFieldValue('radioKeys');
    const nextKeys = keys.concat(ID);
    ID++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      radioKeys: nextKeys,
    });
    console.log("createForm: ",values)
}


  render() {
    const { radioVisible } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('radioKeys', { initialValue: [] });
    const radioKeys = getFieldValue('radioKeys');

    const radioFormItems=radioKeys.map((k,index)=>{
      // let radioValues=this.state.radioValues
      let radioType='radio'+k
      let currentRadioValues=radioValueList[index]
      let len=currentRadioValues.length
      let options=[]
      let title=radioTitleList[index]
      for(let i=0;i<len;i++){
        if(radioValueList[index][i]){
          options.push({label:radioValueList[index][i],value:radioValueList[index][i]})
        }
      }
      if(k!==-1){
        return(
          <FormItem
            {...formItemLayout}
            label={title}
            required={false}
            key={k}
          >
            {getFieldDecorator(radioType)(
              <div>
                <RadioGroup options={options}  />
              </div>
            )}

            {radioKeys.length > 0 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={radioKeys.length === 0}
                onClick={() => this.remove(k,'radioKeys')}
              />
            ) : null}
            <br/>
          </FormItem>
        )
      }

    })

    return (
      <div>

        <Form onSubmit={this.handleSubmit}>
          {radioFormItems}
          <FormItem {...formItemLayoutWithOutLabel}>

            <Button type="dashed" onClick={this.addRadio} style={{ width: '60%' }}>
              <Icon type="plus" /> Add radio
            </Button>


          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">确认</Button>
          </FormItem>




        </Form>
        <div>
          <Modal title="Title"
                 visible={radioVisible}
                 // confirmLoading={confirmLoading}
          >
            <RadioModel handleSubmitRadio={this.handleSubmitRadio}/>

          </Modal>
        </div>
      </div>

    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);

export default WrappedDynamicFieldSet