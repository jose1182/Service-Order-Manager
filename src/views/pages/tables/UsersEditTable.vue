<template>
<div>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="name"
    class="elevation-1 text-uppercase text"
  >

    <template v-slot:[`item.roles`]="{ item }">
    <v-chip
      v-for="roles in item.roles" :key="roles"
      :color="roles == 'user'? 'primary': 'cyan'"
      class="ml-0 mr-2 black--text"
      label
      small
    >

      {{ roles }}
     
    </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar
        dark
        color="indigo darken-5"
        flat
      >
        <v-toolbar-title>USERS</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          dark
          v-model="dialog"
          max-width="700px"
        >
          <v-card
            class="mx-auto"
          >
            <v-card-title class="indigo darken-5">
              <h3 class="text--white">{{ formTitle }}</h3>
            </v-card-title>
            <v-card-text
              class="pb-0">
                <v-row>
                  <v-container>
                    <v-flex class="my-4">
                      <h2>Roles: 
                        <v-chip
                          v-for="roles in editedItem.roles" :key="roles"
                          :color="roles == 'user'? 'primary': 'cyan'"
                          class="ml-0 mr-2 black--text"
                          label
                          small
                        >
                          {{ roles }}
                        </v-chip>                      
                      </h2>
                    </v-flex>
                    <v-flex class="my-4">
                      <h2>Permissions: 
                        <v-chip
                          v-for="permissions in editedItem.permissions" :key="permissions"
                          :color="permissions == 'view-technical-dashboard'? 'primary': 'cyan'"
                          class="ml-0 mr-2 black--text"
                          label
                          small
                        >
                          {{ permissions }}
                        </v-chip>                      
                      </h2>
                    </v-flex>
                  </v-container>
                </v-row>
            </v-card-text>
            <v-divider class="mx-2"></v-divider>
            <v-card-actions>
             
              <v-switch
                v-model="swicth"
                color="primary"
                label="Change permissions"
                @click="switchRoles(editedItem.id)"
              ></v-switch>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this User?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-flex>
        <v-btn
          small
          dark
          class="ma-2"
          fab
          color="indigo"
        >
          <v-icon
            small
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </v-btn>

        <v-btn
          small
          dark
          class="ma-2"
          fab
          color="red"
        >
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </v-flex>
    </template>
  </v-data-table>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      swicth: null,
      headers: [
        { text: 'Id', value: 'id' },
        {
          text: 'User',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Created', value: 'created_at' },
        { text: 'Permissions', value: 'permissions' },
        { text: 'Roles', value: 'roles' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      roles: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email:'',
        permissions: '',
        roles: '',
      },
      defaultItem: {
        name: '',
        email:'',
        permissions: '',
        roles: '',
      }
    }),

    computed: {
        ...mapGetters({
            allUsers: 'user/listUsers',
            allNotifications: 'application/notifications'
        }),

        formTitle () {
          return this.editedIndex === -1 ? 'Roles | Permissions' : 'Roles & Permissions'
        },
        users(){
          return this.objectToArrayUsers()
        }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      }
    },

    created () {
      this.getListUsers();
    },

    methods: {
      ...mapActions({
        addRoles: 'user/switchRoles',
        getListUsers: 'user/allUsers',
        removeNotification: 'application/removeNotification',
        addNotification: 'application/addNotification',
      }),

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        //update state of switch
        this.swicth = this.editedItem.roles.includes("admin")? true : false
        this.roles = this.editedItem.roles
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close (item) {
        console.log(item)
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.getListUsers();
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      switchRoles (userId) {
        
        this.swicth? this.roles.push('admin'): this.roles.splice(1,1) 
         
        this.addRoles({'id' : userId})
            .then(() => {
                this.addNotification({
                    show: true,
                    text: 'Role has changed'
                }).then(() => {
                    //this.$router.push({name: 'dashboard'});
                })
            })
            .catch(() => {
                this.addNotification({
                    text: 'Faild to chenge role!!',
                    show: true
                })
            });
      },

      objectToArrayUsers () {
        var nuevoArray = new Array();
          for (const key in this.allUsers) {
            if (Object.hasOwnProperty.call(this.allUsers, key)) {
              const element = {
                'id' : key,
                'name': this.allUsers[key].name,
                'email': this.allUsers[key].email,
                'created_at': this.allUsers[key].created_at,
                'permissions' : this.allUsers[key].permissions,
                'roles': this.allUsers[key].roles
              }
              nuevoArray.push(element)
            }
          }
          return nuevoArray;
      }
    },
  }
</script>