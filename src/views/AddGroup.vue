<template>
    <v-container>
        <v-form>
            <v-col cols="12" md="5">
            <v-text-field label="Group Name" v-model.trim="group.name"></v-text-field>
            <v-combobox label="Parent Group" :items="parentGroups" item-text="name" v-model="group.parent_group"></v-combobox>
            <v-combobox label="Group Owner" :items="groupOwners" item-text="first_name" v-model="group.owner"></v-combobox>
            <v-btn color="success" class="mr-5" @click="createGroup">Create Group</v-btn>
            <v-btn color="error">Reset</v-btn>
            </v-col>
        </v-form>
    </v-container>
</template>



<script lang="ts">

import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class AddGroup extends Vue {

    parentGroups = []
    groupOwners = []
    group = {
        'name': '',
        'parent_group': '',
        'owner': ''
    }

    created(){
        this.$http.get('api/v1/groups')
        .then(response => {
            this.parentGroups = response.data
        }, error => {
            console.log(error)
        })
        this.$http.get('api/v1/youths')
        .then(response => {
            this.groupOwners = response.data
        }, error => {
            console.log(error)
        })
    }

    createGroup(){
        
        const formData = {
            'name': this.group.name,
            'parent_group': this.group.parent_group.id,
            'owner': this.group.owner.id
        }
        this.$http.post('api/v1/groups/', formData)
        .then(response => {
            console.log(response.data)
        }, error => {
            console.log(error)
        })
    }
}

</script>
