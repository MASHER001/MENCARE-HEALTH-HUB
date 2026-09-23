import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const initialForm = {
  email: '',
  password: '',
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setLoginError('');
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    try {
      const response = await loginAdmin({
        email: form.email.trim(),
        password: form.password,
      });

      if (response?.mock) {
        setLoginError('Preview mode is enabled. This mock login is for UI testing only and does not provide real authentication.');
        return;
      }

      const token =
        response.token ||
        response.access_token ||
        response.data?.token ||
        response.data?.access_token ||
        response.session?.access_token ||
        response.accessToken;

      if (!token) {
        throw new Error('No authentication token was returned by the server.');
      }

      localStorage.setItem('mencare_token', token);

      if (response.user) {
        localStorage.setItem('mencare_user', JSON.stringify(response.user));
      }

      navigate('/admin/health-facts', { replace: true });
    } catch (error) {
      const friendlyMessage =
        error?.message === 'Failed to fetch'
          ? 'Login service is currently unavailable. Please try again later.'
          : error?.message || 'Login service is currently unavailable. Please try again later.';

      setLoginError(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-auth-shell">
      <section className="auth-intro" aria-label="MenCare background information">
        <div className="auth-intro-inner">
          <div className="auth-brand-row">
            <span className="auth-brand-mark">MC</span>
            <span className="auth-brand-name">MenCare Health Hub</span>
          </div>

          <div className="auth-graphic" aria-hidden="true">
            <span className="orb orb-one" />
            <span className="orb orb-two" />
            <span className="orb orb-three" />
          </div>

          <h1>Health education, managed with care.</h1>
          <p>
            Manage trusted health education content and keep information accessible to the community.
          </p>
        </div>
      </section>

      <section className="auth-form-section" aria-label="Admin login form section">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="auth-pill">Admin Portal</span>
            <span className="security-note">Secure administrator access</span>
          </div>

          <div className="auth-card-copy">
            <h2>Admin login</h2>
            <p>Sign in to manage health education content.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-field auth-form-field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                className={`form-control ${errors.email ? 'input-error' : ''}`}
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@men-care.org"
              />
              {errors.email ? <span className="error-message">{errors.email}</span> : null}
            </div>

            <div className="form-field auth-form-field">
              <label htmlFor="admin-password">Password</label>
              <div className="password-wrap">
                <input
                  id="admin-password"
                  className={`form-control ${errors.password ? 'input-error' : ''}`}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password ? <span className="error-message">{errors.password}</span> : null}
            </div>

            {loginError ? <div className="error-banner auth-error">{loginError}</div> : null}

            <button type="submit" className="primary-btn auth-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
