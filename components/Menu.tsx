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
      <ol role="list" className="flex flex-row md:flex-col justify-center md:justify-start">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-6' : '', 'relative')}>
            {step.id < currentStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-[0.3rem] md:mt-0.5 top-3 left-12 md:left-3 h-0.5 w-full md:w-0.5 md:h-full bg-cyan-900 opacity-75" aria-hidden="true" />
                ) : null}
                <div className="px-2 md:px-0 relative flex flex-col md:flex-row items-center group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-cyan-900 rounded-full">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-0 md:ml-4 min-w-0 flex flex-col">
                    <span className="text-xs md:text-sm font-bold tracking-wide uppercase text-cyan-900 w-20 md:w-fit text-center md:text-left">{step.name}</span>
                  </span>
                </div>
              </>
            ) : step.id == currentStep ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-[0.3rem] md:mt-0.5 top-3 left-12 md:left-3 h-0.5 w-full md:w-0.5 md:h-full bg-cyan-900 opacity-40" aria-hidden="true" />
                ) : null}
                <div className="px-2 md:px-0 relative flex flex-col md:flex-row items-center group" aria-current="step">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-cyan-900 bg-opacity-50 rounded-full">
                      <span className="h-4 w-4 bg-cyan-900 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-0 md:ml-4 min-w-0 flex flex-col">
                    <span className="text-xs md:text-sm tracking-wide uppercase text-cyan-900 font-semibold w-20 md:w-fit text-center md:text-left">{step.name}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-[0.3rem] md:mt-0.5 top-3 left-12 md:left-3 h-0.5 w-full md:w-0.5 md:h-full bg-cyan-900 opacity-40" aria-hidden="true" />
                ) : null}
                <div className="px-2 md:px-0 relative flex flex-col md:flex-row items-center group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-6 h-6 flex items-center justify-center bg-transparent rounded-full">
                      <span className="h-4 w-4 bg-cyan-900 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-0 md:ml-4 min-w-0 flex flex-col">
                    <span className="text-xs md:text-sm font-normal tracking-wide uppercase text-gray-500 w-20 md:w-fit text-center md:text-left">{step.name}</span>
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