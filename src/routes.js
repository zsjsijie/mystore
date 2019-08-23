import Home from './views/Home'
import Discover from './views/Discover'
import Friends from './views/Friends'
import Video from './views/Video'
import Login from './views/Login'
import LoginPhone from './views/LoginPhone'
import Password from './views/password'
import SongsListDetail from './views/SongsListDetail'
import SongsPlayer from './views/SongsPlayer'
import MVPlayer from './views/MVPlayer'
import VfcCode from './views/VfcCode'
import Test from './views/test'
const routes = [
    {
        path:'/home',
        key:'home',
        component:Home,
        exact:true
    },
    {
        path:'/discover',
        key:'discover',
        component:Discover,

    },
    {
        path:'/friends',
        key:'friends',
        component:Friends,

    },
    {
        path:'/video',
        key:'video',
        component:Video,

    },
    {
        path:'/login',
        key:'login',
        component:Login,

    },
    {
        path:'/loginphone',
        key:'loginphone',
        component:LoginPhone,

    },
    {
        path:'/password:usertel',
        key:'password',
        component:Password,

    },
    {
        path:'/songslistdetail/:id',
        key:'songslistdetail',
        component:SongsListDetail,

    },
    {
        path:'/songsplayer',
        key:'songsplayer',
        component:SongsPlayer,

    },
    {
        path:'/mvplayer/:id',
        key:'mvplayer',
        component:MVPlayer, 
    },
    {
        path:'/vfccode/:usertel',
        key:'vfccode',
        component:VfcCode, 
    },
    {
        path:'/test',
        key:'test',
        component:Test
    }
]

export default routes