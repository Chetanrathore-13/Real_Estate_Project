
import Link from "next/link"
import { Calendar } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function BlogArticles() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a5e]">Recent News & Articles</h2>
          <p className="text-muted-foreground text-lg">Read from the Blog</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Article 1 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-17%20155628-CIsnDsSRAyWrYnavuMM3OQVAPS1EJt.png"
                alt="Modern apartment backyard"
                width={500}
                height={300}
                className="w-full h-[220px] object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">MY HOME</span>
            </div>
            <CardContent className="pt-6 pb-2">
              <div className="flex items-center text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">July 24, 2020</span>
              </div>
              <h3 className="text-xl font-bold text-[#0a0a5e] mb-2">Modern apartment adjacent</h3>
              <p className="text-muted-foreground text-sm">
                Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec.
                Porta nibh
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-[#0a0a5e] font-semibold hover:underline">
                Read More
              </Link>
            </CardFooter>
          </Card>

          {/* Article 2 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-17%20155628-CIsnDsSRAyWrYnavuMM3OQVAPS1EJt.png"
                alt="Modern living room with fireplace"
                width={500}
                height={300}
                className="w-full h-[220px] object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">MY HOME</span>
            </div>
            <CardContent className="pt-6 pb-2">
              <div className="flex items-center text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">July 2, 2020</span>
              </div>
              <h3 className="text-xl font-bold text-[#0a0a5e] mb-2">We are Offering the Best RED</h3>
              <p className="text-muted-foreground text-sm">
                Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec.
                Porta nibh
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-[#0a0a5e] font-semibold hover:underline">
                Read More
              </Link>
            </CardFooter>
          </Card>

          {/* Article 3 */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-17%20155628-CIsnDsSRAyWrYnavuMM3OQVAPS1EJt.png"
                alt="Modern wooden and metal house"
                width={500}
                height={300}
                className="w-full h-[220px] object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-black text-white text-xs font-bold px-3 py-1">
                REAL HOMES
              </span>
            </div>
            <CardContent className="pt-6 pb-2">
              <div className="flex items-center text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">June 9, 2020</span>
              </div>
              <h3 className="text-xl font-bold text-[#f26522] mb-2">Architects design a Resort</h3>
              <p className="text-muted-foreground text-sm">
                Massa tempor nec feugiat nisl pretium. Egestas fringilla phasellus faucibus scelerisque eleifend donec.
                Porta nibh
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="text-[#0a0a5e] font-semibold hover:underline">
                Read More
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}


