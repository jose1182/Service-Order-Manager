import axios from 'axios'

const state = {
    isLoggedIn: false,
    userDetails: {}
};

const mutations = {
    setLoggedIn(state, payLoad){
        state.isLoggedIn = payLoad;
    }
};

const getters = {
    loggedIn(state){
        return state.isLoggedIn;
    }
}

const actions = {
    loginUser(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .post('http://127.0.0.1:8001/api/login', payLoad)
                .then((response) => {
                    if(response.data.access_token){
                        localStorage.setItem('token', response.data);
                        context.commit('setLoggedIn', true);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });    
        });
    },

    logoutUser(context){
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            context.commit('setLoggedIn', false);
            resolve(true);
        })
    },

    setLoggedInState(context){
        return new Promise((resolve) => {
            if(localStorage.getItem('token')){
                context.commit('setLoggedIn', true);
                resolve(true);
            } else {
                context.commit('setLoggedIn', false);
                resolve(false);
            }
        });
    },

    forgotPassword(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('http://127.0.0.1:8001/api/forgot-password', payLoad)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    resetPassword(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('http://127.0.0.1:8001/api/reset-password', payLoad)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}