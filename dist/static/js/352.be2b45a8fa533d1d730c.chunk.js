(self.webpackChunkbox=self.webpackChunkbox||[]).push([[352],{9269:(t,e,s)=>{"use strict";s.d(e,{Z:()=>r});const r=s(8881).Z},2287:(t,e,s)=>{"use strict";s.d(e,{Z:()=>r});const r=s(4226).Z.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){let e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":e,...this.$attrs},on:this.$listeners})}})},5754:(t,e,s)=>{"use strict";s.d(e,{Z:()=>r}),s(8075);const r=(0,s(8168).Ji)("spacer","div","v-spacer")},3528:(t,e,s)=>{"use strict";s.d(e,{Z:()=>r});const r=s(5101).Z},8016:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>f});var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-overlay",{attrs:{value:t.alertDisplay,"z-index":210}}),t._v(" "),s("v-alert",{staticClass:"ml-4",staticStyle:{position:"absolute",bottom:"10px","z-index":"215"},attrs:{value:t.alertDisplay,type:"info",color:"brown lighten-1",border:"left",elevation:"10",transition:"slide-x-transition","max-width":"90%"}},[s("h3",{staticClass:"text-h6"},[t._v("\n      "+t._s(t.$t("alertTitle"))+"\n    ")]),t._v(" "),s("v-divider",{staticClass:"my-4"}),t._v(" "),s("v-row",{attrs:{align:"center","no-gutters":""}},[s("p",{staticClass:"text-caption"},[t._v("\n        "+t._s(t.$t("alertMessage"))+"\n      ")]),t._v(" "),s("br"),t._v(" "),s("p",{staticClass:"text-caption"},[t._v("\n        "+t._s(t.$t("alertTipp"))+"\n      ")]),t._v(" "),s("v-row",{staticClass:"mt-6 mb-2 mr-2"},[s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"brown",attrs:{small:"",elevation:"4"},on:{click:t.hideAlert}},[t._v("\n          "+t._s(t.$t("close"))+"\n        ")])],1)],1)],1)],1)};r._withStripped=!0;var i=s(1900),o=s(3453),l=s.n(o),n=s(3342),a=s(9269),c=s(3528),h=s(4705),d=s(4226);const p=s(6516).Z.extend({name:"transitionable",props:{mode:String,origin:String,transition:String}});var v=s(2539),u=s(3359);const m=(0,v.Z)(n.Z,h.Z,p).extend({name:"v-alert",props:{border:{type:String,validator:t=>["top","right","bottom","left"].includes(t)},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:t=>"string"==typeof t||!1===t},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:t=>["info","error","success","warning"].includes(t)},value:{type:Boolean,default:!0}},computed:{__cachedBorder(){if(!this.border)return null;let t={staticClass:"v-alert__border",class:{[`v-alert__border--${this.border}`]:!0}};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible(){if(!this.dismissible)return null;const t=this.iconColor;return this.$createElement(a.Z,{staticClass:"v-alert__dismissible",props:{color:t,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:()=>this.isActive=!1}},[this.$createElement(c.Z,{props:{color:t}},this.closeIcon)])},__cachedIcon(){return this.computedIcon?this.$createElement(c.Z,{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes(){const t={...n.Z.options.computed.classes.call(this),"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text};return this.border&&(t[`v-alert--border-${this.border}`]=!0),t},computedColor(){return this.color||this.type},computedIcon(){return!1!==this.icon&&("string"==typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&`$${this.type}`)},hasColoredIcon(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText(){return this.text||this.outlined},iconColor(){return this.hasColoredIcon?this.computedColor:void 0},isDark(){return!(!this.type||this.coloredBorder||this.outlined)||d.Z.options.computed.isDark.call(this)}},created(){this.$attrs.hasOwnProperty("outline")&&(0,u.fK)("outline","outlined",this)},methods:{genWrapper(){const t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible];return this.$createElement("div",{staticClass:"v-alert__wrapper"},t)},genContent(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert(){let t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};return this.coloredBorder||(t=(this.hasText?this.setTextColor:this.setBackgroundColor)(this.computedColor,t)),this.$createElement("div",t,[this.genWrapper()])},toggle(){this.isActive=!this.isActive}},render(t){const e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}});var _=s(8881),g=s(2287),b=s(241),$=s(8462),C=s(5754),y=(0,i.Z)({name:"Alert",computed:{alertDisplay:function(){return this.$store.getters.alertDisplay}},methods:{hideAlert:function(){this.$store.dispatch("setAlertDisplay",!1)}}},r,[],!1,null,null,null);l()(y,{VAlert:m,VBtn:_.Z,VDivider:g.Z,VOverlay:b.Z,VRow:$.Z,VSpacer:C.Z}),y.options.__file="src/components/alert/Alert.vue";const f=y.exports}}]);