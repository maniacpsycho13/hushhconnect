import Link from 'next/link'
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <div className='px-6 pt-4'>
        <div className='flex justify-between items-center'>
        <div className="bg-clip-text text-transparent bg-gradient-to-l from-[#E54D60]  to-[#A342FF] text-xl font-semibold ">Hushh Connect</div> 
          <div className='flex gap-[26px] pt-[6px]'>
            <Link href={'home/thread'}><div className=" text-gray-500 text-sm font-medium  leading-[22.91px] ">Thread</div></Link>
            <Link href={'home/product'}><div className=" text-gray-500 text-sm font-medium  leading-[22.91px]">Product</div></Link>
          </div>
        </div>
        </div>
    <div>{children}</div>
    </div>
  )
}

export default layout