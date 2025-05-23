import { Disclosure } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import React from "react";

interface NavItem {
  name: string;
  href: string;
  submenu?: NavItem[];
}

const navigation: NavItem[] = [
  {
    name: "Serviços",
    href: "#",
    submenu: [
      {
        name: "Turismo",
        href: "/turismo",
      },
      {
        name: "Esporte e Lazer",
        href: "/esporte-e-lazer",
      },
      {
        name: "Cultura",
        href: "/cultura",
      },
    ],
  },
  {
    name: "Fale Conosco",
    href: "/#fale-conosco",
  },
];

const Logo = () => (
  <div className="relative flex items-center h-full">
    <Link to="/">
      <img
        src="/images/Logo/logo.png"
        alt="Logo"
        width={220}
        height={80}
        className="h-full w-auto object-contain"
      />
    </Link>
  </div>
);

const NavLinks: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeSubSubMenu, setActiveSubSubMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="hidden lg:flex relative uppercase">
      {isLoading && <LoadingScreen />}
      {navigation.map((item) => {
        const isActive =
          pathname.startsWith(item.href) ||
          item.submenu?.some(
            (sub) =>
              pathname.startsWith(sub.href) ||
              sub.submenu?.some((subSub) => pathname.startsWith(subSub.href))
          );
        return (
          <div
            key={item.name}
            className="relative group"
            onMouseEnter={() => setActiveMenu(item.name)}
            onMouseLeave={() => {
              setActiveMenu(null);
              setActiveSubMenu(null);
              setActiveSubSubMenu(null);
            }}
          >
            <Link
              to={item.href}
              className={`text-[#0037C1] text-[15px] font-semibold flex p-3 hover:bg-[#224276] hover:text-[#ffffff] hover:underline decoration-[#13AFF0] ${
                isActive
                  ? "bg-[#224276] underline decoration-[#13AFF0] text-[#ffffff]"
                  : ""
              }`}
              onClick={(e) => {
                setActiveMenu(null);
                setActiveSubMenu(null);
                setActiveSubSubMenu(null);
                const isHashLink = item.href.startsWith("/#");
                if (isHashLink) {
                  const id = item.href.split("#")[1];
                  if (pathname === "/") {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                } else {
                  handleClick();
                }
              }}
            >
              {item.name}
              {item.submenu && <MdKeyboardArrowDown className="ml-2" />}
            </Link>

            {activeMenu === item.name && item.submenu && (
              <div className="absolute left-0 bg-[#2b73d0f5] shadow-lg w-60 border border-slate-300 z-50 flex flex-col">
                {item.submenu.map((subItem) => {
                  const isSubActive =
                    pathname.startsWith(subItem.href) ||
                    subItem.submenu?.some((subSub) =>
                      pathname.startsWith(subSub.href)
                    );
                  return (
                    <div
                      key={subItem.name}
                      className="relative group"
                      onMouseEnter={() => setActiveSubMenu(subItem.name)}
                      onMouseLeave={() => setActiveSubMenu(null)}
                    >
                      <Link
                        to={subItem.href}
                        className={`px-4 py-3 text-white text-[15px] flex items-center hover:bg-[#fdfdfd] hover:text-[#2b63ab] ${
                          isSubActive ? "bg-[#224276] text-[#ffffff]" : ""
                        }`}
                        onClick={(e) => {
                          setActiveMenu(null);
                          setActiveSubMenu(null);
                          setActiveSubSubMenu(null);
                          const isHashLink = subItem.href.startsWith("/#");
                          if (isHashLink) {
                            const id = subItem.href.split("#")[1];
                            if (pathname === "/") {
                              e.preventDefault();
                              const element = document.getElementById(id);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          } else {
                            handleClick();
                          }
                        }}
                      >
                        {subItem.name}
                        {subItem.submenu && (
                          <MdKeyboardArrowRight className="ml-2 text-white" />
                        )}
                      </Link>

                      {activeSubMenu === subItem.name && subItem.submenu && (
                        <div className="absolute left-full top-0 bg-[#2b73d0f5] shadow-lg w-56 border border-slate-300 z-50 flex flex-col">
                          {subItem.submenu.map((subSubItem) => {
                            const isSubSubActive = pathname.startsWith(
                              subSubItem.href
                            );
                            return (
                              <div
                                key={subSubItem.name}
                                className="relative group"
                                onMouseEnter={() =>
                                  setActiveSubSubMenu(subSubItem.name)
                                }
                                onMouseLeave={() => setActiveSubSubMenu(null)}
                              >
                                <Link
                                  to={subSubItem.href}
                                  className={`px-4 py-2 text-white text-base flex items-center hover:bg-[#fdfdfd] hover:text-[#2b63ab] ${
                                    isSubSubActive
                                      ? "bg-[#224276] text-[#ffffff]"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    setActiveMenu(null);
                                    setActiveSubMenu(null);
                                    setActiveSubSubMenu(null);
                                    const isHashLink =
                                      subSubItem.href.startsWith("/#");
                                    if (isHashLink) {
                                      const id = subSubItem.href.split("#")[1];
                                      if (pathname === "/") {
                                        e.preventDefault();
                                        const element =
                                          document.getElementById(id);
                                        if (element) {
                                          element.scrollIntoView({
                                            behavior: "smooth",
                                          });
                                        }
                                      }
                                    } else {
                                      handleClick();
                                    }
                                  }}
                                >
                                  {subSubItem.name}
                                  {subSubItem.submenu && (
                                    <MdKeyboardArrowRight className="ml-2 text-white" />
                                  )}
                                </Link>

                                {activeSubSubMenu === subSubItem.name &&
                                  subSubItem.submenu && (
                                    <div className="absolute left-full top-0 bg-[#2b73d0f5] shadow-lg w-56 border border-slate-300 z-50 flex flex-col">
                                      {subSubItem.submenu.map(
                                        (subSubSubItem) => {
                                          const isSubSubSubActive =
                                            pathname.startsWith(
                                              subSubSubItem.href
                                            );
                                          return (
                                            <Link
                                              key={subSubSubItem.name}
                                              to={subSubSubItem.href}
                                              className={`block px-4 py-2 text-white hover:bg-[#fdfdfd] hover:text-[#2b63ab] text-base ${
                                                isSubSubSubActive
                                                  ? "bg-[#224276] text-[#ffffff]"
                                                  : ""
                                              }`}
                                              onClick={(e) => {
                                                setActiveMenu(null);
                                                setActiveSubMenu(null);
                                                setActiveSubSubMenu(null);
                                                const isHashLink =
                                                  subSubSubItem.href.startsWith(
                                                    "/#"
                                                  );
                                                if (isHashLink) {
                                                  const id =
                                                    subSubSubItem.href.split(
                                                      "#"
                                                    )[1];
                                                  if (pathname === "/") {
                                                    e.preventDefault();
                                                    const element =
                                                      document.getElementById(
                                                        id
                                                      );
                                                    if (element) {
                                                      element.scrollIntoView({
                                                        behavior: "smooth",
                                                      });
                                                    }
                                                  }
                                                } else {
                                                  handleClick();
                                                }
                                              }}
                                            >
                                              {subSubSubItem.name}
                                            </Link>
                                          );
                                        }
                                      )}
                                    </div>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ closeMenu }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      closeMenu();
    }, 500);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchInput = inputRef.current?.value;
      if (searchInput) {
        setIsLoading(true);
        navigate(`/search/${encodeURIComponent(searchInput)}`);
        setTimeout(() => {
          setIsLoading(false);
          handleClose();
        }, 2000);
      }
    }
  };

  const renderSubMenu = (items: NavItem[], level = 1) => (
    <div className={`pl-${level * 4} mt-2 text-center`}>
      {items.map((item) => (
        <div key={item.name} className="mb-2">
          {item.submenu ? (
            <div className="flex items-center justify-center w-full">
              <Link
                to={item.href}
                className="text-[#0037C1] text-lg font-normal hover:underline p-2 flex items-center gap-2"
                onClick={(e) => {
                  if (item.submenu) {
                    e.preventDefault();
                    toggleMenu(item.name);
                  } else {
                    handleClose();
                  }
                }}
              >
                {item.name}
                {openMenus[item.name] ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </Link>
            </div>
          ) : (
            <Link
              to={item.href}
              className="block w-full text-[#0037C1] text-lg font-normal hover:underline p-2 text-center"
              onClick={handleClose}
            >
              {item.name}
            </Link>
          )}
          {item.submenu &&
            openMenus[item.name] &&
            renderSubMenu(item.submenu, level + 1)}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />
      )}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-yellow-400 shadow-lg flex flex-col"
        initial={{ y: "-100%" }}
        animate={{ y: isClosing ? "-100%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 50 }}
      >
        <div className="py-5 px-5 flex flex-col border-b border-gray-200">
          <div className="flex justify-between items-center">
            <Logo />
            <button onClick={handleClose} className="p-2 text-black text-2xl">
              ✕
            </button>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-auto text-center">
          {renderSubMenu(navigation, 1)}
        </div>
        <div className="p-4 flex justify-center border-t border-gray-200">
          <div className="relative w-full max-w-md flex items-center bg-white px-4 py-2 rounded-full shadow-md">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 px-2 text-gray-700 focus:outline-none"
              ref={inputRef}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

interface SearchBarProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hideIcon?: boolean;
}

const SearchBar = ({ setIsLoading, hideIcon = false }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchInput = inputRef.current?.value;
      if (searchInput) {
        setIsLoading(true);
        navigate(`/search/${encodeURIComponent(searchInput)}`);
        setTimeout(() => {
          setIsLoading(false);
          setIsSearching(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      {!hideIcon && (
        <button
          onClick={() => setIsSearching(true)}
          className="text-[#0037C1] hover:rounded-full hover:bg-[#224276] hover:text-white p-3 text-xl focus:outline-none cursor-pointer"
          aria-label="Abrir busca"
        >
          <FaSearch />
        </button>
      )}

      {isSearching && (
        <div className="fixed inset-0 bg-[#010306c0] backdrop-blur-sm flex items-center justify-center z-50">
          <button
            className="fixed top-4 right-4 text-white text-4xl p-4 hover:text-gray-300 transition-colors duration-200"
            onClick={() => setIsSearching(false)}
          >
            &times;
          </button>

          <div className="relative w-full max-w-xl">
            <input
              type="text"
              name="search"
              placeholder="BUSCAR"
              className="bg-transparent text-white text-[20px] mt-20 text-center px-4 py-2 w-full border-b-2 border-gray-300 rounded-lg placeholder-white focus:outline-none focus:border-slate-300 focus:ring-0 focus:shadow-none"
              ref={inputRef}
              autoFocus
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      )}
    </>
  );
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#FDC300] flex flex-col items-center justify-center z-50">
      <img
        src="/images/Logo/logotop.png"
        alt="Carregando"
        width={150}
        height={110}
        className="animate-pulse"
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 w-full h-20 transition-all duration-300 z-50 px-[50px] ${
        scrolled ? "bg-[#fdc200d1] shadow-md" : "bg-[#FDC300]"
      }`}
    >
      <div className="relative mx-auto py-3">
        <div className="relative flex h-14 items-center">
          {/* Logo à esquerda */}
          <Logo />

          {/* Container para NavLinks + SearchBar alinhados à direita */}
          <div className="hidden 2xl:flex ml-auto items-center space-x-4">
            <NavLinks />
            <SearchBar setIsLoading={setIsLoading} />
          </div>

          {/* Ícone do menu mobile visível apenas em telas menores */}
          <div className="2xl:hidden ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
              <Bars3Icon className="h-6 w-6 text-[#0037C1] cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && <MobileMenu closeMenu={closeMenu} />}
      </div>

      {/* Tela de carregamento exibida aqui enquanto isLoading for true */}
      {isLoading && <LoadingScreen />}
    </Disclosure>
  );
};

export default Navbar;