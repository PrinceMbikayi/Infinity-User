import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const About = () => {
  return (
    <>
      <Meta title={"About Us"} />
      <BreadCrumb title="About Us" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <p>
                PROFILE DE L'ENTREPRISE L'ETS RITZ GLOBAL EST UNE ENTREPRISE
                OUVRANT EN RDC PROVINCE DU NORD - KIVU, VILLE DE GOMA, BOULEVARD
                KANYAMUHANGA QUARTIER LES VOLCANS N 032, DEPUIS LE 07 NOVEMBRE
                2002 A GOMA EST ENREGISTRÉ LE 17 JUILLET 2014 :
                CD/GOM/RCCM/14-A-00573(ANC NRC 2359), Nous fournissons les
                matériels informatiques communication Technologies ainsi que les
                meubles de Bureau
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
