!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=React},function(e,t){e.exports=ReactRedux},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7);function o(){return{type:t.LOCK}}function c(){return{type:t.UNLOCK}}function l(e){return{type:t.UPDATE_OUTPUT,output:e}}t.LOCK="LOCK",t.UNLOCK="UNLOCK",t.EXECUTE="EXECUTE",t.UPDATE_OUTPUT="UPDATE_OUTPUT",t.UPDATE_EXAMPLES="UPDATE_EXAMPLES",t.SELECT_EXAMPLE="SELECT_EXAMPLE",t.UPDATE_CODE="UPDATE_CODE",t.lock=o,t.updateCode=function(e){return{type:t.UPDATE_CODE,code:e}},t.unlock=c,t.updateOutput=l,t.updateExamples=function(e){return{type:t.UPDATE_EXAMPLES,examples:e}},t.selectExample=(e=>(n,r)=>{const o=r(),c=parseInt(e.target.value);n({type:t.SELECT_EXAMPLE,selected:c}),-1!=c&&n({type:t.UPDATE_CODE,code:o.examples[c].body})}),t.execute=(e=>n=>{n({type:t.EXECUTE}),n(o()),fetch("/execute",{method:"POST",body:e}).then(e=>{let t="";const o=e.body.getReader(),a=new TextDecoder,u=()=>o.read().then(s),s=e=>{var o=a.decode(e.value||new Uint8Array(0),{stream:!e.done});if(t+=o,n(l(r.default(t))),!e.done)return u();n(c())};return u()}).catch(e=>{n(c()),alert("An error occured, please try again..."),console.log(e)})})},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function l(e){try{u(r.next(e))}catch(e){c(e)}}function a(e){try{u(r.throw(e))}catch(e){c(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(l,a)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),c=n(4),l=n(1),a=n(5),u=n(13),s=n(2),i=()=>c.render(o.createElement(l.Provider,{store:u.store},o.createElement(a.default,null)),document.getElementById("root"));u.store.subscribe(()=>i()),i();(()=>r(this,void 0,void 0,function*(){const e=yield fetch("/examples/examples.json"),t=yield e.json(),n=Promise.all(t.map(e=>r(this,void 0,void 0,function*(){const t=yield fetch(`/examples/${e.file}`);return e.body=yield t.text(),e}))),o=yield n;u.store.dispatch(s.updateExamples(o))}))()},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1),c=n(6),l=n(9),a=n(11),u=n(12);t.default=o.connect(e=>({name:e.name,examples:e.examples,selected:e.selectedExample}))(()=>r.createElement("div",{className:"container"},r.createElement(a.default,null),r.createElement("div",{className:"toolbar"},r.createElement(c.default,null)),r.createElement("div",{className:"main"},r.createElement(l.default,null),r.createElement(u.default,null)),r.createElement("footer",null,r.createElement("p",null,"Made with ♥ by ",r.createElement("a",{href:"http://twitter/mt_harrison"},"@mt_harrison")))))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1),c={selectExample:n(2).selectExample};t.default=o.connect(e=>({examples:e.examples,selected:e.selectedExample}),c)(e=>r.createElement("div",{className:"examples-container"},r.createElement("label",{htmlFor:"examples"},"Load Example:"),r.createElement("select",{name:"examples",id:"examples",value:e.selected,onChange:e.selectExample},r.createElement("option",{value:"-1"}),e.examples.map((e,t)=>r.createElement("option",{value:t,key:t},e.name)))))},function(e,t,n){"use strict";const r=n(8),o=e=>"string"==typeof e?e.replace(r(),""):e;e.exports=o,e.exports.default=o},function(e,t,n){"use strict";e.exports=(e=>{e=Object.assign({onlyFirst:!1},e);const t=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(t,e.onlyFirst?void 0:"g")})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(10),c=n(1),l=n(2);const a={execute:l.execute,updateCode:l.updateCode};t.default=c.connect(e=>({locked:e.locked,code:e.code}),a)(class extends r.Component{componentDidMount(){this.editor=o.edit("code"),this.editor.setHighlightActiveLine(!1),this.editor.setShowPrintMargin(!1)}componentDidUpdate(e){e.code!=this.props.code&&this.editor.setValue(this.props.code)}render(){return r.createElement("div",{className:"editor-container"},r.createElement("pre",{className:"blue-bg",id:"code",contentEditable:!0}),r.createElement("button",{onClick:()=>this.props.execute(this.editor.getValue()),type:"button",className:"btn"},this.props.locked?"...":"Execute"))}})},function(e,t){e.exports=ace},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1);t.default=o.connect(e=>({name:e.name,url:e.url}))(e=>r.createElement("header",null,r.createElement("a",{href:e.url},r.createElement("img",{width:"80px",src:"/images/deno.svg",alt:e.name})),r.createElement("a",{href:e.url},r.createElement("h1",null,e.name)),r.createElement("ul",null,r.createElement("li",null,r.createElement("a",{href:"http://",target:"_blank",rel:"noopener noreferrer"},"About")),r.createElement("li",null,r.createElement("a",{href:"http://",target:"_blank",rel:"noopener noreferrer"},"Contribute")))))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(1);t.default=o.connect(e=>({output:e.output}))(e=>r.createElement("div",{className:"output-container"},r.createElement("pre",{className:"blue-bg",id:"output"},e.output)))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(14),o=n(15),c=n(2),l={output:"// output",name:"Deno playground",locked:!1,examples:[],selectedExample:-1,url:"http://deno-play.app",code:""};t.store=r.createStore(function(e=l,t){switch(console.log(t),t.type){case c.LOCK:return Object.assign({},e,{locked:!0});case c.UNLOCK:return Object.assign({},e,{locked:!1});case c.UPDATE_OUTPUT:return Object.assign({},e,{output:t.output});case c.UPDATE_EXAMPLES:return Object.assign({},e,{examples:t.examples});case c.SELECT_EXAMPLE:return Object.assign({},e,{selectedExample:t.selected});case c.UPDATE_CODE:return Object.assign({},e,{code:t.code});default:return e}},r.applyMiddleware(o.default))},function(e,t){e.exports=Redux},function(e,t){e.exports=ReduxThunk}]);
//# sourceMappingURL=bundle.js.map