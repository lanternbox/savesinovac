import "./fonts.css";
import "./globals.scss";
import "./globalsCustom.scss";
import "./relumeGlobalStyles.css";

// imports to uncomment
import "@/devlink/global.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { LinkRenderer, ImageRenderer } from "@/renderers";
import { Navbar } from "@/blocks/Navbar";
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
          {/* <div className="loaded-wrap">{children}</div> */}
          <Footer locale={locale} />
        </DevLinkProvider>
      </body>
    </html>
  );
}
