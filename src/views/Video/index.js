import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '../../assets/js/ctx'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile'
import VideoItem from '../../components/VideoItem'

export class Video extends Component {
    static contextType = ctx
    constructor() {
        super()
        this.state = {
            videoTagList: [],
            videoList: [],
        }
    }
    reqVideoTag() {
        this.context.axios.get('/video/group/list')
            .then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.setState({
                        videoTagList: res.data.splice(1, 10)
                    })
                }
            })
    }

    getVideos = (name) => {
        console.log(name, 11)
        const videoTagList = this.state.videoTagList

        const videoItem = videoTagList.filter(e => e.name == name)
        const videoId = videoItem[0].id

        this.context.axios.post('/video/group', {
            id: videoId
        })
            .then(res => {
                if (res.code == 200) {
                    this.setState({
                        videoList: res.datas
                    })
                }
            })
    }


    render() {
        const { videoTagList, videoList } = this.state
        const tabs = videoTagList.map(e => (
            {
                title: `${e.name}`,
                id: `${e.id}`
            }
        ))
        console.log(tabs)
        const TabExample = () => (
            <div>
                <Tabs tabs={tabs}
                    initialPage={2}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                    onChange={(tab, index) => {
                        const { id } = tab
                        this.context.axios.post('/video/group', {
                            id: id
                        })
                            .then(res => {
                                if (res.code == 200) {
                                    this.setState({
                                        videoList: res.datas
                                    })
                                }
                            })
                    }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                {videoList && videoList.map((e,i) =>
                        <VideoItem itemInfo={e} key={i} />
                    )}
                    
                </Tabs>

            </div>
        );

        return (
            <div className={styles.video}>
                {videoTagList &&
                    <div className={styles.vnav} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        <TabExample />

                    </div>
                }

            </div>
        )
    }
    componentDidMount() {
        this.reqVideoTag()
        console.log(this.props, 111111)
    }


}

export default Video
