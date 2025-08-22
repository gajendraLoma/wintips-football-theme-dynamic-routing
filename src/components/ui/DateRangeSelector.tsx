// src/app/components/ui/DateRangeSelector.tsx

'use client';
import { generateDates } from '../../lib/date-helper';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface DateRangeSelectorProps {
  activeDay: string;
  onDateSelect: (date: string) => void;
  className?: string;
}

export const DateRangeSelector = ({ activeDay, onDateSelect, className = '' }: DateRangeSelectorProps) => {
  const t = useTranslations();
  const dateRanges = useMemo(() => generateDates(), []);

  return (
    <div className={`bg-[#DCFADC] rounded-4xl ${className}`}>
      <ul className="flex gap-1 sm:gap-2 h-full py-1 px-2">
        {dateRanges.map((d, index) => (
          <li 
            key={index} 
            className="h-full cursor-pointer" 
            onClick={() => onDateSelect(d.value)}
          >
            <div className={`h-full flex items-center rounded-3xl px-3 py-1 sm:px-4 sm:py-0 ${
              d.value === activeDay ? 'bg-[#07302C]' : ''
            }`}>
              <div className="flex flex-col gap-0 justify-center items-center">
                <div className={`${
                  d.value === activeDay ? 'text-[#7BF179]' : 'text-[#454745]'
                } text-[12px] font-bold sm:text-sm`}>
                  {d.day}
                </div>
                <div className={`${
                  d.value === activeDay ? 'text-white' : 'text-[#454745]'
                } text-[10px] font-bold sm:text-[12px]`}>
                  {d.label === 'TODAY' ? t('today') : ''}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
