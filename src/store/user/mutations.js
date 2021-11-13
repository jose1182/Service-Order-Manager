export default {
    setLoggedIn(state, payLoad){
        state.isLoggedIn = payLoad;
    },

    setUserDetails(state, payload){
        state.userDetails = payload;
    },
    setListUsers(state, payload){
        state.listUsers = payload;
    },
    setServiceUsers(state, payload){
        state.users = payload;
    }
}