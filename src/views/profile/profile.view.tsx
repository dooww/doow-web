import NavBar from "../../comps/navbar/navbar.comp";
import { SideBar } from "../../comps/sidebar/sidebar";
import { useAuthState } from "../../context/auth";
import styles from "./profile.module.scss";
import { FaUserCircle } from "react-icons/fa";

export const ProfileView = () => {
  const { me } = useAuthState();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SideBar />
      <NavBar />
      <div className={styles.container}>
        <div className={styles.contents}>
          <p>Content here</p>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
