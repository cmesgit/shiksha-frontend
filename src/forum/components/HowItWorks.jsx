import React from "react";
import StepIllustration from "./StepIllustration";
import ScribbleIcon from "../../components/icons/ScribbleIcon";
import { useNavigate } from "react-router-dom";
import { useForum } from "../ForumContext";

/* Right-column "How it works" panel — ported pixel-for-pixel from the
   fm2-howcol / fm2-how / fm2-step system in ShikshaCom Forum.html. Renders
   in place of the trending/tags widgets so the forum matches the mockup. */

const STEPS = [
  {
    n: "Step 1",
    t: "Ask your question",
    d: "Post about anything that's on your mind — tech, careers, health, hobbies, or any topic at all.",
    bg: "linear-gradient(150deg,#eaf5ec,#d6efdc)",
    delay: ".05s",
  },
  {
    n: "Step 2",
    t: "Get helpful answers",
    d: "Community members share explanations, experience, and ideas. Check sources and ask follow-up questions.",
    bg: "linear-gradient(150deg,#fdf0dd,#ffe4c2)",
    delay: ".15s",
  },
  {
    n: "Step 3",
    t: "Vote & discuss",
    d: "Upvote what's useful, reply, and keep the conversation going with the community.",
    bg: "linear-gradient(150deg,#e6f1fb,#d4e8f7)",
    delay: ".25s",
  },
  {
    n: "Step 4",
    t: "Follow & grow",
    d: "Save answers, follow the topics you love, and never miss what matters to you.",
    bg: "linear-gradient(150deg,#f0eafb,#e2d6f5)",
    delay: ".35s",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const { requireAuth } = useForum();

  const openAsk = () => { if (!requireAuth()) navigate("/forum/ask"); };

  return (
    <aside className="fm2-howcol">
      <div className="fm2-how">
        <div className="fm2-how-hd">
          <h3 className="fm2-how-title">How it works</h3>
          <p className="fm2-how-sub">Four simple steps to join the conversation on any topic.</p>
        </div>
        <div className="fm2-how-body">
          {STEPS.map((s, index) => (
            <div key={s.n} className="fm2-step" style={{ animationDelay: s.delay }}>
              <div className="fm2-step-img" style={{ background: s.bg }}><StepIllustration step={index} /></div>
              <div className="fm2-step-n">{s.n}</div>
              <p className="fm2-step-t">{s.t}</p>
              <p className="fm2-step-d">{s.d}</p>
            </div>
          ))}
        </div>
        <button className="fm2-how-cta" onClick={openAsk}>
          Ask your first question
          <ScribbleIcon name="arrow-right" size={15} />
        </button>
      </div>
    </aside>
  );
}
