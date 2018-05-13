import {Form, Icon, Input, Button} from 'antd';
import './index.css'
const FormItem = Form.Item;

let radioId = 0

class RadioModel extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let Values=[]
        let Title=this.props.form.getFieldValue('title')

        for(let i=0;i<100;i++){
          let name='radio'+i
          let radioValue=this.props.form.getFieldValue(name)

          if(radioValue){
            Values.push(radioValue)
          }

        }
        console.log('[value]===', Values,'[title]===',Title);
        this.props.handleSubmitRadio(Values,Title)


      }
    })


  }


  addRadio = () => {

    const {form} = this.props;

    const keys = form.getFieldValue('radioKeys');
    const nextKeys = keys.concat(radioId);
    radioId++;

    form.setFieldsValue({
      radioKeys: nextKeys,
    });
  }

  remove=(k)=>{
    const { form } = this.props;
    const keys=form.getFieldValue('radioKeys')
    let options={radioKeys:keys.filter(key=>key!==k)}

    form.setFieldsValue(options)

  }


  render(){
    const {getFieldDecorator, getFieldsError,  getFieldValue} = this.props.form;


    getFieldDecorator('radioKeys', {initialValue: []});

    const radioKeys = getFieldValue('radioKeys');

    const inputFormItems = radioKeys.map((k, index) => {

      let inputType = 'radio' + k
      // console.log(inputType)
      return (
        <FormItem
          required={false}
          key={k}
        >
          {getFieldDecorator(inputType, {
            rules: [{required: true, message: ''}],
          })(
            <Input placeholder={inputType}/>
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />


        </FormItem>
      )
    })

    return(
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <FormItem
          required={false}
          key={100}
        >
          {getFieldDecorator('title', {
            rules: [{required: true, message: ''}],
          })(
            <Input placeholder={'输入标题'}/>
          )}
        </FormItem>

        {inputFormItems}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >
            确定
          </Button>
        </FormItem>

        <Button type="primary" onClick={() => {
          this.addRadio()
        }}>添加</Button>

      </Form>
    )
  }
}


const radioModel = Form.create()(RadioModel);
export default radioModel
