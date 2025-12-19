"use client";
import Footer from "@/components/Footer";
import ReadyToWatch from "@/components/Signup/ReadyToWatch";
import VerifyEmail from "@/components/Signup/VerifyEmail";
import { useState } from "react";

import { AuthResponse } from "@/types/auth";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [authData, setAuthData] = useState<AuthResponse | null>(null);

  const handleNextStep = (data: AuthResponse) => {
    setAuthData(data);
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      {step === 1 && <ReadyToWatch onNextStep={handleNextStep} />}
      {step === 2 && <VerifyEmail authData={authData} />}
      <Footer />
    </>
  );
}
