import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-smooth ${
        isScrolled 
          ? 'bg-white shadow-premium' 
          : 'bg-white'
      } border-b border-border`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* EHA Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}Images/Ts Logo tree.jpg`}
              alt="Echoing Healthy Ageing Tree Logo"
              className="h-16 w-auto"
            />
            <img
              src={`${import.meta.env.BASE_URL}Images/Ts EHA Name.jpg`}
              alt="Echoing Healthy Ageing"
              className="h-16 w-auto translate-y-1"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "#" },
              { name: "Events", href: "#events" },
              { name: "About Us", href: "#about" },
              { name: "Contact", href: "#contact" }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-smooth font-medium text-sm"
              >
                {item.name}
              </a>
            ))}
            <Button
              variant="cta"
              size="sm"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfQ6F3ef-D1N5AZq9fK3DSn0Xu8exEMtk3e6HlLDL8a3upM_Q/viewform', '_blank')}
              className="shadow-card hover:shadow-glow transition-smooth hover:scale-105 ml-2"
            >
              Register Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {[
                { name: "Home", href: "#" },
                { name: "Events", href: "#events" },
                { name: "About Us", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-smooth py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="cta"
                size="sm"
                className="w-full shadow-card hover:shadow-glow transition-smooth"
                onClick={() => {
                  window.open('https://docs.google.com/forms/d/e/1FAIpQLSfQ6F3ef-D1N5AZq9fK3DSn0Xu8exEMtk3e6HlLDL8a3upM_Q/viewform', '_blank');
                  setIsMenuOpen(false);
                }}
              >
                Register Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
};