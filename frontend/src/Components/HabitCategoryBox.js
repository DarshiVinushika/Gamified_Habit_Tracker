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
    <div className="bg-white rounded-xl shadow p-4 mb-6 border-l-4 border-orange-300 w-96">
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">{icon}</span>
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <div className="space-y-3">
        {habits.map((habit) => (
          <div key={habit.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={!!checkedHabits[habit.name]}
                onChange={() => handleCheck(habits.indexOf(habit))}
                className="accent-orange-400 w-4 h-4 mr-2"
              />
              <span
                className={
                  checkedHabits[habit.name]
                    ? "line-through text-gray-400 text-sm"
                    : "text-blue-900 text-sm"
                }
              >
                {habit.name}
              </span>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
              +{habit.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitCategoryBox;
