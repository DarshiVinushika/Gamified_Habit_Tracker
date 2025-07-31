import React from "react";

function HabitCategoryBox({
  title,
  icon,
  habits = [],
  checkedHabits = {},
  onHabitCheck,
}) {
  const handleCheck = (idx) => {
    const habit = habits[idx];
    const isChecked = !!checkedHabits[habit.name];
    const newChecked = !isChecked;

    if (onHabitCheck) {
      onHabitCheck(habit, newChecked);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 to-purple-950 rounded-2xl shadow-2xl p-6 mb-6 border-l-4 border-purple-400 w-96 transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.7)] ml-36">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3 text-purple-300 drop-shadow-[0_0_5px_rgba(124,58,237,0.8)]">{icon}</span>
        <span className="font-extrabold text-2xl text-blue-200 tracking-wide uppercase drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]">{title}</span>
      </div>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/80 shadow-md hover:bg-purple-900/50 transition-all duration-200 hover:scale-[1.02]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={!!checkedHabits[habit.name]}
                onChange={() => handleCheck(habits.indexOf(habit))}
                className="accent-purple-500 w-6 h-6 mr-3 rounded-md border-blue-600 cursor-pointer shadow-[0_0_5px_rgba(124,58,237,0.5)]"
              />
              <span
                className={
                  checkedHabits[habit.name]
                    ? "line-through text-gray-500 text-base font-semibold tracking-tight"
                    : "text-blue-200 text-base font-semibold tracking-tight drop-shadow-[0_0_2px_rgba(59,130,246,0.3)]"
                }
              >
                {habit.name}
              </span>
            </div>
            <span className="bg-purple-500/20 text-purple-200 px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_5px_rgba(124,58,237,0.4)] border border-purple-400/50">
              +{habit.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitCategoryBox;