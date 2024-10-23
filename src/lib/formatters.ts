function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    year: options.year ?? "numeric",
    month: options.month ?? "numeric",
    day: options.day ?? "numeric",
    ...options,
  }).format(new Date(date))
}

export { formatDate }
