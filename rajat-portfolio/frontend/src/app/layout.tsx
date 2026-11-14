import "../styles/globals.css";
import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { ThemeProvider } from "../context/ThemeContext";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans",
});

const siteUrl = "https://rajat-portfolio-ten.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rajat Khandelwal | Lead AI Engineer & Full-Stack Architect",
    template: "%s | Rajat Khandelwal",
  },
  description:
    "Lead AI Engineer with 5+ years of experience designing multi-agent LangGraph workflows, Microsoft Agent Framework architectures, enterprise RAG pipelines on Azure Cloud, and 3 live Google Play Store applications.",
  keywords: [
    "Rajat Khandelwal",
    "Lead AI Engineer",
    "Agentic AI",
    "LangGraph",
    "Microsoft Agent Framework",
    "Azure AI Search",
    "Azure OpenAI",
    "Claude Certified Architect",
    "Azure AI Engineer AI-102",
    "Enterprise RAG",
    "Full Stack Developer",
    "FastAPI",
    "React",
    "TypeScript",
    "Next.js 15",
    "DeepDisk",
    "Vaulet",
    "WhiteFrame",
    "Mobile Architect",
    "Flutter",
    "Native Android Kotlin",
    "Jetpack Compose",
    "TCS AI Engineer",
    "Enbridge EOL Agent",
    "Exelon ITIS Agent",
    "Outokumpu Chatbot",
  ],
  authors: [{ name: "Rajat Khandelwal", url: siteUrl }],
  creator: "Rajat Khandelwal",
  publisher: "Rajat Khandelwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Rajat Khandelwal | Lead AI Engineer & Full-Stack Architect",
    description:
      "Lead AI Engineer with 5+ years of experience in Multi-Agent LangGraph workflows, Microsoft Agent Framework, Azure Cloud, and 3 live Google Play Store applications.",
    siteName: "Rajat Khandelwal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajat Khandelwal | Lead AI Engineer & Full-Stack Architect",
    description:
      "Lead AI Engineer specializing in Agentic AI, LangGraph, Azure Cloud, Enterprise RAG, and Mobile Architecture.",
    creator: "@rajatkhandelwal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6155fbd8ff7c1e86",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rajat Khandelwal",
      givenName: "Rajat",
      familyName: "Khandelwal",
      gender: "Male",
      url: siteUrl,
      jobTitle: "Lead AI Engineer & Full-Stack Architect",
      worksFor: {
        "@type": "Organization",
        name: "Tata Consultancy Services",
      },
      sameAs: [
        "https://linkedin.com/in/rajatkhandelwal27",
        "https://github.com/rajatkhandelwal191",
        "https://www.credly.com/users/rajat-khandelwal.b764d962",
        "https://play.google.com/store/apps/details?id=com.cloudcubit.deepdisk",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Agentic AI",
        "LangGraph",
        "Microsoft Agent Framework",
        "Enterprise RAG",
        "Azure Cloud Infrastructure",
        "FastAPI",
        "React",
        "TypeScript",
        "Flutter",
        "Native Android Development",
        "Kotlin",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rajat Khandelwal Portfolio",
      description: "AI Portfolio & Agentic RAG Platform for Rajat Khandelwal",
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="author" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={publicSans.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
