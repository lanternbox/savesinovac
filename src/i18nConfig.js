const i18nConfig = {
  locales: ["zh"],
  defaultLocale: "zh",
  prefixDefault: true,
  localeDetector: (request, config) => {
    // your custom locale detection logic
    return "zh";
  },
};

export default i18nConfig;
