
import { useState, useEffect } from 'react'

interface RecordFormData {
  type: 'income' | 'expense'
  amount: string
  category: string
  description: string
  date: string
}

interface RecordFormProps {
  onSubmit: (data: RecordFormData) => Promise<void>
  onCancel: () => void
  initialData?: RecordFormData
  isEditing?: boolean
}

function RecordForm({ onSubmit, onCancel, initialData, isEditing = false }: RecordFormProps) {
  const [formData, setFormData] = useState<RecordFormData>(
    initialData || {
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    }
  )
  const [errors, setErrors] = useState<Partial<RecordFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const validate = (): boolean => {
    const newErrors: Partial<RecordFormData> = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name as keyof RecordFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.formTitle}>{isEditing ? 'Edit Record' : 'Add New Record'}</h3>

      <div style={styles.formGroup}>
        <label style={styles.label}>Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Amount *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0"
          style={styles.input}
          placeholder="0.00"
        />
        {errors.amount && <span style={styles.error}>{errors.amount}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Category *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g., Salary, Rent, Groceries"
        />
        {errors.category && <span style={styles.error}>{errors.category}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Enter details about this transaction"
          rows={3}
        />
        {errors.description && <span style={styles.error}>{errors.description}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.date && <span style={styles.error}>{errors.date}</span>}
      </div>

      <div style={styles.buttonGroup}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ ...styles.button, ...styles.submitButton }}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Add Record'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ ...styles.button, ...styles.cancelButton }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const styles = {
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  formTitle: {
    marginTop: 0,
    marginBottom: '1.5rem',
    color: '#2c3e50',
  },
  formGroup: {
    marginBottom: '1rem',
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
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
  },
  error: {
    display: 'block',
    color: '#e74c3c',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
  },
}

export default RecordForm
