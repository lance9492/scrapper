import { departments } from "@/lib/data/company-structure"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          Get in touch with our team for any inquiries or support needs.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        {/* Contact Form */}
        <Card className="p-6">
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <select className="w-full p-2 rounded-md border">
                {departments.map((dept) => (
                  <option key={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </Card>

        {/* Departments */}
        <div className="space-y-4">
          {departments.map((dept) => (
            <Card key={dept.name} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{dept.name}</h3>
              </div>
              {dept.members.map((member) => (
                <div key={member.email} className="text-sm space-y-1 mb-3 last:mb-0">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-muted-foreground">{member.position}</div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                      {member.phone}
                    </a>
                  </div>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}