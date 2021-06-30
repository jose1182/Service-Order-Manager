export default {
    setLoggedIn(state, payLoad){
        state.isLoggedIn = payLoad;
    },

    setUserDetails(state, payload){
        state.setUserDetails = payload;
    }
}