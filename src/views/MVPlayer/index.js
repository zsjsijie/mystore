import React, { Component } from 'react'
import ctx from '../../assets/js/ctx'
import styles from './index.module.scss'
import { Slider, WingBlank, WhiteSpace } from 'antd-mobile'

export class VideoPlayer extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            id: '',
            videoUrl: '',
            videoDetail: ''
        }
    }
    reqVideoUrl() {
        const id = this.state.id
        this.context.axios.post('/mv/url', {
            id: id
        })
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        videoUrl: res.data.url
                    })
                }
                console.log(this.state.videoUrl, 2323)
            })
    }
    reqVideoDetail() {
        const id = this.state.id
        this.context.axios.post('/mv/detail', {
            mvid: id
        })
            .then(res => {

                this.setState({
                    videoDetail: res.data
                })
                console.log(this.state.videoDetail)
            })
    }
    back = () => {
        this.props.history.goBack()
    }
    log = (name) => {
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }
    play =(event) => {
        const {myVideo,myPic} = this.refs
        console.log(myVideo,myPic)
        console.log(event.target)
        myVideo.play()
        myPic.style.display = "none"
        event.target.style.display = "none"
        console.log(myVideo.value)
    }
    render() {
        const { videoDetail, videoUrl } = this.state
        return (
            <div className={styles.videoplayer}>
                <header>
                    <span className="iconfont icon-houtui" onClick={this.back} ></span>
                    <span>+ 关注</span>
                </header>

                {videoDetail &&
                    <div className={styles.content}>
                        <div className={styles.videobox}>
                            <video
                                src={videoUrl}
                                controls
                                ref='myVideo'
                            ></video>
                            <div className={styles.imgbox} ref='myPic'>
                                <img src={videoDetail.cover} alt="" />
                            </div>
                            <div className={styles.playbutton} onClick={this.play}>
                                <span className="iconfont icon-bofang2"></span>
                            </div>

                            <div>
                                <WingBlank size="lg">
                                    <p className="sub-title">Slider</p>
                                    <Slider
                                        style={{ marginLeft: 30, marginRight: 30 }}
                                        defaultValue={26}
                                        min={0}
                                        max={30}
                                        onChange={this.log('change')}
                                        onAfterChange={this.log('afterChange')}
                                    />
                                </WingBlank>
                            </div>
                            <div>
                                <span>00</span>
                                <span>:</span>
                                <span>00</span>
                                <span>/</span>
                                <span>00</span>
                                <span>:</span>
                                <span>00</span>
                            </div>
                        </div>

                    </div>
                }
                {videoDetail &&
                    <div className={styles.message}>
                        <div>{videoDetail.name}</div>
                        <p>{videoDetail.desc}</p>
                    </div>
                }

                {videoDetail &&
                    <footer>
                        <div className="iconfont icon-fenxiang">
                            <span>{videoDetail.shareCount}</span>
                        </div>
                        <div className="iconfont icon-pinglun1">
                            <span>{videoDetail.commentCount}</span>
                        </div>
                        <div className="iconfont icon-zan">
                            <span>{videoDetail.likeCount}</span>
                        </div>
                        <div >{videoDetail.artists[0].name}</div>
                        <div className="iconfont icon-yinlebofang">
                            <span></span>
                        </div>
                    </footer>
                }


            </div>
        )
    }
    componentWillMount() {
        console.log(this.props.match)
        this.setState({
            id: this.props.match.params.id
        })

    }
    componentDidMount() {
        this.reqVideoDetail()
        this.reqVideoUrl()
        console.log(this.state.id, 111)

    }
}

export default VideoPlayer 
