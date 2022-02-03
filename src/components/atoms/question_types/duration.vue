<template>
  <div class="py-6 px-10">
    <div v-for="id in unitListLen" :key="id">
      <input type="Number" min="0" @change="setVal($event.target.value, id)" />
      {{ unitList[id - 1] }}
      <font-awesome-icon
        v-if="(id === unitListLen) & (id < 7)"
        :icon="['fas', 'plus-circle']"
        @click="unitListLen++"
      />
      <font-awesome-icon
        v-if="(id === unitListLen) & (id > 1)"
        :icon="['fas', 'minus-circle']"
        @click="
          unitListLen--
          setVal(0, id)
        "
      />
    </div>

    {{ inputVal }}

    <!-- {{inputVal%60}} 
        {{((Number(inputVal)-Number(inputVal%60))%3600)/60}} 
        {{((Number(inputVal)-Number(inputVal%3600))%24)/3600}} -->

    {{ ((Number(inputVal) - Number(inputVal % 3600)) / 3600) % 8760 }}
    {{
      ((Number(inputVal) - Number(inputVal % (24 * 3600))) / (24 * 3600)) % 365
    }}
    {{
      ((Number(inputVal) - Number(inputVal % (7 * 24 * 3600))) /
        (7 * 24 * 3600)) %
      52
    }}
    {{
      ((Number(inputVal) - Number(inputVal % (30 * 24 * 3600))) /
        (30 * 24 * 3600)) %
      12
    }}
    {{
      (Number(inputVal) - Number(inputVal % (365 * 24 * 3600))) /
      (365 * 24 * 3600)
    }}
  </div>
</template>

<script>
export default {
  props: {
    index: Number(),
  },
  data() {
    return {
      unitListLen: 1,
      units: [0, 0, 0, 0, 0, 0, 0],
      // duration: in seconds
      inputVal: null,
    }
  },
  computed: {
    unitList() {
      const list = [
        'Seconds',
        'Minutes',
        'Hours',
        'Days (24hrs)',
        'Weeks',
        'Months (30 days)',
        'Years (365 days)',
      ]
      return list.slice(0, this.unitListLen)
    },
  },
  methods: {
    setVal(val, id) {
      this.units[id - 1] = val
      this.inputVal =
        Number(this.units[0]) +
        Number(60 * this.units[1]) +
        Number(3600 * this.units[2]) +
        Number(24 * 3600 * this.units[3]) +
        Number(7 * 24 * 3600 * this.units[4]) +
        Number(30 * 24 * 3600 * this.units[5]) +
        Number(365 * 24 * 3600 * this.units[6])
    },
  },
}
</script>
