const progressBar = (progress: HTMLElement, scrollElement: HTMLElement): void => {
  const scrollTop = scrollElement.scrollTop;
  const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
  const percent = (scrollTop / scrollHeight) * 100;
  progress.style.width = percent + '%';
  if (percent === 100) {
    progress.style.borderRadius = '0';
  } else {
    progress.style.borderRadius = '0 2px 2px 0';
  }
};

export default progressBar;
