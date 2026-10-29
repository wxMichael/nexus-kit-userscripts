// ==UserScript==
// @name         Nexus Kit: 💬 Comment tweaks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
// @description  Copy Link/Text & Translate buttons. Highlight linked comment. Shift+Hover avatars to zoom.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/comment-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/comment-tweaks.user.js
// @run-at       document-idle
// @match         *://*.nexusmods.com/*/images/*
// @match         *://*.nexusmods.com/*/mods/*
// @match         *://*.nexusmods.com/mods/*
// @match         *://*.nexusmods.com/*/supporterimages/*
// @match         *://*.nexusmods.com/*/videos/*
// @match         *://*.nexusmods.com/*/articles/*
// @match         *://*.nexusmods.com/news/*
// @match         *://*.nexusmods.com/*/news/*
// @match         *://*.nexusmods.com/posts/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/comment-tweaks/comment-tweaks.css":
			"I3pvb20tb3ZlcmxheSB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl6LWluZGV4OiAxMDAwOwoJcG9pbnRlci1ldmVudHM6IG5vbmU7CglvcGFjaXR5OiAwOwoJdHJhbnNpdGlvbjoKCQl0cmFuc2Zvcm0gMC41cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSksCgkJb3BhY2l0eSAwLjNzIGVhc2U7Cgl0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdDsKfQoKI3pvb20tb3ZlcmxheS56b29taW5nIHsKCW9wYWNpdHk6IDE7Cn0KCi5jb21tZW50cyB1bC5hY3Rpb25zIHsKCSYgPiBsaSB7CgkJJjpoYXMoLmJ0biA+IHN2Zy5pY29uLXJlcG9ydCkgewoJCQlvcmRlcjogLTE7CgkJfQoKCQkmLm5teC1jb21tZW50LWFjdGlvbiB7CgkJCW9yZGVyOiAtMjsKCQkJdGV4dC1hbGlnbjogY2VudGVyOwoKCQkJYS5kaXNhYmxlZCB7CgkJCQlvcGFjaXR5OiAwLjQ7CgkJCQljdXJzb3I6IGRlZmF1bHQ7CgkJCQlwb2ludGVyLWV2ZW50czogbm9uZTsKCQkJfQoKCQkJYS5wcm9ncmVzcyB7CgkJCQljdXJzb3I6IHByb2dyZXNzOwoJCQl9CgkJfQoJfQoKCSYgLmJ0bjpoYXMoPiBzdmcuaWNvbi1yZXBvcnQpIHsKCQlib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1kYW5nZXItd2Vhayk7CgkJYmFja2dyb3VuZC1jb2xvcjogI2QwMDI7CgoJCSY6OmJlZm9yZSB7CgkJCWJhY2tncm91bmQtY29sb3I6ICNkMDA0OwoJCX0KCX0KfQo=",
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
	const PAGE_SCRIPTS = {
		"src/features/comment-tweaks/comment-tweaks-inject.js":
			'(() => {\n    const CORRECT_PAGE_EVENT_NAME = "nmx-comment-page-correction";\n    document.addEventListener(CORRECT_PAGE_EVENT_NAME, event => {\n        if (typeof window.RH_CommentContainer?.Send !== "function") return;\n        window.RH_CommentContainer.Send("page", event.detail);\n    });\n})();\n',
	};
	window.nmxRequirePageScript = (relPath) => {
		const source = PAGE_SCRIPTS[relPath];
		if (source === undefined) throw new Error(`[Nexus Kit userscript] Missing inlined page script: ${relPath}`);
		return source;
	};
	window.nmxRegisterToggle = (_settingName, { cssFiles: cssFiles, onEnable: onEnable } = {}) => {
		if (cssFiles) {
			for (const relPath of cssFiles) GM_addStyle(textOf(relPath));
		}
		queueMicrotask(() => onEnable?.(true));
	};
})();

function nmxInjectPageScript(path, onLoad) {
	const script = document.createElement("script");
	script.textContent = nmxRequirePageScript(path);
	queueMicrotask(() => script.dispatchEvent(new Event("load")));
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
	const classNMX = "nmx-element";
	const classCommentAction = "nmx-comment-action";
	const newlinePlaceholder = "[<<>>]";
	let observer;
	const postsURL = new URLPattern("*://*.nexusmods.com/posts/:commentID");
	const mediaURL = new URLPattern("*://*.nexusmods.com/:gameDomain/:mediaType(images|supporterimages|videos)/*");
	const articleURL = new URLPattern("*://*.nexusmods.com/:gameDomain/articles/*");
	const historyURL = new URLPattern("*://*.nexusmods.com/admin/users/*/comments");
	const newsURL1 = new URLPattern("*://*.nexusmods.com/news/:newsID");
	const newsURL2 = new URLPattern("*://*.nexusmods.com/:gameDomain/news/:newsID");
	let pageLink;
	let useObserver = true;
	let wrapperConfigs;
	let observationTargetSelector;
	let addPageLink = false;
	const params = new URLSearchParams(location.search);
	const commentID = params.get("comment_id") || params.get("jump_to_comment");
	let viewingHistory = false;
	let copyLinkText = "Copy Link";
	let avatarImageElements;
	let isShiftPressed = false;
	let currentAvatar = null;
	let avatarZoomOverlay;
	let expectedPage = null;
	let pageInputAtClickTime = null;
	const CORRECT_PAGE_EVENT_NAME = "nmx-comment-page-correction";
	if (postsURL.test(location.href)) {
		pageLink = document.querySelector("#fileinfo > .sideitem:nth-of-type(2) > a")?.href;
		useObserver = false;
		addPageLink = true;
		wrapperConfigs = [
			{
				selector: "#mainContent",
				isBugsTab: false,
			},
		];
	} else if (mediaURL.test(location.href)) {
		pageLink = document.getElementById("page-link")?.value;
		wrapperConfigs = [
			{
				selector: "#comment-container",
				isBugsTab: false,
			},
		];
		observationTargetSelector = ".image-comment-wrapper";
	} else if (articleURL.test(location.href)) {
		pageLink = location.href.split("?")[0];
		wrapperConfigs = [
			{
				selector: "#comment-container",
				isBugsTab: false,
			},
		];
		observationTargetSelector = ".article-comment-wrapper";
	} else if (historyURL.test(location.href)) {
		wrapperConfigs = [
			{
				selector: "#comment-container",
				isBugsTab: false,
			},
		];
		useObserver = false;
		viewingHistory = true;
		copyLinkText = "Copy Permalink";
	} else if (newsURL1.test(location.href) || newsURL2.test(location.href)) {
		pageLink = location.href.split("?")[0];
		wrapperConfigs = [
			{
				selector: "#comment-container",
				isBugsTab: false,
			},
		];
		observationTargetSelector = ".news-comment-wrapper";
	} else {
		pageLink = document.getElementById("page-link")?.value;
		observationTargetSelector = "div.tabcontent";
		wrapperConfigs = [
			{
				selector: "#comment-container-wrapper",
				isBugsTab: false,
			},
			{
				selector: "#tab-modbugs",
				isBugsTab: true,
			},
		];
	}
	nmxRegisterToggle("optToggleCommentTweaks", {
		cssFiles: [
			"src/features/comment-tweaks/comment-tweaks.css",
		],
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		if ("nmxCommentTweaksLoaded" in document.body.dataset) removeJS();
		else document.body.dataset.nmxCommentTweaksLoaded = "";
		nmxInjectPageScript("src/features/comment-tweaks/comment-tweaks-inject.js");
		processComments();
		if (useObserver) {
			const targetNode = document.querySelector(observationTargetSelector);
			observerStart(targetNode);
		}
		document.addEventListener("click", handleModerationActionClick, true);
	}
	function removeJS() {
		if (useObserver) observerStop();
		document.querySelectorAll(`.${classNMX}`).forEach((e) => {
			e.remove();
		});
		document.querySelectorAll(`.${classCommentAction}`).forEach((e) => {
			e.remove();
		});
		const translated = document.querySelectorAll('div[data-translated="yes"]');
		translated.forEach((content) => {
			content.dataset.translated = "no";
			content.replaceChildren(...content.originalNodes);
		});
		document.removeEventListener("click", handleModerationActionClick, true);
		expectedPage = null;
		pageInputAtClickTime = null;
		document.removeEventListener("keydown", handleKeyDown);
		document.removeEventListener("keyup", handleKeyUp);
		avatarImageElements = document.querySelectorAll("a.comment-user > img");
		avatarImageElements.forEach((img) => {
			img.removeEventListener("mouseenter", handleMouseEnter);
			img.removeEventListener("mouseleave", avatarZoomReset);
		});
		avatarZoomOverlay?.remove();
		avatarZoomVarsReset();
	}
	function avatarZoomVarsReset() {
		avatarZoomReset();
		avatarImageElements = undefined;
		isShiftPressed = false;
		currentAvatar = null;
		avatarZoomOverlay = undefined;
	}
	function observerStart(targetNode) {
		observerStop();
		if (!targetNode) return;
		window.addEventListener("unload", observerStop);
		observer = new MutationObserver(callback);
		observer.observe(targetNode, {
			attributes: false,
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
			if (mutation.type !== "childList") continue;
			if (mutation.addedNodes.length !== 0) {
				for (const node of mutation.addedNodes) {
					if (node.nodeType !== Node.ELEMENT_NODE) continue;
					processComments();
					return;
				}
			}
			if (mutation.removedNodes.length !== 0) {
				for (const node of mutation.removedNodes) {
					if (node.nodeType !== Node.ELEMENT_NODE) continue;
					if (!node.classList.contains("nexus-ui-blocker")) continue;
					processComments();
					return;
				}
			}
		}
	}
	function handleModerationActionClick(event) {
		if (event.target.closest(".pagination")) {
			expectedPage = null;
			pageInputAtClickTime = null;
			return;
		}
		const trigger = event.target.closest(".change-comment-status");
		if (!trigger) return;
		const commentContainer = wrapperConfigs
			.map((config) => document.querySelector(config.selector))
			.find((container) => container?.contains(trigger));
		if (!commentContainer) return;
		const activePageLink = commentContainer.querySelector(".pagination .page-selected");
		const pageInput = commentContainer.querySelector("#current-page-number");
		expectedPage = activePageLink ? activePageLink.textContent.trim() : (pageInput?.value ?? "1");
		pageInputAtClickTime = pageInput;
	}
	function correctModerationPageReset(commentContainer) {
		if (expectedPage === null) return;
		const actualPageInput = commentContainer.querySelector("#current-page-number");
		if (!actualPageInput) return;
		if (actualPageInput === pageInputAtClickTime) return;
		const page = expectedPage;
		expectedPage = null;
		pageInputAtClickTime = null;
		if (actualPageInput.value === page) return;
		document.dispatchEvent(
			new CustomEvent(CORRECT_PAGE_EVENT_NAME, {
				detail: page,
			}),
		);
	}
	function processComments() {
		for (const config of wrapperConfigs) {
			processCommentsIn(config);
		}
	}
	function processCommentsIn({ selector: selector, isBugsTab: isBugsTab }) {
		const commentContainer = document.querySelector(selector);
		if (commentContainer === null) return;
		correctModerationPageReset(commentContainer);
		const comments = commentContainer.querySelectorAll("li.comment");
		if (comments.length === 0) return;
		comments.forEach((currentValue, _currentIndex, _listObj) => {
			const commentId = currentValue.id.split("-").pop();
			let commentActions;
			if (viewingHistory) {
				const commentHead = currentValue.querySelector(".comment-head");
				const commentActionsDiv = document.createElement("div");
				commentActions = document.createElement("ul");
				commentActions.classList.add("actions", "clearfix");
				commentActionsDiv.classList.add("nmx-element", "comment-actions");
				commentActionsDiv.appendChild(commentActions);
				commentHead.appendChild(commentActionsDiv);
			} else {
				commentActions = currentValue.querySelector("div.comment-actions > ul");
			}
			if (commentActions.querySelector(`li.${classCommentAction}`) === null) {
				ensureCommentContentText(currentValue);
				addCommentActions(commentActions, commentId, currentValue, isBugsTab);
			}
			if (commentId === commentID) {
				currentValue.style.boxShadow = "0 0 16px 0 var(--theme-primary)";
			}
			if (addPageLink) {
				const pageLink_li = document.createElement("li");
				const pageLink_a = document.createElement("a");
				pageLink_a.innerText = "Page Link";
				pageLink_a.href = `${pageLink}?tab=posts&comment_id=${commentId}`;
				pageLink_li.classList.add(classNMX);
				pageLink_li.appendChild(pageLink_a);
				currentValue.querySelector(".comment-details > ul").appendChild(pageLink_li);
			}
			avatarZoomVarsReset();
			avatarImageElements = document.querySelectorAll("a.comment-user > img");
			avatarZoomOverlay = document.getElementById("zoom-overlay");
			if (avatarZoomOverlay === null) {
				avatarZoomOverlay = document.createElement("img");
				avatarZoomOverlay.id = "zoom-overlay";
				document.body.appendChild(avatarZoomOverlay);
			}
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("keyup", handleKeyUp);
			avatarImageElements.forEach((img) => {
				img.addEventListener("mouseenter", handleMouseEnter);
				img.addEventListener("mouseleave", avatarZoomReset);
			});
		});
	}
	function createSvgIcon(pathData, svgClass) {
		return nmxCreateSvgIcon(pathData, {
			svgClass: svgClass,
			svgStyle: "width: 14.3px; height: 14.3px;",
			pathStyle: "fill: currentcolor;",
		});
	}
	function createActionButton(commentId, text, icon, onclick, commentElement) {
		const elem_span = document.createElement("span");
		const elem_a = document.createElement("a");
		const elem_li = document.createElement("li");
		elem_span.className = "flex-label";
		elem_a.className = "btn inline-flex";
		elem_li.className = classCommentAction;
		if (icon) elem_a.appendChild(icon);
		if (text) elem_span.innerText = text;
		elem_a.appendChild(elem_span);
		elem_li.appendChild(elem_a);
		elem_a.onclick = onclick;
		elem_a.span = elem_span;
		elem_a.commentId = commentId;
		elem_a.commentElement = commentElement;
		return elem_li;
	}
	function ensureCommentContentText(commentElement) {
		let textElement = commentElement.querySelector(".comment-content-text");
		if (textElement) return textElement;
		const wrapper = commentElement.querySelector(".comment-content");
		if (!wrapper) return null;
		textElement = document.createElement("span");
		textElement.className = "comment-content-text";
		const time = wrapper.querySelector("time");
		let node = time ? time.nextSibling : wrapper.firstChild;
		while (
			node &&
			!(
				node.nodeType === Node.ELEMENT_NODE &&
				(node.classList.contains("comment-reply") || node.classList.contains("comment-inline"))
			)
		) {
			const next = node.nextSibling;
			textElement.appendChild(node);
			node = next;
		}
		wrapper.insertBefore(textElement, node);
		return textElement;
	}
	function copyLink() {
		if (this.classList.contains("disabled")) return;
		let link;
		if (viewingHistory) link = `https://www.nexusmods.com/posts/${this.commentId}`;
		else link = `${pageLink}?tab=posts&comment_id=${this.commentId}`;
		const lockWidth = () => {
			this.style.width = `${this.getBoundingClientRect().width}px`;
		};
		const unlockWidth = () => {
			this.style.removeProperty("width");
		};
		navigator.clipboard
			.writeText(link)
			.then(() => {
				lockWidth();
				this.span.innerText = "Copied!";
				this.classList.add("disabled");
				setTimeout(() => {
					this.span.innerText = copyLinkText;
					this.classList.remove("disabled");
					unlockWidth();
				}, 1500);
			})
			.catch((error) => {
				console.error(error.message);
				lockWidth();
				this.span.innerText = "Copy Failed!";
				this.classList.add("disabled");
				setTimeout(() => {
					this.span.innerText = copyLinkText;
					this.classList.remove("disabled");
					unlockWidth();
				}, 1500);
			});
	}
	function copyComment() {
		if (this.classList.contains("disabled")) return;
		const content = this.commentElement.querySelector(".comment-content-text");
		const timestamp = content.parentElement.querySelector("time").innerText.trim();
		navigator.clipboard
			.writeText(`${timestamp}\n${content.innerText.trim()}`)
			.then(() => {
				this.classList.add("disabled");
				setTimeout(() => {
					this.classList.remove("disabled");
				}, 1500);
			})
			.catch((error) => {
				console.error(error.message);
				const originalNodes = Array.from(this.childNodes).map((n) => n.cloneNode(true));
				this.innerText = "❌";
				this.classList.add("disabled");
				setTimeout(() => {
					this.replaceChildren(...originalNodes);
					this.classList.remove("disabled");
				}, 1500);
			});
	}
	const pathCopy =
		"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
	const pathLink =
		"M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59V10.59Z";
	const pathTranslate =
		"M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z";
	function addCommentActions(commentActions, commentId, commentElement, isBugsTab) {
		let actionButton;
		actionButton = createActionButton(commentId, null, createSvgIcon(pathCopy, "relative"), copyComment, commentElement);
		commentActions.insertAdjacentElement("afterbegin", actionButton);
		if (!isBugsTab) {
			actionButton = createActionButton(
				commentId,
				viewingHistory ? "Copy Permalink" : "Copy Link",
				createSvgIcon(pathLink, "icon relative"),
				copyLink,
				commentElement,
			);
			commentActions.insertAdjacentElement("afterbegin", actionButton);
		}
		actionButton = createActionButton(
			commentId,
			"Translate",
			createSvgIcon(pathTranslate, "icon relative"),
			getTranslation,
			commentElement,
		);
		commentActions.insertAdjacentElement("afterbegin", actionButton);
	}
	function getTranslation() {
		if (this.classList.contains("disabled")) return false;
		const content = this.commentElement.querySelector(".comment-content-text");
		let commentText = content.innerText.trim();
		if (!commentText) {
			this.span.innerText = "Empty";
			this.classList.add("disabled");
			return;
		}
		if ("translated" in content.dataset) {
			if (content.dataset.translated === "yes") {
				content.dataset.translated = "no";
				content.replaceChildren(...content.originalNodes);
				this.span.innerText = "Translate";
			} else {
				content.dataset.translated = "yes";
				content.innerText = content.dataset.translation;
				this.span.innerText = "Original";
			}
			return;
		}
		this.classList.add("disabled", "progress");
		commentText = commentText.replaceAll("\n", newlinePlaceholder).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
		const headers = new Headers();
		headers.set("Accept", "/");
		headers.set("Content-Type", "application/json+protobuf");
		headers.set("X-Goog-API-Key", "AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520");
		const options = {
			method: "POST",
			referrer: "",
			headers: headers,
			body: `[[['${commentText}'],'auto','en'],'wt_lib']`,
		};
		fetch("https://translate-pa.googleapis.com/v1/translateHtml", options)
			.then((response) => {
				if (!response.ok) {
					this.span.innerText = "Error";
					this.classList.remove("progress");
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((json) => {
				content.dataset.translated = "yes";
				content.originalNodes = Array.from(content.childNodes).map((n) => n.cloneNode(true));
				content.dataset.translation = nmxHtmlDecode(json[0][0]).replaceAll(newlinePlaceholder, "\n");
				content.innerText = content.dataset.translation;
				this.span.innerText = "Original";
				this.classList.remove("disabled", "progress");
			});
	}
	function handleKeyDown(event) {
		if (event.key === "Shift" && !isShiftPressed) {
			isShiftPressed = true;
			if (currentAvatar !== null) return;
			avatarImageElements.forEach((img) => {
				if (currentAvatar !== null) return;
				if (img.matches(":hover")) avatarZoomStart(this);
			});
		}
	}
	function handleKeyUp(event) {
		if (event.key === "Shift" && isShiftPressed) {
			isShiftPressed = false;
			avatarZoomReset();
		}
	}
	function handleMouseEnter() {
		if (isShiftPressed) avatarZoomStart(this);
	}
	function avatarZoomStart(img) {
		if (img === currentAvatar) return;
		currentAvatar = img;
		const rect = img.getBoundingClientRect();
		img.style.cursor = "none";
		img.style.opacity = 0;
		img.dataset.title = img.title;
		img.title = "";
		avatarZoomOverlay.src = img.src;
		avatarZoomOverlay.style.left = `${rect.left}px`;
		avatarZoomOverlay.style.top = `${rect.top}px`;
		avatarZoomOverlay.style.width = `${rect.width}px`;
		avatarZoomOverlay.style.height = `${rect.height}px`;
		avatarZoomOverlay.classList.add("zooming");
		avatarZoomOverlay.style.transform = "scale(4)";
	}
	function avatarZoomReset() {
		if (!currentAvatar) return;
		currentAvatar.title = currentAvatar.dataset.title;
		currentAvatar.removeAttribute("data-title");
		currentAvatar.style.cursor = "pointer";
		currentAvatar.style.opacity = 1;
		avatarZoomOverlay.style.transform = "scale(1)";
		avatarZoomOverlay.classList.remove("zooming");
		currentAvatar = null;
	}
})();
