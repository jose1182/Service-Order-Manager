<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="order"
          :items-per-page="10"
          class="elevation-1"
          @click:row="handleClick"
        ></v-data-table>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Id Customer',
            align: 'start',
            sortable: false,
            value: 'costumer_id',
          },
          { text: 'Pev', value: 'pev' },
          { text: 'Product name', value: 'name_product' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Description', value: 'description' },
          { text: 'Order date', value: 'order_date' },
          { text: 'Shipment date', value: 'shipment_date' },
        ],
        order: []
      }
    },
    created(){
      this.orders().then(() => {
        this.order= this.ordersList[0].service_orders;
    });

    },
    computed:{
      ...mapGetters({
        ordersList: 'application/ordersList'
      }),
    },
    methods:{
      ...mapActions({
        orders: "application/orders",
        setOrder: "application/setOrder",
        addNotification: 'application/addNotification'
      }),
      handleClick(row){
        console.log(row);
          this.$router.push({ name: 'edit-order', params: { orderId: row.id}})
      },
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
    }
  }
</script>
