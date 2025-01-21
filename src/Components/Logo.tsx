
import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex items-center justify-start w-full h-full '>
        <Image src="/Kangaroote-02.png" alt="logo" width={200} height={200} />
       
    </div>
  )
}

export default Logo