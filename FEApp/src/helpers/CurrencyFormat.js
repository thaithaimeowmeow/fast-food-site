export default function formatCash(str) {
    // Ensure that the input is treated as a string
    const stringified = String(str);

    return stringified.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev;
    });
}
