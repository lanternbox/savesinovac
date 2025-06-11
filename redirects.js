const redirects = async () => {
  const internetExplorerRedirect = {
    destination: "/ie-incompatible.html",
    has: [
      {
        type: "header",
        key: "user-agent",
        value: "(.*Trident.*)", // all ie browsers
      },
    ],
    permanent: false,
    source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
  };

  // const blankToEn = {
  //   source: "/",
  //   destination: "/en",
  //   permanent: true,
  // };

  // const growthToTeam = {
  //   source: "/:locale/growth",
  //   destination: "/:locale/growth/team",
  //   permanent: true,
  // };

  // const newsToPress = {
  //   source: "/:locale/news",
  //   destination: "/:locale/news/press",
  //   permanent: true,
  // };

  const redirects = [
    internetExplorerRedirect,
    // blankToEn,
    // growthToTeam,
    // newsToPress,
  ];

  return redirects;
};

export default redirects;
