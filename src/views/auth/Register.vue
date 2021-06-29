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
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="registerForm" :value="formValid">
                    <v-text-field
                        label="Name"
                        name="name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="newUser.name"
                    ></v-text-field>
                    <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="newUser.email"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="newUser.password"
                    ></v-text-field>
                    <v-text-field
                        id="password_confirmation"
                        label="Password Confirmation"
                        name="password_confirmation"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="newUser.password_confirmation"
                    ></v-text-field>                
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="registerUser" >Register</v-btn>
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
    name: "Register",
    data(){
        return{
            formValid: false,
            newUser: {
                email: '',
                name:'',
                password:'',
                password_confirmation: ''
            }
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

        }
    }
}
</script>
