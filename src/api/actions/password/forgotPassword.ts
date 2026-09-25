'use server'

export async function forgotPassword(email: string) {
  try {
    const response = await fetch(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload.message || 'Failed to send reset code')
    }

    return payload
  } catch (error) {
    throw new Error('Failed to send reset code')
  }
}
