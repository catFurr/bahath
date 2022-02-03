<template>
  <div
    class="w-full rounded-xl border-2 border-primary bg-transparent p-1 overflow-hidden truncate cursor-pointer text-center text-primary hover:bg-primary hover:text-white"
  >
    <font-awesome-icon v-if="icon" :icon="['fas', `${icon}`]" />
    <p v-if="text" class="font-secondary inline">
      {{ text }}
    </p>
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
    icon: {
      type: String,
      required: false,
    },
  },
});
</script>
