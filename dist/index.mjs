var m=class{listeners;port;constructor(n){this.listeners=new Map;let a=n.port1;a.onmessage=s=>{let{type:o,payload:t}=s.data;if(!this.listeners.has(o))return;this.listeners.get(o).forEach(c=>{c(t)})},this.port=a}subscribe(n,a){this.listeners.has(n)||this.listeners.set(n,[]),this.listeners.get(n).push(a)}unsubscribe(n,a){if(!this.listeners.has(n))return;let s=this.listeners.get(n),o=s.indexOf(a);o>-1&&s.splice(o,1)}dispatch(n){this.port.postMessage(n)}};var y="https://ui.chatkitty.com",b=e=>{let n=e.container?.id||"chat-ui",a=document.getElementById(n);if(!a)throw new Error(`Chat UI container not found. Please define a div with id "${n}" in your HTML page.`);if(a.hasChildNodes())throw new Error(`Chat UI container must be empty. Please remove all child elements from the div with id "${n}".`);a.style.display="relative",a.style.height=e.container?.height||"100vh",a.style.width=e.container?.width||"100%";let s=document.createElement("iframe");s.title="Chat UI",s.src=`${y}/chat?widget_id=${e.widgetId}${e.locale?`&locale=${e.locale}`:""}`,s.style.height="100%",s.style.width="100%",s.style.border="none";let o=new MessageChannel,t=new m(o);t.subscribe("live-chat:initialized",()=>{let i=[],c=e.username;c&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"username",value:c}}),i.push("username"));let r=e.environment;r&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"environment",value:r}}),i.push("environment"));let l=e.theme;l&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"theme",value:l}}),i.push("theme"));let d=e.authStrategy;d&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"authStrategy",value:d}}),i.push("authStrategy"));let p=e.profile;p&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"profile",value:p}}),i.push("profile"));let u=e.route;u&&(t.dispatch({type:"chat:assign-configuration-option",payload:{name:"route",value:u}}),i.push("route"));let f=e.onNotificationReceived;f&&t.subscribe("chat:notification-received",h=>{f(h)}),t.dispatch({type:"chat:initialize",payload:{options:i}})}),t.subscribe("chat:mounted",i=>{let c=e.chatComponent;if(!c)return;let r=c({locale:i.locale,dispatch:h=>{t.dispatch({type:"client:dispatch",payload:{message:h}})}}),l=e.localization;l&&t.dispatch({type:"chat:strings-set",payload:{strings:l({locale:i.locale})}});let d=r.menuActions;d&&t.dispatch({type:"chat:menu-actions-set",payload:{actions:d}});let p=r.onMounted;p&&p();let u=r.channelDetailsHandler;u&&t.subscribe("chat:channel-details-selected",h=>{u(h)});let f=r.menuActionHandler;f&&t.subscribe("chat:menu-action-selected",h=>{f(h)})}),window.addEventListener("message",i=>{i.origin===y&&i.data==="chatkitty:live-chat-mounted"&&s.contentWindow?.postMessage("initialize",y,[o.port2])}),a.appendChild(s)};export{b as loadChatUi};
