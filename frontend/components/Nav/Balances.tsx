import {
  EyeOffIcon as EyeNoneIcon,
  PersonStandingIcon as PersonIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
// import logo
import Image from 'next/image'
import logo from '@/components/assets/stacks-logo.svg'

import { userSession } from '../ConnectWallet'

import { useEffect, useState } from 'react'
const bigIntValue = 0n
const numberValue = Number(bigIntValue)
import { getBalance, getSTXBalance } from '../StakeCard'

export function Balances() {
  const [address, setAddress] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stx, setStx] = useState(null)

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const addr = userSession.loadUserData().profile.stxAddress.testnet
      setAddress(addr)
    }
  }, [])

  useEffect(() => {
    if (!address) return

    getSTXBalance({ address })
      .then((res) => {
        setStx(res.value.value)
      })
      .catch((error) => {
        setError(error)
      })
    getBalance({ address })
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [address])

  return userSession.isUserSignedIn() && !!address ? (
    <Card>
      <CardContent className="flex gap-4 pt-3">
        <div className=" mx-4 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Image alt="STX Logo" src={logo} className="h-6 w-6" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">stSTX Balance</p>
            <p className="text-sm text-muted-foreground">
              {data ? (
                <>
                  {data.value.value.toString()}
                  {console.log(data)}
                </>
              ) : (
                'Loading...'
              )}
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Image alt="STX Logo" src={logo} className="h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">STX</p>
            <p className="text-sm text-muted-foreground"></p>
            {stx ? (
              <>
                ({stx.toString()}
                {console.log(stx, 'stx')})
              </>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-muted-foreground transition-all">
          <EyeNoneIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">BTC Balance </p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <></>
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
