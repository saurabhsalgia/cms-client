<template>
  <div>
    <Card></Card>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Card from '@/components/Card.vue'

@Component({
  components:{
    Card
  }
})
export default class Home extends Vue {
  
}

</script>