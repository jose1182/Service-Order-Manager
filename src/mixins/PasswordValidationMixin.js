export default {
    data(){
        return{
            requiredRules:[
                v => !!v || 'This field is required'
            ],            
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],   
            passwordRules:[
                v => !!v || 'Name is required',    
                v => (!!v && v.length > 6 ) || 'Password is to short'
            ]
         }
    }
    
}