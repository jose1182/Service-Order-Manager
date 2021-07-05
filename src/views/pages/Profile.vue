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
                <v-toolbar-title>Details</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <p><strong>Name: </strong>{{ userDetails.name }}</p>
                <p><strong>Email: </strong>{{ userDetails.email }}</p>
                <p><strong>Created_at: </strong>{{ userDetails.created_at }}</p>
            </v-card-text>
            </v-card>
        </v-col>
        </v-row>
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
                <v-toolbar-title>Change details</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-form ref="changeDetailsForm">
                <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="requiredRules"
                    v-model="userDetails.name"
                ></v-text-field>           
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="changeDetails">Save</v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
        </v-row>
         
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
                <v-toolbar-title>Change password</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-form ref="changePasswordForm">
                <v-text-field
                    label="Old password"
                    name="oldpasssword"
                    :rules="[...requiredRules, ...passwordRules]"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="user.oldPassword"
                ></v-text-field>

                <v-text-field
                    id="newPassword"
                    label="New password"
                    name="newPassword"
                    :rules="[...requiredRules, ...passwordRules, customValidator]"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="user.newPassword"
                ></v-text-field>
                <v-text-field
                    id="newPasswordConfirmation"
                    label="New password confirmation"
                    name="newPasswordConfirmation"
                    :rules="[...requiredRules, ...passwordRules, customValidator]"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="user.newPasswordConfirmation"
                ></v-text-field>                
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="changePassword">Change password</v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
        </v-row>       
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import PasswordValidationMixin from '../../mixins/PasswordValidationMixin'

export default {
    mixins:[PasswordValidationMixin],
    data(){
        return{
            user: {
                oldPassword : '',
                newPassword: '',
                newPasswordConfirmation: ''
            },
            // requiredRules:[
            //     v => !!v || 'This field is required'
            // ],            
            // passwordRules:[
            //     v => (!!v && v.length > 6 ) || 'Password is to short'
            // ]
        }
    },
    computed:{
        ...mapGetters({
            userDetails: "user/userDetails",
        }),
    },
    methods:{
        ...mapActions({
            updateDetails: "user/updateDetails",
            addNotification: 'application/addNotification',
            changeUserPassword: "user/changePassword"
        }),
        changeDetails(){

            if(!this.$refs.changeDetailsForm.validate()){
                return false;
            }

            this.updateDetails(this.userDetails)
                .then(() => {
                    this.addNotification({
                        text: 'Details Change!',
                        show: true
                    })
                })
                .catch(() => {
                    this.addNotification({
                        text: 'Faild to change details!',
                        show: true
                    })
                });
        },
        changePassword(){
            if(!this.$refs.changePasswordForm.validate()){
                return false;
            }
            
            this.changeUserPassword(Object.assign({}, this.user, {newPassword_confirmation: this.user.newPasswordConfirmation}) )
                .then(() => {
                    this.addNotification({
                        text: 'Password Changed!',
                        show: true
                    })
                })
                .catch(() => {
                    this.addNotification({
                        text: 'Faild to change password!',
                        show: true
                    })
                });
        },
        customValidator(){
            return (this.user.newPasswordConfirmation === this.user.newPassword) || 'New password is not confimed'
        }
    }
}
</script>
