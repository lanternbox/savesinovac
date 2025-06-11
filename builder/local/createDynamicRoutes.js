import fs from "fs";
import path from "path";

const createDynamicRoutes = async () => {
  const pagesDir = path.resolve("data/pages");
  const pagesFilePath = path.join(pagesDir, "pages.json");
  const appDir = path.resolve("src/app/(frontend)/[locale]");

  // Read the pages.json file
  const pagesData = JSON.parse(fs.readFileSync(pagesFilePath, "utf8"));

  // Create dynamic pages
  for (const page of pagesData.templatePages) {
    if (page.openGraph?.title?.toLowerCase() === "skip") {
      continue;
    }

    const pageDir = path.join(
      appDir,
      page.slug.replace("detail_", ""),
      "[slug]",
    );
    const pageFilePath = path.join(pageDir, "page.js");

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const collectionSlug = page.slug.replace("detail_", "");
    const componentName = page.title.replace(/\s+/g, "");

    let imports = "";
    let components = "";

    if (page.openGraph && page.openGraph.description) {
      const componentNames = page.openGraph.description
        .split(",")
        .map((name) => name.trim());
      imports = componentNames
        .map((name) => `import { ${name} } from "@/blocks/${name}";`)
        .join("\n");
      components = componentNames
        .map((name) => `<${name} item={item} locale={locale} />`)
        .join("\n      ");
    }

    const pageContent = `
import { generateCommonMetadata } from "@/utils/metadata";
import { generateStaticParams as generateParams } from "@/utils/generateStaticParams";
import { getItemData } from "@/utils/getItemData";
${imports}

export async function generateStaticParams() {
  return generateParams("${collectionSlug}");
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("${collectionSlug}", resolvedParams);
  return generateCommonMetadata(item);
}

export default async function ${componentName}({ params }) {
  const resolvedParams = await params;
  const item = await getItemData("${collectionSlug}", resolvedParams);
  const locale = resolvedParams.locale;

  return (
    <>
      ${components || `<h1>{item.name}</h1>`}
    </>
  );
}
`;

    fs.writeFileSync(pageFilePath, pageContent.trim());
    console.log(`Created dynamic page: ${pageFilePath}`);
  }
};

createDynamicRoutes();
