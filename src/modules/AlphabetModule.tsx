import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { speak, type SupportedLanguage } from '../utils/speech';


const alphabets: Record<SupportedLanguage, string[]> = {
  en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  es: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};

export default function AlphabetModule() {
  const { userLanguage } = useLanguage();
  const t = useTranslation();

  const handleSpeak = async (letter: string) => {
    await speak(letter, userLanguage as SupportedLanguage, {
      rate: 0.8,
      pitch: 1.0
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-5xl">
          🔤
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.alphabet}
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {alphabets[userLanguage as SupportedLanguage].map((letter, index) => (
          <button
            key={index}
            className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-2xl font-bold"
            onClick={() => handleSpeak(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}