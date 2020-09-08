<!--https://codepen.io/lucasyem/details/ZEEYKdj-->
<template>
    <div class="form__group field">
      <transition name="fade">
        <div key=1 v-if="!loading">
          <input type="input" class="form__field" v-on:click="inputSelected()" placeholder="Search" id='search' v-model="search" required />
          <label for="seach" class="form__label">Search...</label>
          <autoCompleteMenu v-on:list-item-clicked="itemClicked" :items="filteredResources" :search="search"/>
        </div>
        <div key=2 v-else class="loader-container">
          <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AwsHelper from '../helpers/aws.helper';
import autoCompleteMenu from './AutoCompleteMenu.vue';

export default {
  components: {
    autoCompleteMenu,
  },
  data: () => ({
    allResources: [],
    filteredResources: [],
    search: '',
    loading: true,
  }),
  computed: {
    ...mapGetters([
      'selectedRegion',
    ]),
  },
  watch: {
    search(searchText) {
      this.filterSearch(searchText);
    },
    selectedRegion() {
      this.populateAllResources();
      this.search = '';
    },
  },
  async mounted() {
    await this.populateAllResources();
  },
  methods: {
    async populateAllResources() {
      this.loading = true;

      // get region from the store in a drop down
      const aws = new AwsHelper(this.selectedRegion);

      this.allResources = await aws.getAllResources();
      this.loading = false;
    },
    filterResources(searchText) {
      return this.allResources.filter(resource =>
        resource.type.toLowerCase().includes(searchText)
        || resource.name.toLowerCase().includes(searchText));
    },
    itemClicked(ipAddress) {
      this.$emit('list-item-clicked', ipAddress);
    },
    inputSelected() {
      this.filterSearch(this.search);
    },
    filterSearch(searchText) {
      this.filteredResources = searchText ?
        this.filterResources(searchText.toLowerCase())
        : [];
    },
  },
};
</script>

<style lang="scss">
    $primary: #11998e;
    $secondary: #38ef7d;
    $white: #fff;
    $gray: #9b9b9b;
    .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
    }

    .form__field {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid $gray;
      outline: 0;
      font-size: 1.3rem;
      color: $white;
      padding: 7px 0;
      background: transparent;
      transition: border-color 0.2s;

      &::placeholder {
          color: transparent;
      }

      &:placeholder-shown ~ .form__label {
          font-size: 1.3rem;
          cursor: text;
          top: 20px;
          pointer-events: none;
      }
    }

    .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $gray;
    }

    .form__field:focus {
    ~ .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: $primary;
        font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $primary,$secondary);
    border-image-slice: 1;
    }
    /* reset input */
    .form__field{
      &:required,&:invalid { box-shadow:none; }
    }

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
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}

.loader-container {
  width: 0px;
  margin-left: auto;
  margin-right: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>