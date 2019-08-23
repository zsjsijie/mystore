import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '../../assets/js/ctx'
import { Toast } from 'antd-mobile'

export class Friends extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            userId: '',
            mvList: []
        }
    }
    reqHotList() {
        // this.context.axios.get('/hot/topic?limit=30&offset=30')
        // .then(res => {
        //     console.log(res)
        // })
    }

    reqVideoList() {
        this.context.axios.post('/mv/first?limit=10')
            .then(res => {
                console.log(res)
                this.setState({
                    mvList: res.data
                })
            })
    }
    toVideoDetail(id){
        this.props.history.push('/mvplayer/' + id)
    }

    reqLoginStatus() {
        this.context.axios.post('/login/status')
            .then(res => {
                console.log(res, 3333)
                if (res.code == 200) {
                    this.setState({
                        userId: res.profile.userId
                    })
                    this.context.axios.post('/user/subcount', {
                        uid: this.state.userId
                    })
                        .then(res => {
                            console.log(res)
                        })
                    this.context.axios.post('/user/playlist', {
                        uid: this.state.userId
                    })
                        .then(res => {
                            console.log(res, '歌单')
                        })
                } else {
                    Toast.fail('内部错误')
                }
            })

    }
    render() {
        const { mvList } = this.state
        return (
            <div className={styles.friends}>
                {mvList &&
                    <div className={styles.mvlist}>
                        {mvList.map(e => (
                            <div key={e.id} className={styles.listinfo} onClick={() => this.toVideoDetail(e.id)}>
                                <div className={styles.imgbox}>
                                    <img src={e.cover} alt="" />
                                    <div className={styles.playbutton}>
                                    <span className="iconfont icon-bofang2"></span>
                                    </div>
                                </div>
                                <p>{e.briefDesc}</p>
                                <div className={styles.content}>
                                    <span>{e.name}</span>
                                    <span>{e.playCount>10000? Math.floor(e.playCount/10000)+"w+":e.playCount}w+次播放</span>
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>

        )
    }
    componentDidMount() {
        this.reqHotList()
        this.reqLoginStatus()
        this.reqVideoList()

    }
}

export default Friends
