import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { SEO, Container, Button, Card } from '../components';

export function Contact() {
  return (
    <>
      <SEO
        title="Контакты - ДомСтрой"
        description="Свяжитесь со СтройМатериалами для расценок, запросов о продукции и поддержки клиентов. Доступны телефон, email, WhatsApp и Telegram."
        keywords="контакты, поддержка, расценка, запрос"
      />

      <section className="bg-secondary-50 border-b border-secondary-200 py-8 md:py-12">
        <Container>
          <h1>Свяжитесь с нами</h1>
          <p className="text-secondary-600 mt-2 max-w-xl">
            Свяжитесь с нашей командой для расценок, запросов или любых вопросов о нашей продукции и услугах
          </p>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <Card className="p-6">
              <Phone className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Телефон</h3>
              <a href="tel:+79969979239" className="text-secondary-600 hover:text-primary-500 font-semibold">
                +7 996 997 92 39
              </a>
            </Card>

            <Card className="p-6">
              <MessageCircle className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/79969979239"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-500 font-semibold"
              >
                +7 996 997 92 39
              </a>
              <p className="text-sm text-secondary-500 mt-2">WhatsApp по номеру выше</p>
            </Card>

            <Card className="p-6">
              <Mail className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:abuzarkamilov@gmail.com" className="text-secondary-600 hover:text-primary-500 font-semibold">
                abuzarkamilov@gmail.com
              </a>
              <p className="text-sm text-secondary-500 mt-2">Ответим в течение 24 часов</p>
            </Card>

            <Card className="p-6">
              <Send className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Telegram</h3>
              <a
                href="https://t.me/Abuzarr222"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-500 font-semibold"
              >
                @Abuzarr222
              </a>
              <p className="text-sm text-secondary-500 mt-2">Напишите нам в Telegram</p>
            </Card>
          </div>

          <Card className="p-0 overflow-hidden">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Adedb77a49f9fda2ac38f0164aaea67d0384e09cca3b6033832268d3ad24cbf29&amp;source=constructor"
              className="w-full h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Card>
        </Container>
      </section>

      <section className="bg-secondary-50 py-12 md:py-16">
        <Container className="text-center">
          <h2 className="mb-4">Не можете найти то, что нужно?</h2>
          <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
            Просмотрите наш полный каталог продукции или позвольте нашей команде помочь вам найти идеальные материалы для вашего проекта
          </p>
          <Link to="/catalog">
            <Button variant="secondary">Посмотреть все товары</Button>
          </Link>
        </Container>
      </section>
    </>
  );
}
