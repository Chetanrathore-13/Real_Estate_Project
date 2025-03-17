import { useState } from "react"
import { Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    // Reset form or show success message
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column - Rating and Heading */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold">4.9/5.0</span>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">by 700+ customers for 3200+ clients</p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900">
            We&apos;d love to <br /> hear from you
          </h1>

          <div className="hidden lg:block space-y-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <Phone className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="font-medium text-navy-900">Hotline!</p>
                <p className="text-lg font-semibold">+44 1900 68668</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <Mail className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="font-medium text-navy-900">Email</p>
                <p className="text-lg font-semibold">contact@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div>
          <div className="flex flex-col lg:hidden gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <Phone className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="font-medium text-navy-900">Hotline!</p>
                <p className="text-lg font-semibold">+44 1900 68668</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <Mail className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="font-medium text-navy-900">Email</p>
                <p className="text-lg font-semibold">contact@example.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-gray-50 border-0 h-14"
                required
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-gray-50 border-0 h-14"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border-0 h-14"
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-50 border-0 h-14"
                required
              />
            </div>

            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="bg-gray-50 border-0 min-h-[140px]"
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full md:w-auto px-8 py-6 h-auto bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg"
              >
                Submit Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

