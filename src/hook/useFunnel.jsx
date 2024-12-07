import React, { useState } from "react";

function useFunnel(initialStep) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const Step = ({ name, children }) => {
    return <>{children}</>;
  };

  const Funnel = ({ children }) => {
    const steps = React.Children.toArray(children).filter(
      (child) => child.type === Step
    );

    const activeStep = steps.find((child) => child.props.name === currentStep);

    return activeStep || null;
  };

  const next = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const prev = (prevStep) => {
    setCurrentStep(prevStep);
  };

  return { Funnel, Step, next, prev, currentStep };
}

export default useFunnel;
