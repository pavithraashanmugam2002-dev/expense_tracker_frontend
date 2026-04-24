
import apiClient from './api'

interface Record {
  id: string
  user_id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  created_at: string
  updated_at: string
}

interface RecordListResponse {
  records: Record[]
  total: number
}

interface CreateRecordPayload {
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

interface UpdateRecordPayload {
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

export async function getAllRecords(): Promise<RecordListResponse> {
  const response = await apiClient.get<RecordListResponse>('/api/v1/records')
  return response.data
}

export async function createRecord(payload: CreateRecordPayload): Promise<Record> {
  const response = await apiClient.post<Record>('/api/v1/records', payload)
  return response.data
}

export async function updateRecord(
  recordId: string,
  payload: UpdateRecordPayload
): Promise<Record> {
  const response = await apiClient.put<Record>(`/api/v1/records/${recordId}`, payload)
  return response.data
}

export async function deleteRecord(recordId: string): Promise<void> {
  await apiClient.delete(`/api/v1/records/${recordId}`)
}
