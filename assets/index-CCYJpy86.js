var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},r={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},i=1e3,a=1001,o=1002,s=1003,c=1004,l=1005,u=1006,d=1007,f=1008,p=1009,m=1010,h=1011,g=1012,_=1013,v=1014,y=1015,b=1016,x=1017,S=1018,C=1020,w=35902,T=35899,E=1021,D=1022,O=1023,k=1026,A=1027,j=1028,M=1029,N=1030,P=1031,F=1033,I=33776,L=33777,R=33778,ee=33779,te=35840,z=35841,ne=35842,re=35843,B=36196,ie=37492,ae=37496,oe=37488,se=37489,ce=37490,le=37491,ue=37808,de=37809,fe=37810,pe=37811,me=37812,he=37813,ge=37814,_e=37815,V=37816,ve=37817,ye=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,H=36284,De=36285,Oe=36286,ke=2300,U=2301,Ae=2302,W=2303,G=2400,je=2401,Me=2402,Ne=3200,Pe=`srgb`,Fe=`srgb-linear`,Ie=`linear`,Le=`srgb`,Re=7680,ze=35044,Be=2e3;function Ve(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function He(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ue(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function We(){let e=Ue(`canvas`);return e.style.display=`block`,e}var Ge={};function Ke(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function qe(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function K(...e){e=qe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function q(...e){e=qe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Je(...e){let t=e.join(` `);t in Ge||(Ge[t]=!0,K(...e))}function Ye(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Xe={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Ze=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Qe=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),$e=1234567,et=Math.PI/180,tt=180/Math.PI;function nt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Qe[e&255]+Qe[e>>8&255]+Qe[e>>16&255]+Qe[e>>24&255]+`-`+Qe[t&255]+Qe[t>>8&255]+`-`+Qe[t>>16&15|64]+Qe[t>>24&255]+`-`+Qe[n&63|128]+Qe[n>>8&255]+`-`+Qe[n>>16&255]+Qe[n>>24&255]+Qe[r&255]+Qe[r>>8&255]+Qe[r>>16&255]+Qe[r>>24&255]).toLowerCase()}function J(e,t,n){return Math.max(t,Math.min(n,e))}function rt(e,t){return(e%t+t)%t}function it(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function at(e,t,n){return e===t?0:(n-e)/(t-e)}function ot(e,t,n){return(1-n)*e+n*t}function st(e,t,n,r){return ot(e,t,1-Math.exp(-n*r))}function ct(e,t=1){return t-Math.abs(rt(e,t*2)-t)}function lt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ut(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function dt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ft(e,t){return e+Math.random()*(t-e)}function pt(e){return e*(.5-Math.random())}function mt(e){e!==void 0&&($e=e);let t=$e+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ht(e){return e*et}function gt(e){return e*tt}function _t(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function vt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function yt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function bt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:K(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function xt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function St(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Ct={DEG2RAD:et,RAD2DEG:tt,generateUUID:nt,clamp:J,euclideanModulo:rt,mapLinear:it,inverseLerp:at,lerp:ot,damp:st,pingpong:ct,smoothstep:lt,smootherstep:ut,randInt:dt,randFloat:ft,randFloatSpread:pt,seededRandom:mt,degToRad:ht,radToDeg:gt,isPowerOfTwo:_t,ceilPowerOfTwo:vt,floorPowerOfTwo:yt,setQuaternionFromProperEuler:bt,normalize:St,denormalize:xt},Y=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(J(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},wt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:K(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(J(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Et.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Et.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this.z=J(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this.z=J(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tt.copy(this).projectOnVector(e),this.sub(Tt)}reflect(e){return this.sub(Tt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(J(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Tt=new X,Et=new wt,Dt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Je(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ot.makeScale(e,t)),this}rotate(e){return Je(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ot.makeRotation(-e)),this}translate(e,t){return Je(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ot.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ot=new Dt,kt=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),At=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jt(){let e={enabled:!0,workingColorSpace:Fe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Nt(e.r),e.g=Nt(e.g),e.b=Nt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ie:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Je(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Je(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Fe]:{primaries:t,whitePoint:r,transfer:Ie,toXYZ:kt,fromXYZ:At,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:kt,fromXYZ:At,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),e}var Mt=jt();function Nt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Pt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ft,It=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ft===void 0&&(Ft=Ue(`canvas`)),Ft.width=e.width,Ft.height=e.height;let t=Ft.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ft}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ue(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Nt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Nt(t[e]/255)*255):t[e]=Nt(t[e]);return{data:t,width:e.width,height:e.height}}return K(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Lt=0,Rt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Lt++}),this.uuid=nt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(zt(r[t].image)):e.push(zt(r[t]))}else e=zt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function zt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?It.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(K(`Texture: Unable to serialize Texture.`),{})}var Bt=0,Vt=new X,Ht=class e extends Ze{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=a,i=a,o=u,s=f,c=O,l=p,d=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bt++}),this.uuid=nt(),this.name=``,this.source=new Rt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=l,this.offset=new Y(0,0),this.repeat=new Y(1,1),this.center=new Y(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vt).x}get height(){return this.source.getSize(Vt).y}get depth(){return this.source.getSize(Vt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){K(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){K(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case i:e.x-=Math.floor(e.x);break;case a:e.x=e.x<0?0:1;break;case o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case i:e.y-=Math.floor(e.y);break;case a:e.y=e.y<0?0:1;break;case o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ht.DEFAULT_IMAGE=null,Ht.DEFAULT_MAPPING=300,Ht.DEFAULT_ANISOTROPY=1;var Ut=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=J(this.x,e.x,t.x),this.y=J(this.y,e.y,t.y),this.z=J(this.z,e.z,t.z),this.w=J(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=J(this.x,e,t),this.y=J(this.y,e,t),this.z=J(this.z,e,t),this.w=J(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(J(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wt=class extends Ze{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:u,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t),this.textures=[];let r=new Ht({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:u,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Rt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Gt=class extends Wt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kt=class extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=s,this.minFilter=s,this.wrapR=a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},qt=class extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=s,this.minFilter=s,this.wrapR=a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Jt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Yt.setFromMatrixColumn(e,0).length(),i=1/Yt.setFromMatrixColumn(e,1).length(),a=1/Yt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zt,e,Qt)}lookAt(e,t,n){let r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$t.crossVectors(n,tn),$t.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$t.crossVectors(n,tn)),$t.normalize(),en.crossVectors(tn,$t),r[0]=$t.x,r[4]=en.x,r[8]=tn.x,r[1]=$t.y,r[5]=en.y,r[9]=tn.y,r[2]=$t.z,r[6]=en.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Yt.set(r[0],r[1],r[2]).length(),o=Yt.set(r[4],r[5],r[6]).length(),s=Yt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Xt.copy(this);let c=1/a,l=1/o,u=1/s;return Xt.elements[0]*=c,Xt.elements[1]*=c,Xt.elements[2]*=c,Xt.elements[4]*=l,Xt.elements[5]*=l,Xt.elements[6]*=l,Xt.elements[8]*=u,Xt.elements[9]*=u,Xt.elements[10]*=u,t.setFromRotationMatrix(Xt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Be,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Be,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yt=new X,Xt=new Jt,Zt=new X(0,0,0),Qt=new X(1,1,1),$t=new X,en=new X,tn=new X,nn=new Jt,rn=new wt,an=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(J(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-J(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(J(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-J(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(J(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-J(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:K(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rn.setFromEuler(this),this.setFromQuaternion(rn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER=`XYZ`;var on=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},sn=0,cn=new X,ln=new wt,un=new Jt,dn=new X,fn=new X,pn=new X,mn=new wt,hn=new X(1,0,0),gn=new X(0,1,0),_n=new X(0,0,1),vn={type:`added`},yn={type:`removed`},bn={type:`childadded`,child:null},xn={type:`childremoved`,child:null},Sn=class e extends Ze{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sn++}),this.uuid=nt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new X,n=new an,r=new wt,i=new X(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Jt},normalMatrix:{value:new Dt}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new on,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.multiply(ln),this}rotateOnWorldAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.premultiply(ln),this}rotateX(e){return this.rotateOnAxis(hn,e)}rotateY(e){return this.rotateOnAxis(gn,e)}rotateZ(e){return this.rotateOnAxis(_n,e)}translateOnAxis(e,t){return cn.copy(e).applyQuaternion(this.quaternion),this.position.add(cn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hn,e)}translateY(e){return this.translateOnAxis(gn,e)}translateZ(e){return this.translateOnAxis(_n,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dn.copy(e):dn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(fn,dn,this.up):un.lookAt(dn,fn,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),ln.setFromRotationMatrix(un),this.quaternion.premultiply(ln.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(q(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null):q(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,e,pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,mn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Sn.DEFAULT_UP=new X(0,1,0),Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=class extends Sn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},wn={type:`move`},Tn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},En={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},On={h:0,s:0,l:0};function kn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Z=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Mt.workingColorSpace){if(e=rt(e,1),t=J(t,0,1),n=J(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=kn(i,r,e+1/3),this.g=kn(i,r,e),this.b=kn(i,r,e-1/3)}return Mt.colorSpaceToWorking(this,r),this}setStyle(e,t=Pe){function n(t){t!==void 0&&parseFloat(t)<1&&K(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:K(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);K(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pe){let n=En[e.toLowerCase()];return n===void 0?K(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nt(e.r),this.g=Nt(e.g),this.b=Nt(e.b),this}copyLinearToSRGB(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pe){return Mt.workingToColorSpace(An.copy(this),e),Math.round(J(An.r*255,0,255))*65536+Math.round(J(An.g*255,0,255))*256+Math.round(J(An.b*255,0,255))}getHexString(e=Pe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(An.copy(this),t);let n=An.r,r=An.g,i=An.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=Pe){Mt.workingToColorSpace(An.copy(this),e);let t=An.r,n=An.g,r=An.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(On);let n=ot(Dn.h,On.h,t),r=ot(Dn.s,On.s,t),i=ot(Dn.l,On.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new Z;Z.NAMES=En;var jn=class extends Sn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Mn=new X,Nn=new X,Pn=new X,Fn=new X,In=new X,Ln=new X,Rn=new X,zn=new X,Bn=new X,Vn=new X,Hn=new Ut,Un=new Ut,Wn=new Ut,Gn=class e{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Mn.subVectors(e,t),r.cross(Mn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Mn.subVectors(r,t),Nn.subVectors(n,t),Pn.subVectors(e,t);let a=Mn.dot(Mn),o=Mn.dot(Nn),s=Mn.dot(Pn),c=Nn.dot(Nn),l=Nn.dot(Pn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Fn)!==null&&Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Fn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Fn.x),s.addScaledVector(a,Fn.y),s.addScaledVector(o,Fn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Hn.setScalar(0),Un.setScalar(0),Wn.setScalar(0),Hn.fromBufferAttribute(e,t),Un.fromBufferAttribute(e,n),Wn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Hn,i.x),a.addScaledVector(Un,i.y),a.addScaledVector(Wn,i.z),a}static isFrontFacing(e,t,n,r){return Mn.subVectors(n,t),Nn.subVectors(e,t),Mn.cross(Nn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),Mn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;In.subVectors(r,n),Ln.subVectors(i,n),zn.subVectors(e,n);let s=In.dot(zn),c=Ln.dot(zn);if(s<=0&&c<=0)return t.copy(n);Bn.subVectors(e,r);let l=In.dot(Bn),u=Ln.dot(Bn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(In,a);Vn.subVectors(e,i);let f=In.dot(Vn),p=Ln.dot(Vn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ln,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Rn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Rn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(In,a).addScaledVector(Ln,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kn=class{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Jn):Jn.fromBufferAttribute(r,t),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Yn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Yn.copy(e.boundingBox)),Yn.applyMatrix4(e.matrixWorld),this.union(Yn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),rr.subVectors(this.max,nr),Xn.subVectors(e.a,nr),Zn.subVectors(e.b,nr),Qn.subVectors(e.c,nr),$n.subVectors(Zn,Xn),er.subVectors(Qn,Zn),tr.subVectors(Xn,Qn);let t=[0,-$n.z,$n.y,0,-er.z,er.y,0,-tr.z,tr.y,$n.z,0,-$n.x,er.z,0,-er.x,tr.z,0,-tr.x,-$n.y,$n.x,0,-er.y,er.x,0,-tr.y,tr.x,0];return!or(t,Xn,Zn,Qn,rr)||(t=[1,0,0,0,1,0,0,0,1],!or(t,Xn,Zn,Qn,rr))?!1:(ir.crossVectors($n,er),t=[ir.x,ir.y,ir.z],or(t,Xn,Zn,Qn,rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},qn=[new X,new X,new X,new X,new X,new X,new X,new X],Jn=new X,Yn=new Kn,Xn=new X,Zn=new X,Qn=new X,$n=new X,er=new X,tr=new X,nr=new X,rr=new X,ir=new X,ar=new X;function or(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ar.fromArray(e,a);let o=i.x*Math.abs(ar.x)+i.y*Math.abs(ar.y)+i.z*Math.abs(ar.z),s=t.dot(ar),c=n.dot(ar),l=r.dot(ar);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var sr=new X,cr=new Y,lr=0,ur=class extends Ze{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ze,this.updateRanges=[],this.gpuType=y,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXY(t,cr.x,cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyMatrix3(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyMatrix4(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.applyNormalMatrix(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)sr.fromBufferAttribute(this,t),sr.transformDirection(e),this.setXYZ(t,sr.x,sr.y,sr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xt(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xt(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xt(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),r=St(r,this.array),i=St(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},dr=class extends ur{constructor(e,t,n){super(new Uint16Array(e),t,n)}},fr=class extends ur{constructor(e,t,n){super(new Uint32Array(e),t,n)}},pr=class extends ur{constructor(e,t,n){super(new Float32Array(e),t,n)}},mr=new Kn,hr=new X,gr=new X,_r=class{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?mr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hr.subVectors(e,this.center);let t=hr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(hr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hr.copy(e.center).add(gr)),this.expandByPoint(hr.copy(e.center).sub(gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},vr=0,yr=new Jt,br=new Sn,xr=new X,Sr=new Kn,Cr=new Kn,wr=new X,Tr=class e extends Ze{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vr++}),this.uuid=nt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ve(e)?fr:dr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Dt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yr.makeRotationFromQuaternion(e),this.applyMatrix4(yr),this}rotateX(e){return yr.makeRotationX(e),this.applyMatrix4(yr),this}rotateY(e){return yr.makeRotationY(e),this.applyMatrix4(yr),this}rotateZ(e){return yr.makeRotationZ(e),this.applyMatrix4(yr),this}translate(e,t,n){return yr.makeTranslation(e,t,n),this.applyMatrix4(yr),this}scale(e,t,n){return yr.makeScale(e,t,n),this.applyMatrix4(yr),this}lookAt(e){return br.lookAt(e),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new pr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&K(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){q(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Sr.setFromBufferAttribute(n),this.morphTargetsRelative?(wr.addVectors(this.boundingBox.min,Sr.min),this.boundingBox.expandByPoint(wr),wr.addVectors(this.boundingBox.max,Sr.max),this.boundingBox.expandByPoint(wr)):(this.boundingBox.expandByPoint(Sr.min),this.boundingBox.expandByPoint(Sr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&q(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){q(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new X,1/0);return}if(e){let n=this.boundingSphere.center;if(Sr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cr.setFromBufferAttribute(n),this.morphTargetsRelative?(wr.addVectors(Sr.min,Cr.min),Sr.expandByPoint(wr),wr.addVectors(Sr.max,Cr.max),Sr.expandByPoint(wr)):(Sr.expandByPoint(Cr.min),Sr.expandByPoint(Cr.max))}Sr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)wr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(wr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)wr.fromBufferAttribute(a,t),o&&(xr.fromBufferAttribute(e,t),wr.add(xr)),r=Math.max(r,n.distanceToSquared(wr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&q(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){q(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ur(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new X,s[e]=new X;let c=new X,l=new X,u=new X,d=new Y,f=new Y,p=new Y,m=new X,h=new X;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new X,y=new X,b=new X,x=new X;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ur(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new X,i=new X,a=new X,o=new X,s=new X,c=new X,l=new X,u=new X;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wr.fromBufferAttribute(e,t),wr.normalize(),e.setXYZ(t,wr.x,wr.y,wr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ur(a,r,i)}if(this.index===null)return K(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Er=new X,Dr=new X,Or=new Dt,kr=class{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Er.subVectors(n,t).cross(Dr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Er),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Or.getNormalMatrix(e),r=this.coplanarPoint(Er).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ar=0,jr=class extends Ze{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ar++}),this.uuid=nt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Re,this.stencilZFail=Re,this.stencilZPass=Re,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){K(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){K(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new kr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Y().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Y().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Mr=new X,Nr=new X,Pr=new X,Fr=new X,Ir=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mr.copy(this.origin).addScaledVector(this.direction,t),Mr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Nr.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Fr.copy(this.origin).sub(Nr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),o=Fr.dot(this.direction),s=-Fr.dot(Pr),c=Fr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Nr).addScaledVector(Pr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Mr.subVectors(e.center,this.origin);let n=Mr.dot(this.direction),r=Mr.dot(Mr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Mr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,R=E-F*D,ee=O-P*A,te=k-F*A,z=j-P*N,ne=M-F*N,re=z*te-ne*ee,B=L*ne-R*z,ie=ee*R-te*L;if(r){if(re<0||B<0||ie<0)return null}else if((re<0||B<0||ie<0)&&(re>0||B>0||ie>0))return null;let ae=re+B+ie;if(ae===0)return null;let oe=I*(re*D+B*A+ie*N);return(ae>0?oe<0:oe>0)?null:this.at(oe/ae,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Lr=class extends jr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Rr=new Jt,zr=new Ir,Br=new _r,Vr=new X,Hr=new X,Ur=new X,Wr=new X,Gr=new X,Kr=new X,qr=new X,Jr=new X,Yr=class extends Sn{constructor(e=new Tr,t=new Lr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Kr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Gr.fromBufferAttribute(s,e),a?Kr.addScaledVector(Gr,r):Kr.addScaledVector(Gr.sub(t),r))}t.add(Kr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),zr.copy(e.ray).recast(e.near),!(Br.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Br,Vr)===null||zr.origin.distanceToSquared(Vr)>(e.far-e.near)**2))&&(Rr.copy(i).invert(),zr.copy(e.ray).applyMatrix4(Rr),(n.boundingBox===null||zr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,zr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Zr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Zr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Zr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Zr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Xr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Jr.copy(s),Jr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Jr);return l<n.near||l>n.far?null:{distance:l,point:Jr.clone(),object:e}}function Zr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Hr),e.getVertexPosition(c,Ur),e.getVertexPosition(l,Wr);let u=Xr(e,t,n,r,Hr,Ur,Wr,qr);if(u){let e=new X;Gn.getBarycoord(qr,Hr,Ur,Wr,e),i&&(u.uv=Gn.getInterpolatedAttribute(i,s,c,l,e,new Y)),a&&(u.uv1=Gn.getInterpolatedAttribute(a,s,c,l,e,new Y)),o&&(u.normal=Gn.getInterpolatedAttribute(o,s,c,l,e,new X),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new X,materialIndex:0};Gn.getNormal(Hr,Ur,Wr,t.normal),u.face=t,u.barycoord=e}return u}var Qr=class extends Ht{constructor(e=null,t=1,n=1,r,i,a,o,c,l=s,u=s,d,f){super(null,a,o,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$r=class extends ur{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ei=new Jt,ti=new Jt,ni=[],ri=new Kn,ii=new Jt,ai=new Yr,oi=new _r,si=class extends Yr{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ii)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),ri.copy(e.boundingBox).applyMatrix4(ei),this.boundingBox.union(ri)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _r),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),oi.copy(e.boundingSphere).applyMatrix4(ei),this.boundingSphere.union(oi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ai.geometry=this.geometry,ai.material=this.material,ai.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oi.copy(this.boundingSphere),oi.applyMatrix4(n),e.ray.intersectsSphere(oi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ei),ti.multiplyMatrices(n,ei),ai.matrixWorld=ti,ai.raycast(e,ni);for(let e=0,n=ni.length;e<n;e++){let n=ni[e];n.instanceId=i,n.object=this,t.push(n)}ni.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qr(new Float32Array(r*this.count),r,this.count,j,y));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ci=new _r,li=new Y(.5,.5),ui=new X,di=class{constructor(e=new kr,t=new kr,n=new kr,r=new kr,i=new kr,a=new kr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Be,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){return ci.center.set(0,0,0),ci.radius=.7071067811865476+li.distanceTo(e.center),ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ui.x=r.normal.x>0?e.max.x:e.min.x,ui.y=r.normal.y>0?e.max.y:e.min.y,ui.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ui)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},fi=class extends Ht{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pi=class extends Ht{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},mi=class extends Ht{constructor(e,t,n=v,r,i,a,o=s,c=s,l,u=k,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},hi=class extends mi{constructor(e,t=v,n=301,r,i,a=s,o=s,c,l=k){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},gi=class extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},_i=class e extends Tr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new pr(c,3)),this.setAttribute(`normal`,new pr(l,3)),this.setAttribute(`uv`,new pr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new X;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},vi=class e extends Tr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new X,l=new Y;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new pr(a,3)),this.setAttribute(`normal`,new pr(o,3)),this.setAttribute(`uv`,new pr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},yi=class e extends Tr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new pr(u,3)),this.setAttribute(`normal`,new pr(d,3)),this.setAttribute(`uv`,new pr(f,2));function _(){let a=new X,_=new X,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new Y,m=new X,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},bi=class e extends Tr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new pr(p,3)),this.setAttribute(`normal`,new pr(m,3)),this.setAttribute(`uv`,new pr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},xi=class extends jr{constructor(e){super(),this.isShadowMaterial=!0,this.type=`ShadowMaterial`,this.color=new Z(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function Si(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(wi(i))i.isRenderTargetTexture?(K(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(wi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ci(e){let t={};for(let n=0;n<e.length;n++){let r=Si(e[n]);for(let e in r)t[e]=r[e]}return t}function wi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Ti(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ei(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Mt.workingColorSpace}var Di={clone:Si,merge:Ci},Oi=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ki=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ai=class extends jr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Oi,this.fragmentShader=ki,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Si(e.uniforms),this.uniformsGroups=Ti(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Z().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new X().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ut().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Dt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Jt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ji=class extends Ai{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Mi=class extends jr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Z(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ni=class extends Mi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Y(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return J(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Z(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Z(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Z(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Pi=class extends jr{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type=`MeshNormalMaterial`,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Fi=class extends jr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Y(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ii=class extends jr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ne,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Li=class extends jr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ri(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function zi(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Bi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Vi=class extends Bi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:G,endingEnd:G}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case je:i=e,o=2*t-n;break;case Me:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case je:a=e,s=2*n-t;break;case Me:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Hi=class extends Bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ui=class extends Bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wi=class extends Bi{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=qi(n,t,g,y,r);i[p]=Gi(x,o,_,b,m)}return i}};function Gi(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ki(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function qi(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Gi(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ki(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Ji=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ri(t,this.TimeBufferType),this.values=Ri(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ri(e.times,Array),values:Ri(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),zi(e.settings)&&(n.settings={inTangents:Ri(e.settings.inTangents,Array),outTangents:Ri(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ui(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Vi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Wi(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ke:t=this.InterpolantFactoryMethodDiscrete;break;case U:t=this.InterpolantFactoryMethodLinear;break;case Ae:t=this.InterpolantFactoryMethodSmooth;break;case W:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return K(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ke;case this.InterpolantFactoryMethodLinear:return U;case this.InterpolantFactoryMethodSmooth:return Ae;case this.InterpolantFactoryMethodBezier:return W}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;zi(this.settings)&&(Yi(this.settings.inTangents,e),Yi(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(q(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(q(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){q(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){q(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&He(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){q(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ae,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,zi(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Yi(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ji.prototype.ValueTypeName=``,Ji.prototype.TimeBufferType=Float32Array,Ji.prototype.ValueBufferType=Float32Array,Ji.prototype.DefaultInterpolation=U;var Xi=class extends Ji{constructor(e,t,n){super(e,t,n)}};Xi.prototype.ValueTypeName=`bool`,Xi.prototype.ValueBufferType=Array,Xi.prototype.DefaultInterpolation=ke,Xi.prototype.InterpolantFactoryMethodLinear=void 0,Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Zi=class extends Ji{constructor(e,t,n,r){super(e,t,n,r)}};Zi.prototype.ValueTypeName=`color`;var Qi=class extends Ji{constructor(e,t,n,r){super(e,t,n,r)}};Qi.prototype.ValueTypeName=`number`;var $i=class extends Bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)wt.slerpFlat(i,0,a,c-o,a,c,s);return i}},ea=class extends Ji{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new $i(this.times,this.values,this.getValueSize(),e)}};ea.prototype.ValueTypeName=`quaternion`,ea.prototype.InterpolantFactoryMethodSmooth=void 0;var ta=class extends Ji{constructor(e,t,n){super(e,t,n)}};ta.prototype.ValueTypeName=`string`,ta.prototype.ValueBufferType=Array,ta.prototype.DefaultInterpolation=ke,ta.prototype.InterpolantFactoryMethodLinear=void 0,ta.prototype.InterpolantFactoryMethodSmooth=void 0;var na=class extends Ji{constructor(e,t,n,r){super(e,t,n,r)}};na.prototype.ValueTypeName=`vector`;var ra={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ia(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ia(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ia(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var aa=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},oa=class{constructor(e){this.manager=e===void 0?aa:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};oa.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var sa=new WeakMap,ca=class extends oa{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=ra.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=sa.get(a);e===void 0&&(e=[],sa.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Ue(`img`);function s(){l(),t&&t(this);let n=sa.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}sa.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),ra.remove(`image:${e}`);let n=sa.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}sa.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ra.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},la=class extends oa{constructor(e){super(e)}load(e,t,n,r){let i=new Ht,a=new ca(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},ua=class extends Sn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Z(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},da=class extends ua{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Z(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},fa=new Jt,pa=new X,ma=new X,ha=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Y(512,512),this.mapType=p,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new di,this._frameExtents=new Y(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;pa.setFromMatrixPosition(e.matrixWorld),t.position.copy(pa),ma.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ma),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(fa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ga=new X,_a=new wt,va=new X,ya=class extends Sn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Be,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ga,_a,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,va.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ga,_a,va),va.x===1&&va.y===1&&va.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,va.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ba=new X,xa=new Y,Sa=new Y,Ca=class extends ya{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=tt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(et*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tt*2*Math.atan(Math.tan(et*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ba.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ba.x,ba.y).multiplyScalar(-e/ba.z),ba.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ba.x,ba.y).multiplyScalar(-e/ba.z)}getViewSize(e,t){return this.getViewBounds(e,xa,Sa),t.subVectors(Sa,xa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(et*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},wa=class extends ha{constructor(){super(new Ca(90,1,.5,500)),this.isPointLightShadow=!0}},Ta=class extends ua{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new wa}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ea=class extends ya{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Da=class extends ha{constructor(){super(new Ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oa=class extends ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new Da}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ka=-90,Aa=1,ja=class extends Sn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ca(ka,Aa,e,t);r.layers=this.layers,this.add(r);let i=new Ca(ka,Aa,e,t);i.layers=this.layers,this.add(i);let a=new Ca(ka,Aa,e,t);a.layers=this.layers,this.add(a);let o=new Ca(ka,Aa,e,t);o.layers=this.layers,this.add(o);let s=new Ca(ka,Aa,e,t);s.layers=this.layers,this.add(s);let c=new Ca(ka,Aa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ma=class extends Ca{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Na=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Pa.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Pa(){this._document.hidden===!1&&this.reset()}var Fa=`\\[\\]\\.:\\/`,Ia=RegExp(`[\\[\\]\\.:\\/]`,`g`),La=`[^\\[\\]\\.:\\/]`,Ra=`[^`+Fa.replace(`\\.`,``)+`]`,za=`((?:WC+[\\/:])*)`.replace(`WC`,La),Ba=`(WCOD+)?`.replace(`WCOD`,Ra),Va=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,La),Ha=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,La),Ua=RegExp(`^`+za+Ba+Va+Ha+`$`),Wa=[`material`,`materials`,`bones`,`map`],Ga=class{constructor(e,t,n){let r=n||Ka.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ka=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ia,``)}static parseTrackName(e){let t=Ua.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Wa.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){K(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){q(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){q(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){q(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){q(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){q(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){q(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){q(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;q(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){q(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){q(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ka.Composite=Ga,Ka.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ka.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ka.prototype.GetterByBindingType=[Ka.prototype._getValue_direct,Ka.prototype._getValue_array,Ka.prototype._getValue_arrayElement,Ka.prototype._getValue_toArray],Ka.prototype.SetterByBindingTypeAndVersioning=[[Ka.prototype._setValue_direct,Ka.prototype._setValue_direct_setNeedsUpdate,Ka.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ka.prototype._setValue_array,Ka.prototype._setValue_array_setNeedsUpdate,Ka.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ka.prototype._setValue_arrayElement,Ka.prototype._setValue_arrayElement_setNeedsUpdate,Ka.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ka.prototype._setValue_fromArray,Ka.prototype._setValue_fromArray_setNeedsUpdate,Ka.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qa=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=J(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(J(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Ja=class extends Ze{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ya(e,t,n,r){let i=Xa(r);switch(n){case E:return e*t;case j:return e*t/i.components*i.byteLength;case M:return e*t/i.components*i.byteLength;case N:return e*t*2/i.components*i.byteLength;case P:return e*t*2/i.components*i.byteLength;case D:return e*t*3/i.components*i.byteLength;case O:return e*t*4/i.components*i.byteLength;case F:return e*t*4/i.components*i.byteLength;case I:case L:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case R:case ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case z:case re:return Math.max(e,16)*Math.max(t,8)/4;case te:case ne:return Math.max(e,8)*Math.max(t,8)/2;case B:case ie:case oe:case se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ae:case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case V:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case H:return Math.ceil(e/4)*Math.ceil(t/4)*8;case De:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Xa(e){switch(e){case p:case m:return{byteLength:1,components:1};case g:case h:case b:return{byteLength:2,components:1};case x:case S:return{byteLength:2,components:4};case v:case _:case y:return{byteLength:4,components:1};case w:case T:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?K(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Za(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Qa(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var $a={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},eo={basic:{uniforms:Ci([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:$a.meshbasic_vert,fragmentShader:$a.meshbasic_frag},lambert:{uniforms:Ci([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},envMapIntensity:{value:1}}]),vertexShader:$a.meshlambert_vert,fragmentShader:$a.meshlambert_frag},phong:{uniforms:Ci([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$a.meshphong_vert,fragmentShader:$a.meshphong_frag},standard:{uniforms:Ci([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$a.meshphysical_vert,fragmentShader:$a.meshphysical_frag},toon:{uniforms:Ci([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new Z(0)}}]),vertexShader:$a.meshtoon_vert,fragmentShader:$a.meshtoon_frag},matcap:{uniforms:Ci([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:$a.meshmatcap_vert,fragmentShader:$a.meshmatcap_frag},points:{uniforms:Ci([Q.points,Q.fog]),vertexShader:$a.points_vert,fragmentShader:$a.points_frag},dashed:{uniforms:Ci([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$a.linedashed_vert,fragmentShader:$a.linedashed_frag},depth:{uniforms:Ci([Q.common,Q.displacementmap]),vertexShader:$a.depth_vert,fragmentShader:$a.depth_frag},normal:{uniforms:Ci([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:$a.meshnormal_vert,fragmentShader:$a.meshnormal_frag},sprite:{uniforms:Ci([Q.sprite,Q.fog]),vertexShader:$a.sprite_vert,fragmentShader:$a.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$a.background_vert,fragmentShader:$a.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:$a.backgroundCube_vert,fragmentShader:$a.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$a.cube_vert,fragmentShader:$a.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$a.equirect_vert,fragmentShader:$a.equirect_frag},distance:{uniforms:Ci([Q.common,Q.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$a.distance_vert,fragmentShader:$a.distance_frag},shadow:{uniforms:Ci([Q.lights,Q.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:$a.shadow_vert,fragmentShader:$a.shadow_frag}};eo.physical={uniforms:Ci([eo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:$a.meshphysical_vert,fragmentShader:$a.meshphysical_frag};var to={r:0,b:0,g:0},no=new Jt,ro=new Dt;ro.set(-1,0,0,0,1,0,0,0,1);function io(e,t,n,r,i,a){let o=new Z(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Yr(new _i(1,1,1),new Ai({name:`BackgroundCubeMaterial`,uniforms:Si(eo.backgroundCube.uniforms),vertexShader:eo.backgroundCube.vertexShader,fragmentShader:eo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(no.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ro),l.material.toneMapped=Mt.getTransfer(i.colorSpace)!==Le,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Yr(new bi(2,2),new Ai({name:`BackgroundMaterial`,uniforms:Si(eo.background.uniforms),vertexShader:eo.background.vertexShader,fragmentShader:eo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Mt.getTransfer(i.colorSpace)!==Le,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(to,Ei(e)),n.buffers.color.setClear(to.r,to.g,to.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ao(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function oo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function so(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(K(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&K(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function co(e){let t=this,n=null,r=0,i=!1,a=!1,o=new kr,s=new Dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var lo=4,uo=6,fo=20,po=256,mo=new Ea,ho=new Z,go=null,_o=0,vo=0,yo=!1,bo=new X,xo=new X,So=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=bo}=i;go=this._renderer.getRenderTarget(),_o=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ko(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(go,_o,vo),this._renderer.xr.enabled=yo,e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),go=this._renderer.getRenderTarget(),_o=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:u,minFilter:u,generateMipmaps:!1,type:b,format:O,colorSpace:Fe,depthBuffer:!1},r=wo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Co(r)),this._blurMaterial=Do(r,e,t),this._ggxMaterial=Eo(r,e,t)}return r}_compileMaterial(e){let t=new Yr(new Tr,e);this._renderer.compile(t,mo)}_sceneToCubeUV(e,t,n,r,i){let a=new Ca(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(ho),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yr(new _i,new Lr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(ho),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;To(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ko()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;To(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,mo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-lo?n-d+lo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,To(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,mo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,To(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,mo)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];To(t,3*l*(r>this._lodMax-lo?r-this._lodMax+lo:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,mo)}};function Co(e){let t=[],n=[],r=e,i=e-lo+1+uo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?xo.set(1,r,n):e===1?xo.set(-n,1,-r):e===2?xo.set(-n,r,1):e===3?xo.set(-1,r,-n):e===4?xo.set(-n,-1,r):xo.set(n,r,-1),xo.toArray(l,(e*6+t)*3)}}let u=new Tr;u.setAttribute(`position`,new ur(c,3)),u.setAttribute(`outputDirection`,new ur(l,3)),n.push(new Yr(u,null)),r>lo&&r--}return{lodMeshes:n,sizeLods:t}}function wo(e,t,n){let r=new Gt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function To(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Eo(e,t,n){return new Ai({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:po,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Do(e,t,n){return new Ai({name:`SphericalGaussianBlur`,defines:{SAMPLES:fo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ao(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Oo(){return new Ai({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ko(){return new Ai({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ao(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ao(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var jo=class extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new fi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new _i(5,5,5),i=new Ai({name:`CubemapFromEquirect`,uniforms:Si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Yr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=u),new ja(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Mo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new jo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new So(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new So(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function No(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Je(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Po(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?fr:dr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Fo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Io(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:q(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Lo(e,t,n){let r=new WeakMap,i=new Ut;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Kt(h,p,m,u);g.type=y,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Y(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ro(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var zo={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Bo(e,t,n,r,i,a){let o=new Gt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Tr;l.setAttribute(`position`,new pr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new pr([0,2,0,0,2,0],2));let u=new ji({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Yr(l,u),f=new Ea(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Gt(t,n,{type:b,depthBuffer:!1,stencilBuffer:!1}),c=new Gt(t,n,{type:b,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Mt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=zo[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Vo=new Ht,Ho=new mi(1,1),Uo=new Kt,Wo=new qt,Go=new fi,Ko=[],qo=[],Jo=new Float32Array(16),Yo=new Float32Array(9),Xo=new Float32Array(4);function Zo(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ko[i];if(a===void 0&&(a=new Float32Array(i),Ko[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Qo(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function $o(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function es(e,t){let n=qo[t];n===void 0&&(n=new Int32Array(t),qo[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ts(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qo(n,t))return;e.uniform2fv(this.addr,t),$o(n,t)}}function rs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Qo(n,t))return;e.uniform3fv(this.addr,t),$o(n,t)}}function is(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qo(n,t))return;e.uniform4fv(this.addr,t),$o(n,t)}}function as(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qo(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),$o(n,t)}else{if(Qo(n,r))return;Xo.set(r),e.uniformMatrix2fv(this.addr,!1,Xo),$o(n,r)}}function os(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qo(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),$o(n,t)}else{if(Qo(n,r))return;Yo.set(r),e.uniformMatrix3fv(this.addr,!1,Yo),$o(n,r)}}function ss(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Qo(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),$o(n,t)}else{if(Qo(n,r))return;Jo.set(r),e.uniformMatrix4fv(this.addr,!1,Jo),$o(n,r)}}function cs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ls(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qo(n,t))return;e.uniform2iv(this.addr,t),$o(n,t)}}function us(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qo(n,t))return;e.uniform3iv(this.addr,t),$o(n,t)}}function ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qo(n,t))return;e.uniform4iv(this.addr,t),$o(n,t)}}function fs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ps(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Qo(n,t))return;e.uniform2uiv(this.addr,t),$o(n,t)}}function ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Qo(n,t))return;e.uniform3uiv(this.addr,t),$o(n,t)}}function hs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Qo(n,t))return;e.uniform4uiv(this.addr,t),$o(n,t)}}function gs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Ho.compareFunction=n.isReversedDepthBuffer()?518:515,a=Ho):a=Vo,n.setTexture2D(t||a,i)}function _s(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Wo,i)}function vs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Go,i)}function ys(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Uo,i)}function bs(e){switch(e){case 5126:return ts;case 35664:return ns;case 35665:return rs;case 35666:return is;case 35674:return as;case 35675:return os;case 35676:return ss;case 5124:case 35670:return cs;case 35667:case 35671:return ls;case 35668:case 35672:return us;case 35669:case 35673:return ds;case 5125:return fs;case 36294:return ps;case 36295:return ms;case 36296:return hs;case 35678:case 36198:case 36298:case 36306:case 35682:return gs;case 35679:case 36299:case 36307:return _s;case 35680:case 36300:case 36308:case 36293:return vs;case 36289:case 36303:case 36311:case 36292:return ys}}function xs(e,t){e.uniform1fv(this.addr,t)}function Ss(e,t){let n=Zo(t,this.size,2);e.uniform2fv(this.addr,n)}function Cs(e,t){let n=Zo(t,this.size,3);e.uniform3fv(this.addr,n)}function ws(e,t){let n=Zo(t,this.size,4);e.uniform4fv(this.addr,n)}function Ts(e,t){let n=Zo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Es(e,t){let n=Zo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ds(e,t){let n=Zo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Os(e,t){e.uniform1iv(this.addr,t)}function ks(e,t){e.uniform2iv(this.addr,t)}function As(e,t){e.uniform3iv(this.addr,t)}function js(e,t){e.uniform4iv(this.addr,t)}function Ms(e,t){e.uniform1uiv(this.addr,t)}function Ns(e,t){e.uniform2uiv(this.addr,t)}function Ps(e,t){e.uniform3uiv(this.addr,t)}function Fs(e,t){e.uniform4uiv(this.addr,t)}function Is(e,t,n){let r=this.cache,i=t.length,a=es(n,i);Qo(r,a)||(e.uniform1iv(this.addr,a),$o(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ho:Vo;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Ls(e,t,n){let r=this.cache,i=t.length,a=es(n,i);Qo(r,a)||(e.uniform1iv(this.addr,a),$o(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Wo,a[e])}function Rs(e,t,n){let r=this.cache,i=t.length,a=es(n,i);Qo(r,a)||(e.uniform1iv(this.addr,a),$o(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Go,a[e])}function zs(e,t,n){let r=this.cache,i=t.length,a=es(n,i);Qo(r,a)||(e.uniform1iv(this.addr,a),$o(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Uo,a[e])}function Bs(e){switch(e){case 5126:return xs;case 35664:return Ss;case 35665:return Cs;case 35666:return ws;case 35674:return Ts;case 35675:return Es;case 35676:return Ds;case 5124:case 35670:return Os;case 35667:case 35671:return ks;case 35668:case 35672:return As;case 35669:case 35673:return js;case 5125:return Ms;case 36294:return Ns;case 36295:return Ps;case 36296:return Fs;case 35678:case 36198:case 36298:case 36306:case 35682:return Is;case 35679:case 36299:case 36307:return Ls;case 35680:case 36300:case 36308:case 36293:return Rs;case 36289:case 36303:case 36311:case 36292:return zs}}var Vs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bs(t.type)}},Hs=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bs(t.type)}},Us=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ws=/(\w+)(\])?(\[|\.)?/g;function Gs(e,t){e.seq.push(t),e.map[t.id]=t}function Ks(e,t,n){let r=e.name,i=r.length;for(Ws.lastIndex=0;;){let a=Ws.exec(r),o=Ws.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Gs(n,l===void 0?new Vs(s,e,t):new Hs(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Us(s),Gs(n,e)),n=e}}}var qs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ks(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Js(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ys=37297,Xs=0;function Zs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Qs=new Dt;function $s(e){Mt._getMatrix(Qs,Mt.workingColorSpace,e);let t=`mat3( ${Qs.elements.map(e=>e.toFixed(4))} )`;switch(Mt.getTransfer(e)){case Ie:return[t,`LinearTransferOETF`];case Le:return[t,`sRGBTransferOETF`];default:return K(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ec(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Zs(e.getShaderSource(t),r)}return i}function tc(e,t){let n=$s(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var nc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function rc(e,t){let n=nc[t];return n===void 0?(K(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var ic=new X;function ac(){return Mt.getLuminanceCoefficients(ic),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${ic.x.toFixed(4)}, ${ic.y.toFixed(4)}, ${ic.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function oc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(lc).join(`
`)}function sc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function cc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function lc(e){return e!==``}function uc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var fc=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(e){return e.replace(fc,hc)}var mc=new Map;function hc(e,t){let n=$a[t];if(n===void 0){let e=mc.get(t);if(e!==void 0)n=$a[e],K(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return pc(n)}var gc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _c(e){return e.replace(gc,vc)}function vc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function yc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var bc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function xc(e){return bc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Sc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Cc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Sc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var wc={302:`ENVMAP_MODE_REFRACTION`};function Tc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:wc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ec={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Dc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ec[e.combine]||`ENVMAP_BLENDING_NONE`}function Oc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function kc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=xc(n),l=Cc(n),u=Tc(n),d=Dc(n),f=Oc(n),p=oc(n),m=sc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(lc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(lc).join(`
`),_.length>0&&(_+=`
`)):(g=[yc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(lc).join(`
`),_=[yc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:$a.tonemapping_pars_fragment,n.toneMapping===0?``:rc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,$a.colorspace_pars_fragment,tc(`linearToOutputTexel`,n.outputColorSpace),ac(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(lc).join(`
`)),o=pc(o),o=uc(o,n),o=dc(o,n),s=pc(s),s=uc(s,n),s=dc(s,n),o=_c(o),s=_c(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Js(i,i.VERTEX_SHADER,y),S=Js(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ec(i,x,`vertex`),n=ec(i,S,`fragment`);q(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):K(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new qs(i,h),T=cc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ys)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Xs++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Ac=0,jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Mc(e),t.set(e,n)),n}},Mc=class{constructor(e){this.id=Ac++,this.code=e,this.usedTimes=0}};function Nc(e){return e===1030||e===37490||e===36285}function Pc(e,t,n,r,i,a){let o=new on,s=new jc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&K(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=eo[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,R=!!i.aoMap,ee=!!i.lightMap,te=!!i.bumpMap&&i.wireframe===!1,z=!!i.normalMap,ne=!!i.displacementMap,re=!!i.emissiveMap,B=!!i.metalnessMap,ie=!!i.roughnessMap,ae=i.anisotropy>0,oe=i.clearcoat>0,se=i.dispersion>0,ce=i.retroreflectivity>0,le=i.iridescence>0,ue=i.sheen>0,de=i.transmission>0,fe=ae&&!!i.anisotropyMap,pe=oe&&!!i.clearcoatMap,me=oe&&!!i.clearcoatNormalMap,he=oe&&!!i.clearcoatRoughnessMap,ge=le&&!!i.iridescenceMap,_e=le&&!!i.iridescenceThicknessMap,V=ue&&!!i.sheenColorMap,ve=ue&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,xe=!!i.specularIntensityMap,Se=de&&!!i.transmissionMap,Ce=de&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,H=!!i.alphaHash,De=!!i.extensions,Oe=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Oe=e.toneMapping);let ke={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:R,lightMap:ee,bumpMap:te,normalMap:z,displacementMap:ne,emissiveMap:re,normalMapObjectSpace:z&&i.normalMapType===1,normalMapTangentSpace:z&&i.normalMapType===0,packedNormalMap:z&&i.normalMapType===0&&Nc(i.normalMap.format),metalnessMap:B,roughnessMap:ie,anisotropy:ae,anisotropyMap:fe,clearcoat:oe,clearcoatMap:pe,clearcoatNormalMap:me,clearcoatRoughnessMap:he,dispersion:se,retroreflection:ce,iridescence:le,iridescenceMap:ge,iridescenceThicknessMap:_e,sheen:ue,sheenColorMap:V,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:be,specularIntensityMap:xe,transmission:de,transmissionMap:Se,thicknessMap:Ce,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:H,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:R&&m(i.aoMap.channel),lightMapUv:ee&&m(i.lightMap.channel),bumpMapUv:te&&m(i.bumpMap.channel),normalMapUv:z&&m(i.normalMap.channel),displacementMapUv:ne&&m(i.displacementMap.channel),emissiveMapUv:re&&m(i.emissiveMap.channel),metalnessMapUv:B&&m(i.metalnessMap.channel),roughnessMapUv:ie&&m(i.roughnessMap.channel),anisotropyMapUv:fe&&m(i.anisotropyMap.channel),clearcoatMapUv:pe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:me&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:V&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(i.sheenRoughnessMap.channel),specularMapUv:ye&&m(i.specularMap.channel),specularColorMapUv:be&&m(i.specularColorMap.channel),specularIntensityMapUv:xe&&m(i.specularIntensityMap.channel),transmissionMapUv:Se&&m(i.transmissionMap.channel),thicknessMapUv:Ce&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(z||ae),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&z===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Oe,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Mt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:re&&i.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:De&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(De&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=eo[t];n=Di.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new kc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Fc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ic(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Lc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Rc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ic),r.length>1&&r.sort(t||Lc),i.length>1&&i.sort(t||Lc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function zc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Rc,e.set(t,[i])):n>=r.length?(i=new Rc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Bc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new X,color:new Z};break;case`SpotLight`:n={position:new X,direction:new X,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new X,color:new Z,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new X,skyColor:new Z,groundColor:new Z};break;case`RectAreaLight`:n={color:new Z,position:new X,halfWidth:new X,halfHeight:new X}}return e[t.id]=n,n}}}function Vc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Y,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Hc=0;function Uc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Wc(e){let t=new Bc,n=Vc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new X);let i=new X,a=new Jt,o=new Jt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Uc);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Hc++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Gc(e){let t=new Wc(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Kc(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Gc(e),t.set(n,[a])):r>=i.length?(a=new Gc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var qc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yc=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],Xc=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],Zc=new Jt,Qc=new X,$c=new X;function el(e,t,n){let r=new di,i=new Y,a=new Y,o=new Ut,c=new Ii,l=new Li,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Y},radius:{value:4}},vertexShader:qc,fragmentShader:Jc}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let g=new Tr;g.setAttribute(`position`,new ur(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Yr(g,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,c){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(K(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let l=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let l=0,d=t.length;l<d;l++){let d=t[l],p=d.shadow;if(p===void 0){K(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let g=p.getFrameExtents();i.multiply(g),a.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(a.x=Math.floor(f/g.x),i.x=a.x*g.x,p.mapSize.x=a.x),i.y>f&&(a.y=Math.floor(f/g.y),i.y=a.y*g.y,p.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=_,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){K(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Gt(i.x,i.y,{format:N,type:b,minFilter:u,magFilter:u,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new mi(i.x,i.y,y),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=k,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s}else d.isPointLight?(p.map=new jo(i.x),p.map.depthTexture=new hi(i.x,v)):(p.map=new Gt(i.x,i.y),p.map.depthTexture=new mi(i.x,i.y,v)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=k,this.type===1?(p.map.depthTexture.compareFunction=_?518:515,p.map.depthTexture.minFilter=u,p.map.depthTexture.magFilter=u):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==i.x||p.map.height!==i.y)&&p.map.setSize(i.x,i.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,c);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Qc.setFromMatrixPosition(d.matrixWorld),e.position.copy(Qc),$c.copy(e.position),$c.add(Yc[t]),e.up.copy(Xc[t]),e.lookAt($c),e.updateMatrixWorld(),n.makeTranslation(-Qc.x,-Qc.y,-Qc.z),Zc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Zc,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(o)}r=p.getFrustum(t),T(n,c,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,c),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(l,d,p)};function C(n,r){let a=t.update(_);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new Gt(i.x,i.y,{format:N,type:b}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,_,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,_,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function tl(e,t){function n(){let t=!1,n=new Ut,r=null,i=new Ut(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?B(e.DEPTH_TEST):ie(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Xe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?B(e.STENCIL_TEST):ie(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},R=e.getParameter(e.SCISSOR_BOX),ee=e.getParameter(e.VIEWPORT),te=new Ut().fromArray(R),z=new Ut().fromArray(ee);function ne(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let re={};re[e.TEXTURE_2D]=ne(e.TEXTURE_2D,e.TEXTURE_2D,1),re[e.TEXTURE_CUBE_MAP]=ne(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[e.TEXTURE_2D_ARRAY]=ne(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),re[e.TEXTURE_3D]=ne(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),B(e.DEPTH_TEST),o.setFunc(3),fe(!1),pe(1),B(e.CULL_FACE),ue(0);function B(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ie(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ae(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function oe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function se(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ce={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ce[103]=e.MIN,ce[104]=e.MAX;let le={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ue(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ie(e.BLEND),g=!1);return}if(g===!1&&(B(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:q(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:q(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:q(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:q(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ce[n],ce[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(le[r],le[i],le[o],le[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function de(t,n){t.side===2?ie(e.CULL_FACE):B(e.CULL_FACE);let r=t.side===1;n&&(r=!r),fe(r),t.blending===1&&t.transparent===!1?ue(0):ue(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),he(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?B(e.SAMPLE_ALPHA_TO_COVERAGE):ie(e.SAMPLE_ALPHA_TO_COVERAGE)}function fe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function pe(t){t===0?ie(e.CULL_FACE):(B(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function me(t){t!==k&&(N&&e.lineWidth(t),k=t)}function he(t,n,r){t?(B(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ie(e.POLYGON_OFFSET_FILL)}function ge(t){t?B(e.SCISSOR_TEST):ie(e.SCISSOR_TEST)}function _e(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function V(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||re[t]),i.type=t,i.texture=n)}function ve(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function ye(){try{e.compressedTexImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function be(){try{e.compressedTexImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function xe(){try{e.texSubImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Se(){try{e.texSubImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Ce(){try{e.compressedTexSubImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function H(){try{e.texImage2D(...arguments)}catch(e){q(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){q(`WebGLState:`,e)}}function Oe(t){return d[t]===void 0?e.getParameter(t):d[t]}function ke(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function U(t){te.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),te.copy(t))}function Ae(t){z.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),z.copy(t))}function W(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function G(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function je(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,te.set(0,0,e.canvas.width,e.canvas.height),z.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:B,disable:ie,bindFramebuffer:ae,drawBuffers:oe,useProgram:se,setBlending:ue,setMaterial:de,setFlipSided:fe,setCullFace:pe,setLineWidth:me,setPolygonOffset:he,setScissorTest:ge,activeTexture:_e,bindTexture:V,unbindTexture:ve,compressedTexImage2D:ye,compressedTexImage3D:be,texImage2D:H,texImage3D:De,pixelStorei:ke,getParameter:Oe,updateUBOMapping:W,uniformBlockBinding:G,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:xe,texSubImage3D:Se,compressedTexSubImage2D:Ce,compressedTexSubImage3D:we,scissor:U,viewport:Ae,reset:je}}function nl(e,t,n,r,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new Y,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ue(`canvas`)}function T(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),K(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&K(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function O(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];K(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||K(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ie:Mt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function j(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,K(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function M(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),F(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),L(t)}function F(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&I(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function I(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],h.memory.textures--}function L(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),r.remove(i[t])}r.remove(t)}let R=0;function ee(){R=0}function te(){return R}function z(e){R=e}function ne(){let e=R;return e>=p.maxTextures&&K(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),R+=1,e}function re(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function B(t,i){let a=r.get(t);if(t.isVideoTexture&&H(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)K(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)K(`WebGLRenderer: Texture marked for update but image is incomplete`);else{me(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){me(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){me(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){he(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let se={[i]:e.REPEAT,[a]:e.CLAMP_TO_EDGE,[o]:e.MIRRORED_REPEAT},ce={[s]:e.NEAREST,[c]:e.NEAREST_MIPMAP_NEAREST,[l]:e.NEAREST_MIPMAP_LINEAR,[u]:e.LINEAR,[d]:e.LINEAR_MIPMAP_NEAREST,[f]:e.LINEAR_MIPMAP_LINEAR},le={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ue(n,i){if(i.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(i.magFilter===1006||i.magFilter===1007||i.magFilter===1005||i.magFilter===1008||i.minFilter===1006||i.minFilter===1007||i.minFilter===1005||i.minFilter===1008)&&K(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,se[i.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,se[i.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,se[i.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ce[i.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ce[i.minFilter]),i.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,le[i.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(i.magFilter===1003||i.minFilter!==1005&&i.minFilter!==1008||i.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(i.anisotropy>1||r.get(i).__currentAnisotropy){let a=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,a.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(i.anisotropy,p.getMaxAnisotropy())),r.get(i).__currentAnisotropy=i.anisotropy}}}function de(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=re(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&I(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function fe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function pe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=fe(n.start,r.width,4),c=fe(t.start,r.width,4);n.start<=i+1&&a===c&&fe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function me(t,i,a){let o=e.TEXTURE_2D;(i.isDataArrayTexture||i.isCompressedArrayTexture)&&(o=e.TEXTURE_2D_ARRAY),i.isData3DTexture&&(o=e.TEXTURE_3D);let s=de(t,i),c=i.source;n.bindTexture(o,t.__webglTexture,e.TEXTURE0+a);let l=r.get(c);if(c.version!==l.__version||s===!0){if(n.activeTexture(e.TEXTURE0+a),!(typeof ImageBitmap<`u`&&i.image instanceof ImageBitmap)){let t=Mt.getPrimaries(Mt.workingColorSpace),r=i.colorSpace===``?null:Mt.getPrimaries(i.colorSpace),a=i.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}n.pixelStorei(e.UNPACK_ALIGNMENT,i.unpackAlignment);let t=T(i.image,!1,p.maxTextureSize);t=De(i,t);let r=m.convert(i.format,i.colorSpace),u=m.convert(i.type),d=k(i.internalFormat,r,u,i.normalized,i.colorSpace,i.isVideoTexture);ue(o,i);let f,h=i.mipmaps,g=i.isVideoTexture!==!0,_=l.__version===void 0||s===!0,v=c.dataReady,y=M(i,t);if(i.isDepthTexture)d=j(i.format===A,i.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,d,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,d,t.width,t.height,0,r,u,null));else if(i.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,d,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)f=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,r,u,f.data):n.texImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,r,u,f.data);i.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height),v&&pe(i,t,r,u)):n.texImage2D(e.TEXTURE_2D,0,d,t.width,t.height,0,r,u,t.data)}else if(i.isCompressedTexture){if(i.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,d,h[0].width,h[0].height,t.depth);for(let a=0,o=h.length;a<o;a++)if(f=h[a],i.format!==1023){if(r!==null){if(g){if(v){if(i.layerUpdates.size>0){let t=Ya(f.width,f.height,i.format,i.type);for(let o of i.layerUpdates){let i=f.data.subarray(o*t/f.data.BYTES_PER_ELEMENT,(o+1)*t/f.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,o,f.width,f.height,1,r,i)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,f.width,f.height,t.depth,r,f.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,a,d,f.width,f.height,t.depth,0,f.data,0,0)}else K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,f.width,f.height,t.depth,r,u,f.data):n.texImage3D(e.TEXTURE_2D_ARRAY,a,d,f.width,f.height,t.depth,0,r,u,f.data);i.layerUpdates.size>0&&i.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,d,h[0].width,h[0].height);for(let t=0,a=h.length;t<a;t++)f=h[t],i.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,r,u,f.data):n.texImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,r,u,f.data):r===null?K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,r,f.data):n.compressedTexImage2D(e.TEXTURE_2D,t,d,f.width,f.height,0,f.data)}}else if(i.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,d,t.width,t.height,t.depth),v){if(i.layerUpdates.size>0){let a=Ya(t.width,t.height,i.format,i.type);for(let o of i.layerUpdates){let i=t.data.subarray(o*a/t.data.BYTES_PER_ELEMENT,(o+1)*a/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,o,t.width,t.height,1,r,u,i)}i.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,u,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,d,t.width,t.height,t.depth,0,r,u,t.data)}else if(i.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,d,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,u,t.data)):n.texImage3D(e.TEXTURE_3D,0,d,t.width,t.height,t.depth,0,r,u,t.data);else if(i.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,d,i,a,0,r,u,null),i>>=1,a>>=1}}}else if(i.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(i),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Oe(h[0]);n.texStorage2D(e.TEXTURE_2D,y,d,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)f=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,u,f):n.texImage2D(e.TEXTURE_2D,t,d,r,u,f);i.generateMipmaps=!1}else if(g){if(_){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,y,d,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,u,t)}else n.texImage2D(e.TEXTURE_2D,0,d,r,u,t);E(i)&&D(o),l.__version=c.version,i.onUpdate&&i.onUpdate(i)}t.__version=i.version}function he(t,i,a){if(i.image.length!==6)return;let o=de(t,i),s=i.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+a);let c=r.get(s);if(s.version!==c.__version||o===!0){n.activeTexture(e.TEXTURE0+a);let t=Mt.getPrimaries(Mt.workingColorSpace),r=i.colorSpace===``?null:Mt.getPrimaries(i.colorSpace),l=i.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,i.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,l);let u=i.isCompressedTexture||i.image[0].isCompressedTexture,d=i.image[0]&&i.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!u&&!d?f[e]=T(i.image[e],!0,p.maxCubemapSize):f[e]=d?i.image[e].image:i.image[e],f[e]=De(i,f[e]);let h=f[0],g=m.convert(i.format,i.colorSpace),_=m.convert(i.type),v=k(i.internalFormat,g,_,i.normalized,i.colorSpace),y=i.isVideoTexture!==!0,b=c.__version===void 0||o===!0,x=s.dataReady,S=M(i,h);ue(e.TEXTURE_CUBE_MAP,i);let C;if(u){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let a=C[r];i.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,_,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,a.width,a.height,0,g,_,a.data):g===null?K(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,a.width,a.height,0,a.data)}}}else{if(C=i.mipmaps,y&&b){C.length>0&&S++;let t=Oe(f[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(d){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}E(i)&&D(e.TEXTURE_CUBE_MAP),c.__version=s.version,i.onUpdate&&i.onUpdate(i)}t.__version=i.version}function ge(t,i,a,o,s,c){let l=m.convert(a.format,a.colorSpace),u=m.convert(a.type),d=k(a.internalFormat,l,u,a.normalized,a.colorSpace),f=r.get(i),p=r.get(a);if(p.__renderTarget=i,!f.__hasExternalTextures){let t=Math.max(1,i.width>>c),r=Math.max(1,i.height>>c);s===e.TEXTURE_3D||s===e.TEXTURE_2D_ARRAY?n.texImage3D(s,c,d,t,r,i.depth,0,l,u,null):n.texImage2D(s,c,d,t,r,0,l,u,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,o,s,p.__webglTexture,0,Te(i)):(s===e.TEXTURE_2D||s>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&s<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,o,s,p.__webglTexture,c),n.bindFramebuffer(e.FRAMEBUFFER,null)}function _e(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=j(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ee(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Ee(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function V(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let s=r.get(i.depthTexture);if(s.__renderTarget=i,(!s.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),o){if(s.__webglInit===void 0&&(s.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,N)),s.__webglTexture===void 0){s.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,s.__webglTexture),ue(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=m.convert(i.depthTexture.format),r=m.convert(i.depthTexture.type),a;i.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,i.width,i.height,0,t,r,null)}}else B(i.depthTexture,0);let c=s.__webglTexture,l=Te(i),u=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,d=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,d,u,c,0,l):e.framebufferTexture2D(e.FRAMEBUFFER,d,u,c,0);else if(i.depthTexture.format===1027)Ee(i)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,d,u,c,0,l):e.framebufferTexture2D(e.FRAMEBUFFER,d,u,c,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ve(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)V(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?V(i.__webglFramebuffer[0],t,0):V(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),_e(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),_e(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,i){let a=r.get(t);n!==void 0&&ge(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ve(t)}function be(t){let i=t.texture,a=r.get(t),o=r.get(i);t.addEventListener(`dispose`,P);let s=t.textures,c=t.isWebGLCubeRenderTarget===!0,l=s.length>1;if(l||(o.__webglTexture===void 0&&(o.__webglTexture=e.createTexture()),o.__version=i.version,h.memory.textures++),c){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(l)for(let t=0,n=s.length;t<n;t++){let n=r.get(s[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Ee(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<s.length;n++){let r=s[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=m.convert(r.format,r.colorSpace),o=m.convert(r.type),c=k(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),l=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),_e(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(c){n.bindTexture(e.TEXTURE_CUBE_MAP,o.__webglTexture),ue(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ge(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ge(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);E(i)&&D(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(l){for(let i=0,o=s.length;i<o;i++){let o=s[i],c=r.get(o),l=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(l=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(l,c.__webglTexture),ue(l,o),ge(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,l,0),E(o)&&D(l)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,o.__webglTexture),ue(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ge(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ge(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);E(i)&&D(r),n.unbindTexture()}t.depthBuffer&&ve(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(E(a)){let t=O(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),D(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(Ee(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),u=i.length>1;if(u)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer);let d=t.texture.mipmaps;d&&d.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),u){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),_===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Se.push(c),Ce.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),u)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(p.maxSamples,e.samples)}function Ee(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function H(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Mt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&K(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):q(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ne,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=z,this.setTexture2D=B,this.setTexture2DArray=ie,this.setTexture3D=ae,this.setTextureCube=oe,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ee,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function rl(e,t){function n(n,r=``){let i,a=Mt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var il=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,al=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ol=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new gi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ai({vertexShader:il,fragmentShader:al,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yr(new bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},sl=class extends Ze{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,m=null,h=typeof XRWebGLBinding<`u`,g=new ol,_={},y=t.getContextAttributes(),b=null,x=null,S=[],w=[],T=new Y,E=null,D=null,j=new Ca;j.viewport=new Ut;let M=new Ca;M.viewport=new Ut;let N=[j,M],P=new Ma,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new Tn,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new Tn,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new Tn,S[e]=t),t.getHandSpace()};function L(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function R(){r.removeEventListener(`select`,L),r.removeEventListener(`selectstart`,L),r.removeEventListener(`selectend`,L),r.removeEventListener(`squeeze`,L),r.removeEventListener(`squeezestart`,L),r.removeEventListener(`squeezeend`,L),r.removeEventListener(`end`,R),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<S.length;e++){let t=w[e];t!==null&&(w[e]=null,S[e].disconnect(t))}F=null,I=null,g.reset();for(let e in _)delete _[e];if(e.setRenderTarget(b),f=null,d=null,u=null,r=null,x=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),D!==null){let e=D.camera;e.fov=D.fov,e.zoom=D.zoom,e.updateProjectionMatrix(),D=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&K(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&K(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,L),r.addEventListener(`selectstart`,L),r.addEventListener(`selectend`,L),r.addEventListener(`squeeze`,L),r.addEventListener(`squeezestart`,L),r.addEventListener(`squeezeend`,L),r.addEventListener(`end`,R),r.addEventListener(`inputsourceschange`,ee),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?A:k,a=y.stencil?C:v);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Gt(d.textureWidth,d.textureHeight,{format:O,type:p,depthTexture:new mi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Gt(f.framebufferWidth,f.framebufferHeight,{format:O,type:p,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),oe.setContext(r),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}let te=new X,z=new X;function ne(e,t,n){te.setFromMatrixPosition(t.matrixWorld),z.setFromMatrixPosition(n.matrixWorld);let r=te.distanceTo(z),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;re(P,i);for(let e=0;e<a.length;e++)re(a[e],i);a.length===2?ne(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),D===null&&e.isPerspectiveCamera&&(D={camera:e,fov:e.fov,zoom:e.zoom}),B(e,P,i)};function B(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=tt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(e){return _[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=N[n];o===void 0&&(o=new Ca,o.layers.enable(n),o.viewport=new Ut,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new gi,_[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=w[e],n=S[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let oe=new Za;oe.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},cl=new Jt,ll=new Dt;ll.set(-1,0,0,0,1,0,0,0,1);function ul(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ei(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(cl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(ll),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function dl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return q(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?K(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):K(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var fl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pl=null;function ml(){return pl===null&&(pl=new Qr(fl,16,16,N,b),pl.name=`DFG_LUT`,pl.minFilter=u,pl.magFilter=u,pl.wrapS=a,pl.wrapT=a,pl.generateMipmaps=!1,pl.needsUpdate=!0),pl}var hl=class{constructor(e={}){let{canvas:t=We(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:m=p}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);h=n.getContextAttributes().alpha}else h=a;let _=m,y=new Set([F,P,M]),w=new Set([p,v,g,C,x,S]),T=new Uint32Array(4),E=new Int32Array(4),D=new X,O=null,k=null,A=[],j=[],N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,L=!1,R=null,ee=null,te=null,z=null;this._outputColorSpace=Pe;let ne=0,re=0,B=null,ie=-1,ae=null,oe=new Ut,se=new Ut,ce=null,le=new Z(0),ue=0,de=t.width,fe=t.height,pe=1,me=null,he=null,ge=new Ut(0,0,de,fe),_e=new Ut(0,0,de,fe),V=!1,ve=new di,ye=!1,be=!1,xe=new Jt,Se=new X,Ce=new Ut,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Te=!1;function Ee(){return B===null?pe:1}let H=n;function De(e,n){return t.getContext(e,n)}let Oe,ke,U,Ae,W,G,je,Me,Ne,Fe,Ie,Le,Re,ze,Ve,He,Ue,Ge,qe,Je,Xe,Ze,Qe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,tt,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,J,!1),H===null){let t=`webgl2`;if(H=De(t,e),H===null)throw De(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}$e()}catch(e){throw t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,J,!1),q(`WebGLRenderer: `+e.message),e}function $e(){Oe=new No(H),Oe.init(),Xe=new rl(H,Oe),ke=new so(H,Oe,e,Xe),U=new tl(H,Oe),ke.reversedDepthBuffer&&d&&U.buffers.depth.setReversed(!0),ee=H.createFramebuffer(),te=H.createFramebuffer(),z=H.createFramebuffer(),Ae=new Io(H),W=new Fc,G=new nl(H,Oe,U,W,ke,Xe,Ae),je=new Mo(I),Me=new Qa(H),Ze=new ao(H,Me),Ne=new Po(H,Me,Ae,Ze),Fe=new Ro(H,Ne,Me,Ze,Ae),Ge=new Lo(H,ke,G),Ve=new co(W),Ie=new Pc(I,je,Oe,ke,Ze,Ve),Le=new ul(I,W),Re=new zc,ze=new Kc(Oe),Ue=new io(I,je,U,Fe,h,s),He=new el(I,Fe,ke),Qe=new dl(H,Ae,ke,U),qe=new oo(H,Oe,Ae),Je=new Fo(H,Oe,Ae),Ae.programs=Ie.programs,I.capabilities=ke,I.extensions=Oe,I.properties=W,I.renderLists=Re,I.shadowMap=He,I.state=U,I.info=Ae}_!==1009&&(N=new Bo(_,t.width,t.height,o,r,i));let et=new sl(I,H);this.xr=et,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(e){e!==void 0&&(pe=e,this.setSize(de,fe,!1))},this.getSize=function(e){return e.set(de,fe)},this.setSize=function(e,n,r=!0){if(et.isPresenting){K(`WebGLRenderer: Can't change size while VR device is presenting.`);return}de=e,fe=n,t.width=Math.floor(e*pe),t.height=Math.floor(n*pe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(de*pe,fe*pe).floor()},this.setDrawingBufferSize=function(e,n,r){de=e,fe=n,pe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(_===1009){q(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){K(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}N.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(ge)},this.setViewport=function(e,t,n,r){e.isVector4?ge.set(e.x,e.y,e.z,e.w):ge.set(e,t,n,r),U.viewport(oe.copy(ge).multiplyScalar(pe).round())},this.getScissor=function(e){return e.copy(_e)},this.setScissor=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),U.scissor(se.copy(_e).multiplyScalar(pe).round())},this.getScissorTest=function(){return V},this.setScissorTest=function(e){U.setScissorTest(V=e)},this.setOpaqueSort=function(e){me=e},this.setTransparentSort=function(e){he=e},this.getClearColor=function(e){return e.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(B!==null){let t=B.texture.format;e=y.has(t)}if(e){let e=B.texture.type,t=w.has(e),n=Ue.getClearColor(),r=Ue.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,H.clearBufferuiv(H.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,H.clearBufferiv(H.COLOR,0,E))}else r|=H.COLOR_BUFFER_BIT}t&&(r|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&H.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),R=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,J,!1),Ue.dispose(),Re.dispose(),ze.dispose(),W.dispose(),je.dispose(),Fe.dispose(),Ze.dispose(),Qe.dispose(),Ie.dispose(),et.dispose(),et.removeEventListener(`sessionstart`,lt),et.removeEventListener(`sessionend`,ut),dt.stop()};function tt(e){e.preventDefault(),Ke(`WebGLRenderer: Context Lost.`),L=!0}function nt(){Ke(`WebGLRenderer: Context Restored.`),L=!1;let e=Ae.autoReset,t=He.enabled,n=He.autoUpdate,r=He.needsUpdate,i=He.type;$e(),Ae.autoReset=e,He.enabled=t,He.autoUpdate=n,He.needsUpdate=r,He.type=i}function J(e){q(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function rt(e){let t=e.target;t.removeEventListener(`dispose`,rt),it(t)}function it(e){at(e),W.remove(e)}function at(e){let t=W.get(e).programs;t!==void 0&&(t.forEach(function(e){Ie.releaseProgram(e)}),e.isShaderMaterial&&Ie.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=we);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=xt(e,t,n,r,i);U.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ze.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Me.get(c),g=Je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(U.setLineWidth(r.wireframeLinewidth*Ee()),g.setMode(H.LINES)):g.setMode(H.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),U.setLineWidth(e*Ee()),i.isLineSegments?g.setMode(H.LINES):i.isLineLoop?g.setMode(H.LINE_LOOP):g.setMode(H.LINE_STRIP)}else i.isPoints?g.setMode(H.POINTS):i.isSprite&&g.setMode(H.TRIANGLES);if(i.isBatchedMesh){if(Oe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=W.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(H,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ot(e,t,n,r){R!==null&&e.isNodeMaterial&&R.setObject(r,e),ye===!0&&Ve.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,_t(e,t,r),e.side=0,e.needsUpdate=!0,_t(e,t,r),e.side=2):_t(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),R!==null&&R.renderStart(e,t,n),k=ze.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),R!==null&&R.updateLights(k.state.lightsArray),be=this.localClippingEnabled,ye=Ve.init(this.clippingPlanes,be),ye===!0&&Ve.setGlobalState(this.clippingPlanes,t),R!==null&&He.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ot(o,n,t,e),r.add(o)}else ot(i,n,t,e),r.add(i)}}),k=j.pop(),R!==null&&R.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=W.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Oe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let st=null;function ct(e){st&&st(e)}function lt(){dt.stop()}function ut(){dt.start()}let dt=new Za;dt.setAnimationLoop(ct),typeof self<`u`&&dt.setContext(self),this.setAnimationLoop=function(e){st=e,et.setAnimationLoop(e),e===null?dt.stop():dt.start()},et.addEventListener(`sessionstart`,lt),et.addEventListener(`sessionend`,ut),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){q(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(L===!0)return;R!==null&&R.renderStart(e,t);let n=et.enabled===!0&&et.isPresenting===!0,r=N!==null&&(B===null||n)&&N.begin(I,B);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(et.cameraAutoUpdate===!0&&et.updateCamera(t),t=et.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,B),k=ze.get(e,j.length),k.init(t),k.state.textureUnits=G.getTextureUnits(),j.push(k),xe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ve.setFromProjectionMatrix(xe,Be,t.reversedDepth),be=this.localClippingEnabled,ye=Ve.init(this.clippingPlanes,be),O=Re.get(e,A.length),O.init(),A.push(O),et.enabled===!0&&et.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&ft(e,t,-1/0,I.sortObjects)}ft(e,t,0,I.sortObjects),O.finish(),R!==null&&R.updateLights(k.state.lightsArray),I.sortObjects===!0&&O.sort(me,he),Te=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Te&&Ue.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ye===!0&&Ve.beginShadows();let i=k.state.shadowsArray;if(He.render(i,e,t),ye===!0&&Ve.endShadows(),(r&&N.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];mt(n,r,e,a)}Te&&Ue.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];pt(O,e,n,n.viewport)}}else r.length>0&&mt(n,r,e,t),Te&&Ue.render(e),pt(O,e,t)}B!==null&&re===0&&(G.updateMultisampleRenderTarget(B),G.updateRenderTargetMipmap(B)),r&&N.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),Ze.resetDefaultState(),ie=-1,ae=null,j.pop(),j.length>0?(k=j[j.length-1],G.setTextureUnits(k.state.textureUnits),ye===!0&&Ve.setGlobalState(I.clippingPlanes,k.state.camera)):k=null,A.pop(),O=A.length>0?A[A.length-1]:null,R!==null&&R.renderEnd()};function ft(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ve)){r&&Ce.setFromMatrixPosition(e.matrixWorld).applyMatrix4(xe);let i=Fe.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Ce.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ve))){let i=Fe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ce.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ce.copy(e.boundingSphere.center)),Ce.applyMatrix4(e.matrixWorld).applyMatrix4(xe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Ce.z,s,t)}}else a.visible&&O.push(e,i,a,n,Ce.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ft(i[e],t,n,r)}function pt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),ye===!0&&Ve.setGlobalState(I.clippingPlanes,n),r&&U.viewport(oe.copy(r)),i.length>0&&ht(i,t,n),a.length>0&&ht(a,t,n),o.length>0&&ht(o,t,n),U.buffers.depth.setTest(!0),U.buffers.depth.setMask(!0),U.buffers.color.setMask(!0),U.setPolygonOffset(!1)}function mt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Oe.has(`EXT_color_buffer_half_float`)||Oe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Gt(1,1,{generateMipmaps:!0,type:e?b:p,minFilter:f,samples:Math.max(4,ke.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||oe;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),c=I.getActiveCubeFace(),l=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(le),ue=I.getClearAlpha(),ue<1&&I.setClearColor(16777215,.5),I.clear(),Te&&Ue.render(n);let u=I.toneMapping;I.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),ye===!0&&Ve.setGlobalState(I.clippingPlanes,r),ht(e,n,r),G.updateMultisampleRenderTarget(a),G.updateRenderTargetMipmap(a),Oe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,gt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(G.updateMultisampleRenderTarget(a),G.updateRenderTargetMipmap(a))}I.setRenderTarget(s,c,l),I.setClearColor(le,ue),d!==void 0&&(r.viewport=d),I.toneMapping=u}function ht(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&gt(o,t,n,s,l,c)}}function gt(e,t,n,r,i,a){R!==null&&i.isNodeMaterial&&R.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function _t(e,t,n){t.isScene!==!0&&(t=we);let r=W.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ie.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ie.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,rt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return yt(e,s),d}else s.uniforms=Ie.getUniforms(e),R!==null&&e.isNodeMaterial&&R.build(e,n,s),e.onBeforeCompile(s,I),d=Ie.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ve.uniform),yt(e,s),r.needsLights=Ct(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function vt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=qs.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function yt(e,t){let n=W.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function bt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function xt(e,t,n,r,i){t.isScene!==!0&&(t=we),G.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=B===null?I.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Mt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=W.get(r),y=k.state.lights;if(ye===!0&&(be===!0||e!==ae)){let t=e===ae&&r.id===ie;Ve.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ve.numPlanes||v.numIntersection!==Ve.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=_t(r,t,i),R&&r.isNodeMaterial&&R.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(U.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ie&&(ie=r.id,C=!0),v.needsLights){let e=bt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ae!==e){U.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(H,`projectionMatrix`,e.projectionMatrix),T.setValue(H,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(H,Se.setFromMatrixPosition(e.matrixWorld)),ke.logarithmicDepthBuffer&&T.setValue(H,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(H,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(H,`sunShadowMap`,y.state.sunShadowMap,G),y.state.directionalShadowMap.length>0&&T.setValue(H,`directionalShadowMap`,y.state.directionalShadowMap,G),y.state.spotShadowMap.length>0&&T.setValue(H,`spotShadowMap`,y.state.spotShadowMap,G),y.state.pointShadowMap.length>0&&T.setValue(H,`pointShadowMap`,y.state.pointShadowMap,G)),i.isSkinnedMesh){T.setOptional(H,i,`bindMatrix`),T.setOptional(H,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(H,`boneTexture`,e.boneTexture,G))}i.isBatchedMesh&&(T.setOptional(H,i,`batchingTexture`),T.setValue(H,`batchingTexture`,i._matricesTexture,G),T.setOptional(H,i,`batchingIdTexture`),T.setValue(H,`batchingIdTexture`,i._indirectTexture,G),T.setOptional(H,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(H,`batchingColorTexture`,i._colorsTexture,G));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Ge.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(H,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=ml()),C){if(T.setValue(H,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&St(E,w),a&&r.fog===!0&&Le.refreshFogUniforms(E,a),Le.refreshMaterialUniforms(E,r,pe,fe,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}qs.upload(H,vt(v),E,G)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(qs.upload(H,vt(v),E,G),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(H,`center`,i.center),T.setValue(H,`modelViewMatrix`,i.modelViewMatrix),T.setValue(H,`normalMatrix`,i.normalMatrix),T.setValue(H,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Qe.update(n,x),Qe.bind(n,x)}}return x}function St(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ct(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(e,t,n){let r=W.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),W.get(e.texture).__webglTexture=t,W.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=W.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){B=e,ne=t,re=n;let r=null,i=!1,a=!1;if(e){let o=W.get(e);if(o.__useDefaultFramebuffer!==void 0){U.bindFramebuffer(H.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest,U.viewport(oe),U.scissor(se),U.setScissorTest(ce),ie=-1;return}if(o.__webglFramebuffer===void 0)G.setupRenderTarget(e);else if(o.__hasExternalTextures)G.rebindTextures(e,W.get(e.texture).__webglTexture,W.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&W.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);G.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=W.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&G.useMultisampledRTT(e)===!1?W.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),se.copy(e.scissor),ce=e.scissorTest}else oe.copy(ge).multiplyScalar(pe).floor(),se.copy(_e).multiplyScalar(pe).floor(),ce=V;if(n!==0&&(r=ee),U.bindFramebuffer(H.FRAMEBUFFER,r)&&U.drawBuffers(e,r),U.viewport(oe),U.scissor(se),U.setScissorTest(ce),i){let r=W.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=W.get(e.textures[t]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=W.get(e.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,t.__webglTexture,n)}ie=-1};function Y(e){let t=W.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ke.textureFormatReadable(e.format),t.__typeReadable=ke.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=W.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){U.bindFramebuffer(H.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let u=Y(o);if(u.__formatReadable===!1){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){q(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&H.readPixels(t,n,r,i,Xe.convert(c),Xe.convert(l),a)}finally{let e=B===null?null:W.get(B).__webglFramebuffer;U.bindFramebuffer(H.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=W.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){U.bindFramebuffer(H.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+s);let d=Y(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.bufferData(H.PIXEL_PACK_BUFFER,a.byteLength,H.STREAM_READ),H.readPixels(t,n,r,i,Xe.convert(l),Xe.convert(u),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let p=B===null?null:W.get(B).__webglFramebuffer;U.bindFramebuffer(H.FRAMEBUFFER,p);let m=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Ye(H,m,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,f),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,a),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(f),H.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;G.setTexture2D(e,0),H.copyTexSubImage2D(H.TEXTURE_2D,n,0,0,o,s,i,a),U.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Xe.convert(t.format),_=Xe.convert(t.type),v;t.isData3DTexture?(G.setTexture3D(t,0),v=H.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(G.setTexture2DArray(t,0),v=H.TEXTURE_2D_ARRAY):(G.setTexture2D(t,0),v=H.TEXTURE_2D),U.activeTexture(H.TEXTURE0),U.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,t.flipY),U.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),U.pixelStorei(H.UNPACK_ALIGNMENT,t.unpackAlignment);let y=U.getParameter(H.UNPACK_ROW_LENGTH),b=U.getParameter(H.UNPACK_IMAGE_HEIGHT),x=U.getParameter(H.UNPACK_SKIP_PIXELS),S=U.getParameter(H.UNPACK_SKIP_ROWS),C=U.getParameter(H.UNPACK_SKIP_IMAGES);U.pixelStorei(H.UNPACK_ROW_LENGTH,h.width),U.pixelStorei(H.UNPACK_IMAGE_HEIGHT,h.height),U.pixelStorei(H.UNPACK_SKIP_PIXELS,l),U.pixelStorei(H.UNPACK_SKIP_ROWS,u),U.pixelStorei(H.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=W.get(e),r=W.get(t),h=W.get(n.__renderTarget),g=W.get(r.__renderTarget);U.bindFramebuffer(H.READ_FRAMEBUFFER,h.__webglFramebuffer),U.bindFramebuffer(H.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,W.get(e).__webglTexture,i,d+n),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,W.get(t).__webglTexture,a,m+n)),H.blitFramebuffer(l,u,o,s,f,p,o,s,H.DEPTH_BUFFER_BIT,H.NEAREST);U.bindFramebuffer(H.READ_FRAMEBUFFER,null),U.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||W.has(e)){let n=W.get(e),r=W.get(t);U.bindFramebuffer(H.READ_FRAMEBUFFER,te),U.bindFramebuffer(H.DRAW_FRAMEBUFFER,z);for(let e=0;e<c;e++)w?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,n.__webglTexture,i),T?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,r.__webglTexture,a),i===0?T?H.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):H.copyTexSubImage2D(v,a,f,p,l,u,o,s):H.blitFramebuffer(l,u,o,s,f,p,o,s,H.COLOR_BUFFER_BIT,H.NEAREST);U.bindFramebuffer(H.READ_FRAMEBUFFER,null),U.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?H.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):H.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):H.texSubImage2D(H.TEXTURE_2D,a,f,p,o,s,g,_,h);U.pixelStorei(H.UNPACK_ROW_LENGTH,y),U.pixelStorei(H.UNPACK_IMAGE_HEIGHT,b),U.pixelStorei(H.UNPACK_SKIP_PIXELS,x),U.pixelStorei(H.UNPACK_SKIP_ROWS,S),U.pixelStorei(H.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&H.generateMipmap(v),U.unbindTexture()},this.initRenderTarget=function(e){W.get(e).__webglFramebuffer===void 0&&G.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?G.setTextureCube(e,0):e.isData3DTexture?G.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?G.setTexture2DArray(e,0):G.setTexture2D(e,0),U.unbindTexture()},this.resetState=function(){ne=0,re=0,B=null,U.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Be}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};function gl(e,t){let n=n=>{let r=e.buffers[n];if(!r)throw Error(`avatar buffer missing: ${n}`);switch(r.type){case`f32`:return new Float32Array(t,r.offset,r.length);case`u32`:return new Uint32Array(t,r.offset,r.length);case`u16`:return new Uint16Array(t,r.offset,r.length);case`u8`:return new Uint8Array(t,r.offset,r.length);case`i32`:return new Int32Array(t,r.offset,r.length)}},r=e=>({name:e.name,label:e.label,texture:e.texture,scale:e.scale,refIdx:n(e.refIdx),refW:n(e.refW),refOff:n(e.refOff),uv:n(e.uv),index:n(e.index),skinIdx:n(e.skinIdx),skinW:n(e.skinW)}),i=new Map,a=new Map;for(let t of e.morphs)i.set(t.name,{name:t.name,label:t.label,idx:n(t.idx),delta:n(t.delta)}),a.set(t.name.replace(/[+-]$/,``),t.label);return{vertexCount:e.vertexCount,bodyVertexCount:e.bodyVertexCount,base:n(e.base),morphs:i,morphLabels:a,body:{src:n(e.body.src),uv:n(e.body.uv),index:n(e.body.index),skinIdx:n(e.body.skinIdx),skinW:n(e.body.skinW)},bones:e.skeleton.bones,joints:e.skeleton.joints,jointNames:e.skeleton.jointNames,hair:e.hair.map(r),extras:e.extras.map(r),refClothes:(e.refClothes??[]).map(r),skins:e.skin.options,poses:e.poses}}async function _l(e=`avatar/`){let[t,n]=await Promise.all([fetch(e+`avatar.json`).then(e=>e.json()),fetch(e+`avatar.bin`).then(e=>e.arrayBuffer())]);return gl(t,n)}var vl=new X,yl=new X,bl=new X,xl=class{data;rest;jointPos;restGlobal;restInv;restRelative;poseGlobal;skinMats;boneIndex=new Map;morphValues={};pose={};offset=new X;constructor(e){this.data=e,this.rest=new Float32Array(e.base.length),this.jointPos=new Float32Array(e.joints.length*3);let t=e.bones.length,n=()=>Array.from({length:t},()=>new Jt);this.restGlobal=n(),this.restInv=n(),this.restRelative=n(),this.poseGlobal=n(),this.skinMats=new Float32Array(t*16),e.bones.forEach((e,t)=>this.boneIndex.set(e.name,t)),this.setMorphs({})}setMorphs(e){this.morphValues={...e};let t=this.rest;t.set(this.data.base);for(let[n,r]of Object.entries(e)){if(!r)continue;let e=this.data.morphs.get(n+(r>0?`+`:`-`))??(r>0?this.data.morphs.get(n):void 0);if(!e)continue;let i=Math.abs(r),{idx:a,delta:o}=e;for(let e=0;e<a.length;e++){let n=a[e]*3,r=e*3;t[n]+=o[r]*i,t[n+1]+=o[r+1]*i,t[n+2]+=o[r+2]*i}}this.shapeBust(),this.smoothNipples(),this.updateSkeleton()}bustRegion=null;shapeBust(){let e=this.data,t=this.rest,n=n=>{let r=e.jointNames.indexOf(n);if(r<0)return null;let i=0,a=0,o=0;for(let n of e.joints[r])i+=t[n*3],a+=t[n*3+1],o+=t[n*3+2];let s=e.joints[r].length;return[i/s,a/s,o/s]},r=n(`breast.L____tail`),i=n(`breast.R____tail`);if(!r||!i)return;let a=.085;if(!this.bustRegion){let t=[],n=[],r=[];for(let i=0;i<e.bodyVertexCount;i++){let a=e.base[i*3];e.base[i*3+2]<0||(t.push(i),r.push(a>=0?1:-1),n.push(0))}this.bustRegion={verts:t,w:Float32Array.from(n),side:Int8Array.from(r)}}let{verts:o,side:s}=this.bustRegion,c=Math.max(0,(r[2]+i[2])/2),l=Math.min(1,c/.12);o.forEach((e,n)=>{let o=s[n]>0?r:i,c=t[e*3]-o[0],u=t[e*3+1]-o[1],d=t[e*3+2]-o[2],f=Math.hypot(c,u*.9,d*.7);if(f>a)return;let p=1-f/a,m=p*p*(3-2*p)*l;t[e*3+1]+=.012*m;let h=t[e*3];t[e*3]=h-Math.sign(h)*Math.min(Math.abs(h)*.5,.009*m),t[e*3+2]+=.003*m})}nippleRegion=null;smoothNipples(){let e=this.data,t=this.rest;if(!this.nippleRegion){let t=[`breast.L____tail`,`breast.R____tail`].map(t=>e.jointNames.indexOf(t)).filter(e=>e>=0).map(t=>e.joints[t]),n=new Set;for(let r of t){let t=0,i=0,a=0;for(let n of r)t+=e.base[n*3],i+=e.base[n*3+1],a+=e.base[n*3+2];t/=r.length,i/=r.length,a/=r.length;for(let r=0;r<e.bodyVertexCount;r++)Math.hypot(e.base[r*3]-t,e.base[r*3+1]-i,e.base[r*3+2]-a)<.03&&n.add(r)}let r=[...n],i=new Map(r.map(e=>[e,new Set])),a=e.body.index,o=e.body.src;for(let e=0;e<a.length;e+=3){let t=[o[a[e]],o[a[e+1]],o[a[e+2]]];for(let e of t)if(i.has(e))for(let n of t)n!==e&&i.get(e).add(n)}this.nippleRegion={verts:r,nbrs:r.map(e=>[...i.get(e)])}}let{verts:n,nbrs:r}=this.nippleRegion,i=new Float32Array(n.length*3);for(let e=0;e<20;e++)n.forEach((e,n)=>{let a=0,o=0,s=0;for(let e of r[n])a+=t[e*3],o+=t[e*3+1],s+=t[e*3+2];let c=r[n].length||1;i[n*3]=(t[e*3]+a/c)/2,i[n*3+1]=(t[e*3+1]+o/c)/2,i[n*3+2]=(t[e*3+2]+s/c)/2}),n.forEach((e,n)=>{t[e*3]=i[n*3],t[e*3+1]=i[n*3+1],t[e*3+2]=i[n*3+2]});this.roundApex()}roundApex(){let e=this.data,t=this.rest,n=.075;for(let r of[1,-1]){let i=-1,a=-1/0,o=e.jointNames.indexOf(r>0?`breast.L____tail`:`breast.R____tail`);if(o<0)continue;let s=0;for(let n of e.joints[o])s+=t[n*3+1];s/=e.joints[o].length;for(let n=0;n<e.bodyVertexCount;n++)t[n*3]*r<.02||Math.abs(t[n*3+1]-s)>.06||t[n*3+2]>a&&(a=t[n*3+2],i=n);if(i<0)continue;let c=t[i*3],l=t[i*3+1],u=t[i*3+2],d=[];for(let i=0;i<e.bodyVertexCount;i++){let e=t[i*3]-c,a=t[i*3+1]-l,o=t[i*3+2]-u;e*e+a*a+o*o<n*n&&t[i*3]*r>0&&d.push(i)}let f=[],p=[];for(let e of d){let r=t[e*3],i=t[e*3+1],a=t[e*3+2];Math.hypot(r-c,i-l,a-u)<.55*n||(f.push([r,i,a,1]),p.push(r*r+i*i+a*a))}if(f.length<12)continue;let m=Cl(f,p);if(!m)continue;let h=m[0]/2,g=m[1]/2,_=m[2]/2,v=Math.sqrt(Math.max(0,m[3]+h*h+g*g+_*_));if(v>.03&&v<.2)for(let e of d){let r=t[e*3],i=t[e*3+1],a=t[e*3+2],o=Math.hypot(r-c,i-l,a-u),s=Math.min(1,(1-o/n)*1.6),d=s*s*(3-2*s),f=r-h,p=i-g,m=a-_,y=Math.hypot(f,p,m)||1;t[e*3]=r+(h+f/y*v-r)*d,t[e*3+1]=i+(g+p/y*v-i)*d,t[e*3+2]=a+(_+m/y*v-a)*d}}}updateSkeleton(){let{joints:e,bones:t}=this.data,n=this.jointPos,r=this.rest;for(let t=0;t<e.length;t++){let i=0,a=0,o=0,s=e[t];for(let e of s)i+=r[e*3],a+=r[e*3+1],o+=r[e*3+2];n[t*3]=i/s.length,n[t*3+1]=a/s.length,n[t*3+2]=o/s.length}let i=(e,t)=>t.set(n[e*3],n[e*3+1],n[e*3+2]),a=new X,o=new X,s=new X,c=new X,l=new X,u=new X;t.forEach((e,t)=>{if(i(e.head,a),i(e.tail,o),s.subVectors(o,a).normalize(),c.set(0,1,0),e.plane){i(e.plane[0],vl),i(e.plane[1],yl),i(e.plane[2],bl);let t=yl.clone().sub(vl).normalize(),n=bl.clone().sub(yl).normalize();c.crossVectors(n,t),c.lengthSq()<1e-10?c.set(0,1,0):c.normalize()}u.crossVectors(c,s).normalize(),l.crossVectors(s,u).normalize();let n=this.restGlobal[t];n.makeBasis(l,s,u).setPosition(a),this.restInv[t].copy(n).invert(),e.parent>=0?this.restRelative[t].multiplyMatrices(this.restInv[e.parent],n):this.restRelative[t].copy(n)}),this.setPose(this.pose)}setPose(e){this.pose=e;let t=new wt,n=new Jt,r=new Jt;this.data.bones.forEach((i,a)=>{let o=e[i.name];o?n.makeRotationFromQuaternion(t.set(o[0],o[1],o[2],o[3])):n.identity(),r.multiplyMatrices(this.restRelative[a],n),i.parent>=0?this.poseGlobal[a].multiplyMatrices(this.poseGlobal[i.parent],r):this.poseGlobal[a].copy(r),r.multiplyMatrices(this.poseGlobal[a],this.restInv[a]),this.skinMats.set(r.elements,a*16)}),this.updateOffset()}updateOffset(){let e=this.data.bodyVertexCount,t=new Float32Array(e*3);this.skinRaw(this.rest,this.data.body.skinIdx,this.data.body.skinW,e,t,null);let n=1/0;for(let r=0;r<e;r++)n=Math.min(n,t[r*3+1]);let r=this.boneIndex.get(`root`),i=this.poseGlobal[r].elements;this.offset.set(-i[12],-n,-i[14])}skinRaw(e,t,n,r,i,a=this.offset){let o=this.skinMats,s=a?a.x:0,c=a?a.y:0,l=a?a.z:0;for(let a=0;a<r;a++){let r=e[a*3],u=e[a*3+1],d=e[a*3+2],f=0,p=0,m=0;for(let e=0;e<4;e++){let i=n[a*4+e];if(i===0)continue;let s=t[a*4+e]*16;f+=i*(o[s]*r+o[s+4]*u+o[s+8]*d+o[s+12]),p+=i*(o[s+1]*r+o[s+5]*u+o[s+9]*d+o[s+13]),m+=i*(o[s+2]*r+o[s+6]*u+o[s+10]*d+o[s+14])}i[a*3]=f+s,i[a*3+1]=p+c,i[a*3+2]=m+l}}posedBody(e=new Float32Array(this.data.bodyVertexCount*3)){return this.skinRaw(this.rest,this.data.body.skinIdx,this.data.body.skinW,this.data.bodyVertexCount,e),e}fitProxy(e,t=new Float32Array(e.refIdx.length)){let n=this.rest,r=(e,t)=>Math.abs(n[e[0]*3+t]-n[e[1]*3+t])/e[2],i=r(e.scale.x_scale,0),a=r(e.scale.y_scale,1),o=r(e.scale.z_scale,2),s=e.refIdx.length/3;for(let r=0;r<s;r++){let s=0,c=0,l=0;for(let t=0;t<3;t++){let i=e.refIdx[r*3+t]*3,a=e.refW[r*3+t];s+=a*n[i],c+=a*n[i+1],l+=a*n[i+2]}t[r*3]=s+e.refOff[r*3]*i,t[r*3+1]=c+e.refOff[r*3+1]*a,t[r*3+2]=l+e.refOff[r*3+2]*o}return t}joint(e,t=new X){let n=this.data.jointNames.indexOf(e);if(n<0)throw Error(`joint ${e} not found`);return t.set(this.jointPos[n*3],this.jointPos[n*3+1],this.jointPos[n*3+2])}bonePosed(e,t=new X){let n=this.poseGlobal[this.boneIndex.get(e)].elements;return t.set(n[12],n[13],n[14]).add(this.offset)}};function Sl(e,t,n,r=new Float32Array(n*3)){r.fill(0);for(let n=0;n<t.length;n+=3){let i=t[n]*3,a=t[n+1]*3,o=t[n+2]*3,s=e[a]-e[i],c=e[a+1]-e[i+1],l=e[a+2]-e[i+2],u=e[o]-e[i],d=e[o+1]-e[i+1],f=e[o+2]-e[i+2],p=c*f-l*d,m=l*u-s*f,h=s*d-c*u;for(let e of[i,a,o])r[e]+=p,r[e+1]+=m,r[e+2]+=h}for(let e=0;e<n;e++){let t=e*3,n=Math.hypot(r[t],r[t+1],r[t+2])||1;r[t]/=n,r[t+1]/=n,r[t+2]/=n}return r}function Cl(e,t){let n=Array.from({length:4},()=>new Float64Array(5));for(let r=0;r<e.length;r++)for(let i=0;i<4;i++){for(let t=0;t<4;t++)n[i][t]+=e[r][i]*e[r][t];n[i][4]+=e[r][i]*t[r]}for(let e=0;e<4;e++){let t=e;for(let r=e+1;r<4;r++)Math.abs(n[r][e])>Math.abs(n[t][e])&&(t=r);if(Math.abs(n[t][e])<1e-14)return null;[n[e],n[t]]=[n[t],n[e]];for(let t=0;t<4;t++){if(t===e)continue;let r=n[t][e]/n[e][e];for(let i=e;i<5;i++)n[t][i]-=r*n[e][i]}}return[0,1,2,3].map(e=>n[e][4]/n[e][e])}var wl={height:`身高`,bust:`胸圍`,underbust:`下胸圍`,waist:`腰圍`,hips:`臀圍`,shoulder:`肩寬`,armLength:`臂長`,inseam:`跨下長`,thigh:`大腿圍`,upperArm:`上臂圍`,neck:`頸圍`,backLength:`背長`},Tl=function(e){return e[e.Torso=0]=`Torso`,e[e.Arm=1]=`Arm`,e[e.Leg=2]=`Leg`,e[e.Head=3]=`Head`,e}({});function El(e){return/arm|wrist|finger|metacarpal|shoulder01/.test(e)?1:/leg|foot|toe/.test(e)?2:/head|neck|jaw|eye|oculi|orbicularis|oris|levator|risorius|temporalis|tongue|special0[3-6]/.test(e)?3:0}function Dl(e){let t=e.bodyVertexCount,n=e.bones.map(e=>El(e.name)),r=new Uint8Array(t),i=[0,0,0,0];for(let a=0;a<t;a++){i.fill(0);for(let t=0;t<4;t++)i[n[e.body.skinIdx[a*4+t]]]+=e.body.skinW[a*4+t];let t=0;for(let e=1;e<4;e++)i[e]>i[t]&&(t=e);r[a]=t}return r}function Ol(e,t,n,r=0){let i=e.body.index,a=e.body.src,o=[],s=e.base;for(let e=0;e<i.length;e+=3){let c=a[i[e]],l=a[i[e+1]],u=a[i[e+2]];n.includes(t[c])&&n.includes(t[l])&&n.includes(t[u])&&(r===0||Math.sign(s[c*3]+s[l*3]+s[u*3])===r)&&o.push(c,l,u)}return Uint32Array.from(o)}function kl(e,t,n,r,i,a){let o=[],s=t=>(e[t*3]-n[0])*r[0]+(e[t*3+1]-n[1])*r[1]+(e[t*3+2]-n[2])*r[2],c=(t,r,s,c)=>{let l=s/(s-c),u=e[t*3]+(e[r*3]-e[t*3])*l-n[0],d=e[t*3+1]+(e[r*3+1]-e[t*3+1])*l-n[1],f=e[t*3+2]+(e[r*3+2]-e[t*3+2])*l-n[2];o.push(u*i[0]+d*i[1]+f*i[2],u*a[0]+d*a[1]+f*a[2])};for(let e=0;e<t.length;e+=3){let n=t[e],r=t[e+1],i=t[e+2],a=s(n),o=s(r),l=s(i);a>0&&o>0&&l>0||a<0&&o<0&&l<0||(a>0!=o>0&&c(n,r,a,o),o>0!=l>0&&c(r,i,o,l),l>0!=a>0&&c(i,n,l,a))}return o}function Al(e){let t=e.length/2;if(t<3)return e.slice();let n=Array.from({length:t},(e,t)=>t).sort((t,n)=>e[t*2]-e[n*2]||e[t*2+1]-e[n*2+1]),r=(t,n,r)=>(e[n*2]-e[t*2])*(e[r*2+1]-e[t*2+1])-(e[n*2+1]-e[t*2+1])*(e[r*2]-e[t*2]),i=[],a=[];for(let e of n){for(;i.length>=2&&r(i[i.length-2],i[i.length-1],e)<=0;)i.pop();i.push(e)}for(let e=n.length-1;e>=0;e--){let t=n[e];for(;a.length>=2&&r(a[a.length-2],a[a.length-1],t)<=0;)a.pop();a.push(t)}return i.slice(0,-1).concat(a.slice(0,-1)).flatMap(t=>[e[t*2],e[t*2+1]])}function jl(e){let t=0,n=e.length/2;for(let r=0;r<n;r++){let i=(r+1)%n;t+=Math.hypot(e[i*2]-e[r*2],e[i*2+1]-e[r*2+1])}return t}var Ml=[0,1,0],Nl=[1,0,0],Pl=[0,0,1],Fl=class{data;regions;torso;torsoLegs;legL;armL;head;constructor(e){this.data=e,this.regions=Dl(e),this.torso=Ol(e,this.regions,[0]),this.torsoLegs=Ol(e,this.regions,[0,2]),this.legL=Ol(e,this.regions,[2],1),this.armL=Ol(e,this.regions,[1],1),this.head=Ol(e,this.regions,[3,0])}ringAt(e,t,n){let r=kl(e,t,[0,n,0],Ml,Nl,Pl);return r.length<6?0:jl(Al(r))}hullAt(e,t,n){return Al(kl(e,t,[0,n,0],Ml,Nl,Pl))}bandTris(e,t,n,r){let i=[];for(let a=0;a<t.length;a+=3){let o=e[t[a]*3+1],s=e[t[a+1]*3+1],c=e[t[a+2]*3+1];Math.max(o,s,c)>=n&&Math.min(o,s,c)<=r&&i.push(t[a],t[a+1],t[a+2])}return Uint32Array.from(i)}extreme(e,t,n,r,i,a=.004){let o=this.bandTris(e,t,n,r),s=i?-1/0:1/0,c=n;for(let t=n;t<=r+1e-9;t+=a){let n=this.ringAt(e,o,t);n!==0&&(i?n>s:n<s)&&(s=n,c=t)}return[s,c]}measure(e){let t=e.rest,n=this.data.bodyVertexCount,r=1/0,i=-1/0;for(let e=0;e<n;e++){let n=t[e*3+1];n<r&&(r=n),n>i&&(i=n)}let a=t=>e.joint(t),o=i-r,s=a(`breast.L____tail`),c=a(`upperleg01.L____head`),l=a(`neck01____head`),u=a(`shoulder01.L____head`),d=a(`upperarm01.L____head`),f=a(`upperarm01.R____head`),p=a(`lowerarm01.L____head`),m=a(`wrist.L____head`),h=d,g=0;for(let e=0;e<n;e++)this.regions[e]!==3&&Math.abs(t[e*3+1]-u.y)<.01&&(g=Math.max(g,Math.abs(t[e*3])));let _=a(`lowerleg01.L____head`),v=1/0;for(let e=0;e<n;e++)this.regions[e]===0&&Math.abs(t[e*3])<.02&&(v=Math.min(v,t[e*3+1]));let[y,b]=this.extreme(t,this.torso,s.y-.03,s.y+.02,!0),x=this.ringAt(t,this.torso,s.y-o/1.6*.075),[S,C]=this.extreme(t,this.torso,c.y+.07,s.y-.1,!1),[w,T]=this.extreme(t,this.torsoLegs,v+.02,C-.06,!0),E=this.ringAt(t,this.legL,v-.025),[D]=this.extreme(t,this.head,l.y+.005,l.y+.05,!1),O=[p.x-h.x,p.y-h.y,p.z-h.z],k=Math.hypot(O[0],O[1],O[2]),A=O.map(e=>e/k),j=Ll(Il(A,Pl)),M=Il(A,j),N=[h.x+O[0]*.45,h.y+O[1]*.45,h.z+O[2]*.45],P=kl(t,this.armL,N,A,j,M),F=P.length>=6?jl(Al(P)):0,I=e=>Math.round(e*1e3)/10;return{height:I(i-r),bust:I(y),underbust:I(x),waist:I(S),hips:I(w),shoulder:I((d.distanceTo(f)+g*2)/2),armLength:I(d.distanceTo(p)+p.distanceTo(m)+.03),inseam:I(v-r),thigh:I(E),upperArm:I(F),neck:I(D),backLength:I(l.y-C),bustY:I(b-r),waistY:I(C-r),hipY:I(T-r),crotchY:I(v-r),shoulderY:I(u.y-r),neckY:I(l.y-r),kneeY:I(_.y-r)}}};function Il(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function Ll(e){let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}var Rl={height:{height:1},bust:{cup:.6,bust:.5},underbust:{underbust:1},waist:{waist:1,belly:.3},hips:{hips:1,hipwidth:.3},shoulder:{shoulder:1},armLength:{upperarmlen:.55,lowerarmlen:.45},inseam:{upperleglen:.6,lowerleglen:.4},thigh:{thigh:1},upperArm:{upperarm:1}},zl={height:1,weight:1},Bl=1.3;function Vl(e,t){let n=t/(e/100)**2;return n>=21.5?Math.min(1,(n-21.5)/10):Math.max(-1,(n-21.5)/5.5)}function Hl(e,t){let n={...t};for(let[t,r]of Object.entries(e)){let e=t===`weight`?{weight:1}:Rl[t];for(let[t,i]of Object.entries(e))n[t]=(n[t]??0)+r*i}return n}function Ul(e,t,n,r={}){let i=Wl(e,t,n,r,!1);if(Object.values(i.residual).every(e=>Math.abs(e)<1.5))return i;let a=Wl(e,t,n,r,!0),o=e=>Object.values(e.residual).reduce((e,t)=>e+t*t,0);return o(a)<o(i)?a:(e.setMorphs(i.morphs),i)}function Wl(e,t,n,r,i){let a=Object.keys(n).filter(e=>n[e]!==void 0&&Rl[e]),o={...r.extra??{}};r.weightKg&&n.height&&(o.weight=Vl(n.height,r.weightKg));let s=[...a];i&&s.push(`weight`);let c=Object.fromEntries(s.map(e=>[e,0])),l=e=>zl[e]??Bl,u=n=>(e.setMorphs(Hl(n,o)),t.measure(e)),d=e=>a.map(t=>e[t]-n[t]),f=e=>Math.sqrt(e.reduce((e,t)=>e+t*t,0)),p=u(c),m=d(p),h=null,g=0,_=r.maxIter??10,v=r.tolerance??.4;for(;g<_&&Math.max(...m.map(Math.abs))>v;g++){if(!h||g%3==0){let e=.2;h=a.map(()=>Array(s.length).fill(0)),s.forEach((t,n)=>{let r={...c,[t]:c[t]+(c[t]+e>l(t)?-.2:e)},i=r[t]-c[t],o=d(u(r));for(let e=0;e<a.length;e++)h[e][n]=(o[e]-m[e])/i})}let e=s.length,t=Gl(Array.from({length:e},(t,n)=>Array.from({length:e},(e,t)=>{let r=0;for(let e=0;e<a.length;e++)r+=h[e][n]*h[e][t];return r+(n===t?.001+1e-4*Math.abs(r):0)})),Array.from({length:e},(e,t)=>-a.reduce((e,n,r)=>e+h[r][t]*m[r],0))),n=1,r=!1;for(let e=0;e<4;e++,n/=2){let e={...c};s.forEach((r,i)=>{e[r]=Math.max(-l(r),Math.min(l(r),c[r]+n*t[i]))});let i=u(e),a=d(i);if(f(a)<f(m)){Object.assign(c,e),p=i,m=a,r=!0;break}}if(!r){if(h=null,g%3!=2)continue;break}}let y=Hl(c,o);e.setMorphs(y),p=t.measure(e);let b={};return a.forEach(e=>{b[e]=Math.round((p[e]-n[e])*10)/10}),{morphs:y,measured:p,residual:b,iterations:g}}function Gl(e,t){let n=t.length,r=e.map((e,n)=>[...e,t[n]]);for(let e=0;e<n;e++){let t=e;for(let i=e+1;i<n;i++)Math.abs(r[i][e])>Math.abs(r[t][e])&&(t=i);[r[e],r[t]]=[r[t],r[e]];let i=r[e][e]||1e-12;for(let t=0;t<n;t++){if(t===e)continue;let a=r[t][e]/i;for(let i=e;i<=n;i++)r[t][i]-=a*r[e][i]}}return r.map((e,t)=>e[n]/(e[t]||1e-12))}function Kl(e,t,n,r,i=!0){let a=e.boneIndex.get(n);if(a===void 0)return;e.setPose(t);let o=e.poseGlobal[a],s=new X().setFromMatrixColumn(o,1).normalize(),c=r.clone().normalize(),l=new wt().setFromUnitVectors(s,c),u=new wt().setFromRotationMatrix(new Jt().extractRotation(o)),d=new wt().fromArray(t[n]??[0,0,0,1]),f=u.clone().invert().multiply(l).multiply(u);d.multiply(f),i||d.normalize(),t[n]=[d.x,d.y,d.z,d.w]}function ql(e,t,n=1){let r=e.data.poses;if(t===`rest`)return{};if(t===`tpose`)return{...r.tpose};let i={...r.standing02??{}};if(t!==`sit`&&n<.999){let t={...i};for(let n of[`L`,`R`]){let r=n===`L`?1:-1;e.setPose(t);let i=e.bonePosed(`upperleg01.${n}`),a=e.bonePosed(`foot.${n}`),o=i.distanceTo(a)||.8,s=(r*.045-i.x)/o;Kl(e,t,`upperleg01.${n}`,new X(s,-1,.01)),Kl(e,t,`upperleg02.${n}`,new X(s,-1,.01)),Kl(e,t,`lowerleg01.${n}`,new X(s*.4,-1,-.01)),Kl(e,t,`lowerleg02.${n}`,new X(s*.4,-1,-.01)),Kl(e,t,`foot.${n}`,new X(.12*r,-.5,1))}let r=new wt,a=new wt;for(let e of Object.keys(t))/^(upperleg|lowerleg|foot|toe)/.test(e)&&(r.fromArray(i[e]??[0,0,0,1]),a.fromArray(t[e]),r.slerp(a,1-Math.max(0,n)),i[e]=[r.x,r.y,r.z,r.w])}if(t===`sit`)for(let t of[`L`,`R`]){let n=t===`L`?1:-1;Kl(e,i,`upperleg01.${t}`,new X(.1*n,-.12,1)),Kl(e,i,`upperleg02.${t}`,new X(.1*n,-.12,1)),Kl(e,i,`lowerleg01.${t}`,new X(.03*n,-1,.08)),Kl(e,i,`lowerleg02.${t}`,new X(.03*n,-1,.08)),Kl(e,i,`foot.${t}`,new X(.05*n,-.45,1)),Kl(e,i,`upperarm01.${t}`,new X(.1*n,-1,.12)),Kl(e,i,`upperarm02.${t}`,new X(.1*n,-1,.12)),Kl(e,i,`lowerarm01.${t}`,new X(-.04*n,-.62,1)),Kl(e,i,`lowerarm02.${t}`,new X(-.04*n,-.62,1))}return e.setPose(i),i}function Jl(e,t,n){let r={},i=new wt,a=new wt;for(let o of new Set([...Object.keys(e),...Object.keys(t)]))i.fromArray(e[o]??[0,0,0,1]),a.fromArray(t[o]??[0,0,0,1]),i.slerp(a,n),r[o]=[i.x,i.y,i.z,i.w];return r}var Yl=new la;function Xl(e,t=!0){let n=Yl.load(e);return t&&(n.colorSpace=Pe),n.anisotropy=8,n}var Zl=class{group=new Cn;body;bodyMesh;skinMaterial;bodySrcIndex;bodyPosed;bodyNormals;hairMesh=null;extras=[];baseUrl;hairColor=new Z(3877408);constructor(e,t=`avatar/`){this.body=e,this.baseUrl=t;let n=e.data,r=n.bodyVertexCount;this.bodyPosed=new Float32Array(r*3),this.bodyNormals=new Float32Array(r*3),this.bodySrcIndex=new Uint32Array(n.body.index.length);for(let e=0;e<n.body.index.length;e++)this.bodySrcIndex[e]=n.body.src[n.body.index[e]];let i=new Tr,a=n.body.src.length;i.setAttribute(`position`,new ur(new Float32Array(a*3),3)),i.setAttribute(`normal`,new ur(new Float32Array(a*3),3)),i.setAttribute(`uv`,new ur(n.body.uv,2)),i.setIndex(new ur(n.body.index,1)),this.skinMaterial=new Ni({map:Xl(t+n.skins[0].texture),roughness:.62,sheen:.25,sheenRoughness:.8,sheenColor:new Z(16767176),clearcoat:.04,clearcoatRoughness:.6}),this.bodyMesh=new Yr(i,this.skinMaterial),this.bodyMesh.castShadow=!0,this.bodyMesh.receiveShadow=!0,this.bodyMesh.name=`body`,this.group.add(this.bodyMesh);for(let e of n.extras){let n=e.name===`eyes`?new Ni({map:Xl(t+e.texture),roughness:.15,clearcoat:1}):new Mi({map:Xl(t+e.texture),transparent:!0,alphaTest:.05,depthWrite:!1,color:2759700,roughness:.8,side:2}),r=this.makeProxy(e,n);r.mesh.renderOrder=2,this.extras.push(r)}this.setHair(n.hair[0].name),this.update()}makeProxy(e,t){let n=e.refIdx.length/3,r=new Tr;r.setAttribute(`position`,new ur(new Float32Array(n*3),3)),r.setAttribute(`normal`,new ur(new Float32Array(n*3),3)),r.setAttribute(`uv`,new ur(e.uv,2)),r.setIndex(new ur(e.index,1));let i=new Yr(r,t);return i.name=e.name,i.castShadow=!0,this.group.add(i),{data:e,mesh:i,rest:new Float32Array(n*3),posed:new Float32Array(n*3)}}setHair(e){this.hairMesh&&=(this.group.remove(this.hairMesh.mesh),this.hairMesh.mesh.geometry.dispose(),null);let t=this.body.data.hair.find(t=>t.name===e);if(!t)return;let n=new Mi({map:Xl(this.baseUrl+t.texture),color:this.hairColor,transparent:!1,alphaTest:.35,alphaToCoverage:!0,roughness:.55,metalness:0,side:2});this.hairMesh=this.makeProxy(t,n),this.updateProxy(this.hairMesh)}refMesh=null;setReference(e){this.refMesh&&=(this.group.remove(this.refMesh.mesh),this.refMesh.mesh.geometry.dispose(),null);let t=this.body.data.refClothes.find(t=>t.name===e);if(!t)return;let n=new Mi({map:Xl(this.baseUrl+t.texture),roughness:.85,side:2});this.refMesh=this.makeProxy(t,n),this.updateProxy(this.refMesh)}setHairColor(e){this.hairColor.set(e),this.hairMesh&&this.hairMesh.mesh.material.color.copy(this.hairColor)}setSkin(e,t){let n=this.body.data.skins.find(t=>t.name===e)??this.body.data.skins[0];this.skinMaterial.map=Xl(this.baseUrl+n.texture),t&&this.skinMaterial.color.set(t),this.skinMaterial.needsUpdate=!0}updateProxy(e){let t=e.data,n=t.refIdx.length/3;this.body.fitProxy(t,e.rest),this.body.skinRaw(e.rest,t.skinIdx,t.skinW,n,e.posed);let r=e.mesh.geometry;r.attributes.position.array.set(e.posed),Sl(e.posed,t.index,n,r.attributes.normal.array),r.attributes.position.needsUpdate=!0,r.attributes.normal.needsUpdate=!0,r.computeBoundingSphere()}update(){let e=this.body.data,t=e.bodyVertexCount;this.body.posedBody(this.bodyPosed),Sl(this.bodyPosed,this.bodySrcIndex,t,this.bodyNormals);let n=this.bodyMesh.geometry,r=n.attributes.position.array,i=n.attributes.normal.array,a=e.body.src;for(let e=0;e<a.length;e++){let t=a[e]*3,n=e*3;r[n]=this.bodyPosed[t],r[n+1]=this.bodyPosed[t+1],r[n+2]=this.bodyPosed[t+2],i[n]=this.bodyNormals[t],i[n+1]=this.bodyNormals[t+1],i[n+2]=this.bodyNormals[t+2]}n.attributes.position.needsUpdate=!0,n.attributes.normal.needsUpdate=!0,n.computeBoundingSphere();for(let e of this.extras)this.updateProxy(e);this.hairMesh&&this.updateProxy(this.hairMesh),this.refMesh&&this.updateProxy(this.refMesh)}get posedBodyPositions(){return this.bodyPosed}get posedBodyNormals(){return this.bodyNormals}},Ql={type:`change`},$l={type:`start`},eu={type:`end`},tu=new Ir,nu=new kr,ru=Math.cos(70*Ct.DEG2RAD),iu=new X,au=2*Math.PI,ou={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},su=1e-6,cu=class extends Ja{constructor(e,t=null){super(e,t),this.state=ou.NONE,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:n.ROTATE,MIDDLE:n.DOLLY,RIGHT:n.PAN},this.touches={ONE:r.ROTATE,TWO:r.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new wt,this._lastTargetPosition=new X,this._quat=new wt().setFromUnitVectors(e.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qa,this._sphericalDelta=new qa,this._scale=1,this._panOffset=new X,this._rotateStart=new Y,this._rotateEnd=new Y,this._rotateDelta=new Y,this._panStart=new Y,this._panEnd=new Y,this._panDelta=new Y,this._dollyStart=new Y,this._dollyEnd=new Y,this._dollyDelta=new Y,this._dollyDirection=new X,this._mouse=new Y,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uu.bind(this),this._onPointerDown=lu.bind(this),this._onPointerUp=du.bind(this),this._onContextMenu=vu.bind(this),this._onMouseWheel=mu.bind(this),this._onKeyDown=hu.bind(this),this._onTouchStart=gu.bind(this),this._onTouchMove=_u.bind(this),this._onMouseDown=fu.bind(this),this._onMouseMove=pu.bind(this),this._interceptControlDown=yu.bind(this),this._interceptControlUp=bu.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=ou.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ql),this.update(),this.state=ou.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;iu.copy(t).sub(this.target),iu.applyQuaternion(this._quat),this._spherical.setFromVector3(iu),this.autoRotate&&this.state===ou.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=au:n>Math.PI&&(n-=au),r<-Math.PI?r+=au:r>Math.PI&&(r-=au),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(iu.setFromSpherical(this._spherical),iu.applyQuaternion(this._quatInverse),t.copy(this.target).add(iu),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=iu.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new X(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new X(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=iu.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(tu.origin.copy(this.object.position),tu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(tu.direction))<ru?this.object.lookAt(this.target):(nu.setFromNormalAndCoplanarPoint(this.object.up,this.target),tu.intersectPlane(nu,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>su||8*(1-this._lastQuaternion.dot(this.object.quaternion))>su||this._lastTargetPosition.distanceToSquared(this.target)>su?(this.dispatchEvent(Ql),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?au/60/60*this.autoRotateSpeed:au/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){iu.setFromMatrixColumn(t,0),iu.multiplyScalar(-e),this._panOffset.add(iu)}_panUp(e,t){this.screenSpacePanning===!0?iu.setFromMatrixColumn(t,1):(iu.setFromMatrixColumn(t,0),iu.crossVectors(this.object.up,iu)),iu.multiplyScalar(e),this._panOffset.add(iu)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;iu.copy(r).sub(this.target);let i=iu.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(au*this._rotateDelta.x/t.clientHeight),this._rotateUp(au*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(au*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-au*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(au*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-au*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(au*this._rotateDelta.x/t.clientHeight),this._rotateUp(au*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Y,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function lu(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function uu(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function du(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(eu),this.state=ou.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function fu(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case n.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ou.DOLLY;break;case n.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ou.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ou.ROTATE}break;case n.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ou.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ou.PAN}break;default:this.state=ou.NONE}this.state!==ou.NONE&&this.dispatchEvent($l)}function pu(e){switch(this.state){case ou.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ou.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ou.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function mu(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===ou.NONE&&(e.preventDefault(),this.dispatchEvent($l),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(eu))}function hu(e){this.enabled!==!1&&this._handleKeyDown(e)}function gu(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case r.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ou.TOUCH_ROTATE;break;case r.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ou.TOUCH_PAN;break;default:this.state=ou.NONE}break;case 2:switch(this.touches.TWO){case r.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ou.TOUCH_DOLLY_PAN;break;case r.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ou.TOUCH_DOLLY_ROTATE;break;default:this.state=ou.NONE}break;default:this.state=ou.NONE}this.state!==ou.NONE&&this.dispatchEvent($l)}function _u(e){switch(this._trackPointer(e),this.state){case ou.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ou.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ou.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ou.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ou.NONE}}function vu(e){this.enabled!==!1&&e.preventDefault()}function yu(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function bu(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var xu=t({RoomEnvironment:()=>Su}),Su=class extends jn{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new _i;e.deleteAttribute(`uv`);let t=new Mi({side:1}),n=new Mi,r=new Ta(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new Yr(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new si(e,n,6),o=new Sn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new Yr(e,Cu(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new Yr(e,Cu(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new Yr(e,Cu(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new Yr(e,Cu(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Yr(e,Cu(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Yr(e,Cu(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Cu(e){return new Fi({color:0,emissive:16777215,emissiveIntensity:e})}var wu={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Tu=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Eu=new Ea(-1,1,1,-1,0,1),Du=new class extends Tr{constructor(){super(),this.setAttribute(`position`,new pr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new pr([0,2,0,0,2,0],2))}},Ou=class{constructor(e){this._mesh=new Yr(Du,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Eu)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},ku=class extends Tu{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ai?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Di.clone(e.uniforms),this.material=new Ai({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ou(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Au=class extends Tu{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ju=class extends Tu{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Mu=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new Y);this._width=n.width,this._height=n.height,t=new Gt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:b}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ku(wu),this.copyPass.material.blending=0,this.timer=new Na}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Au!==void 0&&(r instanceof Au?n=!0:r instanceof ju&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Nu=class extends Tu{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Z}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Pu={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Y},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new Jt},cameraProjectionMatrixInverse:{value:new Jt},cameraWorldMatrix:{value:new Jt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new X(-1,-1,-1)},sceneBoxMax:{value:new X(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Fu={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Iu={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Lu(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=Ru(t),r=n.length,a=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],i=2*Math.PI*t/r,o=new X(Math.cos(i),Math.sin(i),0).normalize();a[e*4]=(o.x*.5+.5)*255,a[e*4+1]=(o.y*.5+.5)*255,a[e*4+2]=127,a[e*4+3]=255}let o=new Qr(a,t,t);return o.wrapS=i,o.wrapT=i,o.needsUpdate=!0,o}function Ru(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var zu={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:Bu(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Y},cameraProjectionMatrixInverse:{value:new Jt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Bu(e,t,n){let r=Vu(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function Vu(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new X(Math.cos(a),Math.sin(a),o))}return r}var Hu=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,j=g-1+3*d,M=_-1+3*d,N=v-1+3*d,P=c&255,F=l&255,I=u&255,L=this.perm[P+this.perm[F+this.perm[I]]]%12,R=this.perm[P+y+this.perm[F+b+this.perm[I+x]]]%12,ee=this.perm[P+S+this.perm[F+C+this.perm[I+w]]]%12,te=this.perm[P+1+this.perm[F+1+this.perm[I+1]]]%12,z=.6-g*g-_*_-v*v;z<0?r=0:(z*=z,r=z*z*this._dot3(this.grad3[L],g,_,v));let ne=.6-T*T-E*E-D*D;ne<0?i=0:(ne*=ne,i=ne*ne*this._dot3(this.grad3[R],T,E,D));let re=.6-O*O-k*k-A*A;re<0?a=0:(re*=re,a=re*re*this._dot3(this.grad3[ee],O,k,A));let B=.6-j*j-M*M-N*N;return B<0?o=0:(B*=B,o=B*B*this._dot3(this.grad3[te],j,M,N)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,j=w>D?4:0,M=T>D?2:0,N=+(E>D),P=O+k+A+j+M+N,F=+(a[P][0]>=3),I=+(a[P][1]>=3),L=+(a[P][2]>=3),R=+(a[P][3]>=3),ee=+(a[P][0]>=2),te=+(a[P][1]>=2),z=+(a[P][2]>=2),ne=+(a[P][3]>=2),re=+(a[P][0]>=1),B=+(a[P][1]>=1),ie=+(a[P][2]>=1),ae=+(a[P][3]>=1),oe=w-F+c,se=T-I+c,ce=E-L+c,le=D-R+c,ue=w-ee+2*c,de=T-te+2*c,fe=E-z+2*c,pe=D-ne+2*c,me=w-re+3*c,he=T-B+3*c,ge=E-ie+3*c,_e=D-ae+3*c,V=w-1+4*c,ve=T-1+4*c,ye=E-1+4*c,be=D-1+4*c,xe=h&255,Se=g&255,Ce=_&255,we=v&255,Te=o[xe+o[Se+o[Ce+o[we]]]]%32,Ee=o[xe+F+o[Se+I+o[Ce+L+o[we+R]]]]%32,H=o[xe+ee+o[Se+te+o[Ce+z+o[we+ne]]]]%32,De=o[xe+re+o[Se+B+o[Ce+ie+o[we+ae]]]]%32,Oe=o[xe+1+o[Se+1+o[Ce+1+o[we+1]]]]%32,ke=.6-w*w-T*T-E*E-D*D;ke<0?l=0:(ke*=ke,l=ke*ke*this._dot4(i[Te],w,T,E,D));let U=.6-oe*oe-se*se-ce*ce-le*le;U<0?u=0:(U*=U,u=U*U*this._dot4(i[Ee],oe,se,ce,le));let Ae=.6-ue*ue-de*de-fe*fe-pe*pe;Ae<0?d=0:(Ae*=Ae,d=Ae*Ae*this._dot4(i[H],ue,de,fe,pe));let W=.6-me*me-he*he-ge*ge-_e*_e;W<0?f=0:(W*=W,f=W*W*this._dot4(i[De],me,he,ge,_e));let G=.6-V*V-ve*ve-ye*ye-be*be;return G<0?p=0:(G*=G,p=G*G*this._dot4(i[Oe],V,ve,ye,be)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},Uu=class e extends Tu{constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Lu(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Gt(this.width,this.height,{type:b,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Ai({defines:Object.assign({},Pu.defines),uniforms:Di.clone(Pu.uniforms),vertexShader:Pu.vertexShader,fragmentShader:Pu.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Pi,this.normalMaterial.blending=0,this.pdMaterial=new Ai({defines:Object.assign({},zu.defines),uniforms:Di.clone(zu.uniforms),vertexShader:zu.vertexShader,fragmentShader:zu.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Ai({defines:Object.assign({},Fu.defines),uniforms:Di.clone(Fu.uniforms),vertexShader:Fu.vertexShader,fragmentShader:Fu.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Ai({uniforms:Di.clone(wu.uniforms),vertexShader:wu.vertexShader,fragmentShader:wu.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new Ai({uniforms:Di.clone(Iu.uniforms),vertexShader:Iu.vertexShader,fragmentShader:Iu.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Ou(null),this._originalClearColor=new Z,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new mi,this.depthTexture.format=A,this.depthTexture.type=C,this.normalRenderTarget=new Gt(this.width,this.height,{minFilter:s,magFilter:s,type:b,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Bu(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new Hu,n=e*e*4,r=new Uint8Array(n);for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=n,o=i;r[(n*e+i)*4]=(t.noise(a,o)*.5+.5)*255,r[(n*e+i)*4+1]=(t.noise(a+e,o)*.5+.5)*255,r[(n*e+i)*4+2]=(t.noise(a,o+e)*.5+.5)*255,r[(n*e+i)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let a=new Qr(r,e,e,O,p);return a.wrapS=i,a.wrapT=i,a.needsUpdate=!0,a}};Uu.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Wu={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Gu=class extends Tu{constructor(){super(),this.isOutputPass=!0,this.uniforms=Di.clone(Wu.uniforms),this.material=new ji({name:Wu.name,uniforms:this.uniforms,vertexShader:Wu.vertexShader,fragmentShader:Wu.fragmentShader}),this._fsQuad=new Ou(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Mt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ku=class{renderer;scene=new jn;camera;controls;turntable=new Cn;container;framing=`full`;bodyHeight=1.6;seatHeight=0;chair;tween=null;timer=new Na;onFrame=null;composer=null;gtao=null;_quality=!0;get quality(){return this._quality}set quality(e){this._quality=e,this.scene.background.set(e&&this.composer?16774890:15657700)}onQualityDrop=null;slowFrames=0;constructor(e){this.container=e,this.renderer=new hl({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Pe,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,e.appendChild(this.renderer.domElement);let t=new So(this.renderer);this.scene.environment=t.fromScene(new Su,.04).texture,this.scene.environmentIntensity=.55,this.scene.background=new Z(16774890),this.camera=new Ca(30,1,.05,50),this.controls=new cu(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.minDistance=.6,this.controls.maxDistance=8,this.controls.autoRotateSpeed=2;let n=new Oa(16774376,2.2);n.position.set(1.8,3.2,2.4),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-1.2,n.shadow.camera.right=1.2,n.shadow.camera.top=2.2,n.shadow.camera.bottom=-.2,n.shadow.bias=-4e-4,n.shadow.normalBias=.02,n.shadow.radius=4;let r=new Oa(15266047,.6);r.position.set(-2.5,1.6,1.2);let i=new Oa(16777215,1.1);i.position.set(-.6,2.4,-2.8),this.scene.add(n,r,i,new da(16777215,14208964,.35));let a=new Yr(new vi(3,64),new Mi({color:14999254,roughness:.9}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.scene.add(a),this.chair=qu(),this.chair.visible=!1,this.turntable.add(this.chair),this.scene.add(this.turntable);try{let e=new Gt(1,1,{samples:4,type:b});this.composer=new Mu(this.renderer,e),this.composer.addPass(new Nu(this.scene,this.camera)),this.gtao=new Uu(this.scene,this.camera,1,1),this.gtao.updateGtaoMaterial({radius:.09,distanceExponent:1.5,thickness:1.2,scale:1,samples:12}),this.gtao.blendIntensity=.85,this.composer.addPass(this.gtao),this.composer.addPass(new Gu)}catch(e){console.warn(`ambient occlusion unavailable`,e),this.composer=null}this.quality=this._quality,new ResizeObserver(()=>this.resize()).observe(e),this.resize(),this.frame(!0),this.renderer.setAnimationLoop(()=>this.loop())}resize(){let e=this.container.clientWidth||1,t=this.container.clientHeight||1;this.renderer.setSize(e,t,!1);let n=this.renderer.getPixelRatio();this.composer?.setPixelRatio(n),this.composer?.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}setAutoRotate(e){this.controls.autoRotate=e}get autoRotate(){return this.controls.autoRotate}setFigure(e,t,n){this.bodyHeight=e,this.chair.visible=t!==null,t!==null&&(this.seatHeight=t,this.chair.scale.set(1,t/.45,1),n&&this.chair.position.set(n.x,0,n.z)),this.frame(!1)}setFraming(e){this.framing=e,this.frame(!1)}frame(e){let t=this.chair.visible?Math.max(this.bodyHeight,1):this.bodyHeight,n=this.camera.aspect||1,r,i,a=Ct.degToRad(this.camera.fov);if(this.framing===`half`){let e=t*1.02,o=t*.58,s=(e-o)*1.15,c=Math.max(s/2/Math.tan(a/2),s*.8/n/2/Math.tan(a/2));r=new X(0,(e+o)/2,0),i=new X(0,r.y+.05,c+.2)}else{let e=t*1.12,o=Math.max(e/2/Math.tan(a/2),e*.55/n/2/Math.tan(a/2));r=new X(0,t*.52,0),i=new X(0,t*.58,o+.25)}let o=this.camera.position.clone().sub(this.controls.target);if(!e&&o.lengthSq()>1e-6&&(o.y=0,o.lengthSq()>1e-6)){o.normalize();let e=i.z;i=new X(o.x*e,i.y,o.z*e)}e?(this.camera.position.copy(i),this.controls.target.copy(r),this.controls.update()):this.tween={from:this.camera.position.clone(),to:i,tFrom:this.controls.target.clone(),tTo:r,t:0}}loop(){this.timer.update();let e=this.timer.getDelta(),t=Math.min(e,.1);if(this.tween){let e=this.tween;e.t=Math.min(1,e.t+t/.6);let n=e.t*e.t*(3-2*e.t);this.camera.position.lerpVectors(e.from,e.to,n),this.controls.target.lerpVectors(e.tFrom,e.tTo,n),e.t>=1&&(this.tween=null)}this.onFrame?.(t),this.controls.update(),this.quality&&this.composer?(this.composer.render(t),this.slowFrames=e>.045?this.slowFrames+e:Math.max(0,this.slowFrames-e*2),this.slowFrames>2&&(this.quality=!1,this.slowFrames=0,this.onQualityDrop?.())):this.renderer.render(this.scene,this.camera)}get seat(){return this.seatHeight}};function qu(){let e=new Cn,t=new Mi({color:9071183,roughness:.55}),n=new Yr(new yi(.2,.2,.04,40),t);n.position.y=.43,n.castShadow=n.receiveShadow=!0,e.add(n);for(let n=0;n<4;n++){let r=n/4*Math.PI*2+Math.PI/4,i=new Yr(new yi(.015,.018,.42,12),t);i.position.set(Math.cos(r)*.14,.21,Math.sin(r)*.14),i.castShadow=!0,e.add(i)}return e.name=`stool`,e}function Ju(e,t,n,r,i,a,o=1/0){let s=.03,c=new Map,l=(e,t,n)=>((Math.floor(e/s)+512)*1024+(Math.floor(t/s)+512))*1024+(Math.floor(n/s)+512);for(let e=0;e<i;e++){let t=l(n[e*3],n[e*3+1],n[e*3+2]),r=c.get(t);r?r.push(e):c.set(t,[e])}for(let i=0;i<t;i++){let t=e[i*3],l=e[i*3+1],u=e[i*3+2],d=Math.floor(t/s),f=Math.floor(l/s),p=Math.floor(u/s),m=-1,h=1/0;for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=c.get(((d+e+512)*1024+(f+r+512))*1024+(p+i+512));if(a)for(let e of a){let r=t-n[e*3],i=l-n[e*3+1],a=u-n[e*3+2],o=r*r+i*i+a*a;o<h&&(h=o,m=e)}}if(m<0||h>o*o)continue;let g=r[m*3],_=r[m*3+1],v=r[m*3+2],y=(t-n[m*3])*g+(l-n[m*3+1])*_+(u-n[m*3+2])*v;if(y<a){let t=a-y;e[i*3]+=g*t,e[i*3+1]+=_*t,e[i*3+2]+=v*t}}}function Yu(e,t,n=10,r=.55,i=-.58,a){let o=e.length/3,s=Array.from({length:o},()=>new Set);for(let e=0;e<t.length;e+=3){let n=t[e],r=t[e+1],i=t[e+2];s[n].add(r),s[n].add(i),s[r].add(n),s[r].add(i),s[i].add(n),s[i].add(r)}let c=s.map(e=>[...e]),l=new Float64Array(o*3),u=t=>{for(let n=0;n<o;n++){let r=c[n];if(!r.length||a&&a(n)){l[n*3]=e[n*3],l[n*3+1]=e[n*3+1],l[n*3+2]=e[n*3+2];continue}let i=0,o=0,s=0;for(let t of r)i+=e[t*3],o+=e[t*3+1],s+=e[t*3+2];i/=r.length,o/=r.length,s/=r.length,l[n*3]=e[n*3]+t*(i-e[n*3]),l[n*3+1]=e[n*3+1]+t*(o-e[n*3+1]),l[n*3+2]=e[n*3+2]+t*(s-e[n*3+2])}for(let t=0;t<o*3;t++)e[t]=l[t]};for(let e=0;e<n;e++)u(r),u(i)}function Xu(e){let{index:t,weld:n,body:r,bodyN:i,bodyCount:a,gap:o}=e,s=e.pos.length/3,c=new Map,l=new Int32Array(s);for(let e=0;e<s;e++){let t=c.get(n[e]);t===void 0&&(t=c.size,c.set(n[e],t)),l[e]=t}let u=c.size,d=new Float64Array(u*3),f=new Float64Array(u*3),p=new Uint8Array(u);for(let t=0;t<s;t++){let n=l[t];for(let r=0;r<3;r++)d[n*3+r]=e.pos[t*3+r],f[n*3+r]=e.rest[t*3+r];p[n]=e.free[t]}let m=e.steps??50,h=e.iterations??12,g=(e,t,n)=>Math.hypot(e[t*3]-e[n*3],e[t*3+1]-e[n*3+1],e[t*3+2]-e[n*3+2]),_=new Set,v=[],y=[],b=[];for(let e=0;e<t.length;e+=3)for(let n=0;n<3;n++){let r=l[t[e+n]],i=l[t[e+(n+1)%3]];if(r===i)continue;let a=r<i?r*4194304+i:i*4194304+r;_.has(a)||!p[r]&&!p[i]||(_.add(a),v.push(r),y.push(i),b.push(g(f,r,i)))}let x=new Map,S=[],C=[],w=[];for(let e=0;e<t.length;e+=3)for(let n=0;n<3;n++){let r=l[t[e+n]],i=l[t[e+(n+1)%3]],a=l[t[e+(n+2)%3]];if(r===i)continue;let o=r<i?r*4194304+i:i*4194304+r,s=x.get(o);s===void 0?x.set(o,a):s!==a&&(p[s]||p[a])&&(S.push(s),C.push(a),w.push(g(f,s,a)))}let T=.08+.35*(1-(e.drape??.5)),E=[],D=new Uint8Array(u);for(let e=0;e<v.length;e++)!p[v[e]]&&!D[v[e]]&&(D[v[e]]=1,E.push(v[e])),!p[y[e]]&&!D[y[e]]&&(D[y[e]]=1,E.push(y[e]));let O=new Int32Array(u).fill(-1),k=new Float64Array(u);if(E.length)for(let e=0;e<u;e++){if(!p[e])continue;let t=-1,n=1/0;for(let r of E){let i=g(f,e,r);i<n&&(n=i,t=r)}O[e]=t,k[e]=n*1.03}let A=.035,j=new Map,M=(e,t,n)=>((e+512)*1024+(t+512))*1024+(n+512),N=r,P=i,F=a;if(e.under?.length){F=a+e.under.reduce((e,t)=>e+t.count,0),N=new Float32Array(F*3),P=new Float32Array(F*3),N.set(r.subarray(0,a*3)),P.set(i.subarray(0,a*3));let t=a*3;for(let n of e.under)N.set(n.pos.subarray(0,n.count*3),t),P.set(n.normals.subarray(0,n.count*3),t),t+=n.count*3}for(let e=0;e<F;e++){let t=M(Math.floor(N[e*3]/A),Math.floor(N[e*3+1]/A),Math.floor(N[e*3+2]/A)),n=j.get(t);n?n.push(e):j.set(t,[e])}let I=d.slice(),L=e.compress??.15+.35*(1-(e.drape??.5)),R=new Int32Array(u).fill(-1),ee=e=>{let t=e*3,n=d[t],r=d[t+1],i=d[t+2],a=Math.floor(n/A),o=Math.floor(r/A),s=Math.floor(i/A),c=-1,l=1/0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let u=-1;u<=1;u++){let d=j.get(M(a+e,o+t,s+u));if(d)for(let e of d){let t=n-N[e*3],a=r-N[e*3+1],o=i-N[e*3+2],s=t*t+a*a+o*o;s<l&&(l=s,c=e)}}R[e]=c},te=0,z=()=>{let t=te++%4==0;for(let n=0;n<u;n++){if(!p[n])continue;let r=n*3,i=d[r],s=d[r+1],c=d[r+2];t&&ee(n);let l=R[n],u=l>=a&&(i-N[l*3])**2+(s-N[l*3+1])**2+(c-N[l*3+2])**2>4e-4;if(l>=0&&!u){let e=P[l*3],t=P[l*3+1],n=P[l*3+2],a=(i-N[l*3])*e+(s-N[l*3+1])*t+(c-N[l*3+2])*n;if(a<o){let i=o-a;d[r]+=e*i,d[r+1]+=t*i,d[r+2]+=n*i,I[r]=d[r],I[r+1]=d[r+1],I[r+2]=d[r+2]}}if(e.seat){let t=e.seat;Math.hypot(d[r]-t.x,d[r+2]-t.z)<t.r&&d[r+1]<t.y+o&&d[r+1]>t.y-.06&&(d[r+1]=t.y+o,I[r+1]=d[r+1])}d[r+1]<o&&(d[r+1]=o,I[r+1]=o)}};for(let e=0;e<m;e++){for(let e=0;e<u;e++){if(!p[e])continue;let t=e*3;for(let e=0;e<3;e++){let n=(d[t+e]-I[t+e])*.88;I[t+e]=d[t+e],d[t+e]+=n+(e===1?-.002725:0)}}for(let e=0;e<h;e++){for(let e=0;e<v.length;e++){let t=v[e]*3,n=y[e]*3,r=d[n]-d[t],i=d[n+1]-d[t+1],a=d[n+2]-d[t+2],o=Math.hypot(r,i,a)||1e-9,s=(o-b[e])/o;s<0&&(s*=L);let c=p[v[e]],l=p[y[e]],u=c?l?.5:1:0,f=l?c?.5:1:0;d[t]+=r*s*u,d[t+1]+=i*s*u,d[t+2]+=a*s*u,d[n]-=r*s*f,d[n+1]-=i*s*f,d[n+2]-=a*s*f}if(e%2==0)for(let e=0;e<S.length;e++){let t=S[e]*3,n=C[e]*3,r=d[n]-d[t],i=d[n+1]-d[t+1],a=d[n+2]-d[t+2],o=Math.hypot(r,i,a)||1e-9,s=(o-w[e])/o*T,c=p[S[e]],l=p[C[e]],u=c?l?.5:1:0,f=l?c?.5:1:0;d[t]+=r*s*u,d[t+1]+=i*s*u,d[t+2]+=a*s*u,d[n]-=r*s*f,d[n+1]-=i*s*f,d[n+2]-=a*s*f}for(let e=0;e<u;e++){let t=O[e];if(t<0)continue;let n=e*3,r=t*3,i=d[n]-d[r],a=d[n+1]-d[r+1],o=d[n+2]-d[r+2],s=Math.hypot(i,a,o);if(s>k[e]){let t=k[e]/s;d[n]=d[r]+i*t,d[n+1]=d[r+1]+a*t,d[n+2]=d[r+2]+o*t}}}z()}for(let t=0;t<s;t++){let n=l[t];e.pos[t*3]=d[n*3],e.pos[t*3+1]=d[n*3+1],e.pos[t*3+2]=d[n*3+2]}}var Zu=class{avatar;mesh;material;heatMaterial;data;spec;posed;texture=null;lastSimMs=0;under=[];constructor(e,t,n,r){this.avatar=e,this.spec=t,this.data=n;let i=n.vertexCount;this.posed=new Float32Array(i*3);let a=new Tr;a.setAttribute(`position`,new ur(new Float32Array(i*3),3)),a.setAttribute(`normal`,new ur(new Float32Array(i*3),3)),a.setAttribute(`uv`,new ur(n.uv,2)),a.setAttribute(`color`,new ur(Qu(n.strain,t.fabric.stretch),3)),a.setIndex(new ur(n.index,1));let o=t.fabric;this.material=new Ni({roughness:.92-o.sheen*.55,sheen:o.structure===`knit`?.6:.3+o.sheen*.4,sheenRoughness:.6,sheenColor:new Z(16777215),side:2,normalMap:ed(o.structure===`knit`?`knit`:o.weave===`牛仔`?`twill`:`plain`),normalScale:new Y(.35,.35)}),this.material.normalMap.repeat.set(36,36),this.heatMaterial=new Mi({vertexColors:!0,roughness:.8,side:2}),this.mesh=new Yr(a,this.material),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,this.mesh.name=`garment-`+t.type,this.setAtlas(r),e.group.add(this.mesh),this.update()}setAtlas(e){this.texture?.dispose();let t=new pi(e);t.colorSpace=Pe,t.anisotropy=8,this.texture=t,this.material.map=t,this.material.needsUpdate=!0}setHeatmap(e){this.mesh.material=e?this.heatMaterial:this.material}update(e=!1,t=null){let n=this.avatar.body,r=this.data;n.skinRaw(r.rest,r.skinIdx,r.skinW,r.vertexCount,this.posed);let i=Math.max(.003,this.spec.fabric.thickness*1.5);Ju(this.posed,r.vertexCount,this.avatar.posedBodyPositions,this.avatar.posedBodyNormals,n.data.bodyVertexCount,i);for(let e of this.under)Ju(this.posed,r.vertexCount,e.posedPositions,e.posedNormals,e.data.vertexCount,.006,.02);if(e&&r.free.some(e=>e)){let e=performance.now();Xu({pos:this.posed,rest:r.rest,index:r.index,free:r.free,weld:r.weld,body:this.avatar.posedBodyPositions,bodyN:this.avatar.posedBodyNormals,bodyCount:n.data.bodyVertexCount,gap:i+(t?.012:.004),seat:t,drape:this.spec.fabric.drape,under:this.under.map(e=>({pos:e.posedPositions,normals:e.posedNormals,count:e.data.vertexCount})),compress:t?void 0:.85,steps:t?44:20,iterations:t?10:6}),this.lastSimMs=performance.now()-e;for(let e of this.under)Ju(this.posed,r.vertexCount,e.posedPositions,e.posedNormals,e.data.vertexCount,.006,.02)}let a=this.mesh.geometry;a.attributes.position.array.set(this.posed),Sl(this.posed,r.index,r.vertexCount,a.attributes.normal.array),this.posedNormals=a.attributes.normal.array,a.attributes.position.needsUpdate=!0,a.attributes.normal.needsUpdate=!0,a.computeBoundingSphere()}get posedPositions(){return this.posed}posedNormals=new Float32Array;dispose(){this.avatar.group.remove(this.mesh),this.mesh.geometry.dispose(),this.material.dispose(),this.heatMaterial.dispose(),this.texture?.dispose()}};function Qu(e,t){let n=new Float32Array(e.length*3),r=new Z;for(let i=0;i<e.length;i++){let a=e[i];a*(1+t)<.995?r.setRGB(.85,.12,.1):a<1.02?r.setRGB(.95,.55,.12):a<1.18?r.setRGB(.25,.7,.35):r.setRGB(.2+Math.max(0,1.4-a)*.5,.45,.85),n[i*3]=r.r,n[i*3+1]=r.g,n[i*3+2]=r.b}return n}var $u=new Map;function ed(e){let t=$u.get(e);if(t)return t;let n=new Float32Array(4096);for(let t=0;t<64;t++)for(let r=0;r<64;r++){let i;if(e===`knit`){let e=r%8-4,n=t%10-5;i=Math.max(0,1-Math.hypot(e*.9+(n>0?1.2:-1.2),n*.6)/4)}else i=e===`twill`?.5+.5*Math.sin((r+t)/64*Math.PI*16):.5+.25*Math.sin(r/64*Math.PI*16)*Math.sin(t/64*Math.PI*16)+.1*Math.random();n[t*64+r]=i}let r=document.createElement(`canvas`);r.width=r.height=64;let a=r.getContext(`2d`),o=a.createImageData(64,64);for(let e=0;e<64;e++)for(let t=0;t<64;t++){let r=n[e*64+(t+1)%64]-n[e*64+(t+64-1)%64],i=n[(e+1)%64*64+t]-n[(e+64-1)%64*64+t],a=-r*2,s=-i*2,c=Math.hypot(a,s,1),l=(e*64+t)*4;o.data[l]=(a/c*.5+.5)*255,o.data[l+1]=(s/c*.5+.5)*255,o.data[l+2]=(1/c*.5+.5)*255,o.data[l+3]=255}a.putImageData(o,0,0);let s=new pi(r);return s.wrapS=s.wrapT=i,$u.set(e,s),s}var td={cotton:`棉`,polyester:`聚酯纖維`,spandex:`彈性纖維`,nylon:`尼龍`,rayon:`嫘縈`,wool:`羊毛`,linen:`麻`,silk:`絲`,lyocell:`天絲`,modal:`莫代爾`,acrylic:`壓克力纖維`,other:`其他`},nd=[[`spandex`,/彈性纖維|弹性纤维|彈性|弹性|氨綸|氨纶|spandex|elastane|lycra|萊卡|莱卡|\bpu\b|polyurethane/i],[`polyester`,/聚酯纖維|聚酯纤维|聚酯|滌綸|涤纶|polyester|\bpoly\b/i],[`nylon`,/尼龍|尼龙|錦綸|锦纶|nylon|polyamide/i],[`lyocell`,/天絲|天丝|萊賽爾|莱赛尔|lyocell|tencel/i],[`modal`,/莫代爾|莫代尔|modal/i],[`rayon`,/嫘縈|嫘萦|人造絲|人造丝|黏膠|粘胶|粘纤|rayon|viscose/i],[`silk`,/真絲|真丝|蠶絲|蚕丝|桑蠶絲|silk|(?<!人造)絲/i],[`wool`,/羊毛|毛料|wool|cashmere|羊絨|羊绒|mohair/i],[`linen`,/亞麻|亚麻|苧麻|苎麻|麻|linen|ramie/i],[`acrylic`,/壓克力|亚克力|腈綸|腈纶|acrylic/i],[`cotton`,/純棉|纯棉|棉|cotton/i]],rd=[[`羅紋`,/羅紋|罗纹|坑條|坑条|\brib/i,`knit`],[`針織`,/針織|针织|knit|jersey|汗布|毛衣|sweater|衛衣|卫衣|毛圈|terry|雙面布|双面布/i,`knit`],[`牛仔`,/牛仔|丹寧|丹宁|denim/i,`woven`],[`雪紡`,/雪紡|雪纺|chiffon/i,`woven`],[`緞面`,/緞|缎|satin/i,`woven`],[`西裝料`,/西裝|西装|suiting|毛呢|呢料|tweed/i,`woven`],[`梭織`,/梭織|梭织|woven|府綢|府绸|poplin|牛津|oxford|襯衫布/i,`woven`]];function id(e){let t=[],n=/(\d{1,3}(?:\.\d+)?)\s*%\s*([^\d%,，、;；\s/]+)?|([^\d%,，、;；\s/:：]+)\s*[:：]?\s*(\d{1,3}(?:\.\d+)?)\s*%/g,r;for(;r=n.exec(e);){let n=parseFloat(r[1]??r[4]),i=ad((r[2]??r[3]??``).trim())??(r[1]?ad(e.slice(Math.max(0,r.index-8),r.index)):null);if(i){let e=t.find(e=>e.fiber===i);e?e.pct+=n:t.push({fiber:i,pct:n})}}if(!t.length){for(let[n,r]of nd)r.test(e)&&!t.some(e=>e.fiber===n)&&t.push({fiber:n,pct:0});if(t.length){let e=100/t.length;t.forEach(t=>t.pct=e)}}let i=`unknown`,a=null;for(let[t,n,r]of rd)if(n.test(e)){a=t,i=r;break}let o=e=>t.filter(t=>t.fiber===e).reduce((e,t)=>e+t.pct,0),s=o(`spandex`);i===`unknown`&&s>=8&&(i=`knit`);let c=i===`knit`?a===`羅紋`?.25:.12:.02;i===`unknown`&&(c=.04),c+=s*(i===`knit`?.03:.015),a===`牛仔`&&s===0&&(c=.01),c=Math.min(.5,Math.round(c*1e3)/1e3);let l=e=>o(e)/100,u=.5+.35*(l(`silk`)+l(`rayon`)+l(`modal`)+l(`lyocell`))-.2*l(`linen`)+.05*l(`polyester`)-.1*l(`cotton`),d=i===`knit`?.0012:8e-4,f=.1+.6*l(`silk`)+.25*l(`polyester`)+.2*l(`nylon`)+.15*l(`rayon`);a===`牛仔`&&(u=.12,d=.0022,f=.02),a===`雪紡`&&(u=.92,d=4e-4),a===`緞面`&&(f=Math.max(f,.75),u=Math.max(u,.75)),a===`西裝料`&&(u=.35,d=.0018),a===`羅紋`&&(d=.0015),l(`wool`)>.5&&i===`knit`&&(d=.003),u=Math.max(.05,Math.min(.97,u)),f=Math.max(0,Math.min(1,f));let p=[t.map(e=>`${td[e.fiber]}${e.pct?Math.round(e.pct)+`%`:``}`).join(` `),a??(i===`knit`?`針織`:i===`woven`?`梭織`:``)].filter(Boolean).join(`・`)||`未指定材質`;return{composition:t,structure:i,weave:a,stretch:c,drape:u,thickness:d,sheen:f,label:p}}function ad(e){for(let[t,n]of nd)if(n.test(e))return t;return null}function od(e){return e.stretch>=.25?`高彈性`:e.stretch>=.1?`中彈性`:e.stretch>=.04?`微彈性`:`無彈性`}var sd=id(`棉100%`),cd={top:`上衣`,dress:`洋裝`,skirt:`裙子`,pants:`長褲`},ld={none:`無袖`,short:`短袖`,elbow:`五分袖`,long:`長袖`},ud={crew:`圓領`,v:`V 領`,scoop:`U 領`,boat:`一字領`},dd={fitted:`合身`,straight:`直筒`,aline:`A 字`,oversized:`寬鬆`},fd={high:`高腰`,natural:`中腰`,low:`低腰`};function pd(e,t){return e===`pants`?t===`high`?.01:t===`low`?-.075:-.035:t===`high`?.03:t===`low`?-.06:0}function md(e,t=`#e9d6c8`){let n={...sd,structure:`knit`,stretch:.3,drape:.6,thickness:.0012,sheen:.35,label:`彈性針織`},r=e.height/160;return[{type:`top`,sleeve:`none`,neckline:`boat`,silhouette:`fitted`,rise:`natural`,fabric:n,color:t,m:{chest:e.bust-1,waist:e.underbust-2},cut:{topY:e.bustY+5.5*r,bottomY:e.bustY-9.5*r}},{type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`fitted`,rise:`low`,fabric:n,color:t,m:{waist:e.waist+4,hip:e.hips-2,thigh:e.thigh-3,legOpening:e.thigh-3},cut:{bottomY:e.crotchY-2.5*r}}]}function hd(e,t){let n={type:e,sleeve:`short`,neckline:`crew`,silhouette:`straight`,rise:`natural`,fabric:sd,m:{}},r=t.height/160;switch(e){case`top`:n.m={shoulder:t.shoulder+1,chest:t.bust+8,waist:t.waist+14,hem:t.hips+6,length:t.neckY&&t.hipY?Math.round(t.neckY-t.hipY-4*r):56*r,sleeveLength:16*r};break;case`dress`:n.silhouette=`aline`,n.m={shoulder:t.shoulder,chest:t.bust+6,waist:t.waist+5,hip:t.hips+12,hem:t.hips+60,length:100*r,sleeveLength:16*r};break;case`skirt`:n.silhouette=`aline`,n.sleeve=`none`,n.m={waist:t.waist+2,hip:t.hips+8,hem:t.hips+40,length:58*r};break;case`pants`:n.sleeve=`none`,n.m={waist:t.waist+2,hip:t.hips+6,thigh:t.thigh+8,legOpening:38,length:98*r,inseam:t.inseam,rise:26*r}}return n}function gd(e,t,n){let r=hd(e,n);return r.silhouette=t.silhouette,r.sleeve=e===`skirt`||e===`pants`?`none`:t.sleeve,r.neckline=t.neckline,r.rise=t.rise,t.color&&(r.color=t.color),t.pleated&&(e===`skirt`||e===`dress`)&&(r.pleated=!0),r.silhouette===`oversized`&&r.m.chest&&(r.m.chest+=16,r.m.shoulder=(r.m.shoulder??n.shoulder)+6),r.silhouette===`fitted`&&r.m.chest&&(r.m.chest=n.bust+4,r.m.waist=n.waist+5),r.silhouette===`aline`&&r.m.hem&&(r.m.hem=Math.max(r.m.hem,(r.m.hip??n.hips)*1.45)),r.silhouette===`straight`&&(e===`skirt`||e===`dress`)&&(r.m.hem=(r.m.hip??n.hips+8)*1.02),r.silhouette===`fitted`&&e===`skirt`&&(r.m.hip=n.hips+4,r.m.hem=n.hips-2),r.sleeve===`long`&&(r.m.sleeveLength=n.armLength),r.sleeve===`elbow`&&(r.m.sleeveLength=n.armLength*.55),r}function _d(e,t,n){let r=structuredClone(e),i=n.waistY+pd(t.type,t.rise)*100;r.m.length=Math.max(25,Math.round(n.neckY-(i-5)));let a=(t.m.waist??n.waist+2)+2;return r.m.waist=Math.min(r.m.waist??r.m.chest??a,a),r.m.hem=r.m.waist,delete r.m.hip,r}function vd(e,t){if(e.type!==`skirt`&&e.type!==`dress`)return e;let n=structuredClone(e),r=(e,t,n)=>e<=t?e:t+n*Math.tanh((e-t)/n);n.m.hip&&(n.m.hip=r(n.m.hip,t.hips,t.hips*.12+4));let i=t.hips*(n.silhouette===`aline`?.75:.35)*(n.pleated?.8:1);return n.m.hem&&(n.m.hem=r(n.m.hem,Math.max(t.hips,n.m.hip??0),i)),n}var yd=Math.PI*2,bd=/arm|wrist|finger|metacarpal|shoulder01/,xd=/head|neck|jaw|eye|oculi|orbicularis|oris|levator|risorius|temporalis|tongue|special0[3-6]/;function Sd(e,t,n){let r=new Map;return e.i.forEach((t,i)=>e.w[i]&&r.set(t,(r.get(t)??0)+e.w[i]*(1-n))),t.i.forEach((e,i)=>t.w[i]&&r.set(e,(r.get(e)??0)+t.w[i]*n)),Cd(r)}function Cd(e){let t=[...e.entries()].filter(([,e])=>e>1e-5).sort((e,t)=>t[1]-e[1]).slice(0,4),n=t.reduce((e,[,t])=>e+t,0)||1,r=t.map(([e])=>e),i=t.map(([,e])=>e/n);for(;r.length<4;)r.push(0),i.push(0);return{i:r,w:i}}function wd(e,t){let n=e.pos.length/3,r=new Float64Array(n);for(let e=0;e<n;e++)r[e]=t(e);let i={pos:[],nor:[],skin:[],tris:[]},a=new Int32Array(n).fill(-1),o=new Map,s=t=>(a[t]<0&&(a[t]=i.skin.length,i.pos.push(e.pos[t*3],e.pos[t*3+1],e.pos[t*3+2]),i.nor.push(e.nor[t*3],e.nor[t*3+1],e.nor[t*3+2]),i.skin.push(e.skin[t])),a[t]),c=(t,n)=>{let a=t<n?t*4194304+n:n*4194304+t,s=o.get(a);if(s!==void 0)return s;let c=r[t]/(r[t]-r[n]),l=i.skin.length;for(let r=0;r<3;r++)i.pos.push(e.pos[t*3+r]+(e.pos[n*3+r]-e.pos[t*3+r])*c);let u=[0,1,2].map(r=>e.nor[t*3+r]+(e.nor[n*3+r]-e.nor[t*3+r])*c),d=Math.hypot(u[0],u[1],u[2])||1;return i.nor.push(u[0]/d,u[1]/d,u[2]/d),i.skin.push(Sd(e.skin[t],e.skin[n],c)),o.set(a,l),l};for(let t=0;t<e.tris.length;t+=3){let n=[e.tris[t],e.tris[t+1],e.tris[t+2]],a=n.map(e=>r[e]>=0),o=a.filter(Boolean).length;if(o===0)continue;if(o===3){i.tris.push(s(n[0]),s(n[1]),s(n[2]));continue}let l=0;for(let e=0;e<3;e++)(o===1&&a[e]||o===2&&!a[e])&&(l=e);let u=n[l],d=n[(l+1)%3],f=n[(l+2)%3];if(o===1)i.tris.push(s(u),c(u,d),c(u,f));else{let e=c(u,d),t=c(u,f),n=s(d),r=s(f);i.tris.push(e,n,r,e,r,t)}}return i}function Td(e,t,n,r,i){let a=e.length/2,o=0;for(let s=0;s<a;s++){let c=(s+1)%a,l=e[s*2]-t,u=e[s*2+1]-n,d=e[c*2]-e[s*2],f=e[c*2+1]-e[s*2+1],p=r*f-i*d;if(Math.abs(p)<1e-12)continue;let m=(l*f-u*d)/p,h=(l*i-u*r)/p;m>0&&h>=-1e-6&&h<=1+1e-6&&(o=Math.max(o,m))}return o}var Ed=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Dd=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],Od=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],kd=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]];function Ad(e){let t=new Map,n=(e,t)=>e<t?e*4194304+t:t*4194304+e;for(let r=0;r<e.length;r+=3)for(let i=0;i<3;i++){let a=n(e[r+i],e[r+(i+1)%3]);t.set(a,(t.get(a)??0)+1)}let r=new Map;for(let i=0;i<e.length;i+=3)for(let a=0;a<3;a++){let o=e[i+a],s=e[i+(a+1)%3];t.get(n(o,s))===1&&r.set(o,s)}let i=[],a=new Set;for(let e of r.keys()){if(a.has(e))continue;let t=[],n=e;for(;n!==void 0&&!a.has(n);)a.add(n),t.push(n),n=r.get(n);t.length>=3&&i.push(t)}return i}function jd(e,t){let{body:n,measurer:r,m:i}=t,a=n.data,o=n.rest,s=a.bodyVertexCount,c=1/0;for(let e=0;e<s;e++)c=Math.min(c,o[e*3+1]);let l=e=>c+e/100,u=Math.max(.0025,e.fabric.thickness*1.5)+(t.layer??0)*.005,d=e.fabric.drape,f=t=>e.m[t]===void 0?void 0:e.m[t]/100,p=performance.now(),m=e=>{let n=performance.now();t.timings&&(t.timings[e]=(t.timings[e]??0)+n-p),p=n},h=l(i.bustY),g=l(i.waistY),_=l(i.hipY),v=l(i.crotchY),y=l(i.neckY),b=g+pd(e.type,e.rise),x=e.type===`skirt`||e.type===`pants`,S=f(`length`)??(e.type===`top`?.6:e.type===`dress`?1:e.type===`skirt`?.55:.95),C=e.cut?.bottomY===void 0?Math.max(c+.015,(x?b:y-.01)-S):l(e.cut.bottomY),w=e.type===`skirt`||e.type===`dress`||e.type===`top`&&C<_+.03,T=_,E=w?Math.max(T-.03,v+.04):C;m(`before-body`);let D=i.bust/100,O=i.waist/100,k=i.hips/100,A=f(`chest`)??D+.1,j=f(`waist`)??(e.silhouette===`fitted`?O+(A-D):Math.max(A,O+.1)),M=f(`hip`)??Math.max(k+.06,e.type===`top`?j:k+.08),N=f(`hem`)??(e.silhouette===`aline`?M*1.45:e.silhouette===`fitted`?M*.98:M*1.05),P=x?[[b+.05,j],[b,j],[_,M],[C,N]]:[[h,A],[g,j],[_,w?M:Math.max(M,N)],[C,N]];P.sort((e,t)=>t[0]-e[0]);let F=e=>{if(e>=P[0][0])return P[0][1];for(let t=0;t<P.length-1;t++){let[n,r]=P[t],[i,a]=P[t+1];if(e<=n&&e>=i)return r+(a-r)*(n-e)/Math.max(1e-6,n-i)}return P[P.length-1][1]},I=null,L=()=>{if(I)return I;if(x)return I=P.map(([e,t])=>[e,t-R(e)]);let t=l(i.shoulderY),n=A-R(h),r=[[y+.03,Math.max(yd*u,n*.15)],[t-.015,Math.max(yd*u,n*.45)],[h+.06,n],[h,n],[g,j-R(g)],[_,M-R(_)]];return e.m.hem!==void 0&&!w&&C<_&&r.push([C,N-R(C)]),I=r.filter(([e])=>e>=C-.001).sort((e,t)=>t[0]-e[0])};function R(e){let t=e<(x?b:g)-.02?r.torsoLegs:te;return ie(Math.max(e,c+.02),t).P}let ee=t=>{if(w&&t<T||e.type===`pants`&&t<v+.02)return F(t);let n=L(),r=n[n.length-1][1];if(t>=n[0][0])r=n[0][1];else for(let e=0;e<n.length-1;e++){let[i,a]=n[e],[o,s]=n[e+1];if(t<=i&&t>=o){r=a+(s-a)*(i-t)/Math.max(1e-6,i-o);break}}return R(t)+r};m(`before-rings`);let te=e.type===`pants`||x?r.torsoLegs:r.torso,z=new Map,ne=new Map,re=e=>{let t=ne.get(e);if(t)return t;let n=new Map;for(let t=0;t<e.length;t+=3){let r=o[e[t]*3+1],i=o[e[t+1]*3+1],a=o[e[t+2]*3+1],s=Math.floor(Math.min(r,i,a)*100),c=Math.floor(Math.max(r,i,a)*100);for(let r=s;r<=c;r++){let i=n.get(r);i?i.push(e[t],e[t+1],e[t+2]):n.set(r,[e[t],e[t+1],e[t+2]])}}return t=new Map([...n].map(([e,t])=>[e,Uint32Array.from(t)])),ne.set(e,t),t},B=new Uint32Array,ie=(e,t=te)=>{let n=Math.round(e*400)+(t===te?0:1e6),r=z.get(n);if(r)return r;let i=Al(kl(o,re(t).get(Math.floor(e*100))??B,[0,e,0],[0,1,0],[1,0,0],[0,0,1])),a=0,s=0;for(let e=0;e<i.length;e+=2)a+=i[e],s+=i[e+1];a/=Math.max(1,i.length/2),s/=Math.max(1,i.length/2);let c={y:e,hull:i,cx:a,cz:s,P:i.length>=6?jl(i):0};return z.set(n,c),c};m(`before-working`);let ae=a.bones.map(e=>e.name),oe=ae.map(e=>bd.test(e)),se=ae.map(e=>xd.test(e)),ce=ae.map(e=>/leg|foot|toe/.test(e)),le=(e,t)=>e.i.reduce((n,r,i)=>n+(t[r]?e.w[i]:0),0),ue=[],de=a.body.index,fe=a.body.src;for(let e=0;e<de.length;e+=3)ue.push(fe[de[e]],fe[de[e+1]],fe[de[e+2]]);let pe=Sl(o.subarray(0,s*3),Uint32Array.from(ue),s),me=new Map,he=.035,ge=(e,t,n)=>((e+256)*512+(t+256))*512+(n+256);for(let e=0;e<s;e++){let t=r.regions[e];if(t!==0&&t!==1)continue;let n=ge(Math.floor(o[e*3]/he),Math.floor(o[e*3+1]/he),Math.floor(o[e*3+2]/he)),i=me.get(n);i?i.push(e):me.set(n,[e])}let _e=(e,t,n,r,i)=>{let s=Math.floor(e/he),c=Math.floor(t/he),l=Math.floor(n/he),u=[];for(let r=1;r<=4&&u.length<6;r++){u.length=0;for(let i=-r;i<=r;i++)for(let a=-r;a<=r;a++)for(let d=-r;d<=r;d++)for(let r of me.get(ge(s+i,c+a,l+d))??[]){let i=(o[r*3]-e)**2+(o[r*3+1]-t)**2+(o[r*3+2]-n)**2;(u.length<6||i<u[u.length-1][0])&&(u.push([i,r]),u.sort((e,t)=>e[0]-t[0]),u.length>6&&u.pop())}}let d=new Map;for(let[e,t]of u){let n=1/(Math.sqrt(e)+.01);for(let e=0;e<4;e++){let r=a.body.skinW[t*4+e];r&&d.set(a.body.skinIdx[t*4+e],(d.get(a.body.skinIdx[t*4+e])??0)+r*n)}}let f=[...d.values()].reduce((e,t)=>e+t,0)||1,p=new Map;for(let[e,t]of d)p.set(e,t/f*i);return r.i.forEach((e,t)=>r.w[t]&&p.set(e,(p.get(e)??0)+r.w[t]*(1-i))),Cd(p)},V={pos:[],nor:[],skin:[],tris:[]};{let e=new Int32Array(s).fill(-1),t=r.regions,n=new Set(x?[0,2]:[0,1,2]);for(let r=0;r<ue.length;r+=3){let i=[ue[r],ue[r+1],ue[r+2]];if(i.every(e=>n.has(t[e])||t[e]===3&&!x))for(let t of i){if(e[t]<0){e[t]=V.skin.length,V.pos.push(o[t*3],o[t*3+1],o[t*3+2]),V.nor.push(pe[t*3],pe[t*3+1],pe[t*3+2]);let n={i:[],w:[]};for(let e=0;e<4;e++)n.i.push(a.body.skinIdx[t*4+e]),n.w.push(a.body.skinW[t*4+e]);V.skin.push(n)}V.tris.push(e[t])}}}let ve=(e,t)=>[e.pos[t*3],e.pos[t*3+1],e.pos[t*3+2]],ye=[n.joint(`upperarm01.L____head`),n.joint(`upperarm01.R____head`)],be=[n.joint(`lowerarm01.L____head`),n.joint(`lowerarm01.R____head`)],xe=[n.joint(`wrist.L____head`),n.joint(`wrist.R____head`)],Se=e=>{let t=e[0]>=0?0:1,n=ye[t],r=be[t],i=xe[t],a=r.x-n.x,o=r.y-n.y,s=r.z-n.z,c=Math.hypot(a,o,s),l=((e[0]-n.x)*a+(e[1]-n.y)*o+(e[2]-n.z)*s)/c;if(l<=c)return l;let u=i.x-r.x,d=i.y-r.y,f=i.z-r.z,p=Math.hypot(u,d,f);return c+((e[0]-r.x)*u+(e[1]-r.y)*d+(e[2]-r.z)*f)/p},Ce=Math.max(0,((f(`shoulder`)??i.shoulder/100)-i.shoulder/100)/2),we=e.sleeve===`none`?-.035+Ce:Ce+(f(`sleeveLength`)??{short:.16,elbow:.3,long:.58}[e.sleeve]),Te=null;if(m(`before-clipping`),!x){let t=n.joint(`neck01____head`),r=i.height/160,a=i.neck/100/yd,o={crew:{hw:a+.028,df:.035,db:.006,v:!1},v:{hw:a+.03,df:.13,db:.01,v:!0},scoop:{hw:a+.05,df:.1,db:.025,v:!1},boat:{hw:a+.095,df:.03,db:.03,v:!1}}[e.neckline];Te={nb:[t.x,t.y,t.z],hw:o.hw},V=wd(V,e=>{if(le(V.skin[e],se)>.55)return-1;let n=ve(V,e),i=Math.abs(n[0]-t.x),a=i/o.hw,s=a>=1?0:o.v?1-a:Math.sqrt(1-a*a),c=Math.min(1,Math.max(0,(n[2]-t.z+.03)/.06)),l=(o.df*c+o.db*(1-c))*s*r;return t.y-l+Math.max(0,i-o.hw)*3-n[1]});let s=e.sleeve===`none`?Ce-.025:Ce;V=wd(V,e=>{let t=le(V.skin[e],oe);return Math.max(.5-t,s-Se(ve(V,e)))})}if(e.cut?.topY!==void 0){let t=l(e.cut.topY);V=wd(V,e=>t-V.pos[e*3+1])}if(V=wd(V,e=>V.pos[e*3+1]-E),x&&(V=wd(V,e=>b-V.pos[e*3+1])),e.type===`pants`){let t=e.cut?.bottomY!==void 0;V=wd(V,e=>V.pos[e*3+1]-C-(t?Math.max(0,Math.abs(V.pos[e*3])-.035)*.9:0))}e.type===`skirt`&&(V=wd(V,e=>le(V.skin[e],ce)>.6?V.pos[e*3+1]-v:1)),m(`before-armhole`);let Ee=[];if(!x&&e.sleeve!==`none`&&e.cut?.topY===void 0)for(let e of Ad(V.tris)){let t=0,n=0;for(let r of e)t+=V.pos[r*3],n+=V.pos[r*3+1];t/=e.length,n/=e.length;let r=t>=0?1:-1,i=ye[r>0?0:1];if(Math.abs(t)>Math.abs(i.x)*.55&&n<i.y+.08&&n>i.y-.25&&e.length>=8){let t=Ee.find(e=>e.side===r);(!t||e.length>t.loop.length)&&(t&&Ee.splice(Ee.indexOf(t),1),Ee.push({side:r,loop:e}))}}m(`before-push`);let H=V.skin.length,De=Array(H).fill(1),Oe=e.silhouette===`fitted`?3:.02+d*.1,ke=e.silhouette!==`fitted`&&(x?e.type===`skirt`:A>D+.06),U=ie(x?_:h),Ae=U.cx,W=U.cz,G=.005,je=x?b+.01:y+.04,Me=w?C-.01:E-.01,Ne=Math.max(1,Math.ceil((je-Me)/G)),Pe=[],Fe=[];for(let e=0;e<=Ne;e++){let t=je-e*G,n=t<(x?b:g)-.02?ie(Math.max(t,c+.02),r.torsoLegs):ie(t);Fe.push(n);let i=new Float64Array(72),a=n.P,o=(Math.max(ee(t),a+yd*u)-a)/yd;for(let e=0;e<72;e++){let t=e/72*yd,r=n.hull.length>=6?Td(n.hull,Ae,W,Math.sin(t),Math.cos(t)):0;i[e]=r+o}let s=i.slice();for(let e=0;e<72;e++){let t=0;for(let n=-4;n<=4;n++)t+=s[(e+n+72)%72];i[e]=Math.max(t/9,s[e]-.008)}if(e>0&&(ke&&(x||t<h)||w&&t<T))for(let t=0;t<72;t++)i[t]=Math.max(i[t],Pe[e-1][t]-Oe*G);Pe.push(i)}let Ie=(e,t)=>{let n=(je-e)/G,r=Math.max(0,Math.min(Ne,Math.round(n))),i=(t/yd*72+72)%72,a=Math.floor(i)%72,o=(a+1)%72,s=i-Math.floor(i);return{r:Pe[r][a]*(1-s)+Pe[r][o]*s,ring:Fe[r]}},Le=f(`legOpening`)??.4,Re=f(`thigh`)??i.thigh/100+.08,ze=new Map,Be=e=>{let t=Math.round(e*200);if(!ze.has(t)){let n=kl(o,re(r.legL).get(Math.floor(e*100))??B,[0,e,0],[0,1,0],[1,0,0],[0,0,1]);ze.set(t,n.length>=6?jl(Al(n)):.3)}return ze.get(t)};for(let t=0;t<H;t++){let n=ve(V,t),r=[V.nor[t*3],V.nor[t*3+1],V.nor[t*3+2]],i=V.skin[t],a=le(i,oe),o=le(i,ce),s=n[0]+r[0]*u,c=n[1]+r[1]*u*.6,l=n[2]+r[2]*u;if(!x&&a>=.5)De[t]=1.05;else if(e.type===`pants`&&n[1]<v+.06){let e=Be(Math.min(n[1],v-.01)),i=Math.min(1,Math.max(0,(v-n[1])/Math.max(.1,v-C))),a=Re+(Le-Re)*i,c=Math.min(1,Math.max(0,(v+.02-n[1])/.06))*Math.min(1,o*1.5),u=Math.max(0,(a-e)/yd)*c;s+=r[0]*u,l+=r[2]*u,De[t]=a/e}else if(n[1]<=je+.001&&n[1]>=Me-.02){let e=s-Ae,r=l-W,i=Math.hypot(e,r)||1e-6,a=Math.atan2(e,r),{r:o,ring:c}=Ie(n[1],a),u=Math.max(i,o);s=Ae+e/i*u,l=W+r/i*u,De[t]=c.P>0?ee(n[1])/c.P:1}V.pos[t*3]=s,V.pos[t*3+1]=c,V.pos[t*3+2]=l}m(`before-cone`);let Ve=1/0,He=-1;if(w){let t=E,n=Math.max(2,Math.ceil((t-C)/.015)),i=V.skin.length;He=i,Ve=i+216;let c=[];for(let e=0;e<=n;e++)c.push(t-(t-C)*e/n);let l=.04,u=new Map,f=(e,t,n)=>((e+256)*512+(t+256))*512+(n+256);for(let e=0;e<s;e++){let n=r.regions[e];if(!((n===0||n===2)&&o[e*3+1]<t+.08&&o[e*3+1]>C-.05))continue;let i=f(Math.floor(o[e*3]/l),Math.floor(o[e*3+1]/l),Math.floor(o[e*3+2]/l)),a=u.get(i);a?a.push(e):u.set(i,[e])}let p=(e,t,n)=>{let r=Math.floor(e/l),i=Math.floor(t/l),a=Math.floor(n/l),s=[];for(let c=1;c<=8;c++){s.length=0;for(let l=-c;l<=c;l++)for(let d=-c;d<=c;d++)for(let p=-c;p<=c;p++){let c=u.get(f(r+l,i+d,a+p));if(c)for(let r of c){let i=o[r*3]-e,a=o[r*3+1]-t,c=o[r*3+2]-n,l=i*i+a*a*4+c*c;(s.length<6||l<s[s.length-1][0])&&(s.push([l,r]),s.sort((e,t)=>e[0]-t[0]),s.length>6&&s.pop())}}if(s.length===6&&Math.sqrt(s[5][0])<=c*l)break}return s};for(let r=0;r<=n;r++){let i=c[r],o=(t-i)/Math.max(1e-6,t-C),{ring:s}=Ie(i,0),l=Math.max(0,ee(i)/Math.max(.2,s.P)-1),u=e.pleated?Math.min(.035,.012+l*.03)*Math.min(1,Math.max(0,(t-i-.06)/.1)):Math.min(.07,l*.1*(.4+d))*Math.min(1,(t-i)/.12);for(let t=0;t<72;t++){let c=t/72*yd,l=Ie(i,c).r*(1+u*(e.pleated?2/Math.PI*Math.asin(Math.sin(c*18)):Math.sin(c*9+.7+o*.8)*(.6+.4*Math.sin(c*4)))),d=Ae+Math.sin(c)*l,f=W+Math.cos(c)*l;if(V.pos.push(d,i,f),V.nor.push(Math.sin(c),0,Math.cos(c)),r%3==0||r===n){let e=p(d,i,f),t=new Map;for(let[n,r]of e){let e=1/(Math.sqrt(n)+.01);for(let n=0;n<4;n++){let i=a.body.skinW[r*4+n];i&&t.set(a.body.skinIdx[r*4+n],(t.get(a.body.skinIdx[r*4+n])??0)+i*e)}}V.skin.push(Cd(t))}else V.skin.push({i:[0,0,0,0],w:[0,0,0,0]});De.push(ee(i)/Math.max(.2,s.P))}}for(let e=1;e<n;e++){if(e%3==0)continue;let t=e-e%3,r=Math.min(n,t+3),a=(e-t)/Math.max(1,r-t);for(let n=0;n<72;n++)V.skin[i+e*72+n]=Sd(V.skin[i+t*72+n],V.skin[i+r*72+n],a)}for(let e=0;e<n;e++)for(let t=0;t<72;t++){let n=i+e*72+t,r=i+e*72+(t+1)%72,a=n+72,o=r+72;V.tris.push(n,a,r,r,a,o)}}m(`before-fabric`);{let n=new Map;for(let e=0;e<V.tris.length;e+=3)for(let t=0;t<3;t++){let r=V.tris[e+t],i=V.tris[e+(t+1)%3],a=r<i?r*4194304+i:i*4194304+r;n.set(a,(n.get(a)??0)+1)}let r=new Uint8Array(V.skin.length);for(let[e,t]of n)t===1&&(r[Math.floor(e/4194304)]=1,r[e%4194304]=1);let i=e.silhouette===`fitted`?8:20;Yu(V.pos,V.tris,i,.55,-.58,e=>r[e]===1),Ju(V.pos,V.skin.length,o,pe,s,u);for(let e of t.under??[])Ju(V.pos,V.skin.length,e.pos,e.normals,e.count,.006,.02)}let Ue=V.tris.length;m(`before-which`);let We=new Uint8Array(V.skin.length);{let t=l(i.shoulderY);for(let n=0;n<V.skin.length;n++){let r=V.pos[n*3+1];!x&&r>t-.035&&(We[n]=1),x&&r>b-.025&&(We[n]=1),e.cut&&(We[n]=1)}for(let{loop:e}of Ee)for(let t of e)We[t]=1}let Ge=[];m(`before-sleeves`);let Ke=Ee.length?[Ol(a,r.regions,[1],1),Ol(a,r.regions,[1],-1)]:[];for(let{side:t,loop:n}of Ee){let r=t>0?0:1,a=ye[r],s=be[r],c=xe[r],l=a.distanceTo(s),d=s.distanceTo(c),p=e=>{if(e<=l){let t=[(s.x-a.x)/l,(s.y-a.y)/l,(s.z-a.z)/l];return{c:[a.x+t[0]*e,a.y+t[1]*e,a.z+t[2]*e],d:t}}let t=[(c.x-s.x)/d,(c.y-s.y)/d,(c.z-s.z)/d],n=e-l;return{c:[s.x+t[0]*n,s.y+t[1]*n,s.z+t[2]*n],d:t}},m=p(0).d,h=[0,1,0],g=Ed(h,Od(m,Dd(h,m)));g=Od(g,1/Math.hypot(g[0],g[1],g[2]));let _=kd(m,g),v=n.map(e=>[V.pos[e*3],V.pos[e*3+1],V.pos[e*3+2]]),y=v.map(e=>{let t=Ed(e,[a.x,a.y,a.z]);return Math.atan2(Dd(t,_),Dd(t,g))}),b=[],x=[];for(let e=0;e<40;e++){let t=-Math.PI+e/40*yd,r=0,i=1/0,a=0;for(let e=0;e<v.length;e++){let n=(e+1)%v.length,o=y[e],s=y[n];Math.abs(s-o)>Math.PI&&(s<o?s+=yd:o+=yd);let c=t;for(;c<Math.min(o,s)-1e-9;)c+=yd;for(;c>Math.max(o,s)+1e-9;)c-=yd;let l=s-o,u=Math.abs(l)<1e-9?0:(c-o)/l,d=u<0?-u:u>1?u-1:0;d<i&&(i=d,r=e,a=Math.min(1,Math.max(0,u)))}let o=(r+1)%v.length;b.push([0,1,2].map(e=>v[r][e]+(v[o][e]-v[r][e])*a)),x.push(Sd(V.skin[n[r]],V.skin[n[o]],a))}let S=i.upperArm/100,C=Math.max(f(`upperArm`)??S+(e.silhouette===`fitted`?.05:.1),S+yd*u*2),w=.155*(i.height/160),T=f(`sleeveOpening`)??(e.sleeve===`long`?w+.035:e.sleeve===`elbow`?C*.92:C*1.02),E=Math.min(Math.max(.05,we),l+d+.01),D=e=>e<=l?S*(1-e/l*.12):S*.88+(w-S*.88)*Math.min(1,(e-l)/d),O=Math.max(6,Math.ceil(E/.015)),k=V.skin.length,A=[0,-1,0];for(let e=0;e<=O;e++){let t=e/O,n=E*t,{c:i,d:a}=p(n),s=Ed(h,Od(a,Dd(h,a)));s=Od(s,1/Math.hypot(s[0],s[1],s[2]));let c=kd(a,s),f=n>l+d-.015?[]:kl(o,Ke[r],i,a,s,c),m=f.length>=6?Al(f):[],g=m.length>=6?jl(m):D(n),_=Math.max(C+(T-C)*t,g+yd*u*1.5),v=Math.max(u*1.2,(_-g)/yd),y=Ed(A,Od(a,Dd(A,a))),S=Math.hypot(y[0],y[1],y[2])||1;y=Od(y,Math.max(0,v-u)*.8/S);let w=t<=0?0:Math.min(1,t/.35)**2*(3-2*Math.min(1,t/.35));for(let t=0;t<40;t++){let r=-Math.PI+t/40*yd,a=(m.length>=6?Td(m,0,0,Math.cos(r),Math.sin(r)):D(n)/yd)+v,o=[0,1,2].map(e=>i[e]+y[e]+a*(Math.cos(r)*s[e]+Math.sin(r)*c[e])),l=[0,1,2].map(e=>b[t][e]+(o[e]-b[t][e])*w);V.pos.push(l[0],l[1],l[2]);let u=Ed(l,i),d=Math.hypot(u[0],u[1],u[2])||1;V.nor.push(u[0]/d,u[1]/d,u[2]/d),V.skin.push(e===0?x[t]:_e(l[0],l[1],l[2],x[t],w)),De.push(_/g)}}for(let e=0;e<O;e++)for(let t=0;t<40;t++){let n=k+e*40+t,r=k+e*40+(t+1)%40;V.tris.push(n,r,n+40,r,r+40,n+40)}for(let e=k;e<k+80;e++)Ge.push(e);if(e.sleeve===`long`)for(let e=k+(O-1)*40;e<k+(O+1)*40;e++)Ge.push(e)}if(m(`before-rib`),Te&&e.cut?.topY===void 0){let e=Te.nb,t=Ad(V.tris.slice(0,Ue)),n=null,r=1/0;for(let i of t){let t=0,a=0;for(let e of i)t+=V.pos[e*3],a+=V.pos[e*3+1];t/=i.length,a/=i.length;let o=Math.abs(t-e[0])+Math.abs(a-e[1]);Math.abs(t-e[0])<.04&&a>e[1]-.2&&o<r&&(r=o,n=i)}if(n){let t=.015*(i.height/160),r=V.skin.length,a=n.length,o=n.map(e=>[V.pos[e*3],V.pos[e*3+1],V.pos[e*3+2]]);for(let e=0;e<6;e++)o=o.map((e,t)=>{let n=o[(t+a-1)%a],r=o[(t+1)%a];return[0,1,2].map(t=>(n[t]+2*e[t]+r[t])/4)});let s=new Map;for(let e=0;e<Ue;e+=3)for(let t=0;t<3;t++){let n=V.tris[e+t];s.has(n)||s.set(n,new Set),s.get(n).add(V.tris[e+(t+1)%3]).add(V.tris[e+(t+2)%3])}let c=new Set(n);for(let r=0;r<a;r++){let i=n[r],a=o[r],l=0,u=0,d=0;for(let e of s.get(i)??[])c.has(e)||(l+=V.pos[i*3]-V.pos[e*3],u+=V.pos[i*3+1]-V.pos[e*3+1],d+=V.pos[i*3+2]-V.pos[e*3+2]);let f=Math.hypot(l,u,d)||1,p=[e[0]-a[0],0,e[2]-a[2]],m=Math.hypot(p[0],p[2])||1,h=l/f*.55+p[0]/m*.45,g=u/f*.55+.2,_=d/f*.55+p[2]/m*.45,v=Math.hypot(h,g,_)||1;h/=v,g/=v,_/=v;let y=[a[0]+h*t,a[1]+g*t,a[2]+_*t];V.pos.push(y[0],y[1],y[2]),V.nor.push(-p[0]/m,0,-p[2]/m),V.skin.push(V.skin[i]),De.push(1.05)}for(let e=0;e<a;e++){let t=n[e],i=n[(e+1)%a],o=r+e,s=r+(e+1)%a;V.tris.push(t,i,s,t,s,o),Ge.push(o,t)}}}(Ee.length||Te)&&Ju(V.pos,V.skin.length,o,pe,s,u),m(`before-final`);let qe=V.skin.length,K=1/0,q=-1/0,Je=1/0,Ye=-1/0;for(let e=0;e<qe;e++)K=Math.min(K,V.pos[e*3]),q=Math.max(q,V.pos[e*3]),Je=Math.min(Je,V.pos[e*3+1]),Ye=Math.max(Ye,V.pos[e*3+1]);let Xe=Ye-(Ye-Je)*.6,Ze=0;for(let e=0;e<qe;e++)Math.abs(V.pos[e*3+1]-Xe)<.02&&le(V.skin[e],oe)<.5&&(Ze=Math.max(Ze,Math.abs(V.pos[e*3])));let Qe=[],$e=[],et=[],tt=[],nt=new Set(Ge),J=e=>e<We.length&&We[e]===1||nt.has(e)||He>=0&&e>=He&&e<Ve,rt=[],it=[],at=[],ot=[],st=new Map,ct=Math.max(.001,Math.max(q-0,0-K)),lt=Math.max(.001,Ye-Je),ut=(e,t)=>{let n=e*2+ +!!t,r=st.get(n);if(r!==void 0)return r;r=tt.length,st.set(n,r);let i=V.pos[e*3],a=V.pos[e*3+1];Qe.push(i,a,V.pos[e*3+2]);let o=.5+(i-0)/ct*.5;return $e.push(t?.5+(1-o)*.5:o*.5,(a-Je)/lt),tt.push(De[e]??1),at.push(+!J(e)),ot.push(e),rt.push(...V.skin[e].i),it.push(...V.skin[e].w),r};for(let e=0;e<V.tris.length;e+=3){let t=V.tris[e],n=V.tris[e+1],r=V.tris[e+2],i=V.pos[t*3],a=V.pos[t*3+1],o=V.pos[t*3+2],s=[V.pos[n*3]-i,V.pos[n*3+1]-a,V.pos[n*3+2]-o],c=[V.pos[r*3]-i,V.pos[r*3+1]-a,V.pos[r*3+2]-o],l=s[0]*c[1]-s[1]*c[0],u=l<0&&Math.abs(l)>1e-9?!0:l>=0?!1:V.pos[t*3+2]<0;et.push(ut(t,u),ut(n,u),ut(r,u))}return m(`final-buffers`),{rest:Float32Array.from(Qe),skinIdx:Uint16Array.from(rt),skinW:Float32Array.from(it),uv:Float32Array.from($e),index:Uint32Array.from(et),strain:Float32Array.from(tt),free:Uint8Array.from(at),weld:Uint32Array.from(ot),bbox:{minX:K,maxX:q,minY:Je,maxY:Ye},torsoHalfWidth:Ze,vertexCount:tt.length}}var Md=4;function Nd(e){let t=t=>[e[t].x,e[t].y];return{shoulderL:t(11),shoulderR:t(12),elbowL:t(13),elbowR:t(14),wristL:t(15),wristR:t(16),hipL:t(23),hipR:t(24),kneeL:t(25),kneeR:t(26),ankleL:t(27),ankleR:t(28)}}function Pd(e,t){let n=[(e.shoulderL[1]+e.shoulderR[1])/2,(e.hipL[1]+e.hipR[1])/2,(e.kneeL[1]+e.kneeR[1])/2,(e.ankleL[1]+e.ankleR[1])/2];if(t<=0)return n[0]+t*(n[1]-n[0]);if(t>=3)return n[3]+(t-3)*(n[3]-n[2]);let r=Math.floor(t);return n[r]+(n[r+1]-n[r])*(t-r)}function Fd(e,t){let n=[(e.shoulderL[1]+e.shoulderR[1])/2,(e.hipL[1]+e.hipR[1])/2,(e.kneeL[1]+e.kneeR[1])/2,(e.ankleL[1]+e.ankleR[1])/2];if(t<=n[0])return(t-n[0])/Math.max(1,n[1]-n[0]);for(let e=0;e<3;e++)if(t<=n[e+1])return e+(t-n[e])/Math.max(1,n[e+1]-n[e]);return 3+(t-n[3])/Math.max(1,n[3]-n[2])}function Id(e,t,n,r,i){let a=(t,i)=>{let a=Math.round(t),o=Math.round(i);return a>=0&&o>=0&&a<n&&o<r?e[o*n+a]:0},o=(e,t)=>a(e,t)===Md,s=e=>{let t=Fd(i,e),n=t<=1?(i.shoulderL[0]+i.shoulderR[0])/2:(i.hipL[0]+i.hipR[0])/2,r=(i.hipL[0]+i.hipR[0])/2;return t<=1?n+(r-n)*Math.max(0,t):r},c=(e,t,n)=>{let r=0,a=0,c=Pd(i,e),l=Pd(i,t);for(let e=c;e<=l;e+=Math.max(1,(l-c)/40)){let t=s(e),i=n(e);for(let n=t-i;n<=t+i;n+=Math.max(1,i/10))a++,o(n,e)&&r++}return a?r/a:0},l=Math.abs(i.shoulderL[0]-i.shoulderR[0])/2,u=Math.abs(i.hipL[0]-i.hipR[0])/2,d=c(.15,.85,()=>l*.6),f=c(1.05,1.5,()=>u*1.1),p=(e,t)=>{let n=Pd(i,t),a=Math.min(r-1,Pd(i,3.2)),s=n,c=0;for(;n<a;n++)if(o(e(n),n))s=n,c=0;else if(++c>r*.02)break;return s},m=(i.kneeL[0]+i.kneeR[0])/2,h=e=>o(m,Pd(i,e)),g=!h(1.7)&&!h(1.85),_=e=>{let t=Fd(i,e),n=t<=2?i.hipL:i.kneeL,r=t<=2?i.kneeL:i.ankleL,a=Math.min(1,Math.max(0,t<=2?t-1:t-2));return n[0]+(r[0]-n[0])*a},v=(e,t,n)=>{let r=0;for(let i=0;i<=40;i++){let a=i/40,s=a<=.5?[e[0]+(t[0]-e[0])*a*2,e[1]+(t[1]-e[1])*a*2]:[t[0]+(n[0]-t[0])*(a-.5)*2,t[1]+(n[1]-t[1])*(a-.5)*2];o(s[0],s[1])&&(r=a)}return r},y=Math.max(v(i.shoulderL,i.elbowL,i.wristL),v(i.shoulderR,i.elbowR,i.wristR)),b=y<.06?`none`:y<.5?`short`:y<.75?`elbow`:`long`,x=i=>{let a=0,o=0,s=0,c=0;for(let l=0;l<r;l+=2)for(let r=0;r<n;r+=2){if(e[l*n+r]!==Md||!i(r,l))continue;let u=(l*n+r)*4;a+=t[u],o+=t[u+1],s+=t[u+2],c++}return c?[a/c,o/c,s/c]:[128,128,128]},S=Pd(i,1),C=x((e,t)=>t<S-(S-Pd(i,0))*.2),w=x((e,t)=>t>S+(Pd(i,2)-S)*.2),T=Math.hypot(C[0]-w[0],C[1]-w[1],C[2]-w[2]),E=Fd(i,p(s,.5)),D=[],O=t=>{let i=new Uint8Array(n*r);for(let a=0;a<r;a++)for(let r=0;r<n;r++)e[a*n+r]===Md&&t(r,a)&&(i[a*n+r]=1);return i},k=d>.45,A=f>.45;if(k&&A&&E>1.25&&T<45&&!g){let e=Fd(i,p(s,1.2)),t=e=>{let t=Pd(i,e),n=s(t),r=n;for(;o(n-1,t);)n--;for(;o(r+1,t);)r++;return r-n},n=t(Math.max(1.2,e-.1))/Math.max(1,t(1.1));return D.push({type:`dress`,sleeve:b,silhouette:n>1.25?`aline`:`straight`,hemT:e,topT:0,mask:O(()=>!0),color:C,reason:`衣服從肩膀連續到臀部以下、上下同色`}),D}if(k){let e=Math.min(E,A?1.15:3),t=Pd(i,A?Math.min(e,1):e)+2;D.push({type:`top`,sleeve:b,silhouette:`straight`,hemT:e,topT:0,mask:O((e,n)=>!A||n<=t),color:C,reason:`肩膀到腰部有衣服，袖子覆蓋手臂 ${Math.round(y*100)}%`})}if(A){let e=k?Pd(i,Math.min(E,1)):Pd(i,.75),t=Fd(i,p(g?_:s,1.2)),n=g&&t>1.6?`pants`:`skirt`,r=e=>{let t=Pd(i,e),n=s(t),r=n;for(;o(n-1,t);)n--;for(;o(r+1,t);)r++;return r-n},a=n===`skirt`?r(Math.max(1.2,t-.1))/Math.max(1,r(1.1)):1;D.push({type:n,sleeve:`none`,silhouette:a>1.25?`aline`:n===`skirt`?`fitted`:`straight`,hemT:t,topT:Fd(i,e),mask:O((t,n)=>n>=e-2),color:w,reason:n===`pants`?`兩腿之間沒有布料（褲管）`:`臀部以下有連成一片的布料`})}return D}var Ld=t({buildAtlas:()=>Kd,cutoutFromMask:()=>Xd,cutoutGarment:()=>Bd,guessGarment:()=>Gd,loadImage:()=>Rd,looksLikePerson:()=>of,toCanvas:()=>Zd});async function Rd(e){let t=typeof e==`string`?e:URL.createObjectURL(e),n=new Image;return n.decoding=`async`,n.src=t,await n.decode(),n}var zd=900;function Bd(e){let t=Math.min(1,zd/Math.max(e.width,e.height)),n=Math.max(1,Math.round(e.width*t)),r=Math.max(1,Math.round(e.height*t)),i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`,{willReadFrequently:!0});a.drawImage(e,0,0,n,r);let o=a.getImageData(0,0,n,r).data,s=Vd(o,n,r),c=new Uint8Array(n*r);for(let e=0;e<n*r;e++)c[e]=+!s[e];let l=Math.max(2,Math.round(Math.max(n,r)*.02)),u=Hd(nf(tf(ef(c,n,r,l),n,r,l),n,r),n,r),d=n,f=0,p=r,m=0;for(let e=0;e<r;e++)for(let t=0;t<n;t++)u[e*n+t]&&(d=Math.min(d,t),f=Math.max(f,t),p=Math.min(p,e),m=Math.max(m,e));(f<=d||m<=p)&&(d=0,p=0,f=n-1,m=r-1,u.fill(1));let h=f-d+1,g=m-p+1,_=document.createElement(`canvas`);_.width=h,_.height=g;let v=_.getContext(`2d`),y=v.createImageData(h,g),b=new Uint8Array(h*g),x=0,S=0,C=0,w=0;for(let e=0;e<g;e++)for(let t=0;t<h;t++){let r=(e+p)*n+(t+d),i=(e*h+t)*4,a=u[r];b[e*h+t]=a,y.data[i]=o[r*4],y.data[i+1]=o[r*4+1],y.data[i+2]=o[r*4+2],y.data[i+3]=a?255:0,a&&(x+=o[r*4],S+=o[r*4+1],C+=o[r*4+2],w++)}v.putImageData(y,0,0);let T=w?[x/w,S/w,C/w]:[200,200,200],E=Math.round(h/2),D=Math.round(g*.6),O=E,k=E;for(;O>0&&b[D*h+O-1];)O--;for(;k<h-1&&b[D*h+k+1];)k++;return{canvas:_,mask:b,width:h,height:g,color:T,torsoHalfWidth:Math.max(4,(k-O)/2),centerX:(O+k)/2}}function Vd(e,t,n){let r=[];for(let i=0;i<t;i+=2)r.push(Ud(e,i,0,t)),r.push(Ud(e,i,n-1,t));for(let i=0;i<n;i+=2)r.push(Ud(e,0,i,t)),r.push(Ud(e,t-1,i,t));let i=[0,1,2].map(e=>r.reduce((t,n)=>t+n[e],0)/r.length),a=Math.sqrt(r.reduce((e,t)=>e+Wd(t,i),0)/r.length),o=Math.max(28,Math.min(80,a*2.5+22)),s=new Uint8Array(t*n),c=[],l=e=>e[0]*.299+e[1]*.587+e[2]*.114,u=Math.max(1,l(i)),d=e=>{let t=l(e);if(t>u*1.02||t<u*.5)return!1;let n=u/Math.max(1,t);return Math.hypot(e[0]*n-i[0],e[1]*n-i[1],e[2]*n-i[2])<14},f=(n,r)=>{let a=r*t+n;!s[a]&&Math.sqrt(Wd(Ud(e,n,r,t),i))<o&&(s[a]=1,c.push(a))};for(let e=0;e<t;e++)f(e,0),f(e,n-1);for(let e=0;e<n;e++)f(0,e),f(t-1,e);for(;c.length;){let r=c.pop(),a=r%t,l=r/t|0,u=Ud(e,a,l,t),f=(r,a)=>{if(r<0||a<0||r>=t||a>=n)return;let l=a*t+r;if(s[l])return;let f=Ud(e,r,a,t);(Math.sqrt(Wd(f,i))<o*1.25||d(f))&&Math.sqrt(Wd(f,u))<o*.45&&(s[l]=1,c.push(l))};f(a+1,l),f(a-1,l),f(a,l+1),f(a,l-1)}return s}function Hd(e,t,n){let r=new Int32Array(t*n).fill(-1),i=-1,a=0,o=0,s=[];for(let c=0;c<t*n;c++){if(e[c]||r[c]>=0)continue;let l=0;for(r[c]=o,s.push(c);s.length;){let i=s.pop();l++;let a=i%t,c=i/t|0;for(let[i,l]of[[a+1,c],[a-1,c],[a,c+1],[a,c-1]]){if(i<0||l<0||i>=t||l>=n)continue;let a=l*t+i;!e[a]&&r[a]<0&&(r[a]=o,s.push(a))}}l>a&&(a=l,i=o),o++}let c=new Uint8Array(t*n);for(let e=0;e<t*n;e++)c[e]=+(r[e]===i);return c}var Ud=(e,t,n,r)=>{let i=(n*r+t)*4;return[e[i],e[i+1],e[i+2]]},Wd=(e,t)=>(e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2;function Gd(e){let{mask:t,width:n,height:r}=e,i=e=>{let i=Math.min(r-1,Math.round(r*e)),a=0;for(let e=0;e<n;e++)a+=t[i*n+e];return a/n},a=0;for(let i=Math.round(r*.65);i<r;i++){let r=Math.round(e.centerX);t[i*n+r]||a++}let o=r/n,s=i(.12),c=i(.5),l=i(.95),u=Math.max(i(.2),i(.3))/Math.max(.05,c),d=0,f=Math.round(e.centerX);for(let e=Math.round(r*.9);e<r;e++)t[e*n+f]||d++;let p=d>=(r-Math.round(r*.9))*.8;if((a>r*.2||a>r*.1&&p)&&o>1.2)return{type:`pants`,sleeve:`none`,confidence:.8,reason:`下半部中間有褲管間隙`};if(r/Math.max(1,e.torsoHalfWidth*2)>1.8)return{type:`dress`,sleeve:af(e,u),confidence:.6,reason:`長度明顯大於寬度`};if(s<c*.9&&l>c*1.1&&o<1.5&&u<1.2)return{type:`skirt`,sleeve:`none`,confidence:.6,reason:`上窄下寬、沒有袖子`};let m=af(e,u);return{type:`top`,sleeve:m,confidence:.55,reason:m===`none`?`上身款、未偵測到袖子`:`上身款、${rf[m]}`}}function Kd(e,t,n=`#c9b8a6`){let r=1024,i=document.createElement(`canvas`);i.width=r*2,i.height=r;let a=i.getContext(`2d`),o=e?`rgb(${e.color.map(e=>Math.round(e)).join(`,`)})`:n;if(a.fillStyle=o,a.fillRect(0,0,r*2,r),a.fillStyle=a.createPattern($d(),`repeat`),a.fillRect(0,0,r*2,r),!e)return i;let{bbox:s}=t,c=Math.max(s.maxX,-s.minX);if(e.person&&t.avatarMarks){let n=Jd(e.person,t.avatarMarks,s,c,r),l=Yd(n,192),u=(e,t)=>{a.save(),a.translate(e+r/2,0),t&&a.scale(-1,1),a.imageSmoothingQuality=`high`,a.drawImage(l,-512,0,r,r),a.drawImage(n,-512,0,r,r),a.restore()};return u(0,!1),t.plainBack||(u(r,!0),a.save(),a.globalAlpha=.22,a.fillStyle=o,a.fillRect(r,0,r,r),a.restore()),i}let l=t.torsoHalfWidth/c*(r/2)/e.torsoHalfWidth,u=r/e.height,d=e.width*l,f=e.height*u,p=qd(e,l,d,f,r),m=(t,n)=>{a.save();let i=t+r/2;a.translate(i,0),n&&a.scale(-1,1),a.imageSmoothingQuality=`high`,a.drawImage(p,-512,0,r,r),a.drawImage(e.canvas,-e.centerX*l,0,d,f),a.restore()};return m(0,!1),t.plainBack||(m(r,!0),a.save(),a.globalAlpha=.22,a.fillStyle=o,a.fillRect(r,0,r,r),a.restore()),i}function qd(e,t,n,r,i){let a=192/i,o=document.createElement(`canvas`);o.width=o.height=192;let s=o.getContext(`2d`,{willReadFrequently:!0});s.drawImage(e.canvas,96-e.centerX*t*a,0,n*a,r*a);let c=s.getImageData(0,0,192,192),l=c.data,u=new Uint8Array(36864);for(let e=0;e<36864;e++)u[e]=+(l[e*4+3]>200);let d=!0;for(let e=0;e<192&&d;e++){d=!1;let e=u.slice();for(let t=0;t<192;t++)for(let n=0;n<192;n++){let r=t*192+n;if(u[r])continue;let i=0,a=0,o=0,s=0;for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++){let c=n+r,d=t+e;if(c<0||d<0||c>=192||d>=192)continue;let f=d*192+c;u[f]&&(i+=l[f*4],a+=l[f*4+1],o+=l[f*4+2],s++)}s&&(l[r*4]=i/s,l[r*4+1]=a/s,l[r*4+2]=o/s,l[r*4+3]=255,e[r]=1,d=!0)}u.set(e)}for(let e=0;e<36864;e++)l[e*4+3]=255;return s.putImageData(c,0,0),o}function Jd(e,t,n,r,i){let a=document.createElement(`canvas`);a.width=a.height=i;let o=a.getContext(`2d`),s=o.createImageData(i,i),c=e.image.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,e.image.width,e.image.height).data,l=e.image.width,u=e.image.height,d=e.marks,f=n.maxY-n.minY,p=e=>{let n=t.y;if(e>=n[0])return-(e-n[0])/Math.max(1e-6,n[0]-n[1]);for(let t=0;t<3;t++)if(e>=n[t+1])return t+(n[t]-e)/Math.max(1e-6,n[t]-n[t+1]);return 3+(n[3]-e)/Math.max(1e-6,n[2]-n[3])},m=(e,t)=>{let n=Math.max(0,Math.min(3,t)),r=Math.min(2,Math.floor(n));return e[r]+(e[r+1]-e[r])*(n-r)},h=[Math.abs(d.shoulderL[0]-d.shoulderR[0])/2,Math.abs(d.hipL[0]-d.hipR[0])/2,Math.abs(d.kneeL[0]-d.kneeR[0])/2,Math.abs(d.ankleL[0]-d.ankleR[0])/2],g=[(d.shoulderL[0]+d.shoulderR[0])/2,(d.hipL[0]+d.hipR[0])/2,(d.kneeL[0]+d.kneeR[0])/2,(d.ankleL[0]+d.ankleR[0])/2],_=d.shoulderL[0]>=d.shoulderR[0]?1:-1;for(let a=0;a<i;a++){let o=p(n.maxY-a/i*f),v=Pd(d,o),y=m(h,o)/Math.max(1e-4,m(t.half,o)),b=m(g,o),x=Math.round(v);for(let t=0;t<i;t++){let n=(t/i*2-1)*r,o=Math.round(b+_*n*y),d=(a*i+t)*4;if(o<0||x<0||o>=l||x>=u||!e.mask[x*l+o])continue;let f=(x*l+o)*4;s.data[d]=c[f],s.data[d+1]=c[f+1],s.data[d+2]=c[f+2],s.data[d+3]=255}}return o.putImageData(s,0,0),a}function Yd(e,t){let n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`,{willReadFrequently:!0});r.drawImage(e,0,0,t,t);let i=r.getImageData(0,0,t,t),a=i.data,o=new Uint8Array(t*t);for(let e=0;e<t*t;e++)o[e]=+(a[e*4+3]>200);if(!o.some(e=>e))return n;let s=!0;for(let e=0;e<t&&s;e++){s=!1;let e=o.slice();for(let n=0;n<t;n++)for(let r=0;r<t;r++){let i=n*t+r;if(o[i])continue;let c=0,l=0,u=0,d=0;for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++){let s=r+i,f=n+e;if(s<0||f<0||s>=t||f>=t)continue;let p=f*t+s;o[p]&&(c+=a[p*4],l+=a[p*4+1],u+=a[p*4+2],d++)}d&&(a[i*4]=c/d,a[i*4+1]=l/d,a[i*4+2]=u/d,a[i*4+3]=255,e[i]=1,s=!0)}o.set(e)}for(let e=0;e<t*t;e++)a[e*4+3]=255;return r.putImageData(i,0,0),n}function Xd(e,t,n,r){let i=e.width,a=e.height,o=i,s=0,c=a,l=0;for(let e=0;e<a;e++)for(let n=0;n<i;n++)t[e*i+n]&&(o=Math.min(o,n),s=Math.max(s,n),c=Math.min(c,e),l=Math.max(l,e));s<o&&(o=0,c=0,s=i-1,l=a-1);let u=s-o+1,d=l-c+1,f=document.createElement(`canvas`);f.width=u,f.height=d;let p=f.getContext(`2d`),m=e.getContext(`2d`,{willReadFrequently:!0}).getImageData(o,c,u,d),h=new Uint8Array(u*d);for(let e=0;e<d;e++)for(let n=0;n<u;n++){let r=t[(e+c)*i+(n+o)];h[e*u+n]=r,r||(m.data[(e*u+n)*4+3]=0)}return p.putImageData(m,0,0),{canvas:f,mask:h,width:u,height:d,color:n,torsoHalfWidth:Math.max(4,u/4),centerX:u/2,person:{image:e,mask:t,marks:r}}}function Zd(e,t=1400){let n=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),r=document.createElement(`canvas`);return r.width=Math.round(e.naturalWidth*n),r.height=Math.round(e.naturalHeight*n),r.getContext(`2d`).drawImage(e,0,0,r.width,r.height),r}var Qd=null;function $d(){if(Qd)return Qd;let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createImageData(128,128);for(let e=0;e<16384;e++){let t=Math.random(),r=t<.5?0:255;n.data[e*4]=n.data[e*4+1]=n.data[e*4+2]=r,n.data[e*4+3]=Math.round(Math.abs(t-.5)*2*10)}return t.putImageData(n,0,0),Qd=e}function ef(e,t,n,r){let i=new Uint8Array(t*n),a=new Uint8Array(t*n);for(let a=0;a<n;a++){let n=0;for(let i=0;i<Math.min(t,r);i++)n+=e[a*t+i];for(let o=0;o<t;o++)o+r<t&&(n+=e[a*t+o+r]),o-r-1>=0&&(n-=e[a*t+o-r-1]),i[a*t+o]=+(n>0)}for(let e=0;e<t;e++){let o=0;for(let a=0;a<Math.min(n,r);a++)o+=i[a*t+e];for(let s=0;s<n;s++)s+r<n&&(o+=i[(s+r)*t+e]),s-r-1>=0&&(o-=i[(s-r-1)*t+e]),a[s*t+e]=+(o>0)}return a}function tf(e,t,n,r){let i=new Uint8Array(t*n);for(let r=0;r<t*n;r++)i[r]=+!e[r];let a=ef(i,t,n,r),o=new Uint8Array(t*n);for(let i=0;i<n;i++)for(let s=0;s<t;s++){let c=s<r||i<r||s>=t-r||i>=n-r;o[i*t+s]=a[i*t+s]||c&&!e[i*t+s]?0:1}return o}function nf(e,t,n){let r=new Uint8Array(t*n),i=[],a=t=>{!e[t]&&!r[t]&&(r[t]=1,i.push(t))};for(let e=0;e<t;e++)a(e),a((n-1)*t+e);for(let e=0;e<n;e++)a(e*t),a(e*t+t-1);for(;i.length;){let e=i.pop(),r=e%t,o=e/t|0;r>0&&a(e-1),r<t-1&&a(e+1),o>0&&a(e-t),o<n-1&&a(e+t)}return r}var rf={none:`無袖`,short:`袖子短`,elbow:`袖子到手肘`,long:`袖子長`};function af(e,t){let{mask:n,width:r,height:i}=e,a=Math.round(e.centerX),o=e.torsoHalfWidth,s=0;for(;s<i&&!n[s*r+a];)s++;let c=s+i*.04,l=0;for(let e=0;e<i;e++){let t=a,s=a,u=n[e*r+a]===1;if(u){for(;t>0&&n[e*r+t-1];)t--;for(;s<r-1&&n[e*r+s+1];)s++}for(let d=0;d<r;d++){if(!n[e*r+d]||!(Math.abs(d-a)>o*1.08))continue;let f=!u||d<t||d>s;if(e>i*.45&&!f)continue;let p=d<a?a-o:a+o;l=Math.max(l,Math.hypot(d-p,e-c))}}let u=l/i;return u<.12?`none`:u<.42?`short`:u<.62?`elbow`:`long`}function of(e){let t=Math.min(1,220/Math.max(e.width,e.height)),n=Math.max(1,Math.round(e.width*t)),r=Math.max(1,Math.round(e.height*t)),i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`,{willReadFrequently:!0});a.drawImage(e,0,0,n,r);let o=a.getImageData(0,0,n,r).data,s=Vd(o,n,r),c=0,l=0,u=-1,d=-1,f=new Uint8Array(n*r);for(let e=0;e<r;e++)for(let t=0;t<n;t++){let r=e*n+t;if(s[r])continue;c++,u<0&&(u=e),d=e;let i=o[r*4],a=o[r*4+1],p=o[r*4+2],m=.299*i+.587*a+.114*p,h=128+.5*i-.4187*a-.0813*p,g=128-.1687*i-.3313*a+.5*p;m>60&&h>136&&h<175&&g>85&&g<130&&(l++,f[r]=1)}if(!c||l/c<.04)return!1;let p=0,m=0,h=u+(d-u)*.2;for(let e=u;e<=h;e++)for(let t=0;t<n;t++){let r=e*n+t;s[r]||(m++,p+=f[r])}return m>0&&p/m>.08}var sf=`modulepreload`,cf=function(e,t){return new URL(e,t).href},lf={},uf=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=cf(t,n),t=s(t),t in lf)return;lf[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:sf,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},df=null;async function ff(){return df||=(async()=>{let{FilesetResolver:e,ImageSegmenter:t}=await uf(async()=>{let{FilesetResolver:e,ImageSegmenter:t}=await import(`./vision_bundle-BoOer3Cq.js`);return{FilesetResolver:e,ImageSegmenter:t}},[],import.meta.url),n=await e.forVisionTasks(new URL(`mediapipe/wasm`,document.baseURI).href);return t.createFromOptions(n,{baseOptions:{modelAssetPath:new URL(`models/selfie_multiclass_256x256.tflite`,document.baseURI).href,delegate:`CPU`},runningMode:`IMAGE`,outputCategoryMask:!0,outputConfidenceMasks:!1})})(),df}async function pf(e){let t=(await ff()).segment(e),n=`naturalWidth`in e?e.naturalWidth:e.width,r=`naturalHeight`in e?e.naturalHeight:e.height,i=t.categoryMask,a=i.getAsUint8Array(),o=i.width,s=i.height,c=new Uint8Array(n*r);for(let e=0;e<r;e++){let t=Math.min(s-1,Math.floor(e*s/r));for(let r=0;r<n;r++)c[e*n+r]=a[t*o+Math.min(o-1,Math.floor(r*o/n))]}return i.close?.(),t.close?.(),c}function mf(){ff().catch(()=>{df=null})}var hf={shoulder:`肩寬`,chest:`胸圍`,waist:`腰圍`,hip:`臀圍`,length:`衣長`,sleeveLength:`袖長`,sleeveOpening:`袖口`,hem:`下擺`,thigh:`大腿圍`,rise:`褲襠`,inseam:`內長`,legOpening:`褲口`,upperArm:`袖寬`},gf=[`chest`,`waist`,`hip`,`hem`,`thigh`,`sleeveOpening`,`legOpening`,`upperArm`],_f=[[`shoulder`,/肩寬|肩宽|^肩$|shoulder/i],[`sleeveOpening`,/袖口|cuff|sleeve ?opening/i],[`upperArm`,/袖寬|袖宽|袖肥|臂圍|臂围|upper ?arm|bicep/i],[`sleeveLength`,/袖長|袖长|sleeve/i],[`chest`,/胸圍|胸围|胸寬|胸宽|半胸|胸部|^胸$|bust|chest/i],[`waist`,/腰圍|腰围|腰寬|腰宽|^腰$|waist/i],[`hip`,/臀圍|臀围|臀寬|臀宽|^臀$|hips?\b/i],[`hem`,/下擺|下摆|擺圍|摆围|裙擺|裙摆|hem/i],[`thigh`,/大腿|腿圍|腿围|thigh/i],[`rise`,/前檔|前档|前襠|前裆|褲襠|裤裆|立襠|立裆|直襠|直裆|rise/i],[`inseam`,/內長|内长|內側長|内侧长|褲內長|inseam/i],[`legOpening`,/褲口|裤口|褲管|裤管|腳口|脚口|leg ?opening/i],[`length`,/衣長|衣长|裙長|裙长|褲長|裤长|全長|全长|總長|总长|後中長|后中长|^長度$|^长度$|length/i]],vf=/^(XXXS|XXS|XS|S|M|L|XL|XXL|XXXL|[2-6]XL|F|FREE|FREESIZE|ONESIZE|均碼|均码|單一尺寸|单一尺寸|大碼|大码|(?:EU|US|UK)?\d{1,2}(?:號|号|碼|码)?)$/i;function yf(e){let t=e.trim().replace(/[（(].*?[)）]/g,``).replace(/[:：]$/,``);if(!t)return null;for(let[e,n]of _f)if(n.test(t))return e;return null}function bf(e){return/(寬|宽|半|平量|平鋪|平铺|flat|width)/i.test(e)&&!/肩/.test(e)}function xf(e){let t=e.trim().toUpperCase().replace(/\s+/g,``);return/^(FREE|FREESIZE|ONESIZE|均碼|均码|單一尺寸|单一尺寸)$/.test(t)?`F`:t.replace(/(號|号|碼|码)$/,``)}var Sf=/(\d+(?:\.\d+)?)(?:\s*[-~～至到]\s*(\d+(?:\.\d+)?))?/;function Cf(e){return e.replace(/[|｜\t,，、;；]/g,` `).replace(/(\d)\s*(cm|公分|釐米|厘米|in|inch|吋|")/gi,`$1 `).replace(/([：:])/g,`$1 `).split(/\s+/).filter(Boolean)}function wf(e){let t=e.match(RegExp(`^`+Sf.source+`$`));return t?[parseFloat(t[1]),t[2]?parseFloat(t[2]):null]:null}function Tf(e){let t=[],n=/(inch|吋|\bin\b|\d")/i.test(e)&&!/cm|公分/i.test(e)?`in`:`cm`,r=/平量|平鋪|平铺|flat|lay flat|半圍|半围/i.test(e),i=e.split(/\r?\n/).map(e=>e.trim()).filter(Boolean),a=new Map,o=new Set,s=e=>{let t=xf(e);return a.has(t)||a.set(t,{size:t,values:{},ranges:{}}),a.get(t)},c=(e,t,n,r)=>{bf(r)&&o.add(t),n[1]===null?e.values[t]=n[0]:(e.ranges[t]=[n[0],n[1]],e.values[t]=(n[0]+n[1])/2)},l=null,u=[],d=null;for(let e of i){let t=Cf(e);if(!t.length)continue;let n=t.map(yf),r=n.filter(Boolean).length,i=t.filter(e=>vf.test(xf(e))&&!/^\d+$/.test(e)),a=t.map(wf);if(r>=2&&!/\d/.test(e.replace(/[（(].*?[)）]/g,``))){l=n,u=t,d=null;continue}if(i.length>=2&&r===0&&a.filter(Boolean).length===0){d=t.filter(e=>vf.test(xf(e))),l=null;continue}let o=xf(t[0].replace(/[:：]$/,``));if(vf.test(o)&&r>=1){let e=s(o);for(let n=1;n<t.length;n++){let r=yf(t[n].replace(/[\d.~\-]+$/,``));if(!r)continue;let i=t[n].match(Sf),a=i&&/\d/.test(t[n])?wf(i[0]):wf(t[n+1]??``);a&&c(e,r,a,t[n])}continue}if(l&&vf.test(o)){let e=s(o),n=t.slice(1).map(wf),r=l[0]===null?l.slice(1):l,i=l[0]===null?u.slice(1):u;r.forEach((t,r)=>{t&&n[r]&&c(e,t,n[r],i[r])});continue}let f=yf(t[0]);if(d&&f){t.slice(1).map(wf).filter(Boolean).forEach((e,n)=>{d[n]&&c(s(d[n]),f,e,t[0])});continue}if(r>=1&&a.some(Boolean)&&!d){let e=s(`F`);for(let n=0;n<t.length;n++){let r=yf(t[n].replace(/[\d.~\-]+$/,``));if(!r)continue;let i=t[n].match(Sf),a=i&&/\d/.test(t[n])?wf(i[0]):wf(t[n+1]??``);a&&c(e,r,a,t[n])}}}let f=[...a.values()].filter(e=>Object.keys(e.values).length>0),p={chest:64,waist:50,hip:66,hem:60,thigh:36,sleeveOpening:14,legOpening:24,upperArm:20},m=!1;for(let e of f)for(let t of Object.keys(e.values)){let i=e=>n===`in`?e*2.54:e;if(e.values[t]=i(e.values[t]),e.ranges[t]&&(e.ranges[t]=[i(e.ranges[t][0]),i(e.ranges[t][1])]),gf.includes(t)){let n=p[t]??0;(o.has(t)||e.values[t]<n||r&&e.values[t]<n*1.25)&&(m=!0,e.values[t]=e.values[t]*2,e.ranges[t]&&(e.ranges[t]=[e.ranges[t][0]*2,e.ranges[t][1]*2]))}e.values[t]=Math.round(e.values[t]*10)/10}f.length||t.push(`找不到可辨識的尺寸資料，請確認有包含尺碼（S/M/L）與部位名稱（胸圍、衣長…）。`),m&&t.push(`偵測到平量（半圍）數值，已自動 ×2 換算成圍度。`),n===`in`&&t.push(`偵測到英吋單位，已換算成公分。`);let h=[`XXXS`,`XXS`,`XS`,`S`,`M`,`L`,`XL`,`XXL`,`2XL`,`XXXL`,`3XL`,`4XL`,`5XL`,`6XL`,`F`];return f.sort((e,t)=>{let n=h.indexOf(e.size),r=h.indexOf(t.size);return n>=0&&r>=0?n-r:parseFloat(e.size)-parseFloat(t.size)||e.size.localeCompare(t.size)}),{unit:n,flat:m,rows:f,warnings:t}}function Ef(e,t,n){let r=t===`skirt`||t===`pants`;switch(e){case`chest`:return n?{min:0,comfort:10,loose:24}:{min:4,comfort:16,loose:28};case`waist`:return r||t===`dress`?n?{min:-6,comfort:4,loose:9}:{min:1,comfort:6,loose:11}:n?{min:-4,comfort:24,loose:44}:{min:2,comfort:26,loose:46};case`hip`:return t===`pants`?n?{min:0,comfort:7,loose:18}:{min:3,comfort:10,loose:20}:t===`skirt`||t===`dress`?n?{min:-5,comfort:10,loose:30}:{min:3,comfort:14,loose:40}:n?{min:-2,comfort:22,loose:44}:{min:2,comfort:24,loose:46};case`thigh`:return n?{min:0,comfort:8,loose:18}:{min:2,comfort:10,loose:20};case`upperArm`:return n?{min:0,comfort:7,loose:16}:{min:3,comfort:9,loose:18};default:return null}}function Df(e,t){switch(e){case`chest`:return t.bust;case`waist`:return t.waist;case`hip`:return t.hips;case`thigh`:return t.thigh;case`shoulder`:return t.shoulder;case`upperArm`:return t.upperArm;default:return null}}var Of=e=>Math.round(e*10)/10;function kf(e,t,n,r,i=`short`){let a=r.structure===`knit`||r.stretch>=.1,o=[],s=0,c=e.ranges;for(let[l,u]of Object.entries(e.values)){let e=hf[l],d=Ef(l,n,a),f=Df(l,t);if(d&&f!==null){let t=c[l]?c[l][1]:u*(1+r.stretch),i=(c[l]?c[l][0]:u)-f,p,m;t<f-.5?(p=`過小`,m=`比身體小 ${Of(f-t)}cm，${r.stretch>.05?`彈性也撐不下`:`布料沒有彈性`}`,s+=100+(f-t)*5):i<d.min?(p=`偏緊`,m=a||c[l]?`靠彈性撐開，會很貼身`:`活動空間不足，坐下或抬手會緊繃`,s+=15+(d.min-i)*2):i<=d.comfort?(p=`合身`,m=`鬆份 ${Of(i)}cm`,s+=Math.abs(i-(d.min+d.comfort)/2)*.3):i<=d.loose?(p=`寬鬆`,m=`鬆份 ${Of(i)}cm，屬寬鬆版型`,s+=(i-d.comfort)*.6):(p=`過大`,m=l===`waist`&&(n===`skirt`||n===`pants`)?`腰頭太鬆會往下滑，需要改腰或繫皮帶`:`鬆份 ${Of(i)}cm，明顯太大`,s+=30+(i-d.loose)*2),o.push({key:l,label:e,garment:Of(u),body:Of(f),ease:Of(i),status:p,note:m});continue}if(l===`shoulder`){let n=u-t.shoulder,r,i,c=a?-4:-2.5;n<c-2?(r=`過小`,i=`肩線會卡在肩膀內側，手臂活動受限`,s+=60):n<c?(r=`偏緊`,i=`肩線略窄`,s+=12):n<=2.5?(r=`合身`,i=`肩線落在肩點`):n<=8?(r=`寬鬆`,i=`落肩設計的效果`,s+=(n-2.5)*.8):(r=`過大`,i=`肩線掉到上臂，看起來不合身`,s+=25),o.push({key:l,label:e,garment:Of(u),body:Of(t.shoulder),ease:Of(n),status:r,note:i});continue}if(l===`sleeveLength`&&i===`long`){let n=u-t.armLength,r=n<-6?`偏短`:n>5?`偏長`:`剛好`,i=r===`偏短`?`會變成七分／九分袖`:r===`偏長`?`袖子會蓋過手腕、堆在手背`:`袖口落在手腕`;r!==`剛好`&&(s+=5),o.push({key:l,label:e,garment:Of(u),body:Of(t.armLength),ease:Of(n),status:r,note:i});continue}if(l===`inseam`&&n===`pants`){let n=u-t.inseam,r=n<-8?`偏短`:n>4?`偏長`:`剛好`,i=r===`偏短`?`會變成九分褲、露出腳踝`:r===`偏長`?`褲管會堆在鞋面或拖地，建議修改褲長`:`褲長剛好到腳踝／鞋面`;r!==`剛好`&&(s+=4),o.push({key:l,label:e,garment:Of(u),body:Of(t.inseam),ease:Of(n),status:r,note:i});continue}l===`length`&&o.push({key:l,label:e,garment:Of(u),body:0,ease:0,status:`剛好`,note:Af(n,u,t)})}let l=o.filter(e=>e.status===`過小`).length,u=o.filter(e=>e.status===`偏緊`).length,d=o.filter(e=>e.status===`過大`).length,f=o.filter(e=>e.status===`寬鬆`).length,p=l?`太小`:d>=2||d&&!f?`太大`:u?`偏小`:d||f>=2?`偏大`:`合身`,m={太小:`這個尺碼穿不下，建議改大一號。`,偏小:`勉強穿得下，但會比較緊。`,合身:`這個尺碼整體合身。`,偏大:`整體偏寬鬆，喜歡合身可以改小一號。`,太大:`這個尺碼明顯太大，建議改小一號。`}[p];return{size:e.size,regions:o,score:Math.round(s*10)/10,verdict:p,summary:m}}function Af(e,t,n){let r=(e===`skirt`||e===`pants`?n.waistY:n.neckY)-t;return`${r>n.waistY+3?`短版，下擺在腰線以上`:r>n.hipY?`下擺在腰臀之間`:r>n.crotchY-3?`下擺蓋住臀部`:r>n.kneeY+8?`長度到大腿`:r>n.kneeY-6?`長度在膝蓋附近`:r>25?`長度到小腿`:`長度到腳踝`}（離地約 ${Math.max(0,Math.round(r))}cm）`}function jf(e,t,n,r,i=`short`){if(!e.length)return null;let a=e.map(e=>kf(e,t,n,r,i));return{best:a.reduce((e,t)=>t.score<e.score?t:e),all:a}}var Mf={hourglass:`沙漏型`,pear:`梨型`,apple:`蘋果型`,rectangle:`H 型（直筒型）`,invertedTriangle:`倒三角型`},Nf=2.54;function Pf(e){let{bust:t,waist:n,hips:r}=e,i=[],a=n/r,o,s=e.shoulder?Math.max(t,t+(e.shoulder-38)*2.2):t;n>=t*.9&&n>=r*.86?(o=`apple`,i.push(`腰圍 ${n}cm 接近胸圍與臀圍，腰臀比 ${a.toFixed(2)}，重心在腰腹`)):Math.abs(s-r)<=4.54&&(s-n>=9*Nf*.85||r-n>=10*Nf*.85)?(o=`hourglass`,i.push(`胸臀差 ${Math.abs(t-r).toFixed(0)}cm 很接近，且腰比胸臀小很多（胸腰差 ${(t-n).toFixed(0)}cm）`)):r-s>=3.6*Nf?(o=`pear`,i.push(`臀圍比胸圍大 ${(r-t).toFixed(0)}cm，下半身較豐滿`)):s-r>=3.6*Nf?(o=`invertedTriangle`,i.push(`上半身（胸／肩）比臀部寬 ${(s-r).toFixed(0)}cm`)):t-n<9*Nf*.85&&r-n<10*Nf*.85?(o=`rectangle`,i.push(`胸、腰、臀差距小（胸腰差 ${(t-n).toFixed(0)}cm、臀腰差 ${(r-n).toFixed(0)}cm），線條直順`)):(o=r>=t?`hourglass`:`invertedTriangle`,i.push(`腰線明顯，胸臀比例接近`)),e.shoulder&&e.shoulder>=40&&i.push(`肩寬 ${e.shoulder}cm 偏寬`),e.shoulder&&e.shoulder<=34&&i.push(`肩寬 ${e.shoulder}cm 偏窄`);let c=e.height<156?`petite`:e.height>168?`tall`:`average`,l=e.inseam?e.inseam/e.height:.45,u=l>=.47?`long`:l<=.43?`short`:`balanced`;return{shape:o,label:Mf[o],heightClass:c,heightLabel:{petite:`嬌小`,average:`中等身高`,tall:`高挑`}[c],legs:u,legsLabel:{long:`腿長比例佳`,balanced:`上下身比例均衡`,short:`上身比例較長`}[u],whr:Math.round(a*100)/100,reasons:i}}var Ff={hourglass:{goal:`保留腰線、順著曲線穿，不要把身形藏起來。`,recommend:[`收腰洋裝／裹身裙`,`高腰鉛筆裙`,`合身針織上衣`,`繫腰帶的西裝外套`,`高腰直筒或微喇叭褲`],avoid:[`過大的直筒 oversized 上衣（會吃掉腰線）`,`沒有腰身的布袋洋裝`,`太硬挺、撐出方正輪廓的布料`],necklines:[`V 領`,`裹身領`,`方領`]},pear:{goal:`把視覺重心往上帶，平衡較豐滿的下半身。`,recommend:[`一字領、方領、泡泡袖等上半身有細節的上衣`,`A 字裙、傘狀裙`,`高腰寬褲、微喇叭褲`,`短版外套（長度在腰線）`,`深色下身＋亮色上衣`],avoid:[`緊身鉛筆裙搭貼身上衣`,`臀部有大口袋或大面積印花的下身`,`下擺剛好停在臀部最寬處的上衣`],necklines:[`一字領`,`方領`,`船型領`]},apple:{goal:`拉長上半身線條，把重點放在腿部與肩頸。`,recommend:[`V 領、深 U 領上衣`,`帝國腰線（胸下收腰）洋裝`,`垂墜感長版開襟外套`,`直筒褲、微寬褲`,`露出小腿或腳踝的長度`],avoid:[`緊身短版上衣`,`腰部有大蝴蝶結或粗腰帶`,`腰腹處的橫條紋或亮面布料`],necklines:[`V 領`,`U 領`,`襯衫領敞開`]},rectangle:{goal:`製造腰身與曲線，讓線條更有層次。`,recommend:[`腰帶、紮衣角做出腰線`,`荷葉邊、抓皺、層次設計`,`A 字裙、百褶裙`,`短版上衣＋高腰下身`,`削肩或有肩部設計的上衣`],avoid:[`上下都是直筒又沒有腰線`,`整身同一個寬度的布袋款`],necklines:[`甜心領`,`U 領`,`圓領加上項鍊`]},invertedTriangle:{goal:`柔化肩線，增加下半身份量來平衡。`,recommend:[`V 領、深 U 領`,`拉克蘭袖、無肩線的上衣`,`A 字裙、蓬裙、寬褲`,`下半身用亮色或印花`,`垂墜感布料的上衣`],avoid:[`墊肩、泡泡袖、一字領`,`肩上有飾片或橫條紋`,`極窄的鉛筆裙搭寬肩上衣`],necklines:[`V 領`,`U 領`,`繞頸`]}};function If(e,t,n){let r=Ff[e.shape],i=[];e.heightClass===`petite`?(i.push(`嬌小身型：選高腰下身、同色系上下身，能拉長比例；外套長度盡量在臀部以上。`),i.push(`裙長選膝上或到小腿最細處，避免停在小腿肚。`)):e.heightClass===`tall`?i.push(`高挑身型：可以駕馭長版大衣、及踝長裙與寬褲，用撞色腰帶切分比例。`):i.push(`中等身高：多數長度都適合，下身選高腰或九分褲能讓腿看起來更長。`),e.legs===`short`&&i.push(`上身比例較長：上衣紮進高腰下身、鞋子選裸色或與褲同色。`),e.legs===`long`&&i.push(`腿長比例佳：短裙、短褲或合身直筒褲都能展現腿部線條。`);let a=[];if(t&&a.push(...Lf(e.shape,t)),n){a.push(`尺碼 ${n.size}：${n.summary}`);for(let e of n.regions)(e.status===`過小`||e.status===`過大`||e.status===`偏緊`)&&a.push(`${e.label}${e.status}：${e.note}`)}return{headline:`${e.label}・${e.heightLabel}・${e.legsLabel}`,goal:r.goal,recommend:r.recommend,avoid:r.avoid,necklines:r.necklines,tips:i,garmentComments:a}}function Lf(e,t){let n=[],r=`${dd[t.silhouette]}${cd[t.type]}`,i=e=>n.push(`👍 ${e}`),a=e=>n.push(`⚠️ ${e}`),o=t.type===`skirt`||t.type===`pants`||t.type===`dress`;return o&&t.silhouette===`aline`&&((e===`pear`||e===`invertedTriangle`||e===`rectangle`)&&i(`${r}能平衡臀腿與上半身比例，很適合你的身形。`),e===`apple`&&i(`${r}不貼腹部，腰腹比較沒有壓力。`)),o&&t.silhouette===`fitted`&&(e===`hourglass`&&i(`合身的${cd[t.type]}能完整展現沙漏曲線。`),e===`pear`&&a(`貼身下身會強調臀圍，建議上半身選有份量或亮色的上衣平衡。`),e===`apple`&&a(`貼身版型會凸顯腰腹，可以外搭長版開襟外套。`)),(t.type===`top`||t.type===`dress`)&&(t.neckline===`v`&&(e===`apple`||e===`invertedTriangle`||e===`hourglass`)&&i(`${ud.v}能拉長頸部線條，很適合你。`),t.neckline===`boat`&&e===`invertedTriangle`&&a(`一字領會加寬肩線，倒三角型要小心。`),t.neckline===`boat`&&e===`pear`&&i(`一字領把視線拉到肩頸，能平衡下半身。`),t.silhouette===`oversized`&&(e===`hourglass`||e===`rectangle`)&&a(`寬鬆上衣會蓋掉腰線，建議紮一角或加腰帶。`),t.sleeve===`short`&&e===`invertedTriangle`&&n.push(`💡 ${ld.short}可選袖口稍寬、不貼上臂的款式。`)),t.fabric.drape>.7&&n.push(`💡 垂墜布料會順著身體線條落下，視覺上比較修長。`),t.fabric.drape<.2&&n.push(`💡 挺版布料（如牛仔）輪廓分明，能修飾但也會增加份量。`),n.length||n.push(`${r}屬於百搭款，搭配上面的原則即可。`),n}function Rf(e,t,n,r,i){let a=[`你是專業的服裝造型師，請用臺灣繁體中文回答，條列、具體、實用。`,``,`【我的身材】`,`身高 ${e.height}cm、胸圍 ${e.bust}cm、腰圍 ${e.waist}cm、臀圍 ${e.hips}cm、肩寬 ${e.shoulder}cm、跨下長 ${e.inseam}cm`,`體型判斷：${t.label}（${t.reasons.join(`；`)}），${t.heightLabel}，${t.legsLabel}`];if(n){let e=n.type===`skirt`||n.type===`pants`,t=e?fd[n.rise]:`${ld[n.sleeve]}、${ud[n.neckline]}`;a.push(``,`【正在試穿的衣服】`,`${dd[n.silhouette]}${e&&n.type===`skirt`?`半身裙`:cd[n.type]}，${t}，材質：${n.fabric.label}`,`成衣尺寸：${Object.entries(n.m).map(([e,t])=>`${e} ${Math.round(t)}cm`).join(`、`)}`)}return r&&a.push(`合身判斷：${r.summary}；${r.regions.map(e=>`${e.label}${e.status}`).join(`、`)}`),a.push(``,i?.trim()||`請告訴我：1) 這樣的身材適合哪些版型與單品 2) 這件衣服怎麼搭配（上下身、鞋子、配件）3) 要避免什麼。`),a.join(`
`)}function zf(e,t){return Math.PI*(3*(e+t)-Math.sqrt((3*e+t)*(e+3*t)))}function Bf(e,t,n){let r=Math.max(0,Math.min(e.height-1,Math.round(t))),i=Math.max(0,Math.min(e.width-1,Math.round(n)));if(!e.mask[r*e.width+i]){let t=-1;for(let n=1;n<e.width*.1&&t<0;n++)e.mask[r*e.width+Math.min(e.width-1,i+n)]?t=i+n:e.mask[r*e.width+Math.max(0,i-n)]&&(t=i-n);if(t<0)return 0;i=t}let a=i,o=i;for(;a>0&&e.mask[r*e.width+a-1];)a--;for(;o<e.width-1&&e.mask[r*e.width+o+1];)o++;return o-a+1}function Vf(e){let t=-1,n=-1;for(let n=0;n<e.height&&t<0;n++)for(let r=0;r<e.width;r++)if(e.mask[n*e.width+r]){t=n;break}for(let t=e.height-1;t>=0&&n<0;t--)for(let r=0;r<e.width;r++)if(e.mask[t*e.width+r]){n=t;break}return[t,n]}var Hf={lShoulder:11,rShoulder:12,lElbow:13,rElbow:14,lWrist:15,rWrist:16,lHip:23,rHip:24,lAnkle:27,rAnkle:28},Uf={bust:.8,waist:.74,hips:.65},Wf={bust:1.07,waist:1.03,hips:1.05};function Gf(e,t,n,r){let i=[],[a,o]=Vf(e),s=Math.max(1,o-a),c=n/s,l=t[Hf.lShoulder],u=t[Hf.rShoulder],d=t[Hf.lHip],f=t[Hf.rHip],p=(l.y+u.y)/2,m=(d.y+f.y)/2,h=(l.x+u.x+d.x+f.x)/4,g=m-p,_=(t,n,r)=>{let i=r?0:1/0,a=t;for(let o=t;o<=n;o++){let t=Bf(e,o,h);t&&(r?t>i:t<i)&&(i=t,a=o)}return[i===1/0?0:i,a]},[v,y]=_(Math.round(p+g*.22),Math.round(p+g*.4),!0),[b,x]=_(Math.round(p+g*.5),Math.round(p+g*.85),!1),[S,C]=_(Math.round(m-g*.1),Math.round(m+g*.3),!0),w=(e,t,n)=>{if(!r)return t*n;let[i,o]=Vf(r.s),c=(o-i)/s,l=i+(e-a)*c,u=-1,d=-1,f=Math.round(l);for(let e=0;e<r.s.width;e++)r.s.mask[f*r.s.width+e]&&(u<0&&(u=e),d=e);return u<0?t*n:(d-u+1)/c};r||i.push(`沒有側面照：厚度用女性平均比例估算，胸圍與臀圍誤差可能較大。`);let T=(e,t,n)=>zf(e*c/2,t*c/2)*n,E=T(v,w(y,v,Uf.bust),Wf.bust),D=T(b,w(x,b,Uf.waist),Wf.waist),O=T(S,w(C,S,Uf.hips),Wf.hips),k=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),A=k(l,u)*c,j=Bf(e,p,h)*c,M=j>A?(A*1.12+j*.88)/2:A*1.12;j>A*1.6&&i.push(`手臂可能貼著身體，量到的寬度偏大；拍照時手臂請稍微張開。`);let N=(e,t,n)=>(k(e,t)+k(t,n))*c+3,P=Math.max(N(l,t[Hf.lElbow],t[Hf.lWrist]),N(u,t[Hf.rElbow],t[Hf.rWrist])),F=Math.round(m+g*.15);for(;F<o&&e.mask[F*e.width+Math.round(h)];)F++;let I=(o-F)*c,L=e=>Math.round(e*10)/10;return{height:n,bust:L(E),waist:L(D),hips:L(O),shoulder:L(M),inseam:L(I),armLength:L(P),notes:i}}var Kf=null;async function qf(){return Kf||=(async()=>{let{FilesetResolver:e,PoseLandmarker:t}=await uf(async()=>{let{FilesetResolver:e,PoseLandmarker:t}=await import(`./vision_bundle-BoOer3Cq.js`);return{FilesetResolver:e,PoseLandmarker:t}},[],import.meta.url),n=new URL(`mediapipe/wasm`,document.baseURI).href,r=await e.forVisionTasks(n);return t.createFromOptions(r,{baseOptions:{modelAssetPath:new URL(`models/pose_landmarker_full.task`,document.baseURI).href,delegate:`CPU`},runningMode:`IMAGE`,numPoses:1,outputSegmentationMasks:!0})})(),Kf}async function Jf(e){let t=(await qf()).detect(e),n=e.naturalWidth,r=e.naturalHeight,i=new Uint8Array(n*r);if(t.segmentationMasks?.length){let e=t.segmentationMasks[0],a=e.getAsFloat32Array(),o=e.width,s=e.height;for(let e=0;e<r;e++)for(let t=0;t<n;t++)i[e*n+t]=+(a[Math.floor(e*s/r)*o+Math.floor(t*o/n)]>.5);e.close?.()}let a=t.landmarks?.[0]?.map(e=>({x:e.x*n,y:e.y*r,visibility:e.visibility}))??null;return{silhouette:{mask:i,width:n,height:r},landmarks:a}}async function Yf(e,t,n){let r=await Jf(e);if(!r.landmarks)throw Error(`照片中找不到人，請使用全身、正面、背景單純的照片。`);let i=n?await Jf(n):null;return Gf(r.silhouette,r.landmarks,t,i?{s:i.silhouette,lm:i.landmarks}:void 0)}function Xf(){qf().catch(()=>{Kf=null})}var Zf=`closet2`,Qf=`wardrobe`;function $f(){return new Promise((e,t)=>{let n=indexedDB.open(Zf,1);n.onupgradeneeded=()=>n.result.createObjectStore(Qf,{keyPath:`id`}),n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)})}async function ep(e,t){let n=await $f();return new Promise((r,i)=>{let a=t(n.transaction(Qf,e).objectStore(Qf));a.onsuccess=()=>r(a.result),a.onerror=()=>i(a.error)})}var tp={list:async()=>(await ep(`readonly`,e=>e.getAll())).sort((e,t)=>t.createdAt-e.createdAt),put:e=>ep(`readwrite`,t=>t.put(e)),remove:e=>ep(`readwrite`,t=>t.delete(e))},np=e=>new Promise((t,n)=>e.toBlob(e=>e?t(e):n(Error(`toBlob failed`)),`image/png`));async function rp(e){let t=await createImageBitmap(e),n=document.createElement(`canvas`);return n.width=t.width,n.height=t.height,n.getContext(`2d`).drawImage(t,0,0),n}async function ip(e,t,n,r){let i=document.createElement(`canvas`);i.width=i.height=96;let a=i.getContext(`2d`);if(t){let e=Math.min(96/t.width,96/t.height);a.drawImage(t.canvas,(96-t.width*e)/2,(96-t.height*e)/2,t.width*e,t.height*e)}else a.fillStyle=e.color??`#999`,a.fillRect(8,8,80,80);let o={id:crypto.randomUUID(),name:r.name,createdAt:Date.now(),spec:structuredClone(e),plainBack:n,sizeText:r.sizeText,fabricText:r.fabricText,thumb:await np(i),color:t?.color??[150,150,150]};if(t?.person){let e=t.person,n=document.createElement(`canvas`);n.width=e.image.width,n.height=e.image.height;let r=n.getContext(`2d`),i=r.createImageData(n.width,n.height);for(let t=0;t<e.mask.length;t++)i.data[t*4+3]=e.mask[t]?255:0;r.putImageData(i,0,0),o.person={image:await np(e.image),mask:await np(n),marks:e.marks}}else t&&(o.cutout=await np(t.canvas));return o}async function ap(e){if(e.person){let t=await rp(e.person.image),n=await rp(e.person.mask),r=n.getContext(`2d`).getImageData(0,0,n.width,n.height).data,i=new Uint8Array(n.width*n.height);for(let e=0;e<i.length;e++)i[e]=+(r[e*4+3]>127);let{cutoutFromMask:a}=await uf(async()=>{let{cutoutFromMask:e}=await Promise.resolve().then(()=>Ld);return{cutoutFromMask:e}},void 0,import.meta.url);return a(t,i,e.color,e.person.marks)}if(e.cutout){let t=await rp(e.cutout),n=t.getContext(`2d`).getImageData(0,0,t.width,t.height).data,r=new Uint8Array(t.width*t.height);for(let e=0;e<r.length;e++)r[e]=+(n[e*4+3]>127);let i=Math.round(t.height*.6),a=Math.round(t.width/2),o=a,s=a;for(;o>0&&r[i*t.width+o-1];)o--;for(;s<t.width-1&&r[i*t.width+s+1];)s++;return{canvas:t,mask:r,width:t.width,height:t.height,color:e.color,torsoHalfWidth:Math.max(4,(s-o)/2),centerX:(o+s)/2}}return null}var op=900,sp=1e3;function cp(){let e=document.createElement(`canvas`);e.width=op,e.height=sp;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,sp);return n.addColorStop(0,`#d9d7d3`),n.addColorStop(1,`#cfccc7`),t.fillStyle=n,t.fillRect(0,0,op,sp),[e,t]}function lp(e,t,n,r=[]){e.save(),e.shadowColor=`rgba(0,0,0,0.18)`,e.shadowBlur=18,e.shadowOffsetY=6,e.fillStyle=`#888`,e.fill(t),e.restore(),e.save(),e.clip(t),n(e);for(let t=0;t<7;t++){let n=120+t*110+Math.sin(t*7.3)*40,r=e.createLinearGradient(n-60,0,n+60,0);r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(.5,t%2?`rgba(255,255,255,0.07)`:`rgba(0,0,0,0.06)`),r.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=r,e.fillRect(n-60,0,120,sp)}e.lineWidth=10,e.strokeStyle=`rgba(0,0,0,0.05)`,e.stroke(t),e.lineWidth=2,e.setLineDash([6,5]),e.strokeStyle=`rgba(0,0,0,0.18)`;for(let t of r)e.stroke(t);e.restore()}function up(e,t=380,n=600,r=150){let i=op/2,a=t/2,o=new Path2D,s=e===`none`?115:a+8,c=r+(e===`none`?8:28),l=r+170;return o.moveTo(380,r),o.quadraticCurveTo(i,r+110,520,r),o.lineTo(i+s,c),e===`short`?(o.lineTo(i+s+120,c+150),o.lineTo(i+a+60,l+40),o.lineTo(i+a,l+30)):e===`long`?(o.lineTo(i+s+150,c+480),o.lineTo(i+a+95,c+505),o.lineTo(i+a+4,l+30)):o.quadraticCurveTo(i+s+10,l,i+a,l+10),o.lineTo(i+a,r+n),o.lineTo(i-a,r+n),o.lineTo(i-a,e===`none`?l+10:l+30),e===`short`?(o.lineTo(i-a-60,l+40),o.lineTo(i-s-120,c+150)):e===`long`?(o.lineTo(i-a-95,c+505),o.lineTo(i-s-150,c+480)):o.quadraticCurveTo(i-s-10,l,i-s,c),o.lineTo(i-s,c),o.closePath(),o}function dp(e){let[t,n]=cp(),r=op/2;switch(e){case`graphicTee`:lp(n,up(`short`),e=>{e.fillStyle=`#e7c35a`,e.fillRect(0,0,op,sp),e.save(),e.translate(r,390),e.fillStyle=`#e0703a`,e.beginPath(),e.arc(0,-30,62,0,Math.PI*2),e.fill(),e.fillStyle=`#2f5d62`,e.beginPath(),e.moveTo(-120,60),e.lineTo(-40,-30),e.lineTo(10,20),e.lineTo(60,-40),e.lineTo(130,60),e.closePath(),e.fill(),e.fillStyle=`#1f2d3a`,e.font=`bold 38px Georgia, serif`,e.textAlign=`center`,e.fillText(`SUNDAY`,0,118),e.restore()},[new Path2D(`M 380 158 Q ${r} 272 520 158`)]);break;case`gridTee`:lp(n,up(`short`),e=>{e.fillStyle=`#cfe6f2`,e.fillRect(0,0,op,sp),e.strokeStyle=`#c33`,e.lineWidth=3;for(let t=0;t<op;t+=50)e.beginPath(),e.moveTo(t,0),e.lineTo(t,sp),e.stroke();e.strokeStyle=`#33c`;for(let t=0;t<sp;t+=50)e.beginPath(),e.moveTo(0,t),e.lineTo(op,t),e.stroke();e.fillStyle=`#222`,e.font=`bold 20px sans-serif`;for(let t=150;t<sp;t+=100)e.fillText(String(t),456,t-4)});break;case`stripeLong`:lp(n,up(`long`,360,590,140),e=>{e.fillStyle=`#fbfaf6`,e.fillRect(0,0,op,sp),e.fillStyle=`#23395d`;for(let t=150;t<sp;t+=34)e.fillRect(0,t,op,13)});break;case`ribTank`:lp(n,up(`none`,330,560,150),e=>{e.fillStyle=`#c9a9a0`,e.fillRect(0,0,op,sp);for(let t=0;t<op;t+=7)e.fillStyle=`rgba(0,0,0,0.07)`,e.fillRect(t,0,3,sp)});break;case`floralDress`:{let e=new Path2D;e.moveTo(388,70),e.quadraticCurveTo(r,180,512,70),e.lineTo(626,92),e.lineTo(715,220),e.lineTo(650,255),e.lineTo(610,400),e.quadraticCurveTo(680,670,790,930),e.lineTo(110,930),e.quadraticCurveTo(220,670,290,400),e.lineTo(250,255),e.lineTo(185,220),e.lineTo(274,92),e.closePath(),lp(n,e,e=>{e.fillStyle=`#1e2a44`,e.fillRect(0,0,op,sp);let t=3,n=()=>(t=t*16807%2147483647)/2147483647;for(let t=0;t<260;t++){let t=n()*op,r=n()*sp,i=9+n()*12;e.fillStyle=[`#f1d3dd`,`#e98fa5`,`#f6e7b0`,`#b9d7ea`][Math.floor(n()*4)];for(let a=0;a<5;a++){let o=a/5*Math.PI*2+n();e.beginPath(),e.ellipse(t+Math.cos(o)*i*.7,r+Math.sin(o)*i*.7,i*.55,i*.35,o,0,Math.PI*2),e.fill()}e.fillStyle=`#f5c24c`,e.beginPath(),e.arc(t,r,i*.25,0,Math.PI*2),e.fill(),e.fillStyle=`#5f8b5a`,e.beginPath(),e.ellipse(t+i*1.2,r+i*.6,i*.6,i*.22,.6,0,Math.PI*2),e.fill()}},[new Path2D(`M 290 400 L 610 400`)]);break}case`plaidSkirt`:{let e=new Path2D;e.moveTo(300,160),e.lineTo(600,160),e.lineTo(750,720),e.quadraticCurveTo(r,750,150,720),e.closePath(),lp(n,e,e=>{e.fillStyle=`#b8a37a`,e.fillRect(0,0,op,sp);for(let t=0;t<op;t+=64)e.fillStyle=`rgba(90,40,30,0.35)`,e.fillRect(t,0,18,sp),e.fillStyle=`rgba(40,60,50,0.25)`,e.fillRect(t+30,0,6,sp);for(let t=0;t<sp;t+=64)e.fillStyle=`rgba(90,40,30,0.35)`,e.fillRect(0,t,op,18),e.fillStyle=`rgba(40,60,50,0.25)`,e.fillRect(0,t+30,op,6);e.fillStyle=`rgba(60,40,20,0.5)`,e.fillRect(0,160,op,34)},[new Path2D(`M 300 194 L 600 194`)]);break}case`denim`:{let e=new Path2D;e.moveTo(275,60),e.lineTo(625,60),e.lineTo(645,320),e.lineTo(600,940),e.lineTo(475,940),e.lineTo(458,390),e.lineTo(442,390),e.lineTo(425,940),e.lineTo(300,940),e.lineTo(255,320),e.closePath(),lp(n,e,e=>{e.fillStyle=`#3d5a80`,e.fillRect(0,0,op,sp);for(let t=0;t<4e3;t++){let n=t*97%op,r=t*61%sp;e.fillStyle=t%3?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.06)`,e.fillRect(n,r,14,1)}for(let t of[-1,1]){let n=e.createRadialGradient(r+t*90,440,10,r+t*90,440,150);n.addColorStop(0,`rgba(255,255,255,0.18)`),n.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=n,e.fillRect(0,0,op,sp)}e.fillStyle=`rgba(0,0,0,0.15)`,e.fillRect(0,60,op,40)},[new Path2D(`M 275 100 L 625 100 M 454 100 Q 480 260 454 310`)]);break}}return t}var fp=900,pp=1100;function mp(e){let t=Math.abs(Math.floor(e))%2147483646+1;return()=>(t=t*16807%2147483647)/2147483647}function hp(e){let t=fp/2,n=new Path2D,r=[],i=e.length??1,a=e.silhouette===`oversized`?1.25:e.silhouette===`fitted`?.88:1;if(e.type===`pants`){let o=165*a,s=Math.min(980,860*i),c=e.silhouette===`fitted`?60:e.silhouette===`aline`||e.silhouette===`oversized`?115:80;return n.moveTo(t-o,70),n.lineTo(t+o,70),n.lineTo(t+o+15,320),n.lineTo(475+c*1.4,70+s),n.lineTo(472,70+s),n.lineTo(458,370),n.lineTo(442,370),n.lineTo(428,70+s),n.lineTo(425-c*1.4,70+s),n.lineTo(t-o-15,320),n.closePath(),r.push(new Path2D(`M ${t-o} 108 L ${t+o} 108`)),{path:n,seams:r}}if(e.type===`skirt`){let a=Math.min(900,560*i),o=e.silhouette===`fitted`?165:e.silhouette===`straight`?190:e.silhouette===`oversized`?360:300;return n.moveTo(300,130),n.lineTo(600,130),n.lineTo(t+o,130+a),n.quadraticCurveTo(t,130+a+28,t-o,130+a),n.closePath(),r.push(new Path2D(`M 300 162 L 600 162`)),{path:n,seams:r}}let o=e.type===`dress`,s=o?60:140,c=170*a,l=e.neckline===`boat`?105:e.neckline===`scoop`?85:68,u=e.neckline===`v`?150:e.neckline===`scoop`?105:e.neckline===`boat`?30:55,d=o?Math.min(1020,860*i):Math.min(820,560*i),f=e.sleeve===`none`,p=f?e.straps?l+18:l+45:c+(e.silhouette===`oversized`?30:8),m=s+(f?6:26),h=s+(f?e.straps?190:175:170*(e.silhouette===`oversized`?1.2:1)),g=s+330,_=e.silhouette===`fitted`?c*.86:c,v=o?e.silhouette===`aline`?c*1.8:e.silhouette===`fitted`?c*.98:c*1.15:c*(e.silhouette===`fitted`?.95:1),[y,b]={none:[0,0],short:[120,150],elbow:[150,290],long:[170,490]}[e.sleeve];n.moveTo(t-l,s),e.neckline===`v`?n.lineTo(t,s+u):n.quadraticCurveTo(t,s+u*2-10,t+l,s),e.neckline===`v`&&n.lineTo(t+l,s),n.lineTo(t+p,m),(r=>{let i=e=>t+r*e;if(f)e.straps&&n.lineTo(i(p),h-60),n.quadraticCurveTo(i(p+12),h,i(c),h+8);else{let t=e.sleeve===`long`?58:75;n.lineTo(i(p+y),m+b),n.lineTo(i(p+y-t*.85),m+b+t*.6),n.lineTo(i(c),h+25)}(o||e.silhouette===`fitted`)&&n.quadraticCurveTo(i(_),g-60,i(_),Math.min(g,s+d-40)),n.lineTo(i(v),s+d)})(1),n.quadraticCurveTo(t,s+d+(o&&e.silhouette===`aline`?30:6),t-v,s+d);let x=e=>t-e;if(n.lineTo(x(o||e.silhouette===`fitted`?_:c),o||e.silhouette===`fitted`?Math.min(g,s+d-40):h+25),(o||e.silhouette===`fitted`)&&n.quadraticCurveTo(x(_),g-60,x(c),h+(f?8:25)),f)n.quadraticCurveTo(x(p+12),h,x(p),e.straps?h-60:m);else{let t=e.sleeve===`long`?58:75;n.lineTo(x(p+y-t*.85),m+b+t*.6),n.lineTo(x(p+y),m+b)}return n.lineTo(x(p),m),n.closePath(),r.push(new Path2D(e.neckline===`v`?`M ${t-l} ${s} L ${t} ${s+u} L ${t+l} ${s}`:`M ${t-l} ${s+8} Q ${t} ${s+u*2+4} ${t+l} ${s+8}`)),o&&e.silhouette!==`straight`&&r.push(new Path2D(`M ${t-_} ${g} L ${t+_} ${g}`)),{path:n,seams:r}}function gp(e,t){let[n,r=`#222`,i=`#c33`,a=`#f2d35b`]=t.colors,o=mp(t.seed??11);switch(e.fillStyle=n,e.fillRect(0,0,fp,pp),t.pattern){case`stripe`:e.fillStyle=r;for(let t=0;t<pp;t+=36)e.fillRect(0,t,fp,14);break;case`pinstripe`:e.fillStyle=r;for(let t=0;t<fp;t+=22)e.fillRect(t,0,2,pp);break;case`plaid`:for(let t=0;t<fp;t+=70)e.fillStyle=r+`66`,e.fillRect(t,0,22,pp),e.fillStyle=i+`44`,e.fillRect(t+36,0,6,pp);for(let t=0;t<pp;t+=70)e.fillStyle=r+`66`,e.fillRect(0,t,fp,22),e.fillStyle=i+`44`,e.fillRect(0,t+36,fp,6);break;case`gingham`:e.fillStyle=r+`77`;for(let t=0;t<fp;t+=40)e.fillRect(t,0,20,pp);for(let t=0;t<pp;t+=40)e.fillRect(0,t,fp,20);break;case`dots`:e.fillStyle=r;for(let t=10;t<pp;t+=44)for(let n=t/44%2?32:10;n<fp;n+=44)e.beginPath(),e.arc(n,t,7,0,Math.PI*2),e.fill();break;case`floral`:for(let t=0;t<240;t++){let t=o()*fp,n=o()*pp,s=9+o()*12;e.fillStyle=[r,i,a][Math.floor(o()*3)];for(let r=0;r<5;r++){let i=r/5*Math.PI*2+o();e.beginPath(),e.ellipse(t+Math.cos(i)*s*.7,n+Math.sin(i)*s*.7,s*.55,s*.35,i,0,Math.PI*2),e.fill()}e.fillStyle=`#f5d36b`,e.beginPath(),e.arc(t,n,s*.25,0,Math.PI*2),e.fill()}break;case`rib`:for(let t=0;t<fp;t+=7)e.fillStyle=`rgba(0,0,0,0.08)`,e.fillRect(t,0,3,pp);break;case`knit`:for(let t=0;t<pp;t+=10)for(let n=t/10%2?5:0;n<fp;n+=10)e.fillStyle=`rgba(0,0,0,0.07)`,e.beginPath(),e.ellipse(n,t,4,6,.4,0,Math.PI*2),e.fill();break;case`denim`:for(let t=0;t<5e3;t++)e.fillStyle=t%3?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.06)`,e.fillRect(t*97%fp,t*61%pp,14,1);break;case`text`:e.fillStyle=r,e.font=`bold 58px Georgia, serif`,e.textAlign=`center`,e.fillText((t.text??``).slice(0,14),fp/2,t.type===`dress`?380:440)}}function _p(e){let t=document.createElement(`canvas`);t.width=fp,t.height=pp;let n=t.getContext(`2d`),r=n.createLinearGradient(0,0,0,pp);r.addColorStop(0,`#d9d7d3`),r.addColorStop(1,`#cfccc7`),n.fillStyle=r,n.fillRect(0,0,fp,pp);let{path:i,seams:a}=hp(e);n.save(),n.shadowColor=`rgba(0,0,0,0.18)`,n.shadowBlur=18,n.shadowOffsetY=6,n.fillStyle=`#888`,n.fill(i),n.restore(),n.save(),n.clip(i),gp(n,e);for(let e=0;e<7;e++){let t=120+e*110+Math.sin(e*7.3)*40,r=n.createLinearGradient(t-60,0,t+60,0);r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(.5,e%2?`rgba(255,255,255,0.07)`:`rgba(0,0,0,0.06)`),r.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=r,n.fillRect(t-60,0,120,pp)}if(e.pleated){let t=e.type===`skirt`?170:420;for(let e=-14;e<=14;e++){let r=n.createLinearGradient(0,t,0,pp);r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(.15,`rgba(0,0,0,0.12)`),r.addColorStop(1,`rgba(0,0,0,0.16)`),n.strokeStyle=r,n.lineWidth=3,n.beginPath(),n.moveTo(fp/2+e*11,t),n.lineTo(fp/2+e*24,pp),n.stroke()}}n.lineWidth=10,n.strokeStyle=`rgba(0,0,0,0.05)`,n.stroke(i),n.lineWidth=2,n.setLineDash([6,5]),n.strokeStyle=`rgba(0,0,0,0.18)`;for(let e of a)n.stroke(e);return n.restore(),t}var vp=[{id:`E473980-000`,name:`AIRism 罩杯式背心`,en:`AIRism Bra Top`,group:`innerwear`,type:`top`,sleeve:`none`,neckline:`scoop`,silhouette:`fitted`,fabricText:`AIRism 聚酯纖維 嫘縈 彈性纖維 針織`,colors:[{name:`淺灰`,hex:`#c9c8c5`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`深咖啡`,hex:`#4a3326`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XXS`,m:{length:50.5,chest:72},body:{bust:[75,81],waist:[57,63],hips:[83,89]}},{size:`XS`,m:{length:52,chest:75},body:{bust:[79,85],waist:[61,67],hips:[87,93]}},{size:`S`,m:{length:54,chest:78},body:{bust:[83,89],waist:[65,71],hips:[91,97]}},{size:`M`,m:{length:56,chest:83},body:{bust:[87,93],waist:[69,75],hips:[95,101]}},{size:`L`,m:{length:58,chest:88},body:{bust:[93,99],waist:[75,81],hips:[101,107]}},{size:`XL`,m:{length:60,chest:93},body:{bust:[99,105],waist:[81,87],hips:[107,113]}},{size:`XXL`,m:{length:60,chest:98},body:{bust:[105,111],waist:[87,93],hips:[113,119]}}],sizing:`us`,url:`https://www.uniqlo.com/us/en/products/E473980-000/00`},{id:`E473977-000`,name:`AIRism 罩杯式細肩帶背心`,en:`AIRism Bra Camisole`,group:`innerwear`,type:`top`,sleeve:`none`,neckline:`boat`,silhouette:`fitted`,fabricText:`AIRism 聚酯纖維 嫘縈 彈性纖維 針織`,colors:[{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`粉紅`,hex:`#e3a7b4`},{name:`原色`,hex:`#e6dccb`},{name:`咖啡`,hex:`#7a5238`}],sizes:[{size:`XXS`,m:{length:53.5,chest:70},body:{bust:[75,81],waist:[57,63],hips:[83,89]}},{size:`XS`,m:{length:55,chest:73},body:{bust:[79,85],waist:[61,67],hips:[87,93]}},{size:`S`,m:{length:57,chest:76},body:{bust:[83,89],waist:[65,71],hips:[91,97]}},{size:`M`,m:{length:59,chest:81},body:{bust:[87,93],waist:[69,75],hips:[95,101]}},{size:`L`,m:{length:61,chest:86},body:{bust:[93,99],waist:[75,81],hips:[101,107]}},{size:`XL`,m:{length:63,chest:91},body:{bust:[99,105],waist:[81,87],hips:[107,113]}},{size:`XXL`,m:{length:63,chest:96},body:{bust:[105,111],waist:[87,93],hips:[113,119]}}],sizing:`us`,url:`https://www.uniqlo.com/us/en/products/E473977-000/00`},{id:`E482195-000`,name:`羅紋短版罩杯式背心`,en:`Ribbed Cropped Bra Top`,group:`innerwear`,type:`top`,sleeve:`none`,neckline:`scoop`,silhouette:`fitted`,fabricText:`棉96% 彈性纖維4% 羅紋針織`,colors:[{name:`深咖啡`,hex:`#4a3326`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`酒紅`,hex:`#6e2635`},{name:`米色`,hex:`#d8c3a3`},{name:`綠`,hex:`#5f7556`}],sizes:[{size:`XS`,m:{length:43,shoulder:24.5,chest:72},body:{bust:[79,85],waist:[61,67],hips:[87,93]}},{size:`S`,m:{length:43,shoulder:25,chest:75},body:{bust:[83,89],waist:[65,71],hips:[91,97]}},{size:`M`,m:{length:45,shoulder:26,chest:80},body:{bust:[87,93],waist:[69,75],hips:[95,101]}},{size:`L`,m:{length:47,shoulder:26.5,chest:85},body:{bust:[93,99],waist:[75,81],hips:[101,107]}},{size:`XL`,m:{length:49,shoulder:27.5,chest:90},body:{bust:[99,105],waist:[81,87],hips:[107,113]}},{size:`XXL`,m:{length:49,shoulder:28.5,chest:95},body:{bust:[105,111],waist:[87,93],hips:[113,119]}}],sizing:`us`,url:`https://www.uniqlo.com/us/en/products/E482195-000/00`},{id:`E465755-000`,name:`AIRism 棉質圓領 T 恤`,en:`エアリズムコットンT`,group:`tops`,type:`top`,sleeve:`short`,neckline:`crew`,silhouette:`oversized`,fabricText:`棉70% 聚酯纖維30% 針織`,colors:[{name:`米色`,hex:`#d8c3a3`},{name:`白`,hex:`#f4f2ee`},{name:`淺灰`,hex:`#c9c8c5`},{name:`黑`,hex:`#1f1f22`},{name:`粉紅`,hex:`#e3a7b4`},{name:`深咖啡`,hex:`#4a3326`},{name:`海軍藍`,hex:`#232f4b`}],sizes:[{size:`XS`,m:{length:54.5,shoulder:43.5,chest:92,sleeveLength:19.2},body:{bust:[73,79]}},{size:`S`,m:{length:56,shoulder:44.5,chest:97,sleeveLength:19.8},body:{bust:[77,83]}},{size:`M`,m:{length:58,shoulder:45.5,chest:102,sleeveLength:20.2},body:{bust:[81,87]}},{size:`L`,m:{length:60,shoulder:47,chest:108,sleeveLength:21},body:{bust:[85,91]}},{size:`XL`,m:{length:62,shoulder:48.5,chest:114,sleeveLength:21.8},body:{bust:[91,97]}},{size:`XXL`,m:{length:62,shoulder:49.5,chest:120,sleeveLength:22.2},body:{bust:[97,103]}},{size:`3XL`,m:{length:64.5,shoulder:50.5,chest:126,sleeveLength:23.2},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E465755-000/00`},{id:`E424873-000`,name:`圓領 T 恤`,en:`クルーネックT`,group:`tops`,type:`top`,sleeve:`short`,neckline:`crew`,silhouette:`straight`,fabricText:`棉100% 針織`,colors:[{name:`粉紅`,hex:`#e3a7b4`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`咖啡`,hex:`#7a5238`},{name:`奶油`,hex:`#efe4c8`},{name:`海軍藍`,hex:`#232f4b`},{name:`淺紫`,hex:`#b9a6c9`}],sizes:[{size:`XS`,m:{length:58,shoulder:34,chest:76,sleeveLength:15.5},body:{bust:[73,79]}},{size:`S`,m:{length:59.5,shoulder:35,chest:81,sleeveLength:16},body:{bust:[77,83]}},{size:`M`,m:{length:61.5,shoulder:36,chest:86,sleeveLength:16.5},body:{bust:[81,87]}},{size:`L`,m:{length:63.5,shoulder:37.5,chest:92,sleeveLength:16.8},body:{bust:[85,91]}},{size:`XL`,m:{length:66,shoulder:39,chest:98,sleeveLength:17.5},body:{bust:[91,97]}},{size:`XXL`,m:{length:68,shoulder:40,chest:104,sleeveLength:18.5},body:{bust:[97,103]}},{size:`3XL`,m:{length:69.5,shoulder:41,chest:110,sleeveLength:19},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E424873-000/00`},{id:`E465760-000`,name:`Mini T 恤（短版合身）`,en:`ミニT`,group:`tops`,type:`top`,sleeve:`short`,neckline:`crew`,silhouette:`fitted`,fabricText:`棉96% 彈性纖維4% 針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`白`,hex:`#f4f2ee`},{name:`灰`,hex:`#9d9c99`},{name:`酒紅`,hex:`#6e2635`},{name:`咖啡`,hex:`#7a5238`},{name:`黃`,hex:`#e7c75a`},{name:`藍`,hex:`#5a7fb3`},{name:`海軍藍`,hex:`#232f4b`}],sizes:[{size:`XS`,m:{length:44.5,shoulder:34,chest:70,sleeveLength:11.5},body:{bust:[73,79]}},{size:`S`,m:{length:46,shoulder:35,chest:75,sleeveLength:12},body:{bust:[77,83]}},{size:`M`,m:{length:48,shoulder:36,chest:80,sleeveLength:12},body:{bust:[81,87]}},{size:`L`,m:{length:50,shoulder:37.5,chest:86,sleeveLength:12.8},body:{bust:[85,91]}},{size:`XL`,m:{length:52.5,shoulder:39,chest:92,sleeveLength:13.5},body:{bust:[91,97]}},{size:`XXL`,m:{length:52.5,shoulder:40,chest:98,sleeveLength:14.5},body:{bust:[97,103]}},{size:`3XL`,m:{length:54.5,shoulder:41,chest:104,sleeveLength:15},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E465760-000/00`},{id:`E487579-000`,name:`Mini T 恤 長袖`,en:`ミニT`,group:`tops`,type:`top`,sleeve:`long`,neckline:`crew`,silhouette:`fitted`,fabricText:`棉96% 彈性纖維4% 針織`,colors:[{name:`米色`,hex:`#d8c3a3`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`粉紅`,hex:`#e3a7b4`},{name:`紅`,hex:`#b8323a`},{name:`綠`,hex:`#5f7556`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{length:46.5,shoulder:34,chest:73,sleeveLength:55.5},body:{bust:[73,79]}},{size:`S`,m:{length:48,shoulder:35,chest:78,sleeveLength:56.5},body:{bust:[77,83]}},{size:`M`,m:{length:50,shoulder:36,chest:83,sleeveLength:57},body:{bust:[81,87]}},{size:`L`,m:{length:52,shoulder:37,chest:88,sleeveLength:58.5},body:{bust:[85,91]}},{size:`XL`,m:{length:54.5,shoulder:38.5,chest:94,sleeveLength:58.2},body:{bust:[91,97]}},{size:`XXL`,m:{length:54.5,shoulder:39.5,chest:100,sleeveLength:58.2},body:{bust:[97,103]}},{size:`3XL`,m:{length:56.5,shoulder:40.5,chest:106,sleeveLength:58.2},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E487579-000/00`},{id:`E465751-000`,name:`柔軟羅紋圓領 T 恤 長袖`,en:`ソフトリブクルーネックT`,group:`tops`,type:`top`,sleeve:`long`,neckline:`crew`,silhouette:`fitted`,fabricText:`棉57% 嫘縈39% 彈性纖維4% 羅紋針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`白`,hex:`#f4f2ee`},{name:`淺灰`,hex:`#c9c8c5`},{name:`橘`,hex:`#d9793e`},{name:`咖啡`,hex:`#7a5238`},{name:`奶油`,hex:`#efe4c8`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{length:56,shoulder:32.5,chest:68,sleeveLength:57.8},body:{bust:[73,79]}},{size:`S`,m:{length:57.5,shoulder:33.5,chest:73,sleeveLength:58.8},body:{bust:[77,83]}},{size:`M`,m:{length:59.5,shoulder:34.5,chest:78,sleeveLength:59.2},body:{bust:[81,87]}},{size:`L`,m:{length:61.5,shoulder:36,chest:84,sleeveLength:60.5},body:{bust:[85,91]}},{size:`XL`,m:{length:64,shoulder:37.5,chest:90,sleeveLength:60.8},body:{bust:[91,97]}},{size:`XXL`,m:{length:64,shoulder:38.5,chest:96,sleeveLength:60.8},body:{bust:[97,103]}},{size:`3XL`,m:{length:66,shoulder:39.5,chest:102,sleeveLength:60.8},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E465751-000/00`},{id:`E482982-000`,name:`Ultra Stretch AIRism 洋裝`,en:`ウルトラストレッチエアリズムワンピース/ノースリーブ`,group:`dresses`,type:`dress`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`聚酯纖維100% 彈性 針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`米白`,hex:`#efe9dc`},{name:`深咖啡`,hex:`#4a3326`},{name:`黃`,hex:`#e7c75a`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{length:113,shoulder:31.5,chest:78,hip:120},body:{bust:[73,79],waist:[57,63],hips:[80,86]}},{size:`S`,m:{length:115,shoulder:32.5,chest:83,hip:124.5},body:{bust:[77,83],waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:116.5,shoulder:33.5,chest:88,hip:129},body:{bust:[81,87],waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:118.5,shoulder:34.5,chest:93,hip:133.5},body:{bust:[85,91],waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:120.5,shoulder:35.5,chest:99,hip:139},body:{bust:[91,97],waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:122.5,shoulder:36.5,chest:105,hip:144.5},body:{bust:[97,103],waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{length:124,shoulder:37.5,chest:111,hip:150.5},body:{bust:[103,109],waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E482982-000/00`},{id:`E488722-000`,name:`可機洗羅紋針織洋裝`,en:`ウォッシャブルリブニットワンピース/ノースリーブ`,group:`dresses`,type:`dress`,sleeve:`none`,neckline:`crew`,silhouette:`fitted`,fabricText:`嫘縈72% 聚酯纖維28% 羅紋針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`深灰`,hex:`#55565a`},{name:`咖啡`,hex:`#7a5238`},{name:`深咖啡`,hex:`#4a3326`}],sizes:[{size:`S`,m:{length:110.5,shoulder:29.5,chest:70},body:{bust:[77,83],waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:112,shoulder:30.5,chest:75},body:{bust:[81,87],waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:114,shoulder:32,chest:81},body:{bust:[85,91],waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:116,shoulder:33.5,chest:87},body:{bust:[91,97],waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:118,shoulder:34.5,chest:93},body:{bust:[97,103],waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{length:119.5,shoulder:35.5,chest:99},body:{bust:[103,109],waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E488722-000/00`},{id:`E488186-000`,name:`雙面針織無袖洋裝`,en:`ダブルフェイスニットワンピース`,group:`dresses`,type:`dress`,sleeve:`none`,neckline:`crew`,silhouette:`straight`,fabricText:`棉23% 壓克力21% 聚酯纖維16% 羊毛16% 尼龍13% 嫘縈11% 針織`,colors:[{name:`深咖啡`,hex:`#4a3326`},{name:`黑`,hex:`#1f1f22`}],sizes:[{size:`S`,m:{length:109.5,shoulder:33,chest:81,hip:79},body:{bust:[77,83],waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:111,shoulder:35,chest:86,hip:84},body:{bust:[81,87],waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:113,shoulder:38,chest:92,hip:90},body:{bust:[85,91],waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:115,shoulder:41,chest:98,hip:96},body:{bust:[91,97],waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:117,shoulder:44,chest:104,hip:102},body:{bust:[97,103],waist:[81,87],hips:[104,110]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E488186-000/00`},{id:`E482285-000`,name:`麻混打褶長裙`,en:`Linen Blend Tuck Long Skirt`,group:`skirts`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`棉66% 麻34% 梭織`,colors:[{name:`米白`,hex:`#efe9dc`},{name:`黑`,hex:`#1f1f22`},{name:`黃`,hex:`#e7c75a`},{name:`海軍藍`,hex:`#232f4b`}],sizes:[{size:`XXS`,m:{length:78,waist:60,hip:141.5,hem:166},body:{waist:[57,63],hips:[83,89]}},{size:`XS`,m:{length:80,waist:64,hip:145.5,hem:170},body:{waist:[61,67],hips:[87,93]}},{size:`S`,m:{length:80,waist:68,hip:149.5,hem:174},body:{waist:[65,71],hips:[91,97]}},{size:`M`,m:{length:80,waist:72,hip:153.5,hem:178},body:{waist:[69,75],hips:[95,101]}},{size:`L`,m:{length:82,waist:78,hip:159.5,hem:184},body:{waist:[75,81],hips:[101,107]}},{size:`XL`,m:{length:82,waist:84,hip:165.5,hem:190},body:{waist:[81,87],hips:[107,113]}},{size:`XXL`,m:{length:84,waist:90,hip:171.5,hem:196},body:{waist:[87,93],hips:[113,119]}}],sizing:`us`,url:`https://www.uniqlo.com/us/en/products/E482285-000/00`},{id:`E482286-000`,name:`層次感長裙`,en:`ティアードマキシスカート`,group:`skirts`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`棉100% 梭織`,colors:[{name:`淺藍`,hex:`#9fc3e0`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`}],sizes:[{size:`XS`,m:{length:87,waist:58,hip:128},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{length:89,waist:62,hip:134},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:89,waist:66,hip:139.5},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:91,waist:70,hip:145.5},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:91,waist:76,hip:154},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:91,waist:82,hip:163},body:{waist:[81,87],hips:[104,110]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E482286-000/00`},{id:`E487996-000`,name:`雪紡百褶中長裙`,en:`シフォンプリーツミディスカート`,group:`skirts`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`聚酯纖維100% 雪紡 梭織`,colors:[{name:`深咖啡`,hex:`#4a3326`},{name:`黑`,hex:`#1f1f22`}],sizes:[{size:`XS`,m:{length:70,waist:61,hip:90.5},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{length:72,waist:65,hip:95},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:72,waist:69,hip:99.5},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:74,waist:73,hip:104},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:74,waist:79,hip:111},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:74,waist:85,hip:117},body:{waist:[81,87],hips:[104,110]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E487996-000/00`},{id:`E487997-000`,name:`刷毛針織喇叭長裙`,en:`ブラッシュドジャージーフレアスカート`,group:`skirts`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`聚酯纖維48% 棉40% 嫘縈12% 針織`,colors:[{name:`灰`,hex:`#9d9c99`},{name:`深灰`,hex:`#55565a`},{name:`深紫`,hex:`#4a3553`}],sizes:[{size:`XS`,m:{length:76,waist:59,hip:92},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{length:78,waist:63,hip:96.5},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{length:78,waist:67,hip:102},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{length:80,waist:71,hip:107.5},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{length:80,waist:77,hip:114.5},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{length:80,waist:83,hip:121},body:{waist:[81,87],hips:[104,110]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E487997-000/00`},{id:`E487016-000`,name:`運動無鋼圈內衣`,en:`ワイヤレスブラ/アクティブ`,group:`sports`,type:`top`,sleeve:`none`,neckline:`scoop`,silhouette:`fitted`,fabricText:`尼龍90% 彈性纖維10% 針織`,colors:[{name:`藍`,hex:`#5a7fb3`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`酒紅`,hex:`#6e2635`}],sizes:[{size:`XS`,m:{chest:70,length:28},body:{bust:[73,79]}},{size:`S`,m:{chest:74,length:28.8},body:{bust:[77,83]}},{size:`M`,m:{chest:78,length:29.6},body:{bust:[81,87]}},{size:`L`,m:{chest:82,length:30.4},body:{bust:[85,91]}},{size:`XL`,m:{chest:88,length:31.2},body:{bust:[91,97]}},{size:`XXL`,m:{chest:94,length:32},body:{bust:[97,103]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E487016-000/00`},{id:`E483458-000`,name:`Ultra Stretch 運動 T 恤`,en:`ウルトラストレッチアクティブT`,group:`sports`,type:`top`,sleeve:`short`,neckline:`crew`,silhouette:`fitted`,fabricText:`聚酯纖維86% 彈性纖維14% 針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`白`,hex:`#f4f2ee`},{name:`深灰`,hex:`#55565a`},{name:`粉紅`,hex:`#e3a7b4`},{name:`綠`,hex:`#5f7556`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{length:46,shoulder:33,chest:75,sleeveLength:12},body:{bust:[73,79]}},{size:`S`,m:{length:48,shoulder:34,chest:80,sleeveLength:12.5},body:{bust:[77,83]}},{size:`M`,m:{length:50,shoulder:35,chest:85,sleeveLength:13},body:{bust:[81,87]}},{size:`L`,m:{length:52,shoulder:36,chest:90,sleeveLength:13.5},body:{bust:[85,91]}},{size:`XL`,m:{length:54,shoulder:37.5,chest:96,sleeveLength:14.2},body:{bust:[91,97]}},{size:`XXL`,m:{length:54,shoulder:38.5,chest:102,sleeveLength:15.2},body:{bust:[97,103]}},{size:`3XL`,m:{length:56,shoulder:39.5,chest:108,sleeveLength:16.2},body:{bust:[103,109]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E483458-000/00`},{id:`E483546-000`,name:`Ultra Stretch 運動緊身褲`,en:`ウルトラストレッチアクティブレギンス`,group:`sports`,type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`fitted`,fabricText:`尼龍77% 彈性纖維23% 針織`,colors:[{name:`深咖啡`,hex:`#4a3326`},{name:`深灰`,hex:`#55565a`},{name:`黑`,hex:`#1f1f22`},{name:`酒紅`,hex:`#6e2635`},{name:`綠`,hex:`#5f7556`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{waist:48,hip:67,legOpening:16,thigh:44,inseam:59},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{waist:52,hip:71,legOpening:18,thigh:47,inseam:60.5},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{waist:56,hip:75,legOpening:19,thigh:49,inseam:61},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{waist:60,hip:79,legOpening:20,thigh:52,inseam:61},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{waist:66,hip:85,legOpening:21,thigh:55,inseam:61},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{waist:72,hip:90.5,legOpening:22,thigh:59,inseam:61.5},body:{waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{waist:78,hip:97,legOpening:23,thigh:63,inseam:62},body:{waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E483546-000/00`},{id:`E483296-000`,name:`Ultra Stretch 喇叭運動緊身褲`,en:`ウルトラストレッチアクティブフレアレギンス`,group:`sports`,type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,fabricText:`尼龍77% 彈性纖維23% 針織`,colors:[{name:`深灰`,hex:`#55565a`},{name:`黑`,hex:`#1f1f22`},{name:`深咖啡`,hex:`#4a3326`}],sizes:[{size:`XS`,m:{waist:48,hip:68.5,legOpening:41,thigh:46,inseam:73},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{waist:52,hip:72.5,legOpening:43,thigh:49,inseam:74.5},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{waist:56,hip:76.5,legOpening:44,thigh:51,inseam:75},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{waist:60,hip:81,legOpening:45,thigh:54,inseam:75},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{waist:66,hip:86.5,legOpening:47,thigh:57,inseam:75},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{waist:72,hip:92.5,legOpening:50,thigh:61,inseam:75.5},body:{waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{waist:78,hip:98.5,legOpening:52,thigh:65,inseam:76},body:{waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E483296-000/00`},{id:`E483294-000`,name:`Ultra Stretch 運動短褲`,en:`ウルトラストレッチアクティブショーツ`,group:`sports`,type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`straight`,fabricText:`聚酯纖維72% 彈性纖維28% 梭織`,colors:[{name:`深灰`,hex:`#55565a`},{name:`白`,hex:`#f4f2ee`},{name:`黑`,hex:`#1f1f22`},{name:`藍`,hex:`#5a7fb3`}],sizes:[{size:`XS`,m:{waist:51,hip:91.5,legOpening:59,thigh:62,inseam:9},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{waist:55,hip:95.5,legOpening:62,thigh:64,inseam:9},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{waist:59,hip:99.5,legOpening:64,thigh:67,inseam:9},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{waist:63,hip:104,legOpening:67,thigh:70,inseam:9},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{waist:69,hip:109.5,legOpening:70,thigh:73,inseam:9},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{waist:75,hip:115.5,legOpening:74,thigh:77,inseam:9},body:{waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{waist:81,hip:121,legOpening:78,thigh:81,inseam:9},body:{waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E483294-000/00`},{id:`E483295-000`,name:`Ultra Stretch 單車短褲`,en:`ウルトラストレッチアクティブバイカーショーツ`,group:`sports`,type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`fitted`,fabricText:`尼龍77% 彈性纖維23% 針織`,colors:[{name:`黑`,hex:`#1f1f22`},{name:`深灰`,hex:`#55565a`},{name:`綠`,hex:`#5f7556`}],sizes:[{size:`XS`,m:{waist:48,hip:68,legOpening:36,thigh:45,inseam:12.5},body:{waist:[57,63],hips:[80,86]}},{size:`S`,m:{waist:52,hip:72,legOpening:39,thigh:47.5,inseam:12.5},body:{waist:[61,67],hips:[84,90]}},{size:`M`,m:{waist:56,hip:76.5,legOpening:41,thigh:50,inseam:12.5},body:{waist:[65,71],hips:[88,94]}},{size:`L`,m:{waist:60,hip:81,legOpening:44,thigh:52.5,inseam:12.5},body:{waist:[69,75],hips:[92,98]}},{size:`XL`,m:{waist:66,hip:87,legOpening:47,thigh:56,inseam:12.5},body:{waist:[75,81],hips:[98,104]}},{size:`XXL`,m:{waist:72,hip:93,legOpening:51,thigh:60,inseam:12.5},body:{waist:[81,87],hips:[104,110]}},{size:`3XL`,m:{waist:78,hip:99,legOpening:55,thigh:64,inseam:12.5},body:{waist:[87,93],hips:[110,116]}}],sizing:`asia`,url:`https://www.uniqlo.com/jp/ja/products/E483295-000/00`},{id:`E483282-000`,name:`寬版運動褲`,en:`Wide Sweatpants`,group:`sports`,type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`oversized`,fabricText:`棉86% 聚酯纖維14% 針織`,colors:[{name:`灰`,hex:`#9d9c99`},{name:`黑`,hex:`#1f1f22`}],sizes:[{size:`XXS`,m:{waist:59,hip:107.5,legOpening:58,thigh:70},body:{bust:[75,81],waist:[57,63],hips:[83,89]}},{size:`XS`,m:{waist:63,hip:111,legOpening:60,thigh:73},body:{bust:[79,85],waist:[61,67],hips:[87,93]}},{size:`S`,m:{waist:67,hip:115,legOpening:62,thigh:76},body:{bust:[83,89],waist:[65,71],hips:[91,97]}},{size:`M`,m:{waist:71,hip:119,legOpening:64,thigh:78},body:{bust:[87,93],waist:[69,75],hips:[95,101]}},{size:`L`,m:{waist:77,hip:125,legOpening:66,thigh:82},body:{bust:[93,99],waist:[75,81],hips:[101,107]}},{size:`XL`,m:{waist:83,hip:130.5,legOpening:69,thigh:86},body:{bust:[99,105],waist:[81,87],hips:[107,113]}},{size:`XXL`,m:{waist:91,hip:138,legOpening:72,thigh:90},body:{bust:[105,111],waist:[87,93],hips:[113,119]}}],sizing:`us`,url:`https://www.uniqlo.com/us/en/products/E483282-000/00`}],yp=e=>vp.find(t=>t.id===e);function bp(e,t){let n=e.sizes.find(e=>e.size===`M`)??e.sizes[Math.floor(e.sizes.length/2)],r=n.m.length??(e.type===`dress`?115:60),i=e.type===`dress`?r/110:e.type===`skirt`?r/58:e.type===`pants`?(300+(n.m.inseam??76)*7.4)/860:r/60;return _p({type:e.type,sleeve:e.sleeve,neckline:e.neckline,silhouette:e.silhouette,length:i,colors:[e.colors[t]?.hex??e.colors[0].hex],pattern:/羅紋/.test(e.name)?`rib`:`solid`,straps:/細肩帶/.test(e.name),pleated:/百褶/.test(e.name)})}function xp(e){return{unit:`cm`,flat:!1,rows:e.sizes.map(e=>({size:e.size,values:{...e.m},ranges:{}})),warnings:[]}}function Sp(e,t){let n=e.type===`top`?[`bust`]:e.type===`dress`?[`bust`,`waist`,`hips`]:[`waist`,`hips`],r=null,i=1/0;for(let a of e.sizes){if(!a.body)continue;let e=0,o=0;for(let r of n){let n=a.body[r];if(!n)continue;let i=t[r],s=(n[0]+n[1])/2;e+=(i<n[0]?n[0]-i:i>n[1]?i-n[1]:0)*10+Math.abs(i-s)*.1,o++}o&&e<i&&(i=e,r=a.size)}return r}function Cp(e,t,n){let r=e.sizes.findIndex(e=>e.size===t),i=e.sizes.findIndex(e=>e.size===n),a=e.sizing===`us`?`（美版尺寸）`:``;return r===i?`${t} 建議尺碼${a}`:`${t} 比建議${r>i?`大`:`小`} ${Math.abs(r-i)} 號${a}`}function wp(e,t,n,r){let i=id(e.fabricText),a=xp(e),o=Sp(e,n)??jf(a.rows,n,e.type,i,e.sleeve).best.size,s=a.rows.find(e=>e.size===r)??a.rows.find(e=>e.size===o)??a.rows[0],c=e.colors[t]??e.colors[0],l=gd(e.type,{sleeve:e.sleeve,neckline:e.neckline,silhouette:e.silhouette,rise:`natural`,color:c.hex,pleated:/百褶/.test(e.name)},n);return l.m={...l.m,...s.values},e.type===`pants`&&s.values.inseam!==void 0&&(l.m.length=Math.round(n.waistY+pd(`pants`,l.rise)*100-n.crotchY+s.values.inseam)),e.type===`skirt`&&s.values.hem===void 0&&l.m.hip&&(l.m.hem=Math.max(l.m.hem??0,l.m.hip*(/百褶/.test(e.name)?1.8:1.3))),l.size=s.size,l.fabric=i,{spec:l,cutout:null,chart:a,fit:kf(s,n,e.type,i,e.sleeve),recommended:o}}var Tp=e=>new Promise((t,n)=>e.toBlob(e=>e?t(e):n(Error(`toBlob failed`)),`image/png`)),Ep=`3`,Dp={skirts:`2`,sports:`2`};async function Op(e=!1){let t=`closet2.uniqloSeeded`,n=null;try{n=localStorage.getItem(t)}catch{}if(!e&&n===Ep)return 0;let r=Date.now()-1e5,i=0,a=new Map((await tp.list()).map(e=>[e.id,e]));for(let[t,o]of vp.entries()){let s=`uniqlo-`+o.id,c=a.get(s);if(c){c.name!==`U牌 `+o.name&&await tp.put({...c,name:`U牌 `+o.name});continue}let l=(Dp[o.group]??`1`)>(n??`0`);if(!e&&n&&!l)continue;let u=Bd(bp(o,0)),d=document.createElement(`canvas`);d.width=d.height=96;let f=Math.min(96/u.width,96/u.height);d.getContext(`2d`).drawImage(u.canvas,(96-u.width*f)/2,(96-u.height*f)/2,u.width*f,u.height*f);let p={id:s,name:`U牌 `+o.name,createdAt:r-t*1e3,plainBack:!1,fabricText:o.fabricText,spec:{type:o.type,sleeve:o.sleeve,neckline:o.neckline,silhouette:o.silhouette,rise:`natural`,m:{},fabric:id(o.fabricText)},thumb:await Tp(d),color:u.color,uniqlo:{id:o.id,color:0}};await tp.put(p),i++}try{localStorage.setItem(t,Ep)}catch{}return i}var kp=[{name:`瑜伽`,items:[{id:`E487016-000`,color:`黑`},{id:`E483546-000`,color:`黑`}]},{name:`跑步`,items:[{id:`E483458-000`,color:`白`},{id:`E483294-000`,color:`黑`}]},{name:`健身`,items:[{id:`E487016-000`,color:`藍`},{id:`E483295-000`,color:`黑`}]},{name:`休閒運動`,items:[{id:`E483458-000`,color:`黑`},{id:`E483282-000`,color:`灰`}]},{name:`喇叭褲運動`,items:[{id:`E465760-000`,color:`白`},{id:`E483296-000`,color:`黑`}]},{name:`長裙日常`,items:[{id:`E465760-000`,color:`黑`},{id:`E482285-000`,color:`米白`}],tucked:!0},{name:`層次長裙`,items:[{id:`E424873-000`,color:`白`},{id:`E482286-000`,color:`黑`}],tucked:!0}];function Ap(e,t){return Math.max(0,e.colors.findIndex(e=>e.name===t))}var jp=[`top`,`dress`,`skirt`,`pants`],Mp=[`none`,`short`,`elbow`,`long`],Np=[`crew`,`v`,`scoop`,`boat`],Pp=[`fitted`,`straight`,`aline`,`oversized`],Fp=[`solid`,`stripe`,`pinstripe`,`plaid`,`gingham`,`floral`,`dots`,`rib`,`denim`,`knit`,`text`];function Ip(e,t){return`你是服裝設計助理。依照使用者的描述，設計 ${t} 件女裝單品${t>1?`，彼此要好搭配`:``}。
只輸出 JSON 陣列，不要任何其他文字。每件的格式：
{"name":"繁體中文品名（10 字內）","type":"top|dress|skirt|pants","sleeve":"none|short|elbow|long","neckline":"crew|v|scoop|boat","silhouette":"fitted|straight|aline|oversized","length":數字,"colors":["#底色","#花紋色1","#花紋色2"],"pattern":"${Fp.join(`|`)}","text":"只有 pattern 為 text 時的印字（英文，14 字內）","fabric":"材質，例如 棉95% 彈性纖維5% 針織","pleated":是否百褶(true/false)}
length：1 是該類型的一般長度；0.7 是短版，1.3 是長版，長裙或長洋裝用 1.5。
裙子和褲子的 sleeve 用 none、neckline 用 crew。
使用者的描述：${e}`}var Lp=(e,t,n,r)=>typeof e==`number`&&Number.isFinite(e)?Math.max(t,Math.min(n,e)):r,Rp=(e,t,n)=>t.includes(e)?e:n,zp=e=>typeof e==`string`&&/^#[0-9a-f]{6}$/i.test(e)?e:null;function Bp(e){let t=e.indexOf(`[`),n=e.lastIndexOf(`]`);if(t<0||n<=t)throw Error(`AI 沒有回傳衣服清單`);let r=JSON.parse(e.slice(t,n+1));if(!Array.isArray(r))throw Error(`AI 回傳格式不對`);return r.slice(0,12).map((e,t)=>Vp(e,t))}function Vp(e,t){let n=Rp(e?.type,jp,`top`),r=(Array.isArray(e?.colors)?e.colors:[]).map(zp).filter(Boolean);return{name:String(e?.name??`新衣服`).slice(0,16),type:n,sleeve:n===`skirt`||n===`pants`?`none`:Rp(e?.sleeve,Mp,`short`),neckline:Rp(e?.neckline,Np,`crew`),silhouette:Rp(e?.silhouette,Pp,n===`skirt`||n===`dress`?`aline`:`straight`),length:Lp(e?.length,.6,1.7,1),colors:r.length?r:[`#8a95a8`],pattern:Rp(e?.pattern,Fp,`solid`),text:typeof e?.text==`string`?e.text.slice(0,14):void 0,fabric:typeof e?.fabric==`string`&&e.fabric.trim()?e.fabric.slice(0,40):`棉100%`,straps:!1,pleated:e?.pleated===!0&&(n===`skirt`||n===`dress`),seed:17+t*31}}var Hp=[[/酒紅|勃根地/,`#6e2635`],[/紅/,`#b8323a`],[/粉/,`#e3a7b4`],[/橘|橙/,`#d9793e`],[/黃|芥末/,`#e0b84a`],[/卡其|駝/,`#b9a079`],[/米白|奶油|象牙/,`#efe7d6`],[/米|杏/,`#d8c3a3`],[/白/,`#f4f2ee`],[/淺灰/,`#c9c8c5`],[/深灰|炭/,`#4b4c50`],[/灰/,`#9d9c99`],[/黑/,`#1f1f22`],[/海軍|藏青|深藍/,`#232f4b`],[/丹寧|牛仔/,`#3d5a80`],[/天藍|淺藍|水藍/,`#9fc3e0`],[/藍/,`#4f6fa8`],[/墨綠|深綠/,`#2f4a3a`],[/橄欖|軍綠/,`#6b6b3e`],[/綠/,`#5f8a5c`],[/紫/,`#76608f`],[/咖啡|棕|褐/,`#7a5238`]];function Up(e,t=0){let n=e,r=/洋裝|連身|禮服|dress/i.test(n)?`dress`:/褲/.test(n)?`pants`:/裙/.test(n)?`skirt`:`top`,i=/無袖|背心|細肩|削肩/.test(n)?`none`:/長袖/.test(n)?`long`:/五分|七分|中袖/.test(n)?`elbow`:`short`,a=/v ?領/i.test(n)?`v`:/一字|平口/.test(n)?`boat`:/u ?領|方領|大圓領/i.test(n)?`scoop`:`crew`,o=/寬|oversize|落肩/i.test(n)?`oversized`:/a ?字|傘|蓬|喇叭|百褶|層次/i.test(n)?`aline`:/合身|修身|緊身|貼身|窄/.test(n)?`fitted`:r===`skirt`||r===`dress`?`aline`:`straight`,s=/迷你|短版|短褲|短裙/.test(n)?.7:/長裙|長洋裝|及踝|maxi/i.test(n)?1.5:/長版|中長|過膝/.test(n)?1.25:1,c=/細條紋/.test(n)?`pinstripe`:/條紋|橫紋/.test(n)?`stripe`:/格紋|蘇格蘭/.test(n)?`plaid`:/格子|方格|千鳥/.test(n)?`gingham`:/碎花|花朵|印花|花/.test(n)?`floral`:/點點|圓點|波卡/.test(n)?`dots`:/牛仔|丹寧/.test(n)?`denim`:/羅紋|坑條/.test(n)?`rib`:/針織|毛衣/.test(n)?`knit`:`solid`,l=[],u=n;for(let[e,t]of Hp)e.exec(u)&&(l.push(t),u=u.replace(e,``));c===`denim`&&!l.length&&l.push(`#3d5a80`),l.length||l.push([`#f4f2ee`,`#1f1f22`,`#8a95a8`,`#d8c3a3`][t%4]),c!==`solid`&&c!==`denim`&&c!==`rib`&&c!==`knit`&&l.length<2&&l.push(l[0]===`#f4f2ee`?`#232f4b`:`#f4f2ee`);let d=/百褶|褶裙|pleat/i.test(n),f=c===`denim`?`棉98% 彈性纖維2% 牛仔布`:/雪紡/.test(n)?`聚酯纖維100% 雪紡 梭織`:/麻/.test(n)?`棉70% 麻30% 梭織`:/針織|羅紋|t恤|t 恤|背心/i.test(n)||r===`top`?`棉100% 針織`:`棉100% 梭織`;return{name:n.replace(/\s+/g,``).slice(0,12)||`新衣服`,type:r,sleeve:r===`skirt`||r===`pants`?`none`:i,neckline:a,silhouette:o,length:s,colors:l,pattern:c,fabric:f,pleated:d,seed:17+t*31}}function Wp(e){let t=e.split(/[、，,；;＋+\n]|和|跟|配/).map(e=>e.trim()).filter(e=>/衣|t恤|t 恤|襯衫|背心|洋裝|連身|裙|褲|毛衣|上衣/i.test(e));return(t.length?t:[e]).slice(0,12).map((e,t)=>Up(e,t))}function Gp(e){switch(e.type){case`dress`:return e.silhouette===`fitted`?`E488722-000`:e.silhouette===`straight`?`E488186-000`:`E482982-000`;case`skirt`:return e.pleated?`E487996-000`:e.silhouette===`fitted`||e.silhouette===`straight`?`E487997-000`:`E482286-000`;case`pants`:return e.silhouette===`fitted`?`E483546-000`:e.silhouette===`aline`?`E483296-000`:`E483282-000`;default:return e.sleeve===`none`?e.silhouette===`fitted`?`E482195-000`:`E473980-000`:e.sleeve===`long`?e.silhouette===`fitted`?`E487579-000`:`E465751-000`:e.silhouette===`oversized`?`E465755-000`:e.silhouette===`fitted`?`E465760-000`:`E424873-000`}}function Kp(e,t,n,r){let i=yp(t),a=wp(i,0,n,r),o=gd(e.type,{sleeve:e.sleeve,neckline:e.neckline,silhouette:e.silhouette,rise:`natural`,color:e.colors[0],pleated:e.pleated},n),s=[`chest`,`waist`,`hip`,`hem`,`shoulder`,`thigh`,`legOpening`,`upperArm`],c={...o.m};for(let t of s)a.spec.m[t]!==void 0&&i.type===e.type&&(c[t]=a.spec.m[t]);c.length&&=Math.round(c.length*(e.length??1));let l={...o,m:c,size:a.spec.size,fabric:id(e.fabric??`棉100%`)};return{...a,spec:l}}var qp=e=>new Promise((t,n)=>e.toBlob(e=>e?t(e):n(Error(`toBlob failed`)),`image/png`));async function Jp(e,t=Date.now()){let n=Bd(_p(e)),r=document.createElement(`canvas`);r.width=r.height=96;let i=Math.min(96/n.width,96/n.height);return r.getContext(`2d`).drawImage(n.canvas,(96-n.width*i)/2,(96-n.height*i)/2,n.width*i,n.height*i),{id:`gen-`+crypto.randomUUID(),name:`✦ `+e.name,createdAt:t,plainBack:!1,fabricText:e.fabric,spec:{type:e.type,sleeve:e.sleeve,neckline:e.neckline,silhouette:e.silhouette,rise:`natural`,m:{},fabric:id(e.fabric)},thumb:await qp(r),cutout:await qp(n.canvas),color:n.color,generated:{design:e,base:Gp(e)}}}var Yp=[{id:`default-tee`,name:`印花 T 恤`,sample:`graphicTee`,fabricText:`棉100% 針織`,preset:{type:`top`,sleeve:`short`,neckline:`crew`,silhouette:`straight`,rise:`natural`}},{id:`default-stripe`,name:`條紋長袖上衣`,sample:`stripeLong`,fabricText:`棉95% 彈性纖維5% 針織`,preset:{type:`top`,sleeve:`long`,neckline:`crew`,silhouette:`straight`,rise:`natural`}},{id:`default-tank`,name:`羅紋背心`,sample:`ribTank`,fabricText:`棉92% 彈性纖維8% 羅紋針織`,preset:{type:`top`,sleeve:`none`,neckline:`scoop`,silhouette:`fitted`,rise:`natural`}},{id:`default-dress`,name:`碎花洋裝`,sample:`floralDress`,fabricText:`嫘縈100% 梭織`,preset:{type:`dress`,sleeve:`short`,neckline:`crew`,silhouette:`aline`,rise:`natural`}},{id:`default-skirt`,name:`格紋 A 字裙`,sample:`plaidSkirt`,fabricText:`聚酯纖維65% 嫘縈35% 梭織`,preset:{type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,rise:`natural`}},{id:`default-jeans`,name:`直筒牛仔褲`,sample:`denim`,fabricText:`棉98% 彈性纖維2% 牛仔布`,preset:{type:`pants`,sleeve:`none`,neckline:`crew`,silhouette:`straight`,rise:`natural`}}],Xp=e=>new Promise((t,n)=>e.toBlob(e=>e?t(e):n(Error(`toBlob failed`)),`image/png`));async function Zp(e,t,n,r,i,a=Date.now()){let o=Bd(n),s=document.createElement(`canvas`);s.width=s.height=96;let c=Math.min(96/o.width,96/o.height);return s.getContext(`2d`).drawImage(o.canvas,(96-o.width*c)/2,(96-o.height*c)/2,o.width*c,o.height*c),{id:e,name:t,createdAt:a,plainBack:!1,fabricText:i,preset:r,spec:{type:r.type,sleeve:r.sleeve,neckline:r.neckline,silhouette:r.silhouette,rise:r.rise,m:{},fabric:null},thumb:await Xp(s),cutout:await Xp(o.canvas),color:o.color}}var Qp=`3`,$p=[{id:`default-chiffon-maxi`,item:{name:`雪紡長裙`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,length:1.55,colors:[`#c9a3a0`],pattern:`solid`,fabric:`聚酯纖維100% 雪紡 梭織`,seed:5}},{id:`default-pleated-maxi`,item:{name:`百褶長裙`,type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`aline`,length:1.5,colors:[`#9aa58c`],pattern:`solid`,fabric:`聚酯纖維100% 雪紡 梭織`,pleated:!0,seed:9}}];async function em(e=!1){let t=`closet2.defaultsSeeded`,n=null;try{n=localStorage.getItem(t)}catch{}if(!e&&n===Qp)return 0;let r=!!n&&n!==Qp,i=new Set((await tp.list()).map(e=>e.id)),a=0,o=Date.now()-Yp.length*1e3;for(let[t,s]of Yp.entries())(i.has(s.id)?r||e:!n||e||r&&s.since===Qp)&&(await tp.put(await Zp(s.id,s.name,s.sample?dp(s.sample):_p(s.design),s.preset,s.fabricText,o+(Yp.length-t)*1e3)),a++);for(let[t,s]of $p.entries()){if(!(i.has(s.id)?r||e:!n||e||r))continue;let c=await Jp(s.item,o-(t+1)*1e3);await tp.put({...c,id:s.id,name:s.item.name}),a++}try{localStorage.setItem(t,Qp)}catch{}return a}var tm=`closet2.avatars`,nm={list(){try{return JSON.parse(localStorage.getItem(tm)??`[]`).sort((e,t)=>t.savedAt-e.savedAt)}catch{return[]}},save(e,t){let n=nm.list().filter(t=>t.name!==e),r={id:crypto.randomUUID(),name:e,savedAt:Date.now(),snapshot:t};return localStorage.setItem(tm,JSON.stringify([r,...n])),r},remove(e){try{localStorage.setItem(tm,JSON.stringify(nm.list().filter(t=>t.id!==e)))}catch{}}};function rm(e){return new Blob([JSON.stringify({app:`closet2-avatar`,version:1,...e},null,1)],{type:`application/json`})}function im(e){let t;try{t=JSON.parse(e)}catch{throw Error(`不是假人檔案（無法讀取 JSON）`)}if(t?.app!==`closet2-avatar`||!t.snapshot?.targets)throw Error(`不是這個 App 匯出的假人檔案`);return{name:String(t.name??`匯入的假人`),snapshot:t.snapshot}}function am(e,t=.22,n=1){let r=ql(e,`stand`,n),i=new wt,a=new X(1,0,0);for(let n of e.data.bones){let e=/^finger(\d)-(\d)\.[LR]$/.exec(n.name);if(e){let o=Number(e[1]),s=Number(e[2]),c=o===1?.25:1+(o-2)*.18;i.setFromAxisAngle(a,t*c*(s===1?.6:1)),r[n.name]=[i.x,i.y,i.z,i.w]}/^(metacarpal|wrist\.|lowerarm02\.)/.test(n.name)&&delete r[n.name]}return e.setPose(r),r}function om(e,t){let n=t.length/2;if(n<3)return null;let r=1/0,i=-1/0;for(let e=0;e<n;e++)r=Math.min(r,t[e*2]),i=Math.max(i,t[e*2]);if(i-r<1e-4)return null;let a=new Float32Array(48),o=new Float32Array(48);for(let e=0;e<48;e++){let s=r+(i-r)*e/47,c=1/0,l=-1/0;for(let e=0;e<n;e++){let r=(e+1)%n,i=t[e*2],a=t[e*2+1],o=t[r*2],u=t[r*2+1],d=Math.min(i,o),f=Math.max(i,o);if(s<d-1e-9||s>f+1e-9)continue;let p=f-d<1e-9?(a+u)/2:a+(u-a)*(s-i)/(o-i);c=Math.min(c,p,f-d<1e-9?Math.min(a,u):p),l=Math.max(l,p,f-d<1e-9?Math.max(a,u):p)}Number.isFinite(c)||(c=l=0),a[e]=l,o[e]=c}return{y:e,xl:r,xr:i,front:a,back:o,girth:jl(t)}}function sm(e,t,n){let r=(n-e.xl)/(e.xr-e.xl)*47;if(r<=0)return t[0];if(r>=47)return t[47];let i=Math.floor(r),a=r-i;return t[i]*(1-a)+t[i+1]*a}function cm(e){let t=0,n=(e.xr-e.xl)/47;for(let r=0;r<47;r++)t+=Math.hypot(n,e.front[r+1]-e.front[r])+Math.hypot(n,e.back[r+1]-e.back[r]);return t+Math.abs(e.front[0]-e.back[0])+Math.abs(e.front[47]-e.back[47])}function lm(e,t,n,r){let i=e.data,a=i.bodyVertexCount,o=t.regions,s=t=>e.bonePosed(t),c=i.bones.map(e=>/shoulder01|clavicle/.test(e.name)),l=new Uint8Array(a);for(let e=0;e<a;e++){let t=0;for(let n=0;n<4;n++)c[i.body.skinIdx[e*4+n]]&&(t+=i.body.skinW[e*4+n]);l[e]=+(t>.5)}let u=new Uint8Array(a);for(let e=0;e<a;e++)u[e]=o[e]===Tl.Arm&&l[e]||o[e]===Tl.Head?Tl.Torso:o[e];let d=Ol(i,u,[Tl.Torso]),f=Ol(i,u,[Tl.Torso,Tl.Leg]),p=Ol(i,u,[Tl.Torso,Tl.Arm]),m=1/0,h=-1/0;for(let e=0;e<a;e++)m=Math.min(m,r[e*3+1]),h=Math.max(h,r[e*3+1]);let g=1/0;for(let t=0;t<a;t++)g=Math.min(g,e.rest[t*3+1]);let _=e.joint(`spine05____head`).y-g,v=s(`spine05`).y-_,y=e=>e/100+v,b=s(`neck01`),x=n.neck/100/(2*Math.PI),S=.005,C=.5,w=new Float32Array(201).fill(-1);for(let e=0;e<a;e++){if(o[e]===Tl.Head||o[e]===Tl.Leg)continue;let t=r[e*3],n=r[e*3+1];if(n>b.y+.06)continue;let i=Math.round((t+C)/S);i>=0&&i<w.length&&n>w[i]&&(w[i]=n)}for(let e=0;e<4;e++)for(let e=1;e<w.length-1;e++)w[e]<0&&(w[e]=Math.max(w[e-1],w[e+1]));let T=e=>{let t=(e+C)/S,n=Math.max(0,Math.min(w.length-2,Math.floor(t))),r=Math.max(0,Math.min(1,t-n));return w[n]*(1-r)+w[n+1]*r},E=(e,t,n=1/0,i=0)=>{let a=kl(r,e,[0,t,0],[0,1,0],[1,0,0],[0,0,1]);if(n<1/0||i){let e=[];for(let t=0;t<a.length;t+=2)Math.abs(a[t])<=n&&a[t]*i>=0&&e.push(a[t],a[t+1]);a=e}return a.length<6?null:om(t,Al(a))},D=e=>{let t=1/0;for(let n=0;n<a;n++)o[n]!==Tl.Arm||r[n*3]<.02||Math.abs(r[n*3+1]-e)<.004&&(t=Math.min(t,r[n*3]));return t},O=s(`upperarm01.L`),k=O.y-.06;for(let e=O.y-.02;e>O.y-.25;e-=.004){let t=E(d,e);if(t&&D(e)-t.xr>.004){k=e;break}}let A=e=>{let t=s(`upperarm01.${e}`),n=s(`lowerarm01.${e}`),a=s(`wrist.${e}`),c=s(`finger3-3.${e}`),l=t.distanceTo(n)+n.distanceTo(a),u=Ol(i,o,[Tl.Arm],e===`L`?1:-1),d=[];for(let e=0;e<=10;e++){let i=e/10*l,o=i<t.distanceTo(n)?t:n,s=(i<t.distanceTo(n)?n:a).clone().sub(o),c=i<t.distanceTo(n)?i/s.length():(i-t.distanceTo(n))/s.length(),f=o.clone().addScaledVector(s,Math.min(1,c)),p=s.clone().normalize(),m=new X(0,0,1).cross(p).normalize(),h=p.clone().cross(m),g=kl(r,u,[f.x,f.y,f.z],[p.x,p.y,p.z],[m.x,m.y,m.z],[h.x,h.y,h.z]),_=[];for(let e=0;e<g.length;e+=2)Math.hypot(g[e],g[e+1])<.08&&_.push(g[e],g[e+1]);d.push(_.length>=6?jl(Al(_))/(2*Math.PI):NaN)}for(let e=0;e<=10;e++)Number.isFinite(d[e])||(d[e]=d[e-1]??.04);return{shoulder:t,elbow:n,wrist:a,hand:c,length:l,radius:e=>{let t=Math.max(0,Math.min(1,e))*10,n=Math.min(9,Math.floor(t));return d[n]+(d[n+1]-d[n])*(t-n)}}},j=k,M=.004,N=-.45,P=Math.ceil((h+.05)/M),F=new Float32Array(226*P).fill(-1/0),I=new Float32Array(226*P).fill(1/0);{let e=i.body.index,t=i.body.src,n=j+.01;for(let i=0;i<e.length;i+=3){let a=t[e[i]],o=t[e[i+1]],s=t[e[i+2]];if([a,o,s].some(e=>u[e]===Tl.Arm&&r[e*3+1]<n))continue;let c=r[a*3],l=r[a*3+1],d=r[a*3+2],f=r[o*3],p=r[o*3+1],m=r[o*3+2],h=r[s*3],g=r[s*3+1],_=r[s*3+2],v=(p-g)*(c-h)+(h-f)*(l-g);if(Math.abs(v)<1e-14)continue;let y=Math.max(0,Math.floor((Math.min(c,f,h)-N)/M)),b=Math.min(225,Math.ceil((Math.max(c,f,h)-N)/M)),x=Math.max(0,Math.floor(Math.min(l,p,g)/M)),S=Math.min(P-1,Math.ceil(Math.max(l,p,g)/M));for(let e=x;e<=S;e++)for(let t=y;t<=b;t++){let n=N+t*M,r=e*M,i=((p-g)*(n-h)+(h-f)*(r-g))/v,a=((g-l)*(n-h)+(c-h)*(r-g))/v,o=1-i-a;if(i<-.02||a<-.02||o<-.02)continue;let s=i*d+a*m+o*_,u=e*226+t;s>F[u]&&(F[u]=s),s<I[u]&&(I[u]=s)}}}let L=(e,t,n)=>{let r=t?Math.max:Math.min,i=t?Math.min:Math.max,a=t?-1/0:1/0,o=(e,t,r,i)=>{let o=new Float32Array(e.length);for(let s=0;s<P;s++)for(let c=0;c<226;c++){let l=s*226+c;if(i&&e[l]===a){o[l]=a;continue}let u=e[l];for(let i=-n;i<=n;i++){let n=r?c+i:c,o=r?s:s+i;if(n<0||o<0||n>=226||o>=P)continue;let l=e[o*226+n];l!==a&&(u=u===a?l:t(u,l))}o[l]=u}return o},s=o(o(o(o(e,r,!0,!1),r,!1,!1),i,!0,!1),i,!1,!1);for(let t=0;t<s.length;t++)e[t]===a&&(s[t]=a);return s},R=L(F,!0,3),ee=L(I,!1,3),te=(e,t,n,r)=>{let i=(t-N)/M,a=n/M,o=Math.floor(i),s=Math.floor(a),c=r?-1/0:1/0;for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++){let i=o+n,a=s+t;if(i<0||a<0||i>=226||a>=P)continue;let l=e[a*226+i];c=r?Math.max(c,l):Math.min(c,l)}return c},z=E(d,y(n.waistY)),ne=z?(sm(z,z.front,0)+sm(z,z.back,0))/2:0,re=new Uint32Array(i.body.index.length);for(let e=0;e<re.length;e++)re[e]=i.body.src[i.body.index[e]];let B=Sl(r,re,a),ie=e=>{let t=[];for(let n=0;n<a;n++)(o[n]===Tl.Arm||l[n])&&r[n*3]*e>.05&&t.push(n);let n=new Float32Array(t.length*3),i=new Float32Array(t.length*3);return t.forEach((e,t)=>{for(let a=0;a<3;a++)n[t*3+a]=r[e*3+a],i[t*3+a]=B[e*3+a]}),{pos:n,normals:i,count:t.length}};return{body:e,m:n,pos:r,normals:B,neck:b,neckR:x,topY:T,cz:ne,y:{neck:b.y,shoulder:T(n.shoulder/200),armpit:k,bust:y(n.bustY),underbust:y(n.bustY)-.075*(n.height/160),waist:y(n.waistY),hip:y(n.hipY),crotch:y(n.crotchY),knee:y(n.kneeY),ankle:s(`foot.L`).y,top:h},torsoSection:(e,t)=>E(d,e,t),yokeSection:(e,t)=>E(p,e,t),lowerSection:e=>E(f,e),legSection:(e,t)=>E(f,e,1/0,t),arms:{L:A(`L`),R:A(`R`)},joints:Object.fromEntries([[`shoulder`,`upperarm01`],[`elbow`,`lowerarm01`],[`wrist`,`wrist`],[`hip`,`upperleg01`],[`knee`,`lowerleg01`],[`ankle`,`foot`]].flatMap(([e,t])=>[`L`,`R`].map(n=>[e+n,s(`${t}.${n}`)]))),ridgeZ:e=>{let t=Math.max(0,Math.min(225,Math.round((e-N)/M)));for(let e=P-1;e>=0;e--){let n=e*226+t;if(F[n]!==-1/0&&e*M<b.y+.03){let n=0,r=0,i=0;for(let a=0;a<3&&e-a>=0;a++){let o=(e-a)*226+t;F[o]!==-1/0&&(n+=F[o],r+=I[o],i++)}return(n+r)/2/i}}return b.z},armVerts:{L:ie(1),R:ie(-1)},frontDepth:(e,t)=>te(R,e,t,!0),backDepth:(e,t)=>te(ee,e,t,!1)}}var um=(e,t,n)=>e+(t-e)*n,dm=(e,t,n)=>Math.max(t,Math.min(n,e)),fm=e=>{let t=dm(e,0,1);return t*t*(3-2*t)};function pm(e,t){let n=new Float32Array(48),r=new Float32Array(48);for(let i=0;i<48;i++)n[i]=e.front[i]+t,r[i]=e.back[i]-t;return{y:e.y,xl:e.xl-t,xr:e.xr+t,front:n,back:r,girth:e.girth+t*2*Math.PI}}function mm(e,t){for(let n=0;n<48;n++){let r=e.xl+(e.xr-e.xl)*n/47;t.push(r,e.front[n],r,e.back[n])}}function hm(e,t,n){let r=[];return mm(e,r),mm(t,r),om(n,Al(r))}function gm(e,t,n,r){let i=new Float32Array(48),a=new Float32Array(48);for(let r=0;r<48;r++)i[r]=um(e.front[r],t.front[r],n),a[r]=um(e.back[r],t.back[r],n);let o={y:r,xl:um(e.xl,t.xl,n),xr:um(e.xr,t.xr,n),front:i,back:a,girth:0};return o.girth=cm(o),o}function _m(e,t,n){let r=(e.xl+e.xr)/2,i=(e.front[24]+e.back[24])/2,a=new Float32Array(48),o=new Float32Array(48);for(let n=0;n<48;n++)a[n]=i+(e.front[n]-i)*(1+.3*t),o[n]=i+(e.back[n]-i)*(1+.3*t);let s={y:n,xl:r+(e.xl-r)*(1+t),xr:r+(e.xr-r)*(1+t),front:a,back:o,girth:0};return s.girth=cm(s),s}function vm(e,t,n){let r=Math.max(e.xl,t),i=Math.min(e.xr,n);if(r<=e.xl&&i>=e.xr)return e;let a=new Float32Array(48),o=new Float32Array(48);for(let t=0;t<48;t++){let n=r+(i-r)*t/47;a[t]=sm(e,e.front,n),o[t]=sm(e,e.back,n)}let s={y:e.y,xl:r,xr:i,front:a,back:o,girth:0};return s.girth=cm(s),s}function ym(e,t){let n=(Array.isArray(t)?t:t?[t]:[]).filter(e=>e.outer);return n.length?t=>{let r=e(t);for(let e of n){let n=e.outer(t);n&&(r=r?hm(r,pm(n,.008),t):pm(n,.008))}return r}:e}function bm(e,t,n,r){for(let i=0;i<30;i++){let i=(n+r)/2;e(i)<t?n=i:r=i}return(n+r)/2}function xm(e,t,n,r,i,a,o=.005,s){let c=[],l=null;for(let u=e;u>=t-1e-9;u-=o){let e=r(u),t=e?pm(e,i):null,o=s?.(u)??1/0;l&&Number.isFinite(o)&&(l=vm(l,-o,o));let d;d=l?t?hm(l,t,u):{...l,y:u}:t;let f=n(u);if(!Number.isFinite(f)){l=d,c.push({y:u,vis:d,hidden:0,strain:1.1});continue}let p=cm(d),m=1.15;if(p>f&&t){let e=cm(t);if(e>=f)d=t,m=f/e;else{let e=bm(e=>cm(gm(t,d,e,u)),f,0,1);d=gm(t,d,e,u),m=1}}l=d;let h=cm(d),g=d,_=0;if(f>h){let e=bm(e=>cm(_m(d,e,u)),h+a*(f-h),0,3);g=_m(d,e,u),_=(1-a)*(f-h),m=f/Math.max(1e-6,t?cm(t):h)}c.push({y:u,vis:g,hidden:_,strain:m})}return c}function Sm(e,t){for(let n=0;n<t;n++){let t=e.map(e=>e.vis);for(let n=1;n<e.length-1;n++){let r=t[n-1],i=t[n],a=t[n+1],o=new Float32Array(48),s=new Float32Array(48);for(let e=0;e<48;e++)o[e]=(r.front[e]+2*i.front[e]+a.front[e])/4,s[e]=(r.back[e]+2*i.back[e]+a.back[e])/4;let c={y:i.y,xl:(r.xl+2*i.xl+a.xl)/4,xr:(r.xr+2*i.xr+a.xr)/4,front:o,back:s,girth:0};c.girth=cm(c),e[n]={...e[n],vis:c,strain:(e[n-1].strain+2*e[n].strain+e[n+1].strain)/4}}}}var Cm=class{rows;constructor(e){this.rows=e}idx(e){let t=this.rows;if(e>=t[0].y)return[0,0];let n=t[0].y-t[+(1<t.length)].y||1,r=(t[0].y-e)/n;if(r>=t.length-1)return[t.length-1,0];let i=Math.floor(r);return[i,r-i]}at(e){let[t,n]=this.idx(e),r=this.rows[t],i=this.rows[Math.min(this.rows.length-1,t+1)];return{sec:r.vis,next:i.vis,hidden:um(r.hidden,i.hidden,n),strain:um(r.strain,i.strain,n),f:n}}frontZ(e,t,n=!1){let{sec:r,next:i,f:a}=this.at(t);return um(sm(r,n?r.back:r.front,e),sm(i,n?i.back:i.front,e),a)}extent(e){let{sec:t,next:n,f:r}=this.at(e);return[um(t.xl,n.xl,r),um(t.xr,n.xr,r)]}};function wm(e,t,n,r,i,a){let o=new Float32Array(i*a*2),s=e(0),c=e(1),l=t(0),u=t(1);for(let d=0;d<a;d++){let f=d/(a-1),p=n(f),m=r(f);for(let n=0;n<i;n++){let r=n/(i-1),a=e(r),h=t(r);for(let e=0;e<2;e++)o[(d*i+n)*2+e]=(1-f)*a[e]+f*h[e]+(1-r)*p[e]+r*m[e]-((1-r)*(1-f)*s[e]+r*(1-f)*c[e]+(1-r)*f*l[e]+r*f*u[e])}}return o}function Tm(e,t,n,r){let i=new Float64Array(t),a=new Float64Array(t),o=new Float64Array(t),s=new Float64Array(t);for(let c=0;c<n;c++)for(let n=0;n<2;n++){for(let n=0;n<t;n++){let r=(c*t+n)*3;a[n]=e[r],o[n]=e[r+1],s[n]=e[r+2]}i[0]=0;for(let e=1;e<t;e++)i[e]=i[e-1]+Math.hypot(a[e]-a[e-1],o[e]-o[e-1],s[e]-s[e-1]);let n=i[t-1];if(n<1e-6)break;let l=0;for(let s=1;s<t-1;s++){let u=n*s/(t-1);for(;l<t-2&&i[l+1]<u;)l++;let d=(u-i[l])/Math.max(1e-9,i[l+1]-i[l]),f=(c*t+s)*3;e[f]=um(a[l],a[l+1],d),e[f+1]=um(o[l],o[l+1],d),e[f+2]=r(e[f],e[f+1])}}}function Em(e,t,n,r){let{cols:i,rows:a}=e,o=e.kind===`back`,s=new Float32Array(i*a),c=new Float32Array(i*a);for(let r=0;r<i*a;r++){s[r]=e.pos[r*3+2];let i=o?t.backDepth(e.pos[r*3],e.pos[r*3+1]):t.frontDepth(e.pos[r*3],e.pos[r*3+1]);c[r]=Number.isFinite(i)?o?i-n:i+n:o?1/0:-1/0}let l=new Float32Array(i*a);for(let e=0;e<r;e++){for(let e=0;e<a;e++)for(let t=0;t<i;t++){let n=e*i+t;if(e===0||t===0||t===i-1){l[n]=s[n];continue}let r=s[n-1]+s[n+1]+s[n-i]+(e<a-1?s[n+i]:s[n]),u=s[n]*.4+r*.15;u=o?Math.min(u,c[n]):Math.max(u,c[n]),l[n]=u}s.set(l)}for(let t=0;t<i*a;t++)e.pos[t*3+2]=s[t]}function Dm(e,t,n,r){let i=new Float32Array(e.rows),a=e.kind===`back`;for(let o=0;o<r;o++){for(let n=0;n<e.rows;n++)i[n]=e.pos[(n*e.cols+t)*3+2];for(let r=1;r<e.rows-1;r++){let o=(r*e.cols+t)*3;if(e.pos[o+1]<n)continue;let s=(i[r-1]+2*i[r]+i[r+1])/4;e.pos[o+2]=a?Math.min(i[r],s):Math.max(i[r],s)}}}function Om(e,t,n,r=-1,i=1/0,a=0,o=0){let s=e.kind===`back`;if(r>=0)for(let a=0;a<e.rows;a++){let o=(a*e.cols+r)*3,s=e.pos[o+1];if(s>i)continue;let c=e.pos[o],l=Math.sign(c)||1;for(let r=0;r<12&&Number.isFinite(t.frontDepth(c,s))&&t.frontDepth(c,s)>e.pos[o+2]-n;r++)c+=l*.003;e.pos[o]=c}for(let c=0;c<e.cols*e.rows;c++){if(r>=0&&c%e.cols===r&&e.pos[c*3+1]<=i||c<a*e.cols&&Math.abs(e.pos[c*3])>o)continue;let l=e.pos[c*3],u=e.pos[c*3+1];if(s){let r=t.backDepth(l,u);Number.isFinite(r)&&e.pos[c*3+2]>r-n&&(e.pos[c*3+2]=r-n)}else{let r=t.frontDepth(l,u);Number.isFinite(r)&&e.pos[c*3+2]<r+n&&(e.pos[c*3+2]=r+n)}}}function km(e,t,n,r,i,a=!1){let o=r*i,s=new Float32Array(o*2);for(let e=0;e<i;e++)for(let t=0;t<r;t++)s[(e*r+t)*2]=t/(r-1),s[(e*r+t)*2+1]=e/(i-1);return{name:e,kind:t,region:n,cols:r,rows:i,wrap:a,pos:new Float32Array(o*3),param:s,strain:new Float32Array(o).fill(1.1),fold:new Float32Array(o)}}function Am(e){let t=Math.sin(e*127.1+311.7)*43758.5453;return t-Math.floor(t)}function jm(e){let t=Math.floor(e),n=e-t,r=n*n*(3-2*n);return um(Am(t),Am(t+1),r)}function Mm(e,t,n){let r=e*t+n,i=.65+.7*jm(e*t*.7+n*3),a=Math.sin(r*2*Math.PI+.6*Math.sin(r*Math.PI+n));return i*(a>0?a**.8:-((-a)**1.3))}function Nm(e,t){let n=t.neckR,r=t.m.height/160;switch(e.neckline){case`v`:return{hw:n+.026,df:.15*r,db:.022,shape:e=>1-e**1.1};case`scoop`:return{hw:n+.045,df:.12*r,db:.03,shape:e=>Math.sqrt(Math.max(0,1-e**3))};case`boat`:return{hw:n+.075,df:.045*r,db:.035,shape:e=>Math.sqrt(Math.max(0,1-e*e))};default:return{hw:n+.02,df:.075*r,db:.02,shape:e=>Math.sqrt(Math.max(0,1-e*e))}}}function Pm(e,t,n={}){return e.type===`top`||e.type===`dress`?Lm(e,t,n):e.type===`skirt`?Um(e,t,n):Gm(e,t,n)}var Fm=(e,t)=>(e??t)/100;function Im(e){let t=e.filter(([e,t])=>Number.isFinite(e)&&Number.isFinite(t)).sort((e,t)=>t[0]-e[0]);return e=>{if(e>=t[0][0])return t[0][1];for(let n=0;n<t.length-1;n++)if(e>=t[n+1][0]){let r=(t[n][0]-e)/(t[n][0]-t[n+1][0]);return um(t[n][1],t[n+1][1],fm(r)*.5+r*.5)}return t[t.length-1][1]}}function Lm(e,t,n){let r=t.m,i=r.height/160,a=t.y,o=e.fabric,s=Math.max(.0035,o.thickness*2+.002),c=dm(.3+(1-o.drape)*.6,.25,.85),l=Nm(e,t),u=e.sleeve===`none`,d=u?Math.min(Fm(e.m.shoulder,r.shoulder)/2,l.hw+.065*i):Fm(e.m.shoulder,r.shoulder+1)/2,f=t.topY(l.hw)+s,p=Fm(e.m.length,60*i),m=Math.max(.05,f-p),h=Fm(e.m.chest,r.bust+8),g=Fm(e.m.waist,h*100-4),_=Fm(e.m.hem,Math.max(g*100,r.hips+4)),v=e.m.hip?e.m.hip/100:void 0,y=a.bust,b=a.waist,x=a.hip,S=[[a.armpit,h],[y,h],[b,g]];v&&S.push([x,v]),m<b-.02&&S.push([m,_]);let C=Im(S.filter(([e])=>e>=m-1e-6).length>=2?S.filter(([e])=>e>=m-1e-6):S),w=Math.max(0,h-r.bust/100),T=a.armpit-(u?.035:.018)-w*.12,E=ym(e=>e>a.waist?t.torsoSection(e):t.lowerSection(e)??t.torsoSection(e),n.over),D=xm(T,T-.01,C,E,s,c)[0].vis,O=Math.max(-D.xl,D.xr),k=e=>t.topY(e)+s,A=k(d),j=e=>{if(e<=T)return O;let t=dm(1-(e-T)/Math.max(1e-4,A-T),0,1),n=Math.sqrt(Math.max(0,1-t*t));return O+(d-O)*n**(u?1:.6)},M=e=>{let t=dm((e-l.hw)/Math.max(1e-4,d-l.hw),0,1);return Math.max(um(f,A,t)*.5+k(e)*.5,k(e)+.002)},N=new Float64Array(65);for(let e=64;e>=0;e--){let t=um(l.hw,d,e/64);N[e]=Math.max(M(t),e<64?N[e+1]:-1/0)}let P=e=>{let t=dm((e-l.hw)/Math.max(1e-4,d-l.hw),0,1)*64,n=Math.min(63,Math.floor(t));return um(N[n],N[n+1],t-n)},F=A-.01,I=xm(F,m,e=>e>T?1/0:C(e),e=>e>T?t.yokeSection(e,j(e)+.004):E(e),s,c,.005,e=>e>T?j(e)+.004:1/0);Sm(I,6);let L=new Cm(I),[R,ee]=L.extent(T),te=(e,n,r)=>{if(n<=F)return L.frontZ(e,n,r);let i=r?t.backDepth(e,n):t.frontDepth(e,n),a=Number.isFinite(i)?r?i-s:i+s:t.ridgeZ(e),o=Math.abs(e);o>=l.hw*.9&&(a=um(t.ridgeZ(e),a,fm((P(Math.max(o,l.hw))-n)/.03)));let c=fm((n-F)/.015);return um(L.frontZ(e,F,r),a,c)},z=[],ne={HPS_L:[l.hw,f],HPS_R:[-l.hw,f],SP_L:[d,A],SP_R:[-d,A],AP_L:[ee,T],AP_R:[R,T],CF:[0,f-l.df],CB:[0,f-l.db],HEM_L:[L.extent(m)[1],m],HEM_R:[L.extent(m)[0],m]},re=L.at(m).sec,B=cm(re)+L.at(m).hidden,ie=um(.11,.2,1-o.drape),ae=Math.max(2,Math.round(B/ie/2)),oe=(e,t)=>{let n=(f-e)/t;if(n>=1)return 0;if(n<=0)return l.hw;let r=0,i=1;for(let e=0;e<30;e++){let e=(r+i)/2;l.shape(e)>n?r=e:i=e}return(r+i)/2*l.hw},se=e=>{let t=l.hw,n=d;for(let r=0;r<30;r++){let r=(t+n)/2;P(r)>e?t=r:n=r}return(t+n)/2},ce=(e,t)=>{if(e>A)return se(e);if(e>T)return j(e);let[n,r]=L.extent(e);return t>0?r:-n},le=Math.max(f,P(l.hw));ne.TOP=[0,le],ne.NECK=[l.hw,l.df];for(let e of[!1,!0])for(let n of[1,-1]){let r=km(`${e?`back`:`front`}${n===1?`L`:`R`}`,e?`back`:`front`,`torso`,40,110),i=e?l.db:l.df;for(let t=0;t<110;t++){let a=um(le,m,t/109),o=oe(a,i),s=Math.max(o,ce(a,n));for(let i=0;i<40;i++){let c=n*um(o,s,i/39),l=(t*40+i)*3;r.pos[l]=c,r.pos[l+1]=a,r.pos[l+2]=te(c,a,e)}}Tm(r.pos,40,110,(t,n)=>te(t,n,e)),Em(r,t,s,20);let a=e?7.3:1.7;for(let t=0;t<110;t++)for(let i=0;i<40;i++){let o=t*40+i,s=r.pos[o*3],c=r.pos[o*3+1];if(c>T)continue;let l=L.at(c),u=cm(l.sec),d=Math.min(.045,Math.sqrt(Math.max(0,l.hidden)*u)/(Math.PI*ae*2)),f=.5+n*(e?-1:1)*(i/39)/2,p=d*Mm(f,ae,a)*fm(Math.min(f,1-f)/.04),m=.001,h=te(s-m,c,e),g=-(te(s+m,c,e)-h)/(2*m),_=1;e&&(g=-g,_=-1);let v=Math.hypot(g,_);r.pos[o*3]+=p*g/v*.5,r.pos[o*3+2]+=p*_/v,r.fold[o]=p,r.strain[o]=l.strain}Om(r,t,s,39,T-.005,2,l.hw+.04),Dm(r,39,T,4),z.push(r)}if(!u)for(let n of[1,-1]){let r=z.find(e=>e.name===(n===1?`frontL`:`frontR`)),i=z.find(e=>e.name===(n===1?`backL`:`backR`));z.push(zm(e,t,n,r,i,{shoulderHalf:d,ySP:A,yArm:T}))}return z.push(Rm(e,t,l,f,d,te)),{spec:e,pieces:z,marks:ne,outer:e=>e<=T&&e>=m?L.at(e).sec:null}}function Rm(e,t,n,r,i,a){let o=km(`collar`,`band`,`collar`,96,3,!0),s=.014*(t.m.height/160);for(let e=0;e<96;e++){let i=e/96*Math.PI*2,c=i<Math.PI,l=Math.abs(Math.cos(i)),u=n.hw*Math.cos(i)*.995,d=r-(c?n.df:n.db)*n.shape(Math.min(1,l)),f=a(u,d-.002,!c);t.neck.z;for(let t=0;t<3;t++){let n=t/2,r=t*96+e,i=d-s*n,l=a(u*(1+.05*n),i,!c),p=(c?1:-1)*.0015;o.pos[r*3]=u*(1+.04*n),o.pos[r*3+1]=i,o.pos[r*3+2]=(n===0?f:l)+p,o.param[r*2]=e/96,o.param[r*2+1]=n}}return o}function zm(e,t,n,r,i,a){let o=n===1?t.arms.L:t.arms.R,s=t.m,c=km(n===1?`sleeveL`:`sleeveR`,`sleeve`,n===1?`sleeveL`:`sleeveR`,57,40,!0),l=e=>{let t=[];for(let n=0;n<e.rows;n++){let r=(n*e.cols+e.cols-1)*3,i=e.pos[r+1];if(!(i>a.ySP+1e-4)){if(i<a.yArm-1e-4)break;t.push([e.pos[r],i,e.pos[r+2]])}}return t},u=l(r),d=l(i),f=[...u,...d.slice(0,-1).reverse()],p=[0];for(let e=1;e<=f.length;e++){let t=f[e-1],n=f[e%f.length];p.push(p[e-1]+Math.hypot(t[0]-n[0],t[1]-n[1],t[2]-n[2]))}let m=p[f.length],h=e=>{let t=(e%1+1)%1*m,n=0;for(;n<f.length-1&&p[n+1]<t;)n++;let r=f[n],i=f[(n+1)%f.length],a=(t-p[n])/Math.max(1e-9,p[n+1]-p[n]);return new X(um(r[0],i[0],a),um(r[1],i[1],a),um(r[2],i[2],a))},g=o.shoulder,_=o.elbow,v=o.wrist,y=_.clone().sub(g),b=v.clone().sub(_),x=y.length(),S=b.length(),C=e=>{let t=y.clone().normalize().lerp(b.clone().normalize(),fm((e-x+.05)/.1)).normalize();if(e<=x)return{p:g.clone().addScaledVector(y,e/x),dir:t};let n=Math.min(1.1,(e-x)/S);return{p:_.clone().addScaledVector(b,n),dir:t}},w=new X(n*a.shoulderHalf,a.ySP,t.arms.L.shoulder.z),T=Math.max(0,w.clone().sub(g).dot(y.clone().normalize())),E=Fm(e.m.sleeveLength,{short:16,elbow:30,long:56,none:0}[e.sleeve]*(s.height/160)),D=Math.min(x+S+.01,T+E),O=e=>o.radius(e)*2*Math.PI,k=Fm(e.m.upperArm,O(.25)*100+(e.silhouette===`oversized`?14:e.silhouette===`fitted`?4:8)),A=Fm(e.m.sleeveOpening,e.sleeve===`long`?O(.98)*100+5:k*100*(e.sleeve===`elbow`?.85:.95)),j=new X(0,-1,0),M=new X(0,0,1),N=0,P=1;for(let e=0;e<40;e++){let t=um(T,D,e/39),{p:n,dir:r}=C(t),i=t/(x+S),a=o.radius(i)+.004,s=um(k,A,fm(dm((t-T-.03)/Math.max(.01,D-T-.03),0,1))),l=Math.max(a+.003,s/(2*Math.PI)),u=j.clone().addScaledVector(r,-j.dot(r)),d=n.clone().addScaledVector(u,(l-a)*.9),g=M.clone().addScaledVector(r,-M.dot(r)).normalize(),_=r.clone().cross(g).normalize(),v=fm((t-T)/.07);e===0&&(N=Vm(f,p,m,g,_,d),P=Hm(f,g,_,d));for(let t=0;t<=56;t++){let n=t/56*Math.PI*2,r=d.clone().addScaledVector(g,Math.cos(n)*l).addScaledVector(_,Math.sin(n)*l),a=h(N+t/56*P).lerp(r,v),o=(e*57+t)*3;c.pos[o]=a.x,c.pos[o+1]=a.y,c.pos[o+2]=a.z,c.strain[e*57+t]=s/(O(i)+1e-6)}}let F=n===1?t.armVerts.L:t.armVerts.R,I=Math.max(.003,e.fabric.thickness*2+.002);for(let e=0;e<3;e++)Ju(c.pos,2280,F.pos,F.normals,F.count,I,.06),e<2&&Bm(c,57,40,3);return c}function Bm(e,t,n,r){let i=new Float32Array(e.pos.length);for(let a=0;a<r;a++){i.set(e.pos);for(let r=1;r<n-1;r++)for(let n=0;n<t;n++){let a=n===0?t-2:n-1,o=n===t-1?1:n+1,s=r*t+n;for(let c=0;c<3;c++){let l=(e.pos[(r*t+a)*3+c]+e.pos[(r*t+o)*3+c]+e.pos[((r-1)*t+n)*3+c]+e.pos[((r+1)*t+n)*3+c])/4;i[s*3+c]=e.pos[s*3+c]*.5+l*.5}}e.pos.set(i)}}function Vm(e,t,n,r,i,a){let o=-1/0,s=0;return e.forEach((e,t)=>{let n=(e[0]-a.x)*r.x+(e[1]-a.y)*r.y+(e[2]-a.z)*r.z;n>o&&(o=n,s=t)}),t[s]/n}function Hm(e,t,n,r){let i=0;for(let a=0;a<e.length;a++){let o=e[a],s=e[(a+1)%e.length],c=(o[0]-r.x)*t.x+(o[1]-r.y)*t.y+(o[2]-r.z)*t.z,l=(o[0]-r.x)*n.x+(o[1]-r.y)*n.y+(o[2]-r.z)*n.z,u=(s[0]-r.x)*t.x+(s[1]-r.y)*t.y+(s[2]-r.z)*t.z,d=(s[0]-r.x)*n.x+(s[1]-r.y)*n.y+(s[2]-r.z)*n.z;i+=c*d-u*l}return i>=0?1:-1}function Um(e,t,n={}){let r=t.m,i=r.height/160,a=t.y,o=e.fabric,s=Math.max(.003,o.thickness*2+.002),c=dm(.12+(1-o.drape)*.35,.1,.45),l=pd(e.type,e.rise),u=a.waist+l*i,d=Math.max(.05,u-Fm(e.m.length,58*i)),f=Fm(e.m.waist,r.waist+2),p=Fm(e.m.hip,r.hips+8),m=Fm(e.m.hem,r.hips+40),h=xm(u,d,Im([[u,f],[a.hip,Math.max(p,f)],[d,Math.max(m,p*.9)]]),ym(e=>e>a.waist?t.torsoSection(e):t.lowerSection(e),n.over),s,c);Sm(h,4);let g=new Cm(h),_=cm(g.at(d).sec)+g.at(d).hidden,v=e.pleated?.045:um(.07,.22,1-o.drape),y=Math.max(2,Math.round(_/v/2)),b=[];for(let n of[!1,!0]){let r=km(n?`back`:`front`,n?`back`:`front`,`torso`,72,70),i=wm(e=>{let[t,r]=g.extent(u);return[n?um(r,t,e):um(t,r,e),u]},e=>{let[t,r]=g.extent(d);return[n?um(r,t,e):um(t,r,e),d]},e=>{let t=um(u,d,e),[r,i]=g.extent(t);return[n?i:r,t]},e=>{let t=um(u,d,e),[r,i]=g.extent(t);return[n?r:i,t]},72,70),a=(e,t)=>g.frontZ(e,t,n);for(let e=0;e<5040;e++)r.pos[e*3]=i[e*2],r.pos[e*3+1]=i[e*2+1],r.pos[e*3+2]=a(i[e*2],i[e*2+1]);Tm(r.pos,72,70,a),Wm(r,g,y,n,a,n?5.1:2.3,e.pleated?u-.06:null),Om(r,t,s),b.push(r)}return{spec:e,pieces:b,outer:e=>{if(e>u+.005||e<d)return null;let t=g.at(e),n=Math.min(.05,Math.sqrt(Math.max(0,t.hidden)*cm(t.sec))/(Math.PI*y*2));return n>.001?pm(t.sec,n):t.sec},marks:{WAIST_L:[g.extent(u)[1],u],WAIST_R:[g.extent(u)[0],u],HEM_L:[g.extent(d)[1],d],HEM_R:[g.extent(d)[0],d]}}}function Wm(e,t,n,r,i,a,o=null){let{cols:s,rows:c}=e;for(let l=0;l<c;l++)for(let c=0;c<s;c++){let u=l*s+c,d=e.pos[u*3],f=e.pos[u*3+1],p=t.at(f),m=cm(p.sec),h=c/(s-1),g;if(o!==null){let e=fm((o-f)/.1),t=Math.min(.018,.008+Math.sqrt(Math.max(0,p.hidden)*m)/(Math.PI*n*4))*e,r=h*n*2;g=t*(Math.abs((r%2+2)%2-1)*2-1)*fm(Math.min(h,1-h)/.02)}else g=Math.min(.05,Math.sqrt(Math.max(0,p.hidden)*m)/(Math.PI*n*2))*Mm(h,n,a)*fm(Math.min(h,1-h)/.03);let _=.001,v=-(i(d+_,f)-i(d-_,f))/(2*_),y=1;r&&(v=-v,y=-1);let b=Math.hypot(v,y);e.pos[u*3]+=g*v/b*.5,e.pos[u*3+2]+=g*y/b,e.fold[u]=g,e.strain[u]=p.strain}}function Gm(e,t,n={}){let r=t.m,i=r.height/160,a=t.y,o=e.fabric,s=Math.max(.003,o.thickness*2+.002),c=dm(.35+(1-o.drape)*.5,.3,.85),l=pd(e.type,e.rise),u=a.waist+l*i,d=Fm(e.m.inseam,r.inseam),f=a.crotch-.015,p=Math.max(.02,Math.min(f-.03,e.m.length?u-e.m.length/100:f-d)),m=Fm(e.m.waist,r.waist+2),h=Fm(e.m.hip,r.hips+6),g=Fm(e.m.thigh,r.thigh+8),_=Fm(e.m.legOpening,38),v=xm(u,f,Im([[u,m],[a.hip,Math.max(h,m)],[f,h]]),ym(e=>e>a.waist?t.torsoSection(e):t.lowerSection(e),n.over),s,c);Sm(v,4);let y=new Cm(v),b=[],x={},S=[];for(let e of[1,-1]){let n=um(g,_,.55),r=xm(f,p,Im([[f,g],[a.knee,n],[p,_]]),n=>t.legSection(n,e),s,c);Sm(r,4);let i=new Cm(r);S.push(i);let o=Math.max(2,Math.round((cm(i.at(p).sec)+i.at(p).hidden)/.16/2));for(let n of[!1,!0]){let r=km(`${n?`back`:`front`}${e===1?`L`:`R`}`,n?`back`:`front`,e===1?`legL`:`legR`,36,90),a=t=>{if(t>=f){let[n,r]=y.extent(t),[a,o]=i.extent(f),s=fm((f+.05-t)/.05),c=um(0,e===1?a:o,s*.6);return e===1?[c,r]:[n,c]}let[n,r]=i.extent(t);return[n,r]},c=(e,t)=>t>=f?y.frontZ(e,t,n):i.frontZ(e,t,n),l=e=>a(e)[0],d=e=>a(e)[1],m=(e,t)=>{let n=um(u,p,e);return[t===0?l(n):d(n),n]},h=+!!n,g=+!n,_=wm(e=>[um(n?d(u):l(u),n?l(u):d(u),e),u],e=>[um(n?d(p):l(p),n?l(p):d(p),e),p],e=>m(e,h),e=>m(e,g),36,90);for(let e=0;e<3240;e++)r.pos[e*3]=_[e*2],r.pos[e*3+1]=_[e*2+1],r.pos[e*3+2]=c(_[e*2],_[e*2+1]);Tm(r.pos,36,90,c);for(let t=0;t<90;t++)for(let a=0;a<36;a++){let s=t*36+a;r.pos[s*3];let c=r.pos[s*3+1];if(c>=f)continue;let l=i.at(c),u=cm(l.sec),d=Math.min(.03,Math.sqrt(Math.max(0,l.hidden)*u)/(Math.PI*o*2)),p=a/35,m=d*Mm(p,o/2,e*3.1+ +!!n)*fm(Math.min(p,1-p)/.05);r.pos[s*3+2]+=n?-m:m,r.fold[s]=m,r.strain[s]=l.strain}Om(r,t,s),b.push(r)}x[e===1?`HEM_L`:`HEM_R`]=[i.extent(p)[+(e===1)],p]}return x.WAIST=[0,u],x.CROTCH=[0,f],{spec:e,pieces:b,marks:x,outer:e=>e>u+.005||e<p?null:e>=f?y.at(e).sec:hm(S[0].at(e).sec,S[1].at(e).sec,e)}}function Km(e,t,n){let r=[];for(let i=0;i<n;i++){let n=[],a=0;for(;a<t;){for(;a<t&&!e[i*t+a];)a++;if(a>=t)break;let r=a;for(;a<t&&e[i*t+a];)a++;a-r>1&&n.push(r,a-1)}r.push(n)}return{rows:r,w:t,h:n}}function qm(e,t,n){let r=e.rows[Math.max(0,Math.min(e.h-1,Math.round(t)))];for(let e=0;e<r.length;e+=2)if(r[e]<=n&&r[e+1]>=n)return[r[e],r[e+1]];return null}function Jm(e,t){let n=e.rows[Math.max(0,Math.min(e.h-1,Math.round(t)))];return n.length?[n[0],n[n.length-1]]:null}function Ym(e,t){return n=>{if(n>=e[0])return t[0]+(n-e[0])/(e[1]-e[0])*(t[1]-t[0]);for(let r=0;r<e.length-1;r++)if(n>=e[r+1])return t[r]+(n-e[r])/(e[r+1]-e[r])*(t[r+1]-t[r]);let r=e.length-1;return t[r]+(n-e[r])/(e[r]-e[r-1])*(t[r]-t[r-1])}}function Xm(e,t=24){let n=e.width,r=e.height,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`,{willReadFrequently:!0}),o=document.createElement(`canvas`);o.width=o.height=1;let s=o.getContext(`2d`,{willReadFrequently:!0});s.drawImage(e,0,0,1,1);let c=s.getImageData(0,0,1,1).data,l=Math.max(1,c[3])/255;a.fillStyle=`rgb(${c[0]/l},${c[1]/l},${c[2]/l})`,a.fillRect(0,0,n,r);for(let[t,n]of[[40,1],[16,1],[6,1],[2,1]]){a.save(),a.filter=`blur(${t}px)`,a.globalAlpha=n;for(let t=0;t<3;t++)a.drawImage(e,0,0);a.restore()}return a.drawImage(e,0,0),i}function Zm(e,t){let n=e.width,r=e.height,i=Km(e.mask,n,r),a=Math.round(e.centerX),o=0;for(;o<r&&!i.rows[o].length;)o++;let s=r-1;for(;s>0&&!i.rows[s].length;)s--;let c=o;for(;c<s&&!qm(i,c,a);)c++;let l=s;for(;l>c&&!qm(i,l,a);)l--;let u={kind:t,cx:a,hps:o,sp:o,ap:o,cf:c,hem:l,top:o,crotch:s,spX:0,apX:0,runs:i};if(t===`pants`){let e=c+5;for(;e<s&&qm(i,e,a);)e++;let t=[];for(let n=e;n<Math.min(s,e+(s-e)*.5);n+=2){let e=i.rows[n],r=-1,o=-1;for(let t=0;t<e.length;t+=2)e[t+1]<a&&(r=e[t+1]),e[t]>a&&o<0&&(o=e[t]);r>=0&&o>=0&&t.push([n,r,o])}let n=e;if(t.length>4){let r=t.length,i=t.reduce((e,t)=>e+t[0],0)/r,a=t.reduce((e,t)=>e+(t[2]-t[1]),0)/r,o=0,s=0;for(let e of t)o+=(e[0]-i)*(e[2]-e[1]-a),s+=(e[0]-i)**2;let l=o/Math.max(1e-6,s);l>.02&&(n=Math.max(c+(e-c)*.4,Math.min(e,i-a/l)))}return u.crotch=n,u.hem=s,u.top=c,u}if(t===`skirt`)return u.top=c,u.hem=l,u;let d=e=>{let t=qm(i,e,a)??Jm(i,e);return t?t[1]-t[0]:0},f=l-c>2.2*d(Math.round(c+(l-c)*.3)),p=Math.round(c+(l-c)*(f?.34:.6)),m=[];for(let e=c;e<=p;e++){let t=0,n=0;for(let r=-2;r<=2;r++){let i=d(e+r);i&&(t+=i,n++)}m.push(n?t/n:0)}let h=-1,g=0;for(let e=4;e<m.length-4;e++){let t=m[e+3]-m[e-3];t<g&&t<-.05*m[e]&&(g=t,h=c+e+3)}if(h<0){let e=Math.max(...m);for(let t=4;t<m.length-6;t++){if(m[t]<e*.9)continue;let n=!0;for(let e=0;e<5;e++)m[t+e+1]-m[t+e]>.004*m[t]&&(n=!1);if(n){h=c+t;break}}h<0&&(h=Math.round(c+(p-c)*.5))}u.ap=h,u.apX=d(Math.min(l-1,h+6))/2;let _=u.apX,v=r;for(let t=Math.round(a-_);t<=a+_;t++)for(let r=o;r<h;r++)if(e.mask[r*n+t]){v=Math.min(v,r);break}v>=h&&(v=o),u.hps=v;let y=t=>{for(let i=o;i<r;i++)if(e.mask[i*n+Math.round(t)])return i;return r},b=u.apX;for(let e=a+_*.25;e<a+_*1.2;e++)if(y(e+3)-y(e)>(h-u.hps)*.15){b=Math.min(b,e-a);break}return u.spX=b,u.sp=Math.min(h-2,(y(a+b)+y(a-b))/2),u}var Qm=(e,t,n)=>e+(t-e)*n;function $m(e,t,n){let r=e.spec.type===`skirt`?`skirt`:e.spec.type===`pants`?`pants`:`top`,i=Zm(t,r),a=t.width,o=t.height,s=(e,t,n,r)=>{n[r*2]=e/a,n[r*2+1]=1-t/o},c=`rgb(${t.color.map(e=>Math.round(e)).join(`,`)})`,l=[];for(let a of e.pieces){let o=new Float32Array(a.cols*a.rows*2);if(a.kind===`band`){l.push({image:null,uv:null,color:eh(t,i)});continue}r===`top`?nh(a,e,i,t,o,s):r===`skirt`?rh(a,e,i,o,s):ih(a,e,i,o,s),l.push({image:n,uv:o,color:c})}return l}function eh(e,t){let n=e.canvas.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,e.width,e.height).data,r=new Map,i=t.runs,a=t.cx;for(let o=Math.max(0,t.hps);o<Math.min(e.height,t.cf+14);o++){let s=i.rows[o];for(let i=0;i<s.length;i+=2){let c=o<t.cf?[s[i]+3,s[i]+6,s[i+1]-3,s[i+1]-6]:[a-20,a,a+20];for(let i of c){if(i<0||i>=e.width||!e.mask[o*e.width+i]||o<t.cf&&Math.abs(i-a)>(t.spX||e.width)*.7)continue;let s=(o*e.width+i)*4,c=n[s]>>4<<8|n[s+1]>>4<<4|n[s+2]>>4,l=r.get(c)??[0,0,0,0];l[0]+=n[s],l[1]+=n[s+1],l[2]+=n[s+2],l[3]++,r.set(c,l)}}}let o=null;for(let e of r.values())(!o||e[3]>o[3])&&(o=e);return o?`rgb(${Math.round(o[0]/o[3])},${Math.round(o[1]/o[3])},${Math.round(o[2]/o[3])})`:`rgb(${e.color.map(Math.round).join(`,`)})`}function th(e,t){return e.pos[t*e.cols*3+1]}function nh(e,t,n,r,i,a){let o=t.marks,s=n.runs,c=n.cx,l=[o.TOP[1],o.SP_L[1],o.AP_L[1],o.HEM_L[1]],u=[n.hps,n.sp,n.ap,n.hem];for(let e=1;e<l.length;e++)l[e]>=l[e-1]&&(l[e]=l[e-1]-.001),u[e]<=u[e-1]&&(u[e]=u[e-1]+1);let d=Ym(l,u),f=n.cf,p=null;if(n.cf-n.hps<(n.ap-n.hps)*.12&&o.NECK&&o.AP_L){let e=n.apX/Math.max(.001,o.AP_L[0]),r=o.NECK[0]*e;f=d(o.CF[1]);let i=Math.max(4,f-n.hps),a=t.spec.neckline===`v`;p=e=>{let t=Math.min(1,Math.max(0,(e-n.hps)/i));return a?r*(1-t):r*Math.sqrt(Math.max(0,1-t*t))}}let m=e=>{if(p)return e>=f?0:p(e);if(e>=n.cf)return 0;let t=s.rows[Math.round(e)]??[];for(let e=0;e<t.length;e+=2)if(t[e]>c)return t[e]-c;return n.spX},h=(e,t)=>{if(e<=n.sp){let r=s.rows[Math.round(e)]??[];return r.length?t>0?Math.min(n.spX,r[r.length-1]-c):Math.min(n.spX,c-r[0]):n.spX}if(e<=n.ap){let t=Math.min(1,Math.max(0,(e-n.sp)/Math.max(1,n.ap-n.sp))),r=Math.sqrt(Math.max(0,1-t*t));return n.apX+(n.spX-n.apX)*r**.6}let r=qm(s,e,c);return r?t>0?r[1]-c:c-r[0]:n.apX};if(e.kind===`front`||e.kind===`back`){let t=e.name.endsWith(`L`)?1:-1;for(let n=0;n<e.rows;n++){let r=d(th(e,n)),o=m(r),s=Math.max(o,h(r,t));for(let l=0;l<e.cols;l++){let u=e.param[(n*e.cols+l)*2];a(c+t*Qm(o,s,u),r,i,n*e.cols+l)}}return}if(e.kind===`sleeve`){let t=e.region===`sleeveL`?1:-1,o=[c+t*(n.spX+n.apX)/2,(n.sp+n.ap)/2],l=0,u=[o[0]+t*50,o[1]+50];for(let e=0;e<r.height;e++){let n=s.rows[e];for(let r=0;r<n.length;r+=2)for(let i of[n[r],n[r+1]]){if((i-c)*t<h(e,t)+2)continue;let n=Math.hypot(i-o[0],e-o[1]);n>l&&(l=n,u=[i,e])}}if(l<10){for(let r=0;r<e.cols*e.rows;r++)a(c+t*n.apX*.9,n.ap-5,i,r);return}let d=(u[0]-o[0])/l,f=(u[1]-o[1])/l,p=-f,m=d;p*t>0&&(p=-p,m=-m);let g=(e,t)=>{let n=Math.round(e),i=Math.round(t);return n>=0&&i>=0&&n<r.width&&i<r.height&&r.mask[i*r.width+n]===1},_=e=>{let n=o[0]+d*l*e,r=o[1]+f*l*e,i=0,a=0;for(;i<l&&g(n-p*i,r-m*i);)i++;for(;a<l&&g(n+p*a,r+m*a)&&(n+p*a-c)*t>h(r+m*a,t)-1;)a++;return[n-p*i,r-m*i,n+p*a,r+m*a]},v=e.cols-1,y=Array.from({length:e.rows},(t,n)=>_(.02+n/(e.rows-1)*.95)).map((t,n)=>{let r=.02+n/(e.rows-1)*.95,i=o[0]+d*l*r,a=o[1]+f*l*r;return[Math.hypot(t[0]-i,t[1]-a),Math.hypot(t[2]-i,t[3]-a)]});for(let t=0;t<6;t++)for(let t=1;t<e.rows-1;t++)for(let e of[0,1])y[t][e]=(y[t-1][e]+2*y[t][e]+y[t+1][e])/4;for(let n=0;n<e.rows;n++){let r=.02+n/(e.rows-1)*.95,s=o[0]+d*l*r,c=o[1]+f*l*r,u=s-p*y[n][0],h=c-m*y[n][0],g=s+p*y[n][1],_=c+m*y[n][1];for(let r=0;r<e.cols;r++){let o=r/v*Math.PI*2,s=((t===1?Math.sin(o):-Math.sin(o))+1)/2;a(Qm(u,g,s),Qm(h,_,s),i,n*e.cols+r)}}return}for(let t=0;t<e.cols*e.rows;t++)a(c,n.cf+6,i,t)}function rh(e,t,n,r,i){let a=t.marks,o=n.runs,s=Ym([a.WAIST_L[1],a.HEM_L[1]],[n.top,n.hem]),c=e.kind===`back`;for(let t=0;t<e.rows;t++){let n=s(th(e,t)),a=Jm(o,n)??[0,o.w-1];for(let o=0;o<e.cols;o++){let s=e.param[(t*e.cols+o)*2];i(Qm(a[0],a[1],c?1-s:s),n,r,t*e.cols+o)}}}function ih(e,t,n,r,i){let a=t.marks,o=n.runs,s=n.cx,c=Ym([a.WAIST[1],a.CROTCH[1],a.HEM_L[1]],[n.top,n.crotch,n.hem]),l=e.region===`legL`?1:-1,u=e.kind===`back`;for(let t=0;t<e.rows;t++){let n=c(th(e,t)),a=o.rows[Math.max(0,Math.min(o.h-1,Math.round(n)))]??[],d=s,f=s+l*40;if(a.length){if(l>0){f=a[a.length-1],d=s;for(let e=0;e<a.length;e+=2)if(a[e]>s){d=a[e];break}}else{d=a[0],f=s;for(let e=a.length-2;e>=0;e-=2)if(a[e+1]<s){f=a[e+1];break}}}for(let a=0;a<e.cols;a++){let o=e.param[(t*e.cols+a)*2];i(Qm(d,f,u?1-o:o),n,r,t*e.cols+a)}}}function ah(e,t,n,r){let i=t.marks,a=n.joints,o=t.image.width,s=t.image.height,c=[(a.shoulderL.y+a.shoulderR.y)/2,(a.hipL.y+a.hipR.y)/2,(a.kneeL.y+a.kneeR.y)/2,(a.ankleL.y+a.ankleR.y)/2],l=[(a.shoulderL.x-a.shoulderR.x)/2,(a.hipL.x-a.hipR.x)/2,(a.kneeL.x-a.kneeR.x)/2,(a.ankleL.x-a.ankleR.x)/2],u=[(i.shoulderL[1]+i.shoulderR[1])/2,(i.hipL[1]+i.hipR[1])/2,(i.kneeL[1]+i.kneeR[1])/2,(i.ankleL[1]+i.ankleR[1])/2],d=[(i.shoulderL[0]+i.shoulderR[0])/2,(i.hipL[0]+i.hipR[0])/2,(i.kneeL[0]+i.kneeR[0])/2,(i.ankleL[0]+i.ankleR[0])/2],f=[Math.abs(i.shoulderL[0]-i.shoulderR[0])/2,Math.abs(i.hipL[0]-i.hipR[0])/2,Math.abs(i.kneeL[0]-i.kneeR[0])/2,Math.abs(i.ankleL[0]-i.ankleR[0])/2],p=i.shoulderL[0]>=i.shoulderR[0]?1:-1,m=e=>{if(e>=c[0])return-(e-c[0])/(c[0]-c[1]);for(let t=0;t<3;t++)if(e>=c[t+1])return t+(c[t]-e)/(c[t]-c[t+1]);return 3+(c[3]-e)/(c[2]-c[3])},h=(e,t)=>{if(t<=0)return e[0]+t*(e[1]-e[0]);if(t>=3)return e[3]+(t-3)*(e[3]-e[2]);let n=Math.min(2,Math.floor(t));return e[n]+(e[n+1]-e[n])*(t-n)},g=e=>Math.max(0,Math.min(3,e)),_=(e,t)=>{let n=m(t),r=h(f,g(n))/Math.max(1e-4,h(l,g(n)));return[h(d,g(n))+p*e*r,h(u,n)]},v=(e,t,n)=>{let r=a[`shoulder`+n],o=a[`elbow`+n],s=a[`wrist`+n],c=i[`shoulder${n}`],l=i[`elbow${n}`],u=i[`wrist${n}`],d=(n,r,i,a)=>{let o=r.x-n.x,s=r.y-n.y,c=Math.hypot(o,s)||1e-6,l=((e-n.x)*o+(t-n.y)*s)/(c*c),u=((e-n.x)*-s+(t-n.y)*o)/c,d=a[0]-i[0],f=a[1]-i[1],m=Math.hypot(d,f)||1e-6,h=m/c,g=p>0?f/m:-f/m,_=p>0?-d/m:d/m;return{t:l,p:[i[0]+d*l+g*u*h,i[1]+f*l+_*u*h]}},f=d(r,o,c,l);return f.t<=1?f.p:d(o,s,l,u).p},y=[];for(let t of e.pieces){let e=new Float32Array(t.cols*t.rows*2);for(let n=0;n<t.cols*t.rows;n++){let r=t.pos[n*3],i=t.pos[n*3+1],[a,c]=t.region===`sleeveL`?v(r,i,`L`):t.region===`sleeveR`?v(r,i,`R`):_(r,i);e[n*2]=a/o,e[n*2+1]=1-c/s}y.push({image:r,uv:e,color:`#999`})}return y}function oh(e){let t=e.image.width,n=e.image.height,r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`,{willReadFrequently:!0});i.drawImage(e.image,0,0);let a=i.getImageData(0,0,t,n);for(let r=0;r<t*n;r++)e.mask[r]||(a.data[r*4+3]=0);return i.putImageData(a,0,0),Xm(r)}var sh=null;function ch(){return sh||(sh=(async()=>{let{FilesetResolver:e,FaceLandmarker:t}=await uf(async()=>{let{FilesetResolver:e,FaceLandmarker:t}=await import(`./vision_bundle-BoOer3Cq.js`);return{FilesetResolver:e,FaceLandmarker:t}},[],import.meta.url),n=await e.forVisionTasks(new URL(`mediapipe/wasm`,document.baseURI).href);return t.createFromOptions(n,{baseOptions:{modelAssetPath:new URL(`models/face_landmarker.task`,document.baseURI).href,delegate:`CPU`},runningMode:`IMAGE`,numFaces:1})})(),sh.catch(()=>{sh=null})),sh}async function lh(e){let t=await ch(),n=`naturalWidth`in e?e.naturalWidth:e.width,r=`naturalHeight`in e?e.naturalHeight:e.height,i=t.detect(e).faceLandmarks?.[0];return!i||i.length<468?null:i.map(e=>[e.x*n,e.y*r])}var uh=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109],dh=[50,280,101,330,118,347,205,425],fh=[67,109,10,338,297,108,151,337];async function ph(e,t,n=640){let r=new hl({antialias:!0,preserveDrawingBuffer:!0});r.setSize(n,n,!1),r.outputColorSpace=Pe;let i=new jn;i.background=new Z(14605270);let a=new Zl(e);a.setHair(null);let o=await new la().loadAsync(t);o.colorSpace=Pe,a.skinMaterial.map=o,a.skinMaterial.needsUpdate=!0,i.add(a.group),i.add(new da(16777215,12301483,1.6));let s=new Oa(16777215,1.2);s.position.set(0,.5,2),i.add(s);for(let e=0;e<100;e++){let e=0;if(a.group.traverse(t=>{let n=t.material,r=n?.map?.image;n?.map&&(!r||r instanceof HTMLImageElement&&!r.complete)&&e++}),!e)break;await new Promise(e=>setTimeout(e,30))}let c=e.bonePosed(`head`),l=c.x,u=c.y+.085,d=.135,f=new Ea(l-d,l+d,u+d,u-d,.01,10);f.position.set(0,0,3),f.lookAt(0,0,0),f.position.set(l,u,3),f.left=-.135,f.right=d,f.top=d,f.bottom=-.135,f.lookAt(l,u,0),f.updateProjectionMatrix(),r.render(i,f);let p=document.createElement(`canvas`);p.width=p.height=n,p.getContext(`2d`).drawImage(r.domElement,0,0);let m=new X,h=(e,t,r)=>(m.set(e,t,r).project(f),[(m.x*.5+.5)*n,(1-(m.y*.5+.5))*n]),g=a.posedBodyPositions.slice(),_=a.posedBodyNormals.slice();return a.group.traverse(e=>{let t=e;t.isMesh&&t.geometry.dispose()}),o.dispose(),r.dispose(),r.forceContextLoss(),{canvas:p,project:h,pos:g,normals:_}}function mh(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let[a,o]of e)t=Math.min(t,a),n=Math.min(n,o),r=Math.max(r,a),i=Math.max(i,o);let a=Math.max(r-t,i-n)*2e3,o=[...e,[t-a,n-a],[t+a*2,n-a],[t-a,n+a*2]],s=e.length,c=[],l=(e,t,n)=>{let[r,i]=o[e],[a,s]=o[t],[c,l]=o[n],u=2*(r*(s-l)+a*(l-i)+c*(i-s));if(Math.abs(u)<1e-12)return[0,0,1/0];let d=((r*r+i*i)*(s-l)+(a*a+s*s)*(l-i)+(c*c+l*l)*(i-s))/u,f=((r*r+i*i)*(c-a)+(a*a+s*s)*(r-c)+(c*c+l*l)*(a-r))/u;return[d,f,(r-d)**2+(i-f)**2]},u=(e,t,n)=>{let[r,i,a]=l(e,t,n);c.push([e,t,n,r,i,a])};u(s,s+1,s+2);for(let e=0;e<s;e++){let[t,n]=o[e],r=[],i=[];for(let e of c)((t-e[3])**2+(n-e[4])**2<e[5]?r:i).push(e);let a=new Map;for(let e of r)for(let[t,n]of[[e[0],e[1]],[e[1],e[2]],[e[2],e[0]]]){let e=t<n?`${t},${n}`:`${n},${t}`;a.has(e)?a.delete(e):a.set(e,[t,n])}c=i;for(let[t,n]of a.values())u(t,n,e)}let d=[];for(let e of c)e[0]<s&&e[1]<s&&e[2]<s&&d.push(e[0],e[1],e[2]);return d}function hh(e,t,n){let r=null,i=-1/0;for(let a=0;a<t.length;a+=3){let[o,s]=e[t[a]],[c,l]=e[t[a+1]],[u,d]=e[t[a+2]],f=(l-d)*(o-u)+(u-c)*(s-d);if(Math.abs(f)<1e-9)continue;let p=((l-d)*(n[0]-u)+(u-c)*(n[1]-d))/f,m=((d-s)*(n[0]-u)+(o-u)*(n[1]-d))/f,h=1-p-m,g=Math.min(p,m,h);if(g>=-1e-6)return[a,p,m,h];g>i&&(i=g,r=[a,p,m,h])}return i>-.6?r:null}function gh(e,t){let n=!1;for(let r=0,i=e.length-1;r<e.length;i=r++){let[a,o]=e[r],[s,c]=e[i];o>t[1]!=c>t[1]&&t[0]<(s-a)*(t[1]-o)/(c-o)+a&&(n=!n)}return n}function _h(e,t){let n=1/0;for(let r=0,i=e.length-1;r<e.length;i=r++){let[a,o]=e[i],[s,c]=e[r],l=s-a,u=c-o,d=Math.max(0,Math.min(1,((t[0]-a)*l+(t[1]-o)*u)/(l*l+u*u||1)));n=Math.min(n,Math.hypot(t[0]-a-l*d,t[1]-o-u*d))}return n}function vh(e,t,n){let r=0,i=0,a=0,o=0;for(let[s,c]of t)for(let t=-n;t<=n;t++)for(let l=-n;l<=n;l++){let n=Math.round(s+l),u=Math.round(c+t);if(n<0||u<0||n>=e.width||u>=e.height)continue;let d=(u*e.width+n)*4;r+=e.data[d],i+=e.data[d+1],a+=e.data[d+2],o++}return o?[r/o,i/o,a/o]:[200,170,150]}function yh(e,t,n,r,i){let a=e.data.bodyVertexCount,o=new Float32Array(a*2),s=new Float32Array(a),c=mh(n),l=uh.map(e=>n[e]),u=Math.hypot(n[234][0]-n[454][0],n[234][1]-n[454][1])*.1,d=r.width,f=r.height;for(let e=0;e<a;e++){if(t.normals[e*3+2]<.15)continue;let r=t.project(t.pos[e*3],t.pos[e*3+1],t.pos[e*3+2]),a=gh(l,r),p=_h(l,r),m=a?Math.min(1,.55+p/u):Math.max(0,.55-p/(u*.6));if(m<=0)continue;let h=hh(n,c,r);if(!h)continue;let[g,_,v,y]=h,b=i[c[g]],x=i[c[g+1]],S=i[c[g+2]];o[e*2]=(_*b[0]+v*x[0]+y*S[0])/d,o[e*2+1]=(_*b[1]+v*x[1]+y*S[1])/f,s[e]=Math.min(1,m)*Math.min(1,Math.max(0,(t.normals[e*3+2]-.15)/.3))}let p=r.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,d,f),m=t.canvas.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,t.canvas.width,t.canvas.height),h=e=>[...dh,...fh].map(t=>e[t]),g=Math.max(2,Math.round(d/160)),_=Math.max(2,Math.round(t.canvas.width/160)),v=vh(p,h(i),g),y=vh(m,h(n),_);return{uv:o,alpha:s,gain:[0,1,2].map(e=>Math.max(.2,Math.min(1.8,v[e]/Math.max(1,y[e])))),selfieSkin:v}}function bh(e,t,n,r,i=1){let a=(`naturalWidth`in t?t.naturalWidth:t.width)||2048,o=document.createElement(`canvas`);o.width=o.height=a;let s=o.getContext(`2d`,{willReadFrequently:!0});s.drawImage(t,0,0,a,a);let c=r.gain.map(e=>1+(e-1)*Math.min(1,i*1.2)),l=s.getImageData(0,0,a,a),u=l.data;for(let e=0;e<u.length;e+=4)u[e]=Math.min(255,u[e]*c[0]),u[e+1]=Math.min(255,u[e+1]*c[1]),u[e+2]=Math.min(255,u[e+2]*c[2]);s.putImageData(l,0,0);let d=e.data,f=d.body.src,p=d.body.index,m=d.body.uv,h=[],g=[],_=[];for(let e=0;e<p.length;e+=3){let t=[p[e],p[e+1],p[e+2]],n=t.map(e=>f[e]);if(!n.every(e=>r.alpha[e]<=0))for(let e=0;e<3;e++)h.push(m[t[e]*2]*2-1,m[t[e]*2+1]*2-1,0),g.push(r.uv[n[e]*2],1-r.uv[n[e]*2+1]),_.push(r.alpha[n[e]]*i)}let v=new hl({alpha:!0,premultipliedAlpha:!1,preserveDrawingBuffer:!0});v.setSize(a,a,!1),v.setClearColor(0,0);let y=new Tr;y.setAttribute(`position`,new pr(h,3)),y.setAttribute(`suv`,new pr(g,2)),y.setAttribute(`alpha`,new pr(_,1));let b=new pi(n);b.colorSpace=``;let x=new ji({uniforms:{map:{value:b}},vertexShader:`precision highp float; attribute vec3 position; attribute vec2 suv; attribute float alpha;
      varying vec2 vUv; varying float vA; void main() { vUv = suv; vA = alpha; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`precision highp float; uniform sampler2D map; varying vec2 vUv; varying float vA;
      void main() { gl_FragColor = vec4(texture2D(map, vUv).rgb, clamp(vA, 0.0, 1.0)); }`,side:2,depthTest:!1,transparent:!1}),S=new jn;return S.add(new Yr(y,x)),v.render(S,new Ea(-1,1,1,-1,-1,1)),s.drawImage(v.domElement,0,0),y.dispose(),x.dispose(),b.dispose(),v.dispose(),v.forceContextLoss(),o}function xh(e,t){if(t.length<478)return null;let n=e.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,e.width,e.height),r=[];for(let[e,i]of[[468,[469,470,471,472]],[473,[474,475,476,477]]]){let a=i.reduce((n,r)=>n+Math.hypot(t[r][0]-t[e][0],t[r][1]-t[e][1]),0)/4;if(!(a<2))for(let i=0;i<24;i++){let o=i/24*Math.PI*2,s=a*.6,c=Math.round(t[e][0]+Math.cos(o)*s),l=Math.round(t[e][1]+Math.sin(o)*s);if(c<0||l<0||c>=n.width||l>=n.height)continue;let u=(l*n.width+c)*4;r.push([n.data[u],n.data[u+1],n.data[u+2]])}}if(r.length<8)return null;r.sort((e,t)=>e[0]+e[1]+e[2]-(t[0]+t[1]+t[2]));let i=r.slice(0,Math.ceil(r.length/2));return[0,1,2].map(e=>i.reduce((t,n)=>t+n[e],0)/i.length)}function Sh(e,t){let n=(`naturalWidth`in e?e.naturalWidth:e.width)||512,r=(`naturalHeight`in e?e.naturalHeight:e.height)||512,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`,{willReadFrequently:!0});a.drawImage(e,0,0,n,r);let o=a.getImageData(0,0,n,r),s=o.data,c=(t[0]+t[1]+t[2])/3||1;for(let e=0;e<s.length;e+=4){let n=s[e],r=s[e+1],i=s[e+2],a=Math.max(n,r,i),o=a?(a-Math.min(n,r,i))/a:0;if(o<.35||n<r)continue;let l=Math.min(1,(o-.35)/.2),u=(n+r+i)/3;for(let n=0;n<3;n++)s[e+n]=s[e+n]*(1-l)+Math.min(255,t[n]/c*u*.9)*l}return a.putImageData(o,0,0),i}function Ch(e,t,n,r,i){let a=i[152],o=i[10],s=Math.max(10,a[1]-o[1]),c=i[234],l=i[454],u=0,d=0,f=[],p=0,m=0,h=0,g=(i[105][1]+i[334][1])/2;for(let a=0;a<r;a++)for(let r=0;r<n;r++){let _=a*n+r,v=a>o[1]&&a<g-s*.03&&r>i[105][0]&&r<i[334][0];v&&m++,e[_]===1&&(u++,a>d&&(d=a),v&&p++,a>(c[1]+l[1])/2+s*.15&&(r<c[0]-2||r>l[0]+2)&&h++,_&3||f.push(t[_*4]<<16|t[_*4+1]<<8|t[_*4+2]))}if(u<50)return null;f.sort((e,t)=>(e>>16)+(e>>8&255)+(e&255)-((t>>16)+(t>>8&255)+(t&255)));let _=f[Math.floor(f.length*.7)]??3877408,v=e=>Math.min(255,Math.round(e*1.35+6)),y=`#`+[_>>16,_>>8&255,_&255].map(e=>v(e).toString(16).padStart(2,`0`)).join(``),b=(d-a[1])/s,x=m?p/m:0,S=h/u,C,w,T=d>=r*.9;return b>.45||T&&b>.1||S>.25&&b>.15?(C=`hair_long01`,w=`頭髮長過下巴`):S<.04&&b<.1?(C=`hair_ponytail01`,w=`臉旁沒有頭髮（綁起來）`):x>.45?(C=`hair_bob01`,w=`有瀏海的短髮`):(C=`hair_bob02`,w=`短髮`),{style:C,color:y,reason:w}}var wh=720;function Th(e){let t=`naturalWidth`in e?e.naturalWidth:e.width,n=`naturalHeight`in e?e.naturalHeight:e.height,r=Math.min(1,wh/Math.max(t,n)),i=document.createElement(`canvas`);return i.width=Math.round(t*r),i.height=Math.round(n*r),i.getContext(`2d`).drawImage(e,0,0,i.width,i.height),i}async function Eh(e){let t=Th(e),n=await lh(t);if(!n)return null;let r=null;try{let e=await pf(t),i=t.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,t.width,t.height).data;r=Ch(e,i,t.width,t.height,n)}catch(e){console.warn(`hair segmentation failed`,e)}return{canvas:t,lm:n,hair:r,iris:xh(t,n)}}var Dh=e=>new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=n,r.src=e}),Oh=class{body;baseUrl;shotKey=``;shot=null;fitCache=null;eyeBase=null;constructor(e,t=`avatar/`){this.body=e,this.baseUrl=t}async avatarLandmarks(e){let t=JSON.stringify(this.body.morphValues);if(this.shot&&this.shotKey===t)return this.shot;let n=this.body.pose;this.body.setPose({});try{let n=await ph(this.body,this.baseUrl+e),r=await lh(n.canvas);return this.shot=r?{shot:n,lm:r}:null,this.shotKey=t,this.fitCache=null,this.shot}finally{this.body.setPose(n)}}async compose(e,t,n){let r=await this.avatarLandmarks(t);if(!r)return null;let i=this.shotKey+`|`+e.lm.length+e.lm[1][0];(!this.fitCache||this.fitCache.key!==i)&&(this.fitCache={key:i,fit:yh(this.body,r.shot,r.lm,e.canvas,e.lm)});let a=await Dh(this.baseUrl+t),o=bh(this.body,a,e.canvas,this.fitCache.fit,n),s=null;return e.iris&&(this.eyeBase??=await Dh(this.baseUrl+`tex/eyes.jpg`),s=Sh(this.eyeBase,e.iris)),{skin:o,eyes:s}}static apply(e,t){let n=e=>{let t=new pi(e);return t.colorSpace=Pe,t.anisotropy=8,t};t&&(e.skinMaterial.map=n(t.skin),e.skinMaterial.needsUpdate=!0),e.group.traverse(e=>{if(e.name===`eyebrows`&&(e.visible=!t),e.name===`eyes`){let r=e.material,i=r.userData.origMap??=r.map;r.map=t?.eyes?n(t.eyes):i,r.needsUpdate=!0}})}},kh=new Map;function Ah(e,t){let n=e+t,r=kh.get(n);if(r)return r;let i=document.createElement(`canvas`);i.width=i.height=128;let a=i.getContext(`2d`);a.fillStyle=e,a.fillRect(0,0,128,128);let o=a.getImageData(0,0,128,128);for(let e=0;e<128;e++)for(let n=0;n<128;n++){let r;if(t){let t=n%8-4,i=e%8-4;r=Math.max(0,1-Math.hypot(t*1.2+(i>0?1.5:-1.5),i*.8)/4)*.08-.03}else r=(((n>>1)+(e>>1))%2?.02:-.02)+Math.sin(n*.7)*Math.sin(e*.9)*.015;r+=(Math.random()-.5)*.03;let i=(e*128+n)*4;for(let e=0;e<3;e++)o.data[i+e]=Math.max(0,Math.min(255,o.data[i+e]*(1+r)))}return a.putImageData(o,0,0),kh.set(n,i),i}var jh=[new Z(.85,.12,.1),new Z(.95,.55,.12),new Z(.25,.7,.35),new Z(.2,.45,.85)];function Mh(e,t,n){let r=(e,t,n)=>Math.max(0,Math.min(1,(e-t)/(n-t))),i=1-r(e*(1+t),.97,1);return n.copy(jh[1]).lerp(jh[2],r(e,1,1.05)).lerp(jh[3],r(e,1.14,1.24)),n.lerp(jh[0],i)}function Nh(e){let{cols:t,rows:n}=e,r=[];for(let e=0;e<n-1;e++)for(let n=0;n<t-1;n++){let i=e*t+n,a=i+1,o=i+t,s=o+1;r.push(i,o,a,a,o,s)}return Uint32Array.from(r)}function Ph(e,t,n,r){let i=0,a=e.cols*e.rows;for(let t=0;t<a;t+=3){let a=e.pos[t*3]-r.x,o=e.pos[t*3+2]-r.z;e.kind===`front`&&(a=0,o=1),e.kind===`back`&&(a=0,o=-1),i+=n[t*3]*a+n[t*3+2]*o}if(i<0){for(let e=0;e<t.length;e+=3){let n=t[e+1];t[e+1]=t[e+2],t[e+2]=n}for(let e=0;e<n.length;e++)n[e]=-n[e]}}function Fh(){let e=document.createElement(`canvas`);e.width=64,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,256);n.addColorStop(0,`#f6f3ee`),n.addColorStop(.55,`#fffdf9`),n.addColorStop(.8,`#fbf8f3`),n.addColorStop(1,`#f1ece6`),t.fillStyle=n,t.fillRect(0,0,64,256);let r=new pi(e);return r.colorSpace=Pe,r}var Ih=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
  if (!gl_FrontFacing) diffuseColor.rgb *= 0.86;`)},Lh=class{body;renderer;scene=new jn;camera=new Ca(16,1,.1,50);avatar;garmentGroup=new Cn;lights=new Cn;style=`photo`;skinMat;width;height;constructor(e,t=600,n=1e3,r){this.body=e,this.width=t,this.height=n,this.renderer=new hl({antialias:!0,preserveDrawingBuffer:!0,canvas:r,alpha:!1}),this.renderer.setPixelRatio(1),this.renderer.setSize(t,n,!1),this.renderer.outputColorSpace=Pe,this.renderer.toneMapping=7,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.scene.background=new Z(15986665),this.avatar=new Zl(e),this.skinMat=this.avatar.bodyMesh.material,this.skinMat.color.set(16051688),this.avatar.bodyMesh.castShadow=!0,this.avatar.bodyMesh.receiveShadow=!0,this.scene.add(this.avatar.group,this.garmentGroup,this.lights),this.setupLights(),this.floor=new Yr(new vi(1,64),new xi({opacity:.15})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0,this.scene.add(this.floor),this.scene.background=Fh()}floor;setupLights(){let e=new Oa(16774634,2);e.position.set(-1.6,2.6,3.2),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-1.6,right:1.6,top:2.4,bottom:-1.2,near:.1,far:12}),e.shadow.bias=-3e-4,e.shadow.normalBias=.015,e.shadow.radius=6,e.target.position.set(0,.9,0);let t=new Oa(15659775,.7);t.position.set(2.2,1.4,2);let n=new Oa(16777215,.8);n.position.set(1,2.5,-2.5);let r=new da(16777215,14274498,.6);this.lights.add(e,e.target,t,n,r);let i=new So(this.renderer);uf(async()=>{let{RoomEnvironment:e}=await Promise.resolve().then(()=>xu);return{RoomEnvironment:e}},void 0,import.meta.url).then(({RoomEnvironment:e})=>{this.scene.environment=i.fromScene(new e,.04).texture,this.scene.environmentIntensity=.35})}resize(e,t){this.width=e,this.height=t,this.renderer.setSize(e,t,!1)}async ready(){for(let e=0;e<200;e++){let e=0;if(this.avatar.group.traverse(t=>{let n=t.material,r=n?.map?.image;n?.map&&(!r||r instanceof HTMLImageElement&&!r.complete)&&e++}),!e&&this.scene.environment)return;await new Promise(e=>setTimeout(e,50))}}syncBody(){this.avatar.update()}setGarments(e){for(let e of[...this.garmentGroup.children]){this.garmentGroup.remove(e);let t=e;t.geometry?.dispose(),t.material?.dispose()}let t=new X(0,1,this.avatarCenterZ());for(let n of[...e].sort((e,t)=>e.layer-t.layer))n.garment.pieces.forEach((e,r)=>{let a=n.textures[r]??{image:null,uv:null,color:10135480},o=new Tr,s=e.cols*e.rows,c=Nh(e),l=Sl(e.pos,c,s),u=t.clone();if(e.kind===`sleeve`||e.kind===`band`){let t=0,n=0,r=0;for(let i=0;i<s;i++)t+=e.pos[i*3],n+=e.pos[i*3+1],r+=e.pos[i*3+2];u.set(t/s,n/s,r/s)}Ph(e,c,l,u),o.setAttribute(`position`,new ur(e.pos.slice(),3)),o.setAttribute(`normal`,new ur(l,3));let d=a.uv??e.param;if(!a.uv&&a.repeat&&(d=e.param.map(e=>e*a.repeat)),o.setAttribute(`uv`,new ur(d,2)),n.heat){let t=new Float32Array(s*3),r=new Z;for(let i=0;i<s;i++)Mh(e.strain[i],n.garment.spec.fabric.stretch,r),t[i*3]=r.r,t[i*3+1]=r.g,t[i*3+2]=r.b;o.setAttribute(`color`,new ur(t,3))}o.setIndex(new ur(c,1));let f=new Ni({color:a.image?16777215:a.color,roughness:.85,sheen:.35,sheenRoughness:.6,sheenColor:new Z(16777215),side:2});if(a.image&&!n.heat){let e=new pi(a.image);e.colorSpace=Pe,e.anisotropy=8,a.repeat&&(e.wrapS=e.wrapT=i),f.map=e}n.heat&&(f.vertexColors=!0,f.color.set(16777215));let p=n.garment.spec.fabric,m=ed(p.structure===`knit`?`knit`:p.weave===`牛仔`?`twill`:`plain`).clone();m.wrapS=m.wrapT=i;let h=a.uv?42:42/(a.repeat??1);m.repeat.set(h,h),m.needsUpdate=!0,f.normalMap=m,f.normalScale.set(.28,.28),f.onBeforeCompile=Ih;let g=new Yr(o,f);g.castShadow=!0,g.receiveShadow=!0,g.name=`${n.garment.spec.type}-${e.name}`,g.renderOrder=n.layer,this.garmentGroup.add(g)})}debugWire(){for(let e of[...this.garmentGroup.children]){let t=new Yr(e.geometry,new Lr({color:0,wireframe:!0,transparent:!0,opacity:.25}));this.garmentGroup.add(t)}}avatarCenterZ(){let e=this.avatar.posedBodyPositions,t=0,n=0;for(let r=0;r<e.length;r+=30)t+=e[r+2],n++;return t/Math.max(1,n)}setStyle(e){this.style=e}frame(e,t,n=0,r=.85){let i=this.width/this.height,a=this.camera;a.aspect=i;let o=Ct.degToRad(a.fov),s=Math.max(t-e,r/i),c=s/2/Math.tan(o/2)+.15,l=(e+t)/2,u=l+Math.min(.35,s*.18);a.position.set(n,u,c),a.lookAt(n,l,0),a.updateProjectionMatrix()}render(){if(!this.composer){let e=new Gt(this.width,this.height,{samples:4,type:b});this.composer=new Mu(this.renderer,e),this.composer.addPass(new Nu(this.scene,this.camera)),this.gtao=new Uu(this.scene,this.camera,this.width,this.height),this.gtao.updateGtaoMaterial({radius:.06,distanceExponent:1.6,thickness:1,scale:1,samples:16}),this.gtao.blendIntensity=.75,this.composer.addPass(this.gtao),this.composer.addPass(new Gu)}return this.composer.setPixelRatio(1),this.composer.setSize(this.width,this.height),this.composer.render(),this.renderer.domElement}composer=null;gtao=null;toPixel(e,t){let n=new X(e,t,0).project(this.camera);return[(n.x*.5+.5)*this.width,(1-(n.y*.5+.5))*this.height]}},Rh=new WeakMap,zh=class{host;body;measurer;canvas;r=null;style=`photo`;lastMs=0;readyP=null;constructor(e,t,n){this.host=e,this.body=t,this.measurer=n,this.canvas=document.createElement(`canvas`),this.canvas.id=`look-canvas`,this.canvas.hidden=!0,e.appendChild(this.canvas),new ResizeObserver(()=>{this.canvas.hidden||this.resize()}).observe(e)}get active(){return!this.canvas.hidden}size(){let e=Math.min(2,window.devicePixelRatio||1);return[Math.max(2,Math.round(this.host.clientWidth*e)),Math.max(2,Math.round(this.host.clientHeight*e))]}ensure(){if(!this.r){let[e,t]=this.size();this.r=new Lh(this.body,e,t,this.canvas),this.readyP=this.r.ready()}return this.r}resize(){if(!this.r)return;let[e,t]=this.size();(e!==this.r.width||t!==this.r.height)&&(this.r.resize(e,t),this.r.render())}hide(){this.canvas.hidden=!0}setLook(e,t,n,r){let i=this.ensure();i.avatar.setSkin(e,t),i.avatar.setHair(n),i.avatar.setHairColor(r),this.face&&Oh.apply(i.avatar,this.face)}face=null;setFace(e){this.face=e,this.r&&Oh.apply(this.r.avatar,e)}async show(e,t,n,r){let i=performance.now();this.style=e;let a=this.ensure();this.canvas.hidden=!1,this.resize();let o=this.body.pose;am(this.body,.22,r.stance??1),a.syncBody();let s=lm(this.body,this.measurer,t,a.avatar.posedBodyPositions);this.body.setPose(o);let c=[...n],l=e=>c.some(t=>e.includes(t.spec.type));r.underwear&&!l([`skirt`,`pants`,`dress`])&&c.push({spec:Vh(t),cutout:null}),r.underwear&&!l([`top`,`dress`])&&c.push({spec:Hh(t),cutout:null});let u=e=>e.spec.__underwear?0:e.layer??Bh(e.spec),d=c.map((e,t)=>t).sort((e,t)=>u(c[e])-u(c[t])),f=[],p=[];for(let e of d){let t=c[e],n=Pm(t.spec,s,{over:[...p]});p.push(n),f.push({garment:n,textures:this.textures(n,t,s),layer:u(t),heat:r.heat&&!t.spec.__underwear})}a.setGarments(f),a.setStyle(e),r.half?a.frame(s.y.hip-.04,s.y.top+.1):a.frame(-.05,s.y.top+.2),await this.readyP,await a.ready(),a.render(),this.lastMs=performance.now()-i}textures(e,t,n){let r=t.cutout;if(r?.person){let t=Rh.get(r.person);return t||(t=oh(r.person),Rh.set(r.person,t)),ah(e,r.person,n,t)}if(r){let t=Rh.get(r);return t||(t=Xm(r.canvas),Rh.set(r,t)),$m(e,r,t)}let i=t.spec.color??`#9aa7b8`,a=Ah(i,t.spec.fabric.structure===`knit`);return e.pieces.map(()=>({image:a,uv:null,color:i,repeat:24}))}},Bh=e=>e.__underwear?0:e.type===`top`?2:1;function Vh(e){let t={type:`skirt`,sleeve:`none`,neckline:`crew`,silhouette:`fitted`,rise:`low`,fabric:{...sd,structure:`knit`,stretch:.3,drape:.6,thickness:.0012,sheen:.35,label:`彈性針織`},color:`#e9d6c8`,m:{waist:e.waist+1,hip:e.hips-1,hem:e.hips-1,length:Math.max(8,e.waistY-6-(e.crotchY-2))}};return t.__underwear=!0,t}function Hh(e){let t={type:`top`,sleeve:`none`,neckline:`scoop`,silhouette:`fitted`,rise:`natural`,fabric:{...sd,structure:`knit`,stretch:.3,drape:.6,thickness:.0012,sheen:.35,label:`彈性針織`},color:`#e9d6c8`,m:{chest:e.bust-1,waist:e.underbust-2,length:Math.max(12,e.neckY-e.bustY+9)}};return t.__underwear=!0,t}var $=e=>document.getElementById(e),Uh=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),Wh=()=>new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0))),Gh={targets:{height:160,bust:83,waist:66,hips:91},weight:52,skin:`young_asian_female`,skinTint:`#ffffff`,hair:`hair_bob02`,hairColor:`#3b2a20`},Kh={load(){try{let e=localStorage.getItem(`closet2.profile`);if(e)return{...Gh,...JSON.parse(e)}}catch{}return structuredClone(Gh)},save(e){try{localStorage.setItem(`closet2.profile`,JSON.stringify(e))}catch{}}},qh=1;async function Jh(){document.querySelectorAll(`.ai-only`).forEach(e=>e.remove());let e=new Ku($(`viewport`)),t=await _l();$(`loading`).hidden=!0;let n=new xl(t),r=new Fl(t),i=new Zl(n);e.turntable.add(i.group);let a=new zh($(`stage`),n,r),o=`3d`;try{o=localStorage.getItem(`closet2.look`)===`photo`?`photo`:`3d`}catch{}let s=0,c=()=>{clearTimeout(s),s=window.setTimeout(async()=>{if($(`look-save`).hidden=o===`3d`,$(`look-note`).hidden=o===`3d`||d!==`sit`,o===`3d`){a.hide();return}$(`busy`).hidden=!1;try{await a.show(o,u,m.map(e=>({spec:j(e),cutout:e.cutout,layer:A(e)})),{underwear:$(`underwear`).checked,half:d===`half`,heat:_,stance:f})}catch(e){console.error(e)}$(`busy`).hidden=!0},30)},l=Kh.load(),u=r.measure(n),d=`stand`,f=1;try{let e=parseFloat(localStorage.getItem(`closet2.stance`)??``);e>=0&&e<=1&&(f=e)}catch{}let p=ql(n,`stand`,f),m=[],h=[],g=null,_=!1,v=null,y=async e=>{$(`busy`).hidden=!1,await Wh();try{return await e()}finally{$(`busy`).hidden=!0}},b=()=>{for(let e of[`height`,`bust`,`underbust`,`waist`,`hips`,`shoulder`,`inseam`,`armLength`,`thigh`]){let t=l.targets[e];$(`m-`+e).value=t===void 0?``:String(t)}$(`m-weight`).value=l.weight?String(l.weight):``},x=()=>{let e={};for(let t of[`height`,`bust`,`underbust`,`waist`,`hips`,`shoulder`,`inseam`,`armLength`,`thigh`]){let n=parseFloat($(`m-`+t).value);Number.isFinite(n)&&n>0&&(e[t]=n)}return e},S=e=>{let t=[`height`,`bust`,`underbust`,`waist`,`hips`,`shoulder`,`armLength`,`inseam`,`thigh`,`upperArm`,`neck`,`backLength`].map(t=>{let n=e?.[t],r=n!==void 0&&Math.abs(n)>1.5?` <span class="status s-偏緊" title="與目標差 ${n}cm">差 ${n>0?`+`:``}${n}</span>`:``;return`<tr><td>${wl[t]}</td><td data-k="${t}">${u[t]} cm${r}</td></tr>`});$(`measured-table`).innerHTML=`<tr><th>假人實際量測</th><th></th></tr>${t.join(``)}`},C=async e=>y(()=>{let t=performance.now(),a=Ul(n,r,e,{weightKg:l.weight,extra:l.extra});u=a.measured,p=ql(n,d===`half`?`stand`:d,f),n.setPose(p),i.update(),R(),w(),S(a.residual);let o=Object.entries(a.residual).filter(([,e])=>Math.abs(e)>1.5);$(`solve-status`).textContent=o.length?`已套用（${Math.round(performance.now()-t)}ms）。${o.map(([e])=>wl[e]).join(`、`)} 超出模型可調範圍，已盡量接近。`:`已套用（${Math.round(performance.now()-t)}ms），誤差都在 1.5cm 內。`,ye(),ve(),Te?Oe():c()}),w=()=>{let a=i.posedBodyPositions,o=0;for(let e=1;e<a.length;e+=3)o=Math.max(o,a[e]);if(d===`sit`){let i=1/0,s=0,c=0,l=0,d=u.hipY/100+.1;for(let e=0;e<t.bodyVertexCount;e++){if(r.regions[e]!==0)continue;let t=a[e*3+1];n.rest[e*3+1]-n.rest[1]>d||(t<i&&(i=t),s+=a[e*3],c+=a[e*3+2],l++)}let f=Math.max(.2,i-.005);T={x:s/l,z:c/l-.04,r:.2,y:f},e.setFigure(o,f,new X(T.x,0,T.z))}else T=null,e.setFigure(o,null);for(let e of[...m].sort((e,t)=>A(e)-A(t)))e.view?.update(!0,T);e.setFraming(d===`half`?`half`:`full`)},T=null,E=null,D=t=>{d=t,document.querySelectorAll(`#pose-group button`).forEach(e=>e.classList.toggle(`on`,e.dataset.pose===t));let r=ql(n,t===`half`?`stand`:t,f);n.setPose(p),E={from:p,to:r,t:0},t===`half`&&e.setFraming(`half`),c()};e.onFrame=e=>{if(!E)return;E.t=Math.min(1,E.t+e/.7);let t=E.t*E.t*(3-2*E.t),r=Jl(E.from,E.to,t);n.setPose(r),i.update();for(let e of[...h,...[...m].sort((e,t)=>A(e)-A(t))])e.view?.update();E.t>=1&&(p=E.to,E=null,w())},document.querySelectorAll(`#pose-group button`).forEach(e=>e.addEventListener(`click`,()=>D(e.dataset.pose))),$(`autorotate`).addEventListener(`change`,t=>e.setAutoRotate(t.target.checked)),$(`quality`).addEventListener(`change`,t=>{e.quality=t.target.checked}),e.onQualityDrop=()=>{$(`quality`).checked=!1};let O=()=>m.find(e=>e.spec.type===`skirt`||e.spec.type===`pants`)??null,k=e=>e.spec.type===`top`&&!!e.spec.tucked&&!!O(),A=e=>{if(e.underwear)return 0;let t=m.some(k);return e.spec.type===`top`?t?1:2:t?2:1},j=e=>vd(k(e)?_d(e.spec,O().spec,u):e.spec,u),M=()=>{let e=e=>n.joint(e),t=[`upperarm01.L____head`,`upperleg01.L____head`,`lowerleg01.L____head`,`foot.L____head`];return{y:t.map(t=>e(t).y),half:t.map(t=>Math.abs(e(t).x))}},N=e=>{let r=1/0;for(let e=1;e<t.bodyVertexCount*3;e+=3)r=Math.min(r,n.rest[e]);let i=M().y.map(e=>(e-r)*100),a=Math.max(0,Math.min(3,e)),o=Math.min(2,Math.floor(a)),s=i[o]+(i[o+1]-i[o])*(a-o);return e>3?i[3]-(e-3)*(i[2]-i[3]):s},P=e=>{if(e.underwear)return[];let t=h.filter(e=>e.view);return t.push(...m.filter(t=>t!==e&&t.view&&t.spec.type!==`dress`&&e.spec.type!==`dress`&&A(t)<A(e))),t},F=0,I={},L=e=>{let t=performance.now();e.view?.dispose();let a=n.pose,o=P(e).map(e=>{let t=e.view.data;return{pos:t.rest,normals:Sl(t.rest,t.index,t.vertexCount),count:t.vertexCount}}),s=performance.now(),c=jd(j(e),{body:n,measurer:r,m:u,layer:A(e),under:o});n.setPose(a);let l=performance.now(),d=Kd(e.cutout,{bbox:c.bbox,torsoHalfWidth:c.torsoHalfWidth,plainBack:e.plainBack,avatarMarks:M()},e.spec.color??`#7a93b8`),f=performance.now();e.view=new Zu(i,e.spec,c,d),e.view.under=P(e).map(e=>e.view);let p=performance.now();e.view.update(!e.underwear,T),F=performance.now()-t,I={prep:s-t,build:l-s,atlas:f-l,view:p-f,skinSim:performance.now()-p},e.view.setHeatmap(_&&!e.underwear)},R=()=>{$(`underwear`).checked&&ee(!0);for(let e of[...m].sort((e,t)=>A(e)-A(t)))L(e)},ee=e=>{for(let e of h)e.view?.dispose();if(h=[],e){h=md(u).map(e=>({id:qh++,spec:e,cutout:null,plainBack:!0,view:null,chart:null,fit:null,underwear:!0}));for(let e of h)L(e)}for(let e of[...m].sort((e,t)=>A(e)-A(t)))e.view&&(e.view.under=P(e).map(e=>e.view),e.view.update(!0,T))};$(`underwear`).addEventListener(`change`,e=>y(()=>{ee(e.target.checked),c()})),$(`heatmap`).addEventListener(`change`,e=>{_=e.target.checked,$(`legend`).hidden=!_;for(let e of m)e.view?.setHeatmap(_);c()});let te=e=>e===`top`?`upper`:e===`dress`?`full`:`lower`,z=()=>{for(let e of m.filter(e=>e.spec.type!==`dress`).sort((e,t)=>A(e)-A(t)))L(e)},ne=(e,t,n)=>y(()=>{let r=te(e.type);for(let e=m.length-1;e>=0;e--){let t=te(m[e].spec.type);(t===r||r===`full`||t===`full`)&&(m[e].view?.dispose(),m.splice(e,1))}let i={id:qh++,spec:e,cutout:t,plainBack:n,view:null,chart:null,fit:null};return m.push(i),L(i),(e.type===`skirt`||e.type===`pants`||e.type===`top`)&&z(),g=i,le(),pe(),ye(),c(),i}),re=()=>gd($(`g-type`).value,{silhouette:$(`g-silhouette`).value,sleeve:$(`g-sleeve`).value,neckline:$(`g-neck`).value,rise:$(`g-rise`).value,color:$(`g-color`).value},u),B=[],ie={},ae=null,oe=e=>{let t=$(`cutout-preview`);t.width=e.width,t.height=e.height,t.getContext(`2d`).drawImage(e.canvas,0,0),$(`cutout-wrap`).hidden=!1},se=(e,t,n)=>{let r=B[e];v=Xd(t,r.mask,r.color,n),ae=r.hemT,oe(v),$(`g-type`).value=r.type,$(`g-silhouette`).value=r.silhouette,(r.type===`top`||r.type===`dress`)&&($(`g-sleeve`).value=r.sleeve),$(`g-color`).value=`#`+r.color.map(e=>Math.round(e).toString(16).padStart(2,`0`)).join(``),$(`guess-text`).textContent=`從人像照偵測到「${cd[r.type]}」${r.type===`top`||r.type===`dress`?`・`+ld[r.sleeve]:``}（${r.reason}）。`,document.querySelectorAll(`#person-garments button`).forEach((t,n)=>t.classList.toggle(`on`,n===e))},ce=async e=>{let t=performance.now(),n=await Jf(e).catch(()=>null);ie={detect:performance.now()-t};let r=n?.landmarks;if(!r||![11,12,23,24].every(e=>(r[e].visibility??1)>.5))return!1;let i=Zd(e),a=i.width/e.naturalWidth,o=Nd(r.map(e=>({x:e.x*a,y:e.y*a}))),s=performance.now(),c=await pf(i);ie.segment=performance.now()-s;let l=performance.now(),u=i.getContext(`2d`,{willReadFrequently:!0}).getImageData(0,0,i.width,i.height).data;if(B=Id(c,u,i.width,i.height,o),ie.analyze=performance.now()-l,!B.length)return!1;let d=$(`person-garments`);return d.innerHTML=``,B.forEach((e,t)=>{let n=document.createElement(`button`);n.textContent=`${cd[e.type]}${e.type===`top`||e.type===`dress`?`・`+ld[e.sleeve]:``}`,n.dataset.type=e.type,n.onclick=()=>se(t,i,o),d.appendChild(n)}),se(0,i,o),!0};$(`garment-photo`).addEventListener(`change`,async e=>{let t=e.target.files?.[0];t&&await y(async()=>{let e=await Rd(t);if($(`person-garments`).innerHTML=``,$(`cutout-wrap`).hidden=!1,$(`guess-text`).textContent=`分析照片中…（第一次需要載入人體偵測模型）`,ae=null,of(e)&&await ce(e))return;let n=Bd(e);v=n,oe(n);let r=Gd(n);$(`g-type`).value=r.type,(r.type===`top`||r.type===`dress`)&&($(`g-sleeve`).value=r.sleeve),$(`g-color`).value=`#`+n.color.map(e=>Math.round(e).toString(16).padStart(2,`0`)).join(``),$(`guess-text`).textContent=`判斷為「${cd[r.type]}」${r.type===`top`||r.type===`dress`?`・`+ld[r.sleeve]:``}（${r.reason}），不對可以在下方修改。`})}),$(`wear`).addEventListener(`click`,()=>{if(!v){$(`guess-text`).textContent=`請先選擇衣服照片，或按「用純色試穿」。`,$(`cutout-wrap`).hidden=!1;return}let e=re();if(v.person&&ae!==null){let t=N(ae),n=e.type===`skirt`||e.type===`pants`?u.waistY+pd(e.type,e.rise)*100:u.neckY;e.m.length=Math.max(e.type===`top`?30:25,Math.round(n-t)),e.type===`pants`&&(e.m.inseam=Math.max(20,Math.round(u.crotchY-t)))}ne(e,v,$(`g-plainback`).checked)}),$(`wear-plain`).addEventListener(`click`,()=>ne(re(),null,!0));let le=()=>{let e=$(`worn-list`);if(e.innerHTML=``,!m.length){e.innerHTML=`<li class="hint">還沒有穿衣服</li>`;return}for(let t of m){let n=document.createElement(`li`);n.classList.toggle(`sel`,t===g);let r=t.cutout?t.cutout.canvas.cloneNode():document.createElement(`div`);t.cutout?r.getContext(`2d`).drawImage(t.cutout.canvas,0,0):(r.className=`swatch`,r.style.background=t.spec.color??`#999`),n.appendChild(r);let i=document.createElement(`span`);i.textContent=t.uniqlo?`U牌 ${yp(t.uniqlo.id)?.name??``}・${Cp(yp(t.uniqlo.id),t.spec.size??``,t.uniqlo.recommended)}`:t.generated?`${t.generated.design.name}・${Cp(yp(t.generated.base),t.spec.size??``,t.generated.recommended)}`:`${dd[t.spec.silhouette]}${cd[t.spec.type]}${t.spec.size?`（${t.spec.size}）`:``}・${t.spec.fabric.label}`,n.appendChild(i);let a=t.uniqlo&&yp(t.uniqlo.id);if(a&&t.uniqlo){let e=t.uniqlo,r=document.createElement(`select`);r.className=`uq-size`,r.title=`尺碼（★ 是依你的身形推薦的）`,r.innerHTML=a.sizes.map(n=>`<option value="${n.size}" ${n.size===t.spec.size?`selected`:``}>${n.size}${n.size===e.recommended?` ★`:``}</option>`).join(``);let i=document.createElement(`select`);i.className=`uq-color`,i.innerHTML=a.colors.map((t,n)=>`<option value="${n}" ${n===e.color?`selected`:``}>${t.name}</option>`).join(``);let o=()=>y(()=>{let e=wp(a,Number(i.value),u,r.value);t.spec={...e.spec,tucked:t.spec.tucked},t.cutout=e.cutout,t.chart=e.chart,t.fit=e.fit,t.uniqlo={id:a.id,color:Number(i.value),recommended:e.recommended},t.spec.type===`dress`?L(t):z(),le(),ye(),c()});r.onchange=o,i.onchange=o,n.append(r,i)}if(t.spec.type===`top`&&O()){let e=document.createElement(`button`);e.className=`tuck`,e.textContent=t.spec.tucked?`放出來`:`紮進去`,e.title=t.spec.tucked?`衣襬放在褲子／裙子外面`:`把衣襬紮進褲子／裙子裡`,e.onclick=()=>y(()=>{t.spec={...t.spec,tucked:!t.spec.tucked},z(),le(),c()}),n.append(e)}if(t.generated){let e=t.generated,r=yp(e.base),i=document.createElement(`select`);i.className=`uq-size`,i.title=`尺碼（依 U牌基本款，★ 是依你的身形推薦的）`,i.innerHTML=r.sizes.map(n=>`<option value="${n.size}" ${n.size===t.spec.size?`selected`:``}>${n.size}${n.size===e.recommended?` ★`:``}</option>`).join(``),i.onchange=()=>y(()=>{let n=Kp(e.design,e.base,u,i.value);t.spec={...n.spec,tucked:t.spec.tucked},t.chart=n.chart,t.fit=n.fit,t.spec.type===`dress`?L(t):z(),le(),ye(),c()}),n.append(i)}let o=document.createElement(`button`);o.textContent=`選取`,o.onclick=()=>{g=t,le(),pe()};let s=document.createElement(`button`);s.textContent=`收進衣櫃`,s.onclick=async()=>{let e=i.textContent??cd[t.spec.type];await tp.put(await ip(t.spec,t.cutout,t.plainBack,{name:e,sizeText:t.sizeText,fabricText:t.fabricText})),s.textContent=`已收藏`,s.disabled=!0,ue()},n.append(s);let l=document.createElement(`button`);l.textContent=`脫下`,l.onclick=()=>{t.view?.dispose(),m.splice(m.indexOf(t),1),g===t&&(g=m[0]??null),t.spec.type!==`dress`&&z(),le(),pe(),ye(),c()},n.append(o,l),e.appendChild(n)}},ue=async()=>{let e=$(`wardrobe-list`),t=[];try{t=await tp.list()}catch{e.innerHTML=`<li class="hint">這個瀏覽器無法使用衣櫃（IndexedDB 被停用）</li>`;return}e.innerHTML=t.length?``:`<li class="hint">還沒有收藏的衣服</li>`;for(let n of t){let t=document.createElement(`li`),r=document.createElement(`img`);r.src=URL.createObjectURL(n.thumb),r.className=`swatch`;let i=document.createElement(`span`);i.textContent=n.name;let a=document.createElement(`button`);a.textContent=`穿上`,a.onclick=async()=>{if(n.generated){let e=Kp(n.generated.design,n.generated.base,u),t=await ne(e.spec,await ap(n),!1);t.chart=e.chart,t.fit=e.fit,t.generated={...n.generated,recommended:e.recommended},le(),ye();return}let e=n.uniqlo&&yp(n.uniqlo.id);if(e&&n.uniqlo){await de(e.id,n.uniqlo.color),le(),ye();return}let t=await ap(n),r=structuredClone(n.spec);n.preset&&(r=gd(n.preset.type,n.preset,u),n.fabricText&&(r.fabric=id(n.fabricText)));let i=await ne(r,t,n.plainBack);if(n.sizeText){i.sizeText=n.sizeText,i.fabricText=n.fabricText,i.chart=Tf(n.sizeText);let e=i.chart.rows.find(e=>e.size===i.spec.size);e&&(i.fit=kf(e,u,i.spec.type,i.spec.fabric,i.spec.sleeve)),ye()}};let o=document.createElement(`button`);o.textContent=`刪除`,o.onclick=async()=>{await tp.remove(n.id),ue()},n.preset&&(i.title=`依你目前的身形自動調整尺寸`),t.append(r,i,a,o),e.appendChild(t)}},de=async(e,t,n=!1)=>{let r=yp(e);if(!r)return null;let i=wp(r,t,u);n&&(i.spec.tucked=!0);let a=await ne(i.spec,i.cutout,!0);return a.chart=i.chart,a.fit=i.fit,a.uniqlo={id:r.id,color:t,recommended:i.recommended},a},fe=$(`outfit-chips`);for(let e of kp){let t=document.createElement(`button`);t.textContent=e.name,t.dataset.outfit=e.name,t.onclick=async()=>{for(let e of[...m])e.view?.dispose(),m.splice(m.indexOf(e),1);let t=[...e.items].sort((e,t)=>+(yp(e.id)?.type===`top`)-(yp(t.id)?.type===`top`));for(let n of t)await de(n.id,Ap(yp(n.id),n.color),!!e.tucked&&yp(n.id)?.type===`top`);z(),le(),pe(),ye(),c()},fe.appendChild(t)}$(`gen-go`)?.addEventListener(`click`,async()=>{let e=$(`gen-text`).value.trim(),t=Number($(`gen-count`).value),n=e=>{$(`gen-status`).textContent=e};if(!e){n(`請先描述想要的衣服或衣櫃風格。`);return}let r=$(`gen-go`);r.disabled=!0;let i=[];try{n(`AI 設計中（通常 20–60 秒）…`);try{let n=await fetch(`/api/ask`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify({prompt:Ip(e,t)})}),r=await n.json().catch(()=>({}));if(!n.ok)throw Error(r.error||`HTTP ${n.status}`);i=Bp(r.text)}catch(t){i=Wp(e),n(`AI 中繼沒有回應（${t.message}），改用關鍵字判斷。`)}let r=Date.now();for(let[e,t]of i.entries())await tp.put(await Jp(t,r+(i.length-e)));await ue(),n(`已放進衣櫃 ${i.length} 件：${i.map(e=>e.name).join(`、`)}。在下方衣櫃按「穿上」試穿。`)}catch(e){n(`生成失敗：`+e.message)}finally{r.disabled=!1}}),$(`wardrobe-defaults`).addEventListener(`click`,async()=>{let e=await em(!0)+await Op(!0);$(`wardrobe-defaults`).textContent=e?`已放回 ${e} 件預設衣服`:`預設衣服都在衣櫃裡了`,ue()});let pe=()=>{let e=$(`size-target`);e.innerHTML=m.map(e=>`<option value="${e.id}" ${e===g?`selected`:``}>身上的${cd[e.spec.type]}</option>`).join(``)+[`top`,`dress`,`skirt`,`pants`].map(e=>`<option value="new-${e}">新的${cd[e]}（純色）</option>`).join(``)},me=null,he=sd,ge=null;$(`parse-size`).addEventListener(`click`,async()=>{me=Tf($(`size-text`).value);let e=$(`fabric-text`).value.trim();he=e?id(e):sd,$(`size-warnings`).textContent=me.warnings.join(` `),$(`fabric-info`).innerHTML=`<div class="card"><b>材質：</b>${Uh(he.label)}・${od(he)}（可延展約 ${Math.round(he.stretch*100)}%）・垂墜度 ${Math.round(he.drape*100)}%</div>`;let t=$(`size-target`).value;if(t.startsWith(`new-`)){let e=hd(t.slice(4),u);e.color=$(`g-color`).value,ge=await ne(e,null,!0)}else ge=m.find(e=>String(e.id)===t)??g;if(!ge||!me.rows.length){$(`size-buttons`).innerHTML=``,$(`fit-table`).innerHTML=``,$(`recommend`).innerHTML=``;return}ge.chart=me,ge.sizeText=$(`size-text`).value,ge.fabricText=$(`fabric-text`).value;let n=jf(me.rows,u,ge.spec.type,he,ge.spec.sleeve),r=$(`size-buttons`);r.innerHTML=``;for(let e of me.rows){let t=document.createElement(`button`);t.textContent=e.size,t.dataset.size=e.size,e.size===n.best.size&&t.classList.add(`best`),t.onclick=()=>_e(e.size),r.appendChild(t)}$(`recommend`).innerHTML=`<div class="card" id="recommend-card"><h3>推薦尺碼：${Uh(n.best.size)}</h3>${Uh(n.best.summary)}<br><span class="hint">${n.all.map(e=>`${e.size}：${e.verdict}`).join(`　`)}</span></div>`,await _e(n.best.size)});let _e=e=>y(()=>{if(!me||!ge)return;let t=me.rows.find(t=>t.size===e);document.querySelectorAll(`#size-buttons button`).forEach(t=>t.classList.toggle(`on`,t.dataset.size===e));let n=ge,r=hd(n.spec.type,u);n.spec={...n.spec,fabric:he,size:e,m:{...r.m,...n.spec.m,...t.values}},n.spec.type===`dress`?L(n):z(),n.fit=kf(t,u,n.spec.type,he,n.spec.sleeve),V(n.fit),le(),ye(),c()}),V=e=>{$(`fit-table`).innerHTML=`<tr><th>部位</th><th>衣服</th><th>身體</th><th>判斷</th></tr>`+e.regions.map(e=>`<tr data-key="${e.key}"><td>${Uh(e.label)}</td><td>${e.garment}</td><td>${e.body||`—`}</td><td><span class="status s-${e.status}">${e.status}</span><br><span class="hint">${Uh(e.note)}</span></td></tr>`).join(``)+`<tr><td colspan="4"><b>${Uh(e.size)}：${Uh(e.verdict)}</b>　${Uh(e.summary)}</td></tr>`},ve=()=>{for(let e of m){if(!e.chart||!e.spec.size)continue;let t=e.chart.rows.find(t=>t.size===e.spec.size);t&&(e.fit=kf(t,u,e.spec.type,e.spec.fabric,e.spec.sleeve)),e===ge&&e.fit&&V(e.fit)}},ye=()=>{let e=Pf({bust:u.bust,waist:u.waist,hips:u.hips,shoulder:u.shoulder,height:u.height,inseam:u.inseam}),t=g??m[0]??null,n=If(e,t?.spec,t?.fit),r=e=>`<ul>${e.map(e=>`<li>${Uh(e)}</li>`).join(``)}</ul>`;return $(`advice`).innerHTML=`
      <div class="card" id="shape-card"><h3>${Uh(n.headline)}</h3><div class="hint">${Uh(e.reasons.join(`；`))}</div><p>${Uh(n.goal)}</p></div>
      <div class="card"><h3>推薦單品</h3>${r(n.recommend)}</div>
      <div class="card"><h3>適合的領口</h3>${r(n.necklines)}</div>
      <div class="card"><h3>盡量避免</h3>${r(n.avoid)}</div>
      <div class="card"><h3>比例小技巧</h3>${r(n.tips)}</div>
      ${n.garmentComments.length?`<div class="card" id="garment-advice"><h3>這件衣服</h3>${r(n.garmentComments)}</div>`:``}`,{shape:e,garment:t}},be=()=>{let{shape:e,garment:t}=ye();return Rf(u,e,t?.spec,t?.fit,$(`ai-question`).value)};$(`ai-copy`)?.addEventListener(`click`,async()=>{let e=be();try{await navigator.clipboard.writeText(e),$(`ai-status`).textContent=`已複製提示詞，可以貼到 claude.ai。`}catch{$(`ai-answer`).textContent=e,$(`ai-status`).textContent=`無法存取剪貼簿，提示詞顯示在下方，請手動複製。`}}),$(`ai-ask`)?.addEventListener(`click`,async()=>{let e=$(`ai-ask`);e.disabled=!0,$(`ai-status`).textContent=`AI 思考中（通常 10–60 秒）…`;try{let e=await fetch(`/api/ask`,{method:`POST`,headers:{"content-type":`application/json`},body:JSON.stringify({prompt:be()})}),t=await e.json().catch(()=>({error:`HTTP ${e.status}`}));if(!e.ok)throw Error(t.error||`HTTP ${e.status}`);$(`ai-answer`).textContent=t.text,$(`ai-status`).textContent=`完成。`}catch(e){$(`ai-status`).textContent=`無法連到 AI 中繼（${e.message}）。請在終端機執行 npm run bridge，或改用「複製提示詞」。`}finally{e.disabled=!1}});let xe=[[`race-caucasian`,`臉型：歐美`],[`race-african`,`臉型：非洲`],[`muscle`,`肌肉線條`],[`belly`,`小腹`],[`buttocks`,`臀部豐滿`],[`firmness`,`胸型挺度`],[`vshape`,`倒三角`],[`torsodepth`,`軀幹厚度`],[`neckheight`,`脖子長`]],Se=$(`shape-sliders`);for(let[e,n]of xe){if(!t.morphs.has(e)&&!t.morphs.has(e+`+`))continue;let r=e.startsWith(`race-`),i=l.extra?.[e]??0,a=document.createElement(`label`);a.innerHTML=`<span>${n}</span><input type="range" min="${r?0:-1}" max="1" step="0.05" value="${i}" data-key="${e}"><output>${i.toFixed(2)}</output>`;let o=a.querySelector(`input`);o.addEventListener(`input`,()=>{a.querySelector(`output`).textContent=Number(o.value).toFixed(2),l.extra={...l.extra??{},[e]:Number(o.value)},Kh.save(l)}),Se.appendChild(a)}$(`skin`).innerHTML=t.skins.map(e=>`<option value="${e.name}">${e.label}</option>`).join(``),$(`hair`).innerHTML=`<option value="">無</option>`+t.hair.map(e=>`<option value="${e.name}">${e.label}</option>`).join(``);let Ce=()=>{i.setSkin(l.skin,l.skinTint),i.setHair(l.hair||null),i.setHairColor(l.hairColor),a.setLook(l.skin,l.skinTint,l.hair||null,l.hairColor),Te?Oe():c(),$(`skin`).value=l.skin,$(`skin-tint`).value=l.skinTint,$(`hair`).value=l.hair,$(`hair-color`).value=l.hairColor};for(let[e,t]of[[`skin`,`skin`],[`skin-tint`,`skinTint`],[`hair`,`hair`],[`hair-color`,`hairColor`]])$(e).addEventListener(`input`,e=>{l[t]=e.target.value,Kh.save(l),Ce()});let we=new Oh(n),Te=null,Ee=0,H=e=>{$(`face-status`).textContent=e},De=()=>(t.skins.find(e=>e.name===l.skin)??t.skins[0]).texture,Oe=()=>{clearTimeout(Ee),Ee=window.setTimeout(async()=>{if(!Te){Oh.apply(i,null),a.setFace(null),i.setSkin(l.skin,l.skinTint),a.setLook(l.skin,l.skinTint,l.hair||null,l.hairColor),c();return}$(`busy`).hidden=!1;try{let e=await we.compose(Te,De(),Number($(`face-strength`).value));if(!e){H(`假人的臉部偵測失敗，請稍後再試一次。`);return}Oh.apply(i,e),a.setFace(e),c()}catch(e){console.error(e),H(`合成失敗：`+e.message)}finally{$(`busy`).hidden=!0}},120)},ke=e=>{try{e?localStorage.setItem(`closet2.face`,e.toDataURL(`image/jpeg`,.9)):localStorage.removeItem(`closet2.face`)}catch{}},U=Object.fromEntries(t.hair.map(e=>[e.name,e.label]));$(`face-photo`).addEventListener(`change`,async e=>{let t=e.target.files?.[0];if(t){H(`分析照片中…（第一次需要載入臉部偵測模型）`),$(`busy`).hidden=!1;try{let e=await Eh(await Rd(t));if(!e){H(`照片裡找不到臉。請換一張正面、清楚、臉部夠大的照片。`);return}Te=e,ke(e.canvas),e.hair&&(l.hair=e.hair.style,l.hairColor=e.hair.color,Kh.save(l),$(`hair`).value=l.hair,$(`hair-color`).value=l.hairColor),Ce(),H(`已套用：五官、膚色${e.iris?`、眼睛顏色`:``}${e.hair?`、髮色、髮型「${U[e.hair.style]}」（${e.hair.reason}）`:``}。髮型和膚色都可以在上面「外觀」再改。`)}catch(e){console.error(e),H(`分析失敗：`+e.message)}finally{$(`busy`).hidden=!0}}}),$(`face-strength`).addEventListener(`input`,()=>{try{localStorage.setItem(`closet2.faceStrength`,$(`face-strength`).value)}catch{}Te&&Oe()}),$(`face-remove`).addEventListener(`click`,()=>{Te=null,ke(null),$(`face-photo`).value=``,H(`已移除，假人恢復原本的臉。`),Oe()});try{let e=localStorage.getItem(`closet2.faceStrength`);e&&($(`face-strength`).value=e)}catch{}let Ae=async()=>{let e=null;try{e=localStorage.getItem(`closet2.face`)}catch{}if(e)try{let t=await Eh(await Rd(e));if(!t)return;Te=t,Oe(),H(`已套用之前上傳的自拍。`)}catch(e){console.warn(`saved face could not be restored`,e)}};document.querySelector(`#tab-body details`)?.addEventListener(`toggle`,()=>Xf()),$(`photo-measure`).addEventListener(`click`,async()=>{let e=$(`photo-front`).files?.[0],t=$(`photo-side`).files?.[0],n=parseFloat($(`m-height`).value);if(!e){$(`photo-status`).textContent=`請先選擇正面照。`;return}if(!(n>100)){$(`photo-status`).textContent=`請先填寫身高（用來換算比例）。`;return}$(`photo-status`).textContent=`分析照片中（第一次需要載入模型）…`;try{let r=await Yf(await Rd(e),n,t?await Rd(t):null);for(let e of[`bust`,`waist`,`hips`,`shoulder`,`inseam`,`armLength`])$(`m-`+e).value=String(r[e]);$(`photo-status`).textContent=`估算完成：胸 ${r.bust}、腰 ${r.waist}、臀 ${r.hips}、肩 ${r.shoulder}、跨下 ${r.inseam}。${r.notes.join(` `)} 確認數字後按「套用到假人」。`}catch(e){$(`photo-status`).textContent=`量身失敗：`+e.message}});let W=$(`stance`);W.value=String(f);let G=0;W.addEventListener(`input`,()=>{f=Number(W.value);try{localStorage.setItem(`closet2.stance`,String(f))}catch{}clearTimeout(G),G=window.setTimeout(()=>D(d),120)});let je=e=>{$(`avatar-status`).textContent=e},Me=e=>{let t=nm.list(),n=$(`avatar-list`);n.innerHTML=t.length?t.map(e=>`<option value="${e.id}">${Uh(e.name)}（${new Date(e.savedAt).toLocaleDateString(`zh-TW`)}）</option>`).join(``):`<option value="">（還沒有存過）</option>`,e&&(n.value=e)},Ne=()=>({targets:{...l.targets},weight:l.weight,extra:{...l.extra??{}},skin:l.skin,skinTint:l.skinTint,hair:l.hair,hairColor:l.hairColor,face:Te?Te.canvas.toDataURL(`image/jpeg`,.9):null,faceStrength:Number($(`face-strength`).value),stance:f}),Pe=async e=>{if(l.targets={...e.targets},l.weight=e.weight,l.extra={...e.extra??{}},Object.assign(l,{skin:e.skin,skinTint:e.skinTint,hair:e.hair,hairColor:e.hairColor}),Kh.save(l),b(),Se.querySelectorAll(`input[type=range]`).forEach(e=>{let t=l.extra?.[e.dataset.key]??0;e.value=String(t),e.parentElement.querySelector(`output`).textContent=t.toFixed(2)}),e.faceStrength&&($(`face-strength`).value=String(e.faceStrength)),e.stance!==void 0){f=e.stance,W.value=String(f);try{localStorage.setItem(`closet2.stance`,String(f))}catch{}}if(Te=null,e.face)try{Te=await Eh(await Rd(e.face))}catch(e){console.warn(e)}ke(Te?.canvas??null),H(Te?`已套用這個假人的自拍。`:``),Ce(),await C(l.targets),D(d)};$(`avatar-save`).addEventListener(`click`,()=>{let e=$(`avatar-name`).value.trim()||`假人 ${new Date().toLocaleString(`zh-TW`)}`;try{let t=nm.save(e,Ne());Me(t.id),je(`已儲存「${e}」。`)}catch{je(`瀏覽器儲存空間不夠，請刪除一些舊的假人，或用「匯出檔案」存到電腦。`)}}),$(`avatar-load`).addEventListener(`click`,()=>y(async()=>{let e=nm.list().find(e=>e.id===$(`avatar-list`).value);if(!e){je(`請先選一個已存的假人。`);return}await Pe(e.snapshot),$(`avatar-name`).value=e.name,je(`已讀取「${e.name}」。`)})),$(`avatar-delete`).addEventListener(`click`,()=>{let e=$(`avatar-list`).value,t=nm.list().find(t=>t.id===e);if(!t)return;let n=$(`avatar-delete`);if(n.dataset.confirm!==e){n.dataset.confirm=e,n.textContent=`確定刪除？`,setTimeout(()=>{n.textContent=`刪除`,delete n.dataset.confirm},3e3);return}nm.remove(e),n.textContent=`刪除`,delete n.dataset.confirm,Me(),je(`已刪除「${t.name}」。`)}),$(`avatar-export`).addEventListener(`click`,()=>{let e=$(`avatar-list`).value,t=nm.list().find(t=>t.id===e)??{id:`current`,name:$(`avatar-name`).value.trim()||`目前的假人`,savedAt:Date.now(),snapshot:Ne()},n=URL.createObjectURL(rm(t)),r=document.createElement(`a`);r.href=n,r.download=`假人-${t.name}.json`,r.click(),setTimeout(()=>URL.revokeObjectURL(n),5e3),je(`已匯出「${t.name}」。`)}),$(`avatar-import`).addEventListener(`change`,e=>y(async()=>{let t=e.target.files?.[0];if(t)try{let{name:e,snapshot:n}=im(await t.text());await Pe(n);try{Me(nm.save(e,n).id)}catch{}$(`avatar-name`).value=e,je(`已匯入並套用「${e}」。`)}catch(e){je(`匯入失敗：`+e.message)}finally{e.target.value=``}})),Me();let Fe=$(`look-style`);Fe.value=o,Fe.addEventListener(`change`,()=>{o=Fe.value;try{localStorage.setItem(`closet2.look`,o)}catch{}c()}),$(`look-save`).addEventListener(`click`,()=>{a.canvas.toBlob(e=>{if(!e)return;let t=document.createElement(`a`);t.href=URL.createObjectURL(e),t.download=`closet-${o}.png`,t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),5e3)},`image/png`)}),document.querySelectorAll(`#tabs button`).forEach(e=>e.addEventListener(`click`,()=>{document.querySelectorAll(`#tabs button`).forEach(t=>t.classList.toggle(`on`,t===e)),document.querySelectorAll(`.tab`).forEach(t=>t.hidden=t.id!==`tab-`+e.dataset.tab),e.dataset.tab===`style`&&ye(),e.dataset.tab===`wear`&&(Xf(),mf())})),$(`apply-body`).addEventListener(`click`,()=>{l.targets=x();let e=parseFloat($(`m-weight`).value);l.weight=Number.isFinite(e)&&e>0?e:void 0,Kh.save(l),C(l.targets)}),b(),Ce(),le(),em().then(()=>Op()).catch(e=>console.warn(`default wardrobe`,e)).finally(()=>ue()),pe(),await C(l.targets),Ae(),window.__closet={body:n,measurer:r,avatar:i,stage:e,data:t,worn:m,get measurements(){return u},get pose(){return d},get poseSettled(){return E===null},get lastWearMs(){return F},get wearBreakdown(){return I},get personTiming(){return ie},garmentKeys:hf,setPose:D,setUnderwear:ee,measureFromPhotos:Yf,loadImage:Rd,look:a,get lookStyle(){return o},get stance(){return f},get selfie(){return Te},avatars:nm},window.__ready=!0}Jh().catch(e=>{console.error(e);let t=document.getElementById(`loading`);t&&(t.hidden=!1,t.textContent=`載入失敗：`+e.message)});export{uf as t};