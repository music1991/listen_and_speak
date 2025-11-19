import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../i18n';
import { speak, type SupportedLanguage } from '../utils/speech';

const phrases: Record<SupportedLanguage, string>[] = [
  { en: 'Hello', es: 'Hola' },
  { en: 'Goodbye', es: 'Adiós' },
  { en: 'Thank you', es: 'Gracias' },
  { en: 'Please', es: 'Por favor' },
  { en: 'How are you?', es: '¿Cómo estás?' },
  { en: 'I love you', es: 'Te quiero' }
];

export default function PhraseModule() {
  const { userLanguage } = useLanguage();
  const t = useTranslation();

  const handleSpeak = async (text: string) => {
    try {
      await speak(text, userLanguage as SupportedLanguage, {
        rate: userLanguage === 'es' ? 0.9 : 0.8,
        pitch: 1.0,
        volume: 0.8
      });
    } catch (error) {
      console.error('Error speaking:', error);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = userLanguage === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-5xl">
          💬
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {t.phrases}
        </h2>
      </div>

      <div className="grid gap-4">
        {phrases.map((phrase, index) => (
          <button
            key={index}
            className="group relative bg-gradient-to-br from-white to-gray-50 hover:from-orange-50 hover:to-red-50 border border-gray-200 hover:border-orange-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-left"
            onClick={() => handleSpeak(phrase[userLanguage as SupportedLanguage])}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                
                <span className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  {phrase[userLanguage as SupportedLanguage]}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors duration-300 hidden md:block">
                  {t.click_to_speak}
                </span>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">🔊</span>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
}