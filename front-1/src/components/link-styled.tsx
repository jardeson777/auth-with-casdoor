'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkStyledProps = {
  children: React.ReactNode;
  href: string;
}

const LinkStyled = ({ children, href }: LinkStyledProps) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={pathname === href ? "font-medium text-purple-800 underline" : ""}>
      {children}
    </Link>
  );
}

export default LinkStyled;