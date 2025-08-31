import { State } from "@9elt/miniframe";
import { DOCUMENTATION, EXAMPLES, GETTING_STARTED, page, pageTitle } from "../global/page";
import { VERSION } from "../version";
import { Link } from "./link";
import { NPMLogo } from "./logos";

const mouse = new State({ x: 0, y: 0, yR: 1 });

window.addEventListener("mousemove", (e) => {
    mouse.value.x = Math.round(e.clientX * 100 / document.body.clientWidth);
    mouse.value.y = Math.round(e.clientY * 100 / document.body.clientHeight);
    mouse.value = mouse.value;
});

let header: HTMLElement;
export const Header = (
    <header style={{
        backgroundImage: mouse.as((p) => {
            header ||= document.querySelector("header")!;
            const yR = (header?.clientHeight || 70) / document.body.clientHeight;
            return `radial-gradient(circle at ${p.x}% ${p.y / yR}%, var(--highlight-2-10) 0%, var(--lighter-shadow) 400px`
        })
    }}>
        <div className="main flex">
            <h1>
                <span className="logo" >
                    <Link href={"/" + GETTING_STARTED}>
                        Miniframe
                    </Link>
                    <small className="version">
                        <Link href="https://www.npmjs.com/package/@9elt/miniframe">
                            {NPMLogo}{VERSION}
                        </Link>
                    </small>
                </span>
                <span className="light"> | </span>
                <span className="light">{pageTitle}</span>
            </h1>
            <nav>
                <Link href={"/" + GETTING_STARTED} className={page.as((page) =>
                    page === GETTING_STARTED ? "tab active" : "tab")
                }>
                    <button>
                        Getting started
                    </button>
                </Link>
                <Link href={"/" + DOCUMENTATION} className={page.as((page) =>
                    page === DOCUMENTATION ? "tab active" : "tab")
                }>
                    <button>
                        Documentation
                    </button>
                </Link>
                <Link href={"/" + EXAMPLES} className={page.as((page) =>
                    page === EXAMPLES ? "tab active" : "tab")
                }>
                    <button>
                        Examples
                    </button>
                </Link>
            </nav>
        </div>
    </header>
);
