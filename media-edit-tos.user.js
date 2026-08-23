// ==UserScript==
// @name         Nexus Kit: ☑ Auto-check image/video terms box
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      13.0
// @description  When editing an image/video page, automatically check 'I agree to the terms and conditions'
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/media-edit-tos.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/media-edit-tos.user.js
// @run-at       document-idle
// @match         *://*.nexusmods.com/*/images/edit*
// @match         *://*.nexusmods.com/*/supporterimages/edit*
// @match         *://*.nexusmods.com/*/videos/edit*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	window.nmxRegisterToggle = (_settingName, { onEnable: onEnable } = {}) => {
		onEnable?.(true);
	};
})();

(() => {
	nmxRegisterToggle("optToggleMediaTermsAutoAgree", {
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		const terms = document.querySelector('input[id$="-terms"]');
		if (terms && !terms.checked) terms.click();
	}
	function removeJS() {
		const terms = document.querySelector('input[id$="-terms"]');
		if (terms?.checked) terms.click();
	}
})();
