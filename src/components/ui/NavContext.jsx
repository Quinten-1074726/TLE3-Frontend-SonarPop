import { createContext, useContext, useState } from "react";

const NavContext = createContext(null);

export function NavProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen((v) => !v);

  return (
    <NavContext.Provider value={{ 
      isSearchOpen, 
    openSearch, 
    closeSearch, 
    toggleSearch }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside <NavProvider>");
  return ctx;
}