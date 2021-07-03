<template>
  <v-app>
    <router-view/>
    <v-snackbar
    :key="index"
    @input="updateNotification($event, index)"
    v-for="(snackbar, index) in allNotifications"
    v-model="snackbar.show"
    >
    {{ snackbar.text }}

    <template v-slot:action="{ attrs }">
        <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="removeNotification(index)"
        >
        Close
        </v-btn>
    </template>
    </v-snackbar>
  </v-app>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({

  }),
  created(){
    this.checkUserState().then(() => {
      if(this.isLoggedIn){
        this.me().then(() => {
          console.log(this.$can('view-technical-dashboard'))
        });
      }
    });
  },
  computed:{
    ...mapGetters({
      isLoggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications'
    }),
/*     loggedIn(){
      return this.$store.getters['user/loggedIn'];
    } */
  },
  methods:{
    ...mapActions({
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'application/removeNotification',
      addNotification: 'application/addNotification',
      me:'user/me'
    }),

    updateNotification(show, index){
      if(!show){
        this.removeNotification(index);
      }
    }
  }
};
</script>
,