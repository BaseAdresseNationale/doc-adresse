import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomePage from "../components/HomePage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { BALWidgetProvider } from "../contexts/BALWidget.context";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <BALWidgetProvider>
      <Layout
        title={siteConfig.title}
        description="Documentation officielle de la Base Adresse Locale (BAL) et de l'outil Mes Adresses, pour les communes et leurs partenaires."
      >
        <HomePage />
      </Layout>
    </BALWidgetProvider>
  );
}
