<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          fab
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Service</span>
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-select
                v-model="pevId"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Pev*"
                required
                ></v-select>

              </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    class="d-flex align-center"
                >              
                   
                        <v-icon
                            color="orange darken-2"
                        >
                            mdi-account-circle-outline
                        </v-icon>

                        <v-select
                        v-model="userId"
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        label="User*"
                        required
                        class="pl-2"
                        ></v-select>
                 
                </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createService"
          >
            Create Service
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>

  import { mapActions} from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      pevId: null,
      userId: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }),
    methods:{
        ...mapActions({
            newService : "application/createService"
        }),
        createService(){

            this.dialog =  false;

            const {pevId, userId} = this;

            this.newService({pevId, userId});
        }
     
    }


  }
</script>