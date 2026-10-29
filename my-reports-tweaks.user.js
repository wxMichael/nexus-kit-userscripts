// ==UserScript==
// @name         Nexus Kit: 📎 My Reports tweaks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
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
			"Lm5teC1tcnQtdGl0bGUtbGluayB7Cgljb2xvcjogaW5oZXJpdDsKCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCgkmOmhvdmVyIHsKCQl0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKCX0KfQoKLm5teC1tcnQtcmVwb3J0ZWQtY29udGVudC10ZXh0IHsKCW1hcmdpbjogMDsKCXBhZGRpbmctbGVmdDogMTBweDsKCWJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tY29sb3Itc3Ryb2tlLXdlYWssICMzZjNmNDYpOwoJd2hpdGUtc3BhY2U6IHByZS13cmFwOwoJb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7Cn0KCi5ubXgtbXJ0LWF0dGFjaG1lbnRzIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJZ2FwOiA4cHg7CgltYXJnaW4tdG9wOiAxMnB4OwoJcGFkZGluZy10b3A6IDEycHg7Cglib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tY29sb3Itc3Ryb2tlLXdlYWssICMzZjNmNDYpOwp9Cgoubm14LW1ydC1hdHRhY2htZW50LWxpc3QgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDZweDsKfQoKLm5teC1tcnQtYXR0YWNobWVudCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCWdhcDogOHB4IDEycHg7Cn0KCi5ubXgtbXJ0LWF0dGFjaG1lbnQtbmFtZSB7CglvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTsKfQoKLm5teC1tcnQtYXR0YWNobWVudC1hY3Rpb25zIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWdhcDogOHB4Owp9Cgojbm14LW1ydC1pbWFnZS1vdmVybGF5LAoubm14LW1ydC1pbWFnZS1vdmVybGF5IHsKCXBvc2l0aW9uOiBmaXhlZDsKCXRvcDogMDsKCWxlZnQ6IDA7Cgl3aWR0aDogMTAwJTsKCWhlaWdodDogMTAwJTsKCW1hcmdpbjogYXV0bzsKCWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTsKCWRpc3BsYXk6IG5vbmU7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl6LWluZGV4OiA5OTk5OwoJY3Vyc29yOiB6b29tLW91dDsKCgkmLm5teC1tcnQtb3BlbiB7CgkJZGlzcGxheTogZmxleDsKCX0KCgkmID4gaW1nIHsKCQltYXgtd2lkdGg6IDg1JTsKCQltYXgtaGVpZ2h0OiA4NSU7CgkJbWFyZ2luOiBhdXRvOwoJCWJvcmRlci1yYWRpdXM6IDhweDsKCX0KfQo=",
		"src/shared/text-viewer.css":
			"Cgojbm14LXRleHQtdmlld2VyIHsKCXBvc2l0aW9uOiBmaXhlZDsKCXRvcDogMDsKCWxlZnQ6IDA7Cgl3aWR0aDogMTAwJTsKCWhlaWdodDogMTAwJTsKCW1hcmdpbjogYXV0bzsKCWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45KTsKCWRpc3BsYXk6IG5vbmU7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl6LWluZGV4OiA5OTk5OwoKCSYubm14LW9wZW4gewoJCWRpc3BsYXk6IGZsZXg7Cgl9Cn0KCmJvZHkubm14LXRleHQtdmlld2VyLWxvY2tlZCB7CglvdmVyZmxvdzogaGlkZGVuOwp9Cgojbm14LXRleHQtdmlld2VyLWJveCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKCXdpZHRoOiA4MCU7CgltYXgtd2lkdGg6IDkwMHB4OwoJaGVpZ2h0OiA4MCU7CgliYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci16aW5jLTkwMCk7Cglib3JkZXItcmFkaXVzOiA4cHg7CglvdmVyZmxvdzogaGlkZGVuOwoJY3Vyc29yOiBhdXRvOwp9Cgojbm14LXRleHQtdmlld2VyLXRpdGxlIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CglwYWRkaW5nOiAxMHB4IDE2cHg7Cgljb2xvcjogd2hpdGU7Cglmb250LXdlaWdodDogNjAwOwoJYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXppbmMtNTAwKTsKfQoKI25teC10ZXh0LXZpZXdlci1jb250cm9scyB7CglkaXNwbGF5OiBmbGV4OwoJZmxleDogMCAwIGF1dG87CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiAxMnB4Owp9Cgojbm14LXRleHQtdmlld2VyLWxhbmcgewoJYmFja2dyb3VuZDogdmFyKC0tY29sb3ItemluYy04MDApOwoJY29sb3I6IHdoaXRlOwoJYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItemluYy01MDApOwoJYm9yZGVyLXJhZGl1czogNHB4OwoJcGFkZGluZzogMnB4IDZweDsKCWZvbnQtc2l6ZTogMTNweDsKfQoKI25teC10ZXh0LXZpZXdlci1jbG9zZSB7CgljdXJzb3I6IHBvaW50ZXI7Cglmb250LXNpemU6IDIycHg7CglsaW5lLWhlaWdodDogMTsKCWNvbG9yOiB3aGl0ZTsKCXVzZXItc2VsZWN0OiBub25lOwoKCSY6aG92ZXIgewoJCWNvbG9yOiB2YXIoLS1jb2xvci1vcmFuZ2UtNTAwKTsKCX0KfQoKCiNubXgtdGV4dC12aWV3ZXItY29udGVudCwKI25teC10ZXh0LXZpZXdlci1tYXJrZG93biB7CglmbGV4OiAxIDEgYXV0bzsKCW1pbi1oZWlnaHQ6IDA7CgltYXJnaW46IDA7CglwYWRkaW5nOiAxNnB4OwoJb3ZlcmZsb3c6IGF1dG87CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWJvcmRlcjogMDsKCWJvcmRlci1yYWRpdXM6IDAgMCA4cHggOHB4OwoJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtMzAwKTsKCgkmW2hpZGRlbl0gewoJCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKCX0KfQoKI25teC10ZXh0LXZpZXdlci1jb250ZW50IHsKCWZvbnQtZmFtaWx5OiBtb25vc3BhY2U7Cglmb250LXNpemU6IDE0cHg7Cgl3aGl0ZS1zcGFjZTogcHJlLXdyYXA7Cgl3b3JkLWJyZWFrOiBicmVhay13b3JkOwoKCSYgY29kZSB7CgkJZm9udC1mYW1pbHk6IGluaGVyaXQ7CgkJZm9udC1zaXplOiBpbmhlcml0OwoJCWNvbG9yOiBpbmhlcml0OwoJfQp9CgoKI25teC10ZXh0LXZpZXdlci1ib3ggewoJJiAubm14LXRvay1jb21tZW50IHsKCQljb2xvcjogdmFyKC0tY29sb3ItemluYy01MDApOwoJCWZvbnQtc3R5bGU6IGl0YWxpYzsKCX0KCgkmIC5ubXgtdG9rLXN0cmluZyB7CgkJY29sb3I6ICNhM2JlOGM7Cgl9CgoJJiAubm14LXRvay1udW1iZXIsCgkmIC5ubXgtdG9rLWJvb2xlYW4gewoJCWNvbG9yOiB2YXIoLS1jb2xvci1vcmFuZ2UtNDAwKTsKCX0KCgkmIC5ubXgtdG9rLWtleXdvcmQgewoJCWNvbG9yOiAjYzY3OGRkOwoJfQoKCSYgLm5teC10b2stcHVuY3R1YXRpb24gewoJCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTMwMCk7Cgl9CgoJJiAubm14LXRvay1rZXksCgkmIC5ubXgtdG9rLXNlY3Rpb24gewoJCWNvbG9yOiAjNjFhZmVmOwoJfQoKCSYgLm5teC10b2stdGFnIHsKCQljb2xvcjogI2UwNmM3NTsKCX0KCgkmIC5ubXgtdG9rLWVudGl0eSB7CgkJY29sb3I6ICM1NmI2YzI7Cgl9CgoJJiAubm14LXRvay1lcnJvciB7CgkJY29sb3I6ICNlMDZjNzU7CgkJZm9udC13ZWlnaHQ6IDYwMDsKCX0KCgkmIC5ubXgtdG9rLXdhcm5pbmcgewoJCWNvbG9yOiAjZTVjMDdiOwoJCWZvbnQtd2VpZ2h0OiA2MDA7Cgl9CgoJJiAubm14LXRvay1pbmZvIHsKCQljb2xvcjogIzYxYWZlZjsKCX0KCgkmIC5ubXgtdG9rLWRlYnVnIHsKCQljb2xvcjogdmFyKC0tY29sb3ItemluYy01MDApOwoJfQp9CgoKI25teC10ZXh0LXZpZXdlci1tYXJrZG93biB7Cglmb250LXNpemU6IDE0cHg7CglsaW5lLWhlaWdodDogMS42OwoJb3ZlcmZsb3ctd3JhcDogYW55d2hlcmU7CgoJJiA+IDpmaXJzdC1jaGlsZCB7CgkJbWFyZ2luLXRvcDogMDsKCX0KCgkmIGgxLAoJJiBoMiwKCSYgaDMsCgkmIGg0LAoJJiBoNSwKCSYgaDYgewoJCW1hcmdpbjogMjBweCAwIDEwcHg7CgkJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtMTAwKTsKCQlmb250LXdlaWdodDogNjAwOwoJCWxpbmUtaGVpZ2h0OiAxLjM7Cgl9CgoJJiBoMSB7CgkJZm9udC1zaXplOiAxLjc1ZW07Cgl9CgoJJiBoMiB7CgkJZm9udC1zaXplOiAxLjRlbTsKCX0KCgkmIGgxLAoJJiBoMiB7CgkJcGFkZGluZy1ib3R0b206IDZweDsKCQlib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tY29sb3ItemluYy03MDApOwoJfQoKCSYgaDMgewoJCWZvbnQtc2l6ZTogMS4yZW07Cgl9CgoJJiBoNCB7CgkJZm9udC1zaXplOiAxLjA1ZW07Cgl9CgoJJiBoNSwKCSYgaDYgewoJCWZvbnQtc2l6ZTogMWVtOwoJfQoKCSYgaDYgewoJCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTQwMCk7Cgl9CgoJJiBwLAoJJiBibG9ja3F1b3RlLAoJJiB1bCwKCSYgb2wsCgkmIHByZSwKCSYgLm5teC1tZC10YWJsZSB7CgkJbWFyZ2luOiAwIDAgMTJweDsKCX0KCgkmIGEgewoJCWNvbG9yOiB2YXIoLS1jb2xvci1vcmFuZ2UtNDAwKTsKCQl0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKCgkJJjpob3ZlciB7CgkJCWNvbG9yOiB2YXIoLS1jb2xvci1vcmFuZ2UtNTAwKTsKCQl9Cgl9CgoJJiAubm14LW1kLWltYWdlIHsKCQlmb250LXN0eWxlOiBpdGFsaWM7Cgl9CgoJJiBzdHJvbmcgewoJCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTEwMCk7CgkJZm9udC13ZWlnaHQ6IDYwMDsKCX0KCgkmIGVtIHsKCQlmb250LXN0eWxlOiBpdGFsaWM7Cgl9CgoJJiBkZWwgewoJCXRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoOwoJfQoKCSYgY29kZSB7CgkJcGFkZGluZzogMXB4IDVweDsKCQliYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci16aW5jLTgwMCk7CgkJYm9yZGVyLXJhZGl1czogNHB4OwoJCWZvbnQtZmFtaWx5OiBtb25vc3BhY2U7CgkJZm9udC1zaXplOiAwLjllbTsKCX0KCgkmIHByZSB7CgkJcGFkZGluZzogMTBweCAxMnB4OwoJCW92ZXJmbG93OiBhdXRvOwoJCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtODAwKTsKCQlib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTcwMCk7CgkJYm9yZGVyLXJhZGl1czogNnB4OwoJCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTMwMCk7CgkJZm9udC1zaXplOiAxM3B4OwoJCXdoaXRlLXNwYWNlOiBwcmU7CgoJCSYgY29kZSB7CgkJCXBhZGRpbmc6IDA7CgkJCWJhY2tncm91bmQ6IG5vbmU7CgkJCWJvcmRlci1yYWRpdXM6IDA7CgkJCWZvbnQtc2l6ZTogaW5oZXJpdDsKCQl9Cgl9CgoJJiBibG9ja3F1b3RlIHsKCQlwYWRkaW5nOiAwIDAgMCAxMnB4OwoJCWJvcmRlci1sZWZ0OiAzcHggc29saWQgdmFyKC0tY29sb3ItemluYy01MDApOwoJCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTQwMCk7CgoJCSYgPiA6bGFzdC1jaGlsZCB7CgkJCW1hcmdpbi1ib3R0b206IDA7CgkJfQoJfQoKCSYgdWwsCgkmIG9sIHsKCQlwYWRkaW5nLWxlZnQ6IDI0cHg7Cgl9CgoJJiB1bCB7CgkJbGlzdC1zdHlsZTogZGlzYzsKCX0KCgkmIHVsIHVsIHsKCQlsaXN0LXN0eWxlOiBjaXJjbGU7Cgl9CgoJJiBvbCB7CgkJbGlzdC1zdHlsZTogZGVjaW1hbDsKCX0KCgkmIGxpID4gdWwsCgkmIGxpID4gb2wsCgkmIGxpID4gcDpsYXN0LWNoaWxkIHsKCQltYXJnaW4tYm90dG9tOiAwOwoJfQoKCSYgbGkubm14LW1kLXRhc2sgewoJCWxpc3Qtc3R5bGU6IG5vbmU7CgoJCSYgPiBpbnB1dCB7CgkJCW1hcmdpbjogMCA2cHggMCAtMjBweDsKCQkJdmVydGljYWwtYWxpZ246IG1pZGRsZTsKCQl9Cgl9CgoJJiBociB7CgkJbWFyZ2luOiAxNnB4IDA7CgkJYm9yZGVyOiAwOwoJCWJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTcwMCk7Cgl9CgoJJiAubm14LW1kLXRhYmxlIHsKCQlvdmVyZmxvdy14OiBhdXRvOwoJfQoKCSYgdGFibGUgewoJCWJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7Cgl9CgoJJiB0aCwKCSYgdGQgewoJCXBhZGRpbmc6IDRweCAxMHB4OwoJCWJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXppbmMtNzAwKTsKCQl0ZXh0LWFsaWduOiBsZWZ0OwoJfQoKCSYgdGggewoJCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtODAwKTsKCQljb2xvcjogdmFyKC0tY29sb3ItemluYy0xMDApOwoJCWZvbnQtd2VpZ2h0OiA2MDA7Cgl9Cn0K",
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
		"src/features/my-reports-tweaks/my-reports-tweaks-inject.js":
			'(() => {\n    if (window.__nmxMyReportsTweaksInjected) return;\n    window.__nmxMyReportsTweaksInjected = true;\n    const GRAPHQL_HOST = "moderation-router.nexusmods.com";\n    const GRAPHQL_PATH = "/graphql";\n    const EVENT_NAME = "nmx-my-reports-response";\n    function isGraphQLRequest(method, url) {\n        if (String(method).toUpperCase() !== "POST" || typeof url !== "string") return false;\n        try {\n            const parsed = new URL(url, location.href);\n            return parsed.hostname === GRAPHQL_HOST && parsed.pathname === GRAPHQL_PATH;\n        } catch {\n            return false;\n        }\n    }\n    function isMyReportsPayload(payload) {\n        return Array.isArray(payload?.data?.myReports?.edges);\n    }\n    function getReportedContentMetadata(node) {\n        const entry = (node.metadata ?? []).find(m => m?.key === "reported_content");\n        return typeof entry?.value === "string" ? entry.value : null;\n    }\n    function publishReportData(payload) {\n        const entries = payload.data.myReports.edges.filter(edge => edge?.node?.id != null).map(edge => ({\n            id: edge.node.id,\n            attachments: Array.isArray(edge.node.attachments) ? edge.node.attachments : [],\n            reportedContentUrl: edge.node.reportedContentUrl ?? null,\n            reportedContent: getReportedContentMetadata(edge.node)\n        }));\n        if (!entries.length) return;\n        document.dispatchEvent(new CustomEvent(EVENT_NAME, {\n            detail: entries\n        }));\n    }\n    function readAndPublish(promiseOrResponse) {\n        Promise.resolve(promiseOrResponse).then(response => response.clone().json()).then(payload => {\n            if (isMyReportsPayload(payload)) publishReportData(payload);\n        }).catch(() => {});\n    }\n    const originalFetch = window.fetch;\n    window.fetch = function(input, init) {\n        const url = typeof input === "string" ? input : input?.url;\n        const method = init?.method ?? (input instanceof Request ? input.method : "GET");\n        const promise = originalFetch.call(this, input, init);\n        if (isGraphQLRequest(method, url)) readAndPublish(promise);\n        return promise;\n    };\n    const originalOpen = XMLHttpRequest.prototype.open;\n    XMLHttpRequest.prototype.open = function(method, url, ...rest) {\n        this.nmxIsMyReportsGraphQL = isGraphQLRequest(method, url);\n        if (!this.nmxMyReportsListenerAttached) {\n            this.nmxMyReportsListenerAttached = true;\n            this.addEventListener("readystatechange", () => {\n                if (!this.nmxIsMyReportsGraphQL) return;\n                if (this.readyState !== 4 || this.status !== 200) return;\n                try {\n                    const payload = this.responseType === "json" ? this.response : JSON.parse(this.responseText);\n                    if (isMyReportsPayload(payload)) publishReportData(payload);\n                } catch {}\n            });\n        }\n        return originalOpen.apply(this, [ method, url, ...rest ]);\n    };\n})();\n',
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

function nmxCreateTextViewer() {
	const classNMX = "nmx-element";
	const classOpen = "nmx-open";
	const classBodyLock = "nmx-text-viewer-locked";
	const idOverlay = "nmx-text-viewer";
	const idBox = "nmx-text-viewer-box";
	const idTitle = "nmx-text-viewer-title";
	const idControls = "nmx-text-viewer-controls";
	const idLanguageSelect = "nmx-text-viewer-lang";
	const idClose = "nmx-text-viewer-close";
	const idContent = "nmx-text-viewer-content";
	const idMarkdown = "nmx-text-viewer-markdown";
	const languages = [
		{
			id: "plain",
			label: "Plain text",
		},
		{
			id: "ini",
			label: "INI / Config",
		},
		{
			id: "json",
			label: "JSON",
		},
		{
			id: "yaml",
			label: "YAML",
		},
		{
			id: "xml",
			label: "XML / HTML",
		},
		{
			id: "log",
			label: "Log",
		},
		{
			id: "javascript",
			label: "JavaScript",
		},
		{
			id: "python",
			label: "Python",
		},
		{
			id: "lua",
			label: "Lua",
		},
		{
			id: "csharp",
			label: "C#",
		},
		{
			id: "markdown",
			label: "Markdown (rendered)",
		},
	];
	const highlightRules = {
		ini: [
			{
				type: "comment",
				pattern: ";[^\\n]*|#[^\\n]*",
			},
			{
				type: "section",
				pattern: "^[ \\t]*\\[[^\\]\\n]*\\]",
			},
			{
				type: "string",
				pattern: "\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'",
			},
			{
				type: "key",
				pattern: "^[ \\t]*[A-Za-z0-9_.\\-]+(?=[ \\t]*=)",
			},
			{
				type: "boolean",
				pattern: "\\b(?:[Tt]rue|TRUE|[Ff]alse|FALSE|[Yy]es|YES|[Nn]o|NO|[Oo]n|ON|[Oo]ff|OFF)\\b",
			},
			{
				type: "number",
				pattern: "-?\\b\\d+(?:\\.\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[=\\[\\]]",
			},
		],
		json: [
			{
				type: "string",
				pattern: '"(?:\\\\.|[^"\\\\\\n])*"',
			},
			{
				type: "boolean",
				pattern: "\\btrue\\b|\\bfalse\\b|\\bnull\\b",
			},
			{
				type: "number",
				pattern: "-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[{}\\[\\],:]",
			},
		],
		yaml: [
			{
				type: "comment",
				pattern: "#[^\\n]*",
			},
			{
				type: "string",
				pattern: "\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:[^'\\n]|'')*'",
			},
			{
				type: "key",
				pattern: "^[ \\t]*-?[ \\t]*[A-Za-z0-9_.\\-]+(?=:)",
			},
			{
				type: "boolean",
				pattern: "\\b(?:[Tt]rue|[Ff]alse|[Yy]es|[Nn]o|[Nn]ull)\\b|~",
			},
			{
				type: "number",
				pattern: "-?\\b\\d+(?:\\.\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[:\\-\\[\\]{}]",
			},
		],
		xml: [
			{
				type: "comment",
				pattern: "\x3c!--[\\s\\S]*?--\x3e",
			},
			{
				type: "tag",
				pattern: "<[^>]+>",
			},
			{
				type: "entity",
				pattern: "&[A-Za-z#0-9]+;",
			},
		],
		log: [
			{
				type: "number",
				pattern: "\\b\\d{4}-\\d{2}-\\d{2}[ T]\\d{2}:\\d{2}:\\d{2}(?:[.,]\\d+)?\\b",
			},
			{
				type: "error",
				pattern: "\\b(?:ERROR|FATAL|CRITICAL)\\b",
			},
			{
				type: "warning",
				pattern: "\\b(?:WARN|WARNING)\\b",
			},
			{
				type: "info",
				pattern: "\\b(?:INFO|NOTICE)\\b",
			},
			{
				type: "debug",
				pattern: "\\b(?:DEBUG|TRACE)\\b",
			},
		],
		javascript: [
			{
				type: "comment",
				pattern: "//[^\\n]*|/\\*[\\s\\S]*?\\*/",
			},
			{
				type: "string",
				pattern: "`(?:\\\\.|[^`\\\\])*`|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'",
			},
			{
				type: "keyword",
				pattern:
					"\\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|typeof|instanceof|in|of|try|catch|finally|throw|async|await|yield|import|export|default|from|this|super|null|undefined|true|false|void|delete)\\b",
			},
			{
				type: "number",
				pattern: "\\b0x[0-9a-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[{}()\\[\\];,.:?]",
			},
		],
		python: [
			{
				type: "comment",
				pattern: "#[^\\n]*",
			},
			{
				type: "string",
				pattern: "\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'",
			},
			{
				type: "keyword",
				pattern:
					"\\b(?:def|class|import|from|as|return|if|elif|else|for|while|break|continue|pass|try|except|finally|raise|with|lambda|yield|global|nonlocal|assert|del|in|is|not|and|or|None|True|False|async|await)\\b",
			},
			{
				type: "number",
				pattern: "\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[{}()\\[\\]:,.]",
			},
		],
		lua: [
			{
				type: "comment",
				pattern: "--\\[\\[[\\s\\S]*?\\]\\]|--[^\\n]*",
			},
			{
				type: "string",
				pattern: "\\[\\[[\\s\\S]*?\\]\\]|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'",
			},
			{
				type: "keyword",
				pattern:
					"\\b(?:function|local|end|if|then|else|elseif|for|while|do|repeat|until|return|break|nil|true|false|and|or|not|in)\\b",
			},
			{
				type: "number",
				pattern: "\\b0x[0-9a-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?\\b",
			},
			{
				type: "punctuation",
				pattern: "[{}()\\[\\],.]",
			},
		],
		csharp: [
			{
				type: "comment",
				pattern: "//[^\\n]*|/\\*[\\s\\S]*?\\*/",
			},
			{
				type: "string",
				pattern: '@"(?:[^"]|"")*"|"(?:\\\\.|[^"\\\\\\n])*"',
			},
			{
				type: "keyword",
				pattern:
					"\\b(?:public|private|protected|internal|class|struct|interface|void|static|readonly|const|new|return|if|else|for|foreach|while|do|switch|case|break|continue|try|catch|finally|throw|using|namespace|null|true|false|var|int|string|bool|float|double|long|this|base|override|virtual|async|await)\\b",
			},
			{
				type: "number",
				pattern: "\\b0x[0-9a-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?[fFdDmM]?\\b",
			},
			{
				type: "punctuation",
				pattern: "[{}()\\[\\];,.]",
			},
		],
	};
	const highlightRegexCache = new Map();
	const fenceLanguages = {
		ini: "ini",
		cfg: "ini",
		toml: "ini",
		json: "json",
		jsonc: "json",
		yaml: "yaml",
		yml: "yaml",
		xml: "xml",
		html: "xml",
		log: "log",
		js: "javascript",
		javascript: "javascript",
		ts: "javascript",
		typescript: "javascript",
		py: "python",
		python: "python",
		lua: "lua",
		cs: "csharp",
		csharp: "csharp",
		"c#": "csharp",
	};
	const reFence = /^( {0,3})(`{3,}|~{3,})(.*)$/;
	const reFenceClose = /^ {0,3}(`{3,}|~{3,})\s*$/;
	const reHeading = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/;
	const reRule = /^ {0,3}(?:(?:\*[ \t]*){3,}|(?:-[ \t]*){3,}|(?:_[ \t]*){3,})$/;
	const reQuote = /^ {0,3}>/;
	const reListItem = /^( {0,3})([-*+]|\d{1,9}[.)])( +|$)(.*)$/;
	const reTableDelimiter = /^ {0,3}\|?[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)*\|?[ \t]*$/;
	const reReferenceDefinition = /^ {0,3}\[([^\]]+)\]:[ \t]*(<[^>]*>|\S+)(?:[ \t]+(?:"([^"]*)"|'([^']*)'|\(([^)]*)\)))?[ \t]*$/;
	const reSetextH1 = /^ {0,3}=+[ \t]*$/;
	const reSetextH2 = /^ {0,3}-+[ \t]*$/;
	const reAutolink = /<((?:https?|mailto):[^\s<>]+)>/iy;
	const reBareUrl = /https?:\/\/[^\s<]+/iy;
	const reAsciiPunctuation = /[!-/:-@[-`{-~]/;
	let overlay;
	let titleText;
	let content;
	let code;
	let markdown;
	let languageSelect;
	let rawText = null;
	let language = "plain";
	let token = 0;
	let markdownReferences = new Map();
	function getHighlightRegex(languageId) {
		let regex = highlightRegexCache.get(languageId);
		if (regex) return regex;
		const source = highlightRules[languageId].map((rule, i) => `(?<t${i}>${rule.pattern})`).join("|");
		regex = new RegExp(source, "gm");
		highlightRegexCache.set(languageId, regex);
		return regex;
	}
	function tokenizeHighlight(text, languageId) {
		const rules = highlightRules[languageId];
		const regex = getHighlightRegex(languageId);
		regex.lastIndex = 0;
		const fragment = document.createDocumentFragment();
		let lastIndex = 0;
		let match = regex.exec(text);
		while (match !== null) {
			if (match.index > lastIndex) {
				fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
			}
			const groupName = Object.keys(match.groups).find((key) => match.groups[key] !== undefined);
			const span = document.createElement("span");
			span.className = `nmx-tok-${rules[Number(groupName.slice(1))].type}`;
			span.textContent = match[0];
			fragment.appendChild(span);
			lastIndex = match.index + match[0].length;
			if (match[0].length === 0) regex.lastIndex += 1;
			match = regex.exec(text);
		}
		if (lastIndex < text.length) {
			fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
		}
		return fragment;
	}
	function isBlank(line) {
		return /^[ \t]*$/.test(line);
	}
	function leadingSpaces(line) {
		return /^ */.exec(line)[0].length;
	}
	function normalizeLabel(label) {
		return label.trim().replace(/\s+/g, " ").toLowerCase();
	}
	function isFenceOpener(line) {
		const match = reFence.exec(line);
		return !!match && !(match[2][0] === "`" && match[3].includes("`"));
	}
	function interruptsParagraph(line) {
		if (isFenceOpener(line) || reHeading.test(line) || reRule.test(line) || reQuote.test(line)) return true;
		const item = reListItem.exec(line);
		return !!item && item[4].trim() !== "" && (!/\d/.test(item[2]) || Number.parseInt(item[2], 10) === 1);
	}
	function splitTableRow(line) {
		let row = line.trim();
		if (row.startsWith("|")) row = row.slice(1);
		if (row.endsWith("|") && !row.endsWith("\\|")) row = row.slice(0, -1);
		return row.split(/(?<!\\)\|/).map((cell) => cell.trim().replace(/\\\|/g, "|"));
	}
	function parseBlocks(lines) {
		const blocks = [];
		let i = 0;
		while (i < lines.length) {
			const line = lines[i];
			if (isBlank(line)) {
				i++;
				continue;
			}
			let match = reFence.exec(line);
			if (match && isFenceOpener(line)) {
				const fence = match[2];
				const indent = match[1].length;
				const body = [];
				i++;
				while (i < lines.length) {
					const close = reFenceClose.exec(lines[i]);
					if (close && close[1][0] === fence[0] && close[1].length >= fence.length) {
						i++;
						break;
					}
					body.push(lines[i].slice(Math.min(indent, leadingSpaces(lines[i]))));
					i++;
				}
				blocks.push({
					type: "code",
					language: match[3].trim().split(/\s+/)[0].toLowerCase(),
					text: body.join("\n"),
				});
				continue;
			}
			if (leadingSpaces(line) >= 4) {
				const body = [];
				while (i < lines.length && (leadingSpaces(lines[i]) >= 4 || isBlank(lines[i]))) {
					body.push(lines[i].slice(4));
					i++;
				}
				while (body.length > 0 && isBlank(body[body.length - 1])) body.pop();
				blocks.push({
					type: "code",
					language: "",
					text: body.join("\n"),
				});
				continue;
			}
			match = reHeading.exec(line);
			if (match) {
				blocks.push({
					type: "heading",
					level: match[1].length,
					text: match[2] ?? "",
				});
				i++;
				continue;
			}
			if (reRule.test(line)) {
				blocks.push({
					type: "rule",
				});
				i++;
				continue;
			}
			if (reQuote.test(line)) {
				const inner = [];
				while (i < lines.length && !isBlank(lines[i])) {
					if (reQuote.test(lines[i])) inner.push(lines[i].replace(/^ {0,3}> ?/, ""));
					else if (inner.length > 0 && !isBlank(inner[inner.length - 1]) && !interruptsParagraph(lines[i])) inner.push(lines[i]);
					else break;
					i++;
				}
				blocks.push({
					type: "quote",
					children: parseBlocks(inner),
				});
				continue;
			}
			match = reListItem.exec(line);
			if (match) {
				const ordered = /\d/.test(match[2]);
				const delimiter = match[2].slice(-1);
				const list = {
					type: "list",
					ordered: ordered,
					start: ordered ? Number.parseInt(match[2], 10) : 1,
					tight: true,
					items: [],
				};
				while (i < lines.length) {
					const item = reListItem.exec(lines[i]);
					if (!item || /\d/.test(item[2]) !== ordered || item[2].slice(-1) !== delimiter) break;
					const spaces = item[3].length;
					const markerSpaces = spaces >= 1 && spaces <= 4 ? spaces : 1;
					const contentIndent = item[1].length + item[2].length + markerSpaces;
					const itemLines = [
						spaces > 4 ? " ".repeat(spaces - 1) + item[4] : item[4],
					];
					i++;
					while (i < lines.length) {
						const next = lines[i];
						if (isBlank(next)) {
							let j = i;
							while (j < lines.length && isBlank(lines[j])) j++;
							if (j < lines.length && leadingSpaces(lines[j]) >= contentIndent) {
								while (i < j) {
									itemLines.push("");
									i++;
								}
								continue;
							}
							break;
						}
						if (leadingSpaces(next) >= contentIndent) {
							itemLines.push(next.slice(contentIndent));
							i++;
							continue;
						}
						if (reListItem.test(next) || interruptsParagraph(next)) break;
						if (!isBlank(itemLines[itemLines.length - 1])) {
							itemLines.push(next.trim());
							i++;
							continue;
						}
						break;
					}
					const children = parseBlocks(itemLines);
					if (children.length > 1 && itemLines.some(isBlank)) list.tight = false;
					let checked = null;
					const first = children[0];
					const task = first?.type === "paragraph" ? /^\[([ xX])\][ \t]+/.exec(first.text) : null;
					if (task) {
						checked = task[1] !== " ";
						first.text = first.text.slice(task[0].length);
					}
					list.items.push({
						checked: checked,
						children: children,
					});
					let j = i;
					while (j < lines.length && isBlank(lines[j])) j++;
					if (j === i) continue;
					const sibling = j < lines.length ? reListItem.exec(lines[j]) : null;
					if (!sibling || /\d/.test(sibling[2]) !== ordered || sibling[2].slice(-1) !== delimiter) break;
					list.tight = false;
					i = j;
				}
				blocks.push(list);
				continue;
			}
			if (line.includes("|") && i + 1 < lines.length && lines[i + 1].includes("|") && reTableDelimiter.test(lines[i + 1])) {
				const header = splitTableRow(line);
				const alignment = splitTableRow(lines[i + 1]).map((cell) => {
					if (cell.startsWith(":") && cell.endsWith(":")) return "center";
					if (cell.endsWith(":")) return "right";
					if (cell.startsWith(":")) return "left";
					return "";
				});
				if (header.length === alignment.length) {
					i += 2;
					const rows = [];
					while (i < lines.length && !isBlank(lines[i]) && lines[i].includes("|") && !interruptsParagraph(lines[i])) {
						rows.push(splitTableRow(lines[i]));
						i++;
					}
					blocks.push({
						type: "table",
						header: header,
						alignment: alignment,
						rows: rows,
					});
					continue;
				}
			}
			match = reReferenceDefinition.exec(line);
			if (match) {
				const label = normalizeLabel(match[1]);
				if (!markdownReferences.has(label)) {
					markdownReferences.set(label, {
						url: match[2].replace(/^<|>$/g, ""),
						title: match[3] ?? match[4] ?? match[5] ?? "",
					});
				}
				i++;
				continue;
			}
			const paragraph = [
				line.replace(/^[ \t]+/, ""),
			];
			i++;
			let setextLevel = 0;
			while (i < lines.length) {
				const next = lines[i];
				if (isBlank(next)) break;
				if (reSetextH1.test(next)) setextLevel = 1;
				else if (reSetextH2.test(next)) setextLevel = 2;
				if (setextLevel) {
					i++;
					break;
				}
				if (interruptsParagraph(next)) break;
				paragraph.push(next.replace(/^[ \t]+/, ""));
				i++;
			}
			blocks.push(
				setextLevel
					? {
							type: "heading",
							level: setextLevel,
							text: paragraph.join("\n"),
						}
					: {
							type: "paragraph",
							text: paragraph.join("\n"),
						},
			);
		}
		return blocks;
	}
	function safeUrl(url) {
		try {
			const parsed = new URL(url.trim());
			return [
				"http:",
				"https:",
				"mailto:",
			].includes(parsed.protocol)
				? parsed.href
				: null;
		} catch {
			return null;
		}
	}
	function appendLink(parent, url, title, renderLabel) {
		const href = safeUrl(url);
		const element = document.createElement(href ? "a" : "span");
		if (href) {
			element.href = href;
			element.target = "_blank";
			element.rel = "noopener noreferrer";
		}
		element.title = title || url;
		renderLabel(element);
		parent.appendChild(element);
	}
	function trimBareUrl(url) {
		let trimmed = url.replace(/[.,;:!?'"*_~]+$/, "");
		while (trimmed.endsWith(")") && (trimmed.match(/\(/g)?.length ?? 0) < (trimmed.match(/\)/g)?.length ?? 0)) {
			trimmed = trimmed.slice(0, -1).replace(/[.,;:!?'"*_~]+$/, "");
		}
		return trimmed;
	}
	function runLength(text, index, char) {
		let end = index;
		while (text[end] === char) end++;
		return end - index;
	}
	function matchLink(text, index) {
		let depth = 0;
		let close = -1;
		for (let i = index; i < text.length; i++) {
			const char = text[i];
			if (char === "\\") {
				i++;
			} else if (char === "`") {
				const ticks = runLength(text, i, "`");
				const end = text.indexOf("`".repeat(ticks), i + ticks);
				if (end !== -1) i = end + ticks - 1;
			} else if (char === "[") {
				depth++;
			} else if (char === "]" && --depth === 0) {
				close = i;
				break;
			}
		}
		if (close === -1) return null;
		const label = text.slice(index + 1, close);
		if (text[close + 1] === "(") {
			let i = close + 2;
			while (text[i] === " " || text[i] === "\n") i++;
			let url = "";
			if (text[i] === "<") {
				const end = text.indexOf(">", i);
				if (end === -1) return null;
				url = text.slice(i + 1, end);
				i = end + 1;
			} else {
				let parens = 0;
				const start = i;
				while (i < text.length && !/\s/.test(text[i])) {
					if (text[i] === "\\") i++;
					else if (text[i] === "(") parens++;
					else if (text[i] === ")" && parens-- === 0) break;
					i++;
				}
				url = text.slice(start, i);
			}
			while (text[i] === " " || text[i] === "\n") i++;
			let title = "";
			const quote = text[i];
			if (quote === '"' || quote === "'" || quote === "(") {
				const end = text.indexOf(quote === "(" ? ")" : quote, i + 1);
				if (end === -1) return null;
				title = text.slice(i + 1, end);
				i = end + 1;
				while (text[i] === " " || text[i] === "\n") i++;
			}
			if (text[i] !== ")") return null;
			return {
				label: label,
				url: url,
				title: title,
				end: i + 1,
			};
		}
		let end = close + 1;
		let reference = label;
		if (text[close + 1] === "[") {
			const refClose = text.indexOf("]", close + 2);
			if (refClose !== -1) {
				if (refClose > close + 2) reference = text.slice(close + 2, refClose);
				end = refClose + 1;
			}
		}
		const definition = markdownReferences.get(normalizeLabel(reference));
		if (!definition) return null;
		return {
			label: label,
			url: definition.url,
			title: definition.title,
			end: end,
		};
	}
	function matchEmphasis(text, index) {
		const char = text[index];
		const run = runLength(text, index, char);
		const after = text[index + run];
		if (after === undefined || /\s/.test(after)) return null;
		if (char === "_" && /[\p{L}\p{N}]/u.test(text[index - 1] ?? "")) return null;
		let widths = [
			1,
		];
		if (char === "~")
			widths =
				run >= 2
					? [
							2,
						]
					: [];
		else if (run >= 2)
			widths = [
				2,
				1,
			];
		for (const width of widths) {
			let j = index + width;
			while (j < text.length) {
				if (text[j] === "\\") {
					j += 2;
					continue;
				}
				if (text[j] !== char) {
					j++;
					continue;
				}
				const closeRun = runLength(text, j, char);
				const closeEnd = j + closeRun;
				const close = closeEnd - width;
				const usable =
					closeRun >= width &&
					close > index + width &&
					!/\s/.test(text[j - 1]) &&
					!(char === "_" && /[\p{L}\p{N}]/u.test(text[closeEnd] ?? ""));
				if (usable) {
					let element = "em";
					if (width === 2) element = char === "~" ? "del" : "strong";
					return {
						element: element,
						inner: text.slice(index + width, close),
						end: close + width,
					};
				}
				j = closeEnd;
			}
		}
		return null;
	}
	function renderInline(text, parent) {
		let buffer = "";
		const flush = () => {
			if (buffer) parent.appendChild(document.createTextNode(buffer));
			buffer = "";
		};
		const appendElement = (tag, inner) => {
			flush();
			const element = document.createElement(tag);
			renderInline(inner, element);
			parent.appendChild(element);
		};
		let i = 0;
		while (i < text.length) {
			const char = text[i];
			if (char === "\\") {
				const next = text[i + 1];
				if (next === "\n") {
					flush();
					parent.appendChild(document.createElement("br"));
					i += 2;
					continue;
				}
				if (next !== undefined && reAsciiPunctuation.test(next)) {
					buffer += next;
					i += 2;
					continue;
				}
			}
			if (char === "\n") {
				const hard = / {2,}$/.test(buffer);
				buffer = buffer.replace(/ +$/, "");
				if (hard) {
					flush();
					parent.appendChild(document.createElement("br"));
				} else {
					buffer += "\n";
				}
				i++;
				continue;
			}
			if (char === "`") {
				const ticks = runLength(text, i, "`");
				let end = text.indexOf("`".repeat(ticks), i + ticks);
				while (end !== -1 && text[end + ticks] === "`") end = text.indexOf("`".repeat(ticks), runLength(text, end, "`") + end);
				if (end === -1) {
					buffer += "`".repeat(ticks);
					i += ticks;
					continue;
				}
				let inner = text.slice(i + ticks, end).replace(/\n/g, " ");
				if (/^ .*[^ ].* $/.test(inner)) inner = inner.slice(1, -1);
				flush();
				const element = document.createElement("code");
				element.textContent = inner;
				parent.appendChild(element);
				i = end + ticks;
				continue;
			}
			if (char === "<") {
				reAutolink.lastIndex = i;
				const match = reAutolink.exec(text);
				if (match) {
					flush();
					appendLink(parent, match[1], "", (element) => {
						element.textContent = match[1];
					});
					i += match[0].length;
					continue;
				}
			}
			if (char === "!" && text[i + 1] === "[") {
				const link = matchLink(text, i + 1);
				if (link) {
					flush();
					appendLink(parent, link.url, link.title, (element) => {
						element.className = "nmx-md-image";
						element.textContent = `Image: ${link.label || link.url}`;
					});
					i = link.end;
					continue;
				}
			}
			if (char === "[") {
				const link = matchLink(text, i);
				if (link) {
					flush();
					appendLink(parent, link.url, link.title, (element) => renderInline(link.label, element));
					i = link.end;
					continue;
				}
			}
			if (char === "*" || char === "_" || char === "~") {
				const emphasis = matchEmphasis(text, i);
				if (emphasis) {
					appendElement(emphasis.element, emphasis.inner);
					i = emphasis.end;
					continue;
				}
				const run = runLength(text, i, char);
				buffer += char.repeat(run);
				i += run;
				continue;
			}
			if ((char === "h" || char === "H") && !/[\p{L}\p{N}]/u.test(text[i - 1] ?? "")) {
				reBareUrl.lastIndex = i;
				const match = reBareUrl.exec(text);
				if (match) {
					const url = trimBareUrl(match[0]);
					flush();
					appendLink(parent, url, "", (element) => {
						element.textContent = url;
					});
					i += url.length;
					continue;
				}
			}
			buffer += char;
			i++;
		}
		flush();
	}
	function renderBlocks(blocks, parent, tight = false) {
		for (const block of blocks) {
			if (block.type === "heading") {
				const element = document.createElement(`h${block.level}`);
				renderInline(block.text, element);
				parent.appendChild(element);
			} else if (block.type === "paragraph") {
				if (tight) {
					renderInline(block.text, parent);
				} else {
					const element = document.createElement("p");
					renderInline(block.text, element);
					parent.appendChild(element);
				}
			} else if (block.type === "code") {
				const pre = document.createElement("pre");
				const element = document.createElement("code");
				const highlightId = fenceLanguages[block.language];
				if (highlightId) element.appendChild(tokenizeHighlight(block.text, highlightId));
				else element.textContent = block.text;
				pre.appendChild(element);
				parent.appendChild(pre);
			} else if (block.type === "rule") {
				parent.appendChild(document.createElement("hr"));
			} else if (block.type === "quote") {
				const element = document.createElement("blockquote");
				renderBlocks(block.children, element);
				parent.appendChild(element);
			} else if (block.type === "list") {
				const element = document.createElement(block.ordered ? "ol" : "ul");
				if (block.ordered && block.start !== 1) element.start = block.start;
				for (const item of block.items) {
					const li = document.createElement("li");
					if (item.checked !== null) {
						li.className = "nmx-md-task";
						const checkbox = document.createElement("input");
						checkbox.type = "checkbox";
						checkbox.checked = item.checked;
						checkbox.disabled = true;
						li.appendChild(checkbox);
					}
					renderBlocks(item.children, li, block.tight);
					element.appendChild(li);
				}
				parent.appendChild(element);
			} else if (block.type === "table") {
				const wrapper = document.createElement("div");
				wrapper.className = "nmx-md-table";
				const table = document.createElement("table");
				const appendRow = (section, cells, cellTag) => {
					const tr = document.createElement("tr");
					block.alignment.forEach((align, column) => {
						const cell = document.createElement(cellTag);
						if (align) cell.style.textAlign = align;
						renderInline(cells[column] ?? "", cell);
						tr.appendChild(cell);
					});
					section.appendChild(tr);
				};
				const head = document.createElement("thead");
				appendRow(head, block.header, "th");
				table.appendChild(head);
				if (block.rows.length > 0) {
					const body = document.createElement("tbody");
					for (const row of block.rows) appendRow(body, row, "td");
					table.appendChild(body);
				}
				wrapper.appendChild(table);
				parent.appendChild(wrapper);
			}
		}
	}
	function renderMarkdown(text) {
		const lines = text
			.replace(/\r\n?/g, "\n")
			.split("\n")
			.map((line) => line.replace(/^\t+/, (tabs) => "    ".repeat(tabs.length)));
		markdownReferences = new Map();
		const fragment = document.createDocumentFragment();
		renderBlocks(parseBlocks(lines), fragment);
		markdownReferences = new Map();
		return fragment;
	}
	function ensureOverlay() {
		if (overlay) return;
		overlay = document.createElement("div");
		overlay.id = idOverlay;
		overlay.classList.add(classNMX);
		const box = document.createElement("div");
		box.id = idBox;
		const title = document.createElement("div");
		title.id = idTitle;
		titleText = document.createElement("span");
		const controls = document.createElement("div");
		controls.id = idControls;
		languageSelect = document.createElement("select");
		languageSelect.id = idLanguageSelect;
		languages.forEach(({ id: id, label: label }) => {
			const option = document.createElement("option");
			option.value = id;
			option.textContent = label;
			languageSelect.appendChild(option);
		});
		languageSelect.value = language;
		languageSelect.addEventListener("change", () => {
			language = languageSelect.value;
			renderContent();
		});
		const closeButton = document.createElement("span");
		closeButton.id = idClose;
		closeButton.textContent = "×";
		closeButton.addEventListener("click", close);
		controls.appendChild(languageSelect);
		controls.appendChild(closeButton);
		title.appendChild(titleText);
		title.appendChild(controls);
		content = document.createElement("pre");
		content.id = idContent;
		code = document.createElement("code");
		content.appendChild(code);
		markdown = document.createElement("div");
		markdown.id = idMarkdown;
		markdown.hidden = true;
		box.appendChild(title);
		box.appendChild(content);
		box.appendChild(markdown);
		overlay.appendChild(box);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) close();
		});
		document.addEventListener("keydown", onKeyDown);
		document.documentElement.appendChild(overlay);
	}
	function showMessage(message) {
		markdown.hidden = true;
		markdown.replaceChildren();
		content.hidden = false;
		code.textContent = message;
	}
	function renderContent() {
		if (rawText === null) return;
		const showMarkdown = language === "markdown";
		content.hidden = showMarkdown;
		markdown.hidden = !showMarkdown;
		if (showMarkdown) {
			code.replaceChildren();
			markdown.replaceChildren(renderMarkdown(rawText));
			markdown.scrollTop = 0;
		} else {
			markdown.replaceChildren();
			if (highlightRules[language]) code.replaceChildren(tokenizeHighlight(rawText, language));
			else code.textContent = rawText;
		}
	}
	async function open(url, filename) {
		ensureOverlay();
		overlay.classList.add(classOpen);
		document.body.classList.add(classBodyLock);
		titleText.textContent = filename ?? "";
		rawText = null;
		showMessage("Loading…");
		const openToken = ++token;
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const text = await response.text();
			if (openToken !== token) return;
			rawText = text;
			renderContent();
		} catch (error) {
			if (openToken !== token) return;
			showMessage(`Failed to load file: ${error.message}`);
		}
	}
	function close() {
		if (!isOpen()) return;
		overlay.classList.remove(classOpen);
		document.body.classList.remove(classBodyLock);
		token++;
	}
	function isOpen() {
		return !!overlay?.classList.contains(classOpen);
	}
	function destroy() {
		document.removeEventListener("keydown", onKeyDown);
		document.body.classList.remove(classBodyLock);
		token++;
		overlay?.remove();
		overlay = undefined;
		titleText = undefined;
		content = undefined;
		code = undefined;
		markdown = undefined;
		languageSelect = undefined;
		rawText = null;
		language = "plain";
	}
	function onKeyDown(e) {
		if (isOpen() && e.key === "Escape") close();
	}
	return {
		open: open,
		close: close,
		isOpen: isOpen,
		destroy: destroy,
	};
}

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
	let watcher = null;
	let imageOverlay;
	let imageOverlayImg;
	let textViewer;
	nmxRegisterToggle("optToggleMyReportsTweaks", {
		cssFiles: [
			"src/shared/text-viewer.css",
			"src/features/my-reports-tweaks/my-reports-tweaks.css",
		],
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		nmxInjectPageScript("src/features/my-reports-tweaks/my-reports-tweaks-inject.js");
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
		textViewer?.destroy();
		textViewer = undefined;
		reportDataById = new Map();
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
		stopObserver();
		watcher = nmxWatchPage(applyReportEnhancements, {
			debounceMs: 200,
			ignorePortalChurn: true,
		});
	}
	function stopObserver() {
		watcher?.stop();
		watcher = null;
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
		const tail = nmxHtmlDecode(rawValue.split("</div>").pop()).trim();
		return tail || null;
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
				else openTextViewer(attachment.url, attachment.fileName);
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
	function openTextViewer(url, filename) {
		textViewer ??= nmxCreateTextViewer();
		textViewer.open(url, filename);
	}
	function overlayKeyHandler(e) {
		if (e.key !== "Escape") return;
		if (imageOverlay?.classList.contains("nmx-mrt-open")) closeImageOverlay();
	}
})();
