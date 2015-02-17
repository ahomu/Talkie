/*! talkie - v0.5.0 */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Talkie=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(global){"use strict";if(global._babelPolyfill){throw new Error("only one instance of babel/polyfill is allowed")}global._babelPolyfill=true;require("core-js/shim");require("regenerator-babel/runtime")}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"core-js/shim":2,"regenerator-babel/runtime":3}],2:[function(require,module,exports){!function(global,framework,undefined){"use strict";var OBJECT="Object",FUNCTION="Function",ARRAY="Array",STRING="String",NUMBER="Number",REGEXP="RegExp",DATE="Date",MAP="Map",SET="Set",WEAKMAP="WeakMap",WEAKSET="WeakSet",SYMBOL="Symbol",PROMISE="Promise",MATH="Math",ARGUMENTS="Arguments",PROTOTYPE="prototype",CONSTRUCTOR="constructor",TO_STRING="toString",TO_STRING_TAG=TO_STRING+"Tag",TO_LOCALE="toLocaleString",HAS_OWN="hasOwnProperty",FOR_EACH="forEach",ITERATOR="iterator",FF_ITERATOR="@@"+ITERATOR,PROCESS="process",CREATE_ELEMENT="createElement",Function=global[FUNCTION],Object=global[OBJECT],Array=global[ARRAY],String=global[STRING],Number=global[NUMBER],RegExp=global[REGEXP],Date=global[DATE],Map=global[MAP],Set=global[SET],WeakMap=global[WEAKMAP],WeakSet=global[WEAKSET],Symbol=global[SYMBOL],Math=global[MATH],TypeError=global.TypeError,RangeError=global.RangeError,setTimeout=global.setTimeout,setImmediate=global.setImmediate,clearImmediate=global.clearImmediate,parseInt=global.parseInt,isFinite=global.isFinite,process=global[PROCESS],nextTick=process&&process.nextTick,document=global.document,html=document&&document.documentElement,navigator=global.navigator,define=global.define,ArrayProto=Array[PROTOTYPE],ObjectProto=Object[PROTOTYPE],FunctionProto=Function[PROTOTYPE],Infinity=1/0,DOT=".",CONSOLE_METHODS="assert,clear,count,debug,dir,dirxml,error,exception,"+"group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,"+"markTimeline,profile,profileEnd,table,time,timeEnd,timeline,"+"timelineEnd,timeStamp,trace,warn";function isObject(it){return it!==null&&(typeof it=="object"||typeof it=="function")}function isFunction(it){return typeof it=="function"}var isNative=ctx(/./.test,/\[native code\]\s*\}\s*$/,1);var toString=ObjectProto[TO_STRING];function setToStringTag(it,tag,stat){if(it&&!has(it=stat?it:it[PROTOTYPE],SYMBOL_TAG))hidden(it,SYMBOL_TAG,tag)}function cof(it){return toString.call(it).slice(8,-1)}function classof(it){var O,T;return it==undefined?it===undefined?"Undefined":"Null":typeof(T=(O=Object(it))[SYMBOL_TAG])=="string"?T:cof(O)}var call=FunctionProto.call,apply=FunctionProto.apply,REFERENCE_GET;function part(){var fn=assertFunction(this),length=arguments.length,args=Array(length),i=0,_=path._,holder=false;while(length>i)if((args[i]=arguments[i++])===_)holder=true;return function(){var that=this,_length=arguments.length,i=0,j=0,_args;if(!holder&&!_length)return invoke(fn,args,that);_args=args.slice();if(holder)for(;length>i;i++)if(_args[i]===_)_args[i]=arguments[j++];while(_length>j)_args.push(arguments[j++]);return invoke(fn,_args,that)}}function ctx(fn,that,length){assertFunction(fn);if(~length&&that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}function invoke(fn,args,that){var un=that===undefined;switch(args.length|0){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);case 5:return un?fn(args[0],args[1],args[2],args[3],args[4]):fn.call(that,args[0],args[1],args[2],args[3],args[4])}return fn.apply(that,args)}function construct(target,argumentsList){var proto=assertFunction(arguments.length<3?target:arguments[2])[PROTOTYPE],instance=create(isObject(proto)?proto:ObjectProto),result=apply.call(target,instance,argumentsList);return isObject(result)?result:instance}var create=Object.create,getPrototypeOf=Object.getPrototypeOf,setPrototypeOf=Object.setPrototypeOf,defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,getOwnDescriptor=Object.getOwnPropertyDescriptor,getKeys=Object.keys,getNames=Object.getOwnPropertyNames,getSymbols=Object.getOwnPropertySymbols,isFrozen=Object.isFrozen,has=ctx(call,ObjectProto[HAS_OWN],2),ES5Object=Object,Dict;function toObject(it){return ES5Object(assertDefined(it))}function returnIt(it){return it}function returnThis(){return this}function get(object,key){if(has(object,key))return object[key]}function ownKeys(it){assertObject(it);return getSymbols?getNames(it).concat(getSymbols(it)):getNames(it)}var assign=Object.assign||function(target,source){var T=Object(assertDefined(target)),l=arguments.length,i=1;while(l>i){var S=ES5Object(arguments[i++]),keys=getKeys(S),length=keys.length,j=0,key;while(length>j)T[key=keys[j++]]=S[key]}return T};function keyOf(object,el){var O=toObject(object),keys=getKeys(O),length=keys.length,index=0,key;while(length>index)if(O[key=keys[index++]]===el)return key}function array(it){return String(it).split(",")}var push=ArrayProto.push,unshift=ArrayProto.unshift,slice=ArrayProto.slice,splice=ArrayProto.splice,indexOf=ArrayProto.indexOf,forEach=ArrayProto[FOR_EACH];function createArrayMethod(type){var isMap=type==1,isFilter=type==2,isSome=type==3,isEvery=type==4,isFindIndex=type==6,noholes=type==5||isFindIndex;return function(callbackfn){var O=Object(assertDefined(this)),that=arguments[1],self=ES5Object(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=isMap?Array(length):isFilter?[]:undefined,val,res;for(;length>index;index++)if(noholes||index in self){val=self[index];res=f(val,index,O);if(type){if(isMap)result[index]=res;else if(res)switch(type){case 3:return true;case 5:return val;case 6:return index;case 2:result.push(val)}else if(isEvery)return false}}return isFindIndex?-1:isSome||isEvery?isEvery:result}}function createArrayContains(isContains){return function(el){var O=toObject(this),length=toLength(O.length),index=toIndex(arguments[1],length);if(isContains&&el!=el){for(;length>index;index++)if(sameNaN(O[index]))return isContains||index}else for(;length>index;index++)if(isContains||index in O){if(O[index]===el)return isContains||index}return!isContains&&-1}}function generic(A,B){return typeof A=="function"?A:B}var MAX_SAFE_INTEGER=9007199254740991,pow=Math.pow,abs=Math.abs,ceil=Math.ceil,floor=Math.floor,max=Math.max,min=Math.min,random=Math.random,trunc=Math.trunc||function(it){return(it>0?floor:ceil)(it)};function sameNaN(number){return number!=number}function toInteger(it){return isNaN(it)?0:trunc(it)}function toLength(it){return it>0?min(toInteger(it),MAX_SAFE_INTEGER):0}function toIndex(index,length){var index=toInteger(index);return index<0?max(index+length,0):min(index,length)}function lz(num){return num>9?num:"0"+num}function createReplacer(regExp,replace,isStatic){var replacer=isObject(replace)?function(part){return replace[part]}:replace;return function(it){return String(isStatic?it:this).replace(regExp,replacer)}}function createPointAt(toString){return function(pos){var s=String(assertDefined(this)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return toString?"":undefined;a=s.charCodeAt(i);return a<55296||a>56319||i+1===l||(b=s.charCodeAt(i+1))<56320||b>57343?toString?s.charAt(i):a:toString?s.slice(i,i+2):(a-55296<<10)+(b-56320)+65536}}var REDUCE_ERROR="Reduce of empty object with no initial value";function assert(condition,msg1,msg2){if(!condition)throw TypeError(msg2?msg1+msg2:msg1)}function assertDefined(it){if(it==undefined)throw TypeError("Function called on null or undefined");return it}function assertFunction(it){assert(isFunction(it),it," is not a function!");return it}function assertObject(it){assert(isObject(it),it," is not an object!");return it}function assertInstance(it,Constructor,name){assert(it instanceof Constructor,name,": use the 'new' operator!")}function descriptor(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value}}function simpleSet(object,key,value){object[key]=value;return object}function createDefiner(bitmap){return DESC?function(object,key,value){return defineProperty(object,key,descriptor(bitmap,value))}:simpleSet}function uid(key){return SYMBOL+"("+key+")_"+(++sid+random())[TO_STRING](36)}function getWellKnownSymbol(name,setter){return Symbol&&Symbol[name]||(setter?Symbol:safeSymbol)(SYMBOL+DOT+name)}var DESC=!!function(){try{return defineProperty({},"a",{get:function(){return 2}}).a==2}catch(e){}}(),sid=0,hidden=createDefiner(1),set=Symbol?simpleSet:hidden,safeSymbol=Symbol||uid;function assignHidden(target,src){for(var key in src)hidden(target,key,src[key]);return target}var SYMBOL_UNSCOPABLES=getWellKnownSymbol("unscopables"),ArrayUnscopables=ArrayProto[SYMBOL_UNSCOPABLES]||{},SYMBOL_SPECIES=getWellKnownSymbol("species");function setSpecies(C){if(framework||!isNative(C))defineProperty(C,SYMBOL_SPECIES,{configurable:true,get:returnThis})}var SYMBOL_ITERATOR=getWellKnownSymbol(ITERATOR),SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG),SUPPORT_FF_ITER=FF_ITERATOR in ArrayProto,ITER=safeSymbol("iter"),KEY=1,VALUE=2,Iterators={},IteratorPrototype={},NATIVE_ITERATORS=SYMBOL_ITERATOR in ArrayProto,BUGGY_ITERATORS="keys"in ArrayProto&&!("next"in[].keys());setIterator(IteratorPrototype,returnThis);function setIterator(O,value){hidden(O,SYMBOL_ITERATOR,value);SUPPORT_FF_ITER&&hidden(O,FF_ITERATOR,value)}function createIterator(Constructor,NAME,next,proto){Constructor[PROTOTYPE]=create(proto||IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+" Iterator")}function defineIterator(Constructor,NAME,value,DEFAULT){var proto=Constructor[PROTOTYPE],iter=get(proto,SYMBOL_ITERATOR)||get(proto,FF_ITERATOR)||DEFAULT&&get(proto,DEFAULT)||value;if(framework){setIterator(proto,iter);if(iter!==value){var iterProto=getPrototypeOf(iter.call(new Constructor));setToStringTag(iterProto,NAME+" Iterator",true);has(proto,FF_ITERATOR)&&setIterator(iterProto,returnThis)}}Iterators[NAME]=iter;Iterators[NAME+" Iterator"]=returnThis;return iter}function defineStdIterators(Base,NAME,Constructor,next,DEFAULT,IS_SET){function createIter(kind){return function(){return new Constructor(this,kind)}}createIterator(Constructor,NAME,next);var entries=createIter(KEY+VALUE),values=createIter(VALUE);if(DEFAULT==VALUE)values=defineIterator(Base,NAME,values,"values");else entries=defineIterator(Base,NAME,entries,"entries");if(DEFAULT){$define(PROTO+FORCED*BUGGY_ITERATORS,NAME,{entries:entries,keys:IS_SET?values:createIter(KEY),values:values})}}function iterResult(done,value){return{value:value,done:!!done}}function isIterable(it){var O=Object(it),Symbol=global[SYMBOL],hasExt=(Symbol&&Symbol[ITERATOR]||FF_ITERATOR)in O;return hasExt||SYMBOL_ITERATOR in O||has(Iterators,classof(O))}function getIterator(it){var Symbol=global[SYMBOL],ext=it[Symbol&&Symbol[ITERATOR]||FF_ITERATOR],getIter=ext||it[SYMBOL_ITERATOR]||Iterators[classof(it)];return assertObject(getIter.call(it))}function stepCall(fn,value,entries){return entries?invoke(fn,value):fn(value)}function forOf(iterable,entries,fn,that){var iterator=getIterator(iterable),f=ctx(fn,that,entries?2:1),step;while(!(step=iterator.next()).done)if(stepCall(f,step.value,entries)===false)return}var NODE=cof(process)==PROCESS,core={},path=framework?global:core,old=global.core,exportGlobal,FORCED=1,GLOBAL=2,STATIC=4,PROTO=8,BIND=16,WRAP=32,SIMPLE=64;function $define(type,name,source){var key,own,out,exp,isGlobal=type&GLOBAL,target=isGlobal?global:type&STATIC?global[name]:(global[name]||ObjectProto)[PROTOTYPE],exports=isGlobal?core:core[name]||(core[name]={});if(isGlobal)source=name;for(key in source){own=!(type&FORCED)&&target&&key in target&&(!isFunction(target[key])||isNative(target[key]));out=(own?target:source)[key];if(!framework&&isGlobal&&!isFunction(target[key]))exp=source[key];else if(type&BIND&&own)exp=ctx(out,global);else if(type&WRAP&&!framework&&target[key]==out){exp=function(param){return this instanceof out?new out(param):out(param)};exp[PROTOTYPE]=out[PROTOTYPE]}else exp=type&PROTO&&isFunction(out)?ctx(call,out):out;if(framework&&target&&!own){if(isGlobal||type&SIMPLE)target[key]=out;else delete target[key]&&hidden(target,key,out)}if(exports[key]!=out)hidden(exports,key,exp)}}if(typeof module!="undefined"&&module.exports)module.exports=core;else if(isFunction(define)&&define.amd)define(function(){return core});else exportGlobal=true;if(exportGlobal||framework){core.noConflict=function(){global.core=old;return core};global.core=core}!function(TAG,SymbolRegistry,AllSymbols,setter){if(!isNative(Symbol)){Symbol=function(description){assert(!(this instanceof Symbol),SYMBOL+" is not a "+CONSTRUCTOR);var tag=uid(description),sym=set(create(Symbol[PROTOTYPE]),TAG,tag);AllSymbols[tag]=sym;DESC&&setter&&defineProperty(ObjectProto,tag,{configurable:true,set:function(value){hidden(this,tag,value)}});return sym};hidden(Symbol[PROTOTYPE],TO_STRING,function(){return this[TAG]})}$define(GLOBAL+WRAP,{Symbol:Symbol});var symbolStatics={"for":function(key){return has(SymbolRegistry,key+="")?SymbolRegistry[key]:SymbolRegistry[key]=Symbol(key)},iterator:SYMBOL_ITERATOR,keyFor:part.call(keyOf,SymbolRegistry),species:SYMBOL_SPECIES,toStringTag:SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG,true),unscopables:SYMBOL_UNSCOPABLES,pure:safeSymbol,set:set,useSetter:function(){setter=true},useSimple:function(){setter=false}};forEach.call(array("hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive"),function(it){symbolStatics[it]=getWellKnownSymbol(it)});$define(STATIC,SYMBOL,symbolStatics);setToStringTag(Symbol,SYMBOL);$define(STATIC+FORCED*!isNative(Symbol),OBJECT,{getOwnPropertyNames:function(it){var names=getNames(toObject(it)),result=[],key,i=0;while(names.length>i)has(AllSymbols,key=names[i++])||result.push(key);return result},getOwnPropertySymbols:function(it){var names=getNames(toObject(it)),result=[],key,i=0;while(names.length>i)has(AllSymbols,key=names[i++])&&result.push(AllSymbols[key]);return result}})}(safeSymbol("tag"),{},{},true);!function(tmp){var objectStatic={assign:assign,is:function(x,y){return x===y?x!==0||1/x===1/y:x!=x&&y!=y}};"__proto__"in ObjectProto&&function(buggy,set){try{set=ctx(call,getOwnDescriptor(ObjectProto,"__proto__").set,2);set({},ArrayProto)}catch(e){buggy=true}objectStatic.setPrototypeOf=setPrototypeOf=setPrototypeOf||function(O,proto){assertObject(O);assert(proto===null||isObject(proto),proto,": can't set as prototype!");if(buggy)O.__proto__=proto;else set(O,proto);return O}}();$define(STATIC,OBJECT,objectStatic);if(framework){tmp[SYMBOL_TAG]=DOT;if(cof(tmp)!=DOT)hidden(ObjectProto,TO_STRING,function(){return"[object "+classof(this)+"]"})}setToStringTag(Math,MATH,true);setToStringTag(global.JSON,"JSON",true)}({});!function(){function wrapObjectMethod(key,MODE){var fn=Object[key],exp=core[OBJECT][key],f=0,o={};if(!exp||isNative(exp)){o[key]=MODE==1?function(it){return isObject(it)?fn(it):it}:MODE==2?function(it){return isObject(it)?fn(it):true}:MODE==3?function(it){return isObject(it)?fn(it):false}:MODE==4?function(it,key){return fn(toObject(it),key)}:function(it){return fn(toObject(it))};try{fn(DOT)}catch(e){f=1}$define(STATIC+FORCED*f,OBJECT,o)}}wrapObjectMethod("freeze",1);wrapObjectMethod("seal",1);wrapObjectMethod("preventExtensions",1);wrapObjectMethod("isFrozen",2);wrapObjectMethod("isSealed",2);wrapObjectMethod("isExtensible",3);wrapObjectMethod("getOwnPropertyDescriptor",4);wrapObjectMethod("getPrototypeOf");wrapObjectMethod("keys");wrapObjectMethod("getOwnPropertyNames")}();!function(NAME){NAME in FunctionProto||defineProperty(FunctionProto,NAME,{configurable:true,get:function(){var match=String(this).match(/^\s*function ([^ (]*)/),name=match?match[1]:"";has(this,NAME)||defineProperty(this,NAME,descriptor(5,name));return name},set:function(value){has(this,NAME)||defineProperty(this,NAME,descriptor(0,value))}})}("name");Number("0o1")&&Number("0b1")||function(_Number,NumberProto){function toNumber(it){if(isObject(it))it=toPrimitive(it);if(typeof it=="string"&&it.length>2&&it.charCodeAt(0)==48){var binary=false;switch(it.charCodeAt(1)){case 66:case 98:binary=true;case 79:case 111:return parseInt(it.slice(2),binary?2:8)}}return+it}function toPrimitive(it){var fn,val;if(isFunction(fn=it.valueOf)&&!isObject(val=fn.call(it)))return val;if(isFunction(fn=it[TO_STRING])&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to number")}Number=function Number(it){return this instanceof Number?new _Number(toNumber(it)):toNumber(it)};forEach.call(DESC?getNames(_Number):array("MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY"),function(key){key in Number||defineProperty(Number,key,getOwnDescriptor(_Number,key))});Number[PROTOTYPE]=NumberProto;NumberProto[CONSTRUCTOR]=Number;hidden(global,NUMBER,Number)}(Number,Number[PROTOTYPE]);!function(isInteger){$define(STATIC,NUMBER,{EPSILON:pow(2,-52),isFinite:function(it){return typeof it=="number"&&isFinite(it)},isInteger:isInteger,isNaN:sameNaN,isSafeInteger:function(number){return isInteger(number)&&abs(number)<=MAX_SAFE_INTEGER},MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,MIN_SAFE_INTEGER:-MAX_SAFE_INTEGER,parseFloat:parseFloat,parseInt:parseInt})}(Number.isInteger||function(it){return!isObject(it)&&isFinite(it)&&floor(it)===it});!function(){var E=Math.E,exp=Math.exp,log=Math.log,sqrt=Math.sqrt,sign=Math.sign||function(x){return(x=+x)==0||x!=x?x:x<0?-1:1};function asinh(x){return!isFinite(x=+x)||x==0?x:x<0?-asinh(-x):log(x+sqrt(x*x+1))}function expm1(x){return(x=+x)==0?x:x>-1e-6&&x<1e-6?x+x*x/2:exp(x)-1}$define(STATIC,MATH,{acosh:function(x){return(x=+x)<1?NaN:isFinite(x)?log(x/E+sqrt(x+1)*sqrt(x-1)/E)+1:x},asinh:asinh,atanh:function(x){return(x=+x)==0?x:log((1+x)/(1-x))/2},cbrt:function(x){return sign(x=+x)*pow(abs(x),1/3)},clz32:function(x){return(x>>>=0)?32-x[TO_STRING](2).length:32},cosh:function(x){return(exp(x=+x)+exp(-x))/2},expm1:expm1,fround:function(x){return new Float32Array([x])[0]},hypot:function(value1,value2){var sum=0,len1=arguments.length,len2=len1,args=Array(len1),larg=-Infinity,arg;while(len1--){arg=args[len1]=+arguments[len1];if(arg==Infinity||arg==-Infinity)return Infinity;if(arg>larg)larg=arg}larg=arg||1;while(len2--)sum+=pow(args[len2]/larg,2);return larg*sqrt(sum)},imul:function(x,y){var UInt16=65535,xn=+x,yn=+y,xl=UInt16&xn,yl=UInt16&yn;return 0|xl*yl+((UInt16&xn>>>16)*yl+xl*(UInt16&yn>>>16)<<16>>>0)},log1p:function(x){return(x=+x)>-1e-8&&x<1e-8?x-x*x/2:log(1+x)},log10:function(x){return log(x)/Math.LN10},log2:function(x){return log(x)/Math.LN2},sign:sign,sinh:function(x){return abs(x=+x)<1?(expm1(x)-expm1(-x))/2:(exp(x-1)-exp(-x-1))*(E/2)},tanh:function(x){var a=expm1(x=+x),b=expm1(-x);return a==Infinity?1:b==Infinity?-1:(a-b)/(exp(x)+exp(-x))},trunc:trunc})}();!function(fromCharCode){function assertNotRegExp(it){if(cof(it)==REGEXP)throw TypeError()}$define(STATIC,STRING,{fromCodePoint:function(x){var res=[],len=arguments.length,i=0,code;while(len>i){code=+arguments[i++];if(toIndex(code,1114111)!==code)throw RangeError(code+" is not a valid code point");res.push(code<65536?fromCharCode(code):fromCharCode(((code-=65536)>>10)+55296,code%1024+56320))}return res.join("")},raw:function(callSite){var raw=toObject(callSite.raw),len=toLength(raw.length),sln=arguments.length,res=[],i=0;while(len>i){res.push(String(raw[i++]));if(i<sln)res.push(String(arguments[i]))}return res.join("")}});$define(PROTO,STRING,{codePointAt:createPointAt(false),endsWith:function(searchString){assertNotRegExp(searchString);var that=String(assertDefined(this)),endPosition=arguments[1],len=toLength(that.length),end=endPosition===undefined?len:min(toLength(endPosition),len);searchString+="";return that.slice(end-searchString.length,end)===searchString},includes:function(searchString){assertNotRegExp(searchString);return!!~String(assertDefined(this)).indexOf(searchString,arguments[1])},repeat:function(count){var str=String(assertDefined(this)),res="",n=toInteger(count);if(0>n||n==Infinity)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(str+=str))if(n&1)res+=str;return res},startsWith:function(searchString){assertNotRegExp(searchString);var that=String(assertDefined(this)),index=toLength(min(arguments[1],that.length));searchString+="";return that.slice(index,index+searchString.length)===searchString}})}(String.fromCharCode);!function(){$define(STATIC,ARRAY,{from:function(arrayLike){var O=Object(assertDefined(arrayLike)),mapfn=arguments[1],mapping=mapfn!==undefined,f=mapping?ctx(mapfn,arguments[2],2):undefined,index=0,length,result,iter,step;if(isIterable(O))for(iter=getIterator(O),result=new(generic(this,Array));!(step=iter.next()).done;index++){result[index]=mapping?f(step.value,index):step.value}else for(result=new(generic(this,Array))(length=toLength(O.length));length>index;index++){result[index]=mapping?f(O[index],index):O[index]}result.length=index;return result},of:function(){var index=0,length=arguments.length,result=new(generic(this,Array))(length);while(length>index)result[index]=arguments[index++];result.length=length;return result}});$define(PROTO,ARRAY,{copyWithin:function(target,start){var O=Object(assertDefined(this)),len=toLength(O.length),to=toIndex(target,len),from=toIndex(start,len),end=arguments[2],fin=end===undefined?len:toIndex(end,len),count=min(fin-from,len-to),inc=1;if(from<to&&to<from+count){inc=-1;from=from+count-1;to=to+count-1}while(count-->0){if(from in O)O[to]=O[from];else delete O[to];to+=inc;from+=inc}return O},fill:function(value){var O=Object(assertDefined(this)),length=toLength(O.length),index=toIndex(arguments[1],length),end=arguments[2],endPos=end===undefined?length:toIndex(end,length);while(endPos>index)O[index++]=value;return O},find:createArrayMethod(5),findIndex:createArrayMethod(6)});if(framework){forEach.call(array("find,findIndex,fill,copyWithin,entries,keys,values"),function(it){ArrayUnscopables[it]=true});SYMBOL_UNSCOPABLES in ArrayProto||hidden(ArrayProto,SYMBOL_UNSCOPABLES,ArrayUnscopables)}setSpecies(Array)}();!function(at){defineStdIterators(Array,ARRAY,function(iterated,kind){set(this,ITER,{o:toObject(iterated),i:0,k:kind})},function(){var iter=this[ITER],O=iter.o,kind=iter.k,index=iter.i++;if(!O||index>=O.length){iter.o=undefined;return iterResult(1)}if(kind==KEY)return iterResult(0,index);if(kind==VALUE)return iterResult(0,O[index]);return iterResult(0,[index,O[index]])},VALUE);Iterators[ARGUMENTS]=Iterators[ARRAY];defineStdIterators(String,STRING,function(iterated){set(this,ITER,{o:String(iterated),i:0})},function(){var iter=this[ITER],O=iter.o,index=iter.i,point;if(index>=O.length)return iterResult(1);point=at.call(O,index);iter.i+=point.length;return iterResult(0,point)})}(createPointAt(true));!function(RegExpProto,_RegExp){function assertRegExpWrapper(fn){return function(){assert(cof(this)===REGEXP);return fn(this)}}if(DESC&&!function(){try{return RegExp(/a/g,"i")=="/a/i"}catch(e){}}()){RegExp=function RegExp(pattern,flags){return new _RegExp(cof(pattern)==REGEXP&&flags!==undefined?pattern.source:pattern,flags)};forEach.call(getNames(_RegExp),function(key){key in RegExp||defineProperty(RegExp,key,{configurable:true,get:function(){return _RegExp[key]},set:function(it){_RegExp[key]=it}})});RegExpProto[CONSTRUCTOR]=RegExp;RegExp[PROTOTYPE]=RegExpProto;hidden(global,REGEXP,RegExp)}if(/./g.flags!="g")defineProperty(RegExpProto,"flags",{configurable:true,get:assertRegExpWrapper(createReplacer(/^.*\/(\w*)$/,"$1",true))});forEach.call(array("sticky,unicode"),function(key){key in/./||defineProperty(RegExpProto,key,DESC?{configurable:true,get:assertRegExpWrapper(function(){return false})}:descriptor(5,false))});setSpecies(RegExp)}(RegExp[PROTOTYPE],RegExp);isFunction(setImmediate)&&isFunction(clearImmediate)||function(ONREADYSTATECHANGE){var postMessage=global.postMessage,addEventListener=global.addEventListener,MessageChannel=global.MessageChannel,counter=0,queue={},defer,channel,port;setImmediate=function(fn){var args=[],i=1;while(arguments.length>i)args.push(arguments[i++]);queue[++counter]=function(){invoke(isFunction(fn)?fn:Function(fn),args)};defer(counter);return counter};clearImmediate=function(id){delete queue[id]};function run(id){if(has(queue,id)){var fn=queue[id];delete queue[id];fn()}}function listner(event){run(event.data)}if(NODE){defer=function(id){nextTick(part.call(run,id))}}else if(addEventListener&&isFunction(postMessage)&&!global.importScripts){defer=function(id){postMessage(id,"*")};addEventListener("message",listner,false)}else if(isFunction(MessageChannel)){channel=new MessageChannel;port=channel.port2;channel.port1.onmessage=listner;defer=ctx(port.postMessage,port,1)}else if(document&&ONREADYSTATECHANGE in document[CREATE_ELEMENT]("script")){defer=function(id){html.appendChild(document[CREATE_ELEMENT]("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run(id)}}}else{defer=function(id){setTimeout(run,0,id)}}}("onreadystatechange");$define(GLOBAL+BIND,{setImmediate:setImmediate,clearImmediate:clearImmediate});!function(Promise,test){isFunction(Promise)&&isFunction(Promise.resolve)&&Promise.resolve(test=new Promise(function(){}))==test||function(asap,DEF){function isThenable(o){var then;if(isObject(o))then=o.then;return isFunction(then)?then:false}function notify(def){var chain=def.chain;chain.length&&asap(function(){var msg=def.msg,ok=def.state==1,i=0;while(chain.length>i)!function(react){var cb=ok?react.ok:react.fail,ret,then;try{if(cb){ret=cb===true?msg:cb(msg);if(ret===react.P){react.rej(TypeError(PROMISE+"-chain cycle"))}else if(then=isThenable(ret)){then.call(ret,react.res,react.rej)}else react.res(ret)}else react.rej(msg)}catch(err){react.rej(err)}}(chain[i++]);chain.length=0})}function resolve(msg){var def=this,then,wrapper;if(def.done)return;def.done=true;def=def.def||def;try{if(then=isThenable(msg)){wrapper={def:def,done:false};then.call(msg,ctx(resolve,wrapper,1),ctx(reject,wrapper,1))}else{def.msg=msg;def.state=1;notify(def)}}catch(err){reject.call(wrapper||{def:def,done:false},err)}}function reject(msg){var def=this;if(def.done)return;def.done=true;def=def.def||def;def.msg=msg;def.state=2;notify(def)}function getConstructor(C){var S=assertObject(C)[SYMBOL_SPECIES];return S!=undefined?S:C}Promise=function(executor){assertFunction(executor);assertInstance(this,Promise,PROMISE);var def={chain:[],state:0,done:false,msg:undefined};hidden(this,DEF,def);try{executor(ctx(resolve,def,1),ctx(reject,def,1))}catch(err){reject.call(def,err)}};assignHidden(Promise[PROTOTYPE],{then:function(onFulfilled,onRejected){var S=assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];var react={ok:isFunction(onFulfilled)?onFulfilled:true,fail:isFunction(onRejected)?onRejected:false},P=react.P=new(S!=undefined?S:Promise)(function(resolve,reject){react.res=assertFunction(resolve);react.rej=assertFunction(reject)}),def=this[DEF];def.chain.push(react);def.state&&notify(def);return P},"catch":function(onRejected){return this.then(undefined,onRejected)}});assignHidden(Promise,{all:function(iterable){var Promise=getConstructor(this),values=[];return new Promise(function(resolve,reject){forOf(iterable,false,push,values);var remaining=values.length,results=Array(remaining);if(remaining)forEach.call(values,function(promise,index){Promise.resolve(promise).then(function(value){results[index]=value;--remaining||resolve(results)},reject)});else resolve(results)})},race:function(iterable){var Promise=getConstructor(this);return new Promise(function(resolve,reject){forOf(iterable,false,function(promise){Promise.resolve(promise).then(resolve,reject)})})},reject:function(r){return new(getConstructor(this))(function(resolve,reject){reject(r)})},resolve:function(x){return isObject(x)&&DEF in x&&getPrototypeOf(x)===this[PROTOTYPE]?x:new(getConstructor(this))(function(resolve,reject){resolve(x)})}})}(nextTick||setImmediate,safeSymbol("def"));setToStringTag(Promise,PROMISE);setSpecies(Promise);$define(GLOBAL+FORCED*!isNative(Promise),{Promise:Promise})}(global[PROMISE]);!function(){var UID=safeSymbol("uid"),O1=safeSymbol("O1"),WEAK=safeSymbol("weak"),LEAK=safeSymbol("leak"),LAST=safeSymbol("last"),FIRST=safeSymbol("first"),SIZE=DESC?safeSymbol("size"):"size",uid=0,tmp={};function getCollection(C,NAME,methods,commonMethods,isMap,isWeak){var ADDER=isMap?"set":"add",proto=C&&C[PROTOTYPE],O={};function initFromIterable(that,iterable){if(iterable!=undefined)forOf(iterable,isMap,that[ADDER],that);return that}function fixSVZ(key,chain){var method=proto[key];if(framework)proto[key]=function(a,b){var result=method.call(this,a===0?0:a,b);return chain?this:result}}if(!isNative(C)||!(isWeak||!BUGGY_ITERATORS&&has(proto,FOR_EACH)&&has(proto,"entries"))){C=isWeak?function(iterable){assertInstance(this,C,NAME);set(this,UID,uid++);initFromIterable(this,iterable)}:function(iterable){var that=this;assertInstance(that,C,NAME);set(that,O1,create(null));set(that,SIZE,0);set(that,LAST,undefined);set(that,FIRST,undefined);initFromIterable(that,iterable)};assignHidden(assignHidden(C[PROTOTYPE],methods),commonMethods);isWeak||defineProperty(C[PROTOTYPE],"size",{get:function(){return assertDefined(this[SIZE])}})}else{var Native=C,inst=new C,chain=inst[ADDER](isWeak?{}:-0,1),buggyZero;if(!NATIVE_ITERATORS||!C.length){C=function(iterable){assertInstance(this,C,NAME);return initFromIterable(new Native,iterable)};C[PROTOTYPE]=proto;if(framework)proto[CONSTRUCTOR]=C}isWeak||inst[FOR_EACH](function(val,key){buggyZero=1/key===-Infinity});if(buggyZero){fixSVZ("delete");fixSVZ("has");isMap&&fixSVZ("get")}if(buggyZero||chain!==inst)fixSVZ(ADDER,true)}setToStringTag(C,NAME);setSpecies(C);O[NAME]=C;$define(GLOBAL+WRAP+FORCED*!isNative(C),O);isWeak||defineStdIterators(C,NAME,function(iterated,kind){set(this,ITER,{o:iterated,k:kind})},function(){var iter=this[ITER],kind=iter.k,entry=iter.l;while(entry&&entry.r)entry=entry.p;if(!iter.o||!(iter.l=entry=entry?entry.n:iter.o[FIRST])){iter.o=undefined;return iterResult(1)}if(kind==KEY)return iterResult(0,entry.k);if(kind==VALUE)return iterResult(0,entry.v);return iterResult(0,[entry.k,entry.v])},isMap?KEY+VALUE:VALUE,!isMap);return C}function fastKey(it,create){if(!isObject(it))return(typeof it=="string"?"S":"P")+it;if(isFrozen(it))return"F";if(!has(it,UID)){if(!create)return"E";hidden(it,UID,++uid)}return"O"+it[UID]}function getEntry(that,key){var index=fastKey(key),entry;if(index!="F")return that[O1][index];for(entry=that[FIRST];entry;entry=entry.n){if(entry.k==key)return entry}}function def(that,key,value){var entry=getEntry(that,key),prev,index;if(entry)entry.v=value;else{that[LAST]=entry={i:index=fastKey(key,true),k:key,v:value,p:prev=that[LAST],n:undefined,r:false};if(!that[FIRST])that[FIRST]=entry;if(prev)prev.n=entry;that[SIZE]++;if(index!="F")that[O1][index]=entry}return that}var collectionMethods={clear:function(){for(var that=this,data=that[O1],entry=that[FIRST];entry;entry=entry.n){entry.r=true;if(entry.p)entry.p=entry.p.n=undefined;delete data[entry.i]}that[FIRST]=that[LAST]=undefined;that[SIZE]=0},"delete":function(key){var that=this,entry=getEntry(that,key);if(entry){var next=entry.n,prev=entry.p;delete that[O1][entry.i];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that[FIRST]==entry)that[FIRST]=next;if(that[LAST]==entry)that[LAST]=prev;
that[SIZE]--}return!!entry},forEach:function(callbackfn){var f=ctx(callbackfn,arguments[1],3),entry;while(entry=entry?entry.n:this[FIRST]){f(entry.v,entry.k,this);while(entry&&entry.r)entry=entry.p}},has:function(key){return!!getEntry(this,key)}};Map=getCollection(Map,MAP,{get:function(key){var entry=getEntry(this,key);return entry&&entry.v},set:function(key,value){return def(this,key===0?0:key,value)}},collectionMethods,true);Set=getCollection(Set,SET,{add:function(value){return def(this,value=value===0?0:value,value)}},collectionMethods);function defWeak(that,key,value){if(isFrozen(assertObject(key)))leakStore(that).set(key,value);else{has(key,WEAK)||hidden(key,WEAK,{});key[WEAK][that[UID]]=value}return that}function leakStore(that){return that[LEAK]||hidden(that,LEAK,new Map)[LEAK]}var weakMethods={"delete":function(key){if(!isObject(key))return false;if(isFrozen(key))return leakStore(this)["delete"](key);return has(key,WEAK)&&has(key[WEAK],this[UID])&&delete key[WEAK][this[UID]]},has:function(key){if(!isObject(key))return false;if(isFrozen(key))return leakStore(this).has(key);return has(key,WEAK)&&has(key[WEAK],this[UID])}};WeakMap=getCollection(WeakMap,WEAKMAP,{get:function(key){if(isObject(key)){if(isFrozen(key))return leakStore(this).get(key);if(has(key,WEAK))return key[WEAK][this[UID]]}},set:function(key,value){return defWeak(this,key,value)}},weakMethods,true,true);if(framework&&(new WeakMap).set(Object.freeze(tmp),7).get(tmp)!=7){forEach.call(array("delete,has,get,set"),function(key){var method=WeakMap[PROTOTYPE][key];WeakMap[PROTOTYPE][key]=function(a,b){if(isObject(a)&&isFrozen(a)){var result=leakStore(this)[key](a,b);return key=="set"?this:result}return method.call(this,a,b)}})}WeakSet=getCollection(WeakSet,WEAKSET,{add:function(value){return defWeak(this,value,true)}},weakMethods,false,true)}();!function(){function Enumerate(iterated){var keys=[],key;for(key in iterated)keys.push(key);set(this,ITER,{o:iterated,a:keys,i:0})}createIterator(Enumerate,OBJECT,function(){var iter=this[ITER],keys=iter.a,key;do{if(iter.i>=keys.length)return iterResult(1)}while(!((key=keys[iter.i++])in iter.o));return iterResult(0,key)});function wrap(fn){return function(it){assertObject(it);try{return fn.apply(undefined,arguments),true}catch(e){return false}}}function reflectGet(target,propertyKey){var receiver=arguments.length<3?target:arguments[2],desc=getOwnDescriptor(assertObject(target),propertyKey),proto;if(desc)return has(desc,"value")?desc.value:desc.get===undefined?undefined:desc.get.call(receiver);return isObject(proto=getPrototypeOf(target))?reflectGet(proto,propertyKey,receiver):undefined}function reflectSet(target,propertyKey,V){var receiver=arguments.length<4?target:arguments[3],ownDesc=getOwnDescriptor(assertObject(target),propertyKey),existingDescriptor,proto;if(!ownDesc){if(isObject(proto=getPrototypeOf(target))){return reflectSet(proto,propertyKey,V,receiver)}ownDesc=descriptor(0)}if(has(ownDesc,"value")){if(ownDesc.writable===false||!isObject(receiver))return false;existingDescriptor=getOwnDescriptor(receiver,propertyKey)||descriptor(0);existingDescriptor.value=V;return defineProperty(receiver,propertyKey,existingDescriptor),true}return ownDesc.set===undefined?false:(ownDesc.set.call(receiver,V),true)}var isExtensible=Object.isExtensible||returnIt;var reflect={apply:ctx(call,apply,3),construct:construct,defineProperty:wrap(defineProperty),deleteProperty:function(target,propertyKey){var desc=getOwnDescriptor(assertObject(target),propertyKey);return desc&&!desc.configurable?false:delete target[propertyKey]},enumerate:function(target){return new Enumerate(assertObject(target))},get:reflectGet,getOwnPropertyDescriptor:function(target,propertyKey){return getOwnDescriptor(assertObject(target),propertyKey)},getPrototypeOf:function(target){return getPrototypeOf(assertObject(target))},has:function(target,propertyKey){return propertyKey in target},isExtensible:function(target){return!!isExtensible(assertObject(target))},ownKeys:ownKeys,preventExtensions:wrap(Object.preventExtensions||returnIt),set:reflectSet};if(setPrototypeOf)reflect.setPrototypeOf=function(target,proto){return setPrototypeOf(assertObject(target),proto),true};$define(GLOBAL,{Reflect:{}});$define(STATIC,"Reflect",reflect)}();!function(){$define(PROTO,ARRAY,{includes:createArrayContains(true)});$define(PROTO,STRING,{at:createPointAt(true)});function createObjectToArray(isEntries){return function(object){var O=toObject(object),keys=getKeys(object),length=keys.length,i=0,result=Array(length),key;if(isEntries)while(length>i)result[i]=[key=keys[i++],O[key]];else while(length>i)result[i]=O[keys[i++]];return result}}$define(STATIC,OBJECT,{values:createObjectToArray(false),entries:createObjectToArray(true)});$define(STATIC,REGEXP,{escape:createReplacer(/([\\\-[\]{}()*+?.,^$|])/g,"\\$1",true)})}();!function(REFERENCE){REFERENCE_GET=getWellKnownSymbol(REFERENCE+"Get",true);var REFERENCE_SET=getWellKnownSymbol(REFERENCE+SET,true),REFERENCE_DELETE=getWellKnownSymbol(REFERENCE+"Delete",true);$define(STATIC,SYMBOL,{referenceGet:REFERENCE_GET,referenceSet:REFERENCE_SET,referenceDelete:REFERENCE_DELETE});hidden(FunctionProto,REFERENCE_GET,returnThis);function setMapMethods(Constructor){if(Constructor){var MapProto=Constructor[PROTOTYPE];hidden(MapProto,REFERENCE_GET,MapProto.get);hidden(MapProto,REFERENCE_SET,MapProto.set);hidden(MapProto,REFERENCE_DELETE,MapProto["delete"])}}setMapMethods(Map);setMapMethods(WeakMap)}("reference");!function(arrayStatics){function setArrayStatics(keys,length){forEach.call(array(keys),function(key){if(key in ArrayProto)arrayStatics[key]=ctx(call,ArrayProto[key],length)})}setArrayStatics("pop,reverse,shift,keys,values,entries",1);setArrayStatics("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3);setArrayStatics("join,slice,concat,push,splice,unshift,sort,lastIndexOf,"+"reduce,reduceRight,copyWithin,fill,turn");$define(STATIC,ARRAY,arrayStatics)}({});!function(NodeList){if(framework&&NodeList&&!(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){hidden(NodeList[PROTOTYPE],SYMBOL_ITERATOR,Iterators[ARRAY])}Iterators.NodeList=Iterators[ARRAY]}(global.NodeList)}(typeof self!="undefined"&&self.Math===Math?self:Function("return this")(),true)},{}],3:[function(require,module,exports){(function(global){!function(global){"use strict";var hasOwn=Object.prototype.hasOwnProperty;var undefined;var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";var inModule=typeof module==="object";var runtime=global.regeneratorRuntime;if(runtime){if(inModule){module.exports=runtime}return}runtime=global.regeneratorRuntime=inModule?module.exports:{};function wrap(innerFn,outerFn,self,tryLocsList){return new Generator(innerFn,outerFn,self||null,tryLocsList||[])}runtime.wrap=wrap;function tryCatch(fn,obj,arg){try{return{type:"normal",arg:fn.call(obj,arg)}}catch(err){return{type:"throw",arg:err}}}var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed";var ContinueSentinel={};function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor=GeneratorFunction;GeneratorFunction.displayName="GeneratorFunction";runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function"&&genFun.constructor;return ctor?ctor===GeneratorFunction||(ctor.displayName||ctor.name)==="GeneratorFunction":false};runtime.mark=function(genFun){genFun.__proto__=GeneratorFunctionPrototype;genFun.prototype=Object.create(Gp);return genFun};runtime.async=function(innerFn,outerFn,self,tryLocsList){return new Promise(function(resolve,reject){var generator=wrap(innerFn,outerFn,self,tryLocsList);var callNext=step.bind(generator.next);var callThrow=step.bind(generator["throw"]);function step(arg){var record=tryCatch(this,null,arg);if(record.type==="throw"){reject(record.arg);return}var info=record.arg;if(info.done){resolve(info.value)}else{Promise.resolve(info.value).then(callNext,callThrow)}}callNext()})};function Generator(innerFn,outerFn,self,tryLocsList){var generator=outerFn?Object.create(outerFn.prototype):this;var context=new Context(tryLocsList);var state=GenStateSuspendedStart;function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running")}if(state===GenStateCompleted){return doneResult()}while(true){var delegate=context.delegate;if(delegate){var record=tryCatch(delegate.iterator[method],delegate.iterator,arg);if(record.type==="throw"){context.delegate=null;method="throw";arg=record.arg;continue}method="next";arg=undefined;var info=record.arg;if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc}else{state=GenStateSuspendedYield;return info}context.delegate=null}if(method==="next"){if(state===GenStateSuspendedStart&&typeof arg!=="undefined"){throw new TypeError("attempt to send "+JSON.stringify(arg)+" to newborn generator")}if(state===GenStateSuspendedYield){context.sent=arg}else{delete context.sent}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg}if(context.dispatchException(arg)){method="next";arg=undefined}}else if(method==="return"){context.abrupt("return",arg)}state=GenStateExecuting;var record=tryCatch(innerFn,self,context);if(record.type==="normal"){state=context.done?GenStateCompleted:GenStateSuspendedYield;var info={value:record.arg,done:context.done};if(record.arg===ContinueSentinel){if(context.delegate&&method==="next"){arg=undefined}}else{return info}}else if(record.type==="throw"){state=GenStateCompleted;if(method==="next"){context.dispatchException(record.arg)}else{arg=record.arg}}}}generator.next=invoke.bind(generator,"next");generator["throw"]=invoke.bind(generator,"throw");generator["return"]=invoke.bind(generator,"return");return generator}Gp[iteratorSymbol]=function(){return this};Gp.toString=function(){return"[object Generator]"};function pushTryEntry(locs){var entry={tryLoc:locs[0]};if(1 in locs){entry.catchLoc=locs[1]}if(2 in locs){entry.finallyLoc=locs[2];entry.afterLoc=locs[3]}this.tryEntries.push(entry)}function resetTryEntry(entry){var record=entry.completion||{};record.type="normal";delete record.arg;entry.completion=record}function Context(tryLocsList){this.tryEntries=[{tryLoc:"root"}];tryLocsList.forEach(pushTryEntry,this);this.reset()}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key)}keys.reverse();return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next}}next.done=true;return next}};function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable)}if(typeof iterable.next==="function"){return iterable}if(!isNaN(iterable.length)){var i=-1,next=function next(){while(++i<iterable.length){if(hasOwn.call(iterable,i)){next.value=iterable[i];next.done=false;return next}}next.value=undefined;next.done=true;return next};return next.next=next}}return{next:doneResult}}runtime.values=values;function doneResult(){return{value:undefined,done:true}}Context.prototype={constructor:Context,reset:function(){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);for(var tempIndex=0,tempName;hasOwn.call(this,tempName="t"+tempIndex)||tempIndex<20;++tempIndex){this[tempName]=null}},stop:function(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg}return this.rval},dispatchException:function(exception){if(this.done){throw exception}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){return handle("end")}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else{throw new Error("try statement without catch or finally")}}}},_findFinallyEntry:function(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&(entry.finallyLoc===finallyLoc||this.prev<entry.finallyLoc)){return entry}}},abrupt:function(type,arg){var entry=this._findFinallyEntry();var record=entry?entry.completion:{};record.type=type;record.arg=arg;if(entry){this.next=entry.finallyLoc}else{this.complete(record)}return ContinueSentinel},complete:function(record,afterLoc){if(record.type==="throw"){throw record.arg}if(record.type==="break"||record.type==="continue"){this.next=record.arg}else if(record.type==="return"){this.rval=record.arg;this.next="end"}else if(record.type==="normal"&&afterLoc){this.next=afterLoc}return ContinueSentinel},finish:function(finallyLoc){var entry=this._findFinallyEntry(finallyLoc);return this.complete(entry.completion,entry.afterLoc)},"catch":function(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;resetTryEntry(entry)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel}}}(typeof global==="object"?global:typeof window==="object"?window:this)}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}]},{},[1]);
},{}],2:[function(require,module,exports){
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
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
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
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
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

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

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
          if (err) return done(err);
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

if (typeof module !== 'undefined' && typeof exports === 'object') {
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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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
   * @param {Element} el
   * @returns {EventStream}
   */
  touchstart: function touchstart(el) {
    return Bacon.fromEventTarget(el, "touchstart");
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchend: function touchend(el) {
    return Bacon.fromEventTarget(el, "touchend");
  },

  /**
   * @param {Element} el
   * @returns {EventStream}
   */
  touchmove: function touchmove(el) {
    return Bacon.fromEventTarget(el, "touchmove");
  },

  /**
   * @param {Element} el
   * @param {Bacon.Bus} [stopBus = new Bacon.Bus()]
   * @returns {EventStream}
   */
  swipe: function swipe(el) {
    var stopBus = arguments[1] === undefined ? new Bacon.Bus() : arguments[1];
    var start = this.touchstart(el).doAction(".preventDefault");
    var move = this.touchmove(el).doAction(".preventDefault").throttle(100);
    var end = this.touchend(el).doAction(".preventDefault");

    stopBus.plug(end);

    return start.flatMap(function (start) {
      var initialValue = {
        init: start.changedTouches[0].clientX,
        curt: 0
      };
      return move.takeUntil(stopBus).scan(initialValue, function (acc, move) {
        acc.curt = move.changedTouches[0].clientX;
        return acc;
      }).skip(1);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeLeft: function swipeLeft() {
    var el = arguments[0] === undefined ? document.body : arguments[0];
    var stopBus = new Bacon.Bus();

    return this.swipe(el, stopBus).filter(function (moves) {
      var init = moves.init;
      var curt = moves.curt;
      var delta = curt - init;
      return delta < -10 && stopBus.push(true);
    });
  },

  /**
   * @param {Element} [el = document.body]
   * @returns {EventStream}
   */
  swipeRight: function swipeRight() {
    var el = arguments[0] === undefined ? document.body : arguments[0];
    var stopBus = new Bacon.Bus();

    return this.swipe(el, stopBus).filter(function (moves) {
      var init = moves.init;
      var curt = moves.curt;
      var delta = curt - init;
      return delta > 10 && stopBus.push(true);
    });
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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * if using a feature that requires a browser-polyfill
 * @see https://babeljs.io/docs/usage/polyfill/
 */
require("babel/browser-polyfill");
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

  var responsive = Responsive({
    width: width,
    height: height,
    target: scalerEl
  });
  responsive.scaleBus.plug(control.resize());

  /**
   * Paging control
   */
  var paging = Paging({
    startPage: util.getPageNumberFromHash() || 1,
    endPage: slides.length,
    slideElements: slides
  });

  paging.nextBus.plug(control.keydown("right").throttle(100));
  paging.prevBus.plug(control.keydown("left").throttle(100));

  paging.nextBus.plug(control.swipeLeft());
  paging.prevBus.plug(control.swipeRight());

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
    jump: paging.moveBus,
    ratio: responsive.currentRatio
  };
}

},{"./control":5,"./fullscreen":6,"./markdown":8,"./paging":9,"./query":10,"./responsive":11,"./util":12,"babel/browser-polyfill":1,"baconjs":2}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

  var currentRatio = Bacon.combineWith(Math.min, hRatio, vRatio).toProperty();

  currentRatio.onValue(scale);

  return {
    scaleBus: bus,
    currentRatio: currentRatio
  };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwvYnJvd3Nlci1wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9iYWNvbmpzL2Rpc3QvQmFjb24uanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9tYXJrZWQvbGliL21hcmtlZC5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvY29udHJvbC5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvZnVsbHNjcmVlbi5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvaW5kZXguanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL21hcmtkb3duLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9wYWdpbmcuanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3F1ZXJ5LmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9yZXNwb25zaXZlLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbG1HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUcsQ0FBQyxDQUFDO0dBQ2hDOzs7OztBQUtELHVCQUFxQixFQUFBLGlDQUFHO0FBQ3RCLFdBQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDMUQ7Ozs7OztBQU1ELG1CQUFpQixFQUFBLDJCQUFDLFFBQVEsRUFBRTtBQUMxQixRQUFJLGFBQWEsWUFBQSxDQUFDO0FBQ2xCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRixRQUFJLFFBQVEsR0FBRyxVQUFDLE1BQU07YUFBSyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUFBLENBQUM7O0FBRXpELFFBQUcsUUFBUSxjQUFZLFFBQVEsQ0FBRyxFQUFFO0FBQ2xDLG1CQUFhLGdCQUFjLFFBQVEsQUFBRSxDQUFDO0tBQ3ZDLE1BQU0sSUFBRyxRQUFRLFdBQVMsUUFBUSxDQUFHLEVBQUU7QUFDdEMsbUJBQWEsYUFBVyxRQUFRLEFBQUUsQ0FBQztLQUNwQyxNQUFNLElBQUcsUUFBUSxVQUFRLFFBQVEsQ0FBRyxFQUFFO0FBQ3JDLG1CQUFhLFlBQVUsUUFBUSxBQUFFLENBQUM7S0FDbkMsTUFBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUM1QixtQkFBYSxHQUFHLFFBQVEsQ0FBQztLQUMxQjs7QUFFRCxXQUFPLGFBQWEsQ0FBQztHQUN0QjtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXtcInVzZSBzdHJpY3RcIjtpZihnbG9iYWwuX2JhYmVsUG9seWZpbGwpe3Rocm93IG5ldyBFcnJvcihcIm9ubHkgb25lIGluc3RhbmNlIG9mIGJhYmVsL3BvbHlmaWxsIGlzIGFsbG93ZWRcIil9Z2xvYmFsLl9iYWJlbFBvbHlmaWxsPXRydWU7cmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtyZXF1aXJlKFwicmVnZW5lcmF0b3ItYmFiZWwvcnVudGltZVwiKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIj9nbG9iYWw6dHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCI/d2luZG93Ont9KX0se1wiY29yZS1qcy9zaGltXCI6MixcInJlZ2VuZXJhdG9yLWJhYmVsL3J1bnRpbWVcIjozfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7IWZ1bmN0aW9uKGdsb2JhbCxmcmFtZXdvcmssdW5kZWZpbmVkKXtcInVzZSBzdHJpY3RcIjt2YXIgT0JKRUNUPVwiT2JqZWN0XCIsRlVOQ1RJT049XCJGdW5jdGlvblwiLEFSUkFZPVwiQXJyYXlcIixTVFJJTkc9XCJTdHJpbmdcIixOVU1CRVI9XCJOdW1iZXJcIixSRUdFWFA9XCJSZWdFeHBcIixEQVRFPVwiRGF0ZVwiLE1BUD1cIk1hcFwiLFNFVD1cIlNldFwiLFdFQUtNQVA9XCJXZWFrTWFwXCIsV0VBS1NFVD1cIldlYWtTZXRcIixTWU1CT0w9XCJTeW1ib2xcIixQUk9NSVNFPVwiUHJvbWlzZVwiLE1BVEg9XCJNYXRoXCIsQVJHVU1FTlRTPVwiQXJndW1lbnRzXCIsUFJPVE9UWVBFPVwicHJvdG90eXBlXCIsQ09OU1RSVUNUT1I9XCJjb25zdHJ1Y3RvclwiLFRPX1NUUklORz1cInRvU3RyaW5nXCIsVE9fU1RSSU5HX1RBRz1UT19TVFJJTkcrXCJUYWdcIixUT19MT0NBTEU9XCJ0b0xvY2FsZVN0cmluZ1wiLEhBU19PV049XCJoYXNPd25Qcm9wZXJ0eVwiLEZPUl9FQUNIPVwiZm9yRWFjaFwiLElURVJBVE9SPVwiaXRlcmF0b3JcIixGRl9JVEVSQVRPUj1cIkBAXCIrSVRFUkFUT1IsUFJPQ0VTUz1cInByb2Nlc3NcIixDUkVBVEVfRUxFTUVOVD1cImNyZWF0ZUVsZW1lbnRcIixGdW5jdGlvbj1nbG9iYWxbRlVOQ1RJT05dLE9iamVjdD1nbG9iYWxbT0JKRUNUXSxBcnJheT1nbG9iYWxbQVJSQVldLFN0cmluZz1nbG9iYWxbU1RSSU5HXSxOdW1iZXI9Z2xvYmFsW05VTUJFUl0sUmVnRXhwPWdsb2JhbFtSRUdFWFBdLERhdGU9Z2xvYmFsW0RBVEVdLE1hcD1nbG9iYWxbTUFQXSxTZXQ9Z2xvYmFsW1NFVF0sV2Vha01hcD1nbG9iYWxbV0VBS01BUF0sV2Vha1NldD1nbG9iYWxbV0VBS1NFVF0sU3ltYm9sPWdsb2JhbFtTWU1CT0xdLE1hdGg9Z2xvYmFsW01BVEhdLFR5cGVFcnJvcj1nbG9iYWwuVHlwZUVycm9yLFJhbmdlRXJyb3I9Z2xvYmFsLlJhbmdlRXJyb3Isc2V0VGltZW91dD1nbG9iYWwuc2V0VGltZW91dCxzZXRJbW1lZGlhdGU9Z2xvYmFsLnNldEltbWVkaWF0ZSxjbGVhckltbWVkaWF0ZT1nbG9iYWwuY2xlYXJJbW1lZGlhdGUscGFyc2VJbnQ9Z2xvYmFsLnBhcnNlSW50LGlzRmluaXRlPWdsb2JhbC5pc0Zpbml0ZSxwcm9jZXNzPWdsb2JhbFtQUk9DRVNTXSxuZXh0VGljaz1wcm9jZXNzJiZwcm9jZXNzLm5leHRUaWNrLGRvY3VtZW50PWdsb2JhbC5kb2N1bWVudCxodG1sPWRvY3VtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbmF2aWdhdG9yPWdsb2JhbC5uYXZpZ2F0b3IsZGVmaW5lPWdsb2JhbC5kZWZpbmUsQXJyYXlQcm90bz1BcnJheVtQUk9UT1RZUEVdLE9iamVjdFByb3RvPU9iamVjdFtQUk9UT1RZUEVdLEZ1bmN0aW9uUHJvdG89RnVuY3Rpb25bUFJPVE9UWVBFXSxJbmZpbml0eT0xLzAsRE9UPVwiLlwiLENPTlNPTEVfTUVUSE9EUz1cImFzc2VydCxjbGVhcixjb3VudCxkZWJ1ZyxkaXIsZGlyeG1sLGVycm9yLGV4Y2VwdGlvbixcIitcImdyb3VwLGdyb3VwQ29sbGFwc2VkLGdyb3VwRW5kLGluZm8saXNJbmRlcGVuZGVudGx5Q29tcG9zZWQsbG9nLFwiK1wibWFya1RpbWVsaW5lLHByb2ZpbGUscHJvZmlsZUVuZCx0YWJsZSx0aW1lLHRpbWVFbmQsdGltZWxpbmUsXCIrXCJ0aW1lbGluZUVuZCx0aW1lU3RhbXAsdHJhY2Usd2FyblwiO2Z1bmN0aW9uIGlzT2JqZWN0KGl0KXtyZXR1cm4gaXQhPT1udWxsJiYodHlwZW9mIGl0PT1cIm9iamVjdFwifHx0eXBlb2YgaXQ9PVwiZnVuY3Rpb25cIil9ZnVuY3Rpb24gaXNGdW5jdGlvbihpdCl7cmV0dXJuIHR5cGVvZiBpdD09XCJmdW5jdGlvblwifXZhciBpc05hdGl2ZT1jdHgoLy4vLnRlc3QsL1xcW25hdGl2ZSBjb2RlXFxdXFxzKlxcfVxccyokLywxKTt2YXIgdG9TdHJpbmc9T2JqZWN0UHJvdG9bVE9fU1RSSU5HXTtmdW5jdGlvbiBzZXRUb1N0cmluZ1RhZyhpdCx0YWcsc3RhdCl7aWYoaXQmJiFoYXMoaXQ9c3RhdD9pdDppdFtQUk9UT1RZUEVdLFNZTUJPTF9UQUcpKWhpZGRlbihpdCxTWU1CT0xfVEFHLHRhZyl9ZnVuY3Rpb24gY29mKGl0KXtyZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwtMSl9ZnVuY3Rpb24gY2xhc3NvZihpdCl7dmFyIE8sVDtyZXR1cm4gaXQ9PXVuZGVmaW5lZD9pdD09PXVuZGVmaW5lZD9cIlVuZGVmaW5lZFwiOlwiTnVsbFwiOnR5cGVvZihUPShPPU9iamVjdChpdCkpW1NZTUJPTF9UQUddKT09XCJzdHJpbmdcIj9UOmNvZihPKX12YXIgY2FsbD1GdW5jdGlvblByb3RvLmNhbGwsYXBwbHk9RnVuY3Rpb25Qcm90by5hcHBseSxSRUZFUkVOQ0VfR0VUO2Z1bmN0aW9uIHBhcnQoKXt2YXIgZm49YXNzZXJ0RnVuY3Rpb24odGhpcyksbGVuZ3RoPWFyZ3VtZW50cy5sZW5ndGgsYXJncz1BcnJheShsZW5ndGgpLGk9MCxfPXBhdGguXyxob2xkZXI9ZmFsc2U7d2hpbGUobGVuZ3RoPmkpaWYoKGFyZ3NbaV09YXJndW1lbnRzW2krK10pPT09Xylob2xkZXI9dHJ1ZTtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdGhhdD10aGlzLF9sZW5ndGg9YXJndW1lbnRzLmxlbmd0aCxpPTAsaj0wLF9hcmdzO2lmKCFob2xkZXImJiFfbGVuZ3RoKXJldHVybiBpbnZva2UoZm4sYXJncyx0aGF0KTtfYXJncz1hcmdzLnNsaWNlKCk7aWYoaG9sZGVyKWZvcig7bGVuZ3RoPmk7aSsrKWlmKF9hcmdzW2ldPT09XylfYXJnc1tpXT1hcmd1bWVudHNbaisrXTt3aGlsZShfbGVuZ3RoPmopX2FyZ3MucHVzaChhcmd1bWVudHNbaisrXSk7cmV0dXJuIGludm9rZShmbixfYXJncyx0aGF0KX19ZnVuY3Rpb24gY3R4KGZuLHRoYXQsbGVuZ3RoKXthc3NlcnRGdW5jdGlvbihmbik7aWYofmxlbmd0aCYmdGhhdD09PXVuZGVmaW5lZClyZXR1cm4gZm47c3dpdGNoKGxlbmd0aCl7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihhKXtyZXR1cm4gZm4uY2FsbCh0aGF0LGEpfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKGEsYil7cmV0dXJuIGZuLmNhbGwodGhhdCxhLGIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gZm4uY2FsbCh0aGF0LGEsYixjKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZuLmFwcGx5KHRoYXQsYXJndW1lbnRzKX19ZnVuY3Rpb24gaW52b2tlKGZuLGFyZ3MsdGhhdCl7dmFyIHVuPXRoYXQ9PT11bmRlZmluZWQ7c3dpdGNoKGFyZ3MubGVuZ3RofDApe2Nhc2UgMDpyZXR1cm4gdW4/Zm4oKTpmbi5jYWxsKHRoYXQpO2Nhc2UgMTpyZXR1cm4gdW4/Zm4oYXJnc1swXSk6Zm4uY2FsbCh0aGF0LGFyZ3NbMF0pO2Nhc2UgMjpyZXR1cm4gdW4/Zm4oYXJnc1swXSxhcmdzWzFdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSxhcmdzWzFdKTtjYXNlIDM6cmV0dXJuIHVuP2ZuKGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0pO2Nhc2UgNDpyZXR1cm4gdW4/Zm4oYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0sYXJnc1szXSk6Zm4uY2FsbCh0aGF0LGFyZ3NbMF0sYXJnc1sxXSxhcmdzWzJdLGFyZ3NbM10pO2Nhc2UgNTpyZXR1cm4gdW4/Zm4oYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0sYXJnc1szXSxhcmdzWzRdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0sYXJnc1szXSxhcmdzWzRdKX1yZXR1cm4gZm4uYXBwbHkodGhhdCxhcmdzKX1mdW5jdGlvbiBjb25zdHJ1Y3QodGFyZ2V0LGFyZ3VtZW50c0xpc3Qpe3ZhciBwcm90bz1hc3NlcnRGdW5jdGlvbihhcmd1bWVudHMubGVuZ3RoPDM/dGFyZ2V0OmFyZ3VtZW50c1syXSlbUFJPVE9UWVBFXSxpbnN0YW5jZT1jcmVhdGUoaXNPYmplY3QocHJvdG8pP3Byb3RvOk9iamVjdFByb3RvKSxyZXN1bHQ9YXBwbHkuY2FsbCh0YXJnZXQsaW5zdGFuY2UsYXJndW1lbnRzTGlzdCk7cmV0dXJuIGlzT2JqZWN0KHJlc3VsdCk/cmVzdWx0Omluc3RhbmNlfXZhciBjcmVhdGU9T2JqZWN0LmNyZWF0ZSxnZXRQcm90b3R5cGVPZj1PYmplY3QuZ2V0UHJvdG90eXBlT2Ysc2V0UHJvdG90eXBlT2Y9T2JqZWN0LnNldFByb3RvdHlwZU9mLGRlZmluZVByb3BlcnR5PU9iamVjdC5kZWZpbmVQcm9wZXJ0eSxkZWZpbmVQcm9wZXJ0aWVzPU9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLGdldE93bkRlc2NyaXB0b3I9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixnZXRLZXlzPU9iamVjdC5rZXlzLGdldE5hbWVzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLGdldFN5bWJvbHM9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxpc0Zyb3plbj1PYmplY3QuaXNGcm96ZW4saGFzPWN0eChjYWxsLE9iamVjdFByb3RvW0hBU19PV05dLDIpLEVTNU9iamVjdD1PYmplY3QsRGljdDtmdW5jdGlvbiB0b09iamVjdChpdCl7cmV0dXJuIEVTNU9iamVjdChhc3NlcnREZWZpbmVkKGl0KSl9ZnVuY3Rpb24gcmV0dXJuSXQoaXQpe3JldHVybiBpdH1mdW5jdGlvbiByZXR1cm5UaGlzKCl7cmV0dXJuIHRoaXN9ZnVuY3Rpb24gZ2V0KG9iamVjdCxrZXkpe2lmKGhhcyhvYmplY3Qsa2V5KSlyZXR1cm4gb2JqZWN0W2tleV19ZnVuY3Rpb24gb3duS2V5cyhpdCl7YXNzZXJ0T2JqZWN0KGl0KTtyZXR1cm4gZ2V0U3ltYm9scz9nZXROYW1lcyhpdCkuY29uY2F0KGdldFN5bWJvbHMoaXQpKTpnZXROYW1lcyhpdCl9dmFyIGFzc2lnbj1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0YXJnZXQsc291cmNlKXt2YXIgVD1PYmplY3QoYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKSxsPWFyZ3VtZW50cy5sZW5ndGgsaT0xO3doaWxlKGw+aSl7dmFyIFM9RVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKSxrZXlzPWdldEtleXMoUyksbGVuZ3RoPWtleXMubGVuZ3RoLGo9MCxrZXk7d2hpbGUobGVuZ3RoPmopVFtrZXk9a2V5c1tqKytdXT1TW2tleV19cmV0dXJuIFR9O2Z1bmN0aW9uIGtleU9mKG9iamVjdCxlbCl7dmFyIE89dG9PYmplY3Qob2JqZWN0KSxrZXlzPWdldEtleXMoTyksbGVuZ3RoPWtleXMubGVuZ3RoLGluZGV4PTAsa2V5O3doaWxlKGxlbmd0aD5pbmRleClpZihPW2tleT1rZXlzW2luZGV4KytdXT09PWVsKXJldHVybiBrZXl9ZnVuY3Rpb24gYXJyYXkoaXQpe3JldHVybiBTdHJpbmcoaXQpLnNwbGl0KFwiLFwiKX12YXIgcHVzaD1BcnJheVByb3RvLnB1c2gsdW5zaGlmdD1BcnJheVByb3RvLnVuc2hpZnQsc2xpY2U9QXJyYXlQcm90by5zbGljZSxzcGxpY2U9QXJyYXlQcm90by5zcGxpY2UsaW5kZXhPZj1BcnJheVByb3RvLmluZGV4T2YsZm9yRWFjaD1BcnJheVByb3RvW0ZPUl9FQUNIXTtmdW5jdGlvbiBjcmVhdGVBcnJheU1ldGhvZCh0eXBlKXt2YXIgaXNNYXA9dHlwZT09MSxpc0ZpbHRlcj10eXBlPT0yLGlzU29tZT10eXBlPT0zLGlzRXZlcnk9dHlwZT09NCxpc0ZpbmRJbmRleD10eXBlPT02LG5vaG9sZXM9dHlwZT09NXx8aXNGaW5kSW5kZXg7cmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrZm4pe3ZhciBPPU9iamVjdChhc3NlcnREZWZpbmVkKHRoaXMpKSx0aGF0PWFyZ3VtZW50c1sxXSxzZWxmPUVTNU9iamVjdChPKSxmPWN0eChjYWxsYmFja2ZuLHRoYXQsMyksbGVuZ3RoPXRvTGVuZ3RoKHNlbGYubGVuZ3RoKSxpbmRleD0wLHJlc3VsdD1pc01hcD9BcnJheShsZW5ndGgpOmlzRmlsdGVyP1tdOnVuZGVmaW5lZCx2YWwscmVzO2Zvcig7bGVuZ3RoPmluZGV4O2luZGV4KyspaWYobm9ob2xlc3x8aW5kZXggaW4gc2VsZil7dmFsPXNlbGZbaW5kZXhdO3Jlcz1mKHZhbCxpbmRleCxPKTtpZih0eXBlKXtpZihpc01hcClyZXN1bHRbaW5kZXhdPXJlcztlbHNlIGlmKHJlcylzd2l0Y2godHlwZSl7Y2FzZSAzOnJldHVybiB0cnVlO2Nhc2UgNTpyZXR1cm4gdmFsO2Nhc2UgNjpyZXR1cm4gaW5kZXg7Y2FzZSAyOnJlc3VsdC5wdXNoKHZhbCl9ZWxzZSBpZihpc0V2ZXJ5KXJldHVybiBmYWxzZX19cmV0dXJuIGlzRmluZEluZGV4Py0xOmlzU29tZXx8aXNFdmVyeT9pc0V2ZXJ5OnJlc3VsdH19ZnVuY3Rpb24gY3JlYXRlQXJyYXlDb250YWlucyhpc0NvbnRhaW5zKXtyZXR1cm4gZnVuY3Rpb24oZWwpe3ZhciBPPXRvT2JqZWN0KHRoaXMpLGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCksaW5kZXg9dG9JbmRleChhcmd1bWVudHNbMV0sbGVuZ3RoKTtpZihpc0NvbnRhaW5zJiZlbCE9ZWwpe2Zvcig7bGVuZ3RoPmluZGV4O2luZGV4KyspaWYoc2FtZU5hTihPW2luZGV4XSkpcmV0dXJuIGlzQ29udGFpbnN8fGluZGV4fWVsc2UgZm9yKDtsZW5ndGg+aW5kZXg7aW5kZXgrKylpZihpc0NvbnRhaW5zfHxpbmRleCBpbiBPKXtpZihPW2luZGV4XT09PWVsKXJldHVybiBpc0NvbnRhaW5zfHxpbmRleH1yZXR1cm4haXNDb250YWlucyYmLTF9fWZ1bmN0aW9uIGdlbmVyaWMoQSxCKXtyZXR1cm4gdHlwZW9mIEE9PVwiZnVuY3Rpb25cIj9BOkJ9dmFyIE1BWF9TQUZFX0lOVEVHRVI9OTAwNzE5OTI1NDc0MDk5MSxwb3c9TWF0aC5wb3csYWJzPU1hdGguYWJzLGNlaWw9TWF0aC5jZWlsLGZsb29yPU1hdGguZmxvb3IsbWF4PU1hdGgubWF4LG1pbj1NYXRoLm1pbixyYW5kb209TWF0aC5yYW5kb20sdHJ1bmM9TWF0aC50cnVuY3x8ZnVuY3Rpb24oaXQpe3JldHVybihpdD4wP2Zsb29yOmNlaWwpKGl0KX07ZnVuY3Rpb24gc2FtZU5hTihudW1iZXIpe3JldHVybiBudW1iZXIhPW51bWJlcn1mdW5jdGlvbiB0b0ludGVnZXIoaXQpe3JldHVybiBpc05hTihpdCk/MDp0cnVuYyhpdCl9ZnVuY3Rpb24gdG9MZW5ndGgoaXQpe3JldHVybiBpdD4wP21pbih0b0ludGVnZXIoaXQpLE1BWF9TQUZFX0lOVEVHRVIpOjB9ZnVuY3Rpb24gdG9JbmRleChpbmRleCxsZW5ndGgpe3ZhciBpbmRleD10b0ludGVnZXIoaW5kZXgpO3JldHVybiBpbmRleDwwP21heChpbmRleCtsZW5ndGgsMCk6bWluKGluZGV4LGxlbmd0aCl9ZnVuY3Rpb24gbHoobnVtKXtyZXR1cm4gbnVtPjk/bnVtOlwiMFwiK251bX1mdW5jdGlvbiBjcmVhdGVSZXBsYWNlcihyZWdFeHAscmVwbGFjZSxpc1N0YXRpYyl7dmFyIHJlcGxhY2VyPWlzT2JqZWN0KHJlcGxhY2UpP2Z1bmN0aW9uKHBhcnQpe3JldHVybiByZXBsYWNlW3BhcnRdfTpyZXBsYWNlO3JldHVybiBmdW5jdGlvbihpdCl7cmV0dXJuIFN0cmluZyhpc1N0YXRpYz9pdDp0aGlzKS5yZXBsYWNlKHJlZ0V4cCxyZXBsYWNlcil9fWZ1bmN0aW9uIGNyZWF0ZVBvaW50QXQodG9TdHJpbmcpe3JldHVybiBmdW5jdGlvbihwb3Mpe3ZhciBzPVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxpPXRvSW50ZWdlcihwb3MpLGw9cy5sZW5ndGgsYSxiO2lmKGk8MHx8aT49bClyZXR1cm4gdG9TdHJpbmc/XCJcIjp1bmRlZmluZWQ7YT1zLmNoYXJDb2RlQXQoaSk7cmV0dXJuIGE8NTUyOTZ8fGE+NTYzMTl8fGkrMT09PWx8fChiPXMuY2hhckNvZGVBdChpKzEpKTw1NjMyMHx8Yj41NzM0Mz90b1N0cmluZz9zLmNoYXJBdChpKTphOnRvU3RyaW5nP3Muc2xpY2UoaSxpKzIpOihhLTU1Mjk2PDwxMCkrKGItNTYzMjApKzY1NTM2fX12YXIgUkVEVUNFX0VSUk9SPVwiUmVkdWNlIG9mIGVtcHR5IG9iamVjdCB3aXRoIG5vIGluaXRpYWwgdmFsdWVcIjtmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLG1zZzEsbXNnMil7aWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMj9tc2cxK21zZzI6bXNnMSl9ZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7aWYoaXQ9PXVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWRcIik7cmV0dXJuIGl0fWZ1bmN0aW9uIGFzc2VydEZ1bmN0aW9uKGl0KXthc3NlcnQoaXNGdW5jdGlvbihpdCksaXQsXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRPYmplY3QoaXQpe2Fzc2VydChpc09iamVjdChpdCksaXQsXCIgaXMgbm90IGFuIG9iamVjdCFcIik7cmV0dXJuIGl0fWZ1bmN0aW9uIGFzc2VydEluc3RhbmNlKGl0LENvbnN0cnVjdG9yLG5hbWUpe2Fzc2VydChpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLG5hbWUsXCI6IHVzZSB0aGUgJ25ldycgb3BlcmF0b3IhXCIpfWZ1bmN0aW9uIGRlc2NyaXB0b3IoYml0bWFwLHZhbHVlKXtyZXR1cm57ZW51bWVyYWJsZTohKGJpdG1hcCYxKSxjb25maWd1cmFibGU6IShiaXRtYXAmMiksd3JpdGFibGU6IShiaXRtYXAmNCksdmFsdWU6dmFsdWV9fWZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3Qsa2V5LHZhbHVlKXtvYmplY3Rba2V5XT12YWx1ZTtyZXR1cm4gb2JqZWN0fWZ1bmN0aW9uIGNyZWF0ZURlZmluZXIoYml0bWFwKXtyZXR1cm4gREVTQz9mdW5jdGlvbihvYmplY3Qsa2V5LHZhbHVlKXtyZXR1cm4gZGVmaW5lUHJvcGVydHkob2JqZWN0LGtleSxkZXNjcmlwdG9yKGJpdG1hcCx2YWx1ZSkpfTpzaW1wbGVTZXR9ZnVuY3Rpb24gdWlkKGtleSl7cmV0dXJuIFNZTUJPTCtcIihcIitrZXkrXCIpX1wiKygrK3NpZCtyYW5kb20oKSlbVE9fU1RSSU5HXSgzNil9ZnVuY3Rpb24gZ2V0V2VsbEtub3duU3ltYm9sKG5hbWUsc2V0dGVyKXtyZXR1cm4gU3ltYm9sJiZTeW1ib2xbbmFtZV18fChzZXR0ZXI/U3ltYm9sOnNhZmVTeW1ib2wpKFNZTUJPTCtET1QrbmFtZSl9dmFyIERFU0M9ISFmdW5jdGlvbigpe3RyeXtyZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiAyfX0pLmE9PTJ9Y2F0Y2goZSl7fX0oKSxzaWQ9MCxoaWRkZW49Y3JlYXRlRGVmaW5lcigxKSxzZXQ9U3ltYm9sP3NpbXBsZVNldDpoaWRkZW4sc2FmZVN5bWJvbD1TeW1ib2x8fHVpZDtmdW5jdGlvbiBhc3NpZ25IaWRkZW4odGFyZ2V0LHNyYyl7Zm9yKHZhciBrZXkgaW4gc3JjKWhpZGRlbih0YXJnZXQsa2V5LHNyY1trZXldKTtyZXR1cm4gdGFyZ2V0fXZhciBTWU1CT0xfVU5TQ09QQUJMRVM9Z2V0V2VsbEtub3duU3ltYm9sKFwidW5zY29wYWJsZXNcIiksQXJyYXlVbnNjb3BhYmxlcz1BcnJheVByb3RvW1NZTUJPTF9VTlNDT1BBQkxFU118fHt9LFNZTUJPTF9TUEVDSUVTPWdldFdlbGxLbm93blN5bWJvbChcInNwZWNpZXNcIik7ZnVuY3Rpb24gc2V0U3BlY2llcyhDKXtpZihmcmFtZXdvcmt8fCFpc05hdGl2ZShDKSlkZWZpbmVQcm9wZXJ0eShDLFNZTUJPTF9TUEVDSUVTLHtjb25maWd1cmFibGU6dHJ1ZSxnZXQ6cmV0dXJuVGhpc30pfXZhciBTWU1CT0xfSVRFUkFUT1I9Z2V0V2VsbEtub3duU3ltYm9sKElURVJBVE9SKSxTWU1CT0xfVEFHPWdldFdlbGxLbm93blN5bWJvbChUT19TVFJJTkdfVEFHKSxTVVBQT1JUX0ZGX0lURVI9RkZfSVRFUkFUT1IgaW4gQXJyYXlQcm90byxJVEVSPXNhZmVTeW1ib2woXCJpdGVyXCIpLEtFWT0xLFZBTFVFPTIsSXRlcmF0b3JzPXt9LEl0ZXJhdG9yUHJvdG90eXBlPXt9LE5BVElWRV9JVEVSQVRPUlM9U1lNQk9MX0lURVJBVE9SIGluIEFycmF5UHJvdG8sQlVHR1lfSVRFUkFUT1JTPVwia2V5c1wiaW4gQXJyYXlQcm90byYmIShcIm5leHRcImluW10ua2V5cygpKTtzZXRJdGVyYXRvcihJdGVyYXRvclByb3RvdHlwZSxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRJdGVyYXRvcihPLHZhbHVlKXtoaWRkZW4oTyxTWU1CT0xfSVRFUkFUT1IsdmFsdWUpO1NVUFBPUlRfRkZfSVRFUiYmaGlkZGVuKE8sRkZfSVRFUkFUT1IsdmFsdWUpfWZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKENvbnN0cnVjdG9yLE5BTUUsbmV4dCxwcm90byl7Q29uc3RydWN0b3JbUFJPVE9UWVBFXT1jcmVhdGUocHJvdG98fEl0ZXJhdG9yUHJvdG90eXBlLHtuZXh0OmRlc2NyaXB0b3IoMSxuZXh0KX0pO3NldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLE5BTUUrXCIgSXRlcmF0b3JcIil9ZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3IoQ29uc3RydWN0b3IsTkFNRSx2YWx1ZSxERUZBVUxUKXt2YXIgcHJvdG89Q29uc3RydWN0b3JbUFJPVE9UWVBFXSxpdGVyPWdldChwcm90byxTWU1CT0xfSVRFUkFUT1IpfHxnZXQocHJvdG8sRkZfSVRFUkFUT1IpfHxERUZBVUxUJiZnZXQocHJvdG8sREVGQVVMVCl8fHZhbHVlO2lmKGZyYW1ld29yayl7c2V0SXRlcmF0b3IocHJvdG8saXRlcik7aWYoaXRlciE9PXZhbHVlKXt2YXIgaXRlclByb3RvPWdldFByb3RvdHlwZU9mKGl0ZXIuY2FsbChuZXcgQ29uc3RydWN0b3IpKTtzZXRUb1N0cmluZ1RhZyhpdGVyUHJvdG8sTkFNRStcIiBJdGVyYXRvclwiLHRydWUpO2hhcyhwcm90byxGRl9JVEVSQVRPUikmJnNldEl0ZXJhdG9yKGl0ZXJQcm90byxyZXR1cm5UaGlzKX19SXRlcmF0b3JzW05BTUVdPWl0ZXI7SXRlcmF0b3JzW05BTUUrXCIgSXRlcmF0b3JcIl09cmV0dXJuVGhpcztyZXR1cm4gaXRlcn1mdW5jdGlvbiBkZWZpbmVTdGRJdGVyYXRvcnMoQmFzZSxOQU1FLENvbnN0cnVjdG9yLG5leHQsREVGQVVMVCxJU19TRVQpe2Z1bmN0aW9uIGNyZWF0ZUl0ZXIoa2luZCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLGtpbmQpfX1jcmVhdGVJdGVyYXRvcihDb25zdHJ1Y3RvcixOQU1FLG5leHQpO3ZhciBlbnRyaWVzPWNyZWF0ZUl0ZXIoS0VZK1ZBTFVFKSx2YWx1ZXM9Y3JlYXRlSXRlcihWQUxVRSk7aWYoREVGQVVMVD09VkFMVUUpdmFsdWVzPWRlZmluZUl0ZXJhdG9yKEJhc2UsTkFNRSx2YWx1ZXMsXCJ2YWx1ZXNcIik7ZWxzZSBlbnRyaWVzPWRlZmluZUl0ZXJhdG9yKEJhc2UsTkFNRSxlbnRyaWVzLFwiZW50cmllc1wiKTtpZihERUZBVUxUKXskZGVmaW5lKFBST1RPK0ZPUkNFRCpCVUdHWV9JVEVSQVRPUlMsTkFNRSx7ZW50cmllczplbnRyaWVzLGtleXM6SVNfU0VUP3ZhbHVlczpjcmVhdGVJdGVyKEtFWSksdmFsdWVzOnZhbHVlc30pfX1mdW5jdGlvbiBpdGVyUmVzdWx0KGRvbmUsdmFsdWUpe3JldHVybnt2YWx1ZTp2YWx1ZSxkb25lOiEhZG9uZX19ZnVuY3Rpb24gaXNJdGVyYWJsZShpdCl7dmFyIE89T2JqZWN0KGl0KSxTeW1ib2w9Z2xvYmFsW1NZTUJPTF0saGFzRXh0PShTeW1ib2wmJlN5bWJvbFtJVEVSQVRPUl18fEZGX0lURVJBVE9SKWluIE87cmV0dXJuIGhhc0V4dHx8U1lNQk9MX0lURVJBVE9SIGluIE98fGhhcyhJdGVyYXRvcnMsY2xhc3NvZihPKSl9ZnVuY3Rpb24gZ2V0SXRlcmF0b3IoaXQpe3ZhciBTeW1ib2w9Z2xvYmFsW1NZTUJPTF0sZXh0PWl0W1N5bWJvbCYmU3ltYm9sW0lURVJBVE9SXXx8RkZfSVRFUkFUT1JdLGdldEl0ZXI9ZXh0fHxpdFtTWU1CT0xfSVRFUkFUT1JdfHxJdGVyYXRvcnNbY2xhc3NvZihpdCldO3JldHVybiBhc3NlcnRPYmplY3QoZ2V0SXRlci5jYWxsKGl0KSl9ZnVuY3Rpb24gc3RlcENhbGwoZm4sdmFsdWUsZW50cmllcyl7cmV0dXJuIGVudHJpZXM/aW52b2tlKGZuLHZhbHVlKTpmbih2YWx1ZSl9ZnVuY3Rpb24gZm9yT2YoaXRlcmFibGUsZW50cmllcyxmbix0aGF0KXt2YXIgaXRlcmF0b3I9Z2V0SXRlcmF0b3IoaXRlcmFibGUpLGY9Y3R4KGZuLHRoYXQsZW50cmllcz8yOjEpLHN0ZXA7d2hpbGUoIShzdGVwPWl0ZXJhdG9yLm5leHQoKSkuZG9uZSlpZihzdGVwQ2FsbChmLHN0ZXAudmFsdWUsZW50cmllcyk9PT1mYWxzZSlyZXR1cm59dmFyIE5PREU9Y29mKHByb2Nlc3MpPT1QUk9DRVNTLGNvcmU9e30scGF0aD1mcmFtZXdvcms/Z2xvYmFsOmNvcmUsb2xkPWdsb2JhbC5jb3JlLGV4cG9ydEdsb2JhbCxGT1JDRUQ9MSxHTE9CQUw9MixTVEFUSUM9NCxQUk9UTz04LEJJTkQ9MTYsV1JBUD0zMixTSU1QTEU9NjQ7ZnVuY3Rpb24gJGRlZmluZSh0eXBlLG5hbWUsc291cmNlKXt2YXIga2V5LG93bixvdXQsZXhwLGlzR2xvYmFsPXR5cGUmR0xPQkFMLHRhcmdldD1pc0dsb2JhbD9nbG9iYWw6dHlwZSZTVEFUSUM/Z2xvYmFsW25hbWVdOihnbG9iYWxbbmFtZV18fE9iamVjdFByb3RvKVtQUk9UT1RZUEVdLGV4cG9ydHM9aXNHbG9iYWw/Y29yZTpjb3JlW25hbWVdfHwoY29yZVtuYW1lXT17fSk7aWYoaXNHbG9iYWwpc291cmNlPW5hbWU7Zm9yKGtleSBpbiBzb3VyY2Upe293bj0hKHR5cGUmRk9SQ0VEKSYmdGFyZ2V0JiZrZXkgaW4gdGFyZ2V0JiYoIWlzRnVuY3Rpb24odGFyZ2V0W2tleV0pfHxpc05hdGl2ZSh0YXJnZXRba2V5XSkpO291dD0ob3duP3RhcmdldDpzb3VyY2UpW2tleV07aWYoIWZyYW1ld29yayYmaXNHbG9iYWwmJiFpc0Z1bmN0aW9uKHRhcmdldFtrZXldKSlleHA9c291cmNlW2tleV07ZWxzZSBpZih0eXBlJkJJTkQmJm93billeHA9Y3R4KG91dCxnbG9iYWwpO2Vsc2UgaWYodHlwZSZXUkFQJiYhZnJhbWV3b3JrJiZ0YXJnZXRba2V5XT09b3V0KXtleHA9ZnVuY3Rpb24ocGFyYW0pe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygb3V0P25ldyBvdXQocGFyYW0pOm91dChwYXJhbSl9O2V4cFtQUk9UT1RZUEVdPW91dFtQUk9UT1RZUEVdfWVsc2UgZXhwPXR5cGUmUFJPVE8mJmlzRnVuY3Rpb24ob3V0KT9jdHgoY2FsbCxvdXQpOm91dDtpZihmcmFtZXdvcmsmJnRhcmdldCYmIW93bil7aWYoaXNHbG9iYWx8fHR5cGUmU0lNUExFKXRhcmdldFtrZXldPW91dDtlbHNlIGRlbGV0ZSB0YXJnZXRba2V5XSYmaGlkZGVuKHRhcmdldCxrZXksb3V0KX1pZihleHBvcnRzW2tleV0hPW91dCloaWRkZW4oZXhwb3J0cyxrZXksZXhwKX19aWYodHlwZW9mIG1vZHVsZSE9XCJ1bmRlZmluZWRcIiYmbW9kdWxlLmV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9Y29yZTtlbHNlIGlmKGlzRnVuY3Rpb24oZGVmaW5lKSYmZGVmaW5lLmFtZClkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gY29yZX0pO2Vsc2UgZXhwb3J0R2xvYmFsPXRydWU7aWYoZXhwb3J0R2xvYmFsfHxmcmFtZXdvcmspe2NvcmUubm9Db25mbGljdD1mdW5jdGlvbigpe2dsb2JhbC5jb3JlPW9sZDtyZXR1cm4gY29yZX07Z2xvYmFsLmNvcmU9Y29yZX0hZnVuY3Rpb24oVEFHLFN5bWJvbFJlZ2lzdHJ5LEFsbFN5bWJvbHMsc2V0dGVyKXtpZighaXNOYXRpdmUoU3ltYm9sKSl7U3ltYm9sPWZ1bmN0aW9uKGRlc2NyaXB0aW9uKXthc3NlcnQoISh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSxTWU1CT0wrXCIgaXMgbm90IGEgXCIrQ09OU1RSVUNUT1IpO3ZhciB0YWc9dWlkKGRlc2NyaXB0aW9uKSxzeW09c2V0KGNyZWF0ZShTeW1ib2xbUFJPVE9UWVBFXSksVEFHLHRhZyk7QWxsU3ltYm9sc1t0YWddPXN5bTtERVNDJiZzZXR0ZXImJmRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvLHRhZyx7Y29uZmlndXJhYmxlOnRydWUsc2V0OmZ1bmN0aW9uKHZhbHVlKXtoaWRkZW4odGhpcyx0YWcsdmFsdWUpfX0pO3JldHVybiBzeW19O2hpZGRlbihTeW1ib2xbUFJPVE9UWVBFXSxUT19TVFJJTkcsZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tUQUddfSl9JGRlZmluZShHTE9CQUwrV1JBUCx7U3ltYm9sOlN5bWJvbH0pO3ZhciBzeW1ib2xTdGF0aWNzPXtcImZvclwiOmZ1bmN0aW9uKGtleSl7cmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSxrZXkrPVwiXCIpP1N5bWJvbFJlZ2lzdHJ5W2tleV06U3ltYm9sUmVnaXN0cnlba2V5XT1TeW1ib2woa2V5KX0saXRlcmF0b3I6U1lNQk9MX0lURVJBVE9SLGtleUZvcjpwYXJ0LmNhbGwoa2V5T2YsU3ltYm9sUmVnaXN0cnkpLHNwZWNpZXM6U1lNQk9MX1NQRUNJRVMsdG9TdHJpbmdUYWc6U1lNQk9MX1RBRz1nZXRXZWxsS25vd25TeW1ib2woVE9fU1RSSU5HX1RBRyx0cnVlKSx1bnNjb3BhYmxlczpTWU1CT0xfVU5TQ09QQUJMRVMscHVyZTpzYWZlU3ltYm9sLHNldDpzZXQsdXNlU2V0dGVyOmZ1bmN0aW9uKCl7c2V0dGVyPXRydWV9LHVzZVNpbXBsZTpmdW5jdGlvbigpe3NldHRlcj1mYWxzZX19O2ZvckVhY2guY2FsbChhcnJheShcImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGxpdCx0b1ByaW1pdGl2ZVwiKSxmdW5jdGlvbihpdCl7c3ltYm9sU3RhdGljc1tpdF09Z2V0V2VsbEtub3duU3ltYm9sKGl0KX0pOyRkZWZpbmUoU1RBVElDLFNZTUJPTCxzeW1ib2xTdGF0aWNzKTtzZXRUb1N0cmluZ1RhZyhTeW1ib2wsU1lNQk9MKTskZGVmaW5lKFNUQVRJQytGT1JDRUQqIWlzTmF0aXZlKFN5bWJvbCksT0JKRUNULHtnZXRPd25Qcm9wZXJ0eU5hbWVzOmZ1bmN0aW9uKGl0KXt2YXIgbmFtZXM9Z2V0TmFtZXModG9PYmplY3QoaXQpKSxyZXN1bHQ9W10sa2V5LGk9MDt3aGlsZShuYW1lcy5sZW5ndGg+aSloYXMoQWxsU3ltYm9scyxrZXk9bmFtZXNbaSsrXSl8fHJlc3VsdC5wdXNoKGtleSk7cmV0dXJuIHJlc3VsdH0sZ2V0T3duUHJvcGVydHlTeW1ib2xzOmZ1bmN0aW9uKGl0KXt2YXIgbmFtZXM9Z2V0TmFtZXModG9PYmplY3QoaXQpKSxyZXN1bHQ9W10sa2V5LGk9MDt3aGlsZShuYW1lcy5sZW5ndGg+aSloYXMoQWxsU3ltYm9scyxrZXk9bmFtZXNbaSsrXSkmJnJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7cmV0dXJuIHJlc3VsdH19KX0oc2FmZVN5bWJvbChcInRhZ1wiKSx7fSx7fSx0cnVlKTshZnVuY3Rpb24odG1wKXt2YXIgb2JqZWN0U3RhdGljPXthc3NpZ246YXNzaWduLGlzOmZ1bmN0aW9uKHgseSl7cmV0dXJuIHg9PT15P3ghPT0wfHwxL3g9PT0xL3k6eCE9eCYmeSE9eX19O1wiX19wcm90b19fXCJpbiBPYmplY3RQcm90byYmZnVuY3Rpb24oYnVnZ3ksc2V0KXt0cnl7c2V0PWN0eChjYWxsLGdldE93bkRlc2NyaXB0b3IoT2JqZWN0UHJvdG8sXCJfX3Byb3RvX19cIikuc2V0LDIpO3NldCh7fSxBcnJheVByb3RvKX1jYXRjaChlKXtidWdneT10cnVlfW9iamVjdFN0YXRpYy5zZXRQcm90b3R5cGVPZj1zZXRQcm90b3R5cGVPZj1zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24oTyxwcm90byl7YXNzZXJ0T2JqZWN0KE8pO2Fzc2VydChwcm90bz09PW51bGx8fGlzT2JqZWN0KHByb3RvKSxwcm90byxcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7aWYoYnVnZ3kpTy5fX3Byb3RvX189cHJvdG87ZWxzZSBzZXQoTyxwcm90byk7cmV0dXJuIE99fSgpOyRkZWZpbmUoU1RBVElDLE9CSkVDVCxvYmplY3RTdGF0aWMpO2lmKGZyYW1ld29yayl7dG1wW1NZTUJPTF9UQUddPURPVDtpZihjb2YodG1wKSE9RE9UKWhpZGRlbihPYmplY3RQcm90byxUT19TVFJJTkcsZnVuY3Rpb24oKXtyZXR1cm5cIltvYmplY3QgXCIrY2xhc3NvZih0aGlzKStcIl1cIn0pfXNldFRvU3RyaW5nVGFnKE1hdGgsTUFUSCx0cnVlKTtzZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTixcIkpTT05cIix0cnVlKX0oe30pOyFmdW5jdGlvbigpe2Z1bmN0aW9uIHdyYXBPYmplY3RNZXRob2Qoa2V5LE1PREUpe3ZhciBmbj1PYmplY3Rba2V5XSxleHA9Y29yZVtPQkpFQ1RdW2tleV0sZj0wLG89e307aWYoIWV4cHx8aXNOYXRpdmUoZXhwKSl7b1trZXldPU1PREU9PTE/ZnVuY3Rpb24oaXQpe3JldHVybiBpc09iamVjdChpdCk/Zm4oaXQpOml0fTpNT0RFPT0yP2Z1bmN0aW9uKGl0KXtyZXR1cm4gaXNPYmplY3QoaXQpP2ZuKGl0KTp0cnVlfTpNT0RFPT0zP2Z1bmN0aW9uKGl0KXtyZXR1cm4gaXNPYmplY3QoaXQpP2ZuKGl0KTpmYWxzZX06TU9ERT09ND9mdW5jdGlvbihpdCxrZXkpe3JldHVybiBmbih0b09iamVjdChpdCksa2V5KX06ZnVuY3Rpb24oaXQpe3JldHVybiBmbih0b09iamVjdChpdCkpfTt0cnl7Zm4oRE9UKX1jYXRjaChlKXtmPTF9JGRlZmluZShTVEFUSUMrRk9SQ0VEKmYsT0JKRUNULG8pfX13cmFwT2JqZWN0TWV0aG9kKFwiZnJlZXplXCIsMSk7d3JhcE9iamVjdE1ldGhvZChcInNlYWxcIiwxKTt3cmFwT2JqZWN0TWV0aG9kKFwicHJldmVudEV4dGVuc2lvbnNcIiwxKTt3cmFwT2JqZWN0TWV0aG9kKFwiaXNGcm96ZW5cIiwyKTt3cmFwT2JqZWN0TWV0aG9kKFwiaXNTZWFsZWRcIiwyKTt3cmFwT2JqZWN0TWV0aG9kKFwiaXNFeHRlbnNpYmxlXCIsMyk7d3JhcE9iamVjdE1ldGhvZChcImdldE93blByb3BlcnR5RGVzY3JpcHRvclwiLDQpO3dyYXBPYmplY3RNZXRob2QoXCJnZXRQcm90b3R5cGVPZlwiKTt3cmFwT2JqZWN0TWV0aG9kKFwia2V5c1wiKTt3cmFwT2JqZWN0TWV0aG9kKFwiZ2V0T3duUHJvcGVydHlOYW1lc1wiKX0oKTshZnVuY3Rpb24oTkFNRSl7TkFNRSBpbiBGdW5jdGlvblByb3RvfHxkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvLE5BTUUse2NvbmZpZ3VyYWJsZTp0cnVlLGdldDpmdW5jdGlvbigpe3ZhciBtYXRjaD1TdHJpbmcodGhpcykubWF0Y2goL15cXHMqZnVuY3Rpb24gKFteIChdKikvKSxuYW1lPW1hdGNoP21hdGNoWzFdOlwiXCI7aGFzKHRoaXMsTkFNRSl8fGRlZmluZVByb3BlcnR5KHRoaXMsTkFNRSxkZXNjcmlwdG9yKDUsbmFtZSkpO3JldHVybiBuYW1lfSxzZXQ6ZnVuY3Rpb24odmFsdWUpe2hhcyh0aGlzLE5BTUUpfHxkZWZpbmVQcm9wZXJ0eSh0aGlzLE5BTUUsZGVzY3JpcHRvcigwLHZhbHVlKSl9fSl9KFwibmFtZVwiKTtOdW1iZXIoXCIwbzFcIikmJk51bWJlcihcIjBiMVwiKXx8ZnVuY3Rpb24oX051bWJlcixOdW1iZXJQcm90byl7ZnVuY3Rpb24gdG9OdW1iZXIoaXQpe2lmKGlzT2JqZWN0KGl0KSlpdD10b1ByaW1pdGl2ZShpdCk7aWYodHlwZW9mIGl0PT1cInN0cmluZ1wiJiZpdC5sZW5ndGg+MiYmaXQuY2hhckNvZGVBdCgwKT09NDgpe3ZhciBiaW5hcnk9ZmFsc2U7c3dpdGNoKGl0LmNoYXJDb2RlQXQoMSkpe2Nhc2UgNjY6Y2FzZSA5ODpiaW5hcnk9dHJ1ZTtjYXNlIDc5OmNhc2UgMTExOnJldHVybiBwYXJzZUludChpdC5zbGljZSgyKSxiaW5hcnk/Mjo4KX19cmV0dXJuK2l0fWZ1bmN0aW9uIHRvUHJpbWl0aXZlKGl0KXt2YXIgZm4sdmFsO2lmKGlzRnVuY3Rpb24oZm49aXQudmFsdWVPZikmJiFpc09iamVjdCh2YWw9Zm4uY2FsbChpdCkpKXJldHVybiB2YWw7aWYoaXNGdW5jdGlvbihmbj1pdFtUT19TVFJJTkddKSYmIWlzT2JqZWN0KHZhbD1mbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDt0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBudW1iZXJcIil9TnVtYmVyPWZ1bmN0aW9uIE51bWJlcihpdCl7cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBOdW1iZXI/bmV3IF9OdW1iZXIodG9OdW1iZXIoaXQpKTp0b051bWJlcihpdCl9O2ZvckVhY2guY2FsbChERVNDP2dldE5hbWVzKF9OdW1iZXIpOmFycmF5KFwiTUFYX1ZBTFVFLE1JTl9WQUxVRSxOYU4sTkVHQVRJVkVfSU5GSU5JVFksUE9TSVRJVkVfSU5GSU5JVFlcIiksZnVuY3Rpb24oa2V5KXtrZXkgaW4gTnVtYmVyfHxkZWZpbmVQcm9wZXJ0eShOdW1iZXIsa2V5LGdldE93bkRlc2NyaXB0b3IoX051bWJlcixrZXkpKX0pO051bWJlcltQUk9UT1RZUEVdPU51bWJlclByb3RvO051bWJlclByb3RvW0NPTlNUUlVDVE9SXT1OdW1iZXI7aGlkZGVuKGdsb2JhbCxOVU1CRVIsTnVtYmVyKX0oTnVtYmVyLE51bWJlcltQUk9UT1RZUEVdKTshZnVuY3Rpb24oaXNJbnRlZ2VyKXskZGVmaW5lKFNUQVRJQyxOVU1CRVIse0VQU0lMT046cG93KDIsLTUyKSxpc0Zpbml0ZTpmdW5jdGlvbihpdCl7cmV0dXJuIHR5cGVvZiBpdD09XCJudW1iZXJcIiYmaXNGaW5pdGUoaXQpfSxpc0ludGVnZXI6aXNJbnRlZ2VyLGlzTmFOOnNhbWVOYU4saXNTYWZlSW50ZWdlcjpmdW5jdGlvbihudW1iZXIpe3JldHVybiBpc0ludGVnZXIobnVtYmVyKSYmYWJzKG51bWJlcik8PU1BWF9TQUZFX0lOVEVHRVJ9LE1BWF9TQUZFX0lOVEVHRVI6TUFYX1NBRkVfSU5URUdFUixNSU5fU0FGRV9JTlRFR0VSOi1NQVhfU0FGRV9JTlRFR0VSLHBhcnNlRmxvYXQ6cGFyc2VGbG9hdCxwYXJzZUludDpwYXJzZUludH0pfShOdW1iZXIuaXNJbnRlZ2VyfHxmdW5jdGlvbihpdCl7cmV0dXJuIWlzT2JqZWN0KGl0KSYmaXNGaW5pdGUoaXQpJiZmbG9vcihpdCk9PT1pdH0pOyFmdW5jdGlvbigpe3ZhciBFPU1hdGguRSxleHA9TWF0aC5leHAsbG9nPU1hdGgubG9nLHNxcnQ9TWF0aC5zcXJ0LHNpZ249TWF0aC5zaWdufHxmdW5jdGlvbih4KXtyZXR1cm4oeD0reCk9PTB8fHghPXg/eDp4PDA/LTE6MX07ZnVuY3Rpb24gYXNpbmgoeCl7cmV0dXJuIWlzRmluaXRlKHg9K3gpfHx4PT0wP3g6eDwwPy1hc2luaCgteCk6bG9nKHgrc3FydCh4KngrMSkpfWZ1bmN0aW9uIGV4cG0xKHgpe3JldHVybih4PSt4KT09MD94Ong+LTFlLTYmJng8MWUtNj94K3gqeC8yOmV4cCh4KS0xfSRkZWZpbmUoU1RBVElDLE1BVEgse2Fjb3NoOmZ1bmN0aW9uKHgpe3JldHVybih4PSt4KTwxP05hTjppc0Zpbml0ZSh4KT9sb2coeC9FK3NxcnQoeCsxKSpzcXJ0KHgtMSkvRSkrMTp4fSxhc2luaDphc2luaCxhdGFuaDpmdW5jdGlvbih4KXtyZXR1cm4oeD0reCk9PTA/eDpsb2coKDEreCkvKDEteCkpLzJ9LGNicnQ6ZnVuY3Rpb24oeCl7cmV0dXJuIHNpZ24oeD0reCkqcG93KGFicyh4KSwxLzMpfSxjbHozMjpmdW5jdGlvbih4KXtyZXR1cm4oeD4+Pj0wKT8zMi14W1RPX1NUUklOR10oMikubGVuZ3RoOjMyfSxjb3NoOmZ1bmN0aW9uKHgpe3JldHVybihleHAoeD0reCkrZXhwKC14KSkvMn0sZXhwbTE6ZXhwbTEsZnJvdW5kOmZ1bmN0aW9uKHgpe3JldHVybiBuZXcgRmxvYXQzMkFycmF5KFt4XSlbMF19LGh5cG90OmZ1bmN0aW9uKHZhbHVlMSx2YWx1ZTIpe3ZhciBzdW09MCxsZW4xPWFyZ3VtZW50cy5sZW5ndGgsbGVuMj1sZW4xLGFyZ3M9QXJyYXkobGVuMSksbGFyZz0tSW5maW5pdHksYXJnO3doaWxlKGxlbjEtLSl7YXJnPWFyZ3NbbGVuMV09K2FyZ3VtZW50c1tsZW4xXTtpZihhcmc9PUluZmluaXR5fHxhcmc9PS1JbmZpbml0eSlyZXR1cm4gSW5maW5pdHk7aWYoYXJnPmxhcmcpbGFyZz1hcmd9bGFyZz1hcmd8fDE7d2hpbGUobGVuMi0tKXN1bSs9cG93KGFyZ3NbbGVuMl0vbGFyZywyKTtyZXR1cm4gbGFyZypzcXJ0KHN1bSl9LGltdWw6ZnVuY3Rpb24oeCx5KXt2YXIgVUludDE2PTY1NTM1LHhuPSt4LHluPSt5LHhsPVVJbnQxNiZ4bix5bD1VSW50MTYmeW47cmV0dXJuIDB8eGwqeWwrKChVSW50MTYmeG4+Pj4xNikqeWwreGwqKFVJbnQxNiZ5bj4+PjE2KTw8MTY+Pj4wKX0sbG9nMXA6ZnVuY3Rpb24oeCl7cmV0dXJuKHg9K3gpPi0xZS04JiZ4PDFlLTg/eC14KngvMjpsb2coMSt4KX0sbG9nMTA6ZnVuY3Rpb24oeCl7cmV0dXJuIGxvZyh4KS9NYXRoLkxOMTB9LGxvZzI6ZnVuY3Rpb24oeCl7cmV0dXJuIGxvZyh4KS9NYXRoLkxOMn0sc2lnbjpzaWduLHNpbmg6ZnVuY3Rpb24oeCl7cmV0dXJuIGFicyh4PSt4KTwxPyhleHBtMSh4KS1leHBtMSgteCkpLzI6KGV4cCh4LTEpLWV4cCgteC0xKSkqKEUvMil9LHRhbmg6ZnVuY3Rpb24oeCl7dmFyIGE9ZXhwbTEoeD0reCksYj1leHBtMSgteCk7cmV0dXJuIGE9PUluZmluaXR5PzE6Yj09SW5maW5pdHk/LTE6KGEtYikvKGV4cCh4KStleHAoLXgpKX0sdHJ1bmM6dHJ1bmN9KX0oKTshZnVuY3Rpb24oZnJvbUNoYXJDb2RlKXtmdW5jdGlvbiBhc3NlcnROb3RSZWdFeHAoaXQpe2lmKGNvZihpdCk9PVJFR0VYUCl0aHJvdyBUeXBlRXJyb3IoKX0kZGVmaW5lKFNUQVRJQyxTVFJJTkcse2Zyb21Db2RlUG9pbnQ6ZnVuY3Rpb24oeCl7dmFyIHJlcz1bXSxsZW49YXJndW1lbnRzLmxlbmd0aCxpPTAsY29kZTt3aGlsZShsZW4+aSl7Y29kZT0rYXJndW1lbnRzW2krK107aWYodG9JbmRleChjb2RlLDExMTQxMTEpIT09Y29kZSl0aHJvdyBSYW5nZUVycm9yKGNvZGUrXCIgaXMgbm90IGEgdmFsaWQgY29kZSBwb2ludFwiKTtyZXMucHVzaChjb2RlPDY1NTM2P2Zyb21DaGFyQ29kZShjb2RlKTpmcm9tQ2hhckNvZGUoKChjb2RlLT02NTUzNik+PjEwKSs1NTI5Nixjb2RlJTEwMjQrNTYzMjApKX1yZXR1cm4gcmVzLmpvaW4oXCJcIil9LHJhdzpmdW5jdGlvbihjYWxsU2l0ZSl7dmFyIHJhdz10b09iamVjdChjYWxsU2l0ZS5yYXcpLGxlbj10b0xlbmd0aChyYXcubGVuZ3RoKSxzbG49YXJndW1lbnRzLmxlbmd0aCxyZXM9W10saT0wO3doaWxlKGxlbj5pKXtyZXMucHVzaChTdHJpbmcocmF3W2krK10pKTtpZihpPHNsbilyZXMucHVzaChTdHJpbmcoYXJndW1lbnRzW2ldKSl9cmV0dXJuIHJlcy5qb2luKFwiXCIpfX0pOyRkZWZpbmUoUFJPVE8sU1RSSU5HLHtjb2RlUG9pbnRBdDpjcmVhdGVQb2ludEF0KGZhbHNlKSxlbmRzV2l0aDpmdW5jdGlvbihzZWFyY2hTdHJpbmcpe2Fzc2VydE5vdFJlZ0V4cChzZWFyY2hTdHJpbmcpO3ZhciB0aGF0PVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxlbmRQb3NpdGlvbj1hcmd1bWVudHNbMV0sbGVuPXRvTGVuZ3RoKHRoYXQubGVuZ3RoKSxlbmQ9ZW5kUG9zaXRpb249PT11bmRlZmluZWQ/bGVuOm1pbih0b0xlbmd0aChlbmRQb3NpdGlvbiksbGVuKTtzZWFyY2hTdHJpbmcrPVwiXCI7cmV0dXJuIHRoYXQuc2xpY2UoZW5kLXNlYXJjaFN0cmluZy5sZW5ndGgsZW5kKT09PXNlYXJjaFN0cmluZ30saW5jbHVkZXM6ZnVuY3Rpb24oc2VhcmNoU3RyaW5nKXthc3NlcnROb3RSZWdFeHAoc2VhcmNoU3RyaW5nKTtyZXR1cm4hIX5TdHJpbmcoYXNzZXJ0RGVmaW5lZCh0aGlzKSkuaW5kZXhPZihzZWFyY2hTdHJpbmcsYXJndW1lbnRzWzFdKX0scmVwZWF0OmZ1bmN0aW9uKGNvdW50KXt2YXIgc3RyPVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxyZXM9XCJcIixuPXRvSW50ZWdlcihjb3VudCk7aWYoMD5ufHxuPT1JbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7Zm9yKDtuPjA7KG4+Pj49MSkmJihzdHIrPXN0cikpaWYobiYxKXJlcys9c3RyO3JldHVybiByZXN9LHN0YXJ0c1dpdGg6ZnVuY3Rpb24oc2VhcmNoU3RyaW5nKXthc3NlcnROb3RSZWdFeHAoc2VhcmNoU3RyaW5nKTt2YXIgdGhhdD1TdHJpbmcoYXNzZXJ0RGVmaW5lZCh0aGlzKSksaW5kZXg9dG9MZW5ndGgobWluKGFyZ3VtZW50c1sxXSx0aGF0Lmxlbmd0aCkpO3NlYXJjaFN0cmluZys9XCJcIjtyZXR1cm4gdGhhdC5zbGljZShpbmRleCxpbmRleCtzZWFyY2hTdHJpbmcubGVuZ3RoKT09PXNlYXJjaFN0cmluZ319KX0oU3RyaW5nLmZyb21DaGFyQ29kZSk7IWZ1bmN0aW9uKCl7JGRlZmluZShTVEFUSUMsQVJSQVkse2Zyb206ZnVuY3Rpb24oYXJyYXlMaWtlKXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZChhcnJheUxpa2UpKSxtYXBmbj1hcmd1bWVudHNbMV0sbWFwcGluZz1tYXBmbiE9PXVuZGVmaW5lZCxmPW1hcHBpbmc/Y3R4KG1hcGZuLGFyZ3VtZW50c1syXSwyKTp1bmRlZmluZWQsaW5kZXg9MCxsZW5ndGgscmVzdWx0LGl0ZXIsc3RlcDtpZihpc0l0ZXJhYmxlKE8pKWZvcihpdGVyPWdldEl0ZXJhdG9yKE8pLHJlc3VsdD1uZXcoZ2VuZXJpYyh0aGlzLEFycmF5KSk7IShzdGVwPWl0ZXIubmV4dCgpKS5kb25lO2luZGV4Kyspe3Jlc3VsdFtpbmRleF09bWFwcGluZz9mKHN0ZXAudmFsdWUsaW5kZXgpOnN0ZXAudmFsdWV9ZWxzZSBmb3IocmVzdWx0PW5ldyhnZW5lcmljKHRoaXMsQXJyYXkpKShsZW5ndGg9dG9MZW5ndGgoTy5sZW5ndGgpKTtsZW5ndGg+aW5kZXg7aW5kZXgrKyl7cmVzdWx0W2luZGV4XT1tYXBwaW5nP2YoT1tpbmRleF0saW5kZXgpOk9baW5kZXhdfXJlc3VsdC5sZW5ndGg9aW5kZXg7cmV0dXJuIHJlc3VsdH0sb2Y6ZnVuY3Rpb24oKXt2YXIgaW5kZXg9MCxsZW5ndGg9YXJndW1lbnRzLmxlbmd0aCxyZXN1bHQ9bmV3KGdlbmVyaWModGhpcyxBcnJheSkpKGxlbmd0aCk7d2hpbGUobGVuZ3RoPmluZGV4KXJlc3VsdFtpbmRleF09YXJndW1lbnRzW2luZGV4KytdO3Jlc3VsdC5sZW5ndGg9bGVuZ3RoO3JldHVybiByZXN1bHR9fSk7JGRlZmluZShQUk9UTyxBUlJBWSx7Y29weVdpdGhpbjpmdW5jdGlvbih0YXJnZXQsc3RhcnQpe3ZhciBPPU9iamVjdChhc3NlcnREZWZpbmVkKHRoaXMpKSxsZW49dG9MZW5ndGgoTy5sZW5ndGgpLHRvPXRvSW5kZXgodGFyZ2V0LGxlbiksZnJvbT10b0luZGV4KHN0YXJ0LGxlbiksZW5kPWFyZ3VtZW50c1syXSxmaW49ZW5kPT09dW5kZWZpbmVkP2xlbjp0b0luZGV4KGVuZCxsZW4pLGNvdW50PW1pbihmaW4tZnJvbSxsZW4tdG8pLGluYz0xO2lmKGZyb208dG8mJnRvPGZyb20rY291bnQpe2luYz0tMTtmcm9tPWZyb20rY291bnQtMTt0bz10bytjb3VudC0xfXdoaWxlKGNvdW50LS0+MCl7aWYoZnJvbSBpbiBPKU9bdG9dPU9bZnJvbV07ZWxzZSBkZWxldGUgT1t0b107dG8rPWluYztmcm9tKz1pbmN9cmV0dXJuIE99LGZpbGw6ZnVuY3Rpb24odmFsdWUpe3ZhciBPPU9iamVjdChhc3NlcnREZWZpbmVkKHRoaXMpKSxsZW5ndGg9dG9MZW5ndGgoTy5sZW5ndGgpLGluZGV4PXRvSW5kZXgoYXJndW1lbnRzWzFdLGxlbmd0aCksZW5kPWFyZ3VtZW50c1syXSxlbmRQb3M9ZW5kPT09dW5kZWZpbmVkP2xlbmd0aDp0b0luZGV4KGVuZCxsZW5ndGgpO3doaWxlKGVuZFBvcz5pbmRleClPW2luZGV4KytdPXZhbHVlO3JldHVybiBPfSxmaW5kOmNyZWF0ZUFycmF5TWV0aG9kKDUpLGZpbmRJbmRleDpjcmVhdGVBcnJheU1ldGhvZCg2KX0pO2lmKGZyYW1ld29yayl7Zm9yRWFjaC5jYWxsKGFycmF5KFwiZmluZCxmaW5kSW5kZXgsZmlsbCxjb3B5V2l0aGluLGVudHJpZXMsa2V5cyx2YWx1ZXNcIiksZnVuY3Rpb24oaXQpe0FycmF5VW5zY29wYWJsZXNbaXRdPXRydWV9KTtTWU1CT0xfVU5TQ09QQUJMRVMgaW4gQXJyYXlQcm90b3x8aGlkZGVuKEFycmF5UHJvdG8sU1lNQk9MX1VOU0NPUEFCTEVTLEFycmF5VW5zY29wYWJsZXMpfXNldFNwZWNpZXMoQXJyYXkpfSgpOyFmdW5jdGlvbihhdCl7ZGVmaW5lU3RkSXRlcmF0b3JzKEFycmF5LEFSUkFZLGZ1bmN0aW9uKGl0ZXJhdGVkLGtpbmQpe3NldCh0aGlzLElURVIse286dG9PYmplY3QoaXRlcmF0ZWQpLGk6MCxrOmtpbmR9KX0sZnVuY3Rpb24oKXt2YXIgaXRlcj10aGlzW0lURVJdLE89aXRlci5vLGtpbmQ9aXRlci5rLGluZGV4PWl0ZXIuaSsrO2lmKCFPfHxpbmRleD49Ty5sZW5ndGgpe2l0ZXIubz11bmRlZmluZWQ7cmV0dXJuIGl0ZXJSZXN1bHQoMSl9aWYoa2luZD09S0VZKXJldHVybiBpdGVyUmVzdWx0KDAsaW5kZXgpO2lmKGtpbmQ9PVZBTFVFKXJldHVybiBpdGVyUmVzdWx0KDAsT1tpbmRleF0pO3JldHVybiBpdGVyUmVzdWx0KDAsW2luZGV4LE9baW5kZXhdXSl9LFZBTFVFKTtJdGVyYXRvcnNbQVJHVU1FTlRTXT1JdGVyYXRvcnNbQVJSQVldO2RlZmluZVN0ZEl0ZXJhdG9ycyhTdHJpbmcsU1RSSU5HLGZ1bmN0aW9uKGl0ZXJhdGVkKXtzZXQodGhpcyxJVEVSLHtvOlN0cmluZyhpdGVyYXRlZCksaTowfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxPPWl0ZXIubyxpbmRleD1pdGVyLmkscG9pbnQ7aWYoaW5kZXg+PU8ubGVuZ3RoKXJldHVybiBpdGVyUmVzdWx0KDEpO3BvaW50PWF0LmNhbGwoTyxpbmRleCk7aXRlci5pKz1wb2ludC5sZW5ndGg7cmV0dXJuIGl0ZXJSZXN1bHQoMCxwb2ludCl9KX0oY3JlYXRlUG9pbnRBdCh0cnVlKSk7IWZ1bmN0aW9uKFJlZ0V4cFByb3RvLF9SZWdFeHApe2Z1bmN0aW9uIGFzc2VydFJlZ0V4cFdyYXBwZXIoZm4pe3JldHVybiBmdW5jdGlvbigpe2Fzc2VydChjb2YodGhpcyk9PT1SRUdFWFApO3JldHVybiBmbih0aGlzKX19aWYoREVTQyYmIWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBSZWdFeHAoL2EvZyxcImlcIik9PVwiL2EvaVwifWNhdGNoKGUpe319KCkpe1JlZ0V4cD1mdW5jdGlvbiBSZWdFeHAocGF0dGVybixmbGFncyl7cmV0dXJuIG5ldyBfUmVnRXhwKGNvZihwYXR0ZXJuKT09UkVHRVhQJiZmbGFncyE9PXVuZGVmaW5lZD9wYXR0ZXJuLnNvdXJjZTpwYXR0ZXJuLGZsYWdzKX07Zm9yRWFjaC5jYWxsKGdldE5hbWVzKF9SZWdFeHApLGZ1bmN0aW9uKGtleSl7a2V5IGluIFJlZ0V4cHx8ZGVmaW5lUHJvcGVydHkoUmVnRXhwLGtleSx7Y29uZmlndXJhYmxlOnRydWUsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF9SZWdFeHBba2V5XX0sc2V0OmZ1bmN0aW9uKGl0KXtfUmVnRXhwW2tleV09aXR9fSl9KTtSZWdFeHBQcm90b1tDT05TVFJVQ1RPUl09UmVnRXhwO1JlZ0V4cFtQUk9UT1RZUEVdPVJlZ0V4cFByb3RvO2hpZGRlbihnbG9iYWwsUkVHRVhQLFJlZ0V4cCl9aWYoLy4vZy5mbGFncyE9XCJnXCIpZGVmaW5lUHJvcGVydHkoUmVnRXhwUHJvdG8sXCJmbGFnc1wiLHtjb25maWd1cmFibGU6dHJ1ZSxnZXQ6YXNzZXJ0UmVnRXhwV3JhcHBlcihjcmVhdGVSZXBsYWNlcigvXi4qXFwvKFxcdyopJC8sXCIkMVwiLHRydWUpKX0pO2ZvckVhY2guY2FsbChhcnJheShcInN0aWNreSx1bmljb2RlXCIpLGZ1bmN0aW9uKGtleSl7a2V5IGluLy4vfHxkZWZpbmVQcm9wZXJ0eShSZWdFeHBQcm90byxrZXksREVTQz97Y29uZmlndXJhYmxlOnRydWUsZ2V0OmFzc2VydFJlZ0V4cFdyYXBwZXIoZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2V9KX06ZGVzY3JpcHRvcig1LGZhbHNlKSl9KTtzZXRTcGVjaWVzKFJlZ0V4cCl9KFJlZ0V4cFtQUk9UT1RZUEVdLFJlZ0V4cCk7aXNGdW5jdGlvbihzZXRJbW1lZGlhdGUpJiZpc0Z1bmN0aW9uKGNsZWFySW1tZWRpYXRlKXx8ZnVuY3Rpb24oT05SRUFEWVNUQVRFQ0hBTkdFKXt2YXIgcG9zdE1lc3NhZ2U9Z2xvYmFsLnBvc3RNZXNzYWdlLGFkZEV2ZW50TGlzdGVuZXI9Z2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIsTWVzc2FnZUNoYW5uZWw9Z2xvYmFsLk1lc3NhZ2VDaGFubmVsLGNvdW50ZXI9MCxxdWV1ZT17fSxkZWZlcixjaGFubmVsLHBvcnQ7c2V0SW1tZWRpYXRlPWZ1bmN0aW9uKGZuKXt2YXIgYXJncz1bXSxpPTE7d2hpbGUoYXJndW1lbnRzLmxlbmd0aD5pKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7cXVldWVbKytjb3VudGVyXT1mdW5jdGlvbigpe2ludm9rZShpc0Z1bmN0aW9uKGZuKT9mbjpGdW5jdGlvbihmbiksYXJncyl9O2RlZmVyKGNvdW50ZXIpO3JldHVybiBjb3VudGVyfTtjbGVhckltbWVkaWF0ZT1mdW5jdGlvbihpZCl7ZGVsZXRlIHF1ZXVlW2lkXX07ZnVuY3Rpb24gcnVuKGlkKXtpZihoYXMocXVldWUsaWQpKXt2YXIgZm49cXVldWVbaWRdO2RlbGV0ZSBxdWV1ZVtpZF07Zm4oKX19ZnVuY3Rpb24gbGlzdG5lcihldmVudCl7cnVuKGV2ZW50LmRhdGEpfWlmKE5PREUpe2RlZmVyPWZ1bmN0aW9uKGlkKXtuZXh0VGljayhwYXJ0LmNhbGwocnVuLGlkKSl9fWVsc2UgaWYoYWRkRXZlbnRMaXN0ZW5lciYmaXNGdW5jdGlvbihwb3N0TWVzc2FnZSkmJiFnbG9iYWwuaW1wb3J0U2NyaXB0cyl7ZGVmZXI9ZnVuY3Rpb24oaWQpe3Bvc3RNZXNzYWdlKGlkLFwiKlwiKX07YWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixsaXN0bmVyLGZhbHNlKX1lbHNlIGlmKGlzRnVuY3Rpb24oTWVzc2FnZUNoYW5uZWwpKXtjaGFubmVsPW5ldyBNZXNzYWdlQ2hhbm5lbDtwb3J0PWNoYW5uZWwucG9ydDI7Y2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2U9bGlzdG5lcjtkZWZlcj1jdHgocG9ydC5wb3N0TWVzc2FnZSxwb3J0LDEpfWVsc2UgaWYoZG9jdW1lbnQmJk9OUkVBRFlTVEFURUNIQU5HRSBpbiBkb2N1bWVudFtDUkVBVEVfRUxFTUVOVF0oXCJzY3JpcHRcIikpe2RlZmVyPWZ1bmN0aW9uKGlkKXtodG1sLmFwcGVuZENoaWxkKGRvY3VtZW50W0NSRUFURV9FTEVNRU5UXShcInNjcmlwdFwiKSlbT05SRUFEWVNUQVRFQ0hBTkdFXT1mdW5jdGlvbigpe2h0bWwucmVtb3ZlQ2hpbGQodGhpcyk7cnVuKGlkKX19fWVsc2V7ZGVmZXI9ZnVuY3Rpb24oaWQpe3NldFRpbWVvdXQocnVuLDAsaWQpfX19KFwib25yZWFkeXN0YXRlY2hhbmdlXCIpOyRkZWZpbmUoR0xPQkFMK0JJTkQse3NldEltbWVkaWF0ZTpzZXRJbW1lZGlhdGUsY2xlYXJJbW1lZGlhdGU6Y2xlYXJJbW1lZGlhdGV9KTshZnVuY3Rpb24oUHJvbWlzZSx0ZXN0KXtpc0Z1bmN0aW9uKFByb21pc2UpJiZpc0Z1bmN0aW9uKFByb21pc2UucmVzb2x2ZSkmJlByb21pc2UucmVzb2x2ZSh0ZXN0PW5ldyBQcm9taXNlKGZ1bmN0aW9uKCl7fSkpPT10ZXN0fHxmdW5jdGlvbihhc2FwLERFRil7ZnVuY3Rpb24gaXNUaGVuYWJsZShvKXt2YXIgdGhlbjtpZihpc09iamVjdChvKSl0aGVuPW8udGhlbjtyZXR1cm4gaXNGdW5jdGlvbih0aGVuKT90aGVuOmZhbHNlfWZ1bmN0aW9uIG5vdGlmeShkZWYpe3ZhciBjaGFpbj1kZWYuY2hhaW47Y2hhaW4ubGVuZ3RoJiZhc2FwKGZ1bmN0aW9uKCl7dmFyIG1zZz1kZWYubXNnLG9rPWRlZi5zdGF0ZT09MSxpPTA7d2hpbGUoY2hhaW4ubGVuZ3RoPmkpIWZ1bmN0aW9uKHJlYWN0KXt2YXIgY2I9b2s/cmVhY3Qub2s6cmVhY3QuZmFpbCxyZXQsdGhlbjt0cnl7aWYoY2Ipe3JldD1jYj09PXRydWU/bXNnOmNiKG1zZyk7aWYocmV0PT09cmVhY3QuUCl7cmVhY3QucmVqKFR5cGVFcnJvcihQUk9NSVNFK1wiLWNoYWluIGN5Y2xlXCIpKX1lbHNlIGlmKHRoZW49aXNUaGVuYWJsZShyZXQpKXt0aGVuLmNhbGwocmV0LHJlYWN0LnJlcyxyZWFjdC5yZWopfWVsc2UgcmVhY3QucmVzKHJldCl9ZWxzZSByZWFjdC5yZWoobXNnKX1jYXRjaChlcnIpe3JlYWN0LnJlaihlcnIpfX0oY2hhaW5baSsrXSk7Y2hhaW4ubGVuZ3RoPTB9KX1mdW5jdGlvbiByZXNvbHZlKG1zZyl7dmFyIGRlZj10aGlzLHRoZW4sd3JhcHBlcjtpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO3RyeXtpZih0aGVuPWlzVGhlbmFibGUobXNnKSl7d3JhcHBlcj17ZGVmOmRlZixkb25lOmZhbHNlfTt0aGVuLmNhbGwobXNnLGN0eChyZXNvbHZlLHdyYXBwZXIsMSksY3R4KHJlamVjdCx3cmFwcGVyLDEpKX1lbHNle2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0xO25vdGlmeShkZWYpfX1jYXRjaChlcnIpe3JlamVjdC5jYWxsKHdyYXBwZXJ8fHtkZWY6ZGVmLGRvbmU6ZmFsc2V9LGVycil9fWZ1bmN0aW9uIHJlamVjdChtc2cpe3ZhciBkZWY9dGhpcztpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0yO25vdGlmeShkZWYpfWZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKEMpe3ZhciBTPWFzc2VydE9iamVjdChDKVtTWU1CT0xfU1BFQ0lFU107cmV0dXJuIFMhPXVuZGVmaW5lZD9TOkN9UHJvbWlzZT1mdW5jdGlvbihleGVjdXRvcil7YXNzZXJ0RnVuY3Rpb24oZXhlY3V0b3IpO2Fzc2VydEluc3RhbmNlKHRoaXMsUHJvbWlzZSxQUk9NSVNFKTt2YXIgZGVmPXtjaGFpbjpbXSxzdGF0ZTowLGRvbmU6ZmFsc2UsbXNnOnVuZGVmaW5lZH07aGlkZGVuKHRoaXMsREVGLGRlZik7dHJ5e2V4ZWN1dG9yKGN0eChyZXNvbHZlLGRlZiwxKSxjdHgocmVqZWN0LGRlZiwxKSl9Y2F0Y2goZXJyKXtyZWplY3QuY2FsbChkZWYsZXJyKX19O2Fzc2lnbkhpZGRlbihQcm9taXNlW1BST1RPVFlQRV0se3RoZW46ZnVuY3Rpb24ob25GdWxmaWxsZWQsb25SZWplY3RlZCl7dmFyIFM9YXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKVtDT05TVFJVQ1RPUl0pW1NZTUJPTF9TUEVDSUVTXTt2YXIgcmVhY3Q9e29rOmlzRnVuY3Rpb24ob25GdWxmaWxsZWQpP29uRnVsZmlsbGVkOnRydWUsZmFpbDppc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpP29uUmVqZWN0ZWQ6ZmFsc2V9LFA9cmVhY3QuUD1uZXcoUyE9dW5kZWZpbmVkP1M6UHJvbWlzZSkoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3JlYWN0LnJlcz1hc3NlcnRGdW5jdGlvbihyZXNvbHZlKTtyZWFjdC5yZWo9YXNzZXJ0RnVuY3Rpb24ocmVqZWN0KX0pLGRlZj10aGlzW0RFRl07ZGVmLmNoYWluLnB1c2gocmVhY3QpO2RlZi5zdGF0ZSYmbm90aWZ5KGRlZik7cmV0dXJuIFB9LFwiY2F0Y2hcIjpmdW5jdGlvbihvblJlamVjdGVkKXtyZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCxvblJlamVjdGVkKX19KTthc3NpZ25IaWRkZW4oUHJvbWlzZSx7YWxsOmZ1bmN0aW9uKGl0ZXJhYmxlKXt2YXIgUHJvbWlzZT1nZXRDb25zdHJ1Y3Rvcih0aGlzKSx2YWx1ZXM9W107cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxwdXNoLHZhbHVlcyk7dmFyIHJlbWFpbmluZz12YWx1ZXMubGVuZ3RoLHJlc3VsdHM9QXJyYXkocmVtYWluaW5nKTtpZihyZW1haW5pbmcpZm9yRWFjaC5jYWxsKHZhbHVlcyxmdW5jdGlvbihwcm9taXNlLGluZGV4KXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7cmVzdWx0c1tpbmRleF09dmFsdWU7LS1yZW1haW5pbmd8fHJlc29sdmUocmVzdWx0cyl9LHJlamVjdCl9KTtlbHNlIHJlc29sdmUocmVzdWx0cyl9KX0scmFjZTpmdW5jdGlvbihpdGVyYWJsZSl7dmFyIFByb21pc2U9Z2V0Q29uc3RydWN0b3IodGhpcyk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxmdW5jdGlvbihwcm9taXNlKXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXNvbHZlLHJlamVjdCl9KX0pfSxyZWplY3Q6ZnVuY3Rpb24ocil7cmV0dXJuIG5ldyhnZXRDb25zdHJ1Y3Rvcih0aGlzKSkoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3JlamVjdChyKX0pfSxyZXNvbHZlOmZ1bmN0aW9uKHgpe3JldHVybiBpc09iamVjdCh4KSYmREVGIGluIHgmJmdldFByb3RvdHlwZU9mKHgpPT09dGhpc1tQUk9UT1RZUEVdP3g6bmV3KGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7cmVzb2x2ZSh4KX0pfX0pfShuZXh0VGlja3x8c2V0SW1tZWRpYXRlLHNhZmVTeW1ib2woXCJkZWZcIikpO3NldFRvU3RyaW5nVGFnKFByb21pc2UsUFJPTUlTRSk7c2V0U3BlY2llcyhQcm9taXNlKTskZGVmaW5lKEdMT0JBTCtGT1JDRUQqIWlzTmF0aXZlKFByb21pc2UpLHtQcm9taXNlOlByb21pc2V9KX0oZ2xvYmFsW1BST01JU0VdKTshZnVuY3Rpb24oKXt2YXIgVUlEPXNhZmVTeW1ib2woXCJ1aWRcIiksTzE9c2FmZVN5bWJvbChcIk8xXCIpLFdFQUs9c2FmZVN5bWJvbChcIndlYWtcIiksTEVBSz1zYWZlU3ltYm9sKFwibGVha1wiKSxMQVNUPXNhZmVTeW1ib2woXCJsYXN0XCIpLEZJUlNUPXNhZmVTeW1ib2woXCJmaXJzdFwiKSxTSVpFPURFU0M/c2FmZVN5bWJvbChcInNpemVcIik6XCJzaXplXCIsdWlkPTAsdG1wPXt9O2Z1bmN0aW9uIGdldENvbGxlY3Rpb24oQyxOQU1FLG1ldGhvZHMsY29tbW9uTWV0aG9kcyxpc01hcCxpc1dlYWspe3ZhciBBRERFUj1pc01hcD9cInNldFwiOlwiYWRkXCIscHJvdG89QyYmQ1tQUk9UT1RZUEVdLE89e307ZnVuY3Rpb24gaW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKXtpZihpdGVyYWJsZSE9dW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLGlzTWFwLHRoYXRbQURERVJdLHRoYXQpO3JldHVybiB0aGF0fWZ1bmN0aW9uIGZpeFNWWihrZXksY2hhaW4pe3ZhciBtZXRob2Q9cHJvdG9ba2V5XTtpZihmcmFtZXdvcmspcHJvdG9ba2V5XT1mdW5jdGlvbihhLGIpe3ZhciByZXN1bHQ9bWV0aG9kLmNhbGwodGhpcyxhPT09MD8wOmEsYik7cmV0dXJuIGNoYWluP3RoaXM6cmVzdWx0fX1pZighaXNOYXRpdmUoQyl8fCEoaXNXZWFrfHwhQlVHR1lfSVRFUkFUT1JTJiZoYXMocHJvdG8sRk9SX0VBQ0gpJiZoYXMocHJvdG8sXCJlbnRyaWVzXCIpKSl7Qz1pc1dlYWs/ZnVuY3Rpb24oaXRlcmFibGUpe2Fzc2VydEluc3RhbmNlKHRoaXMsQyxOQU1FKTtzZXQodGhpcyxVSUQsdWlkKyspO2luaXRGcm9tSXRlcmFibGUodGhpcyxpdGVyYWJsZSl9OmZ1bmN0aW9uKGl0ZXJhYmxlKXt2YXIgdGhhdD10aGlzO2Fzc2VydEluc3RhbmNlKHRoYXQsQyxOQU1FKTtzZXQodGhhdCxPMSxjcmVhdGUobnVsbCkpO3NldCh0aGF0LFNJWkUsMCk7c2V0KHRoYXQsTEFTVCx1bmRlZmluZWQpO3NldCh0aGF0LEZJUlNULHVuZGVmaW5lZCk7aW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKX07YXNzaWduSGlkZGVuKGFzc2lnbkhpZGRlbihDW1BST1RPVFlQRV0sbWV0aG9kcyksY29tbW9uTWV0aG9kcyk7aXNXZWFrfHxkZWZpbmVQcm9wZXJ0eShDW1BST1RPVFlQRV0sXCJzaXplXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBhc3NlcnREZWZpbmVkKHRoaXNbU0laRV0pfX0pfWVsc2V7dmFyIE5hdGl2ZT1DLGluc3Q9bmV3IEMsY2hhaW49aW5zdFtBRERFUl0oaXNXZWFrP3t9Oi0wLDEpLGJ1Z2d5WmVybztpZighTkFUSVZFX0lURVJBVE9SU3x8IUMubGVuZ3RoKXtDPWZ1bmN0aW9uKGl0ZXJhYmxlKXthc3NlcnRJbnN0YW5jZSh0aGlzLEMsTkFNRSk7cmV0dXJuIGluaXRGcm9tSXRlcmFibGUobmV3IE5hdGl2ZSxpdGVyYWJsZSl9O0NbUFJPVE9UWVBFXT1wcm90bztpZihmcmFtZXdvcmspcHJvdG9bQ09OU1RSVUNUT1JdPUN9aXNXZWFrfHxpbnN0W0ZPUl9FQUNIXShmdW5jdGlvbih2YWwsa2V5KXtidWdneVplcm89MS9rZXk9PT0tSW5maW5pdHl9KTtpZihidWdneVplcm8pe2ZpeFNWWihcImRlbGV0ZVwiKTtmaXhTVlooXCJoYXNcIik7aXNNYXAmJmZpeFNWWihcImdldFwiKX1pZihidWdneVplcm98fGNoYWluIT09aW5zdClmaXhTVlooQURERVIsdHJ1ZSl9c2V0VG9TdHJpbmdUYWcoQyxOQU1FKTtzZXRTcGVjaWVzKEMpO09bTkFNRV09QzskZGVmaW5lKEdMT0JBTCtXUkFQK0ZPUkNFRCohaXNOYXRpdmUoQyksTyk7aXNXZWFrfHxkZWZpbmVTdGRJdGVyYXRvcnMoQyxOQU1FLGZ1bmN0aW9uKGl0ZXJhdGVkLGtpbmQpe3NldCh0aGlzLElURVIse286aXRlcmF0ZWQsazpraW5kfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxraW5kPWl0ZXIuayxlbnRyeT1pdGVyLmw7d2hpbGUoZW50cnkmJmVudHJ5LnIpZW50cnk9ZW50cnkucDtpZighaXRlci5vfHwhKGl0ZXIubD1lbnRyeT1lbnRyeT9lbnRyeS5uOml0ZXIub1tGSVJTVF0pKXtpdGVyLm89dW5kZWZpbmVkO3JldHVybiBpdGVyUmVzdWx0KDEpfWlmKGtpbmQ9PUtFWSlyZXR1cm4gaXRlclJlc3VsdCgwLGVudHJ5LmspO2lmKGtpbmQ9PVZBTFVFKXJldHVybiBpdGVyUmVzdWx0KDAsZW50cnkudik7cmV0dXJuIGl0ZXJSZXN1bHQoMCxbZW50cnkuayxlbnRyeS52XSl9LGlzTWFwP0tFWStWQUxVRTpWQUxVRSwhaXNNYXApO3JldHVybiBDfWZ1bmN0aW9uIGZhc3RLZXkoaXQsY3JlYXRlKXtpZighaXNPYmplY3QoaXQpKXJldHVybih0eXBlb2YgaXQ9PVwic3RyaW5nXCI/XCJTXCI6XCJQXCIpK2l0O2lmKGlzRnJvemVuKGl0KSlyZXR1cm5cIkZcIjtpZighaGFzKGl0LFVJRCkpe2lmKCFjcmVhdGUpcmV0dXJuXCJFXCI7aGlkZGVuKGl0LFVJRCwrK3VpZCl9cmV0dXJuXCJPXCIraXRbVUlEXX1mdW5jdGlvbiBnZXRFbnRyeSh0aGF0LGtleSl7dmFyIGluZGV4PWZhc3RLZXkoa2V5KSxlbnRyeTtpZihpbmRleCE9XCJGXCIpcmV0dXJuIHRoYXRbTzFdW2luZGV4XTtmb3IoZW50cnk9dGhhdFtGSVJTVF07ZW50cnk7ZW50cnk9ZW50cnkubil7aWYoZW50cnkuaz09a2V5KXJldHVybiBlbnRyeX19ZnVuY3Rpb24gZGVmKHRoYXQsa2V5LHZhbHVlKXt2YXIgZW50cnk9Z2V0RW50cnkodGhhdCxrZXkpLHByZXYsaW5kZXg7aWYoZW50cnkpZW50cnkudj12YWx1ZTtlbHNle3RoYXRbTEFTVF09ZW50cnk9e2k6aW5kZXg9ZmFzdEtleShrZXksdHJ1ZSksazprZXksdjp2YWx1ZSxwOnByZXY9dGhhdFtMQVNUXSxuOnVuZGVmaW5lZCxyOmZhbHNlfTtpZighdGhhdFtGSVJTVF0pdGhhdFtGSVJTVF09ZW50cnk7aWYocHJldilwcmV2Lm49ZW50cnk7dGhhdFtTSVpFXSsrO2lmKGluZGV4IT1cIkZcIil0aGF0W08xXVtpbmRleF09ZW50cnl9cmV0dXJuIHRoYXR9dmFyIGNvbGxlY3Rpb25NZXRob2RzPXtjbGVhcjpmdW5jdGlvbigpe2Zvcih2YXIgdGhhdD10aGlzLGRhdGE9dGhhdFtPMV0sZW50cnk9dGhhdFtGSVJTVF07ZW50cnk7ZW50cnk9ZW50cnkubil7ZW50cnkucj10cnVlO2lmKGVudHJ5LnApZW50cnkucD1lbnRyeS5wLm49dW5kZWZpbmVkO2RlbGV0ZSBkYXRhW2VudHJ5LmldfXRoYXRbRklSU1RdPXRoYXRbTEFTVF09dW5kZWZpbmVkO3RoYXRbU0laRV09MH0sXCJkZWxldGVcIjpmdW5jdGlvbihrZXkpe3ZhciB0aGF0PXRoaXMsZW50cnk9Z2V0RW50cnkodGhhdCxrZXkpO2lmKGVudHJ5KXt2YXIgbmV4dD1lbnRyeS5uLHByZXY9ZW50cnkucDtkZWxldGUgdGhhdFtPMV1bZW50cnkuaV07ZW50cnkucj10cnVlO2lmKHByZXYpcHJldi5uPW5leHQ7aWYobmV4dCluZXh0LnA9cHJldjtpZih0aGF0W0ZJUlNUXT09ZW50cnkpdGhhdFtGSVJTVF09bmV4dDtpZih0aGF0W0xBU1RdPT1lbnRyeSl0aGF0W0xBU1RdPXByZXY7XG50aGF0W1NJWkVdLS19cmV0dXJuISFlbnRyeX0sZm9yRWFjaDpmdW5jdGlvbihjYWxsYmFja2ZuKXt2YXIgZj1jdHgoY2FsbGJhY2tmbixhcmd1bWVudHNbMV0sMyksZW50cnk7d2hpbGUoZW50cnk9ZW50cnk/ZW50cnkubjp0aGlzW0ZJUlNUXSl7ZihlbnRyeS52LGVudHJ5LmssdGhpcyk7d2hpbGUoZW50cnkmJmVudHJ5LnIpZW50cnk9ZW50cnkucH19LGhhczpmdW5jdGlvbihrZXkpe3JldHVybiEhZ2V0RW50cnkodGhpcyxrZXkpfX07TWFwPWdldENvbGxlY3Rpb24oTWFwLE1BUCx7Z2V0OmZ1bmN0aW9uKGtleSl7dmFyIGVudHJ5PWdldEVudHJ5KHRoaXMsa2V5KTtyZXR1cm4gZW50cnkmJmVudHJ5LnZ9LHNldDpmdW5jdGlvbihrZXksdmFsdWUpe3JldHVybiBkZWYodGhpcyxrZXk9PT0wPzA6a2V5LHZhbHVlKX19LGNvbGxlY3Rpb25NZXRob2RzLHRydWUpO1NldD1nZXRDb2xsZWN0aW9uKFNldCxTRVQse2FkZDpmdW5jdGlvbih2YWx1ZSl7cmV0dXJuIGRlZih0aGlzLHZhbHVlPXZhbHVlPT09MD8wOnZhbHVlLHZhbHVlKX19LGNvbGxlY3Rpb25NZXRob2RzKTtmdW5jdGlvbiBkZWZXZWFrKHRoYXQsa2V5LHZhbHVlKXtpZihpc0Zyb3plbihhc3NlcnRPYmplY3Qoa2V5KSkpbGVha1N0b3JlKHRoYXQpLnNldChrZXksdmFsdWUpO2Vsc2V7aGFzKGtleSxXRUFLKXx8aGlkZGVuKGtleSxXRUFLLHt9KTtrZXlbV0VBS11bdGhhdFtVSURdXT12YWx1ZX1yZXR1cm4gdGhhdH1mdW5jdGlvbiBsZWFrU3RvcmUodGhhdCl7cmV0dXJuIHRoYXRbTEVBS118fGhpZGRlbih0aGF0LExFQUssbmV3IE1hcClbTEVBS119dmFyIHdlYWtNZXRob2RzPXtcImRlbGV0ZVwiOmZ1bmN0aW9uKGtleSl7aWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO2lmKGlzRnJvemVuKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKVtcImRlbGV0ZVwiXShrZXkpO3JldHVybiBoYXMoa2V5LFdFQUspJiZoYXMoa2V5W1dFQUtdLHRoaXNbVUlEXSkmJmRlbGV0ZSBrZXlbV0VBS11bdGhpc1tVSURdXX0saGFzOmZ1bmN0aW9uKGtleSl7aWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO2lmKGlzRnJvemVuKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKS5oYXMoa2V5KTtyZXR1cm4gaGFzKGtleSxXRUFLKSYmaGFzKGtleVtXRUFLXSx0aGlzW1VJRF0pfX07V2Vha01hcD1nZXRDb2xsZWN0aW9uKFdlYWtNYXAsV0VBS01BUCx7Z2V0OmZ1bmN0aW9uKGtleSl7aWYoaXNPYmplY3Qoa2V5KSl7aWYoaXNGcm96ZW4oa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpLmdldChrZXkpO2lmKGhhcyhrZXksV0VBSykpcmV0dXJuIGtleVtXRUFLXVt0aGlzW1VJRF1dfX0sc2V0OmZ1bmN0aW9uKGtleSx2YWx1ZSl7cmV0dXJuIGRlZldlYWsodGhpcyxrZXksdmFsdWUpfX0sd2Vha01ldGhvZHMsdHJ1ZSx0cnVlKTtpZihmcmFtZXdvcmsmJihuZXcgV2Vha01hcCkuc2V0KE9iamVjdC5mcmVlemUodG1wKSw3KS5nZXQodG1wKSE9Nyl7Zm9yRWFjaC5jYWxsKGFycmF5KFwiZGVsZXRlLGhhcyxnZXQsc2V0XCIpLGZ1bmN0aW9uKGtleSl7dmFyIG1ldGhvZD1XZWFrTWFwW1BST1RPVFlQRV1ba2V5XTtXZWFrTWFwW1BST1RPVFlQRV1ba2V5XT1mdW5jdGlvbihhLGIpe2lmKGlzT2JqZWN0KGEpJiZpc0Zyb3plbihhKSl7dmFyIHJlc3VsdD1sZWFrU3RvcmUodGhpcylba2V5XShhLGIpO3JldHVybiBrZXk9PVwic2V0XCI/dGhpczpyZXN1bHR9cmV0dXJuIG1ldGhvZC5jYWxsKHRoaXMsYSxiKX19KX1XZWFrU2V0PWdldENvbGxlY3Rpb24oV2Vha1NldCxXRUFLU0VULHthZGQ6ZnVuY3Rpb24odmFsdWUpe3JldHVybiBkZWZXZWFrKHRoaXMsdmFsdWUsdHJ1ZSl9fSx3ZWFrTWV0aG9kcyxmYWxzZSx0cnVlKX0oKTshZnVuY3Rpb24oKXtmdW5jdGlvbiBFbnVtZXJhdGUoaXRlcmF0ZWQpe3ZhciBrZXlzPVtdLGtleTtmb3Ioa2V5IGluIGl0ZXJhdGVkKWtleXMucHVzaChrZXkpO3NldCh0aGlzLElURVIse286aXRlcmF0ZWQsYTprZXlzLGk6MH0pfWNyZWF0ZUl0ZXJhdG9yKEVudW1lcmF0ZSxPQkpFQ1QsZnVuY3Rpb24oKXt2YXIgaXRlcj10aGlzW0lURVJdLGtleXM9aXRlci5hLGtleTtkb3tpZihpdGVyLmk+PWtleXMubGVuZ3RoKXJldHVybiBpdGVyUmVzdWx0KDEpfXdoaWxlKCEoKGtleT1rZXlzW2l0ZXIuaSsrXSlpbiBpdGVyLm8pKTtyZXR1cm4gaXRlclJlc3VsdCgwLGtleSl9KTtmdW5jdGlvbiB3cmFwKGZuKXtyZXR1cm4gZnVuY3Rpb24oaXQpe2Fzc2VydE9iamVjdChpdCk7dHJ5e3JldHVybiBmbi5hcHBseSh1bmRlZmluZWQsYXJndW1lbnRzKSx0cnVlfWNhdGNoKGUpe3JldHVybiBmYWxzZX19fWZ1bmN0aW9uIHJlZmxlY3RHZXQodGFyZ2V0LHByb3BlcnR5S2V5KXt2YXIgcmVjZWl2ZXI9YXJndW1lbnRzLmxlbmd0aDwzP3RhcmdldDphcmd1bWVudHNbMl0sZGVzYz1nZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KSxwcm90bztpZihkZXNjKXJldHVybiBoYXMoZGVzYyxcInZhbHVlXCIpP2Rlc2MudmFsdWU6ZGVzYy5nZXQ9PT11bmRlZmluZWQ/dW5kZWZpbmVkOmRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO3JldHVybiBpc09iamVjdChwcm90bz1nZXRQcm90b3R5cGVPZih0YXJnZXQpKT9yZWZsZWN0R2V0KHByb3RvLHByb3BlcnR5S2V5LHJlY2VpdmVyKTp1bmRlZmluZWR9ZnVuY3Rpb24gcmVmbGVjdFNldCh0YXJnZXQscHJvcGVydHlLZXksVil7dmFyIHJlY2VpdmVyPWFyZ3VtZW50cy5sZW5ndGg8ND90YXJnZXQ6YXJndW1lbnRzWzNdLG93bkRlc2M9Z2V0T3duRGVzY3JpcHRvcihhc3NlcnRPYmplY3QodGFyZ2V0KSxwcm9wZXJ0eUtleSksZXhpc3RpbmdEZXNjcmlwdG9yLHByb3RvO2lmKCFvd25EZXNjKXtpZihpc09iamVjdChwcm90bz1nZXRQcm90b3R5cGVPZih0YXJnZXQpKSl7cmV0dXJuIHJlZmxlY3RTZXQocHJvdG8scHJvcGVydHlLZXksVixyZWNlaXZlcil9b3duRGVzYz1kZXNjcmlwdG9yKDApfWlmKGhhcyhvd25EZXNjLFwidmFsdWVcIikpe2lmKG93bkRlc2Mud3JpdGFibGU9PT1mYWxzZXx8IWlzT2JqZWN0KHJlY2VpdmVyKSlyZXR1cm4gZmFsc2U7ZXhpc3RpbmdEZXNjcmlwdG9yPWdldE93bkRlc2NyaXB0b3IocmVjZWl2ZXIscHJvcGVydHlLZXkpfHxkZXNjcmlwdG9yKDApO2V4aXN0aW5nRGVzY3JpcHRvci52YWx1ZT1WO3JldHVybiBkZWZpbmVQcm9wZXJ0eShyZWNlaXZlcixwcm9wZXJ0eUtleSxleGlzdGluZ0Rlc2NyaXB0b3IpLHRydWV9cmV0dXJuIG93bkRlc2Muc2V0PT09dW5kZWZpbmVkP2ZhbHNlOihvd25EZXNjLnNldC5jYWxsKHJlY2VpdmVyLFYpLHRydWUpfXZhciBpc0V4dGVuc2libGU9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8cmV0dXJuSXQ7dmFyIHJlZmxlY3Q9e2FwcGx5OmN0eChjYWxsLGFwcGx5LDMpLGNvbnN0cnVjdDpjb25zdHJ1Y3QsZGVmaW5lUHJvcGVydHk6d3JhcChkZWZpbmVQcm9wZXJ0eSksZGVsZXRlUHJvcGVydHk6ZnVuY3Rpb24odGFyZ2V0LHByb3BlcnR5S2V5KXt2YXIgZGVzYz1nZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KTtyZXR1cm4gZGVzYyYmIWRlc2MuY29uZmlndXJhYmxlP2ZhbHNlOmRlbGV0ZSB0YXJnZXRbcHJvcGVydHlLZXldfSxlbnVtZXJhdGU6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4gbmV3IEVudW1lcmF0ZShhc3NlcnRPYmplY3QodGFyZ2V0KSl9LGdldDpyZWZsZWN0R2V0LGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpmdW5jdGlvbih0YXJnZXQscHJvcGVydHlLZXkpe3JldHVybiBnZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KX0sZ2V0UHJvdG90eXBlT2Y6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4gZ2V0UHJvdG90eXBlT2YoYXNzZXJ0T2JqZWN0KHRhcmdldCkpfSxoYXM6ZnVuY3Rpb24odGFyZ2V0LHByb3BlcnR5S2V5KXtyZXR1cm4gcHJvcGVydHlLZXkgaW4gdGFyZ2V0fSxpc0V4dGVuc2libGU6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4hIWlzRXh0ZW5zaWJsZShhc3NlcnRPYmplY3QodGFyZ2V0KSl9LG93bktleXM6b3duS2V5cyxwcmV2ZW50RXh0ZW5zaW9uczp3cmFwKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9uc3x8cmV0dXJuSXQpLHNldDpyZWZsZWN0U2V0fTtpZihzZXRQcm90b3R5cGVPZilyZWZsZWN0LnNldFByb3RvdHlwZU9mPWZ1bmN0aW9uKHRhcmdldCxwcm90byl7cmV0dXJuIHNldFByb3RvdHlwZU9mKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3RvKSx0cnVlfTskZGVmaW5lKEdMT0JBTCx7UmVmbGVjdDp7fX0pOyRkZWZpbmUoU1RBVElDLFwiUmVmbGVjdFwiLHJlZmxlY3QpfSgpOyFmdW5jdGlvbigpeyRkZWZpbmUoUFJPVE8sQVJSQVkse2luY2x1ZGVzOmNyZWF0ZUFycmF5Q29udGFpbnModHJ1ZSl9KTskZGVmaW5lKFBST1RPLFNUUklORyx7YXQ6Y3JlYXRlUG9pbnRBdCh0cnVlKX0pO2Z1bmN0aW9uIGNyZWF0ZU9iamVjdFRvQXJyYXkoaXNFbnRyaWVzKXtyZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXt2YXIgTz10b09iamVjdChvYmplY3QpLGtleXM9Z2V0S2V5cyhvYmplY3QpLGxlbmd0aD1rZXlzLmxlbmd0aCxpPTAscmVzdWx0PUFycmF5KGxlbmd0aCksa2V5O2lmKGlzRW50cmllcyl3aGlsZShsZW5ndGg+aSlyZXN1bHRbaV09W2tleT1rZXlzW2krK10sT1trZXldXTtlbHNlIHdoaWxlKGxlbmd0aD5pKXJlc3VsdFtpXT1PW2tleXNbaSsrXV07cmV0dXJuIHJlc3VsdH19JGRlZmluZShTVEFUSUMsT0JKRUNULHt2YWx1ZXM6Y3JlYXRlT2JqZWN0VG9BcnJheShmYWxzZSksZW50cmllczpjcmVhdGVPYmplY3RUb0FycmF5KHRydWUpfSk7JGRlZmluZShTVEFUSUMsUkVHRVhQLHtlc2NhcGU6Y3JlYXRlUmVwbGFjZXIoLyhbXFxcXFxcLVtcXF17fSgpKis/LixeJHxdKS9nLFwiXFxcXCQxXCIsdHJ1ZSl9KX0oKTshZnVuY3Rpb24oUkVGRVJFTkNFKXtSRUZFUkVOQ0VfR0VUPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJHZXRcIix0cnVlKTt2YXIgUkVGRVJFTkNFX1NFVD1nZXRXZWxsS25vd25TeW1ib2woUkVGRVJFTkNFK1NFVCx0cnVlKSxSRUZFUkVOQ0VfREVMRVRFPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJEZWxldGVcIix0cnVlKTskZGVmaW5lKFNUQVRJQyxTWU1CT0wse3JlZmVyZW5jZUdldDpSRUZFUkVOQ0VfR0VULHJlZmVyZW5jZVNldDpSRUZFUkVOQ0VfU0VULHJlZmVyZW5jZURlbGV0ZTpSRUZFUkVOQ0VfREVMRVRFfSk7aGlkZGVuKEZ1bmN0aW9uUHJvdG8sUkVGRVJFTkNFX0dFVCxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRNYXBNZXRob2RzKENvbnN0cnVjdG9yKXtpZihDb25zdHJ1Y3Rvcil7dmFyIE1hcFByb3RvPUNvbnN0cnVjdG9yW1BST1RPVFlQRV07aGlkZGVuKE1hcFByb3RvLFJFRkVSRU5DRV9HRVQsTWFwUHJvdG8uZ2V0KTtoaWRkZW4oTWFwUHJvdG8sUkVGRVJFTkNFX1NFVCxNYXBQcm90by5zZXQpO2hpZGRlbihNYXBQcm90byxSRUZFUkVOQ0VfREVMRVRFLE1hcFByb3RvW1wiZGVsZXRlXCJdKX19c2V0TWFwTWV0aG9kcyhNYXApO3NldE1hcE1ldGhvZHMoV2Vha01hcCl9KFwicmVmZXJlbmNlXCIpOyFmdW5jdGlvbihhcnJheVN0YXRpY3Mpe2Z1bmN0aW9uIHNldEFycmF5U3RhdGljcyhrZXlzLGxlbmd0aCl7Zm9yRWFjaC5jYWxsKGFycmF5KGtleXMpLGZ1bmN0aW9uKGtleSl7aWYoa2V5IGluIEFycmF5UHJvdG8pYXJyYXlTdGF0aWNzW2tleV09Y3R4KGNhbGwsQXJyYXlQcm90b1trZXldLGxlbmd0aCl9KX1zZXRBcnJheVN0YXRpY3MoXCJwb3AscmV2ZXJzZSxzaGlmdCxrZXlzLHZhbHVlcyxlbnRyaWVzXCIsMSk7c2V0QXJyYXlTdGF0aWNzKFwiaW5kZXhPZixldmVyeSxzb21lLGZvckVhY2gsbWFwLGZpbHRlcixmaW5kLGZpbmRJbmRleCxpbmNsdWRlc1wiLDMpO3NldEFycmF5U3RhdGljcyhcImpvaW4sc2xpY2UsY29uY2F0LHB1c2gsc3BsaWNlLHVuc2hpZnQsc29ydCxsYXN0SW5kZXhPZixcIitcInJlZHVjZSxyZWR1Y2VSaWdodCxjb3B5V2l0aGluLGZpbGwsdHVyblwiKTskZGVmaW5lKFNUQVRJQyxBUlJBWSxhcnJheVN0YXRpY3MpfSh7fSk7IWZ1bmN0aW9uKE5vZGVMaXN0KXtpZihmcmFtZXdvcmsmJk5vZGVMaXN0JiYhKFNZTUJPTF9JVEVSQVRPUiBpbiBOb2RlTGlzdFtQUk9UT1RZUEVdKSl7aGlkZGVuKE5vZGVMaXN0W1BST1RPVFlQRV0sU1lNQk9MX0lURVJBVE9SLEl0ZXJhdG9yc1tBUlJBWV0pfUl0ZXJhdG9ycy5Ob2RlTGlzdD1JdGVyYXRvcnNbQVJSQVldfShnbG9iYWwuTm9kZUxpc3QpfSh0eXBlb2Ygc2VsZiE9XCJ1bmRlZmluZWRcIiYmc2VsZi5NYXRoPT09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSx0cnVlKX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyFmdW5jdGlvbihnbG9iYWwpe1widXNlIHN0cmljdFwiO3ZhciBoYXNPd249T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgdW5kZWZpbmVkO3ZhciBpdGVyYXRvclN5bWJvbD10eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZTeW1ib2wuaXRlcmF0b3J8fFwiQEBpdGVyYXRvclwiO3ZhciBpbk1vZHVsZT10eXBlb2YgbW9kdWxlPT09XCJvYmplY3RcIjt2YXIgcnVudGltZT1nbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO2lmKHJ1bnRpbWUpe2lmKGluTW9kdWxlKXttb2R1bGUuZXhwb3J0cz1ydW50aW1lfXJldHVybn1ydW50aW1lPWdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU9aW5Nb2R1bGU/bW9kdWxlLmV4cG9ydHM6e307ZnVuY3Rpb24gd3JhcChpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMb2NzTGlzdCl7cmV0dXJuIG5ldyBHZW5lcmF0b3IoaW5uZXJGbixvdXRlckZuLHNlbGZ8fG51bGwsdHJ5TG9jc0xpc3R8fFtdKX1ydW50aW1lLndyYXA9d3JhcDtmdW5jdGlvbiB0cnlDYXRjaChmbixvYmosYXJnKXt0cnl7cmV0dXJue3R5cGU6XCJub3JtYWxcIixhcmc6Zm4uY2FsbChvYmosYXJnKX19Y2F0Y2goZXJyKXtyZXR1cm57dHlwZTpcInRocm93XCIsYXJnOmVycn19fXZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0PVwic3VzcGVuZGVkU3RhcnRcIjt2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZD1cInN1c3BlbmRlZFlpZWxkXCI7dmFyIEdlblN0YXRlRXhlY3V0aW5nPVwiZXhlY3V0aW5nXCI7dmFyIEdlblN0YXRlQ29tcGxldGVkPVwiY29tcGxldGVkXCI7dmFyIENvbnRpbnVlU2VudGluZWw9e307ZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKXt9ZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKXt9dmFyIEdwPUdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZT1HZW5lcmF0b3IucHJvdG90eXBlO0dlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZT1HcC5jb25zdHJ1Y3Rvcj1HZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1HZW5lcmF0b3JGdW5jdGlvbjtHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZT1cIkdlbmVyYXRvckZ1bmN0aW9uXCI7cnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uPWZ1bmN0aW9uKGdlbkZ1bil7dmFyIGN0b3I9dHlwZW9mIGdlbkZ1bj09PVwiZnVuY3Rpb25cIiYmZ2VuRnVuLmNvbnN0cnVjdG9yO3JldHVybiBjdG9yP2N0b3I9PT1HZW5lcmF0b3JGdW5jdGlvbnx8KGN0b3IuZGlzcGxheU5hbWV8fGN0b3IubmFtZSk9PT1cIkdlbmVyYXRvckZ1bmN0aW9uXCI6ZmFsc2V9O3J1bnRpbWUubWFyaz1mdW5jdGlvbihnZW5GdW4pe2dlbkZ1bi5fX3Byb3RvX189R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7Z2VuRnVuLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEdwKTtyZXR1cm4gZ2VuRnVufTtydW50aW1lLmFzeW5jPWZ1bmN0aW9uKGlubmVyRm4sb3V0ZXJGbixzZWxmLHRyeUxvY3NMaXN0KXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3ZhciBnZW5lcmF0b3I9d3JhcChpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMb2NzTGlzdCk7dmFyIGNhbGxOZXh0PXN0ZXAuYmluZChnZW5lcmF0b3IubmV4dCk7dmFyIGNhbGxUaHJvdz1zdGVwLmJpbmQoZ2VuZXJhdG9yW1widGhyb3dcIl0pO2Z1bmN0aW9uIHN0ZXAoYXJnKXt2YXIgcmVjb3JkPXRyeUNhdGNoKHRoaXMsbnVsbCxhcmcpO2lmKHJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXtyZWplY3QocmVjb3JkLmFyZyk7cmV0dXJufXZhciBpbmZvPXJlY29yZC5hcmc7aWYoaW5mby5kb25lKXtyZXNvbHZlKGluZm8udmFsdWUpfWVsc2V7UHJvbWlzZS5yZXNvbHZlKGluZm8udmFsdWUpLnRoZW4oY2FsbE5leHQsY2FsbFRocm93KX19Y2FsbE5leHQoKX0pfTtmdW5jdGlvbiBHZW5lcmF0b3IoaW5uZXJGbixvdXRlckZuLHNlbGYsdHJ5TG9jc0xpc3Qpe3ZhciBnZW5lcmF0b3I9b3V0ZXJGbj9PYmplY3QuY3JlYXRlKG91dGVyRm4ucHJvdG90eXBlKTp0aGlzO3ZhciBjb250ZXh0PW5ldyBDb250ZXh0KHRyeUxvY3NMaXN0KTt2YXIgc3RhdGU9R2VuU3RhdGVTdXNwZW5kZWRTdGFydDtmdW5jdGlvbiBpbnZva2UobWV0aG9kLGFyZyl7aWYoc3RhdGU9PT1HZW5TdGF0ZUV4ZWN1dGluZyl7dGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKX1pZihzdGF0ZT09PUdlblN0YXRlQ29tcGxldGVkKXtyZXR1cm4gZG9uZVJlc3VsdCgpfXdoaWxlKHRydWUpe3ZhciBkZWxlZ2F0ZT1jb250ZXh0LmRlbGVnYXRlO2lmKGRlbGVnYXRlKXt2YXIgcmVjb3JkPXRyeUNhdGNoKGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sZGVsZWdhdGUuaXRlcmF0b3IsYXJnKTtpZihyZWNvcmQudHlwZT09PVwidGhyb3dcIil7Y29udGV4dC5kZWxlZ2F0ZT1udWxsO21ldGhvZD1cInRocm93XCI7YXJnPXJlY29yZC5hcmc7Y29udGludWV9bWV0aG9kPVwibmV4dFwiO2FyZz11bmRlZmluZWQ7dmFyIGluZm89cmVjb3JkLmFyZztpZihpbmZvLmRvbmUpe2NvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV09aW5mby52YWx1ZTtjb250ZXh0Lm5leHQ9ZGVsZWdhdGUubmV4dExvY31lbHNle3N0YXRlPUdlblN0YXRlU3VzcGVuZGVkWWllbGQ7cmV0dXJuIGluZm99Y29udGV4dC5kZWxlZ2F0ZT1udWxsfWlmKG1ldGhvZD09PVwibmV4dFwiKXtpZihzdGF0ZT09PUdlblN0YXRlU3VzcGVuZGVkU3RhcnQmJnR5cGVvZiBhcmchPT1cInVuZGVmaW5lZFwiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdCB0byBzZW5kIFwiK0pTT04uc3RyaW5naWZ5KGFyZykrXCIgdG8gbmV3Ym9ybiBnZW5lcmF0b3JcIil9aWYoc3RhdGU9PT1HZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKXtjb250ZXh0LnNlbnQ9YXJnfWVsc2V7ZGVsZXRlIGNvbnRleHQuc2VudH19ZWxzZSBpZihtZXRob2Q9PT1cInRocm93XCIpe2lmKHN0YXRlPT09R2VuU3RhdGVTdXNwZW5kZWRTdGFydCl7c3RhdGU9R2VuU3RhdGVDb21wbGV0ZWQ7dGhyb3cgYXJnfWlmKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSl7bWV0aG9kPVwibmV4dFwiO2FyZz11bmRlZmluZWR9fWVsc2UgaWYobWV0aG9kPT09XCJyZXR1cm5cIil7Y29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIixhcmcpfXN0YXRlPUdlblN0YXRlRXhlY3V0aW5nO3ZhciByZWNvcmQ9dHJ5Q2F0Y2goaW5uZXJGbixzZWxmLGNvbnRleHQpO2lmKHJlY29yZC50eXBlPT09XCJub3JtYWxcIil7c3RhdGU9Y29udGV4dC5kb25lP0dlblN0YXRlQ29tcGxldGVkOkdlblN0YXRlU3VzcGVuZGVkWWllbGQ7dmFyIGluZm89e3ZhbHVlOnJlY29yZC5hcmcsZG9uZTpjb250ZXh0LmRvbmV9O2lmKHJlY29yZC5hcmc9PT1Db250aW51ZVNlbnRpbmVsKXtpZihjb250ZXh0LmRlbGVnYXRlJiZtZXRob2Q9PT1cIm5leHRcIil7YXJnPXVuZGVmaW5lZH19ZWxzZXtyZXR1cm4gaW5mb319ZWxzZSBpZihyZWNvcmQudHlwZT09PVwidGhyb3dcIil7c3RhdGU9R2VuU3RhdGVDb21wbGV0ZWQ7aWYobWV0aG9kPT09XCJuZXh0XCIpe2NvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24ocmVjb3JkLmFyZyl9ZWxzZXthcmc9cmVjb3JkLmFyZ319fX1nZW5lcmF0b3IubmV4dD1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJuZXh0XCIpO2dlbmVyYXRvcltcInRocm93XCJdPWludm9rZS5iaW5kKGdlbmVyYXRvcixcInRocm93XCIpO2dlbmVyYXRvcltcInJldHVyblwiXT1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJyZXR1cm5cIik7cmV0dXJuIGdlbmVyYXRvcn1HcFtpdGVyYXRvclN5bWJvbF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307R3AudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIltvYmplY3QgR2VuZXJhdG9yXVwifTtmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcyl7dmFyIGVudHJ5PXt0cnlMb2M6bG9jc1swXX07aWYoMSBpbiBsb2NzKXtlbnRyeS5jYXRjaExvYz1sb2NzWzFdfWlmKDIgaW4gbG9jcyl7ZW50cnkuZmluYWxseUxvYz1sb2NzWzJdO2VudHJ5LmFmdGVyTG9jPWxvY3NbM119dGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpfWZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpe3ZhciByZWNvcmQ9ZW50cnkuY29tcGxldGlvbnx8e307cmVjb3JkLnR5cGU9XCJub3JtYWxcIjtkZWxldGUgcmVjb3JkLmFyZztlbnRyeS5jb21wbGV0aW9uPXJlY29yZH1mdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KXt0aGlzLnRyeUVudHJpZXM9W3t0cnlMb2M6XCJyb290XCJ9XTt0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSx0aGlzKTt0aGlzLnJlc2V0KCl9cnVudGltZS5rZXlzPWZ1bmN0aW9uKG9iamVjdCl7dmFyIGtleXM9W107Zm9yKHZhciBrZXkgaW4gb2JqZWN0KXtrZXlzLnB1c2goa2V5KX1rZXlzLnJldmVyc2UoKTtyZXR1cm4gZnVuY3Rpb24gbmV4dCgpe3doaWxlKGtleXMubGVuZ3RoKXt2YXIga2V5PWtleXMucG9wKCk7aWYoa2V5IGluIG9iamVjdCl7bmV4dC52YWx1ZT1rZXk7bmV4dC5kb25lPWZhbHNlO3JldHVybiBuZXh0fX1uZXh0LmRvbmU9dHJ1ZTtyZXR1cm4gbmV4dH19O2Z1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSl7aWYoaXRlcmFibGUpe3ZhciBpdGVyYXRvck1ldGhvZD1pdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07aWYoaXRlcmF0b3JNZXRob2Qpe3JldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKX1pZih0eXBlb2YgaXRlcmFibGUubmV4dD09PVwiZnVuY3Rpb25cIil7cmV0dXJuIGl0ZXJhYmxlfWlmKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKXt2YXIgaT0tMSxuZXh0PWZ1bmN0aW9uIG5leHQoKXt3aGlsZSgrK2k8aXRlcmFibGUubGVuZ3RoKXtpZihoYXNPd24uY2FsbChpdGVyYWJsZSxpKSl7bmV4dC52YWx1ZT1pdGVyYWJsZVtpXTtuZXh0LmRvbmU9ZmFsc2U7cmV0dXJuIG5leHR9fW5leHQudmFsdWU9dW5kZWZpbmVkO25leHQuZG9uZT10cnVlO3JldHVybiBuZXh0fTtyZXR1cm4gbmV4dC5uZXh0PW5leHR9fXJldHVybntuZXh0OmRvbmVSZXN1bHR9fXJ1bnRpbWUudmFsdWVzPXZhbHVlcztmdW5jdGlvbiBkb25lUmVzdWx0KCl7cmV0dXJue3ZhbHVlOnVuZGVmaW5lZCxkb25lOnRydWV9fUNvbnRleHQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpDb250ZXh0LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5wcmV2PTA7dGhpcy5uZXh0PTA7dGhpcy5zZW50PXVuZGVmaW5lZDt0aGlzLmRvbmU9ZmFsc2U7dGhpcy5kZWxlZ2F0ZT1udWxsO3RoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO2Zvcih2YXIgdGVtcEluZGV4PTAsdGVtcE5hbWU7aGFzT3duLmNhbGwodGhpcyx0ZW1wTmFtZT1cInRcIit0ZW1wSW5kZXgpfHx0ZW1wSW5kZXg8MjA7Kyt0ZW1wSW5kZXgpe3RoaXNbdGVtcE5hbWVdPW51bGx9fSxzdG9wOmZ1bmN0aW9uKCl7dGhpcy5kb25lPXRydWU7dmFyIHJvb3RFbnRyeT10aGlzLnRyeUVudHJpZXNbMF07dmFyIHJvb3RSZWNvcmQ9cm9vdEVudHJ5LmNvbXBsZXRpb247aWYocm9vdFJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByb290UmVjb3JkLmFyZ31yZXR1cm4gdGhpcy5ydmFsfSxkaXNwYXRjaEV4Y2VwdGlvbjpmdW5jdGlvbihleGNlcHRpb24pe2lmKHRoaXMuZG9uZSl7dGhyb3cgZXhjZXB0aW9ufXZhciBjb250ZXh0PXRoaXM7ZnVuY3Rpb24gaGFuZGxlKGxvYyxjYXVnaHQpe3JlY29yZC50eXBlPVwidGhyb3dcIjtyZWNvcmQuYXJnPWV4Y2VwdGlvbjtjb250ZXh0Lm5leHQ9bG9jO3JldHVybiEhY2F1Z2h0fWZvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07dmFyIHJlY29yZD1lbnRyeS5jb21wbGV0aW9uO2lmKGVudHJ5LnRyeUxvYz09PVwicm9vdFwiKXtyZXR1cm4gaGFuZGxlKFwiZW5kXCIpfWlmKGVudHJ5LnRyeUxvYzw9dGhpcy5wcmV2KXt2YXIgaGFzQ2F0Y2g9aGFzT3duLmNhbGwoZW50cnksXCJjYXRjaExvY1wiKTt2YXIgaGFzRmluYWxseT1oYXNPd24uY2FsbChlbnRyeSxcImZpbmFsbHlMb2NcIik7aWYoaGFzQ2F0Y2gmJmhhc0ZpbmFsbHkpe2lmKHRoaXMucHJldjxlbnRyeS5jYXRjaExvYyl7cmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYyx0cnVlKX1lbHNlIGlmKHRoaXMucHJldjxlbnRyeS5maW5hbGx5TG9jKXtyZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpfX1lbHNlIGlmKGhhc0NhdGNoKXtpZih0aGlzLnByZXY8ZW50cnkuY2F0Y2hMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsdHJ1ZSl9fWVsc2UgaWYoaGFzRmluYWxseSl7aWYodGhpcy5wcmV2PGVudHJ5LmZpbmFsbHlMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyl9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIil9fX19LF9maW5kRmluYWxseUVudHJ5OmZ1bmN0aW9uKGZpbmFsbHlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPD10aGlzLnByZXYmJmhhc093bi5jYWxsKGVudHJ5LFwiZmluYWxseUxvY1wiKSYmKGVudHJ5LmZpbmFsbHlMb2M9PT1maW5hbGx5TG9jfHx0aGlzLnByZXY8ZW50cnkuZmluYWxseUxvYykpe3JldHVybiBlbnRyeX19fSxhYnJ1cHQ6ZnVuY3Rpb24odHlwZSxhcmcpe3ZhciBlbnRyeT10aGlzLl9maW5kRmluYWxseUVudHJ5KCk7dmFyIHJlY29yZD1lbnRyeT9lbnRyeS5jb21wbGV0aW9uOnt9O3JlY29yZC50eXBlPXR5cGU7cmVjb3JkLmFyZz1hcmc7aWYoZW50cnkpe3RoaXMubmV4dD1lbnRyeS5maW5hbGx5TG9jfWVsc2V7dGhpcy5jb21wbGV0ZShyZWNvcmQpfXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxjb21wbGV0ZTpmdW5jdGlvbihyZWNvcmQsYWZ0ZXJMb2Mpe2lmKHJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByZWNvcmQuYXJnfWlmKHJlY29yZC50eXBlPT09XCJicmVha1wifHxyZWNvcmQudHlwZT09PVwiY29udGludWVcIil7dGhpcy5uZXh0PXJlY29yZC5hcmd9ZWxzZSBpZihyZWNvcmQudHlwZT09PVwicmV0dXJuXCIpe3RoaXMucnZhbD1yZWNvcmQuYXJnO3RoaXMubmV4dD1cImVuZFwifWVsc2UgaWYocmVjb3JkLnR5cGU9PT1cIm5vcm1hbFwiJiZhZnRlckxvYyl7dGhpcy5uZXh0PWFmdGVyTG9jfXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxmaW5pc2g6ZnVuY3Rpb24oZmluYWxseUxvYyl7dmFyIGVudHJ5PXRoaXMuX2ZpbmRGaW5hbGx5RW50cnkoZmluYWxseUxvYyk7cmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbixlbnRyeS5hZnRlckxvYyl9LFwiY2F0Y2hcIjpmdW5jdGlvbih0cnlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPT09dHJ5TG9jKXt2YXIgcmVjb3JkPWVudHJ5LmNvbXBsZXRpb247aWYocmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3ZhciB0aHJvd249cmVjb3JkLmFyZztyZXNldFRyeUVudHJ5KGVudHJ5KX1yZXR1cm4gdGhyb3dufX10aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIil9LGRlbGVnYXRlWWllbGQ6ZnVuY3Rpb24oaXRlcmFibGUscmVzdWx0TmFtZSxuZXh0TG9jKXt0aGlzLmRlbGVnYXRlPXtpdGVyYXRvcjp2YWx1ZXMoaXRlcmFibGUpLHJlc3VsdE5hbWU6cmVzdWx0TmFtZSxuZXh0TG9jOm5leHRMb2N9O3JldHVybiBDb250aW51ZVNlbnRpbmVsfX19KHR5cGVvZiBnbG9iYWw9PT1cIm9iamVjdFwiP2dsb2JhbDp0eXBlb2Ygd2luZG93PT09XCJvYmplY3RcIj93aW5kb3c6dGhpcyl9KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCI/Z2xvYmFsOnR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiP3dpbmRvdzp7fSl9LHt9XX0se30sWzFdKTsiLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBCYWNvbiwgQnVmZmVyaW5nU291cmNlLCBCdXMsIENvbXBvc2l0ZVVuc3Vic2NyaWJlLCBDb25zdW1pbmdTb3VyY2UsIERlc2MsIERpc3BhdGNoZXIsIEVuZCwgRXJyb3IsIEV2ZW50LCBFdmVudFN0cmVhbSwgRXhjZXB0aW9uLCBJbml0aWFsLCBOZXh0LCBOb25lLCBPYnNlcnZhYmxlLCBQcm9wZXJ0eSwgUHJvcGVydHlEaXNwYXRjaGVyLCBTb21lLCBTb3VyY2UsIFVwZGF0ZUJhcnJpZXIsIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0sIGFzc2VydCwgYXNzZXJ0QXJyYXksIGFzc2VydEV2ZW50U3RyZWFtLCBhc3NlcnRGdW5jdGlvbiwgYXNzZXJ0Tm9Bcmd1bWVudHMsIGFzc2VydE9ic2VydmFibGUsIGFzc2VydFN0cmluZywgY2xvbmVBcnJheSwgY29tcG9zaXRlVW5zdWJzY3JpYmUsIGNvbnN0YW50VG9GdW5jdGlvbiwgY29udGFpbnNEdXBsaWNhdGVEZXBzLCBjb252ZXJ0QXJnc1RvRnVuY3Rpb24sIGRlc2NyaWJlLCBlbmQsIGV2ZW50SWRDb3VudGVyLCBmaW5kRGVwcywgZmxhdE1hcF8sIGZvcm1lciwgaWRDb3VudGVyLCBpbml0aWFsLCBpc0FycmF5LCBpc0ZpZWxkS2V5LCBpc0Z1bmN0aW9uLCBpc09ic2VydmFibGUsIGxhdHRlciwgbGlmdENhbGxiYWNrLCBtYWtlRnVuY3Rpb24sIG1ha2VGdW5jdGlvbkFyZ3MsIG1ha2VGdW5jdGlvbl8sIG1ha2VPYnNlcnZhYmxlLCBtYWtlU3Bhd25lciwgbmV4dCwgbm9wLCBwYXJ0aWFsbHlBcHBsaWVkLCByZWN1cnNpb25EZXB0aCwgcmVnaXN0ZXJPYnMsIHNweXMsIHRvQ29tYmluYXRvciwgdG9FdmVudCwgdG9GaWVsZEV4dHJhY3RvciwgdG9GaWVsZEtleSwgdG9PcHRpb24sIHRvU2ltcGxlRXh0cmFjdG9yLCB3aXRoRGVzY3JpcHRpb24sIHdpdGhNZXRob2RDYWxsU3VwcG9ydCwgXywgX3JlZixcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgX19iaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuICBCYWNvbiA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJCYWNvblwiO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi52ZXJzaW9uID0gJzAuNy40Mic7XG5cbiAgRXhjZXB0aW9uID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsICE9PSBudWxsID8gZ2xvYmFsIDogdGhpcykuRXJyb3I7XG5cbiAgXyA9IHtcbiAgICBpbmRleE9mOiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA/IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICByZXR1cm4geHMuaW5kZXhPZih4KTtcbiAgICB9IDogZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHZhciBpLCB5LCBfaSwgX2xlbjtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICB5ID0geHNbaV07XG4gICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIGluZGV4V2hlcmU6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgaSwgeSwgX2ksIF9sZW47XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgICAgeSA9IHhzW2ldO1xuICAgICAgICBpZiAoZih5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBoZWFkOiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzWzBdO1xuICAgIH0sXG4gICAgYWx3YXlzOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgICAgfTtcbiAgICB9LFxuICAgIG5lZ2F0ZTogZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuICFmKHgpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGVtcHR5OiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMDtcbiAgICB9LFxuICAgIHRhaWw6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHMuc2xpY2UoMSwgeHMubGVuZ3RoKTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oZiwgeHMpIHtcbiAgICAgIHZhciBmaWx0ZXJlZCwgeCwgX2ksIF9sZW47XG4gICAgICBmaWx0ZXJlZCA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBpZiAoZih4KSkge1xuICAgICAgICAgIGZpbHRlcmVkLnB1c2goeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24oZiwgeHMpIHtcbiAgICAgIHZhciB4LCBfaSwgX2xlbiwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBfcmVzdWx0cy5wdXNoKGYoeCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH0sXG4gICAgZWFjaDogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciBrZXksIHZhbHVlO1xuICAgICAgZm9yIChrZXkgaW4geHMpIHtcbiAgICAgICAgdmFsdWUgPSB4c1trZXldO1xuICAgICAgICBmKGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICBpZiAoaXNBcnJheSh4cykpIHtcbiAgICAgICAgcmV0dXJuIHhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFt4c107XG4gICAgICB9XG4gICAgfSxcbiAgICBjb250YWluczogZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHJldHVybiBfLmluZGV4T2YoeHMsIHgpICE9PSAtMTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9LFxuICAgIGxhc3Q6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHNbeHMubGVuZ3RoIC0gMV07XG4gICAgfSxcbiAgICBhbGw6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgeCwgX2ksIF9sZW47XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBfLmlkO1xuICAgICAgfVxuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBpZiAoIWYoeCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgYW55OiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuO1xuICAgICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgICBmID0gXy5pZDtcbiAgICAgIH1cbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgeCA9IHhzW19pXTtcbiAgICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgd2l0aG91dDogZnVuY3Rpb24oeCwgeHMpIHtcbiAgICAgIHJldHVybiBfLmZpbHRlcigoZnVuY3Rpb24oeSkge1xuICAgICAgICByZXR1cm4geSAhPT0geDtcbiAgICAgIH0pLCB4cyk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHgsIHhzKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGkgPSBfLmluZGV4T2YoeHMsIHgpO1xuICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICByZXR1cm4geHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZm9sZDogZnVuY3Rpb24oeHMsIHNlZWQsIGYpIHtcbiAgICAgIHZhciB4LCBfaSwgX2xlbjtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgeCA9IHhzW19pXTtcbiAgICAgICAgc2VlZCA9IGYoc2VlZCwgeCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VlZDtcbiAgICB9LFxuICAgIGZsYXRNYXA6IGZ1bmN0aW9uKGYsIHhzKSB7XG4gICAgICByZXR1cm4gXy5mb2xkKHhzLCBbXSwgKGZ1bmN0aW9uKHlzLCB4KSB7XG4gICAgICAgIHJldHVybiB5cy5jb25jYXQoZih4KSk7XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBjYWNoZWQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhbHVlID0gTm9uZTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBOb25lKSB7XG4gICAgICAgICAgdmFsdWUgPSBmKCk7XG4gICAgICAgICAgZiA9IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9O1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGV4LCBpbnRlcm5hbHMsIGtleSwgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICByZWN1cnNpb25EZXB0aCsrO1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKG9iaikpIHtcbiAgICAgICAgICByZXR1cm4gXCJmdW5jdGlvblwiO1xuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgIGlmIChyZWN1cnNpb25EZXB0aCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlsuLl1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFwiW1wiICsgXy5tYXAoXy50b1N0cmluZywgb2JqKS50b1N0cmluZygpICsgXCJdXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoKChvYmogIT0gbnVsbCA/IG9iai50b1N0cmluZyA6IHZvaWQgMCkgIT0gbnVsbCkgJiYgb2JqLnRvU3RyaW5nICE9PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICBpZiAocmVjdXJzaW9uRGVwdGggPiA1KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJ7Li59XCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGludGVybmFscyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBfcmVzdWx0cztcbiAgICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChvYmosIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB2YWx1ZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICAgICAgICAgICAgZXggPSBfZXJyb3I7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKF8udG9TdHJpbmcoa2V5KSArIFwiOlwiICsgXy50b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgcmV0dXJuIFwie1wiICsgaW50ZXJuYWxzICsgXCJ9XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgcmVjdXJzaW9uRGVwdGgtLTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmVjdXJzaW9uRGVwdGggPSAwO1xuXG4gIEJhY29uLl8gPSBfO1xuXG4gIEJhY29uLnNjaGVkdWxlciA9IHtcbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihmLCBkKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmLCBkKTtcbiAgICB9LFxuICAgIHNldEludGVydmFsOiBmdW5jdGlvbihmLCBpKSB7XG4gICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZiwgaSk7XG4gICAgfSxcbiAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaWQpO1xuICAgIH0sXG4gICAgbm93OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uZnJvbUJpbmRlciA9IGZ1bmN0aW9uKGJpbmRlciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIGlmIChldmVudFRyYW5zZm9ybWVyID09IG51bGwpIHtcbiAgICAgIGV2ZW50VHJhbnNmb3JtZXIgPSBfLmlkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcImZyb21CaW5kZXJcIiwgYmluZGVyLCBldmVudFRyYW5zZm9ybWVyKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIG5lZWRzVW5iaW5kLCB1bmJpbmQsIHVuYmluZGVyLCB1bmJvdW5kO1xuICAgICAgdW5ib3VuZCA9IGZhbHNlO1xuICAgICAgbmVlZHNVbmJpbmQgPSBmYWxzZTtcbiAgICAgIHVuYmluZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXVuYm91bmQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHVuYmluZGVyICE9PSBcInVuZGVmaW5lZFwiICYmIHVuYmluZGVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICB1bmJpbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIHVuYm91bmQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmVlZHNVbmJpbmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVuYmluZGVyID0gYmluZGVyKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncywgZXZlbnQsIHJlcGx5LCB2YWx1ZSwgX2ksIF9sZW47XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICB2YWx1ZSA9IGV2ZW50VHJhbnNmb3JtZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGlmICghKGlzQXJyYXkodmFsdWUpICYmIF8ubGFzdCh2YWx1ZSkgaW5zdGFuY2VvZiBFdmVudCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHZhbHVlLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgZXZlbnQgPSB2YWx1ZVtfaV07XG4gICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50ID0gdG9FdmVudChldmVudCkpO1xuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlIHx8IGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIHVuYmluZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9KTtcbiAgICAgIGlmIChuZWVkc1VuYmluZCkge1xuICAgICAgICB1bmJpbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1bmJpbmQ7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uJCA9IHt9O1xuXG4gIEJhY29uLiQuYXNFdmVudFN0cmVhbSA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGV2ZW50VHJhbnNmb3JtZXIpIHtcbiAgICB2YXIgX3JlZjtcbiAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIF9yZWYgPSBbc2VsZWN0b3IsIHZvaWQgMF0sIGV2ZW50VHJhbnNmb3JtZXIgPSBfcmVmWzBdLCBzZWxlY3RvciA9IF9yZWZbMV07XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcy5zZWxlY3RvciB8fCB0aGlzLCBcImFzRXZlbnRTdHJlYW1cIiwgZXZlbnROYW1lLCBCYWNvbi5mcm9tQmluZGVyKChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgX3RoaXMub24oZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMub2ZmKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSwgZXZlbnRUcmFuc2Zvcm1lcikpO1xuICB9O1xuXG4gIGlmICgoX3JlZiA9IHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5ICE9PSBudWxsID8galF1ZXJ5IDogdHlwZW9mIFplcHRvICE9PSBcInVuZGVmaW5lZFwiICYmIFplcHRvICE9PSBudWxsID8gWmVwdG8gOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBfcmVmLmZuLmFzRXZlbnRTdHJlYW0gPSBCYWNvbi4kLmFzRXZlbnRTdHJlYW07XG4gIH1cblxuICBCYWNvbi5mcm9tRXZlbnRUYXJnZXQgPSBmdW5jdGlvbih0YXJnZXQsIGV2ZW50TmFtZSwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIHZhciBzdWIsIHVuc3ViLCBfcmVmMSwgX3JlZjIsIF9yZWYzLCBfcmVmNCwgX3JlZjUsIF9yZWY2O1xuICAgIHN1YiA9IChfcmVmMSA9IChfcmVmMiA9IChfcmVmMyA9IHRhcmdldC5hZGRFdmVudExpc3RlbmVyKSAhPSBudWxsID8gX3JlZjMgOiB0YXJnZXQuYWRkTGlzdGVuZXIpICE9IG51bGwgPyBfcmVmMiA6IHRhcmdldC5iaW5kKSAhPSBudWxsID8gX3JlZjEgOiB0YXJnZXQub247XG4gICAgdW5zdWIgPSAoX3JlZjQgPSAoX3JlZjUgPSAoX3JlZjYgPSB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcikgIT0gbnVsbCA/IF9yZWY2IDogdGFyZ2V0LnJlbW92ZUxpc3RlbmVyKSAhPSBudWxsID8gX3JlZjUgOiB0YXJnZXQudW5iaW5kKSAhPSBudWxsID8gX3JlZjQgOiB0YXJnZXQub2ZmO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbUV2ZW50VGFyZ2V0XCIsIHRhcmdldCwgZXZlbnROYW1lLCBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHN1Yi5jYWxsKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHVuc3ViLmNhbGwodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgfTtcbiAgICB9LCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbVByb21pc2UgPSBmdW5jdGlvbihwcm9taXNlLCBhYm9ydCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbVByb21pc2VcIiwgcHJvbWlzZSwgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBwcm9taXNlLnRoZW4oaGFuZGxlciwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlcihuZXcgRXJyb3IoZSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChhYm9ydCkge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgcHJvbWlzZS5hYm9ydCA9PT0gXCJmdW5jdGlvblwiID8gcHJvbWlzZS5hYm9ydCgpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sIChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgIH0pKSk7XG4gIH07XG5cbiAgQmFjb24ubm9Nb3JlID0gW1wiPG5vLW1vcmU+XCJdO1xuXG4gIEJhY29uLm1vcmUgPSBbXCI8bW9yZT5cIl07XG5cbiAgQmFjb24ubGF0ZXIgPSBmdW5jdGlvbihkZWxheSwgdmFsdWUpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImxhdGVyXCIsIGRlbGF5LCB2YWx1ZSwgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5zZXF1ZW50aWFsbHkgPSBmdW5jdGlvbihkZWxheSwgdmFsdWVzKSB7XG4gICAgdmFyIGluZGV4O1xuICAgIGluZGV4ID0gMDtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcInNlcXVlbnRpYWxseVwiLCBkZWxheSwgdmFsdWVzLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZhbHVlc1tpbmRleCsrXTtcbiAgICAgIGlmIChpbmRleCA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5kKCk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnJlcGVhdGVkbHkgPSBmdW5jdGlvbihkZWxheSwgdmFsdWVzKSB7XG4gICAgdmFyIGluZGV4O1xuICAgIGluZGV4ID0gMDtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcInJlcGVhdGVkbHlcIiwgZGVsYXksIHZhbHVlcywgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlc1tpbmRleCsrICUgdmFsdWVzLmxlbmd0aF07XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNweSA9IGZ1bmN0aW9uKHNweSkge1xuICAgIHJldHVybiBzcHlzLnB1c2goc3B5KTtcbiAgfTtcblxuICBzcHlzID0gW107XG5cbiAgcmVnaXN0ZXJPYnMgPSBmdW5jdGlvbihvYnMpIHtcbiAgICB2YXIgc3B5LCBfaSwgX2xlbjtcbiAgICBpZiAoc3B5cy5sZW5ndGgpIHtcbiAgICAgIGlmICghcmVnaXN0ZXJPYnMucnVubmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlZ2lzdGVyT2JzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc3B5cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICAgc3B5ID0gc3B5c1tfaV07XG4gICAgICAgICAgICBzcHkob2JzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgZGVsZXRlIHJlZ2lzdGVyT2JzLnJ1bm5pbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQgPSBmdW5jdGlvbih3cmFwcGVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGNvbnRleHQsIGYsIG1ldGhvZE5hbWU7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmICh0eXBlb2YgZiA9PT0gXCJvYmplY3RcIiAmJiBhcmdzLmxlbmd0aCkge1xuICAgICAgICBjb250ZXh0ID0gZjtcbiAgICAgICAgbWV0aG9kTmFtZSA9IGFyZ3NbMF07XG4gICAgICAgIGYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dFttZXRob2ROYW1lXS5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBhcmdzID0gYXJncy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVkLmFwcGx5KG51bGwsIFtmXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgfTtcbiAgfTtcblxuICBsaWZ0Q2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjLCB3cmFwcGVkKSB7XG4gICAgcmV0dXJuIHdpdGhNZXRob2RDYWxsU3VwcG9ydChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmLCBzdHJlYW07XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHN0cmVhbSA9IHBhcnRpYWxseUFwcGxpZWQod3JhcHBlZCwgW1xuICAgICAgICBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgX19zbGljZS5jYWxsKHZhbHVlcykuY29uY2F0KFtjYWxsYmFja10pKTtcbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgZGVzYywgZl0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmdzKSwgW0JhY29uLmNvbWJpbmVBc0FycmF5KGFyZ3MpLmZsYXRNYXAoc3RyZWFtKV0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5mcm9tQ2FsbGJhY2sgPSBsaWZ0Q2FsbGJhY2soXCJmcm9tQ2FsbGJhY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9LCAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICB9KSk7XG4gIH0pO1xuXG4gIEJhY29uLmZyb21Ob2RlQ2FsbGJhY2sgPSBsaWZ0Q2FsbGJhY2soXCJmcm9tTm9kZUNhbGxiYWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIG1ha2VGdW5jdGlvbihmLCBhcmdzKShoYW5kbGVyKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IsIHZhbHVlKSB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFtuZXcgRXJyb3IoZXJyb3IpLCBlbmQoKV07XG4gICAgICB9XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIEJhY29uLmZyb21Qb2xsID0gZnVuY3Rpb24oZGVsYXksIHBvbGwpIHtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21Qb2xsXCIsIGRlbGF5LCBwb2xsLCBCYWNvbi5mcm9tQmluZGVyKChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICB2YXIgaWQ7XG4gICAgICBpZCA9IEJhY29uLnNjaGVkdWxlci5zZXRJbnRlcnZhbChoYW5kbGVyLCBkZWxheSk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5zY2hlZHVsZXIuY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgICB9O1xuICAgIH0pLCBwb2xsKSk7XG4gIH07XG5cbiAgQmFjb24uaW50ZXJ2YWwgPSBmdW5jdGlvbihkZWxheSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJpbnRlcnZhbFwiLCBkZWxheSwgdmFsdWUsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXh0KHZhbHVlKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUoQmFjb24sIFwiY29uc3RhbnRcIiwgdmFsdWUpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGluaXRpYWwodmFsdWUpKTtcbiAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5uZXZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwibmV2ZXJcIiksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5vbmNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcIm9uY2VcIiwgdmFsdWUpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKHRvRXZlbnQodmFsdWUpKTtcbiAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5mcm9tQXJyYXkgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICB2YXIgaTtcbiAgICBhc3NlcnRBcnJheSh2YWx1ZXMpO1xuICAgIGlmICghdmFsdWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tQXJyYXlcIiwgdmFsdWVzLCBCYWNvbi5uZXZlcigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaSA9IDA7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcImZyb21BcnJheVwiLCB2YWx1ZXMpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciBwdXNoLCByZXBseSwgdW5zdWJkO1xuICAgICAgICB1bnN1YmQgPSBmYWxzZTtcbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBwdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgIGlmICgocmVwbHkgIT09IEJhY29uLm5vTW9yZSkgJiYgIXVuc3ViZCkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXNbaSsrXTtcbiAgICAgICAgICAgIHJlcGx5ID0gc2luayh0b0V2ZW50KHZhbHVlKSk7XG4gICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICBpZiAoaSA9PT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci5hZnRlclRyYW5zYWN0aW9uKHB1c2gpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwdXNoKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdW5zdWJkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5tZXJnZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJtZXJnZUFsbFwiXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpKSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIGVuZHMsIHNpbmtzLCBzbWFydFNpbms7XG4gICAgICAgIGVuZHMgPSAwO1xuICAgICAgICBzbWFydFNpbmsgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odW5zdWJCb3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgICBlbmRzKys7XG4gICAgICAgICAgICAgICAgaWYgKGVuZHMgPT09IHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc2luayhlbmQoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgICB1bnN1YkJvdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBzaW5rcyA9IF8ubWFwKHNtYXJ0U2luaywgc3RyZWFtcyk7XG4gICAgICAgIHJldHVybiBjb21wb3NpdGVVbnN1YnNjcmliZS5hcHBseShudWxsLCBzaW5rcyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLnppcEFzQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcInppcEFzQXJyYXlcIl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLnppcFdpdGgoc3RyZWFtcywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeHM7XG4gICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4geHM7XG4gICAgfSldKSk7XG4gIH07XG5cbiAgQmFjb24uemlwV2l0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBzdHJlYW1zLCBfcmVmMTtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAoIWlzRnVuY3Rpb24oZikpIHtcbiAgICAgIF9yZWYxID0gW2YsIHN0cmVhbXNbMF1dLCBzdHJlYW1zID0gX3JlZjFbMF0sIGYgPSBfcmVmMVsxXTtcbiAgICB9XG4gICAgc3RyZWFtcyA9IF8ubWFwKChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50b0V2ZW50U3RyZWFtKCk7XG4gICAgfSksIHN0cmVhbXMpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcInppcFdpdGhcIiwgZl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLndoZW4oc3RyZWFtcywgZildKSk7XG4gIH07XG5cbiAgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcywgc291cmNlcywgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzdHJlYW1zWzBdKSkge1xuICAgICAgc3RyZWFtcyA9IHN0cmVhbXNbMF07XG4gICAgfVxuICAgIHNvdXJjZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX2ksIF9sZW4sIF9yZXN1bHRzO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc3RyZWFtcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzID0gc3RyZWFtc1tfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2gobmV3IEJ1ZmZlcmluZ1NvdXJjZShzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJncm91cFNpbXVsdGFuZW91c1wiXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24ud2hlbihzb3VyY2VzLCAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeHM7XG4gICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4geHM7XG4gICAgfSkpXSkpO1xuICB9O1xuXG4gIEJhY29uLmNvbWJpbmVBc0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGluZGV4LCBzLCBzb3VyY2VzLCBzdHJlYW0sIHN0cmVhbXMsIF9pLCBfbGVuO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChzdHJlYW1zLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgZm9yIChpbmRleCA9IF9pID0gMCwgX2xlbiA9IHN0cmVhbXMubGVuZ3RoOyBfaSA8IF9sZW47IGluZGV4ID0gKytfaSkge1xuICAgICAgc3RyZWFtID0gc3RyZWFtc1tpbmRleF07XG4gICAgICBpZiAoIShpc09ic2VydmFibGUoc3RyZWFtKSkpIHtcbiAgICAgICAgc3RyZWFtc1tpbmRleF0gPSBCYWNvbi5jb25zdGFudChzdHJlYW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgIHNvdXJjZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfaiwgX2xlbjEsIF9yZXN1bHRzO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBzdHJlYW1zLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIHMgPSBzdHJlYW1zW19qXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKG5ldyBTb3VyY2UocywgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJjb21iaW5lQXNBcnJheVwiXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24ud2hlbihzb3VyY2VzLCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4cztcbiAgICAgICAgeHMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4geHM7XG4gICAgICB9KSkudG9Qcm9wZXJ0eSgpXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24uY29uc3RhbnQoW10pO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5vblZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBzdHJlYW1zLCBfaTtcbiAgICBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgX2kgPSBhcmd1bWVudHMubGVuZ3RoIC0gMSkgOiAoX2kgPSAwLCBbXSksIGYgPSBhcmd1bWVudHNbX2krK107XG4gICAgcmV0dXJuIEJhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm9uVmFsdWVzKGYpO1xuICB9O1xuXG4gIEJhY29uLmNvbWJpbmVXaXRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXM7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgc3RyZWFtcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiY29tYmluZVdpdGhcIiwgZl0uY29uY2F0KF9fc2xpY2UuY2FsbChzdHJlYW1zKSwgW0JhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm1hcChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIHZhbHVlcyk7XG4gICAgfSldKSk7XG4gIH07XG5cbiAgQmFjb24uY29tYmluZVRlbXBsYXRlID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICB2YXIgYXBwbHlTdHJlYW1WYWx1ZSwgY29tYmluYXRvciwgY29tcGlsZSwgY29tcGlsZVRlbXBsYXRlLCBjb25zdGFudFZhbHVlLCBjdXJyZW50LCBmdW5jcywgbWtDb250ZXh0LCBzZXRWYWx1ZSwgc3RyZWFtcztcbiAgICBmdW5jcyA9IFtdO1xuICAgIHN0cmVhbXMgPSBbXTtcbiAgICBjdXJyZW50ID0gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgIHJldHVybiBjdHhTdGFja1tjdHhTdGFjay5sZW5ndGggLSAxXTtcbiAgICB9O1xuICAgIHNldFZhbHVlID0gZnVuY3Rpb24oY3R4U3RhY2ssIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBjdXJyZW50KGN0eFN0YWNrKVtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgICBhcHBseVN0cmVhbVZhbHVlID0gZnVuY3Rpb24oa2V5LCBpbmRleCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGN0eFN0YWNrLCB2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHNldFZhbHVlKGN0eFN0YWNrLCBrZXksIHZhbHVlc1tpbmRleF0pO1xuICAgICAgfTtcbiAgICB9O1xuICAgIGNvbnN0YW50VmFsdWUgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgcmV0dXJuIHNldFZhbHVlKGN0eFN0YWNrLCBrZXksIHZhbHVlKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBta0NvbnRleHQgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgaWYgKGlzQXJyYXkodGVtcGxhdGUpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbXBpbGUgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgcG9wQ29udGV4dCwgcHVzaENvbnRleHQ7XG4gICAgICBpZiAoaXNPYnNlcnZhYmxlKHZhbHVlKSkge1xuICAgICAgICBzdHJlYW1zLnB1c2godmFsdWUpO1xuICAgICAgICByZXR1cm4gZnVuY3MucHVzaChhcHBseVN0cmVhbVZhbHVlKGtleSwgc3RyZWFtcy5sZW5ndGggLSAxKSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBPYmplY3QodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiICYmICEodmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICBwdXNoQ29udGV4dCA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICAgICAgdmFyIG5ld0NvbnRleHQ7XG4gICAgICAgICAgICBuZXdDb250ZXh0ID0gbWtDb250ZXh0KHZhbHVlKTtcbiAgICAgICAgICAgIHNldFZhbHVlKGN0eFN0YWNrLCBrZXksIG5ld0NvbnRleHQpO1xuICAgICAgICAgICAgcmV0dXJuIGN0eFN0YWNrLnB1c2gobmV3Q29udGV4dCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcG9wQ29udGV4dCA9IGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGN0eFN0YWNrLnBvcCgpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jcy5wdXNoKHB1c2hDb250ZXh0KGtleSkpO1xuICAgICAgICBjb21waWxlVGVtcGxhdGUodmFsdWUpO1xuICAgICAgICByZXR1cm4gZnVuY3MucHVzaChwb3BDb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKGNvbnN0YW50VmFsdWUoa2V5LCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcGlsZVRlbXBsYXRlID0gZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBfLmVhY2godGVtcGxhdGUsIGNvbXBpbGUpO1xuICAgIH07XG4gICAgY29tcGlsZVRlbXBsYXRlKHRlbXBsYXRlKTtcbiAgICBjb21iaW5hdG9yID0gZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgY3R4U3RhY2ssIGYsIHJvb3RDb250ZXh0LCBfaSwgX2xlbjtcbiAgICAgIHJvb3RDb250ZXh0ID0gbWtDb250ZXh0KHRlbXBsYXRlKTtcbiAgICAgIGN0eFN0YWNrID0gW3Jvb3RDb250ZXh0XTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gZnVuY3MubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZiA9IGZ1bmNzW19pXTtcbiAgICAgICAgZihjdHhTdGFjaywgdmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByb290Q29udGV4dDtcbiAgICB9O1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiY29tYmluZVRlbXBsYXRlXCIsIHRlbXBsYXRlLCBCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5tYXAoY29tYmluYXRvcikpO1xuICB9O1xuXG4gIEJhY29uLnJldHJ5ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBkZWxheSwgaXNSZXRyeWFibGUsIG1heFJldHJpZXMsIHJldHJpZXMsIHJldHJ5LCBzb3VyY2U7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKG9wdGlvbnMuc291cmNlKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIidzb3VyY2UnIG9wdGlvbiBoYXMgdG8gYmUgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgc291cmNlID0gb3B0aW9ucy5zb3VyY2U7XG4gICAgcmV0cmllcyA9IG9wdGlvbnMucmV0cmllcyB8fCAwO1xuICAgIG1heFJldHJpZXMgPSBvcHRpb25zLm1heFJldHJpZXMgfHwgcmV0cmllcztcbiAgICBkZWxheSA9IG9wdGlvbnMuZGVsYXkgfHwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIGlzUmV0cnlhYmxlID0gb3B0aW9ucy5pc1JldHJ5YWJsZSB8fCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0cnkgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICB2YXIgZGVsYXllZFJldHJ5LCBuZXh0QXR0ZW1wdE9wdGlvbnM7XG4gICAgICBuZXh0QXR0ZW1wdE9wdGlvbnMgPSB7XG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICByZXRyaWVzOiByZXRyaWVzIC0gMSxcbiAgICAgICAgbWF4UmV0cmllczogbWF4UmV0cmllcyxcbiAgICAgICAgZGVsYXk6IGRlbGF5LFxuICAgICAgICBpc1JldHJ5YWJsZTogaXNSZXRyeWFibGVcbiAgICAgIH07XG4gICAgICBkZWxheWVkUmV0cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnJldHJ5KG5leHRBdHRlbXB0T3B0aW9ucyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5KGNvbnRleHQpKS5maWx0ZXIoZmFsc2UpLmNvbmNhdChCYWNvbi5vbmNlKCkuZmxhdE1hcChkZWxheWVkUmV0cnkpKTtcbiAgICB9O1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwicmV0cnlcIiwgb3B0aW9ucywgc291cmNlKCkuZmxhdE1hcEVycm9yKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChpc1JldHJ5YWJsZShlKSAmJiByZXRyaWVzID4gMCkge1xuICAgICAgICByZXR1cm4gcmV0cnkoe1xuICAgICAgICAgIGVycm9yOiBlLFxuICAgICAgICAgIHJldHJpZXNEb25lOiBtYXhSZXRyaWVzIC0gcmV0cmllc1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKG5ldyBFcnJvcihlKSk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIGV2ZW50SWRDb3VudGVyID0gMDtcblxuICBFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudCgpIHtcbiAgICAgIHRoaXMuaWQgPSArK2V2ZW50SWRDb3VudGVyO1xuICAgIH1cblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaGFzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnQ7XG5cbiAgfSkoKTtcblxuICBOZXh0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhOZXh0LCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gTmV4dCh2YWx1ZUYsIGVhZ2VyKSB7XG4gICAgICBOZXh0Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO1xuICAgICAgaWYgKCFlYWdlciAmJiBpc0Z1bmN0aW9uKHZhbHVlRikgfHwgdmFsdWVGIGluc3RhbmNlb2YgTmV4dCkge1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZhbHVlRjtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHZhbHVlRjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBOZXh0LnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUYgaW5zdGFuY2VvZiBOZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHRoaXMudmFsdWVGLnZhbHVlKCk7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlRikge1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB0aGlzLnZhbHVlRigpO1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlSW50ZXJuYWw7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbihmKSB7XG4gICAgICB2YXIgZXZlbnQsIHZhbHVlO1xuICAgICAgaWYgKHRoaXMudmFsdWVJbnRlcm5hbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVJbnRlcm5hbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGYodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZih0aGlzLnZhbHVlKCkpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTmV4dDtcblxuICB9KShFdmVudCk7XG5cbiAgSW5pdGlhbCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5pdGlhbCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEluaXRpYWwoKSB7XG4gICAgICByZXR1cm4gSW5pdGlhbC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUudG9OZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHQodGhpcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBJbml0aWFsO1xuXG4gIH0pKE5leHQpO1xuXG4gIEVuZCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW5kLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gRW5kKCkge1xuICAgICAgcmV0dXJuIEVuZC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBFbmQucHJvdG90eXBlLmlzRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVuZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIjxlbmQ+XCI7XG4gICAgfTtcblxuICAgIHJldHVybiBFbmQ7XG5cbiAgfSkoRXZlbnQpO1xuXG4gIEVycm9yID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFcnJvciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEVycm9yKGVycm9yKSB7XG4gICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuXG4gICAgRXJyb3IucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFcnJvci5wcm90b3R5cGUuZm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVycm9yPiBcIiArIF8udG9TdHJpbmcodGhpcy5lcnJvcik7XG4gICAgfTtcblxuICAgIHJldHVybiBFcnJvcjtcblxuICB9KShFdmVudCk7XG5cbiAgaWRDb3VudGVyID0gMDtcblxuICBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoZGVzYykge1xuICAgICAgdGhpcy5pZCA9ICsraWRDb3VudGVyO1xuICAgICAgd2l0aERlc2NyaXB0aW9uKGRlc2MsIHRoaXMpO1xuICAgICAgdGhpcy5pbml0aWFsRGVzYyA9IHRoaXMuZGVzYztcbiAgICB9XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICByZXR1cm4gVXBkYXRlQmFycmllci53cmFwcGVkU3Vic2NyaWJlKHRoaXMsIHNpbmspO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmVJbnRlcm5hbCA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC52YWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWVzID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHRoaXMub25WYWx1ZShmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoZXZlbnQuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIHJldHVybiBmKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5lcnJvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJlcnJvcnNcIiwgdGhpcy5maWx0ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgZjtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmaWx0ZXJcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5maWx0ZXIoZikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInRha2VXaGlsZVwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmVuZE9uRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJlbmRPbkVycm9yXCIsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpICYmIGYoZXZlbnQuZXJyb3IpKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRha2UgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVwiLCBjb3VudCwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBwO1xuICAgICAgcCA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBpZiAocCBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBwLnNhbXBsZWRCeSh0aGlzLCBmb3JtZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBwLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIm1hcFwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50LmZtYXAoZikpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm1hcEVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwRXJyb3JcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChuZXh0KGYoZXZlbnQuZXJyb3IpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwRW5kXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB0aGlzLnB1c2gobmV4dChmKGV2ZW50KSkpO1xuICAgICAgICAgIHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRvQWN0aW9uXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgICBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwXCIsIGNvdW50LCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcER1cGxpY2F0ZXMgPSBmdW5jdGlvbihpc0VxdWFsKSB7XG4gICAgICBpZiAoaXNFcXVhbCA9PSBudWxsKSB7XG4gICAgICAgIGlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcER1cGxpY2F0ZXNcIiwgdGhpcy53aXRoU3RhdGVNYWNoaW5lKE5vbmUsIGZ1bmN0aW9uKHByZXYsIGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiBbcHJldiwgW2V2ZW50XV07XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNJbml0aWFsKCkgfHwgcHJldiA9PT0gTm9uZSB8fCAhaXNFcXVhbChwcmV2LmdldCgpLCBldmVudC52YWx1ZSgpKSkge1xuICAgICAgICAgIHJldHVybiBbbmV3IFNvbWUoZXZlbnQudmFsdWUoKSksIFtldmVudF1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbcHJldiwgW11dO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNraXBFcnJvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwRXJyb3JzXCIsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLndpdGhTdGF0ZU1hY2hpbmUgPSBmdW5jdGlvbihpbml0U3RhdGUsIGYpIHtcbiAgICAgIHZhciBzdGF0ZTtcbiAgICAgIHN0YXRlID0gaW5pdFN0YXRlO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcIndpdGhTdGF0ZU1hY2hpbmVcIiwgaW5pdFN0YXRlLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBmcm9tRiwgbmV3U3RhdGUsIG91dHB1dCwgb3V0cHV0cywgcmVwbHksIF9pLCBfbGVuO1xuICAgICAgICBmcm9tRiA9IGYoc3RhdGUsIGV2ZW50KTtcbiAgICAgICAgbmV3U3RhdGUgPSBmcm9tRlswXSwgb3V0cHV0cyA9IGZyb21GWzFdO1xuICAgICAgICBzdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gb3V0cHV0cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIG91dHB1dCA9IG91dHB1dHNbX2ldO1xuICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG91dHB1dCk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24oc2VlZCwgZikge1xuICAgICAgdmFyIGFjYywgcmVzdWx0UHJvcGVydHksIHN1YnNjcmliZTtcbiAgICAgIGYgPSB0b0NvbWJpbmF0b3IoZik7XG4gICAgICBhY2MgPSB0b09wdGlvbihzZWVkKTtcbiAgICAgIHN1YnNjcmliZSA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHZhciBpbml0U2VudCwgcmVwbHksIHNlbmRJbml0LCB1bnN1YjtcbiAgICAgICAgICBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgICBzZW5kSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgICAgICByZXR1cm4gYWNjLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKG5ldyBJbml0aWFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB1bnN1YiA9IG5vcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgdW5zdWIgPSBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIG5leHQsIHByZXY7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICBpZiAoaW5pdFNlbnQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgICBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJldiA9IGFjYy5nZXRPckVsc2Uodm9pZCAwKTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gZihwcmV2LCBldmVudC52YWx1ZSgpKTtcbiAgICAgICAgICAgICAgICBhY2MgPSBuZXcgU29tZShuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudC5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBVcGRhdGVCYXJyaWVyLndoZW5Eb25lV2l0aChyZXN1bHRQcm9wZXJ0eSwgc2VuZEluaXQpO1xuICAgICAgICAgIHJldHVybiB1bnN1YjtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcmV0dXJuIHJlc3VsdFByb3BlcnR5ID0gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwic2NhblwiLCBzZWVkLCBmKSwgc3Vic2NyaWJlKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9sZCA9IGZ1bmN0aW9uKHNlZWQsIGYpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmb2xkXCIsIHNlZWQsIGYsIHRoaXMuc2NhbihzZWVkLCBmKS5zYW1wbGVkQnkodGhpcy5maWx0ZXIoZmFsc2UpLm1hcEVuZCgpLnRvUHJvcGVydHkoKSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS56aXAgPSBmdW5jdGlvbihvdGhlciwgZikge1xuICAgICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgICBmID0gQXJyYXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiemlwXCIsIG90aGVyLCBCYWNvbi56aXBXaXRoKFt0aGlzLCBvdGhlcl0sIGYpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKHN0YXJ0LCBmKSB7XG4gICAgICBmID0gdG9Db21iaW5hdG9yKGYpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRpZmZcIiwgc3RhcnQsIGYsIHRoaXMuc2Nhbihbc3RhcnRdLCBmdW5jdGlvbihwcmV2VHVwbGUsIG5leHQpIHtcbiAgICAgICAgcmV0dXJuIFtuZXh0LCBmKHByZXZUdXBsZVswXSwgbmV4dCldO1xuICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKHR1cGxlKSB7XG4gICAgICAgIHJldHVybiB0dXBsZS5sZW5ndGggPT09IDI7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24odHVwbGUpIHtcbiAgICAgICAgcmV0dXJuIHR1cGxlWzFdO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBGaXJzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZsYXRNYXBfKHRoaXMsIG1ha2VTcGF3bmVyKGFyZ3VtZW50cyksIHRydWUpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwV2l0aENvbmN1cnJlbmN5TGltaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBsaW1pdDtcbiAgICAgIGxpbWl0ID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW3RoaXMsIFwiZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0XCIsIGxpbWl0XS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpLCBbZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJncyksIGZhbHNlLCBsaW1pdCldKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBMYXRlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmLCBzdHJlYW07XG4gICAgICBmID0gbWFrZVNwYXduZXIoYXJndW1lbnRzKTtcbiAgICAgIHN0cmVhbSA9IHRoaXMudG9FdmVudFN0cmVhbSgpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZsYXRNYXBMYXRlc3RcIiwgZiwgc3RyZWFtLmZsYXRNYXAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VPYnNlcnZhYmxlKGYodmFsdWUpKS50YWtlVW50aWwoc3RyZWFtKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEVycm9yID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJmbGF0TWFwRXJyb3JcIiwgZm4sIHRoaXMubWFwRXJyb3IoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyKTtcbiAgICAgIH0pLmZsYXRNYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKHguZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBDb25jYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW3RoaXMsIFwiZmxhdE1hcENvbmNhdFwiXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3VtZW50cyksIFt0aGlzLmZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdC5hcHBseSh0aGlzLCBbMV0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmd1bWVudHMpKSldKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcmluZ1Rocm90dGxlID0gZnVuY3Rpb24obWluaW11bUludGVydmFsKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyaW5nVGhyb3R0bGVcIiwgbWluaW11bUludGVydmFsLCB0aGlzLmZsYXRNYXBDb25jYXQoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gQmFjb24ub25jZSh4KS5jb25jYXQoQmFjb24ubGF0ZXIobWluaW11bUludGVydmFsKS5maWx0ZXIoZmFsc2UpKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubm90ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibm90XCIsIHRoaXMubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuICF4O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzO1xuICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCA/IHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiID8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX19zbGljZS5jYWxsKGFyZ3MpLmNvbmNhdChbZXZlbnQubG9nKCldKSkgOiB2b2lkIDAgOiB2b2lkIDA7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zbGlkaW5nV2luZG93ID0gZnVuY3Rpb24obiwgbWluVmFsdWVzKSB7XG4gICAgICBpZiAobWluVmFsdWVzID09IG51bGwpIHtcbiAgICAgICAgbWluVmFsdWVzID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzbGlkaW5nV2luZG93XCIsIG4sIG1pblZhbHVlcywgdGhpcy5zY2FuKFtdLCAoZnVuY3Rpb24od2luZG93LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmNvbmNhdChbdmFsdWVdKS5zbGljZSgtbik7XG4gICAgICB9KSkuZmlsdGVyKChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPj0gbWluVmFsdWVzO1xuICAgICAgfSkpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuY29tYmluZSA9IGZ1bmN0aW9uKG90aGVyLCBmKSB7XG4gICAgICB2YXIgY29tYmluYXRvcjtcbiAgICAgIGNvbWJpbmF0b3IgPSB0b0NvbWJpbmF0b3IoZik7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiY29tYmluZVwiLCBvdGhlciwgZiwgQmFjb24uY29tYmluZUFzQXJyYXkodGhpcywgb3RoZXIpLm1hcChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmF0b3IodmFsdWVzWzBdLCB2YWx1ZXNbMV0pO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihjYXNlcykge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlY29kZVwiLCBjYXNlcywgdGhpcy5jb21iaW5lKEJhY29uLmNvbWJpbmVUZW1wbGF0ZShjYXNlcyksIGZ1bmN0aW9uKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXNba2V5XTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuYXdhaXRpbmcgPSBmdW5jdGlvbihvdGhlcikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImF3YWl0aW5nXCIsIG90aGVyLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLCBvdGhlcikubWFwKGZ1bmN0aW9uKF9hcmcpIHtcbiAgICAgICAgdmFyIG15VmFsdWVzLCBvdGhlclZhbHVlcztcbiAgICAgICAgbXlWYWx1ZXMgPSBfYXJnWzBdLCBvdGhlclZhbHVlcyA9IF9hcmdbMV07XG4gICAgICAgIHJldHVybiBvdGhlclZhbHVlcy5sZW5ndGggPT09IDA7XG4gICAgICB9KS50b1Byb3BlcnR5KGZhbHNlKS5za2lwRHVwbGljYXRlcygpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLndpdGhEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRlc2NyaWJlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykuYXBwbHkodGhpcyk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fbmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2MudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuaW50ZXJuYWxEZXBzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0aWFsRGVzYy5kZXBzKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBPYnNlcnZhYmxlO1xuXG4gIH0pKCk7XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUucmVkdWNlID0gT2JzZXJ2YWJsZS5wcm90b3R5cGUuZm9sZDtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5hc3NpZ24gPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmluc3BlY3QgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1N0cmluZztcblxuICBmbGF0TWFwXyA9IGZ1bmN0aW9uKHJvb3QsIGYsIGZpcnN0T25seSwgbGltaXQpIHtcbiAgICB2YXIgY2hpbGREZXBzLCByZXN1bHQsIHJvb3REZXA7XG4gICAgcm9vdERlcCA9IFtyb290XTtcbiAgICBjaGlsZERlcHMgPSBbXTtcbiAgICByZXN1bHQgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocm9vdCwgXCJmbGF0TWFwXCIgKyAoZmlyc3RPbmx5ID8gXCJGaXJzdFwiIDogXCJcIiksIGYpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2hlY2tFbmQsIGNoZWNrUXVldWUsIGNvbXBvc2l0ZSwgcXVldWUsIHNwYXduO1xuICAgICAgY29tcG9zaXRlID0gbmV3IENvbXBvc2l0ZVVuc3Vic2NyaWJlKCk7XG4gICAgICBxdWV1ZSA9IFtdO1xuICAgICAgc3Bhd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY2hpbGQ7XG4gICAgICAgIGNoaWxkID0gbWFrZU9ic2VydmFibGUoZihldmVudC52YWx1ZSgpKSk7XG4gICAgICAgIGNoaWxkRGVwcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZS5hZGQoZnVuY3Rpb24odW5zdWJBbGwsIHVuc3ViTWUpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIF8ucmVtb3ZlKGNoaWxkLCBjaGlsZERlcHMpO1xuICAgICAgICAgICAgICBjaGVja1F1ZXVlKCk7XG4gICAgICAgICAgICAgIGNoZWNrRW5kKHVuc3ViTWUpO1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSW5pdGlhbCkge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnQudG9OZXh0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY2hlY2tRdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIGV2ZW50ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoZWNrRW5kID0gZnVuY3Rpb24odW5zdWIpIHtcbiAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgaWYgKGNvbXBvc2l0ZS5lbXB0eSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZW5kKCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbihfXywgdW5zdWJSb290KSB7XG4gICAgICAgIHJldHVybiByb290LmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja0VuZCh1bnN1YlJvb3QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdE9ubHkgJiYgY29tcG9zaXRlLmNvdW50KCkgPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNvbXBvc2l0ZS51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW1pdCAmJiBjb21wb3NpdGUuY291bnQoKSA+IGxpbWl0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBxdWV1ZS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBzcGF3bihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbXBvc2l0ZS51bnN1YnNjcmliZTtcbiAgICB9KTtcbiAgICByZXN1bHQuaW50ZXJuYWxEZXBzID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2hpbGREZXBzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcm9vdERlcC5jb25jYXQoY2hpbGREZXBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByb290RGVwO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBFdmVudFN0cmVhbSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRXZlbnRTdHJlYW0sIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBFdmVudFN0cmVhbShkZXNjLCBzdWJzY3JpYmUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGRlc2MpKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzdWJzY3JpYmU7XG4gICAgICAgIHN1YnNjcmliZSA9IGRlc2M7XG4gICAgICAgIGRlc2MgPSBbXTtcbiAgICAgIH1cbiAgICAgIEV2ZW50U3RyZWFtLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGRlc2MpO1xuICAgICAgYXNzZXJ0RnVuY3Rpb24oc3Vic2NyaWJlKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKHN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgICByZWdpc3Rlck9icyh0aGlzKTtcbiAgICB9XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlbGF5XCIsIGRlbGF5LCB0aGlzLmZsYXRNYXAoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVib3VuY2VcIiwgZGVsYXksIHRoaXMuZmxhdE1hcExhdGVzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXksIHZhbHVlKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlSW1tZWRpYXRlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWJvdW5jZUltbWVkaWF0ZVwiLCBkZWxheSwgdGhpcy5mbGF0TWFwRmlyc3QoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UodmFsdWUpLmNvbmNhdChCYWNvbi5sYXRlcihkZWxheSkuZmlsdGVyKGZhbHNlKSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGhyb3R0bGVcIiwgZGVsYXksIHRoaXMuYnVmZmVyV2l0aFRpbWUoZGVsYXkpLm1hcChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoIC0gMV07XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXJXaXRoVGltZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aFRpbWVcIiwgZGVsYXksIHRoaXMuYnVmZmVyV2l0aFRpbWVPckNvdW50KGRlbGF5LCBOdW1iZXIuTUFYX1ZBTFVFKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXJXaXRoQ291bnQgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlcldpdGhDb3VudFwiLCBjb3VudCwgdGhpcy5idWZmZXJXaXRoVGltZU9yQ291bnQodm9pZCAwLCBjb3VudCkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aFRpbWVPckNvdW50ID0gZnVuY3Rpb24oZGVsYXksIGNvdW50KSB7XG4gICAgICB2YXIgZmx1c2hPclNjaGVkdWxlO1xuICAgICAgZmx1c2hPclNjaGVkdWxlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIudmFsdWVzLmxlbmd0aCA9PT0gY291bnQpIHtcbiAgICAgICAgICByZXR1cm4gYnVmZmVyLmZsdXNoKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGVsYXkgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBidWZmZXIuc2NoZWR1bGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJXaXRoVGltZU9yQ291bnRcIiwgZGVsYXksIGNvdW50LCB0aGlzLmJ1ZmZlcihkZWxheSwgZmx1c2hPclNjaGVkdWxlLCBmbHVzaE9yU2NoZWR1bGUpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlciA9IGZ1bmN0aW9uKGRlbGF5LCBvbklucHV0LCBvbkZsdXNoKSB7XG4gICAgICB2YXIgYnVmZmVyLCBkZWxheU1zLCByZXBseTtcbiAgICAgIGlmIChvbklucHV0ID09IG51bGwpIHtcbiAgICAgICAgb25JbnB1dCA9IG5vcDtcbiAgICAgIH1cbiAgICAgIGlmIChvbkZsdXNoID09IG51bGwpIHtcbiAgICAgICAgb25GbHVzaCA9IG5vcDtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlciA9IHtcbiAgICAgICAgc2NoZWR1bGVkOiBmYWxzZSxcbiAgICAgICAgZW5kOiB2b2lkIDAsXG4gICAgICAgIHZhbHVlczogW10sXG4gICAgICAgIGZsdXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gobmV4dCh0aGlzLnZhbHVlcykpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2godGhpcy5lbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvbkZsdXNoKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNjaGVkdWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsYXkoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuZmx1c2goKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICBpZiAoIWlzRnVuY3Rpb24oZGVsYXkpKSB7XG4gICAgICAgIGRlbGF5TXMgPSBkZWxheTtcbiAgICAgICAgZGVsYXkgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5zZXRUaW1lb3V0KGYsIGRlbGF5TXMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlclwiLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGJ1ZmZlci5wdXNoID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIGJ1ZmZlci5lbmQgPSBldmVudDtcbiAgICAgICAgICBpZiAoIWJ1ZmZlci5zY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIGJ1ZmZlci5mbHVzaCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWZmZXIudmFsdWVzLnB1c2goZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgb25JbnB1dChidWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24ocmlnaHQpIHtcbiAgICAgIHZhciBsZWZ0O1xuICAgICAgYXNzZXJ0RXZlbnRTdHJlYW0ocmlnaHQpO1xuICAgICAgbGVmdCA9IHRoaXM7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKGxlZnQsIFwibWVyZ2VcIiwgcmlnaHQsIEJhY29uLm1lcmdlQWxsKHRoaXMsIHJpZ2h0KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24oaW5pdFZhbHVlXykge1xuICAgICAgdmFyIGRpc3AsIGluaXRWYWx1ZTtcbiAgICAgIGluaXRWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDAgPyBOb25lIDogdG9PcHRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpbml0VmFsdWVfO1xuICAgICAgfSk7XG4gICAgICBkaXNwID0gdGhpcy5kaXNwYXRjaGVyO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eShkZXNjcmliZSh0aGlzLCBcInRvUHJvcGVydHlcIiwgaW5pdFZhbHVlXyksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIGluaXRTZW50LCByZXBseSwgc2VuZEluaXQsIHVuc3ViO1xuICAgICAgICBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgICB1bnN1YiA9IG5vcDtcbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBzZW5kSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghaW5pdFNlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0VmFsdWUuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhuZXcgSW5pdGlhbCh2YWx1ZSkpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuc3ViID0gbm9wO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVuc3ViID0gZGlzcC5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgaWYgKGluaXRTZW50ICYmIGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICBpbml0VmFsdWUgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgIHJldHVybiB1bnN1YjtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudG9FdmVudFN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5zYW1wbGVkQnkgPSBmdW5jdGlvbihzYW1wbGVyLCBjb21iaW5hdG9yKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2FtcGxlZEJ5XCIsIHNhbXBsZXIsIGNvbWJpbmF0b3IsIHRoaXMudG9Qcm9wZXJ0eSgpLnNhbXBsZWRCeShzYW1wbGVyLCBjb21iaW5hdG9yKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbihyaWdodCkge1xuICAgICAgdmFyIGxlZnQ7XG4gICAgICBsZWZ0ID0gdGhpcztcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUobGVmdCwgXCJjb25jYXRcIiwgcmlnaHQpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgIHZhciB1bnN1YkxlZnQsIHVuc3ViUmlnaHQ7XG4gICAgICAgIHVuc3ViUmlnaHQgPSBub3A7XG4gICAgICAgIHVuc3ViTGVmdCA9IGxlZnQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZSkge1xuICAgICAgICAgIGlmIChlLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bnN1YlJpZ2h0ID0gcmlnaHQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5rKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB1bnN1YkxlZnQoKTtcbiAgICAgICAgICByZXR1cm4gdW5zdWJSaWdodCgpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50YWtlVW50aWwgPSBmdW5jdGlvbihzdG9wcGVyKSB7XG4gICAgICB2YXIgZW5kTWFya2VyO1xuICAgICAgZW5kTWFya2VyID0ge307XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVVudGlsXCIsIHN0b3BwZXIsIEJhY29uLmdyb3VwU2ltdWx0YW5lb3VzKHRoaXMubWFwRW5kKGVuZE1hcmtlciksIHN0b3BwZXIuc2tpcEVycm9ycygpKS53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgZGF0YSwgcmVwbHksIHZhbHVlLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9yZWYxID0gZXZlbnQudmFsdWUoKSwgZGF0YSA9IF9yZWYxWzBdLCBzdG9wcGVyID0gX3JlZjFbMV07XG4gICAgICAgICAgaWYgKHN0b3BwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBkYXRhLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gZGF0YVtfaV07XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZW5kTWFya2VyKSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG5leHQodmFsdWUpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFVudGlsID0gZnVuY3Rpb24oc3RhcnRlcikge1xuICAgICAgdmFyIHN0YXJ0ZWQ7XG4gICAgICBzdGFydGVkID0gc3RhcnRlci50YWtlKDEpLm1hcCh0cnVlKS50b1Byb3BlcnR5KGZhbHNlKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwVW50aWxcIiwgc3RhcnRlciwgdGhpcy5maWx0ZXIoc3RhcnRlZCkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFdoaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgZiwgb2s7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIG9rID0gZmFsc2U7XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBXaGlsZVwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKG9rIHx8ICFldmVudC5oYXNWYWx1ZSgpIHx8ICFmKGV2ZW50LnZhbHVlKCkpKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRXaGVuID0gZnVuY3Rpb24odmFsdmUpIHtcbiAgICAgIHZhciBwdXRUb0hvbGQsIHJlbGVhc2VIb2xkLCB2YWx2ZV87XG4gICAgICB2YWx2ZV8gPSB2YWx2ZS5zdGFydFdpdGgoZmFsc2UpO1xuICAgICAgcmVsZWFzZUhvbGQgPSB2YWx2ZV8uZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuICF4O1xuICAgICAgfSk7XG4gICAgICBwdXRUb0hvbGQgPSB2YWx2ZV8uZmlsdGVyKF8uaWQpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImhvbGRXaGVuXCIsIHZhbHZlLCB0aGlzLmZpbHRlcihmYWxzZSkubWVyZ2UodmFsdmVfLmZsYXRNYXBDb25jYXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaG91bGRIb2xkKSB7XG4gICAgICAgICAgaWYgKCFzaG91bGRIb2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMudGFrZVVudGlsKHB1dFRvSG9sZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zY2FuKFtdLCAoZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHhzLmNvbmNhdCh4KTtcbiAgICAgICAgICAgIH0pKS5zYW1wbGVkQnkocmVsZWFzZUhvbGQpLnRha2UoMSkuZmxhdE1hcChCYWNvbi5mcm9tQXJyYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuc3RhcnRXaXRoID0gZnVuY3Rpb24oc2VlZCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInN0YXJ0V2l0aFwiLCBzZWVkLCBCYWNvbi5vbmNlKHNlZWQpLmNvbmNhdCh0aGlzKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUodGhpcywgXCJ3aXRoSGFuZGxlclwiLCBoYW5kbGVyKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudFN0cmVhbTtcblxuICB9KShPYnNlcnZhYmxlKTtcblxuICBQcm9wZXJ0eSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJvcGVydHksIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBQcm9wZXJ0eShkZXNjLCBzdWJzY3JpYmUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKGRlc2MpKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzdWJzY3JpYmU7XG4gICAgICAgIHN1YnNjcmliZSA9IGRlc2M7XG4gICAgICAgIGRlc2MgPSBbXTtcbiAgICAgIH1cbiAgICAgIFByb3BlcnR5Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGRlc2MpO1xuICAgICAgYXNzZXJ0RnVuY3Rpb24oc3Vic2NyaWJlKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBQcm9wZXJ0eURpc3BhdGNoZXIodGhpcywgc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICAgIHJlZ2lzdGVyT2JzKHRoaXMpO1xuICAgIH1cblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5zYW1wbGVkQnkgPSBmdW5jdGlvbihzYW1wbGVyLCBjb21iaW5hdG9yKSB7XG4gICAgICB2YXIgbGF6eSwgcmVzdWx0LCBzYW1wbGVyU291cmNlLCBzdHJlYW0sIHRoaXNTb3VyY2U7XG4gICAgICBpZiAoY29tYmluYXRvciAhPSBudWxsKSB7XG4gICAgICAgIGNvbWJpbmF0b3IgPSB0b0NvbWJpbmF0b3IoY29tYmluYXRvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXp5ID0gdHJ1ZTtcbiAgICAgICAgY29tYmluYXRvciA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gZi52YWx1ZSgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdGhpc1NvdXJjZSA9IG5ldyBTb3VyY2UodGhpcywgZmFsc2UsIGxhenkpO1xuICAgICAgc2FtcGxlclNvdXJjZSA9IG5ldyBTb3VyY2Uoc2FtcGxlciwgdHJ1ZSwgbGF6eSk7XG4gICAgICBzdHJlYW0gPSBCYWNvbi53aGVuKFt0aGlzU291cmNlLCBzYW1wbGVyU291cmNlXSwgY29tYmluYXRvcik7XG4gICAgICByZXN1bHQgPSBzYW1wbGVyIGluc3RhbmNlb2YgUHJvcGVydHkgPyBzdHJlYW0udG9Qcm9wZXJ0eSgpIDogc3RyZWFtO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNhbXBsZWRCeVwiLCBzYW1wbGVyLCBjb21iaW5hdG9yLCByZXN1bHQpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuc2FtcGxlID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVcIiwgaW50ZXJ2YWwsIHRoaXMuc2FtcGxlZEJ5KEJhY29uLmludGVydmFsKGludGVydmFsLCB7fSkpKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmNoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUodGhpcywgXCJjaGFuZ2VzXCIpLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUud2l0aEhhbmRsZXIgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwid2l0aEhhbmRsZXJcIiwgaGFuZGxlciksIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUudG9Qcm9wZXJ0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgYXNzZXJ0Tm9Bcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUudG9FdmVudFN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcInRvRXZlbnRTdHJlYW1cIiksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnQudG9OZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5hbmQgPSBmdW5jdGlvbihvdGhlcikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImFuZFwiLCBvdGhlciwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB4ICYmIHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5vciA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwib3JcIiwgb3RoZXIsIHRoaXMuY29tYmluZShvdGhlciwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4geCB8fCB5O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwiZGVsYXlcIiwgZGVsYXksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5nZXMuZGVsYXkoZGVsYXkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMoXCJkZWJvdW5jZVwiLCBkZWxheSwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICByZXR1cm4gY2hhbmdlcy5kZWJvdW5jZShkZWxheSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhcInRocm90dGxlXCIsIGRlbGF5LCBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VzLnRocm90dGxlKGRlbGF5KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuZGVsYXlDaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGVzYywgZiwgX2k7XG4gICAgICBkZXNjID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgX2kgPSBhcmd1bWVudHMubGVuZ3RoIC0gMSkgOiAoX2kgPSAwLCBbXSksIGYgPSBhcmd1bWVudHNbX2krK107XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFt0aGlzXS5jb25jYXQoX19zbGljZS5jYWxsKGRlc2MpLCBbYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSh0aGlzLCBmKHRoaXMuY2hhbmdlcygpKSldKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50YWtlVW50aWwgPSBmdW5jdGlvbihzdG9wcGVyKSB7XG4gICAgICB2YXIgY2hhbmdlcztcbiAgICAgIGNoYW5nZXMgPSB0aGlzLmNoYW5nZXMoKS50YWtlVW50aWwoc3RvcHBlcik7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVVudGlsXCIsIHN0b3BwZXIsIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0odGhpcywgY2hhbmdlcykpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuc3RhcnRXaXRoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzdGFydFdpdGhcIiwgdmFsdWUsIHRoaXMuc2Nhbih2YWx1ZSwgZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmJ1ZmZlcmluZ1Rocm90dGxlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3JlZjE7XG4gICAgICByZXR1cm4gKF9yZWYxID0gUHJvcGVydHkuX19zdXBlcl9fLmJ1ZmZlcmluZ1Rocm90dGxlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpLmJ1ZmZlcmluZ1Rocm90dGxlLmFwcGx5KF9yZWYxLCBhcmd1bWVudHMpLnRvUHJvcGVydHkoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3BlcnR5O1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIGNvbnZlcnRBcmdzVG9GdW5jdGlvbiA9IGZ1bmN0aW9uKG9icywgZiwgYXJncywgbWV0aG9kKSB7XG4gICAgdmFyIHNhbXBsZWQ7XG4gICAgaWYgKGYgaW5zdGFuY2VvZiBQcm9wZXJ0eSkge1xuICAgICAgc2FtcGxlZCA9IGYuc2FtcGxlZEJ5KG9icywgZnVuY3Rpb24ocCwgcykge1xuICAgICAgICByZXR1cm4gW3AsIHNdO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWV0aG9kLmNhbGwoc2FtcGxlZCwgZnVuY3Rpb24oX2FyZykge1xuICAgICAgICB2YXIgcCwgcztcbiAgICAgICAgcCA9IF9hcmdbMF0sIHMgPSBfYXJnWzFdO1xuICAgICAgICByZXR1cm4gcDtcbiAgICAgIH0pLm1hcChmdW5jdGlvbihfYXJnKSB7XG4gICAgICAgIHZhciBwLCBzO1xuICAgICAgICBwID0gX2FyZ1swXSwgcyA9IF9hcmdbMV07XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb24oZiwgYXJncyk7XG4gICAgICByZXR1cm4gbWV0aG9kLmNhbGwob2JzLCBmKTtcbiAgICB9XG4gIH07XG5cbiAgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSA9IGZ1bmN0aW9uKHByb3BlcnR5LCBzdHJlYW0pIHtcbiAgICB2YXIganVzdEluaXRWYWx1ZTtcbiAgICBqdXN0SW5pdFZhbHVlID0gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHByb3BlcnR5LCBcImp1c3RJbml0VmFsdWVcIiksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciB1bnN1YiwgdmFsdWU7XG4gICAgICB2YWx1ZSA9IHZvaWQgMDtcbiAgICAgIHVuc3ViID0gcHJvcGVydHkuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgdmFsdWUgPSBldmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgfSk7XG4gICAgICBVcGRhdGVCYXJyaWVyLndoZW5Eb25lV2l0aChqdXN0SW5pdFZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICBzaW5rKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luayhlbmQoKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB1bnN1YjtcbiAgICB9KTtcbiAgICByZXR1cm4ganVzdEluaXRWYWx1ZS5jb25jYXQoc3RyZWFtKS50b1Byb3BlcnR5KCk7XG4gIH07XG5cbiAgRGlzcGF0Y2hlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBEaXNwYXRjaGVyKF9zdWJzY3JpYmUsIF9oYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5fc3Vic2NyaWJlID0gX3N1YnNjcmliZTtcbiAgICAgIHRoaXMuX2hhbmRsZUV2ZW50ID0gX2hhbmRsZUV2ZW50O1xuICAgICAgdGhpcy5zdWJzY3JpYmUgPSBfX2JpbmQodGhpcy5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgdGhpcy5oYW5kbGVFdmVudCA9IF9fYmluZCh0aGlzLmhhbmRsZUV2ZW50LCB0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnByZXZFcnJvciA9IHZvaWQgMDtcbiAgICAgIHRoaXMudW5zdWJTcmMgPSB2b2lkIDA7XG4gICAgfVxuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzU3Vic2NyaWJlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zID0gXy53aXRob3V0KHN1YnNjcmlwdGlvbiwgdGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLmluVHJhbnNhY3Rpb24oZXZlbnQsIHRoaXMsIHRoaXMucHVzaEl0LCBbZXZlbnRdKTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaFRvU3Vic2NyaXB0aW9ucyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZSwgcmVwbHksIHN1YiwgdG1wLCBfaSwgX2xlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRtcCA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB0bXAubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBzdWIgPSB0bXBbX2ldO1xuICAgICAgICAgIHJlcGx5ID0gc3ViLnNpbmsoZXZlbnQpO1xuICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlIHx8IGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3ViKHN1Yik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIGUgPSBfZXJyb3I7XG4gICAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnB1c2hJdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoIXRoaXMucHVzaGluZykge1xuICAgICAgICBpZiAoZXZlbnQgPT09IHRoaXMucHJldkVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICB0aGlzLnByZXZFcnJvciA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVzaGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucHVzaFRvU3Vic2NyaXB0aW9ucyhldmVudCk7XG4gICAgICAgIHRoaXMucHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICBldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc1N1YnNjcmliZXJzKCkpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSgpO1xuICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChldmVudCk7XG4gICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5faGFuZGxlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS51bnN1YnNjcmliZUZyb21Tb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnVuc3ViU3JjKSB7XG4gICAgICAgIHRoaXMudW5zdWJTcmMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnVuc3ViU3JjID0gdm9pZCAwO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgc2luayhlbmQoKSk7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc3NlcnRGdW5jdGlvbihzaW5rKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgIHNpbms6IHNpbmtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnVuc3ViU3JjID0gdGhpcy5fc3Vic2NyaWJlKHRoaXMuaGFuZGxlRXZlbnQpO1xuICAgICAgICAgIGFzc2VydEZ1bmN0aW9uKHRoaXMudW5zdWJTcmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVTdWIoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaGFzU3Vic2NyaWJlcnMoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmVGcm9tU291cmNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEaXNwYXRjaGVyO1xuXG4gIH0pKCk7XG5cbiAgUHJvcGVydHlEaXNwYXRjaGVyID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eURpc3BhdGNoZXIsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBQcm9wZXJ0eURpc3BhdGNoZXIocHJvcGVydHksIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpIHtcbiAgICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlID0gX19iaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIFByb3BlcnR5RGlzcGF0Y2hlci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBzdWJzY3JpYmUsIGhhbmRsZUV2ZW50KTtcbiAgICAgIHRoaXMuY3VycmVudCA9IE5vbmU7XG4gICAgICB0aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZCA9IHZvaWQgMDtcbiAgICAgIHRoaXMucHJvcGVydHlFbmRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIFByb3BlcnR5RGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICB0aGlzLnByb3BlcnR5RW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbmV3IFNvbWUoZXZlbnQpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZCA9IFVwZGF0ZUJhcnJpZXIuY3VycmVudEV2ZW50SWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9wZXJ0eURpc3BhdGNoZXIuX19zdXBlcl9fLnB1c2guY2FsbCh0aGlzLCBldmVudCk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5RGlzcGF0Y2hlci5wcm90b3R5cGUubWF5YmVTdWJTb3VyY2UgPSBmdW5jdGlvbihzaW5rLCByZXBseSkge1xuICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wZXJ0eUVuZGVkKSB7XG4gICAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZS5jYWxsKHRoaXMsIHNpbmspO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBkaXNwYXRjaGluZ0lkLCBpbml0U2VudCwgcmVwbHksIHZhbElkO1xuICAgICAgaW5pdFNlbnQgPSBmYWxzZTtcbiAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuaXNEZWZpbmVkICYmICh0aGlzLmhhc1N1YnNjcmliZXJzKCkgfHwgdGhpcy5wcm9wZXJ0eUVuZGVkKSkge1xuICAgICAgICBkaXNwYXRjaGluZ0lkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgICAgICB2YWxJZCA9IHRoaXMuY3VycmVudFZhbHVlUm9vdElkO1xuICAgICAgICBpZiAoIXRoaXMucHJvcGVydHlFbmRlZCAmJiB2YWxJZCAmJiBkaXNwYXRjaGluZ0lkICYmIGRpc3BhdGNoaW5nSWQgIT09IHZhbElkKSB7XG4gICAgICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgodGhpcy5wcm9wZXJ0eSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPT09IHZhbElkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoaW5pdGlhbChfdGhpcy5jdXJyZW50LmdldCgpLnZhbHVlKCkpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbih2b2lkIDAsIHRoaXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBseSA9IHNpbmsoaW5pdGlhbCh0aGlzLmN1cnJlbnQuZ2V0KCkudmFsdWUoKSkpO1xuICAgICAgICAgIH0pLCBbXSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBQcm9wZXJ0eURpc3BhdGNoZXI7XG5cbiAgfSkoRGlzcGF0Y2hlcik7XG5cbiAgQnVzID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXMsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBCdXMoKSB7XG4gICAgICB0aGlzLmd1YXJkZWRTaW5rID0gX19iaW5kKHRoaXMuZ3VhcmRlZFNpbmssIHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVBbGwgPSBfX2JpbmQodGhpcy5zdWJzY3JpYmVBbGwsIHRoaXMpO1xuICAgICAgdGhpcy51bnN1YkFsbCA9IF9fYmluZCh0aGlzLnVuc3ViQWxsLCB0aGlzKTtcbiAgICAgIHRoaXMuc2luayA9IHZvaWQgMDtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5lbmRlZCA9IGZhbHNlO1xuICAgICAgQnVzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGRlc2NyaWJlKEJhY29uLCBcIkJ1c1wiKSwgdGhpcy5zdWJzY3JpYmVBbGwpO1xuICAgIH1cblxuICAgIEJ1cy5wcm90b3R5cGUudW5zdWJBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdWIsIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgIF9yZWYxID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzdWIgPSBfcmVmMVtfaV07XG4gICAgICAgIGlmICh0eXBlb2Ygc3ViLnVuc3ViID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBzdWIudW5zdWIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5zdWJzY3JpYmVBbGwgPSBmdW5jdGlvbihuZXdTaW5rKSB7XG4gICAgICB2YXIgc3Vic2NyaXB0aW9uLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICB0aGlzLnNpbmsgPSBuZXdTaW5rO1xuICAgICAgX3JlZjEgPSBjbG9uZUFycmF5KHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IF9yZWYxW19pXTtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dChzdWJzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudW5zdWJBbGw7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuZ3VhcmRlZFNpbmsgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgX3RoaXMudW5zdWJzY3JpYmVJbnB1dChpbnB1dCk7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuc3Vic2NyaWJlSW5wdXQgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWIgPSBzdWJzY3JpcHRpb24uaW5wdXQuZGlzcGF0Y2hlci5zdWJzY3JpYmUodGhpcy5ndWFyZGVkU2luayhzdWJzY3JpcHRpb24uaW5wdXQpKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS51bnN1YnNjcmliZUlucHV0ID0gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgIHZhciBpLCBzdWIsIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgIF9yZWYxID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHN1YiA9IF9yZWYxW2ldO1xuICAgICAgICBpZiAoc3ViLmlucHV0ID09PSBpbnB1dCkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc3ViLnVuc3ViID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHN1Yi51bnN1YigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnBsdWcgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgdmFyIHN1YjtcbiAgICAgIGFzc2VydE9ic2VydmFibGUoaW5wdXQpO1xuICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3ViID0ge1xuICAgICAgICBpbnB1dDogaW5wdXRcbiAgICAgIH07XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWIpO1xuICAgICAgaWYgKCh0aGlzLnNpbmsgIT0gbnVsbCkpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dChzdWIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnVuc3Vic2NyaWJlSW5wdXQoaW5wdXQpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudW5zdWJBbGwoKTtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnNpbmsoZW5kKCkpIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhuZXh0KHZhbHVlKSkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhuZXcgRXJyb3IoZXJyb3IpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1cztcblxuICB9KShFdmVudFN0cmVhbSk7XG5cbiAgU291cmNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvdXJjZShvYnMsIHN5bmMsIGxhenkpIHtcbiAgICAgIHRoaXMub2JzID0gb2JzO1xuICAgICAgdGhpcy5zeW5jID0gc3luYztcbiAgICAgIHRoaXMubGF6eSA9IGxhenkgIT0gbnVsbCA/IGxhenkgOiBmYWxzZTtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB9XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiB0aGlzLm9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShzaW5rKTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMub2JzLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUubWFya0VuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbmRlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBfLmFsd2F5cyh0aGlzLnF1ZXVlWzBdKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWVbMF07XG4gICAgICB9XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlID0gW3hdO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLm1heUhhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmhhc0F0TGVhc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5mbGF0dGVuID0gdHJ1ZTtcblxuICAgIHJldHVybiBTb3VyY2U7XG5cbiAgfSkoKTtcblxuICBDb25zdW1pbmdTb3VyY2UgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnN1bWluZ1NvdXJjZSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIENvbnN1bWluZ1NvdXJjZSgpIHtcbiAgICAgIHJldHVybiBDb25zdW1pbmdTb3VyY2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5wdXNoKHgpO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLm1heUhhdmUgPSBmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gIXRoaXMuZW5kZWQgfHwgdGhpcy5xdWV1ZS5sZW5ndGggPj0gYztcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5oYXNBdExlYXN0ID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoID49IGM7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuZmxhdHRlbiA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIENvbnN1bWluZ1NvdXJjZTtcblxuICB9KShTb3VyY2UpO1xuXG4gIEJ1ZmZlcmluZ1NvdXJjZSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnVmZmVyaW5nU291cmNlLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gQnVmZmVyaW5nU291cmNlKG9icykge1xuICAgICAgQnVmZmVyaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9icywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWVzO1xuICAgICAgdmFsdWVzID0gdGhpcy5xdWV1ZTtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5wdXNoKHgudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJldHVybiBCdWZmZXJpbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBTb3VyY2UuaXNUcmlnZ2VyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzIGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gcy5zeW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcyBpbnN0YW5jZW9mIEV2ZW50U3RyZWFtO1xuICAgIH1cbiAgfTtcblxuICBTb3VyY2UuZnJvbU9ic2VydmFibGUgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHMgaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBzO1xuICAgIH0gZWxzZSBpZiAocyBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gbmV3IFNvdXJjZShzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ29uc3VtaW5nU291cmNlKHMsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBkZXNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBjb250ZXh0LCBtZXRob2Q7XG4gICAgY29udGV4dCA9IGFyZ3VtZW50c1swXSwgbWV0aG9kID0gYXJndW1lbnRzWzFdLCBhcmdzID0gMyA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBbXTtcbiAgICBpZiAoKGNvbnRleHQgfHwgbWV0aG9kKSBpbnN0YW5jZW9mIERlc2MpIHtcbiAgICAgIHJldHVybiBjb250ZXh0IHx8IG1ldGhvZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEZXNjKGNvbnRleHQsIG1ldGhvZCwgYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIGZpbmREZXBzID0gZnVuY3Rpb24oeCkge1xuICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICByZXR1cm4gXy5mbGF0TWFwKGZpbmREZXBzLCB4KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZSh4KSkge1xuICAgICAgcmV0dXJuIFt4XTtcbiAgICB9IGVsc2UgaWYgKHggaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBbeC5vYnNdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9O1xuXG4gIERlc2MgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRGVzYyhjb250ZXh0LCBtZXRob2QsIGFyZ3MpIHtcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgICB0aGlzLmNhY2hlZCA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICBEZXNjLnByb3RvdHlwZS5kZXBzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWNoZWQgfHwgKHRoaXMuY2FjaGVkID0gZmluZERlcHMoW3RoaXMuY29udGV4dF0uY29uY2F0KHRoaXMuYXJncykpKTtcbiAgICB9O1xuXG4gICAgRGVzYy5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgIG9icy5kZXNjID0gdGhpcztcbiAgICAgIHJldHVybiBvYnM7XG4gICAgfTtcblxuICAgIERlc2MucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXy50b1N0cmluZyh0aGlzLmNvbnRleHQpICsgXCIuXCIgKyBfLnRvU3RyaW5nKHRoaXMubWV0aG9kKSArIFwiKFwiICsgXy5tYXAoXy50b1N0cmluZywgdGhpcy5hcmdzKSArIFwiKVwiO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGVzYztcblxuICB9KSgpO1xuXG4gIHdpdGhEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkZXNjLCBvYnMsIF9pO1xuICAgIGRlc2MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBfaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChfaSA9IDAsIFtdKSwgb2JzID0gYXJndW1lbnRzW19pKytdO1xuICAgIHJldHVybiBkZXNjcmliZS5hcHBseShudWxsLCBkZXNjKS5hcHBseShvYnMpO1xuICB9O1xuXG4gIEJhY29uLndoZW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgaSwgaW5kZXgsIGl4LCBsZW4sIG5lZWRzQmFycmllciwgcGF0LCBwYXRTb3VyY2VzLCBwYXRzLCBwYXR0ZXJucywgcmVzdWx0U3RyZWFtLCBzLCBzb3VyY2VzLCB0cmlnZ2VyRm91bmQsIHVzYWdlLCBfaSwgX2osIF9sZW4sIF9sZW4xLCBfcmVmMTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgfVxuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdXNhZ2UgPSBcIndoZW46IGV4cGVjdGluZyBhcmd1bWVudHMgaW4gdGhlIGZvcm0gKE9ic2VydmFibGUrLGZ1bmN0aW9uKStcIjtcbiAgICBhc3NlcnQodXNhZ2UsIGxlbiAlIDIgPT09IDApO1xuICAgIHNvdXJjZXMgPSBbXTtcbiAgICBwYXRzID0gW107XG4gICAgaSA9IDA7XG4gICAgcGF0dGVybnMgPSBbXTtcbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcGF0dGVybnNbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICBwYXR0ZXJuc1tpICsgMV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgcGF0U291cmNlcyA9IF8udG9BcnJheShhcmd1bWVudHNbaV0pO1xuICAgICAgZiA9IGNvbnN0YW50VG9GdW5jdGlvbihhcmd1bWVudHNbaSArIDFdKTtcbiAgICAgIHBhdCA9IHtcbiAgICAgICAgZjogZixcbiAgICAgICAgaXhzOiBbXVxuICAgICAgfTtcbiAgICAgIHRyaWdnZXJGb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBwYXRTb3VyY2VzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBwYXRTb3VyY2VzW19pXTtcbiAgICAgICAgaW5kZXggPSBfLmluZGV4T2Yoc291cmNlcywgcyk7XG4gICAgICAgIGlmICghdHJpZ2dlckZvdW5kKSB7XG4gICAgICAgICAgdHJpZ2dlckZvdW5kID0gU291cmNlLmlzVHJpZ2dlcihzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgc291cmNlcy5wdXNoKHMpO1xuICAgICAgICAgIGluZGV4ID0gc291cmNlcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIF9yZWYxID0gcGF0Lml4cztcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjEubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgaXggPSBfcmVmMVtfal07XG4gICAgICAgICAgaWYgKGl4LmluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgaXguY291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGF0Lml4cy5wdXNoKHtcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgY291bnQ6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBhc3NlcnQoXCJBdCBsZWFzdCBvbmUgRXZlbnRTdHJlYW0gcmVxdWlyZWRcIiwgdHJpZ2dlckZvdW5kIHx8ICghcGF0U291cmNlcy5sZW5ndGgpKTtcbiAgICAgIGlmIChwYXRTb3VyY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGF0cy5wdXNoKHBhdCk7XG4gICAgICB9XG4gICAgICBpID0gaSArIDI7XG4gICAgfVxuICAgIGlmICghc291cmNlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgIH1cbiAgICBzb3VyY2VzID0gXy5tYXAoU291cmNlLmZyb21PYnNlcnZhYmxlLCBzb3VyY2VzKTtcbiAgICBuZWVkc0JhcnJpZXIgPSAoXy5hbnkoc291cmNlcywgZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMuZmxhdHRlbjtcbiAgICB9KSkgJiYgKGNvbnRhaW5zRHVwbGljYXRlRGVwcyhfLm1hcCgoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMub2JzO1xuICAgIH0pLCBzb3VyY2VzKSkpO1xuICAgIHJldHVybiByZXN1bHRTdHJlYW0gPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUuYXBwbHkobnVsbCwgW0JhY29uLCBcIndoZW5cIl0uY29uY2F0KF9fc2xpY2UuY2FsbChwYXR0ZXJucykpKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGNhbm5vdE1hdGNoLCBjYW5ub3RTeW5jLCBlbmRzLCBtYXRjaCwgbm9uRmxhdHRlbmVkLCBwYXJ0LCB0cmlnZ2VycztcbiAgICAgIHRyaWdnZXJzID0gW107XG4gICAgICBlbmRzID0gZmFsc2U7XG4gICAgICBtYXRjaCA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdmFyIF9rLCBfbGVuMiwgX3JlZjI7XG4gICAgICAgIF9yZWYyID0gcC5peHM7XG4gICAgICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IF9yZWYyLmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgICAgIGkgPSBfcmVmMltfa107XG4gICAgICAgICAgaWYgKCFzb3VyY2VzW2kuaW5kZXhdLmhhc0F0TGVhc3QoaS5jb3VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgICAgY2Fubm90U3luYyA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gIXNvdXJjZS5zeW5jIHx8IHNvdXJjZS5lbmRlZDtcbiAgICAgIH07XG4gICAgICBjYW5ub3RNYXRjaCA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgdmFyIF9rLCBfbGVuMiwgX3JlZjI7XG4gICAgICAgIF9yZWYyID0gcC5peHM7XG4gICAgICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IF9yZWYyLmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgICAgIGkgPSBfcmVmMltfa107XG4gICAgICAgICAgaWYgKCFzb3VyY2VzW2kuaW5kZXhdLm1heUhhdmUoaS5jb3VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG5vbkZsYXR0ZW5lZCA9IGZ1bmN0aW9uKHRyaWdnZXIpIHtcbiAgICAgICAgcmV0dXJuICF0cmlnZ2VyLnNvdXJjZS5mbGF0dGVuO1xuICAgICAgfTtcbiAgICAgIHBhcnQgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHVuc3ViQWxsKSB7XG4gICAgICAgICAgdmFyIGZsdXNoLCBmbHVzaExhdGVyLCBmbHVzaFdoaWxlVHJpZ2dlcnM7XG4gICAgICAgICAgZmx1c2hMYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHJlc3VsdFN0cmVhbSwgZmx1c2gpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgZmx1c2hXaGlsZVRyaWdnZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRzLCBwLCByZXBseSwgdHJpZ2dlciwgX2ssIF9sZW4yO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJpZ2dlcnMucG9wKCk7XG4gICAgICAgICAgICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IHBhdHMubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgICAgICAgcCA9IHBhdHNbX2tdO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaChwKSkge1xuICAgICAgICAgICAgICAgICAgZXZlbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2wsIF9sZW4zLCBfcmVmMiwgX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgIF9yZWYyID0gcC5peHM7XG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoX2wgPSAwLCBfbGVuMyA9IF9yZWYyLmxlbmd0aDsgX2wgPCBfbGVuMzsgX2wrKykge1xuICAgICAgICAgICAgICAgICAgICAgIGkgPSBfcmVmMltfbF07XG4gICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChzb3VyY2VzW2kuaW5kZXhdLmNvbnN1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgIHJlcGx5ID0gc2luayh0cmlnZ2VyLmUuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudCwgdmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIF9sLCBfbGVuMywgX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9sID0gMCwgX2xlbjMgPSBldmVudHMubGVuZ3RoOyBfbCA8IF9sZW4zOyBfbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1tfbF07XG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmYuYXBwbHkocCwgdmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGlmICh0cmlnZ2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcnMgPSBfLmZpbHRlcihub25GbGF0dGVuZWQsIHRyaWdnZXJzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICAgIHJlcGx5ID0gZmx1c2hXaGlsZVRyaWdnZXJzKCk7XG4gICAgICAgICAgICBpZiAoZW5kcykge1xuICAgICAgICAgICAgICBlbmRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChfLmFsbChzb3VyY2VzLCBjYW5ub3RTeW5jKSB8fCBfLmFsbChwYXRzLCBjYW5ub3RNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IEJhY29uLm5vTW9yZTtcbiAgICAgICAgICAgICAgICBzaW5rKGVuZCgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgdW5zdWJBbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICAgIGlmIChlLmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgZW5kcyA9IHRydWU7XG4gICAgICAgICAgICAgIHNvdXJjZS5tYXJrRW5kZWQoKTtcbiAgICAgICAgICAgICAgZmx1c2hMYXRlcigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmlzRXJyb3IoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzb3VyY2UucHVzaChlKTtcbiAgICAgICAgICAgICAgaWYgKHNvdXJjZS5zeW5jKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGU6IGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAobmVlZHNCYXJyaWVyIHx8IFVwZGF0ZUJhcnJpZXIuaGFzV2FpdGVycygpKSB7XG4gICAgICAgICAgICAgICAgICBmbHVzaExhdGVyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5IHx8IEJhY29uLm1vcmU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGNvbXBvc2l0ZVVuc3Vic2NyaWJlLmFwcGx5KG51bGwsIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9rLCBfbGVuMiwgX3Jlc3VsdHM7XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IHNvdXJjZXMubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgcyA9IHNvdXJjZXNbX2tdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2gocGFydChzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29udGFpbnNEdXBsaWNhdGVEZXBzID0gZnVuY3Rpb24ob2JzZXJ2YWJsZXMsIHN0YXRlKSB7XG4gICAgdmFyIGNoZWNrT2JzZXJ2YWJsZTtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSBbXTtcbiAgICB9XG4gICAgY2hlY2tPYnNlcnZhYmxlID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwcztcbiAgICAgIGlmIChfLmNvbnRhaW5zKHN0YXRlLCBvYnMpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwcyA9IG9icy5pbnRlcm5hbERlcHMoKTtcbiAgICAgICAgaWYgKGRlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICAgIHJldHVybiBfLmFueShkZXBzLCBjaGVja09ic2VydmFibGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnB1c2gob2JzKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBfLmFueShvYnNlcnZhYmxlcywgY2hlY2tPYnNlcnZhYmxlKTtcbiAgfTtcblxuICBCYWNvbi51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwgaW5pdGlhbCwgbGF0ZUJpbmRGaXJzdCwgcGF0dGVybnM7XG4gICAgaW5pdGlhbCA9IGFyZ3VtZW50c1swXSwgcGF0dGVybnMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGxhdGVCaW5kRmlyc3QgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBbaV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBpID0gcGF0dGVybnMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIGlmICghKHBhdHRlcm5zW2ldIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHBhdHRlcm5zW2ldID0gKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShwYXR0ZXJuc1tpXSk7XG4gICAgICB9XG4gICAgICBwYXR0ZXJuc1tpXSA9IGxhdGVCaW5kRmlyc3QocGF0dGVybnNbaV0pO1xuICAgICAgaSA9IGkgLSAyO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJ1cGRhdGVcIiwgaW5pdGlhbF0uY29uY2F0KF9fc2xpY2UuY2FsbChwYXR0ZXJucyksIFtCYWNvbi53aGVuLmFwcGx5KEJhY29uLCBwYXR0ZXJucykuc2Nhbihpbml0aWFsLCAoZnVuY3Rpb24oeCwgZikge1xuICAgICAgcmV0dXJuIGYoeCk7XG4gICAgfSkpXSkpO1xuICB9O1xuXG4gIGNvbXBvc2l0ZVVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNzO1xuICAgIHNzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICByZXR1cm4gbmV3IENvbXBvc2l0ZVVuc3Vic2NyaWJlKHNzKS51bnN1YnNjcmliZTtcbiAgfTtcblxuICBDb21wb3NpdGVVbnN1YnNjcmliZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb21wb3NpdGVVbnN1YnNjcmliZShzcykge1xuICAgICAgdmFyIHMsIF9pLCBfbGVuO1xuICAgICAgaWYgKHNzID09IG51bGwpIHtcbiAgICAgICAgc3MgPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBfX2JpbmQodGhpcy51bnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnN0YXJ0aW5nID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHNzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBzc1tfaV07XG4gICAgICAgIHRoaXMuYWRkKHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIENvbXBvc2l0ZVVuc3Vic2NyaWJlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHZhciBlbmRlZCwgdW5zdWIsIHVuc3ViTWU7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZW5kZWQgPSBmYWxzZTtcbiAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgdGhpcy5zdGFydGluZy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICB1bnN1Yk1lID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoX3RoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICBfdGhpcy5yZW1vdmUodW5zdWIpO1xuICAgICAgICAgIHJldHVybiBfLnJlbW92ZShzdWJzY3JpcHRpb24sIF90aGlzLnN0YXJ0aW5nKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdW5zdWIgPSBzdWJzY3JpcHRpb24odGhpcy51bnN1YnNjcmliZSwgdW5zdWJNZSk7XG4gICAgICBpZiAoISh0aGlzLnVuc3Vic2NyaWJlZCB8fCBlbmRlZCkpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godW5zdWIpO1xuICAgICAgfVxuICAgICAgXy5yZW1vdmUoc3Vic2NyaXB0aW9uLCB0aGlzLnN0YXJ0aW5nKTtcbiAgICAgIHJldHVybiB1bnN1YjtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHVuc3ViKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKChfLnJlbW92ZSh1bnN1YiwgdGhpcy5zdWJzY3JpcHRpb25zKSkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcywgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIF9yZWYxID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBzID0gX3JlZjFbX2ldO1xuICAgICAgICBzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzLnN0YXJ0aW5nID0gW107XG4gICAgfTtcblxuICAgIENvbXBvc2l0ZVVuc3Vic2NyaWJlLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggKyB0aGlzLnN0YXJ0aW5nLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb3VudCgpID09PSAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29tcG9zaXRlVW5zdWJzY3JpYmU7XG5cbiAgfSkoKTtcblxuICBCYWNvbi5Db21wb3NpdGVVbnN1YnNjcmliZSA9IENvbXBvc2l0ZVVuc3Vic2NyaWJlO1xuXG4gIFNvbWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU29tZSh2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIFNvbWUucHJvdG90eXBlLmdldE9yRWxzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGlmIChmKHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBuZXcgU29tZSh0aGlzLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBOb25lO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUoZih0aGlzLnZhbHVlKSk7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuaXNEZWZpbmVkID0gdHJ1ZTtcblxuICAgIFNvbWUucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbdGhpcy52YWx1ZV07XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIlNvbWUoXCIgKyB0aGlzLnZhbHVlICsgXCIpXCI7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTb21lO1xuXG4gIH0pKCk7XG5cbiAgTm9uZSA9IHtcbiAgICBnZXRPckVsc2U6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE5vbmU7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE5vbmU7XG4gICAgfSxcbiAgICBmb3JFYWNoOiBmdW5jdGlvbigpIHt9LFxuICAgIGlzRGVmaW5lZDogZmFsc2UsXG4gICAgdG9BcnJheTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcbiAgICBpbnNwZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIk5vbmVcIjtcbiAgICB9LFxuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3BlY3QoKTtcbiAgICB9XG4gIH07XG5cbiAgVXBkYXRlQmFycmllciA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgYWZ0ZXJUcmFuc2FjdGlvbiwgYWZ0ZXJzLCBhZnRlcnNJbmRleCwgY3VycmVudEV2ZW50SWQsIGZsdXNoLCBmbHVzaERlcHNPZiwgZmx1c2hXYWl0ZXJzLCBoYXNXYWl0ZXJzLCBpblRyYW5zYWN0aW9uLCByb290RXZlbnQsIHdhaXRlck9icywgd2FpdGVycywgd2hlbkRvbmVXaXRoLCB3cmFwcGVkU3Vic2NyaWJlO1xuICAgIHJvb3RFdmVudCA9IHZvaWQgMDtcbiAgICB3YWl0ZXJPYnMgPSBbXTtcbiAgICB3YWl0ZXJzID0ge307XG4gICAgYWZ0ZXJzID0gW107XG4gICAgYWZ0ZXJzSW5kZXggPSAwO1xuICAgIGFmdGVyVHJhbnNhY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIHJldHVybiBhZnRlcnMucHVzaChmKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGVuRG9uZVdpdGggPSBmdW5jdGlvbihvYnMsIGYpIHtcbiAgICAgIHZhciBvYnNXYWl0ZXJzO1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnMuaWRdO1xuICAgICAgICBpZiAob2JzV2FpdGVycyA9PSBudWxsKSB7XG4gICAgICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzLmlkXSA9IFtmXTtcbiAgICAgICAgICByZXR1cm4gd2FpdGVyT2JzLnB1c2gob2JzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JzV2FpdGVycy5wdXNoKGYpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfVxuICAgIH07XG4gICAgZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIHdoaWxlICh3YWl0ZXJPYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBmbHVzaFdhaXRlcnMoMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG4gICAgZmx1c2hXYWl0ZXJzID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIHZhciBmLCBvYnMsIG9ic0lkLCBvYnNXYWl0ZXJzLCBfaSwgX2xlbjtcbiAgICAgIG9icyA9IHdhaXRlck9ic1tpbmRleF07XG4gICAgICBvYnNJZCA9IG9icy5pZDtcbiAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29ic0lkXTtcbiAgICAgIHdhaXRlck9icy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZGVsZXRlIHdhaXRlcnNbb2JzSWRdO1xuICAgICAgZmx1c2hEZXBzT2Yob2JzKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gb2JzV2FpdGVycy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBmID0gb2JzV2FpdGVyc1tfaV07XG4gICAgICAgIGYoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcbiAgICBmbHVzaERlcHNPZiA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgdmFyIGRlcCwgZGVwcywgaW5kZXgsIF9pLCBfbGVuO1xuICAgICAgZGVwcyA9IG9icy5pbnRlcm5hbERlcHMoKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gZGVwcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBkZXAgPSBkZXBzW19pXTtcbiAgICAgICAgZmx1c2hEZXBzT2YoZGVwKTtcbiAgICAgICAgaWYgKHdhaXRlcnNbZGVwLmlkXSkge1xuICAgICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHdhaXRlck9icywgZGVwKTtcbiAgICAgICAgICBmbHVzaFdhaXRlcnMoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG4gICAgaW5UcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKGV2ZW50LCBjb250ZXh0LCBmLCBhcmdzKSB7XG4gICAgICB2YXIgYWZ0ZXIsIHJlc3VsdDtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290RXZlbnQgPSBldmVudDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBmLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgcm9vdEV2ZW50ID0gdm9pZCAwO1xuICAgICAgICAgIHdoaWxlIChhZnRlcnNJbmRleCA8IGFmdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFmdGVyID0gYWZ0ZXJzW2FmdGVyc0luZGV4XTtcbiAgICAgICAgICAgIGFmdGVyc0luZGV4Kys7XG4gICAgICAgICAgICBhZnRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZnRlcnNJbmRleCA9IDA7XG4gICAgICAgICAgYWZ0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGN1cnJlbnRFdmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIHJldHVybiByb290RXZlbnQuaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd3JhcHBlZFN1YnNjcmliZSA9IGZ1bmN0aW9uKG9icywgc2luaykge1xuICAgICAgdmFyIGRvVW5zdWIsIHNob3VsZFVuc3ViLCB1bnN1YiwgdW5zdWJkO1xuICAgICAgdW5zdWJkID0gZmFsc2U7XG4gICAgICBzaG91bGRVbnN1YiA9IGZhbHNlO1xuICAgICAgZG9VbnN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hvdWxkVW5zdWIgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIHVuc3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVuc3ViZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkb1Vuc3ViKCk7XG4gICAgICB9O1xuICAgICAgZG9VbnN1YiA9IG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJUcmFuc2FjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgaWYgKCF1bnN1YmQpIHtcbiAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkVW5zdWIpIHtcbiAgICAgICAgZG9VbnN1YigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH07XG4gICAgaGFzV2FpdGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdhaXRlck9icy5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHdoZW5Eb25lV2l0aDogd2hlbkRvbmVXaXRoLFxuICAgICAgaGFzV2FpdGVyczogaGFzV2FpdGVycyxcbiAgICAgIGluVHJhbnNhY3Rpb246IGluVHJhbnNhY3Rpb24sXG4gICAgICBjdXJyZW50RXZlbnRJZDogY3VycmVudEV2ZW50SWQsXG4gICAgICB3cmFwcGVkU3Vic2NyaWJlOiB3cmFwcGVkU3Vic2NyaWJlLFxuICAgICAgYWZ0ZXJUcmFuc2FjdGlvbjogYWZ0ZXJUcmFuc2FjdGlvblxuICAgIH07XG4gIH0pKCk7XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0gPSBFdmVudFN0cmVhbTtcblxuICBCYWNvbi5Qcm9wZXJ0eSA9IFByb3BlcnR5O1xuXG4gIEJhY29uLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG4gIEJhY29uLkJ1cyA9IEJ1cztcblxuICBCYWNvbi5Jbml0aWFsID0gSW5pdGlhbDtcblxuICBCYWNvbi5OZXh0ID0gTmV4dDtcblxuICBCYWNvbi5FbmQgPSBFbmQ7XG5cbiAgQmFjb24uRXJyb3IgPSBFcnJvcjtcblxuICBub3AgPSBmdW5jdGlvbigpIHt9O1xuXG4gIGxhdHRlciA9IGZ1bmN0aW9uKF8sIHgpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcblxuICBmb3JtZXIgPSBmdW5jdGlvbih4LCBfKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG5cbiAgaW5pdGlhbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlLCB0cnVlKTtcbiAgfTtcblxuICBuZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IE5leHQodmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRW5kKCk7XG4gIH07XG5cbiAgdG9FdmVudCA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCBpbnN0YW5jZW9mIEV2ZW50KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5leHQoeCk7XG4gICAgfVxuICB9O1xuXG4gIGNsb25lQXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIHJldHVybiB4cy5zbGljZSgwKTtcbiAgfTtcblxuICBhc3NlcnQgPSBmdW5jdGlvbihtZXNzYWdlLCBjb25kaXRpb24pIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihtZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0RXZlbnRTdHJlYW0gPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgRXZlbnRTdHJlYW0pKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIEV2ZW50U3RyZWFtIDogXCIgKyBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydE9ic2VydmFibGUgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gT2JzZXJ2YWJsZSA6IFwiICsgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gYXNzZXJ0KFwibm90IGEgZnVuY3Rpb24gOiBcIiArIGYsIGlzRnVuY3Rpb24oZikpO1xuICB9O1xuXG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBmID09PSBcImZ1bmN0aW9uXCI7XG4gIH07XG5cbiAgaXNBcnJheSA9IGZ1bmN0aW9uKHhzKSB7XG4gICAgcmV0dXJuIHhzIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbiAgaXNPYnNlcnZhYmxlID0gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4IGluc3RhbmNlb2YgT2JzZXJ2YWJsZTtcbiAgfTtcblxuICBhc3NlcnRBcnJheSA9IGZ1bmN0aW9uKHhzKSB7XG4gICAgaWYgKCFpc0FycmF5KHhzKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBhcnJheSA6IFwiICsgeHMpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnROb0FyZ3VtZW50cyA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gYXNzZXJ0KFwibm8gYXJndW1lbnRzIHN1cHBvcnRlZFwiLCBhcmdzLmxlbmd0aCA9PT0gMCk7XG4gIH07XG5cbiAgYXNzZXJ0U3RyaW5nID0gZnVuY3Rpb24oeCkge1xuICAgIGlmICh0eXBlb2YgeCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhIHN0cmluZyA6IFwiICsgeCk7XG4gICAgfVxuICB9O1xuXG4gIHBhcnRpYWxseUFwcGxpZWQgPSBmdW5jdGlvbihmLCBhcHBsaWVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIGFwcGxpZWQuY29uY2F0KGFyZ3MpKTtcbiAgICB9O1xuICB9O1xuXG4gIG1ha2VTcGF3bmVyID0gZnVuY3Rpb24oYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBpc09ic2VydmFibGUoYXJnc1swXSkpIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhhcmdzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1ha2VGdW5jdGlvbkFyZ3MoYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIG1ha2VGdW5jdGlvbkFyZ3MgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIHJldHVybiBtYWtlRnVuY3Rpb25fLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9O1xuXG4gIG1ha2VGdW5jdGlvbl8gPSB3aXRoTWV0aG9kQ2FsbFN1cHBvcnQoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKGlzRnVuY3Rpb24oZikpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcGFydGlhbGx5QXBwbGllZChmLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEtleShmKSkge1xuICAgICAgcmV0dXJuIHRvRmllbGRFeHRyYWN0b3IoZiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhmKTtcbiAgICB9XG4gIH0pO1xuXG4gIG1ha2VGdW5jdGlvbiA9IGZ1bmN0aW9uKGYsIGFyZ3MpIHtcbiAgICByZXR1cm4gbWFrZUZ1bmN0aW9uXy5hcHBseShudWxsLCBbZl0uY29uY2F0KF9fc2xpY2UuY2FsbChhcmdzKSkpO1xuICB9O1xuXG4gIGNvbnN0YW50VG9GdW5jdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihmKSkge1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhmKTtcbiAgICB9XG4gIH07XG5cbiAgbWFrZU9ic2VydmFibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh4KSkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpO1xuICAgIH1cbiAgfTtcblxuICBpc0ZpZWxkS2V5ID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiAodHlwZW9mIGYgPT09IFwic3RyaW5nXCIpICYmIGYubGVuZ3RoID4gMSAmJiBmLmNoYXJBdCgwKSA9PT0gXCIuXCI7XG4gIH07XG5cbiAgQmFjb24uaXNGaWVsZEtleSA9IGlzRmllbGRLZXk7XG5cbiAgdG9GaWVsZEV4dHJhY3RvciA9IGZ1bmN0aW9uKGYsIGFyZ3MpIHtcbiAgICB2YXIgcGFydEZ1bmNzLCBwYXJ0cztcbiAgICBwYXJ0cyA9IGYuc2xpY2UoMSkuc3BsaXQoXCIuXCIpO1xuICAgIHBhcnRGdW5jcyA9IF8ubWFwKHRvU2ltcGxlRXh0cmFjdG9yKGFyZ3MpLCBwYXJ0cyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgX2ksIF9sZW47XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHBhcnRGdW5jcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBmID0gcGFydEZ1bmNzW19pXTtcbiAgICAgICAgdmFsdWUgPSBmKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIHRvU2ltcGxlRXh0cmFjdG9yID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YXIgZmllbGRWYWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpZWxkVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGZpZWxkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIHRvRmllbGRLZXkgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIGYuc2xpY2UoMSk7XG4gIH07XG5cbiAgdG9Db21iaW5hdG9yID0gZnVuY3Rpb24oZikge1xuICAgIHZhciBrZXk7XG4gICAgaWYgKGlzRnVuY3Rpb24oZikpIHtcbiAgICAgIHJldHVybiBmO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEtleShmKSkge1xuICAgICAga2V5ID0gdG9GaWVsZEtleShmKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gbGVmdFtrZXldKHJpZ2h0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhc3NlcnQoXCJub3QgYSBmdW5jdGlvbiBvciBhIGZpZWxkIGtleTogXCIgKyBmLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHRvT3B0aW9uID0gZnVuY3Rpb24odikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgU29tZSB8fCB2ID09PSBOb25lKSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBTb21lKHYpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsKSAmJiAoZGVmaW5lLmFtZCAhPSBudWxsKSkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQmFjb247XG4gICAgfSk7XG4gICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCkgJiYgKG1vZHVsZS5leHBvcnRzICE9IG51bGwpKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBCYWNvbjtcbiAgICBCYWNvbi5CYWNvbiA9IEJhY29uO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuQmFjb24gPSBCYWNvbjtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnd2luZG93cyc6IDkxLFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdGwnOiAxNyxcbiAgJ2N0cmwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiIsIi8qKlxuICogbWFya2VkIC0gYSBtYXJrZG93biBwYXJzZXJcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE0LCBDaHJpc3RvcGhlciBKZWZmcmV5LiAoTUlUIExpY2Vuc2VkKVxuICogaHR0cHM6Ly9naXRodWIuY29tL2NoamovbWFya2VkXG4gKi9cblxuOyhmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBCbG9jay1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGJsb2NrID0ge1xuICBuZXdsaW5lOiAvXlxcbisvLFxuICBjb2RlOiAvXiggezR9W15cXG5dK1xcbiopKy8sXG4gIGZlbmNlczogbm9vcCxcbiAgaHI6IC9eKCAqWy0qX10pezMsfSAqKD86XFxuK3wkKS8sXG4gIGhlYWRpbmc6IC9eICooI3sxLDZ9KSAqKFteXFxuXSs/KSAqIyogKig/Olxcbit8JCkvLFxuICBucHRhYmxlOiBub29wLFxuICBsaGVhZGluZzogL14oW15cXG5dKylcXG4gKig9fC0pezIsfSAqKD86XFxuK3wkKS8sXG4gIGJsb2NrcXVvdGU6IC9eKCAqPlteXFxuXSsoXFxuKD8hZGVmKVteXFxuXSspKlxcbiopKy8sXG4gIGxpc3Q6IC9eKCAqKShidWxsKSBbXFxzXFxTXSs/KD86aHJ8ZGVmfFxcbnsyLH0oPyEgKSg/IVxcMWJ1bGwgKVxcbip8XFxzKiQpLyxcbiAgaHRtbDogL14gKig/OmNvbW1lbnQgKig/OlxcbnxcXHMqJCl8Y2xvc2VkICooPzpcXG57Mix9fFxccyokKXxjbG9zaW5nICooPzpcXG57Mix9fFxccyokKSkvLFxuICBkZWY6IC9eICpcXFsoW15cXF1dKylcXF06ICo8PyhbXlxccz5dKyk+Pyg/OiArW1wiKF0oW15cXG5dKylbXCIpXSk/ICooPzpcXG4rfCQpLyxcbiAgdGFibGU6IG5vb3AsXG4gIHBhcmFncmFwaDogL14oKD86W15cXG5dK1xcbj8oPyFocnxoZWFkaW5nfGxoZWFkaW5nfGJsb2NrcXVvdGV8dGFnfGRlZikpKylcXG4qLyxcbiAgdGV4dDogL15bXlxcbl0rL1xufTtcblxuYmxvY2suYnVsbGV0ID0gLyg/OlsqKy1dfFxcZCtcXC4pLztcbmJsb2NrLml0ZW0gPSAvXiggKikoYnVsbCkgW15cXG5dKig/Olxcbig/IVxcMWJ1bGwgKVteXFxuXSopKi87XG5ibG9jay5pdGVtID0gcmVwbGFjZShibG9jay5pdGVtLCAnZ20nKVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoKTtcblxuYmxvY2subGlzdCA9IHJlcGxhY2UoYmxvY2subGlzdClcbiAgKC9idWxsL2csIGJsb2NrLmJ1bGxldClcbiAgKCdocicsICdcXFxcbisoPz1cXFxcMT8oPzpbLSpfXSAqKXszLH0oPzpcXFxcbit8JCkpJylcbiAgKCdkZWYnLCAnXFxcXG4rKD89JyArIGJsb2NrLmRlZi5zb3VyY2UgKyAnKScpXG4gICgpO1xuXG5ibG9jay5ibG9ja3F1b3RlID0gcmVwbGFjZShibG9jay5ibG9ja3F1b3RlKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbmJsb2NrLl90YWcgPSAnKD8hKD86J1xuICArICdhfGVtfHN0cm9uZ3xzbWFsbHxzfGNpdGV8cXxkZm58YWJicnxkYXRhfHRpbWV8Y29kZSdcbiAgKyAnfHZhcnxzYW1wfGtiZHxzdWJ8c3VwfGl8Ynx1fG1hcmt8cnVieXxydHxycHxiZGl8YmRvJ1xuICArICd8c3Bhbnxicnx3YnJ8aW5zfGRlbHxpbWcpXFxcXGIpXFxcXHcrKD8hOi98W15cXFxcd1xcXFxzQF0qQClcXFxcYic7XG5cbmJsb2NrLmh0bWwgPSByZXBsYWNlKGJsb2NrLmh0bWwpXG4gICgnY29tbWVudCcsIC88IS0tW1xcc1xcU10qPy0tPi8pXG4gICgnY2xvc2VkJywgLzwodGFnKVtcXHNcXFNdKz88XFwvXFwxPi8pXG4gICgnY2xvc2luZycsIC88dGFnKD86XCJbXlwiXSpcInwnW14nXSonfFteJ1wiPl0pKj8+LylcbiAgKC90YWcvZywgYmxvY2suX3RhZylcbiAgKCk7XG5cbmJsb2NrLnBhcmFncmFwaCA9IHJlcGxhY2UoYmxvY2sucGFyYWdyYXBoKVxuICAoJ2hyJywgYmxvY2suaHIpXG4gICgnaGVhZGluZycsIGJsb2NrLmhlYWRpbmcpXG4gICgnbGhlYWRpbmcnLCBibG9jay5saGVhZGluZylcbiAgKCdibG9ja3F1b3RlJywgYmxvY2suYmxvY2txdW90ZSlcbiAgKCd0YWcnLCAnPCcgKyBibG9jay5fdGFnKVxuICAoJ2RlZicsIGJsb2NrLmRlZilcbiAgKCk7XG5cbi8qKlxuICogTm9ybWFsIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5ub3JtYWwgPSBtZXJnZSh7fSwgYmxvY2spO1xuXG4vKipcbiAqIEdGTSBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2suZ2ZtID0gbWVyZ2Uoe30sIGJsb2NrLm5vcm1hbCwge1xuICBmZW5jZXM6IC9eICooYHszLH18fnszLH0pICooXFxTKyk/ICpcXG4oW1xcc1xcU10rPylcXHMqXFwxICooPzpcXG4rfCQpLyxcbiAgcGFyYWdyYXBoOiAvXi9cbn0pO1xuXG5ibG9jay5nZm0ucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnKD8hJywgJyg/ISdcbiAgICArIGJsb2NrLmdmbS5mZW5jZXMuc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwyJykgKyAnfCdcbiAgICArIGJsb2NrLmxpc3Quc291cmNlLnJlcGxhY2UoJ1xcXFwxJywgJ1xcXFwzJykgKyAnfCcpXG4gICgpO1xuXG4vKipcbiAqIEdGTSArIFRhYmxlcyBCbG9jayBHcmFtbWFyXG4gKi9cblxuYmxvY2sudGFibGVzID0gbWVyZ2Uoe30sIGJsb2NrLmdmbSwge1xuICBucHRhYmxlOiAvXiAqKFxcUy4qXFx8LiopXFxuICooWy06XSsgKlxcfFstfCA6XSopXFxuKCg/Oi4qXFx8LiooPzpcXG58JCkpKilcXG4qLyxcbiAgdGFibGU6IC9eICpcXHwoLispXFxuICpcXHwoICpbLTpdK1stfCA6XSopXFxuKCg/OiAqXFx8LiooPzpcXG58JCkpKilcXG4qL1xufSk7XG5cbi8qKlxuICogQmxvY2sgTGV4ZXJcbiAqL1xuXG5mdW5jdGlvbiBMZXhlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW5zLmxpbmtzID0ge307XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLnJ1bGVzID0gYmxvY2subm9ybWFsO1xuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJsZXMpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay50YWJsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucnVsZXMgPSBibG9jay5nZm07XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIEJsb2NrIFJ1bGVzXG4gKi9cblxuTGV4ZXIucnVsZXMgPSBibG9jaztcblxuLyoqXG4gKiBTdGF0aWMgTGV4IE1ldGhvZFxuICovXG5cbkxleGVyLmxleCA9IGZ1bmN0aW9uKHNyYywgb3B0aW9ucykge1xuICB2YXIgbGV4ZXIgPSBuZXcgTGV4ZXIob3B0aW9ucyk7XG4gIHJldHVybiBsZXhlci5sZXgoc3JjKTtcbn07XG5cbi8qKlxuICogUHJlcHJvY2Vzc2luZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS5sZXggPSBmdW5jdGlvbihzcmMpIHtcbiAgc3JjID0gc3JjXG4gICAgLnJlcGxhY2UoL1xcclxcbnxcXHIvZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcdC9nLCAnICAgICcpXG4gICAgLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKVxuICAgIC5yZXBsYWNlKC9cXHUyNDI0L2csICdcXG4nKTtcblxuICByZXR1cm4gdGhpcy50b2tlbihzcmMsIHRydWUpO1xufTtcblxuLyoqXG4gKiBMZXhpbmdcbiAqL1xuXG5MZXhlci5wcm90b3R5cGUudG9rZW4gPSBmdW5jdGlvbihzcmMsIHRvcCwgYnEpIHtcbiAgdmFyIHNyYyA9IHNyYy5yZXBsYWNlKC9eICskL2dtLCAnJylcbiAgICAsIG5leHRcbiAgICAsIGxvb3NlXG4gICAgLCBjYXBcbiAgICAsIGJ1bGxcbiAgICAsIGJcbiAgICAsIGl0ZW1cbiAgICAsIHNwYWNlXG4gICAgLCBpXG4gICAgLCBsO1xuXG4gIHdoaWxlIChzcmMpIHtcbiAgICAvLyBuZXdsaW5lXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubmV3bGluZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzBdLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ3NwYWNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiB7NH0vZ20sICcnKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIHRleHQ6ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICA/IGNhcC5yZXBsYWNlKC9cXG4rJC8sICcnKVxuICAgICAgICAgIDogY2FwXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGZlbmNlcyAoZ2ZtKVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmZlbmNlcy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICBsYW5nOiBjYXBbMl0sXG4gICAgICAgIHRleHQ6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuaGVhZGluZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hlYWRpbmcnLFxuICAgICAgICBkZXB0aDogY2FwWzFdLmxlbmd0aCxcbiAgICAgICAgdGV4dDogY2FwWzJdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIG5vIGxlYWRpbmcgcGlwZSAoZ2ZtKVxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMubnB0YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXS5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBsaGVhZGluZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxoZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMl0gPT09ICc9JyA/IDEgOiAyLFxuICAgICAgICB0ZXh0OiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oci5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2hyJ1xuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBibG9ja3F1b3RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuYmxvY2txdW90ZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9zdGFydCdcbiAgICAgIH0pO1xuXG4gICAgICBjYXAgPSBjYXBbMF0ucmVwbGFjZSgvXiAqPiA/L2dtLCAnJyk7XG5cbiAgICAgIC8vIFBhc3MgYHRvcGAgdG8ga2VlcCB0aGUgY3VycmVudFxuICAgICAgLy8gXCJ0b3BsZXZlbFwiIHN0YXRlLiBUaGlzIGlzIGV4YWN0bHlcbiAgICAgIC8vIGhvdyBtYXJrZG93bi5wbCB3b3Jrcy5cbiAgICAgIHRoaXMudG9rZW4oY2FwLCB0b3AsIHRydWUpO1xuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2Jsb2NrcXVvdGVfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpc3RcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saXN0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGJ1bGwgPSBjYXBbMl07XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9zdGFydCcsXG4gICAgICAgIG9yZGVyZWQ6IGJ1bGwubGVuZ3RoID4gMVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEdldCBlYWNoIHRvcC1sZXZlbCBpdGVtLlxuICAgICAgY2FwID0gY2FwWzBdLm1hdGNoKHRoaXMucnVsZXMuaXRlbSk7XG5cbiAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgIGwgPSBjYXAubGVuZ3RoO1xuICAgICAgaSA9IDA7XG5cbiAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGl0ZW0gPSBjYXBbaV07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0IGl0ZW0ncyBidWxsZXRcbiAgICAgICAgLy8gc28gaXQgaXMgc2VlbiBhcyB0aGUgbmV4dCB0b2tlbi5cbiAgICAgICAgc3BhY2UgPSBpdGVtLmxlbmd0aDtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucmVwbGFjZSgvXiAqKFsqKy1dfFxcZCtcXC4pICsvLCAnJyk7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGF0ZXZlciB0aGVcbiAgICAgICAgLy8gbGlzdCBpdGVtIGNvbnRhaW5zLiBIYWNreS5cbiAgICAgICAgaWYgKH5pdGVtLmluZGV4T2YoJ1xcbiAnKSkge1xuICAgICAgICAgIHNwYWNlIC09IGl0ZW0ubGVuZ3RoO1xuICAgICAgICAgIGl0ZW0gPSAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgICAgICA/IGl0ZW0ucmVwbGFjZShuZXcgUmVnRXhwKCdeIHsxLCcgKyBzcGFjZSArICd9JywgJ2dtJyksICcnKVxuICAgICAgICAgICAgOiBpdGVtLnJlcGxhY2UoL14gezEsNH0vZ20sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIHRoZSBuZXh0IGxpc3QgaXRlbSBiZWxvbmdzIGhlcmUuXG4gICAgICAgIC8vIEJhY2twZWRhbCBpZiBpdCBkb2VzIG5vdCBiZWxvbmcgaW4gdGhpcyBsaXN0LlxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNtYXJ0TGlzdHMgJiYgaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBiID0gYmxvY2suYnVsbGV0LmV4ZWMoY2FwW2kgKyAxXSlbMF07XG4gICAgICAgICAgaWYgKGJ1bGwgIT09IGIgJiYgIShidWxsLmxlbmd0aCA+IDEgJiYgYi5sZW5ndGggPiAxKSkge1xuICAgICAgICAgICAgc3JjID0gY2FwLnNsaWNlKGkgKyAxKS5qb2luKCdcXG4nKSArIHNyYztcbiAgICAgICAgICAgIGkgPSBsIC0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBpdGVtIGlzIGxvb3NlIG9yIG5vdC5cbiAgICAgICAgLy8gVXNlOiAvKF58XFxuKSg/ISApW15cXG5dK1xcblxcbig/IVxccyokKS9cbiAgICAgICAgLy8gZm9yIGRpc2NvdW50IGJlaGF2aW9yLlxuICAgICAgICBsb29zZSA9IG5leHQgfHwgL1xcblxcbig/IVxccyokKS8udGVzdChpdGVtKTtcbiAgICAgICAgaWYgKGkgIT09IGwgLSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGl0ZW0uY2hhckF0KGl0ZW0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nO1xuICAgICAgICAgIGlmICghbG9vc2UpIGxvb3NlID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IGxvb3NlXG4gICAgICAgICAgICA/ICdsb29zZV9pdGVtX3N0YXJ0J1xuICAgICAgICAgICAgOiAnbGlzdF9pdGVtX3N0YXJ0J1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZWN1cnNlLlxuICAgICAgICB0aGlzLnRva2VuKGl0ZW0sIGZhbHNlLCBicSk7XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2xpc3RfaXRlbV9lbmQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ2xpc3RfZW5kJ1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGh0bWxcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5odG1sLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgICA/ICdwYXJhZ3JhcGgnXG4gICAgICAgICAgOiAnaHRtbCcsXG4gICAgICAgIHByZTogY2FwWzFdID09PSAncHJlJyB8fCBjYXBbMV0gPT09ICdzY3JpcHQnIHx8IGNhcFsxXSA9PT0gJ3N0eWxlJyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGRlZlxuICAgIGlmICgoIWJxICYmIHRvcCkgJiYgKGNhcCA9IHRoaXMucnVsZXMuZGVmLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5saW5rc1tjYXBbMV0udG9Mb3dlckNhc2UoKV0gPSB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhYmxlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy50YWJsZS5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuXG4gICAgICBpdGVtID0ge1xuICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICBoZWFkZXI6IGNhcFsxXS5yZXBsYWNlKC9eICp8ICpcXHwgKiQvZywgJycpLnNwbGl0KC8gKlxcfCAqLyksXG4gICAgICAgIGFsaWduOiBjYXBbMl0ucmVwbGFjZSgvXiAqfFxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgY2VsbHM6IGNhcFszXS5yZXBsYWNlKC8oPzogKlxcfCAqKT9cXG4kLywgJycpLnNwbGl0KCdcXG4nKVxuICAgICAgfTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGl0ZW0uYWxpZ24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKC9eICotKzogKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ3JpZ2h0JztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAnY2VudGVyJztcbiAgICAgICAgfSBlbHNlIGlmICgvXiAqOi0rICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdsZWZ0JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5jZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtLmNlbGxzW2ldID0gaXRlbS5jZWxsc1tpXVxuICAgICAgICAgIC5yZXBsYWNlKC9eICpcXHwgKnwgKlxcfCAqJC9nLCAnJylcbiAgICAgICAgICAuc3BsaXQoLyAqXFx8ICovKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy50b2tlbnMucHVzaChpdGVtKTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdG9wLWxldmVsIHBhcmFncmFwaFxuICAgIGlmICh0b3AgJiYgKGNhcCA9IHRoaXMucnVsZXMucGFyYWdyYXBoLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ3BhcmFncmFwaCcsXG4gICAgICAgIHRleHQ6IGNhcFsxXS5jaGFyQXQoY2FwWzFdLmxlbmd0aCAtIDEpID09PSAnXFxuJ1xuICAgICAgICAgID8gY2FwWzFdLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogY2FwWzFdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgLy8gVG9wLWxldmVsIHNob3VsZCBuZXZlciByZWFjaCBoZXJlLlxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IGNhcFswXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3JjKSB7XG4gICAgICB0aHJvdyBuZXdcbiAgICAgICAgRXJyb3IoJ0luZmluaXRlIGxvb3Agb24gYnl0ZTogJyArIHNyYy5jaGFyQ29kZUF0KDApKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy50b2tlbnM7XG59O1xuXG4vKipcbiAqIElubGluZS1MZXZlbCBHcmFtbWFyXG4gKi9cblxudmFyIGlubGluZSA9IHtcbiAgZXNjYXBlOiAvXlxcXFwoW1xcXFxgKnt9XFxbXFxdKCkjK1xcLS4hXz5dKS8sXG4gIGF1dG9saW5rOiAvXjwoW14gPl0rKEB8OlxcLylbXiA+XSspPi8sXG4gIHVybDogbm9vcCxcbiAgdGFnOiAvXjwhLS1bXFxzXFxTXSo/LS0+fF48XFwvP1xcdysoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vLFxuICBsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXChocmVmXFwpLyxcbiAgcmVmbGluazogL14hP1xcWyhpbnNpZGUpXFxdXFxzKlxcWyhbXlxcXV0qKVxcXS8sXG4gIG5vbGluazogL14hP1xcWygoPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXSkqKVxcXS8sXG4gIHN0cm9uZzogL15fXyhbXFxzXFxTXSs/KV9fKD8hXyl8XlxcKlxcKihbXFxzXFxTXSs/KVxcKlxcKig/IVxcKikvLFxuICBlbTogL15cXGJfKCg/Ol9ffFtcXHNcXFNdKSs/KV9cXGJ8XlxcKigoPzpcXCpcXCp8W1xcc1xcU10pKz8pXFwqKD8hXFwqKS8sXG4gIGNvZGU6IC9eKGArKVxccyooW1xcc1xcU10qP1teYF0pXFxzKlxcMSg/IWApLyxcbiAgYnI6IC9eIHsyLH1cXG4oPyFcXHMqJCkvLFxuICBkZWw6IG5vb3AsXG4gIHRleHQ6IC9eW1xcc1xcU10rPyg/PVtcXFxcPCFcXFtfKmBdfCB7Mix9XFxufCQpL1xufTtcblxuaW5saW5lLl9pbnNpZGUgPSAvKD86XFxbW15cXF1dKlxcXXxbXlxcW1xcXV18XFxdKD89W15cXFtdKlxcXSkpKi87XG5pbmxpbmUuX2hyZWYgPSAvXFxzKjw/KFtcXHNcXFNdKj8pPj8oPzpcXHMrWydcIl0oW1xcc1xcU10qPylbJ1wiXSk/XFxzKi87XG5cbmlubGluZS5saW5rID0gcmVwbGFjZShpbmxpbmUubGluaylcbiAgKCdpbnNpZGUnLCBpbmxpbmUuX2luc2lkZSlcbiAgKCdocmVmJywgaW5saW5lLl9ocmVmKVxuICAoKTtcblxuaW5saW5lLnJlZmxpbmsgPSByZXBsYWNlKGlubGluZS5yZWZsaW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUubm9ybWFsID0gbWVyZ2Uoe30sIGlubGluZSk7XG5cbi8qKlxuICogUGVkYW50aWMgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUucGVkYW50aWMgPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBzdHJvbmc6IC9eX18oPz1cXFMpKFtcXHNcXFNdKj9cXFMpX18oPyFfKXxeXFwqXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKlxcKig/IVxcKikvLFxuICBlbTogL15fKD89XFxTKShbXFxzXFxTXSo/XFxTKV8oPyFfKXxeXFwqKD89XFxTKShbXFxzXFxTXSo/XFxTKVxcKig/IVxcKikvXG59KTtcblxuLyoqXG4gKiBHRk0gSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuZ2ZtID0gbWVyZ2Uoe30sIGlubGluZS5ub3JtYWwsIHtcbiAgZXNjYXBlOiByZXBsYWNlKGlubGluZS5lc2NhcGUpKCddKScsICd+fF0pJykoKSxcbiAgdXJsOiAvXihodHRwcz86XFwvXFwvW15cXHM8XStbXjwuLDo7XCInKVxcXVxcc10pLyxcbiAgZGVsOiAvXn5+KD89XFxTKShbXFxzXFxTXSo/XFxTKX5+LyxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUudGV4dClcbiAgICAoJ118JywgJ35dfCcpXG4gICAgKCd8JywgJ3xodHRwcz86Ly98JylcbiAgICAoKVxufSk7XG5cbi8qKlxuICogR0ZNICsgTGluZSBCcmVha3MgSW5saW5lIEdyYW1tYXJcbiAqL1xuXG5pbmxpbmUuYnJlYWtzID0gbWVyZ2Uoe30sIGlubGluZS5nZm0sIHtcbiAgYnI6IHJlcGxhY2UoaW5saW5lLmJyKSgnezIsfScsICcqJykoKSxcbiAgdGV4dDogcmVwbGFjZShpbmxpbmUuZ2ZtLnRleHQpKCd7Mix9JywgJyonKSgpXG59KTtcblxuLyoqXG4gKiBJbmxpbmUgTGV4ZXIgJiBDb21waWxlclxuICovXG5cbmZ1bmN0aW9uIElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwgbWFya2VkLmRlZmF1bHRzO1xuICB0aGlzLmxpbmtzID0gbGlua3M7XG4gIHRoaXMucnVsZXMgPSBpbmxpbmUubm9ybWFsO1xuICB0aGlzLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gIGlmICghdGhpcy5saW5rcykge1xuICAgIHRocm93IG5ld1xuICAgICAgRXJyb3IoJ1Rva2VucyBhcnJheSByZXF1aXJlcyBhIGBsaW5rc2AgcHJvcGVydHkuJyk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmdmbSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYnJlYWtzKSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmJyZWFrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGlubGluZS5nZm07XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wZWRhbnRpYykge1xuICAgIHRoaXMucnVsZXMgPSBpbmxpbmUucGVkYW50aWM7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgSW5saW5lIFJ1bGVzXG4gKi9cblxuSW5saW5lTGV4ZXIucnVsZXMgPSBpbmxpbmU7XG5cbi8qKlxuICogU3RhdGljIExleGluZy9Db21waWxpbmcgTWV0aG9kXG4gKi9cblxuSW5saW5lTGV4ZXIub3V0cHV0ID0gZnVuY3Rpb24oc3JjLCBsaW5rcywgb3B0aW9ucykge1xuICB2YXIgaW5saW5lID0gbmV3IElubGluZUxleGVyKGxpbmtzLCBvcHRpb25zKTtcbiAgcmV0dXJuIGlubGluZS5vdXRwdXQoc3JjKTtcbn07XG5cbi8qKlxuICogTGV4aW5nL0NvbXBpbGluZ1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXQgPSBmdW5jdGlvbihzcmMpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsaW5rXG4gICAgLCB0ZXh0XG4gICAgLCBocmVmXG4gICAgLCBjYXA7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIGVzY2FwZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmVzY2FwZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gY2FwWzFdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYXV0b2xpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5hdXRvbGluay5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBpZiAoY2FwWzJdID09PSAnQCcpIHtcbiAgICAgICAgdGV4dCA9IGNhcFsxXS5jaGFyQXQoNikgPT09ICc6J1xuICAgICAgICAgID8gdGhpcy5tYW5nbGUoY2FwWzFdLnN1YnN0cmluZyg3KSlcbiAgICAgICAgICA6IHRoaXMubWFuZ2xlKGNhcFsxXSk7XG4gICAgICAgIGhyZWYgPSB0aGlzLm1hbmdsZSgnbWFpbHRvOicpICsgdGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICB9XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdXJsIChnZm0pXG4gICAgaWYgKCF0aGlzLmluTGluayAmJiAoY2FwID0gdGhpcy5ydWxlcy51cmwuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRleHQgPSBlc2NhcGUoY2FwWzFdKTtcbiAgICAgIGhyZWYgPSB0ZXh0O1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIubGluayhocmVmLCBudWxsLCB0ZXh0KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRhZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRhZy5leGVjKHNyYykpIHtcbiAgICAgIGlmICghdGhpcy5pbkxpbmsgJiYgL148YSAvaS50ZXN0KGNhcFswXSkpIHtcbiAgICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmluTGluayAmJiAvXjxcXC9hPi9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLm9wdGlvbnMuc2FuaXRpemVcbiAgICAgICAgPyBlc2NhcGUoY2FwWzBdKVxuICAgICAgICA6IGNhcFswXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxpbmtcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCB7XG4gICAgICAgIGhyZWY6IGNhcFsyXSxcbiAgICAgICAgdGl0bGU6IGNhcFszXVxuICAgICAgfSk7XG4gICAgICB0aGlzLmluTGluayA9IGZhbHNlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gcmVmbGluaywgbm9saW5rXG4gICAgaWYgKChjYXAgPSB0aGlzLnJ1bGVzLnJlZmxpbmsuZXhlYyhzcmMpKVxuICAgICAgICB8fCAoY2FwID0gdGhpcy5ydWxlcy5ub2xpbmsuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGxpbmsgPSAoY2FwWzJdIHx8IGNhcFsxXSkucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xuICAgICAgbGluayA9IHRoaXMubGlua3NbbGluay50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIGlmICghbGluayB8fCAhbGluay5ocmVmKSB7XG4gICAgICAgIG91dCArPSBjYXBbMF0uY2hhckF0KDApO1xuICAgICAgICBzcmMgPSBjYXBbMF0uc3Vic3RyaW5nKDEpICsgc3JjO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5MaW5rID0gdHJ1ZTtcbiAgICAgIG91dCArPSB0aGlzLm91dHB1dExpbmsoY2FwLCBsaW5rKTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBzdHJvbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5zdHJvbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuc3Ryb25nKHRoaXMub3V0cHV0KGNhcFsyXSB8fCBjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGVtXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZW0uZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZW0odGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29kZVxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmNvZGUuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuY29kZXNwYW4oZXNjYXBlKGNhcFsyXSwgdHJ1ZSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gYnJcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ici5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5icigpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVsIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZGVsLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmRlbCh0aGlzLm91dHB1dChjYXBbMV0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHRleHRcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy50ZXh0LmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBlc2NhcGUodGhpcy5zbWFydHlwYW50cyhjYXBbMF0pKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIENvbXBpbGUgTGlua1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5vdXRwdXRMaW5rID0gZnVuY3Rpb24oY2FwLCBsaW5rKSB7XG4gIHZhciBocmVmID0gZXNjYXBlKGxpbmsuaHJlZilcbiAgICAsIHRpdGxlID0gbGluay50aXRsZSA/IGVzY2FwZShsaW5rLnRpdGxlKSA6IG51bGw7XG5cbiAgcmV0dXJuIGNhcFswXS5jaGFyQXQoMCkgIT09ICchJ1xuICAgID8gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIHRpdGxlLCB0aGlzLm91dHB1dChjYXBbMV0pKVxuICAgIDogdGhpcy5yZW5kZXJlci5pbWFnZShocmVmLCB0aXRsZSwgZXNjYXBlKGNhcFsxXSkpO1xufTtcblxuLyoqXG4gKiBTbWFydHlwYW50cyBUcmFuc2Zvcm1hdGlvbnNcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUuc21hcnR5cGFudHMgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICghdGhpcy5vcHRpb25zLnNtYXJ0eXBhbnRzKSByZXR1cm4gdGV4dDtcbiAgcmV0dXJuIHRleHRcbiAgICAvLyBlbS1kYXNoZXNcbiAgICAucmVwbGFjZSgvLS0vZywgJ1xcdTIwMTQnKVxuICAgIC8vIG9wZW5pbmcgc2luZ2xlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcIlxcc10pJy9nLCAnJDFcXHUyMDE4JylcbiAgICAvLyBjbG9zaW5nIHNpbmdsZXMgJiBhcG9zdHJvcGhlc1xuICAgIC5yZXBsYWNlKC8nL2csICdcXHUyMDE5JylcbiAgICAvLyBvcGVuaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvKF58Wy1cXHUyMDE0LyhcXFt7XFx1MjAxOFxcc10pXCIvZywgJyQxXFx1MjAxYycpXG4gICAgLy8gY2xvc2luZyBkb3VibGVzXG4gICAgLnJlcGxhY2UoL1wiL2csICdcXHUyMDFkJylcbiAgICAvLyBlbGxpcHNlc1xuICAgIC5yZXBsYWNlKC9cXC57M30vZywgJ1xcdTIwMjYnKTtcbn07XG5cbi8qKlxuICogTWFuZ2xlIExpbmtzXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm1hbmdsZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdmFyIG91dCA9ICcnXG4gICAgLCBsID0gdGV4dC5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBjaDtcblxuICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgIGNoID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBjaCA9ICd4JyArIGNoLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gICAgb3V0ICs9ICcmIycgKyBjaCArICc7JztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFJlbmRlcmVyXG4gKi9cblxuZnVuY3Rpb24gUmVuZGVyZXIob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xufVxuXG5SZW5kZXJlci5wcm90b3R5cGUuY29kZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcsIGVzY2FwZWQpIHtcbiAgaWYgKHRoaXMub3B0aW9ucy5oaWdobGlnaHQpIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5vcHRpb25zLmhpZ2hsaWdodChjb2RlLCBsYW5nKTtcbiAgICBpZiAob3V0ICE9IG51bGwgJiYgb3V0ICE9PSBjb2RlKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgIGNvZGUgPSBvdXQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFsYW5nKSB7XG4gICAgcmV0dXJuICc8cHJlPjxjb2RlPidcbiAgICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICAgKyAnXFxuPC9jb2RlPjwvcHJlPic7XG4gIH1cblxuICByZXR1cm4gJzxwcmU+PGNvZGUgY2xhc3M9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMubGFuZ1ByZWZpeFxuICAgICsgZXNjYXBlKGxhbmcsIHRydWUpXG4gICAgKyAnXCI+J1xuICAgICsgKGVzY2FwZWQgPyBjb2RlIDogZXNjYXBlKGNvZGUsIHRydWUpKVxuICAgICsgJ1xcbjwvY29kZT48L3ByZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJsb2NrcXVvdGUgPSBmdW5jdGlvbihxdW90ZSkge1xuICByZXR1cm4gJzxibG9ja3F1b3RlPlxcbicgKyBxdW90ZSArICc8L2Jsb2NrcXVvdGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICByZXR1cm4gaHRtbDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5oZWFkaW5nID0gZnVuY3Rpb24odGV4dCwgbGV2ZWwsIHJhdykge1xuICByZXR1cm4gJzxoJ1xuICAgICsgbGV2ZWxcbiAgICArICcgaWQ9XCInXG4gICAgKyB0aGlzLm9wdGlvbnMuaGVhZGVyUHJlZml4XG4gICAgKyByYXcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcd10rL2csICctJylcbiAgICArICdcIj4nXG4gICAgKyB0ZXh0XG4gICAgKyAnPC9oJ1xuICAgICsgbGV2ZWxcbiAgICArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5ociA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxoci8+XFxuJyA6ICc8aHI+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oYm9keSwgb3JkZXJlZCkge1xuICB2YXIgdHlwZSA9IG9yZGVyZWQgPyAnb2wnIDogJ3VsJztcbiAgcmV0dXJuICc8JyArIHR5cGUgKyAnPlxcbicgKyBib2R5ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGlzdGl0ZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGxpPicgKyB0ZXh0ICsgJzwvbGk+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5wYXJhZ3JhcGggPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPHA+JyArIHRleHQgKyAnPC9wPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGUgPSBmdW5jdGlvbihoZWFkZXIsIGJvZHkpIHtcbiAgcmV0dXJuICc8dGFibGU+XFxuJ1xuICAgICsgJzx0aGVhZD5cXG4nXG4gICAgKyBoZWFkZXJcbiAgICArICc8L3RoZWFkPlxcbidcbiAgICArICc8dGJvZHk+XFxuJ1xuICAgICsgYm9keVxuICAgICsgJzwvdGJvZHk+XFxuJ1xuICAgICsgJzwvdGFibGU+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZXJvdyA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgcmV0dXJuICc8dHI+XFxuJyArIGNvbnRlbnQgKyAnPC90cj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlY2VsbCA9IGZ1bmN0aW9uKGNvbnRlbnQsIGZsYWdzKSB7XG4gIHZhciB0eXBlID0gZmxhZ3MuaGVhZGVyID8gJ3RoJyA6ICd0ZCc7XG4gIHZhciB0YWcgPSBmbGFncy5hbGlnblxuICAgID8gJzwnICsgdHlwZSArICcgc3R5bGU9XCJ0ZXh0LWFsaWduOicgKyBmbGFncy5hbGlnbiArICdcIj4nXG4gICAgOiAnPCcgKyB0eXBlICsgJz4nO1xuICByZXR1cm4gdGFnICsgY29udGVudCArICc8LycgKyB0eXBlICsgJz5cXG4nO1xufTtcblxuLy8gc3BhbiBsZXZlbCByZW5kZXJlclxuUmVuZGVyZXIucHJvdG90eXBlLnN0cm9uZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8c3Ryb25nPicgKyB0ZXh0ICsgJzwvc3Ryb25nPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuZW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGVtPicgKyB0ZXh0ICsgJzwvZW0+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2Rlc3BhbiA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8Y29kZT4nICsgdGV4dCArICc8L2NvZGU+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5iciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25zLnhodG1sID8gJzxici8+JyA6ICc8YnI+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHJldHVybiAnPGRlbD4nICsgdGV4dCArICc8L2RlbD4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICBpZiAodGhpcy5vcHRpb25zLnNhbml0aXplKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBwcm90ID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuZXNjYXBlKGhyZWYpKVxuICAgICAgICAucmVwbGFjZSgvW15cXHc6XS9nLCAnJylcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAocHJvdC5pbmRleE9mKCdqYXZhc2NyaXB0OicpID09PSAwIHx8IHByb3QuaW5kZXhPZigndmJzY3JpcHQ6JykgPT09IDApIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbiAgdmFyIG91dCA9ICc8YSBocmVmPVwiJyArIGhyZWYgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9ICc+JyArIHRleHQgKyAnPC9hPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuaW1hZ2UgPSBmdW5jdGlvbihocmVmLCB0aXRsZSwgdGV4dCkge1xuICB2YXIgb3V0ID0gJzxpbWcgc3JjPVwiJyArIGhyZWYgKyAnXCIgYWx0PVwiJyArIHRleHQgKyAnXCInO1xuICBpZiAodGl0bGUpIHtcbiAgICBvdXQgKz0gJyB0aXRsZT1cIicgKyB0aXRsZSArICdcIic7XG4gIH1cbiAgb3V0ICs9IHRoaXMub3B0aW9ucy54aHRtbCA/ICcvPicgOiAnPic7XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIFBhcnNpbmcgJiBDb21waWxpbmdcbiAqL1xuXG5mdW5jdGlvbiBQYXJzZXIob3B0aW9ucykge1xuICB0aGlzLnRva2VucyA9IFtdO1xuICB0aGlzLnRva2VuID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMub3B0aW9ucy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlciB8fCBuZXcgUmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7XG4gIHRoaXMucmVuZGVyZXIub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbn1cblxuLyoqXG4gKiBTdGF0aWMgUGFyc2UgTWV0aG9kXG4gKi9cblxuUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zLCByZW5kZXJlcikge1xuICB2YXIgcGFyc2VyID0gbmV3IFBhcnNlcihvcHRpb25zLCByZW5kZXJlcik7XG4gIHJldHVybiBwYXJzZXIucGFyc2Uoc3JjKTtcbn07XG5cbi8qKlxuICogUGFyc2UgTG9vcFxuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihzcmMpIHtcbiAgdGhpcy5pbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIoc3JjLmxpbmtzLCB0aGlzLm9wdGlvbnMsIHRoaXMucmVuZGVyZXIpO1xuICB0aGlzLnRva2VucyA9IHNyYy5yZXZlcnNlKCk7XG5cbiAgdmFyIG91dCA9ICcnO1xuICB3aGlsZSAodGhpcy5uZXh0KCkpIHtcbiAgICBvdXQgKz0gdGhpcy50b2soKTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59O1xuXG4vKipcbiAqIE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW4gPSB0aGlzLnRva2Vucy5wb3AoKTtcbn07XG5cbi8qKlxuICogUHJldmlldyBOZXh0IFRva2VuXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLnRva2Vucy5sZW5ndGggLSAxXSB8fCAwO1xufTtcblxuLyoqXG4gKiBQYXJzZSBUZXh0IFRva2Vuc1xuICovXG5cblBhcnNlci5wcm90b3R5cGUucGFyc2VUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBib2R5ID0gdGhpcy50b2tlbi50ZXh0O1xuXG4gIHdoaWxlICh0aGlzLnBlZWsoKS50eXBlID09PSAndGV4dCcpIHtcbiAgICBib2R5ICs9ICdcXG4nICsgdGhpcy5uZXh0KCkudGV4dDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmlubGluZS5vdXRwdXQoYm9keSk7XG59O1xuXG4vKipcbiAqIFBhcnNlIEN1cnJlbnQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnRvayA9IGZ1bmN0aW9uKCkge1xuICBzd2l0Y2ggKHRoaXMudG9rZW4udHlwZSkge1xuICAgIGNhc2UgJ3NwYWNlJzoge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjYXNlICdocic6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhyKCk7XG4gICAgfVxuICAgIGNhc2UgJ2hlYWRpbmcnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5oZWFkaW5nKFxuICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi50ZXh0KSxcbiAgICAgICAgdGhpcy50b2tlbi5kZXB0aCxcbiAgICAgICAgdGhpcy50b2tlbi50ZXh0KTtcbiAgICB9XG4gICAgY2FzZSAnY29kZSc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmNvZGUodGhpcy50b2tlbi50ZXh0LFxuICAgICAgICB0aGlzLnRva2VuLmxhbmcsXG4gICAgICAgIHRoaXMudG9rZW4uZXNjYXBlZCk7XG4gICAgfVxuICAgIGNhc2UgJ3RhYmxlJzoge1xuICAgICAgdmFyIGhlYWRlciA9ICcnXG4gICAgICAgICwgYm9keSA9ICcnXG4gICAgICAgICwgaVxuICAgICAgICAsIHJvd1xuICAgICAgICAsIGNlbGxcbiAgICAgICAgLCBmbGFnc1xuICAgICAgICAsIGo7XG5cbiAgICAgIC8vIGhlYWRlclxuICAgICAgY2VsbCA9ICcnO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uaGVhZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZsYWdzID0geyBoZWFkZXI6IHRydWUsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2ldIH07XG4gICAgICAgIGNlbGwgKz0gdGhpcy5yZW5kZXJlci50YWJsZWNlbGwoXG4gICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4uaGVhZGVyW2ldKSxcbiAgICAgICAgICB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaGVhZGVyICs9IHRoaXMucmVuZGVyZXIudGFibGVyb3coY2VsbCk7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnRva2VuLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdyA9IHRoaXMudG9rZW4uY2VsbHNbaV07XG5cbiAgICAgICAgY2VsbCA9ICcnO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgcm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICAgIHRoaXMuaW5saW5lLm91dHB1dChyb3dbal0pLFxuICAgICAgICAgICAgeyBoZWFkZXI6IGZhbHNlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltqXSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHkgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnRhYmxlKGhlYWRlciwgYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2Jsb2NrcXVvdGVfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2Jsb2NrcXVvdGVfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmJsb2NrcXVvdGUoYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3Rfc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnXG4gICAgICAgICwgb3JkZXJlZCA9IHRoaXMudG9rZW4ub3JkZXJlZDtcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRvaygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5saXN0KGJvZHksIG9yZGVyZWQpO1xuICAgIH1cbiAgICBjYXNlICdsaXN0X2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2tlbi50eXBlID09PSAndGV4dCdcbiAgICAgICAgICA/IHRoaXMucGFyc2VUZXh0KClcbiAgICAgICAgICA6IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdsb29zZV9pdGVtX3N0YXJ0Jzoge1xuICAgICAgdmFyIGJvZHkgPSAnJztcblxuICAgICAgd2hpbGUgKHRoaXMubmV4dCgpLnR5cGUgIT09ICdsaXN0X2l0ZW1fZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3RpdGVtKGJvZHkpO1xuICAgIH1cbiAgICBjYXNlICdodG1sJzoge1xuICAgICAgdmFyIGh0bWwgPSAhdGhpcy50b2tlbi5wcmUgJiYgIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICA/IHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpXG4gICAgICAgIDogdGhpcy50b2tlbi50ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHRtbChodG1sKTtcbiAgICB9XG4gICAgY2FzZSAncGFyYWdyYXBoJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpKTtcbiAgICB9XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLnBhcmFncmFwaCh0aGlzLnBhcnNlVGV4dCgpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShodG1sLCBlbmNvZGUpIHtcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZSghZW5jb2RlID8gLyYoPyEjP1xcdys7KS9nIDogLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGUoaHRtbCkge1xuICByZXR1cm4gaHRtbC5yZXBsYWNlKC8mKFsjXFx3XSspOy9nLCBmdW5jdGlvbihfLCBuKSB7XG4gICAgbiA9IG4udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobiA9PT0gJ2NvbG9uJykgcmV0dXJuICc6JztcbiAgICBpZiAobi5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgcmV0dXJuIG4uY2hhckF0KDEpID09PSAneCdcbiAgICAgICAgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG4uc3Vic3RyaW5nKDIpLCAxNikpXG4gICAgICAgIDogU3RyaW5nLmZyb21DaGFyQ29kZSgrbi5zdWJzdHJpbmcoMSkpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCBvcHQpIHtcbiAgcmVnZXggPSByZWdleC5zb3VyY2U7XG4gIG9wdCA9IG9wdCB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uIHNlbGYobmFtZSwgdmFsKSB7XG4gICAgaWYgKCFuYW1lKSByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCwgb3B0KTtcbiAgICB2YWwgPSB2YWwuc291cmNlIHx8IHZhbDtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvKF58W15cXFtdKVxcXi9nLCAnJDEnKTtcbiAgICByZWdleCA9IHJlZ2V4LnJlcGxhY2UobmFtZSwgdmFsKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5ub29wLmV4ZWMgPSBub29wO1xuXG5mdW5jdGlvbiBtZXJnZShvYmopIHtcbiAgdmFyIGkgPSAxXG4gICAgLCB0YXJnZXRcbiAgICAsIGtleTtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRhcmdldCA9IGFyZ3VtZW50c1tpXTtcbiAgICBmb3IgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gdGFyZ2V0W2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuXG4vKipcbiAqIE1hcmtlZFxuICovXG5cbmZ1bmN0aW9uIG1hcmtlZChzcmMsIG9wdCwgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG9wdDtcbiAgICAgIG9wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0IHx8IHt9KTtcblxuICAgIHZhciBoaWdobGlnaHQgPSBvcHQuaGlnaGxpZ2h0XG4gICAgICAsIHRva2Vuc1xuICAgICAgLCBwZW5kaW5nXG4gICAgICAsIGkgPSAwO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IExleGVyLmxleChzcmMsIG9wdClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gICAgfVxuXG4gICAgcGVuZGluZyA9IHRva2Vucy5sZW5ndGg7XG5cbiAgICB2YXIgZG9uZSA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG91dDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgb3V0ID0gUGFyc2VyLnBhcnNlKHRva2Vucywgb3B0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgIH1cblxuICAgICAgb3B0LmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcblxuICAgICAgcmV0dXJuIGVyclxuICAgICAgICA/IGNhbGxiYWNrKGVycilcbiAgICAgICAgOiBjYWxsYmFjayhudWxsLCBvdXQpO1xuICAgIH07XG5cbiAgICBpZiAoIWhpZ2hsaWdodCB8fCBoaWdobGlnaHQubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBkZWxldGUgb3B0LmhpZ2hsaWdodDtcblxuICAgIGlmICghcGVuZGluZykgcmV0dXJuIGRvbmUoKTtcblxuICAgIGZvciAoOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09ICdjb2RlJykge1xuICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoaWdobGlnaHQodG9rZW4udGV4dCwgdG9rZW4ubGFuZywgZnVuY3Rpb24oZXJyLCBjb2RlKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGRvbmUoZXJyKTtcbiAgICAgICAgICBpZiAoY29kZSA9PSBudWxsIHx8IGNvZGUgPT09IHRva2VuLnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2tlbi50ZXh0ID0gY29kZTtcbiAgICAgICAgICB0b2tlbi5lc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAtLXBlbmRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pKHRva2Vuc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdCkgb3B0ID0gbWVyZ2Uoe30sIG1hcmtlZC5kZWZhdWx0cywgb3B0KTtcbiAgICByZXR1cm4gUGFyc2VyLnBhcnNlKExleGVyLmxleChzcmMsIG9wdCksIG9wdCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlLm1lc3NhZ2UgKz0gJ1xcblBsZWFzZSByZXBvcnQgdGhpcyB0byBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWQuJztcbiAgICBpZiAoKG9wdCB8fCBtYXJrZWQuZGVmYXVsdHMpLnNpbGVudCkge1xuICAgICAgcmV0dXJuICc8cD5BbiBlcnJvciBvY2N1cmVkOjwvcD48cHJlPidcbiAgICAgICAgKyBlc2NhcGUoZS5tZXNzYWdlICsgJycsIHRydWUpXG4gICAgICAgICsgJzwvcHJlPic7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuLyoqXG4gKiBPcHRpb25zXG4gKi9cblxubWFya2VkLm9wdGlvbnMgPVxubWFya2VkLnNldE9wdGlvbnMgPSBmdW5jdGlvbihvcHQpIHtcbiAgbWVyZ2UobWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICByZXR1cm4gbWFya2VkO1xufTtcblxubWFya2VkLmRlZmF1bHRzID0ge1xuICBnZm06IHRydWUsXG4gIHRhYmxlczogdHJ1ZSxcbiAgYnJlYWtzOiBmYWxzZSxcbiAgcGVkYW50aWM6IGZhbHNlLFxuICBzYW5pdGl6ZTogZmFsc2UsXG4gIHNtYXJ0TGlzdHM6IGZhbHNlLFxuICBzaWxlbnQ6IGZhbHNlLFxuICBoaWdobGlnaHQ6IG51bGwsXG4gIGxhbmdQcmVmaXg6ICdsYW5nLScsXG4gIHNtYXJ0eXBhbnRzOiBmYWxzZSxcbiAgaGVhZGVyUHJlZml4OiAnJyxcbiAgcmVuZGVyZXI6IG5ldyBSZW5kZXJlcixcbiAgeGh0bWw6IGZhbHNlXG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5cbm1hcmtlZC5QYXJzZXIgPSBQYXJzZXI7XG5tYXJrZWQucGFyc2VyID0gUGFyc2VyLnBhcnNlO1xuXG5tYXJrZWQuUmVuZGVyZXIgPSBSZW5kZXJlcjtcblxubWFya2VkLkxleGVyID0gTGV4ZXI7XG5tYXJrZWQubGV4ZXIgPSBMZXhlci5sZXg7XG5cbm1hcmtlZC5JbmxpbmVMZXhlciA9IElubGluZUxleGVyO1xubWFya2VkLmlubGluZUxleGVyID0gSW5saW5lTGV4ZXIub3V0cHV0O1xuXG5tYXJrZWQucGFyc2UgPSBtYXJrZWQ7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBtYXJrZWQ7XG59IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBtYXJrZWQ7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5tYXJrZWQgPSBtYXJrZWQ7XG59XG5cbn0pLmNhbGwoZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCk7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gICBmcm9tICdiYWNvbmpzJztcbmltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xuXG5jb25zdCBFVkVOVF9LRVlVUCA9IEJhY29uLmZyb21FdmVudFRhcmdldChkb2N1bWVudCwgJ2tleXVwJyk7XG5jb25zdCBFVkVOVF9LRVlET1dOID0gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGRvY3VtZW50LCAna2V5ZG93bicpO1xuXG4vKipcbiAqIGNyZWF0ZSBFdmVudFN0cmVhbSBmcm9tIHVzZXIgaW5wdXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBjaGFyS2V5XG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGtleShjaGFyS2V5KSB7XG4gICAgbGV0IGtleUNvZGUgPSB0eXBlb2YoY2hhcktleSkgPT09ICdzdHJpbmcnID8ga2V5Y29kZShjaGFyS2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNoYXJLZXk7XG4gICAgcmV0dXJuIEVWRU5UX0tFWVVQLmZpbHRlcihrZXlDb2RlSXMoa2V5Q29kZSkpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGNoYXJLZXlcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAga2V5ZG93bihjaGFyS2V5KSB7XG4gICAgbGV0IGtleUNvZGUgPSB0eXBlb2YoY2hhcktleSkgPT09ICdzdHJpbmcnID8ga2V5Y29kZShjaGFyS2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGNoYXJLZXk7XG4gICAgcmV0dXJuIEVWRU5UX0tFWURPV04uZmlsdGVyKGtleUNvZGVJcyhrZXlDb2RlKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgY2xpY2soZWwpIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGVsLCAnY2xpY2snKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBbZWwgPSBkb2N1bWVudC5ib2R5XVxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBtb3VzZW1vdmUoZWwgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ21vdXNlbW92ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHRvdWNoc3RhcnQoZWwpIHtcbiAgICByZXR1cm4gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGVsLCAndG91Y2hzdGFydCcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHRvdWNoZW5kKGVsKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ3RvdWNoZW5kJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgdG91Y2htb3ZlKGVsKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldChlbCwgJ3RvdWNobW92ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBbc3RvcEJ1cyA9IG5ldyBCYWNvbi5CdXMoKV1cbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgc3dpcGUoZWwsIHN0b3BCdXMgPSBuZXcgQmFjb24uQnVzKCkpIHtcbiAgICBsZXQgc3RhcnQgPSB0aGlzLnRvdWNoc3RhcnQoZWwpLmRvQWN0aW9uKCcucHJldmVudERlZmF1bHQnKTtcbiAgICBsZXQgbW92ZSAgPSB0aGlzLnRvdWNobW92ZShlbCkuZG9BY3Rpb24oJy5wcmV2ZW50RGVmYXVsdCcpLnRocm90dGxlKDEwMCk7XG4gICAgbGV0IGVuZCAgID0gdGhpcy50b3VjaGVuZChlbCkuZG9BY3Rpb24oJy5wcmV2ZW50RGVmYXVsdCcpO1xuXG4gICAgc3RvcEJ1cy5wbHVnKGVuZCk7XG5cbiAgICByZXR1cm4gc3RhcnQuZmxhdE1hcChmdW5jdGlvbihzdGFydCkge1xuICAgICAgbGV0IGluaXRpYWxWYWx1ZSA9IHtcbiAgICAgICAgaW5pdCA6IHN0YXJ0LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICAgIGN1cnQgOiAwXG4gICAgICB9O1xuICAgICAgcmV0dXJuIG1vdmUudGFrZVVudGlsKHN0b3BCdXMpLnNjYW4oaW5pdGlhbFZhbHVlLCBmdW5jdGlvbihhY2MsIG1vdmUpIHtcbiAgICAgICAgYWNjLmN1cnQgPSBtb3ZlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9KS5za2lwKDEpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtlbCA9IGRvY3VtZW50LmJvZHldXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIHN3aXBlTGVmdChlbCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBsZXQgc3RvcEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuICAgIHJldHVybiB0aGlzLnN3aXBlKGVsLCBzdG9wQnVzKS5maWx0ZXIoKG1vdmVzKSA9PiB7XG4gICAgICBsZXQge2luaXQsIGN1cnR9ID0gbW92ZXM7XG4gICAgICBsZXQgZGVsdGEgPSBjdXJ0IC0gaW5pdDtcbiAgICAgIHJldHVybiBkZWx0YSA8IC0xMCAmJiBzdG9wQnVzLnB1c2godHJ1ZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gW2VsID0gZG9jdW1lbnQuYm9keV1cbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgc3dpcGVSaWdodChlbCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICBsZXQgc3RvcEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuICAgIHJldHVybiB0aGlzLnN3aXBlKGVsLCBzdG9wQnVzKS5maWx0ZXIoKG1vdmVzKSA9PiB7XG4gICAgICBsZXQge2luaXQsIGN1cnR9ID0gbW92ZXM7XG4gICAgICBsZXQgZGVsdGEgPSBjdXJ0IC0gaW5pdDtcbiAgICAgIHJldHVybiBkZWx0YSA+IDEwICYmIHN0b3BCdXMucHVzaCh0cnVlKTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICAgKi9cbiAgcmVzaXplKCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQod2luZG93LCAncmVzaXplJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtFdmVudFN0cmVhbX1cbiAgICovXG4gIGhhc2hjaGFuZ2UoKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldCh3aW5kb3csICdoYXNoY2hhbmdlJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGtleUNvZGVcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24ga2V5Q29kZUlzKGtleUNvZGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50LmtleUNvZGUgPT09IGtleUNvZGU7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGNvbnRyb2wgZnJvbSAnLi9jb250cm9sJztcblxuLyoqXG4gKiBmdWxsIHNjcmVlblxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRhcmdldCkge1xuICBsZXQgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICBidXMub25WYWx1ZSh0b2dnbGVTY3JlZW5PZih0YXJnZXQpKTtcbiAgcmV0dXJuIGJ1cztcbn1cblxuZnVuY3Rpb24gdG9nZ2xlU2NyZWVuT2YoZWwpIHtcbiAgbGV0IHJlcXVlc3QsIGV4aXQ7XG5cbiAgaWYoZWwucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGVsLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH0gZWxzZSBpZihlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nO1xuICB9IGVsc2UgaWYoZWwubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAnbXNSZXF1ZXN0RnVsbHNjcmVlbic7XG4gIH1cblxuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnZXhpdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBleGl0ID0gJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBleGl0ID0gJ21vekNhbmNlbEZ1bGxTY3JlZW4nO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnbXNFeGl0RnVsbHNjcmVlbic7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICBlbFtyZXF1ZXN0XSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudFtleGl0XSgpO1xuICAgIH1cbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBpZiB1c2luZyBhIGZlYXR1cmUgdGhhdCByZXF1aXJlcyBhIGJyb3dzZXItcG9seWZpbGxcbiAqIEBzZWUgaHR0cHM6Ly9iYWJlbGpzLmlvL2RvY3MvdXNhZ2UvcG9seWZpbGwvXG4gKi9cbnJlcXVpcmUoJ2JhYmVsL2Jyb3dzZXItcG9seWZpbGwnKTtcbi8qKlxuICogVGFsa2llLmpzXG4gKi9cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuXG5pbXBvcnQgdXRpbCAgICBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IGNvbnRyb2wgZnJvbSAnLi9jb250cm9sJztcbmltcG9ydCBxdWVyeSAgIGZyb20gJy4vcXVlcnknO1xuXG5pbXBvcnQgTWFya2Rvd24gICBmcm9tICcuL21hcmtkb3duJztcbmltcG9ydCBQYWdpbmcgICAgIGZyb20gJy4vcGFnaW5nJztcbmltcG9ydCBGdWxsU2NyZWVuIGZyb20gJy4vZnVsbHNjcmVlbic7XG5pbXBvcnQgUmVzcG9uc2l2ZSBmcm9tICcuL3Jlc3BvbnNpdmUnO1xuXG5jb25zdCBJREVOVF9ORVhUICAgICA9ICduZXh0JztcbmNvbnN0IElERU5UX1BSRVYgICAgID0gJ3ByZXYnO1xuY29uc3QgSURFTlRfU0NBTEVSICAgPSAnc2NhbGVyJztcbmNvbnN0IElERU5UX0NPTlRST0wgID0gJ2NvbnRyb2wnO1xuY29uc3QgSURFTlRfUEFHRSAgICAgPSAncGFnZSc7XG5jb25zdCBJREVOVF9UT1RBTCAgICA9ICd0b3RhbCc7XG5jb25zdCBJREVOVF9QUk9HUkVTUyA9ICdwcm9ncmVzcyc7XG5jb25zdCBJREVOVF9QT0lOVEVSICA9ICdwb2ludGVyJztcbmNvbnN0IElERU5UX0JBQ0tGQUNFID0gJ2JhY2tmYWNlJztcbmNvbnN0IE1JTUVfTUFSS0RPV04gID0gJ3RleHQveC1tYXJrZG93bic7XG5jb25zdCBBVFRSX0xBWU9VVCAgICA9ICdsYXlvdXQnO1xuY29uc3QgQVRUUl9CT0RZX0JHICAgPSAnYm9keS1iZyc7XG5jb25zdCBBVFRSX0JBQ0tGQUNFICA9ICdiYWNrZmFjZSc7XG5jb25zdCBBVFRSX0ZJTFRFUiAgICA9ICdiYWNrZmFjZS1maWx0ZXInO1xuXG5jb25zdCBOT1JNQUxfV0lEVEggID0gMTAyNDtcbmNvbnN0IE5PUk1BTF9IRUlHSFQgPSA3Njg7XG5jb25zdCBXSURFX1dJRFRIICAgID0gMTM2NjtcbmNvbnN0IFdJREVfSEVJR0hUICAgPSA3Njg7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFsa2llT3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBbYXBpXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbd2lkZV1cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnRyb2xdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtwb2ludGVyXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbcHJvZ3Jlc3NdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtiYWNrZmFjZV1cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcbiAgaWYgKG9wdGlvbnMuYXBpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1haW4gICAgICAgOiBtYWluLFxuICAgICAgdXRpbCAgICAgICA6IHV0aWwsXG4gICAgICBjb250cm9sICAgIDogY29udHJvbCxcbiAgICAgIHF1ZXJ5ICAgICAgOiBxdWVyeSxcbiAgICAgIG1hcmtkb3duICAgOiBNYXJrZG93bixcbiAgICAgIHBhZ2luZyAgICAgOiBQYWdpbmcsXG4gICAgICBmdWxsU2NyZWVuIDogRnVsbFNjcmVlbixcbiAgICAgIHJlc3BvbnNpdmUgOiBSZXNwb25zaXZlLFxuICAgICAgQmFjb24gICAgICA6IEJhY29uXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFpbihvcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gX29wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbWFpbihfb3B0aW9ucyA9IHt9KSB7XG5cbiAgLyoqXG4gICAqIGFwcGx5IGRlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7KnxPYmplY3R9XG4gICAqL1xuICBsZXQgb3B0aW9ucyA9IHV0aWwuZGVmYXVsdHMoX29wdGlvbnMsIHtcbiAgICBhcGkgICAgICA6IGZhbHNlLFxuICAgIHdpZGUgICAgIDogdHJ1ZSxcbiAgICBjb250cm9sICA6IHRydWUsXG4gICAgcG9pbnRlciAgOiB0cnVlLFxuICAgIHByb2dyZXNzIDogdHJ1ZSxcbiAgICBiYWNrZmFjZSA6IHRydWVcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEluaXQgc2xpZGUgc2l6ZXNcbiAgICovXG4gIGxldCB3aWR0aCAgPSBvcHRpb25zLndpZGUgPyBXSURFX1dJRFRIICA6IE5PUk1BTF9XSURUSDtcbiAgbGV0IGhlaWdodCA9IG9wdGlvbnMud2lkZSA/IFdJREVfSEVJR0hUIDogTk9STUFMX0hFSUdIVDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgIDxzdHlsZT5cbiAgICAgICMke0lERU5UX1NDQUxFUn0sXG4gICAgICBbbGF5b3V0XSB7XG4gICAgICAgIHdpZHRoOiAke3dpZHRofXB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogJHtoZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmBcbiAgKTtcblxuICAvKipcbiAgICogSW5pdCBzbGlkZSBzZWN0aW9uc1xuICAgKi9cbiAgdXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt0eXBlPVwiJHtNSU1FX01BUktET1dOfVwiXWApKS5mb3JFYWNoKE1hcmtkb3duKTtcbiAgbGV0IHNsaWRlcyA9IHV0aWwudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtBVFRSX0xBWU9VVH1dYCkpO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zaXZlIHNjYWxpbmdcbiAgICovXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgPGRpdiBpZD1cIiR7SURFTlRfU0NBTEVSfVwiPjwvZGl2PlxuICBgKTtcbiAgbGV0IHNjYWxlckVsID0gdXRpbC5nZXRCeUlkKElERU5UX1NDQUxFUik7XG4gIHNsaWRlcy5mb3JFYWNoKChlbCkgPT4gc2NhbGVyRWwuYXBwZW5kQ2hpbGQoZWwpKTtcblxuICBsZXQgcmVzcG9uc2l2ZSA9IFJlc3BvbnNpdmUoe1xuICAgIHdpZHRoICA6IHdpZHRoLFxuICAgIGhlaWdodCA6IGhlaWdodCxcbiAgICB0YXJnZXQgOiBzY2FsZXJFbFxuICB9KTtcbiAgcmVzcG9uc2l2ZS5zY2FsZUJ1cy5wbHVnKGNvbnRyb2wucmVzaXplKCkpO1xuXG4gIC8qKlxuICAgKiBQYWdpbmcgY29udHJvbFxuICAgKi9cbiAgbGV0IHBhZ2luZyA9IFBhZ2luZyh7XG4gICAgc3RhcnRQYWdlICAgICA6IHV0aWwuZ2V0UGFnZU51bWJlckZyb21IYXNoKCkgfHwgMSxcbiAgICBlbmRQYWdlICAgICAgIDogc2xpZGVzLmxlbmd0aCxcbiAgICBzbGlkZUVsZW1lbnRzIDogc2xpZGVzXG4gIH0pO1xuXG4gIHBhZ2luZy5uZXh0QnVzLnBsdWcoY29udHJvbC5rZXlkb3duKCdyaWdodCcpLnRocm90dGxlKDEwMCkpO1xuICBwYWdpbmcucHJldkJ1cy5wbHVnKGNvbnRyb2wua2V5ZG93bignbGVmdCcpLnRocm90dGxlKDEwMCkpO1xuXG4gIHBhZ2luZy5uZXh0QnVzLnBsdWcoY29udHJvbC5zd2lwZUxlZnQoKSk7XG4gIHBhZ2luZy5wcmV2QnVzLnBsdWcoY29udHJvbC5zd2lwZVJpZ2h0KCkpO1xuXG4gIC8vIHN5bmMgbG9jYXRpb24uaGFzaFxuICBwYWdpbmcubW92ZUJ1cy5wbHVnKGNvbnRyb2wuaGFzaGNoYW5nZSgpLm1hcCh1dGlsLmdldFBhZ2VOdW1iZXJGcm9tSGFzaCkpO1xuICBwYWdpbmcuY3VycmVudEVzLm9uVmFsdWUoKHBhZ2UpID0+IGxvY2F0aW9uLmhhc2ggPSBwYWdlKTtcblxuICAvLyBzeW5jIGJvZHkgYmFja2dyb3VuZCBhdHRyaWJ1dGVcbiAgcGFnaW5nLmNoYW5nZWRFc1xuICAgIC5tYXAoJy5nZXRBdHRyaWJ1dGUnLCBBVFRSX0xBWU9VVClcbiAgICAub25WYWx1ZSh1dGlsLmF0dHJpYnV0ZUFzc2lnbk9mKGRvY3VtZW50LmJvZHksIEFUVFJfQk9EWV9CRykpO1xuXG4gIC8qKlxuICAgKiBJbnNlcnQgVWkgRWxlbWVudHNcbiAgICovXG4gIC8vIFRPRE8gc3BsaXQgdG8gbW9kdWxlICYgYWRkIHRlc3RzXG4gIGlmIChvcHRpb25zLnBvaW50ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX1BPSU5URVJ9XCI+PC9kaXY+YCk7XG4gICAgbGV0IHggPSBuZXcgQmFjb24uQnVzKCk7XG4gICAgbGV0IHkgPSBuZXcgQmFjb24uQnVzKCk7XG4gICAgbGV0IG1vdmVFcyA9IGNvbnRyb2wubW91c2Vtb3ZlKCk7XG4gICAgbGV0IHBvaW50ZXJFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9QT0lOVEVSKTtcbiAgICB4LnBsdWcobW92ZUVzKTtcbiAgICB5LnBsdWcobW92ZUVzKTtcblxuICAgIHgubWFwKChlKSA9PiBlLngpLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKHBvaW50ZXJFbCwgJ2xlZnQnKSk7XG4gICAgeC5tYXAoKGUpID0+IGUueSkub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YocG9pbnRlckVsLCAndG9wJykpO1xuXG4gICAgbGV0IGFzc2lnblBvaW50ZXJWaXNpYmlsaXR5ID0gdXRpbC5zdHlsZUFzc2lnbk9mKHBvaW50ZXJFbCwgJ3Zpc2liaWxpdHknKTtcbiAgICBjb250cm9sLmtleWRvd24oJ2InKVxuICAgICAgLm1hcCgndmlzaWJsZScpXG4gICAgICAub25WYWx1ZShhc3NpZ25Qb2ludGVyVmlzaWJpbGl0eSk7XG4gICAgY29udHJvbC5rZXkoJ2InKVxuICAgICAgLm1hcCgnaGlkZGVuJylcbiAgICAgIC5vblZhbHVlKGFzc2lnblBvaW50ZXJWaXNpYmlsaXR5KTtcbiAgfVxuXG4gIC8vIFRPRE8gc3BsaXQgdG8gbW9kdWxlICYgYWRkIHRlc3RcbiAgaWYgKG9wdGlvbnMuYmFja2ZhY2UpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCIke0lERU5UX0JBQ0tGQUNFfVwiPjwvZGl2PmApO1xuICAgIGxldCBiYWNrZmFjZUVsID0gdXRpbC5nZXRCeUlkKElERU5UX0JBQ0tGQUNFKTtcblxuICAgIGxldCBiZ0ltYWdlQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuICAgIGxldCBiZ0ZpbHRlckJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcblxuICAgIGJnSW1hZ2VCdXMucGx1ZyhwYWdpbmcuY2hhbmdlZEVzKTtcbiAgICBiZ0ZpbHRlckJ1cy5wbHVnKHBhZ2luZy5jaGFuZ2VkRXMpO1xuXG4gICAgLy8gYmFja2ZhY2UgaW1hZ2VcbiAgICBiZ0ltYWdlQnVzXG4gICAgICAubWFwKCcuZ2V0QXR0cmlidXRlJywgQVRUUl9CQUNLRkFDRSlcbiAgICAgIC5tYXAoKHNyYykgPT4gc3JjID8gYHVybChcIiR7c3JjfVwiKWAgOiAnJylcbiAgICAgIC5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZihiYWNrZmFjZUVsLCAnYmFja2dyb3VuZC1pbWFnZScpKTtcblxuICAgIC8vIGJhY2tmYWNlIGltYWdlIGNzcyBmaWx0ZXJcbiAgICBiZ0ZpbHRlckJ1c1xuICAgICAgLm1hcCgnLmdldEF0dHJpYnV0ZScsIEFUVFJfRklMVEVSKVxuICAgICAgLm9uVmFsdWUodXRpbC5zdHlsZUFzc2lnbk9mKGJhY2tmYWNlRWwsIHV0aWwuc3R5bGVQcmVmaXhEZXRlY3QoJ2ZpbHRlcicpKSk7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgQmFjb24uZnJvbUFycmF5KHNsaWRlcylcbiAgICAgIC5tYXAoJy5nZXRBdHRyaWJ1dGUnLCBBVFRSX0JBQ0tGQUNFKVxuICAgICAgLmZpbHRlcigodikgPT4gISF2KVxuICAgICAgLm9uVmFsdWUodXRpbC5wcmVsb2FkSW1nKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNvbnRyb2wpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgPGRpdiBpZD1cIiR7SURFTlRfQ09OVFJPTH1cIj5cbiAgICAgICAgPHA+PHNwYW4gaWQ9XCIke0lERU5UX1BSRVZ9XCI+Jmx0Ozwvc3Bhbj5cbiAgICAgICAgUGFnZSA8c3BhbiBpZD1cIiR7SURFTlRfUEFHRX1cIj4wPC9zcGFuPiBvZiA8c3BhbiBpZD1cIiR7SURFTlRfVE9UQUx9XCI+MDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gaWQ9XCIke0lERU5UX05FWFR9XCI+Jmd0Ozwvc3Bhbj48L3A+XG4gICAgICA8L2Rpdj5cbiAgICBgKTtcblxuICAgIGxldCBuZXh0RWwgPSB1dGlsLmdldEJ5SWQoSURFTlRfTkVYVCk7XG4gICAgbGV0IHByZXZFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9QUkVWKTtcblxuICAgIC8vIG5leHQgYnV0dG9uXG4gICAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmNsaWNrKG5leHRFbCkpO1xuXG4gICAgLy8gcHJldiBidXR0b25cbiAgICBwYWdpbmcucHJldkJ1cy5wbHVnKGNvbnRyb2wuY2xpY2socHJldkVsKSk7XG5cbiAgICAvLyBjdXJyZW50IHBhZ2VcbiAgICBwYWdpbmcuY3VycmVudEVzLm9uVmFsdWUodXRpbC50ZXh0QXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1BBR0UpKSk7XG5cbiAgICAvLyB0b3RhbCBvZiBwYWdlXG4gICAgQmFjb24ub25jZShzbGlkZXMubGVuZ3RoKS5vblZhbHVlKHV0aWwudGV4dEFzc2lnbk9mKHV0aWwuZ2V0QnlJZChJREVOVF9UT1RBTCkpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnByb2dyZXNzKSB7XG4gICAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGlkPVwiJHtJREVOVF9QUk9HUkVTU31cIj48L2Rpdj5gKTtcblxuICAgIC8vIHByb2dyZXNzIGJhclxuICAgIHBhZ2luZy5wZXJjZW50RXMub25WYWx1ZSh1dGlsLnN0eWxlQXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1BST0dSRVNTKSwgJ3dpZHRoJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bGxTY3JlZW5cbiAgICovXG4gIEZ1bGxTY3JlZW4oZG9jdW1lbnQuYm9keSkucGx1Zyhjb250cm9sLmtleSgnZicpKTtcblxuICAvKipcbiAgICogZXhwb3J0IHNvbWUgb2YgY29udHJvbFxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBUYWxraWVFeHBvcnRcbiAgICogQHBhcmFtIHtPYmplY3QuPEZ1bmN0aW9uPn0gY29udHJvbFxuICAgKiBAcGFyYW0ge0JhY29uLkV2ZW50U3RyZWFtfSBjaGFuZ2VkXG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBuZXh0XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBwcmV2XG4gICAqIEBwYXJhbSB7QmFjb24uQnVzfSBqdW1wXG4gICAqL1xuICByZXR1cm4ge1xuICAgIEJhY29uICAgOiBCYWNvbixcbiAgICBjb250cm9sIDogY29udHJvbCxcbiAgICBjaGFuZ2VkIDogcGFnaW5nLmNoYW5nZWRFcyxcbiAgICBuZXh0ICAgIDogcGFnaW5nLm5leHRCdXMsXG4gICAgcHJldiAgICA6IHBhZ2luZy5wcmV2QnVzLFxuICAgIGp1bXAgICAgOiBwYWdpbmcubW92ZUJ1cyxcbiAgICByYXRpbyAgIDogcmVzcG9uc2l2ZS5jdXJyZW50UmF0aW9cbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICBmcm9tICdiYWNvbmpzJztcbmltcG9ydCBtYXJrZWQgZnJvbSAnbWFya2VkJztcbmltcG9ydCB1dGlsICAgZnJvbSAnLi91dGlsJztcblxubWFya2VkLnNldE9wdGlvbnMoe1xuICBsYW5nUHJlZml4OiAnaGxqcyAnLFxuICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgaWYgKHdpbmRvdy5obGpzID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdoaWdobGlnaHQuanMgKGB3aW5kb3cuaGxqc2ApIGlzIG1pc3NpbmcnKTtcbiAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICByZXR1cm4gd2luZG93LmhsanMuaGlnaGxpZ2h0QXV0byhjb2RlKS52YWx1ZTtcbiAgfVxufSk7XG5cbi8qKlxuICogY29tcGlsZSBtYXJrZG93blxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY29tcGlsZU1hcmtkb3duO1xuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjb21waWxlTWFya2Rvd24oZWwpIHtcbiAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIHNlY3Rpb24uaW5uZXJIVE1MID0gbWFya2VkKGVsLmlubmVySFRNTCk7XG4gIHV0aWwudG9BcnJheShlbC5hdHRyaWJ1dGVzKS5maWx0ZXIobm90VHlwZUF0dHJpYnV0ZSkuZm9yRWFjaChjb3B5QXR0cmlidXRlVG8oc2VjdGlvbikpO1xuICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzZWN0aW9uLCBlbCk7XG4gIHJldHVybiBzZWN0aW9uO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY29weUF0dHJpYnV0ZVRvKGVsKSB7XG4gIHJldHVybiBmdW5jdGlvbihhdHRyKSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtBdHRyaWJ1dGVOb2RlfSBhdHRyXG4gKi9cbmZ1bmN0aW9uIG5vdFR5cGVBdHRyaWJ1dGUoYXR0cikge1xuICByZXR1cm4gYXR0ci5uYW1lICE9PSAndHlwZSc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGNvbnRyb2wgZnJvbSAnLi9jb250cm9sJztcbmltcG9ydCB1dGlsICAgIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGFnaW5nT3B0aW9uc1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0UGFnZVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFBhZ2VcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8RWxlbWVudD59IHNsaWRlRWxlbWVudHNcbiAqL1xuXG4vKipcbiAqIHBhZ2luZyBjb250cm9sXG4gKlxuICogQHBhcmFtIHtQYWdpbmdPcHRpb25zfSBvcHRpb25zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICBsZXQgbmV4dEJ1cyA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgbGV0IHByZXZCdXMgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGxldCBtb3ZlQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gIGxldCBjdXJyZW50QnVzICA9IG5ldyBCYWNvbi5CdXMoKTtcbiAgbGV0IGN1cnJlbnRQYWdlID0gY3VycmVudEJ1c1xuICAgIC5tYXAoaW5SYW5nZU9mKDEsIG9wdGlvbnMuZW5kUGFnZSkpXG4gICAgLnRvUHJvcGVydHkob3B0aW9ucy5zdGFydFBhZ2UgfHwgMSlcbiAgICAuc2tpcER1cGxpY2F0ZXMoKTtcblxuICBsZXQgbmV4dEVzID0gY3VycmVudFBhZ2Uuc2FtcGxlZEJ5KG5leHRCdXMpLm1hcCgodikgPT4gdiArIDEpO1xuICBsZXQgcHJldkVzID0gY3VycmVudFBhZ2Uuc2FtcGxlZEJ5KHByZXZCdXMpLm1hcCgodikgPT4gdiAtIDEpO1xuICBsZXQgbW92ZUVzID0gbW92ZUJ1cy5tYXAoKHYpID0+IHYgLypub29wKi8pO1xuXG4gIGxldCBwZXJjZW50U3RyaW5nID0gY3VycmVudFBhZ2UubWFwKHBlcmNlbnRPZihvcHRpb25zLmVuZFBhZ2UpKTtcbiAgbGV0IGN1cnJlbnRTbGlkZSAgPSBjdXJyZW50UGFnZS5tYXAoKGkpID0+IG9wdGlvbnMuc2xpZGVFbGVtZW50c1tpIC0gMV0pO1xuXG4gIGN1cnJlbnRCdXMucGx1ZyhuZXh0RXMubWVyZ2UocHJldkVzKS5tZXJnZShtb3ZlRXMpKTtcblxuICBjdXJyZW50U2xpZGUub25WYWx1ZShmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgb3B0aW9ucy5zbGlkZUVsZW1lbnRzLmZvckVhY2godG9JbnZpc2libGUpO1xuICAgIGN1cnJlbnQgJiYgdG9WaXNpYmxlKGN1cnJlbnQpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGN1cnJlbnRFcyA6IGN1cnJlbnRQYWdlLFxuICAgIHN0YXJ0RXMgICA6IGN1cnJlbnRQYWdlLmZpbHRlcigodikgPT4gdiA9PT0gMSksXG4gICAgZW5kRXMgICAgIDogY3VycmVudFBhZ2UuZmlsdGVyKCh2KSA9PiB2ID09PSBvcHRpb25zLmVuZFBhZ2UpLFxuICAgIGNoYW5nZWRFcyA6IGN1cnJlbnRTbGlkZSxcbiAgICBwZXJjZW50RXMgOiBwZXJjZW50U3RyaW5nLFxuICAgIG5leHRCdXMgICA6IG5leHRCdXMsXG4gICAgcHJldkJ1cyAgIDogcHJldkJ1cyxcbiAgICBtb3ZlQnVzICAgOiBtb3ZlQnVzXG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICovXG5mdW5jdGlvbiB0b0ludmlzaWJsZShlbCkge1xuICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKi9cbmZ1bmN0aW9uIHRvVmlzaWJsZShlbCkge1xuICBlbC5zZXRBdHRyaWJ1dGUoJ3Zpc2libGUnLCAxKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbWluXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGluUmFuZ2VPZihtaW4sIG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oeikge1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KHosIG1pbikpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gcGVyY2VudE9mKG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oY3VycmVudCkge1xuICAgIHJldHVybiAoKDEwMCAvIG1heCkgKiBjdXJyZW50KSArICclJztcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBxdWVyeSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUXVlcnk7XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5KSB7XG4gIGxldCByZXQgPSAge307XG4gIHF1ZXJ5XG4gICAgLnNsaWNlKDEsIC0xKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLm1hcCgoa2V5RXFWYWwpID0+IGtleUVxVmFsLnNwbGl0KCc9JykpXG4gICAgLmZvckVhY2goKGt2KSA9PiByZXRba3ZbMF1dID0ga3ZbMV0pO1xuICByZXR1cm4gcmV0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgdXRpbCAgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSYXRpb09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtFbGVtZW50fSB0YXJnZXRcbiAqL1xuXG4vKipcbiAqIGNvbXB1dGUgcmF0aW9cbiAqXG4gKiBAcGFyYW0ge1JhdGlvT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcblxuICBsZXQgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gIGxldCBoUmF0aW9GbiA9IGhvcml6b250YWxSYXRpb09mKG9wdGlvbnMud2lkdGgpO1xuICBsZXQgdlJhdGlvRm4gPSB2ZXJ0aWNhbFJhdGlvT2Yob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGxldCBoUmF0aW8gPSBidXMubWFwKGhSYXRpb0ZuKS50b1Byb3BlcnR5KGhSYXRpb0ZuKCkpO1xuICBsZXQgdlJhdGlvID0gYnVzLm1hcCh2UmF0aW9GbikudG9Qcm9wZXJ0eSh2UmF0aW9GbigpKTtcblxuICBsZXQgc2NhbGUgPSB1dGlsLmNvbXBvc2UoY2VudGVyaW5nT2Yob3B0aW9ucy50YXJnZXQpLCBzY2FsaW5nT2Yob3B0aW9ucy50YXJnZXQpKTtcblxuICBsZXQgY3VycmVudFJhdGlvID0gQmFjb24uY29tYmluZVdpdGgoTWF0aC5taW4sIGhSYXRpbywgdlJhdGlvKS50b1Byb3BlcnR5KCk7XG5cbiAgY3VycmVudFJhdGlvLm9uVmFsdWUoc2NhbGUpO1xuXG4gIHJldHVybiB7XG4gICAgc2NhbGVCdXMgICAgIDogYnVzLFxuICAgIGN1cnJlbnRSYXRpbyA6IGN1cnJlbnRSYXRpb1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBob3Jpem9udGFsUmF0aW9PZih3aWR0aCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIC8gd2lkdGg7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB2ZXJ0aWNhbFJhdGlvT2YoaGVpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IC8gaGVpZ2h0O1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc2NhbGluZ09mKGVsKSB7XG4gIGxldCB0cmFuc2Zvcm0gPSB1dGlsLnN0eWxlUHJlZml4RGV0ZWN0KCd0cmFuc2Zvcm0nKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJhdGlvKSB7XG4gICAgZWwuc3R5bGVbdHJhbnNmb3JtXSA9IGBzY2FsZSgke01hdGguYWJzKHJhdGlvKX0pYDtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNlbnRlcmluZ09mKGVsKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGVsLnN0eWxlLmxlZnQgPSAod2luZG93LmlubmVyV2lkdGggIC0gcmVjdC53aWR0aCkgLyAyO1xuICAgIGVsLnN0eWxlLnRvcCAgPSAod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQpIC8gMjtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdFxuICAgKiBAcmV0dXJucyB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgdG9BcnJheShsaXN0KSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUT0RPIHRlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBkZWZhdWx0cyhvcmlnLCBkZWZzKSB7XG4gICAgbGV0IHJldCA9IHRoaXMuY2xvbmUob3JpZyk7XG4gICAgT2JqZWN0LmtleXMoZGVmcykuZm9yRWFjaCgoayk9PiB7XG4gICAgICBpZiAoayBpbiByZXQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmV0W2tdID0gZGVmc1trXTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBUT0RPIHRlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGNsb25lKG9yaWcpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgT2JqZWN0LmtleXMob3JpZykuZm9yRWFjaCgoayk9PiByZXRba10gPSBvcmlnW2tdKTtcbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbi4uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAqL1xuICBjb21wb3NlKCkge1xuICAgIC8vIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnLyNjb21wb3NlXG4gICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGV0IHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGxldCBpID0gc3RhcnQ7XG4gICAgICBsZXQgcmVzdWx0ID0gYXJnc1tzdGFydF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgcmVzdWx0ID0gYXJnc1tpXS5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWRlbnRcbiAgICogQHJldHVybnMge0hUTUxFbGVtZW50fVxuICAgKi9cbiAgZ2V0QnlJZChpZGVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAgICovXG4gIHRleHRBc3NpZ25PZihlbCkge1xuICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICovXG4gIHN0eWxlQXNzaWduT2YoZWwsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZSA9PT0gJycgPyBudWxsIDogdmFsdWU7XG4gICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlXG4gICAqL1xuICBhdHRyaWJ1dGVBc3NpZ25PZihlbCwgYXR0cmlidXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3JjXG4gICAqL1xuICBwcmVsb2FkSW1nKHNyYykge1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWcub25sb2FkID0gKCk9PiBpbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcpO1xuICAgIGltZy5zcmMgPSBzcmM7XG4gICAgaW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0UGFnZU51bWJlckZyb21IYXNoKCkge1xuICAgIHJldHVybiBwYXJzZUludChsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyksIDEwKSB8fCAwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIHN0eWxlUHJlZml4RGV0ZWN0KHByb3BlcnR5KSB7XG4gICAgbGV0IHZhbGlkUHJvcGVydHk7XG4gICAgbGV0IHN0eWxlcyA9IHRoaXMudG9BcnJheSh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKSk7XG4gICAgbGV0IGluY2x1ZGVzID0gKG5lZWRsZSkgPT4gc3R5bGVzLmluZGV4T2YobmVlZGxlKSAhPT0gLTE7XG5cbiAgICBpZihpbmNsdWRlcyhgLXdlYmtpdC0ke3Byb3BlcnR5fWApKSB7XG4gICAgICB2YWxpZFByb3BlcnR5ID0gYC13ZWJraXQtJHtwcm9wZXJ0eX1gO1xuICAgIH0gZWxzZSBpZihpbmNsdWRlcyhgLW1vei0ke3Byb3BlcnR5fWApKSB7XG4gICAgICB2YWxpZFByb3BlcnR5ID0gYC1tb3otJHtwcm9wZXJ0eX1gO1xuICAgIH0gZWxzZSBpZihpbmNsdWRlcyhgLW1zLSR7cHJvcGVydHl9YCkpIHtcbiAgICAgIHZhbGlkUHJvcGVydHkgPSBgLW1zLSR7cHJvcGVydHl9YDtcbiAgICB9IGVsc2UgaWYoaW5jbHVkZXMocHJvcGVydHkpKSB7XG4gICAgICB2YWxpZFByb3BlcnR5ID0gcHJvcGVydHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkUHJvcGVydHk7XG4gIH1cbn07XG4iXX0=
