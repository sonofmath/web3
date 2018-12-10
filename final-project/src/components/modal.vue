<template>
  <modal name="modal" @before-open="beforeOpen">
    <div>
      <h3>Update Message</h3>
      <p>{{ itemToShow }}</p>
      <input id="input" type="text" class="form-control" v-model="newmessage"/>
      <button type="button" class="btn btn-primary" @click="update, $emit('close')"><b>Update</b></button>
      <button class="btn btn-primary" @click="$emit('close')">Cancel</button>
    </div>
  </modal>
</template>

<script>
import { db } from '../firebaseApp'
let postsRef = db.ref('racks')

export default {
  name: 'HelloWorld',

  data: function () {
    return {
        item: ''
    }
  },

  computed: {
    itemToShow: function () {
      return this.item
    }
  },

  methods: {
    beforeOpen (event) {
      this.item = event.params.item;
    },
    close () {
      this.$emit('close')
    },
    update () {
      alert("Id: " + this.item + " - Message: " + this.newmessage)
      postsRef.child(this.item).update({ message : this.newmessage })
      this.newmessage = ''
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    background-color: black;
  }
</style>