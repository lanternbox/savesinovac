import "./fonts.css";
import "./globals.scss";
import "./globalsCustom.scss";
import "./relumeGlobalStyles.css";

// imports to uncomment
import "@/devlink/global.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { LinkRenderer, ImageRenderer } from "@/renderers";
// import { NavbarG } from "@/blocks/NavbarG";
// import { NavbarG } from "../../../data/devlink/NavbarG";
// import { NavbarMobileG } from "@/blocks/NavbarMobileG";
// end imports to uncomment

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const { locale } = await params;

  return <div>Hello</div>;

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
          {/* <NavbarG locale={locale} /> */}
          {/* <NavbarMobileG locale={locale} /> */}
          <div className="loaded-wrap">{children}</div>
        </DevLinkProvider>
      </body>
    </html>
  );
}
