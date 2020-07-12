<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="group in groups" :key="group.id">
            <v-card class="text-center ma-8" @click="log">
                <v-card-text>
                    <div class="headline">
                        {{group.name}}
                    </div>
                    <h3>Youths: {{group.total_youths}}</h3>
                    <h3>Owner: {{group.owner}}</h3>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>

import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Card extends Vue {
    groups = []

    created() {
        this.$http.get('api/v1/groups')
        .then(response => {
            this.groups = response.data
        }, error => {
            console.log(error)
        })
    }

    log(){
        console.log('logged')
    }
}

</script>