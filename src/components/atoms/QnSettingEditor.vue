<template>
  <div
    v-if="mode === 'selecting_type'"
    class="border-2 border-gray-500 border-dashed p-2 mt-6"
  >
    <p class="font-secondary text-center text-gray-600 text-lg pb-3">
      choose the type of question
    </p>
    <div class="flex flex-wrap gap-3">
      <SolidButton
        v-for="type in qntypes"
        :key="type"
        :text="type"
        :is-selected="questiontype === type"
        class="w-24 justify-self-center"
        @click.native="questiontype = type"
      />
    </div>
  </div>

  <div v-else-if="mode === 'validations'">
    <p>Required? :</p>
    <TextInputForEditor v-model="isRequired" />
    <!-- isrequired_section -->
    <!-- isrequired -->
    <p>Error Message :</p>
    <TextInputForEditor v-model="errorMessage" />
    <p>Length Ranges :</p>
    <TextInputForEditor v-model="lenRanges" />
    <p>Regular Expression :</p>
    <TextInputForEditor v-model="regExpMatch" />
  </div>

  <div v-else-if="mode === 'styling'">
    <p>Styles:</p>
    <TextInputForEditor v-model="qnStyle" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(), // the question index
    mode: {
      default: '',
      type: String(),
    },
  },
  data() {
    return {
      qntypes: [
        'scmc',
        'mcmc',
        'text',
        'date',
        'dropdown',
        'empty',
        'range',
        'time',
      ],
    }
  },
  computed: {
    ...mapGetters(['getSectionIndex', 'getQuestion', 'parseText']),
    question() {
      return this.getQuestion(this.index)
    },
    questiontype: {
      get() {
        return this.question.type
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { type: value },
        })
      },
    },
    isRequired: {
      get() {
        return this.question.isrequired
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { isrequired: value },
        })
      },
    },
    errorMessage: {
      get() {
        return this.question.error_message
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { error_message: value },
        })
      },
    },
    lenRanges: {
      get() {
        return this.question.lenranges
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { lenranges: value },
        })
      },
    },
    regExpMatch: {
      get() {
        return this.question.matchregexp
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { matchregexp: value },
        })
      },
    },
    qnStyle: {
      get() {
        return this.question.style
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { style: value },
        })
      },
    },
  },
  methods: {
    ...mapMutations(['SET_QUESTION_META']),
  },
}
</script>
