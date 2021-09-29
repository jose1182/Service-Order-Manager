<template>
<v-app>
  <v-container
    class="spacing-playground pa-md-12 mx-lg-auto"
    > 
    <v-card
      color="lime lighten-5"
      :loading="isUpdating"
    >

    <v-toolbar
      flat
      color="light-green"
      dark
    >
      <v-icon>mdi-form-select</v-icon>
      <v-toolbar-title class="font-weight-light">
        Order Service
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="purple darken-3"
        fab
        small
        @click="isUpdating = !isUpdating"
      >
        <v-icon v-if="isUpdating">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-toolbar>

      <v-form>
        <v-container
          fluid
        >
          <h2 class="text-h6">
            Order
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-if="serviceDetails.order_details"
                v-model="serviceDetails.order_details.order_service"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Service order"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >

              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="serviceDetails.issue_date"
                    :disabled="isUpdating"
                    filled
                    label="Issue date"
                    prepend-icon="mdi-calendar"
                    color="blue-grey lighten-2"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="serviceDetails.issue_date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
          
            <v-select
              v-if="serviceDetails.project"
              v-model="serviceDetails.project.name"
              :items="projectList"
              item-text="name"
              item-value="value"
              label="Select Project"
              filled
              color="blue-grey lighten-2"
              >
            </v-select>
           
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-if="serviceDetails.order_details"
                v-model="serviceDetails.order_details.pev"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Pev"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-h6">
            Customer contact person
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                v-if="serviceDetails.costumer"
                v-model="serviceDetails.costumer.name"
                :items="costumerList"
                item-text="name"
                item-value="value"
                label="Costumer"
                filled
                color="blue-grey lighten-2"
                >
              </v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].name"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].phone"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Phone"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].email"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="E-mail"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-h6">
            End customer contact person
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Customer"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Phone"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="E-mail"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-h6">
            Address intallation
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="5"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Address"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="City"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Zip"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Province"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-h6">
            Address intallation
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Service date"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Start time"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="2"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Expected hours"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Responsible account"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="contact[0].costumer"
                :disabled="isUpdating"
                filled
                color="blue-grey lighten-2"
                label="Technical responsible"
              ></v-text-field>
            </v-col>
          </v-row>
          <h2 class="text-h6">
            Address intallation
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-model="contact[0].costumer"
                auto-grow
                filled
                color="blue-grey lighten-2"
                label="Description"
                rows="4"
                row-height="30"
                counter
              ></v-textarea>            
            </v-col>
          </v-row>
          <h2 class="text-h6">
            Service Incidents
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="9"
            >
            <h2 class="text-h6">
              Issues Service
            </h2>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-switch
                    v-model="contact[0].costumer"
                    label="Incidence"
                    color="success"
                    value="success"
                    hide-details
                  ></v-switch>      
                </v-col> 
                <v-col
                  cols="12"
                >
                  <v-textarea
                      v-model="contact[0].costumer"
                      auto-grow
                      filled
                      color="blue-grey lighten-2"
                      label="Description"
                      rows="4"
                      row-height="36"
                      counter
                        ></v-textarea>        
                </v-col>             
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
            <h2 class="text-h6">
              Service finished
            </h2>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-switch
                    v-model="contact[0].costumer"
                    label="Incidence"
                    color="success"
                    value="success"
                    hide-details
                  ></v-switch>      
                </v-col> 
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="contact[0].costumer"
                    :disabled="isUpdating"
                    filled
                    color="blue-grey lighten-2"
                    label="Invested hours"
                  ></v-text-field>     
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="contact[0].costumer"
                    :disabled="isUpdating"
                    filled
                    color="blue-grey lighten-2"
                    label="End date"
                  ></v-text-field>     
                </v-col>               
              </v-row>


            </v-col>
          </v-row>
          <v-divider class="my-2"></v-divider>
        </v-container>
      </v-form>

      <v-card-actions >
        <v-container>
          <h2 class="text-h6">
            Signature
          </h2>
          <v-divider class="my-2"></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-checkbox
                v-model="contact[0].name"
                label="Technician ST"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-checkbox
                v-model="contact[0].name"
                label="Cordinator ST"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-checkbox
                v-model="contact[0].name"
                label="Responsible account"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>

         
          <v-divider></v-divider>


      </v-card-actions>
      
    </v-card>
  </v-container>
</v-app>
</template>
<script>

  import {mapActions, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        autoUpdate: true,
        isUpdating: false,
        contact:[
          {
            costumer: 'SEAT',
            name: 'Jose Carlos',
            phone: '661287901',
            email: 'jose1196@hotmail.com'
          }


        ],
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        modal: false,
        menu2: false,

      }
    },
    
    props:['serviceId'],

    mounted(){
      this.getService(this.serviceId)   
      this.projects()
      this.costumers()
    },

    computed: {
      ...mapGetters({
        serviceDetails: 'application/serviceDetails',
        allNotifications: 'application/notifications',
        projectList: 'application/projectList',
        costumerList: 'application/customers'

      })
    },
    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      }
    },

    methods: {
      ...mapActions({
        getService:'application/getService',
        addNotification: 'application/addNotification',
        projects: 'application/getProjects',
        costumers: 'application/getCustomers'     
      }),

      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },

      beforeRouteUpdate(to, from, next){
          this.getService(to.params.serviceId);
          next();
      }     
      
    },
  }
</script>