
import { useAuth } from '../contexts/AuthContext'
import { logoutUser } from '../services/auth.service'

function Navbar() {
  const { email, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout on client side even if API call fails
      logout()
    }
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <h1 style={styles.title}>💰 Application</h1>
        <div style={styles.userSection}>
          <span style={styles.email}>{email}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  email: {
    color: '#ecf0f1',
    fontSize: '0.9rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  } as React.CSSProperties,
}

export default Navbar
