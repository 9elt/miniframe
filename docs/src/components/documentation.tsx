import { Link } from "./link";
import { Section } from "./section";
import { AsyncLimitationsSafeAsSnippet } from "./snippets/async.limitations.safe.as";
import { AsyncLimitationsUnsafeAsSnippet } from "./snippets/async.limitations.unsafe.as";
import { ComponentsSnippet } from "./snippets/components";
import { GlobalStateSnippet } from "./snippets/global.state";
import { GlobalStateLimitationsSnippet } from "./snippets/global.state.limitations";
import { GlobalStateLimitationsSafeSnippet } from "./snippets/global.state.limitations.safe";
import { PolyfillSnippet } from "./snippets/polyfill";
import { PromisesSnippet } from "./snippets/promises";
import { StateTransformSnippet } from "./snippets/state.transform";
import { SyncStateSnippet } from "./snippets/sync.state";
import { Spacer } from "./spacer";

export const Documentation = (
    <div>
        <ol>
            <li>
                <Link href="#old-browsers-support" warning>Old Browsers Support</Link>
            </li>
            <li>
                <Link href="#components">Components</Link>
            </li>
            <li>
                <Link href="#transforming-state">Transforming State</Link>
            </li>
            <li>
                <Link href="#synchronizing-state">Synchronizing State</Link>
            </li>
            <li>
                Global State
                <ol>
                    <li>
                        <Link href="#global-state">Global State</Link>
                    </li>
                    <li>
                        <Link href="#global-state-limitations" warning>Global State Limitations</Link>
                    </li>
                </ol>
            </li>
            <li>
                Async State
                <ol>
                    <li>
                        <Link href="#async-state">Async State</Link>
                    </li>
                    <li>
                        <Link href="#async-state-limitations" warning>Async State Limitations</Link>
                    </li>
                </ol>
            </li>
        </ol>
        <Spacer />
        <Section id="old-browsers-support" title="Old Browsers Support" warning>
            <p>
                Miniframe uses modern JS features such as{" "}
                <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef"><code>WeakRef</code></Link>{" "}
                and <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry"><code>FinalizationRegistry</code></Link>{" "}
                that were implemented in Chrome 84 (July 2020) and Firefox 79 (July 2020).
            </p>
            <p>
                If you want to use Miniframe in older browsers a polyfill is available:
            </p>
            <PolyfillSnippet />
            <p>
                This polyfill will introduce some limitations on{" "}
                <Link href="#global-state-limitations">global states usage</Link>.
            </p>
        </Section>
        <Spacer />
        <Section id="components" title="Components">
            <p>Functions that take one object as an argument can be used as components:</p>
            <ComponentsSnippet />
        </Section>
        <Spacer />
        <Section id="transforming-state" title="Transforming State">
            <p>
                <code>State</code> can be transformed using the <code>State.as</code> method
            </p>
            <StateTransformSnippet />
        </Section>
        <Section id="synchronizing-state" title="Synchronizing State">
            <p>
                Multiple states can be synchronized using <code>State.merge</code> static method:
            </p>
            <SyncStateSnippet />
        </Section>
        <Section id="global-state" title="Global State">
            <p>
                <code>State</code> can be used freely at any level:
            </p>
            <GlobalStateSnippet />
            <Section id="global-state-limitations" title="Global State Limitations" warning>
                <p>
                    When using global state with <Link href="#old-browsers-support">this polyfill</Link>,
                    on old browsers, Miniframe won't be able to properly cleanup unused nodes.
                </p>
                <div className="compare-snippets">
                    <div>
                        <small>UNSAFE</small>
                        <GlobalStateLimitationsSnippet />
                    </div>
                    <div>
                        <small>BEST PRACTICE</small>
                        <GlobalStateLimitationsSafeSnippet />
                    </div>
                </div>
            </Section>
        </Section>
        <Section id="async-state" title="Async State">
            <p><code>Promise</code> states can be awaited:</p>
            <PromisesSnippet />
            <p>
                Check out the <Link href="/examples#example-pokeapi">PokéAPI example</Link>{" "}
                that uses async state.
            </p>
            <Section id="async-state-limitations" title="Async State Limitations" warning>
                <p>
                    During async code execution it is impossible to track all state
                    dependents, meaning some may not be cleaned up when needed.
                </p>
                <p>
                    To avoid this, it is very important that <code>State.as</code> and{" "}
                    <code>State.sub</code>, when called with an async callback, never
                    contain nested <code>State.as</code>, <code>State.sub</code> or{" "}
                    <code>State.merge</code> calls.
                </p>
                <div className="compare-snippets">
                    <div>
                        <small>UNSAFE</small>
                        <AsyncLimitationsUnsafeAsSnippet />
                    </div>
                    <div>
                        <small>BEST PRACTICE</small>
                        <AsyncLimitationsSafeAsSnippet />
                    </div>
                </div>
            </Section>
        </Section>
    </div>
);
