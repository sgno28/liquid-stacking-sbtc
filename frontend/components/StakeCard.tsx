import { UserNav } from './Nav/UserNav'
import { Input } from './forms/input'
import { Button } from './ui/button'
import { StacksMocknet } from '@stacks/network'
import {
  callReadOnlyFunction,
  standardPrincipalCV,
  standardPrincipalCVFromAddress,
} from '@stacks/transactions'

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
import { userSession } from './ConnectWallet'
import { useApiData } from './hooks/useApiData'
import {
  ContractCallRegularOptions,
  makeContractCallToken,
  openContractCall,
} from '@stacks/connect-react'
import { Address } from 'cluster'
import { Label } from './forms/label'

const network = new StacksMocknet()

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
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Your Wallet</CardTitle>
        <CardDescription>Check out balances for Stacks, BTC </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Stake</Label>
              <Input id="name" placeholder="Stake" />
            </div>
            <button></button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Stake</Button>

        {userSession.isUserSignedIn() ? (
          <>
            {console.log(userSession.loadUserData().profile.stxAddress.testnet)}
            {/* <Button
              onClick={() =>
                readOnlyRequest({
                  address:
                    userSession.loadUserData().profile.stxAddress.testnet,
                }).then((res) => console.log(res))
              }
            >
              Contract test
            </Button> */}
            <Button
              onClick={() =>
                getBalance({
                  address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
                }).then((res) => console.log(res))
              }
            >
              get balance
            </Button>
            <Button
              onClick={() =>
                route(userSession.loadUserData().profile.stxAddress.testnet)
              }
            >
              Route test
            </Button>
          </>
        ) : null}
      </CardFooter>
    </Card>
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
// const options: ContractCallRegularOptions = {
//   contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
//   contractName: 'stacking',
//   functionName: '',
//   functionArgs: [],
//   network,
//   appDetails,
//   onFinish: ({ txId }) => console.log(txId),
// }

// await openContractCall(options)
