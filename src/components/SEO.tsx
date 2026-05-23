import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  page?: string;
}

// Page-specific SEO configurations
const PAGE_SEO: Record<string, { keywords: string; schemaType: string; schemaName: string }> = {
  '': {
    keywords: 'Integer.IO Tech, Integer.IO, Integer IO tech company, integerio.com, IT company Madurai, web development Madurai, AI automation Madurai, React development Tamil Nadu, SaaS products India, digital transformation Madurai, AI chatbot development, software company Madurai, Thirunagar IT company, best web developer Madurai, Kawin MS, Hemanth K, Livan MG, web development company Tamil Nadu, app development Madurai, full stack development India, startup software solutions, business automation Tamil Nadu',
    schemaType: 'WebPage',
    schemaName: 'Home',
  },
  about: {
    keywords: 'Integer.IO Tech team, about Integer IO, IT company founders Madurai, Kawin MS Integer IO CEO, Hemanth K Integer IO COO, Livan MG Integer IO CMO, software company team Tamil Nadu, digital solutions provider Madurai, web development experts, AI company about us, IT startup Madurai 2024',
    schemaType: 'AboutPage',
    schemaName: 'About Us',
  },
  services: {
    keywords: 'web development services Madurai, AI automation services Tamil Nadu, SaaS development company, custom software development India, digital marketing Madurai, branding services Tamil Nadu, final year projects Madurai, cloud deployment services, student project help Tamil Nadu, React development services, Node.js development, ERP software Madurai, billing software development, CRM development India',
    schemaType: 'WebPage',
    schemaName: 'Services',
  },
  products: {
    keywords: 'Chatz.IO AI chatbot, Integer IO SaaS products, AI student assistant, Dips IO image generation, CRM project portal, IT products Madurai, SaaS platform Tamil Nadu, AI software products India, web app products Integer IO',
    schemaType: 'WebPage',
    schemaName: 'Products',
  },
  projects: {
    keywords: 'Integer IO projects portfolio, final year projects Madurai, student projects Tamil Nadu, AI ML projects, web development portfolio, React projects, data science projects, B.Tech final year project, MCA projects Madurai, computer science projects Tamil Nadu, project download, FYP portfolio',
    schemaType: 'WebPage',
    schemaName: 'Projects',
  },
  contact: {
    keywords: 'contact Integer IO, Integer IO phone number, Integer IO email, IT company contact Madurai, hire web developer Madurai, get quote web development Tamil Nadu, web development enquiry, WhatsApp Integer IO, software company contact Tamil Nadu',
    schemaType: 'ContactPage',
    schemaName: 'Contact Us',
  },
  careers: {
    keywords: 'Integer IO careers, jobs at Integer IO Madurai, IT jobs Tamil Nadu, software developer jobs Madurai, web developer jobs, AI developer jobs Tamil Nadu, IT company hiring Madurai, tech jobs Tamil Nadu 2025',
    schemaType: 'WebPage',
    schemaName: 'Careers',
  },
  privacy: {
    keywords: 'Integer IO privacy policy, data protection Integer IO, privacy policy IT company Madurai, user data security Integer IO',
    schemaType: 'WebPage',
    schemaName: 'Privacy Policy',
  },
  terms: {
    keywords: 'Integer IO terms of service, terms and conditions IT company, Integer IO legal, service agreement Integer IO Madurai',
    schemaType: 'WebPage',
    schemaName: 'Terms of Service',
  },
};

const BASE_URL = 'https://www.integerio.com';
const OG_IMAGE = 'https://www.integerio.com/og-image.webp';

const SEO: React.FC<SEOProps> = ({
  title = "Integer.IO Tech | AI Automation & Web Development Company in Madurai, Coimbatore & Chennai",
  description = "Integer.IO Tech is a leading software tech company in Madurai specializing in AI automation, SaaS products, and web development. Founded by Kawin M.S, our expert team (including Hemanth K and Livan M.G) provides business automation, custom software, digital transformation, and final year projects across India.",
  keywords,
  image = OG_IMAGE,
  url = BASE_URL,
  page = ""
}) => {
  const fullUrl = page ? `${BASE_URL}/${page}` : BASE_URL;
  const pageConfig = PAGE_SEO[page] ?? PAGE_SEO[''];
  const finalKeywords = keywords ?? pageConfig.keywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Kawin M.S. - Integer.IO Tech" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Geo Meta Tags */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Madurai" />
      <meta name="geo.position" content="9.9252;78.1198" />
      <meta name="ICBM" content="9.9252, 78.1198" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Integer.IO Tech" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Technical */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#10b981" />
      <link rel="canonical" href={fullUrl} />

      {/* Page Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": pageConfig.schemaType,
          "name": title,
          "description": description,
          "url": fullUrl,
          "isPartOf": {
            "@type": "WebSite",
            "name": "Integer.IO Tech",
            "url": BASE_URL
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
              ...(page ? [{ "@type": "ListItem", "position": 2, "name": pageConfig.schemaName, "item": fullUrl }] : [])
            ]
          }
        })}
      </script>

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Integer.IO Tech",
          "alternateName": ["Integer IO", "Integer.IO Tech", "IntegerIO"],
          "description": "Professional web development, AI automation, SaaS products, digital marketing, and student project services based in Madurai, Tamil Nadu, India.",
          "url": BASE_URL,
          "logo": OG_IMAGE,
          "image": OG_IMAGE,
          "founder": {
            "@type": "Person",
            "name": "Kawin M.S.",
            "jobTitle": "CEO / Founder"
          },
          "employee": [
            {
              "@type": "Person",
              "name": "Kawin M.S.",
              "jobTitle": "CEO / Founder"
            },
            {
              "@type": "Person",
              "name": "Hemanth K",
              "jobTitle": "COO / Sales"
            },
            {
              "@type": "Person",
              "name": "Livan M.G",
              "jobTitle": "CMO / Relations"
            }
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thirunagar",
            "addressLocality": "Madurai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "625006",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8015355914",
            "contactType": "customer service",
            "email": "integer.io.ai@gmail.com",
            "availableLanguage": ["English", "Tamil"],
            "areaServed": "IN"
          },
          "sameAs": [
            "https://wa.me/918015355914",
            "https://www.linkedin.com/in/kawin-m-s-570961285/",
            "https://www.youtube.com/@integer-io",
            "https://www.facebook.com/profile.php?id=61588744035428"
          ],
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "numberOfEmployees": "3",
          "foundingDate": "2024",
          "knowsAbout": [
            "Web Application Development",
            "AI Product & Automation",
            "Custom Software & SaaS",
            "Digital Marketing & Branding",
            "Education & Student Services",
            "Cloud Deployment & Technical Support"
          ],
          "offers": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Application Development",
                "description": "Secure, scalable web solutions including static websites, dynamic web apps, admin dashboards, and API integrations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Product & Automation Services",
                "description": "Intelligent AI solutions including chatbots, voice assistants, NLP, computer vision, and process automation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Software & SaaS Development",
                "description": "Custom software and SaaS platforms including ERP That can include: Billing software, CRM, HR, Inventory, analytics dashboards, and business automation tools"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Digital Marketing & Branding",
                "description": "SEO optimization, social media marketing, video editing, logo design, and creative poster design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Education & Student Services",
                "description": "Final year projects, student portfolios, ATS-friendly resumes, project documentation, and career guidance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cloud Deployment & Technical Support",
                "description": "Cloud deployment, server configuration, website hosting, domain & SSL setup, and ongoing maintenance"
              }
            }
          ],
          "priceRange": "$$"
        })}
      </script>

      {/* LocalBusiness Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Integer.IO Tech",
          "image": OG_IMAGE,
          "description": "IT company in Madurai specializing in web development, AI automation, SaaS products, ERP That can include: Billing software, CRM, HR, Inventory, digital marketing, and student project services. Team led by Kawin M.S, Hemanth K, and Livan M.G.",
          "@id": BASE_URL,
          "url": BASE_URL,
          "telephone": "+91-8015355914",
          "email": "integer.io.ai@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thirunagar",
            "addressLocality": "Madurai",
            "addressRegion": "Tamil Nadu",
            "postalCode": "625006",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 9.9252,
            "longitude": 78.1198
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "priceRange": "$$",
          "serviceType": [
            "Web Application Development",
            "AI Automation & Chatbot Development",
            "Custom Software & SaaS Development",
            "Digital Marketing & Branding",
            "Final Year Student Projects",
            "Cloud Deployment & Technical Support"
          ]
        })}
      </script>

      {/* BreadcrumbList for Navigation */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
            { "@type": "ListItem", "position": 3, "name": "Products", "item": `${BASE_URL}/products` },
            { "@type": "ListItem", "position": 4, "name": "Projects", "item": `${BASE_URL}/projects` },
            { "@type": "ListItem", "position": 5, "name": "About", "item": `${BASE_URL}/about` },
            { "@type": "ListItem", "position": 6, "name": "Contact", "item": `${BASE_URL}/contact` },
            { "@type": "ListItem", "position": 7, "name": "Careers", "item": `${BASE_URL}/careers` }
          ]
        })}
      </script>
    </Helmet>

  );
};

export default SEO;
