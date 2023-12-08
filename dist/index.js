"use strict";var p=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var P=Object.prototype.hasOwnProperty;var k=(e,t,n)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var N=(e,t)=>{for(var n in t)p(e,n,{get:t[n],enumerable:!0})},S=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of O(t))!P.call(e,o)&&o!==n&&p(e,o,{get:()=>t[o],enumerable:!(i=D(t,o))||i.enumerable});return e};var z=e=>S(p({},"__esModule",{value:!0}),e);var u=(e,t,n)=>(k(e,typeof t!="symbol"?t+"":t,n),n);var H={};N(H,{loadChatUi:()=>F,template:()=>A});module.exports=z(H);var f=require("lit-html");var K=require("lit-html"),B=({message:e})=>K.html`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Error: ${e}</title><style>body{font-family:Arial,sans-serif;background-color:#f7f9fc;color:#333;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;padding:0}.error-container{max-width:600px;padding:20px;background-color:#fff;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,.1);text-align:center}.error-header{font-size:24px;font-weight:700;margin-bottom:10px}.error-description{margin-bottom:20px}.error-hint{font-size:14px;color:#666}a{color:#007bff;text-decoration:none}a:hover{text-decoration:underline}</style></head><body><div class="error-container"><div class="error-header">Oops! ${e}</div><div class="error-description">We're sorry, but the Chat UI service is currently unavailable. Please try again later.</div><div class="error-hint">If the problem persists, please <a href="mailto:support@chatkitty.com">contact support</a>.</div></div></body></html>`;var m=class{constructor(t){u(this,"listeners");u(this,"port");this.listeners=new Map,t.addEventListener("message",n=>{let{type:i,payload:o}=n.data;if(!this.listeners.has(i))return;this.listeners.get(i).forEach(d=>{d(o)})}),this.port=t}subscribe(t,n){this.listeners.has(t)||this.listeners.set(t,[]),this.listeners.get(t).push(n)}unsubscribe(t,n){if(!this.listeners.has(t))return;let i=this.listeners.get(t),o=i.indexOf(n);o>-1&&i.splice(o,1)}dispatch(t){this.port.postMessage(t)}};var g="https://ui.chatkitty.com",_=(e,t)=>{let n=document.createElement("div");(0,f.render)(t,n),e.srcdoc=n.innerHTML},A=f.html,F=(e,t)=>{var b,C,E,x;let n=((b=e.container)==null?void 0:b.id)||"chat-ui",i=document.getElementById(n);if(!i)throw new Error(`Chat UI container not found. Please define a div with id "${n}" in your HTML page.`);if(i.hasChildNodes())throw new Error(`Chat UI container must be empty. Please remove all child elements from the div with id "${n}".`);i.style.display="relative",i.style.height=((C=e.container)==null?void 0:C.height)||"100vh",i.style.width=((E=e.container)==null?void 0:E.width)||"100%";let o=document.createElement("iframe");o.title="Chat UI",o.src=`${g}/chat?widget_id=${e.widgetId}${e.locale?`&locale=${e.locale}`:""}`,o.allow="autoplay; clipboard-write; fullscreen; geolocation; microphone",o.style.height="100%",o.style.width="100%",o.style.border="none";let y=new MessageChannel,d=y.port1,a=new m(d),w=!1;a.subscribe("chat-ui:connected",()=>{a.dispatch({type:"chat:initialize",payload:{options:{username:e.username,theme:e.theme,authentication:e.authentication,profile:e.profile,route:e.route,environment:e.$environment}}}),w=!0}),a.subscribe("chat:mounted",r=>{var $;let c=($=e.components)==null?void 0:$.chat;if(!c)return;let h=c({locale:r.locale}),U=e.localization;U&&a.dispatch({type:"chat:strings-set",payload:{strings:U({locale:r.locale})}});let M=e.audio;M&&a.dispatch({type:"chat:audio-set",payload:{audio:M}});let l=h.menuActions;l==null||l.forEach(s=>{if(s.name.includes("$"))throw new Error(`Menu action name "${s.name}" cannot contain "$" character.`)}),l&&a.dispatch({type:"chat:menu-actions-set",payload:{actions:l}});let L=h.onMounted;L&&L();let I=h.onHeaderSelected;I&&a.subscribe("chat:header-selected",s=>{I(s)});let T=h.onMenuActionSelected;T&&a.subscribe("chat:menu-action-selected",s=>{T(s)})}),window.addEventListener("message",r=>{var c;r.origin===g&&r.data==="chatkitty:chat-ui-mounted"&&((c=o.contentWindow)==null||c.postMessage({type:"chat-ui:connect",payload:{version:"2.30.0",environment:"production"}},g,[y.port2]))});let v=((x=e.templates)==null?void 0:x.error)||B;o.addEventListener("error",r=>{_(o,v({message:r.message}))}),d.start(),i.appendChild(o),setTimeout(()=>{w||_(o,v({message:"Connection timed out."}))},(t==null?void 0:t.timeout)||1e4)};0&&(module.exports={loadChatUi,template});
