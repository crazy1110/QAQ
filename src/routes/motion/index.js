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