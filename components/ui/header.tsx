// components/ui/header.tsx
import Image from "next/image";
import logo from "../../public/images/logo.png"; // Adjust the path to your logo

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-100 border-b border-gray-300 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Container for the logo */}
        <div className="relative w-36 h-20 overflow-hidden bg-gray-100">
          <Image
            src={logo}
            alt="Clinic Logo"
            layout="fill"
            objectFit="contain"
            className="transform scale-110" // Increase logo size
          />
        </div>
        <div className="text-right">
          <h1 className="text-[22pt] font-black text-[#7AD47A]">
            SAFE-SIGHT EYE CARE
          </h1>
          <p className="text-gray-700 text-sm">An excellent eye care centre</p>
          <p className="text-gray-700 text-sm">
            Kiyam Siphai Babu Bazar, Thoubal, Manipur-795138
          </p>
          <p className="text-gray-700 text-sm">
            03848 291288 (Call) / 8257970103
          </p>
          <p className="text-gray-700 text-sm">safesighteyeclinic@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
