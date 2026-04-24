
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import FinancialSummary from '../components/FinancialSummary'
import RecordForm from '../components/RecordForm'
import RecordList from '../components/RecordList'
import {
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} from '../services/records.service'

interface Record {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

interface RecordFormData {
  type: 'income' | 'expense'
  amount: string
  category: string
  description: string
  date: string
}

function DashboardPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingRecord, setEditingRecord] = useState<Record | null>(null)
  const [summaryKey, setSummaryKey] = useState(0)

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllRecords()
      setRecords(data.records)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load records')
    } finally {
      setLoading(false)
    }
  }

  const handleAddRecord = async (formData: RecordFormData) => {
    try {
      const payload = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
      }
      await createRecord(payload)
      await fetchRecords()
      setSummaryKey((prev) => prev + 1)
      setShowForm(false)
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to create record')
    }
  }

  const handleUpdateRecord = async (formData: RecordFormData) => {
    if (!editingRecord) return

    try {
      const payload = {
        type: formData.type,
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date,
      }
      await updateRecord(editingRecord.id, payload)
      await fetchRecords()
      setSummaryKey((prev) => prev + 1)
      setEditingRecord(null)
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to update record')
    }
  }

  const handleDeleteRecord = async (recordId: string) => {
    try {
      await deleteRecord(recordId)
      await fetchRecords()
      setSummaryKey((prev) => prev + 1)
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete record')
    }
  }

  const handleEditRecord = (record: Record) => {
    setEditingRecord(record)
    setShowForm(false)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingRecord(null)
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.container}>
          <FinancialSummary key={summaryKey} />

          {!showForm && !editingRecord && (
            <button onClick={() => setShowForm(true)} style={styles.addButton}>
              + Add New Record
            </button>
          )}

          {showForm && !editingRecord && (
            <RecordForm onSubmit={handleAddRecord} onCancel={handleCancelForm} />
          )}

          {editingRecord && (
            <RecordForm
              onSubmit={handleUpdateRecord}
              onCancel={handleCancelForm}
              initialData={{
                type: editingRecord.type,
                amount: editingRecord.amount.toString(),
                category: editingRecord.category,
                description: editingRecord.description,
                date: editingRecord.date.split('T')[0],
              }}
              isEditing
            />
          )}

          {loading && (
            <div style={styles.loading}>
              <p>Loading records...</p>
            </div>
          )}

          {error && (
            <div style={styles.errorBox}>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <RecordList
              records={records}
              onEdit={handleEditRecord}
              onDelete={handleDeleteRecord}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1',
  },
  content: {
    padding: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  addButton: {
    padding: '1rem 2rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    color: '#999',
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
  },
}

export default DashboardPage
