<template>
  <textarea
    ref="textele"
    v-model="inputValue"
    type="text"
    class="bg-transparent border-gray-500 focus:outline-none border-l-4 pl-4 w-full overflow-hidden resize-none"
    :placeholder="placeholder"
    rows="1"
    maxlength="1000"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "Type something...",
    },
  },
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
