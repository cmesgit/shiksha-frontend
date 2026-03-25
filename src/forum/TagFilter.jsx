import React, { useEffect, useState } from 'react';
import { getTags } from '../api/forum';

const TagFilter = ({ value = '', onChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      try {
        const res = await getTags();
        if (!mounted) return;
        setTags(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
    return () => { mounted = false; };
  }, []);

  return (
    <select className="forum-select" value={value} onChange={e => onChange(e.target.value)}>
     </select>
  );
};

export default TagFilter;
