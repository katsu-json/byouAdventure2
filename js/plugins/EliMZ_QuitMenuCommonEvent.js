//============================================================================
// EliMZ_QuitMenuCommonEvent.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.0♦ Play a common event when the menu is closed.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-quitmenucommonevent-rpg-maker-mv

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

Play a common event on the map scene every time the player closes/exits 
the menu.

============================================================================
How to use
============================================================================

Just choose your common event Id in the plugin parameters.

============================================================================
Update Log
============================================================================

https://tinyurl.com/quitMenuCommonEvent

============================================================================

@param commonEventId
@text Common Event Id
@type common_event
@desc Select here the common event to play when leaves the menu.
@default 0

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_QuitMenuCommonEvent = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.QuitMenuCommonEvent = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/eli-quitmenucommonevent-rpg-maker-mv",
    parameters: {commonEventId: 0},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = Eli.PluginManager.createParameters()
        this.parameters = parameters
    },

    initPluginCommands(){},

    param(){
        return this.parameters
    },

}

const Plugin = Eli.QuitMenuCommonEvent
const Alias = Eli.QuitMenuCommonEvent.alias

Plugin.initialize()

/* -------------------------------- SCENE MAP ------------------------------- */

Alias.Scene_Map_callMenu = Scene_Map.prototype.callMenu
Scene_Map.prototype.callMenu = function() {
    Alias.Scene_Map_callMenu.call(this)
    this.reserveQuitMenuCommonEvent()
}

Scene_Map.prototype.reserveQuitMenuCommonEvent = function(){
    const id = Plugin.param().commonEventId
    $gameTemp.reserveCommonEvent(id)
}

}