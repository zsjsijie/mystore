/* 
1.state:定义需要被共享的全局参数
2.actionCreator:用来创建action 一个action就是一个json对象,里面的内容就是此次要修改的内容
3.reducer:用来执行action,修改state中的参数,并导出一个新的state
4.component view :组件视图 当组件所依赖的state参数发生改变,这个组件视图就会自动更新
*/ 

import {createStore,combineReducers} from 'redux'

import {cartReducer, tokenReducer,userIdReducer} from './reducers'

//定义一个最大的reducer,得到一个总的reducer
const rootReducer = combineReducers({
    cart:cartReducer,
    token:tokenReducer,
    userIdReducer
})

//基于这个总的reducer ,生成一个store

const store = createStore(rootReducer)

export default store