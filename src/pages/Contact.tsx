import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SEO, Container, Button, Card, Input, Textarea, Loading } from '../components';
import { companyInfo } from '../data/products';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email.trim()) newErrors.email = 'Email обязателен';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Пожалуйста, введите корректный email';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен';
    if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', type: 'general' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Контакты - ДомСтрой"
        description="Свяжитесь со СтройМатериалами для расценок, запросов о продукции и поддержки клиентов. Доступны телефон, email, WhatsApp и форма обратной связи."
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
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <Phone className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Телефон</h3>
              <a href="tel:+55123456789" className="text-secondary-600 hover:text-primary-500 font-semibold">
                +55 (123) 456-789
              </a>
              <p className="text-sm text-secondary-500 mt-2">Понедельник - Пятница, 8:00 - 18:00</p>
            </Card>

            <Card className="p-6">
              <MessageCircle className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/55123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-500 font-semibold"
              >
                +55 (123) 456-789
              </a>
              <p className="text-sm text-secondary-500 mt-2">Быстрые ответы, в любое время</p>
            </Card>

            <Card className="p-6">
              <Mail className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:info@buildmate.com" className="text-secondary-600 hover:text-primary-500 font-semibold">
                info@buildmate.com
              </a>
              <p className="text-sm text-secondary-500 mt-2">Ответим в течение 24 часов</p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <Card className="p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Адрес</h3>
                      <p className="text-secondary-700">{companyInfo.address}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Время работы</h3>
                      <div className="text-secondary-700 whitespace-pre-line text-sm">
                        {companyInfo.hours}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-secondary-50">
                <h3 className="font-bold text-lg mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <a href="tel:+55123456789" className="btn-secondary flex items-center justify-center gap-2 w-full">
                    <Phone size={20} />
                    Позвонить сейчас
                  </a>
                  <a
                    href="https://wa.me/55123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors w-full"
                  >
                    <MessageCircle size={20} />
                    Написать в WhatsApp
                  </a>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-8">
                <h2 className="mb-6">Отправить сообщение</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                    <p className="text-green-900 font-semibold">
                      Спасибо! Ваше сообщение успешно отправлено. Мы скоро с вами свяжемся.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Ваше имя"
                    required
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                  />

                  <Input
                    label="Телефон"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="+55 (123) 456-789"
                    required
                  />

                  <div>
                    <label className="block text-sm font-semibold text-secondary-900 mb-2">
                      Тип запроса
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="general">Общий запрос</option>
                      <option value="quote">Запрос расценки</option>
                      <option value="inquiry">Запрос о товаре</option>
                    </select>
                  </div>

                  <Textarea
                    label="Сообщение"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Расскажите нам о ваших потребностях..."
                    rows={5}
                    required
                  />

                  <Button type="submit" fullWidth disabled={loading}>
                    {loading ? 'Отправка...' : 'Отправить сообщение'}
                  </Button>
                </form>

                <p className="text-sm text-secondary-600 text-center mt-6">
                  Обычно мы отвечаем в течение 24 часов в рабочее время
                </p>
              </Card>
            </div>
          </div>
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
