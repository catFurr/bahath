<template>
  <!-- single correct multiple choice -->
  <!-- responses can be integer 0 to n, i.e. the index of the chosen option -->
  <div class="flex flex-col">
    <div
      v-for="(option, optIndex) in node.options"
      :key="optIndex"
      class="cursor-pointer flex flex-row hover:bg-blue-100 rounded-lg p-2"
      @click="inputVal = optIndex"
    >
      <font-awesome-icon
        :icon="optIndex === inputVal ? ['fas', 'circle'] : ['far', 'circle']"
        class="mr-2 mt-2"
      />
      <div class="w-full">
        {{ option }}
        <!-- <div
          v-if="option.title"
          class="prose"
          v-html="$md.render(parseText(option.title))"
        /> -->
      </div>
      <!-- <img
        v-if="option.foto"
        :src="option.foto"
        class="h-48 pl-10 rounded-md"
      /> -->
    </div>

    <div
      v-if="inputVal !== null"
      class="font-normal text-lg text-teal-800 mt-5 cursor-pointer"
      @click="inputVal = null"
    >
      Clear Selection
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    node: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    inputVal: {
      get() {
        return this.modelValue ? Number(this.modelValue) : null;
      },
      set(value: number) {
        this.$emit(
          "update:modelValue",
          value !== null ? String(value) || "0" : null
        );
      },
    },
  },
});
</script>
