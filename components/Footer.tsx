import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer dark">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" aria-label="CredTax home">
              <Image
                src="/images/logo.png"
                alt="CredTax Logo"
                width={170}
                height={36}
                className="brand-logo"
              />
            </Link>
            <p>Offshore tax, accounting and workflow support for US and Canadian CPA firms.</p>
            <p style={{ marginTop: '14px', fontSize: '0.9rem', color: 'var(--on-dark-muted)' }}>
              CredTax is the brand of <strong>CredTax Solution LLP</strong>.
            </p>
          </div>

          <nav aria-label="Footer services">
            <h2>Services</h2>
            <ul>
              <li><Link href="/services#svc-tax">US Tax</Link></li>
              <li><Link href="/services#svc-review">Tax Review &amp; QC</Link></li>
              <li><Link href="/services#svc-accounting">Bookkeeping &amp; Accounting</Link></li>
              <li><Link href="/services#svc-workflow">CPA Firm Workflow</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer explore">
            <h2>Explore</h2>
            <ul>
              <li><Link href="/credtax-pod">CredTax Pod</Link></li>
              <li><Link href="/succession-continuity">Succession &amp; Continuity</Link></li>
              <li><Link href="/how-we-work">How We Work</Link></li>
              <li><Link href="/why-credtax">Why CredTax</Link></li>
            </ul>
          </nav>

          <nav aria-label="Footer company">
            <h2>Company</h2>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/book-appointment">Book Appointment</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </nav>

          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href="mailto:prnithin6@gmail.com">prnithin6@gmail.com</a>
              </li>
              <li>
                <a href="tel:+919495915993">+91 94959 15993</a>
              </li>
              <li style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                CREDTAX SOLUTION LLP, Menacheriveedu, Ward 6 Door No.459, Thattampady, Karumalloor, Paravoor, Kochi, Kerala, IN 683511
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p>
            CredTax provides preparation, review-support and workflow services. The CPA firm retains professional responsibility, client relationships and final professional decisions.
          </p>
          <p>
            &copy; {currentYear} CredTax Solution LLP. All rights reserved. <Link href="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
