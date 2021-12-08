export default {
    addNotification(state, payload){
        state.notifications.push(payload);
    },
    removeNotification(state, payload){
        state.notifications.splice(payload, 1);
    },
    setListOrders(state, payload){
        state.orders = payload;
    },
    setListCustomers(state, payload){
        state.customers = payload;
    },
    setServiceDetails(state, payload){
        state.serviceDetails = payload;
    },
    setListProjects(state, payload){
        state.projects = payload;
    },
    setListContacts(state, payload){
        state.contacts = payload;
    },
    setListServices(state, payload){
        state.services = payload;
    },
    setListOrderContacts(state, payload){
        state.orderContacts = payload;
    },
    setListEndContacts(state, payload){
        state.endContacts = payload;
    },
    setEndCustomer(state, payload){
        state.endCustomer = payload;
    }
}
