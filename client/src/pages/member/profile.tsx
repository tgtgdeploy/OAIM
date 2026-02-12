import { MemberLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Phone, MapPin, Mail, Save, Star } from "lucide-react";

export default function MemberProfile() {
  return (
    <MemberLayout title="My Profile">
      <div className="p-4 md:p-6 space-y-4 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16" data-testid="avatar-profile">
                <AvatarFallback className="text-lg bg-primary/10 text-primary">SA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold" data-testid="text-profile-name">Sarah Ahmad</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="text-xs">
                    <Star className="h-3 w-3 mr-1" />Gold Member
                  </Badge>
                  <span className="text-xs text-muted-foreground">Member since Jan 2026</span>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" defaultValue="Sarah Ahmad" className="pl-9" data-testid="input-profile-name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (WhatsApp)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" defaultValue="+60 12-345 6789" className="pl-9" data-testid="input-profile-phone" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue="sarah@example.com" className="pl-9" data-testid="input-profile-email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="address" defaultValue="123 Jalan Bukit Bintang, 55100 KL" className="pl-9" data-testid="input-profile-address" />
                </div>
              </div>

              <Button className="mt-2" data-testid="button-save-profile">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
}
