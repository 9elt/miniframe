import { createNode, State } from "@9elt/miniframe";

export const GETTING_STARTED = "getting-started";
export const DOCUMENTATION = "documentation";
export const EXAMPLES = "examples";

const PAGES = [GETTING_STARTED, DOCUMENTATION, EXAMPLES];

function pathname() {
    return window.location.pathname.split("/").pop()!;
}

function fallback(pathname: string) {
    return PAGES.includes(pathname) ? pathname : GETTING_STARTED;
}

export const page = new State(fallback(pathname()));

page.sub(() => {
    if (!window.location.hash) {
        window.scrollTo(0, 0);
    }
});

page.sub(async (page) => {
    if (page !== pathname()) {
        window.history.pushState(page, '', page);
    }
});

window.onpopstate = () => {
    page.value = fallback(pathname());
};

export const pageTitle = page.as((page) =>
    page === GETTING_STARTED ? "Getting started" :
        page === DOCUMENTATION ? "Documentation" :
            page === EXAMPLES ? "Examples" :
                null
);

document.querySelector("title")?.replaceWith(
    createNode(<title>Miniframe | {pageTitle} </title>)
);
