import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import logo from "@/assets/trilok-logo.png.asset.json";
import heroLobby from "@/assets/hero-lobby.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Guest Sign In | Hotel Trilok" },
    { name: "description", content: "Sign in or create your Hotel Trilok guest account to reserve rooms and manage stays." },
    { property: "og:title", content: "Guest Sign In | Hotel Trilok" },
    { property: "og:description", content: "Access your Hotel Trilok guest account and reservations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/account", replace: true });
    });
  }, [navigate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent. Check your email.");
        setMode("signin");
        return;
      }
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: fullName } },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          setMode("signin");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await navigate({ to: "/account", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to continue.");
    } finally {
      setBusy(false);
    }
  }

  async function googleSignIn() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error(result.error.message);
      setBusy(false);
      return;
    }
    if (!result.redirected) await navigate({ to: "/account", replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <img src={heroLobby} alt="Hotel Trilok grand reception" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="panel-lux relative w-full max-w-md rounded-sm p-6 sm:p-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold"><ArrowLeft className="h-4 w-4" /> Back to hotel</Link>
        <img src={logo.url} alt="Hotel Trilok" className="mx-auto h-16 w-auto object-contain mix-blend-screen" />
        <h1 className="mt-5 text-center text-3xl">{mode === "signup" ? "Create your guest account" : mode === "forgot" ? "Reset your password" : "Welcome back"}</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">{mode === "forgot" ? "We’ll email you a secure recovery link." : "Manage stays and enjoy a smoother arrival."}</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          {mode === "signup" && <input className="lux-input" required placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />}
          <input className="lux-input" required type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode !== "forgot" && (
            <div className="relative">
              <input className="lux-input pr-12" required minLength={8} type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="button" variant="ghost" size="icon" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          )}
          <Button type="submit" variant="gold" disabled={busy} className="h-auto w-full py-3.5 text-xs">{busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}</Button>
        </form>
        {mode !== "forgot" && <>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" /></div>
          <Button type="button" variant="outline-gold" disabled={busy} onClick={googleSignIn} className="h-auto w-full py-3.5 text-xs">Continue with Google</Button>
        </>}
        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
          {mode !== "signin" && <button type="button" onClick={() => setMode("signin")} className="text-gold hover:underline">Sign in</button>}
          {mode !== "signup" && <button type="button" onClick={() => setMode("signup")} className="text-gold hover:underline">Create account</button>}
          {mode !== "forgot" && <button type="button" onClick={() => setMode("forgot")} className="text-muted-foreground hover:text-gold">Forgot password?</button>}
        </div>
      </div>
    </main>
  );
}