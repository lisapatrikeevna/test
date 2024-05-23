import { FC } from "react";
import { Typography, Box, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";
import NeuDivider from "../../components/neumorphism/divider/NeuDivider";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    height: '100%',
}));

const Datenschutz: FC = () => {
    return (
        <StyledBox>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                Information zum Datenschutz gemäß Art. 12, 13, 14 und 21 DSGVO
            </Typography>
            <Typography paragraph>
                Datenschutz und der Umgang mit Ihren persönlichen Daten sind uns sehr wichtig. Durch geeignete Maßnahmen und Vorkehrungen achten wir auf die Einhaltung des Datenschutzes und auf eine ordnungsgemäße Verarbeitung Ihrer personenbezogenen Daten.
            </Typography>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    1 Unsere Verpflichtung
                </Typography>
                <Typography paragraph>
                    Die Erhebung Ihrer persönlichen Daten zur Feststellung der Eignung erfolgt in Einzelgesprächen und ist somit geschützt. Wir verpflichten uns, alle Ihre uns zur Kenntnis gelangenden internen Angelegenheiten auch nach der Beendigung des Vertrages vertraulich zu behandeln. Mit den personenbezogenen Daten unserer Teilnehmer dürfen nur solche Mitarbeiter befasst werden, die zuvor auf die Wahrung des Datengeheimnisses verpflichtet worden sind. Freie Mitarbeiter und Mitarbeiter von Subunternehmen werden von uns in gleicher Weise verpflichtet.
                </Typography>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    2 Bei Fragen
                </Typography>
                <Typography paragraph>
                    zur Verarbeitung Ihrer Daten, können Sie sich jede Zeit an uns oder an unseren Datenschutzbeauftragten wenden.
                </Typography>
                <Typography>
                    <strong>Name des Verantwortlichen:</strong> Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten ist die Am Meisenberg 14, 51491 Overath
                </Typography>
                <Typography>
                    <strong>Datenschutzbeauftragte(r):</strong> Roman Snimshchikov, neox@it-assistent.eu, +491623067782
                </Typography>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography paragraph>
                    Der Datenschutzbeauftragte unterliegt keinerlei Weisungen, ist in seiner Stellung unabhängig und gesetzlich zur Wahrung der Geheimhaltung und Vertraulichkeit verpflichtet (Art. 38 DSGVO, § 38 BDSG), so dass Sie sich vertrauensvoll an diesen wenden können.
                </Typography>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    3 Zweckbestimmung und Rechtsgrundlage für die Datenverarbeitung
                </Typography>
                <Typography paragraph>
                    Im Rahmen unserer Projekte und Leistungsangebote verarbeiten wir Ihre personenbezogenen Daten zum Zwecke der Begründung, Durchführung und Beendigung eines Vertragsverhältnisses mit Ihnen. Die Rechtsgrundlage für die Verarbeitung Ihrer personenbezogenen Daten folgt aus:
                </Typography>
                <List>
                    <ListItem>
                        Vertrag (Art. 6 Abs. 1 lit. b) DSGVO),
                    </ListItem>
                    <ListItem>
                        Gesetzlicher Vorgaben (Art. 6 Abs. 1 lit. c) DSGVO) und
                    </ListItem>
                    <ListItem>
                        Einwilligung (Art. 6 Abs.1 lit. a), 7 DSGVO) sowie aus
                    </ListItem>
                    <ListItem>
                        unseren berechtigten Interessen heraus, sofern Ihr schutzwürdiges Interesse am Ausschluss der Verarbeitung nicht überwiegt, dies kann insbesondere der Fall sein, sofern Sie einer Verarbeitung zu bestimmten Zwecken (z.B. Werbung) widersprochen haben.
                    </ListItem>
                </List>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    4 Datenkategorien
                </Typography>
                <Typography paragraph>
                    Im Rahmen dessen verarbeiten wir insbesondere folgende personenbezogene Daten bzw. Kategorien von Daten von Ihnen:
                </Typography>
                <List>
                    <ListItem>
                        Name, Vorname
                    </ListItem>
                    <ListItem>
                        Straße, Hausnummer
                    </ListItem>
                    <ListItem>
                        PLZ, Ort
                    </ListItem>
                    <ListItem>
                        Telefon / Handynummer
                    </ListItem>
                    <ListItem>
                        E-Mail
                    </ListItem>
                    <ListItem>
                        Kundennummer Kostenträger
                    </ListItem>
                    <ListItem>
                        Bankverbindung (sofern notwendig und angegeben)
                    </ListItem>
                    <ListItem>
                        Vorname / Name Kursteilnehmer (sofern abweichend)
                    </ListItem>
                    <ListItem>
                        Vorname / Name Kto.-Inhaber (sofern abweichend)
                    </ListItem>
                    <ListItem>
                        Straße, Hausnummer, PLZ u. Ort Kto.-Inhaber (sofern abweichend)
                    </ListItem>
                    <ListItem>
                        Kreditinstitut
                    </ListItem>
                    <ListItem>
                        BIC / Swift
                    </ListItem>
                    <ListItem>
                        IBAN
                    </ListItem>
                </List>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    5 Empfänger oder Kategorien von Empfängern
                </Typography>
                <Typography paragraph>
                    Zur Erfüllung unserer vertraglichen und gesetzlichen Verpflichtungen werden Ihre Daten an folgende Empfänger bzw. Kategorien von Empfängern weitergeleitet:
                </Typography>
                <List>
                    <ListItem>
                        Mitarbeiter
                    </ListItem>
                    <ListItem>
                        Auftraggeber
                    </ListItem>
                    <ListItem>
                        Bankinstitute (sofern notwendig und vertraglich vereinbart)
                    </ListItem>
                    <ListItem>
                        Finanzamt
                    </ListItem>
                    <ListItem>
                        Agentur für Arbeit
                    </ListItem>
                    <ListItem>
                        Fachkundige Stellen, Auditoren
                    </ListItem>
                    <ListItem>
                        Berufsgenossenschaft
                    </ListItem>
                </List>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    6 Übermittlung an ein Drittland
                </Typography>
                <Typography paragraph>
                    Eine Übermittlung Ihrer personenbezogenen Daten in ein (unsicheres) Drittland findet nicht statt.
                </Typography>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    7 Dauer der Speicherung, Löschung personenbezogener Daten
                </Typography>
                <Typography paragraph>
                    Zur Erfüllung unserer vertraglichen und gesetzlichen Verpflichtungen speichern wir die Daten, sofern kein berechtigtes Interesse im Sinne des Art. 6 I f) DSGVO besteht, welches eine längere Speicherung rechtfertigen würde, für folgende Zeiträume:
                </Typography>
                <Typography paragraph>
                    Teilnehmerbezogenen Daten – 2 Jahre nach Maßnahmenabschluss
                </Typography>
                <Typography paragraph>
                    Vertragsunterlagen, Belege zu Rechnungen 10 Jahre, § 147 I Nr. 4,5 iVm. III AO; § 257 I Nr. 1, 4 iVm. § 238 I HGB
                </Typography>
            </Box>
            <NeuDivider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6">
                    8 Ihre Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten
                </Typography>
                <Typography paragraph>
                    Sie haben gegenüber uns folgende Rechte:
                </Typography>
                <List>
                    <ListItem>
                        Recht auf Auskunft
                    </ListItem>
                    <ListItem>
                        Recht auf Berichtigung oder Löschung
                    </ListItem>
                    <ListItem>
                        Recht auf Einschränkung der Verarbeitung
                    </ListItem>
                    <ListItem>
                        Recht auf Datenübertragbarkeit
                    </ListItem>
                    <ListItem>
                        Recht auf Beschwerde bei einer Aufsichtsbehörde
                    </ListItem>
                    <ListItem>
                        Widerrufsrecht und Widerspruchsrecht
                    </ListItem>
                </List>
            </Box>
        </StyledBox>
    );
};

export default Datenschutz;
