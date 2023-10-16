var mt = Object.defineProperty;
var bt = (i, t, e) => t in i ? mt(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var O = (i, t, e) => (bt(i, typeof t != "symbol" ? t + "" : t, e), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = window, Z = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, J = Symbol(), F = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== J)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (i) => new ot(typeof i == "string" ? i : i + "", void 0, J), W = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new ot(e, i, J);
}, ft = (i, t) => {
  Z ? i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const n = document.createElement("style"), s = P.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  });
}, X = Z ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return vt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var M;
const L = window, Y = L.trustedTypes, yt = Y ? Y.emptyScript : "", K = L.reactiveElementPolyfillSupport, j = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? yt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, at = (i, t) => t !== i && (t == t || i == i), H = { attribute: !0, type: String, converter: j, reflect: !1, hasChanged: at }, q = "finalized";
let x = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, n) => {
      const s = this._$Ep(n, e);
      s !== void 0 && (this._$Ev.set(s, n), t.push(s));
    }), t;
  }
  static createProperty(t, e = H) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const n = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    return { get() {
      return this[e];
    }, set(s) {
      const o = this[t];
      this[e] = s, this.requestUpdate(t, o, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || H;
  }
  static finalize() {
    if (this.hasOwnProperty(q))
      return !1;
    this[q] = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, n = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of n)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n)
        e.unshift(X(s));
    } else
      t !== void 0 && e.push(X(t));
    return e;
  }
  static _$Ep(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, n;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((n = t.hostConnected) === null || n === void 0 || n.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ft(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) === null || n === void 0 ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) === null || n === void 0 ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$EO(t, e, n = H) {
    var s;
    const o = this.constructor._$Ep(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (((s = n.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? n.converter : j).toAttribute(e, n.type);
      this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const r = s.getPropertyOptions(o), u = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) === null || n === void 0 ? void 0 : n.fromAttribute) !== void 0 ? r.converter : j;
      this._$El = o, this[o] = u.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, n) {
    let s = !0;
    t !== void 0 && (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || at)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, n))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(n)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((n) => {
      var s;
      return (s = n.hostUpdated) === null || s === void 0 ? void 0 : s.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, n) => this._$EO(n, this[n], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
x[q] = !0, x.elementProperties = /* @__PURE__ */ new Map(), x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, K == null || K({ ReactiveElement: x }), ((M = L.reactiveElementVersions) !== null && M !== void 0 ? M : L.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var R;
const U = window, _ = U.trustedTypes, G = _ ? _.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, V = "$lit$", m = `lit$${(Math.random() + "").slice(9)}$`, lt = "?" + m, $t = `<${lt}>`, $ = document, S = () => $.createComment(""), E = (i) => i === null || typeof i != "object" && typeof i != "function", ut = Array.isArray, xt = (i) => ut(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, tt = />/g, b = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, nt = /"/g, ct = /^(?:script|style|textarea|title)$/i, _t = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), v = _t(1), w = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), f = $.createTreeWalker($, 129, null, !1);
function ht(i, t) {
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const wt = (i, t) => {
  const e = i.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : "", r = A;
  for (let u = 0; u < e; u++) {
    const a = i[u];
    let l, c, h = -1, p = 0;
    for (; p < a.length && (r.lastIndex = p, c = r.exec(a), c !== null); )
      p = r.lastIndex, r === A ? c[1] === "!--" ? r = Q : c[1] !== void 0 ? r = tt : c[2] !== void 0 ? (ct.test(c[2]) && (s = RegExp("</" + c[2], "g")), r = b) : c[3] !== void 0 && (r = b) : r === b ? c[0] === ">" ? (r = s ?? A, h = -1) : c[1] === void 0 ? h = -2 : (h = r.lastIndex - c[2].length, l = c[1], r = c[3] === void 0 ? b : c[3] === '"' ? nt : et) : r === nt || r === et ? r = b : r === Q || r === tt ? r = A : (r = b, s = void 0);
    const g = r === b && i[u + 1].startsWith("/>") ? " " : "";
    o += r === A ? a + $t : h >= 0 ? (n.push(l), a.slice(0, h) + V + a.slice(h) + m + g) : a + m + (h === -2 ? (n.push(void 0), u) : g);
  }
  return [ht(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class C {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const u = t.length - 1, a = this.parts, [l, c] = wt(t, e);
    if (this.el = C.createElement(l, n), f.currentNode = this.el.content, e === 2) {
      const h = this.el.content, p = h.firstChild;
      p.remove(), h.append(...p.childNodes);
    }
    for (; (s = f.nextNode()) !== null && a.length < u; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const p of s.getAttributeNames())
            if (p.endsWith(V) || p.startsWith(m)) {
              const g = c[r++];
              if (h.push(p), g !== void 0) {
                const gt = s.getAttribute(g.toLowerCase() + V).split(m), z = /([.?@])?(.*)/.exec(g);
                a.push({ type: 1, index: o, name: z[2], strings: gt, ctor: z[1] === "." ? At : z[1] === "?" ? Et : z[1] === "@" ? Ct : N });
              } else
                a.push({ type: 6, index: o });
            }
          for (const p of h)
            s.removeAttribute(p);
        }
        if (ct.test(s.tagName)) {
          const h = s.textContent.split(m), p = h.length - 1;
          if (p > 0) {
            s.textContent = _ ? _.emptyScript : "";
            for (let g = 0; g < p; g++)
              s.append(h[g], S()), f.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[p], S());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === lt)
          a.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(m, h + 1)) !== -1; )
            a.push({ type: 7, index: o }), h += m.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const n = $.createElement("template");
    return n.innerHTML = t, n;
  }
}
function k(i, t, e = i, n) {
  var s, o, r, u;
  if (t === w)
    return t;
  let a = n !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[n] : e._$Cl;
  const l = E(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), l === void 0 ? a = void 0 : (a = new l(i), a._$AT(i, e, n)), n !== void 0 ? ((r = (u = e)._$Co) !== null && r !== void 0 ? r : u._$Co = [])[n] = a : e._$Cl = a), a !== void 0 && (t = k(i, a._$AS(i, t.values), a, n)), t;
}
class kt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: n }, parts: s } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : $).importNode(n, !0);
    f.currentNode = o;
    let r = f.nextNode(), u = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (u === l.index) {
        let c;
        l.type === 2 ? c = new T(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Tt(r, this, t)), this._$AV.push(c), l = s[++a];
      }
      u !== (l == null ? void 0 : l.index) && (r = f.nextNode(), u++);
    }
    return f.currentNode = $, o;
  }
  v(t) {
    let e = 0;
    for (const n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class T {
  constructor(t, e, n, s) {
    var o;
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = k(this, t, e), E(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : xt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && E(this._$AH) ? this._$AA.nextSibling.data = t : this.$($.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: n, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(ht(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.v(n);
    else {
      const r = new kt(o, this), u = r.u(this.options);
      r.v(n), this.$(u), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new C(t)), e;
  }
  T(t) {
    ut(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const o of t)
      s === e.length ? e.push(n = new T(this.k(S()), this.k(S()), this, this.options)) : n = e[s], n._$AI(o), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class N {
  constructor(t, e, n, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = d;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = k(this, t, e, 0), r = !E(t) || t !== this._$AH && t !== w, r && (this._$AH = t);
    else {
      const u = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = k(this, u[n + a], e, a), l === w && (l = this._$AH[a]), r || (r = !E(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class At extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
const St = _ ? _.emptyScript : "";
class Et extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== d ? this.element.setAttribute(this.name, St) : this.element.removeAttribute(this.name);
  }
}
class Ct extends N {
  constructor(t, e, n, s, o) {
    super(t, e, n, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var n;
    if ((t = (n = k(this, t, e, 0)) !== null && n !== void 0 ? n : d) === w)
      return;
    const s = this._$AH, o = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, n;
    typeof this._$AH == "function" ? this._$AH.call((n = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && n !== void 0 ? n : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Tt {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const it = U.litHtmlPolyfillSupport;
it == null || it(C, T), ((R = U.litHtmlVersions) !== null && R !== void 0 ? R : U.litHtmlVersions = []).push("2.8.0");
const zt = (i, t, e) => {
  var n, s;
  const o = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const u = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = r = new T(t.insertBefore(S(), u), u, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var I, B;
class y extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const n = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = n.firstChild), n;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return w;
  }
}
y.finalized = !0, y._$litElement$ = !0, (I = globalThis.litElementHydrateSupport) === null || I === void 0 || I.call(globalThis, { LitElement: y });
const rt = globalThis.litElementPolyfillSupport;
rt == null || rt({ LitElement: y });
((B = globalThis.litElementVersions) !== null && B !== void 0 ? B : globalThis.litElementVersions = []).push("3.3.3");
class Pt extends y {
  render() {
    return v`
      <div class="grid items-center grid-cols-2 mt-8">
        <button
          class="
            rounded-s-lg
            text-2xl
            py-6
            text-white
            bg-slate-400
            hover:bg-slate-700
            transition-colors
            border-0
            cursor-pointer
          "
          @click=${() => this.dispatchEvent(new Event("minus"))}
        >
          <span class="i-material-symbols-remove pointer-events-none"></span>
        </button>

        <button
          class="
            rounded-e-lg
            text-2xl
            py-6
            text-white
            bg-slate-400
            hover:bg-slate-700
            transition-colors
            border-black
            border-0 border-s-1
            cursor-pointer
          "
          @click=${() => this.dispatchEvent(new Event("plus"))}
        >
          <span class="i-material-symbols-add pointer-events-none"></span>
        </button>
      </div>
    `;
  }
  static get styles() {
    return W`
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-material-symbols-add{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}
.i-material-symbols-remove{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M5 13v-2h14v2H5Z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}
/* layer: default */
.pointer-events-none{pointer-events:none;}
.static{position:static;}
.grid{display:grid;}
.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr));}
.mt-8{margin-top:2rem;}
.cursor-pointer{cursor:pointer;}
.items-center{align-items:center;}
.border-0{border-width:0;}
.border-s-1{border-inline-start-width:1px;}
.border-black{--un-border-opacity:1;border-color:rgba(0,0,0,var(--un-border-opacity));}
.rounded-e-lg{border-start-end-radius:0.5rem;border-end-end-radius:0.5rem;}
.rounded-s-lg{border-end-start-radius:0.5rem;border-start-start-radius:0.5rem;}
.bg-slate-400{--un-bg-opacity:1;background-color:rgba(148,163,184,var(--un-bg-opacity));}
.hover\\:bg-slate-700:hover{--un-bg-opacity:1;background-color:rgba(51,65,85,var(--un-bg-opacity));}
.py-6{padding-top:1.5rem;padding-bottom:1.5rem;}
.text-2xl{font-size:1.5rem;line-height:2rem;}
.text-white{--un-text-opacity:1;color:rgba(255,255,255,var(--un-text-opacity));}
.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;};
    `;
  }
}
customElements.define("button-group", Pt);
class dt extends y {
  constructor() {
    super(), setInterval(() => this.requestUpdate(), 1e3);
  }
  get active() {
    const t = luxon.DateTime.now();
    return t > this.start && t < this.end;
  }
  get sessionLength() {
    return Math.floor(this.end.diff(this.start, "minutes").as("minutes"));
  }
  render() {
    const t = this.end.minus({ minutes: this.checkerTime });
    let e = luxon.Duration.fromObject({ minutes: 0 }), n = luxon.Duration.fromObject({ minutes: 0 });
    try {
      const s = luxon.DateTime.now();
      e = s > this.end ? luxon.Duration.fromObject({ minutes: 0 }) : s > this.start ? this.end.diff(s, "minutes") : this.end.diff(this.start, "minutes"), n = e.as("minutes") < this.checkerTime ? luxon.Duration.fromObject({ minutes: 0 }) : e.minus({ minutes: this.checkerTime });
    } catch (s) {
      console.error(s);
    }
    return v`
      <div class="flex flex-col p-4 mt-5 overflow-hidden">
        <h1
          class="${this.active ? "text-red-400" : "text-slate-400"} text-center mb-10"
        >
          ${this.session.group}
          <br />
          ${this.session.number > 0 ? v`Session ${this.session.number}` : ""}
        </h1>

        <div class="text-lg">
          <span class="font-bold">
            Start${this.start < luxon.DateTime.now() ? "ed" : "s"}
          </span>
          ${this.start.toLocaleString(luxon.DateTime.TIME_SIMPLE)}
          (${this.sessionLength} mins)
        </div>

        ${this.active ? v`
              <div
                class="text-lg ${n.as("minutes") <= 0 ? "text-red-400" : ""}"
              >
                <span class="font-bold">
                  Checker${t < luxon.DateTime.now() ? "ed" : ""}
                </span>
                ${t.toRelative()}
              </div>
            ` : ""}

        <div
          class="text-lg ${e.as("minutes") <= 0 ? "text-red-400" : ""}"
        >
          <span class="font-bold">
            End${this.end < luxon.DateTime.now() ? "ed" : "s"}
          </span>
          ${this.end.toRelative()}
        </div>

        ${this.active ? v`
              <div class="mt-2 mb-10">
                <button-group
                  @minus=${() => this.dispatchEvent(new Event("decreaseTime"))}
                  @plus=${() => this.dispatchEvent(new Event("increaseTime"))}
                ></button-group>
              </div>
            ` : ""}
      </div>
    `;
  }
  static get styles() {
    return W`
      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: default */
.static{position:static;}
.mb-10{margin-bottom:2.5rem;}
.mt-2{margin-top:0.5rem;}
.mt-5{margin-top:1.25rem;}
.flex{display:flex;}
.flex-col{flex-direction:column;}
.overflow-hidden{overflow:hidden;}
.p-4{padding:1rem;}
.text-center{text-align:center;}
.text-lg{font-size:1.125rem;line-height:1.75rem;}
.font-bold{font-weight:700;}
.text-red-400{--un-text-opacity:1;color:rgba(248,113,113,var(--un-text-opacity));}
.text-slate-400{--un-text-opacity:1;color:rgba(148,163,184,var(--un-text-opacity));};
    `;
  }
}
O(dt, "properties", {
  selected: { type: Boolean },
  session: { type: Object },
  start: { type: Object },
  end: { type: Object },
  checkerTime: { type: Number },
  active: { type: Boolean, state: !0 }
});
customElements.define("group-session", dt);
class pt extends y {
  constructor() {
    super(), this._sessionLength = 20, this._checkerTime = 3, this._dayStart = "1:30 PM", this._activeSession = 0, this._showConfig = !1, this.loadData();
    const t = luxon.DateTime.now();
    for (let e = 0; e < this._sessions.length; e++) {
      const n = this._sessions[e];
      if (t > n.start && t < n.end) {
        this._activeSession = e;
        break;
      }
    }
  }
  get activeSession() {
    return {
      ...this._sessions[this._activeSession] || this._sessions[0],
      minutesRemaining: this._minutesRemaining
    };
  }
  createSessions() {
    const t = ["A1", "I1", "N1", "A2", "I2", "TTL", "N2", "A3", "I3", "N3"];
    this._sessions = t.map((e, n) => {
      const s = luxon.DateTime.fromFormat(this._dayStart, "t").plus({
        minutes: n * this._sessionLength
      });
      let o = "Track Tour Laps";
      switch (e[0]) {
        case "A":
          o = "Advanced";
          break;
        case "I":
          o = "Intermediate";
          break;
        case "N":
          o = "Novice";
          break;
      }
      let r = -1;
      if (e[0] !== "T")
        try {
          r = parseInt(e[1], 10);
        } catch {
        }
      return {
        group: o,
        number: r,
        start: s,
        end: s.plus({ minutes: this._sessionLength })
      };
    });
  }
  updateSessionEnd(t, e) {
    const n = [...this._sessions];
    for (let s = t; s < n.length; s++)
      s !== t && (n[s].start = n[s].start.plus({ minutes: e })), n[s].end = n[s].end.plus({ minutes: e });
    this._sessions = n, this.storeData();
  }
  reset() {
    window.localStorage.clear(), this._sessionLength = 20, this._checkerTime = 3, this._dayStart = "1:30 PM", this._showConfig = !1, this.createSessions();
  }
  storeData() {
    try {
      const t = luxon.DateTime.now().toFormat("yyyy-MM-dd");
      window.localStorage.setItem(
        `tnia-event-${t}`,
        JSON.stringify(this._sessions)
      ), window.localStorage.setItem(
        "tnia-event-config",
        JSON.stringify({
          start: this._dayStart,
          checkered: this._checkerTime,
          length: this._sessionLength
        })
      );
    } catch (t) {
      console.error(t);
    }
  }
  loadData() {
    const t = luxon.DateTime.now().toFormat("yyyy-MM-dd");
    let e = window.localStorage.getItem("tnia-event-config");
    if (e)
      try {
        const n = JSON.parse(e);
        this._dayStart = n.start, this._newStart = n.start, this._checkerTime = n.checkered, this._sessionLength = n.length;
      } catch (n) {
        console.error(n);
      }
    if (e = window.localStorage.getItem(`tnia-event-${t}`), e)
      try {
        const n = JSON.parse(e);
        this._sessions = n.map((s) => ({
          ...s,
          start: luxon.DateTime.fromISO(s.start),
          end: luxon.DateTime.fromISO(s.end)
        }));
      } catch (n) {
        console.error(n);
      }
    else
      this.createSessions();
  }
  saveConfig() {
    try {
      const t = this.shadowRoot.getElementById("checker").value;
      this._checkerTime = parseInt(t, 10);
      const e = this.shadowRoot.getElementById("length").value;
      this._sessionLength = parseInt(e, 10);
      const n = this.shadowRoot.getElementById("start").value, s = luxon.DateTime.fromFormat(n, "t"), o = [...this._sessions];
      for (let r = 0; r < o.length; r++) {
        const u = s.plus({ minutes: r * this._sessionLength });
        o[r].start = u, o[r].end = u.plus({ minutes: this._sessionLength });
      }
      this._sessions = o, this._dayStart = n, this._showConfig = !1, this.storeData();
    } catch (t) {
      console.error(t);
    }
  }
  firstUpdated() {
    super.firstUpdated();
    const t = this.renderRoot.getElementById("slider");
    window.mySwipe = new Swipe(t, {
      startSlide: this._activeSession,
      draggable: !1,
      autoRestart: !1,
      continuous: !1,
      disableScroll: !0,
      stopPropagation: !0,
      callback: function(e, n) {
      },
      transitionEnd: function(e, n) {
      }
    }), this.loadData();
  }
  render() {
    return v`
      <div class="relative h-full overflow-hidden">
        <div id="slider" class="swipe h-full">
          <div class="swipe-wrap h-full">
            ${this._sessions.map(
      (t, e) => v`
                <group-session
                  .session=${t}
                  .start=${t.start}
                  .end=${t.end}
                  checkerTime=${this._checkerTime}
                  @decreaseTime=${() => this.updateSessionEnd(e, -1)}
                  @increaseTime=${() => this.updateSessionEnd(e, 1)}
                  class="block w-full h-full max-h-screen"
                ></group-session>
              `
    )}
          </div>
        </div>

        <div
          class="
            flex flex-col
            absolute inset-0
            bg-slate-500 z-10
            p-4
            transition duration-300 ease-in-out
            ${this._showConfig ? "" : "translate-y-full"}
          "
        >
          <span
            @click=${() => this._showConfig = !1}
            class="i-material-symbols-close absolute top-1 right-1 text-2xl"
          ></span>

          <h1 class="text-3xl m-0">Config</h1>

          <p class="flex flex-col">
            <label for="start">Start Time</label>
            <input
              id="start"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._dayStart.toLocaleString(luxon.DateTime.TIME_SIMPLE)}
            />
          </p>

          <p class="flex flex-col">
            <label for="checker">Time For Checker</label>
            <input
              id="checker"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._checkerTime}
            />
          </p>

          <p class="flex flex-col">
            <label for="length">Session Length</label>
            <input
              id="length"
              type="text"
              class="
              bg-slate-700 border-0 px-3 py-2 rounded-none
                text-light text-xl
              "
              value=${this._sessionLength}
            />
          </p>

          <div class="grid grid-cols-2 gap-3 mt-24">
            <button
              class="
                border-none
                bg-slate-700
                text-white text-xl
                hover:bg-slate-400
                py-2
                transition-colors
              "
              @click=${() => this.saveConfig()}
            >
              Save
            </button>

            <button
              class="
                border-none
                bg-slate-400
                text-white text-xl
                hover:bg-slate-700
                py-2
                transition-colors
              "
              @click=${() => {
      this._newStart = this._dayStart, this._showConfig = !1;
    }}
            >
              Cancel
            </button>
          </div>

          <button
            class="
                border-none
                bg-slate-700
                text-white text-xl
                hover:bg-slate-400
                py-2
                mt-6
                transition-colors
              "
            @click=${() => this.reset()}
          >
            Reset
          </button>
        </div>

        <div
          @click=${() => this._showConfig = !0}
          class="absolute bottom-1 left-1"
        >
          <span class="i-material-symbols-settings text-2xl"></span>
        </div>
      </div>
    `;
  }
  static get styles() {
    return W`
      .swipe {
        overflow: hidden;
        visibility: hidden;
        position: relative;
      }
      .swipe-wrap {
        overflow: hidden;
        position: relative;
      }
      .swipe-wrap > * {
        float: left;
        width: 100%;
        position: relative;
      }

      /* layer: preflights */
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgba(0,0,0,0);--un-ring-shadow:0 0 rgba(0,0,0,0);--un-shadow-inset: ;--un-shadow:0 0 rgba(0,0,0,0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}
/* layer: icons */
.i-material-symbols-close{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}
.i-material-symbols-settings{--un-icon:url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z'/%3E%3C/svg%3E");-webkit-mask:var(--un-icon) no-repeat;mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;background-color:currentColor;color:inherit;display:inline-block;vertical-align:middle;width:1em;height:1em;}
/* layer: default */
.absolute{position:absolute;}
.relative{position:relative;}
.static{position:static;}
.inset-0{inset:0;}
.bottom-1{bottom:0.25rem;}
.left-1{left:0.25rem;}
.right-1{right:0.25rem;}
.top-1{top:0.25rem;}
.z-10{z-index:10;}
.grid{display:grid;}
.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr));}
.m-0{margin:0;}
.mt-24{margin-top:6rem;}
.mt-6{margin-top:1.5rem;}
.block{display:block;}
.hidden{display:none;}
.h-full{height:100%;}
.max-h-screen{max-height:100vh;}
.w-full{width:100%;}
.flex{display:flex;}
.flex-col{flex-direction:column;}
.translate-y-full{--un-translate-y:100%;transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}
.gap-3{gap:0.75rem;}
.overflow-hidden{overflow:hidden;}
.border-0{border-width:0;}
.rounded-none{border-radius:0;}
.border-none{border-style:none;}
.bg-slate-400{--un-bg-opacity:1;background-color:rgba(148,163,184,var(--un-bg-opacity));}
.bg-slate-500{--un-bg-opacity:1;background-color:rgba(100,116,139,var(--un-bg-opacity));}
.bg-slate-700{--un-bg-opacity:1;background-color:rgba(51,65,85,var(--un-bg-opacity));}
.hover\\:bg-slate-400:hover{--un-bg-opacity:1;background-color:rgba(148,163,184,var(--un-bg-opacity));}
.hover\\:bg-slate-700:hover{--un-bg-opacity:1;background-color:rgba(51,65,85,var(--un-bg-opacity));}
.p-4{padding:1rem;}
.px-3{padding-left:0.75rem;padding-right:0.75rem;}
.py-2{padding-top:0.5rem;padding-bottom:0.5rem;}
.text-2xl{font-size:1.5rem;line-height:2rem;}
.text-3xl{font-size:1.875rem;line-height:2.25rem;}
.text-xl{font-size:1.25rem;line-height:1.75rem;}
.text-light{--un-text-opacity:1;color:rgba(246,246,246,var(--un-text-opacity));}
.text-white{--un-text-opacity:1;color:rgba(255,255,255,var(--un-text-opacity));}
.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}
.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}
.duration-300{transition-duration:300ms;}
.ease-in-out{transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);};
    `;
  }
}
O(pt, "properties", {
  _activeSession: { type: Number, state: !0 },
  _sessions: { type: Array, state: !0 },
  _showConfig: { type: Boolean, state: !0 }
});
customElements.define("tnia-event", pt);
