import { useEffect } from 'react';
import { PageMeta } from '../types';

export function SEO({ title, description, ogImage, canonical, keywords }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'keywords',
        content: keywords || '',
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
    ];

    if (ogImage) {
      metaTags.push({
        property: 'og:image',
        content: ogImage,
      });
    }

    metaTags.forEach((tag) => {
      let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);

      if (!element) {
        element = document.createElement('meta');
        if (tag.name) {
          element.setAttribute('name', tag.name);
        } else if (tag.property) {
          element.setAttribute('property', tag.property);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', tag.content);
    });

    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    return () => {
      metaTags.forEach((tag) => {
        const element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
        if (element) {
          element.remove();
        }
      });
    };
  }, [title, description, ogImage, canonical, keywords]);

  return null;
}
