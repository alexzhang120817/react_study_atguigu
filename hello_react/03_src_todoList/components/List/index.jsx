import React, {Component} from 'react'
import Item from "../Item";
import './index.css'
import PropTypes from "prop-types";

class List extends Component {

    //对接收的props进行：类型、必要性的限制
    static propTypes = {
        todos: PropTypes.array.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo:PropTypes.func.isRequired
    }

    render() {
        const {todos, updateTodo, deleteTodo} = this.props
        return (
            <div>
                <ul className="todo-main">
                    {
                        todos.map((i) => {
                            return <Item key={i.id} item={i} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                        })
                    }

                </ul>
            </div>
        )
    }
}

export default List
