export default function getLiveDuration(duration) {
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} menit`;
    } else {
      return `${hours} jam ${remainingMinutes} menit`;
    }
  };

