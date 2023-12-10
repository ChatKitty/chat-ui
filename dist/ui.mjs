var B=Object.defineProperty;var K=(t,e,n)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var u=(t,e,n)=>(K(t,typeof e!="symbol"?e+"":e,n),n);import{html as _,render as A}from"lit-html";import{html as S}from"lit-html";var T=({message:t})=>S`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Error: ${t}</title><style>body{font-family:Arial,sans-serif;background-color:#f7f9fc;color:#333;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;padding:0}.error-container{max-width:600px;padding:20px;background-color:#fff;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,.1);text-align:center}.error-header{font-size:24px;font-weight:700;margin-bottom:10px}.error-description{margin-bottom:20px}.error-hint{font-size:14px;color:#666}a{color:#007bff;text-decoration:none}a:hover{text-decoration:underline}</style></head><body><div class="error-container"><div class="error-header">Oops! ${t}</div><div class="error-description">We're sorry, but the Chat UI service is currently unavailable. Please try again later.</div><div class="error-hint">If the problem persists, please <a href="mailto:support@chatkitty.com">contact support</a>.</div></div></body></html>`;var p=class{constructor(e){u(this,"listeners");u(this,"port");this.listeners=new Map,e.addEventListener("message",n=>{let{type:r,payload:a}=n.data;if(!this.listeners.has(r))return;this.listeners.get(r).forEach(d=>{d(a)})}),this.port=e}subscribe(e,n){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(n)}unsubscribe(e,n){if(!this.listeners.has(e))return;let r=this.listeners.get(e),a=r.indexOf(n);a>-1&&r.splice(a,1)}dispatch(e){this.port.postMessage(e)}};var y="https://ui.chatkitty.com",$=(t,e)=>{let n=document.createElement("div");A(e,n),t.srcdoc=n.innerHTML},W=_,X=(t,e)=>{var v,b,C,E;let n=((v=t.container)==null?void 0:v.id)||"chat-ui",r=document.getElementById(n);if(!r)throw new Error(`Chat UI container not found. Please define a div with id "${n}" in your HTML page.`);if(r.hasChildNodes())throw new Error(`Chat UI container must be empty. Please remove all child elements from the div with id "${n}".`);r.style.display="relative",r.style.height=((b=t.container)==null?void 0:b.height)||"100vh",r.style.width=((C=t.container)==null?void 0:C.width)||"100%";let a=document.createElement("iframe");a.title="Chat UI",a.src=`${y}/chat?widget_id=${t.widgetId}${t.locale?`&locale=${t.locale}`:""}`,a.allow="autoplay; clipboard-write; fullscreen; geolocation; microphone",a.style.height="100%",a.style.width="100%",a.style.border="none";let f=new MessageChannel,d=f.port1,i=new p(d),g=!1;i.subscribe("chat-ui:connected",()=>{var o;i.dispatch({type:"chat:initialize",payload:{options:{username:t.username||((o=e==null?void 0:e.connection)==null?void 0:o.username),theme:t.theme,authentication:t.authentication,profile:t.profile,route:t.route,environment:e==null?void 0:e.$environment}}}),g=!0}),i.subscribe("chat:mounted",o=>{var L;let h=(L=t.components)==null?void 0:L.chat;if(!h)return;let s=h({locale:o.locale}),c=t.localization;c&&i.dispatch({type:"chat:strings-set",payload:{strings:c({locale:o.locale})}});let x=t.audio;x&&i.dispatch({type:"chat:audio-set",payload:{audio:x}});let m=s.menuActions;m==null||m.forEach(l=>{if(l.name.includes("$"))throw new Error(`Menu action name "${l.name}" cannot contain "$" character.`)}),m&&i.dispatch({type:"chat:menu-actions-set",payload:{actions:m}});let U=s.onMounted;U&&U();let M=s.onHeaderSelected;M&&i.subscribe("chat:header-selected",l=>{M(l)});let I=s.onMenuActionSelected;I&&i.subscribe("chat:menu-action-selected",l=>{I(l)})}),window.addEventListener("message",o=>{var s;if(o.origin!==y||o.data!=="chatkitty:chat-ui-mounted")return;let h="standalone";if(e!=null&&e.connection){let c=e.connection;if(t.username&&t.username!==c.username)throw new Error(`Chat UI username "${t.username}" does not match connection username "${c.username}".`);c.attach(d),h="shared"}(s=a.contentWindow)==null||s.postMessage({type:"chat-ui:connect",payload:{version:"2.30.0",environment:"production",connection:h}},y,[f.port2])});let w=((E=t.templates)==null?void 0:E.error)||T;a.addEventListener("error",o=>{$(a,w({message:o.message}))}),d.start(),r.appendChild(a),setTimeout(()=>{g||$(a,w({message:"Connection timed out."}))},(e==null?void 0:e.timeout)||1e4)};export{X as loadChatUi,W as template};