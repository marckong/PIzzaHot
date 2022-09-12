import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Chef', href: '/chef' },
  { name: 'Owner', href: '/owner' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Nav() {
  const router = useRouter();

  return (
    <div className='z-50 mx-auto w-full border-b bg-white'>
      <Popover>
        <div className='relative px-4 pt-2 pb-2 sm:px-6 lg:px-8'>
          <nav
            className='relative flex items-center justify-between sm:h-10 lg:justify-center'
            aria-label='Global'
          >
            <div className='flex flex-shrink-0 flex-grow items-center lg:flex-grow-0'>
              <div className='flex w-full items-center justify-between md:w-auto'>
                <div className='-mr-2 flex items-center md:hidden'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='hidden md:ml-10 md:block md:space-x-8 md:pr-4'>
              {navigation.map((item) => (
                <Link href={item.href} key={item.name} passHref>
                  <a
                    className={classNames(
                      ' font-heavy px-1 text-lg',
                      router.route === item.href
                        ? 'border-yellow-600 text-yellow-600 border-b focus:text-yellow-600'
                        : ' hover:border-yellow-600  hover:text-yellow-600 text-gray-600 hover:border-b'
                    )}
                    aria-current={
                      router.route === item.href ? 'page' : undefined
                    }
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden'
          >
            <div className='overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5'>
              <div className='flex items-center justify-between px-5 pt-4'>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Close main menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
