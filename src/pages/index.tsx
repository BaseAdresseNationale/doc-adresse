import { useEffect, type ReactNode } from "react";
import Layout from "@theme/Layout";
import HomePage from "../components/HomePage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { BALWidgetProvider } from "../contexts/BALWidget.context";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  // Trigger search if query params "q" is set
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q");
    const searchButton = document.querySelector(
      ".DocSearch-Button"
    ) as HTMLButtonElement | null;

    if (searchButton && query !== null) {
      searchButton.click();
    }
  }, []);

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
