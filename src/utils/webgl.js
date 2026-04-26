export const isWebGLSupported = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

export const isBot = () => {
  if (typeof navigator === "undefined") return true;
  const botPattern = /bot|googlebot|crawler|spider|robot|crawling/i;
  return botPattern.test(navigator.userAgent);
};
