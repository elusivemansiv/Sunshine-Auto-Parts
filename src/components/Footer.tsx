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
    <footer className="bg-white border-t border-slate-200">
      {/* Trust Badges */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $199' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Shield, title: 'Secure Checkout', desc: '256-bit encryption' },
              { icon: CreditCard, title: 'Flexible Payment', desc: 'Multiple options' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{badge.title}</div>
                  <div className="text-xs text-slate-500">{badge.desc}</div>
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
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-heading">S</span>
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-slate-900">Sunshine</span>
                <span className="text-xl font-bold font-heading text-red-500">Auto Parts</span>
              </div>
            </Link>
            <p className="text-slate-600 text-sm mb-6 max-w-sm">
              Your trusted source for premium automotive performance parts. We carry only the best brands with expert support and fast shipping.
            </p>
            <div className="space-y-3">
              <a href="tel:1-800-AUTO-PARTS" className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                <Phone className="w-4 h-4 text-red-500" />
                1-800-AUTO-PARTS
              </a>
              <a href="mailto:support@autoparts.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                <Mail className="w-4 h-4 text-red-500" />
                support@autoparts.com
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-red-500" />
                123 Performance Dr, City, ST 12345
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-slate-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-slate-900 font-semibold mb-1">Subscribe to our newsletter</h4>
              <p className="text-sm text-slate-600">Get the latest deals and new arrivals delivered to your inbox.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 w-64"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-red-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            © {currentYear} Sunshine Auto Parts. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-[#1877F2]/10 rounded-lg flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-black/5 rounded-lg flex items-center justify-center text-black hover:bg-black/10 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-[#E1306C]/10 rounded-lg flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-[#FF0000]/10 rounded-lg flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000]/20 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}