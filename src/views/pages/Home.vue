<template>
  <v-app class="deep-purple darken-1">
    <v-container>
      <v-toolbar fixed dark flat class="deep-purple darken-1" >
        <span class="hidden-sm-and-up">
          <v-toolbar-side-icon @click="sidebar = !sidebar">
          </v-toolbar-side-icon>
        </span>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            {{ appTitle }}
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-list-item v-for="(item, i) in menuItems" :key="i" link :to="item.path">
                <v-list-item-icon>
                    <v-icon text v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>           
        </v-toolbar-items>
        <v-btn
          color="error"
          elevation="2"
          large
          to="/register"
        >Sign Up</v-btn>
      </v-toolbar>
    </v-container>
    <v-container fluid mt-5>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <h1 class="text-center white--text font-weight-light">
            Help your team do a better job<br>
            with Services App
          </h1>
        </v-flex>
        <v-flex xs12 class="text-center" mt-5>
          <h2 class="white--text font-weight-light">This application is developed for Leoni's technical service team</h2>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 class="text-center" mt-5>
          <v-btn color="error" x-large to="/register">Sign Up</v-btn>
        </v-flex>
      </v-layout>
    </v-container>    

  </v-app>


</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  data(){
    return {
      appTitle: 'Services App',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/home', icon: 'mdi-home' },
          { title: 'Sign In', path: '/login', icon: 'mdi-login' }
     ]
    }
  },
};
</script>
<style scoped>

  h1{
    font-size: 3.75em;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }


</style>
