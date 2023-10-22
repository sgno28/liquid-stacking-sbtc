import { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from '../components/assets/logo.svg'
export default function PageHeading({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex content-start">
      <h1 className="self-center bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text pb-8 text-5xl font-extrabold text-transparent">
        {children}
      </h1>
    </div>
  )
}
