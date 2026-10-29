// ==UserScript==
// @name         Nexus Kit: ✨ Mod Author badge bling
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
// @description  Recolors the Mod Author badge by unique downloads - bronze at 30K, silver at 500K, gold with sparkles at 1M, escalating to particles past 2M and full chaos at 20M.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/profile-bling.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/profile-bling.user.js
// @run-at       document-idle
// @match         *://*.nexusmods.com/profile/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/profile-bling/profile-bling.css":
			"W2RhdGEtbm14LWJsaW5nLXRpZXJdIHsKCXBvc2l0aW9uOiByZWxhdGl2ZTsKfQoKCltkYXRhLW5teC1ibGluZy10aWVyPSJicm9uemUiXSB7CgliYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNSwgMTI3LCA1MCwgMC4yMikgIWltcG9ydGFudDsKfQpbZGF0YS1ubXgtYmxpbmctdGllcj0iYnJvbnplIl0gLnRleHQtY3JlYXRvci1zdHJvbmcgewoJY29sb3I6ICNjZDdmMzIgIWltcG9ydGFudDsKfQoKCltkYXRhLW5teC1ibGluZy10aWVyPSJzaWx2ZXIiXSwKW2RhdGEtbm14LWJsaW5nLXRpZXI9ImdvbGQiXSB7CgliYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OwoJYmFja2dyb3VuZC1zaXplOiAyNTAlIDEwMCU7CgliYWNrZ3JvdW5kLXBvc2l0aW9uOiAyMDAlIDA7CglhbmltYXRpb246IG5teC1ibGluZy1zaGltbWVyIDIuNnMgZWFzZS1pbi1vdXQgaW5maW5pdGUgIWltcG9ydGFudDsKfQoKW2RhdGEtbm14LWJsaW5nLXRpZXI9InNpbHZlciJdIHsKCWJhY2tncm91bmQtY29sb3I6IHJnYmEoMTk4LCAyMDIsIDIwOCwgMC4yNCkgIWltcG9ydGFudDsKCWJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgxMjBkZWcsIHRyYW5zcGFyZW50IDMwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpIDUwJSwgdHJhbnNwYXJlbnQgNzAlKSAhaW1wb3J0YW50Owp9CltkYXRhLW5teC1ibGluZy10aWVyPSJzaWx2ZXIiXSAudGV4dC1jcmVhdG9yLXN0cm9uZyB7Cgljb2xvcjogI2Q3ZGFkZSAhaW1wb3J0YW50Owp9CgpbZGF0YS1ubXgtYmxpbmctdGllcj0iZ29sZCJdIHsKCWJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyMDAsIDYwLCAwLjI2KSAhaW1wb3J0YW50OwoJYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDEyMGRlZywgdHJhbnNwYXJlbnQgMzAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOTUpIDUwJSwgdHJhbnNwYXJlbnQgNzAlKSAhaW1wb3J0YW50OwoJYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjFzICFpbXBvcnRhbnQ7Cn0KW2RhdGEtbm14LWJsaW5nLXRpZXI9ImdvbGQiXSAudGV4dC1jcmVhdG9yLXN0cm9uZyB7Cgljb2xvcjogI2ZmZDU0YSAhaW1wb3J0YW50Owp9CgpAa2V5ZnJhbWVzIG5teC1ibGluZy1zaGltbWVyIHsKCTAlLAoJMTUlIHsKCQliYWNrZ3JvdW5kLXBvc2l0aW9uOiAyMDAlIDA7Cgl9Cgk4NSUsCgkxMDAlIHsKCQliYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwOwoJfQp9CgoKW2RhdGEtbm14LWJsaW5nLXRpZXI9ImdvbGQiXVtkYXRhLW5teC1ibGluZy1tb2RlPSJ0b3JyZW50Il0gewoJYW5pbWF0aW9uOgoJCW5teC1ibGluZy1zaGltbWVyIDAuOHMgZWFzZS1pbi1vdXQgaW5maW5pdGUsCgkJbm14LWJsaW5nLXNoYWtlIDAuM3MgZWFzZS1pbi1vdXQgaW5maW5pdGUsCgkJbm14LWJsaW5nLXJhaW5ib3cgMS40cyBsaW5lYXIgaW5maW5pdGUgIWltcG9ydGFudDsKfQoKQGtleWZyYW1lcyBubXgtYmxpbmctc2hha2UgewoJMCUsCgkxMDAlIHsKCQl0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKSByb3RhdGUoMGRlZyk7Cgl9CgkyNSUgewoJCXRyYW5zZm9ybTogdHJhbnNsYXRlKC0xcHgsIDFweCkgcm90YXRlKC0xZGVnKTsKCX0KCTUwJSB7CgkJdHJhbnNmb3JtOiB0cmFuc2xhdGUoMXB4LCAtMXB4KSByb3RhdGUoMWRlZyk7Cgl9Cgk3NSUgewoJCXRyYW5zZm9ybTogdHJhbnNsYXRlKC0xcHgsIC0xcHgpIHJvdGF0ZSgxZGVnKTsKCX0KfQoKQGtleWZyYW1lcyBubXgtYmxpbmctcmFpbmJvdyB7CgkwJSB7CgkJZmlsdGVyOiBodWUtcm90YXRlKDBkZWcpIHNhdHVyYXRlKDEuNSk7Cgl9CgkxMDAlIHsKCQlmaWx0ZXI6IGh1ZS1yb3RhdGUoMzYwZGVnKSBzYXR1cmF0ZSgxLjUpOwoJfQp9CgoKLm5teC1ibGluZy1wYXJ0aWNsZS1maWVsZCB7Cglwb3NpdGlvbjogYWJzb2x1dGU7CglpbnNldDogMDsKCXBvaW50ZXItZXZlbnRzOiBub25lOwoJb3ZlcmZsb3c6IHZpc2libGU7Cn0KCi5ubXgtYmxpbmctcGFydGljbGUgewoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiA1MCU7CglsZWZ0OiA1MCU7Cglmb250LXNpemU6IDAuNnJlbTsKCWxpbmUtaGVpZ2h0OiAxOwoJY29sb3I6ICNmZmQ1NGE7Cgl0ZXh0LXNoYWRvdzogMCAwIDRweCByZ2JhKDI1NSwgMjEzLCA3NCwgMC45KTsKCW9wYWNpdHk6IDA7CglhbmltYXRpb24tbmFtZTogbm14LWJsaW5nLXR3aW5rbGUgIWltcG9ydGFudDsKCWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0ICFpbXBvcnRhbnQ7CglhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZSAhaW1wb3J0YW50OwoJYW5pbWF0aW9uLWR1cmF0aW9uOiB2YXIoLS1ubXgtZHVyYXRpb24sIDEuNnMpICFpbXBvcnRhbnQ7CglhbmltYXRpb24tZGVsYXk6IHZhcigtLW5teC1kZWxheSwgMHMpICFpbXBvcnRhbnQ7Cn0KCkBrZXlmcmFtZXMgbm14LWJsaW5nLXR3aW5rbGUgewoJMCUsCgkxMDAlIHsKCQlvcGFjaXR5OiAwOwoJCXRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDAuNCk7Cgl9Cgk1MCUgewoJCW9wYWNpdHk6IDE7CgkJdHJhbnNmb3JtOiB0cmFuc2xhdGUoY2FsYygtNTAlICsgdmFyKC0tbm14LWR4LCAwcHgpKSwgY2FsYygtNTAlICsgdmFyKC0tbm14LWR5LCAwcHgpKSkgc2NhbGUoMSk7Cgl9Cn0KCgpbZGF0YS1ubXgtYmxpbmctbW9kZT0icG9wIl0gLm5teC1ibGluZy1wYXJ0aWNsZSwKW2RhdGEtbm14LWJsaW5nLW1vZGU9InRvcnJlbnQiXSAubm14LWJsaW5nLXBhcnRpY2xlIHsKCWFuaW1hdGlvbi1uYW1lOiBubXgtYmxpbmctcG9wICFpbXBvcnRhbnQ7CglhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dCAhaW1wb3J0YW50Owp9CgpAa2V5ZnJhbWVzIG5teC1ibGluZy1wb3AgewoJMCUgewoJCW9wYWNpdHk6IDA7CgkJdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMC4zKTsKCX0KCTE1JSB7CgkJb3BhY2l0eTogMTsKCX0KCTEwMCUgewoJCW9wYWNpdHk6IDA7CgkJdHJhbnNmb3JtOiB0cmFuc2xhdGUoY2FsYygtNTAlICsgdmFyKC0tbm14LWR4LCAwcHgpKSwgY2FsYygtNTAlICsgdmFyKC0tbm14LWR5LCAwcHgpKSkgc2NhbGUoMS4xKTsKCX0KfQoKW2RhdGEtbm14LWJsaW5nLW1vZGU9InRvcnJlbnQiXSAubm14LWJsaW5nLXBhcnRpY2xlIHsKCWZvbnQtc2l6ZTogMC43NXJlbTsKfQo=",
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
	nmxRegisterToggle("optToggleProfileBling", {
		cssFiles: [
			"src/features/profile-bling/profile-bling.css",
		],
		onEnable: () => {
			startObserver();
			injectJS();
		},
		onDisable: removeJS,
		defaultEnabled: false,
	});
	const particleFieldClass = "nmx-bling-particle-field";
	const particleClass = "nmx-bling-particle";
	let watcher = null;
	const BRONZE_AT = 3e4;
	const SILVER_AT = 5e5;
	const GOLD_AT = 1e6;
	const PARTICLE_STEP = 1e5;
	const POP_AT = 2e6;
	const TORRENT_AT = 2e7;
	const MAX_PARTICLES = 40;
	function startObserver() {
		stopObserver();
		watcher = nmxWatchPage(injectJS, {
			pollMs: 1e3,
		});
	}
	function stopObserver() {
		watcher?.stop();
		watcher = null;
	}
	function parseAbbreviatedCount(text) {
		if (!text) return null;
		const match = text
			.trim()
			.replaceAll(",", "")
			.match(/^([\d.]+)\s*([KMB])?/i);
		if (!match) return null;
		const value = Number.parseFloat(match[1]);
		if (Number.isNaN(value)) return null;
		const multiplier =
			{
				K: 1e3,
				M: 1e6,
				B: 1e9,
			}[match[2]?.toUpperCase()] ?? 1;
		return Math.round(value * multiplier);
	}
	function getUniqueDownloadCount() {
		const el = document.querySelector('[data-e2eid="mod-downloads"]');
		return parseAbbreviatedCount(el?.textContent);
	}
	function findModAuthorBadge() {
		return Array.from(document.querySelectorAll("span.rounded-full")).find((el) => el.textContent.trim() === "Mod Author");
	}
	function getTier(udl) {
		if (udl >= GOLD_AT) return "gold";
		if (udl >= SILVER_AT) return "silver";
		if (udl >= BRONZE_AT) return "bronze";
		return null;
	}
	function getMode(udl) {
		if (udl >= TORRENT_AT) return "torrent";
		if (udl >= POP_AT) return "pop";
		return "";
	}
	function getParticleCount(udl) {
		if (udl < GOLD_AT) return 0;
		return Math.min(MAX_PARTICLES, Math.floor((udl - GOLD_AT) / PARTICLE_STEP));
	}
	const PARTICLE_RANGES = {
		"": {
			farMin: 8,
			farMax: 16,
			durationMin: 1.3,
			durationMax: 2.2,
		},
		pop: {
			farMin: 30,
			farMax: 60,
			durationMin: 0.9,
			durationMax: 1.4,
		},
		torrent: {
			farMin: 55,
			farMax: 95,
			durationMin: 0.5,
			durationMax: 0.9,
		},
	};
	function randomBetween(min, max) {
		return min + Math.random() * (max - min);
	}
	function buildParticles(count, mode) {
		const frag = document.createDocumentFragment();
		const { farMin: farMin, farMax: farMax, durationMin: durationMin, durationMax: durationMax } = PARTICLE_RANGES[mode];
		for (let i = 0; i < count; i++) {
			const angle = (2 * Math.PI * i) / count + Math.random() * 0.6;
			const distance = randomBetween(farMin, farMax);
			const span = document.createElement("span");
			span.className = particleClass;
			span.textContent = "✦";
			span.style.setProperty("--nmx-dx", `${(Math.cos(angle) * distance).toFixed(1)}px`);
			span.style.setProperty("--nmx-dy", `${(Math.sin(angle) * distance).toFixed(1)}px`);
			span.style.setProperty("--nmx-delay", `${(Math.random() * -2).toFixed(2)}s`);
			span.style.setProperty("--nmx-duration", `${randomBetween(durationMin, durationMax).toFixed(2)}s`);
			frag.append(span);
		}
		return frag;
	}
	function applyBling(badge, udl) {
		const tier = getTier(udl);
		if (!tier) {
			removeBling(badge);
			return;
		}
		if (badge.dataset.nmxBlingTier !== tier) badge.dataset.nmxBlingTier = tier;
		const mode = getMode(udl);
		if (badge.dataset.nmxBlingMode !== mode) badge.dataset.nmxBlingMode = mode;
		const particleCount = getParticleCount(udl);
		let field = badge.querySelector(`.${particleFieldClass}`);
		const key = `${particleCount}:${mode}`;
		if (particleCount > 0) {
			if (!field) {
				field = document.createElement("span");
				field.className = particleFieldClass;
				badge.append(field);
			}
			if (field.dataset.nmxBlingKey !== key) {
				field.dataset.nmxBlingKey = key;
				field.replaceChildren(buildParticles(particleCount, mode));
			}
		} else {
			field?.remove();
		}
	}
	function removeBling(badge) {
		delete badge.dataset.nmxBlingTier;
		delete badge.dataset.nmxBlingMode;
		badge.querySelector(`.${particleFieldClass}`)?.remove();
	}
	function injectJS() {
		const badge = findModAuthorBadge();
		if (!badge) return;
		const udl = getUniqueDownloadCount();
		if (udl === null) return;
		applyBling(badge, udl);
	}
	function removeJS() {
		stopObserver();
		document.querySelectorAll(`span.rounded-full[data-nmx-bling-tier]`).forEach(removeBling);
	}
})();
