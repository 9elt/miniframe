// node_modules/@9elt/miniframe/dist/esm/index.js
var cleanupMap = new WeakMap;
var cleanup = new FinalizationRegistry((cleanupItem) => cleanupItem.forEach((f) => f()));
function onGC(target, f, id) {
  const cleanupItem = cleanupMap.get(target) || [];
  cleanupItem.push(f);
  cleanupMap.set(target, cleanupItem);
  cleanup.register(target, cleanupItem, id);
}
function createNode(D_props) {
  const tree = { children: [] };
  const node = _createNode(D_props, tree);
  node._tree = tree;
  return node;
}
function clearStateTree(tree, root = -1) {
  if (root !== -1) {
    tree.state._unsubR(tree.sub);
    cleanup.unregister(tree.sub);
  }
  tree.children.forEach(clearStateTree);
  tree.children = [];
}
function stateTree(parent, state, ref, f) {
  const leaf = {
    state,
    sub: state._subR(f),
    children: []
  };
  parent.children.push(leaf);
  onGC(ref.deref(), () => clearStateTree(leaf, 0), leaf.sub);
  return leaf;
}
function _createNode(D_props, tree) {
  const node = { $: null };
  let ref, leaf, sub;
  const props = D_props instanceof State ? unwrap((leaf = stateTree(tree, D_props, ref = new WeakRef(node), sub = (curr, prev) => {
    if (prev instanceof State) {
      prev._unsubR(sub);
    }
    if (curr instanceof State) {
      return curr._sub(sub)(curr._value);
    }
    clearStateTree(leaf);
    const node2 = ref.deref();
    if (node2) {
      node2.$.replaceWith(node2.$ = _createNode(curr, leaf));
      node2.$._keepalive = node2;
    }
  })).state) : D_props;
  node.$ = typeof props === "string" || typeof props === "number" ? window.document.createTextNode(props) : !props ? window.document.createTextNode("") : props instanceof window.Node ? props : copyObject(window.document.createElementNS(props.namespaceURI || "http://www.w3.org/1999/xhtml", props.tagName), props, leaf || tree);
  node.$._keepalive = node;
  return node.$;
}
function copyObject(on, D_from, tree) {
  let ref, leaf, sub;
  const from = D_from instanceof State ? unwrap((leaf = stateTree(tree, D_from, ref = new WeakRef(on), sub = (curr, prev) => {
    if (prev instanceof State) {
      prev._unsubR(sub);
    }
    if (curr instanceof State) {
      return curr._sub(sub)(curr instanceof State ? curr._value : curr, prev instanceof State ? prev._value : prev);
    }
    clearStateTree(leaf);
    const on2 = ref.deref();
    if (on2) {
      for (const key in unwrap(prev)) {
        setPrimitive(on2, key, null);
      }
      copyObject(on2, curr, leaf);
    }
  })).state) : D_from;
  for (const key in from) {
    if (key === "namespaceURI" || key === "tagName") {
      continue;
    } else if (key === "children") {
      setChildren(on, from[key], leaf || tree);
    } else if (typeof unwrap(from[key]) === "object") {
      copyObject(on[key], from[key], leaf || tree);
    } else {
      setPrimitive(on, key, from, leaf || tree);
    }
  }
  return on;
}
function setChildren(parent, D_children, tree) {
  const ref = new WeakRef(parent);
  let leaf, sub;
  const children = D_children instanceof State ? unwrap((leaf = stateTree(tree, D_children, ref, sub = (curr, prev) => {
    if (prev instanceof State) {
      prev._unsubR(sub);
    }
    if (curr instanceof State) {
      return curr._sub(sub)(curr._value);
    }
    clearStateTree(leaf);
    const parent2 = ref.deref();
    if (parent2) {
      replaceNodes(Array.from(parent2.childNodes), createNodeList(curr, leaf, ref));
    }
  })).state) : D_children;
  appendNodeList(parent, createNodeList(children, leaf || tree, ref));
}
function createNodeList(children, tree, ref) {
  if (children === undefined) {
    children = [];
  } else if (!Array.isArray(children)) {
    children = [children];
  }
  const list = new Array(children && children.length || 0);
  if (list.length === 0) {
    list.push(null);
  }
  for (let i = 0;i < list.length; i++) {
    const D_child = children[i];
    let leaf, sub;
    const child = D_child instanceof State ? unwrap((leaf = stateTree(tree, D_child, ref, sub = (curr, prev) => {
      if (prev instanceof State) {
        prev._unsubR(sub);
      }
      if (curr instanceof State) {
        return curr._sub(sub)(curr._value);
      }
      clearStateTree(leaf);
      if (ref.deref()) {
        list[i] = replaceNodes(list[i], Array.isArray(curr) ? createNodeList(curr, leaf, ref) : weaken(list, i, _createNode(curr, leaf)));
      }
    })).state) : D_child;
    list[i] = Array.isArray(child) ? createNodeList(child, leaf || tree, ref) : weaken(list, i, _createNode(child, leaf || tree));
  }
  return list;
}
function weaken(list, i, node) {
  node._weaken = () => list[i] = new WeakRef(node);
  return node;
}
function appendNodeList(parent, nodeList) {
  for (let i = 0;i < nodeList.length; i++) {
    const child = nodeList[i];
    Array.isArray(child) ? appendNodeList(parent, child) : (parent.appendChild(child), child._weaken());
  }
}
function replaceNodes(prev, update) {
  prev = prev instanceof WeakRef ? prev.deref() : prev;
  if (!Array.isArray(prev) && !Array.isArray(update)) {
    prev.replaceWith(update);
    update._weaken();
    return update;
  }
  if (!Array.isArray(prev)) {
    prev = [prev];
  } else if (!Array.isArray(update)) {
    update = [update];
  }
  const min = prev.length < update.length ? prev : update;
  const max = min === prev ? update : prev;
  for (let i = 0;i < min.length; i++) {
    replaceNodes(prev[i], update[i]);
  }
  for (let i = min.length;i < max.length; i++) {
    max === prev ? removeNode(prev[i]) : appendNodeAfter(update[i - 1], update[i]);
  }
  return update;
}
function removeNode(prev) {
  prev = prev instanceof WeakRef ? prev.deref() : prev;
  Array.isArray(prev) ? prev.forEach(removeNode) : prev.remove();
}
function appendNodeAfter(sibiling, node) {
  sibiling = sibiling instanceof WeakRef ? sibiling.deref() : sibiling;
  if (Array.isArray(sibiling)) {
    appendNodeAfter(sibiling[sibiling.length - 1], node);
  } else if (Array.isArray(node)) {
    let last = sibiling;
    for (const _node of node) {
      appendNodeAfter(last, last = _node);
    }
  } else {
    sibiling.after(node);
    node._weaken();
  }
}
function setPrimitive(on, key, from, tree) {
  let D_value = from && from[key];
  let ref, leaf, sub;
  const value = D_value instanceof State ? unwrap((leaf = stateTree(tree, D_value, ref = new WeakRef(on), sub = (curr, prev) => {
    if (prev instanceof State) {
      prev._unsubR(sub);
    }
    if (curr instanceof State) {
      return curr._sub(sub)(curr._value);
    }
    const on2 = ref.deref();
    if (on2) {
      setPrimitive(on2, key, { [key]: curr });
    }
  })).state) : D_value;
  try {
    on.namespaceURI === "http://www.w3.org/2000/svg" ? !value && value !== 0 ? on.removeAttribute(key) : on.setAttribute(key, value) : (on[key] = value) || (value === 0 || delete on[key]);
  } catch (err) {
    console.warn("Error", key, "=", D_value, err);
  }
}
function unwrap(arg) {
  return arg instanceof State ? unwrap(arg._value) : arg;
}

class State {
  constructor(value) {
    this._value = value;
    this._subs = [];
  }
  static merge(...states) {
    const as = typeof states[states.length - 1] === "function" && states.pop();
    const merged = new State(new Array(states.length));
    const mergedRef = new WeakRef(merged);
    for (let i = 0;i < states.length; i++) {
      const state = states[i];
      merged._value[i] = state._value;
      const f = state._sub((curr) => {
        const merged2 = mergedRef.deref();
        if (merged2) {
          merged2._value[i] = curr;
          merged2.value = merged2._value;
        }
      });
      onGC(merged, () => state.unsub(f));
      if (State._Header) {
        State._Stack.push({ state, f });
      }
    }
    return as ? merged.as((states2) => as(...states2)) : merged;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    const prev = this._value;
    this._value = value;
    for (const sub of this._subs) {
      try {
        sub(value, prev);
      } catch (err) {
        console.error("Error", err, "on", this, "calling", sub, "setting", value, "over", prev);
      }
    }
  }
  _track(ref, f, curr, prev = warning) {
    this._dependents ||= [];
    this._clear(ref.id);
    State._Header ||= ref;
    State._Stack.push(ref);
    const value = prev === warning ? f(curr) : f(curr, prev);
    while (State._Stack[State._Stack.length - 1] !== ref) {
      const child = State._Stack.pop();
      child.parent = ref.id;
      this._dependents.push(child);
    }
    if (State._Header === ref) {
      State._Stack.pop();
      State._Header = null;
    }
    if (value instanceof Promise) {
      value.then(warning);
    }
    return value;
  }
  _clear(id) {
    let length = 0;
    for (const ref of this._dependents) {
      if (ref.parent === id) {
        if (ref.state._dependents) {
          ref.state._clear(ref.id);
        }
        ref.state.unsub(ref.f);
      } else {
        this._dependents[length++] = ref;
      }
    }
    this._dependents.length = length;
  }
  as(f) {
    const ref = { id: f, state: this, f: null };
    const child = new State(this._track(ref, f, this._value));
    const childRef = new WeakRef(child);
    ref.f = this._sub((curr) => {
      const child2 = childRef.deref();
      if (child2) {
        child2.value = this._track(ref, f, curr);
      }
    });
    onGC(child, () => {
      this.unsub(ref.f);
      this._clear(ref.id);
    });
    return child;
  }
  await(init, loading = weaken) {
    const child = new State(init);
    Promise.resolve(this._value).then((value) => child.value = value).catch(console.error);
    const childRef = new WeakRef(child);
    const f = this._sub((curr) => {
      const child2 = childRef.deref();
      if (child2) {
        if (loading !== weaken) {
          child2.value = loading;
        }
        Promise.resolve(curr).then((value) => child2.value = value).catch(console.error);
      }
    });
    onGC(child, () => this.unsub(f));
    if (State._Header) {
      State._Stack.push({ state: this, f });
    }
    return child;
  }
  _sub(f) {
    this._subs.push(f);
    return f;
  }
  _subR(f) {
    this._sub(f);
    if (this._value instanceof State) {
      this._value._subR(f);
    }
    return f;
  }
  sub(f) {
    const ref = { id: f, state: this, f: null };
    if (State._Header) {
      State._Stack.push(ref);
    }
    return ref.f = this._sub((curr, prev) => this._track(ref, f, curr, prev));
  }
  unsub(f) {
    let length = 0;
    for (const sub of this._subs) {
      if (sub !== f) {
        this._subs[length++] = sub;
      }
    }
    this._subs.length = length;
  }
  _unsubR(f) {
    this.unsub(f);
    if (this._value instanceof State) {
      this._value._unsubR(f);
    }
  }
}
State._Stack = [];
State._Header = null;
function warning(value, seen = new WeakSet) {
  !seen.has(warning) && (value instanceof State ? seen.add(warning) && console.error("Never use states inside async State.as/sub, see: " + "https://github.com/9elt/miniframe?tab=readme-ov-file#async-state-limitations") : value && typeof value === "object" && !seen.has(value) && seen.add(value) && Object.values(value).forEach((v) => warning(v, seen)));
}

// node_modules/@9elt/miniframe/dist/esm/jsx-runtime.js
function jsx(key, props) {
  if (typeof key === "function") {
    return key(props);
  }
  (props || (props = {})).tagName = key;
  return props;
}

// src/global/page.tsx
var GETTING_STARTED = "getting-started";
var DOCUMENTATION = "documentation";
var EXAMPLES = "examples";
var PAGES = [GETTING_STARTED, DOCUMENTATION, EXAMPLES];
function pathname() {
  return window.location.pathname.split("/").pop();
}
function fallback(pathname2) {
  return PAGES.includes(pathname2) ? pathname2 : GETTING_STARTED;
}
var page = new State(fallback(pathname()));
page.sub(() => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
});
page.sub(async (page2) => {
  if (page2 !== pathname()) {
    window.history.pushState(page2, "", page2);
  }
});
window.onpopstate = () => {
  page.value = fallback(pathname());
};
var pageTitle = page.as((page2) => page2 === GETTING_STARTED ? "Getting started" : page2 === DOCUMENTATION ? "Documentation" : page2 === EXAMPLES ? "Examples" : null);
document.querySelector("title")?.replaceWith(createNode(/* @__PURE__ */ jsx("title", {
  children: [
    "Miniframe | ",
    pageTitle,
    " "
  ]
})));

// src/util/dom.ts
function highlight(target) {
  console.log("HH", target.className);
  if (!target.classList.contains("highlight")) {
    console.log("HHUU");
    document.querySelectorAll(".highlight").forEach((e) => e.classList.remove("highlight"));
    target.classList.add("highlight");
    setTimeout(() => target.classList.remove("highlight"), 5000);
  }
}

// src/components/link.tsx
function Link({ href, warning: warning2, children, ...props }) {
  return href.startsWith("#") ? /* @__PURE__ */ jsx("a", {
    className: warning2 && "warning",
    href,
    onclick: (e) => {
      e.preventDefault();
      window.location.hash = href;
      highlight(document.querySelector(href));
    },
    ...props,
    children: [
      warning2 && TriangleIcon,
      " ",
      children
    ]
  }) : href.startsWith("/") ? /* @__PURE__ */ jsx("a", {
    className: warning2 && "warning",
    href,
    onclick: (e) => {
      e.preventDefault();
      const [url, hash] = href.slice(1).split("#");
      page.value = url;
      if (hash) {
        window.location.hash = hash;
        highlight(document.querySelector("#" + hash));
      }
    },
    ...props,
    children: [
      warning2 && TriangleIcon,
      " ",
      children
    ]
  }) : /* @__PURE__ */ jsx("a", {
    className: warning2 && "warning",
    href,
    target: "_blank",
    ...props,
    children: [
      warning2 && TriangleIcon,
      " ",
      children
    ]
  });
}
var TriangleIcon = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  width: "13",
  height: "13",
  viewBox: "0 0 66 52",
  children: [
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "none",
      "stroke-width": "6",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      stroke: "currentColor",
      d: "M3,52 33,0 63,52z"
    }),
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      d: "M28,20 38,20 33,42z"
    }),
    /* @__PURE__ */ jsx("circle", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      cx: "33",
      cy: "42",
      r: "4"
    })
  ]
});

// src/components/section.tsx
function Section({ id, title, children, warning: warning2 }) {
  return /* @__PURE__ */ jsx("div", {
    className: warning2 ? "section warning" : "section",
    id,
    children: [
      /* @__PURE__ */ jsx("h3", {
        children: [
          warning2 && TriangleIcon2,
          " ",
          title,
          /* @__PURE__ */ jsx(Link, {
            href: "#" + id,
            className: "chain-icon",
            children: ChainIcon
          })
        ]
      }),
      children
    ]
  });
}
var ChainIcon = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  width: "16",
  height: "16",
  fill: "currentColor",
  "aria-hidden": "true",
  children: /* @__PURE__ */ jsx("path", {
    namespaceURI: "http://www.w3.org/2000/svg",
    d: "m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"
  })
});
var TriangleIcon2 = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 66 52",
  children: [
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "none",
      "stroke-width": "6",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      stroke: "currentColor",
      d: "M3,52 33,0 63,52z"
    }),
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      d: "M28,20 38,20 33,42z"
    }),
    /* @__PURE__ */ jsx("circle", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      cx: "33",
      cy: "42",
      r: "4"
    })
  ]
});

// src/components/snippets/async.limitations.safe.as.tsx
function AsyncLimitationsSafeAsSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `state
    <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>getData<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span>init<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        state<span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        State<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Component</span></span> <span class="token attr-name">data</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/async.limitations.unsafe.as.tsx
function AsyncLimitationsUnsafeAsSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `state
    <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token keyword">async</span> v <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getData</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// WARNING: These dependents</span>
        <span class="token comment">// can't be tracked</span>
        state<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        state<span class="token punctuation">.</span><span class="token function">sub</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        State<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// WARNING: Component could be</span>
        <span class="token comment">// calling State.as, State.sub</span>
        <span class="token comment">// or State.merge internally</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Component</span></span> <span class="token attr-name">data</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>data<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span>init<span class="token punctuation">)</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/components.tsx
function ComponentsSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">function</span> <span class="token function">Greeting</span><span class="token punctuation">(</span>props<span class="token operator">:</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> string <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, </span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token plain-text">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> greeting <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Greeting</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>World<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/global.state.tsx
function GlobalStateSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Greeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
`,
    ...props
  });
}

// src/components/snippets/global.state.limitations.tsx
function GlobalStateLimitationsSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// WARNING: On old browsers p will never be cleaned up,</span>
    <span class="token comment">// avoid using createNode with global state when nodes</span>
    <span class="token comment">// may not be persistent</span>
    <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>p<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// WARNING: 1000 nodes have been created, and will </span>
    <span class="token comment">// presist on old browsers</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Component</span></span> <span class="token punctuation">/></span></span>
<span class="token punctuation">}</span>
`,
    ...props
  });
}

// src/components/snippets/global.state.limitations.safe.tsx
function GlobalStateLimitationsSafeSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// NOTE: Ok, no nodes have been created</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Component</span></span> <span class="token punctuation">/></span></span>
<span class="token punctuation">}</span>
`,
    ...props
  });
}

// src/components/snippets/polyfill.tsx
function PolyfillSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">import</span> <span class="token string">"@9elt/miniframe/polyfill"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createNode<span class="token punctuation">,</span> State <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@9elt/miniframe"</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/promises.tsx
function PromisesSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"https://example.com"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span>promise<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// State&lt;Response | null></span>

response<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// null</span>

<span class="token keyword">await</span> promise<span class="token punctuation">;</span>

response<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// Response { ... }</span>
`,
    ...props
  });
}

// src/components/snippets/state.transform.tsx
function StateTransformSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> nameUpperCase <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>n <span class="token operator">=></span> n<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
nameUpperCase<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// "WORLD"</span>

name<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">"Miniframe"</span><span class="token punctuation">;</span>
nameUpperCase<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// "MINIFRAME"</span>
`,
    ...props
  });
}

// src/components/snippets/sync.state.tsx
function SyncStateSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"b"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"c"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> abc <span class="token operator">=</span> State<span class="token punctuation">.</span><span class="token function">merge</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b <span class="token operator">+</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>

abc<span class="token punctuation">.</span>value<span class="token punctuation">;</span> <span class="token comment">// "abc"</span>
`,
    ...props
  });
}

// src/components/spacer.tsx
function Spacer() {
  return /* @__PURE__ */ jsx("div", {
    className: "spacer"
  });
}

// src/components/documentation.tsx
var Documentation = /* @__PURE__ */ jsx("div", {
  children: [
    /* @__PURE__ */ jsx("ol", {
      children: [
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#old-browsers-support",
            warning: true,
            children: "Old Browsers Support"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#components",
            children: "Components"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#transforming-state",
            children: "Transforming State"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#synchronizing-state",
            children: "Synchronizing State"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: [
            "Global State",
            /* @__PURE__ */ jsx("ol", {
              children: [
                /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx(Link, {
                    href: "#global-state",
                    children: "Global State"
                  })
                }),
                /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx(Link, {
                    href: "#global-state-limitations",
                    warning: true,
                    children: "Global State Limitations"
                  })
                })
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx("li", {
          children: [
            "Async State",
            /* @__PURE__ */ jsx("ol", {
              children: [
                /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx(Link, {
                    href: "#async-state",
                    children: "Async State"
                  })
                }),
                /* @__PURE__ */ jsx("li", {
                  children: /* @__PURE__ */ jsx(Link, {
                    href: "#async-state-limitations",
                    warning: true,
                    children: "Async State Limitations"
                  })
                })
              ]
            })
          ]
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "old-browsers-support",
      title: "Old Browsers Support",
      warning: true,
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            "Miniframe uses modern JS features such as",
            " ",
            /* @__PURE__ */ jsx(Link, {
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef",
              children: /* @__PURE__ */ jsx("code", {
                children: "WeakRef"
              })
            }),
            " ",
            "and ",
            /* @__PURE__ */ jsx(Link, {
              href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry",
              children: /* @__PURE__ */ jsx("code", {
                children: "FinalizationRegistry"
              })
            }),
            " ",
            "that were implemented in Chrome 84 (July 2020) and Firefox 79 (July 2020)."
          ]
        }),
        /* @__PURE__ */ jsx("p", {
          children: "If you want to use Miniframe in older browsers a polyfill is available:"
        }),
        /* @__PURE__ */ jsx(PolyfillSnippet, {}),
        /* @__PURE__ */ jsx("p", {
          children: [
            "This polyfill will introduce some limitations on",
            " ",
            /* @__PURE__ */ jsx(Link, {
              href: "#global-state-limitations",
              children: "global states usage"
            }),
            "."
          ]
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "components",
      title: "Components",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: "Functions that take one object as an argument can be used as components:"
        }),
        /* @__PURE__ */ jsx(ComponentsSnippet, {})
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "transforming-state",
      title: "Transforming State",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            /* @__PURE__ */ jsx("code", {
              children: "State"
            }),
            " can be transformed using the ",
            /* @__PURE__ */ jsx("code", {
              children: "State.as"
            }),
            " method"
          ]
        }),
        /* @__PURE__ */ jsx(StateTransformSnippet, {})
      ]
    }),
    /* @__PURE__ */ jsx(Section, {
      id: "synchronizing-state",
      title: "Synchronizing State",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            "Multiple states can be synchronized using ",
            /* @__PURE__ */ jsx("code", {
              children: "State.merge"
            }),
            " static method:"
          ]
        }),
        /* @__PURE__ */ jsx(SyncStateSnippet, {})
      ]
    }),
    /* @__PURE__ */ jsx(Section, {
      id: "global-state",
      title: "Global State",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            /* @__PURE__ */ jsx("code", {
              children: "State"
            }),
            " can be used freely at any level:"
          ]
        }),
        /* @__PURE__ */ jsx(GlobalStateSnippet, {}),
        /* @__PURE__ */ jsx(Section, {
          id: "global-state-limitations",
          title: "Global State Limitations",
          warning: true,
          children: [
            /* @__PURE__ */ jsx("p", {
              children: [
                "When using global state with ",
                /* @__PURE__ */ jsx(Link, {
                  href: "#old-browsers-support",
                  children: "this polyfill"
                }),
                ", on old browsers, Miniframe won't be able to properly cleanup unused nodes."
              ]
            }),
            /* @__PURE__ */ jsx("div", {
              className: "compare-snippets",
              children: [
                /* @__PURE__ */ jsx("div", {
                  children: [
                    /* @__PURE__ */ jsx("small", {
                      children: "UNSAFE"
                    }),
                    /* @__PURE__ */ jsx(GlobalStateLimitationsSnippet, {})
                  ]
                }),
                /* @__PURE__ */ jsx("div", {
                  children: [
                    /* @__PURE__ */ jsx("small", {
                      children: "BEST PRACTICE"
                    }),
                    /* @__PURE__ */ jsx(GlobalStateLimitationsSafeSnippet, {})
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),
    /* @__PURE__ */ jsx(Section, {
      id: "async-state",
      title: "Async State",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            /* @__PURE__ */ jsx("code", {
              children: "Promise"
            }),
            " states can be awaited:"
          ]
        }),
        /* @__PURE__ */ jsx(PromisesSnippet, {}),
        /* @__PURE__ */ jsx("p", {
          children: [
            "Check out the ",
            /* @__PURE__ */ jsx(Link, {
              href: "/examples#example-pokeapi",
              children: "PokéAPI example"
            }),
            " ",
            "that uses async state."
          ]
        }),
        /* @__PURE__ */ jsx(Section, {
          id: "async-state-limitations",
          title: "Async State Limitations",
          warning: true,
          children: [
            /* @__PURE__ */ jsx("p", {
              children: "During async code execution it is impossible to track all state dependents, meaning some may not be cleaned up when needed."
            }),
            /* @__PURE__ */ jsx("p", {
              children: [
                "To avoid this, it is very important that ",
                /* @__PURE__ */ jsx("code", {
                  children: "State.as"
                }),
                " and",
                " ",
                /* @__PURE__ */ jsx("code", {
                  children: "State.sub"
                }),
                ", when called with an async callback, never contain nested ",
                /* @__PURE__ */ jsx("code", {
                  children: "State.as"
                }),
                ", ",
                /* @__PURE__ */ jsx("code", {
                  children: "State.sub"
                }),
                " or",
                " ",
                /* @__PURE__ */ jsx("code", {
                  children: "State.merge"
                }),
                " calls."
              ]
            }),
            /* @__PURE__ */ jsx("div", {
              className: "compare-snippets",
              children: [
                /* @__PURE__ */ jsx("div", {
                  children: [
                    /* @__PURE__ */ jsx("small", {
                      children: "UNSAFE"
                    }),
                    /* @__PURE__ */ jsx(AsyncLimitationsUnsafeAsSnippet, {})
                  ]
                }),
                /* @__PURE__ */ jsx("div", {
                  children: [
                    /* @__PURE__ */ jsx("small", {
                      children: "BEST PRACTICE"
                    }),
                    /* @__PURE__ */ jsx(AsyncLimitationsSafeAsSnippet, {})
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  ]
});

// src/components/example.counter.tsx
function Counter() {
  const counter = new State(0);
  const color = counter.as((c) => c < 10 ? "green" : "red");
  return /* @__PURE__ */ jsx("div", {
    style: { textAlign: "center", padding: "50px 0 70px 0" },
    children: [
      /* @__PURE__ */ jsx("p", {
        children: [
          "Current count: ",
          /* @__PURE__ */ jsx("span", {
            style: { color },
            children: counter
          })
        ]
      }),
      /* @__PURE__ */ jsx(Button, {
        counter
      })
    ]
  });
}
function Button({ counter }) {
  return /* @__PURE__ */ jsx("button", {
    onclick: () => counter.value++,
    disabled: counter.as((c) => c === 10),
    children: "Increment"
  });
}

// src/components/example.pokeapi.tsx
var POKEMON = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard"];
function Pokemon() {
  const name = new State("bulbasaur");
  const select = createNode(/* @__PURE__ */ jsx("select", {
    value: name.value,
    onchange: () => name.value = select.value,
    children: POKEMON.map((name2) => /* @__PURE__ */ jsx("option", {
      value: name2,
      label: name2
    }))
  }));
  const pokemon = name.as(async (name2) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name2);
    if (!res.ok) {
      return new Error;
    }
    return await res.json();
  }).await(null);
  return /* @__PURE__ */ jsx("div", {
    style: { textAlign: "center", padding: "50px 0 70px 0" },
    children: [
      pokemon.as((pokemon2) => pokemon2 === null ? /* @__PURE__ */ jsx(Card, {
        title: "..."
      }) : pokemon2 instanceof Error ? /* @__PURE__ */ jsx(Card, {
        title: "not found"
      }) : /* @__PURE__ */ jsx(Card, {
        title: pokemon2.name,
        img: /* @__PURE__ */ jsx("img", {
          alt: pokemon2.name,
          src: pokemon2.sprites.front_default
        })
      })),
      /* @__PURE__ */ jsx("br", {}),
      select
    ]
  });
}
function Card({ title, img }) {
  return /* @__PURE__ */ jsx("div", {
    style: { width: "180px", margin: "0 auto", border: "1px solid #0004" },
    children: [
      /* @__PURE__ */ jsx("h3", {
        children: title
      }),
      /* @__PURE__ */ jsx("div", {
        style: { height: "96px", background: "#0004" },
        children: img
      })
    ]
  });
}

// src/components/snippets/example.counter.tsx
function ExampleCounterSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">import</span> <span class="token punctuation">{</span> createNode<span class="token punctuation">,</span> State <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@9elt/miniframe"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> color <span class="token operator">=</span> counter<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>c <span class="token operator">=></span> c <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token operator">?</span> <span class="token string">"green"</span> <span class="token operator">:</span> <span class="token string">"red"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> textAlign<span class="token operator">:</span> <span class="token string">"center"</span><span class="token punctuation">,</span> padding<span class="token operator">:</span> <span class="token string">"50px 0 70px 0"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
                Current count: </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> color <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Button</span></span> <span class="token attr-name">counter</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>counter<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Button</span><span class="token punctuation">(</span><span class="token punctuation">{</span> counter <span class="token punctuation">}</span><span class="token operator">:</span> <span class="token punctuation">{</span> counter<span class="token operator">:</span> State<span class="token operator">&lt;</span>number<span class="token operator">></span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>
            <span class="token attr-name">onclick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> counter<span class="token punctuation">.</span>value<span class="token operator">++</span><span class="token punctuation">}</span></span>
            <span class="token attr-name">disabled</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>counter<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>c <span class="token operator">=></span> c <span class="token operator">===</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span>
        <span class="token punctuation">></span></span><span class="token plain-text">
            Increment
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>
    <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>`,
    ...props
  });
}

// src/components/snippets/example.pokeapi.tsx
function ExamplePokeapiSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">import</span> <span class="token punctuation">{</span> createNode<span class="token punctuation">,</span> type MiniChildren<span class="token punctuation">,</span> State <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@9elt/miniframe"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">POKEMON</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"bulbasaur"</span><span class="token punctuation">,</span> <span class="token string">"ivysaur"</span><span class="token punctuation">,</span> <span class="token string">"venusaur"</span><span class="token punctuation">,</span> <span class="token string">"charmander"</span><span class="token punctuation">,</span> <span class="token string">"charmeleon"</span><span class="token punctuation">,</span> <span class="token string">"charizard"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Pokemon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"bulbasaur"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> select <span class="token operator">=</span> createNode<span class="token operator">&lt;</span>HTMLSelectElement<span class="token operator">></span><span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span>
            <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>name<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span>
            <span class="token attr-name">onchange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> name<span class="token punctuation">.</span>value <span class="token operator">=</span> select<span class="token punctuation">.</span>value<span class="token punctuation">}</span></span>
        <span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span><span class="token constant">POKEMON</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span> <span class="token attr-name">label</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
            <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> pokemon <span class="token operator">=</span> name<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">"https://pokeapi.co/api/v2/pokemon/"</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>res<span class="token punctuation">.</span>ok<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token keyword">await</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">{</span>
            name<span class="token operator">:</span> string<span class="token punctuation">;</span>
            sprites<span class="token operator">:</span> <span class="token punctuation">{</span>
                front_default<span class="token operator">:</span> string<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> textAlign<span class="token operator">:</span> <span class="token string">"center"</span><span class="token punctuation">,</span> padding<span class="token operator">:</span> <span class="token string">"50px 0 70px 0"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>pokemon<span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span>pokemon <span class="token operator">=></span>
                pokemon <span class="token operator">===</span> <span class="token keyword">null</span>
                    <span class="token operator">?</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Card</span></span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">"..."</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
                    <span class="token operator">:</span> pokemon <span class="token keyword">instanceof</span> <span class="token class-name">Error</span>
                        <span class="token operator">?</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Card</span></span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token string">"not found"</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>
                        <span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Card</span></span>
                            <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>pokemon<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>
                            <span class="token attr-name">img</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>
                                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
                                    <span class="token attr-name">alt</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>pokemon<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span>
                                    <span class="token attr-name">src</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>pokemon<span class="token punctuation">.</span>sprites<span class="token punctuation">.</span>front_default<span class="token punctuation">}</span></span>
                                <span class="token punctuation">/></span></span>
                            <span class="token punctuation">}</span></span>
                        <span class="token punctuation">/></span></span>
            <span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span><span class="token plain-text">
            </span><span class="token punctuation">{</span>select<span class="token punctuation">}</span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Card</span><span class="token punctuation">(</span><span class="token punctuation">{</span> title<span class="token punctuation">,</span> img <span class="token punctuation">}</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    title<span class="token operator">?</span><span class="token operator">:</span> MiniChildren<span class="token punctuation">;</span>
    img<span class="token operator">?</span><span class="token operator">:</span> MiniChildren<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> width<span class="token operator">:</span> <span class="token string">"180px"</span><span class="token punctuation">,</span> margin<span class="token operator">:</span> <span class="token string">"0 auto"</span><span class="token punctuation">,</span> border<span class="token operator">:</span> <span class="token string">"1px solid #0004"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> height<span class="token operator">:</span> <span class="token string">"96px"</span><span class="token punctuation">,</span> background<span class="token operator">:</span> <span class="token string">"#0004"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
                </span><span class="token punctuation">{</span>img<span class="token punctuation">}</span><span class="token plain-text">
            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>
    <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Pokemon</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>`,
    ...props
  });
}

// src/components/examples.tsx
var Examples = /* @__PURE__ */ jsx("div", {
  children: [
    /* @__PURE__ */ jsx("ol", {
      children: [
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#example-counter",
            children: "Counter"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#example-pokeapi",
            children: "PokéAPI"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#need-more",
            children: "Need more?"
          })
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "example-counter",
      title: "Counter",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: "A simple counter that stops at 10"
        }),
        /* @__PURE__ */ jsx(ExampleCounterSnippet, {}),
        /* @__PURE__ */ jsx("div", {
          className: "hr"
        }),
        /* @__PURE__ */ jsx(RunSnippet, {
          children: /* @__PURE__ */ jsx(Counter, {})
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "example-pokeapi",
      title: "PokéAPI",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            "Fetch pokemon information using ",
            /* @__PURE__ */ jsx(Link, {
              href: "https://pokeapi.co/docs/v2",
              children: "PokéAPI"
            })
          ]
        }),
        /* @__PURE__ */ jsx(ExamplePokeapiSnippet, {}),
        /* @__PURE__ */ jsx("div", {
          className: "hr"
        }),
        /* @__PURE__ */ jsx(RunSnippet, {
          children: /* @__PURE__ */ jsx(Pokemon, {})
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "need-more",
      title: "Need more?",
      children: /* @__PURE__ */ jsx("p", {
        children: [
          "This very documentation was written using miniframe. Check it out on ",
          /* @__PURE__ */ jsx(Link, {
            href: "https://github.com/9elt/miniframe/tree/main/docs",
            children: "GitHub"
          })
        ]
      })
    })
  ]
});
function RunSnippet({ children }) {
  const snippet = createNode(/* @__PURE__ */ jsx("div", {
    className: "snippet"
  }));
  const shadow = snippet.attachShadow({ mode: "open" });
  shadow.appendChild(createNode(Array.isArray(children) ? /* @__PURE__ */ jsx("div", {
    children
  }) : children));
  return snippet;
}

// src/components/logos.tsx
var NPMLogo = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  viewBox: "0 0 18 7",
  height: "14",
  children: [
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      d: "M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"
    }),
    /* @__PURE__ */ jsx("polygon", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "var(--body)",
      points: "1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 "
    }),
    /* @__PURE__ */ jsx("path", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "var(--body)",
      d: "M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z"
    }),
    /* @__PURE__ */ jsx("polygon", {
      namespaceURI: "http://www.w3.org/2000/svg",
      fill: "var(--body)",
      points: "11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "
    })
  ]
});
var GitHubLogo = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  viewBox: "0 0 16 16",
  height: "14",
  fill: "none",
  children: /* @__PURE__ */ jsx("path", {
    namespaceURI: "http://www.w3.org/2000/svg",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    fill: "currentColor",
    d: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
  })
});

// src/components/footer.tsx
var Footer = /* @__PURE__ */ jsx("footer", {
  children: [
    /* @__PURE__ */ jsx("p", {
      children: /* @__PURE__ */ jsx("small", {
        children: "Copyright ©2025 Lorenzo Cicuttin, Licensed under MIT"
      })
    }),
    /* @__PURE__ */ jsx("div", {
      className: "links",
      children: [
        /* @__PURE__ */ jsx(Link, {
          href: "https://github.com/9elt/miniframe",
          children: GitHubLogo
        }),
        /* @__PURE__ */ jsx(Link, {
          href: "https://www.npmjs.com/package/@9elt/miniframe",
          children: NPMLogo
        })
      ]
    })
  ]
});

// src/components/snippets/create-element.tsx
function CreateElementSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> p <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"p"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
p<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"Hello, World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/create-node.tsx
function CreateNodeSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, World!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
`,
    ...props
  });
}

// src/components/snippets/state.tsx
function StateSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span><span class="token string">"World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">createNode</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token plain-text">Hello, </span><span class="token punctuation">{</span>name<span class="token punctuation">}</span><span class="token plain-text">!</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span>textContent<span class="token punctuation">;</span> <span class="token comment">// "Hello, World!"</span>

name<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">"Miniframe"</span><span class="token punctuation">;</span>

p<span class="token punctuation">.</span>textContent<span class="token punctuation">;</span> <span class="token comment">// "Hello, Miniframe!"</span>
`,
    ...props
  });
}

// src/components/snippets/tsconfig.example.tsx
function TsconfigExampleSnippet(props) {
  return /* @__PURE__ */ jsx("pre", {
    className: "snippet",
    innerHTML: `<span class="token punctuation">{</span>
    <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"jsx"</span><span class="token operator">:</span> <span class="token string">"react-jsx"</span><span class="token punctuation">,</span>
        <span class="token property">"jsxImportSource"</span><span class="token operator">:</span> <span class="token string">"@9elt/miniframe"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
`,
    ...props
  });
}

// src/components/getting.started.tsx
var Arrow = /* @__PURE__ */ jsx("svg", {
  namespaceURI: "http://www.w3.org/2000/svg",
  viewBox: "0 0 5 6",
  width: "9",
  fill: "none",
  stroke: "currentColor",
  children: /* @__PURE__ */ jsx("path", {
    namespaceURI: "http://www.w3.org/2000/svg",
    d: "M1,1 3,3 1,5"
  })
});
var GettingStarted = /* @__PURE__ */ jsx("div", {
  children: [
    /* @__PURE__ */ jsx("ol", {
      children: [
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#introduction",
            children: "Introduction"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#quick-start",
            children: "Quick start"
          })
        }),
        /* @__PURE__ */ jsx("li", {
          children: /* @__PURE__ */ jsx(Link, {
            href: "#manual-installation",
            children: "Manual installation"
          })
        })
      ]
    }),
    /* @__PURE__ */ jsx(Spacer, {}),
    /* @__PURE__ */ jsx(Section, {
      id: "introduction",
      title: "Introduction",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: [
            "Miniframe is a better version of ",
            /* @__PURE__ */ jsx("code", {
              children: "document.createElement"
            }),
            " with support for JSX and minimal state management in 400 lines of code. It was created for people that like vanilla JS and enjoy rolling out their own code, but don't like how convoluted and inconvenient it is to create and manage html elements."
          ]
        }),
        /* @__PURE__ */ jsx("p", {
          children: [
            "It provides a ",
            /* @__PURE__ */ jsx("code", {
              children: "createNode"
            }),
            " function"
          ]
        }),
        /* @__PURE__ */ jsx("div", {
          className: "compare-snippets",
          children: [
            /* @__PURE__ */ jsx("div", {
              children: [
                /* @__PURE__ */ jsx("small", {
                  children: "vanilla js"
                }),
                /* @__PURE__ */ jsx(CreateElementSnippet, {})
              ]
            }),
            /* @__PURE__ */ jsx("div", {
              children: [
                /* @__PURE__ */ jsx("small", {
                  children: "@9elt/miniframe"
                }),
                /* @__PURE__ */ jsx(CreateNodeSnippet, {})
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx("p", {
          children: [
            "And a ",
            /* @__PURE__ */ jsx("code", {
              children: "State"
            }),
            " class to easily control the nodes"
          ]
        }),
        /* @__PURE__ */ jsx(StateSnippet, {}),
        /* @__PURE__ */ jsx("div", {
          className: "button-list",
          children: [
            /* @__PURE__ */ jsx(Link, {
              href: "/" + DOCUMENTATION,
              children: /* @__PURE__ */ jsx("button", {
                className: "btn",
                children: [
                  "Documentation ",
                  Arrow
                ]
              })
            }),
            /* @__PURE__ */ jsx(Link, {
              href: "/" + EXAMPLES,
              children: /* @__PURE__ */ jsx("button", {
                className: "btn",
                children: [
                  "Examples ",
                  Arrow
                ]
              })
            })
          ]
        })
      ]
    }),
    /* @__PURE__ */ jsx(Section, {
      id: "quick-start",
      title: "Quick start",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: "Quickly start a project with"
        }),
        /* @__PURE__ */ jsx("pre", {
          className: "snippet",
          children: "npx @9elt/miniframe"
        })
      ]
    }),
    /* @__PURE__ */ jsx(Section, {
      id: "manual-installation",
      title: "Manual installation",
      children: [
        /* @__PURE__ */ jsx("p", {
          children: "Install the latest version form npm"
        }),
        /* @__PURE__ */ jsx("pre", {
          className: "snippet",
          children: "npm i @9elt/miniframe"
        }),
        /* @__PURE__ */ jsx("p", {
          children: [
            "To enable JSX support add to your ",
            /* @__PURE__ */ jsx("code", {
              children: "tsconfig.json"
            })
          ]
        }),
        /* @__PURE__ */ jsx(TsconfigExampleSnippet, {})
      ]
    })
  ]
});

// src/version.ts
var VERSION = "0.15.0";

// src/components/header.tsx
var mouse = new State({ x: 0, y: 0, yR: 1 });
window.addEventListener("mousemove", (e) => {
  mouse.value.x = Math.round(e.clientX * 100 / document.body.clientWidth);
  mouse.value.y = Math.round(e.clientY * 100 / document.body.clientHeight);
  mouse.value = mouse.value;
});
var header;
var Header = /* @__PURE__ */ jsx("header", {
  style: {
    backgroundImage: mouse.as((p) => {
      header ||= document.querySelector("header");
      const yR = (header?.clientHeight || 70) / document.body.clientHeight;
      return `radial-gradient(circle at ${p.x}% ${p.y / yR}%, var(--highlight-2-10) 0%, var(--lighter-shadow) 400px`;
    })
  },
  children: /* @__PURE__ */ jsx("div", {
    className: "main flex",
    children: [
      /* @__PURE__ */ jsx("h1", {
        children: [
          /* @__PURE__ */ jsx("span", {
            className: "logo",
            children: [
              /* @__PURE__ */ jsx(Link, {
                href: "/" + GETTING_STARTED,
                children: "Miniframe"
              }),
              /* @__PURE__ */ jsx("small", {
                className: "version",
                children: /* @__PURE__ */ jsx(Link, {
                  href: "https://www.npmjs.com/package/@9elt/miniframe",
                  children: [
                    NPMLogo,
                    VERSION
                  ]
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx("span", {
            className: "light",
            children: " | "
          }),
          /* @__PURE__ */ jsx("span", {
            className: "light",
            children: pageTitle
          })
        ]
      }),
      /* @__PURE__ */ jsx("nav", {
        children: [
          /* @__PURE__ */ jsx(Link, {
            href: "/" + GETTING_STARTED,
            className: page.as((page2) => page2 === GETTING_STARTED ? "tab active" : "tab"),
            children: /* @__PURE__ */ jsx("button", {
              children: "Getting started"
            })
          }),
          /* @__PURE__ */ jsx(Link, {
            href: "/" + DOCUMENTATION,
            className: page.as((page2) => page2 === DOCUMENTATION ? "tab active" : "tab"),
            children: /* @__PURE__ */ jsx("button", {
              children: "Documentation"
            })
          }),
          /* @__PURE__ */ jsx(Link, {
            href: "/" + EXAMPLES,
            className: page.as((page2) => page2 === EXAMPLES ? "tab active" : "tab"),
            children: /* @__PURE__ */ jsx("button", {
              children: "Examples"
            })
          })
        ]
      })
    ]
  })
});

// src/components/root.tsx
var Root = /* @__PURE__ */ jsx("div", {
  className: "root",
  children: [
    Header,
    /* @__PURE__ */ jsx("main", {
      children: page.as((page2) => page2 === GETTING_STARTED ? GettingStarted : page2 === DOCUMENTATION ? Documentation : page2 === EXAMPLES ? Examples : null)
    }),
    Footer
  ]
});

// src/index.tsx
document.body.appendChild(createNode(Root));
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    highlight(target);
  }
}
