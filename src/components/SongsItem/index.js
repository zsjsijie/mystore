import React, { Component } from 'react'
import styles from './index.module.scss'
import ctx from '../../assets/js/ctx'

export class ModelOfSongs extends Component {
    static contextType = ctx

    render() {
        const {itemInfo} = this.props
        
        return (
            <>
            <div className={styles.itembox}>
                <div className={styles.sinfo} key={itemInfo.id}>
                    <div className={styles.simg}>
                        <img src={itemInfo.picUrl} alt="" />
                    </div>
                    <p>{itemInfo.name}</p>
                </div>
            </div>
            </>
        )
    }
}

export default ModelOfSongs
