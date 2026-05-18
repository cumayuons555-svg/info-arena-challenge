import { useState, useEffect } from 'react';

interface TimeZoneInfo {
  name: string;
  timezone: string;
  offset: number;
}

const TimezoneClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezones] = useState<TimeZoneInfo[]>([
    { name: 'مكة المكرمة', timezone: 'Asia/Riyadh', offset: 3 },
    { name: 'لندن', timezone: 'Europe/London', offset: 0 },
    { name: 'نيويورك', timezone: 'America/New_York', offset: -5 },
    { name: 'طوكيو', timezone: 'Asia/Tokyo', offset: 9 },
    { name: 'دبي', timezone: 'Asia/Dubai', offset: 4 },
    { name: 'باريس', timezone: 'Europe/Paris', offset: 1 },
    { name: 'سيدني', timezone: 'Australia/Sydney', offset: 10 },
    { name: ' Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone,
      });
      return formatter.format(date);
    } catch {
      return '--:--:--';
    }
  };

  const getDate = (date: Date, timezone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timezone,
      });
      return formatter.format(date);
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-yellow-400 mb-4">
          ⏰ الساعة العالمية
        </h1>
        <p className="text-center text-gray-300 mb-12">
          عرض الوقت الحالي في مناطق زمنية مختلفة
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timezones.map((tz, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <h2 className="text-xl font-bold text-yellow-400 mb-3 text-center">
                {tz.name}
              </h2>

              <div className="bg-black/50 rounded-xl p-4 mb-4 border border-purple-400/20">
                <div className="text-4xl font-mono font-bold text-green-400 text-center tracking-wider">
                  {formatTime(currentTime, tz.timezone)}
                </div>
              </div>

              <div className="text-sm text-gray-300 text-center mb-2">
                {getDate(currentTime, tz.timezone)}
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400 border-t border-purple-400/10 pt-3 mt-3">
                <span>UTC {tz.offset >= 0 ? '+' : ''}{tz.offset}</span>
                <span className="text-purple-400">{tz.timezone}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Time Display */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400/10 to-purple-500/10 border-2 border-yellow-400 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">وقتك المحلي</h2>
          <div className="text-6xl font-mono font-bold text-green-400 tracking-wider mb-4">
            {formatTime(currentTime, Intl.DateTimeFormat().resolvedOptions().timeZone)}
          </div>
          <div className="text-lg text-gray-300">
            {getDate(currentTime, Intl.DateTimeFormat().resolvedOptions().timeZone)}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-slate-800/30 border border-purple-500/20 rounded-xl p-6 text-gray-300 text-center text-sm">
          <p>يتم تحديث الساعة تلقائياً كل ثانية • جميع الأوقات بصيغة 24 ساعة</p>
        </div>
      </div>
    </div>
  );
};

export default TimezoneClock;