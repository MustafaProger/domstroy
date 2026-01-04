import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Container } from '../components';

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <Container className="py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-400">ДомСтрой</h3>
            <p className="text-secondary-300 mb-4">
              Высококачественные строительные материалы для ваших проектов с профессиональным сервисом.
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
            <h4 className="font-semibold mb-4 text-lg">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Продукция
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Категории</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Цемент и бетон
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Кирпич и блоки
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Сталь и железо
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Инструменты и оборудование
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Контактная информация</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-secondary-400">Телефон</p>
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
                  <p className="text-sm text-secondary-400">Адрес</p>
                  <p className="text-secondary-100">123 Industrial Ave, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              &copy; {new Date().getFullYear()} ДомСтрой. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors text-sm">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
