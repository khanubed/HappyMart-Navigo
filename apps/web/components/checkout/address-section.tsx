"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MapPin, Plus, Check, CheckCircle2, AlertCircle, Home, Building2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import type { HongKongAddress } from "@workspace/typescript-config/types"
import { hongKongDistricts } from "@workspace/mock-data"
import { cn } from "@workspace/ui/lib/utils"

const addressSchema = z.object({
  contactName: z.string().min(2, "Recipient name is required / 請輸入收件人姓名"),
  contactPhone: z
    .string()
    .regex(/^[456789]\d{7}$/, "Enter an 8-digit Hong Kong mobile number / 請輸入8位數字香港手機號碼"),
  region: z.enum(["Hong Kong Island", "Kowloon", "New Territories", "Outlying Islands"]),
  district: z.string().min(1, "Please select a district / 請選擇所屬地區"),
  building: z.string().min(2, "Building name is required / 請輸入大廈名稱"),
  floor: z.string().min(1, "Floor is required / 請輸入樓層"),
  unit: z.string().min(1, "Flat/Unit is required / 請輸入室/單位號碼"),
  streetAddress: z.string().optional(),
})

type AddressFormData = z.infer<typeof addressSchema>

export interface AddressSectionProps {
  selectedAddress: HongKongAddress | null
  onAddressSelect: (address: HongKongAddress) => void
  isZh?: boolean
  className?: string
}

export function AddressSection({
  selectedAddress,
  onAddressSelect,
  isZh = false,
  className,
}: AddressSectionProps) {
  const [isAddingNew, setIsAddingNew] = useState(false)

  // Demo default address
  const defaultSavedAddresses: HongKongAddress[] = [
    {
      id: "addr-default-hk-1",
      contactName: "Anil Sharma",
      contactPhone: "+852 9123 4567",
      region: "Hong Kong Island",
      district: "Wan Chai",
      zone: "Wan Chai",
      building: "Hennessy Court",
      floor: "18/F",
      unit: "Flat B",
      isDefault: true,
    },
    {
      id: "addr-kowloon-2",
      contactName: "Anil Sharma",
      contactPhone: "+852 9123 4567",
      region: "Kowloon",
      district: "Tsim Sha Tsui",
      zone: "Yau Tsim Mong",
      building: "Chungking Mansions",
      floor: "7/F",
      unit: "Room 702",
      isDefault: false,
    },
  ]

  const [savedAddresses, setSavedAddresses] = useState<HongKongAddress[]>(defaultSavedAddresses)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      contactName: selectedAddress?.contactName || "Anil Sharma",
      contactPhone: selectedAddress?.contactPhone?.replace("+852", "").trim() || "91234567",
      region: selectedAddress?.region || "Hong Kong Island",
      district: selectedAddress?.district || "Wan Chai",
      building: selectedAddress?.building || "",
      floor: selectedAddress?.floor || "",
      unit: selectedAddress?.unit || "",
      streetAddress: "",
    },
  })

  const selectedRegion = watch("region")

  // Filter districts based on selected region
  const filteredDistricts = hongKongDistricts.filter(
    (d) => d.regionEn.toLowerCase() === selectedRegion.toLowerCase()
  )

  const onSaveNewAddress = (data: AddressFormData) => {
    const newAddress: HongKongAddress = {
      id: `addr-hk-${Date.now()}`,
      contactName: data.contactName,
      contactPhone: `+852 ${data.contactPhone}`,
      region: data.region,
      district: data.district,
      building: data.building,
      floor: data.floor,
      unit: data.unit,
      isDefault: false,
    }

    setSavedAddresses((prev) => [newAddress, ...prev])
    onAddressSelect(newAddress)
    setIsAddingNew(false)
    reset()
  }

  return (
    <div className={cn("space-y-4", className)}>
      {!isAddingNew ? (
        <div className="space-y-3">
          {/* Saved addresses grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedAddresses.map((addr) => {
              const isSelected = selectedAddress?.id === addr.id

              return (
                <div
                  key={addr.id}
                  onClick={() => onAddressSelect(addr)}
                  className={cn(
                    "relative flex flex-col justify-between p-3.5 rounded-xl border text-xs cursor-pointer transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-2xs ring-1 ring-primary"
                      : "border-border hover:border-primary/40 bg-card"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-primary" />
                        <span>{addr.contactName}</span>
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {isZh ? "預設地址" : "Default"}
                        </span>
                      )}
                    </div>

                    <p className="font-mono text-muted-foreground text-[11px]">
                      {addr.contactPhone}
                    </p>

                    <p className="text-foreground leading-snug pt-1">
                      {addr.unit}, {addr.floor}, {addr.building}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {addr.district}, {addr.region}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-border/50 mt-2">
                    <span className="text-[11px] font-medium text-primary">
                      {isSelected ? (isZh ? "✓ 已選擇此地址" : "✓ Selected") : (isZh ? "點擊選擇" : "Click to select")}
                    </span>

                    {isSelected && (
                      <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="size-3" />
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNew(true)}
            className="h-9 text-xs font-bold gap-1.5"
          >
            <Plus className="size-3.5" />
            <span>{isZh ? "新增其他香港配送地址" : "Add New Hong Kong Address"}</span>
          </Button>
        </div>
      ) : (
        // Add new address form
        <form onSubmit={handleSubmit(onSaveNewAddress)} className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              <span>{isZh ? "新增配送地址 (香港境內)" : "New Hong Kong Delivery Address"}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-muted-foreground hover:text-foreground font-medium underline"
            >
              {isZh ? "取消" : "Cancel"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Recipient name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "收件人姓名 *" : "Recipient Full Name *"}
              </label>
              <Input
                placeholder="e.g. Anil Sharma"
                {...register("contactName")}
                className="h-9 text-xs"
              />
              {errors.contactName && (
                <p className="text-[11px] text-destructive">{errors.contactName.message}</p>
              )}
            </div>

            {/* Mobile phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "收件人手機號碼 *" : "Hong Kong Mobile Phone *"}
              </label>
              <div className="flex gap-1.5">
                <span className="flex h-9 items-center justify-center rounded-lg border border-border bg-muted px-2 text-xs font-mono font-bold text-muted-foreground shrink-0">
                  +852
                </span>
                <Input
                  type="tel"
                  maxLength={8}
                  placeholder="9123 4567"
                  {...register("contactPhone")}
                  className="h-9 text-xs font-mono"
                />
              </div>
              {errors.contactPhone && (
                <p className="text-[11px] text-destructive">{errors.contactPhone.message}</p>
              )}
            </div>

            {/* Region select */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "區域 *" : "Region *"}
              </label>
              <select
                {...register("region")}
                className="w-full h-9 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Hong Kong Island">Hong Kong Island (香港島)</option>
                <option value="Kowloon">Kowloon (九龍)</option>
                <option value="New Territories">New Territories (新界)</option>
                <option value="Outlying Islands">Outlying Islands (離島)</option>
              </select>
            </div>

            {/* District select */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "地區 / 分區 *" : "District *"}
              </label>
              <select
                {...register("district")}
                className="w-full h-9 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.nameEn}>
                    {d.nameEn} ({d.nameZh})
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-[11px] text-destructive">{errors.district.message}</p>
              )}
            </div>

            {/* Building name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "大廈名稱 / 屋苑 *" : "Building Name / Estate *"}
              </label>
              <Input
                placeholder="e.g. Hennessy Court / Chungking Mansions"
                {...register("building")}
                className="h-9 text-xs"
              />
              {errors.building && (
                <p className="text-[11px] text-destructive">{errors.building.message}</p>
              )}
            </div>

            {/* Floor */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "樓層 *" : "Floor *"}
              </label>
              <Input
                placeholder="e.g. 18/F"
                {...register("floor")}
                className="h-9 text-xs"
              />
              {errors.floor && (
                <p className="text-[11px] text-destructive">{errors.floor.message}</p>
              )}
            </div>

            {/* Flat / Unit */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">
                {isZh ? "室 / 單位 *" : "Flat / Unit *"}
              </label>
              <Input
                placeholder="e.g. Flat B / Room 702"
                {...register("unit")}
                className="h-9 text-xs"
              />
              {errors.unit && (
                <p className="text-[11px] text-destructive">{errors.unit.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" size="sm" className="h-9 px-4 text-xs font-bold">
              {isZh ? "儲存並使用此地址" : "Save & Use Address"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingNew(false)}
              className="h-9 text-xs"
            >
              {isZh ? "取消" : "Cancel"}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
