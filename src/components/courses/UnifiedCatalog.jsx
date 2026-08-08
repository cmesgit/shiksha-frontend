// PLACEMENT: src/components/courses/UnifiedCatalog.jsx
//
// Card-grid + sticky filter-panel catalog (board segmented control, class
// and stream chips, search, sort, applied-filter chips, mobile drawer) and
// a lightweight course quick-view modal. Replaces the earlier accordion-row
// list — same UX family the design handoff in ~/Downloads proposed, ported
// onto this app's real --sk-* tokens and real data only: no fabricated
// ratings, learner counts, or stock photos. subjectCount/mrp/discountLabel/
// badge/isComingSoon are real Course fields already editable in the Admin
// CMS (usePublicCourses.js's shapeClass) that had no UI reading them until
// this pass.
//
// Board/expand/search state is still owned by the parent (Courses.jsx) so
// its showcase-deep-link and direct-slug-visit effects keep driving this
// component unchanged — `expandedClassId`/`onToggleExpand` are repurposed
// from "which row is expanded in place" to "which class's quick-view modal
// is open," but the prop shape and every existing caller are untouched.
// Class/stream/sort filters and the modal's own open state are new,
// UI-local concerns owned here, same split as before this redesign.

import { useEffect, useMemo, useRef, useState } from 'react';
import { isBoardLocked, useCrossBoardMatches } from '../../hooks/usePublicCourses';
import { submitBoardNotify } from '../../api/coursesApi';
import '../../css/UnifiedCatalog.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ChevronIcon = ({ expanded }) => (
  <span className={`uc-chevron${expanded ? ' uc-chevron--open' : ''}`}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </span>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round">
    <path d="M3 6h18M7 12h10M10 18h4" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const GROUP_LABELS = { CENTRAL: 'Central Board', STATE: 'State Board' };
const CHIP_CAP = 6;
const SORTS = [
  { value: 'rec', label: 'Recommended' },
  { value: 'fee-asc', label: 'Lowest fee' },
  { value: 'fee-desc', label: 'Highest fee' },
];
// Streams only apply to the senior classes — the chip row hides itself for
// everything else rather than showing three chips that always no-op.
const SENIOR_TITLES = ['Class 11', 'Class 12'];

function feeNumber(feeStr) {
  const n = parseInt(String(feeStr).replace(/[^\d]/g, ''), 10);
  return Number.isNaN(n) ? 0 : n;
}

function BoardChip({ board, boards, selectedBoard, onSelectBoard, onLockedClick }) {
  const locked = isBoardLocked(boards, board.slug, false);
  const active = board.slug === selectedBoard;
  return (
    <button
      type="button"
      className={`uc-fopt${active ? ' uc-fopt--on' : ''}`}
      disabled={locked}
      title={board.name}
      onClick={() => (locked ? onLockedClick(board) : onSelectBoard(board.slug))}
    >
      <span className="uc-fradio"><CheckIcon /></span>
      <b>{board.name}</b>
      {locked && <span className="uc-fsoon">Soon</span>}
    </button>
  );
}

function BoardGroupSection({ type, groupBoards, boards, selectedBoard, onSelectBoard, onLockedClick, expanded, onToggle }) {
  const [showAll, setShowAll] = useState(false);
  if (groupBoards.length === 0) return null;

  const capped = groupBoards.slice(0, CHIP_CAP);
  const selectedBeyondCap =
    !capped.some((b) => b.slug === selectedBoard) && groupBoards.some((b) => b.slug === selectedBoard);
  const revealAll = showAll || selectedBeyondCap;
  const visible = revealAll ? groupBoards : capped;
  const hiddenCount = groupBoards.length - visible.length;

  return (
    <section className="uc-fgroup">
      <button type="button" className="uc-ftitle" aria-expanded={expanded} onClick={onToggle}>
        {GROUP_LABELS[type] || type}
        <ChevronIcon expanded={expanded} />
      </button>
      {expanded && (
        <div className="uc-fbody">
          <div className="uc-flist">
            {visible.map((b) => (
              <BoardChip
                key={b.slug}
                board={b}
                boards={boards}
                selectedBoard={selectedBoard}
                onSelectBoard={onSelectBoard}
                onLockedClick={onLockedClick}
              />
            ))}
          </div>
          {hiddenCount > 0 && (
            <button type="button" className="uc-fmore" onClick={() => setShowAll(true)}>+{hiddenCount} more</button>
          )}
          {showAll && !selectedBeyondCap && groupBoards.length > CHIP_CAP && (
            <button type="button" className="uc-fmore" onClick={() => setShowAll(false)}>Show less</button>
          )}
        </div>
      )}
    </section>
  );
}

function NotifyBanner({ board, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email.trim()) return;
    setStatus('sending');
    const res = await submitBoardNotify(board.id, email.trim());
    if (res.ok) setStatus('sent');
    else { setStatus('error'); setError(res.error || 'Something went wrong.'); }
  };
  const label = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Notify me';

  return (
    <div className="uc-notify">
      <span className="uc-notify__text">Notify me when <b>{board.name}</b> launches</span>
      <input
        type="email" className="uc-notify__input" placeholder="you@email.com" value={email}
        disabled={status === 'sending' || status === 'sent'}
        onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
      />
      <button type="button" className="uc-notify__btn" disabled={status === 'sending' || status === 'sent' || !email.trim()} onClick={submit}>
        {label}
      </button>
      <button type="button" className="uc-notify__close" aria-label="Dismiss" onClick={onClose}>&#10005;</button>
      {status === 'error' && <span className="uc-notify__error">{error}</span>}
    </div>
  );
}

function priceBlock(cls) {
  const showMrp = cls.mrp && cls.mrp !== cls.fee;
  return (
    <div className="uc-price">
      {showMrp && <span className="uc-price__mrp">₹{cls.mrp}</span>}
      <span className="uc-price__now">₹{cls.fee}<small> /month</small></span>
      {cls.discountLabel && <span className="uc-price__discount">{cls.discountLabel}</span>}
    </div>
  );
}

function CourseCard({ cls, board, onOpen, onEnroll, enrollmentStatus }) {
  const isEnrolled = enrollmentStatus === 'APPROVED';
  const isPending = enrollmentStatus === 'PENDING';
  let enrollLabel = 'Enroll now';
  if (isEnrolled) enrollLabel = 'Enrolled';
  else if (isPending) enrollLabel = 'Pending';
  const seatsLow = cls.seatsLeft != null && cls.seatsLeft <= 8;

  return (
    <article className="uc-gridcard" onClick={() => onOpen(cls)}>
      <div className="uc-gridcard__thumb">
        {cls.badge && <span className="uc-gridcard__ribbon">{cls.badge}</span>}
        {cls.image ? (
          <img src={cls.image} alt="" className="uc-gridcard__img" />
        ) : (
          <span className="uc-gridcard__placeholder">{board?.name || 'Course'}</span>
        )}
        {cls.subtitle && <span className="uc-gridcard__pill">{cls.subtitle}</span>}
      </div>
      <div className="uc-gridcard__body">
        <span className="uc-gridcard__board">{board?.name}</span>
        <h3>
          {cls.title}
          {cls.subtitle && <span className="uc-gridcard__sub"> ({cls.subtitle})</span>}
        </h3>
        <div className="uc-gridcard__fact">
          <ClockIcon />
          {cls.duration} · {cls.mode}
          {cls.subjectCount != null && ` · ${cls.subjectCount} subject${cls.subjectCount === 1 ? '' : 's'}`}
        </div>
        {cls.seatsLeft != null && (
          <div className={`uc-gridcard__seats${seatsLow ? ' uc-gridcard__seats--low' : ''}`}>
            {cls.seatsLeft} seat{cls.seatsLeft === 1 ? '' : 's'} left
          </div>
        )}
        <div className="uc-gridcard__spacer" />
        <div className="uc-gridcard__foot">
          {cls.isComingSoon ? (
            <span className="uc-gridcard__soon">Coming Soon</span>
          ) : (
            priceBlock(cls)
          )}
          <button
            type="button"
            className="uc-gridcard__enroll"
            disabled={isPending || cls.isComingSoon}
            onClick={(e) => { e.stopPropagation(); if (!isPending && !cls.isComingSoon) onEnroll(cls); }}
          >
            {cls.isComingSoon ? 'Notify me' : enrollLabel} <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function CourseQuickView({ cls, board, onClose, onSyllabus, onEnroll, enrollmentStatus }) {
  const isPending = enrollmentStatus === 'PENDING';
  if (!cls) return null;

  return (
    <div className="uc-modal" role="dialog" aria-modal="true" aria-labelledby="ucModalTitle">
      <div className="uc-modal__back" onClick={onClose} />
      <div className="uc-modal__box">
        <button type="button" className="uc-modal__x" aria-label="Close" onClick={onClose}>&times;</button>
        <span className="uc-modal__eyebrow">
          {board?.name}{cls.subtitle ? ` · ${cls.subtitle}` : ''}
        </span>
        <h3 id="ucModalTitle">{cls.title}</h3>
        <p className="uc-modal__sub">
          Live classes, tests and notes mapped to the syllabus. <b>₹{cls.fee}</b> a month.
        </p>
        <div className="uc-modal__facts">
          <div className="uc-modal__fact"><span>Duration</span><b>{cls.duration}</b></div>
          <div className="uc-modal__fact"><span>Mode</span><b>{cls.mode}</b></div>
          <div className="uc-modal__fact"><span>Access</span><b>{cls.access}</b></div>
        </div>
        {cls.subjectCount != null && (
          <p className="uc-modal__note">{cls.subjectCount} subject{cls.subjectCount === 1 ? '' : 's'} covered — full chapter-wise breakdown on the syllabus page.</p>
        )}
        <div className="uc-modal__actions">
          <button type="button" className="uc-modal__cancel" onClick={onClose}>Close</button>
          <button type="button" className="uc-modal__ghost" onClick={() => { onClose(); onSyllabus(cls); }}>
            View syllabus
          </button>
          <button
            type="button"
            className="uc-modal__go"
            disabled={isPending || cls.isComingSoon}
            onClick={() => { onClose(); onEnroll(cls); }}
          >
            {cls.isComingSoon ? 'Notify me' : isPending ? 'Pending approval' : 'Enroll now'} <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCards() {
  return (
    <div className="uc-grid">
      {[0, 1, 2].map((i) => <div key={i} className="uc-skeletoncard" />)}
    </div>
  );
}

const UnifiedCatalog = ({
  boards,
  selectedBoard,
  onSelectBoard,
  classes,
  classesLoading,
  search,
  onSearchChange,
  expandedClassId,
  onToggleExpand,
  enrollmentStatusByCourseId,
  onEnroll,
  onSyllabus,
}) => {
  const [notifyBoard, setNotifyBoard] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const autoExpandedForRef = useRef(null);
  const [classFilter, setClassFilter] = useState(null);
  const [streamFilter, setStreamFilter] = useState(null);
  const [sortBy, setSortBy] = useState('rec');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!boards || !selectedBoard || autoExpandedForRef.current === selectedBoard) return;
    autoExpandedForRef.current = selectedBoard;
    const board = boards.find((b) => b.slug === selectedBoard);
    if (board) setExpandedGroup(board.board_type);
  }, [boards, selectedBoard]);

  // A board switch invalidates class/stream filters from the previous
  // board's own class list (e.g. "Class 12" selected, switch to a board
  // with no Class 12 batch yet — silently keeping the filter would just
  // show an empty grid with no obvious reason). Adjusted synchronously
  // during render (React's own recommended pattern for resetting derived
  // state on a prop change) rather than in an effect, which would cost an
  // extra render-then-effect-then-render cascade for the same result.
  const [prevBoardForFilters, setPrevBoardForFilters] = useState(selectedBoard);
  if (selectedBoard !== prevBoardForFilters) {
    setPrevBoardForFilters(selectedBoard);
    setClassFilter(null);
    setStreamFilter(null);
  }

  const toggleGroup = (type) => setExpandedGroup((prev) => (prev === type ? null : type));
  const crossMatches = useCrossBoardMatches(boards, debouncedSearch, selectedBoard);
  const currentBoard = boards?.find((b) => b.slug === selectedBoard) || null;

  const classTitles = useMemo(
    () => Array.from(new Set(classes.map((c) => c.title))),
    [classes]
  );
  const showStreams = classFilter === null || SENIOR_TITLES.includes(classFilter);
  const streamOptions = useMemo(
    () => Array.from(new Set(classes.filter((c) => c.subtitle).map((c) => c.subtitle))),
    [classes]
  );

  const q = search.trim().toLowerCase();
  const visibleClasses = useMemo(() => {
    let list = classes.filter((cls) => {
      if (classFilter && cls.title !== classFilter) return false;
      if (streamFilter && cls.subtitle !== streamFilter) return false;
      if (q) return `${cls.title} ${cls.subtitle || ''}`.toLowerCase().includes(q);
      return true;
    });
    if (sortBy === 'fee-asc') list = list.slice().sort((a, b) => feeNumber(a.fee) - feeNumber(b.fee));
    else if (sortBy === 'fee-desc') list = list.slice().sort((a, b) => feeNumber(b.fee) - feeNumber(a.fee));
    return list;
  }, [classes, classFilter, streamFilter, q, sortBy]);

  const appliedChips = [];
  if (classFilter) appliedChips.push({ label: `Class: ${classFilter}`, clear: () => setClassFilter(null) });
  if (streamFilter) appliedChips.push({ label: `Stream: ${streamFilter}`, clear: () => setStreamFilter(null) });
  if (search.trim()) appliedChips.push({ label: `Search: "${search.trim()}"`, clear: () => onSearchChange('') });

  const resetAll = () => {
    setClassFilter(null);
    setStreamFilter(null);
    setSortBy('rec');
    onSearchChange('');
  };

  const quickViewClass = expandedClassId ? classes.find((c) => c.id === expandedClassId) : null;

  return (
    <div className="uc-page">
      <aside className={`uc-fpanel${drawerOpen ? ' uc-fpanel--open' : ''}`} aria-label="Course filters">
        <div className="uc-fhead">
          <h3><FilterIcon /> Filters</h3>
          <button type="button" className="uc-freset" onClick={resetAll}>Reset</button>
          <button type="button" className="uc-fclose" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>&times;</button>
        </div>

        {boards && (
          <div className="uc-fboards">
            {['CENTRAL', 'STATE'].map((type) => (
              <BoardGroupSection
                key={type}
                type={type}
                groupBoards={boards.filter((b) => b.board_type === type)}
                boards={boards}
                selectedBoard={selectedBoard}
                onSelectBoard={(slug) => { onSelectBoard(slug); setDrawerOpen(false); }}
                onLockedClick={setNotifyBoard}
                expanded={expandedGroup === type}
                onToggle={() => toggleGroup(type)}
              />
            ))}
          </div>
        )}

        {notifyBoard && <NotifyBanner board={notifyBoard} onClose={() => setNotifyBoard(null)} />}

        {classTitles.length > 0 && (
          <section className="uc-fgroup">
            <button type="button" className="uc-ftitle" aria-expanded="true" disabled>Class</button>
            <div className="uc-fbody">
              <div className="uc-fchips">
                <button type="button" className={`uc-pill${classFilter === null ? ' uc-pill--on' : ''}`} onClick={() => setClassFilter(null)}>All</button>
                {classTitles.map((t) => (
                  <button key={t} type="button" className={`uc-pill${classFilter === t ? ' uc-pill--on' : ''}`} onClick={() => setClassFilter((prev) => (prev === t ? null : t))}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {showStreams && streamOptions.length > 0 && (
          <section className="uc-fgroup">
            <button type="button" className="uc-ftitle" aria-expanded="true" disabled>Stream</button>
            <div className="uc-fbody">
              <div className="uc-fchips">
                <button type="button" className={`uc-pill${streamFilter === null ? ' uc-pill--on' : ''}`} onClick={() => setStreamFilter(null)}>All</button>
                {streamOptions.map((s) => (
                  <button key={s} type="button" className={`uc-pill${streamFilter === s ? ' uc-pill--on' : ''}`} onClick={() => setStreamFilter((prev) => (prev === s ? null : s))}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </aside>

      <div className="uc-results">
        <div className="uc-resbar">
          <div className="uc-searchbox">
            <span className="uc-searchbox__icon"><SearchIcon /></span>
            <input
              type="text" className="uc-searchbox__input" placeholder="Search boards or classes…"
              aria-label="Search boards or classes" value={search} onChange={(e) => onSearchChange(e.target.value)}
            />
            {search && (
              <button type="button" className="uc-searchbox__x" aria-label="Clear search" onClick={() => onSearchChange('')}>&times;</button>
            )}
          </div>
          <select className="uc-sortsel" aria-label="Sort courses" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button type="button" className="uc-fbtn" onClick={() => setDrawerOpen(true)}>
            <FilterIcon /> Filters
            {appliedChips.length > 0 && <span className="uc-fbtn__cnt">{appliedChips.length}</span>}
          </button>
        </div>

        <div className="uc-gridhead">
          <div>
            <h2>{currentBoard ? `${currentBoard.name} courses` : 'Courses'}</h2>
            <p>Live classes, tests and notes mapped to the syllabus</p>
          </div>
          <span className="uc-gridhead__tot">
            {classesLoading ? '' : `${visibleClasses.length} batch${visibleClasses.length === 1 ? '' : 'es'}`}
          </span>
        </div>

        {appliedChips.length > 0 && (
          <div className="uc-applied">
            {appliedChips.map((c) => (
              <span key={c.label} className="uc-applied__chip">
                {c.label}
                <button type="button" aria-label={`Remove ${c.label}`} onClick={c.clear}>&times;</button>
              </span>
            ))}
            <button type="button" className="uc-applied__clear" onClick={resetAll}>Clear all</button>
          </div>
        )}

        {q && crossMatches.length > 0 && (
          <div className="uc-cross-matches">
            <div className="uc-cross-matches__label">Also matches in other boards</div>
            <div className="uc-cross-matches__list">
              {crossMatches.map((m) => (
                <button
                  key={`${m.board.slug}-${m.cls.id}`} type="button" className="uc-cross-match"
                  onClick={() => { onSelectBoard(m.board.slug); onToggleExpand(m.cls.id, true); }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {classesLoading ? (
          <SkeletonCards />
        ) : visibleClasses.length === 0 ? (
          <div className="uc-empty">
            <b>No batches match these filters</b>
            Try another class, or switch the board to see what&rsquo;s running.
            <div><button type="button" className="uc-empty__btn" onClick={resetAll}>Clear all filters</button></div>
          </div>
        ) : (
          <div className="uc-grid">
            {visibleClasses.map((cls) => (
              <CourseCard
                key={cls.id}
                cls={cls}
                board={currentBoard}
                onOpen={(c) => onToggleExpand(c.id, true)}
                onEnroll={onEnroll}
                enrollmentStatus={enrollmentStatusByCourseId[cls.courseIds?.[selectedBoard]]}
              />
            ))}
          </div>
        )}
      </div>

      {drawerOpen && <div className="uc-scrim" onClick={() => setDrawerOpen(false)} />}

      {quickViewClass && (
        <CourseQuickView
          cls={quickViewClass}
          board={currentBoard}
          onClose={() => onToggleExpand(null, true)}
          onSyllabus={onSyllabus}
          onEnroll={onEnroll}
          enrollmentStatus={enrollmentStatusByCourseId[quickViewClass.courseIds?.[selectedBoard]]}
        />
      )}
    </div>
  );
};

export default UnifiedCatalog;
