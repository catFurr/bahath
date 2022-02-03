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
    <font-awesome-icon
      v-if="isError"
      class="text-red-700 self-end mb-2"
      :icon="['fas', 'exclamation']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["modelValue", "isError"],
  emits: ["update:modelValue"],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
.input {
  outline: none;
  font-family: "Courier New", Courier, monospace;
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
  font-family: "Courier New", Courier, monospace;
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
