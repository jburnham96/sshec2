<template>
  <div class="not-found-container">
    <div class="ufo-container">
      <ufo />
      <h1>No AWS credentials found</h1>
      <h4>
        Please ensure you've followed the guide
        <span class="docs-link" @click="openAwsDocs()">here</span>
      </h4>
    </div>
  </div>
</template>

<script>
import ufo from "./graphics/UFO";

export default {
  components: {
    ufo,
  },
  methods: {
    openAwsDocs() {
      const url =
        "https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html";

      require("electron").shell.openExternal(url);
    },
  },
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: row;
}

.ufo-container {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.docs-link {
    text-decoration: underline;
    color: #11998e;
    transition: 0.5s;
}

.docs-link:hover {
    cursor: pointer;
    color: #17c7b8;
}
</style>
