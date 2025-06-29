export function getCurrentDateAndTime(): string {
    const now = new Date();
    const year = now.getFullYear(); // Full year (4 digits)
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return mysqlDateTime;
}