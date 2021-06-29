<template>
    <div>
        <v-container
            class="fill-height"
            fluid
        >
            <v-row
            align="center"
            justify="center"
            >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-12">
                <v-toolbar
                    color="primary"
                    dark
                    flat
                >
                    <v-toolbar-title>Forgot Password</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="forgotPasswordForm">
                    <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-account"
                        type="email"
                        v-model="email"
                    ></v-text-field>

                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="sendForgotPassword">Send Email</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
        <v-snackbar
        v-model="snackbar.show"
        >
        {{ snackbar.text }}

        <template v-slot:action="{ attrs }">
            <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>        
    </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    name: "ForgotPassword",
    data(){
        return{
            email: '',
            snackbar:{
                text:'',
                show: false
            }
        }
    },
    methods:{
        ...mapActions({
            forgotPassword : 'user/forgotPassword'
        }),
        sendForgotPassword(){
            if(this.$refs.forgotPasswordForm.validate()){
                this.forgotPassword({email: this.email} ).then(() => {
                    this.snackbar = { 
                        text : 'Email send!',
                        show : true
                    }
                }).catch(() =>{
                    this.snackbar = {
                        text : 'Fail to send email!',
                        show : true
                    }                    
                });
            }
        }
    }
}
</script>
