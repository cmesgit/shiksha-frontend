/* Small local vector scenes keep the guide useful without image downloads. */
export default function StepIllustration({ step }) {
  return <svg viewBox="0 0 240 138" className="fm2-step-art" aria-hidden="true" focusable="false">
    <ellipse cx="120" cy="122" rx="84" ry="8" fill="currentColor" opacity=".08" />
    <circle cx="202" cy="26" r="12" fill="white" opacity=".6" />
    <path d="M25 38h10m-5-5v10M211 96h8m-4-4v8" stroke="currentColor" opacity=".3" strokeWidth="3" strokeLinecap="round" />
    {step === 0 && <><rect x="49" y="23" width="130" height="88" rx="12" fill="white" /><path d="M68 47h56M68 61h90M68 75h67" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".2" /><circle cx="172" cy="89" r="24" fill="currentColor" /><path d="M166 82a7 7 0 0 1 13 3c0 6-7 5-7 11m0 7v1" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" /></>}
    {step === 1 && <><path d="M45 29h117a10 10 0 0 1 10 10v41a10 10 0 0 1-10 10H85l-22 17V90H45a10 10 0 0 1-10-10V39a10 10 0 0 1 10-10" fill="white" /><path d="M56 49h87M56 64h61" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".25" /><circle cx="176" cy="94" r="25" fill="currentColor" /><path d="m164 94 8 8 16-18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>}
    {step === 2 && <><rect x="65" y="22" width="133" height="88" rx="12" fill="white" /><path d="M88 45h83M88 61h58M88 77h72" stroke="currentColor" strokeWidth="5" opacity=".2" strokeLinecap="round" /><circle cx="61" cy="85" r="29" fill="currentColor" /><path d="M61 101V70m-12 12 12-12 12 12" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></>}
    {step === 3 && <><circle cx="92" cy="43" r="17" fill="white" /><path d="M62 105V88a30 30 0 0 1 60 0v17" fill="white" /><circle cx="151" cy="49" r="14" fill="currentColor" opacity=".2" /><path d="M129 105V91a23 23 0 0 1 46 0v14" fill="currentColor" opacity=".2" /><circle cx="178" cy="93" r="23" fill="currentColor" /><path d="M178 105V82m-10 10 10-10 10 10" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></>}
  </svg>;
}
