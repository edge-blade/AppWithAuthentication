import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import SecretQuote from './components/SecretQuote.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import auth from './auth'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.debug = true;

// set routes
const routes = [
    //{ path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/secretquote', component: SecretQuote },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '*', redirect: '/home' },
]

// init router
export const router = new VueRouter({
    routes: routes,
    mode: 'history'
})


// Check the users auth status when the app starts
auth.checkAuth()

// start app
new Vue({
    el: '#app',
    router,
    components: { App }
})