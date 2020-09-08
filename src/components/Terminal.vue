<template>
  <div class="xterm-container">
    <button v-on:click="exitClick()">Exit</button>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.css" integrity="sha512-iLYuqv+v/P4u9erpk+KM83Ioe/l7SEmr7wB6g+Kg1qmEit8EShDKnKtLHlv2QXUp7GGJhmqDI+1PhJYLTsfb8w==" crossorigin="anonymous" />
    <div id="xterm"></div>
  </div>
</template>
<script>
import { FitAddon } from 'xterm-addon-fit';

export default {
  props: ['startCommand'],
  methods: {
    exitClick() {
      this.$emit('terminal-end');
    },
  },
  mounted() {
    const electron = require('electron');

    const os = electron.remote.require('os');
    const pty = electron.remote.require('node-pty');
    const { Terminal } = require('xterm');

    // Initialize node-pty with an appropriate shell
    const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 120,
      rows: 500,
      cwd: process.cwd(),
    });

    // Initialize xterm.js and attach it to the DOM
    const xterm = new Terminal();
    const fitAddon = new FitAddon();

    xterm.loadAddon(fitAddon);
    xterm.open(document.getElementById('xterm'));

    fitAddon.fit();

    window.addEventListener('resize', () => {
      fitAddon.fit();
    });

    // Setup communication between xterm.js and node-pty
    xterm.onData(data => ptyProcess.write(data));
    xterm.setOption('theme', { background: '#363535' });

    ptyProcess.on('data', (data) => {
      xterm.write(data);
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
.xterm-viewport::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #232323;
}

.xterm-viewport::-webkit-scrollbar
{
    width: 7px;
    background-color: #232323;
}

.xterm-viewport::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: rgb(17, 17, 17)
}

.xterm-container {
  width: 80vw;
}

#xterm {
  height: 80vh;
}
</style>