<template>

<v-main>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-btn small @click="logout" v-if="loggedIn">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>


</v-main>


</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  computed:{
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications'
    }),
/*     loggedIn(){
      return this.$store.getters['user/loggedIn'];
    } */
  },
  methods:{
    ...mapActions({
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification'
    }),
    logout(){
        this.logoutUser()
        .then(() => {
          return this.addNotification({
            text: 'Logged out!',
            show: true
          })
          .then(() => {
            this.$router.push({name: 'login'});
          })

        })

    },
  }
};
</script>
,