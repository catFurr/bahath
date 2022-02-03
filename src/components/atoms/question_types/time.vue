<template>
  <!-- time -->
  <div class="">
    <input v-model="inputVal" class="" type="time" :disabled="getEditMode" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(),
  },
  computed: {
    ...mapGetters(['getEditMode', 'getQuestionResponse']),
    inputVal: {
      get() {
        return this.getQuestionResponse(this.index)
      },
      set(value) {
        this.SET_RESPONSE({
          qnIndex: this.index,
          newVal: String(value),
        })
      },
    },
  },
  methods: {
    ...mapMutations(['SET_RESPONSE']),
  },
}
</script>
