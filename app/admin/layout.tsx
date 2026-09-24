'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  Calendar,
  Inbox,
  MessageSquareQuote,
  FileText,
  Search,
  LogOut,
  ExternalLink,
  Menu,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  useEffect(() => {
    // If on login page, don't check session guard
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push('/admin/login');
      } else {
        setAdminUser(data.session.user.email || 'Admin');
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--mist)' }}>
        <p className="muted" style={{ fontWeight: 600 }}>Loading Admin Portal...</p>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { href: '/admin/submissions', label: 'Form Inquiries', icon: Inbox },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { href: '/admin/blogs', label: 'Blogs & Insights', icon: FileText },
    { href: '/admin/seo', label: 'SEO & Metadata', icon: Search },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFB' }}>
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          background: 'var(--navy-950)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
        }}
        className="hidden md:flex"
      >
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="CredTax Logo"
              width={140}
              height={30}
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.95 }}
            />
          </Link>
          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent-bright)', marginTop: '6px', letterSpacing: '0.04em' }}>
            ADMINISTRATION CONSOLE
          </span>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#fff' : 'var(--on-dark-muted)',
                  background: isActive ? 'var(--navy-900)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                <IconComp size={18} style={{ color: isActive ? 'var(--gold)' : 'inherit' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--on-dark-muted)', marginBottom: '12px', wordBreak: 'break-all' }}>
            Logged in as:<br />
            <strong style={{ color: '#fff' }}>{adminUser}</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              href="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: 'var(--on-dark-muted)',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={14} />
              <span>View Public Website</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: '#F87171',
                fontSize: '0.84rem',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile Header Bar */}
        <header
          style={{
            height: '60px',
            background: '#fff',
            borderBottom: '1px solid var(--line)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="md:hidden"
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
          >
            <Menu size={22} color="var(--navy-900)" />
          </button>
          <span style={{ fontWeight: 650, color: 'var(--navy-900)' }}>CredTax Admin</span>
          <button
            type="button"
            onClick={handleSignOut}
            style={{ background: 'none', border: 'none', color: '#F87171', fontSize: '0.85rem' }}
          >
            Sign Out
          </button>
        </header>

        {/* Mobile Sidebar Modal */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 50,
            }}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              style={{
                width: '260px',
                height: '100%',
                background: 'var(--navy-950)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>Admin Menu</h3>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    padding: '10px 0',
                    color: pathname === item.href ? 'var(--gold)' : '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <main style={{ padding: 'clamp(20px, 3vw, 40px)', flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
