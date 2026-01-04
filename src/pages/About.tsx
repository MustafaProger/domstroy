import { Link } from 'react-router-dom';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';
import { SEO, Container, Button, Card } from '../components';
import { companyInfo } from '../data/products';

export function About() {
  return (
    <>
      <SEO
        title="О нас - ДомСтрой"
        description="Узнайте о СтройМатериалах - надежном поставщике премиальных строительных материалов уже более 25 лет."
        keywords="о нас, строительные материалы, поставщик, компания"
      />

      <section className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900 text-white py-16 md:py-24">
        <Container className="text-center">
          <h1 className="text-display-xl mb-4">О нас</h1>
          <p className="text-xl text-secondary-200 max-w-2xl mx-auto">
            Ваш надежный партнер по премиальным строительным материалам с 1995 года
          </p>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-4">Наша история</h2>
              <p className="text-secondary-700 mb-4 leading-relaxed">
                Основанная в 1995 году, компания ДомСтрой начала с простой миссии: предоставлять высококачественные строительные материалы по справедливым ценам. То, что начиналось как небольшое предприятие, выросло в одного из самых надежных поставщиков региона для строительных профессионалов.
              </p>
              <p className="text-secondary-700 mb-4 leading-relaxed">
                За {new Date().getFullYear() - companyInfo.foundedYear} лет мы построили прочные отношения с подрядчиками, строительными компаниями и индивидуальными строителями. Наша приверженность качеству, надежности и исключительному обслуживанию клиентов сделала нас предпочтительным выбором для тысяч проектов.
              </p>
              <p className="text-secondary-700 leading-relaxed">
                Сегодня мы работаем на современном объекте, укомплектованном более чем 300 строительными продуктами, поддерживаемые командой опытных профессионалов, преданных вашему успеху.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg"
                alt="Объект СтройМатериалов"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-secondary-50 py-12 md:py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2>Почему выбирают нас</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Мы преданы успеху вашего проекта благодаря качественным материалам и профессиональному сервису
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Award className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Премиальное качество</h3>
              <p className="text-secondary-600 text-sm">
                Все продукты соответствуют международным стандартам и проходят строгий контроль качества
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Экспертная поддержка</h3>
              <p className="text-secondary-600 text-sm">
                Наша команда предоставляет профессиональные консультации по выбору материалов
              </p>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Конкурентные цены</h3>
              <p className="text-secondary-600 text-sm">
                Лучшие цены на рынке без компромиссов в качестве
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Надежность</h3>
              <p className="text-secondary-600 text-sm">
                Быстрая доставка и стабильный сервис, на который можно положиться
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mb-12 text-center">
            <h2>Наши вехи</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Ключевые достижения в нашем пути как поставщика строительных материалов
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">1995</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Основание</h3>
                <p className="text-secondary-600">ДомСтрой открывает свой первый объект с небольшим выбором материалов</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2005</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Расширение</h3>
                <p className="text-secondary-600">Открыт современный распределительный центр и расширен ассортимент до 300+ товаров</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2015</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Цифровая трансформация</h3>
                <p className="text-secondary-600">Запущена система онлайн-заказов и мобильное приложение для удобства клиентов</p>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="text-3xl font-bold text-primary-500 min-w-fit">2024</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Продолжающийся рост</h3>
                <p className="text-secondary-600">Обслуживание 500+ клиентов с более чем 300 товарами и расширяющимся складом</p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-secondary-100 py-12 md:py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2>Руководство</h2>
            <p className="text-secondary-600 mt-4 max-w-xl mx-auto">
              Познакомьтесь с командой СтройМатериалов
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👨‍💼</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Иван Иванов</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Основатель и генеральный директор</p>
                <p className="text-secondary-600 text-sm">
                  30+ лет опыта в строительных материалах с страстью к качеству и удовлетворенности клиентов.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👩‍💼</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Мария Петрова</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Менеджер по операциям</p>
                <p className="text-secondary-600 text-sm">
                  Обеспечивает бесперебойную работу и управление запасами с вниманием к деталям и эффективностью.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden text-center">
              <div className="w-full h-48 bg-secondary-300 flex items-center justify-center">
                <div className="text-6xl text-secondary-400">👨‍💻</div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">Сергей Смирнов</h3>
                <p className="text-primary-600 font-semibold text-sm mb-2">Менеджер по продажам</p>
                <p className="text-secondary-600 text-sm">
                  Выстраивает прочные отношения с клиентами и обеспечивает полное удовлетворение их потребностей в материалах.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-primary-500 text-secondary-900 py-12 md:py-16">
        <Container className="text-center">
          <h2 className="text-white mb-4">Присоединяйтесь к нашему сообществу</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Будь вы небольшим подрядчиком или крупной строительной компанией, ДомСтрой здесь, чтобы поддержать ваши проекты
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="btn-secondary text-center">
              Просмотреть каталог
            </Link>
            <Link to="/contact" className="btn-outline text-center">
              Связаться с нами
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
