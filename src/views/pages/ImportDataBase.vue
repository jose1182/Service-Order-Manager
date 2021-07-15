<template>
    <v-app>
        <v-layout mt-5>
            <v-flex xs6>
                <v-card  raised
                    elevation="2"
                    outlined
                    >
                <v-card-title>
                    Import Customers data
                </v-card-title>

                    <v-form
                        ref="fileForm"
                        v-model="valid"
                        lazy-validation
                    >

                        <v-file-input
                            accept=".xlsx"
                            show-size
                            label="File input"
                            v-model="file"
                        ></v-file-input>

                        <v-btn
                        color="success"
                        class="mr-4"
                        @click="uploadFile"
                        >
                        Upload file
                        </v-btn>

                    </v-form>
                </v-card>        
            </v-flex>

            <v-flex xs6>
                <v-card  raised
                    elevation="2"
                    outlined
                    >
                <v-card-title>
                    Import orders details
                </v-card-title>

                    <v-form
                        ref="fileFormOrders"
                        v-model="valid"
                        lazy-validation
                    >

                        <v-file-input
                            accept=".xls"
                            show-size
                            label="File input"
                            v-model="orderFile"
                        ></v-file-input>

                        <v-btn
                        color="success"
                        class="mr-4"
                        @click="uploadFileOrders"
                        >
                        Upload file
                        </v-btn>

                    </v-form>
                </v-card>        
            </v-flex>            


        </v-layout>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            valid: true,
            file: null,
            orderFile: null
        }
    },
    methods:{
        ...mapActions({
            importCustomers : 'application/importCustomers',
            importOrders : 'application/importOrders',
            addNotification: 'application/addNotification'
        }),
        uploadFile(){
            if(this.$refs.fileForm.validate()){
                const formData = new FormData();
                formData.append('file', this.file, this.file.name);
                    this.importCustomers(formData)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Succefully import'
                        }).then(() => {
                            this.$router.push({name: 'dashboard'});
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            text: 'Faild import!!',
                            show: true
                        })
                    });

            }
        },
        uploadFileOrders(){
            if(this.$refs.fileFormOrders.validate()){
                const formData = new FormData();
                formData.append('file', this.orderFile, this.orderFile.name);
                    this.importOrders(formData)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Succefully import'
                        }).then(() => {
                            this.$router.push({name: 'dashboard'});
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            text: 'Faild import!!',
                            show: true
                        })
                    });

            }
        }
    }
}
</script>