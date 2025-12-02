import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  visited: boolean;
}

interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: string;
  category: 'ostrog' | 'sobor' | 'slovo';
  icon: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'ostrog',
      title: 'Острог',
      subtitle: 'География несвободы',
      icon: 'Shield',
      color: 'bg-red-900/20 border-red-800',
      visited: false
    },
    {
      id: 'sobor',
      title: 'Собор',
      subtitle: 'Оазис души',
      icon: 'Church',
      color: 'bg-blue-900/20 border-blue-800',
      visited: false
    },
    {
      id: 'slovo',
      title: 'Слово',
      subtitle: 'Побег в вечность',
      icon: 'BookOpen',
      color: 'bg-purple-900/20 border-purple-800',
      visited: false
    }
  ]);

  const visitedCount = sections.filter(s => s.visited).length;
  const progress = (visitedCount / sections.length) * 100;

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setSections(prev => 
      prev.map(s => s.id === sectionId ? { ...s, visited: true } : s)
    );
  };

  const getSectionContent = (sectionId: string) => {
    const content = {
      ostrog: {
        quote: '«Эти четыре года я считаю за время, в которое я был похоронен заживо и закрыт в гробу»',
        description: 'Омская крепость стала местом каторги для Достоевского с 1850 по 1854 год. Здесь он познал глубины человеческого страдания.',
        points: [
          { name: 'Острожный двор', desc: 'Место заключения каторжников', year: '1850-1854' },
          { name: 'Казарма №7', desc: 'Жилище Достоевского в остроге', year: '1850' },
          { name: 'Кузница', desc: 'Работа в кандалах', year: '1851-1853' }
        ]
      },
      sobor: {
        quote: '«Я верю, что есть Бог и жизнь будущая. В этом всё моё упование»',
        description: 'Воскресенский военный собор был единственным местом духовного утешения. Здесь писатель находил силы для внутреннего возрождения.',
        image: 'https://cdn.poehali.dev/files/f3abbce0-707e-4926-8e21-979354bb3078.png',
        imageCaption: 'Фрагмент арки Воскресенского собора с резьбой',
        points: [
          { name: 'Иконостас', desc: 'Художественное убранство собора', year: '1769' },
          { name: 'Библиотека', desc: 'Собрание духовной литературы', year: '1840-е' },
          { name: 'Церковные службы', desc: 'Каждое воскресенье для каторжан', year: '1850-1854' }
        ]
      },
      slovo: {
        quote: '«Человек есть тайна. Её надо разгадать, и ежели будешь её разгадывать всю жизнь, то не говори, что потерял время»',
        description: 'Опыт каторги стал основой для великих произведений. Омск вошёл в вечность через литературу.',
        points: [
          { name: '«Записки из Мёртвого дома»', desc: 'Документальная повесть о каторге', year: '1860-1862' },
          { name: '«Преступление и наказание»', desc: 'Философский роман о границах человека', year: '1866' },
          { name: '«Братья Карамазовы»', desc: 'Размышления о вере и страдании', year: '1879-1880' }
        ]
      }
    };

    return content[sectionId as keyof typeof content];
  };

  const mapLocations: MapLocation[] = [
    {
      id: 'loc1',
      name: 'Омская крепость (Острог)',
      description: 'Место заключения Достоевского (1850-1854)',
      coordinates: '54.9924° N, 73.3686° E',
      category: 'ostrog',
      icon: 'Shield'
    },
    {
      id: 'loc2',
      name: 'Воскресенский военный собор',
      description: 'Храм, который посещал писатель',
      coordinates: '54.9945° N, 73.3698° E',
      category: 'sobor',
      icon: 'Church'
    },
    {
      id: 'loc3',
      name: 'Дом коменданта',
      description: 'Административный центр крепости',
      coordinates: '54.9935° N, 73.3692° E',
      category: 'ostrog',
      icon: 'Home'
    },
    {
      id: 'loc4',
      name: 'Литературный музей им. Достоевского',
      description: 'Современный музей писателя',
      coordinates: '54.9889° N, 73.3692° E',
      category: 'slovo',
      icon: 'BookOpen'
    },
    {
      id: 'loc5',
      name: 'Иртышская набережная',
      description: 'Место прогулок заключённых',
      coordinates: '54.9950° N, 73.3710° E',
      category: 'ostrog',
      icon: 'Waves'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!activeSection ? (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Icon name="Landmark" size={48} className="text-primary" />
              <h1 className="text-5xl md:text-7xl font-bold">
                Омск Достоевского
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 italic">
              Каторга, вера и слово
            </p>
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg text-accent/80 leading-relaxed">
                Виртуальный музей, посвящённый пребыванию Ф.М. Достоевского в Омске. 
                Пройдите путь писателя через острог, собор и слово — откройте, как локальная история 
                стала частью мировой культуры.
              </p>
            </div>

            <div className="mb-12">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Прогресс исследования</span>
                <Badge variant="outline" className="bg-primary/10">
                  {visitedCount} / {sections.length}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Card
                key={section.id}
                className={`${section.color} border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in relative overflow-hidden group`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.visited && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90">
                      <Icon name="Check" size={14} className="mr-1" />
                      Пройдено
                    </Badge>
                  </div>
                )}
                
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon name={section.icon} size={48} className="text-primary" />
                </div>
                
                <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                <p className="text-lg text-muted-foreground mb-4">{section.subtitle}</p>
                
                <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                  <span>Исследовать</span>
                  <Icon name="ArrowRight" size={16} />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Литературная карта Омска</h2>
              <p className="text-muted-foreground mb-8">Интерактивная карта мест, связанных с пребыванием Достоевского</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mapLocations.map((location, index) => {
                const categoryColor = {
                  ostrog: 'border-red-800 hover:bg-red-900/10',
                  sobor: 'border-blue-800 hover:bg-blue-900/10',
                  slovo: 'border-purple-800 hover:bg-purple-900/10'
                };

                return (
                  <Card
                    key={location.id}
                    className={`border-2 p-5 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${categoryColor[location.category]} ${selectedLocation === location.id ? 'ring-2 ring-primary' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Icon name={location.icon} size={28} className="text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 leading-tight">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.description}</p>
                      </div>
                    </div>
                    {selectedLocation === location.id && (
                      <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                        <div className="flex items-center gap-2 text-xs text-accent">
                          <Icon name="MapPin" size={14} />
                          <span className="font-mono">{location.coordinates}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Card className="bg-card/50 border-2 border-secondary/30 p-8 max-w-2xl mx-auto">
                <Icon name="Sparkles" size={32} className="text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Онлайн-квест</h3>
                <p className="text-muted-foreground mb-4">
                  Выполните задания во всех разделах, чтобы получить сертификат исследователя 
                  литературного наследия Достоевского
                </p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  #ОмскДостоевского
                </Badge>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-5xl animate-fade-in">
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Вернуться к разделам</span>
          </button>

          {activeSection && (() => {
            const content = getSectionContent(activeSection);
            const section = sections.find(s => s.id === activeSection);

            return (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <Icon name={section?.icon || 'BookOpen'} size={56} className="text-primary" />
                  <div>
                    <h1 className="text-5xl font-bold mb-2">{section?.title}</h1>
                    <p className="text-xl text-muted-foreground">{section?.subtitle}</p>
                  </div>
                </div>

                <Card className="bg-card/80 border-2 border-primary/30 p-8 mb-8">
                  <blockquote className="text-2xl italic text-accent leading-relaxed border-l-4 border-primary pl-6">
                    {content.quote}
                  </blockquote>
                  <p className="text-right text-muted-foreground mt-4">— Ф.М. Достоевский</p>
                </Card>

                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {content.description}
                  </p>
                </div>

                {content.image && (
                  <Card className="mb-8 overflow-hidden border-2 border-primary/20">
                    <img 
                      src={content.image} 
                      alt={content.imageCaption || 'Артефакт музея'} 
                      className="w-full h-auto object-cover"
                    />
                    {content.imageCaption && (
                      <div className="p-4 bg-card/60">
                        <p className="text-sm text-muted-foreground italic">{content.imageCaption}</p>
                      </div>
                    )}
                  </Card>
                )}

                <h2 className="text-3xl font-bold mb-6">Ключевые точки</h2>
                
                <div className="grid gap-6">
                  {content.points.map((point, index) => (
                    <Card
                      key={index}
                      className="bg-card/60 border-2 hover:border-primary/50 p-6 transition-all duration-300 hover:shadow-lg animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon name="MapPin" size={20} className="text-primary flex-shrink-0" />
                            <h3 className="text-xl font-bold">{point.name}</h3>
                          </div>
                          <p className="text-muted-foreground ml-8">{point.desc}</p>
                        </div>
                        <Badge variant="outline" className="flex-shrink-0">
                          {point.year}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="mt-12 bg-secondary/10 border-2 border-secondary/30 p-8">
                  <div className="flex items-start gap-4">
                    <Icon name="Lightbulb" size={32} className="text-secondary flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold mb-3">Задание квеста</h3>
                      <p className="text-muted-foreground mb-4">
                        {activeSection === 'ostrog' && 'Найдите на карте Омской крепости место, где располагалась казарма №7. Запишите координаты в дневник исследователя.'}
                        {activeSection === 'sobor' && 'Изучите описание иконостаса Воскресенского собора. Создайте коллаж с элементами храмовой архитектуры.'}
                        {activeSection === 'slovo' && 'Выберите цитату из "Записок из Мёртвого дома" и свяжите её с конкретным местом в Омске. Подготовьте эссе.'}
                      </p>
                      <Badge className="bg-primary/90">
                        <Icon name="Award" size={16} className="mr-2" />
                        +1 достижение
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default Index;