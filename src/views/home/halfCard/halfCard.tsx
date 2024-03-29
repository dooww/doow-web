import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
import styles from "./halfCard.module.scss";

interface IFullCard {
  title: string;
  subtitle: string;
  imgUrl: string;
  buttonTitle: string;
  bgColor: string;
  textColor: string;
}

export const HalfCard = (props: IFullCard) => {
  const router = useRouter();

  return (
    // <div className={styles.container}>
    <div
      className={styles.content}
      style={{
        backgroundColor: props.bgColor,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.textSection}>
        <div>
          <h3
            className={styles.sectionTitle}
            style={{ color: props.textColor }}
          >
            {props.title}
          </h3>
          <p className={styles.subtitle} style={{ color: props.textColor }}>
            {props.subtitle}
          </p>
        </div>
        <div className={styles.btnSection}>
          <p className={styles.btn}>{props.buttonTitle}</p>
          <p className={styles.btnArrow}>
            <BsArrowRight />
          </p>
        </div>
        {/* <input className={styles.btn} value={props.buttonTitle} type="button" /> */}
        <div className={styles.imager}>
          <img src={props.imgUrl} className={styles.imgd} />
        </div>
      </div>
    </div>
    // </div>
  );
};
