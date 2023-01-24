import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import { Check } from 'phosphor-react';

interface IHabitDayProps {
  completed: number;
  amount: number;
}

export function HabitDay({ amount, completed }: IHabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-500':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-500':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
          },
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[20rem] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <Popover.Arrow width={24} height={12} className="fill-zinc-900" />
          <span className="font-semibold text-zinc-400">terça-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            17/01
          </span>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                Beber 2L de água
              </span>
            </Checkbox.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function HabitDayDisabled() {
  return (
    <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
  );
}
