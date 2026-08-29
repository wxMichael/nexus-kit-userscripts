// ==UserScript==
// @name         Nexus Kit: Disable Dark Reader Conflict
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  Prevents the Dark Reader extension from double-applying its own dark mode on top of the Nexus Mods site's native dark theme.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/disable-dark-reader.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/disable-dark-reader.user.js
// @run-at       document-start
// @match         *://*.nexusmods.com/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	window.nmxRegisterToggle = (_settingName, { onEnable: onEnable } = {}) => {
		queueMicrotask(() => onEnable?.(true));
	};
})();

(() => {
	const ADMIN_PANEL_PATH_PREFIXES = [
		"/admin/games/",
		"/admin/members/",
		"/admin/moderation/",
		"/admin/uploads/",
		"/admin/users/edit",
		"/admin/vortex/",
	];
	if (
		location.hostname === "graphql.nexusmods.com" ||
		location.hostname === "help.nexusmods.com" ||
		location.pathname === "/admin" ||
		ADMIN_PANEL_PATH_PREFIXES.some((prefix) => location.pathname.startsWith(prefix))
	) {
		return;
	}
	if (document.head) injectJS();
	else startObserver();
	function injectJS() {
		if (document.getElementsByName("darkreader-lock").length !== 0) return;
		const lock = document.createElement("meta");
		lock.name = "darkreader-lock";
		document.head.appendChild(lock);
	}
	function startObserver() {
		const observer = new MutationObserver(callback);
		observer.observe(document, {
			attributes: false,
			childList: true,
			subtree: true,
		});
	}
	function callback(mutationList, observer) {
		for (const mutation of mutationList) {
			if (mutation.type !== "childList") continue;
			if (mutation.addedNodes.length === 0) continue;
			for (const node of mutation.addedNodes) {
				if (node.nodeName !== "HEAD") continue;
				observer.disconnect();
				injectJS();
				return;
			}
		}
	}
})();
