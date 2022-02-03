<template>
  <!-- multiple correct multiple choice grid -->
  <div class="p-10">
    <table>
      <tr>
        <td
          v-for="i in collen + 1"
          :key="i"
          class="text-lg font-normal tracking-normal"
        >
          {{ qn.vals.cols[i - 2] }}
        </td>
      </tr>

      <tr v-for="i in rowlen" :key="i" class="py-3 items-center">
        <td>
          <h1 class="text-lg font-normal tracking-normal mr-3">
            {{ qn.vals.rows[i - 1] }}
          </h1>
        </td>

        <td v-for="j in collen" :key="j" class="mr-2">
          <font-awesome-icon :icon="['fas', 'square']" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['qn', 'res'],
  emits: ['act'],
  data() {
    return {
      response: this.res,
    }
  },
  computed: {
    rowlen() {
      return this.qn.vals.rows.length
    },
    collen() {
      return this.qn.vals.cols.length
    },
  },
  watch: {
    response(val) {
      this.$emit('act', val)
    },
  },
}
</script>
