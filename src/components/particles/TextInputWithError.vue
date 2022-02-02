<template>
  <div>
    <input
      v-model="inputValue"
      type="text"
      class="w-40 bg-transparent inline"
      :class="isError ? 'input-error' : 'input'"
      spellcheck="false"
      autofocus
      aria-label="Form Code"
      name="formcode"
    />
    <FontAwesomeIcon
      v-if="isError"
      class="text-red-700 self-end mb-2"
      :icon="['fas', 'exclamation']"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: String(),
    isError: Boolean(false),
  },
  emits: ['input'],
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped>
.input {
  outline: none;
  font-family: 'Courier New', Courier, monospace;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #72767e;
  color: #72767e;
  padding-top: 20px;
}
.input:focus {
  color: #30445a;
  border-bottom-color: #30445a;
  border-bottom-width: 3px;
}
.input-error {
  outline: none;
  font-family: 'Courier New', Courier, monospace;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #cf0045;
  color: #dd0030;
  padding-top: 20px;
}
.input-error:focus {
  color: #dd0030;
  border-bottom-color: #cf0045;
  border-bottom-width: 3px;
}
</style>
