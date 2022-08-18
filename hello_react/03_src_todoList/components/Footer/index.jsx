import React, {Component} from 'react';
import './index.css'

class Footer extends Component {
    handleAdd = () => {
        this.props.addTodo(this.props.current)
    }

    //全选checkbox的回调
    handleCheckAll = (event) => {
        this.props.checkAllTodos(event.target.checked)
    }

    //清除已完成任务的会带哦
    handleClearAllDone = () => {
        this.props.clearAllDone()
    }

    render() {
        const {todos} = this.props
        //计算已完成的个数
        const doneCount = todos.reduce((pre, current) => {
            if (current.done) return pre + 1
            else return pre
        }, 0)
        //总数
        const total = todos.length
        return (
            <div>
                <div className="todo-footer">
                    <label>
                        <input type="checkbox" checked={doneCount === total && total !== 0 ? true : false}
                               onChange={(event) => this.handleCheckAll(event)}/>
                    </label>
                    <span>
              <span>已完成{doneCount}</span> / 全部{total}
            </span>
                    {/*<button disabled={this.props.current == ''} onClick={this.handleAdd} className={this.props.current == ''?"btn btn-danger disabled":"btn btn-danger"}>添加*/}
                    {/*</button>*/}
                    <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
                </div>
            </div>
        );
    }
}

export default Footer;