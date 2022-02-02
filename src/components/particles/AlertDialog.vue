<template>
  <div
    v-if="text"
    class="text-red-700 bg-red-300 rounded-lg p-2 items-center flex"
  >
    <FontAwesomeIcon :icon="['fas', 'exclamation']" class="mx-2" />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>
