<template>
  <div
    class="lg:px-96 sm:px-32 px-5 py-10 min-h-screen"
    :style="'background-color:light' + branch.scene?.bg"
  >
    <!-- Form Content -->
    <div v-for="el in els" :key="el.id">
      <!-- Question -->
      <TextInputForEditorVue v-if="inEditMode" v-model="el.title" />
      <div v-else class="font-primary text-xl pl-2">{{ el.title }}</div>

      <div v-if="el.__typename !== 'empty'" class="mt-6 font-secondary text-lg">
        <scmcVue
          v-if="el.__typename == 'McEl'"
          :in-edit-mode="inEditMode"
          :node="el"
          @update:value="updateAnswer($event, el.id)"
        />

        <!-- <LazyEmpty v-else /> -->
      </div>

      <!-- <AlertDialogVue :text="currAnswer[id]" class="mt-2" /> -->
    </div>

    <!-- Form Footer Nav -->
    <div class="flex px-3 my-6">
      <div class="w-20 mr-3" v-if="branch.isBackAvail">
        <HollowButtonVue :text="'back'" @click="goBack()" />
      </div>
      <!-- <HollowButton -->
      <div v-if="branch.next" class="w-20">
        <SolidButtonVue
          v-if="submitState.submitLoading.value"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'next'" @click="goNext()" />
      </div>
      <div class="w-20 ml-auto" v-if="branch.isSubmitAvail">
        <SolidButtonVue
          v-if="submitState.submitLoading.value"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'submit'" @click="submitFinish()" />
      </div>
      <!-- <AlertDialogVue
        :text="String(submitState.submitError.value)"
        class="mt-2"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SolidButtonVue from "../particles/SolidButton.vue";
import HollowButtonVue from "../particles/HollowButton.vue";
import scmcVue from "../atoms/question_types/scmc.vue";
import TextInputForEditorVue from "@/components/particles/TextInputForEditor.vue";

export default defineComponent({
  props: {
    inEditMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    els: {
      required: true,
      type: Object,
    },
    submitState: {
      type: Object,
      required: false,
      default: () => {
        return { submitLoading: false, submitError: null };
      },
    },
    branch: {
      type: Object,
      required: true,
    },
    updateAnswer: {
      required: false,
      type: Function,
      default: () => {
        return function () {
          return;
        };
      },
    },
    goBack: {
      required: false,
      type: Function,
      default: () => {
        return function () {
          return;
        };
      },
    },
    goNext: {
      required: false,
      type: Function,
      default: () => {
        return function () {
          return;
        };
      },
    },
    submitFinish: {
      required: false,
      type: Function,
      default: () => {
        return function () {
          return;
        };
      },
    },
  },
  components: {
    SolidButtonVue,
    HollowButtonVue,
    scmcVue,
    TextInputForEditorVue,
  },
});
</script>
