<template>
  <div
    class="w-full rounded-xl overflow-hidden truncate p-2 cursor-pointer text-center bg-transparent text-primary hover:bg-primary hover:text-white hover:shadow"
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
