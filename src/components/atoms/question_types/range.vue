<template>
  <!-- linear scale -->
  <div class="">
    <div class="">
      <FontAwesomeIcon
        v-for="v in 10"
        :key="v"
        :icon="[isDark(v), 'star']"
        @click="inputVal = v"
        @mouseover="tempval = v"
        @mouseleave="tempval = 0"
      />
    </div>

    <div
      v-if="inputVal"
      class="font-normal text-lg text-teal-800 mt-5 cursor-pointer"
      @click="inputVal = 0"
    >
      Clear Selection
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(),
  },
  data() {
    return {
      tempval: 0,
    }
  },
  computed: {
    ...mapGetters(['getQuestion', 'getQuestionResponse']),
    inputVal: {
      get() {
        return Number(this.getQuestionResponse(this.index))
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
    isDark(index) {
      if (this.inputVal > 0) {
        if (index <= this.inputVal) return 'fas'
        else return 'far'
      }
      if (index <= this.tempval) return 'fas'
      else return 'far'
    },
  },
}
</script>
