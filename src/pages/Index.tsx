import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    'Электроды сварочные',
    'Проволока сварочная',
    'Флюсы сварочные',
    'Газы защитные',
    'Оборудование сварочное',
    'Средства индивидуальной защиты'
  ];

  const services = [
    { title: 'Поставка материалов', description: 'Комплексные поставки на месторождения' },
    { title: 'Техническая поддержка', description: 'Консультации специалистов' },
    { title: 'Логистика', description: 'Доставка на удаленные объекты' },
    { title: 'Документация', description: 'Сертификаты и разрешения' }
  ];

  const projects = [
    { name: 'Месторождение "Северное"', year: '2024', details: 'Поставка 50 тонн материалов' },
    { name: 'НПЗ "Восток"', year: '2023', details: 'Комплексное оснащение цеха' },
    { name: 'Трубопровод КТК', year: '2023', details: 'Сварочные работы 200 км' },
    { name: 'Компрессорная станция', year: '2022', details: 'Монтаж оборудования' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-medium">ПромСварка</div>
            <div className="hidden md:flex gap-8">
              {['home', 'catalog', 'services', 'projects', 'certificates', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm transition-colors ${
                    activeSection === section ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'services' && 'Услуги'}
                  {section === 'projects' && 'Проекты'}
                  {section === 'certificates' && 'Сертификаты'}
                  {section === 'about' && 'О компании'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline">Связаться</Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
            Сварочные материалы<br />для месторождений
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl font-light leading-relaxed">
            Комплексные поставки сварочного оборудования и материалов на промышленные объекты. 
            Работаем с крупнейшими нефтегазовыми компаниями с 2010 года.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="outline">
              Скачать каталог
            </Button>
            <Button size="lg" variant="outline">
              Отправить запрос
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Каталог продукции</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {products.map((product, index) => (
              <div key={index} className="py-4 border-b border-gray-200 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{product}</span>
                  <Icon name="ArrowRight" size={18} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="services" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Услуги</h2>
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="pb-8 border-b border-gray-200 last:border-0">
                <h3 className="text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="projects" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Реализованные проекты</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="grid sm:grid-cols-3 gap-4 pb-6 border-b border-gray-200 last:border-0">
                <div className="font-medium">{project.name}</div>
                <div className="text-gray-600">{project.year}</div>
                <div className="text-gray-600">{project.details}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="certificates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Сертификаты</h2>
          <p className="text-lg text-gray-600 mb-8 font-light">
            Все материалы имеют необходимые сертификаты соответствия и разрешительную документацию
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {['ISO 9001', 'ISO 14001', 'ГОСТ Р', 'Ростехнадзор'].map((cert, index) => (
              <div key={index} className="text-center py-8 border border-gray-200 bg-white">
                <div className="text-sm font-medium">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">О компании</h2>
          <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
            <p>
              Компания "ПромСварка" специализируется на комплексных поставках сварочных материалов 
              и оборудования для нефтегазовой отрасли.
            </p>
            <p>
              Мы работаем с крупнейшими месторождениями России и обеспечиваем бесперебойные поставки 
              в самые удаленные регионы.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200">
            <div>
              <div className="text-3xl font-light mb-2">500+</div>
              <div className="text-sm text-gray-600">Наименований</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">150+</div>
              <div className="text-sm text-gray-600">Проектов</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">24/7</div>
              <div className="text-sm text-gray-600">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">Телефон</div>
                <div className="text-lg">+7 (495) 123-45-67</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="text-lg">info@promsvarka.ru</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Адрес</div>
                <div className="text-lg">г. Москва, ул. Промышленная, 15</div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent resize-none"
                />
                <Button className="w-full mt-6" variant="outline">
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
            <div>
              <div className="text-lg font-medium mb-2">ПромСварка</div>
              <p className="text-sm text-gray-600">Сварочные материалы для промышленности</p>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 ПромСварка
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
