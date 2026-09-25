"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/schema/forgotPasswordSchema";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schema/resetPasswordSchema";
import { forgotPassword } from "@/api/actions/password/forgotPassword";
import { verifyResetCode } from "@/api/actions/password/verifyResetCode";
import { resetPassword } from "@/api/actions/password/resetPassword";

type Stage = "email" | "reset" | "success";

export default function ForgotPasswordFlow() {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ---------- Step 1: Email form ----------
  const emailForm = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmitEmail(values: ForgotPasswordSchemaType) {
    try {
      setSubmitting(true);
      const payload = await forgotPassword(values.email);

      if (payload.statusMsg === "success" || payload.status === "success") {
        setEmail(values.email);
        setStage("reset");
        toast.add({
          type: "success",
          description: "Reset code sent to your email",
        });
      } else {
        toast.add({
          type: "error",
          description: "Could not send reset code",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: "Could not send reset code. Check the email and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // ---------- Step 2: Reset code + new password ----------
  const resetForm = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { resetCode: "", newPassword: "", confirmPassword: "" },
  });

  async function onSubmitReset(values: ResetPasswordSchemaType) {
    try {
      setSubmitting(true);

      // تحقق من الكود أول
      await verifyResetCode(values.resetCode);

      // بعد نجاح التحقق، غيّر كلمة السر
      const payload = await resetPassword(email, values.newPassword);

      if (payload.token || payload.email) {
        setStage("success");
      } else {
        toast.add({
          type: "error",
          description: "Could not reset password",
        });
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: "Invalid or expired reset code",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Step indicator config per stage
  const stepIndex = stage === "email" ? 0 : stage === "reset" ? 1 : 2;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8faf9] px-4 py-10">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-lg lg:grid-cols-2">
        {/* Left panel */}
        <div className="flex flex-col justify-center bg-green-50 p-10">
          <div className="relative mx-auto mb-8 flex h-64 w-full max-w-sm items-center justify-center rounded-2xl bg-green-100/60">
            <div className="absolute left-10 top-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Mail size={22} className="text-primary" />
            </div>

            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-md">
              <Lock size={36} className="text-primary" />
            </div>

            <div className="absolute right-10 top-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Shield size={22} className="text-primary" />
            </div>

            <div className="absolute bottom-6 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  stepIndex >= 0 ? "bg-primary" : "bg-green-200"
                }`}
              />
              <span
                className={`h-2 w-2 rounded-full ${
                  stepIndex >= 1 ? "bg-primary" : "bg-green-200"
                }`}
              />
              <span
                className={`h-2 w-2 rounded-full ${
                  stepIndex >= 2 ? "bg-primary" : "bg-green-200"
                }`}
              />
            </div>
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-800">
            Reset Your Password
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-center text-secondary">
            Don't worry, it happens to the best of us. We'll help you get
            back into your account in no time.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-secondary">
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-primary" />
              Email Verification
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" />
              Secure Reset
            </span>
            <span className="flex items-center gap-1.5">
              <Lock size={14} className="text-primary" />
              Encrypted
            </span>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-center text-2xl font-bold">
            <span className="text-primary">Fresh</span>
            <span className="text-gray-800">Cart</span>
          </h1>

          {/* ===================== STAGE 1: EMAIL ===================== */}
          {stage === "email" && (
            <>
              <h2 className="mt-4 text-center text-xl font-bold text-gray-800">
                Forgot Password?
              </h2>
              <p className="mt-1 text-center text-sm text-secondary">
                No worries, we'll send you a reset code
              </p>

              <StepIndicator active={0} />

              <form
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                noValidate
                className="mt-6 flex flex-col gap-2"
              >
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 pl-10"
                    {...emailForm.register("email")}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {emailForm.formState.errors.email.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 h-12 rounded-full bg-primary text-base font-semibold hover:opacity-90"
                >
                  {submitting ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>

              <Link
                href="/login"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft size={14} />
                Back to Sign In
              </Link>

              <div className="my-6 border-t border-gray-100" />

              <p className="text-center text-sm text-secondary">
                Remember your password?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </>
          )}

          {/* ===================== STAGE 2: RESET CODE + NEW PASSWORD ===================== */}
          {stage === "reset" && (
            <>
              <h2 className="mt-4 text-center text-xl font-bold text-gray-800">
                Create New Password
              </h2>
              <p className="mt-1 text-center text-sm text-secondary">
                Your new password must be different from previous passwords
              </p>

              <StepIndicator active={1} />

              <form
                onSubmit={resetForm.handleSubmit(onSubmitReset)}
                noValidate
                className="mt-6 flex flex-col gap-4"
              >
                {/* Reset code */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="resetCode">Reset Code</Label>
                  <div className="relative">
                    <KeyRound
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="resetCode"
                      placeholder="Enter the code sent to your email"
                      className="h-12 pl-10"
                      {...resetForm.register("resetCode")}
                    />
                  </div>
                  {resetForm.formState.errors.resetCode && (
                    <p className="text-sm text-red-500">
                      {resetForm.formState.errors.resetCode.message}
                    </p>
                  )}
                </div>

                {/* New password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="h-12 pl-10 pr-10"
                      {...resetForm.register("newPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {resetForm.formState.errors.newPassword && (
                    <p className="text-sm text-red-500">
                      {resetForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
                    />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="h-12 pl-10 pr-10"
                      {...resetForm.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {resetForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {resetForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 h-12 rounded-full bg-primary text-base font-semibold hover:opacity-90"
                >
                  {submitting ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </>
          )}

          {/* ===================== STAGE 3: SUCCESS ===================== */}
          {stage === "success" && (
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 size={32} className="text-primary" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                Password Reset!
              </h2>

              <p className="mt-2 max-w-xs text-sm text-secondary">
                Your password has been successfully reset. You can now sign
                in with your new password.
              </p>

              <Link
                href="/login"
                className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-primary font-semibold text-white transition-opacity hover:opacity-90"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----- Step indicator (circles + connecting lines) -----
function StepIndicator({ active }: { active: 0 | 1 }) {
  const steps = [
    { icon: Mail },
    { icon: KeyRound },
    { icon: Lock },
  ];

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {steps.map((step, index) => {
        const isDone = index < active;
        const isActive = index === active;
        const Icon = step.icon;

        return (
          <React.Fragment key={index}>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                isDone || isActive
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-secondary"
              }`}
            >
              {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
            </div>

            {index < steps.length - 1 && (
              <span
                className={`h-0.5 w-10 ${
                  index < active ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
