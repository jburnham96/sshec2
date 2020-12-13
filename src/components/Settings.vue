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
          @input="updateDefaultUsername"
          :value="defaultUsername"
          :placeholder="'Default Username'"
          :required="true"
        />
        <textInput
          @input="updateTerminalOverride"
          :value="terminalOverride"
          :placeholder="'Terminal Override'"
          :required="true"
        />
        <div class="toggle-container">
          <p class="toggle-label">Use Strict Host Key Checking</p>
          <vueToggles
            class="toggle"
            :checkedBg="'#11998e'"
            @click="setStrictHostKeyChecking(!strictHostKeyChecking)"
            :value="strictHostKeyChecking"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import textInput from "./TextInput.vue";
import vueToggles from "vue-toggles";
const debounce = require('debounce');

export default {
  data: () => ({
    value: false,
  }),
  components: {
    textInput,
    vueToggles,
  },
  computed: {
    ...mapGetters([
      "defaultFsKeyLocation",
      "defaultUsername",
      "strictHostKeyChecking",
      "terminalOverride",
    ]),
  },
  methods: {
    ...mapActions([
      "setDefaultFsKeyLocation",
      "setDefaultUsername",
      "setStrictHostKeyChecking",
      "setTerminalOverride",
    ]),
    updateDefaultUsername: debounce(function(username) {
      this.setDefaultUsername(username);
    }, 500),
    updateTerminalOverride: debounce(function(terminal) {
      this.setTerminalOverride(terminal);
    }, 500),
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
  width: 40%;
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

.toggle-container {
  display: flex;
  margin-top: 37px;
}

.toggle-label {
  margin-right: 20px;
  flex: auto;
}

.toggle:focus {
  outline: none;
}
</style>
