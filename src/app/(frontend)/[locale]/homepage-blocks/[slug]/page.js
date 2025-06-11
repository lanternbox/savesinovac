import { generateCommonMetadata } from "@/utils/metadata";
import { generateStaticParams as generateParams } from "@/utils/generateStaticParams";
import { getItemData } from "@/utils/getItemData";


export async function generateStaticParams() {
  return generateParams("homepage-blocks");
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("homepage-blocks", resolvedParams);
  return generateCommonMetadata(item);
}

export default async function HomepageBlocksTemplate({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("homepage-blocks", resolvedParams);
  const locale = resolvedParams.locale;

  return (
    <>
      <h1>{item.name}</h1>
    </>
  );
}