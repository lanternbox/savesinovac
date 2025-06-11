import { FieldHook } from "payload";
import { generateFullTitle } from "@/utils/generateFullTitle";

const populateFullTitle: FieldHook = async ({ data, originalDoc }) =>
  generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);

export default populateFullTitle;
