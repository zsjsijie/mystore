import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd-mobile';
import ctx from '../../assets/js/ctx'



export class VfcCode extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            usertel: '',
            vfcCode:''
        }
    }
    iptVfcCode = (event) => {
        this.setState({
            vfcCode: event.target.value
        })
    }
    reqVfcCode() {
        this.context.axios.post('/captcha/sent',{
            phone:this.state.usertel
        })
        .then(res => {
            console.log(res)
        })
    }

    next = () => {
        const { usertel,vfcCode } = this.state
        this.context.axios.post('/captcha/verify', {
            phone: usertel,
            captcha:vfcCode
        })
            .then(res => {
                console.log(res)
                this.props.history.push('home')
            })
    }
    render() {
        return (
            <div className={styles.loginphone}>
                <div className={styles.header}>
                    <span className="iconfont icon-houtui"></span>
                    <span>输入验证码完成注册</span>
                </div>
                {this.state.usertel &&
                    <p className={styles.tip}>验证码已发送到{this.state.usertel}</p>
                }
                <p className={styles.content}>
                    
                    <input type="text" placeholder="请输入验证码" onChange={this.iptVfcCode} />
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
    componentWillMount(){
        this.setState({
            usertel:this.props.match.params.usertel
        })
    }
}

export default VfcCode
