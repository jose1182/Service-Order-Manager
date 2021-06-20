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
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="loginForm">
                    <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-account"
                        type="email"
                        v-model="user.email"
                    ></v-text-field>

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
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
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "Login",
    data(){
        return{
            user:{
                email: '',
                password:''
            }
        }
    },
    methods:{
        loginUser(){
            if(this.$refs.loginForm.validate()){
                axios
                    .post('http://127.0.0.1:8001/api/login', this.user)
                    .then((response) => {
                    
                        console.log(response.data)
                        
                    })
            }
        }
    }
}
</script>
