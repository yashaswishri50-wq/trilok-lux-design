import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BellRing,
  Car,
  ConciergeBell,
  Dumbbell,
  Facebook,
  Flower2,
  Gem,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Quote,
  Sparkles,
  Star,
  Utensils,
  Waves,
  Wifi,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { BookingWidget } from "@/components/BookingWidget";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/trilok-logo.png.asset.json";
import heroLobby from "@/assets/hero-lobby.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import dining from "@/assets/dining.jpg";
import spa from "@/assets/spa.jpg";
import banquet from "@/assets/banquet.jpg";
import highTea from "@/assets/high-tea.jpg";
import lounge from "@/assets/lounge.jpg";
import gym from "@/assets/gym.jpg";
import pool from "@/assets/pool.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotel Trilok | Luxury Suites, Fine Dining & Spa" },
      {
        name: "description",
        content:
          "Book direct at Hotel Trilok for exclusive benefits: opulent suites, fine dining, high tea, spa, banquets and 24/7 concierge. Three worlds, one hospitality.",
      },
      { property: "og:title", content: "Hotel Trilok | Three Worlds, One Hospitality" },
      {
        property: "og:description",
        content:
          "Luxury rooms & suites, fine dining, spa, lounge and grand banquets. Book direct for upgrades, breakfast and late checkout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { label: "Stay", href: "#rooms" },
  { label: "Dine", href: "#dining" },
  { label: "Wellness", href: "#wellness" },
  { label: "Events", href: "#events" },
  { label: "Offers", href: "#offers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const rooms = [
  {
    name: "Deluxe Room",
    img: roomSuite,
    size: "44 sq.m",
    price: "₹12,500",
    blurb: "Silk-panelled walls, king bed and skyline views with a marble rain-shower bath.",
    perks: ["King bed", "City view", "Butler on call"],
  },
  {
    name: "Royal Suite",
    img: lounge,
    size: "78 sq.m",
    price: "₹24,900",
    blurb: "A private living room, dining nook and lounge access with evening canapés.",
    perks: ["Living room", "Lounge access", "Airport transfer"],
  },
  {
    name: "Presidential Suite",
    img: heroLobby,
    size: "140 sq.m",
    price: "₹52,000",
    blurb: "The crown of Trilok — panoramic terrace, private spa room and dedicated butler.",
    perks: ["Private terrace", "In-suite spa", "Chauffeur"],
  },
];

const dine = [
  {
    name: "Trishul — Fine Dining",
    img: dining,
    time: "7 PM – 12 AM",
    blurb: "Modern Indian tasting menus by our chef, paired with old-world wines.",
    menu: ["Saffron scallops", "Kashmiri morel risotto", "Gold-leaf mishti"],
  },
  {
    name: "The Silver Hour — High Tea",
    img: highTea,
    time: "3 PM – 6 PM",
    blurb: "Tiered patisserie, single-estate teas and live harp in the atrium.",
    menu: ["Darjeeling first flush", "Rose pistachio éclair", "Truffle finger sandwiches"],
  },
  {
    name: "Neel — Premium Lounge",
    img: lounge,
    time: "6 PM – 2 AM",
    blurb: "Velvet booths, rare single malts and signature cocktails under brass light.",
    menu: ["Trilok Old Fashioned", "Smoked jasmine highball", "Caviar service"],
  },
];

const wellness = [
  { name: "Trilok Spa", img: spa, blurb: "Ayurvedic rituals, hammam and couples' suites." },
  { name: "24/7 Fitness", img: gym, blurb: "Technogym floor, personal trainers, skyline views." },
  { name: "Rooftop Pool", img: pool, blurb: "Heated infinity pool with sunset cabana service." },
];

const services = [
  { icon: ConciergeBell, title: "Concierge", text: "Curated city itineraries, reservations and private tours." },
  { icon: BellRing, title: "24h Room Service", text: "Full à la carte dining delivered to your suite around the clock." },
  { icon: Gem, title: "Lavish Reception", text: "Marble arrival lounge with welcome sherbet and express check-in." },
  { icon: Car, title: "Chauffeur & Valet", text: "Luxury fleet, airport transfers and complimentary valet." },
  { icon: Wifi, title: "Gigabit Wi-Fi", text: "Seamless connectivity across every suite and public space." },
  { icon: Flower2, title: "Bespoke Celebrations", text: "Proposals, anniversaries and festivals staged beautifully." },
];

const offers = [
  {
    tag: "Direct Only",
    title: "Suite Escape",
    text: "3 nights in a Royal Suite with breakfast, spa credit and 4 PM checkout.",
    save: "Save 25%",
  },
  {
    tag: "Members",
    title: "Dine & Stay",
    text: "Stay any night and receive a chef's tasting menu for two at Trishul.",
    save: "Save ₹6,000",
  },
  {
    tag: "Weekend",
    title: "Trilok Wellness",
    text: "Two nights with a 90-minute Ayurvedic ritual and rooftop yoga.",
    save: "Save 18%",
  },
];

const reviews = [
  {
    name: "Ananya Rao",
    from: "Mumbai",
    text: "The Royal Suite felt like a private palace. The butler remembered how I take my chai on day one.",
  },
  {
    name: "James Whitfield",
    from: "London",
    text: "Trishul is genuinely world-class. I have stayed at five-stars across Asia — Trilok's service is the finest.",
  },
  {
    name: "Meera & Rohit",
    from: "Delhi",
    text: "We hosted 300 guests in the banquet hall. Flawless, cinematic and every detail handled.",
  },
];

const gallery = [heroLobby, roomSuite, dining, spa, banquet, highTea, lounge, pool];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "panel-lux border-x-0 border-t-0 py-2" : "py-4"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="Hotel Trilok logo"
              className="h-10 w-auto shrink-0 object-contain mix-blend-screen sm:h-12"
            />
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-xs tracking-[0.22em] text-foreground/80 uppercase transition-colors hover:text-gold"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a href="#book" className="btn-gold hidden rounded-sm px-5 py-3 text-xs sm:inline-block">
              Book Your Stay
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="btn-outline-gold rounded-sm px-3 py-2 text-xs lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="panel-lux mx-4 mt-3 grid gap-1 rounded-sm p-4 lg:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/40 py-2 text-sm tracking-[0.2em] uppercase last:border-0"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] overflow-hidden pt-28 pb-20 flex items-center">
        <img
          src={heroLobby}
          alt="Grand marble lobby of Hotel Trilok at night"
          width={1920}
          height={1088}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_10%,transparent,oklch(0.12_0.05_268/0.92))]" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center lg:px-8">
          <img
            src={logo.url}
            alt="Hotel Trilok"
            className="animate-rise w-64 max-w-full object-contain mix-blend-screen sm:w-80 md:w-[26rem]"
          />
          <p className="eyebrow animate-shimmer mt-6">Three Worlds · One Hospitality</p>
          <h1 className="animate-rise mt-4 text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            An address where <span className="text-gold-gradient italic">opulence</span>
            <br className="hidden sm:block" /> greets you by name
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-foreground/80 sm:text-base">
            Palatial suites, chef-led dining, a candlelit spa and grand ballrooms — all wrapped in
            the warmth of Indian hospitality.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#book" className="btn-gold rounded-sm px-8 py-4 text-sm">
              Book Your Stay
            </a>
            <a href="#rooms" className="btn-outline-gold rounded-sm px-8 py-4 text-xs">
              Explore Suites
            </a>
          </div>
          <div id="book" className="mt-10 w-full max-w-5xl scroll-mt-28">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Direct benefits bar */}
      <section className="border-y border-border bg-surface/60">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            "Book Direct · Best Rate Guaranteed",
            "Complimentary Breakfast for Two",
            "Room Upgrade Subject to Availability",
            "Late Checkout until 4 PM",
          ].map((b) => (
            <div key={b} className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 shrink-0 text-gold" />
              <span className="text-xs tracking-[0.14em] text-foreground/85 uppercase">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <Section
        id="rooms"
        eyebrow="Rooms & Suites"
        title="Sleep inside a jewel box"
        text="Every room is dressed in indigo silk, brushed brass and hand-laid marble — with a butler a single ring away."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <article className="lift-card group h-full overflow-hidden rounded-sm border border-border bg-card">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={r.img}
                    alt={r.name}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 rounded-sm bg-ink/80 px-3 py-1 text-[0.62rem] tracking-[0.2em] text-gold uppercase">
                    {r.size}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.perks.map((p) => (
                      <li
                        key={p}
                        className="rounded-sm border border-border px-2 py-1 text-[0.65rem] tracking-widest uppercase"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      from <span className="font-display text-2xl text-gold">{r.price}</span> / night
                    </p>
                    <a href="#book" className="btn-gold rounded-sm px-4 py-2.5 text-[0.68rem]">
                      Book Now
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Dining */}
      <Section
        id="dining"
        eyebrow="Fine Dining · High Tea · Lounge"
        title="Three worlds of flavour"
        text="From a chef's tasting counter to velvet lounge nights, Trilok keeps the table set all day."
        tinted
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {dine.map((d, i) => (
            <Reveal key={d.name} delay={i * 120}>
              <article className="lift-card group h-full overflow-hidden rounded-sm border border-border bg-card">
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gold">
                    <Utensils className="h-4 w-4" />
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase">{d.time}</span>
                  </div>
                  <h3 className="mt-2 text-2xl">{d.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.blurb}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-4">
                    {d.menu.map((m) => (
                      <li key={m} className="flex justify-between gap-3 text-sm">
                        <span>{m}</span>
                        <span className="text-gold/70">···</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Wellness */}
      <Section
        id="wellness"
        eyebrow="Spa · Gym · Pool"
        title="Restore, in candlelight"
        text="A subterranean spa, a skyline gym and a rooftop infinity pool — wellness at every altitude."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {wellness.map((w, i) => (
            <Reveal key={w.name} delay={i * 120}>
              <div className="lift-card group relative h-80 overflow-hidden rounded-sm">
                <img
                  src={w.img}
                  alt={w.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl">{w.name}</h3>
                  <p className="mt-1 text-sm text-foreground/80">{w.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gold">
          {[Waves, Dumbbell, Flower2].map((Icon, i) => (
            <Icon key={i} className="h-5 w-5 opacity-70" />
          ))}
        </div>
      </Section>

      {/* Events */}
      <Section id="events" eyebrow="Banquets · Conferences · Celebrations" title="Grand rooms for grand occasions" tinted>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="lift-card overflow-hidden rounded-sm">
              <img
                src={banquet}
                alt="Trilok grand ballroom set for a gala"
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <p className="text-sm text-muted-foreground">
                Four pillarless halls, a crystal-lit ballroom for 600 and boardrooms wired for
                hybrid conferences. Our events team handles décor, catering and choreography.
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                {[
                  ["600", "Ballroom guests"],
                  ["4", "Event halls"],
                  ["12", "Boardrooms"],
                  ["24/7", "Event concierge"],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-sm border border-border bg-card p-4">
                    <dt className="font-display text-3xl text-gold">{n}</dt>
                    <dd className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{l}</dd>
                  </div>
                ))}
              </dl>
              <a href="#contact" className="btn-gold mt-6 inline-block rounded-sm px-7 py-3.5 text-xs">
                Plan Your Event
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" eyebrow="Services & Amenities" title="Everything, quietly handled">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="lift-card h-full rounded-sm border border-border bg-card p-6">
                <s.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Offers */}
      <Section
        id="offers"
        eyebrow="Exclusive Offers"
        title="Book direct & get more"
        text="These rates live only here — never on travel agents or aggregators."
        tinted
      >
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 120}>
              <div className="lift-card flex h-full flex-col rounded-sm border border-gold/40 bg-card p-6">
                <span className="eyebrow">{o.tag}</span>
                <h3 className="mt-3 text-2xl">{o.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.text}</p>
                <p className="text-gold-gradient mt-4 font-display text-3xl">{o.save}</p>
                <a href="#book" className="btn-gold mt-5 rounded-sm px-5 py-3 text-center text-xs">
                  Book Now
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section id="gallery" eyebrow="Gallery" title="Inside Trilok">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`group overflow-hidden rounded-sm ${i % 5 === 0 ? "row-span-2" : ""}`}>
                <img
                  src={g}
                  alt={`Hotel Trilok interior ${i + 1}`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-48 w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 md:h-60"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Reviews */}
      <Section id="reviews" eyebrow="Guest Reviews" title="Loved by our guests" tinted>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <figure className="lift-card h-full rounded-sm border border-border bg-card p-6">
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-4 font-display text-xl leading-snug">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center justify-between text-sm">
                  <span>
                    {r.name} · <span className="text-muted-foreground">{r.from}</span>
                  </span>
                  <span className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Location & Contact" title="Come stay with us">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              <ContactRow icon={MapPin} label="Address">
                12 Regal Avenue, Civil Lines, Bhopal 462001, Madhya Pradesh, India
              </ContactRow>
              <ContactRow icon={Phone} label="Reservations">
                +91 90000 00000 · 24 hours
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                stay@hoteltrilok.com
              </ContactRow>
              <div className="overflow-hidden rounded-sm border border-border">
                <iframe
                  title="Hotel Trilok location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.38%2C23.22%2C77.46%2C23.28&layer=mapnik"
                  className="h-64 w-full grayscale-[35%]"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Address, phone and map location are placeholders — send me the real details and
                I'll put them in.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (e.target as HTMLFormElement).reset();
                toast.success("Thank you — our concierge will reply shortly.");
              }}
              className="panel-lux space-y-4 rounded-sm p-6"
            >
              <h3 className="text-2xl">Enquire with the concierge</h3>
              <input required placeholder="Full name" className="lux-input" />
              <input required type="email" placeholder="Email" className="lux-input" />
              <input placeholder="Phone" className="lux-input" />
              <textarea rows={4} placeholder="Tell us about your stay or event" className="lux-input" />
              <button type="submit" className="btn-gold w-full rounded-sm py-3.5 text-xs">
                Send Enquiry
              </button>
            </form>
          </Reveal>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-y border-border">
        <img src={pool} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="eyebrow">Book Direct & Get Exclusive Benefits</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Your suite is waiting</h2>
          <a href="#book" className="btn-gold mt-8 inline-block rounded-sm px-10 py-4 text-sm">
            Book Your Stay
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-3 lg:px-8">
          <div>
            <img src={logo.url} alt="Hotel Trilok" className="h-16 w-auto object-contain mix-blend-screen" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Three worlds, one hospitality. A modern palace hotel for travellers who notice the
              details.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social media"
                  className="rounded-sm border border-border p-2 text-gold transition-colors hover:bg-gold/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="eyebrow">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-muted-foreground transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow">Reserve</h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Call +91 90000 00000 or book online for the best available rate.
            </p>
            <a href="#book" className="btn-gold mt-4 inline-flex items-center gap-2 rounded-sm px-6 py-3 text-xs">
              Book Your Stay <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hotel Trilok. All rights reserved.
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:hidden">
        <a href="#book" className="btn-gold block rounded-sm py-4 text-center text-sm">
          Book Your Stay
        </a>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  text,
  tinted,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-20 lg:px-8 ${tinted ? "bg-surface/35" : ""}`}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">{title}</h2>
            {text && <p className="mt-4 text-sm text-muted-foreground sm:text-base">{text}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-sm border border-border bg-card p-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
      <div className="min-w-0">
        <p className="text-[0.65rem] tracking-[0.22em] text-gold uppercase">{label}</p>
        <p className="mt-1 text-sm text-foreground/85">{children}</p>
      </div>
    </div>
  );
}
