import React, { Component } from 'react'
import styles from './index.module.scss'
import { List, Checkbox, Flex } from 'antd-mobile'
const AgreeItem = Checkbox.AgreeItem;

export class Login extends Component {

    toLoginphone =() => {
        this.props.history.push('/loginphone')
    }
    render() {
        return (
            <div className={styles.login} >
                <p className={styles.lbutton} onClick={this.toLoginphone}>手机号登录</p>

                <AgreeItem data-seed="logId" >
                    <p onClick={(e) => { e.preventDefault(); }}>同意《用户协议》和《隐私政策》</p>
                </AgreeItem>

            </div>
        )
    }
}

export default Login
