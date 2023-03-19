import styles from "./sidebar.module.scss";
import Link from "next/link";
import { sideBarItems } from "./sidebar-items";
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAngleRight } from "react-icons/fa";

export const SideBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const route = useRouter();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleShowLinks = (i: number) => {
    if (i === activeLink) {
      setShowLinks((prev) => !prev);
    } else {
      setActiveLink(i);
      setShowLinks(true);
    }
  };

  return (
    <div className={`${styles.sidebar_menu} ${showMenu ? styles.active : ""}`}>
      <div className={styles.toggle_btn} onClick={toggleMenu}>
        <FaAngleRight />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.links}>
          {sideBarItems.map((item, i) => (
            <div
              className={`${styles.link} ${
                showLinks && activeLink === i ? styles.active : ""
              }`}
              key={i}
            >
              <Link href={"#"} onClick={() => toggleShowLinks(i)}>
                {item.icon}
                <p>{item.title}</p>
                <TfiAngleUp />
              </Link>
              <div className={styles.sub_menu}>
                {item.subLinks.map((link, idx) => (
                  <Link key={idx} href={link.link}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {/* add active class */}
        </div>
        {/* doow logo section */}
        <div className={styles.logoSection}>
          <Image
            src={"/assets/icons/doowlogo-circle.png"}
            width={40}
            height={40}
            alt={"doow-logo"}
            onClick={() => route.push("/")}
          />
          <div className={styles.logoInfo}>
            <div>
              <p>Doow Inc.</p>
              <TfiAngleDown />
            </div>
            <span>Abisoye Tolani</span>
          </div>
        </div>
      </div>
    </div>
  );
};
