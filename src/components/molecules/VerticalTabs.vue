<template>
  <div>
    <div
      v-for="([heading, subs], mainIndex) in Object.entries(dataTree)"
      :key="heading"
    >
      <div :class="stylesActiveTab(mainIndex)" class="font-bold p-2">
        {{ heading }}
      </div>
      <div
        v-for="(subheading, subIndex) in subs"
        :key="subheading"
        @click="$emit('goto-section', [mainIndex, subIndex])"
      >
        <p :class="stylesActiveSubTab(mainIndex, subIndex)" class="p-2 pl-8">
          {{ subheading }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// data-tree
// {
//     'Heading': ['list', 'of', 'subheadings'],
//     'Next': [],
// }

import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    dataTree: {
      type: Object,
      required: true,
    },
    currSection: {
      type: Array,
      required: true,
    },
  },
  emits: ["goto-section"],
  setup(props) {
    const { currSection } = toRefs(props);

    const stylesActiveSubTab = (mainIndex: number, subIndex: number) => {
      if (
        currSection.value[0] === mainIndex &&
        currSection.value[1] === subIndex
      )
        return "bg-blue-200 text-primary font-bold";
      return "bg-white text-black";
    };
    const stylesActiveTab = (mainIndex: number) => {
      if (currSection.value[0] === mainIndex)
        return "bg-blue-200 border-l-4 border-blue-500";
      return "bg-white";
    };

    return {
      stylesActiveSubTab,
      stylesActiveTab,
    };
  },
});
</script>
