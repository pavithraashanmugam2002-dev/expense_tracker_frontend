
import apiClient from './api'

interface FinancialSummary {
  total_income: number
  total_expenses: number
  balance: number
}

export async function getFinancialSummary(): Promise<FinancialSummary> {
  const response = await apiClient.get<FinancialSummary>('/api/v1/summary')
  return response.data
}
