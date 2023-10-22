import { UserNav } from './Nav/UserNav'
import { Input } from './forms/input'
import { Button } from './ui/button'
import { StacksMocknet } from '@stacks/network'
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  standardPrincipalCVFromAddress,
} from '@stacks/transactions'
import { StackForm } from './forms'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/Card'

import { routeFetch } from '@/lib/fetch'
import { useEffect, useState } from 'react'

export const network = new StacksMocknet()

const route = async (address) => {
  try {
    const response = await fetch(`/api/route?address=${address}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error fetching the API route:', error)
  }
}

export const StakeCard = () => {
  const [stake, setStake] = useState('')
  const [unStake, set] = useState('')

  const handleSubmit = (event: Event) => {
    event.preventDefault()
    alert(`The name you entered was: ${name}`)
  }
  return (
    <div className="flex">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Your Wallet</CardTitle>
          <CardDescription>Check out balances for Stacks, BTC </CardDescription>
        </CardHeader>

        <CardContent>
          <StackForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>

      <CardFooter className="flex justify-between"></CardFooter>
    </div>
  )
}

const ApiDataDisplay = ({ data, loading, error }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>API Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export async function readOnlyRequest({ address }: { address: string }) {
  const res = await callReadOnlyFunction({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'stacked-stx',
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(address)],
    senderAddress: address,
    network,
  })

  return res
}

export async function getBalance({ address }: { address: string }) {
  const res = await callReadOnlyFunction({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'stacked-stx',
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(address)],
    senderAddress: address,
    network,
  })

  return res
}

export async function getSTXBalance({ address }: { address: string }) {
  const res = await callReadOnlyFunction({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'staking',
    functionName: 'get-STX-balance',
    functionArgs: [standardPrincipalCV(address)],
    senderAddress: address,
    network,
  })

  return res
}

function standardPrincipalCVfromAddress(
  address: string
): import('@stacks/transactions').ClarityValue {
  throw new Error('Function not implemented.')
}
