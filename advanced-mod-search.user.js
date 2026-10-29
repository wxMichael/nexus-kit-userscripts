// ==UserScript==
// @name         Nexus Kit: 🔎 Advanced mod search
// @namespace    https://github.com/wxMichael/nexus-kit-userscripts
// @version      16.0
// @description  Adds match type toggles to mod search filters for Tags, Title, and Description fields, and a filter builder for any combination of the API's mod fields in AND/OR groups. Marks mods in search results and profile mod lists with their Generative AI Usage tags (AI Generated, AI Media, AI Assisted).
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
			"CltkYXRhLWUyZWlkPSJ0YWdzLWZpbHRlciJdID4gLnNwYWNlLXktMTpmaXJzdC1jaGlsZCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWNvbHVtbi1nYXA6IDAuNXJlbTsKfQoKW2RhdGEtZTJlaWQ9InRhZ3MtZmlsdGVyIl0gPiAuc3BhY2UteS0xOmZpcnN0LWNoaWxkID4gLnNwYWNlLXktMyB7CglmbGV4LWJhc2lzOiAxMDAlOwoKCW1pbi13aWR0aDogMDsKfQoKLm5teC10YWctbW9kZS10b2dnbGUgewoJbWluLWhlaWdodDogMDsKCXBhZGRpbmctdG9wOiAwLjEyNXJlbTsKCXBhZGRpbmctYm90dG9tOiAwLjEyNXJlbTsKfQoKCi5ubXgtdGFnLW1vZGUtdG9vbHRpcCB7Cglwb3NpdGlvbjogYWJzb2x1dGU7Cglwb2ludGVyLWV2ZW50czogbm9uZTsKfQoKLm5teC10YWctbW9kZS10b29sdGlwIHN2ZyB7Cglwb3NpdGlvbjogYWJzb2x1dGU7Cglwb2ludGVyLWV2ZW50czogbm9uZTsKfQoKLm5teC10YWctbW9kZS10b29sdGlwIHNwYW4gewoJd2hpdGUtc3BhY2U6IHByZS1saW5lOwoJdGV4dC1hbGlnbjogY2VudGVyOwp9CgoKW2RhdGEtZTJlaWQ9InNlYXJjaC1wYXJhbWV0ZXJzLWZpbHRlciJdIC53LWZ1bGw6aGFzKD4gI3RpdGxlLXNlYXJjaC1wYXJhbWV0ZXJzKSwKW2RhdGEtZTJlaWQ9InNlYXJjaC1wYXJhbWV0ZXJzLWZpbHRlciJdIC53LWZ1bGw6aGFzKD4gI2Rlc2NyaXB0aW9uLXNlYXJjaC1wYXJhbWV0ZXJzKSB7CglkaXNwbGF5OiBmbGV4OwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogMC41cmVtOwp9CgoKI3RpdGxlLXNlYXJjaC1wYXJhbWV0ZXJzLAojZGVzY3JpcHRpb24tc2VhcmNoLXBhcmFtZXRlcnMgewoJd2lkdGg6IGF1dG87CgltaW4td2lkdGg6IDA7CglmbGV4OiAxIDEgYXV0bzsKfQoKLm5teC1maWVsZC1vcC10b2dnbGUgewoJZmxleC1zaHJpbms6IDA7CgltaW4taGVpZ2h0OiAwOwoJcGFkZGluZy10b3A6IDAuMTI1cmVtOwoJcGFkZGluZy1ib3R0b206IDAuMTI1cmVtOwoKCXdoaXRlLXNwYWNlOiBwcmUtbGluZTsKfQoKCi5ubXgtYWktcGlsbHMgewoJZGlzcGxheTogaW5saW5lLWZsZXg7CglmbGV4LXdyYXA6IHdyYXA7CglnYXA6IDAuNXJlbTsKCXZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Cn0KCgoubnhtLXBpbGwubm14LWFpLXBpbGwtLWdlbmVyYXRlZCB7Cgljb2xvcjogIzBjMmEzZDsKCWJhY2tncm91bmQtY29sb3I6IGhzbCgyMDMsIDkyJSwgNjglKTsKfQoKLm54bS1waWxsLm5teC1haS1waWxsLS1tZWRpYSB7Cgljb2xvcjogbGlnaHRza3libHVlOwoJYmFja2dyb3VuZC1jb2xvcjogcmdiKDEzNSAyMDYgMjUwIC8gMC4yMik7Cn0KCi5ueG0tcGlsbC5ubXgtYWktcGlsbC0tYXNzaXN0ZWQgewoJY29sb3I6IGxpZ2h0c2t5Ymx1ZTsKCWJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OwoJYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMXB4IHJnYigxMzUgMjA2IDI1MCAvIDAuNik7Cn0KCgoubm14LWZpbGUtc2VhcmNoIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJZ2FwOiAwLjVyZW07CgltYXJnaW4tdG9wOiAwLjc1cmVtOwp9CgoKLm5teC1maWxlLXNlYXJjaCBbaGlkZGVuXSB7CglkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7Cn0KCi5ubXgtZmlsZS1zZWFyY2gtc3RhdHVzIHsKCW1hcmdpbjogMDsKCWZvbnQtc2l6ZTogMC44MTI1cmVtOwoJbGluZS1oZWlnaHQ6IDEuMzU7Cn0KCi5ubXgtZmlsZS1zZWFyY2gtc3RhdHVzW2RhdGEtbm14LXdhcm5pbmc9InRydWUiXSB7Cgljb2xvcjogI2UwYTM2MjsKfQoKCi5ubXgtZmlsdGVyLWJ1aWxkZXIgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDAuNXJlbTsKCW1hcmdpbi10b3A6IDFyZW07CglwYWRkaW5nLXRvcDogMC43NXJlbTsKCWJvcmRlci10b3A6IDFweCBzb2xpZCByZ2IoMjU1IDI1NSAyNTUgLyAwLjEpOwp9Cgoubm14LWZpbHRlci1idWlsZGVyIFtoaWRkZW5dIHsKCWRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKfQoKLm5teC1maWx0ZXItYnVpbGRlci1zdW1tYXJ5IHsKCW1hcmdpbjogMDsKCWZvbnQtc2l6ZTogMC44MTI1cmVtOwoJbGluZS1oZWlnaHQ6IDEuNDsKCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTMwMCwgI2Q0ZDRkOCk7CglvdmVyZmxvdy13cmFwOiBhbnl3aGVyZTsKCWRpc3BsYXk6IC13ZWJraXQtYm94OwoJLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDsKCS13ZWJraXQtbGluZS1jbGFtcDogNTsKCW92ZXJmbG93OiBoaWRkZW47Cn0KCi5ubXgtZmlsdGVyLWJ1aWxkZXJbZGF0YS1ubXgtYWN0aXZlPSJmYWxzZSJdIC5ubXgtZmlsdGVyLWJ1aWxkZXItc3VtbWFyeSB7Cgljb2xvcjogdmFyKC0tY29sb3ItemluYy00MDAsICNhMWExYWEpOwp9Cgoubm14LWZpbHRlci1idWlsZGVyLXN0YXR1cyB7CgltYXJnaW46IDA7Cglmb250LXNpemU6IDAuODEyNXJlbTsKCWxpbmUtaGVpZ2h0OiAxLjM1OwoJY29sb3I6ICNlMGEzNjI7Cn0KCi5ubXgtZmlsdGVyLWJ1aWxkZXItYWN0aW9ucyB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJZ2FwOiAwLjVyZW07Cn0KCgoubm14LWZiLW92ZXJsYXkgewoJcG9zaXRpb246IGZpeGVkOwoJaW5zZXQ6IDA7Cgl6LWluZGV4OiAyMTQ3NDgzMDAwOwoJZGlzcGxheTogZmxleDsKCWFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0OwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglwYWRkaW5nOiA0dmggMXJlbTsKCW92ZXJmbG93OiBhdXRvOwoJYmFja2dyb3VuZDogcmdiKDAgMCAwIC8gMC42KTsKCWZvbnQtZmFtaWx5OiB2YXIoLS1mb250LXNhbnMsIHVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgc2Fucy1zZXJpZik7Cglmb250LXNpemU6IDAuODc1cmVtOwoJbGluZS1oZWlnaHQ6IDEuNDsKfQoKLm5teC1mYi1kaWFsb2cgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47Cgl3aWR0aDogbWluKDU2cmVtLCAxMDAlKTsKCW1heC1oZWlnaHQ6IDkydmg7Cgljb2xvcjogdmFyKC0tY29sb3ItemluYy0zMDAsICNkNGQ0ZDgpOwoJYmFja2dyb3VuZDogdmFyKC0tY29sb3ItemluYy05MDAsICMxODE4MWIpOwoJYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItemluYy03MDAsICMzZjNmNDYpOwoJYm9yZGVyLXJhZGl1czogMC41cmVtOwoJYm94LXNoYWRvdzogMCAxLjVyZW0gM3JlbSByZ2IoMCAwIDAgLyAwLjUpOwp9Cgoubm14LWZiLWRpYWxvZyBbaGlkZGVuXSB7CglkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7Cn0KCi5ubXgtZmItaGVhZGVyIHsKCWRpc3BsYXk6IGZsZXg7CglhbGlnbi1pdGVtczogY2VudGVyOwoJZ2FwOiAxcmVtOwoJcGFkZGluZzogMC44NzVyZW0gMS4yNXJlbTsKCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTcwMCwgIzNmM2Y0Nik7Cn0KCi5ubXgtZmItaGVhZGVyIGgyIHsKCW1hcmdpbjogMDsKCWZvbnQtc2l6ZTogMS4xMjVyZW07Cglmb250LXdlaWdodDogNjAwOwoJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtMTAwLCAjZjRmNGY1KTsKfQoKLm5teC1mYi10YWJzIHsKCWRpc3BsYXk6IGZsZXg7CglnYXA6IDAuMjVyZW07CgltYXJnaW4tcmlnaHQ6IGF1dG87Cn0KCi5ubXgtZmItdGFiLAoubm14LWZiLWNsb3NlLAoubm14LWZiLWJ1dHRvbiwKLm5teC1mYi1saW5rIHsKCWZvbnQ6IGluaGVyaXQ7CgljdXJzb3I6IHBvaW50ZXI7Cn0KCi5ubXgtZmItdGFiIHsKCXBhZGRpbmc6IDAuMjVyZW0gMC43NXJlbTsKCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTQwMCwgI2ExYTFhYSk7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50OwoJYm9yZGVyLXJhZGl1czogMC4yNXJlbTsKfQoKLm5teC1mYi10YWJbYXJpYS1zZWxlY3RlZD0idHJ1ZSJdIHsKCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTEwMCwgI2Y0ZjRmNSk7CgliYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci16aW5jLTgwMCwgIzI3MjcyYSk7Cglib3JkZXItY29sb3I6IHZhcigtLWNvbG9yLXppbmMtNjAwLCAjNTI1MjViKTsKfQoKLm5teC1mYi1jbG9zZSB7CglwYWRkaW5nOiAwIDAuMzc1cmVtOwoJZm9udC1zaXplOiAxLjVyZW07CglsaW5lLWhlaWdodDogMTsKCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTQwMCwgI2ExYTFhYSk7CgliYWNrZ3JvdW5kOiBub25lOwoJYm9yZGVyOiAwOwp9Cgoubm14LWZiLWludHJvLAoubm14LWZiLWhpbnQgewoJbWFyZ2luOiAwOwoJZm9udC1zaXplOiAwLjc1cmVtOwoJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtNDAwLCAjYTFhMWFhKTsKfQoKLm5teC1mYi1pbnRybyB7CglwYWRkaW5nOiAwLjYyNXJlbSAxLjI1cmVtIDA7Cn0KCi5ubXgtZmItYm9keSB7CglmbGV4OiAxIDEgYXV0bzsKCW1pbi1oZWlnaHQ6IDA7CglvdmVyZmxvdzogYXV0bzsKCXBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbSAxcmVtOwp9Cgoubm14LWZiLWRpYWxvZyBzZWxlY3QsCi5ubXgtZmItZGlhbG9nIGlucHV0LAoubm14LWZiLWRpYWxvZyB0ZXh0YXJlYSB7CgltaW4taGVpZ2h0OiAycmVtOwoJcGFkZGluZzogMC4yNXJlbSAwLjVyZW07Cglmb250OiBpbmhlcml0OwoJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtMTAwLCAjZjRmNGY1KTsKCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtOTUwLCAjMDkwOTBiKTsKCWJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXppbmMtNjAwLCAjNTI1MjViKTsKCWJvcmRlci1yYWRpdXM6IDAuMjVyZW07Cgljb2xvci1zY2hlbWU6IGRhcms7Cn0KCi5ubXgtZmItZGlhbG9nIFthcmlhLWludmFsaWQ9InRydWUiXSB7Cglib3JkZXItY29sb3I6ICNmODcxNzE7Cn0KCi5ubXgtZmItZ3JvdXAgewoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDAuNzVyZW07CglwYWRkaW5nOiAwLjc1cmVtOwoJYmFja2dyb3VuZDogcmdiKDI1NSAyNTUgMjU1IC8gMC4wMik7Cglib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTcwMCwgIzNmM2Y0Nik7Cglib3JkZXItcmFkaXVzOiAwLjM3NXJlbTsKfQoKLm5teC1mYi1ncm91cCAubm14LWZiLWdyb3VwIHsKCWJhY2tncm91bmQ6IHJnYigyNTUgMjU1IDI1NSAvIDAuMDM1KTsKCWJvcmRlci1sZWZ0OiAzcHggc29saWQgI2M4N2IyODsKfQoKLm5teC1mYi1ncm91cC1oZWFkLAoubm14LWZiLWdyb3VwLWZvb3QsCi5ubXgtZmItZmllbGQtaGVhZCB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogMC41cmVtOwp9Cgoubm14LWZiLWdyb3VwLWhlYWQgPiAubm14LWZiLWhpbnQgewoJbWFyZ2luLXJpZ2h0OiBhdXRvOwp9Cgoubm14LWZiLWZpZWxkIHsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7CglnYXA6IDAuMzc1cmVtOwp9Cgoubm14LWZiLWZpZWxkLWhlYWQgewoJd2lkdGg6IDEwMCU7Cn0KCi5ubXgtZmItZmllbGQtaGVhZCBzdHJvbmcgewoJZm9udC13ZWlnaHQ6IDYwMDsKCWNvbG9yOiB2YXIoLS1jb2xvci16aW5jLTEwMCwgI2Y0ZjRmNSk7Cn0KCi5ubXgtZmItZmllbGQtaGVhZCA+IC5ubXgtZmItaGludCB7CgltYXJnaW4tcmlnaHQ6IGF1dG87Cn0KCi5ubXgtZmItZW50cnkgewoJZGlzcGxheTogZmxleDsKCWZsZXgtd3JhcDogd3JhcDsKCWFsaWduLWl0ZW1zOiBjZW50ZXI7CglnYXA6IDAuNXJlbTsKCXdpZHRoOiAxMDAlOwp9Cgoubm14LWZiLWVudHJ5IC5ubXgtZmItb3AgewoJZmxleDogMCAwIDEzcmVtOwoJbWF4LXdpZHRoOiAxMDAlOwp9Cgoubm14LWZiLWVudHJ5IC5ubXgtZmItdmFsdWUgewoJZmxleDogMSAxIDE0cmVtOwoJbWluLXdpZHRoOiAwOwp9Cgoubm14LWZiLWpvaW5lciB7Cglmb250LXNpemU6IDAuNzVyZW07Cglmb250LXdlaWdodDogNjAwOwoJdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKCWNvbG9yOiAjZTBhMzYyOwp9Cgoubm14LWZiLWxpbmsgewoJcGFkZGluZzogMDsKCWZvbnQtc2l6ZTogMC44MTI1cmVtOwoJY29sb3I6ICNlMGEzNjI7CgliYWNrZ3JvdW5kOiBub25lOwoJYm9yZGVyOiAwOwp9Cgoubm14LWZiLWxpbms6aG92ZXIsCi5ubXgtZmItbGluazpmb2N1cy12aXNpYmxlIHsKCXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOwp9Cgoubm14LWZiLWRhbmdlciB7Cgljb2xvcjogI2Y4NzE3MTsKfQoKLm5teC1mYi1yZW1vdmUtZW50cnkgewoJZm9udC1zaXplOiAxLjEyNXJlbTsKCWxpbmUtaGVpZ2h0OiAxOwp9CgoKLm5teC1mYi1kaWFsb2cgdGV4dGFyZWEubm14LWZiLWpzb24gewoJZGlzcGxheTogYmxvY2s7Cgl3aWR0aDogMTAwJTsKCW1pbi1oZWlnaHQ6IG1pbigyOHJlbSwgNTV2aCk7CgltYXJnaW4tdG9wOiAwLjVyZW07Cglmb250LWZhbWlseTogdWktbW9ub3NwYWNlLCBTRk1vbm8tUmVndWxhciwgTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2U7Cglmb250LXNpemU6IDAuODEyNXJlbTsKCXdoaXRlLXNwYWNlOiBwcmU7CglyZXNpemU6IHZlcnRpY2FsOwp9Cgoubm14LWZiLWZvb3RlciB7CglkaXNwbGF5OiBmbGV4OwoJZmxleC13cmFwOiB3cmFwOwoJYWxpZ24taXRlbXM6IGNlbnRlcjsKCWdhcDogMC43NXJlbTsKCXBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTsKCWJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1jb2xvci16aW5jLTcwMCwgIzNmM2Y0Nik7Cn0KCi5ubXgtZmItZXJyb3IgewoJZmxleDogMSAxIDE2cmVtOwoJbWFyZ2luOiAwOwoJY29sb3I6ICNmODcxNzE7Cn0KCi5ubXgtZmItZm9vdGVyLWJ1dHRvbnMgewoJZGlzcGxheTogZmxleDsKCWdhcDogMC41cmVtOwoJbWFyZ2luLWxlZnQ6IGF1dG87Cn0KCi5ubXgtZmItYnV0dG9uIHsKCXBhZGRpbmc6IDAuMzc1cmVtIDAuODc1cmVtOwoJY29sb3I6IHZhcigtLWNvbG9yLXppbmMtMTAwLCAjZjRmNGY1KTsKCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtODAwLCAjMjcyNzJhKTsKCWJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLXppbmMtNjAwLCAjNTI1MjViKTsKCWJvcmRlci1yYWRpdXM6IDAuMjVyZW07Cn0KCi5ubXgtZmItYnV0dG9uOmhvdmVyIHsKCWJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXppbmMtNzAwLCAjM2YzZjQ2KTsKfQoKCi5ubXgtZmItYnV0dG9uLm5teC1mYi1wcmltYXJ5IHsKCWZvbnQtd2VpZ2h0OiA2MDA7Cgljb2xvcjogIzBhMGEwYTsKCWJhY2tncm91bmQ6ICNkOThmNDA7Cglib3JkZXItY29sb3I6ICNkOThmNDA7Cn0KCi5ubXgtZmItYnV0dG9uLm5teC1mYi1wcmltYXJ5OmhvdmVyIHsKCWJhY2tncm91bmQ6ICNlMGEzNjI7Cn0KCi5ubXgtZmItYnV0dG9uLm5teC1mYi1jbGVhciB7CgltYXJnaW4tcmlnaHQ6IGF1dG87Cn0K",
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
		"src/features/advanced-mod-search/advanced-mod-search-inject.js":
			'(() => {\n    if (window.__nmxAdvancedModSearchInjected) return;\n    window.__nmxAdvancedModSearchInjected = true;\n    const GRAPHQL_ENDPOINTS = [ "api.nexusmods.com/v2/graphql", "api-router.nexusmods.com/graphql" ];\n    const SETTINGS_EVENT_NAME = "nmx-search-settings-change";\n    const TAGS_EVENT_NAME = "nmx-mod-search-tags";\n    const TAGS_REPLAY_EVENT_NAME = "nmx-mod-search-tags-replay";\n    const TILE_FRAGMENT_PATTERN = /fragment\\s+ModTileFragment\\s+on\\s+Mod\\s*\\{/;\n    const AI_TAGS_ENDPOINT = "https://api.nexusmods.com/v2/graphql";\n    const AI_TAGS_OPERATION = "ModsAiTags";\n    const AI_TAG_NAMES = {\n        4488: "AI-Generated Content",\n        4905: "AI Media",\n        4902: "AI Assisted"\n    };\n    const tagsByMod = new Map;\n    const SETTINGS = {\n        tagMode: {\n            param: "nmxTagMode",\n            default: "any"\n        },\n        titleOp: {\n            param: "nmxTitleOp",\n            default: "WILDCARD"\n        },\n        descriptionOp: {\n            param: "nmxDescriptionOp",\n            default: "MATCHES"\n        },\n        fileExt: {\n            param: "nmxFileExt",\n            default: ""\n        },\n        fileName: {\n            param: "nmxFileName",\n            default: ""\n        },\n        filePath: {\n            param: "nmxFilePath",\n            default: ""\n        },\n        builderFilter: {\n            param: "nmxFilter",\n            default: ""\n        }\n    };\n    function readSetting(key) {\n        return new URLSearchParams(location.search).get(SETTINGS[key].param) || SETTINGS[key].default;\n    }\n    const settings = Object.fromEntries(Object.keys(SETTINGS).map(key => [ key, readSetting(key) ]));\n    settings.builderPath = location.pathname;\n    document.addEventListener(SETTINGS_EVENT_NAME, event => {\n        try {\n            Object.assign(settings, JSON.parse(event.detail));\n        } catch {}\n    });\n    function isGraphQLRequest(method, url) {\n        if (String(method).toUpperCase() !== "POST" || typeof url !== "string") return false;\n        try {\n            const parsed = new URL(url, location.href);\n            return GRAPHQL_ENDPOINTS.includes(parsed.hostname + parsed.pathname);\n        } catch {\n            return false;\n        }\n    }\n    function rewriteTagMode(variables) {\n        if (settings.tagMode !== "all") return variables;\n        const includedTags = variables?.facets?.tag;\n        if (!Array.isArray(includedTags) || includedTags.length === 0) return variables;\n        const existingTagPostFilter = Array.isArray(variables?.postFilter?.tag) ? variables.postFilter.tag : [];\n        const equalsFilters = includedTags.map(tag => ({\n            op: "EQUALS",\n            value: tag\n        }));\n        return {\n            ...variables,\n            postFilter: {\n                ...variables.postFilter,\n                tag: [ ...existingTagPostFilter, ...equalsFilters ]\n            }\n        };\n    }\n    function rewriteFieldOp(variables, filterKey, settingKey) {\n        const entries = variables?.filter?.[filterKey];\n        if (!Array.isArray(entries) || entries.length === 0) return variables;\n        const op = settings[settingKey];\n        if (entries.every(entry => entry.op === op)) return variables;\n        return {\n            ...variables,\n            filter: {\n                ...variables.filter,\n                [filterKey]: entries.map(entry => ({\n                    ...entry,\n                    op: op\n                }))\n            }\n        };\n    }\n    function rewriteVariables(variables) {\n        let next = variables;\n        next = rewriteTagMode(next);\n        next = rewriteFieldOp(next, "name", "titleOp");\n        next = rewriteFieldOp(next, "description", "descriptionOp");\n        return next;\n    }\n    const FILE_CONTENTS_SEARCH_ENABLED = false;\n    const FILE_STATUS_EVENT_NAME = "nmx-mod-search-file-status";\n    const FILE_STATUS_REPLAY_EVENT_NAME = "nmx-mod-search-file-status-replay";\n    const FILE_PAGE_SIZE = 80;\n    const FILE_MAX_REQUESTS = 50;\n    const FILE_MOD_BATCH = 250;\n    const NO_MATCH_UID = "0";\n    const fileMatchCache = new Map;\n    const gameIdCache = new Map;\n    let lastFileStatus = null;\n    class FileSearchTooBroad extends Error {}\n    function publishFileStatus(status) {\n        lastFileStatus = status;\n        document.dispatchEvent(new CustomEvent(FILE_STATUS_EVENT_NAME, {\n            detail: JSON.stringify(status)\n        }));\n    }\n    document.addEventListener(FILE_STATUS_REPLAY_EVENT_NAME, () => {\n        if (lastFileStatus) publishFileStatus(lastFileStatus);\n    });\n    function fileCriteria() {\n        if (!FILE_CONTENTS_SEARCH_ENABLED) return null;\n        const ext = settings.fileExt.trim().replace(/^[*.]+/, "");\n        const name = settings.fileName.replace(/\\*/g, "").trim();\n        const path = settings.filePath.replace(/\\*/g, "").trim();\n        if (!ext && !name && !path) return null;\n        return {\n            ext: ext ? [ ...new Set([ `.${ext}`, `.${ext.toLowerCase()}`, `.${ext.toUpperCase()}` ]) ] : [],\n            name: name,\n            path: path\n        };\n    }\n    function fileContentFilter(criteria, groups = []) {\n        const filter = {\n            op: "AND",\n            filter: [ ...groups ]\n        };\n        if (criteria.ext.length) filter.filter.push({\n            op: "OR",\n            fileExtensionExact: criteria.ext.map(value => ({\n                op: "EQUALS",\n                value: value\n            }))\n        });\n        if (criteria.name) filter.fileNameWildcard = [ {\n            op: "WILDCARD",\n            value: criteria.name\n        } ];\n        if (criteria.path) filter.filePathWildcard = [ {\n            op: "WILDCARD",\n            value: criteria.path\n        } ];\n        return filter;\n    }\n    function uidOf(gameId, modId) {\n        return String((BigInt(gameId) << 32n) + BigInt(modId));\n    }\n    function gameDomainOf(variables) {\n        const entries = variables?.filter?.gameDomainName;\n        if (Array.isArray(entries) && entries.length === 1 && (entries[0]?.op ?? "EQUALS") === "EQUALS") return entries[0].value;\n        const facet = variables?.facets?.gameDomainName;\n        return Array.isArray(facet) && facet.length === 1 ? facet[0] : null;\n    }\n    async function apiQuery(operationName, query, variables) {\n        const response = await originalFetch.call(window, AI_TAGS_ENDPOINT, {\n            method: "POST",\n            credentials: "include",\n            headers: {\n                "Content-Type": "application/json",\n                "X-GraphQL-OperationName": operationName\n            },\n            body: JSON.stringify({\n                query: query,\n                operationName: operationName,\n                variables: variables\n            })\n        });\n        if (!response.ok) throw new Error(`HTTP ${response.status}`);\n        const result = await response.json();\n        if (!result?.data) throw new Error(result?.errors?.[0]?.message ?? "the API returned no data");\n        return result.data;\n    }\n    function gameIdFor(domain) {\n        if (!gameIdCache.has(domain)) gameIdCache.set(domain, apiQuery("NmxGameId", "query NmxGameId($domain: String) { game(domainName: $domain) { id } }", {\n            domain: domain\n        }).then(data => data.game?.id ?? null).catch(() => {\n            gameIdCache.delete(domain);\n            return null;\n        }));\n        return gameIdCache.get(domain);\n    }\n    const FILE_COUNTS_QUERY = `query NmxFileSearchCounts($files: ModFileContentSearchFilter, $facets: ModsFacet, $filter: ModsFilter, $postFilter: ModsFilter) {\\n  files: modFileContents(filter: $files, count: 0) {\\n    totalCount\\n  }\\n  mods: mods(facets: $facets, filter: $filter, postFilter: $postFilter, count: 0) {\\n    totalCount\\n  }\\n}`;\n    const FILE_ROWS_QUERY = `query NmxFileSearchFiles($filter: ModFileContentSearchFilter) {\\n  modFileContents(filter: $filter, count: ${FILE_PAGE_SIZE}, sort: [{gameId: {direction: ASC}}, {modId: {direction: ASC}}]) {\\n    nodes {\\n      gameId\\n      modId\\n    }\\n  }\\n}`;\n    const FILE_MODS_QUERY = `query NmxFileSearchMods($facets: ModsFacet, $filter: ModsFilter, $postFilter: ModsFilter, $offset: Int) {\\n  mods(facets: $facets, filter: $filter, postFilter: $postFilter, offset: $offset, count: ${FILE_PAGE_SIZE}, sort: [{createdAt: {direction: ASC}}]) {\\n    nodes {\\n      modId\\n      game {\\n        id\\n      }\\n    }\\n  }\\n}`;\n    async function distinctFileMods(filter, budget, found) {\n        let cursor = null;\n        for (;;) {\n            const groups = cursor ? [ {\n                op: "OR",\n                filter: [ {\n                    op: "AND",\n                    gameId: [ {\n                        op: "EQUALS",\n                        value: cursor.gameId\n                    } ],\n                    modId: [ {\n                        op: "GT",\n                        value: cursor.modId\n                    } ]\n                }, {\n                    op: "AND",\n                    gameId: [ {\n                        op: "GT",\n                        value: cursor.gameId\n                    } ]\n                } ]\n            } ] : [];\n            const data = await budget.query("NmxFileSearchFiles", FILE_ROWS_QUERY, {\n                filter: {\n                    ...filter,\n                    filter: [ ...filter.filter, ...groups ]\n                }\n            });\n            const nodes = data.modFileContents?.nodes ?? [];\n            for (const node of nodes) found.add(uidOf(node.gameId, node.modId));\n            budget.progress(found.size);\n            if (nodes.length < FILE_PAGE_SIZE) return;\n            cursor = nodes.at(-1);\n        }\n    }\n    async function filesFirst(criteria, gameId, budget) {\n        const found = new Set;\n        const groups = gameId == null ? [] : [ {\n            op: "AND",\n            gameId: [ {\n                op: "EQUALS",\n                value: Number(gameId)\n            } ]\n        } ];\n        await distinctFileMods(fileContentFilter(criteria, groups), budget, found);\n        return found;\n    }\n    async function modsFirst(criteria, listing, modTotal, budget) {\n        const modsByGame = new Map;\n        for (let offset = 0; offset < modTotal; offset += FILE_PAGE_SIZE) {\n            const data = await budget.query("NmxFileSearchMods", FILE_MODS_QUERY, {\n                ...listing,\n                offset: offset\n            });\n            const nodes = data.mods?.nodes ?? [];\n            for (const node of nodes) {\n                const gameId = node?.game?.id;\n                if (gameId == null || node.modId == null) continue;\n                if (!modsByGame.has(gameId)) modsByGame.set(gameId, []);\n                modsByGame.get(gameId).push(node.modId);\n            }\n            if (nodes.length < FILE_PAGE_SIZE) break;\n        }\n        const found = new Set;\n        for (const [gameId, modIds] of modsByGame) {\n            for (let i = 0; i < modIds.length; i += FILE_MOD_BATCH) {\n                const batch = {\n                    op: "OR",\n                    modId: modIds.slice(i, i + FILE_MOD_BATCH).map(value => ({\n                        op: "EQUALS",\n                        value: Number(value)\n                    }))\n                };\n                const scope = {\n                    op: "AND",\n                    gameId: [ {\n                        op: "EQUALS",\n                        value: Number(gameId)\n                    } ]\n                };\n                await distinctFileMods(fileContentFilter(criteria, [ scope, batch ]), budget, found);\n            }\n        }\n        return found;\n    }\n    function createBudget() {\n        const budget = {\n            requests: 0,\n            async query(operationName, query, variables) {\n                if (budget.requests >= FILE_MAX_REQUESTS) throw new FileSearchTooBroad;\n                budget.requests++;\n                return apiQuery(operationName, query, variables);\n            },\n            progress(found) {\n                publishFileStatus({\n                    state: "searching",\n                    requests: budget.requests,\n                    found: found\n                });\n            }\n        };\n        return budget;\n    }\n    async function resolveFileMatches(criteria, listing, domain) {\n        const budget = createBudget();\n        let fileRows = null;\n        let modTotal = null;\n        try {\n            budget.progress(0);\n            const gameId = domain ? await gameIdFor(domain) : null;\n            const files = fileContentFilter(criteria, gameId == null ? [] : [ {\n                op: "AND",\n                gameId: [ {\n                    op: "EQUALS",\n                    value: Number(gameId)\n                } ]\n            } ]);\n            const counts = await budget.query("NmxFileSearchCounts", FILE_COUNTS_QUERY, {\n                ...listing,\n                files: files\n            });\n            fileRows = counts.files?.totalCount ?? 0;\n            modTotal = counts.mods?.totalCount ?? 0;\n            if (fileRows === 0 || modTotal === 0) return {\n                state: "done",\n                strategy: "none",\n                uids: [],\n                fileRows: fileRows,\n                modTotal: modTotal,\n                requests: budget.requests\n            };\n            const filesCost = Math.ceil(fileRows / FILE_PAGE_SIZE);\n            const modsCost = Math.ceil(modTotal / FILE_PAGE_SIZE) + Math.ceil(modTotal / FILE_MOD_BATCH);\n            const strategy = modsCost < filesCost ? "mods-first" : "files-first";\n            const found = strategy === "mods-first" ? await modsFirst(criteria, listing, modTotal, budget) : await filesFirst(criteria, gameId, budget);\n            return {\n                state: "done",\n                strategy: strategy,\n                uids: [ ...found ],\n                fileRows: fileRows,\n                modTotal: modTotal,\n                requests: budget.requests\n            };\n        } catch (error) {\n            return {\n                state: error instanceof FileSearchTooBroad ? "too-broad" : "error",\n                message: error instanceof FileSearchTooBroad ? undefined : String(error?.message ?? error),\n                uids: [],\n                fileRows: fileRows,\n                modTotal: modTotal,\n                requests: budget.requests\n            };\n        }\n    }\n    async function fileMatchesFor(criteria, variables) {\n        const listing = {\n            facets: variables?.facets,\n            filter: variables?.filter,\n            postFilter: variables?.postFilter\n        };\n        const domain = gameDomainOf(variables);\n        const key = JSON.stringify({\n            criteria: criteria,\n            domain: domain,\n            listing: listing\n        });\n        if (!fileMatchCache.has(key)) fileMatchCache.set(key, resolveFileMatches(criteria, listing, domain));\n        const result = await fileMatchCache.get(key);\n        if (result.state === "error") fileMatchCache.delete(key);\n        publishFileStatus({\n            state: result.state,\n            strategy: result.strategy,\n            matched: result.uids.length,\n            fileRows: result.fileRows,\n            modTotal: result.modTotal,\n            requests: result.requests,\n            message: result.message\n        });\n        return result;\n    }\n    function withExtraGroup(variables, group) {\n        const filter = variables?.filter ?? {};\n        return {\n            ...variables,\n            filter: {\n                ...filter,\n                filter: [ ...Array.isArray(filter.filter) ? filter.filter : [], group ]\n            }\n        };\n    }\n    function withModRestriction(variables, uids) {\n        return withExtraGroup(variables, {\n            op: "OR",\n            id: (uids.length ? uids : [ NO_MATCH_UID ]).map(value => ({\n                op: "EQUALS",\n                value: value\n            }))\n        });\n    }\n    const LISTING_EVENT_NAME = "nmx-mod-search-listing";\n    const LISTING_REPLAY_EVENT_NAME = "nmx-mod-search-listing-replay";\n    const BUILDER_VALUE_TYPES = {\n        name: "string",\n        nameStemmed: "string",\n        description: "string",\n        primaryImage: "string",\n        tag: "string",\n        categoryName: "string",\n        languageName: "string",\n        status: "string",\n        author: "string",\n        uploader: "string",\n        uploaderId: "string",\n        modId: "string",\n        id: "string",\n        gameDomainName: "string",\n        gameName: "string",\n        gameId: "string",\n        createdAt: "string",\n        updatedAt: "string",\n        downloads: "number",\n        endorsements: "number",\n        fileSize: "number",\n        adultContent: "boolean",\n        hasUpdated: "boolean",\n        supportsVortex: "boolean",\n        directDownloadEnabled: "boolean"\n    };\n    let lastListingStatus = null;\n    function publishListing(status) {\n        lastListingStatus = status;\n        document.dispatchEvent(new CustomEvent(LISTING_EVENT_NAME, {\n            detail: JSON.stringify(status)\n        }));\n    }\n    document.addEventListener(LISTING_REPLAY_EVENT_NAME, () => {\n        if (lastListingStatus) publishListing(lastListingStatus);\n    });\n    function checkBuilderGroup(group) {\n        if (!group || typeof group !== "object" || Array.isArray(group)) return "a group isn\'t an object";\n        for (const [key, value] of Object.entries(group)) {\n            if (key === "op") {\n                if (value !== "AND" && value !== "OR") return `"${value}" isn\'t AND or OR`;\n                continue;\n            }\n            if (key === "filter") {\n                if (!Array.isArray(value)) return "a group\'s filter isn\'t a list";\n                for (const sub of value) {\n                    const problem = checkBuilderGroup(sub);\n                    if (problem) return problem;\n                }\n                continue;\n            }\n            const type = BUILDER_VALUE_TYPES[key];\n            if (!type) return `"${key}" isn\'t a mod search field`;\n            if (!Array.isArray(value) || !value.every(entry => typeof entry?.op === "string" && typeof entry.value === type)) return `"${key}" isn\'t a list of {op, value}`;\n        }\n        return null;\n    }\n    function countBuilderEntries(group) {\n        let count = 0;\n        for (const [key, value] of Object.entries(group)) if (key === "filter") for (const sub of value) count += countBuilderEntries(sub); else if (key !== "op") count += value.length;\n        return count;\n    }\n    function builderFilterFor() {\n        if (!settings.builderFilter || location.pathname !== settings.builderPath) return null;\n        let filter;\n        try {\n            filter = JSON.parse(settings.builderFilter);\n        } catch {\n            return {\n                error: "The filter isn\'t valid JSON."\n            };\n        }\n        const problem = checkBuilderGroup(filter);\n        if (problem) return {\n            error: `The filter is malformed: ${problem}.`\n        };\n        return countBuilderEntries(filter) ? {\n            filter: filter\n        } : null;\n    }\n    async function resolveBuilderModIds(group, variables) {\n        const resolved = {\n            ...group\n        };\n        if (Array.isArray(resolved.filter)) resolved.filter = await Promise.all(resolved.filter.map(sub => resolveBuilderModIds(sub, variables)));\n        if (!resolved.modId || resolved.gameId) return resolved;\n        const domain = gameDomainOf(variables);\n        const gameId = domain ? await gameIdFor(domain) : null;\n        if (gameId == null) throw new Error("Mod ID conditions need a search on a single game.");\n        const entries = resolved.modId;\n        delete resolved.modId;\n        resolved.filter = [ ...resolved.filter ?? [], ...entries.map(entry => ({\n            op: "AND",\n            gameId: [ {\n                op: "EQUALS",\n                value: String(gameId)\n            } ],\n            modId: [ entry ]\n        })) ];\n        return resolved;\n    }\n    async function buildListingVariables(variables, builder, criteria) {\n        let next = variables;\n        if (builder?.error) next = withModRestriction(next, []); else if (builder) {\n            try {\n                next = withExtraGroup(next, await resolveBuilderModIds(builder.filter, next));\n            } catch (error) {\n                publishListing({\n                    builder: "error",\n                    message: String(error?.message ?? error)\n                });\n                next = withModRestriction(next, []);\n            }\n        }\n        if (criteria) next = withModRestriction(next, (await fileMatchesFor(criteria, next)).uids);\n        return next;\n    }\n    function rewriteRequestBody(text) {\n        const unchanged = {\n            body: text,\n            hasTiles: false\n        };\n        if (typeof text !== "string") return unchanged;\n        let payload;\n        try {\n            payload = JSON.parse(text);\n        } catch {\n            return unchanged;\n        }\n        const hasTiles = typeof payload?.query === "string" && TILE_FRAGMENT_PATTERN.test(payload.query);\n        if (payload?.operationName === "ModsListing") {\n            const variables = rewriteVariables(payload.variables);\n            const builder = builderFilterFor();\n            const criteria = fileCriteria();\n            publishListing({\n                builder: builder ? builder.error ? "error" : "applied" : "off",\n                message: builder?.error\n            });\n            if (builder || criteria) return {\n                body: text,\n                hasTiles: hasTiles,\n                pending: buildListingVariables(variables, builder, criteria).then(next => {\n                    payload.variables = next;\n                    return JSON.stringify(payload);\n                })\n            };\n            if (FILE_CONTENTS_SEARCH_ENABLED && lastFileStatus?.state !== "off") publishFileStatus({\n                state: "off"\n            });\n            if (variables !== payload.variables) {\n                payload.variables = variables;\n                return {\n                    body: JSON.stringify(payload),\n                    hasTiles: hasTiles\n                };\n            }\n        }\n        return {\n            body: text,\n            hasTiles: hasTiles\n        };\n    }\n    function publishTags(entries) {\n        if (!entries.length) return;\n        document.dispatchEvent(new CustomEvent(TAGS_EVENT_NAME, {\n            detail: JSON.stringify(entries)\n        }));\n    }\n    const AI_TAGS_QUERY = `query ${AI_TAGS_OPERATION}(${Object.keys(AI_TAG_NAMES).map(id => `$tag${id}: ModsFilter`).join(", ")}, $count: Int) {\\n${Object.keys(AI_TAG_NAMES).map(id => `  tag${id}: mods(count: $count, filter: $tag${id}, viewUserBlockedContent: true, viewUploaderHidden: true) {\\n    nodes {\\n      uid\\n    }\\n  }`).join("\\n")}\\n}`;\n    function lookupAiTags(payload) {\n        const nodes = payload?.data?.mods?.nodes;\n        if (!Array.isArray(nodes)) return;\n        const mods = [];\n        for (const node of nodes) {\n            const domain = node?.game?.domainName;\n            if (typeof domain !== "string" || node.modId == null || node.uid == null) continue;\n            mods.push({\n                key: `${domain}/${node.modId}`,\n                uid: String(node.uid)\n            });\n        }\n        if (!mods.length) return;\n        const ids = mods.map(mod => ({\n            op: "EQUALS",\n            value: mod.uid\n        }));\n        const variables = {\n            count: mods.length\n        };\n        for (const [id, name] of Object.entries(AI_TAG_NAMES)) {\n            variables[`tag${id}`] = {\n                op: "AND",\n                tag: [ {\n                    op: "EQUALS",\n                    value: name\n                } ],\n                filter: [ {\n                    op: "OR",\n                    id: ids\n                } ]\n            };\n        }\n        originalFetch.call(window, AI_TAGS_ENDPOINT, {\n            method: "POST",\n            credentials: "include",\n            headers: {\n                "Content-Type": "application/json",\n                "X-GraphQL-OperationName": AI_TAGS_OPERATION\n            },\n            body: JSON.stringify({\n                query: AI_TAGS_QUERY,\n                operationName: AI_TAGS_OPERATION,\n                variables: variables\n            })\n        }).then(response => response.json()).then(result => {\n            if (!result?.data) return;\n            const tagIdsByUid = new Map;\n            for (const id of Object.keys(AI_TAG_NAMES)) {\n                for (const node of result.data[`tag${id}`]?.nodes ?? []) {\n                    const uid = String(node?.uid);\n                    if (!tagIdsByUid.has(uid)) tagIdsByUid.set(uid, []);\n                    tagIdsByUid.get(uid).push(id);\n                }\n            }\n            const entries = mods.map(mod => ({\n                key: mod.key,\n                tagIds: tagIdsByUid.get(mod.uid) ?? []\n            }));\n            for (const entry of entries) tagsByMod.set(entry.key, entry.tagIds);\n            publishTags(entries);\n        }).catch(() => {});\n    }\n    document.addEventListener(TAGS_REPLAY_EVENT_NAME, () => {\n        publishTags([ ...tagsByMod ].map(([key, tagIds]) => ({\n            key: key,\n            tagIds: tagIds\n        })));\n    });\n    const originalFetch = window.fetch;\n    window.fetch = function(input, init) {\n        const url = typeof input === "string" ? input : input?.url;\n        const method = init?.method ?? (input instanceof Request ? input.method : "GET");\n        if (!isGraphQLRequest(method, url) || typeof init?.body !== "string") return originalFetch.call(this, input, init);\n        const {body: body, hasTiles: hasTiles, pending: pending} = rewriteRequestBody(init.body);\n        const send = finalBody => {\n            const promise = originalFetch.call(this, input, finalBody === init.body ? init : {\n                ...init,\n                body: finalBody\n            });\n            if (hasTiles) promise.then(response => response.clone().json()).then(lookupAiTags).catch(() => {});\n            return promise;\n        };\n        return pending ? pending.then(send) : send(body);\n    };\n    const originalOpen = XMLHttpRequest.prototype.open;\n    XMLHttpRequest.prototype.open = function(method, url, ...rest) {\n        this.nmxIsModsListingGraphQL = isGraphQLRequest(method, url);\n        this.nmxHasTiles = false;\n        if (!this.nmxTagsListenerAttached) {\n            this.nmxTagsListenerAttached = true;\n            this.addEventListener("readystatechange", () => {\n                if (!this.nmxHasTiles || this.readyState !== 4 || this.status !== 200) return;\n                try {\n                    lookupAiTags(this.responseType === "json" ? this.response : JSON.parse(this.responseText));\n                } catch {}\n            });\n        }\n        return originalOpen.apply(this, [ method, url, ...rest ]);\n    };\n    const originalSend = XMLHttpRequest.prototype.send;\n    XMLHttpRequest.prototype.send = function(body) {\n        if (!this.nmxIsModsListingGraphQL) return originalSend.call(this, body);\n        const rewritten = rewriteRequestBody(body);\n        this.nmxHasTiles = rewritten.hasTiles;\n        if (rewritten.pending) {\n            rewritten.pending.then(finalBody => originalSend.call(this, finalBody));\n            return;\n        }\n        return originalSend.call(this, rewritten.body);\n    };\n})();\n',
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
	const TAGS_EVENT_NAME = "nmx-mod-search-tags";
	const TAGS_REPLAY_EVENT_NAME = "nmx-mod-search-tags-replay";
	const classAiPills = "nmx-ai-pills";
	const AI_TAGS = [
		{
			id: "4488",
			name: "AI-Generated Content",
			label: "AI Generated",
			modifier: "generated",
		},
		{
			id: "4905",
			name: "AI Media",
			label: "AI Media",
			modifier: "media",
		},
		{
			id: "4902",
			name: "AI Assisted",
			label: "AI Assisted",
			modifier: "assisted",
		},
	];
	const TILE_SELECTOR = '[data-e2eid="mod-tile"], [data-e2eid="mod-tile-compact"], [data-e2eid="mod-tile-landscape"]';
	const MOD_PATH_PATTERN = /^\/([^/]+)\/mods\/(\d+)\/?$/;
	let aiTagsByMod = new Map();
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
		fileExt: {
			param: "nmxFileExt",
			default: "",
		},
		fileName: {
			param: "nmxFileName",
			default: "",
		},
		filePath: {
			param: "nmxFilePath",
			default: "",
		},
		builderFilter: {
			param: "nmxFilter",
			default: "",
		},
	};
	const FILE_CONTENTS_SEARCH_ENABLED = false;
	const FILE_STATUS_EVENT_NAME = "nmx-mod-search-file-status";
	const FILE_STATUS_REPLAY_EVENT_NAME = "nmx-mod-search-file-status-replay";
	const classFileSearch = "nmx-file-search";
	const FILE_FIELDS = [
		{
			settingKey: "fileExt",
			id: "nmx-file-ext-search-parameters",
			label: "File extension",
			placeholder: "File extension, e.g. .dll",
		},
		{
			settingKey: "fileName",
			id: "nmx-file-name-search-parameters",
			label: "File name contains",
			placeholder: "File name contains",
		},
		{
			settingKey: "filePath",
			id: "nmx-file-path-search-parameters",
			label: "File path contains",
			placeholder: "File path contains",
		},
	];
	let fileStatus = null;
	const LISTING_EVENT_NAME = "nmx-mod-search-listing";
	const LISTING_REPLAY_EVENT_NAME = "nmx-mod-search-listing-replay";
	const classBuilder = "nmx-filter-builder";
	const BUILDER_REFRESH_TIMEOUT_MS = 2500;
	const BUILDER_OP_LABELS = {
		EQUALS: "is",
		NOT_EQUALS: "is not",
		WILDCARD: "contains",
		MATCHES: "matches",
		GT: ">",
		GTE: ">=",
		LT: "<",
		LTE: "<=",
	};
	const BUILDER_DATE_OP_LABELS = {
		EQUALS: "is exactly",
		NOT_EQUALS: "is not exactly",
		GT: "after",
		GTE: "on or after",
		LT: "before",
		LTE: "on or before",
	};
	const BUILDER_IS_OPS = [
		"EQUALS",
		"NOT_EQUALS",
	];
	const BUILDER_RANGE_OPS = [
		"EQUALS",
		"NOT_EQUALS",
		"GT",
		"GTE",
		"LT",
		"LTE",
	];
	const BUILDER_DATE_OPS = [
		"GTE",
		"LT",
		"GT",
		"LTE",
	];
	const BUILDER_STATUSES = [
		[
			"published",
			"Published",
		],
		[
			"not_published",
			"Not published",
		],
		[
			"publish_with_game",
			"Awaiting game approval",
		],
		[
			"under_moderation",
			"Under moderation",
		],
		[
			"hidden",
			"Hidden",
		],
		[
			"removed",
			"Removed by author",
		],
		[
			"wastebinned",
			"Removed by staff",
		],
	];
	const BUILDER_FIELDS = [
		{
			key: "name",
			label: "Title",
			group: "Text",
			kind: "text",
			ops: [
				"WILDCARD",
				"EQUALS",
				"NOT_EQUALS",
			],
			opLabels: {
				WILDCARD: "contains all words",
				EQUALS: "is exactly",
				NOT_EQUALS: "is not exactly",
			},
		},
		{
			key: "nameStemmed",
			label: "Title (word forms)",
			group: "Text",
			kind: "text",
			ops: [
				"MATCHES",
				"EQUALS",
				"NOT_EQUALS",
			],
			hint: 'Also matches related word forms ("replacer" finds "replacement").',
		},
		{
			key: "description",
			label: "Description",
			group: "Text",
			kind: "text",
			ops: [
				"MATCHES",
				"EQUALS",
				"NOT_EQUALS",
			],
			opLabels: {
				MATCHES: "has all words (fuzzy)",
				EQUALS: "has all words (exact)",
				NOT_EQUALS: "lacks all words",
			},
		},
		{
			key: "primaryImage",
			label: "Primary image URL",
			group: "Text",
			kind: "text",
			ops: [
				"WILDCARD",
				"EQUALS",
				"NOT_EQUALS",
			],
		},
		{
			key: "tag",
			label: "Tag",
			group: "Classification",
			kind: "text",
			ops: BUILDER_IS_OPS,
			hint: "The tag's exact, case-sensitive name.",
		},
		{
			key: "categoryName",
			label: "Category",
			group: "Classification",
			kind: "text",
			ops: BUILDER_IS_OPS,
			hint: "The category's exact name.",
		},
		{
			key: "languageName",
			label: "Language",
			group: "Classification",
			kind: "text",
			ops: BUILDER_IS_OPS,
		},
		{
			key: "status",
			label: "Status",
			group: "Classification",
			kind: "select",
			options: BUILDER_STATUSES,
			ops: BUILDER_IS_OPS,
			hint: "Anything but Published needs moderator permissions.",
		},
		{
			key: "author",
			label: "Author",
			group: "People",
			kind: "text",
			ops: [
				"EQUALS",
				"NOT_EQUALS",
				"WILDCARD",
				"MATCHES",
			],
			hint: "The author credit as written on the mod, not an account.",
		},
		{
			key: "uploader",
			label: "Uploader",
			group: "People",
			kind: "text",
			ops: [
				"EQUALS",
				"NOT_EQUALS",
				"WILDCARD",
			],
			hint: "Account name.",
		},
		{
			key: "uploaderId",
			label: "Uploader ID",
			group: "People",
			kind: "id",
			ops: BUILDER_IS_OPS,
			hint: "Member ID.",
		},
		{
			key: "modId",
			label: "Mod ID",
			group: "Game and mod",
			kind: "id",
			ops: BUILDER_RANGE_OPS,
			hint: "Needs a search on a single game, which is added to each entry.",
		},
		{
			key: "id",
			label: "Mod UID",
			group: "Game and mod",
			kind: "id",
			ops: BUILDER_IS_OPS,
			hint: "Game ID × 2^32 + mod ID; works across games.",
		},
		{
			key: "gameDomainName",
			label: "Game domain",
			group: "Game and mod",
			kind: "text",
			ops: BUILDER_IS_OPS,
			hint: "As in the URL, e.g. skyrimspecialedition.",
		},
		{
			key: "gameName",
			label: "Game name",
			group: "Game and mod",
			kind: "text",
			ops: [
				"EQUALS",
				"NOT_EQUALS",
				"WILDCARD",
			],
		},
		{
			key: "gameId",
			label: "Game ID",
			group: "Game and mod",
			kind: "id",
			ops: BUILDER_IS_OPS,
		},
		{
			key: "downloads",
			label: "Downloads",
			group: "Numbers",
			kind: "int",
			ops: BUILDER_RANGE_OPS,
		},
		{
			key: "endorsements",
			label: "Endorsements",
			group: "Numbers",
			kind: "int",
			ops: BUILDER_RANGE_OPS,
		},
		{
			key: "fileSize",
			label: "File size (KB)",
			group: "Numbers",
			kind: "int",
			ops: BUILDER_RANGE_OPS,
			hint: "Total across the mod's files.",
		},
		{
			key: "createdAt",
			label: "Created",
			group: "Dates",
			kind: "date",
			ops: BUILDER_DATE_OPS,
		},
		{
			key: "updatedAt",
			label: "Updated",
			group: "Dates",
			kind: "date",
			ops: BUILDER_DATE_OPS,
		},
		{
			key: "adultContent",
			label: "Adult content",
			group: "Flags",
			kind: "bool",
			ops: [
				"EQUALS",
			],
		},
		{
			key: "hasUpdated",
			label: "Updated since upload",
			group: "Flags",
			kind: "bool",
			ops: [
				"EQUALS",
			],
		},
		{
			key: "supportsVortex",
			label: "Supports Vortex",
			group: "Flags",
			kind: "bool",
			ops: [
				"EQUALS",
			],
		},
		{
			key: "directDownloadEnabled",
			label: "Direct download enabled",
			group: "Flags",
			kind: "bool",
			ops: [
				"EQUALS",
			],
		},
	];
	const BUILDER_FIELD_BY_KEY = new Map(
		BUILDER_FIELDS.map((field) => [
			field.key,
			field,
		]),
	);
	let listingStatus = null;
	let listingCount = 0;
	let refreshTimer;
	let builderOverlay = null;
	let builderDraft = null;
	let builderTab = "builder";
	let builderJsonText = "";
	let builderError = "";
	let builderReturnFocus = null;
	function readSetting(key) {
		return new URLSearchParams(location.search).get(SETTINGS[key].param) || SETTINGS[key].default;
	}
	const settings = Object.fromEntries(
		Object.keys(SETTINGS).map((key) => [
			key,
			readSetting(key),
		]),
	);
	settings.builderPath = location.pathname;
	const TOOLTIP_SHOW_DELAY_MS = 400;
	let watcher = null;
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
		nmxInjectPageScript("src/features/advanced-mod-search/advanced-mod-search-inject.js");
		document.addEventListener(TAGS_EVENT_NAME, onTagsEvent);
		document.dispatchEvent(new CustomEvent(TAGS_REPLAY_EVENT_NAME));
		document.addEventListener(FILE_STATUS_EVENT_NAME, onFileStatusEvent);
		document.dispatchEvent(new CustomEvent(FILE_STATUS_REPLAY_EVENT_NAME));
		document.addEventListener(LISTING_EVENT_NAME, onListingEvent);
		document.dispatchEvent(new CustomEvent(LISTING_REPLAY_EVENT_NAME));
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
		document.removeEventListener(TAGS_EVENT_NAME, onTagsEvent);
		document.removeEventListener(FILE_STATUS_EVENT_NAME, onFileStatusEvent);
		document.removeEventListener(LISTING_EVENT_NAME, onListingEvent);
		stopObserver();
		hideTooltip();
		closeBuilder();
		document
			.querySelectorAll(`.${classToggle}, .${classOpToggle}, .${classAiPills}, .${classFileSearch}, .${classBuilder}`)
			.forEach((el) => {
				el.remove();
			});
		aiTagsByMod = new Map();
		fileStatus = null;
		listingStatus = null;
		for (const key of Object.keys(SETTINGS))
			setSetting(key, SETTINGS[key].default, {
				skipRender: true,
			});
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
		const pathChanged = location.pathname !== settings.builderPath;
		if (pathChanged) {
			settings.builderPath = location.pathname;
			changed = true;
		}
		for (const key of Object.keys(SETTINGS)) {
			const urlValue = readSetting(key);
			if (key === "builderFilter" && !pathChanged && settings.builderFilter && urlValue === SETTINGS.builderFilter.default) {
				writeSetting(key, settings.builderFilter);
				continue;
			}
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
		stopObserver();
		watcher = nmxWatchPage(ensureControls, {
			debounceMs: 200,
			ignorePortalChurn: true,
			attributes: true,
			pollMs: 1e3,
		});
	}
	function stopObserver() {
		watcher?.stop();
		watcher = null;
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
	function triggerReapply() {
		const button = findApplyButton();
		if (button) nmxSimulateClick(button);
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
		document.querySelectorAll(`.${classFileSearch}`).forEach(renderFileSearch);
		document.querySelectorAll(`.${classBuilder}`).forEach(renderBuilderSection);
	}
	function ensureControls() {
		syncSettingsFromUrl();
		ensureTagButton();
		ensureOpButtons();
		ensureFileSearch();
		ensureFilterBuilder();
		applyAiTagMarks();
	}
	function ensureFileSearch() {
		if (!FILE_CONTENTS_SEARCH_ENABLED) return;
		const description = document.getElementById("description-search-parameters");
		const wrapper = description?.parentElement;
		if (!wrapper?.parentElement) return;
		const existing = wrapper.parentElement.querySelector(`:scope > .${classFileSearch}`);
		if (existing) {
			renderFileSearch(existing);
			return;
		}
		const section = createFileSearch(description.className);
		const apply = wrapper.parentElement.querySelector(':scope > button[type="submit"]');
		if (apply) apply.insertAdjacentElement("beforebegin", section);
		else wrapper.insertAdjacentElement("afterend", section);
	}
	function createFileSearch(inputClassName) {
		const section = document.createElement("div");
		section.className = classFileSearch;
		const heading = document.createElement("div");
		heading.className = "nmx-file-search-heading text-body-md text-neutral-moderate";
		heading.textContent = "File contents";
		section.append(heading);
		for (const field of FILE_FIELDS) {
			const label = document.createElement("label");
			label.className = "sr-only";
			label.htmlFor = field.id;
			label.textContent = field.label;
			const input = document.createElement("input");
			input.type = "text";
			input.id = field.id;
			input.className = inputClassName;
			input.placeholder = field.placeholder;
			input.autocomplete = "off";
			input.spellcheck = false;
			input.dataset.nmxFileKey = field.settingKey;
			input.value = settings[field.settingKey];
			input.addEventListener("input", () =>
				setSetting(field.settingKey, input.value, {
					skipRender: true,
				}),
			);
			section.append(label, input);
		}
		const status = document.createElement("p");
		status.className = "nmx-file-search-status text-body-md text-neutral-moderate";
		status.setAttribute("aria-live", "polite");
		section.append(status);
		renderFileSearch(section);
		return section;
	}
	function fileSearchActive() {
		return FILE_FIELDS.some((field) => settings[field.settingKey].replace(/[*.]/g, "").trim() !== "");
	}
	function fileStatusText() {
		if (!fileSearchActive()) return "";
		const count = (n) => Number(n ?? 0).toLocaleString();
		const plural = (n, word) => `${count(n)} ${word}${n === 1 ? "" : "s"}`;
		switch (fileStatus?.state) {
			case "searching":
				return `Searching file contents… ${plural(fileStatus.found, "mod")} found (${plural(fileStatus.requests, "request")})`;

			case "done":
				if (fileStatus.strategy === "mods-first")
					return `${count(fileStatus.matched)} of the ${plural(fileStatus.modTotal, "mod")} matching the other filters contain a matching file.`;
				return `${plural(fileStatus.matched, "mod")} contain a matching file (${plural(fileStatus.fileRows, "file")}); results show those that also match the other filters.`;

			case "too-broad":
				return `Too broad to search here: ${plural(fileStatus.fileRows, "matching file")} and ${plural(fileStatus.modTotal, "mod")} matching the other filters. Narrow either side and apply again.`;

			case "error":
				return `File contents search failed (${fileStatus.message}). Apply again to retry.`;

			default:
				return "Press Enter or Apply to search file contents.";
		}
	}
	function renderFileSearch(section) {
		for (const input of section.querySelectorAll("input[data-nmx-file-key]")) {
			const value = settings[input.dataset.nmxFileKey];
			if (input.value !== value && document.activeElement !== input) input.value = value;
		}
		const status = section.querySelector(".nmx-file-search-status");
		if (!status) return;
		const text = fileStatusText();
		if (status.textContent !== text) status.textContent = text;
		if (status.hidden !== !text) status.hidden = !text;
		const warning = String(fileStatus?.state === "too-broad" || fileStatus?.state === "error");
		if (status.dataset.nmxWarning !== warning) status.dataset.nmxWarning = warning;
	}
	function onFileStatusEvent(event) {
		try {
			fileStatus = JSON.parse(event.detail);
		} catch {
			return;
		}
		document.querySelectorAll(`.${classFileSearch}`).forEach(renderFileSearch);
	}
	function onTagsEvent(event) {
		let entries;
		try {
			entries = JSON.parse(event.detail);
		} catch {
			return;
		}
		if (!Array.isArray(entries)) return;
		for (const entry of entries) {
			if (typeof entry?.key !== "string" || !Array.isArray(entry.tagIds)) continue;
			aiTagsByMod.set(
				entry.key,
				AI_TAGS.filter((tag) => entry.tagIds.includes(tag.id)),
			);
		}
		if (watcher) applyAiTagMarks();
	}
	function modKeyOf(link) {
		try {
			const match = MOD_PATH_PATTERN.exec(new URL(link.href).pathname);
			return match ? `${match[1]}/${match[2]}` : null;
		} catch {
			return null;
		}
	}
	function titleLinksOf(tile) {
		return [
			...tile.querySelectorAll('a[href*="/mods/"]'),
		].filter((link) => !link.querySelector("img") && link.textContent.trim() !== "" && modKeyOf(link));
	}
	function createAiPills(key, tags) {
		const container = document.createElement("span");
		container.className = classAiPills;
		container.dataset.nmxKey = key;
		container.dataset.nmxTags = tags.map((tag) => tag.id).join(",");
		for (const tag of tags) {
			const pill = document.createElement("span");
			pill.className = `nxm-pill nxm-pill-sm nmx-ai-pill nmx-ai-pill--${tag.modifier}`;
			pill.title = `Generative AI Usage: ${tag.name}`;
			const label = document.createElement("span");
			label.className = "nxm-pill-label";
			label.textContent = tag.label;
			pill.append(label);
			container.append(pill);
		}
		return container;
	}
	function aiPillSlotFor(tile, link) {
		if (tile.dataset.e2eid === "mod-tile-landscape") {
			const row = link.parentElement?.parentElement?.querySelector(":scope > div.flex.gap-2");
			if (row)
				return {
					parent: row,
					after: row.querySelector(":scope > .nxm-pill:not(.nxm-pill-danger)"),
				};
		}
		return {
			parent: link.parentElement,
			after: link,
		};
	}
	function applyAiTagMarks() {
		for (const tile of document.querySelectorAll(TILE_SELECTOR)) {
			for (const link of titleLinksOf(tile)) {
				const key = modKeyOf(link);
				const tags = aiTagsByMod.get(key);
				const slot = aiPillSlotFor(tile, link);
				if (!slot.parent) continue;
				const existing = slot.parent.querySelector(`:scope > .${classAiPills}`);
				if (tags === undefined) {
					if (existing && existing.dataset.nmxKey !== key) existing.remove();
					continue;
				}
				const signature = tags.map((tag) => tag.id).join(",");
				if (existing && existing.dataset.nmxKey === key && existing.dataset.nmxTags === signature) continue;
				existing?.remove();
				if (!tags.length) continue;
				const pills = createAiPills(key, tags);
				if (slot.after) slot.after.after(pills);
				else slot.parent.prepend(pills);
			}
		}
	}
	function builderValueValid(field, value) {
		switch (field.kind) {
			case "bool":
				return typeof value === "boolean";

			case "int":
				return Number.isInteger(value);

			case "id":
			case "date":
				return typeof value === "string" && /^\d+$/.test(value);

			default:
				return typeof value === "string" && value.trim() !== "";
		}
	}
	function builderValueRule(field) {
		switch (field.kind) {
			case "bool":
				return "must be true or false";

			case "int":
				return "must be a whole number";

			case "id":
				return 'must be digits, as a string (e.g. "266")';

			case "date":
				return 'must be epoch seconds, as a string (e.g. "1735689600")';

			default:
				return "must be a non-empty string";
		}
	}
	function validateBuilderGroup(group, path) {
		if (!group || typeof group !== "object" || Array.isArray(group)) return `${path} must be an object`;
		for (const [key, value] of Object.entries(group)) {
			if (key === "op") {
				if (value !== "AND" && value !== "OR") return `${path}.op must be "AND" or "OR"`;
				continue;
			}
			if (key === "filter") {
				if (!Array.isArray(value)) return `${path}.filter must be an array of groups`;
				for (const [index, sub] of value.entries()) {
					const problem = validateBuilderGroup(sub, `${path}.filter[${index}]`);
					if (problem) return problem;
				}
				continue;
			}
			const field = BUILDER_FIELD_BY_KEY.get(key);
			if (!field) return `${path}.${key} isn't a mod search field`;
			if (!Array.isArray(value)) return `${path}.${key} must be an array of {op, value}`;
			for (const [index, entry] of value.entries()) {
				const at = `${path}.${key}[${index}]`;
				if (!entry || typeof entry !== "object") return `${at} must be {op, value}`;
				if (!Object.hasOwn(BUILDER_OP_LABELS, entry.op))
					return `${at}.op must be one of ${Object.keys(BUILDER_OP_LABELS).join(", ")}`;
				if (!builderValueValid(field, entry.value)) return `${at}.value ${builderValueRule(field)}`;
			}
		}
		return null;
	}
	function listifyBuilderGroup(group) {
		if (!group || typeof group !== "object" || Array.isArray(group)) return;
		for (const [key, value] of Object.entries(group)) {
			if (key === "op") continue;
			if (value && typeof value === "object" && !Array.isArray(value))
				group[key] = [
					value,
				];
			if (key === "filter" && Array.isArray(group[key])) {
				for (const sub of group[key]) listifyBuilderGroup(sub);
			}
		}
	}
	function parseBuilderFilter(text) {
		if (!text)
			return {
				filter: null,
			};
		let filter;
		try {
			filter = JSON.parse(text);
		} catch {
			return {
				error: "it isn't valid JSON",
			};
		}
		listifyBuilderGroup(filter);
		const error = validateBuilderGroup(filter, "filter");
		return error
			? {
					error: error,
				}
			: {
					filter: filter,
				};
	}
	function pruneBuilderGroup(group, isRoot) {
		const pruned = {
			op: group.op === "OR" ? "OR" : "AND",
		};
		for (const field of BUILDER_FIELDS) {
			const entries = (group[field.key] ?? []).filter((entry) => builderValueValid(field, entry.value));
			if (entries.length)
				pruned[field.key] = entries.map((entry) => ({
					op: entry.op,
					value: entry.value,
				}));
		}
		const subs = (group.filter ?? []).map((sub) => pruneBuilderGroup(sub, false)).filter(Boolean);
		if (subs.length) pruned.filter = subs;
		if (!isRoot && countBuilderConditions(pruned) === 0) return null;
		return pruned;
	}
	function countBuilderConditions(group) {
		let count = 0;
		for (const field of BUILDER_FIELDS) count += group[field.key]?.length ?? 0;
		for (const sub of group.filter ?? []) count += countBuilderConditions(sub);
		return count;
	}
	function builderOpLabel(field, op) {
		return (
			field.opLabels?.[op] ?? (field.kind === "date" ? BUILDER_DATE_OP_LABELS[op] : undefined) ?? BUILDER_OP_LABELS[op] ?? op
		);
	}
	function builderValueText(field, value) {
		switch (field.kind) {
			case "bool":
				return value ? "yes" : "no";

			case "date":
				return new Date(Number(value) * 1e3).toLocaleString();

			case "select":
				return field.options.find(([option]) => option === value)?.[1] ?? value;

			case "int":
				return value.toLocaleString();

			case "text":
				return `"${value}"`;

			default:
				return value;
		}
	}
	function describeBuilderGroup(group, nested) {
		const parts = [];
		for (const field of BUILDER_FIELDS)
			for (const entry of group[field.key] ?? [])
				parts.push(`${field.label} ${builderOpLabel(field, entry.op)} ${builderValueText(field, entry.value)}`);
		for (const sub of group.filter ?? []) parts.push(describeBuilderGroup(sub, true));
		const text = parts.join(group.op === "OR" ? " OR " : " AND ");
		return nested && parts.length > 1 ? `(${text})` : text;
	}
	function epochToLocalInput(epoch) {
		if (!/^\d+$/.test(String(epoch))) return "";
		const date = new Date(Number(epoch) * 1e3);
		const pad = (n) => String(n).padStart(2, "0");
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
	}
	function localInputToEpoch(text) {
		const ms = new Date(text).getTime();
		return Number.isFinite(ms) ? String(Math.floor(ms / 1e3)) : "";
	}
	function writeText(element, text) {
		if (element.textContent !== text) element.textContent = text;
	}
	function writeAttr(element, name, value) {
		if (element.getAttribute(name) !== value) element.setAttribute(name, value);
	}
	function ensureFilterBuilder() {
		if (location.pathname.startsWith("/profile/")) return;
		const panel = document.querySelector('[data-e2eid="search-parameters-filter"]');
		const form = panel?.querySelector("form");
		if (!form) return;
		const existing = panel.querySelector(`.${classBuilder}`);
		if (existing) {
			renderBuilderSection(existing);
			return;
		}
		form.insertAdjacentElement("afterend", createBuilderSection());
	}
	function builderButton(label, onClick, className) {
		const button = document.createElement("button");
		button.type = "button";
		button.className = className;
		button.textContent = label;
		button.addEventListener("click", onClick);
		return button;
	}
	function createBuilderSection() {
		const section = document.createElement("div");
		section.className = classBuilder;
		const heading = document.createElement("div");
		heading.className = "nmx-filter-builder-heading text-body-md text-neutral-moderate";
		heading.textContent = "Filter builder";
		const summary = document.createElement("p");
		summary.className = "nmx-filter-builder-summary";
		const status = document.createElement("p");
		status.className = "nmx-filter-builder-status";
		status.setAttribute("aria-live", "polite");
		const actions = document.createElement("div");
		actions.className = "nmx-filter-builder-actions";
		const edit = builderButton("Build a filter…", () => openBuilder(edit), `nxm-button nxm-button-sm ${classInactive}`);
		edit.dataset.nmxAction = "edit";
		const clear = builderButton("Clear", () => applyBuilderFilter(null), `nxm-button nxm-button-sm ${classInactive}`);
		clear.dataset.nmxAction = "clear";
		actions.append(edit, clear);
		section.append(heading, summary, status, actions);
		renderBuilderSection(section);
		return section;
	}
	function renderBuilderSection(section) {
		const parsed = parseBuilderFilter(settings.builderFilter);
		const active = parsed.filter !== null || parsed.error !== undefined;
		writeAttr(section, "data-nmx-active", String(active));
		const summary = section.querySelector(".nmx-filter-builder-summary");
		const summaryText = parsed.error
			? ""
			: parsed.filter
				? describeBuilderGroup(parsed.filter, false)
				: "Combine any of the API's mod fields in AND/OR groups, on top of the filters above.";
		writeText(summary, summaryText);
		writeAttr(summary, "title", summaryText);
		const status = section.querySelector(".nmx-filter-builder-status");
		let statusText = "";
		if (parsed.error)
			statusText = `The filter in the URL can't be used: ${parsed.error}. No results are shown until it's edited or cleared.`;
		else if (parsed.filter && listingStatus?.builder === "error")
			statusText = `Not applied: ${listingStatus.message} No results are shown.`;
		writeText(status, statusText);
		if (status.hidden !== !statusText) status.hidden = !statusText;
		writeText(section.querySelector('[data-nmx-action="edit"]'), active ? "Edit filter…" : "Build a filter…");
		const clear = section.querySelector('[data-nmx-action="clear"]');
		if (clear.hidden !== !active) clear.hidden = !active;
	}
	function onListingEvent(event) {
		let status;
		try {
			status = JSON.parse(event.detail);
		} catch {
			return;
		}
		listingStatus = status;
		listingCount++;
		document.querySelectorAll(`.${classBuilder}`).forEach(renderBuilderSection);
	}
	function applyBuilderFilter(filter) {
		settings.builderPath = location.pathname;
		setSetting("builderFilter", filter ? JSON.stringify(filter) : "");
		refreshListing();
	}
	function refreshListing() {
		const before = listingCount;
		const apply = findApplyButton();
		if (apply) nmxSimulateClick(apply);
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(
			() => {
				if (listingCount === before) location.reload();
			},
			apply ? BUILDER_REFRESH_TIMEOUT_MS : 0,
		);
	}
	function openBuilder(returnFocus) {
		closeBuilder();
		builderReturnFocus = returnFocus ?? null;
		const parsed = parseBuilderFilter(settings.builderFilter);
		builderDraft = parsed.filter
			? structuredClone(parsed.filter)
			: {
					op: "AND",
				};
		builderTab = parsed.error ? "json" : "builder";
		builderJsonText = parsed.error ? settings.builderFilter : JSON.stringify(builderDraft, null, 2);
		builderError = parsed.error ? `The current filter can't be used: ${parsed.error}.` : "";
		const overlay = document.createElement("div");
		overlay.className = "nmx-fb-overlay";
		const dialog = document.createElement("div");
		dialog.className = "nmx-fb-dialog";
		dialog.setAttribute("role", "dialog");
		dialog.setAttribute("aria-modal", "true");
		dialog.setAttribute("aria-labelledby", "nmx-fb-title");
		const header = document.createElement("div");
		header.className = "nmx-fb-header";
		const title = document.createElement("h2");
		title.id = "nmx-fb-title";
		title.textContent = "Filter builder";
		const tabs = document.createElement("div");
		tabs.className = "nmx-fb-tabs";
		tabs.setAttribute("role", "tablist");
		for (const [tab, label] of [
			[
				"builder",
				"Builder",
			],
			[
				"json",
				"JSON",
			],
		]) {
			const button = builderButton(label, () => switchBuilderTab(tab), "nmx-fb-tab");
			button.setAttribute("role", "tab");
			button.dataset.nmxTab = tab;
			tabs.append(button);
		}
		const close = builderButton("×", closeBuilder, "nmx-fb-close");
		close.setAttribute("aria-label", "Close");
		header.append(title, tabs, close);
		const intro = document.createElement("p");
		intro.className = "nmx-fb-intro";
		intro.textContent =
			"Applied on top of the filters in the sidebar. Each group combines its conditions - and the groups inside it - with its own All/Any. Conditions left empty are ignored.";
		const body = document.createElement("div");
		body.className = "nmx-fb-body";
		const footer = document.createElement("div");
		footer.className = "nmx-fb-footer";
		const error = document.createElement("p");
		error.className = "nmx-fb-error";
		error.setAttribute("role", "alert");
		const buttons = document.createElement("div");
		buttons.className = "nmx-fb-footer-buttons";
		buttons.append(
			builderButton("Clear all", clearBuilderDraft, "nmx-fb-button nmx-fb-clear"),
			builderButton("Cancel", closeBuilder, "nmx-fb-button"),
			builderButton("Apply filter", applyFromBuilder, "nmx-fb-button nmx-fb-primary"),
		);
		footer.append(error, buttons);
		dialog.append(header, intro, body, footer);
		overlay.append(dialog);
		builderOverlay = overlay;
		document.documentElement.append(overlay);
		document.addEventListener("keydown", onBuilderKeydown, true);
		renderBuilderBody();
		dialog.querySelector(".nmx-fb-body select, .nmx-fb-body input, .nmx-fb-body textarea")?.focus();
	}
	function closeBuilder() {
		if (!builderOverlay) return;
		document.removeEventListener("keydown", onBuilderKeydown, true);
		builderOverlay.remove();
		builderOverlay = null;
		builderDraft = null;
		if (builderReturnFocus?.isConnected) builderReturnFocus.focus();
		builderReturnFocus = null;
	}
	function onBuilderKeydown(event) {
		if (event.key !== "Escape") return;
		event.stopPropagation();
		event.preventDefault();
		closeBuilder();
	}
	function clearBuilderDraft() {
		builderDraft = {
			op: "AND",
		};
		builderJsonText = "";
		builderError = "";
		renderBuilderBody();
	}
	function switchBuilderTab(tab) {
		if (tab === builderTab) return;
		if (tab === "json") {
			builderJsonText = JSON.stringify(pruneBuilderGroup(builderDraft, true), null, 2);
		} else {
			const parsed = parseBuilderFilter(builderJsonText.trim());
			if (parsed.error) {
				builderError = `The JSON can't be used: ${parsed.error}.`;
				renderBuilderBody();
				return;
			}
			builderDraft = parsed.filter ?? {
				op: "AND",
			};
		}
		builderTab = tab;
		builderError = "";
		renderBuilderBody();
	}
	function applyFromBuilder() {
		let filter;
		if (builderTab === "json") {
			const parsed = parseBuilderFilter(builderJsonText.trim());
			if (parsed.error) {
				builderError = `The JSON can't be used: ${parsed.error}.`;
				renderBuilderBody();
				return;
			}
			filter = parsed.filter && pruneBuilderGroup(parsed.filter, true);
		} else {
			filter = pruneBuilderGroup(builderDraft, true);
		}
		if (filter && countBuilderConditions(filter) === 0) filter = null;
		closeBuilder();
		applyBuilderFilter(filter);
	}
	function renderBuilderBody() {
		if (!builderOverlay) return;
		const body = builderOverlay.querySelector(".nmx-fb-body");
		const scroll = body.scrollTop;
		body.replaceChildren(builderTab === "json" ? createBuilderJsonView() : createBuilderGroup(builderDraft, null));
		body.scrollTop = scroll;
		for (const tab of builderOverlay.querySelectorAll(".nmx-fb-tab"))
			tab.setAttribute("aria-selected", String(tab.dataset.nmxTab === builderTab));
		writeText(builderOverlay.querySelector(".nmx-fb-error"), builderError);
	}
	function createBuilderJsonView() {
		const wrap = document.createElement("div");
		wrap.className = "nmx-fb-json-view";
		const hint = document.createElement("p");
		hint.className = "nmx-fb-hint";
		hint.textContent =
			'The API\'s own ModsFilter: {"op": "AND" | "OR", "<field>": [{"op", "value"}], "filter": [groups]}. Dates are epoch seconds; Mod ID needs a single-game search.';
		const textarea = document.createElement("textarea");
		textarea.className = "nmx-fb-json";
		textarea.spellcheck = false;
		textarea.setAttribute("aria-label", "Filter as JSON");
		textarea.value = builderJsonText;
		textarea.addEventListener("input", () => {
			builderJsonText = textarea.value;
		});
		wrap.append(hint, textarea);
		return wrap;
	}
	function newBuilderEntry(field) {
		return {
			op: field.ops[0],
			value: field.kind === "bool" ? true : "",
		};
	}
	function createBuilderSelect(options, value, onChange) {
		const select = document.createElement("select");
		for (const [optionValue, label] of options) {
			const option = document.createElement("option");
			option.value = optionValue;
			option.textContent = label;
			select.append(option);
		}
		select.value = value;
		select.addEventListener("change", () => onChange(select.value));
		return select;
	}
	function createBuilderGroup(group, parent) {
		const box = document.createElement("div");
		box.className = "nmx-fb-group";
		box.dataset.nmxRoot = String(!parent);
		const head = document.createElement("div");
		head.className = "nmx-fb-group-head";
		const match = document.createElement("span");
		match.textContent = "Match";
		const op = createBuilderSelect(
			[
				[
					"AND",
					"all",
				],
				[
					"OR",
					"any",
				],
			],
			group.op === "OR" ? "OR" : "AND",
			(value) => {
				group.op = value;
				renderBuilderBody();
			},
		);
		op.className = "nmx-fb-group-op";
		op.setAttribute("aria-label", "Combine this group's conditions with");
		const of = document.createElement("span");
		of.textContent = "of these";
		const hint = document.createElement("span");
		hint.className = "nmx-fb-hint";
		hint.textContent = group.op === "OR" ? "At least one must be met" : "Every one must be met";
		head.append(match, op, of, hint);
		if (parent)
			head.append(
				builderButton(
					"Delete group",
					() => {
						parent.filter.splice(parent.filter.indexOf(group), 1);
						if (!parent.filter.length) delete parent.filter;
						renderBuilderBody();
					},
					"nmx-fb-link nmx-fb-danger",
				),
			);
		box.append(head);
		for (const field of BUILDER_FIELDS) if (group[field.key]?.length) box.append(createBuilderField(group, field));
		for (const sub of group.filter ?? []) box.append(createBuilderGroup(sub, group));
		if (!countBuilderConditions(group) && !group.filter?.length) {
			const empty = document.createElement("p");
			empty.className = "nmx-fb-hint";
			empty.textContent = parent ? "Empty groups are ignored." : "No conditions yet.";
			box.append(empty);
		}
		const foot = document.createElement("div");
		foot.className = "nmx-fb-group-foot";
		const add = document.createElement("select");
		add.className = "nmx-fb-add";
		add.setAttribute("aria-label", "Add a condition");
		const placeholder = document.createElement("option");
		placeholder.value = "";
		placeholder.textContent = "Add a condition…";
		add.append(placeholder);
		const optgroups = new Map();
		for (const field of BUILDER_FIELDS) {
			if (group[field.key]?.length) continue;
			if (!optgroups.has(field.group)) {
				const optgroup = document.createElement("optgroup");
				optgroup.label = field.group;
				optgroups.set(field.group, optgroup);
				add.append(optgroup);
			}
			const option = document.createElement("option");
			option.value = field.key;
			option.textContent = field.label;
			optgroups.get(field.group).append(option);
		}
		add.addEventListener("change", () => {
			const field = BUILDER_FIELD_BY_KEY.get(add.value);
			if (!field) return;
			group[field.key] = [
				newBuilderEntry(field),
			];
			renderBuilderBody();
			builderOverlay?.querySelector(`[data-nmx-field="${field.key}"] .nmx-fb-value`)?.focus();
		});
		const addGroup = builderButton(
			"+ Add group",
			() => {
				group.filter = [
					...(group.filter ?? []),
					{
						op: group.op === "OR" ? "AND" : "OR",
					},
				];
				renderBuilderBody();
			},
			"nmx-fb-link",
		);
		foot.append(add, addGroup);
		box.append(foot);
		return box;
	}
	function createBuilderField(group, field) {
		const wrap = document.createElement("div");
		wrap.className = "nmx-fb-field";
		wrap.dataset.nmxField = field.key;
		const head = document.createElement("div");
		head.className = "nmx-fb-field-head";
		const label = document.createElement("strong");
		label.textContent = field.label;
		head.append(label);
		if (field.hint) {
			const hint = document.createElement("span");
			hint.className = "nmx-fb-hint";
			hint.textContent = field.hint;
			head.append(hint);
		}
		head.append(
			builderButton(
				"Remove",
				() => {
					delete group[field.key];
					renderBuilderBody();
				},
				"nmx-fb-link nmx-fb-danger",
			),
		);
		wrap.append(head);
		const entries = group[field.key];
		entries.forEach((entry, index) => {
			if (index > 0) {
				const joiner = document.createElement("span");
				joiner.className = "nmx-fb-joiner";
				joiner.textContent = group.op === "OR" ? "or" : "and";
				wrap.append(joiner);
			}
			wrap.append(createBuilderEntry(entries, field, entry));
		});
		wrap.append(
			builderButton(
				`+ Add another ${field.label}`,
				() => {
					entries.push(newBuilderEntry(field));
					renderBuilderBody();
				},
				"nmx-fb-link",
			),
		);
		return wrap;
	}
	function createBuilderEntry(entries, field, entry) {
		const row = document.createElement("div");
		row.className = "nmx-fb-entry";
		const ops = field.ops.includes(entry.op)
			? field.ops
			: [
					...field.ops,
					entry.op,
				];
		const op = createBuilderSelect(
			ops.map((value) => [
				value,
				builderOpLabel(field, value),
			]),
			entry.op,
			(value) => {
				entry.op = value;
			},
		);
		op.className = "nmx-fb-op";
		op.setAttribute("aria-label", `${field.label} comparison`);
		row.append(op, createBuilderValueControl(field, entry));
		if (entries.length > 1)
			row.append(
				builderButton(
					"×",
					() => {
						entries.splice(entries.indexOf(entry), 1);
						renderBuilderBody();
					},
					"nmx-fb-link nmx-fb-danger nmx-fb-remove-entry",
				),
			);
		return row;
	}
	function createBuilderValueControl(field, entry) {
		let control;
		if (field.kind === "bool") {
			control = createBuilderSelect(
				[
					[
						"true",
						"Yes",
					],
					[
						"false",
						"No",
					],
				],
				String(entry.value === true),
				(value) => {
					entry.value = value === "true";
				},
			);
		} else if (field.kind === "select") {
			control = createBuilderSelect(
				[
					[
						"",
						"Choose…",
					],
					...field.options,
				],
				entry.value,
				(value) => {
					entry.value = value;
				},
			);
		} else {
			control = document.createElement("input");
			control.spellcheck = false;
			control.autocomplete = "off";
			if (field.kind === "date") {
				control.type = "datetime-local";
				control.value = epochToLocalInput(entry.value);
			} else if (field.kind === "int") {
				control.type = "number";
				control.step = "1";
				control.value = entry.value === "" ? "" : String(entry.value);
			} else {
				control.type = "text";
				if (field.kind === "id") control.inputMode = "numeric";
				control.value = entry.value;
			}
			const read = () => {
				const raw = control.value.trim();
				if (field.kind === "date") entry.value = localInputToEpoch(raw);
				else if (field.kind === "int") entry.value = raw === "" ? "" : Number(raw);
				else entry.value = field.kind === "id" ? raw : control.value;
				writeAttr(control, "aria-invalid", String(raw !== "" && !builderValueValid(field, entry.value)));
			};
			control.addEventListener("input", read);
			control.addEventListener("change", read);
		}
		control.classList.add("nmx-fb-value");
		control.setAttribute("aria-label", `${field.label} value`);
		return control;
	}
})();
