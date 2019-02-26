export default function filterContet(str, size) {
    if (str && str.length > size) {
        return str.slice(0, size) + '...';
    } else {
        return str;
    }
}