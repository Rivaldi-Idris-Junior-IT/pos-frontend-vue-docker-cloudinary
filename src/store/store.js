import Vue from 'vue'
import Vuex from  'vuex'
import axios from "axios"
import 'es6-promise/auto'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || null,
    },
    getters: {
        loggedIn(state){
            return state.token !== null
        }
    },
    mutations: {
        retrieveToken(state,token) {
            state.token = token
        }
    },
    actions: {
        
        retrieveToken(context, credentials) {

            return new Promise((resolve, reject) => {
                axios.post('http://localhost:4500/backend/auth', {
                    username: credentials.username,
                    password: credentials.password,
                })
                .then(response => {
                    const token = response.data.result[0].token
                    localStorage.setItem('token', token)
                    context.commit('retrieveToken',token)
                    resolve(response)
                    // console.log(response);
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
    }
})