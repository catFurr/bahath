<template>
  <!-- Main Section -->
  <!-- <FormFlow class="pt-16" :class="show.editPane === '' ? 'pl-16' : 'pl-96'" /> -->

  <!-- Top Nav/Menu Section -->
  <div class="flex flex-row fixed top-0 w-full shadow h-16 bg-secondary">
    <!-- <div class="self-center font-secondary text-primary p-3"> -->
    <UserNavVue class="text-primary my-3 mx-10" />
    <TextInputWithErrorVue
      v-model="getBranch.code"
      :is-error="!getBranch.code"
      class="self-center text-monospace"
    />
    <!-- <router-link v-if="formcode" :to="'/' + formcode + '/editor'" class="my-3">
      <font-awesome-icon :icon="['fas', 'external-link-alt']" />
    </router-link> -->

    <!-- <ModalCard>
        <template #button>
          <div class="content-center mx-10 my-3 w-32" @click="PublishForm()">
            <SolidButtonVue
              v-if="isPublishing"
              :text="'publishing'"
              :icon="'snowflake'"
              :icon-type="'far'"
              :icon-meta="'fa-spin'"
              class="w-24"
              :is-selected="true"
            />
            <SolidButtonVue v-else :text="'publish'" class="w-24" />
          </div>
        </template>

        <template #default="{ close }">
          <p>{{ modalMessage }}</p>
          <SolidButtonVue :text="'Ok'" @click.native="close()" />
        </template>
      </ModalCard> -->
    <div class="content-center mx-10 my-3 w-32" @click="PublishForm()">
      <SolidButtonVue
        v-if="isPublishing"
        :text="'publishing'"
        :icon="'snowflake'"
        :icon-type="'far'"
        :icon-meta="'fa-spin'"
        class="w-24"
        :is-selected="true"
      />
      <SolidButtonVue v-else :text="'publish'" class="w-24" />
    </div>
  </div>

  <div class="fixed top-16 left-0 h-full flex flex-row w-full">
    <!-- Left Sections Nav -->
    <div class="flex flex-col w-16 bg-primary flex-shrink-0">
      <font-awesome-icon
        :icon="['far', 'snowflake']"
        class="edit-pane-nav-icons"
        @click="toggleEditPaneMode('scene')"
      />
      <font-awesome-icon
        :icon="['far', 'clone']"
        class="edit-pane-nav-icons"
        @click="toggleEditPaneMode('graph')"
      />
      <!-- <font-awesome-icon
        :icon="['fas', 'palette']"
        class="edit-pane-nav-icons"
        @click="toggleEditPaneMode('style')"
      />
      <font-awesome-icon
        :icon="['fas', 'cog']"
        class="edit-pane-nav-icons"
        @click="toggleEditPaneMode('setting')"
      /> -->
    </div>

    <div v-if="show.editPane === 'scene'" class="edit-pane">
      <div
        v-for="el in getEls"
        :key="el.id"
        class="p-2 grid grid-cols-4 grid-rows-3 rounded-lg bg-white shadow-sm"
      >
        <p class="truncate col-span-4">{{ el.title }}</p>
        <div class="col-span-4">
          Type:
          <select disabled>
            <option>Multiple choice</option>
          </select>
        </div>
        <SolidButtonVue
          v-if="getScene?.elements.find((o) => o.id == el.id)?.row != 0"
          :icon="'chevron-up'"
          :icon-type="'fas'"
          @click="
            moveEl(
              (getScene?.elements.find((o) => o.id == el.id)?.row || 0) - 1,
              getScene?.elements.find((o) => o.id == el.id)?.row || 0
            )
          "
        />
        <SolidButtonVue
          v-if="
            getScene?.elements.find((o) => o.id == el.id)?.row !=
            getEls.length - 1
          "
          :icon="'chevron-down'"
          :icon-type="'fas'"
          @click="
            moveEl(
              (getScene?.elements.find((o) => o.id == el.id)?.row || 0) + 1,
              getScene?.elements.find((o) => o.id == el.id)?.row || 0
            )
          "
        />
      </div>
      <SolidButtonVue
        v-if="getEls.length > 1"
        :icon="'trash-alt'"
        :icon-type="'far'"
        @click="delEl()"
      />
      <SolidButtonVue :icon="'plus'" :icon-type="'fas'" @click="addEl()" />
    </div>

    <div v-else-if="show.editPane === 'graph'" class="edit-pane">
      <div class="grid grid-cols-2 gap-2 p-3 pt-0">
        <!-- v-if="getForm.sections.length < 10" -->
        <SolidButtonVue :icon="'plus'" :icon-type="'fas'" />
        <!-- <SolidButtonVue
            v-if="getForm.sections.length > 1"
            :icon="'times'"
            :icon-type="'fas'"
          /> -->
      </div>
      <!-- <div v-for="(section, index) in getForm.sections" :key="index">
          <p
            class="font-bold cursor-pointer"
            :class="getSectionIndex === index ? 'bg-gray-500' : ''"
            @click="index - getSectionIndex"
          >
            Section {{ index }}
          </p>
          <TextInputForEditor v-model="section.nextSection" />
        </div> -->
    </div>

    <div v-else-if="show.editPane === 'style'" class="edit-pane">
      <p class="font-bold">Form Level:</p>
      <!-- <TextInputForEditor v-model="formStyle" /> -->
      <p class="font-bold">Question Level:</p>
      <!-- <TextInputForEditor :placeholder="'not yet implemented!'" /> -->
    </div>

    <div v-else-if="show.editPane === 'setting'" class="edit-pane">
      <p>gerverfref</p>
    </div>

    <!-- Form Page Section -->
    <FormPageVue :els="getEls" :branch="getBranch" :in-edit-mode="true" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";

import UserNavVue from "@/components/molecules/UserNav.vue";
import TextInputWithErrorVue from "@/components/particles/TextInputWithError.vue";
import SolidButtonVue from "@/components/particles/SolidButton.vue";
import FormPageVue from "@/components/polymers/FormPage.vue";

export default defineComponent({
  components: {
    UserNavVue,
    TextInputWithErrorVue,
    SolidButtonVue,
    FormPageVue,
  },
  setup() {
    const show = reactive({
      editPane: "scene", // can be 'setting', 'style', 'graph', 'scene', ''
    });
    const isPublishing = ref(false);

    const localForm = reactive({
      branches: [
        {
          id: "nonde",
          __typename: "BranchNode",
          code: "hello-world",
          scene: "nonve",
          next: "null",
          isBackAvail: false,
          isSubmitAvail: true,
        },
      ],
      scenes: [
        {
          id: "nonve",
          __typename: "Scene",
          bg: "blue",
          elements: [
            {
              row: 0,
              col: 0,
              id: "nonce",
            },
          ],
        },
      ],
      elements: [
        {
          id: "nonce",
          __typename: "McEl",
          title: "What is the capital city of India?",
          options: ["New Delhi", "Bengaluru", "Chennai", "Hyderabad"],
        },
      ],
    });

    const currentBranchID = ref("nonde");
    const getBranch = computed(() => {
      const currBranch = localForm.branches.find(
        (o) => o.id === currentBranchID.value
      );
      const sceneID = currBranch?.scene;
      const scene = localForm.scenes.find((o) => o.id === sceneID);
      if (currBranch) return { ...currBranch, scene: scene };
      return { code: "" };
    });
    const getScene = computed(() => {
      const currBranch = localForm.branches.find(
        (o) => o.id === currentBranchID.value
      );
      const sceneID = currBranch?.scene;
      return localForm.scenes.find((o) => o.id === sceneID);
    });
    const getEls = computed(() => {
      // optimise this TODO
      const sceneID = localForm.branches.find(
        (o) => o.id === currentBranchID.value
      )?.scene;
      const elIDs =
        localForm.scenes.find((o) => o.id === sceneID)?.elements || [];
      return elIDs.reduce((res: any, x) => {
        const k = localForm.elements.find((o) => o.id === x.id);
        if (k) res[x.row] = k;
        return res;
      }, []);
    });

    const addEl = (type = "McEl") => {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      const newID =
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4();
      localForm.elements.push({
        id: newID,
        __typename: type,
        title: "",
        options: [""],
      });
      getScene.value?.elements.push({
        row: getScene.value.elements.length,
        col: 0,
        id: newID,
      });
    };
    const delEl = () => {
      const scene = getScene.value;
      if (!scene) return;
      const elInd = scene.elements.findIndex(
        (o) => o.row === scene.elements.length - 1
      );
      if (!elInd) return;
      const elIndex = scene.elements.splice(elInd, 1);
      if (!elIndex?.[0]?.id) return;
      const t_ind = localForm.elements.findIndex((o) => o.id === elIndex[0].id);
      localForm.elements.splice(t_ind, 1);
    };
    const moveEl = (newpos: number, oldpos: number) => {
      const scene = getScene.value;
      if (!scene) return;
      const elInd = scene.elements.findIndex((o) => o.row === oldpos);
      const elInd1 = scene.elements.findIndex((o) => o.row === newpos);
      if (elInd < 0 || elInd1 < 0) return;
      scene.elements[elInd1].row = oldpos;
      scene.elements[elInd].row = newpos;
    };

    const toggleEditPaneMode = (mode: string) => {
      if (show.editPane === mode) show.editPane = "";
      else show.editPane = mode;
    };

    const PublishForm = function () {
      if (isPublishing.value) return;
      isPublishing.value = true;
      // $store.dispatch("PublishForm").then((response) => {
      //   if (!response)
      //     modalMessage.value =
      //       "Unexpected Error in publishing the form.Check your network connection and try again.";
      //   else modalMessage.value = "Form Published!";
      //   isPublishing.value = false;
      // });
    };

    return {
      show,
      isPublishing,
      toggleEditPaneMode,
      PublishForm,

      getBranch,
      getScene,
      getEls,

      addEl,
      delEl,
      moveEl,
    };
  },
});
</script>

<style scoped>
.edit-pane-nav-icons {
  @apply text-gray-700 hover:text-black self-center	text-3xl my-6;
}
.edit-pane {
  @apply bg-gray-200 w-64 flex-shrink-0 p-4 overflow-auto;
}
</style>
