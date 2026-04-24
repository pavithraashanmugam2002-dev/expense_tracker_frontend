
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/auth.service'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginUser(email, password)
      login(response.user_id, response.email)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>💰 Expense Tracker</h1>
        <p style={styles.subtitle}>Sign in to manage your finances</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="user1@example.com"
              required
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={isLoading} style={styles.button}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p style={styles.demoTitle}>Demo Credentials:</p>
          <p style={styles.demoText}>user1@example.com / password123</p>
          <p style={styles.demoText}>user2@example.com / password123</p>
          <p style={styles.demoText}>user3@example.com / password123</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
  },
  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  form: {
    marginBottom: '2rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: 'bold' as const,
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
  },
  demoCredentials: {
    borderTop: '1px solid #ecf0f1',
    paddingTop: '1rem',
  },
  demoTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold' as const,
    color: '#7f8c8d',
    marginBottom: '0.5rem',
  },
  demoText: {
    fontSize: '0.85rem',
    color: '#95a5a6',
    margin: '0.25rem 0',
  },
}

export default LoginPage
