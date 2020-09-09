<template>
  <div>
    <div class="form-container">
      <div class="form-item">
        <textInput
          v-model="defaultKeyLocation"
          :placeholder="'Default key location'"
          :required="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import textInput from "./TextInput.vue";

export default {
  components: {
    textInput,
  },
  data: () => ({
    defaultKeyLocation: "",
  }),
};
</script>

<style>
.form-container {
    display: flex;
}

.form-item {
    width: 50%;
}
</style>
