<template>

<v-main>
    <v-app-bar
      color="deep-purple accent-4"
      dark
      height="56px"
      border="bottom"
      rounded="0"
      elevation="0"
    >
    
      <v-spacer></v-spacer>
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="menuItems(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
      text
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title> John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          @click="menuItems(item.title)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>


</v-main>


</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  data: () => ({
        drawer: true,
        navItems: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
          { title: 'ImportDB', icon: 'mdi-database' },
        ],
        items:[
          {title: 'Logout'}
        ],
        mini: true,       
 }),
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
      console.log('logout pulse');
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
    menuItems(item){
      if(item == 'Logout'){
        this.logout();
      }

      if(item =='ImportDB'){
        this.$router.push('/import');
      }

    }
  }
};
</script>
