import { Link } from "./link";
import { GitHubLogo, NPMLogo } from "./logos";

export const Footer = (
    <footer>
        <p><small>Copyright ©2025 Lorenzo Cicuttin, Licensed under MIT</small></p>
        <div className="links">
            <Link href="https://github.com/9elt/miniframe">{GitHubLogo}</Link>
            <Link href="https://www.npmjs.com/package/@9elt/miniframe">{NPMLogo}</Link>
        </div>
    </footer>
);
