export const getDomain = (url: string) => {
    try {
        const domain = new URL(url).hostname;
        return domain;
    } catch {
        return undefined;
    }
};
