import { generateCommonMetadata } from "@/utils/metadata";
import { generateStaticParams as generateParams } from "@/utils/generateStaticParams";
import { getItemData } from "@/utils/getItemData";
import { redirect } from "next/navigation";

// added block imports
import { Footer } from "@/blocks/Footer";
import { HomeBlocksDs } from "@/blocks/HomeBlocksDs";
import { HomeHeader } from "@/blocks/HomeHeader";
import { HomeIntro } from "@/blocks/HomeIntro";
import { HomeResourcesDs } from "@/blocks/HomeResourcesDs";
import { Navbar } from "@/blocks/Navbar";
// end added block imports

const blockComponents = {
  // added block component names
  Footer,
  HomeBlocksDs,
  HomeHeader,
  HomeIntro,
  HomeResourcesDs,
  Navbar,
  // end added block component names
};

export async function generateStaticParams() {
  const params = await generateParams("pages");
  return params.map((param) => ({
    ...param,
    slug: param.path ? param.path.split("/").filter(Boolean) : [],
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  // const locale = resolvedParams.locale;
  const locale = "zh";
  const slugArray = resolvedParams.slug;
  let slug = slugArray?.[slugArray.length - 1];
  if (!slug) {
    slug = "home";
  }
  const item = await getItemData("pages", {
    slug,
    locale,
  });
  return generateCommonMetadata(item, locale);
}

export default async function PagesTemplate({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = "zh";

  // Join the slug array back into a path and ensure it starts with /
  const fullPath = slug?.length ? `/${slug.join("/")}` : "/";
  const item = await getItemData("pages", { path: fullPath, locale });

  if (item.redirectTo) {
    redirect(`/${item.redirectTo.value.path}`);
  }

  return (
    <>
      {item.content.map((block) => {
        const Component = blockComponents[block.blockType];
        return Component ? (
          <Component
            key={block.id}
            block={block}
            locale={resolvedParams.locale}
          />
        ) : null;
      })}
    </>
  );
}
