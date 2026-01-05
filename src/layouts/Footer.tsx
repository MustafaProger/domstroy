import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { Container } from '../components';

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="py-14">
        <Container>
          <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-h3 font-bold mb-4 text-primary-400">ДомСтрой</h3>
            <p className="text-secondary-300 mb-4 text-bodySm">
              Высококачественные строительные материалы для ваших проектов с профессиональным сервисом.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-body text-secondary-100">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Продукция
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-body text-secondary-100">Категории</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Цемент и бетон
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Кирпич и блоки
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Сталь и железо
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors text-bodySm">
                  Инструменты и оборудование
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-body text-secondary-100">Контактная информация</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-caption text-secondary-400">Телефон</p>
                  <a href="tel:+79969979239" className="text-secondary-100 hover:text-primary-400 transition-colors text-bodySm">
                    +7 996 997 92 39
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-caption text-secondary-400">WhatsApp</p>
                  <a
                    href="https://wa.me/79969979239"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-100 hover:text-primary-400 transition-colors text-bodySm"
                  >
                    +7 996 997 92 39
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-caption text-secondary-400">Email</p>
                  <a
                    href="mailto:abuzarkamilov@gmail.com"
                    className="text-secondary-100 hover:text-primary-400 transition-colors text-bodySm"
                  >
                    abuzarkamilov@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Send size={18} className="mt-1 text-primary-400 flex-shrink-0" />
                <div>
                  <p className="text-caption text-secondary-400">Telegram</p>
                  <a
                    href="https://t.me/Abuzarr222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-100 hover:text-primary-400 transition-colors text-bodySm"
                  >
                    @Abuzarr222
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="border-t border-secondary-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-secondary-400 text-bodySm">
                &copy; {new Date().getFullYear()} ДомСтрой. Все права защищены.
              </p>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="text-secondary-400 hover:text-primary-400 transition-colors text-bodySm">
                  Политика конфиденциальности
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
