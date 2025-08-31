import { DOCUMENTATION, EXAMPLES, GETTING_STARTED, page } from "../global/page";
import { Documentation } from "./documentation";
import { Examples } from "./examples";
import { Footer } from "./footer";
import { GettingStarted } from "./getting.started";
import { Header } from "./header";
import { Spacer } from "./spacer";

export const Root = (
    <div className="root">
        {Header}
        <main>
            {page.as((page) =>
                page === GETTING_STARTED ? GettingStarted :
                    page === DOCUMENTATION ? Documentation :
                        page === EXAMPLES ? Examples :
                            null
            )}
        </main>
        {Footer}
    </div>
);
