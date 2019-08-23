import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '@/assets/js/ctx'
import { Carousel, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import ModelOfSongs from '../../components/SongsItem'



export class Discover extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            swiperList: [],
            navList: [
                {
                    id: '1',
                    name: '每日推荐',
                    img: require('../../assets/img/rec.jpg')
                },
                {
                    id: '2',
                    name: '歌单',
                    img: require('../../assets/img/menu.jpg')
                },
                {
                    id: '3',
                    name: '排行榜',
                    img: require('../../assets/img/paihang.jpg')
                },
                {
                    id: '4',
                    name: '电台',
                    img: require('../../assets/img/radiostation.jpg')
                },
                {
                    id: '5',
                    name: '直播',
                    img: require('../../assets/img/active.jpg')
                }

            ],
            songsList: [],
            album: true,
            albumList: [],
            newSongsList: [],
            songs:false,
        }
    }
    reqSwiperList() {
        this.context.axios.get('/banner')
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        swiperList: res.banners
                    })
                }
            })
    }
    reqSongsList() {
        this.context.axios.get('/personalized')
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        songsList: res.result.splice(0, 6)
                    })
                }

            })
    }
    reqNewAlbum() {
        this.context.axios.get('/album/newest')
            .then(res => {
                if (res.code == 200) {
                    this.setState({
                        albumList: res.albums.splice(0, 3)
                    })
                }
            })
    }
    reqNewSong() {
        this.context.axios.get('/personalized/newsong')
            .then(res => {
                console.log(res, "songs")
                if (res.code == 200) {
                    this.setState({
                        newSongsList: res.result.splice(0, 3)
                    })
                }
            })
    }
    reqNewMv(){
        this.context.axios.get('/mv/first?limit=10')
        .then(res => {
            console.log(res,"mv")
        })
    }
    toSongsListInfo(id){
        this.props.history.push('/songslistdetail/' + id)
    }
    

    render() {
        const { swiperList, navList, songsList, albumList,newSongsList } = this.state
        return (
            <div className={styles.discover}>
                {swiperList &&
                    <div className={styles.swiper} >
                        <WingBlank>
                            <Carousel
                                autoplay={true}
                                infinite
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
                            >
                                {this.state.swiperList.map(val => (
                                    <button
                                        key={val.targetId}

                                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                    >
                                        <img
                                            src={val.imageUrl}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    </button>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                }
                <div className={styles.nav}>
                    {navList.map(e => (
                        <div className={styles.ninfo} key={e.id}>
                            <div>
                                <img src={e.img} alt="" />
                            </div>
                            <p>{e.name}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.songsmenu}>
                    <div className={styles.stitle}>
                        <span className="iconfont icon-xinaixin"></span>
                        <b>推荐歌单</b>
                        <span className={styles.menur}>歌单广场</span>
                    </div>
                    <div className={styles.scontent}>
                        {songsList.map(e => (
                            <div className={styles.sinfo} key={e.id} onClick={()  => this.toSongsListInfo(e.id)} >
                                <div className={styles.simg}>
                                    <img src={e.picUrl} alt="" />
                                </div>
                                <p>{e.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.songsalbum}>
                    <div className={styles.satitle}>
                        <span onClick={this.album} isActive={this.album}>新碟</span>
                        <span>更多新碟</span>
                    </div>
                    {this.state.album &&
                        <div className={styles.album}>
                            {
                                albumList.map((e,i) => (
                                    <ModelOfSongs itemInfo={e} key={i} />
                                ))
                            }
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.reqSwiperList()
        this.reqSongsList()
        this.reqNewSong()
        this.reqNewAlbum()
        this.reqNewMv()
    }
}

export default Discover

