interface IHabitDayProps {
  completed?: number;
}

export function HabitDay({ completed }: IHabitDayProps) {
  return (
    <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"></div>
  );
}

export function HabitDayDisabled() {
  return (
    <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
  );
}
