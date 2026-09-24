'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isStuck, setIsStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/credtax-pod', label: 'CredTax Pod' },
    { href: '/succession-continuity', label: 'Succession & Continuity' },
    { href: '/how-we-work', label: 'How We Work' },
    { href: '/why-credtax', label: 'Why CredTax' },
    { href: '/about', label: 'About' },
    { href: '/insights', label: 'Insights' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header className={`site-header ${isStuck ? 'is-stuck' : ''}`} id="top">
      <div className="wrap header-inner">
        <Link href="/" className="logo" aria-label="CredTax home">
          <Image
            src="/images/logo.png"
            alt="CredTax Logo"
            width={180}
            height={38}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <Link className="btn btn-secondary btn-sm" href="/contact">
            Contact
          </Link>
          <Link className="btn btn-primary btn-sm" href="/book-appointment">
            Book Appointment
          </Link>
          <button
            className="menu-btn"
            type="button"
            id="menuBtn"
            aria-expanded={mobileOpen}
            aria-controls="mobilePanel"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`} id="mobilePanel">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="m-link"
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link className="m-link" href="/contact">
          Contact
        </Link>
        <Link className="btn btn-primary" href="/book-appointment" style={{ marginTop: '20px', width: '100%' }}>
          Book Appointment
        </Link>
      </div>
    </header>
  );
}
