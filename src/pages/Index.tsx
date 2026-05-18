import { useState, useEffect } from 'react';

export default function Index() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">تحدي المعلومات</h1>
      
      <div className="bg-slate-800 p-8 rounded-lg max-w-md w-full">
        <p className="text-center mb-6 text-lg">لعبة أسئلة جماعية بين فريقين</p>
        
        <button className="bg-yellow-400 text-black font-bold text-lg w-full py-3 rounded-xl mb-4">
          ابدأ اللعبة
        </button>

        {installPrompt && (
          <button 
            onClick={handleInstall}
            className="bg-yellow-400 text-black font-bold text-lg w-full py-3 rounded-xl mt-4"
          >
            ⚡ ثبت تطبيق تحدي المعلومات
          </button>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm mb-4">تابعنا على التيليجرام:</p>
          <a 
            href="https://t.me/cumayunus" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg inline-block hover:bg-blue-600"
          >
            📱 انضم لقناتنا
          </a>
        </div>
      </div>
    </div>
  );
}