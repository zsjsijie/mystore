import React, { Component } from 'react'
import ctx from '../../assets/js/ctx'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile'

export class SongsListDetail extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            id: 0,
            songsdetail: null,

        }
    }

    reqSongsList() {
        if (this.state.id) {
            this.context.axios.post('/playlist/detail', {
                id: this.state.id
            })
                .then(res => {
                    if (res.code == 200) {
                        this.setState({
                            songsdetail: res
                        })
                    } else {
                        Toast.fail('未知错误')
                    }
                    console.log(this.state.songsdetail)
                })
        }
    }
    toSongsItem(id,listid){
        sessionStorage.setItem("id",id)
        sessionStorage.setItem('listId',listid)
        this.props.history.push({
            pathname:'/songsplayer',
            state:{
                id:id,
                listid:listid
            }
        })
    }
    back = () => {
        this.props.history.goBack()
    }
    render() {
        const { songsdetail } = this.state
        return (
            <div className={styles.songslistdetail}>
                {songsdetail &&
                    <div>
                        <div className={styles.header}>
                            <span className="iconfont icon-houtui" onClick={this.back}></span>
                            <span>歌单</span>
                            <span></span>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.imgbox}>
                                <img src={songsdetail.playlist.coverImgUrl} alt="" />
                            </div>
                            <div className={styles.dright}>
                                <h3>{songsdetail.playlist.name}</h3>
                                <p>
                                    <span>歌单作者:</span>
                                    <span>{songsdetail.playlist.creator.nickname}</span>
                                </p>
                                <p>{songsdetail.playlist.description}</p>
                            </div>
                        </div>
                        <div className={styles.snav}>
                            <div>
                                <p className="iconfont icon-L4"></p>
                                <p>{songsdetail.playlist.commentCount}</p>
                            </div>
                            <div>
                                <p className="iconfont icon-fenxiang1"></p>
                                <p>{songsdetail.playlist.shareCount}</p>
                            </div>
                            <div>
                                <p className="iconfont icon-xiazai1"></p>
                                <p>下载</p>
                            </div>
                            <div>
                                <p className="iconfont icon-xuanze"></p>
                                <p>多选</p>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.cheader}>
                                <span className="iconfont icon-bofang"></span>
                                <span>歌曲列表</span>
                                <span>{"(" + songsdetail.playlist.tracks.length + ")"}</span>
                            </div>
                            <div className={styles.info}>
                                {songsdetail.playlist.tracks.map((e, i) => (
                                    <div key={i} className={styles.item} onClick={() => this.toSongsItem(e.id,this.state.id)}>
                                        <div>
                                            <span>{i + 1}</span>
                                        </div>
                                        <div>
                                            <p>{e.name}</p>
                                            <p>{e.al.name}</p>
                                        </div>
                                        <div>
                                            <span className="iconfont icon-bofang1">
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        new Promise((reslove, reject) => {
            this.setState({
                id: this.props.match.params.id
            },() => {
                reslove()
            })
        })
            .then(() =>

                this.reqSongsList()
            )
        // this.setState({
        //     id: this.props.match.params.id
        // })
        // this.reqSongsList()


    }
}

export default SongsListDetail
