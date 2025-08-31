import { createNode, State } from "@9elt/miniframe";

export const GETTING_STARTED = "getting-started";
export const DOCUMENTATION = "documentation";
export const EXAMPLES = "examples";

function pathname() {
    return window.location.pathname.slice(1);
}

export const page = new State(pathname() || GETTING_STARTED);

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
    page.value = pathname();
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
