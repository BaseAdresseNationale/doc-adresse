import { useContext, type ReactNode } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import Section from "../Section";
import SectionTilesList from "../SectionTilesList";
import DownloadGuideCard from "../DownloadCard";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components.theme";
import { StyledPage } from "./index.styles";
import ShadowRoot from "react-shadow/styled-components";
import BALWidgetContext from "@site/src/contexts/BALWidget.context";
import DSFRStyleSheet from "!!raw-loader!../../../static/dsfr/dsfr.min.css";

const ressourcesData = [
  {
    title: "La documentation",
    description:
      "Cette documentation vous fournit les informations relatives à la Base Adresse Nationale, au format Base Adresse Locale, ainsi que des FAQ et conseils pratiques.",
    picto: "img/home-page/book.png",
    link: {
      href: "https://doc.adresse.data.gouv.fr/",
      target: "_self",
    },
  },
  {
    title: "Les guides",
    description:
      "Pour vous accompagner dans la gestion des adresses de votre commune, vous trouverez sur cette page des guides régulièrement mis à jour.",
    picto: "img/home-page/document-download.png",
    link: {
      href: "#guide-mes-adresses",
    },
  },
  {
    title: "La FAQ",
    description:
      "La F.A.Q répond aux questions les plus courantes, posées lors des webinaires par les acteurs de la commune.",
    picto: "img/home-page/community.png",
    link: {
      href: "https://adresse-data-gouv-fr.gitbook.io/faq",
      target: "_self",
    },
  },
];

export default function Home(): ReactNode {
  const { open, navigate } = useContext(BALWidgetContext);

  const handleOpenContactForm = () => {
    navigate("/commune/contact");
    open();
  };

  return (
    <ShadowRoot.main>
      <div className="root">
        <style type="text/css">{DSFRStyleSheet}</style>
        <ThemeProvider theme={theme}>
          <StyledPage>
            <Section pageTitle="Documentation Adresse">
              <div className="on-this-page">
                <div className="illustration-wrapper">
                  <img
                    src="img/home-page/ressources.png"
                    alt="Illustration ressources et documentations"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="text-wrapper">
                  <div>
                    <b>
                      Pour vous accompagner dans la gestion des adresses de
                      votre commune,
                    </b>{" "}
                    vous trouverez sur cette page:
                  </div>
                  <ul>
                    <li>
                      <b>Des guides</b>
                      <div>Régulièrement mis à jour.</div>
                    </li>
                    <li>
                      <b>La documentation</b>
                      <div>
                        Présentant la Base Adresse Nationale, les formats
                        d’adresse ainsi que les services et outils accessibles
                        sur le site.
                      </div>
                    </li>
                    <li>
                      <b>Une FAQ</b>
                      <div>Répondant aux questions les plus courantes.</div>
                    </li>
                  </ul>
                  <div className="logo-wrapper">
                    <img
                      src="img/home-page/logo-ban.png"
                      alt="Logo BAN"
                      className="ban-logo"
                    />
                    <img
                      src="img/home-page/logo-bal.png"
                      alt="Logo BAL"
                      className="bal-logo"
                    />
                  </div>
                </div>
              </div>
            </Section>
            <SectionTilesList data={ressourcesData} id="ressources-adressage" />
            <Section className="stay-tuned">
              <div>
                <div className="text-wrapper">
                  <i className="ri-information-line" />
                  <h2>Restez informés </h2>
                  <p>
                    Pour être tenu informé des mises à jour ou suggérer des
                    évolutions, n’hésitez-pas à nous contacter.
                  </p>
                  <Button onClick={handleOpenContactForm}>
                    Contactez nous
                  </Button>
                </div>
                <div className="illustration-wrapper">
                  <img
                    src="img/home-page/questions.png"
                    alt="Illustration restez informés"
                    style={{ width: 470 }}
                  />
                </div>
              </div>
            </Section>
            <Section
              className="guide-section"
              style={{ backgroundColor: "#F5F5FE" }}
            >
              <div>
                <div className="text-wrapper">
                  <div>
                    <h2>Le guide de &quot;Mes Adresses&quot;</h2>
                    <legend>Version 8.2 - 01/06/2023</legend>
                  </div>
                  <p>
                    &quot;Mes Adresses&quot; est un outil en ligne qui vous
                    permet de gérer simplement vos adresses, de la constitution
                    d’une Base Adresse Locale à sa mise à jour. Il est
                    accessible sans compétences techniques et dispose d’un
                    tutoriel embarqué.
                  </p>
                  <div className="buttons-wrapper">
                    <Button
                      linkProps={{
                        href: "https://guide.mes-adresses.data.gouv.fr/",
                      }}
                    >
                      Consulter en ligne
                    </Button>
                    <Button
                      priority="secondary"
                      onClick={() =>
                        window.open(
                          "img/home-page/guide-mes-adresses-v8.2.pdf",
                          "_blank"
                        )
                      }
                    >
                      Télécharger le guide
                    </Button>
                  </div>
                </div>
                <div className="illustration-wrapper">
                  <DownloadGuideCard
                    imgProps={{
                      src: "img/home-page/guide-mes-adresses.png",
                      alt: "Illustration guide Mes Adresses",
                      style: { width: 220, height: 300 },
                    }}
                    downloadlink="img/home-page/guide-bonnes-pratiques-v4.1.pdf"
                  />
                </div>
              </div>
            </Section>
            <Section className="guide-section">
              <div>
                <div className="illustration-wrapper">
                  <DownloadGuideCard
                    imgProps={{
                      src: "img/home-page/guide-bonnes-pratiques.png",
                      alt: "Illustration guide bonnes pratiques",
                      style: { width: 220, height: 300 },
                    }}
                    downloadlink="img/home-page/guide-mes-adresses-v8.2.pdf"
                  />
                </div>
                <div className="text-wrapper">
                  <div>
                    <h2>Le guide des bonnes pratiques</h2>
                    <b>à l’usage des communes et de leurs partenaires</b>
                    <legend>Version 4.1 - 08/09/2023</legend>
                  </div>
                  <p>
                    Les communes sont responsables de leurs adresses. Ce guide
                    passe en revue les bonnes pratiques pour nommer, numéroter
                    les voies et diffuser l’information en parfaite conformité
                    avec les obligations légales et rien que les obligations
                    légales.
                  </p>
                  <div className="buttons-wrapper">
                    <Button
                      linkProps={{
                        href: "https://guide-bonnes-pratiques.adresse.data.gouv.fr",
                      }}
                    >
                      Consulter en ligne
                    </Button>
                    <Button
                      priority="secondary"
                      onClick={() =>
                        window.open(
                          "img/home-page/guide-bonnes-pratiques-v4.1.pdf",
                          "_blank"
                        )
                      }
                    >
                      Télécharger le guide
                    </Button>
                  </div>
                </div>
              </div>
            </Section>
          </StyledPage>
        </ThemeProvider>
      </div>
    </ShadowRoot.main>
  );
}
