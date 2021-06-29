
export default {
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
}