(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()})(0,function(){"use strict"
function t(t="unreachable"){return new Error(t)}function e(t,e){if(!t)throw new Error(e||"assertion failure")}const i=Object.keys
function n(t){for(let e=1;e<arguments.length;e++){let n=arguments[e]
if(null===n||"object"!=typeof n)continue
let s=i(n)
for(let e=0;e<s.length;e++){let i=s[e]
t[i]=n[i]}}return t}let s=0
function o(t){return t._guid=++s}function r(){return Object.create(null)}class a{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(t){this.current=t,this.stack.push(t)}pop(){let t=this.stack.pop(),e=this.stack.length
return this.current=0===e?null:this.stack[e-1],void 0===t?null:t}isEmpty(){return 0===this.stack.length}}class h{constructor(t){this.next=null,this.prev=null,this.value=t}}class l{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t.next}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=e.next}insertBefore(t,e=null){return null===e?this.append(t):(e.prev?e.prev.next=t:this._head=t,t.prev=e.prev,t.next=e,e.prev=t,t)}append(t){let e=this._tail
return e?(e.next=t,t.prev=e,t.next=null):this._head=t,this._tail=t}remove(t){return t.prev?t.prev.next=t.next:this._head=t.next,t.next?t.next.prev=t.prev:this._tail=t.prev,t}}class u{constructor(t,e){this._head=t,this._tail=e}forEachNode(t){let e=this._head
for(;null!==e;)t(e),e=this.nextNode(e)}head(){return this._head}tail(){return this._tail}toArray(){let t=[]
return this.forEachNode(e=>t.push(e)),t}nextNode(t){return t===this._tail?null:t.next}}new u(null,null)
const c=Object.freeze([]),p=1
class d{validate(t){return this.value()===t}}d.id=0
const m=[],f=[]
class _{constructor(t,e){this.type=t,this.inner=e}value(){return(0,m[this.type])(this.inner)}validate(t){return(0,f[this.type])(this.inner,t)}}function g(t){let e=m.length
m.push(t=>t.value()),f.push((t,e)=>t.validate(e)),t.id=e}m.push(()=>0),f.push((t,e)=>0===e)
const v=new _(0,null)
m.push(()=>NaN),f.push((t,e)=>NaN===e)
const y=new _(1,null)
m.push(()=>x),f.push((t,e)=>e===x)
new _(2,null)
function b({tag:t}){return t===v}function w(t){return t===v}let x=p
class k extends d{static create(t=x){return new _(this.id,new k(t))}constructor(t=x){super(),this.revision=t}value(){return this.revision}dirty(){this.revision=++x}}function S(t){let e=[]
for(let i=0,n=t.length;i<n;i++){let n=t[i].tag
if(n===y)return y
n!==v&&e.push(n)}return E(e)}function P(t){let e=[],i=t.head()
for(;null!==i;){let n=i.tag
if(n===y)return y
n!==v&&e.push(n),i=t.nextNode(i)}return E(e)}function T(t){let e=[]
for(let i=0,n=t.length;i<n;i++){let n=t[i]
if(n===y)return y
n!==v&&e.push(n)}return E(e)}function E(t){switch(t.length){case 0:return v
case 1:return t[0]
case 2:return M.create(t[0],t[1])
default:return A.create(t)}}g(k)
class C extends d{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let t=this.lastChecked,e=this.lastValue
return t!==x&&(this.lastChecked=x,this.lastValue=e=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class M extends C{static create(t,e){return new _(this.id,new M(t,e))}constructor(t,e){super(),this.first=t,this.second=e}compute(){return Math.max(this.first.value(),this.second.value())}}g(M)
class A extends C{static create(t){return new _(this.id,new A(t))}constructor(t){super(),this.tags=t}compute(){let t=this.tags,e=-1
for(let i=0;i<t.length;i++){let n=t[i].value()
e=Math.max(n,e)}return e}}g(A)
class z extends C{static create(t){return new _(this.id,new z(t))}constructor(t){super(),this.tag=t,this.lastUpdated=p}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(t){t!==this.tag&&(this.tag=t,this.lastUpdated=x,this.invalidate())}}g(z)
class O{constructor(){this.lastRevision=null,this.lastValue=null}value(){let t=this.tag,e=this.lastRevision,i=this.lastValue
return null!==e&&t.validate(e)||(i=this.lastValue=this.compute(),this.lastRevision=t.value()),i}invalidate(){this.lastRevision=null}}class B{constructor(t){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=t.tag,this.reference=t}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let t=this.reference,e=this.lastRevision,i=t.tag
if(i.validate(e))return I
this.lastRevision=i.value()
let n=this.lastValue,s=t.value()
return s===n?I:(this.lastValue=s,s)}initialize(){let t=this.reference,e=this.lastValue=t.value()
return this.lastRevision=t.tag.value(),this.initialized=!0,e}}const I="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class N{constructor(t){this.inner=t,this.tag=v}value(){return this.inner}}class R extends h{constructor(t,e){super(t.valueReferenceFor(e)),this.retained=!1,this.seen=!1,this.key=e.key,this.iterable=t,this.memo=t.memoReferenceFor(e)}update(t){this.retained=!0,this.iterable.updateValueReference(this.value,t),this.iterable.updateMemoReference(this.memo,t)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class Z{constructor(t){this.iterator=null,this.map=r(),this.list=new l,this.tag=t.tag,this.iterable=t}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let t
return t=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,t}has(t){return!!this.map[t]}get(t){return this.map[t]}wasSeen(t){let e=this.map[t]
return void 0!==e&&e.seen}append(t){let e=this.map,i=this.list,n=this.iterable,s=e[t.key]=new R(n,t)
return i.append(s),s}insertBefore(t,e){let i=this.map,n=this.list,s=this.iterable,o=i[t.key]=new R(s,t)
return o.retained=!0,n.insertBefore(o,e),o}move(t,e){let i=this.list
t.retained=!0,i.remove(t),i.insertBefore(t,e)}remove(t){this.list.remove(t),delete this.map[t.key]}nextNode(t){return this.list.nextNode(t)}head(){return this.list.head()}}var D;(function(t){t[t.Append=0]="Append",t[t.Prune=1]="Prune",t[t.Done=2]="Done"})(D||(D={}))
class j{constructor({target:t,artifacts:e}){this.target=t,this.artifacts=e,this.iterator=e.iterate(),this.current=e.head()}sync(){let t=D.Append
for(;;)switch(t){case D.Append:t=this.nextAppend()
break
case D.Prune:t=this.nextPrune()
break
case D.Done:return void this.nextDone()}}advanceToKey(t){let e=this.current,i=this.artifacts,n=e
for(;null!==n&&n.key!==t;)n.seen=!0,n=i.nextNode(n)
null!==n&&(this.current=i.nextNode(n))}nextAppend(){let t=this.iterator,e=this.current,i=this.artifacts,n=t.next()
if(null===n)return this.startPrune()
let s=n.key
return null!==e&&e.key===s?this.nextRetain(n):i.has(s)?this.nextMove(n):this.nextInsert(n),D.Append}nextRetain(t){let e=this.artifacts,i=this.current;(i=i).update(t),this.current=e.nextNode(i),this.target.retain(t.key,i.value,i.memo)}nextMove(t){let e=this.current,i=this.artifacts,n=this.target,s=t.key,o=i.get(t.key)
o.update(t),i.wasSeen(t.key)?(i.move(o,e),n.move(o.key,o.value,o.memo,e?e.key:null)):this.advanceToKey(s)}nextInsert(t){let e=this.artifacts,i=this.target,n=this.current,s=e.insertBefore(t,n)
i.insert(s.key,s.value,s.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),D.Prune}nextPrune(){let t=this.artifacts,e=this.target,i=this.current
if(null===i)return D.Done
let n=i
return this.current=t.nextNode(n),n.shouldRemove()?(t.remove(n),e.delete(n.key)):n.reset(),D.Prune}nextDone(){this.target.done()}}function F(...t){let e=t[0],i=t[1],n=t[2]
return"string"==typeof e?function(e,i,n){return H(e,i,n,t)}:n?H(e,i,n,[]):void function(t,e){let i,n=Symbol(e)
W(t).trackedProperties[e]=!0,void 0!==t[e]&&(i=t[e])
Object.defineProperty(t,e,{configurable:!0,get(){return this[n]},set(t){W(this).dirtyableTagFor(e).inner.dirty(),this[n]=t,q()}})}(e,i)}function H(t,e,i,n){let s=W(t)
return s.trackedProperties[e]=!0,s.trackedPropertyDependencies[e]=n||[],{enumerable:!0,configurable:!1,get:i.get,set:function(){W(this).dirtyableTagFor(e).inner.dirty(),i.set.apply(this,arguments),q()}}}class V{constructor(t){this.tags=r(),this.computedPropertyTags=r(),this.trackedProperties=t?Object.create(t.trackedProperties):r(),this.trackedPropertyDependencies=t?Object.create(t.trackedPropertyDependencies):r()}tagFor(t){let e,i=this.tags[t]
return i||((e=this.trackedPropertyDependencies[t])?this.tags[t]=function(t,e,i){let n=[t.dirtyableTagFor(e)]
if(i&&i.length)for(let s=0;s<i.length;s++)n.push(t.tagFor(i[s]))
return T(n)}(this,t,e):this.tags[t]=k.create())}dirtyableTagFor(t){let e
return this.trackedPropertyDependencies[t]?(e=this.computedPropertyTags[t])||(this.computedPropertyTags[t]=k.create()):(e=this.tags[t])||(this.tags[t]=k.create())}}let U=Symbol("ember-object")
function W(t){let e=t[U]
return e&&function(t,e){return G.call(t,e)}(t,U)?e:t[U]=new V(e)}let G=Object.prototype.hasOwnProperty
let q=function(){}
class $ extends Error{constructor(t,e,i){super(i),this.target=t,this.key=e}static for(t,e){return new $(t,e,`The property '${e}' on ${t} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function Y(t,e,i=function(t,e){throw $.for(t,e)}){if("object"==typeof t&&t){return W(t).tagFor(e)}return v}class K{constructor(t){this.debugName=null,this.__args__=null,Object.assign(this,t)}get element(){let t=this.bounds
return e(t&&t.firstNode===t.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),t.firstNode}get args(){return this.__args__}set args(t){this.__args__=t,W(this).dirtyableTagFor("args").inner.dirty()}static create(t){return new this(t)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const J={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class X{constructor(t,e,i,n){this.name=t,this.manager=e,this.ComponentClass=i,this.handle=n,this.state={name:t,capabilities:J,ComponentClass:i,handle:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Q{constructor(t,e=null){this._registry=t,this._resolver=e,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(t){let e=this._factoryDefinitionLookups[t]
if(e||(this._resolver&&(e=this._resolver.retrieve(t)),e||(e=this._registry.registration(t)),e&&(this._factoryDefinitionLookups[t]=e)),e)return this.buildFactory(t,e)}lookup(t){let e=!1!==this._registry.registeredOption(t,"singleton")
if(e&&this._lookups[t])return this._lookups[t]
let i=this.factoryFor(t)
if(!i)return
if(!1===this._registry.registeredOption(t,"instantiate"))return i.class
let n=i.create()
return e&&n&&(this._lookups[t]=n),n}defaultInjections(t){return{}}buildInjections(t){let e,i=this.defaultInjections(t),n=this._registry.registeredInjections(t)
for(let s=0;s<n.length;s++)i[(e=n[s]).property]=this.lookup(e.source)
return i}buildFactory(t,e){let i=this.buildInjections(t)
return{class:e,create(t){let n=Object.assign({},i,t)
return e.create(n)}}}}class tt{constructor(t){this._registrations={},this._registeredOptions={},this._registeredInjections={},t&&t.fallback&&(this._fallback=t.fallback)}register(t,e,i){this._registrations[t]=e,i&&(this._registeredOptions[t]=i)}registration(t){let e=this._registrations[t]
return void 0===e&&this._fallback&&(e=this._fallback.registration(t)),e}unregister(t){delete this._registrations[t],delete this._registeredOptions[t],delete this._registeredInjections[t]}registerOption(t,e,i){let n=this._registeredOptions[t]
n||(n={},this._registeredOptions[t]=n),n[e]=i}registeredOption(t,e){let i,n=this.registeredOptions(t)
return n&&(i=n[e]),void 0===i&&void 0!==this._fallback&&(i=this._fallback.registeredOption(t,e)),i}registeredOptions(t){let e=this._registeredOptions[t]
if(void 0===e){let i=t.split(":")[0]
e=this._registeredOptions[i]}return e}unregisterOption(t,e){let i=this._registeredOptions[t]
i&&delete i[e]}registerInjection(t,e,i){let n=this._registeredInjections[t]
void 0===n&&(this._registeredInjections[t]=n=[]),n.push({property:e,source:i})}registeredInjections(t){let e=t.split(":")[0],i=this._fallback?this._fallback.registeredInjections(t):[]
return Array.prototype.push.apply(i,this._registeredInjections[e]),Array.prototype.push.apply(i,this._registeredInjections[t]),i}}const et="__owner__"
function it(t){return t[et]}function nt(t,e){t[et]=e}class st{constructor(t){this._bounds=t}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const ot=new class{constructor(){this.evaluateOpcode=function(t){let e=new Array(t)
for(let i=0;i<t;i++)e[i]=null
return e}(82).slice()}add(t,e,i="syscall"){this.evaluateOpcode[t]={syscall:"syscall"===i,evaluate:e}}debugBefore(t,e,i){return{sp:void 0,state:void 0}}debugAfter(t,e,i,n){n.sp
n.state,t.stack.sp}evaluate(t,e,i){let n=this.evaluateOpcode[i]
n.syscall?n.evaluate(t,e):n.evaluate(t.inner,e)}}
class rt{constructor(){o(this)}}class at extends rt{constructor(){super(...arguments),this.next=null,this.prev=null}}var ht;(function(t){t[t.pc=0]="pc",t[t.ra=1]="ra",t[t.fp=2]="fp",t[t.sp=3]="sp",t[t.s0=4]="s0",t[t.s1=5]="s1",t[t.t0=6]="t0",t[t.t1=7]="t1",t[t.v0=8]="v0"})(ht||(ht={}))
class lt extends N{constructor(t){super(t)}static create(t){return void 0===t?pt:null===t?dt:!0===t?mt:!1===t?ft:"number"==typeof t?new ct(t):new ut(t)}get(t){return pt}}class ut extends lt{constructor(){super(...arguments),this.lengthReference=null}get(t){if("length"===t){let t=this.lengthReference
return null===t&&(t=this.lengthReference=new ct(this.inner.length)),t}return super.get(t)}}class ct extends lt{constructor(t){super(t)}}const pt=new ct(void 0),dt=new ct(null),mt=new ct(!0),ft=new ct(!1)
class _t{constructor(t){this.inner=t,this.tag=t.tag}value(){return this.toBool(this.inner.value())}toBool(t){return!!t}}var gt
function vt(t){return function(e){return Array.isArray(e)&&e[0]===t}}ot.add(1,(t,{op1:e})=>{let i=t.stack,n=t.constants.resolveHandle(e)(t,i.pop())
t.loadValue(ht.v0,n)}),ot.add(4,(t,{op1:e})=>{let i=t.referenceForSymbol(e)
t.stack.push(i)}),ot.add(2,(t,{op1:e})=>{let i=t.stack.pop()
t.scope().bindSymbol(e,i)}),ot.add(3,(t,{op1:e})=>{let i=t.stack.pop(),n=t.stack.pop(),s=t.stack.pop(),o=s?[i,n,s]:null
t.scope().bindBlock(e,o)}),ot.add(80,(t,{op1:e})=>{let i=t.constants.getString(e),n=t.scope().getPartialMap()[i]
void 0===n&&(n=t.getSelf().get(i)),t.stack.push(n)}),ot.add(17,(t,{op1:e,op2:i})=>{t.pushRootScope(e,!!i)}),ot.add(5,(t,{op1:e})=>{let i=t.constants.getString(e),n=t.stack.pop()
t.stack.push(n.get(i))}),ot.add(6,(t,{op1:e})=>{let i=t.stack,n=t.scope().getBlock(e)
n?(i.push(n[2]),i.push(n[1]),i.push(n[0])):(i.push(null),i.push(null),i.push(null))}),ot.add(7,(t,{op1:e})=>{let i=!!t.scope().getBlock(e)
t.stack.push(i?mt:ft)}),ot.add(8,t=>{t.stack.pop(),t.stack.pop()
let e=t.stack.pop(),i=e&&e.parameters.length
t.stack.push(i?mt:ft)}),ot.add(9,(t,{op1:e})=>{let i=new Array(e)
for(let n=e;n>0;n--){i[n-1]=t.stack.pop()}t.stack.push(new class extends O{constructor(t){super(),this.parts=t,this.tag=S(t)}compute(){let t=new Array
for(let i=0;i<this.parts.length;i++){let e=this.parts[i].value()
null!==e&&void 0!==e&&(t[i]="function"!=typeof(e=e).toString?"":String(e))}var e
return t.length>0?t.join(""):null}}(i))}),function(t){t[t.Text=0]="Text",t[t.Append=1]="Append",t[t.Comment=2]="Comment",t[t.Modifier=3]="Modifier",t[t.Block=4]="Block",t[t.Component=5]="Component",t[t.OpenElement=6]="OpenElement",t[t.OpenSplattedElement=7]="OpenSplattedElement",t[t.FlushElement=8]="FlushElement",t[t.CloseElement=9]="CloseElement",t[t.StaticAttr=10]="StaticAttr",t[t.DynamicAttr=11]="DynamicAttr",t[t.AttrSplat=12]="AttrSplat",t[t.Yield=13]="Yield",t[t.Partial=14]="Partial",t[t.DynamicArg=15]="DynamicArg",t[t.StaticArg=16]="StaticArg",t[t.TrustingAttr=17]="TrustingAttr",t[t.Debugger=18]="Debugger",t[t.ClientSideStatement=19]="ClientSideStatement",t[t.Unknown=20]="Unknown",t[t.Get=21]="Get",t[t.MaybeLocal=22]="MaybeLocal",t[t.HasBlock=23]="HasBlock",t[t.HasBlockParams=24]="HasBlockParams",t[t.Undefined=25]="Undefined",t[t.Helper=26]="Helper",t[t.Concat=27]="Concat",t[t.ClientSideExpression=28]="ClientSideExpression"}(gt||(gt={}))
const yt=vt(gt.Get),bt=vt(gt.MaybeLocal)
var wt,xt;(xt=wt||(wt={}))[xt.OpenComponentElement=0]="OpenComponentElement",xt[xt.DidCreateElement=1]="DidCreateElement",xt[xt.SetComponentAttrs=2]="SetComponentAttrs",xt[xt.DidRenderLayout=3]="DidRenderLayout",xt[xt.Debugger=4]="Debugger"
var kt=gt
const Lt="&attrs"
class St{constructor(t=0){this.offset=t,this.names=r(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}compile(t,e){let i=t[this.offset],n=this.names[i],s=this.funcs[n]
s(t,e)}}let Pt,Tt
function Et(t,e,i){let n=t[1],s=t[2],o=t[3]
i.expr(s),o?i.dynamicAttr(n,o,e):i.dynamicAttr(n,null,e)}class Ct{constructor(){var t=function(t=new Mt,e=new At){return t.add("if",(t,e,i,n,s)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
s.startLabels(),s.pushFrame(),s.returnTo("END"),s.expr(t[0]),s.toBoolean(),s.enter(1),s.jumpUnless("ELSE"),s.invokeStaticBlock(i),n?(s.jump("EXIT"),s.label("ELSE"),s.invokeStaticBlock(n),s.label("EXIT"),s.exit(),s.return()):(s.label("ELSE"),s.exit(),s.return()),s.label("END"),s.popFrame(),s.stopLabels()}),t.add("unless",(t,e,i,n,s)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
s.startLabels(),s.pushFrame(),s.returnTo("END"),s.expr(t[0]),s.toBoolean(),s.enter(1),s.jumpIf("ELSE"),s.invokeStaticBlock(i),n?(s.jump("EXIT"),s.label("ELSE"),s.invokeStaticBlock(n),s.label("EXIT"),s.exit(),s.return()):(s.label("ELSE"),s.exit(),s.return()),s.label("END"),s.popFrame(),s.stopLabels()}),t.add("with",(t,e,i,n,s)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
s.startLabels(),s.pushFrame(),s.returnTo("END"),s.expr(t[0]),s.dup(),s.toBoolean(),s.enter(2),s.jumpUnless("ELSE"),s.invokeStaticBlock(i,1),n?(s.jump("EXIT"),s.label("ELSE"),s.invokeStaticBlock(n),s.label("EXIT"),s.exit(),s.return()):(s.label("ELSE"),s.exit(),s.return()),s.label("END"),s.popFrame(),s.stopLabels()}),t.add("each",(t,e,i,n,s)=>{s.startLabels(),s.pushFrame(),s.returnTo("END"),e&&"key"===e[0][0]?s.expr(e[1][0]):s.pushPrimitiveReference(null),s.expr(t[0]),s.enter(2),s.putIterator(),s.jumpUnless("ELSE"),s.pushFrame(),s.returnTo("ITER"),s.dup(ht.fp,1),s.enterList("BODY"),s.label("ITER"),s.iterate("BREAK"),s.label("BODY"),s.invokeStaticBlock(i,2),s.pop(2),s.exit(),s.return(),s.label("BREAK"),s.exitList(),s.popFrame(),n?(s.jump("EXIT"),s.label("ELSE"),s.invokeStaticBlock(n),s.label("EXIT"),s.exit(),s.return()):(s.label("ELSE"),s.exit(),s.return()),s.label("END"),s.popFrame(),s.stopLabels()}),t.add("in-element",(t,e,i,n,s)=>{if(!t||1!==t.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
s.startLabels(),s.pushFrame(),s.returnTo("END")
let o=e[0],r=e[1]
for(let a=0;a<o.length;a++){let t=o[a]
if("nextSibling"!==t&&"guid"!==t)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${o[0]}\` option`)
s.expr(r[a])}s.expr(t[0]),s.dup(),s.enter(4),s.jumpUnless("ELSE"),s.pushRemoteElement(),s.invokeStaticBlock(i),s.popRemoteElement(),s.label("ELSE"),s.exit(),s.return(),s.label("END"),s.popFrame(),s.stopLabels()}),t.add("-with-dynamic-vars",(t,e,i,n,s)=>{if(e){let t=e[0],n=e[1]
s.compileParams(n),s.pushDynamicScope(),s.bindDynamicScope(t),s.invokeStaticBlock(i),s.popDynamicScope()}else s.invokeStaticBlock(i)}),t.add("component",(t,e,i,n,s)=>{if("string"==typeof t[0]&&s.staticComponentHelper(t[0],e,i))return
let o=t[0],r=t.slice(1)
s.dynamicComponent(o,r,e,!0,i,n)}),e.add("component",(t,e,i,n)=>{let s=e&&e[0]
if("string"==typeof s&&n.staticComponentHelper(s,i,null))return!0
let o=e[0],r=e.slice(1)
return n.dynamicComponent(o,r,i,!0,null,null),!0}),{blocks:t,inlines:e}}()
let e=t.blocks,i=t.inlines
this.blocks=e,this.inlines=i}}class Mt{constructor(){this.names=r(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e,i,n,s,o){let r=this.names[t]
if(void 0===r){(0,this.missing)(t,e,i,n,s,o)}else{(0,this.funcs[r])(e,i,n,s,o)}}}class At{constructor(){this.names=r(),this.funcs=[]}add(t,e){this.funcs.push(e),this.names[t]=this.funcs.length-1}addMissing(t){this.missing=t}compile(t,e){let i,n,s,o=t[1]
if(!Array.isArray(o))return["expr",o]
if(o[0]===kt.Helper)i=o[1],n=o[2],s=o[3]
else{if(o[0]!==kt.Unknown)return["expr",o]
i=o[1],n=s=null}let r=this.names[i]
if(void 0===r&&this.missing){let t=(0,this.missing)(i,n,s,e)
return!1===t?["expr",o]:t}if(void 0!==r){let t=(0,this.funcs[r])(i,n,s,e)
return!1===t?["expr",o]:t}return["expr",o]}}const zt=-1
class Ot{constructor(t,e,i,n){this.statements=t,this.containingLayout=e,this.options=i,this.symbolTable=n,this.compiled=null,this.statementCompiler=function(){if(Pt)return Pt
const t=Pt=new St
t.add(kt.Text,(t,e)=>{e.text(t[1])}),t.add(kt.Comment,(t,e)=>{e.comment(t[1])}),t.add(kt.CloseElement,(t,e)=>{e.closeElement()}),t.add(kt.FlushElement,(t,e)=>{e.flushElement()}),t.add(kt.Modifier,(t,e)=>{let i=e.resolver,n=e.referrer,s=t[1],o=t[2],r=t[3],a=i.lookupModifier(s,n)
if(!a)throw new Error(`Compile Error ${s} is not a modifier: Helpers may not be used in the element form.`)
e.modifier(a,o,r)}),t.add(kt.StaticAttr,(t,e)=>{let i=t[1],n=t[2],s=t[3]
e.staticAttr(i,s,n)}),t.add(kt.DynamicAttr,(t,e)=>{Et(t,!1,e)}),t.add(kt.TrustingAttr,(t,e)=>{Et(t,!0,e)}),t.add(kt.OpenElement,(t,e)=>{e.openPrimitiveElement(t[1])}),t.add(kt.OpenSplattedElement,(t,e)=>{e.setComponentAttrs(!0),e.putComponentOperations(),e.openPrimitiveElement(t[1])}),t.add(kt.Component,(t,e)=>{let i=t[1],n=t[2],s=t[3],o=t[4],r=e.resolver,a=e.referrer,h=r.lookupComponentDefinition(i,a)
if(null===h)throw new Error(`Compile Error: Cannot find component ${i}`)
{let t=r.getCapabilities(h),i=[[kt.ClientSideStatement,wt.SetComponentAttrs,!0],...n,[kt.ClientSideStatement,wt.SetComponentAttrs,!1]],a=e.inlineBlock({statements:i,parameters:c}),l=e.template(o)
if(!1===t.dynamicLayout){let i=r.getLayout(h)
e.pushComponentDefinition(h),e.invokeStaticComponent(t,i,a,null,s,!1,l&&l)}else e.pushComponentDefinition(h),e.invokeComponent(a,null,s,!1,l&&l)}}),t.add(kt.Partial,(t,e)=>{let i=t[1],n=t[2],s=e.referrer
e.startLabels(),e.pushFrame(),e.returnTo("END"),e.expr(i),e.dup(),e.enter(2),e.jumpUnless("ELSE"),e.invokePartial(s,e.evalSymbols(),n),e.popScope(),e.popFrame(),e.label("ELSE"),e.exit(),e.return(),e.label("END"),e.popFrame(),e.stopLabels()}),t.add(kt.Yield,(t,e)=>{let i=t[1],n=t[2]
e.yield(i,n)}),t.add(kt.AttrSplat,(t,e)=>{let i=t[1]
e.yield(i,[]),e.didCreateElement(ht.s0),e.setComponentAttrs(!1)}),t.add(kt.Debugger,(t,e)=>{let i=t[1]
e.debugger(e.evalSymbols(),i)}),t.add(kt.ClientSideStatement,(t,i)=>{e.compile(t,i)}),t.add(kt.Append,(t,e)=>{let i=t[1],n=t[2]
if(!0===(e.macros.inlines.compile(t,e)||i))return
let s=yt(i),o=bt(i)
n?e.guardedAppend(i,!0):s||o?e.guardedAppend(i,!1):(e.expr(i),e.primitive(!1),e.load(ht.t0),e.dynamicContent())}),t.add(kt.Block,(t,e)=>{let i=t[1],n=t[2],s=t[3],o=t[4],r=t[5],a=e.template(o),h=e.template(r),l=a&&a,u=h&&h
e.macros.blocks.compile(i,n,s,l,u,e)})
const e=new St(1)
return e.add(wt.OpenComponentElement,(t,e)=>{e.putComponentOperations(),e.openPrimitiveElement(t[2])}),e.add(wt.DidCreateElement,(t,e)=>{e.didCreateElement(ht.s0)}),e.add(wt.SetComponentAttrs,(t,e)=>{e.setComponentAttrs(t[2])}),e.add(wt.Debugger,()=>{}),e.add(wt.DidRenderLayout,(t,e)=>{e.didRenderLayout(ht.s0)}),t}()}static topLevel(t,e){return new Ot(t.statements,{block:t,referrer:e.referrer},e,{referrer:e.referrer,hasEval:t.hasEval,symbols:t.symbols})}compile(t){let e=this.compiled
if(null!==e)return e
this.compiled=zt
let i=this.options,n=this.statements,s=this.containingLayout,o=s.referrer,r=i.program,a=i.resolver,h=i.macros,l=i.asPartial,u=new(0,i.Builder)(r,a,o,h,s,l,t)
for(let p=0;p<n.length;p++)this.statementCompiler.compile(n[p],u)
let c=u.commit(r.heap,s.block.symbols.length)
return this.compiled=c}}class Bt{constructor(t){this.builder=t}static(t,e){let i=e[0],n=e[1],s=e[2],o=e[3],r=this.builder,a=r.resolver
if(null!==t){let e=a.getCapabilities(t)
if(!1===e.dynamicLayout){let h=a.getLayout(t)
r.pushComponentDefinition(t),r.invokeStaticComponent(e,h,null,i,n,!1,s,o)}else r.pushComponentDefinition(t),r.invokeComponent(null,i,n,!1,s,o)}}}class It{constructor(t){this.buffer=t,this.typePos=0,this.size=0}encode(t,e){if(t>255)throw new Error(`Opcode type over 8-bits. Got ${t}.`)
this.buffer.push(t|e|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let i=2;i<arguments.length;i++){let t=arguments[i]
if("number"==typeof t&&t>65535)throw new Error(`Operand over 16-bits. Got ${t}.`)
this.buffer.push(t)}this.size=this.buffer.length}patch(t,e){if(-1!==this.buffer[t+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[t+1]=e}}class Nt{constructor(){this.labels=r(),this.targets=[]}label(t,e){this.labels[t]=e}target(t,e){this.targets.push({at:t,target:e})}patch(t){let e=this.targets,i=this.labels
for(let s=0;s<e.length;s++){var n=e[s]
let o=n.at,r=i[n.target]-o
t.patch(o,r)}}}class Rt{constructor(){this.encoder=new It([])}push(t){switch(arguments.length){case 1:return this.encoder.encode(t,0)
case 2:return this.encoder.encode(t,0,arguments[1])
case 3:return this.encoder.encode(t,0,arguments[1],arguments[2])
default:return this.encoder.encode(t,0,arguments[1],arguments[2],arguments[3])}}pushMachine(t){switch(arguments.length){case 1:return this.encoder.encode(t,1024)
case 2:return this.encoder.encode(t,1024,arguments[1])
case 3:return this.encoder.encode(t,1024,arguments[1],arguments[2])
default:return this.encoder.encode(t,1024,arguments[1],arguments[2],arguments[3])}}commit(t,e){this.pushMachine(20)
let i=this.encoder.buffer,n=t.malloc()
for(let s=0;s<i.length;s++){let e=i[s]
"function"==typeof e?t.pushPlaceholder(e):t.push(e)}return t.finishMalloc(n,e),n}reserve(t){this.encoder.encode(t,0,-1)}reserveMachine(t){this.encoder.encode(t,1024,-1)}main(){this.push(56,ht.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(t,e){this.push(17,t,e?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(t){this.push(65,t)}createComponent(t,e){let i=0|e
this.push(67,i,t)}registerComponentDestructor(t){this.push(68,t)}putComponentOperations(){this.push(69)}getComponentSelf(t){this.push(70,t)}getComponentTagName(t){this.push(71,t)}getComponentLayout(t){this.push(72,t)}invokeComponentLayout(t){this.push(74,t)}didCreateElement(t){this.push(77,t)}didRenderLayout(t){this.push(78,t)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(t,e=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ht.s0,t),e&&e(),this.registerComponentDestructor(ht.s0),this.getComponentSelf(ht.s0),this.invokeComponentLayout(ht.s0),this.didRenderLayout(ht.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class Zt extends Rt{constructor(t,e,i,n,s,o,r){super(),this.program=t,this.resolver=e,this.referrer=i,this.macros=n,this.containingLayout=s,this.asPartial=o,this.stdLib=r,this.component=new Bt(this),this.expressionCompiler=function(){if(Tt)return Tt
const t=Tt=new St
return t.add(kt.Unknown,(t,e)=>{let i=e.resolver,n=e.asPartial,s=e.referrer,o=t[1],r=i.lookupHelper(o,s)
null!==r?e.helper(r,null,null):n?e.resolveMaybeLocal(o):(e.getVariable(0),e.getProperty(o))}),t.add(kt.Concat,(t,e)=>{let i=t[1]
for(let n=0;n<i.length;n++)e.expr(i[n])
e.concat(i.length)}),t.add(kt.Helper,(t,e)=>{let i=e.resolver,n=e.referrer,s=t[1],o=t[2],r=t[3]
if("component"===s){let t=o[0],i=o.slice(1)
return void e.curryComponent(t,i,r,!0)}let a=i.lookupHelper(s,n)
if(null===a)throw new Error(`Compile Error: ${s} is not a helper`)
e.helper(a,o,r)}),t.add(kt.Get,(t,e)=>{let i=t[1],n=t[2]
e.getVariable(i)
for(let s=0;s<n.length;s++)e.getProperty(n[s])}),t.add(kt.MaybeLocal,(t,e)=>{let i=t[1]
if(e.asPartial){let t=i[0]
i=i.slice(1),e.resolveMaybeLocal(t)}else e.getVariable(0)
for(let n=0;n<i.length;n++)e.getProperty(i[n])}),t.add(kt.Undefined,(t,e)=>e.pushPrimitiveReference(void 0)),t.add(kt.HasBlock,(t,e)=>{e.hasBlock(t[1])}),t.add(kt.HasBlockParams,(t,e)=>{e.hasBlockParams(t[1])}),t}(),this.labelsStack=new a,this.isComponentAttrs=!1,this.constants=t.constants}label(t){this.labels.label(t,this.nextPos)}setComponentAttrs(t){this.isComponentAttrs=t}expr(t){Array.isArray(t)?this.expressionCompiler.compile(t,this):this.pushPrimitiveReference(t)}pushArgs(t,e){let i=this.constants.stringArray(t)
this.push(63,i,e)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Nt)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(t){this.push(59,this.constants.handle(t))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(t){this.push(62,this.constants.serializable(t))}staticComponentHelper(t,e,i){let n=this.resolver.lookupComponentDefinition(t,this.referrer)
if(n){let t=this.resolver.getCapabilities(n)
if(!1===t.dynamicLayout){if(e)for(let t=0;t<e.length;t+=2)e[t][0]=`@${e[t][0]}`
let s=this.resolver.getLayout(n)
return this.pushComponentDefinition(n),this.invokeStaticComponent(t,s,null,null,e,!1,i&&i),!0}}return!1}invokePartial(t,e,i){let n=this.constants.serializable(t),s=this.constants.stringArray(e),o=this.constants.array(i)
this.push(79,n,s,o)}resolveMaybeLocal(t){this.push(80,this.string(t))}debugger(t,e){this.push(81,this.constants.stringArray(t),this.constants.array(e))}text(t){this.push(22,this.constants.string(t))}openPrimitiveElement(t){this.push(25,this.constants.string(t))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(t,e,i){let n=this.constants.string(t),s=e?this.constants.string(e):0
if(this.isComponentAttrs)this.pushPrimitiveReference(i),this.push(29,n,1,s)
else{let t=this.constants.string(i)
this.push(27,n,t,s)}}dynamicAttr(t,e,i){let n=this.constants.string(t),s=e?this.constants.string(e):0
this.isComponentAttrs?this.push(29,n,!0===i?1:0,s):this.push(28,n,!0===i?1:0,s)}comment(t){let e=this.constants.string(t)
this.push(23,e)}modifier(t,e,i){this.pushFrame(),this.compileArgs(e,i,null,!0),this.push(32,this.constants.handle(t)),this.popFrame()}putIterator(){this.push(54)}enterList(t){this.reserve(52),this.labels.target(this.pos,t)}exitList(){this.push(53)}iterate(t){this.reserve(55),this.labels.target(this.pos,t)}setVariable(t){this.push(2,t)}setBlock(t){this.push(3,t)}getVariable(t){this.push(4,t)}getProperty(t){this.push(5,this.string(t))}getBlock(t){this.push(6,t)}hasBlock(t){this.push(7,t)}hasBlockParams(t){this.getBlock(t),this.resolveBlock(),this.push(8)}concat(t){this.push(9,t)}load(t){this.push(15,t)}fetch(t){this.push(16,t)}dup(t=ht.sp,e=0){return this.push(13,t,e)}pop(t=1){return this.push(14,t)}returnTo(t){this.reserveMachine(21),this.labels.target(this.pos,t)}primitive(t){let e,i=0
switch(typeof t){case"number":t%1==0?t>-1?e=t:(e=this.negative(t),i=4):(e=this.float(t),i=1)
break
case"string":e=this.string(t),i=2
break
case"boolean":e=0|t,i=3
break
case"object":e=2,i=3
break
case"undefined":e=3,i=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,e<<3|i)}float(t){return this.constants.float(t)}negative(t){return this.constants.negative(t)}pushPrimitiveReference(t){this.primitive(t),this.primitiveReference()}primitiveReference(){this.push(12)}helper(t,e,i){this.pushFrame(),this.compileArgs(e,i,null,!0),this.push(1,this.constants.handle(t)),this.popFrame(),this.fetch(ht.v0)}bindDynamicScope(t){this.push(35,this.names(t))}enter(t){this.push(49,t)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(t){this.reserveMachine(44),this.labels.target(this.pos,t)}jumpIf(t){this.reserve(45),this.labels.target(this.pos,t)}jumpUnless(t){this.reserve(46),this.labels.target(this.pos,t)}string(t){return this.constants.string(t)}names(t){let e=[]
for(let i=0;i<t.length;i++){let n=t[i]
e[i]=this.constants.string(n)}return this.constants.array(e)}symbols(t){return this.constants.array(t)}inlineBlock(t){let e=t.parameters,i=t.statements,n={parameters:e,referrer:this.containingLayout.referrer},s={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new Ot(i,this.containingLayout,s,n)}evalSymbols(){let t=this.containingLayout.block
return t.hasEval?t.symbols:null}compileParams(t){if(!t)return 0
for(let e=0;e<t.length;e++)this.expr(t[e])
return t.length}compileArgs(t,e,i,n){i&&(this.pushYieldableBlock(i.main),this.pushYieldableBlock(i.else),this.pushYieldableBlock(i.attrs))
let s=this.compileParams(t)<<4
n&&(s|=8),i&&(s|=7)
let o=c
if(e){o=e[0]
let t=e[1]
for(let e=0;e<t.length;e++)this.expr(t[e])}this.pushArgs(o,s)}invokeStaticBlock(t,e=0){let i=t.symbolTable.parameters,n=i.length,s=Math.min(e,n)
if(this.pushFrame(),s){this.pushChildScope()
for(let t=0;t<s;t++)this.dup(ht.fp,e-t),this.setVariable(i[t])}this.pushBlock(t),this.resolveBlock(),this.invokeVirtual(),s&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(t,e){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!e),this.load(ht.t0),this.expr(t),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(t),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!e),this.load(ht.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(t,e){this.compileArgs(e,null,null,!1),this.getBlock(t),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(t){this.push(73,t)}invokeComponent(t,e,i,n,s,o=null,r){this.fetch(ht.s0),this.dup(ht.sp,1),this.load(ht.s0),this.pushFrame()
let a={main:s,else:o,attrs:t}
this.compileArgs(e,i,a,n),this.prepareArgs(ht.s0),this.invokePreparedComponent(null!==s,()=>{r?(this.pushSymbolTable(r.symbolTable),this.pushLayout(r),this.resolveLayout()):this.getComponentLayout(ht.s0),this.populateLayout(ht.s0)}),this.load(ht.s0)}invokeStaticComponent(e,i,n,s,o,r,a,h=null){let l=i.symbolTable
if(l.hasEval||e.prepareArgs)return void this.invokeComponent(n,s,o,r,a,h,i)
this.fetch(ht.s0),this.dup(ht.sp,1),this.load(ht.s0)
let u=l.symbols
e.createArgs&&(this.pushFrame(),this.compileArgs(null,o,null,r)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ht.s0,null!==a),e.createArgs&&this.popFrame(),this.registerComponentDestructor(ht.s0)
let c=[]
this.getComponentSelf(ht.s0),c.push({symbol:0,isBlock:!1})
for(let d=0;d<u.length;d++){let e=u[d]
switch(e.charAt(0)){case"&":let i=null
if("&default"===e)i=a
else if("&inverse"===e)i=h
else{if(e!==Lt)throw t()
i=n}i?(this.pushYieldableBlock(i),c.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),c.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!o)break
let s=o[0],l=o[1],u=e
r&&(u=e.slice(1))
let p=s.indexOf(u);-1!==p&&(this.expr(l[p]),c.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(u.length+1,!!(a||h||n))
for(let t=c.length-1;t>=0;t--){var p=c[t]
let e=p.symbol
p.isBlock?this.setBlock(e):this.setVariable(e)}this.pushFrame(),this.invokeStatic(i),this.didRenderLayout(ht.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(ht.s0)}dynamicComponent(t,e,i,n,s,o=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(t),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,e,i,n,s,o),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(t,e,i,n){let s=this.referrer
this.pushFrame(),this.compileArgs(e,i,null,n),this.push(66),this.expr(t),this.push(58,this.constants.serializable(s)),this.popFrame(),this.fetch(ht.v0)}pushSymbolTable(t){if(t){let e=this.constants.serializable(t)
this.push(40,e)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(t){this.pushSymbolTable(t&&t.symbolTable),this.pushBlockScope(),this.pushBlock(t)}template(t){return t?this.inlineBlock(t):null}}class Dt extends Zt{pushBlock(t){t?this.pushOther(t):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(t){t?this.pushOther(t):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(t){this.pushOther(t),this.push(38),this.pushMachine(41)}pushOther(t){this.push(10,this.other(t))}other(t){return this.constants.other(t)}}class jt{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(t,e,i){this.stack=t,this.base=e,this.length=i,0===i?(this._tag=v,this._references=c):(this._tag=null,this._references=null)}get tag(){let t=this._tag
return t||(t=this._tag=S(this.references)),t}at(t){let e=this.base,i=this.length,n=this.stack
return t<0||t>=i?pt:n.get(t,e)}capture(){return new Ft(this.tag,this.references)}prepend(t){let e=t.length
if(e>0){let i=this.base,n=this.length,s=this.stack
this.base=i-=e,this.length=n+e
for(let o=0;o<e;o++)s.set(t.at(o),o,i)
this._tag=null,this._references=null}}get references(){let t=this._references
if(!t){let e=this.stack,i=this.base,n=this.length
t=this._references=e.sliceArray(i,i+n)}return t}}class Ft{constructor(t,e,i=e.length){this.tag=t,this.references=e,this.length=i}static empty(){return new Ft(v,c,0)}at(t){return this.references[t]}value(){return this.references.map(this.valueOf)}get(t){let e=this.references,i=this.length
if("length"===t)return lt.create(i)
{let n=parseInt(t,10)
return n<0||n>=i?pt:e[n]}}valueOf(t){return t.value()}}class Ht{constructor(){this.base=0,this.length=0,this._references=null,this._names=c,this._atNames=c}setup(t,e,i,n,s){this.stack=t,this.base=e,this.length=i,0===i?(this._references=c,this._names=c,this._atNames=c):(this._references=null,s?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return S(this.references)}get names(){let t=this._names
return t||(t=this._names=this._atNames.map(this.toSyntheticName)),t}get atNames(){let t=this._atNames
return t||(t=this._atNames=this._names.map(this.toAtName)),t}has(t){return-1!==this.names.indexOf(t)}get(t,e=!0){let i=this.base,n=this.stack,s=(e?this.names:this.atNames).indexOf(t)
return-1===s?pt:n.get(s,i)}capture(){return new Vt(this.tag,this.names,this.references)}merge(t){let e=t.length
if(e>0){let i=this.names,n=this.length,s=this.stack,o=t.names
Object.isFrozen(i)&&0===i.length&&(i=[])
for(let r=0;r<e;r++){let e=o[r];-1===i.indexOf(e)&&(n=i.push(e),s.push(t.references[r]))}this.length=n,this._references=null,this._names=i,this._atNames=null}}get references(){let t=this._references
if(!t){let e=this.base,i=this.length,n=this.stack
t=this._references=n.sliceArray(e,e+i)}return t}toSyntheticName(t){return t.slice(1)}toAtName(t){return`@${t}`}}class Vt{constructor(t,e,i){this.tag=t,this.names=e,this.references=i,this.length=e.length,this._map=null}get map(){let t=this._map
if(!t){let e=this.names,i=this.references
t=this._map=r()
for(let n=0;n<e.length;n++){t[e[n]]=i[n]}}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names,i=this.references,n=e.indexOf(t)
return-1===n?pt:i[n]}value(){let t=this.names,e=this.references,i=r()
for(let n=0;n<t.length;n++){i[t[n]]=e[n].value()}return i}}class Ut{constructor(){this.internalValues=null,this.internalTag=null,this.names=c,this.length=0,this.base=0}setup(t,e,i,n){this.stack=t,this.names=n,this.base=e,this.length=i,0===i?(this.internalTag=v,this.internalValues=c):(this.internalTag=null,this.internalValues=null)}get values(){let t=this.internalValues
if(!t){let e=this.base,i=this.length,n=this.stack
t=this.internalValues=n.sliceArray(e,e+3*i)}return t}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.base,i=this.stack,n=this.names,s=n.indexOf(t)
if(-1===n.indexOf(t))return null
let o=i.get(3*s,e),r=i.get(3*s+1,e),a=i.get(3*s+2,e)
return null===a?null:[a,r,o]}capture(){return new Wt(this.names,this.values)}}class Wt{constructor(t,e){this.names=t,this.values=e,this.length=t.length}has(t){return-1!==this.names.indexOf(t)}get(t){let e=this.names.indexOf(t)
return-1===e?null:[this.values[3*e+2],this.values[3*e+1],this.values[3*e]]}}const Gt=new Vt(v,c,c),qt=new Ft(v,c),$t={tag:v,length:0,positional:qt,named:Gt},Yt="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Kt(t){return!(!t||!t[Yt])}class Jt{constructor(t,e){this.inner=t,this.args=e,this[Yt]=!0}unwrap(t){t.realloc(this.offset)
let e=this
for(;;){var i=e
let n=i.args,s=i.inner
if(n&&(t.positional.prepend(n.positional),t.named.merge(n.named)),!Kt(s))return s
e=s}}get offset(){let t=this.inner,e=this.args,i=e?e.positional.length:0
return Kt(t)?i+t.offset:i}}class Xt extends _t{static create(t){return new Xt(t)}toBool(t){return Kt(t)}}ot.add(24,t=>{let e,i=t.stack.pop(),n=t.fetchValue(ht.t0),s=i.value()
e=n?t.elements().appendTrustingDynamicContent(s):t.elements().appendCautiousDynamicContent(s),b(i)||t.updateWith(new class extends at{constructor(t,e){super(),this.reference=t,this.content=e,this.tag=t.tag}evaluate(t){let e=this.content,i=this.reference
e.update(t.env,i.value())}}(i,e)),t.loadValue(ht.t0,null)})
ot.add(18,t=>t.pushChildScope()),ot.add(19,t=>t.popScope()),ot.add(36,t=>t.pushDynamicScope()),ot.add(37,t=>t.popDynamicScope()),ot.add(10,(t,{op1:e})=>{t.stack.push(t.constants.getOther(e))}),ot.add(11,(t,{op1:e})=>{let i=t.stack,n=e>>3
switch(7&e){case 0:i.push(n)
break
case 1:i.push(t.constants.getFloat(n))
break
case 2:i.push(t.constants.getString(n))
break
case 3:i.pushEncodedImmediate(e)
break
case 4:i.push(t.constants.getNegative(n))}}),ot.add(12,t=>{let e=t.stack
e.push(lt.create(e.pop()))}),ot.add(13,(t,{op1:e,op2:i})=>{let n=t.fetchValue(e)-i
t.stack.dup(n)}),ot.add(14,(t,{op1:e})=>{t.stack.pop(e)}),ot.add(15,(t,{op1:e})=>{t.load(e)}),ot.add(16,(t,{op1:e})=>{t.fetch(e)}),ot.add(35,(t,{op1:e})=>{let i=t.constants.getArray(e)
t.bindDynamicScope(i)}),ot.add(49,(t,{op1:e})=>{t.enter(e)}),ot.add(50,t=>{t.exit()}),ot.add(40,(t,{op1:e})=>{t.stack.push(t.constants.getSerializable(e))}),ot.add(39,t=>{t.stack.push(t.scope())}),ot.add(38,t=>{let e=t.stack,i=e.pop()
i?e.pushSmi(i.compile()):e.pushNull()}),ot.add(43,t=>{let e=t.stack,i=e.pop(),n=e.pop(),s=e.pop(),o=e.pop()
if(null===s)return t.pushFrame(),void t.pushScope(n)
let r=n
{let t=s.parameters,e=t.length
if(e>0){r=r.child()
for(let i=0;i<e;i++)r.bindSymbol(t[i],o.at(i))}}t.pushFrame(),t.pushScope(r),t.call(i)}),ot.add(45,(t,{op1:e})=>{let i=t.stack.pop()
if(b(i))i.value()&&t.goto(e)
else{let n=new B(i)
n.peek()&&t.goto(e),t.updateWith(new Qt(n))}}),ot.add(46,(t,{op1:e})=>{let i=t.stack.pop()
if(b(i))i.value()||t.goto(e)
else{let n=new B(i)
n.peek()||t.goto(e),t.updateWith(new Qt(n))}}),ot.add(51,t=>{let e=t.env,i=t.stack
i.push(e.toConditionalReference(i.pop()))})
class Qt extends at{constructor(t){super(),this.type="assert",this.tag=t.tag,this.cache=t}evaluate(t){let e=this.cache
e.revalidate()!==I&&t.throw()}}class te extends at{constructor(t,e){super(),this.target=e,this.type="jump-if-not-modified",this.tag=t,this.lastRevision=t.value()}evaluate(t){let e=this.tag,i=this.target,n=this.lastRevision
!t.alwaysRevalidate&&e.validate(n)&&t.goto(i)}didModify(){this.lastRevision=this.tag.value()}}class ee extends at{constructor(t){super(),this.target=t,this.type="did-modify",this.tag=v}evaluate(){this.target.didModify()}}class ie{constructor(t){this.tag=v,this.type="label",this.label=null,this.prev=null,this.next=null,o(this),this.label=t}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}ot.add(22,(t,{op1:e})=>{t.elements().appendText(t.constants.getString(e))}),ot.add(23,(t,{op1:e})=>{t.elements().appendComment(t.constants.getString(e))}),ot.add(25,(t,{op1:e})=>{t.elements().openElement(t.constants.getString(e))}),ot.add(26,t=>{let e=t.stack.pop().value()
t.elements().openElement(e)}),ot.add(33,t=>{let e,i,n=t.stack.pop(),s=t.stack.pop(),o=t.stack.pop().value()
if(b(n))e=n.value()
else{let i=new B(n)
e=i.peek(),t.updateWith(new Qt(i))}if(b(s))i=s.value()
else{let e=new B(s)
i=e.peek(),t.updateWith(new Qt(e))}t.elements().pushRemoteElement(e,o,i)}),ot.add(34,t=>{t.elements().popRemoteElement()}),ot.add(30,t=>{let e=t.fetchValue(ht.t0)
e&&(e.flush(t),t.loadValue(ht.t0,null)),t.elements().flushElement()}),ot.add(31,t=>{t.elements().closeElement()}),ot.add(32,(t,{op1:e})=>{let i=t.constants.resolveHandle(e),n=t.stack.pop()
var s=t.elements()
let o=s.constructing,r=s.updateOperations,a=t.dynamicScope(),h=i.create(o,n,a,r)
t.env.scheduleInstallModifier(h,i)
let l=i.getDestructor(h)
l&&t.newDestroyable(l)
let u=i.getTag(h)
w(u)||t.updateWith(new class extends at{constructor(t,e,i){super(),this.tag=t,this.manager=e,this.modifier=i,this.type="update-modifier",this.lastUpdated=t.value()}evaluate(t){let e=this.manager,i=this.modifier,n=this.tag,s=this.lastUpdated
n.validate(s)||(t.env.scheduleUpdateModifier(i,e),this.lastUpdated=n.value())}}(u,i,h))})
ot.add(27,(t,{op1:e,op2:i,op3:n})=>{let s=t.constants.getString(e),o=t.constants.getString(i),r=n?t.constants.getString(n):null
t.elements().setStaticAttribute(s,o,r)}),ot.add(28,(t,{op1:e,op2:i,op3:n})=>{let s=t.constants.getString(e),o=t.stack.pop(),r=o.value(),a=n?t.constants.getString(n):null,h=t.elements().setDynamicAttribute(s,r,!!i,a)
b(o)||t.updateWith(new ne(o,h))})
class ne extends at{constructor(t,e){super(),this.reference=t,this.attribute=e,this.type="patch-element",this.tag=t.tag,this.lastRevision=this.tag.value()}evaluate(t){let e=this.attribute,i=this.reference,n=this.tag
n.validate(this.lastRevision)||(this.lastRevision=n.value(),e.update(i.value(),t.env))}}function se(t,e,i){let n=t.lookupComponent(e,i)
return n}function oe(t){return re(t)?"":String(t)}function re(t){return null===t||void 0===t||"function"!=typeof t.toString}function ae(t){return"object"==typeof t&&null!==t&&"function"==typeof t.toHTML}function he(t){return"object"==typeof t&&null!==t&&"number"==typeof t.nodeType}function le(t){return he(t)&&11===t.nodeType}function ue(t){return"string"==typeof t}class ce{constructor(t){this.list=t,this.tag=S(t),this.list=t}value(){let t=[],e=this.list
for(let i=0;i<e.length;i++){let n=oe(e[i].value())
n&&t.push(n)}return 0===t.length?null:t.join(" ")}}function pe(t){return 0|(t.dynamicLayout?1:0)|(t.dynamicTag?2:0)|(t.prepareArgs?4:0)|(t.createArgs?8:0)|(t.attributeHook?16:0)|(t.elementHook?32:0)}function de(t,e){return!!(t&e)}const me=new class{constructor(){this.stack=null,this.positional=new jt,this.named=new Ht,this.blocks=new Ut}setup(t,e,i,n,s){this.stack=t
let o=this.named,r=e.length,a=t.sp-r+1
o.setup(t,a,r,e,s)
let h=a-n
this.positional.setup(t,h,n)
let l=this.blocks,u=i.length,c=h-3*u
l.setup(t,c,u,i)}get tag(){return S([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(t){return this.positional.at(t)}realloc(t){if(t>0){let e=this.positional,i=this.named,n=this.stack,s=e.base+t
for(let t=e.length+i.length-1;t>=0;t--)n.copy(t+e.base,t+s)
e.base+=t,i.base+=t,n.sp+=t}}capture(){let t=0===this.positional.length?qt:this.positional.capture(),e=0===this.named.length?Gt:this.named.capture()
return{tag:this.tag,length:this.length,positional:t,named:e}}clear(){let t=this.stack,e=this.length
t.pop(e)}}
ot.add(57,t=>{let e=t.stack,i=e.pop()
e.push(Xt.create(i))}),ot.add(58,(t,{op1:e})=>{let i=t.stack,n=i.pop(),s=i.pop(),o=t.constants.getSerializable(e),r=t.constants.resolver
t.loadValue(ht.v0,new class{constructor(t,e,i,n){this.inner=t,this.resolver=e,this.meta=i,this.args=n,this.tag=t.tag,this.lastValue=null,this.lastDefinition=null}value(){let t=this.inner,e=this.lastValue,i=t.value()
if(i===e)return this.lastDefinition
let n=null
return Kt(i)?n=i:"string"==typeof i&&i&&(n=se(this.resolver,i,this.meta)),n=this.curry(n),this.lastValue=i,this.lastDefinition=n,n}get(){return pt}curry(t){let e=this.args
return!e&&Kt(t)?t:t?new Jt(t,e):null}}(n,r,o,s))}),ot.add(59,(t,{op1:e})=>{let i=t.constants.resolveHandle(e),n=i.manager,s={definition:i,manager:n,capabilities:pe(n.getCapabilities(i.state)),state:null,handle:null,table:null}
t.stack.push(s)}),ot.add(62,(e,{op1:i})=>{let n,s=e.stack,o=s.pop().value(),r=e.constants.getSerializable(i)
if(e.loadValue(ht.t1,null),"string"==typeof o){n=se(e.constants.resolver,o,r)}else{if(!Kt(o))throw t()
n=o}s.push(n)}),ot.add(60,t=>{let e,i,n=t.stack,s=n.pop()
Kt(s)?i=e=null:e=pe((i=s.manager).getCapabilities(s.state)),n.push({definition:s,capabilities:e,manager:i,state:null,handle:null,table:null})}),ot.add(61,(e,{op1:i})=>{let n,s=e.stack,o=s.pop().value()
if(!Kt(o))throw t()
n=o,s.push(n)}),ot.add(63,(t,{op1:e,op2:i})=>{let n=t.stack,s=t.constants.getStringArray(e),o=i>>4,r=8&i,a=[]
4&i&&a.push("main"),2&i&&a.push("else"),1&i&&a.push("attrs"),me.setup(n,s,a,o,!!r),n.push(me)}),ot.add(66,t=>{let e=t.stack,i=e.pop().capture()
e.push(i)}),ot.add(65,(t,{op1:e})=>{let i=t.stack,n=t.fetchValue(e),s=i.pop(),o=n.definition
Kt(o)&&(o=function(t,e,i){let n=t.definition=e.unwrap(i),s=n.manager,o=n.state
return t.manager=s,t.capabilities=pe(s.getCapabilities(o)),n}(n,o,s))
var r=o
let a=r.manager,h=r.state
if(!0!==de(n.capabilities,4))return void i.push(s)
let l=s.blocks.values,u=s.blocks.names,c=a.prepareArgs(h,s)
if(c){s.clear()
for(let s=0;s<l.length;s++)i.push(l[s])
let t=c.positional,e=c.named,n=t.length
for(let s=0;s<n;s++)i.push(t[s])
let o=Object.keys(e)
for(let s=0;s<o.length;s++)i.push(e[o[s]])
s.setup(i,o,u,n,!0)}i.push(s)}),ot.add(67,(t,{op1:e,op2:i})=>{let n=t.dynamicScope(),s=t.fetchValue(i),o=s.definition,r=s.manager,a=1&e,h=null
de(s.capabilities=pe(r.getCapabilities(o.state)),8)&&(h=t.stack.peek())
let l=r.create(t.env,o.state,h,n,t.getSelf(),!!a)
s.state=l
let u=r.getTag(l)
w(u)||t.updateWith(new class extends at{constructor(t,e,i,n){super(),this.tag=t,this.component=e,this.manager=i,this.dynamicScope=n,this.type="update-component"}evaluate(t){let e=this.component,i=this.manager,n=this.dynamicScope
i.update(e,n)}}(u,l,r,n))}),ot.add(68,(t,{op1:e})=>{var i=t.fetchValue(e)
let n=i.manager,s=i.state,o=n.getDestructor(s)
o&&t.newDestroyable(o)}),ot.add(75,t=>{t.beginCacheGroup(),t.elements().pushSimpleBlock()}),ot.add(69,t=>{t.loadValue(ht.t0,new class{constructor(){this.attributes=r(),this.classes=[]}setAttribute(t,e,i,n){let s={value:e,namespace:n,trusting:i}
"class"===t&&this.classes.push(e),this.attributes[t]=s}flush(t){for(let e in this.attributes){let i=this.attributes[e],n=i.value,s=i.namespace,o=i.trusting
"class"===e&&(n=new ce(this.classes))
let r=t.elements().setDynamicAttribute(e,n.value(),o,s)
b(n)||t.updateWith(new ne(n,r))}}})}),ot.add(29,(t,{op1:e,op2:i,op3:n})=>{let s=t.constants.getString(e),o=t.stack.pop(),r=n?t.constants.getString(n):null
t.fetchValue(ht.t0).setAttribute(s,o,!!i,r)})
ot.add(77,(t,{op1:e})=>{var i=t.fetchValue(e)
let n=i.definition,s=i.state,o=n.manager,r=t.fetchValue(ht.t0)
o.didCreateElement(s,t.elements().expectConstructing("DidCreateElementOpcode#evaluate"),r)}),ot.add(70,(t,{op1:e})=>{var i=t.fetchValue(e)
let n=i.definition,s=i.state,o=n.manager
t.stack.push(o.getSelf(s))}),ot.add(71,(t,{op1:e})=>{var i=t.fetchValue(e)
let n=i.definition,s=i.state,o=n.manager
t.stack.push(o.getTagName(s))}),ot.add(72,(e,{op1:i})=>{let n,s=e.fetchValue(i),o=s.manager,r=s.definition,a=e.constants.resolver,h=e.stack,l=s.state,u=s.capabilities,c=r.state
if(!1===de(u,1))n=o.getLayout(c,a)
else{if(!function(t,e){return!0===de(t,1)}(u))throw t()
n=o.getDynamicLayout(l,a)}h.push(n.symbolTable),h.push(n.handle)}),ot.add(56,(t,{op1:e})=>{let i=t.stack.pop(),n=t.stack.pop(),s=i.manager,o={definition:i,manager:s,capabilities:pe(s.getCapabilities(i.state)),state:null,handle:n.handle,table:n.symbolTable}
t.loadValue(e,o)}),ot.add(73,(t,{op1:e})=>{let i=t.stack,n=i.pop(),s=i.pop(),o=t.fetchValue(e)
o.handle=n,o.table=s}),ot.add(74,(t,{op1:e})=>{let i=t.stack
var n=t.fetchValue(e)
let s=n.handle
var o=n.table
let a=o.symbols,h=o.hasEval
{let e=i.pop(),n=t.pushRootScope(a.length+1,!0)
n.bindSelf(e)
let o=t.stack.pop(),l=null
h&&(l=r())
let u=o.named.atNames
for(let t=u.length-1;t>=0;t--){let e=u[t],i=a.indexOf(u[t]),s=o.named.get(e,!1);-1!==i&&n.bindSymbol(i+1,s),h&&(l[e]=s)}let c=(t,e)=>{let i=a.indexOf(t),s=p.get(e);-1!==i&&n.bindBlock(i+1,s),l&&(l[t]=s)},p=o.blocks
c(Lt,"attrs"),c("&inverse","else"),c("&default","main"),l&&n.bindEvalScope(l),t.call(s)}}),ot.add(78,(t,{op1:e})=>{var i=t.fetchValue(e)
let n=i.manager,s=i.state,o=t.elements().popBlock()
n.didRenderLayout(s,o),t.env.didCreate(s,n),t.updateWith(new class extends at{constructor(t,e,i){super(),this.manager=t,this.component=e,this.bounds=i,this.type="did-update-layout",this.tag=v}evaluate(t){let e=this.manager,i=this.component,n=this.bounds
e.didUpdateLayout(i,n),t.env.didUpdate(i,e)}}(n,s,o))}),ot.add(76,t=>{t.commitCacheGroup()})
let fe=function(t,e){console.info("Use `context`, and `get(<path>)` to debug this template."),e("this")}
ot.add(81,(t,{op1:e,op2:i})=>{let n=t.constants.getStringArray(e),s=t.constants.getArray(i),o=new class{constructor(t,e,i){this.scope=t,this.locals=r()
for(let n=0;n<i.length;n++){let s=i[n],o=e[s-1],r=t.getSymbol(s)
this.locals[o]=r}}get(t){let e=this.scope,i=this.locals,n=t.split(".")
var s=t.split(".")
let o,r=s[0],a=s.slice(1),h=e.getEvalScope()
return"this"===r?o=e.getSelf():i[r]?o=i[r]:0===r.indexOf("@")&&h[r]?o=h[r]:(o=this.scope.getSelf(),a=n),a.reduce((t,e)=>t.get(e),o)}}(t.scope(),n,s)
fe(t.getSelf().value(),t=>o.get(t).value())}),ot.add(79,(t,{op1:e,op2:i,op3:n})=>{let s=t.constants,o=t.constants.resolver,r=t.stack.pop().value(),a=s.getSerializable(e),h=s.getStringArray(i),l=s.getArray(n),u=o.lookupPartial(r,a)
var c=o.resolve(u).getPartial()
let p=c.symbolTable,d=c.handle
{let e=p.symbols,i=t.scope(),n=t.pushRootScope(e.length,!1),s=i.getEvalScope()
n.bindCallerScope(i.getCallerScope()),n.bindEvalScope(s),n.bindSelf(i.getSelf())
let o=Object.create(i.getPartialMap())
for(let t=0;t<l.length;t++){let e=l[t],n=h[e-1],s=i.getSymbol(e)
o[n]=s}if(s)for(let t=0;t<e.length;t++){let i=t+1,o=s[e[t]]
void 0!==o&&n.bind(i,o)}n.bindPartialMap(o),t.pushFrame(),t.call(d)}})
ot.add(54,t=>{let e=t.stack,i=e.pop(),n=e.pop(),s=new class{constructor(t){this.iterator=null
let e=new Z(t)
this.artifacts=e}next(){let t=this.artifacts,e=(this.iterator=this.iterator||t.iterate()).next()
return null===e?null:t.append(e)}}(t.env.iterableFor(i,n.value()))
e.push(s),e.push(new class{constructor(t){this.tag=t.tag,this.artifacts=t}value(){return!this.artifacts.isEmpty()}}(s.artifacts))}),ot.add(52,(t,{op1:e})=>{t.enterList(e)}),ot.add(53,t=>{t.exitList()}),ot.add(55,(t,{op1:e})=>{let i=t.stack.peek().next()
if(i){let e=t.iterate(i.memo,i.value)
t.enterItem(i.key,e)}else t.goto(e)})
class _e{constructor(t,e){this.element=t,this.nextSibling=e}}class ge{constructor(t,e,i){this.parentNode=t,this.first=e,this.last=i}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class ve{constructor(t,e){this.parentNode=t,this.node=e}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function ye(t,e){return new ve(t,e)}function be(t,e){let i=t.parentElement(),n=t.firstNode(),s=t.lastNode(),o=n
for(;o;){let t=o.nextSibling
if(i.insertBefore(o,e),o===s)return t
o=t}return null}function we(t){let e=t.parentElement(),i=t.firstNode(),n=t.lastNode(),s=i
for(;s;){let t=s.nextSibling
if(e.removeChild(s),s===n)return t
s=t}return null}const xe="http://www.w3.org/2000/svg"
function ke(t,e,i){if(!t)return e
if(!function(t,e){let i=t.createElementNS(e,"svg")
try{i.insertAdjacentHTML("beforeend","<circle></circle>")}catch(t){}finally{return 1!==i.childNodes.length||i.firstChild.namespaceURI!==xe}}(t,i))return e
let n=t.createElement("div")
return class extends e{insertHTMLBefore(t,e,s){return null===s||""===s?super.insertHTMLBefore(t,e,s):t.namespaceURI!==i?super.insertHTMLBefore(t,e,s):function(t,e,i,n){let s="<svg>"+i+"</svg>"
e.innerHTML=s
var o=function(t,e,i){let n=t.firstChild,s=null,o=n
for(;o;)s=o,o=o.nextSibling,e.insertBefore(s,i)
return[n,s]}(e.firstChild,t,n)
let r=o[0],a=o[1]
return new ge(t,r,a)}(t,n,s,e)}}}function Le(t,e){return t&&function(t){let e=t.createElement("div")
if(e.innerHTML="first",e.insertAdjacentHTML("beforeend","second"),2===e.childNodes.length)return!1
return!0}(t)?class extends e{constructor(t){super(t),this.uselessComment=t.createComment("")}insertHTMLBefore(t,e,i){if(null===i)return super.insertHTMLBefore(t,e,i)
let n=!1,s=e?e.previousSibling:t.lastChild
s&&s instanceof Text&&(n=!0,t.insertBefore(this.uselessComment,e))
let o=super.insertHTMLBefore(t,e,i)
return n&&t.removeChild(this.uselessComment),o}}:e}const Se="http://www.w3.org/2000/svg",Pe={foreignObject:1,desc:1,title:1},Te=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(t=>Te[t]=1)
let Ee="undefined"==typeof document?null:document
class Ce{constructor(t){this.document=t,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(t,e){let i,n
if(e?(i=e.namespaceURI===Se||"svg"===t,n=Pe[e.tagName]):(i="svg"===t,n=!1),i&&!n){if(Te[t])throw new Error(`Cannot create a ${t} inside an SVG context`)
return this.document.createElementNS(Se,t)}return this.document.createElement(t)}insertBefore(t,e,i){t.insertBefore(e,i)}insertHTMLBefore(t,e,i){return function(t,e,i,n){let s,o=e,r=i,a=r?r.previousSibling:o.lastChild
if(null===n||""===n)return new ge(o,null,null)
null===r?(o.insertAdjacentHTML("beforeend",n),s=o.lastChild):r instanceof HTMLElement?(r.insertAdjacentHTML("beforebegin",n),s=r.previousSibling):(o.insertBefore(t,r),t.insertAdjacentHTML("beforebegin",n),s=t.previousSibling,o.removeChild(t))
let h=a?a.nextSibling:o.firstChild
return new ge(o,h,s)}(this.uselessElement,t,e,i)}createTextNode(t){return this.document.createTextNode(t)}createComment(t){return this.document.createComment(t)}}var Me;(function(t){class e extends Ce{createElementNS(t,e){return this.document.createElementNS(t,e)}setAttribute(t,e,i,n=null){n?t.setAttributeNS(n,e,i):t.setAttribute(e,i)}}t.TreeConstruction=e
let i=e
i=Le(Ee,i),i=ke(Ee,i,Se),t.DOMTreeConstruction=i})(Me||(Me={}))
let Ae=class extends Ce{constructor(t){super(t),this.document=t,this.namespace=null}setAttribute(t,e,i){t.setAttribute(e,i)}removeAttribute(t,e){t.removeAttribute(e)}insertAfter(t,e,i){this.insertBefore(t,e,i.nextSibling)}}
Ae=Le(Ee,Ae)
var ze=Ae=ke(Ee,Ae,Se)
const Oe=Me.DOMTreeConstruction,Be=["javascript:","vbscript:"],Ie=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Ne=["EMBED"],Re=["href","src","background","action"],Ze=["src"]
function De(t,e){return-1!==t.indexOf(e)}function je(t,e){return(null===t||De(Ie,t))&&De(Re,e)}function Fe(t,e){return null!==t&&(De(Ne,t)&&De(Ze,e))}function He(t,e){return je(t,e)||Fe(t,e)}function Ve(t,e,i,n){let s=null
if(null===n||void 0===n)return n
if(ae(n))return n.toHTML()
s=e?e.tagName.toUpperCase():null
let o=oe(n)
if(je(s,i)){let e=t.protocolForURL(o)
if(De(Be,e))return`unsafe:${o}`}return Fe(s,i)?`unsafe:${o}`:o}function Ue(t,e){let i,n
if(e in t)n=e,i="prop"
else{let s=e.toLowerCase()
s in t?(i="prop",n=s):(i="attr",n=e)}return"prop"!==i||"style"!==n.toLowerCase()&&!function(t,e){let i=We[t.toUpperCase()]
return i&&i[e.toLowerCase()]||!1}(t.tagName,n)||(i="attr"),{normalized:n,type:i}}const We={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function Ge(t,e){let i=t.tagName
if(t.namespaceURI===Se)return qe(i,e)
var n=Ue(t,e)
let s=n.type,o=n.normalized
return"attr"===s?qe(i,o):function(t,e){if(He(t,e))return Je
if(function(t,e){return("INPUT"===t||"TEXTAREA"===t)&&"value"===e}(t,e))return Qe
if(function(t,e){return"OPTION"===t&&"selected"===e}(t,e))return ti
return Ke}(i,o)}function qe(t,e){return He(t,e)?Xe:Ye}class $e{constructor(t){this.attribute=t}}class Ye extends $e{set(t,e,i){let n=ei(e)
if(null!==n){var s=this.attribute
let e=s.name,i=s.namespace
t.__setAttribute(e,n,i)}}update(t,e){let i=ei(t)
var n=this.attribute
let s=n.element,o=n.name
null===i?s.removeAttribute(o):s.setAttribute(o,i)}}class Ke extends $e{set(t,e,i){if(null!==e&&void 0!==e){let i=this.attribute.name
this.value=e,t.__setProperty(i,e)}}update(t,e){var i=this.attribute
let n=i.element,s=i.name
this.value!==t&&(n[s]=this.value=t,null!==t&&void 0!==t||this.removeAttribute())}removeAttribute(){var t=this.attribute
let e=t.element,i=t.name,n=t.namespace
n?e.removeAttributeNS(n,i):e.removeAttribute(i)}}class Je extends Ke{set(t,e,i){var n=this.attribute
let s=Ve(i,n.element,n.name,e)
super.set(t,s,i)}update(t,e){var i=this.attribute
let n=Ve(e,i.element,i.name,t)
super.update(n,e)}}class Xe extends Ye{set(t,e,i){var n=this.attribute
let s=Ve(i,n.element,n.name,e)
super.set(t,s,i)}update(t,e){var i=this.attribute
let n=Ve(e,i.element,i.name,t)
super.update(n,e)}}class Qe extends Ke{set(t,e){t.__setProperty("value",oe(e))}update(t){let e=this.attribute.element,i=e.value,n=oe(t)
i!==n&&(e.value=n)}}class ti extends Ke{set(t,e){null!==e&&void 0!==e&&!1!==e&&t.__setProperty("selected",!0)}update(t){let e=this.attribute.element
e.selected=!!t}}function ei(t){return!1===t||void 0===t||null===t||void 0===t.toString?null:!0===t?"":"function"==typeof t?null:String(t)}class ii{constructor(t,e,i,n){this.slots=t,this.callerScope=e,this.evalScope=i,this.partialMap=n}static root(t,e=0){let i=new Array(e+1)
for(let n=0;n<=e;n++)i[n]=pt
return new ii(i,null,null,null).init({self:t})}static sized(t=0){let e=new Array(t+1)
for(let i=0;i<=t;i++)e[i]=pt
return new ii(e,null,null,null)}init({self:t}){return this.slots[0]=t,this}getSelf(){return this.get(0)}getSymbol(t){return this.get(t)}getBlock(t){return this.get(t)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(t,e){this.set(t,e)}bindSelf(t){this.set(0,t)}bindSymbol(t,e){this.set(t,e)}bindBlock(t,e){this.set(t,e)}bindEvalScope(t){this.evalScope=t}bindPartialMap(t){this.partialMap=t}bindCallerScope(t){this.callerScope=t}getCallerScope(){return this.callerScope}child(){return new ii(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(t){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
return this.slots[t]}set(t,e){if(t>=this.slots.length)throw new RangeError(`BUG: cannot get $${t} from scope; length=${this.slots.length}`)
this.slots[t]=e}}class ni{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(t,e){this.createdComponents.push(t),this.createdManagers.push(e)}didUpdate(t,e){this.updatedComponents.push(t),this.updatedManagers.push(e)}scheduleInstallModifier(t,e){this.scheduledInstallManagers.push(e),this.scheduledInstallModifiers.push(t)}scheduleUpdateModifier(t,e){this.scheduledUpdateModifierManagers.push(e),this.scheduledUpdateModifiers.push(t)}didDestroy(t){this.destructors.push(t)}commit(){let t=this.createdComponents,e=this.createdManagers
for(let l=0;l<t.length;l++){let i=t[l]
e[l].didCreate(i)}let i=this.updatedComponents,n=this.updatedManagers
for(let l=0;l<i.length;l++){let t=i[l]
n[l].didUpdate(t)}let s=this.destructors
for(let l=0;l<s.length;l++)s[l].destroy()
let o=this.scheduledInstallManagers,r=this.scheduledInstallModifiers
for(let l=0;l<o.length;l++){let t=o[l],e=r[l]
t.install(e)}let a=this.scheduledUpdateModifierManagers,h=this.scheduledUpdateModifiers
for(let l=0;l<a.length;l++){let t=a[l],e=h[l]
t.update(e)}}}class si{constructor({appendOperations:t,updateOperations:e}){this._transaction=null,this.appendOperations=t,this.updateOperations=e}toConditionalReference(t){return new _t(t)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(t){return function(t){return t._guid||o(t)}(t)+""}begin(){this._transaction=new ni}get transaction(){return this._transaction}didCreate(t,e){this.transaction.didCreate(t,e)}didUpdate(t,e){this.transaction.didUpdate(t,e)}scheduleInstallModifier(t,e){this.transaction.scheduleInstallModifier(t,e)}scheduleUpdateModifier(t,e){this.transaction.scheduleUpdateModifier(t,e)}didDestroy(t){this.transaction.didDestroy(t)}commit(){let t=this.transaction
this._transaction=null,t.commit()}attributeFor(t,e,i,n=null){return Ge(t,e)}}class oi{constructor(t,e,i,n,s=-1,o=-1){this.stack=t,this.heap=e,this.program=i,this.externs=n,this.pc=s,this.ra=o,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(t){let e=this.pc+t-this.currentOpSize
this.pc=e}call(t){this.ra=this.pc,this.pc=this.heap.getaddr(t)}returnTo(t){let e=this.pc+t-this.currentOpSize
this.ra=e}return(){this.pc=this.ra}nextStatement(){let t=this.pc,e=this.program
if(-1===t)return null
let i=this.program.opcode(t).size,n=this.currentOpSize=i
return this.pc+=n,e.opcode(t)}evaluateOuter(t,e){this.evaluateInner(t,e)}evaluateInner(t,e){t.isMachine?this.evaluateMachine(t):this.evaluateSyscall(t,e)}evaluateMachine(t){switch(t.type){case 47:return this.pushFrame()
case 48:return this.popFrame()
case 42:return this.call(t.op1)
case 41:return this.call(this.stack.popSmi())
case 44:return this.goto(t.op1)
case 20:return this.return()
case 21:return this.returnTo(t.op1)}}evaluateSyscall(t,e){ot.evaluate(e,t,t.type)}}class ri{constructor(t){this.trusting=t}retry(t,e){let i=this.bounds,n=i.parentElement(),s=we(i),o=mi.forInitialRender(t,{element:n,nextSibling:s})
return this.trusting?o.__appendTrustingDynamicContent(e):o.__appendCautiousDynamicContent(e)}}class ai{constructor(t){this.inner=t,this.bounds=t.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(t,e){let i=this.inner=this.inner.update(t,e)
return this.bounds=i.bounds,this}}class hi extends ri{constructor(t,e,i){super(i),this.bounds=t,this.lastValue=e}update(t,e){let i,n=this.lastValue
if(e===n)return this
if(he(e)||ae(e))return this.retry(t,e)
if((i=re(e)?"":ue(e)?e:String(e))!==n){this.bounds.firstNode().nodeValue=this.lastValue=i}return this}}class li extends ri{constructor(t,e,i){super(i),this.bounds=t,this.lastValue=e}update(t,e){return e===this.lastValue?this:this.retry(t,e)}}class ui extends ri{constructor(t,e,i){super(i),this.bounds=t,this.lastValue=e}update(t,e){let i=this.lastValue
return e===i?this:ae(e)&&e.toHTML()===i.toHTML()?(this.lastValue=e,this):this.retry(t,e)}}class ci extends ri{constructor(t,e,i){super(i),this.bounds=t,this.lastValue=e}update(t,e){let i=this.lastValue
return e===i?this:function(t){return re(t)?"":ue(t)?t:ae(t)?t.toHTML():he(t)?t:String(t)}(e)===i?this:this.retry(t,e)}}class pi{constructor(t){this.node=t}firstNode(){return this.node}}class di{constructor(t){this.node=t}lastNode(){return this.node}}class mi{constructor(t,e,i){this.constructing=null,this.operations=null,this.cursorStack=new a,this.blockStack=new a,this.pushElement(e,i),this.env=t,this.dom=t.getAppendOperations(),this.updateOperations=t.getDOM()}static forInitialRender(t,e){let i=new this(t,e.element,e.nextSibling)
return i.pushSimpleBlock(),i}static resume(t,e,i){let n=new this(t,e.parentElement(),i)
return n.pushSimpleBlock(),n.pushBlockTracker(e),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(t){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new fi(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new gi(this.element))}pushBlockList(t){return this.pushBlockTracker(new vi(this.element,t))}pushBlockTracker(t,e=!1){let i=this.blockStack.current
return null!==i&&(i.newDestroyable(t),e||i.didAppendBounds(t)),this.__openBlock(),this.blockStack.push(t),t}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(t){let e=this.__openElement(t)
return this.constructing=e,e}__openElement(t){return this.dom.createElement(t,this.element)}flushElement(){let t=this.element,e=this.constructing
this.__flushElement(t,e),this.constructing=null,this.operations=null,this.pushElement(e,null),this.didOpenElement(e)}__flushElement(t,e){this.dom.insertBefore(t,e,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(t,e,i=null){this.__pushRemoteElement(t,e,i)}__pushRemoteElement(t,e,i){this.pushElement(t,i)
let n=new _i(t)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(t,e){this.cursorStack.push(new _e(t,e))}didAddDestroyable(t){this.block().newDestroyable(t)}didAppendBounds(t){return this.block().didAppendBounds(t),t}didAppendNode(t){return this.block().didAppendNode(t),t}didOpenElement(t){return this.block().openElement(t),t}willCloseElement(){this.block().closeElement()}appendText(t){return this.didAppendNode(this.__appendText(t))}__appendText(t){let e=this.dom,i=this.element,n=this.nextSibling,s=e.createTextNode(t)
return e.insertBefore(i,s,n),s}__appendNode(t){return this.dom.insertBefore(this.element,t,this.nextSibling),t}__appendFragment(t){let e=t.firstChild
if(e){let i=function(t,e,i){return new ge(t,e,i)}(this.element,e,t.lastChild)
return this.dom.insertBefore(this.element,t,this.nextSibling),i}return ye(this.element,this.__appendComment(""))}__appendHTML(t){return this.dom.insertHTMLBefore(this.element,this.nextSibling,t)}appendTrustingDynamicContent(t){let e=new ai(this.__appendTrustingDynamicContent(t))
return this.didAppendBounds(e),e}__appendTrustingDynamicContent(t){if(ue(t))return this.trustedContent(t)
if(re(t))return this.trustedContent("")
if(ae(t))return this.trustedContent(t.toHTML())
if(le(t)){let e=this.__appendFragment(t)
return new li(e,t,!0)}if(he(t)){let e=this.__appendNode(t)
return new li(ye(this.element,e),e,!0)}return this.trustedContent(String(t))}appendCautiousDynamicContent(t){let e=new ai(this.__appendCautiousDynamicContent(t))
return this.didAppendBounds(e.bounds),e}__appendCautiousDynamicContent(t){if(ue(t))return this.untrustedContent(t)
if(re(t))return this.untrustedContent("")
if(le(t)){let e=this.__appendFragment(t)
return new li(e,t,!1)}if(he(t)){let e=this.__appendNode(t)
return new li(ye(this.element,e),e,!1)}if(ae(t)){let e=t.toHTML(),i=this.__appendHTML(e)
return new ui(i,t,!1)}return this.untrustedContent(String(t))}trustedContent(t){let e=this.__appendHTML(t)
return new ci(e,t,!0)}untrustedContent(t){let e=this.__appendText(t),i=ye(this.element,e)
return new hi(i,t,!1)}appendComment(t){return this.didAppendNode(this.__appendComment(t))}__appendComment(t){let e=this.dom,i=this.element,n=this.nextSibling,s=e.createComment(t)
return e.insertBefore(i,s,n),s}__setAttribute(t,e,i){this.dom.setAttribute(this.constructing,t,e,i)}__setProperty(t,e){this.constructing[t]=e}setStaticAttribute(t,e,i){this.__setAttribute(t,e,i)}setDynamicAttribute(t,e,i,n){let s=this.constructing,o=new(this.env.attributeFor(s,t,i,n))({element:s,name:t,namespace:n||null})
return o.set(this,e,this.env),o}}class fi{constructor(t){this.parent=t,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let t=this.destroyables
if(t&&t.length)for(let e=0;e<t.length;e++)t[e].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(t){this.didAppendNode(t),this.nesting++}closeElement(){this.nesting--}didAppendNode(t){0===this.nesting&&(this.first||(this.first=new pi(t)),this.last=new di(t))}didAppendBounds(t){0===this.nesting&&(this.first||(this.first=t),this.last=t)}newDestroyable(t){this.destroyables=this.destroyables||[],this.destroyables.push(t)}finalize(t){this.first||t.appendComment("")}}class _i extends fi{destroy(){super.destroy(),we(this)}}class gi extends fi{reset(t){let e=this.destroyables
if(e&&e.length)for(let n=0;n<e.length;n++)t.didDestroy(e[n])
let i=we(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,i}}class vi{constructor(t,e){this.parent=t,this.boundList=e,this.parent=t,this.boundList=e}destroy(){this.boundList.forEachNode(t=>t.destroy())}parentElement(){return this.parent}firstNode(){let t=this.boundList.head()
return t&&t.firstNode()}lastNode(){let t=this.boundList.tail()
return t&&t.lastNode()}openElement(t){}closeElement(){}didAppendNode(t){}didAppendBounds(t){}newDestroyable(t){}finalize(t){}}class yi{constructor(t=[]){this.vec=t}clone(){return new yi(this.vec.slice())}sliceFrom(t){return new yi(this.vec.slice(t))}slice(t,e){return new yi(this.vec.slice(t,e))}copy(t,e){this.vec[e]=this.vec[t]}writeRaw(t,e){this.vec[t]=e}writeSmi(t,e){var i
this.vec[t]=(i=e)<0?Math.abs(i)<<3|4:i<<3|0}getRaw(t){return this.vec[t]}getSmi(t){return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw new Error("unreachable")}}(this.vec[t])}reset(){this.vec.length=0}len(){return this.vec.length}}const bi=2147483648,wi=2147483647
class xi{constructor(t=new yi,e=[]){this.inner=t,this.js=e}slice(t,e){let i
return i="number"==typeof t&&"number"==typeof e?this.inner.slice(t,e):"number"==typeof t&&void 0===e?this.inner.sliceFrom(t):this.inner.clone(),new xi(i,this.js.slice(t,e))}sliceInner(t,e){let i=[]
for(let n=t;n<e;n++)i.push(this.get(n))
return i}copy(t,e){this.inner.copy(t,e)}write(t,e){if(function(t){let e=typeof t
if(null===t||void 0===t)return!0
switch(e){case"boolean":case"undefined":return!0
case"number":if(t%1!=0)return!1
let i=Math.abs(t)
return!(i&bi)
default:return!1}}(e))this.inner.writeRaw(t,Li(e))
else{let i=this.js.length
this.js.push(e),this.inner.writeRaw(t,i|bi)}}writeSmi(t,e){this.inner.writeSmi(t,e)}writeImmediate(t,e){this.inner.writeRaw(t,e)}get(e){let i=this.inner.getRaw(e)
return i&bi?this.js[i&wi]:function(e){switch(e){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw t()}}(e)}}(i)}getSmi(t){return this.inner.getSmi(t)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class ki{constructor(t,e,i){this.stack=t,this.fp=e,this.sp=i}static empty(){return new this(new xi,0,-1)}static restore(t){let e=new xi
for(let i=0;i<t.length;i++)e.write(i,t[i])
return new this(e,0,t.length-1)}push(t){this.stack.write(++this.sp,t)}pushSmi(t){this.stack.writeSmi(++this.sp,t)}pushImmediate(t){this.stack.writeImmediate(++this.sp,Li(t))}pushEncodedImmediate(t){this.stack.writeImmediate(++this.sp,t)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(t=this.sp){this.stack.copy(t,++this.sp)}copy(t,e){this.stack.copy(t,e)}pop(t=1){let e=this.stack.get(this.sp)
return this.sp-=t,e}popSmi(){return this.stack.getSmi(this.sp--)}peek(t=0){return this.stack.get(this.sp-t)}peekSmi(t=0){return this.stack.getSmi(this.sp-t)}get(t,e=this.fp){return this.stack.get(e+t)}getSmi(t,e=this.fp){return this.stack.getSmi(e+t)}set(t,e,i=this.fp){this.stack.write(i+e,t)}slice(t,e){return this.stack.slice(t,e)}sliceArray(t,e){return this.stack.sliceInner(t,e)}capture(t){let e=this.sp+1,i=e-t
return this.stack.sliceInner(i,e)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function Li(e){switch(typeof e){case"number":return function(t){return t<0?Math.abs(t)<<3|4:t<<3|0}(e)
case"boolean":return e?11:3
case"object":return 19
case"undefined":return 27
default:throw t()}}class Si{constructor(t,e,{alwaysRevalidate:i=!1}){this.frameStack=new a,this.env=t,this.constants=e.constants,this.dom=t.getDOM(),this.alwaysRevalidate=i}execute(t,e){let i=this.frameStack
for(this.try(t,e);!i.isEmpty();){let t=this.frame.nextStatement()
null!==t?t.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(t){this.frame.goto(t)}try(t,e){this.frameStack.push(new Mi(t,e))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Pi extends at{constructor(t,e,i,n){super(),this.start=t,this.state=e,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=i}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(t){t.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class Ti extends Pi{constructor(t,e,i,n){super(t,e,i,n),this.type="try",this.tag=this._tag=z.create(v)}didInitializeChildren(){this._tag.inner.update(P(this.children))}evaluate(t){t.try(this.children,this)}handleException(){let t=this.state,e=this.bounds,i=this.children,n=this.start,s=this.prev,o=this.next
i.clear()
let r=mi.resume(t.env,e,e.reset(t.env)),a=zi.resume(t,r),h=new l
a.execute(n,e=>{e.stack=ki.restore(t.stack),e.updatingOpcodeStack.push(h),e.updateWith(this),e.updatingOpcodeStack.push(i)}),this.prev=s,this.next=o}}class Ei{constructor(t,e){this.opcode=t,this.marker=e,this.didInsert=!1,this.didDelete=!1,this.map=t.map,this.updating=t.children}insert(t,e,i,n){let s=this.map,o=this.opcode,r=this.updating,a=null,h=null
a=n?(h=s[n]).bounds.firstNode():this.marker
let u=o.vmForInsertion(a),c=null,p=o.start
u.execute(p,n=>{s[t]=c=n.iterate(i,e),n.updatingOpcodeStack.push(new l),n.updateWith(c),n.updatingOpcodeStack.push(c.children)}),r.insertBefore(c,h),this.didInsert=!0}retain(t,e,i){}move(t,e,i,n){let s=this.map,o=this.updating,r=s[t],a=s[n]||null
be(r,n?a.firstNode():this.marker),o.remove(r),o.insertBefore(r,a)}delete(t){let e=this.map,i=e[t]
i.didDestroy(),we(i),this.updating.remove(i),delete e[t],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Ci extends Pi{constructor(t,e,i,n,s){super(t,e,i,n),this.type="list-block",this.map=r(),this.lastIterated=p,this.artifacts=s
let o=this._tag=z.create(v)
this.tag=T([s.tag,o])}didInitializeChildren(t=!0){this.lastIterated=this.artifacts.tag.value(),t&&this._tag.inner.update(P(this.children))}evaluate(t){let e=this.artifacts,i=this.lastIterated
if(!e.tag.validate(i)){let i=this.bounds,n=t.dom,s=n.createComment("")
n.insertAfter(i.parentElement(),s,i.lastNode())
let o=new Ei(this,s)
new j({target:o,artifacts:e}).sync(),this.parentElement().removeChild(s)}super.evaluate(t)}vmForInsertion(t){let e=this.bounds,i=this.state,n=mi.forInitialRender(i.env,{element:e.parentElement(),nextSibling:t})
return zi.resume(i,n)}}class Mi{constructor(t,e){this.ops=t,this.exceptionHandler=e,this.current=t.head()}goto(t){this.current=t}nextStatement(){let t=this.current,e=this.ops
return t&&(this.current=e.nextNode(t)),t}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ai{constructor(t,e,i,n){this.env=t,this.program=e,this.updating=i,this.bounds=n}rerender({alwaysRevalidate:t=!1}={alwaysRevalidate:!1}){let e=this.env,i=this.program,n=this.updating
new Si(e,i,{alwaysRevalidate:t}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),we(this.bounds)}}class zi{constructor(t,e,i,n,s){this.program=t,this.env=e,this.elementStack=s,this.dynamicScopeStack=new a,this.scopeStack=new a,this.updatingOpcodeStack=new a,this.cacheGroups=new a,this.listBlockStack=new a,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=e,this.heap=t.heap,this.constants=t.constants,this.elementStack=s,this.scopeStack.push(i),this.dynamicScopeStack.push(n),this.inner=new oi(ki.empty(),this.heap,t,{debugBefore:t=>ot.debugBefore(this,t,t.type),debugAfter:(t,e)=>{ot.debugAfter(this,t,t.type,e)}})}get stack(){return this.inner.stack}set stack(t){this.inner.stack=t}set currentOpSize(t){this.inner.currentOpSize=t}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(t){this.inner.pc=t}get ra(){return this.inner.ra}set ra(t){this.inner.ra=t}get fp(){return this.stack.fp}set fp(t){this.stack.fp=t}get sp(){return this.stack.sp}set sp(t){this.stack.sp=t}fetch(t){this.stack.push(this[ht[t]])}load(t){this[ht[t]]=this.stack.pop()}fetchValue(t){return this[ht[t]]}loadValue(t,e){this[ht[t]]=e}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(t){this.inner.goto(t)}call(t){this.inner.call(t)}returnTo(t){this.inner.returnTo(t)}return(){this.inner.return()}static initial(t,e,i,n,s,o,r){let a=t.heap.scopesizeof(r),h=ii.root(i,a),u=new zi(t,e,h,s,o)
return u.pc=u.heap.getaddr(r),u.updatingOpcodeStack.push(new l),u}static empty(t,e,i){let n={get:()=>pt,set:()=>pt,child:()=>n},s=new zi(t,e,ii.root(pt,0),n,i)
return s.updatingOpcodeStack.push(new l),s}static resume({program:t,env:e,scope:i,dynamicScope:n},s){return new zi(t,e,i,n,s)}capture(t){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(t)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let t=new ie("END"),e=this.updating(),i=this.cacheGroups.pop(),n=i?e.nextNode(i):e.head(),s=e.tail(),o=P(new u(n,s)),r=new te(o,t)
e.insertBefore(r,n),e.append(new ee(r)),e.append(t)}enter(t){let e=new l,i=this.capture(t),n=this.elements().pushUpdatableBlock(),s=new Ti(this.heap.gethandle(this.pc),i,n,e)
this.didEnter(s)}iterate(t,e){let i=this.stack
i.push(e),i.push(t)
let n=this.capture(2),s=this.elements().pushUpdatableBlock()
return new Ti(this.heap.gethandle(this.pc),n,s,new l)}enterItem(t,e){this.listBlock().map[t]=e,this.didEnter(e)}enterList(t){let e=new l,i=this.capture(0),n=this.elements().pushBlockList(e),s=this.stack.peek().artifacts,o=this.pc+t-this.currentOpSize,r=this.heap.gethandle(o),a=new Ci(r,i,n,e,s)
this.listBlockStack.push(a),this.didEnter(a)}didEnter(t){this.updateWith(t),this.updatingOpcodeStack.push(t.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(t){this.updating().append(t)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let t=this.dynamicScope().child()
return this.dynamicScopeStack.push(t),t}pushRootScope(t,e){let i=ii.sized(t)
return e&&i.bindCallerScope(this.scope()),this.scopeStack.push(i),i}pushScope(t){this.scopeStack.push(t)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(t){this.elements().didAddDestroyable(t)}getSelf(){return this.scope().getSelf()}referenceForSymbol(t){return this.scope().getSymbol(t)}execute(t,e){let i
for(this.pc=this.heap.getaddr(t),e&&e(this);!(i=this.next()).done;);return i.value}next(){let t,e=this.env,i=this.program,n=this.updatingOpcodeStack,s=this.elementStack,o=this.inner.nextStatement()
return null!==o?(this.inner.evaluateOuter(o,this),t={done:!1,value:null}):(this.stack.reset(),t={done:!0,value:new Ai(e,i,n.pop(),s.popBlock())}),t}bindDynamicScope(t){let e=this.dynamicScope()
for(let i=t.length-1;i>=0;i--){let n=this.constants.getString(t[i])
e.set(n,this.stack.pop())}}}class Oi{constructor(t){this.vm=t}next(){return this.vm.next()}}let Bi=0
class Ii{constructor(t,e){this.options=t,this.parsedLayout=e,this.layout=null,this.partial=null
let i=e.block
this.symbols=i.symbols,this.hasEval=i.hasEval,this.statements=i.statements,this.referrer=e.referrer,this.id=e.id||`client-${Bi++}`}renderLayout(t){let e=t.env,i=t.self,n=t.dynamicScope
var s=t.args
let o=void 0===s?$t:s,r=t.builder,a=this.asLayout().compile(),h=zi.initial(this.options.program,e,i,o,n,r,a)
return new Oi(h)}asLayout(){return this.layout?this.layout:this.layout=Ni(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Ni(this.parsedLayout,this.options,!0)}}function Ni(t,e,i){let s=t.block,o=t.referrer,r=s.hasEval,a=s.symbols,h=n({},e,{asPartial:i,referrer:o})
return new Ot(s.statements,t,h,{referrer:o,hasEval:r,symbols:a})}class Ri{get(t){return ji.create(this,t)}}class Zi extends Ri{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let t=this.tag,e=this._lastRevision,i=this._lastValue
return e&&t.validate(e)||(i=this._lastValue=this.compute(),this._lastRevision=t.value()),i}}class Di extends N{constructor(){super(...arguments),this.children=r()}get(t){let e=this.children[t]
return e||(e=this.children[t]=new Fi(this.inner,t)),e}}class ji extends Zi{static create(t,e){return b(t)?new Fi(t.value(),e):new Hi(t,e)}get(t){return new Hi(this,t)}}class Fi extends ji{constructor(t,e){super(),this._parentValue=t,this._propertyKey=e,this.tag=Y(t,e)}compute(){return this._parentValue[this._propertyKey]}}class Hi extends ji{constructor(t,e){super()
let i=t.tag,n=z.create(v)
this._parentReference=t,this._parentObjectTag=n,this._propertyKey=e,this.tag=T([i,n])}compute(){let t=this._parentReference,e=this._parentObjectTag,i=this._propertyKey,n=t.value()
return e.inner.update(Y(n,i)),"string"==typeof n&&"length"===i?n.length:"object"==typeof n&&n?n[i]:void 0}}class Vi extends Ri{constructor(t){super(),this.tag=k.create(),this._value=t}value(){return this._value}update(t){t!==this._value&&(this.tag.inner.dirty(),this._value=t)}}class Ui{constructor(t,e,i){let n=t.ComponentClass,s=t.name
this.args=e
let o={debugName:s,args:this.namedArgsSnapshot()}
nt(o,i),n&&(this.component=n.create(o))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const Wi=new Di(null)
class Gi{static create(t){return new Gi(t)}constructor(t){this.env=t.env}prepareArgs(t,e){return null}getCapabilities(t){return t.capabilities}getLayout({name:t,handle:e,symbolTable:i},n){return e&&i?{handle:e,symbolTable:i}:n.compileTemplate(t,e)}create(t,e,i,n,s,o){if(e.ComponentClass){let t=it(this.env)
return new Ui(e,i.capture(),t)}}getSelf(t){return t?new Di(t.component):Wi}didCreateElement(t,e){}didRenderLayout(t,e){t&&(t.component.bounds=new st(e))}didCreate(t){t&&t.component.didInsertElement()}getTag(t){return t?t.tag:v}update(t,e){t&&(t.component.args=t.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(t){t&&t.component.didUpdate()}getDestructor(t){return t?t.component:qi}}const qi={destroy(){}}
class $i{constructor(t,e){this._registry=t,this._resolver=e}register(t,e,i){let n=this._toAbsoluteSpecifier(t)
this._registry.register(n,e,i)}registration(t){let e=this._toAbsoluteSpecifier(t)
return this._registry.registration(e)}unregister(t){let e=this._toAbsoluteSpecifier(t)
this._registry.unregister(e)}registerOption(t,e,i){let n=this._toAbsoluteOrTypeSpecifier(t)
this._registry.registerOption(n,e,i)}registeredOption(t,e){let i=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOption(i,e)}registeredOptions(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredOptions(e)}unregisterOption(t,e){let i=this._toAbsoluteOrTypeSpecifier(t)
this._registry.unregisterOption(i,e)}registerInjection(t,e,i){let n=this._toAbsoluteOrTypeSpecifier(t),s=this._toAbsoluteSpecifier(i)
this._registry.registerInjection(n,e,s)}registeredInjections(t){let e=this._toAbsoluteOrTypeSpecifier(t)
return this._registry.registeredInjections(e)}_toAbsoluteSpecifier(t,e){return this._resolver.identify(t,e)}_toAbsoluteOrTypeSpecifier(t){return function(t){return-1===t.indexOf(":")}(t)?t:this._toAbsoluteSpecifier(t)}}class Yi{constructor(t=null){this.bucket=t?n({},t):{}}get(t){return this.bucket[t]}set(t,e){return this.bucket[t]=e}child(){return new Yi(this.bucket)}}class Ki{constructor(t,e){this.position=0,this.array=t,this.keyFor=e}isEmpty(){return 0===this.array.length}next(){let t=this.position,e=this.array,i=this.keyFor
if(t>=e.length)return null
let n=e[t],s=i(n,t),o=t
return this.position++,{key:s,value:n,memo:o}}}class Ji{constructor(t,e,i){this.position=0,this.keys=t,this.values=e,this.keyFor=i}isEmpty(){return 0===this.keys.length}next(){let t=this.position,e=this.keys,i=this.values,n=this.keyFor
if(t>=e.length)return null
let s=i[t],o=e[t],r=n(s,o)
return this.position++,{key:r,value:s,memo:o}}}const Xi=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Qi{constructor(t,e){this.tag=t.tag,this.ref=t,this.keyFor=e}iterate(){let t=this.ref,e=this.keyFor,i=t.value()
if(Array.isArray(i))return i.length>0?new Ki(i,e):Xi
if(void 0===i||null===i)return Xi
if(void 0!==i.forEach){let t=[]
return i.forEach(function(e){t.push(e)}),t.length>0?new Ki(t,e):Xi}if("object"==typeof i){let t=Object.keys(i)
return t.length>0?new Ji(t,t.map(t=>i[t]),e):Xi}throw new Error(`Don't know how to {{#each ${i}}}`)}valueReferenceFor(t){return new Vi(t.value)}updateValueReference(t,e){t.update(e.value)}memoReferenceFor(t){return new Vi(t.memo)}updateMemoReference(t,e){t.update(e.memo)}}class tn extends si{static create(t={}){return t.document=t.document||self.document,t.appendOperations=t.appendOperations||new Oe(t.document),new tn(t)}constructor(t){super({appendOperations:t.appendOperations,updateOperations:new ze(t.document||document)}),nt(this,it(t)),this.uselessAnchor=t.document.createElement("a")}protocolForURL(t){return this.uselessAnchor.href=t,this.uselessAnchor.protocol}iterableFor(t,e){let i
if(!e)throw new Error("Must specify a key for #each")
switch(e){case"@index":i=((t,e)=>String(e))
break
case"@primitive":i=(t=>String(t))
break
default:i=(t=>t[e])}return new Qi(t,i)}}const en="object"==typeof document?document:null
class nn{constructor(t){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=t.rootName,this.resolver=t.resolver,e(t.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),e(t.renderer,"Must provide a Renderer to render the templates produced by the Loader."),e(t.builder,"Must provide a Builder that is responsible to building DOM."),this.document=t.document||en,this.loader=t.loader,this.renderer=t.renderer,this.builder=t.builder}renderComponent(t,e,i=null){let n=this._roots,s=this._self
n.push({id:this._rootsIndex++,component:t,parent:e,nextSibling:i}),s&&(s.update({roots:n}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(t){this._initializers.push(t)}initRegistry(){let t=this._registry=new tt,e=new $i(this._registry,this.resolver)
t.register(`environment:/${this.rootName}/main/main`,tn),t.registerOption("helper","instantiate",!1),t.registerOption("template","instantiate",!1),t.register(`document:/${this.rootName}/main/main`,this.document),t.registerOption("document","instantiate",!1),t.registerInjection("environment","document",`document:/${this.rootName}/main/main`),t.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let i=this._initializers
for(let n=0;n<i.length;n++)i[n].initialize(e)
this._initialized=!0}initContainer(){this._container=new Q(this._registry,this.resolver),this._container.defaultInjections=(t=>{let e={}
return nt(e,this),e})}async _render(){let t=this.env,e=this._self=new Vi({roots:this._roots}),i=new Yi,n=this.builder.getBuilder(t),s=await this.loader.getTemplateIterator(this,t,n,i,e)
try{t.begin(),await this.renderer.render(s),t.commit(),this._didRender()}catch(t){throw this._didError(t),t}}async _rerender(){let t=this.env
try{t.begin(),await this.renderer.rerender(),t.commit(),this._didRender()}catch(t){throw this._didError(t),t}}_didRender(){this._rendered=!0
let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[0]())}_didError(t){let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[1](t))}identify(t,e){return this.resolver.identify(t,e)}factoryFor(t,e){return this._container.factoryFor(this.identify(t,e))}lookup(t,e){return this._container.lookup(this.identify(t,e))}}class sn{constructor(){this.byName=r(),this.byHandle=r()}hasName(t){return t in this.byName}getHandle(t){return this.byName[t]}hasHandle(t){return t in this.byHandle}getByHandle(t){return this.byHandle[t]}register(t,e,i){this.byHandle[t]=i,this.byName[e]=t}}class on{constructor(t,e){this.helper=t,this.tag=e.tag,this.args=e.capture()}value(){let t=this.helper,e=this.args
return t(e.positional.value(),e.named.value())}get(){return new Di(this)}}class rn{constructor(t){this.owner=t,this.handleLookup=[],this.cache={component:new sn,template:new sn,compiledTemplate:new sn,helper:new sn,manager:new sn,modifier:new sn}}setCompileOptions(t){this.templateOptions=t}lookup(t,e,i){return this.cache[t].hasName(e)?this.cache[t].getHandle(e):null}register(t,e,i){let n=this.cache[t],s=this.handleLookup.length
return this.handleLookup.push(n),this.cache[t].register(s,e,i),s}lookupModifier(t,e){let i=this.lookup("modifier",t)
if(null===i)throw new Error(`Modifier for ${t} not found.`)
return i}compileTemplate(t,e){if(!this.cache.compiledTemplate.hasName(t)){let i=this.resolve(e),n=i.block,s=i.meta,o=i.id,r=JSON.parse(n),a=new Ii(this.templateOptions,{id:o,block:r,referrer:s}).asLayout(),h={handle:a.compile(),symbolTable:a.symbolTable}
return this.register("compiledTemplate",t,h),h}let i=this.lookup("compiledTemplate",t)
return this.resolve(i)}registerHelper(t,e){return this.register("helper",t,(t,i)=>new on(e,i))}registerInternalHelper(t,e){this.register("helper",t,e)}registerComponent(t,e,i,n){let s=this.registerTemplate(e,n),o=this.managerFor(s.meta.managerId),r=new X(t,o,i,s.handle)
return this.register("component",t,r)}lookupComponentHandle(t,e){return this.cache.component.hasName(t)||this.lookupComponent(t,e),this.lookup("component",t,e)}managerFor(t="main"){let e
if(this.cache.manager.hasName(t)){let e=this.cache.manager.getHandle(t)
return this.cache.manager.getByHandle(e)}{let i=this.owner.rootName
if(!(e=this.owner.lookup(`component-manager:/${i}/component-managers/${t}`)))throw new Error(`No component manager found for ID ${t}.`)
return this.register("manager",t,e),e}}registerTemplate(t,e){return{name:t,handle:this.register("template",t,e),meta:e.meta}}lookupComponent(t,e){let i
if(this.cache.component.hasName(t))i=this.lookup("component",t,e)
else{let n=function(t,e){if(null===t||void 0===t)throw new Error(e)
return t}(this.identifyComponent(t,e),`Could not find the component '${t}'`),s=this.owner.lookup("template",n),o=this.owner.identify("component",n),r=null
void 0!==o&&(r=this.owner.factoryFor(o)),i=this.registerComponent(t,n,r,s)}return this.resolve(i)}lookupHelper(t,e){if(!this.cache.helper.hasName(t)){let i=this.owner,n=`helper:${t}`,s=e.specifier,o=i.identify(n,s)
if(void 0===o)return null
let r=this.owner.lookup(o,e.specifier)
return this.registerHelper(t,r)}return this.lookup("helper",t,e)}lookupPartial(t,e){throw new Error("Partials are not available in Glimmer applications.")}resolve(t){return this.handleLookup[t].getByHandle(t)}identifyComponent(t,e){let i=this.owner,n=`template:${t}`,s=e.specifier,o=i.identify(n,s)
if(void 0===o&&i.identify(`component:${t}`,s))throw new Error(`The component '${t}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return o}}const an={},hn=0,ln=Object.freeze([])
class un{constructor(){this.strings=[],this.arrays=[ln],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(t){let e=this.floats.indexOf(t)
return e>-1?e:this.floats.push(t)-1}negative(t){return this.negatives.push(t)-1}string(t){let e=this.strings.indexOf(t)
return e>-1?e:this.strings.push(t)-1}stringArray(t){let e=new Array(t.length)
for(let i=0;i<t.length;i++)e[i]=this.string(t[i])
return this.array(e)}array(t){if(0===t.length)return hn
let e=this.arrays.indexOf(t)
return e>-1?e:this.arrays.push(t)-1}handle(t){let e=this.handles.indexOf(t)
return e>-1?e:(this.resolved.push(an),this.handles.push(t)-1)}serializable(t){let e=JSON.stringify(t),i=this.strings.indexOf(e)
return i>-1?i:this.strings.push(e)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class cn extends un{constructor(t,e){super(),this.resolver=t,e&&(this.strings=e.strings,this.arrays=e.arrays,this.handles=e.handles,this.floats=e.floats,this.negatives=e.negatives,this.resolved=this.handles.map(()=>an))}getFloat(t){return this.floats[t]}getNegative(t){return this.negatives[t]}getString(t){return this.strings[t]}getStringArray(t){let e=this.getArray(t),i=new Array(e.length)
for(let n=0;n<e.length;n++){let t=e[n]
i[n]=this.getString(t)}return i}getArray(t){return this.arrays[t]}resolveHandle(t){let e=this.resolved[t]
if(e===an){let i=this.handles[t]
e=this.resolved[t]=this.resolver.resolve(i)}return e}getSerializable(t){return JSON.parse(this.strings[t])}}class pn extends cn{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(t){let e=this.serializables.indexOf(t)
return e>-1?e:this.serializables.push(t)-1}getSerializable(t){return this.serializables[t]}getOther(t){return this.others[t-1]}other(t){return this.others.push(t)}}class dn{constructor(t){this.heap=t,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function mn(t,e,i){return t|e<<16|i<<30}function fn(t,e){return t|e<<30}class _n{constructor(t){if(this.placeholders=[],this.offset=0,this.handle=0,t){let e=t.buffer,i=t.table,n=t.handle
this.heap=new Uint16Array(e),this.table=i,this.offset=this.heap.length,this.handle=n}else this.heap=new Uint16Array(1048576),this.table=[]}push(t){this.heap[this.offset++]=t}getbyaddr(t){return this.heap[t]}setbyaddr(t,e){this.heap[t]=e}malloc(){this.table.push(this.offset,0)
let t=this.handle
return this.handle+=2,t}finishMalloc(t,e){let i=this.table[t],n=mn(this.offset-i,e,0)
this.table[t+1]=n}size(){return this.offset}getaddr(t){return this.table[t]}gethandle(t){this.table.push(t,mn(0,0,3))
let e=this.handle
return this.handle+=2,e}sizeof(t){return-1}scopesizeof(t){return(1073676288&this.table[t+1])>>16}free(t){let e=this.table[t+1]
this.table[t+1]=fn(e,1)}compact(){let t=0,e=this.table,i=this.table.length,n=this.heap
for(let s=0;s<i;s+=2){let i=e[s],o=e[s+1],r=65535&o,a=-1&o
if(2!==a)if(1===a)e[s+1]=fn(o,2),t+=r
else if(0===a){for(let e=i;e<=s+r;e++)n[e-t]=n[e]
e[s]=i-t}else 3===a&&(e[s]=i-t)}this.offset=this.offset-t}pushPlaceholder(t){let e=this.offset++
this.heap[e]=65535,this.placeholders.push([e,t])}patchPlaceholders(){let t=this.placeholders
for(let i=0;i<t.length;i++){var e=t[i]
let n=e[0],s=e[1]
this.setbyaddr(n,s())}}capture(){this.patchPlaceholders()
let t=function(t,e,i){if(t instanceof Uint16Array){if(void 0!==t.slice)return t.slice(e,i).buffer
let n=new Uint16Array(i)
for(;e<i;e++)n[e]=t[e]
return n.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:t}}}class gn{constructor(t=new un,e=new _n){this.constants=t,this.heap=e,this._opcode=new dn(this.heap)}opcode(t){return this._opcode.offset=t,this._opcode}}class vn extends gn{}var yn={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function bn(t,e){let i=t.getSelf(),n=e.capture(),s=n.positional.at(0).value()
return"function"!=typeof s&&function(t,e){let i=function(t){let e,i,n=""
if(null===t||void 0===t)return n
"parent"in t&&"property"in t?(e=t.parent.value(),i=t.property):"_parentValue"in t&&"_propertyKey"in t&&(e=t._parentValue,i=t._propertyKey)
void 0!==i&&(n+=`('${i}' on ${function(t){let e=typeof t
if(null===t||void 0===t)return e
if("number"===e||"boolean"===e)return t.toString()
if(t.debugName)return t.debugName
try{return JSON.stringify(t)}catch(t){}return t.toString()}(e)}) `)
return n}(e)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${i}was ${typeof t} instead of a function.`)}(s,n.positional.at(0)),new Vi(function(...t){let e=n.positional.value()
e.shift(),e.push(...t),s.apply(i&&i.value(),e)})}function wn(t){return t[0]?t[1]:t[2]}class xn{constructor(t){this.resolver=t}getComponentDefinition(t){let i=this.resolver.resolve(t)
return e(!!i,`Couldn't find a template for ${t}`),i}getCapabilities(t){let e=this.getComponentDefinition(t),i=e.manager,n=e.state
return i.getCapabilities(n)}getLayout(t){let e=this.getComponentDefinition(t),i=e.manager.getLayout(e,this.resolver)
return{compile:()=>i.handle,symbolTable:i.symbolTable}}lookupHelper(t,e){return this.resolver.lookupHelper(t,e)}lookupModifier(t,e){return this.resolver.lookupModifier(t,e)}lookupComponentDefinition(t,e){return this.resolver.lookupComponentHandle(t,e)}lookupPartial(t,e){return this.resolver.lookupPartial(t,e)}}class kn{constructor(t){this.resolver=t}async getTemplateIterator(t,e,i,s,o){let r=new rn(t),a={program:new vn(new pn(r)),macros:new Ct,resolver:new xn(r),Builder:Dt}
r.setCompileOptions(a),r.registerTemplate("main",yn),r.registerInternalHelper("action",bn),r.registerHelper("if",wn)
let h=function({id:t,meta:e,block:i}){let s,o=t||`client-${Bi++}`
return{id:o,meta:e,create:(t,r)=>{let a=r?n({},r,e):e
return s||(s=JSON.parse(i)),new Ii(t,{id:o,block:s,referrer:a})}}}(yn).create(a)
return Promise.resolve(h.renderLayout({env:e,builder:i,dynamicScope:s,self:o}))}}class Ln{constructor({element:t,nextSibling:e=null}){this.cursor={element:t,nextSibling:e}}getBuilder(t){return function(t,e){return mi.forInitialRender(t,e)}(t,this.cursor)}}class Sn{render(t){let e
do{e=t.next()}while(!e.done)
this.result=e.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function Pn(t){return void 0!==t.rootName&&void 0!==t.collection&&void 0!==t.name&&void 0!==t.type}function Tn(t){let e=t.type,i=function(t){let e=[]
t.rootName&&e.push(t.rootName)
t.collection&&e.push(t.collection)
t.namespace&&e.push(t.namespace)
t.name&&e.push(t.name)
if(e.length>0){let i=e.join("/")
return Pn(t)&&(i="/"+i),i}}(t)
return i?e+":"+i:e}function En(t){let e={}
if(t.indexOf(":")>-1){var i=t.split(":")
let n,s=i[0],o=i[1]
e.type=s,0===o.indexOf("/")?(n=o.substr(1).split("/"),e.rootName=n.shift(),e.collection=n.shift()):n=o.split("/"),n.length>0&&(e.name=n.pop(),n.length>0&&(e.namespace=n.join("/")))}else e.type=t
return e}function Cn(t,e){if(!e)throw new Error("Assertion Failed: "+t)}class Mn{constructor(t,e){this.config=t,this.registry=e}identify(t,e){if(function(t){var e=t.split(":")
let i=e[0],n=e[1]
return!!(i&&n&&0===n.indexOf("/")&&n.split("/").length>3)}(t))return t
let i,n=En(t)
if(e){let t=En(e)
if(Pn(t)){Cn("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=t.rootName,n.collection=t.collection
let e=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=t.namespace,n.name=t.name,this._serializeAndVerify(n)
if(n.namespace=t.namespace?t.namespace+"/"+t.name:t.name,function(t){let e=t.namespace,i=t.collection,n=e.lastIndexOf("/-")
if(n>-1){n+=2
let t=e.indexOf("/",n)
i=e.slice(n,t>-1?t:void 0)}return i}(n)===e&&(i=this._serializeAndVerify(n)))return i
if(e&&(n.namespace+="/-"+e,i=this._serializeAndVerify(n)))return i
n.rootName=n.collection=n.namespace=void 0}else Cn('Referrer must either be "absolute" or include a `type` to determine the associated type',t.type),n.collection=this._definitiveCollection(t.type),n.namespace||(n.namespace=t.rootName),Cn(`'${t.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Cn(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",i=this._serializeAndVerify(n))return i
n.namespace?(n.rootName=n.namespace,n.namespace=void 0):(n.rootName=n.name,n.name="main")}return(i=this._serializeAndVerify(n))?i:void 0}retrieve(t){return this.registry.get(t)}resolve(t,e){let i=this.identify(t,e)
if(i)return this.retrieve(i)}_definitiveCollection(t){let e=this.config.types[t]
return Cn(`'${t}' is not a recognized type`,e),e.definitiveCollection}_serializeAndVerify(t){let e=Tn(t)
if(this.registry.has(e))return e}}class An{constructor(t={}){this._entries=t}has(t){return t in this._entries}get(t){return this._entries[t]}}"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self
var zn,On=(function(t,e){!function(t){var e=Object.freeze
function i(t){var e,i,n,s
for(i=1,n=arguments.length;i<n;i++)for(e in s=arguments[i])t[e]=s[e]
return t}Object.freeze=function(t){return t}
var n=Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}()
function s(t,e){var i=Array.prototype.slice
if(t.bind)return t.bind.apply(t,i.call(arguments,1))
var n=i.call(arguments,2)
return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}}var o=0
function r(t){return t._leaflet_id=t._leaflet_id||++o,t._leaflet_id}function a(t,e,i){var n,s,o,r
return r=function(){n=!1,s&&(o.apply(i,s),s=!1)},o=function(){n?s=arguments:(t.apply(i,arguments),setTimeout(r,e),n=!0)}}function h(t,e,i){var n=e[1],s=e[0],o=n-s
return t===n&&i?t:((t-s)%o+o)%o+s}function l(){return!1}function u(t,e){var i=Math.pow(10,void 0===e?6:e)
return Math.round(t*i)/i}function c(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function p(t){return c(t).split(/\s+/)}function d(t,e){for(var i in t.hasOwnProperty("options")||(t.options=t.options?n(t.options):{}),e)t.options[i]=e[i]
return t.options}function m(t,e,i){var n=[]
for(var s in t)n.push(encodeURIComponent(i?s.toUpperCase():s)+"="+encodeURIComponent(t[s]))
return(e&&-1!==e.indexOf("?")?"&":"?")+n.join("&")}var f=/\{ *([\w_-]+) *\}/g
function _(t,e){return t.replace(f,function(t,i){var n=e[i]
if(void 0===n)throw new Error("No value provided for variable "+t)
return"function"==typeof n&&(n=n(e)),n})}var g=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}
function v(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i
return-1}var y="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
function b(t){return window["webkit"+t]||window["moz"+t]||window["ms"+t]}var w=0
function x(t){var e=+new Date,i=Math.max(0,16-(e-w))
return w=e+i,window.setTimeout(t,i)}var k=window.requestAnimationFrame||b("RequestAnimationFrame")||x,S=window.cancelAnimationFrame||b("CancelAnimationFrame")||b("CancelRequestAnimationFrame")||function(t){window.clearTimeout(t)}
function P(t,e,i){if(!i||k!==x)return k.call(window,s(t,e))
t.call(e)}function T(t){t&&S.call(window,t)}var E=(Object.freeze||Object)({freeze:e,extend:i,create:n,bind:s,lastId:o,stamp:r,throttle:a,wrapNum:h,falseFn:l,formatNum:u,trim:c,splitWords:p,setOptions:d,getParamString:m,template:_,isArray:g,indexOf:v,emptyImageUrl:y,requestFn:k,cancelFn:S,requestAnimFrame:P,cancelAnimFrame:T})
function C(){}C.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},s=e.__super__=this.prototype,o=n(s)
for(var r in o.constructor=e,e.prototype=o,this)this.hasOwnProperty(r)&&"prototype"!==r&&"__super__"!==r&&(e[r]=this[r])
return t.statics&&(i(e,t.statics),delete t.statics),t.includes&&(function(t){if("undefined"!=typeof L&&L&&L.Mixin){t=g(t)?t:[t]
for(var e=0;e<t.length;e++)t[e]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",(new Error).stack)}}(t.includes),i.apply(null,[o].concat(t.includes)),delete t.includes),o.options&&(t.options=i(n(o.options),t.options)),i(o,t),o._initHooks=[],o.callInitHooks=function(){if(!this._initHooksCalled){s.callInitHooks&&s.callInitHooks.call(this),this._initHooksCalled=!0
for(var t=0,e=o._initHooks.length;t<e;t++)o._initHooks[t].call(this)}},e},C.include=function(t){return i(this.prototype,t),this},C.mergeOptions=function(t){return i(this.prototype.options,t),this},C.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)}
return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this}
var M={on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e)
else for(var s=0,o=(t=p(t)).length;s<o;s++)this._on(t[s],e,i)
return this},off:function(t,e,i){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],e)
else for(var s=0,o=(t=p(t)).length;s<o;s++)this._off(t[s],e,i)
else delete this._events
return this},_on:function(t,e,i){this._events=this._events||{}
var n=this._events[t]
n||(n=[],this._events[t]=n),i===this&&(i=void 0)
for(var s={fn:e,ctx:i},o=n,r=0,a=o.length;r<a;r++)if(o[r].fn===e&&o[r].ctx===i)return
o.push(s)},_off:function(t,e,i){var n,s,o
if(this._events&&(n=this._events[t]))if(e){if(i===this&&(i=void 0),n)for(s=0,o=n.length;s<o;s++){var r=n[s]
if(r.ctx===i&&r.fn===e)return r.fn=l,this._firingCount&&(this._events[t]=n=n.slice()),void n.splice(s,1)}}else{for(s=0,o=n.length;s<o;s++)n[s].fn=l
delete this._events[t]}},fire:function(t,e,n){if(!this.listens(t,n))return this
var s=i({},e,{type:t,target:this,sourceTarget:e&&e.sourceTarget||this})
if(this._events){var o=this._events[t]
if(o){this._firingCount=this._firingCount+1||1
for(var r=0,a=o.length;r<a;r++){var h=o[r]
h.fn.call(h.ctx||this,s)}this._firingCount--}}return n&&this._propagateEvent(s),this},listens:function(t,e){var i=this._events&&this._events[t]
if(i&&i.length)return!0
if(e)for(var n in this._eventParents)if(this._eventParents[n].listens(t,e))return!0
return!1},once:function(t,e,i){if("object"==typeof t){for(var n in t)this.once(n,t[n],e)
return this}var o=s(function(){this.off(t,e,i).off(t,o,i)},this)
return this.on(t,e,i).on(t,o,i)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[r(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[r(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,i({layer:t.target,propagatedFrom:t.target},t),!0)}}
M.addEventListener=M.on,M.removeEventListener=M.clearAllEventListeners=M.off,M.addOneTimeEventListener=M.once,M.fireEvent=M.fire,M.hasEventListeners=M.listens
var A=C.extend(M)
function z(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e}var O=Math.trunc||function(t){return t>0?Math.floor(t):Math.ceil(t)}
function B(t,e,i){return t instanceof z?t:g(t)?new z(t[0],t[1]):void 0===t||null===t?t:"object"==typeof t&&"x"in t&&"y"in t?new z(t.x,t.y):new z(t,e,i)}function I(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}function N(t,e){return!t||t instanceof I?t:new I(t,e)}function R(t,e){if(t)for(var i=e?[t,e]:t,n=0,s=i.length;n<s;n++)this.extend(i[n])}function Z(t,e){return t instanceof R?t:new R(t,e)}function D(t,e,i){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")")
this.lat=+t,this.lng=+e,void 0!==i&&(this.alt=+i)}function j(t,e,i){return t instanceof D?t:g(t)&&"object"!=typeof t[0]?3===t.length?new D(t[0],t[1],t[2]):2===t.length?new D(t[0],t[1]):null:void 0===t||null===t?t:"object"==typeof t&&"lat"in t?new D(t.lat,"lng"in t?t.lng:t.lon,t.alt):void 0===e?null:new D(t,e,i)}z.prototype={clone:function(){return new z(this.x,this.y)},add:function(t){return this.clone()._add(B(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(B(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new z(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new z(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=O(this.x),this.y=O(this.y),this},distanceTo:function(t){var e=(t=B(t)).x-this.x,i=t.y-this.y
return Math.sqrt(e*e+i*i)},equals:function(t){return(t=B(t)).x===this.x&&t.y===this.y},contains:function(t){return t=B(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+u(this.x)+", "+u(this.y)+")"}},I.prototype={extend:function(t){return t=B(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new z((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new z(this.min.x,this.max.y)},getTopRight:function(){return new z(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i
return(t="number"==typeof t[0]||t instanceof z?B(t):N(t))instanceof I?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=N(t)
var e=this.min,i=this.max,n=t.min,s=t.max,o=s.x>=e.x&&n.x<=i.x,r=s.y>=e.y&&n.y<=i.y
return o&&r},overlaps:function(t){t=N(t)
var e=this.min,i=this.max,n=t.min,s=t.max,o=s.x>e.x&&n.x<i.x,r=s.y>e.y&&n.y<i.y
return o&&r},isValid:function(){return!(!this.min||!this.max)}},R.prototype={extend:function(t){var e,i,n=this._southWest,s=this._northEast
if(t instanceof D)e=t,i=t
else{if(!(t instanceof R))return t?this.extend(j(t)||Z(t)):this
if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||s?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),s.lat=Math.max(i.lat,s.lat),s.lng=Math.max(i.lng,s.lng)):(this._southWest=new D(e.lat,e.lng),this._northEast=new D(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t
return new R(new D(e.lat-n,e.lng-s),new D(i.lat+n,i.lng+s))},getCenter:function(){return new D((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new D(this.getNorth(),this.getWest())},getSouthEast:function(){return new D(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof D||"lat"in t?j(t):Z(t)
var e,i,n=this._southWest,s=this._northEast
return t instanceof R?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=Z(t)
var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),o=s.lat>=e.lat&&n.lat<=i.lat,r=s.lng>=e.lng&&n.lng<=i.lng
return o&&r},overlaps:function(t){t=Z(t)
var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),o=s.lat>e.lat&&n.lat<i.lat,r=s.lng>e.lng&&n.lng<i.lng
return o&&r},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t,e){return!!t&&(t=Z(t),this._southWest.equals(t.getSouthWest(),e)&&this._northEast.equals(t.getNorthEast(),e))},isValid:function(){return!(!this._southWest||!this._northEast)}},D.prototype={equals:function(t,e){if(!t)return!1
t=j(t)
var i=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng))
return i<=(void 0===e?1e-9:e)},toString:function(t){return"LatLng("+u(this.lat,t)+", "+u(this.lng,t)+")"},distanceTo:function(t){return V.distance(this,j(t))},wrap:function(){return V.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat)
return Z([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new D(this.lat,this.lng,this.alt)}}
var F,H={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e)
return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i)
return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null
var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i)
return new I(n,s)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?h(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?h(t.lat,this.wrapLat,!0):t.lat,n=t.alt
return new D(i,e,n)},wrapLatLngBounds:function(t){var e=t.getCenter(),i=this.wrapLatLng(e),n=e.lat-i.lat,s=e.lng-i.lng
if(0===n&&0===s)return t
var o=t.getSouthWest(),r=t.getNorthEast(),a=new D(o.lat-n,o.lng-s),h=new D(r.lat-n,r.lng-s)
return new R(a,h)}},V=i({},H,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,s=e.lat*i,o=Math.sin((e.lat-t.lat)*i/2),r=Math.sin((e.lng-t.lng)*i/2),a=o*o+Math.cos(n)*Math.cos(s)*r*r,h=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
return this.R*h}}),U={R:6378137,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e)
return new z(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI
return new D((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:(F=6378137*Math.PI,new I([-F,-F],[F,F]))}
function W(t,e,i,n){if(g(t))return this._a=t[0],this._b=t[1],this._c=t[2],void(this._d=t[3])
this._a=t,this._b=e,this._c=i,this._d=n}function G(t,e,i,n){return new W(t,e,i,n)}W.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new z((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}}
var q=i({},V,{code:"EPSG:3857",projection:U,transformation:function(){var t=.5/(Math.PI*U.R)
return G(t,.5,-t,.5)}()}),$=i({},q,{code:"EPSG:900913"})
function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function K(t,e){var i,n,s,o,r,a,h=""
for(i=0,s=t.length;i<s;i++){for(r=t[i],n=0,o=r.length;n<o;n++)a=r[n],h+=(n?"L":"M")+a.x+" "+a.y
h+=e?Tt?"z":"x":""}return h||"M0 0"}var J=document.documentElement.style,X="ActiveXObject"in window,Q=X&&!document.addEventListener,tt="msLaunchUri"in navigator&&!("documentMode"in document),et=Ct("webkit"),it=Ct("android"),nt=Ct("android 2")||Ct("android 3"),st=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),ot=it&&Ct("Google")&&st<537&&!("AudioNode"in window),rt=!!window.opera,at=Ct("chrome"),ht=Ct("gecko")&&!et&&!rt&&!X,lt=!at&&Ct("safari"),ut=Ct("phantom"),ct="OTransition"in J,pt=0===navigator.platform.indexOf("Win"),dt=X&&"transition"in J,mt="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!nt,ft="MozPerspective"in J,_t=!window.L_DISABLE_3D&&(dt||mt||ft)&&!ct&&!ut,gt="undefined"!=typeof orientation||Ct("mobile"),vt=gt&&et,yt=gt&&mt,bt=!window.PointerEvent&&window.MSPointerEvent,wt=!(!window.PointerEvent&&!bt),xt=!window.L_NO_TOUCH&&(wt||"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),kt=gt&&rt,Lt=gt&&ht,St=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,Pt=!!document.createElement("canvas").getContext,Tt=!(!document.createElementNS||!Y("svg").createSVGRect),Et=!Tt&&function(){try{var t=document.createElement("div")
t.innerHTML='<v:shape adj="1"/>'
var e=t.firstChild
return e.style.behavior="url(#default#VML)",e&&"object"==typeof e.adj}catch(t){return!1}}()
function Ct(t){return navigator.userAgent.toLowerCase().indexOf(t)>=0}var Mt=(Object.freeze||Object)({ie:X,ielt9:Q,edge:tt,webkit:et,android:it,android23:nt,androidStock:ot,opera:rt,chrome:at,gecko:ht,safari:lt,phantom:ut,opera12:ct,win:pt,ie3d:dt,webkit3d:mt,gecko3d:ft,any3d:_t,mobile:gt,mobileWebkit:vt,mobileWebkit3d:yt,msPointer:bt,pointer:wt,touch:xt,mobileOpera:kt,mobileGecko:Lt,retina:St,canvas:Pt,svg:Tt,vml:Et}),At=bt?"MSPointerDown":"pointerdown",zt=bt?"MSPointerMove":"pointermove",Ot=bt?"MSPointerUp":"pointerup",Bt=bt?"MSPointerCancel":"pointercancel",It=["INPUT","SELECT","OPTION"],Nt={},Rt=!1,Zt=0
function Dt(t,e,i,n){return"touchstart"===e?function(t,e,i){var n=s(function(t){if("mouse"!==t.pointerType&&t.MSPOINTER_TYPE_MOUSE&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE){if(!(It.indexOf(t.target.tagName)<0))return
ne(t)}Vt(t,e)})
t["_leaflet_touchstart"+i]=n,t.addEventListener(At,n,!1),Rt||(document.documentElement.addEventListener(At,jt,!0),document.documentElement.addEventListener(zt,Ft,!0),document.documentElement.addEventListener(Ot,Ht,!0),document.documentElement.addEventListener(Bt,Ht,!0),Rt=!0)}(t,i,n):"touchmove"===e?function(t,e,i){var n=function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&Vt(t,e)}
t["_leaflet_touchmove"+i]=n,t.addEventListener(zt,n,!1)}(t,i,n):"touchend"===e&&function(t,e,i){var n=function(t){Vt(t,e)}
t["_leaflet_touchend"+i]=n,t.addEventListener(Ot,n,!1),t.addEventListener(Bt,n,!1)}(t,i,n),this}function jt(t){Nt[t.pointerId]=t,Zt++}function Ft(t){Nt[t.pointerId]&&(Nt[t.pointerId]=t)}function Ht(t){delete Nt[t.pointerId],Zt--}function Vt(t,e){for(var i in t.touches=[],Nt)t.touches.push(Nt[i])
t.changedTouches=[t],e(t)}var Ut=bt?"MSPointerDown":wt?"pointerdown":"touchstart",Wt=bt?"MSPointerUp":wt?"pointerup":"touchend",Gt="_leaflet_"
function qt(t,e,i){var n,s,o=!1,r=250
function a(t){var e
if(wt){if(!tt||"mouse"===t.pointerType)return
e=Zt}else e=t.touches.length
if(!(e>1)){var i=Date.now(),a=i-(n||i)
s=t.touches?t.touches[0]:t,o=a>0&&a<=r,n=i}}function h(t){if(o&&!s.cancelBubble){if(wt){if(!tt||"mouse"===t.pointerType)return
var i,r,a={}
for(r in s)i=s[r],a[r]=i&&i.bind?i.bind(s):i
s=a}s.type="dblclick",e(s),n=null}}return t[Gt+Ut+i]=a,t[Gt+Wt+i]=h,t[Gt+"dblclick"+i]=e,t.addEventListener(Ut,a,!1),t.addEventListener(Wt,h,!1),t.addEventListener("dblclick",e,!1),this}function $t(t,e){var i=t[Gt+Ut+e],n=t[Gt+Wt+e],s=t[Gt+"dblclick"+e]
return t.removeEventListener(Ut,i,!1),t.removeEventListener(Wt,n,!1),tt||t.removeEventListener("dblclick",s,!1),this}function Yt(t,e,i,n){if("object"==typeof e)for(var s in e)Xt(t,s,e[s],i)
else for(var o=0,r=(e=p(e)).length;o<r;o++)Xt(t,e[o],i,n)
return this}var Kt="_leaflet_events"
function Jt(t,e,i,n){if("object"==typeof e)for(var s in e)Qt(t,s,e[s],i)
else if(e)for(var o=0,r=(e=p(e)).length;o<r;o++)Qt(t,e[o],i,n)
else{for(var a in t[Kt])Qt(t,a,t[Kt][a])
delete t[Kt]}return this}function Xt(t,e,i,n){var s=e+r(i)+(n?"_"+r(n):"")
if(t[Kt]&&t[Kt][s])return this
var o=function(e){return i.call(n||t,e||window.event)},a=o
wt&&0===e.indexOf("touch")?Dt(t,e,o,s):!xt||"dblclick"!==e||!qt||wt&&at?"addEventListener"in t?"mousewheel"===e?t.addEventListener("onwheel"in t?"wheel":"mousewheel",o,!1):"mouseenter"===e||"mouseleave"===e?(o=function(e){e=e||window.event,pe(t,e)&&a(e)},t.addEventListener("mouseenter"===e?"mouseover":"mouseout",o,!1)):("click"===e&&it&&(o=function(t){(function(t,e){var i=t.timeStamp||t.originalEvent&&t.originalEvent.timeStamp,n=he&&i-he
n&&n>100&&n<500||t.target._simulatedClick&&!t._simulated?se(t):(he=i,e(t))})(t,a)}),t.addEventListener(e,o,!1)):"attachEvent"in t&&t.attachEvent("on"+e,o):qt(t,o,s),t[Kt]=t[Kt]||{},t[Kt][s]=o}function Qt(t,e,i,n){var s=e+r(i)+(n?"_"+r(n):""),o=t[Kt]&&t[Kt][s]
if(!o)return this
wt&&0===e.indexOf("touch")?function(t,e,i){var n=t["_leaflet_"+e+i]
"touchstart"===e?t.removeEventListener(At,n,!1):"touchmove"===e?t.removeEventListener(zt,n,!1):"touchend"===e&&(t.removeEventListener(Ot,n,!1),t.removeEventListener(Bt,n,!1))}(t,e,s):!xt||"dblclick"!==e||!$t||wt&&at?"removeEventListener"in t?"mousewheel"===e?t.removeEventListener("onwheel"in t?"wheel":"mousewheel",o,!1):t.removeEventListener("mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,o,!1):"detachEvent"in t&&t.detachEvent("on"+e,o):$t(t,s),t[Kt][s]=null}function te(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,ce(t),this}function ee(t){return Xt(t,"mousewheel",te),this}function ie(t){return Yt(t,"mousedown touchstart dblclick",te),Xt(t,"click",ue),this}function ne(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this}function se(t){return ne(t),te(t),this}function oe(t,e){if(!e)return new z(t.clientX,t.clientY)
var i=e.getBoundingClientRect(),n=i.width/e.offsetWidth||1,s=i.height/e.offsetHeight||1
return new z(t.clientX/n-i.left-e.clientLeft,t.clientY/s-i.top-e.clientTop)}var re=pt&&at?2*window.devicePixelRatio:ht?window.devicePixelRatio:1
function ae(t){return tt?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/re:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0}var he,le={}
function ue(t){le[t.type]=!0}function ce(t){var e=le[t.type]
return le[t.type]=!1,e}function pe(t,e){var i=e.relatedTarget
if(!i)return!0
try{for(;i&&i!==t;)i=i.parentNode}catch(t){return!1}return i!==t}var de,me,fe,_e,ge,ve=(Object.freeze||Object)({on:Yt,off:Jt,stopPropagation:te,disableScrollPropagation:ee,disableClickPropagation:ie,preventDefault:ne,stop:se,getMousePosition:oe,getWheelDelta:ae,fakeStop:ue,skipped:ce,isExternalTarget:pe,addListener:Yt,removeListener:Jt}),ye=Ie(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]),be=Ie(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),we="webkitTransition"===be||"OTransition"===be?be+"End":"transitionend"
function xe(t){return"string"==typeof t?document.getElementById(t):t}function ke(t,e){var i=t.style[e]||t.currentStyle&&t.currentStyle[e]
if((!i||"auto"===i)&&document.defaultView){var n=document.defaultView.getComputedStyle(t,null)
i=n?n[e]:null}return"auto"===i?null:i}function Le(t,e,i){var n=document.createElement(t)
return n.className=e||"",i&&i.appendChild(n),n}function Se(t){var e=t.parentNode
e&&e.removeChild(t)}function Pe(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function Te(t){var e=t.parentNode
e.lastChild!==t&&e.appendChild(t)}function Ee(t){var e=t.parentNode
e.firstChild!==t&&e.insertBefore(t,e.firstChild)}function Ce(t,e){if(void 0!==t.classList)return t.classList.contains(e)
var i=Oe(t)
return i.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(i)}function Me(t,e){if(void 0!==t.classList)for(var i=p(e),n=0,s=i.length;n<s;n++)t.classList.add(i[n])
else if(!Ce(t,e)){var o=Oe(t)
ze(t,(o?o+" ":"")+e)}}function Ae(t,e){void 0!==t.classList?t.classList.remove(e):ze(t,c((" "+Oe(t)+" ").replace(" "+e+" "," ")))}function ze(t,e){void 0===t.className.baseVal?t.className=e:t.className.baseVal=e}function Oe(t){return void 0===t.className.baseVal?t.className:t.className.baseVal}function Be(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&function(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha"
try{i=t.filters.item(n)}catch(t){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"}(t,e)}function Ie(t){for(var e=document.documentElement.style,i=0;i<t.length;i++)if(t[i]in e)return t[i]
return!1}function Ne(t,e,i){var n=e||new z(0,0)
t.style[ye]=(dt?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")}function Re(t,e){t._leaflet_pos=e,_t?Ne(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")}function Ze(t){return t._leaflet_pos||new z(0,0)}if("onselectstart"in document)de=function(){Yt(window,"selectstart",ne)},me=function(){Jt(window,"selectstart",ne)}
else{var De=Ie(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"])
de=function(){if(De){var t=document.documentElement.style
fe=t[De],t[De]="none"}},me=function(){De&&(document.documentElement.style[De]=fe,fe=void 0)}}function je(){Yt(window,"dragstart",ne)}function Fe(){Jt(window,"dragstart",ne)}function He(t){for(;-1===t.tabIndex;)t=t.parentNode
t.style&&(Ve(),_e=t,ge=t.style.outline,t.style.outline="none",Yt(window,"keydown",Ve))}function Ve(){_e&&(_e.style.outline=ge,_e=void 0,ge=void 0,Jt(window,"keydown",Ve))}var Ue=(Object.freeze||Object)({TRANSFORM:ye,TRANSITION:be,TRANSITION_END:we,get:xe,getStyle:ke,create:Le,remove:Se,empty:Pe,toFront:Te,toBack:Ee,hasClass:Ce,addClass:Me,removeClass:Ae,setClass:ze,getClass:Oe,setOpacity:Be,testProp:Ie,setTransform:Ne,setPosition:Re,getPosition:Ze,disableTextSelection:de,enableTextSelection:me,disableImageDrag:je,enableImageDrag:Fe,preventOutline:He,restoreOutline:Ve}),We=A.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=Ze(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=P(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration
e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t))
e&&i._round(),Re(this._el,i),this.fire("step")},_complete:function(){T(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),Ge=A.extend({options:{crs:q,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=d(this,e),this._initContainer(t),this._initLayout(),this._onResize=s(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),void 0!==e.zoom&&(this._zoom=this._limitZoom(e.zoom)),e.center&&void 0!==e.zoom&&this.setView(j(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._zoomAnimated=be&&_t&&!kt&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),Yt(this._proxy,we,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){if(e=void 0===e?this._zoom:this._limitZoom(e),t=this._limitCenter(j(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&!0!==n){void 0!==n.animate&&(n.zoom=i({animate:n.animate},n.zoom),n.pan=i({animate:n.animate,duration:n.duration},n.pan))
var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan)
if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(_t?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(_t?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),o=t instanceof z?t:this.latLngToContainerPoint(t),r=o.subtract(s).multiplyBy(1-1/n),a=this.containerPointToLatLng(s.add(r))
return this.setView(a,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():Z(t)
var i=B(e.paddingTopLeft||e.padding||[0,0]),n=B(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n))
if((s="number"==typeof e.maxZoom?Math.min(e.maxZoom,s):s)===1/0)return{center:t.getCenter(),zoom:s}
var o=n.subtract(i).divideBy(2),r=this.project(t.getSouthWest(),s),a=this.project(t.getNorthEast(),s),h=this.unproject(r.add(a).divideBy(2).add(o),s)
return{center:h,zoom:s}},fitBounds:function(t,e){if(!(t=Z(t)).isValid())throw new Error("Bounds are not valid.")
var i=this._getBoundsCenterZoom(t,e)
return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=B(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend")
if(!0!==e.animate&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this
if(this._panAnim||(this._panAnim=new We,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),!1!==e.animate){Me(this._mapPane,"leaflet-pan-anim")
var i=this._getMapPanePos().subtract(t).round()
this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend")
return this},flyTo:function(t,e,i){if(!1===(i=i||{}).animate||!_t)return this.setView(t,e,i)
this._stop()
var n=this.project(this.getCenter()),s=this.project(t),o=this.getSize(),r=this._zoom
t=j(t),e=void 0===e?r:e
var a=Math.max(o.x,o.y),h=a*this.getZoomScale(r,e),l=s.distanceTo(n)||1,u=1.42,c=u*u
function p(t){var e=t?-1:1,i=t?h:a,n=h*h-a*a+e*c*c*l*l,s=2*i*c*l,o=n/s,r=Math.sqrt(o*o+1)-o,u=r<1e-9?-18:Math.log(r)
return u}function d(t){return(Math.exp(t)-Math.exp(-t))/2}function m(t){return(Math.exp(t)+Math.exp(-t))/2}var f=p(0)
function _(t){return a*(m(f)*(d(e=f+u*t)/m(e))-d(f))/c
var e}var g=Date.now(),v=(p(1)-f)/u,y=i.duration?1e3*i.duration:1e3*v*.8
return this._moveStart(!0,i.noMoveStart),function i(){var o=(Date.now()-g)/y,h=function(t){return 1-Math.pow(1-t,1.5)}(o)*v
o<=1?(this._flyToFrame=P(i,this),this._move(this.unproject(n.add(s.subtract(n).multiplyBy(_(h)/l)),r),this.getScaleZoom(a/function(t){return a*(m(f)/m(f+u*t))}(h),r),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e)
return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return(t=Z(t)).isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){var e=this.options.minZoom
return this.options.minZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(t):this},setMaxZoom:function(t){var e=this.options.maxZoom
return this.options.maxZoom=t,this._loaded&&e!==t&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0
var i=this.getCenter(),n=this._limitCenter(i,this._zoom,Z(t))
return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},invalidateSize:function(t){if(!this._loaded)return this
t=i({animate:!1,pan:!0},!0===t?{animate:!0}:t)
var e=this.getSize()
this._sizeChanged=!0,this._lastCenter=null
var n=this.getSize(),o=e.divideBy(2).round(),r=n.divideBy(2).round(),a=o.subtract(r)
return a.x||a.y?(t.animate&&t.pan?this.panBy(a):(t.pan&&this._rawPanBy(a),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(s(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:n})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=i({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this
var e=s(this._handleGeolocationResponse,this),n=s(this._handleGeolocationError,this)
return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,n,t):navigator.geolocation.getCurrentPosition(e,n,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout")
this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new D(e,i),s=n.toBounds(t.coords.accuracy),o=this._locateOptions
if(o.setView){var r=this.getBoundsZoom(s)
this.setView(n,o.maxZoom?Math.min(r,o.maxZoom):r)}var a={latlng:n,bounds:s,timestamp:t.timestamp}
for(var h in t.coords)"number"==typeof t.coords[h]&&(a[h]=t.coords[h])
this.fire("locationfound",a)},addHandler:function(t,e){if(!e)return this
var i=this[t]=new e(this)
return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance")
try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=void 0,this._containerId=void 0}var t
for(t in void 0!==this._locationWatchId&&this.stopLocate(),this._stop(),Se(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload"),this._layers)this._layers[t].remove()
for(t in this._panes)Se(this._panes[t])
return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=Le("div",i,e||this._mapPane)
return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight())
return new R(e,i)},getMinZoom:function(){return void 0===this.options.minZoom?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return void 0===this.options.maxZoom?void 0===this._layersMaxZoom?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=Z(t),i=B(i||[0,0])
var n=this.getZoom()||0,s=this.getMinZoom(),o=this.getMaxZoom(),r=t.getNorthWest(),a=t.getSouthEast(),h=this.getSize().subtract(i),l=N(this.project(a,n),this.project(r,n)).getSize(),u=_t?this.options.zoomSnap:1,c=h.x/l.x,p=h.y/l.y,d=e?Math.max(c,p):Math.min(c,p)
return n=this.getScaleZoom(d,n),u&&(n=Math.round(n/(u/100))*(u/100),n=e?Math.ceil(n/u)*u:Math.floor(n/u)*u),Math.max(s,Math.min(o,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new z(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e)
return new I(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(void 0===t?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var i=this.options.crs
return e=void 0===e?this._zoom:e,i.scale(t)/i.scale(e)},getScaleZoom:function(t,e){var i=this.options.crs
e=void 0===e?this._zoom:e
var n=i.zoom(t*i.scale(e))
return isNaN(n)?1/0:n},project:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.latLngToPoint(j(t),e)},unproject:function(t,e){return e=void 0===e?this._zoom:e,this.options.crs.pointToLatLng(B(t),e)},layerPointToLatLng:function(t){var e=B(t).add(this.getPixelOrigin())
return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(j(t))._round()
return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(j(t))},wrapLatLngBounds:function(t){return this.options.crs.wrapLatLngBounds(Z(t))},distance:function(t,e){return this.options.crs.distance(j(t),j(e))},containerPointToLayerPoint:function(t){return B(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return B(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(B(t))
return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(j(t)))},mouseEventToContainerPoint:function(t){return oe(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=xe(t)
if(!e)throw new Error("Map container not found.")
if(e._leaflet_id)throw new Error("Map container is already initialized.")
Yt(e,"scroll",this._onScroll,this),this._containerId=r(e)},_initLayout:function(){var t=this._container
this._fadeAnimated=this.options.fadeAnimation&&_t,Me(t,"leaflet-container"+(xt?" leaflet-touch":"")+(St?" leaflet-retina":"")+(Q?" leaflet-oldie":"")+(lt?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""))
var e=ke(t,"position")
"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={}
this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Re(this._mapPane,new z(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Me(t.markerPane,"leaflet-zoom-hide"),Me(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e){Re(this._mapPane,new z(0,0))
var i=!this._loaded
this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset")
var n=this._zoom!==e
this._moveStart(n,!1)._move(t,e)._moveEnd(n),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(t,e){return t&&this.fire("zoomstart"),e||this.fire("movestart"),this},_move:function(t,e,i){void 0===e&&(e=this._zoom)
var n=this._zoom!==e
return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(n||i&&i.pinch)&&this.fire("zoom",i),this.fire("move",i)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return T(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){Re(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(t){this._targets={},this._targets[r(this._container)]=this
var e=t?Jt:Yt
e(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&e(window,"resize",this._onResize,this),_t&&this.options.transform3DLimit&&(t?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){T(this._resizeRequest),this._resizeRequest=P(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos()
Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],s="mouseout"===e||"mouseover"===e,o=t.target||t.srcElement,a=!1;o;){if((i=this._targets[r(o)])&&("click"===e||"preclick"===e)&&!t._simulated&&this._draggableMoved(i)){a=!0
break}if(i&&i.listens(e,!0)){if(s&&!pe(o,t))break
if(n.push(i),s)break}if(o===this._container)break
o=o.parentNode}return n.length||a||s||!pe(o,t)||(n=[this]),n},_handleDOMEvent:function(t){if(this._loaded&&!ce(t)){var e=t.type
"mousedown"!==e&&"keypress"!==e||He(t.target||t.srcElement),this._fireDOMEvent(t,e)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(t,e,n){if("click"===t.type){var s=i({},t)
s.type="preclick",this._fireDOMEvent(s,s.type,n)}if(!t._stopped&&(n=(n||[]).concat(this._findEventTargets(t,e))).length){var o=n[0]
"contextmenu"===e&&o.listens(e,!0)&&ne(t)
var r={originalEvent:t}
if("keypress"!==t.type){var a=o.getLatLng&&(!o._radius||o._radius<=10)
r.containerPoint=a?this.latLngToContainerPoint(o.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=a?o.getLatLng():this.layerPointToLatLng(r.layerPoint)}for(var h=0;h<n.length;h++)if(n[h].fire(e,r,!0),r.originalEvent._stopped||!1===n[h].options.bubblingMouseEvents&&-1!==v(this._mouseEvents,e))return}},_draggableMoved:function(t){return(t=t.dragging&&t.dragging.enabled()?t:this).dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return Ze(this._mapPane)||new z(0,0)},_moved:function(){var t=this._getMapPanePos()
return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var i=t&&void 0!==e?this._getNewPixelOrigin(t,e):this.getPixelOrigin()
return i.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2)
return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e)
return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e)
return N([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t
var n=this.project(t,e),s=this.getSize().divideBy(2),o=new I(n.subtract(s),n.add(s)),r=this._getBoundsOffset(o,i,e)
return r.round().equals([0,0])?t:this.unproject(n.add(r),e)},_limitOffset:function(t,e){if(!e)return t
var i=this.getPixelBounds(),n=new I(i.min.add(t),i.max.add(t))
return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=N(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),o=n.max.subtract(t.max),r=this._rebound(s.x,-o.x),a=this._rebound(s.y,-o.y)
return new z(r,a)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=_t?this.options.zoomSnap:1
return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Ae(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._trunc()
return!(!0!==(e&&e.animate)&&!this.getSize().contains(i)||(this.panBy(i,e),0))},_createAnimProxy:function(){var t=this._proxy=Le("div","leaflet-proxy leaflet-zoom-animated")
this._panes.mapPane.appendChild(t),this.on("zoomanim",function(t){var e=ye,i=this._proxy.style[e]
Ne(this._proxy,this.project(t.center,t.zoom),this.getZoomScale(t.zoom,1)),i===this._proxy.style[e]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var t=this.getCenter(),e=this.getZoom()
Ne(this._proxy,this.project(t,e),this.getZoomScale(e,1))},this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){Se(this._proxy),delete this._proxy},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0
if(i=i||{},!this._zoomAnimated||!1===i.animate||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1
var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n)
return!(!0!==i.animate&&!this.getSize().contains(s)||(P(function(){this._moveStart(!0,!1)._animateZoom(t,e,!0)},this),0))},_animateZoom:function(t,e,i,n){this._mapPane&&(i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,Me(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),setTimeout(s(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ae(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),P(function(){this._moveEnd(!0)},this))}}),qe=C.extend({options:{position:"topright"},initialize:function(t){d(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map
return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t
var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i]
return Me(e,"leaflet-control"),-1!==i.indexOf("bottom")?n.insertBefore(e,n.firstChild):n.appendChild(e),this},remove:function(){return this._map?(Se(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),$e=function(t){return new qe(t)}
Ge.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){var t=this._controlCorners={},e="leaflet-",i=this._controlContainer=Le("div",e+"control-container",this._container)
function n(n,s){var o=e+n+" "+e+s
t[n+s]=Le("div",o,i)}n("top","left"),n("top","right"),n("bottom","left"),n("bottom","right")},_clearControlPos:function(){for(var t in this._controlCorners)Se(this._controlCorners[t])
Se(this._controlContainer),delete this._controlCorners,delete this._controlContainer}})
var Ye=qe.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){for(var n in d(this,i),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,t)this._addLayer(t[n],n)
for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this)
for(var e=0;e<this._layers.length;e++)this._layers[e].layer.on("add remove",this._onLayerChange,this)
return this._container},addTo:function(t){return qe.prototype.addTo.call(this,t),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this)
for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this)
var e=this._getLayer(r(t))
return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){Me(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null
var t=this._map.getSize().y-(this._container.offsetTop+50)
return t<this._form.clientHeight?(Me(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):Ae(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Ae(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=Le("div",t),i=this.options.collapsed
e.setAttribute("aria-haspopup",!0),ie(e),ee(e)
var n=this._form=Le("form",t+"-list")
i&&(this._map.on("click",this.collapse,this),it||Yt(e,{mouseenter:this.expand,mouseleave:this.collapse},this))
var s=this._layersLink=Le("a",t+"-toggle",e)
s.href="#",s.title="Layers",xt?(Yt(s,"click",se),Yt(s,"click",this.expand,this)):Yt(s,"focus",this.expand,this),i||this.expand(),this._baseLayersList=Le("div",t+"-base",n),this._separator=Le("div",t+"-separator",n),this._overlaysList=Le("div",t+"-overlays",n),e.appendChild(n)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&r(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){this._map&&t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(s(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this
Pe(this._baseLayersList),Pe(this._overlaysList),this._layerControlInputs=[]
var t,e,i,n,s=0
for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1
return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update()
var e=this._getLayer(r(t.target)),i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null
i&&this._map.fire(i,e)},_createRadioElement:function(t,e){var i='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(e?' checked="checked"':"")+"/>",n=document.createElement("div")
return n.innerHTML=i,n.firstChild},_addItem:function(t){var e,i=document.createElement("label"),n=this._map.hasLayer(t.layer)
t.overlay?((e=document.createElement("input")).type="checkbox",e.className="leaflet-control-layers-selector",e.defaultChecked=n):e=this._createRadioElement("leaflet-base-layers",n),this._layerControlInputs.push(e),e.layerId=r(t.layer),Yt(e,"click",this._onInputClick,this)
var s=document.createElement("span")
s.innerHTML=" "+t.name
var o=document.createElement("div")
i.appendChild(o),o.appendChild(e),o.appendChild(s)
var a=t.overlay?this._overlaysList:this._baseLayersList
return a.appendChild(i),this._checkDisabledLayers(),i},_onInputClick:function(){var t,e,i=this._layerControlInputs,n=[],s=[]
this._handlingClick=!0
for(var o=i.length-1;o>=0;o--)t=i[o],e=this._getLayer(t.layerId).layer,t.checked?n.push(e):t.checked||s.push(e)
for(o=0;o<s.length;o++)this._map.hasLayer(s[o])&&this._map.removeLayer(s[o])
for(o=0;o<n.length;o++)this._map.hasLayer(n[o])||this._map.addLayer(n[o])
this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,e,i=this._layerControlInputs,n=this._map.getZoom(),s=i.length-1;s>=0;s--)t=i[s],e=this._getLayer(t.layerId).layer,t.disabled=void 0!==e.options.minZoom&&n<e.options.minZoom||void 0!==e.options.maxZoom&&n>e.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),Ke=qe.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"&#x2212;",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=Le("div",e+" leaflet-bar"),n=this.options
return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,s){var o=Le("a",i,n)
return o.innerHTML=t,o.href="#",o.title=e,o.setAttribute("role","button"),o.setAttribute("aria-label",e),ie(o),Yt(o,"click",se),Yt(o,"click",s,this),Yt(o,"click",this._refocusOnMap,this),o},_updateDisabled:function(){var t=this._map,e="leaflet-disabled"
Ae(this._zoomInButton,e),Ae(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMinZoom())&&Me(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMaxZoom())&&Me(this._zoomInButton,e)}})
Ge.mergeOptions({zoomControl:!0}),Ge.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ke,this.addControl(this.zoomControl))})
var Je=qe.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e=Le("div","leaflet-control-scale"),i=this.options
return this._addScales(i,"leaflet-control-scale-line",e),t.on(i.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),e},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=Le("div",e,i)),t.imperial&&(this._iScale=Le("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]))
this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km"
this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e,i,n,s=3.2808399*t
s>5280?(e=s/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(s),this._updateScale(this._iScale,n+" ft",n/s))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e
return e*(i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1)}}),Xe=qe.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){d(this,t),this._attributions={}},onAdd:function(t){for(var e in t.attributionControl=this,this._container=Le("div","leaflet-control-attribution"),ie(this._container),t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution())
return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[]
for(var e in this._attributions)this._attributions[e]&&t.push(e)
var i=[]
this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}}})
Ge.mergeOptions({attributionControl:!0}),Ge.addInitHook(function(){this.options.attributionControl&&(new Xe).addTo(this)}),qe.Layers=Ye,qe.Zoom=Ke,qe.Scale=Je,qe.Attribution=Xe,$e.layers=function(t,e,i){return new Ye(t,e,i)},$e.zoom=function(t){return new Ke(t)},$e.scale=function(t){return new Je(t)},$e.attribution=function(t){return new Xe(t)}
var Qe=C.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}})
Qe.addTo=function(t,e){return t.addHandler(e,this),this}
var ti,ei={Events:M},ii=xt?"touchstart mousedown":"mousedown",ni={mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},si={mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"},oi=A.extend({options:{clickTolerance:3},initialize:function(t,e,i,n){d(this,n),this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(Yt(this._dragStartTarget,ii,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(oi._dragging===this&&this.finishDrag(),Jt(this._dragStartTarget,ii,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(!t._simulated&&this._enabled&&(this._moved=!1,!Ce(this._element,"leaflet-zoom-anim")&&!(oi._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(oi._dragging=this,this._preventOutline&&He(this._element),je(),de(),this._moving)))){this.fire("down")
var e=t.touches?t.touches[0]:t
this._startPoint=new z(e.clientX,e.clientY),Yt(document,si[t.type],this._onMove,this),Yt(document,ni[t.type],this._onUp,this)}},_onMove:function(t){if(!t._simulated&&this._enabled)if(t.touches&&t.touches.length>1)this._moved=!0
else{var e=t.touches&&1===t.touches.length?t.touches[0]:t,i=new z(e.clientX,e.clientY),n=i.subtract(this._startPoint);(n.x||n.y)&&(Math.abs(n.x)+Math.abs(n.y)<this.options.clickTolerance||(ne(t),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=Ze(this._element).subtract(n),Me(document.body,"leaflet-dragging"),this._lastTarget=t.target||t.srcElement,window.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Me(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(n),this._moving=!0,T(this._animRequest),this._lastEvent=t,this._animRequest=P(this._updatePosition,this,!0)))}},_updatePosition:function(){var t={originalEvent:this._lastEvent}
this.fire("predrag",t),Re(this._element,this._newPos),this.fire("drag",t)},_onUp:function(t){!t._simulated&&this._enabled&&this.finishDrag()},finishDrag:function(){for(var t in Ae(document.body,"leaflet-dragging"),this._lastTarget&&(Ae(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),si)Jt(document,si[t],this._onMove,this),Jt(document,ni[t],this._onUp,this)
Fe(),me(),this._moved&&this._moving&&(T(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,oi._dragging=!1}})
function ri(t,e){if(!e||!t.length)return t.slice()
var i=e*e
return t=function(t,e){var i=t.length,n=new(typeof Uint8Array!=void 0+""?Uint8Array:Array)(i)
n[0]=n[i-1]=1,function t(e,i,n,s,o){var r,a,h,l=0
for(a=s+1;a<=o-1;a++)(h=ci(e[a],e[s],e[o],!0))>l&&(r=a,l=h)
l>n&&(i[r]=1,t(e,i,n,s,r),t(e,i,n,r,o))}(t,n,e,0,i-1)
var s,o=[]
for(s=0;s<i;s++)n[s]&&o.push(t[s])
return o}(t=function(t,e){for(var i=[t[0]],n=1,s=0,o=t.length;n<o;n++)r=t[n],a=t[s],h=a.x-r.x,l=a.y-r.y,h*h+l*l>e&&(i.push(t[n]),s=n)
var r,a,h,l
return s<o-1&&i.push(t[o-1]),i}(t,i),i)}function ai(t,e,i){return Math.sqrt(ci(t,e,i,!0))}function hi(t,e,i,n,s){var o,r,a,h=n?ti:ui(t,i),l=ui(e,i)
for(ti=l;;){if(!(h|l))return[t,e]
if(h&l)return!1
r=li(t,e,o=h||l,i,s),a=ui(r,i),o===h?(t=r,h=a):(e=r,l=a)}}function li(t,e,i,n,s){var o,r,a=e.x-t.x,h=e.y-t.y,l=n.min,u=n.max
return 8&i?(o=t.x+a*(u.y-t.y)/h,r=u.y):4&i?(o=t.x+a*(l.y-t.y)/h,r=l.y):2&i?(o=u.x,r=t.y+h*(u.x-t.x)/a):1&i&&(o=l.x,r=t.y+h*(l.x-t.x)/a),new z(o,r,s)}function ui(t,e){var i=0
return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i}function ci(t,e,i,n){var s,o=e.x,r=e.y,a=i.x-o,h=i.y-r,l=a*a+h*h
return l>0&&((s=((t.x-o)*a+(t.y-r)*h)/l)>1?(o=i.x,r=i.y):s>0&&(o+=a*s,r+=h*s)),a=t.x-o,h=t.y-r,n?a*a+h*h:new z(o,r)}function pi(t){return!g(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]}function di(t){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),pi(t)}var mi=(Object.freeze||Object)({simplify:ri,pointToSegmentDistance:ai,closestPointOnSegment:function(t,e,i){return ci(t,e,i)},clipSegment:hi,_getEdgeIntersection:li,_getBitCode:ui,_sqClosestPointOnSegment:ci,isFlat:pi,_flat:di})
function fi(t,e,i){var n,s,o,r,a,h,l,u,c,p=[1,4,2,8]
for(s=0,l=t.length;s<l;s++)t[s]._code=ui(t[s],e)
for(r=0;r<4;r++){for(u=p[r],n=[],s=0,l=t.length,o=l-1;s<l;o=s++)a=t[s],h=t[o],a._code&u?h._code&u||((c=li(h,a,u,e,i))._code=ui(c,e),n.push(c)):(h._code&u&&((c=li(h,a,u,e,i))._code=ui(c,e),n.push(c)),n.push(a))
t=n}return t}var _i=(Object.freeze||Object)({clipPolygon:fi}),gi={project:function(t){return new z(t.lng,t.lat)},unproject:function(t){return new D(t.y,t.x)},bounds:new I([-180,-90],[180,90])},vi={R:6378137,R_MINOR:6356752.314245179,bounds:new I([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,o=Math.sqrt(1-s*s),r=o*Math.sin(n),a=Math.tan(Math.PI/4-n/2)/Math.pow((1-r)/(1+r),o/2)
return n=-i*Math.log(Math.max(a,1e-10)),new z(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,s=this.R_MINOR/n,o=Math.sqrt(1-s*s),r=Math.exp(-t.y/n),a=Math.PI/2-2*Math.atan(r),h=0,l=.1;h<15&&Math.abs(l)>1e-7;h++)e=o*Math.sin(a),e=Math.pow((1-e)/(1+e),o/2),l=Math.PI/2-2*Math.atan(r*e)-a,a+=l
return new D(a*i,t.x*i/n)}},yi=(Object.freeze||Object)({LonLat:gi,Mercator:vi,SphericalMercator:U}),bi=i({},V,{code:"EPSG:3395",projection:vi,transformation:function(){var t=.5/(Math.PI*vi.R)
return G(t,.5,-t,.5)}()}),wi=i({},V,{code:"EPSG:4326",projection:gi,transformation:G(1/180,1,-1/180,.5)}),xi=i({},H,{projection:gi,transformation:G(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat
return Math.sqrt(i*i+n*n)},infinite:!0})
H.Earth=V,H.EPSG3395=bi,H.EPSG3857=q,H.EPSG900913=$,H.EPSG4326=wi,H.Simple=xi
var ki=A.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[r(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[r(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target
if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents()
e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.getAttribution&&e.attributionControl&&e.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this})}}})
Ge.include({addLayer:function(t){if(!t._layerAdd)throw new Error("The provided object is not a Layer.")
var e=r(t)
return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=r(t)
return this._layers[e]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return!!t&&r(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i])
return this},_addLayers:function(t){for(var e=0,i=(t=t?g(t)?t:[t]:[]).length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[r(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=r(t)
this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-1/0,i=this._getZoomSpan()
for(var n in this._zoomBoundLayers){var s=this._zoomBoundLayers[n].options
t=void 0===s.minZoom?t:Math.min(t,s.minZoom),e=void 0===s.maxZoom?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-1/0?void 0:e,this._layersMinZoom=t===1/0?void 0:t,i!==this._getZoomSpan()&&this.fire("zoomlevelschange"),void 0===this.options.maxZoom&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),void 0===this.options.minZoom&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}})
var Li=ki.extend({initialize:function(t,e){var i,n
if(d(this,e),this._layers={},t)for(i=0,n=t.length;i<n;i++)this.addLayer(t[i])},addLayer:function(t){var e=this.getLayerId(t)
return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t)
return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers)},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1)
for(e in this._layers)(i=this._layers[e])[t]&&i[t].apply(i,n)
return this},onAdd:function(t){this.eachLayer(t.addLayer,t)},onRemove:function(t){this.eachLayer(t.removeLayer,t)},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i])
return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[]
return this.eachLayer(t.push,t),t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return r(t)}}),Si=Li.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),Li.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),Li.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new R
for(var e in this._layers){var i=this._layers[e]
t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),Pi=C.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0]},initialize:function(t){d(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t)
if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).")
return null}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null)
return this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"]
"number"==typeof n&&(n=[n,n])
var s=B(n),o=B("shadow"===e&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0))
t.className="leaflet-marker-"+e+" "+(i.className||""),o&&(t.style.marginLeft=-o.x+"px",t.style.marginTop=-o.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,e){return(e=e||document.createElement("img")).src=t,e},_getIconUrl:function(t){return St&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}}),Ti=Pi.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return Ti.imagePath||(Ti.imagePath=this._detectIconPath()),(this.options.imagePath||Ti.imagePath)+Pi.prototype._getIconUrl.call(this,t)},_detectIconPath:function(){var t=Le("div","leaflet-default-icon-path",document.body),e=ke(t,"background-image")||ke(t,"backgroundImage")
return document.body.removeChild(t),e=null===e||0!==e.indexOf("url")?"":e.replace(/^url\(["']?/,"").replace(/marker-icon\.png["']?\)$/,"")}}),Ei=Qe.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon
this._draggable||(this._draggable=new oi(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Me(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ae(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(t){var e=this._marker,i=e._map,n=this._marker.options.autoPanSpeed,s=this._marker.options.autoPanPadding,o=L.DomUtil.getPosition(e._icon),r=i.getPixelBounds(),a=i.getPixelOrigin(),h=N(r.min._subtract(a).add(s),r.max._subtract(a).subtract(s))
if(!h.contains(o)){var l=B((Math.max(h.max.x,o.x)-h.max.x)/(r.max.x-h.max.x)-(Math.min(h.min.x,o.x)-h.min.x)/(r.min.x-h.min.x),(Math.max(h.max.y,o.y)-h.max.y)/(r.max.y-h.max.y)-(Math.min(h.min.y,o.y)-h.min.y)/(r.min.y-h.min.y)).multiplyBy(n)
i.panBy(l,{animate:!1}),this._draggable._newPos._add(l),this._draggable._startPos._add(l),L.DomUtil.setPosition(e._icon,this._draggable._newPos),this._onDrag(t),this._panRequest=P(this._adjustPan.bind(this,t))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart")},_onPreDrag:function(t){this._marker.options.autoPan&&(T(this._panRequest),this._panRequest=P(this._adjustPan.bind(this,t)))},_onDrag:function(t){var e=this._marker,i=e._shadow,n=Ze(e._icon),s=e._map.layerPointToLatLng(n)
i&&Re(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){T(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),Ci=ki.extend({options:{icon:new Ti,interactive:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",bubblingMouseEvents:!1},initialize:function(t,e){d(this,e),this._latlng=j(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng
return this._latlng=j(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var t=this._map.latLngToLayerPoint(this._latlng).round()
this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1
i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),"IMG"===i.tagName&&(i.alt=t.alt||"")),Me(i,e),t.keyboard&&(i.tabIndex="0"),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex})
var s=t.icon.createShadow(this._shadow),o=!1
s!==this._shadow&&(this._removeShadow(),o=!0),s&&(Me(s,e),s.alt=""),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&o&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),Se(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&Se(this._shadow),this._shadow=null},_setPos:function(t){Re(this._icon,t),this._shadow&&Re(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round()
this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(Me(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Ei)){var t=this.options.draggable
this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Ei(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity
Be(this._icon,t),this._shadow&&Be(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}}),Mi=ki.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return d(this,t),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+this._renderer.options.tolerance}}),Ai=Mi.extend({options:{fill:!0,radius:10},initialize:function(t,e){d(this,e),this._latlng=j(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=j(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius
return Mi.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i]
this._pxBounds=new I(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()}}),zi=Ai.extend({initialize:function(t,e,n){if("number"==typeof e&&(e=i({},n,{radius:e})),d(this,e),this._latlng=j(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN")
this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius]
return new R(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:Mi.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs
if(n.distance===V.distance){var s=Math.PI/180,o=this._mRadius/V.R/s,r=i.project([e+o,t]),a=i.project([e-o,t]),h=r.add(a).divideBy(2),l=i.unproject(h).lat,u=Math.acos((Math.cos(o*s)-Math.sin(e*s)*Math.sin(l*s))/(Math.cos(e*s)*Math.cos(l*s)))/s;(isNaN(u)||0===u)&&(u=o/Math.cos(Math.PI/180*e)),this._point=h.subtract(i.getPixelOrigin()),this._radius=isNaN(u)?0:h.x-i.project([l,t-u]).x,this._radiusY=h.y-r.y}else{var c=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]))
this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(c).x}this._updateBounds()}}),Oi=Mi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){d(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,i,n=1/0,s=null,o=ci,r=0,a=this._parts.length;r<a;r++)for(var h=this._parts[r],l=1,u=h.length;l<u;l++){e=h[l-1],i=h[l]
var c=o(t,e,i,!0)
c<n&&(n=c,s=o(t,e,i))}return s&&(s.distance=Math.sqrt(n)),s},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()")
var t,e,i,n,s,o,r,a=this._rings[0],h=a.length
if(!h)return null
for(t=0,e=0;t<h-1;t++)e+=a[t].distanceTo(a[t+1])/2
if(0===e)return this._map.layerPointToLatLng(a[0])
for(t=0,n=0;t<h-1;t++)if(s=a[t],o=a[t+1],i=s.distanceTo(o),(n+=i)>e)return r=(n-e)/i,this._map.layerPointToLatLng([o.x-r*(o.x-s.x),o.y-r*(o.y-s.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=j(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new R,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return pi(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=pi(t),n=0,s=t.length;n<s;n++)i?(e[n]=j(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n])
return e},_project:function(){var t=new I
this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t)
var e=this._clickTolerance(),i=new z(e,e)
this._bounds.isValid()&&t.isValid()&&(t.min._subtract(i),t.max._add(i),this._pxBounds=t)},_projectLatlngs:function(t,e,i){var n,s,o=t[0]instanceof D,r=t.length
if(o){for(s=[],n=0;n<r;n++)s[n]=this._map.latLngToLayerPoint(t[n]),i.extend(s[n])
e.push(s)}else for(n=0;n<r;n++)this._projectLatlngs(t[n],e,i)},_clipPoints:function(){var t=this._renderer._bounds
if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings
else{var e,i,n,s,o,r,a,h=this._parts
for(e=0,n=0,s=this._rings.length;e<s;e++)for(a=this._rings[e],i=0,o=a.length;i<o-1;i++)(r=hi(a[i],a[i+1],t,i,!0))&&(h[n]=h[n]||[],h[n].push(r[0]),r[1]===a[i+1]&&i!==o-2||(h[n].push(r[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=ri(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(t,e){var i,n,s,o,r,a,h=this._clickTolerance()
if(!this._pxBounds||!this._pxBounds.contains(t))return!1
for(i=0,o=this._parts.length;i<o;i++)for(a=this._parts[i],n=0,r=a.length,s=r-1;n<r;s=n++)if((e||0!==n)&&ai(t,a[s],a[n])<=h)return!0
return!1}})
Oi._flat=di
var Bi=Oi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()")
var t,e,i,n,s,o,r,a,h,l=this._rings[0],u=l.length
if(!u)return null
for(o=r=a=0,t=0,e=u-1;t<u;e=t++)i=l[t],n=l[e],s=i.y*n.x-n.y*i.x,r+=(i.x+n.x)*s,a+=(i.y+n.y)*s,o+=3*s
return h=0===o?l[0]:[r/o,a/o],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var e=Oi.prototype._convertLatLngs.call(this,t),i=e.length
return i>=2&&e[0]instanceof D&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){Oi.prototype._setLatLngs.call(this,t),pi(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return pi(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new z(e,e)
if(t=new I(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t))if(this.options.noClip)this._parts=this._rings
else for(var n,s=0,o=this._rings.length;s<o;s++)(n=fi(this._rings[s],t,!0)).length&&this._parts.push(n)},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(t){var e,i,n,s,o,r,a,h,l=!1
if(!this._pxBounds.contains(t))return!1
for(s=0,a=this._parts.length;s<a;s++)for(e=this._parts[s],o=0,h=e.length,r=h-1;o<h;r=o++)i=e[o],n=e[r],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(l=!l)
return l||Oi.prototype._containsPoint.call(this,t,!0)}}),Ii=Si.extend({initialize:function(t,e){d(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=g(t)?t:t.features
if(s){for(e=0,i=s.length;e<i;e++)((n=s[e]).geometries||n.geometry||n.features||n.coordinates)&&this.addData(n)
return this}var o=this.options
if(o.filter&&!o.filter(t))return this
var r=Ni(t,o)
return r?(r.feature=Hi(t),r.defaultOptions=r.options,this.resetStyle(r),o.onEachFeature&&o.onEachFeature(t,r),this.addLayer(r)):this},resetStyle:function(t){return t.options=i({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}})
function Ni(t,e){var i,n,s,o,r="Feature"===t.type?t.geometry:t,a=r?r.coordinates:null,h=[],l=e&&e.pointToLayer,u=e&&e.coordsToLatLng||Ri
if(!a&&!r)return null
switch(r.type){case"Point":return i=u(a),l?l(t,i):new Ci(i)
case"MultiPoint":for(s=0,o=a.length;s<o;s++)i=u(a[s]),h.push(l?l(t,i):new Ci(i))
return new Si(h)
case"LineString":case"MultiLineString":return n=Zi(a,"LineString"===r.type?0:1,u),new Oi(n,e)
case"Polygon":case"MultiPolygon":return n=Zi(a,"Polygon"===r.type?1:2,u),new Bi(n,e)
case"GeometryCollection":for(s=0,o=r.geometries.length;s<o;s++){var c=Ni({geometry:r.geometries[s],type:"Feature",properties:t.properties},e)
c&&h.push(c)}return new Si(h)
default:throw new Error("Invalid GeoJSON object.")}}function Ri(t){return new D(t[1],t[0],t[2])}function Zi(t,e,i){for(var n,s=[],o=0,r=t.length;o<r;o++)n=e?Zi(t[o],e-1,i):(i||Ri)(t[o]),s.push(n)
return s}function Di(t,e){return e="number"==typeof e?e:6,void 0!==t.alt?[u(t.lng,e),u(t.lat,e),u(t.alt,e)]:[u(t.lng,e),u(t.lat,e)]}function ji(t,e,i,n){for(var s=[],o=0,r=t.length;o<r;o++)s.push(e?ji(t[o],e-1,i,n):Di(t[o],n))
return!e&&i&&s.push(s[0]),s}function Fi(t,e){return t.feature?i({},t.feature,{geometry:e}):Hi(e)}function Hi(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}var Vi={toGeoJSON:function(t){return Fi(this,{type:"Point",coordinates:Di(this.getLatLng(),t)})}}
function Ui(t,e){return new Ii(t,e)}Ci.include(Vi),zi.include(Vi),Ai.include(Vi),Oi.include({toGeoJSON:function(t){var e=!pi(this._latlngs),i=ji(this._latlngs,e?1:0,!1,t)
return Fi(this,{type:(e?"Multi":"")+"LineString",coordinates:i})}}),Bi.include({toGeoJSON:function(t){var e=!pi(this._latlngs),i=e&&!pi(this._latlngs[0]),n=ji(this._latlngs,i?2:e?1:0,!0,t)
return e||(n=[n]),Fi(this,{type:(i?"Multi":"")+"Polygon",coordinates:n})}}),Li.include({toMultiPoint:function(t){var e=[]
return this.eachLayer(function(i){e.push(i.toGeoJSON(t).geometry.coordinates)}),Fi(this,{type:"MultiPoint",coordinates:e})},toGeoJSON:function(t){var e=this.feature&&this.feature.geometry&&this.feature.geometry.type
if("MultiPoint"===e)return this.toMultiPoint(t)
var i="GeometryCollection"===e,n=[]
return this.eachLayer(function(e){if(e.toGeoJSON){var s=e.toGeoJSON(t)
if(i)n.push(s.geometry)
else{var o=Hi(s)
"FeatureCollection"===o.type?n.push.apply(n,o.features):n.push(o)}}}),i?Fi(this,{geometries:n,type:"GeometryCollection"}):{type:"FeatureCollection",features:n}}})
var Wi=Ui,Gi=ki.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(t,e,i){this._url=t,this._bounds=Z(e),d(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Me(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){Se(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&Te(this._image),this},bringToBack:function(){return this._map&&Ee(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=Z(t),this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset}
return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t="IMG"===this._url.tagName,e=this._image=t?this._url:Le("img")
Me(e,"leaflet-image-layer"),this._zoomAnimated&&Me(e,"leaflet-zoom-animated"),this.options.className&&Me(e,this.options.className),e.onselectstart=l,e.onmousemove=l,e.onload=s(this.fire,this,"load"),e.onerror=s(this._overlayOnError,this,"error"),this.options.crossOrigin&&(e.crossOrigin=""),this.options.zIndex&&this._updateZIndex(),t?this._url=e.src:(e.src=this._url,e.alt=this.options.alt)},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min
Ne(this._image,i,e)},_reset:function(){var t=this._image,e=new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize()
Re(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){Be(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error")
var t=this.options.errorOverlayUrl
t&&this._url!==t&&(this._url=t,this._image.src=t)}}),qi=Gi.extend({options:{autoplay:!0,loop:!0},_initImage:function(){var t="VIDEO"===this._url.tagName,e=this._image=t?this._url:Le("video")
if(Me(e,"leaflet-image-layer"),this._zoomAnimated&&Me(e,"leaflet-zoom-animated"),e.onselectstart=l,e.onmousemove=l,e.onloadeddata=s(this.fire,this,"load"),t){for(var i=e.getElementsByTagName("source"),n=[],o=0;o<i.length;o++)n.push(i[o].src)
this._url=i.length>0?n:[e.src]}else{g(this._url)||(this._url=[this._url]),e.autoplay=!!this.options.autoplay,e.loop=!!this.options.loop
for(var r=0;r<this._url.length;r++){var a=Le("source")
a.src=this._url[r],e.appendChild(a)}}}}),$i=ki.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(t,e){d(this,t),this._source=e},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&Be(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&Be(this._container,1),this.bringToFront()},onRemove:function(t){t._fadeAnimated?(Be(this._container,0),this._removeTimeout=setTimeout(s(Se,void 0,this._container),200)):Se(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=j(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition}
return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Te(this._container),this},bringToBack:function(){return this._map&&Ee(this._container),this},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content
if("string"==typeof e)t.innerHTML=e
else{for(;t.hasChildNodes();)t.removeChild(t.firstChild)
t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=B(this.options.offset),i=this._getAnchor()
this._zoomAnimated?Re(this._container,t.add(i)):e=e.add(t).add(i)
var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x
this._container.style.bottom=n+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}}),Yi=$i.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(t){return t.openPopup(this),this},onAdd:function(t){$i.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Mi||this._source.on("preclick",te))},onRemove:function(t){$i.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Mi||this._source.off("preclick",te))},getEvents:function(){var t=$i.prototype.getEvents.call(this)
return(void 0!==this.options.closeOnClick?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t="leaflet-popup",e=this._container=Le("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated"),i=this._wrapper=Le("div",t+"-content-wrapper",e)
if(this._contentNode=Le("div",t+"-content",i),ie(i),ee(this._contentNode),Yt(i,"contextmenu",te),this._tipContainer=Le("div",t+"-tip-container",e),this._tip=Le("div",t+"-tip",this._tipContainer),this.options.closeButton){var n=this._closeButton=Le("a",t+"-close-button",e)
n.href="#close",n.innerHTML="&#215;",Yt(n,"click",this._onCloseButtonClick,this)}},_updateLayout:function(){var t=this._contentNode,e=t.style
e.width="",e.whiteSpace="nowrap"
var i=t.offsetWidth
i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height=""
var n=t.offsetHeight,s=this.options.maxHeight
s&&n>s?(e.height=s+"px",Me(t,"leaflet-popup-scrolled")):Ae(t,"leaflet-popup-scrolled"),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor()
Re(this._container,e.add(i))},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,e=parseInt(ke(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new z(this._containerLeft,-i-this._containerBottom)
s._add(Ze(this._container))
var o=t.layerPointToContainerPoint(s),r=B(this.options.autoPanPadding),a=B(this.options.autoPanPaddingTopLeft||r),h=B(this.options.autoPanPaddingBottomRight||r),l=t.getSize(),u=0,c=0
o.x+n+h.x>l.x&&(u=o.x+n-l.x+h.x),o.x-u-a.x<0&&(u=o.x-a.x),o.y+i+h.y>l.y&&(c=o.y+i-l.y+h.y),o.y-c-a.y<0&&(c=o.y-a.y),(u||c)&&t.fire("autopanstart").panBy([u,c])}},_onCloseButtonClick:function(t){this._close(),se(t)},_getAnchor:function(){return B(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}})
Ge.mergeOptions({closePopupOnClick:!0}),Ge.include({openPopup:function(t,e,i){return t instanceof Yi||(t=new Yi(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),ki.include({bindPopup:function(t,e){return t instanceof Yi?(d(t,e),this._popup=t,t._source=this):(this._popup&&!e||(this._popup=new Yi(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,e){if(t instanceof ki||(e=t,t=this),t instanceof Si)for(var i in this._layers){t=this._layers[i]
break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,e)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return!!this._popup&&this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var e=t.layer||t.target
this._popup&&this._map&&(se(t),e instanceof Mi?this.openPopup(t.layer||t.target,t.latlng):this._map.hasLayer(this._popup)&&this._popup._source===e?this.closePopup():this.openPopup(e,t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)},_onKeyPress:function(t){13===t.originalEvent.keyCode&&this._openPopup(t)}})
var Ki=$i.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function(t){$i.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(t){$i.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var t=$i.prototype.getEvents.call(this)
return xt&&!this.options.permanent&&(t.preclick=this._close),t},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var t="leaflet-tooltip "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide")
this._contentNode=this._container=Le("div",t)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e=this._map,i=this._container,n=e.latLngToContainerPoint(e.getCenter()),s=e.layerPointToContainerPoint(t),o=this.options.direction,r=i.offsetWidth,a=i.offsetHeight,h=B(this.options.offset),l=this._getAnchor()
"top"===o?t=t.add(B(-r/2+h.x,-a+h.y+l.y,!0)):"bottom"===o?t=t.subtract(B(r/2-h.x,-h.y,!0)):"center"===o?t=t.subtract(B(r/2+h.x,a/2-l.y+h.y,!0)):"right"===o||"auto"===o&&s.x<n.x?(o="right",t=t.add(B(h.x+l.x,l.y-a/2+h.y,!0))):(o="left",t=t.subtract(B(r+l.x-h.x,a/2-l.y-h.y,!0))),Ae(i,"leaflet-tooltip-right"),Ae(i,"leaflet-tooltip-left"),Ae(i,"leaflet-tooltip-top"),Ae(i,"leaflet-tooltip-bottom"),Me(i,"leaflet-tooltip-"+o),Re(i,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng)
this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&Be(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center)
this._setPosition(e)},_getAnchor:function(){return B(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}})
Ge.include({openTooltip:function(t,e,i){return t instanceof Ki||(t=new Ki(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:this.addLayer(t)},closeTooltip:function(t){return t&&this.removeLayer(t),this}}),ki.include({bindTooltip:function(t,e){return t instanceof Ki?(d(t,e),this._tooltip=t,t._source=this):(this._tooltip&&!e||(this._tooltip=new Ki(e,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip}
this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),xt&&(i.click=this._openTooltip)),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t,e){if(t instanceof ki||(e=t,t=this),t instanceof Si)for(var i in this._layers){t=this._layers[i]
break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=t,this._tooltip.update(),this._map.openTooltip(this._tooltip,e),this._tooltip.options.interactive&&this._tooltip._container&&(Me(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(Ae(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_openTooltip:function(t){var e=t.layer||t.target
this._tooltip&&this._map&&this.openTooltip(e,this._tooltip.options.sticky?t.latlng:void 0)},_moveTooltip:function(t){var e,i,n=t.latlng
this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),i=this._map.containerPointToLayerPoint(e),n=this._map.layerPointToLatLng(i)),this._tooltip.setLatLng(n)}})
var Ji=Pi.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var e=t&&"DIV"===t.tagName?t:document.createElement("div"),i=this.options
if(e.innerHTML=!1!==i.html?i.html:"",i.bgPos){var n=B(i.bgPos)
e.style.backgroundPosition=-n.x+"px "+-n.y+"px"}return this._setIconStyles(e,"icon"),e},createShadow:function(){return null}})
Pi.Default=Ti
var Xi=ki.extend({options:{tileSize:256,opacity:1,updateWhenIdle:gt,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){d(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),Se(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Te(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Ee(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd}
return this.options.updateWhenIdle||(this._onMove||(this._onMove=a(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return document.createElement("div")},getTileSize:function(){var t=this.options.tileSize
return t instanceof z?t:new z(t,t)},_updateZIndex:function(){this._container&&void 0!==this.options.zIndex&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-1/0,1/0),s=0,o=i.length;s<o;s++)e=i[s].style.zIndex,i[s]!==this._container&&e&&(n=t(n,+e))
isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Q){Be(this._container,this.options.opacity)
var t=+new Date,e=!1,i=!1
for(var n in this._tiles){var s=this._tiles[n]
if(s.current&&s.loaded){var o=Math.min(1,(t-s.loaded)/200)
Be(s.el,o),o<1?e=!0:(s.active?i=!0:this._onOpaqueTile(s),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(T(this._fadeFrame),this._fadeFrame=P(this._updateOpacity,this))}},_onOpaqueTile:l,_initContainer:function(){this._container||(this._container=Le("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom
if(void 0!==t){for(var i in this._levels)this._levels[i].el.children.length||i===t?(this._levels[i].el.style.zIndex=e-Math.abs(t-i),this._onUpdateLevel(i)):(Se(this._levels[i].el),this._removeTilesAtZoom(i),this._onRemoveLevel(i),delete this._levels[i])
var n=this._levels[t],s=this._map
return n||((n=this._levels[t]={}).el=Le("div","leaflet-tile-container leaflet-zoom-animated",this._container),n.el.style.zIndex=e,n.origin=s.project(s.unproject(s.getPixelOrigin()),t).round(),n.zoom=t,this._setZoomTransform(n,s.getCenter(),s.getZoom()),n.el.offsetWidth,this._onCreateLevel(n)),this._level=n,n}},_onUpdateLevel:l,_onRemoveLevel:l,_onCreateLevel:l,_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom()
if(i>this.options.maxZoom||i<this.options.minZoom)this._removeAllTiles()
else{for(t in this._tiles)(e=this._tiles[t]).retain=e.current
for(t in this._tiles)if((e=this._tiles[t]).current&&!e.active){var n=e.coords
this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)Se(this._levels[t].el),this._onRemoveLevel(t),delete this._levels[t]
this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(t,e,i,n){var s=Math.floor(t/2),o=Math.floor(e/2),r=i-1,a=new z(+s,+o)
a.z=+r
var h=this._tileCoordsToKey(a),l=this._tiles[h]
return l&&l.active?(l.retain=!0,!0):(l&&l.loaded&&(l.retain=!0),r>n&&this._retainParent(s,o,r,n))},_retainChildren:function(t,e,i,n){for(var s=2*t;s<2*t+2;s++)for(var o=2*e;o<2*e+2;o++){var r=new z(s,o)
r.z=i+1
var a=this._tileCoordsToKey(r),h=this._tiles[a]
h&&h.active?h.retain=!0:(h&&h.loaded&&(h.retain=!0),i+1<n&&this._retainChildren(s,o,i+1,n))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo)
this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_clampZoom:function(t){var e=this.options
return void 0!==e.minNativeZoom&&t<e.minNativeZoom?e.minNativeZoom:void 0!==e.maxNativeZoom&&e.maxNativeZoom<t?e.maxNativeZoom:t},_setView:function(t,e,i,n){var s=this._clampZoom(Math.round(e));(void 0!==this.options.maxZoom&&s>this.options.maxZoom||void 0!==this.options.minZoom&&s<this.options.minZoom)&&(s=void 0)
var o=this.options.updateWhenZooming&&s!==this._tileZoom
n&&!o||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),void 0!==s&&this._update(t),i||this._pruneTiles(),this._noPrune=!!i),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round()
_t?Ne(t.el,s,n):Re(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,s=this._map.getPixelWorldBounds(this._tileZoom)
s&&(this._globalTileRange=this._pxBoundsToTileRange(s)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),o=e.getSize().divideBy(2*n)
return new I(s.subtract(o),s.add(o))},_update:function(t){var e=this._map
if(e){var i=this._clampZoom(e.getZoom())
if(void 0===t&&(t=e.getCenter()),void 0!==this._tileZoom){var n=this._getTiledPixelBounds(t),s=this._pxBoundsToTileRange(n),o=s.getCenter(),r=[],a=this.options.keepBuffer,h=new I(s.getBottomLeft().subtract([a,-a]),s.getTopRight().add([a,-a]))
if(!(isFinite(s.min.x)&&isFinite(s.min.y)&&isFinite(s.max.x)&&isFinite(s.max.y)))throw new Error("Attempted to load an infinite number of tiles")
for(var l in this._tiles){var u=this._tiles[l].coords
u.z===this._tileZoom&&h.contains(new z(u.x,u.y))||(this._tiles[l].current=!1)}if(Math.abs(i-this._tileZoom)>1)this._setView(t,i)
else{for(var c=s.min.y;c<=s.max.y;c++)for(var p=s.min.x;p<=s.max.x;p++){var d=new z(p,c)
if(d.z=this._tileZoom,this._isValidTile(d)){var m=this._tiles[this._tileCoordsToKey(d)]
m?m.current=!0:r.push(d)}}if(r.sort(function(t,e){return t.distanceTo(o)-e.distanceTo(o)}),0!==r.length){this._loading||(this._loading=!0,this.fire("loading"))
var f=document.createDocumentFragment()
for(p=0;p<r.length;p++)this._addTile(r[p],f)
this._level.el.appendChild(f)}}}}},_isValidTile:function(t){var e=this._map.options.crs
if(!e.infinite){var i=this._globalTileRange
if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0
var n=this._tileCoordsToBounds(t)
return Z(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToNwSe:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),o=e.unproject(n,t.z),r=e.unproject(s,t.z)
return[o,r]},_tileCoordsToBounds:function(t){var e=this._tileCoordsToNwSe(t),i=new R(e[0],e[1])
return this.options.noWrap||(i=this._map.wrapLatLngBounds(i)),i},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new z(+e[0],+e[1])
return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t]
e&&(ot||e.el.setAttribute("src",y),Se(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){Me(t,"leaflet-tile")
var e=this.getTileSize()
t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=l,t.onmousemove=l,Q&&this.options.opacity<1&&Be(t,this.options.opacity),it&&!nt&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),o=this.createTile(this._wrapCoords(t),s(this._tileReady,this,t))
this._initTile(o),this.createTile.length<2&&P(s(this._tileReady,this,t,null,o)),Re(o,i),this._tiles[n]={el:o,coords:t,current:!0},e.appendChild(o),this.fire("tileloadstart",{tile:o,coords:t})},_tileReady:function(t,e,i){if(this._map){e&&this.fire("tileerror",{error:e,tile:i,coords:t})
var n=this._tileCoordsToKey(t);(i=this._tiles[n])&&(i.loaded=+new Date,this._map._fadeAnimated?(Be(i.el,0),T(this._fadeFrame),this._fadeFrame=P(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(Me(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Q||!this._map._fadeAnimated?P(this._pruneTiles,this):setTimeout(s(this._pruneTiles,this),250)))}},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new z(this._wrapX?h(t.x,this._wrapX):t.x,this._wrapY?h(t.y,this._wrapY):t.y)
return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize()
return new I(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1
return!0}}),Qi=Xi.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,e){this._url=t,(e=d(this,e)).detectRetina&&St&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom++):(e.zoomOffset++,e.maxZoom--),e.minZoom=Math.max(0,e.minZoom)),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),it||this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},createTile:function(t,e){var i=document.createElement("img")
return Yt(i,"load",s(this._tileOnLoad,this,e,i)),Yt(i,"error",s(this._tileOnError,this,e,i)),this.options.crossOrigin&&(i.crossOrigin=""),i.alt="",i.setAttribute("role","presentation"),i.src=this.getTileUrl(t),i},getTileUrl:function(t){var e={r:St?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()}
if(this._map&&!this._map.options.crs.infinite){var n=this._globalTileRange.max.y-t.y
this.options.tms&&(e.y=n),e["-y"]=n}return _(this._url,i(e,this.options))},_tileOnLoad:function(t,e){Q?setTimeout(s(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl
n&&e.getAttribute("src")!==n&&(e.src=n),t(i,e)},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset
return i&&(t=e-t),t+n},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length
return this.options.subdomains[e]},_abortLoading:function(){var t,e
for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&((e=this._tiles[t].el).onload=l,e.onerror=l,e.complete||(e.src=y,Se(e),delete this._tiles[t]))}})
function tn(t,e){return new Qi(t,e)}var en=Qi.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t
var n=i({},this.defaultWmsParams)
for(var s in e)s in this.options||(n[s]=e[s])
var o=(e=d(this,e)).detectRetina&&St?2:1,r=this.getTileSize()
n.width=r.x*o,n.height=r.y*o,this.wmsParams=n},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version)
var e=this._wmsVersion>=1.3?"crs":"srs"
this.wmsParams[e]=this._crs.code,Qi.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToNwSe(t),i=this._crs,n=N(i.project(e[0]),i.project(e[1])),s=n.min,o=n.max,r=(this._wmsVersion>=1.3&&this._crs===wi?[s.y,s.x,o.y,o.x]:[s.x,s.y,o.x,o.y]).join(","),a=L.TileLayer.prototype.getTileUrl.call(this,t)
return a+m(this.wmsParams,a,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+r},setParams:function(t,e){return i(this.wmsParams,t),e||this.redraw(),this}})
Qi.WMS=en,tn.wms=function(t,e){return new en(t,e)}
var nn=ki.extend({options:{padding:.1,tolerance:0},initialize:function(t){d(this,t),r(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&Me(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd}
return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=Ze(this._container),s=this._map.getSize().multiplyBy(.5+this.options.padding),o=this._map.project(this._center,e),r=this._map.project(t,e),a=r.subtract(o),h=s.multiplyBy(-i).add(n).add(s).subtract(a)
_t?Ne(this._container,h,i):Re(this._container,h)},_reset:function(){for(var t in this._update(),this._updateTransform(this._center,this._zoom),this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round()
this._bounds=new I(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),sn=nn.extend({getEvents:function(){var t=nn.prototype.getEvents.call(this)
return t.viewprereset=this._onViewPreReset,t},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){nn.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=document.createElement("canvas")
Yt(t,"mousemove",a(this._onMouseMove,32,this),this),Yt(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this),Yt(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_destroyContainer:function(){delete this._ctx,Se(this._container),Jt(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){for(var t in this._redrawBounds=null,this._layers)this._layers[t]._update()
this._redraw()}},_update:function(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},nn.prototype._update.call(this)
var t=this._bounds,e=this._container,i=t.getSize(),n=St?2:1
Re(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",St&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_reset:function(){nn.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(t){this._updateDashArray(t),this._layers[r(t)]=t
var e=t._order={layer:t,prev:this._drawLast,next:null}
this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev
i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[L.stamp(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(t.options.dashArray){var e,i=t.options.dashArray.split(","),n=[]
for(e=0;e<i.length;e++)n.push(Number(i[e]))
t.options._dashArray=n}},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||P(this._redraw,this))},_extendRedrawBounds:function(t){if(t._pxBounds){var e=(t.options.weight||0)+1
this._redrawBounds=this._redrawBounds||new I,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds
if(t){var e=t.getSize()
this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.clearRect(0,0,this._container.width,this._container.height)},_draw:function(){var t,e=this._redrawBounds
if(this._ctx.save(),e){var i=e.getSize()
this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0
for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath()
this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,s,o,r=t._parts,a=r.length,h=this._ctx
if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),i=0;i<a;i++){for(n=0,s=r[i].length;n<s;n++)o=r[i][n],h[n?"lineTo":"moveTo"](o.x,o.y)
e&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var e=t._point,i=this._ctx,n=Math.max(Math.round(t._radius),1),s=(Math.max(Math.round(t._radiusY),1)||n)/n
this._drawnLayers[t._leaflet_id]=t,1!==s&&(i.save(),i.scale(1,s)),i.beginPath(),i.arc(e.x,e.y/s,n,0,2*Math.PI,!1),1!==s&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options
i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&0!==i.weight&&(t.setLineDash&&t.setLineDash(e.options&&e.options._dashArray||[]),t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e,i,n=this._map.mouseEventToLayerPoint(t),s=this._drawFirst;s;s=s.next)(e=s.layer).options.interactive&&e._containsPoint(n)&&!this._map._draggableMoved(e)&&(i=e)
i&&(ue(t),this._fireEvent([i],t))},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t)
this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer
e&&(Ae(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(t,e){for(var i,n,s=this._drawFirst;s;s=s.next)(i=s.layer).options.interactive&&i._containsPoint(e)&&(n=i)
n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(Me(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t)},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order,i=e.next,n=e.prev
i&&(i.prev=n,n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t))},_bringToBack:function(t){var e=t._order,i=e.next,n=e.prev
n&&(n.next=i,i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t))}})
function on(t){return Pt?new sn(t):null}var rn=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}(),an={_initContainer:function(){this._container=Le("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(nn.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=rn("shape")
Me(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=rn("path"),e.appendChild(t._path),this._updateStyle(t),this._layers[r(t)]=t},_addPath:function(t){var e=t._container
this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container
Se(e),t.removeInteractiveTarget(e),delete this._layers[r(t)]},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container
s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=rn("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=g(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=rn("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i)
this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){Te(t._container)},_bringToBack:function(t){Ee(t._container)}},hn=Et?rn:Y,ln=nn.extend({getEvents:function(){var t=nn.prototype.getEvents.call(this)
return t.zoomstart=this._onZoomStart,t},_initContainer:function(){this._container=hn("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=hn("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){Se(this._container),Jt(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_onZoomStart:function(){this._update()},_update:function(){if(!this._map._animatingZoom||!this._bounds){nn.prototype._update.call(this)
var t=this._bounds,e=t.getSize(),i=this._container
this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),Re(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=hn("path")
t.options.className&&Me(e,t.options.className),t.options.interactive&&Me(e,"leaflet-interactive"),this._updateStyle(t),this._layers[r(t)]=t},_addPath:function(t){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){Se(t._path),t.removeInteractiveTarget(t._path),delete this._layers[r(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options
e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,K(t._parts,e))},_updateCircle:function(t){var e=t._point,i=Math.max(Math.round(t._radius),1),n=Math.max(Math.round(t._radiusY),1)||i,s="a"+i+","+n+" 0 1,0 ",o=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+s+2*i+",0 "+s+2*-i+",0 "
this._setPath(t,o)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){Te(t._path)},_bringToBack:function(t){Ee(t._path)}})
function un(t){return Tt||Et?new ln(t):null}Et&&ln.include(an),Ge.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer
return e||(e=this._renderer=this.options.preferCanvas&&on()||un()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||void 0===t)return!1
var e=this._paneRenderers[t]
return void 0===e&&(e=ln&&un({pane:t})||sn&&on({pane:t}),this._paneRenderers[t]=e),e}})
var cn=Bi.extend({initialize:function(t,e){Bi.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return[(t=Z(t)).getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}})
ln.create=hn,ln.pointsToPath=K,Ii.geometryToLayer=Ni,Ii.coordsToLatLng=Ri,Ii.coordsToLatLngs=Zi,Ii.latLngToCoords=Di,Ii.latLngsToCoords=ji,Ii.getFeature=Fi,Ii.asFeature=Hi,Ge.mergeOptions({boxZoom:!0})
var pn=Qe.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane,this._resetStateTimeout=0,t.on("unload",this._destroy,this)},addHooks:function(){Yt(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Jt(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){Se(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){0!==this._resetStateTimeout&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(t){if(!t.shiftKey||1!==t.which&&1!==t.button)return!1
this._clearDeferredResetState(),this._resetState(),de(),je(),this._startPoint=this._map.mouseEventToContainerPoint(t),Yt(document,{contextmenu:se,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=Le("div","leaflet-zoom-box",this._container),Me(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t)
var e=new I(this._point,this._startPoint),i=e.getSize()
Re(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(Se(this._box),Ae(this._container,"leaflet-crosshair")),me(),Fe(),Jt(document,{contextmenu:se,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(s(this._resetState,this),0)
var e=new R(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point))
this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}})
Ge.addInitHook("addHandler","boxZoom",pn),Ge.mergeOptions({doubleClickZoom:!0})
var dn=Qe.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,s=t.originalEvent.shiftKey?i-n:i+n
"center"===e.options.doubleClickZoom?e.setZoom(s):e.setZoomAround(t.containerPoint,s)}})
Ge.addInitHook("addHandler","doubleClickZoom",dn),Ge.mergeOptions({dragging:!0,inertia:!nt,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0})
var mn=Qe.extend({addHooks:function(){if(!this._draggable){var t=this._map
this._draggable=new oi(t._mapPane,t._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}Me(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ae(this._map._container,"leaflet-grab"),Ae(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var t=this._map
if(t._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=Z(this._map.options.maxBounds)
this._offsetLimit=N(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null
t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos
this._positions.push(i),this._times.push(e),this._prunePositions(e)}this._map.fire("move",t).fire("drag",t)},_prunePositions:function(t){for(;this._positions.length>1&&t-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0])
this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit
t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,s=(n-e+i)%t+e-i,o=(n+e+i)%t-e-i,r=Math.abs(s+i)<Math.abs(o+i)?s:o
this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||this._times.length<2
if(e.fire("dragend",t),n)e.fire("moveend")
else{this._prunePositions(+new Date)
var s=this._lastPos.subtract(this._positions[0]),o=(this._lastTime-this._times[0])/1e3,r=i.easeLinearity,a=s.multiplyBy(r/o),h=a.distanceTo([0,0]),l=Math.min(i.inertiaMaxSpeed,h),u=a.multiplyBy(l/h),c=l/(i.inertiaDeceleration*r),p=u.multiplyBy(-c/2).round()
p.x||p.y?(p=e._limitOffset(p,e.options.maxBounds),P(function(){e.panBy(p,{duration:c,easeLinearity:r,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}})
Ge.addInitHook("addHandler","dragging",mn),Ge.mergeOptions({keyboard:!0,keyboardPanDelta:80})
var fn=Qe.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container
t.tabIndex<=0&&(t.tabIndex="0"),Yt(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Jt(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var t=document.body,e=document.documentElement,i=t.scrollTop||e.scrollTop,n=t.scrollLeft||e.scrollLeft
this._map._container.focus(),window.scrollTo(n,i)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e,i,n=this._panKeys={},s=this.keyCodes
for(e=0,i=s.left.length;e<i;e++)n[s.left[e]]=[-1*t,0]
for(e=0,i=s.right.length;e<i;e++)n[s.right[e]]=[t,0]
for(e=0,i=s.down.length;e<i;e++)n[s.down[e]]=[0,t]
for(e=0,i=s.up.length;e<i;e++)n[s.up[e]]=[0,-1*t]},_setZoomDelta:function(t){var e,i,n=this._zoomKeys={},s=this.keyCodes
for(e=0,i=s.zoomIn.length;e<i;e++)n[s.zoomIn[e]]=t
for(e=0,i=s.zoomOut.length;e<i;e++)n[s.zoomOut[e]]=-t},_addHooks:function(){Yt(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Jt(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map
if(i in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return
e=this._panKeys[i],t.shiftKey&&(e=B(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds)}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i])
else{if(27!==i||!n._popup||!n._popup.options.closeOnEscapeKey)return
n.closePopup()}se(t)}}})
Ge.addInitHook("addHandler","keyboard",fn),Ge.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60})
var _n=Qe.extend({addHooks:function(){Yt(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Jt(this._map._container,"mousewheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=ae(t),i=this._map.options.wheelDebounceTime
this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date)
var n=Math.max(i-(+new Date-this._startTime),0)
clearTimeout(this._timer),this._timer=setTimeout(s(this._performZoom,this),n),se(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0
t._stop()
var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),s=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,o=i?Math.ceil(s/i)*i:s,r=t._limitZoom(e+(this._delta>0?o:-o))-e
this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(e+r):t.setZoomAround(this._lastMousePos,e+r))}})
Ge.addInitHook("addHandler","scrollWheelZoom",_n),Ge.mergeOptions({tap:!0,tapTolerance:15})
var gn=Qe.extend({addHooks:function(){Yt(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Jt(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(ne(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout)
var e=t.touches[0],i=e.target
this._startPos=this._newPos=new z(e.clientX,e.clientY),i.tagName&&"a"===i.tagName.toLowerCase()&&Me(i,"leaflet-active"),this._holdTimeout=setTimeout(s(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",e))},this),1e3),this._simulateEvent("mousedown",e),Yt(document,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),Jt(document,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var e=t.changedTouches[0],i=e.target
i&&i.tagName&&"a"===i.tagName.toLowerCase()&&Ae(i,"leaflet-active"),this._simulateEvent("mouseup",e),this._isTapValid()&&this._simulateEvent("click",e)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0]
this._newPos=new z(e.clientX,e.clientY),this._simulateEvent("mousemove",e)},_simulateEvent:function(t,e){var i=document.createEvent("MouseEvents")
i._simulated=!0,e.target._simulatedClick=!0,i.initMouseEvent(t,!0,!0,window,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(i)}})
xt&&!wt&&Ge.addInitHook("addHandler","tap",gn),Ge.mergeOptions({touchZoom:xt&&!nt,bounceAtZoomLimits:!0})
var vn=Qe.extend({addHooks:function(){Me(this._map._container,"leaflet-touch-zoom"),Yt(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Ae(this._map._container,"leaflet-touch-zoom"),Jt(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var e=this._map
if(t.touches&&2===t.touches.length&&!e._animatingZoom&&!this._zooming){var i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1])
this._centerPoint=e.getSize()._divideBy(2),this._startLatLng=e.containerPointToLatLng(this._centerPoint),"center"!==e.options.touchZoom&&(this._pinchStartLatLng=e.containerPointToLatLng(i.add(n)._divideBy(2))),this._startDist=i.distanceTo(n),this._startZoom=e.getZoom(),this._moved=!1,this._zooming=!0,e._stop(),Yt(document,"touchmove",this._onTouchMove,this),Yt(document,"touchend",this._onTouchEnd,this),ne(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),o=i.distanceTo(n)/this._startDist
if(this._zoom=e.getScaleZoom(o,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&o<1||this._zoom>e.getMaxZoom()&&o>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===o)return}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint)
if(1===o&&0===r.x&&0===r.y)return
this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom)}this._moved||(e._moveStart(!0,!1),this._moved=!0),T(this._animRequest)
var a=s(e._move,e,this._center,this._zoom,{pinch:!0,round:!1})
this._animRequest=P(a,this,!0),ne(t)}},_onTouchEnd:function(){this._moved&&this._zooming?(this._zooming=!1,T(this._animRequest),Jt(document,"touchmove",this._onTouchMove),Jt(document,"touchend",this._onTouchEnd),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))):this._zooming=!1}})
Ge.addInitHook("addHandler","touchZoom",vn),Ge.BoxZoom=pn,Ge.DoubleClickZoom=dn,Ge.Drag=mn,Ge.Keyboard=fn,Ge.ScrollWheelZoom=_n,Ge.Tap=gn,Ge.TouchZoom=vn
var yn=window.L
window.L=t,Object.freeze=e,t.version="1.3.1",t.noConflict=function(){return window.L=yn,this},t.Control=qe,t.control=$e,t.Browser=Mt,t.Evented=A,t.Mixin=ei,t.Util=E,t.Class=C,t.Handler=Qe,t.extend=i,t.bind=s,t.stamp=r,t.setOptions=d,t.DomEvent=ve,t.DomUtil=Ue,t.PosAnimation=We,t.Draggable=oi,t.LineUtil=mi,t.PolyUtil=_i,t.Point=z,t.point=B,t.Bounds=I,t.bounds=N,t.Transformation=W,t.transformation=G,t.Projection=yi,t.LatLng=D
t.latLng=j,t.LatLngBounds=R,t.latLngBounds=Z,t.CRS=H,t.GeoJSON=Ii,t.geoJSON=Ui,t.geoJson=Wi,t.Layer=ki,t.LayerGroup=Li,t.layerGroup=function(t,e){return new Li(t,e)},t.FeatureGroup=Si,t.featureGroup=function(t){return new Si(t)},t.ImageOverlay=Gi,t.imageOverlay=function(t,e,i){return new Gi(t,e,i)},t.VideoOverlay=qi,t.videoOverlay=function(t,e,i){return new qi(t,e,i)},t.DivOverlay=$i,t.Popup=Yi,t.popup=function(t,e){return new Yi(t,e)},t.Tooltip=Ki,t.tooltip=function(t,e){return new Ki(t,e)},t.Icon=Pi,t.icon=function(t){return new Pi(t)},t.DivIcon=Ji,t.divIcon=function(t){return new Ji(t)},t.Marker=Ci,t.marker=function(t,e){return new Ci(t,e)},t.TileLayer=Qi,t.tileLayer=tn,t.GridLayer=Xi
t.gridLayer=function(t){return new Xi(t)},t.SVG=ln,t.svg=un,t.Renderer=nn,t.Canvas=sn,t.canvas=on,t.Path=Mi,t.CircleMarker=Ai,t.circleMarker=function(t,e){return new Ai(t,e)},t.Circle=zi,t.circle=function(t,e,i){return new zi(t,e,i)},t.Polyline=Oi,t.polyline=function(t,e){return new Oi(t,e)},t.Polygon=Bi,t.polygon=function(t,e){return new Bi(t,e)},t.Rectangle=cn,t.rectangle=function(t,e){return new cn(t,e)},t.Map=Ge,t.map=function(t,e){return new Ge(t,e)}}(e)}(zn={exports:{}},zn.exports),zn.exports)
const Bn="https://developers.zomato.com/api/v2.1/",In={headers:{"content-type":"application/json","user-key":"129bc0569dfc22502d379d7881792082"}}
var Nn=function(t,e,i,n){return new(i||(i=Promise))(function(s,o){function r(t){try{h(n.next(t))}catch(t){o(t)}}function a(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,a)}h((n=n.apply(t,e||[])).next())})}
const Rn={attribution:"",accessToken:"pk.eyJ1IjoiamFtZXNkZXNieXJuZSIsImEiOiJjamR5dG5qODQxM3VtMzNxcDU1dXdrdmJ3In0.hJM4sfiAwMEC2bndm5JXIg",leafletUrl:"https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",maxZoom:17,startingZoom:14}
function Zn(t,e=53.35,i=-6.27,n={}){return On.map(t,n).setView([e,i],Rn.startingZoom)}function Dn(t){return On.tileLayer(Rn.leafletUrl,{attribution:Rn.attribution,maxZoom:Rn.maxZoom,id:"mapbox.streets",accessToken:Rn.accessToken}).addTo(t)}function jn(t){return Nn(this,void 0,void 0,function*(){return(yield(yield function(t){var e=t.latitude
const i=void 0===e?53.35:e
var n=t.longitude
const s=`${Bn}/geocode?lat=${i}&lon=${void 0===n?-6.27:n}`
return fetch(s,In)}(t)).json()).nearby_restaurants})}function Fn(t,e,i){var n=e.location
const s=n.latitude,o=n.longitude
return On.marker([s,o]).on("click",i).addTo(t),e}function Hn(){return JSON.parse(localStorage.getItem("favouritedRestaurants"))}var Vn=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n)
else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r)
return o>3&&r&&Object.defineProperty(e,i,r),r},Un=function(t,e,i,n){return new(i||(i=Promise))(function(s,o){function r(t){try{h(n.next(t))}catch(t){o(t)}}function a(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,a)}h((n=n.apply(t,e||[])).next())})}
class Wn extends K{constructor(t){super(t),this.currentRoute="map",this.restaurants={},this.restaurant={},this.mapsEnabled=!0,this.userLocation={longitude:-6.27,latitude:53.35},this.mapsEnabled=navigator.onLine,window.addEventListener("online",()=>this.mapsEnabled=!0),window.addEventListener("offline",()=>this.mapsEnabled=!1),navigator.onLine||(this.currentRoute="restaurants-list")}get favouriteRestaurants(){return Object.keys(this.restaurants).filter(t=>this.restaurants[t].favourited).map(t=>this.restaurants[t])}didInsertElement(){this.populateNearby()}populateNearby(t=this.userLocation){return Un(this,void 0,void 0,function*(){let e=yield jn(t)
e=e.reduce((t,{restaurant:e})=>Object.assign({},t,{[e.R.res_id]:e}),{}),this.restaurants=Object.assign({},this.restaurants,e,Hn())})}setRoute(t,e={}){this.currentRoute=t,this.restaurant=e}toggleMaps(){this.mapsEnabled=navigator.onLine}updateRestaurant(t){this.restaurant=t,t.favourited?function(t){localStorage.setItem("favouritedRestaurants",JSON.stringify(Object.assign({},Hn(),{[t.R.res_id]:t})))}(t):function(t){const e=JSON.parse(localStorage.getItem("favouritedRestaurants"))
delete e[t.R.res_id],localStorage.setItem("favouritedRestaurants",JSON.stringify(e))}(t),this.restaurants=Object.assign({},this.restaurants,{[t.R.res_id]:t})}updateUserLocation(t){this.userLocation=Object.assign({},t),this.populateNearby(t)}}Vn([F],Wn.prototype,"currentRoute",void 0),Vn([F],Wn.prototype,"restaurants",void 0),Vn([F],Wn.prototype,"restaurant",void 0),Vn([F],Wn.prototype,"mapsEnabled",void 0),Vn([F],Wn.prototype,"userLocation",void 0),Vn([F("restaurants")],Wn.prototype,"favouriteRestaurants",null)
const Gn=navigator.geolocation,qn={startingZoom:14}
var $n=function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n)
else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r)
return o>3&&r&&Object.defineProperty(e,i,r),r},Yn=function(t,e,i,n){return new(i||(i=Promise))(function(s,o){function r(t){try{h(n.next(t))}catch(t){o(t)}}function a(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,a)}h((n=n.apply(t,e||[])).next())})}
class Kn extends K{constructor(){super(...arguments),this.selectedRestaurant={},this.existingMarkers=[],this.isLoading=!1,this.map=null}get element(){return this.bounds.firstNode}setSelected(t){return()=>this.selectedRestaurant=t}removeSelected(t){this.selectedRestaurant={}}didInsertElement(){const t=Zn(this.element.querySelector("#map"))
Dn(t),this.map=t,this.addMarkers()}didUpdate(){this.addMarkers()}getUserLocation(){return Yn(this,void 0,void 0,function*(){this.toggleLoading()
try{const t=yield new Promise(t=>Gn.getCurrentPosition(e=>t(e)));(function(t,e){const i=e.latitude,n=e.longitude
t.setView([i,n],qn.startingZoom)})(this.map,t.coords),this.args.updateUserLocation(t.coords)}catch(t){}this.toggleLoading()})}toggleLoading(){this.isLoading=!this.isLoading}addMarkers(){const t=this.map,e=this.args.restaurants
t&&Object.keys(e).forEach(i=>{this.existingMarkers.includes(i)||(Fn(t,e[i],this.setSelected(e[i])),this.existingMarkers.push(i))})}}$n([F],Kn.prototype,"selectedRestaurant",void 0),$n([F],Kn.prototype,"existingMarkers",void 0),$n([F],Kn.prototype,"isLoading",void 0)
class Jn extends K{constructor(){super(...arguments),this.map={},this.warningText="Warning this will bring you to another site from which you can never return!!! But there will also be useful information and whatever ..."}get element(){return this.bounds.firstNode}didInsertElement(){const t=this.args.restaurant
var e=t.location
const i=e.latitude,n=e.longitude,s=Zn(this.element.querySelector("#map"),i,n,{zoomControl:!1})
Dn(s),Fn(s,t,()=>{}),this.map=s}get isFavourited(){return this.args.restaurant.favourited}toggleFavouriteRestaurant(){this.args.updateRestaurant(Object.assign({},this.args.restaurant,{favourited:!this.args.restaurant.favourited}))}openMenu(t){confirm(this.warningText)&&(window.location=t.menu_url)}}(function(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n)
else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r)
o>3&&r&&Object.defineProperty(e,i,r)})([F("args")],Jn.prototype,"isFavourited",null)
var Xn={"component:/glimmer_eats/components/About":class extends K{},"template:/glimmer_eats/components/About":{id:"ZINluEHp",block:'{"symbols":[],"statements":[[6,"div"],[10,"class","container"],[8],[0,"\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n\\n    "],[6,"div"],[10,"class","col-12 pt-5 mt-5 text-center"],[8],[0,"\\n      "],[6,"a"],[10,"href","https://glimmerjs.com"],[10,"class","glimmer-logo"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[10,"class","col-12 mt-4 text-center"],[8],[0,"\\n      "],[6,"h4"],[10,"class","text-light"],[8],[0,"\\n        A Progressive Web App built using "],[6,"a"],[10,"class","text-orange"],[10,"href","https://glimmerjs.com"],[8],[0,"Glimmer.js"],[9],[0,".\\n      "],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[10,"class","col-12 mt-5 text-center"],[8],[0,"\\n      "],[6,"a"],[10,"href","https://github.com/James-Byrne/glimmer_eats"],[8],[0,"\\n        "],[6,"i"],[10,"class","fab fa-github fa-4x text-light"],[8],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[10,"class","col-12 mt-4 text-center"],[8],[0,"\\n      "],[6,"h4"],[10,"class","text-light"],[8],[0,"\\n        "],[6,"a"],[10,"href","https://james-byrne.github.io"],[10,"class","text-orange"],[8],[0,"Ohh I\'m James btw!"],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/About"}},"component:/glimmer_eats/components/GlimmerEats":Wn,"template:/glimmer_eats/components/GlimmerEats":{id:"8/Kjz6AD",block:'{"symbols":[],"statements":[[4,"if",[[26,"eq",[[22,["currentRoute"]],"map"],null]],null,{"statements":[[4,"if",[[22,["mapsEnabled"]]],null,{"statements":[[0,"    "],[5,"GlimmerMap",[],[["@restaurants","@userLocation","@setRoute","@updateUserLocation"],[[20,"restaurants"],[20,"userLocation"],[26,"action",[[22,["setRoute"]],"restaurant"],null],[26,"action",[[22,["updateUserLocation"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"div"],[10,"class","container pt-5 mt-5"],[8],[0,"\\n      "],[6,"div"],[10,"class","row"],[8],[0,"\\n        "],[6,"div"],[10,"class","col text-center"],[8],[0,"\\n          "],[6,"i"],[10,"class","fas fa-map-signs fa-3x text-primary"],[8],[9],[0,"\\n          "],[6,"br"],[8],[9],[0,"\\n          "],[6,"br"],[8],[9],[0,"\\n          "],[6,"br"],[8],[9],[0,"\\n          "],[6,"h4"],[10,"class","text-primary"],[8],[0,"\\n            Maps are disabled while offline. But the rest of the site should work just fine!\\n          "],[9],[0,"\\n        "],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[26,"eq",[[22,["currentRoute"]],"restaurants-list"],null]],null,{"statements":[[0,"  "],[5,"RestaurantsList",[],[["@restaurants","@setRoute"],[[20,"restaurants"],[26,"action",[[22,["setRoute"]],"restaurant"],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[26,"eq",[[22,["currentRoute"]],"favourites"],null]],null,{"statements":[[4,"if",[[26,"gt",[[22,["favouriteRestaurants","length"]],0],null]],null,{"statements":[[0,"    "],[5,"RestaurantsList",[],[["@restaurants","@setRoute"],[[20,"favouriteRestaurants"],[26,"action",[[22,["setRoute"]],"restaurant"],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"div"],[10,"class","container pt-5 mt-5"],[8],[0,"\\n      "],[6,"div"],[10,"class","row"],[8],[0,"\\n        "],[6,"div"],[10,"class","col text-center"],[8],[0,"\\n          "],[6,"h3"],[10,"class","text-primary"],[8],[0,"\\n            Your Favourites will show up here. Just keep an eye out for the favourite button!\\n          "],[9],[0,"\\n          "],[6,"button"],[10,"class","btn btn-fab btn-primary circle mt-5"],[8],[0,"\\n            "],[6,"i"],[10,"class","far fa-star fa-2x"],[8],[9],[0,"\\n          "],[9],[0,"\\n        "],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[26,"and",[[26,"eq",[[22,["currentRoute"]],"restaurant"],null],[22,["restaurant","R","res_id"]]],null]],null,{"statements":[[0,"  "],[5,"RestaurantView",[],[["@restaurant","@updateRestaurant"],[[20,"restaurant"],[26,"action",[[22,["updateRestaurant"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[26,"eq",[[22,["currentRoute"]],"about"],null]],null,{"statements":[[0,"  "],[5,"About",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"h4"],[10,"class","text-light text-center pt-5 mt-5"],[8],[0,"how did you get here?"],[9],[0,"\\n"]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}],[5,"Navbar",[],[["@currentRoute","@setRoute"],[[20,"currentRoute"],[26,"action",[[22,["setRoute"]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/GlimmerEats"}},"component:/glimmer_eats/components/GlimmerMap":Kn,"template:/glimmer_eats/components/GlimmerMap":{id:"UGYaHM6D",block:'{"symbols":["@setRoute"],"statements":[[6,"div"],[10,"class","glimmer-map"],[8],[0,"\\n  "],[6,"div"],[10,"id","map"],[8],[9],[0,"\\n\\n  "],[6,"button"],[10,"class","btn btn-fab btn-primary circle position-bottom-right"],[11,"onclick",[26,"action",[[22,["getUserLocation"]]],null],null],[8],[0,"\\n"],[4,"if",[[26,"eq",[[22,["isLoading"]],true],null]],null,{"statements":[[0,"      "],[6,"i"],[10,"class","fas fa-spinner fa-spin fa-2x"],[8],[9],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"i"],[10,"class","far fa-compass fa-2x"],[8],[9],[0,"\\n"]],"parameters":[]}],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"],[5,"RestaurantPreview",[],[["@restaurant","@removeSelected","@setRoute"],[[20,"selectedRestaurant"],[26,"action",[[22,["removeSelected"]]],null],[26,"action",[[21,1,[]]],null]]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/GlimmerMap"}},"component:/glimmer_eats/components/Navbar":class extends K{},"template:/glimmer_eats/components/Navbar":{id:"v17MBbUh",block:'{"symbols":["@currentRoute","@setRoute"],"statements":[[6,"div"],[10,"class","container-fluid text-center glimmer-navbar pt-3 pb-3"],[8],[0,"\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n\\n    "],[6,"div"],[11,"class",[27,["col ",[26,"if",[[26,"eq",[[21,1,[]],"map"],null],"selected"],null]]]],[11,"onclick",[26,"action",[[21,2,[]],"map"],null],null],[8],[0,"\\n      "],[6,"i"],[10,"class","fas fa-map-marker"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[11,"class",[27,["col ",[26,"if",[[26,"eq",[[21,1,[]],"restaurants-list"],null],"selected"],null]]]],[11,"onclick",[26,"action",[[21,2,[]],"restaurants-list"],null],null],[8],[0,"\\n      "],[6,"i"],[10,"class","fas fa-list-ul"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[11,"class",[27,["col ",[26,"if",[[26,"eq",[[21,1,[]],"favourites"],null],"selected"],null]]]],[11,"onclick",[26,"action",[[21,2,[]],"favourites"],null],null],[8],[0,"\\n      "],[6,"i"],[10,"class","fas fa-star"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[11,"class",[27,["col ",[26,"if",[[26,"eq",[[21,1,[]],"about"],null],"selected"],null]]]],[11,"onclick",[26,"action",[[21,2,[]],"about"],null],null],[8],[0,"\\n      "],[6,"i"],[10,"class","fas fa-question"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/Navbar"}},"component:/glimmer_eats/components/RestaurantPreview":class extends K{},"template:/glimmer_eats/components/RestaurantPreview":{id:"gNVwEI8N",block:'{"symbols":["@restaurant","@setRoute","@removeSelected"],"statements":[[4,"if",[[21,1,["name"]]],null,{"statements":[[0,"  "],[6,"div"],[10,"id","#restaurant-preview"],[10,"class","restaurant-preview"],[8],[0,"\\n    "],[6,"div"],[10,"class","container-fluid"],[8],[0,"\\n      "],[6,"div"],[10,"class","row"],[8],[0,"\\n\\n        "],[6,"div"],[10,"class","col-4 preview-thumbnail"],[11,"style",[27,["background-image: url(",[21,1,["thumb"]],")"]]],[8],[0,"\\n        "],[9],[0,"\\n\\n        "],[6,"div"],[10,"class","col"],[8],[0,"\\n          "],[6,"div"],[10,"class","preview-content"],[8],[0,"\\n            "],[6,"h4"],[10,"class","title"],[8],[1,[21,1,["name"]],false],[9],[0,"\\n\\n            "],[6,"p"],[8],[0,"\\n              "],[6,"i"],[10,"class","fas fa-star"],[8],[9],[0,"\\n              "],[1,[21,1,["user_rating","aggregate_rating"]],false],[0," / 5\\n            "],[9],[0,"\\n\\n            "],[6,"button"],[10,"class","btn btn-primary"],[11,"onclick",[26,"action",[[21,2,[]],[21,1,[]]],null],null],[8],[0,"See more"],[9],[0,"\\n          "],[9],[0,"\\n\\n        "],[9],[0,"\\n\\n        "],[6,"button"],[10,"class","btn btn-fab-sm btn-transparent circle position-top-right text-light"],[11,"onclick",[26,"action",[[21,3,[]]],null],null],[8],[0,"\\n            "],[6,"i"],[10,"class","fas fa-times"],[8],[9],[0,"\\n        "],[9],[0,"\\n\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/RestaurantPreview"}},"component:/glimmer_eats/components/RestaurantView":Jn,"template:/glimmer_eats/components/RestaurantView":{id:"pS2Vl4f9",block:'{"symbols":["c","@restaurant"],"statements":[[6,"div"],[10,"class","container-fluid restaurant-view"],[8],[0,"\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n    "],[6,"div"],[10,"class","col"],[8],[0,"\\n      "],[6,"div"],[10,"id","map"],[10,"class","rv-map"],[8],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[6,"div"],[10,"class","row mt-4"],[8],[0,"\\n    "],[6,"div"],[10,"class","col-4"],[8],[0,"\\n      "],[6,"img"],[11,"src",[27,[[21,2,["thumb"]]]]],[10,"alt","Restaurant Image"],[10,"class","circle"],[10,"height","80"],[10,"width","80"],[8],[9],[0,"\\n    "],[9],[0,"\\n\\n    "],[6,"div"],[10,"class","col"],[8],[0,"\\n      "],[6,"h3"],[10,"class","card-title text-light"],[8],[1,[21,2,["name"]],false],[9],[0,"\\n      "],[6,"div"],[10,"class","card-badge-row"],[8],[0,"\\n"],[4,"each",[[26,"split-on",[[21,2,["cuisines"]],","],null]],[["key"],["@index"]],{"statements":[[0,"          "],[6,"span"],[10,"class","badge badge-pill badge-primary"],[8],[1,[21,1,[]],false],[9],[0,"\\n"]],"parameters":[1]},null],[0,"      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n    "],[6,"div"],[10,"class","col mt-2"],[8],[0,"\\n      "],[6,"h4"],[10,"class","text-primary"],[8],[0,"User Rating"],[9],[0,"\\n      "],[6,"p"],[10,"class","text-light"],[8],[0,"\\n        "],[6,"i"],[10,"class","fas fa-star"],[8],[9],[0,"\\n        "],[1,[21,2,["user_rating","aggregate_rating"]],false],[0," / 5\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n    "],[6,"div"],[10,"class","col"],[8],[0,"\\n      "],[6,"h4"],[10,"class","text-primary"],[8],[0,"Average Cost"],[9],[0,"\\n      "],[6,"p"],[10,"class","text-light"],[8],[1,[21,2,["currency"]],false],[0," "],[1,[26,"div",[[21,2,["average_cost_for_two"]],2],null],false],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[6,"div"],[10,"class","row"],[8],[0,"\\n    "],[6,"div"],[10,"class","col mt-2"],[8],[0,"\\n      "],[6,"button"],[10,"class","btn btn-primary btn-small"],[11,"onclick",[26,"action",[[22,["openMenu"]],[21,2,[]]],null],null],[8],[0,"\\n        View Menu\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n\\n  "],[6,"button"],[10,"class","btn btn-fab btn-primary circle position-bottom-right"],[11,"onclick",[26,"action",[[22,["toggleFavouriteRestaurant"]]],null],null],[8],[0,"\\n"],[4,"if",[[26,"eq",[[22,["isFavourited"]],true],null]],null,{"statements":[[0,"      "],[6,"i"],[10,"class","fas fa-star fa-2x"],[8],[9],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"i"],[10,"class","far fa-star fa-2x"],[8],[9],[0,"\\n"]],"parameters":[]}],[0,"  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/RestaurantView"}},"component:/glimmer_eats/components/RestaurantsList":class extends K{},"template:/glimmer_eats/components/RestaurantsList":{id:"VdJI/sr4",block:'{"symbols":["r","c","@setRoute","@restaurants"],"statements":[[6,"div"],[10,"class","container restaurants-list pb-5 mb-5"],[8],[0,"\\n"],[4,"each",[[21,4,[]]],[["key"],["@index"]],{"statements":[[0,"\\n    "],[6,"div"],[10,"class","row"],[8],[0,"\\n      "],[6,"div"],[10,"class","col"],[8],[0,"\\n        "],[6,"div"],[10,"class","card mt-3"],[8],[0,"\\n\\n          "],[6,"div"],[10,"class","card-body"],[11,"onclick",[26,"action",[[21,3,[]],[21,1,[]]],null],null],[8],[0,"\\n            "],[6,"div"],[10,"class","row"],[8],[0,"\\n\\n              "],[6,"div"],[10,"class","col-3"],[8],[0,"\\n                "],[6,"img"],[11,"src",[27,[[21,1,["thumb"]]]]],[10,"alt","Restaurant Image"],[10,"height","70"],[10,"width","70"],[10,"class","circle"],[8],[9],[0,"\\n              "],[9],[0,"\\n\\n              "],[6,"div"],[10,"class","col pr-4"],[8],[0,"\\n                "],[6,"h5"],[10,"class","card-title"],[8],[1,[21,1,["name"]],false],[9],[0,"\\n                "],[6,"div"],[10,"class","card-badge-row"],[8],[0,"\\n"],[4,"each",[[26,"split-on",[[21,1,["cuisines"]],","],null]],[["key"],["@index"]],{"statements":[[0,"                    "],[6,"span"],[10,"class","badge badge-pill badge-primary"],[8],[1,[21,2,[]],false],[9],[0,"\\n"]],"parameters":[2]},null],[0,"                "],[9],[0,"\\n              "],[9],[0,"\\n            "],[9],[0,"\\n\\n            "],[6,"span"],[10,"class","card-right-chevron"],[8],[0,"\\n              "],[6,"i"],[10,"class","fas fa-chevron-right"],[8],[9],[0,"\\n            "],[9],[0,"\\n          "],[9],[0,"\\n\\n        "],[9],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n\\n"]],"parameters":[1]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/glimmer-eats/components/RestaurantsList"}},"helper:/glimmer_eats/components/and":function([t,e]){return t&&e},"helper:/glimmer_eats/components/div":function([t,e]){return Math.round(t/e)},"helper:/glimmer_eats/components/eq":function([t,e]){return t===e},"helper:/glimmer_eats/components/gt":function([t,e]){return t>e},"helper:/glimmer_eats/components/split-on":function([t="",e=""]){return t.length>0?t.split(e):[]}},Qn={app:{name:"glimmer_eats",rootName:"glimmer_eats"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const ts=new class extends nn{constructor(){let t=new An(Xn),e=new Mn(Qn,t)
const i=document.body
super({builder:new Ln({element:i,nextSibling:null}),loader:new kn(e),renderer:new Sn,resolver:e,rootName:Qn.app.rootName})}},es=document.getElementById("app")
q=(()=>{ts.scheduleRerender()}),ts.registerInitializer({initialize(t){t.register(`component-manager:/${ts.rootName}/component-managers/main`,Gi)}}),ts.renderComponent("GlimmerEats",es,null),ts.boot()})
