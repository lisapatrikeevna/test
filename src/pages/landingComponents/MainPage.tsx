import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Modal, styled } from '@mui/material';
import Home from './Home'; 
import Partners from './Partners.tsx';
import Pricing from './Pricing.tsx';
import Contacts from './Contacts';
import Footer from './Footer';
import Impressum from './Impressum';
import PrivacyPolicy from './PrivacyPolicy';
import Datenschutz from './Datenschutz';
import Cookies from './cookies/Cookies.tsx';
import ActiveSectionContext from "../../contexts/ActiveSectionContext.tsx";
import News from "./News.tsx";
import AboutUs from "./AboutUs.tsx";
import Project from './Project';
import Donate from "./Donate.tsx";

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
  minWidth: '100vw',
  scrollSnapType: 'x mandatory',
  overflow: 'hidden',
});

const Section = styled('div')({
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 0',
});

const SectionContent = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '65px',
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  maxHeight: '80vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  overflowY: 'auto',
  borderRadius: theme.shape.borderRadius,
}));

const MainPage = () => {
  const context = useContext(ActiveSectionContext);
  const [isImpressumModalOpen, setIsImpressumModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
  const [isDatenschutzModalOpen, setIsDatenschutzModalOpen] = useState(false);

  if (!context) {
    throw new Error('Header must be used within ActiveSectionContext');
  }
  const { activeSection, setActiveSection } = context;
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isImpressumModalOpen || isPrivacyPolicyModalOpen || isDatenschutzModalOpen) {
        return;
      }

      const sections = ["Home", "AboutUs", "Project", "Pricing", "Partners", "Contacts", "News", "Donate"];
      const currentIndex = sections.indexOf(activeSection as string);
      let newIndex = currentIndex;

      if (event.deltaY < 0) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      } else if (event.deltaY > 0) {
        newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : sections.length - 1;
      }

      setActiveSection(sections[newIndex]);

      const sectionElement = document.getElementById(sections[newIndex]);
      if (sectionElement !== null) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSection, isImpressumModalOpen, isPrivacyPolicyModalOpen, isDatenschutzModalOpen, setActiveSection]);

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
        <SectionContent maxWidth="xl">
          <Home />
        </SectionContent>
      </Section>
      <Section id="AboutUs">
        <SectionContent maxWidth="xl">
          <AboutUs />
        </SectionContent>
      </Section>
      <Section id="Project">
        <SectionContent maxWidth="xl">
          <Project />
        </SectionContent>
      </Section>
      <Section id="Pricing">
        <SectionContent maxWidth="xl">
          <Pricing />
        </SectionContent>
      </Section>
      <Section id="Partners">
        <SectionContent maxWidth="xl">
          <Partners />
        </SectionContent>
      </Section>
      <Section id="Contacts">
        <SectionContent maxWidth="xl">
          <Contacts />
        </SectionContent>
      </Section>
      <Section id="News">
        <SectionContent maxWidth="xl">
          <News />
        </SectionContent>
      </Section>
      <Section id="Donate">
        <SectionContent maxWidth="xl">
          <Donate />
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
        aria-labelledby="impressum-modal"
        aria-describedby="impressum-modal-description"
      >
        <Box>
          <ModalContent sx={{ maxWidth: '500px' }}>
            <Impressum onClose={() => setIsImpressumModalOpen(false)} />
          </ModalContent>
        </Box>
      </Modal>
      <Modal
        open={isPrivacyPolicyModalOpen}
        onClose={() => setIsPrivacyPolicyModalOpen(false)}
        aria-labelledby="privacy-policy-modal"
        aria-describedby="privacy-policy-modal-description"
      >
        <Box>
          <ModalContent>
            <PrivacyPolicy />
          </ModalContent>
        </Box>
      </Modal>
      <Modal
        open={isDatenschutzModalOpen}
        onClose={() => setIsDatenschutzModalOpen(false)}
        aria-labelledby="datenschutz-modal"
        aria-describedby="datenschutz-modal-description"
      >
        <Box>
          <ModalContent>
            <Datenschutz />
          </ModalContent>
        </Box>
      </Modal>
      <Cookies />
    </PageContainer>
  );
};

export default MainPage;
