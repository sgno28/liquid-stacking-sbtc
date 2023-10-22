import { PropsWithChildren } from 'react'
import Image from 'next/image'
import logo from '../components/assets/logo.svg'
export default function PageHeading({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex content-start">
      <Image src={logo} alt="Haystack Logo" width={40} height={40} />
      <h1 className="self-center bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text pb-8 text-3xl font-extrabold text-transparent">
        {children}
      </h1>
    </div>
  )
}
