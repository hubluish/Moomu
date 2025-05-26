import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavLink } from "./header.styles";

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <Nav>
      <Link href="/" passHref legacyBehavior>
        <NavLink $active={pathname === "/"}>home</NavLink>
      </Link>
      <Link href="/article" passHref legacyBehavior>
        <NavLink $active={pathname === "/article"}>article</NavLink>
      </Link>
      <Link href="/mymoodboard" passHref legacyBehavior>
        <NavLink $active={pathname === "/mymoodboard"}>mymoodboard</NavLink>
      </Link>
    </Nav>
  );
}