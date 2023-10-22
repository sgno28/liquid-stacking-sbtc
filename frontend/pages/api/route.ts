import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
  data?: any // Or you can define a more detailed type for the data you expect to receive
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // const testNetUrl = `https://api.testnet.hiro.so/extended/v1/address/${address}/balances`
  // const mainNetUrl = `https://api.hiro.so/extended/v1/address/${address}/balances`
  const devNetUrl = `https://localhost:3999/extended/v1/address/ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG/balances`

  try {
    const response = await fetch(devNetUrl)
    const data = await response.json()

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: data.error || 'Error fetching data.' })
    }

    return res.status(200).json({ message: 'Success', data })
  } catch (error) {
    console.error('Error caught:', error)
    return res.status(500).json({ message: error.message || 'Unknown error' })
  }
}
