<template>
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
                <v-card class="elevation-5 grey lighten-5">
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
                    <v-row justify="center">
                    <a
                    href="forgot-password"
                    class="subheading mx-3 grey--text"
                    >
                    Forgot password?
                    </a>
                    </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block dark color="deep-purple darken-2" @click="loginUser">Login</v-btn>
                </v-card-actions>
                    <v-row justify="center" class="my-2">
                        <p>Don't have an account?</p>
                        <a href="register" class="subheading mx-3">Sign up</a>
                    </v-row>
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
