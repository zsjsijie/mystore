import React, { Component } from 'react'

export class Tabs extends Component {
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
                    //initialPage={1}
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
            <div>
                
            </div>
        )
    }
}

export default Tabs
