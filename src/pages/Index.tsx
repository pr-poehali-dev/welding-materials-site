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
    {
      name: 'Центраторы жесткие',
      diameter: 'Ø 114-508 мм',
      application: 'Обсадные колонны, вертикальные скважины',
      material: 'Сталь 20, сталь 09Г2С'
    },
    {
      name: 'Центраторы пружинные',
      diameter: 'Ø 168-426 мм',
      application: 'Наклонно-направленные скважины',
      material: 'Пружинная сталь 65Г'
    },
    {
      name: 'Центраторы роликовые',
      diameter: 'Ø 219-377 мм',
      application: 'Горизонтальные участки, большие отклонения',
      material: 'Сталь с полимерным покрытием'
    },
    {
      name: 'Центраторы турбулизаторы',
      diameter: 'Ø 140-340 мм',
      application: 'Улучшение качества цементирования',
      material: 'Композитные материалы'
    }
  ];

  const advantages = [
    'Соответствие ГОСТ 23527-2018',
    'Производство на собственных мощностях',
    'Техническое сопровождение проектов',
    'Доставка на месторождения РФ',
    'Сертификаты качества на всю продукцию',
    'Индивидуальное изготовление под заказ'
  ];

  const applications = [
    { title: 'Обсадные колонны', description: 'Центрирование труб при спуске в скважину' },
    { title: 'Цементирование', description: 'Создание равномерного цементного кольца' },
    { title: 'Горизонтальные участки', description: 'Снижение сил трения при спуске колонны' },
    { title: 'Наклонные скважины', description: 'Предотвращение прихвата колонны' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-lg font-medium">НефтеГазЦентратор</div>
            <div className="hidden md:flex gap-8">
              {['home', 'catalog', 'application', 'advantages', 'technical', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm transition-colors ${
                    activeSection === section ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'application' && 'Применение'}
                  {section === 'advantages' && 'Преимущества'}
                  {section === 'technical' && 'Документация'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline">Заказать</Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium border border-black">
            ПРОИЗВОДИТЕЛЬ
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
            Центраторы для обсадных<br />колонн нефтегазовых скважин
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl font-light leading-relaxed">
            Производство и поставка центрирующих устройств для буровых работ. 
            Полное соответствие ГОСТ, техническое сопровождение, доставка на объекты.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="outline">
              Скачать каталог PDF
            </Button>
            <Button size="lg" variant="outline">
              Отправить запрос
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Каталог продукции</h2>
          <div className="space-y-6">
            {products.map((product, index) => (
              <div key={index} className="border border-gray-200 p-6">
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Тип</div>
                    <div className="font-medium">{product.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Диаметр</div>
                    <div>{product.diameter}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Материал</div>
                    <div>{product.material}</div>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="w-full">
                      Подробнее
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Применение:</span> {product.application}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="application" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Области применения</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {applications.map((app, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">{app.title}</h3>
                <p className="text-gray-600">{app.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Основные функции центраторов</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">—</span>
                <span>Центрирование обсадной колонны в стволе скважины</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">—</span>
                <span>Обеспечение равномерной толщины цементного кольца</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">—</span>
                <span>Снижение сил трения при спуске колонны</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">—</span>
                <span>Предотвращение прихвата труб в искривленных участках</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      <section id="advantages" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Преимущества</h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0" />
                <span className="text-lg">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="technical" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Техническая документация</h2>
          <div className="space-y-4">
            {[
              { name: 'Каталог продукции 2024', size: '2.4 МБ', format: 'PDF' },
              { name: 'Технические характеристики', size: '1.8 МБ', format: 'PDF' },
              { name: 'Сертификаты соответствия ГОСТ', size: '3.2 МБ', format: 'PDF' },
              { name: 'Инструкция по монтажу', size: '1.1 МБ', format: 'PDF' },
              { name: 'Таблица подбора центраторов', size: '0.9 МБ', format: 'XLSX' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-gray-300 bg-white flex items-center justify-center text-xs font-medium">
                    {doc.format}
                  </div>
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-gray-600">{doc.size}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Скачать
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-light tracking-tight mb-12">Контакты и заказ</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <div className="text-sm text-gray-600 mb-1">Отдел продаж</div>
                <div className="text-lg">+7 (495) 789-01-23</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Email</div>
                <div className="text-lg">sales@ngcentrator.ru</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Производство</div>
                <div className="text-lg">г. Нижневартовск, Промзона 3, стр. 42</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Офис в Москве</div>
                <div className="text-lg">г. Москва, Варшавское шоссе, 47</div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Компания</label>
                  <input
                    type="text"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Контактное лицо</label>
                  <input
                    type="text"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Тип и количество центраторов</label>
                  <textarea
                    rows={3}
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent resize-none"
                  />
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Отправить запрос
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
              <div className="text-lg font-medium mb-2">НефтеГазЦентратор</div>
              <p className="text-sm text-gray-600">Производство центрирующих устройств для нефтегазовой отрасли</p>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 НефтеГазЦентратор
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
