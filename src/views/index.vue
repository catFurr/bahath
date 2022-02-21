<template>
  <div class="text-primary relative">
    <div class="p-6 md:p-10 absolute w-full">
      <router-link to="/docs" class="float-left">
        <SolidButtonVue :text="'docs'" class="w-16" />
      </router-link>
      <UserNavVue class="float-right" :keep-expanded="true" />
    </div>
    <div class="h-screen grid grid-cols-1 content-center">
      <img
        src="@/assets/images/bahathlogo.png"
        class="w-32 h-32 sm:w-48 sm:h-48 place-self-center"
        width="32"
        height="32"
        alt="Bahath Logo"
      />
      <!-- <img data-blink-uuid="675d2408-990e-45ea-b1cb-3371feca62c1" /> -->
      <p
        class="font-primary text-primary text-4xl sm:text-5xl md:text-6xl p-2 mx-auto"
      >
        bahath
      </p>
      <form
        class="flex flex-row mx-auto p-2"
        action="/redirect"
        @submit.prevent="goToForm()"
      >
        <TextInputWithErrorVue
          v-model="code"
          :is-error="!getCleanedCode(code) && triedSubmit"
          class="text-sm sm:text-base md:text-lg"
        />
        <!-- <input type="submit" class="mt-3 mx-2 w-24" value="Submit" /> -->
        <div @click="goToForm()">
          <HollowButtonVue class="w-24 m-1" :text="'begin'" />
        </div>
      </form>
      <p class="font-secondary pt-3 text-center">- or -</p>
      <router-link to="/error?type=300" class="p-2 flex mx-auto w-48">
        <!-- Make a new form -->
        <EmptyButton :text="'make a new form'" />
      </router-link>
    </div>
    <p class="fixed bottom-0 right-0 p-2 font-secondary text-black">
      by _catFurr
    </p>
  </div>
</template>

<script lang="ts">
import EmptyButtonVue from "@/components/particles/EmptyButton.vue";
import HollowButtonVue from "@/components/particles/HollowButton.vue";
import SolidButtonVue from "@/components/particles/SolidButton.vue";
import UserNavVue from "@/components/molecules/UserNav.vue";
import TextInputWithErrorVue from "@/components/particles/TextInputWithError.vue";

import { defineComponent, ref } from "vue";
import router from "@/router";

export default defineComponent({
  components: {
    EmptyButton: EmptyButtonVue,
    HollowButtonVue,
    TextInputWithErrorVue,
    UserNavVue,
    SolidButtonVue,
  },

  setup() {
    let code = ref("");
    let triedSubmit = ref(false);

    // TODO: implement this in a central store
    const getCleanedCode = (val: string): string | null => {
      return val;
    };

    const goToForm = () => {
      triedSubmit.value = true;
      const cleanCode = getCleanedCode(code.value);
      router.push(cleanCode || "");
    };

    return {
      code,
      triedSubmit,
      goToForm,
      getCleanedCode,
    };
  },
});
</script>
