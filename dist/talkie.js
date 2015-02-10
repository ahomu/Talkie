/*! talkie - v0.4.0 */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Talkie=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){require("core-js/shim");require("regenerator/runtime")},{"core-js/shim":2,"regenerator/runtime":3}],2:[function(require,module,exports){!function(returnThis,framework,undefined){"use strict";var global=returnThis(),OBJECT="Object",FUNCTION="Function",ARRAY="Array",STRING="String",NUMBER="Number",REGEXP="RegExp",DATE="Date",MAP="Map",SET="Set",WEAKMAP="WeakMap",WEAKSET="WeakSet",SYMBOL="Symbol",PROMISE="Promise",MATH="Math",ARGUMENTS="Arguments",PROTOTYPE="prototype",CONSTRUCTOR="constructor",TO_STRING="toString",TO_STRING_TAG=TO_STRING+"Tag",TO_LOCALE="toLocaleString",HAS_OWN="hasOwnProperty",FOR_EACH="forEach",ITERATOR="iterator",FF_ITERATOR="@@"+ITERATOR,PROCESS="process",CREATE_ELEMENT="createElement",Function=global[FUNCTION],Object=global[OBJECT],Array=global[ARRAY],String=global[STRING],Number=global[NUMBER],RegExp=global[REGEXP],Date=global[DATE],Map=global[MAP],Set=global[SET],WeakMap=global[WEAKMAP],WeakSet=global[WEAKSET],Symbol=global[SYMBOL],Math=global[MATH],TypeError=global.TypeError,setTimeout=global.setTimeout,setImmediate=global.setImmediate,clearImmediate=global.clearImmediate,process=global[PROCESS],nextTick=process&&process.nextTick,document=global.document,html=document&&document.documentElement,navigator=global.navigator,define=global.define,ArrayProto=Array[PROTOTYPE],ObjectProto=Object[PROTOTYPE],FunctionProto=Function[PROTOTYPE],Infinity=1/0,DOT=".";function isObject(it){return it!=null&&(typeof it=="object"||typeof it=="function")}function isFunction(it){return typeof it=="function"}var isNative=ctx(/./.test,/\[native code\]\s*\}\s*$/,1);var buildIn={Undefined:1,Null:1,Array:1,String:1,Arguments:1,Function:1,Error:1,Boolean:1,Number:1,Date:1,RegExp:1},toString=ObjectProto[TO_STRING];function setToStringTag(it,tag,stat){if(it)has(it=stat?it:it[PROTOTYPE],SYMBOL_TAG)||hidden(it,SYMBOL_TAG,tag)}function cof(it){return it==undefined?it===undefined?"Undefined":"Null":toString.call(it).slice(8,-1)}function classof(it){var klass=cof(it),tag;return klass==OBJECT&&(tag=it[SYMBOL_TAG])?has(buildIn,tag)?"~"+tag:tag:klass}var call=FunctionProto.call,REFERENCE_GET;function part(){var length=arguments.length,args=Array(length),i=0,_=path._,holder=false;while(length>i)if((args[i]=arguments[i++])===_)holder=true;return partial(this,args,length,holder,_,false)}function partial(fn,argsPart,lengthPart,holder,_,bind,context){assertFunction(fn);return function(){var that=bind?context:this,length=arguments.length,i=0,j=0,args;if(!holder&&!length)return invoke(fn,argsPart,that);args=argsPart.slice();if(holder)for(;lengthPart>i;i++)if(args[i]===_)args[i]=arguments[j++];while(length>j)args.push(arguments[j++]);return invoke(fn,args,that)}}function ctx(fn,that,length){assertFunction(fn);if(~length&&that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}function invoke(fn,args,that){var un=that===undefined;switch(args.length|0){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);case 5:return un?fn(args[0],args[1],args[2],args[3],args[4]):fn.call(that,args[0],args[1],args[2],args[3],args[4])}return fn.apply(that,args)}var create=Object.create,getPrototypeOf=Object.getPrototypeOf,defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,getOwnDescriptor=Object.getOwnPropertyDescriptor,getKeys=Object.keys,getNames=Object.getOwnPropertyNames,getSymbols=Object.getOwnPropertySymbols,has=ctx(call,ObjectProto[HAS_OWN],2),ES5Object=Object;function get(object,key){if(has(object,key))return object[key]}function ownKeys(it){return getSymbols?getNames(it).concat(getSymbols(it)):getNames(it)}var assign=Object.assign||function(target,source){var T=Object(assertDefined(target)),l=arguments.length,i=1;while(l>i){var S=ES5Object(arguments[i++]),keys=getKeys(S),length=keys.length,j=0,key;while(length>j)T[key=keys[j++]]=S[key]}return T};function keyOf(object,el){var O=ES5Object(object),keys=getKeys(O),length=keys.length,index=0,key;while(length>index)if(O[key=keys[index++]]===el)return key}function array(it){return String(it).split(",")}var push=ArrayProto.push,unshift=ArrayProto.unshift,slice=ArrayProto.slice,splice=ArrayProto.splice,indexOf=ArrayProto.indexOf,forEach=ArrayProto[FOR_EACH];function createArrayMethod(type){var isMap=type==1,isFilter=type==2,isSome=type==3,isEvery=type==4,isFindIndex=type==6,noholes=type==5||isFindIndex;return function(callbackfn,that){var O=Object(assertDefined(this)),self=ES5Object(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=isMap?Array(length):isFilter?[]:undefined,val,res;for(;length>index;index++)if(noholes||index in self){val=self[index];res=f(val,index,O);if(type){if(isMap)result[index]=res;else if(res)switch(type){case 3:return true;case 5:return val;case 6:return index;case 2:result.push(val)}else if(isEvery)return false}}return isFindIndex?-1:isSome||isEvery?isEvery:result}}function createArrayContains(isContains){return function(el,fromIndex){var O=ES5Object(assertDefined(this)),length=toLength(O.length),index=toIndex(fromIndex,length);if(isContains&&el!=el){for(;length>index;index++)if(sameNaN(O[index]))return isContains||index}else for(;length>index;index++)if(isContains||index in O){if(O[index]===el)return isContains||index}return!isContains&&-1}}function turn(mapfn,target){assertFunction(mapfn);var memo=target==undefined?[]:Object(target),O=ES5Object(this),length=toLength(O.length),index=0;for(;length>index;index++){if(mapfn(memo,O[index],index,this)===false)break}return memo}function generic(A,B){return typeof A=="function"?A:B}var MAX_SAFE_INTEGER=9007199254740991,ceil=Math.ceil,floor=Math.floor,max=Math.max,min=Math.min,random=Math.random,trunc=Math.trunc||function(it){return(it>0?floor:ceil)(it)};function sameNaN(number){return number!=number}function toInteger(it){return isNaN(it)?0:trunc(it)}function toLength(it){return it>0?min(toInteger(it),MAX_SAFE_INTEGER):0}function toIndex(index,length){var index=toInteger(index);return index<0?max(index+length,0):min(index,length)}function createReplacer(regExp,replace,isStatic){var replacer=isObject(replace)?function(part){return replace[part]}:replace;return function(it){return String(isStatic?it:this).replace(regExp,replacer)}}function createPointAt(toString){return function(pos){var s=String(assertDefined(this)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return toString?"":undefined;a=s.charCodeAt(i);return a<55296||a>56319||i+1===l||(b=s.charCodeAt(i+1))<56320||b>57343?toString?s.charAt(i):a:toString?s.slice(i,i+2):(a-55296<<10)+(b-56320)+65536}}var REDUCE_ERROR="Reduce of empty object with no initial value";function assert(condition,msg1,msg2){if(!condition)throw TypeError(msg2?msg1+msg2:msg1)}function assertDefined(it){if(it==undefined)throw TypeError("Function called on null or undefined");return it}function assertFunction(it){assert(isFunction(it),it," is not a function!");return it}function assertObject(it){assert(isObject(it),it," is not an object!");return it}function assertInstance(it,Constructor,name){assert(it instanceof Constructor,name,": use the 'new' operator!")}function descriptor(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value}}function simpleSet(object,key,value){object[key]=value;return object}function createDefiner(bitmap){return DESC?function(object,key,value){return defineProperty(object,key,descriptor(bitmap,value))}:simpleSet}function uid(key){return SYMBOL+"("+key+")_"+(++sid+random())[TO_STRING](36)}function getWellKnownSymbol(name,setter){return Symbol&&Symbol[name]||(setter?Symbol:safeSymbol)(SYMBOL+DOT+name)}var DESC=!!function(){try{return defineProperty({},0,ObjectProto)}catch(e){}}(),sid=0,hidden=createDefiner(1),set=Symbol?simpleSet:hidden,safeSymbol=Symbol||uid;function assignHidden(target,src){for(var key in src)hidden(target,key,src[key]);return target}var SYMBOL_ITERATOR=getWellKnownSymbol(ITERATOR),SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG),SUPPORT_FF_ITER=FF_ITERATOR in ArrayProto,ITER=safeSymbol("iter"),KEY=1,VALUE=2,Iterators={},IteratorPrototype={},NATIVE_ITERATORS=SYMBOL_ITERATOR in ArrayProto,BUGGY_ITERATORS="keys"in ArrayProto&&!("next"in[].keys());setIterator(IteratorPrototype,returnThis);function setIterator(O,value){hidden(O,SYMBOL_ITERATOR,value);SUPPORT_FF_ITER&&hidden(O,FF_ITERATOR,value)}function createIterator(Constructor,NAME,next,proto){Constructor[PROTOTYPE]=create(proto||IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+" Iterator")}function defineIterator(Constructor,NAME,value,DEFAULT){var proto=Constructor[PROTOTYPE],iter=get(proto,SYMBOL_ITERATOR)||get(proto,FF_ITERATOR)||DEFAULT&&get(proto,DEFAULT)||value;if(framework){setIterator(proto,iter);if(iter!==value){var iterProto=getPrototypeOf(iter.call(new Constructor));setToStringTag(iterProto,NAME+" Iterator",true);has(proto,FF_ITERATOR)&&setIterator(iterProto,returnThis)}}Iterators[NAME]=iter;Iterators[NAME+" Iterator"]=returnThis}function defineStdIterators(Base,NAME,Constructor,next,DEFAULT){function createIter(kind){return function(){return new Constructor(this,kind)}}createIterator(Constructor,NAME,next);defineIterator(Base,NAME,createIter(DEFAULT),DEFAULT==VALUE?"values":"entries");DEFAULT&&$define(PROTO+FORCED*BUGGY_ITERATORS,NAME,{entries:createIter(KEY+VALUE),keys:createIter(KEY),values:createIter(VALUE)})}function iterResult(done,value){return{value:value,done:!!done}}function isIterable(it){var O=Object(it);return SYMBOL_ITERATOR in O||has(Iterators,classof(O))}function getIterator(it){return assertObject((it[SYMBOL_ITERATOR]||Iterators[classof(it)]).call(it))}function stepCall(fn,value,entries){return entries?invoke(fn,value):fn(value)}function forOf(iterable,entries,fn,that){var iterator=getIterator(iterable),f=ctx(fn,that,entries?2:1),step;while(!(step=iterator.next()).done)if(stepCall(f,step.value,entries)===false)return}var NODE=cof(process)==PROCESS,core={},path=framework?global:core,old=global.core,FORCED=1,GLOBAL=2,STATIC=4,PROTO=8,BIND=16,WRAP=32;function $define(type,name,source){var key,own,out,exp,isGlobal=type&GLOBAL,target=isGlobal?global:type&STATIC?global[name]:(global[name]||ObjectProto)[PROTOTYPE],exports=isGlobal?core:core[name]||(core[name]={});if(isGlobal)source=name;for(key in source){own=!(type&FORCED)&&target&&key in target&&(!isFunction(target[key])||isNative(target[key]));out=(own?target:source)[key];if(type&BIND&&own)exp=ctx(out,global);else if(type&WRAP&&!framework&&target[key]==out){exp=function(param){return this instanceof out?new out(param):out(param)};exp[PROTOTYPE]=out[PROTOTYPE]}else exp=type&PROTO&&isFunction(out)?ctx(call,out):out;if(exports[key]!=out)hidden(exports,key,exp);if(framework&&target&&!own){if(isGlobal)target[key]=out;else delete target[key]&&hidden(target,key,out)}}}if(NODE)module.exports=core;if(isFunction(define)&&define.amd)define(function(){return core});if(!NODE||framework){core.noConflict=function(){global.core=old;return core};global.core=core}$define(GLOBAL+FORCED,{global:global});!function(TAG,SymbolRegistry,setter){if(!isNative(Symbol)){Symbol=function(description){assert(!(this instanceof Symbol),SYMBOL+" is not a "+CONSTRUCTOR);var tag=uid(description);setter&&defineProperty(ObjectProto,tag,{configurable:true,set:function(value){hidden(this,tag,value)}});return set(create(Symbol[PROTOTYPE]),TAG,tag)};hidden(Symbol[PROTOTYPE],TO_STRING,function(){return this[TAG]})}$define(GLOBAL+WRAP,{Symbol:Symbol});var symbolStatics={"for":function(key){return has(SymbolRegistry,key+="")?SymbolRegistry[key]:SymbolRegistry[key]=Symbol(key)},iterator:SYMBOL_ITERATOR,keyFor:part.call(keyOf,SymbolRegistry),toStringTag:SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG,true),pure:safeSymbol,set:set,useSetter:function(){setter=true},useSimple:function(){setter=false}};forEach.call(array("hasInstance,isConcatSpreadable,match,replace,search,"+"species,split,toPrimitive,unscopables"),function(it){symbolStatics[it]=getWellKnownSymbol(it)});$define(STATIC,SYMBOL,symbolStatics);setToStringTag(Symbol,SYMBOL);$define(GLOBAL,{Reflect:{ownKeys:ownKeys}})}(safeSymbol("tag"),{},true);!function(isFinite,tmp){var RangeError=global.RangeError,isInteger=Number.isInteger||function(it){return!isObject(it)&&isFinite(it)&&floor(it)===it},sign=Math.sign||function sign(it){return(it=+it)==0||it!=it?it:it<0?-1:1},pow=Math.pow,abs=Math.abs,exp=Math.exp,log=Math.log,sqrt=Math.sqrt,fcc=String.fromCharCode,at=createPointAt(true);var objectStatic={assign:assign,is:function(x,y){return x===y?x!==0||1/x===1/y:x!=x&&y!=y}};"__proto__"in ObjectProto&&function(buggy,set){try{set=ctx(call,getOwnDescriptor(ObjectProto,"__proto__").set,2);set({},ArrayProto)}catch(e){buggy=true}objectStatic.setPrototypeOf=function(O,proto){assertObject(O);assert(proto===null||isObject(proto),proto,": can't set as prototype!");if(buggy)O.__proto__=proto;else set(O,proto);return O}}();$define(STATIC,OBJECT,objectStatic);function asinh(x){return!isFinite(x=+x)||x==0?x:x<0?-asinh(-x):log(x+sqrt(x*x+1))}$define(STATIC,NUMBER,{EPSILON:pow(2,-52),isFinite:function(it){return typeof it=="number"&&isFinite(it)},isInteger:isInteger,isNaN:sameNaN,isSafeInteger:function(number){return isInteger(number)&&abs(number)<=MAX_SAFE_INTEGER},MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,MIN_SAFE_INTEGER:-MAX_SAFE_INTEGER,parseFloat:parseFloat,parseInt:parseInt});$define(STATIC,MATH,{acosh:function(x){return x<1?NaN:log(x+sqrt(x*x-1))},asinh:asinh,atanh:function(x){return x==0?+x:log((1+ +x)/(1-x))/2},cbrt:function(x){return sign(x)*pow(abs(x),1/3)},clz32:function(x){return(x>>>=0)?32-x[TO_STRING](2).length:32},cosh:function(x){return(exp(x)+exp(-x))/2},expm1:function(x){return x==0?+x:x>-1e-6&&x<1e-6?+x+x*x/2:exp(x)-1},fround:function(x){return new Float32Array([x])[0]},hypot:function(value1,value2){var sum=0,length=arguments.length,value;while(length--){value=+arguments[length];if(value==Infinity||value==-Infinity)return Infinity;sum+=value*value}return sqrt(sum)},imul:function(x,y){var UInt16=65535,xl=UInt16&x,yl=UInt16&y;return 0|xl*yl+((UInt16&x>>>16)*yl+xl*(UInt16&y>>>16)<<16>>>0)},log1p:function(x){return x>-1e-8&&x<1e-8?x-x*x/2:log(1+ +x)},log10:function(x){return log(x)/Math.LN10},log2:function(x){return log(x)/Math.LN2},sign:sign,sinh:function(x){return x==0?+x:(exp(x)-exp(-x))/2},tanh:function(x){return isFinite(x)?x==0?+x:(exp(x)-exp(-x))/(exp(x)+exp(-x)):sign(x)},trunc:trunc});setToStringTag(Math,MATH,true);function assertNotRegExp(it){if(isObject(it)&&it instanceof RegExp)throw TypeError()}$define(STATIC,STRING,{fromCodePoint:function(){var res=[],len=arguments.length,i=0,code;while(len>i){code=+arguments[i++];if(toIndex(code,1114111)!==code)throw RangeError(code+" is not a valid code point");res.push(code<65536?fcc(code):fcc(((code-=65536)>>10)+55296,code%1024+56320))}return res.join("")},raw:function(callSite){var raw=ES5Object(assertDefined(callSite.raw)),len=toLength(raw.length),sln=arguments.length,res=[],i=0;while(len>i){res.push(String(raw[i++]));if(i<sln)res.push(String(arguments[i]))}return res.join("")}});$define(PROTO,STRING,{codePointAt:createPointAt(false),endsWith:function(searchString,endPosition){assertNotRegExp(searchString);var len=this.length,end=endPosition===undefined?len:min(toLength(endPosition),len);searchString+="";return String(this).slice(end-searchString.length,end)===searchString},includes:function(searchString,position){return!!~String(assertDefined(this)).indexOf(searchString,position)},repeat:function(count){var str=String(assertDefined(this)),res="",n=toInteger(count);if(0>n||n==Infinity)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(str+=str))if(n&1)res+=str;return res},startsWith:function(searchString,position){assertNotRegExp(searchString);var index=toLength(min(position,this.length));searchString+="";return String(this).slice(index,index+searchString.length)===searchString}});defineStdIterators(String,STRING,function(iterated){set(this,ITER,{o:String(iterated),i:0})},function(){var iter=this[ITER],O=iter.o,index=iter.i,point;if(index>=O.length)return iterResult(1);point=at.call(O,index);iter.i+=point.length;return iterResult(0,point)});$define(STATIC,ARRAY,{from:function(arrayLike,mapfn,that){var O=Object(assertDefined(arrayLike)),result=new(generic(this,Array)),mapping=mapfn!==undefined,f=mapping?ctx(mapfn,that,2):undefined,index=0,length;if(isIterable(O))for(var iter=getIterator(O),step;!(step=iter.next()).done;index++){result[index]=mapping?f(step.value,index):step.value}else for(length=toLength(O.length);length>index;index++){result[index]=mapping?f(O[index],index):O[index]}result.length=index;return result},of:function(){var index=0,length=arguments.length,result=new(generic(this,Array))(length);while(length>index)result[index]=arguments[index++];result.length=length;return result}});$define(PROTO,ARRAY,{copyWithin:function(target,start,end){var O=Object(assertDefined(this)),len=toLength(O.length),to=toIndex(target,len),from=toIndex(start,len),fin=end===undefined?len:toIndex(end,len),count=min(fin-from,len-to),inc=1;if(from<to&&to<from+count){inc=-1;from=from+count-1;to=to+count-1}while(count-->0){if(from in O)O[to]=O[from];else delete O[to];to+=inc;from+=inc}return O},fill:function(value,start,end){var O=Object(assertDefined(this)),length=toLength(O.length),index=toIndex(start,length),endPos=end===undefined?length:toIndex(end,length);while(endPos>index)O[index++]=value;return O},find:createArrayMethod(5),findIndex:createArrayMethod(6)});defineStdIterators(Array,ARRAY,function(iterated,kind){set(this,ITER,{o:ES5Object(iterated),i:0,k:kind})},function(){var iter=this[ITER],O=iter.o,kind=iter.k,index=iter.i++;if(!O||index>=O.length)return iter.o=undefined,iterResult(1);if(kind==KEY)return iterResult(0,index);if(kind==VALUE)return iterResult(0,O[index]);return iterResult(0,[index,O[index]])},VALUE);Iterators[ARGUMENTS]=Iterators[ARRAY];setToStringTag(global.JSON,"JSON",true);if(framework){tmp[SYMBOL_TAG]=DOT;if(cof(tmp)!=DOT)hidden(ObjectProto,TO_STRING,function(){return"[object "+classof(this)+"]"});if(/./g.flags!="g")defineProperty(RegExp[PROTOTYPE],"flags",{configurable:true,get:createReplacer(/^.*\/(\w*)$/,"$1")})}}(isFinite,{});isFunction(setImmediate)&&isFunction(clearImmediate)||function(ONREADYSTATECHANGE){var postMessage=global.postMessage,addEventListener=global.addEventListener,MessageChannel=global.MessageChannel,counter=0,queue={},defer,channel,port;setImmediate=function(fn){var args=[],i=1;while(arguments.length>i)args.push(arguments[i++]);queue[++counter]=function(){invoke(isFunction(fn)?fn:Function(fn),args)};defer(counter);return counter};clearImmediate=function(id){delete queue[id]};function run(id){if(has(queue,id)){var fn=queue[id];delete queue[id];fn()}}function listner(event){run(event.data)}if(NODE){defer=function(id){nextTick(part.call(run,id))}}else if(addEventListener&&isFunction(postMessage)&&!global.importScripts){defer=function(id){postMessage(id,"*")};addEventListener("message",listner,false)}else if(isFunction(MessageChannel)){channel=new MessageChannel;port=channel.port2;channel.port1.onmessage=listner;defer=ctx(port.postMessage,port,1)}else if(document&&ONREADYSTATECHANGE in document[CREATE_ELEMENT]("script")){defer=function(id){html.appendChild(document[CREATE_ELEMENT]("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run(id)}}}else{defer=function(id){setTimeout(part.call(run,id),0)}}}("onreadystatechange");$define(GLOBAL+BIND,{setImmediate:setImmediate,clearImmediate:clearImmediate});!function(Promise,test){isFunction(Promise)&&isFunction(Promise.resolve)&&Promise.resolve(test=new Promise(Function()))==test||function(asap,DEF){function isThenable(o){var then;if(isObject(o))then=o.then;return isFunction(then)?then:false}function notify(def){var chain=def.chain;chain.length&&asap(function(){var msg=def.msg,ok=def.state==1,i=0;while(chain.length>i)!function(react){var cb=ok?react.ok:react.fail,ret,then;try{if(cb){ret=cb===true?msg:cb(msg);if(ret===react.P){react.rej(TypeError(PROMISE+"-chain cycle"))}else if(then=isThenable(ret)){then.call(ret,react.res,react.rej)}else react.res(ret)}else react.rej(msg)}catch(err){react.rej(err)}}(chain[i++]);chain.length=0})}function resolve(msg){var def=this,then,wrapper;if(def.done)return;def.done=true;def=def.def||def;try{if(then=isThenable(msg)){wrapper={def:def,done:false};then.call(msg,ctx(resolve,wrapper,1),ctx(reject,wrapper,1))}else{def.msg=msg;def.state=1;notify(def)}}catch(err){reject.call(wrapper||{def:def,done:false},err)}}function reject(msg){var def=this;if(def.done)return;def.done=true;def=def.def||def;def.msg=msg;def.state=2;notify(def)}Promise=function(executor){assertFunction(executor);assertInstance(this,Promise,PROMISE);var def={chain:[],state:0,done:false,msg:undefined};hidden(this,DEF,def);try{executor(ctx(resolve,def,1),ctx(reject,def,1))}catch(err){reject.call(def,err)}};assignHidden(Promise[PROTOTYPE],{then:function(onFulfilled,onRejected){var react={ok:isFunction(onFulfilled)?onFulfilled:true,fail:isFunction(onRejected)?onRejected:false},P=react.P=new this[CONSTRUCTOR](function(resolve,reject){react.res=assertFunction(resolve);react.rej=assertFunction(reject)}),def=this[DEF];def.chain.push(react);def.state&&notify(def);return P},"catch":function(onRejected){return this.then(undefined,onRejected)}});assignHidden(Promise,{all:function(iterable){var Promise=this,values=[];return new Promise(function(resolve,reject){forOf(iterable,false,push,values);var remaining=values.length,results=Array(remaining);if(remaining)forEach.call(values,function(promise,index){Promise.resolve(promise).then(function(value){results[index]=value;--remaining||resolve(results)},reject)});else resolve(results)})},race:function(iterable){var Promise=this;return new Promise(function(resolve,reject){forOf(iterable,false,function(promise){Promise.resolve(promise).then(resolve,reject)})})},reject:function(r){return new this(function(resolve,reject){reject(r)})},resolve:function(x){return isObject(x)&&getPrototypeOf(x)===this[PROTOTYPE]?x:new this(function(resolve,reject){resolve(x)})}})}(nextTick||setImmediate,safeSymbol("def"));setToStringTag(Promise,PROMISE);$define(GLOBAL+FORCED*!isNative(Promise),{Promise:Promise})}(global[PROMISE]);!function(){var UID=safeSymbol("uid"),DATA=safeSymbol("data"),WEAK=safeSymbol("weak"),LAST=safeSymbol("last"),FIRST=safeSymbol("first"),SIZE=DESC?safeSymbol("size"):"size",uid=0;function getCollection(C,NAME,methods,commonMethods,isMap,isWeak){var ADDER=isMap?"set":"add",proto=C&&C[PROTOTYPE],O={};function initFromIterable(that,iterable){if(iterable!=undefined)forOf(iterable,isMap,that[ADDER],that);return that}function fixSVZ(key,chain){var method=proto[key];framework&&hidden(proto,key,function(a,b){var result=method.call(this,a===0?0:a,b);return chain?this:result})}if(!isNative(C)||!(isWeak||!BUGGY_ITERATORS&&has(proto,"entries"))){C=isWeak?function(iterable){assertInstance(this,C,NAME);set(this,UID,uid++);initFromIterable(this,iterable)}:function(iterable){var that=this;assertInstance(that,C,NAME);set(that,DATA,create(null));set(that,SIZE,0);set(that,LAST,undefined);set(that,FIRST,undefined);initFromIterable(that,iterable)};assignHidden(assignHidden(C[PROTOTYPE],methods),commonMethods);isWeak||defineProperty(C[PROTOTYPE],"size",{get:function(){return assertDefined(this[SIZE])}})}else{var Native=C,inst=new C,chain=inst[ADDER](isWeak?{}:-0,1),buggyZero;if(!NATIVE_ITERATORS||!C.length){C=function(iterable){assertInstance(this,C,NAME);return initFromIterable(new Native,iterable)};C[PROTOTYPE]=proto}isWeak||inst[FOR_EACH](function(val,key){buggyZero=1/key===-Infinity});if(buggyZero){fixSVZ("delete");fixSVZ("has");isMap&&fixSVZ("get")}if(buggyZero||chain!==inst)fixSVZ(ADDER,true)}setToStringTag(C,NAME);O[NAME]=C;$define(GLOBAL+WRAP+FORCED*!isNative(C),O);isWeak||defineStdIterators(C,NAME,function(iterated,kind){set(this,ITER,{o:iterated,k:kind})},function(){var iter=this[ITER],O=iter.o,kind=iter.k,entry=iter.l;while(entry&&entry.r)entry=entry.p;if(!O||!(iter.l=entry=entry?entry.n:O[FIRST]))return iter.o=undefined,iterResult(1);if(kind==KEY)return iterResult(0,entry.k);if(kind==VALUE)return iterResult(0,entry.v);return iterResult(0,[entry.k,entry.v])},isMap?KEY+VALUE:VALUE);return C}function fastKey(it,create){if(!isObject(it))return(typeof it=="string"?"S":"P")+it;if(!has(it,UID)){if(create)hidden(it,UID,++uid);else return""}return"O"+it[UID]}function def(that,key,value){var index=fastKey(key,true),data=that[DATA],last=that[LAST],entry;if(index in data)data[index].v=value;else{entry=data[index]={k:key,v:value,p:last};if(!that[FIRST])that[FIRST]=entry;if(last)last.n=entry;that[LAST]=entry;that[SIZE]++}return that}function del(that,index){var data=that[DATA],entry=data[index],next=entry.n,prev=entry.p;delete data[index];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that[FIRST]==entry)that[FIRST]=next;if(that[LAST]==entry)that[LAST]=prev;that[SIZE]--}var collectionMethods={clear:function(){for(var index in this[DATA])del(this,index)},"delete":function(key){var index=fastKey(key),contains=index in this[DATA];if(contains)del(this,index);return contains},forEach:function(callbackfn,that){var f=ctx(callbackfn,that,3),entry;while(entry=entry?entry.n:this[FIRST]){f(entry.v,entry.k,this);while(entry&&entry.r)entry=entry.p}},has:function(key){return fastKey(key)in this[DATA]}};Map=getCollection(Map,MAP,{get:function(key){var entry=this[DATA][fastKey(key)];return entry&&entry.v},set:function(key,value){return def(this,key===0?0:key,value)}},collectionMethods,true);Set=getCollection(Set,SET,{add:function(value){return def(this,value=value===0?0:value,value)}},collectionMethods);function setWeak(that,key,value){has(assertObject(key),WEAK)||hidden(key,WEAK,{});key[WEAK][that[UID]]=value;return that}function hasWeak(key){return isObject(key)&&has(key,WEAK)&&has(key[WEAK],this[UID])}var weakMethods={"delete":function(key){return hasWeak.call(this,key)&&delete key[WEAK][this[UID]]},has:hasWeak};WeakMap=getCollection(WeakMap,WEAKMAP,{get:function(key){if(isObject(key)&&has(key,WEAK))return key[WEAK][this[UID]]},set:function(key,value){return setWeak(this,key,value)}},weakMethods,true,true);WeakSet=getCollection(WeakSet,WEAKSET,{add:function(value){return setWeak(this,value,true)}},weakMethods,false,true)}();!function(){$define(PROTO,ARRAY,{includes:createArrayContains(true)});$define(PROTO,STRING,{at:createPointAt(true)});function createObjectToArray(isEntries){return function(object){var O=ES5Object(object),keys=getKeys(object),length=keys.length,i=0,result=Array(length),key;if(isEntries)while(length>i)result[i]=[key=keys[i++],O[key]];else while(length>i)result[i]=O[keys[i++]];return result}}$define(STATIC,OBJECT,{values:createObjectToArray(false),entries:createObjectToArray(true)});$define(STATIC,REGEXP,{escape:createReplacer(/([\\\-[\]{}()*+?.,^$|])/g,"\\$1",true)})}();!function(REFERENCE){REFERENCE_GET=getWellKnownSymbol(REFERENCE+"Get",true);var REFERENCE_SET=getWellKnownSymbol(REFERENCE+SET,true),REFERENCE_DELETE=getWellKnownSymbol(REFERENCE+"Delete",true);$define(STATIC,SYMBOL,{referenceGet:REFERENCE_GET,referenceSet:REFERENCE_SET,referenceDelete:REFERENCE_DELETE});hidden(FunctionProto,REFERENCE_GET,returnThis);function setMapMethods(Constructor){if(Constructor){var MapProto=Constructor[PROTOTYPE];hidden(MapProto,REFERENCE_GET,MapProto.get);hidden(MapProto,REFERENCE_SET,MapProto.set);hidden(MapProto,REFERENCE_DELETE,MapProto["delete"])}}setMapMethods(Map);setMapMethods(WeakMap)}("reference");!function(){function setArrayStatics(keys,length){$define(STATIC,ARRAY,turn.call(array(keys),function(memo,key){if(key in ArrayProto)memo[key]=ctx(call,ArrayProto[key],length)},{}))}setArrayStatics("pop,reverse,shift,keys,values,entries",1);setArrayStatics("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3);setArrayStatics("join,slice,concat,push,splice,unshift,sort,lastIndexOf,"+"reduce,reduceRight,copyWithin,fill,turn")}()}(Function("return this"),true)},{}],3:[function(require,module,exports){!function(){var hasOwn=Object.prototype.hasOwnProperty;var undefined;var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";if(typeof regeneratorRuntime==="object"){return}var runtime=regeneratorRuntime=typeof exports==="undefined"?{}:exports;function wrap(innerFn,outerFn,self,tryList){return new Generator(innerFn,outerFn,self||null,tryList||[])}runtime.wrap=wrap;var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed";var ContinueSentinel={};function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor=GeneratorFunction;GeneratorFunction.displayName="GeneratorFunction";runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function"&&genFun.constructor;return ctor?ctor===GeneratorFunction||(ctor.displayName||ctor.name)==="GeneratorFunction":false};runtime.mark=function(genFun){genFun.__proto__=GeneratorFunctionPrototype;genFun.prototype=Object.create(Gp);return genFun};runtime.async=function(innerFn,outerFn,self,tryList){return new Promise(function(resolve,reject){var generator=wrap(innerFn,outerFn,self,tryList);var callNext=step.bind(generator.next);var callThrow=step.bind(generator["throw"]);function step(arg){try{var info=this(arg);var value=info.value}catch(error){return reject(error)}if(info.done){resolve(value)}else{Promise.resolve(value).then(callNext,callThrow)}}callNext()})};function Generator(innerFn,outerFn,self,tryList){var generator=outerFn?Object.create(outerFn.prototype):this;var context=new Context(tryList);var state=GenStateSuspendedStart;function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running")}if(state===GenStateCompleted){return doneResult()}while(true){var delegate=context.delegate;if(delegate){try{var info=delegate.iterator[method](arg);method="next";arg=undefined}catch(uncaught){context.delegate=null;method="throw";arg=uncaught;continue}if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc}else{state=GenStateSuspendedYield;return info}context.delegate=null}if(method==="next"){if(state===GenStateSuspendedStart&&typeof arg!=="undefined"){throw new TypeError("attempt to send "+JSON.stringify(arg)+" to newborn generator")}if(state===GenStateSuspendedYield){context.sent=arg}else{delete context.sent}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg}if(context.dispatchException(arg)){method="next";arg=undefined}}else if(method==="return"){context.abrupt("return",arg)}state=GenStateExecuting;try{var value=innerFn.call(self,context);state=context.done?GenStateCompleted:GenStateSuspendedYield;var info={value:value,done:context.done};if(value===ContinueSentinel){if(context.delegate&&method==="next"){arg=undefined}}else{return info}}catch(thrown){state=GenStateCompleted;
if(method==="next"){context.dispatchException(thrown)}else{arg=thrown}}}}generator.next=invoke.bind(generator,"next");generator["throw"]=invoke.bind(generator,"throw");generator["return"]=invoke.bind(generator,"return");return generator}Gp[iteratorSymbol]=function(){return this};Gp.toString=function(){return"[object Generator]"};function pushTryEntry(triple){var entry={tryLoc:triple[0]};if(1 in triple){entry.catchLoc=triple[1]}if(2 in triple){entry.finallyLoc=triple[2]}this.tryEntries.push(entry)}function resetTryEntry(entry,i){var record=entry.completion||{};record.type=i===0?"normal":"return";delete record.arg;entry.completion=record}function Context(tryList){this.tryEntries=[{tryLoc:"root"}];tryList.forEach(pushTryEntry,this);this.reset()}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key)}keys.reverse();return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next}}next.done=true;return next}};function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable)}if(typeof iterable.next==="function"){return iterable}if(!isNaN(iterable.length)){var i=-1;function next(){while(++i<iterable.length){if(hasOwn.call(iterable,i)){next.value=iterable[i];next.done=false;return next}}next.value=undefined;next.done=true;return next}return next.next=next}}return{next:doneResult}}runtime.values=values;function doneResult(){return{value:undefined,done:true}}Context.prototype={constructor:Context,reset:function(){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);for(var tempIndex=0,tempName;hasOwn.call(this,tempName="t"+tempIndex)||tempIndex<20;++tempIndex){this[tempName]=null}},stop:function(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg}return this.rval},dispatchException:function(exception){if(this.done){throw exception}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){return handle("end")}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else{throw new Error("try statement without catch or finally")}}}},_findFinallyEntry:function(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&(entry.finallyLoc===finallyLoc||this.prev<entry.finallyLoc)){return entry}}},abrupt:function(type,arg){var entry=this._findFinallyEntry();var record=entry?entry.completion:{};record.type=type;record.arg=arg;if(entry){this.next=entry.finallyLoc}else{this.complete(record)}return ContinueSentinel},complete:function(record){if(record.type==="throw"){throw record.arg}if(record.type==="break"||record.type==="continue"){this.next=record.arg}else if(record.type==="return"){this.rval=record.arg;this.next="end"}return ContinueSentinel},finish:function(finallyLoc){var entry=this._findFinallyEntry(finallyLoc);return this.complete(entry.completion)},"catch":function(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;resetTryEntry(entry,i)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel}}}()},{}]},{},[1]);
},{}],2:[function(require,module,exports){
(function (global){
(function() {
  var Bacon, BufferingSource, Bus, CompositeUnsubscribe, ConsumingSource, Desc, Dispatcher, End, Error, Event, EventStream, Exception, Initial, Next, None, Observable, Property, PropertyDispatcher, Some, Source, UpdateBarrier, addPropertyInitValueToStream, assert, assertArray, assertEventStream, assertFunction, assertNoArguments, assertObservable, assertString, cloneArray, compositeUnsubscribe, constantToFunction, containsDuplicateDeps, convertArgsToFunction, describe, end, eventIdCounter, findDeps, flatMap_, former, idCounter, initial, isArray, isFieldKey, isFunction, isObservable, latter, liftCallback, makeFunction, makeFunctionArgs, makeFunction_, makeObservable, makeSpawner, next, nop, partiallyApplied, recursionDepth, registerObs, spys, toCombinator, toEvent, toFieldExtractor, toFieldKey, toOption, toSimpleExtractor, withDescription, withMethodCallSupport, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bacon = {
    toString: function() {
      return "Bacon";
    }
  };

  Bacon.version = '0.7.42';

  Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;

  _ = {
    indexOf: Array.prototype.indexOf ? function(xs, x) {
      return xs.indexOf(x);
    } : function(xs, x) {
      var i, y, _i, _len;
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        y = xs[i];
        if (x === y) {
          return i;
        }
      }
      return -1;
    },
    indexWhere: function(xs, f) {
      var i, y, _i, _len;
      for (i = _i = 0, _len = xs.length; _i < _len; i = ++_i) {
        y = xs[i];
        if (f(y)) {
          return i;
        }
      }
      return -1;
    },
    head: function(xs) {
      return xs[0];
    },
    always: function(x) {
      return function() {
        return x;
      };
    },
    negate: function(f) {
      return function(x) {
        return !f(x);
      };
    },
    empty: function(xs) {
      return xs.length === 0;
    },
    tail: function(xs) {
      return xs.slice(1, xs.length);
    },
    filter: function(f, xs) {
      var filtered, x, _i, _len;
      filtered = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if (f(x)) {
          filtered.push(x);
        }
      }
      return filtered;
    },
    map: function(f, xs) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        _results.push(f(x));
      }
      return _results;
    },
    each: function(xs, f) {
      var key, value;
      for (key in xs) {
        value = xs[key];
        f(key, value);
      }
      return void 0;
    },
    toArray: function(xs) {
      if (isArray(xs)) {
        return xs;
      } else {
        return [xs];
      }
    },
    contains: function(xs, x) {
      return _.indexOf(xs, x) !== -1;
    },
    id: function(x) {
      return x;
    },
    last: function(xs) {
      return xs[xs.length - 1];
    },
    all: function(xs, f) {
      var x, _i, _len;
      if (f == null) {
        f = _.id;
      }
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if (!f(x)) {
          return false;
        }
      }
      return true;
    },
    any: function(xs, f) {
      var x, _i, _len;
      if (f == null) {
        f = _.id;
      }
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        if (f(x)) {
          return true;
        }
      }
      return false;
    },
    without: function(x, xs) {
      return _.filter((function(y) {
        return y !== x;
      }), xs);
    },
    remove: function(x, xs) {
      var i;
      i = _.indexOf(xs, x);
      if (i >= 0) {
        return xs.splice(i, 1);
      }
    },
    fold: function(xs, seed, f) {
      var x, _i, _len;
      for (_i = 0, _len = xs.length; _i < _len; _i++) {
        x = xs[_i];
        seed = f(seed, x);
      }
      return seed;
    },
    flatMap: function(f, xs) {
      return _.fold(xs, [], (function(ys, x) {
        return ys.concat(f(x));
      }));
    },
    cached: function(f) {
      var value;
      value = None;
      return function() {
        if (value === None) {
          value = f();
          f = void 0;
        }
        return value;
      };
    },
    toString: function(obj) {
      var ex, internals, key, value;
      try {
        recursionDepth++;
        if (obj == null) {
          return "undefined";
        } else if (isFunction(obj)) {
          return "function";
        } else if (isArray(obj)) {
          if (recursionDepth > 5) {
            return "[..]";
          }
          return "[" + _.map(_.toString, obj).toString() + "]";
        } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
          return obj.toString();
        } else if (typeof obj === "object") {
          if (recursionDepth > 5) {
            return "{..}";
          }
          internals = (function() {
            var _results;
            _results = [];
            for (key in obj) {
              if (!__hasProp.call(obj, key)) continue;
              value = (function() {
                try {
                  return obj[key];
                } catch (_error) {
                  ex = _error;
                  return ex;
                }
              })();
              _results.push(_.toString(key) + ":" + _.toString(value));
            }
            return _results;
          })();
          return "{" + internals + "}";
        } else {
          return obj;
        }
      } finally {
        recursionDepth--;
      }
    }
  };

  recursionDepth = 0;

  Bacon._ = _;

  Bacon.scheduler = {
    setTimeout: function(f, d) {
      return setTimeout(f, d);
    },
    setInterval: function(f, i) {
      return setInterval(f, i);
    },
    clearInterval: function(id) {
      return clearInterval(id);
    },
    now: function() {
      return new Date().getTime();
    }
  };

  Bacon.fromBinder = function(binder, eventTransformer) {
    if (eventTransformer == null) {
      eventTransformer = _.id;
    }
    return new EventStream(describe(Bacon, "fromBinder", binder, eventTransformer), function(sink) {
      var needsUnbind, unbind, unbinder, unbound;
      unbound = false;
      needsUnbind = false;
      unbind = function() {
        if (!unbound) {
          if (typeof unbinder !== "undefined" && unbinder !== null) {
            unbinder();
            return unbound = true;
          } else {
            return needsUnbind = true;
          }
        }
      };
      unbinder = binder(function() {
        var args, event, reply, value, _i, _len;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        value = eventTransformer.apply(this, args);
        if (!(isArray(value) && _.last(value) instanceof Event)) {
          value = [value];
        }
        reply = Bacon.more;
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          event = value[_i];
          reply = sink(event = toEvent(event));
          if (reply === Bacon.noMore || event.isEnd()) {
            unbind();
            return reply;
          }
        }
        return reply;
      });
      if (needsUnbind) {
        unbind();
      }
      return unbind;
    });
  };

  Bacon.$ = {};

  Bacon.$.asEventStream = function(eventName, selector, eventTransformer) {
    var _ref;
    if (isFunction(selector)) {
      _ref = [selector, void 0], eventTransformer = _ref[0], selector = _ref[1];
    }
    return withDescription(this.selector || this, "asEventStream", eventName, Bacon.fromBinder((function(_this) {
      return function(handler) {
        _this.on(eventName, selector, handler);
        return function() {
          return _this.off(eventName, selector, handler);
        };
      };
    })(this), eventTransformer));
  };

  if ((_ref = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : typeof Zepto !== "undefined" && Zepto !== null ? Zepto : void 0) != null) {
    _ref.fn.asEventStream = Bacon.$.asEventStream;
  }

  Bacon.fromEventTarget = function(target, eventName, eventTransformer) {
    var sub, unsub, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    sub = (_ref1 = (_ref2 = (_ref3 = target.addEventListener) != null ? _ref3 : target.addListener) != null ? _ref2 : target.bind) != null ? _ref1 : target.on;
    unsub = (_ref4 = (_ref5 = (_ref6 = target.removeEventListener) != null ? _ref6 : target.removeListener) != null ? _ref5 : target.unbind) != null ? _ref4 : target.off;
    return withDescription(Bacon, "fromEventTarget", target, eventName, Bacon.fromBinder(function(handler) {
      sub.call(target, eventName, handler);
      return function() {
        return unsub.call(target, eventName, handler);
      };
    }, eventTransformer));
  };

  Bacon.fromPromise = function(promise, abort) {
    return withDescription(Bacon, "fromPromise", promise, Bacon.fromBinder(function(handler) {
      promise.then(handler, function(e) {
        return handler(new Error(e));
      });
      return function() {
        if (abort) {
          return typeof promise.abort === "function" ? promise.abort() : void 0;
        }
      };
    }, (function(value) {
      return [value, end()];
    })));
  };

  Bacon.noMore = ["<no-more>"];

  Bacon.more = ["<more>"];

  Bacon.later = function(delay, value) {
    return withDescription(Bacon, "later", delay, value, Bacon.fromPoll(delay, function() {
      return [value, end()];
    }));
  };

  Bacon.sequentially = function(delay, values) {
    var index;
    index = 0;
    return withDescription(Bacon, "sequentially", delay, values, Bacon.fromPoll(delay, function() {
      var value;
      value = values[index++];
      if (index < values.length) {
        return value;
      } else if (index === values.length) {
        return [value, end()];
      } else {
        return end();
      }
    }));
  };

  Bacon.repeatedly = function(delay, values) {
    var index;
    index = 0;
    return withDescription(Bacon, "repeatedly", delay, values, Bacon.fromPoll(delay, function() {
      return values[index++ % values.length];
    }));
  };

  Bacon.spy = function(spy) {
    return spys.push(spy);
  };

  spys = [];

  registerObs = function(obs) {
    var spy, _i, _len;
    if (spys.length) {
      if (!registerObs.running) {
        try {
          registerObs.running = true;
          for (_i = 0, _len = spys.length; _i < _len; _i++) {
            spy = spys[_i];
            spy(obs);
          }
        } finally {
          delete registerObs.running;
        }
      }
    }
    return void 0;
  };

  withMethodCallSupport = function(wrapped) {
    return function() {
      var args, context, f, methodName;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof f === "object" && args.length) {
        context = f;
        methodName = args[0];
        f = function() {
          return context[methodName].apply(context, arguments);
        };
        args = args.slice(1);
      }
      return wrapped.apply(null, [f].concat(__slice.call(args)));
    };
  };

  liftCallback = function(desc, wrapped) {
    return withMethodCallSupport(function() {
      var args, f, stream;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      stream = partiallyApplied(wrapped, [
        function(values, callback) {
          return f.apply(null, __slice.call(values).concat([callback]));
        }
      ]);
      return withDescription.apply(null, [Bacon, desc, f].concat(__slice.call(args), [Bacon.combineAsArray(args).flatMap(stream)]));
    });
  };

  Bacon.fromCallback = liftCallback("fromCallback", function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return Bacon.fromBinder(function(handler) {
      makeFunction(f, args)(handler);
      return nop;
    }, (function(value) {
      return [value, end()];
    }));
  });

  Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return Bacon.fromBinder(function(handler) {
      makeFunction(f, args)(handler);
      return nop;
    }, function(error, value) {
      if (error) {
        return [new Error(error), end()];
      }
      return [value, end()];
    });
  });

  Bacon.fromPoll = function(delay, poll) {
    return withDescription(Bacon, "fromPoll", delay, poll, Bacon.fromBinder((function(handler) {
      var id;
      id = Bacon.scheduler.setInterval(handler, delay);
      return function() {
        return Bacon.scheduler.clearInterval(id);
      };
    }), poll));
  };

  Bacon.interval = function(delay, value) {
    if (value == null) {
      value = {};
    }
    return withDescription(Bacon, "interval", delay, value, Bacon.fromPoll(delay, function() {
      return next(value);
    }));
  };

  Bacon.constant = function(value) {
    return new Property(describe(Bacon, "constant", value), function(sink) {
      sink(initial(value));
      sink(end());
      return nop;
    });
  };

  Bacon.never = function() {
    return new EventStream(describe(Bacon, "never"), function(sink) {
      sink(end());
      return nop;
    });
  };

  Bacon.once = function(value) {
    return new EventStream(describe(Bacon, "once", value), function(sink) {
      sink(toEvent(value));
      sink(end());
      return nop;
    });
  };

  Bacon.fromArray = function(values) {
    var i;
    assertArray(values);
    if (!values.length) {
      return withDescription(Bacon, "fromArray", values, Bacon.never());
    } else {
      i = 0;
      return new EventStream(describe(Bacon, "fromArray", values), function(sink) {
        var push, reply, unsubd;
        unsubd = false;
        reply = Bacon.more;
        push = function() {
          var value;
          if ((reply !== Bacon.noMore) && !unsubd) {
            value = values[i++];
            reply = sink(toEvent(value));
            if (reply !== Bacon.noMore) {
              if (i === values.length) {
                return sink(end());
              } else {
                return UpdateBarrier.afterTransaction(push);
              }
            }
          }
        };
        push();
        return function() {
          return unsubd = true;
        };
      });
    }
  };

  Bacon.mergeAll = function() {
    var streams;
    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (isArray(streams[0])) {
      streams = streams[0];
    }
    if (streams.length) {
      return new EventStream(describe.apply(null, [Bacon, "mergeAll"].concat(__slice.call(streams))), function(sink) {
        var ends, sinks, smartSink;
        ends = 0;
        smartSink = function(obs) {
          return function(unsubBoth) {
            return obs.dispatcher.subscribe(function(event) {
              var reply;
              if (event.isEnd()) {
                ends++;
                if (ends === streams.length) {
                  return sink(end());
                } else {
                  return Bacon.more;
                }
              } else {
                reply = sink(event);
                if (reply === Bacon.noMore) {
                  unsubBoth();
                }
                return reply;
              }
            });
          };
        };
        sinks = _.map(smartSink, streams);
        return compositeUnsubscribe.apply(null, sinks);
      });
    } else {
      return Bacon.never();
    }
  };

  Bacon.zipAsArray = function() {
    var streams;
    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (isArray(streams[0])) {
      streams = streams[0];
    }
    return withDescription.apply(null, [Bacon, "zipAsArray"].concat(__slice.call(streams), [Bacon.zipWith(streams, function() {
      var xs;
      xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return xs;
    })]));
  };

  Bacon.zipWith = function() {
    var f, streams, _ref1;
    f = arguments[0], streams = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (!isFunction(f)) {
      _ref1 = [f, streams[0]], streams = _ref1[0], f = _ref1[1];
    }
    streams = _.map((function(s) {
      return s.toEventStream();
    }), streams);
    return withDescription.apply(null, [Bacon, "zipWith", f].concat(__slice.call(streams), [Bacon.when(streams, f)]));
  };

  Bacon.groupSimultaneous = function() {
    var s, sources, streams;
    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (streams.length === 1 && isArray(streams[0])) {
      streams = streams[0];
    }
    sources = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = streams.length; _i < _len; _i++) {
        s = streams[_i];
        _results.push(new BufferingSource(s));
      }
      return _results;
    })();
    return withDescription.apply(null, [Bacon, "groupSimultaneous"].concat(__slice.call(streams), [Bacon.when(sources, (function() {
      var xs;
      xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return xs;
    }))]));
  };

  Bacon.combineAsArray = function() {
    var index, s, sources, stream, streams, _i, _len;
    streams = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (streams.length === 1 && isArray(streams[0])) {
      streams = streams[0];
    }
    for (index = _i = 0, _len = streams.length; _i < _len; index = ++_i) {
      stream = streams[index];
      if (!(isObservable(stream))) {
        streams[index] = Bacon.constant(stream);
      }
    }
    if (streams.length) {
      sources = (function() {
        var _j, _len1, _results;
        _results = [];
        for (_j = 0, _len1 = streams.length; _j < _len1; _j++) {
          s = streams[_j];
          _results.push(new Source(s, true));
        }
        return _results;
      })();
      return withDescription.apply(null, [Bacon, "combineAsArray"].concat(__slice.call(streams), [Bacon.when(sources, (function() {
        var xs;
        xs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return xs;
      })).toProperty()]));
    } else {
      return Bacon.constant([]);
    }
  };

  Bacon.onValues = function() {
    var f, streams, _i;
    streams = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), f = arguments[_i++];
    return Bacon.combineAsArray(streams).onValues(f);
  };

  Bacon.combineWith = function() {
    var f, streams;
    f = arguments[0], streams = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return withDescription.apply(null, [Bacon, "combineWith", f].concat(__slice.call(streams), [Bacon.combineAsArray(streams).map(function(values) {
      return f.apply(null, values);
    })]));
  };

  Bacon.combineTemplate = function(template) {
    var applyStreamValue, combinator, compile, compileTemplate, constantValue, current, funcs, mkContext, setValue, streams;
    funcs = [];
    streams = [];
    current = function(ctxStack) {
      return ctxStack[ctxStack.length - 1];
    };
    setValue = function(ctxStack, key, value) {
      return current(ctxStack)[key] = value;
    };
    applyStreamValue = function(key, index) {
      return function(ctxStack, values) {
        return setValue(ctxStack, key, values[index]);
      };
    };
    constantValue = function(key, value) {
      return function(ctxStack) {
        return setValue(ctxStack, key, value);
      };
    };
    mkContext = function(template) {
      if (isArray(template)) {
        return [];
      } else {
        return {};
      }
    };
    compile = function(key, value) {
      var popContext, pushContext;
      if (isObservable(value)) {
        streams.push(value);
        return funcs.push(applyStreamValue(key, streams.length - 1));
      } else if (value === Object(value) && typeof value !== "function" && !(value instanceof RegExp) && !(value instanceof Date)) {
        pushContext = function(key) {
          return function(ctxStack) {
            var newContext;
            newContext = mkContext(value);
            setValue(ctxStack, key, newContext);
            return ctxStack.push(newContext);
          };
        };
        popContext = function(ctxStack) {
          return ctxStack.pop();
        };
        funcs.push(pushContext(key));
        compileTemplate(value);
        return funcs.push(popContext);
      } else {
        return funcs.push(constantValue(key, value));
      }
    };
    compileTemplate = function(template) {
      return _.each(template, compile);
    };
    compileTemplate(template);
    combinator = function(values) {
      var ctxStack, f, rootContext, _i, _len;
      rootContext = mkContext(template);
      ctxStack = [rootContext];
      for (_i = 0, _len = funcs.length; _i < _len; _i++) {
        f = funcs[_i];
        f(ctxStack, values);
      }
      return rootContext;
    };
    return withDescription(Bacon, "combineTemplate", template, Bacon.combineAsArray(streams).map(combinator));
  };

  Bacon.retry = function(options) {
    var delay, isRetryable, maxRetries, retries, retry, source;
    if (!isFunction(options.source)) {
      throw new Exception("'source' option has to be a function");
    }
    source = options.source;
    retries = options.retries || 0;
    maxRetries = options.maxRetries || retries;
    delay = options.delay || function() {
      return 0;
    };
    isRetryable = options.isRetryable || function() {
      return true;
    };
    retry = function(context) {
      var delayedRetry, nextAttemptOptions;
      nextAttemptOptions = {
        source: source,
        retries: retries - 1,
        maxRetries: maxRetries,
        delay: delay,
        isRetryable: isRetryable
      };
      delayedRetry = function() {
        return Bacon.retry(nextAttemptOptions);
      };
      return Bacon.later(delay(context)).filter(false).concat(Bacon.once().flatMap(delayedRetry));
    };
    return withDescription(Bacon, "retry", options, source().flatMapError(function(e) {
      if (isRetryable(e) && retries > 0) {
        return retry({
          error: e,
          retriesDone: maxRetries - retries
        });
      } else {
        return Bacon.once(new Error(e));
      }
    }));
  };

  eventIdCounter = 0;

  Event = (function() {
    function Event() {
      this.id = ++eventIdCounter;
    }

    Event.prototype.isEvent = function() {
      return true;
    };

    Event.prototype.isEnd = function() {
      return false;
    };

    Event.prototype.isInitial = function() {
      return false;
    };

    Event.prototype.isNext = function() {
      return false;
    };

    Event.prototype.isError = function() {
      return false;
    };

    Event.prototype.hasValue = function() {
      return false;
    };

    Event.prototype.filter = function() {
      return true;
    };

    Event.prototype.inspect = function() {
      return this.toString();
    };

    Event.prototype.log = function() {
      return this.toString();
    };

    return Event;

  })();

  Next = (function(_super) {
    __extends(Next, _super);

    function Next(valueF, eager) {
      Next.__super__.constructor.call(this);
      if (!eager && isFunction(valueF) || valueF instanceof Next) {
        this.valueF = valueF;
        this.valueInternal = void 0;
      } else {
        this.valueF = void 0;
        this.valueInternal = valueF;
      }
    }

    Next.prototype.isNext = function() {
      return true;
    };

    Next.prototype.hasValue = function() {
      return true;
    };

    Next.prototype.value = function() {
      if (this.valueF instanceof Next) {
        this.valueInternal = this.valueF.value();
        this.valueF = void 0;
      } else if (this.valueF) {
        this.valueInternal = this.valueF();
        this.valueF = void 0;
      }
      return this.valueInternal;
    };

    Next.prototype.fmap = function(f) {
      var event, value;
      if (this.valueInternal) {
        value = this.valueInternal;
        return this.apply(function() {
          return f(value);
        });
      } else {
        event = this;
        return this.apply(function() {
          return f(event.value());
        });
      }
    };

    Next.prototype.apply = function(value) {
      return new Next(value);
    };

    Next.prototype.filter = function(f) {
      return f(this.value());
    };

    Next.prototype.toString = function() {
      return _.toString(this.value());
    };

    Next.prototype.log = function() {
      return this.value();
    };

    return Next;

  })(Event);

  Initial = (function(_super) {
    __extends(Initial, _super);

    function Initial() {
      return Initial.__super__.constructor.apply(this, arguments);
    }

    Initial.prototype.isInitial = function() {
      return true;
    };

    Initial.prototype.isNext = function() {
      return false;
    };

    Initial.prototype.apply = function(value) {
      return new Initial(value);
    };

    Initial.prototype.toNext = function() {
      return new Next(this);
    };

    return Initial;

  })(Next);

  End = (function(_super) {
    __extends(End, _super);

    function End() {
      return End.__super__.constructor.apply(this, arguments);
    }

    End.prototype.isEnd = function() {
      return true;
    };

    End.prototype.fmap = function() {
      return this;
    };

    End.prototype.apply = function() {
      return this;
    };

    End.prototype.toString = function() {
      return "<end>";
    };

    return End;

  })(Event);

  Error = (function(_super) {
    __extends(Error, _super);

    function Error(error) {
      this.error = error;
    }

    Error.prototype.isError = function() {
      return true;
    };

    Error.prototype.fmap = function() {
      return this;
    };

    Error.prototype.apply = function() {
      return this;
    };

    Error.prototype.toString = function() {
      return "<error> " + _.toString(this.error);
    };

    return Error;

  })(Event);

  idCounter = 0;

  Observable = (function() {
    function Observable(desc) {
      this.id = ++idCounter;
      withDescription(desc, this);
      this.initialDesc = this.desc;
    }

    Observable.prototype.subscribe = function(sink) {
      return UpdateBarrier.wrappedSubscribe(this, sink);
    };

    Observable.prototype.subscribeInternal = function(sink) {
      return this.dispatcher.subscribe(sink);
    };

    Observable.prototype.onValue = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.hasValue()) {
          return f(event.value());
        }
      });
    };

    Observable.prototype.onValues = function(f) {
      return this.onValue(function(args) {
        return f.apply(null, args);
      });
    };

    Observable.prototype.onError = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.isError()) {
          return f(event.error);
        }
      });
    };

    Observable.prototype.onEnd = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return this.subscribe(function(event) {
        if (event.isEnd()) {
          return f();
        }
      });
    };

    Observable.prototype.errors = function() {
      return withDescription(this, "errors", this.filter(function() {
        return false;
      }));
    };

    Observable.prototype.filter = function() {
      var args, f;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return convertArgsToFunction(this, f, args, function(f) {
        return withDescription(this, "filter", f, this.withHandler(function(event) {
          if (event.filter(f)) {
            return this.push(event);
          } else {
            return Bacon.more;
          }
        }));
      });
    };

    Observable.prototype.takeWhile = function() {
      var args, f;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return convertArgsToFunction(this, f, args, function(f) {
        return withDescription(this, "takeWhile", f, this.withHandler(function(event) {
          if (event.filter(f)) {
            return this.push(event);
          } else {
            this.push(end());
            return Bacon.noMore;
          }
        }));
      });
    };

    Observable.prototype.endOnError = function() {
      var args, f;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (f == null) {
        f = true;
      }
      return convertArgsToFunction(this, f, args, function(f) {
        return withDescription(this, "endOnError", this.withHandler(function(event) {
          if (event.isError() && f(event.error)) {
            this.push(event);
            return this.push(end());
          } else {
            return this.push(event);
          }
        }));
      });
    };

    Observable.prototype.take = function(count) {
      if (count <= 0) {
        return Bacon.never();
      }
      return withDescription(this, "take", count, this.withHandler(function(event) {
        if (!event.hasValue()) {
          return this.push(event);
        } else {
          count--;
          if (count > 0) {
            return this.push(event);
          } else {
            if (count === 0) {
              this.push(event);
            }
            this.push(end());
            return Bacon.noMore;
          }
        }
      }));
    };

    Observable.prototype.map = function() {
      var args, p;
      p = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (p instanceof Property) {
        return p.sampledBy(this, former);
      } else {
        return convertArgsToFunction(this, p, args, function(f) {
          return withDescription(this, "map", f, this.withHandler(function(event) {
            return this.push(event.fmap(f));
          }));
        });
      }
    };

    Observable.prototype.mapError = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return withDescription(this, "mapError", f, this.withHandler(function(event) {
        if (event.isError()) {
          return this.push(next(f(event.error)));
        } else {
          return this.push(event);
        }
      }));
    };

    Observable.prototype.mapEnd = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return withDescription(this, "mapEnd", f, this.withHandler(function(event) {
        if (event.isEnd()) {
          this.push(next(f(event)));
          this.push(end());
          return Bacon.noMore;
        } else {
          return this.push(event);
        }
      }));
    };

    Observable.prototype.doAction = function() {
      var f;
      f = makeFunctionArgs(arguments);
      return withDescription(this, "doAction", f, this.withHandler(function(event) {
        if (event.hasValue()) {
          f(event.value());
        }
        return this.push(event);
      }));
    };

    Observable.prototype.skip = function(count) {
      return withDescription(this, "skip", count, this.withHandler(function(event) {
        if (!event.hasValue()) {
          return this.push(event);
        } else if (count > 0) {
          count--;
          return Bacon.more;
        } else {
          return this.push(event);
        }
      }));
    };

    Observable.prototype.skipDuplicates = function(isEqual) {
      if (isEqual == null) {
        isEqual = function(a, b) {
          return a === b;
        };
      }
      return withDescription(this, "skipDuplicates", this.withStateMachine(None, function(prev, event) {
        if (!event.hasValue()) {
          return [prev, [event]];
        } else if (event.isInitial() || prev === None || !isEqual(prev.get(), event.value())) {
          return [new Some(event.value()), [event]];
        } else {
          return [prev, []];
        }
      }));
    };

    Observable.prototype.skipErrors = function() {
      return withDescription(this, "skipErrors", this.withHandler(function(event) {
        if (event.isError()) {
          return Bacon.more;
        } else {
          return this.push(event);
        }
      }));
    };

    Observable.prototype.withStateMachine = function(initState, f) {
      var state;
      state = initState;
      return withDescription(this, "withStateMachine", initState, f, this.withHandler(function(event) {
        var fromF, newState, output, outputs, reply, _i, _len;
        fromF = f(state, event);
        newState = fromF[0], outputs = fromF[1];
        state = newState;
        reply = Bacon.more;
        for (_i = 0, _len = outputs.length; _i < _len; _i++) {
          output = outputs[_i];
          reply = this.push(output);
          if (reply === Bacon.noMore) {
            return reply;
          }
        }
        return reply;
      }));
    };

    Observable.prototype.scan = function(seed, f) {
      var acc, resultProperty, subscribe;
      f = toCombinator(f);
      acc = toOption(seed);
      subscribe = (function(_this) {
        return function(sink) {
          var initSent, reply, sendInit, unsub;
          initSent = false;
          unsub = nop;
          reply = Bacon.more;
          sendInit = function() {
            if (!initSent) {
              return acc.forEach(function(value) {
                initSent = true;
                reply = sink(new Initial(function() {
                  return value;
                }));
                if (reply === Bacon.noMore) {
                  unsub();
                  return unsub = nop;
                }
              });
            }
          };
          unsub = _this.dispatcher.subscribe(function(event) {
            var next, prev;
            if (event.hasValue()) {
              if (initSent && event.isInitial()) {
                return Bacon.more;
              } else {
                if (!event.isInitial()) {
                  sendInit();
                }
                initSent = true;
                prev = acc.getOrElse(void 0);
                next = f(prev, event.value());
                acc = new Some(next);
                return sink(event.apply(function() {
                  return next;
                }));
              }
            } else {
              if (event.isEnd()) {
                reply = sendInit();
              }
              if (reply !== Bacon.noMore) {
                return sink(event);
              }
            }
          });
          UpdateBarrier.whenDoneWith(resultProperty, sendInit);
          return unsub;
        };
      })(this);
      return resultProperty = new Property(describe(this, "scan", seed, f), subscribe);
    };

    Observable.prototype.fold = function(seed, f) {
      return withDescription(this, "fold", seed, f, this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
    };

    Observable.prototype.zip = function(other, f) {
      if (f == null) {
        f = Array;
      }
      return withDescription(this, "zip", other, Bacon.zipWith([this, other], f));
    };

    Observable.prototype.diff = function(start, f) {
      f = toCombinator(f);
      return withDescription(this, "diff", start, f, this.scan([start], function(prevTuple, next) {
        return [next, f(prevTuple[0], next)];
      }).filter(function(tuple) {
        return tuple.length === 2;
      }).map(function(tuple) {
        return tuple[1];
      }));
    };

    Observable.prototype.flatMap = function() {
      return flatMap_(this, makeSpawner(arguments));
    };

    Observable.prototype.flatMapFirst = function() {
      return flatMap_(this, makeSpawner(arguments), true);
    };

    Observable.prototype.flatMapWithConcurrencyLimit = function() {
      var args, limit;
      limit = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return withDescription.apply(null, [this, "flatMapWithConcurrencyLimit", limit].concat(__slice.call(args), [flatMap_(this, makeSpawner(args), false, limit)]));
    };

    Observable.prototype.flatMapLatest = function() {
      var f, stream;
      f = makeSpawner(arguments);
      stream = this.toEventStream();
      return withDescription(this, "flatMapLatest", f, stream.flatMap(function(value) {
        return makeObservable(f(value)).takeUntil(stream);
      }));
    };

    Observable.prototype.flatMapError = function(fn) {
      return withDescription(this, "flatMapError", fn, this.mapError(function(err) {
        return new Error(err);
      }).flatMap(function(x) {
        if (x instanceof Error) {
          return fn(x.error);
        } else {
          return Bacon.once(x);
        }
      }));
    };

    Observable.prototype.flatMapConcat = function() {
      return withDescription.apply(null, [this, "flatMapConcat"].concat(__slice.call(arguments), [this.flatMapWithConcurrencyLimit.apply(this, [1].concat(__slice.call(arguments)))]));
    };

    Observable.prototype.bufferingThrottle = function(minimumInterval) {
      return withDescription(this, "bufferingThrottle", minimumInterval, this.flatMapConcat(function(x) {
        return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
      }));
    };

    Observable.prototype.not = function() {
      return withDescription(this, "not", this.map(function(x) {
        return !x;
      }));
    };

    Observable.prototype.log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.subscribe(function(event) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, __slice.call(args).concat([event.log()])) : void 0 : void 0;
      });
      return this;
    };

    Observable.prototype.slidingWindow = function(n, minValues) {
      if (minValues == null) {
        minValues = 0;
      }
      return withDescription(this, "slidingWindow", n, minValues, this.scan([], (function(window, value) {
        return window.concat([value]).slice(-n);
      })).filter((function(values) {
        return values.length >= minValues;
      })));
    };

    Observable.prototype.combine = function(other, f) {
      var combinator;
      combinator = toCombinator(f);
      return withDescription(this, "combine", other, f, Bacon.combineAsArray(this, other).map(function(values) {
        return combinator(values[0], values[1]);
      }));
    };

    Observable.prototype.decode = function(cases) {
      return withDescription(this, "decode", cases, this.combine(Bacon.combineTemplate(cases), function(key, values) {
        return values[key];
      }));
    };

    Observable.prototype.awaiting = function(other) {
      return withDescription(this, "awaiting", other, Bacon.groupSimultaneous(this, other).map(function(_arg) {
        var myValues, otherValues;
        myValues = _arg[0], otherValues = _arg[1];
        return otherValues.length === 0;
      }).toProperty(false).skipDuplicates());
    };

    Observable.prototype.name = function(name) {
      this._name = name;
      return this;
    };

    Observable.prototype.withDescription = function() {
      return describe.apply(null, arguments).apply(this);
    };

    Observable.prototype.toString = function() {
      if (this._name) {
        return this._name;
      } else {
        return this.desc.toString();
      }
    };

    Observable.prototype.internalDeps = function() {
      return this.initialDesc.deps();
    };

    return Observable;

  })();

  Observable.prototype.reduce = Observable.prototype.fold;

  Observable.prototype.assign = Observable.prototype.onValue;

  Observable.prototype.inspect = Observable.prototype.toString;

  flatMap_ = function(root, f, firstOnly, limit) {
    var childDeps, result, rootDep;
    rootDep = [root];
    childDeps = [];
    result = new EventStream(describe(root, "flatMap" + (firstOnly ? "First" : ""), f), function(sink) {
      var checkEnd, checkQueue, composite, queue, spawn;
      composite = new CompositeUnsubscribe();
      queue = [];
      spawn = function(event) {
        var child;
        child = makeObservable(f(event.value()));
        childDeps.push(child);
        return composite.add(function(unsubAll, unsubMe) {
          return child.dispatcher.subscribe(function(event) {
            var reply;
            if (event.isEnd()) {
              _.remove(child, childDeps);
              checkQueue();
              checkEnd(unsubMe);
              return Bacon.noMore;
            } else {
              if (event instanceof Initial) {
                event = event.toNext();
              }
              reply = sink(event);
              if (reply === Bacon.noMore) {
                unsubAll();
              }
              return reply;
            }
          });
        });
      };
      checkQueue = function() {
        var event;
        event = queue.shift();
        if (event) {
          return spawn(event);
        }
      };
      checkEnd = function(unsub) {
        unsub();
        if (composite.empty()) {
          return sink(end());
        }
      };
      composite.add(function(__, unsubRoot) {
        return root.dispatcher.subscribe(function(event) {
          if (event.isEnd()) {
            return checkEnd(unsubRoot);
          } else if (event.isError()) {
            return sink(event);
          } else if (firstOnly && composite.count() > 1) {
            return Bacon.more;
          } else {
            if (composite.unsubscribed) {
              return Bacon.noMore;
            }
            if (limit && composite.count() > limit) {
              return queue.push(event);
            } else {
              return spawn(event);
            }
          }
        });
      });
      return composite.unsubscribe;
    });
    result.internalDeps = function() {
      if (childDeps.length) {
        return rootDep.concat(childDeps);
      } else {
        return rootDep;
      }
    };
    return result;
  };

  EventStream = (function(_super) {
    __extends(EventStream, _super);

    function EventStream(desc, subscribe, handler) {
      if (isFunction(desc)) {
        handler = subscribe;
        subscribe = desc;
        desc = [];
      }
      EventStream.__super__.constructor.call(this, desc);
      assertFunction(subscribe);
      this.dispatcher = new Dispatcher(subscribe, handler);
      registerObs(this);
    }

    EventStream.prototype.delay = function(delay) {
      return withDescription(this, "delay", delay, this.flatMap(function(value) {
        return Bacon.later(delay, value);
      }));
    };

    EventStream.prototype.debounce = function(delay) {
      return withDescription(this, "debounce", delay, this.flatMapLatest(function(value) {
        return Bacon.later(delay, value);
      }));
    };

    EventStream.prototype.debounceImmediate = function(delay) {
      return withDescription(this, "debounceImmediate", delay, this.flatMapFirst(function(value) {
        return Bacon.once(value).concat(Bacon.later(delay).filter(false));
      }));
    };

    EventStream.prototype.throttle = function(delay) {
      return withDescription(this, "throttle", delay, this.bufferWithTime(delay).map(function(values) {
        return values[values.length - 1];
      }));
    };

    EventStream.prototype.bufferWithTime = function(delay) {
      return withDescription(this, "bufferWithTime", delay, this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
    };

    EventStream.prototype.bufferWithCount = function(count) {
      return withDescription(this, "bufferWithCount", count, this.bufferWithTimeOrCount(void 0, count));
    };

    EventStream.prototype.bufferWithTimeOrCount = function(delay, count) {
      var flushOrSchedule;
      flushOrSchedule = function(buffer) {
        if (buffer.values.length === count) {
          return buffer.flush();
        } else if (delay !== void 0) {
          return buffer.schedule();
        }
      };
      return withDescription(this, "bufferWithTimeOrCount", delay, count, this.buffer(delay, flushOrSchedule, flushOrSchedule));
    };

    EventStream.prototype.buffer = function(delay, onInput, onFlush) {
      var buffer, delayMs, reply;
      if (onInput == null) {
        onInput = nop;
      }
      if (onFlush == null) {
        onFlush = nop;
      }
      buffer = {
        scheduled: false,
        end: void 0,
        values: [],
        flush: function() {
          var reply;
          this.scheduled = false;
          if (this.values.length > 0) {
            reply = this.push(next(this.values));
            this.values = [];
            if (this.end != null) {
              return this.push(this.end);
            } else if (reply !== Bacon.noMore) {
              return onFlush(this);
            }
          } else {
            if (this.end != null) {
              return this.push(this.end);
            }
          }
        },
        schedule: function() {
          if (!this.scheduled) {
            this.scheduled = true;
            return delay((function(_this) {
              return function() {
                return _this.flush();
              };
            })(this));
          }
        }
      };
      reply = Bacon.more;
      if (!isFunction(delay)) {
        delayMs = delay;
        delay = function(f) {
          return Bacon.scheduler.setTimeout(f, delayMs);
        };
      }
      return withDescription(this, "buffer", this.withHandler(function(event) {
        buffer.push = (function(_this) {
          return function(event) {
            return _this.push(event);
          };
        })(this);
        if (event.isError()) {
          reply = this.push(event);
        } else if (event.isEnd()) {
          buffer.end = event;
          if (!buffer.scheduled) {
            buffer.flush();
          }
        } else {
          buffer.values.push(event.value());
          onInput(buffer);
        }
        return reply;
      }));
    };

    EventStream.prototype.merge = function(right) {
      var left;
      assertEventStream(right);
      left = this;
      return withDescription(left, "merge", right, Bacon.mergeAll(this, right));
    };

    EventStream.prototype.toProperty = function(initValue_) {
      var disp, initValue;
      initValue = arguments.length === 0 ? None : toOption(function() {
        return initValue_;
      });
      disp = this.dispatcher;
      return new Property(describe(this, "toProperty", initValue_), function(sink) {
        var initSent, reply, sendInit, unsub;
        initSent = false;
        unsub = nop;
        reply = Bacon.more;
        sendInit = function() {
          if (!initSent) {
            return initValue.forEach(function(value) {
              initSent = true;
              reply = sink(new Initial(value));
              if (reply === Bacon.noMore) {
                unsub();
                return unsub = nop;
              }
            });
          }
        };
        unsub = disp.subscribe(function(event) {
          if (event.hasValue()) {
            if (initSent && event.isInitial()) {
              return Bacon.more;
            } else {
              if (!event.isInitial()) {
                sendInit();
              }
              initSent = true;
              initValue = new Some(event);
              return sink(event);
            }
          } else {
            if (event.isEnd()) {
              reply = sendInit();
            }
            if (reply !== Bacon.noMore) {
              return sink(event);
            }
          }
        });
        sendInit();
        return unsub;
      });
    };

    EventStream.prototype.toEventStream = function() {
      return this;
    };

    EventStream.prototype.sampledBy = function(sampler, combinator) {
      return withDescription(this, "sampledBy", sampler, combinator, this.toProperty().sampledBy(sampler, combinator));
    };

    EventStream.prototype.concat = function(right) {
      var left;
      left = this;
      return new EventStream(describe(left, "concat", right), function(sink) {
        var unsubLeft, unsubRight;
        unsubRight = nop;
        unsubLeft = left.dispatcher.subscribe(function(e) {
          if (e.isEnd()) {
            return unsubRight = right.dispatcher.subscribe(sink);
          } else {
            return sink(e);
          }
        });
        return function() {
          unsubLeft();
          return unsubRight();
        };
      });
    };

    EventStream.prototype.takeUntil = function(stopper) {
      var endMarker;
      endMarker = {};
      return withDescription(this, "takeUntil", stopper, Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function(event) {
        var data, reply, value, _i, _len, _ref1;
        if (!event.hasValue()) {
          return this.push(event);
        } else {
          _ref1 = event.value(), data = _ref1[0], stopper = _ref1[1];
          if (stopper.length) {
            return this.push(end());
          } else {
            reply = Bacon.more;
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              value = data[_i];
              if (value === endMarker) {
                reply = this.push(end());
              } else {
                reply = this.push(next(value));
              }
            }
            return reply;
          }
        }
      }));
    };

    EventStream.prototype.skipUntil = function(starter) {
      var started;
      started = starter.take(1).map(true).toProperty(false);
      return withDescription(this, "skipUntil", starter, this.filter(started));
    };

    EventStream.prototype.skipWhile = function() {
      var args, f, ok;
      f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ok = false;
      return convertArgsToFunction(this, f, args, function(f) {
        return withDescription(this, "skipWhile", f, this.withHandler(function(event) {
          if (ok || !event.hasValue() || !f(event.value())) {
            if (event.hasValue()) {
              ok = true;
            }
            return this.push(event);
          } else {
            return Bacon.more;
          }
        }));
      });
    };

    EventStream.prototype.holdWhen = function(valve) {
      var putToHold, releaseHold, valve_;
      valve_ = valve.startWith(false);
      releaseHold = valve_.filter(function(x) {
        return !x;
      });
      putToHold = valve_.filter(_.id);
      return withDescription(this, "holdWhen", valve, this.filter(false).merge(valve_.flatMapConcat((function(_this) {
        return function(shouldHold) {
          if (!shouldHold) {
            return _this.takeUntil(putToHold);
          } else {
            return _this.scan([], (function(xs, x) {
              return xs.concat(x);
            })).sampledBy(releaseHold).take(1).flatMap(Bacon.fromArray);
          }
        };
      })(this))));
    };

    EventStream.prototype.startWith = function(seed) {
      return withDescription(this, "startWith", seed, Bacon.once(seed).concat(this));
    };

    EventStream.prototype.withHandler = function(handler) {
      return new EventStream(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
    };

    return EventStream;

  })(Observable);

  Property = (function(_super) {
    __extends(Property, _super);

    function Property(desc, subscribe, handler) {
      if (isFunction(desc)) {
        handler = subscribe;
        subscribe = desc;
        desc = [];
      }
      Property.__super__.constructor.call(this, desc);
      assertFunction(subscribe);
      this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
      registerObs(this);
    }

    Property.prototype.sampledBy = function(sampler, combinator) {
      var lazy, result, samplerSource, stream, thisSource;
      if (combinator != null) {
        combinator = toCombinator(combinator);
      } else {
        lazy = true;
        combinator = function(f) {
          return f.value();
        };
      }
      thisSource = new Source(this, false, lazy);
      samplerSource = new Source(sampler, true, lazy);
      stream = Bacon.when([thisSource, samplerSource], combinator);
      result = sampler instanceof Property ? stream.toProperty() : stream;
      return withDescription(this, "sampledBy", sampler, combinator, result);
    };

    Property.prototype.sample = function(interval) {
      return withDescription(this, "sample", interval, this.sampledBy(Bacon.interval(interval, {})));
    };

    Property.prototype.changes = function() {
      return new EventStream(describe(this, "changes"), (function(_this) {
        return function(sink) {
          return _this.dispatcher.subscribe(function(event) {
            if (!event.isInitial()) {
              return sink(event);
            }
          });
        };
      })(this));
    };

    Property.prototype.withHandler = function(handler) {
      return new Property(describe(this, "withHandler", handler), this.dispatcher.subscribe, handler);
    };

    Property.prototype.toProperty = function() {
      assertNoArguments(arguments);
      return this;
    };

    Property.prototype.toEventStream = function() {
      return new EventStream(describe(this, "toEventStream"), (function(_this) {
        return function(sink) {
          return _this.dispatcher.subscribe(function(event) {
            if (event.isInitial()) {
              event = event.toNext();
            }
            return sink(event);
          });
        };
      })(this));
    };

    Property.prototype.and = function(other) {
      return withDescription(this, "and", other, this.combine(other, function(x, y) {
        return x && y;
      }));
    };

    Property.prototype.or = function(other) {
      return withDescription(this, "or", other, this.combine(other, function(x, y) {
        return x || y;
      }));
    };

    Property.prototype.delay = function(delay) {
      return this.delayChanges("delay", delay, function(changes) {
        return changes.delay(delay);
      });
    };

    Property.prototype.debounce = function(delay) {
      return this.delayChanges("debounce", delay, function(changes) {
        return changes.debounce(delay);
      });
    };

    Property.prototype.throttle = function(delay) {
      return this.delayChanges("throttle", delay, function(changes) {
        return changes.throttle(delay);
      });
    };

    Property.prototype.delayChanges = function() {
      var desc, f, _i;
      desc = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), f = arguments[_i++];
      return withDescription.apply(null, [this].concat(__slice.call(desc), [addPropertyInitValueToStream(this, f(this.changes()))]));
    };

    Property.prototype.takeUntil = function(stopper) {
      var changes;
      changes = this.changes().takeUntil(stopper);
      return withDescription(this, "takeUntil", stopper, addPropertyInitValueToStream(this, changes));
    };

    Property.prototype.startWith = function(value) {
      return withDescription(this, "startWith", value, this.scan(value, function(prev, next) {
        return next;
      }));
    };

    Property.prototype.bufferingThrottle = function() {
      var _ref1;
      return (_ref1 = Property.__super__.bufferingThrottle.apply(this, arguments)).bufferingThrottle.apply(_ref1, arguments).toProperty();
    };

    return Property;

  })(Observable);

  convertArgsToFunction = function(obs, f, args, method) {
    var sampled;
    if (f instanceof Property) {
      sampled = f.sampledBy(obs, function(p, s) {
        return [p, s];
      });
      return method.call(sampled, function(_arg) {
        var p, s;
        p = _arg[0], s = _arg[1];
        return p;
      }).map(function(_arg) {
        var p, s;
        p = _arg[0], s = _arg[1];
        return s;
      });
    } else {
      f = makeFunction(f, args);
      return method.call(obs, f);
    }
  };

  addPropertyInitValueToStream = function(property, stream) {
    var justInitValue;
    justInitValue = new EventStream(describe(property, "justInitValue"), function(sink) {
      var unsub, value;
      value = void 0;
      unsub = property.dispatcher.subscribe(function(event) {
        if (!event.isEnd()) {
          value = event;
        }
        return Bacon.noMore;
      });
      UpdateBarrier.whenDoneWith(justInitValue, function() {
        if (value != null) {
          sink(value);
        }
        return sink(end());
      });
      return unsub;
    });
    return justInitValue.concat(stream).toProperty();
  };

  Dispatcher = (function() {
    function Dispatcher(_subscribe, _handleEvent) {
      this._subscribe = _subscribe;
      this._handleEvent = _handleEvent;
      this.subscribe = __bind(this.subscribe, this);
      this.handleEvent = __bind(this.handleEvent, this);
      this.subscriptions = [];
      this.queue = [];
      this.pushing = false;
      this.ended = false;
      this.prevError = void 0;
      this.unsubSrc = void 0;
    }

    Dispatcher.prototype.hasSubscribers = function() {
      return this.subscriptions.length > 0;
    };

    Dispatcher.prototype.removeSub = function(subscription) {
      return this.subscriptions = _.without(subscription, this.subscriptions);
    };

    Dispatcher.prototype.push = function(event) {
      if (event.isEnd()) {
        this.ended = true;
      }
      return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
    };

    Dispatcher.prototype.pushToSubscriptions = function(event) {
      var e, reply, sub, tmp, _i, _len;
      try {
        tmp = this.subscriptions;
        for (_i = 0, _len = tmp.length; _i < _len; _i++) {
          sub = tmp[_i];
          reply = sub.sink(event);
          if (reply === Bacon.noMore || event.isEnd()) {
            this.removeSub(sub);
          }
        }
        return true;
      } catch (_error) {
        e = _error;
        this.pushing = false;
        this.queue = [];
        throw e;
      }
    };

    Dispatcher.prototype.pushIt = function(event) {
      if (!this.pushing) {
        if (event === this.prevError) {
          return;
        }
        if (event.isError()) {
          this.prevError = event;
        }
        this.pushing = true;
        this.pushToSubscriptions(event);
        this.pushing = false;
        while (this.queue.length) {
          event = this.queue.shift();
          this.push(event);
        }
        if (this.hasSubscribers()) {
          return Bacon.more;
        } else {
          this.unsubscribeFromSource();
          return Bacon.noMore;
        }
      } else {
        this.queue.push(event);
        return Bacon.more;
      }
    };

    Dispatcher.prototype.handleEvent = function(event) {
      if (this._handleEvent) {
        return this._handleEvent(event);
      } else {
        return this.push(event);
      }
    };

    Dispatcher.prototype.unsubscribeFromSource = function() {
      if (this.unsubSrc) {
        this.unsubSrc();
      }
      return this.unsubSrc = void 0;
    };

    Dispatcher.prototype.subscribe = function(sink) {
      var subscription;
      if (this.ended) {
        sink(end());
        return nop;
      } else {
        assertFunction(sink);
        subscription = {
          sink: sink
        };
        this.subscriptions.push(subscription);
        if (this.subscriptions.length === 1) {
          this.unsubSrc = this._subscribe(this.handleEvent);
          assertFunction(this.unsubSrc);
        }
        return (function(_this) {
          return function() {
            _this.removeSub(subscription);
            if (!_this.hasSubscribers()) {
              return _this.unsubscribeFromSource();
            }
          };
        })(this);
      }
    };

    return Dispatcher;

  })();

  PropertyDispatcher = (function(_super) {
    __extends(PropertyDispatcher, _super);

    function PropertyDispatcher(property, subscribe, handleEvent) {
      this.property = property;
      this.subscribe = __bind(this.subscribe, this);
      PropertyDispatcher.__super__.constructor.call(this, subscribe, handleEvent);
      this.current = None;
      this.currentValueRootId = void 0;
      this.propertyEnded = false;
    }

    PropertyDispatcher.prototype.push = function(event) {
      if (event.isEnd()) {
        this.propertyEnded = true;
      }
      if (event.hasValue()) {
        this.current = new Some(event);
        this.currentValueRootId = UpdateBarrier.currentEventId();
      }
      return PropertyDispatcher.__super__.push.call(this, event);
    };

    PropertyDispatcher.prototype.maybeSubSource = function(sink, reply) {
      if (reply === Bacon.noMore) {
        return nop;
      } else if (this.propertyEnded) {
        sink(end());
        return nop;
      } else {
        return Dispatcher.prototype.subscribe.call(this, sink);
      }
    };

    PropertyDispatcher.prototype.subscribe = function(sink) {
      var dispatchingId, initSent, reply, valId;
      initSent = false;
      reply = Bacon.more;
      if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
        dispatchingId = UpdateBarrier.currentEventId();
        valId = this.currentValueRootId;
        if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
          UpdateBarrier.whenDoneWith(this.property, (function(_this) {
            return function() {
              if (_this.currentValueRootId === valId) {
                return sink(initial(_this.current.get().value()));
              }
            };
          })(this));
          return this.maybeSubSource(sink, reply);
        } else {
          UpdateBarrier.inTransaction(void 0, this, (function() {
            return reply = sink(initial(this.current.get().value()));
          }), []);
          return this.maybeSubSource(sink, reply);
        }
      } else {
        return this.maybeSubSource(sink, reply);
      }
    };

    return PropertyDispatcher;

  })(Dispatcher);

  Bus = (function(_super) {
    __extends(Bus, _super);

    function Bus() {
      this.guardedSink = __bind(this.guardedSink, this);
      this.subscribeAll = __bind(this.subscribeAll, this);
      this.unsubAll = __bind(this.unsubAll, this);
      this.sink = void 0;
      this.subscriptions = [];
      this.ended = false;
      Bus.__super__.constructor.call(this, describe(Bacon, "Bus"), this.subscribeAll);
    }

    Bus.prototype.unsubAll = function() {
      var sub, _i, _len, _ref1;
      _ref1 = this.subscriptions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        sub = _ref1[_i];
        if (typeof sub.unsub === "function") {
          sub.unsub();
        }
      }
      return void 0;
    };

    Bus.prototype.subscribeAll = function(newSink) {
      var subscription, _i, _len, _ref1;
      this.sink = newSink;
      _ref1 = cloneArray(this.subscriptions);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        subscription = _ref1[_i];
        this.subscribeInput(subscription);
      }
      return this.unsubAll;
    };

    Bus.prototype.guardedSink = function(input) {
      return (function(_this) {
        return function(event) {
          if (event.isEnd()) {
            _this.unsubscribeInput(input);
            return Bacon.noMore;
          } else {
            return _this.sink(event);
          }
        };
      })(this);
    };

    Bus.prototype.subscribeInput = function(subscription) {
      return subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
    };

    Bus.prototype.unsubscribeInput = function(input) {
      var i, sub, _i, _len, _ref1;
      _ref1 = this.subscriptions;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        sub = _ref1[i];
        if (sub.input === input) {
          if (typeof sub.unsub === "function") {
            sub.unsub();
          }
          this.subscriptions.splice(i, 1);
          return;
        }
      }
    };

    Bus.prototype.plug = function(input) {
      var sub;
      assertObservable(input);
      if (this.ended) {
        return;
      }
      sub = {
        input: input
      };
      this.subscriptions.push(sub);
      if ((this.sink != null)) {
        this.subscribeInput(sub);
      }
      return (function(_this) {
        return function() {
          return _this.unsubscribeInput(input);
        };
      })(this);
    };

    Bus.prototype.end = function() {
      this.ended = true;
      this.unsubAll();
      return typeof this.sink === "function" ? this.sink(end()) : void 0;
    };

    Bus.prototype.push = function(value) {
      return typeof this.sink === "function" ? this.sink(next(value)) : void 0;
    };

    Bus.prototype.error = function(error) {
      return typeof this.sink === "function" ? this.sink(new Error(error)) : void 0;
    };

    return Bus;

  })(EventStream);

  Source = (function() {
    function Source(obs, sync, lazy) {
      this.obs = obs;
      this.sync = sync;
      this.lazy = lazy != null ? lazy : false;
      this.queue = [];
    }

    Source.prototype.subscribe = function(sink) {
      return this.obs.dispatcher.subscribe(sink);
    };

    Source.prototype.toString = function() {
      return this.obs.toString();
    };

    Source.prototype.markEnded = function() {
      return this.ended = true;
    };

    Source.prototype.consume = function() {
      if (this.lazy) {
        return {
          value: _.always(this.queue[0])
        };
      } else {
        return this.queue[0];
      }
    };

    Source.prototype.push = function(x) {
      return this.queue = [x];
    };

    Source.prototype.mayHave = function() {
      return true;
    };

    Source.prototype.hasAtLeast = function() {
      return this.queue.length;
    };

    Source.prototype.flatten = true;

    return Source;

  })();

  ConsumingSource = (function(_super) {
    __extends(ConsumingSource, _super);

    function ConsumingSource() {
      return ConsumingSource.__super__.constructor.apply(this, arguments);
    }

    ConsumingSource.prototype.consume = function() {
      return this.queue.shift();
    };

    ConsumingSource.prototype.push = function(x) {
      return this.queue.push(x);
    };

    ConsumingSource.prototype.mayHave = function(c) {
      return !this.ended || this.queue.length >= c;
    };

    ConsumingSource.prototype.hasAtLeast = function(c) {
      return this.queue.length >= c;
    };

    ConsumingSource.prototype.flatten = false;

    return ConsumingSource;

  })(Source);

  BufferingSource = (function(_super) {
    __extends(BufferingSource, _super);

    function BufferingSource(obs) {
      BufferingSource.__super__.constructor.call(this, obs, true);
    }

    BufferingSource.prototype.consume = function() {
      var values;
      values = this.queue;
      this.queue = [];
      return {
        value: function() {
          return values;
        }
      };
    };

    BufferingSource.prototype.push = function(x) {
      return this.queue.push(x.value());
    };

    BufferingSource.prototype.hasAtLeast = function() {
      return true;
    };

    return BufferingSource;

  })(Source);

  Source.isTrigger = function(s) {
    if (s instanceof Source) {
      return s.sync;
    } else {
      return s instanceof EventStream;
    }
  };

  Source.fromObservable = function(s) {
    if (s instanceof Source) {
      return s;
    } else if (s instanceof Property) {
      return new Source(s, false);
    } else {
      return new ConsumingSource(s, true);
    }
  };

  describe = function() {
    var args, context, method;
    context = arguments[0], method = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if ((context || method) instanceof Desc) {
      return context || method;
    } else {
      return new Desc(context, method, args);
    }
  };

  findDeps = function(x) {
    if (isArray(x)) {
      return _.flatMap(findDeps, x);
    } else if (isObservable(x)) {
      return [x];
    } else if (x instanceof Source) {
      return [x.obs];
    } else {
      return [];
    }
  };

  Desc = (function() {
    function Desc(context, method, args) {
      this.context = context;
      this.method = method;
      this.args = args;
      this.cached = void 0;
    }

    Desc.prototype.deps = function() {
      return this.cached || (this.cached = findDeps([this.context].concat(this.args)));
    };

    Desc.prototype.apply = function(obs) {
      obs.desc = this;
      return obs;
    };

    Desc.prototype.toString = function() {
      return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
    };

    return Desc;

  })();

  withDescription = function() {
    var desc, obs, _i;
    desc = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), obs = arguments[_i++];
    return describe.apply(null, desc).apply(obs);
  };

  Bacon.when = function() {
    var f, i, index, ix, len, needsBarrier, pat, patSources, pats, patterns, resultStream, s, sources, triggerFound, usage, _i, _j, _len, _len1, _ref1;
    if (arguments.length === 0) {
      return Bacon.never();
    }
    len = arguments.length;
    usage = "when: expecting arguments in the form (Observable+,function)+";
    assert(usage, len % 2 === 0);
    sources = [];
    pats = [];
    i = 0;
    patterns = [];
    while (i < len) {
      patterns[i] = arguments[i];
      patterns[i + 1] = arguments[i + 1];
      patSources = _.toArray(arguments[i]);
      f = constantToFunction(arguments[i + 1]);
      pat = {
        f: f,
        ixs: []
      };
      triggerFound = false;
      for (_i = 0, _len = patSources.length; _i < _len; _i++) {
        s = patSources[_i];
        index = _.indexOf(sources, s);
        if (!triggerFound) {
          triggerFound = Source.isTrigger(s);
        }
        if (index < 0) {
          sources.push(s);
          index = sources.length - 1;
        }
        _ref1 = pat.ixs;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ix = _ref1[_j];
          if (ix.index === index) {
            ix.count++;
          }
        }
        pat.ixs.push({
          index: index,
          count: 1
        });
      }
      assert("At least one EventStream required", triggerFound || (!patSources.length));
      if (patSources.length > 0) {
        pats.push(pat);
      }
      i = i + 2;
    }
    if (!sources.length) {
      return Bacon.never();
    }
    sources = _.map(Source.fromObservable, sources);
    needsBarrier = (_.any(sources, function(s) {
      return s.flatten;
    })) && (containsDuplicateDeps(_.map((function(s) {
      return s.obs;
    }), sources)));
    return resultStream = new EventStream(describe.apply(null, [Bacon, "when"].concat(__slice.call(patterns))), function(sink) {
      var cannotMatch, cannotSync, ends, match, nonFlattened, part, triggers;
      triggers = [];
      ends = false;
      match = function(p) {
        var _k, _len2, _ref2;
        _ref2 = p.ixs;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          i = _ref2[_k];
          if (!sources[i.index].hasAtLeast(i.count)) {
            return false;
          }
        }
        return true;
      };
      cannotSync = function(source) {
        return !source.sync || source.ended;
      };
      cannotMatch = function(p) {
        var _k, _len2, _ref2;
        _ref2 = p.ixs;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          i = _ref2[_k];
          if (!sources[i.index].mayHave(i.count)) {
            return true;
          }
        }
      };
      nonFlattened = function(trigger) {
        return !trigger.source.flatten;
      };
      part = function(source) {
        return function(unsubAll) {
          var flush, flushLater, flushWhileTriggers;
          flushLater = function() {
            return UpdateBarrier.whenDoneWith(resultStream, flush);
          };
          flushWhileTriggers = function() {
            var events, p, reply, trigger, _k, _len2;
            if (triggers.length > 0) {
              reply = Bacon.more;
              trigger = triggers.pop();
              for (_k = 0, _len2 = pats.length; _k < _len2; _k++) {
                p = pats[_k];
                if (match(p)) {
                  events = (function() {
                    var _l, _len3, _ref2, _results;
                    _ref2 = p.ixs;
                    _results = [];
                    for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
                      i = _ref2[_l];
                      _results.push(sources[i.index].consume());
                    }
                    return _results;
                  })();
                  reply = sink(trigger.e.apply(function() {
                    var event, values;
                    values = (function() {
                      var _l, _len3, _results;
                      _results = [];
                      for (_l = 0, _len3 = events.length; _l < _len3; _l++) {
                        event = events[_l];
                        _results.push(event.value());
                      }
                      return _results;
                    })();
                    return p.f.apply(p, values);
                  }));
                  if (triggers.length) {
                    triggers = _.filter(nonFlattened, triggers);
                  }
                  if (reply === Bacon.noMore) {
                    return reply;
                  } else {
                    return flushWhileTriggers();
                  }
                }
              }
            } else {
              return Bacon.more;
            }
          };
          flush = function() {
            var reply;
            reply = flushWhileTriggers();
            if (ends) {
              ends = false;
              if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
                reply = Bacon.noMore;
                sink(end());
              }
            }
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply;
          };
          return source.subscribe(function(e) {
            var reply;
            if (e.isEnd()) {
              ends = true;
              source.markEnded();
              flushLater();
            } else if (e.isError()) {
              reply = sink(e);
            } else {
              source.push(e);
              if (source.sync) {
                triggers.push({
                  source: source,
                  e: e
                });
                if (needsBarrier || UpdateBarrier.hasWaiters()) {
                  flushLater();
                } else {
                  flush();
                }
              }
            }
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply || Bacon.more;
          });
        };
      };
      return compositeUnsubscribe.apply(null, (function() {
        var _k, _len2, _results;
        _results = [];
        for (_k = 0, _len2 = sources.length; _k < _len2; _k++) {
          s = sources[_k];
          _results.push(part(s));
        }
        return _results;
      })());
    });
  };

  containsDuplicateDeps = function(observables, state) {
    var checkObservable;
    if (state == null) {
      state = [];
    }
    checkObservable = function(obs) {
      var deps;
      if (_.contains(state, obs)) {
        return true;
      } else {
        deps = obs.internalDeps();
        if (deps.length) {
          state.push(obs);
          return _.any(deps, checkObservable);
        } else {
          state.push(obs);
          return false;
        }
      }
    };
    return _.any(observables, checkObservable);
  };

  Bacon.update = function() {
    var i, initial, lateBindFirst, patterns;
    initial = arguments[0], patterns = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    lateBindFirst = function(f) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return function(i) {
          return f.apply(null, [i].concat(args));
        };
      };
    };
    i = patterns.length - 1;
    while (i > 0) {
      if (!(patterns[i] instanceof Function)) {
        patterns[i] = (function(x) {
          return function() {
            return x;
          };
        })(patterns[i]);
      }
      patterns[i] = lateBindFirst(patterns[i]);
      i = i - 2;
    }
    return withDescription.apply(null, [Bacon, "update", initial].concat(__slice.call(patterns), [Bacon.when.apply(Bacon, patterns).scan(initial, (function(x, f) {
      return f(x);
    }))]));
  };

  compositeUnsubscribe = function() {
    var ss;
    ss = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return new CompositeUnsubscribe(ss).unsubscribe;
  };

  CompositeUnsubscribe = (function() {
    function CompositeUnsubscribe(ss) {
      var s, _i, _len;
      if (ss == null) {
        ss = [];
      }
      this.unsubscribe = __bind(this.unsubscribe, this);
      this.unsubscribed = false;
      this.subscriptions = [];
      this.starting = [];
      for (_i = 0, _len = ss.length; _i < _len; _i++) {
        s = ss[_i];
        this.add(s);
      }
    }

    CompositeUnsubscribe.prototype.add = function(subscription) {
      var ended, unsub, unsubMe;
      if (this.unsubscribed) {
        return;
      }
      ended = false;
      unsub = nop;
      this.starting.push(subscription);
      unsubMe = (function(_this) {
        return function() {
          if (_this.unsubscribed) {
            return;
          }
          ended = true;
          _this.remove(unsub);
          return _.remove(subscription, _this.starting);
        };
      })(this);
      unsub = subscription(this.unsubscribe, unsubMe);
      if (!(this.unsubscribed || ended)) {
        this.subscriptions.push(unsub);
      }
      _.remove(subscription, this.starting);
      return unsub;
    };

    CompositeUnsubscribe.prototype.remove = function(unsub) {
      if (this.unsubscribed) {
        return;
      }
      if ((_.remove(unsub, this.subscriptions)) !== void 0) {
        return unsub();
      }
    };

    CompositeUnsubscribe.prototype.unsubscribe = function() {
      var s, _i, _len, _ref1;
      if (this.unsubscribed) {
        return;
      }
      this.unsubscribed = true;
      _ref1 = this.subscriptions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        s = _ref1[_i];
        s();
      }
      this.subscriptions = [];
      return this.starting = [];
    };

    CompositeUnsubscribe.prototype.count = function() {
      if (this.unsubscribed) {
        return 0;
      }
      return this.subscriptions.length + this.starting.length;
    };

    CompositeUnsubscribe.prototype.empty = function() {
      return this.count() === 0;
    };

    return CompositeUnsubscribe;

  })();

  Bacon.CompositeUnsubscribe = CompositeUnsubscribe;

  Some = (function() {
    function Some(value) {
      this.value = value;
    }

    Some.prototype.getOrElse = function() {
      return this.value;
    };

    Some.prototype.get = function() {
      return this.value;
    };

    Some.prototype.filter = function(f) {
      if (f(this.value)) {
        return new Some(this.value);
      } else {
        return None;
      }
    };

    Some.prototype.map = function(f) {
      return new Some(f(this.value));
    };

    Some.prototype.forEach = function(f) {
      return f(this.value);
    };

    Some.prototype.isDefined = true;

    Some.prototype.toArray = function() {
      return [this.value];
    };

    Some.prototype.inspect = function() {
      return "Some(" + this.value + ")";
    };

    Some.prototype.toString = function() {
      return this.inspect();
    };

    return Some;

  })();

  None = {
    getOrElse: function(value) {
      return value;
    },
    filter: function() {
      return None;
    },
    map: function() {
      return None;
    },
    forEach: function() {},
    isDefined: false,
    toArray: function() {
      return [];
    },
    inspect: function() {
      return "None";
    },
    toString: function() {
      return this.inspect();
    }
  };

  UpdateBarrier = (function() {
    var afterTransaction, afters, aftersIndex, currentEventId, flush, flushDepsOf, flushWaiters, hasWaiters, inTransaction, rootEvent, waiterObs, waiters, whenDoneWith, wrappedSubscribe;
    rootEvent = void 0;
    waiterObs = [];
    waiters = {};
    afters = [];
    aftersIndex = 0;
    afterTransaction = function(f) {
      if (rootEvent) {
        return afters.push(f);
      } else {
        return f();
      }
    };
    whenDoneWith = function(obs, f) {
      var obsWaiters;
      if (rootEvent) {
        obsWaiters = waiters[obs.id];
        if (obsWaiters == null) {
          obsWaiters = waiters[obs.id] = [f];
          return waiterObs.push(obs);
        } else {
          return obsWaiters.push(f);
        }
      } else {
        return f();
      }
    };
    flush = function() {
      while (waiterObs.length > 0) {
        flushWaiters(0);
      }
      return void 0;
    };
    flushWaiters = function(index) {
      var f, obs, obsId, obsWaiters, _i, _len;
      obs = waiterObs[index];
      obsId = obs.id;
      obsWaiters = waiters[obsId];
      waiterObs.splice(index, 1);
      delete waiters[obsId];
      flushDepsOf(obs);
      for (_i = 0, _len = obsWaiters.length; _i < _len; _i++) {
        f = obsWaiters[_i];
        f();
      }
      return void 0;
    };
    flushDepsOf = function(obs) {
      var dep, deps, index, _i, _len;
      deps = obs.internalDeps();
      for (_i = 0, _len = deps.length; _i < _len; _i++) {
        dep = deps[_i];
        flushDepsOf(dep);
        if (waiters[dep.id]) {
          index = _.indexOf(waiterObs, dep);
          flushWaiters(index);
        }
      }
      return void 0;
    };
    inTransaction = function(event, context, f, args) {
      var after, result;
      if (rootEvent) {
        return f.apply(context, args);
      } else {
        rootEvent = event;
        try {
          result = f.apply(context, args);
          flush();
        } finally {
          rootEvent = void 0;
          while (aftersIndex < afters.length) {
            after = afters[aftersIndex];
            aftersIndex++;
            after();
          }
          aftersIndex = 0;
          afters = [];
        }
        return result;
      }
    };
    currentEventId = function() {
      if (rootEvent) {
        return rootEvent.id;
      } else {
        return void 0;
      }
    };
    wrappedSubscribe = function(obs, sink) {
      var doUnsub, shouldUnsub, unsub, unsubd;
      unsubd = false;
      shouldUnsub = false;
      doUnsub = function() {
        return shouldUnsub = true;
      };
      unsub = function() {
        unsubd = true;
        return doUnsub();
      };
      doUnsub = obs.dispatcher.subscribe(function(event) {
        return afterTransaction(function() {
          var reply;
          if (!unsubd) {
            reply = sink(event);
            if (reply === Bacon.noMore) {
              return unsub();
            }
          }
        });
      });
      if (shouldUnsub) {
        doUnsub();
      }
      return unsub;
    };
    hasWaiters = function() {
      return waiterObs.length > 0;
    };
    return {
      whenDoneWith: whenDoneWith,
      hasWaiters: hasWaiters,
      inTransaction: inTransaction,
      currentEventId: currentEventId,
      wrappedSubscribe: wrappedSubscribe,
      afterTransaction: afterTransaction
    };
  })();

  Bacon.EventStream = EventStream;

  Bacon.Property = Property;

  Bacon.Observable = Observable;

  Bacon.Bus = Bus;

  Bacon.Initial = Initial;

  Bacon.Next = Next;

  Bacon.End = End;

  Bacon.Error = Error;

  nop = function() {};

  latter = function(_, x) {
    return x;
  };

  former = function(x, _) {
    return x;
  };

  initial = function(value) {
    return new Initial(value, true);
  };

  next = function(value) {
    return new Next(value, true);
  };

  end = function() {
    return new End();
  };

  toEvent = function(x) {
    if (x instanceof Event) {
      return x;
    } else {
      return next(x);
    }
  };

  cloneArray = function(xs) {
    return xs.slice(0);
  };

  assert = function(message, condition) {
    if (!condition) {
      throw new Exception(message);
    }
  };

  assertEventStream = function(event) {
    if (!(event instanceof EventStream)) {
      throw new Exception("not an EventStream : " + event);
    }
  };

  assertObservable = function(event) {
    if (!(event instanceof Observable)) {
      throw new Exception("not an Observable : " + event);
    }
  };

  assertFunction = function(f) {
    return assert("not a function : " + f, isFunction(f));
  };

  isFunction = function(f) {
    return typeof f === "function";
  };

  isArray = function(xs) {
    return xs instanceof Array;
  };

  isObservable = function(x) {
    return x instanceof Observable;
  };

  assertArray = function(xs) {
    if (!isArray(xs)) {
      throw new Exception("not an array : " + xs);
    }
  };

  assertNoArguments = function(args) {
    return assert("no arguments supported", args.length === 0);
  };

  assertString = function(x) {
    if (typeof x !== "string") {
      throw new Exception("not a string : " + x);
    }
  };

  partiallyApplied = function(f, applied) {
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return f.apply(null, applied.concat(args));
    };
  };

  makeSpawner = function(args) {
    if (args.length === 1 && isObservable(args[0])) {
      return _.always(args[0]);
    } else {
      return makeFunctionArgs(args);
    }
  };

  makeFunctionArgs = function(args) {
    args = Array.prototype.slice.call(args);
    return makeFunction_.apply(null, args);
  };

  makeFunction_ = withMethodCallSupport(function() {
    var args, f;
    f = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (isFunction(f)) {
      if (args.length) {
        return partiallyApplied(f, args);
      } else {
        return f;
      }
    } else if (isFieldKey(f)) {
      return toFieldExtractor(f, args);
    } else {
      return _.always(f);
    }
  });

  makeFunction = function(f, args) {
    return makeFunction_.apply(null, [f].concat(__slice.call(args)));
  };

  constantToFunction = function(f) {
    if (isFunction(f)) {
      return f;
    } else {
      return _.always(f);
    }
  };

  makeObservable = function(x) {
    if (isObservable(x)) {
      return x;
    } else {
      return Bacon.once(x);
    }
  };

  isFieldKey = function(f) {
    return (typeof f === "string") && f.length > 1 && f.charAt(0) === ".";
  };

  Bacon.isFieldKey = isFieldKey;

  toFieldExtractor = function(f, args) {
    var partFuncs, parts;
    parts = f.slice(1).split(".");
    partFuncs = _.map(toSimpleExtractor(args), parts);
    return function(value) {
      var _i, _len;
      for (_i = 0, _len = partFuncs.length; _i < _len; _i++) {
        f = partFuncs[_i];
        value = f(value);
      }
      return value;
    };
  };

  toSimpleExtractor = function(args) {
    return function(key) {
      return function(value) {
        var fieldValue;
        if (value == null) {
          return void 0;
        } else {
          fieldValue = value[key];
          if (isFunction(fieldValue)) {
            return fieldValue.apply(value, args);
          } else {
            return fieldValue;
          }
        }
      };
    };
  };

  toFieldKey = function(f) {
    return f.slice(1);
  };

  toCombinator = function(f) {
    var key;
    if (isFunction(f)) {
      return f;
    } else if (isFieldKey(f)) {
      key = toFieldKey(f);
      return function(left, right) {
        return left[key](right);
      };
    } else {
      return assert("not a function or a field key: " + f, false);
    }
  };

  toOption = function(v) {
    if (v instanceof Some || v === None) {
      return v;
    } else {
      return new Some(v);
    }
  };

  if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
    define([], function() {
      return Bacon;
    });
    this.Bacon = Bacon;
  } else if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = Bacon;
    Bacon.Bacon = Bacon;
  } else {
    this.Bacon = Bacon;
  }

}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes



/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'windows': 91,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
}

// Helper aliases

var aliases = exports.aliases = {
  'shift': 16,
  'ctl': 17,
  'ctrl': 17,
  'control': 17,
  'alt': 18,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],4:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3]
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(this.smartypants(cap[0]));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/--/g, '\u2014')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function() {
      var out, err;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bacon = _interopRequire(require("baconjs"));

var keycode = _interopRequire(require("keycode"));

var EVENT_KEYUP = Bacon.fromEventTarget(document, "keyup");
var EVENT_KEYDOWN = Bacon.fromEventTarget(document, "keydown");

/**
 * create EventStream from user input
 */
module.exports = {
  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  key: function key(charKey) {
    var keyCode = typeof charKey === "string" ? keycode(charKey) : charKey;
    return EVENT_KEYUP.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {String|Number} charKey
   * @returns {EventStream}
   */
  keydown: function keydown(charKey) {
    var keyCode = typeof charKey === "string" ? keycode(charKey) : charKey;
    return EVENT_KEYDOWN.filter(keyCodeIs(keyCode));
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  click: function click(el) {
    return Bacon.fromEventTarget(el, "click");
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  mousemove: function mousemove() {
    var el = arguments[0] === undefined ? document.body : arguments[0];
    return Bacon.fromEventTarget(el, "mousemove");
  },

  /**
   * @returns {EventStream}
   */
  resize: function resize() {
    return Bacon.fromEventTarget(window, "resize");
  },

  /**
   * @returns {EventStream}
   */
  hashchange: function hashchange() {
    return Bacon.fromEventTarget(window, "hashchange");
  }
};


/**
 * @param {Number} keyCode
 * @returns {Function}
 */
function keyCodeIs(keyCode) {
  return function (event) {
    return event.keyCode === keyCode;
  };
}

},{"baconjs":2,"keycode":3}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bacon = _interopRequire(require("baconjs"));

var control = _interopRequire(require("./control"));

/**
 * full screen
 *
 * @param {Element} target
 * @returns void
 */
module.exports = function (target) {
  var bus = new Bacon.Bus();
  bus.onValue(toggleScreenOf(target));
  return bus;
};

function toggleScreenOf(el) {
  var request = undefined,
      exit = undefined;

  if (el.requestFullscreen) {
    request = "requestFullscreen";
  } else if (el.webkitRequestFullscreen) {
    request = "webkitRequestFullscreen";
  } else if (el.mozRequestFullScreen) {
    request = "mozRequestFullScreen";
  } else if (el.msRequestFullscreen) {
    request = "msRequestFullscreen";
  }

  if (document.exitFullscreen) {
    exit = "exitFullscreen";
  } else if (document.webkitExitFullscreen) {
    exit = "webkitExitFullscreen";
  } else if (document.mozCancelFullScreen) {
    exit = "mozCancelFullScreen";
  } else if (document.msExitFullscreen) {
    exit = "msExitFullscreen";
  }

  return function () {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      el[request]();
    } else {
      document[exit]();
    }
  };
}

},{"./control":5,"baconjs":2}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

/**
 * if using a feature that requires a browser-polyfill
 *
 * @see https://6to5.org/polyfill.html
 */
var polyfill = _interopRequire(require("6to5/browser-polyfill"));

/**
 * Talkie.js
 */
var Bacon = _interopRequire(require("baconjs"));

var util = _interopRequire(require("./util"));

var control = _interopRequire(require("./control"));

var query = _interopRequire(require("./query"));

var Markdown = _interopRequire(require("./markdown"));

var Paging = _interopRequire(require("./paging"));

var FullScreen = _interopRequire(require("./fullscreen"));

var Responsive = _interopRequire(require("./responsive"));

var IDENT_NEXT = "next";
var IDENT_PREV = "prev";
var IDENT_SCALER = "scaler";
var IDENT_CONTROL = "control";
var IDENT_PAGE = "page";
var IDENT_TOTAL = "total";
var IDENT_PROGRESS = "progress";
var IDENT_POINTER = "pointer";
var IDENT_BACKFACE = "backface";
var MIME_MARKDOWN = "text/x-markdown";
var ATTR_LAYOUT = "layout";
var ATTR_BODY_BG = "body-bg";
var ATTR_BACKFACE = "backface";
var ATTR_FILTER = "backface-filter";

var NORMAL_WIDTH = 1024;
var NORMAL_HEIGHT = 768;
var WIDE_WIDTH = 1366;
var WIDE_HEIGHT = 768;

/**
 * @typedef {Object} TalkieOptions
 * @property {Boolean} [api]
 * @property {Boolean} [wide]
 * @property {Boolean} [control]
 * @property {Boolean} [pointer]
 * @property {Boolean} [progress]
 * @property {Boolean} [backface]
 */

/**
 * @param {TalkieOptions} options
 */
module.exports = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];
  if (options.api) {
    return {
      main: main,
      util: util,
      control: control,
      query: query,
      markdown: Markdown,
      paging: Paging,
      fullScreen: FullScreen,
      responsive: Responsive,
      Bacon: Bacon
    };
  } else {
    return main(options);
  }
};

/**
 * @param {TalkieOptions} _options
 */
function main() {
  var _options = arguments[0] === undefined ? {} : arguments[0];


  /**
   * apply default options
   * @type {*|Object}
   */
  var options = util.defaults(_options, {
    api: false,
    wide: true,
    control: true,
    pointer: true,
    progress: true,
    backface: true
  });

  /**
   * Init slide sizes
   */
  var width = options.wide ? WIDE_WIDTH : NORMAL_WIDTH;
  var height = options.wide ? WIDE_HEIGHT : NORMAL_HEIGHT;
  document.querySelector("head").insertAdjacentHTML("beforeend", "\n    <style>\n      #" + IDENT_SCALER + ",\n      [layout] {\n        width: " + width + "px !important;\n        height: " + height + "px !important;\n      }\n    </style>");

  /**
   * Init slide sections
   */
  util.toArray(document.querySelectorAll("[type=\"" + MIME_MARKDOWN + "\"]")).forEach(Markdown);
  var slides = util.toArray(document.querySelectorAll("[" + ATTR_LAYOUT + "]"));

  /**
   * Responsive scaling
   */
  document.body.insertAdjacentHTML("beforeend", "\n    <div id=\"" + IDENT_SCALER + "\"></div>\n  ");
  var scalerEl = util.getById(IDENT_SCALER);
  slides.forEach(function (el) {
    return scalerEl.appendChild(el);
  });

  var ratio = Responsive({
    width: width,
    height: height,
    target: scalerEl
  });
  ratio.plug(control.resize());

  /**
   * Paging control
   */
  var paging = Paging({
    startPage: util.getPageNumberFromHash() || 1,
    endPage: slides.length,
    slideElements: slides
  });

  paging.nextBus.plug(control.keydown("right").throttle(50));
  paging.prevBus.plug(control.keydown("left").throttle(50));

  // sync location.hash
  paging.moveBus.plug(control.hashchange().map(util.getPageNumberFromHash));
  paging.currentEs.onValue(function (page) {
    return location.hash = page;
  });

  // sync body background attribute
  paging.changedEs.map(".getAttribute", ATTR_LAYOUT).onValue(util.attributeAssignOf(document.body, ATTR_BODY_BG));

  /**
   * Insert Ui Elements
   */
  // TODO split to module & add tests
  if (options.pointer) {
    document.body.insertAdjacentHTML("beforeend", "<div id=\"" + IDENT_POINTER + "\"></div>");
    var x = new Bacon.Bus();
    var y = new Bacon.Bus();
    var moveEs = control.mousemove();
    var pointerEl = util.getById(IDENT_POINTER);
    x.plug(moveEs);
    y.plug(moveEs);

    x.map(function (e) {
      return e.x;
    }).onValue(util.styleAssignOf(pointerEl, "left"));
    x.map(function (e) {
      return e.y;
    }).onValue(util.styleAssignOf(pointerEl, "top"));

    var assignPointerVisibility = util.styleAssignOf(pointerEl, "visibility");
    control.keydown("b").map("visible").onValue(assignPointerVisibility);
    control.key("b").map("hidden").onValue(assignPointerVisibility);
  }

  // TODO split to module & add test
  if (options.backface) {
    document.body.insertAdjacentHTML("beforeend", "<div id=\"" + IDENT_BACKFACE + "\"></div>");
    var backfaceEl = util.getById(IDENT_BACKFACE);

    var bgImageBus = new Bacon.Bus();
    var bgFilterBus = new Bacon.Bus();

    bgImageBus.plug(paging.changedEs);
    bgFilterBus.plug(paging.changedEs);

    // backface image
    bgImageBus.map(".getAttribute", ATTR_BACKFACE).map(function (src) {
      return src ? "url(\"" + src + "\")" : "";
    }).onValue(util.styleAssignOf(backfaceEl, "background-image"));

    // backface image css filter
    bgFilterBus.map(".getAttribute", ATTR_FILTER).onValue(util.styleAssignOf(backfaceEl, util.stylePrefixDetect("filter")));

    // preload
    Bacon.fromArray(slides).map(".getAttribute", ATTR_BACKFACE).filter(function (v) {
      return !!v;
    }).onValue(util.preloadImg);
  }

  if (options.control) {
    document.body.insertAdjacentHTML("beforeend", "\n      <div id=\"" + IDENT_CONTROL + "\">\n        <p><span id=\"" + IDENT_PREV + "\">&lt;</span>\n        Page <span id=\"" + IDENT_PAGE + "\">0</span> of <span id=\"" + IDENT_TOTAL + "\">0</span>\n        <span id=\"" + IDENT_NEXT + "\">&gt;</span></p>\n      </div>\n    ");

    var nextEl = util.getById(IDENT_NEXT);
    var prevEl = util.getById(IDENT_PREV);

    // next button
    paging.nextBus.plug(control.click(nextEl));

    // prev button
    paging.prevBus.plug(control.click(prevEl));

    // current page
    paging.currentEs.onValue(util.textAssignOf(util.getById(IDENT_PAGE)));

    // total of page
    Bacon.once(slides.length).onValue(util.textAssignOf(util.getById(IDENT_TOTAL)));
  }

  if (options.progress) {
    document.body.insertAdjacentHTML("beforeend", "<div id=\"" + IDENT_PROGRESS + "\"></div>");

    // progress bar
    paging.percentEs.onValue(util.styleAssignOf(util.getById(IDENT_PROGRESS), "width"));
  }

  /**
   * FullScreen
   */
  FullScreen(document.body).plug(control.key("f"));

  /**
   * export some of control
   *
   * @typedef {Object} TalkieExport
   * @param {Object.<Function>} control
   * @param {Bacon.EventStream} changed
   * @param {Bacon.Bus} next
   * @param {Bacon.Bus} prev
   * @param {Bacon.Bus} jump
   */
  return {
    Bacon: Bacon,
    control: control,
    changed: paging.changedEs,
    next: paging.nextBus,
    prev: paging.prevBus,
    jump: paging.moveBus
  };
}

},{"./control":5,"./fullscreen":6,"./markdown":8,"./paging":9,"./query":10,"./responsive":11,"./util":12,"6to5/browser-polyfill":1,"baconjs":2}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bacon = _interopRequire(require("baconjs"));

var marked = _interopRequire(require("marked"));

var util = _interopRequire(require("./util"));

marked.setOptions({
  langPrefix: "hljs ",
  highlight: function (code) {
    if (window.hljs == null) {
      console.log("highlight.js (`window.hljs`) is missing");
      return code;
    }
    return window.hljs.highlightAuto(code).value;
  }
});

/**
 * compile markdown
 *
 * @returns void
 */
module.exports = compileMarkdown;


/**
 * @param {Element} el
 * @returns {Element}
 */
function compileMarkdown(el) {
  var section = document.createElement("section");
  section.innerHTML = marked(el.innerHTML);
  util.toArray(el.attributes).filter(notTypeAttribute).forEach(copyAttributeTo(section));
  el.parentNode.replaceChild(section, el);
  return section;
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function copyAttributeTo(el) {
  return function (attr) {
    el.setAttribute(attr.name, attr.value);
  };
}

/**
 * @param {AttributeNode} attr
 */
function notTypeAttribute(attr) {
  return attr.name !== "type";
}

},{"./util":12,"baconjs":2,"marked":4}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bacon = _interopRequire(require("baconjs"));

var control = _interopRequire(require("./control"));

var util = _interopRequire(require("./util"));

/**
 * @typedef {Object} PagingOptions
 * @property {Number} startPage
 * @property {Number} endPage
 * @property {Array<Element>} slideElements
 */

/**
 * paging control
 *
 * @param {PagingOptions} options
 */
module.exports = function (options) {
  var nextBus = new Bacon.Bus();
  var prevBus = new Bacon.Bus();
  var moveBus = new Bacon.Bus();

  var currentBus = new Bacon.Bus();
  var currentPage = currentBus.map(inRangeOf(1, options.endPage)).toProperty(options.startPage || 1).skipDuplicates();

  var nextEs = currentPage.sampledBy(nextBus).map(function (v) {
    return v + 1;
  });
  var prevEs = currentPage.sampledBy(prevBus).map(function (v) {
    return v - 1;
  });
  var moveEs = moveBus.map(function (v) {
    return v /*noop*/;
  });

  var percentString = currentPage.map(percentOf(options.endPage));
  var currentSlide = currentPage.map(function (i) {
    return options.slideElements[i - 1];
  });

  currentBus.plug(nextEs.merge(prevEs).merge(moveEs));

  currentSlide.onValue(function (current) {
    options.slideElements.forEach(toInvisible);
    current && toVisible(current);
  });

  return {
    currentEs: currentPage,
    startEs: currentPage.filter(function (v) {
      return v === 1;
    }),
    endEs: currentPage.filter(function (v) {
      return v === options.endPage;
    }),
    changedEs: currentSlide,
    percentEs: percentString,
    nextBus: nextBus,
    prevBus: prevBus,
    moveBus: moveBus
  };
};

/**
 * @param {Element} el
 */
function toInvisible(el) {
  el.removeAttribute("visible");
}

/**
 * @param {Element} el
 */
function toVisible(el) {
  el.setAttribute("visible", 1);
}

/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Function}
 */
function inRangeOf(min, max) {
  return function (z) {
    return Math.min(max, Math.max(z, min));
  };
}

/**
 * @param {Number} max
 * @returns {Function}
 */
function percentOf(max) {
  return function (current) {
    return 100 / max * current + "%";
  };
}

},{"./control":5,"./util":12,"baconjs":2}],10:[function(require,module,exports){
"use strict";

/**
 * query parameters
 */
module.exports = parseQuery;


/**
 * @param {String} query
 * @returns {Object}
 */
function parseQuery(query) {
  var ret = {};
  query.slice(1, -1).split("&").map(function (keyEqVal) {
    return keyEqVal.split("=");
  }).forEach(function (kv) {
    return ret[kv[0]] = kv[1];
  });
  return ret;
}

},{}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Bacon = _interopRequire(require("baconjs"));

var util = _interopRequire(require("./util"));

/**
 * @typedef {Object} RatioOptions
 * @property {Number} width
 * @property {Number} height
 * @property {Element} target
 */

/**
 * compute ratio
 *
 * @param {RatioOptions} options
 * @returns {EventStream}
 */
module.exports = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];


  var bus = new Bacon.Bus();

  var hRatioFn = horizontalRatioOf(options.width);
  var vRatioFn = verticalRatioOf(options.height);

  var hRatio = bus.map(hRatioFn).toProperty(hRatioFn());
  var vRatio = bus.map(vRatioFn).toProperty(vRatioFn());

  var scale = util.compose(centeringOf(options.target), scalingOf(options.target));

  Bacon.combineWith(Math.min, hRatio, vRatio).onValue(scale);

  return bus;
};

/**
 * @param {Number} width
 * @returns {Function}
 */
function horizontalRatioOf(width) {
  return function () {
    return window.innerWidth / width;
  };
}

/**
 * @param {Number} height
 * @returns {Function}
 */
function verticalRatioOf(height) {
  return function () {
    return window.innerHeight / height;
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function scalingOf(el) {
  var transform = util.stylePrefixDetect("transform");
  return function (ratio) {
    el.style[transform] = "scale(" + Math.abs(ratio) + ")";
  };
}

/**
 * @param {Element} el
 * @returns {Function}
 */
function centeringOf(el) {
  return function () {
    var rect = el.getBoundingClientRect();
    el.style.left = (window.innerWidth - rect.width) / 2;
    el.style.top = (window.innerHeight - rect.height) / 2;
  };
}

},{"./util":12,"baconjs":2}],12:[function(require,module,exports){
"use strict";

module.exports = {
  /**
   * @param {array} list
   * @returns {Array.<T>}
   */
  toArray: function toArray(list) {
    return Array.prototype.slice.call(list);
  },

  /**
   * TODO test
   * @param {Object} orig
   * @param {Object} defaults
   * @returns {Object}
   */
  defaults: function defaults(orig, defs) {
    var ret = this.clone(orig);
    Object.keys(defs).forEach(function (k) {
      if (k in ret) {
        return;
      }
      ret[k] = defs[k];
    });
    return ret;
  },

  /**
   * TODO test
   * @param {Object} orig
   * @returns {Object}
   */
  clone: function clone(orig) {
    var ret = {};
    Object.keys(orig).forEach(function (k) {
      return ret[k] = orig[k];
    });
    return ret;
  },

  /**
   * @param {function} fn...
   * @returns {Function}
   */
  compose: function compose() {
    // http://underscorejs.org/#compose
    var args = arguments;
    var start = args.length - 1;
    return function () {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) {
        result = args[i].call(this, result);
      }
      return result;
    };
  },
  /**
   * @param {string} ident
   * @returns {HTMLElement}
   */
  getById: function getById(ident) {
    return document.getElementById(ident);
  },

  /**
   * @param {Element} el
   */
  textAssignOf: function textAssignOf(el) {
    return function (text) {
      el.textContent = text;
    };
  },

  /**
   * @param {Element} el
   * @param {String} property
   */
  styleAssignOf: function styleAssignOf(el, property) {
    return function (value) {
      el.style[property] = value === "" ? null : value;
    };
  },

  /**
   * @param {Element} el
   * @param {String} attribute
   */
  attributeAssignOf: function attributeAssignOf(el, attribute) {
    return function (value) {
      if (value != null) {
        el.setAttribute(attribute, value);
      } else {
        el.removeAttribute(attribute);
      }
    };
  },

  /**
   * @param {String} src
   */
  preloadImg: function preloadImg(src) {
    var img = document.createElement("img");
    img.onload = function () {
      return img.parentNode.removeChild(img);
    };
    img.src = src;
    img.style.display = "none";
    document.body.appendChild(img);
  },

  /**
   * @returns {Number}
   */
  getPageNumberFromHash: function getPageNumberFromHash() {
    return parseInt(location.hash.replace("#", ""), 10) || 0;
  },

  /**
   * @param {String} property
   * @returns {String}
   */
  stylePrefixDetect: function stylePrefixDetect(property) {
    var validProperty = undefined;
    var styles = this.toArray(window.getComputedStyle(document.documentElement, ""));
    var includes = function (needle) {
      return styles.indexOf(needle) !== -1;
    };

    if (includes("-webkit-" + property)) {
      validProperty = "-webkit-" + property;
    } else if (includes("-moz-" + property)) {
      validProperty = "-moz-" + property;
    } else if (includes("-ms-" + property)) {
      validProperty = "-ms-" + property;
    } else if (includes(property)) {
      validProperty = property;
    }

    return validProperty;
  }
};

},{}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvNnRvNS9icm93c2VyLXBvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhY29uanMvZGlzdC9CYWNvbi5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9jb250cm9sLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9mdWxsc2NyZWVuLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9heXVtdXNhdG8vRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvbWFya2Rvd24uanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3BhZ2luZy5qcyIsIi9Vc2Vycy9heXVtdXNhdG8vRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvcXVlcnkuanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3Jlc3BvbnNpdmUuanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsbUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2hDOzs7OztBQUtELHVCQUFxQixFQUFBLGlDQUFHO0FBQ3RCLFdBQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDMUQ7Ozs7OztBQU1ELG1CQUFpQixFQUFBLDJCQUFDLFFBQVEsRUFBRTtBQUMxQixRQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRixRQUFJLFFBQVEsR0FBRyxVQUFDLE1BQU07YUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUFBLENBQUM7O0FBRXpELFFBQUcsUUFBUSxjQUFZLFFBQVEsQ0FBRyxFQUFFO0FBQ2xDLG1CQUFhLGdCQUFjLFFBQVEsQUFBRSxDQUFDO0tBQ3ZDLE1BQU0sSUFBRyxRQUFRLFdBQVMsUUFBUSxDQUFHLEVBQUU7QUFDdEMsbUJBQWEsYUFBVyxRQUFRLEFBQUUsQ0FBQztLQUNwQyxNQUFNLElBQUcsUUFBUSxVQUFRLFFBQVEsQ0FBRyxFQUFFO0FBQ3JDLG1CQUFhLFlBQVUsUUFBUSxBQUFFLENBQUM7S0FDbkMsTUFBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUM1QixtQkFBYSxHQUFHLFFBQVEsQ0FBQztLQUMxQjs7QUFFRCxXQUFPLGFBQWEsQ0FBQztHQUN0QjtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtyZXF1aXJlKFwiY29yZS1qcy9zaGltXCIpO3JlcXVpcmUoXCJyZWdlbmVyYXRvci9ydW50aW1lXCIpfSx7XCJjb3JlLWpzL3NoaW1cIjoyLFwicmVnZW5lcmF0b3IvcnVudGltZVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXshZnVuY3Rpb24ocmV0dXJuVGhpcyxmcmFtZXdvcmssdW5kZWZpbmVkKXtcInVzZSBzdHJpY3RcIjt2YXIgZ2xvYmFsPXJldHVyblRoaXMoKSxPQkpFQ1Q9XCJPYmplY3RcIixGVU5DVElPTj1cIkZ1bmN0aW9uXCIsQVJSQVk9XCJBcnJheVwiLFNUUklORz1cIlN0cmluZ1wiLE5VTUJFUj1cIk51bWJlclwiLFJFR0VYUD1cIlJlZ0V4cFwiLERBVEU9XCJEYXRlXCIsTUFQPVwiTWFwXCIsU0VUPVwiU2V0XCIsV0VBS01BUD1cIldlYWtNYXBcIixXRUFLU0VUPVwiV2Vha1NldFwiLFNZTUJPTD1cIlN5bWJvbFwiLFBST01JU0U9XCJQcm9taXNlXCIsTUFUSD1cIk1hdGhcIixBUkdVTUVOVFM9XCJBcmd1bWVudHNcIixQUk9UT1RZUEU9XCJwcm90b3R5cGVcIixDT05TVFJVQ1RPUj1cImNvbnN0cnVjdG9yXCIsVE9fU1RSSU5HPVwidG9TdHJpbmdcIixUT19TVFJJTkdfVEFHPVRPX1NUUklORytcIlRhZ1wiLFRPX0xPQ0FMRT1cInRvTG9jYWxlU3RyaW5nXCIsSEFTX09XTj1cImhhc093blByb3BlcnR5XCIsRk9SX0VBQ0g9XCJmb3JFYWNoXCIsSVRFUkFUT1I9XCJpdGVyYXRvclwiLEZGX0lURVJBVE9SPVwiQEBcIitJVEVSQVRPUixQUk9DRVNTPVwicHJvY2Vzc1wiLENSRUFURV9FTEVNRU5UPVwiY3JlYXRlRWxlbWVudFwiLEZ1bmN0aW9uPWdsb2JhbFtGVU5DVElPTl0sT2JqZWN0PWdsb2JhbFtPQkpFQ1RdLEFycmF5PWdsb2JhbFtBUlJBWV0sU3RyaW5nPWdsb2JhbFtTVFJJTkddLE51bWJlcj1nbG9iYWxbTlVNQkVSXSxSZWdFeHA9Z2xvYmFsW1JFR0VYUF0sRGF0ZT1nbG9iYWxbREFURV0sTWFwPWdsb2JhbFtNQVBdLFNldD1nbG9iYWxbU0VUXSxXZWFrTWFwPWdsb2JhbFtXRUFLTUFQXSxXZWFrU2V0PWdsb2JhbFtXRUFLU0VUXSxTeW1ib2w9Z2xvYmFsW1NZTUJPTF0sTWF0aD1nbG9iYWxbTUFUSF0sVHlwZUVycm9yPWdsb2JhbC5UeXBlRXJyb3Isc2V0VGltZW91dD1nbG9iYWwuc2V0VGltZW91dCxzZXRJbW1lZGlhdGU9Z2xvYmFsLnNldEltbWVkaWF0ZSxjbGVhckltbWVkaWF0ZT1nbG9iYWwuY2xlYXJJbW1lZGlhdGUscHJvY2Vzcz1nbG9iYWxbUFJPQ0VTU10sbmV4dFRpY2s9cHJvY2VzcyYmcHJvY2Vzcy5uZXh0VGljayxkb2N1bWVudD1nbG9iYWwuZG9jdW1lbnQsaHRtbD1kb2N1bWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LG5hdmlnYXRvcj1nbG9iYWwubmF2aWdhdG9yLGRlZmluZT1nbG9iYWwuZGVmaW5lLEFycmF5UHJvdG89QXJyYXlbUFJPVE9UWVBFXSxPYmplY3RQcm90bz1PYmplY3RbUFJPVE9UWVBFXSxGdW5jdGlvblByb3RvPUZ1bmN0aW9uW1BST1RPVFlQRV0sSW5maW5pdHk9MS8wLERPVD1cIi5cIjtmdW5jdGlvbiBpc09iamVjdChpdCl7cmV0dXJuIGl0IT1udWxsJiYodHlwZW9mIGl0PT1cIm9iamVjdFwifHx0eXBlb2YgaXQ9PVwiZnVuY3Rpb25cIil9ZnVuY3Rpb24gaXNGdW5jdGlvbihpdCl7cmV0dXJuIHR5cGVvZiBpdD09XCJmdW5jdGlvblwifXZhciBpc05hdGl2ZT1jdHgoLy4vLnRlc3QsL1xcW25hdGl2ZSBjb2RlXFxdXFxzKlxcfVxccyokLywxKTt2YXIgYnVpbGRJbj17VW5kZWZpbmVkOjEsTnVsbDoxLEFycmF5OjEsU3RyaW5nOjEsQXJndW1lbnRzOjEsRnVuY3Rpb246MSxFcnJvcjoxLEJvb2xlYW46MSxOdW1iZXI6MSxEYXRlOjEsUmVnRXhwOjF9LHRvU3RyaW5nPU9iamVjdFByb3RvW1RPX1NUUklOR107ZnVuY3Rpb24gc2V0VG9TdHJpbmdUYWcoaXQsdGFnLHN0YXQpe2lmKGl0KWhhcyhpdD1zdGF0P2l0Oml0W1BST1RPVFlQRV0sU1lNQk9MX1RBRyl8fGhpZGRlbihpdCxTWU1CT0xfVEFHLHRhZyl9ZnVuY3Rpb24gY29mKGl0KXtyZXR1cm4gaXQ9PXVuZGVmaW5lZD9pdD09PXVuZGVmaW5lZD9cIlVuZGVmaW5lZFwiOlwiTnVsbFwiOnRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsLTEpfWZ1bmN0aW9uIGNsYXNzb2YoaXQpe3ZhciBrbGFzcz1jb2YoaXQpLHRhZztyZXR1cm4ga2xhc3M9PU9CSkVDVCYmKHRhZz1pdFtTWU1CT0xfVEFHXSk/aGFzKGJ1aWxkSW4sdGFnKT9cIn5cIit0YWc6dGFnOmtsYXNzfXZhciBjYWxsPUZ1bmN0aW9uUHJvdG8uY2FsbCxSRUZFUkVOQ0VfR0VUO2Z1bmN0aW9uIHBhcnQoKXt2YXIgbGVuZ3RoPWFyZ3VtZW50cy5sZW5ndGgsYXJncz1BcnJheShsZW5ndGgpLGk9MCxfPXBhdGguXyxob2xkZXI9ZmFsc2U7d2hpbGUobGVuZ3RoPmkpaWYoKGFyZ3NbaV09YXJndW1lbnRzW2krK10pPT09Xylob2xkZXI9dHJ1ZTtyZXR1cm4gcGFydGlhbCh0aGlzLGFyZ3MsbGVuZ3RoLGhvbGRlcixfLGZhbHNlKX1mdW5jdGlvbiBwYXJ0aWFsKGZuLGFyZ3NQYXJ0LGxlbmd0aFBhcnQsaG9sZGVyLF8sYmluZCxjb250ZXh0KXthc3NlcnRGdW5jdGlvbihmbik7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHRoYXQ9YmluZD9jb250ZXh0OnRoaXMsbGVuZ3RoPWFyZ3VtZW50cy5sZW5ndGgsaT0wLGo9MCxhcmdzO2lmKCFob2xkZXImJiFsZW5ndGgpcmV0dXJuIGludm9rZShmbixhcmdzUGFydCx0aGF0KTthcmdzPWFyZ3NQYXJ0LnNsaWNlKCk7aWYoaG9sZGVyKWZvcig7bGVuZ3RoUGFydD5pO2krKylpZihhcmdzW2ldPT09XylhcmdzW2ldPWFyZ3VtZW50c1tqKytdO3doaWxlKGxlbmd0aD5qKWFyZ3MucHVzaChhcmd1bWVudHNbaisrXSk7cmV0dXJuIGludm9rZShmbixhcmdzLHRoYXQpfX1mdW5jdGlvbiBjdHgoZm4sdGhhdCxsZW5ndGgpe2Fzc2VydEZ1bmN0aW9uKGZuKTtpZih+bGVuZ3RoJiZ0aGF0PT09dW5kZWZpbmVkKXJldHVybiBmbjtzd2l0Y2gobGVuZ3RoKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKGEpe3JldHVybiBmbi5jYWxsKHRoYXQsYSl9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24oYSxiKXtyZXR1cm4gZm4uY2FsbCh0aGF0LGEsYil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24oYSxiLGMpe3JldHVybiBmbi5jYWxsKHRoYXQsYSxiLGMpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZm4uYXBwbHkodGhhdCxhcmd1bWVudHMpfX1mdW5jdGlvbiBpbnZva2UoZm4sYXJncyx0aGF0KXt2YXIgdW49dGhhdD09PXVuZGVmaW5lZDtzd2l0Y2goYXJncy5sZW5ndGh8MCl7Y2FzZSAwOnJldHVybiB1bj9mbigpOmZuLmNhbGwodGhhdCk7Y2FzZSAxOnJldHVybiB1bj9mbihhcmdzWzBdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSk7Y2FzZSAyOnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0pO2Nhc2UgMzpyZXR1cm4gdW4/Zm4oYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSk7Y2FzZSA0OnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0sYXJnc1szXSk7Y2FzZSA1OnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdLGFyZ3NbNF0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdLGFyZ3NbNF0pfXJldHVybiBmbi5hcHBseSh0aGF0LGFyZ3MpfXZhciBjcmVhdGU9T2JqZWN0LmNyZWF0ZSxnZXRQcm90b3R5cGVPZj1PYmplY3QuZ2V0UHJvdG90eXBlT2YsZGVmaW5lUHJvcGVydHk9T2JqZWN0LmRlZmluZVByb3BlcnR5LGRlZmluZVByb3BlcnRpZXM9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsZ2V0T3duRGVzY3JpcHRvcj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLGdldEtleXM9T2JqZWN0LmtleXMsZ2V0TmFtZXM9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsZ2V0U3ltYm9scz1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLGhhcz1jdHgoY2FsbCxPYmplY3RQcm90b1tIQVNfT1dOXSwyKSxFUzVPYmplY3Q9T2JqZWN0O2Z1bmN0aW9uIGdldChvYmplY3Qsa2V5KXtpZihoYXMob2JqZWN0LGtleSkpcmV0dXJuIG9iamVjdFtrZXldfWZ1bmN0aW9uIG93bktleXMoaXQpe3JldHVybiBnZXRTeW1ib2xzP2dldE5hbWVzKGl0KS5jb25jYXQoZ2V0U3ltYm9scyhpdCkpOmdldE5hbWVzKGl0KX12YXIgYXNzaWduPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHRhcmdldCxzb3VyY2Upe3ZhciBUPU9iamVjdChhc3NlcnREZWZpbmVkKHRhcmdldCkpLGw9YXJndW1lbnRzLmxlbmd0aCxpPTE7d2hpbGUobD5pKXt2YXIgUz1FUzVPYmplY3QoYXJndW1lbnRzW2krK10pLGtleXM9Z2V0S2V5cyhTKSxsZW5ndGg9a2V5cy5sZW5ndGgsaj0wLGtleTt3aGlsZShsZW5ndGg+ailUW2tleT1rZXlzW2orK11dPVNba2V5XX1yZXR1cm4gVH07ZnVuY3Rpb24ga2V5T2Yob2JqZWN0LGVsKXt2YXIgTz1FUzVPYmplY3Qob2JqZWN0KSxrZXlzPWdldEtleXMoTyksbGVuZ3RoPWtleXMubGVuZ3RoLGluZGV4PTAsa2V5O3doaWxlKGxlbmd0aD5pbmRleClpZihPW2tleT1rZXlzW2luZGV4KytdXT09PWVsKXJldHVybiBrZXl9ZnVuY3Rpb24gYXJyYXkoaXQpe3JldHVybiBTdHJpbmcoaXQpLnNwbGl0KFwiLFwiKX12YXIgcHVzaD1BcnJheVByb3RvLnB1c2gsdW5zaGlmdD1BcnJheVByb3RvLnVuc2hpZnQsc2xpY2U9QXJyYXlQcm90by5zbGljZSxzcGxpY2U9QXJyYXlQcm90by5zcGxpY2UsaW5kZXhPZj1BcnJheVByb3RvLmluZGV4T2YsZm9yRWFjaD1BcnJheVByb3RvW0ZPUl9FQUNIXTtmdW5jdGlvbiBjcmVhdGVBcnJheU1ldGhvZCh0eXBlKXt2YXIgaXNNYXA9dHlwZT09MSxpc0ZpbHRlcj10eXBlPT0yLGlzU29tZT10eXBlPT0zLGlzRXZlcnk9dHlwZT09NCxpc0ZpbmRJbmRleD10eXBlPT02LG5vaG9sZXM9dHlwZT09NXx8aXNGaW5kSW5kZXg7cmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrZm4sdGhhdCl7dmFyIE89T2JqZWN0KGFzc2VydERlZmluZWQodGhpcykpLHNlbGY9RVM1T2JqZWN0KE8pLGY9Y3R4KGNhbGxiYWNrZm4sdGhhdCwzKSxsZW5ndGg9dG9MZW5ndGgoc2VsZi5sZW5ndGgpLGluZGV4PTAscmVzdWx0PWlzTWFwP0FycmF5KGxlbmd0aCk6aXNGaWx0ZXI/W106dW5kZWZpbmVkLHZhbCxyZXM7Zm9yKDtsZW5ndGg+aW5kZXg7aW5kZXgrKylpZihub2hvbGVzfHxpbmRleCBpbiBzZWxmKXt2YWw9c2VsZltpbmRleF07cmVzPWYodmFsLGluZGV4LE8pO2lmKHR5cGUpe2lmKGlzTWFwKXJlc3VsdFtpbmRleF09cmVzO2Vsc2UgaWYocmVzKXN3aXRjaCh0eXBlKXtjYXNlIDM6cmV0dXJuIHRydWU7Y2FzZSA1OnJldHVybiB2YWw7Y2FzZSA2OnJldHVybiBpbmRleDtjYXNlIDI6cmVzdWx0LnB1c2godmFsKX1lbHNlIGlmKGlzRXZlcnkpcmV0dXJuIGZhbHNlfX1yZXR1cm4gaXNGaW5kSW5kZXg/LTE6aXNTb21lfHxpc0V2ZXJ5P2lzRXZlcnk6cmVzdWx0fX1mdW5jdGlvbiBjcmVhdGVBcnJheUNvbnRhaW5zKGlzQ29udGFpbnMpe3JldHVybiBmdW5jdGlvbihlbCxmcm9tSW5kZXgpe3ZhciBPPUVTNU9iamVjdChhc3NlcnREZWZpbmVkKHRoaXMpKSxsZW5ndGg9dG9MZW5ndGgoTy5sZW5ndGgpLGluZGV4PXRvSW5kZXgoZnJvbUluZGV4LGxlbmd0aCk7aWYoaXNDb250YWlucyYmZWwhPWVsKXtmb3IoO2xlbmd0aD5pbmRleDtpbmRleCsrKWlmKHNhbWVOYU4oT1tpbmRleF0pKXJldHVybiBpc0NvbnRhaW5zfHxpbmRleH1lbHNlIGZvcig7bGVuZ3RoPmluZGV4O2luZGV4KyspaWYoaXNDb250YWluc3x8aW5kZXggaW4gTyl7aWYoT1tpbmRleF09PT1lbClyZXR1cm4gaXNDb250YWluc3x8aW5kZXh9cmV0dXJuIWlzQ29udGFpbnMmJi0xfX1mdW5jdGlvbiB0dXJuKG1hcGZuLHRhcmdldCl7YXNzZXJ0RnVuY3Rpb24obWFwZm4pO3ZhciBtZW1vPXRhcmdldD09dW5kZWZpbmVkP1tdOk9iamVjdCh0YXJnZXQpLE89RVM1T2JqZWN0KHRoaXMpLGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCksaW5kZXg9MDtmb3IoO2xlbmd0aD5pbmRleDtpbmRleCsrKXtpZihtYXBmbihtZW1vLE9baW5kZXhdLGluZGV4LHRoaXMpPT09ZmFsc2UpYnJlYWt9cmV0dXJuIG1lbW99ZnVuY3Rpb24gZ2VuZXJpYyhBLEIpe3JldHVybiB0eXBlb2YgQT09XCJmdW5jdGlvblwiP0E6Qn12YXIgTUFYX1NBRkVfSU5URUdFUj05MDA3MTk5MjU0NzQwOTkxLGNlaWw9TWF0aC5jZWlsLGZsb29yPU1hdGguZmxvb3IsbWF4PU1hdGgubWF4LG1pbj1NYXRoLm1pbixyYW5kb209TWF0aC5yYW5kb20sdHJ1bmM9TWF0aC50cnVuY3x8ZnVuY3Rpb24oaXQpe3JldHVybihpdD4wP2Zsb29yOmNlaWwpKGl0KX07ZnVuY3Rpb24gc2FtZU5hTihudW1iZXIpe3JldHVybiBudW1iZXIhPW51bWJlcn1mdW5jdGlvbiB0b0ludGVnZXIoaXQpe3JldHVybiBpc05hTihpdCk/MDp0cnVuYyhpdCl9ZnVuY3Rpb24gdG9MZW5ndGgoaXQpe3JldHVybiBpdD4wP21pbih0b0ludGVnZXIoaXQpLE1BWF9TQUZFX0lOVEVHRVIpOjB9ZnVuY3Rpb24gdG9JbmRleChpbmRleCxsZW5ndGgpe3ZhciBpbmRleD10b0ludGVnZXIoaW5kZXgpO3JldHVybiBpbmRleDwwP21heChpbmRleCtsZW5ndGgsMCk6bWluKGluZGV4LGxlbmd0aCl9ZnVuY3Rpb24gY3JlYXRlUmVwbGFjZXIocmVnRXhwLHJlcGxhY2UsaXNTdGF0aWMpe3ZhciByZXBsYWNlcj1pc09iamVjdChyZXBsYWNlKT9mdW5jdGlvbihwYXJ0KXtyZXR1cm4gcmVwbGFjZVtwYXJ0XX06cmVwbGFjZTtyZXR1cm4gZnVuY3Rpb24oaXQpe3JldHVybiBTdHJpbmcoaXNTdGF0aWM/aXQ6dGhpcykucmVwbGFjZShyZWdFeHAscmVwbGFjZXIpfX1mdW5jdGlvbiBjcmVhdGVQb2ludEF0KHRvU3RyaW5nKXtyZXR1cm4gZnVuY3Rpb24ocG9zKXt2YXIgcz1TdHJpbmcoYXNzZXJ0RGVmaW5lZCh0aGlzKSksaT10b0ludGVnZXIocG9zKSxsPXMubGVuZ3RoLGEsYjtpZihpPDB8fGk+PWwpcmV0dXJuIHRvU3RyaW5nP1wiXCI6dW5kZWZpbmVkO2E9cy5jaGFyQ29kZUF0KGkpO3JldHVybiBhPDU1Mjk2fHxhPjU2MzE5fHxpKzE9PT1sfHwoYj1zLmNoYXJDb2RlQXQoaSsxKSk8NTYzMjB8fGI+NTczNDM/dG9TdHJpbmc/cy5jaGFyQXQoaSk6YTp0b1N0cmluZz9zLnNsaWNlKGksaSsyKTooYS01NTI5Njw8MTApKyhiLTU2MzIwKSs2NTUzNn19dmFyIFJFRFVDRV9FUlJPUj1cIlJlZHVjZSBvZiBlbXB0eSBvYmplY3Qgd2l0aCBubyBpbml0aWFsIHZhbHVlXCI7ZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbixtc2cxLG1zZzIpe2lmKCFjb25kaXRpb24pdGhyb3cgVHlwZUVycm9yKG1zZzI/bXNnMSttc2cyOm1zZzEpfWZ1bmN0aW9uIGFzc2VydERlZmluZWQoaXQpe2lmKGl0PT11bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiRnVuY3Rpb24gY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRGdW5jdGlvbihpdCl7YXNzZXJ0KGlzRnVuY3Rpb24oaXQpLGl0LFwiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gaXR9ZnVuY3Rpb24gYXNzZXJ0T2JqZWN0KGl0KXthc3NlcnQoaXNPYmplY3QoaXQpLGl0LFwiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRJbnN0YW5jZShpdCxDb25zdHJ1Y3RvcixuYW1lKXthc3NlcnQoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcixuYW1lLFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKX1mdW5jdGlvbiBkZXNjcmlwdG9yKGJpdG1hcCx2YWx1ZSl7cmV0dXJue2VudW1lcmFibGU6IShiaXRtYXAmMSksY29uZmlndXJhYmxlOiEoYml0bWFwJjIpLHdyaXRhYmxlOiEoYml0bWFwJjQpLHZhbHVlOnZhbHVlfX1mdW5jdGlvbiBzaW1wbGVTZXQob2JqZWN0LGtleSx2YWx1ZSl7b2JqZWN0W2tleV09dmFsdWU7cmV0dXJuIG9iamVjdH1mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7cmV0dXJuIERFU0M/ZnVuY3Rpb24ob2JqZWN0LGtleSx2YWx1ZSl7cmV0dXJuIGRlZmluZVByb3BlcnR5KG9iamVjdCxrZXksZGVzY3JpcHRvcihiaXRtYXAsdmFsdWUpKX06c2ltcGxlU2V0fWZ1bmN0aW9uIHVpZChrZXkpe3JldHVybiBTWU1CT0wrXCIoXCIra2V5K1wiKV9cIisoKytzaWQrcmFuZG9tKCkpW1RPX1NUUklOR10oMzYpfWZ1bmN0aW9uIGdldFdlbGxLbm93blN5bWJvbChuYW1lLHNldHRlcil7cmV0dXJuIFN5bWJvbCYmU3ltYm9sW25hbWVdfHwoc2V0dGVyP1N5bWJvbDpzYWZlU3ltYm9sKShTWU1CT0wrRE9UK25hbWUpfXZhciBERVNDPSEhZnVuY3Rpb24oKXt0cnl7cmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LDAsT2JqZWN0UHJvdG8pfWNhdGNoKGUpe319KCksc2lkPTAsaGlkZGVuPWNyZWF0ZURlZmluZXIoMSksc2V0PVN5bWJvbD9zaW1wbGVTZXQ6aGlkZGVuLHNhZmVTeW1ib2w9U3ltYm9sfHx1aWQ7ZnVuY3Rpb24gYXNzaWduSGlkZGVuKHRhcmdldCxzcmMpe2Zvcih2YXIga2V5IGluIHNyYyloaWRkZW4odGFyZ2V0LGtleSxzcmNba2V5XSk7cmV0dXJuIHRhcmdldH12YXIgU1lNQk9MX0lURVJBVE9SPWdldFdlbGxLbm93blN5bWJvbChJVEVSQVRPUiksU1lNQk9MX1RBRz1nZXRXZWxsS25vd25TeW1ib2woVE9fU1RSSU5HX1RBRyksU1VQUE9SVF9GRl9JVEVSPUZGX0lURVJBVE9SIGluIEFycmF5UHJvdG8sSVRFUj1zYWZlU3ltYm9sKFwiaXRlclwiKSxLRVk9MSxWQUxVRT0yLEl0ZXJhdG9ycz17fSxJdGVyYXRvclByb3RvdHlwZT17fSxOQVRJVkVfSVRFUkFUT1JTPVNZTUJPTF9JVEVSQVRPUiBpbiBBcnJheVByb3RvLEJVR0dZX0lURVJBVE9SUz1cImtleXNcImluIEFycmF5UHJvdG8mJiEoXCJuZXh0XCJpbltdLmtleXMoKSk7c2V0SXRlcmF0b3IoSXRlcmF0b3JQcm90b3R5cGUscmV0dXJuVGhpcyk7ZnVuY3Rpb24gc2V0SXRlcmF0b3IoTyx2YWx1ZSl7aGlkZGVuKE8sU1lNQk9MX0lURVJBVE9SLHZhbHVlKTtTVVBQT1JUX0ZGX0lURVImJmhpZGRlbihPLEZGX0lURVJBVE9SLHZhbHVlKX1mdW5jdGlvbiBjcmVhdGVJdGVyYXRvcihDb25zdHJ1Y3RvcixOQU1FLG5leHQscHJvdG8pe0NvbnN0cnVjdG9yW1BST1RPVFlQRV09Y3JlYXRlKHByb3RvfHxJdGVyYXRvclByb3RvdHlwZSx7bmV4dDpkZXNjcmlwdG9yKDEsbmV4dCl9KTtzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvcixOQU1FK1wiIEl0ZXJhdG9yXCIpfWZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yKENvbnN0cnVjdG9yLE5BTUUsdmFsdWUsREVGQVVMVCl7dmFyIHByb3RvPUNvbnN0cnVjdG9yW1BST1RPVFlQRV0saXRlcj1nZXQocHJvdG8sU1lNQk9MX0lURVJBVE9SKXx8Z2V0KHByb3RvLEZGX0lURVJBVE9SKXx8REVGQVVMVCYmZ2V0KHByb3RvLERFRkFVTFQpfHx2YWx1ZTtpZihmcmFtZXdvcmspe3NldEl0ZXJhdG9yKHByb3RvLGl0ZXIpO2lmKGl0ZXIhPT12YWx1ZSl7dmFyIGl0ZXJQcm90bz1nZXRQcm90b3R5cGVPZihpdGVyLmNhbGwobmV3IENvbnN0cnVjdG9yKSk7c2V0VG9TdHJpbmdUYWcoaXRlclByb3RvLE5BTUUrXCIgSXRlcmF0b3JcIix0cnVlKTtoYXMocHJvdG8sRkZfSVRFUkFUT1IpJiZzZXRJdGVyYXRvcihpdGVyUHJvdG8scmV0dXJuVGhpcyl9fUl0ZXJhdG9yc1tOQU1FXT1pdGVyO0l0ZXJhdG9yc1tOQU1FK1wiIEl0ZXJhdG9yXCJdPXJldHVyblRoaXN9ZnVuY3Rpb24gZGVmaW5lU3RkSXRlcmF0b3JzKEJhc2UsTkFNRSxDb25zdHJ1Y3RvcixuZXh0LERFRkFVTFQpe2Z1bmN0aW9uIGNyZWF0ZUl0ZXIoa2luZCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLGtpbmQpfX1jcmVhdGVJdGVyYXRvcihDb25zdHJ1Y3RvcixOQU1FLG5leHQpO2RlZmluZUl0ZXJhdG9yKEJhc2UsTkFNRSxjcmVhdGVJdGVyKERFRkFVTFQpLERFRkFVTFQ9PVZBTFVFP1widmFsdWVzXCI6XCJlbnRyaWVzXCIpO0RFRkFVTFQmJiRkZWZpbmUoUFJPVE8rRk9SQ0VEKkJVR0dZX0lURVJBVE9SUyxOQU1FLHtlbnRyaWVzOmNyZWF0ZUl0ZXIoS0VZK1ZBTFVFKSxrZXlzOmNyZWF0ZUl0ZXIoS0VZKSx2YWx1ZXM6Y3JlYXRlSXRlcihWQUxVRSl9KX1mdW5jdGlvbiBpdGVyUmVzdWx0KGRvbmUsdmFsdWUpe3JldHVybnt2YWx1ZTp2YWx1ZSxkb25lOiEhZG9uZX19ZnVuY3Rpb24gaXNJdGVyYWJsZShpdCl7dmFyIE89T2JqZWN0KGl0KTtyZXR1cm4gU1lNQk9MX0lURVJBVE9SIGluIE98fGhhcyhJdGVyYXRvcnMsY2xhc3NvZihPKSl9ZnVuY3Rpb24gZ2V0SXRlcmF0b3IoaXQpe3JldHVybiBhc3NlcnRPYmplY3QoKGl0W1NZTUJPTF9JVEVSQVRPUl18fEl0ZXJhdG9yc1tjbGFzc29mKGl0KV0pLmNhbGwoaXQpKX1mdW5jdGlvbiBzdGVwQ2FsbChmbix2YWx1ZSxlbnRyaWVzKXtyZXR1cm4gZW50cmllcz9pbnZva2UoZm4sdmFsdWUpOmZuKHZhbHVlKX1mdW5jdGlvbiBmb3JPZihpdGVyYWJsZSxlbnRyaWVzLGZuLHRoYXQpe3ZhciBpdGVyYXRvcj1nZXRJdGVyYXRvcihpdGVyYWJsZSksZj1jdHgoZm4sdGhhdCxlbnRyaWVzPzI6MSksc3RlcDt3aGlsZSghKHN0ZXA9aXRlcmF0b3IubmV4dCgpKS5kb25lKWlmKHN0ZXBDYWxsKGYsc3RlcC52YWx1ZSxlbnRyaWVzKT09PWZhbHNlKXJldHVybn12YXIgTk9ERT1jb2YocHJvY2Vzcyk9PVBST0NFU1MsY29yZT17fSxwYXRoPWZyYW1ld29yaz9nbG9iYWw6Y29yZSxvbGQ9Z2xvYmFsLmNvcmUsRk9SQ0VEPTEsR0xPQkFMPTIsU1RBVElDPTQsUFJPVE89OCxCSU5EPTE2LFdSQVA9MzI7ZnVuY3Rpb24gJGRlZmluZSh0eXBlLG5hbWUsc291cmNlKXt2YXIga2V5LG93bixvdXQsZXhwLGlzR2xvYmFsPXR5cGUmR0xPQkFMLHRhcmdldD1pc0dsb2JhbD9nbG9iYWw6dHlwZSZTVEFUSUM/Z2xvYmFsW25hbWVdOihnbG9iYWxbbmFtZV18fE9iamVjdFByb3RvKVtQUk9UT1RZUEVdLGV4cG9ydHM9aXNHbG9iYWw/Y29yZTpjb3JlW25hbWVdfHwoY29yZVtuYW1lXT17fSk7aWYoaXNHbG9iYWwpc291cmNlPW5hbWU7Zm9yKGtleSBpbiBzb3VyY2Upe293bj0hKHR5cGUmRk9SQ0VEKSYmdGFyZ2V0JiZrZXkgaW4gdGFyZ2V0JiYoIWlzRnVuY3Rpb24odGFyZ2V0W2tleV0pfHxpc05hdGl2ZSh0YXJnZXRba2V5XSkpO291dD0ob3duP3RhcmdldDpzb3VyY2UpW2tleV07aWYodHlwZSZCSU5EJiZvd24pZXhwPWN0eChvdXQsZ2xvYmFsKTtlbHNlIGlmKHR5cGUmV1JBUCYmIWZyYW1ld29yayYmdGFyZ2V0W2tleV09PW91dCl7ZXhwPWZ1bmN0aW9uKHBhcmFtKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIG91dD9uZXcgb3V0KHBhcmFtKTpvdXQocGFyYW0pfTtleHBbUFJPVE9UWVBFXT1vdXRbUFJPVE9UWVBFXX1lbHNlIGV4cD10eXBlJlBST1RPJiZpc0Z1bmN0aW9uKG91dCk/Y3R4KGNhbGwsb3V0KTpvdXQ7aWYoZXhwb3J0c1trZXldIT1vdXQpaGlkZGVuKGV4cG9ydHMsa2V5LGV4cCk7aWYoZnJhbWV3b3JrJiZ0YXJnZXQmJiFvd24pe2lmKGlzR2xvYmFsKXRhcmdldFtrZXldPW91dDtlbHNlIGRlbGV0ZSB0YXJnZXRba2V5XSYmaGlkZGVuKHRhcmdldCxrZXksb3V0KX19fWlmKE5PREUpbW9kdWxlLmV4cG9ydHM9Y29yZTtpZihpc0Z1bmN0aW9uKGRlZmluZSkmJmRlZmluZS5hbWQpZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGNvcmV9KTtpZighTk9ERXx8ZnJhbWV3b3JrKXtjb3JlLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtnbG9iYWwuY29yZT1vbGQ7cmV0dXJuIGNvcmV9O2dsb2JhbC5jb3JlPWNvcmV9JGRlZmluZShHTE9CQUwrRk9SQ0VELHtnbG9iYWw6Z2xvYmFsfSk7IWZ1bmN0aW9uKFRBRyxTeW1ib2xSZWdpc3RyeSxzZXR0ZXIpe2lmKCFpc05hdGl2ZShTeW1ib2wpKXtTeW1ib2w9ZnVuY3Rpb24oZGVzY3JpcHRpb24pe2Fzc2VydCghKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpLFNZTUJPTCtcIiBpcyBub3QgYSBcIitDT05TVFJVQ1RPUik7dmFyIHRhZz11aWQoZGVzY3JpcHRpb24pO3NldHRlciYmZGVmaW5lUHJvcGVydHkoT2JqZWN0UHJvdG8sdGFnLHtjb25maWd1cmFibGU6dHJ1ZSxzZXQ6ZnVuY3Rpb24odmFsdWUpe2hpZGRlbih0aGlzLHRhZyx2YWx1ZSl9fSk7cmV0dXJuIHNldChjcmVhdGUoU3ltYm9sW1BST1RPVFlQRV0pLFRBRyx0YWcpfTtoaWRkZW4oU3ltYm9sW1BST1RPVFlQRV0sVE9fU1RSSU5HLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbVEFHXX0pfSRkZWZpbmUoR0xPQkFMK1dSQVAse1N5bWJvbDpTeW1ib2x9KTt2YXIgc3ltYm9sU3RhdGljcz17XCJmb3JcIjpmdW5jdGlvbihrZXkpe3JldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksa2V5Kz1cIlwiKT9TeW1ib2xSZWdpc3RyeVtrZXldOlN5bWJvbFJlZ2lzdHJ5W2tleV09U3ltYm9sKGtleSl9LGl0ZXJhdG9yOlNZTUJPTF9JVEVSQVRPUixrZXlGb3I6cGFydC5jYWxsKGtleU9mLFN5bWJvbFJlZ2lzdHJ5KSx0b1N0cmluZ1RhZzpTWU1CT0xfVEFHPWdldFdlbGxLbm93blN5bWJvbChUT19TVFJJTkdfVEFHLHRydWUpLHB1cmU6c2FmZVN5bWJvbCxzZXQ6c2V0LHVzZVNldHRlcjpmdW5jdGlvbigpe3NldHRlcj10cnVlfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtzZXR0ZXI9ZmFsc2V9fTtmb3JFYWNoLmNhbGwoYXJyYXkoXCJoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsbWF0Y2gscmVwbGFjZSxzZWFyY2gsXCIrXCJzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHVuc2NvcGFibGVzXCIpLGZ1bmN0aW9uKGl0KXtzeW1ib2xTdGF0aWNzW2l0XT1nZXRXZWxsS25vd25TeW1ib2woaXQpfSk7JGRlZmluZShTVEFUSUMsU1lNQk9MLHN5bWJvbFN0YXRpY3MpO3NldFRvU3RyaW5nVGFnKFN5bWJvbCxTWU1CT0wpOyRkZWZpbmUoR0xPQkFMLHtSZWZsZWN0Ontvd25LZXlzOm93bktleXN9fSl9KHNhZmVTeW1ib2woXCJ0YWdcIikse30sdHJ1ZSk7IWZ1bmN0aW9uKGlzRmluaXRlLHRtcCl7dmFyIFJhbmdlRXJyb3I9Z2xvYmFsLlJhbmdlRXJyb3IsaXNJbnRlZ2VyPU51bWJlci5pc0ludGVnZXJ8fGZ1bmN0aW9uKGl0KXtyZXR1cm4haXNPYmplY3QoaXQpJiZpc0Zpbml0ZShpdCkmJmZsb29yKGl0KT09PWl0fSxzaWduPU1hdGguc2lnbnx8ZnVuY3Rpb24gc2lnbihpdCl7cmV0dXJuKGl0PStpdCk9PTB8fGl0IT1pdD9pdDppdDwwPy0xOjF9LHBvdz1NYXRoLnBvdyxhYnM9TWF0aC5hYnMsZXhwPU1hdGguZXhwLGxvZz1NYXRoLmxvZyxzcXJ0PU1hdGguc3FydCxmY2M9U3RyaW5nLmZyb21DaGFyQ29kZSxhdD1jcmVhdGVQb2ludEF0KHRydWUpO3ZhciBvYmplY3RTdGF0aWM9e2Fzc2lnbjphc3NpZ24saXM6ZnVuY3Rpb24oeCx5KXtyZXR1cm4geD09PXk/eCE9PTB8fDEveD09PTEveTp4IT14JiZ5IT15fX07XCJfX3Byb3RvX19cImluIE9iamVjdFByb3RvJiZmdW5jdGlvbihidWdneSxzZXQpe3RyeXtzZXQ9Y3R4KGNhbGwsZ2V0T3duRGVzY3JpcHRvcihPYmplY3RQcm90byxcIl9fcHJvdG9fX1wiKS5zZXQsMik7c2V0KHt9LEFycmF5UHJvdG8pfWNhdGNoKGUpe2J1Z2d5PXRydWV9b2JqZWN0U3RhdGljLnNldFByb3RvdHlwZU9mPWZ1bmN0aW9uKE8scHJvdG8pe2Fzc2VydE9iamVjdChPKTthc3NlcnQocHJvdG89PT1udWxsfHxpc09iamVjdChwcm90bykscHJvdG8sXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO2lmKGJ1Z2d5KU8uX19wcm90b19fPXByb3RvO2Vsc2Ugc2V0KE8scHJvdG8pO3JldHVybiBPfX0oKTskZGVmaW5lKFNUQVRJQyxPQkpFQ1Qsb2JqZWN0U3RhdGljKTtmdW5jdGlvbiBhc2luaCh4KXtyZXR1cm4haXNGaW5pdGUoeD0reCl8fHg9PTA/eDp4PDA/LWFzaW5oKC14KTpsb2coeCtzcXJ0KHgqeCsxKSl9JGRlZmluZShTVEFUSUMsTlVNQkVSLHtFUFNJTE9OOnBvdygyLC01MiksaXNGaW5pdGU6ZnVuY3Rpb24oaXQpe3JldHVybiB0eXBlb2YgaXQ9PVwibnVtYmVyXCImJmlzRmluaXRlKGl0KX0saXNJbnRlZ2VyOmlzSW50ZWdlcixpc05hTjpzYW1lTmFOLGlzU2FmZUludGVnZXI6ZnVuY3Rpb24obnVtYmVyKXtyZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikmJmFicyhudW1iZXIpPD1NQVhfU0FGRV9JTlRFR0VSfSxNQVhfU0FGRV9JTlRFR0VSOk1BWF9TQUZFX0lOVEVHRVIsTUlOX1NBRkVfSU5URUdFUjotTUFYX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0OnBhcnNlRmxvYXQscGFyc2VJbnQ6cGFyc2VJbnR9KTskZGVmaW5lKFNUQVRJQyxNQVRILHthY29zaDpmdW5jdGlvbih4KXtyZXR1cm4geDwxP05hTjpsb2coeCtzcXJ0KHgqeC0xKSl9LGFzaW5oOmFzaW5oLGF0YW5oOmZ1bmN0aW9uKHgpe3JldHVybiB4PT0wPyt4OmxvZygoMSsgK3gpLygxLXgpKS8yfSxjYnJ0OmZ1bmN0aW9uKHgpe3JldHVybiBzaWduKHgpKnBvdyhhYnMoeCksMS8zKX0sY2x6MzI6ZnVuY3Rpb24oeCl7cmV0dXJuKHg+Pj49MCk/MzIteFtUT19TVFJJTkddKDIpLmxlbmd0aDozMn0sY29zaDpmdW5jdGlvbih4KXtyZXR1cm4oZXhwKHgpK2V4cCgteCkpLzJ9LGV4cG0xOmZ1bmN0aW9uKHgpe3JldHVybiB4PT0wPyt4Ong+LTFlLTYmJng8MWUtNj8reCt4KngvMjpleHAoeCktMX0sZnJvdW5kOmZ1bmN0aW9uKHgpe3JldHVybiBuZXcgRmxvYXQzMkFycmF5KFt4XSlbMF19LGh5cG90OmZ1bmN0aW9uKHZhbHVlMSx2YWx1ZTIpe3ZhciBzdW09MCxsZW5ndGg9YXJndW1lbnRzLmxlbmd0aCx2YWx1ZTt3aGlsZShsZW5ndGgtLSl7dmFsdWU9K2FyZ3VtZW50c1tsZW5ndGhdO2lmKHZhbHVlPT1JbmZpbml0eXx8dmFsdWU9PS1JbmZpbml0eSlyZXR1cm4gSW5maW5pdHk7c3VtKz12YWx1ZSp2YWx1ZX1yZXR1cm4gc3FydChzdW0pfSxpbXVsOmZ1bmN0aW9uKHgseSl7dmFyIFVJbnQxNj02NTUzNSx4bD1VSW50MTYmeCx5bD1VSW50MTYmeTtyZXR1cm4gMHx4bCp5bCsoKFVJbnQxNiZ4Pj4+MTYpKnlsK3hsKihVSW50MTYmeT4+PjE2KTw8MTY+Pj4wKX0sbG9nMXA6ZnVuY3Rpb24oeCl7cmV0dXJuIHg+LTFlLTgmJng8MWUtOD94LXgqeC8yOmxvZygxKyAreCl9LGxvZzEwOmZ1bmN0aW9uKHgpe3JldHVybiBsb2coeCkvTWF0aC5MTjEwfSxsb2cyOmZ1bmN0aW9uKHgpe3JldHVybiBsb2coeCkvTWF0aC5MTjJ9LHNpZ246c2lnbixzaW5oOmZ1bmN0aW9uKHgpe3JldHVybiB4PT0wPyt4OihleHAoeCktZXhwKC14KSkvMn0sdGFuaDpmdW5jdGlvbih4KXtyZXR1cm4gaXNGaW5pdGUoeCk/eD09MD8reDooZXhwKHgpLWV4cCgteCkpLyhleHAoeCkrZXhwKC14KSk6c2lnbih4KX0sdHJ1bmM6dHJ1bmN9KTtzZXRUb1N0cmluZ1RhZyhNYXRoLE1BVEgsdHJ1ZSk7ZnVuY3Rpb24gYXNzZXJ0Tm90UmVnRXhwKGl0KXtpZihpc09iamVjdChpdCkmJml0IGluc3RhbmNlb2YgUmVnRXhwKXRocm93IFR5cGVFcnJvcigpfSRkZWZpbmUoU1RBVElDLFNUUklORyx7ZnJvbUNvZGVQb2ludDpmdW5jdGlvbigpe3ZhciByZXM9W10sbGVuPWFyZ3VtZW50cy5sZW5ndGgsaT0wLGNvZGU7d2hpbGUobGVuPmkpe2NvZGU9K2FyZ3VtZW50c1tpKytdO2lmKHRvSW5kZXgoY29kZSwxMTE0MTExKSE9PWNvZGUpdGhyb3cgUmFuZ2VFcnJvcihjb2RlK1wiIGlzIG5vdCBhIHZhbGlkIGNvZGUgcG9pbnRcIik7cmVzLnB1c2goY29kZTw2NTUzNj9mY2MoY29kZSk6ZmNjKCgoY29kZS09NjU1MzYpPj4xMCkrNTUyOTYsY29kZSUxMDI0KzU2MzIwKSl9cmV0dXJuIHJlcy5qb2luKFwiXCIpfSxyYXc6ZnVuY3Rpb24oY2FsbFNpdGUpe3ZhciByYXc9RVM1T2JqZWN0KGFzc2VydERlZmluZWQoY2FsbFNpdGUucmF3KSksbGVuPXRvTGVuZ3RoKHJhdy5sZW5ndGgpLHNsbj1hcmd1bWVudHMubGVuZ3RoLHJlcz1bXSxpPTA7d2hpbGUobGVuPmkpe3Jlcy5wdXNoKFN0cmluZyhyYXdbaSsrXSkpO2lmKGk8c2xuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKX1yZXR1cm4gcmVzLmpvaW4oXCJcIil9fSk7JGRlZmluZShQUk9UTyxTVFJJTkcse2NvZGVQb2ludEF0OmNyZWF0ZVBvaW50QXQoZmFsc2UpLGVuZHNXaXRoOmZ1bmN0aW9uKHNlYXJjaFN0cmluZyxlbmRQb3NpdGlvbil7YXNzZXJ0Tm90UmVnRXhwKHNlYXJjaFN0cmluZyk7dmFyIGxlbj10aGlzLmxlbmd0aCxlbmQ9ZW5kUG9zaXRpb249PT11bmRlZmluZWQ/bGVuOm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksbGVuKTtzZWFyY2hTdHJpbmcrPVwiXCI7cmV0dXJuIFN0cmluZyh0aGlzKS5zbGljZShlbmQtc2VhcmNoU3RyaW5nLmxlbmd0aCxlbmQpPT09c2VhcmNoU3RyaW5nfSxpbmNsdWRlczpmdW5jdGlvbihzZWFyY2hTdHJpbmcscG9zaXRpb24pe3JldHVybiEhflN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKS5pbmRleE9mKHNlYXJjaFN0cmluZyxwb3NpdGlvbil9LHJlcGVhdDpmdW5jdGlvbihjb3VudCl7dmFyIHN0cj1TdHJpbmcoYXNzZXJ0RGVmaW5lZCh0aGlzKSkscmVzPVwiXCIsbj10b0ludGVnZXIoY291bnQpO2lmKDA+bnx8bj09SW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO2Zvcig7bj4wOyhuPj4+PTEpJiYoc3RyKz1zdHIpKWlmKG4mMSlyZXMrPXN0cjtyZXR1cm4gcmVzfSxzdGFydHNXaXRoOmZ1bmN0aW9uKHNlYXJjaFN0cmluZyxwb3NpdGlvbil7YXNzZXJ0Tm90UmVnRXhwKHNlYXJjaFN0cmluZyk7dmFyIGluZGV4PXRvTGVuZ3RoKG1pbihwb3NpdGlvbix0aGlzLmxlbmd0aCkpO3NlYXJjaFN0cmluZys9XCJcIjtyZXR1cm4gU3RyaW5nKHRoaXMpLnNsaWNlKGluZGV4LGluZGV4K3NlYXJjaFN0cmluZy5sZW5ndGgpPT09c2VhcmNoU3RyaW5nfX0pO2RlZmluZVN0ZEl0ZXJhdG9ycyhTdHJpbmcsU1RSSU5HLGZ1bmN0aW9uKGl0ZXJhdGVkKXtzZXQodGhpcyxJVEVSLHtvOlN0cmluZyhpdGVyYXRlZCksaTowfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxPPWl0ZXIubyxpbmRleD1pdGVyLmkscG9pbnQ7aWYoaW5kZXg+PU8ubGVuZ3RoKXJldHVybiBpdGVyUmVzdWx0KDEpO3BvaW50PWF0LmNhbGwoTyxpbmRleCk7aXRlci5pKz1wb2ludC5sZW5ndGg7cmV0dXJuIGl0ZXJSZXN1bHQoMCxwb2ludCl9KTskZGVmaW5lKFNUQVRJQyxBUlJBWSx7ZnJvbTpmdW5jdGlvbihhcnJheUxpa2UsbWFwZm4sdGhhdCl7dmFyIE89T2JqZWN0KGFzc2VydERlZmluZWQoYXJyYXlMaWtlKSkscmVzdWx0PW5ldyhnZW5lcmljKHRoaXMsQXJyYXkpKSxtYXBwaW5nPW1hcGZuIT09dW5kZWZpbmVkLGY9bWFwcGluZz9jdHgobWFwZm4sdGhhdCwyKTp1bmRlZmluZWQsaW5kZXg9MCxsZW5ndGg7aWYoaXNJdGVyYWJsZShPKSlmb3IodmFyIGl0ZXI9Z2V0SXRlcmF0b3IoTyksc3RlcDshKHN0ZXA9aXRlci5uZXh0KCkpLmRvbmU7aW5kZXgrKyl7cmVzdWx0W2luZGV4XT1tYXBwaW5nP2Yoc3RlcC52YWx1ZSxpbmRleCk6c3RlcC52YWx1ZX1lbHNlIGZvcihsZW5ndGg9dG9MZW5ndGgoTy5sZW5ndGgpO2xlbmd0aD5pbmRleDtpbmRleCsrKXtyZXN1bHRbaW5kZXhdPW1hcHBpbmc/ZihPW2luZGV4XSxpbmRleCk6T1tpbmRleF19cmVzdWx0Lmxlbmd0aD1pbmRleDtyZXR1cm4gcmVzdWx0fSxvZjpmdW5jdGlvbigpe3ZhciBpbmRleD0wLGxlbmd0aD1hcmd1bWVudHMubGVuZ3RoLHJlc3VsdD1uZXcoZ2VuZXJpYyh0aGlzLEFycmF5KSkobGVuZ3RoKTt3aGlsZShsZW5ndGg+aW5kZXgpcmVzdWx0W2luZGV4XT1hcmd1bWVudHNbaW5kZXgrK107cmVzdWx0Lmxlbmd0aD1sZW5ndGg7cmV0dXJuIHJlc3VsdH19KTskZGVmaW5lKFBST1RPLEFSUkFZLHtjb3B5V2l0aGluOmZ1bmN0aW9uKHRhcmdldCxzdGFydCxlbmQpe3ZhciBPPU9iamVjdChhc3NlcnREZWZpbmVkKHRoaXMpKSxsZW49dG9MZW5ndGgoTy5sZW5ndGgpLHRvPXRvSW5kZXgodGFyZ2V0LGxlbiksZnJvbT10b0luZGV4KHN0YXJ0LGxlbiksZmluPWVuZD09PXVuZGVmaW5lZD9sZW46dG9JbmRleChlbmQsbGVuKSxjb3VudD1taW4oZmluLWZyb20sbGVuLXRvKSxpbmM9MTtpZihmcm9tPHRvJiZ0bzxmcm9tK2NvdW50KXtpbmM9LTE7ZnJvbT1mcm9tK2NvdW50LTE7dG89dG8rY291bnQtMX13aGlsZShjb3VudC0tPjApe2lmKGZyb20gaW4gTylPW3RvXT1PW2Zyb21dO2Vsc2UgZGVsZXRlIE9bdG9dO3RvKz1pbmM7ZnJvbSs9aW5jfXJldHVybiBPfSxmaWxsOmZ1bmN0aW9uKHZhbHVlLHN0YXJ0LGVuZCl7dmFyIE89T2JqZWN0KGFzc2VydERlZmluZWQodGhpcykpLGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCksaW5kZXg9dG9JbmRleChzdGFydCxsZW5ndGgpLGVuZFBvcz1lbmQ9PT11bmRlZmluZWQ/bGVuZ3RoOnRvSW5kZXgoZW5kLGxlbmd0aCk7d2hpbGUoZW5kUG9zPmluZGV4KU9baW5kZXgrK109dmFsdWU7cmV0dXJuIE99LGZpbmQ6Y3JlYXRlQXJyYXlNZXRob2QoNSksZmluZEluZGV4OmNyZWF0ZUFycmF5TWV0aG9kKDYpfSk7ZGVmaW5lU3RkSXRlcmF0b3JzKEFycmF5LEFSUkFZLGZ1bmN0aW9uKGl0ZXJhdGVkLGtpbmQpe3NldCh0aGlzLElURVIse286RVM1T2JqZWN0KGl0ZXJhdGVkKSxpOjAsazpraW5kfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxPPWl0ZXIubyxraW5kPWl0ZXIuayxpbmRleD1pdGVyLmkrKztpZighT3x8aW5kZXg+PU8ubGVuZ3RoKXJldHVybiBpdGVyLm89dW5kZWZpbmVkLGl0ZXJSZXN1bHQoMSk7aWYoa2luZD09S0VZKXJldHVybiBpdGVyUmVzdWx0KDAsaW5kZXgpO2lmKGtpbmQ9PVZBTFVFKXJldHVybiBpdGVyUmVzdWx0KDAsT1tpbmRleF0pO3JldHVybiBpdGVyUmVzdWx0KDAsW2luZGV4LE9baW5kZXhdXSl9LFZBTFVFKTtJdGVyYXRvcnNbQVJHVU1FTlRTXT1JdGVyYXRvcnNbQVJSQVldO3NldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLFwiSlNPTlwiLHRydWUpO2lmKGZyYW1ld29yayl7dG1wW1NZTUJPTF9UQUddPURPVDtpZihjb2YodG1wKSE9RE9UKWhpZGRlbihPYmplY3RQcm90byxUT19TVFJJTkcsZnVuY3Rpb24oKXtyZXR1cm5cIltvYmplY3QgXCIrY2xhc3NvZih0aGlzKStcIl1cIn0pO2lmKC8uL2cuZmxhZ3MhPVwiZ1wiKWRlZmluZVByb3BlcnR5KFJlZ0V4cFtQUk9UT1RZUEVdLFwiZmxhZ3NcIix7Y29uZmlndXJhYmxlOnRydWUsZ2V0OmNyZWF0ZVJlcGxhY2VyKC9eLipcXC8oXFx3KikkLyxcIiQxXCIpfSl9fShpc0Zpbml0ZSx7fSk7aXNGdW5jdGlvbihzZXRJbW1lZGlhdGUpJiZpc0Z1bmN0aW9uKGNsZWFySW1tZWRpYXRlKXx8ZnVuY3Rpb24oT05SRUFEWVNUQVRFQ0hBTkdFKXt2YXIgcG9zdE1lc3NhZ2U9Z2xvYmFsLnBvc3RNZXNzYWdlLGFkZEV2ZW50TGlzdGVuZXI9Z2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIsTWVzc2FnZUNoYW5uZWw9Z2xvYmFsLk1lc3NhZ2VDaGFubmVsLGNvdW50ZXI9MCxxdWV1ZT17fSxkZWZlcixjaGFubmVsLHBvcnQ7c2V0SW1tZWRpYXRlPWZ1bmN0aW9uKGZuKXt2YXIgYXJncz1bXSxpPTE7d2hpbGUoYXJndW1lbnRzLmxlbmd0aD5pKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7cXVldWVbKytjb3VudGVyXT1mdW5jdGlvbigpe2ludm9rZShpc0Z1bmN0aW9uKGZuKT9mbjpGdW5jdGlvbihmbiksYXJncyl9O2RlZmVyKGNvdW50ZXIpO3JldHVybiBjb3VudGVyfTtjbGVhckltbWVkaWF0ZT1mdW5jdGlvbihpZCl7ZGVsZXRlIHF1ZXVlW2lkXX07ZnVuY3Rpb24gcnVuKGlkKXtpZihoYXMocXVldWUsaWQpKXt2YXIgZm49cXVldWVbaWRdO2RlbGV0ZSBxdWV1ZVtpZF07Zm4oKX19ZnVuY3Rpb24gbGlzdG5lcihldmVudCl7cnVuKGV2ZW50LmRhdGEpfWlmKE5PREUpe2RlZmVyPWZ1bmN0aW9uKGlkKXtuZXh0VGljayhwYXJ0LmNhbGwocnVuLGlkKSl9fWVsc2UgaWYoYWRkRXZlbnRMaXN0ZW5lciYmaXNGdW5jdGlvbihwb3N0TWVzc2FnZSkmJiFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7ZGVmZXI9ZnVuY3Rpb24oaWQpe3Bvc3RNZXNzYWdlKGlkLFwiKlwiKX07YWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixsaXN0bmVyLGZhbHNlKX1lbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtjaGFubmVsPW5ldyBNZXNzYWdlQ2hhbm5lbDtwb3J0PWNoYW5uZWwucG9ydDI7Y2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2U9bGlzdG5lcjtkZWZlcj1jdHgocG9ydC5wb3N0TWVzc2FnZSxwb3J0LDEpfWVsc2UgaWYoZG9jdW1lbnQmJk9OUkVBRFlTVEFURUNIQU5HRSBpbiBkb2N1bWVudFtDUkVBVEVfRUxFTUVOVF0oXCJzY3JpcHRcIikpe2RlZmVyPWZ1bmN0aW9uKGlkKXtodG1sLmFwcGVuZENoaWxkKGRvY3VtZW50W0NSRUFURV9FTEVNRU5UXShcInNjcmlwdFwiKSlbT05SRUFEWVNUQVRFQ0hBTkdFXT1mdW5jdGlvbigpe2h0bWwucmVtb3ZlQ2hpbGQodGhpcyk7cnVuKGlkKX19fWVsc2V7ZGVmZXI9ZnVuY3Rpb24oaWQpe3NldFRpbWVvdXQocGFydC5jYWxsKHJ1bixpZCksMCl9fX0oXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIik7JGRlZmluZShHTE9CQUwrQklORCx7c2V0SW1tZWRpYXRlOnNldEltbWVkaWF0ZSxjbGVhckltbWVkaWF0ZTpjbGVhckltbWVkaWF0ZX0pOyFmdW5jdGlvbihQcm9taXNlLHRlc3Qpe2lzRnVuY3Rpb24oUHJvbWlzZSkmJmlzRnVuY3Rpb24oUHJvbWlzZS5yZXNvbHZlKSYmUHJvbWlzZS5yZXNvbHZlKHRlc3Q9bmV3IFByb21pc2UoRnVuY3Rpb24oKSkpPT10ZXN0fHxmdW5jdGlvbihhc2FwLERFRil7ZnVuY3Rpb24gaXNUaGVuYWJsZShvKXt2YXIgdGhlbjtpZihpc09iamVjdChvKSl0aGVuPW8udGhlbjtyZXR1cm4gaXNGdW5jdGlvbih0aGVuKT90aGVuOmZhbHNlfWZ1bmN0aW9uIG5vdGlmeShkZWYpe3ZhciBjaGFpbj1kZWYuY2hhaW47Y2hhaW4ubGVuZ3RoJiZhc2FwKGZ1bmN0aW9uKCl7dmFyIG1zZz1kZWYubXNnLG9rPWRlZi5zdGF0ZT09MSxpPTA7d2hpbGUoY2hhaW4ubGVuZ3RoPmkpIWZ1bmN0aW9uKHJlYWN0KXt2YXIgY2I9b2s/cmVhY3Qub2s6cmVhY3QuZmFpbCxyZXQsdGhlbjt0cnl7aWYoY2Ipe3JldD1jYj09PXRydWU/bXNnOmNiKG1zZyk7aWYocmV0PT09cmVhY3QuUCl7cmVhY3QucmVqKFR5cGVFcnJvcihQUk9NSVNFK1wiLWNoYWluIGN5Y2xlXCIpKX1lbHNlIGlmKHRoZW49aXNUaGVuYWJsZShyZXQpKXt0aGVuLmNhbGwocmV0LHJlYWN0LnJlcyxyZWFjdC5yZWopfWVsc2UgcmVhY3QucmVzKHJldCl9ZWxzZSByZWFjdC5yZWoobXNnKX1jYXRjaChlcnIpe3JlYWN0LnJlaihlcnIpfX0oY2hhaW5baSsrXSk7Y2hhaW4ubGVuZ3RoPTB9KX1mdW5jdGlvbiByZXNvbHZlKG1zZyl7dmFyIGRlZj10aGlzLHRoZW4sd3JhcHBlcjtpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO3RyeXtpZih0aGVuPWlzVGhlbmFibGUobXNnKSl7d3JhcHBlcj17ZGVmOmRlZixkb25lOmZhbHNlfTt0aGVuLmNhbGwobXNnLGN0eChyZXNvbHZlLHdyYXBwZXIsMSksY3R4KHJlamVjdCx3cmFwcGVyLDEpKX1lbHNle2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0xO25vdGlmeShkZWYpfX1jYXRjaChlcnIpe3JlamVjdC5jYWxsKHdyYXBwZXJ8fHtkZWY6ZGVmLGRvbmU6ZmFsc2V9LGVycil9fWZ1bmN0aW9uIHJlamVjdChtc2cpe3ZhciBkZWY9dGhpcztpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0yO25vdGlmeShkZWYpfVByb21pc2U9ZnVuY3Rpb24oZXhlY3V0b3Ipe2Fzc2VydEZ1bmN0aW9uKGV4ZWN1dG9yKTthc3NlcnRJbnN0YW5jZSh0aGlzLFByb21pc2UsUFJPTUlTRSk7dmFyIGRlZj17Y2hhaW46W10sc3RhdGU6MCxkb25lOmZhbHNlLG1zZzp1bmRlZmluZWR9O2hpZGRlbih0aGlzLERFRixkZWYpO3RyeXtleGVjdXRvcihjdHgocmVzb2x2ZSxkZWYsMSksY3R4KHJlamVjdCxkZWYsMSkpfWNhdGNoKGVycil7cmVqZWN0LmNhbGwoZGVmLGVycil9fTthc3NpZ25IaWRkZW4oUHJvbWlzZVtQUk9UT1RZUEVdLHt0aGVuOmZ1bmN0aW9uKG9uRnVsZmlsbGVkLG9uUmVqZWN0ZWQpe3ZhciByZWFjdD17b2s6aXNGdW5jdGlvbihvbkZ1bGZpbGxlZCk/b25GdWxmaWxsZWQ6dHJ1ZSxmYWlsOmlzRnVuY3Rpb24ob25SZWplY3RlZCk/b25SZWplY3RlZDpmYWxzZX0sUD1yZWFjdC5QPW5ldyB0aGlzW0NPTlNUUlVDVE9SXShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7cmVhY3QucmVzPWFzc2VydEZ1bmN0aW9uKHJlc29sdmUpO3JlYWN0LnJlaj1hc3NlcnRGdW5jdGlvbihyZWplY3QpfSksZGVmPXRoaXNbREVGXTtkZWYuY2hhaW4ucHVzaChyZWFjdCk7ZGVmLnN0YXRlJiZub3RpZnkoZGVmKTtyZXR1cm4gUH0sXCJjYXRjaFwiOmZ1bmN0aW9uKG9uUmVqZWN0ZWQpe3JldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLG9uUmVqZWN0ZWQpfX0pO2Fzc2lnbkhpZGRlbihQcm9taXNlLHthbGw6ZnVuY3Rpb24oaXRlcmFibGUpe3ZhciBQcm9taXNlPXRoaXMsdmFsdWVzPVtdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7Zm9yT2YoaXRlcmFibGUsZmFsc2UscHVzaCx2YWx1ZXMpO3ZhciByZW1haW5pbmc9dmFsdWVzLmxlbmd0aCxyZXN1bHRzPUFycmF5KHJlbWFpbmluZyk7aWYocmVtYWluaW5nKWZvckVhY2guY2FsbCh2YWx1ZXMsZnVuY3Rpb24ocHJvbWlzZSxpbmRleCl7UHJvbWlzZS5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe3Jlc3VsdHNbaW5kZXhdPXZhbHVlOy0tcmVtYWluaW5nfHxyZXNvbHZlKHJlc3VsdHMpfSxyZWplY3QpfSk7ZWxzZSByZXNvbHZlKHJlc3VsdHMpfSl9LHJhY2U6ZnVuY3Rpb24oaXRlcmFibGUpe3ZhciBQcm9taXNlPXRoaXM7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxmdW5jdGlvbihwcm9taXNlKXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXNvbHZlLHJlamVjdCl9KX0pfSxyZWplY3Q6ZnVuY3Rpb24ocil7cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtyZWplY3Qocil9KX0scmVzb2x2ZTpmdW5jdGlvbih4KXtyZXR1cm4gaXNPYmplY3QoeCkmJmdldFByb3RvdHlwZU9mKHgpPT09dGhpc1tQUk9UT1RZUEVdP3g6bmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3Jlc29sdmUoeCl9KX19KX0obmV4dFRpY2t8fHNldEltbWVkaWF0ZSxzYWZlU3ltYm9sKFwiZGVmXCIpKTtzZXRUb1N0cmluZ1RhZyhQcm9taXNlLFBST01JU0UpOyRkZWZpbmUoR0xPQkFMK0ZPUkNFRCohaXNOYXRpdmUoUHJvbWlzZSkse1Byb21pc2U6UHJvbWlzZX0pfShnbG9iYWxbUFJPTUlTRV0pOyFmdW5jdGlvbigpe3ZhciBVSUQ9c2FmZVN5bWJvbChcInVpZFwiKSxEQVRBPXNhZmVTeW1ib2woXCJkYXRhXCIpLFdFQUs9c2FmZVN5bWJvbChcIndlYWtcIiksTEFTVD1zYWZlU3ltYm9sKFwibGFzdFwiKSxGSVJTVD1zYWZlU3ltYm9sKFwiZmlyc3RcIiksU0laRT1ERVNDP3NhZmVTeW1ib2woXCJzaXplXCIpOlwic2l6ZVwiLHVpZD0wO2Z1bmN0aW9uIGdldENvbGxlY3Rpb24oQyxOQU1FLG1ldGhvZHMsY29tbW9uTWV0aG9kcyxpc01hcCxpc1dlYWspe3ZhciBBRERFUj1pc01hcD9cInNldFwiOlwiYWRkXCIscHJvdG89QyYmQ1tQUk9UT1RZUEVdLE89e307ZnVuY3Rpb24gaW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKXtpZihpdGVyYWJsZSE9dW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLGlzTWFwLHRoYXRbQURERVJdLHRoYXQpO3JldHVybiB0aGF0fWZ1bmN0aW9uIGZpeFNWWihrZXksY2hhaW4pe3ZhciBtZXRob2Q9cHJvdG9ba2V5XTtmcmFtZXdvcmsmJmhpZGRlbihwcm90byxrZXksZnVuY3Rpb24oYSxiKXt2YXIgcmVzdWx0PW1ldGhvZC5jYWxsKHRoaXMsYT09PTA/MDphLGIpO3JldHVybiBjaGFpbj90aGlzOnJlc3VsdH0pfWlmKCFpc05hdGl2ZShDKXx8IShpc1dlYWt8fCFCVUdHWV9JVEVSQVRPUlMmJmhhcyhwcm90byxcImVudHJpZXNcIikpKXtDPWlzV2Vhaz9mdW5jdGlvbihpdGVyYWJsZSl7YXNzZXJ0SW5zdGFuY2UodGhpcyxDLE5BTUUpO3NldCh0aGlzLFVJRCx1aWQrKyk7aW5pdEZyb21JdGVyYWJsZSh0aGlzLGl0ZXJhYmxlKX06ZnVuY3Rpb24oaXRlcmFibGUpe3ZhciB0aGF0PXRoaXM7YXNzZXJ0SW5zdGFuY2UodGhhdCxDLE5BTUUpO3NldCh0aGF0LERBVEEsY3JlYXRlKG51bGwpKTtzZXQodGhhdCxTSVpFLDApO3NldCh0aGF0LExBU1QsdW5kZWZpbmVkKTtzZXQodGhhdCxGSVJTVCx1bmRlZmluZWQpO2luaXRGcm9tSXRlcmFibGUodGhhdCxpdGVyYWJsZSl9O2Fzc2lnbkhpZGRlbihhc3NpZ25IaWRkZW4oQ1tQUk9UT1RZUEVdLG1ldGhvZHMpLGNvbW1vbk1ldGhvZHMpO2lzV2Vha3x8ZGVmaW5lUHJvcGVydHkoQ1tQUk9UT1RZUEVdLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYXNzZXJ0RGVmaW5lZCh0aGlzW1NJWkVdKX19KX1lbHNle3ZhciBOYXRpdmU9QyxpbnN0PW5ldyBDLGNoYWluPWluc3RbQURERVJdKGlzV2Vhaz97fTotMCwxKSxidWdneVplcm87aWYoIU5BVElWRV9JVEVSQVRPUlN8fCFDLmxlbmd0aCl7Qz1mdW5jdGlvbihpdGVyYWJsZSl7YXNzZXJ0SW5zdGFuY2UodGhpcyxDLE5BTUUpO3JldHVybiBpbml0RnJvbUl0ZXJhYmxlKG5ldyBOYXRpdmUsaXRlcmFibGUpfTtDW1BST1RPVFlQRV09cHJvdG99aXNXZWFrfHxpbnN0W0ZPUl9FQUNIXShmdW5jdGlvbih2YWwsa2V5KXtidWdneVplcm89MS9rZXk9PT0tSW5maW5pdHl9KTtpZihidWdneVplcm8pe2ZpeFNWWihcImRlbGV0ZVwiKTtmaXhTVlooXCJoYXNcIik7aXNNYXAmJmZpeFNWWihcImdldFwiKX1pZihidWdneVplcm98fGNoYWluIT09aW5zdClmaXhTVlooQURERVIsdHJ1ZSl9c2V0VG9TdHJpbmdUYWcoQyxOQU1FKTtPW05BTUVdPUM7JGRlZmluZShHTE9CQUwrV1JBUCtGT1JDRUQqIWlzTmF0aXZlKEMpLE8pO2lzV2Vha3x8ZGVmaW5lU3RkSXRlcmF0b3JzKEMsTkFNRSxmdW5jdGlvbihpdGVyYXRlZCxraW5kKXtzZXQodGhpcyxJVEVSLHtvOml0ZXJhdGVkLGs6a2luZH0pfSxmdW5jdGlvbigpe3ZhciBpdGVyPXRoaXNbSVRFUl0sTz1pdGVyLm8sa2luZD1pdGVyLmssZW50cnk9aXRlci5sO3doaWxlKGVudHJ5JiZlbnRyeS5yKWVudHJ5PWVudHJ5LnA7aWYoIU98fCEoaXRlci5sPWVudHJ5PWVudHJ5P2VudHJ5Lm46T1tGSVJTVF0pKXJldHVybiBpdGVyLm89dW5kZWZpbmVkLGl0ZXJSZXN1bHQoMSk7aWYoa2luZD09S0VZKXJldHVybiBpdGVyUmVzdWx0KDAsZW50cnkuayk7aWYoa2luZD09VkFMVUUpcmV0dXJuIGl0ZXJSZXN1bHQoMCxlbnRyeS52KTtyZXR1cm4gaXRlclJlc3VsdCgwLFtlbnRyeS5rLGVudHJ5LnZdKX0saXNNYXA/S0VZK1ZBTFVFOlZBTFVFKTtyZXR1cm4gQ31mdW5jdGlvbiBmYXN0S2V5KGl0LGNyZWF0ZSl7aWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4odHlwZW9mIGl0PT1cInN0cmluZ1wiP1wiU1wiOlwiUFwiKStpdDtpZighaGFzKGl0LFVJRCkpe2lmKGNyZWF0ZSloaWRkZW4oaXQsVUlELCsrdWlkKTtlbHNlIHJldHVyblwiXCJ9cmV0dXJuXCJPXCIraXRbVUlEXX1mdW5jdGlvbiBkZWYodGhhdCxrZXksdmFsdWUpe3ZhciBpbmRleD1mYXN0S2V5KGtleSx0cnVlKSxkYXRhPXRoYXRbREFUQV0sbGFzdD10aGF0W0xBU1RdLGVudHJ5O2lmKGluZGV4IGluIGRhdGEpZGF0YVtpbmRleF0udj12YWx1ZTtlbHNle2VudHJ5PWRhdGFbaW5kZXhdPXtrOmtleSx2OnZhbHVlLHA6bGFzdH07aWYoIXRoYXRbRklSU1RdKXRoYXRbRklSU1RdPWVudHJ5O2lmKGxhc3QpbGFzdC5uPWVudHJ5O3RoYXRbTEFTVF09ZW50cnk7dGhhdFtTSVpFXSsrfXJldHVybiB0aGF0fWZ1bmN0aW9uIGRlbCh0aGF0LGluZGV4KXt2YXIgZGF0YT10aGF0W0RBVEFdLGVudHJ5PWRhdGFbaW5kZXhdLG5leHQ9ZW50cnkubixwcmV2PWVudHJ5LnA7ZGVsZXRlIGRhdGFbaW5kZXhdO2VudHJ5LnI9dHJ1ZTtpZihwcmV2KXByZXYubj1uZXh0O2lmKG5leHQpbmV4dC5wPXByZXY7aWYodGhhdFtGSVJTVF09PWVudHJ5KXRoYXRbRklSU1RdPW5leHQ7aWYodGhhdFtMQVNUXT09ZW50cnkpdGhhdFtMQVNUXT1wcmV2O3RoYXRbU0laRV0tLX12YXIgY29sbGVjdGlvbk1ldGhvZHM9e2NsZWFyOmZ1bmN0aW9uKCl7Zm9yKHZhciBpbmRleCBpbiB0aGlzW0RBVEFdKWRlbCh0aGlzLGluZGV4KX0sXCJkZWxldGVcIjpmdW5jdGlvbihrZXkpe3ZhciBpbmRleD1mYXN0S2V5KGtleSksY29udGFpbnM9aW5kZXggaW4gdGhpc1tEQVRBXTtpZihjb250YWlucylkZWwodGhpcyxpbmRleCk7cmV0dXJuIGNvbnRhaW5zfSxmb3JFYWNoOmZ1bmN0aW9uKGNhbGxiYWNrZm4sdGhhdCl7dmFyIGY9Y3R4KGNhbGxiYWNrZm4sdGhhdCwzKSxlbnRyeTt3aGlsZShlbnRyeT1lbnRyeT9lbnRyeS5uOnRoaXNbRklSU1RdKXtmKGVudHJ5LnYsZW50cnkuayx0aGlzKTt3aGlsZShlbnRyeSYmZW50cnkucillbnRyeT1lbnRyeS5wfX0saGFzOmZ1bmN0aW9uKGtleSl7cmV0dXJuIGZhc3RLZXkoa2V5KWluIHRoaXNbREFUQV19fTtNYXA9Z2V0Q29sbGVjdGlvbihNYXAsTUFQLHtnZXQ6ZnVuY3Rpb24oa2V5KXt2YXIgZW50cnk9dGhpc1tEQVRBXVtmYXN0S2V5KGtleSldO3JldHVybiBlbnRyeSYmZW50cnkudn0sc2V0OmZ1bmN0aW9uKGtleSx2YWx1ZSl7cmV0dXJuIGRlZih0aGlzLGtleT09PTA/MDprZXksdmFsdWUpfX0sY29sbGVjdGlvbk1ldGhvZHMsdHJ1ZSk7U2V0PWdldENvbGxlY3Rpb24oU2V0LFNFVCx7YWRkOmZ1bmN0aW9uKHZhbHVlKXtyZXR1cm4gZGVmKHRoaXMsdmFsdWU9dmFsdWU9PT0wPzA6dmFsdWUsdmFsdWUpfX0sY29sbGVjdGlvbk1ldGhvZHMpO2Z1bmN0aW9uIHNldFdlYWsodGhhdCxrZXksdmFsdWUpe2hhcyhhc3NlcnRPYmplY3Qoa2V5KSxXRUFLKXx8aGlkZGVuKGtleSxXRUFLLHt9KTtrZXlbV0VBS11bdGhhdFtVSURdXT12YWx1ZTtyZXR1cm4gdGhhdH1mdW5jdGlvbiBoYXNXZWFrKGtleSl7cmV0dXJuIGlzT2JqZWN0KGtleSkmJmhhcyhrZXksV0VBSykmJmhhcyhrZXlbV0VBS10sdGhpc1tVSURdKX12YXIgd2Vha01ldGhvZHM9e1wiZGVsZXRlXCI6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gaGFzV2Vhay5jYWxsKHRoaXMsa2V5KSYmZGVsZXRlIGtleVtXRUFLXVt0aGlzW1VJRF1dfSxoYXM6aGFzV2Vha307V2Vha01hcD1nZXRDb2xsZWN0aW9uKFdlYWtNYXAsV0VBS01BUCx7Z2V0OmZ1bmN0aW9uKGtleSl7aWYoaXNPYmplY3Qoa2V5KSYmaGFzKGtleSxXRUFLKSlyZXR1cm4ga2V5W1dFQUtdW3RoaXNbVUlEXV19LHNldDpmdW5jdGlvbihrZXksdmFsdWUpe3JldHVybiBzZXRXZWFrKHRoaXMsa2V5LHZhbHVlKX19LHdlYWtNZXRob2RzLHRydWUsdHJ1ZSk7V2Vha1NldD1nZXRDb2xsZWN0aW9uKFdlYWtTZXQsV0VBS1NFVCx7YWRkOmZ1bmN0aW9uKHZhbHVlKXtyZXR1cm4gc2V0V2Vhayh0aGlzLHZhbHVlLHRydWUpfX0sd2Vha01ldGhvZHMsZmFsc2UsdHJ1ZSl9KCk7IWZ1bmN0aW9uKCl7JGRlZmluZShQUk9UTyxBUlJBWSx7aW5jbHVkZXM6Y3JlYXRlQXJyYXlDb250YWlucyh0cnVlKX0pOyRkZWZpbmUoUFJPVE8sU1RSSU5HLHthdDpjcmVhdGVQb2ludEF0KHRydWUpfSk7ZnVuY3Rpb24gY3JlYXRlT2JqZWN0VG9BcnJheShpc0VudHJpZXMpe3JldHVybiBmdW5jdGlvbihvYmplY3Qpe3ZhciBPPUVTNU9iamVjdChvYmplY3QpLGtleXM9Z2V0S2V5cyhvYmplY3QpLGxlbmd0aD1rZXlzLmxlbmd0aCxpPTAscmVzdWx0PUFycmF5KGxlbmd0aCksa2V5O2lmKGlzRW50cmllcyl3aGlsZShsZW5ndGg+aSlyZXN1bHRbaV09W2tleT1rZXlzW2krK10sT1trZXldXTtlbHNlIHdoaWxlKGxlbmd0aD5pKXJlc3VsdFtpXT1PW2tleXNbaSsrXV07cmV0dXJuIHJlc3VsdH19JGRlZmluZShTVEFUSUMsT0JKRUNULHt2YWx1ZXM6Y3JlYXRlT2JqZWN0VG9BcnJheShmYWxzZSksZW50cmllczpjcmVhdGVPYmplY3RUb0FycmF5KHRydWUpfSk7JGRlZmluZShTVEFUSUMsUkVHRVhQLHtlc2NhcGU6Y3JlYXRlUmVwbGFjZXIoLyhbXFxcXFxcLVtcXF17fSgpKis/LixeJHxdKS9nLFwiXFxcXCQxXCIsdHJ1ZSl9KX0oKTshZnVuY3Rpb24oUkVGRVJFTkNFKXtSRUZFUkVOQ0VfR0VUPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJHZXRcIix0cnVlKTt2YXIgUkVGRVJFTkNFX1NFVD1nZXRXZWxsS25vd25TeW1ib2woUkVGRVJFTkNFK1NFVCx0cnVlKSxSRUZFUkVOQ0VfREVMRVRFPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJEZWxldGVcIix0cnVlKTskZGVmaW5lKFNUQVRJQyxTWU1CT0wse3JlZmVyZW5jZUdldDpSRUZFUkVOQ0VfR0VULHJlZmVyZW5jZVNldDpSRUZFUkVOQ0VfU0VULHJlZmVyZW5jZURlbGV0ZTpSRUZFUkVOQ0VfREVMRVRFfSk7aGlkZGVuKEZ1bmN0aW9uUHJvdG8sUkVGRVJFTkNFX0dFVCxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRNYXBNZXRob2RzKENvbnN0cnVjdG9yKXtpZihDb25zdHJ1Y3Rvcil7dmFyIE1hcFByb3RvPUNvbnN0cnVjdG9yW1BST1RPVFlQRV07aGlkZGVuKE1hcFByb3RvLFJFRkVSRU5DRV9HRVQsTWFwUHJvdG8uZ2V0KTtoaWRkZW4oTWFwUHJvdG8sUkVGRVJFTkNFX1NFVCxNYXBQcm90by5zZXQpO2hpZGRlbihNYXBQcm90byxSRUZFUkVOQ0VfREVMRVRFLE1hcFByb3RvW1wiZGVsZXRlXCJdKX19c2V0TWFwTWV0aG9kcyhNYXApO3NldE1hcE1ldGhvZHMoV2Vha01hcCl9KFwicmVmZXJlbmNlXCIpOyFmdW5jdGlvbigpe2Z1bmN0aW9uIHNldEFycmF5U3RhdGljcyhrZXlzLGxlbmd0aCl7JGRlZmluZShTVEFUSUMsQVJSQVksdHVybi5jYWxsKGFycmF5KGtleXMpLGZ1bmN0aW9uKG1lbW8sa2V5KXtpZihrZXkgaW4gQXJyYXlQcm90byltZW1vW2tleV09Y3R4KGNhbGwsQXJyYXlQcm90b1trZXldLGxlbmd0aCl9LHt9KSl9c2V0QXJyYXlTdGF0aWNzKFwicG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllc1wiLDEpO3NldEFycmF5U3RhdGljcyhcImluZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXNcIiwzKTtzZXRBcnJheVN0YXRpY3MoXCJqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YsXCIrXCJyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsLHR1cm5cIil9KCl9KEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIiksdHJ1ZSl9LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXshZnVuY3Rpb24oKXt2YXIgaGFzT3duPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7dmFyIHVuZGVmaW5lZDt2YXIgaXRlcmF0b3JTeW1ib2w9dHlwZW9mIFN5bWJvbD09PVwiZnVuY3Rpb25cIiYmU3ltYm9sLml0ZXJhdG9yfHxcIkBAaXRlcmF0b3JcIjtpZih0eXBlb2YgcmVnZW5lcmF0b3JSdW50aW1lPT09XCJvYmplY3RcIil7cmV0dXJufXZhciBydW50aW1lPXJlZ2VuZXJhdG9yUnVudGltZT10eXBlb2YgZXhwb3J0cz09PVwidW5kZWZpbmVkXCI/e306ZXhwb3J0cztmdW5jdGlvbiB3cmFwKGlubmVyRm4sb3V0ZXJGbixzZWxmLHRyeUxpc3Qpe3JldHVybiBuZXcgR2VuZXJhdG9yKGlubmVyRm4sb3V0ZXJGbixzZWxmfHxudWxsLHRyeUxpc3R8fFtdKX1ydW50aW1lLndyYXA9d3JhcDt2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydD1cInN1c3BlbmRlZFN0YXJ0XCI7dmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQ9XCJzdXNwZW5kZWRZaWVsZFwiO3ZhciBHZW5TdGF0ZUV4ZWN1dGluZz1cImV4ZWN1dGluZ1wiO3ZhciBHZW5TdGF0ZUNvbXBsZXRlZD1cImNvbXBsZXRlZFwiO3ZhciBDb250aW51ZVNlbnRpbmVsPXt9O2Z1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCl7fWZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCl7fXZhciBHcD1HZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGU9R2VuZXJhdG9yLnByb3RvdHlwZTtHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGU9R3AuY29uc3RydWN0b3I9R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3I9R2VuZXJhdG9yRnVuY3Rpb247R2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWU9XCJHZW5lcmF0b3JGdW5jdGlvblwiO3J1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbj1mdW5jdGlvbihnZW5GdW4pe3ZhciBjdG9yPXR5cGVvZiBnZW5GdW49PT1cImZ1bmN0aW9uXCImJmdlbkZ1bi5jb25zdHJ1Y3RvcjtyZXR1cm4gY3Rvcj9jdG9yPT09R2VuZXJhdG9yRnVuY3Rpb258fChjdG9yLmRpc3BsYXlOYW1lfHxjdG9yLm5hbWUpPT09XCJHZW5lcmF0b3JGdW5jdGlvblwiOmZhbHNlfTtydW50aW1lLm1hcms9ZnVuY3Rpb24oZ2VuRnVuKXtnZW5GdW4uX19wcm90b19fPUdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO2dlbkZ1bi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShHcCk7cmV0dXJuIGdlbkZ1bn07cnVudGltZS5hc3luYz1mdW5jdGlvbihpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3ZhciBnZW5lcmF0b3I9d3JhcChpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KTt2YXIgY2FsbE5leHQ9c3RlcC5iaW5kKGdlbmVyYXRvci5uZXh0KTt2YXIgY2FsbFRocm93PXN0ZXAuYmluZChnZW5lcmF0b3JbXCJ0aHJvd1wiXSk7ZnVuY3Rpb24gc3RlcChhcmcpe3RyeXt2YXIgaW5mbz10aGlzKGFyZyk7dmFyIHZhbHVlPWluZm8udmFsdWV9Y2F0Y2goZXJyb3Ipe3JldHVybiByZWplY3QoZXJyb3IpfWlmKGluZm8uZG9uZSl7cmVzb2x2ZSh2YWx1ZSl9ZWxzZXtQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oY2FsbE5leHQsY2FsbFRocm93KX19Y2FsbE5leHQoKX0pfTtmdW5jdGlvbiBHZW5lcmF0b3IoaW5uZXJGbixvdXRlckZuLHNlbGYsdHJ5TGlzdCl7dmFyIGdlbmVyYXRvcj1vdXRlckZuP09iamVjdC5jcmVhdGUob3V0ZXJGbi5wcm90b3R5cGUpOnRoaXM7dmFyIGNvbnRleHQ9bmV3IENvbnRleHQodHJ5TGlzdCk7dmFyIHN0YXRlPUdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7ZnVuY3Rpb24gaW52b2tlKG1ldGhvZCxhcmcpe2lmKHN0YXRlPT09R2VuU3RhdGVFeGVjdXRpbmcpe3Rocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIil9aWYoc3RhdGU9PT1HZW5TdGF0ZUNvbXBsZXRlZCl7cmV0dXJuIGRvbmVSZXN1bHQoKX13aGlsZSh0cnVlKXt2YXIgZGVsZWdhdGU9Y29udGV4dC5kZWxlZ2F0ZTtpZihkZWxlZ2F0ZSl7dHJ5e3ZhciBpbmZvPWRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0oYXJnKTttZXRob2Q9XCJuZXh0XCI7YXJnPXVuZGVmaW5lZH1jYXRjaCh1bmNhdWdodCl7Y29udGV4dC5kZWxlZ2F0ZT1udWxsO21ldGhvZD1cInRocm93XCI7YXJnPXVuY2F1Z2h0O2NvbnRpbnVlfWlmKGluZm8uZG9uZSl7Y29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXT1pbmZvLnZhbHVlO2NvbnRleHQubmV4dD1kZWxlZ2F0ZS5uZXh0TG9jfWVsc2V7c3RhdGU9R2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtyZXR1cm4gaW5mb31jb250ZXh0LmRlbGVnYXRlPW51bGx9aWYobWV0aG9kPT09XCJuZXh0XCIpe2lmKHN0YXRlPT09R2VuU3RhdGVTdXNwZW5kZWRTdGFydCYmdHlwZW9mIGFyZyE9PVwidW5kZWZpbmVkXCIpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0IHRvIHNlbmQgXCIrSlNPTi5zdHJpbmdpZnkoYXJnKStcIiB0byBuZXdib3JuIGdlbmVyYXRvclwiKX1pZihzdGF0ZT09PUdlblN0YXRlU3VzcGVuZGVkWWllbGQpe2NvbnRleHQuc2VudD1hcmd9ZWxzZXtkZWxldGUgY29udGV4dC5zZW50fX1lbHNlIGlmKG1ldGhvZD09PVwidGhyb3dcIil7aWYoc3RhdGU9PT1HZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KXtzdGF0ZT1HZW5TdGF0ZUNvbXBsZXRlZDt0aHJvdyBhcmd9aWYoY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihhcmcpKXttZXRob2Q9XCJuZXh0XCI7YXJnPXVuZGVmaW5lZH19ZWxzZSBpZihtZXRob2Q9PT1cInJldHVyblwiKXtjb250ZXh0LmFicnVwdChcInJldHVyblwiLGFyZyl9c3RhdGU9R2VuU3RhdGVFeGVjdXRpbmc7dHJ5e3ZhciB2YWx1ZT1pbm5lckZuLmNhbGwoc2VsZixjb250ZXh0KTtzdGF0ZT1jb250ZXh0LmRvbmU/R2VuU3RhdGVDb21wbGV0ZWQ6R2VuU3RhdGVTdXNwZW5kZWRZaWVsZDt2YXIgaW5mbz17dmFsdWU6dmFsdWUsZG9uZTpjb250ZXh0LmRvbmV9O2lmKHZhbHVlPT09Q29udGludWVTZW50aW5lbCl7aWYoY29udGV4dC5kZWxlZ2F0ZSYmbWV0aG9kPT09XCJuZXh0XCIpe2FyZz11bmRlZmluZWR9fWVsc2V7cmV0dXJuIGluZm99fWNhdGNoKHRocm93bil7c3RhdGU9R2VuU3RhdGVDb21wbGV0ZWQ7XG5pZihtZXRob2Q9PT1cIm5leHRcIil7Y29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbih0aHJvd24pfWVsc2V7YXJnPXRocm93bn19fX1nZW5lcmF0b3IubmV4dD1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJuZXh0XCIpO2dlbmVyYXRvcltcInRocm93XCJdPWludm9rZS5iaW5kKGdlbmVyYXRvcixcInRocm93XCIpO2dlbmVyYXRvcltcInJldHVyblwiXT1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJyZXR1cm5cIik7cmV0dXJuIGdlbmVyYXRvcn1HcFtpdGVyYXRvclN5bWJvbF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307R3AudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIltvYmplY3QgR2VuZXJhdG9yXVwifTtmdW5jdGlvbiBwdXNoVHJ5RW50cnkodHJpcGxlKXt2YXIgZW50cnk9e3RyeUxvYzp0cmlwbGVbMF19O2lmKDEgaW4gdHJpcGxlKXtlbnRyeS5jYXRjaExvYz10cmlwbGVbMV19aWYoMiBpbiB0cmlwbGUpe2VudHJ5LmZpbmFsbHlMb2M9dHJpcGxlWzJdfXRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KX1mdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5LGkpe3ZhciByZWNvcmQ9ZW50cnkuY29tcGxldGlvbnx8e307cmVjb3JkLnR5cGU9aT09PTA/XCJub3JtYWxcIjpcInJldHVyblwiO2RlbGV0ZSByZWNvcmQuYXJnO2VudHJ5LmNvbXBsZXRpb249cmVjb3JkfWZ1bmN0aW9uIENvbnRleHQodHJ5TGlzdCl7dGhpcy50cnlFbnRyaWVzPVt7dHJ5TG9jOlwicm9vdFwifV07dHJ5TGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSx0aGlzKTt0aGlzLnJlc2V0KCl9cnVudGltZS5rZXlzPWZ1bmN0aW9uKG9iamVjdCl7dmFyIGtleXM9W107Zm9yKHZhciBrZXkgaW4gb2JqZWN0KXtrZXlzLnB1c2goa2V5KX1rZXlzLnJldmVyc2UoKTtyZXR1cm4gZnVuY3Rpb24gbmV4dCgpe3doaWxlKGtleXMubGVuZ3RoKXt2YXIga2V5PWtleXMucG9wKCk7aWYoa2V5IGluIG9iamVjdCl7bmV4dC52YWx1ZT1rZXk7bmV4dC5kb25lPWZhbHNlO3JldHVybiBuZXh0fX1uZXh0LmRvbmU9dHJ1ZTtyZXR1cm4gbmV4dH19O2Z1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSl7aWYoaXRlcmFibGUpe3ZhciBpdGVyYXRvck1ldGhvZD1pdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07aWYoaXRlcmF0b3JNZXRob2Qpe3JldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKX1pZih0eXBlb2YgaXRlcmFibGUubmV4dD09PVwiZnVuY3Rpb25cIil7cmV0dXJuIGl0ZXJhYmxlfWlmKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKXt2YXIgaT0tMTtmdW5jdGlvbiBuZXh0KCl7d2hpbGUoKytpPGl0ZXJhYmxlLmxlbmd0aCl7aWYoaGFzT3duLmNhbGwoaXRlcmFibGUsaSkpe25leHQudmFsdWU9aXRlcmFibGVbaV07bmV4dC5kb25lPWZhbHNlO3JldHVybiBuZXh0fX1uZXh0LnZhbHVlPXVuZGVmaW5lZDtuZXh0LmRvbmU9dHJ1ZTtyZXR1cm4gbmV4dH1yZXR1cm4gbmV4dC5uZXh0PW5leHR9fXJldHVybntuZXh0OmRvbmVSZXN1bHR9fXJ1bnRpbWUudmFsdWVzPXZhbHVlcztmdW5jdGlvbiBkb25lUmVzdWx0KCl7cmV0dXJue3ZhbHVlOnVuZGVmaW5lZCxkb25lOnRydWV9fUNvbnRleHQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpDb250ZXh0LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5wcmV2PTA7dGhpcy5uZXh0PTA7dGhpcy5zZW50PXVuZGVmaW5lZDt0aGlzLmRvbmU9ZmFsc2U7dGhpcy5kZWxlZ2F0ZT1udWxsO3RoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO2Zvcih2YXIgdGVtcEluZGV4PTAsdGVtcE5hbWU7aGFzT3duLmNhbGwodGhpcyx0ZW1wTmFtZT1cInRcIit0ZW1wSW5kZXgpfHx0ZW1wSW5kZXg8MjA7Kyt0ZW1wSW5kZXgpe3RoaXNbdGVtcE5hbWVdPW51bGx9fSxzdG9wOmZ1bmN0aW9uKCl7dGhpcy5kb25lPXRydWU7dmFyIHJvb3RFbnRyeT10aGlzLnRyeUVudHJpZXNbMF07dmFyIHJvb3RSZWNvcmQ9cm9vdEVudHJ5LmNvbXBsZXRpb247aWYocm9vdFJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByb290UmVjb3JkLmFyZ31yZXR1cm4gdGhpcy5ydmFsfSxkaXNwYXRjaEV4Y2VwdGlvbjpmdW5jdGlvbihleGNlcHRpb24pe2lmKHRoaXMuZG9uZSl7dGhyb3cgZXhjZXB0aW9ufXZhciBjb250ZXh0PXRoaXM7ZnVuY3Rpb24gaGFuZGxlKGxvYyxjYXVnaHQpe3JlY29yZC50eXBlPVwidGhyb3dcIjtyZWNvcmQuYXJnPWV4Y2VwdGlvbjtjb250ZXh0Lm5leHQ9bG9jO3JldHVybiEhY2F1Z2h0fWZvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07dmFyIHJlY29yZD1lbnRyeS5jb21wbGV0aW9uO2lmKGVudHJ5LnRyeUxvYz09PVwicm9vdFwiKXtyZXR1cm4gaGFuZGxlKFwiZW5kXCIpfWlmKGVudHJ5LnRyeUxvYzw9dGhpcy5wcmV2KXt2YXIgaGFzQ2F0Y2g9aGFzT3duLmNhbGwoZW50cnksXCJjYXRjaExvY1wiKTt2YXIgaGFzRmluYWxseT1oYXNPd24uY2FsbChlbnRyeSxcImZpbmFsbHlMb2NcIik7aWYoaGFzQ2F0Y2gmJmhhc0ZpbmFsbHkpe2lmKHRoaXMucHJldjxlbnRyeS5jYXRjaExvYyl7cmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYyx0cnVlKX1lbHNlIGlmKHRoaXMucHJldjxlbnRyeS5maW5hbGx5TG9jKXtyZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpfX1lbHNlIGlmKGhhc0NhdGNoKXtpZih0aGlzLnByZXY8ZW50cnkuY2F0Y2hMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsdHJ1ZSl9fWVsc2UgaWYoaGFzRmluYWxseSl7aWYodGhpcy5wcmV2PGVudHJ5LmZpbmFsbHlMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyl9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIil9fX19LF9maW5kRmluYWxseUVudHJ5OmZ1bmN0aW9uKGZpbmFsbHlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPD10aGlzLnByZXYmJmhhc093bi5jYWxsKGVudHJ5LFwiZmluYWxseUxvY1wiKSYmKGVudHJ5LmZpbmFsbHlMb2M9PT1maW5hbGx5TG9jfHx0aGlzLnByZXY8ZW50cnkuZmluYWxseUxvYykpe3JldHVybiBlbnRyeX19fSxhYnJ1cHQ6ZnVuY3Rpb24odHlwZSxhcmcpe3ZhciBlbnRyeT10aGlzLl9maW5kRmluYWxseUVudHJ5KCk7dmFyIHJlY29yZD1lbnRyeT9lbnRyeS5jb21wbGV0aW9uOnt9O3JlY29yZC50eXBlPXR5cGU7cmVjb3JkLmFyZz1hcmc7aWYoZW50cnkpe3RoaXMubmV4dD1lbnRyeS5maW5hbGx5TG9jfWVsc2V7dGhpcy5jb21wbGV0ZShyZWNvcmQpfXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxjb21wbGV0ZTpmdW5jdGlvbihyZWNvcmQpe2lmKHJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByZWNvcmQuYXJnfWlmKHJlY29yZC50eXBlPT09XCJicmVha1wifHxyZWNvcmQudHlwZT09PVwiY29udGludWVcIil7dGhpcy5uZXh0PXJlY29yZC5hcmd9ZWxzZSBpZihyZWNvcmQudHlwZT09PVwicmV0dXJuXCIpe3RoaXMucnZhbD1yZWNvcmQuYXJnO3RoaXMubmV4dD1cImVuZFwifXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxmaW5pc2g6ZnVuY3Rpb24oZmluYWxseUxvYyl7dmFyIGVudHJ5PXRoaXMuX2ZpbmRGaW5hbGx5RW50cnkoZmluYWxseUxvYyk7cmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbil9LFwiY2F0Y2hcIjpmdW5jdGlvbih0cnlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPT09dHJ5TG9jKXt2YXIgcmVjb3JkPWVudHJ5LmNvbXBsZXRpb247aWYocmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3ZhciB0aHJvd249cmVjb3JkLmFyZztyZXNldFRyeUVudHJ5KGVudHJ5LGkpfXJldHVybiB0aHJvd259fXRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKX0sZGVsZWdhdGVZaWVsZDpmdW5jdGlvbihpdGVyYWJsZSxyZXN1bHROYW1lLG5leHRMb2Mpe3RoaXMuZGVsZWdhdGU9e2l0ZXJhdG9yOnZhbHVlcyhpdGVyYWJsZSkscmVzdWx0TmFtZTpyZXN1bHROYW1lLG5leHRMb2M6bmV4dExvY307cmV0dXJuIENvbnRpbnVlU2VudGluZWx9fX0oKX0se31dfSx7fSxbMV0pOyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEJhY29uLCBCdWZmZXJpbmdTb3VyY2UsIEJ1cywgQ29tcG9zaXRlVW5zdWJzY3JpYmUsIENvbnN1bWluZ1NvdXJjZSwgRGVzYywgRGlzcGF0Y2hlciwgRW5kLCBFcnJvciwgRXZlbnQsIEV2ZW50U3RyZWFtLCBFeGNlcHRpb24sIEluaXRpYWwsIE5leHQsIE5vbmUsIE9ic2VydmFibGUsIFByb3BlcnR5LCBQcm9wZXJ0eURpc3BhdGNoZXIsIFNvbWUsIFNvdXJjZSwgVXBkYXRlQmFycmllciwgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSwgYXNzZXJ0LCBhc3NlcnRBcnJheSwgYXNzZXJ0RXZlbnRTdHJlYW0sIGFzc2VydEZ1bmN0aW9uLCBhc3NlcnROb0FyZ3VtZW50cywgYXNzZXJ0T2JzZXJ2YWJsZSwgYXNzZXJ0U3RyaW5nLCBjbG9uZUFycmF5LCBjb21wb3NpdGVVbnN1YnNjcmliZSwgY29uc3RhbnRUb0Z1bmN0aW9uLCBjb250YWluc0R1cGxpY2F0ZURlcHMsIGNvbnZlcnRBcmdzVG9GdW5jdGlvbiwgZGVzY3JpYmUsIGVuZCwgZXZlbnRJZENvdW50ZXIsIGZpbmREZXBzLCBmbGF0TWFwXywgZm9ybWVyLCBpZENvdW50ZXIsIGluaXRpYWwsIGlzQXJyYXksIGlzRmllbGRLZXksIGlzRnVuY3Rpb24sIGlzT2JzZXJ2YWJsZSwgbGF0dGVyLCBsaWZ0Q2FsbGJhY2ssIG1ha2VGdW5jdGlvbiwgbWFrZUZ1bmN0aW9uQXJncywgbWFrZUZ1bmN0aW9uXywgbWFrZU9ic2VydmFibGUsIG1ha2VTcGF3bmVyLCBuZXh0LCBub3AsIHBhcnRpYWxseUFwcGxpZWQsIHJlY3Vyc2lvbkRlcHRoLCByZWdpc3Rlck9icywgc3B5cywgdG9Db21iaW5hdG9yLCB0b0V2ZW50LCB0b0ZpZWxkRXh0cmFjdG9yLCB0b0ZpZWxkS2V5LCB0b09wdGlvbiwgdG9TaW1wbGVFeHRyYWN0b3IsIHdpdGhEZXNjcmlwdGlvbiwgd2l0aE1ldGhvZENhbGxTdXBwb3J0LCBfLCBfcmVmLFxuICAgIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG4gIEJhY29uID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIkJhY29uXCI7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLnZlcnNpb24gPSAnMC43LjQyJztcblxuICBFeGNlcHRpb24gPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwgPyBnbG9iYWwgOiB0aGlzKS5FcnJvcjtcblxuICBfID0ge1xuICAgIGluZGV4T2Y6IEFycmF5LnByb3RvdHlwZS5pbmRleE9mID8gZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHJldHVybiB4cy5pbmRleE9mKHgpO1xuICAgIH0gOiBmdW5jdGlvbih4cywgeCkge1xuICAgICAgdmFyIGksIHksIF9pLCBfbGVuO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHkgPSB4c1tpXTtcbiAgICAgICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgaW5kZXhXaGVyZTogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciBpLCB5LCBfaSwgX2xlbjtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICB5ID0geHNbaV07XG4gICAgICAgIGlmIChmKHkpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIGhlYWQ6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHNbMF07XG4gICAgfSxcbiAgICBhbHdheXM6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbmVnYXRlOiBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIWYoeCk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZW1wdHk6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHMubGVuZ3RoID09PSAwO1xuICAgIH0sXG4gICAgdGFpbDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4cy5zbGljZSgxLCB4cy5sZW5ndGgpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgdmFyIGZpbHRlcmVkLCB4LCBfaSwgX2xlbjtcbiAgICAgIGZpbHRlcmVkID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIGlmIChmKHgpKSB7XG4gICAgICAgICAgZmlsdGVyZWQucHVzaCh4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuLCBfcmVzdWx0cztcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2goZih4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGtleSwgdmFsdWU7XG4gICAgICBmb3IgKGtleSBpbiB4cykge1xuICAgICAgICB2YWx1ZSA9IHhzW2tleV07XG4gICAgICAgIGYoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24oeHMpIHtcbiAgICAgIGlmIChpc0FycmF5KHhzKSkge1xuICAgICAgICByZXR1cm4geHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3hzXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbih4cywgeCkge1xuICAgICAgcmV0dXJuIF8uaW5kZXhPZih4cywgeCkgIT09IC0xO1xuICAgIH0sXG4gICAgaWQ6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0sXG4gICAgbGFzdDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4c1t4cy5sZW5ndGggLSAxXTtcbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciB4LCBfaSwgX2xlbjtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IF8uaWQ7XG4gICAgICB9XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIGlmICghZih4KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhbnk6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgeCwgX2ksIF9sZW47XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBfLmlkO1xuICAgICAgfVxuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBpZiAoZih4KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICB3aXRob3V0OiBmdW5jdGlvbih4LCB4cykge1xuICAgICAgcmV0dXJuIF8uZmlsdGVyKChmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiB5ICE9PSB4O1xuICAgICAgfSksIHhzKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oeCwgeHMpIHtcbiAgICAgIHZhciBpO1xuICAgICAgaSA9IF8uaW5kZXhPZih4cywgeCk7XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB4cy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmb2xkOiBmdW5jdGlvbih4cywgc2VlZCwgZikge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBzZWVkID0gZihzZWVkLCB4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWVkO1xuICAgIH0sXG4gICAgZmxhdE1hcDogZnVuY3Rpb24oZiwgeHMpIHtcbiAgICAgIHJldHVybiBfLmZvbGQoeHMsIFtdLCAoZnVuY3Rpb24oeXMsIHgpIHtcbiAgICAgICAgcmV0dXJuIHlzLmNvbmNhdChmKHgpKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIGNhY2hlZDogZnVuY3Rpb24oZikge1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFsdWUgPSBOb25lO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IE5vbmUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGYoKTtcbiAgICAgICAgICBmID0gdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgZXgsIGludGVybmFscywga2V5LCB2YWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlY3Vyc2lvbkRlcHRoKys7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWy4uXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBfLm1hcChfLnRvU3RyaW5nLCBvYmopLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICAgICAgfSBlbHNlIGlmICgoKG9iaiAhPSBudWxsID8gb2JqLnRvU3RyaW5nIDogdm9pZCAwKSAhPSBudWxsKSAmJiBvYmoudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChyZWN1cnNpb25EZXB0aCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBcInsuLn1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJuYWxzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9yZXN1bHRzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICBpZiAoIV9faGFzUHJvcC5jYWxsKG9iaiwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICAgIHZhbHVlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICBleCA9IF9lcnJvcjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goXy50b1N0cmluZyhrZXkpICsgXCI6XCIgKyBfLnRvU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgICByZXR1cm4gXCJ7XCIgKyBpbnRlcm5hbHMgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICByZWN1cnNpb25EZXB0aC0tO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZWN1cnNpb25EZXB0aCA9IDA7XG5cbiAgQmFjb24uXyA9IF87XG5cbiAgQmFjb24uc2NoZWR1bGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKGYsIGQpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGYsIGQpO1xuICAgIH0sXG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGYsIGkpIHtcbiAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmLCBpKTtcbiAgICB9LFxuICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfSxcbiAgICBub3c6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5mcm9tQmluZGVyID0gZnVuY3Rpb24oYmluZGVyLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgaWYgKGV2ZW50VHJhbnNmb3JtZXIgPT0gbnVsbCkge1xuICAgICAgZXZlbnRUcmFuc2Zvcm1lciA9IF8uaWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwiZnJvbUJpbmRlclwiLCBiaW5kZXIsIGV2ZW50VHJhbnNmb3JtZXIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgbmVlZHNVbmJpbmQsIHVuYmluZCwgdW5iaW5kZXIsIHVuYm91bmQ7XG4gICAgICB1bmJvdW5kID0gZmFsc2U7XG4gICAgICBuZWVkc1VuYmluZCA9IGZhbHNlO1xuICAgICAgdW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdW5ib3VuZCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdW5iaW5kZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdW5iaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHVuYmluZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdW5ib3VuZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZWVkc1VuYmluZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdW5iaW5kZXIgPSBiaW5kZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzLCBldmVudCwgcmVwbHksIHZhbHVlLCBfaSwgX2xlbjtcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHZhbHVlID0gZXZlbnRUcmFuc2Zvcm1lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgaWYgKCEoaXNBcnJheSh2YWx1ZSkgJiYgXy5sYXN0KHZhbHVlKSBpbnN0YW5jZW9mIEV2ZW50KSkge1xuICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gdmFsdWUubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBldmVudCA9IHZhbHVlW19pXTtcbiAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQgPSB0b0V2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUgfHwgZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgdW5iaW5kKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5lZWRzVW5iaW5kKSB7XG4gICAgICAgIHVuYmluZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuYmluZDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi4kID0ge307XG5cbiAgQmFjb24uJC5hc0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oZXZlbnROYW1lLCBzZWxlY3RvciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIHZhciBfcmVmO1xuICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgX3JlZiA9IFtzZWxlY3Rvciwgdm9pZCAwXSwgZXZlbnRUcmFuc2Zvcm1lciA9IF9yZWZbMF0sIHNlbGVjdG9yID0gX3JlZlsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLnNlbGVjdG9yIHx8IHRoaXMsIFwiYXNFdmVudFN0cmVhbVwiLCBldmVudE5hbWUsIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICBfdGhpcy5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5vZmYoZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pKHRoaXMpLCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgaWYgKChfcmVmID0gdHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkgIT09IG51bGwgPyBqUXVlcnkgOiB0eXBlb2YgWmVwdG8gIT09IFwidW5kZWZpbmVkXCIgJiYgWmVwdG8gIT09IG51bGwgPyBaZXB0byA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIF9yZWYuZm4uYXNFdmVudFN0cmVhbSA9IEJhY29uLiQuYXNFdmVudFN0cmVhbTtcbiAgfVxuXG4gIEJhY29uLmZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKHRhcmdldCwgZXZlbnROYW1lLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgdmFyIHN1YiwgdW5zdWIsIF9yZWYxLCBfcmVmMiwgX3JlZjMsIF9yZWY0LCBfcmVmNSwgX3JlZjY7XG4gICAgc3ViID0gKF9yZWYxID0gKF9yZWYyID0gKF9yZWYzID0gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIpICE9IG51bGwgPyBfcmVmMyA6IHRhcmdldC5hZGRMaXN0ZW5lcikgIT0gbnVsbCA/IF9yZWYyIDogdGFyZ2V0LmJpbmQpICE9IG51bGwgPyBfcmVmMSA6IHRhcmdldC5vbjtcbiAgICB1bnN1YiA9IChfcmVmNCA9IChfcmVmNSA9IChfcmVmNiA9IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKSAhPSBudWxsID8gX3JlZjYgOiB0YXJnZXQucmVtb3ZlTGlzdGVuZXIpICE9IG51bGwgPyBfcmVmNSA6IHRhcmdldC51bmJpbmQpICE9IG51bGwgPyBfcmVmNCA6IHRhcmdldC5vZmY7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tRXZlbnRUYXJnZXRcIiwgdGFyZ2V0LCBldmVudE5hbWUsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgc3ViLmNhbGwodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdW5zdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9O1xuICAgIH0sIGV2ZW50VHJhbnNmb3JtZXIpKTtcbiAgfTtcblxuICBCYWNvbi5mcm9tUHJvbWlzZSA9IGZ1bmN0aW9uKHByb21pc2UsIGFib3J0KSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tUHJvbWlzZVwiLCBwcm9taXNlLCBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHByb21pc2UudGhlbihoYW5kbGVyLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKG5ldyBFcnJvcihlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGFib3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9taXNlLmFib3J0ID09PSBcImZ1bmN0aW9uXCIgPyBwcm9taXNlLmFib3J0KCkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSkpKTtcbiAgfTtcblxuICBCYWNvbi5ub01vcmUgPSBbXCI8bm8tbW9yZT5cIl07XG5cbiAgQmFjb24ubW9yZSA9IFtcIjxtb3JlPlwiXTtcblxuICBCYWNvbi5sYXRlciA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwibGF0ZXJcIiwgZGVsYXksIHZhbHVlLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNlcXVlbnRpYWxseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwic2VxdWVudGlhbGx5XCIsIGRlbGF5LCB2YWx1ZXMsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdmFsdWVzW2luZGV4KytdO1xuICAgICAgaWYgKGluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbmQoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24ucmVwZWF0ZWRseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwicmVwZWF0ZWRseVwiLCBkZWxheSwgdmFsdWVzLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWVzW2luZGV4KysgJSB2YWx1ZXMubGVuZ3RoXTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uc3B5ID0gZnVuY3Rpb24oc3B5KSB7XG4gICAgcmV0dXJuIHNweXMucHVzaChzcHkpO1xuICB9O1xuXG4gIHNweXMgPSBbXTtcblxuICByZWdpc3Rlck9icyA9IGZ1bmN0aW9uKG9icykge1xuICAgIHZhciBzcHksIF9pLCBfbGVuO1xuICAgIGlmIChzcHlzLmxlbmd0aCkge1xuICAgICAgaWYgKCFyZWdpc3Rlck9icy5ydW5uaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVnaXN0ZXJPYnMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzcHlzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICBzcHkgPSBzcHlzW19pXTtcbiAgICAgICAgICAgIHNweShvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBkZWxldGUgcmVnaXN0ZXJPYnMucnVubmluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIHdpdGhNZXRob2RDYWxsU3VwcG9ydCA9IGZ1bmN0aW9uKHdyYXBwZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY29udGV4dCwgZiwgbWV0aG9kTmFtZTtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKHR5cGVvZiBmID09PSBcIm9iamVjdFwiICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnRleHQgPSBmO1xuICAgICAgICBtZXRob2ROYW1lID0gYXJnc1swXTtcbiAgICAgICAgZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0W21ldGhvZE5hbWVdLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZWQuYXBwbHkobnVsbCwgW2ZdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncykpKTtcbiAgICB9O1xuICB9O1xuXG4gIGxpZnRDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2MsIHdyYXBwZWQpIHtcbiAgICByZXR1cm4gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGYsIHN0cmVhbTtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgc3RyZWFtID0gcGFydGlhbGx5QXBwbGllZCh3cmFwcGVkLCBbXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBfX3NsaWNlLmNhbGwodmFsdWVzKS5jb25jYXQoW2NhbGxiYWNrXSkpO1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBkZXNjLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoYXJncykuZmxhdE1hcChzdHJlYW0pXSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmZyb21DYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21DYWxsYmFja1wiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0sIChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgIH0pKTtcbiAgfSk7XG5cbiAgQmFjb24uZnJvbU5vZGVDYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21Ob2RlQ2FsbGJhY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9LCBmdW5jdGlvbihlcnJvciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gW25ldyBFcnJvcihlcnJvciksIGVuZCgpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgQmFjb24uZnJvbVBvbGwgPSBmdW5jdGlvbihkZWxheSwgcG9sbCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbVBvbGxcIiwgZGVsYXksIHBvbGwsIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHZhciBpZDtcbiAgICAgIGlkID0gQmFjb24uc2NoZWR1bGVyLnNldEludGVydmFsKGhhbmRsZXIsIGRlbGF5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgIH07XG4gICAgfSksIHBvbGwpKTtcbiAgfTtcblxuICBCYWNvbi5pbnRlcnZhbCA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImludGVydmFsXCIsIGRlbGF5LCB2YWx1ZSwgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5leHQodmFsdWUpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9wZXJ0eShkZXNjcmliZShCYWNvbiwgXCJjb25zdGFudFwiLCB2YWx1ZSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsoaW5pdGlhbCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLm5ldmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJuZXZlclwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLm9uY2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwib25jZVwiLCB2YWx1ZSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmZyb21BcnJheSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHZhciBpO1xuICAgIGFzc2VydEFycmF5KHZhbHVlcyk7XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21BcnJheVwiLCB2YWx1ZXMsIEJhY29uLm5ldmVyKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpID0gMDtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwiZnJvbUFycmF5XCIsIHZhbHVlcyksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIHB1c2gsIHJlcGx5LCB1bnN1YmQ7XG4gICAgICAgIHVuc3ViZCA9IGZhbHNlO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHB1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgaWYgKChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSAmJiAhdW5zdWJkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpKytdO1xuICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRvRXZlbnQodmFsdWUpKTtcbiAgICAgICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIGlmIChpID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZW5kKCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLmFmdGVyVHJhbnNhY3Rpb24ocHVzaCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHB1c2goKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB1bnN1YmQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLm1lcmdlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUuYXBwbHkobnVsbCwgW0JhY29uLCBcIm1lcmdlQWxsXCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcykpKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgZW5kcywgc2lua3MsIHNtYXJ0U2luaztcbiAgICAgICAgZW5kcyA9IDA7XG4gICAgICAgIHNtYXJ0U2luayA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih1bnN1YkJvdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICAgIGVuZHMrKztcbiAgICAgICAgICAgICAgICBpZiAoZW5kcyA9PT0gc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgIHVuc3ViQm90aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHNpbmtzID0gXy5tYXAoc21hcnRTaW5rLCBzdHJlYW1zKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZVVuc3Vic2NyaWJlLmFwcGx5KG51bGwsIHNpbmtzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uemlwQXNBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiemlwQXNBcnJheVwiXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24uemlwV2l0aChzdHJlYW1zLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4cztcbiAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiB4cztcbiAgICB9KV0pKTtcbiAgfTtcblxuICBCYWNvbi56aXBXaXRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXMsIF9yZWYxO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlmICghaXNGdW5jdGlvbihmKSkge1xuICAgICAgX3JlZjEgPSBbZiwgc3RyZWFtc1swXV0sIHN0cmVhbXMgPSBfcmVmMVswXSwgZiA9IF9yZWYxWzFdO1xuICAgIH1cbiAgICBzdHJlYW1zID0gXy5tYXAoKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLnRvRXZlbnRTdHJlYW0oKTtcbiAgICB9KSwgc3RyZWFtcyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiemlwV2l0aFwiLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24ud2hlbihzdHJlYW1zLCBmKV0pKTtcbiAgfTtcblxuICBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzLCBzb3VyY2VzLCBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChzdHJlYW1zLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgc291cmNlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfaSwgX2xlbiwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzdHJlYW1zLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBzdHJlYW1zW19pXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaChuZXcgQnVmZmVyaW5nU291cmNlKHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImdyb3VwU2ltdWx0YW5lb3VzXCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4cztcbiAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiB4cztcbiAgICB9KSldKSk7XG4gIH07XG5cbiAgQmFjb24uY29tYmluZUFzQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZXgsIHMsIHNvdXJjZXMsIHN0cmVhbSwgc3RyZWFtcywgX2ksIF9sZW47XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBmb3IgKGluZGV4ID0gX2kgPSAwLCBfbGVuID0gc3RyZWFtcy5sZW5ndGg7IF9pIDwgX2xlbjsgaW5kZXggPSArK19pKSB7XG4gICAgICBzdHJlYW0gPSBzdHJlYW1zW2luZGV4XTtcbiAgICAgIGlmICghKGlzT2JzZXJ2YWJsZShzdHJlYW0pKSkge1xuICAgICAgICBzdHJlYW1zW2luZGV4XSA9IEJhY29uLmNvbnN0YW50KHN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgc291cmNlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9qLCBfbGVuMSwgX3Jlc3VsdHM7XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IHN0cmVhbXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgcyA9IHN0cmVhbXNbX2pdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2gobmV3IFNvdXJjZShzLCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImNvbWJpbmVBc0FycmF5XCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzO1xuICAgICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHJldHVybiB4cztcbiAgICAgIH0pKS50b1Byb3BlcnR5KCldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5jb25zdGFudChbXSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLm9uVmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXMsIF9pO1xuICAgIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBfaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChfaSA9IDAsIFtdKSwgZiA9IGFyZ3VtZW50c1tfaSsrXTtcbiAgICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykub25WYWx1ZXMoZik7XG4gIH07XG5cbiAgQmFjb24uY29tYmluZVdpdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgc3RyZWFtcztcbiAgICBmID0gYXJndW1lbnRzWzBdLCBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJjb21iaW5lV2l0aFwiLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgdmFsdWVzKTtcbiAgICB9KV0pKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBhcHBseVN0cmVhbVZhbHVlLCBjb21iaW5hdG9yLCBjb21waWxlLCBjb21waWxlVGVtcGxhdGUsIGNvbnN0YW50VmFsdWUsIGN1cnJlbnQsIGZ1bmNzLCBta0NvbnRleHQsIHNldFZhbHVlLCBzdHJlYW1zO1xuICAgIGZ1bmNzID0gW107XG4gICAgc3RyZWFtcyA9IFtdO1xuICAgIGN1cnJlbnQgPSBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgcmV0dXJuIGN0eFN0YWNrW2N0eFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgc2V0VmFsdWUgPSBmdW5jdGlvbihjdHhTdGFjaywga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQoY3R4U3RhY2spW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIGFwcGx5U3RyZWFtVmFsdWUgPSBmdW5jdGlvbihrZXksIGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2ssIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWVzW2luZGV4XSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWUpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIG1rQ29udGV4dCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoaXNBcnJheSh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcGlsZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBwb3BDb250ZXh0LCBwdXNoQ29udGV4dDtcbiAgICAgIGlmIChpc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgIHN0cmVhbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKGFwcGx5U3RyZWFtVmFsdWUoa2V5LCBzdHJlYW1zLmxlbmd0aCAtIDEpKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IE9iamVjdCh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHB1c2hDb250ZXh0ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q29udGV4dDtcbiAgICAgICAgICAgIG5ld0NvbnRleHQgPSBta0NvbnRleHQodmFsdWUpO1xuICAgICAgICAgICAgc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgbmV3Q29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucHVzaChuZXdDb250ZXh0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBwb3BDb250ZXh0ID0gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmNzLnB1c2gocHVzaENvbnRleHQoa2V5KSk7XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKHBvcENvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2goY29uc3RhbnRWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIF8uZWFjaCh0ZW1wbGF0ZSwgY29tcGlsZSk7XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUodGVtcGxhdGUpO1xuICAgIGNvbWJpbmF0b3IgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBjdHhTdGFjaywgZiwgcm9vdENvbnRleHQsIF9pLCBfbGVuO1xuICAgICAgcm9vdENvbnRleHQgPSBta0NvbnRleHQodGVtcGxhdGUpO1xuICAgICAgY3R4U3RhY2sgPSBbcm9vdENvbnRleHRdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBmdW5jcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBmID0gZnVuY3NbX2ldO1xuICAgICAgICBmKGN0eFN0YWNrLCB2YWx1ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvb3RDb250ZXh0O1xuICAgIH07XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJjb21iaW5lVGVtcGxhdGVcIiwgdGVtcGxhdGUsIEJhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm1hcChjb21iaW5hdG9yKSk7XG4gIH07XG5cbiAgQmFjb24ucmV0cnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGRlbGF5LCBpc1JldHJ5YWJsZSwgbWF4UmV0cmllcywgcmV0cmllcywgcmV0cnksIHNvdXJjZTtcbiAgICBpZiAoIWlzRnVuY3Rpb24ob3B0aW9ucy5zb3VyY2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiJ3NvdXJjZScgb3B0aW9uIGhhcyB0byBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBzb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcbiAgICByZXRyaWVzID0gb3B0aW9ucy5yZXRyaWVzIHx8IDA7XG4gICAgbWF4UmV0cmllcyA9IG9wdGlvbnMubWF4UmV0cmllcyB8fCByZXRyaWVzO1xuICAgIGRlbGF5ID0gb3B0aW9ucy5kZWxheSB8fCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgaXNSZXRyeWFibGUgPSBvcHRpb25zLmlzUmV0cnlhYmxlIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXRyeSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgIHZhciBkZWxheWVkUmV0cnksIG5leHRBdHRlbXB0T3B0aW9ucztcbiAgICAgIG5leHRBdHRlbXB0T3B0aW9ucyA9IHtcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHJldHJpZXM6IHJldHJpZXMgLSAxLFxuICAgICAgICBtYXhSZXRyaWVzOiBtYXhSZXRyaWVzLFxuICAgICAgICBkZWxheTogZGVsYXksXG4gICAgICAgIGlzUmV0cnlhYmxlOiBpc1JldHJ5YWJsZVxuICAgICAgfTtcbiAgICAgIGRlbGF5ZWRSZXRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQmFjb24ucmV0cnkobmV4dEF0dGVtcHRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXkoY29udGV4dCkpLmZpbHRlcihmYWxzZSkuY29uY2F0KEJhY29uLm9uY2UoKS5mbGF0TWFwKGRlbGF5ZWRSZXRyeSkpO1xuICAgIH07XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJyZXRyeVwiLCBvcHRpb25zLCBzb3VyY2UoKS5mbGF0TWFwRXJyb3IoZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGlzUmV0cnlhYmxlKGUpICYmIHJldHJpZXMgPiAwKSB7XG4gICAgICAgIHJldHVybiByZXRyeSh7XG4gICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgcmV0cmllc0RvbmU6IG1heFJldHJpZXMgLSByZXRyaWVzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UobmV3IEVycm9yKGUpKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgZXZlbnRJZENvdW50ZXIgPSAwO1xuXG4gIEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50KCkge1xuICAgICAgdGhpcy5pZCA9ICsrZXZlbnRJZENvdW50ZXI7XG4gICAgfVxuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzSW5pdGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudDtcblxuICB9KSgpO1xuXG4gIE5leHQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5leHQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBOZXh0KHZhbHVlRiwgZWFnZXIpIHtcbiAgICAgIE5leHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgICBpZiAoIWVhZ2VyICYmIGlzRnVuY3Rpb24odmFsdWVGKSB8fCB2YWx1ZUYgaW5zdGFuY2VvZiBOZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdmFsdWVGO1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdmFsdWVGO1xuICAgICAgfVxuICAgIH1cblxuICAgIE5leHQucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRiBpbnN0YW5jZW9mIE5leHQpIHtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdGhpcy52YWx1ZUYudmFsdWUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVGKSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHRoaXMudmFsdWVGKCk7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVJbnRlcm5hbDtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuZm1hcCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHZhciBldmVudCwgdmFsdWU7XG4gICAgICBpZiAodGhpcy52YWx1ZUludGVybmFsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUludGVybmFsO1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZih2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC52YWx1ZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKHRoaXMudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXy50b1N0cmluZyh0aGlzLnZhbHVlKCkpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBOZXh0O1xuXG4gIH0pKEV2ZW50KTtcblxuICBJbml0aWFsID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbml0aWFsLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gSW5pdGlhbCgpIHtcbiAgICAgIHJldHVybiBJbml0aWFsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIEluaXRpYWwucHJvdG90eXBlLmlzSW5pdGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEluaXRpYWwucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IEluaXRpYWwodmFsdWUpO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS50b05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dCh0aGlzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEluaXRpYWw7XG5cbiAgfSkoTmV4dCk7XG5cbiAgRW5kID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFbmQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBFbmQoKSB7XG4gICAgICByZXR1cm4gRW5kLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIEVuZC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVuZD5cIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVuZDtcblxuICB9KShFdmVudCk7XG5cbiAgRXJyb3IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEVycm9yLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gRXJyb3IoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG5cbiAgICBFcnJvci5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCI8ZXJyb3I+IFwiICsgXy50b1N0cmluZyh0aGlzLmVycm9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVycm9yO1xuXG4gIH0pKEV2ZW50KTtcblxuICBpZENvdW50ZXIgPSAwO1xuXG4gIE9ic2VydmFibGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShkZXNjKSB7XG4gICAgICB0aGlzLmlkID0gKytpZENvdW50ZXI7XG4gICAgICB3aXRoRGVzY3JpcHRpb24oZGVzYywgdGhpcyk7XG4gICAgICB0aGlzLmluaXRpYWxEZXNjID0gdGhpcy5kZXNjO1xuICAgIH1cblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLndyYXBwZWRTdWJzY3JpYmUodGhpcywgc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZUludGVybmFsID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25WYWx1ZXMgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gdGhpcy5vblZhbHVlKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImVycm9yc1wiLCB0aGlzLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZpbHRlclwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRha2VXaGlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGY7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZmlsdGVyKGYpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZW5kT25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGY7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImVuZE9uRXJyb3JcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkgJiYgZihldmVudC5lcnJvcikpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZSA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICBpZiAoY291bnQgPD0gMCkge1xuICAgICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlXCIsIGNvdW50LCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHA7XG4gICAgICBwID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmIChwIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHAuc2FtcGxlZEJ5KHRoaXMsIGZvcm1lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIHAsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQuZm1hcChmKSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJtYXBFcnJvclwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKG5leHQoZihldmVudC5lcnJvcikpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXBFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJtYXBFbmRcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIHRoaXMucHVzaChuZXh0KGYoZXZlbnQpKSk7XG4gICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZG9BY3Rpb25cIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBcIiwgY291bnQsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwRHVwbGljYXRlcyA9IGZ1bmN0aW9uKGlzRXF1YWwpIHtcbiAgICAgIGlmIChpc0VxdWFsID09IG51bGwpIHtcbiAgICAgICAgaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwRHVwbGljYXRlc1wiLCB0aGlzLndpdGhTdGF0ZU1hY2hpbmUoTm9uZSwgZnVuY3Rpb24ocHJldiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIFtwcmV2LCBbZXZlbnRdXTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0luaXRpYWwoKSB8fCBwcmV2ID09PSBOb25lIHx8ICFpc0VxdWFsKHByZXYuZ2V0KCksIGV2ZW50LnZhbHVlKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIFtuZXcgU29tZShldmVudC52YWx1ZSgpKSwgW2V2ZW50XV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtwcmV2LCBbXV07XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcEVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBFcnJvcnNcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aFN0YXRlTWFjaGluZSA9IGZ1bmN0aW9uKGluaXRTdGF0ZSwgZikge1xuICAgICAgdmFyIHN0YXRlO1xuICAgICAgc3RhdGUgPSBpbml0U3RhdGU7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwid2l0aFN0YXRlTWFjaGluZVwiLCBpbml0U3RhdGUsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGZyb21GLCBuZXdTdGF0ZSwgb3V0cHV0LCBvdXRwdXRzLCByZXBseSwgX2ksIF9sZW47XG4gICAgICAgIGZyb21GID0gZihzdGF0ZSwgZXZlbnQpO1xuICAgICAgICBuZXdTdGF0ZSA9IGZyb21GWzBdLCBvdXRwdXRzID0gZnJvbUZbMV07XG4gICAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBvdXRwdXRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgb3V0cHV0ID0gb3V0cHV0c1tfaV07XG4gICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gob3V0cHV0KTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbihzZWVkLCBmKSB7XG4gICAgICB2YXIgYWNjLCByZXN1bHRQcm9wZXJ0eSwgc3Vic2NyaWJlO1xuICAgICAgZiA9IHRvQ29tYmluYXRvcihmKTtcbiAgICAgIGFjYyA9IHRvT3B0aW9uKHNlZWQpO1xuICAgICAgc3Vic2NyaWJlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgdmFyIGluaXRTZW50LCByZXBseSwgc2VuZEluaXQsIHVuc3ViO1xuICAgICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWluaXRTZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsobmV3IEluaXRpYWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgICB1bnN1YigpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuc3ViID0gbm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICB1bnN1YiA9IF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCwgcHJldjtcbiAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgIGlmIChpbml0U2VudCAmJiBldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2ID0gYWNjLmdldE9yRWxzZSh2b2lkIDApO1xuICAgICAgICAgICAgICAgIG5leHQgPSBmKHByZXYsIGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIGFjYyA9IG5ldyBTb21lKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50LmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHJlc3VsdFByb3BlcnR5LCBzZW5kSW5pdCk7XG4gICAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvcGVydHkgPSBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJzY2FuXCIsIHNlZWQsIGYpLCBzdWJzY3JpYmUpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkID0gZnVuY3Rpb24oc2VlZCwgZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZvbGRcIiwgc2VlZCwgZiwgdGhpcy5zY2FuKHNlZWQsIGYpLnNhbXBsZWRCeSh0aGlzLmZpbHRlcihmYWxzZSkubWFwRW5kKCkudG9Qcm9wZXJ0eSgpKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uKG90aGVyLCBmKSB7XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBBcnJheTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ6aXBcIiwgb3RoZXIsIEJhY29uLnppcFdpdGgoW3RoaXMsIG90aGVyXSwgZikpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24oc3RhcnQsIGYpIHtcbiAgICAgIGYgPSB0b0NvbWJpbmF0b3IoZik7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGlmZlwiLCBzdGFydCwgZiwgdGhpcy5zY2FuKFtzdGFydF0sIGZ1bmN0aW9uKHByZXZUdXBsZSwgbmV4dCkge1xuICAgICAgICByZXR1cm4gW25leHQsIGYocHJldlR1cGxlWzBdLCBuZXh0KV07XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24odHVwbGUpIHtcbiAgICAgICAgcmV0dXJuIHR1cGxlLmxlbmd0aCA9PT0gMjtcbiAgICAgIH0pLm1hcChmdW5jdGlvbih0dXBsZSkge1xuICAgICAgICByZXR1cm4gdHVwbGVbMV07XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEZpcnN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGxpbWl0O1xuICAgICAgbGltaXQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpcywgXCJmbGF0TWFwV2l0aENvbmN1cnJlbmN5TGltaXRcIiwgbGltaXRdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncyksIFtmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmdzKSwgZmFsc2UsIGxpbWl0KV0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcExhdGVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGYsIHN0cmVhbTtcbiAgICAgIGYgPSBtYWtlU3Bhd25lcihhcmd1bWVudHMpO1xuICAgICAgc3RyZWFtID0gdGhpcy50b0V2ZW50U3RyZWFtKCk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZmxhdE1hcExhdGVzdFwiLCBmLCBzdHJlYW0uZmxhdE1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWFrZU9ic2VydmFibGUoZih2YWx1ZSkpLnRha2VVbnRpbChzdHJlYW0pO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRXJyb3IgPSBmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZsYXRNYXBFcnJvclwiLCBmbiwgdGhpcy5tYXBFcnJvcihmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnIpO1xuICAgICAgfSkuZmxhdE1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oeC5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcENvbmNhdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpcywgXCJmbGF0TWFwQ29uY2F0XCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJndW1lbnRzKSwgW3RoaXMuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0LmFwcGx5KHRoaXMsIFsxXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3VtZW50cykpKV0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbihtaW5pbXVtSW50ZXJ2YWwpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJpbmdUaHJvdHRsZVwiLCBtaW5pbXVtSW50ZXJ2YWwsIHRoaXMuZmxhdE1hcENvbmNhdChmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpLmNvbmNhdChCYWNvbi5sYXRlcihtaW5pbXVtSW50ZXJ2YWwpLmZpbHRlcihmYWxzZSkpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJub3RcIiwgdGhpcy5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIXg7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gdHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgPyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfX3NsaWNlLmNhbGwoYXJncykuY29uY2F0KFtldmVudC5sb2coKV0pKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNsaWRpbmdXaW5kb3cgPSBmdW5jdGlvbihuLCBtaW5WYWx1ZXMpIHtcbiAgICAgIGlmIChtaW5WYWx1ZXMgPT0gbnVsbCkge1xuICAgICAgICBtaW5WYWx1ZXMgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNsaWRpbmdXaW5kb3dcIiwgbiwgbWluVmFsdWVzLCB0aGlzLnNjYW4oW10sIChmdW5jdGlvbih3aW5kb3csIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuY29uY2F0KFt2YWx1ZV0pLnNsaWNlKC1uKTtcbiAgICAgIH0pKS5maWx0ZXIoKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA+PSBtaW5WYWx1ZXM7XG4gICAgICB9KSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24ob3RoZXIsIGYpIHtcbiAgICAgIHZhciBjb21iaW5hdG9yO1xuICAgICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihmKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJjb21iaW5lXCIsIG90aGVyLCBmLCBCYWNvbi5jb21iaW5lQXNBcnJheSh0aGlzLCBvdGhlcikubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gY29tYmluYXRvcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKGNhc2VzKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVjb2RlXCIsIGNhc2VzLCB0aGlzLmNvbWJpbmUoQmFjb24uY29tYmluZVRlbXBsYXRlKGNhc2VzKSwgZnVuY3Rpb24oa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1trZXldO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5hd2FpdGluZyA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYXdhaXRpbmdcIiwgb3RoZXIsIEJhY29uLmdyb3VwU2ltdWx0YW5lb3VzKHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24oX2FyZykge1xuICAgICAgICB2YXIgbXlWYWx1ZXMsIG90aGVyVmFsdWVzO1xuICAgICAgICBteVZhbHVlcyA9IF9hcmdbMF0sIG90aGVyVmFsdWVzID0gX2FyZ1sxXTtcbiAgICAgICAgcmV0dXJuIG90aGVyVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0pLnRvUHJvcGVydHkoZmFsc2UpLnNraXBEdXBsaWNhdGVzKCkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGVzY3JpYmUuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5hcHBseSh0aGlzKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzYy50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxEZXNjLmRlcHMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG5cbiAgfSkoKTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5yZWR1Y2UgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmFzc2lnbiA9IE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWU7XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuaW5zcGVjdCA9IE9ic2VydmFibGUucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gIGZsYXRNYXBfID0gZnVuY3Rpb24ocm9vdCwgZiwgZmlyc3RPbmx5LCBsaW1pdCkge1xuICAgIHZhciBjaGlsZERlcHMsIHJlc3VsdCwgcm9vdERlcDtcbiAgICByb290RGVwID0gW3Jvb3RdO1xuICAgIGNoaWxkRGVwcyA9IFtdO1xuICAgIHJlc3VsdCA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShyb290LCBcImZsYXRNYXBcIiArIChmaXJzdE9ubHkgPyBcIkZpcnN0XCIgOiBcIlwiKSwgZiksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBjaGVja0VuZCwgY2hlY2tRdWV1ZSwgY29tcG9zaXRlLCBxdWV1ZSwgc3Bhd247XG4gICAgICBjb21wb3NpdGUgPSBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoKTtcbiAgICAgIHF1ZXVlID0gW107XG4gICAgICBzcGF3biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgY2hpbGQgPSBtYWtlT2JzZXJ2YWJsZShmKGV2ZW50LnZhbHVlKCkpKTtcbiAgICAgICAgY2hpbGREZXBzLnB1c2goY2hpbGQpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgXy5yZW1vdmUoY2hpbGQsIGNoaWxkRGVwcyk7XG4gICAgICAgICAgICAgIGNoZWNrUXVldWUoKTtcbiAgICAgICAgICAgICAgY2hlY2tFbmQodW5zdWJNZSk7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBJbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBjaGVja1F1ZXVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgZXZlbnQgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hlY2tFbmQgPSBmdW5jdGlvbih1bnN1Yikge1xuICAgICAgICB1bnN1YigpO1xuICAgICAgICBpZiAoY29tcG9zaXRlLmVtcHR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gc2luayhlbmQoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb21wb3NpdGUuYWRkKGZ1bmN0aW9uKF9fLCB1bnN1YlJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3QuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrRW5kKHVuc3ViUm9vdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0T25seSAmJiBjb21wb3NpdGUuY291bnQoKSA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcG9zaXRlLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gbGltaXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcG9zaXRlLnVuc3Vic2NyaWJlO1xuICAgIH0pO1xuICAgIHJlc3VsdC5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjaGlsZERlcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByb290RGVwLmNvbmNhdChjaGlsZERlcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJvb3REZXA7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIEV2ZW50U3RyZWFtID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFdmVudFN0cmVhbSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEV2ZW50U3RyZWFtKGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVzYykpIHtcbiAgICAgICAgaGFuZGxlciA9IHN1YnNjcmliZTtcbiAgICAgICAgc3Vic2NyaWJlID0gZGVzYztcbiAgICAgICAgZGVzYyA9IFtdO1xuICAgICAgfVxuICAgICAgRXZlbnRTdHJlYW0uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzYyk7XG4gICAgICBhc3NlcnRGdW5jdGlvbihzdWJzY3JpYmUpO1xuICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICAgIHJlZ2lzdGVyT2JzKHRoaXMpO1xuICAgIH1cblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVsYXlcIiwgZGVsYXksIHRoaXMuZmxhdE1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXksIHZhbHVlKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWJvdW5jZVwiLCBkZWxheSwgdGhpcy5mbGF0TWFwTGF0ZXN0KGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5sYXRlcihkZWxheSwgdmFsdWUpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2VJbW1lZGlhdGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlYm91bmNlSW1tZWRpYXRlXCIsIGRlbGF5LCB0aGlzLmZsYXRNYXBGaXJzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQmFjb24ub25jZSh2YWx1ZSkuY29uY2F0KEJhY29uLmxhdGVyKGRlbGF5KS5maWx0ZXIoZmFsc2UpKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0aHJvdHRsZVwiLCBkZWxheSwgdGhpcy5idWZmZXJXaXRoVGltZShkZWxheSkubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJXaXRoVGltZVwiLCBkZWxheSwgdGhpcy5idWZmZXJXaXRoVGltZU9yQ291bnQoZGVsYXksIE51bWJlci5NQVhfVkFMVUUpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhDb3VudCA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aENvdW50XCIsIGNvdW50LCB0aGlzLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCh2b2lkIDAsIGNvdW50KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXJXaXRoVGltZU9yQ291bnQgPSBmdW5jdGlvbihkZWxheSwgY291bnQpIHtcbiAgICAgIHZhciBmbHVzaE9yU2NoZWR1bGU7XG4gICAgICBmbHVzaE9yU2NoZWR1bGUgPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci52YWx1ZXMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICAgIHJldHVybiBidWZmZXIuZmx1c2goKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWxheSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGJ1ZmZlci5zY2hlZHVsZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlcldpdGhUaW1lT3JDb3VudFwiLCBkZWxheSwgY291bnQsIHRoaXMuYnVmZmVyKGRlbGF5LCBmbHVzaE9yU2NoZWR1bGUsIGZsdXNoT3JTY2hlZHVsZSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyID0gZnVuY3Rpb24oZGVsYXksIG9uSW5wdXQsIG9uRmx1c2gpIHtcbiAgICAgIHZhciBidWZmZXIsIGRlbGF5TXMsIHJlcGx5O1xuICAgICAgaWYgKG9uSW5wdXQgPT0gbnVsbCkge1xuICAgICAgICBvbklucHV0ID0gbm9wO1xuICAgICAgfVxuICAgICAgaWYgKG9uRmx1c2ggPT0gbnVsbCkge1xuICAgICAgICBvbkZsdXNoID0gbm9wO1xuICAgICAgfVxuICAgICAgYnVmZmVyID0ge1xuICAgICAgICBzY2hlZHVsZWQ6IGZhbHNlLFxuICAgICAgICBlbmQ6IHZvaWQgMCxcbiAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgZmx1c2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChuZXh0KHRoaXMudmFsdWVzKSk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaCh0aGlzLmVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9uRmx1c2godGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2godGhpcy5lbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NoZWR1bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghdGhpcy5zY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxheSgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIGlmICghaXNGdW5jdGlvbihkZWxheSkpIHtcbiAgICAgICAgZGVsYXlNcyA9IGRlbGF5O1xuICAgICAgICBkZWxheSA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24uc2NoZWR1bGVyLnNldFRpbWVvdXQoZiwgZGVsYXlNcyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyXCIsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgYnVmZmVyLnB1c2ggPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgYnVmZmVyLmVuZCA9IGV2ZW50O1xuICAgICAgICAgIGlmICghYnVmZmVyLnNjaGVkdWxlZCkge1xuICAgICAgICAgICAgYnVmZmVyLmZsdXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlci52YWx1ZXMucHVzaChldmVudC52YWx1ZSgpKTtcbiAgICAgICAgICBvbklucHV0KGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbihyaWdodCkge1xuICAgICAgdmFyIGxlZnQ7XG4gICAgICBhc3NlcnRFdmVudFN0cmVhbShyaWdodCk7XG4gICAgICBsZWZ0ID0gdGhpcztcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24obGVmdCwgXCJtZXJnZVwiLCByaWdodCwgQmFjb24ubWVyZ2VBbGwodGhpcywgcmlnaHQpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRvUHJvcGVydHkgPSBmdW5jdGlvbihpbml0VmFsdWVfKSB7XG4gICAgICB2YXIgZGlzcCwgaW5pdFZhbHVlO1xuICAgICAgaW5pdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCA/IE5vbmUgOiB0b09wdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGluaXRWYWx1ZV87XG4gICAgICB9KTtcbiAgICAgIGRpc3AgPSB0aGlzLmRpc3BhdGNoZXI7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwidG9Qcm9wZXJ0eVwiLCBpbml0VmFsdWVfKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgaW5pdFNlbnQsIHJlcGx5LCBzZW5kSW5pdCwgdW5zdWI7XG4gICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKG5ldyBJbml0aWFsKHZhbHVlKSk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdW5zdWIgPSBkaXNwLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAoaW5pdFNlbnQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIGluaXRWYWx1ZSA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uKHNhbXBsZXIsIGNvbWJpbmF0b3IpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVkQnlcIiwgc2FtcGxlciwgY29tYmluYXRvciwgdGhpcy50b1Byb3BlcnR5KCkuc2FtcGxlZEJ5KHNhbXBsZXIsIGNvbWJpbmF0b3IpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgICB2YXIgbGVmdDtcbiAgICAgIGxlZnQgPSB0aGlzO1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShsZWZ0LCBcImNvbmNhdFwiLCByaWdodCksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIHVuc3ViTGVmdCwgdW5zdWJSaWdodDtcbiAgICAgICAgdW5zdWJSaWdodCA9IG5vcDtcbiAgICAgICAgdW5zdWJMZWZ0ID0gbGVmdC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuc3ViUmlnaHQgPSByaWdodC5kaXNwYXRjaGVyLnN1YnNjcmliZShzaW5rKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmsoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHVuc3ViTGVmdCgpO1xuICAgICAgICAgIHJldHVybiB1bnN1YlJpZ2h0KCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uKHN0b3BwZXIpIHtcbiAgICAgIHZhciBlbmRNYXJrZXI7XG4gICAgICBlbmRNYXJrZXIgPSB7fTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlVW50aWxcIiwgc3RvcHBlciwgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXModGhpcy5tYXBFbmQoZW5kTWFya2VyKSwgc3RvcHBlci5za2lwRXJyb3JzKCkpLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBkYXRhLCByZXBseSwgdmFsdWUsIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3JlZjEgPSBldmVudC52YWx1ZSgpLCBkYXRhID0gX3JlZjFbMF0sIHN0b3BwZXIgPSBfcmVmMVsxXTtcbiAgICAgICAgICBpZiAoc3RvcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGRhdGEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW19pXTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBlbmRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gobmV4dCh2YWx1ZSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwVW50aWwgPSBmdW5jdGlvbihzdGFydGVyKSB7XG4gICAgICB2YXIgc3RhcnRlZDtcbiAgICAgIHN0YXJ0ZWQgPSBzdGFydGVyLnRha2UoMSkubWFwKHRydWUpLnRvUHJvcGVydHkoZmFsc2UpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBVbnRpbFwiLCBzdGFydGVyLCB0aGlzLmZpbHRlcihzdGFydGVkKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwV2hpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmLCBvaztcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgb2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcFdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAob2sgfHwgIWV2ZW50Lmhhc1ZhbHVlKCkgfHwgIWYoZXZlbnQudmFsdWUoKSkpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFdoZW4gPSBmdW5jdGlvbih2YWx2ZSkge1xuICAgICAgdmFyIHB1dFRvSG9sZCwgcmVsZWFzZUhvbGQsIHZhbHZlXztcbiAgICAgIHZhbHZlXyA9IHZhbHZlLnN0YXJ0V2l0aChmYWxzZSk7XG4gICAgICByZWxlYXNlSG9sZCA9IHZhbHZlXy5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIXg7XG4gICAgICB9KTtcbiAgICAgIHB1dFRvSG9sZCA9IHZhbHZlXy5maWx0ZXIoXy5pZCk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiaG9sZFdoZW5cIiwgdmFsdmUsIHRoaXMuZmlsdGVyKGZhbHNlKS5tZXJnZSh2YWx2ZV8uZmxhdE1hcENvbmNhdCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNob3VsZEhvbGQpIHtcbiAgICAgICAgICBpZiAoIXNob3VsZEhvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50YWtlVW50aWwocHV0VG9Ib2xkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNjYW4oW10sIChmdW5jdGlvbih4cywgeCkge1xuICAgICAgICAgICAgICByZXR1cm4geHMuY29uY2F0KHgpO1xuICAgICAgICAgICAgfSkpLnNhbXBsZWRCeShyZWxlYXNlSG9sZCkudGFrZSgxKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbihzZWVkKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic3RhcnRXaXRoXCIsIHNlZWQsIEJhY29uLm9uY2Uoc2VlZCkuY29uY2F0KHRoaXMpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLndpdGhIYW5kbGVyID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcIndpdGhIYW5kbGVyXCIsIGhhbmRsZXIpLCB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50U3RyZWFtO1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIFByb3BlcnR5ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5KGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVzYykpIHtcbiAgICAgICAgaGFuZGxlciA9IHN1YnNjcmliZTtcbiAgICAgICAgc3Vic2NyaWJlID0gZGVzYztcbiAgICAgICAgZGVzYyA9IFtdO1xuICAgICAgfVxuICAgICAgUHJvcGVydHkuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzYyk7XG4gICAgICBhc3NlcnRGdW5jdGlvbihzdWJzY3JpYmUpO1xuICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IFByb3BlcnR5RGlzcGF0Y2hlcih0aGlzLCBzdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgICAgcmVnaXN0ZXJPYnModGhpcyk7XG4gICAgfVxuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uKHNhbXBsZXIsIGNvbWJpbmF0b3IpIHtcbiAgICAgIHZhciBsYXp5LCByZXN1bHQsIHNhbXBsZXJTb3VyY2UsIHN0cmVhbSwgdGhpc1NvdXJjZTtcbiAgICAgIGlmIChjb21iaW5hdG9yICE9IG51bGwpIHtcbiAgICAgICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihjb21iaW5hdG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhenkgPSB0cnVlO1xuICAgICAgICBjb21iaW5hdG9yID0gZnVuY3Rpb24oZikge1xuICAgICAgICAgIHJldHVybiBmLnZhbHVlKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzU291cmNlID0gbmV3IFNvdXJjZSh0aGlzLCBmYWxzZSwgbGF6eSk7XG4gICAgICBzYW1wbGVyU291cmNlID0gbmV3IFNvdXJjZShzYW1wbGVyLCB0cnVlLCBsYXp5KTtcbiAgICAgIHN0cmVhbSA9IEJhY29uLndoZW4oW3RoaXNTb3VyY2UsIHNhbXBsZXJTb3VyY2VdLCBjb21iaW5hdG9yKTtcbiAgICAgIHJlc3VsdCA9IHNhbXBsZXIgaW5zdGFuY2VvZiBQcm9wZXJ0eSA/IHN0cmVhbS50b1Byb3BlcnR5KCkgOiBzdHJlYW07XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2FtcGxlZEJ5XCIsIHNhbXBsZXIsIGNvbWJpbmF0b3IsIHJlc3VsdCk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5zYW1wbGUgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNhbXBsZVwiLCBpbnRlcnZhbCwgdGhpcy5zYW1wbGVkQnkoQmFjb24uaW50ZXJ2YWwoaW50ZXJ2YWwsIHt9KSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcImNoYW5nZXNcIiksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJ3aXRoSGFuZGxlclwiLCBoYW5kbGVyKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBhc3NlcnROb0FyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwidG9FdmVudFN0cmVhbVwiKSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmFuZCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYW5kXCIsIG90aGVyLCB0aGlzLmNvbWJpbmUob3RoZXIsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHggJiYgeTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLm9yID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJvclwiLCBvdGhlciwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB4IHx8IHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMoXCJkZWxheVwiLCBkZWxheSwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICByZXR1cm4gY2hhbmdlcy5kZWxheShkZWxheSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhcImRlYm91bmNlXCIsIGRlbGF5LCBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VzLmRlYm91bmNlKGRlbGF5KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwidGhyb3R0bGVcIiwgZGVsYXksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5nZXMudGhyb3R0bGUoZGVsYXkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5kZWxheUNoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNjLCBmLCBfaTtcbiAgICAgIGRlc2MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBfaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChfaSA9IDAsIFtdKSwgZiA9IGFyZ3VtZW50c1tfaSsrXTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChfX3NsaWNlLmNhbGwoZGVzYyksIFthZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGYodGhpcy5jaGFuZ2VzKCkpKV0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uKHN0b3BwZXIpIHtcbiAgICAgIHZhciBjaGFuZ2VzO1xuICAgICAgY2hhbmdlcyA9IHRoaXMuY2hhbmdlcygpLnRha2VVbnRpbChzdG9wcGVyKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlVW50aWxcIiwgc3RvcHBlciwgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSh0aGlzLCBjaGFuZ2VzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInN0YXJ0V2l0aFwiLCB2YWx1ZSwgdGhpcy5zY2FuKHZhbHVlLCBmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfcmVmMTtcbiAgICAgIHJldHVybiAoX3JlZjEgPSBQcm9wZXJ0eS5fX3N1cGVyX18uYnVmZmVyaW5nVGhyb3R0bGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSkuYnVmZmVyaW5nVGhyb3R0bGUuYXBwbHkoX3JlZjEsIGFyZ3VtZW50cykudG9Qcm9wZXJ0eSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvcGVydHk7XG5cbiAgfSkoT2JzZXJ2YWJsZSk7XG5cbiAgY29udmVydEFyZ3NUb0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JzLCBmLCBhcmdzLCBtZXRob2QpIHtcbiAgICB2YXIgc2FtcGxlZDtcbiAgICBpZiAoZiBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICBzYW1wbGVkID0gZi5zYW1wbGVkQnkob2JzLCBmdW5jdGlvbihwLCBzKSB7XG4gICAgICAgIHJldHVybiBbcCwgc107XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChzYW1wbGVkLCBmdW5jdGlvbihfYXJnKSB7XG4gICAgICAgIHZhciBwLCBzO1xuICAgICAgICBwID0gX2FyZ1swXSwgcyA9IF9hcmdbMV07XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uKF9hcmcpIHtcbiAgICAgICAgdmFyIHAsIHM7XG4gICAgICAgIHAgPSBfYXJnWzBdLCBzID0gX2FyZ1sxXTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbihmLCBhcmdzKTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChvYnMsIGYpO1xuICAgIH1cbiAgfTtcblxuICBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtID0gZnVuY3Rpb24ocHJvcGVydHksIHN0cmVhbSkge1xuICAgIHZhciBqdXN0SW5pdFZhbHVlO1xuICAgIGp1c3RJbml0VmFsdWUgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocHJvcGVydHksIFwianVzdEluaXRWYWx1ZVwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHVuc3ViLCB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdW5zdWIgPSBwcm9wZXJ0eS5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9KTtcbiAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKGp1c3RJbml0VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHNpbmsodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH0pO1xuICAgIHJldHVybiBqdXN0SW5pdFZhbHVlLmNvbmNhdChzdHJlYW0pLnRvUHJvcGVydHkoKTtcbiAgfTtcblxuICBEaXNwYXRjaGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIERpc3BhdGNoZXIoX3N1YnNjcmliZSwgX2hhbmRsZUV2ZW50KSB7XG4gICAgICB0aGlzLl9zdWJzY3JpYmUgPSBfc3Vic2NyaWJlO1xuICAgICAgdGhpcy5faGFuZGxlRXZlbnQgPSBfaGFuZGxlRXZlbnQ7XG4gICAgICB0aGlzLnN1YnNjcmliZSA9IF9fYmluZCh0aGlzLnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICB0aGlzLmhhbmRsZUV2ZW50ID0gX19iaW5kKHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJldkVycm9yID0gdm9pZCAwO1xuICAgICAgdGhpcy51bnN1YlNyYyA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNTdWJzY3JpYmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMgPSBfLndpdGhvdXQoc3Vic2NyaXB0aW9uLCB0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbihldmVudCwgdGhpcywgdGhpcy5wdXNoSXQsIFtldmVudF0pO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoVG9TdWJzY3JpcHRpb25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlLCByZXBseSwgc3ViLCB0bXAsIF9pLCBfbGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdG1wID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHRtcC5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIHN1YiA9IHRtcFtfaV07XG4gICAgICAgICAgcmVwbHkgPSBzdWIuc2luayhldmVudCk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUgfHwgZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdWIoc3ViKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaEl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5wdXNoaW5nKSB7XG4gICAgICAgIGlmIChldmVudCA9PT0gdGhpcy5wcmV2RXJyb3IpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHRoaXMucHJldkVycm9yID0gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wdXNoVG9TdWJzY3JpcHRpb25zKGV2ZW50KTtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgIGV2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzU3Vic2NyaWJlcnMoKSkge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tU291cmNlKCk7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudW5zdWJTcmMpIHtcbiAgICAgICAgdGhpcy51bnN1YlNyYygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudW5zdWJTcmMgPSB2b2lkIDA7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICBzaW5rKGVuZCgpKTtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2VydEZ1bmN0aW9uKHNpbmspO1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgc2luazogc2lua1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMudW5zdWJTcmMgPSB0aGlzLl9zdWJzY3JpYmUodGhpcy5oYW5kbGVFdmVudCk7XG4gICAgICAgICAgYXNzZXJ0RnVuY3Rpb24odGhpcy51bnN1YlNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZVN1YihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy51bnN1YnNjcmliZUZyb21Tb3VyY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpc3BhdGNoZXI7XG5cbiAgfSkoKTtcblxuICBQcm9wZXJ0eURpc3BhdGNoZXIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb3BlcnR5RGlzcGF0Y2hlciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5RGlzcGF0Y2hlcihwcm9wZXJ0eSwgc3Vic2NyaWJlLCBoYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgICAgdGhpcy5zdWJzY3JpYmUgPSBfX2JpbmQodGhpcy5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgUHJvcGVydHlEaXNwYXRjaGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpO1xuICAgICAgdGhpcy5jdXJyZW50ID0gTm9uZTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gdm9pZCAwO1xuICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlFbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlci5fX3N1cGVyX18ucHVzaC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5tYXliZVN1YlNvdXJjZSA9IGZ1bmN0aW9uKHNpbmssIHJlcGx5KSB7XG4gICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BlcnR5RW5kZWQpIHtcbiAgICAgICAgc2luayhlbmQoKSk7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlLmNhbGwodGhpcywgc2luayk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFByb3BlcnR5RGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGRpc3BhdGNoaW5nSWQsIGluaXRTZW50LCByZXBseSwgdmFsSWQ7XG4gICAgICBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudC5pc0RlZmluZWQgJiYgKHRoaXMuaGFzU3Vic2NyaWJlcnMoKSB8fCB0aGlzLnByb3BlcnR5RW5kZWQpKSB7XG4gICAgICAgIGRpc3BhdGNoaW5nSWQgPSBVcGRhdGVCYXJyaWVyLmN1cnJlbnRFdmVudElkKCk7XG4gICAgICAgIHZhbElkID0gdGhpcy5jdXJyZW50VmFsdWVSb290SWQ7XG4gICAgICAgIGlmICghdGhpcy5wcm9wZXJ0eUVuZGVkICYmIHZhbElkICYmIGRpc3BhdGNoaW5nSWQgJiYgZGlzcGF0Y2hpbmdJZCAhPT0gdmFsSWQpIHtcbiAgICAgICAgICBVcGRhdGVCYXJyaWVyLndoZW5Eb25lV2l0aCh0aGlzLnByb3BlcnR5LCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZCA9PT0gdmFsSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luayhpbml0aWFsKF90aGlzLmN1cnJlbnQuZ2V0KCkudmFsdWUoKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgVXBkYXRlQmFycmllci5pblRyYW5zYWN0aW9uKHZvaWQgMCwgdGhpcywgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5ID0gc2luayhpbml0aWFsKHRoaXMuY3VycmVudC5nZXQoKS52YWx1ZSgpKSk7XG4gICAgICAgICAgfSksIFtdKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlcjtcblxuICB9KShEaXNwYXRjaGVyKTtcblxuICBCdXMgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1cywgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEJ1cygpIHtcbiAgICAgIHRoaXMuZ3VhcmRlZFNpbmsgPSBfX2JpbmQodGhpcy5ndWFyZGVkU2luaywgdGhpcyk7XG4gICAgICB0aGlzLnN1YnNjcmliZUFsbCA9IF9fYmluZCh0aGlzLnN1YnNjcmliZUFsbCwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3ViQWxsID0gX19iaW5kKHRoaXMudW5zdWJBbGwsIHRoaXMpO1xuICAgICAgdGhpcy5zaW5rID0gdm9pZCAwO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gICAgICBCdXMuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzY3JpYmUoQmFjb24sIFwiQnVzXCIpLCB0aGlzLnN1YnNjcmliZUFsbCk7XG4gICAgfVxuXG4gICAgQnVzLnByb3RvdHlwZS51bnN1YkFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN1YiwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHN1YiA9IF9yZWYxW19pXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHN1Yi51bnN1YigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnN1YnNjcmliZUFsbCA9IGZ1bmN0aW9uKG5ld1NpbmspIHtcbiAgICAgIHZhciBzdWJzY3JpcHRpb24sIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgIHRoaXMuc2luayA9IG5ld1Npbms7XG4gICAgICBfcmVmMSA9IGNsb25lQXJyYXkodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gX3JlZjFbX2ldO1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51bnN1YkFsbDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5ndWFyZGVkU2luayA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICBfdGhpcy51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaW5rKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5zdWJzY3JpYmVJbnB1dCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YiA9IHN1YnNjcmlwdGlvbi5pbnB1dC5kaXNwYXRjaGVyLnN1YnNjcmliZSh0aGlzLmd1YXJkZWRTaW5rKHN1YnNjcmlwdGlvbi5pbnB1dCkpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnVuc3Vic2NyaWJlSW5wdXQgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgdmFyIGksIHN1YiwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgICAgc3ViID0gX3JlZjFbaV07XG4gICAgICAgIGlmIChzdWIuaW5wdXQgPT09IGlucHV0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUucGx1ZyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgc3ViO1xuICAgICAgYXNzZXJ0T2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzdWIgPSB7XG4gICAgICAgIGlucHV0OiBpbnB1dFxuICAgICAgfTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1Yik7XG4gICAgICBpZiAoKHRoaXMuc2luayAhPSBudWxsKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1Yik7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmVJbnB1dChpbnB1dCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgdGhpcy51bnN1YkFsbCgpO1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhlbmQoKSkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKG5leHQodmFsdWUpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKG5ldyBFcnJvcihlcnJvcikpIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gQnVzO1xuXG4gIH0pKEV2ZW50U3RyZWFtKTtcblxuICBTb3VyY2UgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU291cmNlKG9icywgc3luYywgbGF6eSkge1xuICAgICAgdGhpcy5vYnMgPSBvYnM7XG4gICAgICB0aGlzLnN5bmMgPSBzeW5jO1xuICAgICAgdGhpcy5sYXp5ID0gbGF6eSAhPSBudWxsID8gbGF6eSA6IGZhbHNlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIH1cblxuICAgIFNvdXJjZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMub2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5tYXJrRW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IF8uYWx3YXlzKHRoaXMucXVldWVbMF0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVswXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUgPSBbeF07XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIFNvdXJjZTtcblxuICB9KSgpO1xuXG4gIENvbnN1bWluZ1NvdXJjZSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29uc3VtaW5nU291cmNlLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtaW5nU291cmNlKCkge1xuICAgICAgcmV0dXJuIENvbnN1bWluZ1NvdXJjZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmNvbnN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goeCk7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiAhdGhpcy5lbmRlZCB8fCB0aGlzLnF1ZXVlLmxlbmd0aCA+PSBjO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmhhc0F0TGVhc3QgPSBmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGggPj0gYztcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5mbGF0dGVuID0gZmFsc2U7XG5cbiAgICByZXR1cm4gQ29uc3VtaW5nU291cmNlO1xuXG4gIH0pKFNvdXJjZSk7XG5cbiAgQnVmZmVyaW5nU291cmNlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdWZmZXJpbmdTb3VyY2UsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBCdWZmZXJpbmdTb3VyY2Uob2JzKSB7XG4gICAgICBCdWZmZXJpbmdTb3VyY2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb2JzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLmNvbnN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZXM7XG4gICAgICB2YWx1ZXMgPSB0aGlzLnF1ZXVlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goeC52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5oYXNBdExlYXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1ZmZlcmluZ1NvdXJjZTtcblxuICB9KShTb3VyY2UpO1xuXG4gIFNvdXJjZS5pc1RyaWdnZXIgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHMgaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBzLnN5bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzIGluc3RhbmNlb2YgRXZlbnRTdHJlYW07XG4gICAgfVxuICB9O1xuXG4gIFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocyBpbnN0YW5jZW9mIFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSBlbHNlIGlmIChzIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBuZXcgU291cmNlKHMsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBDb25zdW1pbmdTb3VyY2UocywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGRlc2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGNvbnRleHQsIG1ldGhvZDtcbiAgICBjb250ZXh0ID0gYXJndW1lbnRzWzBdLCBtZXRob2QgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICgoY29udGV4dCB8fCBtZXRob2QpIGluc3RhbmNlb2YgRGVzYykge1xuICAgICAgcmV0dXJuIGNvbnRleHQgfHwgbWV0aG9kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERlc2MoY29udGV4dCwgbWV0aG9kLCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgZmluZERlcHMgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKGlzQXJyYXkoeCkpIHtcbiAgICAgIHJldHVybiBfLmZsYXRNYXAoZmluZERlcHMsIHgpO1xuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHgpKSB7XG4gICAgICByZXR1cm4gW3hdO1xuICAgIH0gZWxzZSBpZiAoeCBpbnN0YW5jZW9mIFNvdXJjZSkge1xuICAgICAgcmV0dXJuIFt4Lm9ic107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG5cbiAgRGVzYyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBEZXNjKGNvbnRleHQsIG1ldGhvZCwgYXJncykge1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgIHRoaXMuY2FjaGVkID0gdm9pZCAwO1xuICAgIH1cblxuICAgIERlc2MucHJvdG90eXBlLmRlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZCB8fCAodGhpcy5jYWNoZWQgPSBmaW5kRGVwcyhbdGhpcy5jb250ZXh0XS5jb25jYXQodGhpcy5hcmdzKSkpO1xuICAgIH07XG5cbiAgICBEZXNjLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgb2JzLmRlc2MgPSB0aGlzO1xuICAgICAgcmV0dXJuIG9icztcbiAgICB9O1xuXG4gICAgRGVzYy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfLnRvU3RyaW5nKHRoaXMuY29udGV4dCkgKyBcIi5cIiArIF8udG9TdHJpbmcodGhpcy5tZXRob2QpICsgXCIoXCIgKyBfLm1hcChfLnRvU3RyaW5nLCB0aGlzLmFyZ3MpICsgXCIpXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBEZXNjO1xuXG4gIH0pKCk7XG5cbiAgd2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlc2MsIG9icywgX2k7XG4gICAgZGVzYyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIF9pID0gYXJndW1lbnRzLmxlbmd0aCAtIDEpIDogKF9pID0gMCwgW10pLCBvYnMgPSBhcmd1bWVudHNbX2krK107XG4gICAgcmV0dXJuIGRlc2NyaWJlLmFwcGx5KG51bGwsIGRlc2MpLmFwcGx5KG9icyk7XG4gIH07XG5cbiAgQmFjb24ud2hlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBpLCBpbmRleCwgaXgsIGxlbiwgbmVlZHNCYXJyaWVyLCBwYXQsIHBhdFNvdXJjZXMsIHBhdHMsIHBhdHRlcm5zLCByZXN1bHRTdHJlYW0sIHMsIHNvdXJjZXMsIHRyaWdnZXJGb3VuZCwgdXNhZ2UsIF9pLCBfaiwgX2xlbiwgX2xlbjEsIF9yZWYxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB1c2FnZSA9IFwid2hlbjogZXhwZWN0aW5nIGFyZ3VtZW50cyBpbiB0aGUgZm9ybSAoT2JzZXJ2YWJsZSssZnVuY3Rpb24pK1wiO1xuICAgIGFzc2VydCh1c2FnZSwgbGVuICUgMiA9PT0gMCk7XG4gICAgc291cmNlcyA9IFtdO1xuICAgIHBhdHMgPSBbXTtcbiAgICBpID0gMDtcbiAgICBwYXR0ZXJucyA9IFtdO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwYXR0ZXJuc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHBhdHRlcm5zW2kgKyAxXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICBwYXRTb3VyY2VzID0gXy50b0FycmF5KGFyZ3VtZW50c1tpXSk7XG4gICAgICBmID0gY29uc3RhbnRUb0Z1bmN0aW9uKGFyZ3VtZW50c1tpICsgMV0pO1xuICAgICAgcGF0ID0ge1xuICAgICAgICBmOiBmLFxuICAgICAgICBpeHM6IFtdXG4gICAgICB9O1xuICAgICAgdHJpZ2dlckZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHBhdFNvdXJjZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IHBhdFNvdXJjZXNbX2ldO1xuICAgICAgICBpbmRleCA9IF8uaW5kZXhPZihzb3VyY2VzLCBzKTtcbiAgICAgICAgaWYgKCF0cmlnZ2VyRm91bmQpIHtcbiAgICAgICAgICB0cmlnZ2VyRm91bmQgPSBTb3VyY2UuaXNUcmlnZ2VyKHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICBzb3VyY2VzLnB1c2gocyk7XG4gICAgICAgICAgaW5kZXggPSBzb3VyY2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgX3JlZjEgPSBwYXQuaXhzO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMS5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBpeCA9IF9yZWYxW19qXTtcbiAgICAgICAgICBpZiAoaXguaW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICBpeC5jb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXQuaXhzLnB1c2goe1xuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBjb3VudDogMVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGFzc2VydChcIkF0IGxlYXN0IG9uZSBFdmVudFN0cmVhbSByZXF1aXJlZFwiLCB0cmlnZ2VyRm91bmQgfHwgKCFwYXRTb3VyY2VzLmxlbmd0aCkpO1xuICAgICAgaWYgKHBhdFNvdXJjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRzLnB1c2gocGF0KTtcbiAgICAgIH1cbiAgICAgIGkgPSBpICsgMjtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgfVxuICAgIHNvdXJjZXMgPSBfLm1hcChTb3VyY2UuZnJvbU9ic2VydmFibGUsIHNvdXJjZXMpO1xuICAgIG5lZWRzQmFycmllciA9IChfLmFueShzb3VyY2VzLCBmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy5mbGF0dGVuO1xuICAgIH0pKSAmJiAoY29udGFpbnNEdXBsaWNhdGVEZXBzKF8ubWFwKChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy5vYnM7XG4gICAgfSksIHNvdXJjZXMpKSk7XG4gICAgcmV0dXJuIHJlc3VsdFN0cmVhbSA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZS5hcHBseShudWxsLCBbQmFjb24sIFwid2hlblwiXS5jb25jYXQoX19zbGljZS5jYWxsKHBhdHRlcm5zKSkpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2Fubm90TWF0Y2gsIGNhbm5vdFN5bmMsIGVuZHMsIG1hdGNoLCBub25GbGF0dGVuZWQsIHBhcnQsIHRyaWdnZXJzO1xuICAgICAgdHJpZ2dlcnMgPSBbXTtcbiAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgIG1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVmMjtcbiAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjIubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgaSA9IF9yZWYyW19rXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0uaGFzQXRMZWFzdChpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBjYW5ub3RTeW5jID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiAhc291cmNlLnN5bmMgfHwgc291cmNlLmVuZGVkO1xuICAgICAgfTtcbiAgICAgIGNhbm5vdE1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVmMjtcbiAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjIubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgaSA9IF9yZWYyW19rXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0ubWF5SGF2ZShpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9uRmxhdHRlbmVkID0gZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICByZXR1cm4gIXRyaWdnZXIuc291cmNlLmZsYXR0ZW47XG4gICAgICB9O1xuICAgICAgcGFydCA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odW5zdWJBbGwpIHtcbiAgICAgICAgICB2YXIgZmx1c2gsIGZsdXNoTGF0ZXIsIGZsdXNoV2hpbGVUcmlnZ2VycztcbiAgICAgICAgICBmbHVzaExhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0U3RyZWFtLCBmbHVzaCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaFdoaWxlVHJpZ2dlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBldmVudHMsIHAsIHJlcGx5LCB0cmlnZ2VyLCBfaywgX2xlbjI7XG4gICAgICAgICAgICBpZiAodHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgIHRyaWdnZXIgPSB0cmlnZ2Vycy5wb3AoKTtcbiAgICAgICAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gcGF0cy5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICAgICAgICBwID0gcGF0c1tfa107XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKHApKSB7XG4gICAgICAgICAgICAgICAgICBldmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbCwgX2xlbjMsIF9yZWYyLCBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfbCA9IDAsIF9sZW4zID0gX3JlZjIubGVuZ3RoOyBfbCA8IF9sZW4zOyBfbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaSA9IF9yZWYyW19sXTtcbiAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHNvdXJjZXNbaS5pbmRleF0uY29uc3VtZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRyaWdnZXIuZS5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50LCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgX2wsIF9sZW4zLCBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAoX2wgPSAwLCBfbGVuMyA9IGV2ZW50cy5sZW5ndGg7IF9sIDwgX2xlbjM7IF9sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW19sXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZi5hcHBseShwLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VycyA9IF8uZmlsdGVyKG5vbkZsYXR0ZW5lZCwgdHJpZ2dlcnMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgcmVwbHkgPSBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICAgIGlmIChlbmRzKSB7XG4gICAgICAgICAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKF8uYWxsKHNvdXJjZXMsIGNhbm5vdFN5bmMpIHx8IF8uYWxsKHBhdHMsIGNhbm5vdE1hdGNoKSkge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgICAgICBlbmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc291cmNlLm1hcmtFbmRlZCgpO1xuICAgICAgICAgICAgICBmbHVzaExhdGVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNvdXJjZS5wdXNoKGUpO1xuICAgICAgICAgICAgICBpZiAoc291cmNlLnN5bmMpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgICAgZTogZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChuZWVkc0JhcnJpZXIgfHwgVXBkYXRlQmFycmllci5oYXNXYWl0ZXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHkgfHwgQmFjb24ubW9yZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29tcG9zaXRlVW5zdWJzY3JpYmUuYXBwbHkobnVsbCwgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVzdWx0cztcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gc291cmNlcy5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICBzID0gc291cmNlc1tfa107XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChwYXJ0KHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9KSgpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb250YWluc0R1cGxpY2F0ZURlcHMgPSBmdW5jdGlvbihvYnNlcnZhYmxlcywgc3RhdGUpIHtcbiAgICB2YXIgY2hlY2tPYnNlcnZhYmxlO1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICBzdGF0ZSA9IFtdO1xuICAgIH1cbiAgICBjaGVja09ic2VydmFibGUgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgIHZhciBkZXBzO1xuICAgICAgaWYgKF8uY29udGFpbnMoc3RhdGUsIG9icykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgICAgICBpZiAoZGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICBzdGF0ZS5wdXNoKG9icyk7XG4gICAgICAgICAgcmV0dXJuIF8uYW55KGRlcHMsIGNoZWNrT2JzZXJ2YWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIF8uYW55KG9ic2VydmFibGVzLCBjaGVja09ic2VydmFibGUpO1xuICB9O1xuXG4gIEJhY29uLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBpbml0aWFsLCBsYXRlQmluZEZpcnN0LCBwYXR0ZXJucztcbiAgICBpbml0aWFsID0gYXJndW1lbnRzWzBdLCBwYXR0ZXJucyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgbGF0ZUJpbmRGaXJzdCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSkge1xuICAgICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIFtpXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIGkgPSBwYXR0ZXJucy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChpID4gMCkge1xuICAgICAgaWYgKCEocGF0dGVybnNbaV0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcGF0dGVybnNbaV0gPSAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHBhdHRlcm5zW2ldKTtcbiAgICAgIH1cbiAgICAgIHBhdHRlcm5zW2ldID0gbGF0ZUJpbmRGaXJzdChwYXR0ZXJuc1tpXSk7XG4gICAgICBpID0gaSAtIDI7XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcInVwZGF0ZVwiLCBpbml0aWFsXS5jb25jYXQoX19zbGljZS5jYWxsKHBhdHRlcm5zKSwgW0JhY29uLndoZW4uYXBwbHkoQmFjb24sIHBhdHRlcm5zKS5zY2FuKGluaXRpYWwsIChmdW5jdGlvbih4LCBmKSB7XG4gICAgICByZXR1cm4gZih4KTtcbiAgICB9KSldKSk7XG4gIH07XG5cbiAgY29tcG9zaXRlVW5zdWJzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3M7XG4gICAgc3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIHJldHVybiBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoc3MpLnVuc3Vic2NyaWJlO1xuICB9O1xuXG4gIENvbXBvc2l0ZVVuc3Vic2NyaWJlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvc2l0ZVVuc3Vic2NyaWJlKHNzKSB7XG4gICAgICB2YXIgcywgX2ksIF9sZW47XG4gICAgICBpZiAoc3MgPT0gbnVsbCkge1xuICAgICAgICBzcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IF9fYmluZCh0aGlzLnVuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc3MubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IHNzW19pXTtcbiAgICAgICAgdGhpcy5hZGQocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIGVuZGVkLCB1bnN1YiwgdW5zdWJNZTtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmRlZCA9IGZhbHNlO1xuICAgICAgdW5zdWIgPSBub3A7XG4gICAgICB0aGlzLnN0YXJ0aW5nLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgIHVuc3ViTWUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5kZWQgPSB0cnVlO1xuICAgICAgICAgIF90aGlzLnJlbW92ZSh1bnN1Yik7XG4gICAgICAgICAgcmV0dXJuIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgX3RoaXMuc3RhcnRpbmcpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB1bnN1YiA9IHN1YnNjcmlwdGlvbih0aGlzLnVuc3Vic2NyaWJlLCB1bnN1Yk1lKTtcbiAgICAgIGlmICghKHRoaXMudW5zdWJzY3JpYmVkIHx8IGVuZGVkKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh1bnN1Yik7XG4gICAgICB9XG4gICAgICBfLnJlbW92ZShzdWJzY3JpcHRpb24sIHRoaXMuc3RhcnRpbmcpO1xuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24odW5zdWIpIHtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKF8ucmVtb3ZlKHVuc3ViLCB0aGlzLnN1YnNjcmlwdGlvbnMpKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBfcmVmMVtfaV07XG4gICAgICAgIHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCArIHRoaXMuc3RhcnRpbmcubGVuZ3RoO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgPT09IDA7XG4gICAgfTtcblxuICAgIHJldHVybiBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuICB9KSgpO1xuXG4gIEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlID0gQ29tcG9zaXRlVW5zdWJzY3JpYmU7XG5cbiAgU29tZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTb21lKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgU29tZS5wcm90b3R5cGUuZ2V0T3JFbHNlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZikge1xuICAgICAgaWYgKGYodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTb21lKHRoaXMudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE5vbmU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBuZXcgU29tZShmKHRoaXMudmFsdWUpKTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5pc0RlZmluZWQgPSB0cnVlO1xuXG4gICAgU29tZS5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFt0aGlzLnZhbHVlXTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiU29tZShcIiArIHRoaXMudmFsdWUgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3BlY3QoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNvbWU7XG5cbiAgfSkoKTtcblxuICBOb25lID0ge1xuICAgIGdldE9yRWxzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gTm9uZTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gTm9uZTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKCkge30sXG4gICAgaXNEZWZpbmVkOiBmYWxzZSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiTm9uZVwiO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpO1xuICAgIH1cbiAgfTtcblxuICBVcGRhdGVCYXJyaWVyID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBhZnRlclRyYW5zYWN0aW9uLCBhZnRlcnMsIGFmdGVyc0luZGV4LCBjdXJyZW50RXZlbnRJZCwgZmx1c2gsIGZsdXNoRGVwc09mLCBmbHVzaFdhaXRlcnMsIGhhc1dhaXRlcnMsIGluVHJhbnNhY3Rpb24sIHJvb3RFdmVudCwgd2FpdGVyT2JzLCB3YWl0ZXJzLCB3aGVuRG9uZVdpdGgsIHdyYXBwZWRTdWJzY3JpYmU7XG4gICAgcm9vdEV2ZW50ID0gdm9pZCAwO1xuICAgIHdhaXRlck9icyA9IFtdO1xuICAgIHdhaXRlcnMgPSB7fTtcbiAgICBhZnRlcnMgPSBbXTtcbiAgICBhZnRlcnNJbmRleCA9IDA7XG4gICAgYWZ0ZXJUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGFmdGVycy5wdXNoKGYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoZW5Eb25lV2l0aCA9IGZ1bmN0aW9uKG9icywgZikge1xuICAgICAgdmFyIG9ic1dhaXRlcnM7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29icy5pZF07XG4gICAgICAgIGlmIChvYnNXYWl0ZXJzID09IG51bGwpIHtcbiAgICAgICAgICBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnMuaWRdID0gW2ZdO1xuICAgICAgICAgIHJldHVybiB3YWl0ZXJPYnMucHVzaChvYnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvYnNXYWl0ZXJzLnB1c2goZik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgd2hpbGUgKHdhaXRlck9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZsdXNoV2FpdGVycygwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcbiAgICBmbHVzaFdhaXRlcnMgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgdmFyIGYsIG9icywgb2JzSWQsIG9ic1dhaXRlcnMsIF9pLCBfbGVuO1xuICAgICAgb2JzID0gd2FpdGVyT2JzW2luZGV4XTtcbiAgICAgIG9ic0lkID0gb2JzLmlkO1xuICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzSWRdO1xuICAgICAgd2FpdGVyT2JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkZWxldGUgd2FpdGVyc1tvYnNJZF07XG4gICAgICBmbHVzaERlcHNPZihvYnMpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBvYnNXYWl0ZXJzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGYgPSBvYnNXYWl0ZXJzW19pXTtcbiAgICAgICAgZigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoRGVwc09mID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwLCBkZXBzLCBpbmRleCwgX2ksIF9sZW47XG4gICAgICBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBkZXBzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGRlcCA9IGRlcHNbX2ldO1xuICAgICAgICBmbHVzaERlcHNPZihkZXApO1xuICAgICAgICBpZiAod2FpdGVyc1tkZXAuaWRdKSB7XG4gICAgICAgICAgaW5kZXggPSBfLmluZGV4T2Yod2FpdGVyT2JzLCBkZXApO1xuICAgICAgICAgIGZsdXNoV2FpdGVycyhpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcbiAgICBpblRyYW5zYWN0aW9uID0gZnVuY3Rpb24oZXZlbnQsIGNvbnRleHQsIGYsIGFyZ3MpIHtcbiAgICAgIHZhciBhZnRlciwgcmVzdWx0O1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gZi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RFdmVudCA9IGV2ZW50O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IGYuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICByb290RXZlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgd2hpbGUgKGFmdGVyc0luZGV4IDwgYWZ0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWZ0ZXIgPSBhZnRlcnNbYWZ0ZXJzSW5kZXhdO1xuICAgICAgICAgICAgYWZ0ZXJzSW5kZXgrKztcbiAgICAgICAgICAgIGFmdGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFmdGVyc0luZGV4ID0gMDtcbiAgICAgICAgICBhZnRlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgY3VycmVudEV2ZW50SWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHJvb3RFdmVudC5pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgfTtcbiAgICB3cmFwcGVkU3Vic2NyaWJlID0gZnVuY3Rpb24ob2JzLCBzaW5rKSB7XG4gICAgICB2YXIgZG9VbnN1Yiwgc2hvdWxkVW5zdWIsIHVuc3ViLCB1bnN1YmQ7XG4gICAgICB1bnN1YmQgPSBmYWxzZTtcbiAgICAgIHNob3VsZFVuc3ViID0gZmFsc2U7XG4gICAgICBkb1Vuc3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaG91bGRVbnN1YiA9IHRydWU7XG4gICAgICB9O1xuICAgICAgdW5zdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGRvVW5zdWIoKTtcbiAgICAgIH07XG4gICAgICBkb1Vuc3ViID0gb2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBhZnRlclRyYW5zYWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICBpZiAoIXVuc3ViZCkge1xuICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzaG91bGRVbnN1Yikge1xuICAgICAgICBkb1Vuc3ViKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfTtcbiAgICBoYXNXYWl0ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2FpdGVyT2JzLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgd2hlbkRvbmVXaXRoOiB3aGVuRG9uZVdpdGgsXG4gICAgICBoYXNXYWl0ZXJzOiBoYXNXYWl0ZXJzLFxuICAgICAgaW5UcmFuc2FjdGlvbjogaW5UcmFuc2FjdGlvbixcbiAgICAgIGN1cnJlbnRFdmVudElkOiBjdXJyZW50RXZlbnRJZCxcbiAgICAgIHdyYXBwZWRTdWJzY3JpYmU6IHdyYXBwZWRTdWJzY3JpYmUsXG4gICAgICBhZnRlclRyYW5zYWN0aW9uOiBhZnRlclRyYW5zYWN0aW9uXG4gICAgfTtcbiAgfSkoKTtcblxuICBCYWNvbi5FdmVudFN0cmVhbSA9IEV2ZW50U3RyZWFtO1xuXG4gIEJhY29uLlByb3BlcnR5ID0gUHJvcGVydHk7XG5cbiAgQmFjb24uT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbiAgQmFjb24uQnVzID0gQnVzO1xuXG4gIEJhY29uLkluaXRpYWwgPSBJbml0aWFsO1xuXG4gIEJhY29uLk5leHQgPSBOZXh0O1xuXG4gIEJhY29uLkVuZCA9IEVuZDtcblxuICBCYWNvbi5FcnJvciA9IEVycm9yO1xuXG4gIG5vcCA9IGZ1bmN0aW9uKCkge307XG5cbiAgbGF0dGVyID0gZnVuY3Rpb24oXywgeCkge1xuICAgIHJldHVybiB4O1xuICB9O1xuXG4gIGZvcm1lciA9IGZ1bmN0aW9uKHgsIF8pIHtcbiAgICByZXR1cm4geDtcbiAgfTtcblxuICBpbml0aWFsID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEluaXRpYWwodmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIG5leHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZSwgdHJ1ZSk7XG4gIH07XG5cbiAgZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBFbmQoKTtcbiAgfTtcblxuICB0b0V2ZW50ID0gZnVuY3Rpb24oeCkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgRXZlbnQpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dCh4KTtcbiAgICB9XG4gIH07XG5cbiAgY2xvbmVBcnJheSA9IGZ1bmN0aW9uKHhzKSB7XG4gICAgcmV0dXJuIHhzLnNsaWNlKDApO1xuICB9O1xuXG4gIGFzc2VydCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNvbmRpdGlvbikge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKG1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRFdmVudFN0cmVhbSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudFN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gRXZlbnRTdHJlYW0gOiBcIiArIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBPYnNlcnZhYmxlIDogXCIgKyBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydEZ1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiBhc3NlcnQoXCJub3QgYSBmdW5jdGlvbiA6IFwiICsgZiwgaXNGdW5jdGlvbihmKSk7XG4gIH07XG5cbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gdHlwZW9mIGYgPT09IFwiZnVuY3Rpb25cIjtcbiAgfTtcblxuICBpc0FycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICByZXR1cm4geHMgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxuICBpc09ic2VydmFibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBPYnNlcnZhYmxlO1xuICB9O1xuXG4gIGFzc2VydEFycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICBpZiAoIWlzQXJyYXkoeHMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIGFycmF5IDogXCIgKyB4cyk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydE5vQXJndW1lbnRzID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBhc3NlcnQoXCJubyBhcmd1bWVudHMgc3VwcG9ydGVkXCIsIGFyZ3MubGVuZ3RoID09PSAwKTtcbiAgfTtcblxuICBhc3NlcnRTdHJpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHR5cGVvZiB4ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGEgc3RyaW5nIDogXCIgKyB4KTtcbiAgICB9XG4gIH07XG5cbiAgcGFydGlhbGx5QXBwbGllZCA9IGZ1bmN0aW9uKGYsIGFwcGxpZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXBwbGllZC5jb25jYXQoYXJncykpO1xuICAgIH07XG4gIH07XG5cbiAgbWFrZVNwYXduZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JzZXJ2YWJsZShhcmdzWzBdKSkge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGFyZ3NbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWFrZUZ1bmN0aW9uQXJncyhhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgbWFrZUZ1bmN0aW9uQXJncyA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgcmV0dXJuIG1ha2VGdW5jdGlvbl8uYXBwbHkobnVsbCwgYXJncyk7XG4gIH07XG5cbiAgbWFrZUZ1bmN0aW9uXyA9IHdpdGhNZXRob2RDYWxsU3VwcG9ydChmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAoaXNGdW5jdGlvbihmKSkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWFsbHlBcHBsaWVkKGYsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgICByZXR1cm4gdG9GaWVsZEV4dHJhY3RvcihmLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFrZUZ1bmN0aW9uID0gZnVuY3Rpb24oZiwgYXJncykge1xuICAgIHJldHVybiBtYWtlRnVuY3Rpb25fLmFwcGx5KG51bGwsIFtmXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpKSk7XG4gIH07XG5cbiAgY29uc3RhbnRUb0Z1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIGlmIChpc0Z1bmN0aW9uKGYpKSB7XG4gICAgICByZXR1cm4gZjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICAgIH1cbiAgfTtcblxuICBtYWtlT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlKHgpKSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gICAgfVxuICB9O1xuXG4gIGlzRmllbGRLZXkgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZiA9PT0gXCJzdHJpbmdcIikgJiYgZi5sZW5ndGggPiAxICYmIGYuY2hhckF0KDApID09PSBcIi5cIjtcbiAgfTtcblxuICBCYWNvbi5pc0ZpZWxkS2V5ID0gaXNGaWVsZEtleTtcblxuICB0b0ZpZWxkRXh0cmFjdG9yID0gZnVuY3Rpb24oZiwgYXJncykge1xuICAgIHZhciBwYXJ0RnVuY3MsIHBhcnRzO1xuICAgIHBhcnRzID0gZi5zbGljZSgxKS5zcGxpdChcIi5cIik7XG4gICAgcGFydEZ1bmNzID0gXy5tYXAodG9TaW1wbGVFeHRyYWN0b3IoYXJncyksIHBhcnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBfaSwgX2xlbjtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gcGFydEZ1bmNzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGYgPSBwYXJ0RnVuY3NbX2ldO1xuICAgICAgICB2YWx1ZSA9IGYodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgdG9TaW1wbGVFeHRyYWN0b3IgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmllbGRWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24oZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgdG9GaWVsZEtleSA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gZi5zbGljZSgxKTtcbiAgfTtcblxuICB0b0NvbWJpbmF0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgdmFyIGtleTtcbiAgICBpZiAoaXNGdW5jdGlvbihmKSkge1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgICBrZXkgPSB0b0ZpZWxkS2V5KGYpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBsZWZ0W2tleV0ocmlnaHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFzc2VydChcIm5vdCBhIGZ1bmN0aW9uIG9yIGEgZmllbGQga2V5OiBcIiArIGYsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdG9PcHRpb24gPSBmdW5jdGlvbih2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb21lIHx8IHYgPT09IE5vbmUpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUodik7XG4gICAgfVxuICB9O1xuXG4gIGlmICgodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwpICYmIChkZWZpbmUuYW1kICE9IG51bGwpKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBCYWNvbjtcbiAgICB9KTtcbiAgICB0aGlzLkJhY29uID0gQmFjb247XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlICE9PSBudWxsKSAmJiAobW9kdWxlLmV4cG9ydHMgIT0gbnVsbCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJhY29uO1xuICAgIEJhY29uLkJhY29uID0gQmFjb247XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICd3aW5kb3dzJzogOTEsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnc2hpZnQnOiAxNixcbiAgJ2N0bCc6IDE3LFxuICAnY3RybCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiLyoqXG4gKiBtYXJrZWQgLSBhIG1hcmtkb3duIHBhcnNlclxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTQsIENocmlzdG9waGVyIEplZmZyZXkuIChNSVQgTGljZW5zZWQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWRcbiAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgYmxvY2sgPSB7XG4gIG5ld2xpbmU6IC9eXFxuKy8sXG4gIGNvZGU6IC9eKCB7NH1bXlxcbl0rXFxuKikrLyxcbiAgZmVuY2VzOiBub29wLFxuICBocjogL14oICpbLSpfXSl7Myx9ICooPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICooW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS8sXG4gIG5wdGFibGU6IG5vb3AsXG4gIGxoZWFkaW5nOiAvXihbXlxcbl0rKVxcbiAqKD18LSl7Mix9ICooPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oICo+W15cXG5dKyhcXG4oPyFkZWYpW15cXG5dKykqXFxuKikrLyxcbiAgbGlzdDogL14oICopKGJ1bGwpIFtcXHNcXFNdKz8oPzpocnxkZWZ8XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudHxjbG9zZWR8Y2xvc2luZykgKig/OlxcbnsyLH18XFxzKiQpLyxcbiAgZGVmOiAvXiAqXFxbKFteXFxdXSspXFxdOiAqPD8oW15cXHM+XSspPj8oPzogK1tcIihdKFteXFxuXSspW1wiKV0pPyAqKD86XFxuK3wkKS8sXG4gIHRhYmxlOiBub29wLFxuICBwYXJhZ3JhcGg6IC9eKCg/OlteXFxuXStcXG4/KD8haHJ8aGVhZGluZ3xsaGVhZGluZ3xibG9ja3F1b3RlfHRhZ3xkZWYpKSspXFxuKi8sXG4gIHRleHQ6IC9eW15cXG5dKy9cbn07XG5cbmJsb2NrLmJ1bGxldCA9IC8oPzpbKistXXxcXGQrXFwuKS87XG5ibG9jay5pdGVtID0gL14oICopKGJ1bGwpIFteXFxuXSooPzpcXG4oPyFcXDFidWxsIClbXlxcbl0qKSovO1xuYmxvY2suaXRlbSA9IHJlcGxhY2UoYmxvY2suaXRlbSwgJ2dtJylcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCk7XG5cbmJsb2NrLmxpc3QgPSByZXBsYWNlKGJsb2NrLmxpc3QpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgnaHInLCAnXFxcXG4rKD89XFxcXDE/KD86Wy0qX10gKil7Myx9KD86XFxcXG4rfCQpKScpXG4gICgnZGVmJywgJ1xcXFxuKyg/PScgKyBibG9jay5kZWYuc291cmNlICsgJyknKVxuICAoKTtcblxuYmxvY2suYmxvY2txdW90ZSA9IHJlcGxhY2UoYmxvY2suYmxvY2txdW90ZSlcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG5ibG9jay5fdGFnID0gJyg/ISg/OidcbiAgKyAnYXxlbXxzdHJvbmd8c21hbGx8c3xjaXRlfHF8ZGZufGFiYnJ8ZGF0YXx0aW1lfGNvZGUnXG4gICsgJ3x2YXJ8c2FtcHxrYmR8c3VifHN1cHxpfGJ8dXxtYXJrfHJ1Ynl8cnR8cnB8YmRpfGJkbydcbiAgKyAnfHNwYW58YnJ8d2JyfGluc3xkZWx8aW1nKVxcXFxiKVxcXFx3Kyg/ITovfFteXFxcXHdcXFxcc0BdKkApXFxcXGInO1xuXG5ibG9jay5odG1sID0gcmVwbGFjZShibG9jay5odG1sKVxuICAoJ2NvbW1lbnQnLCAvPCEtLVtcXHNcXFNdKj8tLT4vKVxuICAoJ2Nsb3NlZCcsIC88KHRhZylbXFxzXFxTXSs/PFxcL1xcMT4vKVxuICAoJ2Nsb3NpbmcnLCAvPHRhZyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXidcIj5dKSo/Pi8pXG4gICgvdGFnL2csIGJsb2NrLl90YWcpXG4gICgpO1xuXG5ibG9jay5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCdocicsIGJsb2NrLmhyKVxuICAoJ2hlYWRpbmcnLCBibG9jay5oZWFkaW5nKVxuICAoJ2xoZWFkaW5nJywgYmxvY2subGhlYWRpbmcpXG4gICgnYmxvY2txdW90ZScsIGJsb2NrLmJsb2NrcXVvdGUpXG4gICgndGFnJywgJzwnICsgYmxvY2suX3RhZylcbiAgKCdkZWYnLCBibG9jay5kZWYpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2subm9ybWFsID0gbWVyZ2Uoe30sIGJsb2NrKTtcblxuLyoqXG4gKiBHRk0gQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLmdmbSA9IG1lcmdlKHt9LCBibG9jay5ub3JtYWwsIHtcbiAgZmVuY2VzOiAvXiAqKGB7Myx9fH57Myx9KSAqKFxcUyspPyAqXFxuKFtcXHNcXFNdKz8pXFxzKlxcMSAqKD86XFxuK3wkKS8sXG4gIHBhcmFncmFwaDogL14vXG59KTtcblxuYmxvY2suZ2ZtLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJyg/IScsICcoPyEnXG4gICAgKyBibG9jay5nZm0uZmVuY2VzLnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMicpICsgJ3wnXG4gICAgKyBibG9jay5saXN0LnNvdXJjZS5yZXBsYWNlKCdcXFxcMScsICdcXFxcMycpICsgJ3wnKVxuICAoKTtcblxuLyoqXG4gKiBHRk0gKyBUYWJsZXMgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLnRhYmxlcyA9IG1lcmdlKHt9LCBibG9jay5nZm0sIHtcbiAgbnB0YWJsZTogL14gKihcXFMuKlxcfC4qKVxcbiAqKFstOl0rICpcXHxbLXwgOl0qKVxcbigoPzouKlxcfC4qKD86XFxufCQpKSopXFxuKi8sXG4gIHRhYmxlOiAvXiAqXFx8KC4rKVxcbiAqXFx8KCAqWy06XStbLXwgOl0qKVxcbigoPzogKlxcfC4qKD86XFxufCQpKSopXFxuKi9cbn0pO1xuXG4vKipcbiAqIEJsb2NrIExleGVyXG4gKi9cblxuZnVuY3Rpb24gTGV4ZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2Vucy5saW5rcyA9IHt9O1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5ydWxlcyA9IGJsb2NrLm5vcm1hbDtcblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFibGVzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2sudGFibGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gYmxvY2suZ2ZtO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBCbG9jayBSdWxlc1xuICovXG5cbkxleGVyLnJ1bGVzID0gYmxvY2s7XG5cbi8qKlxuICogU3RhdGljIExleCBNZXRob2RcbiAqL1xuXG5MZXhlci5sZXggPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMpIHtcbiAgdmFyIGxleGVyID0gbmV3IExleGVyKG9wdGlvbnMpO1xuICByZXR1cm4gbGV4ZXIubGV4KHNyYyk7XG59O1xuXG4vKipcbiAqIFByZXByb2Nlc3NpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUubGV4ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHNyYyA9IHNyY1xuICAgIC5yZXBsYWNlKC9cXHJcXG58XFxyL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgJyAgICAnKVxuICAgIC5yZXBsYWNlKC9cXHUwMGEwL2csICcgJylcbiAgICAucmVwbGFjZSgvXFx1MjQyNC9nLCAnXFxuJyk7XG5cbiAgcmV0dXJuIHRoaXMudG9rZW4oc3JjLCB0cnVlKTtcbn07XG5cbi8qKlxuICogTGV4aW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLnRva2VuID0gZnVuY3Rpb24oc3JjLCB0b3AsIGJxKSB7XG4gIHZhciBzcmMgPSBzcmMucmVwbGFjZSgvXiArJC9nbSwgJycpXG4gICAgLCBuZXh0XG4gICAgLCBsb29zZVxuICAgICwgY2FwXG4gICAgLCBidWxsXG4gICAgLCBiXG4gICAgLCBpdGVtXG4gICAgLCBzcGFjZVxuICAgICwgaVxuICAgICwgbDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gbmV3bGluZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLm5ld2xpbmUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFswXS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdzcGFjZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gezR9L2dtLCAnJyk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICB0ZXh0OiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgPyBjYXAucmVwbGFjZSgvXFxuKyQvLCAnJylcbiAgICAgICAgICA6IGNhcFxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBmZW5jZXMgKGdmbSlcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5mZW5jZXMuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgbGFuZzogY2FwWzJdLFxuICAgICAgICB0ZXh0OiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsxXS5sZW5ndGgsXG4gICAgICAgIHRleHQ6IGNhcFsyXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSBubyBsZWFkaW5nIHBpcGUgKGdmbSlcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLm5wdGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV0uc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzJdID09PSAnPScgPyAxIDogMixcbiAgICAgICAgdGV4dDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdocidcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYmxvY2txdW90ZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmJsb2NrcXVvdGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfc3RhcnQnXG4gICAgICB9KTtcblxuICAgICAgY2FwID0gY2FwWzBdLnJlcGxhY2UoL14gKj4gPy9nbSwgJycpO1xuXG4gICAgICAvLyBQYXNzIGB0b3BgIHRvIGtlZXAgdGhlIGN1cnJlbnRcbiAgICAgIC8vIFwidG9wbGV2ZWxcIiBzdGF0ZS4gVGhpcyBpcyBleGFjdGx5XG4gICAgICAvLyBob3cgbWFya2Rvd24ucGwgd29ya3MuXG4gICAgICB0aGlzLnRva2VuKGNhcCwgdG9wLCB0cnVlKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaXN0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGlzdC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBidWxsID0gY2FwWzJdO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3Rfc3RhcnQnLFxuICAgICAgICBvcmRlcmVkOiBidWxsLmxlbmd0aCA+IDFcbiAgICAgIH0pO1xuXG4gICAgICAvLyBHZXQgZWFjaCB0b3AtbGV2ZWwgaXRlbS5cbiAgICAgIGNhcCA9IGNhcFswXS5tYXRjaCh0aGlzLnJ1bGVzLml0ZW0pO1xuXG4gICAgICBuZXh0ID0gZmFsc2U7XG4gICAgICBsID0gY2FwLmxlbmd0aDtcbiAgICAgIGkgPSAwO1xuXG4gICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpdGVtID0gY2FwW2ldO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbGlzdCBpdGVtJ3MgYnVsbGV0XG4gICAgICAgIC8vIHNvIGl0IGlzIHNlZW4gYXMgdGhlIG5leHQgdG9rZW4uXG4gICAgICAgIHNwYWNlID0gaXRlbS5sZW5ndGg7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnJlcGxhY2UoL14gKihbKistXXxcXGQrXFwuKSArLywgJycpO1xuXG4gICAgICAgIC8vIE91dGRlbnQgd2hhdGV2ZXIgdGhlXG4gICAgICAgIC8vIGxpc3QgaXRlbSBjb250YWlucy4gSGFja3kuXG4gICAgICAgIGlmICh+aXRlbS5pbmRleE9mKCdcXG4gJykpIHtcbiAgICAgICAgICBzcGFjZSAtPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgICBpdGVtID0gIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgICAgPyBpdGVtLnJlcGxhY2UobmV3IFJlZ0V4cCgnXiB7MSwnICsgc3BhY2UgKyAnfScsICdnbScpLCAnJylcbiAgICAgICAgICAgIDogaXRlbS5yZXBsYWNlKC9eIHsxLDR9L2dtLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciB0aGUgbmV4dCBsaXN0IGl0ZW0gYmVsb25ncyBoZXJlLlxuICAgICAgICAvLyBCYWNrcGVkYWwgaWYgaXQgZG9lcyBub3QgYmVsb25nIGluIHRoaXMgbGlzdC5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zbWFydExpc3RzICYmIGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgYiA9IGJsb2NrLmJ1bGxldC5leGVjKGNhcFtpICsgMV0pWzBdO1xuICAgICAgICAgIGlmIChidWxsICE9PSBiICYmICEoYnVsbC5sZW5ndGggPiAxICYmIGIubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgICAgIHNyYyA9IGNhcC5zbGljZShpICsgMSkuam9pbignXFxuJykgKyBzcmM7XG4gICAgICAgICAgICBpID0gbCAtIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgaXRlbSBpcyBsb29zZSBvciBub3QuXG4gICAgICAgIC8vIFVzZTogLyhefFxcbikoPyEgKVteXFxuXStcXG5cXG4oPyFcXHMqJCkvXG4gICAgICAgIC8vIGZvciBkaXNjb3VudCBiZWhhdmlvci5cbiAgICAgICAgbG9vc2UgPSBuZXh0IHx8IC9cXG5cXG4oPyFcXHMqJCkvLnRlc3QoaXRlbSk7XG4gICAgICAgIGlmIChpICE9PSBsIC0gMSkge1xuICAgICAgICAgIG5leHQgPSBpdGVtLmNoYXJBdChpdGVtLmxlbmd0aCAtIDEpID09PSAnXFxuJztcbiAgICAgICAgICBpZiAoIWxvb3NlKSBsb29zZSA9IG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBsb29zZVxuICAgICAgICAgICAgPyAnbG9vc2VfaXRlbV9zdGFydCdcbiAgICAgICAgICAgIDogJ2xpc3RfaXRlbV9zdGFydCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVjdXJzZS5cbiAgICAgICAgdGhpcy50b2tlbihpdGVtLCBmYWxzZSwgYnEpO1xuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdsaXN0X2l0ZW1fZW5kJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X2VuZCdcbiAgICAgIH0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBodG1sXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaHRtbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgICAgPyAncGFyYWdyYXBoJ1xuICAgICAgICAgIDogJ2h0bWwnLFxuICAgICAgICBwcmU6IGNhcFsxXSA9PT0gJ3ByZScgfHwgY2FwWzFdID09PSAnc2NyaXB0JyB8fCBjYXBbMV0gPT09ICdzdHlsZScsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWZcbiAgICBpZiAoKCFicSAmJiB0b3ApICYmIChjYXAgPSB0aGlzLnJ1bGVzLmRlZi5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMubGlua3NbY2FwWzFdLnRvTG93ZXJDYXNlKCldID0ge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWJsZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMudGFibGUuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgaXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgaGVhZGVyOiBjYXBbMV0ucmVwbGFjZSgvXiAqfCAqXFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBhbGlnbjogY2FwWzJdLnJlcGxhY2UoL14gKnxcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGNlbGxzOiBjYXBbM10ucmVwbGFjZSgvKD86ICpcXHwgKik/XFxuJC8sICcnKS5zcGxpdCgnXFxuJylcbiAgICAgIH07XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmFsaWduLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgvXiAqLSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdyaWdodCc7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2NlbnRlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoL14gKjotKyAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbS5jZWxsc1tpXSA9IGl0ZW0uY2VsbHNbaV1cbiAgICAgICAgICAucmVwbGFjZSgvXiAqXFx8ICp8ICpcXHwgKiQvZywgJycpXG4gICAgICAgICAgLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRvcC1sZXZlbCBwYXJhZ3JhcGhcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnBhcmFncmFwaC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdwYXJhZ3JhcGgnLFxuICAgICAgICB0ZXh0OiBjYXBbMV0uY2hhckF0KGNhcFsxXS5sZW5ndGggLSAxKSA9PT0gJ1xcbidcbiAgICAgICAgICA/IGNhcFsxXS5zbGljZSgwLCAtMSlcbiAgICAgICAgICA6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIC8vIFRvcC1sZXZlbCBzaG91bGQgbmV2ZXIgcmVhY2ggaGVyZS5cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMudG9rZW5zO1xufTtcblxuLyoqXG4gKiBJbmxpbmUtTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBpbmxpbmUgPSB7XG4gIGVzY2FwZTogL15cXFxcKFtcXFxcYCp7fVxcW1xcXSgpIytcXC0uIV8+XSkvLFxuICBhdXRvbGluazogL148KFteID5dKyhAfDpcXC8pW14gPl0rKT4vLFxuICB1cmw6IG5vb3AsXG4gIHRhZzogL148IS0tW1xcc1xcU10qPy0tPnxePFxcLz9cXHcrKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LyxcbiAgbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFwoaHJlZlxcKS8sXG4gIHJlZmxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxccypcXFsoW15cXF1dKilcXF0vLFxuICBub2xpbms6IC9eIT9cXFsoKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV0pKilcXF0vLFxuICBzdHJvbmc6IC9eX18oW1xcc1xcU10rPylfXyg/IV8pfF5cXCpcXCooW1xcc1xcU10rPylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXFxiXygoPzpfX3xbXFxzXFxTXSkrPylfXFxifF5cXCooKD86XFwqXFwqfFtcXHNcXFNdKSs/KVxcKig/IVxcKikvLFxuICBjb2RlOiAvXihgKylcXHMqKFtcXHNcXFNdKj9bXmBdKVxccypcXDEoPyFgKS8sXG4gIGJyOiAvXiB7Mix9XFxuKD8hXFxzKiQpLyxcbiAgZGVsOiBub29wLFxuICB0ZXh0OiAvXltcXHNcXFNdKz8oPz1bXFxcXDwhXFxbXypgXXwgezIsfVxcbnwkKS9cbn07XG5cbmlubGluZS5faW5zaWRlID0gLyg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dfFxcXSg/PVteXFxbXSpcXF0pKSovO1xuaW5saW5lLl9ocmVmID0gL1xccyo8PyhbXFxzXFxTXSo/KT4/KD86XFxzK1snXCJdKFtcXHNcXFNdKj8pWydcIl0pP1xccyovO1xuXG5pbmxpbmUubGluayA9IHJlcGxhY2UoaW5saW5lLmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgnaHJlZicsIGlubGluZS5faHJlZilcbiAgKCk7XG5cbmlubGluZS5yZWZsaW5rID0gcmVwbGFjZShpbmxpbmUucmVmbGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLm5vcm1hbCA9IG1lcmdlKHt9LCBpbmxpbmUpO1xuXG4vKipcbiAqIFBlZGFudGljIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLnBlZGFudGljID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgc3Ryb25nOiAvXl9fKD89XFxTKShbXFxzXFxTXSo/XFxTKV9fKD8hXyl8XlxcKlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCpcXCooPyFcXCopLyxcbiAgZW06IC9eXyg/PVxcUykoW1xcc1xcU10qP1xcUylfKD8hXyl8XlxcKig/PVxcUykoW1xcc1xcU10qP1xcUylcXCooPyFcXCopL1xufSk7XG5cbi8qKlxuICogR0ZNIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmdmbSA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIGVzY2FwZTogcmVwbGFjZShpbmxpbmUuZXNjYXBlKSgnXSknLCAnfnxdKScpKCksXG4gIHVybDogL14oaHR0cHM/OlxcL1xcL1teXFxzPF0rW148Liw6O1wiJylcXF1cXHNdKS8sXG4gIGRlbDogL15+fig/PVxcUykoW1xcc1xcU10qP1xcUyl+fi8sXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLnRleHQpXG4gICAgKCddfCcsICd+XXwnKVxuICAgICgnfCcsICd8aHR0cHM/Oi8vfCcpXG4gICAgKClcbn0pO1xuXG4vKipcbiAqIEdGTSArIExpbmUgQnJlYWtzIElubGluZSBHcmFtbWFyXG4gKi9cblxuaW5saW5lLmJyZWFrcyA9IG1lcmdlKHt9LCBpbmxpbmUuZ2ZtLCB7XG4gIGJyOiByZXBsYWNlKGlubGluZS5icikoJ3syLH0nLCAnKicpKCksXG4gIHRleHQ6IHJlcGxhY2UoaW5saW5lLmdmbS50ZXh0KSgnezIsfScsICcqJykoKVxufSk7XG5cbi8qKlxuICogSW5saW5lIExleGVyICYgQ29tcGlsZXJcbiAqL1xuXG5mdW5jdGlvbiBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5saW5rcyA9IGxpbmtzO1xuICB0aGlzLnJ1bGVzID0gaW5saW5lLm5vcm1hbDtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAoIXRoaXMubGlua3MpIHtcbiAgICB0aHJvdyBuZXdcbiAgICAgIEVycm9yKCdUb2tlbnMgYXJyYXkgcmVxdWlyZXMgYSBgbGlua3NgIHByb3BlcnR5LicpO1xuICB9XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJyZWFrcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5icmVha3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuZ2ZtO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMucGVkYW50aWMpIHtcbiAgICB0aGlzLnJ1bGVzID0gaW5saW5lLnBlZGFudGljO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIElubGluZSBSdWxlc1xuICovXG5cbklubGluZUxleGVyLnJ1bGVzID0gaW5saW5lO1xuXG4vKipcbiAqIFN0YXRpYyBMZXhpbmcvQ29tcGlsaW5nIE1ldGhvZFxuICovXG5cbklubGluZUxleGVyLm91dHB1dCA9IGZ1bmN0aW9uKHNyYywgbGlua3MsIG9wdGlvbnMpIHtcbiAgdmFyIGlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihsaW5rcywgb3B0aW9ucyk7XG4gIHJldHVybiBpbmxpbmUub3V0cHV0KHNyYyk7XG59O1xuXG4vKipcbiAqIExleGluZy9Db21waWxpbmdcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24oc3JjKSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbGlua1xuICAgICwgdGV4dFxuICAgICwgaHJlZlxuICAgICwgY2FwO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBlc2NhcGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lc2NhcGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGNhcFsxXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGF1dG9saW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYXV0b2xpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgaWYgKGNhcFsyXSA9PT0gJ0AnKSB7XG4gICAgICAgIHRleHQgPSBjYXBbMV0uY2hhckF0KDYpID09PSAnOidcbiAgICAgICAgICA/IHRoaXMubWFuZ2xlKGNhcFsxXS5zdWJzdHJpbmcoNykpXG4gICAgICAgICAgOiB0aGlzLm1hbmdsZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGhpcy5tYW5nbGUoJ21haWx0bzonKSArIHRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgfVxuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHVybCAoZ2ZtKVxuICAgIGlmICghdGhpcy5pbkxpbmsgJiYgKGNhcCA9IHRoaXMucnVsZXMudXJsLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0ZXh0ID0gZXNjYXBlKGNhcFsxXSk7XG4gICAgICBocmVmID0gdGV4dDtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0YWdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50YWcuZXhlYyhzcmMpKSB7XG4gICAgICBpZiAoIXRoaXMuaW5MaW5rICYmIC9ePGEgL2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pbkxpbmsgJiYgL148XFwvYT4vaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5vcHRpb25zLnNhbml0aXplXG4gICAgICAgID8gZXNjYXBlKGNhcFswXSlcbiAgICAgICAgOiBjYXBbMF07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaW5rXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwge1xuICAgICAgICBocmVmOiBjYXBbMl0sXG4gICAgICAgIHRpdGxlOiBjYXBbM11cbiAgICAgIH0pO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHJlZmxpbmssIG5vbGlua1xuICAgIGlmICgoY2FwID0gdGhpcy5ydWxlcy5yZWZsaW5rLmV4ZWMoc3JjKSlcbiAgICAgICAgfHwgKGNhcCA9IHRoaXMucnVsZXMubm9saW5rLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBsaW5rID0gKGNhcFsyXSB8fCBjYXBbMV0pLnJlcGxhY2UoL1xccysvZywgJyAnKTtcbiAgICAgIGxpbmsgPSB0aGlzLmxpbmtzW2xpbmsudG9Mb3dlckNhc2UoKV07XG4gICAgICBpZiAoIWxpbmsgfHwgIWxpbmsuaHJlZikge1xuICAgICAgICBvdXQgKz0gY2FwWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgc3JjID0gY2FwWzBdLnN1YnN0cmluZygxKSArIHNyYztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICBvdXQgKz0gdGhpcy5vdXRwdXRMaW5rKGNhcCwgbGluayk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gc3Ryb25nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuc3Ryb25nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLnN0cm9uZyh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBlbVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVtLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmVtKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmNvZGVzcGFuKGVzY2FwZShjYXBbMl0sIHRydWUpKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJyXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYnIuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuYnIoKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlbCAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmRlbC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5kZWwodGhpcy5vdXRwdXQoY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0ZXh0XG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGV4dC5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gZXNjYXBlKHRoaXMuc21hcnR5cGFudHMoY2FwWzBdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBDb21waWxlIExpbmtcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUub3V0cHV0TGluayA9IGZ1bmN0aW9uKGNhcCwgbGluaykge1xuICB2YXIgaHJlZiA9IGVzY2FwZShsaW5rLmhyZWYpXG4gICAgLCB0aXRsZSA9IGxpbmsudGl0bGUgPyBlc2NhcGUobGluay50aXRsZSkgOiBudWxsO1xuXG4gIHJldHVybiBjYXBbMF0uY2hhckF0KDApICE9PSAnISdcbiAgICA/IHRoaXMucmVuZGVyZXIubGluayhocmVmLCB0aXRsZSwgdGhpcy5vdXRwdXQoY2FwWzFdKSlcbiAgICA6IHRoaXMucmVuZGVyZXIuaW1hZ2UoaHJlZiwgdGl0bGUsIGVzY2FwZShjYXBbMV0pKTtcbn07XG5cbi8qKlxuICogU21hcnR5cGFudHMgVHJhbnNmb3JtYXRpb25zXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLnNtYXJ0eXBhbnRzID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAoIXRoaXMub3B0aW9ucy5zbWFydHlwYW50cykgcmV0dXJuIHRleHQ7XG4gIHJldHVybiB0ZXh0XG4gICAgLy8gZW0tZGFzaGVzXG4gICAgLnJlcGxhY2UoLy0tL2csICdcXHUyMDE0JylcbiAgICAvLyBvcGVuaW5nIHNpbmdsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XCJcXHNdKScvZywgJyQxXFx1MjAxOCcpXG4gICAgLy8gY2xvc2luZyBzaW5nbGVzICYgYXBvc3Ryb3BoZXNcbiAgICAucmVwbGFjZSgvJy9nLCAnXFx1MjAxOScpXG4gICAgLy8gb3BlbmluZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1xcdTIwMThcXHNdKVwiL2csICckMVxcdTIwMWMnKVxuICAgIC8vIGNsb3NpbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC9cIi9nLCAnXFx1MjAxZCcpXG4gICAgLy8gZWxsaXBzZXNcbiAgICAucmVwbGFjZSgvXFwuezN9L2csICdcXHUyMDI2Jyk7XG59O1xuXG4vKipcbiAqIE1hbmdsZSBMaW5rc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5tYW5nbGUgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHZhciBvdXQgPSAnJ1xuICAgICwgbCA9IHRleHQubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgY2g7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBjaCA9IHRleHQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgY2ggPSAneCcgKyBjaC50b1N0cmluZygxNik7XG4gICAgfVxuICAgIG91dCArPSAnJiMnICsgY2ggKyAnOyc7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBSZW5kZXJlclxuICovXG5cbmZ1bmN0aW9uIFJlbmRlcmVyKG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbn1cblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGUgPSBmdW5jdGlvbihjb2RlLCBsYW5nLCBlc2NhcGVkKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KSB7XG4gICAgdmFyIG91dCA9IHRoaXMub3B0aW9ucy5oaWdobGlnaHQoY29kZSwgbGFuZyk7XG4gICAgaWYgKG91dCAhPSBudWxsICYmIG91dCAhPT0gY29kZSkge1xuICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICBjb2RlID0gb3V0O1xuICAgIH1cbiAgfVxuXG4gIGlmICghbGFuZykge1xuICAgIHJldHVybiAnPHByZT48Y29kZT4nXG4gICAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICAgICsgJ1xcbjwvY29kZT48L3ByZT4nO1xuICB9XG5cbiAgcmV0dXJuICc8cHJlPjxjb2RlIGNsYXNzPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmxhbmdQcmVmaXhcbiAgICArIGVzY2FwZShsYW5nLCB0cnVlKVxuICAgICsgJ1wiPidcbiAgICArIChlc2NhcGVkID8gY29kZSA6IGVzY2FwZShjb2RlLCB0cnVlKSlcbiAgICArICdcXG48L2NvZGU+PC9wcmU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ibG9ja3F1b3RlID0gZnVuY3Rpb24ocXVvdGUpIHtcbiAgcmV0dXJuICc8YmxvY2txdW90ZT5cXG4nICsgcXVvdGUgKyAnPC9ibG9ja3F1b3RlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWw7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaGVhZGluZyA9IGZ1bmN0aW9uKHRleHQsIGxldmVsLCByYXcpIHtcbiAgcmV0dXJuICc8aCdcbiAgICArIGxldmVsXG4gICAgKyAnIGlkPVwiJ1xuICAgICsgdGhpcy5vcHRpb25zLmhlYWRlclByZWZpeFxuICAgICsgcmF3LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15cXHddKy9nLCAnLScpXG4gICAgKyAnXCI+J1xuICAgICsgdGV4dFxuICAgICsgJzwvaCdcbiAgICArIGxldmVsXG4gICAgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8aHIvPlxcbicgOiAnPGhyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uKGJvZHksIG9yZGVyZWQpIHtcbiAgdmFyIHR5cGUgPSBvcmRlcmVkID8gJ29sJyA6ICd1bCc7XG4gIHJldHVybiAnPCcgKyB0eXBlICsgJz5cXG4nICsgYm9keSArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3RpdGVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxsaT4nICsgdGV4dCArICc8L2xpPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUucGFyYWdyYXBoID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxwPicgKyB0ZXh0ICsgJzwvcD5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlID0gZnVuY3Rpb24oaGVhZGVyLCBib2R5KSB7XG4gIHJldHVybiAnPHRhYmxlPlxcbidcbiAgICArICc8dGhlYWQ+XFxuJ1xuICAgICsgaGVhZGVyXG4gICAgKyAnPC90aGVhZD5cXG4nXG4gICAgKyAnPHRib2R5PlxcbidcbiAgICArIGJvZHlcbiAgICArICc8L3Rib2R5PlxcbidcbiAgICArICc8L3RhYmxlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVyb3cgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gIHJldHVybiAnPHRyPlxcbicgKyBjb250ZW50ICsgJzwvdHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZWNlbGwgPSBmdW5jdGlvbihjb250ZW50LCBmbGFncykge1xuICB2YXIgdHlwZSA9IGZsYWdzLmhlYWRlciA/ICd0aCcgOiAndGQnO1xuICB2YXIgdGFnID0gZmxhZ3MuYWxpZ25cbiAgICA/ICc8JyArIHR5cGUgKyAnIHN0eWxlPVwidGV4dC1hbGlnbjonICsgZmxhZ3MuYWxpZ24gKyAnXCI+J1xuICAgIDogJzwnICsgdHlwZSArICc+JztcbiAgcmV0dXJuIHRhZyArIGNvbnRlbnQgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cbi8vIHNwYW4gbGV2ZWwgcmVuZGVyZXJcblJlbmRlcmVyLnByb3RvdHlwZS5zdHJvbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHN0cm9uZz4nICsgdGV4dCArICc8L3N0cm9uZz4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmVtID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxlbT4nICsgdGV4dCArICc8L2VtPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZXNwYW4gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGNvZGU+JyArIHRleHQgKyAnPC9jb2RlPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYnIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9ucy54aHRtbCA/ICc8YnIvPicgOiAnPGJyPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZGVsID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxkZWw+JyArIHRleHQgKyAnPC9kZWw+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5zYW5pdGl6ZSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcHJvdCA9IGRlY29kZVVSSUNvbXBvbmVudCh1bmVzY2FwZShocmVmKSlcbiAgICAgICAgLnJlcGxhY2UoL1teXFx3Ol0vZywgJycpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKHByb3QuaW5kZXhPZignamF2YXNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIHZhciBvdXQgPSAnPGltZyBzcmM9XCInICsgaHJlZiArICdcIiBhbHQ9XCInICsgdGV4dCArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gdGhpcy5vcHRpb25zLnhodG1sID8gJy8+JyA6ICc+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG5cbmZ1bmN0aW9uIFBhcnNlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW4gPSBudWxsO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xufVxuXG4vKipcbiAqIFN0YXRpYyBQYXJzZSBNZXRob2RcbiAqL1xuXG5QYXJzZXIucGFyc2UgPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMsIHJlbmRlcmVyKSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMsIHJlbmRlcmVyKTtcbiAgcmV0dXJuIHBhcnNlci5wYXJzZShzcmMpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMb29wXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHNyYykge1xuICB0aGlzLmlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihzcmMubGlua3MsIHRoaXMub3B0aW9ucywgdGhpcy5yZW5kZXJlcik7XG4gIHRoaXMudG9rZW5zID0gc3JjLnJldmVyc2UoKTtcblxuICB2YXIgb3V0ID0gJyc7XG4gIHdoaWxlICh0aGlzLm5leHQoKSkge1xuICAgIG91dCArPSB0aGlzLnRvaygpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbiA9IHRoaXMudG9rZW5zLnBvcCgpO1xufTtcblxuLyoqXG4gKiBQcmV2aWV3IE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aCAtIDFdIHx8IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlIFRleHQgVG9rZW5zXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHkgPSB0aGlzLnRva2VuLnRleHQ7XG5cbiAgd2hpbGUgKHRoaXMucGVlaygpLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGJvZHkgKz0gJ1xcbicgKyB0aGlzLm5leHQoKS50ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuaW5saW5lLm91dHB1dChib2R5KTtcbn07XG5cbi8qKlxuICogUGFyc2UgQ3VycmVudCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUudG9rID0gZnVuY3Rpb24oKSB7XG4gIHN3aXRjaCAodGhpcy50b2tlbi50eXBlKSB7XG4gICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNhc2UgJ2hyJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICB9XG4gICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpLFxuICAgICAgICB0aGlzLnRva2VuLmRlcHRoLFxuICAgICAgICB0aGlzLnRva2VuLnRleHQpO1xuICAgIH1cbiAgICBjYXNlICdjb2RlJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY29kZSh0aGlzLnRva2VuLnRleHQsXG4gICAgICAgIHRoaXMudG9rZW4ubGFuZyxcbiAgICAgICAgdGhpcy50b2tlbi5lc2NhcGVkKTtcbiAgICB9XG4gICAgY2FzZSAndGFibGUnOiB7XG4gICAgICB2YXIgaGVhZGVyID0gJydcbiAgICAgICAgLCBib2R5ID0gJydcbiAgICAgICAgLCBpXG4gICAgICAgICwgcm93XG4gICAgICAgICwgY2VsbFxuICAgICAgICAsIGZsYWdzXG4gICAgICAgICwgajtcblxuICAgICAgLy8gaGVhZGVyXG4gICAgICBjZWxsID0gJyc7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmxhZ3MgPSB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfTtcbiAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi5oZWFkZXJbaV0pLFxuICAgICAgICAgIHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBoZWFkZXIgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm93ID0gdGhpcy50b2tlbi5jZWxsc1tpXTtcblxuICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHJvd1tqXSksXG4gICAgICAgICAgICB7IGhlYWRlcjogZmFsc2UsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2pdIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnYmxvY2txdW90ZV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnYmxvY2txdW90ZV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJydcbiAgICAgICAgLCBvcmRlcmVkID0gdGhpcy50b2tlbi5vcmRlcmVkO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3QoYm9keSwgb3JkZXJlZCk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3RfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRva2VuLnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgID8gdGhpcy5wYXJzZVRleHQoKVxuICAgICAgICAgIDogdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xvb3NlX2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2h0bWwnOiB7XG4gICAgICB2YXIgaHRtbCA9ICF0aGlzLnRva2VuLnByZSAmJiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgID8gdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dClcbiAgICAgICAgOiB0aGlzLnRva2VuLnRleHQ7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5odG1sKGh0bWwpO1xuICAgIH1cbiAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VUZXh0KCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGh0bWwsIGVuY29kZSkge1xuICByZXR1cm4gaHRtbFxuICAgIC5yZXBsYWNlKCFlbmNvZGUgPyAvJig/ISM/XFx3KzspL2cgOiAvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZShodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLyYoWyNcXHddKyk7L2csIGZ1bmN0aW9uKF8sIG4pIHtcbiAgICBuID0gbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuID09PSAnY29sb24nKSByZXR1cm4gJzonO1xuICAgIGlmIChuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gbi5jaGFyQXQoMSkgPT09ICd4J1xuICAgICAgICA/IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobi5zdWJzdHJpbmcoMiksIDE2KSlcbiAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKCtuLnN1YnN0cmluZygxKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZihuYW1lLCB2YWwpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIHZhbCA9IHZhbC5zb3VyY2UgfHwgdmFsO1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC8oXnxbXlxcW10pXFxeL2csICckMScpO1xuICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbm5vb3AuZXhlYyA9IG5vb3A7XG5cbmZ1bmN0aW9uIG1lcmdlKG9iaikge1xuICB2YXIgaSA9IDFcbiAgICAsIHRhcmdldFxuICAgICwga2V5O1xuXG4gIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAoa2V5IGluIHRhcmdldCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5cbi8qKlxuICogTWFya2VkXG4gKi9cblxuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgfHwgdHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0O1xuICAgICAgb3B0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQgfHwge30pO1xuXG4gICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHRcbiAgICAgICwgdG9rZW5zXG4gICAgICAsIHBlbmRpbmdcbiAgICAgICwgaSA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgdG9rZW5zID0gTGV4ZXIubGV4KHNyYywgb3B0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG5cbiAgICBwZW5kaW5nID0gdG9rZW5zLmxlbmd0aDtcblxuICAgIHZhciBkb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb3V0LCBlcnI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG91dCA9IFBhcnNlci5wYXJzZSh0b2tlbnMsIG9wdCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGVyciA9IGU7XG4gICAgICB9XG5cbiAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG5cbiAgICAgIHJldHVybiBlcnJcbiAgICAgICAgPyBjYWxsYmFjayhlcnIpXG4gICAgICAgIDogY2FsbGJhY2sobnVsbCwgb3V0KTtcbiAgICB9O1xuXG4gICAgaWYgKCFoaWdobGlnaHQgfHwgaGlnaGxpZ2h0Lmxlbmd0aCA8IDMpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlIG9wdC5oaWdobGlnaHQ7XG5cbiAgICBpZiAoIXBlbmRpbmcpIHJldHVybiBkb25lKCk7XG5cbiAgICBmb3IgKDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAnY29kZScpIHtcbiAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlnaGxpZ2h0KHRva2VuLnRleHQsIHRva2VuLmxhbmcsIGZ1bmN0aW9uKGVyciwgY29kZSkge1xuICAgICAgICAgIGlmIChjb2RlID09IG51bGwgfHwgY29kZSA9PT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkodG9rZW5zW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0KSBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICAgIHJldHVybiBQYXJzZXIucGFyc2UoTGV4ZXIubGV4KHNyYywgb3B0KSwgb3B0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUubWVzc2FnZSArPSAnXFxuUGxlYXNlIHJlcG9ydCB0aGlzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC4nO1xuICAgIGlmICgob3B0IHx8IG1hcmtlZC5kZWZhdWx0cykuc2lsZW50KSB7XG4gICAgICByZXR1cm4gJzxwPkFuIGVycm9yIG9jY3VyZWQ6PC9wPjxwcmU+J1xuICAgICAgICArIGVzY2FwZShlLm1lc3NhZ2UgKyAnJywgdHJ1ZSlcbiAgICAgICAgKyAnPC9wcmU+JztcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnNcbiAqL1xuXG5tYXJrZWQub3B0aW9ucyA9XG5tYXJrZWQuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdCkge1xuICBtZXJnZShtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xuXG5tYXJrZWQuZGVmYXVsdHMgPSB7XG4gIGdmbTogdHJ1ZSxcbiAgdGFibGVzOiB0cnVlLFxuICBicmVha3M6IGZhbHNlLFxuICBwZWRhbnRpYzogZmFsc2UsXG4gIHNhbml0aXplOiBmYWxzZSxcbiAgc21hcnRMaXN0czogZmFsc2UsXG4gIHNpbGVudDogZmFsc2UsXG4gIGhpZ2hsaWdodDogbnVsbCxcbiAgbGFuZ1ByZWZpeDogJ2xhbmctJyxcbiAgc21hcnR5cGFudHM6IGZhbHNlLFxuICBoZWFkZXJQcmVmaXg6ICcnLFxuICByZW5kZXJlcjogbmV3IFJlbmRlcmVyLFxuICB4aHRtbDogZmFsc2Vcbn07XG5cbi8qKlxuICogRXhwb3NlXG4gKi9cblxubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5cbm1hcmtlZC5SZW5kZXJlciA9IFJlbmRlcmVyO1xuXG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcblxubWFya2VkLklubGluZUxleGVyID0gSW5saW5lTGV4ZXI7XG5tYXJrZWQuaW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlci5vdXRwdXQ7XG5cbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcblxuaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IG1hcmtlZDtcbn0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIG1hcmtlZDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLm1hcmtlZCA9IG1hcmtlZDtcbn1cblxufSkuY2FsbChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XG5cbmNvbnN0IEVWRU5UX0tFWVVQID0gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGRvY3VtZW50LCAna2V5dXAnKTtcbmNvbnN0IEVWRU5UX0tFWURPV04gPSBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZG9jdW1lbnQsICdrZXlkb3duJyk7XG5cbi8qKlxuICogY3JlYXRlIEV2ZW50U3RyZWFtIGZyb20gdXNlciBpbnB1dFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGNoYXJLZXlcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAga2V5KGNoYXJLZXkpIHtcbiAgICBsZXQga2V5Q29kZSA9IHR5cGVvZihjaGFyS2V5KSA9PT0gJ3N0cmluZycgPyBrZXljb2RlKGNoYXJLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY2hhcktleTtcbiAgICByZXR1cm4gRVZFTlRfS0VZVVAuZmlsdGVyKGtleUNvZGVJcyhrZXlDb2RlKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gY2hhcktleVxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBrZXlkb3duKGNoYXJLZXkpIHtcbiAgICBsZXQga2V5Q29kZSA9IHR5cGVvZihjaGFyS2V5KSA9PT0gJ3N0cmluZycgPyBrZXljb2RlKGNoYXJLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogY2hhcktleTtcbiAgICByZXR1cm4gRVZFTlRfS0VZRE9XTi5maWx0ZXIoa2V5Q29kZUlzKGtleUNvZGUpKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBjbGljayhlbCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICdjbGljaycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtlbCA9IGRvY3VtZW50LmJvZHldXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIG1vdXNlbW92ZShlbCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGVsLCAnbW91c2Vtb3ZlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHJlc2l6ZSgpIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KHdpbmRvdywgJ3Jlc2l6ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBoYXNoY2hhbmdlKCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQod2luZG93LCAnaGFzaGNoYW5nZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBrZXlDb2RlXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGtleUNvZGVJcyhrZXlDb2RlKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHJldHVybiBldmVudC5rZXlDb2RlID09PSBrZXlDb2RlO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gICBmcm9tICdiYWNvbmpzJztcbmltcG9ydCBjb250cm9sIGZyb20gJy4vY29udHJvbCc7XG5cbi8qKlxuICogZnVsbCBzY3JlZW5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgbGV0IGJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgYnVzLm9uVmFsdWUodG9nZ2xlU2NyZWVuT2YodGFyZ2V0KSk7XG4gIHJldHVybiBidXM7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNjcmVlbk9mKGVsKSB7XG4gIGxldCByZXF1ZXN0LCBleGl0O1xuXG4gIGlmKGVsLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH0gZWxzZSBpZihlbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYoZWwubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ21velJlcXVlc3RGdWxsU2NyZWVuJztcbiAgfSBlbHNlIGlmKGVsLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ21zUmVxdWVzdEZ1bGxzY3JlZW4nO1xuICB9XG5cbiAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ2V4aXRGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZXhpdCA9ICd3ZWJraXRFeGl0RnVsbHNjcmVlbic7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZXhpdCA9ICdtb3pDYW5jZWxGdWxsU2NyZWVuJztcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ21zRXhpdEZ1bGxzY3JlZW4nO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCkge1xuICAgICAgZWxbcmVxdWVzdF0oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnRbZXhpdF0oKTtcbiAgICB9XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogaWYgdXNpbmcgYSBmZWF0dXJlIHRoYXQgcmVxdWlyZXMgYSBicm93c2VyLXBvbHlmaWxsXG4gKlxuICogQHNlZSBodHRwczovLzZ0bzUub3JnL3BvbHlmaWxsLmh0bWxcbiAqL1xuaW1wb3J0IHBvbHlmaWxsIGZyb20gJzZ0bzUvYnJvd3Nlci1wb2x5ZmlsbCc7XG5cbi8qKlxuICogVGFsa2llLmpzXG4gKi9cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuXG5pbXBvcnQgdXRpbCAgICBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGNvbnRyb2wgZnJvbSAnLi9jb250cm9sJztcbmltcG9ydCBxdWVyeSAgIGZyb20gJy4vcXVlcnknO1xuXG5pbXBvcnQgTWFya2Rvd24gICBmcm9tICcuL21hcmtkb3duJztcbmltcG9ydCBQYWdpbmcgICAgIGZyb20gJy4vcGFnaW5nJztcbmltcG9ydCBGdWxsU2NyZWVuIGZyb20gJy4vZnVsbHNjcmVlbic7XG5pbXBvcnQgUmVzcG9uc2l2ZSBmcm9tICcuL3Jlc3BvbnNpdmUnO1xuXG5jb25zdCBJREVOVF9ORVhUICAgICA9ICduZXh0JztcbmNvbnN0IElERU5UX1BSRVYgICAgID0gJ3ByZXYnO1xuY29uc3QgSURFTlRfU0NBTEVSICAgPSAnc2NhbGVyJztcbmNvbnN0IElERU5UX0NPTlRST0wgID0gJ2NvbnRyb2wnO1xuY29uc3QgSURFTlRfUEFHRSAgICAgPSAncGFnZSc7XG5jb25zdCBJREVOVF9UT1RBTCAgICA9ICd0b3RhbCc7XG5jb25zdCBJREVOVF9QUk9HUkVTUyA9ICdwcm9ncmVzcyc7XG5jb25zdCBJREVOVF9QT0lOVEVSICA9ICdwb2ludGVyJztcbmNvbnN0IElERU5UX0JBQ0tGQUNFID0gJ2JhY2tmYWNlJztcbmNvbnN0IE1JTUVfTUFSS0RPV04gID0gJ3RleHQveC1tYXJrZG93bic7XG5jb25zdCBBVFRSX0xBWU9VVCAgICA9ICdsYXlvdXQnO1xuY29uc3QgQVRUUl9CT0RZX0JHICAgPSAnYm9keS1iZyc7XG5jb25zdCBBVFRSX0JBQ0tGQUNFICA9ICdiYWNrZmFjZSc7XG5jb25zdCBBVFRSX0ZJTFRFUiAgICA9ICdiYWNrZmFjZS1maWx0ZXInO1xuXG5jb25zdCBOT1JNQUxfV0lEVEggID0gMTAyNDtcbmNvbnN0IE5PUk1BTF9IRUlHSFQgPSA3Njg7XG5jb25zdCBXSURFX1dJRFRIICAgID0gMTM2NjtcbmNvbnN0IFdJREVfSEVJR0hUICAgPSA3Njg7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFsa2llT3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBbYXBpXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbd2lkZV1cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnRyb2xdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtwb2ludGVyXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbcHJvZ3Jlc3NdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtiYWNrZmFjZV1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcbiAgaWYgKG9wdGlvbnMuYXBpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1haW4gICAgICAgOiBtYWluLFxuICAgICAgdXRpbCAgICAgICA6IHV0aWwsXG4gICAgICBjb250cm9sICAgIDogY29udHJvbCxcbiAgICAgIHF1ZXJ5ICAgICAgOiBxdWVyeSxcbiAgICAgIG1hcmtkb3duICAgOiBNYXJrZG93bixcbiAgICAgIHBhZ2luZyAgICAgOiBQYWdpbmcsXG4gICAgICBmdWxsU2NyZWVuIDogRnVsbFNjcmVlbixcbiAgICAgIHJlc3BvbnNpdmUgOiBSZXNwb25zaXZlLFxuICAgICAgQmFjb24gICAgICA6IEJhY29uXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFpbihvcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gX29wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbWFpbihfb3B0aW9ucyA9IHt9KSB7XG5cbiAgLyoqXG4gICAqIGFwcGx5IGRlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7KnxPYmplY3R9XG4gICAqL1xuICBsZXQgb3B0aW9ucyA9IHV0aWwuZGVmYXVsdHMoX29wdGlvbnMsIHtcbiAgICBhcGkgICAgICA6IGZhbHNlLFxuICAgIHdpZGUgICAgIDogdHJ1ZSxcbiAgICBjb250cm9sICA6IHRydWUsXG4gICAgcG9pbnRlciAgOiB0cnVlLFxuICAgIHByb2dyZXNzIDogdHJ1ZSxcbiAgICBiYWNrZmFjZSA6IHRydWVcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEluaXQgc2xpZGUgc2l6ZXNcbiAgICovXG4gIGxldCB3aWR0aCAgPSBvcHRpb25zLndpZGUgPyBXSURFX1dJRFRIICA6IE5PUk1BTF9XSURUSDtcbiAgbGV0IGhlaWdodCA9IG9wdGlvbnMud2lkZSA/IFdJREVfSEVJR0hUIDogTk9STUFMX0hFSUdIVDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgIDxzdHlsZT5cbiAgICAgICMke0lERU5UX1NDQUxFUn0sXG4gICAgICBbbGF5b3V0XSB7XG4gICAgICAgIHdpZHRoOiAke3dpZHRofXB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogJHtoZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmBcbiAgKTtcblxuICAvKipcbiAgICogSW5pdCBzbGlkZSBzZWN0aW9uc1xuICAgKi9cbiAgdXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt0eXBlPVwiJHtNSU1FX01BUktET1dOfVwiXWApKS5mb3JFYWNoKE1hcmtkb3duKTtcbiAgbGV0IHNsaWRlcyA9IHV0aWwudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtBVFRSX0xBWU9VVH1dYCkpO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zaXZlIHNjYWxpbmdcbiAgICovXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgPGRpdiBpZD1cIiR7SURFTlRfU0NBTEVSfVwiPjwvZGl2PlxuICBgKTtcbiAgbGV0IHNjYWxlckVsID0gdXRpbC5nZXRCeUlkKElERU5UX1NDQUxFUik7XG4gIHNsaWRlcy5mb3JFYWNoKChlbCkgPT4gc2NhbGVyRWwuYXBwZW5kQ2hpbGQoZWwpKTtcblxuICBsZXQgcmF0aW8gPSBSZXNwb25zaXZlKHtcbiAgICB3aWR0aCAgOiB3aWR0aCxcbiAgICBoZWlnaHQgOiBoZWlnaHQsXG4gICAgdGFyZ2V0IDogc2NhbGVyRWxcbiAgfSk7XG4gIHJhdGlvLnBsdWcoY29udHJvbC5yZXNpemUoKSk7XG5cbiAgLyoqXG4gICAqIFBhZ2luZyBjb250cm9sXG4gICAqL1xuICBsZXQgcGFnaW5nID0gUGFnaW5nKHtcbiAgICBzdGFydFBhZ2UgICAgIDogdXRpbC5nZXRQYWdlTnVtYmVyRnJvbUhhc2goKSB8fCAxLFxuICAgIGVuZFBhZ2UgICAgICAgOiBzbGlkZXMubGVuZ3RoLFxuICAgIHNsaWRlRWxlbWVudHMgOiBzbGlkZXNcbiAgfSk7XG5cbiAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmtleWRvd24oJ3JpZ2h0JykudGhyb3R0bGUoNTApKTtcbiAgcGFnaW5nLnByZXZCdXMucGx1Zyhjb250cm9sLmtleWRvd24oJ2xlZnQnKS50aHJvdHRsZSg1MCkpO1xuXG4gIC8vIHN5bmMgbG9jYXRpb24uaGFzaFxuICBwYWdpbmcubW92ZUJ1cy5wbHVnKGNvbnRyb2wuaGFzaGNoYW5nZSgpLm1hcCh1dGlsLmdldFBhZ2VOdW1iZXJGcm9tSGFzaCkpO1xuICBwYWdpbmcuY3VycmVudEVzLm9uVmFsdWUoKHBhZ2UpID0+IGxvY2F0aW9uLmhhc2ggPSBwYWdlKTtcblxuICAvLyBzeW5jIGJvZHkgYmFja2dyb3VuZCBhdHRyaWJ1dGVcbiAgcGFnaW5nLmNoYW5nZWRFc1xuICAgIC5tYXAoJy5nZXRBdHRyaWJ1dGUnLCBBVFRSX0xBWU9VVClcbiAgICAub25WYWx1ZSh1dGlsLmF0dHJpYnV0ZUFzc2lnbk9mKGRvY3VtZW50LmJvZHksIEFUVFJfQk9EWV9CRykpO1xuXG4gIC8qKlxuICAgKiBJbnNlcnQgVWkgRWxlbWVudHNcbiAgICovXG4gIC8vIFRPRE8gc3BsaXQgdG8gbW9kdWxlICYgYWRkIHRlc3RzXG4gIGlmIChvcHRpb25zLnBvaW50ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX1BPSU5URVJ9XCI+PC9kaXY+YCk7XG4gICAgbGV0IHggPSBuZXcgQmFjb24uQnVzKCk7XG4gICAgbGV0IHkgPSBuZXcgQmFjb24uQnVzKCk7XG4gICAgbGV0IG1vdmVFcyA9IGNvbnRyb2wubW91c2Vtb3ZlKCk7XG4gICAgbGV0IHBvaW50ZXJFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9QT0lOVEVSKTtcbiAgICB4LnBsdWcobW92ZUVzKTtcbiAgICB5LnBsdWcobW92ZUVzKTtcblxuICAgIHgubWFwKChlKSA9PiBlLngpLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKHBvaW50ZXJFbCwgJ2xlZnQnKSk7XG4gICAgeC5tYXAoKGUpID0+IGUueSkub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YocG9pbnRlckVsLCAndG9wJykpO1xuXG4gICAgbGV0IGFzc2lnblBvaW50ZXJWaXNpYmlsaXR5ID0gdXRpbC5zdHlsZUFzc2lnbk9mKHBvaW50ZXJFbCwgJ3Zpc2liaWxpdHknKTtcbiAgICBjb250cm9sLmtleWRvd24oJ2InKVxuICAgICAgLm1hcCgndmlzaWJsZScpXG4gICAgICAub25WYWx1ZShhc3NpZ25Qb2ludGVyVmlzaWJpbGl0eSk7XG4gICAgY29udHJvbC5rZXkoJ2InKVxuICAgICAgLm1hcCgnaGlkZGVuJylcbiAgICAgIC5vblZhbHVlKGFzc2lnblBvaW50ZXJWaXNpYmlsaXR5KTtcbiAgfVxuXG4gIC8vIFRPRE8gc3BsaXQgdG8gbW9kdWxlICYgYWRkIHRlc3RcbiAgaWYgKG9wdGlvbnMuYmFja2ZhY2UpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX0JBQ0tGQUNFfVwiPjwvZGl2PmApO1xuICAgIGxldCBiYWNrZmFjZUVsID0gdXRpbC5nZXRCeUlkKElERU5UX0JBQ0tGQUNFKTtcblxuICAgIGxldCBiZ0ltYWdlQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICAgIGxldCBiZ0ZpbHRlckJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuICAgIGJnSW1hZ2VCdXMucGx1ZyhwYWdpbmcuY2hhbmdlZEVzKTtcbiAgICBiZ0ZpbHRlckJ1cy5wbHVnKHBhZ2luZy5jaGFuZ2VkRXMpO1xuXG4gICAgLy8gYmFja2ZhY2UgaW1hZ2VcbiAgICBiZ0ltYWdlQnVzXG4gICAgICAubWFwKCcuZ2V0QXR0cmlidXRlJywgQVRUUl9CQUNLRkFDRSlcbiAgICAgIC5tYXAoKHNyYykgPT4gc3JjID8gYHVybChcIiR7c3JjfVwiKWAgOiAnJylcbiAgICAgIC5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZihiYWNrZmFjZUVsLCAnYmFja2dyb3VuZC1pbWFnZScpKTtcblxuICAgIC8vIGJhY2tmYWNlIGltYWdlIGNzcyBmaWx0ZXJcbiAgICBiZ0ZpbHRlckJ1c1xuICAgICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfRklMVEVSKVxuICAgICAgLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKGJhY2tmYWNlRWwsIHV0aWwuc3R5bGVQcmVmaXhEZXRlY3QoJ2ZpbHRlcicpKSk7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgQmFjb24uZnJvbUFycmF5KHNsaWRlcylcbiAgICAgIC5tYXAoJy5nZXRBdHRyaWJ1dGUnLCBBVFRSX0JBQ0tGQUNFKVxuICAgICAgLmZpbHRlcigodikgPT4gISF2KVxuICAgICAgLm9uVmFsdWUodXRpbC5wcmVsb2FkSW1nKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNvbnRyb2wpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgPGRpdiBpZD1cIiR7SURFTlRfQ09OVFJPTH1cIj5cbiAgICAgICAgPHA+PHNwYW4gaWQ9XCIke0lERU5UX1BSRVZ9XCI+Jmx0Ozwvc3Bhbj5cbiAgICAgICAgUGFnZSA8c3BhbiBpZD1cIiR7SURFTlRfUEFHRX1cIj4wPC9zcGFuPiBvZiA8c3BhbiBpZD1cIiR7SURFTlRfVE9UQUx9XCI+MDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCIke0lERU5UX05FWFR9XCI+Jmd0Ozwvc3Bhbj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICBgKTtcblxuICAgIGxldCBuZXh0RWwgPSB1dGlsLmdldEJ5SWQoSURFTlRfTkVYVCk7XG4gICAgbGV0IHByZXZFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9QUkVWKTtcblxuICAgIC8vIG5leHQgYnV0dG9uXG4gICAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmNsaWNrKG5leHRFbCkpO1xuXG4gICAgLy8gcHJldiBidXR0b25cbiAgICBwYWdpbmcucHJldkJ1cy5wbHVnKGNvbnRyb2wuY2xpY2socHJldkVsKSk7XG5cbiAgICAvLyBjdXJyZW50IHBhZ2VcbiAgICBwYWdpbmcuY3VycmVudEVzLm9uVmFsdWUodXRpbC50ZXh0QXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1BBR0UpKSk7XG5cbiAgICAvLyB0b3RhbCBvZiBwYWdlXG4gICAgQmFjb24ub25jZShzbGlkZXMubGVuZ3RoKS5vblZhbHVlKHV0aWwudGV4dEFzc2lnbk9mKHV0aWwuZ2V0QnlJZChJREVOVF9UT1RBTCkpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGlkPVwiJHtJREVOVF9QUk9HUkVTU31cIj48L2Rpdj5gKTtcblxuICAgIC8vIHByb2dyZXNzIGJhclxuICAgIHBhZ2luZy5wZXJjZW50RXMub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1BST0dSRVNTKSwgJ3dpZHRoJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bGxTY3JlZW5cbiAgICovXG4gIEZ1bGxTY3JlZW4oZG9jdW1lbnQuYm9keSkucGx1Zyhjb250cm9sLmtleSgnZicpKTtcblxuICAvKipcbiAgICogZXhwb3J0IHNvbWUgb2YgY29udHJvbFxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBUYWxraWVFeHBvcnRcbiAgICogQHBhcmFtIHtPYmplY3QuPEZ1bmN0aW9uPn0gY29udHJvbFxuICAgKiBAcGFyYW0ge0JhY29uLkV2ZW50U3RyZWFtfSBjaGFuZ2VkXG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBuZXh0XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBwcmV2XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBqdW1wXG4gICAqL1xuICByZXR1cm4ge1xuICAgIEJhY29uICAgOiBCYWNvbixcbiAgICBjb250cm9sIDogY29udHJvbCxcbiAgICBjaGFuZ2VkIDogcGFnaW5nLmNoYW5nZWRFcyxcbiAgICBuZXh0ICAgIDogcGFnaW5nLm5leHRCdXMsXG4gICAgcHJldiAgICA6IHBhZ2luZy5wcmV2QnVzLFxuICAgIGp1bXAgICAgOiBwYWdpbmcubW92ZUJ1c1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IG1hcmtlZCBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IHV0aWwgICBmcm9tICcuL3V0aWwnO1xuXG5tYXJrZWQuc2V0T3B0aW9ucyh7XG4gIGxhbmdQcmVmaXg6ICdobGpzICcsXG4gIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICBpZiAod2luZG93LmhsanMgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpZ2hsaWdodC5qcyAoYHdpbmRvdy5obGpzYCkgaXMgbWlzc2luZycpO1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIHJldHVybiB3aW5kb3cuaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlO1xuICB9XG59KTtcblxuLyoqXG4gKiBjb21waWxlIG1hcmtkb3duXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgZGVmYXVsdCBjb21waWxlTWFya2Rvd247XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGVNYXJrZG93bihlbCkge1xuICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgc2VjdGlvbi5pbm5lckhUTUwgPSBtYXJrZWQoZWwuaW5uZXJIVE1MKTtcbiAgdXRpbC50b0FycmF5KGVsLmF0dHJpYnV0ZXMpLmZpbHRlcihub3RUeXBlQXR0cmlidXRlKS5mb3JFYWNoKGNvcHlBdHRyaWJ1dGVUbyhzZWN0aW9uKSk7XG4gIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHNlY3Rpb24sIGVsKTtcbiAgcmV0dXJuIHNlY3Rpb247XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjb3B5QXR0cmlidXRlVG8oZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0F0dHJpYnV0ZU5vZGV9IGF0dHJcbiAqL1xuZnVuY3Rpb24gbm90VHlwZUF0dHJpYnV0ZShhdHRyKSB7XG4gIHJldHVybiBhdHRyLm5hbWUgIT09ICd0eXBlJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgY29udHJvbCBmcm9tICcuL2NvbnRyb2wnO1xuaW1wb3J0IHV0aWwgICAgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYWdpbmdPcHRpb25zXG4gKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRQYWdlXG4gKiBAcHJvcGVydHkge051bWJlcn0gZW5kUGFnZVxuICogQHByb3BlcnR5IHtBcnJheTxFbGVtZW50Pn0gc2xpZGVFbGVtZW50c1xuICovXG5cbi8qKlxuICogcGFnaW5nIGNvbnRyb2xcbiAqXG4gKiBAcGFyYW0ge1BhZ2luZ09wdGlvbnN9IG9wdGlvbnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gIGxldCBuZXh0QnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgcHJldkJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgbGV0IG1vdmVCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgbGV0IGN1cnJlbnRCdXMgID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgY3VycmVudFBhZ2UgPSBjdXJyZW50QnVzXG4gICAgLm1hcChpblJhbmdlT2YoMSwgb3B0aW9ucy5lbmRQYWdlKSlcbiAgICAudG9Qcm9wZXJ0eShvcHRpb25zLnN0YXJ0UGFnZSB8fCAxKVxuICAgIC5za2lwRHVwbGljYXRlcygpO1xuXG4gIGxldCBuZXh0RXMgPSBjdXJyZW50UGFnZS5zYW1wbGVkQnkobmV4dEJ1cykubWFwKCh2KSA9PiB2ICsgMSk7XG4gIGxldCBwcmV2RXMgPSBjdXJyZW50UGFnZS5zYW1wbGVkQnkocHJldkJ1cykubWFwKCh2KSA9PiB2IC0gMSk7XG4gIGxldCBtb3ZlRXMgPSBtb3ZlQnVzLm1hcCgodikgPT4gdiAvKm5vb3AqLyk7XG5cbiAgbGV0IHBlcmNlbnRTdHJpbmcgPSBjdXJyZW50UGFnZS5tYXAocGVyY2VudE9mKG9wdGlvbnMuZW5kUGFnZSkpO1xuICBsZXQgY3VycmVudFNsaWRlICA9IGN1cnJlbnRQYWdlLm1hcCgoaSkgPT4gb3B0aW9ucy5zbGlkZUVsZW1lbnRzW2kgLSAxXSk7XG5cbiAgY3VycmVudEJ1cy5wbHVnKG5leHRFcy5tZXJnZShwcmV2RXMpLm1lcmdlKG1vdmVFcykpO1xuXG4gIGN1cnJlbnRTbGlkZS5vblZhbHVlKGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICBvcHRpb25zLnNsaWRlRWxlbWVudHMuZm9yRWFjaCh0b0ludmlzaWJsZSk7XG4gICAgY3VycmVudCAmJiB0b1Zpc2libGUoY3VycmVudCk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgY3VycmVudEVzIDogY3VycmVudFBhZ2UsXG4gICAgc3RhcnRFcyAgIDogY3VycmVudFBhZ2UuZmlsdGVyKCh2KSA9PiB2ID09PSAxKSxcbiAgICBlbmRFcyAgICAgOiBjdXJyZW50UGFnZS5maWx0ZXIoKHYpID0+IHYgPT09IG9wdGlvbnMuZW5kUGFnZSksXG4gICAgY2hhbmdlZEVzIDogY3VycmVudFNsaWRlLFxuICAgIHBlcmNlbnRFcyA6IHBlcmNlbnRTdHJpbmcsXG4gICAgbmV4dEJ1cyAgIDogbmV4dEJ1cyxcbiAgICBwcmV2QnVzICAgOiBwcmV2QnVzLFxuICAgIG1vdmVCdXMgICA6IG1vdmVCdXNcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKi9cbmZ1bmN0aW9uIHRvSW52aXNpYmxlKGVsKSB7XG4gIGVsLnJlbW92ZUF0dHJpYnV0ZSgndmlzaWJsZScpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqL1xuZnVuY3Rpb24gdG9WaXNpYmxlKGVsKSB7XG4gIGVsLnNldEF0dHJpYnV0ZSgndmlzaWJsZScsIDEpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBtaW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gaW5SYW5nZU9mKG1pbiwgbWF4KSB7XG4gIHJldHVybiBmdW5jdGlvbih6KSB7XG4gICAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgoeiwgbWluKSk7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBwZXJjZW50T2YobWF4KSB7XG4gIHJldHVybiBmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgcmV0dXJuICgoMTAwIC8gbWF4KSAqIGN1cnJlbnQpICsgJyUnO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIHF1ZXJ5IHBhcmFtZXRlcnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgcGFyc2VRdWVyeTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnlcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlUXVlcnkocXVlcnkpIHtcbiAgbGV0IHJldCA9ICB7fTtcbiAgcXVlcnlcbiAgICAuc2xpY2UoMSwgLTEpXG4gICAgLnNwbGl0KCcmJylcbiAgICAubWFwKChrZXlFcVZhbCkgPT4ga2V5RXFWYWwuc3BsaXQoJz0nKSlcbiAgICAuZm9yRWFjaCgoa3YpID0+IHJldFtrdlswXV0gPSBrdlsxXSk7XG4gIHJldHVybiByZXQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiBmcm9tICdiYWNvbmpzJztcbmltcG9ydCB1dGlsICBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJhdGlvT3B0aW9uc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gKiBAcHJvcGVydHkge0VsZW1lbnR9IHRhcmdldFxuICovXG5cbi8qKlxuICogY29tcHV0ZSByYXRpb1xuICpcbiAqIEBwYXJhbSB7UmF0aW9PcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMgPSB7fSkge1xuXG4gIGxldCBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgbGV0IGhSYXRpb0ZuID0gaG9yaXpvbnRhbFJhdGlvT2Yob3B0aW9ucy53aWR0aCk7XG4gIGxldCB2UmF0aW9GbiA9IHZlcnRpY2FsUmF0aW9PZihvcHRpb25zLmhlaWdodCk7XG5cbiAgbGV0IGhSYXRpbyA9IGJ1cy5tYXAoaFJhdGlvRm4pLnRvUHJvcGVydHkoaFJhdGlvRm4oKSk7XG4gIGxldCB2UmF0aW8gPSBidXMubWFwKHZSYXRpb0ZuKS50b1Byb3BlcnR5KHZSYXRpb0ZuKCkpO1xuXG4gIGxldCBzY2FsZSA9IHV0aWwuY29tcG9zZShjZW50ZXJpbmdPZihvcHRpb25zLnRhcmdldCksIHNjYWxpbmdPZihvcHRpb25zLnRhcmdldCkpO1xuXG4gIEJhY29uLmNvbWJpbmVXaXRoKE1hdGgubWluLCBoUmF0aW8sIHZSYXRpbykub25WYWx1ZShzY2FsZSk7XG5cbiAgcmV0dXJuIGJ1cztcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gaG9yaXpvbnRhbFJhdGlvT2Yod2lkdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpZHRoO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdmVydGljYWxSYXRpb09mKGhlaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCAvIGhlaWdodDtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNjYWxpbmdPZihlbCkge1xuICBsZXQgdHJhbnNmb3JtID0gdXRpbC5zdHlsZVByZWZpeERldGVjdCgndHJhbnNmb3JtJyk7XG4gIHJldHVybiBmdW5jdGlvbihyYXRpbykge1xuICAgIGVsLnN0eWxlW3RyYW5zZm9ybV0gPSBgc2NhbGUoJHtNYXRoLmFicyhyYXRpbyl9KWA7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjZW50ZXJpbmdPZihlbCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBlbC5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoICAtIHJlY3Qud2lkdGgpIC8gMjtcbiAgICBlbC5zdHlsZS50b3AgID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDI7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3RcbiAgICogQHJldHVybnMge0FycmF5LjxUPn1cbiAgICovXG4gIHRvQXJyYXkobGlzdCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0KTtcbiAgfSxcblxuICAvKipcbiAgICogVE9ETyB0ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0c1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgZGVmYXVsdHMob3JpZywgZGVmcykge1xuICAgIGxldCByZXQgPSB0aGlzLmNsb25lKG9yaWcpO1xuICAgIE9iamVjdC5rZXlzKGRlZnMpLmZvckVhY2goKGspPT4ge1xuICAgICAgaWYgKGsgaW4gcmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldFtrXSA9IGRlZnNba107XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvKipcbiAgICogVE9ETyB0ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBjbG9uZShvcmlnKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9yaWcpLmZvckVhY2goKGspPT4gcmV0W2tdID0gb3JpZ1trXSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4uLi5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgKi9cbiAgY29tcG9zZSgpIHtcbiAgICAvLyBodHRwOi8vdW5kZXJzY29yZWpzLm9yZy8jY29tcG9zZVxuICAgIGxldCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGxldCBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBsZXQgaSA9IHN0YXJ0O1xuICAgICAgbGV0IHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9LFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50XG4gICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cbiAgICovXG4gIGdldEJ5SWQoaWRlbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRlbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqL1xuICB0ZXh0QXNzaWduT2YoZWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odGV4dCkge1xuICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqL1xuICBzdHlsZUFzc2lnbk9mKGVsLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgZWwuc3R5bGVbcHJvcGVydHldID0gdmFsdWUgPT09ICcnID8gbnVsbCA6IHZhbHVlO1xuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJpYnV0ZVxuICAgKi9cbiAgYXR0cmlidXRlQXNzaWduT2YoZWwsIGF0dHJpYnV0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNyY1xuICAgKi9cbiAgcHJlbG9hZEltZyhzcmMpIHtcbiAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1nLm9ubG9hZCA9ICgpPT4gaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGdldFBhZ2VOdW1iZXJGcm9tSGFzaCgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQobG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpLCAxMCkgfHwgMDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBzdHlsZVByZWZpeERldGVjdChwcm9wZXJ0eSkge1xuICAgIGxldCB2YWxpZFByb3BlcnR5O1xuICAgIGxldCBzdHlsZXMgPSB0aGlzLnRvQXJyYXkod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnJykpO1xuICAgIGxldCBpbmNsdWRlcyA9IChuZWVkbGUpID0+IHN0eWxlcy5pbmRleE9mKG5lZWRsZSkgIT09IC0xO1xuXG4gICAgaWYoaW5jbHVkZXMoYC13ZWJraXQtJHtwcm9wZXJ0eX1gKSkge1xuICAgICAgdmFsaWRQcm9wZXJ0eSA9IGAtd2Via2l0LSR7cHJvcGVydHl9YDtcbiAgICB9IGVsc2UgaWYoaW5jbHVkZXMoYC1tb3otJHtwcm9wZXJ0eX1gKSkge1xuICAgICAgdmFsaWRQcm9wZXJ0eSA9IGAtbW96LSR7cHJvcGVydHl9YDtcbiAgICB9IGVsc2UgaWYoaW5jbHVkZXMoYC1tcy0ke3Byb3BlcnR5fWApKSB7XG4gICAgICB2YWxpZFByb3BlcnR5ID0gYC1tcy0ke3Byb3BlcnR5fWA7XG4gICAgfSBlbHNlIGlmKGluY2x1ZGVzKHByb3BlcnR5KSkge1xuICAgICAgdmFsaWRQcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZFByb3BlcnR5O1xuICB9XG59O1xuIl19
