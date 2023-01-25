import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';
import { HabitDay, HabitDayDisabled } from './HabitDay';

const summaryDates = generateDatesFromYearBeginning();

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type summaryType = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<summaryType>([]);

  useEffect(() => {
    api.get('/summary').then((response) => setSummary(response.data));
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDays, index) => (
          <div
            key={index}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
          >
            {weekDays}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, index) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, 'day');
          });
          return (
            <HabitDay
              date={date}
              completed={dayInSummary?.completed}
              amount={dayInSummary?.amount}
              key={String(date)}
            />
          );
        })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => (
            <HabitDayDisabled key={index} />
          ))}
      </div>
    </div>
  );
}
