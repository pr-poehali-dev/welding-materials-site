import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDiameter, setSelectedDiameter] = useState('');
  const [consumptionLength, setConsumptionLength] = useState('');
  const [calculatorResult, setCalculatorResult] = useState<any>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const electrodes = [
    { diameter: '2.0', current: '40-60', consumption: 1.65, pack: 5 },
    { diameter: '2.5', current: '50-80', consumption: 1.68, pack: 5 },
    { diameter: '3.0', current: '70-100', consumption: 1.70, pack: 5 },
    { diameter: '3.2', current: '80-120', consumption: 1.71, pack: 5 },
    { diameter: '4.0', current: '120-160', consumption: 1.73, pack: 5 },
    { diameter: '5.0', current: '160-220', consumption: 1.75, pack: 5 }
  ];

  const specifications = [
    { param: 'Тип покрытия', value: 'Основное (B)' },
    { param: 'Сварочное положение', value: 'Все, кроме вертикального вниз' },
    { param: 'Род тока', value: 'Переменный и постоянный' },
    { param: 'Полярность', value: 'Обратная (DC+)' },
    { param: 'Ударная вязкость', value: '120 Дж при -40°C' },
    { param: 'Предел прочности', value: '≥ 530 МПа' }
  ];

  const advantages = [
    'Низкое содержание водорода в наплавленном металле',
    'Высокая ударная вязкость при отрицательных температурах',
    'Отличная стойкость к образованию холодных трещин',
    'Легкое зажигание и стабильная дуга',
    'Минимальное разбрызгивание металла',
    'Легкое отделение шлаковой корки'
  ];

  const applications = [
    { title: 'Трубопроводы', description: 'Магистральные и технологические трубопроводы' },
    { title: 'Мостовые конструкции', description: 'Мосты, эстакады, переходы' },
    { title: 'Резервуары', description: 'Емкости для хранения нефти и газа' },
    { title: 'Строительные конструкции', description: 'Металлоконструкции зданий и сооружений' }
  ];

  const calculateConsumption = () => {
    const diameter = parseFloat(selectedDiameter);
    const length = parseFloat(consumptionLength);

    if (!diameter || !length || length <= 0) {
      setCalculatorResult({ error: 'Проверьте введенные данные' });
      return;
    }

    const electrode = electrodes.find(e => parseFloat(e.diameter) === diameter);
    if (!electrode) {
      setCalculatorResult({ error: 'Выберите диаметр электрода' });
      return;
    }

    const kgPerMeter = electrode.consumption;
    const totalKg = (kgPerMeter * length).toFixed(2);
    const electrodesPerKg = 200;
    const totalElectrodes = Math.ceil(parseFloat(totalKg) * electrodesPerKg);
    const totalPacks = Math.ceil(parseFloat(totalKg) / electrode.pack);

    setCalculatorResult({
      success: true,
      diameter: electrode.diameter,
      length,
      totalKg,
      totalElectrodes,
      totalPacks,
      packWeight: electrode.pack
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-orange-600">LB-52U</div>
              <div className="text-sm text-gray-600 hidden sm:block">Электроды сварочные</div>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'calculator', 'specs', 'applications', 'advantages', 'order'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'specs' && 'Характеристики'}
                  {section === 'applications' && 'Применение'}
                  {section === 'advantages' && 'Преимущества'}
                  {section === 'order' && 'Заказать'}
                </button>
              ))}
            </div>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              Купить
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 sm:py-28 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-600 text-white rounded-full text-xs font-bold">
                <Icon name="Award" size={14} />
                AWS E7018 / ISO 2560-A
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Электроды<br />
                <span className="text-orange-600">LB-52U</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Профессиональные сварочные электроды с основным покрытием для сварки 
                низкоуглеродистых и низколегированных сталей.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="px-4 py-2 bg-white rounded-lg border-2 border-orange-200 text-sm font-semibold">
                  <Icon name="Thermometer" size={14} className="inline mr-1 text-orange-600" />
                  До -40°C
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border-2 border-orange-200 text-sm font-semibold">
                  <Icon name="Zap" size={14} className="inline mr-1 text-orange-600" />
                  AC/DC
                </div>
                <div className="px-4 py-2 bg-white rounded-lg border-2 border-orange-200 text-sm font-semibold">
                  <Icon name="Shield" size={14} className="inline mr-1 text-orange-600" />
                  ≥ 530 МПа
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700" onClick={() => scrollToSection('calculator')}>
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Расчет расхода
                </Button>
                <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать каталог
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">6</div>
                <div className="text-sm text-gray-600 font-medium">Диаметров</div>
                <div className="text-xs text-gray-500 mt-1">2.0 - 5.0 мм</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">AC/DC</div>
                <div className="text-sm text-gray-600 font-medium">Универсальные</div>
                <div className="text-xs text-gray-500 mt-1">Любой ток</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">-40°C</div>
                <div className="text-sm text-gray-600 font-medium">Морозостойкие</div>
                <div className="text-xs text-gray-500 mt-1">Север РФ</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-xl">
                <div className="text-4xl font-bold text-orange-600 mb-2">120 Дж</div>
                <div className="text-sm text-gray-600 font-medium">Вязкость</div>
                <div className="text-xs text-gray-500 mt-1">При -40°C</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Калькулятор расхода</h2>
            <p className="text-lg text-gray-600">
              Рассчитайте необходимое количество электродов LB-52U для вашего проекта
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-orange-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
                  <Icon name="Calculator" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Параметры сварки</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold block mb-3 text-gray-700">
                    Диаметр электрода (мм)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {electrodes.map((e) => (
                      <button
                        key={e.diameter}
                        onClick={() => setSelectedDiameter(e.diameter)}
                        className={`px-4 py-3 rounded-xl font-bold transition-all ${
                          selectedDiameter === e.diameter
                            ? 'bg-orange-600 text-white shadow-lg scale-105'
                            : 'bg-white border-2 border-gray-300 hover:border-orange-600'
                        }`}
                      >
                        Ø {e.diameter}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDiameter && (
                  <div className="p-4 bg-white rounded-xl border-2 border-orange-200">
                    <div className="text-sm font-semibold mb-2">Параметры для Ø {selectedDiameter} мм</div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-gray-600">Сварочный ток:</div>
                      <div className="font-bold">{electrodes.find(e => e.diameter === selectedDiameter)?.current} А</div>
                      <div className="text-gray-600">Расход:</div>
                      <div className="font-bold">{electrodes.find(e => e.diameter === selectedDiameter)?.consumption} кг/м шва</div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-bold block mb-3 text-gray-700">
                    Длина сварного шва (метров)
                  </label>
                  <input
                    type="number"
                    value={consumptionLength}
                    onChange={(e) => setConsumptionLength(e.target.value)}
                    placeholder="Введите длину шва"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600 text-lg font-medium"
                  />
                </div>

                <Button 
                  onClick={calculateConsumption} 
                  className="w-full bg-orange-600 hover:bg-orange-700" 
                  size="lg"
                  disabled={!selectedDiameter || !consumptionLength}
                >
                  <Icon name="Zap" size={20} className="mr-2" />
                  Рассчитать расход
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Результат расчета</h3>
              </div>
              
              {!calculatorResult && (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <Icon name="PackageSearch" size={80} className="mb-4 opacity-20" />
                  <p className="text-center text-lg">Выберите параметры и нажмите "Рассчитать"</p>
                </div>
              )}

              {calculatorResult?.error && (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon name="AlertCircle" size={28} className="text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-red-900 text-lg mb-2">Ошибка</div>
                      <div className="text-red-700">{calculatorResult.error}</div>
                    </div>
                  </div>
                </div>
              )}

              {calculatorResult?.success && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="CheckCircle2" size={32} className="text-green-600" />
                      <div className="text-lg font-bold">Расчет выполнен</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Диаметр электрода:</span>
                        <span className="text-2xl font-bold text-orange-600">Ø {calculatorResult.diameter} мм</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Длина шва:</span>
                        <span className="text-xl font-bold">{calculatorResult.length} м</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4">Необходимо:</h4>
                    
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600 font-medium">Электродов (общий вес)</span>
                      <span className="text-2xl font-bold text-orange-600">{calculatorResult.totalKg} кг</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600 font-medium">Количество электродов</span>
                      <span className="text-xl font-bold">{calculatorResult.totalElectrodes} шт</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600 font-medium">Упаковок ({calculatorResult.packWeight} кг)</span>
                      <span className="text-xl font-bold text-blue-600">{calculatorResult.totalPacks} уп</span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        Расчет учитывает огарки и потери. Рекомендуется заказать на 10-15% больше для запаса.
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg" onClick={() => scrollToSection('order')}>
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Заказать {calculatorResult.totalPacks} упаковок
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="specs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12">Технические характеристики</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="FileText" size={28} className="text-orange-600" />
                  Основные параметры
                </h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-start py-4 border-b border-gray-200 last:border-0">
                      <div className="text-gray-600 font-medium pr-4">{spec.param}</div>
                      <div className="font-bold text-right">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <div className="bg-orange-600 text-white px-6 py-4">
                  <h3 className="text-xl font-bold">Таблица диаметров и режимов сварки</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Диаметр, мм</th>
                        <th className="text-left py-3 px-4 font-semibold">Ток сварочный, А</th>
                        <th className="text-left py-3 px-4 font-semibold">Расход, кг/м</th>
                        <th className="text-left py-3 px-4 font-semibold">Упаковка, кг</th>
                      </tr>
                    </thead>
                    <tbody>
                      {electrodes.map((e, index) => (
                        <tr key={index} className="border-b hover:bg-orange-50 transition-colors">
                          <td className="py-4 px-4 font-bold text-orange-600">Ø {e.diameter}</td>
                          <td className="py-4 px-4">{e.current}</td>
                          <td className="py-4 px-4 font-medium">{e.consumption}</td>
                          <td className="py-4 px-4">{e.pack} кг</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-600 text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Стандарты и сертификаты</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={24} />
                    <div>
                      <div className="font-bold">AWS E7018</div>
                      <div className="text-xs text-orange-100">American Welding Society</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={24} />
                    <div>
                      <div className="font-bold">ISO 2560-A</div>
                      <div className="text-xs text-orange-100">Международный стандарт</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Award" size={24} />
                    <div>
                      <div className="font-bold">ГОСТ 9467-75</div>
                      <div className="text-xs text-orange-100">Российский стандарт</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-blue-200 p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} className="text-blue-600" />
                  Условия хранения
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <span>Температура: от +5°C до +30°C</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <span>Влажность: не более 50%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <span>Прокалка: 300-350°C, 1 час</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <span>Срок годности: 5 лет</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="applications" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12">Области применения</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {applications.map((app, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Wrench" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{app.title}</h3>
                <p className="text-gray-600">{app.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Свариваемые стали</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-orange-400 mb-2">Углеродистые</div>
                <div className="text-sm text-gray-300">Ст3, 20, 09Г2С</div>
              </div>
              <div>
                <div className="font-bold text-orange-400 mb-2">Низколегированные</div>
                <div className="text-sm text-gray-300">10ХСНД, 15ХСНД</div>
              </div>
              <div>
                <div className="font-bold text-orange-400 mb-2">Конструкционные</div>
                <div className="text-sm text-gray-300">До предела прочности 590 МПа</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="advantages" className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-center">Преимущества LB-52U</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Почему профессионалы выбирают наши электроды</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="text-base font-semibold leading-snug">{advantage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border-2 border-orange-200 p-8">
            <h3 className="text-2xl font-bold mb-6">Особенности электродов LB-52U</h3>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                <strong>LB-52U</strong> — это профессиональные сварочные электроды с основным (фтористо-кальциевым) 
                покрытием типа B, предназначенные для ручной дуговой сварки ответственных конструкций из низкоуглеродистых 
                и низколегированных сталей.
              </p>
              <p>
                Основное покрытие обеспечивает получение металла шва с <strong>низким содержанием водорода</strong>, 
                что критически важно для предотвращения образования холодных трещин. Наплавленный металл обладает 
                высокой ударной вязкостью при отрицательных температурах до <strong>-40°C</strong>.
              </p>
              <p>
                Электроды работают на переменном и постоянном токе обратной полярности, обеспечивая стабильное 
                горение дуги, минимальное разбрызгивание и формирование качественного сварного шва с легко отделяемой шлаковой коркой.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="order" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Заказ и доставка</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Контактная информация</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Отдел продаж</div>
                      <div className="text-xl font-bold mb-1">+7 (495) 123-45-67</div>
                      <div className="text-sm text-gray-600">Ежедневно 8:00-20:00 (МСК)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="text-xl font-bold">sales@lb52u.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Склад в Москве</div>
                      <div className="font-bold">г. Москва, Каширское шоссе, 67</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl p-8">
                <h4 className="font-bold text-xl mb-4">Условия покупки</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Минимальный заказ: от 1 упаковки (5 кг)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Оптовые скидки от 100 кг</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Доставка по Москве — 500₽</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Доставка по РФ транспортными компаниями</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Наличие всех диаметров на складе</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Сертификаты качества в комплекте</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold mb-6">Форма заказа</h3>
              <form className="space-y-5">
                <div>
                  <label className="text-sm font-bold block mb-2">Имя *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Город доставки</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600"
                    placeholder="Москва"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Диаметр и количество *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600 resize-none"
                    placeholder="Например: Ø 3.0 мм — 50 кг, Ø 4.0 мм — 100 кг"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold block mb-2">Комментарий</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-600 resize-none"
                    placeholder="Дополнительные пожелания"
                  />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заказ
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  Отправляя заявку, вы соглашаетесь с <a href="#" className="text-orange-600 hover:underline">политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-3">LB-52U</div>
              <p className="text-gray-400 text-sm">
                Профессиональные сварочные электроды с основным покрытием
              </p>
            </div>
            <div>
              <div className="font-bold mb-3">Продукция</div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Диаметры 2.0-5.0 мм</div>
                <div>AWS E7018</div>
                <div>ISO 2560-A</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">Контакты</div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>+7 (495) 123-45-67</div>
                <div>sales@lb52u.ru</div>
                <div>г. Москва</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">Документы</div>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block">Сертификаты</a>
                <a href="#" className="text-gray-400 hover:text-white block">Каталог PDF</a>
                <a href="#" className="text-gray-400 hover:text-white block">Реквизиты</a>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-800 mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© 2024 LB-52U. Все права защищены.</div>
            <div>AWS E7018 | ISO 2560-A | ГОСТ 9467-75</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
