import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="The Lead Nigeria"
        width={120}
        height={30}
        className="cursor-pointer"
      />
    </div>
  )
}
export const Icon = () => {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="The Lead Nigeria"
        width={30}
        height={30}
        className="cursor-pointer"
      />
    </div>
  )
}
