<template>
  <v-container fluid>

    <v-form
      ref="fileFormOrders"
      v-model="valid"
      lazy-validation
    >
    <div>
      <v-row no-gutters justify="center" align="center">
        <v-col cols="12" md="8">
          <v-file-input
              accept=".xls"
              show-size
              label="Select your file"
              v-model="orderFile"
          ></v-file-input>
        </v-col>

        <v-col cols="12" md="4" class="pl-2">
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

    <v-layout wrap>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="ordersList.service_orders"
          :items-per-page="10"
          class="elevation-1"
          @click:row="handleClick"
        >
        <template v-slot:[`item.state`]="{ item }">
          <v-btn
            depressed
            color="primary"
            @click="editItem(item)"
          >
            Primary
          </v-btn>
        </template>        
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        valid: true,
        file: null,
        orderFile: null,
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
          { text: 'State', value: 'state' },
        ],
        order: []
      }
    },
    created(){
      this.orders()
    },
    computed:{
      ...mapGetters({
        ordersList: 'application/ordersList'
      }),
        ord(){
          return this.objectToArrayUsers()
        }
    },
    methods:{
      ...mapActions({
        orders: "application/orders",
        setOrder: "application/setOrder",
        addNotification: 'application/addNotification',
        addService: 'application/addService',
        importOrders : 'application/importOrders',
      }),
      handleClick(row){
        console.log(row);
        this.addService({orderId: row.id})
          .then(() => {
            this.$router.push({ name: 'edit-order', params: { orderId: row.id}})
          })
          .catch(() => {

          })
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
      objectToArrayUsers () {
        var nuevoArray = new Array();
          for (const key in this.ordersList.service_orders) {
            console.log('i:' ,key)
            if (Object.hasOwnProperty.call(this.ordersList, key)) {
              const element = {
                'id' : key,
                'costumer_code': this.ordersList[key].costumer_code,
                'costumer_name': this.ordersList[key].costumer_name,
                'pev': this.ordersList[key].pev,
                'quantity': this.ordersList[key].quantity,
              }
              nuevoArray.push(element)
            }
          }
          return nuevoArray;
      }



      // handleClick(row){
      //   console.log(row.id);
      //   this.setOrder({orderId:row.id})
      //       .then(() => {
      //           this.addNotification({
      //               show: true,
      //               text: 'Service Order asigned'
      //           }).then(() => {
      //               //this.$router.push({name: 'dashboard'});
      //           })
      //       })
      //       .catch(() => {
      //           this.addNotification({
      //               text: 'Faild to asign service!!',
      //               show: true
      //           })
      //       });
      // }
    },
        //when a component is reused. */
    beforeRouteUpdate(to, from, next){
      this.orders().then(() => {
        this.order = this.ordersList[0].service_orders;
      });
        next();
    },
  }
</script>
