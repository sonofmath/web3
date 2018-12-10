<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
