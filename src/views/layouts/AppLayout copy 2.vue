<template>
  <v-main>

    <v-toolbar mt5 flat>
      <v-toolbar-title>
        <span class="caption">Overview Dashboard></span><br>Tranding View
      </v-toolbar-title>
      
      <v-app-bar flat color="rgba(0,0,0,0)" class="ml-16">

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

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
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-toolbar>
    <v-spacer></v-spacer>


</v-main>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
     tab: null,
     text: 'center',
     fill: true,
      padding: 8,
      radius: 10,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,
      lineCap: 'round',
      type: 'trend',
      autoLineWidth: false,
      fills: false,
  })
}
</script>
