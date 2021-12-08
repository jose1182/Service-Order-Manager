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
    //
    getContacts(context){
        
        return new Promise((resolve, reject) => {
            axios
                .get('list-contacts')
                .then((response) => {
                    context.commit('setListContacts', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                }); 
        });
    },
    createContact(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('create-contact', payLoad)
                .then((response) => {
                    if (response.data.success) {
                        context.dispatch('getContacts').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    updateContact(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('update-contact', payLoad)
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
    deleteContact(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post(`delete-contact/${payLoad}`)
                .then((response) => {
                    if (response.data.success) {
                        context.dispatch('getContacts').then(() => resolve(response));
                    } else {
                        reject(response);
                    }
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

    getContactsByCostumer(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .get(`list-contactsId/${payLoad}`)
                .then((response) => {
                    console.log(response.data)
                    context.commit('setListOrderContacts', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },

    getEndContactsByCostumer(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .get(`list-contactsId/${payLoad}`)
                .then((response) => {
                    console.log(response.data)
                    context.commit('setListEndContacts', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },

    getCostumerById(context, payLoad){
        return new Promise((resolve, reject) => {
            axios
                .get(`get-costumer/${payLoad}`)
                .then((response) => {
                    console.log(response.data)
                    context.commit('setEndCustomer', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });  
        });
    },
    getServiceDetail(context, payLoad){
        
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
    getServices(context){
        
        return new Promise((resolve, reject) => {
            axios
                .get('list-services')
                .then((response) => {
                    context.commit('setListServices', response.data.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                }); 
        });
    },
    updateServiceDetails(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post('update-service', payLoad)
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
    deleteService(context, payLoad){
        
        return new Promise((resolve, reject) => {
            axios
                .post(`delete-service/${payLoad}`)
                .then((response) => {
                    if (response.data.success) {
                        context.dispatch('getServices').then(() => resolve(response));
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