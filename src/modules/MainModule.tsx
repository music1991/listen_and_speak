import { useTranslation } from "../i18n";

export default function MainModule() {
  const t = useTranslation();

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t.description}
        </h1>
        <p className="text-gray-500 text-lg">
          {t.intro}
        </p>
      </div>
    </div>
  );
}