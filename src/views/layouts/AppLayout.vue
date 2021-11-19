<template>
  <v-main>
    <SidePanel/>
    <v-app-bar
      app 
      mt5 
      flat
      fixed
      >
      
      <v-toolbar-title>
        <span class="caption">Overview Dashboard></span><br>Tranding View
      </v-toolbar-title>
      <v-app-bar flat color="rgba(0,0,0,0)" class="ml-16">

        <v-spacer></v-spacer>
        
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <DialogService/>

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
            <v-badge bordered bottom color="green" dot offset-x="10" offset-y="10">
              <v-avatar size="40">
                <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
              </v-avatar>
            </v-badge>   
            </v-btn>
          </template>

          <v-list>
            <v-list-item     
              v-for="(item, index) in menuItems"
              :key="index"
              @click="item.action && item.action()">
                <v-list-item-icon>
                    <v-icon text v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item> 
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-app-bar>
    <v-divider></v-divider> 

    
    <router-view/>


  </v-main>
  
</template>

<script>

import { bus } from '../../main'
import SidePanel from '../../components/SidePanel.vue'
import DialogService from '../../components/dialog/DialogService.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  components: {
    SidePanel,
    DialogService
  },
  data: (e) => ({
     tab: null,
     text: 'center',
     fill: true,
      padding: 8,
      radius: 10,
      width: 2,
      lineCap: 'round',
      type: 'trend',
      autoLineWidth: false,
      fills: false,
      menuItems: [
      {
        icon: 'mdi-logout',
        text: "Logout",
        action: () => e.logout() // invoke logout method here
      }
    ]

  }),

  computed:{
    ...mapGetters({
      allNotifications: 'application/notifications'
    }),
  },

  methods:{
    ...mapActions({
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification'
    }),
    openDialogService(){
      console.log('testing dialog');
      bus.$emit('dialog', true);
    },
    logout(){
      console.log('logout pulse');
        this.logoutUser()
        .then(() => {
          return this.addNotification({
            text: 'Logged out!',
            show: true
          })
          .then(() => {
            this.$router.push({name: 'home'});
          })

        })

    },
  }
}
</script>
