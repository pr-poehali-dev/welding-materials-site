import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    { name: 'Электроды сварочные', category: 'Основные материалы', icon: 'Zap' },
    { name: 'Проволока сварочная', category: 'Основные материалы', icon: 'Cable' },
    { name: 'Флюсы сварочные', category: 'Расходные материалы', icon: 'Droplet' },
    { name: 'Газы защитные', category: 'Расходные материалы', icon: 'Wind' },
    { name: 'Оборудование', category: 'Техника', icon: 'Wrench' },
    { name: 'Средства защиты', category: 'Безопасность', icon: 'Shield' },
  ];

  const services = [
    { title: 'Поставка материалов', description: 'Комплексные поставки сварочных материалов на месторождения', icon: 'Truck' },
    { title: 'Техническое сопровождение', description: 'Консультации и поддержка специалистов', icon: 'HeadphonesIcon' },
    { title: 'Логистика', description: 'Оперативная доставка на удаленные объекты', icon: 'Navigation' },
    { title: 'Сертификация', description: 'Полный пакет документов и сертификатов', icon: 'FileCheck' },
  ];

  const projects = [
    { name: 'Месторождение "Северное"', year: '2024', scope: 'Поставка 50 тонн материалов' },
    { name: 'НПЗ "Восток"', year: '2023', scope: 'Комплексное оснащение' },
    { name: 'Трубопровод КТК', year: '2023', scope: 'Сварочные работы 200 км' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 animate-slide-in">
              <Icon name="Flame" size={32} className="text-primary" />
              <span className="text-xl font-bold text-white">ПромСварка</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'catalog', 'services', 'projects', 'certificates', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-slate-300'
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
            <Button size="sm" className="hidden md:inline-flex">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/23a78bea-3111-4ec8-8404-5de08d4c5f67/files/3313fed5-c02d-44d2-9f29-2319e206d7a1.jpg"
            alt="Industrial welding"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl animate-fade-in">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary">
              Надежный поставщик с 2010 года
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Сварочные материалы для месторождений
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Комплексные поставки сварочного оборудования и материалов на промышленные объекты. 
              Работаем с крупнейшими нефтегазовыми компаниями России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Icon name="FileText" size={20} className="mr-2" />
                Скачать каталог
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Icon name="Mail" size={20} className="mr-2" />
                Отправить запрос
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Каталог продукции</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Широкий ассортимент материалов</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Более 500 наименований сварочных материалов от ведущих производителей
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={product.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-slate-600">{product.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Наши услуги</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Полный цикл сопровождения</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              От подбора материалов до доставки на объект с техническим сопровождением
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={service.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4">Реализованные проекты</Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Опыт работы с крупными объектами</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Icon name="Calendar" size={16} />
                    <span>{project.year}</span>
                  </div>
                  <CardDescription>{project.scope}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary">Сертификаты</Badge>
            <h2 className="text-4xl font-bold mb-4">Качество подтверждено документально</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Все материалы имеют необходимые сертификаты соответствия и разрешительную документацию
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['ISO 9001', 'ISO 14001', 'ГОСТ Р', 'Ростехнадзор'].map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center border-2 border-primary/30">
                  <Icon name="Award" size={40} className="text-primary" />
                </div>
                <h3 className="font-bold">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">О компании</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">15 лет на рынке промышленных поставок</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Компания "ПромСварка" специализируется на комплексных поставках сварочных материалов 
                и оборудования для нефтегазовой отрасли. Мы работаем с крупнейшими месторождениями 
                России и обеспечиваем бесперебойные поставки в самые удаленные регионы.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-slate-600">Наименований товаров</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">150+</div>
                  <div className="text-sm text-slate-600">Реализованных проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-slate-600">Техподдержка</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/23a78bea-3111-4ec8-8404-5de08d4c5f67/files/061dfa83-73dc-4f8e-963a-602c20969d96.jpg"
                alt="Warehouse"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Контакты</Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-slate-600">
                Готовы ответить на ваши вопросы и подготовить коммерческое предложение
              </p>
            </div>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-slate-900 text-white p-8">
                  <h3 className="text-xl font-bold mb-6">Контактная информация</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={20} className="text-primary mt-1" />
                      <div>
                        <div className="font-medium">Телефон</div>
                        <div className="text-slate-300">+7 (495) 123-45-67</div>
                      </div>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={20} className="text-primary mt-1" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-slate-300">info@promsvarka.ru</div>
                      </div>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={20} className="text-primary mt-1" />
                      <div>
                        <div className="font-medium">Адрес</div>
                        <div className="text-slate-300">г. Москва, ул. Промышленная, 15</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-slate-900">Отправить запрос</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Сообщение"
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="w-full">
                      Отправить
                      <Icon name="Send" size={16} className="ml-2" />
                    </Button>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Flame" size={28} className="text-primary" />
                <span className="text-lg font-bold">ПромСварка</span>
              </div>
              <p className="text-slate-400 text-sm">
                Надежный поставщик сварочных материалов для промышленных объектов
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Электроды</li>
                <li>Проволока</li>
                <li>Флюсы</li>
                <li>Оборудование</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>О нас</li>
                <li>Проекты</li>
                <li>Сертификаты</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>+7 (495) 123-45-67</li>
                <li>info@promsvarka.ru</li>
                <li>Москва, Промышленная, 15</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-slate-700 mb-8" />
          <div className="text-center text-sm text-slate-400">
            © 2024 ПромСварка. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
