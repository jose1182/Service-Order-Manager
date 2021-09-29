<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title   
                        class="d-flex justify-center mb-6"
                    >
                    Service order
                    </v-card-title>
                    
                    <v-form ref="serviceLoginForm" v-model="valid">
                        <v-container>
                            <v-toolbar-title>Order</v-toolbar-title>
                            <v-row>
                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.serviceOrder"
                                        :rules="rules"
                                        label="Service order"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.dateEmission"
                                        :rules="rules"
                                        label="Date of emission"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.project"
                                        :rules="rules"
                                        label="Project"
                                        required
                                    ></v-text-field>
                                    </v-col>
                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.pev"
                                        :rules="rules"
                                        label="Pev"
                                        required
                                    ></v-text-field>
                                    </v-col>
                            </v-row>
                            <v-toolbar-title class="pt-md-10">Customer contact person</v-toolbar-title>
                            <v-row>
                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.customer"
                                        :rules="rules"
                                        label="Customer"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.cpName"
                                        :rules="rules"
                                        label="Name"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.cpPhone"
                                        :rules="rules"
                                        label="Phone"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.cpEmail"
                                        :rules="rules"
                                        label="E-mail"
                                        required
                                    ></v-text-field>
                                    </v-col>
                            </v-row>
                            <v-toolbar-title class="pt-md-10">Final customer contact person</v-toolbar-title>
                            <v-row>
                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="servicedetails.fcpCustomer"
                                        :rules="rules"
                                        label="Customer"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.fcpName"
                                        :rules="rules"
                                        label="Name"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.fcpPhone"
                                        :rules="rules"
                                        label="Phone"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.fcpEmail"
                                        :rules="rules"
                                        label="E-mail"
                                        required
                                    ></v-text-field>
                                    </v-col>
                            </v-row>
                            <v-toolbar-title class="pt-md-10">Adress installation</v-toolbar-title>
                            <v-row>
                                    <v-col
                                    cols="12"
                                    md="6"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.aiStreet"
                                        :rules="rules"
                                        label="Street"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.aiTonw"
                                        :rules="rules"
                                        label="Tonw"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.aiZip"
                                        :rules="rules"
                                        label="Zp"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.aiProvince"
                                        :rules="rules"
                                        label="Province"
                                        required
                                    ></v-text-field>
                                    </v-col>
                            </v-row>
                            <v-toolbar-title class="pt-md-10">Service</v-toolbar-title>
                            <v-row outlined>
                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.serviceDate"
                                        :rules="rules"
                                        label="service date"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.startDate"
                                        :rules="rules"
                                        label="Start time"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="2"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.expectedHours"
                                        :rules="rules"
                                        label="Excpected hours"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.responsibleAccount"
                                        :rules="rules"
                                        label="Responsible account"
                                        required
                                    ></v-text-field>
                                    </v-col>

                                    <v-col
                                    cols="12"
                                    md="3"
                                    >
                                    <v-text-field
                                        v-model="serviceDetails.responsibleService"
                                        :rules="rules"
                                        label="Responsible service"
                                        required
                                    ></v-text-field>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        md="12"
                                    >
                                        <v-textarea
                                        v-model="serviceDetails.serviceDescription"
                                        outlined
                                        name="input-7-4"
                                        label="Outlined textarea"
                                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                                        ></v-textarea>
                                    </v-col>
                            </v-row>
                     </v-container>
                        </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'EditServiceOrder',
    props:['orderId'],
    data: () => ({
      valid: false,
      rules: [
        v => !!v || 'This field is requiered',
      ],
      email: ''
    }),
    computed:{
        ...mapGetters({
            serviceDetails: "application/serviceDetails"
        })
    },
  }
</script>