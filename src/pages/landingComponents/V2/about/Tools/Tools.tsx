import {Container} from "../../components/Container/Container.tsx";
import Box from "@mui/material/Box";
import {ToolCard} from "./ToolCard/ToolCard.tsx";
import {TOOL_ITEMS} from "./constants.tsx";
import styles from "./styles.ts";

export const Tools = () => {
    return <Container>
        <Box sx={styles.container}>
            {TOOL_ITEMS.map((item) => (
                <ToolCard key={item.text} text={item.text} icon={item.icon} size={item.size}/>
            ))}
        </Box>
    </Container>
}