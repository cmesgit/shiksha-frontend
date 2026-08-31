// PLACEMENT: src/hooks/useEnrollmentStatus.js
//
// One source of truth for "has this learner already got this course?", shared
// by the /courses catalog and the homepage's Featured grid.
//
// It lived inline in Courses.jsx, so the homepage had no access to it and
// rendered a bare "Enroll now" to learners who were already enrolled — the
// catalog got this right and the homepage contradicted it for the same course.
// Extracted rather than copied: two divergent copies of this merge is exactly
// how the two surfaces drifted apart in the first place.

import { useCallback, useEffect, useState } from "react";

import { getMyEnrollmentRequests } from "../api/enrollments";
import { getMyEnrolledCourses } from "../api/coursesApi";

// A course can hold several requests over time; the furthest-along one wins.
const PRIORITY = { APPROVED: 3, PENDING: 2, REJECTED: 1 };

/**
 * @param {boolean} isAuthenticated — from useAuth(). Anonymous visitors get an
 *   empty map and no requests are made at all, which is what keeps this safe to
 *   call from the public homepage.
 * @returns {{statusByCourseId: Record<string,string>, markApproved: (id:string)=>void}}
 */
export default function useEnrollmentStatus(isAuthenticated) {
  const [statusByCourseId, setStatusByCourseId] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      setStatusByCourseId({});
      return undefined;
    }

    let cancelled = false;

    // Two independent sources, merged: the manual-UPI review queue
    // (EnrollmentRequest, via /enrollments/requests/mine/) and the learner's
    // real active enrollments (/courses/my/). A free-enroll writes only the
    // latter — FreeEnrollView creates an Enrollment/Subscription directly and
    // never touches EnrollmentRequest — so relying on the request queue alone
    // makes a free-enrolled course look un-enrolled forever. Real enrollment
    // always wins as APPROVED.
    Promise.all([getMyEnrollmentRequests(), getMyEnrolledCourses()])
      .then(([reqData, enrolled]) => {
        if (cancelled) return;

        const list = Array.isArray(reqData) ? reqData : reqData?.results || [];
        const map = {};

        for (const req of list) {
          const cid = req?.course?.id;
          if (!cid) continue;
          const existing = map[cid];
          if (!existing || (PRIORITY[req.status] || 0) > (PRIORITY[existing] || 0)) {
            map[cid] = req.status;
          }
        }

        for (const course of enrolled) {
          if (course?.id) map[course.id] = "APPROVED";
        }

        setStatusByCourseId(map);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  // Called the instant a free-enroll succeeds, so the grid reflects it even if
  // the learner closes the popup instead of clicking through to "Start
  // Learning" — otherwise the map is only refreshed on load/auth change and the
  // button would still invite a re-enroll.
  const markApproved = useCallback((courseId) => {
    setStatusByCourseId((prev) => ({ ...prev, [courseId]: "APPROVED" }));
  }, []);

  return { statusByCourseId, markApproved };
}
