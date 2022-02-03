<template>
  <div class="flex h-screen">
    <div
      v-if="statusCode === '500'"
      class="h-screen grid grid-cols-1 sm:grid-cols-2"
    >
      <div
        class="justify-self-center sm:justify-self-end self-end sm:self-center"
      >
        <img
          src="@/assets/images/pexels-sorry.jpg?nf_resize=fit&w=500"
          class="h-48 sm:h-64 w-auto"
          width="64"
          height="48"
        />
        <!-- <img
          data-blink-uuid="6db5a605-8572-4db6-bfb1-81eff03845c3"
          class="h-64"
        /> -->
        <p class="text-xs text-gray-600 font-mono">
          photo by alleksana from Pexels
        </p>
      </div>
      <div
        class="pt-4 px-8 justify-self-center sm:justify-self-start self-start sm:self-center"
      >
        <p class="text-5xl font-medium font-primary text-black">
          It's not you, its us
        </p>
        <p class="py-2 px-1 text-xl text-primary font-secondary">
          feel free to give it another go.
        </p>
        <a href="">
          <SolidButtonVue :text="'Refresh the Page'" class="mt-4" />
        </a>
      </div>
    </div>

    <div
      v-else-if="statusCode === '300'"
      class="h-screen grid grid-cols-1 sm:grid-cols-2"
    >
      <div
        class="justify-self-center sm:justify-self-end self-end sm:self-center"
      >
        <img
          src="@/assets/images/pexels-painting.jpg?nf_resize=fit&w=500"
          class="h-48 sm:h-64 w-auto"
          width="64"
          height="48"
        />
        <!-- <img
          data-blink-uuid="7f7222f8-c10a-48ae-88d4-835d9b5b7d65"
          class="h-64"
        /> -->
        <p class="text-xs text-gray-600 font-mono">
          photo by Daian Gan from Pexels
        </p>
      </div>
      <div
        class="pt-4 px-8 justify-self-center sm:justify-self-start self-start sm:self-center"
      >
        <p class="text-5xl font-medium font-primary text-black">
          painting a masterpiece
        </p>
        <p class="py-2 px-1 text-xl text-primary font-secondary">
          takes time. This page is not yet ready.
        </p>
        <router-link to="/">
          <SolidButtonVue :text="'Go Back Home'" class="mt-4" />
        </router-link>
      </div>
    </div>

    <div
      v-else-if="statusCode === '404'"
      class="h-screen grid grid-cols-1 sm:grid-cols-2"
    >
      <div
        class="justify-self-center sm:justify-self-end self-end sm:self-center"
      >
        <img
          src="@/assets/images/pexels-telephone.jpg?nf_resize=fit&w=500"
          class="h-48 sm:h-64 w-auto"
          width="64"
          height="48"
        />
        <!-- <img
          data-blink-uuid="5fbce38d-f229-4e52-896c-f600530dd072"
          class="max-h-64"
        /> -->
        <p class="text-xs text-gray-600 font-mono">
          Photo by pixabay from Pexels
        </p>
      </div>
      <div
        class="pt-4 px-8 justify-self-center sm:justify-self-start self-start sm:self-center"
      >
        <p class="text-5xl font-medium font-primary text-black">
          Nobody Picked Up
        </p>
        <p class="py-2 px-1 text-xl text-primary font-secondary">
          Looks like that page does not exist
        </p>
        <router-link to="/">
          <SolidButtonVue :text="'Go Back Home'" class="mt-4" />
        </router-link>
      </div>
    </div>
    <div v-else class="self-center mx-auto">
      <p class="text-3xl font-medium">Error {{ statusCode }}</p>
      <hr class="mb-6 mt-4 border-gray-800" />
      <router-link to="/" class="w-24 mx-auto">
        <HollowButtonVue :text="'Go Home'" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import HollowButtonVue from "@/components/particles/HollowButton.vue";
import SolidButtonVue from "@/components/particles/SolidButton.vue";

import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    HollowButtonVue,
    SolidButtonVue,
  },

  setup() {
    const route = useRoute();
    let q = route.query;

    let statusCode = q.type?.toString() || "404";
    let message = q.message?.toString();

    return {
      statusCode,
      message,
    };
  },
});
</script>
