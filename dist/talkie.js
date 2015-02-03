/*! talkie - v0.1.0 */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Talkie=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(global){"use strict";if(global._6to5Polyfill){throw new Error("only one instance of 6to5/polyfill is allowed")}global._6to5Polyfill=true;require("core-js/shim");require("regenerator-6to5/runtime")}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"core-js/shim":2,"regenerator-6to5/runtime":3}],2:[function(require,module,exports){!function(global,framework,undefined){"use strict";var OBJECT="Object",FUNCTION="Function",ARRAY="Array",STRING="String",NUMBER="Number",REGEXP="RegExp",DATE="Date",MAP="Map",SET="Set",WEAKMAP="WeakMap",WEAKSET="WeakSet",SYMBOL="Symbol",PROMISE="Promise",MATH="Math",ARGUMENTS="Arguments",PROTOTYPE="prototype",CONSTRUCTOR="constructor",TO_STRING="toString",TO_STRING_TAG=TO_STRING+"Tag",TO_LOCALE="toLocaleString",HAS_OWN="hasOwnProperty",FOR_EACH="forEach",ITERATOR="iterator",FF_ITERATOR="@@"+ITERATOR,PROCESS="process",CREATE_ELEMENT="createElement",Function=global[FUNCTION],Object=global[OBJECT],Array=global[ARRAY],String=global[STRING],Number=global[NUMBER],RegExp=global[REGEXP],Date=global[DATE],Map=global[MAP],Set=global[SET],WeakMap=global[WEAKMAP],WeakSet=global[WEAKSET],Symbol=global[SYMBOL],Math=global[MATH],TypeError=global.TypeError,setTimeout=global.setTimeout,setImmediate=global.setImmediate,clearImmediate=global.clearImmediate,process=global[PROCESS],nextTick=process&&process.nextTick,document=global.document,html=document&&document.documentElement,navigator=global.navigator,define=global.define,ArrayProto=Array[PROTOTYPE],ObjectProto=Object[PROTOTYPE],FunctionProto=Function[PROTOTYPE],Infinity=1/0,DOT=".";function isObject(it){return it!=null&&(typeof it=="object"||typeof it=="function")}function isFunction(it){return typeof it=="function"}var isNative=ctx(/./.test,/\[native code\]\s*\}\s*$/,1);var buildIn={Undefined:1,Null:1,Array:1,String:1,Arguments:1,Function:1,Error:1,Boolean:1,Number:1,Date:1,RegExp:1},toString=ObjectProto[TO_STRING];function setToStringTag(it,tag,stat){if(it&&!has(it=stat?it:it[PROTOTYPE],SYMBOL_TAG))hidden(it,SYMBOL_TAG,tag)}function cof(it){return it==undefined?it===undefined?"Undefined":"Null":toString.call(it).slice(8,-1)}function classof(it){var klass=cof(it),tag;return klass==OBJECT&&(tag=it[SYMBOL_TAG])?has(buildIn,tag)?"~"+tag:tag:klass}var call=FunctionProto.call,apply=FunctionProto.apply,REFERENCE_GET;function part(){var fn=assertFunction(this),length=arguments.length,args=Array(length),i=0,_=path._,holder=false;while(length>i)if((args[i]=arguments[i++])===_)holder=true;return function(){var that=this,_length=arguments.length,i=0,j=0,_args;if(!holder&&!_length)return invoke(fn,args,that);_args=args.slice();if(holder)for(;length>i;i++)if(_args[i]===_)_args[i]=arguments[j++];while(_length>j)_args.push(arguments[j++]);return invoke(fn,_args,that)}}function ctx(fn,that,length){assertFunction(fn);if(~length&&that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a)};case 2:return function(a,b){return fn.call(that,a,b)};case 3:return function(a,b,c){return fn.call(that,a,b,c)}}return function(){return fn.apply(that,arguments)}}function invoke(fn,args,that){var un=that===undefined;switch(args.length|0){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);case 5:return un?fn(args[0],args[1],args[2],args[3],args[4]):fn.call(that,args[0],args[1],args[2],args[3],args[4])}return fn.apply(that,args)}function construct(target,argumentsList){var proto=assertFunction(arguments.length<3?target:arguments[2])[PROTOTYPE],instance=create(isObject(proto)?proto:ObjectProto),result=apply.call(target,instance,argumentsList);return isObject(result)?result:instance}var create=Object.create,getPrototypeOf=Object.getPrototypeOf,setPrototypeOf=Object.setPrototypeOf,defineProperty=Object.defineProperty,defineProperties=Object.defineProperties,getOwnDescriptor=Object.getOwnPropertyDescriptor,getKeys=Object.keys,getNames=Object.getOwnPropertyNames,getSymbols=Object.getOwnPropertySymbols,isFrozen=Object.isFrozen,has=ctx(call,ObjectProto[HAS_OWN],2),ES5Object=Object,Dict;function toObject(it){return ES5Object(assertDefined(it))}function returnIt(it){return it}function returnThis(){return this}function get(object,key){if(has(object,key))return object[key]}function ownKeys(it){assertObject(it);return getSymbols?getNames(it).concat(getSymbols(it)):getNames(it)}var assign=Object.assign||function(target,source){var T=Object(assertDefined(target)),l=arguments.length,i=1;while(l>i){var S=ES5Object(arguments[i++]),keys=getKeys(S),length=keys.length,j=0,key;while(length>j)T[key=keys[j++]]=S[key]}return T};function keyOf(object,el){var O=toObject(object),keys=getKeys(O),length=keys.length,index=0,key;while(length>index)if(O[key=keys[index++]]===el)return key}function array(it){return String(it).split(",")}var push=ArrayProto.push,unshift=ArrayProto.unshift,slice=ArrayProto.slice,splice=ArrayProto.splice,indexOf=ArrayProto.indexOf,forEach=ArrayProto[FOR_EACH];function createArrayMethod(type){var isMap=type==1,isFilter=type==2,isSome=type==3,isEvery=type==4,isFindIndex=type==6,noholes=type==5||isFindIndex;return function(callbackfn){var O=Object(assertDefined(this)),that=arguments[1],self=ES5Object(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=isMap?Array(length):isFilter?[]:undefined,val,res;for(;length>index;index++)if(noholes||index in self){val=self[index];res=f(val,index,O);if(type){if(isMap)result[index]=res;else if(res)switch(type){case 3:return true;case 5:return val;case 6:return index;case 2:result.push(val)}else if(isEvery)return false}}return isFindIndex?-1:isSome||isEvery?isEvery:result}}function createArrayContains(isContains){return function(el){var O=toObject(this),length=toLength(O.length),index=toIndex(arguments[1],length);if(isContains&&el!=el){for(;length>index;index++)if(sameNaN(O[index]))return isContains||index}else for(;length>index;index++)if(isContains||index in O){if(O[index]===el)return isContains||index}return!isContains&&-1}}function generic(A,B){return typeof A=="function"?A:B}var MAX_SAFE_INTEGER=9007199254740991,ceil=Math.ceil,floor=Math.floor,max=Math.max,min=Math.min,random=Math.random,trunc=Math.trunc||function(it){return(it>0?floor:ceil)(it)};function sameNaN(number){return number!=number}function toInteger(it){return isNaN(it)?0:trunc(it)}function toLength(it){return it>0?min(toInteger(it),MAX_SAFE_INTEGER):0}function toIndex(index,length){var index=toInteger(index);return index<0?max(index+length,0):min(index,length)}function createReplacer(regExp,replace,isStatic){var replacer=isObject(replace)?function(part){return replace[part]}:replace;return function(it){return String(isStatic?it:this).replace(regExp,replacer)}}function createPointAt(toString){return function(pos){var s=String(assertDefined(this)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return toString?"":undefined;a=s.charCodeAt(i);return a<55296||a>56319||i+1===l||(b=s.charCodeAt(i+1))<56320||b>57343?toString?s.charAt(i):a:toString?s.slice(i,i+2):(a-55296<<10)+(b-56320)+65536}}var REDUCE_ERROR="Reduce of empty object with no initial value";function assert(condition,msg1,msg2){if(!condition)throw TypeError(msg2?msg1+msg2:msg1)}function assertDefined(it){if(it==undefined)throw TypeError("Function called on null or undefined");return it}function assertFunction(it){assert(isFunction(it),it," is not a function!");return it}function assertObject(it){assert(isObject(it),it," is not an object!");return it}function assertInstance(it,Constructor,name){assert(it instanceof Constructor,name,": use the 'new' operator!")}function descriptor(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value}}function simpleSet(object,key,value){object[key]=value;return object}function createDefiner(bitmap){return DESC?function(object,key,value){return defineProperty(object,key,descriptor(bitmap,value))}:simpleSet}function uid(key){return SYMBOL+"("+key+")_"+(++sid+random())[TO_STRING](36)}function getWellKnownSymbol(name,setter){return Symbol&&Symbol[name]||(setter?Symbol:safeSymbol)(SYMBOL+DOT+name)}var DESC=!!function(){try{return defineProperty({},DOT,ObjectProto)}catch(e){}}(),sid=0,hidden=createDefiner(1),set=Symbol?simpleSet:hidden,safeSymbol=Symbol||uid;function assignHidden(target,src){for(var key in src)hidden(target,key,src[key]);return target}var SYMBOL_UNSCOPABLES=getWellKnownSymbol("unscopables"),ArrayUnscopables=ArrayProto[SYMBOL_UNSCOPABLES]||{},SYMBOL_SPECIES=getWellKnownSymbol("species");function setSpecies(C){if(framework||!isNative(C))defineProperty(C,SYMBOL_SPECIES,{configurable:true,get:returnThis})}var SYMBOL_ITERATOR=getWellKnownSymbol(ITERATOR),SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG),SUPPORT_FF_ITER=FF_ITERATOR in ArrayProto,ITER=safeSymbol("iter"),KEY=1,VALUE=2,Iterators={},IteratorPrototype={},NATIVE_ITERATORS=SYMBOL_ITERATOR in ArrayProto,BUGGY_ITERATORS="keys"in ArrayProto&&!("next"in[].keys());setIterator(IteratorPrototype,returnThis);function setIterator(O,value){hidden(O,SYMBOL_ITERATOR,value);SUPPORT_FF_ITER&&hidden(O,FF_ITERATOR,value)}function createIterator(Constructor,NAME,next,proto){Constructor[PROTOTYPE]=create(proto||IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+" Iterator")}function defineIterator(Constructor,NAME,value,DEFAULT){var proto=Constructor[PROTOTYPE],iter=get(proto,SYMBOL_ITERATOR)||get(proto,FF_ITERATOR)||DEFAULT&&get(proto,DEFAULT)||value;if(framework){setIterator(proto,iter);if(iter!==value){var iterProto=getPrototypeOf(iter.call(new Constructor));setToStringTag(iterProto,NAME+" Iterator",true);has(proto,FF_ITERATOR)&&setIterator(iterProto,returnThis)}}Iterators[NAME]=iter;Iterators[NAME+" Iterator"]=returnThis;return iter}function defineStdIterators(Base,NAME,Constructor,next,DEFAULT,IS_SET){function createIter(kind){return function(){return new Constructor(this,kind)}}createIterator(Constructor,NAME,next);var entries=createIter(KEY+VALUE),values=createIter(VALUE);if(DEFAULT==VALUE)values=defineIterator(Base,NAME,values,"values");else entries=defineIterator(Base,NAME,entries,"entries");if(DEFAULT){$define(PROTO+FORCED*BUGGY_ITERATORS,NAME,{entries:entries,keys:IS_SET?values:createIter(KEY),values:values})}}function iterResult(done,value){return{value:value,done:!!done}}function isIterable(it){var O=Object(it),Symbol=global[SYMBOL],hasExt=(Symbol&&Symbol[ITERATOR]||FF_ITERATOR)in O;return hasExt||SYMBOL_ITERATOR in O||has(Iterators,classof(O))}function getIterator(it){var Symbol=global[SYMBOL],ext=it[Symbol&&Symbol[ITERATOR]||FF_ITERATOR],getIter=ext||it[SYMBOL_ITERATOR]||Iterators[classof(it)];return assertObject(getIter.call(it))}function stepCall(fn,value,entries){return entries?invoke(fn,value):fn(value)}function forOf(iterable,entries,fn,that){var iterator=getIterator(iterable),f=ctx(fn,that,entries?2:1),step;while(!(step=iterator.next()).done)if(stepCall(f,step.value,entries)===false)return}var NODE=cof(process)==PROCESS,core={},path=framework?global:core,old=global.core,exportGlobal,FORCED=1,GLOBAL=2,STATIC=4,PROTO=8,BIND=16,WRAP=32;function $define(type,name,source){var key,own,out,exp,isGlobal=type&GLOBAL,target=isGlobal?global:type&STATIC?global[name]:(global[name]||ObjectProto)[PROTOTYPE],exports=isGlobal?core:core[name]||(core[name]={});if(isGlobal)source=name;for(key in source){own=!(type&FORCED)&&target&&key in target&&(!isFunction(target[key])||isNative(target[key]));out=(own?target:source)[key];if(type&BIND&&own)exp=ctx(out,global);else if(type&WRAP&&!framework&&target[key]==out){exp=function(param){return this instanceof out?new out(param):out(param)};exp[PROTOTYPE]=out[PROTOTYPE]}else exp=type&PROTO&&isFunction(out)?ctx(call,out):out;if(exports[key]!=out)hidden(exports,key,exp);if(framework&&target&&!own){if(isGlobal)target[key]=out;else delete target[key]&&hidden(target,key,out)}}}if(typeof module!="undefined"&&module.exports)module.exports=core;else if(isFunction(define)&&define.amd)define(function(){return core});else exportGlobal=true;if(exportGlobal||framework){core.noConflict=function(){global.core=old;return core};global.core=core}$define(GLOBAL+FORCED,{global:global});!function(TAG,SymbolRegistry,AllSymbols,setter){if(!isNative(Symbol)){Symbol=function(description){assert(!(this instanceof Symbol),SYMBOL+" is not a "+CONSTRUCTOR);var tag=uid(description);AllSymbols[tag]=true;DESC&&setter&&defineProperty(ObjectProto,tag,{configurable:true,set:function(value){hidden(this,tag,value)}});return set(create(Symbol[PROTOTYPE]),TAG,tag)};hidden(Symbol[PROTOTYPE],TO_STRING,function(){return this[TAG]})}$define(GLOBAL+WRAP,{Symbol:Symbol});var symbolStatics={"for":function(key){return has(SymbolRegistry,key+="")?SymbolRegistry[key]:SymbolRegistry[key]=Symbol(key)},iterator:SYMBOL_ITERATOR,keyFor:part.call(keyOf,SymbolRegistry),species:SYMBOL_SPECIES,toStringTag:SYMBOL_TAG=getWellKnownSymbol(TO_STRING_TAG,true),unscopables:SYMBOL_UNSCOPABLES,pure:safeSymbol,set:set,useSetter:function(){setter=true},useSimple:function(){setter=false}};forEach.call(array("hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive"),function(it){symbolStatics[it]=getWellKnownSymbol(it)});$define(STATIC,SYMBOL,symbolStatics);setToStringTag(Symbol,SYMBOL);$define(STATIC+FORCED*!isNative(Symbol),OBJECT,{getOwnPropertyNames:function(it){var names=getNames(toObject(it)),result=[],key,i=0;while(names.length>i)has(AllSymbols,key=names[i++])||result.push(key);return result},getOwnPropertySymbols:function(it){var names=getNames(toObject(it)),result=[],key,i=0;while(names.length>i)has(AllSymbols,key=names[i++])&&result.push(key);return result}})}(safeSymbol("tag"),{},{},true);!function(RegExpProto,isFinite,tmp,NAME){var RangeError=global.RangeError,isInteger=Number.isInteger||function(it){return!isObject(it)&&isFinite(it)&&floor(it)===it},sign=Math.sign||function sign(x){return(x=+x)==0||x!=x?x:x<0?-1:1},E=Math.E,pow=Math.pow,abs=Math.abs,exp=Math.exp,log=Math.log,sqrt=Math.sqrt,fcc=String.fromCharCode,at=createPointAt(true);var objectStatic={assign:assign,is:function(x,y){return x===y?x!==0||1/x===1/y:x!=x&&y!=y}};"__proto__"in ObjectProto&&function(buggy,set){try{set=ctx(call,getOwnDescriptor(ObjectProto,"__proto__").set,2);set({},ArrayProto)}catch(e){buggy=true}objectStatic.setPrototypeOf=setPrototypeOf=setPrototypeOf||function(O,proto){assertObject(O);assert(proto===null||isObject(proto),proto,": can't set as prototype!");if(buggy)O.__proto__=proto;else set(O,proto);return O}}();$define(STATIC,OBJECT,objectStatic);function asinh(x){return!isFinite(x=+x)||x==0?x:x<0?-asinh(-x):log(x+sqrt(x*x+1))}function expm1(x){return(x=+x)==0?x:x>-1e-6&&x<1e-6?x+x*x/2:exp(x)-1}$define(STATIC,NUMBER,{EPSILON:pow(2,-52),isFinite:function(it){return typeof it=="number"&&isFinite(it)},isInteger:isInteger,isNaN:sameNaN,isSafeInteger:function(number){return isInteger(number)&&abs(number)<=MAX_SAFE_INTEGER},MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,MIN_SAFE_INTEGER:-MAX_SAFE_INTEGER,parseFloat:parseFloat,parseInt:parseInt});$define(STATIC,MATH,{acosh:function(x){return(x=+x)<1?NaN:isFinite(x)?log(x/E+sqrt(x+1)*sqrt(x-1)/E)+1:x},asinh:asinh,atanh:function(x){return(x=+x)==0?x:log((1+x)/(1-x))/2},cbrt:function(x){return sign(x=+x)*pow(abs(x),1/3)},clz32:function(x){return(x>>>=0)?32-x[TO_STRING](2).length:32},cosh:function(x){return(exp(x=+x)+exp(-x))/2},expm1:expm1,fround:function(x){return new Float32Array([x])[0]},hypot:function(value1,value2){var sum=0,len1=arguments.length,len2=len1,args=Array(len1),larg=-Infinity,arg;while(len1--){arg=args[len1]=+arguments[len1];if(arg==Infinity||arg==-Infinity)return Infinity;if(arg>larg)larg=arg}larg=arg||1;while(len2--)sum+=pow(args[len2]/larg,2);return larg*sqrt(sum)},imul:function(x,y){var UInt16=65535,xn=+x,yn=+y,xl=UInt16&xn,yl=UInt16&yn;return 0|xl*yl+((UInt16&xn>>>16)*yl+xl*(UInt16&yn>>>16)<<16>>>0)},log1p:function(x){return(x=+x)>-1e-8&&x<1e-8?x-x*x/2:log(1+x)},log10:function(x){return log(x)/Math.LN10},log2:function(x){return log(x)/Math.LN2},sign:sign,sinh:function(x){return abs(x=+x)<1?(expm1(x)-expm1(-x))/2:(exp(x-1)-exp(-x-1))*(E/2)},tanh:function(x){var a=expm1(x=+x),b=expm1(-x);return a==Infinity?1:b==Infinity?-1:(a-b)/(exp(x)+exp(-x))},trunc:trunc});setToStringTag(Math,MATH,true);function assertNotRegExp(it){if(cof(it)==REGEXP)throw TypeError()}$define(STATIC,STRING,{fromCodePoint:function(x){var res=[],len=arguments.length,i=0,code;while(len>i){code=+arguments[i++];if(toIndex(code,1114111)!==code)throw RangeError(code+" is not a valid code point");res.push(code<65536?fcc(code):fcc(((code-=65536)>>10)+55296,code%1024+56320))}return res.join("")},raw:function(callSite){var raw=toObject(callSite.raw),len=toLength(raw.length),sln=arguments.length,res=[],i=0;while(len>i){res.push(String(raw[i++]));if(i<sln)res.push(String(arguments[i]))}return res.join("")}});$define(PROTO,STRING,{codePointAt:createPointAt(false),endsWith:function(searchString){assertNotRegExp(searchString);var that=String(assertDefined(this)),endPosition=arguments[1],len=toLength(that.length),end=endPosition===undefined?len:min(toLength(endPosition),len);searchString+="";return that.slice(end-searchString.length,end)===searchString},includes:function(searchString){assertNotRegExp(searchString);return!!~String(assertDefined(this)).indexOf(searchString,arguments[1])},repeat:function(count){var str=String(assertDefined(this)),res="",n=toInteger(count);if(0>n||n==Infinity)throw RangeError("Count can't be negative");for(;n>0;(n>>>=1)&&(str+=str))if(n&1)res+=str;return res},startsWith:function(searchString){assertNotRegExp(searchString);var that=String(assertDefined(this)),index=toLength(min(arguments[1],that.length));searchString+="";return that.slice(index,index+searchString.length)===searchString}});defineStdIterators(String,STRING,function(iterated){set(this,ITER,{o:String(iterated),i:0})},function(){var iter=this[ITER],O=iter.o,index=iter.i,point;if(index>=O.length)return iterResult(1);point=at.call(O,index);iter.i+=point.length;return iterResult(0,point)});$define(STATIC,ARRAY,{from:function(arrayLike){var O=Object(assertDefined(arrayLike)),result=new(generic(this,Array)),mapfn=arguments[1],that=arguments[2],mapping=mapfn!==undefined,f=mapping?ctx(mapfn,that,2):undefined,index=0,length;if(isIterable(O))for(var iter=getIterator(O),step;!(step=iter.next()).done;index++){result[index]=mapping?f(step.value,index):step.value}else for(length=toLength(O.length);length>index;index++){result[index]=mapping?f(O[index],index):O[index]}result.length=index;return result},of:function(){var index=0,length=arguments.length,result=new(generic(this,Array))(length);while(length>index)result[index]=arguments[index++];result.length=length;return result}});$define(PROTO,ARRAY,{copyWithin:function(target,start){var O=Object(assertDefined(this)),len=toLength(O.length),to=toIndex(target,len),from=toIndex(start,len),end=arguments[2],fin=end===undefined?len:toIndex(end,len),count=min(fin-from,len-to),inc=1;if(from<to&&to<from+count){inc=-1;from=from+count-1;to=to+count-1}while(count-->0){if(from in O)O[to]=O[from];else delete O[to];to+=inc;from+=inc}return O},fill:function(value){var O=Object(assertDefined(this)),length=toLength(O.length),index=toIndex(arguments[1],length),end=arguments[2],endPos=end===undefined?length:toIndex(end,length);while(endPos>index)O[index++]=value;return O},find:createArrayMethod(5),findIndex:createArrayMethod(6)});defineStdIterators(Array,ARRAY,function(iterated,kind){set(this,ITER,{o:toObject(iterated),i:0,k:kind})},function(){var iter=this[ITER],O=iter.o,kind=iter.k,index=iter.i++;if(!O||index>=O.length)return iter.o=undefined,iterResult(1);if(kind==KEY)return iterResult(0,index);if(kind==VALUE)return iterResult(0,O[index]);return iterResult(0,[index,O[index]])},VALUE);Iterators[ARGUMENTS]=Iterators[ARRAY];setToStringTag(global.JSON,"JSON",true);function wrapObjectMethod(key,MODE){var fn=Object[key],exp=core[OBJECT][key],f=0,o={};if(!exp||isNative(exp)){o[key]=MODE==1?function(it){return isObject(it)?fn(it):it}:MODE==2?function(it){return isObject(it)?fn(it):true}:MODE==3?function(it){return isObject(it)?fn(it):false}:MODE==4?function(it,key){return fn(toObject(it),key)}:function(it){return fn(toObject(it))};try{fn(DOT)}catch(e){f=1}$define(STATIC+FORCED*f,OBJECT,o)}}wrapObjectMethod("freeze",1);wrapObjectMethod("seal",1);wrapObjectMethod("preventExtensions",1);wrapObjectMethod("isFrozen",2);wrapObjectMethod("isSealed",2);wrapObjectMethod("isExtensible",3);wrapObjectMethod("getOwnPropertyDescriptor",4);wrapObjectMethod("getPrototypeOf");wrapObjectMethod("keys");wrapObjectMethod("getOwnPropertyNames");if(framework){tmp[SYMBOL_TAG]=DOT;if(cof(tmp)!=DOT)hidden(ObjectProto,TO_STRING,function(){return"[object "+classof(this)+"]"});NAME in FunctionProto||defineProperty(FunctionProto,NAME,{configurable:true,get:function(){var match=String(this).match(/^\s*function ([^ (]*)/),name=match?match[1]:"";has(this,NAME)||defineProperty(this,NAME,descriptor(5,name));return name},set:function(value){has(this,NAME)||defineProperty(this,NAME,descriptor(0,value))}});if(DESC&&!function(){try{return RegExp(/a/g,"i")=="/a/i"}catch(e){}}()){var _RegExp=RegExp;RegExp=function RegExp(pattern,flags){return new _RegExp(cof(pattern)==REGEXP&&flags!==undefined?pattern.source:pattern,flags)};forEach.call(getNames(_RegExp),function(key){key in RegExp||defineProperty(RegExp,key,{configurable:true,get:function(){return _RegExp[key]},set:function(it){_RegExp[key]=it}})});RegExpProto[CONSTRUCTOR]=RegExp;RegExp[PROTOTYPE]=RegExpProto;hidden(global,REGEXP,RegExp)}if(/./g.flags!="g")defineProperty(RegExpProto,"flags",{configurable:true,get:createReplacer(/^.*\/(\w*)$/,"$1")});forEach.call(array("find,findIndex,fill,copyWithin,entries,keys,values"),function(it){ArrayUnscopables[it]=true});SYMBOL_UNSCOPABLES in ArrayProto||hidden(ArrayProto,SYMBOL_UNSCOPABLES,ArrayUnscopables)}setSpecies(RegExp);setSpecies(Array)}(RegExp[PROTOTYPE],isFinite,{},"name");isFunction(setImmediate)&&isFunction(clearImmediate)||function(ONREADYSTATECHANGE){var postMessage=global.postMessage,addEventListener=global.addEventListener,MessageChannel=global.MessageChannel,counter=0,queue={},defer,channel,port;setImmediate=function(fn){var args=[],i=1;while(arguments.length>i)args.push(arguments[i++]);queue[++counter]=function(){invoke(isFunction(fn)?fn:Function(fn),args)};defer(counter);return counter};clearImmediate=function(id){delete queue[id]};function run(id){if(has(queue,id)){var fn=queue[id];delete queue[id];fn()}}function listner(event){run(event.data)}if(NODE){defer=function(id){nextTick(part.call(run,id))}}else if(addEventListener&&isFunction(postMessage)&&!global.importScripts){defer=function(id){postMessage(id,"*")};addEventListener("message",listner,false)}else if(isFunction(MessageChannel)){channel=new MessageChannel;port=channel.port2;channel.port1.onmessage=listner;defer=ctx(port.postMessage,port,1)}else if(document&&ONREADYSTATECHANGE in document[CREATE_ELEMENT]("script")){defer=function(id){html.appendChild(document[CREATE_ELEMENT]("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run(id)}}}else{defer=function(id){setTimeout(part.call(run,id),0)}}}("onreadystatechange");$define(GLOBAL+BIND,{setImmediate:setImmediate,clearImmediate:clearImmediate});!function(Promise,test){isFunction(Promise)&&isFunction(Promise.resolve)&&Promise.resolve(test=new Promise(function(){}))==test||function(asap,DEF){function isThenable(o){var then;if(isObject(o))then=o.then;return isFunction(then)?then:false}function notify(def){var chain=def.chain;chain.length&&asap(function(){var msg=def.msg,ok=def.state==1,i=0;while(chain.length>i)!function(react){var cb=ok?react.ok:react.fail,ret,then;try{if(cb){ret=cb===true?msg:cb(msg);if(ret===react.P){react.rej(TypeError(PROMISE+"-chain cycle"))}else if(then=isThenable(ret)){then.call(ret,react.res,react.rej)}else react.res(ret)}else react.rej(msg)}catch(err){react.rej(err)}}(chain[i++]);chain.length=0})}function resolve(msg){var def=this,then,wrapper;if(def.done)return;def.done=true;def=def.def||def;try{if(then=isThenable(msg)){wrapper={def:def,done:false};then.call(msg,ctx(resolve,wrapper,1),ctx(reject,wrapper,1))}else{def.msg=msg;def.state=1;notify(def)}}catch(err){reject.call(wrapper||{def:def,done:false},err)}}function reject(msg){var def=this;if(def.done)return;def.done=true;def=def.def||def;def.msg=msg;def.state=2;notify(def)}function getConstructor(C){var S=assertObject(C)[SYMBOL_SPECIES];return S!=undefined?S:C}Promise=function(executor){assertFunction(executor);assertInstance(this,Promise,PROMISE);var def={chain:[],state:0,done:false,msg:undefined};hidden(this,DEF,def);try{executor(ctx(resolve,def,1),ctx(reject,def,1))}catch(err){reject.call(def,err)}};assignHidden(Promise[PROTOTYPE],{then:function(onFulfilled,onRejected){var S=assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];var react={ok:isFunction(onFulfilled)?onFulfilled:true,fail:isFunction(onRejected)?onRejected:false},P=react.P=new(S!=undefined?S:Promise)(function(resolve,reject){react.res=assertFunction(resolve);react.rej=assertFunction(reject)}),def=this[DEF];def.chain.push(react);def.state&&notify(def);return P},"catch":function(onRejected){return this.then(undefined,onRejected)}});assignHidden(Promise,{all:function(iterable){var Promise=getConstructor(this),values=[];return new Promise(function(resolve,reject){forOf(iterable,false,push,values);var remaining=values.length,results=Array(remaining);if(remaining)forEach.call(values,function(promise,index){Promise.resolve(promise).then(function(value){results[index]=value;--remaining||resolve(results)},reject)});else resolve(results)})},race:function(iterable){var Promise=getConstructor(this);return new Promise(function(resolve,reject){forOf(iterable,false,function(promise){Promise.resolve(promise).then(resolve,reject)})})},reject:function(r){return new(getConstructor(this))(function(resolve,reject){reject(r)})},resolve:function(x){return isObject(x)&&DEF in x&&getPrototypeOf(x)===this[PROTOTYPE]?x:new(getConstructor(this))(function(resolve,reject){resolve(x)})}})}(nextTick||setImmediate,safeSymbol("def"));setToStringTag(Promise,PROMISE);setSpecies(Promise);$define(GLOBAL+FORCED*!isNative(Promise),{Promise:Promise})}(global[PROMISE]);!function(){var UID=safeSymbol("uid"),O1=safeSymbol("O1"),WEAK=safeSymbol("weak"),LEAK=safeSymbol("leak"),LAST=safeSymbol("last"),FIRST=safeSymbol("first"),SIZE=DESC?safeSymbol("size"):"size",uid=0,tmp={};function getCollection(C,NAME,methods,commonMethods,isMap,isWeak){var ADDER=isMap?"set":"add",proto=C&&C[PROTOTYPE],O={};function initFromIterable(that,iterable){if(iterable!=undefined)forOf(iterable,isMap,that[ADDER],that);return that}function fixSVZ(key,chain){var method=proto[key];if(framework)proto[key]=function(a,b){var result=method.call(this,a===0?0:a,b);return chain?this:result}}if(!isNative(C)||!(isWeak||!BUGGY_ITERATORS&&has(proto,FOR_EACH)&&has(proto,"entries"))){C=isWeak?function(iterable){assertInstance(this,C,NAME);set(this,UID,uid++);initFromIterable(this,iterable)}:function(iterable){var that=this;assertInstance(that,C,NAME);set(that,O1,create(null));set(that,SIZE,0);set(that,LAST,undefined);set(that,FIRST,undefined);initFromIterable(that,iterable)};assignHidden(assignHidden(C[PROTOTYPE],methods),commonMethods);isWeak||defineProperty(C[PROTOTYPE],"size",{get:function(){return assertDefined(this[SIZE])}})}else{var Native=C,inst=new C,chain=inst[ADDER](isWeak?{}:-0,1),buggyZero;if(!NATIVE_ITERATORS||!C.length){C=function(iterable){assertInstance(this,C,NAME);return initFromIterable(new Native,iterable)};C[PROTOTYPE]=proto;if(framework)proto[CONSTRUCTOR]=C}isWeak||inst[FOR_EACH](function(val,key){buggyZero=1/key===-Infinity});if(buggyZero){fixSVZ("delete");fixSVZ("has");isMap&&fixSVZ("get")}if(buggyZero||chain!==inst)fixSVZ(ADDER,true)}setToStringTag(C,NAME);setSpecies(C);O[NAME]=C;$define(GLOBAL+WRAP+FORCED*!isNative(C),O);isWeak||defineStdIterators(C,NAME,function(iterated,kind){set(this,ITER,{o:iterated,k:kind})},function(){var iter=this[ITER],kind=iter.k,entry=iter.l;while(entry&&entry.r)entry=entry.p;if(!iter.o||!(iter.l=entry=entry?entry.n:iter.o[FIRST])){return iter.o=undefined,iterResult(1)}if(kind==KEY)return iterResult(0,entry.k);if(kind==VALUE)return iterResult(0,entry.v);return iterResult(0,[entry.k,entry.v])},isMap?KEY+VALUE:VALUE,!isMap);return C}function fastKey(it,create){if(!isObject(it))return(typeof it=="string"?"S":"P")+it;if(isFrozen(it))return"F";if(!has(it,UID)){if(!create)return"E";hidden(it,UID,++uid)}return"O"+it[UID]}function getEntry(that,key){var index=fastKey(key),entry;if(index!="F")return that[O1][index];for(entry=that[FIRST];entry;entry=entry.n){if(entry.k==key)return entry}}function def(that,key,value){var entry=getEntry(that,key),prev,index;if(entry)entry.v=value;else{that[LAST]=entry={i:index=fastKey(key,true),k:key,v:value,p:prev=that[LAST],n:undefined,r:false};if(!that[FIRST])that[FIRST]=entry;if(prev)prev.n=entry;that[SIZE]++;if(index!="F")that[O1][index]=entry}return that}var collectionMethods={clear:function(){for(var that=this,data=that[O1],entry=that[FIRST];entry;entry=entry.n){entry.r=true;entry.p=entry.n=undefined;delete data[entry.i]}that[FIRST]=that[LAST]=undefined;that[SIZE]=0},"delete":function(key){var that=this,entry=getEntry(that,key);if(entry){var next=entry.n,prev=entry.p;delete that[O1][entry.i];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that[FIRST]==entry)that[FIRST]=next;if(that[LAST]==entry)that[LAST]=prev;that[SIZE]--}return!!entry},forEach:function(callbackfn){var f=ctx(callbackfn,arguments[1],3),entry;while(entry=entry?entry.n:this[FIRST]){f(entry.v,entry.k,this);while(entry&&entry.r)entry=entry.p}},has:function(key){return!!getEntry(this,key)}};Map=getCollection(Map,MAP,{get:function(key){var entry=getEntry(this,key);return entry&&entry.v},set:function(key,value){return def(this,key===0?0:key,value)}},collectionMethods,true);Set=getCollection(Set,SET,{add:function(value){return def(this,value=value===0?0:value,value)}},collectionMethods);function defWeak(that,key,value){if(isFrozen(assertObject(key)))leakStore(that).set(key,value);else{has(key,WEAK)||hidden(key,WEAK,{});key[WEAK][that[UID]]=value}return that}function leakStore(that){return that[LEAK]||hidden(that,LEAK,new Map)[LEAK]}var weakMethods={"delete":function(key){if(!isObject(key))return false;if(isFrozen(key))return leakStore(this)["delete"](key);return has(key,WEAK)&&has(key[WEAK],this[UID])&&delete key[WEAK][this[UID]]},has:function(key){if(!isObject(key))return false;if(isFrozen(key))return leakStore(this).has(key);return has(key,WEAK)&&has(key[WEAK],this[UID])}};WeakMap=getCollection(WeakMap,WEAKMAP,{get:function(key){if(isObject(key)){if(isFrozen(key))return leakStore(this).get(key);if(has(key,WEAK))return key[WEAK][this[UID]]}},set:function(key,value){return defWeak(this,key,value)}},weakMethods,true,true);if(framework&&DESC&&new WeakMap([[Object.freeze(tmp),7]]).get(tmp)!=7){forEach.call(array("delete,has,get,set"),function(key){var method=WeakMap[PROTOTYPE][key];WeakMap[PROTOTYPE][key]=function(a,b){if(isObject(a)&&isFrozen(a)){var result=leakStore(this)[key](a,b);return key=="set"?this:result
}return method.call(this,a,b)}})}WeakSet=getCollection(WeakSet,WEAKSET,{add:function(value){return defWeak(this,value,true)}},weakMethods,false,true)}();!function(){function Enumerate(iterated){var keys=[],key;for(key in iterated)keys.push(key);set(this,ITER,{o:iterated,a:keys,i:0})}createIterator(Enumerate,OBJECT,function(){var iter=this[ITER],keys=iter.a,key;do{if(iter.i>=keys.length)return iterResult(1)}while(!((key=keys[iter.i++])in iter.o));return iterResult(0,key)});function wrap(fn){return function(it){assertObject(it);try{return fn.apply(undefined,arguments),true}catch(e){return false}}}function reflectGet(target,propertyKey){var receiver=arguments.length<3?target:arguments[2],desc=getOwnDescriptor(assertObject(target),propertyKey),proto;if(desc)return desc.get?desc.get.call(receiver):desc.value;return isObject(proto=getPrototypeOf(target))?reflectGet(proto,propertyKey,receiver):undefined}function reflectSet(target,propertyKey,V){var receiver=arguments.length<4?target:arguments[3],desc=getOwnDescriptor(assertObject(target),propertyKey),proto;if(desc){if(desc.writable===false)return false;if(desc.set)return desc.set.call(receiver,V),true}if(isObject(proto=getPrototypeOf(target)))return reflectSet(proto,propertyKey,V,receiver);desc=getOwnDescriptor(receiver,propertyKey)||descriptor(0);desc.value=V;return defineProperty(receiver,propertyKey,desc),true}var isExtensible=Object.isExtensible||returnIt;var reflect={apply:ctx(call,apply,3),construct:construct,defineProperty:wrap(defineProperty),deleteProperty:function(target,propertyKey){var desc=getOwnDescriptor(assertObject(target),propertyKey);return desc&&!desc.configurable?false:delete target[propertyKey]},enumerate:function(target){return new Enumerate(assertObject(target))},get:reflectGet,getOwnPropertyDescriptor:function(target,propertyKey){return getOwnDescriptor(assertObject(target),propertyKey)},getPrototypeOf:function(target){return getPrototypeOf(assertObject(target))},has:function(target,propertyKey){return propertyKey in target},isExtensible:function(target){return!!isExtensible(assertObject(target))},ownKeys:ownKeys,preventExtensions:wrap(Object.preventExtensions||returnIt),set:reflectSet};if(setPrototypeOf)reflect.setPrototypeOf=function(target,proto){return setPrototypeOf(assertObject(target),proto),true};$define(GLOBAL,{Reflect:{}});$define(STATIC,"Reflect",reflect)}();!function(){$define(PROTO,ARRAY,{includes:createArrayContains(true)});$define(PROTO,STRING,{at:createPointAt(true)});function createObjectToArray(isEntries){return function(object){var O=toObject(object),keys=getKeys(object),length=keys.length,i=0,result=Array(length),key;if(isEntries)while(length>i)result[i]=[key=keys[i++],O[key]];else while(length>i)result[i]=O[keys[i++]];return result}}$define(STATIC,OBJECT,{values:createObjectToArray(false),entries:createObjectToArray(true)});$define(STATIC,REGEXP,{escape:createReplacer(/([\\\-[\]{}()*+?.,^$|])/g,"\\$1",true)})}();!function(REFERENCE){REFERENCE_GET=getWellKnownSymbol(REFERENCE+"Get",true);var REFERENCE_SET=getWellKnownSymbol(REFERENCE+SET,true),REFERENCE_DELETE=getWellKnownSymbol(REFERENCE+"Delete",true);$define(STATIC,SYMBOL,{referenceGet:REFERENCE_GET,referenceSet:REFERENCE_SET,referenceDelete:REFERENCE_DELETE});hidden(FunctionProto,REFERENCE_GET,returnThis);function setMapMethods(Constructor){if(Constructor){var MapProto=Constructor[PROTOTYPE];hidden(MapProto,REFERENCE_GET,MapProto.get);hidden(MapProto,REFERENCE_SET,MapProto.set);hidden(MapProto,REFERENCE_DELETE,MapProto["delete"])}}setMapMethods(Map);setMapMethods(WeakMap)}("reference");!function(NodeList){if(framework&&NodeList&&!(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){hidden(NodeList[PROTOTYPE],SYMBOL_ITERATOR,Iterators[ARRAY])}Iterators.NodeList=Iterators[ARRAY]}(global.NodeList);!function(arrayStatics){function setArrayStatics(keys,length){forEach.call(array(keys),function(key){if(key in ArrayProto)arrayStatics[key]=ctx(call,ArrayProto[key],length)})}setArrayStatics("pop,reverse,shift,keys,values,entries",1);setArrayStatics("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3);setArrayStatics("join,slice,concat,push,splice,unshift,sort,lastIndexOf,"+"reduce,reduceRight,copyWithin,fill,turn");$define(STATIC,ARRAY,arrayStatics)}({})}(typeof self!="undefined"&&self.Math===Math?self:Function("return this")(),true)},{}],3:[function(require,module,exports){(function(global){!function(global){"use strict";var hasOwn=Object.prototype.hasOwnProperty;var undefined;var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";var inModule=typeof module==="object";var runtime=global.regeneratorRuntime;if(runtime){if(inModule){module.exports=runtime}return}runtime=global.regeneratorRuntime=inModule?module.exports:{};function wrap(innerFn,outerFn,self,tryList){return new Generator(innerFn,outerFn,self||null,tryList||[])}runtime.wrap=wrap;function tryCatch(fn,obj,arg){try{return{type:"normal",arg:fn.call(obj,arg)}}catch(err){return{type:"throw",arg:err}}}var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed";var ContinueSentinel={};function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var Gp=GeneratorFunctionPrototype.prototype=Generator.prototype;GeneratorFunction.prototype=Gp.constructor=GeneratorFunctionPrototype;GeneratorFunctionPrototype.constructor=GeneratorFunction;GeneratorFunction.displayName="GeneratorFunction";runtime.isGeneratorFunction=function(genFun){var ctor=typeof genFun==="function"&&genFun.constructor;return ctor?ctor===GeneratorFunction||(ctor.displayName||ctor.name)==="GeneratorFunction":false};runtime.mark=function(genFun){genFun.__proto__=GeneratorFunctionPrototype;genFun.prototype=Object.create(Gp);return genFun};runtime.async=function(innerFn,outerFn,self,tryList){return new Promise(function(resolve,reject){var generator=wrap(innerFn,outerFn,self,tryList);var callNext=step.bind(generator.next);var callThrow=step.bind(generator["throw"]);function step(arg){var record=tryCatch(this,null,arg);if(record.type==="throw"){reject(record.arg);return}var info=record.arg;if(info.done){resolve(info.value)}else{Promise.resolve(info.value).then(callNext,callThrow)}}callNext()})};function Generator(innerFn,outerFn,self,tryList){var generator=outerFn?Object.create(outerFn.prototype):this;var context=new Context(tryList);var state=GenStateSuspendedStart;function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running")}if(state===GenStateCompleted){return doneResult()}while(true){var delegate=context.delegate;if(delegate){var record=tryCatch(delegate.iterator[method],delegate.iterator,arg);if(record.type==="throw"){context.delegate=null;method="throw";arg=record.arg;continue}method="next";arg=undefined;var info=record.arg;if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc}else{state=GenStateSuspendedYield;return info}context.delegate=null}if(method==="next"){if(state===GenStateSuspendedStart&&typeof arg!=="undefined"){throw new TypeError("attempt to send "+JSON.stringify(arg)+" to newborn generator")}if(state===GenStateSuspendedYield){context.sent=arg}else{delete context.sent}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg}if(context.dispatchException(arg)){method="next";arg=undefined}}else if(method==="return"){context.abrupt("return",arg)}state=GenStateExecuting;var record=tryCatch(innerFn,self,context);if(record.type==="normal"){state=context.done?GenStateCompleted:GenStateSuspendedYield;var info={value:record.arg,done:context.done};if(record.arg===ContinueSentinel){if(context.delegate&&method==="next"){arg=undefined}}else{return info}}else if(record.type==="throw"){state=GenStateCompleted;if(method==="next"){context.dispatchException(record.arg)}else{arg=record.arg}}}}generator.next=invoke.bind(generator,"next");generator["throw"]=invoke.bind(generator,"throw");generator["return"]=invoke.bind(generator,"return");return generator}Gp[iteratorSymbol]=function(){return this};Gp.toString=function(){return"[object Generator]"};function pushTryEntry(triple){var entry={tryLoc:triple[0]};if(1 in triple){entry.catchLoc=triple[1]}if(2 in triple){entry.finallyLoc=triple[2]}this.tryEntries.push(entry)}function resetTryEntry(entry,i){var record=entry.completion||{};record.type=i===0?"normal":"return";delete record.arg;entry.completion=record}function Context(tryList){this.tryEntries=[{tryLoc:"root"}];tryList.forEach(pushTryEntry,this);this.reset()}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key)}keys.reverse();return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next}}next.done=true;return next}};function values(iterable){if(iterable){var iteratorMethod=iterable[iteratorSymbol];if(iteratorMethod){return iteratorMethod.call(iterable)}if(typeof iterable.next==="function"){return iterable}if(!isNaN(iterable.length)){var i=-1,next=function next(){while(++i<iterable.length){if(hasOwn.call(iterable,i)){next.value=iterable[i];next.done=false;return next}}next.value=undefined;next.done=true;return next};return next.next=next}}return{next:doneResult}}runtime.values=values;function doneResult(){return{value:undefined,done:true}}Context.prototype={constructor:Context,reset:function(){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);for(var tempIndex=0,tempName;hasOwn.call(this,tempName="t"+tempIndex)||tempIndex<20;++tempIndex){this[tempName]=null}},stop:function(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg}return this.rval},dispatchException:function(exception){if(this.done){throw exception}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){return handle("end")}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else{throw new Error("try statement without catch or finally")}}}},_findFinallyEntry:function(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&(entry.finallyLoc===finallyLoc||this.prev<entry.finallyLoc)){return entry}}},abrupt:function(type,arg){var entry=this._findFinallyEntry();var record=entry?entry.completion:{};record.type=type;record.arg=arg;if(entry){this.next=entry.finallyLoc}else{this.complete(record)}return ContinueSentinel},complete:function(record){if(record.type==="throw"){throw record.arg}if(record.type==="break"||record.type==="continue"){this.next=record.arg}else if(record.type==="return"){this.rval=record.arg;this.next="end"}return ContinueSentinel},finish:function(finallyLoc){var entry=this._findFinallyEntry(finallyLoc);return this.complete(entry.completion)},"catch":function(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;if(record.type==="throw"){var thrown=record.arg;resetTryEntry(entry,i)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel}}}(typeof global==="object"?global:typeof window==="object"?window:this)}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}]},{},[1]);
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
   * @param {Element} el
   * @returns {EventStream}
   */
  click: function click(el) {
    return Bacon.fromEventTarget(el, "click");
  },

  /**
   * @returns {EventStream}
   */
  resize: function resize() {
    return Bacon.fromEventTarget(window, "resize");
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
var IDENT_PAGE = "page";
var IDENT_TOTAL = "total";
var IDENT_PROGRESS = "progress";
var MIME_MARKDOWN = "text/x-markdown";
var ATTR_LAYOUT = "layout";

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
    progress: true
  });

  /**
   * Get params from query strings
   */
  var params = query(location.search);

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
    startPage: params.startPage || 1,
    endPage: slides.length,
    slideElements: slides
  });

  paging.nextBus.plug(control.key("right"));
  paging.prevBus.plug(control.key("left"));

  /**
   * Insert Ui Elements
   */
  if (options.control) {
    document.body.insertAdjacentHTML("beforeend", "\n      <div id=\"control\">\n        <p><span id=\"prev\">&lt;</span>\n        Page <span id=\"page\">0</span> of <span id=\"total\">0</span>\n        <span id=\"next\">&gt;</span></p>\n      </div>\n    ");

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
    document.body.insertAdjacentHTML("beforeend", "<div id=\"progress\"></div>");

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

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Bacon = _interopRequire(require("baconjs"));

var marked = _interopRequire(require("marked"));

var util = _interopRequire(require("./util"));

var MIME_MARKDOWN = "text/x-markdown";

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

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } };

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

  var nextEs = nextBus.map(1);
  var prevEs = prevBus.map(-1);

  var initialPage = options.startPage || 1;
  var correctPage = util.compose(inRangeOf(1, options.endPage), add);

  var bothEs = nextEs.merge(prevEs);
  var current = bothEs.scan(initialPage, correctPage).skipDuplicates();
  var percent = current.map(percentOf(options.endPage)).skipDuplicates();

  Bacon.combineAsArray(current, options.slideElements).onValue(function (data) {
    var _data = _slicedToArray(data, 2);

    var current = _data[0];
    var all = _data[1];
    all.forEach(toInvisible);

    var index = current - 1 /* fix page to index */;
    all[index] && toVisible(all[index]);
  });

  return {
    percentEs: percent,
    currentEs: current,
    startEs: current.filter(function (v) {
      return v === 1;
    }),
    endEs: current.filter(function (v) {
      return v === options.endPage;
    }),
    nextBus: nextBus,
    prevBus: prevBus
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

/**
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
function add(x, y) {
  return x + y;
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

  var hRatio = horizontalRatioOf(options.width);
  var vRatio = verticalRatioOf(options.height);

  var hRatioEs = bus.map(hRatio).toProperty(hRatio());
  var vRatioEs = bus.map(vRatio).toProperty(vRatio());

  var scale = util.compose(centeringOf(options.target), scalingOf(options.target));

  Bacon.combineWith(Math.min, hRatioEs, vRatioEs).onValue(scale);

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
  }
};

},{}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvNnRvNS9icm93c2VyLXBvbHlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL2JhY29uanMvZGlzdC9CYWNvbi5qcyIsIm5vZGVfbW9kdWxlcy9rZXljb2RlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21hcmtlZC9saWIvbWFya2VkLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9jb250cm9sLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9mdWxsc2NyZWVuLmpzIiwiL1VzZXJzL2ExMzA0Mi9Ecm9wYm94L1BsYXlncm91bmQvVGFsa2llL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvbWFya2Rvd24uanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3BhZ2luZy5qcyIsIi9Vc2Vycy9hMTMwNDIvRHJvcGJveC9QbGF5Z3JvdW5kL1RhbGtpZS9zcmMvcXVlcnkuanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3Jlc3BvbnNpdmUuanMiLCIvVXNlcnMvYTEzMDQyL0Ryb3Bib3gvUGxheWdyb3VuZC9UYWxraWUvc3JjL3V0aWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsbUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztJQ3R2Q08sS0FBSywyQkFBUSxTQUFTOztJQUN0QixPQUFPLDJCQUFNLFNBQVM7O0FBRTdCLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7OztpQkFLOUM7Ozs7O0FBS2IsS0FBRyxFQUFBLGFBQUMsT0FBTyxFQUFFO0FBQ1gsUUFBSSxPQUFPLEdBQUcsT0FBTyxPQUFPLEFBQUMsS0FBSyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUNoQixPQUFPLENBQUM7QUFDckQsV0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0dBQy9DOzs7Ozs7QUFNRCxPQUFLLEVBQUEsZUFBQyxFQUFFLEVBQUU7QUFDUixXQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQzNDOzs7OztBQUtELFFBQU0sRUFBQSxrQkFBRztBQUNQLFdBQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDaEQ7Q0FDRjs7Ozs7OztBQU1ELFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRTtBQUMxQixTQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFdBQU8sS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7R0FDbEMsQ0FBQztDQUNIOzs7Ozs7O0lDM0NNLEtBQUssMkJBQVEsU0FBUzs7SUFDdEIsT0FBTywyQkFBTSxXQUFXOzs7Ozs7OztpQkFRaEIsVUFBUyxNQUFNLEVBQUU7QUFDOUIsTUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsS0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwQyxTQUFPLEdBQUcsQ0FBQztDQUNaOztBQUVELFNBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRTtBQUMxQixNQUFJLE9BQU8sWUFBQTtNQUFFLElBQUksWUFBQSxDQUFDOztBQUVsQixNQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtBQUN2QixXQUFPLEdBQUcsbUJBQW1CLENBQUM7R0FDL0IsTUFBTSxJQUFHLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtBQUNwQyxXQUFPLEdBQUcseUJBQXlCLENBQUM7R0FDckMsTUFBTSxJQUFHLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtBQUNqQyxXQUFPLEdBQUcsc0JBQXNCLENBQUM7R0FDbEMsTUFBTSxJQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRTtBQUNoQyxXQUFPLEdBQUcscUJBQXFCLENBQUM7R0FDakM7O0FBRUQsTUFBRyxRQUFRLENBQUMsY0FBYyxFQUFFO0FBQzFCLFFBQUksR0FBRyxnQkFBZ0IsQ0FBQztHQUN6QixNQUFNLElBQUcsUUFBUSxDQUFDLG9CQUFvQixFQUFFO0FBQ3ZDLFFBQUksR0FBRyxzQkFBc0IsQ0FBQztHQUMvQixNQUFNLElBQUcsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0FBQ3RDLFFBQUksR0FBRyxxQkFBcUIsQ0FBQztHQUM5QixNQUFNLElBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFO0FBQ25DLFFBQUksR0FBRyxrQkFBa0IsQ0FBQztHQUMzQjs7QUFFRCxTQUFPLFlBQVc7QUFDaEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsSUFDN0IsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLElBQzlCLENBQUMsUUFBUSxDQUFDLHVCQUF1QixJQUNqQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtBQUMvQixRQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztLQUNmLE1BQU07QUFDTCxjQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNsQjtHQUNGLENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7O0lDM0NNLFFBQVEsMkJBQU0sdUJBQXVCOzs7OztJQUtyQyxLQUFLLDJCQUFRLFNBQVM7O0lBRXRCLElBQUksMkJBQVMsUUFBUTs7SUFDckIsT0FBTywyQkFBTSxXQUFXOztJQUN4QixLQUFLLDJCQUFRLFNBQVM7O0lBRXRCLFFBQVEsMkJBQVEsWUFBWTs7SUFDNUIsTUFBTSwyQkFBVSxVQUFVOztJQUMxQixVQUFVLDJCQUFNLGNBQWM7O0lBQzlCLFVBQVUsMkJBQU0sY0FBYzs7QUFFckMsSUFBTSxVQUFVLEdBQU8sTUFBTSxDQUFDO0FBQzlCLElBQU0sVUFBVSxHQUFPLE1BQU0sQ0FBQztBQUM5QixJQUFNLFlBQVksR0FBSyxRQUFRLENBQUM7QUFDaEMsSUFBTSxVQUFVLEdBQU8sTUFBTSxDQUFDO0FBQzlCLElBQU0sV0FBVyxHQUFNLE9BQU8sQ0FBQztBQUMvQixJQUFNLGNBQWMsR0FBRyxVQUFVLENBQUM7QUFDbEMsSUFBTSxhQUFhLEdBQUksaUJBQWlCLENBQUM7QUFDekMsSUFBTSxXQUFXLEdBQU0sUUFBUSxDQUFDOztBQUVoQyxJQUFNLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDM0IsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLElBQU0sVUFBVSxHQUFNLElBQUksQ0FBQztBQUMzQixJQUFNLFdBQVcsR0FBSyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7aUJBYVgsWUFBdUI7TUFBZCxPQUFPLGdDQUFHLEVBQUU7QUFDbEMsTUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsV0FBTztBQUNMLFVBQUksRUFBUyxJQUFJO0FBQ2pCLFVBQUksRUFBUyxJQUFJO0FBQ2pCLGFBQU8sRUFBTSxPQUFPO0FBQ3BCLFdBQUssRUFBUSxLQUFLO0FBQ2xCLGNBQVEsRUFBSyxRQUFRO0FBQ3JCLFlBQU0sRUFBTyxNQUFNO0FBQ25CLGdCQUFVLEVBQUcsVUFBVTtBQUN2QixnQkFBVSxFQUFHLFVBQVU7QUFDdkIsV0FBSyxFQUFRLEtBQUs7S0FDbkIsQ0FBQztHQUNILE1BQU07QUFDTCxXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUN0QjtDQUNGOzs7OztBQUtELFNBQVMsSUFBSSxHQUFnQjtNQUFmLFFBQVEsZ0NBQUcsRUFBRTs7Ozs7OztBQU16QixNQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtBQUNwQyxPQUFHLEVBQVEsS0FBSztBQUNoQixRQUFJLEVBQU8sSUFBSTtBQUNmLFdBQU8sRUFBSSxJQUFJO0FBQ2YsWUFBUSxFQUFHLElBQUk7R0FDaEIsQ0FBQyxDQUFDOzs7OztBQUtILE1BQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0FBS3BDLE1BQUksS0FBSyxHQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFJLFlBQVksQ0FBQztBQUN2RCxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDeEQsVUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLDZCQUV0RCxZQUFZLDRDQUVKLEtBQUssd0NBQ0osTUFBTSwyQ0FHckIsQ0FBQzs7Ozs7QUFLRixNQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsY0FBVyxhQUFhLFNBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RixNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsT0FBSyxXQUFXLE9BQUksQ0FBQyxDQUFDOzs7OztBQUt6RSxVQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsdUJBQy9CLFlBQVksbUJBQ3ZCLENBQUM7QUFDSDtBQUNBLDJCQUFnQixFQUFFO1dBQUssUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7R0FBQSxDQUFDLENBQUM7O0FBRWpELE1BQUksS0FBSyxHQUFHLFVBQVUsQ0FBQztBQUNyQixTQUFLLEVBQUksS0FBSztBQUNkLFVBQU0sRUFBRyxNQUFNO0FBQ2YsVUFBTSxFQUFHLFFBQVE7R0FDbEIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7Ozs7QUFLN0IsTUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ2xCLGFBQVMsRUFBTyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUM7QUFDckMsV0FBTyxFQUFTLE1BQU0sQ0FBQyxNQUFNO0FBQzdCLGlCQUFhLEVBQUcsTUFBTTtHQUN2QixDQUFDLENBQUM7O0FBRUgsUUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzFDLFFBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFLekMsTUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ25CLFlBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxrTkFNMUMsQ0FBQzs7QUFFSCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7OztBQUd0QyxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztBQUczQyxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztBQUczQyxVQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFHdEUsU0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDakY7O0FBRUQsTUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO0FBQ3BCLFlBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxnQ0FBOEIsQ0FBQzs7O0FBRzNFLFVBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0dBQ3JGOzs7OztBQUtELFlBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUNsRDs7Ozs7OztJQzdLTSxLQUFLLDJCQUFPLFNBQVM7O0lBQ3JCLE1BQU0sMkJBQU0sUUFBUTs7SUFDcEIsSUFBSSwyQkFBUSxRQUFROztBQUUzQixJQUFNLGFBQWEsR0FBSSxpQkFBaUIsQ0FBQzs7QUFFekMsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNoQixZQUFVLEVBQUUsT0FBTztBQUNuQixXQUFTLEVBQUUsVUFBVSxJQUFJLEVBQUU7QUFDekIsUUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtBQUN2QixhQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkQsYUFBTyxJQUFJLENBQUM7S0FDYjtBQUNELFdBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO0dBQzlDO0NBQ0YsQ0FBQyxDQUFDOzs7Ozs7O2lCQU9ZLGVBQWU7Ozs7Ozs7QUFNOUIsU0FBUyxlQUFlLENBQUMsRUFBRSxFQUFFO0FBQzNCLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEQsU0FBTyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pDLE1BQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN2RixJQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEMsU0FBTyxPQUFPLENBQUM7Q0FDaEI7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUMzQixTQUFPLFVBQVMsSUFBSSxFQUFFO0FBQ3BCLE1BQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDeEMsQ0FBQztDQUNIOzs7OztBQUtELFNBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLFNBQU8sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7Q0FDN0I7Ozs7Ozs7OztJQ25ETSxLQUFLLDJCQUFRLFNBQVM7O0lBQ3RCLE9BQU8sMkJBQU0sV0FBVzs7SUFDeEIsSUFBSSwyQkFBUyxRQUFROzs7Ozs7Ozs7Ozs7OztpQkFjYixVQUFTLE9BQU8sRUFBRTtBQUUvQixNQUFJLE9BQU8sR0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNqQyxNQUFJLE9BQU8sR0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7QUFFakMsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTdCLE1BQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ3pDLE1BQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRW5FLE1BQUksTUFBTSxHQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckUsTUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXZFLE9BQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJLEVBQUU7K0JBQ3JELElBQUk7O1FBQXBCLE9BQU87UUFBRSxHQUFHO0FBQ2pCLE9BQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXpCLFFBQUksS0FBSyxHQUFHLE9BQU8sR0FBRyxDQUFDLHdCQUFBLENBQXlCO0FBQ2hELE9BQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7R0FDckMsQ0FBQyxDQUFDOztBQUVILFNBQU87QUFDTCxhQUFTLEVBQUcsT0FBTztBQUNuQixhQUFTLEVBQUcsT0FBTztBQUNuQixXQUFPLEVBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUM7YUFBSyxDQUFDLEtBQUssQ0FBQztLQUFBLENBQUM7QUFDMUMsU0FBSyxFQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDO2FBQUssQ0FBQyxLQUFLLE9BQU8sQ0FBQyxPQUFPO0tBQUEsQ0FBQztBQUN4RCxXQUFPLEVBQUssT0FBTztBQUNuQixXQUFPLEVBQUssT0FBTztHQUNwQixDQUFDO0NBQ0g7Ozs7O0FBS0QsU0FBUyxXQUFXLENBQUMsRUFBRSxFQUFFO0FBQ3ZCLElBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Q0FDL0I7Ozs7O0FBS0QsU0FBUyxTQUFTLENBQUMsRUFBRSxFQUFFO0FBQ3JCLElBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQy9COzs7Ozs7O0FBT0QsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMzQixTQUFPLFVBQVMsQ0FBQyxFQUFFO0FBQ2pCLFdBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztHQUN4QyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN0QixTQUFPLFVBQVMsT0FBTyxFQUFFO0FBQ3ZCLFdBQU8sQUFBQyxBQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUksT0FBTyxHQUFJLEdBQUcsQ0FBQztHQUN0QyxDQUFDO0NBQ0g7Ozs7Ozs7QUFPRCxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2pCLFNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNkOzs7Ozs7OztpQkN4RmMsVUFBVTs7Ozs7OztBQU16QixTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDekIsTUFBSSxHQUFHLEdBQUksRUFBRSxDQUFDO0FBQ2QsT0FBSyxDQUNGLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FDWixLQUFLLENBQUMsR0FBRyxDQUFDLENBQ1YsR0FBRyxDQUFDLFVBQUMsUUFBUTtXQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0dBQUEsQ0FBQyxDQUN0QyxPQUFPLENBQUMsVUFBQyxFQUFFO1dBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7R0FBQSxDQUFDLENBQUM7QUFDdkMsU0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7OztJQ2pCTSxLQUFLLDJCQUFNLFNBQVM7O0lBQ3BCLElBQUksMkJBQU8sUUFBUTs7Ozs7Ozs7Ozs7Ozs7O2lCQWVYLFlBQXVCO01BQWQsT0FBTyxnQ0FBRyxFQUFFOzs7QUFFbEMsTUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRTFCLE1BQUksTUFBTSxHQUFLLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxNQUFJLE1BQU0sR0FBSyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUvQyxNQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELE1BQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O0FBRXBELE1BQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O0FBRWpGLE9BQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUvRCxTQUFPLEdBQUcsQ0FBQztDQUNaOzs7Ozs7QUFNRCxTQUFTLGlCQUFpQixDQUFDLEtBQUssRUFBRTtBQUNoQyxTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztHQUNsQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUMvQixTQUFPLFlBQVc7QUFDaEIsV0FBTyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztHQUNwQyxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUNyQixTQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLE1BQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxjQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQUcsQ0FBQztHQUN4RCxDQUFDO0NBQ0g7Ozs7OztBQU1ELFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRTtBQUN2QixTQUFPLFlBQVc7QUFDaEIsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDdEMsTUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUEsR0FBSSxDQUFDLENBQUM7QUFDdEQsTUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUEsR0FBSSxDQUFDLENBQUM7R0FDeEQsQ0FBQztDQUNIOzs7OztpQkN6RWM7Ozs7O0FBS2IsV0FBTyxpQkFBQyxJQUFJLEVBQUU7QUFDWjs7Ozs7Ozs7QUFRRixZQUFRLGtCQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDdkI7QUFDQSw0Q0FBK0IsQ0FBQyxFQUFJO0FBQ2xDO0FBQ0U7O0FBRUY7O0FBRUY7Ozs7Ozs7QUFPRixTQUFLLGVBQUMsSUFBSSxFQUFFO0FBQ1Y7QUFDQSx3Q0FBMkIsQ0FBQzthQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ2xELFdBQU8sR0FBRyxDQUFDO0dBQ1o7Ozs7O0FBS0QsU0FBTyxFQUFBLG1CQUFHOztBQUVSLFFBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQixRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM1QixXQUFPLFlBQVc7QUFDaEIsVUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2QsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDaEQsYUFBTyxDQUFDLEVBQUUsRUFBRTtBQUNWLGNBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztPQUNyQztBQUNELGFBQU8sTUFBTSxDQUFDO0tBQ2YsQ0FBQztHQUNIOzs7OztBQUtELFNBQU8sRUFBQSxpQkFBQyxLQUFLLEVBQUU7QUFDYixXQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDdkM7Ozs7O0FBS0QsY0FBWSxFQUFBLHNCQUFDLEVBQUUsRUFBRTtBQUNmLFdBQU8sVUFBUyxJQUFJLEVBQUU7QUFDcEIsUUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDdkIsQ0FBQztHQUNIOzs7Ozs7QUFNRCxlQUFhLEVBQUEsdUJBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUMxQixXQUFPLFVBQVMsS0FBSyxFQUFFO0FBQ3JCLFFBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQzVCLENBQUM7R0FDSDtDQUNGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXtcInVzZSBzdHJpY3RcIjtpZihnbG9iYWwuXzZ0bzVQb2x5ZmlsbCl7dGhyb3cgbmV3IEVycm9yKFwib25seSBvbmUgaW5zdGFuY2Ugb2YgNnRvNS9wb2x5ZmlsbCBpcyBhbGxvd2VkXCIpfWdsb2JhbC5fNnRvNVBvbHlmaWxsPXRydWU7cmVxdWlyZShcImNvcmUtanMvc2hpbVwiKTtyZXF1aXJlKFwicmVnZW5lcmF0b3ItNnRvNS9ydW50aW1lXCIpfSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiP2dsb2JhbDp0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIj93aW5kb3c6e30pfSx7XCJjb3JlLWpzL3NoaW1cIjoyLFwicmVnZW5lcmF0b3ItNnRvNS9ydW50aW1lXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyFmdW5jdGlvbihnbG9iYWwsZnJhbWV3b3JrLHVuZGVmaW5lZCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIE9CSkVDVD1cIk9iamVjdFwiLEZVTkNUSU9OPVwiRnVuY3Rpb25cIixBUlJBWT1cIkFycmF5XCIsU1RSSU5HPVwiU3RyaW5nXCIsTlVNQkVSPVwiTnVtYmVyXCIsUkVHRVhQPVwiUmVnRXhwXCIsREFURT1cIkRhdGVcIixNQVA9XCJNYXBcIixTRVQ9XCJTZXRcIixXRUFLTUFQPVwiV2Vha01hcFwiLFdFQUtTRVQ9XCJXZWFrU2V0XCIsU1lNQk9MPVwiU3ltYm9sXCIsUFJPTUlTRT1cIlByb21pc2VcIixNQVRIPVwiTWF0aFwiLEFSR1VNRU5UUz1cIkFyZ3VtZW50c1wiLFBST1RPVFlQRT1cInByb3RvdHlwZVwiLENPTlNUUlVDVE9SPVwiY29uc3RydWN0b3JcIixUT19TVFJJTkc9XCJ0b1N0cmluZ1wiLFRPX1NUUklOR19UQUc9VE9fU1RSSU5HK1wiVGFnXCIsVE9fTE9DQUxFPVwidG9Mb2NhbGVTdHJpbmdcIixIQVNfT1dOPVwiaGFzT3duUHJvcGVydHlcIixGT1JfRUFDSD1cImZvckVhY2hcIixJVEVSQVRPUj1cIml0ZXJhdG9yXCIsRkZfSVRFUkFUT1I9XCJAQFwiK0lURVJBVE9SLFBST0NFU1M9XCJwcm9jZXNzXCIsQ1JFQVRFX0VMRU1FTlQ9XCJjcmVhdGVFbGVtZW50XCIsRnVuY3Rpb249Z2xvYmFsW0ZVTkNUSU9OXSxPYmplY3Q9Z2xvYmFsW09CSkVDVF0sQXJyYXk9Z2xvYmFsW0FSUkFZXSxTdHJpbmc9Z2xvYmFsW1NUUklOR10sTnVtYmVyPWdsb2JhbFtOVU1CRVJdLFJlZ0V4cD1nbG9iYWxbUkVHRVhQXSxEYXRlPWdsb2JhbFtEQVRFXSxNYXA9Z2xvYmFsW01BUF0sU2V0PWdsb2JhbFtTRVRdLFdlYWtNYXA9Z2xvYmFsW1dFQUtNQVBdLFdlYWtTZXQ9Z2xvYmFsW1dFQUtTRVRdLFN5bWJvbD1nbG9iYWxbU1lNQk9MXSxNYXRoPWdsb2JhbFtNQVRIXSxUeXBlRXJyb3I9Z2xvYmFsLlR5cGVFcnJvcixzZXRUaW1lb3V0PWdsb2JhbC5zZXRUaW1lb3V0LHNldEltbWVkaWF0ZT1nbG9iYWwuc2V0SW1tZWRpYXRlLGNsZWFySW1tZWRpYXRlPWdsb2JhbC5jbGVhckltbWVkaWF0ZSxwcm9jZXNzPWdsb2JhbFtQUk9DRVNTXSxuZXh0VGljaz1wcm9jZXNzJiZwcm9jZXNzLm5leHRUaWNrLGRvY3VtZW50PWdsb2JhbC5kb2N1bWVudCxodG1sPWRvY3VtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbmF2aWdhdG9yPWdsb2JhbC5uYXZpZ2F0b3IsZGVmaW5lPWdsb2JhbC5kZWZpbmUsQXJyYXlQcm90bz1BcnJheVtQUk9UT1RZUEVdLE9iamVjdFByb3RvPU9iamVjdFtQUk9UT1RZUEVdLEZ1bmN0aW9uUHJvdG89RnVuY3Rpb25bUFJPVE9UWVBFXSxJbmZpbml0eT0xLzAsRE9UPVwiLlwiO2Z1bmN0aW9uIGlzT2JqZWN0KGl0KXtyZXR1cm4gaXQhPW51bGwmJih0eXBlb2YgaXQ9PVwib2JqZWN0XCJ8fHR5cGVvZiBpdD09XCJmdW5jdGlvblwiKX1mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtyZXR1cm4gdHlwZW9mIGl0PT1cImZ1bmN0aW9uXCJ9dmFyIGlzTmF0aXZlPWN0eCgvLi8udGVzdCwvXFxbbmF0aXZlIGNvZGVcXF1cXHMqXFx9XFxzKiQvLDEpO3ZhciBidWlsZEluPXtVbmRlZmluZWQ6MSxOdWxsOjEsQXJyYXk6MSxTdHJpbmc6MSxBcmd1bWVudHM6MSxGdW5jdGlvbjoxLEVycm9yOjEsQm9vbGVhbjoxLE51bWJlcjoxLERhdGU6MSxSZWdFeHA6MX0sdG9TdHJpbmc9T2JqZWN0UHJvdG9bVE9fU1RSSU5HXTtmdW5jdGlvbiBzZXRUb1N0cmluZ1RhZyhpdCx0YWcsc3RhdCl7aWYoaXQmJiFoYXMoaXQ9c3RhdD9pdDppdFtQUk9UT1RZUEVdLFNZTUJPTF9UQUcpKWhpZGRlbihpdCxTWU1CT0xfVEFHLHRhZyl9ZnVuY3Rpb24gY29mKGl0KXtyZXR1cm4gaXQ9PXVuZGVmaW5lZD9pdD09PXVuZGVmaW5lZD9cIlVuZGVmaW5lZFwiOlwiTnVsbFwiOnRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsLTEpfWZ1bmN0aW9uIGNsYXNzb2YoaXQpe3ZhciBrbGFzcz1jb2YoaXQpLHRhZztyZXR1cm4ga2xhc3M9PU9CSkVDVCYmKHRhZz1pdFtTWU1CT0xfVEFHXSk/aGFzKGJ1aWxkSW4sdGFnKT9cIn5cIit0YWc6dGFnOmtsYXNzfXZhciBjYWxsPUZ1bmN0aW9uUHJvdG8uY2FsbCxhcHBseT1GdW5jdGlvblByb3RvLmFwcGx5LFJFRkVSRU5DRV9HRVQ7ZnVuY3Rpb24gcGFydCgpe3ZhciBmbj1hc3NlcnRGdW5jdGlvbih0aGlzKSxsZW5ndGg9YXJndW1lbnRzLmxlbmd0aCxhcmdzPUFycmF5KGxlbmd0aCksaT0wLF89cGF0aC5fLGhvbGRlcj1mYWxzZTt3aGlsZShsZW5ndGg+aSlpZigoYXJnc1tpXT1hcmd1bWVudHNbaSsrXSk9PT1fKWhvbGRlcj10cnVlO3JldHVybiBmdW5jdGlvbigpe3ZhciB0aGF0PXRoaXMsX2xlbmd0aD1hcmd1bWVudHMubGVuZ3RoLGk9MCxqPTAsX2FyZ3M7aWYoIWhvbGRlciYmIV9sZW5ndGgpcmV0dXJuIGludm9rZShmbixhcmdzLHRoYXQpO19hcmdzPWFyZ3Muc2xpY2UoKTtpZihob2xkZXIpZm9yKDtsZW5ndGg+aTtpKyspaWYoX2FyZ3NbaV09PT1fKV9hcmdzW2ldPWFyZ3VtZW50c1tqKytdO3doaWxlKF9sZW5ndGg+ailfYXJncy5wdXNoKGFyZ3VtZW50c1tqKytdKTtyZXR1cm4gaW52b2tlKGZuLF9hcmdzLHRoYXQpfX1mdW5jdGlvbiBjdHgoZm4sdGhhdCxsZW5ndGgpe2Fzc2VydEZ1bmN0aW9uKGZuKTtpZih+bGVuZ3RoJiZ0aGF0PT09dW5kZWZpbmVkKXJldHVybiBmbjtzd2l0Y2gobGVuZ3RoKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKGEpe3JldHVybiBmbi5jYWxsKHRoYXQsYSl9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24oYSxiKXtyZXR1cm4gZm4uY2FsbCh0aGF0LGEsYil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24oYSxiLGMpe3JldHVybiBmbi5jYWxsKHRoYXQsYSxiLGMpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZm4uYXBwbHkodGhhdCxhcmd1bWVudHMpfX1mdW5jdGlvbiBpbnZva2UoZm4sYXJncyx0aGF0KXt2YXIgdW49dGhhdD09PXVuZGVmaW5lZDtzd2l0Y2goYXJncy5sZW5ndGh8MCl7Y2FzZSAwOnJldHVybiB1bj9mbigpOmZuLmNhbGwodGhhdCk7Y2FzZSAxOnJldHVybiB1bj9mbihhcmdzWzBdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSk7Y2FzZSAyOnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0pO2Nhc2UgMzpyZXR1cm4gdW4/Zm4oYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSk7Y2FzZSA0OnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdKTpmbi5jYWxsKHRoYXQsYXJnc1swXSxhcmdzWzFdLGFyZ3NbMl0sYXJnc1szXSk7Y2FzZSA1OnJldHVybiB1bj9mbihhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdLGFyZ3NbNF0pOmZuLmNhbGwodGhhdCxhcmdzWzBdLGFyZ3NbMV0sYXJnc1syXSxhcmdzWzNdLGFyZ3NbNF0pfXJldHVybiBmbi5hcHBseSh0aGF0LGFyZ3MpfWZ1bmN0aW9uIGNvbnN0cnVjdCh0YXJnZXQsYXJndW1lbnRzTGlzdCl7dmFyIHByb3RvPWFzc2VydEZ1bmN0aW9uKGFyZ3VtZW50cy5sZW5ndGg8Mz90YXJnZXQ6YXJndW1lbnRzWzJdKVtQUk9UT1RZUEVdLGluc3RhbmNlPWNyZWF0ZShpc09iamVjdChwcm90byk/cHJvdG86T2JqZWN0UHJvdG8pLHJlc3VsdD1hcHBseS5jYWxsKHRhcmdldCxpbnN0YW5jZSxhcmd1bWVudHNMaXN0KTtyZXR1cm4gaXNPYmplY3QocmVzdWx0KT9yZXN1bHQ6aW5zdGFuY2V9dmFyIGNyZWF0ZT1PYmplY3QuY3JlYXRlLGdldFByb3RvdHlwZU9mPU9iamVjdC5nZXRQcm90b3R5cGVPZixzZXRQcm90b3R5cGVPZj1PYmplY3Quc2V0UHJvdG90eXBlT2YsZGVmaW5lUHJvcGVydHk9T2JqZWN0LmRlZmluZVByb3BlcnR5LGRlZmluZVByb3BlcnRpZXM9T2JqZWN0LmRlZmluZVByb3BlcnRpZXMsZ2V0T3duRGVzY3JpcHRvcj1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLGdldEtleXM9T2JqZWN0LmtleXMsZ2V0TmFtZXM9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsZ2V0U3ltYm9scz1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLGlzRnJvemVuPU9iamVjdC5pc0Zyb3plbixoYXM9Y3R4KGNhbGwsT2JqZWN0UHJvdG9bSEFTX09XTl0sMiksRVM1T2JqZWN0PU9iamVjdCxEaWN0O2Z1bmN0aW9uIHRvT2JqZWN0KGl0KXtyZXR1cm4gRVM1T2JqZWN0KGFzc2VydERlZmluZWQoaXQpKX1mdW5jdGlvbiByZXR1cm5JdChpdCl7cmV0dXJuIGl0fWZ1bmN0aW9uIHJldHVyblRoaXMoKXtyZXR1cm4gdGhpc31mdW5jdGlvbiBnZXQob2JqZWN0LGtleSl7aWYoaGFzKG9iamVjdCxrZXkpKXJldHVybiBvYmplY3Rba2V5XX1mdW5jdGlvbiBvd25LZXlzKGl0KXthc3NlcnRPYmplY3QoaXQpO3JldHVybiBnZXRTeW1ib2xzP2dldE5hbWVzKGl0KS5jb25jYXQoZ2V0U3ltYm9scyhpdCkpOmdldE5hbWVzKGl0KX12YXIgYXNzaWduPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHRhcmdldCxzb3VyY2Upe3ZhciBUPU9iamVjdChhc3NlcnREZWZpbmVkKHRhcmdldCkpLGw9YXJndW1lbnRzLmxlbmd0aCxpPTE7d2hpbGUobD5pKXt2YXIgUz1FUzVPYmplY3QoYXJndW1lbnRzW2krK10pLGtleXM9Z2V0S2V5cyhTKSxsZW5ndGg9a2V5cy5sZW5ndGgsaj0wLGtleTt3aGlsZShsZW5ndGg+ailUW2tleT1rZXlzW2orK11dPVNba2V5XX1yZXR1cm4gVH07ZnVuY3Rpb24ga2V5T2Yob2JqZWN0LGVsKXt2YXIgTz10b09iamVjdChvYmplY3QpLGtleXM9Z2V0S2V5cyhPKSxsZW5ndGg9a2V5cy5sZW5ndGgsaW5kZXg9MCxrZXk7d2hpbGUobGVuZ3RoPmluZGV4KWlmKE9ba2V5PWtleXNbaW5kZXgrK11dPT09ZWwpcmV0dXJuIGtleX1mdW5jdGlvbiBhcnJheShpdCl7cmV0dXJuIFN0cmluZyhpdCkuc3BsaXQoXCIsXCIpfXZhciBwdXNoPUFycmF5UHJvdG8ucHVzaCx1bnNoaWZ0PUFycmF5UHJvdG8udW5zaGlmdCxzbGljZT1BcnJheVByb3RvLnNsaWNlLHNwbGljZT1BcnJheVByb3RvLnNwbGljZSxpbmRleE9mPUFycmF5UHJvdG8uaW5kZXhPZixmb3JFYWNoPUFycmF5UHJvdG9bRk9SX0VBQ0hdO2Z1bmN0aW9uIGNyZWF0ZUFycmF5TWV0aG9kKHR5cGUpe3ZhciBpc01hcD10eXBlPT0xLGlzRmlsdGVyPXR5cGU9PTIsaXNTb21lPXR5cGU9PTMsaXNFdmVyeT10eXBlPT00LGlzRmluZEluZGV4PXR5cGU9PTYsbm9ob2xlcz10eXBlPT01fHxpc0ZpbmRJbmRleDtyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tmbil7dmFyIE89T2JqZWN0KGFzc2VydERlZmluZWQodGhpcykpLHRoYXQ9YXJndW1lbnRzWzFdLHNlbGY9RVM1T2JqZWN0KE8pLGY9Y3R4KGNhbGxiYWNrZm4sdGhhdCwzKSxsZW5ndGg9dG9MZW5ndGgoc2VsZi5sZW5ndGgpLGluZGV4PTAscmVzdWx0PWlzTWFwP0FycmF5KGxlbmd0aCk6aXNGaWx0ZXI/W106dW5kZWZpbmVkLHZhbCxyZXM7Zm9yKDtsZW5ndGg+aW5kZXg7aW5kZXgrKylpZihub2hvbGVzfHxpbmRleCBpbiBzZWxmKXt2YWw9c2VsZltpbmRleF07cmVzPWYodmFsLGluZGV4LE8pO2lmKHR5cGUpe2lmKGlzTWFwKXJlc3VsdFtpbmRleF09cmVzO2Vsc2UgaWYocmVzKXN3aXRjaCh0eXBlKXtjYXNlIDM6cmV0dXJuIHRydWU7Y2FzZSA1OnJldHVybiB2YWw7Y2FzZSA2OnJldHVybiBpbmRleDtjYXNlIDI6cmVzdWx0LnB1c2godmFsKX1lbHNlIGlmKGlzRXZlcnkpcmV0dXJuIGZhbHNlfX1yZXR1cm4gaXNGaW5kSW5kZXg/LTE6aXNTb21lfHxpc0V2ZXJ5P2lzRXZlcnk6cmVzdWx0fX1mdW5jdGlvbiBjcmVhdGVBcnJheUNvbnRhaW5zKGlzQ29udGFpbnMpe3JldHVybiBmdW5jdGlvbihlbCl7dmFyIE89dG9PYmplY3QodGhpcyksbGVuZ3RoPXRvTGVuZ3RoKE8ubGVuZ3RoKSxpbmRleD10b0luZGV4KGFyZ3VtZW50c1sxXSxsZW5ndGgpO2lmKGlzQ29udGFpbnMmJmVsIT1lbCl7Zm9yKDtsZW5ndGg+aW5kZXg7aW5kZXgrKylpZihzYW1lTmFOKE9baW5kZXhdKSlyZXR1cm4gaXNDb250YWluc3x8aW5kZXh9ZWxzZSBmb3IoO2xlbmd0aD5pbmRleDtpbmRleCsrKWlmKGlzQ29udGFpbnN8fGluZGV4IGluIE8pe2lmKE9baW5kZXhdPT09ZWwpcmV0dXJuIGlzQ29udGFpbnN8fGluZGV4fXJldHVybiFpc0NvbnRhaW5zJiYtMX19ZnVuY3Rpb24gZ2VuZXJpYyhBLEIpe3JldHVybiB0eXBlb2YgQT09XCJmdW5jdGlvblwiP0E6Qn12YXIgTUFYX1NBRkVfSU5URUdFUj05MDA3MTk5MjU0NzQwOTkxLGNlaWw9TWF0aC5jZWlsLGZsb29yPU1hdGguZmxvb3IsbWF4PU1hdGgubWF4LG1pbj1NYXRoLm1pbixyYW5kb209TWF0aC5yYW5kb20sdHJ1bmM9TWF0aC50cnVuY3x8ZnVuY3Rpb24oaXQpe3JldHVybihpdD4wP2Zsb29yOmNlaWwpKGl0KX07ZnVuY3Rpb24gc2FtZU5hTihudW1iZXIpe3JldHVybiBudW1iZXIhPW51bWJlcn1mdW5jdGlvbiB0b0ludGVnZXIoaXQpe3JldHVybiBpc05hTihpdCk/MDp0cnVuYyhpdCl9ZnVuY3Rpb24gdG9MZW5ndGgoaXQpe3JldHVybiBpdD4wP21pbih0b0ludGVnZXIoaXQpLE1BWF9TQUZFX0lOVEVHRVIpOjB9ZnVuY3Rpb24gdG9JbmRleChpbmRleCxsZW5ndGgpe3ZhciBpbmRleD10b0ludGVnZXIoaW5kZXgpO3JldHVybiBpbmRleDwwP21heChpbmRleCtsZW5ndGgsMCk6bWluKGluZGV4LGxlbmd0aCl9ZnVuY3Rpb24gY3JlYXRlUmVwbGFjZXIocmVnRXhwLHJlcGxhY2UsaXNTdGF0aWMpe3ZhciByZXBsYWNlcj1pc09iamVjdChyZXBsYWNlKT9mdW5jdGlvbihwYXJ0KXtyZXR1cm4gcmVwbGFjZVtwYXJ0XX06cmVwbGFjZTtyZXR1cm4gZnVuY3Rpb24oaXQpe3JldHVybiBTdHJpbmcoaXNTdGF0aWM/aXQ6dGhpcykucmVwbGFjZShyZWdFeHAscmVwbGFjZXIpfX1mdW5jdGlvbiBjcmVhdGVQb2ludEF0KHRvU3RyaW5nKXtyZXR1cm4gZnVuY3Rpb24ocG9zKXt2YXIgcz1TdHJpbmcoYXNzZXJ0RGVmaW5lZCh0aGlzKSksaT10b0ludGVnZXIocG9zKSxsPXMubGVuZ3RoLGEsYjtpZihpPDB8fGk+PWwpcmV0dXJuIHRvU3RyaW5nP1wiXCI6dW5kZWZpbmVkO2E9cy5jaGFyQ29kZUF0KGkpO3JldHVybiBhPDU1Mjk2fHxhPjU2MzE5fHxpKzE9PT1sfHwoYj1zLmNoYXJDb2RlQXQoaSsxKSk8NTYzMjB8fGI+NTczNDM/dG9TdHJpbmc/cy5jaGFyQXQoaSk6YTp0b1N0cmluZz9zLnNsaWNlKGksaSsyKTooYS01NTI5Njw8MTApKyhiLTU2MzIwKSs2NTUzNn19dmFyIFJFRFVDRV9FUlJPUj1cIlJlZHVjZSBvZiBlbXB0eSBvYmplY3Qgd2l0aCBubyBpbml0aWFsIHZhbHVlXCI7ZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbixtc2cxLG1zZzIpe2lmKCFjb25kaXRpb24pdGhyb3cgVHlwZUVycm9yKG1zZzI/bXNnMSttc2cyOm1zZzEpfWZ1bmN0aW9uIGFzc2VydERlZmluZWQoaXQpe2lmKGl0PT11bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiRnVuY3Rpb24gY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRGdW5jdGlvbihpdCl7YXNzZXJ0KGlzRnVuY3Rpb24oaXQpLGl0LFwiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gaXR9ZnVuY3Rpb24gYXNzZXJ0T2JqZWN0KGl0KXthc3NlcnQoaXNPYmplY3QoaXQpLGl0LFwiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiBpdH1mdW5jdGlvbiBhc3NlcnRJbnN0YW5jZShpdCxDb25zdHJ1Y3RvcixuYW1lKXthc3NlcnQoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcixuYW1lLFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKX1mdW5jdGlvbiBkZXNjcmlwdG9yKGJpdG1hcCx2YWx1ZSl7cmV0dXJue2VudW1lcmFibGU6IShiaXRtYXAmMSksY29uZmlndXJhYmxlOiEoYml0bWFwJjIpLHdyaXRhYmxlOiEoYml0bWFwJjQpLHZhbHVlOnZhbHVlfX1mdW5jdGlvbiBzaW1wbGVTZXQob2JqZWN0LGtleSx2YWx1ZSl7b2JqZWN0W2tleV09dmFsdWU7cmV0dXJuIG9iamVjdH1mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7cmV0dXJuIERFU0M/ZnVuY3Rpb24ob2JqZWN0LGtleSx2YWx1ZSl7cmV0dXJuIGRlZmluZVByb3BlcnR5KG9iamVjdCxrZXksZGVzY3JpcHRvcihiaXRtYXAsdmFsdWUpKX06c2ltcGxlU2V0fWZ1bmN0aW9uIHVpZChrZXkpe3JldHVybiBTWU1CT0wrXCIoXCIra2V5K1wiKV9cIisoKytzaWQrcmFuZG9tKCkpW1RPX1NUUklOR10oMzYpfWZ1bmN0aW9uIGdldFdlbGxLbm93blN5bWJvbChuYW1lLHNldHRlcil7cmV0dXJuIFN5bWJvbCYmU3ltYm9sW25hbWVdfHwoc2V0dGVyP1N5bWJvbDpzYWZlU3ltYm9sKShTWU1CT0wrRE9UK25hbWUpfXZhciBERVNDPSEhZnVuY3Rpb24oKXt0cnl7cmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LERPVCxPYmplY3RQcm90byl9Y2F0Y2goZSl7fX0oKSxzaWQ9MCxoaWRkZW49Y3JlYXRlRGVmaW5lcigxKSxzZXQ9U3ltYm9sP3NpbXBsZVNldDpoaWRkZW4sc2FmZVN5bWJvbD1TeW1ib2x8fHVpZDtmdW5jdGlvbiBhc3NpZ25IaWRkZW4odGFyZ2V0LHNyYyl7Zm9yKHZhciBrZXkgaW4gc3JjKWhpZGRlbih0YXJnZXQsa2V5LHNyY1trZXldKTtyZXR1cm4gdGFyZ2V0fXZhciBTWU1CT0xfVU5TQ09QQUJMRVM9Z2V0V2VsbEtub3duU3ltYm9sKFwidW5zY29wYWJsZXNcIiksQXJyYXlVbnNjb3BhYmxlcz1BcnJheVByb3RvW1NZTUJPTF9VTlNDT1BBQkxFU118fHt9LFNZTUJPTF9TUEVDSUVTPWdldFdlbGxLbm93blN5bWJvbChcInNwZWNpZXNcIik7ZnVuY3Rpb24gc2V0U3BlY2llcyhDKXtpZihmcmFtZXdvcmt8fCFpc05hdGl2ZShDKSlkZWZpbmVQcm9wZXJ0eShDLFNZTUJPTF9TUEVDSUVTLHtjb25maWd1cmFibGU6dHJ1ZSxnZXQ6cmV0dXJuVGhpc30pfXZhciBTWU1CT0xfSVRFUkFUT1I9Z2V0V2VsbEtub3duU3ltYm9sKElURVJBVE9SKSxTWU1CT0xfVEFHPWdldFdlbGxLbm93blN5bWJvbChUT19TVFJJTkdfVEFHKSxTVVBQT1JUX0ZGX0lURVI9RkZfSVRFUkFUT1IgaW4gQXJyYXlQcm90byxJVEVSPXNhZmVTeW1ib2woXCJpdGVyXCIpLEtFWT0xLFZBTFVFPTIsSXRlcmF0b3JzPXt9LEl0ZXJhdG9yUHJvdG90eXBlPXt9LE5BVElWRV9JVEVSQVRPUlM9U1lNQk9MX0lURVJBVE9SIGluIEFycmF5UHJvdG8sQlVHR1lfSVRFUkFUT1JTPVwia2V5c1wiaW4gQXJyYXlQcm90byYmIShcIm5leHRcImluW10ua2V5cygpKTtzZXRJdGVyYXRvcihJdGVyYXRvclByb3RvdHlwZSxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRJdGVyYXRvcihPLHZhbHVlKXtoaWRkZW4oTyxTWU1CT0xfSVRFUkFUT1IsdmFsdWUpO1NVUFBPUlRfRkZfSVRFUiYmaGlkZGVuKE8sRkZfSVRFUkFUT1IsdmFsdWUpfWZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKENvbnN0cnVjdG9yLE5BTUUsbmV4dCxwcm90byl7Q29uc3RydWN0b3JbUFJPVE9UWVBFXT1jcmVhdGUocHJvdG98fEl0ZXJhdG9yUHJvdG90eXBlLHtuZXh0OmRlc2NyaXB0b3IoMSxuZXh0KX0pO3NldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLE5BTUUrXCIgSXRlcmF0b3JcIil9ZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3IoQ29uc3RydWN0b3IsTkFNRSx2YWx1ZSxERUZBVUxUKXt2YXIgcHJvdG89Q29uc3RydWN0b3JbUFJPVE9UWVBFXSxpdGVyPWdldChwcm90byxTWU1CT0xfSVRFUkFUT1IpfHxnZXQocHJvdG8sRkZfSVRFUkFUT1IpfHxERUZBVUxUJiZnZXQocHJvdG8sREVGQVVMVCl8fHZhbHVlO2lmKGZyYW1ld29yayl7c2V0SXRlcmF0b3IocHJvdG8saXRlcik7aWYoaXRlciE9PXZhbHVlKXt2YXIgaXRlclByb3RvPWdldFByb3RvdHlwZU9mKGl0ZXIuY2FsbChuZXcgQ29uc3RydWN0b3IpKTtzZXRUb1N0cmluZ1RhZyhpdGVyUHJvdG8sTkFNRStcIiBJdGVyYXRvclwiLHRydWUpO2hhcyhwcm90byxGRl9JVEVSQVRPUikmJnNldEl0ZXJhdG9yKGl0ZXJQcm90byxyZXR1cm5UaGlzKX19SXRlcmF0b3JzW05BTUVdPWl0ZXI7SXRlcmF0b3JzW05BTUUrXCIgSXRlcmF0b3JcIl09cmV0dXJuVGhpcztyZXR1cm4gaXRlcn1mdW5jdGlvbiBkZWZpbmVTdGRJdGVyYXRvcnMoQmFzZSxOQU1FLENvbnN0cnVjdG9yLG5leHQsREVGQVVMVCxJU19TRVQpe2Z1bmN0aW9uIGNyZWF0ZUl0ZXIoa2luZCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLGtpbmQpfX1jcmVhdGVJdGVyYXRvcihDb25zdHJ1Y3RvcixOQU1FLG5leHQpO3ZhciBlbnRyaWVzPWNyZWF0ZUl0ZXIoS0VZK1ZBTFVFKSx2YWx1ZXM9Y3JlYXRlSXRlcihWQUxVRSk7aWYoREVGQVVMVD09VkFMVUUpdmFsdWVzPWRlZmluZUl0ZXJhdG9yKEJhc2UsTkFNRSx2YWx1ZXMsXCJ2YWx1ZXNcIik7ZWxzZSBlbnRyaWVzPWRlZmluZUl0ZXJhdG9yKEJhc2UsTkFNRSxlbnRyaWVzLFwiZW50cmllc1wiKTtpZihERUZBVUxUKXskZGVmaW5lKFBST1RPK0ZPUkNFRCpCVUdHWV9JVEVSQVRPUlMsTkFNRSx7ZW50cmllczplbnRyaWVzLGtleXM6SVNfU0VUP3ZhbHVlczpjcmVhdGVJdGVyKEtFWSksdmFsdWVzOnZhbHVlc30pfX1mdW5jdGlvbiBpdGVyUmVzdWx0KGRvbmUsdmFsdWUpe3JldHVybnt2YWx1ZTp2YWx1ZSxkb25lOiEhZG9uZX19ZnVuY3Rpb24gaXNJdGVyYWJsZShpdCl7dmFyIE89T2JqZWN0KGl0KSxTeW1ib2w9Z2xvYmFsW1NZTUJPTF0saGFzRXh0PShTeW1ib2wmJlN5bWJvbFtJVEVSQVRPUl18fEZGX0lURVJBVE9SKWluIE87cmV0dXJuIGhhc0V4dHx8U1lNQk9MX0lURVJBVE9SIGluIE98fGhhcyhJdGVyYXRvcnMsY2xhc3NvZihPKSl9ZnVuY3Rpb24gZ2V0SXRlcmF0b3IoaXQpe3ZhciBTeW1ib2w9Z2xvYmFsW1NZTUJPTF0sZXh0PWl0W1N5bWJvbCYmU3ltYm9sW0lURVJBVE9SXXx8RkZfSVRFUkFUT1JdLGdldEl0ZXI9ZXh0fHxpdFtTWU1CT0xfSVRFUkFUT1JdfHxJdGVyYXRvcnNbY2xhc3NvZihpdCldO3JldHVybiBhc3NlcnRPYmplY3QoZ2V0SXRlci5jYWxsKGl0KSl9ZnVuY3Rpb24gc3RlcENhbGwoZm4sdmFsdWUsZW50cmllcyl7cmV0dXJuIGVudHJpZXM/aW52b2tlKGZuLHZhbHVlKTpmbih2YWx1ZSl9ZnVuY3Rpb24gZm9yT2YoaXRlcmFibGUsZW50cmllcyxmbix0aGF0KXt2YXIgaXRlcmF0b3I9Z2V0SXRlcmF0b3IoaXRlcmFibGUpLGY9Y3R4KGZuLHRoYXQsZW50cmllcz8yOjEpLHN0ZXA7d2hpbGUoIShzdGVwPWl0ZXJhdG9yLm5leHQoKSkuZG9uZSlpZihzdGVwQ2FsbChmLHN0ZXAudmFsdWUsZW50cmllcyk9PT1mYWxzZSlyZXR1cm59dmFyIE5PREU9Y29mKHByb2Nlc3MpPT1QUk9DRVNTLGNvcmU9e30scGF0aD1mcmFtZXdvcms/Z2xvYmFsOmNvcmUsb2xkPWdsb2JhbC5jb3JlLGV4cG9ydEdsb2JhbCxGT1JDRUQ9MSxHTE9CQUw9MixTVEFUSUM9NCxQUk9UTz04LEJJTkQ9MTYsV1JBUD0zMjtmdW5jdGlvbiAkZGVmaW5lKHR5cGUsbmFtZSxzb3VyY2Upe3ZhciBrZXksb3duLG91dCxleHAsaXNHbG9iYWw9dHlwZSZHTE9CQUwsdGFyZ2V0PWlzR2xvYmFsP2dsb2JhbDp0eXBlJlNUQVRJQz9nbG9iYWxbbmFtZV06KGdsb2JhbFtuYW1lXXx8T2JqZWN0UHJvdG8pW1BST1RPVFlQRV0sZXhwb3J0cz1pc0dsb2JhbD9jb3JlOmNvcmVbbmFtZV18fChjb3JlW25hbWVdPXt9KTtpZihpc0dsb2JhbClzb3VyY2U9bmFtZTtmb3Ioa2V5IGluIHNvdXJjZSl7b3duPSEodHlwZSZGT1JDRUQpJiZ0YXJnZXQmJmtleSBpbiB0YXJnZXQmJighaXNGdW5jdGlvbih0YXJnZXRba2V5XSl8fGlzTmF0aXZlKHRhcmdldFtrZXldKSk7b3V0PShvd24/dGFyZ2V0OnNvdXJjZSlba2V5XTtpZih0eXBlJkJJTkQmJm93billeHA9Y3R4KG91dCxnbG9iYWwpO2Vsc2UgaWYodHlwZSZXUkFQJiYhZnJhbWV3b3JrJiZ0YXJnZXRba2V5XT09b3V0KXtleHA9ZnVuY3Rpb24ocGFyYW0pe3JldHVybiB0aGlzIGluc3RhbmNlb2Ygb3V0P25ldyBvdXQocGFyYW0pOm91dChwYXJhbSl9O2V4cFtQUk9UT1RZUEVdPW91dFtQUk9UT1RZUEVdfWVsc2UgZXhwPXR5cGUmUFJPVE8mJmlzRnVuY3Rpb24ob3V0KT9jdHgoY2FsbCxvdXQpOm91dDtpZihleHBvcnRzW2tleV0hPW91dCloaWRkZW4oZXhwb3J0cyxrZXksZXhwKTtpZihmcmFtZXdvcmsmJnRhcmdldCYmIW93bil7aWYoaXNHbG9iYWwpdGFyZ2V0W2tleV09b3V0O2Vsc2UgZGVsZXRlIHRhcmdldFtrZXldJiZoaWRkZW4odGFyZ2V0LGtleSxvdXQpfX19aWYodHlwZW9mIG1vZHVsZSE9XCJ1bmRlZmluZWRcIiYmbW9kdWxlLmV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9Y29yZTtlbHNlIGlmKGlzRnVuY3Rpb24oZGVmaW5lKSYmZGVmaW5lLmFtZClkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gY29yZX0pO2Vsc2UgZXhwb3J0R2xvYmFsPXRydWU7aWYoZXhwb3J0R2xvYmFsfHxmcmFtZXdvcmspe2NvcmUubm9Db25mbGljdD1mdW5jdGlvbigpe2dsb2JhbC5jb3JlPW9sZDtyZXR1cm4gY29yZX07Z2xvYmFsLmNvcmU9Y29yZX0kZGVmaW5lKEdMT0JBTCtGT1JDRUQse2dsb2JhbDpnbG9iYWx9KTshZnVuY3Rpb24oVEFHLFN5bWJvbFJlZ2lzdHJ5LEFsbFN5bWJvbHMsc2V0dGVyKXtpZighaXNOYXRpdmUoU3ltYm9sKSl7U3ltYm9sPWZ1bmN0aW9uKGRlc2NyaXB0aW9uKXthc3NlcnQoISh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSxTWU1CT0wrXCIgaXMgbm90IGEgXCIrQ09OU1RSVUNUT1IpO3ZhciB0YWc9dWlkKGRlc2NyaXB0aW9uKTtBbGxTeW1ib2xzW3RhZ109dHJ1ZTtERVNDJiZzZXR0ZXImJmRlZmluZVByb3BlcnR5KE9iamVjdFByb3RvLHRhZyx7Y29uZmlndXJhYmxlOnRydWUsc2V0OmZ1bmN0aW9uKHZhbHVlKXtoaWRkZW4odGhpcyx0YWcsdmFsdWUpfX0pO3JldHVybiBzZXQoY3JlYXRlKFN5bWJvbFtQUk9UT1RZUEVdKSxUQUcsdGFnKX07aGlkZGVuKFN5bWJvbFtQUk9UT1RZUEVdLFRPX1NUUklORyxmdW5jdGlvbigpe3JldHVybiB0aGlzW1RBR119KX0kZGVmaW5lKEdMT0JBTCtXUkFQLHtTeW1ib2w6U3ltYm9sfSk7dmFyIHN5bWJvbFN0YXRpY3M9e1wiZm9yXCI6ZnVuY3Rpb24oa2V5KXtyZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LGtleSs9XCJcIik/U3ltYm9sUmVnaXN0cnlba2V5XTpTeW1ib2xSZWdpc3RyeVtrZXldPVN5bWJvbChrZXkpfSxpdGVyYXRvcjpTWU1CT0xfSVRFUkFUT1Isa2V5Rm9yOnBhcnQuY2FsbChrZXlPZixTeW1ib2xSZWdpc3RyeSksc3BlY2llczpTWU1CT0xfU1BFQ0lFUyx0b1N0cmluZ1RhZzpTWU1CT0xfVEFHPWdldFdlbGxLbm93blN5bWJvbChUT19TVFJJTkdfVEFHLHRydWUpLHVuc2NvcGFibGVzOlNZTUJPTF9VTlNDT1BBQkxFUyxwdXJlOnNhZmVTeW1ib2wsc2V0OnNldCx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtzZXR0ZXI9dHJ1ZX0sdXNlU2ltcGxlOmZ1bmN0aW9uKCl7c2V0dGVyPWZhbHNlfX07Zm9yRWFjaC5jYWxsKGFycmF5KFwiaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwbGl0LHRvUHJpbWl0aXZlXCIpLGZ1bmN0aW9uKGl0KXtzeW1ib2xTdGF0aWNzW2l0XT1nZXRXZWxsS25vd25TeW1ib2woaXQpfSk7JGRlZmluZShTVEFUSUMsU1lNQk9MLHN5bWJvbFN0YXRpY3MpO3NldFRvU3RyaW5nVGFnKFN5bWJvbCxTWU1CT0wpOyRkZWZpbmUoU1RBVElDK0ZPUkNFRCohaXNOYXRpdmUoU3ltYm9sKSxPQkpFQ1Qse2dldE93blByb3BlcnR5TmFtZXM6ZnVuY3Rpb24oaXQpe3ZhciBuYW1lcz1nZXROYW1lcyh0b09iamVjdChpdCkpLHJlc3VsdD1bXSxrZXksaT0wO3doaWxlKG5hbWVzLmxlbmd0aD5pKWhhcyhBbGxTeW1ib2xzLGtleT1uYW1lc1tpKytdKXx8cmVzdWx0LnB1c2goa2V5KTtyZXR1cm4gcmVzdWx0fSxnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ZnVuY3Rpb24oaXQpe3ZhciBuYW1lcz1nZXROYW1lcyh0b09iamVjdChpdCkpLHJlc3VsdD1bXSxrZXksaT0wO3doaWxlKG5hbWVzLmxlbmd0aD5pKWhhcyhBbGxTeW1ib2xzLGtleT1uYW1lc1tpKytdKSYmcmVzdWx0LnB1c2goa2V5KTtyZXR1cm4gcmVzdWx0fX0pfShzYWZlU3ltYm9sKFwidGFnXCIpLHt9LHt9LHRydWUpOyFmdW5jdGlvbihSZWdFeHBQcm90byxpc0Zpbml0ZSx0bXAsTkFNRSl7dmFyIFJhbmdlRXJyb3I9Z2xvYmFsLlJhbmdlRXJyb3IsaXNJbnRlZ2VyPU51bWJlci5pc0ludGVnZXJ8fGZ1bmN0aW9uKGl0KXtyZXR1cm4haXNPYmplY3QoaXQpJiZpc0Zpbml0ZShpdCkmJmZsb29yKGl0KT09PWl0fSxzaWduPU1hdGguc2lnbnx8ZnVuY3Rpb24gc2lnbih4KXtyZXR1cm4oeD0reCk9PTB8fHghPXg/eDp4PDA/LTE6MX0sRT1NYXRoLkUscG93PU1hdGgucG93LGFicz1NYXRoLmFicyxleHA9TWF0aC5leHAsbG9nPU1hdGgubG9nLHNxcnQ9TWF0aC5zcXJ0LGZjYz1TdHJpbmcuZnJvbUNoYXJDb2RlLGF0PWNyZWF0ZVBvaW50QXQodHJ1ZSk7dmFyIG9iamVjdFN0YXRpYz17YXNzaWduOmFzc2lnbixpczpmdW5jdGlvbih4LHkpe3JldHVybiB4PT09eT94IT09MHx8MS94PT09MS95OnghPXgmJnkhPXl9fTtcIl9fcHJvdG9fX1wiaW4gT2JqZWN0UHJvdG8mJmZ1bmN0aW9uKGJ1Z2d5LHNldCl7dHJ5e3NldD1jdHgoY2FsbCxnZXRPd25EZXNjcmlwdG9yKE9iamVjdFByb3RvLFwiX19wcm90b19fXCIpLnNldCwyKTtzZXQoe30sQXJyYXlQcm90byl9Y2F0Y2goZSl7YnVnZ3k9dHJ1ZX1vYmplY3RTdGF0aWMuc2V0UHJvdG90eXBlT2Y9c2V0UHJvdG90eXBlT2Y9c2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKE8scHJvdG8pe2Fzc2VydE9iamVjdChPKTthc3NlcnQocHJvdG89PT1udWxsfHxpc09iamVjdChwcm90bykscHJvdG8sXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO2lmKGJ1Z2d5KU8uX19wcm90b19fPXByb3RvO2Vsc2Ugc2V0KE8scHJvdG8pO3JldHVybiBPfX0oKTskZGVmaW5lKFNUQVRJQyxPQkpFQ1Qsb2JqZWN0U3RhdGljKTtmdW5jdGlvbiBhc2luaCh4KXtyZXR1cm4haXNGaW5pdGUoeD0reCl8fHg9PTA/eDp4PDA/LWFzaW5oKC14KTpsb2coeCtzcXJ0KHgqeCsxKSl9ZnVuY3Rpb24gZXhwbTEoeCl7cmV0dXJuKHg9K3gpPT0wP3g6eD4tMWUtNiYmeDwxZS02P3greCp4LzI6ZXhwKHgpLTF9JGRlZmluZShTVEFUSUMsTlVNQkVSLHtFUFNJTE9OOnBvdygyLC01MiksaXNGaW5pdGU6ZnVuY3Rpb24oaXQpe3JldHVybiB0eXBlb2YgaXQ9PVwibnVtYmVyXCImJmlzRmluaXRlKGl0KX0saXNJbnRlZ2VyOmlzSW50ZWdlcixpc05hTjpzYW1lTmFOLGlzU2FmZUludGVnZXI6ZnVuY3Rpb24obnVtYmVyKXtyZXR1cm4gaXNJbnRlZ2VyKG51bWJlcikmJmFicyhudW1iZXIpPD1NQVhfU0FGRV9JTlRFR0VSfSxNQVhfU0FGRV9JTlRFR0VSOk1BWF9TQUZFX0lOVEVHRVIsTUlOX1NBRkVfSU5URUdFUjotTUFYX1NBRkVfSU5URUdFUixwYXJzZUZsb2F0OnBhcnNlRmxvYXQscGFyc2VJbnQ6cGFyc2VJbnR9KTskZGVmaW5lKFNUQVRJQyxNQVRILHthY29zaDpmdW5jdGlvbih4KXtyZXR1cm4oeD0reCk8MT9OYU46aXNGaW5pdGUoeCk/bG9nKHgvRStzcXJ0KHgrMSkqc3FydCh4LTEpL0UpKzE6eH0sYXNpbmg6YXNpbmgsYXRhbmg6ZnVuY3Rpb24oeCl7cmV0dXJuKHg9K3gpPT0wP3g6bG9nKCgxK3gpLygxLXgpKS8yfSxjYnJ0OmZ1bmN0aW9uKHgpe3JldHVybiBzaWduKHg9K3gpKnBvdyhhYnMoeCksMS8zKX0sY2x6MzI6ZnVuY3Rpb24oeCl7cmV0dXJuKHg+Pj49MCk/MzIteFtUT19TVFJJTkddKDIpLmxlbmd0aDozMn0sY29zaDpmdW5jdGlvbih4KXtyZXR1cm4oZXhwKHg9K3gpK2V4cCgteCkpLzJ9LGV4cG0xOmV4cG0xLGZyb3VuZDpmdW5jdGlvbih4KXtyZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbeF0pWzBdfSxoeXBvdDpmdW5jdGlvbih2YWx1ZTEsdmFsdWUyKXt2YXIgc3VtPTAsbGVuMT1hcmd1bWVudHMubGVuZ3RoLGxlbjI9bGVuMSxhcmdzPUFycmF5KGxlbjEpLGxhcmc9LUluZmluaXR5LGFyZzt3aGlsZShsZW4xLS0pe2FyZz1hcmdzW2xlbjFdPSthcmd1bWVudHNbbGVuMV07aWYoYXJnPT1JbmZpbml0eXx8YXJnPT0tSW5maW5pdHkpcmV0dXJuIEluZmluaXR5O2lmKGFyZz5sYXJnKWxhcmc9YXJnfWxhcmc9YXJnfHwxO3doaWxlKGxlbjItLSlzdW0rPXBvdyhhcmdzW2xlbjJdL2xhcmcsMik7cmV0dXJuIGxhcmcqc3FydChzdW0pfSxpbXVsOmZ1bmN0aW9uKHgseSl7dmFyIFVJbnQxNj02NTUzNSx4bj0reCx5bj0reSx4bD1VSW50MTYmeG4seWw9VUludDE2JnluO3JldHVybiAwfHhsKnlsKygoVUludDE2JnhuPj4+MTYpKnlsK3hsKihVSW50MTYmeW4+Pj4xNik8PDE2Pj4+MCl9LGxvZzFwOmZ1bmN0aW9uKHgpe3JldHVybih4PSt4KT4tMWUtOCYmeDwxZS04P3gteCp4LzI6bG9nKDEreCl9LGxvZzEwOmZ1bmN0aW9uKHgpe3JldHVybiBsb2coeCkvTWF0aC5MTjEwfSxsb2cyOmZ1bmN0aW9uKHgpe3JldHVybiBsb2coeCkvTWF0aC5MTjJ9LHNpZ246c2lnbixzaW5oOmZ1bmN0aW9uKHgpe3JldHVybiBhYnMoeD0reCk8MT8oZXhwbTEoeCktZXhwbTEoLXgpKS8yOihleHAoeC0xKS1leHAoLXgtMSkpKihFLzIpfSx0YW5oOmZ1bmN0aW9uKHgpe3ZhciBhPWV4cG0xKHg9K3gpLGI9ZXhwbTEoLXgpO3JldHVybiBhPT1JbmZpbml0eT8xOmI9PUluZmluaXR5Py0xOihhLWIpLyhleHAoeCkrZXhwKC14KSl9LHRydW5jOnRydW5jfSk7c2V0VG9TdHJpbmdUYWcoTWF0aCxNQVRILHRydWUpO2Z1bmN0aW9uIGFzc2VydE5vdFJlZ0V4cChpdCl7aWYoY29mKGl0KT09UkVHRVhQKXRocm93IFR5cGVFcnJvcigpfSRkZWZpbmUoU1RBVElDLFNUUklORyx7ZnJvbUNvZGVQb2ludDpmdW5jdGlvbih4KXt2YXIgcmVzPVtdLGxlbj1hcmd1bWVudHMubGVuZ3RoLGk9MCxjb2RlO3doaWxlKGxlbj5pKXtjb2RlPSthcmd1bWVudHNbaSsrXTtpZih0b0luZGV4KGNvZGUsMTExNDExMSkhPT1jb2RlKXRocm93IFJhbmdlRXJyb3IoY29kZStcIiBpcyBub3QgYSB2YWxpZCBjb2RlIHBvaW50XCIpO3Jlcy5wdXNoKGNvZGU8NjU1MzY/ZmNjKGNvZGUpOmZjYygoKGNvZGUtPTY1NTM2KT4+MTApKzU1Mjk2LGNvZGUlMTAyNCs1NjMyMCkpfXJldHVybiByZXMuam9pbihcIlwiKX0scmF3OmZ1bmN0aW9uKGNhbGxTaXRlKXt2YXIgcmF3PXRvT2JqZWN0KGNhbGxTaXRlLnJhdyksbGVuPXRvTGVuZ3RoKHJhdy5sZW5ndGgpLHNsbj1hcmd1bWVudHMubGVuZ3RoLHJlcz1bXSxpPTA7d2hpbGUobGVuPmkpe3Jlcy5wdXNoKFN0cmluZyhyYXdbaSsrXSkpO2lmKGk8c2xuKXJlcy5wdXNoKFN0cmluZyhhcmd1bWVudHNbaV0pKX1yZXR1cm4gcmVzLmpvaW4oXCJcIil9fSk7JGRlZmluZShQUk9UTyxTVFJJTkcse2NvZGVQb2ludEF0OmNyZWF0ZVBvaW50QXQoZmFsc2UpLGVuZHNXaXRoOmZ1bmN0aW9uKHNlYXJjaFN0cmluZyl7YXNzZXJ0Tm90UmVnRXhwKHNlYXJjaFN0cmluZyk7dmFyIHRoYXQ9U3RyaW5nKGFzc2VydERlZmluZWQodGhpcykpLGVuZFBvc2l0aW9uPWFyZ3VtZW50c1sxXSxsZW49dG9MZW5ndGgodGhhdC5sZW5ndGgpLGVuZD1lbmRQb3NpdGlvbj09PXVuZGVmaW5lZD9sZW46bWluKHRvTGVuZ3RoKGVuZFBvc2l0aW9uKSxsZW4pO3NlYXJjaFN0cmluZys9XCJcIjtyZXR1cm4gdGhhdC5zbGljZShlbmQtc2VhcmNoU3RyaW5nLmxlbmd0aCxlbmQpPT09c2VhcmNoU3RyaW5nfSxpbmNsdWRlczpmdW5jdGlvbihzZWFyY2hTdHJpbmcpe2Fzc2VydE5vdFJlZ0V4cChzZWFyY2hTdHJpbmcpO3JldHVybiEhflN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKS5pbmRleE9mKHNlYXJjaFN0cmluZyxhcmd1bWVudHNbMV0pfSxyZXBlYXQ6ZnVuY3Rpb24oY291bnQpe3ZhciBzdHI9U3RyaW5nKGFzc2VydERlZmluZWQodGhpcykpLHJlcz1cIlwiLG49dG9JbnRlZ2VyKGNvdW50KTtpZigwPm58fG49PUluZmluaXR5KXRocm93IFJhbmdlRXJyb3IoXCJDb3VudCBjYW4ndCBiZSBuZWdhdGl2ZVwiKTtmb3IoO24+MDsobj4+Pj0xKSYmKHN0cis9c3RyKSlpZihuJjEpcmVzKz1zdHI7cmV0dXJuIHJlc30sc3RhcnRzV2l0aDpmdW5jdGlvbihzZWFyY2hTdHJpbmcpe2Fzc2VydE5vdFJlZ0V4cChzZWFyY2hTdHJpbmcpO3ZhciB0aGF0PVN0cmluZyhhc3NlcnREZWZpbmVkKHRoaXMpKSxpbmRleD10b0xlbmd0aChtaW4oYXJndW1lbnRzWzFdLHRoYXQubGVuZ3RoKSk7c2VhcmNoU3RyaW5nKz1cIlwiO3JldHVybiB0aGF0LnNsaWNlKGluZGV4LGluZGV4K3NlYXJjaFN0cmluZy5sZW5ndGgpPT09c2VhcmNoU3RyaW5nfX0pO2RlZmluZVN0ZEl0ZXJhdG9ycyhTdHJpbmcsU1RSSU5HLGZ1bmN0aW9uKGl0ZXJhdGVkKXtzZXQodGhpcyxJVEVSLHtvOlN0cmluZyhpdGVyYXRlZCksaTowfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxPPWl0ZXIubyxpbmRleD1pdGVyLmkscG9pbnQ7aWYoaW5kZXg+PU8ubGVuZ3RoKXJldHVybiBpdGVyUmVzdWx0KDEpO3BvaW50PWF0LmNhbGwoTyxpbmRleCk7aXRlci5pKz1wb2ludC5sZW5ndGg7cmV0dXJuIGl0ZXJSZXN1bHQoMCxwb2ludCl9KTskZGVmaW5lKFNUQVRJQyxBUlJBWSx7ZnJvbTpmdW5jdGlvbihhcnJheUxpa2Upe3ZhciBPPU9iamVjdChhc3NlcnREZWZpbmVkKGFycmF5TGlrZSkpLHJlc3VsdD1uZXcoZ2VuZXJpYyh0aGlzLEFycmF5KSksbWFwZm49YXJndW1lbnRzWzFdLHRoYXQ9YXJndW1lbnRzWzJdLG1hcHBpbmc9bWFwZm4hPT11bmRlZmluZWQsZj1tYXBwaW5nP2N0eChtYXBmbix0aGF0LDIpOnVuZGVmaW5lZCxpbmRleD0wLGxlbmd0aDtpZihpc0l0ZXJhYmxlKE8pKWZvcih2YXIgaXRlcj1nZXRJdGVyYXRvcihPKSxzdGVwOyEoc3RlcD1pdGVyLm5leHQoKSkuZG9uZTtpbmRleCsrKXtyZXN1bHRbaW5kZXhdPW1hcHBpbmc/ZihzdGVwLnZhbHVlLGluZGV4KTpzdGVwLnZhbHVlfWVsc2UgZm9yKGxlbmd0aD10b0xlbmd0aChPLmxlbmd0aCk7bGVuZ3RoPmluZGV4O2luZGV4Kyspe3Jlc3VsdFtpbmRleF09bWFwcGluZz9mKE9baW5kZXhdLGluZGV4KTpPW2luZGV4XX1yZXN1bHQubGVuZ3RoPWluZGV4O3JldHVybiByZXN1bHR9LG9mOmZ1bmN0aW9uKCl7dmFyIGluZGV4PTAsbGVuZ3RoPWFyZ3VtZW50cy5sZW5ndGgscmVzdWx0PW5ldyhnZW5lcmljKHRoaXMsQXJyYXkpKShsZW5ndGgpO3doaWxlKGxlbmd0aD5pbmRleClyZXN1bHRbaW5kZXhdPWFyZ3VtZW50c1tpbmRleCsrXTtyZXN1bHQubGVuZ3RoPWxlbmd0aDtyZXR1cm4gcmVzdWx0fX0pOyRkZWZpbmUoUFJPVE8sQVJSQVkse2NvcHlXaXRoaW46ZnVuY3Rpb24odGFyZ2V0LHN0YXJ0KXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZCh0aGlzKSksbGVuPXRvTGVuZ3RoKE8ubGVuZ3RoKSx0bz10b0luZGV4KHRhcmdldCxsZW4pLGZyb209dG9JbmRleChzdGFydCxsZW4pLGVuZD1hcmd1bWVudHNbMl0sZmluPWVuZD09PXVuZGVmaW5lZD9sZW46dG9JbmRleChlbmQsbGVuKSxjb3VudD1taW4oZmluLWZyb20sbGVuLXRvKSxpbmM9MTtpZihmcm9tPHRvJiZ0bzxmcm9tK2NvdW50KXtpbmM9LTE7ZnJvbT1mcm9tK2NvdW50LTE7dG89dG8rY291bnQtMX13aGlsZShjb3VudC0tPjApe2lmKGZyb20gaW4gTylPW3RvXT1PW2Zyb21dO2Vsc2UgZGVsZXRlIE9bdG9dO3RvKz1pbmM7ZnJvbSs9aW5jfXJldHVybiBPfSxmaWxsOmZ1bmN0aW9uKHZhbHVlKXt2YXIgTz1PYmplY3QoYXNzZXJ0RGVmaW5lZCh0aGlzKSksbGVuZ3RoPXRvTGVuZ3RoKE8ubGVuZ3RoKSxpbmRleD10b0luZGV4KGFyZ3VtZW50c1sxXSxsZW5ndGgpLGVuZD1hcmd1bWVudHNbMl0sZW5kUG9zPWVuZD09PXVuZGVmaW5lZD9sZW5ndGg6dG9JbmRleChlbmQsbGVuZ3RoKTt3aGlsZShlbmRQb3M+aW5kZXgpT1tpbmRleCsrXT12YWx1ZTtyZXR1cm4gT30sZmluZDpjcmVhdGVBcnJheU1ldGhvZCg1KSxmaW5kSW5kZXg6Y3JlYXRlQXJyYXlNZXRob2QoNil9KTtkZWZpbmVTdGRJdGVyYXRvcnMoQXJyYXksQVJSQVksZnVuY3Rpb24oaXRlcmF0ZWQsa2luZCl7c2V0KHRoaXMsSVRFUix7bzp0b09iamVjdChpdGVyYXRlZCksaTowLGs6a2luZH0pfSxmdW5jdGlvbigpe3ZhciBpdGVyPXRoaXNbSVRFUl0sTz1pdGVyLm8sa2luZD1pdGVyLmssaW5kZXg9aXRlci5pKys7aWYoIU98fGluZGV4Pj1PLmxlbmd0aClyZXR1cm4gaXRlci5vPXVuZGVmaW5lZCxpdGVyUmVzdWx0KDEpO2lmKGtpbmQ9PUtFWSlyZXR1cm4gaXRlclJlc3VsdCgwLGluZGV4KTtpZihraW5kPT1WQUxVRSlyZXR1cm4gaXRlclJlc3VsdCgwLE9baW5kZXhdKTtyZXR1cm4gaXRlclJlc3VsdCgwLFtpbmRleCxPW2luZGV4XV0pfSxWQUxVRSk7SXRlcmF0b3JzW0FSR1VNRU5UU109SXRlcmF0b3JzW0FSUkFZXTtzZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTixcIkpTT05cIix0cnVlKTtmdW5jdGlvbiB3cmFwT2JqZWN0TWV0aG9kKGtleSxNT0RFKXt2YXIgZm49T2JqZWN0W2tleV0sZXhwPWNvcmVbT0JKRUNUXVtrZXldLGY9MCxvPXt9O2lmKCFleHB8fGlzTmF0aXZlKGV4cCkpe29ba2V5XT1NT0RFPT0xP2Z1bmN0aW9uKGl0KXtyZXR1cm4gaXNPYmplY3QoaXQpP2ZuKGl0KTppdH06TU9ERT09Mj9mdW5jdGlvbihpdCl7cmV0dXJuIGlzT2JqZWN0KGl0KT9mbihpdCk6dHJ1ZX06TU9ERT09Mz9mdW5jdGlvbihpdCl7cmV0dXJuIGlzT2JqZWN0KGl0KT9mbihpdCk6ZmFsc2V9Ok1PREU9PTQ/ZnVuY3Rpb24oaXQsa2V5KXtyZXR1cm4gZm4odG9PYmplY3QoaXQpLGtleSl9OmZ1bmN0aW9uKGl0KXtyZXR1cm4gZm4odG9PYmplY3QoaXQpKX07dHJ5e2ZuKERPVCl9Y2F0Y2goZSl7Zj0xfSRkZWZpbmUoU1RBVElDK0ZPUkNFRCpmLE9CSkVDVCxvKX19d3JhcE9iamVjdE1ldGhvZChcImZyZWV6ZVwiLDEpO3dyYXBPYmplY3RNZXRob2QoXCJzZWFsXCIsMSk7d3JhcE9iamVjdE1ldGhvZChcInByZXZlbnRFeHRlbnNpb25zXCIsMSk7d3JhcE9iamVjdE1ldGhvZChcImlzRnJvemVuXCIsMik7d3JhcE9iamVjdE1ldGhvZChcImlzU2VhbGVkXCIsMik7d3JhcE9iamVjdE1ldGhvZChcImlzRXh0ZW5zaWJsZVwiLDMpO3dyYXBPYmplY3RNZXRob2QoXCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcIiw0KTt3cmFwT2JqZWN0TWV0aG9kKFwiZ2V0UHJvdG90eXBlT2ZcIik7d3JhcE9iamVjdE1ldGhvZChcImtleXNcIik7d3JhcE9iamVjdE1ldGhvZChcImdldE93blByb3BlcnR5TmFtZXNcIik7aWYoZnJhbWV3b3JrKXt0bXBbU1lNQk9MX1RBR109RE9UO2lmKGNvZih0bXApIT1ET1QpaGlkZGVuKE9iamVjdFByb3RvLFRPX1NUUklORyxmdW5jdGlvbigpe3JldHVyblwiW29iamVjdCBcIitjbGFzc29mKHRoaXMpK1wiXVwifSk7TkFNRSBpbiBGdW5jdGlvblByb3RvfHxkZWZpbmVQcm9wZXJ0eShGdW5jdGlvblByb3RvLE5BTUUse2NvbmZpZ3VyYWJsZTp0cnVlLGdldDpmdW5jdGlvbigpe3ZhciBtYXRjaD1TdHJpbmcodGhpcykubWF0Y2goL15cXHMqZnVuY3Rpb24gKFteIChdKikvKSxuYW1lPW1hdGNoP21hdGNoWzFdOlwiXCI7aGFzKHRoaXMsTkFNRSl8fGRlZmluZVByb3BlcnR5KHRoaXMsTkFNRSxkZXNjcmlwdG9yKDUsbmFtZSkpO3JldHVybiBuYW1lfSxzZXQ6ZnVuY3Rpb24odmFsdWUpe2hhcyh0aGlzLE5BTUUpfHxkZWZpbmVQcm9wZXJ0eSh0aGlzLE5BTUUsZGVzY3JpcHRvcigwLHZhbHVlKSl9fSk7aWYoREVTQyYmIWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBSZWdFeHAoL2EvZyxcImlcIik9PVwiL2EvaVwifWNhdGNoKGUpe319KCkpe3ZhciBfUmVnRXhwPVJlZ0V4cDtSZWdFeHA9ZnVuY3Rpb24gUmVnRXhwKHBhdHRlcm4sZmxhZ3Mpe3JldHVybiBuZXcgX1JlZ0V4cChjb2YocGF0dGVybik9PVJFR0VYUCYmZmxhZ3MhPT11bmRlZmluZWQ/cGF0dGVybi5zb3VyY2U6cGF0dGVybixmbGFncyl9O2ZvckVhY2guY2FsbChnZXROYW1lcyhfUmVnRXhwKSxmdW5jdGlvbihrZXkpe2tleSBpbiBSZWdFeHB8fGRlZmluZVByb3BlcnR5KFJlZ0V4cCxrZXkse2NvbmZpZ3VyYWJsZTp0cnVlLGdldDpmdW5jdGlvbigpe3JldHVybiBfUmVnRXhwW2tleV19LHNldDpmdW5jdGlvbihpdCl7X1JlZ0V4cFtrZXldPWl0fX0pfSk7UmVnRXhwUHJvdG9bQ09OU1RSVUNUT1JdPVJlZ0V4cDtSZWdFeHBbUFJPVE9UWVBFXT1SZWdFeHBQcm90bztoaWRkZW4oZ2xvYmFsLFJFR0VYUCxSZWdFeHApfWlmKC8uL2cuZmxhZ3MhPVwiZ1wiKWRlZmluZVByb3BlcnR5KFJlZ0V4cFByb3RvLFwiZmxhZ3NcIix7Y29uZmlndXJhYmxlOnRydWUsZ2V0OmNyZWF0ZVJlcGxhY2VyKC9eLipcXC8oXFx3KikkLyxcIiQxXCIpfSk7Zm9yRWFjaC5jYWxsKGFycmF5KFwiZmluZCxmaW5kSW5kZXgsZmlsbCxjb3B5V2l0aGluLGVudHJpZXMsa2V5cyx2YWx1ZXNcIiksZnVuY3Rpb24oaXQpe0FycmF5VW5zY29wYWJsZXNbaXRdPXRydWV9KTtTWU1CT0xfVU5TQ09QQUJMRVMgaW4gQXJyYXlQcm90b3x8aGlkZGVuKEFycmF5UHJvdG8sU1lNQk9MX1VOU0NPUEFCTEVTLEFycmF5VW5zY29wYWJsZXMpfXNldFNwZWNpZXMoUmVnRXhwKTtzZXRTcGVjaWVzKEFycmF5KX0oUmVnRXhwW1BST1RPVFlQRV0saXNGaW5pdGUse30sXCJuYW1lXCIpO2lzRnVuY3Rpb24oc2V0SW1tZWRpYXRlKSYmaXNGdW5jdGlvbihjbGVhckltbWVkaWF0ZSl8fGZ1bmN0aW9uKE9OUkVBRFlTVEFURUNIQU5HRSl7dmFyIHBvc3RNZXNzYWdlPWdsb2JhbC5wb3N0TWVzc2FnZSxhZGRFdmVudExpc3RlbmVyPWdsb2JhbC5hZGRFdmVudExpc3RlbmVyLE1lc3NhZ2VDaGFubmVsPWdsb2JhbC5NZXNzYWdlQ2hhbm5lbCxjb3VudGVyPTAscXVldWU9e30sZGVmZXIsY2hhbm5lbCxwb3J0O3NldEltbWVkaWF0ZT1mdW5jdGlvbihmbil7dmFyIGFyZ3M9W10saT0xO3doaWxlKGFyZ3VtZW50cy5sZW5ndGg+aSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO3F1ZXVlWysrY291bnRlcl09ZnVuY3Rpb24oKXtpbnZva2UoaXNGdW5jdGlvbihmbik/Zm46RnVuY3Rpb24oZm4pLGFyZ3MpfTtkZWZlcihjb3VudGVyKTtyZXR1cm4gY291bnRlcn07Y2xlYXJJbW1lZGlhdGU9ZnVuY3Rpb24oaWQpe2RlbGV0ZSBxdWV1ZVtpZF19O2Z1bmN0aW9uIHJ1bihpZCl7aWYoaGFzKHF1ZXVlLGlkKSl7dmFyIGZuPXF1ZXVlW2lkXTtkZWxldGUgcXVldWVbaWRdO2ZuKCl9fWZ1bmN0aW9uIGxpc3RuZXIoZXZlbnQpe3J1bihldmVudC5kYXRhKX1pZihOT0RFKXtkZWZlcj1mdW5jdGlvbihpZCl7bmV4dFRpY2socGFydC5jYWxsKHJ1bixpZCkpfX1lbHNlIGlmKGFkZEV2ZW50TGlzdGVuZXImJmlzRnVuY3Rpb24ocG9zdE1lc3NhZ2UpJiYhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe2RlZmVyPWZ1bmN0aW9uKGlkKXtwb3N0TWVzc2FnZShpZCxcIipcIil9O2FkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsbGlzdG5lcixmYWxzZSl9ZWxzZSBpZihpc0Z1bmN0aW9uKE1lc3NhZ2VDaGFubmVsKSl7Y2hhbm5lbD1uZXcgTWVzc2FnZUNoYW5uZWw7cG9ydD1jaGFubmVsLnBvcnQyO2NoYW5uZWwucG9ydDEub25tZXNzYWdlPWxpc3RuZXI7ZGVmZXI9Y3R4KHBvcnQucG9zdE1lc3NhZ2UscG9ydCwxKX1lbHNlIGlmKGRvY3VtZW50JiZPTlJFQURZU1RBVEVDSEFOR0UgaW4gZG9jdW1lbnRbQ1JFQVRFX0VMRU1FTlRdKFwic2NyaXB0XCIpKXtkZWZlcj1mdW5jdGlvbihpZCl7aHRtbC5hcHBlbmRDaGlsZChkb2N1bWVudFtDUkVBVEVfRUxFTUVOVF0oXCJzY3JpcHRcIikpW09OUkVBRFlTVEFURUNIQU5HRV09ZnVuY3Rpb24oKXtodG1sLnJlbW92ZUNoaWxkKHRoaXMpO3J1bihpZCl9fX1lbHNle2RlZmVyPWZ1bmN0aW9uKGlkKXtzZXRUaW1lb3V0KHBhcnQuY2FsbChydW4saWQpLDApfX19KFwib25yZWFkeXN0YXRlY2hhbmdlXCIpOyRkZWZpbmUoR0xPQkFMK0JJTkQse3NldEltbWVkaWF0ZTpzZXRJbW1lZGlhdGUsY2xlYXJJbW1lZGlhdGU6Y2xlYXJJbW1lZGlhdGV9KTshZnVuY3Rpb24oUHJvbWlzZSx0ZXN0KXtpc0Z1bmN0aW9uKFByb21pc2UpJiZpc0Z1bmN0aW9uKFByb21pc2UucmVzb2x2ZSkmJlByb21pc2UucmVzb2x2ZSh0ZXN0PW5ldyBQcm9taXNlKGZ1bmN0aW9uKCl7fSkpPT10ZXN0fHxmdW5jdGlvbihhc2FwLERFRil7ZnVuY3Rpb24gaXNUaGVuYWJsZShvKXt2YXIgdGhlbjtpZihpc09iamVjdChvKSl0aGVuPW8udGhlbjtyZXR1cm4gaXNGdW5jdGlvbih0aGVuKT90aGVuOmZhbHNlfWZ1bmN0aW9uIG5vdGlmeShkZWYpe3ZhciBjaGFpbj1kZWYuY2hhaW47Y2hhaW4ubGVuZ3RoJiZhc2FwKGZ1bmN0aW9uKCl7dmFyIG1zZz1kZWYubXNnLG9rPWRlZi5zdGF0ZT09MSxpPTA7d2hpbGUoY2hhaW4ubGVuZ3RoPmkpIWZ1bmN0aW9uKHJlYWN0KXt2YXIgY2I9b2s/cmVhY3Qub2s6cmVhY3QuZmFpbCxyZXQsdGhlbjt0cnl7aWYoY2Ipe3JldD1jYj09PXRydWU/bXNnOmNiKG1zZyk7aWYocmV0PT09cmVhY3QuUCl7cmVhY3QucmVqKFR5cGVFcnJvcihQUk9NSVNFK1wiLWNoYWluIGN5Y2xlXCIpKX1lbHNlIGlmKHRoZW49aXNUaGVuYWJsZShyZXQpKXt0aGVuLmNhbGwocmV0LHJlYWN0LnJlcyxyZWFjdC5yZWopfWVsc2UgcmVhY3QucmVzKHJldCl9ZWxzZSByZWFjdC5yZWoobXNnKX1jYXRjaChlcnIpe3JlYWN0LnJlaihlcnIpfX0oY2hhaW5baSsrXSk7Y2hhaW4ubGVuZ3RoPTB9KX1mdW5jdGlvbiByZXNvbHZlKG1zZyl7dmFyIGRlZj10aGlzLHRoZW4sd3JhcHBlcjtpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO3RyeXtpZih0aGVuPWlzVGhlbmFibGUobXNnKSl7d3JhcHBlcj17ZGVmOmRlZixkb25lOmZhbHNlfTt0aGVuLmNhbGwobXNnLGN0eChyZXNvbHZlLHdyYXBwZXIsMSksY3R4KHJlamVjdCx3cmFwcGVyLDEpKX1lbHNle2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0xO25vdGlmeShkZWYpfX1jYXRjaChlcnIpe3JlamVjdC5jYWxsKHdyYXBwZXJ8fHtkZWY6ZGVmLGRvbmU6ZmFsc2V9LGVycil9fWZ1bmN0aW9uIHJlamVjdChtc2cpe3ZhciBkZWY9dGhpcztpZihkZWYuZG9uZSlyZXR1cm47ZGVmLmRvbmU9dHJ1ZTtkZWY9ZGVmLmRlZnx8ZGVmO2RlZi5tc2c9bXNnO2RlZi5zdGF0ZT0yO25vdGlmeShkZWYpfWZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKEMpe3ZhciBTPWFzc2VydE9iamVjdChDKVtTWU1CT0xfU1BFQ0lFU107cmV0dXJuIFMhPXVuZGVmaW5lZD9TOkN9UHJvbWlzZT1mdW5jdGlvbihleGVjdXRvcil7YXNzZXJ0RnVuY3Rpb24oZXhlY3V0b3IpO2Fzc2VydEluc3RhbmNlKHRoaXMsUHJvbWlzZSxQUk9NSVNFKTt2YXIgZGVmPXtjaGFpbjpbXSxzdGF0ZTowLGRvbmU6ZmFsc2UsbXNnOnVuZGVmaW5lZH07aGlkZGVuKHRoaXMsREVGLGRlZik7dHJ5e2V4ZWN1dG9yKGN0eChyZXNvbHZlLGRlZiwxKSxjdHgocmVqZWN0LGRlZiwxKSl9Y2F0Y2goZXJyKXtyZWplY3QuY2FsbChkZWYsZXJyKX19O2Fzc2lnbkhpZGRlbihQcm9taXNlW1BST1RPVFlQRV0se3RoZW46ZnVuY3Rpb24ob25GdWxmaWxsZWQsb25SZWplY3RlZCl7dmFyIFM9YXNzZXJ0T2JqZWN0KGFzc2VydE9iamVjdCh0aGlzKVtDT05TVFJVQ1RPUl0pW1NZTUJPTF9TUEVDSUVTXTt2YXIgcmVhY3Q9e29rOmlzRnVuY3Rpb24ob25GdWxmaWxsZWQpP29uRnVsZmlsbGVkOnRydWUsZmFpbDppc0Z1bmN0aW9uKG9uUmVqZWN0ZWQpP29uUmVqZWN0ZWQ6ZmFsc2V9LFA9cmVhY3QuUD1uZXcoUyE9dW5kZWZpbmVkP1M6UHJvbWlzZSkoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3JlYWN0LnJlcz1hc3NlcnRGdW5jdGlvbihyZXNvbHZlKTtyZWFjdC5yZWo9YXNzZXJ0RnVuY3Rpb24ocmVqZWN0KX0pLGRlZj10aGlzW0RFRl07ZGVmLmNoYWluLnB1c2gocmVhY3QpO2RlZi5zdGF0ZSYmbm90aWZ5KGRlZik7cmV0dXJuIFB9LFwiY2F0Y2hcIjpmdW5jdGlvbihvblJlamVjdGVkKXtyZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCxvblJlamVjdGVkKX19KTthc3NpZ25IaWRkZW4oUHJvbWlzZSx7YWxsOmZ1bmN0aW9uKGl0ZXJhYmxlKXt2YXIgUHJvbWlzZT1nZXRDb25zdHJ1Y3Rvcih0aGlzKSx2YWx1ZXM9W107cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxwdXNoLHZhbHVlcyk7dmFyIHJlbWFpbmluZz12YWx1ZXMubGVuZ3RoLHJlc3VsdHM9QXJyYXkocmVtYWluaW5nKTtpZihyZW1haW5pbmcpZm9yRWFjaC5jYWxsKHZhbHVlcyxmdW5jdGlvbihwcm9taXNlLGluZGV4KXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7cmVzdWx0c1tpbmRleF09dmFsdWU7LS1yZW1haW5pbmd8fHJlc29sdmUocmVzdWx0cyl9LHJlamVjdCl9KTtlbHNlIHJlc29sdmUocmVzdWx0cyl9KX0scmFjZTpmdW5jdGlvbihpdGVyYWJsZSl7dmFyIFByb21pc2U9Z2V0Q29uc3RydWN0b3IodGhpcyk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtmb3JPZihpdGVyYWJsZSxmYWxzZSxmdW5jdGlvbihwcm9taXNlKXtQcm9taXNlLnJlc29sdmUocHJvbWlzZSkudGhlbihyZXNvbHZlLHJlamVjdCl9KX0pfSxyZWplY3Q6ZnVuY3Rpb24ocil7cmV0dXJuIG5ldyhnZXRDb25zdHJ1Y3Rvcih0aGlzKSkoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3JlamVjdChyKX0pfSxyZXNvbHZlOmZ1bmN0aW9uKHgpe3JldHVybiBpc09iamVjdCh4KSYmREVGIGluIHgmJmdldFByb3RvdHlwZU9mKHgpPT09dGhpc1tQUk9UT1RZUEVdP3g6bmV3KGdldENvbnN0cnVjdG9yKHRoaXMpKShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7cmVzb2x2ZSh4KX0pfX0pfShuZXh0VGlja3x8c2V0SW1tZWRpYXRlLHNhZmVTeW1ib2woXCJkZWZcIikpO3NldFRvU3RyaW5nVGFnKFByb21pc2UsUFJPTUlTRSk7c2V0U3BlY2llcyhQcm9taXNlKTskZGVmaW5lKEdMT0JBTCtGT1JDRUQqIWlzTmF0aXZlKFByb21pc2UpLHtQcm9taXNlOlByb21pc2V9KX0oZ2xvYmFsW1BST01JU0VdKTshZnVuY3Rpb24oKXt2YXIgVUlEPXNhZmVTeW1ib2woXCJ1aWRcIiksTzE9c2FmZVN5bWJvbChcIk8xXCIpLFdFQUs9c2FmZVN5bWJvbChcIndlYWtcIiksTEVBSz1zYWZlU3ltYm9sKFwibGVha1wiKSxMQVNUPXNhZmVTeW1ib2woXCJsYXN0XCIpLEZJUlNUPXNhZmVTeW1ib2woXCJmaXJzdFwiKSxTSVpFPURFU0M/c2FmZVN5bWJvbChcInNpemVcIik6XCJzaXplXCIsdWlkPTAsdG1wPXt9O2Z1bmN0aW9uIGdldENvbGxlY3Rpb24oQyxOQU1FLG1ldGhvZHMsY29tbW9uTWV0aG9kcyxpc01hcCxpc1dlYWspe3ZhciBBRERFUj1pc01hcD9cInNldFwiOlwiYWRkXCIscHJvdG89QyYmQ1tQUk9UT1RZUEVdLE89e307ZnVuY3Rpb24gaW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKXtpZihpdGVyYWJsZSE9dW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLGlzTWFwLHRoYXRbQURERVJdLHRoYXQpO3JldHVybiB0aGF0fWZ1bmN0aW9uIGZpeFNWWihrZXksY2hhaW4pe3ZhciBtZXRob2Q9cHJvdG9ba2V5XTtpZihmcmFtZXdvcmspcHJvdG9ba2V5XT1mdW5jdGlvbihhLGIpe3ZhciByZXN1bHQ9bWV0aG9kLmNhbGwodGhpcyxhPT09MD8wOmEsYik7cmV0dXJuIGNoYWluP3RoaXM6cmVzdWx0fX1pZighaXNOYXRpdmUoQyl8fCEoaXNXZWFrfHwhQlVHR1lfSVRFUkFUT1JTJiZoYXMocHJvdG8sRk9SX0VBQ0gpJiZoYXMocHJvdG8sXCJlbnRyaWVzXCIpKSl7Qz1pc1dlYWs/ZnVuY3Rpb24oaXRlcmFibGUpe2Fzc2VydEluc3RhbmNlKHRoaXMsQyxOQU1FKTtzZXQodGhpcyxVSUQsdWlkKyspO2luaXRGcm9tSXRlcmFibGUodGhpcyxpdGVyYWJsZSl9OmZ1bmN0aW9uKGl0ZXJhYmxlKXt2YXIgdGhhdD10aGlzO2Fzc2VydEluc3RhbmNlKHRoYXQsQyxOQU1FKTtzZXQodGhhdCxPMSxjcmVhdGUobnVsbCkpO3NldCh0aGF0LFNJWkUsMCk7c2V0KHRoYXQsTEFTVCx1bmRlZmluZWQpO3NldCh0aGF0LEZJUlNULHVuZGVmaW5lZCk7aW5pdEZyb21JdGVyYWJsZSh0aGF0LGl0ZXJhYmxlKX07YXNzaWduSGlkZGVuKGFzc2lnbkhpZGRlbihDW1BST1RPVFlQRV0sbWV0aG9kcyksY29tbW9uTWV0aG9kcyk7aXNXZWFrfHxkZWZpbmVQcm9wZXJ0eShDW1BST1RPVFlQRV0sXCJzaXplXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBhc3NlcnREZWZpbmVkKHRoaXNbU0laRV0pfX0pfWVsc2V7dmFyIE5hdGl2ZT1DLGluc3Q9bmV3IEMsY2hhaW49aW5zdFtBRERFUl0oaXNXZWFrP3t9Oi0wLDEpLGJ1Z2d5WmVybztpZighTkFUSVZFX0lURVJBVE9SU3x8IUMubGVuZ3RoKXtDPWZ1bmN0aW9uKGl0ZXJhYmxlKXthc3NlcnRJbnN0YW5jZSh0aGlzLEMsTkFNRSk7cmV0dXJuIGluaXRGcm9tSXRlcmFibGUobmV3IE5hdGl2ZSxpdGVyYWJsZSl9O0NbUFJPVE9UWVBFXT1wcm90bztpZihmcmFtZXdvcmspcHJvdG9bQ09OU1RSVUNUT1JdPUN9aXNXZWFrfHxpbnN0W0ZPUl9FQUNIXShmdW5jdGlvbih2YWwsa2V5KXtidWdneVplcm89MS9rZXk9PT0tSW5maW5pdHl9KTtpZihidWdneVplcm8pe2ZpeFNWWihcImRlbGV0ZVwiKTtmaXhTVlooXCJoYXNcIik7aXNNYXAmJmZpeFNWWihcImdldFwiKX1pZihidWdneVplcm98fGNoYWluIT09aW5zdClmaXhTVlooQURERVIsdHJ1ZSl9c2V0VG9TdHJpbmdUYWcoQyxOQU1FKTtzZXRTcGVjaWVzKEMpO09bTkFNRV09QzskZGVmaW5lKEdMT0JBTCtXUkFQK0ZPUkNFRCohaXNOYXRpdmUoQyksTyk7aXNXZWFrfHxkZWZpbmVTdGRJdGVyYXRvcnMoQyxOQU1FLGZ1bmN0aW9uKGl0ZXJhdGVkLGtpbmQpe3NldCh0aGlzLElURVIse286aXRlcmF0ZWQsazpraW5kfSl9LGZ1bmN0aW9uKCl7dmFyIGl0ZXI9dGhpc1tJVEVSXSxraW5kPWl0ZXIuayxlbnRyeT1pdGVyLmw7d2hpbGUoZW50cnkmJmVudHJ5LnIpZW50cnk9ZW50cnkucDtpZighaXRlci5vfHwhKGl0ZXIubD1lbnRyeT1lbnRyeT9lbnRyeS5uOml0ZXIub1tGSVJTVF0pKXtyZXR1cm4gaXRlci5vPXVuZGVmaW5lZCxpdGVyUmVzdWx0KDEpfWlmKGtpbmQ9PUtFWSlyZXR1cm4gaXRlclJlc3VsdCgwLGVudHJ5LmspO2lmKGtpbmQ9PVZBTFVFKXJldHVybiBpdGVyUmVzdWx0KDAsZW50cnkudik7cmV0dXJuIGl0ZXJSZXN1bHQoMCxbZW50cnkuayxlbnRyeS52XSl9LGlzTWFwP0tFWStWQUxVRTpWQUxVRSwhaXNNYXApO3JldHVybiBDfWZ1bmN0aW9uIGZhc3RLZXkoaXQsY3JlYXRlKXtpZighaXNPYmplY3QoaXQpKXJldHVybih0eXBlb2YgaXQ9PVwic3RyaW5nXCI/XCJTXCI6XCJQXCIpK2l0O2lmKGlzRnJvemVuKGl0KSlyZXR1cm5cIkZcIjtpZighaGFzKGl0LFVJRCkpe2lmKCFjcmVhdGUpcmV0dXJuXCJFXCI7aGlkZGVuKGl0LFVJRCwrK3VpZCl9cmV0dXJuXCJPXCIraXRbVUlEXX1mdW5jdGlvbiBnZXRFbnRyeSh0aGF0LGtleSl7dmFyIGluZGV4PWZhc3RLZXkoa2V5KSxlbnRyeTtpZihpbmRleCE9XCJGXCIpcmV0dXJuIHRoYXRbTzFdW2luZGV4XTtmb3IoZW50cnk9dGhhdFtGSVJTVF07ZW50cnk7ZW50cnk9ZW50cnkubil7aWYoZW50cnkuaz09a2V5KXJldHVybiBlbnRyeX19ZnVuY3Rpb24gZGVmKHRoYXQsa2V5LHZhbHVlKXt2YXIgZW50cnk9Z2V0RW50cnkodGhhdCxrZXkpLHByZXYsaW5kZXg7aWYoZW50cnkpZW50cnkudj12YWx1ZTtlbHNle3RoYXRbTEFTVF09ZW50cnk9e2k6aW5kZXg9ZmFzdEtleShrZXksdHJ1ZSksazprZXksdjp2YWx1ZSxwOnByZXY9dGhhdFtMQVNUXSxuOnVuZGVmaW5lZCxyOmZhbHNlfTtpZighdGhhdFtGSVJTVF0pdGhhdFtGSVJTVF09ZW50cnk7aWYocHJldilwcmV2Lm49ZW50cnk7dGhhdFtTSVpFXSsrO2lmKGluZGV4IT1cIkZcIil0aGF0W08xXVtpbmRleF09ZW50cnl9cmV0dXJuIHRoYXR9dmFyIGNvbGxlY3Rpb25NZXRob2RzPXtjbGVhcjpmdW5jdGlvbigpe2Zvcih2YXIgdGhhdD10aGlzLGRhdGE9dGhhdFtPMV0sZW50cnk9dGhhdFtGSVJTVF07ZW50cnk7ZW50cnk9ZW50cnkubil7ZW50cnkucj10cnVlO2VudHJ5LnA9ZW50cnkubj11bmRlZmluZWQ7ZGVsZXRlIGRhdGFbZW50cnkuaV19dGhhdFtGSVJTVF09dGhhdFtMQVNUXT11bmRlZmluZWQ7dGhhdFtTSVpFXT0wfSxcImRlbGV0ZVwiOmZ1bmN0aW9uKGtleSl7dmFyIHRoYXQ9dGhpcyxlbnRyeT1nZXRFbnRyeSh0aGF0LGtleSk7aWYoZW50cnkpe3ZhciBuZXh0PWVudHJ5Lm4scHJldj1lbnRyeS5wO2RlbGV0ZSB0aGF0W08xXVtlbnRyeS5pXTtlbnRyeS5yPXRydWU7aWYocHJldilwcmV2Lm49bmV4dDtpZihuZXh0KW5leHQucD1wcmV2O2lmKHRoYXRbRklSU1RdPT1lbnRyeSl0aGF0W0ZJUlNUXT1uZXh0O2lmKHRoYXRbTEFTVF09PWVudHJ5KXRoYXRbTEFTVF09cHJldjt0aGF0W1NJWkVdLS19cmV0dXJuISFlbnRyeX0sZm9yRWFjaDpmdW5jdGlvbihjYWxsYmFja2ZuKXt2YXIgZj1jdHgoY2FsbGJhY2tmbixhcmd1bWVudHNbMV0sMyksZW50cnk7d2hpbGUoZW50cnk9ZW50cnk/ZW50cnkubjp0aGlzW0ZJUlNUXSl7ZihlbnRyeS52LGVudHJ5LmssdGhpcyk7d2hpbGUoZW50cnkmJmVudHJ5LnIpZW50cnk9ZW50cnkucH19LGhhczpmdW5jdGlvbihrZXkpe3JldHVybiEhZ2V0RW50cnkodGhpcyxrZXkpfX07TWFwPWdldENvbGxlY3Rpb24oTWFwLE1BUCx7Z2V0OmZ1bmN0aW9uKGtleSl7dmFyIGVudHJ5PWdldEVudHJ5KHRoaXMsa2V5KTtyZXR1cm4gZW50cnkmJmVudHJ5LnZ9LHNldDpmdW5jdGlvbihrZXksdmFsdWUpe3JldHVybiBkZWYodGhpcyxrZXk9PT0wPzA6a2V5LHZhbHVlKX19LGNvbGxlY3Rpb25NZXRob2RzLHRydWUpO1NldD1nZXRDb2xsZWN0aW9uKFNldCxTRVQse2FkZDpmdW5jdGlvbih2YWx1ZSl7cmV0dXJuIGRlZih0aGlzLHZhbHVlPXZhbHVlPT09MD8wOnZhbHVlLHZhbHVlKX19LGNvbGxlY3Rpb25NZXRob2RzKTtmdW5jdGlvbiBkZWZXZWFrKHRoYXQsa2V5LHZhbHVlKXtpZihpc0Zyb3plbihhc3NlcnRPYmplY3Qoa2V5KSkpbGVha1N0b3JlKHRoYXQpLnNldChrZXksdmFsdWUpO2Vsc2V7aGFzKGtleSxXRUFLKXx8aGlkZGVuKGtleSxXRUFLLHt9KTtrZXlbV0VBS11bdGhhdFtVSURdXT12YWx1ZX1yZXR1cm4gdGhhdH1mdW5jdGlvbiBsZWFrU3RvcmUodGhhdCl7cmV0dXJuIHRoYXRbTEVBS118fGhpZGRlbih0aGF0LExFQUssbmV3IE1hcClbTEVBS119dmFyIHdlYWtNZXRob2RzPXtcImRlbGV0ZVwiOmZ1bmN0aW9uKGtleSl7aWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO2lmKGlzRnJvemVuKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKVtcImRlbGV0ZVwiXShrZXkpO3JldHVybiBoYXMoa2V5LFdFQUspJiZoYXMoa2V5W1dFQUtdLHRoaXNbVUlEXSkmJmRlbGV0ZSBrZXlbV0VBS11bdGhpc1tVSURdXX0saGFzOmZ1bmN0aW9uKGtleSl7aWYoIWlzT2JqZWN0KGtleSkpcmV0dXJuIGZhbHNlO2lmKGlzRnJvemVuKGtleSkpcmV0dXJuIGxlYWtTdG9yZSh0aGlzKS5oYXMoa2V5KTtyZXR1cm4gaGFzKGtleSxXRUFLKSYmaGFzKGtleVtXRUFLXSx0aGlzW1VJRF0pfX07V2Vha01hcD1nZXRDb2xsZWN0aW9uKFdlYWtNYXAsV0VBS01BUCx7Z2V0OmZ1bmN0aW9uKGtleSl7aWYoaXNPYmplY3Qoa2V5KSl7aWYoaXNGcm96ZW4oa2V5KSlyZXR1cm4gbGVha1N0b3JlKHRoaXMpLmdldChrZXkpO2lmKGhhcyhrZXksV0VBSykpcmV0dXJuIGtleVtXRUFLXVt0aGlzW1VJRF1dfX0sc2V0OmZ1bmN0aW9uKGtleSx2YWx1ZSl7cmV0dXJuIGRlZldlYWsodGhpcyxrZXksdmFsdWUpfX0sd2Vha01ldGhvZHMsdHJ1ZSx0cnVlKTtpZihmcmFtZXdvcmsmJkRFU0MmJm5ldyBXZWFrTWFwKFtbT2JqZWN0LmZyZWV6ZSh0bXApLDddXSkuZ2V0KHRtcCkhPTcpe2ZvckVhY2guY2FsbChhcnJheShcImRlbGV0ZSxoYXMsZ2V0LHNldFwiKSxmdW5jdGlvbihrZXkpe3ZhciBtZXRob2Q9V2Vha01hcFtQUk9UT1RZUEVdW2tleV07V2Vha01hcFtQUk9UT1RZUEVdW2tleV09ZnVuY3Rpb24oYSxiKXtpZihpc09iamVjdChhKSYmaXNGcm96ZW4oYSkpe3ZhciByZXN1bHQ9bGVha1N0b3JlKHRoaXMpW2tleV0oYSxiKTtyZXR1cm4ga2V5PT1cInNldFwiP3RoaXM6cmVzdWx0XG59cmV0dXJuIG1ldGhvZC5jYWxsKHRoaXMsYSxiKX19KX1XZWFrU2V0PWdldENvbGxlY3Rpb24oV2Vha1NldCxXRUFLU0VULHthZGQ6ZnVuY3Rpb24odmFsdWUpe3JldHVybiBkZWZXZWFrKHRoaXMsdmFsdWUsdHJ1ZSl9fSx3ZWFrTWV0aG9kcyxmYWxzZSx0cnVlKX0oKTshZnVuY3Rpb24oKXtmdW5jdGlvbiBFbnVtZXJhdGUoaXRlcmF0ZWQpe3ZhciBrZXlzPVtdLGtleTtmb3Ioa2V5IGluIGl0ZXJhdGVkKWtleXMucHVzaChrZXkpO3NldCh0aGlzLElURVIse286aXRlcmF0ZWQsYTprZXlzLGk6MH0pfWNyZWF0ZUl0ZXJhdG9yKEVudW1lcmF0ZSxPQkpFQ1QsZnVuY3Rpb24oKXt2YXIgaXRlcj10aGlzW0lURVJdLGtleXM9aXRlci5hLGtleTtkb3tpZihpdGVyLmk+PWtleXMubGVuZ3RoKXJldHVybiBpdGVyUmVzdWx0KDEpfXdoaWxlKCEoKGtleT1rZXlzW2l0ZXIuaSsrXSlpbiBpdGVyLm8pKTtyZXR1cm4gaXRlclJlc3VsdCgwLGtleSl9KTtmdW5jdGlvbiB3cmFwKGZuKXtyZXR1cm4gZnVuY3Rpb24oaXQpe2Fzc2VydE9iamVjdChpdCk7dHJ5e3JldHVybiBmbi5hcHBseSh1bmRlZmluZWQsYXJndW1lbnRzKSx0cnVlfWNhdGNoKGUpe3JldHVybiBmYWxzZX19fWZ1bmN0aW9uIHJlZmxlY3RHZXQodGFyZ2V0LHByb3BlcnR5S2V5KXt2YXIgcmVjZWl2ZXI9YXJndW1lbnRzLmxlbmd0aDwzP3RhcmdldDphcmd1bWVudHNbMl0sZGVzYz1nZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KSxwcm90bztpZihkZXNjKXJldHVybiBkZXNjLmdldD9kZXNjLmdldC5jYWxsKHJlY2VpdmVyKTpkZXNjLnZhbHVlO3JldHVybiBpc09iamVjdChwcm90bz1nZXRQcm90b3R5cGVPZih0YXJnZXQpKT9yZWZsZWN0R2V0KHByb3RvLHByb3BlcnR5S2V5LHJlY2VpdmVyKTp1bmRlZmluZWR9ZnVuY3Rpb24gcmVmbGVjdFNldCh0YXJnZXQscHJvcGVydHlLZXksVil7dmFyIHJlY2VpdmVyPWFyZ3VtZW50cy5sZW5ndGg8ND90YXJnZXQ6YXJndW1lbnRzWzNdLGRlc2M9Z2V0T3duRGVzY3JpcHRvcihhc3NlcnRPYmplY3QodGFyZ2V0KSxwcm9wZXJ0eUtleSkscHJvdG87aWYoZGVzYyl7aWYoZGVzYy53cml0YWJsZT09PWZhbHNlKXJldHVybiBmYWxzZTtpZihkZXNjLnNldClyZXR1cm4gZGVzYy5zZXQuY2FsbChyZWNlaXZlcixWKSx0cnVlfWlmKGlzT2JqZWN0KHByb3RvPWdldFByb3RvdHlwZU9mKHRhcmdldCkpKXJldHVybiByZWZsZWN0U2V0KHByb3RvLHByb3BlcnR5S2V5LFYscmVjZWl2ZXIpO2Rlc2M9Z2V0T3duRGVzY3JpcHRvcihyZWNlaXZlcixwcm9wZXJ0eUtleSl8fGRlc2NyaXB0b3IoMCk7ZGVzYy52YWx1ZT1WO3JldHVybiBkZWZpbmVQcm9wZXJ0eShyZWNlaXZlcixwcm9wZXJ0eUtleSxkZXNjKSx0cnVlfXZhciBpc0V4dGVuc2libGU9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8cmV0dXJuSXQ7dmFyIHJlZmxlY3Q9e2FwcGx5OmN0eChjYWxsLGFwcGx5LDMpLGNvbnN0cnVjdDpjb25zdHJ1Y3QsZGVmaW5lUHJvcGVydHk6d3JhcChkZWZpbmVQcm9wZXJ0eSksZGVsZXRlUHJvcGVydHk6ZnVuY3Rpb24odGFyZ2V0LHByb3BlcnR5S2V5KXt2YXIgZGVzYz1nZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KTtyZXR1cm4gZGVzYyYmIWRlc2MuY29uZmlndXJhYmxlP2ZhbHNlOmRlbGV0ZSB0YXJnZXRbcHJvcGVydHlLZXldfSxlbnVtZXJhdGU6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4gbmV3IEVudW1lcmF0ZShhc3NlcnRPYmplY3QodGFyZ2V0KSl9LGdldDpyZWZsZWN0R2V0LGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpmdW5jdGlvbih0YXJnZXQscHJvcGVydHlLZXkpe3JldHVybiBnZXRPd25EZXNjcmlwdG9yKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3BlcnR5S2V5KX0sZ2V0UHJvdG90eXBlT2Y6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4gZ2V0UHJvdG90eXBlT2YoYXNzZXJ0T2JqZWN0KHRhcmdldCkpfSxoYXM6ZnVuY3Rpb24odGFyZ2V0LHByb3BlcnR5S2V5KXtyZXR1cm4gcHJvcGVydHlLZXkgaW4gdGFyZ2V0fSxpc0V4dGVuc2libGU6ZnVuY3Rpb24odGFyZ2V0KXtyZXR1cm4hIWlzRXh0ZW5zaWJsZShhc3NlcnRPYmplY3QodGFyZ2V0KSl9LG93bktleXM6b3duS2V5cyxwcmV2ZW50RXh0ZW5zaW9uczp3cmFwKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9uc3x8cmV0dXJuSXQpLHNldDpyZWZsZWN0U2V0fTtpZihzZXRQcm90b3R5cGVPZilyZWZsZWN0LnNldFByb3RvdHlwZU9mPWZ1bmN0aW9uKHRhcmdldCxwcm90byl7cmV0dXJuIHNldFByb3RvdHlwZU9mKGFzc2VydE9iamVjdCh0YXJnZXQpLHByb3RvKSx0cnVlfTskZGVmaW5lKEdMT0JBTCx7UmVmbGVjdDp7fX0pOyRkZWZpbmUoU1RBVElDLFwiUmVmbGVjdFwiLHJlZmxlY3QpfSgpOyFmdW5jdGlvbigpeyRkZWZpbmUoUFJPVE8sQVJSQVkse2luY2x1ZGVzOmNyZWF0ZUFycmF5Q29udGFpbnModHJ1ZSl9KTskZGVmaW5lKFBST1RPLFNUUklORyx7YXQ6Y3JlYXRlUG9pbnRBdCh0cnVlKX0pO2Z1bmN0aW9uIGNyZWF0ZU9iamVjdFRvQXJyYXkoaXNFbnRyaWVzKXtyZXR1cm4gZnVuY3Rpb24ob2JqZWN0KXt2YXIgTz10b09iamVjdChvYmplY3QpLGtleXM9Z2V0S2V5cyhvYmplY3QpLGxlbmd0aD1rZXlzLmxlbmd0aCxpPTAscmVzdWx0PUFycmF5KGxlbmd0aCksa2V5O2lmKGlzRW50cmllcyl3aGlsZShsZW5ndGg+aSlyZXN1bHRbaV09W2tleT1rZXlzW2krK10sT1trZXldXTtlbHNlIHdoaWxlKGxlbmd0aD5pKXJlc3VsdFtpXT1PW2tleXNbaSsrXV07cmV0dXJuIHJlc3VsdH19JGRlZmluZShTVEFUSUMsT0JKRUNULHt2YWx1ZXM6Y3JlYXRlT2JqZWN0VG9BcnJheShmYWxzZSksZW50cmllczpjcmVhdGVPYmplY3RUb0FycmF5KHRydWUpfSk7JGRlZmluZShTVEFUSUMsUkVHRVhQLHtlc2NhcGU6Y3JlYXRlUmVwbGFjZXIoLyhbXFxcXFxcLVtcXF17fSgpKis/LixeJHxdKS9nLFwiXFxcXCQxXCIsdHJ1ZSl9KX0oKTshZnVuY3Rpb24oUkVGRVJFTkNFKXtSRUZFUkVOQ0VfR0VUPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJHZXRcIix0cnVlKTt2YXIgUkVGRVJFTkNFX1NFVD1nZXRXZWxsS25vd25TeW1ib2woUkVGRVJFTkNFK1NFVCx0cnVlKSxSRUZFUkVOQ0VfREVMRVRFPWdldFdlbGxLbm93blN5bWJvbChSRUZFUkVOQ0UrXCJEZWxldGVcIix0cnVlKTskZGVmaW5lKFNUQVRJQyxTWU1CT0wse3JlZmVyZW5jZUdldDpSRUZFUkVOQ0VfR0VULHJlZmVyZW5jZVNldDpSRUZFUkVOQ0VfU0VULHJlZmVyZW5jZURlbGV0ZTpSRUZFUkVOQ0VfREVMRVRFfSk7aGlkZGVuKEZ1bmN0aW9uUHJvdG8sUkVGRVJFTkNFX0dFVCxyZXR1cm5UaGlzKTtmdW5jdGlvbiBzZXRNYXBNZXRob2RzKENvbnN0cnVjdG9yKXtpZihDb25zdHJ1Y3Rvcil7dmFyIE1hcFByb3RvPUNvbnN0cnVjdG9yW1BST1RPVFlQRV07aGlkZGVuKE1hcFByb3RvLFJFRkVSRU5DRV9HRVQsTWFwUHJvdG8uZ2V0KTtoaWRkZW4oTWFwUHJvdG8sUkVGRVJFTkNFX1NFVCxNYXBQcm90by5zZXQpO2hpZGRlbihNYXBQcm90byxSRUZFUkVOQ0VfREVMRVRFLE1hcFByb3RvW1wiZGVsZXRlXCJdKX19c2V0TWFwTWV0aG9kcyhNYXApO3NldE1hcE1ldGhvZHMoV2Vha01hcCl9KFwicmVmZXJlbmNlXCIpOyFmdW5jdGlvbihOb2RlTGlzdCl7aWYoZnJhbWV3b3JrJiZOb2RlTGlzdCYmIShTWU1CT0xfSVRFUkFUT1IgaW4gTm9kZUxpc3RbUFJPVE9UWVBFXSkpe2hpZGRlbihOb2RlTGlzdFtQUk9UT1RZUEVdLFNZTUJPTF9JVEVSQVRPUixJdGVyYXRvcnNbQVJSQVldKX1JdGVyYXRvcnMuTm9kZUxpc3Q9SXRlcmF0b3JzW0FSUkFZXX0oZ2xvYmFsLk5vZGVMaXN0KTshZnVuY3Rpb24oYXJyYXlTdGF0aWNzKXtmdW5jdGlvbiBzZXRBcnJheVN0YXRpY3Moa2V5cyxsZW5ndGgpe2ZvckVhY2guY2FsbChhcnJheShrZXlzKSxmdW5jdGlvbihrZXkpe2lmKGtleSBpbiBBcnJheVByb3RvKWFycmF5U3RhdGljc1trZXldPWN0eChjYWxsLEFycmF5UHJvdG9ba2V5XSxsZW5ndGgpfSl9c2V0QXJyYXlTdGF0aWNzKFwicG9wLHJldmVyc2Usc2hpZnQsa2V5cyx2YWx1ZXMsZW50cmllc1wiLDEpO3NldEFycmF5U3RhdGljcyhcImluZGV4T2YsZXZlcnksc29tZSxmb3JFYWNoLG1hcCxmaWx0ZXIsZmluZCxmaW5kSW5kZXgsaW5jbHVkZXNcIiwzKTtzZXRBcnJheVN0YXRpY3MoXCJqb2luLHNsaWNlLGNvbmNhdCxwdXNoLHNwbGljZSx1bnNoaWZ0LHNvcnQsbGFzdEluZGV4T2YsXCIrXCJyZWR1Y2UscmVkdWNlUmlnaHQsY29weVdpdGhpbixmaWxsLHR1cm5cIik7JGRlZmluZShTVEFUSUMsQVJSQVksYXJyYXlTdGF0aWNzKX0oe30pfSh0eXBlb2Ygc2VsZiE9XCJ1bmRlZmluZWRcIiYmc2VsZi5NYXRoPT09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSx0cnVlKX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyFmdW5jdGlvbihnbG9iYWwpe1widXNlIHN0cmljdFwiO3ZhciBoYXNPd249T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTt2YXIgdW5kZWZpbmVkO3ZhciBpdGVyYXRvclN5bWJvbD10eXBlb2YgU3ltYm9sPT09XCJmdW5jdGlvblwiJiZTeW1ib2wuaXRlcmF0b3J8fFwiQEBpdGVyYXRvclwiO3ZhciBpbk1vZHVsZT10eXBlb2YgbW9kdWxlPT09XCJvYmplY3RcIjt2YXIgcnVudGltZT1nbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO2lmKHJ1bnRpbWUpe2lmKGluTW9kdWxlKXttb2R1bGUuZXhwb3J0cz1ydW50aW1lfXJldHVybn1ydW50aW1lPWdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU9aW5Nb2R1bGU/bW9kdWxlLmV4cG9ydHM6e307ZnVuY3Rpb24gd3JhcChpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KXtyZXR1cm4gbmV3IEdlbmVyYXRvcihpbm5lckZuLG91dGVyRm4sc2VsZnx8bnVsbCx0cnlMaXN0fHxbXSl9cnVudGltZS53cmFwPXdyYXA7ZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sb2JqLGFyZyl7dHJ5e3JldHVybnt0eXBlOlwibm9ybWFsXCIsYXJnOmZuLmNhbGwob2JqLGFyZyl9fWNhdGNoKGVycil7cmV0dXJue3R5cGU6XCJ0aHJvd1wiLGFyZzplcnJ9fX12YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydD1cInN1c3BlbmRlZFN0YXJ0XCI7dmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQ9XCJzdXNwZW5kZWRZaWVsZFwiO3ZhciBHZW5TdGF0ZUV4ZWN1dGluZz1cImV4ZWN1dGluZ1wiO3ZhciBHZW5TdGF0ZUNvbXBsZXRlZD1cImNvbXBsZXRlZFwiO3ZhciBDb250aW51ZVNlbnRpbmVsPXt9O2Z1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCl7fWZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCl7fXZhciBHcD1HZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGU9R2VuZXJhdG9yLnByb3RvdHlwZTtHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGU9R3AuY29uc3RydWN0b3I9R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7R2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3I9R2VuZXJhdG9yRnVuY3Rpb247R2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWU9XCJHZW5lcmF0b3JGdW5jdGlvblwiO3J1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbj1mdW5jdGlvbihnZW5GdW4pe3ZhciBjdG9yPXR5cGVvZiBnZW5GdW49PT1cImZ1bmN0aW9uXCImJmdlbkZ1bi5jb25zdHJ1Y3RvcjtyZXR1cm4gY3Rvcj9jdG9yPT09R2VuZXJhdG9yRnVuY3Rpb258fChjdG9yLmRpc3BsYXlOYW1lfHxjdG9yLm5hbWUpPT09XCJHZW5lcmF0b3JGdW5jdGlvblwiOmZhbHNlfTtydW50aW1lLm1hcms9ZnVuY3Rpb24oZ2VuRnVuKXtnZW5GdW4uX19wcm90b19fPUdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO2dlbkZ1bi5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShHcCk7cmV0dXJuIGdlbkZ1bn07cnVudGltZS5hc3luYz1mdW5jdGlvbihpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3ZhciBnZW5lcmF0b3I9d3JhcChpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KTt2YXIgY2FsbE5leHQ9c3RlcC5iaW5kKGdlbmVyYXRvci5uZXh0KTt2YXIgY2FsbFRocm93PXN0ZXAuYmluZChnZW5lcmF0b3JbXCJ0aHJvd1wiXSk7ZnVuY3Rpb24gc3RlcChhcmcpe3ZhciByZWNvcmQ9dHJ5Q2F0Y2godGhpcyxudWxsLGFyZyk7aWYocmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3JlamVjdChyZWNvcmQuYXJnKTtyZXR1cm59dmFyIGluZm89cmVjb3JkLmFyZztpZihpbmZvLmRvbmUpe3Jlc29sdmUoaW5mby52YWx1ZSl9ZWxzZXtQcm9taXNlLnJlc29sdmUoaW5mby52YWx1ZSkudGhlbihjYWxsTmV4dCxjYWxsVGhyb3cpfX1jYWxsTmV4dCgpfSl9O2Z1bmN0aW9uIEdlbmVyYXRvcihpbm5lckZuLG91dGVyRm4sc2VsZix0cnlMaXN0KXt2YXIgZ2VuZXJhdG9yPW91dGVyRm4/T2JqZWN0LmNyZWF0ZShvdXRlckZuLnByb3RvdHlwZSk6dGhpczt2YXIgY29udGV4dD1uZXcgQ29udGV4dCh0cnlMaXN0KTt2YXIgc3RhdGU9R2VuU3RhdGVTdXNwZW5kZWRTdGFydDtmdW5jdGlvbiBpbnZva2UobWV0aG9kLGFyZyl7aWYoc3RhdGU9PT1HZW5TdGF0ZUV4ZWN1dGluZyl7dGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKX1pZihzdGF0ZT09PUdlblN0YXRlQ29tcGxldGVkKXtyZXR1cm4gZG9uZVJlc3VsdCgpfXdoaWxlKHRydWUpe3ZhciBkZWxlZ2F0ZT1jb250ZXh0LmRlbGVnYXRlO2lmKGRlbGVnYXRlKXt2YXIgcmVjb3JkPXRyeUNhdGNoKGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZF0sZGVsZWdhdGUuaXRlcmF0b3IsYXJnKTtpZihyZWNvcmQudHlwZT09PVwidGhyb3dcIil7Y29udGV4dC5kZWxlZ2F0ZT1udWxsO21ldGhvZD1cInRocm93XCI7YXJnPXJlY29yZC5hcmc7Y29udGludWV9bWV0aG9kPVwibmV4dFwiO2FyZz11bmRlZmluZWQ7dmFyIGluZm89cmVjb3JkLmFyZztpZihpbmZvLmRvbmUpe2NvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV09aW5mby52YWx1ZTtjb250ZXh0Lm5leHQ9ZGVsZWdhdGUubmV4dExvY31lbHNle3N0YXRlPUdlblN0YXRlU3VzcGVuZGVkWWllbGQ7cmV0dXJuIGluZm99Y29udGV4dC5kZWxlZ2F0ZT1udWxsfWlmKG1ldGhvZD09PVwibmV4dFwiKXtpZihzdGF0ZT09PUdlblN0YXRlU3VzcGVuZGVkU3RhcnQmJnR5cGVvZiBhcmchPT1cInVuZGVmaW5lZFwiKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdCB0byBzZW5kIFwiK0pTT04uc3RyaW5naWZ5KGFyZykrXCIgdG8gbmV3Ym9ybiBnZW5lcmF0b3JcIil9aWYoc3RhdGU9PT1HZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKXtjb250ZXh0LnNlbnQ9YXJnfWVsc2V7ZGVsZXRlIGNvbnRleHQuc2VudH19ZWxzZSBpZihtZXRob2Q9PT1cInRocm93XCIpe2lmKHN0YXRlPT09R2VuU3RhdGVTdXNwZW5kZWRTdGFydCl7c3RhdGU9R2VuU3RhdGVDb21wbGV0ZWQ7dGhyb3cgYXJnfWlmKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSl7bWV0aG9kPVwibmV4dFwiO2FyZz11bmRlZmluZWR9fWVsc2UgaWYobWV0aG9kPT09XCJyZXR1cm5cIil7Y29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIixhcmcpfXN0YXRlPUdlblN0YXRlRXhlY3V0aW5nO3ZhciByZWNvcmQ9dHJ5Q2F0Y2goaW5uZXJGbixzZWxmLGNvbnRleHQpO2lmKHJlY29yZC50eXBlPT09XCJub3JtYWxcIil7c3RhdGU9Y29udGV4dC5kb25lP0dlblN0YXRlQ29tcGxldGVkOkdlblN0YXRlU3VzcGVuZGVkWWllbGQ7dmFyIGluZm89e3ZhbHVlOnJlY29yZC5hcmcsZG9uZTpjb250ZXh0LmRvbmV9O2lmKHJlY29yZC5hcmc9PT1Db250aW51ZVNlbnRpbmVsKXtpZihjb250ZXh0LmRlbGVnYXRlJiZtZXRob2Q9PT1cIm5leHRcIil7YXJnPXVuZGVmaW5lZH19ZWxzZXtyZXR1cm4gaW5mb319ZWxzZSBpZihyZWNvcmQudHlwZT09PVwidGhyb3dcIil7c3RhdGU9R2VuU3RhdGVDb21wbGV0ZWQ7aWYobWV0aG9kPT09XCJuZXh0XCIpe2NvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24ocmVjb3JkLmFyZyl9ZWxzZXthcmc9cmVjb3JkLmFyZ319fX1nZW5lcmF0b3IubmV4dD1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJuZXh0XCIpO2dlbmVyYXRvcltcInRocm93XCJdPWludm9rZS5iaW5kKGdlbmVyYXRvcixcInRocm93XCIpO2dlbmVyYXRvcltcInJldHVyblwiXT1pbnZva2UuYmluZChnZW5lcmF0b3IsXCJyZXR1cm5cIik7cmV0dXJuIGdlbmVyYXRvcn1HcFtpdGVyYXRvclN5bWJvbF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc307R3AudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIltvYmplY3QgR2VuZXJhdG9yXVwifTtmdW5jdGlvbiBwdXNoVHJ5RW50cnkodHJpcGxlKXt2YXIgZW50cnk9e3RyeUxvYzp0cmlwbGVbMF19O2lmKDEgaW4gdHJpcGxlKXtlbnRyeS5jYXRjaExvYz10cmlwbGVbMV19aWYoMiBpbiB0cmlwbGUpe2VudHJ5LmZpbmFsbHlMb2M9dHJpcGxlWzJdfXRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KX1mdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5LGkpe3ZhciByZWNvcmQ9ZW50cnkuY29tcGxldGlvbnx8e307cmVjb3JkLnR5cGU9aT09PTA/XCJub3JtYWxcIjpcInJldHVyblwiO2RlbGV0ZSByZWNvcmQuYXJnO2VudHJ5LmNvbXBsZXRpb249cmVjb3JkfWZ1bmN0aW9uIENvbnRleHQodHJ5TGlzdCl7dGhpcy50cnlFbnRyaWVzPVt7dHJ5TG9jOlwicm9vdFwifV07dHJ5TGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSx0aGlzKTt0aGlzLnJlc2V0KCl9cnVudGltZS5rZXlzPWZ1bmN0aW9uKG9iamVjdCl7dmFyIGtleXM9W107Zm9yKHZhciBrZXkgaW4gb2JqZWN0KXtrZXlzLnB1c2goa2V5KX1rZXlzLnJldmVyc2UoKTtyZXR1cm4gZnVuY3Rpb24gbmV4dCgpe3doaWxlKGtleXMubGVuZ3RoKXt2YXIga2V5PWtleXMucG9wKCk7aWYoa2V5IGluIG9iamVjdCl7bmV4dC52YWx1ZT1rZXk7bmV4dC5kb25lPWZhbHNlO3JldHVybiBuZXh0fX1uZXh0LmRvbmU9dHJ1ZTtyZXR1cm4gbmV4dH19O2Z1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSl7aWYoaXRlcmFibGUpe3ZhciBpdGVyYXRvck1ldGhvZD1pdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07aWYoaXRlcmF0b3JNZXRob2Qpe3JldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKX1pZih0eXBlb2YgaXRlcmFibGUubmV4dD09PVwiZnVuY3Rpb25cIil7cmV0dXJuIGl0ZXJhYmxlfWlmKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKXt2YXIgaT0tMSxuZXh0PWZ1bmN0aW9uIG5leHQoKXt3aGlsZSgrK2k8aXRlcmFibGUubGVuZ3RoKXtpZihoYXNPd24uY2FsbChpdGVyYWJsZSxpKSl7bmV4dC52YWx1ZT1pdGVyYWJsZVtpXTtuZXh0LmRvbmU9ZmFsc2U7cmV0dXJuIG5leHR9fW5leHQudmFsdWU9dW5kZWZpbmVkO25leHQuZG9uZT10cnVlO3JldHVybiBuZXh0fTtyZXR1cm4gbmV4dC5uZXh0PW5leHR9fXJldHVybntuZXh0OmRvbmVSZXN1bHR9fXJ1bnRpbWUudmFsdWVzPXZhbHVlcztmdW5jdGlvbiBkb25lUmVzdWx0KCl7cmV0dXJue3ZhbHVlOnVuZGVmaW5lZCxkb25lOnRydWV9fUNvbnRleHQucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpDb250ZXh0LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5wcmV2PTA7dGhpcy5uZXh0PTA7dGhpcy5zZW50PXVuZGVmaW5lZDt0aGlzLmRvbmU9ZmFsc2U7dGhpcy5kZWxlZ2F0ZT1udWxsO3RoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO2Zvcih2YXIgdGVtcEluZGV4PTAsdGVtcE5hbWU7aGFzT3duLmNhbGwodGhpcyx0ZW1wTmFtZT1cInRcIit0ZW1wSW5kZXgpfHx0ZW1wSW5kZXg8MjA7Kyt0ZW1wSW5kZXgpe3RoaXNbdGVtcE5hbWVdPW51bGx9fSxzdG9wOmZ1bmN0aW9uKCl7dGhpcy5kb25lPXRydWU7dmFyIHJvb3RFbnRyeT10aGlzLnRyeUVudHJpZXNbMF07dmFyIHJvb3RSZWNvcmQ9cm9vdEVudHJ5LmNvbXBsZXRpb247aWYocm9vdFJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByb290UmVjb3JkLmFyZ31yZXR1cm4gdGhpcy5ydmFsfSxkaXNwYXRjaEV4Y2VwdGlvbjpmdW5jdGlvbihleGNlcHRpb24pe2lmKHRoaXMuZG9uZSl7dGhyb3cgZXhjZXB0aW9ufXZhciBjb250ZXh0PXRoaXM7ZnVuY3Rpb24gaGFuZGxlKGxvYyxjYXVnaHQpe3JlY29yZC50eXBlPVwidGhyb3dcIjtyZWNvcmQuYXJnPWV4Y2VwdGlvbjtjb250ZXh0Lm5leHQ9bG9jO3JldHVybiEhY2F1Z2h0fWZvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07dmFyIHJlY29yZD1lbnRyeS5jb21wbGV0aW9uO2lmKGVudHJ5LnRyeUxvYz09PVwicm9vdFwiKXtyZXR1cm4gaGFuZGxlKFwiZW5kXCIpfWlmKGVudHJ5LnRyeUxvYzw9dGhpcy5wcmV2KXt2YXIgaGFzQ2F0Y2g9aGFzT3duLmNhbGwoZW50cnksXCJjYXRjaExvY1wiKTt2YXIgaGFzRmluYWxseT1oYXNPd24uY2FsbChlbnRyeSxcImZpbmFsbHlMb2NcIik7aWYoaGFzQ2F0Y2gmJmhhc0ZpbmFsbHkpe2lmKHRoaXMucHJldjxlbnRyeS5jYXRjaExvYyl7cmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYyx0cnVlKX1lbHNlIGlmKHRoaXMucHJldjxlbnRyeS5maW5hbGx5TG9jKXtyZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpfX1lbHNlIGlmKGhhc0NhdGNoKXtpZih0aGlzLnByZXY8ZW50cnkuY2F0Y2hMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsdHJ1ZSl9fWVsc2UgaWYoaGFzRmluYWxseSl7aWYodGhpcy5wcmV2PGVudHJ5LmZpbmFsbHlMb2Mpe3JldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyl9fWVsc2V7dGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIil9fX19LF9maW5kRmluYWxseUVudHJ5OmZ1bmN0aW9uKGZpbmFsbHlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPD10aGlzLnByZXYmJmhhc093bi5jYWxsKGVudHJ5LFwiZmluYWxseUxvY1wiKSYmKGVudHJ5LmZpbmFsbHlMb2M9PT1maW5hbGx5TG9jfHx0aGlzLnByZXY8ZW50cnkuZmluYWxseUxvYykpe3JldHVybiBlbnRyeX19fSxhYnJ1cHQ6ZnVuY3Rpb24odHlwZSxhcmcpe3ZhciBlbnRyeT10aGlzLl9maW5kRmluYWxseUVudHJ5KCk7dmFyIHJlY29yZD1lbnRyeT9lbnRyeS5jb21wbGV0aW9uOnt9O3JlY29yZC50eXBlPXR5cGU7cmVjb3JkLmFyZz1hcmc7aWYoZW50cnkpe3RoaXMubmV4dD1lbnRyeS5maW5hbGx5TG9jfWVsc2V7dGhpcy5jb21wbGV0ZShyZWNvcmQpfXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxjb21wbGV0ZTpmdW5jdGlvbihyZWNvcmQpe2lmKHJlY29yZC50eXBlPT09XCJ0aHJvd1wiKXt0aHJvdyByZWNvcmQuYXJnfWlmKHJlY29yZC50eXBlPT09XCJicmVha1wifHxyZWNvcmQudHlwZT09PVwiY29udGludWVcIil7dGhpcy5uZXh0PXJlY29yZC5hcmd9ZWxzZSBpZihyZWNvcmQudHlwZT09PVwicmV0dXJuXCIpe3RoaXMucnZhbD1yZWNvcmQuYXJnO3RoaXMubmV4dD1cImVuZFwifXJldHVybiBDb250aW51ZVNlbnRpbmVsfSxmaW5pc2g6ZnVuY3Rpb24oZmluYWxseUxvYyl7dmFyIGVudHJ5PXRoaXMuX2ZpbmRGaW5hbGx5RW50cnkoZmluYWxseUxvYyk7cmV0dXJuIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbil9LFwiY2F0Y2hcIjpmdW5jdGlvbih0cnlMb2Mpe2Zvcih2YXIgaT10aGlzLnRyeUVudHJpZXMubGVuZ3RoLTE7aT49MDstLWkpe3ZhciBlbnRyeT10aGlzLnRyeUVudHJpZXNbaV07aWYoZW50cnkudHJ5TG9jPT09dHJ5TG9jKXt2YXIgcmVjb3JkPWVudHJ5LmNvbXBsZXRpb247aWYocmVjb3JkLnR5cGU9PT1cInRocm93XCIpe3ZhciB0aHJvd249cmVjb3JkLmFyZztyZXNldFRyeUVudHJ5KGVudHJ5LGkpfXJldHVybiB0aHJvd259fXRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKX0sZGVsZWdhdGVZaWVsZDpmdW5jdGlvbihpdGVyYWJsZSxyZXN1bHROYW1lLG5leHRMb2Mpe3RoaXMuZGVsZWdhdGU9e2l0ZXJhdG9yOnZhbHVlcyhpdGVyYWJsZSkscmVzdWx0TmFtZTpyZXN1bHROYW1lLG5leHRMb2M6bmV4dExvY307cmV0dXJuIENvbnRpbnVlU2VudGluZWx9fX0odHlwZW9mIGdsb2JhbD09PVwib2JqZWN0XCI/Z2xvYmFsOnR5cGVvZiB3aW5kb3c9PT1cIm9iamVjdFwiP3dpbmRvdzp0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIj9nbG9iYWw6dHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCI/d2luZG93Ont9KX0se31dfSx7fSxbMV0pOyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEJhY29uLCBCdWZmZXJpbmdTb3VyY2UsIEJ1cywgQ29tcG9zaXRlVW5zdWJzY3JpYmUsIENvbnN1bWluZ1NvdXJjZSwgRGVzYywgRGlzcGF0Y2hlciwgRW5kLCBFcnJvciwgRXZlbnQsIEV2ZW50U3RyZWFtLCBFeGNlcHRpb24sIEluaXRpYWwsIE5leHQsIE5vbmUsIE9ic2VydmFibGUsIFByb3BlcnR5LCBQcm9wZXJ0eURpc3BhdGNoZXIsIFNvbWUsIFNvdXJjZSwgVXBkYXRlQmFycmllciwgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSwgYXNzZXJ0LCBhc3NlcnRBcnJheSwgYXNzZXJ0RXZlbnRTdHJlYW0sIGFzc2VydEZ1bmN0aW9uLCBhc3NlcnROb0FyZ3VtZW50cywgYXNzZXJ0T2JzZXJ2YWJsZSwgYXNzZXJ0U3RyaW5nLCBjbG9uZUFycmF5LCBjb21wb3NpdGVVbnN1YnNjcmliZSwgY29uc3RhbnRUb0Z1bmN0aW9uLCBjb250YWluc0R1cGxpY2F0ZURlcHMsIGNvbnZlcnRBcmdzVG9GdW5jdGlvbiwgZGVzY3JpYmUsIGVuZCwgZXZlbnRJZENvdW50ZXIsIGZpbmREZXBzLCBmbGF0TWFwXywgZm9ybWVyLCBpZENvdW50ZXIsIGluaXRpYWwsIGlzQXJyYXksIGlzRmllbGRLZXksIGlzRnVuY3Rpb24sIGlzT2JzZXJ2YWJsZSwgbGF0dGVyLCBsaWZ0Q2FsbGJhY2ssIG1ha2VGdW5jdGlvbiwgbWFrZUZ1bmN0aW9uQXJncywgbWFrZUZ1bmN0aW9uXywgbWFrZU9ic2VydmFibGUsIG1ha2VTcGF3bmVyLCBuZXh0LCBub3AsIHBhcnRpYWxseUFwcGxpZWQsIHJlY3Vyc2lvbkRlcHRoLCByZWdpc3Rlck9icywgc3B5cywgdG9Db21iaW5hdG9yLCB0b0V2ZW50LCB0b0ZpZWxkRXh0cmFjdG9yLCB0b0ZpZWxkS2V5LCB0b09wdGlvbiwgdG9TaW1wbGVFeHRyYWN0b3IsIHdpdGhEZXNjcmlwdGlvbiwgd2l0aE1ldGhvZENhbGxTdXBwb3J0LCBfLCBfcmVmLFxuICAgIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG4gIEJhY29uID0ge1xuICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcIkJhY29uXCI7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLnZlcnNpb24gPSAnMC43LjQyJztcblxuICBFeGNlcHRpb24gPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwgIT09IG51bGwgPyBnbG9iYWwgOiB0aGlzKS5FcnJvcjtcblxuICBfID0ge1xuICAgIGluZGV4T2Y6IEFycmF5LnByb3RvdHlwZS5pbmRleE9mID8gZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHJldHVybiB4cy5pbmRleE9mKHgpO1xuICAgIH0gOiBmdW5jdGlvbih4cywgeCkge1xuICAgICAgdmFyIGksIHksIF9pLCBfbGVuO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0geHMubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XG4gICAgICAgIHkgPSB4c1tpXTtcbiAgICAgICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgaW5kZXhXaGVyZTogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciBpLCB5LCBfaSwgX2xlbjtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICB5ID0geHNbaV07XG4gICAgICAgIGlmIChmKHkpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIGhlYWQ6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHNbMF07XG4gICAgfSxcbiAgICBhbHdheXM6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbmVnYXRlOiBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIWYoeCk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZW1wdHk6IGZ1bmN0aW9uKHhzKSB7XG4gICAgICByZXR1cm4geHMubGVuZ3RoID09PSAwO1xuICAgIH0sXG4gICAgdGFpbDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4cy5zbGljZSgxLCB4cy5sZW5ndGgpO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgdmFyIGZpbHRlcmVkLCB4LCBfaSwgX2xlbjtcbiAgICAgIGZpbHRlcmVkID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIGlmIChmKHgpKSB7XG4gICAgICAgICAgZmlsdGVyZWQucHVzaCh4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuLCBfcmVzdWx0cztcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIF9yZXN1bHRzLnB1c2goZih4KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGtleSwgdmFsdWU7XG4gICAgICBmb3IgKGtleSBpbiB4cykge1xuICAgICAgICB2YWx1ZSA9IHhzW2tleV07XG4gICAgICAgIGYoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24oeHMpIHtcbiAgICAgIGlmIChpc0FycmF5KHhzKSkge1xuICAgICAgICByZXR1cm4geHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3hzXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRhaW5zOiBmdW5jdGlvbih4cywgeCkge1xuICAgICAgcmV0dXJuIF8uaW5kZXhPZih4cywgeCkgIT09IC0xO1xuICAgIH0sXG4gICAgaWQ6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0sXG4gICAgbGFzdDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4c1t4cy5sZW5ndGggLSAxXTtcbiAgICB9LFxuICAgIGFsbDogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciB4LCBfaSwgX2xlbjtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IF8uaWQ7XG4gICAgICB9XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHhzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHggPSB4c1tfaV07XG4gICAgICAgIGlmICghZih4KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhbnk6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgeCwgX2ksIF9sZW47XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBfLmlkO1xuICAgICAgfVxuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBpZiAoZih4KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICB3aXRob3V0OiBmdW5jdGlvbih4LCB4cykge1xuICAgICAgcmV0dXJuIF8uZmlsdGVyKChmdW5jdGlvbih5KSB7XG4gICAgICAgIHJldHVybiB5ICE9PSB4O1xuICAgICAgfSksIHhzKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oeCwgeHMpIHtcbiAgICAgIHZhciBpO1xuICAgICAgaSA9IF8uaW5kZXhPZih4cywgeCk7XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB4cy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBmb2xkOiBmdW5jdGlvbih4cywgc2VlZCwgZikge1xuICAgICAgdmFyIHgsIF9pLCBfbGVuO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSB4cy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICB4ID0geHNbX2ldO1xuICAgICAgICBzZWVkID0gZihzZWVkLCB4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWVkO1xuICAgIH0sXG4gICAgZmxhdE1hcDogZnVuY3Rpb24oZiwgeHMpIHtcbiAgICAgIHJldHVybiBfLmZvbGQoeHMsIFtdLCAoZnVuY3Rpb24oeXMsIHgpIHtcbiAgICAgICAgcmV0dXJuIHlzLmNvbmNhdChmKHgpKTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIGNhY2hlZDogZnVuY3Rpb24oZikge1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFsdWUgPSBOb25lO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgPT09IE5vbmUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGYoKTtcbiAgICAgICAgICBmID0gdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH07XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgZXgsIGludGVybmFscywga2V5LCB2YWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlY3Vyc2lvbkRlcHRoKys7XG4gICAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWy4uXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBfLm1hcChfLnRvU3RyaW5nLCBvYmopLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICAgICAgfSBlbHNlIGlmICgoKG9iaiAhPSBudWxsID8gb2JqLnRvU3RyaW5nIDogdm9pZCAwKSAhPSBudWxsKSAmJiBvYmoudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChyZWN1cnNpb25EZXB0aCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBcInsuLn1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJuYWxzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIF9yZXN1bHRzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICBpZiAoIV9faGFzUHJvcC5jYWxsKG9iaiwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICAgIHZhbHVlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICBleCA9IF9lcnJvcjtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goXy50b1N0cmluZyhrZXkpICsgXCI6XCIgKyBfLnRvU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgICByZXR1cm4gXCJ7XCIgKyBpbnRlcm5hbHMgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICByZWN1cnNpb25EZXB0aC0tO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZWN1cnNpb25EZXB0aCA9IDA7XG5cbiAgQmFjb24uXyA9IF87XG5cbiAgQmFjb24uc2NoZWR1bGVyID0ge1xuICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKGYsIGQpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGYsIGQpO1xuICAgIH0sXG4gICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGYsIGkpIHtcbiAgICAgIHJldHVybiBzZXRJbnRlcnZhbChmLCBpKTtcbiAgICB9LFxuICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfSxcbiAgICBub3c6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5mcm9tQmluZGVyID0gZnVuY3Rpb24oYmluZGVyLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgaWYgKGV2ZW50VHJhbnNmb3JtZXIgPT0gbnVsbCkge1xuICAgICAgZXZlbnRUcmFuc2Zvcm1lciA9IF8uaWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwiZnJvbUJpbmRlclwiLCBiaW5kZXIsIGV2ZW50VHJhbnNmb3JtZXIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgbmVlZHNVbmJpbmQsIHVuYmluZCwgdW5iaW5kZXIsIHVuYm91bmQ7XG4gICAgICB1bmJvdW5kID0gZmFsc2U7XG4gICAgICBuZWVkc1VuYmluZCA9IGZhbHNlO1xuICAgICAgdW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdW5ib3VuZCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdW5iaW5kZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgdW5iaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHVuYmluZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdW5ib3VuZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZWVkc1VuYmluZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdW5iaW5kZXIgPSBiaW5kZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzLCBldmVudCwgcmVwbHksIHZhbHVlLCBfaSwgX2xlbjtcbiAgICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHZhbHVlID0gZXZlbnRUcmFuc2Zvcm1lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgaWYgKCEoaXNBcnJheSh2YWx1ZSkgJiYgXy5sYXN0KHZhbHVlKSBpbnN0YW5jZW9mIEV2ZW50KSkge1xuICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gdmFsdWUubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICBldmVudCA9IHZhbHVlW19pXTtcbiAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQgPSB0b0V2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUgfHwgZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgdW5iaW5kKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBseTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5lZWRzVW5iaW5kKSB7XG4gICAgICAgIHVuYmluZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuYmluZDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi4kID0ge307XG5cbiAgQmFjb24uJC5hc0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oZXZlbnROYW1lLCBzZWxlY3RvciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIHZhciBfcmVmO1xuICAgIGlmIChpc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgICAgX3JlZiA9IFtzZWxlY3Rvciwgdm9pZCAwXSwgZXZlbnRUcmFuc2Zvcm1lciA9IF9yZWZbMF0sIHNlbGVjdG9yID0gX3JlZlsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLnNlbGVjdG9yIHx8IHRoaXMsIFwiYXNFdmVudFN0cmVhbVwiLCBldmVudE5hbWUsIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICBfdGhpcy5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5vZmYoZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pKHRoaXMpLCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgaWYgKChfcmVmID0gdHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBqUXVlcnkgIT09IG51bGwgPyBqUXVlcnkgOiB0eXBlb2YgWmVwdG8gIT09IFwidW5kZWZpbmVkXCIgJiYgWmVwdG8gIT09IG51bGwgPyBaZXB0byA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIF9yZWYuZm4uYXNFdmVudFN0cmVhbSA9IEJhY29uLiQuYXNFdmVudFN0cmVhbTtcbiAgfVxuXG4gIEJhY29uLmZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKHRhcmdldCwgZXZlbnROYW1lLCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgdmFyIHN1YiwgdW5zdWIsIF9yZWYxLCBfcmVmMiwgX3JlZjMsIF9yZWY0LCBfcmVmNSwgX3JlZjY7XG4gICAgc3ViID0gKF9yZWYxID0gKF9yZWYyID0gKF9yZWYzID0gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIpICE9IG51bGwgPyBfcmVmMyA6IHRhcmdldC5hZGRMaXN0ZW5lcikgIT0gbnVsbCA/IF9yZWYyIDogdGFyZ2V0LmJpbmQpICE9IG51bGwgPyBfcmVmMSA6IHRhcmdldC5vbjtcbiAgICB1bnN1YiA9IChfcmVmNCA9IChfcmVmNSA9IChfcmVmNiA9IHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKSAhPSBudWxsID8gX3JlZjYgOiB0YXJnZXQucmVtb3ZlTGlzdGVuZXIpICE9IG51bGwgPyBfcmVmNSA6IHRhcmdldC51bmJpbmQpICE9IG51bGwgPyBfcmVmNCA6IHRhcmdldC5vZmY7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tRXZlbnRUYXJnZXRcIiwgdGFyZ2V0LCBldmVudE5hbWUsIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgc3ViLmNhbGwodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdW5zdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9O1xuICAgIH0sIGV2ZW50VHJhbnNmb3JtZXIpKTtcbiAgfTtcblxuICBCYWNvbi5mcm9tUHJvbWlzZSA9IGZ1bmN0aW9uKHByb21pc2UsIGFib3J0KSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJmcm9tUHJvbWlzZVwiLCBwcm9taXNlLCBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHByb21pc2UudGhlbihoYW5kbGVyLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKG5ldyBFcnJvcihlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGFib3J0KSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBwcm9taXNlLmFib3J0ID09PSBcImZ1bmN0aW9uXCIgPyBwcm9taXNlLmFib3J0KCkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSkpKTtcbiAgfTtcblxuICBCYWNvbi5ub01vcmUgPSBbXCI8bm8tbW9yZT5cIl07XG5cbiAgQmFjb24ubW9yZSA9IFtcIjxtb3JlPlwiXTtcblxuICBCYWNvbi5sYXRlciA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwibGF0ZXJcIiwgZGVsYXksIHZhbHVlLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW3ZhbHVlLCBlbmQoKV07XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNlcXVlbnRpYWxseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwic2VxdWVudGlhbGx5XCIsIGRlbGF5LCB2YWx1ZXMsIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdmFsdWVzW2luZGV4KytdO1xuICAgICAgaWYgKGluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbmQoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24ucmVwZWF0ZWRseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwicmVwZWF0ZWRseVwiLCBkZWxheSwgdmFsdWVzLCBCYWNvbi5mcm9tUG9sbChkZWxheSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWVzW2luZGV4KysgJSB2YWx1ZXMubGVuZ3RoXTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uc3B5ID0gZnVuY3Rpb24oc3B5KSB7XG4gICAgcmV0dXJuIHNweXMucHVzaChzcHkpO1xuICB9O1xuXG4gIHNweXMgPSBbXTtcblxuICByZWdpc3Rlck9icyA9IGZ1bmN0aW9uKG9icykge1xuICAgIHZhciBzcHksIF9pLCBfbGVuO1xuICAgIGlmIChzcHlzLmxlbmd0aCkge1xuICAgICAgaWYgKCFyZWdpc3Rlck9icy5ydW5uaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVnaXN0ZXJPYnMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzcHlzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgICBzcHkgPSBzcHlzW19pXTtcbiAgICAgICAgICAgIHNweShvYnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBkZWxldGUgcmVnaXN0ZXJPYnMucnVubmluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIHdpdGhNZXRob2RDYWxsU3VwcG9ydCA9IGZ1bmN0aW9uKHdyYXBwZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY29udGV4dCwgZiwgbWV0aG9kTmFtZTtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKHR5cGVvZiBmID09PSBcIm9iamVjdFwiICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnRleHQgPSBmO1xuICAgICAgICBtZXRob2ROYW1lID0gYXJnc1swXTtcbiAgICAgICAgZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0W21ldGhvZE5hbWVdLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZWQuYXBwbHkobnVsbCwgW2ZdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncykpKTtcbiAgICB9O1xuICB9O1xuXG4gIGxpZnRDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2MsIHdyYXBwZWQpIHtcbiAgICByZXR1cm4gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGYsIHN0cmVhbTtcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgc3RyZWFtID0gcGFydGlhbGx5QXBwbGllZCh3cmFwcGVkLCBbXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBfX3NsaWNlLmNhbGwodmFsdWVzKS5jb25jYXQoW2NhbGxiYWNrXSkpO1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBkZXNjLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoYXJncykuZmxhdE1hcChzdHJlYW0pXSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmZyb21DYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21DYWxsYmFja1wiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0sIChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kKCldO1xuICAgIH0pKTtcbiAgfSk7XG5cbiAgQmFjb24uZnJvbU5vZGVDYWxsYmFjayA9IGxpZnRDYWxsYmFjayhcImZyb21Ob2RlQ2FsbGJhY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9LCBmdW5jdGlvbihlcnJvciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gW25ldyBFcnJvcihlcnJvciksIGVuZCgpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbdmFsdWUsIGVuZCgpXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgQmFjb24uZnJvbVBvbGwgPSBmdW5jdGlvbihkZWxheSwgcG9sbCkge1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24oQmFjb24sIFwiZnJvbVBvbGxcIiwgZGVsYXksIHBvbGwsIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHZhciBpZDtcbiAgICAgIGlkID0gQmFjb24uc2NoZWR1bGVyLnNldEludGVydmFsKGhhbmRsZXIsIGRlbGF5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgIH07XG4gICAgfSksIHBvbGwpKTtcbiAgfTtcblxuICBCYWNvbi5pbnRlcnZhbCA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImludGVydmFsXCIsIGRlbGF5LCB2YWx1ZSwgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5leHQodmFsdWUpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9wZXJ0eShkZXNjcmliZShCYWNvbiwgXCJjb25zdGFudFwiLCB2YWx1ZSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsoaW5pdGlhbCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLm5ldmVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShCYWNvbiwgXCJuZXZlclwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLm9uY2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwib25jZVwiLCB2YWx1ZSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmQoKSk7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmZyb21BcnJheSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHZhciBpO1xuICAgIGFzc2VydEFycmF5KHZhbHVlcyk7XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKEJhY29uLCBcImZyb21BcnJheVwiLCB2YWx1ZXMsIEJhY29uLm5ldmVyKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpID0gMDtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUoQmFjb24sIFwiZnJvbUFycmF5XCIsIHZhbHVlcyksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIHB1c2gsIHJlcGx5LCB1bnN1YmQ7XG4gICAgICAgIHVuc3ViZCA9IGZhbHNlO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHB1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgaWYgKChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSAmJiAhdW5zdWJkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpKytdO1xuICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRvRXZlbnQodmFsdWUpKTtcbiAgICAgICAgICAgIGlmIChyZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIGlmIChpID09PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZW5kKCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLmFmdGVyVHJhbnNhY3Rpb24ocHVzaCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHB1c2goKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB1bnN1YmQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLm1lcmdlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmVhbXM7XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUuYXBwbHkobnVsbCwgW0JhY29uLCBcIm1lcmdlQWxsXCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcykpKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgZW5kcywgc2lua3MsIHNtYXJ0U2luaztcbiAgICAgICAgZW5kcyA9IDA7XG4gICAgICAgIHNtYXJ0U2luayA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih1bnN1YkJvdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICAgIGVuZHMrKztcbiAgICAgICAgICAgICAgICBpZiAoZW5kcyA9PT0gc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgIHVuc3ViQm90aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHNpbmtzID0gXy5tYXAoc21hcnRTaW5rLCBzdHJlYW1zKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZVVuc3Vic2NyaWJlLmFwcGx5KG51bGwsIHNpbmtzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uemlwQXNBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiemlwQXNBcnJheVwiXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24uemlwV2l0aChzdHJlYW1zLCBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4cztcbiAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiB4cztcbiAgICB9KV0pKTtcbiAgfTtcblxuICBCYWNvbi56aXBXaXRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXMsIF9yZWYxO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlmICghaXNGdW5jdGlvbihmKSkge1xuICAgICAgX3JlZjEgPSBbZiwgc3RyZWFtc1swXV0sIHN0cmVhbXMgPSBfcmVmMVswXSwgZiA9IF9yZWYxWzFdO1xuICAgIH1cbiAgICBzdHJlYW1zID0gXy5tYXAoKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLnRvRXZlbnRTdHJlYW0oKTtcbiAgICB9KSwgc3RyZWFtcyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbQmFjb24sIFwiemlwV2l0aFwiLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24ud2hlbihzdHJlYW1zLCBmKV0pKTtcbiAgfTtcblxuICBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzLCBzb3VyY2VzLCBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIGlmIChzdHJlYW1zLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KHN0cmVhbXNbMF0pKSB7XG4gICAgICBzdHJlYW1zID0gc3RyZWFtc1swXTtcbiAgICB9XG4gICAgc291cmNlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfaSwgX2xlbiwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzdHJlYW1zLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBzdHJlYW1zW19pXTtcbiAgICAgICAgX3Jlc3VsdHMucHVzaChuZXcgQnVmZmVyaW5nU291cmNlKHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImdyb3VwU2ltdWx0YW5lb3VzXCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4cztcbiAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHJldHVybiB4cztcbiAgICB9KSldKSk7XG4gIH07XG5cbiAgQmFjb24uY29tYmluZUFzQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZXgsIHMsIHNvdXJjZXMsIHN0cmVhbSwgc3RyZWFtcywgX2ksIF9sZW47XG4gICAgc3RyZWFtcyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBmb3IgKGluZGV4ID0gX2kgPSAwLCBfbGVuID0gc3RyZWFtcy5sZW5ndGg7IF9pIDwgX2xlbjsgaW5kZXggPSArK19pKSB7XG4gICAgICBzdHJlYW0gPSBzdHJlYW1zW2luZGV4XTtcbiAgICAgIGlmICghKGlzT2JzZXJ2YWJsZShzdHJlYW0pKSkge1xuICAgICAgICBzdHJlYW1zW2luZGV4XSA9IEJhY29uLmNvbnN0YW50KHN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgc291cmNlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9qLCBfbGVuMSwgX3Jlc3VsdHM7XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IHN0cmVhbXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgcyA9IHN0cmVhbXNbX2pdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2gobmV3IFNvdXJjZShzLCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfSkoKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcImNvbWJpbmVBc0FycmF5XCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoc3RyZWFtcyksIFtCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzO1xuICAgICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHJldHVybiB4cztcbiAgICAgIH0pKS50b1Byb3BlcnR5KCldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBCYWNvbi5jb25zdGFudChbXSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLm9uVmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbXMsIF9pO1xuICAgIHN0cmVhbXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBfaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChfaSA9IDAsIFtdKSwgZiA9IGFyZ3VtZW50c1tfaSsrXTtcbiAgICByZXR1cm4gQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykub25WYWx1ZXMoZik7XG4gIH07XG5cbiAgQmFjb24uY29tYmluZVdpdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgc3RyZWFtcztcbiAgICBmID0gYXJndW1lbnRzWzBdLCBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uLmFwcGx5KG51bGwsIFtCYWNvbiwgXCJjb21iaW5lV2l0aFwiLCBmXS5jb25jYXQoX19zbGljZS5jYWxsKHN0cmVhbXMpLCBbQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgdmFsdWVzKTtcbiAgICB9KV0pKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgIHZhciBhcHBseVN0cmVhbVZhbHVlLCBjb21iaW5hdG9yLCBjb21waWxlLCBjb21waWxlVGVtcGxhdGUsIGNvbnN0YW50VmFsdWUsIGN1cnJlbnQsIGZ1bmNzLCBta0NvbnRleHQsIHNldFZhbHVlLCBzdHJlYW1zO1xuICAgIGZ1bmNzID0gW107XG4gICAgc3RyZWFtcyA9IFtdO1xuICAgIGN1cnJlbnQgPSBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgcmV0dXJuIGN0eFN0YWNrW2N0eFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgc2V0VmFsdWUgPSBmdW5jdGlvbihjdHhTdGFjaywga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQoY3R4U3RhY2spW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIGFwcGx5U3RyZWFtVmFsdWUgPSBmdW5jdGlvbihrZXksIGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2ssIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWVzW2luZGV4XSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWUpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIG1rQ29udGV4dCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoaXNBcnJheSh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcGlsZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBwb3BDb250ZXh0LCBwdXNoQ29udGV4dDtcbiAgICAgIGlmIChpc09ic2VydmFibGUodmFsdWUpKSB7XG4gICAgICAgIHN0cmVhbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKGFwcGx5U3RyZWFtVmFsdWUoa2V5LCBzdHJlYW1zLmxlbmd0aCAtIDEpKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IE9iamVjdCh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIHB1c2hDb250ZXh0ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q29udGV4dDtcbiAgICAgICAgICAgIG5ld0NvbnRleHQgPSBta0NvbnRleHQodmFsdWUpO1xuICAgICAgICAgICAgc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgbmV3Q29udGV4dCk7XG4gICAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucHVzaChuZXdDb250ZXh0KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBwb3BDb250ZXh0ID0gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgICByZXR1cm4gY3R4U3RhY2sucG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmNzLnB1c2gocHVzaENvbnRleHQoa2V5KSk7XG4gICAgICAgIGNvbXBpbGVUZW1wbGF0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jcy5wdXNoKHBvcENvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2goY29uc3RhbnRWYWx1ZShrZXksIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUgPSBmdW5jdGlvbih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIF8uZWFjaCh0ZW1wbGF0ZSwgY29tcGlsZSk7XG4gICAgfTtcbiAgICBjb21waWxlVGVtcGxhdGUodGVtcGxhdGUpO1xuICAgIGNvbWJpbmF0b3IgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciBjdHhTdGFjaywgZiwgcm9vdENvbnRleHQsIF9pLCBfbGVuO1xuICAgICAgcm9vdENvbnRleHQgPSBta0NvbnRleHQodGVtcGxhdGUpO1xuICAgICAgY3R4U3RhY2sgPSBbcm9vdENvbnRleHRdO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBmdW5jcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICBmID0gZnVuY3NbX2ldO1xuICAgICAgICBmKGN0eFN0YWNrLCB2YWx1ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvb3RDb250ZXh0O1xuICAgIH07XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJjb21iaW5lVGVtcGxhdGVcIiwgdGVtcGxhdGUsIEJhY29uLmNvbWJpbmVBc0FycmF5KHN0cmVhbXMpLm1hcChjb21iaW5hdG9yKSk7XG4gIH07XG5cbiAgQmFjb24ucmV0cnkgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGRlbGF5LCBpc1JldHJ5YWJsZSwgbWF4UmV0cmllcywgcmV0cmllcywgcmV0cnksIHNvdXJjZTtcbiAgICBpZiAoIWlzRnVuY3Rpb24ob3B0aW9ucy5zb3VyY2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiJ3NvdXJjZScgb3B0aW9uIGhhcyB0byBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBzb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcbiAgICByZXRyaWVzID0gb3B0aW9ucy5yZXRyaWVzIHx8IDA7XG4gICAgbWF4UmV0cmllcyA9IG9wdGlvbnMubWF4UmV0cmllcyB8fCByZXRyaWVzO1xuICAgIGRlbGF5ID0gb3B0aW9ucy5kZWxheSB8fCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgaXNSZXRyeWFibGUgPSBvcHRpb25zLmlzUmV0cnlhYmxlIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXRyeSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgIHZhciBkZWxheWVkUmV0cnksIG5leHRBdHRlbXB0T3B0aW9ucztcbiAgICAgIG5leHRBdHRlbXB0T3B0aW9ucyA9IHtcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIHJldHJpZXM6IHJldHJpZXMgLSAxLFxuICAgICAgICBtYXhSZXRyaWVzOiBtYXhSZXRyaWVzLFxuICAgICAgICBkZWxheTogZGVsYXksXG4gICAgICAgIGlzUmV0cnlhYmxlOiBpc1JldHJ5YWJsZVxuICAgICAgfTtcbiAgICAgIGRlbGF5ZWRSZXRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQmFjb24ucmV0cnkobmV4dEF0dGVtcHRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXkoY29udGV4dCkpLmZpbHRlcihmYWxzZSkuY29uY2F0KEJhY29uLm9uY2UoKS5mbGF0TWFwKGRlbGF5ZWRSZXRyeSkpO1xuICAgIH07XG4gICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbihCYWNvbiwgXCJyZXRyeVwiLCBvcHRpb25zLCBzb3VyY2UoKS5mbGF0TWFwRXJyb3IoZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGlzUmV0cnlhYmxlKGUpICYmIHJldHJpZXMgPiAwKSB7XG4gICAgICAgIHJldHVybiByZXRyeSh7XG4gICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgcmV0cmllc0RvbmU6IG1heFJldHJpZXMgLSByZXRyaWVzXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UobmV3IEVycm9yKGUpKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgZXZlbnRJZENvdW50ZXIgPSAwO1xuXG4gIEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50KCkge1xuICAgICAgdGhpcy5pZCA9ICsrZXZlbnRJZENvdW50ZXI7XG4gICAgfVxuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzSW5pdGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudDtcblxuICB9KSgpO1xuXG4gIE5leHQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5leHQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBOZXh0KHZhbHVlRiwgZWFnZXIpIHtcbiAgICAgIE5leHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyk7XG4gICAgICBpZiAoIWVhZ2VyICYmIGlzRnVuY3Rpb24odmFsdWVGKSB8fCB2YWx1ZUYgaW5zdGFuY2VvZiBOZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdmFsdWVGO1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdmFsdWVGO1xuICAgICAgfVxuICAgIH1cblxuICAgIE5leHQucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlRiBpbnN0YW5jZW9mIE5leHQpIHtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdGhpcy52YWx1ZUYudmFsdWUoKTtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWVGKSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHRoaXMudmFsdWVGKCk7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudmFsdWVJbnRlcm5hbDtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUuZm1hcCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHZhciBldmVudCwgdmFsdWU7XG4gICAgICBpZiAodGhpcy52YWx1ZUludGVybmFsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZUludGVybmFsO1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZih2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC52YWx1ZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKHRoaXMudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXy50b1N0cmluZyh0aGlzLnZhbHVlKCkpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBOZXh0O1xuXG4gIH0pKEV2ZW50KTtcblxuICBJbml0aWFsID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbml0aWFsLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gSW5pdGlhbCgpIHtcbiAgICAgIHJldHVybiBJbml0aWFsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIEluaXRpYWwucHJvdG90eXBlLmlzSW5pdGlhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEluaXRpYWwucHJvdG90eXBlLmlzTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IEluaXRpYWwodmFsdWUpO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS50b05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgTmV4dCh0aGlzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEluaXRpYWw7XG5cbiAgfSkoTmV4dCk7XG5cbiAgRW5kID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFbmQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBFbmQoKSB7XG4gICAgICByZXR1cm4gRW5kLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIEVuZC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVuZD5cIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVuZDtcblxuICB9KShFdmVudCk7XG5cbiAgRXJyb3IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEVycm9yLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gRXJyb3IoZXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG5cbiAgICBFcnJvci5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCI8ZXJyb3I+IFwiICsgXy50b1N0cmluZyh0aGlzLmVycm9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVycm9yO1xuXG4gIH0pKEV2ZW50KTtcblxuICBpZENvdW50ZXIgPSAwO1xuXG4gIE9ic2VydmFibGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShkZXNjKSB7XG4gICAgICB0aGlzLmlkID0gKytpZENvdW50ZXI7XG4gICAgICB3aXRoRGVzY3JpcHRpb24oZGVzYywgdGhpcyk7XG4gICAgICB0aGlzLmluaXRpYWxEZXNjID0gdGhpcy5kZXNjO1xuICAgIH1cblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLndyYXBwZWRTdWJzY3JpYmUodGhpcywgc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZUludGVybmFsID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25WYWx1ZXMgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gdGhpcy5vblZhbHVlKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImVycm9yc1wiLCB0aGlzLmZpbHRlcihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZpbHRlclwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnRha2VXaGlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGY7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwidGFrZVdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuZmlsdGVyKGYpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZW5kT25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGY7XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImVuZE9uRXJyb3JcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkgJiYgZihldmVudC5lcnJvcikpIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZSA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICBpZiAoY291bnQgPD0gMCkge1xuICAgICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlXCIsIGNvdW50LCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmICghZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIHA7XG4gICAgICBwID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmIChwIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHAuc2FtcGxlZEJ5KHRoaXMsIGZvcm1lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIHAsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwibWFwXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQuZm1hcChmKSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJtYXBFcnJvclwiLCBmLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKG5leHQoZihldmVudC5lcnJvcikpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXBFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJtYXBFbmRcIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIHRoaXMucHVzaChuZXh0KGYoZXZlbnQpKSk7XG4gICAgICAgICAgdGhpcy5wdXNoKGVuZCgpKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmRvQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZjtcbiAgICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZG9BY3Rpb25cIiwgZiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbihjb3VudCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBcIiwgY291bnQsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwRHVwbGljYXRlcyA9IGZ1bmN0aW9uKGlzRXF1YWwpIHtcbiAgICAgIGlmIChpc0VxdWFsID09IG51bGwpIHtcbiAgICAgICAgaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJza2lwRHVwbGljYXRlc1wiLCB0aGlzLndpdGhTdGF0ZU1hY2hpbmUoTm9uZSwgZnVuY3Rpb24ocHJldiwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIFtwcmV2LCBbZXZlbnRdXTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0luaXRpYWwoKSB8fCBwcmV2ID09PSBOb25lIHx8ICFpc0VxdWFsKHByZXYuZ2V0KCksIGV2ZW50LnZhbHVlKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIFtuZXcgU29tZShldmVudC52YWx1ZSgpKSwgW2V2ZW50XV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtwcmV2LCBbXV07XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcEVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBFcnJvcnNcIiwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aFN0YXRlTWFjaGluZSA9IGZ1bmN0aW9uKGluaXRTdGF0ZSwgZikge1xuICAgICAgdmFyIHN0YXRlO1xuICAgICAgc3RhdGUgPSBpbml0U3RhdGU7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwid2l0aFN0YXRlTWFjaGluZVwiLCBpbml0U3RhdGUsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGZyb21GLCBuZXdTdGF0ZSwgb3V0cHV0LCBvdXRwdXRzLCByZXBseSwgX2ksIF9sZW47XG4gICAgICAgIGZyb21GID0gZihzdGF0ZSwgZXZlbnQpO1xuICAgICAgICBuZXdTdGF0ZSA9IGZyb21GWzBdLCBvdXRwdXRzID0gZnJvbUZbMV07XG4gICAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBvdXRwdXRzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgICAgb3V0cHV0ID0gb3V0cHV0c1tfaV07XG4gICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gob3V0cHV0KTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbihzZWVkLCBmKSB7XG4gICAgICB2YXIgYWNjLCByZXN1bHRQcm9wZXJ0eSwgc3Vic2NyaWJlO1xuICAgICAgZiA9IHRvQ29tYmluYXRvcihmKTtcbiAgICAgIGFjYyA9IHRvT3B0aW9uKHNlZWQpO1xuICAgICAgc3Vic2NyaWJlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgdmFyIGluaXRTZW50LCByZXBseSwgc2VuZEluaXQsIHVuc3ViO1xuICAgICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgICAgdW5zdWIgPSBub3A7XG4gICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWluaXRTZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2MuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXBseSA9IHNpbmsobmV3IEluaXRpYWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgICB1bnN1YigpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuc3ViID0gbm9wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICB1bnN1YiA9IF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCwgcHJldjtcbiAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgIGlmIChpbml0U2VudCAmJiBldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2ID0gYWNjLmdldE9yRWxzZSh2b2lkIDApO1xuICAgICAgICAgICAgICAgIG5leHQgPSBmKHByZXYsIGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIGFjYyA9IG5ldyBTb21lKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50LmFwcGx5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKHJlc3VsdFByb3BlcnR5LCBzZW5kSW5pdCk7XG4gICAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICByZXR1cm4gcmVzdWx0UHJvcGVydHkgPSBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJzY2FuXCIsIHNlZWQsIGYpLCBzdWJzY3JpYmUpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkID0gZnVuY3Rpb24oc2VlZCwgZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZvbGRcIiwgc2VlZCwgZiwgdGhpcy5zY2FuKHNlZWQsIGYpLnNhbXBsZWRCeSh0aGlzLmZpbHRlcihmYWxzZSkubWFwRW5kKCkudG9Qcm9wZXJ0eSgpKSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uKG90aGVyLCBmKSB7XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBBcnJheTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ6aXBcIiwgb3RoZXIsIEJhY29uLnppcFdpdGgoW3RoaXMsIG90aGVyXSwgZikpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24oc3RhcnQsIGYpIHtcbiAgICAgIGYgPSB0b0NvbWJpbmF0b3IoZik7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGlmZlwiLCBzdGFydCwgZiwgdGhpcy5zY2FuKFtzdGFydF0sIGZ1bmN0aW9uKHByZXZUdXBsZSwgbmV4dCkge1xuICAgICAgICByZXR1cm4gW25leHQsIGYocHJldlR1cGxlWzBdLCBuZXh0KV07XG4gICAgICB9KS5maWx0ZXIoZnVuY3Rpb24odHVwbGUpIHtcbiAgICAgICAgcmV0dXJuIHR1cGxlLmxlbmd0aCA9PT0gMjtcbiAgICAgIH0pLm1hcChmdW5jdGlvbih0dXBsZSkge1xuICAgICAgICByZXR1cm4gdHVwbGVbMV07XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEZpcnN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGxpbWl0O1xuICAgICAgbGltaXQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpcywgXCJmbGF0TWFwV2l0aENvbmN1cnJlbmN5TGltaXRcIiwgbGltaXRdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJncyksIFtmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmdzKSwgZmFsc2UsIGxpbWl0KV0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcExhdGVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGYsIHN0cmVhbTtcbiAgICAgIGYgPSBtYWtlU3Bhd25lcihhcmd1bWVudHMpO1xuICAgICAgc3RyZWFtID0gdGhpcy50b0V2ZW50U3RyZWFtKCk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZmxhdE1hcExhdGVzdFwiLCBmLCBzdHJlYW0uZmxhdE1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbWFrZU9ic2VydmFibGUoZih2YWx1ZSkpLnRha2VVbnRpbChzdHJlYW0pO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRXJyb3IgPSBmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImZsYXRNYXBFcnJvclwiLCBmbiwgdGhpcy5tYXBFcnJvcihmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihlcnIpO1xuICAgICAgfSkuZmxhdE1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oeC5lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcENvbmNhdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbi5hcHBseShudWxsLCBbdGhpcywgXCJmbGF0TWFwQ29uY2F0XCJdLmNvbmNhdChfX3NsaWNlLmNhbGwoYXJndW1lbnRzKSwgW3RoaXMuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0LmFwcGx5KHRoaXMsIFsxXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3VtZW50cykpKV0pKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbihtaW5pbXVtSW50ZXJ2YWwpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJpbmdUaHJvdHRsZVwiLCBtaW5pbXVtSW50ZXJ2YWwsIHRoaXMuZmxhdE1hcENvbmNhdChmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKHgpLmNvbmNhdChCYWNvbi5sYXRlcihtaW5pbXVtSW50ZXJ2YWwpLmZpbHRlcihmYWxzZSkpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJub3RcIiwgdGhpcy5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIXg7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gdHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgPyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfX3NsaWNlLmNhbGwoYXJncykuY29uY2F0KFtldmVudC5sb2coKV0pKSA6IHZvaWQgMCA6IHZvaWQgMDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnNsaWRpbmdXaW5kb3cgPSBmdW5jdGlvbihuLCBtaW5WYWx1ZXMpIHtcbiAgICAgIGlmIChtaW5WYWx1ZXMgPT0gbnVsbCkge1xuICAgICAgICBtaW5WYWx1ZXMgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNsaWRpbmdXaW5kb3dcIiwgbiwgbWluVmFsdWVzLCB0aGlzLnNjYW4oW10sIChmdW5jdGlvbih3aW5kb3csIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuY29uY2F0KFt2YWx1ZV0pLnNsaWNlKC1uKTtcbiAgICAgIH0pKS5maWx0ZXIoKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA+PSBtaW5WYWx1ZXM7XG4gICAgICB9KSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24ob3RoZXIsIGYpIHtcbiAgICAgIHZhciBjb21iaW5hdG9yO1xuICAgICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihmKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJjb21iaW5lXCIsIG90aGVyLCBmLCBCYWNvbi5jb21iaW5lQXNBcnJheSh0aGlzLCBvdGhlcikubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gY29tYmluYXRvcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKGNhc2VzKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVjb2RlXCIsIGNhc2VzLCB0aGlzLmNvbWJpbmUoQmFjb24uY29tYmluZVRlbXBsYXRlKGNhc2VzKSwgZnVuY3Rpb24oa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlc1trZXldO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5hd2FpdGluZyA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYXdhaXRpbmdcIiwgb3RoZXIsIEJhY29uLmdyb3VwU2ltdWx0YW5lb3VzKHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24oX2FyZykge1xuICAgICAgICB2YXIgbXlWYWx1ZXMsIG90aGVyVmFsdWVzO1xuICAgICAgICBteVZhbHVlcyA9IF9hcmdbMF0sIG90aGVyVmFsdWVzID0gX2FyZ1sxXTtcbiAgICAgICAgcmV0dXJuIG90aGVyVmFsdWVzLmxlbmd0aCA9PT0gMDtcbiAgICAgIH0pLnRvUHJvcGVydHkoZmFsc2UpLnNraXBEdXBsaWNhdGVzKCkpO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZGVzY3JpYmUuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5hcHBseSh0aGlzKTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzYy50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxEZXNjLmRlcHMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG5cbiAgfSkoKTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5yZWR1Y2UgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmFzc2lnbiA9IE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWU7XG5cbiAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuaW5zcGVjdCA9IE9ic2VydmFibGUucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4gIGZsYXRNYXBfID0gZnVuY3Rpb24ocm9vdCwgZiwgZmlyc3RPbmx5LCBsaW1pdCkge1xuICAgIHZhciBjaGlsZERlcHMsIHJlc3VsdCwgcm9vdERlcDtcbiAgICByb290RGVwID0gW3Jvb3RdO1xuICAgIGNoaWxkRGVwcyA9IFtdO1xuICAgIHJlc3VsdCA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShyb290LCBcImZsYXRNYXBcIiArIChmaXJzdE9ubHkgPyBcIkZpcnN0XCIgOiBcIlwiKSwgZiksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBjaGVja0VuZCwgY2hlY2tRdWV1ZSwgY29tcG9zaXRlLCBxdWV1ZSwgc3Bhd247XG4gICAgICBjb21wb3NpdGUgPSBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoKTtcbiAgICAgIHF1ZXVlID0gW107XG4gICAgICBzcGF3biA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBjaGlsZDtcbiAgICAgICAgY2hpbGQgPSBtYWtlT2JzZXJ2YWJsZShmKGV2ZW50LnZhbHVlKCkpKTtcbiAgICAgICAgY2hpbGREZXBzLnB1c2goY2hpbGQpO1xuICAgICAgICByZXR1cm4gY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICAgIHJldHVybiBjaGlsZC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgXy5yZW1vdmUoY2hpbGQsIGNoaWxkRGVwcyk7XG4gICAgICAgICAgICAgIGNoZWNrUXVldWUoKTtcbiAgICAgICAgICAgICAgY2hlY2tFbmQodW5zdWJNZSk7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBJbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBseSA9IHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBjaGVja1F1ZXVlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBldmVudDtcbiAgICAgICAgZXZlbnQgPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gc3Bhd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hlY2tFbmQgPSBmdW5jdGlvbih1bnN1Yikge1xuICAgICAgICB1bnN1YigpO1xuICAgICAgICBpZiAoY29tcG9zaXRlLmVtcHR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gc2luayhlbmQoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb21wb3NpdGUuYWRkKGZ1bmN0aW9uKF9fLCB1bnN1YlJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3QuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrRW5kKHVuc3ViUm9vdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0T25seSAmJiBjb21wb3NpdGUuY291bnQoKSA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcG9zaXRlLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gbGltaXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcG9zaXRlLnVuc3Vic2NyaWJlO1xuICAgIH0pO1xuICAgIHJlc3VsdC5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjaGlsZERlcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByb290RGVwLmNvbmNhdChjaGlsZERlcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJvb3REZXA7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIEV2ZW50U3RyZWFtID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFdmVudFN0cmVhbSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEV2ZW50U3RyZWFtKGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVzYykpIHtcbiAgICAgICAgaGFuZGxlciA9IHN1YnNjcmliZTtcbiAgICAgICAgc3Vic2NyaWJlID0gZGVzYztcbiAgICAgICAgZGVzYyA9IFtdO1xuICAgICAgfVxuICAgICAgRXZlbnRTdHJlYW0uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzYyk7XG4gICAgICBhc3NlcnRGdW5jdGlvbihzdWJzY3JpYmUpO1xuICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICAgIHJlZ2lzdGVyT2JzKHRoaXMpO1xuICAgIH1cblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiZGVsYXlcIiwgZGVsYXksIHRoaXMuZmxhdE1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXksIHZhbHVlKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJkZWJvdW5jZVwiLCBkZWxheSwgdGhpcy5mbGF0TWFwTGF0ZXN0KGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5sYXRlcihkZWxheSwgdmFsdWUpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2VJbW1lZGlhdGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImRlYm91bmNlSW1tZWRpYXRlXCIsIGRlbGF5LCB0aGlzLmZsYXRNYXBGaXJzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQmFjb24ub25jZSh2YWx1ZSkuY29uY2F0KEJhY29uLmxhdGVyKGRlbGF5KS5maWx0ZXIoZmFsc2UpKTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0aHJvdHRsZVwiLCBkZWxheSwgdGhpcy5idWZmZXJXaXRoVGltZShkZWxheSkubWFwKGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJidWZmZXJXaXRoVGltZVwiLCBkZWxheSwgdGhpcy5idWZmZXJXaXRoVGltZU9yQ291bnQoZGVsYXksIE51bWJlci5NQVhfVkFMVUUpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhDb3VudCA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyV2l0aENvdW50XCIsIGNvdW50LCB0aGlzLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCh2b2lkIDAsIGNvdW50KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXJXaXRoVGltZU9yQ291bnQgPSBmdW5jdGlvbihkZWxheSwgY291bnQpIHtcbiAgICAgIHZhciBmbHVzaE9yU2NoZWR1bGU7XG4gICAgICBmbHVzaE9yU2NoZWR1bGUgPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci52YWx1ZXMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICAgIHJldHVybiBidWZmZXIuZmx1c2goKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZWxheSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGJ1ZmZlci5zY2hlZHVsZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcImJ1ZmZlcldpdGhUaW1lT3JDb3VudFwiLCBkZWxheSwgY291bnQsIHRoaXMuYnVmZmVyKGRlbGF5LCBmbHVzaE9yU2NoZWR1bGUsIGZsdXNoT3JTY2hlZHVsZSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyID0gZnVuY3Rpb24oZGVsYXksIG9uSW5wdXQsIG9uRmx1c2gpIHtcbiAgICAgIHZhciBidWZmZXIsIGRlbGF5TXMsIHJlcGx5O1xuICAgICAgaWYgKG9uSW5wdXQgPT0gbnVsbCkge1xuICAgICAgICBvbklucHV0ID0gbm9wO1xuICAgICAgfVxuICAgICAgaWYgKG9uRmx1c2ggPT0gbnVsbCkge1xuICAgICAgICBvbkZsdXNoID0gbm9wO1xuICAgICAgfVxuICAgICAgYnVmZmVyID0ge1xuICAgICAgICBzY2hlZHVsZWQ6IGZhbHNlLFxuICAgICAgICBlbmQ6IHZvaWQgMCxcbiAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgZmx1c2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICB0aGlzLnNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmICh0aGlzLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChuZXh0KHRoaXMudmFsdWVzKSk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaCh0aGlzLmVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9uRmx1c2godGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2godGhpcy5lbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NoZWR1bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghdGhpcy5zY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxheSgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkodGhpcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIGlmICghaXNGdW5jdGlvbihkZWxheSkpIHtcbiAgICAgICAgZGVsYXlNcyA9IGRlbGF5O1xuICAgICAgICBkZWxheSA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICByZXR1cm4gQmFjb24uc2NoZWR1bGVyLnNldFRpbWVvdXQoZiwgZGVsYXlNcyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYnVmZmVyXCIsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgYnVmZmVyLnB1c2ggPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgYnVmZmVyLmVuZCA9IGV2ZW50O1xuICAgICAgICAgIGlmICghYnVmZmVyLnNjaGVkdWxlZCkge1xuICAgICAgICAgICAgYnVmZmVyLmZsdXNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZmZlci52YWx1ZXMucHVzaChldmVudC52YWx1ZSgpKTtcbiAgICAgICAgICBvbklucHV0KGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbihyaWdodCkge1xuICAgICAgdmFyIGxlZnQ7XG4gICAgICBhc3NlcnRFdmVudFN0cmVhbShyaWdodCk7XG4gICAgICBsZWZ0ID0gdGhpcztcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24obGVmdCwgXCJtZXJnZVwiLCByaWdodCwgQmFjb24ubWVyZ2VBbGwodGhpcywgcmlnaHQpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRvUHJvcGVydHkgPSBmdW5jdGlvbihpbml0VmFsdWVfKSB7XG4gICAgICB2YXIgZGlzcCwgaW5pdFZhbHVlO1xuICAgICAgaW5pdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMCA/IE5vbmUgOiB0b09wdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGluaXRWYWx1ZV87XG4gICAgICB9KTtcbiAgICAgIGRpc3AgPSB0aGlzLmRpc3BhdGNoZXI7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KGRlc2NyaWJlKHRoaXMsIFwidG9Qcm9wZXJ0eVwiLCBpbml0VmFsdWVfKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgaW5pdFNlbnQsIHJlcGx5LCBzZW5kSW5pdCwgdW5zdWI7XG4gICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGluaXRWYWx1ZS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGluaXRTZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKG5ldyBJbml0aWFsKHZhbHVlKSk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdW5zdWIgPSBkaXNwLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAoaW5pdFNlbnQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIGluaXRWYWx1ZSA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uKHNhbXBsZXIsIGNvbWJpbmF0b3IpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJzYW1wbGVkQnlcIiwgc2FtcGxlciwgY29tYmluYXRvciwgdGhpcy50b1Byb3BlcnR5KCkuc2FtcGxlZEJ5KHNhbXBsZXIsIGNvbWJpbmF0b3IpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgICB2YXIgbGVmdDtcbiAgICAgIGxlZnQgPSB0aGlzO1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZShsZWZ0LCBcImNvbmNhdFwiLCByaWdodCksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIHVuc3ViTGVmdCwgdW5zdWJSaWdodDtcbiAgICAgICAgdW5zdWJSaWdodCA9IG5vcDtcbiAgICAgICAgdW5zdWJMZWZ0ID0gbGVmdC5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuc3ViUmlnaHQgPSByaWdodC5kaXNwYXRjaGVyLnN1YnNjcmliZShzaW5rKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNpbmsoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHVuc3ViTGVmdCgpO1xuICAgICAgICAgIHJldHVybiB1bnN1YlJpZ2h0KCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uKHN0b3BwZXIpIHtcbiAgICAgIHZhciBlbmRNYXJrZXI7XG4gICAgICBlbmRNYXJrZXIgPSB7fTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlVW50aWxcIiwgc3RvcHBlciwgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXModGhpcy5tYXBFbmQoZW5kTWFya2VyKSwgc3RvcHBlci5za2lwRXJyb3JzKCkpLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBkYXRhLCByZXBseSwgdmFsdWUsIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3JlZjEgPSBldmVudC52YWx1ZSgpLCBkYXRhID0gX3JlZjFbMF0sIHN0b3BwZXIgPSBfcmVmMVsxXTtcbiAgICAgICAgICBpZiAoc3RvcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZW5kKCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGRhdGEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhW19pXTtcbiAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBlbmRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChlbmQoKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gobmV4dCh2YWx1ZSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwVW50aWwgPSBmdW5jdGlvbihzdGFydGVyKSB7XG4gICAgICB2YXIgc3RhcnRlZDtcbiAgICAgIHN0YXJ0ZWQgPSBzdGFydGVyLnRha2UoMSkubWFwKHRydWUpLnRvUHJvcGVydHkoZmFsc2UpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNraXBVbnRpbFwiLCBzdGFydGVyLCB0aGlzLmZpbHRlcihzdGFydGVkKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5za2lwV2hpbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmLCBvaztcbiAgICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgb2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2tpcFdoaWxlXCIsIGYsIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAob2sgfHwgIWV2ZW50Lmhhc1ZhbHVlKCkgfHwgIWYoZXZlbnQudmFsdWUoKSkpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFdoZW4gPSBmdW5jdGlvbih2YWx2ZSkge1xuICAgICAgdmFyIHB1dFRvSG9sZCwgcmVsZWFzZUhvbGQsIHZhbHZlXztcbiAgICAgIHZhbHZlXyA9IHZhbHZlLnN0YXJ0V2l0aChmYWxzZSk7XG4gICAgICByZWxlYXNlSG9sZCA9IHZhbHZlXy5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gIXg7XG4gICAgICB9KTtcbiAgICAgIHB1dFRvSG9sZCA9IHZhbHZlXy5maWx0ZXIoXy5pZCk7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiaG9sZFdoZW5cIiwgdmFsdmUsIHRoaXMuZmlsdGVyKGZhbHNlKS5tZXJnZSh2YWx2ZV8uZmxhdE1hcENvbmNhdCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNob3VsZEhvbGQpIHtcbiAgICAgICAgICBpZiAoIXNob3VsZEhvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy50YWtlVW50aWwocHV0VG9Ib2xkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNjYW4oW10sIChmdW5jdGlvbih4cywgeCkge1xuICAgICAgICAgICAgICByZXR1cm4geHMuY29uY2F0KHgpO1xuICAgICAgICAgICAgfSkpLnNhbXBsZWRCeShyZWxlYXNlSG9sZCkudGFrZSgxKS5mbGF0TWFwKEJhY29uLmZyb21BcnJheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpKSk7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbihzZWVkKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic3RhcnRXaXRoXCIsIHNlZWQsIEJhY29uLm9uY2Uoc2VlZCkuY29uY2F0KHRoaXMpKTtcbiAgICB9O1xuXG4gICAgRXZlbnRTdHJlYW0ucHJvdG90eXBlLndpdGhIYW5kbGVyID0gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcIndpdGhIYW5kbGVyXCIsIGhhbmRsZXIpLCB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50U3RyZWFtO1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIFByb3BlcnR5ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eSwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5KGRlc2MsIHN1YnNjcmliZSwgaGFuZGxlcikge1xuICAgICAgaWYgKGlzRnVuY3Rpb24oZGVzYykpIHtcbiAgICAgICAgaGFuZGxlciA9IHN1YnNjcmliZTtcbiAgICAgICAgc3Vic2NyaWJlID0gZGVzYztcbiAgICAgICAgZGVzYyA9IFtdO1xuICAgICAgfVxuICAgICAgUHJvcGVydHkuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzYyk7XG4gICAgICBhc3NlcnRGdW5jdGlvbihzdWJzY3JpYmUpO1xuICAgICAgdGhpcy5kaXNwYXRjaGVyID0gbmV3IFByb3BlcnR5RGlzcGF0Y2hlcih0aGlzLCBzdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgICAgcmVnaXN0ZXJPYnModGhpcyk7XG4gICAgfVxuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uKHNhbXBsZXIsIGNvbWJpbmF0b3IpIHtcbiAgICAgIHZhciBsYXp5LCByZXN1bHQsIHNhbXBsZXJTb3VyY2UsIHN0cmVhbSwgdGhpc1NvdXJjZTtcbiAgICAgIGlmIChjb21iaW5hdG9yICE9IG51bGwpIHtcbiAgICAgICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihjb21iaW5hdG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhenkgPSB0cnVlO1xuICAgICAgICBjb21iaW5hdG9yID0gZnVuY3Rpb24oZikge1xuICAgICAgICAgIHJldHVybiBmLnZhbHVlKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzU291cmNlID0gbmV3IFNvdXJjZSh0aGlzLCBmYWxzZSwgbGF6eSk7XG4gICAgICBzYW1wbGVyU291cmNlID0gbmV3IFNvdXJjZShzYW1wbGVyLCB0cnVlLCBsYXp5KTtcbiAgICAgIHN0cmVhbSA9IEJhY29uLndoZW4oW3RoaXNTb3VyY2UsIHNhbXBsZXJTb3VyY2VdLCBjb21iaW5hdG9yKTtcbiAgICAgIHJlc3VsdCA9IHNhbXBsZXIgaW5zdGFuY2VvZiBQcm9wZXJ0eSA/IHN0cmVhbS50b1Byb3BlcnR5KCkgOiBzdHJlYW07XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwic2FtcGxlZEJ5XCIsIHNhbXBsZXIsIGNvbWJpbmF0b3IsIHJlc3VsdCk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5zYW1wbGUgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInNhbXBsZVwiLCBpbnRlcnZhbCwgdGhpcy5zYW1wbGVkQnkoQmFjb24uaW50ZXJ2YWwoaW50ZXJ2YWwsIHt9KSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjcmliZSh0aGlzLCBcImNoYW5nZXNcIiksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkoZGVzY3JpYmUodGhpcywgXCJ3aXRoSGFuZGxlclwiLCBoYW5kbGVyKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBhc3NlcnROb0FyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKHRoaXMsIFwidG9FdmVudFN0cmVhbVwiKSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihzaW5rKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgZXZlbnQgPSBldmVudC50b05leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmFuZCA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2NyaXB0aW9uKHRoaXMsIFwiYW5kXCIsIG90aGVyLCB0aGlzLmNvbWJpbmUob3RoZXIsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHggJiYgeTtcbiAgICAgIH0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLm9yID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJvclwiLCBvdGhlciwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB4IHx8IHk7XG4gICAgICB9KSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMoXCJkZWxheVwiLCBkZWxheSwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICByZXR1cm4gY2hhbmdlcy5kZWxheShkZWxheSk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhcImRlYm91bmNlXCIsIGRlbGF5LCBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBjaGFuZ2VzLmRlYm91bmNlKGRlbGF5KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKFwidGhyb3R0bGVcIiwgZGVsYXksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgICAgcmV0dXJuIGNoYW5nZXMudGhyb3R0bGUoZGVsYXkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5kZWxheUNoYW5nZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkZXNjLCBmLCBfaTtcbiAgICAgIGRlc2MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBfaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxKSA6IChfaSA9IDAsIFtdKSwgZiA9IGFyZ3VtZW50c1tfaSsrXTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChfX3NsaWNlLmNhbGwoZGVzYyksIFthZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGYodGhpcy5jaGFuZ2VzKCkpKV0pKTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHkucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uKHN0b3BwZXIpIHtcbiAgICAgIHZhciBjaGFuZ2VzO1xuICAgICAgY2hhbmdlcyA9IHRoaXMuY2hhbmdlcygpLnRha2VVbnRpbChzdG9wcGVyKTtcbiAgICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24odGhpcywgXCJ0YWtlVW50aWxcIiwgc3RvcHBlciwgYWRkUHJvcGVydHlJbml0VmFsdWVUb1N0cmVhbSh0aGlzLCBjaGFuZ2VzKSk7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS5zdGFydFdpdGggPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjcmlwdGlvbih0aGlzLCBcInN0YXJ0V2l0aFwiLCB2YWx1ZSwgdGhpcy5zY2FuKHZhbHVlLCBmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfcmVmMTtcbiAgICAgIHJldHVybiAoX3JlZjEgPSBQcm9wZXJ0eS5fX3N1cGVyX18uYnVmZmVyaW5nVGhyb3R0bGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSkuYnVmZmVyaW5nVGhyb3R0bGUuYXBwbHkoX3JlZjEsIGFyZ3VtZW50cykudG9Qcm9wZXJ0eSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvcGVydHk7XG5cbiAgfSkoT2JzZXJ2YWJsZSk7XG5cbiAgY29udmVydEFyZ3NUb0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JzLCBmLCBhcmdzLCBtZXRob2QpIHtcbiAgICB2YXIgc2FtcGxlZDtcbiAgICBpZiAoZiBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICBzYW1wbGVkID0gZi5zYW1wbGVkQnkob2JzLCBmdW5jdGlvbihwLCBzKSB7XG4gICAgICAgIHJldHVybiBbcCwgc107XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChzYW1wbGVkLCBmdW5jdGlvbihfYXJnKSB7XG4gICAgICAgIHZhciBwLCBzO1xuICAgICAgICBwID0gX2FyZ1swXSwgcyA9IF9hcmdbMV07XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uKF9hcmcpIHtcbiAgICAgICAgdmFyIHAsIHM7XG4gICAgICAgIHAgPSBfYXJnWzBdLCBzID0gX2FyZ1sxXTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbihmLCBhcmdzKTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChvYnMsIGYpO1xuICAgIH1cbiAgfTtcblxuICBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtID0gZnVuY3Rpb24ocHJvcGVydHksIHN0cmVhbSkge1xuICAgIHZhciBqdXN0SW5pdFZhbHVlO1xuICAgIGp1c3RJbml0VmFsdWUgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocHJvcGVydHksIFwianVzdEluaXRWYWx1ZVwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHVuc3ViLCB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdW5zdWIgPSBwcm9wZXJ0eS5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9KTtcbiAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKGp1c3RJbml0VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHNpbmsodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rKGVuZCgpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH0pO1xuICAgIHJldHVybiBqdXN0SW5pdFZhbHVlLmNvbmNhdChzdHJlYW0pLnRvUHJvcGVydHkoKTtcbiAgfTtcblxuICBEaXNwYXRjaGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIERpc3BhdGNoZXIoX3N1YnNjcmliZSwgX2hhbmRsZUV2ZW50KSB7XG4gICAgICB0aGlzLl9zdWJzY3JpYmUgPSBfc3Vic2NyaWJlO1xuICAgICAgdGhpcy5faGFuZGxlRXZlbnQgPSBfaGFuZGxlRXZlbnQ7XG4gICAgICB0aGlzLnN1YnNjcmliZSA9IF9fYmluZCh0aGlzLnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICB0aGlzLmhhbmRsZUV2ZW50ID0gX19iaW5kKHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucHJldkVycm9yID0gdm9pZCAwO1xuICAgICAgdGhpcy51bnN1YlNyYyA9IHZvaWQgMDtcbiAgICB9XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNTdWJzY3JpYmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPiAwO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMgPSBfLndpdGhvdXQoc3Vic2NyaXB0aW9uLCB0aGlzLnN1YnNjcmlwdGlvbnMpO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFVwZGF0ZUJhcnJpZXIuaW5UcmFuc2FjdGlvbihldmVudCwgdGhpcywgdGhpcy5wdXNoSXQsIFtldmVudF0pO1xuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoVG9TdWJzY3JpcHRpb25zID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlLCByZXBseSwgc3ViLCB0bXAsIF9pLCBfbGVuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdG1wID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHRtcC5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgIHN1YiA9IHRtcFtfaV07XG4gICAgICAgICAgcmVwbHkgPSBzdWIuc2luayhldmVudCk7XG4gICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUgfHwgZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdWIoc3ViKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaEl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5wdXNoaW5nKSB7XG4gICAgICAgIGlmIChldmVudCA9PT0gdGhpcy5wcmV2RXJyb3IpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICAgIHRoaXMucHJldkVycm9yID0gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdXNoaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wdXNoVG9TdWJzY3JpcHRpb25zKGV2ZW50KTtcbiAgICAgICAgdGhpcy5wdXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgIGV2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzU3Vic2NyaWJlcnMoKSkge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tU291cmNlKCk7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWV1ZS5wdXNoKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLl9oYW5kbGVFdmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXZlbnQoZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlRnJvbVNvdXJjZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMudW5zdWJTcmMpIHtcbiAgICAgICAgdGhpcy51bnN1YlNyYygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMudW5zdWJTcmMgPSB2b2lkIDA7XG4gICAgfTtcblxuICAgIERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICBzaW5rKGVuZCgpKTtcbiAgICAgICAgcmV0dXJuIG5vcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFzc2VydEZ1bmN0aW9uKHNpbmspO1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgc2luazogc2lua1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMudW5zdWJTcmMgPSB0aGlzLl9zdWJzY3JpYmUodGhpcy5oYW5kbGVFdmVudCk7XG4gICAgICAgICAgYXNzZXJ0RnVuY3Rpb24odGhpcy51bnN1YlNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLnJlbW92ZVN1YihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy51bnN1YnNjcmliZUZyb21Tb3VyY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpc3BhdGNoZXI7XG5cbiAgfSkoKTtcblxuICBQcm9wZXJ0eURpc3BhdGNoZXIgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb3BlcnR5RGlzcGF0Y2hlciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFByb3BlcnR5RGlzcGF0Y2hlcihwcm9wZXJ0eSwgc3Vic2NyaWJlLCBoYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgICAgdGhpcy5zdWJzY3JpYmUgPSBfX2JpbmQodGhpcy5zdWJzY3JpYmUsIHRoaXMpO1xuICAgICAgUHJvcGVydHlEaXNwYXRjaGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlRXZlbnQpO1xuICAgICAgdGhpcy5jdXJyZW50ID0gTm9uZTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gdm9pZCAwO1xuICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMucHJvcGVydHlFbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlUm9vdElkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlci5fX3N1cGVyX18ucHVzaC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHlEaXNwYXRjaGVyLnByb3RvdHlwZS5tYXliZVN1YlNvdXJjZSA9IGZ1bmN0aW9uKHNpbmssIHJlcGx5KSB7XG4gICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BlcnR5RW5kZWQpIHtcbiAgICAgICAgc2luayhlbmQoKSk7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlLmNhbGwodGhpcywgc2luayk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFByb3BlcnR5RGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGRpc3BhdGNoaW5nSWQsIGluaXRTZW50LCByZXBseSwgdmFsSWQ7XG4gICAgICBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudC5pc0RlZmluZWQgJiYgKHRoaXMuaGFzU3Vic2NyaWJlcnMoKSB8fCB0aGlzLnByb3BlcnR5RW5kZWQpKSB7XG4gICAgICAgIGRpc3BhdGNoaW5nSWQgPSBVcGRhdGVCYXJyaWVyLmN1cnJlbnRFdmVudElkKCk7XG4gICAgICAgIHZhbElkID0gdGhpcy5jdXJyZW50VmFsdWVSb290SWQ7XG4gICAgICAgIGlmICghdGhpcy5wcm9wZXJ0eUVuZGVkICYmIHZhbElkICYmIGRpc3BhdGNoaW5nSWQgJiYgZGlzcGF0Y2hpbmdJZCAhPT0gdmFsSWQpIHtcbiAgICAgICAgICBVcGRhdGVCYXJyaWVyLndoZW5Eb25lV2l0aCh0aGlzLnByb3BlcnR5LCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRWYWx1ZVJvb3RJZCA9PT0gdmFsSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2luayhpbml0aWFsKF90aGlzLmN1cnJlbnQuZ2V0KCkudmFsdWUoKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgVXBkYXRlQmFycmllci5pblRyYW5zYWN0aW9uKHZvaWQgMCwgdGhpcywgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5ID0gc2luayhpbml0aWFsKHRoaXMuY3VycmVudC5nZXQoKS52YWx1ZSgpKSk7XG4gICAgICAgICAgfSksIFtdKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFByb3BlcnR5RGlzcGF0Y2hlcjtcblxuICB9KShEaXNwYXRjaGVyKTtcblxuICBCdXMgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1cywgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIEJ1cygpIHtcbiAgICAgIHRoaXMuZ3VhcmRlZFNpbmsgPSBfX2JpbmQodGhpcy5ndWFyZGVkU2luaywgdGhpcyk7XG4gICAgICB0aGlzLnN1YnNjcmliZUFsbCA9IF9fYmluZCh0aGlzLnN1YnNjcmliZUFsbCwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3ViQWxsID0gX19iaW5kKHRoaXMudW5zdWJBbGwsIHRoaXMpO1xuICAgICAgdGhpcy5zaW5rID0gdm9pZCAwO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLmVuZGVkID0gZmFsc2U7XG4gICAgICBCdXMuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgZGVzY3JpYmUoQmFjb24sIFwiQnVzXCIpLCB0aGlzLnN1YnNjcmliZUFsbCk7XG4gICAgfVxuXG4gICAgQnVzLnByb3RvdHlwZS51bnN1YkFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN1YiwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHN1YiA9IF9yZWYxW19pXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHN1Yi51bnN1YigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnN1YnNjcmliZUFsbCA9IGZ1bmN0aW9uKG5ld1NpbmspIHtcbiAgICAgIHZhciBzdWJzY3JpcHRpb24sIF9pLCBfbGVuLCBfcmVmMTtcbiAgICAgIHRoaXMuc2luayA9IG5ld1Npbms7XG4gICAgICBfcmVmMSA9IGNsb25lQXJyYXkodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gX3JlZjFbX2ldO1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51bnN1YkFsbDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5ndWFyZGVkU2luayA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICBfdGhpcy51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaW5rKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5zdWJzY3JpYmVJbnB1dCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YiA9IHN1YnNjcmlwdGlvbi5pbnB1dC5kaXNwYXRjaGVyLnN1YnNjcmliZSh0aGlzLmd1YXJkZWRTaW5rKHN1YnNjcmlwdGlvbi5pbnB1dCkpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnVuc3Vic2NyaWJlSW5wdXQgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgdmFyIGksIHN1YiwgX2ksIF9sZW4sIF9yZWYxO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgaSA9ICsrX2kpIHtcbiAgICAgICAgc3ViID0gX3JlZjFbaV07XG4gICAgICAgIGlmIChzdWIuaW5wdXQgPT09IGlucHV0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUucGx1ZyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgc3ViO1xuICAgICAgYXNzZXJ0T2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzdWIgPSB7XG4gICAgICAgIGlucHV0OiBpbnB1dFxuICAgICAgfTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1Yik7XG4gICAgICBpZiAoKHRoaXMuc2luayAhPSBudWxsKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1Yik7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmVJbnB1dChpbnB1dCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgdGhpcy51bnN1YkFsbCgpO1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhlbmQoKSkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKG5leHQodmFsdWUpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKG5ldyBFcnJvcihlcnJvcikpIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gQnVzO1xuXG4gIH0pKEV2ZW50U3RyZWFtKTtcblxuICBTb3VyY2UgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU291cmNlKG9icywgc3luYywgbGF6eSkge1xuICAgICAgdGhpcy5vYnMgPSBvYnM7XG4gICAgICB0aGlzLnN5bmMgPSBzeW5jO1xuICAgICAgdGhpcy5sYXp5ID0gbGF6eSAhPSBudWxsID8gbGF6eSA6IGZhbHNlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIH1cblxuICAgIFNvdXJjZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMub2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5tYXJrRW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IF8uYWx3YXlzKHRoaXMucXVldWVbMF0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVswXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUgPSBbeF07XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIFNvdXJjZTtcblxuICB9KSgpO1xuXG4gIENvbnN1bWluZ1NvdXJjZSA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29uc3VtaW5nU291cmNlLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gQ29uc3VtaW5nU291cmNlKCkge1xuICAgICAgcmV0dXJuIENvbnN1bWluZ1NvdXJjZS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmNvbnN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goeCk7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiAhdGhpcy5lbmRlZCB8fCB0aGlzLnF1ZXVlLmxlbmd0aCA+PSBjO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmhhc0F0TGVhc3QgPSBmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5sZW5ndGggPj0gYztcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5mbGF0dGVuID0gZmFsc2U7XG5cbiAgICByZXR1cm4gQ29uc3VtaW5nU291cmNlO1xuXG4gIH0pKFNvdXJjZSk7XG5cbiAgQnVmZmVyaW5nU291cmNlID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdWZmZXJpbmdTb3VyY2UsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBCdWZmZXJpbmdTb3VyY2Uob2JzKSB7XG4gICAgICBCdWZmZXJpbmdTb3VyY2UuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb2JzLCB0cnVlKTtcbiAgICB9XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLmNvbnN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2YWx1ZXM7XG4gICAgICB2YWx1ZXMgPSB0aGlzLnF1ZXVlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnB1c2goeC52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5oYXNBdExlYXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1ZmZlcmluZ1NvdXJjZTtcblxuICB9KShTb3VyY2UpO1xuXG4gIFNvdXJjZS5pc1RyaWdnZXIgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHMgaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBzLnN5bmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzIGluc3RhbmNlb2YgRXZlbnRTdHJlYW07XG4gICAgfVxuICB9O1xuXG4gIFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHMpIHtcbiAgICBpZiAocyBpbnN0YW5jZW9mIFNvdXJjZSkge1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSBlbHNlIGlmIChzIGluc3RhbmNlb2YgUHJvcGVydHkpIHtcbiAgICAgIHJldHVybiBuZXcgU291cmNlKHMsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBDb25zdW1pbmdTb3VyY2UocywgdHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGRlc2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGNvbnRleHQsIG1ldGhvZDtcbiAgICBjb250ZXh0ID0gYXJndW1lbnRzWzBdLCBtZXRob2QgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICgoY29udGV4dCB8fCBtZXRob2QpIGluc3RhbmNlb2YgRGVzYykge1xuICAgICAgcmV0dXJuIGNvbnRleHQgfHwgbWV0aG9kO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERlc2MoY29udGV4dCwgbWV0aG9kLCBhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgZmluZERlcHMgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKGlzQXJyYXkoeCkpIHtcbiAgICAgIHJldHVybiBfLmZsYXRNYXAoZmluZERlcHMsIHgpO1xuICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHgpKSB7XG4gICAgICByZXR1cm4gW3hdO1xuICAgIH0gZWxzZSBpZiAoeCBpbnN0YW5jZW9mIFNvdXJjZSkge1xuICAgICAgcmV0dXJuIFt4Lm9ic107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG5cbiAgRGVzYyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBEZXNjKGNvbnRleHQsIG1ldGhvZCwgYXJncykge1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgIHRoaXMuY2FjaGVkID0gdm9pZCAwO1xuICAgIH1cblxuICAgIERlc2MucHJvdG90eXBlLmRlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZCB8fCAodGhpcy5jYWNoZWQgPSBmaW5kRGVwcyhbdGhpcy5jb250ZXh0XS5jb25jYXQodGhpcy5hcmdzKSkpO1xuICAgIH07XG5cbiAgICBEZXNjLnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgb2JzLmRlc2MgPSB0aGlzO1xuICAgICAgcmV0dXJuIG9icztcbiAgICB9O1xuXG4gICAgRGVzYy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfLnRvU3RyaW5nKHRoaXMuY29udGV4dCkgKyBcIi5cIiArIF8udG9TdHJpbmcodGhpcy5tZXRob2QpICsgXCIoXCIgKyBfLm1hcChfLnRvU3RyaW5nLCB0aGlzLmFyZ3MpICsgXCIpXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBEZXNjO1xuXG4gIH0pKCk7XG5cbiAgd2l0aERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlc2MsIG9icywgX2k7XG4gICAgZGVzYyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIF9pID0gYXJndW1lbnRzLmxlbmd0aCAtIDEpIDogKF9pID0gMCwgW10pLCBvYnMgPSBhcmd1bWVudHNbX2krK107XG4gICAgcmV0dXJuIGRlc2NyaWJlLmFwcGx5KG51bGwsIGRlc2MpLmFwcGx5KG9icyk7XG4gIH07XG5cbiAgQmFjb24ud2hlbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCBpLCBpbmRleCwgaXgsIGxlbiwgbmVlZHNCYXJyaWVyLCBwYXQsIHBhdFNvdXJjZXMsIHBhdHMsIHBhdHRlcm5zLCByZXN1bHRTdHJlYW0sIHMsIHNvdXJjZXMsIHRyaWdnZXJGb3VuZCwgdXNhZ2UsIF9pLCBfaiwgX2xlbiwgX2xlbjEsIF9yZWYxO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB1c2FnZSA9IFwid2hlbjogZXhwZWN0aW5nIGFyZ3VtZW50cyBpbiB0aGUgZm9ybSAoT2JzZXJ2YWJsZSssZnVuY3Rpb24pK1wiO1xuICAgIGFzc2VydCh1c2FnZSwgbGVuICUgMiA9PT0gMCk7XG4gICAgc291cmNlcyA9IFtdO1xuICAgIHBhdHMgPSBbXTtcbiAgICBpID0gMDtcbiAgICBwYXR0ZXJucyA9IFtdO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwYXR0ZXJuc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHBhdHRlcm5zW2kgKyAxXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICBwYXRTb3VyY2VzID0gXy50b0FycmF5KGFyZ3VtZW50c1tpXSk7XG4gICAgICBmID0gY29uc3RhbnRUb0Z1bmN0aW9uKGFyZ3VtZW50c1tpICsgMV0pO1xuICAgICAgcGF0ID0ge1xuICAgICAgICBmOiBmLFxuICAgICAgICBpeHM6IFtdXG4gICAgICB9O1xuICAgICAgdHJpZ2dlckZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHBhdFNvdXJjZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IHBhdFNvdXJjZXNbX2ldO1xuICAgICAgICBpbmRleCA9IF8uaW5kZXhPZihzb3VyY2VzLCBzKTtcbiAgICAgICAgaWYgKCF0cmlnZ2VyRm91bmQpIHtcbiAgICAgICAgICB0cmlnZ2VyRm91bmQgPSBTb3VyY2UuaXNUcmlnZ2VyKHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICBzb3VyY2VzLnB1c2gocyk7XG4gICAgICAgICAgaW5kZXggPSBzb3VyY2VzLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgX3JlZjEgPSBwYXQuaXhzO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMS5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBpeCA9IF9yZWYxW19qXTtcbiAgICAgICAgICBpZiAoaXguaW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICBpeC5jb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXQuaXhzLnB1c2goe1xuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBjb3VudDogMVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGFzc2VydChcIkF0IGxlYXN0IG9uZSBFdmVudFN0cmVhbSByZXF1aXJlZFwiLCB0cmlnZ2VyRm91bmQgfHwgKCFwYXRTb3VyY2VzLmxlbmd0aCkpO1xuICAgICAgaWYgKHBhdFNvdXJjZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRzLnB1c2gocGF0KTtcbiAgICAgIH1cbiAgICAgIGkgPSBpICsgMjtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIEJhY29uLm5ldmVyKCk7XG4gICAgfVxuICAgIHNvdXJjZXMgPSBfLm1hcChTb3VyY2UuZnJvbU9ic2VydmFibGUsIHNvdXJjZXMpO1xuICAgIG5lZWRzQmFycmllciA9IChfLmFueShzb3VyY2VzLCBmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy5mbGF0dGVuO1xuICAgIH0pKSAmJiAoY29udGFpbnNEdXBsaWNhdGVEZXBzKF8ubWFwKChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy5vYnM7XG4gICAgfSksIHNvdXJjZXMpKSk7XG4gICAgcmV0dXJuIHJlc3VsdFN0cmVhbSA9IG5ldyBFdmVudFN0cmVhbShkZXNjcmliZS5hcHBseShudWxsLCBbQmFjb24sIFwid2hlblwiXS5jb25jYXQoX19zbGljZS5jYWxsKHBhdHRlcm5zKSkpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2Fubm90TWF0Y2gsIGNhbm5vdFN5bmMsIGVuZHMsIG1hdGNoLCBub25GbGF0dGVuZWQsIHBhcnQsIHRyaWdnZXJzO1xuICAgICAgdHJpZ2dlcnMgPSBbXTtcbiAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgIG1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVmMjtcbiAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjIubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgaSA9IF9yZWYyW19rXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0uaGFzQXRMZWFzdChpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBjYW5ub3RTeW5jID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiAhc291cmNlLnN5bmMgfHwgc291cmNlLmVuZGVkO1xuICAgICAgfTtcbiAgICAgIGNhbm5vdE1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVmMjtcbiAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjIubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICAgICAgaSA9IF9yZWYyW19rXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0ubWF5SGF2ZShpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9uRmxhdHRlbmVkID0gZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICByZXR1cm4gIXRyaWdnZXIuc291cmNlLmZsYXR0ZW47XG4gICAgICB9O1xuICAgICAgcGFydCA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odW5zdWJBbGwpIHtcbiAgICAgICAgICB2YXIgZmx1c2gsIGZsdXNoTGF0ZXIsIGZsdXNoV2hpbGVUcmlnZ2VycztcbiAgICAgICAgICBmbHVzaExhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0U3RyZWFtLCBmbHVzaCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaFdoaWxlVHJpZ2dlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBldmVudHMsIHAsIHJlcGx5LCB0cmlnZ2VyLCBfaywgX2xlbjI7XG4gICAgICAgICAgICBpZiAodHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgICAgIHRyaWdnZXIgPSB0cmlnZ2Vycy5wb3AoKTtcbiAgICAgICAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gcGF0cy5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICAgICAgICBwID0gcGF0c1tfa107XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKHApKSB7XG4gICAgICAgICAgICAgICAgICBldmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfbCwgX2xlbjMsIF9yZWYyLCBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBwLml4cztcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfbCA9IDAsIF9sZW4zID0gX3JlZjIubGVuZ3RoOyBfbCA8IF9sZW4zOyBfbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaSA9IF9yZWYyW19sXTtcbiAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHNvdXJjZXNbaS5pbmRleF0uY29uc3VtZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRyaWdnZXIuZS5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50LCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgX2wsIF9sZW4zLCBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAoX2wgPSAwLCBfbGVuMyA9IGV2ZW50cy5sZW5ndGg7IF9sIDwgX2xlbjM7IF9sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW19sXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZi5hcHBseShwLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VycyA9IF8uZmlsdGVyKG5vbkZsYXR0ZW5lZCwgdHJpZ2dlcnMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgcmVwbHkgPSBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICAgIGlmIChlbmRzKSB7XG4gICAgICAgICAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKF8uYWxsKHNvdXJjZXMsIGNhbm5vdFN5bmMpIHx8IF8uYWxsKHBhdHMsIGNhbm5vdE1hdGNoKSkge1xuICAgICAgICAgICAgICAgIHJlcGx5ID0gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgICAgIHNpbmsoZW5kKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgICAgICBlbmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc291cmNlLm1hcmtFbmRlZCgpO1xuICAgICAgICAgICAgICBmbHVzaExhdGVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNvdXJjZS5wdXNoKGUpO1xuICAgICAgICAgICAgICBpZiAoc291cmNlLnN5bmMpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgICAgZTogZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChuZWVkc0JhcnJpZXIgfHwgVXBkYXRlQmFycmllci5oYXNXYWl0ZXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHkgfHwgQmFjb24ubW9yZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29tcG9zaXRlVW5zdWJzY3JpYmUuYXBwbHkobnVsbCwgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgX2ssIF9sZW4yLCBfcmVzdWx0cztcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfayA9IDAsIF9sZW4yID0gc291cmNlcy5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgICAgICBzID0gc291cmNlc1tfa107XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChwYXJ0KHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9KSgpKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb250YWluc0R1cGxpY2F0ZURlcHMgPSBmdW5jdGlvbihvYnNlcnZhYmxlcywgc3RhdGUpIHtcbiAgICB2YXIgY2hlY2tPYnNlcnZhYmxlO1xuICAgIGlmIChzdGF0ZSA9PSBudWxsKSB7XG4gICAgICBzdGF0ZSA9IFtdO1xuICAgIH1cbiAgICBjaGVja09ic2VydmFibGUgPSBmdW5jdGlvbihvYnMpIHtcbiAgICAgIHZhciBkZXBzO1xuICAgICAgaWYgKF8uY29udGFpbnMoc3RhdGUsIG9icykpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgICAgICBpZiAoZGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICBzdGF0ZS5wdXNoKG9icyk7XG4gICAgICAgICAgcmV0dXJuIF8uYW55KGRlcHMsIGNoZWNrT2JzZXJ2YWJsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIF8uYW55KG9ic2VydmFibGVzLCBjaGVja09ic2VydmFibGUpO1xuICB9O1xuXG4gIEJhY29uLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBpbml0aWFsLCBsYXRlQmluZEZpcnN0LCBwYXR0ZXJucztcbiAgICBpbml0aWFsID0gYXJndW1lbnRzWzBdLCBwYXR0ZXJucyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgbGF0ZUJpbmRGaXJzdCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSkge1xuICAgICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIFtpXS5jb25jYXQoYXJncykpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICAgIGkgPSBwYXR0ZXJucy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChpID4gMCkge1xuICAgICAgaWYgKCEocGF0dGVybnNbaV0gaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcGF0dGVybnNbaV0gPSAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKHBhdHRlcm5zW2ldKTtcbiAgICAgIH1cbiAgICAgIHBhdHRlcm5zW2ldID0gbGF0ZUJpbmRGaXJzdChwYXR0ZXJuc1tpXSk7XG4gICAgICBpID0gaSAtIDI7XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzY3JpcHRpb24uYXBwbHkobnVsbCwgW0JhY29uLCBcInVwZGF0ZVwiLCBpbml0aWFsXS5jb25jYXQoX19zbGljZS5jYWxsKHBhdHRlcm5zKSwgW0JhY29uLndoZW4uYXBwbHkoQmFjb24sIHBhdHRlcm5zKS5zY2FuKGluaXRpYWwsIChmdW5jdGlvbih4LCBmKSB7XG4gICAgICByZXR1cm4gZih4KTtcbiAgICB9KSldKSk7XG4gIH07XG5cbiAgY29tcG9zaXRlVW5zdWJzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3M7XG4gICAgc3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgIHJldHVybiBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoc3MpLnVuc3Vic2NyaWJlO1xuICB9O1xuXG4gIENvbXBvc2l0ZVVuc3Vic2NyaWJlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvc2l0ZVVuc3Vic2NyaWJlKHNzKSB7XG4gICAgICB2YXIgcywgX2ksIF9sZW47XG4gICAgICBpZiAoc3MgPT0gbnVsbCkge1xuICAgICAgICBzcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IF9fYmluZCh0aGlzLnVuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc3MubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgcyA9IHNzW19pXTtcbiAgICAgICAgdGhpcy5hZGQocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIGVuZGVkLCB1bnN1YiwgdW5zdWJNZTtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmRlZCA9IGZhbHNlO1xuICAgICAgdW5zdWIgPSBub3A7XG4gICAgICB0aGlzLnN0YXJ0aW5nLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgIHVuc3ViTWUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5kZWQgPSB0cnVlO1xuICAgICAgICAgIF90aGlzLnJlbW92ZSh1bnN1Yik7XG4gICAgICAgICAgcmV0dXJuIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgX3RoaXMuc3RhcnRpbmcpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB1bnN1YiA9IHN1YnNjcmlwdGlvbih0aGlzLnVuc3Vic2NyaWJlLCB1bnN1Yk1lKTtcbiAgICAgIGlmICghKHRoaXMudW5zdWJzY3JpYmVkIHx8IGVuZGVkKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh1bnN1Yik7XG4gICAgICB9XG4gICAgICBfLnJlbW92ZShzdWJzY3JpcHRpb24sIHRoaXMuc3RhcnRpbmcpO1xuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24odW5zdWIpIHtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoKF8ucmVtb3ZlKHVuc3ViLCB0aGlzLnN1YnNjcmlwdGlvbnMpKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzLCBfaSwgX2xlbiwgX3JlZjE7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgX3JlZjEgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIHMgPSBfcmVmMVtfaV07XG4gICAgICAgIHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCArIHRoaXMuc3RhcnRpbmcubGVuZ3RoO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgPT09IDA7XG4gICAgfTtcblxuICAgIHJldHVybiBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuICB9KSgpO1xuXG4gIEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlID0gQ29tcG9zaXRlVW5zdWJzY3JpYmU7XG5cbiAgU29tZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTb21lKHZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgU29tZS5wcm90b3R5cGUuZ2V0T3JFbHNlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZikge1xuICAgICAgaWYgKGYodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTb21lKHRoaXMudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE5vbmU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBuZXcgU29tZShmKHRoaXMudmFsdWUpKTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5pc0RlZmluZWQgPSB0cnVlO1xuXG4gICAgU29tZS5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFt0aGlzLnZhbHVlXTtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiU29tZShcIiArIHRoaXMudmFsdWUgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3BlY3QoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNvbWU7XG5cbiAgfSkoKTtcblxuICBOb25lID0ge1xuICAgIGdldE9yRWxzZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gTm9uZTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gTm9uZTtcbiAgICB9LFxuICAgIGZvckVhY2g6IGZ1bmN0aW9uKCkge30sXG4gICAgaXNEZWZpbmVkOiBmYWxzZSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuICAgIGluc3BlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiTm9uZVwiO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpO1xuICAgIH1cbiAgfTtcblxuICBVcGRhdGVCYXJyaWVyID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBhZnRlclRyYW5zYWN0aW9uLCBhZnRlcnMsIGFmdGVyc0luZGV4LCBjdXJyZW50RXZlbnRJZCwgZmx1c2gsIGZsdXNoRGVwc09mLCBmbHVzaFdhaXRlcnMsIGhhc1dhaXRlcnMsIGluVHJhbnNhY3Rpb24sIHJvb3RFdmVudCwgd2FpdGVyT2JzLCB3YWl0ZXJzLCB3aGVuRG9uZVdpdGgsIHdyYXBwZWRTdWJzY3JpYmU7XG4gICAgcm9vdEV2ZW50ID0gdm9pZCAwO1xuICAgIHdhaXRlck9icyA9IFtdO1xuICAgIHdhaXRlcnMgPSB7fTtcbiAgICBhZnRlcnMgPSBbXTtcbiAgICBhZnRlcnNJbmRleCA9IDA7XG4gICAgYWZ0ZXJUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGFmdGVycy5wdXNoKGYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoZW5Eb25lV2l0aCA9IGZ1bmN0aW9uKG9icywgZikge1xuICAgICAgdmFyIG9ic1dhaXRlcnM7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29icy5pZF07XG4gICAgICAgIGlmIChvYnNXYWl0ZXJzID09IG51bGwpIHtcbiAgICAgICAgICBvYnNXYWl0ZXJzID0gd2FpdGVyc1tvYnMuaWRdID0gW2ZdO1xuICAgICAgICAgIHJldHVybiB3YWl0ZXJPYnMucHVzaChvYnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvYnNXYWl0ZXJzLnB1c2goZik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgd2hpbGUgKHdhaXRlck9icy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZsdXNoV2FpdGVycygwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcbiAgICBmbHVzaFdhaXRlcnMgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgdmFyIGYsIG9icywgb2JzSWQsIG9ic1dhaXRlcnMsIF9pLCBfbGVuO1xuICAgICAgb2JzID0gd2FpdGVyT2JzW2luZGV4XTtcbiAgICAgIG9ic0lkID0gb2JzLmlkO1xuICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzSWRdO1xuICAgICAgd2FpdGVyT2JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBkZWxldGUgd2FpdGVyc1tvYnNJZF07XG4gICAgICBmbHVzaERlcHNPZihvYnMpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBvYnNXYWl0ZXJzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGYgPSBvYnNXYWl0ZXJzW19pXTtcbiAgICAgICAgZigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoRGVwc09mID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwLCBkZXBzLCBpbmRleCwgX2ksIF9sZW47XG4gICAgICBkZXBzID0gb2JzLmludGVybmFsRGVwcygpO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBkZXBzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGRlcCA9IGRlcHNbX2ldO1xuICAgICAgICBmbHVzaERlcHNPZihkZXApO1xuICAgICAgICBpZiAod2FpdGVyc1tkZXAuaWRdKSB7XG4gICAgICAgICAgaW5kZXggPSBfLmluZGV4T2Yod2FpdGVyT2JzLCBkZXApO1xuICAgICAgICAgIGZsdXNoV2FpdGVycyhpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcbiAgICBpblRyYW5zYWN0aW9uID0gZnVuY3Rpb24oZXZlbnQsIGNvbnRleHQsIGYsIGFyZ3MpIHtcbiAgICAgIHZhciBhZnRlciwgcmVzdWx0O1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gZi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3RFdmVudCA9IGV2ZW50O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3VsdCA9IGYuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICByb290RXZlbnQgPSB2b2lkIDA7XG4gICAgICAgICAgd2hpbGUgKGFmdGVyc0luZGV4IDwgYWZ0ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgYWZ0ZXIgPSBhZnRlcnNbYWZ0ZXJzSW5kZXhdO1xuICAgICAgICAgICAgYWZ0ZXJzSW5kZXgrKztcbiAgICAgICAgICAgIGFmdGVyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFmdGVyc0luZGV4ID0gMDtcbiAgICAgICAgICBhZnRlcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH07XG4gICAgY3VycmVudEV2ZW50SWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHJvb3RFdmVudC5pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgfTtcbiAgICB3cmFwcGVkU3Vic2NyaWJlID0gZnVuY3Rpb24ob2JzLCBzaW5rKSB7XG4gICAgICB2YXIgZG9VbnN1Yiwgc2hvdWxkVW5zdWIsIHVuc3ViLCB1bnN1YmQ7XG4gICAgICB1bnN1YmQgPSBmYWxzZTtcbiAgICAgIHNob3VsZFVuc3ViID0gZmFsc2U7XG4gICAgICBkb1Vuc3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzaG91bGRVbnN1YiA9IHRydWU7XG4gICAgICB9O1xuICAgICAgdW5zdWIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGRvVW5zdWIoKTtcbiAgICAgIH07XG4gICAgICBkb1Vuc3ViID0gb2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBhZnRlclRyYW5zYWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICBpZiAoIXVuc3ViZCkge1xuICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzaG91bGRVbnN1Yikge1xuICAgICAgICBkb1Vuc3ViKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfTtcbiAgICBoYXNXYWl0ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gd2FpdGVyT2JzLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgd2hlbkRvbmVXaXRoOiB3aGVuRG9uZVdpdGgsXG4gICAgICBoYXNXYWl0ZXJzOiBoYXNXYWl0ZXJzLFxuICAgICAgaW5UcmFuc2FjdGlvbjogaW5UcmFuc2FjdGlvbixcbiAgICAgIGN1cnJlbnRFdmVudElkOiBjdXJyZW50RXZlbnRJZCxcbiAgICAgIHdyYXBwZWRTdWJzY3JpYmU6IHdyYXBwZWRTdWJzY3JpYmUsXG4gICAgICBhZnRlclRyYW5zYWN0aW9uOiBhZnRlclRyYW5zYWN0aW9uXG4gICAgfTtcbiAgfSkoKTtcblxuICBCYWNvbi5FdmVudFN0cmVhbSA9IEV2ZW50U3RyZWFtO1xuXG4gIEJhY29uLlByb3BlcnR5ID0gUHJvcGVydHk7XG5cbiAgQmFjb24uT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5cbiAgQmFjb24uQnVzID0gQnVzO1xuXG4gIEJhY29uLkluaXRpYWwgPSBJbml0aWFsO1xuXG4gIEJhY29uLk5leHQgPSBOZXh0O1xuXG4gIEJhY29uLkVuZCA9IEVuZDtcblxuICBCYWNvbi5FcnJvciA9IEVycm9yO1xuXG4gIG5vcCA9IGZ1bmN0aW9uKCkge307XG5cbiAgbGF0dGVyID0gZnVuY3Rpb24oXywgeCkge1xuICAgIHJldHVybiB4O1xuICB9O1xuXG4gIGZvcm1lciA9IGZ1bmN0aW9uKHgsIF8pIHtcbiAgICByZXR1cm4geDtcbiAgfTtcblxuICBpbml0aWFsID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEluaXRpYWwodmFsdWUsIHRydWUpO1xuICB9O1xuXG4gIG5leHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZSwgdHJ1ZSk7XG4gIH07XG5cbiAgZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBFbmQoKTtcbiAgfTtcblxuICB0b0V2ZW50ID0gZnVuY3Rpb24oeCkge1xuICAgIGlmICh4IGluc3RhbmNlb2YgRXZlbnQpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV4dCh4KTtcbiAgICB9XG4gIH07XG5cbiAgY2xvbmVBcnJheSA9IGZ1bmN0aW9uKHhzKSB7XG4gICAgcmV0dXJuIHhzLnNsaWNlKDApO1xuICB9O1xuXG4gIGFzc2VydCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNvbmRpdGlvbikge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKG1lc3NhZ2UpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRFdmVudFN0cmVhbSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudFN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gRXZlbnRTdHJlYW0gOiBcIiArIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBPYnNlcnZhYmxlIDogXCIgKyBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydEZ1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiBhc3NlcnQoXCJub3QgYSBmdW5jdGlvbiA6IFwiICsgZiwgaXNGdW5jdGlvbihmKSk7XG4gIH07XG5cbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gdHlwZW9mIGYgPT09IFwiZnVuY3Rpb25cIjtcbiAgfTtcblxuICBpc0FycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICByZXR1cm4geHMgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxuICBpc09ic2VydmFibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBPYnNlcnZhYmxlO1xuICB9O1xuXG4gIGFzc2VydEFycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICBpZiAoIWlzQXJyYXkoeHMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIGFycmF5IDogXCIgKyB4cyk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydE5vQXJndW1lbnRzID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBhc3NlcnQoXCJubyBhcmd1bWVudHMgc3VwcG9ydGVkXCIsIGFyZ3MubGVuZ3RoID09PSAwKTtcbiAgfTtcblxuICBhc3NlcnRTdHJpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHR5cGVvZiB4ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGEgc3RyaW5nIDogXCIgKyB4KTtcbiAgICB9XG4gIH07XG5cbiAgcGFydGlhbGx5QXBwbGllZCA9IGZ1bmN0aW9uKGYsIGFwcGxpZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncztcbiAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXBwbGllZC5jb25jYXQoYXJncykpO1xuICAgIH07XG4gIH07XG5cbiAgbWFrZVNwYXduZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JzZXJ2YWJsZShhcmdzWzBdKSkge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGFyZ3NbMF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWFrZUZ1bmN0aW9uQXJncyhhcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgbWFrZUZ1bmN0aW9uQXJncyA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG4gICAgcmV0dXJuIG1ha2VGdW5jdGlvbl8uYXBwbHkobnVsbCwgYXJncyk7XG4gIH07XG5cbiAgbWFrZUZ1bmN0aW9uXyA9IHdpdGhNZXRob2RDYWxsU3VwcG9ydChmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAoaXNGdW5jdGlvbihmKSkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWFsbHlBcHBsaWVkKGYsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgICByZXR1cm4gdG9GaWVsZEV4dHJhY3RvcihmLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICAgIH1cbiAgfSk7XG5cbiAgbWFrZUZ1bmN0aW9uID0gZnVuY3Rpb24oZiwgYXJncykge1xuICAgIHJldHVybiBtYWtlRnVuY3Rpb25fLmFwcGx5KG51bGwsIFtmXS5jb25jYXQoX19zbGljZS5jYWxsKGFyZ3MpKSk7XG4gIH07XG5cbiAgY29uc3RhbnRUb0Z1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIGlmIChpc0Z1bmN0aW9uKGYpKSB7XG4gICAgICByZXR1cm4gZjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8uYWx3YXlzKGYpO1xuICAgIH1cbiAgfTtcblxuICBtYWtlT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlKHgpKSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gICAgfVxuICB9O1xuXG4gIGlzRmllbGRLZXkgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZiA9PT0gXCJzdHJpbmdcIikgJiYgZi5sZW5ndGggPiAxICYmIGYuY2hhckF0KDApID09PSBcIi5cIjtcbiAgfTtcblxuICBCYWNvbi5pc0ZpZWxkS2V5ID0gaXNGaWVsZEtleTtcblxuICB0b0ZpZWxkRXh0cmFjdG9yID0gZnVuY3Rpb24oZiwgYXJncykge1xuICAgIHZhciBwYXJ0RnVuY3MsIHBhcnRzO1xuICAgIHBhcnRzID0gZi5zbGljZSgxKS5zcGxpdChcIi5cIik7XG4gICAgcGFydEZ1bmNzID0gXy5tYXAodG9TaW1wbGVFeHRyYWN0b3IoYXJncyksIHBhcnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBfaSwgX2xlbjtcbiAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gcGFydEZ1bmNzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGYgPSBwYXJ0RnVuY3NbX2ldO1xuICAgICAgICB2YWx1ZSA9IGYodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgdG9TaW1wbGVFeHRyYWN0b3IgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmllbGRWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24oZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWVsZFZhbHVlLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gIH07XG5cbiAgdG9GaWVsZEtleSA9IGZ1bmN0aW9uKGYpIHtcbiAgICByZXR1cm4gZi5zbGljZSgxKTtcbiAgfTtcblxuICB0b0NvbWJpbmF0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgdmFyIGtleTtcbiAgICBpZiAoaXNGdW5jdGlvbihmKSkge1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkS2V5KGYpKSB7XG4gICAgICBrZXkgPSB0b0ZpZWxkS2V5KGYpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBsZWZ0W2tleV0ocmlnaHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFzc2VydChcIm5vdCBhIGZ1bmN0aW9uIG9yIGEgZmllbGQga2V5OiBcIiArIGYsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgdG9PcHRpb24gPSBmdW5jdGlvbih2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBTb21lIHx8IHYgPT09IE5vbmUpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFNvbWUodik7XG4gICAgfVxuICB9O1xuXG4gIGlmICgodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwpICYmIChkZWZpbmUuYW1kICE9IG51bGwpKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBCYWNvbjtcbiAgICB9KTtcbiAgICB0aGlzLkJhY29uID0gQmFjb247XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlICE9PSBudWxsKSAmJiAobW9kdWxlLmV4cG9ydHMgIT0gbnVsbCkpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEJhY29uO1xuICAgIEJhY29uLkJhY29uID0gQmFjb247XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICd3aW5kb3dzJzogOTEsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnc2hpZnQnOiAxNixcbiAgJ2N0bCc6IDE3LFxuICAnY3RybCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiLyoqXG4gKiBtYXJrZWQgLSBhIG1hcmtkb3duIHBhcnNlclxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTQsIENocmlzdG9waGVyIEplZmZyZXkuIChNSVQgTGljZW5zZWQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY2hqai9tYXJrZWRcbiAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4vKipcbiAqIEJsb2NrLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgYmxvY2sgPSB7XG4gIG5ld2xpbmU6IC9eXFxuKy8sXG4gIGNvZGU6IC9eKCB7NH1bXlxcbl0rXFxuKikrLyxcbiAgZmVuY2VzOiBub29wLFxuICBocjogL14oICpbLSpfXSl7Myx9ICooPzpcXG4rfCQpLyxcbiAgaGVhZGluZzogL14gKigjezEsNn0pICooW15cXG5dKz8pICojKiAqKD86XFxuK3wkKS8sXG4gIG5wdGFibGU6IG5vb3AsXG4gIGxoZWFkaW5nOiAvXihbXlxcbl0rKVxcbiAqKD18LSl7Mix9ICooPzpcXG4rfCQpLyxcbiAgYmxvY2txdW90ZTogL14oICo+W15cXG5dKyhcXG4oPyFkZWYpW15cXG5dKykqXFxuKikrLyxcbiAgbGlzdDogL14oICopKGJ1bGwpIFtcXHNcXFNdKz8oPzpocnxkZWZ8XFxuezIsfSg/ISApKD8hXFwxYnVsbCApXFxuKnxcXHMqJCkvLFxuICBodG1sOiAvXiAqKD86Y29tbWVudCAqKD86XFxufFxccyokKXxjbG9zZWQgKig/OlxcbnsyLH18XFxzKiQpfGNsb3NpbmcgKig/OlxcbnsyLH18XFxzKiQpKS8sXG4gIGRlZjogL14gKlxcWyhbXlxcXV0rKVxcXTogKjw/KFteXFxzPl0rKT4/KD86ICtbXCIoXShbXlxcbl0rKVtcIildKT8gKig/Olxcbit8JCkvLFxuICB0YWJsZTogbm9vcCxcbiAgcGFyYWdyYXBoOiAvXigoPzpbXlxcbl0rXFxuPyg/IWhyfGhlYWRpbmd8bGhlYWRpbmd8YmxvY2txdW90ZXx0YWd8ZGVmKSkrKVxcbiovLFxuICB0ZXh0OiAvXlteXFxuXSsvXG59O1xuXG5ibG9jay5idWxsZXQgPSAvKD86WyorLV18XFxkK1xcLikvO1xuYmxvY2suaXRlbSA9IC9eKCAqKShidWxsKSBbXlxcbl0qKD86XFxuKD8hXFwxYnVsbCApW15cXG5dKikqLztcbmJsb2NrLml0ZW0gPSByZXBsYWNlKGJsb2NrLml0ZW0sICdnbScpXG4gICgvYnVsbC9nLCBibG9jay5idWxsZXQpXG4gICgpO1xuXG5ibG9jay5saXN0ID0gcmVwbGFjZShibG9jay5saXN0KVxuICAoL2J1bGwvZywgYmxvY2suYnVsbGV0KVxuICAoJ2hyJywgJ1xcXFxuKyg/PVxcXFwxPyg/OlstKl9dICopezMsfSg/OlxcXFxuK3wkKSknKVxuICAoJ2RlZicsICdcXFxcbisoPz0nICsgYmxvY2suZGVmLnNvdXJjZSArICcpJylcbiAgKCk7XG5cbmJsb2NrLmJsb2NrcXVvdGUgPSByZXBsYWNlKGJsb2NrLmJsb2NrcXVvdGUpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuYmxvY2suX3RhZyA9ICcoPyEoPzonXG4gICsgJ2F8ZW18c3Ryb25nfHNtYWxsfHN8Y2l0ZXxxfGRmbnxhYmJyfGRhdGF8dGltZXxjb2RlJ1xuICArICd8dmFyfHNhbXB8a2JkfHN1YnxzdXB8aXxifHV8bWFya3xydWJ5fHJ0fHJwfGJkaXxiZG8nXG4gICsgJ3xzcGFufGJyfHdicnxpbnN8ZGVsfGltZylcXFxcYilcXFxcdysoPyE6L3xbXlxcXFx3XFxcXHNAXSpAKVxcXFxiJztcblxuYmxvY2suaHRtbCA9IHJlcGxhY2UoYmxvY2suaHRtbClcbiAgKCdjb21tZW50JywgLzwhLS1bXFxzXFxTXSo/LS0+LylcbiAgKCdjbG9zZWQnLCAvPCh0YWcpW1xcc1xcU10rPzxcXC9cXDE+LylcbiAgKCdjbG9zaW5nJywgLzx0YWcoPzpcIlteXCJdKlwifCdbXiddKid8W14nXCI+XSkqPz4vKVxuICAoL3RhZy9nLCBibG9jay5fdGFnKVxuICAoKTtcblxuYmxvY2sucGFyYWdyYXBoID0gcmVwbGFjZShibG9jay5wYXJhZ3JhcGgpXG4gICgnaHInLCBibG9jay5ocilcbiAgKCdoZWFkaW5nJywgYmxvY2suaGVhZGluZylcbiAgKCdsaGVhZGluZycsIGJsb2NrLmxoZWFkaW5nKVxuICAoJ2Jsb2NrcXVvdGUnLCBibG9jay5ibG9ja3F1b3RlKVxuICAoJ3RhZycsICc8JyArIGJsb2NrLl90YWcpXG4gICgnZGVmJywgYmxvY2suZGVmKVxuICAoKTtcblxuLyoqXG4gKiBOb3JtYWwgQmxvY2sgR3JhbW1hclxuICovXG5cbmJsb2NrLm5vcm1hbCA9IG1lcmdlKHt9LCBibG9jayk7XG5cbi8qKlxuICogR0ZNIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay5nZm0gPSBtZXJnZSh7fSwgYmxvY2subm9ybWFsLCB7XG4gIGZlbmNlczogL14gKihgezMsfXx+ezMsfSkgKihcXFMrKT8gKlxcbihbXFxzXFxTXSs/KVxccypcXDEgKig/Olxcbit8JCkvLFxuICBwYXJhZ3JhcGg6IC9eL1xufSk7XG5cbmJsb2NrLmdmbS5wYXJhZ3JhcGggPSByZXBsYWNlKGJsb2NrLnBhcmFncmFwaClcbiAgKCcoPyEnLCAnKD8hJ1xuICAgICsgYmxvY2suZ2ZtLmZlbmNlcy5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDInKSArICd8J1xuICAgICsgYmxvY2subGlzdC5zb3VyY2UucmVwbGFjZSgnXFxcXDEnLCAnXFxcXDMnKSArICd8JylcbiAgKCk7XG5cbi8qKlxuICogR0ZNICsgVGFibGVzIEJsb2NrIEdyYW1tYXJcbiAqL1xuXG5ibG9jay50YWJsZXMgPSBtZXJnZSh7fSwgYmxvY2suZ2ZtLCB7XG4gIG5wdGFibGU6IC9eICooXFxTLipcXHwuKilcXG4gKihbLTpdKyAqXFx8Wy18IDpdKilcXG4oKD86LipcXHwuKig/OlxcbnwkKSkqKVxcbiovLFxuICB0YWJsZTogL14gKlxcfCguKylcXG4gKlxcfCggKlstOl0rWy18IDpdKilcXG4oKD86ICpcXHwuKig/OlxcbnwkKSkqKVxcbiovXG59KTtcblxuLyoqXG4gKiBCbG9jayBMZXhlclxuICovXG5cbmZ1bmN0aW9uIExleGVyKG9wdGlvbnMpIHtcbiAgdGhpcy50b2tlbnMgPSBbXTtcbiAgdGhpcy50b2tlbnMubGlua3MgPSB7fTtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMucnVsZXMgPSBibG9jay5ub3JtYWw7XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5nZm0pIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhYmxlcykge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLnRhYmxlcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ydWxlcyA9IGJsb2NrLmdmbTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvc2UgQmxvY2sgUnVsZXNcbiAqL1xuXG5MZXhlci5ydWxlcyA9IGJsb2NrO1xuXG4vKipcbiAqIFN0YXRpYyBMZXggTWV0aG9kXG4gKi9cblxuTGV4ZXIubGV4ID0gZnVuY3Rpb24oc3JjLCBvcHRpb25zKSB7XG4gIHZhciBsZXhlciA9IG5ldyBMZXhlcihvcHRpb25zKTtcbiAgcmV0dXJuIGxleGVyLmxleChzcmMpO1xufTtcblxuLyoqXG4gKiBQcmVwcm9jZXNzaW5nXG4gKi9cblxuTGV4ZXIucHJvdG90eXBlLmxleCA9IGZ1bmN0aW9uKHNyYykge1xuICBzcmMgPSBzcmNcbiAgICAucmVwbGFjZSgvXFxyXFxufFxcci9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFx0L2csICcgICAgJylcbiAgICAucmVwbGFjZSgvXFx1MDBhMC9nLCAnICcpXG4gICAgLnJlcGxhY2UoL1xcdTI0MjQvZywgJ1xcbicpO1xuXG4gIHJldHVybiB0aGlzLnRva2VuKHNyYywgdHJ1ZSk7XG59O1xuXG4vKipcbiAqIExleGluZ1xuICovXG5cbkxleGVyLnByb3RvdHlwZS50b2tlbiA9IGZ1bmN0aW9uKHNyYywgdG9wLCBicSkge1xuICB2YXIgc3JjID0gc3JjLnJlcGxhY2UoL14gKyQvZ20sICcnKVxuICAgICwgbmV4dFxuICAgICwgbG9vc2VcbiAgICAsIGNhcFxuICAgICwgYnVsbFxuICAgICwgYlxuICAgICwgaXRlbVxuICAgICwgc3BhY2VcbiAgICAsIGlcbiAgICAsIGw7XG5cbiAgd2hpbGUgKHNyYykge1xuICAgIC8vIG5ld2xpbmVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5uZXdsaW5lLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMF0ubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnc3BhY2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvZGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5jb2RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eIHs0fS9nbSwgJycpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdjb2RlJyxcbiAgICAgICAgdGV4dDogIXRoaXMub3B0aW9ucy5wZWRhbnRpY1xuICAgICAgICAgID8gY2FwLnJlcGxhY2UoL1xcbiskLywgJycpXG4gICAgICAgICAgOiBjYXBcbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZmVuY2VzIChnZm0pXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZmVuY2VzLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgIGxhbmc6IGNhcFsyXSxcbiAgICAgICAgdGV4dDogY2FwWzNdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGhlYWRpbmdcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5oZWFkaW5nLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaGVhZGluZycsXG4gICAgICAgIGRlcHRoOiBjYXBbMV0ubGVuZ3RoLFxuICAgICAgICB0ZXh0OiBjYXBbMl1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFibGUgbm8gbGVhZGluZyBwaXBlIChnZm0pXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy5ucHRhYmxlLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBjZWxsczogY2FwWzNdLnJlcGxhY2UoL1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL14gKi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdjZW50ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldLnNwbGl0KC8gKlxcfCAqLyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goaXRlbSk7XG5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGxoZWFkaW5nXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMubGhlYWRpbmcuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdoZWFkaW5nJyxcbiAgICAgICAgZGVwdGg6IGNhcFsyXSA9PT0gJz0nID8gMSA6IDIsXG4gICAgICAgIHRleHQ6IGNhcFsxXVxuICAgICAgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBoclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmhyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnaHInXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIGJsb2NrcXVvdGVcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5ibG9ja3F1b3RlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdibG9ja3F1b3RlX3N0YXJ0J1xuICAgICAgfSk7XG5cbiAgICAgIGNhcCA9IGNhcFswXS5yZXBsYWNlKC9eICo+ID8vZ20sICcnKTtcblxuICAgICAgLy8gUGFzcyBgdG9wYCB0byBrZWVwIHRoZSBjdXJyZW50XG4gICAgICAvLyBcInRvcGxldmVsXCIgc3RhdGUuIFRoaXMgaXMgZXhhY3RseVxuICAgICAgLy8gaG93IG1hcmtkb3duLnBsIHdvcmtzLlxuICAgICAgdGhpcy50b2tlbihjYXAsIHRvcCwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnYmxvY2txdW90ZV9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlzdFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpc3QuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgYnVsbCA9IGNhcFsyXTtcblxuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICdsaXN0X3N0YXJ0JyxcbiAgICAgICAgb3JkZXJlZDogYnVsbC5sZW5ndGggPiAxXG4gICAgICB9KTtcblxuICAgICAgLy8gR2V0IGVhY2ggdG9wLWxldmVsIGl0ZW0uXG4gICAgICBjYXAgPSBjYXBbMF0ubWF0Y2godGhpcy5ydWxlcy5pdGVtKTtcblxuICAgICAgbmV4dCA9IGZhbHNlO1xuICAgICAgbCA9IGNhcC5sZW5ndGg7XG4gICAgICBpID0gMDtcblxuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaXRlbSA9IGNhcFtpXTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGxpc3QgaXRlbSdzIGJ1bGxldFxuICAgICAgICAvLyBzbyBpdCBpcyBzZWVuIGFzIHRoZSBuZXh0IHRva2VuLlxuICAgICAgICBzcGFjZSA9IGl0ZW0ubGVuZ3RoO1xuICAgICAgICBpdGVtID0gaXRlbS5yZXBsYWNlKC9eICooWyorLV18XFxkK1xcLikgKy8sICcnKTtcblxuICAgICAgICAvLyBPdXRkZW50IHdoYXRldmVyIHRoZVxuICAgICAgICAvLyBsaXN0IGl0ZW0gY29udGFpbnMuIEhhY2t5LlxuICAgICAgICBpZiAofml0ZW0uaW5kZXhPZignXFxuICcpKSB7XG4gICAgICAgICAgc3BhY2UgLT0gaXRlbS5sZW5ndGg7XG4gICAgICAgICAgaXRlbSA9ICF0aGlzLm9wdGlvbnMucGVkYW50aWNcbiAgICAgICAgICAgID8gaXRlbS5yZXBsYWNlKG5ldyBSZWdFeHAoJ14gezEsJyArIHNwYWNlICsgJ30nLCAnZ20nKSwgJycpXG4gICAgICAgICAgICA6IGl0ZW0ucmVwbGFjZSgvXiB7MSw0fS9nbSwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5leHQgbGlzdCBpdGVtIGJlbG9uZ3MgaGVyZS5cbiAgICAgICAgLy8gQmFja3BlZGFsIGlmIGl0IGRvZXMgbm90IGJlbG9uZyBpbiB0aGlzIGxpc3QuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc21hcnRMaXN0cyAmJiBpICE9PSBsIC0gMSkge1xuICAgICAgICAgIGIgPSBibG9jay5idWxsZXQuZXhlYyhjYXBbaSArIDFdKVswXTtcbiAgICAgICAgICBpZiAoYnVsbCAhPT0gYiAmJiAhKGJ1bGwubGVuZ3RoID4gMSAmJiBiLmxlbmd0aCA+IDEpKSB7XG4gICAgICAgICAgICBzcmMgPSBjYXAuc2xpY2UoaSArIDEpLmpvaW4oJ1xcbicpICsgc3JjO1xuICAgICAgICAgICAgaSA9IGwgLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERldGVybWluZSB3aGV0aGVyIGl0ZW0gaXMgbG9vc2Ugb3Igbm90LlxuICAgICAgICAvLyBVc2U6IC8oXnxcXG4pKD8hIClbXlxcbl0rXFxuXFxuKD8hXFxzKiQpL1xuICAgICAgICAvLyBmb3IgZGlzY291bnQgYmVoYXZpb3IuXG4gICAgICAgIGxvb3NlID0gbmV4dCB8fCAvXFxuXFxuKD8hXFxzKiQpLy50ZXN0KGl0ZW0pO1xuICAgICAgICBpZiAoaSAhPT0gbCAtIDEpIHtcbiAgICAgICAgICBuZXh0ID0gaXRlbS5jaGFyQXQoaXRlbS5sZW5ndGggLSAxKSA9PT0gJ1xcbic7XG4gICAgICAgICAgaWYgKCFsb29zZSkgbG9vc2UgPSBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogbG9vc2VcbiAgICAgICAgICAgID8gJ2xvb3NlX2l0ZW1fc3RhcnQnXG4gICAgICAgICAgICA6ICdsaXN0X2l0ZW1fc3RhcnQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlY3Vyc2UuXG4gICAgICAgIHRoaXMudG9rZW4oaXRlbSwgZmFsc2UsIGJxKTtcblxuICAgICAgICB0aGlzLnRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbGlzdF9pdGVtX2VuZCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAnbGlzdF9lbmQnXG4gICAgICB9KTtcblxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gaHRtbFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmh0bWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICAgID8gJ3BhcmFncmFwaCdcbiAgICAgICAgICA6ICdodG1sJyxcbiAgICAgICAgcHJlOiBjYXBbMV0gPT09ICdwcmUnIHx8IGNhcFsxXSA9PT0gJ3NjcmlwdCcgfHwgY2FwWzFdID09PSAnc3R5bGUnLFxuICAgICAgICB0ZXh0OiBjYXBbMF1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZGVmXG4gICAgaWYgKCghYnEgJiYgdG9wKSAmJiAoY2FwID0gdGhpcy5ydWxlcy5kZWYuZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLmxpbmtzW2NhcFsxXS50b0xvd2VyQ2FzZSgpXSA9IHtcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9O1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFibGUgKGdmbSlcbiAgICBpZiAodG9wICYmIChjYXAgPSB0aGlzLnJ1bGVzLnRhYmxlLmV4ZWMoc3JjKSkpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG5cbiAgICAgIGl0ZW0gPSB7XG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGhlYWRlcjogY2FwWzFdLnJlcGxhY2UoL14gKnwgKlxcfCAqJC9nLCAnJykuc3BsaXQoLyAqXFx8ICovKSxcbiAgICAgICAgYWxpZ246IGNhcFsyXS5yZXBsYWNlKC9eICp8XFx8ICokL2csICcnKS5zcGxpdCgvICpcXHwgKi8pLFxuICAgICAgICBjZWxsczogY2FwWzNdLnJlcGxhY2UoLyg/OiAqXFx8ICopP1xcbiQvLCAnJykuc3BsaXQoJ1xcbicpXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgaXRlbS5hbGlnbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL14gKi0rOiAqJC8udGVzdChpdGVtLmFsaWduW2ldKSkge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSAncmlnaHQnO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSs6ICokLy50ZXN0KGl0ZW0uYWxpZ25baV0pKSB7XG4gICAgICAgICAgaXRlbS5hbGlnbltpXSA9ICdjZW50ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKC9eICo6LSsgKiQvLnRlc3QoaXRlbS5hbGlnbltpXSkpIHtcbiAgICAgICAgICBpdGVtLmFsaWduW2ldID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uYWxpZ25baV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBpdGVtLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW0uY2VsbHNbaV0gPSBpdGVtLmNlbGxzW2ldXG4gICAgICAgICAgLnJlcGxhY2UoL14gKlxcfCAqfCAqXFx8ICokL2csICcnKVxuICAgICAgICAgIC5zcGxpdCgvICpcXHwgKi8pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRva2Vucy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB0b3AtbGV2ZWwgcGFyYWdyYXBoXG4gICAgaWYgKHRvcCAmJiAoY2FwID0gdGhpcy5ydWxlcy5wYXJhZ3JhcGguZXhlYyhzcmMpKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIHRoaXMudG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiAncGFyYWdyYXBoJyxcbiAgICAgICAgdGV4dDogY2FwWzFdLmNoYXJBdChjYXBbMV0ubGVuZ3RoIC0gMSkgPT09ICdcXG4nXG4gICAgICAgICAgPyBjYXBbMV0uc2xpY2UoMCwgLTEpXG4gICAgICAgICAgOiBjYXBbMV1cbiAgICAgIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRleHQuZXhlYyhzcmMpKSB7XG4gICAgICAvLyBUb3AtbGV2ZWwgc2hvdWxkIG5ldmVyIHJlYWNoIGhlcmUuXG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy50b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdGV4dDogY2FwWzBdXG4gICAgICB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChzcmMpIHtcbiAgICAgIHRocm93IG5ld1xuICAgICAgICBFcnJvcignSW5maW5pdGUgbG9vcCBvbiBieXRlOiAnICsgc3JjLmNoYXJDb2RlQXQoMCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzLnRva2Vucztcbn07XG5cbi8qKlxuICogSW5saW5lLUxldmVsIEdyYW1tYXJcbiAqL1xuXG52YXIgaW5saW5lID0ge1xuICBlc2NhcGU6IC9eXFxcXChbXFxcXGAqe31cXFtcXF0oKSMrXFwtLiFfPl0pLyxcbiAgYXV0b2xpbms6IC9ePChbXiA+XSsoQHw6XFwvKVteID5dKyk+LyxcbiAgdXJsOiBub29wLFxuICB0YWc6IC9ePCEtLVtcXHNcXFNdKj8tLT58XjxcXC8/XFx3Kyg/OlwiW15cIl0qXCJ8J1teJ10qJ3xbXidcIj5dKSo/Pi8sXG4gIGxpbms6IC9eIT9cXFsoaW5zaWRlKVxcXVxcKGhyZWZcXCkvLFxuICByZWZsaW5rOiAvXiE/XFxbKGluc2lkZSlcXF1cXHMqXFxbKFteXFxdXSopXFxdLyxcbiAgbm9saW5rOiAvXiE/XFxbKCg/OlxcW1teXFxdXSpcXF18W15cXFtcXF1dKSopXFxdLyxcbiAgc3Ryb25nOiAvXl9fKFtcXHNcXFNdKz8pX18oPyFfKXxeXFwqXFwqKFtcXHNcXFNdKz8pXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXlxcYl8oKD86X198W1xcc1xcU10pKz8pX1xcYnxeXFwqKCg/OlxcKlxcKnxbXFxzXFxTXSkrPylcXCooPyFcXCopLyxcbiAgY29kZTogL14oYCspXFxzKihbXFxzXFxTXSo/W15gXSlcXHMqXFwxKD8hYCkvLFxuICBicjogL14gezIsfVxcbig/IVxccyokKS8sXG4gIGRlbDogbm9vcCxcbiAgdGV4dDogL15bXFxzXFxTXSs/KD89W1xcXFw8IVxcW18qYF18IHsyLH1cXG58JCkvXG59O1xuXG5pbmxpbmUuX2luc2lkZSA9IC8oPzpcXFtbXlxcXV0qXFxdfFteXFxbXFxdXXxcXF0oPz1bXlxcW10qXFxdKSkqLztcbmlubGluZS5faHJlZiA9IC9cXHMqPD8oW1xcc1xcU10qPyk+Pyg/OlxccytbJ1wiXShbXFxzXFxTXSo/KVsnXCJdKT9cXHMqLztcblxuaW5saW5lLmxpbmsgPSByZXBsYWNlKGlubGluZS5saW5rKVxuICAoJ2luc2lkZScsIGlubGluZS5faW5zaWRlKVxuICAoJ2hyZWYnLCBpbmxpbmUuX2hyZWYpXG4gICgpO1xuXG5pbmxpbmUucmVmbGluayA9IHJlcGxhY2UoaW5saW5lLnJlZmxpbmspXG4gICgnaW5zaWRlJywgaW5saW5lLl9pbnNpZGUpXG4gICgpO1xuXG4vKipcbiAqIE5vcm1hbCBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5ub3JtYWwgPSBtZXJnZSh7fSwgaW5saW5lKTtcblxuLyoqXG4gKiBQZWRhbnRpYyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5wZWRhbnRpYyA9IG1lcmdlKHt9LCBpbmxpbmUubm9ybWFsLCB7XG4gIHN0cm9uZzogL15fXyg/PVxcUykoW1xcc1xcU10qP1xcUylfXyg/IV8pfF5cXCpcXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqXFwqKD8hXFwqKS8sXG4gIGVtOiAvXl8oPz1cXFMpKFtcXHNcXFNdKj9cXFMpXyg/IV8pfF5cXCooPz1cXFMpKFtcXHNcXFNdKj9cXFMpXFwqKD8hXFwqKS9cbn0pO1xuXG4vKipcbiAqIEdGTSBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5nZm0gPSBtZXJnZSh7fSwgaW5saW5lLm5vcm1hbCwge1xuICBlc2NhcGU6IHJlcGxhY2UoaW5saW5lLmVzY2FwZSkoJ10pJywgJ358XSknKSgpLFxuICB1cmw6IC9eKGh0dHBzPzpcXC9cXC9bXlxcczxdK1tePC4sOjtcIicpXFxdXFxzXSkvLFxuICBkZWw6IC9efn4oPz1cXFMpKFtcXHNcXFNdKj9cXFMpfn4vLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS50ZXh0KVxuICAgICgnXXwnLCAnfl18JylcbiAgICAoJ3wnLCAnfGh0dHBzPzovL3wnKVxuICAgICgpXG59KTtcblxuLyoqXG4gKiBHRk0gKyBMaW5lIEJyZWFrcyBJbmxpbmUgR3JhbW1hclxuICovXG5cbmlubGluZS5icmVha3MgPSBtZXJnZSh7fSwgaW5saW5lLmdmbSwge1xuICBicjogcmVwbGFjZShpbmxpbmUuYnIpKCd7Mix9JywgJyonKSgpLFxuICB0ZXh0OiByZXBsYWNlKGlubGluZS5nZm0udGV4dCkoJ3syLH0nLCAnKicpKClcbn0pO1xuXG4vKipcbiAqIElubGluZSBMZXhlciAmIENvbXBpbGVyXG4gKi9cblxuZnVuY3Rpb24gSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpIHtcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCBtYXJrZWQuZGVmYXVsdHM7XG4gIHRoaXMubGlua3MgPSBsaW5rcztcbiAgdGhpcy5ydWxlcyA9IGlubGluZS5ub3JtYWw7XG4gIHRoaXMucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXIgfHwgbmV3IFJlbmRlcmVyO1xuICB0aGlzLnJlbmRlcmVyLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgaWYgKCF0aGlzLmxpbmtzKSB7XG4gICAgdGhyb3cgbmV3XG4gICAgICBFcnJvcignVG9rZW5zIGFycmF5IHJlcXVpcmVzIGEgYGxpbmtzYCBwcm9wZXJ0eS4nKTtcbiAgfVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuZ2ZtKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5icmVha3MpIHtcbiAgICAgIHRoaXMucnVsZXMgPSBpbmxpbmUuYnJlYWtzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJ1bGVzID0gaW5saW5lLmdmbTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnBlZGFudGljKSB7XG4gICAgdGhpcy5ydWxlcyA9IGlubGluZS5wZWRhbnRpYztcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBJbmxpbmUgUnVsZXNcbiAqL1xuXG5JbmxpbmVMZXhlci5ydWxlcyA9IGlubGluZTtcblxuLyoqXG4gKiBTdGF0aWMgTGV4aW5nL0NvbXBpbGluZyBNZXRob2RcbiAqL1xuXG5JbmxpbmVMZXhlci5vdXRwdXQgPSBmdW5jdGlvbihzcmMsIGxpbmtzLCBvcHRpb25zKSB7XG4gIHZhciBpbmxpbmUgPSBuZXcgSW5saW5lTGV4ZXIobGlua3MsIG9wdGlvbnMpO1xuICByZXR1cm4gaW5saW5lLm91dHB1dChzcmMpO1xufTtcblxuLyoqXG4gKiBMZXhpbmcvQ29tcGlsaW5nXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dCA9IGZ1bmN0aW9uKHNyYykge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGxpbmtcbiAgICAsIHRleHRcbiAgICAsIGhyZWZcbiAgICAsIGNhcDtcblxuICB3aGlsZSAoc3JjKSB7XG4gICAgLy8gZXNjYXBlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuZXNjYXBlLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSBjYXBbMV07XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmF1dG9saW5rLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIGlmIChjYXBbMl0gPT09ICdAJykge1xuICAgICAgICB0ZXh0ID0gY2FwWzFdLmNoYXJBdCg2KSA9PT0gJzonXG4gICAgICAgICAgPyB0aGlzLm1hbmdsZShjYXBbMV0uc3Vic3RyaW5nKDcpKVxuICAgICAgICAgIDogdGhpcy5tYW5nbGUoY2FwWzFdKTtcbiAgICAgICAgaHJlZiA9IHRoaXMubWFuZ2xlKCdtYWlsdG86JykgKyB0ZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgICBocmVmID0gdGV4dDtcbiAgICAgIH1cbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgbnVsbCwgdGV4dCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyB1cmwgKGdmbSlcbiAgICBpZiAoIXRoaXMuaW5MaW5rICYmIChjYXAgPSB0aGlzLnJ1bGVzLnVybC5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGV4dCA9IGVzY2FwZShjYXBbMV0pO1xuICAgICAgaHJlZiA9IHRleHQ7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5saW5rKGhyZWYsIG51bGwsIHRleHQpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGFnXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMudGFnLmV4ZWMoc3JjKSkge1xuICAgICAgaWYgKCF0aGlzLmluTGluayAmJiAvXjxhIC9pLnRlc3QoY2FwWzBdKSkge1xuICAgICAgICB0aGlzLmluTGluayA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5MaW5rICYmIC9ePFxcL2E+L2kudGVzdChjYXBbMF0pKSB7XG4gICAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMub3B0aW9ucy5zYW5pdGl6ZVxuICAgICAgICA/IGVzY2FwZShjYXBbMF0pXG4gICAgICAgIDogY2FwWzBdO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gbGlua1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmxpbmsuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIHtcbiAgICAgICAgaHJlZjogY2FwWzJdLFxuICAgICAgICB0aXRsZTogY2FwWzNdXG4gICAgICB9KTtcbiAgICAgIHRoaXMuaW5MaW5rID0gZmFsc2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyByZWZsaW5rLCBub2xpbmtcbiAgICBpZiAoKGNhcCA9IHRoaXMucnVsZXMucmVmbGluay5leGVjKHNyYykpXG4gICAgICAgIHx8IChjYXAgPSB0aGlzLnJ1bGVzLm5vbGluay5leGVjKHNyYykpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgbGluayA9IChjYXBbMl0gfHwgY2FwWzFdKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG4gICAgICBsaW5rID0gdGhpcy5saW5rc1tsaW5rLnRvTG93ZXJDYXNlKCldO1xuICAgICAgaWYgKCFsaW5rIHx8ICFsaW5rLmhyZWYpIHtcbiAgICAgICAgb3V0ICs9IGNhcFswXS5jaGFyQXQoMCk7XG4gICAgICAgIHNyYyA9IGNhcFswXS5zdWJzdHJpbmcoMSkgKyBzcmM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5pbkxpbmsgPSB0cnVlO1xuICAgICAgb3V0ICs9IHRoaXMub3V0cHV0TGluayhjYXAsIGxpbmspO1xuICAgICAgdGhpcy5pbkxpbmsgPSBmYWxzZTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIHN0cm9uZ1xuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnN0cm9uZy5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5zdHJvbmcodGhpcy5vdXRwdXQoY2FwWzJdIHx8IGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gZW1cbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5lbS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5lbSh0aGlzLm91dHB1dChjYXBbMl0gfHwgY2FwWzFdKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb2RlXG4gICAgaWYgKGNhcCA9IHRoaXMucnVsZXMuY29kZS5leGVjKHNyYykpIHtcbiAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoY2FwWzBdLmxlbmd0aCk7XG4gICAgICBvdXQgKz0gdGhpcy5yZW5kZXJlci5jb2Rlc3Bhbihlc2NhcGUoY2FwWzJdLCB0cnVlKSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBiclxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLmJyLmV4ZWMoc3JjKSkge1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZyhjYXBbMF0ubGVuZ3RoKTtcbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcmVyLmJyKCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBkZWwgKGdmbSlcbiAgICBpZiAoY2FwID0gdGhpcy5ydWxlcy5kZWwuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IHRoaXMucmVuZGVyZXIuZGVsKHRoaXMub3V0cHV0KGNhcFsxXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChjYXAgPSB0aGlzLnJ1bGVzLnRleHQuZXhlYyhzcmMpKSB7XG4gICAgICBzcmMgPSBzcmMuc3Vic3RyaW5nKGNhcFswXS5sZW5ndGgpO1xuICAgICAgb3V0ICs9IGVzY2FwZSh0aGlzLnNtYXJ0eXBhbnRzKGNhcFswXSkpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHNyYykge1xuICAgICAgdGhyb3cgbmV3XG4gICAgICAgIEVycm9yKCdJbmZpbml0ZSBsb29wIG9uIGJ5dGU6ICcgKyBzcmMuY2hhckNvZGVBdCgwKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogQ29tcGlsZSBMaW5rXG4gKi9cblxuSW5saW5lTGV4ZXIucHJvdG90eXBlLm91dHB1dExpbmsgPSBmdW5jdGlvbihjYXAsIGxpbmspIHtcbiAgdmFyIGhyZWYgPSBlc2NhcGUobGluay5ocmVmKVxuICAgICwgdGl0bGUgPSBsaW5rLnRpdGxlID8gZXNjYXBlKGxpbmsudGl0bGUpIDogbnVsbDtcblxuICByZXR1cm4gY2FwWzBdLmNoYXJBdCgwKSAhPT0gJyEnXG4gICAgPyB0aGlzLnJlbmRlcmVyLmxpbmsoaHJlZiwgdGl0bGUsIHRoaXMub3V0cHV0KGNhcFsxXSkpXG4gICAgOiB0aGlzLnJlbmRlcmVyLmltYWdlKGhyZWYsIHRpdGxlLCBlc2NhcGUoY2FwWzFdKSk7XG59O1xuXG4vKipcbiAqIFNtYXJ0eXBhbnRzIFRyYW5zZm9ybWF0aW9uc1xuICovXG5cbklubGluZUxleGVyLnByb3RvdHlwZS5zbWFydHlwYW50cyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKCF0aGlzLm9wdGlvbnMuc21hcnR5cGFudHMpIHJldHVybiB0ZXh0O1xuICByZXR1cm4gdGV4dFxuICAgIC8vIGVtLWRhc2hlc1xuICAgIC5yZXBsYWNlKC8tLS9nLCAnXFx1MjAxNCcpXG4gICAgLy8gb3BlbmluZyBzaW5nbGVzXG4gICAgLnJlcGxhY2UoLyhefFstXFx1MjAxNC8oXFxbe1wiXFxzXSknL2csICckMVxcdTIwMTgnKVxuICAgIC8vIGNsb3Npbmcgc2luZ2xlcyAmIGFwb3N0cm9waGVzXG4gICAgLnJlcGxhY2UoLycvZywgJ1xcdTIwMTknKVxuICAgIC8vIG9wZW5pbmcgZG91Ymxlc1xuICAgIC5yZXBsYWNlKC8oXnxbLVxcdTIwMTQvKFxcW3tcXHUyMDE4XFxzXSlcIi9nLCAnJDFcXHUyMDFjJylcbiAgICAvLyBjbG9zaW5nIGRvdWJsZXNcbiAgICAucmVwbGFjZSgvXCIvZywgJ1xcdTIwMWQnKVxuICAgIC8vIGVsbGlwc2VzXG4gICAgLnJlcGxhY2UoL1xcLnszfS9nLCAnXFx1MjAyNicpO1xufTtcblxuLyoqXG4gKiBNYW5nbGUgTGlua3NcbiAqL1xuXG5JbmxpbmVMZXhlci5wcm90b3R5cGUubWFuZ2xlID0gZnVuY3Rpb24odGV4dCkge1xuICB2YXIgb3V0ID0gJydcbiAgICAsIGwgPSB0ZXh0Lmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIGNoO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2ggPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIGNoID0gJ3gnICsgY2gudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICBvdXQgKz0gJyYjJyArIGNoICsgJzsnO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUmVuZGVyZXJcbiAqL1xuXG5mdW5jdGlvbiBSZW5kZXJlcihvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG59XG5cblJlbmRlcmVyLnByb3RvdHlwZS5jb2RlID0gZnVuY3Rpb24oY29kZSwgbGFuZywgZXNjYXBlZCkge1xuICBpZiAodGhpcy5vcHRpb25zLmhpZ2hsaWdodCkge1xuICAgIHZhciBvdXQgPSB0aGlzLm9wdGlvbnMuaGlnaGxpZ2h0KGNvZGUsIGxhbmcpO1xuICAgIGlmIChvdXQgIT0gbnVsbCAmJiBvdXQgIT09IGNvZGUpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgY29kZSA9IG91dDtcbiAgICB9XG4gIH1cblxuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gJzxwcmU+PGNvZGU+J1xuICAgICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgICArICdcXG48L2NvZGU+PC9wcmU+JztcbiAgfVxuXG4gIHJldHVybiAnPHByZT48Y29kZSBjbGFzcz1cIidcbiAgICArIHRoaXMub3B0aW9ucy5sYW5nUHJlZml4XG4gICAgKyBlc2NhcGUobGFuZywgdHJ1ZSlcbiAgICArICdcIj4nXG4gICAgKyAoZXNjYXBlZCA/IGNvZGUgOiBlc2NhcGUoY29kZSwgdHJ1ZSkpXG4gICAgKyAnXFxuPC9jb2RlPjwvcHJlPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUuYmxvY2txdW90ZSA9IGZ1bmN0aW9uKHF1b3RlKSB7XG4gIHJldHVybiAnPGJsb2NrcXVvdGU+XFxuJyArIHF1b3RlICsgJzwvYmxvY2txdW90ZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbihodG1sKSB7XG4gIHJldHVybiBodG1sO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhlYWRpbmcgPSBmdW5jdGlvbih0ZXh0LCBsZXZlbCwgcmF3KSB7XG4gIHJldHVybiAnPGgnXG4gICAgKyBsZXZlbFxuICAgICsgJyBpZD1cIidcbiAgICArIHRoaXMub3B0aW9ucy5oZWFkZXJQcmVmaXhcbiAgICArIHJhdy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teXFx3XSsvZywgJy0nKVxuICAgICsgJ1wiPidcbiAgICArIHRleHRcbiAgICArICc8L2gnXG4gICAgKyBsZXZlbFxuICAgICsgJz5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmhyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGhyLz5cXG4nIDogJzxocj5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbihib2R5LCBvcmRlcmVkKSB7XG4gIHZhciB0eXBlID0gb3JkZXJlZCA/ICdvbCcgOiAndWwnO1xuICByZXR1cm4gJzwnICsgdHlwZSArICc+XFxuJyArIGJvZHkgKyAnPC8nICsgdHlwZSArICc+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5saXN0aXRlbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8bGk+JyArIHRleHQgKyAnPC9saT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnBhcmFncmFwaCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8cD4nICsgdGV4dCArICc8L3A+XFxuJztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS50YWJsZSA9IGZ1bmN0aW9uKGhlYWRlciwgYm9keSkge1xuICByZXR1cm4gJzx0YWJsZT5cXG4nXG4gICAgKyAnPHRoZWFkPlxcbidcbiAgICArIGhlYWRlclxuICAgICsgJzwvdGhlYWQ+XFxuJ1xuICAgICsgJzx0Ym9keT5cXG4nXG4gICAgKyBib2R5XG4gICAgKyAnPC90Ym9keT5cXG4nXG4gICAgKyAnPC90YWJsZT5cXG4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLnRhYmxlcm93ID0gZnVuY3Rpb24oY29udGVudCkge1xuICByZXR1cm4gJzx0cj5cXG4nICsgY29udGVudCArICc8L3RyPlxcbic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUudGFibGVjZWxsID0gZnVuY3Rpb24oY29udGVudCwgZmxhZ3MpIHtcbiAgdmFyIHR5cGUgPSBmbGFncy5oZWFkZXIgPyAndGgnIDogJ3RkJztcbiAgdmFyIHRhZyA9IGZsYWdzLmFsaWduXG4gICAgPyAnPCcgKyB0eXBlICsgJyBzdHlsZT1cInRleHQtYWxpZ246JyArIGZsYWdzLmFsaWduICsgJ1wiPidcbiAgICA6ICc8JyArIHR5cGUgKyAnPic7XG4gIHJldHVybiB0YWcgKyBjb250ZW50ICsgJzwvJyArIHR5cGUgKyAnPlxcbic7XG59O1xuXG4vLyBzcGFuIGxldmVsIHJlbmRlcmVyXG5SZW5kZXJlci5wcm90b3R5cGUuc3Ryb25nID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxzdHJvbmc+JyArIHRleHQgKyAnPC9zdHJvbmc+Jztcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5lbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZW0+JyArIHRleHQgKyAnPC9lbT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmNvZGVzcGFuID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gJzxjb2RlPicgKyB0ZXh0ICsgJzwvY29kZT4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmJyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9wdGlvbnMueGh0bWwgPyAnPGJyLz4nIDogJzxicj4nO1xufTtcblxuUmVuZGVyZXIucHJvdG90eXBlLmRlbCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgcmV0dXJuICc8ZGVsPicgKyB0ZXh0ICsgJzwvZGVsPic7XG59O1xuXG5SZW5kZXJlci5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb3QgPSBkZWNvZGVVUklDb21wb25lbnQodW5lc2NhcGUoaHJlZikpXG4gICAgICAgIC5yZXBsYWNlKC9bXlxcdzpdL2csICcnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmIChwcm90LmluZGV4T2YoJ2phdmFzY3JpcHQ6JykgPT09IDAgfHwgcHJvdC5pbmRleE9mKCd2YnNjcmlwdDonKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuICB2YXIgb3V0ID0gJzxhIGhyZWY9XCInICsgaHJlZiArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gJz4nICsgdGV4dCArICc8L2E+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cblJlbmRlcmVyLnByb3RvdHlwZS5pbWFnZSA9IGZ1bmN0aW9uKGhyZWYsIHRpdGxlLCB0ZXh0KSB7XG4gIHZhciBvdXQgPSAnPGltZyBzcmM9XCInICsgaHJlZiArICdcIiBhbHQ9XCInICsgdGV4dCArICdcIic7XG4gIGlmICh0aXRsZSkge1xuICAgIG91dCArPSAnIHRpdGxlPVwiJyArIHRpdGxlICsgJ1wiJztcbiAgfVxuICBvdXQgKz0gdGhpcy5vcHRpb25zLnhodG1sID8gJy8+JyA6ICc+JztcbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogUGFyc2luZyAmIENvbXBpbGluZ1xuICovXG5cbmZ1bmN0aW9uIFBhcnNlcihvcHRpb25zKSB7XG4gIHRoaXMudG9rZW5zID0gW107XG4gIHRoaXMudG9rZW4gPSBudWxsO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IG1hcmtlZC5kZWZhdWx0cztcbiAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyIHx8IG5ldyBSZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjtcbiAgdGhpcy5yZW5kZXJlci5vcHRpb25zID0gdGhpcy5vcHRpb25zO1xufVxuXG4vKipcbiAqIFN0YXRpYyBQYXJzZSBNZXRob2RcbiAqL1xuXG5QYXJzZXIucGFyc2UgPSBmdW5jdGlvbihzcmMsIG9wdGlvbnMsIHJlbmRlcmVyKSB7XG4gIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG9wdGlvbnMsIHJlbmRlcmVyKTtcbiAgcmV0dXJuIHBhcnNlci5wYXJzZShzcmMpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBMb29wXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHNyYykge1xuICB0aGlzLmlubGluZSA9IG5ldyBJbmxpbmVMZXhlcihzcmMubGlua3MsIHRoaXMub3B0aW9ucywgdGhpcy5yZW5kZXJlcik7XG4gIHRoaXMudG9rZW5zID0gc3JjLnJldmVyc2UoKTtcblxuICB2YXIgb3V0ID0gJyc7XG4gIHdoaWxlICh0aGlzLm5leHQoKSkge1xuICAgIG91dCArPSB0aGlzLnRvaygpO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn07XG5cbi8qKlxuICogTmV4dCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b2tlbiA9IHRoaXMudG9rZW5zLnBvcCgpO1xufTtcblxuLyoqXG4gKiBQcmV2aWV3IE5leHQgVG9rZW5cbiAqL1xuXG5QYXJzZXIucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aCAtIDFdIHx8IDA7XG59O1xuXG4vKipcbiAqIFBhcnNlIFRleHQgVG9rZW5zXG4gKi9cblxuUGFyc2VyLnByb3RvdHlwZS5wYXJzZVRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGJvZHkgPSB0aGlzLnRva2VuLnRleHQ7XG5cbiAgd2hpbGUgKHRoaXMucGVlaygpLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgIGJvZHkgKz0gJ1xcbicgKyB0aGlzLm5leHQoKS50ZXh0O1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuaW5saW5lLm91dHB1dChib2R5KTtcbn07XG5cbi8qKlxuICogUGFyc2UgQ3VycmVudCBUb2tlblxuICovXG5cblBhcnNlci5wcm90b3R5cGUudG9rID0gZnVuY3Rpb24oKSB7XG4gIHN3aXRjaCAodGhpcy50b2tlbi50eXBlKSB7XG4gICAgY2FzZSAnc3BhY2UnOiB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNhc2UgJ2hyJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaHIoKTtcbiAgICB9XG4gICAgY2FzZSAnaGVhZGluZyc6IHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmhlYWRpbmcoXG4gICAgICAgIHRoaXMuaW5saW5lLm91dHB1dCh0aGlzLnRva2VuLnRleHQpLFxuICAgICAgICB0aGlzLnRva2VuLmRlcHRoLFxuICAgICAgICB0aGlzLnRva2VuLnRleHQpO1xuICAgIH1cbiAgICBjYXNlICdjb2RlJzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuY29kZSh0aGlzLnRva2VuLnRleHQsXG4gICAgICAgIHRoaXMudG9rZW4ubGFuZyxcbiAgICAgICAgdGhpcy50b2tlbi5lc2NhcGVkKTtcbiAgICB9XG4gICAgY2FzZSAndGFibGUnOiB7XG4gICAgICB2YXIgaGVhZGVyID0gJydcbiAgICAgICAgLCBib2R5ID0gJydcbiAgICAgICAgLCBpXG4gICAgICAgICwgcm93XG4gICAgICAgICwgY2VsbFxuICAgICAgICAsIGZsYWdzXG4gICAgICAgICwgajtcblxuICAgICAgLy8gaGVhZGVyXG4gICAgICBjZWxsID0gJyc7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy50b2tlbi5oZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZmxhZ3MgPSB7IGhlYWRlcjogdHJ1ZSwgYWxpZ246IHRoaXMudG9rZW4uYWxpZ25baV0gfTtcbiAgICAgICAgY2VsbCArPSB0aGlzLnJlbmRlcmVyLnRhYmxlY2VsbChcbiAgICAgICAgICB0aGlzLmlubGluZS5vdXRwdXQodGhpcy50b2tlbi5oZWFkZXJbaV0pLFxuICAgICAgICAgIHsgaGVhZGVyOiB0cnVlLCBhbGlnbjogdGhpcy50b2tlbi5hbGlnbltpXSB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBoZWFkZXIgKz0gdGhpcy5yZW5kZXJlci50YWJsZXJvdyhjZWxsKTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMudG9rZW4uY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm93ID0gdGhpcy50b2tlbi5jZWxsc1tpXTtcblxuICAgICAgICBjZWxsID0gJyc7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCByb3cubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjZWxsICs9IHRoaXMucmVuZGVyZXIudGFibGVjZWxsKFxuICAgICAgICAgICAgdGhpcy5pbmxpbmUub3V0cHV0KHJvd1tqXSksXG4gICAgICAgICAgICB7IGhlYWRlcjogZmFsc2UsIGFsaWduOiB0aGlzLnRva2VuLmFsaWduW2pdIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keSArPSB0aGlzLnJlbmRlcmVyLnRhYmxlcm93KGNlbGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIudGFibGUoaGVhZGVyLCBib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnYmxvY2txdW90ZV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnYmxvY2txdW90ZV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuYmxvY2txdW90ZShib2R5KTtcbiAgICB9XG4gICAgY2FzZSAnbGlzdF9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJydcbiAgICAgICAgLCBvcmRlcmVkID0gdGhpcy50b2tlbi5vcmRlcmVkO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfZW5kJykge1xuICAgICAgICBib2R5ICs9IHRoaXMudG9rKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmxpc3QoYm9keSwgb3JkZXJlZCk7XG4gICAgfVxuICAgIGNhc2UgJ2xpc3RfaXRlbV9zdGFydCc6IHtcbiAgICAgIHZhciBib2R5ID0gJyc7XG5cbiAgICAgIHdoaWxlICh0aGlzLm5leHQoKS50eXBlICE9PSAnbGlzdF9pdGVtX2VuZCcpIHtcbiAgICAgICAgYm9keSArPSB0aGlzLnRva2VuLnR5cGUgPT09ICd0ZXh0J1xuICAgICAgICAgID8gdGhpcy5wYXJzZVRleHQoKVxuICAgICAgICAgIDogdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2xvb3NlX2l0ZW1fc3RhcnQnOiB7XG4gICAgICB2YXIgYm9keSA9ICcnO1xuXG4gICAgICB3aGlsZSAodGhpcy5uZXh0KCkudHlwZSAhPT0gJ2xpc3RfaXRlbV9lbmQnKSB7XG4gICAgICAgIGJvZHkgKz0gdGhpcy50b2soKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIubGlzdGl0ZW0oYm9keSk7XG4gICAgfVxuICAgIGNhc2UgJ2h0bWwnOiB7XG4gICAgICB2YXIgaHRtbCA9ICF0aGlzLnRva2VuLnByZSAmJiAhdGhpcy5vcHRpb25zLnBlZGFudGljXG4gICAgICAgID8gdGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dClcbiAgICAgICAgOiB0aGlzLnRva2VuLnRleHQ7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5odG1sKGh0bWwpO1xuICAgIH1cbiAgICBjYXNlICdwYXJhZ3JhcGgnOiB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5wYXJhZ3JhcGgodGhpcy5pbmxpbmUub3V0cHV0KHRoaXMudG9rZW4udGV4dCkpO1xuICAgIH1cbiAgICBjYXNlICd0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIucGFyYWdyYXBoKHRoaXMucGFyc2VUZXh0KCkpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXJzXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGh0bWwsIGVuY29kZSkge1xuICByZXR1cm4gaHRtbFxuICAgIC5yZXBsYWNlKCFlbmNvZGUgPyAvJig/ISM/XFx3KzspL2cgOiAvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZShodG1sKSB7XG4gIHJldHVybiBodG1sLnJlcGxhY2UoLyYoWyNcXHddKyk7L2csIGZ1bmN0aW9uKF8sIG4pIHtcbiAgICBuID0gbi50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChuID09PSAnY29sb24nKSByZXR1cm4gJzonO1xuICAgIGlmIChuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICByZXR1cm4gbi5jaGFyQXQoMSkgPT09ICd4J1xuICAgICAgICA/IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobi5zdWJzdHJpbmcoMiksIDE2KSlcbiAgICAgICAgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKCtuLnN1YnN0cmluZygxKSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIG9wdCkge1xuICByZWdleCA9IHJlZ2V4LnNvdXJjZTtcbiAgb3B0ID0gb3B0IHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb24gc2VsZihuYW1lLCB2YWwpIHtcbiAgICBpZiAoIW5hbWUpIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LCBvcHQpO1xuICAgIHZhbCA9IHZhbC5zb3VyY2UgfHwgdmFsO1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC8oXnxbXlxcW10pXFxeL2csICckMScpO1xuICAgIHJlZ2V4ID0gcmVnZXgucmVwbGFjZShuYW1lLCB2YWwpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cbm5vb3AuZXhlYyA9IG5vb3A7XG5cbmZ1bmN0aW9uIG1lcmdlKG9iaikge1xuICB2YXIgaSA9IDFcbiAgICAsIHRhcmdldFxuICAgICwga2V5O1xuXG4gIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzW2ldO1xuICAgIGZvciAoa2V5IGluIHRhcmdldCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSB0YXJnZXRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5cbi8qKlxuICogTWFya2VkXG4gKi9cblxuZnVuY3Rpb24gbWFya2VkKHNyYywgb3B0LCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgfHwgdHlwZW9mIG9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0O1xuICAgICAgb3B0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQgfHwge30pO1xuXG4gICAgdmFyIGhpZ2hsaWdodCA9IG9wdC5oaWdobGlnaHRcbiAgICAgICwgdG9rZW5zXG4gICAgICAsIHBlbmRpbmdcbiAgICAgICwgaSA9IDA7XG5cbiAgICB0cnkge1xuICAgICAgdG9rZW5zID0gTGV4ZXIubGV4KHNyYywgb3B0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgICB9XG5cbiAgICBwZW5kaW5nID0gdG9rZW5zLmxlbmd0aDtcblxuICAgIHZhciBkb25lID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIG9wdC5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb3V0O1xuXG4gICAgICB0cnkge1xuICAgICAgICBvdXQgPSBQYXJzZXIucGFyc2UodG9rZW5zLCBvcHQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBlcnIgPSBlO1xuICAgICAgfVxuXG4gICAgICBvcHQuaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuXG4gICAgICByZXR1cm4gZXJyXG4gICAgICAgID8gY2FsbGJhY2soZXJyKVxuICAgICAgICA6IGNhbGxiYWNrKG51bGwsIG91dCk7XG4gICAgfTtcblxuICAgIGlmICghaGlnaGxpZ2h0IHx8IGhpZ2hsaWdodC5sZW5ndGggPCAzKSB7XG4gICAgICByZXR1cm4gZG9uZSgpO1xuICAgIH1cblxuICAgIGRlbGV0ZSBvcHQuaGlnaGxpZ2h0O1xuXG4gICAgaWYgKCFwZW5kaW5nKSByZXR1cm4gZG9uZSgpO1xuXG4gICAgZm9yICg7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIChmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gJ2NvZGUnKSB7XG4gICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhpZ2hsaWdodCh0b2tlbi50ZXh0LCB0b2tlbi5sYW5nLCBmdW5jdGlvbihlcnIsIGNvZGUpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gZG9uZShlcnIpO1xuICAgICAgICAgIGlmIChjb2RlID09IG51bGwgfHwgY29kZSA9PT0gdG9rZW4udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRva2VuLnRleHQgPSBjb2RlO1xuICAgICAgICAgIHRva2VuLmVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgIC0tcGVuZGluZyB8fCBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSkodG9rZW5zW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0KSBvcHQgPSBtZXJnZSh7fSwgbWFya2VkLmRlZmF1bHRzLCBvcHQpO1xuICAgIHJldHVybiBQYXJzZXIucGFyc2UoTGV4ZXIubGV4KHNyYywgb3B0KSwgb3B0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGUubWVzc2FnZSArPSAnXFxuUGxlYXNlIHJlcG9ydCB0aGlzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGpqL21hcmtlZC4nO1xuICAgIGlmICgob3B0IHx8IG1hcmtlZC5kZWZhdWx0cykuc2lsZW50KSB7XG4gICAgICByZXR1cm4gJzxwPkFuIGVycm9yIG9jY3VyZWQ6PC9wPjxwcmU+J1xuICAgICAgICArIGVzY2FwZShlLm1lc3NhZ2UgKyAnJywgdHJ1ZSlcbiAgICAgICAgKyAnPC9wcmU+JztcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnNcbiAqL1xuXG5tYXJrZWQub3B0aW9ucyA9XG5tYXJrZWQuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uKG9wdCkge1xuICBtZXJnZShtYXJrZWQuZGVmYXVsdHMsIG9wdCk7XG4gIHJldHVybiBtYXJrZWQ7XG59O1xuXG5tYXJrZWQuZGVmYXVsdHMgPSB7XG4gIGdmbTogdHJ1ZSxcbiAgdGFibGVzOiB0cnVlLFxuICBicmVha3M6IGZhbHNlLFxuICBwZWRhbnRpYzogZmFsc2UsXG4gIHNhbml0aXplOiBmYWxzZSxcbiAgc21hcnRMaXN0czogZmFsc2UsXG4gIHNpbGVudDogZmFsc2UsXG4gIGhpZ2hsaWdodDogbnVsbCxcbiAgbGFuZ1ByZWZpeDogJ2xhbmctJyxcbiAgc21hcnR5cGFudHM6IGZhbHNlLFxuICBoZWFkZXJQcmVmaXg6ICcnLFxuICByZW5kZXJlcjogbmV3IFJlbmRlcmVyLFxuICB4aHRtbDogZmFsc2Vcbn07XG5cbi8qKlxuICogRXhwb3NlXG4gKi9cblxubWFya2VkLlBhcnNlciA9IFBhcnNlcjtcbm1hcmtlZC5wYXJzZXIgPSBQYXJzZXIucGFyc2U7XG5cbm1hcmtlZC5SZW5kZXJlciA9IFJlbmRlcmVyO1xuXG5tYXJrZWQuTGV4ZXIgPSBMZXhlcjtcbm1hcmtlZC5sZXhlciA9IExleGVyLmxleDtcblxubWFya2VkLklubGluZUxleGVyID0gSW5saW5lTGV4ZXI7XG5tYXJrZWQuaW5saW5lTGV4ZXIgPSBJbmxpbmVMZXhlci5vdXRwdXQ7XG5cbm1hcmtlZC5wYXJzZSA9IG1hcmtlZDtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IG1hcmtlZDtcbn0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIG1hcmtlZDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLm1hcmtlZCA9IG1hcmtlZDtcbn1cblxufSkuY2FsbChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKTtcbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgIGZyb20gJ2JhY29uanMnO1xuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XG5cbmNvbnN0IEVWRU5UX0tFWVVQID0gQmFjb24uZnJvbUV2ZW50VGFyZ2V0KGRvY3VtZW50LCAna2V5dXAnKTtcblxuLyoqXG4gKiBjcmVhdGUgRXZlbnRTdHJlYW0gZnJvbSB1c2VyIGlucHV0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gY2hhcktleVxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBrZXkoY2hhcktleSkge1xuICAgIGxldCBrZXlDb2RlID0gdHlwZW9mKGNoYXJLZXkpID09PSAnc3RyaW5nJyA/IGtleWNvZGUoY2hhcktleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBjaGFyS2V5O1xuICAgIHJldHVybiBFVkVOVF9LRVlVUC5maWx0ZXIoa2V5Q29kZUlzKGtleUNvZGUpKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICBjbGljayhlbCkge1xuICAgIHJldHVybiBCYWNvbi5mcm9tRXZlbnRUYXJnZXQoZWwsICdjbGljaycpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7RXZlbnRTdHJlYW19XG4gICAqL1xuICByZXNpemUoKSB7XG4gICAgcmV0dXJuIEJhY29uLmZyb21FdmVudFRhcmdldCh3aW5kb3csICdyZXNpemUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0ga2V5Q29kZVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBrZXlDb2RlSXMoa2V5Q29kZSkge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJhY29uICAgZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgY29udHJvbCBmcm9tICcuL2NvbnRyb2wnO1xuXG4vKipcbiAqIGZ1bGwgc2NyZWVuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSB0YXJnZXRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odGFyZ2V0KSB7XG4gIGxldCBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGJ1cy5vblZhbHVlKHRvZ2dsZVNjcmVlbk9mKHRhcmdldCkpO1xuICByZXR1cm4gYnVzO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTY3JlZW5PZihlbCkge1xuICBsZXQgcmVxdWVzdCwgZXhpdDtcblxuICBpZihlbC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgIHJlcXVlc3QgPSAncmVxdWVzdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYoZWwud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICByZXF1ZXN0ID0gJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJztcbiAgfSBlbHNlIGlmKGVsLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICdtb3pSZXF1ZXN0RnVsbFNjcmVlbic7XG4gIH0gZWxzZSBpZihlbC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgcmVxdWVzdCA9ICdtc1JlcXVlc3RGdWxsc2NyZWVuJztcbiAgfVxuXG4gIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZXhpdCA9ICdleGl0RnVsbHNjcmVlbic7XG4gIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGV4aXQgPSAnd2Via2l0RXhpdEZ1bGxzY3JlZW4nO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGV4aXQgPSAnbW96Q2FuY2VsRnVsbFNjcmVlbic7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgZXhpdCA9ICdtc0V4aXRGdWxsc2NyZWVuJztcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ICYmXG4gICAgICAhZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgJiZcbiAgICAgICFkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgIWRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgIGVsW3JlcXVlc3RdKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50W2V4aXRdKCk7XG4gICAgfVxuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGlmIHVzaW5nIGEgZmVhdHVyZSB0aGF0IHJlcXVpcmVzIGEgYnJvd3Nlci1wb2x5ZmlsbFxuICpcbiAqIEBzZWUgaHR0cHM6Ly82dG81Lm9yZy9wb2x5ZmlsbC5odG1sXG4gKi9cbmltcG9ydCBwb2x5ZmlsbCBmcm9tICc2dG81L2Jyb3dzZXItcG9seWZpbGwnO1xuXG4vKipcbiAqIFRhbGtpZS5qc1xuICovXG5pbXBvcnQgQmFjb24gICBmcm9tICdiYWNvbmpzJztcblxuaW1wb3J0IHV0aWwgICAgZnJvbSAnLi91dGlsJztcbmltcG9ydCBjb250cm9sIGZyb20gJy4vY29udHJvbCc7XG5pbXBvcnQgcXVlcnkgICBmcm9tICcuL3F1ZXJ5JztcblxuaW1wb3J0IE1hcmtkb3duICAgZnJvbSAnLi9tYXJrZG93bic7XG5pbXBvcnQgUGFnaW5nICAgICBmcm9tICcuL3BhZ2luZyc7XG5pbXBvcnQgRnVsbFNjcmVlbiBmcm9tICcuL2Z1bGxzY3JlZW4nO1xuaW1wb3J0IFJlc3BvbnNpdmUgZnJvbSAnLi9yZXNwb25zaXZlJztcblxuY29uc3QgSURFTlRfTkVYVCAgICAgPSAnbmV4dCc7XG5jb25zdCBJREVOVF9QUkVWICAgICA9ICdwcmV2JztcbmNvbnN0IElERU5UX1NDQUxFUiAgID0gJ3NjYWxlcic7XG5jb25zdCBJREVOVF9QQUdFICAgICA9ICdwYWdlJztcbmNvbnN0IElERU5UX1RPVEFMICAgID0gJ3RvdGFsJztcbmNvbnN0IElERU5UX1BST0dSRVNTID0gJ3Byb2dyZXNzJztcbmNvbnN0IE1JTUVfTUFSS0RPV04gID0gJ3RleHQveC1tYXJrZG93bic7XG5jb25zdCBBVFRSX0xBWU9VVCAgICA9ICdsYXlvdXQnO1xuXG5jb25zdCBOT1JNQUxfV0lEVEggID0gMTAyNDtcbmNvbnN0IE5PUk1BTF9IRUlHSFQgPSA3Njg7XG5jb25zdCBXSURFX1dJRFRIICAgID0gMTM2NjtcbmNvbnN0IFdJREVfSEVJR0hUICAgPSA3Njg7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGFsa2llT3B0aW9uc1xuICogQHByb3BlcnR5IHtCb29sZWFufSBbYXBpXVxuICogQHByb3BlcnR5IHtCb29sZWFufSBbd2lkZV1cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gW2NvbnRyb2xdXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IFtwcm9ncmVzc11cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcbiAgaWYgKG9wdGlvbnMuYXBpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1haW4gICAgICAgOiBtYWluLFxuICAgICAgdXRpbCAgICAgICA6IHV0aWwsXG4gICAgICBjb250cm9sICAgIDogY29udHJvbCxcbiAgICAgIHF1ZXJ5ICAgICAgOiBxdWVyeSxcbiAgICAgIG1hcmtkb3duICAgOiBNYXJrZG93bixcbiAgICAgIHBhZ2luZyAgICAgOiBQYWdpbmcsXG4gICAgICBmdWxsU2NyZWVuIDogRnVsbFNjcmVlbixcbiAgICAgIHJlc3BvbnNpdmUgOiBSZXNwb25zaXZlLFxuICAgICAgQmFjb24gICAgICA6IEJhY29uXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFpbihvcHRpb25zKTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7VGFsa2llT3B0aW9uc30gX29wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbWFpbihfb3B0aW9ucyA9IHt9KSB7XG5cbiAgLyoqXG4gICAqIGFwcGx5IGRlZmF1bHQgb3B0aW9uc1xuICAgKiBAdHlwZSB7KnxPYmplY3R9XG4gICAqL1xuICBsZXQgb3B0aW9ucyA9IHV0aWwuZGVmYXVsdHMoX29wdGlvbnMsIHtcbiAgICBhcGkgICAgICA6IGZhbHNlLFxuICAgIHdpZGUgICAgIDogdHJ1ZSxcbiAgICBjb250cm9sICA6IHRydWUsXG4gICAgcHJvZ3Jlc3MgOiB0cnVlXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIGZyb20gcXVlcnkgc3RyaW5nc1xuICAgKi9cbiAgbGV0IHBhcmFtcyA9IHF1ZXJ5KGxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgLyoqXG4gICAqIEluaXQgc2xpZGUgc2l6ZXNcbiAgICovXG4gIGxldCB3aWR0aCAgPSBvcHRpb25zLndpZGUgPyBXSURFX1dJRFRIICA6IE5PUk1BTF9XSURUSDtcbiAgbGV0IGhlaWdodCA9IG9wdGlvbnMud2lkZSA/IFdJREVfSEVJR0hUIDogTk9STUFMX0hFSUdIVDtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgIDxzdHlsZT5cbiAgICAgICMke0lERU5UX1NDQUxFUn0sXG4gICAgICBbbGF5b3V0XSB7XG4gICAgICAgIHdpZHRoOiAke3dpZHRofXB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogJHtoZWlnaHR9cHggIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICA8L3N0eWxlPmBcbiAgKTtcblxuICAvKipcbiAgICogSW5pdCBzbGlkZSBzZWN0aW9uc1xuICAgKi9cbiAgdXRpbC50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFt0eXBlPVwiJHtNSU1FX01BUktET1dOfVwiXWApKS5mb3JFYWNoKE1hcmtkb3duKTtcbiAgbGV0IHNsaWRlcyA9IHV0aWwudG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtBVFRSX0xBWU9VVH1dYCkpO1xuXG4gIC8qKlxuICAgKiBSZXNwb25zaXZlIHNjYWxpbmdcbiAgICovXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgPGRpdiBpZD1cIiR7SURFTlRfU0NBTEVSfVwiPjwvZGl2PlxuICBgKTtcbiAgbGV0IHNjYWxlckVsID0gdXRpbC5nZXRCeUlkKElERU5UX1NDQUxFUik7XG4gIHNsaWRlcy5mb3JFYWNoKChlbCkgPT4gc2NhbGVyRWwuYXBwZW5kQ2hpbGQoZWwpKTtcblxuICBsZXQgcmF0aW8gPSBSZXNwb25zaXZlKHtcbiAgICB3aWR0aCAgOiB3aWR0aCxcbiAgICBoZWlnaHQgOiBoZWlnaHQsXG4gICAgdGFyZ2V0IDogc2NhbGVyRWxcbiAgfSk7XG4gIHJhdGlvLnBsdWcoY29udHJvbC5yZXNpemUoKSk7XG5cbiAgLyoqXG4gICAqIFBhZ2luZyBjb250cm9sXG4gICAqL1xuICBsZXQgcGFnaW5nID0gUGFnaW5nKHtcbiAgICBzdGFydFBhZ2UgICAgIDogcGFyYW1zLnN0YXJ0UGFnZSB8fCAxLFxuICAgIGVuZFBhZ2UgICAgICAgOiBzbGlkZXMubGVuZ3RoLFxuICAgIHNsaWRlRWxlbWVudHMgOiBzbGlkZXNcbiAgfSk7XG5cbiAgcGFnaW5nLm5leHRCdXMucGx1Zyhjb250cm9sLmtleSgncmlnaHQnKSk7XG4gIHBhZ2luZy5wcmV2QnVzLnBsdWcoY29udHJvbC5rZXkoJ2xlZnQnKSk7XG5cbiAgLyoqXG4gICAqIEluc2VydCBVaSBFbGVtZW50c1xuICAgKi9cbiAgaWYgKG9wdGlvbnMuY29udHJvbCkge1xuICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICA8ZGl2IGlkPVwiY29udHJvbFwiPlxuICAgICAgICA8cD48c3BhbiBpZD1cInByZXZcIj4mbHQ7PC9zcGFuPlxuICAgICAgICBQYWdlIDxzcGFuIGlkPVwicGFnZVwiPjA8L3NwYW4+IG9mIDxzcGFuIGlkPVwidG90YWxcIj4wPC9zcGFuPlxuICAgICAgICA8c3BhbiBpZD1cIm5leHRcIj4mZ3Q7PC9zcGFuPjwvcD5cbiAgICAgIDwvZGl2PlxuICAgIGApO1xuXG4gICAgbGV0IG5leHRFbCA9IHV0aWwuZ2V0QnlJZChJREVOVF9ORVhUKTtcbiAgICBsZXQgcHJldkVsID0gdXRpbC5nZXRCeUlkKElERU5UX1BSRVYpO1xuXG4gICAgLy8gbmV4dCBidXR0b25cbiAgICBwYWdpbmcubmV4dEJ1cy5wbHVnKGNvbnRyb2wuY2xpY2sobmV4dEVsKSk7XG5cbiAgICAvLyBwcmV2IGJ1dHRvblxuICAgIHBhZ2luZy5wcmV2QnVzLnBsdWcoY29udHJvbC5jbGljayhwcmV2RWwpKTtcblxuICAgIC8vIGN1cnJlbnQgcGFnZVxuICAgIHBhZ2luZy5jdXJyZW50RXMub25WYWx1ZSh1dGlsLnRleHRBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUEFHRSkpKTtcblxuICAgIC8vIHRvdGFsIG9mIHBhZ2VcbiAgICBCYWNvbi5vbmNlKHNsaWRlcy5sZW5ndGgpLm9uVmFsdWUodXRpbC50ZXh0QXNzaWduT2YodXRpbC5nZXRCeUlkKElERU5UX1RPVEFMKSkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxkaXYgaWQ9XCJwcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgLy8gcHJvZ3Jlc3MgYmFyXG4gICAgcGFnaW5nLnBlcmNlbnRFcy5vblZhbHVlKHV0aWwuc3R5bGVBc3NpZ25PZih1dGlsLmdldEJ5SWQoSURFTlRfUFJPR1JFU1MpLCAnd2lkdGgnKSk7XG4gIH1cblxuICAvKipcbiAgICogRnVsbFNjcmVlblxuICAgKi9cbiAgRnVsbFNjcmVlbihkb2N1bWVudC5ib2R5KS5wbHVnKGNvbnRyb2wua2V5KCdmJykpO1xufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWNvbiAgZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgbWFya2VkIGZyb20gJ21hcmtlZCc7XG5pbXBvcnQgdXRpbCAgIGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IE1JTUVfTUFSS0RPV04gID0gJ3RleHQveC1tYXJrZG93bic7XG5cbm1hcmtlZC5zZXRPcHRpb25zKHtcbiAgbGFuZ1ByZWZpeDogJ2hsanMgJyxcbiAgaGlnaGxpZ2h0OiBmdW5jdGlvbiAoY29kZSkge1xuICAgIGlmICh3aW5kb3cuaGxqcyA9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGlnaGxpZ2h0LmpzIChgd2luZG93LmhsanNgKSBpcyBtaXNzaW5nJyk7XG4gICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvdy5obGpzLmhpZ2hsaWdodEF1dG8oY29kZSkudmFsdWU7XG4gIH1cbn0pO1xuXG4vKipcbiAqIGNvbXBpbGUgbWFya2Rvd25cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNvbXBpbGVNYXJrZG93bjtcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY29tcGlsZU1hcmtkb3duKGVsKSB7XG4gIGxldCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICBzZWN0aW9uLmlubmVySFRNTCA9IG1hcmtlZChlbC5pbm5lckhUTUwpO1xuICB1dGlsLnRvQXJyYXkoZWwuYXR0cmlidXRlcykuZmlsdGVyKG5vdFR5cGVBdHRyaWJ1dGUpLmZvckVhY2goY29weUF0dHJpYnV0ZVRvKHNlY3Rpb24pKTtcbiAgZWwucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoc2VjdGlvbiwgZWwpO1xuICByZXR1cm4gc2VjdGlvbjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNvcHlBdHRyaWJ1dGVUbyhlbCkge1xuICByZXR1cm4gZnVuY3Rpb24oYXR0cikge1xuICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyLm5hbWUsIGF0dHIudmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7QXR0cmlidXRlTm9kZX0gYXR0clxuICovXG5mdW5jdGlvbiBub3RUeXBlQXR0cmlidXRlKGF0dHIpIHtcbiAgcmV0dXJuIGF0dHIubmFtZSAhPT0gJ3R5cGUnO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gICBmcm9tICdiYWNvbmpzJztcbmltcG9ydCBjb250cm9sIGZyb20gJy4vY29udHJvbCc7XG5pbXBvcnQgdXRpbCAgICBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhZ2luZ09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFBhZ2VcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRQYWdlXG4gKiBAcHJvcGVydHkge0FycmF5PEVsZW1lbnQ+fSBzbGlkZUVsZW1lbnRzXG4gKi9cblxuLyoqXG4gKiBwYWdpbmcgY29udHJvbFxuICpcbiAqIEBwYXJhbSB7UGFnaW5nT3B0aW9uc30gb3B0aW9uc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgbGV0IG5leHRCdXMgICAgPSBuZXcgQmFjb24uQnVzKCk7XG4gIGxldCBwcmV2QnVzICAgID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gIGxldCBuZXh0RXMgPSBuZXh0QnVzLm1hcCgxKTtcbiAgbGV0IHByZXZFcyA9IHByZXZCdXMubWFwKC0xKTtcblxuICBsZXQgaW5pdGlhbFBhZ2UgPSBvcHRpb25zLnN0YXJ0UGFnZSB8fCAxO1xuICBsZXQgY29ycmVjdFBhZ2UgPSB1dGlsLmNvbXBvc2UoaW5SYW5nZU9mKDEsIG9wdGlvbnMuZW5kUGFnZSksIGFkZCk7XG5cbiAgbGV0IGJvdGhFcyAgPSBuZXh0RXMubWVyZ2UocHJldkVzKTtcbiAgbGV0IGN1cnJlbnQgPSBib3RoRXMuc2Nhbihpbml0aWFsUGFnZSwgY29ycmVjdFBhZ2UpLnNraXBEdXBsaWNhdGVzKCk7XG4gIGxldCBwZXJjZW50ID0gY3VycmVudC5tYXAocGVyY2VudE9mKG9wdGlvbnMuZW5kUGFnZSkpLnNraXBEdXBsaWNhdGVzKCk7XG5cbiAgQmFjb24uY29tYmluZUFzQXJyYXkoY3VycmVudCwgb3B0aW9ucy5zbGlkZUVsZW1lbnRzKS5vblZhbHVlKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgW2N1cnJlbnQsIGFsbF0gPSBkYXRhO1xuICAgIGFsbC5mb3JFYWNoKHRvSW52aXNpYmxlKTtcblxuICAgIGxldCBpbmRleCA9IGN1cnJlbnQgLSAxIC8qIGZpeCBwYWdlIHRvIGluZGV4ICovO1xuICAgIGFsbFtpbmRleF0gJiYgdG9WaXNpYmxlKGFsbFtpbmRleF0pO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHBlcmNlbnRFcyA6IHBlcmNlbnQsXG4gICAgY3VycmVudEVzIDogY3VycmVudCxcbiAgICBzdGFydEVzICAgOiBjdXJyZW50LmZpbHRlcigodikgPT4gdiA9PT0gMSksXG4gICAgZW5kRXMgICAgIDogY3VycmVudC5maWx0ZXIoKHYpID0+IHYgPT09IG9wdGlvbnMuZW5kUGFnZSksXG4gICAgbmV4dEJ1cyAgIDogbmV4dEJ1cyxcbiAgICBwcmV2QnVzICAgOiBwcmV2QnVzXG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICovXG5mdW5jdGlvbiB0b0ludmlzaWJsZShlbCkge1xuICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKi9cbmZ1bmN0aW9uIHRvVmlzaWJsZShlbCkge1xuICBlbC5zZXRBdHRyaWJ1dGUoJ3Zpc2libGUnLCAxKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbWluXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGluUmFuZ2VPZihtaW4sIG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oeikge1xuICAgIHJldHVybiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KHosIG1pbikpO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gcGVyY2VudE9mKG1heCkge1xuICByZXR1cm4gZnVuY3Rpb24oY3VycmVudCkge1xuICAgIHJldHVybiAoKDEwMCAvIG1heCkgKiBjdXJyZW50KSArICclJztcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGFkZCh4LCB5KSB7XG4gIHJldHVybiB4ICsgeTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBxdWVyeSBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHBhcnNlUXVlcnk7XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5KSB7XG4gIGxldCByZXQgPSAge307XG4gIHF1ZXJ5XG4gICAgLnNsaWNlKDEsIC0xKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLm1hcCgoa2V5RXFWYWwpID0+IGtleUVxVmFsLnNwbGl0KCc9JykpXG4gICAgLmZvckVhY2goKGt2KSA9PiByZXRba3ZbMF1dID0ga3ZbMV0pO1xuICByZXR1cm4gcmV0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQmFjb24gZnJvbSAnYmFjb25qcyc7XG5pbXBvcnQgdXRpbCAgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSYXRpb09wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtFbGVtZW50fSB0YXJnZXRcbiAqL1xuXG4vKipcbiAqIGNvbXB1dGUgcmF0aW9cbiAqXG4gKiBAcGFyYW0ge1JhdGlvT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMge0V2ZW50U3RyZWFtfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zID0ge30pIHtcblxuICBsZXQgYnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXG4gIGxldCBoUmF0aW8gICA9IGhvcml6b250YWxSYXRpb09mKG9wdGlvbnMud2lkdGgpO1xuICBsZXQgdlJhdGlvICAgPSB2ZXJ0aWNhbFJhdGlvT2Yob3B0aW9ucy5oZWlnaHQpO1xuXG4gIGxldCBoUmF0aW9FcyA9IGJ1cy5tYXAoaFJhdGlvKS50b1Byb3BlcnR5KGhSYXRpbygpKTtcbiAgbGV0IHZSYXRpb0VzID0gYnVzLm1hcCh2UmF0aW8pLnRvUHJvcGVydHkodlJhdGlvKCkpO1xuXG4gIGxldCBzY2FsZSA9IHV0aWwuY29tcG9zZShjZW50ZXJpbmdPZihvcHRpb25zLnRhcmdldCksIHNjYWxpbmdPZihvcHRpb25zLnRhcmdldCkpO1xuXG4gIEJhY29uLmNvbWJpbmVXaXRoKE1hdGgubWluLCBoUmF0aW9FcywgdlJhdGlvRXMpLm9uVmFsdWUoc2NhbGUpO1xuXG4gIHJldHVybiBidXM7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGhvcml6b250YWxSYXRpb09mKHdpZHRoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aWR0aDtcbiAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHZlcnRpY2FsUmF0aW9PZihoZWlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgLyBoZWlnaHQ7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzY2FsaW5nT2YoZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJhdGlvKSB7XG4gICAgZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYHNjYWxlKCR7TWF0aC5hYnMocmF0aW8pfSlgO1xuICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY2VudGVyaW5nT2YoZWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgZWwuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAgLSByZWN0LndpZHRoKSAvIDI7XG4gICAgZWwuc3R5bGUudG9wICA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0XG4gICAqIEByZXR1cm5zIHtBcnJheS48VD59XG4gICAqL1xuICB0b0FycmF5KGxpc3QpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUT0RPIHRlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdcbiAgICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBkZWZhdWx0cyhvcmlnLCBkZWZhdWx0cykge1xuICAgIGxldCByZXQgPSB0aGlzLmNsb25lKG9yaWcpO1xuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRzKS5mb3JFYWNoKChrKT0+IHtcbiAgICAgIGlmIChrIGluIHJldCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXRba10gPSBkZWZhdWx0c1trXTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0O1xuICB9LFxuICAvKipcbiAgICogVE9ETyB0ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBjbG9uZShvcmlnKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9yaWcpLmZvckVhY2goKGspPT4gcmV0W2tdID0gb3JpZ1trXSk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuLi4uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIGNvbXBvc2UoKSB7XG4gICAgLy8gaHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvI2NvbXBvc2VcbiAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcbiAgICBsZXQgc3RhcnQgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGkgPSBzdGFydDtcbiAgICAgIGxldCByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSxcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZGVudFxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG4gICAqL1xuICBnZXRCeUlkKGlkZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKi9cbiAgdGV4dEFzc2lnbk9mKGVsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9O1xuICB9LFxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICovXG4gIHN0eWxlQXNzaWduT2YoZWwsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG59O1xuIl19
