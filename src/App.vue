<template>
  <div id="app">
    <titleBar />
    <div class="top-controls">
      <navMenu />
      <regionSelector />
    </div>
    <!--keep-alive so that ssh sessions aren't lost when visiting settings etc-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import navMenu from "./components/HamburgerMenu";
import regionSelector from "./components/RegionSelector.vue";
import titleBar from "./components/TitleBar";

export default {
  name: "sshec2",
  components: {
    navMenu,
    regionSelector,
    titleBar,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #232323;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
}

.top-controls {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  width: 80vw;
}
</style>
