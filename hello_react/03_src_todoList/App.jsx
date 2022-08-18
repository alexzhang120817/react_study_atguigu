import React, {Component} from 'react'
import './App.css'
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

class App extends Component {
    //状态在哪里，操作状态的操作就在哪里

    state = {
        //初始化状态
        todos: [{id: '001', name: '吃饭', done: true}, {id: '002', name: '睡觉', done: true}, {
            id: '003',
            name: '打代码',
            done: false
        }, {
            id: '004',
            name: '逛街',
            done: true
        }],
        current: ''
    }

    randomId = () => {
        const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
        return uint32.toString(16);
    }

    addTodo = (data) => {
        const {todos} = this.state
        const todo = {
            // id: todos.length < 10 ? '00' + (todos.length + 1) : '0' + (todos.length + 1),
            id: this.randomId(),
            name: data,
            done: false
        }
        this.setState({
            todos: [...todos, todo]
        })
    }

    updateTodo = (id, done) => {
        //获取状态中的todos
        const {todos} = this.state
        //匹配处理数据
        const newTodos = todos.map((i) => {
            if (i.id === id) return {...i, done}
            else return i
        })
        this.setState({todos: newTodos})
    }

    deleteTodo = (id) => {
        const {todos} = this.state
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id != id
        })
        this.setState({todos: newTodos})
    }

    checkAllTodo = (done) => {
        const {todos} = this.state
        const newTodos = todos.map((todoObj) => {
            return {...todoObj, done}
        })
        this.setState({todos: newTodos})
    }

    //
    clearAllDone = () => {
        const {todos} = this.state
        const newTodos = todos.filter((todoObj) =>
            !todoObj.done
        )
        this.setState({todos: newTodos})
    }

    setCurrentInput = (data) => {
        this.setState({current: data})
    }


    render() {
        const {todos, current} = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} setCurrentInput={this.setCurrentInput}/>
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                    <Footer addTodo={this.addTodo} current={current} todos={todos} checkAllTodos={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
                </div>
            </div>
        )
    }
}

export default App;
