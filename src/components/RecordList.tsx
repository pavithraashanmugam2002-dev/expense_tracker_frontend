
import { useState } from 'react'

interface Record {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

interface RecordListProps {
  records: Record[]
  onEdit: (record: Record) => void
  onDelete: (recordId: string) => void
}

function RecordList({ records, onEdit, onDelete }: RecordListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (recordId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this record?')
    if (!confirmed) return

    try {
      setDeletingId(recordId)
      await onDelete(recordId)
    } finally {
      setDeletingId(null)
    }
  }

  if (records.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No records found. Add your first income or expense!</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Transaction History</h2>
      <div style={styles.recordList}>
        {records.map((record) => (
          <div
            key={record.id}
            style={{
              ...styles.recordCard,
              borderLeft: `4px solid ${record.type === 'income' ? '#28a745' : '#dc3545'}`,
            }}
          >
            <div style={styles.recordHeader}>
              <div>
                <span
                  style={{
                    ...styles.typeBadge,
                    backgroundColor: record.type === 'income' ? '#d4edda' : '#f8d7da',
                    color: record.type === 'income' ? '#155724' : '#721c24',
                  }}
                >
                  {record.type}
                </span>
                <span style={styles.category}>{record.category}</span>
              </div>
              <div style={styles.amount}>
                ${record.amount.toFixed(2)}
              </div>
            </div>
            <div style={styles.recordBody}>
              <p style={styles.description}>{record.description}</p>
              <p style={styles.date}>{new Date(record.date).toLocaleDateString()}</p>
            </div>
            <div style={styles.recordActions}>
              <button
                onClick={() => onEdit(record)}
                style={{ ...styles.actionButton, ...styles.editButton }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(record.id)}
                disabled={deletingId === record.id}
                style={{ ...styles.actionButton, ...styles.deleteButton }}
              >
                {deletingId === record.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    marginTop: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  recordList: {
    display: 'grid',
    gap: '1rem',
  },
  recordCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  recordHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  typeBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const,
    marginRight: '0.5rem',
  },
  category: {
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    color: '#2c3e50',
  },
  amount: {
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    color: '#2c3e50',
  },
  recordBody: {
    marginBottom: '1rem',
  },
  description: {
    color: '#555',
    marginBottom: '0.5rem',
  },
  date: {
    color: '#999',
    fontSize: '0.875rem',
  },
  recordActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    color: '#999',
  },
}

export default RecordList
