import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd-mobile';
import ctx from '../../assets/js/ctx'



export class LoginPhone extends Component {
    static contextType = ctx
    constructor () {
        super()
        this.state={
            usertel:'',
            
        }
    }
    iptUsertel = (event) => {
        this.setState({
            usertel :event.target.value
        })
    }
    
    next = () => {
        const {usertel} = this.state
        this.context.axios.post('/cellphone/existence/check',{
            phone:usertel,
            
        })
        .then(res => {
            console.log(res)
            if(res.exist == 1){
                
                this.props.history.push('/password' + usertel)
            }else{
                this.props.history.push('/vfccode/' + usertel)
            }
        })
    }
    back = () => {
        this.props.history.push('home')
    }
    render() {
        return (
            <div className={styles.loginphone}>
                <div className={styles.header}>
                    <span className="iconfont icon-houtui" onClick={this.back}></span>
                    <span>手机号登录</span>
                </div>
                <p className={styles.tip}>未注册的手机号将自动注册</p>
                <p className={styles.content}>
                    <span>+86</span>
                    <input type="text" placeholder="请输入手机号" onChange ={this.iptUsertel} />
                </p>
                
                <div className={styles.lbtn}>
                    <Button
                    type="warning"
                    onClick={this.next}
                    >下一步</Button>
                </div>
            </div>
        )
    }
}

export default LoginPhone
