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
                    <v-form ref="registerForm" :value="formValid">
                    <v-text-field
                        label="Name"
                        name="name"
                        :rules="nameRules"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="newUser.name"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        name="email"
                        :rules="emailRules"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="newUser.email"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        :rules="[...passwordRules, customPasswordValidator]"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="newUser.password"
                    ></v-text-field>
                    <v-text-field
                        id="password_confirmation"
                        label="Password Confirmation"
                        name="password_confirmation"
                        :rules="[...passwordRules, customPasswordValidator]"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="newUser.password_confirmation"
                    ></v-text-field>                
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn block dark color="deep-purple darken-2" @click="registerUser" >Register</v-btn>
                </v-card-actions>
                    <v-row justify="center" class="my-2">
                        <p>Do you have an account?</p>
                        <a href="login" class="subheading mx-3">Login</a>
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
    name: "Register",
    mixins:[PasswordValidationMixin],
    data(){
        return{
            formValid: false,
            newUser: {
                email: '',
                name:'',
                password:'',
                password_confirmation: ''
            },
            requiredRules:[
                v => !!v || 'This field is required'
            ],            
            nameRules:[
                v => !!v || 'Name is required',             
            ]    
        }
    },
    methods:{
        ...mapActions({
            addNotification: 'application/addNotification',
            register: 'user/registerUser'
        }),

        registerUser(){
            if(this.$refs.registerForm.validate()){
                this.register(this.newUser)
                    .then((response) => {
                        if(response.data && response.data.success){
                                this.addNotification({
                                    show: true,
                                    text: 'Success!'
                                }).then(() => {
                                    this.$router.push({
                                        name: 'login'
                                    });
                                })
                      
                        }


                    })
                    .catch(() => {
                        this.addNotification(
                            {
                                show : true,
                                text : 'failed'
                            }  
                        )
                    })
                //console.log({event, $form: this.$refs.registerForm.validate()});
            }

        },
        customPasswordValidator(){
            return (this.newUser.password === this.newUser.password_confirmation) || 'New Password is not confirmed'
        }
    }
}
</script>
