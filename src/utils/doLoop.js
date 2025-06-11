export function doLoop() {
  let tabTimeout;
  let checkInterval;
  let tabLinks = [];

  function changeTab() {
    const tabsMenu = document.querySelector('.h_header [role="tablist"]');
    // console.log("tabsMenu", tabsMenu);
    const currentTab = tabsMenu.querySelector(
      '.h_header [aria-selected="true"]',
    );

    // console.log("currentTab", currentTab);
    let nextTab = currentTab ? currentTab.nextElementSibling : null;
    // console.log("nextTab", nextTab);

    if (nextTab) {
      nextTab.click();
    } else {
      const firstTab = tabsMenu.querySelector(".h_header [data-w-tab]");
      firstTab.click();
    }
  }

  function resetTimer() {
    clearTimeout(tabTimeout);
    tabTimeout = setTimeout(changeTab, 6000);
  }

  function addEventListeners() {
    tabLinks.forEach((link) => {
      link.addEventListener("click", resetTimer);
    });
  }

  function removeEventListeners() {
    tabLinks.forEach((link) => {
      link.removeEventListener("click", resetTimer);
    });
  }

  function checkForTabLinks() {
    checkInterval = setInterval(() => {
      const newTabLinks = document.querySelectorAll(".h_header [data-w-tab]");
      if (newTabLinks.length > 0) {
        clearInterval(checkInterval);
        tabLinks = Array.from(newTabLinks);
        addEventListeners();
        resetTimer();
      }
    }, 100);
  }

  checkForTabLinks();

  // Return a cleanup function
  return () => {
    clearTimeout(tabTimeout);
    clearInterval(checkInterval);
    removeEventListeners();
  };
}
