import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import ListSort from './ListSort/index'
import './index.less'
import React, { Component } from 'react'
const dataArray = [
  {
    icon: 'question-circle-o',
    color: '#FF5500',
    title: 'Senior Product Designer',
    text: 'Senior Product Designer'
  },
  {
    icon: 'plus-circle-o',
    color: '#5FC296',
    title: 'Senior Animator',
    text: 'Senior Animator'
  },
  {
    icon: 'check-circle-o',
    color: '#2DB7F5',
    title: 'Visual Designer',
    text: 'Visual Designer'
  },
  {
    icon: 'cross-circle-o',
    color: '#FFAA00',
    title: 'Computer Engineer',
    text: 'Computer Engineer'
  }
]

const data = [
  {
    'field': 'name',
    'name': '姓名',
    'errorMessage': '请输入姓名',
    'require': true,
    'type': 'input',
    // 'value': 100
  }, {
    'field': 'date',
    'name': '日期',
    'errorMessage': '请输入日期',
    'require': false,
    'type': 'date',
    // 'value': '2017-10-20'
  }, {
    'field': 'stuid',
    'name': '学号',
    'errorMessage': '请输入学号',
    'require': true,
    'type': 'char',
    // 'value': 'hello world'
  }, {
    'field': 'department',
    'name': '学院',
    'errorMessage': '请输入学院',
    'require': true,
    'type': 'select',
    // 'value': '计算机与通信工程学院',
    'options': ['计算机科学与技术', '物联网工程', '电子信息工程', '通信工程', '生物医学工程']
  }, {
    'field': 'sex',
    'name': '性别',
    'errorMessage': '请选择性别',
    'require': true,
    'type': 'radio',
    'options': ['nv', 'nan']
  }, {
    'field': 'nameArea',
    'name': '介绍',
    'errorMessage': '请输入介绍',
    'require': true,
    'type': 'textArea'
  }
]



export default class ListSortDemo extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onAdd = this.onAdd.bind(this)
  }
  static propTypes = {
    className: PropTypes.string
  }
  static defaultProps = {
    className: 'list-sort-demo'
  }
  onAdd = () => {
    const {data} = this.state
    const i = Math.round(Math.random() * (this.data.length - 1))
    data.unshift({
      key: Date.now(),
      name: this.data[i].name,
      age: this.data[i].age,
      address: this.data[i].address
    })
    this.setState({
      data
    })
  }
  onEnd = (e) => {
    const dom = e.target
    dom.style.height = 'auto'
  }



  render () {
    const childrenToRender = dataArray.map((item, i) => {
      const {
        icon, color, title, text
      } = item
      return (
        <div key={i} className={`${this.props.className}-list`}>
          <div className={`${this.props.className}-icon`}>
            <Icon type={icon} style={{color}} />
          </div>
          <div className={`${this.props.className}-text`}>
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
        </div>
      )
    })
    return (
      <div className={`${this.props.className}-wrapper`}>
        <div className={this.props.className}>
          <Button type='primary' onClick={this.onAdd}>Add</Button>
          <ListSort
            dragClassName='list-drag-selected'
            appearAnim={{animConfig: {marginTop: [5, 30], opacity: [1, 0]}}}
          >
            {childrenToRender}
          </ListSort>
        </div>
      </div>
    )
  }
}