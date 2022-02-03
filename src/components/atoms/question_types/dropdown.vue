<template>
  <!-- dropdown -->
  <div class="">
    <div v-if="getEditMode">
      <div
        v-for="(option, optIndex) in question.options"
        :key="optIndex"
        class="cursor-pointer hover:bg-blue-100 text-lg flex flex-row font-normal tracking-normal w-full"
      >
        <LazyTextInputForEditor
          v-model="option.title"
          :placeholder="'option ' + String(optIndex + 1)"
          class="flex-grow"
        />
        <FontAwesomeIcon
          :icon="['fas', 'times']"
          class="text-gray-500 hover:text-black cursor-pointer flex-none mx-1 mt-2"
          @click="
            DELETE_QUESTION_OPTION({
              sectionIndex: getSectionIndex,
              qnIndex: index,
              optIndex,
            })
          "
        />
      </div>

      <div
        class="mt-1 cursor-pointer"
        @click="
          ADD_QUESTION_OPTION({
            index,
            sectionIndex: getSectionIndex,
          })
        "
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" />
        <p class="inline">add option</p>
      </div>
    </div>

    <select v-else v-model="inputVal">
      <option v-for="option in question.options" :key="option.title">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(),
  },
  computed: {
    ...mapGetters([
      'getSectionIndex',
      'getEditMode',
      'getQuestionResponse',
      'getQuestion',
    ]),
    question() {
      return this.getQuestion(this.index)
    },
    response() {
      return this.getQuestionResponse(this.index)
    },
    inputVal: {
      get() {
        if (!this.response && this.question.options)
          return this.question.options[0].title
        else return this.response
      },
      set(value) {
        this.SET_RESPONSE({
          qnIndex: this.index,
          newVal: String(value),
        })
      },
    },
  },
  methods: {
    ...mapMutations([
      'SET_RESPONSE',
      'ADD_QUESTION_OPTION',
      'DELETE_QUESTION_OPTION',
    ]),
  },
}
</script>
