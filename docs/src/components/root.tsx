import { DOCUMENTATION, EXAMPLES, GETTING_STARTED, page } from "../global/page";
import { Documentation } from "./documentation";
import { Examples } from "./examples";
import { GettingStarted } from "./getting.started";
import { Header } from "./header";

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
    </div>
);
