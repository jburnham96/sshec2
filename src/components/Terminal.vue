<template>
  <div class="xterm-container">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css"
      integrity="sha512-iLYuqv+v/P4u9erpk+KM83Ioe/l7SEmr7wB6g+Kg1qmEit8EShDKnKtLHlv2QXUp7GGJhmqDI+1PhJYLTsfb8w=="
      crossorigin="anonymous"
    />
    <div :id="terminalIdFormed" class="xterm-terminal"></div>
  </div>
</template>
<script>
import { FitAddon } from "xterm-addon-fit";

export default {
  props: {
    startCommand: {
      type: String,
      required: false,
    },
    terminalId: {
      type: String,
      required: true,
    }
  },
  computed: {
    terminalIdFormed() {
      return `terminal-tab-${this.terminalId}`;
    },
  },
  mounted() {
    const electron = require("electron");

    const os = electron.remote.require("os");
    const pty = electron.remote.require("node-pty");
    const { Terminal } = require("xterm");

    // Initialize node-pty with an appropriate shell
    const shell = os.platform() === "win32" ? "powershell.exe" : "zsh";
    const ptyProcess = pty.spawn(shell, [], {
      cols: 120,
      rows: 500,
      cwd: process.cwd(),
    });

    // Initialize xterm.js and attach it to the DOM
    const xterm = new Terminal();
    const fitAddon = new FitAddon();

    xterm.loadAddon(fitAddon);
    xterm.open(document.getElementById(this.terminalIdFormed));

    fitAddon.fit();

    //TODO: Call this .fit() when the tab is selected
    window.addEventListener("resize", () => {
      fitAddon.fit();
    });

    // Setup communication between xterm.js and node-pty
    xterm.onData((data) => ptyProcess.write(data));
    xterm.setOption("theme", { background: "#232323" });

    ptyProcess.on("data", (data) => {
      xterm.write(data);
    });

    ptyProcess.on("exit", () => {
      this.$emit("terminal-exit", this.terminalId);
    })

    /*
      kill the terminal session to avoid dangling connections.

      extracting the ptyProcess into a component wide variable that can be accessed by
      the destroyed() method seems to cause a lot of problems within the node-pty
      library. Hooking into the event like so stops node-pty getting confused.
    */
    this.$once("hook:beforeDestroy", () => {
      ptyProcess.kill();
      xterm.dispose();
    });

    if (this.startCommand) {
      setTimeout(() => {
        ptyProcess.write(`${this.startCommand}\r`);
      }, 1000);
    }
  },
};
</script>
<style>
.xterm-viewport::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #232323;
}

.xterm-viewport::-webkit-scrollbar {
  width: 7px;
  background-color: #232323;
}

.xterm-viewport::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(17, 17, 17);
}

.xterm-container {
  width: 90vw;
  height: 80vh;
}

.xterm-terminal {
  height: 80vh;
}
</style>
