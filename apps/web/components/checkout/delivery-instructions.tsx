"use client"

import React from "react"
import { Shield, KeyRound, MessageSquareQuote } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"

export interface DeliveryInstructionsProps {
  leaveAtDoor: boolean
  callOnArrival: boolean
  accessCode: string
  notes: string
  onChange: (data: {
    leaveAtDoor?: boolean
    callOnArrival?: boolean
    accessCode?: string
    notes?: string
  }) => void
  isZh?: boolean
  className?: string
}

export function DeliveryInstructions({
  leaveAtDoor,
  callOnArrival,
  accessCode,
  notes,
  onChange,
  isZh = false,
  className,
}: DeliveryInstructionsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Checkboxes row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/80 bg-card hover:border-primary/40 cursor-pointer transition-colors text-xs select-none">
          <input
            type="checkbox"
            checked={leaveAtDoor}
            onChange={(e) => onChange({ leaveAtDoor: e.target.checked })}
            className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary accent-primary"
          />
          <div>
            <span className="font-bold text-foreground block">
              {isZh ? "放在門口 / 管理處" : "Leave at Door / Front Desk"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isZh
                ? "如無人應門，車手可將貨品安全放置於家門口"
                : "Courier can place parcels safely outside if unattended"}
            </span>
          </div>
        </label>

        <label className="flex items-start gap-2.5 p-3 rounded-xl border border-border/80 bg-card hover:border-primary/40 cursor-pointer transition-colors text-xs select-none">
          <input
            type="checkbox"
            checked={callOnArrival}
            onChange={(e) => onChange({ callOnArrival: e.target.checked })}
            className="mt-0.5 size-4 rounded border-border text-primary focus:ring-primary accent-primary"
          />
          <div>
            <span className="font-bold text-foreground block">
              {isZh ? "到達時致電聯絡" : "Call on Arrival"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isZh
                ? "送達大廈前致電收件人確認"
                : "Rider will call your mobile before arriving"}
            </span>
          </div>
        </label>
      </div>

      {/* Building Access Code */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <KeyRound className="size-3.5 text-muted-foreground" />
            <span>{isZh ? "大廈門禁密碼 (選填)" : "Building Access Code / Intercom (Optional)"}</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-normal">
            {isZh ? "僅供配送員查看" : "Confidential for delivery only"}
          </span>
        </label>
        <Input
          type="text"
          placeholder={isZh ? "例如：#1234 或 密碼門禁" : "e.g. Intercom #1234 or Gate code"}
          value={accessCode}
          onChange={(e) => onChange({ accessCode: e.target.value })}
          maxLength={20}
          className="h-9 text-xs max-w-sm"
        />
      </div>

      {/* Delivery Notes Textarea */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MessageSquareQuote className="size-3.5 text-muted-foreground" />
            <span>{isZh ? "其他特別配送指示 (選填)" : "Special Delivery Instructions (Optional)"}</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            {notes.length}/200
          </span>
        </label>
        <textarea
          rows={2}
          maxLength={200}
          placeholder={
            isZh
              ? "例如：按門鐘後請勿大力敲門、送至後樓梯門口等..."
              : "e.g. Ring bell twice, leave with concierge if not home..."
          }
          value={notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full rounded-lg border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>
    </div>
  )
}
