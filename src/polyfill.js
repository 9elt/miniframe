const g = typeof global !== "undefined" ? global : window;
g.WeakRef ||= class WeakRef {
    $;
    constructor(data) {
        this.$ = data;
    }
    deref() {
        return this.$;
    }
};
g.FinalizationRegistry ||= class FinalizationRegistry {
    constructor() { }
    register() { }
    unregister() { }
};
