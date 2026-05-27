// Premium date utilities for human-friendly timelines

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 0) return 'just now'; // Time skew safeguard
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) return 'just now';
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    if (hours === 0) return `${minutes}m ago`;
    return `${hours}h ago`;
  }
  
  const days = Math.floor(hours / 24);
  if (days < 7) {
    if (days === 1) return 'yesterday';
    return `${days}d ago`;
  }

  // Standard absolute date fallback
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
