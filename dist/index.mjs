var E=Object.defineProperty;var M=(e,t,i)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var m=(e,t,i)=>(M(e,typeof t!="symbol"?t+"":t,i),i);import{render as L}from"lit-html";var h=class{constructor(t){m(this,"listeners");m(this,"port");this.listeners=new Map;let i=t.port1;i.onmessage=n=>{let{type:o,payload:a}=n.data;if(!this.listeners.has(o))return;this.listeners.get(o).forEach(l=>{l(a)})},this.port=i}subscribe(t,i){this.listeners.has(t)||this.listeners.set(t,[]),this.listeners.get(t).push(i)}unsubscribe(t,i){if(!this.listeners.has(t))return;let n=this.listeners.get(t),o=n.indexOf(i);o>-1&&n.splice(o,1)}dispatch(t){this.port.postMessage(t)}};import{html as I}from"lit-html";var U=I`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Error: ChatKitty Chat UI Unavailable</title><style>body{font-family:Arial,sans-serif;background-color:#f7f9fc;color:#333;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;padding:0}.error-container{max-width:600px;padding:20px;background-color:#fff;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,.1);text-align:center}.error-header{font-size:24px;font-weight:700;margin-bottom:10px}.error-description{margin-bottom:20px}.error-hint{font-size:14px;color:#666}a{color:#007bff;text-decoration:none}a:hover{text-decoration:underline}</style></head><body><div class="error-container"><div class="error-header">Oops! ChatKitty Chat UI Unavailable</div><div class="error-description">We're sorry, but the Chat UI service is currently unavailable. Please try again later.</div><div class="error-hint">If the problem persists, please <a href="mailto:support@chatkitty.com">contact support</a>.</div></div></body></html>`;var f="https://ui.chatkitty.com",x=e=>{let t=document.createElement("div");L(U,t),e.srcdoc=t.innerHTML},_=e=>{var l,y,u;let t=((l=e.container)==null?void 0:l.id)||"chat-ui",i=document.getElementById(t);if(!i)throw new Error(`Chat UI container not found. Please define a div with id "${t}" in your HTML page.`);if(i.hasChildNodes())throw new Error(`Chat UI container must be empty. Please remove all child elements from the div with id "${t}".`);i.style.display="relative",i.style.height=((y=e.container)==null?void 0:y.height)||"100vh",i.style.width=((u=e.container)==null?void 0:u.width)||"100%";let n=document.createElement("iframe");n.title="Chat UI",n.src=`${f}/chat?widget_id=${e.widgetId}${e.locale?`&locale=${e.locale}`:""}`,n.style.height="100%",n.style.width="100%",n.style.border="none";let o=new MessageChannel,a=new h(o),p=!1;a.subscribe("chat-ui:connected",()=>{let r=e.onNotificationReceived;r&&a.subscribe("chat:notification-received",s=>{r(s)}),a.dispatch({type:"chat:initialize",payload:{options:{username:e.username,environment:e.environment,theme:e.theme,authStrategy:e.authStrategy,profile:e.profile,route:e.route}}}),p=!0}),a.subscribe("chat:mounted",r=>{let s=e.chatComponent;if(!s)return;let d=s({locale:r.locale,dispatch:c=>{a.dispatch({type:"client:dispatch",payload:{message:c}})}}),g=e.localization;g&&a.dispatch({type:"chat:strings-set",payload:{strings:g({locale:r.locale})}});let v=d.menuActions;v&&a.dispatch({type:"chat:menu-actions-set",payload:{actions:v}});let w=d.onMounted;w&&w();let b=d.channelDetailsHandler;b&&a.subscribe("chat:channel-details-selected",c=>{b(c)});let C=d.menuActionHandler;C&&a.subscribe("chat:menu-action-selected",c=>{C(c)})}),window.addEventListener("message",r=>{var s;r.origin===f&&r.data==="chatkitty:chat-ui-mounted"&&((s=n.contentWindow)==null||s.postMessage("initialize",f,[o.port2]))}),n.addEventListener("error",()=>{x(n)}),setTimeout(()=>{p||x(n)},5e3),i.appendChild(n)};export{_ as loadChatUi};
