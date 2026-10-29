// ==UserScript==
// @name         Nexus Kit: 📜 Mod Edit: Permissions tweaks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
// @description  Adds a license picker on a mod's Permissions edit tab.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-permissions.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-permissions.user.js
// @run-at       document-start
// @match         *://*.nexusmods.com/*/mods/*/edit/*
// @match         *://*.nexusmods.com/mods/*/edit/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/mod-edit-permissions/mod-edit-permissions.css":
			"Ci5ubXgtcGVybS1saWNlbnNlIHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJbWFyZ2luLXJpZ2h0OiAwLjVyZW07CgltaW4taGVpZ2h0OiAyOHB4OwoJcGFkZGluZzogMCAwLjVyZW07Cglib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci1zdHJva2UtbW9kZXJhdGUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSk7Cglib3JkZXItcmFkaXVzOiB2YXIoLS1yYWRpdXMtc20sIDAuMjVyZW0pOwoJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itc3VyZmFjZS1sb3csICMxODE4MWIpOwoJY29sb3I6IHZhcigtLWNvbG9yLW5ldXRyYWwtbW9kZXJhdGUsICNkNGQ0ZDgpOwoJZm9udC1zaXplOiB2YXIoLS10ZXh0LXNtLCAwLjg3NXJlbSk7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7CgkJY29sb3I6IHZhcigtLWNvbG9yLW5ldXRyYWwtc3Ryb25nLCAjZjRmNGY1KTsKCQlib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXN0cm9rZS1zdHJvbmcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSk7Cgl9CgoJJjpmb2N1cy12aXNpYmxlIHsKCQlvdXRsaW5lOiAycHggc29saWQgdmFyKC0tY29sb3ItZm9jdXMtc3ViZHVlZCwgIzNiODJmNik7CgkJb3V0bGluZS1vZmZzZXQ6IDJweDsKCX0KCgkmOmRpc2FibGVkIHsKCQljdXJzb3I6IHByb2dyZXNzOwoJCW9wYWNpdHk6IDAuNjsKCX0KCgkmIG9wdGlvbiwKCSYgb3B0Z3JvdXAgewoJCWJhY2tncm91bmQtY29sb3I6IHZhcigtLWNvbG9yLXN1cmZhY2UtbG93LCAjMTgxODFiKTsKCQljb2xvcjogdmFyKC0tY29sb3ItbmV1dHJhbC1tb2RlcmF0ZSwgI2Q0ZDRkOCk7Cgl9CgoKCSYgb3B0aW9uLm5teC1wZXJtLWxpY2Vuc2UtZmVhdHVyZWQgewoJCWNvbG9yOiB2YXIoLS1jb2xvci1wcmltYXJ5LTQwMCwgI2ZiOTIzYyk7CgkJZm9udC13ZWlnaHQ6IDYwMDsKCX0KfQoKCmh0bWwubm14LXBlcm0tYXBwbHlpbmcgW3JvbGU9Im1lbnUiXSB7Cgl2aXNpYmlsaXR5OiBoaWRkZW4gIWltcG9ydGFudDsKCXBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7Cn0KCgpodG1sLm5teC1wZXJtLWFwcGx5aW5nIGJ1dHRvblthcmlhLWxhYmVsJD0iIHBlcm1pc3Npb24iXS5ob3Zlci1vdmVybGF5OjpiZWZvcmUgewoJb3BhY2l0eTogMCAhaW1wb3J0YW50OwoJdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50Owp9Cg==",
	};
	const MIME_BY_EXT = {
		".css": "text/css;charset=utf-8",
		".txt": "text/plain;charset=utf-8",
		".woff2": "font/woff2",
		".js": "text/javascript;charset=utf-8",
	};
	function mimeFor(relPath) {
		const ext = relPath.slice(relPath.lastIndexOf("."));
		return MIME_BY_EXT[ext] ?? "application/octet-stream";
	}
	function requireResource(relPath) {
		const base64 = RESOURCES[relPath];
		if (base64 === undefined) throw new Error(`[Nexus Kit userscript] Missing embedded resource: ${relPath}`);
		return base64;
	}
	function textOf(relPath) {
		const bytes = Uint8Array.from(atob(requireResource(relPath)), (c) => c.charCodeAt(0));
		return new TextDecoder().decode(bytes);
	}
	window.nmxRegisterToggle = (_settingName, { cssFiles: cssFiles, onEnable: onEnable } = {}) => {
		if (cssFiles) {
			for (const relPath of cssFiles) GM_addStyle(textOf(relPath));
		}
		queueMicrotask(() => onEnable?.(true));
	};
	window.browser = {
		runtime: {
			getURL: (relPath) => `data:${mimeFor(relPath)};base64,${requireResource(relPath)}`,
		},
	};
})();

function nmxInjectPageScript(path, onLoad) {
	const script = document.createElement("script");
	script.src = browser.runtime.getURL(path);
	script.addEventListener("load", () => {
		script.remove();
		onLoad?.();
	});
	script.addEventListener("error", () => script.remove());
	(document.head || document.documentElement).prepend(script);
}

function nmxWatchPage(
	callback,
	{
		debounceMs: debounceMs = 0,
		pollMs: pollMs = 0,
		attributes: attributes = false,
		ignorePortalChurn: ignorePortalChurn = false,
	} = {},
) {
	let debounceTimer;
	const observer = new MutationObserver((mutationList) => {
		if (ignorePortalChurn) {
			const portalRoot = document.getElementById("headlessui-portal-root");
			if (portalRoot && mutationList.every((mutation) => portalRoot.contains(mutation.target))) return;
		}
		if (debounceMs > 0) {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(callback, debounceMs);
		} else {
			callback();
		}
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: attributes,
	});
	const intervalId = pollMs > 0 ? setInterval(callback, pollMs) : null;
	return {
		stop() {
			observer.disconnect();
			clearTimeout(debounceTimer);
			if (intervalId !== null) clearInterval(intervalId);
		},
	};
}

function nmxSimulateClick(el) {
	const rect = el.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	const common = {
		bubbles: true,
		cancelable: true,
		composed: true,
		view: window,
		clientX: x,
		clientY: y,
		button: 0,
	};
	const pointer = {
		...common,
		pointerId: 1,
		pointerType: "mouse",
		isPrimary: true,
	};
	el.dispatchEvent(new PointerEvent("pointerdown", pointer));
	el.dispatchEvent(new MouseEvent("mousedown", common));
	if (typeof el.focus === "function") el.focus();
	el.dispatchEvent(new PointerEvent("pointerup", pointer));
	el.dispatchEvent(new MouseEvent("mouseup", common));
	el.dispatchEvent(new MouseEvent("click", common));
}

function nmxCreateSvgIcon(pathData, { svgClass: svgClass, svgStyle: svgStyle, pathStyle: pathStyle } = {}) {
	const svgNs = "http://www.w3.org/2000/svg";
	const svg = document.createElementNS(svgNs, "svg");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("role", "presentation");
	if (svgClass) svg.setAttribute("class", svgClass);
	if (svgStyle) svg.setAttribute("style", svgStyle);
	const path = document.createElementNS(svgNs, "path");
	path.setAttribute("d", pathData);
	if (pathStyle) path.setAttribute("style", pathStyle);
	svg.appendChild(path);
	return svg;
}

function nmxCreateIconSpan(pathData) {
	const span = document.createElement("span");
	span.className = "flex items-center";
	span.appendChild(
		nmxCreateSvgIcon(pathData, {
			svgClass: "shrink-0 size-4",
			pathStyle: "fill:currentColor",
		}),
	);
	return span;
}

function nmxHtmlDecode(input) {
	const doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

function nmxSetFieldValue(
	element,
	value,
	{
		events: events = [
			"input",
			"change",
		],
	} = {},
) {
	const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
	const nativeSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
	if (nativeSetter) nativeSetter.call(element, value);
	else element.value = value;
	for (const type of events) {
		element.dispatchEvent(
			new Event(type, {
				bubbles: true,
			}),
		);
	}
}

(() => {
	if (window.__nmxModEditPermissionsLoaded) return;
	window.__nmxModEditPermissionsLoaded = true;
	const settingName = "optToggleModEditPermissions";
	const classPicker = "nmx-perm-license";
	const classApplying = "nmx-perm-applying";
	const CARDS = {
		upload: "Re-upload",
		convert: "Conversion (other games)",
		modify: "Modification",
		use: "Asset use",
		money: "Monetisation (third-party)",
	};
	const NOT_ALLOWED = "Not allowed";
	const CREDIT = "Allowed (Credit required)";
	const NO_CREDIT = "Allowed (No credit required)";
	const ALLOWED = "Allowed";
	const OPEN = {
		upload: CREDIT,
		convert: CREDIT,
		modify: CREDIT,
		use: CREDIT,
		money: ALLOWED,
	};
	const NON_COMMERCIAL = {
		...OPEN,
		money: NOT_ALLOWED,
	};
	const NO_DERIVATIVES = {
		upload: CREDIT,
		convert: NOT_ALLOWED,
		modify: NOT_ALLOWED,
		use: NOT_ALLOWED,
		money: ALLOWED,
	};
	const PUBLIC_DOMAIN = {
		upload: CREDIT,
		convert: CREDIT,
		modify: NO_CREDIT,
		use: NO_CREDIT,
		money: ALLOWED,
	};
	const LICENSE_GROUPS = [
		{
			label: "Permissive",
			licenses: [
				[
					"mit",
					"MIT",
					OPEN,
				],
				[
					"apache-2.0",
					"Apache 2.0",
					OPEN,
				],
				[
					"bsd-2-clause",
					"BSD 2-Clause",
					OPEN,
				],
				[
					"bsd-3-clause",
					"BSD 3-Clause",
					OPEN,
				],
				[
					"isc",
					"ISC",
					OPEN,
				],
			],
		},
		{
			label: "Copyleft",
			licenses: [
				[
					"mpl-2.0",
					"MPL 2.0",
					OPEN,
				],
				[
					"lgpl-3.0",
					"LGPL 3.0",
					OPEN,
				],
				[
					"gpl-2.0",
					"GPL 2.0",
					OPEN,
				],
				[
					"gpl-3.0",
					"GPL 3.0",
					OPEN,
				],
				[
					"agpl-3.0",
					"AGPL 3.0",
					OPEN,
				],
			],
		},
		{
			label: "Creative Commons",
			licenses: [
				[
					"cc-by-4.0",
					"CC BY 4.0",
					OPEN,
				],
				[
					"cc-by-sa-4.0",
					"CC BY-SA 4.0",
					OPEN,
				],
				[
					"cc-by-nc-4.0",
					"CC BY-NC 4.0",
					NON_COMMERCIAL,
				],
				[
					"cc-by-nc-sa-4.0",
					"CC BY-NC-SA 4.0",
					NON_COMMERCIAL,
				],
				[
					"cc-by-nd-4.0",
					"CC BY-ND 4.0",
					NO_DERIVATIVES,
				],
				[
					"cc-by-nc-nd-4.0",
					"CC BY-NC-ND 4.0",
					{
						...NO_DERIVATIVES,
						money: NOT_ALLOWED,
					},
				],
			],
		},
		{
			label: "Public domain",
			licenses: [
				[
					"cc0-1.0",
					"CC0 1.0",
					PUBLIC_DOMAIN,
				],
				[
					"unlicense",
					"The Unlicense",
					PUBLIC_DOMAIN,
				],
			],
		},
		{
			label: "Other",
			licenses: [
				[
					"all-rights-reserved",
					"All rights reserved",
					{
						upload: NOT_ALLOWED,
						convert: NOT_ALLOWED,
						modify: NOT_ALLOWED,
						use: NOT_ALLOWED,
						money: NOT_ALLOWED,
					},
				],
			],
		},
	];
	const LICENSES = new Map(
		LICENSE_GROUPS.flatMap((group) =>
			group.licenses.map(([id, name, perms]) => [
				id,
				{
					name: name,
					perms: perms,
				},
			]),
		),
	);
	const FEATURED_LICENSES = new Set([
		"mit",
		"gpl-3.0",
	]);
	let watcher = null;
	let chosenLicense = "";
	let applying = false;
	nmxRegisterToggle(settingName, {
		cssFiles: [
			"src/features/mod-edit-permissions/mod-edit-permissions.css",
		],
		onEnable: () => {
			if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectJS);
			else injectJS();
		},
		onDisable: removeJS,
	});
	function injectJS() {
		document.removeEventListener("DOMContentLoaded", injectJS);
		watcher?.stop();
		watcher = nmxWatchPage(scan, {
			debounceMs: 150,
			ignorePortalChurn: true,
			pollMs: 1e3,
		});
		scan();
	}
	function removeJS() {
		document.removeEventListener("DOMContentLoaded", injectJS);
		watcher?.stop();
		watcher = null;
		document.querySelectorAll(`.${classPicker}`).forEach((el) => {
			el.remove();
		});
	}
	function isPermissionsStep() {
		return /\/mods\/\d+\/edit\/permissions\/?$/.test(location.pathname);
	}
	function findImportButton() {
		for (const button of document.querySelectorAll("button")) {
			if (button.textContent.trim() === "Import permissions") return button;
		}
		return null;
	}
	function scan() {
		if (!isPermissionsStep()) return;
		const importButton = findImportButton();
		if (!importButton) return;
		let picker = importButton.parentElement.querySelector(`:scope > .${classPicker}`);
		if (!picker) {
			picker = buildPicker();
			importButton.insertAdjacentElement("beforebegin", picker);
		}
		if (!applying && chosenLicense && !cardsMatch(LICENSES.get(chosenLicense).perms)) chosenLicense = "";
		if (picker.value !== chosenLicense) picker.value = chosenLicense;
		if (picker.disabled !== applying) picker.disabled = applying;
	}
	function buildPicker() {
		const select = document.createElement("select");
		select.className = classPicker;
		select.setAttribute("aria-label", "Apply license preset");
		select.title = "Set the permissions below to match a common license. Earning donation points is left as it is.";
		const placeholder = document.createElement("option");
		placeholder.value = "";
		placeholder.textContent = "Apply license…";
		select.appendChild(placeholder);
		for (const group of LICENSE_GROUPS) {
			const optgroup = document.createElement("optgroup");
			optgroup.label = group.label;
			for (const [id, name] of group.licenses) {
				const option = document.createElement("option");
				option.value = id;
				option.textContent = name;
				if (FEATURED_LICENSES.has(id)) option.className = "nmx-perm-license-featured";
				optgroup.appendChild(option);
			}
			select.appendChild(optgroup);
		}
		select.addEventListener("change", () => {
			const id = select.value;
			if (!id || applying) return;
			applyLicense(id);
		});
		return select;
	}
	function findCard(title) {
		const button = document.querySelector(`button[aria-label="Change ${CSS.escape(title)} permission"]`);
		if (!button) return null;
		let card = button.parentElement;
		while (card && !card.querySelector("span.font-semibold")) card = card.parentElement;
		if (!card) return null;
		const titleSpan = card.querySelector("span.font-semibold");
		return {
			button: button,
			currentLabel: () => titleSpan.nextElementSibling?.textContent.trim() ?? "",
		};
	}
	function currentCardLabel(title) {
		return findCard(title)?.currentLabel() ?? null;
	}
	function cardsMatch(perms) {
		return Object.entries(perms).every(([key, label]) => currentCardLabel(CARDS[key]) === label);
	}
	async function applyLicense(id) {
		const license = LICENSES.get(id);
		if (!license) return;
		applying = true;
		chosenLicense = id;
		scan();
		document.documentElement.classList.add(classApplying);
		const failed = [];
		try {
			for (const [key, label] of Object.entries(license.perms)) {
				if (!(await setCard(CARDS[key], label))) failed.push(CARDS[key]);
			}
		} finally {
			setTimeout(() => document.documentElement.classList.remove(classApplying), 150);
			applying = false;
		}
		if (failed.length) {
			console.warn(`[Nexus Kit] Couldn't apply ${license.name} to: ${failed.join(", ")}`);
			chosenLicense = "";
		}
		scan();
		document.querySelector(`.${classPicker}`)?.focus();
	}
	async function setCard(title, label) {
		const card = findCard(title);
		if (!card) return false;
		if (card.currentLabel() === label) return true;
		const { button: button } = card;
		if (button.getAttribute("aria-expanded") !== "true") nmxSimulateClick(button);
		const menu = await waitFor(() => findOpenMenu(button));
		if (!menu) return false;
		const item = [
			...menu.querySelectorAll('[role="menuitem"]'),
		].find((el) => itemLabel(el) === label);
		if (!item) {
			if (button.getAttribute("aria-expanded") === "true") nmxSimulateClick(button);
			await waitFor(() => !findOpenMenu(button));
			return false;
		}
		nmxSimulateClick(item);
		await waitFor(() => !findOpenMenu(button));
		return (await waitFor(() => findCard(title)?.currentLabel() === label)) !== null;
	}
	function findOpenMenu(button) {
		if (!button.id) return null;
		const menu = document.querySelector(`[role="menu"][aria-labelledby="${CSS.escape(button.id)}"]`);
		if (!menu) return null;
		const state = menu.getAttribute("data-headlessui-state");
		return state === null || state.split(" ").includes("open") ? menu : null;
	}
	function itemLabel(item) {
		return (item.querySelector(".nxm-dropdown-item-label") ?? item).textContent.trim();
	}
	function waitFor(check, timeoutMs = 2e3) {
		return new Promise((resolve) => {
			const start = performance.now();
			const tick = () => {
				const result = check();
				if (result) resolve(result);
				else if (performance.now() - start > timeoutMs) resolve(null);
				else requestAnimationFrame(tick);
			};
			tick();
		});
	}
})();
