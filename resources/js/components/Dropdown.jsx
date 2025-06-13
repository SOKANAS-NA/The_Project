import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';

export default function Dropdown({ children }) {
    return <Menu as="div" className="relative">{children}</Menu>;
}

Dropdown.Trigger = function DropdownTrigger({ children }) {
    return (
        <Menu.Button className="flex items-center">
            {children}
        </Menu.Button>
    );
};

Dropdown.Content = function DropdownContent({ children }) {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {children}
            </Menu.Items>
        </Transition>
    );
};

Dropdown.Link = function DropdownLink({ href, method = 'get', as = 'a', className = '', children }) {
    return (
        <Menu.Item>
            {({ active }) => (
                <Link
                    href={href}
                    method={method}
                    as={as}
                    className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ${
                        active ? 'bg-gray-100' : ''
                    } ${className}`}
                >
                    {children}
                </Link>
            )}
        </Menu.Item>
    );
}; 