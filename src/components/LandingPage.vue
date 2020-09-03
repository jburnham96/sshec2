<template>
<div>
  <div id="wrapper">
    <div class="tab-container">
        <div v-if="!terminalView" class="tab">
          <search v-on:list-item-clicked="itemClicked"/>
        </div>
        <div v-if="terminalView">
          <!--<terminal v-on:terminal-end="terminalEnded()" :startCommand="`ssh ${curIPAddress}`" />-->
        </div>
    </div>
  </div>
</div>

</template>

<script>
  import search from './Search.vue';
  // import terminal from './Terminal.vue';

  export default {
    name: 'landing-page',
    data: () => ({
      terminalView: false,
      curIPAddress: '',
    }),
    components: {
      search,
      // terminal,
    },
    methods: {
      itemClicked(ipAddress) {
        this.curIPAddress = ipAddress;
        this.terminalView = true;
      },
      terminalEnded() {
        this.terminalView = false;
      },
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    font-family: 'Poppins', sans-serif; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background-color:#222222;
  }

  .tab-container {
    min-height: 90vh;
    min-width: 90vw;
    justify-content: center;
    align-items:center;
    display: flex;
    flex-direction: column;
  }

  .tab {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
