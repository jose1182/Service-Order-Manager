<template>
  <div>
    <hello-world />
    <router-link :to="{name: 'dashboard'}">Dashboard</router-link>
  </div>

</template>

<script>
  import HelloWorld from '../../components/HelloWorld'

  export default {
    name: 'home',

    components: {
      HelloWorld,
    },
  }
</script>
