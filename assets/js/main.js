const animationContainer = document.getElementById("loading-animation");

const getTargetUrls = () => {
  if (!window.redirectConfig) {
    return [];
  }

  if (Array.isArray(window.redirectConfig.targetUrls)) {
    return window.redirectConfig.targetUrls.filter(
      (url) => typeof url === "string" && url.trim().length > 0
    );
  }

  if (typeof window.redirectConfig.targetUrl === "string") {
    return [window.redirectConfig.targetUrl];
  }

  return [];
};

const targetUrls = getTargetUrls();

const targetUrlList = document.getElementById("target-url-list");
const cancelLink = document.getElementById("cancel-link");
const canonicalLink = document.getElementById("canonical-link");

const formatDisplayUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.hostname}${parsedUrl.pathname}`.replace(/\/$/, "");
  } catch (error) {
    return url.replace(/^https?:\/\//, "");
  }
};

if (canonicalLink && targetUrls.length > 0) {
  canonicalLink.setAttribute("href", targetUrls[0]);
}

if (targetUrlList && targetUrls.length > 0) {
  targetUrls.forEach((url) => {
    const link = document.createElement("a");
    link.className = "button";
    link.href = url;
    link.rel = "noopener noreferrer";
    link.textContent = formatDisplayUrl(url);

    if (cancelLink && cancelLink.parentElement === targetUrlList) {
      targetUrlList.insertBefore(link, cancelLink);
    } else {
      targetUrlList.appendChild(link);
    }
  });
}

if (animationContainer && window.lottie) {
  window.lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "loading.json",
  });
}
