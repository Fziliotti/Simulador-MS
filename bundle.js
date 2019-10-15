var app=function(){"use strict";function e(){}const t=e=>e;function o(e){return e()}function n(){return Object.create(null)}function i(e){e.forEach(o)}function r(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}const l="undefined"!=typeof window;let s=l?()=>window.performance.now():()=>Date.now(),c=l?e=>requestAnimationFrame(e):e;const d=new Set;let u,p=!1;function m(){d.forEach(e=>{e[0](s())||(d.delete(e),e[1]())}),(p=d.size>0)&&c(m)}function f(e){let t;return p||(p=!0,c(m)),{promise:new Promise(o=>{d.add(t=[e,o])}),abort(){d.delete(t)}}}function v(e,t){e.appendChild(t)}function h(e,t,o){e.insertBefore(t,o||null)}function g(e){e.parentNode.removeChild(e)}function D(e,t){for(let o=0;o<e.length;o+=1)e[o]&&e[o].d(t)}function b(e){return document.createElement(e)}function S(e){return document.createTextNode(e)}function _(){return S(" ")}function $(e,t,o,n){return e.addEventListener(t,o,n),()=>e.removeEventListener(t,o,n)}function C(e,t,o){null==o?e.removeAttribute(t):e.setAttribute(t,o)}function T(e){return""===e?void 0:+e}function x(e,t){t=""+t,e.data!==t&&(e.data=t)}function M(e,t){(null!=t||e.value)&&(e.value=t)}function N(e,t){for(let o=0;o<e.options.length;o+=1){const n=e.options[o];if(n.__value===t)return void(n.selected=!0)}}function y(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let E,F=0,w={};function O(e,t,o,n,i,r,a,l=0){const s=16.666/n;let c="{\n";for(let e=0;e<=1;e+=s){const n=t+(o-t)*r(e);c+=100*e+`%{${a(n,1-n)}}\n`}const d=c+`100% {${a(o,1-o)}}\n}`,p=`__svelte_${function(e){let t=5381,o=e.length;for(;o--;)t=(t<<5)-t^e.charCodeAt(o);return t>>>0}(d)}_${l}`;if(!w[p]){if(!u){const e=b("style");document.head.appendChild(e),u=e.sheet}w[p]=!0,u.insertRule(`@keyframes ${p} ${d}`,u.cssRules.length)}const m=e.style.animation||"";return e.style.animation=`${m?`${m}, `:""}${p} ${n}ms linear ${i}ms 1 both`,F+=1,p}function k(e,t){e.style.animation=(e.style.animation||"").split(", ").filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")).join(", "),t&&!--F&&c(()=>{if(F)return;let e=u.cssRules.length;for(;e--;)u.deleteRule(e);w={}})}function A(e){E=e}function L(e){(function(){if(!E)throw new Error("Function called outside component initialization");return E})().$$.after_update.push(e)}const I=[],R=[],P=[],q=[],V=Promise.resolve();let j,B=!1;function U(e){P.push(e)}function H(){const e=new Set;do{for(;I.length;){const e=I.shift();A(e),z(e.$$)}for(;R.length;)R.pop()();for(let t=0;t<P.length;t+=1){const o=P[t];e.has(o)||(o(),e.add(o))}P.length=0}while(I.length);for(;q.length;)q.pop()();B=!1}function z(e){e.fragment&&(e.update(e.dirty),i(e.before_update),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_update.forEach(U))}function Q(){return j||(j=Promise.resolve()).then(()=>{j=null}),j}function G(e,t,o){e.dispatchEvent(function(e,t){const o=document.createEvent("CustomEvent");return o.initCustomEvent(e,!1,!1,t),o}(`${t?"intro":"outro"}${o}`))}const W=new Set;let Z;function J(){Z={r:0,c:[],p:Z}}function K(){Z.r||i(Z.c),Z=Z.p}function X(e,t){e&&e.i&&(W.delete(e),e.i(t))}function Y(e,t,o,n){if(e&&e.o){if(W.has(e))return;W.add(e),Z.c.push(()=>{W.delete(e),n&&(o&&e.d(1),n())}),e.o(t)}}const ee={duration:0};function te(o,n,i){let a,l,c=n(o,i),d=!1,u=0;function p(){a&&k(o,a)}function m(){const{delay:n=0,duration:i=300,easing:r=t,tick:m=e,css:v}=c||ee;v&&(a=O(o,0,1,i,n,r,v,u++)),m(0,1);const h=s()+n,g=h+i;l&&l.abort(),d=!0,U(()=>G(o,!0,"start")),l=f(e=>{if(d){if(e>=g)return m(1,0),G(o,!0,"end"),p(),d=!1;if(e>=h){const t=r((e-h)/i);m(t,1-t)}}return d})}let v=!1;return{start(){v||(k(o),r(c)?(c=c(),Q().then(m)):m())},invalidate(){v=!1},end(){d&&(p(),d=!1)}}}function oe(o,n,a,l){let c=n(o,a),d=l?0:1,u=null,p=null,m=null;function v(){m&&k(o,m)}function h(e,t){const o=e.b-d;return t*=Math.abs(o),{a:d,b:e.b,d:o,duration:t,start:e.start,end:e.start+t,group:e.group}}function g(n){const{delay:r=0,duration:a=300,easing:l=t,tick:g=e,css:D}=c||ee,b={start:s()+r,b:n};n||(b.group=Z,Z.r+=1),u?p=b:(D&&(v(),m=O(o,d,n,a,r,l,D)),n&&g(0,1),u=h(b,a),U(()=>G(o,n,"start")),f(e=>{if(p&&e>p.start&&(u=h(p,a),p=null,G(o,u.b,"start"),D&&(v(),m=O(o,d,u.b,u.duration,0,l,c.css))),u)if(e>=u.end)g(d=u.b,1-d),G(o,u.b,"end"),p||(u.b?v():--u.group.r||i(u.group.c)),u=null;else if(e>=u.start){const t=e-u.start;d=u.a+u.d*l(t/u.duration),g(d,1-d)}return!(!u&&!p)}))}return{run(e){r(c)?Q().then(()=>{c=c(),g(e)}):g(e)},end(){v(),u=p=null}}}function ne(e,t,n){const{fragment:a,on_mount:l,on_destroy:s,after_update:c}=e.$$;a.m(t,n),U(()=>{const t=l.map(o).filter(r);s?s.push(...t):i(t),e.$$.on_mount=[]}),c.forEach(U)}function ie(e,t){e.$$.fragment&&(i(e.$$.on_destroy),e.$$.fragment.d(t),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={})}function re(e,t){e.$$.dirty||(I.push(e),B||(B=!0,V.then(H)),e.$$.dirty=n()),e.$$.dirty[t]=!0}function ae(t,o,r,a,l,s){const c=E;A(t);const d=o.props||{},u=t.$$={fragment:null,ctx:null,props:s,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:n(),dirty:null};let p=!1;var m;u.ctx=r?r(t,d,(e,o,n=o)=>(u.ctx&&l(u.ctx[e],u.ctx[e]=n)&&(u.bound[e]&&u.bound[e](n),p&&re(t,e)),o)):d,u.update(),p=!0,i(u.before_update),u.fragment=a(u.ctx),o.target&&(o.hydrate?u.fragment.l((m=o.target,Array.from(m.childNodes))):u.fragment.c(),o.intro&&X(t.$$.fragment),ne(t,o.target,o.anchor),H()),A(c)}class le{$destroy(){ie(this,1),this.$destroy=e}$on(e,t){const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(t),()=>{const e=o.indexOf(t);-1!==e&&o.splice(e,1)}}$set(){}}function se(e,{delay:t=0,duration:o=400}){const n=+getComputedStyle(e).opacity;return{delay:t,duration:o,css:e=>`opacity: ${e*n}`}}function ce(t){var o;return{c(){(o=b("header")).innerHTML='<h1 class="header__title svelte-7ddyia">Teoria das filas - Modelo MM1</h1>',C(o,"class","header svelte-7ddyia")},m(e,t){h(e,o,t)},p:e,i:e,o:e,d(e){e&&g(o)}}}class de extends le{constructor(e){super(),ae(this,e,null,ce,a,[])}}function ue(t){var o;return{c(){(o=b("footer")).textContent="Desenvolvido por Fabrício Ziliotti, Guilherme Raimondi e Hígor Emanuel",C(o,"class","footer text-center text-light py-4 svelte-sutqts")},m(e,t){h(e,o,t)},p:e,i:e,o:e,d(e){e&&g(o)}}}class pe extends le{constructor(e){super(),ae(this,e,null,ue,a,[])}}function me(t){var o;return{c(){C(o=b("canvas"),"id","chartTMNF"),C(o,"width","400"),C(o,"height","400")},m(e,n){h(e,o,n),t.canvas_1_binding(o)},p:e,i:e,o:e,d(e){e&&g(o),t.canvas_1_binding(null)}}}function fe(e,t,o){let n,{data:i,numeroDeIteracoes:r,titulo:a,backgroundColor:l}=t;return L(()=>{new Chart(n,{type:"line",data:{labels:[...new Array(r).fill(0).map((e,t)=>++t)],datasets:[{label:a,data:i,backgroundColor:l,borderWidth:1}]}})}),e.$set=(e=>{"data"in e&&o("data",i=e.data),"numeroDeIteracoes"in e&&o("numeroDeIteracoes",r=e.numeroDeIteracoes),"titulo"in e&&o("titulo",a=e.titulo),"backgroundColor"in e&&o("backgroundColor",l=e.backgroundColor)}),{data:i,numeroDeIteracoes:r,titulo:a,backgroundColor:l,canvas:n,canvas_1_binding:function(e){R[e?"unshift":"push"](()=>{o("canvas",n=e)})}}}class ve extends le{constructor(e){super(),ae(this,e,fe,me,a,["data","numeroDeIteracoes","titulo","backgroundColor"])}}const he={tempoTotalDeSimulacao:240,temposDeTodosOsServicos:[11.5,12.6,12,11.5,12,10.4,11.5,13.1,10.4,11.5,11.5,9.8,10.9,11.5,10.4],temposEntreTodasChegadas:[17.5,7.5,12.5,2.5,2.5,2.5,2.5,37.5,17.5,17.5,32.5,37.5,7.5,12.5,12.5],numeroDeServicos:15},ge=function(e){if("number"!=typeof e)throw new TypeError("nextExponential: lambda must be number.");if(e<=0)throw new TypeError("nextExponential: lambda must be greater than 0.");return-Math.log(1-Math.random())/e},De=function e(t,o){var n,i,r,a;if("number"!=typeof t)throw new TypeError("nextNormal: mu must be number.");if("number"!=typeof o)throw new TypeError("nextNormal: sigma must be number.");return t===be&&o===Se||(Ce=!1,be=t,Se=o),Ce?(Ce=!1,o*_e+t):(a=(i=2*Math.random()-1)*i+(r=2*Math.random()-1)*r)>=1?e(t,o):(n=i*($e=Math.sqrt(-2*Math.log(a)/a)),_e=r*$e,Ce=!0,Math.abs(o*n+t))};var be,Se,_e,$e,Ce;function Te(e,t,o){const n=Object.create(e);return n.servico=t[o],n}function xe(e,t,o){const n=Object.create(e);return n.option=t[o],n}function Me(e,t,o){const n=Object.create(e);return n.option=t[o],n}function Ne(t){var o,n,i,r=t.option.text+"";return{c(){o=b("option"),n=S(r),i=_(),o.__value=t.option,o.value=o.__value},m(e,t){h(e,o,t),v(o,n),v(o,i)},p:e,d(e){e&&g(o)}}}function ye(t){var o,n,r,a,l,s,c,d,u,p,m,f,D=!1,S=!1;function T(){D=!0,t.input0_input_handler_1.call(a)}function x(){S=!0,t.input1_input_handler.call(p)}return{c(){o=b("div"),(n=b("label")).textContent="Valor da Média",r=_(),a=b("input"),s=_(),c=b("div"),(d=b("label")).textContent="Valor da Variância",u=_(),p=b("input"),C(n,"for","inputMeanNormal"),C(a,"type","number"),C(a,"step","0.01"),C(a,"class","form-control"),C(a,"id","inputMeanNormal"),C(a,"placeholder","tempo em minutos"),C(o,"class","form-group col-md-2"),C(d,"for","inputStdNormal"),C(p,"type","number"),C(p,"step","0.01"),C(p,"class","form-control"),C(p,"id","inputStdNormal"),C(p,"placeholder","tempo em minutos"),C(c,"class","form-group col-md-2"),f=[$(a,"input",T),$(p,"input",x)]},m(e,i){h(e,o,i),v(o,n),v(o,r),v(o,a),M(a,t.inputMeanTEC),h(e,s,i),h(e,c,i),v(c,d),v(c,u),v(c,p),M(p,t.inputStdTEC)},p(e,t){!D&&e.inputMeanTEC&&M(a,t.inputMeanTEC),D=!1,!S&&e.inputStdTEC&&M(p,t.inputStdTEC),S=!1},i(e){l||U(()=>{(l=te(o,se,{})).start()}),m||U(()=>{(m=te(c,se,{})).start()})},o:e,d(e){e&&(g(o),g(s),g(c)),i(f)}}}function Ee(t){var o,n,i,r,a,l,s=!1;function c(){s=!0,t.input_input_handler_1.call(r)}return{c(){o=b("div"),(n=b("label")).textContent="Valor da Média",i=_(),r=b("input"),C(n,"for","inputLambdaExponencial"),C(r,"type","number"),C(r,"step","0.01"),C(r,"class","form-control"),C(r,"id","inputLambdaExponencial"),C(r,"placeholder","tempo em minutos"),C(o,"class","form-group col-md-2"),l=$(r,"input",c)},m(e,a){h(e,o,a),v(o,n),v(o,i),v(o,r),M(r,t.inputMeanTEC)},p(e,t){!s&&e.inputMeanTEC&&M(r,t.inputMeanTEC),s=!1},i(e){a||U(()=>{(a=te(o,se,{})).start()})},o:e,d(e){e&&g(o),l()}}}function Fe(t){var o,n,i,r,a,l,s=!1;function c(){s=!0,t.input_input_handler.call(r)}return{c(){o=b("div"),(n=b("label")).textContent="Qual o tempo entre as chegadas?",i=_(),C(r=b("input"),"type","number"),C(r,"class","form-control"),C(r,"min","1"),C(r,"max","999"),C(r,"placeholder","tempo em minutos"),C(o,"class","form-group col-md-4"),l=$(r,"input",c)},m(e,a){h(e,o,a),v(o,n),v(o,i),v(o,r),M(r,t.inputMeanTEC)},p(e,t){!s&&e.inputMeanTEC&&M(r,t.inputMeanTEC),s=!1},i(e){a||U(()=>{(a=te(o,se,{})).start()})},o:e,d(e){e&&g(o),l()}}}function we(t){var o,n,i,r=t.option.text+"";return{c(){o=b("option"),n=S(r),i=_(),o.__value=t.option,o.value=o.__value},m(e,t){h(e,o,t),v(o,n),v(o,i)},p:e,d(e){e&&g(o)}}}function Oe(t){var o,n,r,a,l,s,c,d,u,p,m,f,D=!1,S=!1;function T(){D=!0,t.input0_input_handler_2.call(a)}function x(){S=!0,t.input1_input_handler_1.call(p)}return{c(){o=b("div"),(n=b("label")).textContent="Valor da Média",r=_(),a=b("input"),s=_(),c=b("div"),(d=b("label")).textContent="Valor da Variância",u=_(),p=b("input"),C(n,"for","inputNumeroDeServicos"),C(a,"type","number"),C(a,"step","0.01"),C(a,"class","form-control"),C(a,"id","inputNumeroDeServicos"),C(a,"placeholder",""),C(o,"class","form-group col-md-2"),C(d,"for","inputNumeroDeServicos"),C(p,"type","number"),C(p,"step","0.01"),C(p,"class","form-control"),C(p,"id","inputNumeroDeServicos"),C(p,"placeholder",""),C(c,"class","form-group col-md-2"),f=[$(a,"input",T),$(p,"input",x)]},m(e,i){h(e,o,i),v(o,n),v(o,r),v(o,a),M(a,t.inputMeanTS),h(e,s,i),h(e,c,i),v(c,d),v(c,u),v(c,p),M(p,t.inputStdTS)},p(e,t){!D&&e.inputMeanTS&&M(a,t.inputMeanTS),D=!1,!S&&e.inputStdTS&&M(p,t.inputStdTS),S=!1},i(e){l||U(()=>{(l=te(o,se,{})).start()}),m||U(()=>{(m=te(c,se,{})).start()})},o:e,d(e){e&&(g(o),g(s),g(c)),i(f)}}}function ke(t){var o,n,i,r,a,l,s=!1;function c(){s=!0,t.input_input_handler_3.call(r)}return{c(){o=b("div"),(n=b("label")).textContent="Valor da Média",i=_(),r=b("input"),C(n,"for","inputNumeroDeServicos"),C(r,"type","number"),C(r,"step","0.01"),C(r,"class","form-control"),C(r,"id","inputNumeroDeServicos"),C(r,"placeholder",""),C(o,"class","form-group col-md-2"),l=$(r,"input",c)},m(e,a){h(e,o,a),v(o,n),v(o,i),v(o,r),M(r,t.inputMeanTS)},p(e,t){!s&&e.inputMeanTS&&M(r,t.inputMeanTS),s=!1},i(e){a||U(()=>{(a=te(o,se,{})).start()})},o:e,d(e){e&&g(o),l()}}}function Ae(t){var o,n,i,r,a,l,s=!1;function c(){s=!0,t.input_input_handler_2.call(r)}return{c(){o=b("div"),(n=b("label")).textContent="Quantos minutos o serviço demora?",i=_(),r=b("input"),C(n,"for","inputNumeroDeServicos"),C(r,"type","number"),C(r,"class","form-control"),C(r,"id","inputNumeroDeServicos"),C(r,"min","1"),C(r,"max","999"),C(r,"placeholder","tempo em minutos"),C(o,"class","form-group col-md-4"),l=$(r,"input",c)},m(e,a){h(e,o,a),v(o,n),v(o,i),v(o,r),M(r,t.inputMeanTS)},p(e,t){!s&&e.inputMeanTS&&M(r,t.inputMeanTS),s=!1},i(e){a||U(()=>{(a=te(o,se,{})).start()})},o:e,d(e){e&&g(o),l()}}}function Le(e){var t,o,n,i,r,a,l,s,c,d,u,p,m,f,D,$,T,M,N,y,E,F,w,O,k,A,L,I,R,P,q,V,j=e.tempoMedioDeEsperaNaFila().toFixed(2)+"",B=e.probabilidadeDeEspera().toFixed(2)+"",H=e.probabilidadeDeOperadorLivre().toFixed(2)+"",z=e.tempoMedioDeServicos().toFixed(2)+"",Q=e.tempoMedioDespendidoNoSistema().toFixed(2)+"";return{c(){t=b("div"),o=b("p"),n=S("Número total de clientes: "),i=b("span"),r=S(e.numeroDeClientesAcumulados),a=_(),l=b("p"),s=S("Tempo médio de espera na fila: "),c=b("span"),d=S(j),u=_(),p=b("p"),m=S("Probabilidade de um cliente esperar na fila: "),f=b("span"),D=S(B),$=_(),T=b("p"),M=S("Probabilidade do operador livre: "),N=b("span"),y=S(H),E=_(),F=b("p"),w=S("Tempo médio de serviço: "),O=b("span"),k=S(z),A=_(),L=b("p"),I=S("Tempo médio despendido no sistema: "),R=b("span"),P=S(Q),C(i,"class","bg-primary p-1 text-light rounded"),C(c,"class","bg-primary p-1 text-light rounded"),C(f,"class","bg-primary p-1 text-light rounded"),C(N,"class","bg-primary p-1 text-light rounded"),C(O,"class","bg-primary p-1 text-light rounded"),C(R,"class","bg-primary p-1 text-light rounded"),C(t,"class","pt-4")},m(e,g){h(e,t,g),v(t,o),v(o,n),v(o,i),v(i,r),v(t,a),v(t,l),v(l,s),v(l,c),v(c,d),v(t,u),v(t,p),v(p,m),v(p,f),v(f,D),v(t,$),v(t,T),v(T,M),v(T,N),v(N,y),v(t,E),v(t,F),v(F,w),v(F,O),v(O,k),v(t,A),v(t,L),v(L,I),v(L,R),v(R,P),V=!0},p(e,t){V&&!e.numeroDeClientesAcumulados||x(r,t.numeroDeClientesAcumulados),V&&!e.tempoMedioDeEsperaNaFila||j===(j=t.tempoMedioDeEsperaNaFila().toFixed(2)+"")||x(d,j),V&&!e.probabilidadeDeEspera||B===(B=t.probabilidadeDeEspera().toFixed(2)+"")||x(D,B),V&&!e.probabilidadeDeOperadorLivre||H===(H=t.probabilidadeDeOperadorLivre().toFixed(2)+"")||x(y,H),V&&!e.tempoMedioDeServicos||z===(z=t.tempoMedioDeServicos().toFixed(2)+"")||x(k,z),V&&!e.tempoMedioDespendidoNoSistema||Q===(Q=t.tempoMedioDespendidoNoSistema().toFixed(2)+"")||x(P,Q)},i(e){V||(U(()=>{q||(q=oe(t,se,{duration:1e3},!0)),q.run(1)}),V=!0)},o(e){q||(q=oe(t,se,{duration:1e3},!1)),q.run(0),V=!1},d(e){e&&(g(t),q&&q.end())}}}function Ie(e){var t,o;let n=e.servicos,i=[];for(let t=0;t<n.length;t+=1)i[t]=Re(Te(e,n,t));const r=e=>Y(i[e],1,1,()=>{i[e]=null});return{c(){for(let e=0;e<i.length;e+=1)i[e].c();t=S("")},m(e,n){for(let t=0;t<i.length;t+=1)i[t].m(e,n);h(e,t,n),o=!0},p(e,o){if(e.servicos){let a;for(n=o.servicos,a=0;a<n.length;a+=1){const r=Te(o,n,a);i[a]?(i[a].p(e,r),X(i[a],1)):(i[a]=Re(r),i[a].c(),X(i[a],1),i[a].m(t.parentNode,t))}for(J(),a=n.length;a<i.length;a+=1)r(a);K()}},i(e){if(!o){for(let e=0;e<n.length;e+=1)X(i[e]);o=!0}},o(e){i=i.filter(Boolean);for(let e=0;e<i.length;e+=1)Y(i[e]);o=!1},d(e){D(i,e),e&&g(t)}}}function Re(e){var t,o,n,i,r,a,l,s,c,d,u,p,m,f,D,$,T,M,N,y,E,F,w,O,k,A,L,I,R,P,q=e.servico.cliente+"",V=e.servico.tempoDesdeUltimaChegada.toFixed(2)+"",j=e.servico.tempoChegadaNoRelogio.toFixed(2)+"",B=e.servico.tempoServico.toFixed(2)+"",H=e.servico.tempoInicioServicoNoRelogio.toFixed(2)+"",z=e.servico.tempoClienteNaFila.toFixed(2)+"",Q=e.servico.tempoFinalDoServicoNoRelogio.toFixed(2)+"",G=e.servico.tempoClienteNoSistema.toFixed(2)+"",W=e.servico.tempoLivreDoOperador.toFixed(2)+"";return{c(){t=b("tr"),o=b("th"),n=S(q),i=_(),r=b("td"),a=S(V),l=_(),s=b("td"),c=S(j),d=_(),u=b("td"),p=S(B),m=_(),f=b("td"),D=S(H),$=_(),T=b("td"),M=S(z),N=_(),y=b("td"),E=S(Q),F=_(),w=b("td"),O=S(G),k=_(),A=b("td"),L=S(W),I=_(),C(o,"scope","row")},m(e,g){h(e,t,g),v(t,o),v(o,n),v(t,i),v(t,r),v(r,a),v(t,l),v(t,s),v(s,c),v(t,d),v(t,u),v(u,p),v(t,m),v(t,f),v(f,D),v(t,$),v(t,T),v(T,M),v(t,N),v(t,y),v(y,E),v(t,F),v(t,w),v(w,O),v(t,k),v(t,A),v(A,L),v(t,I),P=!0},p(e,t){P&&!e.servicos||q===(q=t.servico.cliente+"")||x(n,q),P&&!e.servicos||V===(V=t.servico.tempoDesdeUltimaChegada.toFixed(2)+"")||x(a,V),P&&!e.servicos||j===(j=t.servico.tempoChegadaNoRelogio.toFixed(2)+"")||x(c,j),P&&!e.servicos||B===(B=t.servico.tempoServico.toFixed(2)+"")||x(p,B),P&&!e.servicos||H===(H=t.servico.tempoInicioServicoNoRelogio.toFixed(2)+"")||x(D,H),P&&!e.servicos||z===(z=t.servico.tempoClienteNaFila.toFixed(2)+"")||x(M,z),P&&!e.servicos||Q===(Q=t.servico.tempoFinalDoServicoNoRelogio.toFixed(2)+"")||x(E,Q),P&&!e.servicos||G===(G=t.servico.tempoClienteNoSistema.toFixed(2)+"")||x(O,G),P&&!e.servicos||W===(W=t.servico.tempoLivreDoOperador.toFixed(2)+"")||x(L,W)},i(e){P||(U(()=>{R||(R=oe(t,se,{duration:1e3,delay:400},!0)),R.run(1)}),P=!0)},o(e){R||(R=oe(t,se,{duration:1e3,delay:400},!1)),R.run(0),P=!1},d(e){e&&(g(t),R&&R.end())}}}function Pe(e){var t,o,n,r,a,l,s,c,d,u,p,m,f,S,T,x,y,E,F,w,O,k,A,L,I,R,P,q,V,j,B,H,z,Q,G,W,Z,ee,te,oe,re,ae,le,se,ce,ue,me,fe,he,ge,De,be,Se,_e,$e,Ce,Te,Re,Pe,Ve,je,Be=!1,Ue=new de({});function He(){Be=!0,e.input0_input_handler.call(s)}let ze=e.tecOpcoes,Qe=[];for(let t=0;t<ze.length;t+=1)Qe[t]=Ne(Me(e,ze,t));function Ge(e,t){return 1===t.tecSelecionado.id?Fe:2===t.tecSelecionado.id?Ee:3===t.tecSelecionado.id?ye:void 0}var We=Ge(0,e),Ze=We&&We(e);let Je=e.tsOpcoes,Ke=[];for(let t=0;t<Je.length;t+=1)Ke[t]=we(xe(e,Je,t));function Xe(e,t){return 1===t.tsSelecionado.id?Ae:2===t.tsSelecionado.id?ke:3===t.tsSelecionado.id?Oe:void 0}var Ye=Xe(0,e),et=Ye&&Ye(e),tt=new ve({props:{data:e.listaDeTemposMediosNafila,backgroundColor:"#EF5B5B",numeroDeIteracoes:e.numeroDeServicos||30,titulo:"Tempo médio na fila de espera"}}),ot=new ve({props:{data:e.listaDeTemposMediosDeServico,backgroundColor:"#BAA5FF",numeroDeIteracoes:e.numeroDeServicos||30,titulo:"Tempo médio de serviço"}}),nt=0!=e.servicos.length&&Le(e),it=new ve({props:{data:e.listaDeProbabilidadesDeOperadoresLivre,backgroundColor:"#466365",numeroDeIteracoes:e.numeroDeServicos||30,titulo:"Probabilidade de operador livre"}}),rt=new ve({props:{data:e.listaDeProbDeClienteEsperarNaFila,backgroundColor:"#ABFAA9",numeroDeIteracoes:e.numeroDeServicos||30,titulo:"Probabilidade do cliente esperar"}}),at=new ve({props:{data:e.listaDeTemposMediosDespendidoNoSistema,backgroundColor:"#C6B9CD",numeroDeIteracoes:e.numeroDeServicos||30,titulo:"Tempos Médios despendido no sistema"}}),lt=0!=e.servicos.length&&Ie(e),st=new pe({});return{c(){Ue.$$.fragment.c(),t=_(),o=b("form"),n=b("div"),r=b("div"),(a=b("label")).innerHTML="Tempo da simulação (em minutos) <strong>(max 24 hrs)</strong>",l=_(),s=b("input"),c=_(),d=b("div"),u=b("div"),(p=b("label")).textContent="Tempo entre chegadas",m=_(),f=b("select"),(S=b("option")).textContent="Selecione alguma...\r\n        ";for(let e=0;e<Qe.length;e+=1)Qe[e].c();x=_(),Ze&&Ze.c(),y=_(),E=b("div"),F=b("div"),(w=b("label")).textContent="Tempo dos serviços",O=_(),k=b("select"),(A=b("option")).textContent="Selecione alguma...\r\n        ";for(let e=0;e<Ke.length;e+=1)Ke[e].c();var i;I=_(),et&&et.c(),R=_(),P=b("div"),q=b("input"),V=_(),(j=b("button")).textContent="Simular Exemplo Slide",B=_(),H=b("hr"),z=_(),Q=b("div"),G=b("div"),(W=b("button")).textContent="Imprimir",Z=_(),ee=b("div"),te=b("div"),tt.$$.fragment.c(),oe=_(),re=b("div"),ot.$$.fragment.c(),ae=_(),le=b("div"),nt&&nt.c(),se=_(),ce=b("div"),ue=b("div"),it.$$.fragment.c(),me=_(),fe=b("div"),rt.$$.fragment.c(),he=_(),ge=b("div"),at.$$.fragment.c(),De=_(),be=b("hr"),Se=_(),_e=b("main"),$e=b("table"),(Ce=b("thead")).innerHTML='<tr><th scope="col">Cliente</th> <th scope="col">Tempo desde ultima chegada</th> <th scope="col">Tempo de chegada no relogio</th> <th scope="col">Tempo de serviço</th> <th scope="col">Tempo de início do serviço no relógio</th> <th scope="col">Tempo de cliente na fila</th> <th scope="col">Tempo final do serviço no relógio</th> <th scope="col">Tempo do cliente no sistema</th> <th scope="col">Tempo livre do operador</th></tr>',Te=_(),Re=b("tbody"),lt&&lt.c(),Pe=_(),st.$$.fragment.c(),s.required=!0,C(s,"type","number"),C(s,"min","1"),C(s,"max","1440"),C(s,"class","form-control"),C(s,"placeholder","tempo da simulação"),C(r,"class","form-group col-md-4 offset-md-2"),C(n,"class","form-row"),S.__value=0,S.value=S.__value,void 0===e.tecSelecionado&&U(()=>e.select0_change_handler.call(f)),f.required=!0,C(f,"class","form-control"),C(u,"class","form-group col-md-4 offset-md-2"),C(d,"class","form-row"),A.__value=0,A.value=A.__value,void 0===e.tsSelecionado&&U(()=>e.select1_change_handler.call(k)),k.required=!0,C(k,"class","form-control"),C(F,"class","form-group col-md-4 offset-md-2"),C(E,"class","form-row"),C(q,"type","submit"),q.value="Simular",C(q,"class","btn btn-large btn-primary"),C(j,"class","btn btn-large btn-danger float-right"),C(P,"class","offset-md-2"),C(o,"class","container my-5 svelte-1ns4x3i"),C(W,"class","btn-imprimir btn btn-secondary svelte-1ns4x3i"),C(G,"class","d-flex justify-content-end text-right"),C(te,"class","col-md-4"),C(re,"class","col-md-4"),C(le,"class","col-md-4"),C(ee,"class","row"),C(ue,"class","col-md-4"),C(fe,"class","col-md-4"),C(ge,"class","col-md-4"),C(ce,"class","row"),C(Q,"class","container"),C(Ce,"class","bg-secondary text-light"),C($e,"class","table table-striped table-hover my-4"),C(_e,"class","svelte-1ns4x3i"),je=[$(s,"input",He),$(f,"change",e.select0_change_handler),$(k,"change",e.select1_change_handler),$(j,"click",(i=e.handleSimularSlideClick,function(e){return e.preventDefault(),i.call(this,e)})),$(o,"submit",e.handleSubmit),$(W,"click",qe)]},m(i,g){ne(Ue,i,g),h(i,t,g),h(i,o,g),v(o,n),v(n,r),v(r,a),v(r,l),v(r,s),M(s,e.tempoTotalDeSimulacao),v(o,c),v(o,d),v(d,u),v(u,p),v(u,m),v(u,f),v(f,S);for(let e=0;e<Qe.length;e+=1)Qe[e].m(f,null);N(f,e.tecSelecionado),T=e.tecSelecionado;for(var D=0;D<f.options.length;D+=1){var b=f.options[D];if(b.__value===T){b.selected=!0;break}}v(d,x),Ze&&Ze.m(d,null),v(o,y),v(o,E),v(E,F),v(F,w),v(F,O),v(F,k),v(k,A);for(let e=0;e<Ke.length;e+=1)Ke[e].m(k,null);N(k,e.tsSelecionado),L=e.tsSelecionado;for(var _=0;_<k.options.length;_+=1){var $=k.options[_];if($.__value===L){$.selected=!0;break}}v(E,I),et&&et.m(E,null),v(o,R),v(o,P),v(P,q),v(P,V),v(P,j),h(i,B,g),h(i,H,g),h(i,z,g),h(i,Q,g),v(Q,G),v(G,W),v(Q,Z),v(Q,ee),v(ee,te),ne(tt,te,null),v(ee,oe),v(ee,re),ne(ot,re,null),v(ee,ae),v(ee,le),nt&&nt.m(le,null),v(Q,se),v(Q,ce),v(ce,ue),ne(it,ue,null),v(ce,me),v(ce,fe),ne(rt,fe,null),v(ce,he),v(ce,ge),ne(at,ge,null),h(i,De,g),h(i,be,g),h(i,Se,g),h(i,_e,g),v(_e,$e),v($e,Ce),v($e,Te),v($e,Re),lt&&lt.m(Re,null),h(i,Pe,g),ne(st,i,g),Ve=!0},p(e,t){if(!Be&&e.tempoTotalDeSimulacao&&M(s,t.tempoTotalDeSimulacao),Be=!1,e.tecOpcoes){let o;for(ze=t.tecOpcoes,o=0;o<ze.length;o+=1){const n=Me(t,ze,o);Qe[o]?Qe[o].p(e,n):(Qe[o]=Ne(n),Qe[o].c(),Qe[o].m(f,null))}for(;o<Qe.length;o+=1)Qe[o].d(1);Qe.length=ze.length}if(e.tecSelecionado&&N(f,t.tecSelecionado),(!Ve||e.tecSelecionado)&&T!==(T=t.tecSelecionado))for(var o=0;o<f.options.length;o+=1){var n=f.options[o];if(n.__value===T){n.selected=!0;break}}if(We===(We=Ge(0,t))&&Ze?Ze.p(e,t):(Ze&&Ze.d(1),(Ze=We&&We(t))&&(Ze.c(),X(Ze,1),Ze.m(d,null))),e.tsOpcoes){let o;for(Je=t.tsOpcoes,o=0;o<Je.length;o+=1){const n=xe(t,Je,o);Ke[o]?Ke[o].p(e,n):(Ke[o]=we(n),Ke[o].c(),Ke[o].m(k,null))}for(;o<Ke.length;o+=1)Ke[o].d(1);Ke.length=Je.length}if(e.tsSelecionado&&N(k,t.tsSelecionado),(!Ve||e.tsSelecionado)&&L!==(L=t.tsSelecionado))for(var i=0;i<k.options.length;i+=1){var r=k.options[i];if(r.__value===L){r.selected=!0;break}}Ye===(Ye=Xe(0,t))&&et?et.p(e,t):(et&&et.d(1),(et=Ye&&Ye(t))&&(et.c(),X(et,1),et.m(E,null)));var a={};e.listaDeTemposMediosNafila&&(a.data=t.listaDeTemposMediosNafila),e.numeroDeServicos&&(a.numeroDeIteracoes=t.numeroDeServicos||30),tt.$set(a);var l={};e.listaDeTemposMediosDeServico&&(l.data=t.listaDeTemposMediosDeServico),e.numeroDeServicos&&(l.numeroDeIteracoes=t.numeroDeServicos||30),ot.$set(l),0!=t.servicos.length?nt?(nt.p(e,t),X(nt,1)):((nt=Le(t)).c(),X(nt,1),nt.m(le,null)):nt&&(J(),Y(nt,1,1,()=>{nt=null}),K());var c={};e.listaDeProbabilidadesDeOperadoresLivre&&(c.data=t.listaDeProbabilidadesDeOperadoresLivre),e.numeroDeServicos&&(c.numeroDeIteracoes=t.numeroDeServicos||30),it.$set(c);var u={};e.listaDeProbDeClienteEsperarNaFila&&(u.data=t.listaDeProbDeClienteEsperarNaFila),e.numeroDeServicos&&(u.numeroDeIteracoes=t.numeroDeServicos||30),rt.$set(u);var p={};e.listaDeTemposMediosDespendidoNoSistema&&(p.data=t.listaDeTemposMediosDespendidoNoSistema),e.numeroDeServicos&&(p.numeroDeIteracoes=t.numeroDeServicos||30),at.$set(p),0!=t.servicos.length?lt?(lt.p(e,t),X(lt,1)):((lt=Ie(t)).c(),X(lt,1),lt.m(Re,null)):lt&&(J(),Y(lt,1,1,()=>{lt=null}),K())},i(e){Ve||(X(Ue.$$.fragment,e),X(Ze),X(et),X(tt.$$.fragment,e),X(ot.$$.fragment,e),X(nt),X(it.$$.fragment,e),X(rt.$$.fragment,e),X(at.$$.fragment,e),X(lt),X(st.$$.fragment,e),Ve=!0)},o(e){Y(Ue.$$.fragment,e),Y(tt.$$.fragment,e),Y(ot.$$.fragment,e),Y(nt),Y(it.$$.fragment,e),Y(rt.$$.fragment,e),Y(at.$$.fragment,e),Y(lt),Y(st.$$.fragment,e),Ve=!1},d(e){ie(Ue,e),e&&(g(t),g(o)),D(Qe,e),Ze&&Ze.d(),D(Ke,e),et&&et.d(),e&&(g(B),g(H),g(z),g(Q)),ie(tt),ie(ot),nt&&nt.d(),ie(it),ie(rt),ie(at),e&&(g(De),g(be),g(Se),g(_e)),lt&&lt.d(),e&&g(Pe),ie(st,e),i(je)}}}const qe=()=>window.print();function Ve(e,t,o){let n=1,i=0,r=0,a=[],l=[],s=15,c=[],d=[],u=[],p=[],m=[],f=[];const v=()=>{o("listaDeTemposMediosNafila",d=[...d,_()]),o("listaDeTemposMediosDeServico",u=[...u,S()]),o("listaDeProbabilidadesDeOperadoresLivre",p=[...p,C()]),o("listaDeProbDeClienteEsperarNaFila",m=[...m,$()]),o("listaDeTemposMediosDespendidoNoSistema",f=[...f,x()])},h=(e,t)=>{let i;return i=0!=c.length?((e,t)=>{const i=n+1,r=e,a=b().tempoChegadaNoRelogio+r,l=t,s=()=>{const e=b().tempoFinalDoServicoNoRelogio;return e>a?e:a},c=()=>{const e=b().tempoFinalDoServicoNoRelogio-a;return e>0?e:0},d=l+s(),u=l+c(),p=s()-b().tempoFinalDoServicoNoRelogio,m={cliente:i,tempoDesdeUltimaChegada:r,tempoChegadaNoRelogio:a,tempoServico:l,tempoInicioServicoNoRelogio:s(),tempoClienteNaFila:c(),tempoFinalDoServicoNoRelogio:d,tempoClienteNoSistema:u,tempoLivreDoOperador:p};return o("numeroDeClientesAcumulados",n+=1),m})(e,t):((e,t)=>{return{cliente:1,tempoDesdeUltimaChegada:e,tempoChegadaNoRelogio:e,tempoServico:t,tempoInicioServicoNoRelogio:e,tempoClienteNaFila:0,tempoFinalDoServicoNoRelogio:e+t,tempoClienteNoSistema:t,tempoLivreDoOperador:e}})(e,t)},g=()=>{if(1===E.id&&(a=[...a,w]),2===E.id){let e=ge(1/w);a=[...a,e]}if(3===E.id){let e=De(w,O);a=[...a,e]}},D=()=>{if(1===F.id&&(l=[...l,k]),2===F.id){let e=ge(1/k);l=[...l,e]}if(3===F.id){let e=De(k,A);l=[...l,e]}};let b,S,_,$,C,x,M=[{id:1,text:"Determinístico"},{id:2,text:"Aleatório Exponencial"},{id:3,text:"Aleatório Normal"}],N=[{id:1,text:"Determinístico"},{id:2,text:"Aleatório Exponencial"},{id:3,text:"Aleatório Normal"}],E="",F="",w="",O="",k="",A="";return e.$$.update=((e={servicos:1,numeroDeClientesAcumulados:1,tempoTotalDeSimulacao:1})=>{e.servicos&&(b=(()=>c[c.length-1])),(e.numeroDeClientesAcumulados||e.servicos)&&o("tempoMedioDeServicos",S=(()=>{let e=n;return c.map(e=>e.tempoServico).reduce((e,t)=>e+=t)/e})),(e.numeroDeClientesAcumulados||e.servicos)&&o("tempoMedioDeEsperaNaFila",_=(()=>{return c.map(e=>e.tempoClienteNaFila).reduce((e,t)=>e+=t)/n})),(e.numeroDeClientesAcumulados||e.servicos)&&o("probabilidadeDeEspera",$=(()=>{let e=n;return c.map(e=>e.tempoClienteNaFila).filter(e=>e>0&&void 0!==e).length/e})),(e.servicos||e.tempoTotalDeSimulacao)&&o("probabilidadeDeOperadorLivre",C=(()=>{return c.map(e=>e.tempoLivreDoOperador).reduce((e,t)=>e+=t)/r})),(e.numeroDeClientesAcumulados||e.servicos)&&o("tempoMedioDespendidoNoSistema",x=(()=>{let e=n;return c.map(e=>e.tempoClienteNoSistema).reduce((e,t)=>e+=t)/e}))}),{numeroDeClientesAcumulados:n,tempoTotalDeSimulacao:r,numeroDeServicos:s,servicos:c,listaDeTemposMediosNafila:d,listaDeTemposMediosDeServico:u,listaDeProbabilidadesDeOperadoresLivre:p,listaDeProbDeClienteEsperarNaFila:m,listaDeTemposMediosDespendidoNoSistema:f,handleSubmit:e=>{e.preventDefault(),(()=>{for(var e=0;i<r;){g(),D();let t=h(a[e],l[e]);o("servicos",c=[...c,t]),i+=t.tempoDesdeUltimaChegada,e++,v(),console.log(i)}})()},handleSimularSlideClick:()=>{o("numeroDeClientesAcumulados",n=1),i=0,o("tempoTotalDeSimulacao",r=0),a=[],l=[],o("servicos",c=[]),o("listaDeTemposMediosNafila",d=[]),o("listaDeTemposMediosDeServico",u=[]),o("listaDeProbabilidadesDeOperadoresLivre",p=[]),o("listaDeProbDeClienteEsperarNaFila",m=[]),o("listaDeTemposMediosDespendidoNoSistema",f=[]),o("numeroDeServicos",s=he.numeroDeServicos),o("tempoTotalDeSimulacao",r=he.tempoTotalDeSimulacao);for(let e=0;e<s;e++)setTimeout(()=>{let t=h(he.temposEntreTodasChegadas[e],he.temposDeTodosOsServicos[e]);o("servicos",c=[...c,t]),v()},1e3*e)},tecOpcoes:M,tsOpcoes:N,tecSelecionado:E,tsSelecionado:F,inputMeanTEC:w,inputStdTEC:O,inputMeanTS:k,inputStdTS:A,tempoMedioDeServicos:S,tempoMedioDeEsperaNaFila:_,probabilidadeDeEspera:$,probabilidadeDeOperadorLivre:C,tempoMedioDespendidoNoSistema:x,input0_input_handler:function(){r=T(this.value),o("tempoTotalDeSimulacao",r)},select0_change_handler:function(){E=y(this),o("tecSelecionado",E),o("tecOpcoes",M)},input_input_handler:function(){w=T(this.value),o("inputMeanTEC",w)},input_input_handler_1:function(){w=T(this.value),o("inputMeanTEC",w)},input0_input_handler_1:function(){w=T(this.value),o("inputMeanTEC",w)},input1_input_handler:function(){O=T(this.value),o("inputStdTEC",O)},select1_change_handler:function(){F=y(this),o("tsSelecionado",F),o("tsOpcoes",N)},input_input_handler_2:function(){k=T(this.value),o("inputMeanTS",k)},input_input_handler_3:function(){k=T(this.value),o("inputMeanTS",k)},input0_input_handler_2:function(){k=T(this.value),o("inputMeanTS",k)},input1_input_handler_1:function(){A=T(this.value),o("inputStdTS",A)}}}return new class extends le{constructor(e){super(),ae(this,e,Ve,Pe,a,[])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
