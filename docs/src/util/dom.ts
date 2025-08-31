export function highlight(target: Element) {
    console.log("HH", target.className);
    if (!target.classList.contains("highlight")) {
        console.log("HHUU")
        document.querySelectorAll(".highlight").forEach(e => e.classList.remove("highlight"));
        target.classList.add("highlight");
        setTimeout(() => target.classList.remove("highlight"), 5000);
    }
}
