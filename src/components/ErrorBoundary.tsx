
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>Oops! Something went wrong</h1>
          <p style={styles.message}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={styles.button}>
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center' as const,
    maxWidth: '600px',
    margin: '2rem auto',
  },
  title: {
    color: '#e74c3c',
    marginBottom: '1rem',
  },
  message: {
    color: '#555',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
}

export default ErrorBoundary
