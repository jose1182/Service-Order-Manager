<template>
<v-container fluid class="spacing-playground pa-6">
  <v-data-table
    :headers="headers"
    :items="services"
    sort-by="name"
    class="elevation-1 text-uppercase text"
  >
    <template v-slot:[`item.isIncidence`]="{ item }">
    <v-chip
        :color="item.isIncidence == 0? 'green lighten-1': 'red lighten-1'"
        class="ml-0 mr-2 black--text"
        label
        small
    >
        {{ item.isIncidence == 1? 'SI' : 'NO' }}

    </v-chip>
    </template>

    <template v-slot:[`item.invested_hours`]="{ item }">
    <v-chip
        :color="item.invested_hours > item.expected_hours? 'green lighten-1': 'red lighten-1'"
        class="ml-0 mr-2 black--text"
        label
        small
    >
        {{ item.invested_hours }}

    </v-chip>
    </template>
    <template v-slot:[`item.isFinished`]="{ item }">
    <v-chip
        :color="item.isFinished == 1? 'green lighten-1': 'red lighten-1'"
        class="ml-0 mr-2 black--text"
        label
        small
    >
        {{ item.isFinished == 1? 'SI' : 'NO' }}
    </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar
        dark
        color="indigo darken-5"
        flat
      >
        <v-toolbar-title>SERVICES</v-toolbar-title>
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
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getServices"
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
          text: 'Service',
          align: 'start',
          sortable: false,
          value: 'serviceId',
        },
        { text: 'Issue Date', value: 'issue_date' },
        { text: 'Costumer', value: 'costumer' },
        { text: 'Technician', value: 'technician' },
        { text: 'Responsible', value:'responsible'},
        { text: 'Service Date', value:'service_date'},
        { text: 'Start Time', value:'start_time'},
        { text: 'Incidence', value:'isIncidence'},
        { text: 'Finished', value:'isFinished'},
        { text: 'Hours', value:'expected_hours'},
        { text: 'T. Hours', value:'invested_hours'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }),

    computed: {
        ...mapGetters({
            services:'application/services',
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
      this.getServices()
    },

    methods: {
        ...mapActions({
            getServices:'application/getServices',
            removeNotification: 'application/removeNotification',
            addNotification: 'application/addNotification',
            createCustomer:'application/createCustomer',
            updateCustomer:'application/updateCustomer',
            deleteService:'application/deleteService'              
        }),
        editItem (item) {
          this.$router.push({ name: 'serviceDetail', params: { serviceId:  item.id}}) 
        },

        deleteItem (item) {
            this.editedIndex = this.services.indexOf(item)
            this.editedItem = Object.assign({}, item)  
            this.dialogDelete = true
        },

        deleteItemConfirm () {
          console.log(this.editedItem)
            this.deleteService(this.editedItem.id)
                .then(() => {
                    this.addNotification({
                        text: 'Service was deleted!',
                        show: true
                    })
                })
                .catch(() => {
                    this.addNotification({
                        text: 'Fail to delete serviced!',
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