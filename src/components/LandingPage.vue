<template>
  <div>
    <div class="wrapper">
      <div class="tabs-list">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="`tab ${tab.active ? 'is-active' : ''}`"
          @click="selectTab(tab.id)"
          @click.middle="removeTab(tab.id)"
        >
          <font-awesome-icon
            v-if="tab.type === 'terminal'"
            class="icon"
            icon="terminal"
          />
          <a :href="tab.href" class="tab-text"
            >{{ tab.name }}
            <font-awesome-icon
              v-if="tab.type === 'terminal'"
              class="icon icon-close"
              icon="times-circle"
              @click.stop="removeTab(tab.id)"
          /></a>
        </div>
      </div>
      <div
        v-for="tab in tabs"
        :key="tab.id + 'tabcontent'"
        v-show="tab.active"
        class="tab-container"
      >
        <div v-if="tab.type === 'search'" class="tab-content">
          <search v-on:list-item-clicked="itemClicked" />
        </div>
        <div v-if="tab.type === 'terminal'">
          <terminal
            :terminalId="tab.id"
            :startCommand="getTerminalStartCommand(tab.ipAddress)"
            v-on:terminal-exit="removeTab"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { v4: uuidv4 } = require("uuid");
import search from "./Search.vue";
import terminal from "./Terminal.vue";
import { mapGetters } from "vuex";

export default {
  name: "landing-page",
  data: () => ({
    tabs: [],
    searchTabId: "",
    searchDeleteCount: 0,
  }),
  components: {
    search,
    terminal,
  },
  computed: {
    ...mapGetters(["defaultFsKeyLocation", "defaultUsername", "strictHostKeyChecking"]),
  },
  created() {
    this.searchTabId = uuidv4();
    this.tabs.push({
      id: this.searchTabId,
      name: "Search",
      type: "search",
      active: true,
    });
  },
  methods: {
    itemClicked(selectedItem) {
      if(selectedItem.ipAddress) {
        this.disableAllTabs();

        this.tabs.push({
          id: uuidv4(),
          name: selectedItem.name,
          type: "terminal",
          ipAddress: selectedItem.ipAddress,
          active: true,
        });
      }
    },
    selectTab(tabId) {
      this.disableAllTabs();

      const tabIndex = this.getTabIndexFromId(tabId);
      this.tabs[tabIndex].active = true;
    },
    disableAllTabs() {
      this.tabs.forEach((tab, index, arr) => {
        arr[index].active = false;
      });
    },
    removeTab(tabId) {
      if (tabId === this.searchTabId) {
        this.searchDeleteCount += 1;

        if (this.searchDeleteCount === 20) {
          this.tabs[this.getTabIndexFromId(this.searchTabId)].name += " 😢";
        }

        return;
      }

      this.tabs.splice(this.getTabIndexFromId(tabId), 1);
      this.selectTab(this.searchTabId);
    },
    getTabIndexFromId(tabId) {
      return this.tabs.findIndex((tab) => tab.id === tabId);
    },
    getTerminalStartCommand(ipAddress) {
      return `ssh -i ${this.defaultFsKeyLocation}${this.strictHostKeyChecking ? '' : ' -o StrictHostKeyChecking=no'} ${this.defaultUsername ? `${this.defaultUsername}@` : ''}${ipAddress}`
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

.wrapper {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.tab-container {
  min-height: 70vh;
  min-width: 90vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.tab-content {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.tabs-list {
  margin-top: 49px;
  align-self: flex-start;
  margin-left: 130px;
  max-width: 83%;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  padding-bottom: 8px;
  white-space: nowrap;
}

.tabs-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #232323;
}

.tabs-list::-webkit-scrollbar {
  width: 7px;
  height: 3px;
  background-color: #232323;
}

.tabs-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(17, 17, 17);
}

.tab {
  color: rgb(77, 77, 77);
  margin-left: 25px;
  transition: 0.5s;
}

.tab:hover {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #929292;
  color: #929292;
  cursor: pointer;
}

.tab.is-active {
  color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}

.tab-text {
  font-size: 18px;
}

.icon {
  margin-right: 4px;
  font-size: 14px;
}

.icon-close {
  margin-left: 4px;
  margin-bottom: 1px;
  color: inherit;
}

.icon-close:hover {
  color: #949494;
  transition: 0.5s;
}
</style>
