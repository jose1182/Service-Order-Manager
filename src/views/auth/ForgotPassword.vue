<template>
    <div>
        <v-container
            fluid
            mt-5
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
                <v-card class="elevation-12 grey lighten-3">
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
                    <v-btn dark color="deep-purple darken-2" @click="sendForgotPassword">Send Email</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>    
    </div>
</template>
<script>

import { mapActions } from 'vuex'
import PasswordValidationMixin from '../../mixins/PasswordValidationMixin'

export default {
    name: "ForgotPassword",
    mixins:[PasswordValidationMixin],
    data(){
        return{
            email: '',
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
