function DateObjectFromObject(timestamp) {
  const milliseconds =
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000;
  const dateObject = new Date(milliseconds);
  return dateObject;
}

export default DateObjectFromObject;
