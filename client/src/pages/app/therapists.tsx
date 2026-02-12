import { AppLayout } from "./layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Star, Clock, CalendarCheck } from "lucide-react";

const therapists = [
  {
    id: "1",
    name: "Mei Lin",
    role: "Senior Therapist",
    specialties: ["Facial", "Bridal Makeup", "Hair Styling"],
    rating: 4.9,
    todayBookings: 3,
    weeklyHours: 38,
    status: "available",
    initials: "ML",
  },
  {
    id: "2",
    name: "Priya Devi",
    role: "Massage Therapist",
    specialties: ["Body Massage", "Aromatherapy", "Scalp Treatment"],
    rating: 4.8,
    todayBookings: 2,
    weeklyHours: 35,
    status: "busy",
    initials: "PD",
  },
  {
    id: "3",
    name: "Suki Tan",
    role: "Nail Artist",
    specialties: ["Gel Nails", "Nail Art", "Manicure", "Pedicure"],
    rating: 4.7,
    todayBookings: 4,
    weeklyHours: 40,
    status: "available",
    initials: "ST",
  },
  {
    id: "4",
    name: "Diana Lee",
    role: "Junior Therapist",
    specialties: ["Facial", "Waxing"],
    rating: 4.5,
    todayBookings: 1,
    weeklyHours: 28,
    status: "off",
    initials: "DL",
  },
  {
    id: "5",
    name: "Anis Rahman",
    role: "Spa Specialist",
    specialties: ["Spa Package", "Body Scrub", "Hot Stone"],
    rating: 4.9,
    todayBookings: 2,
    weeklyHours: 36,
    status: "busy",
    initials: "AR",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "available": return <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Available</Badge>;
    case "busy": return <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">In Session</Badge>;
    case "off": return <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">Day Off</Badge>;
    default: return null;
  }
}

export default function TherapistsPage() {
  return (
    <AppLayout title="Therapist Management">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{therapists.length} therapists on your team</p>
          <Button data-testid="button-add-therapist">
            <Plus className="h-4 w-4 mr-2" />
            Add Therapist
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {therapists.map((t) => (
            <Card key={t.id} className="hover-elevate overflow-visible cursor-pointer" data-testid={`card-therapist-${t.id}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12" data-testid={`avatar-therapist-${t.id}`}>
                    <AvatarFallback className="bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium">{t.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm" data-testid={`text-therapist-name-${t.id}`}>{t.name}</h3>
                      {getStatusBadge(t.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.specialties.map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] px-1.5 py-0">{s}</Badge>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-0.5">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span className="text-sm font-bold">{t.rating}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <CalendarCheck className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{t.todayBookings}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Today</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-bold">{t.weeklyHours}h</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
