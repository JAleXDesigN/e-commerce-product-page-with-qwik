import { component$ } from "@builder.io/qwik";
import styles from "./navigation.module.scss";
import { Link } from "@builder.io/qwik-city";

export interface NavigationProps {
  type: "horizontal" | "vertical";
}

const links = ["Collections", "Men", "Women", "About", "Contact"];

export const Navigation = component$<NavigationProps>(({ type }) => {
  return (
    <nav
      class={styles[`nav-${type}`]}
      aria-label={`${
        type === "horizontal" ? "Desktop navigation" : "Mobile navigation"
      }`}
    >
      {links.map((link) => (
        <Link
          key={link}
          href="/"
        >
          {link}
        </Link>
      ))}
    </nav>
  );
});
