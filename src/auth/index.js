import { router } from '../index'

// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

export default {
    // User object will let us check authentication status
    user: {
        authenticated: false
    },
    // Send a request to the login URL and save hte returned JWT
    login(context, creds, redirect) {
      context.$http.post(LOGIN_URL, creds).then((response) => {
          localStorage.setItem('id_token', response.body.id_token)

          this.user.authenticated = true
          
          // Redriect to a specified route
          if (redirect) {
              router.push(redirect)
          }
      }, (response) => {
            context.error = response
        })
    //   .error((err) => {
    //       context.error = err
    //   })  
    },
    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds).then( (response) => {
            localStorage.setItem('id_token', response.body.id_token)

            this.user.authenticated = true

            if (redirect) {
                router.push(redirect)
            }
        }, (response) => {
            context.error = response
        })
    },
    logout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
    },
    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
        } else {
            this.user.authenticated = false
        }
    },
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
    }
}