import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd-mobile';
import ctx from '../../assets/js/ctx'
import {getUserId} from '../../store/actionCreator'
import {connect} from 'react-redux'


export class LoginPhoneUI extends Component {
    static contextType = ctx
    constructor () {
        super()
        this.state={
            usertel:'',
            password:''
        }
    }
    Password = (event) => {
        
        this.setState({
            password :event.target.value
        })
    }
    
    next = () => {
        const {usertel,password} = this.state
        console.log(usertel,password)
        this.context.axios.post('/login/cellphone',{
            phone:usertel,
            password:password
        })
        .then(res => {
            console.log(res)
            if(res.code == 200 && res.loginType == 1){
                this.context.axios.post('/login/status')
                .then(res => {
                    const userId = res.profile.userId
                    this.props.getUserId(userId)
                    this.props.history.push('/home')
                })
                
            }
        })
    }
    render() {
        return (
            <div className={styles.loginphone}>
                <div className={styles.header}>
                    <span></span>
                    <span>手机号登录</span>
                </div>
                
                <p className={styles.content}>
                    
                    <input type="password" placeholder="请输入密码" onChange ={this.Password} />
                </p>
                
                <div className={styles.lbtn}>
                    <Button
                    type="warning"
                    onClick={this.next}
                    >登录</Button>
                </div>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.props.match.params.usertel)
        this.setState({
            usertel:this.props.match.params.usertel
        })

    }
}
function mapDispatchToProps(dispatch){
    return {
        getUserId: (token) => {
            dispatch(getUserId(token))
        }
    }
}
const LoginContainer = connect(null,mapDispatchToProps)(LoginPhoneUI)

export default LoginContainer
