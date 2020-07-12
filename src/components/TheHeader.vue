<template>
    <nav>
        <v-toolbar>
            <v-toolbar-title>
                <v-tabs>
                    <v-tab :to="{name: 'Home'}">Home</v-tab>
                    <v-tab :to="{name: 'Add Youth'}">Add Youth</v-tab>
                    <v-tab :to="{name: 'Add Group'}">Add Group</v-tab>
                </v-tabs>
            </v-toolbar-title>
        </v-toolbar>
    </nav>
</template>




<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}

</script>