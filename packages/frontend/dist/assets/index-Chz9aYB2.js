(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();let hn=class extends Event{constructor(t,e,r,n){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e,this.callback=r,this.subscribe=n??!1}};let Ws=class{constructor(t,e,r,n){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,a)=>{this.unsubscribe&&(this.unsubscribe!==a&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,a)),this.unsubscribe=a},this.host=t,e.context!==void 0){const i=e;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=e,this.callback=r,this.subscribe=n??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new hn(this.context,this.host,this.t,this.subscribe))}};let wi=class{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const r=e||!Object.is(t,this.o);this.o=t,r&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[e,{disposer:r}]of this.subscriptions)e(this.o,r)},t!==void 0&&(this.value=t)}addCallback(t,e,r){if(!r)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:n}=this.subscriptions.get(t);t(this.value,n)}clearCallbacks(){this.subscriptions.clear()}};let _i=class extends Event{constructor(t,e){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e}},Js=class extends wi{constructor(t,e,r){super(e.context!==void 0?e.initialValue:r),this.onContextRequest=n=>{if(n.context!==this.context)return;const i=n.contextTarget??n.composedPath()[0];i!==this.host&&(n.stopPropagation(),this.addCallback(n.callback,i,n.subscribe))},this.onProviderRequest=n=>{if(n.context!==this.context||(n.contextTarget??n.composedPath()[0])===this.host)return;const i=new Set;for(const[a,{consumerHost:c}]of this.subscriptions)i.has(a)||(i.add(a),c.dispatchEvent(new hn(this.context,c,a,!0)));n.stopPropagation()},this.host=t,e.context!==void 0?this.context=e.context:this.context=e,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new _i(this.context,this.host))}};function bi({context:s}){return(t,e)=>{const r=new WeakMap;if(typeof e=="object")return{get(){return t.get.call(this)},set(n){return r.get(this).setValue(n),t.set.call(this,n)},init(n){return r.set(this,new Js(this,{context:s,initialValue:n})),n}};{t.constructor.addInitializer((a=>{r.set(a,new Js(a,{context:s}))}));const n=Object.getOwnPropertyDescriptor(t,e);let i;if(n===void 0){const a=new WeakMap;i={get(){return a.get(this)},set(c){r.get(this).setValue(c),a.set(this,c)},configurable:!0,enumerable:!0}}else{const a=n.set;i={...n,set(c){r.get(this).setValue(c),a?.call(this,c)}}}return void Object.defineProperty(t,e,i)}}}function ce({context:s,subscribe:t}){return(e,r)=>{typeof r=="object"?r.addInitializer((function(){new Ws(this,{context:s,callback:n=>{e.set.call(this,n)},subscribe:t})})):e.constructor.addInitializer((n=>{new Ws(n,{context:s,callback:i=>{n[r]=i},subscribe:t})}))}}const re=globalThis,ts=re.ShadowRoot&&(re.ShadyCSS===void 0||re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,es=Symbol(),Ys=new WeakMap;let dn=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==es)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ts&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=Ys.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ys.set(e,t))}return t}toString(){return this.cssText}};const ne=s=>new dn(typeof s=="string"?s:s+"",void 0,es),j=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((r,n,i)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[i+1],s[0]);return new dn(e,s,es)},$i=(s,t)=>{if(ts)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),n=re.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=e.cssText,s.appendChild(r)}},Ks=ts?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return ne(e)})(s):s;const{is:ki,defineProperty:Ci,getOwnPropertyDescriptor:Si,getOwnPropertyNames:Ei,getOwnPropertySymbols:Ai,getPrototypeOf:xi}=Object,le=globalThis,Gs=le.trustedTypes,Pi=Gs?Gs.emptyScript:"",Ri=le.reactiveElementPolyfillSupport,jt=(s,t)=>s,ie={toAttribute(s,t){switch(t){case Boolean:s=s?Pi:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ss=(s,t)=>!ki(s,t),Qs={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:ss};Symbol.metadata??=Symbol("metadata"),le.litPropertyMetadata??=new WeakMap;let lt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Qs){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),n=this.getPropertyDescriptor(t,r,e);n!==void 0&&Ci(this.prototype,t,n)}}static getPropertyDescriptor(t,e,r){const{get:n,set:i}=Si(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:n,set(a){const c=n?.call(this);i?.call(this,a),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qs}static _$Ei(){if(this.hasOwnProperty(jt("elementProperties")))return;const t=xi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(jt("properties"))){const e=this.properties,r=[...Ei(e),...Ai(e)];for(const n of r)this.createProperty(n,e[n])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,n]of e)this.elementProperties.set(r,n)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const n=this._$Eu(e,r);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const n of r)e.unshift(Ks(n))}else t!==void 0&&e.push(Ks(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $i(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){const i=(r.converter?.toAttribute!==void 0?r.converter:ie).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,e){const r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const i=r.getPropertyOptions(n),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:ie;this._$Em=n;const c=a.fromAttribute(e,i.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(t,e,r,n=!1,i){if(t!==void 0){const a=this.constructor;if(n===!1&&(i=this[t]),r??=a.getPropertyOptions(t),!((r.hasChanged??ss)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:n,wrapped:i},a){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,i]of r){const{wrapped:a}=i,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,i,c)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};lt.elementStyles=[],lt.shadowRootOptions={mode:"open"},lt[jt("elementProperties")]=new Map,lt[jt("finalized")]=new Map,Ri?.({ReactiveElement:lt}),(le.reactiveElementVersions??=[]).push("2.1.2");const rs=globalThis,Zs=s=>s,oe=rs.trustedTypes,Xs=oe?oe.createPolicy("lit-html",{createHTML:s=>s}):void 0,pn="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,fn="?"+K,Ti=`<${fn}>`,et=document,Yt=()=>et.createComment(""),Kt=s=>s===null||typeof s!="object"&&typeof s!="function",ns=Array.isArray,Ii=s=>ns(s)||typeof s?.[Symbol.iterator]=="function",me=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tr=/-->/g,er=/>/g,Q=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),sr=/'/g,rr=/"/g,gn=/^(?:script|style|textarea|title)$/i,Mi=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),T=Mi(1),ht=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),nr=new WeakMap,tt=et.createTreeWalker(et,129);function mn(s,t){if(!ns(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xs!==void 0?Xs.createHTML(t):t}const Ni=(s,t)=>{const e=s.length-1,r=[];let n,i=t===2?"<svg>":t===3?"<math>":"",a=Rt;for(let c=0;c<e;c++){const l=s[c];let h,p,o=-1,g=0;for(;g<l.length&&(a.lastIndex=g,p=a.exec(l),p!==null);)g=a.lastIndex,a===Rt?p[1]==="!--"?a=tr:p[1]!==void 0?a=er:p[2]!==void 0?(gn.test(p[2])&&(n=RegExp("</"+p[2],"g")),a=Q):p[3]!==void 0&&(a=Q):a===Q?p[0]===">"?(a=n??Rt,o=-1):p[1]===void 0?o=-2:(o=a.lastIndex-p[2].length,h=p[1],a=p[3]===void 0?Q:p[3]==='"'?rr:sr):a===rr||a===sr?a=Q:a===tr||a===er?a=Rt:(a=Q,n=void 0);const u=a===Q&&s[c+1].startsWith("/>")?" ":"";i+=a===Rt?l+Ti:o>=0?(r.push(h),l.slice(0,o)+pn+l.slice(o)+K+u):l+K+(o===-2?c:u)}return[mn(s,i+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class Gt{constructor({strings:t,_$litType$:e},r){let n;this.parts=[];let i=0,a=0;const c=t.length-1,l=this.parts,[h,p]=Ni(t,e);if(this.el=Gt.createElement(h,r),tt.currentNode=this.el.content,e===2||e===3){const o=this.el.content.firstChild;o.replaceWith(...o.childNodes)}for(;(n=tt.nextNode())!==null&&l.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(const o of n.getAttributeNames())if(o.endsWith(pn)){const g=p[a++],u=n.getAttribute(o).split(K),m=/([.?@])?(.*)/.exec(g);l.push({type:1,index:i,name:m[2],strings:u,ctor:m[1]==="."?qi:m[1]==="?"?Bi:m[1]==="@"?Oi:ue}),n.removeAttribute(o)}else o.startsWith(K)&&(l.push({type:6,index:i}),n.removeAttribute(o));if(gn.test(n.tagName)){const o=n.textContent.split(K),g=o.length-1;if(g>0){n.textContent=oe?oe.emptyScript:"";for(let u=0;u<g;u++)n.append(o[u],Yt()),tt.nextNode(),l.push({type:2,index:++i});n.append(o[g],Yt())}}}else if(n.nodeType===8)if(n.data===fn)l.push({type:2,index:i});else{let o=-1;for(;(o=n.data.indexOf(K,o+1))!==-1;)l.push({type:7,index:i}),o+=K.length-1}i++}}static createElement(t,e){const r=et.createElement("template");return r.innerHTML=t,r}}function dt(s,t,e=s,r){if(t===ht)return t;let n=r!==void 0?e._$Co?.[r]:e._$Cl;const i=Kt(t)?void 0:t._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(s),n._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=n:e._$Cl=n),n!==void 0&&(t=dt(s,n._$AS(s,t.values),n,r)),t}class Ui{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,n=(t?.creationScope??et).importNode(e,!0);tt.currentNode=n;let i=tt.nextNode(),a=0,c=0,l=r[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new Xt(i,i.nextSibling,this,t):l.type===1?h=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(h=new Li(i,this,t)),this._$AV.push(h),l=r[++c]}a!==l?.index&&(i=tt.nextNode(),a++)}return tt.currentNode=et,n}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Xt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=dt(this,t,e),Kt(t)?t===M||t==null||t===""?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==ht&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ii(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==M&&Kt(this._$AH)?this._$AA.nextSibling.data=t:this.T(et.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Gt.createElement(mn(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(e);else{const i=new Ui(n,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(t){let e=nr.get(t.strings);return e===void 0&&nr.set(t.strings,e=new Gt(t)),e}k(t){ns(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,n=0;for(const i of t)n===e.length?e.push(r=new Xt(this.O(Yt()),this.O(Yt()),this,this.options)):r=e[n],r._$AI(i),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const r=Zs(t).nextSibling;Zs(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class ue{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,i){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=M}_$AI(t,e=this,r,n){const i=this.strings;let a=!1;if(i===void 0)t=dt(this,t,e,0),a=!Kt(t)||t!==this._$AH&&t!==ht,a&&(this._$AH=t);else{const c=t;let l,h;for(t=i[0],l=0;l<i.length-1;l++)h=dt(this,c[r+l],e,l),h===ht&&(h=this._$AH[l]),a||=!Kt(h)||h!==this._$AH[l],h===M?t=M:t!==M&&(t+=(h??"")+i[l+1]),this._$AH[l]=h}a&&!n&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class qi extends ue{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}class Bi extends ue{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==M)}}class Oi extends ue{constructor(t,e,r,n,i){super(t,e,r,n,i),this.type=5}_$AI(t,e=this){if((t=dt(this,t,e,0)??M)===ht)return;const r=this._$AH,n=t===M&&r!==M||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==M&&(r===M||n);n&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Li{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){dt(this,t)}}const zi=rs.litHtmlPolyfillSupport;zi?.(Gt,Xt),(rs.litHtmlVersions??=[]).push("3.3.2");const Fi=(s,t,e)=>{const r=e?.renderBefore??t;let n=r._$litPart$;if(n===void 0){const i=e?.renderBefore??null;r._$litPart$=n=new Xt(t.insertBefore(Yt(),i),i,void 0,e??{})}return n._$AI(s),n};const is=globalThis;class U extends lt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Fi(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ht}}U._$litElement$=!0,U.finalized=!0,is.litElementHydrateSupport?.({LitElement:U});const Di=is.litElementPolyfillSupport;Di?.({LitElement:U});(is.litElementVersions??=[]).push("4.2.2");const W=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};const Hi={attribute:!0,type:String,converter:ie,reflect:!1,hasChanged:ss},Vi=(s=Hi,t,e)=>{const{kind:r,metadata:n}=e;let i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),r==="accessor"){const{name:a}=e;return{set(c){const l=t.get.call(this);t.set.call(this,c),this.requestUpdate(a,l,s,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,s,c),c}}}if(r==="setter"){const{name:a}=e;return function(c){const l=this[a];t.call(this,c),this.requestUpdate(a,l,s,!0,c)}}throw Error("Unsupported decorator location: "+r)};function Qt(s){return(t,e)=>typeof e=="object"?Vi(s,t,e):((r,n,i)=>{const a=n.hasOwnProperty(i);return n.constructor.createProperty(i,r),a?Object.getOwnPropertyDescriptor(n,i):void 0})(s,t,e)}function ae(s){return Qt({...s,state:!0,attribute:!1})}var ji=Object.create,os=Object.defineProperty,Wi=Object.getOwnPropertyDescriptor,vn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),bt=s=>{throw TypeError(s)},Ji=(s,t,e)=>t in s?os(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,ir=(s,t)=>os(s,"name",{value:t,configurable:!0}),Yi=s=>[,,,ji(s?.[vn("metadata")]??null)],yn=["class","method","getter","setter","accessor","field","value","get","set"],Mt=s=>s!==void 0&&typeof s!="function"?bt("Function expected"):s,Ki=(s,t,e,r,n)=>({kind:yn[s],name:t,metadata:r,addInitializer:i=>e._?bt("Already initialized"):n.push(Mt(i||null))}),Gi=(s,t)=>Ji(t,vn("metadata"),s[3]),Nt=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},as=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=yn[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&Wi(o<4?n:{get[e](){return or(this,i)},set[e](d){return cr(this,i,d)}},e));o?u&&o<4&&ir(i,(o>2?"set ":o>1?"get ":"")+e):ir(n,e);for(var v=r.length-1;v>=0;v--)h=Ki(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Qi(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?or:Zi)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>cr(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Mt(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?bt("Object expected"):(Mt(a=c.get)&&(f.get=a),Mt(a=c.set)&&(f.set=a),Mt(a=c.init)&&y.unshift(a));return o||Gi(s,n),f&&os(n,e,f),u?o^4?i:f:n},cs=(s,t,e)=>t.has(s)||bt("Cannot "+e),Qi=(s,t)=>Object(t)!==t?bt('Cannot use the "in" operator on this value'):s.has(t),or=(s,t,e)=>(cs(s,t,"read from private field"),e?e.call(s):t.get(s)),ar=(s,t,e)=>t.has(s)?bt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),cr=(s,t,e,r)=>(cs(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Zi=(s,t,e)=>(cs(s,t,"access private method"),e),wn,_n,De,bn,D,ls,us;bn=[W("navigation-bar")];class st extends(De=U,_n=[Qt({type:Array})],wn=[Qt({type:Number})],De){constructor(){super(...arguments),ar(this,ls,Nt(D,8,this,[])),Nt(D,11,this),ar(this,us,Nt(D,12,this,24)),Nt(D,15,this)}static template({clazz:t,buttons:e,numberOfButtons:r}){return T`
            <navigation-bar
                    class=${t}
                    .buttons=${e}
                    .numberOfButtons=${r}
            >
            </navigation-bar>`}render(){return T`
            <div class="content">

                ${this.buttons.map((t,e,r)=>T`
                        <div
                                class="button"
                                style="--step:${e}; --steps:${this.numberOfButtons}"
                                @mousedown=${n=>n.preventDefault()}
                                @click=${()=>t.onClick(this.buttons)}>
                            <div class="buttonBackground"></div>
                            <div class="buttonLabel">${t.name}</div>
                        </div>
                    `)}
                <svg width="0" height="0">
                    <defs>
                        <mask id="navigation-mask">
                            <rect width="1080" height="1080" fill="black"/>

                            <circle
                                    cx="540"
                                    cy="540"
                                    r="540"
                                    fill="white"
                            />

                            <circle
                                    cx="540"
                                    cy="540"
                                    r="440"
                                    fill="black"
                            />
                        </mask>
                        <clipPath id="navigation-clipPath">
                            <path
                                    fill-rule="evenodd"
                                    d="
          M540,540
          m-540,0
          a540,540 0 1,0 1080,0
          a540,540 0 1,0 -1080,0

          M540,540
          m-440,0
          a440,440 0 1,1 880,0
          a440,440 0 1,1 -880,0
        "
                            />
                        </clipPath>
                    </defs>
                </svg>
                <div class="contentBorder"></div>
            </div>
        `}}D=Yi(De);ls=new WeakMap;us=new WeakMap;as(D,4,"buttons",_n,st,ls);as(D,4,"numberOfButtons",wn,st,us);st=as(D,0,"NavigationBar",bn,st);st.styles=j`
        :host {
            pointer-events: none;
        }

        .content {
            display: flex;
            width: 100%;
            height: 100%;
            //background-color: rgba(0, 0, 0, 50%);
            mask: url("#navigation-mask");
            -webkit-mask: url("#navigation-mask");
            clip-path: url("#navigation-clipPath");
            -webkit-clip-path: url("#navigation-clipPath");
            pointer-events: all;
        }

        .contentBorder {
            position: absolute;
            width: 884px;
            height: 884px;
            //background-color: black;
            border-radius: 500px;
            left: 50%;
            top: 50%;
            translate: -50% -50%;
        }

        .button {
            --alfa: calc(360deg / var(--steps));
            --sin: sin(0.5 * var(--alfa));
            --cos: cos(0.5 * var(--alfa));
            left: 50%;
            top: 50%;
            position: absolute;
            cursor: pointer;
            clip-path: polygon(0px 0px, 600px 0px, calc(cos(var(--alfa)) * 600px) calc(sin(var(--alfa)) * 600px));
            rotate: calc(var(--step) * var(--alfa));

            .buttonBackground {
                position: absolute;
                width: 600px;
                height: 600px;
            }

            .buttonLabel {
                position: absolute;
                left: calc(var(--cos) * 490px);
                top: calc(var(--sin) * 490px);
                translate: -50% -50%;
                rotate: calc(var(--step) * var(--alfa) * -1);
                font-size: 64px;
                color: white;
            }
        }


    }
    `;Nt(D,1,st);class Xi{constructor({state:t}){this.state=t}focus(t){this.state.focusedElement.value=t,this.addButtons(this.createAlfabet(t,"abc"))}createAlfabet(t,e){const r=[],n={"!@#":"!@#$%^&*()_+-=[]{}/\\,.<>".split(""),123:"0123456789".split(""),ABC:"ABCDEFGHIJKLMNOPRSTUVWXYZ".split(""),abc:"abcdefghijklmnoprstuvwxyz".split("")};return t.addEventListener("blur",()=>this.removeMenu(r)),r.push({name:"↵",onClick:i=>{t.blur(),this.removeMenu(i)}}),r.push({name:"⌫",onClick:i=>{t.value=t.value.slice(0,-1),t.focus()}}),e!=="abc"&&r.push({name:"abc",onClick:i=>{this.removeMenu(i),this.addButtons(this.createAlfabet(t,"abc"))}}),e!=="ABC"&&r.push({name:"ABC",onClick:i=>{this.removeMenu(i),this.addButtons(this.createAlfabet(t,"ABC"))}}),e!=="123"&&r.push({name:"123",onClick:i=>{this.removeMenu(i),this.addButtons(this.createAlfabet(t,"123"))}}),e!=="!@#"&&r.push({name:"!@#",onClick:i=>{this.removeMenu(i),this.addButtons(this.createAlfabet(t,"!@#"))}}),n[e].forEach(i=>{r.push({name:i,onClick:a=>{t.value+=i,t.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}})}),r}blur(t){this.state.focusedElement.value===t&&(this.state.focusedElement.value=void 0)}render(){const t=this.state.menus.value[this.state.menus.value.length-1];return st.template({clazz:"navigation",buttons:t??[],numberOfButtons:Math.max(t.length,24)})}addButtons(t){this.state.menus.value=[...this.state.menus.value,t]}removeMenu(t){const e=this.state.menus.value.indexOf(t);e>=0&&this.state.menus.value.splice(e,1),this.state.menus.value=[...this.state.menus.value]}}const te=Symbol("context"),lr="http://localhost:2137/";class to{async fetchInfo(){return await(await fetch(lr+"info")).json()}async saveWifi(t){return await(await fetch(lr+"wifi",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}}class $n{constructor(){this.listeners=[]}addListener(t,e){this.listeners.push({callback:t,context:e})}removeListener(t,e){this.listeners=this.listeners.filter(r=>r.callback!==t||r.context!==e)}invoke(t){this.listeners.forEach(e=>e.callback.call(e.context,t))}}class Tt extends $n{constructor(t){super(),this._value=t}get value(){return this._value}set value(t){this._value!==t&&this.invoke(this._value=t)}}var eo=Object.create,hs=Object.defineProperty,so=Object.getOwnPropertyDescriptor,kn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),$t=s=>{throw TypeError(s)},ro=(s,t,e)=>t in s?hs(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,ur=(s,t)=>hs(s,"name",{value:t,configurable:!0}),no=s=>[,,,eo(s?.[kn("metadata")]??null)],Cn=["class","method","getter","setter","accessor","field","value","get","set"],Ut=s=>s!==void 0&&typeof s!="function"?$t("Function expected"):s,io=(s,t,e,r,n)=>({kind:Cn[s],name:t,metadata:r,addInitializer:i=>e._?$t("Already initialized"):n.push(Ut(i||null))}),oo=(s,t)=>ro(t,kn("metadata"),s[3]),qt=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},ds=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=Cn[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&so(o<4?n:{get[e](){return hr(this,i)},set[e](d){return pr(this,i,d)}},e));o?u&&o<4&&ur(i,(o>2?"set ":o>1?"get ":"")+e):ur(n,e);for(var v=r.length-1;v>=0;v--)h=io(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>ao(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?hr:co)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>pr(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Ut(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?$t("Object expected"):(Ut(a=c.get)&&(f.get=a),Ut(a=c.set)&&(f.set=a),Ut(a=c.init)&&y.unshift(a));return o||oo(s,n),f&&hs(n,e,f),u?o^4?i:f:n},ps=(s,t,e)=>t.has(s)||$t("Cannot "+e),ao=(s,t)=>Object(t)!==t?$t('Cannot use the "in" operator on this value'):s.has(t),hr=(s,t,e)=>(ps(s,t,"read from private field"),e?e.call(s):t.get(s)),dr=(s,t,e)=>t.has(s)?$t("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),pr=(s,t,e,r)=>(ps(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),co=(s,t,e)=>(ps(s,t,"access private method"),e),Sn,En,He,An,H,fs,gs;An=[W("clock-number")];class L extends(He=U,En=[Qt({type:String})],Sn=[Qt({type:String})],He){constructor(){super(...arguments),dr(this,fs,qt(H,8,this,"0")),qt(H,11,this),dr(this,gs,qt(H,12,this,"0")),qt(H,15,this)}static template({clazz:t,lastNumber:e,nextNumber:r,onClick:n}){return T`
            <clock-number
                    .lastNumber=${e}
                    .nextNumber=${r}
                    class=${t}
                    @click=${n}
            >
            </clock-number>
        `}updated(t){const e=this.shadowRoot?.querySelector(".prev.up");e.classList.remove("animating"),e.offsetWidth,e.classList.add("animating");const r=this.shadowRoot?.querySelector(".next.down");r.classList.remove("animating"),r.offsetWidth,r.classList.add("animating")}render(){return T`
            <div class="content">
                <div class="part next up" @click=${()=>this.changeNumber()}>
                    <div class="font">${this.nextNumber}</div>
                </div>
                <div class="part prev up">
                    <div class="font">${this.lastNumber}</div>
                </div>
                <div class="part prev down">
                    <div class="font">${this.lastNumber}</div>
                </div>
                <div class="part next down">
                    <div class="font">${this.nextNumber}</div>
                </div>
            </div>
        `}changeNumber(){this.requestUpdate()}}H=no(He);fs=new WeakMap;gs=new WeakMap;ds(H,4,"lastNumber",En,L,fs);ds(H,4,"nextNumber",Sn,L,gs);L=ds(H,0,"ClockNumber",An,L);L.styles=j`
        .content {
            position: absolute;
            width: 100%;
            height: 100%;

            .part {
                position: absolute;
                width: 100%;
                height: 50%;
                font-size: 256px;
                overflow: hidden;
                box-sizing: border-box;
                border: 2px solid black;
                background-color: white;

                .font {
                    position: absolute;
                    width: 100%;
                    text-align: center;
                }
            }

            .up {
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                bottom: 50%;

                .font {
                    top: 0px;
                }
            }

            .prev.up {
                transform-origin: center bottom;
            }

            .prev.up.animating {
                animation: prevUpFold .2s linear forwards;
            }

            .next.down {
                transform-origin: center top;
            }

            .next.down.animating {
                transform-origin: center top;
                animation: prevUpFold .2s linear reverse;
            }

            .down {
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
                top: 50%;

                .font {
                    bottom: 0px;
                }
            }
        }

        @keyframes prevUpFold {
            0% {
                transform: scaleY(1);
            }
            5% {
                transform: scaleY(0.9877);
            }
            10% {
                transform: scaleY(0.9511);
            }
            15% {
                transform: scaleY(0.8910);
            }
            20% {
                transform: scaleY(0.8090);
            }
            25% {
                transform: scaleY(0.7071);
            }
            30% {
                transform: scaleY(0.5878);
            }
            35% {
                transform: scaleY(0.4540);
            }
            40% {
                transform: scaleY(0.3090);
            }
            45% {
                transform: scaleY(0.1564);
            }
            50% {
                transform: scaleY(0);
            }
            100% {
                transform: scaleY(0);
            }
        }
    `;qt(H,1,L);var lo=Object.create,ms=Object.defineProperty,uo=Object.getOwnPropertyDescriptor,xn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),kt=s=>{throw TypeError(s)},ho=(s,t,e)=>t in s?ms(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,fr=(s,t)=>ms(s,"name",{value:t,configurable:!0}),po=s=>[,,,lo(s?.[xn("metadata")]??null)],Pn=["class","method","getter","setter","accessor","field","value","get","set"],Bt=s=>s!==void 0&&typeof s!="function"?kt("Function expected"):s,fo=(s,t,e,r,n)=>({kind:Pn[s],name:t,metadata:r,addInitializer:i=>e._?kt("Already initialized"):n.push(Bt(i||null))}),go=(s,t)=>ho(t,xn("metadata"),s[3]),Ve=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},Rn=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=Pn[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&uo(o<4?n:{get[e](){return gr(this,i)},set[e](d){return mr(this,i,d)}},e));o?u&&o<4&&fr(i,(o>2?"set ":o>1?"get ":"")+e):fr(n,e);for(var v=r.length-1;v>=0;v--)h=fo(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>mo(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?gr:yo)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>mr(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Bt(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?kt("Object expected"):(Bt(a=c.get)&&(f.get=a),Bt(a=c.set)&&(f.set=a),Bt(a=c.init)&&y.unshift(a));return o||go(s,n),f&&ms(n,e,f),u?o^4?i:f:n},vs=(s,t,e)=>t.has(s)||kt("Cannot "+e),mo=(s,t)=>Object(t)!==t?kt('Cannot use the "in" operator on this value'):s.has(t),gr=(s,t,e)=>(vs(s,t,"read from private field"),e?e.call(s):t.get(s)),vo=(s,t,e)=>t.has(s)?kt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),mr=(s,t,e,r)=>(vs(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),yo=(s,t,e)=>(vs(s,t,"access private method"),e),Tn,je,In,pt,ys;In=[W("clock-page")];class ft extends(je=U,Tn=[ce({context:te,subscribe:!0})],je){constructor(){super(...arguments),vo(this,ys,Ve(pt,8,this)),Ve(pt,11,this),this.now=0}static template({clazz:t}){return T`
            <clock-page class=${t}>

            </clock-page>
        `}connectedCallback(){super.connectedCallback(),this.controllers.clockController.event.addListener(this.onMinute,this),this.onMinute()}disconnectedCallback(){this.controllers.clockController.event.removeListener(this.onMinute,this),super.disconnectedCallback()}onMinute(){this.now=this.controllers.clockController.getTime(),this.requestUpdate()}render(){const[t,e]=this.controllers.clockController.getHours(this.now-6e4).split(""),[r,n]=this.controllers.clockController.getMinutes(this.now-6e4).split(""),[i,a]=this.controllers.clockController.getHours(this.now).split(""),[c,l]=this.controllers.clockController.getMinutes(this.now).split("");return T`
            Test

            <div class="content">
                <div class="time">
                    ${L.template({clazz:"firstHour number",lastNumber:t,nextNumber:i,onClick:()=>this.controllers.clockController.playHeeHee()})}
                    ${L.template({clazz:"secondHour number",lastNumber:e,nextNumber:a,onClick:()=>this.controllers.clockController.playHeeHee()})}
                    ${L.template({clazz:"firstMinute number",lastNumber:r,nextNumber:c,onClick:()=>this.controllers.clockController.playHeeHee()})}
                    ${L.template({clazz:"secondMinute number",lastNumber:n,nextNumber:l,onClick:()=>this.controllers.clockController.playHeeHee()})}
                </div>
            </div>

        `}}pt=po(je);ys=new WeakMap;Rn(pt,4,"controllers",Tn,ft,ys);ft=Rn(pt,0,"ClockPage",In,ft);ft.styles=j`
        .content {
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            position: absolute;

            .time {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 650px;
                height: 300px;

                .number {
                    position: absolute;
                    width: 150px;
                    height: 300px;
                }

                .firstHour {
                    left: 0px;
                }

                .secondHour {
                    left: 150px;
                }

                .firstMinute {
                    right: 150px;
                }

                .secondMinute {
                    right: 0px;
                }

            }
        }
    `;Ve(pt,1,ft);const wo=""+new URL("moon-DL8I-ycB.jpg",import.meta.url).href;var _o=Object.create,ws=Object.defineProperty,bo=Object.getOwnPropertyDescriptor,Mn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),Nn=s=>{throw TypeError(s)},$o=(s,t,e)=>t in s?ws(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,ko=(s,t)=>ws(s,"name",{value:t,configurable:!0}),Co=s=>[,,,_o(s?.[Mn("metadata")]??null)],So=["class","method","getter","setter","accessor","field","value","get","set"],Un=s=>s!==void 0&&typeof s!="function"?Nn("Function expected"):s,Eo=(s,t,e,r,n)=>({kind:So[s],name:t,metadata:r,addInitializer:i=>e._?Nn("Already initialized"):n.push(Un(i||null))}),Ao=(s,t)=>$o(t,Mn("metadata"),s[3]),xo=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)i[n].call(e);return r},Po=(s,t,e,r,n,i)=>{var a,c,l,h=t&7,p=!1,o=0,g=s[o]||(s[o]=[]),u=h&&(n=n.prototype,h<5&&(h>3||!p)&&bo(n,e));ko(n,e);for(var m=r.length-1;m>=0;m--)l=Eo(h,e,c={},s[3],g),a=(0,r[m])(n,l),c._=1,Un(a)&&(n=a);return Ao(s,n),u&&ws(n,e,u),p?h^4?i:u:n},qn,_s,Bn;qn=[W("moon-page")];const Ds=class Ds extends(Bn=U){static template({clazz:t}){return T`
            <moon-page class=${t}></moon-page>
        `}render(){return T`<div class="content"></div>`}};Ds.styles=j`
        .content {
            width: 100%;
            height: 100%;
            background-image: url(${ne(wo)});
            background-size: cover;
            background-position: center;
        }
    `;let gt=Ds;_s=Co(Bn);gt=Po(_s,0,"MoonPage",qn,gt);xo(_s,1,gt);function Z(s,t){if(s!=null)return t(s)}function Ro(s,t){if(s===void 0)return t()}function To(s,t){if(s!==null)return t(s)}var Io=Object.create,bs=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,On=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),Ct=s=>{throw TypeError(s)},No=(s,t,e)=>t in s?bs(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,vr=(s,t)=>bs(s,"name",{value:t,configurable:!0}),Uo=s=>[,,,Io(s?.[On("metadata")]??null)],Ln=["class","method","getter","setter","accessor","field","value","get","set"],Ot=s=>s!==void 0&&typeof s!="function"?Ct("Function expected"):s,qo=(s,t,e,r,n)=>({kind:Ln[s],name:t,metadata:r,addInitializer:i=>e._?Ct("Already initialized"):n.push(Ot(i||null))}),Bo=(s,t)=>No(t,On("metadata"),s[3]),Lt=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},$s=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=Ln[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&Mo(o<4?n:{get[e](){return yr(this,i)},set[e](d){return _r(this,i,d)}},e));o?u&&o<4&&vr(i,(o>2?"set ":o>1?"get ":"")+e):vr(n,e);for(var v=r.length-1;v>=0;v--)h=qo(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Oo(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?yr:Lo)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>_r(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Ot(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?Ct("Object expected"):(Ot(a=c.get)&&(f.get=a),Ot(a=c.set)&&(f.set=a),Ot(a=c.init)&&y.unshift(a));return o||Bo(s,n),f&&bs(n,e,f),u?o^4?i:f:n},ks=(s,t,e)=>t.has(s)||Ct("Cannot "+e),Oo=(s,t)=>Object(t)!==t?Ct('Cannot use the "in" operator on this value'):s.has(t),yr=(s,t,e)=>(ks(s,t,"read from private field"),e?e.call(s):t.get(s)),wr=(s,t,e)=>t.has(s)?Ct("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),_r=(s,t,e,r)=>(ks(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Lo=(s,t,e)=>(ks(s,t,"access private method"),e),zn,Fn,We,Dn,V,Cs,Ss;Dn=[W("photo-page")];class rt extends(We=U,Fn=[ce({context:te,subscribe:!0})],zn=[ae()],We){constructor(){super(...arguments),this.timeout=0,this.temporaryURL="https://photos.app.goo.gl/",wr(this,Cs,Lt(V,8,this)),Lt(V,11,this),wr(this,Ss,Lt(V,12,this,JSON.parse(localStorage.getItem("photo")??"null"))),Lt(V,15,this)}static template({clazz:t}){return T`
            <photo-page class=${t}>

            </photo-page>
        `}connectedCallback(){super.connectedCallback(),this.next()}disconnectedCallback(){clearTimeout(this.timeout),super.disconnectedCallback()}updated(t){super.updated(t),localStorage.setItem("photo",JSON.stringify(this.url))}async next(){clearTimeout(this.timeout),this.url=await this.controllers.photoController.getPhotoUrl(),this.timeout=setTimeout(()=>this.next(),6e4)}render(){return T`
            <div class="content" style="background-image: url('${this.url}')">
                <div class="blend" @click=${()=>this.next()}>
                    <div class="photo" style="background-image: url('${this.url}')">
                    </div>
                </div>
                ${Ro(this.controllers.state.photoUrl.value,()=>T`<input class="input"
                                    type="text"
                                    .value=${this.temporaryURL}
                                    @input=${t=>this.temporaryURL=t.target.value}
                                    @blur=${t=>this.controllers.menuController.blur(t.target)}
                                    @focus=${t=>this.controllers.menuController.focus(t.target)}
                        /><br/>
                        <button
                                class="confirm"
                                @click="${t=>{this.controllers.state.photoUrl.value=this.temporaryURL,this.requestUpdate(),this.next()}}"
                        >Confirm
                        </button>`)}
            </div>
        `}}V=Uo(We);Cs=new WeakMap;Ss=new WeakMap;$s(V,4,"controllers",Fn,rt,Cs);$s(V,4,"url",zn,rt,Ss);rt=$s(V,0,"PhotoPage",Dn,rt);rt.styles=j`
        .content {
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            position: absolute;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            .blend {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.25);

                .photo {
                    width: 100%;
                    height: 100%;
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                    border: solid black 5px;
                }
            }

            .input {
                position: absolute;
                font-size: 32px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 80%
            }

            .confirm {
                position: absolute;
                font-size: 32px;
                left: 50%;
                top: calc(50% + 50px);
                transform: translate(-50%, -50%);
                width: 80%
            }
        }
    `;Lt(V,1,rt);var zo=Object.create,Es=Object.defineProperty,Fo=Object.getOwnPropertyDescriptor,Hn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),St=s=>{throw TypeError(s)},Do=(s,t,e)=>t in s?Es(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,br=(s,t)=>Es(s,"name",{value:t,configurable:!0}),Ho=s=>[,,,zo(s?.[Hn("metadata")]??null)],Vn=["class","method","getter","setter","accessor","field","value","get","set"],zt=s=>s!==void 0&&typeof s!="function"?St("Function expected"):s,Vo=(s,t,e,r,n)=>({kind:Vn[s],name:t,metadata:r,addInitializer:i=>e._?St("Already initialized"):n.push(zt(i||null))}),jo=(s,t)=>Do(t,Hn("metadata"),s[3]),Je=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},jn=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=Vn[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&Fo(o<4?n:{get[e](){return $r(this,i)},set[e](d){return kr(this,i,d)}},e));o?u&&o<4&&br(i,(o>2?"set ":o>1?"get ":"")+e):br(n,e);for(var v=r.length-1;v>=0;v--)h=Vo(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Wo(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?$r:Yo)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>kr(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?zt(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?St("Object expected"):(zt(a=c.get)&&(f.get=a),zt(a=c.set)&&(f.set=a),zt(a=c.init)&&y.unshift(a));return o||jo(s,n),f&&Es(n,e,f),u?o^4?i:f:n},As=(s,t,e)=>t.has(s)||St("Cannot "+e),Wo=(s,t)=>Object(t)!==t?St('Cannot use the "in" operator on this value'):s.has(t),$r=(s,t,e)=>(As(s,t,"read from private field"),e?e.call(s):t.get(s)),Jo=(s,t,e)=>t.has(s)?St("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),kr=(s,t,e,r)=>(As(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Yo=(s,t,e)=>(As(s,t,"access private method"),e),Wn,Ye,Jn,mt,xs;Jn=[W("settings-page")];class vt extends(Ye=U,Wn=[ce({context:te,subscribe:!0})],Ye){constructor(){super(...arguments),Jo(this,xs,Je(mt,8,this)),Je(mt,11,this)}static template({clazz:t}){return T`
            <settings-page class=${t}>

            </settings-page>
        `}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){const t={ssid:this.controllers.state.wifi.value.networks[0]?.ssid??"",psk:this.controllers.state.wifi.value.networks[0]?.psk??""};let e=this.controllers.state.photoUrl.value;return T`
            <div class="content">
                <div>
                    <table class="settings">
                        <tbody>
                        <tr>
                            <td colspan="3">Album</td>
                        </tr>
                        <tr>
                            <td>Nazwa:</td>
                            <td>
                                <input type="text"
                                       .value=${this.controllers.state.photoUrl.value}
                                       @focus=${r=>this.controllers.menuController.focus(r.target)}
                                       @input=${r=>e=r.target.value}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button @click=${()=>{this.controllers.state.photoUrl.value=e}}>Zapisz
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table class="settings">
                        <tbody>
                        <tr>
                            <td colspan="3">WIFI</td>
                        </tr>
                        <tr>
                            <td>Nazwa:</td>
                            <td>
                                <input type="text"
                                       .value=${t?.ssid}
                                       @focus=${r=>this.controllers.menuController.focus(r.target)}
                                       @input=${r=>t.ssid=r.target.value}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Hasło:</td>
                            <td>
                                <input type="text"
                                       .value=${t?.psk}
                                       @focus=${r=>this.controllers.menuController.focus(r.target)}
                                       @input=${r=>t.psk=r.target.value}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <button @click=${()=>{this.controllers.communicationController.saveWifi(t),this.controllers.state.wifi.value.networks=[t]}}>Zapisz
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                Dostępne sieci:<br/>
                                ${this.controllers.state.wifi.value.availableNetworks.sort((r,n)=>n.signal-r.signal).map(r=>T`
                                            <div>${r.ssid}</div>`)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>`}}mt=Ho(Ye);xs=new WeakMap;jn(mt,4,"controllers",Wn,vt,xs);vt=jn(mt,0,"SettingsPage",Jn,vt);vt.styles=j`
        .content {
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
            position: absolute;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .settings {
            background-color: white;
            border-radius: 5px;
            width: 400px;
        }
    `;Je(mt,1,vt);const Ko=""+new URL("record-CR1XHHx2.jpg",import.meta.url).href,Go=""+new URL("record_mask-YSlP-AKt.jpg",import.meta.url).href;function Yn(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var at={},ve,Cr;function Qo(){return Cr||(Cr=1,ve=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ve}var ye={},Y={},Sr;function nt(){if(Sr)return Y;Sr=1;let s;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Y.getSymbolSize=function(r){if(!r)throw new Error('"version" cannot be null or undefined');if(r<1||r>40)throw new Error('"version" should be in range from 1 to 40');return r*4+17},Y.getSymbolTotalCodewords=function(r){return t[r]},Y.getBCHDigit=function(e){let r=0;for(;e!==0;)r++,e>>>=1;return r},Y.setToSJISFunction=function(r){if(typeof r!="function")throw new Error('"toSJISFunc" is not a valid function.');s=r},Y.isKanjiModeEnabled=function(){return typeof s<"u"},Y.toSJIS=function(r){return s(r)},Y}var we={},Er;function Ps(){return Er||(Er=1,(function(s){s.L={bit:1},s.M={bit:0},s.Q={bit:3},s.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return s.L;case"m":case"medium":return s.M;case"q":case"quartile":return s.Q;case"h":case"high":return s.H;default:throw new Error("Unknown EC Level: "+e)}}s.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},s.from=function(r,n){if(s.isValid(r))return r;try{return t(r)}catch{return n}}})(we)),we}var _e,Ar;function Zo(){if(Ar)return _e;Ar=1;function s(){this.buffer=[],this.length=0}return s.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let r=0;r<e;r++)this.putBit((t>>>e-r-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},_e=s,_e}var be,xr;function Xo(){if(xr)return be;xr=1;function s(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return s.prototype.set=function(t,e,r,n){const i=t*this.size+e;this.data[i]=r,n&&(this.reservedBit[i]=!0)},s.prototype.get=function(t,e){return this.data[t*this.size+e]},s.prototype.xor=function(t,e,r){this.data[t*this.size+e]^=r},s.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},be=s,be}var $e={},Pr;function ta(){return Pr||(Pr=1,(function(s){const t=nt().getSymbolSize;s.getRowColCoords=function(r){if(r===1)return[];const n=Math.floor(r/7)+2,i=t(r),a=i===145?26:Math.ceil((i-13)/(2*n-2))*2,c=[i-7];for(let l=1;l<n-1;l++)c[l]=c[l-1]-a;return c.push(6),c.reverse()},s.getPositions=function(r){const n=[],i=s.getRowColCoords(r),a=i.length;for(let c=0;c<a;c++)for(let l=0;l<a;l++)c===0&&l===0||c===0&&l===a-1||c===a-1&&l===0||n.push([i[c],i[l]]);return n}})($e)),$e}var ke={},Rr;function ea(){if(Rr)return ke;Rr=1;const s=nt().getSymbolSize,t=7;return ke.getPositions=function(r){const n=s(r);return[[0,0],[n-t,0],[0,n-t]]},ke}var Ce={},Tr;function sa(){return Tr||(Tr=1,(function(s){s.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};s.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},s.from=function(n){return s.isValid(n)?parseInt(n,10):void 0},s.getPenaltyN1=function(n){const i=n.size;let a=0,c=0,l=0,h=null,p=null;for(let o=0;o<i;o++){c=l=0,h=p=null;for(let g=0;g<i;g++){let u=n.get(o,g);u===h?c++:(c>=5&&(a+=t.N1+(c-5)),h=u,c=1),u=n.get(g,o),u===p?l++:(l>=5&&(a+=t.N1+(l-5)),p=u,l=1)}c>=5&&(a+=t.N1+(c-5)),l>=5&&(a+=t.N1+(l-5))}return a},s.getPenaltyN2=function(n){const i=n.size;let a=0;for(let c=0;c<i-1;c++)for(let l=0;l<i-1;l++){const h=n.get(c,l)+n.get(c,l+1)+n.get(c+1,l)+n.get(c+1,l+1);(h===4||h===0)&&a++}return a*t.N2},s.getPenaltyN3=function(n){const i=n.size;let a=0,c=0,l=0;for(let h=0;h<i;h++){c=l=0;for(let p=0;p<i;p++)c=c<<1&2047|n.get(h,p),p>=10&&(c===1488||c===93)&&a++,l=l<<1&2047|n.get(p,h),p>=10&&(l===1488||l===93)&&a++}return a*t.N3},s.getPenaltyN4=function(n){let i=0;const a=n.data.length;for(let l=0;l<a;l++)i+=n.data[l];return Math.abs(Math.ceil(i*100/a/5)-10)*t.N4};function e(r,n,i){switch(r){case s.Patterns.PATTERN000:return(n+i)%2===0;case s.Patterns.PATTERN001:return n%2===0;case s.Patterns.PATTERN010:return i%3===0;case s.Patterns.PATTERN011:return(n+i)%3===0;case s.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(i/3))%2===0;case s.Patterns.PATTERN101:return n*i%2+n*i%3===0;case s.Patterns.PATTERN110:return(n*i%2+n*i%3)%2===0;case s.Patterns.PATTERN111:return(n*i%3+(n+i)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}s.applyMask=function(n,i){const a=i.size;for(let c=0;c<a;c++)for(let l=0;l<a;l++)i.isReserved(l,c)||i.xor(l,c,e(n,l,c))},s.getBestMask=function(n,i){const a=Object.keys(s.Patterns).length;let c=0,l=1/0;for(let h=0;h<a;h++){i(h),s.applyMask(h,n);const p=s.getPenaltyN1(n)+s.getPenaltyN2(n)+s.getPenaltyN3(n)+s.getPenaltyN4(n);s.applyMask(h,n),p<l&&(l=p,c=h)}return c}})(Ce)),Ce}var se={},Ir;function Kn(){if(Ir)return se;Ir=1;const s=Ps(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return se.getBlocksCount=function(n,i){switch(i){case s.L:return t[(n-1)*4+0];case s.M:return t[(n-1)*4+1];case s.Q:return t[(n-1)*4+2];case s.H:return t[(n-1)*4+3];default:return}},se.getTotalCodewordsCount=function(n,i){switch(i){case s.L:return e[(n-1)*4+0];case s.M:return e[(n-1)*4+1];case s.Q:return e[(n-1)*4+2];case s.H:return e[(n-1)*4+3];default:return}},se}var Se={},It={},Mr;function ra(){if(Mr)return It;Mr=1;const s=new Uint8Array(512),t=new Uint8Array(256);return(function(){let r=1;for(let n=0;n<255;n++)s[n]=r,t[r]=n,r<<=1,r&256&&(r^=285);for(let n=255;n<512;n++)s[n]=s[n-255]})(),It.log=function(r){if(r<1)throw new Error("log("+r+")");return t[r]},It.exp=function(r){return s[r]},It.mul=function(r,n){return r===0||n===0?0:s[t[r]+t[n]]},It}var Nr;function na(){return Nr||(Nr=1,(function(s){const t=ra();s.mul=function(r,n){const i=new Uint8Array(r.length+n.length-1);for(let a=0;a<r.length;a++)for(let c=0;c<n.length;c++)i[a+c]^=t.mul(r[a],n[c]);return i},s.mod=function(r,n){let i=new Uint8Array(r);for(;i.length-n.length>=0;){const a=i[0];for(let l=0;l<n.length;l++)i[l]^=t.mul(n[l],a);let c=0;for(;c<i.length&&i[c]===0;)c++;i=i.slice(c)}return i},s.generateECPolynomial=function(r){let n=new Uint8Array([1]);for(let i=0;i<r;i++)n=s.mul(n,new Uint8Array([1,t.exp(i)]));return n}})(Se)),Se}var Ee,Ur;function ia(){if(Ur)return Ee;Ur=1;const s=na();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(r){this.degree=r,this.genPoly=s.generateECPolynomial(this.degree)},t.prototype.encode=function(r){if(!this.genPoly)throw new Error("Encoder not initialized");const n=new Uint8Array(r.length+this.degree);n.set(r);const i=s.mod(n,this.genPoly),a=this.degree-i.length;if(a>0){const c=new Uint8Array(this.degree);return c.set(i,a),c}return i},Ee=t,Ee}var Ae={},xe={},Pe={},qr;function Gn(){return qr||(qr=1,Pe.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),Pe}var O={},Br;function Qn(){if(Br)return O;Br=1;const s="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const r="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;O.KANJI=new RegExp(e,"g"),O.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),O.BYTE=new RegExp(r,"g"),O.NUMERIC=new RegExp(s,"g"),O.ALPHANUMERIC=new RegExp(t,"g");const n=new RegExp("^"+e+"$"),i=new RegExp("^"+s+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return O.testKanji=function(l){return n.test(l)},O.testNumeric=function(l){return i.test(l)},O.testAlphanumeric=function(l){return a.test(l)},O}var Or;function it(){return Or||(Or=1,(function(s){const t=Gn(),e=Qn();s.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},s.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},s.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},s.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},s.MIXED={bit:-1},s.getCharCountIndicator=function(i,a){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!t.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?i.ccBits[0]:a<27?i.ccBits[1]:i.ccBits[2]},s.getBestModeForData=function(i){return e.testNumeric(i)?s.NUMERIC:e.testAlphanumeric(i)?s.ALPHANUMERIC:e.testKanji(i)?s.KANJI:s.BYTE},s.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},s.isValid=function(i){return i&&i.bit&&i.ccBits};function r(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return s.NUMERIC;case"alphanumeric":return s.ALPHANUMERIC;case"kanji":return s.KANJI;case"byte":return s.BYTE;default:throw new Error("Unknown mode: "+n)}}s.from=function(i,a){if(s.isValid(i))return i;try{return r(i)}catch{return a}}})(xe)),xe}var Lr;function oa(){return Lr||(Lr=1,(function(s){const t=nt(),e=Kn(),r=Ps(),n=it(),i=Gn(),a=7973,c=t.getBCHDigit(a);function l(g,u,m){for(let w=1;w<=40;w++)if(u<=s.getCapacity(w,m,g))return w}function h(g,u){return n.getCharCountIndicator(g,u)+4}function p(g,u){let m=0;return g.forEach(function(w){const y=h(w.mode,u);m+=y+w.getBitsLength()}),m}function o(g,u){for(let m=1;m<=40;m++)if(p(g,m)<=s.getCapacity(m,u,n.MIXED))return m}s.from=function(u,m){return i.isValid(u)?parseInt(u,10):m},s.getCapacity=function(u,m,w){if(!i.isValid(u))throw new Error("Invalid QR Code version");typeof w>"u"&&(w=n.BYTE);const y=t.getSymbolTotalCodewords(u),_=e.getTotalCodewordsCount(u,m),f=(y-_)*8;if(w===n.MIXED)return f;const v=f-h(w,u);switch(w){case n.NUMERIC:return Math.floor(v/10*3);case n.ALPHANUMERIC:return Math.floor(v/11*2);case n.KANJI:return Math.floor(v/13);case n.BYTE:default:return Math.floor(v/8)}},s.getBestVersionForData=function(u,m){let w;const y=r.from(m,r.M);if(Array.isArray(u)){if(u.length>1)return o(u,y);if(u.length===0)return 1;w=u[0]}else w=u;return l(w.mode,w.getLength(),y)},s.getEncodedBits=function(u){if(!i.isValid(u)||u<7)throw new Error("Invalid QR Code version");let m=u<<12;for(;t.getBCHDigit(m)-c>=0;)m^=a<<t.getBCHDigit(m)-c;return u<<12|m}})(Ae)),Ae}var Re={},zr;function aa(){if(zr)return Re;zr=1;const s=nt(),t=1335,e=21522,r=s.getBCHDigit(t);return Re.getEncodedBits=function(i,a){const c=i.bit<<3|a;let l=c<<10;for(;s.getBCHDigit(l)-r>=0;)l^=t<<s.getBCHDigit(l)-r;return(c<<10|l)^e},Re}var Te={},Ie,Fr;function ca(){if(Fr)return Ie;Fr=1;const s=it();function t(e){this.mode=s.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(r){return 10*Math.floor(r/3)+(r%3?r%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){let n,i,a;for(n=0;n+3<=this.data.length;n+=3)i=this.data.substr(n,3),a=parseInt(i,10),r.put(a,10);const c=this.data.length-n;c>0&&(i=this.data.substr(n),a=parseInt(i,10),r.put(a,c*3+1))},Ie=t,Ie}var Me,Dr;function la(){if(Dr)return Me;Dr=1;const s=it(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(r){this.mode=s.ALPHANUMERIC,this.data=r}return e.getBitsLength=function(n){return 11*Math.floor(n/2)+6*(n%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let i;for(i=0;i+2<=this.data.length;i+=2){let a=t.indexOf(this.data[i])*45;a+=t.indexOf(this.data[i+1]),n.put(a,11)}this.data.length%2&&n.put(t.indexOf(this.data[i]),6)},Me=e,Me}var Ne,Hr;function ua(){if(Hr)return Ne;Hr=1;const s=it();function t(e){this.mode=s.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(r){return r*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let r=0,n=this.data.length;r<n;r++)e.put(this.data[r],8)},Ne=t,Ne}var Ue,Vr;function ha(){if(Vr)return Ue;Vr=1;const s=it(),t=nt();function e(r){this.mode=s.KANJI,this.data=r}return e.getBitsLength=function(n){return n*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(r){let n;for(n=0;n<this.data.length;n++){let i=t.toSJIS(this.data[n]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[n]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),r.put(i,13)}},Ue=e,Ue}var qe={exports:{}},jr;function da(){return jr||(jr=1,(function(s){var t={single_source_shortest_paths:function(e,r,n){var i={},a={};a[r]=0;var c=t.PriorityQueue.make();c.push(r,0);for(var l,h,p,o,g,u,m,w,y;!c.empty();){l=c.pop(),h=l.value,o=l.cost,g=e[h]||{};for(p in g)g.hasOwnProperty(p)&&(u=g[p],m=o+u,w=a[p],y=typeof a[p]>"u",(y||w>m)&&(a[p]=m,c.push(p,m),i[p]=h))}if(typeof n<"u"&&typeof a[n]>"u"){var _=["Could not find a path from ",r," to ",n,"."].join("");throw new Error(_)}return i},extract_shortest_path_from_predecessor_list:function(e,r){for(var n=[],i=r;i;)n.push(i),e[i],i=e[i];return n.reverse(),n},find_path:function(e,r,n){var i=t.single_source_shortest_paths(e,r,n);return t.extract_shortest_path_from_predecessor_list(i,n)},PriorityQueue:{make:function(e){var r=t.PriorityQueue,n={},i;e=e||{};for(i in r)r.hasOwnProperty(i)&&(n[i]=r[i]);return n.queue=[],n.sorter=e.sorter||r.default_sorter,n},default_sorter:function(e,r){return e.cost-r.cost},push:function(e,r){var n={value:e,cost:r};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};s.exports=t})(qe)),qe.exports}var Wr;function pa(){return Wr||(Wr=1,(function(s){const t=it(),e=ca(),r=la(),n=ua(),i=ha(),a=Qn(),c=nt(),l=da();function h(_){return unescape(encodeURIComponent(_)).length}function p(_,f,v){const d=[];let b;for(;(b=_.exec(v))!==null;)d.push({data:b[0],index:b.index,mode:f,length:b[0].length});return d}function o(_){const f=p(a.NUMERIC,t.NUMERIC,_),v=p(a.ALPHANUMERIC,t.ALPHANUMERIC,_);let d,b;return c.isKanjiModeEnabled()?(d=p(a.BYTE,t.BYTE,_),b=p(a.KANJI,t.KANJI,_)):(d=p(a.BYTE_KANJI,t.BYTE,_),b=[]),f.concat(v,d,b).sort(function(A,E){return A.index-E.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function g(_,f){switch(f){case t.NUMERIC:return e.getBitsLength(_);case t.ALPHANUMERIC:return r.getBitsLength(_);case t.KANJI:return i.getBitsLength(_);case t.BYTE:return n.getBitsLength(_)}}function u(_){return _.reduce(function(f,v){const d=f.length-1>=0?f[f.length-1]:null;return d&&d.mode===v.mode?(f[f.length-1].data+=v.data,f):(f.push(v),f)},[])}function m(_){const f=[];for(let v=0;v<_.length;v++){const d=_[v];switch(d.mode){case t.NUMERIC:f.push([d,{data:d.data,mode:t.ALPHANUMERIC,length:d.length},{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.ALPHANUMERIC:f.push([d,{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.KANJI:f.push([d,{data:d.data,mode:t.BYTE,length:h(d.data)}]);break;case t.BYTE:f.push([{data:d.data,mode:t.BYTE,length:h(d.data)}])}}return f}function w(_,f){const v={},d={start:{}};let b=["start"];for(let k=0;k<_.length;k++){const A=_[k],E=[];for(let $=0;$<A.length;$++){const P=A[$],C=""+k+$;E.push(C),v[C]={node:P,lastCount:0},d[C]={};for(let x=0;x<b.length;x++){const S=b[x];v[S]&&v[S].node.mode===P.mode?(d[S][C]=g(v[S].lastCount+P.length,P.mode)-g(v[S].lastCount,P.mode),v[S].lastCount+=P.length):(v[S]&&(v[S].lastCount=P.length),d[S][C]=g(P.length,P.mode)+4+t.getCharCountIndicator(P.mode,f))}}b=E}for(let k=0;k<b.length;k++)d[b[k]].end=0;return{map:d,table:v}}function y(_,f){let v;const d=t.getBestModeForData(_);if(v=t.from(f,d),v!==t.BYTE&&v.bit<d.bit)throw new Error('"'+_+'" cannot be encoded with mode '+t.toString(v)+`.
 Suggested mode is: `+t.toString(d));switch(v===t.KANJI&&!c.isKanjiModeEnabled()&&(v=t.BYTE),v){case t.NUMERIC:return new e(_);case t.ALPHANUMERIC:return new r(_);case t.KANJI:return new i(_);case t.BYTE:return new n(_)}}s.fromArray=function(f){return f.reduce(function(v,d){return typeof d=="string"?v.push(y(d,null)):d.data&&v.push(y(d.data,d.mode)),v},[])},s.fromString=function(f,v){const d=o(f,c.isKanjiModeEnabled()),b=m(d),k=w(b,v),A=l.find_path(k.map,"start","end"),E=[];for(let $=1;$<A.length-1;$++)E.push(k.table[A[$]].node);return s.fromArray(u(E))},s.rawSplit=function(f){return s.fromArray(o(f,c.isKanjiModeEnabled()))}})(Te)),Te}var Jr;function fa(){if(Jr)return ye;Jr=1;const s=nt(),t=Ps(),e=Zo(),r=Xo(),n=ta(),i=ea(),a=sa(),c=Kn(),l=ia(),h=oa(),p=aa(),o=it(),g=pa();function u(k,A){const E=k.size,$=i.getPositions(A);for(let P=0;P<$.length;P++){const C=$[P][0],x=$[P][1];for(let S=-1;S<=7;S++)if(!(C+S<=-1||E<=C+S))for(let R=-1;R<=7;R++)x+R<=-1||E<=x+R||(S>=0&&S<=6&&(R===0||R===6)||R>=0&&R<=6&&(S===0||S===6)||S>=2&&S<=4&&R>=2&&R<=4?k.set(C+S,x+R,!0,!0):k.set(C+S,x+R,!1,!0))}}function m(k){const A=k.size;for(let E=8;E<A-8;E++){const $=E%2===0;k.set(E,6,$,!0),k.set(6,E,$,!0)}}function w(k,A){const E=n.getPositions(A);for(let $=0;$<E.length;$++){const P=E[$][0],C=E[$][1];for(let x=-2;x<=2;x++)for(let S=-2;S<=2;S++)x===-2||x===2||S===-2||S===2||x===0&&S===0?k.set(P+x,C+S,!0,!0):k.set(P+x,C+S,!1,!0)}}function y(k,A){const E=k.size,$=h.getEncodedBits(A);let P,C,x;for(let S=0;S<18;S++)P=Math.floor(S/3),C=S%3+E-8-3,x=($>>S&1)===1,k.set(P,C,x,!0),k.set(C,P,x,!0)}function _(k,A,E){const $=k.size,P=p.getEncodedBits(A,E);let C,x;for(C=0;C<15;C++)x=(P>>C&1)===1,C<6?k.set(C,8,x,!0):C<8?k.set(C+1,8,x,!0):k.set($-15+C,8,x,!0),C<8?k.set(8,$-C-1,x,!0):C<9?k.set(8,15-C-1+1,x,!0):k.set(8,15-C-1,x,!0);k.set($-8,8,1,!0)}function f(k,A){const E=k.size;let $=-1,P=E-1,C=7,x=0;for(let S=E-1;S>0;S-=2)for(S===6&&S--;;){for(let R=0;R<2;R++)if(!k.isReserved(P,S-R)){let J=!1;x<A.length&&(J=(A[x]>>>C&1)===1),k.set(P,S-R,J),C--,C===-1&&(x++,C=7)}if(P+=$,P<0||E<=P){P-=$,$=-$;break}}}function v(k,A,E){const $=new e;E.forEach(function(R){$.put(R.mode.bit,4),$.put(R.getLength(),o.getCharCountIndicator(R.mode,k)),R.write($)});const P=s.getSymbolTotalCodewords(k),C=c.getTotalCodewordsCount(k,A),x=(P-C)*8;for($.getLengthInBits()+4<=x&&$.put(0,4);$.getLengthInBits()%8!==0;)$.putBit(0);const S=(x-$.getLengthInBits())/8;for(let R=0;R<S;R++)$.put(R%2?17:236,8);return d($,k,A)}function d(k,A,E){const $=s.getSymbolTotalCodewords(A),P=c.getTotalCodewordsCount(A,E),C=$-P,x=c.getBlocksCount(A,E),S=$%x,R=x-S,J=Math.floor($/x),Pt=Math.floor(C/x),mi=Pt+1,Hs=J-Pt,vi=new l(Hs);let de=0;const ee=new Array(x),Vs=new Array(x);let pe=0;const yi=new Uint8Array(k.buffer);for(let ot=0;ot<x;ot++){const ge=ot<R?Pt:mi;ee[ot]=yi.slice(de,de+ge),Vs[ot]=vi.encode(ee[ot]),de+=ge,pe=Math.max(pe,ge)}const fe=new Uint8Array($);let js=0,z,F;for(z=0;z<pe;z++)for(F=0;F<x;F++)z<ee[F].length&&(fe[js++]=ee[F][z]);for(z=0;z<Hs;z++)for(F=0;F<x;F++)fe[js++]=Vs[F][z];return fe}function b(k,A,E,$){let P;if(Array.isArray(k))P=g.fromArray(k);else if(typeof k=="string"){let J=A;if(!J){const Pt=g.rawSplit(k);J=h.getBestVersionForData(Pt,E)}P=g.fromString(k,J||40)}else throw new Error("Invalid data");const C=h.getBestVersionForData(P,E);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!A)A=C;else if(A<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const x=v(A,E,P),S=s.getSymbolSize(A),R=new r(S);return u(R,A),m(R),w(R,A),_(R,E,0),A>=7&&y(R,A),f(R,x),isNaN($)&&($=a.getBestMask(R,_.bind(null,R,E))),a.applyMask($,R),_(R,E,$),{modules:R,version:A,errorCorrectionLevel:E,maskPattern:$,segments:P}}return ye.create=function(A,E){if(typeof A>"u"||A==="")throw new Error("No input text");let $=t.M,P,C;return typeof E<"u"&&($=t.from(E.errorCorrectionLevel,t.M),P=h.from(E.version),C=a.from(E.maskPattern),E.toSJISFunc&&s.setToSJISFunction(E.toSJISFunc)),b(A,P,$,C)},ye}var Be={},Oe={},Yr;function Zn(){return Yr||(Yr=1,(function(s){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let r=e.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+e);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(i){return[i,i]}))),r.length===6&&r.push("F","F");const n=parseInt(r.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+r.slice(0,6).join("")}}s.getOptions=function(r){r||(r={}),r.color||(r.color={});const n=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,i=r.width&&r.width>=21?r.width:void 0,a=r.scale||4;return{width:i,scale:i?4:a,margin:n,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},s.getScale=function(r,n){return n.width&&n.width>=r+n.margin*2?n.width/(r+n.margin*2):n.scale},s.getImageWidth=function(r,n){const i=s.getScale(r,n);return Math.floor((r+n.margin*2)*i)},s.qrToImageData=function(r,n,i){const a=n.modules.size,c=n.modules.data,l=s.getScale(a,i),h=Math.floor((a+i.margin*2)*l),p=i.margin*l,o=[i.color.light,i.color.dark];for(let g=0;g<h;g++)for(let u=0;u<h;u++){let m=(g*h+u)*4,w=i.color.light;if(g>=p&&u>=p&&g<h-p&&u<h-p){const y=Math.floor((g-p)/l),_=Math.floor((u-p)/l);w=o[c[y*a+_]?1:0]}r[m++]=w.r,r[m++]=w.g,r[m++]=w.b,r[m]=w.a}}})(Oe)),Oe}var Kr;function ga(){return Kr||(Kr=1,(function(s){const t=Zn();function e(n,i,a){n.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=a,i.width=a,i.style.height=a+"px",i.style.width=a+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}s.render=function(i,a,c){let l=c,h=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(h=r()),l=t.getOptions(l);const p=t.getImageWidth(i.modules.size,l),o=h.getContext("2d"),g=o.createImageData(p,p);return t.qrToImageData(g.data,i,l),e(o,h,p),o.putImageData(g,0,0),h},s.renderToDataURL=function(i,a,c){let l=c;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const h=s.render(i,a,l),p=l.type||"image/png",o=l.rendererOpts||{};return h.toDataURL(p,o.quality)}})(Be)),Be}var Le={},Gr;function ma(){if(Gr)return Le;Gr=1;const s=Zn();function t(n,i){const a=n.a/255,c=i+'="'+n.hex+'"';return a<1?c+" "+i+'-opacity="'+a.toFixed(2).slice(1)+'"':c}function e(n,i,a){let c=n+i;return typeof a<"u"&&(c+=" "+a),c}function r(n,i,a){let c="",l=0,h=!1,p=0;for(let o=0;o<n.length;o++){const g=Math.floor(o%i),u=Math.floor(o/i);!g&&!h&&(h=!0),n[o]?(p++,o>0&&g>0&&n[o-1]||(c+=h?e("M",g+a,.5+u+a):e("m",l,0),l=0,h=!1),g+1<i&&n[o+1]||(c+=e("h",p),p=0)):l++}return c}return Le.render=function(i,a,c){const l=s.getOptions(a),h=i.modules.size,p=i.modules.data,o=h+l.margin*2,g=l.color.light.a?"<path "+t(l.color.light,"fill")+' d="M0 0h'+o+"v"+o+'H0z"/>':"",u="<path "+t(l.color.dark,"stroke")+' d="'+r(p,h,l.margin)+'"/>',m='viewBox="0 0 '+o+" "+o+'"',y='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+m+' shape-rendering="crispEdges">'+g+u+`</svg>
`;return typeof c=="function"&&c(null,y),y},Le}var Qr;function va(){if(Qr)return at;Qr=1;const s=Qo(),t=fa(),e=ga(),r=ma();function n(i,a,c,l,h){const p=[].slice.call(arguments,1),o=p.length,g=typeof p[o-1]=="function";if(!g&&!s())throw new Error("Callback required as last argument");if(g){if(o<2)throw new Error("Too few arguments provided");o===2?(h=c,c=a,a=l=void 0):o===3&&(a.getContext&&typeof h>"u"?(h=l,l=void 0):(h=l,l=c,c=a,a=void 0))}else{if(o<1)throw new Error("Too few arguments provided");return o===1?(c=a,a=l=void 0):o===2&&!a.getContext&&(l=c,c=a,a=void 0),new Promise(function(u,m){try{const w=t.create(c,l);u(i(w,a,l))}catch(w){m(w)}})}try{const u=t.create(c,l);h(null,i(u,a,l))}catch(u){h(u)}}return at.create=t.create,at.toCanvas=n.bind(null,e.render),at.toDataURL=n.bind(null,e.renderToDataURL),at.toString=n.bind(null,function(i,a,c){return r.render(i,c)}),at}var ya=va();const Zr=Yn(ya);var wa=Object.create,Rs=Object.defineProperty,_a=Object.getOwnPropertyDescriptor,Xn=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),Et=s=>{throw TypeError(s)},ba=(s,t,e)=>t in s?Rs(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,Xr=(s,t)=>Rs(s,"name",{value:t,configurable:!0}),$a=s=>[,,,wa(s?.[Xn("metadata")]??null)],ti=["class","method","getter","setter","accessor","field","value","get","set"],Ft=s=>s!==void 0&&typeof s!="function"?Et("Function expected"):s,ka=(s,t,e,r,n)=>({kind:ti[s],name:t,metadata:r,addInitializer:i=>e._?Et("Already initialized"):n.push(Ft(i||null))}),Ca=(s,t)=>ba(t,Xn("metadata"),s[3]),X=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},he=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=ti[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&_a(o<4?n:{get[e](){return tn(this,i)},set[e](d){return en(this,i,d)}},e));o?u&&o<4&&Xr(i,(o>2?"set ":o>1?"get ":"")+e):Xr(n,e);for(var v=r.length-1;v>=0;v--)h=ka(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Sa(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?tn:Ea)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>en(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Ft(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?Et("Object expected"):(Ft(a=c.get)&&(f.get=a),Ft(a=c.set)&&(f.set=a),Ft(a=c.init)&&y.unshift(a));return o||Ca(s,n),f&&Rs(n,e,f),u?o^4?i:f:n},Ts=(s,t,e)=>t.has(s)||Et("Cannot "+e),Sa=(s,t)=>Object(t)!==t?Et('Cannot use the "in" operator on this value'):s.has(t),tn=(s,t,e)=>(Ts(s,t,"read from private field"),e?e.call(s):t.get(s)),ze=(s,t,e)=>t.has(s)?Et("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),en=(s,t,e,r)=>(Ts(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Ea=(s,t,e)=>(Ts(s,t,"access private method"),e),ei,si,ri,Ke,ni,q,Is,Ms,Ns;ni=[W("spotify-page")];class G extends(Ke=U,ri=[ce({context:te,subscribe:!0})],si=[ae()],ei=[ae()],Ke){constructor(){super(...arguments),ze(this,Is,X(q,8,this)),X(q,11,this),ze(this,Ms,X(q,12,this,null)),X(q,15,this),ze(this,Ns,X(q,16,this,100)),X(q,19,this)}static template({clazz:t}){return T`
            <spotify-page class=${t}>

            </spotify-page>
        `}connectedCallback(){super.connectedCallback(),this.controllers.spotifyController.addListener("update",()=>{this.requestUpdate(),Zr.toDataURL(this.controllers.spotifyController.getUrl()).then(t=>this.qrUrl=t)}),Zr.toDataURL(this.controllers.spotifyController.getUrl()).then(t=>this.qrUrl=t)}render(){const t=this.controllers.spotifyController;return t.token?(t.devices?.devices.find(r=>r.is_active)?.id,T`

            ${To(t.playbackState,r=>{if(r.item?.type==="track"){const n=r.item;return console.log(n),T`
                        <div class="background">
                            <div class="vinyl ${r.is_playing?"isPlaying":"isNotPlaying"}"></div>
                            <div class="mask"></div>
                            <div class="vinylContent ${r.is_playing?"isPlaying":"isNotPlaying"}"
                                 style="background-image: url('${n.album.images[0].url}')"></div>
                            <div class="vinylDot"></div>
                            <div class="info">
                                <div class="title"> ${n.name}</div>
                                <div class="artist"> ${n.artists.map(i=>i.name).join(", ")}</div>
                            </div>
                        </div>
                    `}})}
            <div class="controllers">
                <div class="next" @click=${()=>t.previous()}>◀◀
                </div>
                ${t.playbackState?.is_playing?T`
                                    <div class="next" @click=${()=>t.pause()}>❚❚</div>`:T`
                                    <div class="next" @click=${()=>t.pause()}>▶</div>`}
                <div class="next" @click=${()=>t.next()}>▶▶</div>
            </div>
            ${this.renderSelect()}
            ${this.renderVolume()}
            ${this.renderLight()}
        `):this.generateQrCode()}renderLight(){return T` <input class="light"
                            type="range"
                            min="0"
                            max="100"
                            @change=${t=>{const e=t.target;this.light=e.valueAsNumber,fetch(`http://localhost:2137/light?value=${this.light}`)}}
                            .value=${this.light}/>`}renderVolume(){const t=this.controllers.spotifyController,e=t.playbackState?.device;if(e)return T` <input class="volume"
                                type="range"
                                min="0"
                                max="100"
                                @change=${r=>{const n=r.target;return t.volume(n.valueAsNumber)}}
                                .value=${e.volume_percent}/>`}renderSelect(){const t=this.controllers.spotifyController,e=t.devices,r=e?.devices?.find(n=>n.is_active)?.id;return T`
            <select
                    class="deviceSelect"
                    @change=${n=>{const i=n.target.value;i&&t.changeDevice(i)}}
                    .value=${r}>
                <option></option>
                ${e?.devices.sort((n,i)=>n.name<i.name?-1:1).map(n=>n.is_active?T`
                                    <option .value=${n.id} selected="selected">${n.name}</option>`:T`
                                    <option .value=${n.id}>${n.name}</option>`)}
            </select>`}generateQrCode(){return T`
            <img class="qr"
                 @click=${()=>this.controllers.spotifyController.tryAuth()}
                 width="400"
                 height="400"
                 src=${this.qrUrl}/>
        `}}q=$a(Ke);Is=new WeakMap;Ms=new WeakMap;Ns=new WeakMap;he(q,4,"controllers",ri,G,Is);he(q,4,"qrUrl",si,G,Ms);he(q,4,"light",ei,G,Ns);G=he(q,0,"SpotifyPage",ni,G);G.styles=j`
        :host {
            background-color: black;
            width: 100%;
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
        }

        .deviceSelect {
            position: absolute;
            width: 400px;
            height: 40px;
            left: calc(50% - 200px);
            bottom: 120px;
        }

        .volume {
            position: absolute;
            width: 200px;
            height: 40px;
            left: calc(50% - 100px);
            bottom: 280px;
        }

        .light {
            position: absolute;
            width: 200px;
            height: 40px;
            left: calc(50% - 100px);
            top: 140px;
        }

        .qr {
            cursor: pointer;
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 200px);
        }

        .background {
            pointer-events: none;
        }

        @keyframes rotation {
            0% {
                rotate: 0deg;
            }
            33% {
                rotate: 120deg;
            }
            66% {
                rotate: 240deg;
            }
            100% {
                rotate: 360deg;
            }
        }

        .vinyl {
            position: absolute;
            left: 0;
            top: 0;
            background-image: url(${ne(Ko)});
            width: 1080px;
            height: 1080px;
            animation-name: rotation;
            animation-duration: 8s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;

            &.isPlaying {
                animation-play-state: running;
            }

            &.isNotPlaying {
                animation-play-state: paused;
            }
        }

        .mask {
            left: 0;
            top: 0;
            position: absolute;
            background-image: url(${ne(Go)});
            mix-blend-mode: overlay;
            background-position: center center;
            width: 1080px;
            height: 1080px;
        }

        .vinylContent {
            position: absolute;
            border-radius: 200px;
            background-size: contain;
            width: 400px;
            height: 400px;
            left: calc(50% - 200px);
            top: calc(50% - 200px);
            animation-name: rotation;
            animation-duration: 8s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;

            &.isPlaying {
                animation-play-state: running;
            }

            &.isNotPlaying {
                animation-play-state: paused;
            }
        }

        .vinylDot {
            position: absolute;
            border-radius: 15px;
            background-size: contain;
            width: 30px;
            height: 30px;
            left: calc(50% - 15px);
            top: calc(50% - 15px);
            background-color: black;
        }

        .controllers {
            color: white;
            cursor: pointer;
            position: absolute;
            display: flex;
            width: 100%;
            height: 100px;
            bottom: 180px;
            justify-content: center;

        }

        .next {
            font-size: 24px;
            color: white;
            cursor: pointer;
            display: flex;
            width: 60px;
            height: 60px;
            border: solid 2px white;
            background-color: rgba(255, 255, 255, 10%);
            border-radius: 50px;
            margin: 10px;
            align-items: center;
            justify-content: center;
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
            position: absolute;
            left: 50%;
            top: 250px;
            transform: translate(-50%, -50%);

            .title {
                font-size: 24px;
            }

            .artist {
                font-size: 16px;
            }
        }
    `;X(q,1,G);var Aa=Object.create,Us=Object.defineProperty,xa=Object.getOwnPropertyDescriptor,ii=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),At=s=>{throw TypeError(s)},Pa=(s,t,e)=>t in s?Us(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,sn=(s,t)=>Us(s,"name",{value:t,configurable:!0}),Ra=s=>[,,,Aa(s?.[ii("metadata")]??null)],oi=["class","method","getter","setter","accessor","field","value","get","set"],Dt=s=>s!==void 0&&typeof s!="function"?At("Function expected"):s,Ta=(s,t,e,r,n)=>({kind:oi[s],name:t,metadata:r,addInitializer:i=>e._?At("Already initialized"):n.push(Dt(i||null))}),Ia=(s,t)=>Pa(t,ii("metadata"),s[3]),Ge=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},ai=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=oi[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&xa(o<4?n:{get[e](){return rn(this,i)},set[e](d){return nn(this,i,d)}},e));o?u&&o<4&&sn(i,(o>2?"set ":o>1?"get ":"")+e):sn(n,e);for(var v=r.length-1;v>=0;v--)h=Ta(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Ma(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?rn:Ua)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>nn(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Dt(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?At("Object expected"):(Dt(a=c.get)&&(f.get=a),Dt(a=c.set)&&(f.set=a),Dt(a=c.init)&&y.unshift(a));return o||Ia(s,n),f&&Us(n,e,f),u?o^4?i:f:n},qs=(s,t,e)=>t.has(s)||At("Cannot "+e),Ma=(s,t)=>Object(t)!==t?At('Cannot use the "in" operator on this value'):s.has(t),rn=(s,t,e)=>(qs(s,t,"read from private field"),e?e.call(s):t.get(s)),Na=(s,t,e)=>t.has(s)?At("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),nn=(s,t,e,r)=>(qs(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Ua=(s,t,e)=>(qs(s,t,"access private method"),e),ci,Qe,li,yt,Bs;li=[W("cats-page")];class wt extends(Qe=U,ci=[ae()],Qe){constructor(){super(...arguments),this.timeout=0,Na(this,Bs,Ge(yt,8,this,"")),Ge(yt,11,this)}static template({clazz:t}){return T`
            <cats-page class=${t}></cats-page>
        `}connectedCallback(){super.connectedCallback(),this.next()}async next(){const r=await(await fetch("https://api.thecatapi.com/v1/images/search?limit=1")).json();this.url=r[0].url,this.isConnected&&(this.timeout=setTimeout(()=>this.next(),3600*1e3))}disconnectedCallback(){clearTimeout(this.timeout),super.disconnectedCallback()}render(){return T`
            <div class="content" style="background-image: url('${this.url}')"></div>`}}yt=Ra(Qe);Bs=new WeakMap;ai(yt,4,"url",ci,wt,Bs);wt=ai(yt,0,"CatsPage",li,wt);wt.styles=j`
        .content {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
    `;Ge(yt,1,wt);var qa=Object.create,Os=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,ui=(s,t)=>(t=Symbol[s])?t:Symbol.for("Symbol."+s),xt=s=>{throw TypeError(s)},Oa=(s,t,e)=>t in s?Os(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,on=(s,t)=>Os(s,"name",{value:t,configurable:!0}),La=s=>[,,,qa(s?.[ui("metadata")]??null)],hi=["class","method","getter","setter","accessor","field","value","get","set"],Ht=s=>s!==void 0&&typeof s!="function"?xt("Function expected"):s,za=(s,t,e,r,n)=>({kind:hi[s],name:t,metadata:r,addInitializer:i=>e._?xt("Already initialized"):n.push(Ht(i||null))}),Fa=(s,t)=>Oa(t,ui("metadata"),s[3]),Ze=(s,t,e,r)=>{for(var n=0,i=s[t>>1],a=i&&i.length;n<a;n++)t&1?i[n].call(e):r=i[n].call(e,r);return r},di=(s,t,e,r,n,i)=>{var a,c,l,h,p,o=t&7,g=!!(t&8),u=!!(t&16),m=o>3?s.length+1:o?g?1:2:0,w=hi[o+5],y=o>3&&(s[m-1]=[]),_=s[m]||(s[m]=[]),f=o&&(!u&&!g&&(n=n.prototype),o<5&&(o>3||!u)&&Ba(o<4?n:{get[e](){return an(this,i)},set[e](d){return cn(this,i,d)}},e));o?u&&o<4&&on(i,(o>2?"set ":o>1?"get ":"")+e):on(n,e);for(var v=r.length-1;v>=0;v--)h=za(o,e,l={},s[3],_),o&&(h.static=g,h.private=u,p=h.access={has:u?d=>Da(n,d):d=>e in d},o^3&&(p.get=u?d=>(o^1?an:Va)(d,n,o^4?i:f.get):d=>d[e]),o>2&&(p.set=u?(d,b)=>cn(d,n,b,o^4?i:f.set):(d,b)=>d[e]=b)),c=(0,r[v])(o?o<4?u?i:f[w]:o>4?void 0:{get:f.get,set:f.set}:n,h),l._=1,o^4||c===void 0?Ht(c)&&(o>4?y.unshift(c):o?u?i=c:f[w]=c:n=c):typeof c!="object"||c===null?xt("Object expected"):(Ht(a=c.get)&&(f.get=a),Ht(a=c.set)&&(f.set=a),Ht(a=c.init)&&y.unshift(a));return o||Fa(s,n),f&&Os(n,e,f),u?o^4?i:f:n},Ls=(s,t,e)=>t.has(s)||xt("Cannot "+e),Da=(s,t)=>Object(t)!==t?xt('Cannot use the "in" operator on this value'):s.has(t),an=(s,t,e)=>(Ls(s,t,"read from private field"),e?e.call(s):t.get(s)),Ha=(s,t,e)=>t.has(s)?xt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),cn=(s,t,e,r)=>(Ls(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),Va=(s,t,e)=>(Ls(s,t,"access private method"),e),pi,Xe,fi,_t,zs;function ja(s,t){return s[t]?.()}fi=[W("root-component")];class Zt extends(Xe=U,pi=[bi({context:te})],Xe){constructor(){super(...arguments),Ha(this,zs,Ze(_t,8,this)),Ze(_t,11,this)}static template({clazz:t}){return T`
            <root-component class=${t}>

            </root-component>`}connectedCallback(){super.connectedCallback(),this.controllers.state.page.addListener(this.refresh,this),this.controllers.state.menus.addListener(this.refresh,this)}disconnectedCallback(){this.controllers.state.menus.removeListener(this.refresh,this),this.controllers.state.page.removeListener(this.refresh,this),super.disconnectedCallback()}refresh(){this.requestUpdate()}render(){return T`
            ${ja({spotify:()=>G.template({clazz:"page"}),clock:()=>ft.template({clazz:"page"}),photos:()=>rt.template({clazz:"page"}),moon:()=>gt.template({clazz:"page"}),cat:()=>wt.template({clazz:"page"}),settings:()=>vt.template({clazz:"page"})},this.controllers.state.page.value)}
            ${this.controllers.menuController.render()}
        `}}_t=La(Xe);zs=new WeakMap;di(_t,4,"controllers",pi,Zt,zs);Zt=di(_t,0,"Root",fi,Zt);Zt.styles=j`
        :host {
            width: 1080px;
            height: 1080px;
            position: absolute;
            left: calc(50% - 540px);
            top: calc(50% - 540px);
            scale: calc(var(--size) / 1080);
        }

        .navigation {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0px;
            top: 0px;
        }

        .page {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    `;Ze(_t,1,Zt);const ln=s=>{const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return crypto.getRandomValues(new Uint8Array(s)).reduce((r,n)=>r+t[n%t.length],"")};class Wa{}const Ja=""+new URL("michael-jackson-hee-hee-DTzZYY30.mp3",import.meta.url).href;class Ya{constructor(){this.event=new $n,this.now=0,this.audio=new Audio(Ja),this.loop()}async loop(){for(;;)this.event.invoke(),this.tryPlayHeeHee(),this.now=Date.now(),await new Promise(t=>setTimeout(t,6e4))}tryPlayHeeHee(){const t=new Date(this.now);if(t.getMinutes()===0){const e=t.getHours();e>=10&&e<=20&&this.playHeeHee()}}playHeeHee(){this.audio.play()}getTime(){return this.now}getMinutes(t){return new Date(t).getMinutes().toString().padStart(2,"0")}getHours(t){return new Date(t).getHours().toString().padStart(2,"0")}}class Ka{constructor({state:t,communicationController:e}){this.communication=e,this.state=t}async getPhotoUrl(){const t=this.state.photoUrl.value;if(!t)return"";const e=document.createElement("img");return e.crossOrigin="anonymous",e.src=`http://localhost:2137/photo?url=${t}&`+Math.random(),await new Promise(n=>e.onload=()=>{const i=document.createElement("canvas");i.width=e.naturalWidth,i.height=e.naturalHeight,i.getContext("2d").drawImage(e,0,0);const c=i.toDataURL("image/jpeg");n(c)})}}let ct="5e84c038c03c4d36ae8a807842a0f245";class I{api;constructor(t){this.api=t}async getRequest(t){return await this.api.makeRequest("GET",t)}async postRequest(t,e,r=void 0){return await this.api.makeRequest("POST",t,e,r)}async putRequest(t,e,r=void 0){return await this.api.makeRequest("PUT",t,e,r)}async deleteRequest(t,e){return await this.api.makeRequest("DELETE",t,e)}paramsFor(t){const e=new URLSearchParams;for(let r of Object.getOwnPropertyNames(t))(t[r]||t[r]===0||!t[r]&&typeof t[r]=="boolean")&&e.append(r,t[r].toString());return[...e].length>0?`?${e.toString()}`:""}}class Ga extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return await this.getRequest(`albums/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`albums${r}`)).albums}tracks(t,e,r,n){const i=this.paramsFor({market:e,limit:r,offset:n});return this.getRequest(`albums/${t}/tracks${i}`)}}class Qa extends I{async get(t){if(typeof t=="string")return this.getRequest(`artists/${t}`);const e=this.paramsFor({ids:t});return(await this.getRequest(`artists${e}`)).artists}albums(t,e,r,n,i){const a=this.paramsFor({include_groups:e,market:r,limit:n,offset:i});return this.getRequest(`artists/${t}/albums${a}`)}topTracks(t,e){const r=this.paramsFor({market:e});return this.getRequest(`artists/${t}/top-tracks${r}`)}relatedArtists(t){return this.getRequest(`artists/${t}/related-artists`)}}class Za extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return this.getRequest(`audiobooks/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`audiobooks${r}`)).audiobooks}getAudiobookChapters(t,e,r,n){const i=this.paramsFor({market:e,limit:r,offset:n});return this.getRequest(`audiobooks/${t}/chapters${i}`)}}class Xa extends I{getCategories(t,e,r,n){const i=this.paramsFor({country:t,locale:e,limit:r,offset:n});return this.getRequest(`browse/categories${i}`)}getCategory(t,e,r){const n=this.paramsFor({country:e,locale:r});return this.getRequest(`browse/categories/${t}${n}`)}getNewReleases(t,e,r){const n=this.paramsFor({country:t,limit:e,offset:r});return this.getRequest(`browse/new-releases${n}`)}getFeaturedPlaylists(t,e,r,n,i){const a=this.paramsFor({country:t,locale:e,timestamp:r,limit:n,offset:i});return this.getRequest(`browse/featured-playlists${a}`)}getPlaylistsForCategory(t,e,r,n){const i=this.paramsFor({country:e,limit:r,offset:n});return this.getRequest(`browse/categories/${t}/playlists${i}`)}}class tc extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return this.getRequest(`chapters/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`chapters${r}`)).chapters}}class ec extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return this.getRequest(`episodes/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`episodes${r}`)).episodes}}class sc extends I{get(t){const e=this.paramsFor(t);return this.getRequest(`recommendations${e}`)}genreSeeds(){return this.getRequest("recommendations/available-genre-seeds")}}class rc extends I{getAvailableMarkets(){return this.getRequest("markets")}}class nc extends I{getPlaybackState(t,e){const r=this.paramsFor({market:t,additional_types:e});return this.getRequest(`me/player${r}`)}getAvailableDevices(){return this.getRequest("me/player/devices")}getCurrentlyPlayingTrack(t,e){const r=this.paramsFor({market:t,additional_types:e});return this.getRequest(`me/player/currently-playing${r}`)}getRecentlyPlayedTracks(t,e){const r={limit:t};e&&(e.type==="before"?r.before=e.timestamp:e.type==="after"&&(r.after=e.timestamp));const n=this.paramsFor(r);return this.getRequest(`me/player/recently-played${n}`)}getUsersQueue(){return this.getRequest("me/player/queue")}async transferPlayback(t,e){if(t.length>1)throw new Error("Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request");await this.putRequest("me/player",{device_ids:t,play:e})}async startResumePlayback(t,e,r,n,i){const a=this.paramsFor({device_id:t});await this.putRequest(`me/player/play${a}`,{context_uri:e,uris:r,offset:n,positionMs:i})}async pausePlayback(t){const e=this.paramsFor({device_id:t});await this.putRequest(`me/player/pause${e}`)}async skipToNext(t){const e=this.paramsFor({device_id:t});await this.postRequest(`me/player/next${e}`)}async skipToPrevious(t){const e=this.paramsFor({device_id:t});await this.postRequest(`me/player/previous${e}`)}async seekToPosition(t,e){const r=this.paramsFor({position_ms:t,device_id:e});await this.putRequest(`me/player/seek${r}`)}async setRepeatMode(t,e){const r=this.paramsFor({state:t,device_id:e});await this.putRequest(`me/player/repeat${r}`)}async setPlaybackVolume(t,e){const r=this.paramsFor({volume_percent:t,device_id:e});await this.putRequest(`me/player/volume${r}`)}async togglePlaybackShuffle(t,e){const r=this.paramsFor({state:t,device_id:e});await this.putRequest(`me/player/shuffle${r}`)}async addItemToPlaybackQueue(t,e){const r=this.paramsFor({uri:t,device_id:e});await this.postRequest(`me/player/queue${r}`)}}class ic extends I{getPlaylist(t,e,r,n){const i=this.paramsFor({market:e,fields:r,additional_types:n?.join(",")});return this.getRequest(`playlists/${t}${i}`)}getPlaylistItems(t,e,r,n,i,a){const c=this.paramsFor({market:e,fields:r,limit:n,offset:i,additional_types:a?.join(",")});return this.getRequest(`playlists/${t}/tracks${c}`)}async changePlaylistDetails(t,e){await this.putRequest(`playlists/${t}`,e)}movePlaylistItems(t,e,r,n){return this.updatePlaylistItems(t,{range_start:e,range_length:r,insert_before:n})}updatePlaylistItems(t,e){return this.putRequest(`playlists/${t}/tracks`,e)}async addItemsToPlaylist(t,e,r){await this.postRequest(`playlists/${t}/tracks`,{position:r,uris:e})}async removeItemsFromPlaylist(t,e){await this.deleteRequest(`playlists/${t}/tracks`,e)}getUsersPlaylists(t,e,r){const n=this.paramsFor({limit:e,offset:r});return this.getRequest(`users/${t}/playlists${n}`)}createPlaylist(t,e){return this.postRequest(`users/${t}/playlists`,e)}getPlaylistCoverImage(t){return this.getRequest(`playlists/${t}/images`)}async addCustomPlaylistCoverImage(t,e){let r="";if(e instanceof Buffer)r=e.toString("base64");else if(e instanceof HTMLCanvasElement)r=e.toDataURL("image/jpeg").split(";base64,")[1];else if(e instanceof HTMLImageElement){const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");if(!i)throw new Error("Could not get canvas context");i.drawImage(e,0,0),r=n.toDataURL("image/jpeg").split(";base64,")[1]}else if(typeof e=="string")r=e;else throw new Error("ImageData must be a Buffer, HTMLImageElement, HTMLCanvasElement, or string containing a base64 encoded jpeg");await this.addCustomPlaylistCoverImageFromBase64String(t,r)}async addCustomPlaylistCoverImageFromBase64String(t,e){await this.putRequest(`playlists/${t}/images`,e,"image/jpeg")}}class oc extends I{async execute(t,e,r,n,i,a){const c=this.paramsFor({q:t,type:e,market:r,limit:n,offset:i,include_external:a});return await this.getRequest(`search${c}`)}}class ac extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return this.getRequest(`shows/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`shows${r}`)).shows}episodes(t,e,r,n){const i=this.paramsFor({market:e,limit:r,offset:n});return this.getRequest(`shows/${t}/episodes${i}`)}}class cc extends I{async get(t,e){if(typeof t=="string"){const i=this.paramsFor({market:e});return this.getRequest(`tracks/${t}${i}`)}const r=this.paramsFor({ids:t,market:e});return(await this.getRequest(`tracks${r}`)).tracks}async audioFeatures(t){if(typeof t=="string")return this.getRequest(`audio-features/${t}`);const e=this.paramsFor({ids:t});return(await this.getRequest(`audio-features${e}`)).audio_features}audioAnalysis(t){return this.getRequest(`audio-analysis/${t}`)}}const Fs={access_token:"emptyAccessToken",token_type:"",expires_in:0,refresh_token:"",expires:-1};function Vt(s){return s===Fs}class lc extends I{profile(t){return this.getRequest(`users/${t}`)}}class uc extends I{albums;audiobooks;episodes;playlists;shows;tracks;constructor(t){super(t),this.albums=new hc(t),this.audiobooks=new dc(t),this.episodes=new pc(t),this.playlists=new fc(t),this.shows=new gc(t),this.tracks=new mc(t)}profile(){return this.getRequest("me")}topItems(t,e,r,n){const i=this.paramsFor({time_range:e,limit:r,offset:n});return this.getRequest(`me/top/${t}${i}`)}followedArtists(t,e){const r=this.paramsFor({type:"artist",after:t,limit:e});return this.getRequest(`me/following${r}`)}async followArtistsOrUsers(t,e){const r=this.paramsFor({type:e});await this.putRequest(`me/following${r}`,{ids:t})}async unfollowArtistsOrUsers(t,e){const r=this.paramsFor({type:e});await this.deleteRequest(`me/following${r}`,{ids:t})}followsArtistsOrUsers(t,e){const r=this.paramsFor({ids:t,type:e});return this.getRequest(`me/following/contains${r}`)}}class hc extends I{savedAlbums(t,e,r){const n=this.paramsFor({limit:t,offset:e,market:r});return this.getRequest(`me/albums${n}`)}async saveAlbums(t){await this.putRequest("me/albums",t)}async removeSavedAlbums(t){await this.deleteRequest("me/albums",t)}hasSavedAlbums(t){const e=this.paramsFor({ids:t});return this.getRequest(`me/albums/contains${e}`)}}class dc extends I{savedAudiobooks(t,e){const r=this.paramsFor({limit:t,offset:e});return this.getRequest(`me/audiobooks${r}`)}async saveAudiobooks(t){await this.putRequest("me/audiobooks",t)}async removeSavedAudiobooks(t){await this.deleteRequest("me/audiobooks",t)}hasSavedAudiobooks(t){const e=this.paramsFor({ids:t});return this.getRequest(`me/audiobooks/contains${e}`)}}class pc extends I{savedEpisodes(t,e,r){const n=this.paramsFor({market:t,limit:e,offset:r});return this.getRequest(`me/episodes${n}`)}async saveEpisodes(t){await this.putRequest("me/episodes",t)}async removeSavedEpisodes(t){await this.deleteRequest("me/episodes",t)}hasSavedEpisodes(t){const e=this.paramsFor({ids:t});return this.getRequest(`me/episodes/contains${e}`)}}class fc extends I{playlists(t,e){const r=this.paramsFor({limit:t,offset:e});return this.getRequest(`me/playlists${r}`)}async follow(t){await this.putRequest(`playlists/${t}/followers`)}async unfollow(t){await this.deleteRequest(`playlists/${t}/followers`)}isFollowing(t,e){const r=this.paramsFor({ids:e});return this.getRequest(`playlists/${t}/followers/contains${r}`)}}class gc extends I{savedShows(t,e){const r=this.paramsFor({limit:t,offset:e});return this.getRequest(`me/shows${r}`)}saveShows(t){const e=this.paramsFor({ids:t});return this.putRequest(`me/shows${e}`)}removeSavedShows(t,e){const r=this.paramsFor({ids:t,market:e});return this.deleteRequest(`me/shows${r}`)}hasSavedShow(t){const e=this.paramsFor({ids:t});return this.getRequest(`me/shows/contains${e}`)}}class mc extends I{savedTracks(t,e,r){const n=this.paramsFor({limit:t,offset:e,market:r});return this.getRequest(`me/tracks${n}`)}async saveTracks(t){await this.putRequest("me/tracks",t)}async removeSavedTracks(t){await this.deleteRequest("me/tracks",t)}hasSavedTracks(t){const e=this.paramsFor({ids:t});return this.getRequest(`me/tracks/contains${e}`)}}class vc{static get current(){return this.hasSubtleCrypto?window.crypto:this.tryLoadNodeWebCrypto()}static get hasSubtleCrypto(){return typeof window<"u"&&typeof window.crypto<"u"&&typeof window.crypto.subtle<"u"}static tryLoadNodeWebCrypto(){try{const{webcrypto:t}=require("crypto");return t}catch(t){throw t}}}class N{static async refreshCachedAccessToken(t,e){const r=await N.refreshToken(t,e.refresh_token);return N.toCachable(r)}static toCachable(t){return t.expires&&t.expires===-1?t:{...t,expires:this.calculateExpiry(t)}}static calculateExpiry(t){return Date.now()+t.expires_in*1e3}static async refreshToken(t,e){const r=new URLSearchParams;r.append("client_id",t),r.append("grant_type","refresh_token"),r.append("refresh_token",e);const n=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r}),i=await n.text();if(!n.ok)throw new Error(`Failed to refresh token: ${n.statusText}, ${i}`);return JSON.parse(i)}static generateCodeVerifier(t){let e="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let n=0;n<t;n++)e+=r.charAt(Math.floor(Math.random()*r.length));return e}static async generateCodeChallenge(t){const e=new TextEncoder().encode(t),r=await vc.current.subtle.digest("SHA-256",e),n=[...new Uint8Array(r)];return(typeof Buffer<"u"?Buffer.from(r).toString("base64"):btoa(String.fromCharCode.apply(null,n))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}}class Wt{clientId;clientSecret;scopes;static cacheKey="spotify-sdk:ClientCredentialsStrategy:token";configuration=null;get cache(){return this.configuration.cachingStrategy}constructor(t,e,r=[]){this.clientId=t,this.clientSecret=e,this.scopes=r}setConfiguration(t){this.configuration=t}async getOrCreateAccessToken(){return await this.cache.getOrCreate(Wt.cacheKey,async()=>{const e=await this.getTokenFromApi();return N.toCachable(e)},async e=>{const r=await this.getTokenFromApi();return N.toCachable(r)})}async getAccessToken(){return await this.cache.get(Wt.cacheKey)}removeAccessToken(){this.cache.remove(Wt.cacheKey)}async getTokenFromApi(){const t={grant_type:"client_credentials",scope:this.scopes.join(" ")},e=Object.keys(t).map(l=>l+"="+t[l]).join("&"),r=typeof Buffer<"u",n=`${this.clientId}:${this.clientSecret}`,i=r?Buffer.from(n).toString("base64"):btoa(n),a=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:`Basic ${i}`},body:e});if(a.status!==200)throw new Error("Failed to get access token.");return await a.json()}}class Jt{clientId;redirectUri;scopes;static cacheKey="spotify-sdk:ImplicitGrantStrategy:token";configuration=null;get cache(){return this.configuration.cachingStrategy}constructor(t,e,r){this.clientId=t,this.redirectUri=e,this.scopes=r}setConfiguration(t){this.configuration=t}async getOrCreateAccessToken(){return await this.cache.getOrCreate(Jt.cacheKey,async()=>{const e=await this.redirectOrVerifyToken();return N.toCachable(e)},async e=>N.refreshCachedAccessToken(this.clientId,e))}async getAccessToken(){return await this.cache.get(Jt.cacheKey)}removeAccessToken(){this.cache.remove(Jt.cacheKey)}async redirectOrVerifyToken(){const t=new URLSearchParams(window.location.hash.substring(1)),e=t.get("access_token");if(e)return Promise.resolve({access_token:e,token_type:t.get("token_type")??"",expires_in:parseInt(t.get("expires_in")??"0"),refresh_token:t.get("refresh_token")??"",expires:Number(t.get("expires"))||0});var n=(this.scopes??[]).join(" ");const i=new URLSearchParams;i.append("client_id",this.clientId),i.append("response_type","token"),i.append("redirect_uri",this.redirectUri),i.append("scope",n);const a="https://accounts.spotify.com/authorize?"+i.toString();return this.configuration.redirectionStrategy.redirect(a),Fs}}class ut{clientId;redirectUri;scopes;static cacheKey="spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";configuration=null;get cache(){return this.configuration.cachingStrategy}constructor(t,e,r){this.clientId=t,this.redirectUri=e,this.scopes=r}setConfiguration(t){this.configuration=t}async getOrCreateAccessToken(){return await this.cache.getOrCreate(ut.cacheKey,async()=>{const e=await this.redirectOrVerifyToken();return N.toCachable(e)},async e=>N.refreshCachedAccessToken(this.clientId,e))}async getAccessToken(){return await this.cache.get(ut.cacheKey)}removeAccessToken(){this.cache.remove(ut.cacheKey)}async redirectOrVerifyToken(){const e=new URLSearchParams(window.location.search).get("code");if(e){const r=await this.verifyAndExchangeCode(e);return this.removeCodeFromUrl(),r}return this.redirectToSpotify(),Fs}async redirectToSpotify(){const t=N.generateCodeVerifier(128),e=await N.generateCodeChallenge(t),r={verifier:t,expiresOnAccess:!0};this.cache.setCacheItem("spotify-sdk:verifier",r);const n=await this.generateRedirectUrlForUser(this.scopes,e);await this.configuration.redirectionStrategy.redirect(n)}async verifyAndExchangeCode(t){const r=(await this.cache.get("spotify-sdk:verifier"))?.verifier;if(!r)throw new Error("No verifier found in cache - can't validate query string callback parameters.");return await this.configuration.redirectionStrategy.onReturnFromRedirect(),await this.exchangeCodeForToken(t,r)}removeCodeFromUrl(){const t=new URL(window.location.href);t.searchParams.delete("code");const e=t.search?t.href:t.href.replace("?","");window.history.replaceState({},document.title,e)}async generateRedirectUrlForUser(t,e){const r=t.join(" "),n=new URLSearchParams;return n.append("client_id",this.clientId),n.append("response_type","code"),n.append("redirect_uri",this.redirectUri),n.append("scope",r),n.append("code_challenge_method","S256"),n.append("code_challenge",e),`https://accounts.spotify.com/authorize?${n.toString()}`}async exchangeCodeForToken(t,e){const r=new URLSearchParams;r.append("client_id",this.clientId),r.append("grant_type","authorization_code"),r.append("code",t),r.append("redirect_uri",this.redirectUri),r.append("code_verifier",e);const n=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r}),i=await n.text();if(!n.ok)throw new Error(`Failed to exchange code for token: ${n.statusText}, ${i}`);return JSON.parse(i)}}class yc{async deserialize(t){const e=await t.text();return e.length>0?JSON.parse(e):null}}class wc{async validateResponse(t){switch(t.status){case 401:throw new Error("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.");case 403:const e=await t.text();throw new Error(`Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here. Body: ${e}`);case 429:throw new Error("The app has exceeded its rate limits.");default:if(!t.status.toString().startsWith("20")){const r=await t.text();throw new Error(`Unrecognised response code: ${t.status} - ${t.statusText}. Body: ${r}`)}}}}class _c{async handleErrors(t){return!1}}class bc{async redirect(t){document.location=t.toString()}async onReturnFromRedirect(){}}class gi{storage;updateFunctions;autoRenewInterval;autoRenewWindow;constructor(t,e=new Map,r=0,n=120*1e3){this.storage=t,this.updateFunctions=e,this.autoRenewInterval=r,this.autoRenewWindow=n,this.autoRenewInterval>0&&setInterval(()=>this.autoRenewRenewableItems(),this.autoRenewInterval)}async getOrCreate(t,e,r){r&&this.updateFunctions.set(t,r);const n=await this.get(t);if(n)return n;const i=await e();if(!i)throw new Error("Could not create cache item");return Vt(i)||this.setCacheItem(t,i),i}async get(t){let e=this.storage.get(t),r=e?JSON.parse(e):null;if(this.itemDueToExpire(r)&&this.updateFunctions.has(t)){const n=this.updateFunctions.get(t);await this.tryUpdateItem(t,r,n),e=this.storage.get(t),r=e?JSON.parse(e):null}return r?r.expires&&(r.expires===-1||r.expires<=Date.now())?(this.remove(t),null):(r.expiresOnAccess&&r.expiresOnAccess===!0&&this.remove(t),r):null}set(t,e,r){const n=Date.now()+r,i={...e,expires:n};this.setCacheItem(t,i)}setCacheItem(t,e){const r=JSON.stringify(e);this.storage.set(t,r)}remove(t){this.storage.remove(t)}itemDueToExpire(t){return!t||!t.expires?!1:t.expires-Date.now()<this.autoRenewWindow}async autoRenewRenewableItems(){this.updateFunctions.forEach(async(t,e)=>{const r=await this.get(e);r&&t&&this.itemDueToExpire(r)&&await this.tryUpdateItem(e,r,t)})}async tryUpdateItem(t,e,r){try{const n=await r(e);n&&this.setCacheItem(t,n)}catch(n){console.error(n)}}}class $c extends gi{constructor(){super(new kc)}}class kc{get(t){return localStorage.getItem(t)}set(t,e){localStorage.setItem(t,e)}remove(t){localStorage.removeItem(t)}}class Cc extends gi{constructor(){super(new Sc)}}class Sc{cache=new Map;get(t){return this.cache.get(t)??null}set(t,e){this.cache.set(t,e)}remove(t){this.cache.delete(t)}}class Ec{clientId;accessToken;refreshTokenAction;constructor(t,e,r){this.clientId=t,this.accessToken=e,this.refreshTokenAction=r||N.refreshCachedAccessToken,this.accessToken.expires||(this.accessToken.expires=N.calculateExpiry(this.accessToken))}setConfiguration(t){}async getOrCreateAccessToken(){if(this.accessToken.expires&&this.accessToken.expires<=Date.now()){const t=await this.refreshTokenAction(this.clientId,this.accessToken);this.accessToken=t}return this.accessToken}async getAccessToken(){return this.accessToken}removeAccessToken(){this.accessToken={access_token:"",token_type:"",expires_in:0,refresh_token:"",expires:0}}}class B{sdkConfig;static rootUrl="https://api.spotify.com/v1/";authenticationStrategy;albums;artists;audiobooks;browse;chapters;episodes;recommendations;markets;player;playlists;shows;tracks;users;search;currentUser;constructor(t,e){this.sdkConfig=this.initializeSdk(e),this.albums=new Ga(this),this.artists=new Qa(this),this.audiobooks=new Za(this),this.browse=new Xa(this),this.chapters=new tc(this),this.episodes=new ec(this),this.recommendations=new sc(this),this.markets=new rc(this),this.player=new nc(this),this.playlists=new ic(this),this.shows=new ac(this),this.tracks=new cc(this),this.users=new lc(this),this.currentUser=new uc(this);const r=new oc(this);this.search=r.execute.bind(r),this.authenticationStrategy=t,this.authenticationStrategy.setConfiguration(this.sdkConfig)}async makeRequest(t,e,r=void 0,n=void 0){try{const i=await this.authenticationStrategy.getOrCreateAccessToken();if(Vt(i))return console.warn("No access token found, authenticating now."),null;const a=i?.access_token,c=B.rootUrl+e,l={method:t,headers:{Authorization:`Bearer ${a}`,"Content-Type":n??"application/json"},body:r?typeof r=="string"?r:JSON.stringify(r):void 0};this.sdkConfig.beforeRequest(c,l);const h=await this.sdkConfig.fetch(c,l);return this.sdkConfig.afterRequest(c,l,h),h.status===204?null:(await this.sdkConfig.responseValidator.validateResponse(h),this.sdkConfig.deserializer.deserialize(h))}catch(i){if(!await this.sdkConfig.errorHandler.handleErrors(i))throw i;return null}}initializeSdk(t){const e=typeof window<"u";return{...{fetch:(n,i)=>fetch(n,i),beforeRequest:(n,i)=>{},afterRequest:(n,i,a)=>{},deserializer:new yc,responseValidator:new wc,errorHandler:new _c,redirectionStrategy:new bc,cachingStrategy:e?new $c:new Cc},...t}}switchAuthenticationStrategy(t){this.authenticationStrategy=t,this.authenticationStrategy.setConfiguration(this.sdkConfig),this.authenticationStrategy.getOrCreateAccessToken()}async authenticate(){const t=await this.authenticationStrategy.getOrCreateAccessToken();return{authenticated:t.expires>Date.now()&&!Vt(t),accessToken:t}}async getAccessToken(){return this.authenticationStrategy.getAccessToken()}logOut(){this.authenticationStrategy.removeAccessToken()}static withUserAuthorization(t,e,r=[],n){const i=new ut(t,e,r);return new B(i,n)}static withClientCredentials(t,e,r=[],n){const i=new Wt(t,e,r);return new B(i,n)}static withImplicitGrant(t,e,r=[],n){const i=new Jt(t,e,r);return new B(i,n)}static withAccessToken(t,e,r){const n=new Ec(t,e);return new B(n,r)}static async performUserAuthorization(t,e,r,n,i){const a=new ut(t,e,r),l=await new B(a,i).authenticationStrategy.getOrCreateAccessToken();return Vt(l)||(typeof n=="string"?(console.log("Posting access token to postback URL."),await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})):await n(l)),{authenticated:l.expires>Date.now()&&!Vt(l),accessToken:l}}}var Fe={exports:{}},un;function Ac(){return un||(un=1,(function(s){var t=Object.prototype.hasOwnProperty,e="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(e=!1));function n(l,h,p){this.fn=l,this.context=h,this.once=p||!1}function i(l,h,p,o,g){if(typeof p!="function")throw new TypeError("The listener must be a function");var u=new n(p,o||l,g),m=e?e+h:h;return l._events[m]?l._events[m].fn?l._events[m]=[l._events[m],u]:l._events[m].push(u):(l._events[m]=u,l._eventsCount++),l}function a(l,h){--l._eventsCount===0?l._events=new r:delete l._events[h]}function c(){this._events=new r,this._eventsCount=0}c.prototype.eventNames=function(){var h=[],p,o;if(this._eventsCount===0)return h;for(o in p=this._events)t.call(p,o)&&h.push(e?o.slice(1):o);return Object.getOwnPropertySymbols?h.concat(Object.getOwnPropertySymbols(p)):h},c.prototype.listeners=function(h){var p=e?e+h:h,o=this._events[p];if(!o)return[];if(o.fn)return[o.fn];for(var g=0,u=o.length,m=new Array(u);g<u;g++)m[g]=o[g].fn;return m},c.prototype.listenerCount=function(h){var p=e?e+h:h,o=this._events[p];return o?o.fn?1:o.length:0},c.prototype.emit=function(h,p,o,g,u,m){var w=e?e+h:h;if(!this._events[w])return!1;var y=this._events[w],_=arguments.length,f,v;if(y.fn){switch(y.once&&this.removeListener(h,y.fn,void 0,!0),_){case 1:return y.fn.call(y.context),!0;case 2:return y.fn.call(y.context,p),!0;case 3:return y.fn.call(y.context,p,o),!0;case 4:return y.fn.call(y.context,p,o,g),!0;case 5:return y.fn.call(y.context,p,o,g,u),!0;case 6:return y.fn.call(y.context,p,o,g,u,m),!0}for(v=1,f=new Array(_-1);v<_;v++)f[v-1]=arguments[v];y.fn.apply(y.context,f)}else{var d=y.length,b;for(v=0;v<d;v++)switch(y[v].once&&this.removeListener(h,y[v].fn,void 0,!0),_){case 1:y[v].fn.call(y[v].context);break;case 2:y[v].fn.call(y[v].context,p);break;case 3:y[v].fn.call(y[v].context,p,o);break;case 4:y[v].fn.call(y[v].context,p,o,g);break;default:if(!f)for(b=1,f=new Array(_-1);b<_;b++)f[b-1]=arguments[b];y[v].fn.apply(y[v].context,f)}}return!0},c.prototype.on=function(h,p,o){return i(this,h,p,o,!1)},c.prototype.once=function(h,p,o){return i(this,h,p,o,!0)},c.prototype.removeListener=function(h,p,o,g){var u=e?e+h:h;if(!this._events[u])return this;if(!p)return a(this,u),this;var m=this._events[u];if(m.fn)m.fn===p&&(!g||m.once)&&(!o||m.context===o)&&a(this,u);else{for(var w=0,y=[],_=m.length;w<_;w++)(m[w].fn!==p||g&&!m[w].once||o&&m[w].context!==o)&&y.push(m[w]);y.length?this._events[u]=y.length===1?y[0]:y:a(this,u)}return this},c.prototype.removeAllListeners=function(h){var p;return h?(p=e?e+h:h,this._events[p]&&a(this,p)):(this._events=new r,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=e,c.EventEmitter=c,s.exports=c})(Fe)),Fe.exports}var xc=Ac();const Pc=Yn(xc);function Rc(s){let t=s.supports_volume;return[void 0,!0].includes(t)}class Tc extends Pc{constructor(){super(),this.sessionId=ln(32),this.api=null,this.playbackState=null,this.devices=null,this.init()}get token(){return JSON.parse(localStorage.getItem("refresh_token")??"null")}set token(t){t?localStorage.setItem("refresh_token",JSON.stringify(t)):localStorage.removeItem("refresh_token")}async init(){if(new URLSearchParams(window.location.search).get("code")){const r=B.withUserAuthorization(ct,this.getRedirectUri(),this.getScopes());try{const n=await r.authenticate();n.authenticated&&(this.token=await this.refreshToken(n.accessToken))}catch(n){console.log("Nieudany odzysk"),console.log(n),r.logOut(),this.token=null}}if(this.token)try{console.log("Restore z pamięci"),this.token=await this.refreshToken(this.token),console.log("Udany restore z pamięci")}catch(r){console.log("Nieudany restore z pamięci"),console.log(r),this.token=null}for(;!this.token;){const n=await(await fetch(`https://teampretzels.com/spotify-redirect/backend.php?sessionId=${this.sessionId}`,{method:"GET"})).json();if(n)try{this.token=await this.refreshToken(n),console.log("Udany restore z serwera ")}catch(i){console.log("Nieudany restore z serwera"),console.log(i),this.token=null,this.sessionId=ln(32),this.emit("update")}this.token||(console.log("Oczekiwanie na restore z serwera"),await new Promise(i=>setTimeout(i,1e3)))}this.api=B.withAccessToken(ct,this.token),setInterval(async()=>{this.api=null,this.token=await this.refreshToken(this.token),this.api=B.withAccessToken(ct,this.token)},1800*1e3),setInterval(()=>this.update(),5e3),this.update()}async refreshToken(t){const e=t.refresh_token,r="https://accounts.spotify.com/api/token",n={method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:e,client_id:ct})},a=await(await fetch(r,n)).json();if(a.error)throw a.error;return a}async update(){Z(this.api,async t=>{try{this.playbackState=await t.player.getPlaybackState("PL")??null,this.emit("update"),this.devices=await t.player.getAvailableDevices()??null,this.emit("update")}catch(e){console.log("UPDATE Error"),console.error(e),this.api=null}})}async previous(){Z(await this.getActiveDeviceId(),async t=>{await this.api?.player.skipToPrevious(t),this.update()})}async next(){Z(await this.getActiveDeviceId(),async t=>{await this.api?.player.skipToNext(t),this.update()})}async volume(t){Z(await this.getActiveDevice(),e=>{e.id&&Rc(e)&&this.api?.player.setPlaybackVolume(t,e.id)})}async pause(){Z(await this.getPlaybackState(),async t=>{await Z(t.device.id,e=>t.is_playing?this.api?.player.pausePlayback(e):this.api?.player.startResumePlayback(e)),this.update()})}async getPlaybackState(){return Z(this.api,async t=>(this.playbackState=await t.player.getPlaybackState(),this.emit("update"),this.playbackState))}async getActiveDevice(){return(await this.getPlaybackState())?.device}async getActiveDeviceId(){return(await this.getActiveDevice())?.id}async changeDevice(t){await this.api?.player.transferPlayback([t]),this.update()}getUrl(){return`https://teampretzels.com/spotify-redirect/?sessionId=${this.sessionId}&clientId=${ct}`}async tryAuth(){const t=B.withUserAuthorization(ct,this.getRedirectUri(),this.getScopes());try{const e=await t.authenticate();e.authenticated&&(this.token=await this.refreshToken(e.accessToken))}catch(e){console.log("Nieudany odzysk"),console.log(e),t.logOut(),this.token=null,this.tryAuth()}}getScopes(){return["user-read-private","user-read-email","user-read-playback-state","user-read-currently-playing","user-modify-playback-state"]}getRedirectUri(){return location.href.split("?")[0].replace("localhost","127.0.0.1")}}(async function(){document.body.style.margin="0",document.body.style.padding="0",document.body.style.overflow="hidden";const s=new to,t=localStorage.getItem("data")?JSON.parse(localStorage.getItem("data")):{},e={photoUrl:new Tt(t.photosUrl),menus:new Tt([]),page:new Tt(t.page??"clock"),focusedElement:new Tt(void 0),wifi:new Tt(void 0)};e.page.addListener(l=>{t.page=l,localStorage.setItem("data",JSON.stringify(t))}),e.photoUrl.addListener(l=>{t.photosUrl=l,localStorage.setItem("data",JSON.stringify(t))}),e.wifi.value=await s.fetchInfo();const r=new Xi({state:e});r.addButtons([{name:"⋮",onClick:()=>{r.addButtons([{name:"⋮",onClick:l=>{r.removeMenu(l)}},{name:"🕒",onClick:l=>{e.page.value="clock",r.removeMenu(l)}},{name:"🎵",onClick:l=>{e.page.value="spotify",r.removeMenu(l)}},{name:"📷",onClick:l=>{e.page.value="photos",r.removeMenu(l)}},{name:"🌝",onClick:l=>{e.page.value="moon",r.removeMenu(l)}},{name:"CAT",onClick:l=>{e.page.value="cat",r.removeMenu(l)}},{name:"F",onClick:l=>{document.body.requestFullscreen(),r.removeMenu(l)}},{name:"⚙️",onClick:l=>{e.page.value="settings",r.removeMenu(l)}},{name:"↻",onClick:l=>{location.reload(),r.removeMenu(l)}},{name:"↑",onClick:l=>{fetch("http://localhost:2137/upgrade"),r.removeMenu(l)}},{name:"⏻",onClick:l=>{fetch("http://localhost:2137/shutdown"),r.removeMenu(l)}}])}}]);const n=document.createElement("root-component");n.controllers={data:t,state:e,menuController:r,spotifyController:new Tc,clockController:new Ya,brightnessController:new Wa,communicationController:s,photoController:new Ka({communicationController:s,state:e})},document.body.appendChild(n);let i=NaN,a=NaN;function c(){(i!==window.innerWidth||a!==window.innerHeight)&&(i=window.innerWidth,a=window.innerHeight,n.style.setProperty("--size",""+Math.min(window.innerWidth,window.innerHeight)))}setInterval(()=>c(),1e3),c()})();
