import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './index.css'

class Header extends Component {

    //对接收的props进行：类型、必要性的限制
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    handleKeyUp = (event) => {
        //解构赋值获取keyCode,target
        const {keyCode, target} = event
        this.props.setCurrentInput(target.value)
        //判断是否是回车键
        if (keyCode !== 13) return
        if (target.value.trim() === '') {
            alert('输入不能为空')
            return
        }
        this.props.addTodo(target.value)
        target.value = ''
    }

    render() {
        return (
            <div>
                <div className="todo-header">
                    <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
                </div>
            </div>
        );
    }
}

export default Header;