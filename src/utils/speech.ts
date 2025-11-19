export type SupportedLanguage = 'en' | 'es';

const voiceConfig: Record<SupportedLanguage, { lang: string; rate?: number; pitch?: number }> = {
  en: { lang: 'en-US', rate: 0.7, pitch: 1.0 },
  es: { lang: 'es-ES', rate: 0.9, pitch: 1.0 }
};

let voices: SpeechSynthesisVoice[] = [];

export const initSpeechSynthesis = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const updateVoices = () => {
      voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      }
    };

    updateVoices();

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  });
};

const findBestVoice = (lang: string): SpeechSynthesisVoice | null => {
  if (voices.length === 0) return null;

  const nativeVoices = voices.filter(voice => 
    voice.lang === lang && voice.localService
  );
  
  if (nativeVoices.length > 0) {
    return nativeVoices[0];
  }

  const supportedVoices = voices.filter(voice => 
    voice.lang.startsWith(lang.split('-')[0])
  );

  return supportedVoices[0] || voices[0];
};

export const speak = async (
  text: string, 
  language: SupportedLanguage = 'en',
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }
): Promise<void> => {
  window.speechSynthesis.cancel();

  if (voices.length === 0) {
    await initSpeechSynthesis();
  }

  const config = { ...voiceConfig[language], ...options };
  const utterance = new SpeechSynthesisUtterance(text);
  
  utterance.lang = config.lang;
  utterance.rate = config.rate || 1.0;
  utterance.pitch = config.pitch || 1.0;
  utterance.volume = options?.volume || 1.0;

  const bestVoice = findBestVoice(config.lang);
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = (): void => {
  window.speechSynthesis.cancel();
};

export const pauseSpeaking = (): void => {
  window.speechSynthesis.pause();
};

export const resumeSpeaking = (): void => {
  window.speechSynthesis.resume();
};

export const isSpeechSynthesisSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

export const getSpeechState = (): 'speaking' | 'paused' | 'stopped' => {
  if (window.speechSynthesis.speaking) {
    return window.speechSynthesis.paused ? 'paused' : 'speaking';
  }
  return 'stopped';
};