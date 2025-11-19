import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { speak, type SupportedLanguage } from '../utils/speech';


type LetterExample = {
  letter: string;
  example: Record<SupportedLanguage, string>;
};

const letterExamples: LetterExample[] = [
  { letter: 'A', example: { en: 'Airplane', es: 'Avión' } },
  { letter: 'B', example: { en: 'Book', es: 'Libro' } },
  { letter: 'C', example: { en: 'Cat', es: 'Casa' } },
  { letter: 'D', example: { en: 'Door', es: 'Dedo' } },
  { letter: 'E', example: { en: 'Elephant', es: 'Elefante' } },
  { letter: 'F', example: { en: 'Flower', es: 'Flor' } },
  { letter: 'G', example: { en: 'Garden', es: 'Gato' } },
  { letter: 'H', example: { en: 'House', es: 'Huevo' } },
  { letter: 'I', example: { en: 'Ice cream', es: 'Isla' } },
  { letter: 'J', example: { en: 'Jungle', es: 'Jirafa' } },
  { letter: 'K', example: { en: 'Kangaroo', es: 'Koala' } },
  { letter: 'L', example: { en: 'Light', es: 'Luna' } },
  { letter: 'M', example: { en: 'Mountain', es: 'Mesa' } },
  { letter: 'N', example: { en: 'Night', es: 'Nube' } },
  { letter: 'O', example: { en: 'Ocean', es: 'Oso' } },
  { letter: 'P', example: { en: 'Pencil', es: 'Perro' } },
  { letter: 'Q', example: { en: 'Queen', es: 'Queso' } },
  { letter: 'R', example: { en: 'River', es: 'Ratón' } },
  { letter: 'S', example: { en: 'Sun', es: 'Sol' } },
  { letter: 'T', example: { en: 'Tree', es: 'Taza' } },
  { letter: 'U', example: { en: 'Umbrella', es: 'Uva' } },
  { letter: 'V', example: { en: 'Vehicle', es: 'Vaca' } },
  { letter: 'W', example: { en: 'Window', es: 'Waterpolo' } },
  { letter: 'X', example: { en: 'Xylophone', es: 'Xilófono' } },
  { letter: 'Y', example: { en: 'Yoga', es: 'Yogur' } },
  { letter: 'Z', example: { en: 'Zebra', es: 'Zapato' } },
];

export default function ExampleModule() {
  const { userLanguage } = useLanguage();
  const t = useTranslation();
  const [customText, setCustomText] = useState('');

  const handleSpeakExample = (example: string) => {
    speak(example, userLanguage as SupportedLanguage);
  };

  const handleSpeakCustomText = () => {
    if (customText.trim() !== '') {
      speak(customText, userLanguage as SupportedLanguage);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-5xl">
          📚
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          {t.examples}
        </h2>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.example_letter}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {letterExamples.map((item, index) => (
            <button
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 hover:from-teal-50 hover:to-cyan-50 border border-gray-200 hover:border-teal-300 rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-left"
              onClick={() => handleSpeakExample(item.example[userLanguage as SupportedLanguage])}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {item.letter}
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                    {item.example[userLanguage as SupportedLanguage]}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.custom_text}</h3>
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            rows={4}
            placeholder={t.enter}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSpeakCustomText}
            disabled={customText.trim() === ''}
          >
            {t.read}
          </button>
        </div>
      </div>
    </div>
  );
}