import { FC } from "react";
import { Container, Typography, Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    scrollContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        height: "auto",
        maxHeight: "70vh",
        overflowY: "auto",
        padding: "0 1rem",
        color: "var(--text)"
    }
});

const Datenschutz: FC = () => {
    const classes = useStyles();

    return (
        <Container className={classes.scrollContainer}>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                Information zum Datenschutz gemäß Art. 12, 13, 14 und 21 DSGVO
            </Typography>
            <Typography>
                Datenschutz und der Umgang mit Ihren persönlichen Daten sind uns sehr wichtig. Durch geeignete Maßnahmen und Vorkehrungen achten wir auf die Einhaltung des Datenschutzes und auf eine ordnungsgemäße Verarbeitung Ihrer personenbezogenen Daten.
            </Typography>
            <Divider />
            <Box>
                <Typography>
                    <strong>1 Unsere Verpflichtung</strong> Die Erhebung Ihrer persönlichen Daten zur Feststellung der Eignung erfolgt in Einzelgesprächen und ist somit geschützt. Wir verpflichten uns, alle Ihre uns zur Kenntnis gelangenden internen Angelegenheiten auch nach der Beendigung des Vertrages vertraulich zu behandeln. Mit den personenbezogenen Daten unserer Teilnehmer dürfen nur solche Mitarbeiter befasst werden, die zuvor auf die Wahrung des Datengeheimnisses verpflichtet worden sind. Freie Mitarbeiter und Mitarbeiter von Subunternehmen werden von uns in gleicher Weise verpflichtet.
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>2 Bei Fragen</strong> zur Verarbeitung Ihrer Daten, können Sie sich jede Zeit an uns oder an unseren Datenschutzbeauftragten wenden. <strong>Name des Verantwortlichen</strong> Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten ist die Am Meisenberg 14, 51491 Overath <strong>Datenschutzbeauftragte(r) Roman Snimshchikov</strong> neox@it-assistent.eu +491623067782
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    Der Datenschutzbeauftragte unterliegt keinerlei Weisungen, ist in seiner Stellung unabhängig und gesetzlich zur Wahrung der Geheimhaltung und Vertraulichkeit verpflichtet (Art. 38 DSGVO, § 38 BDSG), so dass Sie sich vertrauensvoll an diesen wenden können.
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>3 Zweckbestimmung und Rechtsgrundlage für die Datenverarbeitung </strong> Im Rahmen unserer Projekte und Leistungsangebote verarbeiten wir Ihre personenbezogenen Daten zum Zwecke der Begründung, Durchführung und Beendigung eines Vertragsverhältnisses mit Ihnen. Die Rechtsgrundlage für die Verarbeitung Ihrer personenbezogenen Daten folgt aus:
                </Typography>
                <ul style={{ flexDirection: "column", alignItems: "start" }}>
                    <li>
                        Vertrag (Art. 6 Abs. 1 lit. b) DSGVO),
                        <br />Gesetzlicher Vorgaben (Art. 6 Abs. 1 lit. c) DSGVO) und
                        <br />Einwilligung (Art. 6 Abs.1 lit. a), 7 DSGVO) sowie aus
                        <br />unseren berechtigten Interessen heraus, sofern Ihr schutzwürdiges Interesse am Ausschluss der Verarbeitung nicht überwiegt, dies kann insbesondere der Fall sein, sofern Sie einer Verarbeitung zu bestimmten Zwecken (z.B. Werbung) widersprochen haben.
                    </li>
                </ul>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>4 Datenkategorien </strong> Im Rahmen dessen verarbeiten wir insbesondere folgende personenbezogene Daten bzw. Kategorien von Daten von Ihnen:
                </Typography>
                <ul style={{ flexDirection: "column", alignItems: "start" }}>
                    <li>
                        <em>Name, Vorname </em>
                        <br /> <em>Straße, Hausnummer </em>
                        <br /><em>PLZ, Ort </em>
                        <br /> <em>Telefon / Handynummer </em>
                        <br /><em>E-Mail </em>
                        <br />Kundennummer Kostenträger
                        <br /><em>Bankverbindung (sofern notwendig und angegeben) </em> <em>– Vorname / Name Kursteilnehmer (sofern abweichend)</em> <em> – Vorname / Name Kto.-Inhaber (sofern abweichend)</em> <em> – Straße, Hausnummer, PLZ u. Ort Kto.-Inhaber (sofern abweichend)
                        – Kreditinstitut</em> <em> – BIC / Swift</em> <em> – IBAN </em>
                    </li>
                </ul>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>5 Empfänger oder Kategorien von Empfängern </strong> Zur Erfüllung unserer vertraglichen und gesetzlichen Verpflichtungen werden Ihre Daten an folgende Empfänger bzw. Kategorien von Empfängern weitergeleitet:
                </Typography>
                <ul style={{ flexDirection: "column", alignItems: "start" }}>
                    <li>
                        Mitarbeiter
                        <br />Auftraggeber
                        <br />Bankinstitute (sofern notwendig und vertraglich vereinbart)
                        <br />Finanzamt
                        <br />Agentur für Arbeit
                        <br />Fachkundige Stellen, Auditoren
                        <br />Berufsgenossenschaft
                    </li>
                </ul>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>6 Übermittlung an ein Drittland </strong> Eine Übermittlung Ihrer personenbezogenen Daten in ein (unsicheres) Drittland findet nicht statt.
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>7 Dauer der Speicherung, Löschung personenbezogener Daten </strong> Zur Erfüllung unserer vertraglichen und gesetzlichen Verpflichtungen speichern wir die Daten, sofern kein berechtigtes Interesse im Sinne des Art. 6 I f) DSGVO besteht, welches eine längere Speicherung rechtfertigen würde, für folgende Zeiträume: <em>Teilnehmerbezogenen Daten – 2 Jahre nach Maßnahmenabschluss </em> <em>Vertragsunterlagen, Belege zu Rechnungen 10 Jahre, § 147 I Nr. 4,5 iVm. III AO; § 257 I Nr. 1, 4 iVm. § 238 I HGB </em>
                </Typography>
            </Box>
            <Divider />
            <Box>
                <Typography>
                    <strong>8 Ihre Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten </strong> Sie haben gegenüber uns folgende Rechte
                </Typography>
                <ul style={{ flexDirection: "column", alignItems: "start" }}>
                    <li >
                        Recht auf Auskunft
                        <br />Recht auf Berichtigung oder Löschung
                        <br />Recht auf Einschränkung der Verarbeitung
                        <br />Recht auf Datenübertragbarkeit
                        <br />Recht auf Beschwerde bei einer Aufsichtsbehörde
                        <br />Widerrufsrecht und Widerspruchsrecht
                    </li>
                </ul>
            </Box>
        </Container>
    );
};

export default Datenschutz;
