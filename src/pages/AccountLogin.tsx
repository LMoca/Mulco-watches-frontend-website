import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import Eyebrow from '../components/Eyebrow';

const inputCls =
  'w-full bg-transparent border-0 border-b border-brand-gold/20 focus:border-brand-gold text-brand-white placeholder:text-brand-muted/50 text-sm font-sans px-0 py-3 outline-none transition-colors duration-[400ms]';

export default function AccountLogin() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/account';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    const displayName = mode === 'register' ? name.trim() : email.split('@')[0];
    login(displayName, email.trim());
    navigate(from, { replace: true });
  }

  return (
    <div className="min-h-screen bg-brand-black pt-[72px] flex flex-col">
      <div className="border-b border-brand-gold/10 py-20 md:py-28 px-6 text-center">
        <div className="max-w-md mx-auto">
          <nav className="flex items-center justify-center gap-1.5 text-[10px] font-sans text-brand-muted mb-8">
            <Link to="/" className="hover:text-brand-gold transition-colors duration-[400ms]">Home</Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-brand-white">{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
          </nav>
          <Eyebrow text="My MULCO" className="mb-4 justify-center" />
          <h1 className="font-serif text-[3rem] md:text-[3.5rem] text-brand-white leading-[0.95] tracking-[-0.02em]">
            {mode === 'signin' ? 'Welcome back.' : 'Join MULCO.'}
          </h1>
          <div className="w-10 h-px bg-brand-gold mx-auto mt-6" />
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Mode toggle */}
          <div className="flex border-b border-brand-gold/15 mb-10">
            {(['signin', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className={`flex-1 pb-3 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-[400ms] ${
                  mode === m
                    ? 'text-brand-gold border-b-2 border-brand-gold -mb-px'
                    : 'text-brand-muted hover:text-brand-white'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            {mode === 'register' && (
              <div>
                <label htmlFor="acc-name" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">Full Name</label>
                <input
                  id="acc-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  autoComplete="name"
                  className={inputCls}
                />
              </div>
            )}

            <div>
              <label htmlFor="acc-email" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">Email Address</label>
              <input
                id="acc-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                autoComplete="email"
                className={inputCls}
              />
            </div>

            <div>
              <label htmlFor="acc-password" className="text-[10px] font-sans tracking-[0.2em] uppercase text-brand-muted mb-2 block">Password</label>
              <input
                id="acc-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                className={inputCls}
              />
            </div>

            {error && (
              <p className="text-[11px] font-sans text-brand-rose">{error}</p>
            )}

            <button
              type="submit"
              className="w-full h-14 bg-brand-gold text-brand-black text-[13px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-brand-white transition-colors duration-200"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {mode === 'signin' && (
            <p className="font-sans text-[11px] text-brand-muted text-center mt-6">
              Forgot your password?{' '}
              <span className="text-brand-gold cursor-pointer hover:text-brand-white transition-colors duration-[400ms]">Reset it</span>
            </p>
          )}

          <div className="mt-10 pt-8 border-t border-brand-gold/10 text-center">
            <p className="font-sans text-[11px] text-brand-muted leading-relaxed">
              Already have a Shop account?{' '}
              <span className="text-brand-gold">Your order history syncs automatically.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
