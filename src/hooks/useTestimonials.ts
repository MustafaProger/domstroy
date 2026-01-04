import { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { testimonialService } from '../services/api';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await testimonialService.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
