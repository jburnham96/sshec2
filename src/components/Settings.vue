<template>
  <div class="wapper">
    <div class="form-container">
      <div class="form-item">
        <div class="key-location-container">
          <textInput
            :value="defaultFsKeyLocation"
            :placeholder="'Default key location'"
            :required="true"
            :disabled="true"
            :autoFilled="true"
          />
          <input
            @input="
              (event) => {
                setDefaultFsKeyLocation(event.target.files[0].path);
              }
            "
            type="file"
            id="defaultKeyLocation"
            class="hidden"
          />
          <label for="defaultKeyLocation" class="file-system-label"
            >Change...</label
          >
        </div>
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
import { mapActions, mapGetters } from "vuex";
import textInput from "./TextInput.vue";

export default {
  components: {
    textInput,
  },
  computed: {
    ...mapGetters(["defaultFsKeyLocation", "defaultUsername"]),
  },
  methods: {
    ...mapActions(["setDefaultFsKeyLocation", "setDefaultUsername"]),
  },
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
  min-height: 90vh;
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

.hidden {
  display: none;
}

.file-system-label {
  margin-top: 37px;
  margin-left: 16px;
}

.file-system-label:hover {
  cursor: pointer;
  color: #11998e;
}

.key-location-container {
  display: flex;
  flex-direction: row;
}
</style>
