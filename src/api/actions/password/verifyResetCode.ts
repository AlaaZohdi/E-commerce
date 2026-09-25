'use server'

export async function verifyResetCode(resetCode: string) {
  try {
    const response = await fetch(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      {
        method: 'POST',
        body: JSON.stringify({ resetCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload.message || 'Invalid reset code')
    }

    return payload
  } catch (error) {
    throw new Error('Invalid reset code')
  }
}
