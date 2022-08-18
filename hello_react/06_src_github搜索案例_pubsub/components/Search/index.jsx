import React, {Component} from 'react';
import axios from "axios";
import PubSub from "pubsub-js"

class Search extends Component {
    search = () => {
        //获取用户的输入
        //连续解构赋值-只赋值到最下层，还可以重命名变量名
        const {keyWordElement: {value: keyWord}} = this
        //发送请求前通知List更改状态
        PubSub.publish('search', {isFirst: false, isLoading: true})
        //发送网络请求
        // /dev/search/users   //本地服务器（会跨域）
        // https://api.github.com/search/users
        axios.get('https://api.github.com/search/users', {
            params: {
                q: keyWord
            }
        }).then(response => {
            //请求成功后通知List更改状态
            PubSub.publish('search', {isLoading: false, users: response.data.items, err: ''})
            console.log('成功了', response.data.items)
        }).catch(err => {
            console.log(err)
            //请求失败后通知List更改状态
            PubSub.publish('search', {isLoading: false, err: err.message})
        })

        // //axios简化版本
        // try {
        //     const response = await axios.get('https://api.github.com/search/users', {
        //         params: {
        //             q: keyWord
        //         }
        //     })
        //     PubSub.publish('search', {isLoading: false, users: response.data.items, err: ''})
        //     console.log('成功了', response.data.items)
        // } catch (err) {
        //     console.log('请求出错',err.message)
        //     //请求失败后通知List更改状态
        //     PubSub.publish('search', {isLoading: false, err: err.message})
        // }
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