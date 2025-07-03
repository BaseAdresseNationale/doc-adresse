import { fr } from "@codegouvfr/react-dsfr";
import styles from "./styles.module.css";
import clsx from "clsx";

interface SectionProps {
  pageTitle?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({
  children,
  pageTitle,
  title,
  className,
}: SectionProps): React.ReactNode {
  return (
    <section className="fr-container-fluid">
      <div
        className={clsx("fr-container", className)}
        style={{
          padding: fr.spacing("3w"),
        }}
      >
        {pageTitle && <h1>{pageTitle}</h1>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
