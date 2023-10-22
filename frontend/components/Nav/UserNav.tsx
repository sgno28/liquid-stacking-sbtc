import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown'

import { userSession } from '../ConnectWallet'

function disconnect() {
  userSession.signUserOut('/')
}

export function UserNav() {
  return (
    <div className="self">
      {userSession.isUserSignedIn() ? (
        <DropdownMenu>
          {console.log(userSession.loadUserData(), 'userSession')}
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-10 rounded-full">
              <div className="">You're Signed In</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Wallet details
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup></DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">STX Adresses</p>
                <div className="break-words py-2 text-xs leading-none text-muted-foreground">
                  main: {userSession.loadUserData().profile.stxAddress.mainnet}
                </div>
                <p className="break-words py-2 text-xs leading-none text-muted-foreground">
                  test: {userSession.loadUserData().profile.stxAddress.testnet}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="py-4">
              <button className="Connect" onClick={disconnect}>
                Disconnect Wallet
              </button>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div></div>
      )}
    </div>
  )
}
