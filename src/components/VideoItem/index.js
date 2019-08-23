import React, { Component } from 'react'

export class VideoItem extends Component {
    render() {
        const {itemInfo} = this.props
        return (
            <div>
                <div>
                    <div>
                        <img src={itemInfo.data} alt="" />
                    </div>
                    <div>{itemInfo.name}</div>
                </div>
            </div>
        )
    }
}

export default VideoItem
