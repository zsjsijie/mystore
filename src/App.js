import React, { Component } from 'react';

//import './App.css';

import { Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom'
import ctx from './assets/js/ctx'
import routes from './routes';
import styles from './App.module.scss'
import './App.scss'

import { Drawer, List, NavBar, Icon, Slider } from 'antd-mobile'


// class AppCPU extends Component {
// 	static contextType = ctx
// 	render() {
// 		return <>{this.props.children}</>
// 	}
// 	componentWillMount() {
// 		const token = localStorage.getItem('token')
// 		this.context.store.changeToken(token)
// 	}
// }

// import Home from './views/Home'

// function App(props) {
// 	console.log(props)
// 	console.log(props.location)
// 	const pathname = props.location.pathname
// 	const showNav = /home|discover|video|friends/.test(pathname)
// 	return (

// 		<div className="App">
// 			{/* <AppCPU> */}
// 			<Switch>
// 				<Redirect from="/" to="/home" exact />
// 				{
// 					routes.map(e => <Route {...e} />)
// 				}
// 			</Switch>
// 			{/* </AppCPU> */}
// 			{showNav &&
// 				<div className="nav">
// 					<span className="iconfont icon-icon--"></span>
// 					<NavLink to='/home' exact isActive={(match, location) => location.pathname == '/home'}>我的</NavLink>
// 					<NavLink to='/discover' isActive={(match, location) => location.pathname == '/discover'}>发现</NavLink>
// 					<NavLink to='/friends' isActive={(match, location) => location.pathname == '/friends'}>朋友</NavLink>
// 					<NavLink to='/video' isActive={(match, location) => location.pathname == '/video'}>视频</NavLink>
// 					<span className="iconfont icon-fangdajing2"></span>
// 				</div>
// 			}
// 		</div>
// 	);
// }

// export default withRouter(App);



export class App extends Component {
	static contextType = ctx
	constructor(props) {
		super()
		this.state = {
			open: false,
			showLeft: false,
			userList: [
				{
					id: '1',
					name: '演出',
					iconfont: 'iconfont icon-piao',
				},
				{
					id: '2',
					name: '商城',
					iconfont: 'iconfont icon-shopping-bag',
				},
				{
					id: '3',
					name: '附近的人',
					iconfont: 'iconfont icon-fujinderen',
				},
				{
					id: '4',
					name: '口袋铃声',
					iconfont: 'iconfont icon-lingsheng',
				},
				{
					id: '5',
					name: '我的订单',
					iconfont: 'iconfont icon-icon2-copy',
				},

			],
			handleList: [
				{
					id: 1,
					name: '定时停止播放',
					iconfont: 'iconfont icon-history'
				},
				{
					id: 2,
					name: '扫一扫',
					iconfont: 'iconfont icon-richscan_icon'
				},
				{
					id: 3,
					name: '音乐闹钟',
					iconfont: 'iconfont icon-yinlenaozhong'
				},
				{
					id: 4,
					name: '在线听歌免流量',
					iconfont: 'iconfont icon-mianliuliang'
				},

			]
		}

	}
	onOpenChange = (...args) => {
		console.log(args);
		this.setState({
			open: !this.state.open,
			showLeft: !this.state.showLeft
		});


	}
	toLogin = () => {
		this.props.history.push('/login')
		this.setState({
			open: !this.state.open,
			showLeft: !this.state.showLeft
		});
	}

	render() {
		const pathname = this.props.location.pathname
		const showNav = /home|discover|video|friends/.test(pathname)
		const sidebar = (<List>
			<div className="lheader">
				<p>登录网易云音乐</p>
				<p>手机电脑多端同步,尽享海量高音质音乐</p>
				<p onClick={this.toLogin}>立即登录</p>
			</div>
			<div className="lnav">
				<div>
					<p className="iconfont icon-youxiang"></p>
					<p>我的邮箱</p>
				</div>
				<div>
					<p className="iconfont icon-haoyou"></p>
					<p>我的好友</p>
				</div>
				<div>
					<p className="iconfont icon-huanfu"></p>
					<p>个性换肤</p>
				</div>
				<div>
					<p className="iconfont icon-tinggeshiqu40x40"></p>
					<p>我的消息</p>
				</div>
			</div>
			<div className="luserlist">
				{this.state.userList.map(e => (
					<div key={e.id}>
						<span className={e.iconfont}></span>
						<span>{e.name}</span>
					</div>
				))}
			</div>
			<div className="lhandlelist">
				{this.state.handleList.map(e => (
					<div key={e.id}>
						<span className={e.iconfont}></span>
						<span>{e.name}</span>
					</div>
				))}
			</div>
			<div className="lfooter">
				<div>
					<span className="iconfont icon-yewan"></span>
					<span>夜间模式</span>
				</div>
				<div>
					<span className="iconfont icon-shezhi"></span>
					<span>设置</span>
				</div>
				<div>
					<span className="iconfont icon-tuichu2"></span>
					<span>退出</span>
				</div>

			</div>
		</List>)
		return (
			<div className="App">
				{/* <AppCPU> */}
				<Switch>
					<Redirect from="/" to="/home" exact />
					{
						routes.map((e, i) => <Route {...e} key={i} />)
					}
				</Switch>
				{/* </AppCPU> */}
				{showNav &&
					<div className="nav">
						<span className="iconfont icon-icon--" onClick={this.onOpenChange}></span>

						<NavLink to='/home' exact isActive={(match, location) => location.pathname == '/home'}>我的</NavLink>
						<NavLink to='/discover' isActive={(match, location) => location.pathname == '/discover'}>发现</NavLink>
						<NavLink to='/friends' isActive={(match, location) => location.pathname == '/friends'}>热门MV</NavLink>
						<NavLink to='/video' isActive={(match, location) => location.pathname == '/video'}>视频</NavLink>
						<span className="iconfont icon-fangdajing2"></span>
					</div>
				}

				{this.state.showLeft &&
					<Drawer
						className="my-drawer"
						style={{ minHeight: document.documentElement.clientHeight }}
						contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
						sidebar={sidebar}
						docked={false}
						open={this.state.open}
						position={"left"}

						onOpenChange={this.onOpenChange}
					>

					</Drawer>
				}

			</div>
		)

	}
}

export default withRouter(App)

