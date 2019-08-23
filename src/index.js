import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {HashRouter} from 'react-router-dom' //引入路由根组件
import {Provider} from 'react-redux'
import axios from './assets/js/axios'
import store from './store'
import ctx from './assets/js/ctx'
const GlobalProvider = ctx.Provider

const store2 = {
    token:localStorage.getItem('token'),
    changeToken(data) {
        this.token = data
    }
}


ReactDOM.render(
    <Provider store={store}>
        <GlobalProvider value={{
            axios,
            commonUrl:"http://localhost:4000",
            store:store2
        }}>
            <HashRouter>
                <App />
            </HashRouter>
        </GlobalProvider>
    </Provider>
    
     
    
    ,document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
