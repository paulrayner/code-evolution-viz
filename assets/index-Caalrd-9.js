(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gr="160",Xn={ROTATE:0,DOLLY:1,PAN:2},$n={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nc=0,ao=1,ic=2,Ja=1,sc=2,ln=3,Tn=0,Tt=1,cn=2,Sn=0,pi=1,lo=2,co=3,ho=4,rc=5,In=100,oc=101,ac=102,uo=103,fo=104,lc=200,cc=201,hc=202,dc=203,Lr=204,Pr=205,uc=206,fc=207,pc=208,mc=209,gc=210,_c=211,xc=212,vc=213,yc=214,Mc=0,Sc=1,Ec=2,As=3,bc=4,Tc=5,Ac=6,wc=7,Vr=0,Cc=1,Rc=2,En=0,Lc=1,Pc=2,Dc=3,Ic=4,Uc=5,Nc=6,Qa=300,_i=301,xi=302,Dr=303,Ir=304,Fs=306,Ur=1e3,Wt=1001,Nr=1002,St=1003,po=1004,Ys=1005,Ut=1006,Fc=1007,Fi=1008,bn=1009,Oc=1010,Bc=1011,Wr=1012,el=1013,vn=1014,yn=1015,Oi=1016,tl=1017,nl=1018,Fn=1020,zc=1021,Xt=1023,Hc=1024,kc=1025,On=1026,vi=1027,Gc=1028,il=1029,Vc=1030,sl=1031,rl=1033,js=33776,Ks=33777,Zs=33778,Js=33779,mo=35840,go=35841,_o=35842,xo=35843,ol=36196,vo=37492,yo=37496,Mo=37808,So=37809,Eo=37810,bo=37811,To=37812,Ao=37813,wo=37814,Co=37815,Ro=37816,Lo=37817,Po=37818,Do=37819,Io=37820,Uo=37821,Qs=36492,No=36494,Fo=36495,Wc=36283,Oo=36284,Bo=36285,zo=36286,al=3e3,Bn=3001,Xc=3200,$c=3201,ll=0,qc=1,Ft="",gt="srgb",un="srgb-linear",Xr="display-p3",Os="display-p3-linear",ws="linear",Qe="srgb",Cs="rec709",Rs="p3",qn=7680,Ho=519,Yc=512,jc=513,Kc=514,cl=515,Zc=516,Jc=517,Qc=518,eh=519,ko=35044,Go="300 es",Fr=1035,hn=2e3,Ls=2001;class Wn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vs=Math.PI/180,Or=180/Math.PI;function Gi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function Et(i,e,t){return Math.max(e,Math.min(t,i))}function th(i,e){return(i%e+e)%e}function er(i,e,t){return(1-t)*i+t*e}function Vo(i){return(i&i-1)===0&&i!==0}function Br(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const nh={DEG2RAD:vs};class Re{constructor(e=0,t=0){Re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,s,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],u=s[6],y=s[1],x=s[4],b=s[7],w=s[2],A=s[5],C=s[8];return r[0]=a*_+o*y+l*w,r[3]=a*p+o*x+l*A,r[6]=a*u+o*b+l*C,r[1]=c*_+h*y+d*w,r[4]=c*p+h*x+d*A,r[7]=c*u+h*b+d*C,r[2]=f*_+m*y+g*w,r[5]=f*p+m*x+g*A,r[8]=f*u+m*b+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*r,m=c*r-a*l,g=t*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(tr.makeScale(e,t)),this}rotate(e){return this.premultiply(tr.makeRotation(-e)),this}translate(e,t){return this.premultiply(tr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const tr=new Ve;function hl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ih(){const i=Ps("canvas");return i.style.display="block",i}const Wo={};function Di(i){i in Wo||(Wo[i]=!0,console.warn(i))}const Xo=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$o=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$i={[un]:{transfer:ws,primaries:Cs,toReference:i=>i,fromReference:i=>i},[gt]:{transfer:Qe,primaries:Cs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Os]:{transfer:ws,primaries:Rs,toReference:i=>i.applyMatrix3($o),fromReference:i=>i.applyMatrix3(Xo)},[Xr]:{transfer:Qe,primaries:Rs,toReference:i=>i.convertSRGBToLinear().applyMatrix3($o),fromReference:i=>i.applyMatrix3(Xo).convertLinearToSRGB()}},sh=new Set([un,Os]),Ke={enabled:!0,_workingColorSpace:un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!sh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=$i[e].toReference,s=$i[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return $i[i].primaries},getTransfer:function(i){return i===Ft?ws:$i[i].transfer}};function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yn;class dl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yn===void 0&&(Yn=Ps("canvas")),Yn.width=e.width,Yn.height=e.height;const n=Yn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Yn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ps("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rh=0;class ul{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=Gi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ir(s[a].image)):r.push(ir(s[a]))}else r=ir(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ir(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oh=0;class Lt extends Wn{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,n=Wt,s=Wt,r=Ut,a=Fi,o=Xt,l=bn,c=Lt.DEFAULT_ANISOTROPY,h=Ft){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Gi(),this.name="",this.source=new ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Bn?gt:Ft),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qa)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ur:e.x=e.x-Math.floor(e.x);break;case Wt:e.x=e.x<0?0:1;break;case Nr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ur:e.y=e.y-Math.floor(e.y);break;case Wt:e.y=e.y<0?0:1;break;case Nr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===gt?Bn:al}set encoding(e){Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Bn?gt:Ft}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Qa;Lt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,n=0,s=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,b=(m+1)/2,w=(u+1)/2,A=(h+f)/4,C=(d+_)/4,U=(g+p)/4;return x>b&&x>w?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=A/n,r=C/n):b>w?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=A/s,r=U/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=U/r),this.set(n,s,r,t),this}let y=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ah extends Wn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Di("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Bn?gt:Ft),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Lt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ul(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends ah{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fl extends Lt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lh extends Lt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=St,this.minFilter=St,this.wrapR=Wt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==m||h!==g){let p=1-o;const u=l*f+c*m+h*g+d*_,y=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const w=Math.sqrt(x),A=Math.atan2(w,u*y);p=Math.sin(p*A)/w,o=Math.sin(o*A)/w}const b=o*y;if(l=l*p+f*b,c=c*p+m*b,h=h*p+g*b,d=d*p+_*b,p===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*m-c*f,e[t+1]=l*g+h*f+c*d-o*m,e[t+2]=c*g+h*m+o*f-l*d,e[t+3]=h*g-o*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d+f*m*g;break;case"YZX":this._x=f*h*d+c*m*g,this._y=c*m*d+f*h*g,this._z=c*h*g-f*m*d,this._w=c*h*d-f*m*g;break;case"XZY":this._x=f*h*d-c*m*g,this._y=c*m*d-f*h*g,this._z=c*h*g+f*m*d,this._w=c*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sr.copy(this).projectOnVector(e),this.sub(sr)}reflect(e){return this.sub(sr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sr=new P,qo=new Gn;class Mi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,zt):zt.fromBufferAttribute(r,a),zt.applyMatrix4(e.matrixWorld),this.expandByPoint(zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qi.copy(n.boundingBox)),qi.applyMatrix4(e.matrixWorld),this.union(qi)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,zt),zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wi),Yi.subVectors(this.max,wi),jn.subVectors(e.a,wi),Kn.subVectors(e.b,wi),Zn.subVectors(e.c,wi),fn.subVectors(Kn,jn),pn.subVectors(Zn,Kn),Cn.subVectors(jn,Zn);let t=[0,-fn.z,fn.y,0,-pn.z,pn.y,0,-Cn.z,Cn.y,fn.z,0,-fn.x,pn.z,0,-pn.x,Cn.z,0,-Cn.x,-fn.y,fn.x,0,-pn.y,pn.x,0,-Cn.y,Cn.x,0];return!rr(t,jn,Kn,Zn,Yi)||(t=[1,0,0,0,1,0,0,0,1],!rr(t,jn,Kn,Zn,Yi))?!1:(ji.crossVectors(fn,pn),t=[ji.x,ji.y,ji.z],rr(t,jn,Kn,Zn,Yi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const nn=[new P,new P,new P,new P,new P,new P,new P,new P],zt=new P,qi=new Mi,jn=new P,Kn=new P,Zn=new P,fn=new P,pn=new P,Cn=new P,wi=new P,Yi=new P,ji=new P,Rn=new P;function rr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Rn.fromArray(i,r);const o=s.x*Math.abs(Rn.x)+s.y*Math.abs(Rn.y)+s.z*Math.abs(Rn.z),l=e.dot(Rn),c=t.dot(Rn),h=n.dot(Rn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ch=new Mi,Ci=new P,or=new P;class Bs{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ch.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ci.subVectors(e,this.center);const t=Ci.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ci,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(or.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ci.copy(e.center).add(or)),this.expandByPoint(Ci.copy(e.center).sub(or))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new P,ar=new P,Ki=new P,mn=new P,lr=new P,Zi=new P,cr=new P;class zs{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sn.copy(this.origin).addScaledVector(this.direction,t),sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ar.copy(e).add(t).multiplyScalar(.5),Ki.copy(t).sub(e).normalize(),mn.copy(this.origin).sub(ar);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ki),o=mn.dot(this.direction),l=-mn.dot(Ki),c=mn.lengthSq(),h=Math.abs(1-a*a);let d,f,m,g;if(h>0)if(d=a*l-o,f=a*o-l,g=r*h,d>=0)if(f>=-g)if(f<=g){const _=1/h;d*=_,f*=_,m=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ar).addScaledVector(Ki,f),m}intersectSphere(e,t){sn.subVectors(e.center,this.origin);const n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,sn)!==null}intersectTriangle(e,t,n,s,r){lr.subVectors(t,e),Zi.subVectors(n,e),cr.crossVectors(lr,Zi);let a=this.direction.dot(cr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mn.subVectors(this.origin,e);const l=o*this.direction.dot(Zi.crossVectors(mn,Zi));if(l<0)return null;const c=o*this.direction.dot(lr.cross(mn));if(c<0||l+c>a)return null;const h=-o*mn.dot(cr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,n,s,r,a,o,l,c,h,d,f,m,g,_,p){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,f,m,g,_,p)}set(e,t,n,s,r,a,o,l,c,h,d,f,m,g,_,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Jn.setFromMatrixColumn(e,0).length(),r=1/Jn.setFromMatrixColumn(e,1).length(),a=1/Jn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,m=l*d,g=c*h,_=c*d;t[0]=f-_*o,t[4]=-a*d,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,m=a*d,g=o*h,_=o*d;t[0]=l*h,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-f*d,t[8]=g*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+_,t[5]=a*h,t[9]=m*d-g,t[2]=g*d-m,t[6]=o*h,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hh,e,dh)}lookAt(e,t,n){const s=this.elements;return Ct.subVectors(e,t),Ct.lengthSq()===0&&(Ct.z=1),Ct.normalize(),gn.crossVectors(n,Ct),gn.lengthSq()===0&&(Math.abs(n.z)===1?Ct.x+=1e-4:Ct.z+=1e-4,Ct.normalize(),gn.crossVectors(n,Ct)),gn.normalize(),Ji.crossVectors(Ct,gn),s[0]=gn.x,s[4]=Ji.x,s[8]=Ct.x,s[1]=gn.y,s[5]=Ji.y,s[9]=Ct.y,s[2]=gn.z,s[6]=Ji.z,s[10]=Ct.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],u=n[14],y=n[3],x=n[7],b=n[11],w=n[15],A=s[0],C=s[4],U=s[8],M=s[12],T=s[1],k=s[5],W=s[9],te=s[13],D=s[2],z=s[6],V=s[10],q=s[14],X=s[3],$=s[7],Y=s[11],se=s[15];return r[0]=a*A+o*T+l*D+c*X,r[4]=a*C+o*k+l*z+c*$,r[8]=a*U+o*W+l*V+c*Y,r[12]=a*M+o*te+l*q+c*se,r[1]=h*A+d*T+f*D+m*X,r[5]=h*C+d*k+f*z+m*$,r[9]=h*U+d*W+f*V+m*Y,r[13]=h*M+d*te+f*q+m*se,r[2]=g*A+_*T+p*D+u*X,r[6]=g*C+_*k+p*z+u*$,r[10]=g*U+_*W+p*V+u*Y,r[14]=g*M+_*te+p*q+u*se,r[3]=y*A+x*T+b*D+w*X,r[7]=y*C+x*k+b*z+w*$,r[11]=y*U+x*W+b*V+w*Y,r[15]=y*M+x*te+b*q+w*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],u=e[15];return g*(+r*l*d-s*c*d-r*o*f+n*c*f+s*o*m-n*l*m)+_*(+t*l*m-t*c*f+r*a*f-s*a*m+s*c*h-r*l*h)+p*(+t*c*d-t*o*m-r*a*d+n*a*m+r*o*h-n*c*h)+u*(-s*o*h-t*l*d+t*o*f+s*a*d-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],u=e[15],y=d*p*c-_*f*c+_*l*m-o*p*m-d*l*u+o*f*u,x=g*f*c-h*p*c-g*l*m+a*p*m+h*l*u-a*f*u,b=h*_*c-g*d*c+g*o*m-a*_*m-h*o*u+a*d*u,w=g*d*l-h*_*l-g*o*f+a*_*f+h*o*p-a*d*p,A=t*y+n*x+s*b+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=y*C,e[1]=(_*f*r-d*p*r-_*s*m+n*p*m+d*s*u-n*f*u)*C,e[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*u+n*l*u)*C,e[3]=(d*l*r-o*f*r-d*s*c+n*f*c+o*s*m-n*l*m)*C,e[4]=x*C,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*u+t*f*u)*C,e[6]=(g*l*r-a*p*r-g*s*c+t*p*c+a*s*u-t*l*u)*C,e[7]=(a*f*r-h*l*r+h*s*c-t*f*c-a*s*m+t*l*m)*C,e[8]=b*C,e[9]=(g*d*r-h*_*r-g*n*m+t*_*m+h*n*u-t*d*u)*C,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*u+t*o*u)*C,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*m-t*o*m)*C,e[12]=w*C,e[13]=(h*_*s-g*d*s+g*n*f-t*_*f-h*n*p+t*d*p)*C,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*p-t*o*p)*C,e[15]=(a*d*s-h*o*s+h*n*l-t*d*l-a*n*f+t*o*f)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,f=r*c,m=r*h,g=r*d,_=a*h,p=a*d,u=o*d,y=l*c,x=l*h,b=l*d,w=n.x,A=n.y,C=n.z;return s[0]=(1-(_+u))*w,s[1]=(m+b)*w,s[2]=(g-x)*w,s[3]=0,s[4]=(m-b)*A,s[5]=(1-(f+u))*A,s[6]=(p+y)*A,s[7]=0,s[8]=(g+x)*C,s[9]=(p-y)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Jn.set(s[0],s[1],s[2]).length();const a=Jn.set(s[4],s[5],s[6]).length(),o=Jn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ht.copy(this);const c=1/r,h=1/a,d=1/o;return Ht.elements[0]*=c,Ht.elements[1]*=c,Ht.elements[2]*=c,Ht.elements[4]*=h,Ht.elements[5]*=h,Ht.elements[6]*=h,Ht.elements[8]*=d,Ht.elements[9]*=d,Ht.elements[10]*=d,t.setFromRotationMatrix(Ht),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=hn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(o===hn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ls)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=hn){const l=this.elements,c=1/(t-e),h=1/(n-s),d=1/(a-r),f=(t+e)*c,m=(n+s)*h;let g,_;if(o===hn)g=(a+r)*d,_=-2*d;else if(o===Ls)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Jn=new P,Ht=new it,hh=new P(0,0,0),dh=new P(1,1,1),gn=new P,Ji=new P,Ct=new P,Yo=new it,jo=new Gn;class Hs{constructor(e=0,t=0,n=0,s=Hs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Et(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jo.setFromEuler(this),this.setFromQuaternion(jo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hs.DEFAULT_ORDER="XYZ";class $r{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uh=0;const Ko=new P,Qn=new Gn,rn=new it,Qi=new P,Ri=new P,fh=new P,ph=new Gn,Zo=new P(1,0,0),Jo=new P(0,1,0),Qo=new P(0,0,1),mh={type:"added"},gh={type:"removed"};class pt extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new P,t=new Hs,n=new Gn,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new Ve}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.multiply(Qn),this}rotateOnWorldAxis(e,t){return Qn.setFromAxisAngle(e,t),this.quaternion.premultiply(Qn),this}rotateX(e){return this.rotateOnAxis(Zo,e)}rotateY(e){return this.rotateOnAxis(Jo,e)}rotateZ(e){return this.rotateOnAxis(Qo,e)}translateOnAxis(e,t){return Ko.copy(e).applyQuaternion(this.quaternion),this.position.add(Ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zo,e)}translateY(e){return this.translateOnAxis(Jo,e)}translateZ(e){return this.translateOnAxis(Qo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qi.copy(e):Qi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ri.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Ri,Qi,this.up):rn.lookAt(Qi,Ri,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),Qn.setFromRotationMatrix(rn),this.quaternion.premultiply(Qn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(mh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(rn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,e,fh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,ph,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}pt.DEFAULT_UP=new P(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kt=new P,on=new P,hr=new P,an=new P,ei=new P,ti=new P,ea=new P,dr=new P,ur=new P,fr=new P;let es=!1;class Vt{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),kt.subVectors(e,t),s.cross(kt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){kt.subVectors(s,t),on.subVectors(n,t),hr.subVectors(e,t);const a=kt.dot(kt),o=kt.dot(on),l=kt.dot(hr),c=on.dot(on),h=on.dot(hr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getUV(e,t,n,s,r,a,o,l){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),this.getInterpolation(e,t,n,s,r,a,o,l)}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,an)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,an.x),l.addScaledVector(a,an.y),l.addScaledVector(o,an.z),l)}static isFrontFacing(e,t,n,s){return kt.subVectors(n,t),on.subVectors(e,t),kt.cross(on).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),kt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ei.subVectors(s,n),ti.subVectors(r,n),dr.subVectors(e,n);const l=ei.dot(dr),c=ti.dot(dr);if(l<=0&&c<=0)return t.copy(n);ur.subVectors(e,s);const h=ei.dot(ur),d=ti.dot(ur);if(h>=0&&d<=h)return t.copy(s);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ei,a);fr.subVectors(e,r);const m=ei.dot(fr),g=ti.dot(fr);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ti,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return ea.subVectors(r,s),o=(d-h)/(d-h+(m-g)),t.copy(s).addScaledVector(ea,o);const u=1/(p+_+f);return a=_*u,o=f*u,t.copy(n).addScaledVector(ei,a).addScaledVector(ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},ts={h:0,s:0,l:0};function pr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class We{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=th(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=pr(a,r,e+1/3),this.g=pr(a,r,e),this.b=pr(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=gt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){const n=pl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=nr(e.r),this.g=nr(e.g),this.b=nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return Ke.fromWorkingColorSpace(vt.copy(this),e),Math.round(Et(vt.r*255,0,255))*65536+Math.round(Et(vt.g*255,0,255))*256+Math.round(Et(vt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(vt.copy(this),t);const n=vt.r,s=vt.g,r=vt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(vt.copy(this),t),e.r=vt.r,e.g=vt.g,e.b=vt.b,e}getStyle(e=gt){Ke.fromWorkingColorSpace(vt.copy(this),e);const t=vt.r,n=vt.g,s=vt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_n),this.setHSL(_n.h+e,_n.s+t,_n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(ts);const n=er(_n.h,ts.h,t),s=er(_n.s,ts.s,t),r=er(_n.l,ts.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vt=new We;We.NAMES=pl;let _h=0;class Si extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=pi,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lr,this.blendDst=Pr,this.blendEquation=In,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ho,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qn,this.stencilZFail=qn,this.stencilZPass=qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==Tn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Lr&&(n.blendSrc=this.blendSrc),this.blendDst!==Pr&&(n.blendDst=this.blendDst),this.blendEquation!==In&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ho&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ml extends Si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Vr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const at=new P,ns=new Re;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ko,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.applyMatrix3(e),this.setXY(t,ns.x,ns.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)at.fromBufferAttribute(this,t),at.applyMatrix3(e),this.setXYZ(t,at.x,at.y,at.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)at.fromBufferAttribute(this,t),at.applyMatrix4(e),this.setXYZ(t,at.x,at.y,at.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)at.fromBufferAttribute(this,t),at.applyNormalMatrix(e),this.setXYZ(t,at.x,at.y,at.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)at.fromBufferAttribute(this,t),at.transformDirection(e),this.setXYZ(t,at.x,at.y,at.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ko&&(e.usage=this.usage),e}}class gl extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _l extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let xh=0;const It=new it,mr=new pt,ni=new P,Rt=new Mi,Li=new Mi,dt=new P;class Pt extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hl(e)?_l:gl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return It.makeRotationFromQuaternion(e),this.applyMatrix4(It),this}rotateX(e){return It.makeRotationX(e),this.applyMatrix4(It),this}rotateY(e){return It.makeRotationY(e),this.applyMatrix4(It),this}rotateZ(e){return It.makeRotationZ(e),this.applyMatrix4(It),this}translate(e,t,n){return It.makeTranslation(e,t,n),this.applyMatrix4(It),this}scale(e,t,n){return It.makeScale(e,t,n),this.applyMatrix4(It),this}lookAt(e){return mr.lookAt(e),mr.updateMatrix(),this.applyMatrix4(mr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new At(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Rt.setFromBufferAttribute(r),this.morphTargetsRelative?(dt.addVectors(this.boundingBox.min,Rt.min),this.boundingBox.expandByPoint(dt),dt.addVectors(this.boundingBox.max,Rt.max),this.boundingBox.expandByPoint(dt)):(this.boundingBox.expandByPoint(Rt.min),this.boundingBox.expandByPoint(Rt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(Rt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Li.setFromBufferAttribute(o),this.morphTargetsRelative?(dt.addVectors(Rt.min,Li.min),Rt.expandByPoint(dt),dt.addVectors(Rt.max,Li.max),Rt.expandByPoint(dt)):(Rt.expandByPoint(Li.min),Rt.expandByPoint(Li.max))}Rt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)dt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(dt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)dt.fromBufferAttribute(o,c),l&&(ni.fromBufferAttribute(e,c),dt.add(ni)),s=Math.max(s,n.distanceToSquared(dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let T=0;T<o;T++)c[T]=new P,h[T]=new P;const d=new P,f=new P,m=new P,g=new Re,_=new Re,p=new Re,u=new P,y=new P;function x(T,k,W){d.fromArray(s,T*3),f.fromArray(s,k*3),m.fromArray(s,W*3),g.fromArray(a,T*2),_.fromArray(a,k*2),p.fromArray(a,W*2),f.sub(d),m.sub(d),_.sub(g),p.sub(g);const te=1/(_.x*p.y-p.x*_.y);isFinite(te)&&(u.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(te),y.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(te),c[T].add(u),c[k].add(u),c[W].add(u),h[T].add(y),h[k].add(y),h[W].add(y))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let T=0,k=b.length;T<k;++T){const W=b[T],te=W.start,D=W.count;for(let z=te,V=te+D;z<V;z+=3)x(n[z+0],n[z+1],n[z+2])}const w=new P,A=new P,C=new P,U=new P;function M(T){C.fromArray(r,T*3),U.copy(C);const k=c[T];w.copy(k),w.sub(C.multiplyScalar(C.dot(k))).normalize(),A.crossVectors(U,k);const te=A.dot(h[T])<0?-1:1;l[T*4]=w.x,l[T*4+1]=w.y,l[T*4+2]=w.z,l[T*4+3]=te}for(let T=0,k=b.length;T<k;++T){const W=b[T],te=W.start,D=W.count;for(let z=te,V=te+D;z<V;z+=3)M(n[z+0]),M(n[z+1]),M(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dt.fromBufferAttribute(e,t),dt.normalize(),e.setXYZ(t,dt.x,dt.y,dt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let u=0;u<h;u++)f[g++]=c[m++]}return new en(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ta=new it,Ln=new zs,is=new Bs,na=new P,ii=new P,si=new P,ri=new P,gr=new P,ss=new P,rs=new Re,os=new Re,as=new Re,ia=new P,sa=new P,ra=new P,ls=new P,cs=new P;class Ot extends pt{constructor(e=new Pt,t=new ml){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ss.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(gr.fromBufferAttribute(d,e),a?ss.addScaledVector(gr,h):ss.addScaledVector(gr.sub(t),h))}t.add(ss)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(r),Ln.copy(e.ray).recast(e.near),!(is.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(is,na)===null||Ln.origin.distanceToSquared(na)>(e.far-e.near)**2))&&(ta.copy(r).invert(),Ln.copy(e.ray).applyMatrix4(ta),!(n.boundingBox!==null&&Ln.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ln)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],y=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let b=y,w=x;b<w;b+=3){const A=o.getX(b),C=o.getX(b+1),U=o.getX(b+2);s=hs(this,u,e,n,c,h,d,A,C,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const y=o.getX(p),x=o.getX(p+1),b=o.getX(p+2);s=hs(this,a,e,n,c,h,d,y,x,b),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],u=a[p.materialIndex],y=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let b=y,w=x;b<w;b+=3){const A=b,C=b+1,U=b+2;s=hs(this,u,e,n,c,h,d,A,C,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,u=_;p<u;p+=3){const y=p,x=p+1,b=p+2;s=hs(this,a,e,n,c,h,d,y,x,b),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function vh(i,e,t,n,s,r,a,o){let l;if(e.side===Tt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Tn,o),l===null)return null;cs.copy(o),cs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(cs);return c<t.near||c>t.far?null:{distance:c,point:cs.clone(),object:i}}function hs(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ii),i.getVertexPosition(l,si),i.getVertexPosition(c,ri);const h=vh(i,e,t,n,ii,si,ri,ls);if(h){s&&(rs.fromBufferAttribute(s,o),os.fromBufferAttribute(s,l),as.fromBufferAttribute(s,c),h.uv=Vt.getInterpolation(ls,ii,si,ri,rs,os,as,new Re)),r&&(rs.fromBufferAttribute(r,o),os.fromBufferAttribute(r,l),as.fromBufferAttribute(r,c),h.uv1=Vt.getInterpolation(ls,ii,si,ri,rs,os,as,new Re),h.uv2=h.uv1),a&&(ia.fromBufferAttribute(a,o),sa.fromBufferAttribute(a,l),ra.fromBufferAttribute(a,c),h.normal=Vt.getInterpolation(ls,ii,si,ri,ia,sa,ra,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new P,materialIndex:0};Vt.getNormal(ii,si,ri,d.normal),h.face=d}return h}class Ei extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(h,3)),this.setAttribute("uv",new At(d,2));function g(_,p,u,y,x,b,w,A,C,U,M){const T=b/C,k=w/U,W=b/2,te=w/2,D=A/2,z=C+1,V=U+1;let q=0,X=0;const $=new P;for(let Y=0;Y<V;Y++){const se=Y*k-te;for(let re=0;re<z;re++){const G=re*T-W;$[_]=G*y,$[p]=se*x,$[u]=D,c.push($.x,$.y,$.z),$[_]=0,$[p]=0,$[u]=A>0?1:-1,h.push($.x,$.y,$.z),d.push(re/C),d.push(1-Y/U),q+=1}}for(let Y=0;Y<U;Y++)for(let se=0;se<C;se++){const re=f+se+z*Y,G=f+se+z*(Y+1),j=f+(se+1)+z*(Y+1),ce=f+(se+1)+z*Y;l.push(re,G,ce),l.push(G,j,ce),X+=6}o.addGroup(m,X,M),m+=X,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ei(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=yi(i[t]);for(const s in n)e[s]=n[s]}return e}function yh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xl(i){return i.getRenderTarget()===null?i.outputColorSpace:Ke.workingColorSpace}const Mh={clone:yi,merge:Mt};var Sh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sh,this.fragmentShader=Eh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yi(e.uniforms),this.uniformsGroups=yh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class vl extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=hn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nt extends vl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Or*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const oi=-90,ai=1;class bh extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nt(oi,ai,e,t);s.layers=this.layers,this.add(s);const r=new Nt(oi,ai,e,t);r.layers=this.layers,this.add(r);const a=new Nt(oi,ai,e,t);a.layers=this.layers,this.add(a);const o=new Nt(oi,ai,e,t);o.layers=this.layers,this.add(o);const l=new Nt(oi,ai,e,t);l.layers=this.layers,this.add(l);const c=new Nt(oi,ai,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class yl extends Lt{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:_i,super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Th extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Di("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Bn?gt:Ft),this.texture=new yl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ut}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ei(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tt,blending:Sn});r.uniforms.tEquirect.value=t;const a=new Ot(s,r),o=t.minFilter;return t.minFilter===Fi&&(t.minFilter=Ut),new bh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const _r=new P,Ah=new P,wh=new Ve;class xn{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=_r.subVectors(n,t).cross(Ah.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(_r),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wh.getNormalMatrix(e),s=this.coplanarPoint(_r).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pn=new Bs,ds=new P;class qr{constructor(e=new xn,t=new xn,n=new xn,s=new xn,r=new xn,a=new xn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],u=s[12],y=s[13],x=s[14],b=s[15];if(n[0].setComponents(l-r,f-c,p-m,b-u).normalize(),n[1].setComponents(l+r,f+c,p+m,b+u).normalize(),n[2].setComponents(l+a,f+h,p+g,b+y).normalize(),n[3].setComponents(l-a,f-h,p-g,b-y).normalize(),n[4].setComponents(l-o,f-d,p-_,b-x).normalize(),t===hn)n[5].setComponents(l+o,f+d,p+_,b+x).normalize();else if(t===Ls)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pn)}intersectsSprite(e){return Pn.center.set(0,0,0),Pn.radius=.7071067811865476,Pn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ds.x=s.normal.x>0?e.max.x:e.min.x,ds.y=s.normal.y>0?e.max.y:e.min.y,ds.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ml(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ch(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,h){const d=c.array,f=c.usage,m=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,f),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,d){const f=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,c),m.count===-1&&g.length===0&&i.bufferSubData(d,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const u=g[_];t?i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f,u.start,u.count):i.bufferSubData(d,u.start*f.BYTES_PER_ELEMENT,f.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}class Yr extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,f=t/l,m=[],g=[],_=[],p=[];for(let u=0;u<h;u++){const y=u*f-a;for(let x=0;x<c;x++){const b=x*d-r;g.push(b,-y,0),_.push(0,0,1),p.push(x/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<o;y++){const x=y+c*u,b=y+c*(u+1),w=y+1+c*(u+1),A=y+1+c*u;m.push(x,b,A),m.push(b,w,A)}this.setIndex(m),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.width,e.height,e.widthSegments,e.heightSegments)}}var Rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lh=`#ifdef USE_ALPHAHASH
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
#endif`,Ph=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ih=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Uh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nh=`#ifdef USE_AOMAP
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
#endif`,Fh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,Bh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gh=`#ifdef USE_IRIDESCENCE
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
#endif`,Vh=`#ifdef USE_BUMPMAP
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
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Jh=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,Qh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ed=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,id=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rd="gl_FragColor = linearToOutputTexel( gl_FragColor );",od=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cd=`#ifdef USE_ENVMAP
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
#endif`,hd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ud=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,md=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gd=`#ifdef USE_GRADIENTMAP
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
}`,_d=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Md=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,Sd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,Ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Td=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Cd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rd=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ld=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Id=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ud=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Fd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Od=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zd=`#if defined( USE_POINTS_UV )
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
#endif`,Hd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Xd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,$d=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
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
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,su=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ru=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ou=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,au=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,du=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,uu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,fu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mu=`#ifdef USE_SKINNING
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
#endif`,gu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_u=`#ifdef USE_SKINNING
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
#endif`,xu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mu=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Su=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Eu=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Au=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ru=`uniform sampler2D t2D;
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
}`,Lu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Du=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uu=`#include <common>
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
}`,Nu=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Fu=`#define DISTANCE
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
}`,Ou=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Bu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hu=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ku=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gu=`#include <common>
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
}`,Vu=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Wu=`#define LAMBERT
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
}`,Xu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,$u=`#define MATCAP
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
}`,qu=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Yu=`#define NORMAL
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
}`,ju=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ku=`#define PHONG
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
}`,Zu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ju=`#define STANDARD
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
}`,Qu=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,ef=`#define TOON
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
}`,tf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,nf=`uniform float size;
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
}`,sf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,rf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,of=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,af=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,lf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,ze={alphahash_fragment:Rh,alphahash_pars_fragment:Lh,alphamap_fragment:Ph,alphamap_pars_fragment:Dh,alphatest_fragment:Ih,alphatest_pars_fragment:Uh,aomap_fragment:Nh,aomap_pars_fragment:Fh,batching_pars_vertex:Oh,batching_vertex:Bh,begin_vertex:zh,beginnormal_vertex:Hh,bsdfs:kh,iridescence_fragment:Gh,bumpmap_pars_fragment:Vh,clipping_planes_fragment:Wh,clipping_planes_pars_fragment:Xh,clipping_planes_pars_vertex:$h,clipping_planes_vertex:qh,color_fragment:Yh,color_pars_fragment:jh,color_pars_vertex:Kh,color_vertex:Zh,common:Jh,cube_uv_reflection_fragment:Qh,defaultnormal_vertex:ed,displacementmap_pars_vertex:td,displacementmap_vertex:nd,emissivemap_fragment:id,emissivemap_pars_fragment:sd,colorspace_fragment:rd,colorspace_pars_fragment:od,envmap_fragment:ad,envmap_common_pars_fragment:ld,envmap_pars_fragment:cd,envmap_pars_vertex:hd,envmap_physical_pars_fragment:Sd,envmap_vertex:dd,fog_vertex:ud,fog_pars_vertex:fd,fog_fragment:pd,fog_pars_fragment:md,gradientmap_pars_fragment:gd,lightmap_fragment:_d,lightmap_pars_fragment:xd,lights_lambert_fragment:vd,lights_lambert_pars_fragment:yd,lights_pars_begin:Md,lights_toon_fragment:Ed,lights_toon_pars_fragment:bd,lights_phong_fragment:Td,lights_phong_pars_fragment:Ad,lights_physical_fragment:wd,lights_physical_pars_fragment:Cd,lights_fragment_begin:Rd,lights_fragment_maps:Ld,lights_fragment_end:Pd,logdepthbuf_fragment:Dd,logdepthbuf_pars_fragment:Id,logdepthbuf_pars_vertex:Ud,logdepthbuf_vertex:Nd,map_fragment:Fd,map_pars_fragment:Od,map_particle_fragment:Bd,map_particle_pars_fragment:zd,metalnessmap_fragment:Hd,metalnessmap_pars_fragment:kd,morphcolor_vertex:Gd,morphnormal_vertex:Vd,morphtarget_pars_vertex:Wd,morphtarget_vertex:Xd,normal_fragment_begin:$d,normal_fragment_maps:qd,normal_pars_fragment:Yd,normal_pars_vertex:jd,normal_vertex:Kd,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:Qd,clearcoat_pars_fragment:eu,iridescence_pars_fragment:tu,opaque_fragment:nu,packing:iu,premultiplied_alpha_fragment:su,project_vertex:ru,dithering_fragment:ou,dithering_pars_fragment:au,roughnessmap_fragment:lu,roughnessmap_pars_fragment:cu,shadowmap_pars_fragment:hu,shadowmap_pars_vertex:du,shadowmap_vertex:uu,shadowmask_pars_fragment:fu,skinbase_vertex:pu,skinning_pars_vertex:mu,skinning_vertex:gu,skinnormal_vertex:_u,specularmap_fragment:xu,specularmap_pars_fragment:vu,tonemapping_fragment:yu,tonemapping_pars_fragment:Mu,transmission_fragment:Su,transmission_pars_fragment:Eu,uv_pars_fragment:bu,uv_pars_vertex:Tu,uv_vertex:Au,worldpos_vertex:wu,background_vert:Cu,background_frag:Ru,backgroundCube_vert:Lu,backgroundCube_frag:Pu,cube_vert:Du,cube_frag:Iu,depth_vert:Uu,depth_frag:Nu,distanceRGBA_vert:Fu,distanceRGBA_frag:Ou,equirect_vert:Bu,equirect_frag:zu,linedashed_vert:Hu,linedashed_frag:ku,meshbasic_vert:Gu,meshbasic_frag:Vu,meshlambert_vert:Wu,meshlambert_frag:Xu,meshmatcap_vert:$u,meshmatcap_frag:qu,meshnormal_vert:Yu,meshnormal_frag:ju,meshphong_vert:Ku,meshphong_frag:Zu,meshphysical_vert:Ju,meshphysical_frag:Qu,meshtoon_vert:ef,meshtoon_frag:tf,points_vert:nf,points_frag:sf,shadow_vert:rf,shadow_frag:of,sprite_vert:af,sprite_frag:lf},oe={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Yt={basic:{uniforms:Mt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Mt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new We(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Mt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Mt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Mt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new We(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Mt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Mt([oe.points,oe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Mt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Mt([oe.common,oe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Mt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Mt([oe.sprite,oe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Mt([oe.common,oe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Mt([oe.lights,oe.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};Yt.physical={uniforms:Mt([Yt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const us={r:0,b:0,g:0};function cf(i,e,t,n,s,r,a){const o=new We(0);let l=r===!0?0:1,c,h,d=null,f=0,m=null;function g(p,u){let y=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),y=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Fs)?(h===void 0&&(h=new Ot(new Ei(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:yi(Yt.backgroundCube.uniforms),vertexShader:Yt.backgroundCube.vertexShader,fragmentShader:Yt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(x.colorSpace)!==Qe,(d!==x||f!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,f=x.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ot(new Yr(2,2),new Vn({name:"BackgroundMaterial",uniforms:yi(Yt.background.uniforms),vertexShader:Yt.background.vertexShader,fragmentShader:Yt.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==Qe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,f=x.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,u){p.getRGB(us,xl(i)),n.buffers.color.setClear(us.r,us.g,us.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(p,u=1){o.set(p),l=u,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function hf(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=p(null);let c=l,h=!1;function d(D,z,V,q,X){let $=!1;if(a){const Y=_(q,V,z);c!==Y&&(c=Y,m(c.object)),$=u(D,q,V,X),$&&y(D,q,V,X)}else{const Y=z.wireframe===!0;(c.geometry!==q.id||c.program!==V.id||c.wireframe!==Y)&&(c.geometry=q.id,c.program=V.id,c.wireframe=Y,$=!0)}X!==null&&t.update(X,i.ELEMENT_ARRAY_BUFFER),($||h)&&(h=!1,U(D,z,V,q),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(D){return n.isWebGL2?i.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,z,V){const q=V.wireframe===!0;let X=o[D.id];X===void 0&&(X={},o[D.id]=X);let $=X[z.id];$===void 0&&($={},X[z.id]=$);let Y=$[q];return Y===void 0&&(Y=p(f()),$[q]=Y),Y}function p(D){const z=[],V=[],q=[];for(let X=0;X<s;X++)z[X]=0,V[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:q,object:D,attributes:{},index:null}}function u(D,z,V,q){const X=c.attributes,$=z.attributes;let Y=0;const se=V.getAttributes();for(const re in se)if(se[re].location>=0){const j=X[re];let ce=$[re];if(ce===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(ce=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(ce=D.instanceColor)),j===void 0||j.attribute!==ce||ce&&j.data!==ce.data)return!0;Y++}return c.attributesNum!==Y||c.index!==q}function y(D,z,V,q){const X={},$=z.attributes;let Y=0;const se=V.getAttributes();for(const re in se)if(se[re].location>=0){let j=$[re];j===void 0&&(re==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),re==="instanceColor"&&D.instanceColor&&(j=D.instanceColor));const ce={};ce.attribute=j,j&&j.data&&(ce.data=j.data),X[re]=ce,Y++}c.attributes=X,c.attributesNum=Y,c.index=q}function x(){const D=c.newAttributes;for(let z=0,V=D.length;z<V;z++)D[z]=0}function b(D){w(D,0)}function w(D,z){const V=c.newAttributes,q=c.enabledAttributes,X=c.attributeDivisors;V[D]=1,q[D]===0&&(i.enableVertexAttribArray(D),q[D]=1),X[D]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,z),X[D]=z)}function A(){const D=c.newAttributes,z=c.enabledAttributes;for(let V=0,q=z.length;V<q;V++)z[V]!==D[V]&&(i.disableVertexAttribArray(V),z[V]=0)}function C(D,z,V,q,X,$,Y){Y===!0?i.vertexAttribIPointer(D,z,V,X,$):i.vertexAttribPointer(D,z,V,q,X,$)}function U(D,z,V,q){if(n.isWebGL2===!1&&(D.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const X=q.attributes,$=V.getAttributes(),Y=z.defaultAttributeValues;for(const se in $){const re=$[se];if(re.location>=0){let G=X[se];if(G===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(G=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(G=D.instanceColor)),G!==void 0){const j=G.normalized,ce=G.itemSize,ye=t.get(G);if(ye===void 0)continue;const xe=ye.buffer,Ie=ye.type,Ue=ye.bytesPerElement,Ae=n.isWebGL2===!0&&(Ie===i.INT||Ie===i.UNSIGNED_INT||G.gpuType===el);if(G.isInterleavedBufferAttribute){const Xe=G.data,F=Xe.stride,mt=G.offset;if(Xe.isInstancedInterleavedBuffer){for(let Ee=0;Ee<re.locationSize;Ee++)w(re.location+Ee,Xe.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Ee=0;Ee<re.locationSize;Ee++)b(re.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Ee=0;Ee<re.locationSize;Ee++)C(re.location+Ee,ce/re.locationSize,Ie,j,F*Ue,(mt+ce/re.locationSize*Ee)*Ue,Ae)}else{if(G.isInstancedBufferAttribute){for(let Xe=0;Xe<re.locationSize;Xe++)w(re.location+Xe,G.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Xe=0;Xe<re.locationSize;Xe++)b(re.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Xe=0;Xe<re.locationSize;Xe++)C(re.location+Xe,ce/re.locationSize,Ie,j,ce*Ue,ce/re.locationSize*Xe*Ue,Ae)}}else if(Y!==void 0){const j=Y[se];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(re.location,j);break;case 3:i.vertexAttrib3fv(re.location,j);break;case 4:i.vertexAttrib4fv(re.location,j);break;default:i.vertexAttrib1fv(re.location,j)}}}}A()}function M(){W();for(const D in o){const z=o[D];for(const V in z){const q=z[V];for(const X in q)g(q[X].object),delete q[X];delete z[V]}delete o[D]}}function T(D){if(o[D.id]===void 0)return;const z=o[D.id];for(const V in z){const q=z[V];for(const X in q)g(q[X].object),delete q[X];delete z[V]}delete o[D.id]}function k(D){for(const z in o){const V=o[z];if(V[D.id]===void 0)continue;const q=V[D.id];for(const X in q)g(q[X].object),delete q[X];delete V[D.id]}}function W(){te(),h=!0,c!==l&&(c=l,m(c.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:W,resetDefaultState:te,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:b,disableUnusedAttributes:A}}function df(i,e,t,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,d){i.drawArrays(r,h,d),t.update(d,r,1)}function l(h,d,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,d,f),t.update(d,r,f)}function c(h,d,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(r,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function uf(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,b=a||e.has("OES_texture_float"),w=x&&b,A=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:y,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:w,maxSamples:A}}function ff(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new xn,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const y=r?0:n,x=y*4;let b=u.clippingState||null;l.value=b,b=h(g,f,x,m);for(let w=0;w!==x;++w)b[w]=t[w];u.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const u=m+_*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<u)&&(p=new Float32Array(u));for(let x=0,b=m;x!==_;++x,b+=4)a.copy(d[x]).applyMatrix4(y,o),a.normal.toArray(p,b),p[b+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function pf(i){let e=new WeakMap;function t(a,o){return o===Dr?a.mapping=_i:o===Ir&&(a.mapping=xi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Dr||o===Ir)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Th(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Sl extends vl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const di=4,oa=[.125,.215,.35,.446,.526,.582],Un=20,xr=new Sl,aa=new We;let vr=null,yr=0,Mr=0;const Dn=(1+Math.sqrt(5))/2,li=1/Dn,la=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Dn,li),new P(0,Dn,-li),new P(li,0,Dn),new P(-li,0,Dn),new P(Dn,li,0),new P(-Dn,li,0)];class ca{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){vr=this._renderer.getRenderTarget(),yr=this._renderer.getActiveCubeFace(),Mr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ua(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=da(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vr,yr,Mr),e.scissorTest=!1,fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vr=this._renderer.getRenderTarget(),yr=this._renderer.getActiveCubeFace(),Mr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:Oi,format:Xt,colorSpace:un,depthBuffer:!1},s=ha(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ha(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mf(r)),this._blurMaterial=gf(r,e,t)}return s}_compileMaterial(e){const t=new Ot(this._lodPlanes[0],e);this._renderer.compile(t,xr)}_sceneToCubeUV(e,t,n,s){const o=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(aa),h.toneMapping=En,h.autoClear=!1;const m=new ml({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),g=new Ot(new Ei,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(aa),_=!0);for(let u=0;u<6;u++){const y=u%3;y===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):y===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const x=this._cubeSize;fs(s,y*x,u>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===_i||e.mapping===xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ua()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=da());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ot(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;fs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,xr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=la[(s-1)%la.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ot(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Un-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Un;p>Un&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Un}`);const u=[];let y=0;for(let C=0;C<Un;++C){const U=C/_,M=Math.exp(-U*U/2);u.push(M),C===0?y+=M:C<p&&(y+=2*M)}for(let C=0;C<u.length;C++)u[C]=u[C]/y;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const b=this._sizeLods[s],w=3*b*(s>x-di?s-x+di:0),A=4*(this._cubeSize-b);fs(t,w,A,3*b,2*b),l.setRenderTarget(t),l.render(d,xr)}}function mf(i){const e=[],t=[],n=[];let s=i;const r=i-di+1+oa.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-di?l=oa[a-i+di-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,u=1,y=new Float32Array(_*g*m),x=new Float32Array(p*g*m),b=new Float32Array(u*g*m);for(let A=0;A<m;A++){const C=A%3*2/3-1,U=A>2?0:-1,M=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];y.set(M,_*g*A),x.set(f,p*g*A);const T=[A,A,A,A,A,A];b.set(T,u*g*A)}const w=new Pt;w.setAttribute("position",new en(y,_)),w.setAttribute("uv",new en(x,p)),w.setAttribute("faceIndex",new en(b,u)),e.push(w),s>di&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ha(i,e,t){const n=new kn(i,e,t);return n.texture.mapping=Fs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function gf(i,e,t){const n=new Float32Array(Un),s=new P(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Un,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function da(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jr(),fragmentShader:`

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
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function ua(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function jr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _f(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Dr||l===Ir,h=l===_i||l===xi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new ca(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new ca(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function xf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function vf(i,e,t,n){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,u=_.length;p<u;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const y=m.array;_=m.version;for(let x=0,b=y.length;x<b;x+=3){const w=y[x+0],A=y[x+1],C=y[x+2];f.push(w,A,A,C,C,w)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,b=y.length/3-1;x<b;x+=3){const w=x+0,A=x+1,C=x+2;f.push(w,A,A,C,C,w)}}else return;const p=new(hl(f)?_l:gl)(f,1);p.version=_;const u=r.get(d);u&&e.remove(u),r.set(d,p)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function yf(i,e,t,n){const s=n.isWebGL2;let r;function a(m){r=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,o,m*l),t.update(g,r,1)}function d(m,g,_){if(_===0)return;let p,u;if(s)p=i,u="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](r,g,o,m*l,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(m[u]/l,g[u]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let u=0;for(let y=0;y<_;y++)u+=g[y];t.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function Mf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Sf(i,e){return i[0]-e[0]}function Ef(i,e){return Math.abs(e[1])-Math.abs(i[1])}function bf(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new ft,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let z=function(){te.dispose(),r.delete(h),h.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,b=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],C=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let M=0;x===!0&&(M=1),b===!0&&(M=2),w===!0&&(M=3);let T=h.attributes.position.count*M,k=1;T>e.maxTextureSize&&(k=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const W=new Float32Array(T*k*4*_),te=new fl(W,T,k,_);te.type=yn,te.needsUpdate=!0;const D=M*4;for(let V=0;V<_;V++){const q=A[V],X=C[V],$=U[V],Y=T*k*4*V;for(let se=0;se<q.count;se++){const re=se*D;x===!0&&(a.fromBufferAttribute(q,se),W[Y+re+0]=a.x,W[Y+re+1]=a.y,W[Y+re+2]=a.z,W[Y+re+3]=0),b===!0&&(a.fromBufferAttribute(X,se),W[Y+re+4]=a.x,W[Y+re+5]=a.y,W[Y+re+6]=a.z,W[Y+re+7]=0),w===!0&&(a.fromBufferAttribute($,se),W[Y+re+8]=a.x,W[Y+re+9]=a.y,W[Y+re+10]=a.z,W[Y+re+11]=$.itemSize===4?a.w:1)}}p={count:_,texture:te,size:new Re(T,k)},r.set(h,p),h.addEventListener("dispose",z)}let u=0;for(let x=0;x<f.length;x++)u+=f[x];const y=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",y),d.getUniforms().setValue(i,"morphTargetInfluences",f),d.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let b=0;b<g;b++)_[b]=[b,0];n[h.id]=_}for(let b=0;b<g;b++){const w=_[b];w[0]=b,w[1]=f[b]}_.sort(Ef);for(let b=0;b<8;b++)b<g&&_[b][1]?(o[b][0]=_[b][0],o[b][1]=_[b][1]):(o[b][0]=Number.MAX_SAFE_INTEGER,o[b][1]=0);o.sort(Sf);const p=h.morphAttributes.position,u=h.morphAttributes.normal;let y=0;for(let b=0;b<8;b++){const w=o[b],A=w[0],C=w[1];A!==Number.MAX_SAFE_INTEGER&&C?(p&&h.getAttribute("morphTarget"+b)!==p[A]&&h.setAttribute("morphTarget"+b,p[A]),u&&h.getAttribute("morphNormal"+b)!==u[A]&&h.setAttribute("morphNormal"+b,u[A]),s[b]=C,y+=C):(p&&h.hasAttribute("morphTarget"+b)===!0&&h.deleteAttribute("morphTarget"+b),u&&h.hasAttribute("morphNormal"+b)===!0&&h.deleteAttribute("morphNormal"+b),s[b]=0)}const x=h.morphTargetsRelative?1:1-y;d.getUniforms().setValue(i,"morphTargetBaseInfluence",x),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function Tf(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class El extends Lt{constructor(e,t,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:On,h!==On&&h!==vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===On&&(n=vn),n===void 0&&h===vi&&(n=Fn),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const bl=new Lt,Tl=new El(1,1);Tl.compareFunction=cl;const Al=new fl,wl=new lh,Cl=new yl,fa=[],pa=[],ma=new Float32Array(16),ga=new Float32Array(9),_a=new Float32Array(4);function bi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=fa[s];if(r===void 0&&(r=new Float32Array(s),fa[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function lt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ct(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ks(i,e){let t=pa[e];t===void 0&&(t=new Int32Array(e),pa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Af(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2fv(this.addr,e),ct(t,e)}}function Cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(lt(t,e))return;i.uniform3fv(this.addr,e),ct(t,e)}}function Rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4fv(this.addr,e),ct(t,e)}}function Lf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;_a.set(n),i.uniformMatrix2fv(this.addr,!1,_a),ct(t,n)}}function Pf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;ga.set(n),i.uniformMatrix3fv(this.addr,!1,ga),ct(t,n)}}function Df(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,n))return;ma.set(n),i.uniformMatrix4fv(this.addr,!1,ma),ct(t,n)}}function If(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2iv(this.addr,e),ct(t,e)}}function Nf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3iv(this.addr,e),ct(t,e)}}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4iv(this.addr,e),ct(t,e)}}function Of(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;i.uniform2uiv(this.addr,e),ct(t,e)}}function zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;i.uniform3uiv(this.addr,e),ct(t,e)}}function Hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;i.uniform4uiv(this.addr,e),ct(t,e)}}function kf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Tl:bl;t.setTexture2D(e||r,s)}function Gf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wl,s)}function Vf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cl,s)}function Wf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Al,s)}function Xf(i){switch(i){case 5126:return Af;case 35664:return wf;case 35665:return Cf;case 35666:return Rf;case 35674:return Lf;case 35675:return Pf;case 35676:return Df;case 5124:case 35670:return If;case 35667:case 35671:return Uf;case 35668:case 35672:return Nf;case 35669:case 35673:return Ff;case 5125:return Of;case 36294:return Bf;case 36295:return zf;case 36296:return Hf;case 35678:case 36198:case 36298:case 36306:case 35682:return kf;case 35679:case 36299:case 36307:return Gf;case 35680:case 36300:case 36308:case 36293:return Vf;case 36289:case 36303:case 36311:case 36292:return Wf}}function $f(i,e){i.uniform1fv(this.addr,e)}function qf(i,e){const t=bi(e,this.size,2);i.uniform2fv(this.addr,t)}function Yf(i,e){const t=bi(e,this.size,3);i.uniform3fv(this.addr,t)}function jf(i,e){const t=bi(e,this.size,4);i.uniform4fv(this.addr,t)}function Kf(i,e){const t=bi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Zf(i,e){const t=bi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Jf(i,e){const t=bi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Qf(i,e){i.uniform1iv(this.addr,e)}function ep(i,e){i.uniform2iv(this.addr,e)}function tp(i,e){i.uniform3iv(this.addr,e)}function np(i,e){i.uniform4iv(this.addr,e)}function ip(i,e){i.uniform1uiv(this.addr,e)}function sp(i,e){i.uniform2uiv(this.addr,e)}function rp(i,e){i.uniform3uiv(this.addr,e)}function op(i,e){i.uniform4uiv(this.addr,e)}function ap(i,e,t){const n=this.cache,s=e.length,r=ks(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||bl,r[a])}function lp(i,e,t){const n=this.cache,s=e.length,r=ks(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||wl,r[a])}function cp(i,e,t){const n=this.cache,s=e.length,r=ks(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cl,r[a])}function hp(i,e,t){const n=this.cache,s=e.length,r=ks(t,s);lt(n,r)||(i.uniform1iv(this.addr,r),ct(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Al,r[a])}function dp(i){switch(i){case 5126:return $f;case 35664:return qf;case 35665:return Yf;case 35666:return jf;case 35674:return Kf;case 35675:return Zf;case 35676:return Jf;case 5124:case 35670:return Qf;case 35667:case 35671:return ep;case 35668:case 35672:return tp;case 35669:case 35673:return np;case 5125:return ip;case 36294:return sp;case 36295:return rp;case 36296:return op;case 35678:case 36198:case 36298:case 36306:case 35682:return ap;case 35679:case 36299:case 36307:return lp;case 35680:case 36300:case 36308:case 36293:return cp;case 36289:case 36303:case 36311:case 36292:return hp}}class up{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xf(t.type)}}class fp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dp(t.type)}}class pp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Sr=/(\w+)(\])?(\[|\.)?/g;function xa(i,e){i.seq.push(e),i.map[e.id]=e}function mp(i,e,t){const n=i.name,s=n.length;for(Sr.lastIndex=0;;){const r=Sr.exec(n),a=Sr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){xa(t,c===void 0?new up(o,i,e):new fp(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new pp(o),xa(t,d)),t=d}}}class ys{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);mp(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function va(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const gp=37297;let _p=0;function xp(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function vp(i){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(i);let n;switch(e===t?n="":e===Rs&&t===Cs?n="LinearDisplayP3ToLinearSRGB":e===Cs&&t===Rs&&(n="LinearSRGBToLinearDisplayP3"),i){case un:case Os:return[n,"LinearTransferOETF"];case gt:case Xr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ya(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+xp(i.getShaderSource(e),a)}else return s}function yp(i,e){const t=vp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Mp(i,e){let t;switch(e){case Lc:t="Linear";break;case Pc:t="Reinhard";break;case Dc:t="OptimizedCineon";break;case Ic:t="ACESFilmic";break;case Nc:t="AgX";break;case Uc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Sp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ui).join(`
`)}function Ep(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ui).join(`
`)}function bp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Tp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ui(i){return i!==""}function Ma(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sa(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ap=/^[ \t]*#include +<([\w\d./]+)>/gm;function zr(i){return i.replace(Ap,Cp)}const wp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Cp(i,e){let t=ze[e];if(t===void 0){const n=wp.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return zr(t)}const Rp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ea(i){return i.replace(Rp,Lp)}function Lp(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ba(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Pp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ja?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function Dp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case _i:case xi:e="ENVMAP_TYPE_CUBE";break;case Fs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ip(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xi:e="ENVMAP_MODE_REFRACTION";break}return e}function Up(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vr:e="ENVMAP_BLENDING_MULTIPLY";break;case Cc:e="ENVMAP_BLENDING_MIX";break;case Rc:e="ENVMAP_BLENDING_ADD";break}return e}function Np(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Fp(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Pp(t),c=Dp(t),h=Ip(t),d=Up(t),f=Np(t),m=t.isWebGL2?"":Sp(t),g=Ep(t),_=bp(r),p=s.createProgram();let u,y,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ui).join(`
`),u.length>0&&(u+=`
`),y=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ui).join(`
`),y.length>0&&(y+=`
`)):(u=[ba(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ui).join(`
`),y=[m,ba(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?ze.tonemapping_pars_fragment:"",t.toneMapping!==En?Mp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,yp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ui).join(`
`)),a=zr(a),a=Ma(a,t),a=Sa(a,t),o=zr(o),o=Ma(o,t),o=Sa(o,t),a=Ea(a),o=Ea(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=x+u+a,w=x+y+o,A=va(s,s.VERTEX_SHADER,b),C=va(s,s.FRAGMENT_SHADER,w);s.attachShader(p,A),s.attachShader(p,C),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function U(W){if(i.debug.checkShaderErrors){const te=s.getProgramInfoLog(p).trim(),D=s.getShaderInfoLog(A).trim(),z=s.getShaderInfoLog(C).trim();let V=!0,q=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,A,C);else{const X=ya(s,A,"vertex"),$=ya(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+X+`
`+$)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(D===""||z==="")&&(q=!1);q&&(W.diagnostics={runnable:V,programLog:te,vertexShader:{log:D,prefix:u},fragmentShader:{log:z,prefix:y}})}s.deleteShader(A),s.deleteShader(C),M=new ys(s,p),T=Tp(s,p)}let M;this.getUniforms=function(){return M===void 0&&U(this),M};let T;this.getAttributes=function(){return T===void 0&&U(this),T};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(p,gp)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_p++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=C,this}let Op=0;class Bp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zp(e),t.set(e,n)),n}}class zp{constructor(e){this.id=Op++,this.code=e,this.usedTimes=0}}function Hp(i,e,t,n,s,r,a){const o=new $r,l=new Bp,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function p(M,T,k,W,te){const D=W.fog,z=te.geometry,V=M.isMeshStandardMaterial?W.environment:null,q=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),X=q&&q.mapping===Fs?q.image.height:null,$=g[M.type];M.precision!==null&&(m=s.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const Y=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=Y!==void 0?Y.length:0;let re=0;z.morphAttributes.position!==void 0&&(re=1),z.morphAttributes.normal!==void 0&&(re=2),z.morphAttributes.color!==void 0&&(re=3);let G,j,ce,ye;if($){const st=Yt[$];G=st.vertexShader,j=st.fragmentShader}else G=M.vertexShader,j=M.fragmentShader,l.update(M),ce=l.getVertexShaderID(M),ye=l.getFragmentShaderID(M);const xe=i.getRenderTarget(),Ie=te.isInstancedMesh===!0,Ue=te.isBatchedMesh===!0,Ae=!!M.map,Xe=!!M.matcap,F=!!q,mt=!!M.aoMap,Ee=!!M.lightMap,Le=!!M.bumpMap,me=!!M.normalMap,Je=!!M.displacementMap,Fe=!!M.emissiveMap,E=!!M.metalnessMap,v=!!M.roughnessMap,N=M.anisotropy>0,Q=M.clearcoat>0,Z=M.iridescence>0,ee=M.sheen>0,_e=M.transmission>0,le=N&&!!M.anisotropyMap,pe=Q&&!!M.clearcoatMap,Te=Q&&!!M.clearcoatNormalMap,Oe=Q&&!!M.clearcoatRoughnessMap,K=Z&&!!M.iridescenceMap,je=Z&&!!M.iridescenceThicknessMap,He=ee&&!!M.sheenColorMap,Pe=ee&&!!M.sheenRoughnessMap,Se=!!M.specularMap,de=!!M.specularColorMap,R=!!M.specularIntensityMap,ne=_e&&!!M.transmissionMap,ve=_e&&!!M.thicknessMap,fe=!!M.gradientMap,J=!!M.alphaMap,L=M.alphaTest>0,ie=!!M.alphaHash,ae=!!M.extensions,we=!!z.attributes.uv1,be=!!z.attributes.uv2,$e=!!z.attributes.uv3;let qe=En;return M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(qe=i.toneMapping),{isWebGL2:h,shaderID:$,shaderType:M.type,shaderName:M.name,vertexShader:G,fragmentShader:j,defines:M.defines,customVertexShaderID:ce,customFragmentShaderID:ye,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:Ue,instancing:Ie,instancingColor:Ie&&te.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:un,map:Ae,matcap:Xe,envMap:F,envMapMode:F&&q.mapping,envMapCubeUVHeight:X,aoMap:mt,lightMap:Ee,bumpMap:Le,normalMap:me,displacementMap:f&&Je,emissiveMap:Fe,normalMapObjectSpace:me&&M.normalMapType===qc,normalMapTangentSpace:me&&M.normalMapType===ll,metalnessMap:E,roughnessMap:v,anisotropy:N,anisotropyMap:le,clearcoat:Q,clearcoatMap:pe,clearcoatNormalMap:Te,clearcoatRoughnessMap:Oe,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:je,sheen:ee,sheenColorMap:He,sheenRoughnessMap:Pe,specularMap:Se,specularColorMap:de,specularIntensityMap:R,transmission:_e,transmissionMap:ne,thicknessMap:ve,gradientMap:fe,opaque:M.transparent===!1&&M.blending===pi,alphaMap:J,alphaTest:L,alphaHash:ie,combine:M.combine,mapUv:Ae&&_(M.map.channel),aoMapUv:mt&&_(M.aoMap.channel),lightMapUv:Ee&&_(M.lightMap.channel),bumpMapUv:Le&&_(M.bumpMap.channel),normalMapUv:me&&_(M.normalMap.channel),displacementMapUv:Je&&_(M.displacementMap.channel),emissiveMapUv:Fe&&_(M.emissiveMap.channel),metalnessMapUv:E&&_(M.metalnessMap.channel),roughnessMapUv:v&&_(M.roughnessMap.channel),anisotropyMapUv:le&&_(M.anisotropyMap.channel),clearcoatMapUv:pe&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Te&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:je&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:He&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(M.sheenRoughnessMap.channel),specularMapUv:Se&&_(M.specularMap.channel),specularColorMapUv:de&&_(M.specularColorMap.channel),specularIntensityMapUv:R&&_(M.specularIntensityMap.channel),transmissionMapUv:ne&&_(M.transmissionMap.channel),thicknessMapUv:ve&&_(M.thicknessMap.channel),alphaMapUv:J&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(me||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:be,vertexUv3s:$e,pointsUvs:te.isPoints===!0&&!!z.attributes.uv&&(Ae||J),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:te.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:re,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ae&&M.map.isVideoTexture===!0&&Ke.getTransfer(M.map.colorSpace)===Qe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===cn,flipSided:M.side===Tt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ae&&M.extensions.derivatives===!0,extensionFragDepth:ae&&M.extensions.fragDepth===!0,extensionDrawBuffers:ae&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function u(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const k in M.defines)T.push(k),T.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(y(T,M),x(T,M),T.push(i.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function y(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function x(M,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),M.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function b(M){const T=g[M.type];let k;if(T){const W=Yt[T];k=Mh.clone(W.uniforms)}else k=M.uniforms;return k}function w(M,T){let k;for(let W=0,te=c.length;W<te;W++){const D=c[W];if(D.cacheKey===T){k=D,++k.usedTimes;break}}return k===void 0&&(k=new Fp(i,T,M,r),c.push(k)),k}function A(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),M.destroy()}}function C(M){l.remove(M)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:b,acquireProgram:w,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:U}}function kp(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Gp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ta(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Aa(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,f,m,g,_,p){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=p),e++,u}function o(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):t.push(u)}function l(d,f,m,g,_,p){const u=a(d,f,m,g,_,p);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||Gp),n.length>1&&n.sort(f||Ta),s.length>1&&s.sort(f||Ta)}function h(){for(let d=e,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Vp(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Aa,i.set(n,[a])):s>=r.length?(a=new Aa,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new We};break;case"SpotLight":t={position:new P,direction:new P,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Xp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let $p=0;function qp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yp(i,e){const t=new Wp,n=Xp(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new P);const r=new P,a=new it,o=new it;function l(h,d){let f=0,m=0,g=0;for(let W=0;W<9;W++)s.probe[W].set(0,0,0);let _=0,p=0,u=0,y=0,x=0,b=0,w=0,A=0,C=0,U=0,M=0;h.sort(qp);const T=d===!0?Math.PI:1;for(let W=0,te=h.length;W<te;W++){const D=h[W],z=D.color,V=D.intensity,q=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=z.r*V*T,m+=z.g*V*T,g+=z.b*V*T;else if(D.isLightProbe){for(let $=0;$<9;$++)s.probe[$].addScaledVector(D.sh.coefficients[$],V);M++}else if(D.isDirectionalLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){const Y=D.shadow,se=n.get(D);se.shadowBias=Y.bias,se.shadowNormalBias=Y.normalBias,se.shadowRadius=Y.radius,se.shadowMapSize=Y.mapSize,s.directionalShadow[_]=se,s.directionalShadowMap[_]=X,s.directionalShadowMatrix[_]=D.shadow.matrix,b++}s.directional[_]=$,_++}else if(D.isSpotLight){const $=t.get(D);$.position.setFromMatrixPosition(D.matrixWorld),$.color.copy(z).multiplyScalar(V*T),$.distance=q,$.coneCos=Math.cos(D.angle),$.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),$.decay=D.decay,s.spot[u]=$;const Y=D.shadow;if(D.map&&(s.spotLightMap[C]=D.map,C++,Y.updateMatrices(D),D.castShadow&&U++),s.spotLightMatrix[u]=Y.matrix,D.castShadow){const se=n.get(D);se.shadowBias=Y.bias,se.shadowNormalBias=Y.normalBias,se.shadowRadius=Y.radius,se.shadowMapSize=Y.mapSize,s.spotShadow[u]=se,s.spotShadowMap[u]=X,A++}u++}else if(D.isRectAreaLight){const $=t.get(D);$.color.copy(z).multiplyScalar(V),$.halfWidth.set(D.width*.5,0,0),$.halfHeight.set(0,D.height*.5,0),s.rectArea[y]=$,y++}else if(D.isPointLight){const $=t.get(D);if($.color.copy(D.color).multiplyScalar(D.intensity*T),$.distance=D.distance,$.decay=D.decay,D.castShadow){const Y=D.shadow,se=n.get(D);se.shadowBias=Y.bias,se.shadowNormalBias=Y.normalBias,se.shadowRadius=Y.radius,se.shadowMapSize=Y.mapSize,se.shadowCameraNear=Y.camera.near,se.shadowCameraFar=Y.camera.far,s.pointShadow[p]=se,s.pointShadowMap[p]=X,s.pointShadowMatrix[p]=D.shadow.matrix,w++}s.point[p]=$,p++}else if(D.isHemisphereLight){const $=t.get(D);$.skyColor.copy(D.color).multiplyScalar(V*T),$.groundColor.copy(D.groundColor).multiplyScalar(V*T),s.hemi[x]=$,x++}}y>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_FLOAT_1,s.rectAreaLTC2=oe.LTC_FLOAT_2):(s.rectAreaLTC1=oe.LTC_HALF_1,s.rectAreaLTC2=oe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_FLOAT_1,s.rectAreaLTC2=oe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_HALF_1,s.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const k=s.hash;(k.directionalLength!==_||k.pointLength!==p||k.spotLength!==u||k.rectAreaLength!==y||k.hemiLength!==x||k.numDirectionalShadows!==b||k.numPointShadows!==w||k.numSpotShadows!==A||k.numSpotMaps!==C||k.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=y,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=w,s.pointShadowMap.length=w,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=w,s.spotLightMatrix.length=A+C-U,s.spotLightMap.length=C,s.numSpotLightShadowsWithMaps=U,s.numLightProbes=M,k.directionalLength=_,k.pointLength=p,k.spotLength=u,k.rectAreaLength=y,k.hemiLength=x,k.numDirectionalShadows=b,k.numPointShadows=w,k.numSpotShadows=A,k.numSpotMaps=C,k.numLightProbes=M,s.version=$p++)}function c(h,d){let f=0,m=0,g=0,_=0,p=0;const u=d.matrixWorldInverse;for(let y=0,x=h.length;y<x;y++){const b=h[y];if(b.isDirectionalLight){const w=s.directional[f];w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),f++}else if(b.isSpotLight){const w=s.spot[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(u),w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),g++}else if(b.isRectAreaLight){const w=s.rectArea[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(u),o.identity(),a.copy(b.matrixWorld),a.premultiply(u),o.extractRotation(a),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const w=s.point[m];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(u),m++}else if(b.isHemisphereLight){const w=s.hemi[p];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(u),p++}}}return{setup:l,setupView:c,state:s}}function wa(i,e){const t=new Yp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(d){n.push(d)}function o(d){s.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function jp(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new wa(i,e),t.set(r,[l])):a>=o.length?(l=new wa(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Kp extends Si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Zp extends Si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function em(i,e,t){let n=new qr;const s=new Re,r=new Re,a=new ft,o=new Kp({depthPacking:$c}),l=new Zp,c={},h=t.maxTextureSize,d={[Tn]:Tt,[Tt]:Tn,[cn]:cn},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:Jp,fragmentShader:Qp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ot(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ja;let u=this.type;this.render=function(A,C,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const M=i.getRenderTarget(),T=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),W=i.state;W.setBlending(Sn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const te=u!==ln&&this.type===ln,D=u===ln&&this.type!==ln;for(let z=0,V=A.length;z<V;z++){const q=A[z],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const $=X.getFrameExtents();if(s.multiply($),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,X.mapSize.y=r.y)),X.map===null||te===!0||D===!0){const se=this.type!==ln?{minFilter:St,magFilter:St}:{};X.map!==null&&X.map.dispose(),X.map=new kn(s.x,s.y,se),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const Y=X.getViewportCount();for(let se=0;se<Y;se++){const re=X.getViewport(se);a.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),W.viewport(a),X.updateMatrices(q,se),n=X.getFrustum(),b(C,U,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===ln&&y(X,U),X.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(M,T,k)};function y(A,C){const U=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new kn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,U,f,_,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,U,m,_,null)}function x(A,C,U,M){let T=null;const k=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(k!==void 0)T=k;else if(T=U.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const W=T.uuid,te=C.uuid;let D=c[W];D===void 0&&(D={},c[W]=D);let z=D[te];z===void 0&&(z=T.clone(),D[te]=z,C.addEventListener("dispose",w)),T=z}if(T.visible=C.visible,T.wireframe=C.wireframe,M===ln?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:d[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=i.properties.get(T);W.light=U}return T}function b(A,C,U,M,T){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===ln)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const te=e.update(A),D=A.material;if(Array.isArray(D)){const z=te.groups;for(let V=0,q=z.length;V<q;V++){const X=z[V],$=D[X.materialIndex];if($&&$.visible){const Y=x(A,$,M,T);A.onBeforeShadow(i,A,C,U,te,Y,X),i.renderBufferDirect(U,null,te,Y,A,X),A.onAfterShadow(i,A,C,U,te,Y,X)}}}else if(D.visible){const z=x(A,D,M,T);A.onBeforeShadow(i,A,C,U,te,z,null),i.renderBufferDirect(U,null,te,z,A,null),A.onAfterShadow(i,A,C,U,te,z,null)}}const W=A.children;for(let te=0,D=W.length;te<D;te++)b(W[te],C,U,M,T)}function w(A){A.target.removeEventListener("dispose",w);for(const U in c){const M=c[U],T=A.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function tm(i,e,t){const n=t.isWebGL2;function s(){let L=!1;const ie=new ft;let ae=null;const we=new ft(0,0,0,0);return{setMask:function(be){ae!==be&&!L&&(i.colorMask(be,be,be,be),ae=be)},setLocked:function(be){L=be},setClear:function(be,$e,qe,tt,st){st===!0&&(be*=tt,$e*=tt,qe*=tt),ie.set(be,$e,qe,tt),we.equals(ie)===!1&&(i.clearColor(be,$e,qe,tt),we.copy(ie))},reset:function(){L=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let L=!1,ie=null,ae=null,we=null;return{setTest:function(be){be?Ue(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(be){ie!==be&&!L&&(i.depthMask(be),ie=be)},setFunc:function(be){if(ae!==be){switch(be){case Mc:i.depthFunc(i.NEVER);break;case Sc:i.depthFunc(i.ALWAYS);break;case Ec:i.depthFunc(i.LESS);break;case As:i.depthFunc(i.LEQUAL);break;case bc:i.depthFunc(i.EQUAL);break;case Tc:i.depthFunc(i.GEQUAL);break;case Ac:i.depthFunc(i.GREATER);break;case wc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=be}},setLocked:function(be){L=be},setClear:function(be){we!==be&&(i.clearDepth(be),we=be)},reset:function(){L=!1,ie=null,ae=null,we=null}}}function a(){let L=!1,ie=null,ae=null,we=null,be=null,$e=null,qe=null,tt=null,st=null;return{setTest:function(Ye){L||(Ye?Ue(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Ye){ie!==Ye&&!L&&(i.stencilMask(Ye),ie=Ye)},setFunc:function(Ye,ot,$t){(ae!==Ye||we!==ot||be!==$t)&&(i.stencilFunc(Ye,ot,$t),ae=Ye,we=ot,be=$t)},setOp:function(Ye,ot,$t){($e!==Ye||qe!==ot||tt!==$t)&&(i.stencilOp(Ye,ot,$t),$e=Ye,qe=ot,tt=$t)},setLocked:function(Ye){L=Ye},setClear:function(Ye){st!==Ye&&(i.clearStencil(Ye),st=Ye)},reset:function(){L=!1,ie=null,ae=null,we=null,be=null,$e=null,qe=null,tt=null,st=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,u=!1,y=null,x=null,b=null,w=null,A=null,C=null,U=null,M=new We(0,0,0),T=0,k=!1,W=null,te=null,D=null,z=null,V=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,$=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=$>=1):Y.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=$>=2);let se=null,re={};const G=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),ce=new ft().fromArray(G),ye=new ft().fromArray(j);function xe(L,ie,ae,we){const be=new Uint8Array(4),$e=i.createTexture();i.bindTexture(L,$e),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<ae;qe++)n&&(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)?i.texImage3D(ie,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(ie+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return $e}const Ie={};Ie[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(i.DEPTH_TEST),l.setFunc(As),Fe(!1),E(ao),Ue(i.CULL_FACE),me(Sn);function Ue(L){f[L]!==!0&&(i.enable(L),f[L]=!0)}function Ae(L){f[L]!==!1&&(i.disable(L),f[L]=!1)}function Xe(L,ie){return m[L]!==ie?(i.bindFramebuffer(L,ie),m[L]=ie,n&&(L===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=ie)),!0):!1}function F(L,ie){let ae=_,we=!1;if(L)if(ae=g.get(ie),ae===void 0&&(ae=[],g.set(ie,ae)),L.isWebGLMultipleRenderTargets){const be=L.texture;if(ae.length!==be.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let $e=0,qe=be.length;$e<qe;$e++)ae[$e]=i.COLOR_ATTACHMENT0+$e;ae.length=be.length,we=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,we=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function mt(L){return p!==L?(i.useProgram(L),p=L,!0):!1}const Ee={[In]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[ac]:i.FUNC_REVERSE_SUBTRACT};if(n)Ee[uo]=i.MIN,Ee[fo]=i.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Ee[uo]=L.MIN_EXT,Ee[fo]=L.MAX_EXT)}const Le={[lc]:i.ZERO,[cc]:i.ONE,[hc]:i.SRC_COLOR,[Lr]:i.SRC_ALPHA,[gc]:i.SRC_ALPHA_SATURATE,[pc]:i.DST_COLOR,[uc]:i.DST_ALPHA,[dc]:i.ONE_MINUS_SRC_COLOR,[Pr]:i.ONE_MINUS_SRC_ALPHA,[mc]:i.ONE_MINUS_DST_COLOR,[fc]:i.ONE_MINUS_DST_ALPHA,[_c]:i.CONSTANT_COLOR,[xc]:i.ONE_MINUS_CONSTANT_COLOR,[vc]:i.CONSTANT_ALPHA,[yc]:i.ONE_MINUS_CONSTANT_ALPHA};function me(L,ie,ae,we,be,$e,qe,tt,st,Ye){if(L===Sn){u===!0&&(Ae(i.BLEND),u=!1);return}if(u===!1&&(Ue(i.BLEND),u=!0),L!==rc){if(L!==y||Ye!==k){if((x!==In||A!==In)&&(i.blendEquation(i.FUNC_ADD),x=In,A=In),Ye)switch(L){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lo:i.blendFunc(i.ONE,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case lo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ho:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}b=null,w=null,C=null,U=null,M.set(0,0,0),T=0,y=L,k=Ye}return}be=be||ie,$e=$e||ae,qe=qe||we,(ie!==x||be!==A)&&(i.blendEquationSeparate(Ee[ie],Ee[be]),x=ie,A=be),(ae!==b||we!==w||$e!==C||qe!==U)&&(i.blendFuncSeparate(Le[ae],Le[we],Le[$e],Le[qe]),b=ae,w=we,C=$e,U=qe),(tt.equals(M)===!1||st!==T)&&(i.blendColor(tt.r,tt.g,tt.b,st),M.copy(tt),T=st),y=L,k=!1}function Je(L,ie){L.side===cn?Ae(i.CULL_FACE):Ue(i.CULL_FACE);let ae=L.side===Tt;ie&&(ae=!ae),Fe(ae),L.blending===pi&&L.transparent===!1?me(Sn):me(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const we=L.stencilWrite;c.setTest(we),we&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),N(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(L){W!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),W=L)}function E(L){L!==nc?(Ue(i.CULL_FACE),L!==te&&(L===ao?i.cullFace(i.BACK):L===ic?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),te=L}function v(L){L!==D&&(X&&i.lineWidth(L),D=L)}function N(L,ie,ae){L?(Ue(i.POLYGON_OFFSET_FILL),(z!==ie||V!==ae)&&(i.polygonOffset(ie,ae),z=ie,V=ae)):Ae(i.POLYGON_OFFSET_FILL)}function Q(L){L?Ue(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function Z(L){L===void 0&&(L=i.TEXTURE0+q-1),se!==L&&(i.activeTexture(L),se=L)}function ee(L,ie,ae){ae===void 0&&(se===null?ae=i.TEXTURE0+q-1:ae=se);let we=re[ae];we===void 0&&(we={type:void 0,texture:void 0},re[ae]=we),(we.type!==L||we.texture!==ie)&&(se!==ae&&(i.activeTexture(ae),se=ae),i.bindTexture(L,ie||Ie[L]),we.type=L,we.texture=ie)}function _e(){const L=re[se];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function pe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function je(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pe(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function R(L){ce.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function ne(L){ye.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),ye.copy(L))}function ve(L,ie){let ae=d.get(ie);ae===void 0&&(ae=new WeakMap,d.set(ie,ae));let we=ae.get(L);we===void 0&&(we=i.getUniformBlockIndex(ie,L.name),ae.set(L,we))}function fe(L,ie){const we=d.get(ie).get(L);h.get(ie)!==we&&(i.uniformBlockBinding(ie,we,L.__bindingPointIndex),h.set(ie,we))}function J(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},se=null,re={},m={},g=new WeakMap,_=[],p=null,u=!1,y=null,x=null,b=null,w=null,A=null,C=null,U=null,M=new We(0,0,0),T=0,k=!1,W=null,te=null,D=null,z=null,V=null,ce.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:Ae,bindFramebuffer:Xe,drawBuffers:F,useProgram:mt,setBlending:me,setMaterial:Je,setFlipSided:Fe,setCullFace:E,setLineWidth:v,setPolygonOffset:N,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:_e,compressedTexImage2D:le,compressedTexImage3D:pe,texImage2D:Se,texImage3D:de,updateUBOMapping:ve,uniformBlockBinding:fe,texStorage2D:He,texStorage3D:Pe,texSubImage2D:Te,texSubImage3D:Oe,compressedTexSubImage2D:K,compressedTexSubImage3D:je,scissor:R,viewport:ne,reset:J}}function nm(i,e,t,n,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):Ps("canvas")}function _(E,v,N,Q){let Z=1;if((E.width>Q||E.height>Q)&&(Z=Q/Math.max(E.width,E.height)),Z<1||v===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const ee=v?Br:Math.floor,_e=ee(Z*E.width),le=ee(Z*E.height);d===void 0&&(d=g(_e,le));const pe=N?g(_e,le):d;return pe.width=_e,pe.height=le,pe.getContext("2d").drawImage(E,0,0,_e,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+_e+"x"+le+")."),pe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return Vo(E.width)&&Vo(E.height)}function u(E){return o?!1:E.wrapS!==Wt||E.wrapT!==Wt||E.minFilter!==St&&E.minFilter!==Ut}function y(E,v){return E.generateMipmaps&&v&&E.minFilter!==St&&E.minFilter!==Ut}function x(E){i.generateMipmap(E)}function b(E,v,N,Q,Z=!1){if(o===!1)return v;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ee=v;if(v===i.RED&&(N===i.FLOAT&&(ee=i.R32F),N===i.HALF_FLOAT&&(ee=i.R16F),N===i.UNSIGNED_BYTE&&(ee=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(ee=i.R8UI),N===i.UNSIGNED_SHORT&&(ee=i.R16UI),N===i.UNSIGNED_INT&&(ee=i.R32UI),N===i.BYTE&&(ee=i.R8I),N===i.SHORT&&(ee=i.R16I),N===i.INT&&(ee=i.R32I)),v===i.RG&&(N===i.FLOAT&&(ee=i.RG32F),N===i.HALF_FLOAT&&(ee=i.RG16F),N===i.UNSIGNED_BYTE&&(ee=i.RG8)),v===i.RGBA){const _e=Z?ws:Ke.getTransfer(Q);N===i.FLOAT&&(ee=i.RGBA32F),N===i.HALF_FLOAT&&(ee=i.RGBA16F),N===i.UNSIGNED_BYTE&&(ee=_e===Qe?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(E,v,N){return y(E,N)===!0||E.isFramebufferTexture&&E.minFilter!==St&&E.minFilter!==Ut?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function A(E){return E===St||E===po||E===Ys?i.NEAREST:i.LINEAR}function C(E){const v=E.target;v.removeEventListener("dispose",C),M(v),v.isVideoTexture&&h.delete(v)}function U(E){const v=E.target;v.removeEventListener("dispose",U),k(v)}function M(E){const v=n.get(E);if(v.__webglInit===void 0)return;const N=E.source,Q=f.get(N);if(Q){const Z=Q[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&T(E),Object.keys(Q).length===0&&f.delete(N)}n.remove(E)}function T(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const N=E.source,Q=f.get(N);delete Q[v.__cacheKey],a.memory.textures--}function k(E){const v=E.texture,N=n.get(E),Q=n.get(v);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(N.__webglFramebuffer[Z]))for(let ee=0;ee<N.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(N.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(N.__webglFramebuffer[Z]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[Z])}else{if(Array.isArray(N.__webglFramebuffer))for(let Z=0;Z<N.__webglFramebuffer.length;Z++)i.deleteFramebuffer(N.__webglFramebuffer[Z]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Z=0;Z<N.__webglColorRenderbuffer.length;Z++)N.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[Z]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Z=0,ee=v.length;Z<ee;Z++){const _e=n.get(v[Z]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(v[Z])}n.remove(v),n.remove(E)}let W=0;function te(){W=0}function D(){const E=W;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),W+=1,E}function z(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function V(E,v){const N=n.get(E);if(E.isVideoTexture&&Je(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const Q=E.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(N,E,v);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function q(E,v){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ce(N,E,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function X(E,v){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ce(N,E,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function $(E,v){const N=n.get(E);if(E.version>0&&N.__version!==E.version){ye(N,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const Y={[Ur]:i.REPEAT,[Wt]:i.CLAMP_TO_EDGE,[Nr]:i.MIRRORED_REPEAT},se={[St]:i.NEAREST,[po]:i.NEAREST_MIPMAP_NEAREST,[Ys]:i.NEAREST_MIPMAP_LINEAR,[Ut]:i.LINEAR,[Fc]:i.LINEAR_MIPMAP_NEAREST,[Fi]:i.LINEAR_MIPMAP_LINEAR},re={[Yc]:i.NEVER,[eh]:i.ALWAYS,[jc]:i.LESS,[cl]:i.LEQUAL,[Kc]:i.EQUAL,[Qc]:i.GEQUAL,[Zc]:i.GREATER,[Jc]:i.NOTEQUAL};function G(E,v,N){if(N?(i.texParameteri(E,i.TEXTURE_WRAP_S,Y[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Y[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,Y[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,se[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,se[v.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Wt||v.wrapT!==Wt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,A(v.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,A(v.minFilter)),v.minFilter!==St&&v.minFilter!==Ut&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===St||v.minFilter!==Ys&&v.minFilter!==Fi||v.type===yn&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===Oi&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(E,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function j(E,v){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));const Q=v.source;let Z=f.get(Q);Z===void 0&&(Z={},f.set(Q,Z));const ee=z(v);if(ee!==E.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[ee].usedTimes++;const _e=Z[E.__cacheKey];_e!==void 0&&(Z[E.__cacheKey].usedTimes--,_e.usedTimes===0&&T(v)),E.__cacheKey=ee,E.__webglTexture=Z[ee].texture}return N}function ce(E,v,N){let Q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Q=i.TEXTURE_3D);const Z=j(E,v),ee=v.source;t.bindTexture(Q,E.__webglTexture,i.TEXTURE0+N);const _e=n.get(ee);if(ee.version!==_e.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const le=Ke.getPrimaries(Ke.workingColorSpace),pe=v.colorSpace===Ft?null:Ke.getPrimaries(v.colorSpace),Te=v.colorSpace===Ft||le===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Oe=u(v)&&p(v.image)===!1;let K=_(v.image,Oe,!1,s.maxTextureSize);K=Fe(v,K);const je=p(K)||o,He=r.convert(v.format,v.colorSpace);let Pe=r.convert(v.type),Se=b(v.internalFormat,He,Pe,v.colorSpace,v.isVideoTexture);G(Q,v,je);let de;const R=v.mipmaps,ne=o&&v.isVideoTexture!==!0&&Se!==ol,ve=_e.__version===void 0||Z===!0,fe=w(v,K,je);if(v.isDepthTexture)Se=i.DEPTH_COMPONENT,o?v.type===yn?Se=i.DEPTH_COMPONENT32F:v.type===vn?Se=i.DEPTH_COMPONENT24:v.type===Fn?Se=i.DEPTH24_STENCIL8:Se=i.DEPTH_COMPONENT16:v.type===yn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===On&&Se===i.DEPTH_COMPONENT&&v.type!==Wr&&v.type!==vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=vn,Pe=r.convert(v.type)),v.format===vi&&Se===i.DEPTH_COMPONENT&&(Se=i.DEPTH_STENCIL,v.type!==Fn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Fn,Pe=r.convert(v.type))),ve&&(ne?t.texStorage2D(i.TEXTURE_2D,1,Se,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,Se,K.width,K.height,0,He,Pe,null));else if(v.isDataTexture)if(R.length>0&&je){ne&&ve&&t.texStorage2D(i.TEXTURE_2D,fe,Se,R[0].width,R[0].height);for(let J=0,L=R.length;J<L;J++)de=R[J],ne?t.texSubImage2D(i.TEXTURE_2D,J,0,0,de.width,de.height,He,Pe,de.data):t.texImage2D(i.TEXTURE_2D,J,Se,de.width,de.height,0,He,Pe,de.data);v.generateMipmaps=!1}else ne?(ve&&t.texStorage2D(i.TEXTURE_2D,fe,Se,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,K.width,K.height,He,Pe,K.data)):t.texImage2D(i.TEXTURE_2D,0,Se,K.width,K.height,0,He,Pe,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ne&&ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,Se,R[0].width,R[0].height,K.depth);for(let J=0,L=R.length;J<L;J++)de=R[J],v.format!==Xt?He!==null?ne?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,de.width,de.height,K.depth,He,de.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Se,de.width,de.height,K.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,de.width,de.height,K.depth,He,Pe,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Se,de.width,de.height,K.depth,0,He,Pe,de.data)}else{ne&&ve&&t.texStorage2D(i.TEXTURE_2D,fe,Se,R[0].width,R[0].height);for(let J=0,L=R.length;J<L;J++)de=R[J],v.format!==Xt?He!==null?ne?t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,de.width,de.height,He,de.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Se,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?t.texSubImage2D(i.TEXTURE_2D,J,0,0,de.width,de.height,He,Pe,de.data):t.texImage2D(i.TEXTURE_2D,J,Se,de.width,de.height,0,He,Pe,de.data)}else if(v.isDataArrayTexture)ne?(ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,Se,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,He,Pe,K.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,K.width,K.height,K.depth,0,He,Pe,K.data);else if(v.isData3DTexture)ne?(ve&&t.texStorage3D(i.TEXTURE_3D,fe,Se,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,He,Pe,K.data)):t.texImage3D(i.TEXTURE_3D,0,Se,K.width,K.height,K.depth,0,He,Pe,K.data);else if(v.isFramebufferTexture){if(ve)if(ne)t.texStorage2D(i.TEXTURE_2D,fe,Se,K.width,K.height);else{let J=K.width,L=K.height;for(let ie=0;ie<fe;ie++)t.texImage2D(i.TEXTURE_2D,ie,Se,J,L,0,He,Pe,null),J>>=1,L>>=1}}else if(R.length>0&&je){ne&&ve&&t.texStorage2D(i.TEXTURE_2D,fe,Se,R[0].width,R[0].height);for(let J=0,L=R.length;J<L;J++)de=R[J],ne?t.texSubImage2D(i.TEXTURE_2D,J,0,0,He,Pe,de):t.texImage2D(i.TEXTURE_2D,J,Se,He,Pe,de);v.generateMipmaps=!1}else ne?(ve&&t.texStorage2D(i.TEXTURE_2D,fe,Se,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,Pe,K)):t.texImage2D(i.TEXTURE_2D,0,Se,He,Pe,K);y(v,je)&&x(Q),_e.__version=ee.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function ye(E,v,N){if(v.image.length!==6)return;const Q=j(E,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);const ee=n.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(i.TEXTURE0+N);const _e=Ke.getPrimaries(Ke.workingColorSpace),le=v.colorSpace===Ft?null:Ke.getPrimaries(v.colorSpace),pe=v.colorSpace===Ft||_e===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Te=v.isCompressedTexture||v.image[0].isCompressedTexture,Oe=v.image[0]&&v.image[0].isDataTexture,K=[];for(let J=0;J<6;J++)!Te&&!Oe?K[J]=_(v.image[J],!1,!0,s.maxCubemapSize):K[J]=Oe?v.image[J].image:v.image[J],K[J]=Fe(v,K[J]);const je=K[0],He=p(je)||o,Pe=r.convert(v.format,v.colorSpace),Se=r.convert(v.type),de=b(v.internalFormat,Pe,Se,v.colorSpace),R=o&&v.isVideoTexture!==!0,ne=ee.__version===void 0||Q===!0;let ve=w(v,je,He);G(i.TEXTURE_CUBE_MAP,v,He);let fe;if(Te){R&&ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,de,je.width,je.height);for(let J=0;J<6;J++){fe=K[J].mipmaps;for(let L=0;L<fe.length;L++){const ie=fe[L];v.format!==Xt?Pe!==null?R?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L,0,0,ie.width,ie.height,Pe,ie.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L,de,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L,0,0,ie.width,ie.height,Pe,Se,ie.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L,de,ie.width,ie.height,0,Pe,Se,ie.data)}}}else{fe=v.mipmaps,R&&ne&&(fe.length>0&&ve++,t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,de,K[0].width,K[0].height));for(let J=0;J<6;J++)if(Oe){R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,K[J].width,K[J].height,Pe,Se,K[J].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,de,K[J].width,K[J].height,0,Pe,Se,K[J].data);for(let L=0;L<fe.length;L++){const ae=fe[L].image[J].image;R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L+1,0,0,ae.width,ae.height,Pe,Se,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L+1,de,ae.width,ae.height,0,Pe,Se,ae.data)}}else{R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,Se,K[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,de,Pe,Se,K[J]);for(let L=0;L<fe.length;L++){const ie=fe[L];R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L+1,0,0,Pe,Se,ie.image[J]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,L+1,de,Pe,Se,ie.image[J])}}}y(v,He)&&x(i.TEXTURE_CUBE_MAP),ee.__version=Z.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function xe(E,v,N,Q,Z,ee){const _e=r.convert(N.format,N.colorSpace),le=r.convert(N.type),pe=b(N.internalFormat,_e,le,N.colorSpace);if(!n.get(v).__hasExternalTextures){const Oe=Math.max(1,v.width>>ee),K=Math.max(1,v.height>>ee);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,pe,Oe,K,v.depth,0,_e,le,null):t.texImage2D(Z,ee,pe,Oe,K,0,_e,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),me(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,Z,n.get(N).__webglTexture,0,Le(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,Z,n.get(N).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(E,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer&&!v.stencilBuffer){let Q=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||me(v)){const Z=v.depthTexture;Z&&Z.isDepthTexture&&(Z.type===yn?Q=i.DEPTH_COMPONENT32F:Z.type===vn&&(Q=i.DEPTH_COMPONENT24));const ee=Le(v);me(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,Q,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,Q,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(v.depthBuffer&&v.stencilBuffer){const Q=Le(v);N&&me(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):me(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const Q=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],_e=r.convert(ee.format,ee.colorSpace),le=r.convert(ee.type),pe=b(ee.internalFormat,_e,le,ee.colorSpace),Te=Le(v);N&&me(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,pe,v.width,v.height):me(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,pe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,pe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V(v.depthTexture,0);const Q=n.get(v.depthTexture).__webglTexture,Z=Le(v);if(v.depthTexture.format===On)me(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(v.depthTexture.format===vi)me(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ae(E){const v=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ue(v.__webglFramebuffer,E)}else if(N){v.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Q]),v.__webglDepthbuffer[Q]=i.createRenderbuffer(),Ie(v.__webglDepthbuffer[Q],E,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),Ie(v.__webglDepthbuffer,E,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(E,v,N){const Q=n.get(E);v!==void 0&&xe(Q.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ae(E)}function F(E){const v=E.texture,N=n.get(E),Q=n.get(v);E.addEventListener("dispose",U),E.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=v.version,a.memory.textures++);const Z=E.isWebGLCubeRenderTarget===!0,ee=E.isWebGLMultipleRenderTargets===!0,_e=p(E)||o;if(Z){N.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[le]=[];for(let pe=0;pe<v.mipmaps.length;pe++)N.__webglFramebuffer[le][pe]=i.createFramebuffer()}else N.__webglFramebuffer[le]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let le=0;le<v.mipmaps.length;le++)N.__webglFramebuffer[le]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){const le=E.texture;for(let pe=0,Te=le.length;pe<Te;pe++){const Oe=n.get(le[pe]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&me(E)===!1){const le=ee?v:[v];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let pe=0;pe<le.length;pe++){const Te=le[pe];N.__webglColorRenderbuffer[pe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[pe]);const Oe=r.convert(Te.format,Te.colorSpace),K=r.convert(Te.type),je=b(Te.internalFormat,Oe,K,Te.colorSpace,E.isXRRenderTarget===!0),He=Le(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,je,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,N.__webglColorRenderbuffer[pe])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(N.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),G(i.TEXTURE_CUBE_MAP,v,_e);for(let le=0;le<6;le++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let pe=0;pe<v.mipmaps.length;pe++)xe(N.__webglFramebuffer[le][pe],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,pe);else xe(N.__webglFramebuffer[le],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);y(v,_e)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const le=E.texture;for(let pe=0,Te=le.length;pe<Te;pe++){const Oe=le[pe],K=n.get(Oe);t.bindTexture(i.TEXTURE_2D,K.__webglTexture),G(i.TEXTURE_2D,Oe,_e),xe(N.__webglFramebuffer,E,Oe,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,0),y(Oe,_e)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,Q.__webglTexture),G(le,v,_e),o&&v.mipmaps&&v.mipmaps.length>0)for(let pe=0;pe<v.mipmaps.length;pe++)xe(N.__webglFramebuffer[pe],E,v,i.COLOR_ATTACHMENT0,le,pe);else xe(N.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,le,0);y(v,_e)&&x(le),t.unbindTexture()}E.depthBuffer&&Ae(E)}function mt(E){const v=p(E)||o,N=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Q=0,Z=N.length;Q<Z;Q++){const ee=N[Q];if(y(ee,v)){const _e=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(ee).__webglTexture;t.bindTexture(_e,le),x(_e),t.unbindTexture()}}}function Ee(E){if(o&&E.samples>0&&me(E)===!1){const v=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],N=E.width,Q=E.height;let Z=i.COLOR_BUFFER_BIT;const ee=[],_e=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(E),pe=E.isWebGLMultipleRenderTargets===!0;if(pe)for(let Te=0;Te<v.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Te=0;Te<v.length;Te++){ee.push(i.COLOR_ATTACHMENT0+Te),E.depthBuffer&&ee.push(_e);const Oe=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Oe===!1&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),pe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[Te]),Oe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_e]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_e])),pe){const K=n.get(v[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,N,Q,0,0,N,Q,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pe)for(let Te=0;Te<v.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,le.__webglColorRenderbuffer[Te]);const Oe=n.get(v[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Le(E){return Math.min(s.maxSamples,E.samples)}function me(E){const v=n.get(E);return o&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Je(E){const v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function Fe(E,v){const N=E.colorSpace,Q=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Fr||N!==un&&N!==Ft&&(Ke.getTransfer(N)===Qe?o===!1?e.has("EXT_sRGB")===!0&&Q===Xt?(E.format=Fr,E.minFilter=Ut,E.generateMipmaps=!1):v=dl.sRGBToLinear(v):(Q!==Xt||Z!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}this.allocateTextureUnit=D,this.resetTextureUnits=te,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=$,this.rebindTextures=Xe,this.setupRenderTarget=F,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=me}function im(i,e,t){const n=t.isWebGL2;function s(r,a=Ft){let o;const l=Ke.getTransfer(a);if(r===bn)return i.UNSIGNED_BYTE;if(r===tl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===nl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Oc)return i.BYTE;if(r===Bc)return i.SHORT;if(r===Wr)return i.UNSIGNED_SHORT;if(r===el)return i.INT;if(r===vn)return i.UNSIGNED_INT;if(r===yn)return i.FLOAT;if(r===Oi)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===zc)return i.ALPHA;if(r===Xt)return i.RGBA;if(r===Hc)return i.LUMINANCE;if(r===kc)return i.LUMINANCE_ALPHA;if(r===On)return i.DEPTH_COMPONENT;if(r===vi)return i.DEPTH_STENCIL;if(r===Fr)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Gc)return i.RED;if(r===il)return i.RED_INTEGER;if(r===Vc)return i.RG;if(r===sl)return i.RG_INTEGER;if(r===rl)return i.RGBA_INTEGER;if(r===js||r===Ks||r===Zs||r===Js)if(l===Qe)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===js)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ks)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Zs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Js)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===js)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ks)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Zs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Js)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===mo||r===go||r===_o||r===xo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===mo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===go)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===_o)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===xo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ol)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===vo||r===yo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===vo)return l===Qe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===yo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Mo||r===So||r===Eo||r===bo||r===To||r===Ao||r===wo||r===Co||r===Ro||r===Lo||r===Po||r===Do||r===Io||r===Uo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Mo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===So)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Eo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===bo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===To)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ao)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===wo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Co)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ro)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Lo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Po)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Do)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Io)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Uo)return l===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Qs||r===No||r===Fo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Qs)return l===Qe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===No)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Fo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Wc||r===Oo||r===Bo||r===zo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Qs)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Oo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Bo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===zo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Fn?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class sm extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Pi extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rm={type:"move"};class Er{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Pi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class om extends Wn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,u=null;const y=[],x=[],b=new Re;let w=null;const A=new Nt;A.layers.enable(1),A.viewport=new ft;const C=new Nt;C.layers.enable(2),C.viewport=new ft;const U=[A,C],M=new sm;M.layers.enable(1),M.layers.enable(2);let T=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let j=y[G];return j===void 0&&(j=new Er,y[G]=j),j.getTargetRaySpace()},this.getControllerGrip=function(G){let j=y[G];return j===void 0&&(j=new Er,y[G]=j),j.getGripSpace()},this.getHand=function(G){let j=y[G];return j===void 0&&(j=new Er,y[G]=j),j.getHandSpace()};function W(G){const j=x.indexOf(G.inputSource);if(j===-1)return;const ce=y[j];ce!==void 0&&(ce.update(G.inputSource,G.frame,c||a),ce.dispatchEvent({type:G.type,data:G.inputSource}))}function te(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",te),s.removeEventListener("inputsourceschange",D);for(let G=0;G<y.length;G++){const j=x[G];j!==null&&(x[G]=null,y[G].disconnect(j))}T=null,k=null,e.setRenderTarget(p),m=null,f=null,d=null,s=null,u=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",te),s.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(b),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new kn(m.framebufferWidth,m.framebufferHeight,{format:Xt,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,ce=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?vi:On,ce=_.stencil?Fn:vn);const xe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),u=new kn(f.textureWidth,f.textureHeight,{format:Xt,type:bn,depthTexture:new El(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(u);Ie.__ignoreDepthValues=f.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(G){for(let j=0;j<G.removed.length;j++){const ce=G.removed[j],ye=x.indexOf(ce);ye>=0&&(x[ye]=null,y[ye].disconnect(ce))}for(let j=0;j<G.added.length;j++){const ce=G.added[j];let ye=x.indexOf(ce);if(ye===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=x.length){x.push(ce),ye=Ie;break}else if(x[Ie]===null){x[Ie]=ce,ye=Ie;break}if(ye===-1)break}const xe=y[ye];xe&&xe.connect(ce)}}const z=new P,V=new P;function q(G,j,ce){z.setFromMatrixPosition(j.matrixWorld),V.setFromMatrixPosition(ce.matrixWorld);const ye=z.distanceTo(V),xe=j.projectionMatrix.elements,Ie=ce.projectionMatrix.elements,Ue=xe[14]/(xe[10]-1),Ae=xe[14]/(xe[10]+1),Xe=(xe[9]+1)/xe[5],F=(xe[9]-1)/xe[5],mt=(xe[8]-1)/xe[0],Ee=(Ie[8]+1)/Ie[0],Le=Ue*mt,me=Ue*Ee,Je=ye/(-mt+Ee),Fe=Je*-mt;j.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Fe),G.translateZ(Je),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const E=Ue+Je,v=Ae+Je,N=Le-Fe,Q=me+(ye-Fe),Z=Xe*Ae/v*E,ee=F*Ae/v*E;G.projectionMatrix.makePerspective(N,Q,Z,ee,E,v),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function X(G,j){j===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(j.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;M.near=C.near=A.near=G.near,M.far=C.far=A.far=G.far,(T!==M.near||k!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,k=M.far);const j=G.parent,ce=M.cameras;X(M,j);for(let ye=0;ye<ce.length;ye++)X(ce[ye],j);ce.length===2?q(M,A,C):M.projectionMatrix.copy(A.projectionMatrix),$(G,M,j)};function $(G,j,ce){ce===null?G.matrix.copy(j.matrixWorld):(G.matrix.copy(ce.matrixWorld),G.matrix.invert(),G.matrix.multiply(j.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(j.projectionMatrix),G.projectionMatrixInverse.copy(j.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Or*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)};let Y=null;function se(G,j){if(h=j.getViewerPose(c||a),g=j,h!==null){const ce=h.views;m!==null&&(e.setRenderTargetFramebuffer(u,m.framebuffer),e.setRenderTarget(u));let ye=!1;ce.length!==M.cameras.length&&(M.cameras.length=0,ye=!0);for(let xe=0;xe<ce.length;xe++){const Ie=ce[xe];let Ue=null;if(m!==null)Ue=m.getViewport(Ie);else{const Xe=d.getViewSubImage(f,Ie);Ue=Xe.viewport,xe===0&&(e.setRenderTargetTextures(u,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(u))}let Ae=U[xe];Ae===void 0&&(Ae=new Nt,Ae.layers.enable(xe),Ae.viewport=new ft,U[xe]=Ae),Ae.matrix.fromArray(Ie.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ie.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(M.matrix.copy(Ae.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ye===!0&&M.cameras.push(Ae)}}for(let ce=0;ce<y.length;ce++){const ye=x[ce],xe=y[ce];ye!==null&&xe!==void 0&&xe.update(ye,j,c||a)}Y&&Y(G,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const re=new Ml;re.setAnimationLoop(se),this.setAnimationLoop=function(G){Y=G},this.dispose=function(){}}}function am(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,xl(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,y,x,b){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),d(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,b)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),_(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,y,x):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Tt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Tt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const y=e.get(u).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*x,t(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,y,x){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*y,p.scale.value=x*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),e.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,y){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Tt&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){const y=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lm(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,x){const b=x.program;n.uniformBlockBinding(y,b)}function c(y,x){let b=s[y.id];b===void 0&&(g(y),b=h(y),s[y.id]=b,y.addEventListener("dispose",p));const w=x.program;n.updateUBOMapping(y,w);const A=e.render.frame;r[y.id]!==A&&(f(y),r[y.id]=A)}function h(y){const x=d();y.__bindingPointIndex=x;const b=i.createBuffer(),w=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,w,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=s[y.id],b=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let A=0,C=b.length;A<C;A++){const U=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,T=U.length;M<T;M++){const k=U[M];if(m(k,A,M,w)===!0){const W=k.__offset,te=Array.isArray(k.value)?k.value:[k.value];let D=0;for(let z=0;z<te.length;z++){const V=te[z],q=_(V);typeof V=="number"||typeof V=="boolean"?(k.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,W+D,k.__data)):V.isMatrix3?(k.__data[0]=V.elements[0],k.__data[1]=V.elements[1],k.__data[2]=V.elements[2],k.__data[3]=0,k.__data[4]=V.elements[3],k.__data[5]=V.elements[4],k.__data[6]=V.elements[5],k.__data[7]=0,k.__data[8]=V.elements[6],k.__data[9]=V.elements[7],k.__data[10]=V.elements[8],k.__data[11]=0):(V.toArray(k.__data,D),D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(y,x,b,w){const A=y.value,C=x+"_"+b;if(w[C]===void 0)return typeof A=="number"||typeof A=="boolean"?w[C]=A:w[C]=A.clone(),!0;{const U=w[C];if(typeof A=="number"||typeof A=="boolean"){if(U!==A)return w[C]=A,!0}else if(U.equals(A)===!1)return U.copy(A),!0}return!1}function g(y){const x=y.uniforms;let b=0;const w=16;for(let C=0,U=x.length;C<U;C++){const M=Array.isArray(x[C])?x[C]:[x[C]];for(let T=0,k=M.length;T<k;T++){const W=M[T],te=Array.isArray(W.value)?W.value:[W.value];for(let D=0,z=te.length;D<z;D++){const V=te[D],q=_(V),X=b%w;X!==0&&w-X<q.boundary&&(b+=w-X),W.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=b,b+=q.storage}}}const A=b%w;return A>0&&(b+=w-A),y.__size=b,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}class Rl{constructor(e={}){const{canvas:t=ih(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const u=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this._useLegacyLights=!1,this.toneMapping=En,this.toneMappingExposure=1;const x=this;let b=!1,w=0,A=0,C=null,U=-1,M=null;const T=new ft,k=new ft;let W=null;const te=new We(0);let D=0,z=t.width,V=t.height,q=1,X=null,$=null;const Y=new ft(0,0,z,V),se=new ft(0,0,z,V);let re=!1;const G=new qr;let j=!1,ce=!1,ye=null;const xe=new it,Ie=new Re,Ue=new P,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return C===null?q:1}let F=n;function mt(S,I){for(let B=0;B<S.length;B++){const H=S[B],O=t.getContext(H,I);if(O!==null)return O}return null}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gr}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ie,!1),F===null){const I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),F=mt(I,S),F===null)throw mt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ee,Le,me,Je,Fe,E,v,N,Q,Z,ee,_e,le,pe,Te,Oe,K,je,He,Pe,Se,de,R,ne;function ve(){Ee=new xf(F),Le=new uf(F,Ee,e),Ee.init(Le),de=new im(F,Ee,Le),me=new tm(F,Ee,Le),Je=new Mf(F),Fe=new kp,E=new nm(F,Ee,me,Fe,Le,de,Je),v=new pf(x),N=new _f(x),Q=new Ch(F,Le),R=new hf(F,Ee,Q,Le),Z=new vf(F,Q,Je,R),ee=new Tf(F,Z,Q,Je),He=new bf(F,Le,E),Oe=new ff(Fe),_e=new Hp(x,v,N,Ee,Le,R,Oe),le=new am(x,Fe),pe=new Vp,Te=new jp(Ee,Le),je=new cf(x,v,N,me,ee,f,l),K=new em(x,ee,Le),ne=new lm(F,Je,Le,me),Pe=new df(F,Ee,Je,Le),Se=new yf(F,Ee,Je,Le),Je.programs=_e.programs,x.capabilities=Le,x.extensions=Ee,x.properties=Fe,x.renderLists=pe,x.shadowMap=K,x.state=me,x.info=Je}ve();const fe=new om(x,F);this.xr=fe,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=Ee.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ee.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(z,V,!1))},this.getSize=function(S){return S.set(z,V)},this.setSize=function(S,I,B=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=S,V=I,t.width=Math.floor(S*q),t.height=Math.floor(I*q),B===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(z*q,V*q).floor()},this.setDrawingBufferSize=function(S,I,B){z=S,V=I,q=B,t.width=Math.floor(S*B),t.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(Y)},this.setViewport=function(S,I,B,H){S.isVector4?Y.set(S.x,S.y,S.z,S.w):Y.set(S,I,B,H),me.viewport(T.copy(Y).multiplyScalar(q).floor())},this.getScissor=function(S){return S.copy(se)},this.setScissor=function(S,I,B,H){S.isVector4?se.set(S.x,S.y,S.z,S.w):se.set(S,I,B,H),me.scissor(k.copy(se).multiplyScalar(q).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(S){me.setScissorTest(re=S)},this.setOpaqueSort=function(S){X=S},this.setTransparentSort=function(S){$=S},this.getClearColor=function(S){return S.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor.apply(je,arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha.apply(je,arguments)},this.clear=function(S=!0,I=!0,B=!0){let H=0;if(S){let O=!1;if(C!==null){const ue=C.texture.format;O=ue===rl||ue===sl||ue===il}if(O){const ue=C.texture.type,Me=ue===bn||ue===vn||ue===Wr||ue===Fn||ue===tl||ue===nl,Ce=je.getClearColor(),De=je.getClearAlpha(),ke=Ce.r,Ne=Ce.g,Be=Ce.b;Me?(m[0]=ke,m[1]=Ne,m[2]=Be,m[3]=De,F.clearBufferuiv(F.COLOR,0,m)):(g[0]=ke,g[1]=Ne,g[2]=Be,g[3]=De,F.clearBufferiv(F.COLOR,0,g))}else H|=F.COLOR_BUFFER_BIT}I&&(H|=F.DEPTH_BUFFER_BIT),B&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),pe.dispose(),Te.dispose(),Fe.dispose(),v.dispose(),N.dispose(),ee.dispose(),R.dispose(),ne.dispose(),_e.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",st),fe.removeEventListener("sessionend",Ye),ye&&(ye.dispose(),ye=null),ot.stop()};function J(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=Je.autoReset,I=K.enabled,B=K.autoUpdate,H=K.needsUpdate,O=K.type;ve(),Je.autoReset=S,K.enabled=I,K.autoUpdate=B,K.needsUpdate=H,K.type=O}function ie(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const I=S.target;I.removeEventListener("dispose",ae),we(I)}function we(S){be(S),Fe.remove(S)}function be(S){const I=Fe.get(S).programs;I!==void 0&&(I.forEach(function(B){_e.releaseProgram(B)}),S.isShaderMaterial&&_e.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,H,O,ue){I===null&&(I=Ae);const Me=O.isMesh&&O.matrixWorld.determinant()<0,Ce=Jl(S,I,B,H,O);me.setMaterial(H,Me);let De=B.index,ke=1;if(H.wireframe===!0){if(De=Z.getWireframeAttribute(B),De===void 0)return;ke=2}const Ne=B.drawRange,Be=B.attributes.position;let rt=Ne.start*ke,wt=(Ne.start+Ne.count)*ke;ue!==null&&(rt=Math.max(rt,ue.start*ke),wt=Math.min(wt,(ue.start+ue.count)*ke)),De!==null?(rt=Math.max(rt,0),wt=Math.min(wt,De.count)):Be!=null&&(rt=Math.max(rt,0),wt=Math.min(wt,Be.count));const ht=wt-rt;if(ht<0||ht===1/0)return;R.setup(O,H,Ce,B,De);let tn,et=Pe;if(De!==null&&(tn=Q.get(De),et=Se,et.setIndex(tn)),O.isMesh)H.wireframe===!0?(me.setLineWidth(H.wireframeLinewidth*Xe()),et.setMode(F.LINES)):et.setMode(F.TRIANGLES);else if(O.isLine){let Ge=H.linewidth;Ge===void 0&&(Ge=1),me.setLineWidth(Ge*Xe()),O.isLineSegments?et.setMode(F.LINES):O.isLineLoop?et.setMode(F.LINE_LOOP):et.setMode(F.LINE_STRIP)}else O.isPoints?et.setMode(F.POINTS):O.isSprite&&et.setMode(F.TRIANGLES);if(O.isBatchedMesh)et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)et.renderInstances(rt,ht,O.count);else if(B.isInstancedBufferGeometry){const Ge=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ws=Math.min(B.instanceCount,Ge);et.renderInstances(rt,ht,Ws)}else et.render(rt,ht)};function $e(S,I,B){S.transparent===!0&&S.side===cn&&S.forceSinglePass===!1?(S.side=Tt,S.needsUpdate=!0,Xi(S,I,B),S.side=Tn,S.needsUpdate=!0,Xi(S,I,B),S.side=cn):Xi(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),p=Te.get(B),p.init(),y.push(p),B.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),S!==B&&S.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(x._useLegacyLights);const H=new Set;return S.traverse(function(O){const ue=O.material;if(ue)if(Array.isArray(ue))for(let Me=0;Me<ue.length;Me++){const Ce=ue[Me];$e(Ce,B,O),H.add(Ce)}else $e(ue,B,O),H.add(ue)}),y.pop(),p=null,H},this.compileAsync=function(S,I,B=null){const H=this.compile(S,I,B);return new Promise(O=>{function ue(){if(H.forEach(function(Me){Fe.get(Me).currentProgram.isReady()&&H.delete(Me)}),H.size===0){O(S);return}setTimeout(ue,10)}Ee.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let qe=null;function tt(S){qe&&qe(S)}function st(){ot.stop()}function Ye(){ot.start()}const ot=new Ml;ot.setAnimationLoop(tt),typeof self<"u"&&ot.setContext(self),this.setAnimationLoop=function(S){qe=S,fe.setAnimationLoop(S),S===null?ot.stop():ot.start()},fe.addEventListener("sessionstart",st),fe.addEventListener("sessionend",Ye),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(I),I=fe.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,I,C),p=Te.get(S,y.length),p.init(),y.push(p),xe.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),G.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,j=Oe.init(this.clippingPlanes,ce),_=pe.get(S,u.length),_.init(),u.push(_),$t(S,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(X,$),this.info.render.frame++,j===!0&&Oe.beginShadows();const B=p.state.shadowsArray;if(K.render(B,S,I),j===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),je.render(_,S),p.setupLights(x._useLegacyLights),I.isArrayCamera){const H=I.cameras;for(let O=0,ue=H.length;O<ue;O++){const Me=H[O];to(_,S,Me,Me.viewport)}}else to(_,S,I);C!==null&&(E.updateMultisampleRenderTarget(C),E.updateRenderTargetMipmap(C)),S.isScene===!0&&S.onAfterRender(x,S,I),R.resetDefaultState(),U=-1,M=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function $t(S,I,B,H){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||G.intersectsSprite(S)){H&&Ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(xe);const Me=ee.update(S),Ce=S.material;Ce.visible&&_.push(S,Me,Ce,B,Ue.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||G.intersectsObject(S))){const Me=ee.update(S),Ce=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ue.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ue.copy(Me.boundingSphere.center)),Ue.applyMatrix4(S.matrixWorld).applyMatrix4(xe)),Array.isArray(Ce)){const De=Me.groups;for(let ke=0,Ne=De.length;ke<Ne;ke++){const Be=De[ke],rt=Ce[Be.materialIndex];rt&&rt.visible&&_.push(S,Me,rt,B,Ue.z,Be)}}else Ce.visible&&_.push(S,Me,Ce,B,Ue.z,null)}}const ue=S.children;for(let Me=0,Ce=ue.length;Me<Ce;Me++)$t(ue[Me],I,B,H)}function to(S,I,B,H){const O=S.opaque,ue=S.transmissive,Me=S.transparent;p.setupLightsView(B),j===!0&&Oe.setGlobalState(x.clippingPlanes,B),ue.length>0&&Zl(O,ue,I,B),H&&me.viewport(T.copy(H)),O.length>0&&Wi(O,I,B),ue.length>0&&Wi(ue,I,B),Me.length>0&&Wi(Me,I,B),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Zl(S,I,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const ue=Le.isWebGL2;ye===null&&(ye=new kn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?Oi:bn,minFilter:Fi,samples:ue?4:0})),x.getDrawingBufferSize(Ie),ue?ye.setSize(Ie.x,Ie.y):ye.setSize(Br(Ie.x),Br(Ie.y));const Me=x.getRenderTarget();x.setRenderTarget(ye),x.getClearColor(te),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const Ce=x.toneMapping;x.toneMapping=En,Wi(S,B,H),E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye);let De=!1;for(let ke=0,Ne=I.length;ke<Ne;ke++){const Be=I[ke],rt=Be.object,wt=Be.geometry,ht=Be.material,tn=Be.group;if(ht.side===cn&&rt.layers.test(H.layers)){const et=ht.side;ht.side=Tt,ht.needsUpdate=!0,no(rt,B,H,wt,ht,tn),ht.side=et,ht.needsUpdate=!0,De=!0}}De===!0&&(E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye)),x.setRenderTarget(Me),x.setClearColor(te,D),x.toneMapping=Ce}function Wi(S,I,B){const H=I.isScene===!0?I.overrideMaterial:null;for(let O=0,ue=S.length;O<ue;O++){const Me=S[O],Ce=Me.object,De=Me.geometry,ke=H===null?Me.material:H,Ne=Me.group;Ce.layers.test(B.layers)&&no(Ce,I,B,De,ke,Ne)}}function no(S,I,B,H,O,ue){S.onBeforeRender(x,I,B,H,O,ue),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(x,I,B,H,S,ue),O.transparent===!0&&O.side===cn&&O.forceSinglePass===!1?(O.side=Tt,O.needsUpdate=!0,x.renderBufferDirect(B,I,H,O,S,ue),O.side=Tn,O.needsUpdate=!0,x.renderBufferDirect(B,I,H,O,S,ue),O.side=cn):x.renderBufferDirect(B,I,H,O,S,ue),S.onAfterRender(x,I,B,H,O,ue)}function Xi(S,I,B){I.isScene!==!0&&(I=Ae);const H=Fe.get(S),O=p.state.lights,ue=p.state.shadowsArray,Me=O.state.version,Ce=_e.getParameters(S,O.state,ue,I,B),De=_e.getProgramCacheKey(Ce);let ke=H.programs;H.environment=S.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(S.isMeshStandardMaterial?N:v).get(S.envMap||H.environment),ke===void 0&&(S.addEventListener("dispose",ae),ke=new Map,H.programs=ke);let Ne=ke.get(De);if(Ne!==void 0){if(H.currentProgram===Ne&&H.lightsStateVersion===Me)return so(S,Ce),Ne}else Ce.uniforms=_e.getUniforms(S),S.onBuild(B,Ce,x),S.onBeforeCompile(Ce,x),Ne=_e.acquireProgram(Ce,De),ke.set(De,Ne),H.uniforms=Ce.uniforms;const Be=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Be.clippingPlanes=Oe.uniform),so(S,Ce),H.needsLights=ec(S),H.lightsStateVersion=Me,H.needsLights&&(Be.ambientLightColor.value=O.state.ambient,Be.lightProbe.value=O.state.probe,Be.directionalLights.value=O.state.directional,Be.directionalLightShadows.value=O.state.directionalShadow,Be.spotLights.value=O.state.spot,Be.spotLightShadows.value=O.state.spotShadow,Be.rectAreaLights.value=O.state.rectArea,Be.ltc_1.value=O.state.rectAreaLTC1,Be.ltc_2.value=O.state.rectAreaLTC2,Be.pointLights.value=O.state.point,Be.pointLightShadows.value=O.state.pointShadow,Be.hemisphereLights.value=O.state.hemi,Be.directionalShadowMap.value=O.state.directionalShadowMap,Be.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Be.spotShadowMap.value=O.state.spotShadowMap,Be.spotLightMatrix.value=O.state.spotLightMatrix,Be.spotLightMap.value=O.state.spotLightMap,Be.pointShadowMap.value=O.state.pointShadowMap,Be.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Ne,H.uniformsList=null,Ne}function io(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=ys.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function so(S,I){const B=Fe.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Jl(S,I,B,H,O){I.isScene!==!0&&(I=Ae),E.resetTextureUnits();const ue=I.fog,Me=H.isMeshStandardMaterial?I.environment:null,Ce=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:un,De=(H.isMeshStandardMaterial?N:v).get(H.envMap||Me),ke=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Be=!!B.morphAttributes.position,rt=!!B.morphAttributes.normal,wt=!!B.morphAttributes.color;let ht=En;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ht=x.toneMapping);const tn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,et=tn!==void 0?tn.length:0,Ge=Fe.get(H),Ws=p.state.lights;if(j===!0&&(ce===!0||S!==M)){const Dt=S===M&&H.id===U;Oe.setState(H,S,Dt)}let nt=!1;H.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Ws.state.version||Ge.outputColorSpace!==Ce||O.isBatchedMesh&&Ge.batching===!1||!O.isBatchedMesh&&Ge.batching===!0||O.isInstancedMesh&&Ge.instancing===!1||!O.isInstancedMesh&&Ge.instancing===!0||O.isSkinnedMesh&&Ge.skinning===!1||!O.isSkinnedMesh&&Ge.skinning===!0||O.isInstancedMesh&&Ge.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ge.instancingColor===!1&&O.instanceColor!==null||Ge.envMap!==De||H.fog===!0&&Ge.fog!==ue||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Oe.numPlanes||Ge.numIntersection!==Oe.numIntersection)||Ge.vertexAlphas!==ke||Ge.vertexTangents!==Ne||Ge.morphTargets!==Be||Ge.morphNormals!==rt||Ge.morphColors!==wt||Ge.toneMapping!==ht||Le.isWebGL2===!0&&Ge.morphTargetsCount!==et)&&(nt=!0):(nt=!0,Ge.__version=H.version);let An=Ge.currentProgram;nt===!0&&(An=Xi(H,I,O));let ro=!1,Ti=!1,Xs=!1;const _t=An.getUniforms(),wn=Ge.uniforms;if(me.useProgram(An.program)&&(ro=!0,Ti=!0,Xs=!0),H.id!==U&&(U=H.id,Ti=!0),ro||M!==S){_t.setValue(F,"projectionMatrix",S.projectionMatrix),_t.setValue(F,"viewMatrix",S.matrixWorldInverse);const Dt=_t.map.cameraPosition;Dt!==void 0&&Dt.setValue(F,Ue.setFromMatrixPosition(S.matrixWorld)),Le.logarithmicDepthBuffer&&_t.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_t.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Ti=!0,Xs=!0)}if(O.isSkinnedMesh){_t.setOptional(F,O,"bindMatrix"),_t.setOptional(F,O,"bindMatrixInverse");const Dt=O.skeleton;Dt&&(Le.floatVertexTextures?(Dt.boneTexture===null&&Dt.computeBoneTexture(),_t.setValue(F,"boneTexture",Dt.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(_t.setOptional(F,O,"batchingTexture"),_t.setValue(F,"batchingTexture",O._matricesTexture,E));const $s=B.morphAttributes;if(($s.position!==void 0||$s.normal!==void 0||$s.color!==void 0&&Le.isWebGL2===!0)&&He.update(O,B,An),(Ti||Ge.receiveShadow!==O.receiveShadow)&&(Ge.receiveShadow=O.receiveShadow,_t.setValue(F,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(wn.envMap.value=De,wn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Ti&&(_t.setValue(F,"toneMappingExposure",x.toneMappingExposure),Ge.needsLights&&Ql(wn,Xs),ue&&H.fog===!0&&le.refreshFogUniforms(wn,ue),le.refreshMaterialUniforms(wn,H,q,V,ye),ys.upload(F,io(Ge),wn,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ys.upload(F,io(Ge),wn,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_t.setValue(F,"center",O.center),_t.setValue(F,"modelViewMatrix",O.modelViewMatrix),_t.setValue(F,"normalMatrix",O.normalMatrix),_t.setValue(F,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Dt=H.uniformsGroups;for(let qs=0,tc=Dt.length;qs<tc;qs++)if(Le.isWebGL2){const oo=Dt[qs];ne.update(oo,An),ne.bind(oo,An)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return An}function Ql(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function ec(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(S,I,B){Fe.get(S.texture).__webglTexture=I,Fe.get(S.depthTexture).__webglTexture=B;const H=Fe.get(S);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,I){const B=Fe.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,B=0){C=S,w=I,A=B;let H=!0,O=null,ue=!1,Me=!1;if(S){const De=Fe.get(S);De.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(F.FRAMEBUFFER,null),H=!1):De.__webglFramebuffer===void 0?E.setupRenderTarget(S):De.__hasExternalTextures&&E.rebindTextures(S,Fe.get(S.texture).__webglTexture,Fe.get(S.depthTexture).__webglTexture);const ke=S.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Me=!0);const Ne=Fe.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ne[I])?O=Ne[I][B]:O=Ne[I],ue=!0):Le.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?O=Fe.get(S).__webglMultisampledFramebuffer:Array.isArray(Ne)?O=Ne[B]:O=Ne,T.copy(S.viewport),k.copy(S.scissor),W=S.scissorTest}else T.copy(Y).multiplyScalar(q).floor(),k.copy(se).multiplyScalar(q).floor(),W=re;if(me.bindFramebuffer(F.FRAMEBUFFER,O)&&Le.drawBuffers&&H&&me.drawBuffers(S,O),me.viewport(T),me.scissor(k),me.setScissorTest(W),ue){const De=Fe.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+I,De.__webglTexture,B)}else if(Me){const De=Fe.get(S.texture),ke=I||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,De.__webglTexture,B||0,ke)}U=-1},this.readRenderTargetPixels=function(S,I,B,H,O,ue,Me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Fe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(Ce=Ce[Me]),Ce){me.bindFramebuffer(F.FRAMEBUFFER,Ce);try{const De=S.texture,ke=De.format,Ne=De.type;if(ke!==Xt&&de.convert(ke)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=Ne===Oi&&(Ee.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==bn&&de.convert(Ne)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===yn&&(Le.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-H&&B>=0&&B<=S.height-O&&F.readPixels(I,B,H,O,de.convert(ke),de.convert(Ne),ue)}finally{const De=C!==null?Fe.get(C).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(S,I,B=0){const H=Math.pow(2,-B),O=Math.floor(I.image.width*H),ue=Math.floor(I.image.height*H);E.setTexture2D(I,0),F.copyTexSubImage2D(F.TEXTURE_2D,B,0,0,S.x,S.y,O,ue),me.unbindTexture()},this.copyTextureToTexture=function(S,I,B,H=0){const O=I.image.width,ue=I.image.height,Me=de.convert(B.format),Ce=de.convert(B.type);E.setTexture2D(B,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment),I.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,H,S.x,S.y,O,ue,Me,Ce,I.image.data):I.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,H,S.x,S.y,I.mipmaps[0].width,I.mipmaps[0].height,Me,I.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,H,S.x,S.y,Me,Ce,I.image),H===0&&B.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(S,I,B,H,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ue=S.max.x-S.min.x+1,Me=S.max.y-S.min.y+1,Ce=S.max.z-S.min.z+1,De=de.convert(H.format),ke=de.convert(H.type);let Ne;if(H.isData3DTexture)E.setTexture3D(H,0),Ne=F.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)E.setTexture2DArray(H,0),Ne=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const Be=F.getParameter(F.UNPACK_ROW_LENGTH),rt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),wt=F.getParameter(F.UNPACK_SKIP_PIXELS),ht=F.getParameter(F.UNPACK_SKIP_ROWS),tn=F.getParameter(F.UNPACK_SKIP_IMAGES),et=B.isCompressedTexture?B.mipmaps[O]:B.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,et.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,et.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,S.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,S.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,S.min.z),B.isDataTexture||B.isData3DTexture?F.texSubImage3D(Ne,O,I.x,I.y,I.z,ue,Me,Ce,De,ke,et.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Ne,O,I.x,I.y,I.z,ue,Me,Ce,De,et.data)):F.texSubImage3D(Ne,O,I.x,I.y,I.z,ue,Me,Ce,De,ke,et),F.pixelStorei(F.UNPACK_ROW_LENGTH,Be),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,rt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,wt),F.pixelStorei(F.UNPACK_SKIP_ROWS,ht),F.pixelStorei(F.UNPACK_SKIP_IMAGES,tn),O===0&&H.generateMipmaps&&F.generateMipmap(Ne),me.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),me.unbindTexture()},this.resetState=function(){w=0,A=0,C=null,me.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Xr?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Os?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===gt?Bn:al}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Bn?gt:un}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class cm extends Rl{}cm.prototype.isWebGL1Renderer=!0;class Ii{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new We(e),this.near=t,this.far=n}clone(){return new Ii(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hm extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Bi extends Si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new P,Ra=new P,La=new it,br=new zs,ps=new Bs;class Ds extends pt{constructor(e=new Pt,t=new Bi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ca.fromBufferAttribute(t,s-1),Ra.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ca.distanceTo(Ra);e.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(s),ps.radius+=r,e.ray.intersectsSphere(ps)===!1)return;La.copy(s).invert(),br.copy(e.ray).applyMatrix4(La);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new P,h=new P,d=new P,f=new P,m=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const u=Math.max(0,a.start),y=Math.min(g.count,a.start+a.count);for(let x=u,b=y-1;x<b;x+=m){const w=g.getX(x),A=g.getX(x+1);if(c.fromBufferAttribute(p,w),h.fromBufferAttribute(p,A),br.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(f);U<e.near||U>e.far||t.push({distance:U,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const u=Math.max(0,a.start),y=Math.min(p.count,a.start+a.count);for(let x=u,b=y-1;x<b;x+=m){if(c.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),br.distanceSqToSegment(c,h,f,d)>l)continue;f.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Pa=new P,Da=new P;class dm extends Ds{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Pa.fromBufferAttribute(t,s),Da.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Pa.distanceTo(Da);e.setAttribute("lineDistance",new At(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zi extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new P,f=new P,m=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){const y=[],x=u/n;let b=0;u===0&&a===0?b=.5/t:u===n&&l===Math.PI&&(b=-.5/t);for(let w=0;w<=t;w++){const A=w/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(A+b,1-x),y.push(c++)}h.push(y)}for(let u=0;u<n;u++)for(let y=0;y<t;y++){const x=h[u][y+1],b=h[u][y],w=h[u+1][y],A=h[u+1][y+1];(u!==0||a>0)&&m.push(x,b,A),(u!==n-1||l<Math.PI)&&m.push(b,w,A)}this.setIndex(m),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ms extends Si{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new We(16777215),this.specular=new We(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ll,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Vr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ll extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Tr=new it,Ia=new P,Ua=new P;class um{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qr,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ia.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ia),Ua.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ua),t.updateMatrixWorld(),Tr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Tr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class fm extends um{constructor(){super(new Sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Na extends Ll{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new fm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Fa extends Ll{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class pm{constructor(e,t,n=0,s=1/0){this.ray=new zs(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $r,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Hr(e,this,n,t),n.sort(Oa),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Hr(e[s],this,n,t);return n.sort(Oa),n}}function Oa(i,e){return i.distance-e.distance}function Hr(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)Hr(s[r],e,t,!0)}}class Ba{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class mm extends dm{constructor(e=10,t=10,n=4473924,s=8947848){n=new We(n),s=new We(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let f=0,m=0,g=-o;f<=t;f++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const _=f===r?n:s;_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3}const h=new Pt;h.setAttribute("position",new At(l,3)),h.setAttribute("color",new At(c,3));const d=new Bi({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gr);const za={type:"change"},Ar={type:"start"},Ha={type:"end"},ms=new zs,ka=new xn,gm=Math.cos(70*nh.DEG2RAD);class _m extends Wn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xn.ROTATE,MIDDLE:Xn.DOLLY,RIGHT:Xn.PAN},this.touches={ONE:$n.ROTATE,TWO:$n.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Te),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Te),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(za),n.update(),r=s.NONE},this.update=function(){const R=new P,ne=new Gn().setFromUnitVectors(e.up,new P(0,1,0)),ve=ne.clone().invert(),fe=new P,J=new Gn,L=new P,ie=2*Math.PI;return function(we=null){const be=n.object.position;R.copy(be).sub(n.target),R.applyQuaternion(ne),o.setFromVector3(R),n.autoRotate&&r===s.NONE&&W(T(we)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let $e=n.minAzimuthAngle,qe=n.maxAzimuthAngle;isFinite($e)&&isFinite(qe)&&($e<-Math.PI?$e+=ie:$e>Math.PI&&($e-=ie),qe<-Math.PI?qe+=ie:qe>Math.PI&&(qe-=ie),$e<=qe?o.theta=Math.max($e,Math.min(qe,o.theta)):o.theta=o.theta>($e+qe)/2?Math.max($e,o.theta):Math.min(qe,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&A||n.object.isOrthographicCamera?o.radius=Y(o.radius):o.radius=Y(o.radius*c),R.setFromSpherical(o),R.applyQuaternion(ve),be.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let tt=!1;if(n.zoomToCursor&&A){let st=null;if(n.object.isPerspectiveCamera){const Ye=R.length();st=Y(Ye*c);const ot=Ye-st;n.object.position.addScaledVector(b,ot),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Ye=new P(w.x,w.y,0);Ye.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),tt=!0;const ot=new P(w.x,w.y,0);ot.unproject(n.object),n.object.position.sub(ot).add(Ye),n.object.updateMatrixWorld(),st=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;st!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(st).add(n.object.position):(ms.origin.copy(n.object.position),ms.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ms.direction))<gm?e.lookAt(n.target):(ka.setFromNormalAndCoplanarPoint(n.object.up,n.target),ms.intersectPlane(ka,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),tt=!0);return c=1,A=!1,tt||fe.distanceToSquared(n.object.position)>a||8*(1-J.dot(n.object.quaternion))>a||L.distanceToSquared(n.target)>0?(n.dispatchEvent(za),fe.copy(n.object.position),J.copy(n.object.quaternion),L.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",je),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",N),n.domElement.removeEventListener("wheel",ee),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",N),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Te),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Ba,l=new Ba;let c=1;const h=new P,d=new Re,f=new Re,m=new Re,g=new Re,_=new Re,p=new Re,u=new Re,y=new Re,x=new Re,b=new P,w=new Re;let A=!1;const C=[],U={};let M=!1;function T(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function k(R){const ne=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*ne)}function W(R){l.theta-=R}function te(R){l.phi-=R}const D=function(){const R=new P;return function(ve,fe){R.setFromMatrixColumn(fe,0),R.multiplyScalar(-ve),h.add(R)}}(),z=function(){const R=new P;return function(ve,fe){n.screenSpacePanning===!0?R.setFromMatrixColumn(fe,1):(R.setFromMatrixColumn(fe,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(ve),h.add(R)}}(),V=function(){const R=new P;return function(ve,fe){const J=n.domElement;if(n.object.isPerspectiveCamera){const L=n.object.position;R.copy(L).sub(n.target);let ie=R.length();ie*=Math.tan(n.object.fov/2*Math.PI/180),D(2*ve*ie/J.clientHeight,n.object.matrix),z(2*fe*ie/J.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(ve*(n.object.right-n.object.left)/n.object.zoom/J.clientWidth,n.object.matrix),z(fe*(n.object.top-n.object.bottom)/n.object.zoom/J.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function q(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(R,ne){if(!n.zoomToCursor)return;A=!0;const ve=n.domElement.getBoundingClientRect(),fe=R-ve.left,J=ne-ve.top,L=ve.width,ie=ve.height;w.x=fe/L*2-1,w.y=-(J/ie)*2+1,b.set(w.x,w.y,1).unproject(n.object).sub(n.object.position).normalize()}function Y(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function se(R){d.set(R.clientX,R.clientY)}function re(R){$(R.clientX,R.clientX),u.set(R.clientX,R.clientY)}function G(R){g.set(R.clientX,R.clientY)}function j(R){f.set(R.clientX,R.clientY),m.subVectors(f,d).multiplyScalar(n.rotateSpeed);const ne=n.domElement;W(2*Math.PI*m.x/ne.clientHeight),te(2*Math.PI*m.y/ne.clientHeight),d.copy(f),n.update()}function ce(R){y.set(R.clientX,R.clientY),x.subVectors(y,u),x.y>0?q(k(x.y)):x.y<0&&X(k(x.y)),u.copy(y),n.update()}function ye(R){_.set(R.clientX,R.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),V(p.x,p.y),g.copy(_),n.update()}function xe(R){$(R.clientX,R.clientY),R.deltaY<0?X(k(R.deltaY)):R.deltaY>0&&q(k(R.deltaY)),n.update()}function Ie(R){let ne=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?te(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(0,n.keyPanSpeed),ne=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?te(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(0,-n.keyPanSpeed),ne=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?W(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(n.keyPanSpeed,0),ne=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?W(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):V(-n.keyPanSpeed,0),ne=!0;break}ne&&(R.preventDefault(),n.update())}function Ue(R){if(C.length===1)d.set(R.pageX,R.pageY);else{const ne=de(R),ve=.5*(R.pageX+ne.x),fe=.5*(R.pageY+ne.y);d.set(ve,fe)}}function Ae(R){if(C.length===1)g.set(R.pageX,R.pageY);else{const ne=de(R),ve=.5*(R.pageX+ne.x),fe=.5*(R.pageY+ne.y);g.set(ve,fe)}}function Xe(R){const ne=de(R),ve=R.pageX-ne.x,fe=R.pageY-ne.y,J=Math.sqrt(ve*ve+fe*fe);u.set(0,J)}function F(R){n.enableZoom&&Xe(R),n.enablePan&&Ae(R)}function mt(R){n.enableZoom&&Xe(R),n.enableRotate&&Ue(R)}function Ee(R){if(C.length==1)f.set(R.pageX,R.pageY);else{const ve=de(R),fe=.5*(R.pageX+ve.x),J=.5*(R.pageY+ve.y);f.set(fe,J)}m.subVectors(f,d).multiplyScalar(n.rotateSpeed);const ne=n.domElement;W(2*Math.PI*m.x/ne.clientHeight),te(2*Math.PI*m.y/ne.clientHeight),d.copy(f)}function Le(R){if(C.length===1)_.set(R.pageX,R.pageY);else{const ne=de(R),ve=.5*(R.pageX+ne.x),fe=.5*(R.pageY+ne.y);_.set(ve,fe)}p.subVectors(_,g).multiplyScalar(n.panSpeed),V(p.x,p.y),g.copy(_)}function me(R){const ne=de(R),ve=R.pageX-ne.x,fe=R.pageY-ne.y,J=Math.sqrt(ve*ve+fe*fe);y.set(0,J),x.set(0,Math.pow(y.y/u.y,n.zoomSpeed)),q(x.y),u.copy(y);const L=(R.pageX+ne.x)*.5,ie=(R.pageY+ne.y)*.5;$(L,ie)}function Je(R){n.enableZoom&&me(R),n.enablePan&&Le(R)}function Fe(R){n.enableZoom&&me(R),n.enableRotate&&Ee(R)}function E(R){n.enabled!==!1&&(C.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",v),n.domElement.addEventListener("pointerup",N)),He(R),R.pointerType==="touch"?Oe(R):Q(R))}function v(R){n.enabled!==!1&&(R.pointerType==="touch"?K(R):Z(R))}function N(R){Pe(R),C.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",N)),n.dispatchEvent(Ha),r=s.NONE}function Q(R){let ne;switch(R.button){case 0:ne=n.mouseButtons.LEFT;break;case 1:ne=n.mouseButtons.MIDDLE;break;case 2:ne=n.mouseButtons.RIGHT;break;default:ne=-1}switch(ne){case Xn.DOLLY:if(n.enableZoom===!1)return;re(R),r=s.DOLLY;break;case Xn.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;G(R),r=s.PAN}else{if(n.enableRotate===!1)return;se(R),r=s.ROTATE}break;case Xn.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;se(R),r=s.ROTATE}else{if(n.enablePan===!1)return;G(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Ar)}function Z(R){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;j(R);break;case s.DOLLY:if(n.enableZoom===!1)return;ce(R);break;case s.PAN:if(n.enablePan===!1)return;ye(R);break}}function ee(R){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(R.preventDefault(),n.dispatchEvent(Ar),xe(_e(R)),n.dispatchEvent(Ha))}function _e(R){const ne=R.deltaMode,ve={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ne){case 1:ve.deltaY*=16;break;case 2:ve.deltaY*=100;break}return R.ctrlKey&&!M&&(ve.deltaY*=10),ve}function le(R){R.key==="Control"&&(M=!0,document.addEventListener("keyup",pe,{passive:!0,capture:!0}))}function pe(R){R.key==="Control"&&(M=!1,document.removeEventListener("keyup",pe,{passive:!0,capture:!0}))}function Te(R){n.enabled===!1||n.enablePan===!1||Ie(R)}function Oe(R){switch(Se(R),C.length){case 1:switch(n.touches.ONE){case $n.ROTATE:if(n.enableRotate===!1)return;Ue(R),r=s.TOUCH_ROTATE;break;case $n.PAN:if(n.enablePan===!1)return;Ae(R),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case $n.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;F(R),r=s.TOUCH_DOLLY_PAN;break;case $n.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;mt(R),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Ar)}function K(R){switch(Se(R),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;Ee(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Le(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Je(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Fe(R),n.update();break;default:r=s.NONE}}function je(R){n.enabled!==!1&&R.preventDefault()}function He(R){C.push(R.pointerId)}function Pe(R){delete U[R.pointerId];for(let ne=0;ne<C.length;ne++)if(C[ne]==R.pointerId){C.splice(ne,1);return}}function Se(R){let ne=U[R.pointerId];ne===void 0&&(ne=new Re,U[R.pointerId]=ne),ne.set(R.pageX,R.pageY)}function de(R){const ne=R.pointerId===C[0]?C[1]:C[0];return U[ne]}n.domElement.addEventListener("contextmenu",je),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",N),n.domElement.addEventListener("wheel",ee,{passive:!1}),document.addEventListener("keydown",le,{passive:!0,capture:!0}),this.update()}}class ci extends pt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Re(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const hi=new P,Ga=new it,Va=new it,Wa=new P,Xa=new P;class xm{constructor(e={}){const t=this;let n,s,r,a;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(m,g){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),Ga.copy(g.matrixWorldInverse),Va.multiplyMatrices(g.projectionMatrix,Ga),c(m,m,g),f(m)},this.setSize=function(m,g){n=m,s=g,r=n/2,a=s/2,l.style.width=m+"px",l.style.height=g+"px"};function c(m,g,_){if(m.isCSS2DObject){hi.setFromMatrixPosition(m.matrixWorld),hi.applyMatrix4(Va);const p=m.visible===!0&&hi.z>=-1&&hi.z<=1&&m.layers.test(_.layers)===!0;if(m.element.style.display=p===!0?"":"none",p===!0){m.onBeforeRender(t,g,_);const y=m.element;y.style.transform="translate("+-100*m.center.x+"%,"+-100*m.center.y+"%)translate("+(hi.x*r+r)+"px,"+(-hi.y*a+a)+"px)",y.parentNode!==l&&l.appendChild(y),m.onAfterRender(t,g,_)}const u={distanceToCameraSquared:h(_,m)};o.objects.set(m,u)}for(let p=0,u=m.children.length;p<u;p++)c(m.children[p],g,_)}function h(m,g){return Wa.setFromMatrixPosition(m.matrixWorld),Xa.setFromMatrixPosition(g.matrixWorld),Wa.distanceToSquared(Xa)}function d(m){const g=[];return m.traverse(function(_){_.isCSS2DObject&&g.push(_)}),g}function f(m){const g=d(m).sort(function(p,u){if(p.renderOrder!==u.renderOrder)return u.renderOrder-p.renderOrder;const y=o.objects.get(p).distanceToCameraSquared,x=o.objects.get(u).distanceToCameraSquared;return y-x}),_=g.length;for(let p=0,u=g.length;p<u;p++)g[p].element.style.zIndex=_-p}}}const zn={cpp:{hex:"#f34b7d",numeric:15944573,name:"C++"},h:{hex:"#b07219",numeric:11563545,name:"C/C++ Header"},c:{hex:"#ff6b6b",numeric:16739179,name:"C"},py:{hex:"#3776ab",numeric:3634859,name:"Python"},js:{hex:"#f7df1e",numeric:16244510,name:"JavaScript"},ts:{hex:"#3178c6",numeric:3242182,name:"TypeScript"},jsx:{hex:"#61dafb",numeric:6413051,name:"React JSX"},tsx:{hex:"#61dafb",numeric:6413051,name:"React TSX"},java:{hex:"#f89820",numeric:16291872,name:"Java"},go:{hex:"#00add8",numeric:44504,name:"Go"},rs:{hex:"#dea584",numeric:14591364,name:"Rust"},rb:{hex:"#cc342d",numeric:13382701,name:"Ruby"},php:{hex:"#777bb4",numeric:7830452,name:"PHP"},pl:{hex:"#0298c3",numeric:170179,name:"Perl"},html:{hex:"#e34c26",numeric:14896166,name:"HTML"},css:{hex:"#264de4",numeric:2510308,name:"CSS"},md:{hex:"#083fa1",numeric:540577,name:"Markdown"},frag:{hex:"#5686a5",numeric:5670565,name:"GLSL Shader (frag)"},vert:{hex:"#5686a5",numeric:5670565,name:"GLSL Shader (vert)"},style:{hex:"#9b59b6",numeric:10181046,name:"Style File"},am:{hex:"#e67e22",numeric:15105570,name:"Automake"},ac:{hex:"#e67e22",numeric:15105570,name:"Autoconf"},m4:{hex:"#e67e22",numeric:15105570,name:"M4 Macro"},pro:{hex:"#41cd52",numeric:4312402,name:"Qt Project"},sh:{hex:"#89e051",numeric:9035857,name:"Shell Script"},cmd:{hex:"#89e051",numeric:9035857,name:"Batch Script"},yml:{hex:"#cb171e",numeric:13309726,name:"YAML"},yaml:{hex:"#cb171e",numeric:13309726,name:"YAML"},"no-extension":{hex:"#f39c12",numeric:15965202,name:"Config (no ext)"},conf:{hex:"#f39c12",numeric:15965202,name:"Config"},1:{hex:"#e67e22",numeric:15105570,name:"Man Page"},json:{hex:"#292929",numeric:2697513,name:"JSON"},txt:{hex:"#95a5a6",numeric:9807270,name:"Text"},log:{hex:"#95a5a6",numeric:9807270,name:"Log File"},png:{hex:"#ff00ff",numeric:16711935,name:"Image (PNG)"},jpg:{hex:"#ff00ff",numeric:16711935,name:"Image (JPG)"},jpeg:{hex:"#ff00ff",numeric:16711935,name:"Image (JPEG)"},gif:{hex:"#ff00ff",numeric:16711935,name:"Image (GIF)"},bmp:{hex:"#ff00ff",numeric:16711935,name:"Image (BMP)"},tga:{hex:"#ff00ff",numeric:16711935,name:"Image (TGA)"},xcf:{hex:"#ff00ff",numeric:16711935,name:"GIMP Image"},ttf:{hex:"#34495e",numeric:3426654,name:"Font (TTF)"},otf:{hex:"#34495e",numeric:3426654,name:"Font (OTF)"},woff:{hex:"#34495e",numeric:3426654,name:"Font (WOFF)"}},vm={hex:"#aaaaaa",numeric:11184810,name:"Unknown"},Pl={hex:"#7f8c8d",numeric:8359053,name:"Directory"};function $a(i){return zn[i]||vm}class ym{constructor(){this.couplingData=null,this.fileToCluster=new Map,this.loaded=!1}async tryLoad(e){var t;try{const n=await fetch(`/codecohesion/data/${e}-coupling.json`);return n.ok?(this.couplingData=await n.json(),((t=this.couplingData)==null?void 0:t.format)!=="coupling-v1"?(console.warn("Invalid coupling data format, ignoring"),this.reset(),!1):(this.buildIndex(),this.loaded=!0,console.log(`✓ Loaded coupling data: ${this.couplingData.clusters.length} clusters, ${this.couplingData.edges.length} edges`),!0)):(console.log(`No coupling data for ${e} (optional feature)`),this.reset(),!1)}catch{return console.log("Coupling data not available (optional feature)"),this.reset(),!1}}isLoaded(){return this.loaded}getClusterForFile(e){return this.loaded?this.fileToCluster.get(e)??null:null}getClusters(){var e;return this.loaded?((e=this.couplingData)==null?void 0:e.clusters)??[]:[]}getEdges(e=.3){var t;return this.loaded?((t=this.couplingData)==null?void 0:t.edges.filter(n=>n.coupling>=e))??[]:[]}getAnalysisInfo(){var e;return this.loaded?((e=this.couplingData)==null?void 0:e.analysis)??null:null}reset(){this.couplingData=null,this.fileToCluster.clear(),this.loaded=!1}buildIndex(){if(this.couplingData){this.fileToCluster.clear();for(const e of this.couplingData.clusters)for(const t of e.files)this.fileToCluster.set(t,e.id)}}}const yt=new ym;function Dl(i,e,t){e/=100,t/=100;const n=(1-Math.abs(2*t-1))*e,s=n*(1-Math.abs(i/60%2-1)),r=t-n/2;let a=0,o=0,l=0;i>=0&&i<60?(a=n,o=s,l=0):i>=60&&i<120?(a=s,o=n,l=0):i>=120&&i<180?(a=0,o=n,l=s):i>=180&&i<240?(a=0,o=s,l=n):i>=240&&i<300?(a=s,o=0,l=n):i>=300&&i<360&&(a=n,o=0,l=s);const c=h=>Math.round((h+r)*255).toString(16).padStart(2,"0");return`#${c(a)}${c(o)}${c(l)}`}const gi=new Map;let Hi=0,Zt=[],Mn=[];function Mm(){gi.clear(),Hi=0}function Sm(i){if(i.length===0){Zt=[];return}const e=i.map(A=>new Date(A)).sort((A,C)=>A.getTime()-C.getTime()),t=e.length,n=new Date,s=Math.floor(t*.8),r=e[s];if((n.getTime()-r.getTime())/(1e3*60*60*24)<90){Zt=[];return}const o=Math.floor(t*.2)-1,l=Math.floor(t*.4)-1,c=Math.floor(t*.6)-1,h=Math.floor(t*.8)-1,d=Math.floor(t*.9)-1,f=Math.floor(t*.95)-1,m=e[0],g=e[Math.max(0,o)],_=e[Math.max(0,l)],p=e[Math.max(0,c)],u=e[Math.max(0,h)],y=e[Math.max(0,d)],x=e[Math.max(0,f)],b=e[t-1],w=(A,C)=>{const U=A.getFullYear(),M=C.getFullYear();return U===M?`${U}`:`${U}-${M}`};Zt=[{minDate:x,maxDate:b,label:`Newest 5%: ${w(x,b)}`,hex:"#00ff88"},{minDate:y,maxDate:x,label:`5-10%: ${w(y,x)}`,hex:"#ccff00"},{minDate:u,maxDate:y,label:`10-20%: ${w(u,y)}`,hex:"#ffaa00"},{minDate:p,maxDate:u,label:`20-40%: ${w(p,u)}`,hex:"#ff8800"},{minDate:_,maxDate:p,label:`40-60%: ${w(_,p)}`,hex:"#ff5500"},{minDate:g,maxDate:_,label:`60-80%: ${w(g,_)}`,hex:"#cc3333"},{minDate:m,maxDate:g,label:`Oldest 20%: ${w(m,g)}`,hex:"#666666"}]}function Em(i){if(i.length===0){Mn=[];return}const e=[...i].sort((u,y)=>u-y),t=e.length,n=Math.floor(t*.2)-1,s=Math.floor(t*.4)-1,r=Math.floor(t*.6)-1,a=Math.floor(t*.8)-1,o=Math.floor(t*.95)-1,l=t-1,c=e[0],h=e[Math.max(0,n)],d=e[Math.max(0,s)],f=e[Math.max(0,r)],m=e[Math.max(0,a)],g=e[Math.max(0,o)],_=e[l],p=(u,y)=>u===y?`${u}`:`${u}-${y}`;Mn=[{minLoc:g,maxLoc:_,label:`Largest 5%: ${p(g,_)} LOC`,hex:"#c0392b"},{minLoc:m,maxLoc:g,label:`80-95%: ${p(m,g)} LOC`,hex:"#e74c3c"},{minLoc:f,maxLoc:m,label:`60-80%: ${p(f,m)} LOC`,hex:"#e67e22"},{minLoc:d,maxLoc:f,label:`40-60%: ${p(d,f)} LOC`,hex:"#f1c40f"},{minLoc:h,maxLoc:d,label:`20-40%: ${p(h,d)} LOC`,hex:"#2ecc71"},{minLoc:c,maxLoc:h,label:`Smallest 20%: ${p(c,h)} LOC`,hex:"#3498db"}]}function bm(i){Mm();for(const e of i)gi.has(e)||(gi.set(e,Hi),Hi++)}function Il(i,e){const t=(i-1)*360/e,n=Dl(t,75,60);return parseInt(n.substring(1),16)}function Tm(i){if(!i)return{hex:"#666666",name:"Unknown"};gi.has(i)||(gi.set(i,Hi),Hi++);const n=gi.get(i)*.618033988749895*360%360;return{hex:Dl(n,70,60),name:i}}function Am(i){return i===null||i===0?{hex:"#666666",name:"No commits"}:i<=2?{hex:"#3498db",name:"Low churn (1-2 commits)"}:i<=5?{hex:"#2ecc71",name:"Low-medium (3-5 commits)"}:i<=10?{hex:"#f1c40f",name:"Medium (6-10 commits)"}:i<=20?{hex:"#e67e22",name:"High (11-20 commits)"}:i<=50?{hex:"#e74c3c",name:"Very high (21-50 commits)"}:{hex:"#c0392b",name:"Extremely high (50+ commits)"}}function wm(i){return i===null||i===0?{hex:"#666666",name:"No contributors"}:i===1?{hex:"#3498db",name:"Solo (1 contributor)"}:i===2?{hex:"#2ecc71",name:"Pair (2 contributors)"}:i<=4?{hex:"#f1c40f",name:"Team (3-4 contributors)"}:i<=9?{hex:"#e67e22",name:"Squad (5-9 contributors)"}:{hex:"#e74c3c",name:"Many (10+ contributors)"}}function Cm(i){if(!i)return{hex:"#666666",name:"Unknown age"};const e=Date.now(),t=new Date(i).getTime(),n=(e-t)/(1e3*60*60*24),s=n/30,r=n/365;return s<3?{hex:"#00d9ff",name:"New (<3 months)"}:r<1?{hex:"#3498db",name:"Recent (3-12 months)"}:r<3?{hex:"#9b59b6",name:"Mature (1-3 years)"}:r<5?{hex:"#795548",name:"Old (3-5 years)"}:{hex:"#34495e",name:"Legacy (5+ years)"}}function Rm(i){return i===null||i===0?{hex:"#666666",name:"No recent activity"}:i<=50?{hex:"#3498db",name:"Low (1-50 lines)"}:i<=200?{hex:"#2ecc71",name:"Moderate (51-200 lines)"}:i<=500?{hex:"#f1c40f",name:"High (201-500 lines)"}:i<=1e3?{hex:"#e67e22",name:"Very high (501-1000 lines)"}:{hex:"#e74c3c",name:"Extremely high (1000+ lines)"}}function Lm(i){return i===null?{hex:"#666666",name:"Unknown"}:i<10?{hex:"#3498db",name:"Very stable (<10 lines/commit)"}:i<25?{hex:"#2ecc71",name:"Stable (10-24 lines/commit)"}:i<50?{hex:"#f1c40f",name:"Moderate (25-49 lines/commit)"}:i<100?{hex:"#e67e22",name:"Volatile (50-99 lines/commit)"}:{hex:"#e74c3c",name:"Very volatile (100+ lines/commit)"}}function Pm(i){return i===null?{hex:"#666666",name:"Unknown"}:i<7?{hex:"#e74c3c",name:"Hot (<7 days)"}:i<30?{hex:"#e67e22",name:"Warm (1-4 weeks)"}:i<90?{hex:"#f1c40f",name:"Recent (1-3 months)"}:i<180?{hex:"#3498db",name:"Cool (3-6 months)"}:{hex:"#95a5a6",name:"Cold (6+ months)"}}function Dm(i){if(Mn.length>0){for(const t of Mn)if(i>=t.minLoc&&i<=t.maxLoc)return{hex:t.hex,name:t.label};const e=Mn[Mn.length-1];return{hex:e.hex,name:e.label}}return i<100?{hex:"#3498db",name:"Small (<100 LOC)"}:i<300?{hex:"#2ecc71",name:"Medium (100-300 LOC)"}:i<600?{hex:"#f1c40f",name:"Large (300-600 LOC)"}:i<1e3?{hex:"#e67e22",name:"Very large (600-1000 LOC)"}:{hex:"#e74c3c",name:"Huge (1000+ LOC)"}}function dn(i,e){switch(e){case"fileType":return $a(i.extension);case"lastModified":return Im(i.lastModified);case"author":return Tm(i.lastAuthor);case"churn":return Am(i.commitCount);case"contributors":return wm(i.contributorCount);case"fileAge":return Cm(i.firstCommitDate);case"recentActivity":return Rm(i.recentLinesChanged);case"stability":return Lm(i.avgLinesPerCommit);case"recency":return Pm(i.daysSinceLastModified);case"cluster":{const t=yt.getClusterForFile(i.path);if(t===null)return{hex:"#888888",name:"Unclustered"};const n=yt.getClusters(),s=n.find(a=>a.id===t);return{hex:`#${Il(t,n.length).toString(16).padStart(6,"0")}`,name:s?`${s.name} (${s.fileCount} files)`:`Cluster ${t}`}}case"linesOfCode":return Dm(i.loc);default:return $a(i.extension)}}function Im(i){if(!i)return{hex:"#666666",name:"Unknown"};const e=new Date(i);if(Zt.length>0){for(const r of Zt)if(e>=r.minDate&&e<=r.maxDate)return{hex:r.hex,name:r.label};const s=Zt[Zt.length-1];return{hex:s.hex,name:s.label}}const n=(new Date().getTime()-e.getTime())/(1e3*60*60*24);return n<7?{hex:"#00ff88",name:"Last week"}:n<30?{hex:"#ccff00",name:"1 week - 1 month"}:n<90?{hex:"#ffaa00",name:"1-3 months"}:n<180?{hex:"#ff8800",name:"3-6 months"}:n<365?{hex:"#ff5500",name:"6 months - 1 year"}:n<730?{hex:"#cc3333",name:"1-2 years"}:{hex:"#666666",name:"Older than 2 years"}}function Um(){return Zt.length>0}function Nm(i){switch(i){case"lastModified":return Zt.length>0?Zt.map(e=>({hex:e.hex,name:e.label})):[{hex:"#00ff88",name:"Last week"},{hex:"#ccff00",name:"1 week - 1 month"},{hex:"#ffaa00",name:"1-3 months"},{hex:"#ff8800",name:"3-6 months"},{hex:"#ff5500",name:"6 months - 1 year"},{hex:"#cc3333",name:"1-2 years"},{hex:"#666666",name:"Older than 2 years"}];case"author":return[];case"churn":return[{hex:"#c0392b",name:"Extremely high (50+ commits)"},{hex:"#e74c3c",name:"Very high (21-50 commits)"},{hex:"#e67e22",name:"High (11-20 commits)"},{hex:"#f1c40f",name:"Medium (6-10 commits)"},{hex:"#2ecc71",name:"Low-medium (3-5 commits)"},{hex:"#3498db",name:"Low churn (1-2 commits)"}];case"contributors":return[{hex:"#e74c3c",name:"Many (10+ contributors)"},{hex:"#e67e22",name:"Squad (5-9 contributors)"},{hex:"#f1c40f",name:"Team (3-4 contributors)"},{hex:"#2ecc71",name:"Pair (2 contributors)"},{hex:"#3498db",name:"Solo (1 contributor)"}];case"fileAge":return[{hex:"#00d9ff",name:"New (<3 months)"},{hex:"#3498db",name:"Recent (3-12 months)"},{hex:"#9b59b6",name:"Mature (1-3 years)"},{hex:"#795548",name:"Old (3-5 years)"},{hex:"#34495e",name:"Legacy (5+ years)"}];case"recentActivity":return[{hex:"#e74c3c",name:"Extremely high (1000+ lines)"},{hex:"#e67e22",name:"Very high (501-1000 lines)"},{hex:"#f1c40f",name:"High (201-500 lines)"},{hex:"#2ecc71",name:"Moderate (51-200 lines)"},{hex:"#3498db",name:"Low (1-50 lines)"}];case"stability":return[{hex:"#e74c3c",name:"Very volatile (100+ lines/commit)"},{hex:"#e67e22",name:"Volatile (50-99 lines/commit)"},{hex:"#f1c40f",name:"Moderate (25-49 lines/commit)"},{hex:"#2ecc71",name:"Stable (10-24 lines/commit)"},{hex:"#3498db",name:"Very stable (<10 lines/commit)"}];case"recency":return[{hex:"#e74c3c",name:"Hot (<7 days)"},{hex:"#e67e22",name:"Warm (1-4 weeks)"},{hex:"#f1c40f",name:"Recent (1-3 months)"},{hex:"#3498db",name:"Cool (3-6 months)"},{hex:"#95a5a6",name:"Cold (6+ months)"}];case"fileType":return[];case"cluster":{const e=yt.getClusters();return e.length===0?[{hex:"#888888",name:"No coupling data"}]:e.map(t=>({hex:`#${Il(t.id,e.length).toString(16).padStart(6,"0")}`,name:`${t.name} (${t.fileCount} files)`}))}case"linesOfCode":return Mn.length>0?Mn.map(e=>({hex:e.hex,name:e.label})):[{hex:"#e74c3c",name:"Huge (1000+ LOC)"},{hex:"#e67e22",name:"Very large (600-1000 LOC)"},{hex:"#f1c40f",name:"Large (300-600 LOC)"},{hex:"#2ecc71",name:"Medium (100-300 LOC)"},{hex:"#3498db",name:"Small (<100 LOC)"}];default:return[]}}function Fm(i){switch(i){case"fileType":return"File Type";case"lastModified":return"Last Modified";case"author":return"Author";case"churn":return"Churn (Lifetime Commits)";case"contributors":return"Contributors (Lifetime)";case"fileAge":return"File Age";case"recentActivity":return"Recent Activity (90 days)";case"stability":return"Code Stability";case"recency":return"Recency";case"cluster":return"Coupling Clusters";case"linesOfCode":return"Lines of Code";default:return"Unknown"}}class Om{constructor(){this.activeCategories=new Set,this.currentMode="fileType"}setActiveCategories(e,t){this.activeCategories=new Set(e),this.currentMode=t}clearFilters(){this.activeCategories.clear()}hasActiveFilters(){return this.activeCategories.size>0}getActiveCategories(){return Array.from(this.activeCategories)}matchesFilter(e,t){if(this.activeCategories.size===0)return!0;const n=dn(e,t);return this.activeCategories.has(n.name)}getFilteredFilePaths(e,t){const n=new Set,s=r=>{if(r.type==="file")this.matchesFilter(r,t)&&n.add(r.path);else for(const a of r.children)s(a)};return s(e),n}hasVisibleDescendants(e,t){if(this.activeCategories.size===0)return!0;const n=s=>{if(s.type==="file")return this.matchesFilter(s,t);for(const r of s.children)if(n(r))return!0;return!1};for(const s of e.children)if(n(s))return!0;return!1}}function Bm(i,e){const t=[],n=s=>{if(s.type==="file")t.push(s);else for(const r of s.children)n(r)};for(const s of i.children)n(s);if(t.length>0){const s=new Map;for(const o of t){const c=dn(o,e).hex;s.set(c,(s.get(c)||0)+1)}let r=0,a="#888888";for(const[o,l]of s.entries())l>r&&(r=l,a=o);return parseInt(a.replace("#",""),16)}else return 8947848}function zm(i,e,t){const{center:n,size:s}=i,r=Math.max(s.x,s.y,s.z),a=t*(Math.PI/180);let o=Math.abs(r/Math.sin(a/2));o*=1.2;const{position:l}=e;if(l.x===0&&l.z<1&&l.y>0)return{position:{x:n.x,y:n.y+o,z:n.z},target:n,shouldSaveState:!0};{const h=Math.PI/4;return{position:{x:n.x+o*Math.cos(h),y:n.y+o*.5,z:n.z+o*Math.sin(h)},target:n,shouldSaveState:!0}}}function Hm(i,e,t){return t?.8:.5+Math.sqrt(i/e)*2.5}function qa(i,e,t,n){if(t)return .5;const s=n!=="off"?.3:2;return Math.max(.3,i/e*s)}function km(i){return!i}function Ya(i){return!i}function Gm(i){return i?30:60}function Vm(i){return{enableRotate:!i}}function Wm(i){return!i}function Xm(i){return i?0:10}function $m(i){return i?.1:0}class qm{constructor(){this.ghostMeshes=new Set,this.ghostEdges=new Set}findMeshByPath(e,t,n){for(const[s,r]of t.entries())if(r.path===e)return s;for(const[s,r]of n.entries())if(r.path===e)return s;return null}clearGhosts(e,t,n,s){for(const r of this.ghostMeshes)e.remove(r),t.delete(r);for(const r of this.ghostEdges){e.remove(r);const a=n.indexOf(r);a!==-1&&n.splice(a,1),s.delete(r)}this.ghostMeshes.clear(),this.ghostEdges.clear()}calculateGhostPosition(e,t,n){const s=e.position,r=[];for(const u of t.children)if(u.type==="file"){for(const[y,x]of n.entries())if(x.path===u.path&&(r.push(y),r.length===2))break;if(r.length===2)break}if(r.length===0){const y=Math.random()*Math.PI*2;return new P(s.x+10*Math.cos(y),s.y,s.z+10*Math.sin(y))}if(r.length===1){const u=r[0].position.x-s.x,y=r[0].position.z-s.z,x=Math.sqrt(u*u+y*y),w=Math.atan2(y,u)+Math.PI;return new P(s.x+x*Math.cos(w),r[0].position.y,s.z+x*Math.sin(w))}const a=r[0].position.x-s.x,o=r[0].position.z-s.z,l=Math.atan2(o,a),c=Math.sqrt(a*a+o*o),h=r[1].position.x-s.x,d=r[1].position.z-s.z,f=Math.atan2(d,h),m=Math.sqrt(h*h+d*d),g=(l+f)/2,_=(c+m)/2,p=(r[0].position.y+r[1].position.y)/2;return new P(s.x+_*Math.cos(g),p,s.z+_*Math.sin(g))}renderDeletionGhosts(e,t,n,s,r,a,o,l){for(const c of e){const h=this.findFileInPrevTree(t,c);if(!h){console.warn(`Ghost rendering: Could not find deleted file in prev tree: ${c}`);continue}const d=c.substring(0,c.lastIndexOf("/"));let f=null;if(d){if(f=this.findMeshByPath(d,s,r),!f)continue}else{for(const[M,T]of r.entries())if(T.path===""||T.name==="root"){f=M;break}if(!f)continue}const m=r.get(f)||t,g=this.calculateGhostPosition(f,m,s),_=l!=="off"?.3:2,u=Math.max(.3,h.loc/100*_),y=new zi(u,16,16),x=15158332,b=new Ms({color:x,emissive:x,emissiveIntensity:.6,transparent:!0,opacity:1}),w=new Ot(y,b);w.position.copy(g),n.add(w),s.set(w,h),this.ghostMeshes.add(w);const A=new Pt().setFromPoints([f.position,g]),C=new Bi({color:0,opacity:.4,transparent:!0}),U=new Ds(A,C);n.add(U),a.push(U),o.set(U,{parent:r.get(f)||t,child:h}),this.ghostEdges.add(U)}}findFileInPrevTree(e,t){const n=s=>{if(s.type==="file")return s.path===t?s:null;if(s.type==="directory"&&s.children)for(const r of s.children){const a=n(r);if(a)return a}return null};return n(e)}renderDeletedFiles(e,t,n,s,r,a,o,l){l==="v2"&&(!t||e.length===0||this.renderDeletionGhosts(e,t,n,s,r,a,o,l))}}class Ul{calculateRadius(e){return 6+Math.sqrt(e)*2.5}calculateVerticalSpacing(e){return 12*Math.max(.7,1-e*.1)}getCameraDefaults(){return{position:new P(30,30,30),lookAt:new P(0,0,0)}}layoutTree(e,t,n,s,r,a){const o=[],l={node:e,position:t,parent:a};if(o.push(l),e.children.length===0)return o;const c=this.calculateRadius(e.children.length),h=this.calculateVerticalSpacing(n),d=Math.PI*2/e.children.length;return e.children.forEach((f,m)=>{const g=d*m,_=new P(t.x+Math.cos(g)*c,t.y-h,t.z+Math.sin(g)*c);if(f.type==="directory"){const p=this.layoutTree(f,_,n+1,0,Math.PI*2,l);o.push(...p)}else o.push({node:f,position:_,parent:l})}),o}}class Nl{constructor(e){var r;this.layoutNodes=[],this.fileObjects=new Map,this.dirObjects=new Map,this.dirStats=new Map,this.selectedObject=null,this.hoveredObjects=new Set,this.collapsedDirs=new Set,this.focusedDirectory=null,this.labelMode="hover",this.colorMode="fileType",this.highlightedFiles=new Set,this.highlightedFileTypes=new Map,this.deletedFileNodes=new Map,this.timelineMode="off",this.filterManager=new Om,this.viewMode="navigate",this.couplingLoader=null,this.clusterCard=null,this.highlightedClusterFiles=new Set,this.isMouseOverClusterCard=!1,this.ghostRenderer=new qm,this.layoutStrategy=new Ul,this.currentTree=null,this.gridHelper=null,this.lastFrameTime=0,this.edges=[],this.edgeNodeMap=new Map,this.debugControlsUpdate=!1,this.debugFrameCount=0,this.scene=new hm,this.scene.background=new We(1710618),this.scene.fog=new Ii(1710618,50,200),this.camera=new Nt(60,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.set(30,30,30),this.camera.lookAt(0,0,0),this.renderer=new Rl({canvas:e,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.labelRenderer=new xm,this.labelRenderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.pointerEvents="none",(r=e.parentElement)==null||r.appendChild(this.labelRenderer.domElement),this.controls=new _m(this.camera,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.minDistance=5,this.controls.maxDistance=150;const t=new Fa(16777215,.6);this.scene.add(t);const n=new Na(16777215,.8);n.position.set(10,20,10),this.scene.add(n),this.raycaster=new pm,this.mouse=new Re;const s=document.createElement("div");s.className="cluster-details-card",s.addEventListener("mouseenter",()=>{this.isMouseOverClusterCard=!0}),s.addEventListener("mouseleave",()=>{this.isMouseOverClusterCard=!1,this.hideClusterCard()}),this.clusterCard=new ci(s),this.clusterCard.visible=!1,window.addEventListener("resize",this.onWindowResize.bind(this)),e.addEventListener("click",this.onClick.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this))}setOnFileClick(e){this.onFileClick=e}setOnDirClick(e){this.onDirClick=e}setOnHover(e){this.onHover=e}setCouplingLoader(e){console.log("[ClusterCard] setCouplingLoader called",{hasLoader:!!e,isLoaded:e==null?void 0:e.isLoaded()}),this.couplingLoader=e}setLabelMode(e){this.labelMode=e,this.dirObjects.forEach((t,n)=>{const s=n.children.find(r=>r instanceof ci);s&&s.element instanceof HTMLDivElement&&(e==="always"&&n.visible?(s.element.style.visibility="visible",s.element.style.display="block"):(s.element.style.visibility="hidden",s.element.style.display="none"))})}setColorMode(e){this.colorMode=e,this.dirStats.clear(),this.layoutNodes.length>0&&this.rebuildVisualization()}setLayoutStrategy(e){var l,c;console.log("[setLayoutStrategy] ENTER - current camera:",this.camera.position.toArray()),this.layoutStrategy=e;const t=((l=e.needsContinuousUpdate)==null?void 0:l.call(e))??!1,{position:n,lookAt:s}=e.getCameraDefaults();console.log("[setLayoutStrategy] Strategy defaults:",n.toArray(),"lookAt:",s.toArray());const r=Gm(t),a=Vm(t);t?(this.camera.up.set(0,1,0),this.camera.position.copy(n),this.camera.lookAt(s),this.controls.target.copy(s),this.controls.update(),console.log("[setLayoutStrategy] 2D mode - saving state at:",this.camera.position.toArray()),this.controls.saveState(),this.camera.fov=r,this.camera.updateProjectionMatrix(),this.controls.enableRotate=a.enableRotate):(this.camera.position.copy(n),this.camera.lookAt(s),this.controls.target.copy(s),this.controls.update(),console.log("[setLayoutStrategy] 3D mode - saving state at:",this.camera.position.toArray()),this.controls.saveState(),this.camera.fov=r,this.camera.updateProjectionMatrix(),this.controls.enableRotate=a.enableRotate);const o=((c=this.scene.background)==null?void 0:c.getHex())??1710618;Ya(t)?this.scene.fog=new Ii(o,50,200):this.scene.fog=null,this.currentTree&&this.visualize(this.currentTree,!1)}setTheme(e){var s,r;const t=((r=(s=this.layoutStrategy).needsContinuousUpdate)==null?void 0:r.call(s))??!1,n=e==="light"?16119285:1710618;this.scene.background=new We(n),Ya(t)?this.scene.fog=new Ii(n,50,200):this.scene.fog=null}setTimelineMode(e){this.timelineMode=e,e!=="off"&&this.filterManager.clearFilters(),this.layoutNodes.length>0&&this.rebuildVisualization()}setFilter(e){if(this.timelineMode!=="off"){console.warn("Filters are only available in HEAD view, not timeline mode");return}this.filterManager.setActiveCategories(e,this.colorMode),this.updateNodeVisibility()}clearFilter(){this.filterManager.clearFilters(),this.updateNodeVisibility()}hasActiveFilters(){return this.filterManager.hasActiveFilters()}getActiveFilterCategories(){return this.filterManager.getActiveCategories()}setViewMode(e){this.viewMode=e,this.layoutNodes.length>0&&this.updateNodeVisibility()}getViewMode(){return this.viewMode}updateNodeVisibility(){for(const e of this.layoutNodes)if(e.mesh){const t=this.isNodeHidden(e),n=e.mesh.material;if(e.mesh.visible=!t,n.transparent=t,n.opacity=t?0:e.node.type==="directory"?.85:1,n.needsUpdate=!0,e.node.type==="directory"){const s=e.mesh.children.find(r=>r instanceof ci);s&&s.element instanceof HTMLDivElement&&(this.labelMode==="always"&&!t?(s.element.style.visibility="visible",s.element.style.display="block"):(s.element.style.visibility="hidden",s.element.style.display="none"))}}for(const e of this.edges){const t=this.edgeNodeMap.get(e);if(!t)continue;const n=this.layoutNodes.find(o=>o.node===t.parent),s=this.layoutNodes.find(o=>o.node===t.child),r=!n||!s||this.isNodeHidden(n)||this.isNodeHidden(s);e.visible=!r;const a=e.material;a.opacity=r?0:.3,a.needsUpdate=!0}}highlightFiles(e){this.highlightedFiles=new Set(e),this.updateHighlighting()}highlightFilesByType(e,t,n=[],s=[]){this.highlightedFiles=new Set([...e,...t,...n]),this.highlightedFileTypes.clear(),this.deletedFileNodes.clear();for(const r of e)this.highlightedFileTypes.set(r,"added");for(const r of t)this.highlightedFileTypes.set(r,"modified");for(const r of n)this.highlightedFileTypes.set(r,"deleted");for(const r of s)this.deletedFileNodes.set(r.path,r);this.updateHighlighting()}clearHighlight(){this.highlightedFiles.clear(),this.highlightedFileTypes.clear(),this.deletedFileNodes.clear(),this.updateHighlighting()}updateHighlighting(){for(const[e,t]of this.fileObjects.entries()){const n=e;if(!n.material||Array.isArray(n.material))continue;const s=n.material;if(this.highlightedFiles.size===0){const r=this.layoutNodes.find(o=>o.mesh===n),a=r?this.isNodeHidden(r):!1;s.opacity=a?0:1,s.transparent=a,s.emissiveIntensity=.2,n.scale.set(1,1,1),n.visible=!a}else if(this.highlightedFiles.has(t.path)){if(s.opacity=1,s.transparent=!1,s.emissiveIntensity=1.5,this.highlightedFileTypes.get(t.path)==="deleted")s.emissive.setHex(15158332);else{const a=dn(t,this.colorMode);s.emissive.setHex(parseInt(a.hex.replace("#",""),16))}n.scale.set(1.3,1.3,1.3),n.visible=!0}else{if(this.timelineMode==="v2"){const r=this.layoutNodes.find(o=>o.mesh===n),a=r?this.isNodeHidden(r):!1;s.opacity=a?0:1,s.transparent=a,s.emissiveIntensity=.6,n.visible=!a}else s.opacity=.08,s.transparent=!0,s.emissiveIntensity=0,n.visible=!0;n.scale.set(1,1,1)}s.needsUpdate=!0}for(const e of this.edges){const t=this.edgeNodeMap.get(e);if(!t)continue;const n=e.material,s=t.child.type==="file",r=s?t.child.path:"",a=this.layoutNodes.find(c=>c.node===t.parent),o=this.layoutNodes.find(c=>c.node===t.child),l=!a||!o||this.isNodeHidden(a)||this.isNodeHidden(o);if(this.highlightedFiles.size===0)n.color.setHex(11184810),n.opacity=l?0:.3,n.linewidth=1,e.visible=!l;else if(s&&this.highlightedFiles.has(r)){const c=this.highlightedFileTypes.get(r);c==="added"?n.color.setHex(2600544):c==="modified"?n.color.setHex(16776960):c==="deleted"?n.color.setHex(15158332):n.color.setHex(16776960),n.opacity=1,n.linewidth=3,e.visible=!0}else this.deletedFileNodes.has(r)?(n.color.setHex(15158332),n.opacity=1,n.linewidth=3,e.visible=!0):this.timelineMode==="v2"?(n.color.setHex(11184810),n.opacity=l?0:.3,n.linewidth=1,e.visible=!l):(n.opacity=.05,e.visible=!0);n.needsUpdate=!0}}calculateDirectoryStats(e){const t={totalLoc:0,filesByExtension:{},dominantExtension:"no-extension",dominantColor:Pl.numeric},n=r=>{if(r.type==="file"){t.totalLoc+=r.loc;const a=r.extension;t.filesByExtension[a]=(t.filesByExtension[a]||0)+r.loc}else for(const a of r.children)n(a)};for(const r of e.children)n(r);let s=0;for(const[r,a]of Object.entries(t.filesByExtension))a>s&&(s=a,t.dominantExtension=r);return t.dominantColor=Bm(e,this.colorMode),t}findMostRecentFile(e){let t=null,n=null;const s=r=>{if(r.type==="file"){if(r.lastModified){const a=new Date(r.lastModified);(!n||a>n)&&(n=a,t=r)}}else for(const a of r.children)s(a)};for(const r of e.children)s(r);return t}isNodeHidden(e){let t=e.parent;for(;t;){if(t.node.type==="directory"&&this.collapsedDirs.has(t.node))return!0;t=t.parent}if(this.focusedDirectory===null){if(this.timelineMode==="off"&&this.viewMode==="navigate"&&this.getNodeDepth(e)>1)return!0}else if(!this.isInFocusScope(e))return!0;if(this.timelineMode==="off"&&this.filterManager.hasActiveFilters()){if(e.node.type==="file"){if(!this.filterManager.matchesFilter(e.node,this.colorMode)&&!this.highlightedFiles.has(e.node.path))return!0}else if(e.node.type==="directory"&&!this.filterManager.hasVisibleDescendants(e.node,this.colorMode))return!0}return!1}getNodeDepth(e){let t=0,n=e.parent;for(;n;)t++,n=n.parent;return t}isInFocusScope(e){return!!(e.node===this.focusedDirectory||this.isAncestorOfFocused(e)||this.isSiblingOfFocused(e)||this.isSiblingOfAncestor(e)||e.parent&&e.parent.node===this.focusedDirectory)}isAncestorOfFocused(e){if(!this.focusedDirectory)return!1;const t=this.layoutNodes.find(s=>s.node===this.focusedDirectory);if(!t)return!1;let n=t.parent;for(;n;){if(n.node===e.node)return!0;n=n.parent}return!1}isSiblingOfFocused(e){if(!this.focusedDirectory)return!1;const t=this.layoutNodes.find(n=>n.node===this.focusedDirectory);return t?e.parent===t.parent&&e.node!==this.focusedDirectory:!1}isSiblingOfAncestor(e){if(!this.focusedDirectory)return!1;const t=this.layoutNodes.find(s=>s.node===this.focusedDirectory);if(!t)return!1;let n=t.parent;for(;n;){if(e.parent===n.parent&&e.node!==n.node)return!0;n=n.parent}return!1}createVisuals(e,t,n){var l,c,h,d,f,m;for(;this.labelRenderer.domElement.firstChild;)this.labelRenderer.domElement.removeChild(this.labelRenderer.domElement.firstChild);this.scene.clear(),this.fileObjects.clear(),this.dirObjects.clear();const s=new Fa(16777215,.6);this.scene.add(s);const r=new Na(16777215,.8);r.position.set(10,20,10),this.scene.add(r);const a=new Pi;this.edges=[],this.edgeNodeMap.clear();for(const g of e)if(g.node.type==="directory"){const _=g.node;for(const p of _.children){const u=e.find(y=>y.node===p);if(u){const y=new Pt().setFromPoints([g.position,u.position]),x=this.isNodeHidden(g)||this.isNodeHidden(u),b=new Bi({color:11184810,transparent:!0,opacity:x?0:.8,linewidth:3}),w=new Ds(y,b);w.visible=!x,a.add(w),this.edges.push(w),this.edgeNodeMap.set(w,{parent:_,child:p})}}}this.scene.add(a);for(const g of e){const _=this.isNodeHidden(g);if(g.node.type==="file"){const p=g.node,u=((c=(l=this.layoutStrategy).needsContinuousUpdate)==null?void 0:c.call(l))??!1,y=qa(p.loc,t,u,this.timelineMode),x=dn(p,this.colorMode),b=parseInt(x.hex.replace("#",""),16),w=this.timelineMode!=="off"?.6:.2,A=new zi(y,16,16),C=new Ms({color:b,emissive:b,emissiveIntensity:w,transparent:_,opacity:_?0:1}),U=new Ot(A,C);U.position.copy(g.position),U.visible=!_,this.scene.add(U),this.fileObjects.set(U,p),g.mesh=U}else{const p=g.node,u=((d=(h=this.layoutStrategy).needsContinuousUpdate)==null?void 0:d.call(h))??!1;if(u)continue;let y=this.dirStats.get(p);y||(y=this.calculateDirectoryStats(p),this.dirStats.set(p,y));const x=Hm(y.totalLoc,n,u),b=y.dominantColor,w=new Ei(x,x,x),A=new Ms({color:b,emissive:b,emissiveIntensity:.3,transparent:!0,opacity:_?0:.85}),C=new Ot(w,A);C.position.copy(g.position),C.visible=!_,this.scene.add(C),this.dirObjects.set(C,p),g.mesh=C;const M=this.collapsedDirs.has(p)?"+ ":"− ",T=document.createElement("div");T.className="dir-label",T.textContent=M+p.name,T.style.color="#ffffff",T.style.fontSize="12px",T.style.fontFamily="monospace",T.style.padding="2px 6px",T.style.background="rgba(0, 0, 0, 0.6)",T.style.borderRadius="3px",T.style.whiteSpace="nowrap",(this.labelMode==="hover"||_)&&(T.style.visibility="hidden",T.style.display="none");const k=new ci(T);k.position.set(0,x/2+.8,0),C.add(k)}}this.gridHelper||(this.gridHelper=new mm(100,20,4473924,2236962),this.gridHelper.position.y=-20,this.scene.add(this.gridHelper));const o=((m=(f=this.layoutStrategy).needsContinuousUpdate)==null?void 0:m.call(f))??!1;this.gridHelper.visible=km(o)}calculateBoundingBox(e){const t=new Mi;for(const n of e)t.expandByPoint(n.position);return t}autoFrameCamera(e){var d,f;console.log("[autoFrameCamera] ENTER - current camera:",this.camera.position.toArray());const t=new P;e.getCenter(t);const n=new P;e.getSize(n);const s={center:{x:t.x,y:t.y,z:t.z},size:{x:n.x,y:n.y,z:n.z}},r=this.layoutStrategy.getCameraDefaults(),a=zm(s,r,this.camera.fov),o=((f=(d=this.layoutStrategy).needsContinuousUpdate)==null?void 0:f.call(d))??!1,l=this.camera.quaternion.toArray();console.log("[autoFrameCamera] BEFORE changes:"),console.log("  position:",this.camera.position.toArray()),console.log("  up:",this.camera.up.toArray()),console.log("  quaternion:",l),console.log("  target:",this.controls.target.toArray()),console.log("  is2D:",o),o&&(console.log("[autoFrameCamera] Setting overhead orientation for 2D mode"),this.camera.up.set(0,1,0)),this.controls.enableDamping=Wm(o);const c=$m(o);this.camera.position.set(a.position.x,a.position.y,a.position.z+c),this.camera.lookAt(a.target.x,a.target.y,a.target.z),this.controls.target.copy(new P(a.target.x,a.target.y,a.target.z)),console.log("[autoFrameCamera] BEFORE controls.update():"),console.log("  camera.position:",this.camera.position.toArray()),console.log("  camera.quaternion:",this.camera.quaternion.toArray()),console.log("  controls.target:",this.controls.target.toArray()),console.log("  controls object:",this.controls),this.controls.update(),console.log("[autoFrameCamera] AFTER controls.update():"),console.log("  camera.position:",this.camera.position.toArray()),console.log("  camera.quaternion:",this.camera.quaternion.toArray());const h=this.camera.quaternion.toArray();if(console.log("[autoFrameCamera] AFTER changes, BEFORE saveState:"),console.log("  position:",this.camera.position.toArray()),console.log("  up:",this.camera.up.toArray()),console.log("  quaternion:",h),console.log("  target:",this.controls.target.toArray()),console.log("  quaternion changed?",l[0]!==h[0]||l[1]!==h[1]||l[2]!==h[2]||l[3]!==h[3]),a.shouldSaveState){console.log("[autoFrameCamera] Calling saveState()..."),this.controls.saveState(),console.log("[autoFrameCamera] AFTER saveState:"),console.log("  camera.quaternion:",this.camera.quaternion.toArray()),o&&(console.log("[autoFrameCamera] Calling reset() to sync OrbitControls internal state..."),this.controls.reset(),console.log("[autoFrameCamera] AFTER reset:"),console.log("  camera.quaternion:",this.camera.quaternion.toArray()),console.log("  camera.position:",this.camera.position.toArray()),this.debugControlsUpdate=!0,this.debugFrameCount=0,console.log("[autoFrameCamera] Enabled animation loop debugging for next 5 frames"));let m=0;const g=this.camera.quaternion.clone(),_=this.camera.position.clone(),p=()=>{m++;const u=this.camera.quaternion,y=this.camera.position,x=!g.equals(u),b=!_.equals(y);(x||b)&&(console.log(`[FRAME ${m}] CAMERA CHANGED!`),x&&console.log("  Quaternion:",u.toArray()),b&&console.log("  Position:",y.toArray())),m<60?requestAnimationFrame(p):console.log("[MONITOR COMPLETE] Checked 60 frames")};requestAnimationFrame(p)}else console.log("[autoFrameCamera] NOT saving state (shouldSaveState=false)")}visualize(e,t=!0){var l,c;this.currentTree=e,this.ghostRenderer.clearGhosts(this.scene,this.fileObjects,this.edges,this.edgeNodeMap),this.focusedDirectory=null,this.collapsedDirs.clear(),this.selectedObject=null,this.hoveredObjects.clear();const n=this.findMaxLoc(e),s=this.findMaxDirectoryLoc(e),r=((c=(l=this.layoutStrategy).needsContinuousUpdate)==null?void 0:c.call(l))??!1,a=Xm(r),o=new P(0,a,0);if(this.layoutNodes=this.layoutStrategy.layoutTree(e,o,0,0,Math.PI*2),this.createVisuals(this.layoutNodes,n,s),r&&this.updateEdgePositions(),t){const h=this.layoutNodes.filter(f=>!this.isNodeHidden(f)),d=this.calculateBoundingBox(h);this.autoFrameCamera(d)}t&&(this.controls.target.copy(o),r||this.controls.update())}updateTreeIncremental(e,t,n,s){var c,h,d,f;this.currentTree=e;const r=new Map,a=(m,g="")=>{const _=m.type==="file"?m.path:g?`${g}/${m.name}`:m.name;if(r.set(_,m),m.type==="directory")for(const p of m.children)a(p,_)};a(e);const o=this.findMaxLoc(e);this.findMaxDirectoryLoc(e);const l=((h=(c=this.layoutStrategy).needsContinuousUpdate)==null?void 0:h.call(c))??!1;for(const m of s){const g=this.layoutNodes.findIndex(_=>_.node.type==="file"&&_.node.path===m);if(g!==-1){const _=this.layoutNodes[g];_.mesh&&(this.scene.remove(_.mesh),this.fileObjects.delete(_.mesh)),this.layoutStrategy.removeNode&&this.layoutStrategy.removeNode(_),this.layoutNodes.splice(g,1),this.edges=this.edges.filter(p=>{const u=this.edgeNodeMap.get(p);return u&&(u.child===_.node||u.parent===_.node)?(this.scene.remove(p),this.edgeNodeMap.delete(p),!1):!0})}}for(const m of t){const g=r.get(m);if(!g||g.type!=="file")continue;const _=g,p=m.substring(0,m.lastIndexOf("/")),u=this.layoutNodes.find(D=>D.node.type==="directory"&&this.getNodePath(D.node)===p);if(!u)continue;const y={node:_,position:u.position.clone().add(new P((Math.random()-.5)*5,0,(Math.random()-.5)*5)),parent:u,depth:(u.depth??0)+1,mesh:void 0};this.layoutStrategy.addNode&&this.layoutStrategy.addNode(y);const x=((f=(d=this.layoutStrategy).needsContinuousUpdate)==null?void 0:f.call(d))??!1,b=qa(_.loc,o,x,this.timelineMode),w=dn(_,this.colorMode),A=parseInt(w.hex.replace("#",""),16),C=this.timelineMode!=="off"?.6:.2,U=new zi(b,16,16),M=new Ms({color:A,emissive:A,emissiveIntensity:C,transparent:!1,opacity:1}),T=new Ot(U,M);T.position.copy(y.position),this.scene.add(T),this.fileObjects.set(T,_),y.mesh=T,this.layoutNodes.push(y);const k=new Pt().setFromPoints([u.position,y.position]),W=new Bi({color:11184810,transparent:!0,opacity:.8,linewidth:3}),te=new Ds(k,W);this.scene.add(te),this.edges.push(te),this.edgeNodeMap.set(te,{parent:u.node,child:_}),this.layoutStrategy.addEdge&&this.layoutStrategy.addEdge(u,y)}for(const m of n){const g=r.get(m);if(!g||g.type!=="file")continue;const _=g,p=this.layoutNodes.find(u=>u.node.type==="file"&&u.node.path===m);if(p&&p.mesh){p.node=_,this.fileObjects.set(p.mesh,_);const u=dn(_,this.colorMode),y=parseInt(u.hex.replace("#",""),16),x=p.mesh.material;x.color.setHex(y),x.emissive.setHex(y),x.needsUpdate=!0}}l&&this.updateEdgePositions()}getNodePath(e){var s;if(e.type==="file")return e.path;const t=[];let n=e;for(;n;){n.name&&t.unshift(n.name);const r=this.layoutNodes.find(a=>a.node===n);n=(s=r==null?void 0:r.parent)==null?void 0:s.node}return t.join("/")}findMaxLoc(e){if(e.type==="file")return e.loc;let t=0;for(const n of e.children)t=Math.max(t,this.findMaxLoc(n));return t}findMaxDirectoryLoc(e){if(e.type==="file")return 0;let t=this.dirStats.get(e);t||(t=this.calculateDirectoryStats(e),this.dirStats.set(e,t));let n=t.totalLoc;for(const s of e.children)s.type==="directory"&&(n=Math.max(n,this.findMaxDirectoryLoc(s)));return n}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.setSize(window.innerWidth,window.innerHeight)}getRaycastObjects(){var n,s;const e=((s=(n=this.layoutStrategy).needsContinuousUpdate)==null?void 0:s.call(n))??!1,t=e?[]:Array.from(this.dirObjects.keys());return[...Array.from(this.fileObjects.keys()),...t]}onMouseMove(e){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.getRaycastObjects());for(const n of this.hoveredObjects)if(n!==this.selectedObject){const s=n.material,r=this.fileObjects.get(n),a=this.dirObjects.get(n);if(r?s.emissiveIntensity=.2:a&&(s.emissiveIntensity=.3),this.labelMode==="hover"&&a){const o=n.children.find(l=>l instanceof ci);o&&o.element instanceof HTMLDivElement&&(o.element.style.visibility="hidden",o.element.style.display="none")}}if(this.hoveredObjects.clear(),t.length>0){const n=t[0].object,s=this.fileObjects.get(n),r=this.dirObjects.get(n),a=s||r;if(a){const o=this.layoutNodes.find(l=>l.mesh===n);if(o){let l=o;for(;l;){if(l.mesh&&l.mesh!==this.selectedObject){const c=l.mesh.material;if(c.emissiveIntensity=.6,this.hoveredObjects.add(l.mesh),this.labelMode==="hover"){const h=l.mesh.children.find(d=>d instanceof ci);h&&h.element instanceof HTMLDivElement&&(h.element.style.visibility="visible",h.element.style.display="block")}}l=l.parent}r&&this.highlightDescendants(o),s&&this.colorMode==="cluster"?this.showClusterCard(s,n):this.isMouseOverClusterCard||this.hideClusterCard()}this.onHover&&this.onHover(a,e)}}else this.isMouseOverClusterCard||this.hideClusterCard(),this.onHover&&this.onHover(null)}highlightDescendants(e){if(e.node.type==="directory"){const t=e.node;for(const n of t.children){const s=this.layoutNodes.find(r=>r.node===n);if(s&&s.mesh&&s.mesh!==this.selectedObject){const r=s.mesh.material;r.emissiveIntensity=.6,this.hoveredObjects.add(s.mesh),n.type==="directory"&&this.highlightDescendants(s)}}}}onClick(e){this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const t=this.raycaster.intersectObjects(this.getRaycastObjects());if(t.length>0){const n=t[0].object,s=this.fileObjects.get(n),r=this.dirObjects.get(n);if(r){if(this.focusedDirectory===r){const a=this.layoutNodes.find(o=>o.node===r);a&&a.parent&&a.parent.node.type==="directory"?this.focusedDirectory=a.parent.node:this.focusedDirectory=null}else this.focusedDirectory=r;this.rebuildVisualization(),this.onDirClick&&this.onDirClick(r)}else if(s){if(this.selectedObject){const o=this.selectedObject.material,l=this.fileObjects.get(this.selectedObject);o.emissiveIntensity=l?.2:.3}this.selectedObject=n;const a=n.material;a.emissiveIntensity=.8,this.onFileClick&&this.onFileClick(s)}}}rebuildVisualization(){const e=this.findMaxLoc(this.layoutNodes[0].node),t=this.findMaxDirectoryLoc(this.layoutNodes[0].node);this.createVisuals(this.layoutNodes,e,t)}focusCamera(){if(this.focusedDirectory===null){const e=this.calculateBoundingBox(this.layoutNodes.filter(t=>!this.isNodeHidden(t)));this.autoFrameCamera(e)}else if(this.layoutNodes.find(t=>t.node===this.focusedDirectory)){const t=this.layoutNodes.filter(s=>!this.isNodeHidden(s)),n=this.calculateBoundingBox(t);this.autoFrameCamera(n)}}animate(){var t,n;requestAnimationFrame(()=>this.animate());const e=performance.now();if(this.lastFrameTime>0){const s=Math.min((e-this.lastFrameTime)/1e3,.1);this.layoutStrategy.tick&&((n=(t=this.layoutStrategy).needsContinuousUpdate)!=null&&n.call(t))&&(this.layoutStrategy.tick(s),this.updateMeshPositions(),this.updateEdgePositions())}if(this.lastFrameTime=e,this.debugControlsUpdate&&this.debugFrameCount<5){this.debugFrameCount++;const s=this.camera.quaternion.clone(),r=this.camera.position.clone();this.controls.update();const a=this.camera.quaternion,o=this.camera.position;!s.equals(a)||!r.equals(o)?(console.log(`[ANIMATE FRAME ${this.debugFrameCount}] controls.update() CHANGED camera!`),console.log("  BEFORE: quat =",s.toArray(),"pos =",r.toArray()),console.log("  AFTER:  quat =",a.toArray(),"pos =",o.toArray()),console.log("  controls.enableDamping =",this.controls.enableDamping),console.log("  controls.target =",this.controls.target.toArray())):console.log(`[ANIMATE FRAME ${this.debugFrameCount}] controls.update() did NOT change camera`)}else this.controls.update();this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}start(){this.animate()}updateMeshPositions(){for(const e of this.layoutNodes)e.mesh&&e.mesh.position.copy(e.position)}updateEdgePositions(){for(const e of this.edges){const t=this.edgeNodeMap.get(e);if(!t)continue;const n=this.layoutNodes.find(r=>r.node===t.parent),s=this.layoutNodes.find(r=>r.node===t.child);if(n&&s){const r=e.geometry.attributes.position;r.setXYZ(0,n.position.x,n.position.y,n.position.z),r.setXYZ(1,s.position.x,s.position.y,s.position.z),r.needsUpdate=!0}}}showClusterCard(e,t){var c;if(console.log("[ClusterCard] showClusterCard called",{file:e.path,hasLoader:!!this.couplingLoader,isLoaded:(c=this.couplingLoader)==null?void 0:c.isLoaded(),colorMode:this.colorMode,hasCard:!!this.clusterCard}),!this.couplingLoader||!this.couplingLoader.isLoaded()||this.colorMode!=="cluster"||!this.clusterCard){console.log("[ClusterCard] Early return - conditions not met");return}const n=this.couplingLoader.getClusterForFile(e.path);if(console.log("[ClusterCard] Cluster ID:",n),n===null)return;const r=this.couplingLoader.getClusters().find(h=>h.id===n);if(!r)return;const o=this.couplingLoader.getEdges(.1).filter(h=>h.fileA===e.path||h.fileB===e.path);o.sort((h,d)=>d.coupling-h.coupling);let l=`
      <h4>📊 Coupling Cluster</h4>
      <div class="cluster-name">${r.name} (${r.fileCount} files)</div>
    `;if(o.length>0){l+='<div class="file-list">';for(const h of o){const d=h.fileA===e.path?h.fileB:h.fileA,f=d.split("/").pop()||d,m=Math.round(h.coupling*100);l+=`
          <div class="file-item">
            <span class="file-name" title="${d}">${f}</span>
            <span class="coupling-strength">${m}%</span>
          </div>
        `}l+="</div>"}this.clusterCard.element.innerHTML=l,this.clusterCard.position.set(-12,6,0),this.clusterCard.visible=!0,t.add(this.clusterCard),this.labelRenderer.domElement.style.pointerEvents="auto",console.log("[ClusterCard] Card attached to mesh, visible:",this.clusterCard.visible),this.highlightedClusterFiles=new Set(r.files),this.highlightClusterMembers(e,o)}hideClusterCard(){this.clusterCard&&(this.clusterCard.parent&&this.clusterCard.parent.remove(this.clusterCard),this.clusterCard.visible=!1,this.labelRenderer.domElement.style.pointerEvents="none"),this.highlightedClusterFiles.clear(),this.clearClusterHighlighting()}highlightClusterMembers(e,t){for(const[n,s]of this.fileObjects.entries())if(this.highlightedClusterFiles.has(s.path)){const r=n.material;r.emissiveIntensity=s.path===e.path?1.2:.8,n.scale.set(1.2,1.2,1.2)}for(const n of t){const s=n.fileA===e.path?n.fileB:n.fileA;for(const[r,a]of this.fileObjects.entries())if(a.path===s){for(const o of this.edges){const l=this.edgeNodeMap.get(o);if(l&&(l.child.path===e.path||l.child.path===s)){const c=o.material;c.color.setHex(4890367),c.opacity=.8,c.linewidth=2,o.visible=!0}}break}}}clearClusterHighlighting(){for(const[e,t]of this.fileObjects.entries()){const n=e.material;n.emissiveIntensity=this.timelineMode!=="off"?.6:.2,e.scale.set(1,1,1)}for(const e of this.edges){const t=this.edgeNodeMap.get(e);if(!t)continue;const n=this.layoutNodes.find(o=>o.node===t.parent),s=this.layoutNodes.find(o=>o.node===t.child),r=!n||!s||this.isNodeHidden(n)||this.isNodeHidden(s),a=e.material;a.color.setHex(11184810),a.opacity=r?0:.3,a.linewidth=1,e.visible=!r,a.needsUpdate=!0}}renderDeletedFiles(e,t){this.ghostRenderer.renderDeletedFiles(e,t,this.scene,this.fileObjects,this.dirObjects,this.edges,this.edgeNodeMap,this.timelineMode)}}class wr{constructor(){this.tree={path:"",name:"root",type:"directory",children:[]}}applyDelta(e){const t=["m4/acx_pthread.m4","CNAME","css/bootstrap.css","images/gource-git.jpg"],n=e.changes.filesDeleted.filter(s=>t.includes(s));n.length>0&&console.log(`🗑️ Commit ${e.hash.substring(0,7)}: Deleting problem files:`,n);for(const s of e.changes.filesDeleted)this.deleteFile(s);for(const s of e.changes.filesAdded)this.addFile(s,{author:e.author,date:e.date,hash:e.hash});for(const s of e.changes.filesModified)this.modifyFile(s,{author:e.author,date:e.date,hash:e.hash});return this.tree}addFile(e,t){const n=e.split("/");let s=this.tree;for(let l=0;l<n.length-1;l++){const c=n[l],h=n.slice(0,l+1).join("/");let d=s.children.find(f=>f.name===c&&f.type==="directory");d||(d={path:h,name:c,type:"directory",children:[]},s.children.push(d)),s=d}const r=n[n.length-1],a=s.children.findIndex(l=>l.name===r);a!==-1&&s.children.splice(a,1);const o={path:e,name:r,type:"file",loc:100,extension:this.getExtension(r),lastModified:t.date,lastAuthor:t.author,lastCommitHash:t.hash,commitCount:1,contributorCount:1,firstCommitDate:t.date,recentLinesChanged:null,avgLinesPerCommit:null,daysSinceLastModified:null};s.children.push(o)}deleteFile(e){const t=e.split("/"),n=this.findNode(t.slice(0,-1));if(!n||n.type!=="directory"){console.warn(`🔍 DELETE FAILED (no parent): "${e}"`);return}const s=t[t.length-1];if(n.children.findIndex(a=>a.name===s)===-1){console.warn(`🔍 DELETE FAILED (file not found): "${e}"`);return}n.children=n.children.filter(a=>a.name!==s),this.pruneEmptyDirectories(t.slice(0,-1))}modifyFile(e,t){const n=this.findFile(e);n&&(n.lastAuthor=t.author,n.lastModified=t.date,n.lastCommitHash=t.hash,n.commitCount=(n.commitCount||0)+1)}pruneEmptyDirectories(e){for(let t=e.length-1;t>=0;t--){const n=this.findNode(e.slice(0,t+1));if(!n||n.type!=="directory")break;if(n.children.length===0){const s=this.findNode(e.slice(0,t));if(s&&s.type==="directory")s.children=s.children.filter(r=>r.name!==n.name);else break}else break}}findNode(e){if(e.length===0)return this.tree;let t=this.tree;for(const n of e){if(t.type!=="directory")return null;const s=t.children.find(r=>r.name===n);if(!s)return null;t=s}return t}findFile(e){const t=e.split("/"),n=this.findNode(t);return n&&n.type==="file"?n:null}getExtension(e){const t=e.lastIndexOf(".");return t===-1||t===0?"no-extension":e.substring(t+1)}clone(){return JSON.parse(JSON.stringify(this.tree))}getTree(){return this.tree}setTree(e){this.tree=e}exportPaths(){const e=[],t=n=>{n.type==="file"?e.push(n.path):n.children.forEach(t)};return t(this.tree),e.sort()}getStats(){let e=0,t=0,n=0;const s=(r,a)=>{r.type==="file"?(e++,n=Math.max(n,a)):(t++,r.children.forEach(o=>s(o,a+1)))};return s(this.tree,0),{totalFiles:e,totalDirs:t,depth:n}}}class Ym{constructor(e){this.maxSize=e,this.cache=new Map,this.accessOrder=[]}get(e){const t=this.cache.get(e);return t!==void 0&&this.updateAccessOrder(e),t}set(e,t){if(this.cache.has(e)){this.cache.set(e,t),this.updateAccessOrder(e);return}if(this.cache.size>=this.maxSize){const n=this.accessOrder.shift();n!==void 0&&this.cache.delete(n)}this.cache.set(e,t),this.accessOrder.push(e)}has(e){return this.cache.has(e)}size(){return this.cache.size}clear(){this.cache.clear(),this.accessOrder=[]}updateAccessOrder(e){const t=this.accessOrder.indexOf(e);t!==-1&&this.accessOrder.splice(t,1),this.accessOrder.push(e)}}const jm=2e3,ja=500,Km=200;class Zm{constructor(e){this.baseKeyframes=new Map,this.currentIndex=0,this.isPlaying=!1,this.playbackSpeed=50,this.listeners=new Map,this.playbackInterval=null,this.useSparseMode=!1,this.lastGeneratedIndex=-1,this.lastGeneratedTree=null,this.incrementalBuilder=null,this.data=e,this.treeBuilder=new wr,this.dynamicCache=new Ym(Km),this.useSparseMode=e.commits.length>jm;const t=["m4/acx_pthread.m4","CNAME","css/bootstrap.css","images/gource-git.jpg"];let n=0;for(let s=0;s<e.commits.length;s++){const r=e.commits[s].changes.filesDeleted.filter(a=>t.includes(a));r.length>0&&(console.log(`🔍 Timeline data commit ${s} (${e.commits[s].hash.substring(0,7)}): filesDeleted includes:`,r),n++)}console.log(`📋 Total commits with problem file deletions: ${n}`)}async generateKeyframes(e){const t=Date.now();this.useSparseMode?await this.generateSparseKeyframes(e):await this.generateFullKeyframes(e);const n=Date.now()-t,s=this.treeBuilder.getStats();console.log(`✅ Generated ${this.baseKeyframes.size} base keyframes in ${n}ms`),console.log(`📊 Final tree: ${s.totalFiles} files, ${s.totalDirs} directories, depth ${s.depth}`)}async generateFullKeyframes(e){console.log(`🔨 Full keyframe mode: Generating keyframe for all ${this.data.commits.length} commits`);for(let t=0;t<this.data.commits.length;t++){if(this.treeBuilder.applyDelta(this.data.commits[t]),this.baseKeyframes.set(t,this.treeBuilder.clone()),t%100===0||t===this.data.commits.length-1){const n=this.treeBuilder.getStats();console.log(`📊 Commit ${t+1}: ${n.totalFiles} files, ${n.totalDirs} dirs`)}e&&(t%100===0||t===this.data.commits.length-1)&&e(t+1,this.data.commits.length)}}async generateSparseKeyframes(e){console.log(`🔨 Sparse keyframe mode: Generating strategic keyframes for ${this.data.commits.length} commits`),console.log(`   Interval: Every ${ja} commits + all version tags`);const t=new Set;t.add(0),t.add(this.data.commits.length-1);for(let r=0;r<this.data.commits.length;r+=ja)t.add(r);for(let r=0;r<this.data.commits.length;r++)this.data.commits[r].tags.length>0&&t.add(r);const n=Array.from(t).sort((r,a)=>r-a);console.log(`   Total strategic keyframes: ${n.length}`);let s=-1;for(const r of n){for(let a=s+1;a<=r;a++)this.treeBuilder.applyDelta(this.data.commits[a]);if(this.baseKeyframes.set(r,this.treeBuilder.clone()),s=r,e){const a=n.indexOf(r)+1;e(a,n.length)}}}getIncrementalThreshold(){return Math.max(50,this.playbackSpeed*5)}getTreeAtCommit(e){if(e<0||e>=this.data.commits.length)return null;if(this.baseKeyframes.has(e)){const s=this.baseKeyframes.get(e);return this.updateIncrementalState(e,s),s}if(this.dynamicCache.has(e))return this.dynamicCache.get(e);const t=e-this.lastGeneratedIndex,n=this.getIncrementalThreshold();return t>0&&t<=n&&this.lastGeneratedTree?this.generateIncrementally(e):this.generateFromBaseKeyframe(e)}generateIncrementally(e){this.incrementalBuilder||(this.incrementalBuilder=new wr,this.incrementalBuilder.setTree(JSON.parse(JSON.stringify(this.lastGeneratedTree))));for(let n=this.lastGeneratedIndex+1;n<=e;n++)this.incrementalBuilder.applyDelta(this.data.commits[n]);const t=this.incrementalBuilder.clone();return this.lastGeneratedIndex=e,this.lastGeneratedTree=t,this.dynamicCache.set(e,t),t}generateFromBaseKeyframe(e){let t=-1,n=null;for(let a=e;a>=0;a--)if(this.baseKeyframes.has(a)){t=a,n=this.baseKeyframes.get(a);break}if(t===-1||!n)return console.error(`No base keyframe found before index ${e}`),null;if(t===e)return n;const s=new wr;s.setTree(JSON.parse(JSON.stringify(n)));for(let a=t+1;a<=e;a++)s.applyDelta(this.data.commits[a]);const r=s.clone();return this.lastGeneratedIndex=e,this.lastGeneratedTree=r,this.incrementalBuilder=null,this.dynamicCache.set(e,r),r}updateIncrementalState(e,t){this.lastGeneratedIndex=e,this.lastGeneratedTree=t,this.incrementalBuilder=null}getCommitAtIndex(e){return e>=0&&e<this.data.commits.length?this.data.commits[e]:null}getCurrentIndex(){return this.currentIndex}getTotalCommits(){return this.data.commits.length}getKeyframeMode(){return this.useSparseMode?"sparse":"full"}getKeyframeStats(){return{mode:this.getKeyframeMode(),baseKeyframes:this.baseKeyframes.size,dynamicCacheSize:this.dynamicCache.size(),totalCommits:this.data.commits.length}}play(){this.isPlaying||(this.isPlaying=!0,this.emit("playStateChanged",{isPlaying:!0}),this.playLoop())}pause(){this.isPlaying=!1,this.emit("playStateChanged",{isPlaying:!1}),this.playbackInterval!==null&&(clearTimeout(this.playbackInterval),this.playbackInterval=null)}togglePlay(){this.isPlaying?this.pause():this.play()}playLoop(){if(this.isPlaying)if(this.currentIndex<this.data.commits.length-1){this.currentIndex++,this.emitCommitEvent();const e=1e3/this.playbackSpeed;this.playbackInterval=window.setTimeout(()=>this.playLoop(),e)}else this.pause(),this.emit("playbackEnded",{})}stepForward(){this.currentIndex<this.data.commits.length-1&&(this.currentIndex++,this.emitCommitEvent())}stepBackward(){this.currentIndex>0&&(this.currentIndex--,this.emitCommitEvent())}goToStart(){this.currentIndex=0,this.emitCommitEvent()}goToEnd(){this.currentIndex=this.data.commits.length-1,this.emitCommitEvent()}seekToCommit(e){e>=0&&e<this.data.commits.length&&(Math.abs(e-this.currentIndex)>this.getIncrementalThreshold()&&(this.incrementalBuilder=null),this.currentIndex=e,this.emitCommitEvent())}seekToTag(e){for(let t=0;t<this.data.commits.length;t++)if(this.data.commits[t].tags.includes(e))return this.seekToCommit(t),!0;return!1}setSpeed(e){this.playbackSpeed=e,this.emit("speedChanged",{speed:e})}getSpeed(){return this.playbackSpeed}getIsPlaying(){return this.isPlaying}getMetadata(){return this.data.metadata}emitCommitEvent(){const e=this.getTreeAtCommit(this.currentIndex),t=this.data.commits[this.currentIndex];e&&t&&this.emit("commit",{index:this.currentIndex,commit:t,tree:e})}validateFinalTree(e){const t=this.getTreeAtCommit(this.data.commits.length-1);if(!t)return{isValid:!1,builtFiles:0,headFiles:0,missing:[],extra:[]};const n=this.extractPaths(t).sort(),s=this.extractPaths(e.tree).sort(),r=s.filter(l=>!n.includes(l)),a=n.filter(l=>!s.includes(l)),o=r.length===0&&a.length===0;return console.log(`
=== VALIDATION RESULTS ===`),console.log(`Built tree: ${n.length} files`),console.log(`HEAD tree: ${s.length} files`),console.log(`Result: ${o?"✅ PASS":"❌ FAIL"}`),o||(r.length>0&&(console.warn(`Missing ${r.length} files (in HEAD but not in built tree):`),console.warn(r.slice(0,10))),a.length>0&&(console.warn(`Extra ${a.length} files (in built tree but not in HEAD):`),console.warn(a.slice(0,10)))),{isValid:o,builtFiles:n.length,headFiles:s.length,missing:r,extra:a}}extractPaths(e){const t=[],n=s=>{s.type==="file"?t.push(s.path):s.type==="directory"&&s.children&&s.children.forEach(n)};return n(e),t}on(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t)}off(e,t){const n=this.listeners.get(e);if(n){const s=n.indexOf(t);s!==-1&&n.splice(s,1)}}emit(e,t){(this.listeners.get(e)||[]).forEach(s=>{try{s(t)}catch(r){console.error(`Error in event listener for '${e}':`,r)}})}destroy(){this.pause(),this.listeners.clear(),this.baseKeyframes.clear(),this.dynamicCache.clear()}}function Jm(i){const e={totalLoc:0,filesByExt:{}},t=n=>{if(n.type==="file"){e.totalLoc+=n.loc;const s=n.extension;e.filesByExt[s]=(e.filesByExt[s]||0)+1}else for(const s of n.children)t(s)};for(const n of i.children)t(n);return e}function Kr(i,e=0){if(i.type==="file")return e;let t=e;for(const n of i.children)t=Math.max(t,Kr(n,e+1));return t}function Zr(i){if(i.type==="file")return 0;let e=1;for(const t of i.children)e+=Zr(t);return e}function Qm(i){const e=[],t=n=>{if(n.type==="file")n.lastModified&&e.push(n.lastModified);else for(const s of n.children)t(s)};for(const n of i.children)t(n);return e}function eg(i){const e=[],t=n=>{if(n.type==="file")e.push(n.loc);else for(const s of n.children)t(s)};for(const n of i.children)t(n);return e}function tg(i){const e=new Map,t=n=>{if(n.type==="file"){if(n.lastCommitHash){const s=e.get(n.lastCommitHash)||[];s.push(n),e.set(n.lastCommitHash,s)}}else for(const s of n.children)t(s)};for(const n of i.children)t(n);return e}function Jr(i){const e=new Map,t=n=>{if(n.type==="file")e.set(n.path,n);else for(const s of n.children)t(s)};for(const n of i.children)t(n);return e}function Gs(i){return i.replace(/-timeline(-full)?$/,"")}function ng(i){const{file:e,githubFileUrl:t,commitInfo:n,clusterInfo:s}=i,r=e.lastModified?new Date(e.lastModified).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"Unknown",a=e.lastAuthor||"Unknown",o=e.lastCommitHash?e.lastCommitHash.substring(0,7):"Unknown",l=e.firstCommitDate?(()=>{const h=Date.now(),d=new Date(e.firstCommitDate).getTime(),f=(h-d)/(1e3*60*60*24),m=f/365;if(m>=5)return`${Math.floor(m)} years (Legacy)`;if(m>=3)return`${Math.floor(m)} years (Old)`;if(m>=1)return`${Math.floor(m)} year${Math.floor(m)>1?"s":""} (Mature)`;const g=f/30;return g>=3?`${Math.floor(g)} months (Recent)`:`${Math.floor(f)} days (New)`})():"Unknown";let c=`
    <div class="info-row">
      <span class="label">Type</span>
      <span class="value">File</span>
    </div>
    <div class="info-row">
      <span class="label">Path</span>
      <span class="value">${e.path}</span>
    </div>
    ${t?`<div class="info-row">
      <span class="label">View on GitHub</span>
      <span class="value"><a href="${t}" target="_blank" style="color: #4a9eff; text-decoration: none;">🔗 Open file</a></span>
    </div>`:""}
    <div class="info-row">
      <span class="label">Lines of Code</span>
      <span class="value">${e.loc.toLocaleString()}</span>
    </div>
    <div class="info-row">
      <span class="label">Extension</span>
      <span class="value">.${e.extension}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Modified</span>
      <span class="value">${r}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Author</span>
      <span class="value">${a}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Commit</span>
      <span class="value">${o}</span>
    </div>
    <div class="info-row">
      <span class="label">Churn (Lifetime)</span>
      <span class="value">${e.commitCount!==null?`${e.commitCount} commit${e.commitCount!==1?"s":""}`:"Unknown"}</span>
    </div>
    <div class="info-row">
      <span class="label">Contributors (Lifetime)</span>
      <span class="value">${e.contributorCount!==null?e.contributorCount:"Unknown"}</span>
    </div>
    <div class="info-row">
      <span class="label">File Age</span>
      <span class="value">${l}</span>
    </div>
    <div class="info-row">
      <span class="label">Recent Activity (90 days)</span>
      <span class="value">${e.recentLinesChanged!==null?`${e.recentLinesChanged} lines changed`:"Unknown"}</span>
    </div>
    <div class="info-row">
      <span class="label">Avg Change Size (Lifetime)</span>
      <span class="value">${e.avgLinesPerCommit!==null?`${e.avgLinesPerCommit} lines/commit`:"Unknown"}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Touched</span>
      <span class="value">${e.daysSinceLastModified!==null?`${e.daysSinceLastModified} days ago`:"Unknown"}</span>
    </div>
  `;if(n&&(n.message||n.siblings.length>0)){if(c+=`
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        `,n.message&&(c+=`
            <div style="margin-bottom: 12px;">
              <div style="font-size: 11px; color: #888; margin-bottom: 4px;">
                Commit: <span style="color: #4a9eff; font-family: monospace;">${n.commitHashStr}</span>
              </div>
              <div style="font-size: 12px; color: #ddd; font-style: italic; line-height: 1.4;">
                "${n.message}"
              </div>
            </div>
          `),n.siblings.length>0){c+=`
            <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
              Commit Siblings (${n.siblings.length} file${n.siblings.length!==1?"s":""})
            </div>
            <div style="font-size: 11px;">
          `;for(const h of n.siblings)c+=`
              <div style="padding: 4px 0; color: #ccc; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                ${h.path}
              </div>
            `;c+=`
            </div>
          `}c+=`
          </div>
        `}if(s){const{cluster:h,topEdges:d}=s;if(c+=`
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
                📊 Coupling Cluster
              </div>
              <div style="font-size: 11px; color: #ccc; margin-bottom: 12px; padding-left: 12px;">
                ${h.name} (${h.fileCount} files)
              </div>
          `,d.length>0){c+=`
              <div style="font-size: 12px; font-weight: 600; color: #4a9eff; margin-bottom: 8px;">
                🔗 Most Frequently Changes With
              </div>
              <div style="font-size: 11px;">
            `;for(const f of d){const m=f.fileA===e.path?f.fileB:f.fileA,g=m.split("/").pop()||m,_=Math.round(f.coupling*100);c+=`
                <div style="padding: 4px 0; color: #ccc; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #ddd;">${g}</span>
                    <span style="color: #888; font-size: 10px;">${f.coChangeCount} co-changes</span>
                  </div>
                  <div style="font-size: 10px; color: #888; margin-top: 2px;">
                    ${_}% coupling strength
                  </div>
                </div>
              `}c+=`
              </div>
            `}c+=`
            </div>
          `}return c}function ig(i){const{dir:e,stats:t,lastModified:n,githubDirUrl:s}=i;return`
    <div class="info-row">
      <span class="label">Type</span>
      <span class="value">Directory</span>
    </div>
    <div class="info-row">
      <span class="label">Path</span>
      <span class="value">${e.path||"(root)"}</span>
    </div>
    ${s?`<div class="info-row">
      <span class="label">View on GitHub</span>
      <span class="value"><a href="${s}" target="_blank" style="color: #4a9eff; text-decoration: none;">🔗 Open folder</a></span>
    </div>`:""}
    <div class="info-row">
      <span class="label">Total LOC</span>
      <span class="value">${t.totalLoc.toLocaleString()}</span>
    </div>
    <div class="info-row">
      <span class="label">Files</span>
      <span class="value">${t.fileCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Subdirectories</span>
      <span class="value">${t.dirCount}</span>
    </div>
    <div class="info-row">
      <span class="label">Dominant Type</span>
      <span class="value">${t.dominantName}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Modified</span>
      <span class="value">${n.date}</span>
    </div>
    <div class="info-row">
      <span class="label">Last Author</span>
      <span class="value">${n.author}</span>
    </div>
  `}function sg(i){return`
    <div class="legend-cube" style="background: ${i.hex};"></div>
    <span class="legend-label">${i.name}</span>
  `}function rg(i){return`
      <input type="checkbox" class="legend-checkbox" data-category="${i.name}" checked>
      <div class="legend-color" style="background: ${i.hex};"></div>
      <span class="legend-label">${i.name} (${i.count})</span>
    `}function og(i){return`
      <input type="checkbox" class="legend-checkbox" data-category="Other" checked>
      <div class="legend-color" style="background: #aaa;"></div>
      <span class="legend-label">Other (${i})</span>
    `}function ag(i,e){return`
        <input type="checkbox" class="legend-checkbox" data-category="${i.name}" checked>
        <div class="legend-color" style="background: ${i.hex};"></div>
        <span class="legend-label">${i.name} <span style="color: #888;">(${i.count} ${e}, ${i.percentage}%)</span></span>
      `}function lg(i){return`
        <input type="checkbox" class="legend-checkbox" data-category="${i.name}" checked>
        <div class="legend-color" style="background: ${i.hex};"></div>
        <span class="legend-label">${i.name}</span>
      `}function cg(i,e,t,n,s){return`
        <input type="checkbox" class="legend-checkbox" data-category="${i}" checked>
        <div class="legend-color" style="background: ${e};"></div>
        <span class="legend-label">${i} <span style="color: #888;">(${t} ${s}, ${n}%)</span></span>
      `}function hg(i,e){return`
        <span class="legend-label" style="color: #888; font-style: italic;">...and ${i} more (${e}% coverage shown)</span>
      `}function fi(i,e,t="label"){const n=document.createElement(t);if(n.className="legend-item",n.innerHTML=i,t==="label"){const s=n.querySelector(".legend-checkbox");s&&s.addEventListener("change",e)}return n}function dg(i,e,t){return e==="timeline"&&t?{files:[`${i}-timeline-full`,`${i}-timeline`,i],fallbackToHead:!1}:{files:[i],fallbackToHead:e==="timeline"}}function ug(i){return i&&typeof i=="object"&&"format"in i&&i.format==="timeline-v2"?"timeline-v2":i&&typeof i=="object"&&"format"in i&&i.format==="timeline-v1"?"timeline-v1":"static"}function fg(i,e){switch(e){case"timeline-v2":return null;case"timeline-v1":return i.headSnapshot;case"static":return i}}class pg{constructor(e,t,n,s=null){this.children=[],this.isInitialized=!1,this.layoutNode=e,this.directoryNode=e.node,this.radius=t,this.parentRadius=n,this.parent=s,this.position=e.position.clone(),this.velocity=new P(0,0,0),this.acceleration=new P(0,0,0),this.prevAcceleration=new P(0,0,0)}getBounds(){return{minX:this.position.x-this.radius,minZ:this.position.z-this.radius,maxX:this.position.x+this.radius,maxZ:this.position.z+this.radius}}overlaps(e){const t=e.position.x-this.position.x,n=e.position.z-this.position.z,s=t*t+n*n,r=this.radius+e.radius;return s<r*r}distanceToParent(){if(!this.parent)return 0;const e=this.parent.position.x-this.position.x,t=this.parent.position.z-this.position.z;return Math.sqrt(e*e+t*t)-this.radius-this.parent.parentRadius}isAncestor(e){return e===this.parent?!0:this.parent?this.parent.isAncestor(e):!1}directionTo(e){const t=e.position.x-this.position.x,n=e.position.z-this.position.z,s=Math.sqrt(t*t+n*n);return s<1e-5?new Re(Math.random()-.5,Math.random()-.5).normalize():new Re(t/s,n/s)}applyForce(e,t){this.acceleration.x+=e,this.acceleration.z+=t}resetAcceleration(){this.acceleration.set(0,0,0)}integrate(e){if(!this.parent){this.position.set(0,0,0);return}this.position.x+=this.acceleration.x*e,this.position.z+=this.acceleration.z*e,this.position.y=0,this.layoutNode.position.copy(this.position)}}class Nn{constructor(e,t=4){this.items=[],this.divided=!1,this.bounds=e,this.capacity=t}insert(e){return this.contains(e)?this.items.length<this.capacity&&!this.divided?(this.items.push(e),!0):(this.divided||this.subdivide(),!!(this.northeast.insert(e)||this.northwest.insert(e)||this.southeast.insert(e)||this.southwest.insert(e))):!1}query(e,t=[]){if(!this.intersects(e))return t;for(const n of this.items){const s=n.getBounds();this.boundsIntersect(e,s)&&t.push(n)}return this.divided&&(this.northeast.query(e,t),this.northwest.query(e,t),this.southeast.query(e,t),this.southwest.query(e,t)),t}contains(e){const t=e.getBounds();return t.minX>=this.bounds.minX&&t.maxX<=this.bounds.maxX&&t.minZ>=this.bounds.minZ&&t.maxZ<=this.bounds.maxZ}intersects(e){return this.boundsIntersect(this.bounds,e)}boundsIntersect(e,t){return!(e.maxX<t.minX||e.minX>t.maxX||e.maxZ<t.minZ||e.minZ>t.maxZ)}subdivide(){const e=this.bounds.minX,t=this.bounds.minZ,n=(this.bounds.maxX-this.bounds.minX)/2,s=(this.bounds.maxZ-this.bounds.minZ)/2;this.northeast=new Nn({minX:e+n,minZ:t,maxX:e+n*2,maxZ:t+s},this.capacity),this.northwest=new Nn({minX:e,minZ:t,maxX:e+n,maxZ:t+s},this.capacity),this.southeast=new Nn({minX:e+n,minZ:t+s,maxX:e+n*2,maxZ:t+s*2},this.capacity),this.southwest=new Nn({minX:e,minZ:t+s,maxX:e+n,maxZ:t+s*2},this.capacity),this.divided=!0}}class mg{constructor(e){this.bounds=e||{minX:-500,minZ:-500,maxX:500,maxZ:500},this.root=new Nn(this.bounds)}insert(e){this.root.insert(e)}query(e){return this.root.query(e)}queryNearPoint(e,t,n){const s={minX:e-n,minZ:t-n,maxX:e+n,maxZ:t+n};return this.query(s)}clear(){this.root=new Nn(this.bounds)}}class gg{constructor(e){this.physicsNodes=new Map,this.fileLayoutNodes=[],this.fileOrbitInfo=[],this.spatialIndex=new mg,this.config={gravity:10,collisionPadding:.5,fileDiameter:1.5,spiralBaseSpacing:.5,spiralRadialMultiplier:.7,repulsionStrength:1,...e}}calculateArea(e){const t=this.config.fileDiameter*this.config.fileDiameter*Math.PI,n=e.children.filter(a=>a.type==="file").length;let r=t*n;for(const a of e.children)a.type==="directory"&&(r+=this.calculateArea(a));return r}calculateRadiusFromArea(e){const t=this.calculateArea(e);return Math.max(1,Math.sqrt(t))*.23}calculateRadius(e){return 10}getCameraDefaults(){return{position:new P(0,150,.1),lookAt:new P(0,0,0)}}layoutTree(e,t,n,s,r,a){this.physicsNodes.clear(),this.fileLayoutNodes=[];const o=this.createPhysicsNodes(e,t,null);this.setInitialPositions(o),this.createFileNodes();const l=[];return this.physicsNodes.forEach(c=>{l.push(c.layoutNode)}),l.push(...this.fileLayoutNodes),l}createPhysicsNodes(e,t,n){const s=this.calculateRadiusFromArea(e),r=e.children.filter(f=>f.type==="file").length,o=this.config.fileDiameter*this.config.fileDiameter*Math.PI*r,l=Math.max(1,Math.sqrt(o))*.23,c={node:e,position:t.clone(),parent:n==null?void 0:n.layoutNode},h=new pg(c,s,l,n);this.physicsNodes.set(e,h),n&&n.children.push(h);const d=e.children.filter(f=>f.type==="directory");for(const f of d){const m=t.clone();this.createPhysicsNodes(f,m,h)}return h}setInitialPositions(e){e.position.set(0,0,0),e.isInitialized=!0;const t=[e];for(;t.length>0;){const n=t.shift();this.positionChildrenInSpiral(n);for(const s of n.children)t.push(s)}}positionChildrenInSpiral(e){const t=Math.PI*(3-Math.sqrt(5));for(let n=0;n<e.children.length;n++){const s=e.children[n];if(s.isInitialized)continue;const r=n*t,a=this.calculateSpiralDistance(e,s,n),o=Math.cos(r)*a,l=Math.sin(r)*a;s.position.set(e.position.x+o,0,e.position.z+l),s.isInitialized=!0}}calculateSpiralDistance(e,t,n){const s=e.radius+t.radius+this.config.spiralBaseSpacing,r=n*t.radius*this.config.spiralRadialMultiplier;return s+r}hashString(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t=t&t;return Math.abs(t)}createFileNodes(){this.fileOrbitInfo=[],this.fileLayoutNodes=[],this.physicsNodes.forEach(e=>{const n=e.directoryNode.children.filter(c=>c.type==="file");if(n.length===0)return;let s=1,r=1,a=0,o=0,l=n.length;for(;l>0;){const c=Math.min(l,s),h=Math.PI*2/c,d=(r-1)*.5;for(let f=0;f<c&&o<n.length;f++){const m=n[o],g=h*f+d,_=new Re(Math.cos(g)*a,Math.sin(g)*a),p={node:m,position:new P(0,0,0),parent:e.layoutNode};this.fileOrbitInfo.push({layoutNode:p,relativeOffset:_,parentPhysicsNode:e}),this.fileLayoutNodes.push(p),o++}l-=c,r++,a+=this.config.fileDiameter,s=Math.max(1,Math.floor(r*Math.PI))}}),this.updateFilePositions()}tick(e){e=Math.min(e,.1),this.spatialIndex.clear(),this.physicsNodes.forEach(t=>{t.parent&&this.spatialIndex.insert(t)}),this.physicsNodes.forEach(t=>{t.parent&&this.applyForces(t)}),this.physicsNodes.forEach(t=>{t.integrate(e)}),this.updateFilePositions()}applyForces(e){e.resetAcceleration();const t=this.spatialIndex.queryNearPoint(e.position.x,e.position.z,e.radius*2);for(const n of t){const s=n;s!==e&&s!==e.parent&&s.parent!==e&&(e.isAncestor(s)||s.isAncestor(e)||e.overlaps(s)&&this.applyRepulsion(e,s))}this.applyParentGravity(e),e.parent&&e.parent.parent&&this.applyGrandparentAlignment(e),this.applySiblingSpacing(e)}applyRepulsion(e,t){const n=t.position.x-e.position.x,s=t.position.z-e.position.z,r=Math.sqrt(n*n+s*s);if(r<1e-5)return;const a=r-e.radius-t.radius;if(a>=0)return;const o=-a*this.config.repulsionStrength,l=-n/r,c=-s/r;e.applyForce(o*l,o*c)}applyParentGravity(e){if(!e.parent)return;const t=e.distanceToParent(),n=e.parent.position.x-e.position.x,s=e.parent.position.z-e.position.z,r=Math.sqrt(n*n+s*s);if(r<1e-5)return;const a=this.config.gravity*t*(n/r),o=this.config.gravity*t*(s/r);e.applyForce(a,o)}applyGrandparentAlignment(e){const t=e.parent,n=t.parent,s=t.position.x-n.position.x,r=t.position.z-n.position.z,a=Math.sqrt(s*s+r*r);if(a<1e-5)return;const o=s/a,l=r/a,c=t.position.x+(t.radius+e.radius)*o,h=t.position.z+(t.radius+e.radius)*l,d=c-e.position.x,f=h-e.position.z;e.applyForce(d,f)}applySiblingSpacing(e){const t=e.parent.children.filter(o=>o!==e);if(t.length===0)return;let n=0,s=0,r=1;for(const o of t){r++;const l=e.directionTo(o);n-=l.x,s-=l.y}const a=e.parent.radius*Math.PI/(r+1);n*=a,s*=a,e.applyForce(n,s)}updateFilePositions(){for(const e of this.fileOrbitInfo){const t=e.parentPhysicsNode;e.layoutNode.position.x=t.position.x+e.relativeOffset.x,e.layoutNode.position.y=0,e.layoutNode.position.z=t.position.z+e.relativeOffset.y}}needsContinuousUpdate(){return!0}addNode(e){if(e.node.type!=="file"||!e.parent)return;const t=e.parent.node,n=this.physicsNodes.get(t);if(!n)return;const s=this.fileOrbitInfo.filter(f=>f.parentPhysicsNode===n);let r=1,a=1,o=0,l=0;for(;l+r<=s.length;)l+=r,a++,o+=this.config.fileDiameter,r=Math.max(1,Math.floor(a*Math.PI));const c=s.length-l,h=Math.PI*2/r*c+(a-1)*.5,d=new Re(Math.cos(h)*o,Math.sin(h)*o);e.position.x=n.position.x+d.x,e.position.y=0,e.position.z=n.position.z+d.y,this.fileOrbitInfo.push({layoutNode:e,relativeOffset:d,parentPhysicsNode:n}),this.fileLayoutNodes.push(e)}addEdge(e,t){}removeNode(e){if(e.node.type!=="file")return;const t=this.fileOrbitInfo.findIndex(s=>s.layoutNode===e);t!==-1&&this.fileOrbitInfo.splice(t,1);const n=this.fileLayoutNodes.indexOf(e);n!==-1&&this.fileLayoutNodes.splice(n,1)}}function Fl(i){return i==="forceDirected"?new gg:new Ul}function Ol(i,e){return{theme:i,labelMode:e.labelMode,colorMode:e.colorMode,viewMode:e.viewMode,layoutStrategy:Fl(e.layoutMode)}}function Bl(i,e,t,n){i.setTheme(e.theme),i.setCouplingLoader(t),i.setOnFileClick(n.onFileClick),i.setOnDirClick(n.onDirClick),i.setOnHover(n.onHover),e.labelMode&&i.setLabelMode(e.labelMode),e.colorMode&&i.setColorMode(e.colorMode),e.viewMode&&(console.log("🔧 Initializing view mode from localStorage:",e.viewMode),i.setViewMode(e.viewMode)),console.log("🔧 Initializing layout strategy"),i.setLayoutStrategy(e.layoutStrategy)}async function _g(){try{const i=await fetch("./data/repos.json");if(i.ok){const t=(await i.json()).repos||[],n=new Set;for(const s of t){const r=s.replace(/-timeline(-full)?$/,"");n.add(r)}return Array.from(n).sort()}}catch{console.warn("Could not load repos list, using default")}return["gource"]}async function xg(i){try{if((await fetch(`./data/${i}-timeline-full.json`,{method:"HEAD"})).ok)return!0}catch{}try{return(await fetch(`./data/${i}-timeline.json`,{method:"HEAD"})).ok}catch{return!1}}async function Ss(i="gource"){const e=await fetch(`./data/${i}.json`);if(!e.ok)throw new Error(`Failed to load data: ${e.statusText}`);return e.json()}function zl(i){let e=0;function t(n){n.type==="file"?n.isGenerated&&e++:n.children.forEach(s=>t(s))}return t(i),e}function vg(i){function e(n){if(n.type==="file")return n.isGenerated?null:n;{const s=n.children.map(r=>e(r)).filter(r=>r!==null);return s.length===0?null:{...n,children:s}}}return e(i)}function Is(i,e=!1){var h;console.log("🔍 showFileDetails called:",{fileName:i.name,filePath:i.path,handleCommitHighlighting:e,highlightCommitEnabled:Gt,lastCommitHash:i.lastCommitHash,commitIndexSize:Ns.size});const t=document.getElementById("info-panel"),n=document.getElementById("selected-name"),s=document.getElementById("info-content");if(!t||!n||!s)return;n.textContent=i.name;const r=Gs(ki),a=Tg(r,i.path);let o=null;if(e&&Gt&&i.lastCommitHash)if(console.log("✅ Commit highlighting conditions met"),Jt===i.lastCommitHash)console.log("🔄 Toggling OFF - same commit clicked again"),he&&he.clearHighlight(),Jt=null;else{const d=Ns.get(i.lastCommitHash)||[],f=d.filter(_=>_.path!==i.path);console.log("📝 Commit siblings found:",{totalSiblings:d.length,otherFiles:f.length,commitHash:i.lastCommitHash});const m=(h=Ze==null?void 0:Ze.commitMessages)==null?void 0:h[i.lastCommitHash],g=i.lastCommitHash.substring(0,7);if((m||f.length>0)&&(o={commitHashStr:g,message:m||"",siblings:f}),he){const _=d.map(p=>p.path);he.highlightFiles(_)}Jt=i.lastCommitHash}else console.log("❌ Commit highlighting skipped:",{handleCommitHighlighting:e,highlightCommitEnabled:Gt,hasCommitHash:!!i.lastCommitHash}),he&&he.clearHighlight(),Jt=null;let l=null;if(yt.isLoaded()&&localStorage.getItem("colorMode")==="cluster"){const f=yt.getClusterForFile(i.path);if(f!==null){const g=yt.getClusters().find(_=>_.id===f);if(g){const p=yt.getEdges(.1).filter(y=>y.fileA===i.path||y.fileB===i.path);p.sort((y,x)=>x.coupling-y.coupling);const u=p.slice(0,5);l={cluster:g,topEdges:u}}}}const c=ng({file:i,githubFileUrl:a,commitInfo:o,clusterInfo:l});s.innerHTML=c,t.classList.add("visible"),e&&n&&(n.style.transition="background-color 0.3s",n.style.backgroundColor="rgba(74, 158, 255, 0.3)",setTimeout(()=>{n.style.backgroundColor=""},300))}function Us(i){var y;const e=document.getElementById("info-panel"),t=document.getElementById("selected-name"),n=document.getElementById("info-content");if(!e||!t||!n)return;t.textContent=i.name;const s=i.children.filter(x=>x.type==="file").length,r=i.children.filter(x=>x.type==="directory").length,a=Jm(i);let o="none",l=0;for(const[x,b]of Object.entries(a.filesByExt))b>l&&(l=b,o=x);const c=((y=zn[o])==null?void 0:y.name)||o;let h=null,d=null;const f=x=>{if(x.type==="file"&&x.lastModified)(!h||new Date(x.lastModified)>new Date(h))&&(h=x.lastModified,d=x.lastAuthor);else if(x.type==="directory")for(const b of x.children)f(b)};for(const x of i.children)f(x);const m=h?new Date(h).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"Unknown",g=d||"Unknown",_=Gs(ki),p=Ag(_,i.path),u=ig({dir:i,stats:{totalLoc:a.totalLoc,fileCount:s,dirCount:r,dominantExt:o,dominantName:c},lastModified:{date:m,author:g},githubDirUrl:p});n.innerHTML=u,e.classList.add("visible")}function yg(i){if(!he||!Ze)return{files:0,loc:0};const e=localStorage.getItem("colorMode")||"fileType";let t=0,n=0;const s=r=>{if(r.type==="file")if(he.hasActiveFilters()){const a=he.getActiveFilterCategories(),o=dn(r,e);a.includes(o.name)&&(t++,n+=r.loc)}else t++,n+=r.loc;else for(const a of r.children)s(a)};return s(i),{files:t,loc:n}}function Hl(i){Qr(i)}function Qr(i){const e=(he==null?void 0:he.hasActiveFilters())||!1;let t=i.stats.totalFiles,n=i.stats.totalLoc;if(e){const d=yg(i.tree);t=d.files,n=d.loc}const s=document.getElementById("stat-files");s&&(e&&t<i.stats.totalFiles?(s.textContent=`${t.toLocaleString()} / ${i.stats.totalFiles.toLocaleString()}`,s.title=`Showing ${t} of ${i.stats.totalFiles} files (filtered)`):(s.textContent=i.stats.totalFiles.toLocaleString(),s.title=""));const r=document.getElementById("stat-loc");r&&(e&&n<i.stats.totalLoc?(r.textContent=`${n.toLocaleString()} / ${i.stats.totalLoc.toLocaleString()}`,r.title=`Showing ${n} of ${i.stats.totalLoc} LOC (filtered)`):(r.textContent=i.stats.totalLoc.toLocaleString(),r.title="")),document.getElementById("stat-dirs").textContent=(Zr(i.tree)-1).toString(),document.getElementById("stat-depth").textContent=Kr(i.tree).toString();const a={},o=d=>{if(d.type==="file"){const f=d.extension,m=zn[f];a[f]||(a[f]={loc:0,name:(m==null?void 0:m.name)||f,color:(m==null?void 0:m.hex)||"#888"}),a[f].loc+=d.loc}else for(const f of d.children)o(f)};o(i.tree);const l=Object.values(a).sort((d,f)=>f.loc-d.loc).slice(0,5),c=i.stats.totalLoc,h=document.getElementById("lang-breakdown");h.innerHTML='<div style="margin-top: 10px; font-size: 10px; color: #888;">Top Languages:</div>';for(const d of l){const f=d.loc/c*100,m=document.createElement("div");m.className="stat-bar",m.innerHTML=`
      <div class="stat-bar-label">${d.name}</div>
      <div class="stat-bar-fill">
        <div class="stat-bar-fill-inner" style="width: ${f}%; background: ${d.color};">
          <span class="stat-bar-text">${f.toFixed(1)}%</span>
        </div>
      </div>
    `,h.appendChild(m)}}function Mg(i){const e=zl(i.tree);if(!document.querySelector('label[for="hide-generated-checkbox"]')){const s=document.getElementById("hide-generated-checkbox");if(s&&s.nextSibling){const r=s.nextSibling;r.nodeType===Node.TEXT_NODE&&(e>0?r.textContent=` Hide generated files (${e} found)`:r.textContent=" Hide generated files")}}const n=document.getElementById("hide-generated-checkbox");n&&(n.disabled=e===0,e===0&&(n.checked=!1))}function kl(){if(!Ze||!he)return;const i=document.getElementById("hide-generated-checkbox"),e=i&&i.checked,t=zl(Ze.tree);if(e&&t>0){console.log(`Hiding ${t} generated files`);const n=vg(Ze.tree);he.visualize(n),Sg(n)}else console.log(`Showing all files (${t} generated files present)`),he.visualize(Ze.tree),Hl(Ze)}function Sg(i){let e=0,t=0;function n(a){a.type==="file"?(e++,t+=a.loc):a.children.forEach(o=>n(o))}n(i);const s=document.getElementById("stat-files"),r=document.getElementById("stat-loc");s&&(s.textContent=e.toLocaleString()),r&&(r.textContent=t.toLocaleString())}function Gl(i,e,t){let n=0,s=0;const r={},a=h=>{if(h.type==="file"){n++,s+=h.loc;const d=h.extension,f=zn[d];r[d]||(r[d]={loc:0,name:(f==null?void 0:f.name)||d,color:(f==null?void 0:f.hex)||"#888"}),r[d].loc+=h.loc}else for(const d of h.children)a(d)};a(i),document.getElementById("stat-files").textContent=n.toLocaleString(),document.getElementById("stat-loc").textContent=s.toLocaleString(),document.getElementById("stat-dirs").textContent=(Zr(i)-1).toString(),document.getElementById("stat-depth").textContent=Kr(i).toString();const o=document.querySelector("#stats-panel h3");o&&e!==void 0&&t!==void 0&&(o.textContent=`Repository Stats (Commit ${e+1} of ${t})`);const l=Object.values(r).sort((h,d)=>d.loc-h.loc).slice(0,5),c=document.getElementById("lang-breakdown");c.innerHTML='<div style="margin-top: 10px; font-size: 10px; color: #888;">Top Languages:</div>';for(const h of l){const d=h.loc/s*100,f=document.createElement("div");f.className="stat-bar",f.innerHTML=`
      <div class="stat-bar-label">${h.name}</div>
      <div class="stat-bar-fill">
        <div class="stat-bar-fill-inner" style="width: ${d}%; background: ${h.color};">
          <span class="stat-bar-text">${d.toFixed(1)}%</span>
        </div>
      </div>
    `,c.appendChild(f)}}function Vl(i){const e=document.getElementById("legend-content"),t=document.getElementById("legend-title");if(!e)return;t&&(t.textContent="File Type"),e.innerHTML="";const n=Object.keys(i.stats.filesByExtension),s=n.filter(o=>zn[o]).sort((o,l)=>i.stats.filesByExtension[l]-i.stats.filesByExtension[o]),r=document.createElement("div");r.className="legend-item",r.innerHTML=sg(Pl),e.appendChild(r);for(const o of s){const l=zn[o],c=i.stats.filesByExtension[o],h=rg({name:l.name,hex:l.hex,count:c}),d=fi(h,Qt,"label");e.appendChild(d)}const a=n.filter(o=>!zn[o]).reduce((o,l)=>o+i.stats.filesByExtension[l],0);if(a>0){const o=og(a),l=fi(o,Qt,"label");e.appendChild(l)}bs(),Ni()}function Eg(){const i=document.getElementById("loading");i&&i.classList.add("hidden")}let he=null,Ze=null,ut=null,ge=null,Ns=new Map,Gt=!0,Jt=null,jt=null,Kt=null,ki="",gs=!1,Bt=0,Es=!1,_s=null,Wl=1;const bg={gource:{owner:"acaudwell",repo:"Gource",url:"https://github.com/acaudwell/Gource"},cbioportal:{owner:"cBioPortal",repo:"cbioportal",url:"https://github.com/cBioPortal/cbioportal"},"cbioportal-frontend":{owner:"cBioPortal",repo:"cbioportal-frontend",url:"https://github.com/cBioPortal/cbioportal-frontend"},react:{owner:"facebook",repo:"react",url:"https://github.com/facebook/react"},codecohesion:{owner:"paulrayner",repo:"codecohesion",url:"https://github.com/paulrayner/codecohesion"}};function Vs(i){return bg[i]||null}function Tg(i,e){const t=Vs(i);return t?`${t.url}/blob/HEAD/${e}`:null}function Ag(i,e){const t=Vs(i);return t?!e||e===""?`${t.url}/tree/HEAD`:`${t.url}/tree/HEAD/${e}`:null}function wg(i){const e=document.getElementById("repo-github-link"),t=Vs(i);if(e&&t){e.href=t.url;const n=e.querySelector("span");n&&(n.textContent=`${t.owner}/${t.repo}`),e.style.display="inline-flex",e.target="_blank"}else e&&(e.style.display="none")}let Hn=new Map;const kr=["fileType","lastModified","author"];let qt=null;const Ui=new Map;function Xl(){var r,a;const i=document.getElementById("highlight-commit-toggle"),e=i==null?void 0:i.previousElementSibling;i&&(i.style.display="none"),e&&((r=e.textContent)!=null&&r.includes("Highlight Commit"))&&(e.style.display="none");const t=document.getElementById("view-mode-toggle"),n=t==null?void 0:t.previousElementSibling;t&&(t.style.display="none"),n&&((a=n.textContent)!=null&&a.includes("View"))&&(n.style.display="none"),Og();const s=document.getElementById("color-mode-selector");if(s){qt=s.value;const o=[];Array.from(s.options).forEach(l=>{const c=l.value;Ui.has(c)||Ui.set(c,l.outerHTML),kr.includes(c)||o.push(l)}),o.forEach(l=>l.remove()),kr.includes(qt)||(s.value="fileType",localStorage.setItem("colorMode","fileType"),he&&he.setColorMode("fileType"),console.log(`Switched from incompatible mode '${qt}' to 'fileType'`))}}function Cg(){const i=document.getElementById("highlight-commit-toggle"),e=i==null?void 0:i.previousElementSibling;i&&(i.style.display=""),e&&(e.style.display="");const t=document.getElementById("view-mode-toggle"),n=t==null?void 0:t.previousElementSibling;t&&(t.style.display=""),n&&(n.style.display=""),ql();const s=document.getElementById("color-mode-selector");if(s&&Ui.size>0){const r=["fileType","lastModified","author","churn","contributors","fileAge","recentActivity","stability","recency"],a=s.value;s.innerHTML="";for(const o of r)if(Ui.has(o)){const l=document.createElement("div");l.innerHTML=Ui.get(o)||"";const c=l.firstChild;c&&s.appendChild(c)}qt&&!kr.includes(qt)?(s.value=qt,localStorage.setItem("colorMode",qt),he&&he.setColorMode(qt),console.log(`Restored color mode to '${qt}'`)):s.value=a,qt=null}}async function Rg(i,e){var n;const t=document.getElementById("loading");try{console.log(`
=== LOADING TIMELINE V2 ===`),console.log(`Repository: ${i.repositoryPath}`),console.log(`Total commits: ${i.metadata.totalCommits}`),console.log(`Date range: ${i.metadata.dateRange.first.substring(0,10)} to ${i.metadata.dateRange.last.substring(0,10)}`),console.log(`Tags: ${i.metadata.tags.length}`),ge=new Zm(i),ut=null;const s=ge.getKeyframeMode();t&&(t.innerHTML=`
        <div class="spinner"></div>
        <p>${s==="full"?"Generating full keyframes...":"Generating strategic keyframes..."}</p>
        <p id="progress-text">0 / ${i.metadata.totalCommits}</p>
      `),await ge.generateKeyframes((d,f)=>{const m=document.getElementById("progress-text");m&&(m.textContent=`${d} / ${f}`)});const r=ge.getKeyframeStats();console.log(`📊 Keyframe strategy: ${r.mode}`),console.log(`   Base keyframes: ${r.baseKeyframes}`),console.log(`   Total commits: ${r.totalCommits}`);const a=e.replace("-timeline-full","");try{console.log(`
📋 Loading HEAD snapshot for validation: ${a}`);const d=await Ss(a);if("tree"in d){const f=ge.validateFinalTree(d);f.isValid||(console.error(`
❌ VALIDATION FAILED!`),console.error("Missing files:",f.missing.slice(0,10)),console.error("Extra files:",f.extra.slice(0,10)))}}catch(d){console.warn("Could not load HEAD snapshot for validation:",d)}const o=ge.getTreeAtCommit(0);if(!o)throw new Error("Failed to generate first keyframe");Ze={repositoryPath:i.repositoryPath,commit:i.commits[0].hash,timestamp:i.commits[0].date,author:i.commits[0].author,message:i.commits[0].message,tree:o,commitMessages:{},stats:{totalFiles:0,totalLoc:0,filesByExtension:{}}},Hn=Jr(o);const c=document.getElementById("canvas");if(!c)throw new Error("Canvas element not found");if(he)he.setCouplingLoader(yt.isLoaded()?yt:null);else{he=new Nl(c);const d=document.documentElement.getAttribute("data-theme")||"dark",f={labelMode:localStorage.getItem("labelMode"),colorMode:localStorage.getItem("colorMode"),viewMode:localStorage.getItem("viewMode"),layoutMode:localStorage.getItem("layoutMode")},m=Ol(d,f);Bl(he,m,yt.isLoaded()?yt:null,{onFileClick:g=>{const _=Jt===g.lastCommitHash;jt=g,Kt=null,Is(g,!0),_&&Jt===null&&(jt=null,Kt=null)},onDirClick:g=>{Kt=g,jt=null,Us(g)},onHover:(g,_)=>{if(!g){if(!jt&&!Kt){const p=document.getElementById("info-panel");p&&p.classList.remove("visible")}return}!jt&&!Kt&&(g.type==="file"?localStorage.getItem("colorMode")!=="cluster"&&Is(g,!1):Us(g))}}),he.start()}if(he.visualize(o),he.setTimelineMode("v2"),Lg(),ge){const d=ge.getCommitAtIndex(0);if(d){const f=document.getElementById("commit-info");if(f){const g=new Date(d.date).toLocaleDateString(),_=d.changes.filesAdded.length,p=d.changes.filesModified.length,u=((n=d.changes.filesDeleted)==null?void 0:n.length)||0,y=[];_>0&&y.push(`<span style="color: #27ae60">+${_}</span>`),p>0&&y.push(`<span style="color: #ffff00">~${p}</span>`),u>0&&y.push(`<span style="color: #e74c3c">-${u}</span>`);const x=y.length>0?` • Files: ${y.join(" ")}`:"",b=d.changes.linesAdded||0,w=d.changes.linesDeleted||0,A=[];b>0&&A.push(`<span style="color: #27ae60">+${b}</span>`),w>0&&A.push(`<span style="color: #e74c3c">-${w}</span>`);const C=A.length>0?` • LOC: ${A.join(" ")}`:"",U=_-u;let M="";U>0&&U!==_?M=` • <span style="color: #27ae60">+${U} ${U===1?"file":"files"}</span>`:U<0&&(M=` • <span style="color: #e74c3c">${U} ${Math.abs(U)===1?"file":"files"}</span>`);const T=d.isMergeCommit?' <span style="color: #888; font-size: 0.9em;">[MERGE]</span>':"",k=d.tags.length>0?` 🏷️ ${d.tags.join(", ")}`:"";f.innerHTML=`${d.hash.substring(0,7)} • ${g} • ${d.author}${T}${x}${C}${M}${k}`}eo(d,0);const m=ge.getTotalCommits();Gl(o,0,m)}}const h=document.getElementById("timeline-controls");h&&(h.style.display="flex"),$l(),Xl(),console.log(`
✅ Timeline V2 loaded successfully!
`)}catch(s){console.error("Error loading Timeline V2:",s),t&&(t.innerHTML=`<p style="color: red;">Error loading timeline: ${s}</p>`)}finally{t&&setTimeout(()=>t.classList.add("hidden"),500)}}function Lg(){if(!ge)return;console.log("Setting up Timeline V2 controls..."),ge.on("commit",({index:o,commit:l,tree:c})=>{var u;const h=performance.now(),d={},f=o>0?ge==null?void 0:ge.getTreeAtCommit(o-1):null;if(he&&c){const y=performance.now();he.updateTreeIncremental(c,l.changes.filesAdded,l.changes.filesModified,l.changes.filesDeleted||[]),d.visualize=performance.now()-y;const x=performance.now();if(Hn=Jr(c),d.pathIndex=performance.now()-x,l.changes.filesDeleted.length>0&&f){const A=performance.now();he.renderDeletedFiles(l.changes.filesDeleted,f),d.ghosts=performance.now()-A}const b=performance.now(),w=(ge==null?void 0:ge.getTotalCommits())||0;Gl(c,o,w),d.stats=performance.now()-b}const m=document.getElementById("commit-info");if(m){const y=new Date(l.date).toLocaleDateString(),x=l.changes.filesAdded.length,b=l.changes.filesModified.length,w=((u=l.changes.filesDeleted)==null?void 0:u.length)||0,A=[];x>0&&A.push(`<span style="color: #27ae60">+${x}</span>`),b>0&&A.push(`<span style="color: #ffff00">~${b}</span>`),w>0&&A.push(`<span style="color: #e74c3c">-${w}</span>`);const C=A.length>0?` • Files: ${A.join(" ")}`:"",U=l.changes.linesAdded||0,M=l.changes.linesDeleted||0,T=[];U>0&&T.push(`<span style="color: #27ae60">+${U}</span>`),M>0&&T.push(`<span style="color: #e74c3c">-${M}</span>`);const k=T.length>0?` • LOC: ${T.join(" ")}`:"",W=x-w;let te="";W>0&&W!==x?te=` • <span style="color: #27ae60">+${W} ${W===1?"file":"files"}</span>`:W<0&&(te=` • <span style="color: #e74c3c">${W} ${Math.abs(W)===1?"file":"files"}</span>`);const D=l.isMergeCommit?' <span style="color: #888; font-size: 0.9em;">[MERGE]</span>':"",z=l.tags.length>0?` 🏷️ ${l.tags.join(", ")}`:"";m.innerHTML=`${l.hash.substring(0,7)} • ${y} • ${l.author}${D}${C}${k}${te}${z}`}const g=performance.now();eo(l),d.highlight=performance.now()-g;const _=performance.now();Ka(o),d.ui=performance.now()-_;const p=performance.now()-h;if(p>100){d.total=p;const y=Object.entries(d).map(([x,b])=>`${x}=${b.toFixed(1)}ms`).join(", ");console.warn(`⚠️ Slow commit ${o+1}: ${y}`)}});const i=document.getElementById("play-pause-btn");i&&(i.onclick=()=>{ge==null||ge.togglePlay()}),ge.on("playStateChanged",({isPlaying:o})=>{i&&(i.textContent=o?"⏸ Pause":"▶ Play")});const e=document.getElementById("step-back-btn"),t=document.getElementById("step-forward-btn");e&&(e.onclick=()=>ge==null?void 0:ge.stepBackward()),t&&(t.onclick=()=>ge==null?void 0:ge.stepForward());const n=document.getElementById("go-to-start-btn");n&&(n.onclick=()=>ge==null?void 0:ge.goToStart());const s=document.getElementById("speed-selector");s&&(s.onchange=()=>{const o=parseInt(s.value);ge==null||ge.setSpeed(o)});const r=document.getElementById("commit-slider");r&&(r.oninput=()=>{const o=parseInt(r.value);ge==null||ge.seekToCommit(o)});const a=document.getElementById("timeline-scrubber");if(a){let o=!1;const l=c=>{if(!ge)return;const h=a.getBoundingClientRect(),f=Math.max(0,Math.min(c-h.left,h.width))/h.width,m=ge.getTotalCommits(),g=Math.floor(f*(m-1));ge.seekToCommit(g)};a.addEventListener("mousedown",c=>{o=!0,l(c.clientX)}),document.addEventListener("mousemove",c=>{o&&l(c.clientX)}),document.addEventListener("mouseup",()=>{o=!1})}Ka(0)}function Ka(i){if(!ge)return;const e=document.getElementById("timeline-commit-index"),t=document.getElementById("timeline-commit-total"),n=document.getElementById("timeline-progress");if(e&&(e.textContent=(i+1).toString()),t&&(t.textContent=ge.getTotalCommits().toString()),n){const s=ge.getTotalCommits(),r=(i+1)/s*100;n.style.width=`${r}%`}Dg(i)}function $l(){const i=document.getElementById("tag-selector-container");if(ge){const t=ge.getMetadata().tags;if(t.length===0){console.log("No tags found in repository"),i&&(i.style.display="none");return}i&&(i.style.display="inline"),console.log(`Setting up tag navigation: ${t.length} tags found`);const n=document.getElementById("tag-selector");if(n){n.innerHTML='<option value="">-- Select tag --</option>';for(let s=t.length-1;s>=0;s--){const r=document.createElement("option");r.value=t[s],r.textContent=t[s],n.appendChild(r)}n.addEventListener("change",s=>{const a=s.target.value;a&&ge&&(ge.seekToTag(a)||console.warn(`Tag not found: ${a}`))})}Pg()}else console.log("Timeline V1 format: tags not supported"),i&&(i.style.display="none")}function Pg(){if(!ge)return;const i=document.getElementById("tag-markers");if(!i)return;i.innerHTML="";const e=ge.getTotalCommits();ge.getMetadata();const t=[];for(let n=0;n<e;n++){const s=ge.getCommitAtIndex(n);s&&s.tags.length>0&&t.push({index:n,tags:s.tags})}console.log(`Rendering ${t.length} tag markers`);for(const n of t){const s=n.index/(e-1)*100,r=document.createElement("div");r.className="tag-marker",r.style.left=`${s}%`,r.setAttribute("data-tag",n.tags.join(", ")),r.addEventListener("click",a=>{a.stopPropagation(),ge==null||ge.seekToCommit(n.index)}),i.appendChild(r)}}function Dg(i){if(!ge)return;const e=ge.getCommitAtIndex(i),t=document.getElementById("tag-selector");t&&e&&(e.tags.length>0?t.value=e.tags[0]:t.value="")}function Ig(){const i=document.querySelector('input[name="view-mode"]:checked');return(i==null?void 0:i.value)||"head"}function Za(i){const e=document.querySelector(`input[name="view-mode"][value="${i}"]`);e&&(e.checked=!0)}function Ug(i){const e=document.getElementById("mode-switcher");e&&(e.style.display=i?"flex":"none")}function Ng(i){const e=document.getElementById("color-mode-selector");if(!e)return;const t=Array.from(e.options).find(n=>n.value==="cluster");if(i&&!t){const n=document.createElement("option");n.value="cluster",n.textContent="Coupling Clusters",e.appendChild(n),console.log('✓ Added "Coupling Clusters" color mode option')}else if(!i&&t){const n=e.value==="cluster"||localStorage.getItem("colorMode")==="cluster";t.remove(),n&&(e.value="fileType",localStorage.setItem("colorMode","fileType"),e.dispatchEvent(new Event("change"))),console.log('ℹ️  Removed "Coupling Clusters" color mode (no coupling data)')}}async function Cr(i){const e=document.getElementById("loading");e&&(e.classList.remove("hidden"),e.innerHTML='<div class="spinner"></div><p>Loading visualization...</p>');try{console.log(`Loading repository: ${i}`),ki=i;const t=Gs(i);wg(t),gs=await xg(i),console.log(`Timeline available for ${i}: ${gs}`),Ug(gs);const n=Ig();let s,r=i;const{files:a,fallbackToHead:o}=dg(i,n,gs);if(a.length>1){let y=!1;for(const x of a)try{console.log(`Trying to load: ${x}.json`),s=await Ss(x),r=x,y=!0,console.log(`Successfully loaded: ${r}.json`);break}catch(b){console.log(`Could not load ${x}: ${b}`)}y||(console.warn(`No timeline file could be loaded for ${i}, falling back to HEAD mode`),Za("head"),r=i,s=await Ss(r))}else console.log(`Loading HEAD mode: ${a[0]}`),o&&Za("head"),r=a[0],s=await Ss(r);let l;const c=await yt.tryLoad(r);Ng(c);const h=ug(s),d=fg(s,h);if(h==="timeline-v2"){console.log("🎬 Timeline V2 (Full Delta) format detected"),await Rg(s,r);return}else h==="timeline-v1"?(console.log("Timeline V1 format detected"),ut=s,ge=null,l=d,console.log(`Timeline data: ${s.timeline.totalCommits} total commits, ${s.timeline.baseSampling.actualCount} sampled`)):(console.log("Static snapshot format detected"),ut=null,ge=null,l=d);Ze=l,console.log("Data loaded:",l),!ut&&!ge&&Cg(),Ns=tg(l.tree),console.log(`Built commit index: ${Ns.size} unique commits`),Hn=Jr(l.tree),console.log(`Built path index: ${Hn.size} files`);const f=Qm(l.tree);Sm(f),console.log(`Calculated last modified intervals from ${f.length} files`);const m=eg(l.tree);Em(m),console.log(`Calculated LOC intervals from ${m.length} files`);const g=document.getElementById("info-panel");g&&g.classList.remove("visible"),Jt=null,he&&he.clearHighlight(),Hl(l),Mg(l);const _=document.getElementById("timeline-controls");_&&(ut?(_.style.display="flex",kg(),$l(),Xl()):(_.style.display="none",ql()));const p=document.getElementById("canvas");if(!p)throw new Error("Canvas element not found");if(he)he.setCouplingLoader(yt.isLoaded()?yt:null);else{he=new Nl(p);const y=document.documentElement.getAttribute("data-theme")||"dark",x={labelMode:localStorage.getItem("labelMode"),colorMode:localStorage.getItem("colorMode"),viewMode:localStorage.getItem("viewMode"),layoutMode:localStorage.getItem("layoutMode")},b=Ol(y,x);Bl(he,b,yt.isLoaded()?yt:null,{onFileClick:w=>{const A=Jt===w.lastCommitHash;jt=w,Kt=null,Is(w,!0),A&&Jt===null&&(jt=null,Kt=null)},onDirClick:w=>{Kt=w,jt=null,Us(w)},onHover:(w,A)=>{if(!w){if(!jt&&!Kt){const C=document.getElementById("info-panel");C&&C.classList.remove("visible")}return}!jt&&!Kt&&(w.type==="file"?localStorage.getItem("colorMode")!=="cluster"&&Is(w,!1):Us(w))}}),he.start()}he.setTimelineMode(ut!==null?"v1":"off"),kl();const u=localStorage.getItem("colorMode")||"fileType";u==="fileType"?Vl(l):jl(u),Eg(),console.log("Visualization ready!")}catch(t){console.error("Error initializing visualization:",t);const n=document.getElementById("loading");n&&(n.innerHTML=`
        <p style="color: #ff4444;">Error loading visualization</p>
        <p style="font-size: 12px; margin-top: 10px; color: #888;">
          ${t instanceof Error?t.message:"Unknown error"}
        </p>
        <p style="font-size: 12px; margin-top: 10px; color: #888;">
          Make sure you've run the processor and placed the data file in public/data/
        </p>
      `)}}async function Fg(){const i=await _g(),e=document.getElementById("repo-selector");e&&(e.innerHTML="",i.forEach(w=>{const A=document.createElement("option");A.value=w;const C=Gs(w),U=Vs(C);U?A.textContent=`${w} (${U.owner}/${U.repo})`:A.textContent=w,e.appendChild(A)}),i.length>0&&await Cr(i[0]),e.addEventListener("change",async w=>{const A=w.target;he&&he.clearFilter(),await Cr(A.value)})),document.querySelectorAll('input[name="view-mode"]').forEach(w=>{w.addEventListener("change",async()=>{ki&&await Cr(ki)})});const n=document.getElementById("layout-mode-selector");if(n){const w=localStorage.getItem("layoutMode")||"hierarchical";n.value=w,n.addEventListener("change",A=>{const U=A.target.value;localStorage.setItem("layoutMode",U),he&&he.setLayoutStrategy(Fl(U))})}const s=document.getElementById("color-mode-selector");if(s){const w=localStorage.getItem("colorMode");w&&(s.value=w),s.addEventListener("change",A=>{const U=A.target.value;localStorage.setItem("colorMode",U),he&&(he.clearFilter(),he.setColorMode(U)),U==="fileType"&&Ze?Vl(Ze):jl(U),Ze&&Qr(Ze)})}const r=document.getElementById("label-toggle");if(r){const A=localStorage.getItem("labelMode")||"hover";r.textContent=A==="always"?"Always On":"Hover Only",r.addEventListener("click",()=>{const U=(r.textContent==="Always On"?"always":"hover")==="always"?"hover":"always";r.textContent=U==="always"?"Always On":"Hover Only",localStorage.setItem("labelMode",U),he&&he.setLabelMode(U)})}const a=document.getElementById("view-mode-toggle");if(a){const A=localStorage.getItem("viewMode")||"navigate";a.textContent=A==="navigate"?"Navigate":"Overview",a.addEventListener("click",()=>{const U=(a.textContent==="Navigate"?"navigate":"overview")==="navigate"?"overview":"navigate";a.textContent=U==="navigate"?"Navigate":"Overview",localStorage.setItem("viewMode",U),he&&he.setViewMode(U),console.log("View mode:",U)})}const o=document.getElementById("highlight-commit-toggle");if(o){const w=localStorage.getItem("highlightCommit");Gt=w!==null?w==="true":!0,o.textContent=Gt?"On":"Off",o.addEventListener("click",()=>{Gt=!Gt,o.textContent=Gt?"On":"Off",localStorage.setItem("highlightCommit",Gt.toString()),!Gt&&he&&(he.clearHighlight(),Jt=null),console.log("Highlight commit mode:",Gt?"enabled":"disabled")})}const l=document.getElementById("theme-toggle");if(l){const w=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",w),c(w),he&&he.setTheme(w),l.addEventListener("click",()=>{const C=(document.documentElement.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",C),localStorage.setItem("theme",C),c(C),he&&he.setTheme(C)})}function c(w){const A=document.getElementById("theme-toggle");A&&(A.textContent=w==="dark"?"☀️ Light":"🌙 Dark")}const h=document.getElementById("hide-generated-checkbox");h&&h.addEventListener("change",()=>{kl()});const d=document.getElementById("stats-panel"),f=document.querySelector("#stats-panel h3");f&&d&&f.addEventListener("click",()=>{d.classList.toggle("collapsed")});const m=document.querySelector("#legend h3"),g=document.getElementById("legend");m&&g&&m.addEventListener("click",()=>{g.classList.toggle("collapsed")});const _=document.querySelector("#info-panel h3"),p=document.getElementById("info-panel");_&&p&&_.addEventListener("click",()=>{p.classList.toggle("collapsed")});const u=document.getElementById("filter-top-btn"),y=document.getElementById("filter-all-btn"),x=document.getElementById("filter-none-btn"),b=document.getElementById("filter-invert-btn");u&&u.addEventListener("click",()=>{const w=document.querySelectorAll(".legend-checkbox");w.forEach(A=>{A.checked=!1}),w.length>0&&(w[0].checked=!0),Qt()}),y&&y.addEventListener("click",()=>{document.querySelectorAll(".legend-checkbox").forEach(A=>{A.checked=!0}),Qt()}),x&&x.addEventListener("click",()=>{document.querySelectorAll(".legend-checkbox").forEach(A=>{A.checked=!1}),Qt()}),b&&b.addEventListener("click",()=>{document.querySelectorAll(".legend-checkbox").forEach(A=>{A.checked=!A.checked}),Qt()})}function bs(){const i=document.getElementById("filter-controls");i&&(i.style.display="flex")}function Og(){const i=document.querySelectorAll(".legend-checkbox"),e=document.getElementById("filter-controls"),t=document.getElementById("filter-status");i.forEach(n=>{n.style.display="none",n.checked=!0}),e&&(e.style.display="none"),t&&(t.textContent=""),he&&he.clearFilter()}function ql(){const i=document.querySelectorAll(".legend-checkbox"),e=document.getElementById("filter-controls");i.forEach(t=>{t.style.display="",t.disabled=!1}),e&&(e.style.display="",e.querySelectorAll("button").forEach(n=>{n.disabled=!1})),Yl()}function Yl(){const i=document.getElementById("filter-status");if(!i||!he)return;const t=document.querySelectorAll(".legend-checkbox").length,s=he.getActiveFilterCategories().length;if(!he.hasActiveFilters()||s===t)i.textContent="";else{const r=s===1?"category":"categories";i.textContent=`Filtering: ${s} / ${t} ${r}`}}function Ni(){const i=document.querySelectorAll(".legend-checkbox"),e=document.getElementById("filter-top-btn"),t=document.getElementById("filter-all-btn"),n=document.getElementById("filter-none-btn"),s=document.getElementById("filter-invert-btn");if(!i.length||!e||!t||!n||!s)return;let r=0;i.forEach(l=>{l.checked&&r++});const a=i.length;r===1&&i.length>0&&i[0].checked?e.style.display="none":e.style.display="",r===a?t.style.display="none":t.style.display="",r===0?n.style.display="none":n.style.display="",a===0?s.style.display="none":s.style.display=""}function Qt(){if(!he||!Ze)return;const i=document.querySelectorAll(".legend-checkbox"),e=[];i.forEach(t=>{if(t.checked){const n=t.dataset.category;n&&e.push(n)}}),e.length===0?he.clearFilter():he.setFilter(e),i.forEach(t=>{const n=t.closest(".legend-item");n&&(t.checked?n.classList.remove("unchecked"):n.classList.add("unchecked"))}),Yl(),Qr(Ze),Ni()}function jl(i){const e=document.getElementById("legend-content"),t=document.getElementById("legend-title");if(!e)return;if(t){let s=Fm(i);i==="lastModified"&&Um()&&(s="Last Modified (Relative)"),t.textContent=s}e.innerHTML="";const n=Nm(i);if(n.length>0&&i==="lastModified"&&Ze){const s=new Map,r=o=>{if(o.type==="file"&&o.lastModified){const l=dn(o,"lastModified");s.set(l.name,(s.get(l.name)||0)+1)}else if(o.type==="directory")for(const l of o.children)r(l)};r(Ze.tree);const a=Ze.stats.totalFiles;for(const o of n){const l=s.get(o.name)||0,c=(l/a*100).toFixed(1),h=l===1?"file":"files",d=ag({...o,count:l,percentage:c},h),f=fi(d,Qt,"label");e.appendChild(f)}bs(),Ni()}else if(n.length>0){for(const s of n){const r=lg(s),a=fi(r,Qt,"label");e.appendChild(a)}bs(),Ni()}else if(i==="author"&&Ze){const s=new Map,r=h=>{if(h.type==="file"&&h.lastAuthor)s.set(h.lastAuthor,(s.get(h.lastAuthor)||0)+1);else if(h.type==="directory")for(const d of h.children)r(d)};r(Ze.tree);const a=Array.from(s.entries()).sort((h,d)=>d[1]-h[1]),o=a.map(([h])=>h);bm(o);const l=a.slice(0,20),c=Ze.stats.totalFiles;for(const[h,d]of l){const f=(d/c*100).toFixed(1),m=dn({lastAuthor:h},"author"),g=d===1?"file":"files",_=cg(h,m.hex,d,f,g),p=fi(_,Qt,"label");e.appendChild(p)}if(a.length>20){const d=(l.reduce((g,[,_])=>g+_,0)/c*100).toFixed(1),f=hg(a.length-20,d),m=fi(f,Qt,"div");e.appendChild(m)}bs(),Ni()}}function Vi(){if(!ut)return;const i=ut.timeline.baseSampling.commits,e=i[Bt],t=(Bt+1)/i.length*100,n=document.getElementById("timeline-progress");n&&(n.style.width=`${t}%`);const s=document.getElementById("timeline-commit-index"),r=document.getElementById("timeline-commit-total");s&&(s.textContent=(Bt+1).toString()),r&&(r.textContent=i.length.toString());const a=document.getElementById("commit-info");if(a&&Ze){const o=new Date(e.date).toLocaleDateString();a.textContent=`${e.hash.substring(0,7)} • ${o} • ${Ze.stats.totalFiles} files • ${Ze.stats.totalLoc.toLocaleString()} LOC`}console.log(`Timeline: commit ${Bt+1}/${i.length} - ${e.hash.substring(0,7)}`),eo(e)}function eo(i,e){var a;if(!he)return;const t=ge!==null,n=i.changes.filesAdded.length,s=i.changes.filesModified.length,r=((a=i.changes.filesDeleted)==null?void 0:a.length)||0;if(t){const o=n+s,l=n+s+r,c=[],h=[];for(const m of i.changes.filesAdded){const g=Hn.get(m);g&&c.push(g)}for(const m of i.changes.filesModified){const g=Hn.get(m);g&&h.push(g)}const d=[...c,...h],f=i.changes.filesDeleted||[];if(l===0)he.clearHighlight(),Rr();else if(d.length===0&&f.length===0)he.clearHighlight(),xs(`⚠️ Cannot highlight ${l} change(s)`),console.warn(`Timeline V2: Failed to find ${l} file changes`);else if(d.length<o){const m=c.map(_=>_.path),g=h.map(_=>_.path);he.highlightFilesByType(m,g,f,[]),xs(`⚠️ Highlighting ${d.length+f.length}/${l} changes`)}else{const m=c.map(_=>_.path),g=h.map(_=>_.path);he.highlightFilesByType(m,g,f,[]),Rr()}}else{const o=n+s,l=[];for(const c of[...i.changes.filesAdded,...i.changes.filesModified]){const h=Hn.get(c);h&&l.push(h)}if(l.length===0)he.clearHighlight(),xs(`⚠️ Cannot highlight changes - ${o} file${o!==1?"s":""} not in current view`),console.log(`Timeline V1: 0 of ${o} files found in HEAD`);else if(l.length<o){const c=l.map(d=>d.path);he.highlightFiles(c);const h=o-l.length;xs(`⚠️ Highlighting ${l.length} of ${o} files (${h} not in current view)`),console.log(`Timeline V1: Partial ${l.length}/${o} files in HEAD`)}else{const c=l.map(h=>h.path);he.highlightFiles(c),Rr(),console.log(`Timeline V1: Highlighted all ${l.length} files`)}}}function xs(i){const e=document.getElementById("timeline-warning"),t=document.getElementById("timeline-warning-text");e&&t&&(t.textContent=i,e.style.display="block")}function Rr(){const i=document.getElementById("timeline-warning");i&&(i.style.display="none")}function Kl(){if(!ut)return;const i=ut.timeline.baseSampling.commits;Bt<i.length-1&&(Bt++,Vi())}function Bg(){ut&&Bt>0&&(Bt--,Vi())}function zg(){ut&&(Bt=0,Vi())}function Ts(){if(!ut)return;const i=document.getElementById("play-pause-btn");if(Es)Es=!1,_s!==null&&(clearInterval(_s),_s=null),i&&(i.textContent="▶ Play");else{Es=!0,i&&(i.textContent="⏸ Pause");const t=2e3/Wl;_s=window.setInterval(()=>{const n=ut.timeline.baseSampling.commits;Bt<n.length-1?Kl():Ts()},t)}}function Hg(i){if(!ut)return;const e=ut.timeline.baseSampling.commits,t=Math.floor(i/100*e.length);Bt=Math.max(0,Math.min(t,e.length-1)),Vi()}function kg(){if(!ut)return;const i=document.getElementById("timeline-commit-total");i&&(i.textContent=ut.timeline.baseSampling.commits.length.toString());const e=document.getElementById("play-pause-btn");e&&e.addEventListener("click",Ts);const t=document.getElementById("go-to-start-btn");t&&t.addEventListener("click",zg);const n=document.getElementById("step-back-btn");n&&n.addEventListener("click",Bg);const s=document.getElementById("step-forward-btn");s&&s.addEventListener("click",Kl);const r=document.getElementById("speed-selector");r&&r.addEventListener("change",o=>{const l=o.target;Wl=parseFloat(l.value),Es&&(Ts(),Ts())});const a=document.getElementById("timeline-scrubber");a&&a.addEventListener("click",o=>{const l=a.getBoundingClientRect(),h=(o.clientX-l.left)/l.width*100;Hg(h)}),Bt=0,Vi()}Fg();
