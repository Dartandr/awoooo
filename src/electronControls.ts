const ipc = window.require('electron').ipcRenderer;

const Controls = () => {
  const minBtn = document.getElementById('min-btn');
  const maxBtn = document.getElementById('max-btn');
  const closeBtn = document.getElementById('close-btn');
  minBtn.addEventListener('click', () => {
    ipc.send('min');
  });
  maxBtn.addEventListener('click', () => {
    ipc.send('max');
  });
  closeBtn.addEventListener('click', () => {
		ipc.send('close');
  });
};

export default Controls;
