import { DOCUMENTATION, EXAMPLES } from "../global/page";
import { Footer } from "./footer";
import { Link } from "./link";
import { Section } from "./section";
import { CreateElementSnippet } from "./snippets/create-element";
import { CreateNodeSnippet } from "./snippets/create-node";
import { StateSnippet } from "./snippets/state";
import { TsconfigExampleSnippet } from "./snippets/tsconfig.example";

const Arrow = (
    <svg
        namespaceURI="http://www.w3.org/2000/svg"
        viewBox="0 0 5 6"
        width="9"
        fill="none"
        stroke="currentColor"
    >
        <path
            namespaceURI="http://www.w3.org/2000/svg"
            d="M1,1 3,3 1,5"
        />
    </svg>
);

export const GettingStarted = (
    <div className="inner-page">
        <ol>
            <li>
                <Link href="#introduction">Introduction</Link>
            </li>
            <li>
                <Link href="#quick-start">Quick start</Link>
            </li>
            <li>
                <Link href="#manual-installation">Manual installation</Link>
            </li>
        </ol>
        <div className="inner-main">
            <Section id="introduction" title="Introduction">
                <p>
                    Miniframe is a better version of <code>document.createElement</code> with
                    support for JSX and minimal state management in 500 lines of code.
                    It was created for people that like vanilla JS and enjoy rolling out their
                    own code, but don't like how convoluted and inconvenient it is to create
                    and manage html elements.
                </p>
                <p>
                    It provides a <code>createNode</code> function
                </p>
                <div className="compare-snippets">
                    <div>
                        <small>vanilla js</small>
                        <CreateElementSnippet />
                    </div>
                    <div>
                        <small>@9elt/miniframe</small>
                        <CreateNodeSnippet />
                    </div>
                </div>
                <p>
                    And a <code>State</code> class to easily control the nodes
                </p>
                <StateSnippet />
                <div className="button-list">
                    <Link href={"/" + DOCUMENTATION}>
                        <button className="btn">
                            Documentation {Arrow}
                        </button>
                    </Link>
                    <Link href={"/" + EXAMPLES}>
                        <button className="btn">
                            Examples {Arrow}
                        </button>
                    </Link>
                </div>
            </Section >
            <Section id="quick-start" title="Quick start">
                <p>
                    Quickly start a project with
                </p>
                <pre className="snippet">
                    npx @9elt/miniframe
                </pre>
            </Section>
            <Section id="manual-installation" title="Manual installation">
                <p>
                    Install the latest version form npm
                </p>
                <pre className="snippet">
                    npm i @9elt/miniframe
                </pre>
                <p>
                    To enable JSX add to your <code>tsconfig.json</code>
                </p>
                <TsconfigExampleSnippet />
            </Section>
            {Footer}
        </div>
    </div >
);
