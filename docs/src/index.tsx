import { createNode } from "@9elt/miniframe";
import { Root } from "./components/root";
import { highlight } from "./util/dom";

document.body.appendChild(createNode(Root));

if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
        highlight(target);
    }
}
