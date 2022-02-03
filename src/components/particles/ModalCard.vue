<template>
  <div>
    <div @click="isOpen = true">
      <slot name="button"></slot>
    </div>
    <!-- <teleport v-if="isOpen" to="body"> -->
    <div
      v-if="isOpen"
      class="fixed inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
      @click.self="close()"
    >
      <div class="relative bg-white shadow-lg rounded-xl p-8 m-8">
        <button
          aria-label="close modal"
          class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4 hover:text-gray-700"
          @click.prevent="close()"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <slot :close="close">
          <p>Something is supposed to be here.</p>
        </slot>
      </div>
    </div>
    <!-- </teleport> -->
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    closed: null,
  },
  data() {
    return {
      isOpen: this.open,
    };
  },
  methods: {
    close(content = null) {
      this.isOpen = false;
      this.$emit("closed", content);
    },
  },
};
</script>
