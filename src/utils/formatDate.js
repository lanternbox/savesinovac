import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

export const formatDate = (dateString, locale) => {
  try {
    const date = parseISO(dateString);
    if (locale === "zh") {
      return format(date, "yyyy年M月dd日", { locale: zhCN });
    } else {
      return format(date, "d MMM yyyy");
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if parsing fails
  }
};
