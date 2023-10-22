import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { UserNav } from './UserNav'
import PageHeading from '../PageHeading'

interface NavbarLinkProps {
  href: string
}

// function NavbarLink({ href, children }: PropsWithChildren<NavbarLinkProps>) {
//   return (
//     <Link
//       className="text-grey-darkest text-2xl hover:scale-105 hover:text-pink-600"
//       href={href}
//     >
//       {children}
//     </Link>
//   )
// }

// export default function Navbar() {
//   return (
//     <nav className="flex h-10 w-full justify-center gap-4 px-4 pb-20 pt-4 font-sans md:px-20 ">
//       <PageHeading>HayStack</PageHeading>

//       <UserNav />
//     </nav>
//   )
// }

import { cn } from '@/lib/utils'
import { Balances } from './Balances'
import ConnectWallet, { userSession } from '../ConnectWallet'
import { Wallet } from 'lucide-react'
import { WalletLinkDialog } from '../WalletLinkDialog'

export default function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'flex w-full items-center justify-between gap-4 space-x-4 px-4 pb-20 pt-4 font-sans md:px-20',
        className
      )}
      {...props}
    >
      <PageHeading>#HayStack</PageHeading>
      <Balances />
      <WalletLinkDialog />
      <UserNav />
    </nav>
  )
}
