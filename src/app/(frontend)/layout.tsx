// import "@/styles/fonts.css";
import "@/devlink/global.css";
// import "@/styles/relumeGlobalStyles.css";
// import "@/styles/styleGuide.css";
// import "@/styles/tailwindShadcn.scss";
import "@/styles/custom.scss";

import Script from "next/script";

import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { LinkRenderer, ImageRenderer } from "@/renderers";

// imports to uncomment
import { Navbar } from "@/blocks/Navbar";
import { NavbarSpacer } from "@/blocks/NavbarSpacer";
import { Footer } from "@/blocks/Footer";
// end imports to uncomment

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  const { locale } = await params;
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        {/* {adobeTypekitId && (
          <link
            rel="stylesheet"
            href={`https://use.typekit.net/${adobeTypekitId}.css`}
          />
        )} */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        <link href="/favicon.png" rel="icon" type="image/png" />
      </head>
      <body>
        <DevLinkProvider renderLink={LinkRenderer} renderImage={ImageRenderer}>
          <Navbar locale={locale} />
          <NavbarSpacer />
          <div className="loaded-wrap">{children}</div>
          <Footer locale={locale} />
        </DevLinkProvider>
      </body>
    </html>
  );
}
