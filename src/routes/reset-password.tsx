import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Reset Password | Hotel Trilok" },
    { name: "description", content: "Set a new password for your Hotel Trilok guest account." },
    { property: "og:title", content: "Reset Password | Hotel Trilok" },
    { property: "og:description", content: "Securely reset your Hotel Trilok guest account password." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [recovery, setRecovery] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setRecovery(window.location.hash.includes("type=recovery") || new URLSearchParams(window.location.search).get("type") === "recovery");
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={async (event) => {
        event.preventDefault();
        if (!recovery) return;
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
          toast.error(error.message);
          return;
        }
        toast.success("Your password has been updated.");
        await navigate({ to: "/account", replace: true });
      }} className="panel-lux w-full max-w-md space-y-5 rounded-sm p-7">
        <h1 className="text-3xl">Choose a new password</h1>
        {!recovery ? <p className="text-sm text-muted-foreground">This recovery link is missing or has expired. Request a new link from the sign-in page.</p> : <input className="lux-input" type="password" minLength={8} required autoComplete="new-password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />}
        {recovery && <Button type="submit" variant="gold" className="h-auto w-full py-3.5 text-xs">Update password</Button>}
        <Link to="/auth" className="block text-center text-xs text-gold hover:underline">Return to sign in</Link>
      </form>
    </main>
  );
}