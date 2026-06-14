export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper" aria-label="Onboarding progress">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;
        return (
          <div key={step} className={`stepper-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
            <span className="stepper-bullet">{index + 1}</span>
            <div>
              <strong>{step}</strong>
              <p>{isDone ? 'Completed' : isActive ? 'In progress' : 'Pending'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
