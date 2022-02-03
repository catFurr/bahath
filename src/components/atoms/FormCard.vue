<template>
  <div class="shadow rounded-md bg-white w-full p-4">
    <div class="flex flex-row">
      <p class="text-lg">{{ formMeta.code }}</p>
      <font-awesome-icon
        :icon="['far', 'clone']"
        class="cursor-pointer"
        @click="copyToClipboard(formMeta.code)"
      />
      <div class="ml-auto">
        <font-awesome-icon
          :icon="['fas', 'share-alt']"
          class="cursor-pointer"
          @click="openShareMenu()"
        />
        <router-link :to="'/' + formMeta.code + '/editor'">Edit</router-link>
        <font-awesome-icon
          v-if="!isExpanded"
          :icon="['fas', 'chevron-down']"
          class="cursor-pointer"
          @click="toggleState()"
        />
        <font-awesome-icon
          v-if="isExpanded"
          :icon="['fas', 'chevron-up']"
          class="cursor-pointer"
          @click="toggleState()"
        />
      </div>
    </div>

    <div v-if="isExpanded" class="flex flex-row">
      <!-- <p>{{ formMeta.numResponses }} responses</p> -->
      <a
        :href="baseUrl + formMeta.code + '/responses'"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon :icon="['fas', 'external-link-alt']" />
      </a>
      <!-- <HollowButton :text="'Disable Responses'" class="w-40" /> -->
      <!-- <font-awesome-icon
        :icon="['far', 'trash-alt']"
        class="self-center ml-3 text-xl text-red-300 hover:text-red-600 cursor-pointer"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    formMeta: Object(),
  },
  computed: {
    baseUrl() {
      return process.env.baseUrl;
    },
  },
  setup(props) {
    const isExpanded = ref(false);
    const { formMeta } = toRefs(props);

    const toggleState = () => {
      if (isExpanded.value) isExpanded.value = false;
      else isExpanded.value = true;
    };

    const openShareMenu = () => {
      navigator
        .share({
          title: `${formMeta.value.title}`,
          text:
            `${formMeta.value.code}` +
            " : Use the code or click on the link to open the form.",
          url: "https://deadcat.xyz/" + `${formMeta.value.code}`,
        })
        // .then(() => console.log('Successful share! 🎉'))
        .catch((err) => console.error(err));
    };

    const copyToClipboard = (str: string) => {
      const el = document.createElement("textarea"); // Create a <textarea> element
      el.value = str; // Set its value to the string that you want copied
      el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
      el.style.position = "absolute";
      el.style.left = "-9999px"; // Move outside the screen to make it invisible
      document.body.appendChild(el); // Append the <textarea> element to the HTML document
      const selected = document.getSelection()?.rangeCount // Check if there is any content selected previously
        ? document.getSelection()?.getRangeAt(0) // Store selection if found
        : false; // Mark as false to know no selection existed before
      el.select(); // Select the <textarea> content
      document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el); // Remove the <textarea> element
      if (selected) {
        // If a selection existed before copying
        document.getSelection()?.removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection()?.addRange(selected); // Restore the original selection
      }
    };

    return {
      isExpanded,
      toggleState,
      openShareMenu,
      copyToClipboard,
    };
  },
});
</script>
