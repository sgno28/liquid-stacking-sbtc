import { ErrorProps } from 'next/error'
import { useEffect, useState } from 'react'

export const useApiData = (address) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(address)
  useEffect(() => {
    const fetchData = async () => {
      if ((address = undefined)) return
      try {
        const response = await fetch(`/api/route?address=${address}`)

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [address])

  return { data, loading, error }
}
