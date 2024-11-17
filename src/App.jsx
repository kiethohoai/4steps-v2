import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const buttonStyle = { backgroundColor: '#7959f2', color: '#fff' };
  const [step, setStep] = useState(1);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
    else return;
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    else return;
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <div className="message">
        Step {step}: {messages[step - 1]}
      </div>

      <div className="buttons">
        <button style={buttonStyle} onClick={handlePrevious}>
          Previous
        </button>
        <button style={buttonStyle} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
