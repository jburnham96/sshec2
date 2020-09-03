<template>
  <div id="app">
    <titleBar />
    <div class="top-controls">
      <navMenu />
      <regionSelector />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import navMenu from './components/HamburgerMenu';
  import regionSelector from './components/RegionSelector.vue';
  import titleBar from './components/TitleBar';

  export default {
    name: 'sshec2',
    components: {
      navMenu,
      regionSelector,
      titleBar,
    },
  };
</script>

<style>
  .top-controls {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    width: 80vw;
  }
</style>
