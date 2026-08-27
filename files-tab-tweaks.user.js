// ==UserScript==
// @name         Nexus Kit: 📄 Files tab tweaks
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      14.0
// @description  Improved content preview with search, hash comparison, and risk flagging. Show file "names". Add missing file archive button. Add File ID with copy button.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/files-tab-tweaks.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/files-tab-tweaks.user.js
// @run-at       document-idle
// @match         *://*.nexusmods.com/*/mods/*
// @match         *://*.nexusmods.com/mods/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/files-tab-tweaks/files-tab-tweaks.css":
			"LmZpbGUtdHdlYWtzIHsKCWZvbnQtc2l6ZTogMTBweDsKCWZvbnQtd2VpZ2h0OiA0MDA7Cgljb2xvcjogIzk5OTsKCXRleHQtd3JhcC1tb2RlOiB3cmFwOwp9Cgoubm14LWZpbGUtaWQtdGV4dCB7Cglmb250LXNpemU6IDEycHg7Cglmb250LXdlaWdodDogNDAwOwoJY29sb3I6ICNiYmI7Cn0KCi5ubXgtY29weS1maWxlLWlkLWJ0biB7CglkaXNwbGF5OiBpbmxpbmUtZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7Cgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOwoJbWFyZ2luLWxlZnQ6IDAuMjVyZW07CglwYWRkaW5nOiAwOwoJYm9yZGVyOiBub25lOwoJYmFja2dyb3VuZDogbm9uZTsKCWNvbG9yOiAjYmJiOwoJb3BhY2l0eTogMC42OwoJY3Vyc29yOiBwb2ludGVyOwoJdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7CgoJJiBzdmcgewoJCXdpZHRoOiAxNHB4OwoJCWhlaWdodDogMTRweDsKCX0KCgkmOmhvdmVyIHsKCQlvcGFjaXR5OiAxOwoJfQoKCSYuZGlzYWJsZWQgewoJCXBvaW50ZXItZXZlbnRzOiBub25lOwoJfQoKCSYubm14LWNvcHktZmFpbGVkIHsKCQljb2xvcjogI2UzMzsKCX0KfQo=",
		"src/shared/content-preview-modal.css":
			"Cjpob3N0IHsKCWFsbDogaW5pdGlhbDsKfQoKKiB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9Cgoubm14LWZjcC1iYWNrZHJvcCB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl0b3A6IDA7CglsZWZ0OiAwOwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDEwMCU7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpOwoJei1pbmRleDogOTk5OTsKfQoKLm5teC1mY3AtbW9kYWwgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47Cgl3aWR0aDogOTAlOwoJbWF4LXdpZHRoOiA5MDBweDsKCWhlaWdodDogODUlOwoJYmFja2dyb3VuZDogIzFkMWQyMTsKCWNvbG9yOiAjZTRlNGU3OwoJYm9yZGVyOiAxcHggc29saWQgIzcxNzE3YTsKCWJvcmRlci1yYWRpdXM6IDhweDsKCW92ZXJmbG93OiBoaWRkZW47CgkKCWZvbnQtZmFtaWx5OiB1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWYsICJBcHBsZSBDb2xvciBFbW9qaSIsICJTZWdvZSBVSSBFbW9qaSIsICJTZWdvZSBVSSBTeW1ib2wiLCAiTm90byBDb2xvciBFbW9qaSI7Cglmb250LXNpemU6IDE0cHg7CglsaW5lLWhlaWdodDogMS40Owp9Cgoubm14LWZjcC1oZWFkZXIgewoJcG9zaXRpb246IHJlbGF0aXZlOwoJZmxleDogMCAwIGF1dG87CglwYWRkaW5nOiAxMnB4IDU2cHggMTJweCAxNnB4OwoJYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM3MTcxN2E7CgliYWNrZ3JvdW5kOiAjMjkyOTJlOwoJbGluZS1oZWlnaHQ6IDEuMTsKfQoKLm5teC1mY3AtdGl0bGUtcm93IHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOwoJZ2FwOiAxMnB4OwoJbWFyZ2luLWJvdHRvbTogOHB4Owp9Cgoubm14LWZjcC10aXRsZSB7CgltYXJnaW46IDA7Cglmb250LXNpemU6IDIwcHg7Cglmb250LXdlaWdodDogNjAwOwp9Cgoubm14LWZjcC1oYXNoLWFjdGlvbnMgewoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDZweDsKCWZsZXg6IDAgMCBhdXRvOwp9Cgoubm14LWZjcC1oYXNoLWJ0biB7CgliYWNrZ3JvdW5kOiAjM2UzZTQ3OwoJY29sb3I6ICNlNGU0ZTc7Cglib3JkZXI6IDFweCBzb2xpZCAjNzE3MTdhOwoJYm9yZGVyLXJhZGl1czogNHB4OwoJcGFkZGluZzogNHB4IDEwcHg7Cglmb250LXNpemU6IDEycHg7Cglmb250LXdlaWdodDogNjAwOwoJdGV4dC1kZWNvcmF0aW9uOiBub25lOwoJY3Vyc29yOiBwb2ludGVyOwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCgkmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsKCQliYWNrZ3JvdW5kOiAjNTI1MjViOwoJfQoKCSY6ZGlzYWJsZWQgewoJCWN1cnNvcjogZGVmYXVsdDsKCQlvcGFjaXR5OiAwLjY7Cgl9Cn0KCi5ubXgtZmNwLWhhc2gtYnRuLS1yZW1lbWJlcmVkIHsKCWJvcmRlci1jb2xvcjogaHNsKDEyMCwgNDAlLCA0NSUpOwoJY29sb3I6IGhzbCgxMjAsIDYwJSwgNzAlKTsKfQoKLm5teC1mY3AtaGFzaC1idG4tLWdvdG8gewoJcGFkZGluZzogNHB4IDhweDsKCWNvbG9yOiBoc2woMjA3LCA3MCUsIDc1JSk7Cglib3JkZXItY29sb3I6IGhzbCgyMDcsIDQwJSwgNDUlKTsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiBoc2woMjA3LCA0NSUsIDIwJSk7Cgl9Cn0KCi5ubXgtZmNwLWhhc2gtYnRuLS1mb3JnZXQgewoJcGFkZGluZzogNHB4IDhweDsKCWNvbG9yOiBoc2woNDUsIDUwJSwgNzAlKTsKCWJvcmRlci1jb2xvcjogaHNsKDQ1LCAzNSUsIDQwJSk7CgoJJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7CgkJYmFja2dyb3VuZDogaHNsKDQ1LCA0NSUsIDIwJSk7Cgl9Cn0KCi5ubXgtZmNwLWNsb3NlIHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogMHB4OwoJcmlnaHQ6IDhweDsKCWJhY2tncm91bmQ6IG5vbmU7Cglib3JkZXI6IG5vbmU7Cgljb2xvcjogI2U0ZTRlNzsKCWZvbnQtc2l6ZTogMzRweDsKCWxpbmUtaGVpZ2h0OiAxOwoJY3Vyc29yOiBwb2ludGVyOwoKCSY6aG92ZXIgewoJCWNvbG9yOiAjZmFmYWZhOwoJfQp9Cgoubm14LWZjcC1tZXRhIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LXdyYXA6IHdyYXA7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA4cHg7CgltYXJnaW4tYm90dG9tOiA4cHg7Cn0KCi5ubXgtZmNwLXJpc2sgewoJcGFkZGluZzogMnB4IDhweDsKCWJvcmRlci1yYWRpdXM6IDRweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cglmb250LXNpemU6IDExcHg7CglsZXR0ZXItc3BhY2luZzogMC4wNWVtOwp9Cgoubm14LWZjcC1yaXNrLS1oaWdoIHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAxMDAlLCAxMCUpOwoJY29sb3I6IGhzbCgwLCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLXJpc2stLW1lZGl1bSB7CgliYWNrZ3JvdW5kLWNvbG9yOiBoc2woNTUsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDU1LCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLXJpc2stLWxvdyB7CgliYWNrZ3JvdW5kLWNvbG9yOiBoc2woMjA3LCAxMDAlLCAxMCUpOwoJY29sb3I6IGhzbCgyMDcsIDkwJSwgNjUlKTsKfQoKLm5teC1mY3Atcmlzay0tc2FmZSB7CgliYWNrZ3JvdW5kLWNvbG9yOiBoc2woMTIwLCAxMDAlLCAxMCUpOwoJY29sb3I6IGhzbCgxMjAsIDQwJSwgNjUlKTsKfQoKLm5teC1mY3Atcmlzay0tZGVmYXVsdCB7CgliYWNrZ3JvdW5kLWNvbG9yOiAjM2UzZTQ3OwoJY29sb3I6ICNkNGQ0ZDg7Cn0KCi5ubXgtZmNwLWV4dGVuc2lvbnMgewoJZGlzcGxheTogZmxleDsKCWZsZXgtd3JhcDogd3JhcDsKCWdhcDogNnB4Owp9Cgoubm14LWZjcC1leHQgewoJcGFkZGluZzogMXB4IDZweDsKCWJvcmRlci1yYWRpdXM6IDRweDsKCWZvbnQtc2l6ZTogMTFweDsKCWN1cnNvcjogcG9pbnRlcjsKCWJhY2tncm91bmQ6ICMzZTNlNDc7CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZDogIzUyNTI1YjsKCX0KfQoKLm5teC1mY3AtZXh0LS1oaWdoIHsKCWNvbG9yOiBoc2woMCwgMTAwJSwgNzYlKTsKfQoKLm5teC1mY3AtZXh0LS1tZWRpdW0gewoJY29sb3I6IGhzbCg1NSwgOTAlLCA2MCUpOwp9Cgoubm14LWZjcC1leHQtLWxvdyB7Cgljb2xvcjogaHNsKDIwNywgOTAlLCA2NSUpOwp9Cgoubm14LWZjcC1leHQtLXNhZmUgewoJY29sb3I6IGhzbCgxMjAsIDI1JSwgNjUlKTsKfQoKLm5teC1mY3AtZXh0LS1kZWZhdWx0IHsKCWNvbG9yOiAjZDRkNGQ4Owp9Cgoubm14LWZjcC1maWx0ZXIgewoJd2lkdGg6IDEwMCU7CgliYWNrZ3JvdW5kLWNvbG9yOiAjMWQxZDIxOwoJY29sb3I6ICNlNGU0ZTc7Cglib3JkZXI6IDFweCBzb2xpZCAjYTFhMWFhOwoJYm9yZGVyLXJhZGl1czogNHB4OwoJcGFkZGluZzogNnB4IDhweDsKCWZvbnQtc2l6ZTogMTRweDsKfQoKLm5teC1mY3AtdHJlZSB7CglmbGV4OiAxIDEgYXV0bzsKCW92ZXJmbG93LXk6IGF1dG87CglwYWRkaW5nOiA4cHggMDsKCWZvbnQtZmFtaWx5OiBtb25vc3BhY2U7Cglmb250LXNpemU6IDEzcHg7Cn0KCi5ubXgtZmNwLXJvdyB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogNHB4OwoJcGFkZGluZzogMnB4IDhweDsKCXdoaXRlLXNwYWNlOiBub3dyYXA7CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZC1jb2xvcjogIzI5MjkyZTsKCX0KfQoKLm5teC1mY3AtZGlyIHsKCWN1cnNvcjogcG9pbnRlcjsKCXVzZXItc2VsZWN0OiBub25lOwp9Cgoubm14LWZjcC1hcnJvdyB7CglkaXNwbGF5OiBpbmxpbmUtYmxvY2s7Cgl3aWR0aDogMWVtOwoKCSY6OmJlZm9yZSB7CgkJY29udGVudDogIuKWvSI7Cgl9Cn0KCi5ubXgtZmNwLXJvdy5ubXgtZmNwLWNvbGxhcHNlZCA+IC5ubXgtZmNwLWFycm93OjpiZWZvcmUgewoJY29udGVudDogIuKWtyI7Cn0KCi5ubXgtZmNwLW5hbWUgewoJb3ZlcmZsb3c6IGhpZGRlbjsKCXRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOwp9Cgoubm14LWZjcC1uYW1lLS1oaWdoIHsKCWNvbG9yOiBoc2woMCwgOTAlLCA2MCUpOwp9Cgoubm14LWZjcC1uYW1lLS1tZWRpdW0gewoJY29sb3I6IGhzbCg1NSwgOTAlLCA2MCUpOwp9Cgoubm14LWZjcC1uYW1lLS1sb3cgewoJY29sb3I6IGhzbCgyMDcsIDkwJSwgNjUlKTsKfQoKLm5teC1mY3AtbmFtZS0tc2FmZSB7Cgljb2xvcjogaHNsKDEyMCwgMjUlLCA2NSUpOwp9Cgoubm14LWZjcC1uYW1lLS1kZWZhdWx0IHsKCWNvbG9yOiAjZTRlNGU3Owp9CgoKLm5teC1mY3AtbmFtZS5ubXgtZmNwLWhhc2gtLXNoYXJlZCB7Cgljb2xvcjogaHNsKDAsIDkwJSwgNjglKTsKCXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsKCWN1cnNvcjogaGVscDsKfQoKLm5teC1mY3AtbmFtZS5ubXgtZmNwLWhhc2gtLXVuaXF1ZSB7Cgljb2xvcjogaHNsKDE0MCwgNTUlLCA1OCUpOwp9Cgoubm14LWZjcC1zaXplIHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJcGFkZGluZy1sZWZ0OiAxMnB4OwoJY29sb3I6ICNhMWExYWE7CglmbGV4OiAwIDAgYXV0bzsKfQoKCi5ubXgtZmNwLWhhc2gtdG9vbHRpcCB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl6LWluZGV4OiAxMDAwMDsKCWRpc3BsYXk6IG5vbmU7CgltYXgtd2lkdGg6IDU0MHB4OwoJYmFja2dyb3VuZDogIzI5MjkyZTsKCWNvbG9yOiAjZTRlNGU3OwoJYm9yZGVyOiAxcHggc29saWQgIzUyNTI1YjsKCWJvcmRlci1yYWRpdXM6IDZweDsKCXBhZGRpbmc6IDhweCAxMHB4OwoJZm9udC1zaXplOiAxM3B4OwoJZm9udC1mYW1pbHk6IHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgc2Fucy1zZXJpZiwgIkFwcGxlIENvbG9yIEVtb2ppIiwgIlNlZ29lIFVJIEVtb2ppIiwgIlNlZ29lIFVJIFN5bWJvbCIsICJOb3RvIENvbG9yIEVtb2ppIjsKCWxpbmUtaGVpZ2h0OiAxLjU7Cglib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC41KTsKCXBvaW50ZXItZXZlbnRzOiBub25lOwoJd2hpdGUtc3BhY2U6IG5vcm1hbDsKCXdvcmQtYnJlYWs6IGJyZWFrLWFsbDsKfQoKLm5teC1mY3AtaGFzaC10b29sdGlwLXRpdGxlIHsKCWZvbnQtd2VpZ2h0OiA2MDA7CgltYXJnaW4tYm90dG9tOiA0cHg7Cgljb2xvcjogI2ZhZmFmYTsKfQoKLm5teC1mY3AtaGFzaC10b29sdGlwIHVsIHsKCW1hcmdpbjogMDsKCXBhZGRpbmctbGVmdDogMTZweDsKfQoKLm5teC1mY3AtY29udGV4dC1tZW51IHsKCXBvc2l0aW9uOiBmaXhlZDsKCXotaW5kZXg6IDEwMDAwOwoJZGlzcGxheTogbm9uZTsKCW1pbi13aWR0aDogMTYwcHg7CgliYWNrZ3JvdW5kOiAjMjkyOTJlOwoJYm9yZGVyOiAxcHggc29saWQgIzUyNTI1YjsKCWJvcmRlci1yYWRpdXM6IDZweDsKCXBhZGRpbmc6IDRweDsKCWJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjUpOwp9Cgoubm14LWZjcC1jb250ZXh0LW1lbnUtaXRlbSB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogOHB4OwoJd2lkdGg6IDEwMCU7Cgl0ZXh0LWFsaWduOiBsZWZ0OwoJYmFja2dyb3VuZDogbm9uZTsKCWJvcmRlcjogbm9uZTsKCWNvbG9yOiAjZTRlNGU3OwoJZm9udC1zaXplOiAxM3B4OwoJcGFkZGluZzogNnB4IDEwcHg7Cglib3JkZXItcmFkaXVzOiA0cHg7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZDogIzNlM2U0NzsKCX0KfQoKLm5teC1mY3AtY29udGV4dC1tZW51LWljb24gewoJZmxleDogMCAwIGF1dG87CglmaWxsOiBjdXJyZW50Q29sb3I7Cn0KCi5ubXgtZmNwLWNvbnRleHQtbWVudS1kaXZpZGVyIHsKCWhlaWdodDogMXB4OwoJbWFyZ2luOiA0cHggNnB4OwoJYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTsKfQo=",
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
		onEnable?.(true);
	};
	window.browser = {
		runtime: {
			getURL: (relPath) => `data:${mimeFor(relPath)};base64,${requireResource(relPath)}`,
		},
	};
})();

const RISK_TIERS = {
	high: [
		"apk",
		"bat",
		"cmd",
		"cpl",
		"exe",
		"hta",
		"lnk",
		"msi",
		"ps1",
		"sh",
		"url",
	],
	medium: [
		"addon64",
		"asi",
		"bash",
		"cs",
		"csh",
		"dll",
		"gd",
		"gdc",
		"gde",
		"gdscript",
		"html",
		"jar",
		"js",
		"ksh",
		"lua",
		"mods",
		"pl",
		"psm1",
		"py",
		"rb",
		"script",
		"ts4script",
		"vbe",
		"vbs",
		"xpi",
		"zsh",
	],
	low: [
		"7z",
		"bz2",
		"gz",
		"img",
		"iso",
		"pdf",
		"rar",
		"stage",
		"swf",
		"tar",
		"vmz",
		"zip",
	],
	safe: [
		"3g2",
		"3gp",
		"8svx",
		"aa",
		"aac",
		"aax",
		"act",
		"aiff",
		"alac",
		"amr",
		"amv",
		"ape",
		"apng",
		"archive",
		"asf",
		"au",
		"avi",
		"avif",
		"awb",
		"ba2",
		"bank",
		"bgem",
		"bgsm",
		"bik",
		"bk2",
		"bmp",
		"bsa",
		"bsl",
		"bundle",
		"cda",
		"cfg",
		"config",
		"csproj",
		"css",
		"csv",
		"cur",
		"db",
		"db",
		"dds",
		"drc",
		"dss",
		"dvf",
		"esl",
		"esm",
		"esp",
		"f4a ",
		"f4b ",
		"f4p",
		"f4v",
		"fbmod",
		"fbx",
		"flac",
		"flv",
		"fuz",
		"fx",
		"fxp",
		"fxs",
		"fxt",
		"gif",
		"gifv",
		"gsm",
		"hkx",
		"ico",
		"iklax",
		"import",
		"ini",
		"ivs",
		"jfif",
		"jpeg",
		"jpg",
		"json",
		"jsonc",
		"lip",
		"log",
		"m2ts",
		"m2v",
		"m4a",
		"m4b",
		"m4p",
		"m4v",
		"mcmeta",
		"md",
		"metacache",
		"mkv",
		"mmf",
		"mng",
		"mod",
		"mogg",
		"mov",
		"movpkg",
		"mp1",
		"mp2",
		"mp3",
		"mp4",
		"mpc",
		"mpe",
		"mpeg",
		"mpg",
		"mpv",
		"msv",
		"mts",
		"mxf",
		"nif",
		"nmf",
		"nsv",
		"obj",
		"oga",
		"ogg",
		"ogv",
		"opus",
		"otf",
		"ovl",
		"ovs",
		"pabgb",
		"pabgh",
		"pak",
		"pdb",
		"pex",
		"pjp",
		"pjpeg",
		"pk",
		"pkf",
		"png",
		"prefab",
		"psc",
		"qt",
		"ra",
		"reds",
		"rf64",
		"rm",
		"rmvb",
		"roq",
		"sav",
		"seq",
		"setting",
		"sln",
		"srt",
		"store",
		"svg",
		"svi",
		"tga",
		"thumbnail",
		"tif",
		"tiff",
		"tmx",
		"toml",
		"tri",
		"ts",
		"tsv",
		"tta",
		"ttf",
		"ucas",
		"usmap",
		"utoc",
		"viv",
		"vob",
		"voc",
		"vox",
		"wav",
		"webm",
		"webp",
		"wma",
		"wmv",
		"woff",
		"woff2",
		"wv",
		"xaml",
		"xl",
		"xml",
		"xwm",
		"xwma",
		"yaml",
		"ydd",
		"ydr",
		"yft",
		"yld",
		"yml",
		"ymt",
		"ytd",
		"yuv",
	],
};

const FILE_METADATA_BASE = "https://file-metadata.nexusmods.com/file/nexus-files-s3-meta";

const RISK_TIER_SETS = Object.fromEntries(
	Object.entries(RISK_TIERS).map(([tier, exts]) => [
		tier,
		new Set(exts),
	]),
);

let currentModalTree;

let modalKeyHandler;

let modalCssTextPromise;

let filterDebounceTimer;

const FILTER_DEBOUNCE_MS = 150;

const REMEMBERED_STORAGE_KEY = "nmxRememberedFileHashes";

function loadRememberedFileSet() {
	try {
		const raw = localStorage.getItem(REMEMBERED_STORAGE_KEY);
		return raw ? JSON.parse(raw) : undefined;
	} catch {
		return undefined;
	}
}

function getModPageUrl() {
	return document.querySelector('meta[property="og:url"]')?.content || location.href;
}

function saveRememberedFileSet(sourceUrl, hashToPaths) {
	localStorage.setItem(
		REMEMBERED_STORAGE_KEY,
		JSON.stringify({
			sourceUrl: sourceUrl,
			hashToPaths: hashToPaths,
			modPageUrl: getModPageUrl(),
		}),
	);
}

const HASH_TOOLTIP_SHOW_DELAY_MS = 300;

let hashTooltipShowTimer;

let hashTooltipEl;

function loadModalCssText() {
	if (!modalCssTextPromise) {
		modalCssTextPromise = fetch(browser.runtime.getURL("src/shared/content-preview-modal.css")).then((response) =>
			response.text(),
		);
	}
	return modalCssTextPromise;
}

async function nmxOpenContentPreviewModal(url) {
	nmxCloseContentPreviewModal();
	const host = await buildModalShell();
	document.documentElement.appendChild(host);
	const shadowRoot = host.shadowRoot;
	const treeContainer = shadowRoot.querySelector(".nmx-fcp-tree");
	treeContainer.textContent = "Loading…";
	let json;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		json = await response.json();
	} catch (error) {
		treeContainer.textContent = `Failed to load file contents: ${error.message}`;
		return;
	}
	const manifestEntries = Array.isArray(json) ? json : Array.isArray(json.files) ? json.files : undefined;
	const tree = manifestEntries ? buildTreeFromManifest(manifestEntries) : buildTreeFromLegacy(json.children ?? []);
	sortTree(tree);
	renderModalContents(shadowRoot, tree, url);
}

function nmxCloseContentPreviewModal() {
	document.querySelector(".nmx-fcp-overlay")?.remove();
	if (modalKeyHandler) {
		document.removeEventListener("keydown", modalKeyHandler);
		modalKeyHandler = undefined;
	}
	clearTimeout(filterDebounceTimer);
	clearTimeout(hashTooltipShowTimer);
	hashTooltipEl = undefined;
	fileContextMenuEl = undefined;
	currentModalTree = undefined;
}

async function buildModalShell() {
	const host = document.createElement("div");
	host.className = "nmx-fcp-overlay";
	const shadowRoot = host.attachShadow({
		mode: "open",
	});
	const style = document.createElement("style");
	style.textContent = await loadModalCssText();
	shadowRoot.appendChild(style);
	const backdrop = document.createElement("div");
	backdrop.className = "nmx-fcp-backdrop";
	backdrop.addEventListener("click", (e) => {
		if (e.target === backdrop) nmxCloseContentPreviewModal();
	});
	shadowRoot.appendChild(backdrop);
	modalKeyHandler = (e) => {
		if (e.key === "Escape") nmxCloseContentPreviewModal();
	};
	document.addEventListener("keydown", modalKeyHandler);
	const modal = document.createElement("div");
	modal.className = "nmx-fcp-modal";
	backdrop.appendChild(modal);
	const header = document.createElement("div");
	header.className = "nmx-fcp-header";
	modal.appendChild(header);
	const closeBtn = document.createElement("button");
	closeBtn.type = "button";
	closeBtn.className = "nmx-fcp-close";
	closeBtn.title = "Close (Esc)";
	closeBtn.textContent = "×";
	closeBtn.addEventListener("click", nmxCloseContentPreviewModal);
	header.appendChild(closeBtn);
	const titleRow = document.createElement("div");
	titleRow.className = "nmx-fcp-title-row";
	header.appendChild(titleRow);
	const title = document.createElement("h2");
	title.className = "nmx-fcp-title";
	title.textContent = "File Contents";
	titleRow.appendChild(title);
	const hashActions = document.createElement("div");
	hashActions.className = "nmx-fcp-hash-actions";
	titleRow.appendChild(hashActions);
	const rememberBtn = document.createElement("button");
	rememberBtn.type = "button";
	rememberBtn.className = "nmx-fcp-hash-btn nmx-fcp-remember-btn";
	hashActions.appendChild(rememberBtn);
	const compareBtn = document.createElement("button");
	compareBtn.type = "button";
	compareBtn.className = "nmx-fcp-hash-btn nmx-fcp-compare-btn";
	compareBtn.textContent = "Compare";
	compareBtn.hidden = true;
	hashActions.appendChild(compareBtn);
	const goToModBtn = document.createElement("a");
	goToModBtn.className = "nmx-fcp-hash-btn nmx-fcp-hash-btn--goto nmx-fcp-goto-btn";
	goToModBtn.target = "_blank";
	goToModBtn.rel = "noopener noreferrer";
	goToModBtn.title = "View the remembered file's mod page";
	goToModBtn.textContent = "🔗";
	goToModBtn.hidden = true;
	hashActions.appendChild(goToModBtn);
	const forgetBtn = document.createElement("button");
	forgetBtn.type = "button";
	forgetBtn.className = "nmx-fcp-hash-btn nmx-fcp-hash-btn--forget nmx-fcp-forget-btn";
	forgetBtn.title = "Forget the remembered file";
	forgetBtn.textContent = "🧹";
	forgetBtn.hidden = true;
	hashActions.appendChild(forgetBtn);
	const meta = document.createElement("div");
	meta.className = "nmx-fcp-meta";
	header.appendChild(meta);
	const filterInput = document.createElement("input");
	filterInput.type = "text";
	filterInput.className = "nmx-fcp-filter";
	filterInput.placeholder = "Filter files/folders… (wrap in /slashes/ for regex)";
	filterInput.addEventListener("input", () => {
		clearTimeout(filterDebounceTimer);
		filterDebounceTimer = setTimeout(() => applyFilter(filterInput.value), FILTER_DEBOUNCE_MS);
	});
	header.appendChild(filterInput);
	const tree = document.createElement("div");
	tree.className = "nmx-fcp-tree";
	modal.appendChild(tree);
	return host;
}

function renderModalContents(shadowRoot, tree, url) {
	currentModalTree = tree;
	computeNodePaths(tree);
	const meta = shadowRoot.querySelector(".nmx-fcp-meta");
	const filterInput = shadowRoot.querySelector(".nmx-fcp-filter");
	const treeContainer = shadowRoot.querySelector(".nmx-fcp-tree");
	treeContainer.textContent = "";
	const extensions = collectExtensions(tree);
	const { high: high, medium: medium, low: low, safe: safe, default: unclassified } = partitionExtensions(extensions);
	const overallRisk = computeOverallRisk(tree);
	const riskBadge = document.createElement("span");
	riskBadge.className = `nmx-fcp-risk nmx-fcp-risk--${overallRisk}`;
	riskBadge.textContent =
		overallRisk === "safe" ? "SAFE" : overallRisk === "default" ? "UNKNOWN" : `${overallRisk.toUpperCase()} RISK`;
	meta.appendChild(riskBadge);
	const extList = document.createElement("div");
	extList.className = "nmx-fcp-extensions";
	for (const ext of [
		...high,
		...medium,
		...low,
		...safe,
		...unclassified,
	]) {
		const tier = riskTierOf(ext);
		const chip = document.createElement("span");
		chip.className = `nmx-fcp-ext nmx-fcp-ext--${tier}`;
		chip.textContent = `.${ext}`;
		chip.addEventListener("click", () => {
			const chipFilter = `/\\.${escapeRegExp(ext)}$/`;
			filterInput.value = filterInput.value === chipFilter ? "" : chipFilter;
			clearTimeout(filterDebounceTimer);
			applyFilter(filterInput.value);
		});
		extList.appendChild(chip);
	}
	meta.appendChild(extList);
	for (const node of tree) renderNode(node, treeContainer, 0);
	wireHashComparison(shadowRoot, tree, url);
	wireFileContextMenu(shadowRoot, treeContainer);
	applyFilter("");
}

function computeNodePaths(nodes, prefix = "") {
	for (const node of nodes) {
		node.fullPath = prefix ? `${prefix}/${node.name}` : node.name;
		if (node.type === "dir") computeNodePaths(node.children, node.fullPath);
	}
}

function collectFileHashes(nodes) {
	const result = [];
	for (const node of nodes) {
		if (node.type === "dir") {
			result.push(...collectFileHashes(node.children));
		} else if (node.sha256) {
			result.push({
				path: node.fullPath,
				sha256: node.sha256,
				node: node,
			});
		}
	}
	return result;
}

function wireHashComparison(shadowRoot, tree, url) {
	const rememberBtn = shadowRoot.querySelector(".nmx-fcp-remember-btn");
	const compareBtn = shadowRoot.querySelector(".nmx-fcp-compare-btn");
	const goToModBtn = shadowRoot.querySelector(".nmx-fcp-goto-btn");
	const forgetBtn = shadowRoot.querySelector(".nmx-fcp-forget-btn");
	const treeContainer = shadowRoot.querySelector(".nmx-fcp-tree");
	const hashEntries = collectFileHashes(tree);
	const hasHashes = hashEntries.length > 0;
	function refreshButtons() {
		const remembered = loadRememberedFileSet();
		forgetBtn.hidden = !remembered;
		goToModBtn.hidden = !remembered;
		if (remembered) goToModBtn.href = remembered.modPageUrl;
		if (!hasHashes) {
			rememberBtn.textContent = "Not Available for Compare";
			rememberBtn.disabled = true;
			rememberBtn.title = "Legacy file previews don't include file hashes, so there's nothing to compare.";
			compareBtn.hidden = true;
			return;
		}
		const isRemembered = remembered?.sourceUrl === url;
		rememberBtn.textContent = isRemembered ? "Remembered ✓" : "Remember for Compare";
		rememberBtn.disabled = isRemembered;
		rememberBtn.classList.toggle("nmx-fcp-hash-btn--remembered", isRemembered);
		compareBtn.hidden = !remembered || remembered.sourceUrl === url;
	}
	refreshButtons();
	forgetBtn.addEventListener("click", () => {
		localStorage.removeItem(REMEMBERED_STORAGE_KEY);
		clearHashComparison(hashEntries);
		compareBtn.disabled = false;
		compareBtn.textContent = "Compare";
		refreshButtons();
	});
	if (!hasHashes) return;
	rememberBtn.addEventListener("click", () => {
		const hashToPaths = {};
		for (const { path: path, sha256: sha256 } of hashEntries) {
			if (!hashToPaths[sha256]) hashToPaths[sha256] = [];
			hashToPaths[sha256].push(path);
		}
		saveRememberedFileSet(url, hashToPaths);
		clearHashComparison(hashEntries);
		compareBtn.disabled = false;
		compareBtn.textContent = "Compare";
		refreshButtons();
	});
	compareBtn.addEventListener("click", () => {
		applyHashComparison(shadowRoot, treeContainer, hashEntries);
		compareBtn.disabled = true;
		compareBtn.textContent = "Compared ✓";
	});
}

function applyHashComparison(shadowRoot, treeContainer, hashEntries) {
	const remembered = loadRememberedFileSet();
	if (!remembered) return;
	for (const { sha256: sha256, node: node } of hashEntries) {
		const nameEl = node.rowEl?.querySelector(".nmx-fcp-name");
		if (!nameEl) continue;
		const matches = remembered.hashToPaths[sha256];
		if (matches?.length) {
			nameEl.classList.add("nmx-fcp-hash--shared");
			attachHashTooltip(shadowRoot, nameEl, matches);
		} else {
			nameEl.classList.add("nmx-fcp-hash--unique");
		}
	}
	treeContainer.addEventListener("scroll", hideHashTooltip, {
		passive: true,
	});
}

function clearHashComparison(hashEntries) {
	for (const { node: node } of hashEntries) {
		node.rowEl?.querySelector(".nmx-fcp-name")?.classList.remove("nmx-fcp-hash--shared", "nmx-fcp-hash--unique");
	}
	hideHashTooltip();
}

function attachHashTooltip(shadowRoot, nameEl, matchPaths) {
	nameEl.addEventListener("mouseenter", () => {
		if (!nameEl.classList.contains("nmx-fcp-hash--shared")) return;
		clearTimeout(hashTooltipShowTimer);
		hashTooltipShowTimer = setTimeout(() => showHashTooltip(shadowRoot, nameEl, matchPaths), HASH_TOOLTIP_SHOW_DELAY_MS);
	});
	nameEl.addEventListener("mouseleave", hideHashTooltip);
}

function showHashTooltip(shadowRoot, anchor, paths) {
	if (!hashTooltipEl) {
		hashTooltipEl = document.createElement("div");
		hashTooltipEl.className = "nmx-fcp-hash-tooltip";
		hashTooltipEl.setAttribute("role", "tooltip");
		shadowRoot.appendChild(hashTooltipEl);
	}
	hashTooltipEl.textContent = "";
	const title = document.createElement("div");
	title.className = "nmx-fcp-hash-tooltip-title";
	title.textContent = paths.length === 1 ? "Identical to remembered file:" : `Identical to ${paths.length} remembered files:`;
	hashTooltipEl.appendChild(title);
	const list = document.createElement("ul");
	for (const path of paths) {
		const item = document.createElement("li");
		item.textContent = path;
		list.appendChild(item);
	}
	hashTooltipEl.appendChild(list);
	hashTooltipEl.style.display = "block";
	positionHashTooltip(anchor);
}

function positionHashTooltip(anchor) {
	const anchorRect = anchor.getBoundingClientRect();
	const boxRect = hashTooltipEl.getBoundingClientRect();
	const gap = 6;
	const spaceAbove = anchorRect.top;
	const spaceBelow = window.innerHeight - anchorRect.bottom;
	const placeAbove = spaceAbove >= boxRect.height + gap || spaceAbove >= spaceBelow;
	const left = Math.min(Math.max(4, anchorRect.left), window.innerWidth - boxRect.width - 4);
	const top = placeAbove ? anchorRect.top - boxRect.height - gap : anchorRect.bottom + gap;
	hashTooltipEl.style.left = `${left}px`;
	hashTooltipEl.style.top = `${top}px`;
}

function hideHashTooltip() {
	clearTimeout(hashTooltipShowTimer);
	if (hashTooltipEl) hashTooltipEl.style.display = "none";
}

let fileContextMenuEl;

function wireFileContextMenu(shadowRoot, treeContainer) {
	treeContainer.addEventListener("contextmenu", (e) => {
		const row = e.target.closest(".nmx-fcp-row");
		if (!row?.nmxNode) {
			hideFileContextMenu();
			return;
		}
		e.preventDefault();
		showFileContextMenu(shadowRoot, row.nmxNode, e.clientX, e.clientY);
	});
	shadowRoot.addEventListener("click", (e) => {
		if (fileContextMenuEl && !fileContextMenuEl.contains(e.target)) hideFileContextMenu();
	});
	treeContainer.addEventListener("scroll", hideFileContextMenu, {
		passive: true,
	});
}

function showFileContextMenu(shadowRoot, node, x, y) {
	if (!fileContextMenuEl) {
		fileContextMenuEl = document.createElement("div");
		fileContextMenuEl.className = "nmx-fcp-context-menu";
		shadowRoot.appendChild(fileContextMenuEl);
	}
	fileContextMenuEl.textContent = "";
	const items = [
		buildContextMenuItem("Copy Name", () => copyToClipboard(node.name)),
		buildContextMenuItem("Copy Path", () => copyToClipboard(node.fullPath)),
	];
	if (node.sha256) items.push(buildContextMenuItem("Copy Hash", () => copyToClipboard(node.sha256)));
	items.forEach((item, i) => {
		if (i > 0) fileContextMenuEl.appendChild(buildContextMenuDivider());
		fileContextMenuEl.appendChild(item);
	});
	fileContextMenuEl.style.display = "block";
	positionContextMenu(x, y);
}

function buildContextMenuDivider() {
	const divider = document.createElement("div");
	divider.className = "nmx-fcp-context-menu-divider";
	return divider;
}

const SVG_NS = "http://www.w3.org/2000/svg";

const COPY_ICON_PATH =
	"M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z";

function buildContextMenuItem(label, onClick) {
	const item = document.createElement("button");
	item.type = "button";
	item.className = "nmx-fcp-context-menu-item";
	const icon = document.createElementNS(SVG_NS, "svg");
	icon.setAttribute("viewBox", "0 0 24 24");
	icon.setAttribute("width", "14");
	icon.setAttribute("height", "14");
	icon.setAttribute("aria-hidden", "true");
	icon.classList.add("nmx-fcp-context-menu-icon");
	const path = document.createElementNS(SVG_NS, "path");
	path.setAttribute("d", COPY_ICON_PATH);
	icon.appendChild(path);
	item.appendChild(icon);
	const text = document.createElement("span");
	text.textContent = label;
	item.appendChild(text);
	item.addEventListener("click", () => {
		onClick();
		hideFileContextMenu();
	});
	return item;
}

function positionContextMenu(x, y) {
	const boxRect = fileContextMenuEl.getBoundingClientRect();
	const left = Math.min(x, window.innerWidth - boxRect.width - 4);
	const top = Math.min(y, window.innerHeight - boxRect.height - 4);
	fileContextMenuEl.style.left = `${left}px`;
	fileContextMenuEl.style.top = `${top}px`;
}

function hideFileContextMenu() {
	if (fileContextMenuEl) fileContextMenuEl.style.display = "none";
}

function copyToClipboard(text) {
	if (!text) return;
	navigator.clipboard.writeText(text).catch((error) => {
		console.error("[Nexus Kit] Failed to copy to clipboard:", error);
	});
}

function renderNode(node, container, depth) {
	const row = document.createElement("div");
	row.className = `nmx-fcp-row nmx-fcp-${node.type}`;
	const dep = node.type === "dir" ? depth : depth + 1;
	if (node.type === "file") depth++;
	row.style.paddingLeft = `${dep * 18 + 8}px`;
	node.rowEl = row;
	row.nmxNode = node;
	if (node.type === "dir") {
		const arrow = document.createElement("span");
		arrow.className = "nmx-fcp-arrow";
		row.appendChild(arrow);
	}
	const icon = document.createElement("span");
	icon.className = "nmx-fcp-icon";
	icon.textContent = node.type === "dir" ? "📁" : "📄";
	row.appendChild(icon);
	const name = document.createElement("span");
	name.className = "nmx-fcp-name";
	name.textContent = node.hashVerifiedSafe ? `✅ ${node.name}` : node.name;
	if (node.type === "file") {
		const tier = riskTierOfNode(node);
		name.classList.add(`nmx-fcp-name--${tier}`);
	}
	row.appendChild(name);
	container.appendChild(row);
	if (node.type === "file") {
		const size = document.createElement("span");
		size.className = "nmx-fcp-size";
		size.textContent = node.sizeText;
		row.appendChild(size);
		return;
	}
	const childrenEl = document.createElement("div");
	childrenEl.className = "nmx-fcp-children";
	node.childrenEl = childrenEl;
	row.addEventListener("click", () => {
		node.collapsed = !node.collapsed;
		const filterInput = row.getRootNode().querySelector(".nmx-fcp-filter");
		applyFilter(filterInput?.value ?? "");
	});
	container.appendChild(childrenEl);
	for (const child of node.children) renderNode(child, childrenEl, depth + 1);
}

function applyFilter(filterValue) {
	if (!currentModalTree) return;
	const filtering = filterValue.trim() !== "";
	const test = buildTestFn(filterValue);
	function walk(nodes) {
		let anyVisible = false;
		for (const node of nodes) {
			const selfMatch = filtering ? test(node.name) : true;
			const childVisible = node.type === "dir" ? walk(node.children) : false;
			const visible = filtering ? selfMatch || childVisible : true;
			node.rowEl.style.display = visible ? "" : "none";
			if (node.type === "dir") {
				const childrenShown = filtering ? visible : !node.collapsed;
				node.childrenEl.style.display = childrenShown ? "" : "none";
				node.rowEl.classList.toggle("nmx-fcp-collapsed", !childrenShown);
			}
			if (visible) anyVisible = true;
		}
		return anyVisible;
	}
	walk(currentModalTree);
}

function buildTestFn(value) {
	const trimmed = value.trim();
	const regexMatch = trimmed.match(/^\/(.*)\/$/);
	if (regexMatch) {
		try {
			const re = new RegExp(regexMatch[1], "i");
			return (name) => re.test(name);
		} catch {
			return () => false;
		}
	}
	const needle = trimmed.toLowerCase();
	return (name) => name.toLowerCase().includes(needle);
}

function escapeRegExp(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildTreeFromLegacy(children) {
	return children.map((node) => {
		if (node.type === "directory") {
			return {
				name: node.name,
				type: "dir",
				children: buildTreeFromLegacy(node.children ?? []),
			};
		}
		return {
			name: node.name,
			type: "file",
			sizeText: node.size,
		};
	});
}

function buildTreeFromManifest(entries) {
	const root = [];
	for (const entry of entries) {
		const parts = entry.file_path.split("/").filter(Boolean);
		const sha256 = entry.file_hashes?.SHA256?.toLowerCase();
		insertManifestPath(root, parts, entry.file_size, sha256);
	}
	return root;
}

const manifestDirIndexes = new WeakMap();

function insertManifestPath(children, parts, fileSize, sha256) {
	const [head, ...rest] = parts;
	if (rest.length === 0) {
		children.push({
			name: head,
			type: "file",
			sizeText: formatBytes(fileSize),
			sha256: sha256,
		});
		return;
	}
	let dirIndex = manifestDirIndexes.get(children);
	if (!dirIndex) {
		dirIndex = new Map();
		manifestDirIndexes.set(children, dirIndex);
	}
	let dir = dirIndex.get(head);
	if (!dir) {
		dir = {
			name: head,
			type: "dir",
			children: [],
		};
		dirIndex.set(head, dir);
		children.push(dir);
	}
	insertManifestPath(dir.children, rest, fileSize, sha256);
}

function formatBytes(bytes) {
	const units = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB",
	];
	let value = bytes;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex++;
	}
	return `${value.toFixed(1)} ${units[unitIndex]}`;
}

function sortTree(nodes) {
	nodes.sort((a, b) => {
		if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
		return a.name.localeCompare(b.name);
	});
	for (const node of nodes) {
		if (node.type === "dir") sortTree(node.children);
	}
}

function getExtension(name) {
	const idx = name.lastIndexOf(".");
	if (idx <= 0) return null;
	return name.slice(idx + 1).toLowerCase();
}

function collectExtensions(nodes, set = new Set()) {
	for (const node of nodes) {
		if (node.type === "dir") collectExtensions(node.children, set);
		else {
			const ext = getExtension(node.name);
			if (ext) set.add(ext);
		}
	}
	return set;
}

function riskTierOf(ext) {
	for (const [tier, exts] of Object.entries(RISK_TIER_SETS)) {
		if (exts.has(ext)) return tier;
	}
	return "default";
}

function riskTierOfNode(node) {
	if (node.hashVerifiedSafe) return "safe";
	return riskTierOf(getExtension(node.name));
}

function partitionExtensions(extensions) {
	const buckets = {
		default: [],
	};
	for (const tier of Object.keys(RISK_TIER_SETS)) buckets[tier] = [];
	for (const ext of extensions) buckets[riskTierOf(ext)].push(ext);
	for (const tier of Object.values(buckets)) tier.sort();
	return buckets;
}

function computeOverallRisk(tree) {
	const seen = new Set();
	function walk(nodes) {
		for (const node of nodes) {
			if (node.type === "dir") {
				walk(node.children);
				continue;
			}
			seen.add(riskTierOfNode(node));
		}
	}
	walk(tree);
	if (seen.has("high")) return "high";
	if (seen.has("medium")) return "medium";
	if (seen.has("low")) return "low";
	if (seen.has("safe") && !seen.has("default")) return "safe";
	return "default";
}

(() => {
	const tweaksClass = "file-tweaks";
	const copyIdBtnClass = "nmx-copy-file-id-btn";
	let tabObserver;
	const SVG_NS = "http://www.w3.org/2000/svg";
	const pathCopy =
		"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
	const pathCopied = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";
	function createIconSpan(pathData) {
		const span = document.createElement("span");
		span.className = "flex items-center";
		const svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("role", "presentation");
		svg.setAttribute("class", "shrink-0 size-4");
		const path = document.createElementNS(SVG_NS, "path");
		path.setAttribute("d", pathData);
		path.setAttribute("style", "fill:currentColor");
		svg.appendChild(path);
		span.appendChild(svg);
		return span;
	}
	nmxRegisterToggle("optToggleFilesTabTweaks", {
		cssFiles: [
			"src/features/files-tab-tweaks/files-tab-tweaks.css",
		],
		onEnable: injectJS,
		onDisable: removeJS,
	});
	function injectJS() {
		document.querySelectorAll(`.${tweaksClass}`).forEach((e) => {
			e.remove();
		});
		nmxCloseContentPreviewModal();
		document.addEventListener("click", interceptPreviewClick, true);
		if (document.getElementById("mod_files")) checkTabContent();
		observerStart();
	}
	function removeJS() {
		observerStop();
		document.removeEventListener("click", interceptPreviewClick, true);
		nmxCloseContentPreviewModal();
		document.querySelectorAll(`.${tweaksClass}`).forEach((e) => {
			e.remove();
		});
	}
	function observerStart() {
		observerStop();
		const targetNodeTab = document.querySelector("div.tabcontent");
		if (!targetNodeTab) return;
		window.addEventListener("unload", observerStop);
		tabObserver = new MutationObserver(callbackTab);
		tabObserver.observe(targetNodeTab, {
			attributes: false,
			childList: true,
			subtree: false,
		});
	}
	function observerStop() {
		window.removeEventListener("unload", observerStop);
		if (tabObserver) {
			tabObserver.disconnect();
			tabObserver = null;
		}
	}
	function callbackTab(mutationList, _observer) {
		for (const mutation of mutationList) {
			if (mutation.type !== "childList") continue;
			if (mutation.addedNodes.length !== 0) {
				for (const node of mutation.addedNodes) {
					if (node.nodeType !== Node.ELEMENT_NODE) continue;
					if (node.id !== "mod_files") continue;
					checkTabContent();
					return;
				}
			}
		}
	}
	function checkTabContent() {
		const files_container = document.getElementById("mod_files");
		if (files_container === null) return;
		addFileNames(files_container);
		addFileIdButtons(files_container);
		addArchiveButton();
	}
	function addFileNames(files_container) {
		files_container.querySelectorAll(".add-to-upload-queue").forEach((e) => {
			const fileTitle = files_container.querySelector(`dt[data-id="${e.dataset.id}"] > div > p`);
			const span = document.createElement("span");
			span.className = tweaksClass;
			span.innerText = e.dataset.uri;
			fileTitle.parentNode.parentNode.insertBefore(span, fileTitle.parentNode.parentNode.firstChild);
		});
	}
	function addFileIdButtons(files_container) {
		files_container.querySelectorAll(".inline-flex.actions").forEach((actions) => {
			const fileId = actions.closest("dd[data-id]")?.dataset.id;
			if (!fileId) return;
			const span = document.createElement("span");
			span.className = tweaksClass;
			const idText = document.createElement("span");
			idText.className = "nmx-file-id-text";
			idText.innerText = `File ID: ${fileId}`;
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = copyIdBtnClass;
			btn.title = `Copy file ID (${fileId})`;
			btn.dataset.fileId = fileId;
			btn.replaceChildren(createIconSpan(pathCopy));
			btn.addEventListener("click", copyFileId);
			span.append(idText, btn);
			actions.append(span);
		});
	}
	function copyFileId() {
		if (this.classList.contains("disabled")) return;
		const fileId = this.dataset.fileId;
		navigator.clipboard
			.writeText(fileId)
			.then(() => {
				this.classList.add("disabled");
				this.replaceChildren(createIconSpan(pathCopied));
				setTimeout(() => {
					this.replaceChildren(createIconSpan(pathCopy));
					this.classList.remove("disabled");
				}, 1500);
			})
			.catch((error) => {
				console.error(error.message);
				this.classList.add("disabled", "nmx-copy-failed");
				setTimeout(() => {
					this.classList.remove("disabled", "nmx-copy-failed");
				}, 1500);
			});
	}
	function addArchiveButton() {
		const files_footer = document.getElementById("files-tab-footer");
		if (!files_footer) return;
		if (files_footer.querySelector("& > a")) return;
		const span = document.createElement("span");
		span.className = "flex-label";
		span.innerText = "File archive";
		const a = document.createElement("a");
		a.className = `${tweaksClass} btn inline-flex`;
		a.href = `${document.querySelector('meta[property="og:url"]').content}?tab=files&category=archived`;
		a.appendChild(span);
		files_footer.insertBefore(a, files_footer.firstChild);
	}
	const FILE_METADATA_BASE = "https://file-metadata.nexusmods.com/file/nexus-files-s3-meta";
	function interceptPreviewClick(event) {
		const btn = event.target.closest(".btn-ajax-content-preview, .btn-ajax-manifest");
		if (!btn) return;
		event.preventDefault();
		event.stopImmediatePropagation();
		nmxOpenContentPreviewModal(getPreviewURL(btn));
	}
	function getPreviewURL(btn) {
		if (btn.classList.contains("btn-ajax-manifest")) {
			return btn.dataset.manifestUri;
		}
		const { gid: gid, mid: mid, url: url } = btn.dataset;
		return `${FILE_METADATA_BASE}/${gid}/${mid}/${encodeURIComponent(url)}.json`;
	}
})();
