<template>
  <div :style="parseText(question.style)">
    <!-- Question -->
    <LazyTextInputForEditor
      v-if="getEditMode"
      v-model="title"
      :placeholder="'edit item ' + String(index + 1)"
    />
    <div v-else class="prose" v-html="$md.render(parseText(title))" />

    <LazyQnSettingEditor
      v-if="getEditMode && mode !== ''"
      :index="index"
      :mode="mode"
    />

    <div v-else-if="questiontype !== 'empty'" class="mt-6">
      <LazyScmc v-if="questiontype === 'scmc'" :index="index" />
      <LazyMcmc v-if="questiontype === 'mcmc'" :index="index" />
      <LazyTextinput v-if="questiontype === 'text'" :index="index" />
      <LazyDropdown v-if="questiontype === 'dropdown'" :index="index" />
      <LazyDate v-if="questiontype === 'date'" :index="index" />
      <LazyTime v-if="questiontype === 'time'" :index="index" />
      <LazyDuration v-if="questiontype === 'duration'" :index="index" />
      <LazyRange v-if="questiontype === 'range'" :index="index" />
      <LazyMcmcgrid v-if="questiontype === 'mcmcgrid'" :index="index" />
      <LazyScmcgrid v-if="questiontype === 'scmcgrid'" :index="index" />
      <!-- <LazyEmpty v-else /> -->
    </div>

    <AlertDialog :text="validateResponse(index)" class="mt-2" />

    <div v-if="getEditMode" class="text-2xl">
      <p class="inline text-gray-400 font-medium text-lg font-secondary">
        {{ questiontype }}
      </p>
      <FontAwesomeIcon
        :icon="['fas', 'exchange-alt']"
        class="text-gray-300 hover:text-gray-600 cursor-pointer"
        @click="
          mode === 'selecting_type' ? (mode = '') : (mode = 'selecting_type')
        "
      />
      <FontAwesomeIcon
        :icon="['fas', 'wrench']"
        class="text-gray-300 hover:text-gray-600 cursor-pointer"
        @click="mode === 'validations' ? (mode = '') : (mode = 'validations')"
      />
      <FontAwesomeIcon
        :icon="['fas', 'palette']"
        class="text-gray-300 hover:text-gray-600 cursor-pointer"
        @click="mode === 'styling' ? (mode = '') : (mode = 'styling')"
      />
      <FontAwesomeIcon
        :icon="['far', 'trash-alt']"
        class="text-red-300 hover:text-red-600 cursor-pointer"
        @click="DELETE_QUESTION({ index, sectionIndex: getSectionIndex })"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    index: Number(), // the question index
  },
  data() {
    return {
      mode: '',
    }
  },
  computed: {
    ...mapGetters([
      'getEditMode',
      'getSectionIndex',
      'getQuestion',
      'parseText',
      'validateResponse',
    ]),
    question() {
      return this.getQuestion(this.index)
    },
    questiontype() {
      return this.parseText(this.question.type)
    },
    title: {
      get() {
        return this.question.title
      },
      set(value) {
        this.SET_QUESTION_META({
          index: this.index,
          sectionIndex: this.getSectionIndex,
          newVal: { title: value },
        })
      },
    },
  },
  methods: {
    ...mapMutations(['SET_QUESTION_META', 'DELETE_QUESTION']),
  },
}
</script>
