import { useEffect, useState } from "react";
import { CalendarDays, Users, Search, BedDouble, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

function makeCode() {
  return `TRK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [roomType, setRoomType] = useState("Deluxe Room");

  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      setUser(data.user);
      setEmail(data.user.email ?? "");
      const name = data.user.user_metadata?.['full_name'];
      if (typeof name === "string") setFullName(name);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) setEmail(session.user.email);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkOut) {
      toast.error("Please select your check-out date.");
      return;
    }
    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in.");
      return;
    }
    setConfirmation(null);
    setOpen(true);
  }

  async function confirmBooking(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const confirmationCode = makeCode();
    const { error } = await supabase.from("bookings").insert({
      user_id: user?.id ?? null,
      booking_mode: user ? "member" : "guest",
      confirmation_code: confirmationCode,
      room_type: roomType,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      full_name: fullName,
      email,
      phone,
    });
    setBusy(false);
    if (error) {
      toast.error("We couldn't save your reservation. Please try again.");
      return;
    }
    setConfirmation(confirmationCode);
    toast.success("Reservation confirmed", { description: `Reference ${confirmationCode}` });
  }

  return (
    <>
      <form
        onSubmit={submit}
        className={`panel-lux w-full rounded-sm p-4 sm:p-6 ${compact ? "" : "md:p-7"}`}
      >
        <p className="eyebrow mb-4">Check Availability · Best Rate Guaranteed</p>
        <div className="grid gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))_auto] md:items-end">
          <Field label="Check In" icon={<CalendarDays className="h-4 w-4" />}>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            />
          </Field>
          <Field label="Check Out" icon={<CalendarDays className="h-4 w-4" />}>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none"
            />
          </Field>
          <Field label="Guests" icon={<Users className="h-4 w-4" />}>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none [&>option]:bg-surface"
            >
              {["1 Adult", "2 Adults", "2 Adults · 1 Child", "3 Adults", "Family · 4+"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Room" icon={<BedDouble className="h-4 w-4" />}>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none [&>option]:bg-surface"
            >
              {["Deluxe Room", "Premium Room", "Trilok Club Room", "Royal Suite", "Presidential Suite"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </Field>
          <Button variant="gold" type="submit" className="h-[52px] px-6 text-xs sm:text-sm">
            <Search className="h-4 w-4" />
            Check Availability
          </Button>
        </div>
        <p className="mt-4 text-xs tracking-wide text-muted-foreground">
          Book direct and unlock room upgrades, complimentary breakfast and late checkout.
        </p>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-sm border-gold/30 bg-card">
          {confirmation ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
              <DialogTitle className="mt-4 text-3xl">Reservation confirmed</DialogTitle>
              <p className="eyebrow mt-3">Reference {confirmation}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {roomType} · {checkIn} → {checkOut} · {guests}. Our concierge will contact you on{" "}
                {phone || email} shortly.
              </p>
              <Button
                variant="gold"
                className="mt-6 h-auto px-6 py-3 text-xs"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">Complete your reservation</DialogTitle>
                <DialogDescription className="text-xs tracking-wide">
                  {roomType} · {checkIn} → {checkOut} · {guests}
                  {user ? " · Member booking" : " · Guest booking"}
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={confirmBooking}>
                <label className="block text-xs text-muted-foreground">
                  Full name
                  <input
                    className="lux-input mt-1"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>
                <label className="block text-xs text-muted-foreground">
                  Email
                  <input
                    className="lux-input mt-1"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block text-xs text-muted-foreground">
                  Phone
                  <input
                    className="lux-input mt-1"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <Button
                  type="submit"
                  variant="gold"
                  disabled={busy}
                  className="h-auto w-full py-3.5 text-xs"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Confirm reservation
                </Button>
                {!user && (
                  <p className="text-center text-[0.7rem] text-muted-foreground">
                    Sign in before booking to keep this stay in your account history.
                  </p>
                )}
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-sm border border-border bg-ink/50 px-3 py-2 text-left">
      <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.25em] text-gold uppercase">
        {icon}
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
