//定义一个与token相关的action创建函数

function changeToken(data){
    return {
        type:'changeToken',
        payload:data
    }
}

//定义一个与购物车相关的action创建函数
function changeCartList(data){
    return { //返回一个action,是一个json对象
        type: 'changeCartList',
        payload:data
    }
}

function getUserId(data){
    return {
        type: 'getUserId',
        payload:data
    }
}

export {
    changeCartList,
    changeToken,
    getUserId
}