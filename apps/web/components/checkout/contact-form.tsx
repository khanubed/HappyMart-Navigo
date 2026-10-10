"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Phone, CheckCircle2, AlertCircle, RefreshCw, Loader2, KeyRound } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import type { GuestContact, User } from "@workspace/typescript-config/types"
import { cn } from "@workspace/ui/lib/utils"

const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address / 請輸入有效的電郵地址"),
  phone: z
    .string()
    .regex(/^[456789]\d{7}$/, "Enter an 8-digit Hong Kong mobile number / 請輸入8位數字香港手機號碼"),
})

type ContactFormData = z.infer<typeof contactSchema>

export interface ContactFormProps {
  guestContact: GuestContact
  currentUser: User | null
  onContactVerified: (contact: GuestContact) => void
  isZh?: boolean
  className?: string
}

export function ContactForm({
  guestContact,
  currentUser,
  onContactVerified,
  isZh = false,
  className,
}: ContactFormProps) {
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [otpError, setOtpError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const isAlreadyVerified = guestContact.verified || !!currentUser

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: currentUser?.email || guestContact.email || "",
      phone: currentUser?.phone?.replace("+852", "").trim() || guestContact.phone || "",
    },
  })

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isOtpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    } else if (countdown === 0) {
      setCanResend(true)
    }
    return () => clearTimeout(timer)
  }, [isOtpSent, countdown])

  const onRequestOtp = (data: ContactFormData) => {
    setIsOtpSent(true)
    setOtpError(null)
    setCountdown(60)
    setCanResend(false)
  }

  const handleVerifyOtp = () => {
    setOtpError(null)
    if (!otpCode.trim() || otpCode.length < 6) {
      setOtpError(isZh ? "請輸入6位驗證碼" : "Please enter the 6-digit verification code")
      return
    }

    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      // In development/test mode, 123456 or any 6-digit code is accepted
      if (otpCode === "123456" || otpCode.length === 6) {
        const values = getValues()
        onContactVerified({
          email: values.email,
          phone: values.phone,
          verified: true,
        })
      } else {
        setOtpError(isZh ? "驗證碼不正確，請重試" : "Invalid verification code. Please try again.")
      }
    }, 400)
  }

  if (isAlreadyVerified) {
    const verifiedEmail = currentUser?.email || guestContact.email
    const verifiedPhone = currentUser?.phone || (guestContact.phone ? `+852 ${guestContact.phone}` : "")

    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-foreground block">
                {currentUser ? (isZh ? `已登入：${currentUser.name}` : `Signed In: ${currentUser.name}`) : (isZh ? "聯絡資料已驗證" : "Contact Verified")}
              </span>
              <p className="text-muted-foreground text-xs font-mono">
                {verifiedEmail} • {verifiedPhone}
              </p>
            </div>
          </div>

          {!currentUser && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onContactVerified({ ...guestContact, verified: false })}
              className="text-xs font-bold text-primary hover:underline h-7 px-2"
            >
              {isZh ? "修改" : "Change"}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <form onSubmit={handleSubmit(onRequestOtp)} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Mail className="size-3.5 text-muted-foreground" />
              <span>{isZh ? "電郵地址 (接收訂單確認)" : "Email Address"}</span>
            </label>
            <Input
              type="email"
              placeholder="name@example.hk"
              {...register("email")}
              disabled={isOtpSent}
              className="h-10 text-xs"
            />
            {errors.email && (
              <p className="text-[11px] text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Phone input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Phone className="size-3.5 text-muted-foreground" />
              <span>{isZh ? "香港手機號碼 (接收送貨短訊)" : "Hong Kong Mobile"}</span>
            </label>
            <div className="flex gap-1.5">
              <div className="flex h-10 items-center justify-center rounded-lg border border-border bg-muted/50 px-2.5 text-xs font-mono font-bold text-muted-foreground shrink-0 select-none">
                +852
              </div>
              <Input
                type="tel"
                maxLength={8}
                placeholder="9123 4567"
                {...register("phone")}
                disabled={isOtpSent}
                className="h-10 text-xs font-mono"
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.phone.message}</span>
              </p>
            )}
          </div>
        </div>

        {!isOtpSent && (
          <Button type="submit" size="sm" className="h-9 px-4 text-xs font-bold gap-1.5">
            <KeyRound className="size-3.5" />
            <span>{isZh ? "發送一次性驗證碼 (SMS OTP)" : "Send Verification Code"}</span>
          </Button>
        )}
      </form>

      {/* OTP verification input section */}
      {isOtpSent && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <KeyRound className="size-3.5 text-primary" />
              <span>{isZh ? "輸入 6 位短訊驗證碼" : "Enter 6-digit SMS OTP"}</span>
            </span>
            <span className="text-[11px] text-muted-foreground font-mono bg-muted/80 px-2 py-0.5 rounded">
              Test Code: <strong className="text-primary font-bold">123456</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otpCode}
              onChange={(e) => {
                setOtpCode(e.target.value.replace(/\D/g, ""))
                if (otpError) setOtpError(null)
              }}
              className="h-10 text-base font-mono tracking-widest text-center sm:w-44"
              autoFocus
            />

            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying || otpCode.length < 6}
              className="h-10 text-xs font-bold gap-1.5"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>{isZh ? "驗證中..." : "Verifying..."}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-3.5" />
                  <span>{isZh ? "確認驗證" : "Verify & Continue"}</span>
                </>
              )}
            </Button>

            <button
              type="button"
              onClick={() => {
                setCountdown(60)
                setCanResend(false)
              }}
              disabled={!canResend}
              className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 font-medium inline-flex items-center gap-1 px-2 py-1 transition-colors"
            >
              <RefreshCw className="size-3" />
              <span>
                {canResend
                  ? isZh
                    ? "重新發送"
                    : "Resend Code"
                  : `${isZh ? "重新發送" : "Resend in"} (${countdown}s)`}
              </span>
            </button>
          </div>

          {otpError && (
            <p className="text-[11px] text-destructive flex items-center gap-1 font-medium">
              <AlertCircle className="size-3 shrink-0" />
              <span>{otpError}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
