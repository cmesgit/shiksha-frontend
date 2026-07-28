// PLACEMENT: src/components/courses/UnifiedCatalog.jsx
//
// Replaces the old Boards -> board-type -> board -> class drill-down with a
// single page: board chips as instant filters + a scrollable class list
// where picking a class expands its details in place. No page navigation,
// no pushState, no lost scroll position for any of board switch / search /
// expand-collapse — only "Syllabus" (handled by the parent via onSyllabus)
// still navigates, to a real shareable /courses/:slug URL.
//
// Board/expand/search state is owned by the parent (Courses.jsx) so its
// showcase-deep-link and direct-slug-visit effects can drive this component;
// this file only owns UI-local concerns: the notify-me banner and the
// debounce timer for cross-board search.

import { useEffect, useState } from 'react';
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

const GROUP_LABELS = { CENTRAL: 'Central Board', STATE: 'State Board' };

function BoardChip({ board, boards, selectedBoard, onSelectBoard, onLockedClick }) {
  const locked = isBoardLocked(boards, board.slug, false);
  const active = board.slug === selectedBoard;
  return (
    <button
      type="button"
      className={`uc-chip${active ? ' uc-chip--active' : ''}${locked ? ' uc-chip--locked' : ''}`}
      aria-pressed={active}
      aria-disabled={locked}
      onClick={() => (locked ? onLockedClick(board) : onSelectBoard(board.slug))}
    >
      {board.name}
      {locked && <em className="uc-chip__soon">soon</em>}
    </button>
  );
}

function BoardGroupSection({ type, groupBoards, boards, selectedBoard, onSelectBoard, onLockedClick, expanded, onToggle }) {
  if (groupBoards.length === 0) return null;
  return (
    <div className="uc-board-group">
      <button
        type="button"
        className="uc-board-group__header"
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span className="uc-board-group__label">{GROUP_LABELS[type] || type}</span>
        <span className="uc-board-group__count">{groupBoards.length}</span>
        <ChevronIcon expanded={expanded} />
      </button>
      {expanded && (
        <div className="uc-chip-row">
          {groupBoards.map((b) => (
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
      )}
    </div>
  );
}

function NotifyBanner({ board, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email.trim()) return;
    setStatus('sending');
    const res = await submitBoardNotify(board.id, email.trim());
    if (res.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
      setError(res.error || 'Something went wrong.');
    }
  };

  const label = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Notify me';

  return (
    <div className="uc-notify">
      <span className="uc-notify__text">
        Notify me when <b>{board.name}</b> launches
      </span>
      <input
        type="email"
        className="uc-notify__input"
        placeholder="you@email.com"
        value={email}
        disabled={status === 'sending' || status === 'sent'}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === 'error') setStatus('idle');
        }}
      />
      <button
        type="button"
        className="uc-notify__btn"
        disabled={status === 'sending' || status === 'sent' || !email.trim()}
        onClick={submit}
      >
        {label}
      </button>
      <button type="button" className="uc-notify__close" aria-label="Dismiss" onClick={onClose}>
        &#10005;
      </button>
      {status === 'error' && <span className="uc-notify__error">{error}</span>}
    </div>
  );
}

function ClassRow({ cls, expanded, onToggle, onEnroll, onSyllabus, enrollmentStatus }) {
  const isEnrolled = enrollmentStatus === 'APPROVED';
  const isPending = enrollmentStatus === 'PENDING';
  let enrollLabel = 'Enroll now';
  if (isEnrolled) enrollLabel = 'Enrolled';
  else if (isPending) enrollLabel = 'Pending approval';

  const seatsLow = cls.seatsLeft != null && cls.seatsLeft <= 8;

  return (
    <div className="uc-class-row">
      <button
        type="button"
        className="uc-class-row__header"
        aria-expanded={expanded}
        onClick={() => onToggle(cls.id)}
      >
        <span className="uc-class-row__imageWrap">
          {cls.image ? (
            <img src={cls.image} alt="" className="uc-class-row__image" />
          ) : (
            <span className="uc-class-row__imagePlaceholder">Course Image</span>
          )}
        </span>
        <span className="uc-class-row__text">
          <b className="uc-class-row__title">
            {cls.title}
            {cls.subtitle && <span className="uc-class-row__subtitle"> ({cls.subtitle})</span>}
          </b>
          <span className="uc-class-row__meta">
            ₹{cls.fee}/month · {cls.mode}
            {cls.seatsLeft != null && (
              <>
                {' · '}
                <span className={`uc-class-row__seats${seatsLow ? ' uc-class-row__seats--low' : ''}`}>
                  {cls.seatsLeft} seat{cls.seatsLeft === 1 ? '' : 's'} left
                </span>
              </>
            )}
          </span>
        </span>
        <ChevronIcon expanded={expanded} />
      </button>

      {expanded && (
        <div className="uc-class-row__detail">
          <div className="uc-class-row__detailItem">
            <span>Duration</span>
            <strong>{cls.duration}</strong>
          </div>
          <div className="uc-class-row__detailItem">
            <span>Access</span>
            <strong>{cls.access}</strong>
          </div>
          <div className="uc-class-row__actions">
            <button
              type="button"
              className="uc-btn uc-btn--primary"
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                if (!isPending) onEnroll(cls);
              }}
            >
              {enrollLabel}
            </button>
            <button
              type="button"
              className="uc-btn uc-btn--secondary"
              onClick={(e) => {
                e.stopPropagation();
                onSyllabus(cls);
              }}
            >
              Syllabus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="uc-class-list">
      {[0, 1, 2].map((i) => (
        <div key={i} className="uc-skeleton-row" />
      ))}
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
  // Which board-type sections (CENTRAL/STATE) are expanded — a Set so the
  // user can have both open at once; starts empty and picks up the current
  // board's group automatically below, without ever forcing a
  // manually-opened section shut.
  const [expandedGroups, setExpandedGroups] = useState(() => new Set());

  // Only the cross-board fetch needs debouncing (network calls per
  // keystroke would be wasteful) — the current board's list filters
  // instantly client-side below, same as before this redesign.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Whenever the selected board belongs to a section that isn't open yet,
  // open it — covers first load, a cross-board-match click, and a navbar
  // deep-link landing on a board in the other group.
  useEffect(() => {
    if (!boards || !selectedBoard) return;
    const board = boards.find((b) => b.slug === selectedBoard);
    if (!board || expandedGroups.has(board.board_type)) return;
    setExpandedGroups((prev) => new Set(prev).add(board.board_type));
  }, [boards, selectedBoard, expandedGroups]);

  const toggleGroup = (type) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const crossMatches = useCrossBoardMatches(boards, debouncedSearch, selectedBoard);

  const q = search.trim().toLowerCase();
  const visibleClasses = q
    ? classes.filter((cls) => `${cls.title} ${cls.subtitle || ''}`.toLowerCase().includes(q))
    : classes;

  return (
    <div className="uc-card">
      <div className="uc-card__header">
        <h1 className="uc-card__title">Courses</h1>
        <p className="uc-card__subtitle">Pick a board, then a class — everything else stays on this page.</p>
      </div>

      <div className="uc-card__filters">
        <div className="uc-search-box">
          <span className="uc-search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="uc-search-input"
            placeholder="Search boards or classes…"
            aria-label="Search boards or classes"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {boards && (
          <div className="uc-board-groups">
            {['CENTRAL', 'STATE'].map((type) => (
              <BoardGroupSection
                key={type}
                type={type}
                groupBoards={boards.filter((b) => b.board_type === type)}
                boards={boards}
                selectedBoard={selectedBoard}
                onSelectBoard={onSelectBoard}
                onLockedClick={setNotifyBoard}
                expanded={expandedGroups.has(type)}
                onToggle={() => toggleGroup(type)}
              />
            ))}
          </div>
        )}

        {notifyBoard && <NotifyBanner board={notifyBoard} onClose={() => setNotifyBoard(null)} />}

        {q && crossMatches.length > 0 && (
          <div className="uc-cross-matches">
            <div className="uc-cross-matches__label">Also matches in other boards</div>
            <div className="uc-cross-matches__list">
              {crossMatches.map((m) => (
                <button
                  key={`${m.board.slug}-${m.cls.id}`}
                  type="button"
                  className="uc-cross-match"
                  onClick={() => {
                    onSelectBoard(m.board.slug);
                    onToggleExpand(m.cls.id, true);
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {classesLoading ? (
          <SkeletonRows />
        ) : (
          <div className="uc-class-list">
            {visibleClasses.map((cls) => (
              <ClassRow
                key={cls.id}
                cls={cls}
                expanded={expandedClassId === cls.id}
                onToggle={onToggleExpand}
                onEnroll={onEnroll}
                onSyllabus={onSyllabus}
                enrollmentStatus={enrollmentStatusByCourseId[cls.courseIds?.[selectedBoard]]}
              />
            ))}
            {visibleClasses.length === 0 && (
              <p className="uc-empty">No match for &ldquo;{search.trim()}&rdquo;.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedCatalog;
