<template>
  <v-container>
        <v-form>
            <v-col cols="12" md="5">
                <v-text-field label="First Name" v-model="youth.first_name"></v-text-field>
                <v-text-field label="Middle Name" v-model="youth.middle_name"></v-text-field>
                <v-text-field label="Last Name" v-model="youth.last_name"></v-text-field>
                <v-text-field label="Phone Number" v-model="youth.phone_number"></v-text-field>
                <v-textarea label="Address" auto-grow row-height="5" v-model="youth.address"></v-textarea>

                <!-- date of birth -->
                <v-dialog
                  ref="dialog"
                  v-model="showModal"
                  :return-value.sync="youth.date_of_birth"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="youth.date_of_birth"
                      label="Date of Birth"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="youth.date_of_birth" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="showModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(youth.date_of_birth)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>

                <!-- date of join -->
                <v-dialog
                  ref="dialog"
                  v-model="showModal"
                  :return-value.sync="youth.date_of_join"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="youth.date_of_join"
                      label="Date of Join"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="youth.date_of_join" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="showModal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(youth.date_of_join)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>

                <!-- occupation -->
                <v-select label="Occupation" :items="occupations" item-text="value" v-model="youth.occupation"></v-select>

                <!-- Referred by -->
                <v-combobox label="Referred By" :items="allYouths" item-text="first_name" v-model="youth.referred_by"></v-combobox>

                <!-- Followed by -->
                <v-combobox label="Followed By" :items="allYouths" item-text="first_name" multiple chips deletable-chips hide-selected v-model="youth.followed_by"></v-combobox>

                <!-- select group -->
                <v-combobox label="Assign Group" :items="groups" item-text="name" v-model="youth.groups"></v-combobox>

                <!-- weekly forum status -->
                <v-select label="Weekly Forum Status" :items="weeklyForumStatus" item-text="value" v-model="youth.weekly_forum_status"></v-select>

                <!-- follow up status -->
                <v-select label="Follow Up Status" :items="followUpStatus" item-text="value" v-model="youth.follow_up_status" v-if="isDisabled"></v-select>

                <!-- is karyakarta -->
                <v-switch
                  label="Is karya karta"
                  color="indigo"
                  value="red"
                ></v-switch>

                <!-- create youth button -->
                <v-btn color="success" class="mr-5" @click="createYouth">Create Youth</v-btn>

                <!-- reset form button -->
                <v-btn color="error">Reset</v-btn>
            </v-col>
        </v-form>
    </v-container>
</template>



<script lang="ts">

import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'

@Component
export default class AddYouth extends Vue {
  weeklyForumStatus = []
  followUpStatus = []
  groups = []
  occupations = []
  allYouths = []
  showModal = false
  isDisabled = false
  youth = {
    'first_name': '',
    'middle_name': '',
    'last_name': '',
    'phone_number': '',
    'address': '',
    'date_of_birth':'',
    'date_of_join': '',
    'occupation': '',
    'referred_by': '',
    'groups': [],
    'weekly_forum_status': '',
    'follow_up_status': '',
    'followers': [],
    'is_karyakarta': false
  }

  @Watch('youth.weekly_forum_status')
  onnv(value: string){
    if (value != 'Regular'){
      this.isDisabled = true
    }else{
      this.isDisabled = false
    }
  }

  created(){

    this.$http.get('api/v1/youths')
    .then(response => {
      this.allYouths = response.data
    }, error => {
      console.log(error)
    })

    this.$http.get('api/v1/youths/choices/?choice=occupations')
    .then(response => {
      this.occupations = response.data
    }, error => {
      console.log(error)
    })

    this.$http.get('api/v1/youths/choices/?choice=follow_up_status')
    .then(response => {
      this.followUpStatus = response.data
    }, error => {
      console.log(error)
    })

    this.$http.get('api/v1/youths/choices/?choice=weekly_forum_status')
    .then(response => {
      this.weeklyForumStatus = response.data
    }, error => {
      console.log(error)
    })

    this.$http.get('api/v1/groups')
        .then(response => {
            this.groups = response.data
        }, error => {
            console.log(error)
        })
  }

  createYouth(){
        console.log(this.youth, '@@@')
        const formData = this.youth
        formData['referred_by'] = formData.referred_by.id
        formData['groups'] = formData.groups.map(group => group.id)
        formData['followers'] = formData.followers.map(follower => follower.id)
        formData['occupation'] = formData.occupation.code
        formData['weekly_forum_status'] = formData.weekly_forum_status.code
        formData['follow_up_status'] = formData.follow_up_status.code

        console.log(formData, '!!!!')
        // this.$http.post('api/v1/youths/', formData)
        // .then(response => {
        //     console.log(response.data)
        // }, error => {
        //     console.log(error)
        // })
    }
}

</script>
