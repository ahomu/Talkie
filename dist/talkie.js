/*! talkie - v0.3.0 */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Talkie=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

  paging.nextBus.plug(control.key("right"));
  paging.nextBus.plug(control.key("s"));
  paging.nextBus.plug(control.key("n"));
  paging.prevBus.plug(control.key("left"));
  paging.prevBus.plug(control.key("a"));
  paging.prevBus.plug(control.key("p"));
  paging.moveBus.plug(control.hashchange().map(util.getPageNumberFromHash));

  // sync location.hash
  paging.currentEs.onValue(function (page) {
    return location.hash = page;
  });

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
    control.keydown("space").map("visible").onValue(assignPointerVisibility);
    control.key("space").map("hidden").onValue(assignPointerVisibility);
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

    // backface image css filter (webkit only)
    bgFilterBus.map(".getAttribute", ATTR_FILTER).onValue(util.styleAssignOf(backfaceEl, "-webkit-filter"));

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

  currentBus.plug(nextEs);
  currentBus.plug(prevEs);
  currentBus.plug(moveEs);

  var percentString = currentPage.map(percentOf(options.endPage));
  var currentSlide = currentPage.map(function (i) {
    return options.slideElements[i - 1];
  });

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
  return function (ratio) {
    el.style.webkitTransform = "scale(" + Math.abs(ratio) + ")";
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
  defaults: function defaults(orig, defaults) {
    var ret = this.clone(orig);
    Object.keys(defaults).forEach(function (k) {
      if (k in ret) {
        return;
      }
      ret[k] = defaults[k];
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
      el.style[property] = value;
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
  }
};

},{}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvNnRvNS9icm93c2VyLXBvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhY29uanMvZGlzdC9CYWNvbi5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9jb250cm9sLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9mdWxsc2NyZWVuLmpzIiwiL1VzZXJzL2F5dW11c2F0by9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9heXVtdXNhdG8vRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvbWFya2Rvd24uanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3BhZ2luZy5qcyIsIi9Vc2Vycy9heXVtdXNhdG8vRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvcXVlcnkuanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3Jlc3BvbnNpdmUuanMiLCIvVXNlcnMvYXl1bXVzYXRvL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsbUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0lDaHZDTyxLQUFLLDJCQUFRLFNBQVM7O0lBQ3RCLE9BQU8sMkJBQU0sU0FBUzs7QUFFN0IsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0QsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7O2lCQUtsRDs7Ozs7QUFLYixLQUFHLEVBQUEsYUFBQyxPQUFPLEVBQUU7QUFDWCxRQUFJLE9BQU8sR0FBRyxPQUFPLE9BQU8sQUFBQyxLQUFLLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sQ0FBQztBQUNyRCxXQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7R0FDL0M7Ozs7OztBQU1ELFNBQU8sRUFBQSxpQkFBQyxPQUFPLEVBQUU7QUFDZixRQUFJLE9BQU8sR0FBRyxPQUFPLE9BQU8sQUFBQyxLQUFLLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sQ0FBQztBQUNyRCxXQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7R0FDakQ7Ozs7OztBQU1ELE9BQUssRUFBQSxlQUFDLEVBQUUsRUFBRTtBQUNSLFdBQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDM0M7Ozs7OztBQU1ELFdBQVMsRUFBQSxxQkFBcUI7UUFBcEIsRUFBRSxnQ0FBRyxRQUFRLENBQUMsSUFBSTtBQUMxQixXQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0dBQy9DOzs7OztBQUtELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDaEQ7Ozs7O0FBS0QsWUFBVSxFQUFBLHNCQUFHO0FBQ1gsV0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztHQUNwRDtDQUNGOzs7Ozs7O0FBTUQsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFO0FBQzFCLFNBQU8sVUFBUyxLQUFLLEVBQUU7QUFDckIsV0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQztHQUNsQyxDQUFDO0NBQ0g7Ozs7Ozs7OztJQ3JFTSxLQUFLLDJCQUFRLFNBQVM7O0lBQ3RCLE9BQU8sMkJBQU0sV0FBVzs7Ozs7Ozs7aUJBUWhCLFVBQVMsTUFBTSxFQUFFO0FBQzlCLE1BQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLEtBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDcEMsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxFQUFFLEVBQUU7QUFDMUIsTUFBSSxPQUFPLFlBQUE7TUFBRSxJQUFJLFlBQUEsQ0FBQzs7QUFFbEIsTUFBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7QUFDdkIsV0FBTyxHQUFHLG1CQUFtQixDQUFDO0dBQy9CLE1BQU0sSUFBRyxFQUFFLENBQUMsdUJBQXVCLEVBQUU7QUFDcEMsV0FBTyxHQUFHLHlCQUF5QixDQUFDO0dBQ3JDLE1BQU0sSUFBRyxFQUFFLENBQUMsb0JBQW9CLEVBQUU7QUFDakMsV0FBTyxHQUFHLHNCQUFzQixDQUFDO0dBQ2xDLE1BQU0sSUFBRyxFQUFFLENBQUMsbUJBQW1CLEVBQUU7QUFDaEMsV0FBTyxHQUFHLHFCQUFxQixDQUFDO0dBQ2pDOztBQUVELE1BQUcsUUFBUSxDQUFDLGNBQWMsRUFBRTtBQUMxQixRQUFJLEdBQUcsZ0JBQWdCLENBQUM7R0FDekIsTUFBTSxJQUFHLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtBQUN2QyxRQUFJLEdBQUcsc0JBQXNCLENBQUM7R0FDL0IsTUFBTSxJQUFHLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtBQUN0QyxRQUFJLEdBQUcscUJBQXFCLENBQUM7R0FDOUIsTUFBTSxJQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuQyxRQUFJLEdBQUcsa0JBQWtCLENBQUM7R0FDM0I7O0FBRUQsU0FBTyxZQUFXO0FBQ2hCLFFBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLElBQzdCLENBQUMsUUFBUSxDQUFDLG9CQUFvQixJQUM5QixDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsSUFDakMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUU7QUFDL0IsUUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7S0FDZixNQUFNO0FBQ0wsY0FBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEI7R0FDRixDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7O0lDM0NNLFFBQVEsMkJBQU0sdUJBQXVCOzs7OztJQUtyQyxLQUFLLDJCQUFRLFNBQVM7O0lBRXRCLElBQUksMkJBQVMsUUFBUTs7SUFDckIsT0FBTywyQkFBTSxXQUFXOztJQUN4QixLQUFLLDJCQUFRLFNBQVM7O0lBRXRCLFFBQVEsMkJBQVEsWUFBWTs7SUFDNUIsTUFBTSwyQkFBVSxVQUFVOztJQUMxQixVQUFVLDJCQUFNLGNBQWM7O0lBQzlCLFVBQVUsMkJBQU0sY0FBYzs7QUFFckMsSUFBTSxVQUFVLEdBQU8sTUFBTSxDQUFDO0FBQzlCLElBQU0sVUFBVSxHQUFPLE1BQU0sQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBSyxRQUFRLENBQUM7QUFDaEMsSUFBTSxhQUFhLEdBQUksU0FBUyxDQUFDO0FBQ2pDLElBQU0sVUFBVSxHQUFPLE1BQU0sQ0FBQztBQUM5QixJQUFNLFdBQVcsR0FBTSxPQUFPLENBQUM7QUFDL0IsSUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDO0FBQ2xDLElBQU0sYUFBYSxHQUFJLFNBQVMsQ0FBQztBQUNqQyxJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUM7QUFDbEMsSUFBTSxhQUFhLEdBQUksaUJBQWlCLENBQUM7QUFDekMsSUFBTSxXQUFXLEdBQU0sUUFBUSxDQUFDO0FBQ2hDLElBQU0sYUFBYSxHQUFJLFVBQVUsQ0FBQztBQUNsQyxJQUFNLFdBQVcsR0FBTSxpQkFBaUIsQ0FBQzs7QUFFekMsSUFBTSxZQUFZLEdBQUksSUFBSSxDQUFDO0FBQzNCLElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUMxQixJQUFNLFVBQVUsR0FBTSxJQUFJLENBQUM7QUFDM0IsSUFBTSxXQUFXLEdBQUssR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7OztpQkFjWCxZQUF1QjtNQUFkLE9BQU8sZ0NBQUcsRUFBRTtBQUNsQyxNQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDZixXQUFPO0FBQ0wsVUFBSSxFQUFTLElBQUk7QUFDakIsVUFBSSxFQUFTLElBQUk7QUFDakIsYUFBTyxFQUFNLE9BQU87QUFDcEIsV0FBSyxFQUFRLEtBQUs7QUFDbEIsY0FBUSxFQUFLLFFBQVE7QUFDckIsWUFBTSxFQUFPLE1BQU07QUFDbkIsZ0JBQVUsRUFBRyxVQUFVO0FBQ3ZCLGdCQUFVLEVBQUcsVUFBVTtBQUN2QixXQUFLLEVBQVEsS0FBSztLQUNuQixDQUFDO0dBQ0gsTUFBTTtBQUNMLFdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3RCO0NBQ0Y7Ozs7O0FBS0QsU0FBUyxJQUFJLEdBQWdCO01BQWYsUUFBUSxnQ0FBRyxFQUFFOzs7Ozs7O0FBTXpCLE1BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3BDLE9BQUcsRUFBUSxLQUFLO0FBQ2hCLFFBQUksRUFBTyxJQUFJO0FBQ2YsV0FBTyxFQUFJLElBQUk7QUFDZixXQUFPLEVBQUksSUFBSTtBQUNmLFlBQVEsRUFBRyxJQUFJO0FBQ2YsWUFBUSxFQUFHLElBQUk7R0FDaEIsQ0FBQyxDQUFDOzs7OztBQUtILE1BQUksS0FBSyxHQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFJLFlBQVksQ0FBQztBQUN2RCxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDeEQsVUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLDZCQUV0RCxZQUFZLDRDQUVKLEtBQUssd0NBQ0osTUFBTSwyQ0FHckIsQ0FBQzs7Ozs7QUFLRixNQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsY0FBVyxhQUFhLFNBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsT0FBSyxXQUFXLE9BQUksQ0FBQyxDQUFDOzs7OztBQUt6RSxVQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsdUJBQy9CLFlBQVksbUJBQ3ZCLENBQUM7QUFDSCxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLFFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxFQUFFO1dBQUssUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUM7O0FBRWpELE1BQUksS0FBSyxHQUFHLFVBQVUsQ0FBQztBQUNyQixTQUFLLEVBQUksS0FBSztBQUNkLFVBQU0sRUFBRyxNQUFNO0FBQ2YsVUFBTSxFQUFHLFFBQVE7R0FDbEIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7Ozs7QUFLN0IsTUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ2xCLGFBQVMsRUFBTyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDO0FBQ2pELFdBQU8sRUFBUyxNQUFNLENBQUMsTUFBTTtBQUM3QixpQkFBYSxFQUFHLE1BQU07R0FDdkIsQ0FBQyxDQUFDOztBQUVILFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMxQyxRQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN6QyxRQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEMsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzs7O0FBRzFFLFFBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtXQUFLLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSTtHQUFBLENBQUMsQ0FBQzs7Ozs7O0FBTXpELE1BQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNuQixZQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsaUJBQWMsYUFBYSxlQUFXLENBQUM7QUFDbkYsUUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEIsUUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEIsUUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pDLFFBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUMsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNmLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWYsS0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7YUFBSyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNqRSxLQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQzthQUFLLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUVoRSxRQUFJLHVCQUF1QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzFFLFdBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3JCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FDZCxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNwQyxXQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNqQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQ2IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7R0FDckM7OztBQUdELE1BQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUNwQixZQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsaUJBQWMsY0FBYyxlQUFXLENBQUM7QUFDcEYsUUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFOUMsUUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDakMsUUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRWxDLGNBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLGVBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7QUFHbkMsY0FBVSxDQUNQLEdBQUcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQ25DLEdBQUcsQ0FBQyxVQUFDLEdBQUc7YUFBSyxHQUFHLGNBQVcsR0FBRyxXQUFPLEVBQUU7S0FBQSxDQUFDLENBQ3hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7OztBQUcvRCxlQUFXLENBQ1IsR0FBRyxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7O0FBRzdELFNBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQ3BCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQ25DLE1BQU0sQ0FBQyxVQUFDLENBQUM7YUFBSyxDQUFDLENBQUMsQ0FBQztLQUFBLENBQUMsQ0FDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztHQUM3Qjs7QUFFRCxNQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDbkIsWUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLHlCQUMvQixhQUFhLG1DQUNQLFVBQVUsZ0RBQ1IsVUFBVSxrQ0FBMkIsV0FBVyx3Q0FDckQsVUFBVSw0Q0FFeEIsQ0FBQzs7QUFFSCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQUd0QyxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztBQUczQyxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztBQUczQyxVQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHdEUsU0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakY7O0FBRUQsTUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO0FBQ3BCLFlBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxpQkFBYyxjQUFjLGVBQVcsQ0FBQzs7O0FBR3BGLFVBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0dBQ3JGOzs7OztBQUtELFlBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUNsRDs7Ozs7Ozs7O0lDM09NLEtBQUssMkJBQU8sU0FBUzs7SUFDckIsTUFBTSwyQkFBTSxRQUFROztJQUNwQixJQUFJLDJCQUFRLFFBQVE7O0FBRTNCLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDaEIsWUFBVSxFQUFFLE9BQU87QUFDbkIsV0FBUyxFQUFFLFVBQVUsSUFBSSxFQUFFO0FBQ3pCLFFBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDdkIsYUFBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3ZELGFBQU8sSUFBSSxDQUFDO0tBQ2I7QUFDRCxXQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztHQUM5QztDQUNGLENBQUMsQ0FBQzs7Ozs7OztpQkFPWSxlQUFlOzs7Ozs7O0FBTTlCLFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUMzQixNQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hELFNBQU8sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QyxNQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdkYsSUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFNBQU8sT0FBTyxDQUFDO0NBQ2hCOzs7Ozs7QUFNRCxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsU0FBTyxVQUFTLElBQUksRUFBRTtBQUNwQixNQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3hDLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QixTQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDO0NBQzdCOzs7Ozs7Ozs7SUNqRE0sS0FBSywyQkFBUSxTQUFTOztJQUN0QixPQUFPLDJCQUFNLFdBQVc7O0lBQ3hCLElBQUksMkJBQVMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7aUJBY2IsVUFBUyxPQUFPLEVBQUU7QUFFL0IsTUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDOUIsTUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDOUIsTUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTlCLE1BQUksVUFBVSxHQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQUksV0FBVyxHQUFHLFVBQVUsQ0FDekIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ2xDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUNsQyxjQUFjLEVBQUUsQ0FBQzs7QUFFcEIsTUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1dBQUssQ0FBQyxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUM7QUFDOUQsTUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO1dBQUssQ0FBQyxHQUFHLENBQUM7R0FBQSxDQUFDLENBQUM7QUFDOUQsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxDQUFDO0dBQUEsQ0FBVSxDQUFDOztBQUU1QyxZQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hCLFlBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEIsWUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFeEIsTUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDaEUsTUFBSSxZQUFZLEdBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7V0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUM7O0FBRXpFLGNBQVksQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUU7QUFDckMsV0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0MsV0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUMvQixDQUFDLENBQUM7O0FBRUgsU0FBTztBQUNMLGFBQVMsRUFBRyxXQUFXO0FBQ3ZCLFdBQU8sRUFBSyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQzthQUFLLENBQUMsS0FBSyxDQUFDO0tBQUEsQ0FBQztBQUM5QyxTQUFLLEVBQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7YUFBSyxDQUFDLEtBQUssT0FBTyxDQUFDLE9BQU87S0FBQSxDQUFDO0FBQzVELGFBQVMsRUFBRyxZQUFZO0FBQ3hCLGFBQVMsRUFBRyxhQUFhO0FBQ3pCLFdBQU8sRUFBSyxPQUFPO0FBQ25CLFdBQU8sRUFBSyxPQUFPO0FBQ25CLFdBQU8sRUFBSyxPQUFPO0dBQ3BCLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLFdBQVcsQ0FBQyxFQUFFLEVBQUU7QUFDdkIsSUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztDQUMvQjs7Ozs7QUFLRCxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUU7QUFDckIsSUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDL0I7Ozs7Ozs7QUFPRCxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzNCLFNBQU8sVUFBUyxDQUFDLEVBQUU7QUFDakIsV0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQ3hDLENBQUM7Q0FDSDs7Ozs7O0FBTUQsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3RCLFNBQU8sVUFBUyxPQUFPLEVBQUU7QUFDdkIsV0FBTyxBQUFDLEFBQUMsR0FBRyxHQUFHLEdBQUcsR0FBSSxPQUFPLEdBQUksR0FBRyxDQUFDO0dBQ3RDLENBQUM7Q0FDSDs7Ozs7Ozs7aUJDdEZjLFVBQVU7Ozs7Ozs7QUFNekIsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQ3pCLE1BQUksR0FBRyxHQUFJLEVBQUUsQ0FBQztBQUNkLE9BQUssQ0FDRixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWLEdBQUcsQ0FBQyxVQUFDLFFBQVE7V0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsQ0FDdEMsT0FBTyxDQUFDLFVBQUMsRUFBRTtXQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0dBQUEsQ0FBQyxDQUFDO0FBQ3ZDLFNBQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7Ozs7OztJQ2pCTSxLQUFLLDJCQUFNLFNBQVM7O0lBQ3BCLElBQUksMkJBQU8sUUFBUTs7Ozs7Ozs7Ozs7Ozs7O2lCQWVYLFlBQXVCO01BQWQsT0FBTyxnQ0FBRyxFQUFFOzs7QUFFbEMsTUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTFCLE1BQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxNQUFJLFFBQVEsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUvQyxNQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3RELE1BQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7O0FBRXRELE1BQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRWpGLE9BQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUzRCxTQUFPLEdBQUcsQ0FBQztDQUNaOzs7Ozs7QUFNRCxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUNoQyxTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztHQUNsQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUMvQixTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztHQUNwQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUNyQixTQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLE1BQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxjQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQUcsQ0FBQztHQUN4RCxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRTtBQUN2QixTQUFPLFlBQVc7QUFDaEIsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEMsTUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUEsR0FBSSxDQUFDLENBQUM7QUFDdEQsTUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUEsR0FBSSxDQUFDLENBQUM7R0FDeEQsQ0FBQztDQUNIOzs7OztpQkN6RWM7Ozs7O0FBS2IsV0FBTyxpQkFBQyxJQUFJLEVBQUU7QUFDWjs7Ozs7Ozs7O0FBU0YsWUFBUSxrQkFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3ZCO0FBQ0EsNENBQStCLENBQUMsRUFBSTtBQUNsQztBQUNFOztBQUVGOztBQUVGOzs7Ozs7OztBQVFGLFNBQUssZUFBQyxJQUFJLEVBQUU7QUFDVjtBQUNBLHdDQUEyQixDQUFDO2FBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7S0FBQSxDQUFDLENBQUM7QUFDbEQsV0FBTyxHQUFHLENBQUM7R0FDWjs7Ozs7O0FBTUQsU0FBTyxFQUFBLG1CQUFHOztBQUVSLFFBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM1QixXQUFPLFlBQVc7QUFDaEIsVUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2QsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDaEQsYUFBTyxDQUFDLEVBQUUsRUFBRTtBQUNWLGNBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztPQUNyQztBQUNELGFBQU8sTUFBTSxDQUFDO0tBQ2YsQ0FBQztHQUNIOzs7OztBQUtELFNBQU8sRUFBQSxpQkFBQyxLQUFLLEVBQUU7QUFDYixXQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDdkM7Ozs7O0FBS0QsY0FBWSxFQUFBLHNCQUFDLEVBQUUsRUFBRTtBQUNmLFdBQU8sVUFBUyxJQUFJLEVBQUU7QUFDcEIsUUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDdkIsQ0FBQztHQUNIOzs7Ozs7QUFNRCxlQUFhLEVBQUEsdUJBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUMxQixXQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFFBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQzVCLENBQUM7R0FDSDs7Ozs7QUFLRCxZQUFVLEVBQUEsb0JBQUMsR0FBRyxFQUFFO0FBQ2QsUUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxPQUFHLENBQUMsTUFBTSxHQUFHO2FBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQztBQUNsRCxPQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNkLE9BQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUMzQixZQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNoQzs7Ozs7QUFLRCx1QkFBcUIsRUFBQSxpQ0FBRztBQUN0QixXQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzFEO0NBQ0YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe3JlcXVpcmUoXCJjb3JlLWpzL3NoaW1cIik7cmVxdWlyZShcInJlZ2VuZXJhdG9yL3J1bnRpbWVcIil9LHtcImNvcmUtanMvc2hpbVwiOjIsXCJyZWdlbmVyYXRvci9ydW50aW1lXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyFmdW5jdGlvbihyZXR1cm5UaGlzLGZyYW1ld29yayx1bmRlZmluZWQpe1widXNlIHN0cmljdFwiO3ZhciBnbG9iYWw9cmV0dXJuVGhpcygpLE9CSkVDVD1cIk9iamVjdFwiLEZVTkNUSU9OPVwiRnVuY3Rpb25cIixBUlJBWT1cIkFycmF5XCIsU1RSSU5HPVwiU3RyaW5nXCIsTlVNQkVSPVwiTnVtYmVyXCIsUkVHRVhQPVwiUmVnRXhwXCIsREFURT1cIkRhdGVcIixNQVA9XCJNYXBcIixTRVQ9XCJTZXRcIixXRUFLTUFQPVwiV2Vha01hcFwiLFdFQUtTRVQ9XCJXZWFrU2V0XCIsU1lNQk9MPVwiU3ltYm9sXCIsUFJPTUlTRT1cIlByb21pc2VcIixNQVRIPVwiTWF0aFwiLEFSR1VNRU5UUz1cIkFyZ3VtZW50c1wiLFBST1RPVFlQRT1cInByb3RvdHlwZVwiLENPTlNUUlVDVE9SPVwiY29uc3RydWN0b3JcIixUT19TVFJJTkc9XCJ0b1N0cmluZ1wiLFRPX1NUUklOR19UQUc9VE9fU1RSSU5HK1wiVGFnXCIsVE9fTE9DQUxFPVwidG9Mb2NhbGVTdHJpbmdcIixIQVNfT1dOPVwiaGFzT3duUHJvcGVydHlcIixGT1JfRUFDSD1cImZvckVhY2hcIixJVEVSQVRPUj1cIml0ZXJhdG9yXCIsRkZfSVRFUkFUT1I9XCJAQFwiK0lURVJBVE9SLFBST0NFU1M9XCJwcm9jZXNzXCIsQ1JFQVRFX0VMRU1FTlQ9XCJjcmVhdGVFbGVtZW50XCIsRnVuY3Rpb249Z2xvYmFsW0ZVTkNUSU9OXSxPYmplY3Q9Z2xvYmFsW09CSkVDVF0sQXJyYXk9Z2xvYmFsW0FSUkFZXSxTdHJpbmc9Z2xvYmFsW1NUUklOR10sTnVtYmVyPWdsb2JhbFtOVU1CRVJdLFJlZ0V4cD1nbG9iYWxbUkVHRVhQXSxEYXRlPWdsb2JhbFtEQVRFXSxNYXA9Z2xvYmFsW01BUF0sU2V0PWdsb2JhbFtTRVRdLFdlYWtNYXA9Z2xvYmFsW1dFQUtNQVBdLFdlYWtTZXQ9Z2xvYmFsW1dFQUtTRVRdLFN5bWJvbD1nbG9iYWxbU1lNQk9MXSxNYXRoPWdsb2JhbFtNQVRIXSxUeXBlRXJyb3I9Z2xvYmFsLlR5cGVFcnJvcixzZXRUaW1lb3V0PWdsb2JhbC5zZXRUaW1lb3V0LHNldEltbWVkaWF0ZT1nbG9iYWwuc2V0SW1tZWRpYXRlLGNsZWFySW1tZWRpYXRlPWdsb2JhbC5jbGVhckltbWVkaWF0ZSxwcm9jZXNzPWdsb2JhbFtQUk9DRVNTXSxuZXh0VGljaz1wcm9jZXNzJiZwcm9jZXNzLm5leHRUaWNrLGRvY3VtZW50PWdsb2JhbC5kb2N1bWVudCxodG1sPWRvY3VtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbmF2aWdhdG9yPWdsb2JhbC5uYXZpZ2F0b3IsZGVmaW5lPWdsb2JhbC5kZWZpbmUsQXJyYXlQcm90bz1BcnJheVtQUk9UT1RZUEVdLE9iamVjdFByb3RvPU9iamVjdFtQUk9UT1RZUEVdLEZ1bmN0aW9uUHJvdG89RnVuY3Rpb25bUFJPVE9UWVBFXSxJbmZpbml0eT0xLzAsRE9UPVwiLlwiO2Z1bmN0aW9uIGlzT2JqZWN0KGl0KXtyZXR1cm4gaXQhPW51bGwmJih0eXBlb2YgaXQ9PVwib2JqZWN0XCJ8fHR5cGVvZiBpdD09XCJmdW5jdGlvblwiKX1mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtyZXR1cm4gdHlwZW9mIGl0PT1cImZ1bmN0aW9uXCJ9dmFyIGlzTmF0aXZlPWN0eCgvLi8udGVzdCwvXFxbbmF0aXZlIGNvZGVcXF1cXHMqXFx9XFxzKiQvLDEpO3ZhciBidWlsZEluPXtVbmRlZmluZWQ6MSxOdWxsOjEsQXJyYXk6MSxTdHJpbmc6MSxBcmd1bWVudHM6MSxGdW5jdGlvbjoxLEVycm9yOjEsQm9vbGVhbjoxLE51bWJlcjoxLERhdGU6MSxSZWdFeHA6MX0sdG9TdHJpbmc9T2JqZWN0UHJvdG9bVE9fU1RSSU5HXTtmdW5jdGlvbiBzZXRUb1N0cmluZ1RhZyhpdCx0YWcsc3RhdCl7aWYoaXQpaGFzKGl0PXN0YXQ/aXQ6aXRbUFJPVE9UWVBFXSxTWU1CT0xfVEFHKXx8aGlkZGVuKGl0LFNZTUJPTF9UQUcsdGFnKX1mdW5jdGlvbiBjb2YoaXQpe3JldHVybiBpdD09dW5kZWZpbmVkP2l0PT09dW5kZWZpbmVkP1wiVW5kZWZpbmVkXCI6XCJOdWxsXCI6dG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwtMSl9ZnVuY3Rpb24gY2xhc3NvZihpdCl7dmFyIGtsYXNzPWNvZihpdCksdGFnO3JldHVybiBrbGFzcz09T0JKRUNUJiYodGFnPWl0W1NZTUJPTF9UQUddKT9oYXMoYnVpbGRJbix0YWcpP1wiflwiK3RhZzp0YWc6a2xhc3N9dmFyIGNhbGw9RnVuY3Rpb25Qcm90by5jYWxsLFJFRkVSRU5DRV9HRVQ7ZnVuY3Rpb24gcGFydCgpe3ZhciBsZW5ndGg9YXJndW1lbnRzLmxlbmd0aCxhcmdzPUFycmF5KGxlbmd0aCksaT0wLF89cGF0aC5fLGhvbGRlcj1mYWxzZTt3aGlsZShsZW5ndGg+aSlpZigoYXJnc1tpXT1hcmd1bWVudHNbaSsrXSk9PT1fKWhvbGRlcj10cnVlO3JldHVybiBwYXJ0aWFsKHRoaXMsYXJncyxsZW5ndGgsaG9sZGVyLF8sZmFsc2UpfWZ1bmN0aW9uIHBhcnRpYWwoZm4sYXJnc1BhcnQsbGVuZ3RoUGFydCxob2xkZXIsXyxiaW5kLGNvbnRleHQpe2Fzc2VydEZ1bmN0aW9uKGZuKTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdGhhdD1iaW5kP2NvbnRleHQ6dGhpcyxsZW5ndGg9YXJndW1lbnRzLmxlbmd0aCxpPTAsaj0wLGFyZ3M7aWYoIWhvbGRlciYmIWxlbmd0aClyZXR1cm4gaW52b2tlKGZuLGFyZ3NQYXJ0LHRoYXQpO2FyZ3M9YXJnc1BhcnQuc2xpY2UoKTtpZihob2xkZXIpZm9yKDtsZW5ndGhQYXJ0Pmk7aSsrKWlmKGFyZ3NbaV09PT1fKWFyZ3NbaV09YXJndW1lbnRzW2orK107d2hpbGUobGVuZ3RoPmopYXJncy5wdXNoKGFyZ3VtZW50c1tqKytdKTtyZXR1cm4gaW52b2tlKGZuLGFyZ3MsdGhhdCl9fWZ1bmN0aW9uIGN0eChmbix0aGF0LGxlbmd0aCl7YXNzZXJ0RnVuY3Rpb24oZm4pO2lmKH5sZW5ndGgmJnRoYXQ9PT11bmRlZmluZWQpcmV0dXJuIGZuO3N3aXRjaChsZW5ndGgpe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24oYSl7cmV0dXJuIGZuLmNhbGwodGhhdCxhKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihhLGIpe3JldHVybiBmbi5jYWxsKHRoYXQsYSxiKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGZuLmNhbGwodGhhdCxhLGIsYyl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBmbi5hcHBseSh0aGF0LGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGludm9rZShmbixhcmdzLHRoYXQpe3ZhciB1bj10aGF0PT09dW5kZWZpbmVkO3N3aXRjaChhcmdzLmxlbmd0aHwwKXtjYXNlIDA6cmV0dXJuIHVuP2ZuKCk6Zm4uY2FsbCh0aGF0KTtjYXNlIDE6cmV0dXJuIHVuP2ZuKGFyZ3NbMF0pOmZuLmNhbGwodGhhdCxhcmdzWzBdKTtjYXNlIDI6cmV0dXJuIHVuP2ZuKGFyZ3NbMF0sYXJnc1sxXSk6Zm4uY2FsbCh0aGF0LGFyZ3NbMF0sYXJnc1sxXSk7Y2FzZSAzOnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSk6Zm4uY2FsbCh0aGF0LGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdKTtjYXNlIDQ6cmV0dXJuIHVuP2ZuKGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdLGFyZ3NbM10pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdKTtjYXNlIDU6cmV0dXJuIHVuP2ZuKGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdLGFyZ3NbM10sYXJnc1s0XSk6Zm4uY2FsbCh0aGF0LGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdLGFyZ3NbM10sYXJnc1s0XSl9cmV0dXJuIGZuLmFwcGx5KHRoYXQsYXJncyl9dmFyIGNyZWF0ZT1PYmplY3QuY3JlYXRlLGdldFByb3RvdHlwZU9mPU9iamVjdC5nZXRQcm90b3R5cGVPZixkZWZpbmVQcm9wZXJ0eT1PYmplY3QuZGVmaW5lUHJvcGVydHksZGVmaW5lUHJvcGVydGllcz1PYmplY3QuZGVmaW5lUHJvcGVydGllcyxnZXRPd25EZXNjcmlwdG9yPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsZ2V0S2V5cz1PYmplY3Qua2V5cyxnZXROYW1lcz1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxnZXRTeW1ib2xzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsaGFzPWN0eChjYWxsLE9iamVjdFByb3RvW0hBU19PV05dLDIpLEVTNU9iamVjdD1PYmplY3Q7ZnVuY3Rpb24gZ2V0KG9iamVjdCxrZXkpe2lmKGhhcyhvYmplY3Qsa2V5KSlyZXR1cm4gb2JqZWN0W2tleV19ZnVuY3Rpb24gb3duS2V5cyhpdCl7cmV0dXJuIGdldFN5bWJvbHM/Z2V0TmFtZXMoaXQpLmNvbmNhdChnZXRTeW1ib2xzKGl0KSk6Z2V0TmFtZXMoaXQpfXZhciBhc3NpZ249T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odGFyZ2V0LHNvdXJjZSl7dmFyIFQ9T2JqZWN0KGFzc2VydERlZmluZWQodGFyZ2V0KSksbD1hcmd1bWVudHMubGVuZ3RoLGk9MTt3aGlsZShsPmkpe3ZhciBTPUVTNU9iamVjdChhcmd1bWVudHNbaSsrXSksa2V5cz1nZXRLZXlzKFMpLGxlbmd0aD1rZXlzLmxlbmd0aCxqPTAsa2V5O3doaWxlKGxlbmd0aD5qKVRba2V5PWtleXNbaisrXV09U1trZXldfXJldHVybiBUfTtmdW5jdGlvbiBrZXlPZihvYmplY3QsZWwpe3ZhciBPPUVTNU9iamVjdChvYmplY3QpLGtleXM9Z2V0S2V5cyhPKSxsZW5ndGg9a2V5cy5sZW5ndGgsaW5kZXg9MCxrZXk7d2hpbGUobGVuZ3RoPmluZGV4KWlmKE9ba2V5PWtleXNbaW5kZXgrK11dPT09ZWwpcmV0dXJuIGtleX1mdW5jdGlvbiBhcnJheShpdCl7cmV0dXJuIFN0cmluZyhpdCkuc3BsaXQoXCIsXCIpfXZhciBwdXNoPUFycmF5UHJvdG8ucHVzaCx1bnNoaWZ0PUFycmF5UHJvdG8udW5zaGlmdCxzbGljZT1BcnJheVByb3RvLnNsaWNlLHNwbGljZT1BcnJheVByb3RvLnNwbGljZSxpbmRleE9mPUFycmF5UHJvdG8uaW5kZXhPZixmb3JFYWNoPUFycmF5UHJvdG9bRk9SX0VBQ0hdO2Z1bmN0aW9uIGNyZWF0ZUFycmF5TWV0aG9kKHR5cGUpe3ZhciBpc01hcD10eXBlPT0xLGlzRmlsdGVyPXR5cGU9PTIsaXNTb21lPXR5cGU9PTMsaXNFdmVyeT10eXBlPT00LGlzRmluZEluZGV4PXR5cGU9PTYsbm9ob2xlcz10eXBlPT01fHxpc0ZpbmRJbmRleDtyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbix0aGF0KXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZCh0aGlzKSksc2VsZj1FUzVPYmplY3QoTyksZj1jdHgoY2FsbGJhY2tmbix0aGF0LDMpLGxlbmd0aD10b0xlbmd0aChzZWxmLmxlbmd0aCksaW5kZXg9MCxyZXN1bHQ9aXNNYXA/QXJyYXkobGVuZ3RoKTppc0ZpbHRlcj9bXTp1bmRlZmluZWQsdmFsLHJlcztmb3IoO2xlbmd0aD5pbmRleDtpbmRleCsrKWlmKG5vaG9sZXN8fGluZGV4IGluIHNlbGYpe3ZhbD1zZWxmW2luZGV4XTtyZXM9Zih2YWwsaW5kZXgsTyk7aWYodHlwZSl7aWYoaXNNYXApcmVzdWx0W2luZGV4XT1yZXM7ZWxzZSBpZihyZXMpc3dpdGNoKHR5cGUpe2Nhc2UgMzpyZXR1cm4gdHJ1ZTtjYXNlIDU6cmV0dXJuIHZhbDtjYXNlIDY6cmV0dXJuIGluZGV4O2Nhc2UgMjpyZXN1bHQucHVzaCh2YWwpfWVsc2UgaWYoaXNFdmVyeSlyZXR1cm4gZmFsc2V9fXJldHVybiBpc0ZpbmRJbmRleD8tMTppc1NvbWV8fGlzRXZlcnk/aXNFdmVyeTpyZXN1bHR9fWZ1bmN0aW9uIGNyZWF0ZUFycmF5Q29udGFpbnMoaXNDb250YWlucyl7cmV0dXJuIGZ1bmN0aW9uKGVsLGZyb21JbmRleCl7dmFyIE89RVM1T2JqZWN0KGFzc2VydERlZmluZWQodGhpcykpLGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCksaW5kZXg9dG9JbmRleChmcm9tSW5kZXgsbGVuZ3RoKTtpZihpc0NvbnRhaW5zJiZlbCE9ZWwpe2Zvcig7bGVuZ3RoPmluZGV4O2luZGV4KyspaWYoc2FtZU5hTihPW2luZGV4XSkpcmV0dXJuIGlzQ29udGFpbnN8fGluZGV4fWVsc2UgZm9yKDtsZW5ndGg+aW5kZXg7aW5kZXgrKylpZihpc0NvbnRhaW5zfHxpbmRleCBpbiBPKXtpZihPW2luZGV4XT09PWVsKXJldHVybiBpc0NvbnRhaW5zfHxpbmRleH1yZXR1cm4haXNDb250YWlucyYmLTF9fWZ1bmN0aW9uIHR1cm4obWFwZm4sdGFyZ2V0KXthc3NlcnRGdW5jdGlvbihtYXBmbik7dmFyIG1lbW89dGFyZ2V0PT11bmRlZmluZWQ/W106T2JqZWN0KHRhcmdldCksTz1FUzVPYmplY3QodGhpcyksbGVuZ3RoPXRvTGVuZ3RoKE8ubGVuZ3RoKSxpbmRleD0wO2Zvcig7bGVuZ3RoPmluZGV4O2luZGV4Kyspe2lmKG1hcGZuKG1lbW8sT1tpbmRleF0saW5kZXgsdGhpcyk9PT1mYWxzZSlicmVha31yZXR1cm4gbWVtb31mdW5jdGlvbiBnZW5lcmljKEEsQil7cmV0dXJuIHR5cGVvZiBBPT1cImZ1bmN0aW9uXCI/QTpCfXZhciBNQVhfU0FGRV9JTlRFR0VSPTkwMDcxOTkyNTQ3NDA5OTEsY2VpbD1NYXRoLmNlaWwsZmxvb3I9TWF0aC5mbG9vcixtYXg9TWF0aC5tYXgsbWluPU1hdGgubWluLHJhbmRvbT1NYXRoLnJhbmRvbSx0cnVuYz1NYXRoLnRydW5jfHxmdW5jdGlvbihpdCl7cmV0dXJuKGl0PjA/Zmxvb3I6Y2VpbCkoaXQpfTtmdW5jdGlvbiBzYW1lTmFOKG51bWJlcil7cmV0dXJuIG51bWJlciE9bnVtYmVyfWZ1bmN0aW9uIHRvSW50ZWdlcihpdCl7cmV0dXJuIGlzTmFOKGl0KT8wOnRydW5jKGl0KX1mdW5jdGlvbiB0b0xlbmd0aChpdCl7cmV0dXJuIGl0PjA/bWluKHRvSW50ZWdlcihpdCksTUFYX1NBRkVfSU5URUdFUik6MH1mdW5jdGlvbiB0b0luZGV4KGluZGV4LGxlbmd0aCl7dmFyIGluZGV4PXRvSW50ZWdlcihpbmRleCk7cmV0dXJuIGluZGV4PDA/bWF4KGluZGV4K2xlbmd0aCwwKTptaW4oaW5kZXgsbGVuZ3RoKX1mdW5jdGlvbiBjcmVhdGVSZXBsYWNlcihyZWdFeHAscmVwbGFjZSxpc1N0YXRpYyl7dmFyIHJlcGxhY2VyPWlzT2JqZWN0KHJlcGxhY2UpP2Z1bmN0aW9uKHBhcnQpe3JldHVybiByZXBsYWNlW3BhcnRdfTpyZXBsYWNlO3JldHVybiBmdW5jdGlvbihpdCl7cmV0dXJuIFN0cmluZyhpc1N0YXRpYz9pdDp0aGlzKS5yZXBsYWNlKHJlZ0V4cCxyZXBsYWNlcil9fWZ1bmN0aW9uIGNyZWF0ZVBvaW50QXQodG9TdHJpbmcpe3JldHVybiBmdW5jdGlvbihwb3Mpe3ZhciBzPVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxpPXRvSW50ZWdlcihwb3MpLGw9cy5sZW5ndGgsYSxiO2lmKGk8MHx8aT49bClyZXR1cm4gdG9TdHJpbmc/XCJcIjp1bmRlZmluZWQ7YT1zLmNoYXJDb2RlQXQoaSk7cmV0dXJuIGE8NTUyOTZ8fGE+NTYzMTl8fGkrMT09PWx8fChiPXMuY2hhckNvZGVBdChpKzEpKTw1NjMyMHx8Yj41NzM0Mz90b1N0cmluZz9zLmNoYXJBdChpKTphOnRvU3RyaW5nP3Muc2xpY2UoaSxpKzIpOihhLTU1Mjk2PDwxMCkrKGItNTYzMjApKzY1NTM2fX12YXIgUkVEVUNFX0VSUk9SPVwiUmVkdWNlIG9mIGVtcHR5IG9iamVjdCB3aXRoIG5vIGluaXRpYWwgdmFsdWVcIjtmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLG1zZzEsbXNnMil7aWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMj9tc2cxK21zZzI6bXNnMSl9ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7aWYoaXQ9PXVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWRcIik7cmV0dXJuIGl0fWZ1bmN0aW9uIGFzc2VydEZ1bmN0aW9uKGl0KXthc3NlcnQoaXNGdW5jdGlvbihpdCksaXQsXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRPYmplY3QoaXQpe2Fzc2VydChpc09iamVjdChpdCksaXQsXCIgaXMgbm90IGFuIG9iamVjdCFcIik7cmV0dXJuIGl0fWZ1bmN0aW9uIGFzc2VydEluc3RhbmNlKGl0LENvbnN0cnVjdG9yLG5hbWUpe2Fzc2VydChpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLG5hbWUsXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpfWZ1bmN0aW9uIGRlc2NyaXB0b3IoYml0bWFwLHZhbHVlKXtyZXR1cm57ZW51bWVyYWJsZTohKGJpdG1hcCYxKSxjb25maWd1cmFibGU6IShiaXRtYXAmMiksd3JpdGFibGU6IShiaXRtYXAmNCksdmFsdWU6dmFsdWV9fWZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3Qsa2V5LHZhbHVlKXtvYmplY3Rba2V5XT12YWx1ZTtyZXR1cm4gb2JqZWN0fWZ1bmN0aW9uIGNyZWF0ZURlZmluZXIoYml0bWFwKXtyZXR1cm4gREVTQz9mdW5jdGlvbihvYmplY3Qsa2V5LHZhbHVlKXtyZXR1cm4gZGVmaW5lUHJvcGVydHkob2JqZWN0LGtleSxkZXNjcmlwdG9yKGJpdG1hcCx2YWx1ZSkpfTpzaW1wbGVTZXR9ZnVuY3Rpb24gdWlkKGtleSl7cmV0dXJuIFNZTUJPTCtcIihcIitrZXkrXCIpX1wiKygrK3NpZCtyYW5kb20oKSlbVE9fU1RSSU5HXSgzNil9ZnVuY3Rpb24gZ2V0V2VsbEtub3duU3ltYm9sKG5hbWUsc2V0dGVyKXtyZXR1cm4gU3ltYm9sJiZTeW1ib2xbbmFtZV18fChzZXR0ZXI/U3ltYm9sOnNhZmVTeW1ib2wpKFNZTUJPTCtET1QrbmFtZSl9dmFyIERFU0M9ISFmdW5jdGlvbigpe3RyeXtyZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sMCxPYmplY3RQcm90byl9Y2F0Y2goZSl7fX0oKSxzaWQ9MCxoaWRkZW49Y3JlYXRlRGVmaW5lcigxKSxzZXQ9U3ltYm9sP3NpbXBsZVNldDpoaWRkZW4sc2FmZVN5bWJvbD1TeW1ib2x8fHVpZDtmdW5jdGlvbiBhc3NpZ25IaWRkZW4odGFyZ2V0LHNyYyl7Zm9yKHZhciBrZXkgaW4gc3JjKWhpZGRlbih0YXJnZXQsa2V5LHNyY1trZXldKTtyZXR1cm4gdGFyZ2V0fXZhciBTWU1CT0xfSVRFUkFUT1I9Z2V0V2VsbEtub3duU3ltYm9sKElURVJBVE9SKSxTWU1CT0xfVEFHPWdldFdlbGxLbm93blN5bWJvbChUT19TVFJJTkdfVEFHKSxTVVBQT1JUX0ZGX0lURVI9RkZfSVRFUkFUT1IgaW4gQXJyYXlQcm90byxJVEVSPXNhZmVTeW1ib2woXCJpdGVyXCIpLEtFWT0xLFZBTFVFPTIsSXRlcmF0b3JzPXt9LEl0ZXJhdG9yUHJvdG90eXBlPXt9LE5BVElWRV9JVEVSQVRPUlM9U1lNQk9MX0lURVJBVE9SIGluIEFycmF5UHJvdG8sQlVHR1lfSVRFUkFUT1JTPVwia2V5c1wiaW4gQXJyYXlQcm90byYmIShcIm5leHRcImluW10ua2V5cygpKTtzZXRJdGVyYXRvcihJdGVyYXRvclByb3RvdHlwZSxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRJdGVyYXRvcihPLHZhbHVlKXtoaWRkZW4oTyxTWU1CT0xfSVRFUkFUT1IsdmFsdWUpO1NVUFBPUlRfRkZfSVRFUiYmaGlkZGVuKE8sRkZfSVRFUkFUT1IsdmFsdWUpfWZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKENvbnN0cnVjdG9yLE5BTUUsbmV4dCxwcm90byl7Q29uc3RydWN0b3JbUFJPVE9UWVBFXT1jcmVhdGUocHJvdG98fEl0ZXJhdG9yUHJvdG90eXBlLHtuZXh0OmRlc2NyaXB0b3IoMSxuZXh0KX0pO3NldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLE5BTUUrXCIgSXRlcmF0b3JcIil9ZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3IoQ29uc3RydWN0b3IsTkFNRSx2YWx1ZSxERUZBVUxUKXt2YXIgcHJvdG89Q29uc3RydWN0b3JbUFJPVE9UWVBFXSxpdGVyPWdldChwcm90byxTWU1CT0xfSVRFUkFUT1IpfHxnZXQocHJvdG8sRkZfSVRFUkFUT1IpfHxERUZBVUxUJiZnZXQocHJvdG8sREVGQVVMVCl8fHZhbHVlO2lmKGZyYW1ld29yayl7c2V0SXRlcmF0b3IocHJvdG8saXRlcik7aWYoaXRlciE9PXZhbHVlKXt2YXIgaXRlclByb3RvPWdldFByb3RvdHlwZU9mKGl0ZXIuY2FsbChuZXcgQ29uc3RydWN0b3IpKTtzZXRUb1N0cmluZ1RhZyhpdGVyUHJvdG8sTkFNRStcIiBJdGVyYXRvclwiLHRydWUpO2hhcyhwcm90byxGRl9JVEVSQVRPUikmJnNldEl0ZXJhdG9yKGl0ZXJQcm90byxyZXR1cm5UaGlzKX19SXRlcmF0b3JzW05BTUVdPWl0ZXI7SXRlcmF0b3JzW05BTUUrXCIgSXRlcmF0b3JcIl09cmV0dXJuVGhpc31mdW5jdGlvbiBkZWZpbmVTdGRJdGVyYXRvcnMoQmFzZSxOQU1FLENvbnN0cnVjdG9yLG5leHQsREVGQVVMVCl7ZnVuY3Rpb24gY3JlYXRlSXRlcihraW5kKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsa2luZCl9fWNyZWF0ZUl0ZXJhdG9yKENvbnN0cnVjdG9yLE5BTUUsbmV4dCk7ZGVmaW5lSXRlcmF0b3IoQmFzZSxOQU1FLGNyZWF0ZUl0ZXIoREVGQVVMVCksREVGQVVMVD09VkFMVUU/XCJ2YWx1ZXNcIjpcImVudHJpZXNcIik7REVGQVVMVCYmJGRlZmluZShQUk9UTytGT1JDRUQqQlVHR1lfSVRFUkFUT1JTLE5BTUUse2VudHJpZXM6Y3JlYXRlSXRlcihLRVkrVkFMVUUpLGtleXM6Y3JlYXRlSXRlcihLRVkpLHZhbHVlczpjcmVhdGVJdGVyKFZBTFVFKX0pfWZ1bmN0aW9uIGl0ZXJSZXN1bHQoZG9uZSx2YWx1ZSl7cmV0dXJue3ZhbHVlOnZhbHVlLGRvbmU6ISFkb25lfX1mdW5jdGlvbiBpc0l0ZXJhYmxlKGl0KXt2YXIgTz1PYmplY3QoaXQpO3JldHVybiBTWU1CT0xfSVRFUkFUT1IgaW4gT3x8aGFzKEl0ZXJhdG9ycyxjbGFzc29mKE8pKX1mdW5jdGlvbiBnZXRJdGVyYXRvcihpdCl7cmV0dXJuIGFzc2VydE9iamVjdCgoaXRbU1lNQk9MX0lURVJBVE9SXXx8SXRlcmF0b3JzW2NsYXNzb2YoaXQpXSkuY2FsbChpdCkpfWZ1bmN0aW9uIHN0ZXBDYWxsKGZuLHZhbHVlLGVudHJpZXMpe3JldHVybiBlbnRyaWVzP2ludm9rZShmbix2YWx1ZSk6Zm4odmFsdWUpfWZ1bmN0aW9uIGZvck9mKGl0ZXJhYmxlLGVudHJpZXMsZm4sdGhhdCl7dmFyIGl0ZXJhdG9yPWdldEl0ZXJhdG9yKGl0ZXJhYmxlKSxmPWN0eChmbix0aGF0LGVudHJpZXM/MjoxKSxzdGVwO3doaWxlKCEoc3RlcD1pdGVyYXRvci5uZXh0KCkpLmRvbmUpaWYoc3RlcENhbGwoZixzdGVwLnZhbHVlLGVudHJpZXMpPT09ZmFsc2UpcmV0dXJufXZhciBOT0RFPWNvZihwcm9jZXNzKT09UFJPQ0VTUyxjb3JlPXt9LHBhdGg9ZnJhbWV3b3JrP2dsb2JhbDpjb3JlLG9sZD1nbG9iYWwuY29yZSxGT1JDRUQ9MSxHTE9CQUw9MixTVEFUSUM9NCxQUk9UTz04LEJJTkQ9MTYsV1JBUD0zMjtmdW5jdGlvbiAkZGVmaW5lKHR5cGUsbmFtZSxzb3VyY2Upe3ZhciBrZXksb3duLG91dCxleHAsaXNHbG9iYWw9dHlwZSZHTE9CQUwsdGFyZ2V0PWlzR2xvYmFsP2dsb2JhbDp0eXBlJlNUQVRJQz9nbG9iYWxbbmFtZV06KGdsb2JhbFtuYW1lXXx8T2JqZWN0UHJvdG8pW1BST1RPVFlQRV0sZXhwb3J0cz1pc0dsb2JhbD9jb3JlOmNvcmVbbmFtZV18fChjb3JlW25hbWVdPXt9KTtpZihpc0dsb2JhbClzb3VyY2U9bmFtZTtmb3Ioa2V5IGluIHNvdXJjZSl7b3duPSEodHlwZSZGT1JDRUQpJiZ0YXJnZXQmJmtleSBpbiB0YXJnZXQmJighaXNGdW5jdGlvbih0YXJnZXRba2V5XSl8fGlzTmF0aXZlKHRhcmdldFtrZXldKSk7b3V0PShvd24/dGFyZ2V0OnNvdXJjZSlba2V5XTtpZih0eXBlJkJJTkQmJm93billeHA9Y3R4KG91dCxnbG9iYWwpO2Vsc2UgaWYodHlwZSZXUkFQJiYhZnJhbWV3b3JrJiZ0YXJnZXRba2V5XT09b3V0KXtleHA9ZnVuY3Rpb24ocGFyYW0pe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygb3V0P25ldyBvdXQocGFyYW0pOm91dChwYXJhbSl9O2V4cFtQUk9UT1RZUEVdPW91dFtQUk9UT1RZUEVdfWVsc2UgZXhwPXR5cGUmUFJPVE8mJmlzRnVuY3Rpb24ob3V0KT9jdHgoY2FsbCxvdXQpOm91dDtpZihleHBvcnRzW2tleV0hPW91dCloaWRkZW4oZXhwb3J0cyxrZXksZXhwKTtpZihmcmFtZXdvcmsmJnRhcmdldCYmIW93bil7aWYoaXNHbG9iYWwpdGFyZ2V0W2tleV09b3V0O2Vsc2UgZGVsZXRlIHRhcmdldFtrZXldJiZoaWRkZW4odGFyZ2V0LGtleSxvdXQpfX19aWYoTk9ERSltb2R1bGUuZXhwb3J0cz1jb3JlO2lmKGlzRnVuY3Rpb24oZGVmaW5lKSYmZGVmaW5lLmFtZClkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gY29yZX0pO2lmKCFOT0RFfHxmcmFtZXdvcmspe2NvcmUubm9Db25mbGljdD1mdW5jdGlvbigpe2dsb2JhbC5jb3JlPW9sZDtyZXR1cm4gY29yZX07Z2xvYmFsLmNvcmU9Y29yZX0kZGVmaW5lKEdMT0JBTCtGT1JDRUQse2dsb2JhbDpnbG9iYWx9KTshZnVuY3Rpb24oVEFHLFN5bWJvbFJlZ2lzdHJ5LHNldHRlcil7aWYoIWlzTmF0aXZlKFN5bWJvbCkpe1N5bWJvbD1mdW5jdGlvbihkZXNjcmlwdGlvbil7YXNzZXJ0KCEodGhpcyBpbnN0YW5jZW9mIFN5bWJvbCksU1lNQk9MK1wiIGlzIG5vdCBhIFwiK0NPTlNUUlVDVE9SKTt2YXIgdGFnPXVpZChkZXNjcmlwdGlvbik7c2V0dGVyJiZkZWZpbmVQcm9wZXJ0eShPYmplY3RQcm90byx0YWcse2NvbmZpZ3VyYWJsZTp0cnVlLHNldDpmdW5jdGlvbih2YWx1ZSl7aGlkZGVuKHRoaXMsdGFnLHZhbHVlKX19KTtyZXR1cm4gc2V0KGNyZWF0ZShTeW1ib2xbUFJPVE9UWVBFXSksVEFHLHRhZyl9O2hpZGRlbihTeW1ib2xbUFJPVE9UWVBFXSxUT19TVFJJTkcsZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tUQUddfSl9JGRlZmluZShHTE9CQUwrV1JBUCx7U3ltYm9sOlN5bWJvbH0pO3ZhciBzeW1ib2xTdGF0aWNzPXtcImZvclwiOmZ1bmN0aW9uKGtleSl7cmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSxrZXkrPVwiXCIpP1N5bWJvbFJlZ2lzdHJ5W2tleV06U3ltYm9sUmVnaXN0cnlba2V5XT1TeW1ib2woa2V5KX0saXRlcmF0b3I6U1lNQk9MX0lURVJBVE9SLGtleUZvcjpwYXJ0LmNhbGwoa2V5T2YsU3ltYm9sUmVnaXN0cnkpLHRvU3RyaW5nVGFnOlNZTUJPTF9UQUc9Z2V0V2VsbEtub3duU3ltYm9sKFRPX1NUUklOR19UQUcsdHJ1ZSkscHVyZTpzYWZlU3ltYm9sLHNldDpzZXQsdXNlU2V0dGVyOmZ1bmN0aW9uKCl7c2V0dGVyPXRydWV9LHVzZVNpbXBsZTpmdW5jdGlvbigpe3NldHRlcj1mYWxzZX19O2ZvckVhY2guY2FsbChhcnJheShcImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxtYXRjaCxyZXBsYWNlLHNlYXJjaCxcIitcInNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdW5zY29wYWJsZXNcIiksZnVuY3Rpb24oaXQpe3N5bWJvbFN0YXRpY3NbaXRdPWdldFdlbGxLbm93blN5bWJvbChpdCl9KTskZGVmaW5lKFNUQVRJQyxTWU1CT0wsc3ltYm9sU3RhdGljcyk7c2V0VG9TdHJpbmdUYWcoU3ltYm9sLFNZTUJPTCk7JGRlZmluZShHTE9CQUwse1JlZmxlY3Q6e293bktleXM6b3duS2V5c319KX0oc2FmZVN5bWJvbChcInRhZ1wiKSx7fSx0cnVlKTshZnVuY3Rpb24oaXNGaW5pdGUsdG1wKXt2YXIgUmFuZ2VFcnJvcj1nbG9iYWwuUmFuZ2VFcnJvcixpc0ludGVnZXI9TnVtYmVyLmlzSW50ZWdlcnx8ZnVuY3Rpb24oaXQpe3JldHVybiFpc09iamVjdChpdCkmJmlzRmluaXRlKGl0KSYmZmxvb3IoaXQpPT09aXR9LHNpZ249TWF0aC5zaWdufHxmdW5jdGlvbiBzaWduKGl0KXtyZXR1cm4oaXQ9K2l0KT09MHx8aXQhPWl0P2l0Oml0PDA/LTE6MX0scG93PU1hdGgucG93LGFicz1NYXRoLmFicyxleHA9TWF0aC5leHAsbG9nPU1hdGgubG9nLHNxcnQ9TWF0aC5zcXJ0LGZjYz1TdHJpbmcuZnJvbUNoYXJDb2RlLGF0PWNyZWF0ZVBvaW50QXQodHJ1ZSk7dmFyIG9iamVjdFN0YXRpYz17YXNzaWduOmFzc2lnbixpczpmdW5jdGlvbih4LHkpe3JldHVybiB4PT09eT94IT09MHx8MS94PT09MS95OnghPXgmJnkhPXl9fTtcIl9fcHJvdG9fX1wiaW4gT2JqZWN0UHJvdG8mJmZ1bmN0aW9uKGJ1Z2d5LHNldCl7dHJ5e3NldD1jdHgoY2FsbCxnZXRPd25EZXNjcmlwdG9yKE9iamVjdFByb3RvLFwiX19wcm90b19fXCIpLnNldCwyKTtzZXQoe30sQXJyYXlQcm90byl9Y2F0Y2goZSl7YnVnZ3k9dHJ1ZX1vYmplY3RTdGF0aWMuc2V0UHJvdG90eXBlT2Y9ZnVuY3Rpb24oTyxwcm90byl7YXNzZXJ0T2JqZWN0KE8pO2Fzc2VydChwcm90bz09PW51bGx8fGlzT2JqZWN0KHByb3RvKSxwcm90byxcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7aWYoYnVnZ3kpTy5fX3Byb3RvX189cHJvdG87ZWxzZSBzZXQoTyxwcm90byk7cmV0dXJuIE99fSgpOyRkZWZpbmUoU1RBVElDLE9CSkVDVCxvYmplY3RTdGF0aWMpO2Z1bmN0aW9uIGFzaW5oKHgpe3JldHVybiFpc0Zpbml0ZSh4PSt4KXx8eD09MD94Ong8MD8tYXNpbmgoLXgpOmxvZyh4K3NxcnQoeCp4KzEpKX0kZGVmaW5lKFNUQVRJQyxOVU1CRVIse0VQU0lMT046cG93KDIsLTUyKSxpc0Zpbml0ZTpmdW5jdGlvbihpdCl7cmV0dXJuIHR5cGVvZiBpdD09XCJudW1iZXJcIiYmaXNGaW5pdGUoaXQpfSxpc0ludGVnZXI6aXNJbnRlZ2VyLGlzTmFOOnNhbWVOYU4saXNTYWZlSW50ZWdlcjpmdW5jdGlvbihudW1iZXIpe3JldHVybiBpc0ludGVnZXIobnVtYmVyKSYmYWJzKG51bWJlcik8PU1BWF9TQUZFX0lOVEVHRVJ9LE1BWF9TQUZFX0lOVEVHRVI6TUFYX1NBRkVfSU5URUdFUixNSU5fU0FGRV9JTlRFR0VSOi1NQVhfU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQ6cGFyc2VGbG9hdCxwYXJzZUludDpwYXJzZUludH0pOyRkZWZpbmUoU1RBVElDLE1BVEgse2Fjb3NoOmZ1bmN0aW9uKHgpe3JldHVybiB4PDE/TmFOOmxvZyh4K3NxcnQoeCp4LTEpKX0sYXNpbmg6YXNpbmgsYXRhbmg6ZnVuY3Rpb24oeCl7cmV0dXJuIHg9PTA/K3g6bG9nKCgxKyAreCkvKDEteCkpLzJ9LGNicnQ6ZnVuY3Rpb24oeCl7cmV0dXJuIHNpZ24oeCkqcG93KGFicyh4KSwxLzMpfSxjbHozMjpmdW5jdGlvbih4KXtyZXR1cm4oeD4+Pj0wKT8zMi14W1RPX1NUUklOR10oMikubGVuZ3RoOjMyfSxjb3NoOmZ1bmN0aW9uKHgpe3JldHVybihleHAoeCkrZXhwKC14KSkvMn0sZXhwbTE6ZnVuY3Rpb24oeCl7cmV0dXJuIHg9PTA/K3g6eD4tMWUtNiYmeDwxZS02Pyt4K3gqeC8yOmV4cCh4KS0xfSxmcm91bmQ6ZnVuY3Rpb24oeCl7cmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoW3hdKVswXX0saHlwb3Q6ZnVuY3Rpb24odmFsdWUxLHZhbHVlMil7dmFyIHN1bT0wLGxlbmd0aD1hcmd1bWVudHMubGVuZ3RoLHZhbHVlO3doaWxlKGxlbmd0aC0tKXt2YWx1ZT0rYXJndW1lbnRzW2xlbmd0aF07aWYodmFsdWU9PUluZmluaXR5fHx2YWx1ZT09LUluZmluaXR5KXJldHVybiBJbmZpbml0eTtzdW0rPXZhbHVlKnZhbHVlfXJldHVybiBzcXJ0KHN1bSl9LGltdWw6ZnVuY3Rpb24oeCx5KXt2YXIgVUludDE2PTY1NTM1LHhsPVVJbnQxNiZ4LHlsPVVJbnQxNiZ5O3JldHVybiAwfHhsKnlsKygoVUludDE2Jng+Pj4xNikqeWwreGwqKFVJbnQxNiZ5Pj4+MTYpPDwxNj4+PjApfSxsb2cxcDpmdW5jdGlvbih4KXtyZXR1cm4geD4tMWUtOCYmeDwxZS04P3gteCp4LzI6bG9nKDErICt4KX0sbG9nMTA6ZnVuY3Rpb24oeCl7cmV0dXJuIGxvZyh4KS9NYXRoLkxOMTB9LGxvZzI6ZnVuY3Rpb24oeCl7cmV0dXJuIGxvZyh4KS9NYXRoLkxOMn0sc2lnbjpzaWduLHNpbmg6ZnVuY3Rpb24oeCl7cmV0dXJuIHg9PTA/K3g6KGV4cCh4KS1leHAoLXgpKS8yfSx0YW5oOmZ1bmN0aW9uKHgpe3JldHVybiBpc0Zpbml0ZSh4KT94PT0wPyt4OihleHAoeCktZXhwKC14KSkvKGV4cCh4KStleHAoLXgpKTpzaWduKHgpfSx0cnVuYzp0cnVuY30pO3NldFRvU3RyaW5nVGFnKE1hdGgsTUFUSCx0cnVlKTtmdW5jdGlvbiBhc3NlcnROb3RSZWdFeHAoaXQpe2lmKGlzT2JqZWN0KGl0KSYmaXQgaW5zdGFuY2VvZiBSZWdFeHApdGhyb3cgVHlwZUVycm9yKCl9JGRlZmluZShTVEFUSUMsU1RSSU5HLHtmcm9tQ29kZVBvaW50OmZ1bmN0aW9uKCl7dmFyIHJlcz1bXSxsZW49YXJndW1lbnRzLmxlbmd0aCxpPTAsY29kZTt3aGlsZShsZW4+aSl7Y29kZT0rYXJndW1lbnRzW2krK107aWYodG9JbmRleChjb2RlLDExMTQxMTEpIT09Y29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUrXCIgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludFwiKTtyZXMucHVzaChjb2RlPDY1NTM2P2ZjYyhjb2RlKTpmY2MoKChjb2RlLT02NTUzNik+PjEwKSs1NTI5Nixjb2RlJTEwMjQrNTYzMjApKX1yZXR1cm4gcmVzLmpvaW4oXCJcIil9LHJhdzpmdW5jdGlvbihjYWxsU2l0ZSl7dmFyIHJhdz1FUzVPYmplY3QoYXNzZXJ0RGVmaW5lZChjYWxsU2l0ZS5yYXcpKSxsZW49dG9MZW5ndGgocmF3Lmxlbmd0aCksc2xuPWFyZ3VtZW50cy5sZW5ndGgscmVzPVtdLGk9MDt3aGlsZShsZW4+aSl7cmVzLnB1c2goU3RyaW5nKHJhd1tpKytdKSk7aWYoaTxzbG4pcmVzLnB1c2goU3RyaW5nKGFyZ3VtZW50c1tpXSkpfXJldHVybiByZXMuam9pbihcIlwiKX19KTskZGVmaW5lKFBST1RPLFNUUklORyx7Y29kZVBvaW50QXQ6Y3JlYXRlUG9pbnRBdChmYWxzZSksZW5kc1dpdGg6ZnVuY3Rpb24oc2VhcmNoU3RyaW5nLGVuZFBvc2l0aW9uKXthc3NlcnROb3RSZWdFeHAoc2VhcmNoU3RyaW5nKTt2YXIgbGVuPXRoaXMubGVuZ3RoLGVuZD1lbmRQb3NpdGlvbj09PXVuZGVmaW5lZD9sZW46bWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSxsZW4pO3NlYXJjaFN0cmluZys9XCJcIjtyZXR1cm4gU3RyaW5nKHRoaXMpLnNsaWNlKGVuZC1zZWFyY2hTdHJpbmcubGVuZ3RoLGVuZCk9PT1zZWFyY2hTdHJpbmd9LGluY2x1ZGVzOmZ1bmN0aW9uKHNlYXJjaFN0cmluZyxwb3NpdGlvbil7cmV0dXJuISF+U3RyaW5nKGFzc2VydERlZmluZWQodGhpcykpLmluZGV4T2Yoc2VhcmNoU3RyaW5nLHBvc2l0aW9uKX0scmVwZWF0OmZ1bmN0aW9uKGNvdW50KXt2YXIgc3RyPVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxyZXM9XCJcIixuPXRvSW50ZWdlcihjb3VudCk7aWYoMD5ufHxuPT1JbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7Zm9yKDtuPjA7KG4+Pj49MSkmJihzdHIrPXN0cikpaWYobiYxKXJlcys9c3RyO3JldHVybiByZXN9LHN0YXJ0c1dpdGg6ZnVuY3Rpb24oc2VhcmNoU3RyaW5nLHBvc2l0aW9uKXthc3NlcnROb3RSZWdFeHAoc2VhcmNoU3RyaW5nKTt2YXIgaW5kZXg9dG9MZW5ndGgobWluKHBvc2l0aW9uLHRoaXMubGVuZ3RoKSk7c2VhcmNoU3RyaW5nKz1cIlwiO3JldHVybiBTdHJpbmcodGhpcykuc2xpY2UoaW5kZXgsaW5kZXgrc2VhcmNoU3RyaW5nLmxlbmd0aCk9PT1zZWFyY2hTdHJpbmd9fSk7ZGVmaW5lU3RkSXRlcmF0b3JzKFN0cmluZyxTVFJJTkcsZnVuY3Rpb24oaXRlcmF0ZWQpe3NldCh0aGlzLElURVIse286U3RyaW5nKGl0ZXJhdGVkKSxpOjB9KX0sZnVuY3Rpb24oKXt2YXIgaXRlcj10aGlzW0lURVJdLE89aXRlci5vLGluZGV4PWl0ZXIuaSxwb2ludDtpZihpbmRleD49Ty5sZW5ndGgpcmV0dXJuIGl0ZXJSZXN1bHQoMSk7cG9pbnQ9YXQuY2FsbChPLGluZGV4KTtpdGVyLmkrPXBvaW50Lmxlbmd0aDtyZXR1cm4gaXRlclJlc3VsdCgwLHBvaW50KX0pOyRkZWZpbmUoU1RBVElDLEFSUkFZLHtmcm9tOmZ1bmN0aW9uKGFycmF5TGlrZSxtYXBmbix0aGF0KXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZChhcnJheUxpa2UpKSxyZXN1bHQ9bmV3KGdlbmVyaWModGhpcyxBcnJheSkpLG1hcHBpbmc9bWFwZm4hPT11bmRlZmluZWQsZj1tYXBwaW5nP2N0eChtYXBmbix0aGF0LDIpOnVuZGVmaW5lZCxpbmRleD0wLGxlbmd0aDtpZihpc0l0ZXJhYmxlKE8pKWZvcih2YXIgaXRlcj1nZXRJdGVyYXRvcihPKSxzdGVwOyEoc3RlcD1pdGVyLm5leHQoKSkuZG9uZTtpbmRleCsrKXtyZXN1bHRbaW5kZXhdPW1hcHBpbmc/ZihzdGVwLnZhbHVlLGluZGV4KTpzdGVwLnZhbHVlfWVsc2UgZm9yKGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCk7bGVuZ3RoPmluZGV4O2luZGV4Kyspe3Jlc3VsdFtpbmRleF09bWFwcGluZz9mKE9baW5kZXhdLGluZGV4KTpPW2luZGV4XX1yZXN1bHQubGVuZ3RoPWluZGV4O3JldHVybiByZXN1bHR9LG9mOmZ1bmN0aW9uKCl7dmFyIGluZGV4PTAsbGVuZ3RoPWFyZ3VtZW50cy5sZW5ndGgscmVzdWx0PW5ldyhnZW5lcmljKHRoaXMsQXJyYXkpKShsZW5ndGgpO3doaWxlKGxlbmd0aD5pbmRleClyZXN1bHRbaW5kZXhdPWFyZ3VtZW50c1tpbmRleCsrXTtyZXN1bHQubGVuZ3RoPWxlbmd0aDtyZXR1cm4gcmVzdWx0fX0pOyRkZWZpbmUoUFJPVE8sQVJSQVkse2NvcHlXaXRoaW46ZnVuY3Rpb24odGFyZ2V0LHN0YXJ0LGVuZCl7dmFyIE89T2JqZWN0KGFzc2VydERlZmluZWQodGhpcykpLGxlbj10b0xlbmd0aChPLmxlbmd0aCksdG89dG9JbmRleCh0YXJnZXQsbGVuKSxmcm9tPXRvSW5kZXgoc3RhcnQsbGVuKSxmaW49ZW5kPT09dW5kZWZpbmVkP2xlbjp0b0luZGV4KGVuZCxsZW4pLGNvdW50PW1pbihmaW4tZnJvbSxsZW4tdG8pLGluYz0xO2lmKGZyb208dG8mJnRvPGZyb20rY291bnQpe2luYz0tMTtmcm9tPWZyb20rY291bnQtMTt0bz10bytjb3VudC0xfXdoaWxlKGNvdW50LS0+MCl7aWYoZnJvbSBpbiBPKU9bdG9dPU9bZnJvbV07ZWxzZSBkZWxldGUgT1t0b107dG8rPWluYztmcm9tKz1pbmN9cmV0dXJuIE99LGZpbGw6ZnVuY3Rpb24odmFsdWUsc3RhcnQsZW5kKXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZCh0aGlzKSksbGVuZ3RoPXRvTGVuZ3RoKE8ubGVuZ3RoKSxpbmRleD10b0luZGV4KHN0YXJ0LGxlbmd0aCksZW5kUG9zPWVuZD09PXVuZGVmaW5lZD9sZW5ndGg6dG9JbmRleChlbmQsbGVuZ3RoKTt3aGlsZShlbmRQb3M+aW5kZXgpT1tpbmRleCsrXT12YWx1ZTtyZXR1cm4gT30sZmluZDpjcmVhdGVBcnJheU1ldGhvZCg1KSxmaW5kSW5kZXg6Y3JlYXRlQXJyYXlNZXRob2QoNil9KTtkZWZpbmVTdGRJdGVyYXRvcnMoQXJyYXksQVJSQVksZnVuY3Rpb24oaXRlcmF0ZWQsa2luZCl7c2V0KHRoaXMsSVRFUix7bzpFUzVPYmplY3QoaXRlcmF0ZWQpLGk6MCxrOmtpbmR9KX0sZnVuY3Rpb24oKXt2YXIgaXRlcj10aGlzW0lURVJdLE89aXRlci5vLGtpbmQ9aXRlci5rLGluZGV4PWl0ZXIuaSsrO2lmKCFPfHxpbmRleD49Ty5sZW5ndGgpcmV0dXJuIGl0ZXIubz11bmRlZmluZWQsaXRlclJlc3VsdCgxKTtpZihraW5kPT1LRVkpcmV0dXJuIGl0ZXJSZXN1bHQoMCxpbmRleCk7aWYoa2luZD09VkFMVUUpcmV0dXJuIGl0ZXJSZXN1bHQoMCxPW2luZGV4XSk7cmV0dXJuIGl0ZXJSZXN1bHQoMCxbaW5kZXgsT1tpbmRleF1dKX0sVkFMVUUpO0l0ZXJhdG9yc1tBUkdVTUVOVFNdPUl0ZXJhdG9yc1tBUlJBWV07c2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sXCJKU09OXCIsdHJ1ZSk7aWYoZnJhbWV3b3JrKXt0bXBbU1lNQk9MX1RBR109RE9UO2lmKGNvZih0bXApIT1ET1QpaGlkZGVuKE9iamVjdFByb3RvLFRPX1NUUklORyxmdW5jdGlvbigpe3JldHVyblwiW29iamVjdCBcIitjbGFzc29mKHRoaXMpK1wiXVwifSk7aWYoLy4vZy5mbGFncyE9XCJnXCIpZGVmaW5lUHJvcGVydHkoUmVnRXhwW1BST1RPVFlQRV0sXCJmbGFnc1wiLHtjb25maWd1cmFibGU6dHJ1ZSxnZXQ6Y3JlYXRlUmVwbGFjZXIoL14uKlxcLyhcXHcqKSQvLFwiJDFcIil9KX19KGlzRmluaXRlLHt9KTtpc0Z1bmN0aW9uKHNldEltbWVkaWF0ZSkmJmlzRnVuY3Rpb24oY2xlYXJJbW1lZGlhdGUpfHxmdW5jdGlvbihPTlJFQURZU1RBVEVDSEFOR0Upe3ZhciBwb3N0TWVzc2FnZT1nbG9iYWwucG9zdE1lc3NhZ2UsYWRkRXZlbnRMaXN0ZW5lcj1nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcixNZXNzYWdlQ2hhbm5lbD1nbG9iYWwuTWVzc2FnZUNoYW5uZWwsY291bnRlcj0wLHF1ZXVlPXt9LGRlZmVyLGNoYW5uZWwscG9ydDtzZXRJbW1lZGlhdGU9ZnVuY3Rpb24oZm4pe3ZhciBhcmdzPVtdLGk9MTt3aGlsZShhcmd1bWVudHMubGVuZ3RoPmkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtxdWV1ZVsrK2NvdW50ZXJdPWZ1bmN0aW9uKCl7aW52b2tlKGlzRnVuY3Rpb24oZm4pP2ZuOkZ1bmN0aW9uKGZuKSxhcmdzKX07ZGVmZXIoY291bnRlcik7cmV0dXJuIGNvdW50ZXJ9O2NsZWFySW1tZWRpYXRlPWZ1bmN0aW9uKGlkKXtkZWxldGUgcXVldWVbaWRdfTtmdW5jdGlvbiBydW4oaWQpe2lmKGhhcyhxdWV1ZSxpZCkpe3ZhciBmbj1xdWV1ZVtpZF07ZGVsZXRlIHF1ZXVlW2lkXTtmbigpfX1mdW5jdGlvbiBsaXN0bmVyKGV2ZW50KXtydW4oZXZlbnQuZGF0YSl9aWYoTk9ERSl7ZGVmZXI9ZnVuY3Rpb24oaWQpe25leHRUaWNrKHBhcnQuY2FsbChydW4saWQpKX19ZWxzZSBpZihhZGRFdmVudExpc3RlbmVyJiZpc0Z1bmN0aW9uKHBvc3RNZXNzYWdlKSYmIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtkZWZlcj1mdW5jdGlvbihpZCl7cG9zdE1lc3NhZ2UoaWQsXCIqXCIpfTthZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGxpc3RuZXIsZmFsc2UpfWVsc2UgaWYoaXNGdW5jdGlvbihNZXNzYWdlQ2hhbm5lbCkpe2NoYW5uZWw9bmV3IE1lc3NhZ2VDaGFubmVsO3BvcnQ9Y2hhbm5lbC5wb3J0MjtjaGFubmVsLnBvcnQxLm9ubWVzc2FnZT1saXN0bmVyO2RlZmVyPWN0eChwb3J0LnBvc3RNZXNzYWdlLHBvcnQsMSl9ZWxzZSBpZihkb2N1bWVudCYmT05SRUFEWVNUQVRFQ0hBTkdFIGluIGRvY3VtZW50W0NSRUFURV9FTEVNRU5UXShcInNjcmlwdFwiKSl7ZGVmZXI9ZnVuY3Rpb24oaWQpe2h0bWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnRbQ1JFQVRFX0VMRU1FTlRdKFwic2NyaXB0XCIpKVtPTlJFQURZU1RBVEVDSEFOR0VdPWZ1bmN0aW9uKCl7aHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtydW4oaWQpfX19ZWxzZXtkZWZlcj1mdW5jdGlvbihpZCl7c2V0VGltZW91dChwYXJ0LmNhbGwocnVuLGlkKSwwKX19fShcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiKTskZGVmaW5lKEdMT0JBTCtCSU5ELHtzZXRJbW1lZGlhdGU6c2V0SW1tZWRpYXRlLGNsZWFySW1tZWRpYXRlOmNsZWFySW1tZWRpYXRlfSk7IWZ1bmN0aW9uKFByb21pc2UsdGVzdCl7aXNGdW5jdGlvbihQcm9taXNlKSYmaXNGdW5jdGlvbihQcm9taXNlLnJlc29sdmUpJiZQcm9taXNlLnJlc29sdmUodGVzdD1uZXcgUHJvbWlzZShGdW5jdGlvbigpKSk9PXRlc3R8fGZ1bmN0aW9uKGFzYXAsREVGKXtmdW5jdGlvbiBpc1RoZW5hYmxlKG8pe3ZhciB0aGVuO2lmKGlzT2JqZWN0KG8pKXRoZW49by50aGVuO3JldHVybiBpc0Z1bmN0aW9uKHRoZW4pP3RoZW46ZmFsc2V9ZnVuY3Rpb24gbm90aWZ5KGRlZil7dmFyIGNoYWluPWRlZi5jaGFpbjtjaGFpbi5sZW5ndGgmJmFzYXAoZnVuY3Rpb24oKXt2YXIgbXNnPWRlZi5tc2csb2s9ZGVmLnN0YXRlPT0xLGk9MDt3aGlsZShjaGFpbi5sZW5ndGg+aSkhZnVuY3Rpb24ocmVhY3Qpe3ZhciBjYj1vaz9yZWFjdC5vazpyZWFjdC5mYWlsLHJldCx0aGVuO3RyeXtpZihjYil7cmV0PWNiPT09dHJ1ZT9tc2c6Y2IobXNnKTtpZihyZXQ9PT1yZWFjdC5QKXtyZWFjdC5yZWooVHlwZUVycm9yKFBST01JU0UrXCItY2hhaW4gY3ljbGVcIikpfWVsc2UgaWYodGhlbj1pc1RoZW5hYmxlKHJldCkpe3RoZW4uY2FsbChyZXQscmVhY3QucmVzLHJlYWN0LnJlail9ZWxzZSByZWFjdC5yZXMocmV0KX1lbHNlIHJlYWN0LnJlaihtc2cpfWNhdGNoKGVycil7cmVhY3QucmVqKGVycil9fShjaGFpbltpKytdKTtjaGFpbi5sZW5ndGg9MH0pfWZ1bmN0aW9uIHJlc29sdmUobXNnKXt2YXIgZGVmPXRoaXMsdGhlbix3cmFwcGVyO2lmKGRlZi5kb25lKXJldHVybjtkZWYuZG9uZT10cnVlO2RlZj1kZWYuZGVmfHxkZWY7dHJ5e2lmKHRoZW49aXNUaGVuYWJsZShtc2cpKXt3cmFwcGVyPXtkZWY6ZGVmLGRvbmU6ZmFsc2V9O3RoZW4uY2FsbChtc2csY3R4KHJlc29sdmUsd3JhcHBlciwxKSxjdHgocmVqZWN0LHdyYXBwZXIsMSkpfWVsc2V7ZGVmLm1zZz1tc2c7ZGVmLnN0YXRlPTE7bm90aWZ5KGRlZil9fWNhdGNoKGVycil7cmVqZWN0LmNhbGwod3JhcHBlcnx8e2RlZjpkZWYsZG9uZTpmYWxzZX0sZXJyKX19ZnVuY3Rpb24gcmVqZWN0KG1zZyl7dmFyIGRlZj10aGlzO2lmKGRlZi5kb25lKXJldHVybjtkZWYuZG9uZT10cnVlO2RlZj1kZWYuZGVmfHxkZWY7ZGVmLm1zZz1tc2c7ZGVmLnN0YXRlPTI7bm90aWZ5KGRlZil9UHJvbWlzZT1mdW5jdGlvbihleGVjdXRvcil7YXNzZXJ0RnVuY3Rpb24oZXhlY3V0b3IpO2Fzc2VydEluc3RhbmNlKHRoaXMsUHJvbWlzZSxQUk9NSVNFKTt2YXIgZGVmPXtjaGFpbjpbXSxzdGF0ZTowLGRvbmU6ZmFsc2UsbXNnOnVuZGVmaW5lZH07aGlkZGVuKHRoaXMsREVGLGRlZik7dHJ5e2V4ZWN1dG9yKGN0eChyZXNvbHZlLGRlZiwxKSxjdHgocmVqZWN0LGRlZiwxKSl9Y2F0Y2goZXJyKXtyZWplY3QuY2FsbChkZWYsZXJyKX19O2Fzc2lnbkhpZGRlbihQcm9taXNlW1BST1RPVFlQRV0se3RoZW46ZnVuY3Rpb24ob25GdWxmaWxsZWQsb25SZWplY3RlZCl7dmFyIHJlYWN0PXtvazppc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKT9vbkZ1bGZpbGxlZDp0cnVlLGZhaWw6aXNGdW5jdGlvbihvblJlamVjdGVkKT9vblJlamVjdGVkOmZhbHNlfSxQPXJlYWN0LlA9bmV3IHRoaXNbQ09OU1RSVUNUT1JdKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtyZWFjdC5yZXM9YXNzZXJ0RnVuY3Rpb24ocmVzb2x2ZSk7cmVhY3QucmVqPWFzc2VydEZ1bmN0aW9uKHJlamVjdCl9KSxkZWY9dGhpc1tERUZdO2RlZi5jaGFpbi5wdXNoKHJlYWN0KTtkZWYuc3RhdGUmJm5vdGlmeShkZWYpO3JldHVybiBQfSxcImNhdGNoXCI6ZnVuY3Rpb24ob25SZWplY3RlZCl7cmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsb25SZWplY3RlZCl9fSk7YXNzaWduSGlkZGVuKFByb21pc2Use2FsbDpmdW5jdGlvbihpdGVyYWJsZSl7dmFyIFByb21pc2U9dGhpcyx2YWx1ZXM9W107cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxwdXNoLHZhbHVlcyk7dmFyIHJlbWFpbmluZz12YWx1ZXMubGVuZ3RoLHJlc3VsdHM9QXJyYXkocmVtYWluaW5nKTtpZihyZW1haW5pbmcpZm9yRWFjaC5jYWxsKHZhbHVlcyxmdW5jdGlvbihwcm9taXNlLGluZGV4KXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7cmVzdWx0c1tpbmRleF09dmFsdWU7LS1yZW1haW5pbmd8fHJlc29sdmUocmVzdWx0cyl9LHJlamVjdCl9KTtlbHNlIHJlc29sdmUocmVzdWx0cyl9KX0scmFjZTpmdW5jdGlvbihpdGVyYWJsZSl7dmFyIFByb21pc2U9dGhpcztyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe2Zvck9mKGl0ZXJhYmxlLGZhbHNlLGZ1bmN0aW9uKHByb21pc2Upe1Byb21pc2UucmVzb2x2ZShwcm9taXNlKS50aGVuKHJlc29sdmUscmVqZWN0KX0pfSl9LHJlamVjdDpmdW5jdGlvbihyKXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3JlamVjdChyKX0pfSxyZXNvbHZlOmZ1bmN0aW9uKHgpe3JldHVybiBpc09iamVjdCh4KSYmZ2V0UHJvdG90eXBlT2YoeCk9PT10aGlzW1BST1RPVFlQRV0/eDpuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7cmVzb2x2ZSh4KX0pfX0pfShuZXh0VGlja3x8c2V0SW1tZWRpYXRlLHNhZmVTeW1ib2woXCJkZWZcIikpO3NldFRvU3RyaW5nVGFnKFByb21pc2UsUFJPTUlTRSk7JGRlZmluZShHTE9CQUwrRk9SQ0VEKiFpc05hdGl2ZShQcm9taXNlKSx7UHJvbWlzZTpQcm9taXNlfSl9KGdsb2JhbFtQUk9NSVNFXSk7IWZ1bmN0aW9uKCl7dmFyIFVJRD1zYWZlU3ltYm9sKFwidWlkXCIpLERBVEE9c2FmZVN5bWJvbChcImRhdGFcIiksV0VBSz1zYWZlU3ltYm9sKFwid2Vha1wiKSxMQVNUPXNhZmVTeW1ib2woXCJsYXN0XCIpLEZJUlNUPXNhZmVTeW1ib2woXCJmaXJzdFwiKSxTSVpFPURFU0M/c2FmZVN5bWJvbChcInNpemVcIik6XCJzaXplXCIsdWlkPTA7ZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihDLE5BTUUsbWV0aG9kcyxjb21tb25NZXRob2RzLGlzTWFwLGlzV2Vhayl7dmFyIEFEREVSPWlzTWFwP1wic2V0XCI6XCJhZGRcIixwcm90bz1DJiZDW1BST1RPVFlQRV0sTz17fTtmdW5jdGlvbiBpbml0RnJvbUl0ZXJhYmxlKHRoYXQsaXRlcmFibGUpe2lmKGl0ZXJhYmxlIT11bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsaXNNYXAsdGhhdFtBRERFUl0sdGhhdCk7cmV0dXJuIHRoYXR9ZnVuY3Rpb24gZml4U1ZaKGtleSxjaGFpbil7dmFyIG1ldGhvZD1wcm90b1trZXldO2ZyYW1ld29yayYmaGlkZGVuKHByb3RvLGtleSxmdW5jdGlvbihhLGIpe3ZhciByZXN1bHQ9bWV0aG9kLmNhbGwodGhpcyxhPT09MD8wOmEsYik7cmV0dXJuIGNoYWluP3RoaXM6cmVzdWx0fSl9aWYoIWlzTmF0aXZlKEMpfHwhKGlzV2Vha3x8IUJVR0dZX0lURVJBVE9SUyYmaGFzKHByb3RvLFwiZW50cmllc1wiKSkpe0M9aXNXZWFrP2Z1bmN0aW9uKGl0ZXJhYmxlKXthc3NlcnRJbnN0YW5jZSh0aGlzLEMsTkFNRSk7c2V0KHRoaXMsVUlELHVpZCsrKTtpbml0RnJvbUl0ZXJhYmxlKHRoaXMsaXRlcmFibGUpfTpmdW5jdGlvbihpdGVyYWJsZSl7dmFyIHRoYXQ9dGhpczthc3NlcnRJbnN0YW5jZSh0aGF0LEMsTkFNRSk7c2V0KHRoYXQsREFUQSxjcmVhdGUobnVsbCkpO3NldCh0aGF0LFNJWkUsMCk7c2V0KHRoYXQsTEFTVCx1bmRlZmluZWQpO3NldCh0aGF0LEZJUlNULHVuZGVmaW5lZCk7aW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKX07YXNzaWduSGlkZGVuKGFzc2lnbkhpZGRlbihDW1BST1RPVFlQRV0sbWV0aG9kcyksY29tbW9uTWV0aG9kcyk7aXNXZWFrfHxkZWZpbmVQcm9wZXJ0eShDW1BST1RPVFlQRV0sXCJzaXplXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBhc3NlcnREZWZpbmVkKHRoaXNbU0laRV0pfX0pfWVsc2V7dmFyIE5hdGl2ZT1DLGluc3Q9bmV3IEMsY2hhaW49aW5zdFtBRERFUl0oaXNXZWFrP3t9Oi0wLDEpLGJ1Z2d5WmVybztpZighTkFUSVZFX0lURVJBVE9SU3x8IUMubGVuZ3RoKXtDPWZ1bmN0aW9uKGl0ZXJhYmxlKXthc3NlcnRJbnN0YW5jZSh0aGlzLEMsTkFNRSk7cmV0dXJuIGluaXRGcm9tSXRlcmFibGUobmV3IE5hdGl2ZSxpdGVyYWJsZSl9O0NbUFJPVE9UWVBFXT1wcm90b31pc1dlYWt8fGluc3RbRk9SX0VBQ0hdKGZ1bmN0aW9uKHZhbCxrZXkpe2J1Z2d5WmVybz0xL2tleT09PS1JbmZpbml0eX0pO2lmKGJ1Z2d5WmVybyl7Zml4U1ZaKFwiZGVsZXRlXCIpO2ZpeFNWWihcImhhc1wiKTtpc01hcCYmZml4U1ZaKFwiZ2V0XCIpfWlmKGJ1Z2d5WmVyb3x8Y2hhaW4hPT1pbnN0KWZpeFNWWihBRERFUix0cnVlKX1zZXRUb1N0cmluZ1RhZyhDLE5BTUUpO09bTkFNRV09QzskZGVmaW5lKEdMT0JBTCtXUkFQK0ZPUkNFRCohaXNOYXRpdmUoQyksTyk7aXNXZWFrfHxkZWZpbmVTdGRJdGVyYXRvcnMoQyxOQU1FLGZ1bmN0aW9uKGl0ZXJhdGVkLGtpbmQpe3NldCh0aGlzLElURVIse286aXRlcmF0ZWQsazpraW5kfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxPPWl0ZXIubyxraW5kPWl0ZXIuayxlbnRyeT1pdGVyLmw7d2hpbGUoZW50cnkmJmVudHJ5LnIpZW50cnk9ZW50cnkucDtpZighT3x8IShpdGVyLmw9ZW50cnk9ZW50cnk/ZW50cnkubjpPW0ZJUlNUXSkpcmV0dXJuIGl0ZXIubz11bmRlZmluZWQsaXRlclJlc3VsdCgxKTtpZihraW5kPT1LRVkpcmV0dXJuIGl0ZXJSZXN1bHQoMCxlbnRyeS5rKTtpZihraW5kPT1WQUxVRSlyZXR1cm4gaXRlclJlc3VsdCgwLGVudHJ5LnYpO3JldHVybiBpdGVyUmVzdWx0KDAsW2VudHJ5LmssZW50cnkudl0pfSxpc01hcD9LRVkrVkFMVUU6VkFMVUUpO3JldHVybiBDfWZ1bmN0aW9uIGZhc3RLZXkoaXQsY3JlYXRlKXtpZighaXNPYmplY3QoaXQpKXJldHVybih0eXBlb2YgaXQ9PVwic3RyaW5nXCI/XCJTXCI6XCJQXCIpK2l0O2lmKCFoYXMoaXQsVUlEKSl7aWYoY3JlYXRlKWhpZGRlbihpdCxVSUQsKyt1aWQpO2Vsc2UgcmV0dXJuXCJcIn1yZXR1cm5cIk9cIitpdFtVSURdfWZ1bmN0aW9uIGRlZih0aGF0LGtleSx2YWx1ZSl7dmFyIGluZGV4PWZhc3RLZXkoa2V5LHRydWUpLGRhdGE9dGhhdFtEQVRBXSxsYXN0PXRoYXRbTEFTVF0sZW50cnk7aWYoaW5kZXggaW4gZGF0YSlkYXRhW2luZGV4XS52PXZhbHVlO2Vsc2V7ZW50cnk9ZGF0YVtpbmRleF09e2s6a2V5LHY6dmFsdWUscDpsYXN0fTtpZighdGhhdFtGSVJTVF0pdGhhdFtGSVJTVF09ZW50cnk7aWYobGFzdClsYXN0Lm49ZW50cnk7dGhhdFtMQVNUXT1lbnRyeTt0aGF0W1NJWkVdKyt9cmV0dXJuIHRoYXR9ZnVuY3Rpb24gZGVsKHRoYXQsaW5kZXgpe3ZhciBkYXRhPXRoYXRbREFUQV0sZW50cnk9ZGF0YVtpbmRleF0sbmV4dD1lbnRyeS5uLHByZXY9ZW50cnkucDtkZWxldGUgZGF0YVtpbmRleF07ZW50cnkucj10cnVlO2lmKHByZXYpcHJldi5uPW5leHQ7aWYobmV4dCluZXh0LnA9cHJldjtpZih0aGF0W0ZJUlNUXT09ZW50cnkpdGhhdFtGSVJTVF09bmV4dDtpZih0aGF0W0xBU1RdPT1lbnRyeSl0aGF0W0xBU1RdPXByZXY7dGhhdFtTSVpFXS0tfXZhciBjb2xsZWN0aW9uTWV0aG9kcz17Y2xlYXI6ZnVuY3Rpb24oKXtmb3IodmFyIGluZGV4IGluIHRoaXNbREFUQV0pZGVsKHRoaXMsaW5kZXgpfSxcImRlbGV0ZVwiOmZ1bmN0aW9uKGtleSl7dmFyIGluZGV4PWZhc3RLZXkoa2V5KSxjb250YWlucz1pbmRleCBpbiB0aGlzW0RBVEFdO2lmKGNvbnRhaW5zKWRlbCh0aGlzLGluZGV4KTtyZXR1cm4gY29udGFpbnN9LGZvckVhY2g6ZnVuY3Rpb24oY2FsbGJhY2tmbix0aGF0KXt2YXIgZj1jdHgoY2FsbGJhY2tmbix0aGF0LDMpLGVudHJ5O3doaWxlKGVudHJ5PWVudHJ5P2VudHJ5Lm46dGhpc1tGSVJTVF0pe2YoZW50cnkudixlbnRyeS5rLHRoaXMpO3doaWxlKGVudHJ5JiZlbnRyeS5yKWVudHJ5PWVudHJ5LnB9fSxoYXM6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gZmFzdEtleShrZXkpaW4gdGhpc1tEQVRBXX19O01hcD1nZXRDb2xsZWN0aW9uKE1hcCxNQVAse2dldDpmdW5jdGlvbihrZXkpe3ZhciBlbnRyeT10aGlzW0RBVEFdW2Zhc3RLZXkoa2V5KV07cmV0dXJuIGVudHJ5JiZlbnRyeS52fSxzZXQ6ZnVuY3Rpb24oa2V5LHZhbHVlKXtyZXR1cm4gZGVmKHRoaXMsa2V5PT09MD8wOmtleSx2YWx1ZSl9fSxjb2xsZWN0aW9uTWV0aG9kcyx0cnVlKTtTZXQ9Z2V0Q29sbGVjdGlvbihTZXQsU0VULHthZGQ6ZnVuY3Rpb24odmFsdWUpe3JldHVybiBkZWYodGhpcyx2YWx1ZT12YWx1ZT09PTA/MDp2YWx1ZSx2YWx1ZSl9fSxjb2xsZWN0aW9uTWV0aG9kcyk7ZnVuY3Rpb24gc2V0V2Vhayh0aGF0LGtleSx2YWx1ZSl7aGFzKGFzc2VydE9iamVjdChrZXkpLFdFQUspfHxoaWRkZW4oa2V5LFdFQUsse30pO2tleVtXRUFLXVt0aGF0W1VJRF1dPXZhbHVlO3JldHVybiB0aGF0fWZ1bmN0aW9uIGhhc1dlYWsoa2V5KXtyZXR1cm4gaXNPYmplY3Qoa2V5KSYmaGFzKGtleSxXRUFLKSYmaGFzKGtleVtXRUFLXSx0aGlzW1VJRF0pfXZhciB3ZWFrTWV0aG9kcz17XCJkZWxldGVcIjpmdW5jdGlvbihrZXkpe3JldHVybiBoYXNXZWFrLmNhbGwodGhpcyxrZXkpJiZkZWxldGUga2V5W1dFQUtdW3RoaXNbVUlEXV19LGhhczpoYXNXZWFrfTtXZWFrTWFwPWdldENvbGxlY3Rpb24oV2Vha01hcCxXRUFLTUFQLHtnZXQ6ZnVuY3Rpb24oa2V5KXtpZihpc09iamVjdChrZXkpJiZoYXMoa2V5LFdFQUspKXJldHVybiBrZXlbV0VBS11bdGhpc1tVSURdXX0sc2V0OmZ1bmN0aW9uKGtleSx2YWx1ZSl7cmV0dXJuIHNldFdlYWsodGhpcyxrZXksdmFsdWUpfX0sd2Vha01ldGhvZHMsdHJ1ZSx0cnVlKTtXZWFrU2V0PWdldENvbGxlY3Rpb24oV2Vha1NldCxXRUFLU0VULHthZGQ6ZnVuY3Rpb24odmFsdWUpe3JldHVybiBzZXRXZWFrKHRoaXMsdmFsdWUsdHJ1ZSl9fSx3ZWFrTWV0aG9kcyxmYWxzZSx0cnVlKX0oKTshZnVuY3Rpb24oKXskZGVmaW5lKFBST1RPLEFSUkFZLHtpbmNsdWRlczpjcmVhdGVBcnJheUNvbnRhaW5zKHRydWUpfSk7JGRlZmluZShQUk9UTyxTVFJJTkcse2F0OmNyZWF0ZVBvaW50QXQodHJ1ZSl9KTtmdW5jdGlvbiBjcmVhdGVPYmplY3RUb0FycmF5KGlzRW50cmllcyl7cmV0dXJuIGZ1bmN0aW9uKG9iamVjdCl7dmFyIE89RVM1T2JqZWN0KG9iamVjdCksa2V5cz1nZXRLZXlzKG9iamVjdCksbGVuZ3RoPWtleXMubGVuZ3RoLGk9MCxyZXN1bHQ9QXJyYXkobGVuZ3RoKSxrZXk7aWYoaXNFbnRyaWVzKXdoaWxlKGxlbmd0aD5pKXJlc3VsdFtpXT1ba2V5PWtleXNbaSsrXSxPW2tleV1dO2Vsc2Ugd2hpbGUobGVuZ3RoPmkpcmVzdWx0W2ldPU9ba2V5c1tpKytdXTtyZXR1cm4gcmVzdWx0fX0kZGVmaW5lKFNUQVRJQyxPQkpFQ1Qse3ZhbHVlczpjcmVhdGVPYmplY3RUb0FycmF5KGZhbHNlKSxlbnRyaWVzOmNyZWF0ZU9iamVjdFRvQXJyYXkodHJ1ZSl9KTskZGVmaW5lKFNUQVRJQyxSRUdFWFAse2VzY2FwZTpjcmVhdGVSZXBsYWNlcigvKFtcXFxcXFwtW1xcXXt9KCkqKz8uLF4kfF0pL2csXCJcXFxcJDFcIix0cnVlKX0pfSgpOyFmdW5jdGlvbihSRUZFUkVOQ0Upe1JFRkVSRU5DRV9HRVQ9Z2V0V2VsbEtub3duU3ltYm9sKFJFRkVSRU5DRStcIkdldFwiLHRydWUpO3ZhciBSRUZFUkVOQ0VfU0VUPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrU0VULHRydWUpLFJFRkVSRU5DRV9ERUxFVEU9Z2V0V2VsbEtub3duU3ltYm9sKFJFRkVSRU5DRStcIkRlbGV0ZVwiLHRydWUpOyRkZWZpbmUoU1RBVElDLFNZTUJPTCx7cmVmZXJlbmNlR2V0OlJFRkVSRU5DRV9HRVQscmVmZXJlbmNlU2V0OlJFRkVSRU5DRV9TRVQscmVmZXJlbmNlRGVsZXRlOlJFRkVSRU5DRV9ERUxFVEV9KTtoaWRkZW4oRnVuY3Rpb25Qcm90byxSRUZFUkVOQ0VfR0VULHJldHVyblRoaXMpO2Z1bmN0aW9uIHNldE1hcE1ldGhvZHMoQ29uc3RydWN0b3Ipe2lmKENvbnN0cnVjdG9yKXt2YXIgTWFwUHJvdG89Q29uc3RydWN0b3JbUFJPVE9UWVBFXTtoaWRkZW4oTWFwUHJvdG8sUkVGRVJFTkNFX0dFVCxNYXBQcm90by5nZXQpO2hpZGRlbihNYXBQcm90byxSRUZFUkVOQ0VfU0VULE1hcFByb3RvLnNldCk7aGlkZGVuKE1hcFByb3RvLFJFRkVSRU5DRV9ERUxFVEUsTWFwUHJvdG9bXCJkZWxldGVcIl0pfX1zZXRNYXBNZXRob2RzKE1hcCk7c2V0TWFwTWV0aG9kcyhXZWFrTWFwKX0oXCJyZWZlcmVuY2VcIik7IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gc2V0QXJyYXlTdGF0aWNzKGtleXMsbGVuZ3RoKXskZGVmaW5lKFNUQVRJQyxBUlJBWSx0dXJuLmNhbGwoYXJyYXkoa2V5cyksZnVuY3Rpb24obWVtbyxrZXkpe2lmKGtleSBpbiBBcnJheVByb3RvKW1lbW9ba2V5XT1jdHgoY2FsbCxBcnJheVByb3RvW2tleV0sbGVuZ3RoKX0se30pKX1zZXRBcnJheVN0YXRpY3MoXCJwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzXCIsMSk7c2V0QXJyYXlTdGF0aWNzKFwiaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlc1wiLDMpO3NldEFycmF5U3RhdGljcyhcImpvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZixcIitcInJlZHVjZSxyZWR1Y2VSaWdodCxjb3B5V2l0aGluLGZpbGwsdHVyblwiKX0oKX0oRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSx0cnVlKX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyFmdW5jdGlvbigpe3ZhciBoYXNPd249T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgdW5kZWZpbmVkO3ZhciBpdGVyYXRvclN5bWJvbD10eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZTeW1ib2wuaXRlcmF0b3J8fFwiQEBpdGVyYXRvclwiO2lmKHR5cGVvZiByZWdlbmVyYXRvclJ1bnRpbWU9PT1cIm9iamVjdFwiKXtyZXR1cm59dmFyIHJ1bnRpbWU9cmVnZW5lcmF0b3JSdW50aW1lPXR5cGVvZiBleHBvcnRzPT09XCJ1bmRlZmluZWRcIj97fTpleHBvcnRzO2Z1bmN0aW9uIHdyYXAoaW5uZXJGbixvdXRlckZuLHNlbGYsdHJ5TGlzdCl7cmV0dXJuIG5ldyBHZW5lcmF0b3IoaW5uZXJGbixvdXRlckZuLHNlbGZ8fG51bGwsdHJ5TGlzdHx8W10pfXJ1bnRpbWUud3JhcD13cmFwO3ZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0PVwic3VzcGVuZGVkU3RhcnRcIjt2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZD1cInN1c3BlbmRlZFlpZWxkXCI7dmFyIEdlblN0YXRlRXhlY3V0aW5nPVwiZXhlY3V0aW5nXCI7dmFyIEdlblN0YXRlQ29tcGxldGVkPVwiY29tcGxldGVkXCI7dmFyIENvbnRpbnVlU2VudGluZWw9e307ZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKXt9ZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKXt9dmFyIEdwPUdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZT1HZW5lcmF0b3IucHJvdG90eXBlO0dlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZT1HcC5jb25zdHJ1Y3Rvcj1HZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1HZW5lcmF0b3JGdW5jdGlvbjtHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZT1cIkdlbmVyYXRvckZ1bmN0aW9uXCI7cnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uPWZ1bmN0aW9uKGdlbkZ1bil7dmFyIGN0b3I9dHlwZW9mIGdlbkZ1bj09PVwiZnVuY3Rpb25cIiYmZ2VuRnVuLmNvbnN0cnVjdG9yO3JldHVybiBjdG9yP2N0b3I9PT1HZW5lcmF0b3JGdW5jdGlvbnx8KGN0b3IuZGlzcGxheU5hbWV8fGN0b3IubmFtZSk9PT1cIkdlbmVyYXRvckZ1bmN0aW9uXCI6ZmFsc2V9O3J1bnRpbWUubWFyaz1mdW5jdGlvbihnZW5GdW4pe2dlbkZ1bi5fX3Byb3RvX189R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7Z2VuRnVuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEdwKTtyZXR1cm4gZ2VuRnVufTtydW50aW1lLmFzeW5jPWZ1bmN0aW9uKGlubmVyRm4sb3V0ZXJGbixzZWxmLHRyeUxpc3Qpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7dmFyIGdlbmVyYXRvcj13cmFwKGlubmVyRm4sb3V0ZXJGbixzZWxmLHRyeUxpc3QpO3ZhciBjYWxsTmV4dD1zdGVwLmJpbmQoZ2VuZXJhdG9yLm5leHQpO3ZhciBjYWxsVGhyb3c9c3RlcC5iaW5kKGdlbmVyYXRvcltcInRocm93XCJdKTtmdW5jdGlvbiBzdGVwKGFyZyl7dHJ5e3ZhciBpbmZvPXRoaXMoYXJnKTt2YXIgdmFsdWU9aW5mby52YWx1ZX1jYXRjaChlcnJvcil7cmV0dXJuIHJlamVjdChlcnJvcil9aWYoaW5mby5kb25lKXtyZXNvbHZlKHZhbHVlKX1lbHNle1Byb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihjYWxsTmV4dCxjYWxsVGhyb3cpfX1jYWxsTmV4dCgpfSl9O2Z1bmN0aW9uIEdlbmVyYXRvcihpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KXt2YXIgZ2VuZXJhdG9yPW91dGVyRm4/T2JqZWN0LmNyZWF0ZShvdXRlckZuLnByb3RvdHlwZSk6dGhpczt2YXIgY29udGV4dD1uZXcgQ29udGV4dCh0cnlMaXN0KTt2YXIgc3RhdGU9R2VuU3RhdGVTdXNwZW5kZWRTdGFydDtmdW5jdGlvbiBpbnZva2UobWV0aG9kLGFyZyl7aWYoc3RhdGU9PT1HZW5TdGF0ZUV4ZWN1dGluZyl7dGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKX1pZihzdGF0ZT09PUdlblN0YXRlQ29tcGxldGVkKXtyZXR1cm4gZG9uZVJlc3VsdCgpfXdoaWxlKHRydWUpe3ZhciBkZWxlZ2F0ZT1jb250ZXh0LmRlbGVnYXRlO2lmKGRlbGVnYXRlKXt0cnl7dmFyIGluZm89ZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kXShhcmcpO21ldGhvZD1cIm5leHRcIjthcmc9dW5kZWZpbmVkfWNhdGNoKHVuY2F1Z2h0KXtjb250ZXh0LmRlbGVnYXRlPW51bGw7bWV0aG9kPVwidGhyb3dcIjthcmc9dW5jYXVnaHQ7Y29udGludWV9aWYoaW5mby5kb25lKXtjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdPWluZm8udmFsdWU7Y29udGV4dC5uZXh0PWRlbGVnYXRlLm5leHRMb2N9ZWxzZXtzdGF0ZT1HZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO3JldHVybiBpbmZvfWNvbnRleHQuZGVsZWdhdGU9bnVsbH1pZihtZXRob2Q9PT1cIm5leHRcIil7aWYoc3RhdGU9PT1HZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0JiZ0eXBlb2YgYXJnIT09XCJ1bmRlZmluZWRcIil7dGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHQgdG8gc2VuZCBcIitKU09OLnN0cmluZ2lmeShhcmcpK1wiIHRvIG5ld2Jvcm4gZ2VuZXJhdG9yXCIpfWlmKHN0YXRlPT09R2VuU3RhdGVTdXNwZW5kZWRZaWVsZCl7Y29udGV4dC5zZW50PWFyZ31lbHNle2RlbGV0ZSBjb250ZXh0LnNlbnR9fWVsc2UgaWYobWV0aG9kPT09XCJ0aHJvd1wiKXtpZihzdGF0ZT09PUdlblN0YXRlU3VzcGVuZGVkU3RhcnQpe3N0YXRlPUdlblN0YXRlQ29tcGxldGVkO3Rocm93IGFyZ31pZihjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykpe21ldGhvZD1cIm5leHRcIjthcmc9dW5kZWZpbmVkfX1lbHNlIGlmKG1ldGhvZD09PVwicmV0dXJuXCIpe2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsYXJnKX1zdGF0ZT1HZW5TdGF0ZUV4ZWN1dGluZzt0cnl7dmFyIHZhbHVlPWlubmVyRm4uY2FsbChzZWxmLGNvbnRleHQpO3N0YXRlPWNvbnRleHQuZG9uZT9HZW5TdGF0ZUNvbXBsZXRlZDpHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO3ZhciBpbmZvPXt2YWx1ZTp2YWx1ZSxkb25lOmNvbnRleHQuZG9uZX07aWYodmFsdWU9PT1Db250aW51ZVNlbnRpbmVsKXtpZihjb250ZXh0LmRlbGVnYXRlJiZtZXRob2Q9PT1cIm5leHRcIil7YXJnPXVuZGVmaW5lZH19ZWxzZXtyZXR1cm4gaW5mb319Y2F0Y2godGhyb3duKXtzdGF0ZT1HZW5TdGF0ZUNvbXBsZXRlZDtcbmlmKG1ldGhvZD09PVwibmV4dFwiKXtjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKHRocm93bil9ZWxzZXthcmc9dGhyb3dufX19fWdlbmVyYXRvci5uZXh0PWludm9rZS5iaW5kKGdlbmVyYXRvcixcIm5leHRcIik7Z2VuZXJhdG9yW1widGhyb3dcIl09aW52b2tlLmJpbmQoZ2VuZXJhdG9yLFwidGhyb3dcIik7Z2VuZXJhdG9yW1wicmV0dXJuXCJdPWludm9rZS5iaW5kKGdlbmVyYXRvcixcInJldHVyblwiKTtyZXR1cm4gZ2VuZXJhdG9yfUdwW2l0ZXJhdG9yU3ltYm9sXT1mdW5jdGlvbigpe3JldHVybiB0aGlzfTtHcC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiW29iamVjdCBHZW5lcmF0b3JdXCJ9O2Z1bmN0aW9uIHB1c2hUcnlFbnRyeSh0cmlwbGUpe3ZhciBlbnRyeT17dHJ5TG9jOnRyaXBsZVswXX07aWYoMSBpbiB0cmlwbGUpe2VudHJ5LmNhdGNoTG9jPXRyaXBsZVsxXX1pZigyIGluIHRyaXBsZSl7ZW50cnkuZmluYWxseUxvYz10cmlwbGVbMl19dGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpfWZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnksaSl7dmFyIHJlY29yZD1lbnRyeS5jb21wbGV0aW9ufHx7fTtyZWNvcmQudHlwZT1pPT09MD9cIm5vcm1hbFwiOlwicmV0dXJuXCI7ZGVsZXRlIHJlY29yZC5hcmc7ZW50cnkuY29tcGxldGlvbj1yZWNvcmR9ZnVuY3Rpb24gQ29udGV4dCh0cnlMaXN0KXt0aGlzLnRyeUVudHJpZXM9W3t0cnlMb2M6XCJyb290XCJ9XTt0cnlMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LHRoaXMpO3RoaXMucmVzZXQoKX1ydW50aW1lLmtleXM9ZnVuY3Rpb24ob2JqZWN0KXt2YXIga2V5cz1bXTtmb3IodmFyIGtleSBpbiBvYmplY3Qpe2tleXMucHVzaChrZXkpfWtleXMucmV2ZXJzZSgpO3JldHVybiBmdW5jdGlvbiBuZXh0KCl7d2hpbGUoa2V5cy5sZW5ndGgpe3ZhciBrZXk9a2V5cy5wb3AoKTtpZihrZXkgaW4gb2JqZWN0KXtuZXh0LnZhbHVlPWtleTtuZXh0LmRvbmU9ZmFsc2U7cmV0dXJuIG5leHR9fW5leHQuZG9uZT10cnVlO3JldHVybiBuZXh0fX07ZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKXtpZihpdGVyYWJsZSl7dmFyIGl0ZXJhdG9yTWV0aG9kPWl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtpZihpdGVyYXRvck1ldGhvZCl7cmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpfWlmKHR5cGVvZiBpdGVyYWJsZS5uZXh0PT09XCJmdW5jdGlvblwiKXtyZXR1cm4gaXRlcmFibGV9aWYoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpe3ZhciBpPS0xO2Z1bmN0aW9uIG5leHQoKXt3aGlsZSgrK2k8aXRlcmFibGUubGVuZ3RoKXtpZihoYXNPd24uY2FsbChpdGVyYWJsZSxpKSl7bmV4dC52YWx1ZT1pdGVyYWJsZVtpXTtuZXh0LmRvbmU9ZmFsc2U7cmV0dXJuIG5leHR9fW5leHQudmFsdWU9dW5kZWZpbmVkO25leHQuZG9uZT10cnVlO3JldHVybiBuZXh0fXJldHVybiBuZXh0Lm5leHQ9bmV4dH19cmV0dXJue25leHQ6ZG9uZVJlc3VsdH19cnVudGltZS52YWx1ZXM9dmFsdWVzO2Z1bmN0aW9uIGRvbmVSZXN1bHQoKXtyZXR1cm57dmFsdWU6dW5kZWZpbmVkLGRvbmU6dHJ1ZX19Q29udGV4dC5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOkNvbnRleHQscmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLnByZXY9MDt0aGlzLm5leHQ9MDt0aGlzLnNlbnQ9dW5kZWZpbmVkO3RoaXMuZG9uZT1mYWxzZTt0aGlzLmRlbGVnYXRlPW51bGw7dGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7Zm9yKHZhciB0ZW1wSW5kZXg9MCx0ZW1wTmFtZTtoYXNPd24uY2FsbCh0aGlzLHRlbXBOYW1lPVwidFwiK3RlbXBJbmRleCl8fHRlbXBJbmRleDwyMDsrK3RlbXBJbmRleCl7dGhpc1t0ZW1wTmFtZV09bnVsbH19LHN0b3A6ZnVuY3Rpb24oKXt0aGlzLmRvbmU9dHJ1ZTt2YXIgcm9vdEVudHJ5PXRoaXMudHJ5RW50cmllc1swXTt2YXIgcm9vdFJlY29yZD1yb290RW50cnkuY29tcGxldGlvbjtpZihyb290UmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3Rocm93IHJvb3RSZWNvcmQuYXJnfXJldHVybiB0aGlzLnJ2YWx9LGRpc3BhdGNoRXhjZXB0aW9uOmZ1bmN0aW9uKGV4Y2VwdGlvbil7aWYodGhpcy5kb25lKXt0aHJvdyBleGNlcHRpb259dmFyIGNvbnRleHQ9dGhpcztmdW5jdGlvbiBoYW5kbGUobG9jLGNhdWdodCl7cmVjb3JkLnR5cGU9XCJ0aHJvd1wiO3JlY29yZC5hcmc9ZXhjZXB0aW9uO2NvbnRleHQubmV4dD1sb2M7cmV0dXJuISFjYXVnaHR9Zm9yKHZhciBpPXRoaXMudHJ5RW50cmllcy5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIGVudHJ5PXRoaXMudHJ5RW50cmllc1tpXTt2YXIgcmVjb3JkPWVudHJ5LmNvbXBsZXRpb247aWYoZW50cnkudHJ5TG9jPT09XCJyb290XCIpe3JldHVybiBoYW5kbGUoXCJlbmRcIil9aWYoZW50cnkudHJ5TG9jPD10aGlzLnByZXYpe3ZhciBoYXNDYXRjaD1oYXNPd24uY2FsbChlbnRyeSxcImNhdGNoTG9jXCIpO3ZhciBoYXNGaW5hbGx5PWhhc093bi5jYWxsKGVudHJ5LFwiZmluYWxseUxvY1wiKTtpZihoYXNDYXRjaCYmaGFzRmluYWxseSl7aWYodGhpcy5wcmV2PGVudHJ5LmNhdGNoTG9jKXtyZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLHRydWUpfWVsc2UgaWYodGhpcy5wcmV2PGVudHJ5LmZpbmFsbHlMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyl9fWVsc2UgaWYoaGFzQ2F0Y2gpe2lmKHRoaXMucHJldjxlbnRyeS5jYXRjaExvYyl7cmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYyx0cnVlKX19ZWxzZSBpZihoYXNGaW5hbGx5KXtpZih0aGlzLnByZXY8ZW50cnkuZmluYWxseUxvYyl7cmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKX19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKX19fX0sX2ZpbmRGaW5hbGx5RW50cnk6ZnVuY3Rpb24oZmluYWxseUxvYyl7Zm9yKHZhciBpPXRoaXMudHJ5RW50cmllcy5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIGVudHJ5PXRoaXMudHJ5RW50cmllc1tpXTtpZihlbnRyeS50cnlMb2M8PXRoaXMucHJldiYmaGFzT3duLmNhbGwoZW50cnksXCJmaW5hbGx5TG9jXCIpJiYoZW50cnkuZmluYWxseUxvYz09PWZpbmFsbHlMb2N8fHRoaXMucHJldjxlbnRyeS5maW5hbGx5TG9jKSl7cmV0dXJuIGVudHJ5fX19LGFicnVwdDpmdW5jdGlvbih0eXBlLGFyZyl7dmFyIGVudHJ5PXRoaXMuX2ZpbmRGaW5hbGx5RW50cnkoKTt2YXIgcmVjb3JkPWVudHJ5P2VudHJ5LmNvbXBsZXRpb246e307cmVjb3JkLnR5cGU9dHlwZTtyZWNvcmQuYXJnPWFyZztpZihlbnRyeSl7dGhpcy5uZXh0PWVudHJ5LmZpbmFsbHlMb2N9ZWxzZXt0aGlzLmNvbXBsZXRlKHJlY29yZCl9cmV0dXJuIENvbnRpbnVlU2VudGluZWx9LGNvbXBsZXRlOmZ1bmN0aW9uKHJlY29yZCl7aWYocmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3Rocm93IHJlY29yZC5hcmd9aWYocmVjb3JkLnR5cGU9PT1cImJyZWFrXCJ8fHJlY29yZC50eXBlPT09XCJjb250aW51ZVwiKXt0aGlzLm5leHQ9cmVjb3JkLmFyZ31lbHNlIGlmKHJlY29yZC50eXBlPT09XCJyZXR1cm5cIil7dGhpcy5ydmFsPXJlY29yZC5hcmc7dGhpcy5uZXh0PVwiZW5kXCJ9cmV0dXJuIENvbnRpbnVlU2VudGluZWx9LGZpbmlzaDpmdW5jdGlvbihmaW5hbGx5TG9jKXt2YXIgZW50cnk9dGhpcy5fZmluZEZpbmFsbHlFbnRyeShmaW5hbGx5TG9jKTtyZXR1cm4gdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uKX0sXCJjYXRjaFwiOmZ1bmN0aW9uKHRyeUxvYyl7Zm9yKHZhciBpPXRoaXMudHJ5RW50cmllcy5sZW5ndGgtMTtpPj0wOy0taSl7dmFyIGVudHJ5PXRoaXMudHJ5RW50cmllc1tpXTtpZihlbnRyeS50cnlMb2M9PT10cnlMb2Mpe3ZhciByZWNvcmQ9ZW50cnkuY29tcGxldGlvbjtpZihyZWNvcmQudHlwZT09PVwidGhyb3dcIil7dmFyIHRocm93bj1yZWNvcmQuYXJnO3Jlc2V0VHJ5RW50cnkoZW50cnksaSl9cmV0dXJuIHRocm93bn19dGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpfSxkZWxlZ2F0ZVlpZWxkOmZ1bmN0aW9uKGl0ZXJhYmxlLHJlc3VsdE5hbWUsbmV4dExvYyl7dGhpcy5kZWxlZ2F0ZT17aXRlcmF0b3I6dmFsdWVzKGl0ZXJhYmxlKSxyZXN1bHROYW1lOnJlc3VsdE5hbWUsbmV4dExvYzpuZXh0TG9jfTtyZXR1cm4gQ29udGludWVTZW50aW5lbH19fSgpfSx7fV19LHt9LFsxXSk7IiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQmFjb24sIEJ1ZmZlcmluZ1NvdXJjZSwgQnVzLCBDb21wb3NpdGVVbnN1YnNjcmliZSwgQ29uc3VtaW5nU291cmNlLCBEZXNjLCBEaXNwYXRjaGVyLCBFbmQsIEVycm9yLCBFdmVudCwgRXZlbnRTdHJlYW0sIEV4Y2VwdGlvbiwgSW5pdGlhbCwgTmV4dCwgTm9uZSwgT2JzZXJ2YWJsZSwgUHJvcGVydHksIFByb3BlcnR5RGlzcGF0Y2hlciwgU29tZSwgU291cmNlLCBVcGRhdGVCYXJyaWVyLCBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtLCBhc3NlcnQsIGFzc2VydEFycmF5LCBhc3NlcnRFdmVudFN0cmVhbSwgYXNzZXJ0RnVuY3Rpb24sIGFzc2VydE5vQXJndW1lbnRzLCBhc3NlcnRPYnNlcnZhYmxlLCBhc3NlcnRTdHJpbmcsIGNsb25lQXJyYXksIGNvbXBvc2l0ZVVuc3Vic2NyaWJlLCBjb25zdGFudFRvRnVuY3Rpb24sIGNvbnRhaW5zRHVwbGljYXRlRGVwcywgY29udmVydEFyZ3NUb0Z1bmN0aW9uLCBkZXNjcmliZSwgZW5kLCBldmVudElkQ291bnRlciwgZmluZERlcHMsIGZsYXRNYXBfLCBmb3JtZXIsIGlkQ291bnRlciwgaW5pdGlhbCwgaXNBcnJheSwgaXNGaWVsZEtleSwgaXNGdW5jdGlvbiwgaXNPYnNlcnZhYmxlLCBsYXR0ZXIsIGxpZnRDYWxsYmFjaywgbWFrZUZ1bmN0aW9uLCBtYWtlRnVuY3Rpb25BcmdzLCBtYWtlRnVuY3Rpb25fLCBtYWtlT2JzZXJ2YWJsZSwgbWFrZVNwYXduZXIsIG5leHQsIG5vcCwgcGFydGlhbGx5QXBwbGllZCwgcmVjdXJzaW9uRGVwdGgsIHJlZ2lzdGVyT2JzLCBzcHlzLCB0b0NvbWJpbmF0b3IsIHRvRXZlbnQsIHRvRmllbGRFeHRyYWN0b3IsIHRvRmllbGRLZXksIHRvT3B0aW9uLCB0b1NpbXBsZUV4dHJhY3Rvciwgd2l0aERlc2NyaXB0aW9uLCB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQsIF8sIF9yZWYsXG4gICAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gICAgX19zbGljZSA9IFtdLnNsaWNlLFxuICAgIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIF9fYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH07XG5cbiAgQmFjb24gPSB7XG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiQmFjb25cIjtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24udmVyc2lvbiA9ICcwLjcuNDInO1xuXG4gIEV4Y2VwdGlvbiA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCAhPT0gbnVsbCA/IGdsb2JhbCA6IHRoaXMpLkVycm9yO1xuXG4gIF8gPSB7XG4gICAgaW5kZXhPZjogQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPyBmdW5jdGlvbih4cywgeCkge1xuICAgICAgcmV0dXJuIHhzLmluZGV4T2YoeCk7XG4gICAgfSA6IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICB2YXIgaSwgeSwgX2ksIF9sZW47XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgICAgeSA9IHhzW2ldO1xuICAgICAgICBpZiAoeCA9PT0geSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBpbmRleFdoZXJlOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGksIHksIF9pLCBfbGVuO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHkgPSB4c1tpXTtcbiAgICAgICAgaWYgKGYoeSkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgaGVhZDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4c1swXTtcbiAgICB9LFxuICAgIGFsd2F5czogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBuZWdhdGU6IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiAhZih4KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4cy5sZW5ndGggPT09IDA7XG4gICAgfSxcbiAgICB0YWlsOiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzLnNsaWNlKDEsIHhzLmxlbmd0aCk7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKGYsIHhzKSB7XG4gICAgICB2YXIgZmlsdGVyZWQsIHgsIF9pLCBfbGVuO1xuICAgICAgZmlsdGVyZWQgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgeCA9IHhzW19pXTtcbiAgICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgICBmaWx0ZXJlZC5wdXNoKHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKGYsIHhzKSB7XG4gICAgICB2YXIgeCwgX2ksIF9sZW4sIF9yZXN1bHRzO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgeCA9IHhzW19pXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaChmKHgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9LFxuICAgIGVhY2g6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICAgIGZvciAoa2V5IGluIHhzKSB7XG4gICAgICAgIHZhbHVlID0geHNba2V5XTtcbiAgICAgICAgZihrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih4cykge1xuICAgICAgaWYgKGlzQXJyYXkoeHMpKSB7XG4gICAgICAgIHJldHVybiB4cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbeHNdO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICByZXR1cm4gXy5pbmRleE9mKHhzLCB4KSAhPT0gLTE7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSxcbiAgICBsYXN0OiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzW3hzLmxlbmd0aCAtIDFdO1xuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuO1xuICAgICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgICBmID0gXy5pZDtcbiAgICAgIH1cbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgeCA9IHhzW19pXTtcbiAgICAgICAgaWYgKCFmKHgpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGFueTogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciB4LCBfaSwgX2xlbjtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IF8uaWQ7XG4gICAgICB9XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIGlmIChmKHgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHdpdGhvdXQ6IGZ1bmN0aW9uKHgsIHhzKSB7XG4gICAgICByZXR1cm4gXy5maWx0ZXIoKGZ1bmN0aW9uKHkpIHtcbiAgICAgICAgcmV0dXJuIHkgIT09IHg7XG4gICAgICB9KSwgeHMpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih4LCB4cykge1xuICAgICAgdmFyIGk7XG4gICAgICBpID0gXy5pbmRleE9mKHhzLCB4KTtcbiAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgcmV0dXJuIHhzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZvbGQ6IGZ1bmN0aW9uKHhzLCBzZWVkLCBmKSB7XG4gICAgICB2YXIgeCwgX2ksIF9sZW47XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIHNlZWQgPSBmKHNlZWQsIHgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgfSxcbiAgICBmbGF0TWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgcmV0dXJuIF8uZm9sZCh4cywgW10sIChmdW5jdGlvbih5cywgeCkge1xuICAgICAgICByZXR1cm4geXMuY29uY2F0KGYoeCkpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbihmKSB7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YWx1ZSA9IE5vbmU7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gTm9uZSkge1xuICAgICAgICAgIHZhbHVlID0gZigpO1xuICAgICAgICAgIGYgPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBleCwgaW50ZXJuYWxzLCBrZXksIHZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVjdXJzaW9uRGVwdGgrKztcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihvYmopKSB7XG4gICAgICAgICAgcmV0dXJuIFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBpZiAocmVjdXJzaW9uRGVwdGggPiA1KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJbLi5dXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBcIltcIiArIF8ubWFwKF8udG9TdHJpbmcsIG9iaikudG9TdHJpbmcoKSArIFwiXVwiO1xuICAgICAgICB9IGVsc2UgaWYgKCgob2JqICE9IG51bGwgPyBvYmoudG9TdHJpbmcgOiB2b2lkIDApICE9IG51bGwpICYmIG9iai50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykge1xuICAgICAgICAgIHJldHVybiBvYmoudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiey4ufVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbnRlcm5hbHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgX3Jlc3VsdHM7XG4gICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgIGlmICghX19oYXNQcm9wLmNhbGwob2JqLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgdmFsdWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGV4ID0gX2Vycm9yO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChfLnRvU3RyaW5nKGtleSkgKyBcIjpcIiArIF8udG9TdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICB9KSgpO1xuICAgICAgICAgIHJldHVybiBcIntcIiArIGludGVybmFscyArIFwifVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHJlY3Vyc2lvbkRlcHRoLS07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJlY3Vyc2lvbkRlcHRoID0gMDtcblxuICBCYWNvbi5fID0gXztcblxuICBCYWNvbi5zY2hlZHVsZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24oZiwgZCkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZiwgZCk7XG4gICAgfSxcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oZiwgaSkge1xuICAgICAgcmV0dXJuIHNldEludGVydmFsKGYsIGkpO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHJldHVybiBjbGVhckludGVydmFsKGlkKTtcbiAgICB9LFxuICAgIG5vdzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLmZyb21CaW5kZXIgPSBmdW5jdGlvbihiaW5kZXIsIGV2ZW50VHJhbnNmb3JtZXIpIHtcbiAgICBpZiAoZXZlbnRUcmFuc2Zvcm1lciA9PSBudWxsKSB7XG4gICAgICBldmVudFRyYW5zZm9ybWVyID0gXy5pZDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJmcm9tQmluZGVyXCIsIGJpbmRlciwgZXZlbnRUcmFuc2Zvcm1lciksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBuZWVkc1VuYmluZCwgdW5iaW5kLCB1bmJpbmRlciwgdW5ib3VuZDtcbiAgICAgIHVuYm91bmQgPSBmYWxzZTtcbiAgICAgIG5lZWRzVW5iaW5kID0gZmFsc2U7XG4gICAgICB1bmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF1bmJvdW5kKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB1bmJpbmRlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB1bmJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdW5iaW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybiB1bmJvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5lZWRzVW5iaW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB1bmJpbmRlciA9IGJpbmRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MsIGV2ZW50LCByZXBseSwgdmFsdWUsIF9pLCBfbGVuO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgdmFsdWUgPSBldmVudFRyYW5zZm9ybWVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBpZiAoIShpc0FycmF5KHZhbHVlKSAmJiBfLmxhc3QodmFsdWUpIGluc3RhbmNlb2YgRXZlbnQpKSB7XG4gICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB2YWx1ZS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIGV2ZW50ID0gdmFsdWVbX2ldO1xuICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCA9IHRvRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSB8fCBldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICB1bmJpbmQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfSk7XG4gICAgICBpZiAobmVlZHNVbmJpbmQpIHtcbiAgICAgICAgdW5iaW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5iaW5kO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLiQgPSB7fTtcblxuICBCYWNvbi4kLmFzRXZlbnRTdHJlYW0gPSBmdW5jdGlvbihldmVudE5hbWUsIHNlbGVjdG9yLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBfcmVmID0gW3NlbGVjdG9yLCB2b2lkIDBdLCBldmVudFRyYW5zZm9ybWVyID0gX3JlZlswXSwgc2VsZWN0b3IgPSBfcmVmWzFdO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMuc2VsZWN0b3IgfHwgdGhpcywgXCJhc0V2ZW50U3RyZWFtXCIsIGV2ZW50TmFtZSwgQmFjb24uZnJvbUJpbmRlcigoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIF90aGlzLm9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLm9mZihldmVudE5hbWUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSkodGhpcyksIGV2ZW50VHJhbnNmb3JtZXIpKTtcbiAgfTtcblxuICBpZiAoKF9yZWYgPSB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeSAhPT0gbnVsbCA/IGpRdWVyeSA6IHR5cGVvZiBaZXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiBaZXB0byAhPT0gbnVsbCA/IFplcHRvIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgX3JlZi5mbi5hc0V2ZW50U3RyZWFtID0gQmFjb24uJC5hc0V2ZW50U3RyZWFtO1xuICB9XG5cbiAgQmFjb24uZnJvbUV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50VHJhbnNmb3JtZXIpIHtcbiAgICB2YXIgc3ViLCB1bnN1YiwgX3JlZjEsIF9yZWYyLCBfcmVmMywgX3JlZjQsIF9yZWY1LCBfcmVmNjtcbiAgICBzdWIgPSAoX3JlZjEgPSAoX3JlZjIgPSAoX3JlZjMgPSB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcikgIT0gbnVsbCA/IF9yZWYzIDogdGFyZ2V0LmFkZExpc3RlbmVyKSAhPSBudWxsID8gX3JlZjIgOiB0YXJnZXQuYmluZCkgIT0gbnVsbCA/IF9yZWYxIDogdGFyZ2V0Lm9uO1xuICAgIHVuc3ViID0gKF9yZWY0ID0gKF9yZWY1ID0gKF9yZWY2ID0gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIpICE9IG51bGwgPyBfcmVmNiA6IHRhcmdldC5yZW1vdmVMaXN0ZW5lcikgIT0gbnVsbCA/IF9yZWY1IDogdGFyZ2V0LnVuYmluZCkgIT0gbnVsbCA/IF9yZWY0IDogdGFyZ2V0Lm9mZjtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21FdmVudFRhcmdldFwiLCB0YXJnZXQsIGV2ZW50TmFtZSwgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBzdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1bnN1Yi5jYWxsKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIH07XG4gICAgfSwgZXZlbnRUcmFuc2Zvcm1lcikpO1xuICB9O1xuXG4gIEJhY29uLmZyb21Qcm9taXNlID0gZnVuY3Rpb24ocHJvbWlzZSwgYWJvcnQpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21Qcm9taXNlXCIsIHByb21pc2UsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcHJvbWlzZS50aGVuKGhhbmRsZXIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIobmV3IEVycm9yKGUpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYWJvcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHByb21pc2UuYWJvcnQgPT09IFwiZnVuY3Rpb25cIiA/IHByb21pc2UuYWJvcnQoKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICB9KSkpO1xuICB9O1xuXG4gIEJhY29uLm5vTW9yZSA9IFtcIjxuby1tb3JlPlwiXTtcblxuICBCYWNvbi5tb3JlID0gW1wiPG1vcmU+XCJdO1xuXG4gIEJhY29uLmxhdGVyID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJsYXRlclwiLCBkZWxheSwgdmFsdWUsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uc2VxdWVudGlhbGx5ID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlcykge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IDA7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJzZXF1ZW50aWFsbHlcIiwgZGVsYXksIHZhbHVlcywgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFsdWUgPSB2YWx1ZXNbaW5kZXgrK107XG4gICAgICBpZiAoaW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVuZCgpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5yZXBlYXRlZGx5ID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlcykge1xuICAgIHZhciBpbmRleDtcbiAgICBpbmRleCA9IDA7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJyZXBlYXRlZGx5XCIsIGRlbGF5LCB2YWx1ZXMsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZXNbaW5kZXgrKyAlIHZhbHVlcy5sZW5ndGhdO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5zcHkgPSBmdW5jdGlvbihzcHkpIHtcbiAgICByZXR1cm4gc3B5cy5wdXNoKHNweSk7XG4gIH07XG5cbiAgc3B5cyA9IFtdO1xuXG4gIHJlZ2lzdGVyT2JzID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgdmFyIHNweSwgX2ksIF9sZW47XG4gICAgaWYgKHNweXMubGVuZ3RoKSB7XG4gICAgICBpZiAoIXJlZ2lzdGVyT2JzLnJ1bm5pbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZWdpc3Rlck9icy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHNweXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgIHNweSA9IHNweXNbX2ldO1xuICAgICAgICAgICAgc3B5KG9icyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGRlbGV0ZSByZWdpc3Rlck9icy5ydW5uaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgd2l0aE1ldGhvZENhbGxTdXBwb3J0ID0gZnVuY3Rpb24od3JhcHBlZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBjb250ZXh0LCBmLCBtZXRob2ROYW1lO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBpZiAodHlwZW9mIGYgPT09IFwib2JqZWN0XCIgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY29udGV4dCA9IGY7XG4gICAgICAgIG1ldGhvZE5hbWUgPSBhcmdzWzBdO1xuICAgICAgICBmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHRbbWV0aG9kTmFtZV0uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlZC5hcHBseShudWxsLCBbZl0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmdzKSkpO1xuICAgIH07XG4gIH07XG5cbiAgbGlmdENhbGxiYWNrID0gZnVuY3Rpb24oZGVzYywgd3JhcHBlZCkge1xuICAgIHJldHVybiB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgZiwgc3RyZWFtO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBzdHJlYW0gPSBwYXJ0aWFsbHlBcHBsaWVkKHdyYXBwZWQsIFtcbiAgICAgICAgZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIF9fc2xpY2UuY2FsbCh2YWx1ZXMpLmNvbmNhdChbY2FsbGJhY2tdKSk7XG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIGRlc2MsIGZdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncyksIFtCYWNvbi5jb21iaW5lQXNBcnJheShhcmdzKS5mbGF0TWFwKHN0cmVhbSldKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUNhbGxiYWNrID0gbGlmdENhbGxiYWNrKFwiZnJvbUNhbGxiYWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIG1ha2VGdW5jdGlvbihmLCBhcmdzKShoYW5kbGVyKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSwgKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSkpO1xuICB9KTtcblxuICBCYWNvbi5mcm9tTm9kZUNhbGxiYWNrID0gbGlmdENhbGxiYWNrKFwiZnJvbU5vZGVDYWxsYmFja1wiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0sIGZ1bmN0aW9uKGVycm9yLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBbbmV3IEVycm9yKGVycm9yKSwgZW5kKCldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgIH0pO1xuICB9KTtcblxuICBCYWNvbi5mcm9tUG9sbCA9IGZ1bmN0aW9uKGRlbGF5LCBwb2xsKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tUG9sbFwiLCBkZWxheSwgcG9sbCwgQmFjb24uZnJvbUJpbmRlcigoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgdmFyIGlkO1xuICAgICAgaWQgPSBCYWNvbi5zY2hlZHVsZXIuc2V0SW50ZXJ2YWwoaGFuZGxlciwgZGVsYXkpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQmFjb24uc2NoZWR1bGVyLmNsZWFySW50ZXJ2YWwoaWQpO1xuICAgICAgfTtcbiAgICB9KSwgcG9sbCkpO1xuICB9O1xuXG4gIEJhY29uLmludGVydmFsID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0ge307XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiaW50ZXJ2YWxcIiwgZGVsYXksIHZhbHVlLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV4dCh2YWx1ZSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRlc2NyaWJlKEJhY29uLCBcImNvbnN0YW50XCIsIHZhbHVlKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgc2luayhpbml0aWFsKHZhbHVlKSk7XG4gICAgICBzaW5rKGVuZCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24ubmV2ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcIm5ldmVyXCIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGVuZCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24ub25jZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJvbmNlXCIsIHZhbHVlKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgc2luayh0b0V2ZW50KHZhbHVlKSk7XG4gICAgICBzaW5rKGVuZCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUFycmF5ID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgdmFyIGk7XG4gICAgYXNzZXJ0QXJyYXkodmFsdWVzKTtcbiAgICBpZiAoIXZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbUFycmF5XCIsIHZhbHVlcywgQmFjb24ubmV2ZXIoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkgPSAwO1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJmcm9tQXJyYXlcIiwgdmFsdWVzKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgcHVzaCwgcmVwbHksIHVuc3ViZDtcbiAgICAgICAgdW5zdWJkID0gZmFsc2U7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgcHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICBpZiAoKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpICYmICF1bnN1YmQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW2krK107XG4gICAgICAgICAgICByZXBseSA9IHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgaWYgKGkgPT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luayhlbmQoKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIuYWZ0ZXJUcmFuc2FjdGlvbihwdXNoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcHVzaCgpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHVuc3ViZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24ubWVyZ2VBbGwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIGlmIChzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZS5hcHBseShudWxsLCBbQmFjb24sIFwibWVyZ2VBbGxcIl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSkpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciBlbmRzLCBzaW5rcywgc21hcnRTaW5rO1xuICAgICAgICBlbmRzID0gMDtcbiAgICAgICAgc21hcnRTaW5rID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHVuc3ViQm90aCkge1xuICAgICAgICAgICAgcmV0dXJuIG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgICAgZW5kcysrO1xuICAgICAgICAgICAgICAgIGlmIChlbmRzID09PSBzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZW5kKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgICAgdW5zdWJCb3RoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgc2lua3MgPSBfLm1hcChzbWFydFNpbmssIHN0cmVhbXMpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlVW5zdWJzY3JpYmUuYXBwbHkobnVsbCwgc2lua3MpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi56aXBBc0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ6aXBBc0FycmF5XCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi56aXBXaXRoKHN0cmVhbXMsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHhzO1xuICAgICAgeHMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIHhzO1xuICAgIH0pXSkpO1xuICB9O1xuXG4gIEJhY29uLnppcFdpdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgc3RyZWFtcywgX3JlZjE7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgc3RyZWFtcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGYpKSB7XG4gICAgICBfcmVmMSA9IFtmLCBzdHJlYW1zWzBdXSwgc3RyZWFtcyA9IF9yZWYxWzBdLCBmID0gX3JlZjFbMV07XG4gICAgfVxuICAgIHN0cmVhbXMgPSBfLm1hcCgoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMudG9FdmVudFN0cmVhbSgpO1xuICAgIH0pLCBzdHJlYW1zKTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ6aXBXaXRoXCIsIGZdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHN0cmVhbXMsIGYpXSkpO1xuICB9O1xuXG4gIEJhY29uLmdyb3VwU2ltdWx0YW5lb3VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHMsIHNvdXJjZXMsIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBzb3VyY2VzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9pLCBfbGVuLCBfcmVzdWx0cztcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHN0cmVhbXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IHN0cmVhbXNbX2ldO1xuICAgICAgICBfcmVzdWx0cy5wdXNoKG5ldyBCdWZmZXJpbmdTb3VyY2UocykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiZ3JvdXBTaW11bHRhbmVvdXNcIl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLndoZW4oc291cmNlcywgKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHhzO1xuICAgICAgeHMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIHhzO1xuICAgIH0pKV0pKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lQXNBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpbmRleCwgcywgc291cmNlcywgc3RyZWFtLCBzdHJlYW1zLCBfaSwgX2xlbjtcbiAgICBzdHJlYW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIGZvciAoaW5kZXggPSBfaSA9IDAsIF9sZW4gPSBzdHJlYW1zLmxlbmd0aDsgX2kgPCBfbGVuOyBpbmRleCA9ICsrX2kpIHtcbiAgICAgIHN0cmVhbSA9IHN0cmVhbXNbaW5kZXhdO1xuICAgICAgaWYgKCEoaXNPYnNlcnZhYmxlKHN0cmVhbSkpKSB7XG4gICAgICAgIHN0cmVhbXNbaW5kZXhdID0gQmFjb24uY29uc3RhbnQoc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICBzb3VyY2VzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2osIF9sZW4xLCBfcmVzdWx0cztcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gc3RyZWFtcy5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBzID0gc3RyZWFtc1tfal07XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChuZXcgU291cmNlKHMsIHRydWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiY29tYmluZUFzQXJyYXlcIl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLndoZW4oc291cmNlcywgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHM7XG4gICAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgcmV0dXJuIHhzO1xuICAgICAgfSkpLnRvUHJvcGVydHkoKV0pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEJhY29uLmNvbnN0YW50KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24ub25WYWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgc3RyZWFtcywgX2k7XG4gICAgc3RyZWFtcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIF9pID0gYXJndW1lbnRzLmxlbmd0aCAtIDEpIDogKF9pID0gMCwgW10pLCBmID0gYXJndW1lbnRzW19pKytdO1xuICAgIHJldHVybiBCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5vblZhbHVlcyhmKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lV2l0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBzdHJlYW1zO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImNvbWJpbmVXaXRoXCIsIGZdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICByZXR1cm4gZi5hcHBseShudWxsLCB2YWx1ZXMpO1xuICAgIH0pXSkpO1xuICB9O1xuXG4gIEJhY29uLmNvbWJpbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgdmFyIGFwcGx5U3RyZWFtVmFsdWUsIGNvbWJpbmF0b3IsIGNvbXBpbGUsIGNvbXBpbGVUZW1wbGF0ZSwgY29uc3RhbnRWYWx1ZSwgY3VycmVudCwgZnVuY3MsIG1rQ29udGV4dCwgc2V0VmFsdWUsIHN0cmVhbXM7XG4gICAgZnVuY3MgPSBbXTtcbiAgICBzdHJlYW1zID0gW107XG4gICAgY3VycmVudCA9IGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICByZXR1cm4gY3R4U3RhY2tbY3R4U3RhY2subGVuZ3RoIC0gMV07XG4gICAgfTtcbiAgICBzZXRWYWx1ZSA9IGZ1bmN0aW9uKGN0eFN0YWNrLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gY3VycmVudChjdHhTdGFjaylba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gICAgYXBwbHlTdHJlYW1WYWx1ZSA9IGZ1bmN0aW9uKGtleSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaywgdmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCB2YWx1ZXNbaW5kZXhdKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBjb25zdGFudFZhbHVlID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgIHJldHVybiBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgbWtDb250ZXh0ID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgIGlmIChpc0FycmF5KHRlbXBsYXRlKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgfTtcbiAgICBjb21waWxlID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIHBvcENvbnRleHQsIHB1c2hDb250ZXh0O1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgc3RyZWFtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2goYXBwbHlTdHJlYW1WYWx1ZShrZXksIHN0cmVhbXMubGVuZ3RoIC0gMSkpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gT2JqZWN0KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgcHVzaENvbnRleHQgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgICAgIHZhciBuZXdDb250ZXh0O1xuICAgICAgICAgICAgbmV3Q29udGV4dCA9IG1rQ29udGV4dCh2YWx1ZSk7XG4gICAgICAgICAgICBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCBuZXdDb250ZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBjdHhTdGFjay5wdXNoKG5ld0NvbnRleHQpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHBvcENvbnRleHQgPSBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICAgIHJldHVybiBjdHhTdGFjay5wb3AoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3MucHVzaChwdXNoQ29udGV4dChrZXkpKTtcbiAgICAgICAgY29tcGlsZVRlbXBsYXRlKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2gocG9wQ29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3MucHVzaChjb25zdGFudFZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbXBpbGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gXy5lYWNoKHRlbXBsYXRlLCBjb21waWxlKTtcbiAgICB9O1xuICAgIGNvbXBpbGVUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgY29tYmluYXRvciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGN0eFN0YWNrLCBmLCByb290Q29udGV4dCwgX2ksIF9sZW47XG4gICAgICByb290Q29udGV4dCA9IG1rQ29udGV4dCh0ZW1wbGF0ZSk7XG4gICAgICBjdHhTdGFjayA9IFtyb290Q29udGV4dF07XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGZ1bmNzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGYgPSBmdW5jc1tfaV07XG4gICAgICAgIGYoY3R4U3RhY2ssIHZhbHVlcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcm9vdENvbnRleHQ7XG4gICAgfTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImNvbWJpbmVUZW1wbGF0ZVwiLCB0ZW1wbGF0ZSwgQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGNvbWJpbmF0b3IpKTtcbiAgfTtcblxuICBCYWNvbi5yZXRyeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgZGVsYXksIGlzUmV0cnlhYmxlLCBtYXhSZXRyaWVzLCByZXRyaWVzLCByZXRyeSwgc291cmNlO1xuICAgIGlmICghaXNGdW5jdGlvbihvcHRpb25zLnNvdXJjZSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCInc291cmNlJyBvcHRpb24gaGFzIHRvIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuICAgIHJldHJpZXMgPSBvcHRpb25zLnJldHJpZXMgfHwgMDtcbiAgICBtYXhSZXRyaWVzID0gb3B0aW9ucy5tYXhSZXRyaWVzIHx8IHJldHJpZXM7XG4gICAgZGVsYXkgPSBvcHRpb25zLmRlbGF5IHx8IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBpc1JldHJ5YWJsZSA9IG9wdGlvbnMuaXNSZXRyeWFibGUgfHwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHJ5ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgdmFyIGRlbGF5ZWRSZXRyeSwgbmV4dEF0dGVtcHRPcHRpb25zO1xuICAgICAgbmV4dEF0dGVtcHRPcHRpb25zID0ge1xuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgcmV0cmllczogcmV0cmllcyAtIDEsXG4gICAgICAgIG1heFJldHJpZXM6IG1heFJldHJpZXMsXG4gICAgICAgIGRlbGF5OiBkZWxheSxcbiAgICAgICAgaXNSZXRyeWFibGU6IGlzUmV0cnlhYmxlXG4gICAgICB9O1xuICAgICAgZGVsYXllZFJldHJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5yZXRyeShuZXh0QXR0ZW1wdE9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBCYWNvbi5sYXRlcihkZWxheShjb250ZXh0KSkuZmlsdGVyKGZhbHNlKS5jb25jYXQoQmFjb24ub25jZSgpLmZsYXRNYXAoZGVsYXllZFJldHJ5KSk7XG4gICAgfTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcInJldHJ5XCIsIG9wdGlvbnMsIHNvdXJjZSgpLmZsYXRNYXBFcnJvcihmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoaXNSZXRyeWFibGUoZSkgJiYgcmV0cmllcyA+IDApIHtcbiAgICAgICAgcmV0dXJuIHJldHJ5KHtcbiAgICAgICAgICBlcnJvcjogZSxcbiAgICAgICAgICByZXRyaWVzRG9uZTogbWF4UmV0cmllcyAtIHJldHJpZXNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQmFjb24ub25jZShuZXcgRXJyb3IoZSkpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBldmVudElkQ291bnRlciA9IDA7XG5cbiAgRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQoKSB7XG4gICAgICB0aGlzLmlkID0gKytldmVudElkQ291bnRlcjtcbiAgICB9XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNJbml0aWFsID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50O1xuXG4gIH0pKCk7XG5cbiAgTmV4dCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTmV4dCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIE5leHQodmFsdWVGLCBlYWdlcikge1xuICAgICAgTmV4dC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgICAgIGlmICghZWFnZXIgJiYgaXNGdW5jdGlvbih2YWx1ZUYpIHx8IHZhbHVlRiBpbnN0YW5jZW9mIE5leHQpIHtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2YWx1ZUY7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB2YWx1ZUY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgTmV4dC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuaGFzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudmFsdWVGIGluc3RhbmNlb2YgTmV4dCkge1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB0aGlzLnZhbHVlRi52YWx1ZSgpO1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZUYpIHtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdGhpcy52YWx1ZUYoKTtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUludGVybmFsO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oZikge1xuICAgICAgdmFyIGV2ZW50LCB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnZhbHVlSW50ZXJuYWwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlSW50ZXJuYWw7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudCA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfLnRvU3RyaW5nKHRoaXMudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE5leHQ7XG5cbiAgfSkoRXZlbnQpO1xuXG4gIEluaXRpYWwgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEluaXRpYWwsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBJbml0aWFsKCkge1xuICAgICAgcmV0dXJuIEluaXRpYWwuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUuaXNJbml0aWFsID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEluaXRpYWwucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgSW5pdGlhbCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIEluaXRpYWwucHJvdG90eXBlLnRvTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBOZXh0KHRoaXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gSW5pdGlhbDtcblxuICB9KShOZXh0KTtcblxuICBFbmQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEVuZCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEVuZCgpIHtcbiAgICAgIHJldHVybiBFbmQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgRW5kLnByb3RvdHlwZS5pc0VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEVuZC5wcm90b3R5cGUuZm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVuZC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCI8ZW5kPlwiO1xuICAgIH07XG5cbiAgICByZXR1cm4gRW5kO1xuXG4gIH0pKEV2ZW50KTtcblxuICBFcnJvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRXJyb3IsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBFcnJvcihlcnJvcikge1xuICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgIH1cblxuICAgIEVycm9yLnByb3RvdHlwZS5pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFcnJvci5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIjxlcnJvcj4gXCIgKyBfLnRvU3RyaW5nKHRoaXMuZXJyb3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXJyb3I7XG5cbiAgfSkoRXZlbnQpO1xuXG4gIGlkQ291bnRlciA9IDA7XG5cbiAgT2JzZXJ2YWJsZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKGRlc2MpIHtcbiAgICAgIHRoaXMuaWQgPSArK2lkQ291bnRlcjtcbiAgICAgIHdpdGhEZXNjcmlwdGlvbihkZXNjLCB0aGlzKTtcbiAgICAgIHRoaXMuaW5pdGlhbERlc2MgPSB0aGlzLmRlc2M7XG4gICAgfVxuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIud3JhcHBlZFN1YnNjcmliZSh0aGlzLCBzaW5rKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlSW50ZXJuYWwgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShzaW5rKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25WYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlcyA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiB0aGlzLm9uVmFsdWUoZnVuY3Rpb24oYXJncykge1xuICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICByZXR1cm4gZigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZXJyb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZXJyb3JzXCIsIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGY7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZmlsdGVyXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZmlsdGVyKGYpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZVdoaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgZjtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlV2hpbGVcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5maWx0ZXIoZikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5lbmRPbkVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgZjtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgICBmID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZW5kT25FcnJvclwiLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSAmJiBmKGV2ZW50LmVycm9yKSkge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgIGlmIChjb3VudCA8PSAwKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRha2VcIiwgY291bnQsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgcDtcbiAgICAgIHAgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKHAgaW5zdGFuY2VvZiBQcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gcC5zYW1wbGVkQnkodGhpcywgZm9ybWVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgcCwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJtYXBcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudC5mbWFwKGYpKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXBFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm1hcEVycm9yXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2gobmV4dChmKGV2ZW50LmVycm9yKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm1hcEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm1hcEVuZFwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgdGhpcy5wdXNoKG5leHQoZihldmVudCkpKTtcbiAgICAgICAgICB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9BY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkb0FjdGlvblwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgZihldmVudC52YWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcFwiLCBjb3VudCwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNraXBEdXBsaWNhdGVzID0gZnVuY3Rpb24oaXNFcXVhbCkge1xuICAgICAgaWYgKGlzRXF1YWwgPT0gbnVsbCkge1xuICAgICAgICBpc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBEdXBsaWNhdGVzXCIsIHRoaXMud2l0aFN0YXRlTWFjaGluZShOb25lLCBmdW5jdGlvbihwcmV2LCBldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gW3ByZXYsIFtldmVudF1dO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzSW5pdGlhbCgpIHx8IHByZXYgPT09IE5vbmUgfHwgIWlzRXF1YWwocHJldi5nZXQoKSwgZXZlbnQudmFsdWUoKSkpIHtcbiAgICAgICAgICByZXR1cm4gW25ldyBTb21lKGV2ZW50LnZhbHVlKCkpLCBbZXZlbnRdXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW3ByZXYsIFtdXTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwRXJyb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcEVycm9yc1wiLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS53aXRoU3RhdGVNYWNoaW5lID0gZnVuY3Rpb24oaW5pdFN0YXRlLCBmKSB7XG4gICAgICB2YXIgc3RhdGU7XG4gICAgICBzdGF0ZSA9IGluaXRTdGF0ZTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ3aXRoU3RhdGVNYWNoaW5lXCIsIGluaXRTdGF0ZSwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgZnJvbUYsIG5ld1N0YXRlLCBvdXRwdXQsIG91dHB1dHMsIHJlcGx5LCBfaSwgX2xlbjtcbiAgICAgICAgZnJvbUYgPSBmKHN0YXRlLCBldmVudCk7XG4gICAgICAgIG5ld1N0YXRlID0gZnJvbUZbMF0sIG91dHB1dHMgPSBmcm9tRlsxXTtcbiAgICAgICAgc3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IG91dHB1dHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBvdXRwdXQgPSBvdXRwdXRzW19pXTtcbiAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChvdXRwdXQpO1xuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uKHNlZWQsIGYpIHtcbiAgICAgIHZhciBhY2MsIHJlc3VsdFByb3BlcnR5LCBzdWJzY3JpYmU7XG4gICAgICBmID0gdG9Db21iaW5hdG9yKGYpO1xuICAgICAgYWNjID0gdG9PcHRpb24oc2VlZCk7XG4gICAgICBzdWJzY3JpYmUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgICB2YXIgaW5pdFNlbnQsIHJlcGx5LCBzZW5kSW5pdCwgdW5zdWI7XG4gICAgICAgICAgaW5pdFNlbnQgPSBmYWxzZTtcbiAgICAgICAgICB1bnN1YiA9IG5vcDtcbiAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgc2VuZEluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghaW5pdFNlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGFjYy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gc2luayhuZXcgSW5pdGlhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgIHVuc3ViKCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHVuc3ViID0gX3RoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBuZXh0LCBwcmV2O1xuICAgICAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgaWYgKGluaXRTZW50ICYmIGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZXYgPSBhY2MuZ2V0T3JFbHNlKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGYocHJldiwgZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgYWNjID0gbmV3IFNvbWUobmV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0UHJvcGVydHksIHNlbmRJbml0KTtcbiAgICAgICAgICByZXR1cm4gdW5zdWI7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHJldHVybiByZXN1bHRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eShkZXNjcmliZSh0aGlzLCBcInNjYW5cIiwgc2VlZCwgZiksIHN1YnNjcmliZSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbihzZWVkLCBmKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZm9sZFwiLCBzZWVkLCBmLCB0aGlzLnNjYW4oc2VlZCwgZikuc2FtcGxlZEJ5KHRoaXMuZmlsdGVyKGZhbHNlKS5tYXBFbmQoKS50b1Byb3BlcnR5KCkpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuemlwID0gZnVuY3Rpb24ob3RoZXIsIGYpIHtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IEFycmF5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInppcFwiLCBvdGhlciwgQmFjb24uemlwV2l0aChbdGhpcywgb3RoZXJdLCBmKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbihzdGFydCwgZikge1xuICAgICAgZiA9IHRvQ29tYmluYXRvcihmKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkaWZmXCIsIHN0YXJ0LCBmLCB0aGlzLnNjYW4oW3N0YXJ0XSwgZnVuY3Rpb24ocHJldlR1cGxlLCBuZXh0KSB7XG4gICAgICAgIHJldHVybiBbbmV4dCwgZihwcmV2VHVwbGVbMF0sIG5leHQpXTtcbiAgICAgIH0pLmZpbHRlcihmdW5jdGlvbih0dXBsZSkge1xuICAgICAgICByZXR1cm4gdHVwbGUubGVuZ3RoID09PSAyO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uKHR1cGxlKSB7XG4gICAgICAgIHJldHVybiB0dXBsZVsxXTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZsYXRNYXBfKHRoaXMsIG1ha2VTcGF3bmVyKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRmlyc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmd1bWVudHMpLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgbGltaXQ7XG4gICAgICBsaW1pdCA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFt0aGlzLCBcImZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdFwiLCBsaW1pdF0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmdzKSwgW2ZsYXRNYXBfKHRoaXMsIG1ha2VTcGF3bmVyKGFyZ3MpLCBmYWxzZSwgbGltaXQpXSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwTGF0ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZiwgc3RyZWFtO1xuICAgICAgZiA9IG1ha2VTcGF3bmVyKGFyZ3VtZW50cyk7XG4gICAgICBzdHJlYW0gPSB0aGlzLnRvRXZlbnRTdHJlYW0oKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmbGF0TWFwTGF0ZXN0XCIsIGYsIHN0cmVhbS5mbGF0TWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBtYWtlT2JzZXJ2YWJsZShmKHZhbHVlKSkudGFrZVVudGlsKHN0cmVhbSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBFcnJvciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZmxhdE1hcEVycm9yXCIsIGZuLCB0aGlzLm1hcEVycm9yKGZ1bmN0aW9uKGVycikge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycik7XG4gICAgICB9KS5mbGF0TWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgaWYgKHggaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBmbih4LmVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ub25jZSh4KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwQ29uY2F0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFt0aGlzLCBcImZsYXRNYXBDb25jYXRcIl0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmd1bWVudHMpLCBbdGhpcy5mbGF0TWFwV2l0aENvbmN1cnJlbmN5TGltaXQuYXBwbHkodGhpcywgWzFdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpXSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZSA9IGZ1bmN0aW9uKG1pbmltdW1JbnRlcnZhbCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlcmluZ1Rocm90dGxlXCIsIG1pbmltdW1JbnRlcnZhbCwgdGhpcy5mbGF0TWFwQ29uY2F0KGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCkuY29uY2F0KEJhY29uLmxhdGVyKG1pbmltdW1JbnRlcnZhbCkuZmlsdGVyKGZhbHNlKSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm5vdFwiLCB0aGlzLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiAheDtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwgPyB0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIiA/IGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIF9fc2xpY2UuY2FsbChhcmdzKS5jb25jYXQoW2V2ZW50LmxvZygpXSkpIDogdm9pZCAwIDogdm9pZCAwO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2xpZGluZ1dpbmRvdyA9IGZ1bmN0aW9uKG4sIG1pblZhbHVlcykge1xuICAgICAgaWYgKG1pblZhbHVlcyA9PSBudWxsKSB7XG4gICAgICAgIG1pblZhbHVlcyA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2xpZGluZ1dpbmRvd1wiLCBuLCBtaW5WYWx1ZXMsIHRoaXMuc2NhbihbXSwgKGZ1bmN0aW9uKHdpbmRvdywgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5jb25jYXQoW3ZhbHVlXSkuc2xpY2UoLW4pO1xuICAgICAgfSkpLmZpbHRlcigoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID49IG1pblZhbHVlcztcbiAgICAgIH0pKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbihvdGhlciwgZikge1xuICAgICAgdmFyIGNvbWJpbmF0b3I7XG4gICAgICBjb21iaW5hdG9yID0gdG9Db21iaW5hdG9yKGYpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImNvbWJpbmVcIiwgb3RoZXIsIGYsIEJhY29uLmNvbWJpbmVBc0FycmF5KHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBjb21iaW5hdG9yKHZhbHVlc1swXSwgdmFsdWVzWzFdKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oY2FzZXMpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWNvZGVcIiwgY2FzZXMsIHRoaXMuY29tYmluZShCYWNvbi5jb21iaW5lVGVtcGxhdGUoY2FzZXMpLCBmdW5jdGlvbihrZXksIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzW2tleV07XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmF3YWl0aW5nID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJhd2FpdGluZ1wiLCBvdGhlciwgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXModGhpcywgb3RoZXIpLm1hcChmdW5jdGlvbihfYXJnKSB7XG4gICAgICAgIHZhciBteVZhbHVlcywgb3RoZXJWYWx1ZXM7XG4gICAgICAgIG15VmFsdWVzID0gX2FyZ1swXSwgb3RoZXJWYWx1ZXMgPSBfYXJnWzFdO1xuICAgICAgICByZXR1cm4gb3RoZXJWYWx1ZXMubGVuZ3RoID09PSAwO1xuICAgICAgfSkudG9Qcm9wZXJ0eShmYWxzZSkuc2tpcER1cGxpY2F0ZXMoKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS53aXRoRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkZXNjcmliZS5hcHBseShudWxsLCBhcmd1bWVudHMpLmFwcGx5KHRoaXMpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuX25hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmludGVybmFsRGVwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbERlc2MuZGVwcygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gT2JzZXJ2YWJsZTtcblxuICB9KSgpO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLnJlZHVjZSA9IE9ic2VydmFibGUucHJvdG90eXBlLmZvbGQ7XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuYXNzaWduID0gT2JzZXJ2YWJsZS5wcm90b3R5cGUub25WYWx1ZTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5pbnNwZWN0ID0gT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmc7XG5cbiAgZmxhdE1hcF8gPSBmdW5jdGlvbihyb290LCBmLCBmaXJzdE9ubHksIGxpbWl0KSB7XG4gICAgdmFyIGNoaWxkRGVwcywgcmVzdWx0LCByb290RGVwO1xuICAgIHJvb3REZXAgPSBbcm9vdF07XG4gICAgY2hpbGREZXBzID0gW107XG4gICAgcmVzdWx0ID0gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHJvb3QsIFwiZmxhdE1hcFwiICsgKGZpcnN0T25seSA/IFwiRmlyc3RcIiA6IFwiXCIpLCBmKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGNoZWNrRW5kLCBjaGVja1F1ZXVlLCBjb21wb3NpdGUsIHF1ZXVlLCBzcGF3bjtcbiAgICAgIGNvbXBvc2l0ZSA9IG5ldyBDb21wb3NpdGVVbnN1YnNjcmliZSgpO1xuICAgICAgcXVldWUgPSBbXTtcbiAgICAgIHNwYXduID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGNoaWxkO1xuICAgICAgICBjaGlsZCA9IG1ha2VPYnNlcnZhYmxlKGYoZXZlbnQudmFsdWUoKSkpO1xuICAgICAgICBjaGlsZERlcHMucHVzaChjaGlsZCk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGUuYWRkKGZ1bmN0aW9uKHVuc3ViQWxsLCB1bnN1Yk1lKSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICBfLnJlbW92ZShjaGlsZCwgY2hpbGREZXBzKTtcbiAgICAgICAgICAgICAgY2hlY2tRdWV1ZSgpO1xuICAgICAgICAgICAgICBjaGVja0VuZCh1bnN1Yk1lKTtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50LnRvTmV4dCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWJBbGwoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIGNoZWNrUXVldWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV2ZW50O1xuICAgICAgICBldmVudCA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgIHJldHVybiBzcGF3bihldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGVja0VuZCA9IGZ1bmN0aW9uKHVuc3ViKSB7XG4gICAgICAgIHVuc3ViKCk7XG4gICAgICAgIGlmIChjb21wb3NpdGUuZW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbXBvc2l0ZS5hZGQoZnVuY3Rpb24oX18sIHVuc3ViUm9vdCkge1xuICAgICAgICByZXR1cm4gcm9vdC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tFbmQodW5zdWJSb290KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RPbmx5ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb21wb3NpdGUudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGltaXQgJiYgY29tcG9zaXRlLmNvdW50KCkgPiBsaW1pdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcXVldWUucHVzaChldmVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjb21wb3NpdGUudW5zdWJzY3JpYmU7XG4gICAgfSk7XG4gICAgcmVzdWx0LmludGVybmFsRGVwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNoaWxkRGVwcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJvb3REZXAuY29uY2F0KGNoaWxkRGVwcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcm9vdERlcDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgRXZlbnRTdHJlYW0gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEV2ZW50U3RyZWFtLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gRXZlbnRTdHJlYW0oZGVzYywgc3Vic2NyaWJlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihkZXNjKSkge1xuICAgICAgICBoYW5kbGVyID0gc3Vic2NyaWJlO1xuICAgICAgICBzdWJzY3JpYmUgPSBkZXNjO1xuICAgICAgICBkZXNjID0gW107XG4gICAgICB9XG4gICAgICBFdmVudFN0cmVhbS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjKTtcbiAgICAgIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcihzdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgICAgcmVnaXN0ZXJPYnModGhpcyk7XG4gICAgfVxuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWxheVwiLCBkZWxheSwgdGhpcy5mbGF0TWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5sYXRlcihkZWxheSwgdmFsdWUpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2UgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlYm91bmNlXCIsIGRlbGF5LCB0aGlzLmZsYXRNYXBMYXRlc3QoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWJvdW5jZUltbWVkaWF0ZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVib3VuY2VJbW1lZGlhdGVcIiwgZGVsYXksIHRoaXMuZmxhdE1hcEZpcnN0KGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKHZhbHVlKS5jb25jYXQoQmFjb24ubGF0ZXIoZGVsYXkpLmZpbHRlcihmYWxzZSkpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRocm90dGxlXCIsIGRlbGF5LCB0aGlzLmJ1ZmZlcldpdGhUaW1lKGRlbGF5KS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aFRpbWUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlcldpdGhUaW1lXCIsIGRlbGF5LCB0aGlzLmJ1ZmZlcldpdGhUaW1lT3JDb3VudChkZWxheSwgTnVtYmVyLk1BWF9WQUxVRSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aENvdW50ID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJXaXRoQ291bnRcIiwgY291bnQsIHRoaXMuYnVmZmVyV2l0aFRpbWVPckNvdW50KHZvaWQgMCwgY291bnQpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCA9IGZ1bmN0aW9uKGRlbGF5LCBjb3VudCkge1xuICAgICAgdmFyIGZsdXNoT3JTY2hlZHVsZTtcbiAgICAgIGZsdXNoT3JTY2hlZHVsZSA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICBpZiAoYnVmZmVyLnZhbHVlcy5sZW5ndGggPT09IGNvdW50KSB7XG4gICAgICAgICAgcmV0dXJuIGJ1ZmZlci5mbHVzaCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGRlbGF5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gYnVmZmVyLnNjaGVkdWxlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aFRpbWVPckNvdW50XCIsIGRlbGF5LCBjb3VudCwgdGhpcy5idWZmZXIoZGVsYXksIGZsdXNoT3JTY2hlZHVsZSwgZmx1c2hPclNjaGVkdWxlKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXIgPSBmdW5jdGlvbihkZWxheSwgb25JbnB1dCwgb25GbHVzaCkge1xuICAgICAgdmFyIGJ1ZmZlciwgZGVsYXlNcywgcmVwbHk7XG4gICAgICBpZiAob25JbnB1dCA9PSBudWxsKSB7XG4gICAgICAgIG9uSW5wdXQgPSBub3A7XG4gICAgICB9XG4gICAgICBpZiAob25GbHVzaCA9PSBudWxsKSB7XG4gICAgICAgIG9uRmx1c2ggPSBub3A7XG4gICAgICB9XG4gICAgICBidWZmZXIgPSB7XG4gICAgICAgIHNjaGVkdWxlZDogZmFsc2UsXG4gICAgICAgIGVuZDogdm9pZCAwLFxuICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICBmbHVzaDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgIHRoaXMuc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG5leHQodGhpcy52YWx1ZXMpKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5lbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb25GbHVzaCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaCh0aGlzLmVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzY2hlZHVsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLnNjaGVkdWxlZCkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGF5KChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmZsdXNoKCk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgaWYgKCFpc0Z1bmN0aW9uKGRlbGF5KSkge1xuICAgICAgICBkZWxheU1zID0gZGVsYXk7XG4gICAgICAgIGRlbGF5ID0gZnVuY3Rpb24oZikge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5zY2hlZHVsZXIuc2V0VGltZW91dChmLCBkZWxheU1zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBidWZmZXIucHVzaCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpO1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICBidWZmZXIuZW5kID0gZXZlbnQ7XG4gICAgICAgICAgaWYgKCFidWZmZXIuc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICBidWZmZXIuZmx1c2goKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmZmVyLnZhbHVlcy5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgIG9uSW5wdXQoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgICB2YXIgbGVmdDtcbiAgICAgIGFzc2VydEV2ZW50U3RyZWFtKHJpZ2h0KTtcbiAgICAgIGxlZnQgPSB0aGlzO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihsZWZ0LCBcIm1lcmdlXCIsIHJpZ2h0LCBCYWNvbi5tZXJnZUFsbCh0aGlzLCByaWdodCkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudG9Qcm9wZXJ0eSA9IGZ1bmN0aW9uKGluaXRWYWx1ZV8pIHtcbiAgICAgIHZhciBkaXNwLCBpbml0VmFsdWU7XG4gICAgICBpbml0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAwID8gTm9uZSA6IHRvT3B0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaW5pdFZhbHVlXztcbiAgICAgIH0pO1xuICAgICAgZGlzcCA9IHRoaXMuZGlzcGF0Y2hlcjtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJ0b1Byb3BlcnR5XCIsIGluaXRWYWx1ZV8pLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciBpbml0U2VudCwgcmVwbHksIHNlbmRJbml0LCB1bnN1YjtcbiAgICAgICAgaW5pdFNlbnQgPSBmYWxzZTtcbiAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgc2VuZEluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIWluaXRTZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5pdFZhbHVlLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICByZXBseSA9IHNpbmsobmV3IEluaXRpYWwodmFsdWUpKTtcbiAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICB1bnN1YigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bnN1YiA9IG5vcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB1bnN1YiA9IGRpc3Auc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgIGlmIChpbml0U2VudCAmJiBldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgICBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5pdFZhbHVlID0gbmV3IFNvbWUoZXZlbnQpO1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2VuZEluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZW5kSW5pdCgpO1xuICAgICAgICByZXR1cm4gdW5zdWI7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRvRXZlbnRTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuc2FtcGxlZEJ5ID0gZnVuY3Rpb24oc2FtcGxlciwgY29tYmluYXRvcikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNhbXBsZWRCeVwiLCBzYW1wbGVyLCBjb21iaW5hdG9yLCB0aGlzLnRvUHJvcGVydHkoKS5zYW1wbGVkQnkoc2FtcGxlciwgY29tYmluYXRvcikpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24ocmlnaHQpIHtcbiAgICAgIHZhciBsZWZ0O1xuICAgICAgbGVmdCA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKGxlZnQsIFwiY29uY2F0XCIsIHJpZ2h0KSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgdW5zdWJMZWZ0LCB1bnN1YlJpZ2h0O1xuICAgICAgICB1bnN1YlJpZ2h0ID0gbm9wO1xuICAgICAgICB1bnN1YkxlZnQgPSBsZWZ0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZS5pc0VuZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5zdWJSaWdodCA9IHJpZ2h0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdW5zdWJMZWZ0KCk7XG4gICAgICAgICAgcmV0dXJuIHVuc3ViUmlnaHQoKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24oc3RvcHBlcikge1xuICAgICAgdmFyIGVuZE1hcmtlcjtcbiAgICAgIGVuZE1hcmtlciA9IHt9O1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRha2VVbnRpbFwiLCBzdG9wcGVyLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLm1hcEVuZChlbmRNYXJrZXIpLCBzdG9wcGVyLnNraXBFcnJvcnMoKSkud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGRhdGEsIHJlcGx5LCB2YWx1ZSwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVmMSA9IGV2ZW50LnZhbHVlKCksIGRhdGEgPSBfcmVmMVswXSwgc3RvcHBlciA9IF9yZWYxWzFdO1xuICAgICAgICAgIGlmIChzdG9wcGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gZGF0YS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFbX2ldO1xuICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGVuZE1hcmtlcikge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChuZXh0KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBVbnRpbCA9IGZ1bmN0aW9uKHN0YXJ0ZXIpIHtcbiAgICAgIHZhciBzdGFydGVkO1xuICAgICAgc3RhcnRlZCA9IHN0YXJ0ZXIudGFrZSgxKS5tYXAodHJ1ZSkudG9Qcm9wZXJ0eShmYWxzZSk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcFVudGlsXCIsIHN0YXJ0ZXIsIHRoaXMuZmlsdGVyKHN0YXJ0ZWQpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBXaGlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGYsIG9rO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBvayA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwV2hpbGVcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChvayB8fCAhZXZlbnQuaGFzVmFsdWUoKSB8fCAhZihldmVudC52YWx1ZSgpKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5ob2xkV2hlbiA9IGZ1bmN0aW9uKHZhbHZlKSB7XG4gICAgICB2YXIgcHV0VG9Ib2xkLCByZWxlYXNlSG9sZCwgdmFsdmVfO1xuICAgICAgdmFsdmVfID0gdmFsdmUuc3RhcnRXaXRoKGZhbHNlKTtcbiAgICAgIHJlbGVhc2VIb2xkID0gdmFsdmVfLmZpbHRlcihmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiAheDtcbiAgICAgIH0pO1xuICAgICAgcHV0VG9Ib2xkID0gdmFsdmVfLmZpbHRlcihfLmlkKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJob2xkV2hlblwiLCB2YWx2ZSwgdGhpcy5maWx0ZXIoZmFsc2UpLm1lcmdlKHZhbHZlXy5mbGF0TWFwQ29uY2F0KChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2hvdWxkSG9sZCkge1xuICAgICAgICAgIGlmICghc2hvdWxkSG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnRha2VVbnRpbChwdXRUb0hvbGQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuc2NhbihbXSwgKGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICAgICAgICAgIHJldHVybiB4cy5jb25jYXQoeCk7XG4gICAgICAgICAgICB9KSkuc2FtcGxlZEJ5KHJlbGVhc2VIb2xkKS50YWtlKDEpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSkpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHNlZWQpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzdGFydFdpdGhcIiwgc2VlZCwgQmFjb24ub25jZShzZWVkKS5jb25jYXQodGhpcykpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUud2l0aEhhbmRsZXIgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwid2l0aEhhbmRsZXJcIiwgaGFuZGxlciksIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRTdHJlYW07XG5cbiAgfSkoT2JzZXJ2YWJsZSk7XG5cbiAgUHJvcGVydHkgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb3BlcnR5LCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gUHJvcGVydHkoZGVzYywgc3Vic2NyaWJlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihkZXNjKSkge1xuICAgICAgICBoYW5kbGVyID0gc3Vic2NyaWJlO1xuICAgICAgICBzdWJzY3JpYmUgPSBkZXNjO1xuICAgICAgICBkZXNjID0gW107XG4gICAgICB9XG4gICAgICBQcm9wZXJ0eS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjKTtcbiAgICAgIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgUHJvcGVydHlEaXNwYXRjaGVyKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgICByZWdpc3Rlck9icyh0aGlzKTtcbiAgICB9XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuc2FtcGxlZEJ5ID0gZnVuY3Rpb24oc2FtcGxlciwgY29tYmluYXRvcikge1xuICAgICAgdmFyIGxhenksIHJlc3VsdCwgc2FtcGxlclNvdXJjZSwgc3RyZWFtLCB0aGlzU291cmNlO1xuICAgICAgaWYgKGNvbWJpbmF0b3IgIT0gbnVsbCkge1xuICAgICAgICBjb21iaW5hdG9yID0gdG9Db21iaW5hdG9yKGNvbWJpbmF0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGF6eSA9IHRydWU7XG4gICAgICAgIGNvbWJpbmF0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgcmV0dXJuIGYudmFsdWUoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHRoaXNTb3VyY2UgPSBuZXcgU291cmNlKHRoaXMsIGZhbHNlLCBsYXp5KTtcbiAgICAgIHNhbXBsZXJTb3VyY2UgPSBuZXcgU291cmNlKHNhbXBsZXIsIHRydWUsIGxhenkpO1xuICAgICAgc3RyZWFtID0gQmFjb24ud2hlbihbdGhpc1NvdXJjZSwgc2FtcGxlclNvdXJjZV0sIGNvbWJpbmF0b3IpO1xuICAgICAgcmVzdWx0ID0gc2FtcGxlciBpbnN0YW5jZW9mIFByb3BlcnR5ID8gc3RyZWFtLnRvUHJvcGVydHkoKSA6IHN0cmVhbTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVkQnlcIiwgc2FtcGxlciwgY29tYmluYXRvciwgcmVzdWx0KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnNhbXBsZSA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2FtcGxlXCIsIGludGVydmFsLCB0aGlzLnNhbXBsZWRCeShCYWNvbi5pbnRlcnZhbChpbnRlcnZhbCwge30pKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5jaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwiY2hhbmdlc1wiKSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLndpdGhIYW5kbGVyID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eShkZXNjcmliZSh0aGlzLCBcIndpdGhIYW5kbGVyXCIsIGhhbmRsZXIpLCB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnRvUHJvcGVydHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIGFzc2VydE5vQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnRvRXZlbnRTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUodGhpcywgXCJ0b0V2ZW50U3RyZWFtXCIpLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICBldmVudCA9IGV2ZW50LnRvTmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJhbmRcIiwgb3RoZXIsIHRoaXMuY29tYmluZShvdGhlciwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4geCAmJiB5O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUub3IgPSBmdW5jdGlvbihvdGhlcikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm9yXCIsIG90aGVyLCB0aGlzLmNvbWJpbmUob3RoZXIsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHggfHwgeTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhcImRlbGF5XCIsIGRlbGF5LCBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VzLmRlbGF5KGRlbGF5KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuZGVib3VuY2UgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwiZGVib3VuY2VcIiwgZGVsYXksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5nZXMuZGVib3VuY2UoZGVsYXkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMoXCJ0aHJvdHRsZVwiLCBkZWxheSwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICByZXR1cm4gY2hhbmdlcy50aHJvdHRsZShkZWxheSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmRlbGF5Q2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRlc2MsIGYsIF9pO1xuICAgICAgZGVzYyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIF9pID0gYXJndW1lbnRzLmxlbmd0aCAtIDEpIDogKF9pID0gMCwgW10pLCBmID0gYXJndW1lbnRzW19pKytdO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpc10uY29uY2F0KF9fc2xpY2UuY2FsbChkZXNjKSwgW2FkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0odGhpcywgZih0aGlzLmNoYW5nZXMoKSkpXSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24oc3RvcHBlcikge1xuICAgICAgdmFyIGNoYW5nZXM7XG4gICAgICBjaGFuZ2VzID0gdGhpcy5jaGFuZ2VzKCkudGFrZVVudGlsKHN0b3BwZXIpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRha2VVbnRpbFwiLCBzdG9wcGVyLCBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGNoYW5nZXMpKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic3RhcnRXaXRoXCIsIHZhbHVlLCB0aGlzLnNjYW4odmFsdWUsIGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5idWZmZXJpbmdUaHJvdHRsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF9yZWYxO1xuICAgICAgcmV0dXJuIChfcmVmMSA9IFByb3BlcnR5Ll9fc3VwZXJfXy5idWZmZXJpbmdUaHJvdHRsZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKS5idWZmZXJpbmdUaHJvdHRsZS5hcHBseShfcmVmMSwgYXJndW1lbnRzKS50b1Byb3BlcnR5KCk7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm9wZXJ0eTtcblxuICB9KShPYnNlcnZhYmxlKTtcblxuICBjb252ZXJ0QXJnc1RvRnVuY3Rpb24gPSBmdW5jdGlvbihvYnMsIGYsIGFyZ3MsIG1ldGhvZCkge1xuICAgIHZhciBzYW1wbGVkO1xuICAgIGlmIChmIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgIHNhbXBsZWQgPSBmLnNhbXBsZWRCeShvYnMsIGZ1bmN0aW9uKHAsIHMpIHtcbiAgICAgICAgcmV0dXJuIFtwLCBzXTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHNhbXBsZWQsIGZ1bmN0aW9uKF9hcmcpIHtcbiAgICAgICAgdmFyIHAsIHM7XG4gICAgICAgIHAgPSBfYXJnWzBdLCBzID0gX2FyZ1sxXTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24oX2FyZykge1xuICAgICAgICB2YXIgcCwgcztcbiAgICAgICAgcCA9IF9hcmdbMF0sIHMgPSBfYXJnWzFdO1xuICAgICAgICByZXR1cm4gcztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpO1xuICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKG9icywgZik7XG4gICAgfVxuICB9O1xuXG4gIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0gPSBmdW5jdGlvbihwcm9wZXJ0eSwgc3RyZWFtKSB7XG4gICAgdmFyIGp1c3RJbml0VmFsdWU7XG4gICAganVzdEluaXRWYWx1ZSA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShwcm9wZXJ0eSwgXCJqdXN0SW5pdFZhbHVlXCIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgdW5zdWIsIHZhbHVlO1xuICAgICAgdmFsdWUgPSB2b2lkIDA7XG4gICAgICB1bnN1YiA9IHByb3BlcnR5LmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIHZhbHVlID0gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgIH0pO1xuICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgoanVzdEluaXRWYWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgc2luayh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpbmsoZW5kKCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGp1c3RJbml0VmFsdWUuY29uY2F0KHN0cmVhbSkudG9Qcm9wZXJ0eSgpO1xuICB9O1xuXG4gIERpc3BhdGNoZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRGlzcGF0Y2hlcihfc3Vic2NyaWJlLCBfaGFuZGxlRXZlbnQpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmliZSA9IF9zdWJzY3JpYmU7XG4gICAgICB0aGlzLl9oYW5kbGVFdmVudCA9IF9oYW5kbGVFdmVudDtcbiAgICAgIHRoaXMuc3Vic2NyaWJlID0gX19iaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIHRoaXMuaGFuZGxlRXZlbnQgPSBfX2JpbmQodGhpcy5oYW5kbGVFdmVudCwgdGhpcyk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wcmV2RXJyb3IgPSB2b2lkIDA7XG4gICAgICB0aGlzLnVuc3ViU3JjID0gdm9pZCAwO1xuICAgIH1cblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLmhhc1N1YnNjcmliZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCA+IDA7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucyA9IF8ud2l0aG91dChzdWJzY3JpcHRpb24sIHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gVXBkYXRlQmFycmllci5pblRyYW5zYWN0aW9uKGV2ZW50LCB0aGlzLCB0aGlzLnB1c2hJdCwgW2V2ZW50XSk7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnB1c2hUb1N1YnNjcmlwdGlvbnMgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGUsIHJlcGx5LCBzdWIsIHRtcCwgX2ksIF9sZW47XG4gICAgICB0cnkge1xuICAgICAgICB0bXAgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gdG1wLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgc3ViID0gdG1wW19pXTtcbiAgICAgICAgICByZXBseSA9IHN1Yi5zaW5rKGV2ZW50KTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSB8fCBldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoSXQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCF0aGlzLnB1c2hpbmcpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSB0aGlzLnByZXZFcnJvcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgdGhpcy5wcmV2RXJyb3IgPSBldmVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnB1c2hUb1N1YnNjcmlwdGlvbnMoZXZlbnQpO1xuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgZXZlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21Tb3VyY2UoKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKHRoaXMuX2hhbmRsZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFdmVudChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5zdWJzY3JpYmVGcm9tU291cmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YlNyYykge1xuICAgICAgICB0aGlzLnVuc3ViU3JjKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51bnN1YlNyYyA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXNzZXJ0RnVuY3Rpb24oc2luayk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICBzaW5rOiBzaW5rXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy51bnN1YlNyYyA9IHRoaXMuX3N1YnNjcmliZSh0aGlzLmhhbmRsZUV2ZW50KTtcbiAgICAgICAgICBhc3NlcnRGdW5jdGlvbih0aGlzLnVuc3ViU3JjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlU3ViKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoIV90aGlzLmhhc1N1YnNjcmliZXJzKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRGlzcGF0Y2hlcjtcblxuICB9KSgpO1xuXG4gIFByb3BlcnR5RGlzcGF0Y2hlciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJvcGVydHlEaXNwYXRjaGVyLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gUHJvcGVydHlEaXNwYXRjaGVyKHByb3BlcnR5LCBzdWJzY3JpYmUsIGhhbmRsZUV2ZW50KSB7XG4gICAgICB0aGlzLnByb3BlcnR5ID0gcHJvcGVydHk7XG4gICAgICB0aGlzLnN1YnNjcmliZSA9IF9fYmluZCh0aGlzLnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICBQcm9wZXJ0eURpc3BhdGNoZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgc3Vic2NyaWJlLCBoYW5kbGVFdmVudCk7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBOb25lO1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPSB2b2lkIDA7XG4gICAgICB0aGlzLnByb3BlcnR5RW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPSBVcGRhdGVCYXJyaWVyLmN1cnJlbnRFdmVudElkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvcGVydHlEaXNwYXRjaGVyLl9fc3VwZXJfXy5wdXNoLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLm1heWJlU3ViU291cmNlID0gZnVuY3Rpb24oc2luaywgcmVwbHkpIHtcbiAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcGVydHlFbmRlZCkge1xuICAgICAgICBzaW5rKGVuZCgpKTtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUuY2FsbCh0aGlzLCBzaW5rKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgZGlzcGF0Y2hpbmdJZCwgaW5pdFNlbnQsIHJlcGx5LCB2YWxJZDtcbiAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50LmlzRGVmaW5lZCAmJiAodGhpcy5oYXNTdWJzY3JpYmVycygpIHx8IHRoaXMucHJvcGVydHlFbmRlZCkpIHtcbiAgICAgICAgZGlzcGF0Y2hpbmdJZCA9IFVwZGF0ZUJhcnJpZXIuY3VycmVudEV2ZW50SWQoKTtcbiAgICAgICAgdmFsSWQgPSB0aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZDtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BlcnR5RW5kZWQgJiYgdmFsSWQgJiYgZGlzcGF0Y2hpbmdJZCAmJiBkaXNwYXRjaGluZ0lkICE9PSB2YWxJZCkge1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHRoaXMucHJvcGVydHksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFZhbHVlUm9vdElkID09PSB2YWxJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGluaXRpYWwoX3RoaXMuY3VycmVudC5nZXQoKS52YWx1ZSgpKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBVcGRhdGVCYXJyaWVyLmluVHJhbnNhY3Rpb24odm9pZCAwLCB0aGlzLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHkgPSBzaW5rKGluaXRpYWwodGhpcy5jdXJyZW50LmdldCgpLnZhbHVlKCkpKTtcbiAgICAgICAgICB9KSwgW10pO1xuICAgICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gUHJvcGVydHlEaXNwYXRjaGVyO1xuXG4gIH0pKERpc3BhdGNoZXIpO1xuXG4gIEJ1cyA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnVzLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gQnVzKCkge1xuICAgICAgdGhpcy5ndWFyZGVkU2luayA9IF9fYmluZCh0aGlzLmd1YXJkZWRTaW5rLCB0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlQWxsID0gX19iaW5kKHRoaXMuc3Vic2NyaWJlQWxsLCB0aGlzKTtcbiAgICAgIHRoaXMudW5zdWJBbGwgPSBfX2JpbmQodGhpcy51bnN1YkFsbCwgdGhpcyk7XG4gICAgICB0aGlzLnNpbmsgPSB2b2lkIDA7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIEJ1cy5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjcmliZShCYWNvbiwgXCJCdXNcIiksIHRoaXMuc3Vic2NyaWJlQWxsKTtcbiAgICB9XG5cbiAgICBCdXMucHJvdG90eXBlLnVuc3ViQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3ViLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICBfcmVmMSA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgc3ViID0gX3JlZjFbX2ldO1xuICAgICAgICBpZiAodHlwZW9mIHN1Yi51bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuc3Vic2NyaWJlQWxsID0gZnVuY3Rpb24obmV3U2luaykge1xuICAgICAgdmFyIHN1YnNjcmlwdGlvbiwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgdGhpcy5zaW5rID0gbmV3U2luaztcbiAgICAgIF9yZWYxID0gY2xvbmVBcnJheSh0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzdWJzY3JpcHRpb24gPSBfcmVmMVtfaV07XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlSW5wdXQoc3Vic2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnVuc3ViQWxsO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmd1YXJkZWRTaW5rID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIF90aGlzLnVuc3Vic2NyaWJlSW5wdXQoaW5wdXQpO1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNpbmsoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnN1YnNjcmliZUlucHV0ID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLnVuc3ViID0gc3Vic2NyaXB0aW9uLmlucHV0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKHRoaXMuZ3VhcmRlZFNpbmsoc3Vic2NyaXB0aW9uLmlucHV0KSk7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUudW5zdWJzY3JpYmVJbnB1dCA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgaSwgc3ViLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICBfcmVmMSA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICBzdWIgPSBfcmVmMVtpXTtcbiAgICAgICAgaWYgKHN1Yi5pbnB1dCA9PT0gaW5wdXQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHN1Yi51bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBzdWIudW5zdWIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5wbHVnID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHZhciBzdWI7XG4gICAgICBhc3NlcnRPYnNlcnZhYmxlKGlucHV0KTtcbiAgICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN1YiA9IHtcbiAgICAgICAgaW5wdXQ6IGlucHV0XG4gICAgICB9O1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3ViKTtcbiAgICAgIGlmICgodGhpcy5zaW5rICE9IG51bGwpKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlSW5wdXQoc3ViKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgICB0aGlzLnVuc3ViQWxsKCk7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKGVuZCgpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnNpbmsobmV4dCh2YWx1ZSkpIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnNpbmsobmV3IEVycm9yKGVycm9yKSkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIHJldHVybiBCdXM7XG5cbiAgfSkoRXZlbnRTdHJlYW0pO1xuXG4gIFNvdXJjZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTb3VyY2Uob2JzLCBzeW5jLCBsYXp5KSB7XG4gICAgICB0aGlzLm9icyA9IG9icztcbiAgICAgIHRoaXMuc3luYyA9IHN5bmM7XG4gICAgICB0aGlzLmxhenkgPSBsYXp5ICE9IG51bGwgPyBsYXp5IDogZmFsc2U7XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgfVxuXG4gICAgU291cmNlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm9icy50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLm1hcmtFbmRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmNvbnN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogXy5hbHdheXModGhpcy5xdWV1ZVswXSlcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlWzBdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZSA9IFt4XTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5tYXlIYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5oYXNBdExlYXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuZmxhdHRlbiA9IHRydWU7XG5cbiAgICByZXR1cm4gU291cmNlO1xuXG4gIH0pKCk7XG5cbiAgQ29uc3VtaW5nU291cmNlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb25zdW1pbmdTb3VyY2UsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBDb25zdW1pbmdTb3VyY2UoKSB7XG4gICAgICByZXR1cm4gQ29uc3VtaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaCh4KTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5tYXlIYXZlID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuICF0aGlzLmVuZGVkIHx8IHRoaXMucXVldWUubGVuZ3RoID49IGM7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aCA+PSBjO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSBmYWxzZTtcblxuICAgIHJldHVybiBDb25zdW1pbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBCdWZmZXJpbmdTb3VyY2UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1ZmZlcmluZ1NvdXJjZSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEJ1ZmZlcmluZ1NvdXJjZShvYnMpIHtcbiAgICAgIEJ1ZmZlcmluZ1NvdXJjZS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvYnMsIHRydWUpO1xuICAgIH1cblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlcztcbiAgICAgIHZhbHVlcyA9IHRoaXMucXVldWU7XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaCh4LnZhbHVlKCkpO1xuICAgIH07XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLmhhc0F0TGVhc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gQnVmZmVyaW5nU291cmNlO1xuXG4gIH0pKFNvdXJjZSk7XG5cbiAgU291cmNlLmlzVHJpZ2dlciA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocyBpbnN0YW5jZW9mIFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHMuc3luYztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHMgaW5zdGFuY2VvZiBFdmVudFN0cmVhbTtcbiAgICB9XG4gIH07XG5cbiAgU291cmNlLmZyb21PYnNlcnZhYmxlID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzIGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gcztcbiAgICB9IGVsc2UgaWYgKHMgaW5zdGFuY2VvZiBQcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIG5ldyBTb3VyY2UocywgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IENvbnN1bWluZ1NvdXJjZShzLCB0cnVlKTtcbiAgICB9XG4gIH07XG5cbiAgZGVzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgY29udGV4dCwgbWV0aG9kO1xuICAgIGNvbnRleHQgPSBhcmd1bWVudHNbMF0sIG1ldGhvZCA9IGFyZ3VtZW50c1sxXSwgYXJncyA9IDMgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogW107XG4gICAgaWYgKChjb250ZXh0IHx8IG1ldGhvZCkgaW5zdGFuY2VvZiBEZXNjKSB7XG4gICAgICByZXR1cm4gY29udGV4dCB8fCBtZXRob2Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRGVzYyhjb250ZXh0LCBtZXRob2QsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBmaW5kRGVwcyA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoaXNBcnJheSh4KSkge1xuICAgICAgcmV0dXJuIF8uZmxhdE1hcChmaW5kRGVwcywgeCk7XG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUoeCkpIHtcbiAgICAgIHJldHVybiBbeF07XG4gICAgfSBlbHNlIGlmICh4IGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gW3gub2JzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfTtcblxuICBEZXNjID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIERlc2MoY29udGV4dCwgbWV0aG9kLCBhcmdzKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgdGhpcy5jYWNoZWQgPSB2b2lkIDA7XG4gICAgfVxuXG4gICAgRGVzYy5wcm90b3R5cGUuZGVwcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkIHx8ICh0aGlzLmNhY2hlZCA9IGZpbmREZXBzKFt0aGlzLmNvbnRleHRdLmNvbmNhdCh0aGlzLmFyZ3MpKSk7XG4gICAgfTtcblxuICAgIERlc2MucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICBvYnMuZGVzYyA9IHRoaXM7XG4gICAgICByZXR1cm4gb2JzO1xuICAgIH07XG5cbiAgICBEZXNjLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy5jb250ZXh0KSArIFwiLlwiICsgXy50b1N0cmluZyh0aGlzLm1ldGhvZCkgKyBcIihcIiArIF8ubWFwKF8udG9TdHJpbmcsIHRoaXMuYXJncykgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERlc2M7XG5cbiAgfSkoKTtcblxuICB3aXRoRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVzYywgb2JzLCBfaTtcbiAgICBkZXNjID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgX2kgPSBhcmd1bWVudHMubGVuZ3RoIC0gMSkgOiAoX2kgPSAwLCBbXSksIG9icyA9IGFyZ3VtZW50c1tfaSsrXTtcbiAgICByZXR1cm4gZGVzY3JpYmUuYXBwbHkobnVsbCwgZGVzYykuYXBwbHkob2JzKTtcbiAgfTtcblxuICBCYWNvbi53aGVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIGksIGluZGV4LCBpeCwgbGVuLCBuZWVkc0JhcnJpZXIsIHBhdCwgcGF0U291cmNlcywgcGF0cywgcGF0dGVybnMsIHJlc3VsdFN0cmVhbSwgcywgc291cmNlcywgdHJpZ2dlckZvdW5kLCB1c2FnZSwgX2ksIF9qLCBfbGVuLCBfbGVuMSwgX3JlZjE7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgIH1cbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHVzYWdlID0gXCJ3aGVuOiBleHBlY3RpbmcgYXJndW1lbnRzIGluIHRoZSBmb3JtIChPYnNlcnZhYmxlKyxmdW5jdGlvbikrXCI7XG4gICAgYXNzZXJ0KHVzYWdlLCBsZW4gJSAyID09PSAwKTtcbiAgICBzb3VyY2VzID0gW107XG4gICAgcGF0cyA9IFtdO1xuICAgIGkgPSAwO1xuICAgIHBhdHRlcm5zID0gW107XG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHBhdHRlcm5zW2ldID0gYXJndW1lbnRzW2ldO1xuICAgICAgcGF0dGVybnNbaSArIDFdID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIHBhdFNvdXJjZXMgPSBfLnRvQXJyYXkoYXJndW1lbnRzW2ldKTtcbiAgICAgIGYgPSBjb25zdGFudFRvRnVuY3Rpb24oYXJndW1lbnRzW2kgKyAxXSk7XG4gICAgICBwYXQgPSB7XG4gICAgICAgIGY6IGYsXG4gICAgICAgIGl4czogW11cbiAgICAgIH07XG4gICAgICB0cmlnZ2VyRm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gcGF0U291cmNlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzID0gcGF0U291cmNlc1tfaV07XG4gICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHNvdXJjZXMsIHMpO1xuICAgICAgICBpZiAoIXRyaWdnZXJGb3VuZCkge1xuICAgICAgICAgIHRyaWdnZXJGb3VuZCA9IFNvdXJjZS5pc1RyaWdnZXIocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHNvdXJjZXMucHVzaChzKTtcbiAgICAgICAgICBpbmRleCA9IHNvdXJjZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBfcmVmMSA9IHBhdC5peHM7XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYxLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGl4ID0gX3JlZjFbX2pdO1xuICAgICAgICAgIGlmIChpeC5pbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGl4LmNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdC5peHMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGNvdW50OiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYXNzZXJ0KFwiQXQgbGVhc3Qgb25lIEV2ZW50U3RyZWFtIHJlcXVpcmVkXCIsIHRyaWdnZXJGb3VuZCB8fCAoIXBhdFNvdXJjZXMubGVuZ3RoKSk7XG4gICAgICBpZiAocGF0U291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdHMucHVzaChwYXQpO1xuICAgICAgfVxuICAgICAgaSA9IGkgKyAyO1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgc291cmNlcyA9IF8ubWFwKFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSwgc291cmNlcyk7XG4gICAgbmVlZHNCYXJyaWVyID0gKF8uYW55KHNvdXJjZXMsIGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLmZsYXR0ZW47XG4gICAgfSkpICYmIChjb250YWluc0R1cGxpY2F0ZURlcHMoXy5tYXAoKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLm9icztcbiAgICB9KSwgc291cmNlcykpKTtcbiAgICByZXR1cm4gcmVzdWx0U3RyZWFtID0gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ3aGVuXCJdLmNvbmNhdChfX3NsaWNlLmNhbGwocGF0dGVybnMpKSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBjYW5ub3RNYXRjaCwgY2Fubm90U3luYywgZW5kcywgbWF0Y2gsIG5vbkZsYXR0ZW5lZCwgcGFydCwgdHJpZ2dlcnM7XG4gICAgICB0cmlnZ2VycyA9IFtdO1xuICAgICAgZW5kcyA9IGZhbHNlO1xuICAgICAgbWF0Y2ggPSBmdW5jdGlvbihwKSB7XG4gICAgICAgIHZhciBfaywgX2xlbjIsIF9yZWYyO1xuICAgICAgICBfcmVmMiA9IHAuaXhzO1xuICAgICAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBfcmVmMi5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICBpID0gX3JlZjJbX2tdO1xuICAgICAgICAgIGlmICghc291cmNlc1tpLmluZGV4XS5oYXNBdExlYXN0KGkuY291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICAgIGNhbm5vdFN5bmMgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuICFzb3VyY2Uuc3luYyB8fCBzb3VyY2UuZW5kZWQ7XG4gICAgICB9O1xuICAgICAgY2Fubm90TWF0Y2ggPSBmdW5jdGlvbihwKSB7XG4gICAgICAgIHZhciBfaywgX2xlbjIsIF9yZWYyO1xuICAgICAgICBfcmVmMiA9IHAuaXhzO1xuICAgICAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBfcmVmMi5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICBpID0gX3JlZjJbX2tdO1xuICAgICAgICAgIGlmICghc291cmNlc1tpLmluZGV4XS5tYXlIYXZlKGkuY291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBub25GbGF0dGVuZWQgPSBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgIHJldHVybiAhdHJpZ2dlci5zb3VyY2UuZmxhdHRlbjtcbiAgICAgIH07XG4gICAgICBwYXJ0ID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih1bnN1YkFsbCkge1xuICAgICAgICAgIHZhciBmbHVzaCwgZmx1c2hMYXRlciwgZmx1c2hXaGlsZVRyaWdnZXJzO1xuICAgICAgICAgIGZsdXNoTGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLndoZW5Eb25lV2l0aChyZXN1bHRTdHJlYW0sIGZsdXNoKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGZsdXNoV2hpbGVUcmlnZ2VycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50cywgcCwgcmVwbHksIHRyaWdnZXIsIF9rLCBfbGVuMjtcbiAgICAgICAgICAgIGlmICh0cmlnZ2Vycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgICAgICAgdHJpZ2dlciA9IHRyaWdnZXJzLnBvcCgpO1xuICAgICAgICAgICAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBwYXRzLmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgICAgICAgICAgIHAgPSBwYXRzW19rXTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gocCkpIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sLCBfbGVuMywgX3JlZjIsIF9yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IHAuaXhzO1xuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKF9sID0gMCwgX2xlbjMgPSBfcmVmMi5sZW5ndGg7IF9sIDwgX2xlbjM7IF9sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBpID0gX3JlZjJbX2xdO1xuICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goc291cmNlc1tpLmluZGV4XS5jb25zdW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsodHJpZ2dlci5lLmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQsIHZhbHVlcztcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBfbCwgX2xlbjMsIF9yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChfbCA9IDAsIF9sZW4zID0gZXZlbnRzLmxlbmd0aDsgX2wgPCBfbGVuMzsgX2wrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbX2xdO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChldmVudC52YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcC5mLmFwcGx5KHAsIHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICBpZiAodHJpZ2dlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJzID0gXy5maWx0ZXIobm9uRmxhdHRlbmVkLCB0cmlnZ2Vycyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmx1c2hXaGlsZVRyaWdnZXJzKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIGZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICByZXBseSA9IGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgaWYgKGVuZHMpIHtcbiAgICAgICAgICAgICAgZW5kcyA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoXy5hbGwoc291cmNlcywgY2Fubm90U3luYykgfHwgXy5hbGwocGF0cywgY2Fubm90TWF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICAgICAgc2luayhlbmQoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgICBpZiAoZS5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIGVuZHMgPSB0cnVlO1xuICAgICAgICAgICAgICBzb3VyY2UubWFya0VuZGVkKCk7XG4gICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc291cmNlLnB1c2goZSk7XG4gICAgICAgICAgICAgIGlmIChzb3VyY2Uuc3luYykge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgICBlOiBlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzQmFycmllciB8fCBVcGRhdGVCYXJyaWVyLmhhc1dhaXRlcnMoKSkge1xuICAgICAgICAgICAgICAgICAgZmx1c2hMYXRlcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgdW5zdWJBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBseSB8fCBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHJldHVybiBjb21wb3NpdGVVbnN1YnNjcmliZS5hcHBseShudWxsLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfaywgX2xlbjIsIF9yZXN1bHRzO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBzb3VyY2VzLmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgICAgIHMgPSBzb3VyY2VzW19rXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHBhcnQocykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH0pKCkpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnRhaW5zRHVwbGljYXRlRGVwcyA9IGZ1bmN0aW9uKG9ic2VydmFibGVzLCBzdGF0ZSkge1xuICAgIHZhciBjaGVja09ic2VydmFibGU7XG4gICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgIHN0YXRlID0gW107XG4gICAgfVxuICAgIGNoZWNrT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgdmFyIGRlcHM7XG4gICAgICBpZiAoXy5jb250YWlucyhzdGF0ZSwgb2JzKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcHMgPSBvYnMuaW50ZXJuYWxEZXBzKCk7XG4gICAgICAgIGlmIChkZXBzLmxlbmd0aCkge1xuICAgICAgICAgIHN0YXRlLnB1c2gob2JzKTtcbiAgICAgICAgICByZXR1cm4gXy5hbnkoZGVwcywgY2hlY2tPYnNlcnZhYmxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS5wdXNoKG9icyk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gXy5hbnkob2JzZXJ2YWJsZXMsIGNoZWNrT2JzZXJ2YWJsZSk7XG4gIH07XG5cbiAgQmFjb24udXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGluaXRpYWwsIGxhdGVCaW5kRmlyc3QsIHBhdHRlcm5zO1xuICAgIGluaXRpYWwgPSBhcmd1bWVudHNbMF0sIHBhdHRlcm5zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBsYXRlQmluZEZpcnN0ID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncztcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpKSB7XG4gICAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgW2ldLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gICAgaSA9IHBhdHRlcm5zLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKGkgPiAwKSB7XG4gICAgICBpZiAoIShwYXR0ZXJuc1tpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICBwYXR0ZXJuc1tpXSA9IChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkocGF0dGVybnNbaV0pO1xuICAgICAgfVxuICAgICAgcGF0dGVybnNbaV0gPSBsYXRlQmluZEZpcnN0KHBhdHRlcm5zW2ldKTtcbiAgICAgIGkgPSBpIC0gMjtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwidXBkYXRlXCIsIGluaXRpYWxdLmNvbmNhdChfX3NsaWNlLmNhbGwocGF0dGVybnMpLCBbQmFjb24ud2hlbi5hcHBseShCYWNvbiwgcGF0dGVybnMpLnNjYW4oaW5pdGlhbCwgKGZ1bmN0aW9uKHgsIGYpIHtcbiAgICAgIHJldHVybiBmKHgpO1xuICAgIH0pKV0pKTtcbiAgfTtcblxuICBjb21wb3NpdGVVbnN1YnNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzcztcbiAgICBzcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIG5ldyBDb21wb3NpdGVVbnN1YnNjcmliZShzcykudW5zdWJzY3JpYmU7XG4gIH07XG5cbiAgQ29tcG9zaXRlVW5zdWJzY3JpYmUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9zaXRlVW5zdWJzY3JpYmUoc3MpIHtcbiAgICAgIHZhciBzLCBfaSwgX2xlbjtcbiAgICAgIGlmIChzcyA9PSBudWxsKSB7XG4gICAgICAgIHNzID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gX19iaW5kKHRoaXMudW5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgdGhpcy51bnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5zdGFydGluZyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzID0gc3NbX2ldO1xuICAgICAgICB0aGlzLmFkZChzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICB2YXIgZW5kZWQsIHVuc3ViLCB1bnN1Yk1lO1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGVuZGVkID0gZmFsc2U7XG4gICAgICB1bnN1YiA9IG5vcDtcbiAgICAgIHRoaXMuc3RhcnRpbmcucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgdW5zdWJNZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKF90aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbmRlZCA9IHRydWU7XG4gICAgICAgICAgX3RoaXMucmVtb3ZlKHVuc3ViKTtcbiAgICAgICAgICByZXR1cm4gXy5yZW1vdmUoc3Vic2NyaXB0aW9uLCBfdGhpcy5zdGFydGluZyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHVuc3ViID0gc3Vic2NyaXB0aW9uKHRoaXMudW5zdWJzY3JpYmUsIHVuc3ViTWUpO1xuICAgICAgaWYgKCEodGhpcy51bnN1YnNjcmliZWQgfHwgZW5kZWQpKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHVuc3ViKTtcbiAgICAgIH1cbiAgICAgIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgdGhpcy5zdGFydGluZyk7XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfTtcblxuICAgIENvbXBvc2l0ZVVuc3Vic2NyaWJlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbih1bnN1Yikge1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICgoXy5yZW1vdmUodW5zdWIsIHRoaXMuc3Vic2NyaXB0aW9ucykpICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIHVuc3ViKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbXBvc2l0ZVVuc3Vic2NyaWJlLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHMsIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICBfcmVmMSA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IF9yZWYxW19pXTtcbiAgICAgICAgcygpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICByZXR1cm4gdGhpcy5zdGFydGluZyA9IFtdO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoICsgdGhpcy5zdGFydGluZy5sZW5ndGg7XG4gICAgfTtcblxuICAgIENvbXBvc2l0ZVVuc3Vic2NyaWJlLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY291bnQoKSA9PT0gMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvbXBvc2l0ZVVuc3Vic2NyaWJlO1xuXG4gIH0pKCk7XG5cbiAgQmFjb24uQ29tcG9zaXRlVW5zdWJzY3JpYmUgPSBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuICBTb21lID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvbWUodmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBTb21lLnByb3RvdHlwZS5nZXRPckVsc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmKSB7XG4gICAgICBpZiAoZih0aGlzLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbmV3IFNvbWUodGhpcy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTm9uZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIG5ldyBTb21lKGYodGhpcy52YWx1ZSkpO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmlzRGVmaW5lZCA9IHRydWU7XG5cbiAgICBTb21lLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW3RoaXMudmFsdWVdO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJTb21lKFwiICsgdGhpcy52YWx1ZSArIFwiKVwiO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU29tZTtcblxuICB9KSgpO1xuXG4gIE5vbmUgPSB7XG4gICAgZ2V0T3JFbHNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBOb25lO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBOb25lO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oKSB7fSxcbiAgICBpc0RlZmluZWQ6IGZhbHNlLFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgaW5zcGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJOb25lXCI7XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCk7XG4gICAgfVxuICB9O1xuXG4gIFVwZGF0ZUJhcnJpZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFmdGVyVHJhbnNhY3Rpb24sIGFmdGVycywgYWZ0ZXJzSW5kZXgsIGN1cnJlbnRFdmVudElkLCBmbHVzaCwgZmx1c2hEZXBzT2YsIGZsdXNoV2FpdGVycywgaGFzV2FpdGVycywgaW5UcmFuc2FjdGlvbiwgcm9vdEV2ZW50LCB3YWl0ZXJPYnMsIHdhaXRlcnMsIHdoZW5Eb25lV2l0aCwgd3JhcHBlZFN1YnNjcmliZTtcbiAgICByb290RXZlbnQgPSB2b2lkIDA7XG4gICAgd2FpdGVyT2JzID0gW107XG4gICAgd2FpdGVycyA9IHt9O1xuICAgIGFmdGVycyA9IFtdO1xuICAgIGFmdGVyc0luZGV4ID0gMDtcbiAgICBhZnRlclRyYW5zYWN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJzLnB1c2goZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hlbkRvbmVXaXRoID0gZnVuY3Rpb24ob2JzLCBmKSB7XG4gICAgICB2YXIgb2JzV2FpdGVycztcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzLmlkXTtcbiAgICAgICAgaWYgKG9ic1dhaXRlcnMgPT0gbnVsbCkge1xuICAgICAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29icy5pZF0gPSBbZl07XG4gICAgICAgICAgcmV0dXJuIHdhaXRlck9icy5wdXNoKG9icyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9ic1dhaXRlcnMucHVzaChmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aGlsZSAod2FpdGVyT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZmx1c2hXYWl0ZXJzKDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoV2FpdGVycyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICB2YXIgZiwgb2JzLCBvYnNJZCwgb2JzV2FpdGVycywgX2ksIF9sZW47XG4gICAgICBvYnMgPSB3YWl0ZXJPYnNbaW5kZXhdO1xuICAgICAgb2JzSWQgPSBvYnMuaWQ7XG4gICAgICBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnNJZF07XG4gICAgICB3YWl0ZXJPYnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGRlbGV0ZSB3YWl0ZXJzW29ic0lkXTtcbiAgICAgIGZsdXNoRGVwc09mKG9icyk7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IG9ic1dhaXRlcnMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZiA9IG9ic1dhaXRlcnNbX2ldO1xuICAgICAgICBmKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG4gICAgZmx1c2hEZXBzT2YgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgIHZhciBkZXAsIGRlcHMsIGluZGV4LCBfaSwgX2xlbjtcbiAgICAgIGRlcHMgPSBvYnMuaW50ZXJuYWxEZXBzKCk7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGRlcHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZGVwID0gZGVwc1tfaV07XG4gICAgICAgIGZsdXNoRGVwc09mKGRlcCk7XG4gICAgICAgIGlmICh3YWl0ZXJzW2RlcC5pZF0pIHtcbiAgICAgICAgICBpbmRleCA9IF8uaW5kZXhPZih3YWl0ZXJPYnMsIGRlcCk7XG4gICAgICAgICAgZmx1c2hXYWl0ZXJzKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGluVHJhbnNhY3Rpb24gPSBmdW5jdGlvbihldmVudCwgY29udGV4dCwgZiwgYXJncykge1xuICAgICAgdmFyIGFmdGVyLCByZXN1bHQ7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIHJldHVybiBmLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzdWx0ID0gZi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHJvb3RFdmVudCA9IHZvaWQgMDtcbiAgICAgICAgICB3aGlsZSAoYWZ0ZXJzSW5kZXggPCBhZnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhZnRlciA9IGFmdGVyc1thZnRlcnNJbmRleF07XG4gICAgICAgICAgICBhZnRlcnNJbmRleCsrO1xuICAgICAgICAgICAgYWZ0ZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWZ0ZXJzSW5kZXggPSAwO1xuICAgICAgICAgIGFmdGVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfTtcbiAgICBjdXJyZW50RXZlbnRJZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gcm9vdEV2ZW50LmlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdyYXBwZWRTdWJzY3JpYmUgPSBmdW5jdGlvbihvYnMsIHNpbmspIHtcbiAgICAgIHZhciBkb1Vuc3ViLCBzaG91bGRVbnN1YiwgdW5zdWIsIHVuc3ViZDtcbiAgICAgIHVuc3ViZCA9IGZhbHNlO1xuICAgICAgc2hvdWxkVW5zdWIgPSBmYWxzZTtcbiAgICAgIGRvVW5zdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNob3VsZFVuc3ViID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICB1bnN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YmQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZG9VbnN1YigpO1xuICAgICAgfTtcbiAgICAgIGRvVW5zdWIgPSBvYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGFmdGVyVHJhbnNhY3Rpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgIGlmICghdW5zdWJkKSB7XG4gICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuc3ViKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNob3VsZFVuc3ViKSB7XG4gICAgICAgIGRvVW5zdWIoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bnN1YjtcbiAgICB9O1xuICAgIGhhc1dhaXRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3YWl0ZXJPYnMubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICB3aGVuRG9uZVdpdGg6IHdoZW5Eb25lV2l0aCxcbiAgICAgIGhhc1dhaXRlcnM6IGhhc1dhaXRlcnMsXG4gICAgICBpblRyYW5zYWN0aW9uOiBpblRyYW5zYWN0aW9uLFxuICAgICAgY3VycmVudEV2ZW50SWQ6IGN1cnJlbnRFdmVudElkLFxuICAgICAgd3JhcHBlZFN1YnNjcmliZTogd3JhcHBlZFN1YnNjcmliZSxcbiAgICAgIGFmdGVyVHJhbnNhY3Rpb246IGFmdGVyVHJhbnNhY3Rpb25cbiAgICB9O1xuICB9KSgpO1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtID0gRXZlbnRTdHJlYW07XG5cbiAgQmFjb24uUHJvcGVydHkgPSBQcm9wZXJ0eTtcblxuICBCYWNvbi5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBCYWNvbi5CdXMgPSBCdXM7XG5cbiAgQmFjb24uSW5pdGlhbCA9IEluaXRpYWw7XG5cbiAgQmFjb24uTmV4dCA9IE5leHQ7XG5cbiAgQmFjb24uRW5kID0gRW5kO1xuXG4gIEJhY29uLkVycm9yID0gRXJyb3I7XG5cbiAgbm9wID0gZnVuY3Rpb24oKSB7fTtcblxuICBsYXR0ZXIgPSBmdW5jdGlvbihfLCB4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG5cbiAgZm9ybWVyID0gZnVuY3Rpb24oeCwgXykge1xuICAgIHJldHVybiB4O1xuICB9O1xuXG4gIGluaXRpYWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSW5pdGlhbCh2YWx1ZSwgdHJ1ZSk7XG4gIH07XG5cbiAgbmV4dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlLCB0cnVlKTtcbiAgfTtcblxuICBlbmQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEVuZCgpO1xuICB9O1xuXG4gIHRvRXZlbnQgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0KHgpO1xuICAgIH1cbiAgfTtcblxuICBjbG9uZUFycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICByZXR1cm4geHMuc2xpY2UoMCk7XG4gIH07XG5cbiAgYXNzZXJ0ID0gZnVuY3Rpb24obWVzc2FnZSwgY29uZGl0aW9uKSB7XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24obWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydEV2ZW50U3RyZWFtID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIEV2ZW50U3RyZWFtKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBFdmVudFN0cmVhbSA6IFwiICsgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRPYnNlcnZhYmxlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoIShldmVudCBpbnN0YW5jZW9mIE9ic2VydmFibGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIE9ic2VydmFibGUgOiBcIiArIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0RnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIGFzc2VydChcIm5vdCBhIGZ1bmN0aW9uIDogXCIgKyBmLCBpc0Z1bmN0aW9uKGYpKTtcbiAgfTtcblxuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiB0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiO1xuICB9O1xuXG4gIGlzQXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIHJldHVybiB4cyBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG4gIGlzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIE9ic2VydmFibGU7XG4gIH07XG5cbiAgYXNzZXJ0QXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIGlmICghaXNBcnJheSh4cykpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gYXJyYXkgOiBcIiArIHhzKTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0Tm9Bcmd1bWVudHMgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGFzc2VydChcIm5vIGFyZ3VtZW50cyBzdXBwb3J0ZWRcIiwgYXJncy5sZW5ndGggPT09IDApO1xuICB9O1xuXG4gIGFzc2VydFN0cmluZyA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAodHlwZW9mIHggIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYSBzdHJpbmcgOiBcIiArIHgpO1xuICAgIH1cbiAgfTtcblxuICBwYXJ0aWFsbHlBcHBsaWVkID0gZnVuY3Rpb24oZiwgYXBwbGllZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzO1xuICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gZi5hcHBseShudWxsLCBhcHBsaWVkLmNvbmNhdChhcmdzKSk7XG4gICAgfTtcbiAgfTtcblxuICBtYWtlU3Bhd25lciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgaXNPYnNlcnZhYmxlKGFyZ3NbMF0pKSB7XG4gICAgICByZXR1cm4gXy5hbHdheXMoYXJnc1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYWtlRnVuY3Rpb25BcmdzKGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBtYWtlRnVuY3Rpb25BcmdzID0gZnVuY3Rpb24oYXJncykge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICByZXR1cm4gbWFrZUZ1bmN0aW9uXy5hcHBseShudWxsLCBhcmdzKTtcbiAgfTtcblxuICBtYWtlRnVuY3Rpb25fID0gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlmIChpc0Z1bmN0aW9uKGYpKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnRpYWxseUFwcGxpZWQoZiwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRmllbGRLZXkoZikpIHtcbiAgICAgIHJldHVybiB0b0ZpZWxkRXh0cmFjdG9yKGYsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXy5hbHdheXMoZik7XG4gICAgfVxuICB9KTtcblxuICBtYWtlRnVuY3Rpb24gPSBmdW5jdGlvbihmLCBhcmdzKSB7XG4gICAgcmV0dXJuIG1ha2VGdW5jdGlvbl8uYXBwbHkobnVsbCwgW2ZdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncykpKTtcbiAgfTtcblxuICBjb25zdGFudFRvRnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZikpIHtcbiAgICAgIHJldHVybiBmO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXy5hbHdheXMoZik7XG4gICAgfVxuICB9O1xuXG4gIG1ha2VPYnNlcnZhYmxlID0gZnVuY3Rpb24oeCkge1xuICAgIGlmIChpc09ic2VydmFibGUoeCkpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24ub25jZSh4KTtcbiAgICB9XG4gIH07XG5cbiAgaXNGaWVsZEtleSA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gKHR5cGVvZiBmID09PSBcInN0cmluZ1wiKSAmJiBmLmxlbmd0aCA+IDEgJiYgZi5jaGFyQXQoMCkgPT09IFwiLlwiO1xuICB9O1xuXG4gIEJhY29uLmlzRmllbGRLZXkgPSBpc0ZpZWxkS2V5O1xuXG4gIHRvRmllbGRFeHRyYWN0b3IgPSBmdW5jdGlvbihmLCBhcmdzKSB7XG4gICAgdmFyIHBhcnRGdW5jcywgcGFydHM7XG4gICAgcGFydHMgPSBmLnNsaWNlKDEpLnNwbGl0KFwiLlwiKTtcbiAgICBwYXJ0RnVuY3MgPSBfLm1hcCh0b1NpbXBsZUV4dHJhY3RvcihhcmdzKSwgcGFydHMpO1xuICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIF9pLCBfbGVuO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBwYXJ0RnVuY3MubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZiA9IHBhcnRGdW5jc1tfaV07XG4gICAgICAgIHZhbHVlID0gZih2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICB0b1NpbXBsZUV4dHJhY3RvciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIGZpZWxkVmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWVsZFZhbHVlID0gdmFsdWVba2V5XTtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbihmaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUuYXBwbHkodmFsdWUsIGFyZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICB0b0ZpZWxkS2V5ID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiBmLnNsaWNlKDEpO1xuICB9O1xuXG4gIHRvQ29tYmluYXRvciA9IGZ1bmN0aW9uKGYpIHtcbiAgICB2YXIga2V5O1xuICAgIGlmIChpc0Z1bmN0aW9uKGYpKSB7XG4gICAgICByZXR1cm4gZjtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRLZXkoZikpIHtcbiAgICAgIGtleSA9IHRvRmllbGRLZXkoZik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGxlZnRba2V5XShyaWdodCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXNzZXJ0KFwibm90IGEgZnVuY3Rpb24gb3IgYSBmaWVsZCBrZXk6IFwiICsgZiwgZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICB0b09wdGlvbiA9IGZ1bmN0aW9uKHYpIHtcbiAgICBpZiAodiBpbnN0YW5jZW9mIFNvbWUgfHwgdiA9PT0gTm9uZSkge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU29tZSh2KTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKCh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCkgJiYgKGRlZmluZS5hbWQgIT0gbnVsbCkpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEJhY29uO1xuICAgIH0pO1xuICAgIHRoaXMuQmFjb24gPSBCYWNvbjtcbiAgfSBlbHNlIGlmICgodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpICYmIChtb2R1bGUuZXhwb3J0cyAhPSBudWxsKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQmFjb247XG4gICAgQmFjb24uQmFjb24gPSBCYWNvbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkJhY29uID0gQmFjb247XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICdzaGlmdCc6IDE2LFxuICAnY3RsJzogMTcsXG4gICdjdHJsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCIvKipcbiAqIG1hcmtlZCAtIGEgbWFya2Rvd24gcGFyc2VyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCwgQ2hyaXN0b3BoZXIgSmVmZnJleS4gKE1JVCBMaWNlbnNlZClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZFxuICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbi8qKlxuICogQmxvY2stTGV2ZWwgR3JhbW1hclxuICovXG5cbnZhciBibG9jayA9IHtcbiAgbmV3bGluZTogL15cXG4rLyxcbiAgY29kZTogL14oIHs0fVteXFxuXStcXG4qKSsvLFxuICBmZW5jZXM6IG5vb3AsXG4gIGhyOiAvXiggKlstKl9dKXszLH0gKig/Olxcbit8JCkvLFxuICBoZWFkaW5nOiAvXiAqKCN7MSw2fSkgKihbXlxcbl0rPykgKiMqICooPzpcXG4rfCQpLyxcbiAgbnB0YWJsZTogbm9vcCxcbiAgbGhlYWRpbmc6IC9eKFteXFxuXSspXFxuICooPXwtKXsyLH0gKig/Olxcbit8JCkvLFxuICBibG9ja3F1b3RlOiAvXiggKj5bXlxcbl0rKFxcbig/IWRlZilbXlxcbl0rKSpcXG4qKSsvLFxuICBsaXN0OiAvXiggKikoYnVsbCkgW1xcc1xcU10rPyg/OmhyfGRlZnxcXG57Mix9KD8hICkoPyFcXDFidWxsIClcXG4qfFxccyokKS8sXG4gIGh0bWw6IC9eICooPzpjb21tZW50fGNsb3NlZHxjbG9zaW5nKSAqKD86XFxuezIsfXxcXHMqJCkvLFxuICBkZWY6IC9eICpcXFsoW15cXF1dKylcXF06ICo8PyhbXlxccz5dKyk+Pyg/OiArW1wiKF0oW15cXG5dKylbXCIpXSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8dGFnfGRlZikpKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbmJsb2NrLml0ZW0gPSAvXiggKikoYnVsbCkgW15cXG5dKig/Olxcbig/IVxcMWJ1bGwgKVteXFxuXSopKi87XG5ibG9jay5pdGVtID0gcmVwbGFjZShibG9jay5pdGVtLCAnZ20nKVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoKTtcblxuYmxvY2subGlzdCA9IHJlcGxhY2UoYmxvY2subGlzdClcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpXG4gICgpO1xuXG5ibG9jay5ibG9ja3F1b3RlID0gcmVwbGFjZShibG9jay5ibG9ja3F1b3RlKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbmJsb2NrLl90YWcgPSAnKD8hKD86J1xuICArICdhfGVtfHN0cm9uZ3xzbWFsbHxzfGNpdGV8cXxkZm58YWJicnxkYXRhfHRpbWV8Y29kZSdcbiAgKyAnfHZhcnxzYW1wfGtiZHxzdWJ8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvJ1xuICArICd8c3Bhbnxicnx3YnJ8aW5zfGRlbHxpbWcpXFxcXGIpXFxcXHcrKD8hOi98W15cXFxcd1xcXFxzQF0qQClcXFxcYic7XG5cbmJsb2NrLmh0bWwgPSByZXBsYWNlKGJsb2NrLmh0bWwpXG4gICgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gICgnY2xvc2VkJywgLzwodGFnKVtcXHNcXFNdKz88XFwvXFwxPi8pXG4gICgnY2xvc2luZycsIC88dGFnKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LylcbiAgKC90YWcvZywgYmxvY2suX3RhZylcbiAgKCk7XG5cbmJsb2NrLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJ2hyJywgYmxvY2suaHIpXG4gICgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gICgnbGhlYWRpbmcnLCBibG9jay5saGVhZGluZylcbiAgKCdibG9ja3F1b3RlJywgYmxvY2suYmxvY2txdW90ZSlcbiAgKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBtZXJnZSh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gbWVyZ2Uoe30sIGJsb2NrLm5vcm1hbCwge1xuICBmZW5jZXM6IC9eICooYHszLH18fnszLH0pICooXFxTKyk/ICpcXG4oW1xcc1xcU10rPylcXHMqXFwxICooPzpcXG4rfCQpLyxcbiAgcGFyYWdyYXBoOiAvXi9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnKD8hJywgJyg/ISdcbiAgICArIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2sudGFibGVzID0gbWVyZ2Uoe30sIGJsb2NrLmdmbSwge1xuICBucHRhYmxlOiAvXiAqKFxcUy4qXFx8LiopXFxuICooWy06XSsgKlxcfFstfCA6XSopXFxuKCg/Oi4qXFx8LiooPzpcXG58JCkpKilcXG4qLyxcbiAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xufSk7XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xuXG5mdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW5zLmxpbmtzID0ge307XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLnJ1bGVzID0gYmxvY2subm9ybWFsO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJsZXMpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay5nZm07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIEJsb2NrIFJ1bGVzXG4gKi9cblxuTGV4ZXIucnVsZXMgPSBibG9jaztcblxuLyoqXG4gKiBTdGF0aWMgTGV4IE1ldGhvZFxuICovXG5cbkxleGVyLmxleCA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucykge1xuICB2YXIgbGV4ZXIgPSBuZXcgTGV4ZXIob3B0aW9ucyk7XG4gIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbn07XG5cbi8qKlxuICogUHJlcHJvY2Vzc2luZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihzcmMpIHtcbiAgc3JjID0gc3JjXG4gICAgLnJlcGxhY2UoL1xcclxcbnxcXHIvZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpXG4gICAgLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHUyNDI0L2csICdcXG4nKTtcblxuICByZXR1cm4gdGhpcy50b2tlbihzcmMsIHRydWUpO1xufTtcblxuLyoqXG4gKiBMZXhpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihzcmMsIHRvcCwgYnEpIHtcbiAgdmFyIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJylcbiAgICAsIG5leHRcbiAgICAsIGxvb3NlXG4gICAgLCBjYXBcbiAgICAsIGJ1bGxcbiAgICAsIGJcbiAgICAsIGl0ZW1cbiAgICAsIHNwYWNlXG4gICAgLCBpXG4gICAgLCBsO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMl0gPT09ICc9JyA/IDEgOiAyLFxuICAgICAgICB0ZXh0OiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hyJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYmxvY2txdW90ZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG5cbiAgICAgIC8vIFBhc3MgYHRvcGAgdG8ga2VlcCB0aGUgY3VycmVudFxuICAgICAgLy8gXCJ0b3BsZXZlbFwiIHN0YXRlLiBUaGlzIGlzIGV4YWN0bHlcbiAgICAgIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAgIHRoaXMudG9rZW4oY2FwLCB0b3AsIHRydWUpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICgoIWJxICYmIHRvcCkgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMucGFyYWdyYXBoLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHRleHQ6IGNhcFsxXS5jaGFyQXQoY2FwWzFdLmxlbmd0aCAtIDEpID09PSAnXFxuJ1xuICAgICAgICAgID8gY2FwWzFdLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgLy8gVG9wLWxldmVsIHNob3VsZCBuZXZlciByZWFjaCBoZXJlLlxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy50b2tlbnM7XG59O1xuXG4vKipcbiAqIElubGluZS1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS8sXG4gIGF1dG9saW5rOiAvXjwoW14gPl0rKEB8OlxcLylbXiA+XSspPi8sXG4gIHVybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICBsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXChocmVmXFwpLyxcbiAgcmVmbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8sXG4gIG5vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG4gIHN0cm9uZzogL15fXyhbXFxzXFxTXSs/KV9fKD8hXyl8XlxcKlxcKihbXFxzXFxTXSs/KVxcKlxcKig/IVxcKikvLFxuICBlbTogL15cXGJfKCg/Ol9ffFtcXHNcXFNdKSs/KV9cXGJ8XlxcKigoPzpcXCpcXCp8W1xcc1xcU10pKz8pXFwqKD8hXFwqKS8sXG4gIGNvZGU6IC9eKGArKVxccyooW1xcc1xcU10qP1teYF0pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtfKmBdfCB7Mix9XFxufCQpL1xufTtcblxuaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gcmVwbGFjZShpbmxpbmUubGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCdocmVmJywgaW5saW5lLl9ocmVmKVxuICAoKTtcblxuaW5saW5lLnJlZmxpbmsgPSByZXBsYWNlKGlubGluZS5yZWZsaW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgdXJsOiAvXihodHRwcz86XFwvXFwvW15cXHM8XStbXjwuLDo7XCInKVxcXVxcc10pLyxcbiAgZGVsOiAvXn5+KD89XFxTKShbXFxzXFxTXSo/XFxTKX5+LyxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUudGV4dClcbiAgICAoJ118JywgJ35dfCcpXG4gICAgKCd8JywgJ3xodHRwcz86Ly98JylcbiAgICAoKVxufSk7XG5cbi8qKlxuICogR0ZNICsgTGluZSBCcmVha3MgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuYnJlYWtzID0gbWVyZ2Uoe30sIGlubGluZS5nZm0sIHtcbiAgYnI6IHJlcGxhY2UoaW5saW5lLmJyKSgnezIsfScsICcqJykoKSxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUuZ2ZtLnRleHQpKCd7Mix9JywgJyonKSgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmICghdGhpcy5saW5rcykge1xuICAgIHRocm93IG5ld1xuICAgICAgRXJyb3IoJ1Rva2VucyBhcnJheSByZXF1aXJlcyBhIGBsaW5rc2AgcHJvcGVydHkuJyk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmJyZWFrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5nZm07XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgIHRoaXMucnVsZXMgPSBpbmxpbmUucGVkYW50aWM7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgSW5saW5lIFJ1bGVzXG4gKi9cblxuSW5saW5lTGV4ZXIucnVsZXMgPSBpbmxpbmU7XG5cbi8qKlxuICogU3RhdGljIExleGluZy9Db21waWxpbmcgTWV0aG9kXG4gKi9cblxuSW5saW5lTGV4ZXIub3V0cHV0ID0gZnVuY3Rpb24oc3JjLCBsaW5rcywgb3B0aW9ucykge1xuICB2YXIgaW5saW5lID0gbmV3IElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGlubGluZS5vdXRwdXQoc3JjKTtcbn07XG5cbi8qKlxuICogTGV4aW5nL0NvbXBpbGluZ1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXQgPSBmdW5jdGlvbihzcmMpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsaW5rXG4gICAgLCB0ZXh0XG4gICAgLCBocmVmXG4gICAgLCBjYXA7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIGVzY2FwZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVzY2FwZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gY2FwWzFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYXV0b2xpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgICAgICAgID8gdGhpcy5tYW5nbGUoY2FwWzFdLnN1YnN0cmluZyg3KSlcbiAgICAgICAgICA6IHRoaXMubWFuZ2xlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLnJlZmxpbmsuZXhlYyhzcmMpKVxuICAgICAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGxpbmsgPSAoY2FwWzJdIHx8IGNhcFsxXSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIG91dCArPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCBsaW5rKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJvbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5zdHJvbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuc3Ryb25nKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGVtXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZW0uZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZW0odGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuY29kZXNwYW4oZXNjYXBlKGNhcFsyXSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBlc2NhcGUodGhpcy5zbWFydHlwYW50cyhjYXBbMF0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgTGlua1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4gIHZhciBocmVmID0gZXNjYXBlKGxpbmsuaHJlZilcbiAgICAsIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTQnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsID0gdGV4dC5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCkge1xuICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyAnPlxcbicgKyBib2R5ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHA+JyArIHRleHQgKyAnPC9wPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbiAgcmV0dXJuICc8dGFibGU+XFxuJ1xuICAgICsgJzx0aGVhZD5cXG4nXG4gICAgKyBoZWFkZXJcbiAgICArICc8L3RoZWFkPlxcbidcbiAgICArICc8dGJvZHk+XFxuJ1xuICAgICsgYm9keVxuICAgICsgJzwvdGJvZHk+XFxuJ1xuICAgICsgJzwvdGFibGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZXJvdyA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgcmV0dXJuICc8dHI+XFxuJyArIGNvbnRlbnQgKyAnPC90cj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlY2VsbCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGZsYWdzKSB7XG4gIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuICAgID8gJzwnICsgdHlwZSArICcgc3R5bGU9XCJ0ZXh0LWFsaWduOicgKyBmbGFncy5hbGlnbiArICdcIj4nXG4gICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuLy8gc3BhbiBsZXZlbCByZW5kZXJlclxuUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGVtPicgKyB0ZXh0ICsgJzwvZW0+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5iciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG4gIHZhciBvdXQgPSAnPGEgaHJlZj1cIicgKyBocmVmICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSAnPicgKyB0ZXh0ICsgJzwvYT4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmltYWdlID0gZnVuY3Rpb24oaHJlZiwgdGl0bGUsIHRleHQpIHtcbiAgdmFyIG91dCA9ICc8aW1nIHNyYz1cIicgKyBocmVmICsgJ1wiIGFsdD1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgaWYgKHRpdGxlKSB7XG4gICAgb3V0ICs9ICcgdGl0bGU9XCInICsgdGl0bGUgKyAnXCInO1xuICB9XG4gIG91dCArPSB0aGlzLm9wdGlvbnMueGh0bWwgPyAnLz4nIDogJz4nO1xuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBQYXJzaW5nICYgQ29tcGlsaW5nXG4gKi9cblxuZnVuY3Rpb24gUGFyc2VyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbiA9IG51bGw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLm9wdGlvbnMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG59XG5cbi8qKlxuICogU3RhdGljIFBhcnNlIE1ldGhvZFxuICovXG5cblBhcnNlci5wYXJzZSA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucywgcmVuZGVyZXIpIHtcbiAgdmFyIHBhcnNlciA9IG5ldyBQYXJzZXIob3B0aW9ucywgcmVuZGVyZXIpO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKHNyYyk7XG59O1xuXG4vKipcbiAqIFBhcnNlIExvb3BcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oc3JjKSB7XG4gIHRoaXMuaW5saW5lID0gbmV3IElubGluZUxleGVyKHNyYy5saW5rcywgdGhpcy5vcHRpb25zLCB0aGlzLnJlbmRlcmVyKTtcbiAgdGhpcy50b2tlbnMgPSBzcmMucmV2ZXJzZSgpO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgd2hpbGUgKHRoaXMubmV4dCgpKSB7XG4gICAgb3V0ICs9IHRoaXMudG9rKCk7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufTtcblxuLyoqXG4gKiBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2VuID0gdGhpcy50b2tlbnMucG9wKCk7XG59O1xuXG4vKipcbiAqIFByZXZpZXcgTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoIC0gMV0gfHwgMDtcbn07XG5cbi8qKlxuICogUGFyc2UgVGV4dCBUb2tlbnNcbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBhcnNlVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYm9keSA9IHRoaXMudG9rZW4udGV4dDtcblxuICB3aGlsZSAodGhpcy5wZWVrKCkudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgYm9keSArPSAnXFxuJyArIHRoaXMubmV4dCgpLnRleHQ7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pbmxpbmUub3V0cHV0KGJvZHkpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBDdXJyZW50IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS50b2sgPSBmdW5jdGlvbigpIHtcbiAgc3dpdGNoICh0aGlzLnRva2VuLnR5cGUpIHtcbiAgICBjYXNlICdzcGFjZSc6IHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY2FzZSAnaHInOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ocigpO1xuICAgIH1cbiAgICBjYXNlICdoZWFkaW5nJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaGVhZGluZyhcbiAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCksXG4gICAgICAgIHRoaXMudG9rZW4uZGVwdGgsXG4gICAgICAgIHRoaXMudG9rZW4udGV4dCk7XG4gICAgfVxuICAgIGNhc2UgJ2NvZGUnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5jb2RlKHRoaXMudG9rZW4udGV4dCxcbiAgICAgICAgdGhpcy50b2tlbi5sYW5nLFxuICAgICAgICB0aGlzLnRva2VuLmVzY2FwZWQpO1xuICAgIH1cbiAgICBjYXNlICd0YWJsZSc6IHtcbiAgICAgIHZhciBoZWFkZXIgPSAnJ1xuICAgICAgICAsIGJvZHkgPSAnJ1xuICAgICAgICAsIGlcbiAgICAgICAgLCByb3dcbiAgICAgICAgLCBjZWxsXG4gICAgICAgICwgZmxhZ3NcbiAgICAgICAgLCBqO1xuXG4gICAgICAvLyBoZWFkZXJcbiAgICAgIGNlbGwgPSAnJztcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbGFncyA9IHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9O1xuICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLmhlYWRlcltpXSksXG4gICAgICAgICAgeyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGhlYWRlciArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3cgPSB0aGlzLnRva2VuLmNlbGxzW2ldO1xuXG4gICAgICAgIGNlbGwgPSAnJztcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IHJvdy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQocm93W2pdKSxcbiAgICAgICAgICAgIHsgaGVhZGVyOiBmYWxzZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25bal0gfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBib2R5ICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci50YWJsZShoZWFkZXIsIGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdibG9ja3F1b3RlX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdibG9ja3F1b3RlX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5ibG9ja3F1b3RlKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJ1xuICAgICAgICAsIG9yZGVyZWQgPSB0aGlzLnRva2VuLm9yZGVyZWQ7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdChib2R5LCBvcmRlcmVkKTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rZW4udHlwZSA9PT0gJ3RleHQnXG4gICAgICAgICAgPyB0aGlzLnBhcnNlVGV4dCgpXG4gICAgICAgICAgOiB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbG9vc2VfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0aXRlbShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnaHRtbCc6IHtcbiAgICAgIHZhciBodG1sID0gIXRoaXMudG9rZW4ucHJlICYmICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgPyB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KVxuICAgICAgICA6IHRoaXMudG9rZW4udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmh0bWwoaHRtbCk7XG4gICAgfVxuICAgIGNhc2UgJ3BhcmFncmFwaCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSk7XG4gICAgfVxuICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5wYXJzZVRleHQoKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhlbHBlcnNcbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoaHRtbCwgZW5jb2RlKSB7XG4gIHJldHVybiBodG1sXG4gICAgLnJlcGxhY2UoIWVuY29kZSA/IC8mKD8hIz9cXHcrOykvZyA6IC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMzk7Jyk7XG59XG5cbmZ1bmN0aW9uIHVuZXNjYXBlKGh0bWwpIHtcbiAgcmV0dXJuIGh0bWwucmVwbGFjZSgvJihbI1xcd10rKTsvZywgZnVuY3Rpb24oXywgbikge1xuICAgIG4gPSBuLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG4gPT09ICdjb2xvbicpIHJldHVybiAnOic7XG4gICAgaWYgKG4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgIHJldHVybiBuLmNoYXJBdCgxKSA9PT0gJ3gnXG4gICAgICAgID8gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChuLnN1YnN0cmluZygyKSwgMTYpKVxuICAgICAgICA6IFN0cmluZy5mcm9tQ2hhckNvZGUoK24uc3Vic3RyaW5nKDEpKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZShyZWdleCwgb3B0KSB7XG4gIHJlZ2V4ID0gcmVnZXguc291cmNlO1xuICBvcHQgPSBvcHQgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbiBzZWxmKG5hbWUsIHZhbCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgsIG9wdCk7XG4gICAgdmFsID0gdmFsLnNvdXJjZSB8fCB2YWw7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoLyhefFteXFxbXSlcXF4vZywgJyQxJyk7XG4gICAgcmVnZXggPSByZWdleC5yZXBsYWNlKG5hbWUsIHZhbCk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxubm9vcC5leGVjID0gbm9vcDtcblxuZnVuY3Rpb24gbWVyZ2Uob2JqKSB7XG4gIHZhciBpID0gMVxuICAgICwgdGFyZ2V0XG4gICAgLCBrZXk7XG5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbaV07XG4gICAgZm9yIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IHRhcmdldFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cblxuLyoqXG4gKiBNYXJrZWRcbiAqL1xuXG5mdW5jdGlvbiBtYXJrZWQoc3JjLCBvcHQsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayB8fCB0eXBlb2Ygb3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBvcHQ7XG4gICAgICBvcHQgPSBudWxsO1xuICAgIH1cblxuICAgIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCB8fCB7fSk7XG5cbiAgICB2YXIgaGlnaGxpZ2h0ID0gb3B0LmhpZ2hsaWdodFxuICAgICAgLCB0b2tlbnNcbiAgICAgICwgcGVuZGluZ1xuICAgICAgLCBpID0gMDtcblxuICAgIHRyeSB7XG4gICAgICB0b2tlbnMgPSBMZXhlci5sZXgoc3JjLCBvcHQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICAgIH1cblxuICAgIHBlbmRpbmcgPSB0b2tlbnMubGVuZ3RoO1xuXG4gICAgdmFyIGRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvdXQsIGVycjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGNvZGUgPT0gbnVsbCB8fCBjb2RlID09PSB0b2tlbi50ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9rZW4udGV4dCA9IGNvZGU7XG4gICAgICAgICAgdG9rZW4uZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgLS1wZW5kaW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSh0b2tlbnNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHQpIG9wdCA9IG1lcmdlKHt9LCBtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gICAgcmV0dXJuIFBhcnNlci5wYXJzZShMZXhlci5sZXgoc3JjLCBvcHQpLCBvcHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZS5tZXNzYWdlICs9ICdcXG5QbGVhc2UgcmVwb3J0IHRoaXMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkLic7XG4gICAgaWYgKChvcHQgfHwgbWFya2VkLmRlZmF1bHRzKS5zaWxlbnQpIHtcbiAgICAgIHJldHVybiAnPHA+QW4gZXJyb3Igb2NjdXJlZDo8L3A+PHByZT4nXG4gICAgICAgICsgZXNjYXBlKGUubWVzc2FnZSArICcnLCB0cnVlKVxuICAgICAgICArICc8L3ByZT4nO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbi8qKlxuICogT3B0aW9uc1xuICovXG5cbm1hcmtlZC5vcHRpb25zID1cbm1hcmtlZC5zZXRPcHRpb25zID0gZnVuY3Rpb24ob3B0KSB7XG4gIG1lcmdlKG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgcmV0dXJuIG1hcmtlZDtcbn07XG5cbm1hcmtlZC5kZWZhdWx0cyA9IHtcbiAgZ2ZtOiB0cnVlLFxuICB0YWJsZXM6IHRydWUsXG4gIGJyZWFrczogZmFsc2UsXG4gIHBlZGFudGljOiBmYWxzZSxcbiAgc2FuaXRpemU6IGZhbHNlLFxuICBzbWFydExpc3RzOiBmYWxzZSxcbiAgc2lsZW50OiBmYWxzZSxcbiAgaGlnaGxpZ2h0OiBudWxsLFxuICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICBzbWFydHlwYW50czogZmFsc2UsXG4gIGhlYWRlclByZWZpeDogJycsXG4gIHJlbmRlcmVyOiBuZXcgUmVuZGVyZXIsXG4gIHhodG1sOiBmYWxzZVxufTtcblxuLyoqXG4gKiBFeHBvc2VcbiAqL1xuXG5tYXJrZWQuUGFyc2VyID0gUGFyc2VyO1xubWFya2VkLnBhcnNlciA9IFBhcnNlci5wYXJzZTtcblxubWFya2VkLlJlbmRlcmVyID0gUmVuZGVyZXI7XG5cbm1hcmtlZC5MZXhlciA9IExleGVyO1xubWFya2VkLmxleGVyID0gTGV4ZXIubGV4O1xuXG5tYXJrZWQuSW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlcjtcbm1hcmtlZC5pbmxpbmVMZXhlciA9IElubGluZUxleGVyLm91dHB1dDtcblxubWFya2VkLnBhcnNlID0gbWFya2VkO1xuXG5pZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gbWFya2VkO1xufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gbWFya2VkOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMubWFya2VkID0gbWFya2VkO1xufVxuXG59KS5jYWxsKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcblxuY29uc3QgRVZFTlRfS0VZVVAgPSBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZG9jdW1lbnQsICdrZXl1cCcpO1xuY29uc3QgRVZFTlRfS0VZRE9XTiA9IEJhY29uLmZyb21FdmVudFRhcmdldChkb2N1bWVudCwgJ2tleWRvd24nKTtcblxuLyoqXG4gKiBjcmVhdGUgRXZlbnRTdHJlYW0gZnJvbSB1c2VyIGlucHV0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gY2hhcktleVxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBrZXkoY2hhcktleSkge1xuICAgIGxldCBrZXlDb2RlID0gdHlwZW9mKGNoYXJLZXkpID09PSAnc3RyaW5nJyA/IGtleWNvZGUoY2hhcktleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjaGFyS2V5O1xuICAgIHJldHVybiBFVkVOVF9LRVlVUC5maWx0ZXIoa2V5Q29kZUlzKGtleUNvZGUpKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBjaGFyS2V5XG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGtleWRvd24oY2hhcktleSkge1xuICAgIGxldCBrZXlDb2RlID0gdHlwZW9mKGNoYXJLZXkpID09PSAnc3RyaW5nJyA/IGtleWNvZGUoY2hhcktleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjaGFyS2V5O1xuICAgIHJldHVybiBFVkVOVF9LRVlET1dOLmZpbHRlcihrZXlDb2RlSXMoa2V5Q29kZSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGNsaWNrKGVsKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ2NsaWNrJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2VsID0gZG9jdW1lbnQuYm9keV1cbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgbW91c2Vtb3ZlKGVsID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICdtb3VzZW1vdmUnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgcmVzaXplKCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQod2luZG93LCAncmVzaXplJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGhhc2hjaGFuZ2UoKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldCh3aW5kb3csICdoYXNoY2hhbmdlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGtleUNvZGVcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24ga2V5Q29kZUlzKGtleUNvZGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50LmtleUNvZGUgPT09IGtleUNvZGU7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGNvbnRyb2wgZnJvbSAnLi9jb250cm9sJztcblxuLyoqXG4gKiBmdWxsIHNjcmVlblxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCkge1xuICBsZXQgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBidXMub25WYWx1ZSh0b2dnbGVTY3JlZW5PZih0YXJnZXQpKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2NyZWVuT2YoZWwpIHtcbiAgbGV0IHJlcXVlc3QsIGV4aXQ7XG5cbiAgaWYoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nO1xuICB9IGVsc2UgaWYoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnbXNSZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH1cblxuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnZXhpdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnbXNFeGl0RnVsbHNjcmVlbic7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICBlbFtyZXF1ZXN0XSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudFtleGl0XSgpO1xuICAgIH1cbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBpZiB1c2luZyBhIGZlYXR1cmUgdGhhdCByZXF1aXJlcyBhIGJyb3dzZXItcG9seWZpbGxcbiAqXG4gKiBAc2VlIGh0dHBzOi8vNnRvNS5vcmcvcG9seWZpbGwuaHRtbFxuICovXG5pbXBvcnQgcG9seWZpbGwgZnJvbSAnNnRvNS9icm93c2VyLXBvbHlmaWxsJztcblxuLyoqXG4gKiBUYWxraWUuanNcbiAqL1xuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5cbmltcG9ydCB1dGlsICAgIGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgY29udHJvbCBmcm9tICcuL2NvbnRyb2wnO1xuaW1wb3J0IHF1ZXJ5ICAgZnJvbSAnLi9xdWVyeSc7XG5cbmltcG9ydCBNYXJrZG93biAgIGZyb20gJy4vbWFya2Rvd24nO1xuaW1wb3J0IFBhZ2luZyAgICAgZnJvbSAnLi9wYWdpbmcnO1xuaW1wb3J0IEZ1bGxTY3JlZW4gZnJvbSAnLi9mdWxsc2NyZWVuJztcbmltcG9ydCBSZXNwb25zaXZlIGZyb20gJy4vcmVzcG9uc2l2ZSc7XG5cbmNvbnN0IElERU5UX05FWFQgICAgID0gJ25leHQnO1xuY29uc3QgSURFTlRfUFJFViAgICAgPSAncHJldic7XG5jb25zdCBJREVOVF9TQ0FMRVIgICA9ICdzY2FsZXInO1xuY29uc3QgSURFTlRfQ09OVFJPTCAgPSAnY29udHJvbCc7XG5jb25zdCBJREVOVF9QQUdFICAgICA9ICdwYWdlJztcbmNvbnN0IElERU5UX1RPVEFMICAgID0gJ3RvdGFsJztcbmNvbnN0IElERU5UX1BST0dSRVNTID0gJ3Byb2dyZXNzJztcbmNvbnN0IElERU5UX1BPSU5URVIgID0gJ3BvaW50ZXInO1xuY29uc3QgSURFTlRfQkFDS0ZBQ0UgPSAnYmFja2ZhY2UnO1xuY29uc3QgTUlNRV9NQVJLRE9XTiAgPSAndGV4dC94LW1hcmtkb3duJztcbmNvbnN0IEFUVFJfTEFZT1VUICAgID0gJ2xheW91dCc7XG5jb25zdCBBVFRSX0JBQ0tGQUNFICA9ICdiYWNrZmFjZSc7XG5jb25zdCBBVFRSX0ZJTFRFUiAgICA9ICdiYWNrZmFjZS1maWx0ZXInO1xuXG5jb25zdCBOT1JNQUxfV0lEVEggID0gMTAyNDtcbmNvbnN0IE5PUk1BTF9IRUlHSFQgPSA3Njg7XG5jb25zdCBXSURFX1dJRFRIICAgID0gMTM2NjtcbmNvbnN0IFdJREVfSEVJR0hUICAgPSA3Njg7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFsa2llT3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBbYXBpXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbd2lkZV1cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnRyb2xdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtwcm9ncmVzc11cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2JhY2tmYWNlXVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtUYWxraWVPcHRpb25zfSBvcHRpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMgPSB7fSkge1xuICBpZiAob3B0aW9ucy5hcGkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWFpbiAgICAgICA6IG1haW4sXG4gICAgICB1dGlsICAgICAgIDogdXRpbCxcbiAgICAgIGNvbnRyb2wgICAgOiBjb250cm9sLFxuICAgICAgcXVlcnkgICAgICA6IHF1ZXJ5LFxuICAgICAgbWFya2Rvd24gICA6IE1hcmtkb3duLFxuICAgICAgcGFnaW5nICAgICA6IFBhZ2luZyxcbiAgICAgIGZ1bGxTY3JlZW4gOiBGdWxsU2NyZWVuLFxuICAgICAgcmVzcG9uc2l2ZSA6IFJlc3BvbnNpdmUsXG4gICAgICBCYWNvbiAgICAgIDogQmFjb25cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYWluKG9wdGlvbnMpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtUYWxraWVPcHRpb25zfSBfb3B0aW9uc1xuICovXG5mdW5jdGlvbiBtYWluKF9vcHRpb25zID0ge30pIHtcblxuICAvKipcbiAgICogYXBwbHkgZGVmYXVsdCBvcHRpb25zXG4gICAqIEB0eXBlIHsqfE9iamVjdH1cbiAgICovXG4gIGxldCBvcHRpb25zID0gdXRpbC5kZWZhdWx0cyhfb3B0aW9ucywge1xuICAgIGFwaSAgICAgIDogZmFsc2UsXG4gICAgd2lkZSAgICAgOiB0cnVlLFxuICAgIGNvbnRyb2wgIDogdHJ1ZSxcbiAgICBwb2ludGVyICA6IHRydWUsXG4gICAgcHJvZ3Jlc3MgOiB0cnVlLFxuICAgIGJhY2tmYWNlIDogdHJ1ZVxuICB9KTtcblxuICAvKipcbiAgICogSW5pdCBzbGlkZSBzaXplc1xuICAgKi9cbiAgbGV0IHdpZHRoICA9IG9wdGlvbnMud2lkZSA/IFdJREVfV0lEVEggIDogTk9STUFMX1dJRFRIO1xuICBsZXQgaGVpZ2h0ID0gb3B0aW9ucy53aWRlID8gV0lERV9IRUlHSFQgOiBOT1JNQUxfSEVJR0hUO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgPHN0eWxlPlxuICAgICAgIyR7SURFTlRfU0NBTEVSfSxcbiAgICAgIFtsYXlvdXRdIHtcbiAgICAgICAgd2lkdGg6ICR7d2lkdGh9cHggIWltcG9ydGFudDtcbiAgICAgICAgaGVpZ2h0OiAke2hlaWdodH1weCAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIDwvc3R5bGU+YFxuICApO1xuXG4gIC8qKlxuICAgKiBJbml0IHNsaWRlIHNlY3Rpb25zXG4gICAqL1xuICB1dGlsLnRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3R5cGU9XCIke01JTUVfTUFSS0RPV059XCJdYCkpLmZvckVhY2goTWFya2Rvd24pO1xuICBsZXQgc2xpZGVzID0gdXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske0FUVFJfTEFZT1VUfV1gKSk7XG5cbiAgLyoqXG4gICAqIFJlc3BvbnNpdmUgc2NhbGluZ1xuICAgKi9cbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICA8ZGl2IGlkPVwiJHtJREVOVF9TQ0FMRVJ9XCI+PC9kaXY+XG4gIGApO1xuICBsZXQgc2NhbGVyRWwgPSB1dGlsLmdldEJ5SWQoSURFTlRfU0NBTEVSKTtcbiAgc2xpZGVzLmZvckVhY2goKGVsKSA9PiBzY2FsZXJFbC5hcHBlbmRDaGlsZChlbCkpO1xuXG4gIGxldCByYXRpbyA9IFJlc3BvbnNpdmUoe1xuICAgIHdpZHRoICA6IHdpZHRoLFxuICAgIGhlaWdodCA6IGhlaWdodCxcbiAgICB0YXJnZXQgOiBzY2FsZXJFbFxuICB9KTtcbiAgcmF0aW8ucGx1Zyhjb250cm9sLnJlc2l6ZSgpKTtcblxuICAvKipcbiAgICogUGFnaW5nIGNvbnRyb2xcbiAgICovXG4gIGxldCBwYWdpbmcgPSBQYWdpbmcoe1xuICAgIHN0YXJ0UGFnZSAgICAgOiB1dGlsLmdldFBhZ2VOdW1iZXJGcm9tSGFzaCgpIHx8IDEsXG4gICAgZW5kUGFnZSAgICAgICA6IHNsaWRlcy5sZW5ndGgsXG4gICAgc2xpZGVFbGVtZW50cyA6IHNsaWRlc1xuICB9KTtcblxuICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wua2V5KCdyaWdodCcpKTtcbiAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmtleSgncycpKTtcbiAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmtleSgnbicpKTtcbiAgcGFnaW5nLnByZXZCdXMucGx1Zyhjb250cm9sLmtleSgnbGVmdCcpKTtcbiAgcGFnaW5nLnByZXZCdXMucGx1Zyhjb250cm9sLmtleSgnYScpKTtcbiAgcGFnaW5nLnByZXZCdXMucGx1Zyhjb250cm9sLmtleSgncCcpKTtcbiAgcGFnaW5nLm1vdmVCdXMucGx1Zyhjb250cm9sLmhhc2hjaGFuZ2UoKS5tYXAodXRpbC5nZXRQYWdlTnVtYmVyRnJvbUhhc2gpKTtcblxuICAvLyBzeW5jIGxvY2F0aW9uLmhhc2hcbiAgcGFnaW5nLmN1cnJlbnRFcy5vblZhbHVlKChwYWdlKSA9PiBsb2NhdGlvbi5oYXNoID0gcGFnZSk7XG5cbiAgLyoqXG4gICAqIEluc2VydCBVaSBFbGVtZW50c1xuICAgKi9cbiAgLy8gVE9ETyBzcGxpdCB0byBtb2R1bGUgJiBhZGQgdGVzdHNcbiAgaWYgKG9wdGlvbnMucG9pbnRlcikge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGRpdiBpZD1cIiR7SURFTlRfUE9JTlRFUn1cIj48L2Rpdj5gKTtcbiAgICBsZXQgeCA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgICBsZXQgeSA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgICBsZXQgbW92ZUVzID0gY29udHJvbC5tb3VzZW1vdmUoKTtcbiAgICBsZXQgcG9pbnRlckVsID0gdXRpbC5nZXRCeUlkKElERU5UX1BPSU5URVIpO1xuICAgIHgucGx1Zyhtb3ZlRXMpO1xuICAgIHkucGx1Zyhtb3ZlRXMpO1xuXG4gICAgeC5tYXAoKGUpID0+IGUueCkub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YocG9pbnRlckVsLCAnbGVmdCcpKTtcbiAgICB4Lm1hcCgoZSkgPT4gZS55KS5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZihwb2ludGVyRWwsICd0b3AnKSk7XG5cbiAgICBsZXQgYXNzaWduUG9pbnRlclZpc2liaWxpdHkgPSB1dGlsLnN0eWxlQXNzaWduT2YocG9pbnRlckVsLCAndmlzaWJpbGl0eScpO1xuICAgIGNvbnRyb2wua2V5ZG93bignc3BhY2UnKVxuICAgICAgLm1hcCgndmlzaWJsZScpXG4gICAgICAub25WYWx1ZShhc3NpZ25Qb2ludGVyVmlzaWJpbGl0eSk7XG4gICAgY29udHJvbC5rZXkoJ3NwYWNlJylcbiAgICAgIC5tYXAoJ2hpZGRlbicpXG4gICAgICAub25WYWx1ZShhc3NpZ25Qb2ludGVyVmlzaWJpbGl0eSk7XG4gIH1cblxuICAvLyBUT0RPIHNwbGl0IHRvIG1vZHVsZSAmIGFkZCB0ZXN0XG4gIGlmIChvcHRpb25zLmJhY2tmYWNlKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGlkPVwiJHtJREVOVF9CQUNLRkFDRX1cIj48L2Rpdj5gKTtcbiAgICBsZXQgYmFja2ZhY2VFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9CQUNLRkFDRSk7XG5cbiAgICBsZXQgYmdJbWFnZUJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgICBsZXQgYmdGaWx0ZXJCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgICBiZ0ltYWdlQnVzLnBsdWcocGFnaW5nLmNoYW5nZWRFcyk7XG4gICAgYmdGaWx0ZXJCdXMucGx1ZyhwYWdpbmcuY2hhbmdlZEVzKTtcblxuICAgIC8vIGJhY2tmYWNlIGltYWdlXG4gICAgYmdJbWFnZUJ1c1xuICAgICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfQkFDS0ZBQ0UpXG4gICAgICAubWFwKChzcmMpID0+IHNyYyA/IGB1cmwoXCIke3NyY31cIilgIDogJycpXG4gICAgICAub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YoYmFja2ZhY2VFbCwgJ2JhY2tncm91bmQtaW1hZ2UnKSk7XG5cbiAgICAvLyBiYWNrZmFjZSBpbWFnZSBjc3MgZmlsdGVyICh3ZWJraXQgb25seSlcbiAgICBiZ0ZpbHRlckJ1c1xuICAgICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfRklMVEVSKVxuICAgICAgLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKGJhY2tmYWNlRWwsICctd2Via2l0LWZpbHRlcicpKTtcblxuICAgIC8vIHByZWxvYWRcbiAgICBCYWNvbi5mcm9tQXJyYXkoc2xpZGVzKVxuICAgICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfQkFDS0ZBQ0UpXG4gICAgICAuZmlsdGVyKCh2KSA9PiAhIXYpXG4gICAgICAub25WYWx1ZSh1dGlsLnByZWxvYWRJbWcpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuY29udHJvbCkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICA8ZGl2IGlkPVwiJHtJREVOVF9DT05UUk9MfVwiPlxuICAgICAgICA8cD48c3BhbiBpZD1cIiR7SURFTlRfUFJFVn1cIj4mbHQ7PC9zcGFuPlxuICAgICAgICBQYWdlIDxzcGFuIGlkPVwiJHtJREVOVF9QQUdFfVwiPjA8L3NwYW4+IG9mIDxzcGFuIGlkPVwiJHtJREVOVF9UT1RBTH1cIj4wPC9zcGFuPlxuICAgICAgICA8c3BhbiBpZD1cIiR7SURFTlRfTkVYVH1cIj4mZ3Q7PC9zcGFuPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIGApO1xuXG4gICAgbGV0IG5leHRFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9ORVhUKTtcbiAgICBsZXQgcHJldkVsID0gdXRpbC5nZXRCeUlkKElERU5UX1BSRVYpO1xuXG4gICAgLy8gbmV4dCBidXR0b25cbiAgICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wuY2xpY2sobmV4dEVsKSk7XG5cbiAgICAvLyBwcmV2IGJ1dHRvblxuICAgIHBhZ2luZy5wcmV2QnVzLnBsdWcoY29udHJvbC5jbGljayhwcmV2RWwpKTtcblxuICAgIC8vIGN1cnJlbnQgcGFnZVxuICAgIHBhZ2luZy5jdXJyZW50RXMub25WYWx1ZSh1dGlsLnRleHRBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUEFHRSkpKTtcblxuICAgIC8vIHRvdGFsIG9mIHBhZ2VcbiAgICBCYWNvbi5vbmNlKHNsaWRlcy5sZW5ndGgpLm9uVmFsdWUodXRpbC50ZXh0QXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1RPVEFMKSkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX1BST0dSRVNTfVwiPjwvZGl2PmApO1xuXG4gICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgcGFnaW5nLnBlcmNlbnRFcy5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUFJPR1JFU1MpLCAnd2lkdGgnKSk7XG4gIH1cblxuICAvKipcbiAgICogRnVsbFNjcmVlblxuICAgKi9cbiAgRnVsbFNjcmVlbihkb2N1bWVudC5ib2R5KS5wbHVnKGNvbnRyb2wua2V5KCdmJykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IG1hcmtlZCBmcm9tICdtYXJrZWQnO1xuaW1wb3J0IHV0aWwgICBmcm9tICcuL3V0aWwnO1xuXG5tYXJrZWQuc2V0T3B0aW9ucyh7XG4gIGxhbmdQcmVmaXg6ICdobGpzICcsXG4gIGhpZ2hsaWdodDogZnVuY3Rpb24gKGNvZGUpIHtcbiAgICBpZiAod2luZG93LmhsanMgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpZ2hsaWdodC5qcyAoYHdpbmRvdy5obGpzYCkgaXMgbWlzc2luZycpO1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIHJldHVybiB3aW5kb3cuaGxqcy5oaWdobGlnaHRBdXRvKGNvZGUpLnZhbHVlO1xuICB9XG59KTtcblxuLyoqXG4gKiBjb21waWxlIG1hcmtkb3duXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgZGVmYXVsdCBjb21waWxlTWFya2Rvd247XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGVNYXJrZG93bihlbCkge1xuICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgc2VjdGlvbi5pbm5lckhUTUwgPSBtYXJrZWQoZWwuaW5uZXJIVE1MKTtcbiAgdXRpbC50b0FycmF5KGVsLmF0dHJpYnV0ZXMpLmZpbHRlcihub3RUeXBlQXR0cmlidXRlKS5mb3JFYWNoKGNvcHlBdHRyaWJ1dGVUbyhzZWN0aW9uKSk7XG4gIGVsLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHNlY3Rpb24sIGVsKTtcbiAgcmV0dXJuIHNlY3Rpb247XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjb3B5QXR0cmlidXRlVG8oZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0F0dHJpYnV0ZU5vZGV9IGF0dHJcbiAqL1xuZnVuY3Rpb24gbm90VHlwZUF0dHJpYnV0ZShhdHRyKSB7XG4gIHJldHVybiBhdHRyLm5hbWUgIT09ICd0eXBlJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgY29udHJvbCBmcm9tICcuL2NvbnRyb2wnO1xuaW1wb3J0IHV0aWwgICAgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYWdpbmdPcHRpb25zXG4gKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRQYWdlXG4gKiBAcHJvcGVydHkge051bWJlcn0gZW5kUGFnZVxuICogQHByb3BlcnR5IHtBcnJheTxFbGVtZW50Pn0gc2xpZGVFbGVtZW50c1xuICovXG5cbi8qKlxuICogcGFnaW5nIGNvbnRyb2xcbiAqXG4gKiBAcGFyYW0ge1BhZ2luZ09wdGlvbnN9IG9wdGlvbnNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gIGxldCBuZXh0QnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgcHJldkJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgbGV0IG1vdmVCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cbiAgbGV0IGN1cnJlbnRCdXMgID0gbmV3IEJhY29uLkJ1cygpO1xuICBsZXQgY3VycmVudFBhZ2UgPSBjdXJyZW50QnVzXG4gICAgLm1hcChpblJhbmdlT2YoMSwgb3B0aW9ucy5lbmRQYWdlKSlcbiAgICAudG9Qcm9wZXJ0eShvcHRpb25zLnN0YXJ0UGFnZSB8fCAxKVxuICAgIC5za2lwRHVwbGljYXRlcygpO1xuXG4gIGxldCBuZXh0RXMgPSBjdXJyZW50UGFnZS5zYW1wbGVkQnkobmV4dEJ1cykubWFwKCh2KSA9PiB2ICsgMSk7XG4gIGxldCBwcmV2RXMgPSBjdXJyZW50UGFnZS5zYW1wbGVkQnkocHJldkJ1cykubWFwKCh2KSA9PiB2IC0gMSk7XG4gIGxldCBtb3ZlRXMgPSBtb3ZlQnVzLm1hcCgodikgPT4gdiAvKm5vb3AqLyk7XG5cbiAgY3VycmVudEJ1cy5wbHVnKG5leHRFcyk7XG4gIGN1cnJlbnRCdXMucGx1ZyhwcmV2RXMpO1xuICBjdXJyZW50QnVzLnBsdWcobW92ZUVzKTtcblxuICBsZXQgcGVyY2VudFN0cmluZyA9IGN1cnJlbnRQYWdlLm1hcChwZXJjZW50T2Yob3B0aW9ucy5lbmRQYWdlKSk7XG4gIGxldCBjdXJyZW50U2xpZGUgID0gY3VycmVudFBhZ2UubWFwKChpKSA9PiBvcHRpb25zLnNsaWRlRWxlbWVudHNbaSAtIDFdKTtcblxuICBjdXJyZW50U2xpZGUub25WYWx1ZShmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgb3B0aW9ucy5zbGlkZUVsZW1lbnRzLmZvckVhY2godG9JbnZpc2libGUpO1xuICAgIGN1cnJlbnQgJiYgdG9WaXNpYmxlKGN1cnJlbnQpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGN1cnJlbnRFcyA6IGN1cnJlbnRQYWdlLFxuICAgIHN0YXJ0RXMgICA6IGN1cnJlbnRQYWdlLmZpbHRlcigodikgPT4gdiA9PT0gMSksXG4gICAgZW5kRXMgICAgIDogY3VycmVudFBhZ2UuZmlsdGVyKCh2KSA9PiB2ID09PSBvcHRpb25zLmVuZFBhZ2UpLFxuICAgIGNoYW5nZWRFcyA6IGN1cnJlbnRTbGlkZSxcbiAgICBwZXJjZW50RXMgOiBwZXJjZW50U3RyaW5nLFxuICAgIG5leHRCdXMgICA6IG5leHRCdXMsXG4gICAgcHJldkJ1cyAgIDogcHJldkJ1cyxcbiAgICBtb3ZlQnVzICAgOiBtb3ZlQnVzXG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICovXG5mdW5jdGlvbiB0b0ludmlzaWJsZShlbCkge1xuICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKi9cbmZ1bmN0aW9uIHRvVmlzaWJsZShlbCkge1xuICBlbC5zZXRBdHRyaWJ1dGUoJ3Zpc2libGUnLCAxKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbWluXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGluUmFuZ2VPZihtaW4sIG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oeikge1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KHosIG1pbikpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gcGVyY2VudE9mKG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oY3VycmVudCkge1xuICAgIHJldHVybiAoKDEwMCAvIG1heCkgKiBjdXJyZW50KSArICclJztcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBxdWVyeSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUXVlcnk7XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5KSB7XG4gIGxldCByZXQgPSAge307XG4gIHF1ZXJ5XG4gICAgLnNsaWNlKDEsIC0xKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLm1hcCgoa2V5RXFWYWwpID0+IGtleUVxVmFsLnNwbGl0KCc9JykpXG4gICAgLmZvckVhY2goKGt2KSA9PiByZXRba3ZbMF1dID0ga3ZbMV0pO1xuICByZXR1cm4gcmV0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgdXRpbCAgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSYXRpb09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtFbGVtZW50fSB0YXJnZXRcbiAqL1xuXG4vKipcbiAqIGNvbXB1dGUgcmF0aW9cbiAqXG4gKiBAcGFyYW0ge1JhdGlvT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcblxuICBsZXQgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gIGxldCBoUmF0aW9GbiA9IGhvcml6b250YWxSYXRpb09mKG9wdGlvbnMud2lkdGgpO1xuICBsZXQgdlJhdGlvRm4gPSB2ZXJ0aWNhbFJhdGlvT2Yob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGxldCBoUmF0aW8gPSBidXMubWFwKGhSYXRpb0ZuKS50b1Byb3BlcnR5KGhSYXRpb0ZuKCkpO1xuICBsZXQgdlJhdGlvID0gYnVzLm1hcCh2UmF0aW9GbikudG9Qcm9wZXJ0eSh2UmF0aW9GbigpKTtcblxuICBsZXQgc2NhbGUgPSB1dGlsLmNvbXBvc2UoY2VudGVyaW5nT2Yob3B0aW9ucy50YXJnZXQpLCBzY2FsaW5nT2Yob3B0aW9ucy50YXJnZXQpKTtcblxuICBCYWNvbi5jb21iaW5lV2l0aChNYXRoLm1pbiwgaFJhdGlvLCB2UmF0aW8pLm9uVmFsdWUoc2NhbGUpO1xuXG4gIHJldHVybiBidXM7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGhvcml6b250YWxSYXRpb09mKHdpZHRoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aWR0aDtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHZlcnRpY2FsUmF0aW9PZihoZWlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgLyBoZWlnaHQ7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzY2FsaW5nT2YoZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJhdGlvKSB7XG4gICAgZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYHNjYWxlKCR7TWF0aC5hYnMocmF0aW8pfSlgO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY2VudGVyaW5nT2YoZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgZWwuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAgLSByZWN0LndpZHRoKSAvIDI7XG4gICAgZWwuc3R5bGUudG9wICA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0XG4gICAqIEByZXR1cm5zIHtBcnJheS48VD59XG4gICAqL1xuICB0b0FycmF5KGxpc3QpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRPRE8gdGVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3JpZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdHNcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGRlZmF1bHRzKG9yaWcsIGRlZmF1bHRzKSB7XG4gICAgbGV0IHJldCA9IHRoaXMuY2xvbmUob3JpZyk7XG4gICAgT2JqZWN0LmtleXMoZGVmYXVsdHMpLmZvckVhY2goKGspPT4ge1xuICAgICAgaWYgKGsgaW4gcmV0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldFtrXSA9IGRlZmF1bHRzW2tdO1xuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRPRE8gdGVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3JpZ1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgY2xvbmUob3JpZykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvcmlnKS5mb3JFYWNoKChrKT0+IHJldFtrXSA9IG9yaWdba10pO1xuICAgIHJldHVybiByZXQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuLi4uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIGNvbXBvc2UoKSB7XG4gICAgLy8gaHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvI2NvbXBvc2VcbiAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICBsZXQgc3RhcnQgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGkgPSBzdGFydDtcbiAgICAgIGxldCByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudFxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRCeUlkKGlkZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKi9cbiAgdGV4dEFzc2lnbk9mKGVsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKi9cbiAgc3R5bGVBc3NpZ25PZihlbCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzcmNcbiAgICovXG4gIHByZWxvYWRJbWcoc3JjKSB7XG4gICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5vbmxvYWQgPSAoKT0+IGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgICBpbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGltZyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBnZXRQYWdlTnVtYmVyRnJvbUhhc2goKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKSwgMTApIHx8IDA7XG4gIH1cbn07XG4iXX0=
