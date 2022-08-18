import React, {Component} from 'react';
import PubSub from "pubsub-js"

class Search extends Component {
    search = async () => {
        //获取用户的输入
        //连续解构赋值-只赋值到最下层，还可以重命名变量名
        const {keyWordElement: {value: keyWord}} = this
        //发送请求前通知List更改状态
        PubSub.publish('search', {isFirst: false, isLoading: true})
        // /dev/search/users   //本地服务器（会跨域）
        // https://api.github.com/search/users

        // //发送网络请求---使用fetch发送（未优化）
        // fetch(`https://api.github.com/search/users?q=${keyWord}`, {
        //     method: 'get'
        // }).then(
        //     response => {
        //         console.log('联系服务器成功', response)
        //         return response.json()
        //     },
        //     // error => {
        //     //     //如果联系服务器失败了，默认返回一个非promise的内容，此时then会继续走下去
        //     //     console.log('联系服务器失败', error)
        //     //     //返回一个初始化状态的promise实例 中断promise链，否则会继续往下走
        //     //     return new Promise(() => {
        //     //     })
        //     // }
        // ).then(
        //     response => {
        //         console.log('获取数据成功', response.items)
        //         //请求成功后通知List更改状态
        //         PubSub.publish('search', {isLoading: false, users: response.items, err: ''})
        //     },
        //     // err => {
        //     //     console.log('获取数据失败', err)
        //     //     //请求成功后通知List更改状态
        //     //     PubSub.publish('search', {isLoading: false, err: err.message})
        //     // }
        // ).catch(
        //     error=>{
        //         console.log(error)
        //     }
        // )

        // 优化版本
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyWord}`, {
                method: 'get'
            })
            const data = await response.json()
            console.log(data)
            PubSub.publish('search', {isLoading: false, users: data.items, err: ''})
        } catch (e) {
            console.log('请求出错', e)
            PubSub.publish('search', {isLoading: false, err: e.message})
        }
    }

    handleKeyUp = (event) => {
        //连续解构赋值-只赋值到最下层，还可以重命名变量名
        const {keyCode, target: {value: inputContent}} = event
        //判断是否是回车键
        if (keyCode !== 13) return
        if (inputContent.trim() === '') {
            return
        }
        this.search()
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input onKeyUp={this.handleKeyUp} ref={c => this.keyWordElement = c} type="text"
                           placeholder="enter the name you search"/>&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        );
    }
}

export default Search;