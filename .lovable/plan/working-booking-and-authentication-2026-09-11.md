# Working Booking and Authentication

## Experience
- Add a header control that shows **Sign in** when signed out and **Account** when signed in, with a secure sign-out action.
- Add email/password and Google sign-in, registration, email confirmation messaging, forgot-password, and password-reset screens.
- Add a **Guest / Member** selector to the booking widget. Guest checkout collects contact details; Member booking uses the signed-in guest profile and saves the reservation to booking history.
- Replace the current simulated availability toast with a real booking flow: validate dates, collect guest details, show a clear reservation summary, save the booking, and return a confirmation reference.
- Add a protected account page where guests can update their name, phone, and preferences, and review their own bookings.

## Data and security
- Create private guest profiles linked to authenticated accounts.
- Create bookings with room type, dates, guests, contact details, status, and confirmation reference.
- Signed-in guests can only view and manage their own profile and bookings.
- Guest reservations are accepted without an account but remain private and are not exposed in account history.
- Enable leaked-password protection and managed Google sign-in.

## Interface
- Preserve the current navy, ink, gold, typography, imagery, and single-page hotel presentation.
- Use focused overlays/pages for authentication and reservation confirmation rather than redesigning the site.
- Keep all existing **Book Your Stay** links connected to the upgraded booking area.
- Keep the mobile booking access prominent and make account controls fit the existing navigation.

## Verification
- Test registration/sign-in states, guest and member booking paths, sign-out, account history, validation, mobile layout, and browser errors.

## Technical notes
- Lovable Cloud stores profiles and reservations with row-level privacy rules.
- Email confirmation remains enabled; new email/password accounts must confirm before signing in.
- This creates reservations but does not collect payment or connect to a hotel inventory/channel manager.
