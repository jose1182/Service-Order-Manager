<template>
    <v-navigation-drawer
      app
      color="indigo darken-5"
      dark
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    
    >

      <v-list-item class="py-1">
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

      <v-divider></v-divider>

    <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="grey lighten-4">
            <v-list-item v-for="(item, i) in items" :key="i" link  @click="menuItems(item.route)">
                <v-list-item-icon>
                    <v-icon text v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item> 
        </v-list-item-group>
        <v-divider></v-divider>
      <v-list-group
          color="grey lighten-4"
          :value="true"
          prepend-icon="mdi-account-circle"
          v-if="$can($constants.permissions.viewAdminDashboard)"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-group
            :value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon], i) in admins"
              :key="i"
              link
              @click="$router.push({name: title.toLowerCase()})"
            >
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon], i) in cruds"
              :key="i"
              link
            >
              <v-list-item-title v-text="title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>

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
          {icon: 'mdi-account-group', text: 'Customers ', route: '/customer'},
          {icon: 'fas fa-cog', text: 'Tools', route: '/tools'},
        ],
        admins: [
          ['Users', 'mdi-account-multiple-outline'],
          ['Customers', 'mdi-account-group'],
          ['Contacts', 'mdi-account-group'],
          ['Adresses', 'mdi-account-group'],
          ['Orders', 'mdi-account-group'],  
        ],
        cruds: [
          ['Create', 'mdi-plus-outline'],
          ['Read', 'mdi-file-outline'],
          ['Update', 'mdi-update'],
          ['Delete', 'mdi-delete'],
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