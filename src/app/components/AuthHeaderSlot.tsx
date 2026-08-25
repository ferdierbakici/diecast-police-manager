'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import UserMenu from '@/app/components/UserMenu';

// Bu bileşeni mevcut header'ınızın içine (örn. sağ üst köşeye) yerleştirin.
export default function AuthHeaderSlot() {
  const [email, setEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // İlk yüklemede mevcut oturumu kontrol et
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setLoaded(true);
    });

    // Giriş/çıkış olduğunda (örn. Google OAuth dönüşü, başka sekmede
    // çıkış yapılması vb.) anlık olarak güncelle
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // İlk kontrol tamamlanana kadar hiçbir şey gösterme (yanıp sönmeyi önler)
  if (!loaded) return null;

  if (!email) {
    return (
      <Link
        href="/auth/login"
        className="rounded border border-gray-300 px-4 py-1.5 text-sm font-medium hover:bg-gray-50"
      >
        Log In
      </Link>
    );
  }

  return <UserMenu userEmail={email} />;
}
