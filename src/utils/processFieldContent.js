import { formatDate } from "@/utils/formatDate";
import { RichText } from "@payloadcms/richtext-lexical/react";

// Hard-coded translation function
function translate(text, locale) {
  const translations = {
    en: {
      "More ": "More",
      More: "More",
      "Learn More": "Learn More",
      submit: "submit",
      "Investment strategy": "Investment Strategy",
      Team: "Team",
      "Member Profile": "Member Profile",
      News: "News",
      "Learn More": "Learn More",
    },
    zh: {
      "More ": "更多",
      More: "更多",
      "Learn More": "了解更多",
      submit: "提交",
      "Investment strategy": "投资策略",
      Team: "团队",
      "Member Profile": "成员简介",
      News: "新闻",
      "Learn More": "了解更多",
    },
  };

  return translations[locale]?.[text] || text;
}

export function processFieldContent(fieldName, item, locale) {
  const lowerFieldName = fieldName.toLowerCase().replace(/\s+/g, "_");
  const fieldValue = item[lowerFieldName];

  // Special cases for translation
  const translatedValue = translate(fieldName, locale);
  if (translatedValue !== fieldName) {
    return translatedValue;
  }

  // just a string, not a field
  if (fieldValue === undefined) {
    return fieldName;
  }

  // if null, return null
  if (fieldValue === null) {
    return null;
  }

  // payload rich text
  if (typeof fieldValue === "object" && fieldValue !== null) {
    return <RichText data={fieldValue} />;
  }

  // date field
  if (isValidISODate(fieldValue)) {
    return formatDate(fieldValue, locale);
  }

  // field value is string
  if (typeof fieldValue === "string") {
    // check if it's an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(fieldValue)) {
      return <a href={`mailto:${fieldValue}`}>{fieldValue}</a>;
    }
    // else string
    return fieldValue;
  }

  // any other possibilities?
  return fieldName;
}

function isValidISODate(dateString) {
  if (typeof dateString !== "string") return false;
  const date = new Date(dateString);
  return (
    date instanceof Date && !isNaN(date) && dateString === date.toISOString()
  );
}
