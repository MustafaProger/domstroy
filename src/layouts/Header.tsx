import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Container, Button } from '../components';

const menuItems = [
  { label: 'Главная', href: '/' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-secondary-200 shadow-sm">
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-secondary-900 hover:text-primary-500 transition-colors">
          <img src="/icon.png" alt="ДомСтрой" className="h-8 w-8 object-contain" />
          ДомСтрой
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-secondary-900 hover:text-primary-500 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+55123456789"
            className="flex items-center gap-2 px-4 py-2 text-secondary-900 hover:bg-secondary-50 rounded-lg transition-colors"
            aria-label="Позвонить нам"
          >
            <Phone size={20} />
            <span className="text-sm font-medium">+55 (123) 456-789</span>
          </a>
          <a
            href="https://wa.me/55123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
        </div>

        <button
          className="md:hidden p-2 hover:bg-secondary-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Переключить меню"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-secondary-200 bg-secondary-50">
          <Container className="py-4 flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-secondary-900 hover:text-primary-500 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <a
                href="tel:+55123456789"
                className="btn-secondary text-center text-sm"
              >
                <Phone className="inline mr-2" size={18} />
                Позвонить
              </a>
              <a
                href="https://wa.me/55123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
