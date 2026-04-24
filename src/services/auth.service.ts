
import apiClient from './api'

interface LoginResponse {
  user_id: string
  email: string
  message: string
}

interface LogoutResponse {
  message: string
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
    email,
    password,
  })
  return response.data
}

export async function logoutUser(): Promise<LogoutResponse> {
  const response = await apiClient.post<LogoutResponse>('/api/v1/auth/logout')
  return response.data
}
