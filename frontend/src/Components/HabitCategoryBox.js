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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-2xl text-white">{icon}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-600 text-lg">{habits.length} habits available</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.name}
            className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
              checkedHabits[habit.name]
                ? 'bg-green-50 border border-green-200 ring-2 ring-green-500 ring-opacity-30'
                : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={!!checkedHabits[habit.name]}
                  onChange={() => handleCheck(habits.indexOf(habit))}
                  className="w-5 h-5 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span
                  className={`ml-3 text-base font-medium ${
                    checkedHabits[habit.name]
                      ? 'line-through text-slate-400'
                      : 'text-slate-700'
                  }`}
                >
                  {habit.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                  +{habit.xp} XP
                </span>
                
                {checkedHabits[habit.name] && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Done!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitCategoryBox;
