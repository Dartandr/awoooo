const copyStyles = (sourceDoc: Document, targetDoc: Document): void => {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    const newLinkEl = sourceDoc.createElement('link');
    newLinkEl.rel = 'stylesheet';
    newLinkEl.href = styleSheet.href;
    targetDoc.head.appendChild(newLinkEl);
  });
};

export default copyStyles;
