"use client";
import Footer from "@/components/Footer";
import ReadyToWatch from "@/components/Signup/ReadyToWatch";
import VerifyEmail from "@/components/Signup/VerifyEmail";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      {step === 1 && <ReadyToWatch onNextStep={handleNextStep} />}
      {step === 2 && <VerifyEmail onNextStep={handleNextStep} />}
      <Footer />
    </>
  );
}
