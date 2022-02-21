<template>
  <div
    class="lg:px-96 sm:px-32 px-5 py-10 min-h-screen"
    v-if="els"
    :style="'background-color:light' + branch.scene.bg"
  >
    <!-- Form Content -->
    <div v-for="(el, id) in els" :key="id">
      <!-- Question -->
      <div class="font-primary text-xl pl-2">{{ el.title }}</div>

      <div v-if="el.__typename !== 'empty'" class="mt-6 font-secondary text-lg">
        <scmcVue
          v-if="el.__typename === 'McEl'"
          :node="el"
          v-model="currAnswer[id]"
        />

        <!-- <LazyEmpty v-else /> -->
      </div>

      <!-- <AlertDialogVue :text="currAnswer[id]" class="mt-2" /> -->
    </div>

    <!-- Form Footer Nav -->
    <div class="flex px-3 my-6">
      <div class="w-20 mr-3" v-if="branch.isBackAvail">
        <HollowButtonVue :text="'back'" @click="$router.back()" />
      </div>
      <!-- <HollowButton -->
      <div v-if="branch.next" class="w-20">
        <SolidButtonVue
          v-if="submitLoading"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'next'" @click="answerNext()" />
      </div>
      <div class="w-20 ml-auto" v-if="branch.isSubmitAvail">
        <SolidButtonVue
          v-if="submitLoading"
          :icon="'snowflake'"
          :icon-type="'far'"
          :icon-meta="'fa-spin'"
          :is-selected="true"
        />
        <SolidButtonVue v-else :text="'submit'" @click="answerNext()" />
      </div>
    </div>
    {{ "Previous Answer: " + t_currAnswer }}
  </div>
  <div v-else-if="fetchLoading">Loading...</div>
  <div v-else>{{ fetchError }}</div>
</template>

<script lang="ts">
import router from "@/router";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, defineComponent, Ref, ref } from "vue";
import { useRoute } from "vue-router";

import scmcVue from "@/components/atoms/question_types/scmc.vue";
import SolidButtonVue from "@/components/particles/SolidButton.vue";
import HollowButtonVue from "@/components/particles/HollowButton.vue";
// import AlertDialogVue from "@/components/particles/AlertDialog.vue";
import { FRAG_BRANCH_CORE } from "@/models/fragments";

export default defineComponent({
  components: {
    scmcVue,
    SolidButtonVue,
    HollowButtonVue,
    // AlertDialogVue,
  },
  setup() {
    const route = useRoute();
    const code = route.params.code;

    const {
      result: branchResult,
      loading: fetchLoading,
      error: fetchError,
    } = useQuery(
      gql`
        ${FRAG_BRANCH_CORE}
        query getForm($branchWhere: BranchNodeWhere) {
          branchNodes(where: $branchWhere) {
            ...BranchCore
            answers {
              answerID
              value
              currBranch {
                branchID
              }
            }
          }
        }
      `,
      () => ({
        branchWhere: route.query.branch
          ? { branchID: route.query.branch }
          : { code },
      })
    );
    const branch = useResult(branchResult, null, (d) => d.branchNodes[0]);
    const branchID = useResult(
      branchResult,
      null,
      (d) => d.branchNodes[0].branchID
    );
    const currAnswer: Ref<string[]> = ref([]);
    const t_currAnswer = useResult(
      branchResult,
      null,
      (d) => d.branchNodes[0].answers[0].value
    );

    const els = computed(() => {
      return branch.value?.scene.elementsConnection.edges.map(
        (x: any) => x.node
      );
    });

    const {
      mutate: answerNext,
      onDone,
      loading: submitLoading,
    } = useMutation(
      gql`
        mutation AnswerNext($currBranchID: ID!, $currAnswer: [String!]) {
          sendAnswer(branchID: $currBranchID, value: $currAnswer) {
            nextAns {
              branch {
                branchID
              }
            }
          }
        }
      `,
      () => ({
        variables: {
          currBranchID: branchID.value,
          currAnswer: currAnswer.value,
        },
      })
    );

    onDone((res) => {
      const nextBranch = res.data?.sendAnswer?.nextAns?.branch?.branchID;
      if (nextBranch) router.push(`${code}?branch=${nextBranch}`);
      else router.push("coffee");
    });

    return {
      els,
      currAnswer,
      branch,
      t_currAnswer,
      answerNext,
      fetchLoading,
      fetchError,
      submitLoading,
    };
  },
});
</script>
