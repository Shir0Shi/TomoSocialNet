"use strict";(self.webpackChunkreact_app=self.webpackChunkreact_app||[]).push([[408],{5408:function(s,e,a){a.r(e),a.d(e,{default:function(){return F}});var i=a(4487),n=a(1087),r="Dialogs_dialogs__nTOr-",t="Dialogs_dialogItems__220uJ",d="Dialogs_messageBody__Qdt-D",l="Dialogs_item__4mSBz",c="Dialogs_messages__y+uwf",o="Dialogs_chatInput__IIE3K",u="Dialogs_userMessage__tcsuo",g="Dialogs_otherMessage__z6nhV",m=a(184),_=function(s){return(0,m.jsx)("div",{className:l+" ",children:(0,m.jsxs)(n.OL,{to:"/dialogs/"+s.id,children:[(0,m.jsx)("img",{src:s.ava||""}),s.name]})})},h=function(s){var e=s.user,a=s.message;return(0,m.jsx)("div",{children:(0,m.jsx)("div",{className:e?u:g,children:a})})},x=(a(2791),a(3303)),j=a(7774),f=a(6854),v="DialogForm_chatForm__Kh-kt",D="DialogForm_chatInputContainer__1Cve6",p="DialogForm_chatInputButton__j-QGB",N=(0,j.B)(1e3),S=(0,x.Z)({form:"dialog"})((function(s){return(0,m.jsx)("div",{className:v,children:(0,m.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,m.jsx)("div",{className:D,children:(0,f.Gr)("Message","messageText",[N],f.gx)}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)("button",{children:"Send"})})]})})})),b=function(s){var e=s.dialogPage,a=e.dialogs.map((function(s){return(0,m.jsx)(_,{id:s.id,name:s.name,ava:s.ava},s.id)})),i=e.messages.map((function(s){return(0,m.jsx)(h,{message:s.message,user:3!=s.id},s.id)}));return(0,m.jsxs)("div",{className:r,children:[(0,m.jsx)("div",{className:t,children:a}),(0,m.jsxs)("div",{className:d,children:[(0,m.jsx)("div",{className:c,children:i}),(0,m.jsx)("div",{className:o,children:(0,m.jsx)(S,{onSubmit:function(e){return s.messageSend(e.messageText)}})})]})]})},I=a(8687),k=a(3221),B=a(7781),C=a(2974),F=(0,B.qC)((0,I.$j)((function(s){return{dialogPage:s.dialogPage}}),(function(s){return{messageSend:function(e){s(i.N.addMessage(e)),s((0,C.reset)("dialog"))}}})),k.D)(b)}}]);
//# sourceMappingURL=408.c500b79e.chunk.js.map