<template>
    <div class="drop-down-container">
      <vselect
        @input="regionSelected"
        :options="regions"
        :clearable="false"
        :filterable="true"
        :value="selectedRegion"
        placeholder="Select a region"
        class="region-selector"
      />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vselect from 'vue-select';
import AwsHelper from '../helpers/aws.helper';

export default {
  name: 'region-selector',
  components: {
    vselect,
  },
  data: () => ({
    regions: [],
  }),
  computed: {
    ...mapGetters([
      'selectedRegion',
    ]),
  },
  async mounted() {
    // Initialise with default region as the sdk needs a region
    // eslint-disable-next-line no-unused-vars
    const aws = new AwsHelper(this.selectedRegion);
    this.regions = await AwsHelper.getRegions();
  },
  methods: {
    ...mapActions(['setRegion']),
    regionSelected(selectedRegion) {
      this.setRegion(selectedRegion);
    },
  },
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

.drop-down-container {
  display: block;
  position: relative;
  top: 50px;
  left: 190px;  
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  min-width: 150px;
}

.region-selector .vs__search::placeholder,
.region-selector .vs__dropdown-toggle,
.region-selector .vs__selected {
    border: none;
    color: #cdcdcd;
}

.region-selector .vs__dropdown-menu {
    background: none;
}

.region-selector .vs__dropdown-menu > li {
    color: #cdcdcd;
    background-color: none;
    transition: all 0.4s;
}

.region-selector .vs__dropdown-menu > li:hover {
    background-color: #333333;
    transition: all 0.4s;
}

.region-selector .vs__dropdown-menu::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #232323;
}

.region-selector .vs__dropdown-menu::-webkit-scrollbar
{
    width: 7px;
    background-color: #232323;
}

.region-selector .vs__dropdown-menu::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rgb(17, 17, 17)
}

.region-selector .vs__open-indicator {
  fill: #cdcdcd;
}

.region-selector .vs__open-indicator:hover {
  cursor: pointer;
}

.region-selector .vs__selected-options .vs__selected {
  color: #cdcdcd;
}

.region-selector .vs__search {
  color: #cdcdcd;
}
</style>