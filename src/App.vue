<template>
  <router-view />
  <AlertDialogVue
    :text="toastQueue?.[0]"
    class="absolute bottom-5 transition -translate-y-10 ease-in-out"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, Ref, ref } from "vue";
import { useAuth0 } from "@/services/auth0-plugin";

import AlertDialogVue from "./components/particles/AlertDialog.vue";

export default defineComponent({
  name: "App",
  components: {
    AlertDialogVue,
  },
  setup() {
    const auth0 = useAuth0();

    onMounted(async () => {
      if (!auth0) return;
      auth0.createClient().then(() => {
        auth0.handleCallback();
      });
    });

    const toastQueue: Ref<string[]> = ref([]);
    const popToast = (text: string) => {
      // have a request queue
      toastQueue.value.push(text);
      setTimeout(() => {
        toastQueue.value.shift();
      }, 6000);
    };

    provide("popToast", popToast);

    return {
      toastQueue,
    };
  },
});
</script>
