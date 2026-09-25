'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setErrorMessage((err as Error).message || 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--mist)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid var(--line)',
          padding: '36px',
          boxShadow: '0 8px 30px -10px rgba(47, 97, 111, 0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="CredTax Logo"
              width={160}
              height={34}
              style={{ objectFit: 'contain', margin: '0 auto 16px' }}
            />
          </Link>
          <h1 style={{ fontSize: '1.45rem', color: 'var(--navy-900)', marginBottom: '6px' }}>
            Admin Portal
          </h1>
          <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
            Sign in to manage appointments, leads, blogs &amp; SEO
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: '10px 14px',
              background: '#FDF2F2',
              border: '1px solid #F8B4B4',
              borderRadius: '4px',
              color: '#9B1C1C',
              fontSize: '0.88rem',
              marginBottom: '20px',
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="field" style={{ marginBottom: '18px' }}>
            <label htmlFor="admin-email" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              placeholder="name@firm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.7em 0.85em', fontSize: '0.95rem' }}
            />
          </div>

          <div className="field" style={{ marginBottom: '24px' }}>
            <label htmlFor="admin-pwd" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
              Password
            </label>
            <input
              id="admin-pwd"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.7em 0.85em', fontSize: '0.95rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              background: '#183941',
              color: '#fff',
              padding: '12px',
              fontSize: '1rem',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
          <Link href="/" className="link">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
