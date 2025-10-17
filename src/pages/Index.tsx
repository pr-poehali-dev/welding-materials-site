import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [tubeDiameter, setTubeDiameter] = useState('');
  const [wellDiameter, setWellDiameter] = useState('');
  const [calculatorResult, setCalculatorResult] = useState<any>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const cznModels = [
    {
      model: 'ЦЗН-114',
      outerDiameter: '114 мм',
      outerDiameterNum: 114,
      innerDiameter: '73 мм',
      workingRange: '140-165 мм',
      workingRangeMin: 140,
      workingRangeMax: 165,
      weight: '2.1 кг',
      blades: 8
    },
    {
      model: 'ЦЗН-168',
      outerDiameter: '168 мм',
      outerDiameterNum: 168,
      innerDiameter: '127 мм',
      workingRange: '190-220 мм',
      workingRangeMin: 190,
      workingRangeMax: 220,
      weight: '3.8 кг',
      blades: 10
    },
    {
      model: 'ЦЗН-219',
      outerDiameter: '219 мм',
      outerDiameterNum: 219,
      innerDiameter: '168 мм',
      workingRange: '245-295 мм',
      workingRangeMin: 245,
      workingRangeMax: 295,
      weight: '6.2 кг',
      blades: 12
    },
    {
      model: 'ЦЗН-273',
      outerDiameter: '273 мм',
      outerDiameterNum: 273,
      innerDiameter: '219 мм',
      workingRange: '295-350 мм',
      workingRangeMin: 295,
      workingRangeMax: 350,
      weight: '9.5 кг',
      blades: 14
    },
    {
      model: 'ЦЗН-324',
      outerDiameter: '324 мм',
      outerDiameterNum: 324,
      innerDiameter: '273 мм',
      workingRange: '350-420 мм',
      workingRangeMin: 350,
      workingRangeMax: 420,
      weight: '13.8 кг',
      blades: 16
    },
    {
      model: 'ЦЗН-426',
      outerDiameter: '426 мм',
      outerDiameterNum: 426,
      innerDiameter: '340 мм',
      workingRange: '450-540 мм',
      workingRangeMin: 450,
      workingRangeMax: 540,
      weight: '21.2 кг',
      blades: 18
    }
  ];

  const calculateCentrator = () => {
    const tube = parseFloat(tubeDiameter);
    const well = parseFloat(wellDiameter);

    if (!tube || !well || tube >= well) {
      setCalculatorResult({ error: 'Проверьте введенные данные. Диаметр скважины должен быть больше диаметра трубы.' });
      return;
    }

    const suitableModels = cznModels.filter(model => {
      return model.outerDiameterNum === tube && well >= model.workingRangeMin && well <= model.workingRangeMax;
    });

    if (suitableModels.length > 0) {
      const recommendedModel = suitableModels[0];
      const gap = (well - tube) / 2;
      const columnLength = 1000;
      const spacing = 12;
      const quantity = Math.ceil(columnLength / spacing);

      setCalculatorResult({
        success: true,
        model: recommendedModel,
        gap: gap.toFixed(1),
        quantity,
        spacing
      });
    } else {
      const alternativeModels = cznModels.filter(model => {
        return Math.abs(model.outerDiameterNum - tube) <= 50 && well >= model.workingRangeMin && well <= model.workingRangeMax;
      });

      if (alternativeModels.length > 0) {
        setCalculatorResult({
          alternative: true,
          models: alternativeModels,
          message: 'Точное совпадение не найдено, но подойдут следующие модели:'
        });
      } else {
        setCalculatorResult({
          error: 'Подходящая модель не найдена. Свяжитесь с отделом продаж для индивидуального решения.'
        });
      }
    }
  };

  const specifications = [
    { param: 'Материал звеньев', value: 'Сталь 20, 09Г2С' },
    { param: 'Покрытие', value: 'Цинкование ГОСТ 9.307' },
    { param: 'Температура эксплуатации', value: 'от -60°C до +150°C' },
    { param: 'Осевая нагрузка', value: 'до 300 кН' },
    { param: 'Тип соединения', value: 'Хомут, сварка' },
    { param: 'Срок службы', value: 'Весь период эксплуатации колонны' }
  ];

  const advantages = [
    'Жесткая фиксация положения трубы',
    'Высокая несущая способность',
    'Устойчивость к ударным нагрузкам',
    'Равномерное центрирование по длине',
    'Простота монтажа на трубу',
    'Отсутствие подвижных элементов'
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">ЦЗН</div>
              <div className="text-sm text-gray-600 hidden sm:block">Центратор звенный наружный</div>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'calculator', 'models', 'specs', 'advantages', 'docs', 'order'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'models' && 'Модели'}
                  {section === 'specs' && 'Характеристики'}
                  {section === 'advantages' && 'Преимущества'}
                  {section === 'docs' && 'Документация'}
                  {section === 'order' && 'Заказ'}
                </button>
              ))}
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 sm:py-28 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-600 text-white rounded-full text-xs font-medium">
                <Icon name="Award" size={14} />
                ГОСТ 23527-2018
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Центраторы<br />звенные<br />наружные
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Жесткие центрирующие устройства для обсадных колонн. 
                Обеспечивают надежную фиксацию в вертикальных и наклонных скважинах.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Подобрать модель
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать каталог
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">114-426</div>
                <div className="text-sm text-gray-600">Диаметры, мм</div>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-gray-600">Типоразмеров</div>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">300 кН</div>
                <div className="text-sm text-gray-600">Макс. нагрузка</div>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">150°C</div>
                <div className="text-sm text-gray-600">Макс. температура</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Калькулятор подбора</h2>
            <p className="text-lg text-gray-600">
              Определите оптимальную модель ЦЗН для ваших условий эксплуатации
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Входные данные</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold block mb-3 text-gray-700">
                    Диаметр обсадной трубы (мм)
                  </label>
                  <input
                    type="number"
                    value={tubeDiameter}
                    onChange={(e) => setTubeDiameter(e.target.value)}
                    placeholder="Введите диаметр трубы"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg font-medium bg-white"
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[114, 168, 219, 273, 324, 426].map(d => (
                      <button
                        key={d}
                        onClick={() => setTubeDiameter(d.toString())}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        {d} мм
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold block mb-3 text-gray-700">
                    Диаметр скважины (мм)
                  </label>
                  <input
                    type="number"
                    value={wellDiameter}
                    onChange={(e) => setWellDiameter(e.target.value)}
                    placeholder="Введите диаметр скважины"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg font-medium bg-white"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    Минимальный зазор для ЦЗН: 20-25 мм с каждой стороны
                  </div>
                </div>

                <Button 
                  onClick={calculateCentrator} 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  disabled={!tubeDiameter || !wellDiameter}
                >
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать подбор
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Результат</h3>
              </div>
              
              {!calculatorResult && (
                <div className="flex flex-col items-center justify-center h-80 text-gray-400">
                  <Icon name="Search" size={80} className="mb-4 opacity-20" />
                  <p className="text-center text-lg">Введите параметры для расчета</p>
                </div>
              )}

              {calculatorResult?.error && (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Icon name="XCircle" size={28} className="text-red-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-red-900 text-lg mb-2">Ошибка расчета</div>
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
                      <div className="text-lg font-semibold text-gray-700">Рекомендуемая модель</div>
                    </div>
                    <div className="text-4xl font-bold text-green-900 mb-3">
                      {calculatorResult.model.model}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-gray-600">Диаметр трубы:</div>
                      <div className="font-semibold">{calculatorResult.model.outerDiameter}</div>
                      <div className="text-gray-600">Рабочий диапазон:</div>
                      <div className="font-semibold">{calculatorResult.model.workingRange}</div>
                      <div className="text-gray-600">Звеньев:</div>
                      <div className="font-semibold">{calculatorResult.model.blades} шт</div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Зазор до стенки</span>
                      <span className="font-bold text-lg">{calculatorResult.gap} мм</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Масса центратора</span>
                      <span className="font-bold text-lg">{calculatorResult.model.weight}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Шаг установки</span>
                      <span className="font-bold text-lg">{calculatorResult.spacing} м</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">На колонну 1000 м</span>
                      <span className="font-bold text-xl text-blue-600">{calculatorResult.quantity} шт</span>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg" onClick={() => scrollToSection('order')}>
                    Заказать {calculatorResult.model.model}
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              )}

              {calculatorResult?.alternative && (
                <div className="space-y-4">
                  <div className="p-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                    <div className="flex items-start gap-4">
                      <Icon name="AlertTriangle" size={28} className="text-yellow-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-yellow-900 text-lg mb-2">Альтернативные модели</div>
                        <div className="text-yellow-700">{calculatorResult.message}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {calculatorResult.models.map((model: any, index: number) => (
                      <div key={index} className="p-5 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition-colors cursor-pointer">
                        <div className="font-bold text-xl mb-2">{model.model}</div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Труба: {model.outerDiameter}</div>
                          <div>Скважина: {model.workingRange}</div>
                          <div>Звеньев: {model.blades} шт</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="models" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Модельный ряд ЦЗН</h2>
            <p className="text-lg text-gray-600">
              Полная линейка центраторов звенных наружных для всех типоразмеров труб
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="text-left py-4 px-6 font-semibold">Модель</th>
                  <th className="text-left py-4 px-6 font-semibold">Диаметр трубы</th>
                  <th className="text-left py-4 px-6 font-semibold">Проходной Ø</th>
                  <th className="text-left py-4 px-6 font-semibold">Рабочий диапазон</th>
                  <th className="text-left py-4 px-6 font-semibold">Звеньев</th>
                  <th className="text-left py-4 px-6 font-semibold">Масса</th>
                  <th className="text-right py-4 px-6 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {cznModels.map((model, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-bold text-lg text-blue-600">{model.model}</div>
                    </td>
                    <td className="py-5 px-6 font-medium">{model.outerDiameter}</td>
                    <td className="py-5 px-6">{model.innerDiameter}</td>
                    <td className="py-5 px-6 font-medium">{model.workingRange}</td>
                    <td className="py-5 px-6">{model.blades} шт</td>
                    <td className="py-5 px-6 font-semibold">{model.weight}</td>
                    <td className="py-5 px-6 text-right">
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                        Заказать
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start gap-4">
              <Icon name="Lightbulb" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold text-lg mb-2">Индивидуальное производство</div>
                <div className="text-gray-700">
                  Возможно изготовление центраторов по нестандартным параметрам: увеличенное количество звеньев, 
                  специальные материалы, усиленная конструкция. Отправьте запрос с техническими требованиями.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="specs" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12">Технические характеристики</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon name="FileText" size={28} className="text-blue-600" />
                Общие параметры
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

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Icon name="Target" size={28} className="text-blue-600" />
                  Применение
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold mb-1">Вертикальные скважины</div>
                      <div className="text-sm text-gray-600">Основное применение для надежной фиксации</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold mb-1">Наклонные участки до 45°</div>
                      <div className="text-sm text-gray-600">При углах искривления малой интенсивности</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold mb-1">Цементирование колонн</div>
                      <div className="text-sm text-gray-600">Создание равномерного цементного кольца</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold mb-1">Технические колонны</div>
                      <div className="text-sm text-gray-600">Эксплуатационные и промежуточные обсадки</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-600 text-white rounded-xl p-6 text-center">
                  <Icon name="Shield" size={32} className="mx-auto mb-3" />
                  <div className="font-bold mb-1">Защита</div>
                  <div className="text-xs">Цинковое покрытие</div>
                </div>
                <div className="bg-blue-600 text-white rounded-xl p-6 text-center">
                  <Icon name="Zap" size={32} className="mx-auto mb-3" />
                  <div className="font-bold mb-1">Прочность</div>
                  <div className="text-xs">До 300 кН</div>
                </div>
                <div className="bg-blue-600 text-white rounded-xl p-6 text-center">
                  <Icon name="Thermometer" size={32} className="mx-auto mb-3" />
                  <div className="font-bold mb-1">Температура</div>
                  <div className="text-xs">До +150°C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="advantages" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Преимущества ЦЗН</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="text-lg font-semibold leading-snug">{advantage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-4">Конструктивные особенности</h3>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                <strong>Центратор звенный наружный (ЦЗН)</strong> — это жесткая конструкция из металлических звеньев, 
                которая устанавливается на наружной поверхности обсадной трубы. Звенья равномерно распределены по окружности 
                и обеспечивают надежное центрирование колонны в стволе скважины.
              </p>
              <p>
                Крепление к трубе осуществляется хомутами или сваркой, что исключает смещение центратора в процессе спуска. 
                Жесткая конструкция обеспечивает постоянный зазор между трубой и стенкой скважины на всем протяжении колонны.
              </p>
              <p>
                Производство ведется в соответствии с <strong>ГОСТ 23527-2018</strong>. Каждая партия комплектуется 
                сертификатами соответствия и паспортами качества.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="docs" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12">Техническая документация</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: 'Каталог ЦЗН 2024', size: '4.2 МБ', icon: 'Book', color: 'blue' },
              { name: 'Технические условия ТУ', size: '1.8 МБ', icon: 'FileText', color: 'green' },
              { name: 'Сертификат ГОСТ 23527-2018', size: '2.4 МБ', icon: 'Award', color: 'yellow' },
              { name: 'Руководство по монтажу', size: '3.1 МБ', icon: 'Wrench', color: 'red' },
              { name: 'Таблица подбора ЦЗН', size: '1.2 МБ', icon: 'Table', color: 'purple' },
              { name: 'Протоколы испытаний', size: '5.6 МБ', icon: 'ClipboardCheck', color: 'orange' }
            ].map((doc, index) => (
              <div key={index} className="group bg-gray-50 hover:bg-blue-50 p-6 rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border-2 border-gray-200 group-hover:border-blue-600 transition-colors">
                      <Icon name={doc.icon as any} size={28} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold mb-1 group-hover:text-blue-600 transition-colors">{doc.name}</div>
                      <div className="text-sm text-gray-600">{doc.size}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="order" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Заказ и контакты</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Отдел продаж</div>
                      <div className="text-xl font-bold mb-1">+7 (800) 555-23-45</div>
                      <div className="text-sm text-gray-600">Пн-Пт 9:00-18:00 (МСК)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email для заявок</div>
                      <div className="text-xl font-bold">sales@czn-russia.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Производство</div>
                      <div className="font-bold">г. Челябинск, ул. Металлургов, 87</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-600 text-white rounded-xl">
                <h4 className="font-bold text-lg mb-4">Условия поставки ЦЗН</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Минимальная партия: от 20 шт одного типоразмера</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Срок изготовления: 10-20 рабочих дней</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Доставка транспортными компаниями по всей России</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Гарантия на весь срок эксплуатации колонны</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                    <span>Полный пакет документов (сертификаты, паспорта)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold mb-6">Форма заказа</h3>
              <form className="space-y-5">
                <div>
                  <label className="text-sm font-semibold block mb-2">Организация *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                    placeholder="ООО «Ваша компания»"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2">Контактное лицо *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                    placeholder="Фамилия Имя Отчество"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold block mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600"
                      placeholder="email@company.ru"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2">Модель и количество *</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Например: ЦЗН-219 — 100 шт, ЦЗН-273 — 50 шт"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2">Комментарий</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 resize-none"
                    placeholder="Дополнительные требования или вопросы"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  Отправляя заявку, вы соглашаетесь с <a href="#" className="text-blue-600 hover:underline">политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-3">ЦЗН</div>
              <p className="text-gray-400 text-sm">
                Производство центраторов звенных наружных для нефтегазовой отрасли
              </p>
            </div>
            <div>
              <div className="font-bold mb-3">Контакты</div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>+7 (800) 555-23-45</div>
                <div>sales@czn-russia.ru</div>
                <div>г. Челябинск</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">Документы</div>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white block">Реквизиты</a>
                <a href="#" className="text-gray-400 hover:text-white block">Политика конфиденциальности</a>
                <a href="#" className="text-gray-400 hover:text-white block">Сертификаты</a>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-800 mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© 2024 ЦЗН Production. Все права защищены.</div>
            <div>ГОСТ 23527-2018</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
