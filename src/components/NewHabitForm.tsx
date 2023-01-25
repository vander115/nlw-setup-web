import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    event.preventDefault();

    console.log(title, weekDays);

    if (!title || weekDays.length === 0) {
      alert(
        'Certifique-se de que os campos do formulário estão preenchidos/marcados...',
      );
      return;
    }

    api
      .post('habits', {
        title,
        weekDays,
      })
      .then(() => alert('Hábito(s) cadastrado(s) com sucesso!'))
      .catch((err) => alert('Houve um problema ao cadastrar o(s) hábito(s)'));

    setTitle('');
    setWeekDays([]);
  }

  function handlToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemoveOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu compromentimento?
      </label>

      <input
        type="text"
        id="title"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays.includes(index)}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handlToggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold  text-whie">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-600 justify-center hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
