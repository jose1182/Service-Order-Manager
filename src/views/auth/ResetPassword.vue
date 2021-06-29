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
                    <v-form ref="resetPasswordForm" :value="formValid">
                    <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
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
                    <v-text-field
                        id="password_confirmation"
                        label="Password_confirmation"
                        name="password_confirmation"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="user.password_confirmation"
                    ></v-text-field>                
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="sendResetPassword" >Reset Password</v-btn>
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
    name: "ResetPassword",
    data(){
        return{
            formValid: false,
            user: {
                name:'',
                password:'',
                password_confirmation: ''
            },
            snackbar:{
                show: false,
                text: ''
            }
        }
    },
    methods:{
        ...mapActions({
            resetPassword: 'user/resetPassword'
        }),
        sendResetPassword(){
            if(this.$refs.resetPasswordForm.validate()){
                const token = this.$route.query.token;
                this.resetPassword({...this.user, token: token}).then(() => {
                    this.snackbar = {
                        text: "Password changed",
                        show: true
                    }
                    this.$router.push({name: 'login'});
                }).catch(() => {
                    this.snackbar = {
                        text: "Failed to change password!",
                        show: true
                    }
                });
            }
        }
    }
}
</script>
