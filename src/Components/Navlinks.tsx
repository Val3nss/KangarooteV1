import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathname = usePathname();
  
  const Links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div className="flex items-center space-x-2 lg:space-x-6">
      {Links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            relative group px-3 py-2 text-white text-sm font-medium
            transition-all duration-300 ease-in-out
            ${pathname === link.href 
              ? "text-blue-500" 
              : "hover:text-blue-300"}
          `}
        >
          <span className="relative z-10">{link.label}</span>
          
          {/* Animated Underline */}
          <span 
            className={`
              absolute bottom-0 left-0 w-full h-0.5 bg-blue-500
              transform scale-x-0 origin-left 
              group-hover:scale-x-100 
              transition-transform duration-300 ease-out
              ${pathname === link.href ? "scale-x-100" : ""}
            `}
          />
        </Link>
      ))}
    </div>
  );
}

export default Navlinks;