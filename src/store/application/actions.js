import axios from '../../axios/index'

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
    },
    importCustomers(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('import-customers', payLoad)
                .then((response) => {
                    if (response.data) {
                        console.log(response);
                        resolve(response);
                    } else {
                        reject(response);
                    }                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    importOrders(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('import-orders', payLoad)
                .then((response) => {
                    if (response.data) {
                        context.dispatch('orders').then(() => resolve(response));
                        resolve(response);
                    } else {
                        reject(response);
                    }                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    orders(context){
        return new Promise((resolve, reject) => {
            axios
                .get('list-orders')
                .then((response) => {
                    context.commit('setListOrders', response.data.data);
                    console.log('orders', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });              
        })
    },
    setOrder(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .post('set-order', payLoad)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    createService(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('create-service', payLoad)
                .then((response) => {
                    if (response.data) {
                        resolve(response);
                    } else {
                        reject(response);
                    }                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    getCustomers(context){
        
        return new Promise((resolve, reject) => {
            axios
                .get('list-customers')
                .then((response) => {
                    context.commit('setListCustomers', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                }); 
        });
    },
    createCustomer(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('create-customer', payLoad)
                .then((response) => {
                    if (response.data.success) {
                        context.dispatch('getCustomers').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    updateCustomer(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('update-customer', payLoad)
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
    deleteCustomer(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post(`delete-customer/${payLoad}`)
                .then((response) => {
                    if (response.data.success) {
                        context.dispatch('getCustomers').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    getService(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .get(`show-service/${payLoad}`)
                .then((response) => {
                    context.commit('setServiceDetails', response.data.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },

    getProjects(context){
        return new Promise((resolve, reject) => {
            axios
                .get('list-projects')
                .then((response) => {
                    context.commit('setListProjects', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });              
        })
    },

}