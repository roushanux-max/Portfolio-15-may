import { useState, useEffect } from 'react';
import { sampleContent } from '../data/sampleContent';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/framer-content.json');
        if (!res.ok) throw new Error('Production content not found');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log('Using sample data for development');
        setData(sampleContent);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};
