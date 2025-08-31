import { Mini } from "@9elt/miniframe";
import { highlight } from "../util/dom";
import { page } from "../global/page";

export function Link({ href, warning, children, ...props }: {
    href: string;
    warning?: true;
} & Partial<Mini.HTMLAnchorElement>) {
    return href.startsWith("#")
        ? (
            <a
                className={warning && "warning"}
                href={href}
                onclick={(e) => {
                    e.preventDefault();
                    window.location.hash = href;
                    highlight(document.querySelector(href)!);
                }}
                {...props}
            >
                {warning && TriangleIcon} {children}
            </a>
        )
        : href.startsWith("/")
            ? (
                <a
                    className={warning && "warning"}
                    href={href}
                    onclick={(e) => {
                        e.preventDefault();

                        const [url, hash] = href.slice(1).split("#");
                        page.value = url;

                        if (hash) {
                            window.location.hash = hash;
                            highlight(document.querySelector("#" + hash)!);
                        }
                    }}
                    {...props}
                >
                    {warning && TriangleIcon} {children}
                </a>
            )
            : (
                <a
                    className={warning && "warning"}
                    href={href}
                    target="_blank"
                    {...props}
                >
                    {warning && TriangleIcon} {children}
                </a>
            );
}

const TriangleIcon = (
    <svg
        namespaceURI="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 66 52"
    >
        <path
            namespaceURI="http://www.w3.org/2000/svg"
            fill="none"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="currentColor"
            d="M3,52 33,0 63,52z"
        />
        <path
            namespaceURI="http://www.w3.org/2000/svg"
            fill="currentColor"
            d="M28,20 38,20 33,42z"
        />
        <circle
            namespaceURI="http://www.w3.org/2000/svg"
            fill="currentColor"
            cx="33"
            cy="42"
            r="4"
        />
    </svg>
);
