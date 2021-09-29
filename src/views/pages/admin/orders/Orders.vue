<template>
  <v-container
    fluid 
    class="spacing-playground pa-6">
    <v-form
      ref="fileFormOrders"
      v-model="valid"
      lazy-validation
    >
    <div>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" sm="4">
          <v-file-input
              accept=".xls"
              show-size
              label="Select your file"
              v-model="orderFile"
          ></v-file-input>
        </v-col>

        <v-col cols="12" sm="2" class="pl-3">
          <v-btn
          color="success"
          class="mr-4"
          @click="uploadFileOrders"
          >
            Import Order Services
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>    
    </div>
    
    </v-form>
    <v-divider class="mt-4"></v-divider>

  <v-data-table
    :headers="headers"
    :items="ordersList.service_orders"
    sort-by="name"
    class="elevation-1"
  >
  <template v-slot:[`item.order_service`]="{ item }">
  <v-chip
    :color="getColor(item.order_service)"
    dark
    @click="routerGoService(item)"
  >
    {{ item.order_service }}

  </v-chip>
</template>
    <template v-slot:top>
      <v-toolbar
        dark
        color="indigo darken-5"
        flat
      >
        <v-toolbar-title>ORDERS</v-toolbar-title>
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
                    sm="4"
                    md="3"
                  >
                    <v-text-field
                      v-model="editedItem.costumer_code"
                      label="Code"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    md="9"
                  >
                    <v-text-field
                      v-model="editedItem.costumer_name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    md="2"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      label="Quantity"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                    md="4"
                  >
                  <v-select
                    v-model="selected"
                    :items="projectList"
                    item-text="name"
                    item-value="value"
                    label="Project"
                    @change="onChangeFrom"
                          return-object
                    >
                  </v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.pev"
                      label="Pev"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.shipment_date"
                      label="Shipment date"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.order_date"
                      label="Order date"
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
                @click="create"
              >
                Create
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
      valid: true,
      file: null,
      orderFile: null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Code', value: 'costumer_code' },
        { text: 'Name', value: 'costumer_name' },
        { text: 'Pev', value: 'pev' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Description', value: 'description' },
        { text: 'Order date', value: 'order_date' },
        { text: 'Shipment date', value: 'shipment_date' },
        { text: 'Order Service', value: 'order_service' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        order_service: '',
        costumer_code: '',
        costumer_name: '',
        pev: '',
        quantity: '',
        description:'',
        order_date:'',
        shipment_date:'',
        project_id:''
      },
      defaultItem: {
        id: '',
        order_service: '',
        costumer_code: '',
        costumer_name: '',
        pev: '',
        quantity: '',
        description:'',
        order_date:'',
        shipment_date:'',
        project:''    
        },
        selected: null,
    }),

    computed: {
        ...mapGetters({
            ordersList: 'application/ordersList',
            allNotifications: 'application/notifications',
            projectList: 'application/projectList'
        }), 
 
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Create Service'
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
      this.orders()
      this.projects()
    },

    methods: {
        ...mapActions({
            orders: "application/orders",
            setOrder: "application/setOrder",
            addNotification: 'application/addNotification',
            addService: 'application/addService',
            createService: 'application/createService',
            importOrders : 'application/importOrders',   
            getService:'application/getService',
            projects: 'application/getProjects'     
            }),

        editItem (item) {
            this.editedIndex = this.ordersList.service_orders.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.ordersList.service_orders.indexOf(item)
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

        create () {
            if (this.editedIndex > -1) {
          
            this.createService(Object.assign(this.ordersList.service_orders[this.editedIndex], this.editedItem))
                .then(() => {
                    this.addNotification({
                        text: 'Service was created successfully!',
                        show: true
                    })
                    this.orders()
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

        uploadFileOrders(){
            if(this.$refs.fileFormOrders.validate()){
                const formData = new FormData();
                formData.append('file', this.orderFile, this.orderFile.name);
                    this.importOrders(formData)
                    .then(() => {
                        this.addNotification({
                            show: true,
                            text: 'Succefully import'
                        }).then(() => {
                            //this.$router.push({name: 'dashboard'});
                        })
                    })
                    .catch(() => {
                        this.addNotification({
                            text: 'Faild import!!',
                            show: true
                        })
                    });

            }
        },
      getColor (order_service) {
        if (order_service == 'not created') return 'red'
        else return 'green'
      },
      routerGoService(item){
        this.getService(item.service_id).then(() => {
          this.$router.push({ name: 'service', params: { serviceId:  item.service_id}}) 
        })

      },

      onChangeFrom(){
        this.editedItem.project_id = this.selected.id
      }

    },
  }
</script>