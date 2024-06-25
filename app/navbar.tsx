'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Hospital Management System</h1>
                <nav>
                    <ul className="flex space-x-4">
                        {pathname !== '/' && (
                            <li>
                                <Link href="/" className="hover:underline">Home</Link>
                            </li>
                        )}
                        {pathname !== '/reception' && pathname !== '/doctors' && (
                            <li>
                                <Link href="/reception" className="hover:underline">Reception</Link>
                            </li>
                        )}
                        {pathname !== '/doctors' && pathname !== '/reception' && (
                            <li>
                                <Link href="/doctors" className="hover:underline">Doctors</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
