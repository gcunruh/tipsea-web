import { CheckIcon } from '@heroicons/react/solid'

type Step = {
    id: Number;
    name: string;
    component: JSX.Element;
}

type MenuProps = {
    steps: Array<Step>;
    currentStep: Number;
    nextStep?: () => void;
    prevStep?: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Menu({ steps, currentStep, nextStep, prevStep }: MenuProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-6' : '', 'relative')}>
            {step.id < currentStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  null
                ) : null}
                <div className="relative flex items-center group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-cyan-900 rounded-full">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-bold tracking-wide uppercase text-cyan-900">{step.name}</span>
                  </span>
                </div>
              </>
            ) : step.id == currentStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  null
                ) : null}
                <div className="relative flex items-center group" aria-current="step">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-cyan-900 bg-opacity-50 rounded-full">
                      <span className="h-4 w-4 bg-cyan-900 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs tracking-wide uppercase text-cyan-900 font-semibold">{step.name}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  null
                ) : null}
                <div className="relative flex items-center group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-transparent rounded-full">
                      <span className="h-4 w-4 bg-cyan-900 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-normal tracking-wide uppercase text-gray-500">{step.name}</span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}