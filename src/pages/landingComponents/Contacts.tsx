import { FC } from "react";
import styles from "../../styles/landingStyles/Contacts.module.css";
import WriteToUsForm from "../../components/WriteToUsForm.tsx";

const Contacts: FC = () => {
    return (
        <div className={styles.home}>
            <WriteToUsForm/>
        </div>
    );
};

export default Contacts;
