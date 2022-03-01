<template>
  <!-- single correct multiple choice -->
  <!-- responses can be integer 0 to n, i.e. the index of the chosen option -->
  <div class="flex flex-col">
    <div
      v-for="(option, optIndex) in options"
      :key="optIndex"
      class="flex flex-row hover:bg-blue-100 rounded-lg p-2"
      :class="!inEditMode ? 'cursor-pointer' : ''"
      @click="inEditMode ? (inputVal = optIndex) : ''"
    >
      <font-awesome-icon
        :icon="optIndex === inputVal ? ['fas', 'circle'] : ['far', 'circle']"
        class="mr-2 mt-2"
      />

      <div v-if="inEditMode" class="flex">
        <TextInputForEditor v-model="options[optIndex]" />
        <p
          v-if="options.length > 1"
          class="font-bold text-lg font-mono cursor-pointer"
          @click="delOpt(optIndex)"
        >
          x
        </p>
        <p
          class="font-bold text-lg font-mono cursor-pointer"
          @click="addOpt(optIndex)"
        >
          +
        </p>
      </div>
      <div v-else class="w-full">
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
import { defineComponent, toRef } from "vue";
import TextInputForEditor from "@/components/particles/TextInputForEditor.vue";

export default defineComponent({
  props: {
    node: {
      type: Object,
      required: true,
    },
    inEditMode: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["update:value"],
  computed: {
    inputVal: {
      get() {
        return this.node.answer ? Number(this.node.answer) : null;
      },
      set(value: number) {
        this.$emit(
          "update:value",
          value !== null ? String(value) || "0" : null
        );
      },
    },
  },
  setup(props) {
    const node = toRef(props, "node");

    const delOpt = (pos: number) => {
      node.value.options.splice(pos, 1);
    };
    const addOpt = (pos: number) => {
      node.value.options.splice(pos + 1, 0, "");
    };

    return {
      options: node.value.options,
      delOpt,
      addOpt,
    };
  },
  components: { TextInputForEditor },
});
</script>
