<template>
<v-container class="m-5">
  <v-data-table
    :headers="headers"
    :items="customers"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        dark
        color="indigo darken-5"
        flat
      >
        <v-toolbar-title>USERS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.code"
                      label="Code customer"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.location"
                      label="Location"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getCustomers"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</v-container>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Code',
          align: 'start',
          sortable: false,
          value: 'code',
        },
        { text: 'Name', value: 'name' },
        { text: 'Location', value: 'location' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        code: '',
        name: '',
        location: '',
        phone: '',
      },
      defaultItem: {
        code: '',
        name: '',
        location: '',
        phone: '',      },
    }),

    computed: {
        ...mapGetters({
            customers:'application/customers',
            allNotifications: 'application/notifications'
        }),  
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getCustomers()
    },

    methods: {
        ...mapActions({
            getCustomers:'application/getCustomers',
            removeNotification: 'application/removeNotification',
            addNotification: 'application/addNotification',
            createCustomer:'application/createCustomer',
            updateCustomer:'application/updateCustomer',
            deleteCustomer:'application/deleteCustomer'              
        }),
        editItem (item) {
            this.editedIndex = this.customers.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.customers.indexOf(item)
            this.editedItem = Object.assign({}, item)  
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.deleteCustomer(this.editedItem.id)
                .then(() => {
                    this.addNotification({
                        text: 'Customer was deleted!',
                        show: true
                    })
                })
                .catch(() => {
                    this.addNotification({
                        text: 'Faild to delete customer!',
                        show: true
                    })
                });    
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            
            this.updateCustomer(Object.assign(this.customers[this.editedIndex], this.editedItem))
                .then(() => {
                    this.addNotification({
                        text: 'Customer Updated!',
                        show: true
                    })
                })
                .catch(() => {
                    this.addNotification({
                        text: 'Faild to update customer!',
                        show: true
                    })
                });            

            } else {
              this.createCustomer(this.editedItem)
                  .then(() => {
                      this.addNotification({
                          text: 'Customer created!',
                          show: true
                      })
                  })
                  .catch(() => {
                      this.addNotification({
                          text: 'Faild to create customer!',
                          show: true
                      })
                  });   
              }
            this.close()
        },
    },
  }
</script>