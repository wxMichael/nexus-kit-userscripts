// ==UserScript==
// @name         Nexus Kit: 🖼 Mod Edit: Image viewer
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      15.0
// @description  Click an image thumbnail on a mod's Media edit tab to open a full-screen viewer with keyboard/scroll navigation and per-image menu actions built in.
// @author       wxMichael
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-media.user.js
// @downloadURL  https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-media.user.js
// @run-at       document-start
// @match         *://*.nexusmods.com/*/mods/*/edit/*
// @match         *://*.nexusmods.com/mods/*/edit/*
// @grant         GM_addStyle
// ==/UserScript==

(() => {
	const RESOURCES = {
		"src/features/mod-edit-media/mod-edit-media.css":
			"I25teC1tZWRpYS12aWV3ZXIgewoJcG9zaXRpb246IGZpeGVkOwoJaW5zZXQ6IDA7CglkaXNwbGF5OiBub25lOwoJZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKCWdhcDogMTBweDsKCXBhZGRpbmc6IDEwcHggMDsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7CgliYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOTIpOwoJei1pbmRleDogMjE0NzQ4MzAwMDsKCgkmLm5teC1vcGVuOm5vdCgubm14LXBhdXNlZCkgewoJCWRpc3BsYXk6IGZsZXg7Cgl9Cn0KCmJvZHkubm14LW1lZGlhLXZpZXdlci1sb2NrZWQgewoJb3ZlcmZsb3c6IGhpZGRlbjsKfQoKCmh0bWwubm14LW1lZGlhLXZpZXdlci1wZWVraW5nIFtyb2xlPSJtZW51Il0gewoJdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7Cglwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50Owp9Cgojbm14LW1lZGlhLXZpZXdlci10b3BiYXIgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDAgMCBhdXRvOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCWdhcDogMTBweDsKCXBhZGRpbmc6IDAgMjBweDsKCWNvbG9yOiB3aGl0ZTsKfQoKI25teC1tZWRpYS12aWV3ZXItbGFiZWwtZ3JvdXAgewoJZGlzcGxheTogZmxleDsKCW1pbi13aWR0aDogMDsKCWFsaWduLWl0ZW1zOiBiYXNlbGluZTsKCWdhcDogMTBweDsKfQoKI25teC1tZWRpYS12aWV3ZXItc2VjdGlvbi1sYWJlbCB7CglvdmVyZmxvdzogaGlkZGVuOwoJZm9udC1zaXplOiAxOHB4OwoJZm9udC13ZWlnaHQ6IDYwMDsKCXdoaXRlLXNwYWNlOiBub3dyYXA7Cgl0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsKfQoKI25teC1tZWRpYS12aWV3ZXItcG9zaXRpb24gewoJZm9udC1zaXplOiAxM3B4OwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCW9wYWNpdHk6IDAuNzsKfQoKI25teC1tZWRpYS12aWV3ZXItdG9wLWFjdGlvbnMgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDAgMCBhdXRvOwoJZ2FwOiA4cHg7Cn0KCi5ubXgtbWVkaWEtdmlld2VyLWljb24tYnRuIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7Cgl3aWR0aDogMzZweDsKCWhlaWdodDogMzZweDsKCWJvcmRlcjogbm9uZTsKCWJvcmRlci1yYWRpdXM6IDk5OXB4OwoJYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTsKCWNvbG9yOiB3aGl0ZTsKCWN1cnNvcjogcG9pbnRlcjsKCXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTsKCgkmID4gc3ZnIHsKCQl3aWR0aDogMjBweDsKCQloZWlnaHQ6IDIwcHg7CgkJZmlsbDogY3VycmVudGNvbG9yOwoJfQoKCSY6aG92ZXIgewoJCWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xOCk7Cgl9Cn0KCiNubXgtbWVkaWEtdmlld2VyLXRodW1iLWJhciB7CglkaXNwbGF5OiBmbGV4OwoJZmxleDogMCAwIGF1dG87CglnYXA6IDE0cHg7CglvdmVyZmxvdy14OiBhdXRvOwoJb3ZlcmZsb3cteTogaGlkZGVuOwoJcGFkZGluZzogNHB4IDIwcHggMTBweDsKCWJveC1zaXppbmc6IGJvcmRlci1ib3g7Cn0KCi5ubXgtbWVkaWEtdmlld2VyLXRodW1iLWdyb3VwIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDZweDsKCXBhZGRpbmctcmlnaHQ6IDE0cHg7Cglib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTgpOwoKCSY6bGFzdC1jaGlsZCB7CgkJcGFkZGluZy1yaWdodDogMDsKCQlib3JkZXItcmlnaHQ6IG5vbmU7Cgl9Cn0KCi5ubXgtbWVkaWEtdmlld2VyLXRodW1iLWdyb3VwLWxhYmVsIHsKCW92ZXJmbG93OiBoaWRkZW47CgltYXgtd2lkdGg6IDIyMHB4OwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCXRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzOwoJdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKCWZvbnQtc2l6ZTogMTFweDsKCWxldHRlci1zcGFjaW5nOiAwLjA2ZW07Cgljb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjU1KTsKfQoKLm5teC1tZWRpYS12aWV3ZXItdGh1bWItZ3JvdXAtaXRlbXMgewoJZGlzcGxheTogZmxleDsKCWdhcDogNnB4Owp9Cgoubm14LW1lZGlhLXZpZXdlci10aHVtYm5haWwgewoJcG9zaXRpb246IHJlbGF0aXZlOwoJZmxleDogMCAwIGF1dG87CgloZWlnaHQ6IDU2cHg7Cgl3aWR0aDogNTZweDsKCXBhZGRpbmc6IDA7CglvdmVyZmxvdzogaGlkZGVuOwoJYm9yZGVyOiAycHggc29saWQgdmFyKC0tY29sb3Itb3JhbmdlLTkwMCk7Cglib3JkZXItcmFkaXVzOiA0cHg7CgliYWNrZ3JvdW5kOiBibGFjazsKCWN1cnNvcjogcG9pbnRlcjsKCW9wYWNpdHk6IDAuNTU7Cgl0cmFuc2l0aW9uOgoJCW9wYWNpdHkgMC4ycywKCQlib3JkZXItY29sb3IgMC4yczsKCgkmID4gaW1nIHsKCQloZWlnaHQ6IDEwMCU7CgkJd2lkdGg6IDEwMCU7CgkJb2JqZWN0LWZpdDogY292ZXI7Cgl9CgoJJjpob3ZlciB7CgkJb3BhY2l0eTogMC44NTsKCX0KCgkmLm5teC1jdXJyZW50IHsKCQlib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLW9yYW5nZS01MDApOwoJCW9wYWNpdHk6IDE7Cgl9CgoJJi5ubXgtbWVkaWEtdmlld2VyLXRodW1ibmFpbC0tY292ZXI6OmFmdGVyIHsKCQljb250ZW50OiAi4piFIjsKCQlwb3NpdGlvbjogYWJzb2x1dGU7CgkJcmlnaHQ6IDJweDsKCQlib3R0b206IDFweDsKCQlmb250LXNpemU6IDEwcHg7CgkJY29sb3I6IGdvbGQ7CgkJdGV4dC1zaGFkb3c6IDAgMCAycHggYmxhY2s7Cgl9Cn0KCiNubXgtbWVkaWEtdmlld2VyLWltYWdlIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAxIDEgYXV0bzsKCW1pbi1oZWlnaHQ6IDA7CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CgljdXJzb3I6IGRlZmF1bHQ7CgoJJiA+IGltZyB7CgkJbWF4LWhlaWdodDogMTAwJTsKCQltYXgtd2lkdGg6IDkwJTsKCQlib3JkZXItcmFkaXVzOiA2cHg7CgkJcG9pbnRlci1ldmVudHM6IG5vbmU7CgkJdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2U7Cgl9Cn0KCiNubXgtbWVkaWEtdmlld2VyLWNvbnRyb2xzIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWZsZXgtd3JhcDogd3JhcDsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJZ2FwOiA4cHg7CglwYWRkaW5nOiAwIDIwcHg7Cn0KCi5ubXgtbWVkaWEtdmlld2VyLWNvbnRyb2wgewoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDZweDsKCXBhZGRpbmc6IDhweCAxNHB4OwoJYm9yZGVyOiBub25lOwoJYm9yZGVyLXJhZGl1czogNnB4OwoJYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpOwoJY29sb3I6IHdoaXRlOwoJY3Vyc29yOiBwb2ludGVyOwoJZm9udC1zaXplOiAxM3B4OwoJdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlOwoKCSYgPiBzdmcgewoJCWhlaWdodDogMTZweDsKCQl3aWR0aDogMTZweDsKCQlmaWxsOiBjdXJyZW50Y29sb3I7Cgl9CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpOwoJfQoKCSYubm14LWRpc2FibGVkIHsKCQljdXJzb3I6IG5vdC1hbGxvd2VkOwoJCW9wYWNpdHk6IDAuMzU7CgkJcG9pbnRlci1ldmVudHM6IG5vbmU7Cgl9Cn0KCi5ubXgtbWVkaWEtdmlld2VyLWFycm93IHsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogNTAlOwoJY29sb3I6IHdoaXRlOwoJY3Vyc29yOiBwb2ludGVyOwoJZm9udC1zaXplOiA0OHB4OwoJbGluZS1oZWlnaHQ6IDE7CglvcGFjaXR5OiAwLjc7Cgl0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7Cgl0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMTVzIGVhc2U7Cgl1c2VyLXNlbGVjdDogbm9uZTsKCgkmOmhvdmVyIHsKCQlvcGFjaXR5OiAxOwoJfQoKCSYubm14LWxlZnQtYXJyb3cgewoJCWxlZnQ6IDE1cHg7Cgl9CgoJJi5ubXgtcmlnaHQtYXJyb3cgewoJCXJpZ2h0OiAxNXB4OwoJfQp9Cgoubm14LXRyYW5zcGFyZW50IHsKCW9wYWNpdHk6IDA7Cn0KCi5ubXgtaGlnaGxpZ2h0IHsKCW91dGxpbmU6IDNweCBzb2xpZCB2YXIoLS1jb2xvci1vcmFuZ2UtNTAwKTsKCW91dGxpbmUtb2Zmc2V0OiAzcHg7Cn0K",
		"src/shared/content-preview-modal.css":
			"Cjpob3N0IHsKCWFsbDogaW5pdGlhbDsKfQoKKiB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9Cgoubm14LWZjcC1iYWNrZHJvcCB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl0b3A6IDA7CglsZWZ0OiAwOwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDEwMCU7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpOwoJei1pbmRleDogOTk5OTsKfQoKLm5teC1mY3AtbW9kYWwgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47Cgl3aWR0aDogOTAlOwoJbWF4LXdpZHRoOiA5MDBweDsKCWhlaWdodDogODUlOwoJYmFja2dyb3VuZDogIzFkMWQyMTsKCWNvbG9yOiAjZTRlNGU3OwoJYm9yZGVyOiAxcHggc29saWQgIzcxNzE3YTsKCWJvcmRlci1yYWRpdXM6IDhweDsKCW92ZXJmbG93OiBoaWRkZW47CgoJZm9udC1mYW1pbHk6IHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgc2Fucy1zZXJpZiwgIkFwcGxlIENvbG9yIEVtb2ppIiwgIlNlZ29lIFVJIEVtb2ppIiwgIlNlZ29lIFVJIFN5bWJvbCIsICJOb3RvIENvbG9yIEVtb2ppIjsKCWZvbnQtc2l6ZTogMTRweDsKCWxpbmUtaGVpZ2h0OiAxLjQ7Cn0KCi5ubXgtZmNwLWhlYWRlciB7Cglwb3NpdGlvbjogcmVsYXRpdmU7CglmbGV4OiAwIDAgYXV0bzsKCXBhZGRpbmc6IDEycHggNTZweCAxMnB4IDE2cHg7Cglib3JkZXItYm90dG9tOiAxcHggc29saWQgIzcxNzE3YTsKCWJhY2tncm91bmQ6ICMyOTI5MmU7CglsaW5lLWhlaWdodDogMS4xOwp9Cgoubm14LWZjcC10aXRsZS1yb3cgewoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CglnYXA6IDEycHg7CgltYXJnaW4tYm90dG9tOiA4cHg7Cn0KCi5ubXgtZmNwLXRpdGxlIHsKCW1hcmdpbjogMDsKCWZvbnQtc2l6ZTogMjBweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cn0KCi5ubXgtZmNwLWhhc2gtYWN0aW9ucyB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogNnB4OwoJZmxleDogMCAwIGF1dG87Cn0KCi5ubXgtZmNwLWhhc2gtYnRuIHsKCWJhY2tncm91bmQ6ICMzZTNlNDc7Cgljb2xvcjogI2U0ZTRlNzsKCWJvcmRlcjogMXB4IHNvbGlkICM3MTcxN2E7Cglib3JkZXItcmFkaXVzOiA0cHg7CglwYWRkaW5nOiA0cHggMTBweDsKCWZvbnQtc2l6ZTogMTJweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmU7CgljdXJzb3I6IHBvaW50ZXI7Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoKCSY6aG92ZXI6bm90KDpkaXNhYmxlZCkgewoJCWJhY2tncm91bmQ6ICM1MjUyNWI7Cgl9CgoJJjpkaXNhYmxlZCB7CgkJY3Vyc29yOiBkZWZhdWx0OwoJCW9wYWNpdHk6IDAuNjsKCX0KfQoKLm5teC1mY3AtaGFzaC1idG4tLXJlbWVtYmVyZWQgewoJYm9yZGVyLWNvbG9yOiBoc2woMTIwLCA0MCUsIDQ1JSk7Cgljb2xvcjogaHNsKDEyMCwgNjAlLCA3MCUpOwp9Cgoubm14LWZjcC1oYXNoLWJ0bi0tZ290byB7CglwYWRkaW5nOiA0cHggOHB4OwoJY29sb3I6IGhzbCgyMDcsIDcwJSwgNzUlKTsKCWJvcmRlci1jb2xvcjogaHNsKDIwNywgNDAlLCA0NSUpOwoKCSY6aG92ZXIgewoJCWJhY2tncm91bmQ6IGhzbCgyMDcsIDQ1JSwgMjAlKTsKCX0KfQoKLm5teC1mY3AtaGFzaC1idG4tLWZvcmdldCB7CglwYWRkaW5nOiA0cHggOHB4OwoJY29sb3I6IGhzbCg0NSwgNTAlLCA3MCUpOwoJYm9yZGVyLWNvbG9yOiBoc2woNDUsIDM1JSwgNDAlKTsKCgkmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsKCQliYWNrZ3JvdW5kOiBoc2woNDUsIDQ1JSwgMjAlKTsKCX0KfQoKLm5teC1mY3AtY2xvc2UgewoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiAwcHg7CglyaWdodDogOHB4OwoJYmFja2dyb3VuZDogbm9uZTsKCWJvcmRlcjogbm9uZTsKCWNvbG9yOiAjZTRlNGU3OwoJZm9udC1zaXplOiAzNHB4OwoJbGluZS1oZWlnaHQ6IDE7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3ZlciB7CgkJY29sb3I6ICNmYWZhZmE7Cgl9Cn0KCi5ubXgtZmNwLW1ldGEgewoJZGlzcGxheTogZmxleDsKCWZsZXgtd3JhcDogd3JhcDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDhweDsKCW1hcmdpbi1ib3R0b206IDhweDsKfQoKLm5teC1mY3AtcmlzayB7CglwYWRkaW5nOiAycHggOHB4OwoJYm9yZGVyLXJhZGl1czogNHB4OwoJZm9udC13ZWlnaHQ6IDYwMDsKCWZvbnQtc2l6ZTogMTFweDsKCWxldHRlci1zcGFjaW5nOiAwLjA1ZW07Cn0KCi5ubXgtZmNwLXJpc2stLWhpZ2ggewoJYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDAsIDkwJSwgNjAlKTsKfQoKLm5teC1mY3Atcmlzay0tbWVkaXVtIHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCg1NSwgMTAwJSwgMTAlKTsKCWNvbG9yOiBoc2woNTUsIDkwJSwgNjAlKTsKfQoKLm5teC1mY3Atcmlzay0tbG93IHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgyMDcsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDIwNywgOTAlLCA2NSUpOwp9Cgoubm14LWZjcC1yaXNrLS1zYWZlIHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgxMjAsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDEyMCwgNDAlLCA2NSUpOwp9Cgoubm14LWZjcC1yaXNrLS1kZWZhdWx0IHsKCWJhY2tncm91bmQtY29sb3I6ICMzZTNlNDc7Cgljb2xvcjogI2Q0ZDRkODsKfQoKLm5teC1mY3AtZXh0ZW5zaW9ucyB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJZ2FwOiA2cHg7Cn0KCi5ubXgtZmNwLWV4dCB7CglwYWRkaW5nOiAxcHggNnB4OwoJYm9yZGVyLXJhZGl1czogNHB4OwoJZm9udC1zaXplOiAxMXB4OwoJY3Vyc29yOiBwb2ludGVyOwoJYmFja2dyb3VuZDogIzNlM2U0NzsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiAjNTI1MjViOwoJfQp9Cgoubm14LWZjcC1leHQtLWhpZ2ggewoJY29sb3I6IGhzbCgwLCAxMDAlLCA3NiUpOwp9Cgoubm14LWZjcC1leHQtLW1lZGl1bSB7Cgljb2xvcjogaHNsKDU1LCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLWV4dC0tbG93IHsKCWNvbG9yOiBoc2woMjA3LCA5MCUsIDY1JSk7Cn0KCi5ubXgtZmNwLWV4dC0tc2FmZSB7Cgljb2xvcjogaHNsKDEyMCwgMjUlLCA2NSUpOwp9Cgoubm14LWZjcC1leHQtLWRlZmF1bHQgewoJY29sb3I6ICNkNGQ0ZDg7Cn0KCi5ubXgtZmNwLWZpbHRlciB7Cgl3aWR0aDogMTAwJTsKCWJhY2tncm91bmQtY29sb3I6ICMxZDFkMjE7Cgljb2xvcjogI2U0ZTRlNzsKCWJvcmRlcjogMXB4IHNvbGlkICNhMWExYWE7Cglib3JkZXItcmFkaXVzOiA0cHg7CglwYWRkaW5nOiA2cHggOHB4OwoJZm9udC1zaXplOiAxNHB4Owp9Cgoubm14LWZjcC10cmVlIHsKCWZsZXg6IDEgMSBhdXRvOwoJb3ZlcmZsb3cteTogYXV0bzsKCXBhZGRpbmc6IDhweCAwOwoJZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKCWZvbnQtc2l6ZTogMTNweDsKfQoKLm5teC1mY3Atcm93IHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA0cHg7CglwYWRkaW5nOiAycHggOHB4OwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTJlOwoJfQp9Cgoubm14LWZjcC1kaXIgewoJY3Vyc29yOiBwb2ludGVyOwoJdXNlci1zZWxlY3Q6IG5vbmU7Cn0KCi5ubXgtZmNwLWFycm93IHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXdpZHRoOiAxZW07CgoJJjo6YmVmb3JlIHsKCQljb250ZW50OiAi4pa9IjsKCX0KfQoKLm5teC1mY3Atcm93Lm5teC1mY3AtY29sbGFwc2VkID4gLm5teC1mY3AtYXJyb3c6OmJlZm9yZSB7Cgljb250ZW50OiAi4pa3IjsKfQoKLm5teC1mY3AtbmFtZSB7CglvdmVyZmxvdzogaGlkZGVuOwoJdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7Cn0KCi5ubXgtZmNwLW5hbWUtLWhpZ2ggewoJY29sb3I6IGhzbCgwLCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLW5hbWUtLW1lZGl1bSB7Cgljb2xvcjogaHNsKDU1LCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLW5hbWUtLWxvdyB7Cgljb2xvcjogaHNsKDIwNywgOTAlLCA2NSUpOwp9Cgoubm14LWZjcC1uYW1lLS1zYWZlIHsKCWNvbG9yOiBoc2woMTIwLCAyNSUsIDY1JSk7Cn0KCi5ubXgtZmNwLW5hbWUtLWRlZmF1bHQgewoJY29sb3I6ICNlNGU0ZTc7Cn0KCgoubm14LWZjcC1uYW1lLm5teC1mY3AtaGFzaC0tc2hhcmVkIHsKCWNvbG9yOiBoc2woMCwgOTAlLCA2OCUpOwoJdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOwoJY3Vyc29yOiBoZWxwOwp9Cgoubm14LWZjcC1uYW1lLm5teC1mY3AtaGFzaC0tdW5pcXVlIHsKCWNvbG9yOiBoc2woMTQwLCA1NSUsIDU4JSk7Cn0KCi5ubXgtZmNwLXNpemUgewoJbWFyZ2luLWxlZnQ6IGF1dG87CglwYWRkaW5nLWxlZnQ6IDEycHg7Cgljb2xvcjogI2ExYTFhYTsKCWZsZXg6IDAgMCBhdXRvOwp9CgoKLm5teC1mY3AtaGFzaC10b29sdGlwIHsKCXBvc2l0aW9uOiBmaXhlZDsKCXotaW5kZXg6IDEwMDAwOwoJZGlzcGxheTogbm9uZTsKCW1heC13aWR0aDogNTQwcHg7CgliYWNrZ3JvdW5kOiAjMjkyOTJlOwoJY29sb3I6ICNlNGU0ZTc7Cglib3JkZXI6IDFweCBzb2xpZCAjNTI1MjViOwoJYm9yZGVyLXJhZGl1czogNnB4OwoJcGFkZGluZzogOHB4IDEwcHg7Cglmb250LXNpemU6IDEzcHg7Cglmb250LWZhbWlseTogdWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCBzYW5zLXNlcmlmLCAiQXBwbGUgQ29sb3IgRW1vamkiLCAiU2Vnb2UgVUkgRW1vamkiLCAiU2Vnb2UgVUkgU3ltYm9sIiwgIk5vdG8gQ29sb3IgRW1vamkiOwoJbGluZS1oZWlnaHQ6IDEuNTsKCWJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjUpOwoJcG9pbnRlci1ldmVudHM6IG5vbmU7Cgl3aGl0ZS1zcGFjZTogbm9ybWFsOwoJd29yZC1icmVhazogYnJlYWstYWxsOwp9Cgoubm14LWZjcC1oYXNoLXRvb2x0aXAtdGl0bGUgewoJZm9udC13ZWlnaHQ6IDYwMDsKCW1hcmdpbi1ib3R0b206IDRweDsKCWNvbG9yOiAjZmFmYWZhOwp9Cgoubm14LWZjcC1oYXNoLXRvb2x0aXAgdWwgewoJbWFyZ2luOiAwOwoJcGFkZGluZy1sZWZ0OiAxNnB4Owp9Cgoubm14LWZjcC1jb250ZXh0LW1lbnUgewoJcG9zaXRpb246IGZpeGVkOwoJei1pbmRleDogMTAwMDA7CglkaXNwbGF5OiBub25lOwoJbWluLXdpZHRoOiAxNjBweDsKCWJhY2tncm91bmQ6ICMyOTI5MmU7Cglib3JkZXI6IDFweCBzb2xpZCAjNTI1MjViOwoJYm9yZGVyLXJhZGl1czogNnB4OwoJcGFkZGluZzogNHB4OwoJYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7Cn0KCi5ubXgtZmNwLWNvbnRleHQtbWVudS1pdGVtIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA4cHg7Cgl3aWR0aDogMTAwJTsKCXRleHQtYWxpZ246IGxlZnQ7CgliYWNrZ3JvdW5kOiBub25lOwoJYm9yZGVyOiBub25lOwoJY29sb3I6ICNlNGU0ZTc7Cglmb250LXNpemU6IDEzcHg7CglwYWRkaW5nOiA2cHggMTBweDsKCWJvcmRlci1yYWRpdXM6IDRweDsKCWN1cnNvcjogcG9pbnRlcjsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiAjM2UzZTQ3OwoJfQp9Cgoubm14LWZjcC1jb250ZXh0LW1lbnUtaWNvbiB7CglmbGV4OiAwIDAgYXV0bzsKCWZpbGw6IGN1cnJlbnRDb2xvcjsKfQoKLm5teC1mY3AtY29udGV4dC1tZW51LWRpdmlkZXIgewoJaGVpZ2h0OiAxcHg7CgltYXJnaW46IDRweCA2cHg7CgliYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpOwp9Cg==",
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
	const settingName = "optToggleModEditMediaViewer";
	const classNMX = "nmx-element";
	const classOpen = "nmx-open";
	const classPaused = "nmx-paused";
	const classCurrent = "nmx-current";
	const classTransparent = "nmx-transparent";
	const classHighlight = "nmx-highlight";
	const classDisabled = "nmx-disabled";
	const classBodyLock = "nmx-media-viewer-locked";
	const classPeeking = "nmx-media-viewer-peeking";
	const idOverlay = "nmx-media-viewer";
	const idTopBar = "nmx-media-viewer-topbar";
	const idLabelGroup = "nmx-media-viewer-label-group";
	const idSectionLabel = "nmx-media-viewer-section-label";
	const idPosition = "nmx-media-viewer-position";
	const idTopActions = "nmx-media-viewer-top-actions";
	const idThumbBar = "nmx-media-viewer-thumb-bar";
	const idImageBox = "nmx-media-viewer-image";
	const idControls = "nmx-media-viewer-controls";
	const classThumbGroup = "nmx-media-viewer-thumb-group";
	const classThumbGroupLabel = "nmx-media-viewer-thumb-group-label";
	const classThumbGroupItems = "nmx-media-viewer-thumb-group-items";
	const classThumbnail = "nmx-media-viewer-thumbnail";
	const classThumbnailIsCover = "nmx-media-viewer-thumbnail--cover";
	const classArrow = "nmx-media-viewer-arrow";
	const classArrowLeft = "nmx-left-arrow";
	const classArrowRight = "nmx-right-arrow";
	const classIconButton = "nmx-media-viewer-icon-btn";
	const classControlButton = "nmx-media-viewer-control";
	const SECTION_AUTHOR = "author";
	const SECTION_PENDING = "pending";
	const SECTION_APPROVED = "approved";
	const iconClose =
		"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
	const iconLocate =
		"M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z";
	const iconDefault =
		"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
	const iconOpenInNewTab =
		"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z";
	const menuItemIcons = {
		"edit title":
			"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
		"set as thumbnail":
			"M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z",
		delete: "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",
	};
	const hashParamHighlightImage = "nmx-highlight-image";
	let entries = [];
	let currentId = null;
	let observer;
	let rescanTimer;
	let dialogWatcher;
	let lastWheelTime = 0;
	let menuHideRequests = 0;
	let pendingHighlightId;
	const controlsCacheById = new Map();
	let overlay, sectionLabelEl, positionEl, thumbBar, imageBox, mainImage, controlsBar;
	nmxRegisterToggle(settingName, {
		cssFiles: [
			"src/features/mod-edit-media/mod-edit-media.css",
		],
		onEnable: () => {
			if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectJS);
			else injectJS();
		},
		onDisable: removeJS,
	});
	function readPendingHighlightId() {
		const match = location.hash.match(new RegExp(`${hashParamHighlightImage}=([^&]+)`));
		return match ? decodeURIComponent(match[1]) : undefined;
	}
	function injectJS() {
		document.removeEventListener("DOMContentLoaded", injectJS);
		document.addEventListener("click", onDocumentClick);
		pendingHighlightId = readPendingHighlightId();
		startObserver();
		rescan();
	}
	function removeJS() {
		document.removeEventListener("click", onDocumentClick);
		document.removeEventListener("keydown", onKeyDown);
		stopObserver();
		dialogWatcher?.disconnect();
		dialogWatcher = undefined;
		clearTimeout(rescanTimer);
		closeViewer(false);
		overlay?.remove();
		overlay = undefined;
		document.querySelectorAll("[data-nmx-image-id]").forEach((el) => {
			delete el.dataset.nmxImageId;
		});
		document.body.classList.remove(classBodyLock);
		document.documentElement.classList.remove(classPeeking);
		menuHideRequests = 0;
		controlsCacheById.clear();
		entries = [];
		currentId = null;
		pendingHighlightId = undefined;
	}
	function startObserver() {
		observer = new MutationObserver((mutationList) => {
			const portalRoot = document.getElementById("headlessui-portal-root");
			if (portalRoot && mutationList.every((mutation) => portalRoot.contains(mutation.target))) return;
			clearTimeout(rescanTimer);
			rescanTimer = setTimeout(rescan, 200);
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
	function findSectionHeadings() {
		const found = [];
		document.querySelectorAll("h3, h4").forEach((heading) => {
			const text = heading.textContent.trim();
			if (heading.tagName === "H3" && text.includes("Images")) {
				found.push({
					heading: heading,
					section: SECTION_AUTHOR,
					label: text,
				});
			} else if (heading.tagName === "H4" && text.includes("Pending images")) {
				found.push({
					heading: heading,
					section: SECTION_PENDING,
					label: text,
				});
			} else if (heading.tagName === "H4" && text.includes("Approved images")) {
				found.push({
					heading: heading,
					section: SECTION_APPROVED,
					label: text,
				});
			}
		});
		return found;
	}
	function findGalleryList(descriptor) {
		if (descriptor.section === SECTION_AUTHOR) {
			const container = descriptor.heading.parentElement?.parentElement?.parentElement;
			return container?.querySelector("ul") ?? null;
		}
		const sibling = descriptor.heading.nextElementSibling;
		return sibling?.tagName === "UL" ? sibling : null;
	}
	function extractCaption(li) {
		const blocks = Array.from(li.children).filter((el) => el.tagName === "DIV");
		const captionBlock = blocks[blocks.length - 1];
		const paragraphs = captionBlock ? Array.from(captionBlock.querySelectorAll("p")) : [];
		return {
			title: paragraphs[0]?.textContent.trim() || "",
			uploader: paragraphs[1]?.textContent.trim() || "",
		};
	}
	function buildEntryFromLi(li, section, sectionLabel, indexInSection) {
		const link = li.querySelector("a[href]");
		const thumbImg = li.querySelector("img");
		const menuButton = li.querySelector('button[aria-haspopup="menu"]');
		const isThumbnail = Array.from(li.querySelectorAll(".nxm-pill-label")).some((el) => el.textContent.trim() === "Thumbnail");
		const { title: title, uploader: uploader } = extractCaption(li);
		const id = link?.href || thumbImg?.src || `${section}-${indexInSection}`;
		if (link) link.dataset.nmxImageId = id;
		return {
			id: id,
			section: section,
			sectionLabel: sectionLabel,
			li: li,
			menuButton: menuButton,
			isThumbnail: isThumbnail,
			title: title,
			uploader: uploader,
			thumbSrc: thumbImg?.src ?? "",
			fullSrc: link?.href || thumbImg?.src || "",
		};
	}
	function rescan() {
		const previousEntries = entries;
		const previousId = currentId;
		const sections = findSectionHeadings()
			.map((descriptor) => {
				const ul = findGalleryList(descriptor);
				const items = ul ? Array.from(ul.querySelectorAll(":scope > li")) : [];
				return {
					section: descriptor.section,
					label: descriptor.label,
					entries: items.map((li, i) => buildEntryFromLi(li, descriptor.section, descriptor.label, i)),
				};
			})
			.filter((section) => section.entries.length > 0);
		entries = sections.flatMap((section) => section.entries);
		if (pendingHighlightId) {
			const target = entries.find((entry) => entry.id === pendingHighlightId);
			if (target) {
				pendingHighlightId = undefined;
				scrollAndHighlight(target.li);
			}
		}
		if (thumbBar) rebuildThumbBar(sections);
		if (!overlay?.classList.contains(classOpen)) return;
		if (entries.length === 0) {
			closeViewer(false);
			return;
		}
		let idx = entries.findIndex((entry) => entry.id === previousId);
		if (idx === -1) {
			const oldIdx = previousEntries.findIndex((entry) => entry.id === previousId);
			idx = Math.min(Math.max(oldIdx, 0), entries.length - 1);
		}
		currentId = entries[idx].id;
		renderCurrentEntry();
	}
	function ensureOverlay() {
		if (overlay) return;
		overlay = document.createElement("div");
		overlay.id = idOverlay;
		overlay.classList.add(classNMX);
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", "Image viewer");
		const topBar = document.createElement("div");
		topBar.id = idTopBar;
		const labelGroup = document.createElement("div");
		labelGroup.id = idLabelGroup;
		sectionLabelEl = document.createElement("span");
		sectionLabelEl.id = idSectionLabel;
		positionEl = document.createElement("span");
		positionEl.id = idPosition;
		labelGroup.append(sectionLabelEl, positionEl);
		const topActions = document.createElement("div");
		topActions.id = idTopActions;
		topActions.append(
			createIconButton(iconLocate, "Close and scroll to image", () => closeViewer(true)),
			createIconButton(iconClose, "Close", () => closeViewer(false)),
		);
		topBar.append(labelGroup, topActions);
		thumbBar = document.createElement("div");
		thumbBar.id = idThumbBar;
		imageBox = document.createElement("div");
		imageBox.id = idImageBox;
		mainImage = document.createElement("img");
		imageBox.appendChild(mainImage);
		controlsBar = document.createElement("div");
		controlsBar.id = idControls;
		const leftArrow = document.createElement("div");
		leftArrow.classList.add(classArrow, classArrowLeft);
		leftArrow.textContent = "‹";
		leftArrow.addEventListener("click", showPrev);
		const rightArrow = document.createElement("div");
		rightArrow.classList.add(classArrow, classArrowRight);
		rightArrow.textContent = "›";
		rightArrow.addEventListener("click", showNext);
		overlay.append(topBar, thumbBar, imageBox, controlsBar, leftArrow, rightArrow);
		document.documentElement.appendChild(overlay);
		overlay.addEventListener("click", (e) => {
			if (e.target === overlay || e.target === imageBox) closeViewer(false);
		});
		imageBox.addEventListener("wheel", onWheel, {
			passive: false,
		});
		thumbBar.addEventListener("wheel", onThumbBarWheel, {
			passive: false,
		});
		document.addEventListener("keydown", onKeyDown);
	}
	function createIconButton(pathData, label, onClick) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.classList.add(classIconButton);
		btn.title = label;
		btn.setAttribute("aria-label", label);
		btn.appendChild(createSvgIcon(pathData));
		btn.addEventListener("click", onClick);
		return btn;
	}
	const SVG_NS = "http://www.w3.org/2000/svg";
	function createSvgIcon(pathData) {
		const svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("role", "presentation");
		const path = document.createElementNS(SVG_NS, "path");
		path.setAttribute("d", pathData);
		svg.appendChild(path);
		return svg;
	}
	function rebuildThumbBar(sections) {
		thumbBar.innerHTML = "";
		sections.forEach((section) => {
			const group = document.createElement("div");
			group.classList.add(classThumbGroup);
			const label = document.createElement("span");
			label.classList.add(classThumbGroupLabel);
			label.textContent = section.label;
			const items = document.createElement("div");
			items.classList.add(classThumbGroupItems);
			section.entries.forEach((entry) => {
				const thumb = document.createElement("button");
				thumb.type = "button";
				thumb.classList.add(classThumbnail);
				if (entry.isThumbnail) thumb.classList.add(classThumbnailIsCover);
				thumb.dataset.nmxImageId = entry.id;
				thumb.title = entry.title || "Untitled image";
				const img = document.createElement("img");
				img.src = entry.thumbSrc;
				img.alt = "";
				img.loading = "lazy";
				thumb.appendChild(img);
				thumb.addEventListener("click", () => openViewer(entry.id));
				items.appendChild(thumb);
			});
			group.append(label, items);
			thumbBar.appendChild(group);
		});
	}
	function openViewer(id) {
		ensureOverlay();
		rescan();
		if (!entries.some((entry) => entry.id === id)) return;
		dialogWatcher?.disconnect();
		dialogWatcher = undefined;
		overlay.classList.remove(classPaused);
		currentId = id;
		overlay.classList.add(classOpen);
		document.body.classList.add(classBodyLock);
		renderCurrentEntry();
	}
	function scrollAndHighlight(li) {
		if (!li || !document.contains(li)) return;
		li.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
		li.classList.add(classHighlight);
		setTimeout(() => li.classList.remove(classHighlight), 1500);
	}
	function closeViewer(scrollToImage) {
		if (!overlay?.classList.contains(classOpen)) return;
		const entry = entries.find((e) => e.id === currentId);
		overlay.classList.remove(classOpen);
		document.body.classList.remove(classBodyLock);
		mainImage.removeAttribute("src");
		if (scrollToImage) scrollAndHighlight(entry?.li);
	}
	function showPrev() {
		step(-1);
	}
	function showNext() {
		step(1);
	}
	function step(delta) {
		if (!entries.length) return;
		const idx = entries.findIndex((entry) => entry.id === currentId);
		const nextIdx = (idx + delta + entries.length) % entries.length;
		currentId = entries[nextIdx].id;
		renderCurrentEntry();
	}
	function renderCurrentEntry() {
		const idx = entries.findIndex((entry) => entry.id === currentId);
		const entry = entries[idx];
		if (!entry) return;
		mainImage.classList.add(classTransparent);
		setTimeout(() => {
			mainImage.onload = () => mainImage.classList.remove(classTransparent);
			mainImage.src = entry.fullSrc;
			mainImage.alt = entry.title || "Mod image";
		}, 120);
		sectionLabelEl.textContent = entry.sectionLabel;
		positionEl.textContent = `${idx + 1} / ${entries.length}`;
		thumbBar.querySelector(`.${classThumbnail}.${classCurrent}`)?.classList.remove(classCurrent);
		const activeThumb = thumbBar.querySelector(`[data-nmx-image-id="${CSS.escape(entry.id)}"]`);
		activeThumb?.classList.add(classCurrent);
		activeThumb?.scrollIntoView({
			behavior: "smooth",
			inline: "center",
			block: "nearest",
		});
		renderControls(entry);
	}
	function renderControls(entry) {
		controlsBar.innerHTML = "";
		const entryId = entry.id;
		if (entry.fullSrc) {
			controlsBar.appendChild(
				createControlButton(iconOpenInNewTab, "Open in new tab", false, () => {
					window.open(entry.fullSrc, "_blank", "noopener,noreferrer");
				}),
			);
		}
		peekMenuItems(entry).then((items) => {
			if (currentId !== entryId) return;
			items
				.filter((item) => item.label.toLowerCase() !== "open in new tab")
				.forEach((item) => {
					const icon = menuItemIcons[item.label.toLowerCase()] ?? iconDefault;
					controlsBar.appendChild(
						createControlButton(icon, item.label, item.disabled, () => invokeMenuAction(entry, item.label)),
					);
				});
		});
	}
	function createControlButton(pathData, label, disabled, onClick) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.classList.add(classControlButton);
		if (disabled) btn.classList.add(classDisabled);
		btn.disabled = disabled;
		btn.appendChild(createSvgIcon(pathData));
		const span = document.createElement("span");
		span.textContent = label;
		btn.appendChild(span);
		btn.addEventListener("click", onClick);
		return btn;
	}
	function resolveMenuButton(entry) {
		if (entry.menuButton && document.contains(entry.menuButton)) return entry.menuButton;
		return entry.li?.querySelector('button[aria-haspopup="menu"]') ?? null;
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
	function findMenuFor(button) {
		if (!button?.id) return null;
		const menu = document.querySelector(`[role="menu"][aria-labelledby="${CSS.escape(button.id)}"]`);
		return menu?.dataset.headlessuiState === "open" ? menu : null;
	}
	function waitForMenu(button, timeoutMs = 500) {
		const existing = findMenuFor(button);
		if (existing) return Promise.resolve(existing);
		return new Promise((resolve) => {
			const obs = new MutationObserver(() => {
				const menu = findMenuFor(button);
				if (!menu) return;
				obs.disconnect();
				clearTimeout(timer);
				resolve(menu);
			});
			obs.observe(document.body, {
				childList: true,
				subtree: true,
			});
			const timer = setTimeout(() => {
				obs.disconnect();
				resolve(findMenuFor(button));
			}, timeoutMs);
		});
	}
	function extractMenuItems(menu) {
		return Array.from(menu.querySelectorAll('[role="menuitem"]')).map((el) => ({
			label: el.querySelector(".nxm-dropdown-item-label")?.textContent.trim() ?? el.textContent.trim(),
			disabled: el.getAttribute("aria-disabled") === "true" || el.disabled === true,
		}));
	}
	function findMenuItemByLabel(menu, label) {
		return Array.from(menu.querySelectorAll('[role="menuitem"]')).find(
			(el) => (el.querySelector(".nxm-dropdown-item-label")?.textContent.trim() ?? el.textContent.trim()) === label,
		);
	}
	function hideRealMenus() {
		menuHideRequests++;
		document.documentElement.classList.add(classPeeking);
	}
	function unhideRealMenusSoon() {
		setTimeout(() => {
			menuHideRequests = Math.max(0, menuHideRequests - 1);
			if (menuHideRequests === 0) document.documentElement.classList.remove(classPeeking);
		}, 300);
	}
	function isMenuButtonExpanded(button) {
		return button.getAttribute("aria-expanded") === "true";
	}
	async function peekMenuItems(entry) {
		if (controlsCacheById.has(entry.id)) return controlsCacheById.get(entry.id);
		const button = resolveMenuButton(entry);
		if (!button?.id) {
			controlsCacheById.set(entry.id, []);
			return [];
		}
		hideRealMenus();
		if (!isMenuButtonExpanded(button)) simulateClick(button);
		const menu = await waitForMenu(button);
		const items = menu ? extractMenuItems(menu) : [];
		if (isMenuButtonExpanded(button)) simulateClick(button);
		unhideRealMenusSoon();
		controlsCacheById.set(entry.id, items);
		return items;
	}
	async function invokeMenuAction(entry, label) {
		const button = resolveMenuButton(entry);
		if (!button?.id) return;
		hideRealMenus();
		if (!isMenuButtonExpanded(button)) simulateClick(button);
		const menu = await waitForMenu(button);
		const target = menu && findMenuItemByLabel(menu, label);
		if (!target || target.getAttribute("aria-disabled") === "true" || target.disabled) {
			if (isMenuButtonExpanded(button)) simulateClick(button);
			unhideRealMenusSoon();
			return;
		}
		simulateClick(target);
		requestAnimationFrame(() => {
			unhideRealMenusSoon();
			if (isAnyDialogOpen()) pauseForNativeDialog();
			else refreshAfterAction();
		});
	}
	function isDialogVisible(dialog) {
		if (dialog.hidden) return false;
		const style = getComputedStyle(dialog);
		return style.display !== "none" && style.visibility !== "hidden";
	}
	function isAnyDialogOpen() {
		return Array.from(document.querySelectorAll('[role="dialog"]')).some(isDialogVisible);
	}
	function pauseForNativeDialog() {
		overlay.classList.add(classPaused);
		dialogWatcher?.disconnect();
		dialogWatcher = new MutationObserver(() => {
			if (!isAnyDialogOpen()) {
				dialogWatcher.disconnect();
				dialogWatcher = undefined;
				refreshAfterAction();
				overlay.classList.remove(classPaused);
			}
		});
		dialogWatcher.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: [
				"class",
				"style",
				"hidden",
				"aria-hidden",
				"data-headlessui-state",
			],
		});
	}
	function refreshAfterAction() {
		controlsCacheById.clear();
		rescan();
	}
	function onDocumentClick(e) {
		if (!entries.length) return;
		if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
		const link = e.target.closest("a[data-nmx-image-id]");
		if (!link) return;
		const id = link.dataset.nmxImageId;
		if (!entries.some((entry) => entry.id === id)) return;
		e.preventDefault();
		openViewer(id);
	}
	function isTypingTarget(el) {
		return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
	}
	function onKeyDown(e) {
		if (!overlay?.classList.contains(classOpen) || overlay.classList.contains(classPaused)) return;
		if (isTypingTarget(document.activeElement)) return;
		if (e.key === "Escape" || e.key === " " || e.code === "Space") {
			e.preventDefault();
			closeViewer(false);
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			showPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			showNext();
		}
	}
	function onWheel(e) {
		e.preventDefault();
		const now = Date.now();
		if (now - lastWheelTime < 150) return;
		const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
		if (Math.abs(delta) < 1) return;
		lastWheelTime = now;
		step(delta > 0 ? 1 : -1);
	}
	function onThumbBarWheel(e) {
		e.preventDefault();
		thumbBar.scrollLeft += e.deltaY || e.deltaX;
	}
})();
