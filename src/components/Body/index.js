import styles from "./body.module.css";

const Body = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

export default Body;
