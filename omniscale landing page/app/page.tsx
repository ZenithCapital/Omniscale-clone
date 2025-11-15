"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Users, Zap, Target, Video, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ConsultCoastLanding() {
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [videoUnlocked, setVideoUnlocked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  })

  const countryCodes = [
    { emoji: "🇦🇩", dial_code: "+376" },
    { emoji: "🇦🇪", dial_code: "+971" },
    { emoji: "🇦🇫", dial_code: "+93" },
    { emoji: "🇦🇬", dial_code: "+1268" },
    { emoji: "🇦🇮", dial_code: "+1264" },
    { emoji: "🇦🇱", dial_code: "+355" },
    { emoji: "🇦🇲", dial_code: "+374" },
    { emoji: "🇦🇴", dial_code: "+244" },
    { emoji: "🇦🇶", dial_code: "+672" },
    { emoji: "🇦🇷", dial_code: "+54" },
    { emoji: "🇦🇸", dial_code: "+1684" },
    { emoji: "🇦🇹", dial_code: "+43" },
    { emoji: "🇦🇺", dial_code: "+61" },
    { emoji: "🇦🇼", dial_code: "+297" },
    { emoji: "🇦🇽", dial_code: "+358" },
    { emoji: "🇦🇿", dial_code: "+994" },
    { emoji: "🇧🇦", dial_code: "+387" },
    { emoji: "🇧🇧", dial_code: "+1246" },
    { emoji: "🇧🇩", dial_code: "+880" },
    { emoji: "🇧🇪", dial_code: "+32" },
    { emoji: "🇧🇫", dial_code: "+226" },
    { emoji: "🇧🇬", dial_code: "+359" },
    { emoji: "🇧🇭", dial_code: "+973" },
    { emoji: "🇧🇮", dial_code: "+257" },
    { emoji: "🇧🇯", dial_code: "+229" },
    { emoji: "🇧🇱", dial_code: "+590" },
    { emoji: "🇧🇲", dial_code: "+1441" },
    { emoji: "🇧🇳", dial_code: "+673" },
    { emoji: "🇧🇴", dial_code: "+591" },
    { emoji: "🇧🇷", dial_code: "+55" },
    { emoji: "🇧🇸", dial_code: "+1242" },
    { emoji: "🇧🇹", dial_code: "+975" },
    { emoji: "🇧🇼", dial_code: "+267" },
    { emoji: "🇧🇾", dial_code: "+375" },
    { emoji: "🇧🇿", dial_code: "+501" },
    { emoji: "🇨🇦", dial_code: "+1" },
    { emoji: "🇨🇨", dial_code: "+61" },
    { emoji: "🇨🇩", dial_code: "+243" },
    { emoji: "🇨🇫", dial_code: "+236" },
    { emoji: "🇨🇬", dial_code: "+242" },
    { emoji: "🇨🇭", dial_code: "+41" },
    { emoji: "🇨🇮", dial_code: "+225" },
    { emoji: "🇨🇰", dial_code: "+682" },
    { emoji: "🇨🇱", dial_code: "+56" },
    { emoji: "🇨🇲", dial_code: "+237" },
    { emoji: "🇨🇳", dial_code: "+86" },
    { emoji: "🇨🇴", dial_code: "+57" },
    { emoji: "🇨🇷", dial_code: "+506" },
    { emoji: "🇨🇺", dial_code: "+53" },
    { emoji: "🇨🇻", dial_code: "+238" },
    { emoji: "🇨🇽", dial_code: "+61" },
    { emoji: "🇨🇾", dial_code: "+357" },
    { emoji: "🇨🇿", dial_code: "+420" },
    { emoji: "🇩🇪", dial_code: "+49" },
    { emoji: "🇩🇯", dial_code: "+253" },
    { emoji: "🇩🇰", dial_code: "+45" },
    { emoji: "🇩🇲", dial_code: "+1767" },
    { emoji: "🇩🇴", dial_code: "+1849" },
    { emoji: "🇩🇿", dial_code: "+213" },
    { emoji: "🇪🇨", dial_code: "+593" },
    { emoji: "🇪🇪", dial_code: "+372" },
    { emoji: "🇪🇬", dial_code: "+20" },
    { emoji: "🇪🇷", dial_code: "+291" },
    { emoji: "🇪🇸", dial_code: "+34" },
    { emoji: "🇪🇹", dial_code: "+251" },
    { emoji: "🇫🇮", dial_code: "+358" },
    { emoji: "🇫🇯", dial_code: "+679" },
    { emoji: "🇫🇰", dial_code: "+500" },
    { emoji: "🇫🇲", dial_code: "+691" },
    { emoji: "🇫🇴", dial_code: "+298" },
    { emoji: "🇫🇷", dial_code: "+33" },
    { emoji: "🇬🇦", dial_code: "+241" },
    { emoji: "🇬🇧", dial_code: "+44" },
    { emoji: "🇬🇩", dial_code: "+1473" },
    { emoji: "🇬🇪", dial_code: "+995" },
    { emoji: "🇬🇫", dial_code: "+594" },
    { emoji: "🇬🇬", dial_code: "+44" },
    { emoji: "🇬🇭", dial_code: "+233" },
    { emoji: "🇬🇮", dial_code: "+350" },
    { emoji: "🇬🇱", dial_code: "+299" },
    { emoji: "🇬🇲", dial_code: "+220" },
    { emoji: "🇬🇳", dial_code: "+224" },
    { emoji: "🇬🇵", dial_code: "+590" },
    { emoji: "🇬🇶", dial_code: "+240" },
    { emoji: "🇬🇷", dial_code: "+30" },
    { emoji: "🇬🇸", dial_code: "+500" },
    { emoji: "🇬🇹", dial_code: "+502" },
    { emoji: "🇬🇺", dial_code: "+1671" },
    { emoji: "🇬🇼", dial_code: "+245" },
    { emoji: "🇬🇾", dial_code: "+595" },
    { emoji: "🇭🇰", dial_code: "+852" },
    { emoji: "🇭🇳", dial_code: "+504" },
    { emoji: "🇭🇷", dial_code: "+385" },
    { emoji: "🇭🇹", dial_code: "+509" },
    { emoji: "🇭🇺", dial_code: "+36" },
    { emoji: "🇮🇩", dial_code: "+62" },
    { emoji: "🇮🇪", dial_code: "+353" },
    { emoji: "🇮🇱", dial_code: "+972" },
    { emoji: "🇮🇲", dial_code: "+44" },
    { emoji: "🇮🇳", dial_code: "+91" },
    { emoji: "🇮🇴", dial_code: "+246" },
    { emoji: "🇮🇶", dial_code: "+964" },
    { emoji: "🇮🇷", dial_code: "+98" },
    { emoji: "🇮🇸", dial_code: "+354" },
    { emoji: "🇮🇹", dial_code: "+39" },
    { emoji: "🇯🇪", dial_code: "+44" },
    { emoji: "🇯🇲", dial_code: "+1876" },
    { emoji: "🇯🇴", dial_code: "+962" },
    { emoji: "🇯🇵", dial_code: "+81" },
    { emoji: "🇰🇪", dial_code: "+254" },
    { emoji: "🇰🇬", dial_code: "+996" },
    { emoji: "🇰🇭", dial_code: "+855" },
    { emoji: "🇰🇮", dial_code: "+686" },
    { emoji: "🇰🇲", dial_code: "+269" },
    { emoji: "🇰🇳", dial_code: "+1869" },
    { emoji: "🇰🇵", dial_code: "+850" },
    { emoji: "🇰🇷", dial_code: "+82" },
    { emoji: "🇰🇼", dial_code: "+965" },
    { emoji: "🇰🇾", dial_code: "+ 345" },
    { emoji: "🇰🇿", dial_code: "+77" },
    { emoji: "🇱🇦", dial_code: "+856" },
    { emoji: "🇱🇧", dial_code: "+961" },
    { emoji: "🇱🇨", dial_code: "+1758" },
    { emoji: "🇱🇮", dial_code: "+423" },
    { emoji: "🇱🇰", dial_code: "+94" },
    { emoji: "🇱🇷", dial_code: "+231" },
    { emoji: "🇱🇸", dial_code: "+266" },
    { emoji: "🇱🇹", dial_code: "+370" },
    { emoji: "🇱🇺", dial_code: "+352" },
    { emoji: "🇱🇻", dial_code: "+371" },
    { emoji: "🇱🇾", dial_code: "+218" },
    { emoji: "🇲🇦", dial_code: "+212" },
    { emoji: "🇲🇨", dial_code: "+377" },
    { emoji: "🇲🇩", dial_code: "+373" },
    { emoji: "🇲🇪", dial_code: "+382" },
    { emoji: "🇲🇫", dial_code: "+590" },
    { emoji: "🇲🇬", dial_code: "+261" },
    { emoji: "🇲🇭", dial_code: "+692" },
    { emoji: "🇲🇰", dial_code: "+389" },
    { emoji: "🇲🇱", dial_code: "+223" },
    { emoji: "🇲🇲", dial_code: "+95" },
    { emoji: "🇲🇳", dial_code: "+976" },
    { emoji: "🇲🇴", dial_code: "+853" },
    { emoji: "🇲🇵", dial_code: "+1670" },
    { emoji: "🇲🇶", dial_code: "+596" },
    { emoji: "🇲🇷", dial_code: "+222" },
    { emoji: "🇲🇸", dial_code: "+1664" },
    { emoji: "🇲🇹", dial_code: "+356" },
    { emoji: "🇲🇺", dial_code: "+230" },
    { emoji: "🇲🇻", dial_code: "+960" },
    { emoji: "🇲🇼", dial_code: "+265" },
    { emoji: "🇲🇽", dial_code: "+52" },
    { emoji: "🇲🇾", dial_code: "+60" },
    { emoji: "🇲🇿", dial_code: "+258" },
    { emoji: "🇳🇦", dial_code: "+264" },
    { emoji: "🇳🇨", dial_code: "+687" },
    { emoji: "🇳🇪", dial_code: "+227" },
    { emoji: "🇳🇫", dial_code: "+672" },
    { emoji: "🇳🇬", dial_code: "+234" },
    { emoji: "🇳🇮", dial_code: "+505" },
    { emoji: "🇳🇱", dial_code: "+31" },
    { emoji: "🇳🇴", dial_code: "+47" },
    { emoji: "🇳🇵", dial_code: "+977" },
    { emoji: "🇳🇷", dial_code: "+674" },
    { emoji: "🇳🇺", dial_code: "+683" },
    { emoji: "🇳🇿", dial_code: "+64" },
    { emoji: "🇴🇲", dial_code: "+968" },
    { emoji: "🇵🇦", dial_code: "+507" },
    { emoji: "🇵🇪", dial_code: "+51" },
    { emoji: "🇵🇫", dial_code: "+689" },
    { emoji: "🇵🇬", dial_code: "+675" },
    { emoji: "🇵🇭", dial_code: "+63" },
    { emoji: "🇵🇰", dial_code: "+92" },
    { emoji: "🇵🇱", dial_code: "+48" },
    { emoji: "🇵🇲", dial_code: "+508" },
    { emoji: "🇵🇳", dial_code: "+872" },
    { emoji: "🇵🇷", dial_code: "+1939" },
    { emoji: "🇵🇸", dial_code: "+970" },
    { emoji: "🇵🇹", dial_code: "+351" },
    { emoji: "🇵🇼", dial_code: "+680" },
    { emoji: "🇵🇾", dial_code: "+595" },
    { emoji: "🇶🇦", dial_code: "+974" },
    { emoji: "🇷🇪", dial_code: "+262" },
    { emoji: "🇷🇴", dial_code: "+40" },
    { emoji: "🇷🇸", dial_code: "+381" },
    { emoji: "🇷🇺", dial_code: "+7" },
    { emoji: "🇷🇼", dial_code: "+250" },
    { emoji: "🇸🇦", dial_code: "+966" },
    { emoji: "🇸🇧", dial_code: "+677" },
    { emoji: "🇸🇨", dial_code: "+248" },
    { emoji: "🇸🇩", dial_code: "+249" },
    { emoji: "🇸🇪", dial_code: "+46" },
    { emoji: "🇸🇬", dial_code: "+65" },
    { emoji: "🇸🇭", dial_code: "+290" },
    { emoji: "🇸🇮", dial_code: "+386" },
    { emoji: "🇸🇯", dial_code: "+47" },
    { emoji: "🇸🇰", dial_code: "+421" },
    { emoji: "🇸🇱", dial_code: "+232" },
    { emoji: "🇸🇲", dial_code: "+378" },
    { emoji: "🇸🇳", dial_code: "+221" },
    { emoji: "🇸🇴", dial_code: "+252" },
    { emoji: "🇸🇷", dial_code: "+597" },
    { emoji: "🇸🇸", dial_code: "+211" },
    { emoji: "🇸🇹", dial_code: "+239" },
    { emoji: "🇸🇻", dial_code: "+503" },
    { emoji: "🇸🇾", dial_code: "+963" },
    { emoji: "🇸🇿", dial_code: "+268" },
    { emoji: "🇹🇨", dial_code: "+1649" },
    { emoji: "🇹🇩", dial_code: "+235" },
    { emoji: "🇹🇬", dial_code: "+228" },
    { emoji: "🇹🇭", dial_code: "+66" },
    { emoji: "🇹🇯", dial_code: "+992" },
    { emoji: "🇹🇰", dial_code: "+690" },
    { emoji: "🇹🇱", dial_code: "+670" },
    { emoji: "🇹🇲", dial_code: "+993" },
    { emoji: "🇹🇳", dial_code: "+216" },
    { emoji: "🇹🇴", dial_code: "+676" },
    { emoji: "🇹🇷", dial_code: "+90" },
    { emoji: "🇹🇹", dial_code: "+1868" },
    { emoji: "🇹🇻", dial_code: "+688" },
    { emoji: "🇹🇼", dial_code: "+886" },
    { emoji: "🇹🇿", dial_code: "+255" },
    { emoji: "🇺🇦", dial_code: "+380" },
    { emoji: "🇺🇬", dial_code: "+256" },
    { emoji: "🇺🇸", dial_code: "+1" },
    { emoji: "🇺🇾", dial_code: "+598" },
    { emoji: "🇺🇿", dial_code: "+998" },
    { emoji: "🇻🇦", dial_code: "+379" },
    { emoji: "🇻🇨", dial_code: "+1784" },
    { emoji: "🇻🇪", dial_code: "+58" },
    { emoji: "🇻🇬", dial_code: "+1284" },
    { emoji: "🇻🇮", dial_code: "+1340" },
    { emoji: "🇻🇳", dial_code: "+84" },
    { emoji: "🇻🇺", dial_code: "+678" },
    { emoji: "🇼🇫", dial_code: "+681" },
    { emoji: "🇼🇸", dial_code: "+685" },
    { emoji: "🇾🇪", dial_code: "+967" },
    { emoji: "🇾🇹", dial_code: "+262" },
    { emoji: "🇿🇦", dial_code: "+27" },
    { emoji: "🇿🇲", dial_code: "+260" },
    { emoji: "🇿🇼", dial_code: "+263" },
  ]

  const handleVideoClick = () => {
    if (!videoUnlocked) {
      setShowVideoForm(true)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) return

    setIsSubmitting(true)

    // Simulate a brief loading state for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Unlock video without sending data anywhere
    setVideoUnlocked(true)
    setShowVideoForm(false)

    // Reset form data
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      countryCode: "+1",
    })

    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
      <header className="px-4 py-4 md:py-6 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src="/consult-coast-logo.png"
            alt="Omniscale"
            width={150}
            height={75}
            className="mx-auto h-12 w-auto md:h-16"
            priority
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            We Scale Coaches & Agencies to <span className="text-white">$65K/Month</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            By Building Their Entire Backend
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white mb-6 max-w-3xl mx-auto px-2">
            Funnels. Content. Setters. Automation. All done-for-you.
          </p>
        </div>
      </section>

      {/* VSL Section */}
      <section className="px-4 py-6 md:py-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 px-2">
            How We Build Your Entire Backend in 90 Days
          </h2>

          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6 md:mb-8 relative">
            {videoUnlocked ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/eTNTkwcmEEk?autoplay=1"
                title="Omniscale Backend System"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center cursor-pointer relative group"
                onClick={handleVideoClick}
              >
                {/* YouTube Thumbnail Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url(https://img.youtube.com/vi/eTNTkwcmEEk/maxresdefault.jpg)",
                  }}
                />
                {/* Faded overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>

                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-200 transition-colors shadow-2xl">
                    <Lock className="w-8 h-8 text-black" />
                  </div>
                  <p className="text-white text-lg font-semibold drop-shadow-lg">Unlock Free Training</p>
                  <p className="text-gray-200 text-sm mt-2 drop-shadow-md">Enter your details to watch</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base md:text-lg text-white mb-6 px-2">
            Osiris breaks down the system that solves the problem of coaches scaling to $65k/mo+.
          </p>

          {videoUnlocked ? (
            <Link href="https://glsg2kv5wb8.typeform.com/to/zKUgh7aF" target="_blank">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-200 text-black font-bold w-full sm:w-auto px-6 py-4 text-sm sm:text-base"
              >
                Apply for a Discovery Call - Limited Spots Left
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={handleVideoClick}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold w-full sm:w-auto px-6 py-4 text-sm sm:text-base cursor-not-allowed opacity-50"
              disabled
            >
              <Lock className="w-4 h-4 mr-2" />
              Unlock Video to Continue
            </Button>
          )}
        </div>
      </section>

      {/* Video Form Dialog */}
      <Dialog open={showVideoForm} onOpenChange={setShowVideoForm}>
        <DialogContent className="sm:max-w-md bg-black border-white text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-white">Unlock Your Free Training</DialogTitle>
            <p className="text-center text-gray-300 text-sm mt-2">
              Enter your details to watch the full backend system breakdown
            </p>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="fullName" className="text-white">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">
                Phone Number *
              </Label>
              <div className="flex gap-2">
                <Select value={formData.countryCode} onValueChange={(value) => handleInputChange("countryCode", value)}>
                  <SelectTrigger className="w-24 bg-gray-900 border-gray-700 text-white focus:border-white">
                    <SelectValue>
                      <span className="flex items-center gap-1">
                        <span>{countryCodes.find((c) => c.dial_code === formData.countryCode)?.emoji}</span>
                        <span className="text-xs">{formData.countryCode}</span>
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white max-h-48">
                    {countryCodes.map((country, index) => (
                      <SelectItem key={index} value={country.dial_code} className="hover:bg-gray-800">
                        <span className="flex items-center gap-2">
                          <span>{country.emoji}</span>
                          <span className="text-sm">{country.dial_code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3"
              disabled={!formData.fullName || !formData.email || !formData.phone || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Unlock Video Now"}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Your information is secure and will only be used to provide you with valuable content.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Rest of the page content - only shows if video is unlocked */}
      {videoUnlocked && (
        <>
          {/* Problem → Solution Section */}
          <section className="px-4 py-16 md:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white">Your Problem:</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-base md:text-lg">Inconsistent lead flow</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-base md:text-lg">Doing everything manually</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-base md:text-lg">Low show-up and conversion rates</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-base md:text-lg">No backend = no scale</p>
                    </div>
                  </div>
                </div>

                <div className="order-2">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white">Our Solution:</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white mt-1 flex-shrink-0" />
                      <p className="text-base md:text-lg">Done-for-you content + funnels</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white mt-1 flex-shrink-0" />
                      <p className="text-base md:text-lg">A trained sales team that books & closes</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white mt-1 flex-shrink-0" />
                      <p className="text-base md:text-lg">Automation that works 24/7</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white mt-1 flex-shrink-0" />
                      <p className="text-base md:text-lg">Systems that free your time & scale revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Client Testimonials */}
          <section className="px-4 py-16 md:py-20 bg-black">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
                  Client Testimonials
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <Image
                    src="/testimonials/sophie.jpeg"
                    alt="Sophie's testimonial - $65,342.41 gross volume"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="/testimonials/matt.jpeg"
                    alt="Matt's testimonial - $151.57K for the month"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src="/testimonials/johnny.jpeg"
                    alt="Johnny's testimonial - $122,365.31 gross volume"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4-Phase System */}
          <section className="px-4 py-16 md:py-20 bg-black">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
                  The 4-Phase Backend System
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white px-2">
                  Everything you need to scale to $65K/month and beyond
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <Card className="bg-black border-white p-4 md:p-6">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <Target className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4" />
                      <Badge className="bg-white text-black mb-3 md:mb-4 text-xs md:text-sm">Phase 1</Badge>
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Offer Optimization</h3>
                      <ul className="text-xs md:text-sm text-white space-y-1 md:space-y-2 text-left">
                        <li>Refine LTO → MTO → HTO</li>
                        <li>Clarify niche & messaging</li>
                        <li>Personal brand positioning</li>
                        <li>Profile optimization</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white p-4 md:p-6">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <Video className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4" />
                      <Badge className="bg-white text-black mb-3 md:mb-4 text-xs md:text-sm">Phase 2</Badge>
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Content Engine</h3>
                      <ul className="text-xs md:text-sm text-white space-y-1 md:space-y-2 text-left">
                        <li>30-80 videos/month (DFY)</li>
                        <li>Carousel + story content</li>
                        <li>Multi-platform distribution</li>
                        <li>Performance optimization</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white p-4 md:p-6">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <Zap className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4" />
                      <Badge className="bg-white text-black mb-3 md:mb-4 text-xs md:text-sm">Phase 3</Badge>
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Funnels & Automation</h3>
                      <ul className="text-xs md:text-sm text-white space-y-1 md:space-y-2 text-left">
                        <li>Landing page + VSL</li>
                        <li>Application & calendar</li>
                        <li>Email + DM sequences</li>
                        <li>Lead magnet integration</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-white p-4 md:p-6">
                  <CardContent className="p-0">
                    <div className="text-center">
                      <Users className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-3 md:mb-4" />
                      <Badge className="bg-white text-black mb-3 md:mb-4 text-xs md:text-sm">Phase 4</Badge>
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Sales Infrastructure</h3>
                      <ul className="text-xs md:text-sm text-white space-y-1 md:space-y-2 text-left">
                        <li>Trained appointment setters</li>
                        <li>Optional closer placement</li>
                        <li>CRM setup & management</li>
                        <li>Follow-up automation</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Guarantee Section */}
          <section className="px-4 py-12 md:py-16 bg-white/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 px-2">Our Iron-Clad Guarantee</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-3 md:mb-4 px-2">
                "If you're not at $65K/month profit — we work with you until you are."
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white px-2">
                No extra charges, no fluff, just results.
              </p>
            </div>
          </section>

          {/* Apply Now CTA */}
          <section className="px-4 py-16 md:py-20 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
                Ready to Scale Your Backend?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 px-2">
                Book a discovery call to see if you're a fit for our done-for-you system
              </p>

              <Link href="https://glsg2kv5wb8.typeform.com/to/zKUgh7aF" target="_blank">
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-200 text-black font-bold w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 text-base md:text-xl"
                >
                  Apply for a Discovery Call - Limited Spots Left
                </Button>
              </Link>

              <div className="mt-6 md:mt-8 text-xs md:text-sm text-white">
                <p className="px-2">Application includes questions about:</p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-2 px-2">
                  <span>Your niche & offer</span>
                  <span>Current monthly revenue</span>
                  <span>Biggest challenges</span>
                  <span>Growth goals</span>
                </div>
              </div>
            </div>
          </section>

          {/* Scarcity Section */}
          <section className="px-4 py-12 md:py-16 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white px-2">
                Why You Need to Apply Now
              </h2>
              <div className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg px-2">
                <p>Only accepting 3-4 new clients this month</p>
                <p>Full DFY implementation = high attention + results</p>
                <p>We're scaling fast — apply before next intake closes</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="px-4 py-6 md:py-8 bg-black border-t border-white">
        <div className="max-w-6xl mx-auto text-center">
          <Image
            src="/consult-coast-logo.png"
            alt="Omniscale"
            width={120}
            height={60}
            className="mx-auto mb-3 md:mb-4 h-8 w-auto md:h-10"
          />
          <p className="text-white text-xs md:text-sm">
            © 2025 Omniscale. Founded by Matteo Callahan and Osiris Kessinger.
          </p>
        </div>
      </footer>
    </div>
  )
}
