<template>
  <div class="h-screen grid grid-cols-1 sm:grid-cols-2">
    <div
      class="justify-self-center sm:justify-self-end self-end sm:self-center"
    >
      <img
        src="@/assets/images/pexels-coffee.webp?nf_resize=fit&w=500"
        class="h-48 sm:h-64 w-auto"
        width="64"
        height="48"
      />
      <!-- <img
        data-blink-uuid="45f9abd3-0ff8-4b0b-8b62-fa0342292a45"
        class="h-64"
      /> -->
      <p class="text-xs text-gray-600 font-mono">
        photo by Jason Villanueva from Pexels
      </p>
    </div>
    <div
      class="pt-4 px-8 justify-self-center sm:justify-self-start self-start sm:self-center"
    >
      <p class="text-5xl font-medium font-primary text-black">
        All done!! Time to relax
      </p>
      <p class="py-2 px-1 text-xl text-primary font-secondary">
        with a nice hot cup of coffee. Your response has been recorded.
      </p>
      <router-link to="/">
        <SolidButtonVue :text="'Go Back Home'" class="mt-4" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import SolidButtonVue from "@/components/particles/SolidButton.vue";
</script>
