import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ---- Primary Meta ---- */}
        <title>Rashad Naghiyev — Head of Loyalty Platform | bp (Mobility & Convenience)</title>
        <meta
          name="description"
          content="Head of Loyalty Platform at bp (Mobility & Convenience). Leading Product, Engineering, and Operations delivery globally — across the US, Europe, Australia–New Zealand, South Africa, and Mexico."
        />
        <meta
          name="keywords"
          content="Head of Loyalty Platform, Product Lead, Engineering Lead, Software Development Manager, bp Mobility & Convenience, Loyalty Platform, Budapest, Rashad Naghiyev, Global Technology Leadership"
        />
        <meta name="author" content="Rashad Naghiyev" />

        {/* ---- Open Graph / Facebook ---- */}
        <meta
          property="og:title"
          content="Rashad Naghiyev — Head of Loyalty Platform | bp (Mobility & Convenience)"
        />
        <meta
          property="og:description"
          content="Global Product & Engineering leader for bp’s Loyalty Platform Technology — driving technology, product strategy, and operations across multiple regions worldwide."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rashad-dev.netlify.app/" />
        <meta
          property="og:image"
          content="https://rashad-dev.netlify.app/images/rashad-profile.jpg"
        />

        {/* ---- Twitter ---- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Rashad Naghiyev — Head of Loyalty Platform Technology | bp (Mobility & Convenience)"
        />
        <meta
          name="twitter:description"
          content="Head of Loyalty Platform Technology at bp — owning Product, Engineering & Operations globally."
        />
        <meta
          name="twitter:image"
          content="https://rashad-dev.netlify.app/images/rashad-profile.jpg"
        />

        {/* ---- Theme / Favicon ---- */}
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
