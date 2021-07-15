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
    orders(context){
        return new Promise((resolve, reject) => {
            axios
                .get('list-orders')
                .then((response) => {
                    context.commit('setListOrders', response.data.data);
                    console.log(response.data);
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
}