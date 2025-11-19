import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useTranslation } from './i18n';
import MainModule from './modules/MainModule';
import AlphabetModule from './modules/AlphabetModule';
import PhraseModule from './modules/PhraseModule';
import ExampleModule from './modules/ExampleModule';

const LanguageSelector: React.FC = () => {
  const { userLanguage, setUserLanguage } = useLanguage();
  const t = useTranslation();

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
        <label className="mr-3 font-semibold text-gray-700 text-lg">
          {t.choose_language}:
        </label>
        <select
          className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer"
          value={userLanguage}
          onChange={(e) => setUserLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-yellow-300/20 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <LanguageSelector />
          <div className="space-y-8">
            <MainModule />
            <AlphabetModule />
             <ExampleModule />
            <PhraseModule />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;