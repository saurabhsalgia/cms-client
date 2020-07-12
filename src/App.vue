<template>
  <v-app>
    <TheHeader/>
    <v-main class="amber lighten-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'
import TheNavbar from '@/components/TheNavbar.vue'

@Component({
  components: {
    TheHeader
  }
})
export default class App extends Vue {
}

</script>
