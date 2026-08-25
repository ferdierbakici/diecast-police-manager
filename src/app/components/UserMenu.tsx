'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from '@/lib/auth-actions';

type Props = {
  userEmail: string;
};

export default function UserMenu({ userEmail }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    // Sayfayı yenile ki client state'i (bu bileşen dahil) sıfırlansın
    window.location.href = '/';
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-green-600 text-green-600 hover:bg-green-50"
        aria-label="Account menu"
        title={userEmail}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
          <Link
            href="/account/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/account/collection"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            <span>🔷</span> My Collection
          </Link>
          <Link
            href="/account/wishlist"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            <span>⭐</span> My Wishlist
          </Link>
          <Link
            href="/account/change-password"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Change Password
          </Link>
          <hr className="my-2 border-gray-100" />
          <button
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
