// ==UserScript==
// @name         Nexus Kit: 🖼️ Mod Edit: Image viewer
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
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
			"CgoKaHRtbC5ubXgtbWVkaWEtdmlld2VyLXBlZWtpbmcgW3JvbGU9Im1lbnUiXSB7Cgl2aXNpYmlsaXR5OiBoaWRkZW4gIWltcG9ydGFudDsKCXBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7Cn0K",
		"src/shared/content-preview-modal.css":
			"Cjpob3N0IHsKCWFsbDogaW5pdGlhbDsKfQoKKiB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9Cgoubm14LWZjcC1iYWNrZHJvcCB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl0b3A6IDA7CglsZWZ0OiAwOwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDEwMCU7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpOwoJei1pbmRleDogOTk5OTsKfQoKLm5teC1mY3AtbW9kYWwgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47Cgl3aWR0aDogOTAlOwoJbWF4LXdpZHRoOiA5MDBweDsKCWhlaWdodDogODUlOwoJYmFja2dyb3VuZDogIzFkMWQyMTsKCWNvbG9yOiAjZTRlNGU3OwoJYm9yZGVyOiAxcHggc29saWQgIzcxNzE3YTsKCWJvcmRlci1yYWRpdXM6IDhweDsKCW92ZXJmbG93OiBoaWRkZW47CgoJZm9udC1mYW1pbHk6IHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgc2Fucy1zZXJpZiwgIkFwcGxlIENvbG9yIEVtb2ppIiwgIlNlZ29lIFVJIEVtb2ppIiwgIlNlZ29lIFVJIFN5bWJvbCIsICJOb3RvIENvbG9yIEVtb2ppIjsKCWZvbnQtc2l6ZTogMTRweDsKCWxpbmUtaGVpZ2h0OiAxLjQ7Cn0KCi5ubXgtZmNwLWhlYWRlciB7Cglwb3NpdGlvbjogcmVsYXRpdmU7CglmbGV4OiAwIDAgYXV0bzsKCXBhZGRpbmc6IDEycHggNTZweCAxMnB4IDE2cHg7Cglib3JkZXItYm90dG9tOiAxcHggc29saWQgIzcxNzE3YTsKCWJhY2tncm91bmQ6ICMyOTI5MmU7CglsaW5lLWhlaWdodDogMS4xOwp9Cgoubm14LWZjcC10aXRsZS1yb3cgewoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CglnYXA6IDEycHg7CgltYXJnaW4tYm90dG9tOiA4cHg7Cn0KCi5ubXgtZmNwLXRpdGxlIHsKCW1hcmdpbjogMDsKCWZvbnQtc2l6ZTogMjBweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cn0KCi5ubXgtZmNwLWhhc2gtYWN0aW9ucyB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogNnB4OwoJZmxleDogMCAwIGF1dG87Cn0KCi5ubXgtZmNwLWhhc2gtYnRuIHsKCWJhY2tncm91bmQ6ICMzZTNlNDc7Cgljb2xvcjogI2U0ZTRlNzsKCWJvcmRlcjogMXB4IHNvbGlkICM3MTcxN2E7Cglib3JkZXItcmFkaXVzOiA0cHg7CglwYWRkaW5nOiA0cHggMTBweDsKCWZvbnQtc2l6ZTogMTJweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cgl0ZXh0LWRlY29yYXRpb246IG5vbmU7CgljdXJzb3I6IHBvaW50ZXI7Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoKCSY6aG92ZXI6bm90KDpkaXNhYmxlZCkgewoJCWJhY2tncm91bmQ6ICM1MjUyNWI7Cgl9CgoJJjpkaXNhYmxlZCB7CgkJY3Vyc29yOiBkZWZhdWx0OwoJCW9wYWNpdHk6IDAuNjsKCX0KfQoKLm5teC1mY3AtaGFzaC1idG4tLXJlbWVtYmVyZWQgewoJYm9yZGVyLWNvbG9yOiBoc2woMTIwLCA0MCUsIDQ1JSk7Cgljb2xvcjogaHNsKDEyMCwgNjAlLCA3MCUpOwp9Cgoubm14LWZjcC1oYXNoLWJ0bi0tZ290byB7CglwYWRkaW5nOiA0cHggOHB4OwoJY29sb3I6IGhzbCgyMDcsIDcwJSwgNzUlKTsKCWJvcmRlci1jb2xvcjogaHNsKDIwNywgNDAlLCA0NSUpOwoKCSY6aG92ZXIgewoJCWJhY2tncm91bmQ6IGhzbCgyMDcsIDQ1JSwgMjAlKTsKCX0KfQoKLm5teC1mY3AtaGFzaC1idG4tLWZvcmdldCB7CglwYWRkaW5nOiA0cHggOHB4OwoJY29sb3I6IGhzbCg0NSwgNTAlLCA3MCUpOwoJYm9yZGVyLWNvbG9yOiBoc2woNDUsIDM1JSwgNDAlKTsKCgkmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsKCQliYWNrZ3JvdW5kOiBoc2woNDUsIDQ1JSwgMjAlKTsKCX0KfQoKLm5teC1mY3AtY2xvc2UgewoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiAwcHg7CglyaWdodDogOHB4OwoJYmFja2dyb3VuZDogbm9uZTsKCWJvcmRlcjogbm9uZTsKCWNvbG9yOiAjZTRlNGU3OwoJZm9udC1zaXplOiAzNHB4OwoJbGluZS1oZWlnaHQ6IDE7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3ZlciB7CgkJY29sb3I6ICNmYWZhZmE7Cgl9Cn0KCi5ubXgtZmNwLW1ldGEgewoJZGlzcGxheTogZmxleDsKCWZsZXgtd3JhcDogd3JhcDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDhweDsKCW1hcmdpbi1ib3R0b206IDhweDsKfQoKLm5teC1mY3AtcmlzayB7CglwYWRkaW5nOiAycHggOHB4OwoJYm9yZGVyLXJhZGl1czogNHB4OwoJZm9udC13ZWlnaHQ6IDYwMDsKCWZvbnQtc2l6ZTogMTFweDsKCWxldHRlci1zcGFjaW5nOiAwLjA1ZW07Cn0KCi5ubXgtZmNwLXJpc2stLWhpZ2ggewoJYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDAsIDkwJSwgNjAlKTsKfQoKLm5teC1mY3Atcmlzay0tbWVkaXVtIHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCg1NSwgMTAwJSwgMTAlKTsKCWNvbG9yOiBoc2woNTUsIDkwJSwgNjAlKTsKfQoKLm5teC1mY3Atcmlzay0tbG93IHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgyMDcsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDIwNywgOTAlLCA2NSUpOwp9Cgoubm14LWZjcC1yaXNrLS1zYWZlIHsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgxMjAsIDEwMCUsIDEwJSk7Cgljb2xvcjogaHNsKDEyMCwgNDAlLCA2NSUpOwp9Cgoubm14LWZjcC1yaXNrLS1kZWZhdWx0IHsKCWJhY2tncm91bmQtY29sb3I6ICMzZTNlNDc7Cgljb2xvcjogI2Q0ZDRkODsKfQoKLm5teC1mY3Atcmlzay0tc3Bvb2ZlZCB7CgliYWNrZ3JvdW5kLWNvbG9yOiBoc2woMCwgOTAlLCA0NSUpOwoJY29sb3I6ICNmZmY7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDkwJSwgNTIlKTsKCX0KfQoKCi5ubXgtZmNwLXJpc2stLWZvcm1hdHRpbmcgewoJYmFja2dyb3VuZC1jb2xvcjogaHNsKDMwLCA4MCUsIDQwJSk7Cgljb2xvcjogI2ZmZjsKCWN1cnNvcjogcG9pbnRlcjsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kLWNvbG9yOiBoc2woMzAsIDgwJSwgNDclKTsKCX0KfQoKLm5teC1mY3AtZXh0ZW5zaW9ucyB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJZ2FwOiA2cHg7Cn0KCi5ubXgtZmNwLWV4dCB7CglwYWRkaW5nOiAxcHggNnB4OwoJYm9yZGVyLXJhZGl1czogNHB4OwoJZm9udC1zaXplOiAxMXB4OwoJY3Vyc29yOiBwb2ludGVyOwoJYmFja2dyb3VuZDogIzNlM2U0NzsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiAjNTI1MjViOwoJfQp9Cgoubm14LWZjcC1leHQtLWhpZ2ggewoJY29sb3I6IGhzbCgwLCAxMDAlLCA3NiUpOwp9Cgoubm14LWZjcC1leHQtLW1lZGl1bSB7Cgljb2xvcjogaHNsKDU1LCA5MCUsIDYwJSk7Cn0KCi5ubXgtZmNwLWV4dC0tbG93IHsKCWNvbG9yOiBoc2woMjA3LCA5MCUsIDY1JSk7Cn0KCi5ubXgtZmNwLWV4dC0tc2FmZSB7Cgljb2xvcjogaHNsKDEyMCwgMjUlLCA2NSUpOwp9Cgoubm14LWZjcC1leHQtLWRlZmF1bHQgewoJY29sb3I6ICNkNGQ0ZDg7Cn0KCi5ubXgtZmNwLWZpbHRlciB7Cgl3aWR0aDogMTAwJTsKCWJhY2tncm91bmQtY29sb3I6ICMxZDFkMjE7Cgljb2xvcjogI2U0ZTRlNzsKCWJvcmRlcjogMXB4IHNvbGlkICNhMWExYWE7Cglib3JkZXItcmFkaXVzOiA0cHg7CglwYWRkaW5nOiA2cHggOHB4OwoJZm9udC1zaXplOiAxNHB4Owp9Cgoubm14LWZjcC10cmVlIHsKCWZsZXg6IDEgMSBhdXRvOwoJb3ZlcmZsb3cteTogYXV0bzsKCXBhZGRpbmc6IDhweCAwOwoJZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKCWZvbnQtc2l6ZTogMTNweDsKfQoKLm5teC1mY3Atcm93IHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA0cHg7CglwYWRkaW5nOiAycHggOHB4OwoJd2hpdGUtc3BhY2U6IG5vd3JhcDsKCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjMjkyOTJlOwoJfQp9Cgoubm14LWZjcC1kaXIgewoJY3Vyc29yOiBwb2ludGVyOwoJdXNlci1zZWxlY3Q6IG5vbmU7Cn0KCi5ubXgtZmNwLWFycm93IHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCXdpZHRoOiAxZW07CgoJJjo6YmVmb3JlIHsKCQljb250ZW50OiAi4pa9IjsKCX0KfQoKLm5teC1mY3Atcm93Lm5teC1mY3AtY29sbGFwc2VkID4gLm5teC1mY3AtYXJyb3c6OmJlZm9yZSB7Cgljb250ZW50OiAi4pa3IjsKfQoKLm5teC1mY3AtbmFtZSB7CglvdmVyZmxvdzogaGlkZGVuOwoJdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7CgoJdW5pY29kZS1iaWRpOiBpc29sYXRlOwp9CgoKLm5teC1mY3AtYmlkaS1jaGFyIHsKCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCW1hcmdpbjogMCAycHg7CglwYWRkaW5nOiAwIDNweDsKCWJvcmRlci1yYWRpdXM6IDNweDsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgwLCA5MCUsIDQ1JSk7Cgljb2xvcjogI2ZmZjsKCWZvbnQtc2l6ZTogMTBweDsKCWZvbnQtd2VpZ2h0OiA3MDA7Cgl1bmljb2RlLWJpZGk6IGlzb2xhdGU7Cn0KCi5ubXgtZmNwLW5hbWUtLXNwb29mZWQgewoJdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgd2F2eSBoc2woMCwgOTAlLCA2MCUpOwoJdGV4dC11bmRlcmxpbmUtb2Zmc2V0OiAzcHg7Cn0KCgoubm14LWZjcC1uYW1lLS1mb3JtYXR0aW5nIHsKCXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZCBoc2woMzAsIDgwJSwgNTUlKTsKCXRleHQtdW5kZXJsaW5lLW9mZnNldDogM3B4Owp9Cgoubm14LWZjcC1uYW1lLS1oaWdoIHsKCWNvbG9yOiBoc2woMCwgOTAlLCA2MCUpOwp9Cgoubm14LWZjcC1uYW1lLS1tZWRpdW0gewoJY29sb3I6IGhzbCg1NSwgOTAlLCA2MCUpOwp9Cgoubm14LWZjcC1uYW1lLS1sb3cgewoJY29sb3I6IGhzbCgyMDcsIDkwJSwgNjUlKTsKfQoKLm5teC1mY3AtbmFtZS0tc2FmZSB7Cgljb2xvcjogaHNsKDEyMCwgMjUlLCA2NSUpOwp9Cgoubm14LWZjcC1uYW1lLS1kZWZhdWx0IHsKCWNvbG9yOiAjZTRlNGU3Owp9CgoKLm5teC1mY3AtbmFtZS5ubXgtZmNwLWhhc2gtLXNoYXJlZCB7Cgljb2xvcjogaHNsKDAsIDkwJSwgNjglKTsKCXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsKCWN1cnNvcjogaGVscDsKfQoKLm5teC1mY3AtbmFtZS5ubXgtZmNwLWhhc2gtLXVuaXF1ZSB7Cgljb2xvcjogaHNsKDE0MCwgNTUlLCA1OCUpOwp9Cgoubm14LWZjcC1zaXplIHsKCW1hcmdpbi1sZWZ0OiBhdXRvOwoJcGFkZGluZy1sZWZ0OiAxMnB4OwoJY29sb3I6ICNhMWExYWE7CglmbGV4OiAwIDAgYXV0bzsKfQoKCi5ubXgtZmNwLWhhc2gtdG9vbHRpcCB7Cglwb3NpdGlvbjogZml4ZWQ7Cgl6LWluZGV4OiAxMDAwMDsKCWRpc3BsYXk6IG5vbmU7CgltYXgtd2lkdGg6IDU0MHB4OwoJYmFja2dyb3VuZDogIzI5MjkyZTsKCWNvbG9yOiAjZTRlNGU3OwoJYm9yZGVyOiAxcHggc29saWQgIzUyNTI1YjsKCWJvcmRlci1yYWRpdXM6IDZweDsKCXBhZGRpbmc6IDhweCAxMHB4OwoJZm9udC1zaXplOiAxM3B4OwoJZm9udC1mYW1pbHk6IHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgc2Fucy1zZXJpZiwgIkFwcGxlIENvbG9yIEVtb2ppIiwgIlNlZ29lIFVJIEVtb2ppIiwgIlNlZ29lIFVJIFN5bWJvbCIsICJOb3RvIENvbG9yIEVtb2ppIjsKCWxpbmUtaGVpZ2h0OiAxLjU7Cglib3gtc2hhZG93OiAwIDRweCAxNnB4IHJnYmEoMCwgMCwgMCwgMC41KTsKCXBvaW50ZXItZXZlbnRzOiBub25lOwoJd2hpdGUtc3BhY2U6IG5vcm1hbDsKCXdvcmQtYnJlYWs6IGJyZWFrLWFsbDsKfQoKLm5teC1mY3AtaGFzaC10b29sdGlwLXRpdGxlIHsKCWZvbnQtd2VpZ2h0OiA2MDA7CgltYXJnaW4tYm90dG9tOiA0cHg7Cgljb2xvcjogI2ZhZmFmYTsKfQoKLm5teC1mY3AtaGFzaC10b29sdGlwIHVsIHsKCW1hcmdpbjogMDsKCXBhZGRpbmctbGVmdDogMTZweDsKfQoKLm5teC1mY3AtY29udGV4dC1tZW51IHsKCXBvc2l0aW9uOiBmaXhlZDsKCXotaW5kZXg6IDEwMDAwOwoJZGlzcGxheTogbm9uZTsKCW1pbi13aWR0aDogMTYwcHg7CgliYWNrZ3JvdW5kOiAjMjkyOTJlOwoJYm9yZGVyOiAxcHggc29saWQgIzUyNTI1YjsKCWJvcmRlci1yYWRpdXM6IDZweDsKCXBhZGRpbmc6IDRweDsKCWJveC1zaGFkb3c6IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjUpOwp9Cgoubm14LWZjcC1jb250ZXh0LW1lbnUtaXRlbSB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogOHB4OwoJd2lkdGg6IDEwMCU7Cgl0ZXh0LWFsaWduOiBsZWZ0OwoJYmFja2dyb3VuZDogbm9uZTsKCWJvcmRlcjogbm9uZTsKCWNvbG9yOiAjZTRlNGU3OwoJZm9udC1zaXplOiAxM3B4OwoJcGFkZGluZzogNnB4IDEwcHg7Cglib3JkZXItcmFkaXVzOiA0cHg7CgljdXJzb3I6IHBvaW50ZXI7CgoJJjpob3ZlciB7CgkJYmFja2dyb3VuZDogIzNlM2U0NzsKCX0KfQoKLm5teC1mY3AtY29udGV4dC1tZW51LWljb24gewoJZmxleDogMCAwIGF1dG87CglmaWxsOiBjdXJyZW50Q29sb3I7Cn0KCi5ubXgtZmNwLWNvbnRleHQtbWVudS1kaXZpZGVyIHsKCWhlaWdodDogMXB4OwoJbWFyZ2luOiA0cHggNnB4OwoJYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTsKfQo=",
		"src/shared/image-viewer.css":
			"Cgojbm14LWltYWdlLXZpZXdlciB7Cglwb3NpdGlvbjogZml4ZWQ7CglpbnNldDogMDsKCWRpc3BsYXk6IG5vbmU7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJZ2FwOiAxMHB4OwoJcGFkZGluZzogMTBweCAwOwoJYm94LXNpemluZzogYm9yZGVyLWJveDsKCWJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC45Mik7Cgl6LWluZGV4OiAyMTQ3NDgzMDAwOwoKCSYubm14LW9wZW46bm90KC5ubXgtcGF1c2VkKSB7CgkJZGlzcGxheTogZmxleDsKCX0KfQoKYm9keS5ubXgtaW1hZ2Utdmlld2VyLWxvY2tlZCB7CglvdmVyZmxvdzogaGlkZGVuOwp9Cgojbm14LWltYWdlLXZpZXdlci10b3BiYXIgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDAgMCBhdXRvOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCWdhcDogMTBweDsKCXBhZGRpbmc6IDAgMjBweDsKCWNvbG9yOiB3aGl0ZTsKfQoKI25teC1pbWFnZS12aWV3ZXItbGFiZWwtZ3JvdXAgewoJZGlzcGxheTogZmxleDsKCW1pbi13aWR0aDogMDsKCWFsaWduLWl0ZW1zOiBiYXNlbGluZTsKCWdhcDogMTBweDsKfQoKI25teC1pbWFnZS12aWV3ZXItZ3JvdXAtbGFiZWwgewoJb3ZlcmZsb3c6IGhpZGRlbjsKCWZvbnQtc2l6ZTogMThweDsKCWZvbnQtd2VpZ2h0OiA2MDA7Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoJdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7Cn0KCiNubXgtaW1hZ2Utdmlld2VyLXBvc2l0aW9uIHsKCWZvbnQtc2l6ZTogMTNweDsKCXdoaXRlLXNwYWNlOiBub3dyYXA7CglvcGFjaXR5OiAwLjc7Cn0KCiNubXgtaW1hZ2Utdmlld2VyLXRvcC1hY3Rpb25zIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWdhcDogOHB4Owp9Cgoubm14LWltYWdlLXZpZXdlci1pY29uLWJ0biB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJd2lkdGg6IDM2cHg7CgloZWlnaHQ6IDM2cHg7Cglib3JkZXI6IG5vbmU7Cglib3JkZXItcmFkaXVzOiA5OTlweDsKCWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCk7Cgljb2xvcjogd2hpdGU7CgljdXJzb3I6IHBvaW50ZXI7Cgl0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2U7CgoJJiA+IHN2ZyB7CgkJd2lkdGg6IDIwcHg7CgkJaGVpZ2h0OiAyMHB4OwoJCWZpbGw6IGN1cnJlbnRjb2xvcjsKCX0KCgkmOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTgpOwoJfQoKCSYubm14LWFjdGl2ZSB7CgkJYmFja2dyb3VuZDogdmFyKC0tY29sb3Itb3JhbmdlLTUwMCk7Cgl9CgoJJi5ubXgtYWN0aXZlOmhvdmVyIHsKCQliYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1vcmFuZ2UtNDAwKTsKCX0KfQoKI25teC1pbWFnZS12aWV3ZXItdG9vbGJhciB7CglkaXNwbGF5OiBmbGV4OwoJZmxleDogMSAxIGF1dG87CglhbGlnbi1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglmbGV4LXdyYXA6IHdyYXA7CglnYXA6IDE2cHg7CgltaW4td2lkdGg6IDA7Cn0KCi5ubXgtaW1hZ2Utdmlld2VyLXpvb20tY29udHJvbCwKLm5teC1pbWFnZS12aWV3ZXItc2xpZGVyLWdyb3VwIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA2cHg7Cgljb2xvcjogd2hpdGU7Cglmb250LXNpemU6IDEycHg7Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoJY3Vyc29yOiBkZWZhdWx0OwoKCSYgPiBpbnB1dFt0eXBlPSJyYW5nZSJdIHsKCQlhY2NlbnQtY29sb3I6IHZhcigtLWNvbG9yLW9yYW5nZS01MDApOwoJCWN1cnNvcjogcG9pbnRlcjsKCX0KfQoKI25teC1pbWFnZS12aWV3ZXItbWFnbmlmaWVyLXBhbmVsIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiAxNnB4OwoKCgkmW2hpZGRlbl0gewoJCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKCX0KfQoKI25teC1pbWFnZS12aWV3ZXItdGh1bWItYmFyIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4OiAwIDAgYXV0bzsKCWdhcDogMTRweDsKCW92ZXJmbG93LXg6IGF1dG87CglvdmVyZmxvdy15OiBoaWRkZW47CglwYWRkaW5nOiA0cHggMjBweCAxMHB4OwoJYm94LXNpemluZzogYm9yZGVyLWJveDsKfQoKLm5teC1pbWFnZS12aWV3ZXItdGh1bWItZ3JvdXAgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDAgMCBhdXRvOwoJZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKCWdhcDogNnB4OwoJcGFkZGluZy1yaWdodDogMTRweDsKCWJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xOCk7CgoJJjpsYXN0LWNoaWxkIHsKCQlwYWRkaW5nLXJpZ2h0OiAwOwoJCWJvcmRlci1yaWdodDogbm9uZTsKCX0KfQoKLm5teC1pbWFnZS12aWV3ZXItdGh1bWItZ3JvdXAtbGFiZWwgewoJb3ZlcmZsb3c6IGhpZGRlbjsKCW1heC13aWR0aDogMjIwcHg7Cgl3aGl0ZS1zcGFjZTogbm93cmFwOwoJdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7Cgl0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOwoJZm9udC1zaXplOiAxMXB4OwoJbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTsKCWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNTUpOwp9Cgoubm14LWltYWdlLXZpZXdlci10aHVtYi1ncm91cC1pdGVtcyB7CglkaXNwbGF5OiBmbGV4OwoJZ2FwOiA2cHg7Cn0KCi5ubXgtaW1hZ2Utdmlld2VyLXRodW1ibmFpbCB7Cglwb3NpdGlvbjogcmVsYXRpdmU7CglmbGV4OiAwIDAgYXV0bzsKCWhlaWdodDogNTZweDsKCXdpZHRoOiA1NnB4OwoJcGFkZGluZzogMDsKCW92ZXJmbG93OiBoaWRkZW47Cglib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1jb2xvci1vcmFuZ2UtOTAwKTsKCWJvcmRlci1yYWRpdXM6IDRweDsKCWJhY2tncm91bmQ6IGJsYWNrOwoJY3Vyc29yOiBwb2ludGVyOwoJb3BhY2l0eTogMC41NTsKCXRyYW5zaXRpb246CgkJb3BhY2l0eSAwLjJzLAoJCWJvcmRlci1jb2xvciAwLjJzOwoKCSYgPiBpbWcgewoJCWhlaWdodDogMTAwJTsKCQl3aWR0aDogMTAwJTsKCQlvYmplY3QtZml0OiBjb3ZlcjsKCX0KCgkmOmhvdmVyIHsKCQlvcGFjaXR5OiAwLjg1OwoJfQoKCSYubm14LWN1cnJlbnQgewoJCWJvcmRlci1jb2xvcjogdmFyKC0tY29sb3Itb3JhbmdlLTUwMCk7CgkJb3BhY2l0eTogMTsKCX0KCgkmW2RhdGEtbm14LWJhZGdlXTo6YWZ0ZXIgewoJCWNvbnRlbnQ6IGF0dHIoZGF0YS1ubXgtYmFkZ2UpOwoJCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCQlyaWdodDogMnB4OwoJCWJvdHRvbTogMXB4OwoJCWZvbnQtc2l6ZTogMTBweDsKCQljb2xvcjogZ29sZDsKCQl0ZXh0LXNoYWRvdzogMCAwIDJweCBibGFjazsKCX0KfQoKI25teC1pbWFnZS12aWV3ZXItaW1hZ2UgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDEgMSBhdXRvOwoJbWluLWhlaWdodDogMDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCW92ZXJmbG93OiBoaWRkZW47CgljdXJzb3I6IHpvb20tb3V0OwoJdXNlci1zZWxlY3Q6IG5vbmU7CgoJJiA+IGltZyB7CgkJbWF4LWhlaWdodDogMTAwJTsKCQltYXgtd2lkdGg6IDkwJTsKCQlib3JkZXItcmFkaXVzOiA2cHg7CgkJcG9pbnRlci1ldmVudHM6IG5vbmU7CgkJdXNlci1zZWxlY3Q6IG5vbmU7CgkJdHJhbnNpdGlvbjoKCQkJb3BhY2l0eSAwLjJzIGVhc2UsCgkJCXRyYW5zZm9ybSAwLjE1cyBlYXNlOwoJfQoKCgkmLm5teC16b29tZWQgewoJCWN1cnNvcjogZ3JhYjsKCX0KCgoJJi5ubXgtZHJhZ2dpbmcgewoJCWN1cnNvcjogZ3JhYmJpbmc7CgoJCSYgPiBpbWcgewoJCQl0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZTsKCQl9Cgl9Cn0KCiNubXgtaW1hZ2Utdmlld2VyLW1hZ25pZmllci1sZW5zIHsKCXBvc2l0aW9uOiBmaXhlZDsKCWRpc3BsYXk6IG5vbmU7Cglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KTsKCWJvcmRlci1yYWRpdXM6IDUwJTsKCWJhY2tncm91bmQtY29sb3I6IGJsYWNrOwoJYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsKCWJveC1zaGFkb3c6IDAgMCAxNnB4IHJnYmEoMCwgMCwgMCwgMC42NSk7Cglwb2ludGVyLWV2ZW50czogbm9uZTsKCgkmLm5teC12aXNpYmxlIHsKCQlkaXNwbGF5OiBibG9jazsKCX0KfQoKI25teC1pbWFnZS12aWV3ZXItY29udHJvbHMgewoJZGlzcGxheTogZmxleDsKCWZsZXg6IDAgMCBhdXRvOwoJZmxleC13cmFwOiB3cmFwOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglnYXA6IDhweDsKCXBhZGRpbmc6IDAgMjBweDsKCgkmOmVtcHR5IHsKCQlkaXNwbGF5OiBub25lOwoJfQp9Cgoubm14LWltYWdlLXZpZXdlci1jb250cm9sIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiA2cHg7CglwYWRkaW5nOiA4cHggMTRweDsKCWJvcmRlcjogbm9uZTsKCWJvcmRlci1yYWRpdXM6IDZweDsKCWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTsKCWNvbG9yOiB3aGl0ZTsKCWN1cnNvcjogcG9pbnRlcjsKCWZvbnQtc2l6ZTogMTNweDsKCXRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTsKCgkmID4gc3ZnIHsKCQloZWlnaHQ6IDE2cHg7CgkJd2lkdGg6IDE2cHg7CgkJZmlsbDogY3VycmVudGNvbG9yOwoJfQoKCSY6aG92ZXIgewoJCWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTsKCX0KCgkmLm5teC1kaXNhYmxlZCB7CgkJY3Vyc29yOiBub3QtYWxsb3dlZDsKCQlvcGFjaXR5OiAwLjM1OwoJCXBvaW50ZXItZXZlbnRzOiBub25lOwoJfQp9Cgoubm14LWltYWdlLXZpZXdlci1hcnJvdyB7Cglwb3NpdGlvbjogYWJzb2x1dGU7Cgl0b3A6IDUwJTsKCWNvbG9yOiB3aGl0ZTsKCWN1cnNvcjogcG9pbnRlcjsKCWZvbnQtc2l6ZTogNDhweDsKCWxpbmUtaGVpZ2h0OiAxOwoJb3BhY2l0eTogMC43OwoJdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpOwoJdHJhbnNpdGlvbjogb3BhY2l0eSAwLjE1cyBlYXNlOwoJdXNlci1zZWxlY3Q6IG5vbmU7CgoJJjpob3ZlciB7CgkJb3BhY2l0eTogMTsKCX0KCgkmLm5teC1sZWZ0LWFycm93IHsKCQlsZWZ0OiAxNXB4OwoJfQoKCSYubm14LXJpZ2h0LWFycm93IHsKCQlyaWdodDogMTVweDsKCX0KfQoKLm5teC10cmFuc3BhcmVudCB7CglvcGFjaXR5OiAwOwp9CgoKLm5teC1oaWdobGlnaHQgewoJb3V0bGluZTogM3B4IHNvbGlkIHZhcigtLWNvbG9yLW9yYW5nZS01MDApOwoJb3V0bGluZS1vZmZzZXQ6IDNweDsKfQo=",
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

var RISK_TIERS = {
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
		"cdmod",
		"cfg",
		"config",
		"csproj",
		"css",
		"csv",
		"cube",
		"cur",
		"db",
		"db",
		"dcx",
		"dds",
		"dlodsettings",
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
		"fxh",
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
		"kf",
		"lip",
		"log",
		"lst",
		"m2ts",
		"m2v",
		"m4a",
		"m4b",
		"m4p",
		"m4v",
		"manifest",
		"mcmeta",
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
		"settings",
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

var FILE_METADATA_BASE = "https://file-metadata.nexusmods.com/file/nexus-files-s3-meta";

var RISK_TIER_SETS = Object.fromEntries(
	Object.entries(RISK_TIERS).map(([tier, exts]) => [
		tier,
		new Set(exts),
	]),
);

var FILENAME_SPOOFING_CODE_POINTS = [
	8203,
	8204,
	8205,
	8206,
	8207,
	8234,
	8235,
	8236,
	8237,
	8238,
	8294,
	8295,
	8296,
	8297,
	65279,
];

var UNICODE_BIDI_OVERRIDE_CHARS = new Set(
	[
		8237,
		8238,
	].map((cp) => String.fromCodePoint(cp)),
);

var UNICODE_BIDI_EMBEDDING_CHARS = new Set(
	[
		8234,
		8235,
	].map((cp) => String.fromCodePoint(cp)),
);

var UNICODE_BIDI_EMBEDDING_OR_OVERRIDE_CLOSE = String.fromCodePoint(8236);

var UNICODE_BIDI_ISOLATE_CHARS = new Set(
	[
		8294,
		8295,
		8296,
	].map((cp) => String.fromCodePoint(cp)),
);

var UNICODE_BIDI_ISOLATE_CLOSE = String.fromCodePoint(8297);

var UNICODE_ZERO_WIDTH_NON_JOINER = String.fromCodePoint(8204);

var UNICODE_ZERO_WIDTH_JOINER = String.fromCodePoint(8205);

var ARABIC_SCRIPT_CODE_POINT_RANGES = [
	[
		1536,
		1791,
	],
	[
		1872,
		1919,
	],
	[
		2208,
		2303,
	],
	[
		64336,
		65023,
	],
	[
		65136,
		65279,
	],
];

var EMOJI_VARIATION_SELECTOR_CODE_POINTS = new Set([
	65038,
	65039,
]);

var EMOJI_CATEGORY_RE = /\p{So}|\p{Sk}/u;

var FILENAME_SPOOFING_CHAR_CLASS = `[${FILENAME_SPOOFING_CODE_POINTS.map(codePointEscape).join("")}]`;

var FILENAME_SPOOFING_RE = new RegExp(FILENAME_SPOOFING_CHAR_CLASS);

var FILENAME_SPOOFING_SPLIT_RE = new RegExp(`(${FILENAME_SPOOFING_CHAR_CLASS})`);

var FILENAME_SPOOFING_FILTER = `/${FILENAME_SPOOFING_CHAR_CLASS}/`;

function codePointEscape(codePoint) {
	return `\\u${codePoint.toString(16).padStart(4, "0")}`;
}

function isArabicScriptChar(char) {
	if (!char) return false;
	const codePoint = char.codePointAt(0);
	return ARABIC_SCRIPT_CODE_POINT_RANGES.some(([start, end]) => codePoint >= start && codePoint <= end);
}

function isEmojiLikeChar(char) {
	if (!char) return false;
	if (EMOJI_VARIATION_SELECTOR_CODE_POINTS.has(char.codePointAt(0))) return true;
	return EMOJI_CATEGORY_RE.test(char);
}

function isExemptSpoofingChar(codePoints, index, char) {
	const before = index > 0 ? codePoints[index - 1] : "";
	const after = index + 1 < codePoints.length ? codePoints[index + 1] : "";
	if (char === UNICODE_ZERO_WIDTH_NON_JOINER) return isArabicScriptChar(before) || isArabicScriptChar(after);
	if (char === UNICODE_ZERO_WIDTH_JOINER) return isEmojiLikeChar(before) || isEmojiLikeChar(after);
	return false;
}

function toCodePoints(str) {
	return Array.from(str);
}

function flaggedSpoofingIndexes(str) {
	const codePoints = toCodePoints(str);
	const flagged = new Set();
	codePoints.forEach((char, index) => {
		if (FILENAME_SPOOFING_RE.test(char) && !isExemptSpoofingChar(codePoints, index, char)) flagged.add(index);
	});
	return {
		codePoints: codePoints,
		flagged: flagged,
	};
}

function hasFilenameSpoofingChars(name) {
	return flaggedSpoofingIndexes(name).flagged.size > 0;
}

function stripFilenameSpoofingChars(name) {
	return name
		.split(FILENAME_SPOOFING_SPLIT_RE)
		.filter((part) => !FILENAME_SPOOFING_RE.test(part))
		.join("");
}

function renderFilenameInto(el, name) {
	const { codePoints: codePoints, flagged: flagged } = flaggedSpoofingIndexes(name);
	let buffer = "";
	const flushBuffer = () => {
		if (buffer) el.appendChild(document.createTextNode(buffer));
		buffer = "";
	};
	codePoints.forEach((char, index) => {
		if (!flagged.has(index)) {
			buffer += char;
			return;
		}
		flushBuffer();
		const marker = document.createElement("span");
		marker.className = "nmx-fcp-bidi-char";
		marker.textContent = `<U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}>`;
		el.appendChild(marker);
	});
	flushBuffer();
}

function escapeFilenameSpoofingChars(name) {
	const { codePoints: codePoints, flagged: flagged } = flaggedSpoofingIndexes(name);
	return codePoints
		.map((char, index) => (flagged.has(index) ? `<U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}>` : char))
		.join("");
}

function overrideSpansExtension(path) {
	const codePoints = toCodePoints(path);
	let lastSlash = -1;
	for (let i = 0; i < codePoints.length; i++) if (codePoints[i] === "/") lastSlash = i;
	let extensionStart = -1;
	for (let i = lastSlash + 1; i < codePoints.length; i++) if (codePoints[i] === ".") extensionStart = i;
	if (extensionStart === -1) return false;
	const prefix = codePoints.slice(0, extensionStart);
	if (prefix.some((char) => UNICODE_BIDI_ISOLATE_CHARS.has(char) || char === UNICODE_BIDI_ISOLATE_CLOSE)) return false;
	const stack = [];
	for (const char of prefix) {
		if (UNICODE_BIDI_OVERRIDE_CHARS.has(char) || UNICODE_BIDI_EMBEDDING_CHARS.has(char)) stack.push(char);
		else if (char === UNICODE_BIDI_EMBEDDING_OR_OVERRIDE_CLOSE && stack.length) stack.pop();
	}
	return stack.some((char) => UNICODE_BIDI_OVERRIDE_CHARS.has(char));
}

function classifyUnicodeFilenameSpoofing(path) {
	if (!hasFilenameSpoofingChars(path)) return null;
	return overrideSpansExtension(path) ? "extension-disguise" : "suspicious-formatting";
}

function collectSpoofedNodes(nodes, disguised = [], formatting = [], ancestorFlagged = false) {
	for (const node of nodes) {
		const tier = classifyUnicodeFilenameSpoofing(node.fullPath);
		if (tier === "extension-disguise") disguised.push(node);
		else if (tier === "suspicious-formatting" && !ancestorFlagged) formatting.push(node);
		if (node.type === "dir") {
			collectSpoofedNodes(node.children, disguised, formatting, ancestorFlagged || hasFilenameSpoofingChars(node.name));
		}
	}
	return [
		disguised,
		formatting,
	];
}

var currentModalTree;

var modalKeyHandler;

var modalCssTextPromise;

var filterDebounceTimer;

var bodyOverflowBeforeModal;

var FILTER_DEBOUNCE_MS = 150;

var REMEMBERED_STORAGE_KEY = "nmxRememberedFileHashes";

function hasSessionStorage() {
	return Boolean(browser.storage?.session);
}

async function loadRememberedFileSet() {
	try {
		if (hasSessionStorage()) {
			const result = await browser.storage.session.get(REMEMBERED_STORAGE_KEY);
			return result[REMEMBERED_STORAGE_KEY];
		}
		const raw = localStorage.getItem(REMEMBERED_STORAGE_KEY);
		return raw ? JSON.parse(raw) : undefined;
	} catch {
		return undefined;
	}
}

function getModPageUrl() {
	return document.querySelector('meta[property="og:url"]')?.content || location.href;
}

async function saveRememberedFileSet(sourceUrl, hashToPaths) {
	const value = {
		sourceUrl: sourceUrl,
		hashToPaths: hashToPaths,
		modPageUrl: getModPageUrl(),
	};
	if (hasSessionStorage()) {
		await browser.storage.session.set({
			[REMEMBERED_STORAGE_KEY]: value,
		});
		return;
	}
	localStorage.setItem(REMEMBERED_STORAGE_KEY, JSON.stringify(value));
}

async function clearRememberedFileSet() {
	if (hasSessionStorage()) {
		await browser.storage.session.remove(REMEMBERED_STORAGE_KEY);
		return;
	}
	localStorage.removeItem(REMEMBERED_STORAGE_KEY);
}

var HASH_TOOLTIP_SHOW_DELAY_MS = 300;

var hashTooltipShowTimer;

var hashTooltipEl;

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
	bodyOverflowBeforeModal = document.body.style.overflow;
	document.body.style.overflow = "hidden";
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
	if (bodyOverflowBeforeModal !== undefined) {
		document.body.style.overflow = bodyOverflowBeforeModal;
		bodyOverflowBeforeModal = undefined;
	}
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
	const [disguisedNodes, formattingNodes] = collectSpoofedNodes(tree);
	if (disguisedNodes.length) {
		const spoofBadge = document.createElement("span");
		spoofBadge.className = "nmx-fcp-risk nmx-fcp-risk--spoofed";
		spoofBadge.textContent = `⚠ ${disguisedNodes.length} DISGUISED NAME${disguisedNodes.length === 1 ? "" : "S"}`;
		spoofBadge.title = disguisedNodes.map((node) => escapeFilenameSpoofingChars(node.name)).join("\n");
		spoofBadge.addEventListener("click", () => {
			filterInput.value = filterInput.value === FILENAME_SPOOFING_FILTER ? "" : FILENAME_SPOOFING_FILTER;
			clearTimeout(filterDebounceTimer);
			applyFilter(filterInput.value);
		});
		meta.appendChild(spoofBadge);
	}
	if (formattingNodes.length) {
		const formattingBadge = document.createElement("span");
		formattingBadge.className = "nmx-fcp-risk nmx-fcp-risk--formatting";
		formattingBadge.textContent = `${formattingNodes.length} UNUSUAL NAME${formattingNodes.length === 1 ? "" : "S"}`;
		formattingBadge.title = formattingNodes.map((node) => escapeFilenameSpoofingChars(node.name)).join("\n");
		formattingBadge.addEventListener("click", () => {
			filterInput.value = filterInput.value === FILENAME_SPOOFING_FILTER ? "" : FILENAME_SPOOFING_FILTER;
			clearTimeout(filterDebounceTimer);
			applyFilter(filterInput.value);
		});
		meta.appendChild(formattingBadge);
	}
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

async function wireHashComparison(shadowRoot, tree, url) {
	const rememberBtn = shadowRoot.querySelector(".nmx-fcp-remember-btn");
	const compareBtn = shadowRoot.querySelector(".nmx-fcp-compare-btn");
	const goToModBtn = shadowRoot.querySelector(".nmx-fcp-goto-btn");
	const forgetBtn = shadowRoot.querySelector(".nmx-fcp-forget-btn");
	const treeContainer = shadowRoot.querySelector(".nmx-fcp-tree");
	const hashEntries = collectFileHashes(tree);
	const hasHashes = hashEntries.length > 0;
	async function refreshButtons() {
		const remembered = await loadRememberedFileSet();
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
	await refreshButtons();
	forgetBtn.addEventListener("click", async () => {
		await clearRememberedFileSet();
		clearHashComparison(hashEntries);
		compareBtn.disabled = false;
		compareBtn.textContent = "Compare";
		await refreshButtons();
	});
	if (!hasHashes) return;
	rememberBtn.addEventListener("click", async () => {
		const hashToPaths = {};
		for (const { path: path, sha256: sha256 } of hashEntries) {
			if (!hashToPaths[sha256]) hashToPaths[sha256] = [];
			hashToPaths[sha256].push(path);
		}
		await saveRememberedFileSet(url, hashToPaths);
		clearHashComparison(hashEntries);
		compareBtn.disabled = false;
		compareBtn.textContent = "Compare";
		await refreshButtons();
	});
	compareBtn.addEventListener("click", async () => {
		await applyHashComparison(shadowRoot, treeContainer, hashEntries);
		compareBtn.disabled = true;
		compareBtn.textContent = "Compared ✓";
	});
}

async function applyHashComparison(shadowRoot, treeContainer, hashEntries) {
	const remembered = await loadRememberedFileSet();
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
		item.textContent = escapeFilenameSpoofingChars(path);
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

var fileContextMenuEl;

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

var SVG_NS = "http://www.w3.org/2000/svg";

var COPY_ICON_PATH =
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
	if (node.hashVerifiedSafe) name.appendChild(document.createTextNode("✅ "));
	renderFilenameInto(name, node.name);
	const spoofingTier = classifyUnicodeFilenameSpoofing(node.fullPath);
	if (spoofingTier === "extension-disguise") {
		name.classList.add("nmx-fcp-name--spoofed");
		name.title = hasFilenameSpoofingChars(node.name)
			? `This name hides Unicode characters that change how it is drawn on screen. Real name: ${escapeFilenameSpoofingChars(node.name)}`
			: "A parent folder in this path leaves a Unicode direction override open, which can disguise this entry's real extension outside this modal (e.g. after extracting the archive).";
	} else if (spoofingTier === "suspicious-formatting") {
		name.classList.add("nmx-fcp-name--formatting");
		name.title = `This name contains unusual Unicode formatting/invisible characters, but doesn't appear to disguise its extension. Real name: ${escapeFilenameSpoofingChars(node.name)}`;
	}
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

var manifestDirIndexes = new WeakMap();

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
	const clean = stripFilenameSpoofingChars(name);
	const idx = clean.lastIndexOf(".");
	if (idx <= 0) return null;
	return clean.slice(idx + 1).toLowerCase();
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
	if (classifyUnicodeFilenameSpoofing(node.fullPath) === "extension-disguise") return "high";
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

function nmxCreateImageViewer(options) {
	const classNMX = "nmx-element";
	const classOpen = "nmx-open";
	const classPaused = "nmx-paused";
	const classCurrent = "nmx-current";
	const classTransparent = "nmx-transparent";
	const classDisabled = "nmx-disabled";
	const classBodyLock = "nmx-image-viewer-locked";
	const classActive = "nmx-active";
	const classMagnifierVisible = "nmx-visible";
	const classSliderGroup = "nmx-image-viewer-slider-group";
	const classZoomControl = "nmx-image-viewer-zoom-control";
	const classZoomed = "nmx-zoomed";
	const classDragging = "nmx-dragging";
	const idOverlay = "nmx-image-viewer";
	const idTopBar = "nmx-image-viewer-topbar";
	const idLabelGroup = "nmx-image-viewer-label-group";
	const idGroupLabel = "nmx-image-viewer-group-label";
	const idPosition = "nmx-image-viewer-position";
	const idToolbar = "nmx-image-viewer-toolbar";
	const idMagnifierPanel = "nmx-image-viewer-magnifier-panel";
	const idMagnifierLens = "nmx-image-viewer-magnifier-lens";
	const idTopActions = "nmx-image-viewer-top-actions";
	const idThumbBar = "nmx-image-viewer-thumb-bar";
	const idImageBox = "nmx-image-viewer-image";
	const idControls = "nmx-image-viewer-controls";
	const classThumbGroup = "nmx-image-viewer-thumb-group";
	const classThumbGroupLabel = "nmx-image-viewer-thumb-group-label";
	const classThumbGroupItems = "nmx-image-viewer-thumb-group-items";
	const classThumbnail = "nmx-image-viewer-thumbnail";
	const classArrow = "nmx-image-viewer-arrow";
	const classArrowLeft = "nmx-left-arrow";
	const classArrowRight = "nmx-right-arrow";
	const classIconButton = "nmx-image-viewer-icon-btn";
	const classControlButton = "nmx-image-viewer-control";
	const iconClose =
		"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
	const iconMagnify =
		"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.49,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
	const lsKeyMagnifier = "nmxImageViewerMagnifierPrefs";
	const defaultMagnifierSize = 200;
	const defaultMagnifierPower = 3;
	let groups = [];
	let entries = [];
	let currentId = null;
	let thumbBarSignature = null;
	let lastWheelTime = 0;
	let swapTimer;
	let overlay, groupLabelEl, positionEl, thumbBar, imageBox, mainImage, controlsBar;
	const topActionRecords = [];
	let magnifierBtn, magnifierPanel, magnifierLens, zoomSlider;
	let magnifierEnabled = false;
	let magnifierSize = defaultMagnifierSize;
	let magnifierPower = defaultMagnifierPower;
	let imageZoom = 1;
	let lastPointer = null;
	let panX = 0;
	let panY = 0;
	let isDragging = false;
	let dragMoved = false;
	let dragStart = null;
	let panStart = null;
	const api = {
		open: open,
		close: close,
		refresh: refresh,
		isOpen: isOpen,
		setPaused: setPaused,
		current: current,
		destroy: destroy,
		createControlButton: createControlButton,
		createIconButton: createIconButton,
	};
	function ensureOverlay() {
		if (overlay) return;
		const prefs = loadMagnifierPrefs();
		magnifierEnabled = prefs.enabled ?? false;
		magnifierSize = prefs.size ?? defaultMagnifierSize;
		magnifierPower = prefs.power ?? defaultMagnifierPower;
		overlay = document.createElement("div");
		overlay.id = idOverlay;
		overlay.classList.add(classNMX);
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", options.ariaLabel ?? "Image viewer");
		const topBar = document.createElement("div");
		topBar.id = idTopBar;
		const labelGroup = document.createElement("div");
		labelGroup.id = idLabelGroup;
		groupLabelEl = document.createElement("span");
		groupLabelEl.id = idGroupLabel;
		positionEl = document.createElement("span");
		positionEl.id = idPosition;
		labelGroup.append(groupLabelEl, positionEl);
		const topActions = document.createElement("div");
		topActions.id = idTopActions;
		(options.topActions ?? []).forEach((action) => {
			const btn = createIconButton(resolveTopActionValue(action.icon, null), resolveTopActionValue(action.label, null), () =>
				action.onClick(current(), api),
			);
			topActionRecords.push({
				action: action,
				btn: btn,
			});
			topActions.appendChild(btn);
		});
		topActions.appendChild(createIconButton(iconClose, "Close", () => close()));
		const toolbar = buildToolbar();
		topBar.append(labelGroup, toolbar, topActions);
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
		leftArrow.addEventListener("click", () => step(-1));
		const rightArrow = document.createElement("div");
		rightArrow.classList.add(classArrow, classArrowRight);
		rightArrow.textContent = "›";
		rightArrow.addEventListener("click", () => step(1));
		magnifierLens = document.createElement("div");
		magnifierLens.id = idMagnifierLens;
		overlay.append(topBar, thumbBar, imageBox, controlsBar, leftArrow, rightArrow, magnifierLens);
		document.documentElement.appendChild(overlay);
		overlay.addEventListener("click", (e) => {
			if (dragMoved) {
				dragMoved = false;
				return;
			}
			if (e.target === overlay || e.target === imageBox) close();
		});
		imageBox.addEventListener("wheel", onWheel, {
			passive: false,
		});
		imageBox.addEventListener("mousemove", onImageMouseMove);
		imageBox.addEventListener("mouseleave", () => {
			lastPointer = null;
			hideMagnifier();
		});
		imageBox.addEventListener("pointerdown", onImagePointerDown);
		imageBox.addEventListener("pointermove", onImagePointerMove);
		imageBox.addEventListener("pointerup", onImagePointerUp);
		imageBox.addEventListener("pointercancel", onImagePointerUp);
		thumbBar.addEventListener("wheel", onThumbBarWheel, {
			passive: false,
		});
		document.addEventListener("keydown", onKeyDown);
	}
	function resolveTopActionValue(value, entry) {
		return typeof value === "function" ? value(entry) : value;
	}
	function createIconButton(pathData, label, onClick) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.classList.add(classIconButton);
		btn.title = label;
		btn.setAttribute("aria-label", label);
		btn.appendChild(nmxCreateSvgIcon(pathData));
		btn.addEventListener("click", onClick);
		return btn;
	}
	function createControlButton(pathData, label, disabled, onClick) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.classList.add(classControlButton);
		if (disabled) btn.classList.add(classDisabled);
		btn.disabled = disabled;
		btn.appendChild(nmxCreateSvgIcon(pathData));
		const span = document.createElement("span");
		span.textContent = label;
		btn.appendChild(span);
		btn.addEventListener("click", onClick);
		return btn;
	}
	function createSliderControl(labelText, min, max, step, value, onInput) {
		const wrapper = document.createElement("label");
		wrapper.classList.add(classSliderGroup);
		const span = document.createElement("span");
		span.textContent = labelText;
		const input = document.createElement("input");
		input.type = "range";
		input.min = String(min);
		input.max = String(max);
		input.step = String(step);
		input.value = String(value);
		input.addEventListener("input", () => onInput(Number(input.value)));
		wrapper.append(span, input);
		return {
			wrapper: wrapper,
			input: input,
		};
	}
	function buildToolbar() {
		const toolbar = document.createElement("div");
		toolbar.id = idToolbar;
		const zoomControl = createSliderControl("Zoom", 1, 4, 0.1, imageZoom, applyImageZoom);
		zoomControl.wrapper.classList.add(classZoomControl);
		zoomSlider = zoomControl.input;
		magnifierBtn = createIconButton(iconMagnify, "Toggle magnifier", toggleMagnifier);
		magnifierBtn.setAttribute("aria-pressed", String(magnifierEnabled));
		magnifierBtn.classList.toggle(classActive, magnifierEnabled);
		const sizeControl = createSliderControl("Size", 100, 400, 10, magnifierSize, (value) => {
			magnifierSize = value;
			updateMagnifier();
			saveMagnifierPrefs();
		});
		const powerControl = createSliderControl("Power", 1.5, 6, 0.5, magnifierPower, (value) => {
			magnifierPower = value;
			updateMagnifier();
			saveMagnifierPrefs();
		});
		magnifierPanel = document.createElement("div");
		magnifierPanel.id = idMagnifierPanel;
		magnifierPanel.hidden = !magnifierEnabled;
		magnifierPanel.append(sizeControl.wrapper, powerControl.wrapper);
		toolbar.append(zoomControl.wrapper, magnifierBtn, magnifierPanel);
		return toolbar;
	}
	function toggleMagnifier() {
		magnifierEnabled = !magnifierEnabled;
		magnifierBtn.setAttribute("aria-pressed", String(magnifierEnabled));
		magnifierBtn.classList.toggle(classActive, magnifierEnabled);
		magnifierPanel.hidden = !magnifierEnabled;
		if (magnifierEnabled) updateMagnifier();
		else hideMagnifier();
		saveMagnifierPrefs();
	}
	function onImageMouseMove(e) {
		lastPointer = {
			x: e.clientX,
			y: e.clientY,
		};
		updateMagnifier();
	}
	function hideMagnifier() {
		magnifierLens?.classList.remove(classMagnifierVisible);
	}
	function updateMagnifier() {
		if (!magnifierEnabled || !lastPointer || !mainImage.getAttribute("src")) {
			hideMagnifier();
			return;
		}
		const rect = mainImage.getBoundingClientRect();
		const { x: x, y: y } = lastPointer;
		if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom || rect.width === 0 || rect.height === 0) {
			hideMagnifier();
			return;
		}
		const size = magnifierSize;
		const offsetX = x - rect.left;
		const offsetY = y - rect.top;
		magnifierLens.style.width = `${size}px`;
		magnifierLens.style.height = `${size}px`;
		magnifierLens.style.left = `${x - size / 2}px`;
		magnifierLens.style.top = `${y - size / 2}px`;
		magnifierLens.style.backgroundImage = `url("${mainImage.currentSrc || mainImage.src}")`;
		magnifierLens.style.backgroundSize = `${rect.width * magnifierPower}px ${rect.height * magnifierPower}px`;
		magnifierLens.style.backgroundPosition =
			`${-(offsetX * magnifierPower - size / 2)}px ` + `${-(offsetY * magnifierPower - size / 2)}px`;
		magnifierLens.classList.add(classMagnifierVisible);
	}
	function applyImageZoom(value) {
		imageZoom = value;
		if (value === 1) {
			panX = 0;
			panY = 0;
		} else {
			clampPan();
		}
		imageBox.classList.toggle(classZoomed, value > 1);
		applyImageTransform();
		updateMagnifier();
	}
	function resetImageZoom() {
		imageZoom = 1;
		panX = 0;
		panY = 0;
		imageBox.classList.remove(classZoomed);
		applyImageTransform();
		if (zoomSlider) zoomSlider.value = "1";
	}
	function applyImageTransform() {
		mainImage.style.transform = imageZoom === 1 ? "" : `translate(${panX}px, ${panY}px) scale(${imageZoom})`;
	}
	function clampPan() {
		const fittedWidth = mainImage.offsetWidth;
		const fittedHeight = mainImage.offsetHeight;
		const boxRect = imageBox.getBoundingClientRect();
		const maxPanX = Math.max(0, (fittedWidth * imageZoom - boxRect.width) / 2);
		const maxPanY = Math.max(0, (fittedHeight * imageZoom - boxRect.height) / 2);
		panX = Math.min(maxPanX, Math.max(-maxPanX, panX));
		panY = Math.min(maxPanY, Math.max(-maxPanY, panY));
	}
	function onImagePointerDown(e) {
		if (imageZoom <= 1 || e.button !== 0) return;
		isDragging = true;
		dragMoved = false;
		dragStart = {
			x: e.clientX,
			y: e.clientY,
		};
		panStart = {
			x: panX,
			y: panY,
		};
		imageBox.setPointerCapture(e.pointerId);
		imageBox.classList.add(classDragging);
		e.preventDefault();
	}
	function onImagePointerMove(e) {
		if (!isDragging) return;
		const dx = e.clientX - dragStart.x;
		const dy = e.clientY - dragStart.y;
		if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
		panX = panStart.x + dx;
		panY = panStart.y + dy;
		clampPan();
		applyImageTransform();
	}
	function onImagePointerUp(e) {
		if (!isDragging) return;
		isDragging = false;
		imageBox.classList.remove(classDragging);
		imageBox.releasePointerCapture(e.pointerId);
	}
	function loadMagnifierPrefs() {
		try {
			const raw = localStorage.getItem(lsKeyMagnifier);
			return raw ? JSON.parse(raw) : {};
		} catch {
			return {};
		}
	}
	function saveMagnifierPrefs() {
		try {
			localStorage.setItem(
				lsKeyMagnifier,
				JSON.stringify({
					enabled: magnifierEnabled,
					size: magnifierSize,
					power: magnifierPower,
				}),
			);
		} catch {}
	}
	function rebuildThumbBar() {
		const signature = JSON.stringify(
			groups.map((group) => [
				group.label,
				group.entries.map((entry) => [
					entry.id,
					entry.badge ?? "",
				]),
			]),
		);
		if (signature === thumbBarSignature) return;
		thumbBarSignature = signature;
		thumbBar.innerHTML = "";
		groups.forEach((group) => {
			const groupEl = document.createElement("div");
			groupEl.classList.add(classThumbGroup);
			const label = document.createElement("span");
			label.classList.add(classThumbGroupLabel);
			label.textContent = group.label ?? "";
			label.title = group.label ?? "";
			const items = document.createElement("div");
			items.classList.add(classThumbGroupItems);
			group.entries.forEach((entry) => {
				const thumb = document.createElement("button");
				thumb.type = "button";
				thumb.classList.add(classThumbnail);
				thumb.dataset.nmxImageId = entry.id;
				if (entry.badge) thumb.dataset.nmxBadge = entry.badge;
				thumb.title = entry.title || "Untitled image";
				const img = document.createElement("img");
				img.src = entry.thumbSrc ?? entry.fullSrc;
				img.alt = "";
				img.loading = "lazy";
				thumb.appendChild(img);
				thumb.addEventListener("click", () => open(entry.id));
				items.appendChild(thumb);
			});
			groupEl.append(label, items);
			thumbBar.appendChild(groupEl);
		});
	}
	function refresh() {
		const previousEntries = entries;
		const previousId = currentId;
		groups = (options.getGroups?.() ?? []).filter((group) => group.entries?.length);
		entries = groups.flatMap((group) => group.entries);
		if (overlay) rebuildThumbBar();
		if (!isOpen()) return;
		if (entries.length === 0) {
			close();
			return;
		}
		let idx = entries.findIndex((entry) => entry.id === previousId);
		if (idx === -1) {
			const oldIdx = previousEntries.findIndex((entry) => entry.id === previousId);
			idx = Math.min(Math.max(oldIdx, 0), entries.length - 1);
		}
		currentId = entries[idx].id;
		render();
	}
	function groupLabelFor(entry) {
		return groups.find((group) => group.entries.includes(entry))?.label ?? "";
	}
	function render() {
		const idx = entries.findIndex((entry) => entry.id === currentId);
		const entry = entries[idx];
		if (!entry) return;
		showImage(entry);
		groupLabelEl.textContent = groupLabelFor(entry);
		positionEl.textContent = `${idx + 1} / ${entries.length}`;
		topActionRecords.forEach(({ action: action, btn: btn }) => {
			if (typeof action.label === "function") {
				const label = resolveTopActionValue(action.label, entry);
				if (btn.title !== label) {
					btn.title = label;
					btn.setAttribute("aria-label", label);
				}
			}
			if (typeof action.icon === "function") {
				const icon = resolveTopActionValue(action.icon, entry);
				if (btn.dataset.nmxIconKey !== icon) {
					btn.dataset.nmxIconKey = icon;
					btn.replaceChildren(nmxCreateSvgIcon(icon));
				}
			}
		});
		thumbBar.querySelector(`.${classThumbnail}.${classCurrent}`)?.classList.remove(classCurrent);
		const activeThumb = thumbBar.querySelector(`[data-nmx-image-id="${CSS.escape(entry.id)}"]`);
		activeThumb?.classList.add(classCurrent);
		activeThumb?.scrollIntoView({
			behavior: "smooth",
			inline: "center",
			block: "nearest",
		});
		controlsBar.innerHTML = "";
		options.renderControls?.(entry, controlsBar, api);
	}
	function showImage(entry) {
		mainImage.alt = entry.title || "";
		if (mainImage.getAttribute("src") === entry.fullSrc) {
			mainImage.classList.remove(classTransparent);
			return;
		}
		resetImageZoom();
		mainImage.classList.add(classTransparent);
		clearTimeout(swapTimer);
		swapTimer = setTimeout(() => {
			mainImage.onload = () => {
				mainImage.classList.remove(classTransparent);
				updateMagnifier();
			};
			mainImage.onerror = () => mainImage.classList.remove(classTransparent);
			mainImage.src = entry.fullSrc;
		}, 120);
	}
	function step(delta) {
		if (!entries.length) return;
		const idx = entries.findIndex((entry) => entry.id === currentId);
		const nextIdx = (idx + delta + entries.length) % entries.length;
		currentId = entries[nextIdx].id;
		render();
	}
	function open(id) {
		ensureOverlay();
		refresh();
		if (!entries.some((entry) => entry.id === id)) return;
		options.onOpen?.();
		setPaused(false);
		currentId = id;
		overlay.classList.add(classOpen);
		document.body.classList.add(classBodyLock);
		render();
	}
	function close() {
		if (!isOpen()) return;
		overlay.classList.remove(classOpen);
		overlay.classList.remove(classPaused);
		document.body.classList.remove(classBodyLock);
		clearTimeout(swapTimer);
		mainImage.removeAttribute("src");
		lastPointer = null;
		hideMagnifier();
	}
	function isOpen() {
		return !!overlay?.classList.contains(classOpen);
	}
	function setPaused(paused) {
		overlay?.classList.toggle(classPaused, paused);
	}
	function current() {
		return entries.find((entry) => entry.id === currentId);
	}
	function destroy() {
		document.removeEventListener("keydown", onKeyDown);
		document.body.classList.remove(classBodyLock);
		clearTimeout(swapTimer);
		overlay?.remove();
		overlay = undefined;
		groups = [];
		entries = [];
		currentId = null;
		thumbBarSignature = null;
	}
	function isTypingTarget(el) {
		return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
	}
	function onKeyDown(e) {
		if (!isOpen() || overlay.classList.contains(classPaused)) return;
		if (isTypingTarget(document.activeElement)) return;
		if (e.key === "Escape" || e.key === " " || e.code === "Space") {
			e.preventDefault();
			close();
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			step(-1);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			step(1);
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
	return api;
}

(() => {
	const settingName = "optToggleModEditMediaViewer";
	const classHighlight = "nmx-highlight";
	const classPeeking = "nmx-media-viewer-peeking";
	const SECTION_AUTHOR = "author";
	const SECTION_PENDING = "pending";
	const SECTION_APPROVED = "approved";
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
	let sections = [];
	let entries = [];
	let viewer;
	let watcher = null;
	let dialogWatcher;
	let menuHideRequests = 0;
	let pendingHighlightId;
	const controlsCacheById = new Map();
	nmxRegisterToggle(settingName, {
		cssFiles: [
			"src/shared/image-viewer.css",
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
		ensureViewer();
		startObserver();
		rescan();
	}
	function removeJS() {
		document.removeEventListener("click", onDocumentClick);
		stopObserver();
		dialogWatcher?.disconnect();
		dialogWatcher = undefined;
		viewer?.destroy();
		viewer = undefined;
		document.querySelectorAll("[data-nmx-image-id]").forEach((el) => {
			delete el.dataset.nmxImageId;
		});
		document.documentElement.classList.remove(classPeeking);
		menuHideRequests = 0;
		controlsCacheById.clear();
		sections = [];
		entries = [];
		pendingHighlightId = undefined;
	}
	function ensureViewer() {
		if (viewer) return;
		viewer = nmxCreateImageViewer({
			ariaLabel: "Image viewer",
			getGroups: () => sections,
			topActions: [
				{
					icon: iconLocate,
					label: "Close and scroll to image",
					onClick: (entry, api) => {
						api.close();
						scrollAndHighlight(entry?.li);
					},
				},
			],
			onOpen: () => {
				dialogWatcher?.disconnect();
				dialogWatcher = undefined;
			},
			renderControls: renderControls,
		});
	}
	function startObserver() {
		stopObserver();
		watcher = nmxWatchPage(rescan, {
			debounceMs: 200,
			ignorePortalChurn: true,
		});
	}
	function stopObserver() {
		watcher?.stop();
		watcher = null;
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
	function buildEntryFromLi(li, section, indexInSection) {
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
			li: li,
			menuButton: menuButton,
			title: title,
			uploader: uploader,
			badge: isThumbnail ? "★" : undefined,
			thumbSrc: thumbImg?.src ?? "",
			fullSrc: link?.href || thumbImg?.src || "",
		};
	}
	function rescan() {
		sections = findSectionHeadings()
			.map((descriptor) => {
				const ul = findGalleryList(descriptor);
				const items = ul ? Array.from(ul.querySelectorAll(":scope > li")) : [];
				return {
					section: descriptor.section,
					label: descriptor.label,
					entries: items.map((li, i) => buildEntryFromLi(li, descriptor.section, i)),
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
		viewer?.refresh();
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
	function renderControls(entry, controlsBar, api) {
		const entryId = entry.id;
		if (entry.fullSrc) {
			controlsBar.appendChild(
				api.createControlButton(iconOpenInNewTab, "Open in new tab", false, () => {
					window.open(entry.fullSrc, "_blank", "noopener,noreferrer");
				}),
			);
		}
		peekMenuItems(entry).then((items) => {
			if (api.current()?.id !== entryId) return;
			items
				.filter((item) => item.label.toLowerCase() !== "open in new tab")
				.forEach((item) => {
					const icon = menuItemIcons[item.label.toLowerCase()] ?? iconDefault;
					controlsBar.appendChild(
						api.createControlButton(icon, item.label, item.disabled, () => invokeMenuAction(entry, item.label)),
					);
				});
		});
	}
	function resolveMenuButton(entry) {
		if (entry.menuButton && document.contains(entry.menuButton)) return entry.menuButton;
		return entry.li?.querySelector('button[aria-haspopup="menu"]') ?? null;
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
		if (!isMenuButtonExpanded(button)) nmxSimulateClick(button);
		const menu = await waitForMenu(button);
		const items = menu ? extractMenuItems(menu) : [];
		if (isMenuButtonExpanded(button)) nmxSimulateClick(button);
		unhideRealMenusSoon();
		controlsCacheById.set(entry.id, items);
		return items;
	}
	async function invokeMenuAction(entry, label) {
		const button = resolveMenuButton(entry);
		if (!button?.id) return;
		hideRealMenus();
		if (!isMenuButtonExpanded(button)) nmxSimulateClick(button);
		const menu = await waitForMenu(button);
		const target = menu && findMenuItemByLabel(menu, label);
		if (!target || target.getAttribute("aria-disabled") === "true" || target.disabled) {
			if (isMenuButtonExpanded(button)) nmxSimulateClick(button);
			unhideRealMenusSoon();
			return;
		}
		nmxSimulateClick(target);
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
		viewer.setPaused(true);
		dialogWatcher?.disconnect();
		dialogWatcher = new MutationObserver(() => {
			if (!isAnyDialogOpen()) {
				dialogWatcher.disconnect();
				dialogWatcher = undefined;
				refreshAfterAction();
				viewer.setPaused(false);
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
		viewer?.open(id);
	}
})();
