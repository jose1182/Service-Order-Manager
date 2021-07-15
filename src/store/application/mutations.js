export default {
    addNotification(state, payload){
        state.notifications.push(payload);
    },
    removeNotification(state, payload){
        state.notifications.splice(payload, 1);
    },
    setListOrders(state, payload){
        state.orders.push(payload);
    },
}