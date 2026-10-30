# Nexus Kit Userscripts

[Nexus Kit](https://github.com/wxMichael/nexus-kit) is a browser extension (Firefox, Chrome, Edge) that adds quality-of-life tweaks to the Nexus Mods website.

This repo hosts standalone userscripts and userstyles generated from its features.  
Here you can pick just what you want instead of installing the whole extension.

*Note: Almost all extension features can already be toggled on/off.*


## Installing

1. Install your preferred userscript manager:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) (Firefox-only)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Stylus](https://github.com/openstyles/stylus) (for userstlyes)
2. Open the `.user.js` (or `.user.css`) file for the feature you want.  
   Your manager should prompt automatically to install when opening a raw file with the right extension.


## Features

| Userscript                        |      Install       | Description  |
|-----------------------------------|:------------------:|--------------|
| Advanced Mod Search               | [Install][ams-raw] | Match type toggles for mod search filters, a filter builder for any combination of mod fields, and Generative AI Usage markers on search results and profile mod lists. |
| Comment Tweaks                    | [Install][cmt-raw] | Copy Link/Text & Translate buttons. Highlight linked comment. Shift+Hover avatars to zoom. |
| Disable Dark Reader               | [Install][ddr-raw] | Prevents the Dark Reader extension from double-applying its dark mode on top of the site's native dark theme. |
| Files Tab Tweaks                  | [Install][ftt-raw] | Improved content preview with search, hash comparison, and risk flagging. Shows file "names", adds the missing file archive button, and a File ID with copy button. |
| Media Edit TOS                    | [Install][mdt-raw] | Automatically checks "I agree to the terms and conditions" when editing an image/video page. |
| Mod Edit: Files                   | [Install][mef-raw] | Scan-status icon and file size next to each file on a mod's Files edit tab, plus a button to preview file contents. |
| Mod Edit: Media                   | [Install][mem-raw] | Full-screen image viewer with keyboard/scroll navigation and per-image menu actions on a mod's Media edit tab. |
| Mod Edit: Permissions             | [Install][mep-raw] | Adds a license picker on a mod's Permissions edit tab. |
| My Reports Tweaks                 | [Install][mrt-raw] | Shows your attachments and reported comment content on the My Reports page. |
| New Tag Styles                    | [Install][nts-raw] | Improved mod tagging popup layout: tag grid, grouped sections, and country flag and category icons. |
| Page Title Tweaks                 | [Install][ptt-raw] | Shorter page titles for nicer tabs and bookmarks, e.g. "SkyUI" instead of "SkyUI at Skyrim Special Edition Nexus - Mods and Community". |
| Profile Bling                     | [Install][pbl-raw] | Recolors the Mod Author badge by unique downloads. |
| Unread Notification Titles        | [Install][unt-raw] | Shows your unread notification/message counts in the page title. |

| Usersyle                          |      Install       | Description  |
|-----------------------------------|:------------------:|--------------|
| Dark Theme Fixes                  | [Install][dtf-raw] | Assorted dark-theme/CSS fixes for the site, plus a dark theme for the help centre. |
| My Reports Fixes                  | [Install][mrf-raw] | Layout fixes for the My Reports page. |

[ams-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/advanced-mod-search.user.js
[cmt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/comment-tweaks.user.js
[ddr-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/disable-dark-reader.user.js
[ftt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/files-tab-tweaks.user.js
[mdt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/media-edit-tos.user.js
[mef-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-files.user.js
[mem-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-media.user.js
[mep-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/mod-edit-permissions.user.js
[mrt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/my-reports-tweaks.user.js
[nts-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/new-tag-styles.user.js
[ptt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/page-title-tweaks.user.js
[pbl-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/profile-bling.user.js
[unt-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/unread-notification-titles.user.js

[dtf-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/dark-theme-fixes.user.css
[mrf-raw]: https://raw.githubusercontent.com/wxMichael/nexus-kit-userscripts/main/my-reports-fixes.user.css
