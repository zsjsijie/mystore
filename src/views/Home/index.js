import React, { Component } from 'react'
import ctx from '../../assets/js/ctx'
import styles from './index.module.scss'

export class Home extends Component {
    static contextType = ctx
    constructor(props) {
        // console.log(props,123321)
        super()
        this.state = {
            navList: [
                {
                    id: '1',
                    name: '私人FM',
                    img: require('../../assets/img/fm.jpg'),
                },
                {
                    id: '2',
                    name: '最新dj',
                    img: require('../../assets/img/dj.jpg')
                },
                {
                    id: '3',
                    name: 'sati空间',
                    img: require('../../assets/img/sati.jpg')
                },
                {
                    id: '4',
                    name: '私藏推荐',
                    img: require('../../assets/img/collect.jpg')
                },
                {
                    id: '5',
                    name: '因乐交友',
                    img: require('../../assets/img/love.jpg')
                },
                {
                    id: '6',
                    name: '亲子频道',
                    img: require('../../assets/img/child.jpg')
                },
                {
                    id: '7',
                    name: '古典专区',
                    img: require('../../assets/img/classic.jpg')
                },
                {
                    id: '8',
                    name: '跑步FM',
                    img: require('../../assets/img/run.jpg')
                },
            ],
            userList: [
                {
                    iconfont: 'iconfont icon-yinyue_active',
                    name: '本地音乐',
                    number: '(0)',
                    id: '1'
                },
                {
                    iconfont: 'iconfont icon-play',
                    name: '最近播放',
                    number: '(0)',
                    id: '2'
                },
                {
                    iconfont: 'iconfont icon-xiazai',
                    name: '下载管理',
                    number: '(0)',
                    id: '3'
                },
                {
                    iconfont: 'iconfont icon-diantai',
                    name: '我的电台',
                    number: '(0)',
                    id: '4'
                },
                {
                    iconfont: 'iconfont icon-wodeshoucang',
                    name: '我的收藏',
                    number: '(专辑/歌手/视频/专栏/主题)',
                    id: '5'
                },

            ],
            recommendList: [],
            contentShow: true,
            songsList:[],
        }
    }
    reqRedioStationList() {

        this.context.axios.post('/personalized/djprogram')
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        navList: res.result
                    })
                }
            })
    }
    reqLoginStatus(){
        this.context.axios.post('/login/status')
        .then(res => {
            console.log(res,3333)
            if(res.code == 200){
                this.setState({
                    userId:res.profile.userId
                })
                this.context.axios.post('/user/subcount',{
                    uid:this.state.userId
                })
                .then(res => {
                    console.log(res)
                })
                this.context.axios.post('/user/playlist',{
                    uid:this.state.userId
                })
                .then(res => {
                    console.log(res,'歌单')
                })
            }else{
                Toast.fail('内部错误')
            }
        })
        
    }
    reqSongsList(){
        this.context.axios.get('/personalized')
        .then(res => {
            console.log(res)
            if(res.code==200){
                this.setState({
                    songsList:res.result
                })
            }
        })
    }
    rotate() {

    }
    toSongsListInfo(id){
        this.props.history.push('/songslistdetail/' + id)
    }
    render() {
        const { navList, userList, recommendList,songsList } = this.state
        return (
            <div className={styles.home}>
                {this.state.navList &&
                    <div className={styles.radionav}>
                        {navList.map(e => (
                            <div className={styles.radioinfo} key={e.id}>
                                <div>
                                    <img src={e.img} alt="我白给了" />
                                </div>
                                <p>{e.name}</p>
                            </div>
                        ))}
                    </div>
                }
                <div className={styles.userlist}>
                    {userList.map(e =>
                        <div className={styles.userinfo} key={e.id}>
                            <span className={e.iconfont}></span>
                            <span>{e.name}</span>
                            <span>{e.number}</span>
                        </div>
                    )}
                </div>
                <div className={styles.recommend}>
                    <div className={styles.rtitle}>
                        <span className={`iconfont icon-qianjin`} onClick={this.rotate}></span>
                        <b>创建的歌单</b>
                        <span>(1)</span>
                    </div>
                    <div className="cl">
                        {this.state.contentShow &&
                            <div className={styles.rcontent}>
                                <div className={styles.rimg}>
                                    <img src={require('../../assets/img/heart.jpg')} alt="" />
                                </div>
                                <div className={styles.rfav}>
                                    <p>我喜欢的音乐</p>
                                    <p>0首</p>
                                </div>
                                <div className={styles.rheart}>
                                    <span className={`iconfont icon-xindong`}></span>
                                    <span>心动模式</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        {recommendList &&
                            recommendList.map(e =>
                                <div className={styles.rcontent}>
                                    <div className={styles.rimg}>
                                        <img src="" alt="" />
                                    </div>
                                    <div>
                                        <p>我喜欢的音乐</p>
                                        <p>0首</p>
                                    </div>
                                    <div className={styles.rfav}>
                                        <span className={`iconfont icon-xindong`}></span>
                                        <span>心动模式</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
                <div className={styles.songsmenu}>
                    <div className={styles.stitle}>
                        <span className="iconfont icon-xinaixin"></span>
                        <b>推荐歌单</b>
                        <span className="iconfont icon-x"></span>
                    </div>
                    <div className={styles.scontent}>
                        {songsList.map(e => (
                            <div className={styles.sinfo} key={e.id} onClick={()  => this.toSongsListInfo(e.id)}>
                                <div className={styles.simg}>
                                    <img src={e.picUrl} alt=""/>
                                </div>
                                <p>{e.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.reqSongsList()

    }
}

export default Home
