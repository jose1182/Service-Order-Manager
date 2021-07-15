<template>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      color="#F4F5F9"
    >
    <v-list-item class="px-2 py-5">
        <v-list-item-title class="text-capitalize" align="center">
            <v-icon x-large>fab fa-bitcoin</v-icon> Service Order
        </v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
    </v-list-item>

    <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="deep-purple">
            <v-list-item v-for="(item, i) in items" :key="i" link  @click="menuItems(item.route)">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
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
        items: [
            {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard'},
            {icon: 'mdi-forum', text: 'About', route: '/about'},
            {icon: 'mdi-database', text: 'Import excel', route: '/import'},
            {icon: 'mdi-forum', text: 'Service orders ', route: '/order-tables'},
            {icon: 'fas fa-cog', text: 'Tools', route: '/tools'},
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