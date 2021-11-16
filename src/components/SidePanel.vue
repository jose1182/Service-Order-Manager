<template>
    <v-navigation-drawer
      app
      color="indigo darken-5"
      dark
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    
    > 
      <v-list-item class="py-1 px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ userDetails.name}}</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider ></v-divider>

    <v-list nav dense>
        <v-list-item-group color="grey lighten-4">
            <v-list-item v-for="(item, i) in userItems" :key="i" link  @click="menuItems(item.route)">
                <v-list-item-icon>
                    <v-icon text v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item> 
        </v-list-item-group>
        <v-list-item-group 
          color="grey lighten-4"
          v-if="$can($constants.permissions.viewAdminDashboard)"
          >
            <v-list-item v-for="(item, i) in adminItems" :key="i" link  @click="menuItems(item.route)">
                <v-list-item-icon>
                    <v-icon text v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item> 
        </v-list-item-group>      
    </v-list>
    </v-navigation-drawer>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  data: () => ({
        selectedItem: 0,
        drawer: true,
        userItems: [
          {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard'},
          {icon: 'mdi-forum', text: 'About', route: '/about'},
        ],
        adminItems: [
          {icon: 'mdi-account-multiple', text: 'User', route: '/users'},
          {icon: 'mdi-account-group', text: 'Costumers', route: '/costumers'},
          {icon: 'mdi-database', text: 'Contacts', route: '/contacts'},
          {icon: 'mdi-forum', text: 'Addresses', route: '/address'},
          {icon: 'mdi-form-select', text: 'Orders', route: '/orders'},
          {icon: 'mdi-database', text: 'Import excel', route: '/import'},
        ],
        mini: true,       
 }),
  computed:{
    ...mapGetters({
      userDetails: "user/userDetails",
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
      console.log(item);
        this.$router.push(item);
    }
  }
};
</script>
<style scoped>
div >>> .v-list a {
    text-decoration: none;
}
</style>