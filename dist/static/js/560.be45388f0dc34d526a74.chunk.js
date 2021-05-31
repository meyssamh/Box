(self.webpackChunkbox=self.webpackChunkbox||[]).push([[560],{4272:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a}),n(8075),n(111);var r=n(6516),s=n(991);const a=(o="container",r.Z.extend({name:`v-${o}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:e,data:n,children:r}){n.staticClass=`${o} ${n.staticClass||""}`.trim();const{attrs:s}=n;if(s){n.attrs={};const t=Object.keys(s).filter((t=>{if("slot"===t)return!1;const e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"==typeof e}));t.length&&(n.staticClass+=` ${t.join(" ")}`)}return e.id&&(n.domProps=n.domProps||{},n.domProps.id=e.id),t(e.tag,n,r)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:n,children:r}){let a;const{attrs:o}=n;return o&&(n.attrs={},a=Object.keys(o).filter((t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"==typeof e}))),e.id&&(n.domProps=n.domProps||{},n.domProps.id=e.id),t(e.tag,(0,s.ZP)(n,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),r)}});var o},8462:(t,e,n)=>{"use strict";n.d(e,{Z:()=>h}),n(111);var r=n(6516),s=n(991),a=n(8168);const o=["sm","md","lg","xl"],i=["start","end","center"];function l(t,e){return o.reduce(((n,r)=>(n[t+(0,a.jC)(r)]=e(),n)),{})}const c=t=>[...i,"baseline","stretch"].includes(t),u=l("align",(()=>({type:String,default:null,validator:c}))),d=t=>[...i,"space-between","space-around"].includes(t),f=l("justify",(()=>({type:String,default:null,validator:d}))),p=t=>[...i,"space-between","space-around","stretch"].includes(t),g=l("alignContent",(()=>({type:String,default:null,validator:p}))),y={align:Object.keys(u),justify:Object.keys(f),alignContent:Object.keys(g)},m={align:"align",justify:"justify",alignContent:"align-content"};function b(t,e,n){let r=m[t];if(null!=n)return e&&(r+=`-${e.replace(t,"")}`),r+=`-${n}`,r.toLowerCase()}const v=new Map,h=r.Z.extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...u,justify:{type:String,default:null,validator:d},...f,alignContent:{type:String,default:null,validator:p},...g},render(t,{props:e,data:n,children:r}){let a="";for(const t in e)a+=String(e[t]);let o=v.get(a);if(!o){let t;for(t in o=[],y)y[t].forEach((n=>{const r=e[n],s=b(t,n,r);s&&o.push(s)}));o.push({"no-gutters":e.noGutters,"row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),v.set(a,o)}return t(e.tag,(0,s.ZP)(n,{staticClass:"row",class:o}),r)}})},991:(t,e,n)=>{"use strict";n.d(e,{ZP:()=>i,ze:()=>c,bp:()=>u});var r=n(8168);const s=/;(?![^(]*\))/g,a=/:(.*)/;function o(t){const e={};for(const n of t.split(s)){let[t,s]=n.split(a);t=t.trim(),t&&("string"==typeof s&&(s=s.trim()),e[(0,r._A)(t)]=s)}return e}function i(){const t={};let e,n=arguments.length;for(;n--;)for(e of Object.keys(arguments[n]))switch(e){case"class":case"directives":arguments[n][e]&&(t[e]=c(t[e],arguments[n][e]));break;case"style":arguments[n][e]&&(t[e]=l(t[e],arguments[n][e]));break;case"staticClass":if(!arguments[n][e])break;void 0===t[e]&&(t[e]=""),t[e]&&(t[e]+=" "),t[e]+=arguments[n][e].trim();break;case"on":case"nativeOn":arguments[n][e]&&(t[e]=u(t[e],arguments[n][e]));break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":if(!arguments[n][e])break;t[e]||(t[e]={}),t[e]={...arguments[n][e],...t[e]};break;default:t[e]||(t[e]=arguments[n][e])}return t}function l(t,e){return t?e?(t=(0,r.TI)("string"==typeof t?o(t):t)).concat("string"==typeof e?o(e):e):t:e}function c(t,e){return e?t&&t?(0,r.TI)(t).concat(e):e:t}function u(...t){if(!t[0])return t[1];if(!t[1])return t[0];const e={};for(let n=2;n--;){const r=t[n];for(const t in r)r[t]&&(e[t]?e[t]=[].concat(r[t],e[t]):e[t]=r[t])}return e}},111:()=>{},8075:()=>{},2560:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>C});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.hasSavedItems?n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{md:"10","offset-md":"1",xl:"6","offset-xl":"3"}},[n("app-list")],1)],1)],1):n("app-sheet"),t._v(" "),t.renderAlert?n("app-alert"):t._e(),t._v(" "),n("app-action-button")],1)};r._withStripped=!0;const s={name:"Body",components:{"app-sheet":function(){return n.e(135).then(n.bind(n,6135))},"app-action-button":function(){return Promise.all([n.e(313),n.e(821),n.e(868)]).then(n.bind(n,2107))},"app-list":function(){return Promise.all([n.e(313),n.e(374),n.e(821),n.e(292),n.e(547),n.e(124),n.e(965)]).then(n.bind(n,4915))},"app-alert":function(){return Promise.all([n.e(313),n.e(352)]).then(n.bind(n,8016))}},computed:{hasSavedItems:function(){return 0!==this.$store.getters.items.length},renderAlert:function(){return"serviceWorker"in navigator&&"PushManager"in window}}};var a=n(1900),o=n(3453),i=n.n(o),l=(n(111),n(6516)),c=n(991),u=n(8168);const d=["sm","md","lg","xl"],f=d.reduce(((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t)),{}),p=d.reduce(((t,e)=>(t["offset"+(0,u.jC)(e)]={type:[String,Number],default:null},t)),{}),g=d.reduce(((t,e)=>(t["order"+(0,u.jC)(e)]={type:[String,Number],default:null},t)),{}),y={col:Object.keys(f),offset:Object.keys(p),order:Object.keys(g)};function m(t,e,n){let r=t;if(null!=n&&!1!==n)return e&&(r+=`-${e.replace(t,"")}`),"col"!==t||""!==n&&!0!==n?(r+=`-${n}`,r.toLowerCase()):r.toLowerCase()}const b=new Map,v=l.Z.extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...f,offset:{type:[String,Number],default:null},...p,order:{type:[String,Number],default:null},...g,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:n,children:r,parent:s}){let a="";for(const t in e)a+=String(e[t]);let o=b.get(a);if(!o){let t;for(t in o=[],y)y[t].forEach((n=>{const r=e[n],s=m(t,n,r);s&&o.push(s)}));const n=o.some((t=>t.startsWith("col-")));o.push({col:!n||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),b.set(a,o)}return t(e.tag,(0,c.ZP)(n,{class:o}),r)}});var h=n(4272),S=n(8462),k=(0,a.Z)(s,r,[],!1,null,null,null);i()(k,{VCol:v,VContainer:h.Z,VRow:S.Z}),k.options.__file="src/components/body/Body.vue";const C=k.exports}}]);