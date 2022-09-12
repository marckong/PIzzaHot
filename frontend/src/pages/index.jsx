/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import pizza from '/public/pizza.jpg';

export default function Home() {
  return (
    <div className='relative overflow-hidden bg-white'>
      <div className='mx-auto max-w-7xl'>
        <div className='z-101 relative bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32'>
          <main className='mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:mr-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Welcome to the</span>{' '}
                <span className='block text-yellow-400 xl:inline'>
                  StrongMind
                </span>
                <span className='block'>Pizza CRM</span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>
                Please select if you are the owner or the chef to get started!
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center'>
                <div className='rounded-md shadow'>
                  <Link href='/owner'>
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-400 px-8 py-3 text-base font-medium text-black hover:bg-yellow-700 md:py-4 md:px-10 md:text-lg'>
                      Owner
                    </a>
                  </Link>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Link href='/chef'>
                    <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-100 px-8 py-3 text-base font-medium text-black hover:bg-yellow-200 md:py-4 md:px-10 md:text-lg'>
                      Chef
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-20 lg:-right-40 lg:w-[60%]'>
        <img
          className='h-56 w-full object-cover sm:h-72 md:h-96  '
          src={pizza.src}
          alt=''
        />
      </div>
    </div>
  );
}
