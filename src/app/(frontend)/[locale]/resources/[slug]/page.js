import { generateCommonMetadata } from "@/utils/metadata";
import { generateStaticParams as generateParams } from "@/utils/generateStaticParams";
import { getItemData } from "@/utils/getItemData";


export async function generateStaticParams() {
  return generateParams("resources");
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("resources", resolvedParams);
  return generateCommonMetadata(item);
}

export default async function ResourcesTemplate({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("resources", resolvedParams);
  const locale = resolvedParams.locale;

  return (
    <>
      <h1>{item.name}</h1>
    </>
  );
}