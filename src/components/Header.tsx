import { Plus } from 'phosphor-react';

import logoHabits from '../assets/habits-logo.svg';

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-flex justify-between">
      <img src={logoHabits} alt="Habits" />

      <button
        type="button"
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300"
      >
        <Plus size={20} className="text-violet-500" /> Novo Hábito
      </button>
    </div>
  );
}
