// ==UserScript==
// @name         Nexus Kit: 📎 My Reports tweaks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  Shows your attachments and reported comment content on the My Reports page.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/my-reports-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/my-reports-tweaks.user.js
// @run-at       document-start
// @match         *://*.nexusmods.com/my-reports*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/my-reports-tweaks/my-reports-tweaks.css":
			"Lm5teC1tcnQtdGl0bGUtbGluayB7Cgljb2xvcjogaW5oZXJpdDsKCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCgkmOmhvdmVyIHsKCQl0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKCX0KfQoKLm5teC1tcnQtcmVwb3J0ZWQtY29udGVudC10ZXh0IHsKCW1hcmdpbjogMDsKCXBhZGRpbmctbGVmdDogMTBweDsKCWJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tY29sb3Itc3Ryb2tlLXdlYWssICMzZjNmNDYpOwoJd2hpdGUtc3BhY2U6IHByZS13cmFwOwoJb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7Cn0KCi5ubXgtbXJ0LWF0dGFjaG1lbnRzIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJZ2FwOiA4cHg7CgltYXJnaW4tdG9wOiAxMnB4OwoJcGFkZGluZy10b3A6IDEycHg7Cglib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tY29sb3Itc3Ryb2tlLXdlYWssICMzZjNmNDYpOwp9Cgoubm14LW1ydC1hdHRhY2htZW50LWxpc3QgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDZweDsKfQoKLm5teC1tcnQtYXR0YWNobWVudCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCWdhcDogOHB4IDEycHg7Cn0KCi5ubXgtbXJ0LWF0dGFjaG1lbnQtbmFtZSB7CglvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTsKfQoKLm5teC1tcnQtYXR0YWNobWVudC1hY3Rpb25zIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWdhcDogOHB4Owp9Cgojbm14LW1ydC1pbWFnZS1vdmVybGF5LAoubm14LW1ydC1pbWFnZS1vdmVybGF5IHsKCXBvc2l0aW9uOiBmaXhlZDsKCXRvcDogMDsKCWxlZnQ6IDA7Cgl3aWR0aDogMTAwJTsKCWhlaWdodDogMTAwJTsKCW1hcmdpbjogYXV0bzsKCWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTsKCWRpc3BsYXk6IG5vbmU7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl6LWluZGV4OiA5OTk5OwoJY3Vyc29yOiB6b29tLW91dDsKCgkmLm5teC1tcnQtb3BlbiB7CgkJZGlzcGxheTogZmxleDsKCX0KCgkmID4gaW1nIHsKCQltYXgtd2lkdGg6IDg1JTsKCQltYXgtaGVpZ2h0OiA4NSU7CgkJbWFyZ2luOiBhdXRvOwoJCWJvcmRlci1yYWRpdXM6IDhweDsKCX0KfQoKLm5teC1tcnQtdGV4dC1vdmVybGF5IHsKCXBvc2l0aW9uOiBmaXhlZDsKCXRvcDogMDsKCWxlZnQ6IDA7Cgl3aWR0aDogMTAwJTsKCWhlaWdodDogMTAwJTsKCW1hcmdpbjogYXV0bzsKCWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTsKCWRpc3BsYXk6IG5vbmU7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl6LWluZGV4OiA5OTk5OwoKCSYubm14LW1ydC1vcGVuIHsKCQlkaXNwbGF5OiBmbGV4OwoJfQp9Cgoubm14LW1ydC10ZXh0LW92ZXJsYXktYm94IHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJd2lkdGg6IDgwJTsKCW1heC13aWR0aDogOTAwcHg7CgloZWlnaHQ6IDgwJTsKCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtOTAwKTsKCWJvcmRlci1yYWRpdXM6IDhweDsKCW92ZXJmbG93OiBoaWRkZW47CgljdXJzb3I6IGF1dG87Cn0KCi5ubXgtbXJ0LXRleHQtb3ZlcmxheS10aXRsZSB7CglkaXNwbGF5OiBmbGV4OwoJZmxleDogMCAwIGF1dG87CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOwoJcGFkZGluZzogMTBweCAxNnB4OwoJY29sb3I6IHdoaXRlOwoJZm9udC13ZWlnaHQ6IDYwMDsKCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTUwMCk7Cn0KCi5ubXgtbXJ0LXRleHQtb3ZlcmxheS1jbG9zZSB7CgljdXJzb3I6IHBvaW50ZXI7Cglmb250LXNpemU6IDIycHg7CglsaW5lLWhlaWdodDogMTsKCWNvbG9yOiB3aGl0ZTsKCXVzZXItc2VsZWN0OiBub25lOwoKCSY6aG92ZXIgewoJCWNvbG9yOiB2YXIoLS1jb2xvci1vcmFuZ2UtNTAwKTsKCX0KfQoKLm5teC1tcnQtdGV4dC1vdmVybGF5LWNvbnRlbnQgewoJZmxleDogMSAxIGF1dG87CgltYXJnaW46IDA7CglwYWRkaW5nOiAxNnB4OwoJb3ZlcmZsb3c6IGF1dG87Cgljb2xvcjogdmFyKC0tY29sb3ItemluYy0zMDApOwoJZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKCWZvbnQtc2l6ZTogMTRweDsKCXdoaXRlLXNwYWNlOiBwcmUtd3JhcDsKCXdvcmQtYnJlYWs6IGJyZWFrLXdvcmQ7Cn0K",
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
	const EVENT_NAME = "nmx-my-reports-response";
	const classNMX = "nmx-mrt";
	const classSection = "nmx-mrt-attachments";
	const classList = "nmx-mrt-attachment-list";
	const classAttachment = "nmx-mrt-attachment";
	const classActions = "nmx-mrt-attachment-actions";
	const classTitleLink = "nmx-mrt-title-link";
	const classReportedContent = "nmx-mrt-reported-content";
	const CARD_SELECTOR = "div.flex.flex-col.rounded-lg.border.border-stroke-weak.bg-surface-low";
	const TITLE_SELECTOR = "p.text-body-lg.text-neutral-strong.break-words";
	const REPORT_ID_PATTERN = /^ID: RPT(\d+)$/;
	let reportDataById = new Map();
	let observer;
	let rescanTimer;
	let imageOverlay;
	let imageOverlayImg;
	let textOverlay;
	let textOverlayTitle;
	let textOverlayContent;
	let textOverlayToken = 0;
	nmxRegisterToggle("optToggleMyReportsTweaks", {
		cssFiles: [
			"src/features/my-reports-tweaks/my-reports-tweaks.css",
		],
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		injectPageScript();
		document.addEventListener(EVENT_NAME, onReportsEvent);
		document.addEventListener("keydown", overlayKeyHandler);
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startAfterReady);
		else startAfterReady();
	}
	function startAfterReady() {
		document.removeEventListener("DOMContentLoaded", startAfterReady);
		startObserver();
		applyReportEnhancements();
	}
	function removeJS() {
		document.removeEventListener("DOMContentLoaded", startAfterReady);
		document.removeEventListener(EVENT_NAME, onReportsEvent);
		document.removeEventListener("keydown", overlayKeyHandler);
		stopObserver();
		clearTimeout(rescanTimer);
		document.querySelectorAll(`.${classSection}, .${classReportedContent}`).forEach((el) => {
			el.remove();
		});
		document.querySelectorAll(`[data-nmx-linked] > .${classTitleLink}`).forEach((link) => {
			const title = link.parentElement;
			while (link.firstChild) title.insertBefore(link.firstChild, link);
			link.remove();
			delete title.dataset.nmxLinked;
		});
		closeImageOverlay();
		closeTextOverlay();
		reportDataById = new Map();
	}
	function injectPageScript() {
		const script = document.createElement("script");
		script.textContent =
			'(() => {\n    const GRAPHQL_HOST = "moderation-router.nexusmods.com";\n    const GRAPHQL_PATH = "/graphql";\n    const EVENT_NAME = "nmx-my-reports-response";\n    function isGraphQLRequest(method, url) {\n        if (String(method).toUpperCase() !== "POST" || typeof url !== "string") return false;\n        try {\n            const parsed = new URL(url, location.href);\n            return parsed.hostname === GRAPHQL_HOST && parsed.pathname === GRAPHQL_PATH;\n        } catch {\n            return false;\n        }\n    }\n    function isMyReportsPayload(payload) {\n        return Array.isArray(payload?.data?.myReports?.edges);\n    }\n    function getReportedContentMetadata(node) {\n        const entry = (node.metadata ?? []).find(m => m?.key === "reported_content");\n        return typeof entry?.value === "string" ? entry.value : null;\n    }\n    function publishReportData(payload) {\n        const entries = payload.data.myReports.edges.filter(edge => edge?.node?.id != null).map(edge => ({\n            id: edge.node.id,\n            attachments: Array.isArray(edge.node.attachments) ? edge.node.attachments : [],\n            reportedContentUrl: edge.node.reportedContentUrl ?? null,\n            reportedContent: getReportedContentMetadata(edge.node)\n        }));\n        if (!entries.length) return;\n        document.dispatchEvent(new CustomEvent(EVENT_NAME, {\n            detail: entries\n        }));\n    }\n    function readAndPublish(promiseOrResponse) {\n        Promise.resolve(promiseOrResponse).then(response => response.clone().json()).then(payload => {\n            if (isMyReportsPayload(payload)) publishReportData(payload);\n        }).catch(() => {});\n    }\n    const originalFetch = window.fetch;\n    window.fetch = function(input, init) {\n        const url = typeof input === "string" ? input : input?.url;\n        const method = init?.method ?? (input instanceof Request ? input.method : "GET");\n        const promise = originalFetch.call(this, input, init);\n        if (isGraphQLRequest(method, url)) readAndPublish(promise);\n        return promise;\n    };\n    const originalOpen = XMLHttpRequest.prototype.open;\n    XMLHttpRequest.prototype.open = function(method, url, ...rest) {\n        this.nmxIsMyReportsGraphQL = isGraphQLRequest(method, url);\n        if (this.nmxIsMyReportsGraphQL) {\n            this.addEventListener("readystatechange", () => {\n                if (this.readyState !== 4 || this.status !== 200) return;\n                try {\n                    const payload = this.responseType === "json" ? this.response : JSON.parse(this.responseText);\n                    if (isMyReportsPayload(payload)) publishReportData(payload);\n                } catch {}\n            });\n        }\n        return originalOpen.apply(this, [ method, url, ...rest ]);\n    };\n})();';
		script.addEventListener("load", () => script.remove());
		(document.head || document.documentElement).prepend(script);
	}
	function onReportsEvent(event) {
		(event.detail ?? []).forEach((entry) => {
			if (entry?.id == null) return;
			reportDataById.set(String(entry.id), {
				attachments: Array.isArray(entry.attachments) ? entry.attachments : [],
				reportedContentUrl: entry.reportedContentUrl ?? null,
				reportedContent: typeof entry.reportedContent === "string" ? entry.reportedContent : null,
			});
		});
		applyReportEnhancements();
	}
	function startObserver() {
		observer = new MutationObserver((mutationList) => {
			const portalRoot = document.getElementById("headlessui-portal-root");
			if (portalRoot && mutationList.every((mutation) => portalRoot.contains(mutation.target))) return;
			clearTimeout(rescanTimer);
			rescanTimer = setTimeout(applyReportEnhancements, 200);
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
	function stopObserver() {
		observer?.disconnect();
		observer = undefined;
	}
	function findReportCards() {
		const cards = [];
		document.querySelectorAll("button").forEach((button) => {
			const match = button.textContent.trim().match(REPORT_ID_PATTERN);
			const card = match && button.closest(CARD_SELECTOR);
			if (card)
				cards.push({
					id: match[1],
					card: card,
				});
		});
		return cards;
	}
	function applyReportEnhancements() {
		findReportCards().forEach(({ id: id, card: card }) => {
			const data = reportDataById.get(id);
			if (!data) return;
			ensureTitleLink(card, data.reportedContentUrl);
			ensureReportedContentSection(card, data.reportedContent);
			ensureAttachmentsSection(card, data.attachments);
		});
	}
	function ensureAttachmentsSection(card, attachments) {
		if (!attachments?.length) return;
		const bottomSection = card.lastElementChild;
		if (!bottomSection || bottomSection.querySelector(`:scope > .${classSection}`)) return;
		bottomSection.appendChild(buildAttachmentsSection(attachments));
	}
	function ensureTitleLink(card, url) {
		if (!url) return;
		const title = card.querySelector(TITLE_SELECTOR);
		if (!title || title.dataset.nmxLinked) return;
		title.dataset.nmxLinked = "1";
		const link = document.createElement("a");
		link.className = classTitleLink;
		link.href = url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		while (title.firstChild) link.appendChild(title.firstChild);
		title.appendChild(link);
	}
	function extractReportedContent(rawValue) {
		if (!rawValue) return null;
		const tail = htmlDecode(rawValue.split("</div>").pop()).trim();
		return tail || null;
	}
	function htmlDecode(input) {
		const doc = new DOMParser().parseFromString(input, "text/html");
		return doc.documentElement.textContent;
	}
	function ensureReportedContentSection(card, reportedContentRaw) {
		const reportedContent = extractReportedContent(reportedContentRaw);
		if (!reportedContent) return;
		const bottomSection = card.lastElementChild;
		if (!bottomSection || bottomSection.querySelector(`:scope > .${classReportedContent}`)) return;
		const section = document.createElement("div");
		section.className = `${classNMX} ${classReportedContent}`;
		const heading = document.createElement("p");
		heading.className = "typography-body-md text-neutral-moderate font-semibold";
		heading.textContent = "Reported Content";
		section.appendChild(heading);
		const quote = document.createElement("blockquote");
		quote.className = "nmx-mrt-reported-content-text typography-body-sm";
		quote.textContent = reportedContent;
		section.appendChild(quote);
		bottomSection.appendChild(section);
	}
	function buildAttachmentsSection(attachments) {
		const section = document.createElement("div");
		section.className = `${classNMX} ${classSection}`;
		const heading = document.createElement("p");
		heading.className = "typography-body-md text-neutral-moderate font-semibold";
		heading.textContent = "Attachments";
		section.appendChild(heading);
		const list = document.createElement("div");
		list.className = classList;
		attachments.forEach((attachment) => {
			list.appendChild(buildAttachmentRow(attachment));
		});
		section.appendChild(list);
		return section;
	}
	function buildAttachmentRow(attachment) {
		const row = document.createElement("div");
		row.className = classAttachment;
		const size = formatBytes(attachment.fileSizeBytes);
		const name = document.createElement("span");
		name.className = "typography-body-sm nmx-mrt-attachment-name";
		name.textContent = size ? `${attachment.fileName} (${size})` : attachment.fileName;
		row.appendChild(name);
		const actions = document.createElement("div");
		actions.className = classActions;
		row.appendChild(actions);
		const mimeType = attachment.mimeType ?? "";
		const isImage = mimeType.startsWith("image/");
		const isText = mimeType.startsWith("text/");
		if (isImage || isText) {
			const viewButton = document.createElement("button");
			viewButton.type = "button";
			viewButton.className = "nxm-button nxm-button-sm nxm-button-secondary";
			viewButton.textContent = "View";
			viewButton.addEventListener("click", () => {
				if (isImage) openImageOverlay(attachment.url, attachment.fileName);
				else openTextOverlay(attachment.url, attachment.fileName);
			});
			actions.appendChild(viewButton);
		}
		const downloadLink = document.createElement("a");
		downloadLink.className = "nxm-button nxm-button-sm nxm-button-secondary";
		downloadLink.href = attachment.url;
		downloadLink.textContent = "Download";
		actions.appendChild(downloadLink);
		return row;
	}
	function formatBytes(bytes) {
		if (typeof bytes !== "number" || Number.isNaN(bytes)) return "";
		const units = [
			"B",
			"KB",
			"MB",
			"GB",
		];
		let value = bytes;
		let unitIndex = 0;
		while (value >= 1024 && unitIndex < units.length - 1) {
			value /= 1024;
			unitIndex++;
		}
		return `${unitIndex === 0 ? value : value.toFixed(1)} ${units[unitIndex]}`;
	}
	function createImageOverlay() {
		imageOverlay = document.createElement("div");
		imageOverlay.className = `${classNMX} nmx-mrt-image-overlay`;
		imageOverlayImg = document.createElement("img");
		imageOverlay.appendChild(imageOverlayImg);
		imageOverlay.addEventListener("click", (e) => {
			if (e.target === imageOverlay) closeImageOverlay();
		});
		document.documentElement.appendChild(imageOverlay);
	}
	function openImageOverlay(url, filename) {
		if (!imageOverlay) createImageOverlay();
		imageOverlayImg.src = url;
		imageOverlayImg.alt = filename ?? "";
		imageOverlay.classList.add("nmx-mrt-open");
	}
	function closeImageOverlay() {
		if (!imageOverlay?.classList.contains("nmx-mrt-open")) return;
		imageOverlay.classList.remove("nmx-mrt-open");
		imageOverlayImg.src = "";
	}
	function createTextOverlay() {
		textOverlay = document.createElement("div");
		textOverlay.className = `${classNMX} nmx-mrt-text-overlay`;
		const box = document.createElement("div");
		box.className = "nmx-mrt-text-overlay-box";
		const titleRow = document.createElement("div");
		titleRow.className = "nmx-mrt-text-overlay-title";
		textOverlayTitle = document.createElement("span");
		titleRow.appendChild(textOverlayTitle);
		const closeButton = document.createElement("span");
		closeButton.className = "nmx-mrt-text-overlay-close";
		closeButton.textContent = "×";
		closeButton.addEventListener("click", closeTextOverlay);
		titleRow.appendChild(closeButton);
		textOverlayContent = document.createElement("pre");
		textOverlayContent.className = "nmx-mrt-text-overlay-content";
		box.appendChild(titleRow);
		box.appendChild(textOverlayContent);
		textOverlay.appendChild(box);
		textOverlay.addEventListener("click", (e) => {
			if (e.target === textOverlay) closeTextOverlay();
		});
		document.documentElement.appendChild(textOverlay);
	}
	async function openTextOverlay(url, filename) {
		if (!textOverlay) createTextOverlay();
		textOverlay.classList.add("nmx-mrt-open");
		textOverlayTitle.textContent = filename ?? "";
		textOverlayContent.textContent = "Loading…";
		const token = ++textOverlayToken;
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const text = await response.text();
			if (token !== textOverlayToken) return;
			textOverlayContent.textContent = text;
		} catch (error) {
			if (token !== textOverlayToken) return;
			textOverlayContent.textContent = `Failed to load file: ${error.message}`;
		}
	}
	function closeTextOverlay() {
		if (!textOverlay?.classList.contains("nmx-mrt-open")) return;
		textOverlay.classList.remove("nmx-mrt-open");
		textOverlayToken++;
	}
	function overlayKeyHandler(e) {
		if (e.key !== "Escape") return;
		if (imageOverlay?.classList.contains("nmx-mrt-open")) closeImageOverlay();
		else if (textOverlay?.classList.contains("nmx-mrt-open")) closeTextOverlay();
	}
})();
