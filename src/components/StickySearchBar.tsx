import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "./SearchBar";

interface StickySearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const StickySearchBar = ({ value, onChange }: StickySearchBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4"
        >
          <div className="max-w-7xl mx-auto">
            <SearchBar value={value} onChange={onChange} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};