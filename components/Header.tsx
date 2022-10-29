// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status }: any = useSession();

  return (
    <nav>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </nav>
  );
};

export default Header;
