<template>
    <v-main>
        <v-container fluid mt-5>
            <v-layout row wrap> 
                <v-flex xs12 class="text-center" mt-5>
                    <router-link to="/">
                        <v-img
                            src="../../assets/logoApp.png"
                            aspect-ratio="1"
                            class="grey lighten-2 text-center mx-auto"
                            max-height="200"
                            max-width="300"
                            align="center"
                        >
                        </v-img>
                    </router-link>

                </v-flex>
            </v-layout>

        </v-container>

        <router-view></router-view>
    </v-main>
</template>

<script>
export default {
    
}
</script>
<style scoped>

</style>