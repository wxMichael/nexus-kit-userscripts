// ==UserScript==
// @name         Nexus Kit: 🔎 Advanced mod search
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  Adds match type toggles to mod search filters for Tags, Title, and Description fields.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/advanced-mod-search.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/advanced-mod-search.user.js
// @run-at       document-start
// @match         *://*.nexusmods.com/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/advanced-mod-search/advanced-mod-search.css":
			"CltkYXRhLWUyZWlkPSJ0YWdzLWZpbHRlciJdID4gLnNwYWNlLXktMTpmaXJzdC1jaGlsZCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWNvbHVtbi1nYXA6IDAuNXJlbTsKfQoKW2RhdGEtZTJlaWQ9InRhZ3MtZmlsdGVyIl0gPiAuc3BhY2UteS0xOmZpcnN0LWNoaWxkID4gLnNwYWNlLXktMyB7CglmbGV4LWJhc2lzOiAxMDAlOwoJCgltaW4td2lkdGg6IDA7Cn0KCi5ubXgtdGFnLW1vZGUtdG9nZ2xlIHsKCW1pbi1oZWlnaHQ6IDA7CglwYWRkaW5nLXRvcDogMC4xMjVyZW07CglwYWRkaW5nLWJvdHRvbTogMC4xMjVyZW07Cn0KCgoubm14LXRhZy1tb2RlLXRvb2x0aXAgewoJcG9zaXRpb246IGFic29sdXRlOwoJcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KCi5ubXgtdGFnLW1vZGUtdG9vbHRpcCBzdmcgewoJcG9zaXRpb246IGFic29sdXRlOwoJcG9pbnRlci1ldmVudHM6IG5vbmU7Cn0KCi5ubXgtdGFnLW1vZGUtdG9vbHRpcCBzcGFuIHsKCXdoaXRlLXNwYWNlOiBwcmUtbGluZTsKCXRleHQtYWxpZ246IGNlbnRlcjsKfQoKCltkYXRhLWUyZWlkPSJzZWFyY2gtcGFyYW1ldGVycy1maWx0ZXIiXSAudy1mdWxsOmhhcyg+ICN0aXRsZS1zZWFyY2gtcGFyYW1ldGVycyksCltkYXRhLWUyZWlkPSJzZWFyY2gtcGFyYW1ldGVycy1maWx0ZXIiXSAudy1mdWxsOmhhcyg+ICNkZXNjcmlwdGlvbi1zZWFyY2gtcGFyYW1ldGVycykgewoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDAuNXJlbTsKfQoKCiN0aXRsZS1zZWFyY2gtcGFyYW1ldGVycywKI2Rlc2NyaXB0aW9uLXNlYXJjaC1wYXJhbWV0ZXJzIHsKCXdpZHRoOiBhdXRvOwoJbWluLXdpZHRoOiAwOwoJZmxleDogMSAxIGF1dG87Cn0KCi5ubXgtZmllbGQtb3AtdG9nZ2xlIHsKCWZsZXgtc2hyaW5rOiAwOwoJbWluLWhlaWdodDogMDsKCXBhZGRpbmctdG9wOiAwLjEyNXJlbTsKCXBhZGRpbmctYm90dG9tOiAwLjEyNXJlbTsKCQoJd2hpdGUtc3BhY2U6IHByZS1saW5lOwp9Cg==",
	};
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
})();

(() => {
	if (window.__nmxAdvancedModSearchLoaded) return;
	window.__nmxAdvancedModSearchLoaded = true;
	const SETTINGS_EVENT_NAME = "nmx-search-settings-change";
	const classToggle = "nmx-tag-mode-toggle";
	const classActive = "nxm-button-secondary-filled-weak";
	const classInactive = "nxm-button-secondary";
	const classTooltip = "nmx-tag-mode-tooltip";
	const tooltipId = "nmx-tag-mode-tooltip";
	const classOpToggle = "nmx-field-op-toggle";
	const SVG_NS = "http://www.w3.org/2000/svg";
	const FIELD_CONFIGS = [
		{
			settingKey: "titleOp",
			inputId: "title-search-parameters",
			cycle: [
				"WILDCARD",
				"EQUALS",
				"NOT_EQUALS",
			],
			labels: {
				WILDCARD: "ALL\n(Fuzzy)",
				EQUALS: "IS\n(Strict)",
				NOT_EQUALS: "NOT\n(Strict)",
			},
			tooltips: {
				WILDCARD:
					"Site default - matches mods whose Title contains every word you type, in any order.\nClick to switch to an exact Title match.",
				EQUALS:
					"Matches mods whose Title is exactly what you type (case-sensitive).\nClick to switch to excluding an exact match.",
				NOT_EQUALS:
					"Excludes mods whose Title is exactly what you type (case-sensitive).\nClick to switch back to the site's default (contains).",
			},
		},
		{
			settingKey: "descriptionOp",
			inputId: "description-search-parameters",
			cycle: [
				"MATCHES",
				"EQUALS",
				"NOT_EQUALS",
			],
			labels: {
				MATCHES: "ALL\n(Fuzzy)",
				EQUALS: "ALL\n(Strict)",
				NOT_EQUALS: "Excludes\n(Strict)",
			},
			tooltips: {
				MATCHES:
					'Site default - matches mods whose Description contains every word you type,\nanywhere, including similar word forms (e.g. "replace" also matches "replacer").\nClick to switch to an exact-word match.',
				EQUALS:
					"Matches mods whose Description contains every word you type,\nanywhere, but not similar word forms.\nClick to switch to excluding that instead.",
				NOT_EQUALS:
					"Excludes mods whose Description contains every word you type,\nwithout matching similar word forms.\nClick to switch back to the site's default (contains, with similar word forms).",
			},
		},
	];
	const SETTINGS = {
		tagMode: {
			param: "nmxTagMode",
			default: "any",
		},
		titleOp: {
			param: "nmxTitleOp",
			default: "WILDCARD",
		},
		descriptionOp: {
			param: "nmxDescriptionOp",
			default: "MATCHES",
		},
	};
	function readSetting(key) {
		return new URLSearchParams(location.search).get(SETTINGS[key].param) || SETTINGS[key].default;
	}
	const settings = {
		tagMode: readSetting("tagMode"),
		titleOp: readSetting("titleOp"),
		descriptionOp: readSetting("descriptionOp"),
	};
	const TOOLTIP_SHOW_DELAY_MS = 400;
	let observer;
	let rescanTimer;
	let pollIntervalId;
	let tooltipShowTimer;
	let tooltipButton;
	let tooltipPortal;
	let tooltipBox;
	let tooltipLabel;
	let tooltipArrow;
	nmxRegisterToggle("optToggleAdvancedModSearch", {
		cssFiles: [
			"src/features/advanced-mod-search/advanced-mod-search.css",
		],
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		injectPageScript();
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startAfterReady);
		else startAfterReady();
	}
	function startAfterReady() {
		document.removeEventListener("DOMContentLoaded", startAfterReady);
		startObserver();
		ensureControls();
	}
	function removeJS() {
		document.removeEventListener("DOMContentLoaded", startAfterReady);
		stopObserver();
		clearTimeout(rescanTimer);
		hideTooltip();
		document.querySelectorAll(`.${classToggle}, .${classOpToggle}`).forEach((el) => {
			el.remove();
		});
		for (const key of Object.keys(SETTINGS))
			setSetting(key, SETTINGS[key].default, {
				skipRender: true,
			});
	}
	function injectPageScript() {
		const script = document.createElement("script");
		script.textContent =
			'(() => {\n    const GRAPHQL_HOST = "api-router.nexusmods.com";\n    const GRAPHQL_PATH = "/graphql";\n    const SETTINGS_EVENT_NAME = "nmx-search-settings-change";\n    const SETTINGS = {\n        tagMode: {\n            param: "nmxTagMode",\n            default: "any"\n        },\n        titleOp: {\n            param: "nmxTitleOp",\n            default: "WILDCARD"\n        },\n        descriptionOp: {\n            param: "nmxDescriptionOp",\n            default: "MATCHES"\n        }\n    };\n    function readSetting(key) {\n        return new URLSearchParams(location.search).get(SETTINGS[key].param) || SETTINGS[key].default;\n    }\n    const settings = {\n        tagMode: readSetting("tagMode"),\n        titleOp: readSetting("titleOp"),\n        descriptionOp: readSetting("descriptionOp")\n    };\n    document.addEventListener(SETTINGS_EVENT_NAME, event => {\n        try {\n            Object.assign(settings, JSON.parse(event.detail));\n        } catch {}\n    });\n    function isGraphQLRequest(method, url) {\n        if (String(method).toUpperCase() !== "POST" || typeof url !== "string") return false;\n        try {\n            const parsed = new URL(url, location.href);\n            return parsed.hostname === GRAPHQL_HOST && parsed.pathname === GRAPHQL_PATH;\n        } catch {\n            return false;\n        }\n    }\n    function rewriteTagMode(variables) {\n        if (settings.tagMode !== "all") return variables;\n        const includedTags = variables?.facets?.tag;\n        if (!Array.isArray(includedTags) || includedTags.length === 0) return variables;\n        const existingTagPostFilter = Array.isArray(variables?.postFilter?.tag) ? variables.postFilter.tag : [];\n        const equalsFilters = includedTags.map(tag => ({\n            op: "EQUALS",\n            value: tag\n        }));\n        return {\n            ...variables,\n            postFilter: {\n                ...variables.postFilter,\n                tag: [ ...existingTagPostFilter, ...equalsFilters ]\n            }\n        };\n    }\n    function rewriteFieldOp(variables, filterKey, settingKey) {\n        const entries = variables?.filter?.[filterKey];\n        if (!Array.isArray(entries) || entries.length === 0) return variables;\n        const op = settings[settingKey];\n        if (entries.every(entry => entry.op === op)) return variables;\n        return {\n            ...variables,\n            filter: {\n                ...variables.filter,\n                [filterKey]: entries.map(entry => ({\n                    ...entry,\n                    op: op\n                }))\n            }\n        };\n    }\n    function rewriteVariables(variables) {\n        let next = variables;\n        next = rewriteTagMode(next);\n        next = rewriteFieldOp(next, "name", "titleOp");\n        next = rewriteFieldOp(next, "description", "descriptionOp");\n        return next;\n    }\n    function rewriteRequestBody(text) {\n        if (typeof text !== "string") return text;\n        let payload;\n        try {\n            payload = JSON.parse(text);\n        } catch {\n            return text;\n        }\n        if (payload?.operationName !== "ModsListing") return text;\n        const variables = rewriteVariables(payload.variables);\n        if (variables === payload.variables) return text;\n        payload.variables = variables;\n        return JSON.stringify(payload);\n    }\n    const originalFetch = window.fetch;\n    window.fetch = function(input, init) {\n        const url = typeof input === "string" ? input : input?.url;\n        const method = init?.method ?? (input instanceof Request ? input.method : "GET");\n        if (!isGraphQLRequest(method, url)) return originalFetch.call(this, input, init);\n        if (typeof init?.body === "string") {\n            const rewritten = rewriteRequestBody(init.body);\n            if (rewritten !== init.body) init = {\n                ...init,\n                body: rewritten\n            };\n        }\n        return originalFetch.call(this, input, init);\n    };\n    const originalOpen = XMLHttpRequest.prototype.open;\n    XMLHttpRequest.prototype.open = function(method, url, ...rest) {\n        this.nmxIsModsListingGraphQL = isGraphQLRequest(method, url);\n        return originalOpen.apply(this, [ method, url, ...rest ]);\n    };\n    const originalSend = XMLHttpRequest.prototype.send;\n    XMLHttpRequest.prototype.send = function(body) {\n        const rewritten = this.nmxIsModsListingGraphQL ? rewriteRequestBody(body) : body;\n        return originalSend.call(this, rewritten);\n    };\n})();';
		script.addEventListener("load", () => script.remove());
		(document.head || document.documentElement).prepend(script);
	}
	function writeSetting(key, value) {
		const url = new URL(location.href);
		if (value === SETTINGS[key].default) url.searchParams.delete(SETTINGS[key].param);
		else url.searchParams.set(SETTINGS[key].param, value);
		history.replaceState(history.state, "", url);
	}
	function dispatchSettings() {
		document.dispatchEvent(
			new CustomEvent(SETTINGS_EVENT_NAME, {
				detail: JSON.stringify(settings),
			}),
		);
	}
	function setSetting(key, value, { skipRender: skipRender = false } = {}) {
		settings[key] = value;
		writeSetting(key, value);
		dispatchSettings();
		if (!skipRender) renderAllControls();
	}
	function syncSettingsFromUrl() {
		let changed = false;
		for (const key of Object.keys(SETTINGS)) {
			const urlValue = readSetting(key);
			if (urlValue !== settings[key]) {
				settings[key] = urlValue;
				changed = true;
			}
		}
		if (!changed) return;
		dispatchSettings();
		renderAllControls();
	}
	function tagTooltipMessage() {
		return settings.tagMode === "all"
			? "Matching mods with ALL selected tags\nApplies on page load or selection change."
			: "Matching mods with ANY selected tag (default)\nApplies on page load or selection change.";
	}
	function opTooltipMessage(config) {
		return config.tooltips[settings[config.settingKey]] ?? "";
	}
	function tooltipTextFor(button) {
		const opConfig = FIELD_CONFIGS.find((config) => config.settingKey === button.dataset.nmxFieldOpKey);
		return opConfig ? opTooltipMessage(opConfig) : tagTooltipMessage();
	}
	function createTooltipEls() {
		const portal = document.createElement("div");
		portal.className = "nmx-tag-mode-tooltip-portal";
		const box = document.createElement("div");
		box.className = `z-tooltip ${classTooltip}`;
		box.id = tooltipId;
		box.setAttribute("role", "tooltip");
		const label = document.createElement("span");
		label.className = "text-body-md text-neutral-strong block rounded bg-surface-mid px-3 py-2 shadow-md";
		box.appendChild(label);
		const arrow = document.createElementNS(SVG_NS, "svg");
		arrow.setAttribute("class", "fill-surface-mid drop-shadow-md");
		arrow.setAttribute("aria-hidden", "true");
		arrow.setAttribute("width", "14");
		arrow.setAttribute("height", "14");
		arrow.setAttribute("viewBox", "0 0 14 14");
		const path = document.createElementNS(SVG_NS, "path");
		path.setAttribute("stroke", "none");
		path.setAttribute("d", "M0,0 H14 L7,8 Q7,8 7,8 Z");
		arrow.appendChild(path);
		box.appendChild(arrow);
		portal.appendChild(box);
		return {
			portal: portal,
			box: box,
			label: label,
			arrow: arrow,
		};
	}
	function positionTooltip() {
		const anchorRect = tooltipButton.getBoundingClientRect();
		const boxRect = tooltipBox.getBoundingClientRect();
		const gap = 8;
		const spaceAbove = anchorRect.top;
		const spaceBelow = window.innerHeight - anchorRect.bottom;
		const placeAbove = spaceAbove >= boxRect.height + gap || spaceAbove >= spaceBelow;
		const left = Math.max(4, anchorRect.left + anchorRect.width / 2 - boxRect.width / 2);
		const top = placeAbove ? anchorRect.top - boxRect.height - gap : anchorRect.bottom + gap;
		tooltipBox.style.left = `${left + window.scrollX}px`;
		tooltipBox.style.top = `${top + window.scrollY}px`;
		tooltipArrow.style.left = `${anchorRect.left + anchorRect.width / 2 - left - 7}px`;
		if (placeAbove) {
			tooltipArrow.style.top = "100%";
			tooltipArrow.style.bottom = "";
			tooltipArrow.style.transform = "";
		} else {
			tooltipArrow.style.top = "";
			tooltipArrow.style.bottom = "100%";
			tooltipArrow.style.transform = "rotate(180deg)";
		}
	}
	function repositionIfVisible() {
		if (tooltipButton) positionTooltip();
	}
	function showTooltip(button) {
		tooltipButton = button;
		if (!tooltipPortal)
			({ portal: tooltipPortal, box: tooltipBox, label: tooltipLabel, arrow: tooltipArrow } = createTooltipEls());
		tooltipLabel.textContent = tooltipTextFor(button);
		button.setAttribute("aria-describedby", tooltipId);
		if (!tooltipPortal.isConnected) document.documentElement.appendChild(tooltipPortal);
		positionTooltip();
		window.addEventListener("scroll", repositionIfVisible, {
			passive: true,
			capture: true,
		});
		window.addEventListener("resize", repositionIfVisible);
	}
	function hideTooltip() {
		clearTimeout(tooltipShowTimer);
		tooltipButton?.removeAttribute("aria-describedby");
		tooltipButton = undefined;
		tooltipPortal?.remove();
		window.removeEventListener("scroll", repositionIfVisible, {
			capture: true,
		});
		window.removeEventListener("resize", repositionIfVisible);
	}
	function scheduleShowTooltip(button) {
		clearTimeout(tooltipShowTimer);
		tooltipShowTimer = setTimeout(() => showTooltip(button), TOOLTIP_SHOW_DELAY_MS);
	}
	function startObserver() {
		observer = new MutationObserver((mutationList) => {
			const portalRoot = document.getElementById("headlessui-portal-root");
			if (portalRoot && mutationList.every((mutation) => portalRoot.contains(mutation.target))) return;
			clearTimeout(rescanTimer);
			rescanTimer = setTimeout(ensureControls, 200);
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
		});
		pollIntervalId = setInterval(ensureControls, 1e3);
	}
	function stopObserver() {
		observer?.disconnect();
		observer = undefined;
		clearInterval(pollIntervalId);
		pollIntervalId = undefined;
	}
	function findIncludesLabel() {
		const containers = document.querySelectorAll('[data-e2eid="tags-filter"] > .space-y-1');
		for (const container of containers) {
			const label = container.querySelector(":scope > label");
			if (label?.textContent.trim() === "Includes") return label;
		}
		return null;
	}
	function createTagButton() {
		const button = document.createElement("button");
		button.type = "button";
		button.className = `${classToggle} nxm-button nxm-button-sm`;
		button.addEventListener("click", () => setSetting("tagMode", settings.tagMode === "all" ? "any" : "all"));
		button.addEventListener("mouseenter", () => scheduleShowTooltip(button));
		button.addEventListener("mouseleave", hideTooltip);
		button.addEventListener("focus", () => scheduleShowTooltip(button));
		button.addEventListener("blur", hideTooltip);
		renderTagButton(button);
		return button;
	}
	function renderTagButton(button) {
		const isAll = settings.tagMode === "all";
		const label = isAll ? "ALL" : "ANY";
		if (button.textContent !== label) button.textContent = label;
		const pressed = String(isAll);
		if (button.getAttribute("aria-pressed") !== pressed) button.setAttribute("aria-pressed", pressed);
		button.classList.toggle(classActive, isAll);
		button.classList.toggle(classInactive, !isAll);
		if (tooltipButton === button) tooltipLabel.textContent = tooltipTextFor(button);
	}
	function ensureTagButton() {
		const label = findIncludesLabel();
		if (!label) return;
		const existing = label.nextElementSibling?.classList.contains(classToggle) ? label.nextElementSibling : null;
		if (existing) {
			renderTagButton(existing);
			return;
		}
		label.insertAdjacentElement("afterend", createTagButton());
	}
	function nextOp(config) {
		const current = settings[config.settingKey];
		const index = config.cycle.indexOf(current);
		return index === -1 ? config.cycle[0] : config.cycle[(index + 1) % config.cycle.length];
	}
	function findApplyButton() {
		return document.querySelector('[data-e2eid="search-parameters-filter"] button[type="submit"]');
	}
	function simulateClick(el) {
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
		el.dispatchEvent(
			new PointerEvent("pointerdown", {
				...common,
				pointerId: 1,
				pointerType: "mouse",
				isPrimary: true,
			}),
		);
		el.dispatchEvent(new MouseEvent("mousedown", common));
		if (typeof el.focus === "function") el.focus();
		el.dispatchEvent(
			new PointerEvent("pointerup", {
				...common,
				pointerId: 1,
				pointerType: "mouse",
				isPrimary: true,
			}),
		);
		el.dispatchEvent(new MouseEvent("mouseup", common));
		el.dispatchEvent(new MouseEvent("click", common));
	}
	function triggerReapply() {
		const button = findApplyButton();
		if (button) simulateClick(button);
	}
	function createOpButton(config) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = `${classOpToggle} nxm-button nxm-button-sm`;
		button.dataset.nmxFieldOpKey = config.settingKey;
		button.addEventListener("click", () => {
			setSetting(config.settingKey, nextOp(config));
			triggerReapply();
		});
		button.addEventListener("mouseenter", () => scheduleShowTooltip(button));
		button.addEventListener("mouseleave", hideTooltip);
		button.addEventListener("focus", () => scheduleShowTooltip(button));
		button.addEventListener("blur", hideTooltip);
		renderOpButton(button, config);
		return button;
	}
	function renderOpButton(button, config) {
		const op = settings[config.settingKey];
		const isDefault = op === config.cycle[0];
		const label = config.labels[op] ?? op;
		if (button.textContent !== label) button.textContent = label;
		button.classList.toggle(classActive, !isDefault);
		button.classList.toggle(classInactive, isDefault);
		if (tooltipButton === button) tooltipLabel.textContent = tooltipTextFor(button);
	}
	function renderAllOpButtons() {
		FIELD_CONFIGS.forEach((config) => {
			document.querySelectorAll(`.${classOpToggle}[data-nmx-field-op-key="${config.settingKey}"]`).forEach((button) => {
				renderOpButton(button, config);
			});
		});
	}
	function ensureOpButtons() {
		FIELD_CONFIGS.forEach((config) => {
			const input = document.getElementById(config.inputId);
			if (!input) return;
			const existing = input.nextElementSibling?.classList.contains(classOpToggle) ? input.nextElementSibling : null;
			if (existing) {
				renderOpButton(existing, config);
				return;
			}
			input.insertAdjacentElement("afterend", createOpButton(config));
		});
	}
	function renderAllControls() {
		document.querySelectorAll(`.${classToggle}`).forEach(renderTagButton);
		renderAllOpButtons();
	}
	function ensureControls() {
		syncSettingsFromUrl();
		ensureTagButton();
		ensureOpButtons();
	}
})();
