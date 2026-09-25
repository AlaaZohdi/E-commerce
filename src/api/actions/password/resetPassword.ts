'use server'

export async function resetPassword(email: string, newPassword: string) {
  try {
    const response = await fetch(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      {
        method: 'PUT',
        body: JSON.stringify({ email, newPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload.message || 'Failed to reset password')
    }

    return payload
  } catch (error) {
    throw new Error('Failed to reset password')
  }
}
