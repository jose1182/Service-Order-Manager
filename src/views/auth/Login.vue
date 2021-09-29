<template>
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
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="loginForm">
                    <v-text-field
                        label="Email"
                        name="email"
                        :rules="emailRules"
                        prepend-icon="mdi-account"
                        type="email"
                        v-model="user.email"
                    ></v-text-field>

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        :rules="passwordRules"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="user.password"
                    ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="loginUser">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
</template>
<script>

import { mapActions } from 'vuex'
import PasswordValidationMixin from '../../mixins/PasswordValidationMixin'
export default {
    name: "Login",
    mixins:[PasswordValidationMixin],
    data(){
        return{
            user:{
                email: '',
                password:''
            }    
        }
    },
    methods:{
        ...mapActions({
            login: 'user/loginUser',
            addNotification: 'application/addNotification'
        }),
        loginUser(){
            if(this.$refs.loginForm.validate()){
                this.login(this.user)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Welcome'
                        }).then(() => {
                            this.$router.push({name: 'dashboard'});
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            text: 'Faild to login!!',
                            show: true
                        })
                    });
            }
        }
    }
}
</script>
