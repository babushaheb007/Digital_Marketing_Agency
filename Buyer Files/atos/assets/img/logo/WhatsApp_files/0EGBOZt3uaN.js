;/*FB_PKG_DELIM*/

__d("WAWebChatArchiveBridge",["WALogger","WASyncdConst","WATimeUtils","WAWebApiActiveMessageRanges","WAWebArchiveChatSync","WAWebMessageRangeUtils","WAWebMiscErrors","asyncToGeneratorRuntime","err"],(function(a,b,c,d,e,f,g){function h(){var a=babelHelpers.taggedTemplateLiteralLoose(["update chat table failed"]);h=function(){return a};return a}function a(a,e,f){f=d("WATimeUtils").unixTimeMs();return c("WAWebArchiveChatSync").getMutationsForArchive(f,e,a).then(function(){var f=b("asyncToGeneratorRuntime").asyncToGenerator(function*(f){try{yield d("WAWebMessageRangeUtils").lockForMessageRangeSync(["chat"],f,function(){var g=b("asyncToGeneratorRuntime").asyncToGenerator(function*(b){b=b[0];if(f[0].action!==d("WASyncdConst").Actions.Archive)throw c("err")("syncd: expected archive action from getMutationsForArchive");yield d("WAWebApiActiveMessageRanges").addActiveMessageRange(a.toString(),"archive",f[0].binarySyncAction);return b.merge(a.toString(),i(e))});return function(a){return g.apply(this,arguments)}}());return{status:200}}catch(a){if(a instanceof d("WAWebMiscErrors").DbOnLogoutAbort)throw a;d("WALogger").ERROR(h()).verbose().devConsole(a).sendLogs("update chat table failed when send conversation to archive");throw c("err")("update chat table failed")}});return function(a){return f.apply(this,arguments)}}())}function i(a){var b={archive:a};a&&(b.pin=void 0);return b}g.sendConversationArchive=a}),98);
__d("WASyncdHandleKeyShare",["Promise","WAGetSyncKey","WALogger","WASyncd","WASyncdCryptoUtils","WASyncdStoreMissingKeys","regeneratorRuntime"],(function(a,b,c,d,e,f,g){"use strict";var h;function i(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: stored key share key id "," from device ",""]);i=function(){return a};return a}function j(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: key share from device "," has no keys with keydata."]);j=function(){return a};return a}function a(a,c){return b("regeneratorRuntime").async(function(e){while(1)switch(e.prev=e.next){case 0:c.some(function(a){return a.fullKey!=null})||d("WALogger").LOG(j(),a);e.next=3;return b("regeneratorRuntime").awrap((h||(h=b("Promise"))).all(c.map(function(c){var e,f,g;return b("regeneratorRuntime").async(function(h){while(1)switch(h.prev=h.next){case 0:e=c.keyId,f=c.fullKey;if(!(f==null)){h.next=3;break}return h.abrupt("return");case 3:h.next=5;return b("regeneratorRuntime").awrap(d("WAGetSyncKey").getSyncKeyInTransaction_DO_NOT_USE(e));case 5:g=h.sent;if(g){h.next=10;break}h.next=9;return b("regeneratorRuntime").awrap(d("WAGetSyncKey").setSyncKeyInTransaction(f));case 9:d("WALogger").LOG(i(),d("WASyncdCryptoUtils").syncKeyIdToHex(e),a);case 10:case"end":return h.stop()}},null,this)})));case 3:e.next=5;return b("regeneratorRuntime").awrap(d("WASyncdStoreMissingKeys").updateMissingKeys(c.map(function(a){var b=a.keyId;a=a.fullKey;return{keyId:b,keyData:a==null?void 0:a.keyData}}),a));case 5:return e.abrupt("return",d("WASyncd").syncBlockedCollections());case 6:case"end":return e.stop()}},null,this)}g.handleKeyShare=a}),98);
__d("WAWebKeyManagementHandleKeyShareApi",["Promise","WAJids","WALogger","WALongInt","WASyncdCryptoUtils","WASyncdHandleKeyShare","WASyncdKeyManagementUtils","WASyncdKeyTypes","WAWebSyncdCriticalBootstrapProcessingApi","WAWebSyncdFatal","WAWebSyncdUploadFatalErrorMetric","WAWebUserPrefsMeUser","WAWebWamEnumBootstrapAppStateDataStageCode","WAWebWamEnumMdSyncdFatalErrorCode","asyncToGeneratorRuntime","gkx"],(function(a,b,c,d,e,f,g){var h;function i(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: key share wid error"]);i=function(){return a};return a}function j(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: fatal error: invalid key share key data"]);j=function(){return a};return a}function k(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: fatal error: invalid key share key data (from companion)"]);k=function(){return a};return a}function l(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: fatal error: key share key id has invalid bytelength of ",""]);l=function(){return a};return a}function m(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: incoming key info\n        \tkeyId: ",""],["syncd: incoming key info\n        \\tkeyId: ",""]);m=function(){return a};return a}function n(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: received key share key id "," from device "," "," keyData"]);n=function(){return a};return a}function o(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: received key with missing keyID from device ",""]);o=function(){return a};return a}function p(){var a=babelHelpers.taggedTemplateLiteralLoose(["syncd: handling key share from device "," with "," keys"]);p=function(){return a};return a}var q=0,r=6,s=function(){var a=b("asyncToGeneratorRuntime").asyncToGenerator(function*(a,c){d("WAWebSyncdCriticalBootstrapProcessingApi").logCriticalBootstrapStageIfNecessary(d("WAWebWamEnumBootstrapAppStateDataStageCode").BOOTSTRAP_APP_STATE_DATA_STAGE_CODE.MISSING_KEYS_RECEIVED);var e=c.getDeviceId();d("WALogger").LOG(p(),e,a.keys.length);var f=[];c=a.keys;if(!c)return(h||(h=b("Promise"))).resolve();yield (h||(h=b("Promise"))).all(c.map(function(a){var b;b=(b=a.keyId)==null?void 0:b.keyId;a=a.keyData;var c=a==null?void 0:a.keyData,g=c==null?null:d("WASyncdKeyTypes").toSyncKeyData(c);if(!b){d("WALogger").LOG(o(),e);return}var h=d("WASyncdKeyTypes").toSyncKeyId(b),i=d("WASyncdCryptoUtils").syncKeyIdToHex(h);d("WALogger").LOG(n(),i,e,c!=null?"with":"without");c&&d("WALogger").DEV(m(),i);if(b.byteLength!==r){d("WAWebSyncdUploadFatalErrorMetric").uploadFatalErrorMetric(d("WAWebWamEnumMdSyncdFatalErrorCode").MD_SYNCD_FATAL_ERROR_CODE.INVALID_KEY_SHARE_KEY_ID,null);d("WALogger").ERROR(l(),b.byteLength).sendLogs("syncd: fatal error: key share key id has invalid bytelength of "+b.byteLength);return d("WAWebSyncdFatal").handleFatalError()}if(a){c=a.timestamp;b=(i=a.fingerprint)==null?void 0:i.currentIndex;i=(i=a.fingerprint)==null?void 0:i.rawId;a=(a=a.fingerprint)==null?void 0:a.deviceIndexes;if(!g||c==null||b==null||i==null||!a){if(e!==q){d("WALogger").ERROR(k()).sendLogs("syncd: fatal error: invalid key share key data (from companion)");return}d("WAWebSyncdUploadFatalErrorMetric").uploadFatalErrorMetric(d("WAWebWamEnumMdSyncdFatalErrorCode").MD_SYNCD_FATAL_ERROR_CODE.INVALID_KEY_SHARE_KEY_DATA,null);d("WALogger").ERROR(j()).sendLogs("syncd: fatal error: invalid key share key data");return d("WAWebSyncdFatal").handleFatalError()}g={keyId:h,keyEpoch:d("WASyncdKeyManagementUtils").getKeyEpoch(h),keyData:g,timestamp:d("WALongInt").numberOrThrowIfTooLarge(c),fingerprint:{rawId:i,currentIndex:b,deviceIndexes:a}};f.push({keyId:h,fullKey:g})}else f.push({keyId:h,fullKey:null})}));return d("WASyncdHandleKeyShare").handleKeyShare(d("WAJids").interpretAsDeviceId(e),f)});return function(b,c){return a.apply(this,arguments)}}();function a(a,c){if(!d("WAWebUserPrefsMeUser").isMeAccountNonLid(c)){d("WALogger").ERROR(i()).sendLogs("syncd: key share wid error");return(h||(h=b("Promise"))).resolve()}return s(a,c)}function e(a){if(c("gkx")("26258"))return;s=a(s)}g.handleAppStateSyncKeyShare=a;g.setAppStateSyncKeyShareHandler=e}),98);
__d("WAWebAvDeviceEnums",[],(function(a,b,c,d,e,f){a={AudioInput:0,AudioOutput:1,Video:2,NotIdentified:3};b={DeviceSetup:0,DeviceMidstream:1,DeviceSelection:2,DeviceStop:3,DeviceOther:4};c={DeviceSuccess:0,FailureNonDevice:1,VideoDeviceNotFound:2,VideoDeviceUnsupportedCapability:3,VideoDeviceUnusable:4,VideoDeviceInUse:5,VideoDeviceUnauthorized:6,VideoDeviceTimeout:7,VideoDeviceOther:127,AudioCaptureDeviceNotFound:128,AudioPlaybackDeviceNotFound:129,AudioDeviceNotFound:130,AudioCaptureDeviceUnusable:131,AudioPlaybackDeviceUnusable:132,AudioDeviceUnusable:133,AudioCaptureDeviceInUse:134,AudioPlaybackDeviceInUse:135,AudioDeviceInUse:136,AudioCaptureDeviceUnauthorized:137,AudioPlaybackDeviceUnauthorized:138,AudioDeviceUnauthorized:139,AudioCaptureDeviceTimeout:140,AudioPlaybackDeviceTimeout:141,AudioDeviceTimeout:142,AudioCaptureDeviceOther:253,AudioPlaybackDeviceOther:254,AudioDeviceOther:255};f.AVDeviceType=a;f.AVDeviceStatusContext=b;f.AVDeviceStatusCode=c}),66);
__d("WAWebAvDeviceUtils",["WAWebAvDeviceEnums"],(function(a,b,c,d,e,f,g){var h="";function i(a){return{uid:a.uid,name:a.name,deviceType:Number(a.deviceType),isConnected:Boolean(a.connected),isSelected:Boolean(a.isSelected),isSystemDefault:Boolean(a.isDefault)}}function a(a,b){if(a.deviceType!==b.deviceType)return a.deviceType-b.deviceType;return a.isSystemDefault||b.isSystemDefault?a.isSystemDefault?-1:1:a.isConnected===b.isConnected?0:a.isConnected?-1:1}function b(a){a=a==null?void 0:a.map(function(a){return i(a)});a=a==null?void 0:a.filter(function(a){return a.deviceType!==d("WAWebAvDeviceEnums").AVDeviceType.NotIdentified&&a.isConnected});return(a=a)!=null?a:[]}function c(a,b){a=a==null?void 0:a.find(function(a){return a.isConnected&&a.isSystemDefault&&a.deviceType===b});return a}function j(a,b){a=a==null?void 0:a.find(function(a){return a.isConnected&&a.isSelected&&a.deviceType===b});return a}function e(a,b){return(a=a==null?void 0:a.filter(function(a){return a.deviceType===b&&a.isConnected}))!=null?a:[]}function f(a,b){return(b=(a=j(a,b))==null?void 0:a.uid)!=null?b:h}function k(a,b){var c=b.filter(function(b){return!a.some(function(a){return a.uid===b.uid})}),d=a.filter(function(a){return!b.some(function(b){return b.uid===a.uid})});return{added:c,removed:d}}g.DEFAULT_AV_DEVICE_ID=h;g.deviceInfoComparator=a;g.getSanitizedDevices=b;g.getSystemDefaultDevice=c;g.getSelectedDevice=j;g.getAvailableDevices=e;g.getSelectedDeviceIdOrDefault=f;g.getDiff=k}),98);
__d("WAWebWebcMemoryStatWamEvent",["WAWebWamCodegenUtils"],(function(a,b,c,d,e,f,g){b=(a=d("WAWebWamCodegenUtils")).defineEvents({WebcMemoryStat:[1188,{hasVerifiedNumber:[12,a.TYPES.BOOLEAN],jsHeapSizeLimit:[9,a.TYPES.INTEGER],numMessages:[8,a.TYPES.NUMBER],totalJsHeapSize:[10,a.TYPES.INTEGER],uptime:[6,a.TYPES.NUMBER],usedJsHeapSize:[11,a.TYPES.INTEGER]},[1,1,1],"regular"]},{WebcMemoryStat:[]});g.WebcMemoryStatWamEvent=b}),98);
__d("WAXplatTrim",[],(function(a,b,c,d,e,f){"use strict";var g=new Set(["\0","\t","\n","\v","\f","\r"," ","\x85","\xa0","\u1680","\u2000","\u2001","\u2002","\u2003","\u2004","\u2005","\u2006","\u2007","\u2008","\u2009","\u200a","\u200b","\u2028","\u2029","\u202f","\u205f","\u3000"]);a=function(a){return h(a,!0,!0)};b=function(a){return h(a,!0,!1)};c=function(a){return h(a,!1,!0)};function h(a,b,c){var d=0,e=a.length;if(b)while(d<e&&g.has(a.charAt(d)))d++;if(c){c=b?d:-1;while(e-1>c&&g.has(a.charAt(e-1)))e--}if(d===e)return"";return d===0&&e===a.length?a:a.slice(d,e)}f.trim=a;f.trimStart=b;f.trimEnd=c}),66);
__d("WAWebPollsSendPollCreationMsgAction",["Promise","WANullthrows","WATimeUtils","WAWebAck","WAWebGetEphemeralFieldsMsgActionsUtils","WAWebMsgKey","WAWebMsgType","WAWebNewsletterSendMsgAction","WAWebPollsActionsMetricUtils","WAWebSendMsgChatAction","WAWebUserPrefsMeUser","WAWebWamEnumPollActionType","WAWebWid","WAWebWidFactory","WAXplatTrim","asyncToGeneratorRuntime"],(function(a,b,c,d,e,f,g){var h;function a(a){return i.apply(this,arguments)}function i(){i=b("asyncToGeneratorRuntime").asyncToGenerator(function*(a){var e=a.poll,f=a.chat;a=a.quotedMsg;a=j({poll:e,chat:f,quotedMsg:a});var g=c("WAWebWid").isNewsletter(f.id);g=g?yield d("WAWebNewsletterSendMsgAction").sendNewsletterPollCreationMsg({msgData:a,chat:f}):yield (h||(h=b("Promise"))).all(d("WAWebSendMsgChatAction").addAndSendMsgToChat(f,a));a=g[0];d("WAWebPollsActionsMetricUtils").commitPollsActionsMetric({action:d("WAWebWamEnumPollActionType").POLL_ACTION_TYPE.CREATE_POLL,chat:f,creationDateInSeconds:a.t,pollOptionsCount:e.options.length})});return i.apply(this,arguments)}function j(a){var b,e=a.poll,f=a.chat;a=a.quotedMsg;var g=c("WAWebWid").isNewsletter(f.id),h=f.id;b=f.id.isLid()||f.isGroup&&Boolean((b=f.groupMetadata)==null?void 0:b.isLidAddressingMode)?c("WANullthrows")(d("WAWebUserPrefsMeUser").getMaybeMeLidUser()):c("WANullthrows")(d("WAWebUserPrefsMeUser").getMaybeMeUser());a=(a=a==null?void 0:a.msgContextInfo(f.id))!=null?a:{};return babelHelpers["extends"]({id:new(c("WAWebMsgKey"))({from:b,to:h,id:c("WAWebMsgKey").newId_DEPRECATED(),participant:f.isGroup?d("WAWebWidFactory").toUserWid(b):void 0,selfDir:"out"}),type:d("WAWebMsgType").MSG_TYPE.POLL_CREATION,kind:d("WAWebMsgType").MsgKind.PollCreation,isSentCagPollCreation:f.isCAG?!0:void 0,t:d("WATimeUtils").unixTime(),from:b,to:h,isNewMsg:!0,local:!0,ack:d("WAWebAck").ACK.CLOCK,pollName:d("WAXplatTrim").trim(e.name),pollOptions:e.options.map(function(a,b){a=a.name;return{name:d("WAXplatTrim").trim(a),localId:b}}),messageSecret:g?void 0:self.crypto.getRandomValues(new Uint8Array(32)),pollSelectableOptionsCount:e.selectableOptionsCount},a,d("WAWebGetEphemeralFieldsMsgActionsUtils").getEphemeralFields(f))}g.sendPollCreation=a;g.createPollCreationMsg=j}),98);
__d("WAWebSetArchiveChatAction",["fbt","Promise","WAAbortError","WALogger","WAWebActionToast.react","WAWebChatArchiveBridge","WAWebMiscErrors","WAWebStateUtils","WAWebToastManager","react"],(function(a,b,c,d,e,f,g,h){var i,j;function k(){var a=babelHelpers.taggedTemplateLiteralLoose(["models:chat:setArchive dropped"]);k=function(){return a};return a}var l=j||c("react");function a(a,b,c){return m(d("WAWebStateUtils").unproxy(a),b,c)}function m(a,c,e,f){f===void 0&&(f=d("WAWebActionToast.react").genId());if(a.archive===c)return(i||(i=b("Promise"))).reject(new(d("WAWebMiscErrors").ActionError)());var g=a.promises;if(g.setArchive)return g.setArchive.promise;var j=a.getLastMsgKeyForAction(),n=new AbortController(),o=n.signal;j=d("WAWebChatArchiveBridge").sendConversationArchive(a.id,c,j);var p=c?new(d("WAWebActionToast.react").ActionType)(h._("__JHASH__TbdFR9SFyko__JHASH__")):new(d("WAWebActionToast.react").ActionType)(h._("__JHASH__aafThUMTB5r__JHASH__")),q=j.then(function(b){if(o.aborted)throw new(d("WAAbortError").AbortError)();var g;if(b.status===200){g=c?h._("__JHASH__Dk9cAZTATJ5__JHASH__"):h._("__JHASH__71z-T1_c3m6__JHASH__");return new(d("WAWebActionToast.react").ActionType)(g,{actionText:h._("__JHASH__mpD8GydGn1Q__JHASH__"),actionHandler:function(){return m(a,!c,e,f)}})}else if(b.status>=400)return c?new(d("WAWebActionToast.react").ActionType)(h._("__JHASH__uHolzO1t-s4__JHASH__")):new(d("WAWebActionToast.react").ActionType)(h._("__JHASH__Gi641J940rP__JHASH__"))})["catch"](d("WAAbortError").catchAbort(function(){}))["catch"](function(b){d("WALogger").WARN(k()).devConsole(b);b=c?h._("__JHASH__uHolzO1t-s4__JHASH__"):h._("__JHASH__Gi641J940rP__JHASH__");return new(d("WAWebActionToast.react").ActionType)(b,{actionText:h._("__JHASH__TyKOR8KAtP1__JHASH__"),actionHandler:function(){return m(a,c,e,f)}})});e&&d("WAWebToastManager").ToastManager.open(l.jsx(d("WAWebActionToast.react").ActionToast,{id:f,initialAction:p,pendingAction:q}));p=j.then(function(b){b.status===200&&(a.archive=c,c&&(a.pin=void 0))})["finally"](function(){delete g.setArchive});q={promise:p,abortController:n,archive:c};g.setArchive=q;return p}g.setArchive=a}),226);
__d("WAWebSendKeyDistributionMsgAction",["Promise","WAWebGroupMetadataCollection","WAWebMsgKey","WAWebSendMsgJob","WAWebUserPrefsMeUser","WAWebWidFactory","asyncToGeneratorRuntime","err"],(function(a,b,c,d,e,f,g){var h;function a(a){return i.apply(this,arguments)}function i(){i=b("asyncToGeneratorRuntime").asyncToGenerator(function*(a){if(!a.isGroup())return(h||(h=b("Promise"))).reject(c("err")("[messaging] sendKeyDistributionMsg: only group chats are supported`"));var e=d("WAWebUserPrefsMeUser").getMaybeMeUser();e=new(c("WAWebMsgKey"))({from:e,to:a,id:yield c("WAWebMsgKey").newId(),participant:d("WAWebWidFactory").toUserWid(e),selfDir:"out"});yield c("WAWebGroupMetadataCollection").find(a);a=b("WAWebSendMsgJob");a=a.encryptAndSendKeyDistributionMsg;return a(e)});return i.apply(this,arguments)}g.sendKeyDistributionMsg=a}),98);
__d("useWAWebLexicalOnContentChange",["LexicalComposerContext","react","useWAWebStableCallback"],(function(a,b,c,d,e,f,g){var h,i=(h||d("react")).useEffect;function a(a){var b=d("LexicalComposerContext").useLexicalComposerContext(),e=b[0],f=c("useWAWebStableCallback")(a);i(function(){var a=e.registerTextContentListener(function(a){f(a)});return a},[e,f])}g.useLexicalOnContentChange=a}),98);
__d("WAWebCommandPaletteController",["Lexical","LexicalComposer","LexicalComposerContext","WAWebCommandPaletteInput.react","WAWebFlex.react","WAWebLexicalUtils","WAWebModalManager","WAWebToArray","err","react","useWAWebLexicalEvent","useWAWebLexicalOnContentChange"],(function(a,b,c,d,e,f,g){var h,i;b=i||d("react");var j=h||(h=c("react"));e=b.createContext;var k=b.useContext,l=b.useEffect,m=b.useMemo,n=b.useState,o={container:{borderTopStartRadius:"xfh8nwu",borderTopEndRadius:"xoqspk4",borderBottomEndRadius:"x12v9rci",borderBottomStartRadius:"x138vmkv",backgroundColor:"x1x0w6k2",color:"x6s6g2w",overflowX:"x6ikm8r",overflowY:"x10wlt62",$$css:!0},pluginContainer:{maxHeight:"x12f24lm",$$css:!0}},p=e(null);function q(){var a=k(p);if(a==null)throw c("err")("useCommandPalette must be used inside of a CommandPaletteContext");return a}function r(a){var b=a.defaultPlugin,c=a.triggeredPlugins;a=a.children;var e=n([]),f=e[0],g=e[1];e=n("");var h=e[0],i=e[1];e=d("LexicalComposerContext").useLexicalComposerContext();var k=e[0],m=f[f.length-1],o=function(a){d("WAWebLexicalUtils").setTextContent(k,a),i(a)},q=function(a,b){b=(b=b==null?void 0:b.input)!=null?b:"";o(b);g([].concat(f,[{plugin:a,input:b}]))},r=function(a){var b=f.slice(0,f.length-1),c=b[b.length-1],d="";c!=null&&((a==null?void 0:a.input)!=null?d=a.input:c.plugin.restoreInputOnBack===!0&&(d=c.input));o(d);g(b)};e=function(){return g([])};var s=function(a,b){b=(b=b==null?void 0:b.input)!=null?b:"";o(b);g([{plugin:a,input:b}])},t=function(){d("WAWebModalManager").ModalManager.close()};l(function(){if(f.length===0){var a=c==null?void 0:c.find(function(a){var b=d("WAWebToArray").toArray(a.trigger);if(b.includes(h))return a});a!=null&&q(a.plugin)}},[h]);d("useWAWebLexicalEvent").useLexicalCommandListener(k,d("Lexical").KEY_BACKSPACE_COMMAND,function(a){h===""&&(a.preventDefault(),r());return!1});d("useWAWebLexicalOnContentChange").useLexicalOnContentChange(function(a){m!=null&&(m.input=a),i(a)});s={input:h,pushPlugin:q,popPlugin:r,clearStack:e,replaceStack:s,closeModal:t,activePlugin:(e=m==null?void 0:m.plugin)!=null?e:b,pluginStack:f,pluginList:c};return j.jsx(p.Provider,{value:s,children:a})}r.displayName=r.name+" [from "+f.id+"]";function s(){var a=q();a=a.activePlugin;return a!=null?j.jsx(d("WAWebFlex.react").FlexColumn,{align:"stretch",xstyle:o.pluginContainer,children:j.jsx(a.Component,{})}):null}function a(a){var b=a.defaultPlugin;a=a.triggeredPlugins;var c=m(function(){return{namespace:"CommandPaletteInput",onError:function(){}}},[]);return j.jsx(d("WAWebFlex.react").FlexColumn,{align:"stretch",xstyle:o.container,children:j.jsx(d("LexicalComposer").LexicalComposer,{initialConfig:c,children:j.jsxs(r,{defaultPlugin:b,triggeredPlugins:a,children:[j.jsx(d("WAWebCommandPaletteInput.react").CommandPaletteInput,{}),j.jsx(s,{})]})})})}a.displayName=a.name+" [from "+f.id+"]";g.useCommandPalette=q;g.CommandPalette=a}),98);
__d("WAWebCommandPaletteInput.react",["LexicalErrorBoundary","LexicalPlainTextPlugin","WAWebCommandPaletteController","WAWebFlex.react","WAWebMultilinePlugin","WAWebRichTextInputContentEditable.react","WAWebSearchIcon","WAWebUISpacing","react","stylex"],(function(a,b,c,d,e,f,g){var h,i,j=h||c("react"),k={container:{height:"xsdox4t",boxSizing:"x9f619",$$css:!0},relative:{position:"x1n2onr6",$$css:!0},contentEditable:{width:"xh8yej3",$$css:!0},prefixes:{display:"x78zum5",flexDirection:"x1q0g3np",alignItems:"x6s0dn4",$$css:!0},prefix:{display:"x78zum5",alignItems:"x6s0dn4",color:"x1r12vwb",$$css:!0},prefixSeparator:{display:"x78zum5",fontWeight:"x1xlr1w8",$$css:!0}};function a(){var a=d("WAWebCommandPaletteController").useCommandPalette(),b=a.activePlugin;b=(b=b==null?void 0:b.placeholder)!=null?b:"Search chats, messages, settings, and more";a=a.pluginStack.length?j.jsx("div",{className:(i||(i=c("stylex")))([k.prefixes]),children:a.pluginStack.filter(function(a){return a.plugin.shortName}).map(function(a){return j.jsxs("div",{className:(i||(i=c("stylex")))([k.prefix,d("WAWebUISpacing").uiMargin.start8]),children:[j.jsx("div",{className:"x2aouup xlyipyv x6ikm8r x10wlt62 xuxw1ft",children:a.plugin.shortName}),j.jsx("div",{className:i([k.prefixSeparator,d("WAWebUISpacing").uiPadding.start8]),children:"/"})]},a.plugin.id)})}):null;return j.jsxs(d("WAWebFlex.react").FlexRow,{align:"center",padding:[8,16],xstyle:k.container,children:[a==null?j.jsx(d("WAWebSearchIcon").SearchIcon,{}):a,j.jsx(d("WAWebFlex.react").FlexRow,{grow:1,xstyle:k.relative,marginStart:8,children:j.jsx(d("LexicalPlainTextPlugin").PlainTextPlugin,{contentEditable:j.jsx(d("WAWebRichTextInputContentEditable.react").ContentEditable,{xstyle:[k.contentEditable,d("WAWebUISpacing").uiMargin.start4],focusOnMount:!0}),ErrorBoundary:c("LexicalErrorBoundary"),placeholder:j.jsx(d("WAWebRichTextInputContentEditable.react").Placeholder,{text:b})})}),j.jsx(d("WAWebMultilinePlugin").MultilinePlugin,{multiline:!1})]})}a.displayName=a.name+" [from "+f.id+"]";g.CommandPaletteInput=a}),98);
__d("WAWebAVDevicesModel",["WAWebAvDeviceEnums","WAWebAvDeviceUtils","WAWebBaseModel"],(function(a,b,c,d,e,f,g){a=function(a){babelHelpers.inheritsLoose(b,a);function b(){var b,c;for(var e=arguments.length,f=new Array(e),g=0;g<e;g++)f[g]=arguments[g];return(b=c=a.call.apply(a,[this].concat(f))||this,c.isMicrophoneAvailable=d("WAWebBaseModel").prop(!1),c.isSpeakerAvailable=d("WAWebBaseModel").prop(!1),c.isVideoAvailable=d("WAWebBaseModel").prop(!1),b)||babelHelpers.assertThisInitialized(c)}var c=b.prototype;c.initialize=function(){a.prototype.initialize.call(this)};c.refreshDeviceList=function(a){this.$AVDevices1=a,this.isVideoAvailable=d("WAWebAvDeviceUtils").getAvailableDevices(a,d("WAWebAvDeviceEnums").AVDeviceType.Video).length>0,this.isMicrophoneAvailable=d("WAWebAvDeviceUtils").getAvailableDevices(a,d("WAWebAvDeviceEnums").AVDeviceType.AudioInput).length>0,this.isSpeakerAvailable=d("WAWebAvDeviceUtils").getAvailableDevices(a,d("WAWebAvDeviceEnums").AVDeviceType.AudioOutput).length>0};return b}(d("WAWebBaseModel").BaseModel);b=d("WAWebBaseModel").defineModel(a);c=new b();e=c;g["default"]=e}),98);
__d("WAWebSearchAltIcon",["WAWebSvgComponentBase","react","stylex"],(function(a,b,c,d,e,f,g){var h,i,j=h||c("react"),k="search-alt";function a(a){var b=a.iconXstyle,e=a.height,f=a.width,g=a.viewBox;a=babelHelpers.objectWithoutPropertiesLoose(a,["iconXstyle","height","width","viewBox"]);var h;if(g){var l=g.x;l=l===void 0?0:l;var m=g.y;m=m===void 0?0:m;var n=g.width;n=n===void 0?0:n;g=g.height;g=g===void 0?0:g;h=[l,m,n,g].join(" ")}l=24;m=24;(e!=null||f!=null)&&(l=e,m=f);return j.jsx(d("WAWebSvgComponentBase").BaseSvgSpan,babelHelpers["extends"]({name:k},a,{children:j.jsxs("svg",{viewBox:(n=h)!=null?n:"0 0 24 24",height:l,width:m,preserveAspectRatio:"xMidYMid meet",className:(i||(i=c("stylex")))(b),version:"1.1",x:"0px",y:"0px",enableBackground:"new 0 0 24 24",children:[j.jsx("title",{children:k}),j.jsx("path",{fill:"currentColor",d:"M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"})]})}))}a.displayName=a.name+" [from "+f.id+"]";g.SearchAltIcon=a}),98);
__d("WAWebWamMemoryStat",["Promise","WANullthrows","WAWebMsgCollection","WAWebStreamModel","WAWebWebcMemoryStatWamEvent","gkx"],(function(a,b,c,d,e,f,g){var h,i=Date.now(),j=c("gkx")("26258")?15*60*1e3:5*60*1e3;function k(){var a;a=(a=self.performance)==null?void 0:a.memory;if(!a)return;return{uptime:(Date.now()-i)/1e3,jsHeapSizeLimit:a.jsHeapSizeLimit,totalJsHeapSize:a.totalJSHeapSize,usedJsHeapSize:a.usedJSHeapSize}}function a(){if(!k())return;self.setInterval(function(){var a=new(d("WAWebWebcMemoryStatWamEvent").WebcMemoryStatWamEvent)(babelHelpers["extends"]({},c("WANullthrows")(k()),{hasVerifiedNumber:d("WAWebStreamModel").Stream.mode===d("WAWebStreamModel").StreamMode.MAIN,numMessages:d("WAWebMsgCollection").MsgCollection.length}));a.commit()},j)}function e(){var a=k();return!a?(h||(h=b("Promise"))).resolve():(h||(h=b("Promise"))).resolve([{label:"Main Window",memory:a.usedJsHeapSize/1024,uptime:a.uptime}])}g.startMemoryWamStat=a;g.getMemoryTableRows=e}),98);