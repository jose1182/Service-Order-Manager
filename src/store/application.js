

const state = {
    notifications : []
};

const getters = {
    notifications(state){
        return state.notifications
    }
}
const mutations = {
    addNotification(state, payload){
        state.notifications.push(payload);
    },
    removeNotification(state, payload){
        state.notifications.splice(payload, 1);
    }
};

const actions = {
    addNotification(context, payload){
        return new Promise((resolve) => {
            context.commit('addNotification', payload);
            resolve(true)
        })
    },
    removeNotification(context, payload){
        return new Promise((resolve) => {
            context.commit('removeNotification', payload);
            resolve(true)
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}