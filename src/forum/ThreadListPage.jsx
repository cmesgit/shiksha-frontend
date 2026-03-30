import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { getThreads } from '../api/forum';
import ThreadCard from './ThreadCard';
import SearchBar from './SearchBar';
import SortSelector from './SortSelector';
import DateFilter from './DateFilter';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import '../css/forum.css';
import '../css/NotificationsPage.css';

const ThreadListPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated;

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotification();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [threads, setThreads] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    search: '',
    date_from: '',
    date_to: '',
    sort: 'newest',
    page: 1,
  });

  useEffect(() => {
    let mounted = true;

    const fetchThreads = async () => {
      setLoading(true);
      try {
        const data = await getThreads(filters);
        if (!mounted) return;
        setThreads(data.results || []);
            setTotalCount(data.count || 0);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchThreads();

    return () => {
      mounted = false;
    };
  }, [filters.search, filters.date_from, filters.date_to, filters.sort, filters.page]);

  return (
    <div className="forum-container">
      <div className="tl-controls">
        <div className="tl-search-wrap">
          <SearchBar
            value={filters.search}
            onChange={(val) => setFilters({ ...filters, search: val, page: 1 })}
          />
        </div>

        <DateFilter
          onChange={(from, to) =>
            setFilters({ ...filters, date_from: from, date_to: to, page: 1 })
          }
        />

        <SortSelector
          value={filters.sort}
          onChange={(val) => setFilters({ ...filters, sort: val, page: 1 })}
        />

        {isLoggedIn && (
          <>
            <button
              className="tl-create-btn"
              onClick={() => navigate('/forum/create')}
            >
              Create Thread
            </button>

            <div className="tl-notification-wrap">
              <button
                className="tl-notification-btn"
                type="button"
                aria-label="Notifications"
                onClick={() => navigate('/forum/notifications')}
              >
                <IoNotificationsOutline />
                {unreadCount > 0 && (
                  <span className="tl-notification-badge">{unreadCount}</span>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="forum-loading">
          <div className="forum-spinner" />
          Loading threads…
        </div>
      ) : (
        <div className="tl-thread-list">
          {threads.length === 0 ? (
            <div className="thread-empty">
              No threads found. Be the first to start a discussion!
            </div>
          ) : (
            threads.map((t) => (
              <ThreadCard key={t.id} thread={t} isLoggedIn={isLoggedIn} />
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalCount > pageSize && (() => {
        const totalPages = Math.ceil(totalCount / pageSize);
        return (
          <div className="notifications-pagination">
            <button
              className="page-btn"
              onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
              disabled={filters.page === 1}
            >
              &larr;
            </button>
            <span>Page {filters.page} of {totalPages}</span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${p === filters.page ? 'active' : ''}`}
                onClick={() => setFilters({ ...filters, page: p })}
              >
                {p}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setFilters({ ...filters, page: Math.min(totalPages, filters.page + 1) })}
              disabled={filters.page === totalPages}
            >
              &rarr;
            </button>
          </div>
        );
      })()}
    </div>
  );
};

export default ThreadListPage;