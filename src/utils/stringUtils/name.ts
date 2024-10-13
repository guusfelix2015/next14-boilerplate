export const getInitials = (name: string, size = 2) => {
    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("");
    if (initials.length > size) {
        return initials.slice(0, size);
    }
    return initials;
};
