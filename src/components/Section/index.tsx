import { fr } from "@codegouvfr/react-dsfr";
import clsx from "clsx";

interface SectionProps {
  pageTitle?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Section({
  children,
  pageTitle,
  title,
  className,
  style = {},
}: SectionProps): React.ReactNode {
  return (
    <section className="fr-container-fluid" style={style}>
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
