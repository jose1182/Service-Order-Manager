import axios from '../../axios/index'

export default {

    registerUser(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .post('register', payLoad)
                .then((response) => {
                    if(response.data){
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
    loginUser(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .post('login', payLoad)
                .then((response) => {
                    if (response.data.access_token) {
                        localStorage.setItem('token', response.data.access_token);
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
                .post('forgot-password', payLoad)
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
                .post('reset-password', payLoad)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    me(context){
        return new Promise((resolve, reject) => {
            axios
                .get('me')
                .then((response) => {
                    context.commit('setUserDetails', response.data.data);
                    console.log(response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });              
        })
    },
    changePassword(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('change-password', payLoad)
                .then((response) => {
                    if (response.data.success) {
                        resolve(response);
                    } else {
                        reject(response);
                    }                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    updateDetails(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('change-details', payLoad)
                .then((response) => {
                    if (response.data.success) {
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
}