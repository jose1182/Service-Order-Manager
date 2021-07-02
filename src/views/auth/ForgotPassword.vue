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
                        :rules="emailRules"
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
    </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    name: "ForgotPassword",
    data(){
        return{
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ], 
        }
    },
    methods:{
        ...mapActions({
            forgotPassword : 'user/forgotPassword',
            addNotification: 'application/addNotification'
        }),
        sendForgotPassword(){
            if(this.$refs.forgotPasswordForm.validate()){
                this.forgotPassword({email: this.email} ).then(() => {
                    this.addNotification({
                        text : 'Email send!',
                        show : true
                    });
                }).catch(() =>{
                    this.addNotification({
                        text : 'Fail to send email!',
                        show : true
                    });                 
                });
            }
        }
    }
}
</script>
