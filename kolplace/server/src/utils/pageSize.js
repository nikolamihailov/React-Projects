// Page size requested by the client (?itemsPerPage=), kept within sane bounds
// so a request cannot pull a whole collection in one go.
const MAX_PAGE_SIZE = 48;

exports.parsePageSize = (value, fallback) => {
    const size = Number.parseInt(value, 10);
    if (!Number.isInteger(size) || size < 1) return fallback;
    return Math.min(size, MAX_PAGE_SIZE);
};
