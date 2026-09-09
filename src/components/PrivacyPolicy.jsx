import React from "react";
import LegalDocument from "./LegalDocument";

/**
 * PrivacyPolicy — /privacy
 *
 * Register.jsx has asked every new account to agree to a "Privacy Policy"
 * since launch, and the link 404'd. Terms §12 pointed at https://shikshacom.com
 * (the homepage) for it, so there was no policy anywhere on the site.
 *
 * ── READ BEFORE EDITING ──────────────────────────────────────────────────
 * Every factual claim below was checked against the models, views, Celery beat
 * schedule and settings — not assumed. If you change how the platform handles
 * data, change this page in the same commit. Four things are easy to get wrong:
 *
 *  1. Closing an account does NOT hard-delete anything today. It deactivates
 *     the account, revokes sessions and writes an AccountDeletionRequest with
 *     purge_after = +30 days — but NOTHING CONSUMES THAT ROW
 *     (accounts/settings_models.py:169; no task, command or beat entry).
 *     §14 says exactly that and no more. DeleteAccountView's own docstring
 *     claims a purge job runs; the docstring is wrong.
 *
 *  2. §15 (security) deliberately does not claim uploaded documents are
 *     unreachable without authentication, because on prod they are reachable
 *     by URL from the CDN and config/media_security.py's deny-by-default table
 *     is dead code under the Bunny storage backend. Do not "improve" that
 *     section into a promise the platform does not keep. Strengthen it once
 *     signed URLs and Bunny token auth ship.
 *
 *  3. §13 does not claim we verify anyone's age. There is no age gate
 *     anywhere in the codebase, and DPDP §9 verifiable parental consent is
 *     not implemented. Saying otherwise would be the single most damaging
 *     false claim this page could make.
 *
 *  4. SMS and push are NOT live (SMS_PROVIDER defaults to "console";
 *     fcm-django is not installed) so no section promises or describes them.
 *     Email is Resend. If a channel goes live, §11 needs it.
 *
 * This is a good-faith engineering description of real data flows. It has NOT
 * been reviewed by a lawyer, and DPDP Act 2023 compliance — notice-and-consent
 * form, a named grievance officer, verifiable parental consent under §9 — needs
 * that review before this is relied on as a compliance artifact.
 */

const CONTACT = "info@shikshacom.com";

const sections = [
  {
    id: 1,
    title: "Who we are",
    content: `This Privacy Policy explains what personal data ShikshaCom collects, why, who else sees it, and what you can do about it.

The data controller — in the language of the Digital Personal Data Protection Act, 2023, the "Data Fiduciary" — is CM Engineering Solution, doing business as ShikshaCom Learning Management System ("ShikshaCom", "we", "us", "our"), registered in India with its registered office at House No. – 1473, Maruti Vihar, Gurgaon, Haryana - 122002.

This policy covers the ShikshaCom website at https://www.shikshacom.com and the signed-in student, teacher and administrator applications reached from it.

It is incorporated into our Terms of Use. Where the two disagree about personal data, this policy governs.

Questions, requests and complaints: ${CONTACT}.

Last updated: 9 September 2026.`,
  },
  {
    id: 2,
    title: "The short version",
    content: `We are an education platform. We collect what we need to run classes, and we do not sell your data.

• We do not sell or rent personal data, and we do not share it with advertisers or data brokers.
• We run no advertising, no ad-tracking and no third-party analytics. The two cookies we set keep you signed in. That is also why there is no cookie banner.
• You can download a copy of your data, and close your account, from Settings → Privacy & data.
• Closing your account signs you out everywhere and blocks sign-in. It is not yet an automatic erasure — §14 explains precisely what happens, including what does not.
• Teachers and tutors give us much more than students do, including identity documents and — for in-person tutoring — a precise location. §5 covers that.
• We never store an Aadhaar number, in any form. §6.
• Live classes can be recorded, and those recordings include participants' voices and faces. §8.
• Everything is stored and processed in India, by us and by a small number of named service providers. §11.
• If you are under 18, a parent or guardian must set up and hold the account. §13.`,
  },
  {
    id: 3,
    title: "Your account and learner profiles",
    content: `To create an account we ask for an email address and a password. That is all that is strictly required. Passwords are stored only as a salted one-way hash; nobody at ShikshaCom can read your password.

If you sign in with Google instead, we receive the email address, name and profile picture on your Google account, and a stable Google account identifier. We do not receive your Google password and get no access to Gmail, Drive, contacts or anything else in your Google account.

One account can hold several learner profiles — typically the account holder plus one per child. Each profile can carry:

• a display name, first and last name, and a profile photo or avatar;
• date of birth and gender;
• a phone number;
• where you are: state, district, city or town, and PIN code;
• what you are studying: whether you are currently studying, class or level, stream, board, school name and academic year — or, if you are not currently studying, your highest education;
• learning goals, preferences and a short biography;
• parent and guardian contact details: father's, mother's and guardian's names and phone numbers, and a parent or guardian email address.

Most of this is optional and you can use the platform without it, though some of it changes what we can do — we cannot suggest courses for your class if we have not been told the class. One exception is worth naming: for a profile that belongs to a dependent, we treat at least one complete parent-or-guardian name and phone number as required, because we need a reachable adult for a child's account.

You may also set a PIN on a profile so that switching into it requires the PIN. PINs are hashed like passwords.`,
  },
  {
    id: 4,
    title: "If you never create an account",
    content: `Some data reaches us from visitors who never sign up, and you should know about it.

• Contact form. If you write to us through the site we keep your name, email address, phone number if given, the role you selected, your topic and your message — together with the time you consented and the IP address the message was submitted from.
• Newsletter. If you subscribe we keep your email address and the IP address you subscribed from. Unsubscribing marks the record as unsubscribed; we stop emailing you.
• Public practice quizzes. Quizzes that are open without signing in still record the attempt and the answers, not tied to any account. We also rate-limit by IP address to stop abuse.
• Ordinary web logs, as described in §9.

We keep these so we can reply to you, honour an unsubscribe, and keep the site working. We do not use them to build a profile of you and we do not sell them.`,
  },
  {
    id: 5,
    title: "If you apply to teach or tutor",
    content: `Applying to teach — as Academy faculty or as a Skill Development tutor — involves more data than learning does, because we are deciding whether to put you in front of students.

An application can include:

• your full name, date of birth, phone number and photograph;
• a headline and biography, subjects, languages, education, qualifications, certifications and experience — the parts that make up your public listing are shown to prospective students;
• the type and number of a government identity document (Aadhaar, PAN, voter ID or driving licence), and scanned images of its front and back;
• supporting documents you attach, such as qualification certificates, and any sample images or video you upload;
• an introduction video, if you record one;
• how you teach, and if you teach in person, where: an exact location, PIN code, state, district, city — and the latitude and longitude of that location, so learners can find tutors near them;
• payment details for you to be paid: a UPI address, payee name and any note you add.

We use this to verify you are who you say you are, to decide on your application, to build your listing, and to let learners contact and pay you. Your identity document, its number and your date of birth are used for verification and are never shown to students or other teachers.

If you sign a faculty agreement through the site, we record the signed document, its version, the name you signed under, the time, and the IP address it was signed from — that is what makes the signature evidence of anything.

Two things to be deliberate about. Your location is precise, not approximate, and it is used to place you on a map for learners; do not enter a home address you are not willing to have found. And your UPI address is shown to learners who book you, because Skill Development payments go directly to you (§7).

If your application is declined we keep it and its documents as the record of that decision. You can ask us to delete it — §16.`,
  },
  {
    id: 6,
    title: "Scholarship identity verification",
    content: `The Instant Scholarship exam allows one attempt per person per academic year, so we have to establish that a real, distinct person is applying. Two things about how we do that matter.

First, identity is anchored on the parent or guardian, never on the child. The adult verifies themselves; the child is then described by the adult. This is deliberate — asking a school student to prove their own identity is both legally awkward and, in practice, something most of them cannot do.

Second, we never store an Aadhaar number. Verification uses UIDAI's Aadhaar Paperless Offline e-KYC: a file you download yourself from UIDAI and protect with a share code. We check UIDAI's digital signature on that file, read the name, date of birth and gender it certifies, and keep only a non-reversible hash of those values so we can tell whether the same person has already applied this year. The Aadhaar number is not stored in any form — not in plain text, not hashed, not as the last four digits. The share code is used in memory and never written down, and the file itself is not kept.

If you would rather not do that, manual document review is available: you upload an identity document, a person reviews it, and we keep that document with the verification record.

We record that you consented, when, from which IP address and with which browser, because the law requires us to be able to show consent was given.

We also keep your eligibility record, your exam session and answers, time spent and answer changes per question, your score and any award. During the exam we record integrity signals — the browser tab losing focus, a count of such switches, your IP address, browser and a device fingerprint. All of that is described on the instructions screen before the exam begins, and it exists to keep the scholarship fair.`,
  },
  {
    id: 7,
    title: "Payments",
    content: `We never see or store card numbers, CVVs or bank account details. There is no field for them anywhere in our systems.

How payment works depends on what you are paying for.

• Free enrolment. Much of the platform is free, and no payment data exists.
• Academy courses paid by UPI transfer. You pay to our UPI address and tell us the reference: we keep the amount, the method, the date, the UTR or reference number and the receipt or screenshot you upload, and a person reviews it against our records. That screenshot is an image you chose to send us — please crop out anything we do not need.
• Where an online payment gateway is enabled, the payment is handled by Razorpay. Your card or UPI credentials go to Razorpay, not to us; we keep the order and payment identifiers Razorpay gives us and the confirmation it sends back.
• Skill Development bookings are peer-to-peer. The platform does not collect the money at all — the learner pays the tutor directly. That is why we show the tutor's UPI address to the learner, and why, when a payment is recorded, we keep the payer's own UPI address and the reference for the tutor to reconcile against.

We keep payment and invoicing records for as long as tax and accounting law requires, which is longer than we keep most things and is not affected by closing your account.`,
  },
  {
    id: 8,
    title: "Classes, coursework and recordings",
    content: `Using the platform generates records. We keep them because they are the product — a course you cannot see your progress in is not much of a course.

• Coursework: the courses and batches you are in, materials you open, quiz attempts with your answers and scores, assignment submissions and the marks and feedback on them.
• Video: how far through a recorded video you watched, and when you last watched it.
• Live classes: whether you joined, when you joined and left, and how long you were there. We also collect connection-quality readings from your device — bitrate, frame rate, latency, packet loss — to diagnose bad calls.
• Recordings. Live classes and sessions can be recorded. A recording captures whatever was shared in the room, which normally includes participants' voices, and their faces if cameras are on, along with anything said in class chat. Recordings are published to the students of that class so they can catch up. If you do not want to appear in one, keep your camera off and tell your teacher.
• Class chat during a live session, and direct and group messages elsewhere on the platform, with any files attached. Messages are stored so conversations persist. They are not end-to-end encrypted, which means they are technically readable by us; we look only where we must, such as investigating a report of abuse.
• Forum posts, replies and votes, and anything else you publish. Assume other users can see these.
• Notifications we sent you, and your notification preferences.
• Counselling, if you use it: your intake answers about interests, goals and subjects, your notes to the counsellor, assessment responses, and the counsellor's session notes and reports about you.

One thing we would rather state than have you discover. An administrator can join a live class as a silent observer, without appearing in the participant list, and we record when that happens. It exists for safeguarding and quality — investigating a complaint about a class, for instance — and the record of who observed and when is retained.

None of this is used to build advertising profiles, and none of it is sold.`,
  },
  {
    id: 9,
    title: "Technical and security data",
    content: `Some data is collected automatically, because it is how the web works or because accounts have to be kept safe.

• Sign-in records. Each sign-in, failed sign-in attempt, sign-out and verification event is recorded with the time, the IP address, and the browser and device the request described itself as.
• Sessions and devices. For each signed-in device we keep the raw browser identification string, a readable browser, platform and device label derived from it, the IP address and when it was last active. You can see your own sessions and sign other devices out in Settings → Sessions & devices. Revoking a session marks it revoked rather than erasing the row, so the history of a compromised account survives an attacker tidying up after themselves. We do not look up your physical location from your IP address.
• Server logs. Our servers and our content-delivery provider log requests, including IP addresses, as part of operating and securing the service.
• Product guidance. We record which introductory tours you have seen and where you stopped, so we do not show you the same thing twice.

We use this to keep you signed in, to detect and investigate abuse and unauthorised access, and to diagnose faults.`,
  },
  {
    id: 10,
    title: "Cookies",
    content: `We set two cookies. One holds a short-lived access token, the other a longer-lived refresh token, and between them they are what keeps you signed in as you move around the site.

Both are HTTP-only, meaning scripts running in the page cannot read them.

We do not set advertising cookies, we do not set third-party tracking cookies, and we do not embed third-party analytics — no Google Analytics, no Facebook pixel, nothing of that kind. This is why the site does not interrupt you with a cookie consent banner: there is nothing to consent to beyond the cookies that make signing in work, and you can refuse those by not signing in.

Embedded video and live classes are delivered by the providers named in §11, and those may set cookies or similar storage of their own in order to play video.`,
  },
  {
    id: 11,
    title: "Who else processes your data",
    content: `We use a small number of service providers. They process data on our behalf, under contract, for purposes we set — they are not free to use it for their own ends. None of them is an advertiser and we sell data to nobody.

• Bunny (Bunny Storage and Bunny Stream) — file storage, content delivery and video. Files you upload are stored with and served by Bunny: profile photographs, course materials, chat attachments, receipts, teacher application documents and identity scans. Class recordings and tutor introduction videos are hosted and streamed by Bunny.
• LiveKit — real-time audio and video for live classes and sessions. While a class is running, your audio and video pass through LiveKit, and the access token that admits you carries your display name, your account and profile identifiers and your role in the room.
• Resend — transactional email: verification links, password reset codes, receipts and booking confirmations. Your email address and the content of those messages reach it.
• Razorpay — only where an online payment gateway is enabled. See §7.
• Google — only if you choose to sign in with Google. See §3.
• Our hosting and infrastructure provider, which runs the servers and the database.

We do not currently send SMS or mobile push notifications. If that changes, this section will name the provider before it starts.

We may also disclose personal data where we are legally required to — a court order or a lawful demand from an authority — or where it is necessary to establish, exercise or defend a legal claim. If ShikshaCom is ever part of a merger or acquisition, personal data may transfer with the business, and this policy travels with it.

We store and process personal data in India. Where a provider operates infrastructure outside India, data may be processed outside India by that provider in the course of delivering its service.`,
  },
  {
    id: 12,
    title: "Why we are allowed to use it",
    content: `Under the Digital Personal Data Protection Act, 2023 we rely on your consent, or on a legitimate use the Act permits, for each purpose:

• Running your account and delivering the courses, classes and bookings you asked for — with your consent, to do the thing you signed up for.
• Verifying teachers, tutors and scholarship applicants — consent given when you submit the application, together with our need to keep students safe.
• Keeping accounts secure, preventing fraud and abuse, and investigating reports and safeguarding concerns — our legitimate interest in a safe platform and in protecting our users.
• Meeting legal, tax and accounting obligations for payments.
• Service messages and notifications — consent, adjustable in Settings.

Where we rely on consent you may withdraw it (§16). If we need something in order to provide the service at all, withdrawing consent for it means closing the account, and we will say so plainly rather than quietly degrading your experience.`,
  },
  {
    id: 13,
    title: "Children and guardians",
    content: `ShikshaCom teaches school students, including students well under 18. We know that, and it changes our obligations.

If you are under 18 you must not create an account for yourself. A parent, guardian or other adult family member legally authorised to consent under Indian law must create it and agree to this policy and our Terms of Use on your behalf. The multi-profile design exists for exactly this: one adult account holding a profile for each child.

We should be straightforward about the limits of that. We do not currently verify anyone's age, and we do not yet operate the verifiable parental consent mechanism that section 9 of the DPDP Act contemplates. Today, consent is given by whoever creates the account at the point of registration, and we rely on that adult telling us the truth. Building proper verifiable parental consent is work we have started and not finished, and we would rather say so here than let this page imply a control that does not exist.

What we do already do:

• We run no advertising to anyone, of any age, and no behavioural profiling.
• For a dependent's profile we require a reachable adult — at least one complete parent or guardian name and phone number.
• A child's date of birth, photograph and phone number are optional, and the platform works without them.
• Scholarship identity verification is anchored on the adult, never the child (§6).

If you believe a child has an account without a guardian's involvement, or you are a guardian who wants a child's data corrected or removed, write to ${CONTACT} and we will act on it.`,
  },
  {
    id: 14,
    title: "How long we keep it",
    content: `We keep personal data for as long as your account is open, and after that for as long as we have a reason to. Some things are deleted automatically; the account itself is not, and you should know the difference.

Deleted automatically today:

• An account that is created but never email-verified is deleted within about 24 hours.
• Files attached to chat messages expire 7 days after they are sent, and the message is withdrawn with them. Message text is not deleted on that schedule.
• Files shared inside a live or private session expire a short, configurable period after the session ends.
• Email verification links expire in 24 hours; password reset codes in 15 minutes.
• Sign-in tokens are short-lived and refresh tokens expire after a week of disuse.

Closing your account — Settings → Privacy & data. When you do:

• every profile on the account is deactivated and every session on every device is revoked immediately: you are signed out and can no longer sign in;
• we record the closure and open a 30-day window in which support can reverse it, if the closure was a mistake or was not made by you.

Now the part most policies would fudge. Closing your account makes it inaccessible; it is not yet an automatic erasure of the underlying records. We do not currently run a job that hard-deletes closed accounts when the 30 days elapse, so those records persist until someone acts on them. If you want your data actually erased, write to ${CONTACT} and say so — we will carry it out by hand and confirm when it is done. We would rather tell you this than imply a deletion that does not happen. Building the automatic purge is on our list.

Records that outlive the account regardless, because we must keep them or need them: payment and invoicing records for the period tax law requires; a minimal record that a closure was requested, so we can show it was honoured; and content you posted into shared spaces such as forum threads and group conversations, which we may keep so that other people's discussions do not become unreadable.

We also retain security and operational records — sign-in history, session history, message content, quiz attempts, attendance — for as long as the account exists, without a fixed shorter window.

We cannot close an account that still has live paid course access. That has to be a conversation with support, so the payment is settled rather than silently forfeited.`,
  },
  {
    id: 15,
    title: "How we protect it",
    content: `We take security seriously, and we would rather describe it accurately than impressively.

• All traffic between you and ShikshaCom is encrypted in transit over HTTPS.
• Passwords and profile PINs are stored only as salted one-way hashes, and password reset codes are hashed with a short expiry and a limit on attempts.
• Reaching the platform requires authentication; sessions are individually revocable; administrative functions sit behind role and permission checks.
• Aadhaar numbers are never stored (§6).
• Access to production data by our own staff is limited to those who need it to operate and support the service.

No system is perfectly secure and we do not claim ours is. We are actively hardening how uploaded files are stored and served, and we treat that as work in progress rather than a finished job.

If you find a security problem, please report it to ${CONTACT} rather than disclosing it publicly, and we will look at it promptly. We will not pursue you for reporting something in good faith.`,
  },
  {
    id: 16,
    title: "Your rights and how to use them",
    content: `You have rights over your personal data, and most of them are self-serve.

• See and download your data. Settings → Privacy & data → export gives you a machine-readable file of your account data, immediately. No request, no waiting.
• Correct it. Your profiles, contact details and preferences are editable in Settings. If something you cannot reach is wrong, write to us.
• Close your account. Settings → Privacy & data. Read §14 first, so you know exactly what it does.
• Erasure. Ask at ${CONTACT} and we will carry it out, subject to the records in §14 that we have to keep.
• Withdraw consent, including switching off notification categories in Settings.
• Nominate someone to exercise these rights for you if you become unable to, as the DPDP Act provides. Write to us.
• Complain. Write to ${CONTACT} first — we would like the chance to put it right. You also have the right to complain to the Data Protection Board of India.

Please write from the address on the account, or be ready to verify it another way: we will not hand an account's data to whoever asks for it. We aim to respond within 30 days and will tell you if we need longer.

If you are a parent or guardian acting for a child's profile on your account, these rights are yours to exercise.`,
  },
  {
    id: 17,
    title: "Automated decisions and profiling",
    content: `We do not make decisions about you by purely automated means that have a legal or similarly significant effect on you.

Quizzes and scholarship exams are marked automatically, which is ordinary marking, and a scholarship award follows from your score against published bands — those bands are shown to you before you sit the exam. If an integrity signal is raised during an exam, a person reviews it; a flag does not automatically void anything.

Teacher and tutor applications are reviewed by a person, not by an algorithm.

Course and content suggestions are based on the class, board and goals recorded on your profile. That is a convenience, not a judgement about you, and it runs on data you entered and can change.`,
  },
  {
    id: 18,
    title: "Changes to this policy, and contacting us",
    content: `We may update this policy as the platform changes or as the law develops. When we do, we will update the "Last updated" date in §1.

If a change materially affects how we use data you have already given us, we will do more than change a date — we will tell you through the platform or by email before it takes effect, and where the law requires fresh consent we will ask for it. We will not apply a materially different use to data we already hold on the strength of a silent edit to this page.

For any question, request or complaint about privacy or your personal data:

CM Engineering Solution (ShikshaCom Learning Management System)
House No. – 1473, Maruti Vihar
Gurgaon, Haryana - 122002
India

Email: ${CONTACT}

Please put "Privacy" in the subject line so it reaches the right people, and say which account you are asking about.

If you are not satisfied with how we handle your request, you may complain to the Data Protection Board of India.`,
  },
];

const PrivacyPolicy = () => (
  <LegalDocument
    sections={sections}
    title={<>Privacy Policy</>}
    subtitle="CM Engineering Solution · Last updated 9 September 2026"
  />
);

export default PrivacyPolicy;
