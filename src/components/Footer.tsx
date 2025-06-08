import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rhydam-panda-854ab7193',
      icon: '💼'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/RhydamP',
      icon: '💻'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: '🐦'
    },
    {
      name: 'Email',
      href: 'mailto:contact@wildwhiskers.com',
      icon: '📧'
    }
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-100 border-t border-white/20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-sky-100/85 backdrop-blur-sm"></div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <img
                  src="/image.png"
                  alt="WildWhiskers Logo"
                  className="w-10 h-10 object-contain"
                />
                <h3 className="text-xl font-bold text-white">WildWhiskers</h3>
              </div>
              <p className="text-white/70 text-sm max-w-xs mx-auto md:mx-0">
                Connecting pet lovers worldwide through stories, tips, and unconditional love.
              </p>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-white/90 group-hover:text-white text-sm font-medium">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium hover:underline decoration-cyan-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-white/60">
                © {new Date().getFullYear()} Rhydam's WildWhiskers. Made with ❤️ for pet lovers everywhere.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;