import { useState } from "react";
import { CalendarDays, Users, Search, BedDouble } from "lucide-react";
import { toast } from "sonner";

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [roomType, setRoomType] = useState("Deluxe Room");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!checkOut) {
      toast.error("Please select your check-out date.");
      return;
    }
    toast.success("Availability confirmed", {
      description: `${roomType} · ${checkIn} → ${checkOut} · ${guests}. Our concierge will confirm within minutes.`,
    });
  }

  return (
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
            {["Deluxe Room", "Trilok Club Room", "Royal Suite", "Presidential Suite"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <button
          type="submit"
          className="btn-gold flex h-[52px] items-center justify-center gap-2 px-6 text-xs sm:text-sm"
        >
          <Search className="h-4 w-4" />
          Book Now
        </button>
      </div>
      <p className="mt-4 text-xs tracking-wide text-muted-foreground">
        Book direct and unlock room upgrades, complimentary breakfast and late checkout.
      </p>
    </form>
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
