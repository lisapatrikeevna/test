import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Modal, styled } from '@mui/material';
import Home from './Home';
import Pricing from '../../components/Pricing.tsx';
import Contacts from './Contacts';
import Footer from './Footer';
import Impressum from './Impressum';
import PrivacyPolicy from './PrivacyPolicy';
import Datenschutz from './Datenschutz';
import Cookies from './cookies/Cookies.tsx';
import ActiveSectionContext from "../../contexts/ActiveSectionContext.tsx";
import News from "./News.tsx";
import AboutUs from "./AboutUs.tsx";

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
  minWidth: '100vw',
  scrollSnapType: 'x mandatory', // Setting the scrollSnapType value
  overflow: 'hidden', // Hiding scroll bars
});

const Section = styled('div')({
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 0', // Adjust padding as needed
});

const SectionContent = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // Add other styles as needed
});

const MainPage = () => {
  const context = useContext(ActiveSectionContext);
  const [isImpressumModalOpen, setIsImpressumModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
  const [isDatenschutzModalOpen, setIsDatenschutzModalOpen] = useState(false);
  const [isUserTermsModalOpen] = useState(false); // Declaration corrected here


  if (!context) {
    throw new Error('Header must be used within ActiveSectionContext');
  }
  const { activeSection, setActiveSection } = context;
  const location = useLocation(); // Removed duplicate declaration

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isImpressumModalOpen || isPrivacyPolicyModalOpen || isDatenschutzModalOpen) {
        return;
      }

      const sections = ["Home", "Pricing", "News", "Contacts"]; // remove “News” since it's missing from the code
      const currentIndex = sections.indexOf(activeSection as string);
      let newIndex = currentIndex;

      if (event.deltaY < 0) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      }
      else if (event.deltaY > 0) {
        newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : sections.length - 1;
      }

      setActiveSection(sections[newIndex]);

      const sectionElement = document.getElementById(sections[newIndex]);
      if (sectionElement !== null) {
        // Scroll to the next or previous section depending on the scroll direction
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    };



    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSection, isImpressumModalOpen, isPrivacyPolicyModalOpen, isDatenschutzModalOpen, isUserTermsModalOpen, setActiveSection]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  return (
      <PageContainer>
        <Section id="Home">
          <SectionContent maxWidth="lg">
            <Home />
          </SectionContent>
        </Section>
        <Section id="Pricing">
          <SectionContent maxWidth="lg">
            <Pricing />
          </SectionContent>
        </Section>
        <Section id="News">
          <SectionContent maxWidth="lg">
            <News />
          </SectionContent>
        </Section>
        <Section id="Contacts">
          <SectionContent maxWidth="lg">
            <Contacts />
          </SectionContent>
        </Section>
        <Section id="AboutUs">
          <SectionContent maxWidth="lg">
            <AboutUs />
          </SectionContent>
        </Section>
        <Footer
            onImpressumClick={() => setIsImpressumModalOpen(true)}
            onPrivacyPolicyClick={() => setIsPrivacyPolicyModalOpen(true)}
            onDatenschutzClick={() => setIsDatenschutzModalOpen(true)}
        />
        <Modal
            open={isImpressumModalOpen}
            onClose={() => setIsImpressumModalOpen(false)}
            // Add modal styles
        >
          <Box>
            <Impressum />
          </Box>
        </Modal>
        <Modal open={isPrivacyPolicyModalOpen}
               onClose={() => setIsPrivacyPolicyModalOpen(false)}>
          <PrivacyPolicy/>
        </Modal>
        <Modal open={isDatenschutzModalOpen}
               onClose={() => setIsDatenschutzModalOpen(false)}>
          <Datenschutz/>
        </Modal>
        <Modal open={isDatenschutzModalOpen}
               onClose={() => setIsDatenschutzModalOpen(false)}>
          <Datenschutz/>
        </Modal>
        {/*<Modal isOpen={isUserTermsModalOpen}*/}
        {/*       onClose={() => setIsUserTermsModalOpen(false)}*/}
        {/*       width={"80vw"}*/}
        {/*       height={"80vh"}>*/}
        {/*    <UserTerms/>*/}
        {/*</Modal>*/}
        <Cookies />
      </PageContainer>
  );
};

export default MainPage;