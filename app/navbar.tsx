'use client'
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Hospital Management System</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link href="/reception" className="hover:underline">Reception</Link>
                        </li>
                        <li>
                            <Link href="/doctors" className="hover:underline">Doctors</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}