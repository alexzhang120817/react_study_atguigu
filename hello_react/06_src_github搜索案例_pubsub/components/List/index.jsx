import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

class List extends Component {
    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        err: '',
    }

    componentDidMount() {
        PubSub.subscribe('search', (_, stateObj) => {
            this.setState({ ...stateObj })
        })
    }

    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {isFirst ? (
                    <h2>Enter GitHub Username</h2>
                ) : isLoading ? (
                    <h2>Loading....</h2>
                ) : err ? (
                    <h2>{err}</h2>
                ) : (
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a
                                    rel="noreferrer"
                                    href={userObj.html_url}
                                    target="_blank">
                                    <img
                                        alt="avatar"
                                        src={userObj.avatar_url}
                                        style={{ width: '100px' }}
                                    />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                )}
            </div>
        )
    }
}

export default List
