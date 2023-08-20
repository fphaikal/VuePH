import { formatDistanceToNow } from 'date-fns';

export default function formatTimeAgo(dateTime) {
  const timeDifference = new Date(dateTime);
  const now = new Date();
  const diffInMilliseconds = now - timeDifference;

  const units = [
    { value: 31536000000, label: 'year' },
    { value: 2592000000, label: 'month' },
    { value: 604800000, label: 'week' },
    { value: 86400000, label: 'day' },
    { value: 3600000, label: 'hour' },
    { value: 60000, label: 'minute' },
    { value: 1000, label: 'second' },
  ];

  for (const unit of units) {
    if (diffInMilliseconds >= unit.value) {
      const value = Math.floor(diffInMilliseconds / unit.value);
      return `${value} ${unit.label}${value !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
