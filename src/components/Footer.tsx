import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, RotateCcw } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Parts', href: '/products' },
      { name: 'Brakes', href: '/products?category=brakes' },
      { name: 'Suspension', href: '/products?category=suspension' },
      { name: 'Engine', href: '/products?category=engine' },
      { name: 'Wheels & Tires', href: '/products?category=wheels' },
      { name: 'Exhaust Systems', href: '/products?category=exhaust' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty Info', href: '/warranty' },
      { name: 'Installation Guides', href: '/guides' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  return (
    <footer className="bg-slate-950 text-white">
      {/* Trust Badges */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $199' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Shield, title: 'Secure Checkout', desc: '256-bit encryption' },
              { icon: CreditCard, title: 'Flexible Payment', desc: 'Multiple options' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-slate-900/50 rounded-2xl border border-slate-800/60 hover:border-red-500/30 transition-colors">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                  <badge.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-0.5">{badge.title}</div>
                  <div className="text-xs text-slate-400">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-heading">S</span>
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white">Sunshine </span>
                <span className="text-xl font-bold font-heading text-red-500">AutoParts</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              Your trusted source for premium automotive performance parts. We carry only the best brands with expert support and fast shipping.
            </p>
            <div className="space-y-4">
              <a href="tel:1-800-AUTO-PARTS" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-red-500" />
                </div>
                1-800-AUTO-PARTS
              </a>
              <a href="mailto:support@autoparts.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-red-500" />
                </div>
                support@autoparts.com
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                123 Performance Dr, City, ST 12345
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-400 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-400 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-400 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-400 hover:text-red-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Subscribe to our newsletter</h4>
              <p className="text-sm text-slate-400">Get the latest deals and new arrivals delivered to your inbox.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 w-64 md:w-80"
              />
              <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            © {currentYear} Sunshine Auto Parts. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}