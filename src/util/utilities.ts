// Sets target="_blank" rel="noopener noreferrer" on external links
export const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
        allLinks.forEach(link => {
            if (link.host !== window.location.host) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
        });
    }
};

export const inlineLinks = (className: string) => {
    const elements = Array.from(document.getElementsByClassName(className));
    const allLinks = Array<HTMLElement[]>();
    elements.forEach(el => allLinks.push(Array.from(el.getElementsByTagName('a'))));
    if (allLinks.length > 0) {
        allLinks.forEach(links => {
            links.forEach(link => link.classList.add('inline-link'));
        });
    }
};

export const urlize = (term: string): string => {
    return term.trim().toLowerCase().replace(/\s+/g, '-');
};
//@ts-ignore
export const isClient = (): boolean => process.isClient;
//@ts-ignore
export const isServer = (): boolean => process.isServer;

export const addEventToClassName = (className: string, func: Function, event: string = "click"): void => {
    if (isClient()) {
        const elements = Array.from(document.getElementsByClassName(className));
        elements.forEach(element => element.addEventListener(event, () => func()));
    }
};
