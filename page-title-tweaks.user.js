// ==UserScript==
// @name         Nexus Kit: 🔖 Tweak page titles for nicer tabs and bookmarks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  e.g. 'SkyUI' instead of 'SkyUI at Skyrim Special Edition Nexus - Mods and Community'
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/page-title-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/page-title-tweaks.user.js
// @run-at       document-idle
// @match         *://*.nexusmods.com/*/images/*
// @match         *://*.nexusmods.com/*/mods/*
// @match         *://*.nexusmods.com/mods/*
// @match         *://*.nexusmods.com/*/supporterimages/*
// @match         *://*.nexusmods.com/*/videos/*
// @match         *://*.nexusmods.com/news/*
// @match         *://*.nexusmods.com/posts/*
// @match         *://*.nexusmods.com/mods*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	window.nmxRegisterToggle = (_settingName, { onEnable: onEnable } = {}) => {
		queueMicrotask(() => onEnable?.(true));
	};
})();

(() => {
	let observer;
	const urlIPUse = new URLPattern("*://*.nexusmods.com/admin/members/ipuse*");
	nmxRegisterToggle("optTogglePageTitleTweaks", {
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		setTitle();
		const targetNode = document.querySelector("title");
		observerStart(targetNode);
	}
	function removeJS() {
		observerStop();
		if ("originalTitle" in document.head.dataset) {
			document.title = document.head.dataset.originalTitle;
			delete document.head.dataset.originalTitle;
		}
	}
	function observerStart(targetNode) {
		observerStop();
		if (!targetNode) return;
		window.addEventListener("unload", observerStop);
		observer = new MutationObserver(callback);
		observer.observe(targetNode, {
			characterData: true,
			childList: true,
			subtree: true,
		});
	}
	function observerStop() {
		window.removeEventListener("unload", observerStop);
		if (observer) {
			observer.disconnect();
			observer = null;
		}
	}
	function callback(mutationList, _observer) {
		for (const mutation of mutationList) {
			if (mutation.type === "characterData" && mutation.target.nodeType !== Node.TEXT_NODE) continue;
			setTitle();
			return;
		}
	}
	function setTitle() {
		let title = document.title;
		if (urlIPUse.test(location.href)) {
			const params = new URLSearchParams(location.search);
			const userID = params.get("uid");
			if (userID) {
				const userLink = document.querySelector(`table a[href="/users/${userID}"]`);
				title = `IP Use: ${userLink?.innerText || userID}`;
			} else {
				const ip = params.get("ip");
				if (ip) title = `IP Use: ${ip}`;
				else title = `IP Use`;
			}
		} else {
			title = title.replace(/^(.+) at .+Nexus - Mods and community$/i, "$1");
			title = title.replace(/^(.+) at Modding Tools - Nexus Mods$/i, "$1");
			title = title.replace(/^(.+) - Nexus Mods$/i, "$1");
		}
		if (title !== document.title) {
			document.head.dataset.originalTitle = document.title;
			document.title = title;
		}
	}
})();
