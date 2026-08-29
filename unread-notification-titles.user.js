// ==UserScript==
// @name         Nexus Kit: 🔔 Unread counts in page title
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  |
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/unread-notification-titles.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/unread-notification-titles.user.js
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
	const PREFIX_PATTERN = /^(?:🔔\d+ )?(?:✉\d+ )?· /;
	let bodyObserver;
	let titleObserver;
	let rescanTimer;
	nmxRegisterToggle("optToggleUnreadNotificationTitles", {
		onEnable: injectJS,
		onDisable: removeJS,
		defaultEnabled: false,
	});
	function injectJS() {
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
		else start();
	}
	function start() {
		document.removeEventListener("DOMContentLoaded", start);
		startBodyObserver();
		startTitleObserver();
		updateTitle();
	}
	function removeJS() {
		document.removeEventListener("DOMContentLoaded", start);
		stopBodyObserver();
		stopTitleObserver();
		clearTimeout(rescanTimer);
		restoreTitle();
	}
	function restoreTitle() {
		const stripped = document.title.replace(PREFIX_PATTERN, "");
		if (stripped !== document.title) document.title = stripped;
	}
	function startBodyObserver() {
		bodyObserver = new MutationObserver((mutationList) => {
			const portalRoot = document.getElementById("headlessui-portal-root");
			if (portalRoot && mutationList.every((mutation) => portalRoot.contains(mutation.target))) return;
			clearTimeout(rescanTimer);
			rescanTimer = setTimeout(updateTitle, 200);
		});
		bodyObserver.observe(document.body, {
			childList: true,
			subtree: true,
			characterData: true,
			attributes: true,
			attributeFilter: [
				"data-currentcount",
			],
		});
	}
	function stopBodyObserver() {
		bodyObserver?.disconnect();
		bodyObserver = undefined;
	}
	function startTitleObserver() {
		const titleEl = document.querySelector("title");
		if (!titleEl) return;
		titleObserver = new MutationObserver(updateTitle);
		titleObserver.observe(titleEl, {
			characterData: true,
			childList: true,
			subtree: true,
		});
	}
	function stopTitleObserver() {
		titleObserver?.disconnect();
		titleObserver = undefined;
	}
	function parseCount(text) {
		const n = Number.parseInt(text ?? "", 10);
		return Number.isNaN(n) ? 0 : n;
	}
	function bubbleCount(el) {
		if (!el || getComputedStyle(el).display === "none") return 0;
		return parseCount(el.textContent);
	}
	function getCounts() {
		if (location.hostname === "forums.nexusmods.com") {
			const notifications = document.querySelector("#elFullNotifications .ipsNotificationCount");
			const inbox = document.querySelector("#elFullInbox .ipsNotificationCount");
			return {
				notifications: parseCount(notifications?.dataset.currentcount),
				inbox: parseCount(inbox?.dataset.currentcount),
			};
		}
		const desktopHeader = document.querySelector('[data-e2eid="desktop-header"]');
		if (desktopHeader) {
			const notifTrigger = desktopHeader.querySelector('[aria-label="Show notifications"]');
			const inboxTrigger = desktopHeader.querySelector('[aria-label="View messages"]');
			const notifCount = notifTrigger?.parentElement?.querySelector('[data-e2eid="unread-message-count"]');
			const inboxCount = inboxTrigger?.parentElement?.querySelector('[data-e2eid="unread-message-count"]');
			return {
				notifications: parseCount(notifCount?.textContent),
				inbox: parseCount(inboxCount?.textContent),
			};
		}
		const notifications = document.querySelector("#head .rj-notifications .bubble");
		const inbox = document.querySelector("#head .rj-messages .bubble");
		return {
			notifications: bubbleCount(notifications),
			inbox: bubbleCount(inbox),
		};
	}
	function buildPrefix({ notifications: notifications, inbox: inbox }) {
		const parts = [];
		if (notifications > 0) parts.push(`🔔${notifications}`);
		if (inbox > 0) parts.push(`✉${inbox}`);
		return parts.length ? `${parts.join(" ")} · ` : "";
	}
	function updateTitle() {
		const prefix = buildPrefix(getCounts());
		const base = document.title.replace(PREFIX_PATTERN, "");
		const title = prefix + base;
		if (title !== document.title) document.title = title;
	}
})();
