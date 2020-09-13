<!--https://codepen.io/lucasyem/details/ZEEYKdj-->
<template>
  <div class="form__group field">
    <div key="1" v-if="!loading">
      <textInput
        v-model="search"
        :placeholder="selectedRegion ? 'Search...' : 'Please select a region to search'"
        :required="true"
        :disabled="!selectedRegion"
      />
      <autoCompleteMenu
        v-on:list-item-clicked="itemClicked"
        :items="filteredResources"
        :search="search"
      />
    </div>
    <div key="2" v-else class="loader-container">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AwsHelper from "../helpers/aws.helper";
import autoCompleteMenu from "./AutoCompleteMenu.vue";
import textInput from "./TextInput.vue";

export default {
  components: {
    autoCompleteMenu,
    textInput,
  },
  data: () => ({
    allResources: [],
    filteredResources: [],
    search: "",
    loading: true,
  }),
  computed: {
    ...mapGetters(["selectedRegion"]),
  },
  watch: {
    search(searchText) {
      this.filterSearch(searchText);
    },
    selectedRegion() {
      this.populateAllResources();
      this.search = "";
    },
  },
  async mounted() {
    await this.populateAllResources();
  },
  methods: {
    async populateAllResources() {
      this.loading = true;

      if(this.selectedRegion) {
        const aws = new AwsHelper(this.selectedRegion);
        this.allResources = await aws.getAllResources();
      }

      this.loading = false;
    },
    filterResources(searchText) {
      return this.allResources.filter(
        (resource) =>
          resource.type.toLowerCase().includes(searchText) ||
          resource.name.toLowerCase().includes(searchText)
      );
    },
    itemClicked(selectedItem) {
      this.$emit("list-item-clicked", selectedItem);
    },
    filterSearch(searchText) {
      this.filteredResources = searchText
        ? this.filterResources(searchText.toLowerCase())
        : [];
    },
  },
};
</script>

<style lang="scss">
.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: "";
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}

.loader-container {
  width: 0px;
  margin-left: auto;
  margin-right: auto;
}
</style>
