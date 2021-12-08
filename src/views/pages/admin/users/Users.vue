<template>
    <v-container fluid class="spacing-playground pa-6">
        <UsersEditTable/>
    </v-container>
</template>
<script>

import UsersEditTable from '../../tables/UsersEditTable.vue' 

export default {
    name: 'Users',
    components:{
        UsersEditTable
    },
}

</script>
