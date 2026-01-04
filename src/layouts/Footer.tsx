import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Container } from '../components';

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <Container className="py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-400">BuildMate</h3>
            <p className="text-secondary-300 mb-4">
              High-quality construction materials delivered to your projects with professional service.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Cement & Concrete
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Bricks & Blocks
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Steel & Iron
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Tools & Equipment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-400">Phone</p>
                  <a href="tel:+55123456789" className="text-secondary-100 hover:text-primary-400 transition-colors">
                    +55 (123) 456-789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-400">WhatsApp</p>
                  <a
                    href="https://wa.me/55123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-100 hover:text-primary-400 transition-colors"
                  >
                    +55 (123) 456-789
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-400">Email</p>
                  <a
                    href="mailto:info@buildmate.com"
                    className="text-secondary-100 hover:text-primary-400 transition-colors"
                  >
                    info@buildmate.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-400">Address</p>
                  <p className="text-secondary-100">123 Industrial Ave, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              &copy; {new Date().getFullYear()} BuildMate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
