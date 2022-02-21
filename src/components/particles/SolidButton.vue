<template>
  <div
    class="w-full rounded-xl overflow-hidden truncate p-2 text-center hover:shadow hover:bg-primary"
    :class="
      isSelected
        ? 'bg-primary text-primary-light'
        : 'bg-primary-light text-primary cursor-pointer hover:text-white'
    "
  >
    <font-awesome-icon
      v-if="icon"
      :icon="[`${iconType}`, `${icon}`]"
      :class="`${iconMeta}`"
    />
    <p v-if="text" class="font-secondary inline">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    iconType: {
      type: String,
      default: "fas",
    },
    iconMeta: {
      type: String,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
});
</script>
