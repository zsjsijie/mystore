import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '../../assets/js/ctx'

export class SongsDetail extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            id: '',
            listId: '',
            songsInfo: null,
            songsList: [],
            songsUrl: '',
            songsIdList: [],
            play: true,
        }
    }
    reqSongsInfo() {

        this.context.axios.post('/song/url', {
            id: this.state.id
        })
            .then(res => {
                console.log(res)
                this.setState({
                    songsUrl: res.data[0].url
                })              
            })

    }
    pause = () => {
        let myAudio = this.refs.myAudio
        let myIcon = this.refs.myIcon
        if (myAudio.paused) {
            myAudio.play();
        } else {
            myAudio.pause();
        }
        myAudio.addEventListener("play",function(){
            console.log("music play");
            myIcon.className = "iconfont icon-bofang3 myicon rotate play"

        })
        
        // 监听暂停 
        myAudio.addEventListener("pause",function(){
            console.log("music pause");
            myIcon.className = "iconfont icon-bofang2 myicon rotate pause"
        })

    }

   

    getSongsIdList() {
        let songsList = this.state.songsList

        let songsIdList = []
        for (let i = 0; i < songsList.length; i++) {
            const id = songsList[i].id
            songsIdList.push(id)

        }
        this.setState({
            songsIdList: songsIdList
        })

    }
    nextSongs = () => {

        let myAudio = this.refs.myAudio
        let { id, songsIdList } = this.state
        console.log(id, songsIdList)
        let i = songsIdList.indexOf(id) * 1 + 1
        if (i == songsIdList.length - 1) {
            i = 0
        }
        console.log(i)
        let nextId = songsIdList[i]
        console.log(nextId, 111122)

        new Promise((resolve, reject) => {
            this.setState({
                id: nextId
            }, () => {
                resolve()
            })

        })
            .then(() => {
                this.reqSongsInfo()
                this.reqSongsList(this.state.id)
            }, () => {
                resolve()
            })
            .then(() => {
                myAudio.src = this.state.songsUrl
            })
    }
    prevSongs = () => {
        let myAudio = this.refs.myAudio
        let { id, songsIdList } = this.state
        console.log(id, songsIdList)
        let i = songsIdList.indexOf(id) * 1 - 1
        if (i < 0) {
            i = songsIdList.length - 1
        }
        let nextId = songsIdList[i]
        console.log(nextId, 111122)

        new Promise((resolve, reject) => {
            this.setState({
                id: nextId
            }, () => {
                resolve()
            })

        })
            .then(() => {
                this.reqSongsInfo()
                this.reqSongsList(this.state.id)
            }, () => {
                resolve()
            })
            .then(() => {
                myAudio.src = this.state.songsUrl
            })
    }
    reqSongsList(id) {
        this.context.axios.post('/playlist/detail', {
            id: this.state.listId
        })
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        songsList: res.playlist.tracks
                    })
                    this.getSongsIdList()
                    const songsInfo = this.state.songsList.filter(e => e.id == id)
                    this.setState({
                        songsInfo: songsInfo[0]
                    })
                    console.log(this.state.songsInfo)


                    // let {myAudio,myIcon} = this.refs
                    // myAudio.addEventListener("play", function () {
                    //     console.log("music play");
                    //     myIcon.className = "iconfont icon-bofang3"
            
                    // })
            
                    // // 监听暂停 
                    // myAudio.addEventListener("pause", function () {
                    //     console.log("music pause");
                    //     myIcon.className = "iconfont icon-bofang2"
                    // })  
                } else {
                    Toast.fail('未知错误')
                }
                console.log(this.state.songsList)
            })
    }
    back = () =>{
        this.props.history.goBack()
    }

    render() {
        const { songsInfo } = this.state
        return (
            <div className={styles.songsplayer}>
                {songsInfo &&
                    <div>
                        <div className={styles.sheader}>
                            <div>
                                <span className="iconfont icon-houtui" onClick={this.back}></span>
                            </div>
                            <div>
                                <p>
                                    {songsInfo.name}
                                </p>
                                <p>
                                    {songsInfo.ar[0].name}
                                </p>
                            </div>
                            <div>
                                <span className="iconfont icon-fenxiang1"></span>
                            </div>
                        </div>
                        <div className={styles.main}>
                            <div>
                                <div>
                                    <div>
                                        <img src={songsInfo.al.picUrl} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.nav}>

                            <span className="iconfont icon-xinaixinfuzhi"></span>


                            <span className="iconfont icon-xiazai1"></span>


                            <span className="iconfont icon-jingyunyinxiaopt-wangyiicon"></span>


                            <span className="iconfont icon-L4"></span>


                            <span className="iconfont icon-gengduo"></span>

                        </div>
                        <div className={styles.song}>
                            <span></span>
                            <audio
                                src={this.state.songsUrl}
                                autoPlay
                                loop
                                preload
                                // controls
                                ref='myAudio'
                                onLoadedData={() => {
                                    console.log("music play");
                                    this.refs.myIcon.className = "iconfont icon-bofang3"    
                                }}
                                onPlay = {() => {

                                }}
                            ></audio>
                            <span></span>
                        </div>
                        <div className={styles.handle}>
                            <div className="iconfont icon-shunxubofang"></div>
                            <div className="iconfont icon-shangyiqu1" onClick={this.prevSongs}></div>
                            <div onClick={this.pause}>
                                <span className="iconfont icon-bofang2" ref='myIcon'></span>
                            </div>
                            <div className="iconfont icon-xiayiqu" onClick={this.nextSongs}></div>
                            <div className="iconfont icon-bofangliebiao"></div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    componentDidMount() {
        new Promise((resolve, reject) => {
            this.setState({
                id: sessionStorage.getItem("id"),
                listId: sessionStorage.getItem("listId")
            }, () => {
                resolve()
            })

        })
            .then(() => {
                this.reqSongsInfo()
                this.reqSongsList(this.state.id)

            })

            .then(() => {
                console.log(this.state.id, this.state.listId)
            })
        // this.setState({
        //     id:this.props.match.params.id
        // })
        // this.reqSongsInfo()

    }
    componentDidUpdate(){

    }

}

export default SongsDetail
