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
      weight: '1.8 кг'
    },
    {
      model: 'ЦЗН-168',
      outerDiameter: '168 мм',
      outerDiameterNum: 168,
      innerDiameter: '127 мм',
      workingRange: '190-220 мм',
      workingRangeMin: 190,
      workingRangeMax: 220,
      weight: '3.2 кг'
    },
    {
      model: 'ЦЗН-219',
      outerDiameter: '219 мм',
      outerDiameterNum: 219,
      innerDiameter: '168 мм',
      workingRange: '245-295 мм',
      workingRangeMin: 245,
      workingRangeMax: 295,
      weight: '5.1 кг'
    },
    {
      model: 'ЦЗН-273',
      outerDiameter: '273 мм',
      outerDiameterNum: 273,
      innerDiameter: '219 мм',
      workingRange: '295-350 мм',
      workingRangeMin: 295,
      workingRangeMax: 350,
      weight: '7.8 кг'
    },
    {
      model: 'ЦЗН-324',
      outerDiameter: '324 мм',
      outerDiameterNum: 324,
      innerDiameter: '273 мм',
      workingRange: '350-420 мм',
      workingRangeMin: 350,
      workingRangeMax: 420,
      weight: '11.2 кг'
    },
    {
      model: 'ЦЗН-426',
      outerDiameter: '426 мм',
      outerDiameterNum: 426,
      innerDiameter: '340 мм',
      workingRange: '450-540 мм',
      workingRangeMin: 450,
      workingRangeMax: 540,
      weight: '18.5 кг'
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
    { param: 'Материал пружин', value: 'Сталь 65Г, 60С2А' },
    { param: 'Материал корпуса', value: 'Сталь 20, 09Г2С' },
    { param: 'Покрытие', value: 'Цинкование ГОСТ 9.307' },
    { param: 'Температура эксплуатации', value: 'от -60°C до +120°C' },
    { param: 'Осевая нагрузка', value: 'до 250 кН' },
    { param: 'Восстанавливающая сила', value: '200-1500 Н' }
  ];

  const advantages = [
    'Высокая восстанавливающая сила пружин',
    'Надежная фиксация на трубе',
    'Минимальное сопротивление при спуске',
    'Равномерное распределение нагрузки',
    'Защита от коррозии',
    'Длительный срок службы'
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">ЦЗН</div>
              <div className="text-sm text-gray-600">Центраторы заливки нефти</div>
            </div>
            <div className="hidden md:flex gap-8">
              {['home', 'calculator', 'models', 'specs', 'advantages', 'docs', 'order'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm transition-colors ${
                    activeSection === section ? 'text-black' : 'text-gray-500 hover:text-black'
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
            <Button size="sm" variant="outline">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium border border-black">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                ГОСТ 23527-2018
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Центраторы<br />ЦЗН
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Пружинные центраторы для центрирования обсадных колонн в наклонно-направленных 
                и горизонтальных скважинах. Диаметры от 114 до 426 мм.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  Скачать каталог
                  <Icon name="Download" size={18} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Получить прайс
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Диапазон диаметров</div>
                  <div className="text-3xl font-bold">114-426 мм</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-600 mb-2">Модельный ряд</div>
                  <div className="text-3xl font-bold">6 моделей</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-600 mb-2">Соответствие</div>
                  <div className="text-3xl font-bold">ГОСТ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Калькулятор подбора ЦЗН</h2>
            <p className="text-lg text-gray-600">
              Введите параметры скважины и обсадной колонны для подбора подходящей модели
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-xl font-bold mb-6">Параметры</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium block mb-3">
                    <Icon name="Circle" size={16} className="inline mr-2" />
                    Диаметр обсадной трубы (мм)
                  </label>
                  <input
                    type="number"
                    value={tubeDiameter}
                    onChange={(e) => setTubeDiameter(e.target.value)}
                    placeholder="Например: 219"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    Стандартные диаметры: 114, 168, 219, 273, 324, 426 мм
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">
                    <Icon name="Circle" size={16} className="inline mr-2" />
                    Диаметр скважины (мм)
                  </label>
                  <input
                    type="number"
                    value={wellDiameter}
                    onChange={(e) => setWellDiameter(e.target.value)}
                    placeholder="Например: 270"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-lg"
                  />
                  <div className="mt-2 text-xs text-gray-600">
                    Внутренний диаметр скважины или предыдущей колонны
                  </div>
                </div>

                <Button 
                  onClick={calculateCentrator} 
                  className="w-full" 
                  size="lg"
                  disabled={!tubeDiameter || !wellDiameter}
                >
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-700">
                    <strong>Справка:</strong> Зазор между трубой и стенкой скважины должен составлять 
                    минимум 25-30 мм для эффективного цементирования
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[400px]">
              <h3 className="text-xl font-bold mb-6">Результат подбора</h3>
              
              {!calculatorResult && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Icon name="Calculator" size={64} className="mb-4 opacity-20" />
                  <p className="text-center">Введите параметры и нажмите "Рассчитать"</p>
                </div>
              )}

              {calculatorResult?.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-900 mb-1">Ошибка расчета</div>
                      <div className="text-sm text-red-700">{calculatorResult.error}</div>
                    </div>
                  </div>
                </div>
              )}

              {calculatorResult?.success && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="CheckCircle" size={24} className="text-green-600" />
                      <div className="text-lg font-bold">Рекомендуемая модель</div>
                    </div>
                    <div className="text-3xl font-bold text-green-900 mb-2">
                      {calculatorResult.model.model}
                    </div>
                    <div className="text-sm text-gray-600">
                      {calculatorResult.model.outerDiameter} / {calculatorResult.model.workingRange}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Зазор</span>
                      <span className="font-bold">{calculatorResult.gap} мм</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Масса центратора</span>
                      <span className="font-bold">{calculatorResult.model.weight}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">Шаг установки</span>
                      <span className="font-bold">{calculatorResult.spacing} м</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Количество на 1000 м</span>
                      <span className="font-bold text-lg">{calculatorResult.quantity} шт</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" variant="outline" onClick={() => scrollToSection('order')}>
                      Заказать {calculatorResult.model.model}
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {calculatorResult?.alternative && (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertTriangle" size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-yellow-900 mb-1">Альтернативные варианты</div>
                        <div className="text-sm text-yellow-700">{calculatorResult.message}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {calculatorResult.models.map((model: any, index: number) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors">
                        <div className="font-bold text-lg mb-1">{model.model}</div>
                        <div className="text-sm text-gray-600">
                          Труба: {model.outerDiameter} / Скважина: {model.workingRange}
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

      <section id="models" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Модельный ряд ЦЗН</h2>
            <p className="text-lg text-gray-600">
              Полная линейка центраторов для обсадных труб различных диаметров
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-4 px-4 font-medium">Модель</th>
                  <th className="text-left py-4 px-4 font-medium">Диаметр трубы</th>
                  <th className="text-left py-4 px-4 font-medium">Внутренний Ø</th>
                  <th className="text-left py-4 px-4 font-medium">Рабочий диапазон</th>
                  <th className="text-left py-4 px-4 font-medium">Масса</th>
                  <th className="text-right py-4 px-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {cznModels.map((model, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-lg">{model.model}</div>
                    </td>
                    <td className="py-4 px-4">{model.outerDiameter}</td>
                    <td className="py-4 px-4">{model.innerDiameter}</td>
                    <td className="py-4 px-4">{model.workingRange}</td>
                    <td className="py-4 px-4">{model.weight}</td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="outline" size="sm">
                        Заказать
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">Индивидуальное производство</div>
                <div className="text-sm text-gray-600">
                  Возможно изготовление центраторов по индивидуальным параметрам под конкретные условия эксплуатации
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="specs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Технические характеристики</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">Общие параметры</h3>
              <div className="space-y-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
                    <div className="text-sm text-gray-600 pr-4">{spec.param}</div>
                    <div className="font-medium text-right">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">Область применения</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium mb-1">Наклонно-направленные скважины</div>
                    <div className="text-sm text-gray-600">Углы искривления до 45°</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium mb-1">Горизонтальные участки</div>
                    <div className="text-sm text-gray-600">Большие отклонения от вертикали</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium mb-1">Сложные геологические условия</div>
                    <div className="text-sm text-gray-600">Неоднородные породы</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium mb-1">Операции цементирования</div>
                    <div className="text-sm text-gray-600">Обеспечение качественного цементного кольца</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Icon name="Shield" size={32} className="mx-auto mb-3 text-gray-700" />
              <div className="font-medium mb-1">Защита от коррозии</div>
              <div className="text-sm text-gray-600">Цинковое покрытие по ГОСТ 9.307</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Icon name="Thermometer" size={32} className="mx-auto mb-3 text-gray-700" />
              <div className="font-medium mb-1">Термостойкость</div>
              <div className="text-sm text-gray-600">Работа при температуре до +120°C</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Icon name="Zap" size={32} className="mx-auto mb-3 text-gray-700" />
              <div className="font-medium mb-1">Высокая прочность</div>
              <div className="text-sm text-gray-600">Осевая нагрузка до 250 кН</div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="advantages" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Преимущества ЦЗН</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="text-lg">{advantage}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Почему выбирают ЦЗН</h3>
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Центраторы ЦЗН разработаны специально для работы в сложных условиях наклонно-направленных 
                и горизонтальных скважин. Пружинная конструкция обеспечивает равномерное прижатие к стенкам 
                скважины на всем протяжении обсадной колонны.
              </p>
              <p>
                Производство осуществляется в соответствии с ГОСТ 23527-2018, что гарантирует высокое качество 
                и надежность изделий. Каждая партия проходит контроль качества и комплектуется сертификатами соответствия.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section id="docs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Документация</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: 'Каталог ЦЗН 2024', size: '3.8 МБ', icon: 'FileText' },
              { name: 'Технический паспорт', size: '1.2 МБ', icon: 'FileText' },
              { name: 'Сертификат ГОСТ 23527-2018', size: '2.1 МБ', icon: 'Award' },
              { name: 'Инструкция по монтажу', size: '1.6 МБ', icon: 'BookOpen' },
              { name: 'Таблица типоразмеров', size: '0.8 МБ', icon: 'Table' },
              { name: 'Протоколы испытаний', size: '4.2 МБ', icon: 'ClipboardCheck' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg hover:border-black transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon name={doc.icon as any} size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{doc.name}</div>
                    <div className="text-sm text-gray-600">{doc.size}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section id="order" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Заказ и поставка</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6">Контактная информация</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Отдел продаж</div>
                      <div className="text-lg font-medium">+7 (800) 555-01-23</div>
                      <div className="text-sm text-gray-600">Пн-Пт 9:00-18:00 МСК</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <div className="text-lg font-medium">sales@czn-production.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Производство</div>
                      <div className="text-lg font-medium">г. Пермь, ул. Промышленная, 125</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-bold mb-3">Условия поставки</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Минимальная партия: от 10 шт</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Срок производства: 7-14 дней</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Доставка по РФ транспортными компаниями</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                    <span>Гарантия: 12 месяцев</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6">Форма заказа</h3>
                <form className="space-y-5">
                  <div>
                    <label className="text-sm font-medium block mb-2">Организация *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white"
                      placeholder="ООО «Компания»"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Контактное лицо *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white"
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white"
                        placeholder="email@company.ru"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Модель и количество *</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white resize-none"
                      placeholder="Например: ЦЗН-219 - 50 шт, ЦЗН-273 - 30 шт"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black bg-white resize-none"
                      placeholder="Дополнительные требования или вопросы"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Отправить заявку
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <div className="text-2xl font-bold mb-2">ЦЗН</div>
              <p className="text-sm text-gray-400">Производство центраторов заливки нефти</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Реквизиты</a>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 ЦЗН Production
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;