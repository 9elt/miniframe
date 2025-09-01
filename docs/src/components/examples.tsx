import { createNode } from "@9elt/miniframe";
import { Counter } from "./example.counter";
import { Pokemon } from "./example.pokeapi";
import { Link } from "./link";
import { Section } from "./section";
import { ExampleCounterSnippet } from "./snippets/example.counter";
import { ExamplePokeapiSnippet } from "./snippets/example.pokeapi";
import { Spacer } from "./spacer";
import { Footer } from "./footer";

export const Examples = (
    <div className="inner-page">
        <ol>
            <li>
                <Link href="#example-counter">Counter</Link>
            </li>
            <li>
                <Link href="#example-pokeapi">PokéAPI</Link>
            </li>
            <li>
                <Link href="#need-more">Need more?</Link>
            </li>
        </ol>
        <div className="inner-main">
            <Section id="example-counter" title="Counter">
                <p>A simple counter that stops at 10</p>
                <ExampleCounterSnippet />
                <div className="hr" />
                <RunSnippet>
                    <Counter />
                </RunSnippet>
            </Section>
            <Spacer />
            <Section id="example-pokeapi" title="PokéAPI">
                <p>Fetch pokemon information using <Link href="https://pokeapi.co/docs/v2">PokéAPI</Link></p>
                <ExamplePokeapiSnippet />
                <div className="hr" />
                <RunSnippet>
                    <Pokemon />
                </RunSnippet>
            </Section>
            <Spacer />
            <Section id="need-more" title="Need more?">
                <p>
                    This very documentation was written using miniframe.
                    Check it out on <Link href="https://github.com/9elt/miniframe/tree/main/docs">GitHub</Link>
                </p>
            </Section>
            {Footer}
        </div>
    </div>
);

function RunSnippet({ children }: { children: any; }) {
    const snippet = createNode<any>(<div className="snippet" />);

    const shadow = snippet.attachShadow({ mode: "open" });
    shadow.appendChild(
        createNode(
            Array.isArray(children)
                ? <div>{children}</div>
                : children
        )
    );

    return snippet;
}
