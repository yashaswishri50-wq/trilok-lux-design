import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import logo from "@/assets/trilok-logo.png.asset.json";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [
    { title: "My Stays | Hotel Trilok" },
    { name: "description", content: "Manage your Hotel Trilok guest profile and upcoming reservations." },
    { property: "og:title", content: "My Stays | Hotel Trilok" },
    { property: "og:description", content: "Manage Hotel Trilok guest details and reservations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState({ full_name: (user.user_metadata?.['full_name'] as string | undefined) ?? "", phone: "", preferences: "" });
  const [bookings, setBookings] = useState<Tables<"bookings">[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    void Promise.all([
      supabase.from("profiles").select("full_name, phone, preferences").eq("id", user.id).maybeSingle(),
      supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]).then(([profileResult, bookingResult]) => {
      if (profileResult.data) setProfile(profileResult.data);
      if (bookingResult.data) setBookings(bookingResult.data);
      setLoading(false);
    });
  }, [user.id]);

  return (
    <main className="min-h-screen bg-background px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between gap-4 border-b border-border pb-5">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold"><ArrowLeft className="h-4 w-4" /> Hotel</Link>
          <img src={logo.url} alt="Hotel Trilok" className="h-12 w-auto object-contain mix-blend-screen" />
          <Button variant="outline-gold" size="sm" onClick={async () => { await supabase.auth.signOut(); await navigate({ to: "/auth", replace: true }); }}><LogOut /> Sign out</Button>
        </header>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section>
            <p className="eyebrow">Guest profile</p>
            <h1 className="mt-2 text-4xl">Welcome back</h1>
            <form className="mt-6 space-y-4" onSubmit={async (event) => {
              event.preventDefault();
              const { error } = await supabase.from("profiles").upsert({ id: user.id, ...profile });
              if (error) {
                toast.error(error.message);
                return;
              }
              toast.success("Guest profile saved.");
            }}>
              <label className="block text-xs text-muted-foreground">Email<input className="lux-input mt-1" value={user.email ?? ""} disabled /></label>
              <label className="block text-xs text-muted-foreground">Full name<input className="lux-input mt-1" required value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></label>
              <label className="block text-xs text-muted-foreground">Phone<input className="lux-input mt-1" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
              <label className="block text-xs text-muted-foreground">Stay preferences<textarea className="lux-input mt-1" rows={4} placeholder="Pillows, dietary needs, arrival notes…" value={profile.preferences} onChange={(e) => setProfile({ ...profile, preferences: e.target.value })} /></label>
              <Button type="submit" variant="gold" className="h-auto w-full py-3 text-xs">Save profile</Button>
            </form>
          </section>
          <section>
            <p className="eyebrow">Booking history</p>
            <h2 className="mt-2 text-4xl">Your stays</h2>
            <div className="mt-6 space-y-4">
              {loading ? <p className="text-sm text-muted-foreground">Loading your stays…</p> : bookings.length === 0 ? (
                <div className="rounded-sm border border-border bg-card p-8 text-center"><CalendarDays className="mx-auto h-7 w-7 text-gold" /><p className="mt-3 text-sm text-muted-foreground">No member reservations yet.</p><Button asChild variant="gold" className="mt-5 h-auto px-5 py-3 text-xs"><Link to="/" hash="book">Book your stay</Link></Button></div>
              ) : bookings.map((booking) => (
                <article key={booking.id} className="rounded-sm border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">{booking.confirmation_code}</p><h3 className="mt-1 text-2xl">{booking.room_type}</h3></div><span className="rounded-sm border border-gold/40 px-2 py-1 text-[0.65rem] uppercase text-gold">{booking.status}</span></div>
                  <p className="mt-4 text-sm text-muted-foreground">{booking.check_in} → {booking.check_out} · {booking.guests}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}