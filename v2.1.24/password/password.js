define(["exports","../websockets/binary_websockets","../windows/windows","../common/rivetsExtra","lodash","text!./password.html","css!./password.css"],function(a,b,c,d,e,f){"use strict";function g(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var h=g(b),i=g(c),j=g(d),k=g(e),l=g(f),m=null,n=null,o=a.init=function(a){a.click(function(){m?m.moveToTop():p()})},p=function(){var a=$(l["default"]).i18n();m=i["default"].createBlankWindow(a,{title:"Change password".i18n(),resizable:!1,collapsable:!1,minimizable:!1,maximizable:!1,height:350,"data-authorized":!0,close:function(){m.dialog("destroy"),m.remove(),m=null},open:function(){},destroy:function(){n&&n.unbind(),n=null}}),q(a),m.dialog("open")},q=function(a){var b={empty_fields:{validate:!1,clear:k["default"].debounce(function(){b.empty_fields.validate=!1},2e3),show:function(){b.empty_fields.validate=!0,b.empty_fields.clear()}},account:{password:"",new_password:"",verify_password:""},btn:{disabled:!1}};b.password_error_message=function(){var a=b.account.new_password;return""===a?b.empty_fields.validate?"* Please enter your new password".i18n():"":a.length<6?"* Password must be 6 characters minimum".i18n():/\d/.test(a)&&/[a-z]/.test(a)&&/[A-Z]/.test(a)?"":"* Password must contain uppercase letters and numbers".i18n()},b.btn.change=function(){b.empty_fields.show();b.account;if(""!==b.account.password&&""===b.password_error_message()&&b.account.new_password===b.account.verify_password){var a={change_password:1,old_password:b.account.password,new_password:b.account.new_password};b.btn.disabled=!0,h["default"].send(a).then(function(a){if(1!==a.change_password)throw{message:"Failed to update the password".i18n()};b.btn.disabled=!1,$.growl.notice({message:"Password successfully updated.".i18n()}),$.growl.notice({message:"Redirecting to oauth login page,<br/>Please use your new password to login.".i18n()}),require(["oauth/login"],function(a){k["default"].defer(function(){return a.login()},1e3)}),m.dialog("close")})["catch"](function(a){b.btn.disabled=!1,$.growl.error({message:a.message})})}},n=j["default"].bind(a[0],b)};a["default"]={init:o}});