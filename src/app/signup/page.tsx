"use client";
import Footer from "@/components/Footer";
import ReadyToWatch from "@/components/Signup/ReadyToWatch";
import VerifyEmail from "@/components/Signup/VerifyEmail";
import SignupForm from "@/components/Signup/SignupForm";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleNextStep = (emailValue?: string) => {
    if (emailValue) setEmail(emailValue);
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      {step === 1 && <ReadyToWatch onNextStep={handleNextStep} />}
      {step === 2 && <SignupForm initialEmail={email} />}
      {step === 3 && <VerifyEmail onNextStep={() => {}} />}
      <Footer />
    </>
  );
}
