<template>
    <v-container class="m-5">
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
