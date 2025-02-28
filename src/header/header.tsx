import { SocialLink } from '@/namespaces/socials'
import { FaFacebookF } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'
import NewsSearch from './search/search-button'
import { NavMenu } from './nav-bar/nav-menu'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

const Header = () => {
  const socials: SocialLink[] = [
    {
      name: 'x',
      Icon: FaXTwitter,
      url: 'https://x.com',
    },
    {
      name: 'facebook',
      Icon: FaFacebookF,
      url: 'https://facebook.com',
    },
  ]
  return (
    <header className="w-full flex flex-col gay-4">
      <div className="w-[90%] m-auto py-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-1">
            <p className="text-accent font-medium my-0">Follow us</p>
            <div className="flex gap-4">
              {socials.map(({ Icon, url }, i) => (
                <Link key={i} href={url}>
                  <Icon className="text-accent" />
                </Link>
              ))}
            </div>
            <ThemeSelector />
          </div>
          <div>
            <Link href="/">
              <Image src="/logo-small.png" alt="the lead logo" width="180" height="114" priority />
            </Link>
          </div>
          <NewsSearch />
        </div>
      </div>
      <NavMenu />
    </header>
  )
}

export default Header
