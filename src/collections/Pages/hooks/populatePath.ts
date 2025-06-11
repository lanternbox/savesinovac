import { FieldHook } from "payload";
import { generatePath } from "@/utils/generatePath";

const populatePath: FieldHook = async ({ data, originalDoc }) =>
  generatePath(data?.breadcrumbs || originalDoc?.breadcrumbs);

export default populatePath;
