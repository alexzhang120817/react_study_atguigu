import React, {Component} from 'react'
import './index.css'

class Item extends Component {
    state = {mouse: false} //标识鼠标移入、移出

    //鼠标移入、移出的回调
    handleMouse = (flag) => {
        return () => {
            this.setState({mouse: flag})
        }
    }

    //勾选、取消勾选某一个todo的回调
    handleCheck = (id) => {
        //函数体
        return (event) => {
            this.props.updateTodo(id, event.target.checked)
        }
    }

    //删除某一个todo的回调
    handleDelete = (id, name) => {
        if (window.confirm(`确定删除 ${name} 吗？`)) {
            this.props.deleteTodo(id)
        }
    }

    render() {
        const {id, name, done} = this.props.item
        const {mouse} = this.state
        return (
            <li
                data-id={id}
                onMouseLeave={this.handleMouse(false)}
                onMouseEnter={this.handleMouse(true)}
                style={{backgroundColor: mouse ? '#DDD' : null}}>
                <label>
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={this.handleCheck(id)}
                    />
                    <span>{name}</span>
                </label>
                <button
                    onClick={() => this.handleDelete(id, name)}
                    className="btn btn-danger"
                    style={{display: mouse ? 'block' : 'none'}}>
                    删除
                </button>
            </li>
        )
    }
}

export default Item
