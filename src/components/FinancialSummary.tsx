
import { useEffect, useState } from 'react'
import { getFinancialSummary } from '../services/summary.service'

interface SummaryData {
  total_income: number
  total_expenses: number
  balance: number
}

function FinancialSummary() {
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getFinancialSummary()
      setSummary(data)
    } catch (err) {
      setError('Failed to load financial summary')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingSkeleton}>Loading summary...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Financial Summary</h2>
      <div style={styles.summaryGrid}>
        <div style={{ ...styles.card, ...styles.incomeCard }}>
          <div style={styles.cardLabel}>Total Income</div>
          <div style={styles.cardValue}>${summary.total_income.toFixed(2)}</div>
        </div>
        <div style={{ ...styles.card, ...styles.expenseCard }}>
          <div style={styles.cardLabel}>Total Expenses</div>
          <div style={styles.cardValue}>${summary.total_expenses.toFixed(2)}</div>
        </div>
        <div style={{ ...styles.card, ...styles.balanceCard }}>
          <div style={styles.cardLabel}>Balance</div>
          <div style={styles.cardValue}>${summary.balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  card: {
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  incomeCard: {
    backgroundColor: '#d4edda',
    borderLeft: '4px solid #28a745',
  },
  expenseCard: {
    backgroundColor: '#f8d7da',
    borderLeft: '4px solid #dc3545',
  },
  balanceCard: {
    backgroundColor: '#d1ecf1',
    borderLeft: '4px solid #17a2b8',
  },
  cardLabel: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  cardValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  loadingSkeleton: {
    padding: '2rem',
    textAlign: 'center' as const,
    color: '#999',
  },
  error: {
    padding: '1rem',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    textAlign: 'center' as const,
  },
}

export default FinancialSummary
