## google extensions developer
> google browser kernel --> early: webkit,now: blink    

## manifest.json
> a google extensions start with a manifest(means 清单) file manifest.json    
- create manifest.json file include the following code  
```json
{
    // Required
    "manifest_version": 2,
    "name": "My Extension",
    "version": "1.0",

    // Recommended
    "default_locale": "en",
    "description": "A plain text description",
    "icons": {...},

    // Pick one (or none)
    "browser_action": {...},
    "page_action": {...},

    // Optional
    "action": ...,
    "author": ...,
    "automation": ...,
    "background": {
        // Recommended
        "persistent": false,
        // Optional
        "service_worker":
    },
    "chrome_settings_overrides": {...},
    "chrome_ui_overrides": {
        "bookmarks_ui": {
        "remove_bookmark_shortcut": true,
        "remove_button": true
        }
    },
    "chrome_url_overrides": {...},
    "commands": {...},
    "content_capabilities": ...,
    "content_scripts": [{...}],
    "content_security_policy": "policyString",
    "converted_from_user_script": ...,
    "current_locale": ...,
    "declarative_net_request": ...,
    "devtools_page": "devtools.html",
    "event_rules": [{...}],
    "externally_connectable": {
        "matches": ["*://*.example.com/*"]
    },
    "file_browser_handlers": [...],
    "file_system_provider_capabilities": {
        "configurable": true,
        "multiple_mounts": true,
        "source": "network"
    },
    "homepage_url": "http://path/to/homepage",
    "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
    "incognito": "spanning, split, or not_allowed",
    "input_components": ...,
    "key": "publicKey",
    "minimum_chrome_version": "versionString",
    "nacl_modules": [...],
    "oauth2": ...,
    "offline_enabled": true,
    "omnibox": {
        "keyword": "aString"
    },
    "optional_permissions": ["tabs"],
    "options_page": "options.html",
    "options_ui": {
        "chrome_style": true,
        "page": "options.html"
    },
    "permissions": ["tabs"],
    "platforms": [...],
    "short_name": "Short Name",
    "signature": ...,
    "spellcheck": ...,
    "storage": {
        "managed_schema": "schema.json"
    },
    "system_indicator": ...,
    "tts_engine": {...},
    "update_url": "http://path/to/updateInfo.xml",
    "version_name": "aString",
    "web_accessible_resources": [...]
}
```
## Manage Events 
> google extensions manage events with the background.js scripts   


## 页面缩小放大  
```JavaScript
    chrome.tabs.setZoomSettings(tab.id,{
        mode: "manual",
        scope: "per-tab",
        defaultZoomFactor: 0

    });

    chrome.tabs.getZoomSettings(tab.id,zoom => {
        console.log(zoom);
    });
// 页面放大为 300%
    chrome.tabs.setZoom(tab.id,3,() => {
        if(chrome.runtime.lastError){
            console.log(chrome.runtime.lastError.message);
        }
    });
```