'use client'


const plans = [
  { id: 'training', name: 'Training', description: 'Technical ball mastery • Speed and agility • Games' },
  { id: 'competitive', name: 'Train & Compete', description: 'Game IQ • Speed + Agility • Fitness • Matches' },
]

export default function PlanOptions() {
  return (
    <fieldset aria-label="Plan">
      <label htmlFor="training" className="block text-sm/6 font-semibold text-gray-900">
          Choose a plan
      </label>
      <div className="space-y-5 mt-2">
        {plans.map((plan) => (
          <div key={plan.id} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                defaultChecked={plan.id === 'training'}
                id={plan.id}
                name="plan"
                type="radio"
                aria-describedby={`${plan.id}-description`}
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
              />
            </div>
            <div className="ml-3 text-sm/6">
              <label htmlFor={plan.id} className="font-medium text-gray-900">
                {plan.name}
              </label>
              <p id={`${plan.id}-description`} className="text-gray-500">
                {plan.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
