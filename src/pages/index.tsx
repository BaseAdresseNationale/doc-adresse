import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomePage from "../components/HomePage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Documentation officielle de la Base Adresse Locale (BAL) et de l'outil Mes Adresses, pour les communes et leurs partenaires."
    >
      <HomePage />
    </Layout>
  );
}
