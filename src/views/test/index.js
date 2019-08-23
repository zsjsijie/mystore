import React, { Component } from 'react'

export class Test extends Component {

    constructor(){
        super()
        this.state={
            goodsList:[
                {name:'辉耀',price:'5000'},
                {name:'血辣',price:'5500'},
                {name:'蝴蝶',price:'6000'},
                {name:'大根',price:'5800'},
                {name:'圣剑',price:'5600'}
            ],
            cartList:[]
        }
    }
    render() {
        const {cartList,goodsList} =this.state
        return (
            <div>
                {cartList.map(e => (
                    <div>
                        <span>{e.name}</span>
                        <span>{e.price}</span>
                        <button>加入购物车</button>
                    </div>
                ))
                    
                }
            </div>
        )
    }
}

export default Test
