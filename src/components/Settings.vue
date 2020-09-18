<template>
  <div class="wapper">
    <div class="form-container">
      <div class="form-item">
        <textInput
          @input="setDefaultFsKeyLocation"
          :value="defaultFsKeyLocation"
          :placeholder="'Default key location'"
          :required="true"
        />
        <textInput
          @input="setDefaultUsername"
          :value="defaultUsername"
          :placeholder="'Default Username'"
          :required="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import textInput from "./TextInput.vue";

export default {
  components: {
    textInput,
  },
  computed: {
    ...mapGetters([
      'defaultFsKeyLocation',
      'defaultUsername'
    ]),
  },
  methods: {
    ...mapActions([
      'setDefaultFsKeyLocation',
      'setDefaultUsername'
    ]),
  }
};
</script>

<style>
.wrapper {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.form-container {
  min-height: 70vh;
  min-width: 90vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.form-item {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
