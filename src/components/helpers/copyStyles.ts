const copyStyles = (sourceDoc: Document, targetDoc: Document): void => {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      const newStyleEl = sourceDoc.createElement('style');
      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });
      targetDoc.head.appendChild(newStyleEl);
    } else {
      const newLinkEl = sourceDoc.createElement('link');
      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
};

export default copyStyles;
