import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import isEmpty from 'lodash/isEmpty';

import Img from '../Img';
import { getStorage } from '../../utils/storage';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Menu {
  name: string;
  href: string;
  current: boolean;
}

const Navbar: FunctionComponent<{}> = () => {
  const { pathname } = useRouter();
  const [isUserLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const slugAdmin = pathname.substring(7);
  const slugUser = pathname.substring(1);
  const isAdmin = pathname.includes('admin');

  useEffect(() => {
    const session = getStorage('admin/session');
    if (session) setUserLoggedIn(true);
  }, []);

  const isActiveAdmin = (path: string): boolean => {
    if (slugAdmin.includes('product') && !isEmpty(path)) {
      return slugAdmin.includes(path);
    };
    return path === slugAdmin
  };
  const isActiveUser = (path: string): boolean => path === slugUser;

  const menuUser: Menu[] = [
    { name: 'Home', href: '/', current: isActiveUser('') },
    { name: 'Shipping', href: '/shipping', current: isActiveUser('shipping') },
    { name: 'Chart', href: '/chart', current: isActiveUser('chart') },
    { name: 'History', href: '/history', current: isActiveUser('history') },
  ];

  const menuAdmin: Menu[] = [
    { name: 'Dashboard', href: '/admin', current: isActiveAdmin('') },
    { name: 'Products', href: '/admin/product', current: isActiveAdmin('product') },
    { name: 'Order', href: '/admin/order', current: isActiveAdmin('order') },
    { name: 'Payment', href: '/admin/payment', current: isActiveAdmin('payment') },
    { name: 'Shipping', href: '/admin/shipping', current: isActiveAdmin('shipping') },
    { name: 'Report', href: '/admin/report', current: isActiveAdmin('report') },
  ];

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: `${isAdmin ? '/admin/logout' : '/logout'}` },
  ];

  const menu: Menu[] = !isAdmin ? menuUser : menuAdmin;
  return (
    <nav className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {menu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <div
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                            )}
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      {isUserLoggedIn ? (
                        <>
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <Img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                                width={32}
                                height={32}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      ): (
                        <Menu.Item>
                          <Link href={`${isAdmin ? '/admin' : ''}/login`}>
                            <div
                              className={classNames(
                                'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                              )}
                            >
                              Login
                            </div>
                          </Link>
                        </Menu.Item>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {menu.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </nav>
  )
};

export default Navbar;