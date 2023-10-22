'use client'

import React, { useEffect, useState } from 'react'
import { AppConfig, showConnect, UserSession } from '@stacks/connect'
import { Button } from './ui/button'
import { Link } from 'lucide-react'

const appConfig = new AppConfig(['store_write', 'publish_data'])

export const userSession = new UserSession({ appConfig })

function authenticate() {
  showConnect({
    appDetails: {
      name: 'Stacks Next.js Starter',
      icon: window.location.origin + '/logo512.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload()
    },
    userSession,
  })
}

export function disconnect() {
  userSession.signUserOut('/')
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div className="Container">
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <p>mainnet: {userSession.loadUserData().profile.stxAddress.mainnet}</p>
        <p>testnet: {userSession.loadUserData().profile.stxAddress.testnet}</p>
      </div>
    )
  }

  return (
    <Button className="Connect mt-4 flex gap-2" onClick={authenticate}>
      Connect your Wallet
      <Link className="flex gap-2"></Link>
    </Button>
  )
}

export default ConnectWallet
