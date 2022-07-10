//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.35;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.35] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

function _0x436f(){const _0x514ec8=['addedWidth','faceWidth','setWordWrap','TextAlign','\x1bI[%1]','TextMacros','<WORDWRAP>','ConvertParams','processCustomWait','moveTo','setChoiceListLineHeight','shift','\x1bC[%1]%2\x1bPREVCOLOR[0]','ARRAYEVAL','unshift','processCommonEvent','YqyIi','gainItem','ParseItemNotetags','fJFZW','windowWidth','Name','<BR>','textSizeEx','process_VisuMZ_MessageCore_AutoColor','TextCodeReplace','processPreviousColor','version','match','surprise','makeFontSmaller','convertNewPageTextStateMacros','</WORDWRAP>','_moveTargetX','6Yshsbd','setPictureText','itemHeight','edBEN','resetTextColor','adjustShowChoiceDefault','ARRAYSTRUCT','_moveEasingType','convertBackslashCharacters','setBackground','updateAutoPosition','commandSymbol','_textMacroFound','updateMessageCommonEvents','width','return\x20\x27','mKytm','_pictureTextWindow','code','isVolumeSymbol','createTextState','textColor','setMessageWindowWordWrap','obtainGold','obtainItem','Game_Map_updateEvents','_spriteset','Game_Party_initialize','ParseWeaponNotetags','_lastGainedItemData','getChoiceIndent','3556026mdRciw','battleTargetName','Match','statusText','preConvertEscapeCharacters','outlineColor','\x1bWrapBreak[0]','TextManager_message','tFWtv','CyRcE','TextColor','substring','FhAHW','upperleft','_interpreter','center','lfnve','NameBoxWindowOffsetY','processFsTextCode','zuBkq','addGeneralOptions','onNewPageMessageCore','pZcfY','updateTransform','setLastGainedItemData','updateEvents','uqwOe','Window_Message_synchronizeNameBox','isColorLocked','TCfOO','preFlushTextState','activate','databaseObjectName','battle\x20actor','setRelativePosition','Rows','drawPictureTextZone','resetFontSettings','aMJJL','TextCodeActions','setSpeakerName','newPage','format','_messageOffsetY','VXCzX','ECPrg','_subject','messageWidth','addContinuousShowChoices','Window_Options_addGeneralOptions','Window_Options_statusText','members','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','actorName','Game_Screen_erasePicture','tKHXQ','_nameBoxWindow','StretchDimmedBg','_pictureTextSprite','_relativePosition','_resetRect','gudBG','3706304mMXrPD','_pictureTextWidth','AutoColor','clearAllPictureTexts','_wordWrap','lKhSy','AddOption','nextEventCode','_pictureTextHeight','</COLORLOCK>','1041338vVnCyY','isItem','messageWindowRect','<RIGHT>','currentExt','makeFontBigger','<B>','updateRelativePosition','MessageWindow','RelativePXPY','addExtraShowChoices','pIlSH','tbchj','drawBackPicture','PHRti','isSceneBattle','maxFontSizeInLine','FontBiggerCap','ceil','_scene','_colorLock','_messageWindow','adjustShowChoiceCancel','MessageTextDelay','</CENTER>','KwDdT','convertEscapeCharacters','true','processAutoPosition','stretchDimmerSprite','flushTextState','prepareWordWrapEscapeCharacters','NameBoxWindowOffsetX','_positionType','ParseEnemyNotetags','commandName','Window_Options_isVolumeSymbol','Instant','index','bXMHO','ChoiceWindowTextAlign','convertFontSettingsEscapeCharacters','floor','bKEFc','prepareShowTextCommand','jrWxv','getChoiceListMaxRows','fVpUn','_forcedPosition','Window_Base_processControlCharacter','choice','_commonEventId','obtainEscapeParam','textSpeedStatusText','false','messageWordWrap','Width','erasePicture','maxLines','none','Default','<COLORLOCK>','pVrBN','updateMove','_textDelay','addWrapBreakAfterPunctuation','_wholeMoveDuration','mainFontSize','fontItalic','initMessageCore','mIbZb','applyMoveEasing','processEscapeCharacter','PyjXI','Window_Message_isTriggered','split','orogj','startY','updateDimensions','\x1bTEXTALIGNMENT[3]','oyplP','\x1bTEXTALIGNMENT[0]','changeTextColor','iXKNp','WORD_WRAP_PADDING','_autoPositionTarget','TextColor%1','inNdc','getStartingChoiceWidth','battle\x20party','AdjustRect','cXrVh','convertTextMacros','default','_dimmerSprite','Game_Screen_clearPictures','mUInT','_MessageCoreSettings','TextStr','process_VisuMZ_MessageCore_TextCodes_Replace','Window_NameBox_refresh','setupItemChoice','prepareForcedPositionEscapeCharacters','setup','isWordWrapEnabled','numVisibleRows','max','<CENTER>','vmjea','convertLockColorsEscapeCharacters','textCodeResult','TextSpeed','VwTLG','KUzFv','registerResetRect','maxCommands','tTFgv','clamp','lineHeight','SortObjectByKeyLength','jPdJy','jhhqJ','oFKWC','STRUCT','makeData','initTextAlignement','_autoSizeRegexp','_pictureTextBuffer','TextJS','prototype','remove','gstVQ','message','SHOW','setFaceImage','innerWidth','7592388aWqcAM','_pictureId','erasePictureTextBuffer','_pictureTextCache','changeVolume','AaGgo','\x1bITALIC[0]','selectDefault','<I>','prepareShowTextFollowups','messageCoreTextSpeed','LoARL','ActionJS','QEXQm','Items','setHelpWindowWordWrap','clearFlags','<%1>','_index','ARRAYFUNC','resetWordWrap','Enemies','quantity','item','exec','Wntke','anyPictureTextChanges','push','battleUserName','_messageOffsetX','Window_Base_processEscapeCharacter','addLoadListener','Window_ChoiceList_updatePlacement','ParseSkillNotetags','processTextAlignmentChange','obtainEscapeString','CUxmb','iconIndex','process_VisuMZ_MessageCore_TextMacros','getPictureText','parse','_textDelayCount','levelUp','updateNameBoxMove','_eventId','processNewLine','drawTextEx','Skills','fontFace','lowerleft','registerActorNameAutoColorChanges','outputHeight','_messageCommonEvents','helpWordWrap','McWRa','ANY','_data','processFontChangeBold','Sprite_Picture_updateBitmap','LUvKg','inputtingAction','ConvertTextAutoColorRegExpFriendly','Window_Message_newPage','MessageWidth','kXBIC','qVxrz','_textColorStack','isChoiceEnabled','MessageRows','updateBitmap','obtainExp','map','length','processAutoColorWords','General','AddAutoColor','event','getTextAlignment','JDgjF','adjustShowChoiceExtension','hcAKR','ConfigManager_makeData','contents','boxWidth','_moveTargetY','isCommandEnabled','createContents','defaultColor','\x1bCOLORLOCK[0]','Window_Base_processAllText','processPyTextCode','battleActionName','_targets','\x1bITALIC[1]','open','updateXyOffsets','MessageCore','Game_Map_setupEvents','isBreakShowTextCommands','placeCancelButton','lastGainedObjectName','convertBaseEscapeCharacters','text','kUFQU','Window_Base_changeTextColor','value','addMessageCoreCommands','NkRSh','_messagePositionReset','paintOpacity','hziqq','Type','MaxRows','VisuMZ_1_EventsMoveCore','applyDatabaseAutoColor','43166320XAzDjA','messageCoreWindowX','FastForwardKey','returnPreservedFontSettings','makeDeepCopy','ChoiceWindowLineHeight','\x1bTEXTALIGNMENT[1]','</B>','Window_ChoiceList_windowX','outputWidth','ZEWgG','MsgWindowOffsetY','_moveTargetWidth','sNhnl','ParseAllNotetags','rtl','boxHeight','replace','setMessageWindowRows','onProcessCharacter','_texts','_moveDuration','updatePlacement','terminateMessage','test','isPressed','ChoiceWindowMaxRows','ALL','setPositionType','setupNumInput','includes','TuMLx','processColorLock','Window_Base_processNewLine','LineBreakSpace','ChoiceWindowMaxCols','maxChoiceWidth','etFqv','choiceLineHeight','Undefined','prepareAutoSizeEscapeCharacters','followers','NaHzq','getChoiceListTextAlign','convertShowChoiceEscapeCodes','autoPositionOffsetX','STR','ConfigManager_applyData','CdFnW','eJAsh','Window_NameBox_updatePlacement','Window_Options_changeVolume','Window_Message_terminateMessage','min','_moveTargetHeight','updateBackground','MessageWindowXyOffsets','tooHS','Padding','isChoiceVisible','substr','COLORLOCK','iYalQ','Settings','WAIT','_currentAutoSize','getMessageWindowWidth','OffsetY','PictureIDs','CreateAutoColorRegExpListEntries','HelpWindow','DMJYn','convertMessageCoreEscapeActions','fontBold','Game_Party_gainItem','Window_Message_updatePlacement','getMessageWindowRows','map\x20party','lowerright','States','mhHSk','round','_target','splice','setMessageWindowWidth','clearPictures','processPxTextCode','updateOverlappingY','command101','currentCommand','fPyQc','height','calcMoveEasing','isInputting','onChoice','partyMemberName','type','exit','kFQzJ','ParseArmorNotetags','toUpperCase','_centerMessageWindow','hcMCf','findTargetSprite','changeTextSpeed','_pictureText','aXZdM','textWidth','defeat','lhDYN','DISABLE','convertVariableEscapeCharacters','bind','victory','processMessageCoreEscapeActions','processFontChangeItalic','startX','close','SWITCHES','startWait','SOFua','postConvertEscapeCharacters','textSizeExTextAlignment','processAllText','follower','convertTextAlignmentEscapeCharacters','setupEvents','_autoColorActorNames','anchorPictureText','refreshDimmerBitmap','postFlushTextState','makeCommandList','DefaultOutlineWidth','ARRAYJSON','setChoiceListMaxRows','_cancelButton','Game_System_initialize','_list','canMove','anchor','</I>','setupChoices','_macroBypassWordWrap','parameters','inBattle','Window_Message_processEscapeCharacter','FUcWb','changeValue','itemPadding','toLowerCase','mainFontFace','Window_Message_clearFlags','fxDmG','CreateAutoColorFor','GZFZK','Scene_Boot_onDatabaseLoaded','isCaE','isAutoColorAffected','sort','updateForcedPlacement','_indent','isHelpWindowWordWrap','applyData','KSfBe','cgzvs','3509540eDnJlh','setTextDelay','attachPictureText','upperright','<LINE\x20BREAK>','parseChoiceText','preemptive','changeOutlineColor','getLastGainedItemData','setChoiceListTextAlign','choicePositionType','fontSize','right','rtHtw','processControlCharacter','isContinuePrepareShowTextCommands','resizePictureText','trim','status','ParseStateNotetags','PICTURE','outlineWidth','CommonEvent','windowX','map\x20actor','initialize','choiceCols','ARRAYSTR','Weapons','QEUhC','maxCols','Window_Base_update','\x1bBOLD[0]','Hkhqm','MsgWindowOffsetX','WTdwb','processStoredAutoColorChanges','CAONf','registerCommand','drawing','CENTERPICTURE','actor','clear','NUM','name','instantTextSpeed','\x1bi[%1]%2','registerSelfEvent','addCommand','setChoiceListMaxColumns','faceName','Window_Base_initialize','5512185bBMFXM','choices','lbsVI','contentsBack','windowPadding','autoPositionOffsetY','isRTL','choiceTextAlign','bStaC','getPictureTextData','onDatabaseLoaded','Window_Base_textSizeEx','updateAutoSizePosition','fuzlM','MaxCols','processAutoSize','isTriggered','textSpeed','Actors','Scene_Options_maxCommands','\x1bCOLORLOCK[1]','processWrapBreak','messageRows','messagePositionReset','processTextAlignmentX','Classes','resetPositionX','Armors','processActorNameAutoColorChanges','Sprite_Picture_update','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','FontSmallerCap','currencyUnit','easeOut','<LEFT>','\x1bTEXTALIGNMENT','convertChoiceMacros','isArmor','padding','_textAlignment','KrFZp','VisuMZ_0_CoreEngine',')))','Window_Help_refresh','NameBoxWindowDefaultColor','bitmap','constructor','slice','scale','ParseAddedText','calcWindowHeight','choiceRows','addMessageCoreTextSpeedCommand','AutoColorRegExp','getConfigValue','NNEhg','setColorLock','processDrawCenteredPicture','addedHeight','clampPlacementPosition','pWzZo','beTFp','updatePictureText','nJZvz','update','setTextAlignment','list','FontChangeValue','addMessageCommonEvent','getChoiceListLineHeight','AutoColorBypassList','clearActorNameAutoColor','refresh','QrQZu','indexOf','setMessageWindowXyOffsets','description','callOkHandler','down','Game_Map_initialize','drawPictureText','convertHardcodedEscapeReplacements','textSizeExWordWrap','lastGainedObjectQuantity','isSceneMap','WrZES','jWckB','contentsHeight','getChoiceListMaxColumns','getPreservedFontSettings','synchronizeNameBox','move','\x5c%1','filter','getMessageWindowXyOffsets','call','getPictureTextBuffer','itemRectWithPadding','AgkSf','realPictureId','PictureTextChange','_autoPosRegExp','launchMessageCommonEvent','normalColor','process_VisuMZ_MessageCore_TextCodes_Action','updateOffsetPosition','_autoSizeCheck','ARRAYNUM','ParseClassNotetags','isWeapon','loadPicture','_action','addContinuousShowTextCommands','COMMONEVENT','_showFast','Uzvsi','drawBackCenteredPicture','clearCommandList','resetRect','textCodeCheck','Game_Interpreter_setupChoices','blt','eraseAllPictureTexts','left','nNguR','Window_Message_needsNewPage','add','WordWrap','pLeRW'];_0x436f=function(){return _0x514ec8;};return _0x436f();}function _0x279c(_0x5dd81a,_0x1bf794){const _0x436f45=_0x436f();return _0x279c=function(_0x279cbb,_0x41d75b){_0x279cbb=_0x279cbb-0x130;let _0x4bcc71=_0x436f45[_0x279cbb];return _0x4bcc71;},_0x279c(_0x5dd81a,_0x1bf794);}const _0x5ba09f=_0x279c;(function(_0x41fa4d,_0x2fe176){const _0x230934=_0x279c,_0x468f40=_0x41fa4d();while(!![]){try{const _0xd0476f=parseInt(_0x230934(0x2cc))/0x1+parseInt(_0x230934(0x284))/0x2+parseInt(_0x230934(0x1c2))/0x3+parseInt(_0x230934(0x354))/0x4+parseInt(_0x230934(0x18e))/0x5*(-parseInt(_0x230934(0x265))/0x6)+parseInt(_0x230934(0x2c2))/0x7+-parseInt(_0x230934(0x3c7))/0x8;if(_0xd0476f===_0x2fe176)break;else _0x468f40['push'](_0x468f40['shift']());}catch(_0x4f2526){_0x468f40['push'](_0x468f40['shift']());}}}(_0x436f,0xf0df9));var label=_0x5ba09f(0x3b4),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5ba09f(0x21f)](function(_0x491f20){const _0x591b1c=_0x5ba09f;return _0x491f20[_0x591b1c(0x1a0)]&&_0x491f20[_0x591b1c(0x20e)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5ba09f(0x406)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5ba09f(0x24a)]=function(_0x2984c1,_0x3840b7){const _0x24121b=_0x5ba09f;for(const _0x40aa9f in _0x3840b7){if(_0x40aa9f[_0x24121b(0x25f)](/(.*):(.*)/i)){const _0x539f86=String(RegExp['$1']),_0xed442e=String(RegExp['$2'])[_0x24121b(0x14d)]()['trim']();let _0x3ba857,_0x5c8b78,_0x1a889d;switch(_0xed442e){case _0x24121b(0x1b9):_0x3ba857=_0x3840b7[_0x40aa9f]!==''?Number(_0x3840b7[_0x40aa9f]):0x0;break;case _0x24121b(0x22d):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78['map'](_0x1f32af=>Number(_0x1f32af));break;case'EVAL':_0x3ba857=_0x3840b7[_0x40aa9f]!==''?eval(_0x3840b7[_0x40aa9f]):null;break;case _0x24121b(0x250):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78[_0x24121b(0x39b)](_0x4f5bbc=>eval(_0x4f5bbc));break;case'JSON':_0x3ba857=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):'';break;case _0x24121b(0x16e):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78['map'](_0x2464ba=>JSON[_0x24121b(0x37c)](_0x2464ba));break;case'FUNC':_0x3ba857=_0x3840b7[_0x40aa9f]!==''?new Function(JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f])):new Function('return\x200');break;case _0x24121b(0x367):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78[_0x24121b(0x39b)](_0x54bf42=>new Function(JSON[_0x24121b(0x37c)](_0x54bf42)));break;case _0x24121b(0x3f5):_0x3ba857=_0x3840b7[_0x40aa9f]!==''?String(_0x3840b7[_0x40aa9f]):'';break;case _0x24121b(0x1a9):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78[_0x24121b(0x39b)](_0x1317da=>String(_0x1317da));break;case _0x24121b(0x347):_0x1a889d=_0x3840b7[_0x40aa9f]!==''?JSON['parse'](_0x3840b7[_0x40aa9f]):{},_0x2984c1[_0x539f86]={},VisuMZ[_0x24121b(0x24a)](_0x2984c1[_0x539f86],_0x1a889d);continue;case _0x24121b(0x26b):_0x5c8b78=_0x3840b7[_0x40aa9f]!==''?JSON[_0x24121b(0x37c)](_0x3840b7[_0x40aa9f]):[],_0x3ba857=_0x5c8b78[_0x24121b(0x39b)](_0x1cfc00=>VisuMZ[_0x24121b(0x24a)]({},JSON[_0x24121b(0x37c)](_0x1cfc00)));break;default:continue;}_0x2984c1[_0x539f86]=_0x3ba857;}}return _0x2984c1;},(_0x31053d=>{const _0x3557f3=_0x5ba09f,_0x4ebc74=_0x31053d[_0x3557f3(0x1ba)];for(const _0x3793c6 of dependencies){if(!Imported[_0x3793c6]){if(_0x3557f3(0x327)==='cXrVh'){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3557f3(0x2ae)](_0x4ebc74,_0x3793c6)),SceneManager[_0x3557f3(0x14a)]();break;}else{if(!_0x39ecfe[_0x3557f3(0x3bd)](_0x6e65f4))return!![];}}}const _0x4d032d=_0x31053d[_0x3557f3(0x20e)];if(_0x4d032d[_0x3557f3(0x25f)](/\[Version[ ](.*?)\]/i)){const _0x4da9d3=Number(RegExp['$1']);_0x4da9d3!==VisuMZ[label][_0x3557f3(0x25e)]&&(alert(_0x3557f3(0x2b8)[_0x3557f3(0x2ae)](_0x4ebc74,_0x4da9d3)),SceneManager[_0x3557f3(0x14a)]());}if(_0x4d032d[_0x3557f3(0x25f)](/\[Tier[ ](\d+)\]/i)){if(_0x3557f3(0x2b1)!==_0x3557f3(0x2b1))_0x34cd47[_0x3557f3(0x3b4)][_0x3557f3(0x180)][_0x3557f3(0x221)](this),this[_0x3557f3(0x209)](),this[_0x3557f3(0x368)](),this['setColorLock'](![]),this['setTextAlignment']('default'),this['setTextDelay'](_0x3e2fd5[_0x3557f3(0x3b4)][_0x3557f3(0x406)][_0x3557f3(0x39e)]['MessageTextDelay']);else{const _0x445529=Number(RegExp['$1']);_0x445529<tier?(alert(_0x3557f3(0x1e0)[_0x3557f3(0x2ae)](_0x4ebc74,_0x445529,tier)),SceneManager[_0x3557f3(0x14a)]()):tier=Math[_0x3557f3(0x336)](_0x445529,tier);}}VisuMZ[_0x3557f3(0x24a)](VisuMZ[label][_0x3557f3(0x406)],_0x31053d[_0x3557f3(0x178)]);})(pluginData),PluginManager[_0x5ba09f(0x1b4)](pluginData[_0x5ba09f(0x1ba)],'ChoiceWindowProperties',_0x279e93=>{const _0x28467b=_0x5ba09f;VisuMZ[_0x28467b(0x24a)](_0x279e93,_0x279e93);const _0x5dc4eb=_0x279e93['LineHeight']||$gameSystem[_0x28467b(0x207)]()||0x1,_0x158b16=_0x279e93[_0x28467b(0x3c4)]||$gameSystem[_0x28467b(0x2fa)]()||0x1,_0x459cf3=_0x279e93[_0x28467b(0x1d0)]||$gameSystem[_0x28467b(0x21a)]()||0x1,_0x5065d1=_0x279e93[_0x28467b(0x246)][_0x28467b(0x17e)]()||_0x28467b(0x329);$gameSystem[_0x28467b(0x24d)](_0x5dc4eb),$gameSystem[_0x28467b(0x16f)](_0x158b16),$gameSystem['setChoiceListMaxColumns'](_0x459cf3),$gameSystem['setChoiceListTextAlign'](_0x5065d1);}),PluginManager['registerCommand'](pluginData['name'],'MessageWindowProperties',_0x5d983b=>{const _0x590a57=_0x5ba09f;VisuMZ[_0x590a57(0x24a)](_0x5d983b,_0x5d983b);const _0x577bad=_0x5d983b[_0x590a57(0x2a7)]||$gameSystem[_0x590a57(0x135)]()||0x1,_0x32becb=_0x5d983b[_0x590a57(0x304)]||$gameSystem[_0x590a57(0x409)]()||0x1;$gameTemp[_0x590a57(0x14e)]=!![];const _0x227abb=_0x5d983b[_0x590a57(0x241)]['toLowerCase']();$gameSystem[_0x590a57(0x3d9)](_0x577bad),$gameSystem[_0x590a57(0x13d)](_0x32becb);[_0x590a57(0x2e7),_0x590a57(0x302)][_0x590a57(0x3e5)](_0x227abb)&&$gameSystem[_0x590a57(0x27b)](eval(_0x227abb));const _0x32c2fd=SceneManager[_0x590a57(0x2df)]['_messageWindow'];_0x32c2fd&&(_0x32c2fd[_0x590a57(0x368)](),_0x32c2fd[_0x590a57(0x31a)](),_0x32c2fd[_0x590a57(0x3aa)]());}),PluginManager[_0x5ba09f(0x1b4)](pluginData['name'],_0x5ba09f(0x3ff),_0x5db5b8=>{const _0x54fc2a=_0x5ba09f;VisuMZ[_0x54fc2a(0x24a)](_0x5db5b8,_0x5db5b8),$gameSystem[_0x54fc2a(0x20d)](_0x5db5b8['OffsetX'],_0x5db5b8[_0x54fc2a(0x40a)]);const _0x3235ce=SceneManager[_0x54fc2a(0x2df)]['_messageWindow'];_0x3235ce&&(_0x3235ce['resetWordWrap'](),_0x3235ce[_0x54fc2a(0x31a)](),_0x3235ce[_0x54fc2a(0x3aa)]());}),PluginManager[_0x5ba09f(0x1b4)](pluginData['name'],_0x5ba09f(0x226),_0x4cfd1e=>{const _0x5abcf1=_0x5ba09f;VisuMZ[_0x5abcf1(0x24a)](_0x4cfd1e,_0x4cfd1e);const _0x31b40e=_0x4cfd1e[_0x5abcf1(0x40b)]||[],_0x5f32f6=_0x4cfd1e[_0x5abcf1(0x401)]||0x0,_0x252d3b=[_0x5abcf1(0x291),'up','upperright',_0x5abcf1(0x23d),_0x5abcf1(0x293),'right',_0x5abcf1(0x385),_0x5abcf1(0x210),_0x5abcf1(0x137)];for(const _0x3ca59c of _0x31b40e){$gameScreen['setPictureTextBuffer'](_0x3ca59c,_0x5f32f6);for(const _0x2d67a6 of _0x252d3b){if(_0x4cfd1e[_0x2d67a6]===undefined)continue;$gameScreen['setPictureText'](_0x3ca59c,_0x4cfd1e[_0x2d67a6],_0x2d67a6);}}}),PluginManager[_0x5ba09f(0x1b4)](pluginData['name'],'PictureTextErase',_0x5f5af0=>{const _0x4627fe=_0x5ba09f;VisuMZ[_0x4627fe(0x24a)](_0x5f5af0,_0x5f5af0);const _0x594398=_0x5f5af0[_0x4627fe(0x40b)]||[];for(const _0x37abe5 of _0x594398){_0x4627fe(0x253)!==_0x4627fe(0x235)?($gameScreen['eraseAllPictureTexts'](_0x37abe5),$gameScreen[_0x4627fe(0x356)](_0x37abe5)):this[_0x4627fe(0x17c)](_0x4fd777,0x1);}}),VisuMZ['MessageCore'][_0x5ba09f(0x184)]=Scene_Boot[_0x5ba09f(0x34d)][_0x5ba09f(0x1cc)],Scene_Boot[_0x5ba09f(0x34d)]['onDatabaseLoaded']=function(){const _0x2f1323=_0x5ba09f;VisuMZ[_0x2f1323(0x3b4)][_0x2f1323(0x184)]['call'](this),this[_0x2f1323(0x22a)](),this[_0x2f1323(0x32f)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x2f1323(0x25b)]();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x343)]=function(_0x464e36){const _0x1c4b0a=_0x5ba09f,_0x5b6ce5=VisuMZ[_0x1c4b0a(0x3b4)][_0x1c4b0a(0x406)][_0x464e36];_0x5b6ce5[_0x1c4b0a(0x187)]((_0xaacc15,_0x2a73ca)=>{const _0x29b70f=_0x1c4b0a;if(_0x29b70f(0x2f7)!==_0x29b70f(0x3bb)){if(!_0xaacc15||!_0x2a73ca)return-0x1;return _0x2a73ca[_0x29b70f(0x286)][_0x29b70f(0x39c)]-_0xaacc15[_0x29b70f(0x286)]['length'];}else{if(!_0x4b3683['value'](_0x33794c))return![];}});},Scene_Boot[_0x5ba09f(0x34d)][_0x5ba09f(0x22a)]=function(){const _0x521014=_0x5ba09f;VisuMZ[_0x521014(0x3b4)][_0x521014(0x343)](_0x521014(0x2ab));for(const _0x2fc334 of VisuMZ[_0x521014(0x3b4)][_0x521014(0x406)][_0x521014(0x2ab)]){if(_0x521014(0x315)===_0x521014(0x315)){_0x2fc334[_0x521014(0x286)]=_0x2fc334[_0x521014(0x286)][_0x521014(0x14d)](),_0x2fc334[_0x521014(0x239)]=new RegExp('\x1b'+_0x2fc334[_0x521014(0x286)],'gi'),_0x2fc334['textCodeResult']='\x1b'+_0x2fc334[_0x521014(0x286)];if(_0x2fc334[_0x521014(0x3c3)]==='')_0x2fc334[_0x521014(0x33a)]+='[0]';}else this[_0x521014(0x3a6)][_0x521014(0x199)]=_0x3439f9(_0x151e21[0x3])[_0x521014(0x341)](_0x574e8a[_0x521014(0x3b4)][_0x521014(0x406)][_0x521014(0x39e)]['FontSmallerCap'],_0x4153a0[_0x521014(0x3b4)][_0x521014(0x406)][_0x521014(0x39e)][_0x521014(0x2dd)]);}},Scene_Boot[_0x5ba09f(0x34d)][_0x5ba09f(0x32f)]=function(){const _0x361c9c=_0x5ba09f;VisuMZ[_0x361c9c(0x3b4)][_0x361c9c(0x343)](_0x361c9c(0x25c));for(const _0x32d986 of VisuMZ[_0x361c9c(0x3b4)][_0x361c9c(0x406)]['TextCodeReplace']){_0x32d986[_0x361c9c(0x239)]=new RegExp('\x1b'+_0x32d986['Match']+_0x32d986[_0x361c9c(0x3c3)],'gi'),_0x32d986['TextStr']!==''&&_0x32d986[_0x361c9c(0x32e)]!==_0x361c9c(0x3ee)?_0x361c9c(0x394)!==_0x361c9c(0x394)?this[_0x361c9c(0x3a6)][_0xc6c2fc]=_0x1ccd2e[_0x4a06c8]:_0x32d986[_0x361c9c(0x33a)]=new Function(_0x361c9c(0x274)+_0x32d986[_0x361c9c(0x32e)][_0x361c9c(0x3d8)](/\\/g,'\x1b')+'\x27'):_0x32d986['textCodeResult']=_0x32d986[_0x361c9c(0x34c)];}},Scene_Boot['prototype'][_0x5ba09f(0x37a)]=function(){const _0x2e760c=_0x5ba09f;for(const _0x4353e0 of VisuMZ[_0x2e760c(0x3b4)][_0x2e760c(0x406)][_0x2e760c(0x248)]){_0x2e760c(0x36d)===_0x2e760c(0x36d)?(_0x4353e0[_0x2e760c(0x239)]=new RegExp('\x5c['+_0x4353e0[_0x2e760c(0x286)]+'\x5c]','gi'),_0x4353e0['TextStr']!==''&&_0x4353e0[_0x2e760c(0x32e)]!==_0x2e760c(0x3ee)?_0x4353e0[_0x2e760c(0x33a)]=new Function(_0x2e760c(0x274)+_0x4353e0['TextStr']['replace'](/\\/g,'\x1b')+'\x27'):_0x4353e0[_0x2e760c(0x33a)]=_0x4353e0['TextJS']):_0x546cda[_0x2e760c(0x3b4)][_0x2e760c(0x406)][_0x2e760c(0x33b)][_0x2e760c(0x2c8)]&&this[_0x2e760c(0x1f6)]();}},Scene_Boot[_0x5ba09f(0x34d)][_0x5ba09f(0x25b)]=function(){const _0xf2adea=_0x5ba09f,_0x223d99=VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x406)][_0xf2adea(0x2c4)];!VisuMZ[_0xf2adea(0x3d5)]&&(VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x39f)]($dataClasses,_0x223d99[_0xf2adea(0x1db)]),VisuMZ[_0xf2adea(0x3b4)]['AddAutoColor']($dataSkills,_0x223d99[_0xf2adea(0x383)]),VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x39f)]($dataItems,_0x223d99[_0xf2adea(0x362)]),VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x39f)]($dataWeapons,_0x223d99[_0xf2adea(0x1aa)]),VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x39f)]($dataArmors,_0x223d99['Armors']),VisuMZ[_0xf2adea(0x3b4)][_0xf2adea(0x39f)]($dataEnemies,_0x223d99[_0xf2adea(0x369)]),VisuMZ['MessageCore'][_0xf2adea(0x39f)]($dataStates,_0x223d99[_0xf2adea(0x138)])),VisuMZ[_0xf2adea(0x3b4)]['CreateAutoColorRegExpLists']();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x208)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x5ba09f(0x2d2),_0x5ba09f(0x3ce),_0x5ba09f(0x35c),_0x5ba09f(0x175),_0x5ba09f(0x1e4),'</LEFT>',_0x5ba09f(0x337),_0x5ba09f(0x2e4),_0x5ba09f(0x2cf),'</RIGHT>',_0x5ba09f(0x309),_0x5ba09f(0x2cb),'(((',_0x5ba09f(0x1ec),_0x5ba09f(0x249),_0x5ba09f(0x263),_0x5ba09f(0x259),_0x5ba09f(0x192),_0x5ba09f(0x1a2),_0x5ba09f(0x1b6),_0x5ba09f(0x233),_0x5ba09f(0x407),_0x5ba09f(0x351),'HIDE','ENABLE',_0x5ba09f(0x157),'SWITCH',_0x5ba09f(0x15f),_0x5ba09f(0x3e2),_0x5ba09f(0x38b)],VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x39f)]=function(_0x200bf4,_0x48aaba){const _0x41079a=_0x5ba09f;if(_0x48aaba<=0x0)return;const _0x113b40=_0x200bf4;for(const _0x1797f8 of _0x113b40){if(!_0x1797f8)continue;VisuMZ[_0x41079a(0x3b4)][_0x41079a(0x182)](_0x1797f8,_0x48aaba);}},VisuMZ[_0x5ba09f(0x3b4)]['CreateAutoColorRegExpLists']=function(){const _0x271855=_0x5ba09f;VisuMZ[_0x271855(0x3b4)][_0x271855(0x1f7)]=[];for(let _0x4557cb=0x1;_0x4557cb<=0x1f;_0x4557cb++){const _0x29339f=_0x271855(0x322)[_0x271855(0x2ae)](_0x4557cb),_0x2554ea=VisuMZ['MessageCore'][_0x271855(0x406)][_0x271855(0x2c4)][_0x29339f];_0x2554ea['sort']((_0x14e125,_0x52ac9f)=>{const _0x5241df=_0x271855;if(_0x5241df(0x38f)!==_0x5241df(0x38f)){let _0x51f4d2=this[_0x5241df(0x142)]()[_0x5241df(0x178)][0x0];_0x51f4d2=_0x1bdc80[_0x5241df(0x3b4)]['ParseAddedText'](_0x51f4d2),_0x3266d6[_0x5241df(0x240)](_0x51f4d2);}else{if(!_0x14e125||!_0x52ac9f)return-0x1;return _0x52ac9f[_0x5241df(0x39c)]-_0x14e125[_0x5241df(0x39c)];}}),this[_0x271855(0x40c)](_0x2554ea,_0x4557cb);}},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x40c)]=function(_0xba178b,_0x377816){const _0x16b8ed=_0x5ba09f;for(const _0x5a0bf1 of _0xba178b){if(_0x5a0bf1[_0x16b8ed(0x39c)]<=0x0)continue;if(/^\d+$/[_0x16b8ed(0x3df)](_0x5a0bf1))continue;let _0x23dd54=VisuMZ['MessageCore'][_0x16b8ed(0x391)](_0x5a0bf1);if(_0x5a0bf1[_0x16b8ed(0x25f)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x16b8ed(0x31c)===_0x16b8ed(0x31c))var _0x36c0ad=new RegExp(_0x23dd54,'i');else{_0x2957b9[_0x16b8ed(0x3b4)][_0x16b8ed(0x14c)][_0x16b8ed(0x221)](this,_0x521db4);const _0x4ef241=_0xe49f2['MessageCore']['Settings'][_0x16b8ed(0x2c4)];_0x2d6497[_0x16b8ed(0x3b4)]['CreateAutoColorFor'](_0xb4a8a2,_0x4ef241[_0x16b8ed(0x1dd)]);}}else var _0x36c0ad=new RegExp('\x5cb'+_0x23dd54+'\x5cb','g');VisuMZ['MessageCore'][_0x16b8ed(0x1f7)][_0x16b8ed(0x36f)]([_0x36c0ad,_0x16b8ed(0x24f)[_0x16b8ed(0x2ae)](_0x377816,_0x5a0bf1)]);}},VisuMZ[_0x5ba09f(0x3b4)]['ConvertTextAutoColorRegExpFriendly']=function(_0x1d0ec4){const _0xdd000f=_0x5ba09f;return _0x1d0ec4=_0x1d0ec4['replace'](/(\W)/gi,(_0x8517e2,_0x34a445)=>_0xdd000f(0x21e)[_0xdd000f(0x2ae)](_0x34a445)),_0x1d0ec4;},VisuMZ[_0x5ba09f(0x3b4)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x5ba09f(0x22e)]=function(_0x1fe241){const _0x28c77c=_0x5ba09f;VisuMZ['MessageCore'][_0x28c77c(0x22e)]['call'](this,_0x1fe241);const _0x356d67=VisuMZ['MessageCore'][_0x28c77c(0x406)][_0x28c77c(0x2c4)];VisuMZ[_0x28c77c(0x3b4)][_0x28c77c(0x182)](_0x1fe241,_0x356d67[_0x28c77c(0x1db)]);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x375)]=VisuMZ[_0x5ba09f(0x375)],VisuMZ[_0x5ba09f(0x375)]=function(_0x40f844){const _0x5026eb=_0x5ba09f;VisuMZ['MessageCore'][_0x5026eb(0x375)][_0x5026eb(0x221)](this,_0x40f844);const _0xd10509=VisuMZ[_0x5026eb(0x3b4)][_0x5026eb(0x406)]['AutoColor'];VisuMZ[_0x5026eb(0x3b4)][_0x5026eb(0x182)](_0x40f844,_0xd10509[_0x5026eb(0x383)]);},0x7,VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x255)]=VisuMZ[_0x5ba09f(0x255)],VisuMZ[_0x5ba09f(0x255)]=function(_0x4aa9da){const _0xee62c5=_0x5ba09f;VisuMZ[_0xee62c5(0x3b4)][_0xee62c5(0x255)][_0xee62c5(0x221)](this,_0x4aa9da);const _0x387ce7=VisuMZ['MessageCore'][_0xee62c5(0x406)][_0xee62c5(0x2c4)];VisuMZ[_0xee62c5(0x3b4)][_0xee62c5(0x182)](_0x4aa9da,_0x387ce7[_0xee62c5(0x362)]);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x281)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x5ba09f(0x281)]=function(_0x1e51e5){const _0x5c6577=_0x5ba09f;VisuMZ['MessageCore'][_0x5c6577(0x281)][_0x5c6577(0x221)](this,_0x1e51e5);const _0x155303=VisuMZ[_0x5c6577(0x3b4)][_0x5c6577(0x406)][_0x5c6577(0x2c4)];VisuMZ[_0x5c6577(0x3b4)][_0x5c6577(0x182)](_0x1e51e5,_0x155303[_0x5c6577(0x1aa)]);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x14c)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x5ba09f(0x14c)]=function(_0x517bf7){const _0x17ba07=_0x5ba09f;VisuMZ['MessageCore'][_0x17ba07(0x14c)][_0x17ba07(0x221)](this,_0x517bf7);const _0x19e131=VisuMZ[_0x17ba07(0x3b4)][_0x17ba07(0x406)]['AutoColor'];VisuMZ[_0x17ba07(0x3b4)]['CreateAutoColorFor'](_0x517bf7,_0x19e131['Armors']);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x2ee)]=VisuMZ[_0x5ba09f(0x2ee)],VisuMZ[_0x5ba09f(0x2ee)]=function(_0x1738cd){const _0x2ac403=_0x5ba09f;VisuMZ[_0x2ac403(0x3b4)][_0x2ac403(0x2ee)][_0x2ac403(0x221)](this,_0x1738cd);const _0x238396=VisuMZ[_0x2ac403(0x3b4)][_0x2ac403(0x406)]['AutoColor'];VisuMZ[_0x2ac403(0x3b4)][_0x2ac403(0x182)](_0x1738cd,_0x238396[_0x2ac403(0x369)]);},VisuMZ['MessageCore']['ParseStateNotetags']=VisuMZ[_0x5ba09f(0x1a1)],VisuMZ[_0x5ba09f(0x1a1)]=function(_0x3674e2){const _0x347cca=_0x5ba09f;VisuMZ[_0x347cca(0x3b4)]['ParseStateNotetags'][_0x347cca(0x221)](this,_0x3674e2);const _0x260009=VisuMZ[_0x347cca(0x3b4)]['Settings'][_0x347cca(0x2c4)];VisuMZ[_0x347cca(0x3b4)][_0x347cca(0x182)](_0x3674e2,_0x260009[_0x347cca(0x138)]);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x182)]=function(_0x1e9e4b,_0x536b4c){const _0x4fdb04=_0x5ba09f;if(_0x536b4c<=0x0)return;const _0x2d2fdb=VisuMZ[_0x4fdb04(0x3b4)][_0x4fdb04(0x406)]['AutoColor'][_0x4fdb04(0x28e)+_0x536b4c];let _0x439b41=_0x1e9e4b['name'][_0x4fdb04(0x19f)]();if(/^\d+$/[_0x4fdb04(0x3df)](_0x439b41))return;if(VisuMZ['MessageCore'][_0x4fdb04(0x208)][_0x4fdb04(0x3e5)](_0x439b41[_0x4fdb04(0x14d)]()))return;_0x439b41=_0x439b41[_0x4fdb04(0x3d8)](/\\I\[(\d+)\]/gi,''),_0x439b41=_0x439b41[_0x4fdb04(0x3d8)](/\x1bI\[(\d+)\]/gi,'');if(_0x439b41[_0x4fdb04(0x39c)]<=0x0)return;if(_0x439b41[_0x4fdb04(0x25f)](/-----/i))return;_0x2d2fdb[_0x4fdb04(0x36f)](_0x439b41);},SceneManager['isSceneBattle']=function(){const _0x3307ad=_0x5ba09f;return this[_0x3307ad(0x2df)]&&this[_0x3307ad(0x2df)]['constructor']===Scene_Battle;},SceneManager[_0x5ba09f(0x216)]=function(){const _0x17955a=_0x5ba09f;return this['_scene']&&this[_0x17955a(0x2df)]['constructor']===Scene_Map;},VisuMZ['MessageCore'][_0x5ba09f(0x28b)]=TextManager['message'],TextManager[_0x5ba09f(0x350)]=function(_0x2252da){const _0x5a5d9e=_0x5ba09f,_0x9465cc=[_0x5a5d9e(0x37e),'emerge',_0x5a5d9e(0x194),_0x5a5d9e(0x260),_0x5a5d9e(0x15a),_0x5a5d9e(0x155),'escapeStart',_0x5a5d9e(0x39a),_0x5a5d9e(0x27c),_0x5a5d9e(0x27d)];let _0x2ea93e=VisuMZ['MessageCore']['TextManager_message'][_0x5a5d9e(0x221)](this,_0x2252da);return _0x9465cc['includes'](_0x2252da)&&(_0x2ea93e='</WORDWRAP>'+_0x2ea93e),_0x2ea93e;},ConfigManager[_0x5ba09f(0x1d3)]=VisuMZ['MessageCore']['Settings'][_0x5ba09f(0x33b)][_0x5ba09f(0x308)],VisuMZ['MessageCore'][_0x5ba09f(0x3a5)]=ConfigManager['makeData'],ConfigManager[_0x5ba09f(0x348)]=function(){const _0x131a10=_0x5ba09f,_0x3b0844=VisuMZ[_0x131a10(0x3b4)][_0x131a10(0x3a5)][_0x131a10(0x221)](this);return _0x3b0844[_0x131a10(0x1d3)]=this[_0x131a10(0x1d3)],_0x3b0844;},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3f6)]=ConfigManager[_0x5ba09f(0x18b)],ConfigManager[_0x5ba09f(0x18b)]=function(_0x3275ed){const _0x56ab66=_0x5ba09f;VisuMZ[_0x56ab66(0x3b4)][_0x56ab66(0x3f6)][_0x56ab66(0x221)](this,_0x3275ed),_0x56ab66(0x1d3)in _0x3275ed?'HLJDQ'!==_0x56ab66(0x2fb)?this['textSpeed']=Number(_0x3275ed[_0x56ab66(0x1d3)])[_0x56ab66(0x341)](0x1,0xb):(this[_0x56ab66(0x349)](),this[_0x56ab66(0x368)](),this[_0x56ab66(0x33e)](_0x4fbb2f)):'tKHXQ'===_0x56ab66(0x2bb)?this[_0x56ab66(0x1d3)]=VisuMZ[_0x56ab66(0x3b4)][_0x56ab66(0x406)][_0x56ab66(0x33b)]['Default']:_0x369cdc=_0x56ab66(0x24f)[_0x56ab66(0x2ae)](_0x17d564,_0xb76e3f);},TextManager[_0x5ba09f(0x35e)]=VisuMZ['MessageCore']['Settings'][_0x5ba09f(0x33b)][_0x5ba09f(0x258)],TextManager['instantTextSpeed']=VisuMZ[_0x5ba09f(0x3b4)]['Settings'][_0x5ba09f(0x33b)][_0x5ba09f(0x2f1)],VisuMZ[_0x5ba09f(0x3b4)]['Game_System_initialize']=Game_System[_0x5ba09f(0x34d)]['initialize'],Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x1a7)]=function(){const _0x3344a1=_0x5ba09f;VisuMZ['MessageCore'][_0x3344a1(0x171)]['call'](this),this['initMessageCore']();},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x311)]=function(){const _0x1f2eb4=_0x5ba09f,_0x3d2abe=VisuMZ[_0x1f2eb4(0x3b4)][_0x1f2eb4(0x406)][_0x1f2eb4(0x39e)],_0x451b8d=VisuMZ[_0x1f2eb4(0x3b4)][_0x1f2eb4(0x406)][_0x1f2eb4(0x241)];this[_0x1f2eb4(0x32d)]={'messageRows':_0x3d2abe[_0x1f2eb4(0x398)],'messageWidth':_0x3d2abe[_0x1f2eb4(0x393)],'messageWordWrap':_0x451b8d['MessageWindow'],'helpWordWrap':_0x451b8d[_0x1f2eb4(0x40d)],'choiceLineHeight':_0x3d2abe[_0x1f2eb4(0x3cc)],'choiceRows':_0x3d2abe[_0x1f2eb4(0x3e1)],'choiceCols':_0x3d2abe[_0x1f2eb4(0x3ea)],'choiceTextAlign':_0x3d2abe[_0x1f2eb4(0x2f4)]},this[_0x1f2eb4(0x371)]===undefined&&(this[_0x1f2eb4(0x371)]=_0x3d2abe[_0x1f2eb4(0x1b0)],this['_messageOffsetY']=_0x3d2abe[_0x1f2eb4(0x3d2)]);},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x135)]=function(){const _0x2484b0=_0x5ba09f;if(this[_0x2484b0(0x32d)]===undefined)this['initMessageCore']();if(this[_0x2484b0(0x32d)][_0x2484b0(0x1d8)]===undefined)this['initMessageCore']();return this[_0x2484b0(0x32d)]['messageRows'];},Game_System['prototype'][_0x5ba09f(0x3d9)]=function(_0x335130){const _0x233e0e=_0x5ba09f;if(this[_0x233e0e(0x32d)]===undefined)this['initMessageCore']();if(this[_0x233e0e(0x32d)][_0x233e0e(0x1d8)]===undefined)this[_0x233e0e(0x311)]();this[_0x233e0e(0x32d)][_0x233e0e(0x1d8)]=_0x335130||0x1;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x409)]=function(){const _0x326ca8=_0x5ba09f;if(this['_MessageCoreSettings']===undefined)this[_0x326ca8(0x311)]();if(this['_MessageCoreSettings'][_0x326ca8(0x2b3)]===undefined)this[_0x326ca8(0x311)]();return this[_0x326ca8(0x32d)]['messageWidth'];},Game_System['prototype'][_0x5ba09f(0x13d)]=function(_0x338511){const _0x3e7efd=_0x5ba09f;if(this[_0x3e7efd(0x32d)]===undefined)this[_0x3e7efd(0x311)]();if(this[_0x3e7efd(0x32d)]['messageWidth']===undefined)this['initMessageCore']();_0x338511=Math[_0x3e7efd(0x2de)](_0x338511);if(_0x338511%0x2!==0x0)_0x338511+=0x1;this[_0x3e7efd(0x32d)][_0x3e7efd(0x2b3)]=_0x338511||0x2;},Game_System[_0x5ba09f(0x34d)]['isMessageWindowWordWrap']=function(){const _0x934110=_0x5ba09f;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x934110(0x32d)][_0x934110(0x303)]===undefined)this['initMessageCore']();return this[_0x934110(0x32d)][_0x934110(0x303)];},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x27b)]=function(_0x286fdd){const _0x91fe37=_0x5ba09f;if(this[_0x91fe37(0x32d)]===undefined)this[_0x91fe37(0x311)]();if(this[_0x91fe37(0x32d)][_0x91fe37(0x303)]===undefined)this[_0x91fe37(0x311)]();this[_0x91fe37(0x32d)][_0x91fe37(0x303)]=_0x286fdd;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x220)]=function(){const _0x224c12=_0x5ba09f;if(this[_0x224c12(0x371)]===undefined){const _0x5355ff=VisuMZ[_0x224c12(0x3b4)][_0x224c12(0x406)][_0x224c12(0x39e)];this['_messageOffsetX']=_0x5355ff[_0x224c12(0x1b0)],this['_messageOffsetY']=_0x5355ff['MsgWindowOffsetY'];}return{'x':this[_0x224c12(0x371)]||0x0,'y':this[_0x224c12(0x2af)]||0x0};},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x20d)]=function(_0x5cd15a,_0x7da348){const _0x11cd27=_0x5ba09f;if(this[_0x11cd27(0x32d)]===undefined)this[_0x11cd27(0x311)]();this[_0x11cd27(0x371)]=_0x5cd15a,this[_0x11cd27(0x2af)]=_0x7da348;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x18a)]=function(){const _0x24b53b=_0x5ba09f;if(this[_0x24b53b(0x32d)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x24b53b(0x389)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x24b53b(0x389)];},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x363)]=function(_0x2de9b3){const _0x4e2ec9=_0x5ba09f;if(this[_0x4e2ec9(0x32d)]===undefined)this[_0x4e2ec9(0x311)]();if(this[_0x4e2ec9(0x32d)][_0x4e2ec9(0x389)]===undefined)this[_0x4e2ec9(0x311)]();this[_0x4e2ec9(0x32d)]['helpWordWrap']=_0x2de9b3;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x207)]=function(){const _0x10455c=_0x5ba09f;if(this[_0x10455c(0x32d)]===undefined)this[_0x10455c(0x311)]();if(this[_0x10455c(0x32d)]['choiceLineHeight']===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x10455c(0x3ed)];},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x24d)]=function(_0x2188c5){const _0x11ea62=_0x5ba09f;if(this[_0x11ea62(0x32d)]===undefined)this[_0x11ea62(0x311)]();if(this['_MessageCoreSettings']['choiceLineHeight']===undefined)this[_0x11ea62(0x311)]();this['_MessageCoreSettings']['choiceLineHeight']=_0x2188c5||0x1;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x2fa)]=function(){const _0x3efbc0=_0x5ba09f;if(this[_0x3efbc0(0x32d)]===undefined)this[_0x3efbc0(0x311)]();if(this[_0x3efbc0(0x32d)][_0x3efbc0(0x1f5)]===undefined)this[_0x3efbc0(0x311)]();return this[_0x3efbc0(0x32d)][_0x3efbc0(0x1f5)];},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x16f)]=function(_0x355521){const _0x42af76=_0x5ba09f;if(this[_0x42af76(0x32d)]===undefined)this[_0x42af76(0x311)]();if(this['_MessageCoreSettings'][_0x42af76(0x1f5)]===undefined)this['initMessageCore']();this[_0x42af76(0x32d)][_0x42af76(0x1f5)]=_0x355521||0x1;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x21a)]=function(){const _0x515ab7=_0x5ba09f;if(this[_0x515ab7(0x32d)]===undefined)this[_0x515ab7(0x311)]();if(this['_MessageCoreSettings'][_0x515ab7(0x1a8)]===undefined)this[_0x515ab7(0x311)]();return this[_0x515ab7(0x32d)][_0x515ab7(0x1a8)];},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x1bf)]=function(_0x17b314){const _0x3f83db=_0x5ba09f;if(this['_MessageCoreSettings']===undefined)this[_0x3f83db(0x311)]();if(this[_0x3f83db(0x32d)][_0x3f83db(0x1a8)]===undefined)this['initMessageCore']();this[_0x3f83db(0x32d)][_0x3f83db(0x1a8)]=_0x17b314||0x1;},Game_System[_0x5ba09f(0x34d)][_0x5ba09f(0x3f2)]=function(){const _0x2f4261=_0x5ba09f;if(this[_0x2f4261(0x32d)]===undefined)this[_0x2f4261(0x311)]();if(this[_0x2f4261(0x32d)][_0x2f4261(0x1c9)]===undefined)this[_0x2f4261(0x311)]();return this['_MessageCoreSettings']['choiceTextAlign'];},Game_System['prototype'][_0x5ba09f(0x197)]=function(_0x432ac5){const _0x4fb065=_0x5ba09f;if(this[_0x4fb065(0x32d)]===undefined)this[_0x4fb065(0x311)]();if(this[_0x4fb065(0x32d)][_0x4fb065(0x1c9)]===undefined)this[_0x4fb065(0x311)]();this['_MessageCoreSettings'][_0x4fb065(0x1c9)]=_0x432ac5['toLowerCase']();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x32b)]=Game_Screen['prototype'][_0x5ba09f(0x13e)],Game_Screen[_0x5ba09f(0x34d)][_0x5ba09f(0x13e)]=function(){const _0x429980=_0x5ba09f;VisuMZ['MessageCore'][_0x429980(0x32b)][_0x429980(0x221)](this),this[_0x429980(0x2c5)]();},Game_Screen['prototype'][_0x5ba09f(0x2c5)]=function(){const _0x230fa4=_0x5ba09f;this[_0x230fa4(0x152)]=[],this[_0x230fa4(0x34b)]=[];},Game_Screen[_0x5ba09f(0x34d)][_0x5ba09f(0x1cb)]=function(_0xcb8eb){const _0x4a6335=_0x5ba09f;if(this['_pictureText']===undefined)this[_0x4a6335(0x2c5)]();const _0x1986cc=this['realPictureId'](_0xcb8eb);return this[_0x4a6335(0x152)][_0x1986cc]=this[_0x4a6335(0x152)][_0x1986cc]||{},this[_0x4a6335(0x152)][_0x1986cc];},Game_Screen[_0x5ba09f(0x34d)][_0x5ba09f(0x37b)]=function(_0x266e0d,_0x4c8ec0){const _0x86e98=_0x5ba09f;return _0x4c8ec0=_0x4c8ec0[_0x86e98(0x17e)]()[_0x86e98(0x19f)](),this[_0x86e98(0x1cb)](_0x266e0d)[_0x4c8ec0]||'';},Game_Screen[_0x5ba09f(0x34d)][_0x5ba09f(0x266)]=function(_0x23ee90,_0x31ac60,_0x4fb342){const _0x188511=_0x5ba09f;_0x4fb342=_0x4fb342[_0x188511(0x17e)]()['trim'](),this[_0x188511(0x1cb)](_0x23ee90)[_0x4fb342]=_0x31ac60||'';},Game_Screen[_0x5ba09f(0x34d)]['eraseAllPictureTexts']=function(_0x3707e1){const _0x471e15=_0x5ba09f;if(this[_0x471e15(0x152)]===undefined)this['clearAllPictureTexts']();const _0x5d8da7=this['realPictureId'](_0x3707e1);this['_pictureText'][_0x5d8da7]=null;},Game_Screen[_0x5ba09f(0x34d)][_0x5ba09f(0x222)]=function(_0x2e5822){const _0x3f38ab=_0x5ba09f;if(this['_pictureText']===undefined)this[_0x3f38ab(0x2c5)]();const _0x560f35=this[_0x3f38ab(0x225)](_0x2e5822);return this[_0x3f38ab(0x34b)][_0x560f35]||0x0;},Game_Screen[_0x5ba09f(0x34d)]['setPictureTextBuffer']=function(_0x43c766,_0x1cb500){const _0x392d59=_0x5ba09f;if(this[_0x392d59(0x152)]===undefined)this[_0x392d59(0x2c5)]();const _0x589dc2=this['realPictureId'](_0x43c766);this['_pictureTextBuffer'][_0x589dc2]=Math[_0x392d59(0x336)](0x0,_0x1cb500);},Game_Screen['prototype'][_0x5ba09f(0x356)]=function(_0xa36fd9){const _0xea3965=_0x5ba09f;if(this[_0xea3965(0x152)]===undefined)this[_0xea3965(0x2c5)]();const _0x278410=this[_0xea3965(0x225)](_0xa36fd9);this[_0xea3965(0x34b)][_0x278410]=undefined;},VisuMZ[_0x5ba09f(0x3b4)]['Game_Screen_erasePicture']=Game_Screen['prototype'][_0x5ba09f(0x305)],Game_Screen['prototype'][_0x5ba09f(0x305)]=function(_0x4436ed){const _0x598874=_0x5ba09f;VisuMZ[_0x598874(0x3b4)][_0x598874(0x2ba)][_0x598874(0x221)](this,_0x4436ed),this[_0x598874(0x23c)](_0x4436ed),this['erasePictureTextBuffer'](_0x4436ed);},VisuMZ['MessageCore'][_0x5ba09f(0x280)]=Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x1a7)],Game_Party['prototype'][_0x5ba09f(0x1a7)]=function(){const _0x38bb88=_0x5ba09f;VisuMZ[_0x38bb88(0x3b4)][_0x38bb88(0x280)]['call'](this),this[_0x38bb88(0x311)]();},Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x311)]=function(){const _0x43afb0=_0x5ba09f;this[_0x43afb0(0x282)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x196)]=function(){const _0x34b64e=_0x5ba09f;if(this[_0x34b64e(0x282)]===undefined)this['initMessageCore']();return this[_0x34b64e(0x282)];},Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x29c)]=function(_0x414289,_0x183c00){const _0x1f1338=_0x5ba09f;if(this[_0x1f1338(0x282)]===undefined)this['initMessageCore']();if(!_0x414289)return;if(DataManager[_0x1f1338(0x2cd)](_0x414289))this[_0x1f1338(0x282)][_0x1f1338(0x149)]=0x0;else{if(DataManager[_0x1f1338(0x22f)](_0x414289))this[_0x1f1338(0x282)][_0x1f1338(0x149)]=0x1;else DataManager[_0x1f1338(0x1e7)](_0x414289)&&('pZUtB'==='Heabz'?(this[_0x1f1338(0x142)]()['parameters'][0x0]=_0xbfc1df,_0x5d3c9a++):this[_0x1f1338(0x282)][_0x1f1338(0x149)]=0x2);}this[_0x1f1338(0x282)]['id']=_0x414289['id'],this['_lastGainedItemData'][_0x1f1338(0x36a)]=_0x183c00;},VisuMZ['MessageCore']['Game_Party_gainItem']=Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x254)],Game_Party[_0x5ba09f(0x34d)][_0x5ba09f(0x254)]=function(_0x1638c7,_0x2d06d1,_0x439a4e){const _0x1e5453=_0x5ba09f;VisuMZ['MessageCore'][_0x1e5453(0x133)]['call'](this,_0x1638c7,_0x2d06d1,_0x439a4e),_0x2d06d1>0x0&&this[_0x1e5453(0x29c)](_0x1638c7,_0x2d06d1);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x211)]=Game_Map[_0x5ba09f(0x34d)]['initialize'],Game_Map['prototype'][_0x5ba09f(0x1a7)]=function(){const _0x44ecbb=_0x5ba09f;VisuMZ[_0x44ecbb(0x3b4)][_0x44ecbb(0x211)][_0x44ecbb(0x221)](this),this[_0x44ecbb(0x388)]=[];},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3b5)]=Game_Map['prototype'][_0x5ba09f(0x167)],Game_Map[_0x5ba09f(0x34d)][_0x5ba09f(0x167)]=function(){const _0x2fef47=_0x5ba09f;VisuMZ[_0x2fef47(0x3b4)]['Game_Map_setupEvents']['call'](this),this[_0x2fef47(0x388)]=[];},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x27e)]=Game_Map[_0x5ba09f(0x34d)]['updateEvents'],Game_Map['prototype'][_0x5ba09f(0x29d)]=function(){const _0x13fb28=_0x5ba09f;VisuMZ[_0x13fb28(0x3b4)][_0x13fb28(0x27e)][_0x13fb28(0x221)](this),this[_0x13fb28(0x272)]();},Game_Map[_0x5ba09f(0x34d)][_0x5ba09f(0x206)]=function(_0x34c979){const _0x2717be=_0x5ba09f;if(!$dataCommonEvents[_0x34c979])return;this['_messageCommonEvents']=this[_0x2717be(0x388)]||[];const _0x52d745=this[_0x2717be(0x292)]['_eventId'],_0x49646b=new Game_MessageCommonEvent(_0x34c979,_0x52d745);this[_0x2717be(0x388)][_0x2717be(0x36f)](_0x49646b);},Game_Map['prototype'][_0x5ba09f(0x272)]=function(){const _0x1c7573=_0x5ba09f;this['_messageCommonEvents']=this[_0x1c7573(0x388)]||[];for(const _0x30d3c4 of this[_0x1c7573(0x388)]){!_0x30d3c4[_0x1c7573(0x292)]?this[_0x1c7573(0x388)][_0x1c7573(0x34e)](_0x30d3c4):_0x30d3c4['update']();}},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x141)]=function(_0x2546dc){const _0x4c5551=_0x5ba09f;if($gameMessage['isBusy']())return![];return this[_0x4c5551(0x2f8)](_0x2546dc),this[_0x4c5551(0x232)](_0x2546dc),this[_0x4c5551(0x35d)](_0x2546dc),this['setWaitMode'](_0x4c5551(0x350)),!![];},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x2f8)]=function(_0x32b9b5){const _0x1fd05f=_0x5ba09f;$gameMessage[_0x1fd05f(0x352)](_0x32b9b5[0x0],_0x32b9b5[0x1]),$gameMessage[_0x1fd05f(0x26e)](_0x32b9b5[0x2]),$gameMessage[_0x1fd05f(0x3e3)](_0x32b9b5[0x3]),$gameMessage[_0x1fd05f(0x2ac)](_0x32b9b5[0x4]);},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x232)]=function(_0x3b41a4){const _0x465be6=_0x5ba09f;while(this[_0x465be6(0x19d)]()){if(_0x465be6(0x297)!==_0x465be6(0x297)){if(this[_0x465be6(0x32d)]===_0x585db3)this[_0x465be6(0x311)]();if(this[_0x465be6(0x32d)]['helpWordWrap']===_0x1ea3d)this['initMessageCore']();return this[_0x465be6(0x32d)][_0x465be6(0x389)];}else{this[_0x465be6(0x366)]++;if(this[_0x465be6(0x142)]()['code']===0x191){let _0x104906=this[_0x465be6(0x142)]()[_0x465be6(0x178)][0x0];_0x104906=VisuMZ[_0x465be6(0x3b4)][_0x465be6(0x1f3)](_0x104906),$gameMessage['add'](_0x104906);}if(this[_0x465be6(0x3b6)]())break;}}},Game_Interpreter['prototype'][_0x5ba09f(0x19d)]=function(){const _0x5be64f=_0x5ba09f;if(this[_0x5be64f(0x2c9)]()===0x65&&$gameSystem[_0x5be64f(0x135)]()>0x4){if(_0x5be64f(0x34f)!==_0x5be64f(0x33c))return!![];else _0x532771=_0x2fdf16['floor'](this['height']-_0xc6d915['height']-_0x2dd4b2);}else{if(_0x5be64f(0x183)==='kAzjg')var _0x7e662c=new _0x51f6e3(_0x4b9e51,'i');else return this[_0x5be64f(0x2c9)]()===0x191;}},VisuMZ[_0x5ba09f(0x3b4)]['ParseAddedText']=function(_0x41916a){const _0x3c0b30=_0x5ba09f;return _0x41916a=_0x41916a[_0x3c0b30(0x3d8)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x41916a;},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x3b6)]=function(){const _0x2bdf9a=_0x5ba09f;if(this[_0x2bdf9a(0x142)]()&&this[_0x2bdf9a(0x142)]()[_0x2bdf9a(0x178)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi)){if(_0x2bdf9a(0x290)==='JTeNV'){let _0x27a610=_0x217cee[_0x2bdf9a(0x3b4)][_0x2bdf9a(0x1d5)][_0x2bdf9a(0x221)](this);const _0x49b8fa=_0x1983c1[_0x2bdf9a(0x3b4)][_0x2bdf9a(0x406)];if(_0x49b8fa[_0x2bdf9a(0x33b)][_0x2bdf9a(0x2c8)]&&_0x49b8fa[_0x2bdf9a(0x33b)][_0x2bdf9a(0x326)])_0x27a610++;return _0x27a610;}else return!![];}return $gameMessage[_0x2bdf9a(0x3db)][_0x2bdf9a(0x39c)]>=$gameSystem[_0x2bdf9a(0x135)]()&&this[_0x2bdf9a(0x2c9)]()!==0x191;},Game_Interpreter['prototype']['prepareShowTextFollowups']=function(_0x44162b){const _0x1a0d4e=_0x5ba09f;switch(this[_0x1a0d4e(0x2c9)]()){case 0x66:this[_0x1a0d4e(0x366)]++,this[_0x1a0d4e(0x176)](this['currentCommand']()[_0x1a0d4e(0x178)]);break;case 0x67:this[_0x1a0d4e(0x366)]++,this[_0x1a0d4e(0x3e4)](this[_0x1a0d4e(0x142)]()['parameters']);break;case 0x68:this['_index']++,this[_0x1a0d4e(0x331)](this[_0x1a0d4e(0x142)]()[_0x1a0d4e(0x178)]);break;}},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x23a)]=Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x176)],Game_Interpreter[_0x5ba09f(0x34d)]['setupChoices']=function(_0x40c3f6){const _0x105f5b=_0x5ba09f;_0x40c3f6=this[_0x105f5b(0x2b4)](),VisuMZ[_0x105f5b(0x3b4)][_0x105f5b(0x23a)][_0x105f5b(0x221)](this,_0x40c3f6);},Game_Interpreter['prototype'][_0x5ba09f(0x2b4)]=function(){const _0x5ac434=_0x5ba09f,_0x1277e8=this[_0x5ac434(0x366)],_0x3036a6=[];let _0x426ff7=0x0;this['_index']++;while(this[_0x5ac434(0x366)]<this[_0x5ac434(0x172)][_0x5ac434(0x39c)]){if(_0x5ac434(0x23e)===_0x5ac434(0x2c1))return _0x2555f7=_0x3f01c0[_0x5ac434(0x3d8)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x442817;else{if(this[_0x5ac434(0x142)]()['indent']===this[_0x5ac434(0x189)]){if('XQZuM'===_0x5ac434(0x378)){var _0x341708=_0xa3ecde[_0x5ac434(0x178)][0x1]+_0x2c76c9;this['_list'][_0xc8e592][_0x5ac434(0x178)][0x1]=_0x341708;}else{if(this[_0x5ac434(0x142)]()['code']===0x194&&this[_0x5ac434(0x2c9)]()!==0x66)break;else{if(this['currentCommand']()['code']===0x66){if(_0x5ac434(0x28d)==='CyRcE')this[_0x5ac434(0x3a3)](_0x426ff7,this[_0x5ac434(0x142)](),_0x1277e8),this['_index']-=0x2;else return _0x507282=_0x50575e[_0x5ac434(0x3d8)](/<B>/gi,'\x1bBOLD[1]'),_0x1c8e7a=_0x40a63c[_0x5ac434(0x3d8)](/<\/B>/gi,_0x5ac434(0x1ae)),_0x59c28e=_0x1d02da[_0x5ac434(0x3d8)](/<I>/gi,'\x1bITALIC[1]'),_0x5e2624=_0x4679d6[_0x5ac434(0x3d8)](/<\/I>/gi,_0x5ac434(0x35a)),_0x4d1f96;}else this[_0x5ac434(0x142)]()[_0x5ac434(0x277)]===0x192&&(_0x5ac434(0x256)!==_0x5ac434(0x1ff)?(this['currentCommand']()[_0x5ac434(0x178)][0x0]=_0x426ff7,_0x426ff7++):this[_0x5ac434(0x24c)](this[_0x5ac434(0x2c0)]['x'],this['_resetRect']['y'],this[_0x5ac434(0x2c0)][_0x5ac434(0x273)],this[_0x5ac434(0x2c0)][_0x5ac434(0x144)],_0x3d4378,_0xdd09a6));}}}this[_0x5ac434(0x366)]++;}}return this[_0x5ac434(0x366)]=_0x1277e8,this[_0x5ac434(0x142)]()['parameters'];},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x3a3)]=function(_0x4d3c78,_0x3e07c1,_0x26affb){const _0x565faf=_0x5ba09f;this[_0x565faf(0x26a)](_0x4d3c78,_0x3e07c1,_0x26affb),this[_0x565faf(0x2e2)](_0x4d3c78,_0x3e07c1,_0x26affb),this[_0x565faf(0x2d6)](_0x3e07c1,_0x26affb);},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x26a)]=function(_0x1bac78,_0x8b0751,_0x47284e){const _0x3ff741=_0x5ba09f;if(_0x8b0751[_0x3ff741(0x178)][0x2]<0x0)return;const _0x28d076=_0x8b0751[_0x3ff741(0x178)][0x2]+_0x1bac78;this['_list'][_0x47284e]['parameters'][0x2]=_0x28d076;},Game_Interpreter[_0x5ba09f(0x34d)][_0x5ba09f(0x2e2)]=function(_0x27b398,_0x53765c,_0xb2de67){const _0x1a2982=_0x5ba09f;if(_0x53765c[_0x1a2982(0x178)][0x1]>=0x0){if(_0x1a2982(0x318)!=='QDllS'){var _0x128663=_0x53765c['parameters'][0x1]+_0x27b398;this[_0x1a2982(0x172)][_0xb2de67][_0x1a2982(0x178)][0x1]=_0x128663;}else this[_0x1a2982(0x32a)]['x']=_0x29b6a0['round'](this[_0x1a2982(0x273)]/0x2),this[_0x1a2982(0x32a)][_0x1a2982(0x174)]['x']=0.5,this[_0x1a2982(0x32a)][_0x1a2982(0x1f2)]['x']=_0xfd16e4[_0x1a2982(0x273)];}else _0x53765c[_0x1a2982(0x178)][0x1]===-0x2&&(_0x1a2982(0x19b)!==_0x1a2982(0x19b)?this[_0x1a2982(0x26f)]():this[_0x1a2982(0x172)][_0xb2de67][_0x1a2982(0x178)][0x1]=_0x53765c[_0x1a2982(0x178)][0x1]);},Game_Interpreter['prototype'][_0x5ba09f(0x2d6)]=function(_0x34aeda,_0x3b88ca){const _0x40ce33=_0x5ba09f;for(const _0x46bbdb of _0x34aeda[_0x40ce33(0x178)][0x0]){this[_0x40ce33(0x172)][_0x3b88ca][_0x40ce33(0x178)][0x0]['push'](_0x46bbdb);}this[_0x40ce33(0x172)][_0x40ce33(0x13c)](this[_0x40ce33(0x366)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x4f4820=_0x5ba09f;this[_0x4f4820(0x1a7)](...arguments);}Game_MessageCommonEvent[_0x5ba09f(0x34d)][_0x5ba09f(0x1a7)]=function(_0x1ab3a2,_0x158a09){const _0x294ac1=_0x5ba09f;this[_0x294ac1(0x2ff)]=_0x1ab3a2,this['_eventId']=_0x158a09||0x0,this[_0x294ac1(0x20a)]();},Game_MessageCommonEvent[_0x5ba09f(0x34d)]['event']=function(){const _0x2beaf1=_0x5ba09f;return $dataCommonEvents[this[_0x2beaf1(0x2ff)]];},Game_MessageCommonEvent['prototype'][_0x5ba09f(0x204)]=function(){const _0xb1bafb=_0x5ba09f;return this[_0xb1bafb(0x3a0)]()['list'];},Game_MessageCommonEvent[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)]=function(){const _0x20efef=_0x5ba09f;this[_0x20efef(0x292)]=new Game_Interpreter(),this['_interpreter'][_0x20efef(0x333)](this[_0x20efef(0x204)](),this[_0x20efef(0x380)]);},Game_MessageCommonEvent['prototype']['update']=function(){const _0x95eb37=_0x5ba09f;this[_0x95eb37(0x292)]&&(this[_0x95eb37(0x292)]['isRunning']()?this[_0x95eb37(0x292)][_0x95eb37(0x202)]():this[_0x95eb37(0x1b8)]());},Game_MessageCommonEvent['prototype'][_0x5ba09f(0x1b8)]=function(){const _0x3b0a94=_0x5ba09f;this[_0x3b0a94(0x292)]=null;},Scene_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2ce)]=function(){const _0x46eb15=_0x5ba09f,_0x358e39=Math['min'](Graphics['width'],$gameSystem[_0x46eb15(0x409)]()),_0x5c2bf0=$gameSystem[_0x46eb15(0x135)](),_0x1719cd=this[_0x46eb15(0x1f4)](_0x5c2bf0,![]),_0xe8482c=(Graphics['boxWidth']-_0x358e39)/0x2,_0x32f625=0x0;return new Rectangle(_0xe8482c,_0x32f625,_0x358e39,_0x1719cd);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x1d5)]=Scene_Options['prototype'][_0x5ba09f(0x33f)],Scene_Options['prototype'][_0x5ba09f(0x33f)]=function(){const _0x32909b=_0x5ba09f;let _0x2dbf59=VisuMZ['MessageCore'][_0x32909b(0x1d5)][_0x32909b(0x221)](this);const _0x2fff37=VisuMZ[_0x32909b(0x3b4)][_0x32909b(0x406)];if(_0x2fff37[_0x32909b(0x33b)]['AddOption']&&_0x2fff37[_0x32909b(0x33b)][_0x32909b(0x326)])_0x2dbf59++;return _0x2dbf59;},VisuMZ[_0x5ba09f(0x3b4)]['Sprite_Picture_updateBitmap']=Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x399)],Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x399)]=function(){const _0x5abd4b=_0x5ba09f;VisuMZ['MessageCore'][_0x5abd4b(0x38e)][_0x5abd4b(0x221)](this),this['createPictureText']();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x1df)]=Sprite_Picture['prototype']['update'],Sprite_Picture['prototype'][_0x5ba09f(0x202)]=function(){const _0x1b6e3e=_0x5ba09f;VisuMZ[_0x1b6e3e(0x3b4)][_0x1b6e3e(0x1df)]['call'](this),this[_0x1b6e3e(0x200)]();},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x200)]=function(){const _0x125bb9=_0x5ba09f;if(!this['visible'])return;this['resizePictureText'](),this[_0x125bb9(0x169)](),this[_0x125bb9(0x212)](),this[_0x125bb9(0x190)]();},Sprite_Picture[_0x5ba09f(0x34d)]['createPictureText']=function(){const _0x5e7eef=_0x5ba09f;if(this['_pictureTextWindow'])return;if(this[_0x5e7eef(0x2be)])return;const _0x4218e3=new Rectangle(0x0,0x0,0x0,0x0);this[_0x5e7eef(0x276)]=new Window_Base(_0x4218e3),this['_pictureTextWindow']['padding']=0x0,this[_0x5e7eef(0x2be)]=new Sprite(),this['addChildAt'](this[_0x5e7eef(0x2be)],0x0),this[_0x5e7eef(0x2c3)]=0x0,this[_0x5e7eef(0x2ca)]=0x0,this[_0x5e7eef(0x357)]={};},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x19e)]=function(){const _0x161d2a=_0x5ba09f;if(!this[_0x161d2a(0x276)])return;if(this[_0x161d2a(0x2c3)]===this['width']&&this[_0x161d2a(0x2ca)]===this['height'])return;this[_0x161d2a(0x2c3)]=this[_0x161d2a(0x273)],this[_0x161d2a(0x2ca)]=this[_0x161d2a(0x144)],this[_0x161d2a(0x357)]={},this[_0x161d2a(0x276)]['move'](0x0,0x0,this[_0x161d2a(0x273)],this[_0x161d2a(0x144)]);},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x169)]=function(){const _0x4fe2b7=_0x5ba09f;if(!this[_0x4fe2b7(0x2be)])return;this[_0x4fe2b7(0x2be)][_0x4fe2b7(0x174)]['x']=this[_0x4fe2b7(0x174)]['x'],this[_0x4fe2b7(0x2be)][_0x4fe2b7(0x174)]['y']=this['anchor']['y'];},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x212)]=function(){const _0x14e2e8=_0x5ba09f;if(!this[_0x14e2e8(0x276)])return;if(!this[_0x14e2e8(0x36e)]())return;const _0x27120c=['upperleft','up',_0x14e2e8(0x191),'left',_0x14e2e8(0x293),_0x14e2e8(0x19a),_0x14e2e8(0x385),_0x14e2e8(0x210),_0x14e2e8(0x137)];this[_0x14e2e8(0x276)][_0x14e2e8(0x3aa)]();for(const _0x276c9d of _0x27120c){'mUInT'!==_0x14e2e8(0x32c)?(_0x5af078('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x14e2e8(0x2ae)](_0x3af0c7,_0x37a65c)),_0x32209b[_0x14e2e8(0x14a)]()):this[_0x14e2e8(0x2a8)](_0x276c9d);}},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x36e)]=function(){const _0x45456c=_0x5ba09f,_0xba4eca=[_0x45456c(0x291),'up',_0x45456c(0x191),_0x45456c(0x23d),_0x45456c(0x293),_0x45456c(0x19a),'lowerleft',_0x45456c(0x210),_0x45456c(0x137)];for(const _0x2825b1 of _0xba4eca){const _0x3d427c=$gameScreen[_0x45456c(0x37b)](this[_0x45456c(0x355)],_0x2825b1);if(this[_0x45456c(0x357)][_0x2825b1]===_0x3d427c)continue;return!![];}return![];},Sprite_Picture[_0x5ba09f(0x34d)][_0x5ba09f(0x2a8)]=function(_0x366978){const _0x394e63=_0x5ba09f,_0x4ab154=$gameScreen[_0x394e63(0x37b)](this[_0x394e63(0x355)],_0x366978);this['_pictureTextCache'][_0x366978]=_0x4ab154;const _0x482905=this[_0x394e63(0x276)][_0x394e63(0x25a)](_0x4ab154);let _0x56e5b5=$gameScreen[_0x394e63(0x222)](this[_0x394e63(0x355)]),_0x2c7d92=_0x56e5b5,_0x7faba9=_0x56e5b5;if(['up',_0x394e63(0x293),_0x394e63(0x210)][_0x394e63(0x3e5)](_0x366978))_0x2c7d92=Math[_0x394e63(0x2f6)]((this['width']-_0x482905['width'])/0x2);else[_0x394e63(0x191),_0x394e63(0x19a),_0x394e63(0x137)][_0x394e63(0x3e5)](_0x366978)&&(_0x2c7d92=Math[_0x394e63(0x2f6)](this[_0x394e63(0x273)]-_0x482905['width']-_0x56e5b5));if([_0x394e63(0x23d),'center',_0x394e63(0x19a)][_0x394e63(0x3e5)](_0x366978))_0x7faba9=Math['floor']((this[_0x394e63(0x144)]-_0x482905[_0x394e63(0x144)])/0x2);else['lowerleft',_0x394e63(0x210),_0x394e63(0x137)][_0x394e63(0x3e5)](_0x366978)&&(_0x7faba9=Math[_0x394e63(0x2f6)](this[_0x394e63(0x144)]-_0x482905[_0x394e63(0x144)]-_0x56e5b5));this[_0x394e63(0x276)][_0x394e63(0x382)](_0x4ab154,_0x2c7d92,_0x7faba9);},Sprite_Picture[_0x5ba09f(0x34d)]['attachPictureText']=function(){const _0x22f997=_0x5ba09f;if(!this[_0x22f997(0x276)])return;if(!this[_0x22f997(0x2be)])return;this[_0x22f997(0x2be)][_0x22f997(0x1ef)]=this[_0x22f997(0x276)]['contents'];},VisuMZ[_0x5ba09f(0x3b4)]['Window_Base_initialize']=Window_Base[_0x5ba09f(0x34d)]['initialize'],Window_Base['prototype']['initialize']=function(_0x12694c){const _0x97322f=_0x5ba09f;this[_0x97322f(0x311)](_0x12694c),VisuMZ['MessageCore'][_0x97322f(0x1c1)][_0x97322f(0x221)](this,_0x12694c);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x311)]=function(_0x47e96c){const _0x557eaf=_0x5ba09f;this['initTextAlignement'](),this['resetWordWrap'](),this[_0x557eaf(0x33e)](_0x47e96c);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x349)]=function(){const _0x26db4e=_0x5ba09f;this[_0x26db4e(0x203)](_0x26db4e(0x329));},Window_Base['prototype']['setTextAlignment']=function(_0x542bbc){const _0x10974b=_0x5ba09f;this[_0x10974b(0x1e9)]=_0x542bbc;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x3a1)]=function(){const _0x13677b=_0x5ba09f;return this[_0x13677b(0x1e9)];},VisuMZ[_0x5ba09f(0x3b4)]['Window_Base_textSizeEx']=Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x25a)],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x25a)]=function(_0x98587a){const _0x2e7a3a=_0x5ba09f;return this['resetWordWrap'](),VisuMZ[_0x2e7a3a(0x3b4)][_0x2e7a3a(0x1cd)][_0x2e7a3a(0x221)](this,_0x98587a);},VisuMZ['MessageCore'][_0x5ba09f(0x3ad)]=Window_Base[_0x5ba09f(0x34d)]['processAllText'],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x164)]=function(_0x1cebe7){const _0x484612=_0x5ba09f;VisuMZ[_0x484612(0x3b4)][_0x484612(0x3ad)][_0x484612(0x221)](this,_0x1cebe7);if(_0x1cebe7[_0x484612(0x1b5)])this['setTextAlignment'](_0x484612(0x329));},Window_Base[_0x5ba09f(0x34d)]['resetWordWrap']=function(){const _0x1955fc=_0x5ba09f;this[_0x1955fc(0x245)](![]);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x334)]=function(){return this['_wordWrap'];},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x245)]=function(_0x350424){const _0x4105c2=_0x5ba09f;return this[_0x4105c2(0x2c6)]=_0x350424,'';},Window_Base[_0x5ba09f(0x34d)]['registerResetRect']=function(_0x5f2cbd){this['_resetRect']=JsonEx['makeDeepCopy'](_0x5f2cbd);},Window_Base['prototype'][_0x5ba09f(0x2a9)]=function(){const _0x218fba=_0x5ba09f;this[_0x218fba(0x3a6)]['fontFace']=$gameSystem[_0x218fba(0x17f)](),this[_0x218fba(0x3a6)][_0x218fba(0x199)]=$gameSystem[_0x218fba(0x30f)](),this[_0x218fba(0x3a6)][_0x218fba(0x132)]=![],this['contents'][_0x218fba(0x310)]=![],this[_0x218fba(0x269)]();},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x269)]=function(){const _0x2003ee=_0x5ba09f;this[_0x2003ee(0x31e)](ColorManager[_0x2003ee(0x229)]()),this[_0x2003ee(0x195)](ColorManager[_0x2003ee(0x289)]());const _0x4972be=VisuMZ[_0x2003ee(0x3b4)][_0x2003ee(0x406)]['General'];_0x4972be[_0x2003ee(0x16d)]===undefined&&('fxDmG'!==_0x2003ee(0x181)?(_0x18f314=_0x17d92e[_0x2003ee(0x3d8)](/[\n\r]+/g,''),_0x9a419c=_0x5d8a7e[_0x2003ee(0x3d8)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):_0x4972be['DefaultOutlineWidth']=0x3),this[_0x2003ee(0x3a6)]['outlineWidth']=_0x4972be[_0x2003ee(0x16d)],this[_0x2003ee(0x1fa)](![]);},Window_Base['prototype'][_0x5ba09f(0x1fa)]=function(_0x179f95){const _0x5abe17=_0x5ba09f;this[_0x5abe17(0x2e0)]=_0x179f95;},Window_Base['prototype']['isColorLocked']=function(){return this['_colorLock'];},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x186)]=function(){return![];},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x21b)]=function(){const _0x4fc2f2=_0x5ba09f,_0x592f77=[_0x4fc2f2(0x384),_0x4fc2f2(0x199),_0x4fc2f2(0x132),_0x4fc2f2(0x310),_0x4fc2f2(0x27a),'outLineColor',_0x4fc2f2(0x1a3),_0x4fc2f2(0x3c1)];let _0x47ce44={};for(const _0x24a911 of _0x592f77){_0x47ce44[_0x24a911]=this[_0x4fc2f2(0x3a6)][_0x24a911];}return _0x47ce44;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x3ca)]=function(_0x550c57){for(const _0x45379b in _0x550c57){this['contents'][_0x45379b]=_0x550c57[_0x45379b];}},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x1ad)]=Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x202)],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x202)]=function(){const _0x51836c=_0x5ba09f;VisuMZ[_0x51836c(0x3b4)][_0x51836c(0x1ad)]['call'](this),this['updateMove']();},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x173)]=function(){return![];},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x30b)]=function(){const _0x534e10=_0x5ba09f;this[_0x534e10(0x3dc)]>0x0&&(this[_0x534e10(0x173)]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x534e10(0x264)]),this['y']=this[_0x534e10(0x313)](this['y'],this['_moveTargetY']),this[_0x534e10(0x273)]=this[_0x534e10(0x313)](this[_0x534e10(0x273)],this[_0x534e10(0x3d3)]),this[_0x534e10(0x144)]=this[_0x534e10(0x313)](this[_0x534e10(0x144)],this[_0x534e10(0x3fd)]),this[_0x534e10(0x1fd)]()),this[_0x534e10(0x3dc)]--);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x1fd)]=function(_0x57e90e,_0x396926){const _0x3c5bed=_0x5ba09f;if(!_0x57e90e){if(_0x3c5bed(0x2f9)===_0x3c5bed(0x2f9))this[_0x3c5bed(0x273)]=Math[_0x3c5bed(0x3fc)](this[_0x3c5bed(0x273)],Graphics[_0x3c5bed(0x273)]),this[_0x3c5bed(0x144)]=Math[_0x3c5bed(0x3fc)](this['height'],Graphics[_0x3c5bed(0x144)]);else{if(this[_0x3c5bed(0x32d)]===_0x465444)this['initMessageCore']();if(this[_0x3c5bed(0x32d)][_0x3c5bed(0x1f5)]===_0x4ad818)this[_0x3c5bed(0x311)]();this[_0x3c5bed(0x32d)][_0x3c5bed(0x1f5)]=_0x5394b1||0x1;}}if(!_0x396926){const _0x55ebf9=-(Math[_0x3c5bed(0x2f6)](Graphics[_0x3c5bed(0x273)]-Graphics[_0x3c5bed(0x3a7)])/0x2),_0x5757a9=_0x55ebf9+Graphics[_0x3c5bed(0x273)]-this['width'],_0x1d0ef1=-(Math[_0x3c5bed(0x2f6)](Graphics[_0x3c5bed(0x144)]-Graphics[_0x3c5bed(0x3d7)])/0x2),_0x5380fd=_0x1d0ef1+Graphics[_0x3c5bed(0x144)]-this[_0x3c5bed(0x144)];this['x']=this['x'][_0x3c5bed(0x341)](_0x55ebf9,_0x5757a9),this['y']=this['y'][_0x3c5bed(0x341)](_0x1d0ef1,_0x5380fd);}},Window_Base[_0x5ba09f(0x34d)]['applyMoveEasing']=function(_0x3fb652,_0x54c65b){const _0x3fdd33=_0x5ba09f,_0x4f3379=this[_0x3fdd33(0x3dc)],_0xbadfc1=this[_0x3fdd33(0x30e)],_0x35117d=this[_0x3fdd33(0x145)]((_0xbadfc1-_0x4f3379)/_0xbadfc1),_0x5ab498=this[_0x3fdd33(0x145)]((_0xbadfc1-_0x4f3379+0x1)/_0xbadfc1),_0x3d6b74=(_0x3fb652-_0x54c65b*_0x35117d)/(0x1-_0x35117d);return _0x3d6b74+(_0x54c65b-_0x3d6b74)*_0x5ab498;},Window_Base[_0x5ba09f(0x34d)]['calcMoveEasing']=function(_0x455ede){const _0x2b12de=_0x5ba09f,_0x3a9ed6=0x2;switch(this['_moveEasingType']){case 0x0:return _0x455ede;case 0x1:return this['easeIn'](_0x455ede,_0x3a9ed6);case 0x2:return this[_0x2b12de(0x1e3)](_0x455ede,_0x3a9ed6);case 0x3:return this['easeInOut'](_0x455ede,_0x3a9ed6);default:if(Imported[_0x2b12de(0x1eb)])return VisuMZ['applyMoveEasing'](_0x455ede,this[_0x2b12de(0x26c)]);else{if(_0x2b12de(0x224)===_0x2b12de(0x18d)){const _0x285aca=_0x2751b2['$1']['split'](',')['map'](_0x57b6d5=>_0x5ca3b2(_0x57b6d5)||0x0);for(const _0x14f1dd of _0x285aca){if(_0x420dd3[_0x2b12de(0x3bd)](_0x14f1dd))return![];}return!![];}else return _0x455ede;}}},Window_Base['prototype'][_0x5ba09f(0x24c)]=function(_0x4ad990,_0x4de1c6,_0x1541f8,_0x3689bd,_0xbf2df9,_0x64e16d){const _0x28e671=_0x5ba09f;this[_0x28e671(0x264)]=_0x4ad990,this['_moveTargetY']=_0x4de1c6,this[_0x28e671(0x3d3)]=_0x1541f8||this[_0x28e671(0x273)],this['_moveTargetHeight']=_0x3689bd||this[_0x28e671(0x144)],this[_0x28e671(0x3dc)]=_0xbf2df9||0x1;if(this['_moveDuration']<=0x0)this[_0x28e671(0x3dc)]=0x1;this[_0x28e671(0x30e)]=this[_0x28e671(0x3dc)],this['_moveEasingType']=_0x64e16d||0x0;if(_0xbf2df9<=0x0)this['updateMove']();},Window_Base['prototype']['moveBy']=function(_0x185c9c,_0x524d17,_0x3497a0,_0x4b56bf,_0x68b907,_0x511342){const _0x279ceb=_0x5ba09f;this['_moveTargetX']=this['x']+_0x185c9c,this[_0x279ceb(0x3a8)]=this['y']+_0x524d17,this[_0x279ceb(0x3d3)]=this[_0x279ceb(0x273)]+(_0x3497a0||0x0),this[_0x279ceb(0x3fd)]=this[_0x279ceb(0x144)]+(_0x4b56bf||0x0),this['_moveDuration']=_0x68b907||0x1;if(this[_0x279ceb(0x3dc)]<=0x0)this[_0x279ceb(0x3dc)]=0x1;this['_wholeMoveDuration']=this[_0x279ceb(0x3dc)],this[_0x279ceb(0x26c)]=_0x511342||0x0;if(_0x68b907<=0x0)this[_0x279ceb(0x30b)]();},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x238)]=function(_0x1edb56,_0x257e7a){const _0x22690b=_0x5ba09f;this[_0x22690b(0x24c)](this[_0x22690b(0x2c0)]['x'],this[_0x22690b(0x2c0)]['y'],this[_0x22690b(0x2c0)][_0x22690b(0x273)],this[_0x22690b(0x2c0)][_0x22690b(0x144)],_0x1edb56,_0x257e7a);},VisuMZ[_0x5ba09f(0x3b4)]['Window_Base_changeTextColor']=Window_Base[_0x5ba09f(0x34d)]['changeTextColor'],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x31e)]=function(_0x15652e){const _0x5d8687=_0x5ba09f;if(this[_0x5d8687(0x2a0)]())return;_0x15652e=_0x15652e['replace'](/\,/g,''),this['_textColorStack']=this[_0x5d8687(0x396)]||[],this[_0x5d8687(0x396)][_0x5d8687(0x251)](this[_0x5d8687(0x3a6)][_0x5d8687(0x27a)]),VisuMZ[_0x5d8687(0x3b4)][_0x5d8687(0x3bc)][_0x5d8687(0x221)](this,_0x15652e);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x25d)]=function(_0x5a6877){const _0x34a746=_0x5ba09f;this[_0x34a746(0x300)](_0x5a6877);if(this[_0x34a746(0x2a0)]())return;_0x5a6877[_0x34a746(0x1b5)]&&(this[_0x34a746(0x396)]=this[_0x34a746(0x396)]||[],this[_0x34a746(0x3a6)][_0x34a746(0x27a)]=this[_0x34a746(0x396)][_0x34a746(0x24e)]()||ColorManager[_0x34a746(0x229)]());},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2e6)]=function(_0x1f7a07){const _0x4f9f9f=_0x5ba09f;return _0x1f7a07=this[_0x4f9f9f(0x328)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x26d)](_0x1f7a07),_0x1f7a07=this['convertVariableEscapeCharacters'](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x288)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x3f3)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x2f5)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x166)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x339)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x3b9)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x213)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x131)](_0x1f7a07),_0x1f7a07=this['convertMessageCoreEscapeReplacements'](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x162)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x158)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x39d)](_0x1f7a07),_0x1f7a07=this[_0x4f9f9f(0x2eb)](_0x1f7a07),_0x1f7a07;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x328)]=function(_0x1faff8){const _0x56d34b=_0x5ba09f;this[_0x56d34b(0x271)]=![];for(const _0x50f8c9 of VisuMZ[_0x56d34b(0x3b4)][_0x56d34b(0x406)]['TextMacros']){_0x1faff8[_0x56d34b(0x25f)](_0x50f8c9[_0x56d34b(0x239)])&&(_0x56d34b(0x361)!==_0x56d34b(0x361)?_0x430f12=_0x2af28e['replace'](_0xcfd014[0x0],_0x29cd4f[0x1]):(this[_0x56d34b(0x271)]=!![],_0x1faff8=_0x1faff8['replace'](_0x50f8c9[_0x56d34b(0x239)],_0x50f8c9['textCodeResult']['bind'](this))));}return _0x1faff8;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x26d)]=function(_0x8d42f){const _0x1dd98f=_0x5ba09f;return _0x8d42f=_0x8d42f[_0x1dd98f(0x3d8)](/\\/g,'\x1b'),_0x8d42f=_0x8d42f[_0x1dd98f(0x3d8)](/\x1b\x1b/g,'\x5c'),_0x8d42f;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x158)]=function(_0x4ace53){const _0x1febfb=_0x5ba09f;for(;;){if(_0x4ace53['match'](/\\V\[(\d+)\]/gi))'mutIz'===_0x1febfb(0x242)?this['_interpreter']['isRunning']()?this['_interpreter'][_0x1febfb(0x202)]():this[_0x1febfb(0x1b8)]():_0x4ace53=_0x4ace53[_0x1febfb(0x3d8)](/\\V\[(\d+)\]/gi,(_0x397740,_0x144f7b)=>this[_0x1febfb(0x26d)](String($gameVariables['value'](parseInt(_0x144f7b)))));else{if(_0x4ace53[_0x1febfb(0x25f)](/\x1bV\[(\d+)\]/gi))_0x4ace53=_0x4ace53[_0x1febfb(0x3d8)](/\x1bV\[(\d+)\]/gi,(_0x412ecf,_0x10dd42)=>this[_0x1febfb(0x26d)](String($gameVariables['value'](parseInt(_0x10dd42)))));else{if(_0x1febfb(0x2e5)!=='bCgsO')break;else{const _0x4b7660=this[_0x1febfb(0x377)](_0x1a4b16)[_0x1febfb(0x317)](',');if(!_0x1e7fe3[_0x1febfb(0x1b5)])return;const _0x3f2df4=_0x4b7660[0x0][_0x1febfb(0x19f)](),_0x1edeb6=_0x4b7660[0x1]||0x0,_0x5911eb=_0x4b7660[0x2]||0x0,_0x24a83f=_0x2960ee[_0x1febfb(0x230)](_0x3f2df4),_0x1435f7=this['contents']['paintOpacity'];_0x24a83f[_0x1febfb(0x373)](this[_0x1febfb(0x2d9)][_0x1febfb(0x159)](this,_0x24a83f,_0x40ee5e['x'],_0x53df2d['y'],_0x1edeb6,_0x5911eb,_0x1435f7));}}}}return _0x4ace53;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x288)]=function(_0x302b9d){const _0x415804=_0x5ba09f;return this[_0x415804(0x386)](),_0x302b9d;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x162)]=function(_0x565905){return _0x565905;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x3f3)]=function(_0x550690){const _0x1acf98=_0x5ba09f;return _0x550690=_0x550690[_0x1acf98(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x550690=_0x550690[_0x1acf98(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x550690=_0x550690[_0x1acf98(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x550690=_0x550690[_0x1acf98(0x3d8)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x550690=_0x550690['replace'](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x550690;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2f5)]=function(_0x4d6803){const _0xc8aa8c=_0x5ba09f;return _0x4d6803=_0x4d6803['replace'](/<B>/gi,'\x1bBOLD[1]'),_0x4d6803=_0x4d6803['replace'](/<\/B>/gi,_0xc8aa8c(0x1ae)),_0x4d6803=_0x4d6803['replace'](/<I>/gi,_0xc8aa8c(0x3b1)),_0x4d6803=_0x4d6803[_0xc8aa8c(0x3d8)](/<\/I>/gi,_0xc8aa8c(0x35a)),_0x4d6803;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x166)]=function(_0x3d9fdc){const _0x1eaaf2=_0x5ba09f;return _0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<LEFT>/gi,_0x1eaaf2(0x3cd)),_0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<\/CENTER>/gi,_0x1eaaf2(0x31d)),_0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<RIGHT>/gi,_0x1eaaf2(0x31b)),_0x3d9fdc=_0x3d9fdc[_0x1eaaf2(0x3d8)](/<\/RIGHT>/gi,_0x1eaaf2(0x31d)),_0x3d9fdc;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x339)]=function(_0x41110e){const _0x16e91a=_0x5ba09f;return _0x41110e=_0x41110e['replace'](/<COLORLOCK>/gi,_0x16e91a(0x1d6)),_0x41110e=_0x41110e[_0x16e91a(0x3d8)](/<\/COLORLOCK>/gi,_0x16e91a(0x3ac)),_0x41110e=_0x41110e[_0x16e91a(0x3d8)](/\(\(\(/gi,_0x16e91a(0x1d6)),_0x41110e=_0x41110e[_0x16e91a(0x3d8)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x41110e;},Window_Base[_0x5ba09f(0x34d)]['convertBaseEscapeCharacters']=function(_0x181294){const _0x1a5b11=_0x5ba09f;return _0x181294=_0x181294[_0x1a5b11(0x3d8)](/\x1bN\[(\d+)\]/gi,(_0x59c1b0,_0x5062d2)=>this['actorName'](parseInt(_0x5062d2))),_0x181294=_0x181294[_0x1a5b11(0x3d8)](/\x1bP\[(\d+)\]/gi,(_0x38ce10,_0x2a53d5)=>this[_0x1a5b11(0x148)](parseInt(_0x2a53d5))),_0x181294=_0x181294[_0x1a5b11(0x3d8)](/\x1bG/gi,TextManager[_0x1a5b11(0x1e2)]),_0x181294;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x213)]=function(_0x4bf505){const _0x8b14f3=_0x5ba09f;return _0x4bf505=_0x4bf505['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0x4bf505=_0x4bf505['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x8b14f3(0x370)]()),_0x4bf505=_0x4bf505['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x8b14f3(0x3af)](!![])),_0x4bf505=_0x4bf505[_0x8b14f3(0x3d8)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x8b14f3(0x3af)](![])),_0x4bf505;},Window_Base['prototype'][_0x5ba09f(0x285)]=function(){const _0x51295a=_0x5ba09f;if(!SceneManager['isSceneBattle']())return'';if(BattleManager[_0x51295a(0x13b)])return BattleManager[_0x51295a(0x13b)][_0x51295a(0x1ba)]();if(BattleManager[_0x51295a(0x3b0)][0x0])return BattleManager[_0x51295a(0x3b0)][0x0][_0x51295a(0x1ba)]();return'';},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x370)]=function(){const _0x56c9b3=_0x5ba09f;if(!SceneManager['isSceneBattle']())return'';let _0x393a81=null;return _0x393a81=BattleManager[_0x56c9b3(0x2b2)],!_0x393a81&&BattleManager['isInputting']()&&(_0x393a81=BattleManager['actor']()),_0x393a81?_0x393a81['name']():'';},Window_Base['prototype'][_0x5ba09f(0x3af)]=function(_0x49d31d){const _0x51bf60=_0x5ba09f;if(!SceneManager[_0x51bf60(0x2db)]())return'';let _0x1a942c=BattleManager[_0x51bf60(0x231)]||null;!_0x1a942c&&BattleManager[_0x51bf60(0x146)]()&&(_0x1a942c=BattleManager[_0x51bf60(0x390)]());if(_0x1a942c&&_0x1a942c['item']()){let _0x2bece6='';if(_0x49d31d)_0x2bece6+=_0x51bf60(0x247)[_0x51bf60(0x2ae)](_0x1a942c[_0x51bf60(0x36b)]()[_0x51bf60(0x379)]);return _0x2bece6+=_0x1a942c['item']()['name'],_0x2bece6;}return'';},Window_Base[_0x5ba09f(0x34d)]['convertMessageCoreEscapeActions']=function(_0x4b3763){const _0x1d95bb=_0x5ba09f;for(const _0x242745 of VisuMZ['MessageCore']['Settings'][_0x1d95bb(0x2ab)]){if(_0x1d95bb(0x405)==='iYalQ')_0x4b3763[_0x1d95bb(0x25f)](_0x242745[_0x1d95bb(0x239)])&&(_0x4b3763=_0x4b3763[_0x1d95bb(0x3d8)](_0x242745['textCodeCheck'],_0x242745[_0x1d95bb(0x33a)]),_0x4b3763=this[_0x1d95bb(0x158)](_0x4b3763));else{let _0x1f2956=_0x7fb820['width']+_0x238645['windowPadding']()*0x2+0x6;const _0x354d23=_0x1141f5[_0x1d95bb(0x1c0)]()!=='',_0x5bcd35=_0x4d4809[_0x1d95bb(0x244)],_0xe4fe10=0x14;_0x1f2956+=_0x354d23?_0x5bcd35+_0xe4fe10:0x4;if(_0x1f2956%0x2!==0x0)_0x1f2956+=0x1;_0x2e78e7[_0x1d95bb(0x13d)](_0x1f2956);}}return _0x4b3763;},Window_Base[_0x5ba09f(0x34d)]['convertMessageCoreEscapeReplacements']=function(_0x15654c){const _0x28a35c=_0x5ba09f;for(const _0x30f6a1 of VisuMZ[_0x28a35c(0x3b4)][_0x28a35c(0x406)][_0x28a35c(0x25c)]){_0x15654c[_0x28a35c(0x25f)](_0x30f6a1['textCodeCheck'])&&(_0x15654c=_0x15654c[_0x28a35c(0x3d8)](_0x30f6a1['textCodeCheck'],_0x30f6a1[_0x28a35c(0x33a)][_0x28a35c(0x159)](this)),_0x15654c=this[_0x28a35c(0x158)](_0x15654c));}return _0x15654c;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2b9)]=function(_0x416d35){const _0x291e10=_0x5ba09f,_0xd99a32=_0x416d35>=0x1?$gameActors[_0x291e10(0x1b7)](_0x416d35):null,_0x2abacd=_0xd99a32?_0xd99a32[_0x291e10(0x1ba)]():'',_0x2eb054=Number(VisuMZ[_0x291e10(0x3b4)][_0x291e10(0x406)][_0x291e10(0x2c4)][_0x291e10(0x1d4)]);if(this[_0x291e10(0x186)]()&&_0x2eb054!==0x0){if(_0x291e10(0x268)!==_0x291e10(0x28c))return _0x291e10(0x24f)[_0x291e10(0x2ae)](_0x2eb054,_0x2abacd);else _0x4b3ef3[_0x291e10(0x3b4)][_0x291e10(0x2fd)][_0x291e10(0x221)](this,_0x647a4,_0x4bf4a9),_0x4392f2===_0x291e10(0x28a)&&this[_0x291e10(0x1d7)](_0x499c07);}else return _0x2abacd;},Window_Base[_0x5ba09f(0x34d)]['partyMemberName']=function(_0x3c9a20){const _0x25394d=_0x5ba09f,_0x1d3ab1=_0x3c9a20>=0x1?$gameParty[_0x25394d(0x2b7)]()[_0x3c9a20-0x1]:null,_0x57b10b=_0x1d3ab1?_0x1d3ab1[_0x25394d(0x1ba)]():'',_0x206fb5=Number(VisuMZ[_0x25394d(0x3b4)][_0x25394d(0x406)][_0x25394d(0x2c4)][_0x25394d(0x1d4)]);return this['isAutoColorAffected']()&&_0x206fb5!==0x0?_0x25394d(0x24f)[_0x25394d(0x2ae)](_0x206fb5,_0x57b10b):_0x25394d(0x3f7)!==_0x25394d(0x400)?_0x57b10b:(this['registerActorNameAutoColorChanges'](),_0x183aa3);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x39d)]=function(_0x57675a){const _0x519ba5=_0x5ba09f;if(this[_0x519ba5(0x186)]()){if(_0x519ba5(0x14f)===_0x519ba5(0x1cf)){if(_0x53b305[_0x519ba5(0x3c3)]==='')this['obtainEscapeParam'](_0x5e5663);_0x32d982[_0x519ba5(0x360)]['call'](this,_0x39706d);if(this[_0x519ba5(0x1f0)]===_0x531128){const _0x15f2b2=_0xeaf41f['CommonEvent']||0x0;if(_0x15f2b2>0x0)this[_0x519ba5(0x228)](_0x15f2b2);}}else _0x57675a=this[_0x519ba5(0x1b2)](_0x57675a),_0x57675a=this[_0x519ba5(0x1de)](_0x57675a);}return _0x57675a;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x1b2)]=function(_0x50f208){const _0x469e57=_0x5ba09f;for(autoColor of VisuMZ[_0x469e57(0x3b4)]['AutoColorRegExp']){if(_0x469e57(0x2aa)==='zkeCm')return _0x2c1bf6=_0x380a91[_0x469e57(0x3d8)](/\x1bN\[(\d+)\]/gi,(_0x5df4d6,_0x4baff8)=>this['actorName'](_0x36562c(_0x4baff8))),_0x35ec8b=_0x35b3de[_0x469e57(0x3d8)](/\x1bP\[(\d+)\]/gi,(_0x28770f,_0x435992)=>this['partyMemberName'](_0x380e3f(_0x435992))),_0x1e78a1=_0x714701['replace'](/\x1bG/gi,_0x29df51['currencyUnit']),_0xfb7e6d;else _0x50f208=_0x50f208[_0x469e57(0x3d8)](autoColor[0x0],autoColor[0x1]);}return _0x50f208;},Window_Base['prototype'][_0x5ba09f(0x209)]=function(){const _0xb34215=_0x5ba09f;this[_0xb34215(0x168)]=[];},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x386)]=function(){const _0x9838d7=_0x5ba09f;this[_0x9838d7(0x209)]();const _0xa1b658=VisuMZ[_0x9838d7(0x3b4)][_0x9838d7(0x406)][_0x9838d7(0x2c4)],_0x10f969=_0xa1b658[_0x9838d7(0x1d4)];if(_0x10f969<=0x0)return;for(const _0x55ffda of $gameActors[_0x9838d7(0x38c)]){if(_0x9838d7(0x359)!==_0x9838d7(0x359))this[_0x9838d7(0x1d7)](_0x90976c);else{if(!_0x55ffda)continue;const _0x3daecd=_0x55ffda[_0x9838d7(0x1ba)]();if(_0x3daecd[_0x9838d7(0x19f)]()['length']<=0x0)continue;if(/^\d+$/['test'](_0x3daecd))continue;if(_0x3daecd[_0x9838d7(0x25f)](/-----/i))continue;let _0x3d8d20=VisuMZ[_0x9838d7(0x3b4)][_0x9838d7(0x391)](_0x3daecd);const _0x3c9825=new RegExp('\x5cb'+_0x3d8d20+'\x5cb','g'),_0x504aec=_0x9838d7(0x24f)['format'](_0x10f969,_0x3daecd);this[_0x9838d7(0x168)][_0x9838d7(0x36f)]([_0x3c9825,_0x504aec]);}}},Window_Base[_0x5ba09f(0x34d)]['processActorNameAutoColorChanges']=function(_0x40c242){const _0x50c4bc=_0x5ba09f;if(this[_0x50c4bc(0x168)]===undefined){if('lbsVI'===_0x50c4bc(0x1c4))this[_0x50c4bc(0x386)]();else return this[_0x50c4bc(0x3c8)]();}for(autoColor of this[_0x50c4bc(0x168)]){if(_0x50c4bc(0x275)===_0x50c4bc(0x143)){if(this[_0x50c4bc(0x152)]===_0x198e14)this[_0x50c4bc(0x2c5)]();const _0x501fc7=this['realPictureId'](_0x2563d6);return this[_0x50c4bc(0x34b)][_0x501fc7]||0x0;}else _0x40c242=_0x40c242['replace'](autoColor[0x0],autoColor[0x1]);}return _0x40c242;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2a4)]=function(_0x2e7644,_0x599807,_0x35f17c){const _0x24c72a=_0x5ba09f;if(!_0x2e7644)return'';const _0x4441c9=_0x2e7644[_0x599807];let _0x161686='';if(_0x4441c9&&_0x35f17c&&_0x4441c9[_0x24c72a(0x379)]){if(_0x24c72a(0x1af)==='Hkhqm'){const _0x3dd94a=_0x24c72a(0x1bc);_0x161686=_0x3dd94a[_0x24c72a(0x2ae)](_0x4441c9['iconIndex'],_0x4441c9[_0x24c72a(0x1ba)]);}else{this[_0x24c72a(0x168)]===_0x472786&&this['registerActorNameAutoColorChanges']();for(_0x4a229d of this[_0x24c72a(0x168)]){_0x2b53ae=_0x20b763[_0x24c72a(0x3d8)](_0x266fa0[0x0],_0x363f7c[0x1]);}return _0x28c000;}}else{if(_0x4441c9)_0x161686=_0x4441c9[_0x24c72a(0x1ba)];else{if('DMJYn'!==_0x24c72a(0x130))return![];else _0x161686='';}}return this[_0x24c72a(0x186)]()&&(_0x161686=this[_0x24c72a(0x3c6)](_0x161686,_0x2e7644)),_0x161686;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x3b8)]=function(_0x48a740){const _0x46dd32=_0x5ba09f,_0x255009=$gameParty['getLastGainedItemData']();if(_0x255009['id']<0x0)return'';let _0x5d2efb=null;if(_0x255009[_0x46dd32(0x149)]===0x0)_0x5d2efb=$dataItems[_0x255009['id']];if(_0x255009[_0x46dd32(0x149)]===0x1)_0x5d2efb=$dataWeapons[_0x255009['id']];if(_0x255009['type']===0x2)_0x5d2efb=$dataArmors[_0x255009['id']];if(!_0x5d2efb)return'';return _0x48a740?'\x1bi[%1]%2'[_0x46dd32(0x2ae)](_0x5d2efb[_0x46dd32(0x379)],_0x5d2efb[_0x46dd32(0x1ba)]):_0x5d2efb['name'];},Window_Base['prototype'][_0x5ba09f(0x215)]=function(){const _0x4d4d4f=_0x5ba09f,_0x4276cd=$gameParty[_0x4d4d4f(0x196)]();if(_0x4276cd['id']<=0x0)return'';return _0x4276cd['quantity'];},Window_Base['prototype'][_0x5ba09f(0x3c6)]=function(_0x2251eb,_0x56a581){const _0x19342c=_0x5ba09f,_0x5d7bc8=VisuMZ[_0x19342c(0x3b4)]['Settings'][_0x19342c(0x2c4)];let _0x151767=0x0;if(_0x56a581===$dataActors)_0x151767=_0x5d7bc8[_0x19342c(0x1d4)];if(_0x56a581===$dataClasses)_0x151767=_0x5d7bc8[_0x19342c(0x1db)];if(_0x56a581===$dataSkills)_0x151767=_0x5d7bc8[_0x19342c(0x383)];if(_0x56a581===$dataItems)_0x151767=_0x5d7bc8[_0x19342c(0x362)];if(_0x56a581===$dataWeapons)_0x151767=_0x5d7bc8[_0x19342c(0x1aa)];if(_0x56a581===$dataArmors)_0x151767=_0x5d7bc8['Armors'];if(_0x56a581===$dataEnemies)_0x151767=_0x5d7bc8[_0x19342c(0x369)];if(_0x56a581===$dataStates)_0x151767=_0x5d7bc8[_0x19342c(0x138)];return _0x151767>0x0&&(_0x2251eb=_0x19342c(0x24f)[_0x19342c(0x2ae)](_0x151767,_0x2251eb)),_0x2251eb;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2eb)]=function(_0xd8b3c1){const _0x184dab=_0x5ba09f;_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x688de5,_0x2e6fa3)=>this[_0x184dab(0x245)](!![])),_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x37fa22,_0xb9d90f)=>this[_0x184dab(0x245)](![])),_0xd8b3c1=_0xd8b3c1['replace'](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x47c886,_0x71e6d0)=>this[_0x184dab(0x245)](![]));if(_0xd8b3c1[_0x184dab(0x25f)](Window_Message[_0x184dab(0x34a)]))this[_0x184dab(0x245)](![]);else _0xd8b3c1[_0x184dab(0x25f)](Window_Message[_0x184dab(0x227)])&&this[_0x184dab(0x245)](![]);if(!this[_0x184dab(0x334)]())return _0xd8b3c1;if(_0xd8b3c1[_0x184dab(0x39c)]<=0x0)return _0xd8b3c1;if(VisuMZ[_0x184dab(0x3b4)][_0x184dab(0x406)]['WordWrap'][_0x184dab(0x3e9)])'Iapjm'===_0x184dab(0x2c7)?this[_0x184dab(0x1d3)]=_0xf25294(_0x13cabf[_0x184dab(0x1d3)])[_0x184dab(0x341)](0x1,0xb):(_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/[\n\r]+/g,'\x20'),_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'));else{if('mJydt'===_0x184dab(0x1b3))return this['processAutoSize'](_0x23c3ba,!![],!![]),this[_0x184dab(0x2e8)]('none'),'';else _0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/[\n\r]+/g,''),_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return _0xd8b3c1=this['addWrapBreakAfterPunctuation'](_0xd8b3c1),_0xd8b3c1=_0xd8b3c1[_0x184dab(0x317)]('\x20')['join'](_0x184dab(0x28a)),_0xd8b3c1=_0xd8b3c1['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0xd8b3c1=_0xd8b3c1[_0x184dab(0x3d8)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0xd8b3c1;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x30d)]=function(_0x26e11f){return _0x26e11f;},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3e8)]=Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x381)],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x381)]=function(_0x1f9ce9){const _0x40f14d=_0x5ba09f;VisuMZ[_0x40f14d(0x3b4)][_0x40f14d(0x3e8)][_0x40f14d(0x221)](this,_0x1f9ce9),this[_0x40f14d(0x1da)](_0x1f9ce9);},VisuMZ[_0x5ba09f(0x3b4)]['Window_Base_processControlCharacter']=Window_Base['prototype'][_0x5ba09f(0x19c)],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x19c)]=function(_0x3d77b8,_0x221b5c){const _0x20992a=_0x5ba09f;VisuMZ['MessageCore'][_0x20992a(0x2fd)][_0x20992a(0x221)](this,_0x3d77b8,_0x221b5c),_0x221b5c===_0x20992a(0x28a)&&this[_0x20992a(0x1d7)](_0x3d77b8);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x377)]=function(_0xf946e3){const _0x967338=_0x5ba09f;var _0x47ec7a=/^\<(.*?)\>/[_0x967338(0x36c)](_0xf946e3['text'][_0x967338(0x1f1)](_0xf946e3[_0x967338(0x2f2)]));if(_0x47ec7a)return _0xf946e3['index']+=_0x47ec7a[0x0][_0x967338(0x39c)],String(_0x47ec7a[0x0][_0x967338(0x1f1)](0x1,_0x47ec7a[0x0][_0x967338(0x39c)]-0x1));else{if(_0x967338(0x17b)===_0x967338(0x33d))_0x414785[_0x967338(0x25f)](_0x31eff0[_0x967338(0x239)])&&(_0x3053a0=_0x299f3d[_0x967338(0x3d8)](_0x3ff95f[_0x967338(0x239)],_0x543481[_0x967338(0x33a)][_0x967338(0x159)](this)),_0x462f0d=this[_0x967338(0x158)](_0x2f65b4));else return'';}},VisuMZ[_0x5ba09f(0x3b4)]['Window_Base_processEscapeCharacter']=Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x314)],Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x314)]=function(_0x52e83d,_0x3f106b){const _0x550e71=_0x5ba09f;switch(_0x52e83d){case'C':if(_0x3f106b[_0x550e71(0x1b5)]){if(_0x550e71(0x2d7)!==_0x550e71(0x2d7)){const _0x207bae=this['_moveDuration'],_0x33784b=this[_0x550e71(0x30e)],_0xeae279=this[_0x550e71(0x145)]((_0x33784b-_0x207bae)/_0x33784b),_0x3bbe89=this[_0x550e71(0x145)]((_0x33784b-_0x207bae+0x1)/_0x33784b),_0x5997cf=(_0x4b5d4d-_0x15fb82*_0xeae279)/(0x1-_0xeae279);return _0x5997cf+(_0x5d142d-_0x5997cf)*_0x3bbe89;}else VisuMZ[_0x550e71(0x3b4)]['Window_Base_processEscapeCharacter'][_0x550e71(0x221)](this,_0x52e83d,_0x3f106b);}else this['obtainEscapeParam'](_0x3f106b);break;case'I':case'{':case'}':VisuMZ['MessageCore'][_0x550e71(0x372)][_0x550e71(0x221)](this,_0x52e83d,_0x3f106b);break;case'FS':this[_0x550e71(0x296)](_0x3f106b);break;case'PX':this['processPxTextCode'](_0x3f106b);break;case'PY':this[_0x550e71(0x3ae)](_0x3f106b);break;case'BOLD':this[_0x550e71(0x38d)](this[_0x550e71(0x300)](_0x3f106b));break;case'CENTERPICTURE':this[_0x550e71(0x1fb)](_0x3f106b);break;case _0x550e71(0x404):this[_0x550e71(0x3e7)](_0x3f106b);break;case _0x550e71(0x233):this['processCommonEvent'](_0x3f106b);break;case'ITALIC':this[_0x550e71(0x15c)](this[_0x550e71(0x300)](_0x3f106b));break;case _0x550e71(0x1a2):this['processDrawPicture'](_0x3f106b);break;case'PREVCOLOR':this[_0x550e71(0x25d)](_0x3f106b);break;case'TEXTALIGNMENT':this['processTextAlignmentChange'](_0x3f106b);break;case _0x550e71(0x407):this[_0x550e71(0x24b)](_0x3f106b);break;case'WRAPBREAK':this[_0x550e71(0x1d7)](_0x3f106b);break;default:this[_0x550e71(0x15b)](_0x52e83d,_0x3f106b);}},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x15b)]=function(_0x471ee5,_0x495d02){const _0x5c2f29=_0x5ba09f;for(const _0x53fa3b of VisuMZ['MessageCore']['Settings'][_0x5c2f29(0x2ab)]){if(_0x53fa3b[_0x5c2f29(0x286)]===_0x471ee5){if(_0x53fa3b[_0x5c2f29(0x3c3)]==='')this['obtainEscapeParam'](_0x495d02);_0x53fa3b[_0x5c2f29(0x360)][_0x5c2f29(0x221)](this,_0x495d02);if(this[_0x5c2f29(0x1f0)]===Window_Message){const _0x17bc78=_0x53fa3b[_0x5c2f29(0x1a4)]||0x0;if(_0x17bc78>0x0)this[_0x5c2f29(0x228)](_0x17bc78);}}}},Window_Base[_0x5ba09f(0x34d)]['makeFontBigger']=function(){const _0x314ce4=_0x5ba09f;this[_0x314ce4(0x3a6)][_0x314ce4(0x199)]+=VisuMZ[_0x314ce4(0x3b4)][_0x314ce4(0x406)][_0x314ce4(0x39e)]['FontChangeValue'],this[_0x314ce4(0x3a6)][_0x314ce4(0x199)]=Math['min'](this[_0x314ce4(0x3a6)][_0x314ce4(0x199)],VisuMZ['MessageCore'][_0x314ce4(0x406)][_0x314ce4(0x39e)]['FontBiggerCap']);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x261)]=function(){const _0x3a4b36=_0x5ba09f;this[_0x3a4b36(0x3a6)][_0x3a4b36(0x199)]-=VisuMZ['MessageCore']['Settings'][_0x3a4b36(0x39e)][_0x3a4b36(0x205)],this[_0x3a4b36(0x3a6)][_0x3a4b36(0x199)]=Math[_0x3a4b36(0x336)](this[_0x3a4b36(0x3a6)][_0x3a4b36(0x199)],VisuMZ[_0x3a4b36(0x3b4)][_0x3a4b36(0x406)]['General'][_0x3a4b36(0x1e1)]);},Window_Base[_0x5ba09f(0x34d)]['processFsTextCode']=function(_0x26591a){const _0x131388=_0x5ba09f,_0x49202e=this[_0x131388(0x300)](_0x26591a);this['contents']['fontSize']=_0x49202e['clamp'](VisuMZ[_0x131388(0x3b4)][_0x131388(0x406)][_0x131388(0x39e)][_0x131388(0x1e1)],VisuMZ[_0x131388(0x3b4)][_0x131388(0x406)][_0x131388(0x39e)][_0x131388(0x2dd)]);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x2dc)]=function(_0x73a444){const _0x2eaec2=_0x5ba09f;let _0x3afdff=this[_0x2eaec2(0x3a6)][_0x2eaec2(0x199)];const _0x4cb6b5=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x17f1ae=_0x4cb6b5['exec'](_0x73a444);if(!_0x17f1ae){if('tTFgv'!==_0x2eaec2(0x340)){if(this[_0x2eaec2(0x32d)]===_0x193b6b)this[_0x2eaec2(0x311)]();if(this[_0x2eaec2(0x32d)]['choiceTextAlign']===_0x265ad2)this[_0x2eaec2(0x311)]();this['_MessageCoreSettings']['choiceTextAlign']=_0x37c7d9[_0x2eaec2(0x17e)]();}else break;}const _0x2e3f79=String(_0x17f1ae[0x1])[_0x2eaec2(0x14d)]();if(_0x2e3f79==='{')this[_0x2eaec2(0x2d1)]();else{if(_0x2e3f79==='}'){if(_0x2eaec2(0x30a)===_0x2eaec2(0x30a))this[_0x2eaec2(0x261)]();else{const _0x2f6a66=_0x13f1ad['$1'][_0x2eaec2(0x317)](',')[_0x2eaec2(0x39b)](_0x335872=>_0xe39e93(_0x335872)||0x0);for(const _0x3d5cba of _0x2f6a66){if(!_0xf84f50[_0x2eaec2(0x3bd)](_0x3d5cba))return![];}return!![];}}else{if(_0x2e3f79==='FS'){if('opRXI'!==_0x2eaec2(0x3ec))this['contents']['fontSize']=parseInt(_0x17f1ae[0x3])[_0x2eaec2(0x341)](VisuMZ[_0x2eaec2(0x3b4)][_0x2eaec2(0x406)][_0x2eaec2(0x39e)][_0x2eaec2(0x1e1)],VisuMZ[_0x2eaec2(0x3b4)][_0x2eaec2(0x406)][_0x2eaec2(0x39e)][_0x2eaec2(0x2dd)]);else{let _0x40a4a1=0x0;return _0x40bbff[_0x2eaec2(0x25f)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x40a4a1=_0x35c803(_0x30126d['$1'])),_0x40a4a1;}}}}this[_0x2eaec2(0x3a6)][_0x2eaec2(0x199)]>_0x3afdff&&(_0x3afdff=this[_0x2eaec2(0x3a6)][_0x2eaec2(0x199)]);}return _0x3afdff;},Window_Base['prototype'][_0x5ba09f(0x13f)]=function(_0x27bf68){const _0x5821a9=_0x5ba09f;_0x27bf68['x']=this[_0x5821a9(0x300)](_0x27bf68),VisuMZ[_0x5821a9(0x3b4)][_0x5821a9(0x406)]['General'][_0x5821a9(0x2d5)]&&(_0x5821a9(0x345)!=='jhhqJ'?this[_0x5821a9(0x292)]=null:_0x27bf68['x']+=_0x27bf68[_0x5821a9(0x15d)]);},Window_Base['prototype']['processPyTextCode']=function(_0x41e99c){const _0x365926=_0x5ba09f;_0x41e99c['y']=this[_0x365926(0x300)](_0x41e99c),VisuMZ[_0x365926(0x3b4)]['Settings'][_0x365926(0x39e)][_0x365926(0x2d5)]&&(_0x41e99c['y']+=_0x41e99c[_0x365926(0x319)]);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x38d)]=function(_0x139eba){const _0x38985b=_0x5ba09f;this['contents'][_0x38985b(0x132)]=!!_0x139eba;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x15c)]=function(_0x9988df){const _0x17e39b=_0x5ba09f;this[_0x17e39b(0x3a6)][_0x17e39b(0x310)]=!!_0x9988df;},Window_Base['prototype'][_0x5ba09f(0x376)]=function(_0x332d58){const _0xeeed15=_0x5ba09f,_0x2a2938=this[_0xeeed15(0x300)](_0x332d58);if(!_0x332d58['drawing'])return;switch(_0x2a2938){case 0x0:this[_0xeeed15(0x203)]('default');return;case 0x1:this[_0xeeed15(0x203)]('left');break;case 0x2:this[_0xeeed15(0x203)](_0xeeed15(0x293));break;case 0x3:this['setTextAlignment']('right');break;}this[_0xeeed15(0x1da)](_0x332d58);},Window_Base['prototype'][_0x5ba09f(0x1da)]=function(_0x3e7533){const _0x48dab5=_0x5ba09f;if(!_0x3e7533[_0x48dab5(0x1b5)])return;if(_0x3e7533['rtl'])return;if(this[_0x48dab5(0x3a1)]()==='default')return;let _0x213ca3=_0x3e7533[_0x48dab5(0x3ba)]['indexOf'](_0x48dab5(0x1e5),_0x3e7533[_0x48dab5(0x2f2)]+0x1),_0x17ab1c=_0x3e7533['text']['indexOf']('\x0a',_0x3e7533[_0x48dab5(0x2f2)]+0x1);if(_0x213ca3<0x0)_0x213ca3=_0x3e7533[_0x48dab5(0x3ba)][_0x48dab5(0x39c)]+0x1;if(_0x17ab1c>0x0)_0x213ca3=Math[_0x48dab5(0x3fc)](_0x213ca3,_0x17ab1c);const _0x297521=_0x3e7533['text'][_0x48dab5(0x28f)](_0x3e7533[_0x48dab5(0x2f2)],_0x213ca3),_0x5ee8ff=this[_0x48dab5(0x163)](_0x297521)[_0x48dab5(0x273)],_0x4f911a=_0x3e7533['width']||this['innerWidth']-0x8,_0x135768=this[_0x48dab5(0x1f0)]===Window_Message&&$gameMessage['faceName']()!=='';switch(this[_0x48dab5(0x3a1)]()){case _0x48dab5(0x23d):_0x3e7533['x']=_0x3e7533[_0x48dab5(0x15d)];break;case'center':_0x3e7533['x']=_0x3e7533[_0x48dab5(0x15d)],_0x3e7533['x']+=Math[_0x48dab5(0x2f6)]((_0x4f911a-_0x5ee8ff)/0x2);_0x135768&&(_0x3e7533['x']-=_0x3e7533[_0x48dab5(0x15d)]/0x2);break;case _0x48dab5(0x19a):_0x3e7533['x']=_0x4f911a-_0x5ee8ff+_0x3e7533[_0x48dab5(0x15d)];_0x135768&&(_0x3e7533['x']-=_0x3e7533['startX']);break;}},Window_Base['prototype'][_0x5ba09f(0x163)]=function(_0xce3f2e){const _0x37c6c5=_0x5ba09f;_0xce3f2e=_0xce3f2e['replace'](/\x1b!/g,''),_0xce3f2e=_0xce3f2e['replace'](/\x1b\|/g,''),_0xce3f2e=_0xce3f2e[_0x37c6c5(0x3d8)](/\x1b\./g,'');const _0x2459f0=this[_0x37c6c5(0x279)](_0xce3f2e,0x0,0x0,0x0),_0x568399=this[_0x37c6c5(0x21b)]();return _0x2459f0['drawing']=![],this[_0x37c6c5(0x164)](_0x2459f0),this['returnPreservedFontSettings'](_0x568399),{'width':_0x2459f0[_0x37c6c5(0x3d0)],'height':_0x2459f0['outputHeight']};},Window_Base[_0x5ba09f(0x320)]=VisuMZ[_0x5ba09f(0x3b4)]['Settings'][_0x5ba09f(0x241)]['EndPadding']||0x0,Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x1d7)]=function(_0x3a3082){const _0x2274c3=_0x5ba09f,_0x559d5c=(_0x3a3082['rtl']?-0x1:0x1)*this[_0x2274c3(0x154)]('\x20');_0x3a3082['x']+=_0x559d5c;if(this[_0x2274c3(0x300)](_0x3a3082)>0x0)_0x3a3082['x']+=_0x559d5c;if(_0x3a3082[_0x2274c3(0x3d6)])return;let _0x2ddf9b=_0x3a3082[_0x2274c3(0x3ba)][_0x2274c3(0x20c)](_0x2274c3(0x28a),_0x3a3082[_0x2274c3(0x2f2)]+0x1),_0x3f95c4=_0x3a3082[_0x2274c3(0x3ba)][_0x2274c3(0x20c)]('\x0a',_0x3a3082[_0x2274c3(0x2f2)]+0x1);if(_0x2ddf9b<0x0)_0x2ddf9b=_0x3a3082[_0x2274c3(0x3ba)]['length']+0x1;if(_0x3f95c4>0x0)_0x2ddf9b=Math[_0x2274c3(0x3fc)](_0x2ddf9b,_0x3f95c4);const _0x1e978e=_0x3a3082['text'][_0x2274c3(0x28f)](_0x3a3082[_0x2274c3(0x2f2)],_0x2ddf9b),_0x64b21c=this[_0x2274c3(0x214)](_0x1e978e)['width'];let _0x4e1d93=_0x3a3082[_0x2274c3(0x273)]||this['innerWidth'];_0x4e1d93-=Window_Base['WORD_WRAP_PADDING'];if(this[_0x2274c3(0x1f0)]===Window_Message){const _0x4d1fc0=$gameMessage['faceName']()===''?0x0:ImageManager['faceWidth']+0x14;_0x4e1d93-=_0x4d1fc0,VisuMZ[_0x2274c3(0x3b4)][_0x2274c3(0x406)][_0x2274c3(0x241)]['TightWrap']&&(_0x4e1d93-=_0x4d1fc0);}let _0x57fc72=![];if(_0x3a3082['x']+_0x64b21c>_0x3a3082['startX']+_0x4e1d93)_0x57fc72=!![];if(_0x64b21c===0x0)_0x57fc72=!![];_0x57fc72&&(_0x3a3082[_0x2274c3(0x3ba)]=_0x3a3082[_0x2274c3(0x3ba)]['slice'](0x0,_0x3a3082[_0x2274c3(0x2f2)])+'\x0a'+_0x3a3082[_0x2274c3(0x3ba)][_0x2274c3(0x403)](_0x3a3082['index']));},Window_Base['prototype'][_0x5ba09f(0x214)]=function(_0x462ec7){const _0x1cbd5e=_0x5ba09f,_0x197f69=this[_0x1cbd5e(0x279)](_0x462ec7,0x0,0x0,0x0),_0x5e1430=this['getPreservedFontSettings']();return _0x197f69[_0x1cbd5e(0x1b5)]=![],this[_0x1cbd5e(0x245)](![]),this[_0x1cbd5e(0x164)](_0x197f69),this['setWordWrap'](!![]),this['returnPreservedFontSettings'](_0x5e1430),{'width':_0x197f69[_0x1cbd5e(0x3d0)],'height':_0x197f69[_0x1cbd5e(0x387)]};},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x252)]=function(_0x57e305){const _0x57ed1a=_0x5ba09f;return this[_0x57ed1a(0x300)](_0x57e305);},Window_Base[_0x5ba09f(0x34d)]['processDrawPicture']=function(_0x4be313){const _0x6631bd=_0x5ba09f,_0x1ebd61=this['obtainEscapeString'](_0x4be313)[_0x6631bd(0x317)](',');if(!_0x4be313[_0x6631bd(0x1b5)])return;const _0x5dc3fe=_0x1ebd61[0x0][_0x6631bd(0x19f)](),_0x45f9ca=_0x1ebd61[0x1]||0x0,_0xa879b2=_0x1ebd61[0x2]||0x0,_0x16a303=ImageManager['loadPicture'](_0x5dc3fe),_0x17a880=this['contents'][_0x6631bd(0x3c1)];_0x16a303['addLoadListener'](this['drawBackPicture']['bind'](this,_0x16a303,_0x4be313['x'],_0x4be313['y'],_0x45f9ca,_0xa879b2,_0x17a880));},Window_Base['prototype'][_0x5ba09f(0x2d9)]=function(_0x402409,_0x2052ab,_0x39899a,_0x570640,_0xc3920f,_0x990bdb){const _0x5b9c2b=_0x5ba09f;_0x570640=_0x570640||_0x402409['width'],_0xc3920f=_0xc3920f||_0x402409[_0x5b9c2b(0x144)],this['contentsBack'][_0x5b9c2b(0x3c1)]=_0x990bdb,this['contentsBack'][_0x5b9c2b(0x23b)](_0x402409,0x0,0x0,_0x402409[_0x5b9c2b(0x273)],_0x402409[_0x5b9c2b(0x144)],_0x2052ab,_0x39899a,_0x570640,_0xc3920f),this[_0x5b9c2b(0x1c5)]['paintOpacity']=0xff;},Window_Base[_0x5ba09f(0x34d)]['processDrawCenteredPicture']=function(_0x343a10){const _0x286d4b=_0x5ba09f,_0x44c111=this[_0x286d4b(0x377)](_0x343a10)['split'](',');if(!_0x343a10['drawing'])return;const _0x525444=_0x44c111[0x0][_0x286d4b(0x19f)](),_0x1756ec=ImageManager['loadPicture'](_0x525444),_0x3379b8=JsonEx[_0x286d4b(0x3cb)](_0x343a10),_0x1d3f97=this[_0x286d4b(0x3a6)][_0x286d4b(0x3c1)];_0x1756ec[_0x286d4b(0x373)](this[_0x286d4b(0x236)][_0x286d4b(0x159)](this,_0x1756ec,_0x3379b8,_0x1d3f97));},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x236)]=function(_0x3ac666,_0x4a79d4,_0x49dc94){const _0x4ac392=_0x5ba09f,_0x527da8=_0x4a79d4[_0x4ac392(0x273)]||this[_0x4ac392(0x353)],_0x5c2163=this[_0x4ac392(0x366)]!==undefined?this[_0x4ac392(0x267)]():this['innerHeight'],_0x22abba=_0x527da8/_0x3ac666[_0x4ac392(0x273)],_0x5d5f68=_0x5c2163/_0x3ac666[_0x4ac392(0x144)],_0x27fb06=Math[_0x4ac392(0x3fc)](_0x22abba,_0x5d5f68,0x1),_0xc1d696=this[_0x4ac392(0x366)]!==undefined?(this['itemRectWithPadding'](0x0)['height']-this['lineHeight']())/0x2:0x0,_0x345de6=_0x3ac666['width']*_0x27fb06,_0x689f92=_0x3ac666[_0x4ac392(0x144)]*_0x27fb06,_0x21139a=Math[_0x4ac392(0x2f6)]((_0x527da8-_0x345de6)/0x2)+_0x4a79d4[_0x4ac392(0x15d)],_0x53d93b=Math[_0x4ac392(0x2f6)]((_0x5c2163-_0x689f92)/0x2)+_0x4a79d4['startY']-_0xc1d696*0x2;this[_0x4ac392(0x1c5)][_0x4ac392(0x3c1)]=_0x49dc94,this[_0x4ac392(0x1c5)][_0x4ac392(0x23b)](_0x3ac666,0x0,0x0,_0x3ac666[_0x4ac392(0x273)],_0x3ac666[_0x4ac392(0x144)],_0x21139a,_0x53d93b,_0x345de6,_0x689f92),this[_0x4ac392(0x1c5)]['paintOpacity']=0xff;},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x3e7)]=function(_0x5d1749){const _0x5ea815=_0x5ba09f,_0x54803e=this[_0x5ea815(0x300)](_0x5d1749);if(_0x5d1749['drawing'])this[_0x5ea815(0x1fa)](_0x54803e>0x0);},Window_Base[_0x5ba09f(0x34d)][_0x5ba09f(0x24b)]=function(_0x1694e9){const _0x3b86d3=_0x5ba09f,_0x70d009=this[_0x3b86d3(0x300)](_0x1694e9);this[_0x3b86d3(0x1f0)]===Window_Message&&_0x1694e9[_0x3b86d3(0x1b5)]&&this[_0x3b86d3(0x160)](_0x70d009);},Window_Help[_0x5ba09f(0x34d)][_0x5ba09f(0x368)]=function(){const _0xccec5a=_0x5ba09f;this['setWordWrap']($gameSystem[_0xccec5a(0x18a)]());},Window_Help[_0x5ba09f(0x34d)][_0x5ba09f(0x186)]=function(){return!![];},VisuMZ['MessageCore'][_0x5ba09f(0x1ed)]=Window_Help[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)],Window_Help[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)]=function(){const _0x54e52f=_0x5ba09f;this[_0x54e52f(0x209)](),VisuMZ[_0x54e52f(0x3b4)][_0x54e52f(0x1ed)]['call'](this),this[_0x54e52f(0x368)]();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x2b5)]=Window_Options[_0x5ba09f(0x34d)][_0x5ba09f(0x298)],Window_Options['prototype'][_0x5ba09f(0x298)]=function(){const _0x1be914=_0x5ba09f;VisuMZ[_0x1be914(0x3b4)]['Window_Options_addGeneralOptions'][_0x1be914(0x221)](this),this[_0x1be914(0x3be)]();},Window_Options[_0x5ba09f(0x34d)][_0x5ba09f(0x3be)]=function(){const _0x39ac19=_0x5ba09f;VisuMZ[_0x39ac19(0x3b4)][_0x39ac19(0x406)][_0x39ac19(0x33b)][_0x39ac19(0x2c8)]&&this[_0x39ac19(0x1f6)]();},Window_Options[_0x5ba09f(0x34d)]['addMessageCoreTextSpeedCommand']=function(){const _0x466ee3=_0x5ba09f,_0x29d710=TextManager[_0x466ee3(0x35e)],_0x3f08eb='textSpeed';this[_0x466ee3(0x1be)](_0x29d710,_0x3f08eb);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x2b6)]=Window_Options[_0x5ba09f(0x34d)]['statusText'],Window_Options[_0x5ba09f(0x34d)][_0x5ba09f(0x287)]=function(_0xdc13f4){const _0x2143c3=_0x5ba09f,_0x4ea620=this[_0x2143c3(0x270)](_0xdc13f4);if(_0x4ea620===_0x2143c3(0x1d3))return this[_0x2143c3(0x301)]();return VisuMZ[_0x2143c3(0x3b4)]['Window_Options_statusText'][_0x2143c3(0x221)](this,_0xdc13f4);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x2f0)]=Window_Options['prototype'][_0x5ba09f(0x278)],Window_Options[_0x5ba09f(0x34d)][_0x5ba09f(0x278)]=function(_0x47c9d3){const _0x8e958d=_0x5ba09f;if(_0x47c9d3===_0x8e958d(0x1d3))return!![];return VisuMZ[_0x8e958d(0x3b4)][_0x8e958d(0x2f0)]['call'](this,_0x47c9d3);},Window_Options[_0x5ba09f(0x34d)][_0x5ba09f(0x301)]=function(){const _0x563036=_0x5ba09f,_0x539694=this[_0x563036(0x1f8)](_0x563036(0x1d3));return _0x539694>0xa?TextManager[_0x563036(0x1bb)]:_0x539694;},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3fa)]=Window_Options['prototype'][_0x5ba09f(0x358)],Window_Options[_0x5ba09f(0x34d)]['changeVolume']=function(_0x248b01,_0x47e020,_0x174574){const _0x2813a4=_0x5ba09f;if(_0x248b01===_0x2813a4(0x1d3))return this[_0x2813a4(0x151)](_0x248b01,_0x47e020,_0x174574);VisuMZ['MessageCore'][_0x2813a4(0x3fa)][_0x2813a4(0x221)](this,_0x248b01,_0x47e020,_0x174574);},Window_Options[_0x5ba09f(0x34d)]['changeTextSpeed']=function(_0x4f9706,_0x18a160,_0x19ada1){const _0x3c6536=_0x5ba09f,_0x2ea029=this[_0x3c6536(0x1f8)](_0x4f9706),_0x4e12f2=0x1,_0x266ad5=_0x2ea029+(_0x18a160?_0x4e12f2:-_0x4e12f2);if(_0x266ad5>0xb&&_0x19ada1)_0x3c6536(0x161)==='OVXLt'?(_0x1efae5[_0x3c6536(0x3b4)][_0x3c6536(0x280)][_0x3c6536(0x221)](this),this[_0x3c6536(0x311)]()):this['changeValue'](_0x4f9706,0x1);else{if(_0x3c6536(0x1ab)!==_0x3c6536(0x38a))this[_0x3c6536(0x17c)](_0x4f9706,_0x266ad5[_0x3c6536(0x341)](0x1,0xb));else{var _0x23fe92=/^\<(.*?)\>/[_0x3c6536(0x36c)](_0x27f412[_0x3c6536(0x3ba)]['slice'](_0x43c039[_0x3c6536(0x2f2)]));return _0x23fe92?(_0x27d436['index']+=_0x23fe92[0x0][_0x3c6536(0x39c)],_0x557c0a(_0x23fe92[0x0][_0x3c6536(0x1f1)](0x1,_0x23fe92[0x0]['length']-0x1))):'';}}},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x219)]=function(){const _0x3de9c9=_0x5ba09f;let _0x4100f7=Window_Base[_0x3de9c9(0x34d)][_0x3de9c9(0x219)][_0x3de9c9(0x221)](this);return _0x4100f7-=this['addedHeight'](),_0x4100f7;},Window_Message[_0x5ba09f(0x34d)]['refreshDimmerBitmap']=function(){const _0xc4ebf2=_0x5ba09f;Window_Base[_0xc4ebf2(0x34d)][_0xc4ebf2(0x16a)][_0xc4ebf2(0x221)](this),VisuMZ[_0xc4ebf2(0x3b4)]['Settings'][_0xc4ebf2(0x39e)][_0xc4ebf2(0x2bd)]&&this[_0xc4ebf2(0x2e9)]();},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2e9)]=function(){const _0x2c25b6=_0x5ba09f;this[_0x2c25b6(0x32a)]['x']=Math[_0x2c25b6(0x13a)](this[_0x2c25b6(0x273)]/0x2),this[_0x2c25b6(0x32a)][_0x2c25b6(0x174)]['x']=0.5,this['_dimmerSprite'][_0x2c25b6(0x1f2)]['x']=Graphics[_0x2c25b6(0x273)];},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x180)]=Window_Message['prototype'][_0x5ba09f(0x364)],Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x364)]=function(){const _0x4c6cda=_0x5ba09f;VisuMZ[_0x4c6cda(0x3b4)][_0x4c6cda(0x180)][_0x4c6cda(0x221)](this),this['clearActorNameAutoColor'](),this[_0x4c6cda(0x368)](),this[_0x4c6cda(0x1fa)](![]),this[_0x4c6cda(0x203)]('default'),this[_0x4c6cda(0x18f)](VisuMZ[_0x4c6cda(0x3b4)][_0x4c6cda(0x406)][_0x4c6cda(0x39e)][_0x4c6cda(0x2e3)]);},Window_Message[_0x5ba09f(0x34d)]['resetWordWrap']=function(){const _0x759b06=_0x5ba09f;this[_0x759b06(0x245)]($gameSystem['isMessageWindowWordWrap']());},Window_Message['prototype'][_0x5ba09f(0x186)]=function(){return!![];},Window_Message[_0x5ba09f(0x34d)]['setTextDelay']=function(_0x41441a){const _0x500772=_0x5ba09f,_0x5a773f=0xb-ConfigManager['textSpeed'];_0x41441a=Math['round'](_0x41441a*_0x5a773f),this['_textDelayCount']=_0x41441a,this[_0x500772(0x30c)]=_0x41441a;},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x316)]=Window_Message[_0x5ba09f(0x34d)]['isTriggered'],Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x1d2)]=function(){const _0x4716a0=_0x5ba09f;return VisuMZ[_0x4716a0(0x3b4)][_0x4716a0(0x316)][_0x4716a0(0x221)](this)||Input[_0x4716a0(0x3e0)](VisuMZ[_0x4716a0(0x3b4)][_0x4716a0(0x406)][_0x4716a0(0x39e)][_0x4716a0(0x3c9)]);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x134)]=Window_Message[_0x5ba09f(0x34d)]['updatePlacement'],Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3dd)]=function(){const _0x378265=_0x5ba09f;let _0x28b27e=this['y'];this['x']=Math['round']((Graphics[_0x378265(0x3a7)]-this['width'])/0x2),VisuMZ[_0x378265(0x3b4)][_0x378265(0x134)]['call'](this);if(this[_0x378265(0x321)])this['y']=_0x28b27e;this[_0x378265(0x3b3)](),this[_0x378265(0x188)](),this[_0x378265(0x1fd)]();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x392)]=Window_Message[_0x5ba09f(0x34d)]['newPage'],Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2ad)]=function(_0x567b9e){const _0x3378cc=_0x5ba09f;this[_0x3378cc(0x262)](_0x567b9e),this[_0x3378cc(0x299)](_0x567b9e),VisuMZ[_0x3378cc(0x3b4)][_0x3378cc(0x392)][_0x3378cc(0x221)](this,_0x567b9e),this['createContents']();},Window_Message['prototype'][_0x5ba09f(0x262)]=function(_0x2063ed){const _0x57f635=_0x5ba09f;if(!_0x2063ed)return;this[_0x57f635(0x177)]=![],_0x2063ed['text']=this['convertTextMacros'](_0x2063ed['text']),this[_0x57f635(0x271)]&&(_0x2063ed[_0x57f635(0x3ba)]=this[_0x57f635(0x2eb)](_0x2063ed['text']),this[_0x57f635(0x177)]=!![]);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2eb)]=function(_0x5428f9){const _0xa36dbb=_0x5ba09f;if(this['_macroBypassWordWrap'])return _0x5428f9;return Window_Base[_0xa36dbb(0x34d)][_0xa36dbb(0x2eb)]['call'](this,_0x5428f9);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x299)]=function(_0x485919){const _0x13da38=_0x5ba09f;this[_0x13da38(0x332)](_0x485919),this[_0x13da38(0x3ef)](_0x485919),this[_0x13da38(0x31a)]();},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3fb)]=Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3de)],Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3de)]=function(){const _0x408dfc=_0x5ba09f;VisuMZ[_0x408dfc(0x3b4)][_0x408dfc(0x3fb)][_0x408dfc(0x221)](this),this[_0x408dfc(0x364)]();if(this[_0x408dfc(0x3c0)])this[_0x408dfc(0x1d9)]();},Window_Message[_0x5ba09f(0x34d)]['updateDimensions']=function(){const _0x1d39ab=_0x5ba09f;this[_0x1d39ab(0x273)]=$gameSystem['getMessageWindowWidth']()+this[_0x1d39ab(0x243)]();;this[_0x1d39ab(0x273)]=Math['min'](Graphics[_0x1d39ab(0x273)],this[_0x1d39ab(0x273)]);const _0x8b3433=$gameSystem[_0x1d39ab(0x135)]();this['height']=SceneManager[_0x1d39ab(0x2df)]['calcWindowHeight'](_0x8b3433,![])+this[_0x1d39ab(0x1fc)](),this['height']=Math[_0x1d39ab(0x3fc)](Graphics[_0x1d39ab(0x144)],this[_0x1d39ab(0x144)]);if($gameTemp[_0x1d39ab(0x14e)])this[_0x1d39ab(0x1dc)]();},Window_Message[_0x5ba09f(0x34d)]['addedWidth']=function(){return 0x0;},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x1fc)]=function(){return 0x0;},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x1dc)]=function(){const _0x3ca708=_0x5ba09f;this['x']=(Graphics[_0x3ca708(0x3a7)]-this[_0x3ca708(0x273)])/0x2,$gameTemp['_centerMessageWindow']=undefined,this[_0x3ca708(0x1fd)]();},Window_Message[_0x5ba09f(0x34d)]['updateMove']=function(){const _0x1e09ad=_0x5ba09f,_0x1cf8a5={'x':this['x'],'y':this['y']};Window_Base['prototype'][_0x1e09ad(0x30b)][_0x1e09ad(0x221)](this),this[_0x1e09ad(0x37f)](_0x1cf8a5);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x173)]=function(){return!![];},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x37f)]=function(_0x1a53ef){const _0xd28b55=_0x5ba09f;if(this[_0xd28b55(0x2bc)]){if(_0xd28b55(0x2b0)!=='opOpD')this['_nameBoxWindow']['x']+=this['x']-_0x1a53ef['x'],this[_0xd28b55(0x2bc)]['y']+=this['y']-_0x1a53ef['y'];else{_0xb1230[_0xd28b55(0x3b4)][_0xd28b55(0x255)][_0xd28b55(0x221)](this,_0x435bcc);const _0x15c8ef=_0x1bb75b[_0xd28b55(0x3b4)][_0xd28b55(0x406)]['AutoColor'];_0x39dfc4['MessageCore'][_0xd28b55(0x182)](_0x15d80c,_0x15c8ef['Items']);}}},Window_Message[_0x5ba09f(0x34d)]['resetRect']=function(_0x441c49,_0x55f322){const _0x3c572a=_0x5ba09f;this['moveTo'](this['_resetRect']['x'],this[_0x3c572a(0x2ed)]*(Graphics[_0x3c572a(0x3d7)]-this[_0x3c572a(0x144)])/0x2,this[_0x3c572a(0x2c0)][_0x3c572a(0x273)],this['_resetRect'][_0x3c572a(0x144)],_0x441c49,_0x55f322);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x252)]=function(_0x3fd016){const _0x36bfe9=_0x5ba09f,_0x2895d6=Window_Base[_0x36bfe9(0x34d)][_0x36bfe9(0x252)][_0x36bfe9(0x221)](this,_0x3fd016);_0x3fd016[_0x36bfe9(0x1b5)]&&(_0x36bfe9(0x3e6)!==_0x36bfe9(0x3e6)?_0x169f60=_0xe2af4a[_0x36bfe9(0x2f6)]((this[_0x36bfe9(0x144)]-_0x1f0aaf['height'])/0x2):this[_0x36bfe9(0x228)](_0x2895d6));},Window_Message['prototype'][_0x5ba09f(0x228)]=function(_0x1db922){const _0x73f552=_0x5ba09f;if($gameParty[_0x73f552(0x179)]()){}else _0x73f552(0x1f9)!==_0x73f552(0x1f9)?_0x37dd96['x']=this[_0x73f552(0x273)]+_0x47ae3c:$gameMap[_0x73f552(0x206)](_0x1db922);},Window_Message['prototype']['processCharacter']=function(_0x10f73c){const _0x27206a=_0x5ba09f;this[_0x27206a(0x37d)]--,this['_textDelayCount']<=0x0&&(_0x27206a(0x323)===_0x27206a(0x323)?(this[_0x27206a(0x3da)](_0x10f73c),Window_Base[_0x27206a(0x34d)]['processCharacter']['call'](this,_0x10f73c)):(_0x7c41c4['text']=this['prepareWordWrapEscapeCharacters'](_0x40d315[_0x27206a(0x3ba)]),this[_0x27206a(0x177)]=!![]));},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3da)]=function(_0x2d95d1){const _0x4ac5f0=_0x5ba09f;this[_0x4ac5f0(0x37d)]=this[_0x4ac5f0(0x30c)];if(this[_0x4ac5f0(0x30c)]<=0x0)this[_0x4ac5f0(0x234)]=!![];},VisuMZ['MessageCore'][_0x5ba09f(0x17a)]=Window_Message['prototype'][_0x5ba09f(0x314)],Window_Message['prototype'][_0x5ba09f(0x314)]=function(_0x344af0,_0x43ea70){const _0x42906b=_0x5ba09f;if(!_0x43ea70[_0x42906b(0x1b5)])_0x42906b(0x3a2)===_0x42906b(0x338)?(_0x5f0fe2[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x3da807,_0x49bf38[_0x42906b(0x1db)]),_0x169af1[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x3323bb,_0x18c30d['Skills']),_0x369ad8[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x2308a2,_0x335dc8[_0x42906b(0x362)]),_0x1ac359[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x9e74c3,_0x4c5d62[_0x42906b(0x1aa)]),_0x124454[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x34eccb,_0x106eda[_0x42906b(0x1dd)]),_0x211feb[_0x42906b(0x3b4)][_0x42906b(0x39f)](_0x54af6c,_0x3ba13e[_0x42906b(0x369)]),_0x2d7235['MessageCore'][_0x42906b(0x39f)](_0x33050d,_0xa3e80c[_0x42906b(0x138)])):Window_Base[_0x42906b(0x34d)][_0x42906b(0x314)][_0x42906b(0x221)](this,_0x344af0,_0x43ea70);else{if(_0x42906b(0x294)===_0x42906b(0x294))VisuMZ[_0x42906b(0x3b4)][_0x42906b(0x17a)]['call'](this,_0x344af0,_0x43ea70);else{const _0x55e4b9=this[_0x42906b(0x1f8)](_0x42906b(0x1d3));return _0x55e4b9>0xa?_0x4ebe2c['instantTextSpeed']:_0x55e4b9;}}},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x23f)]=Window_Message[_0x5ba09f(0x34d)]['needsNewPage'],Window_Message['prototype']['needsNewPage']=function(_0x26a847){const _0x5ed23d=_0x5ba09f;if(this[_0x5ed23d(0x408)])return![];return VisuMZ[_0x5ed23d(0x3b4)]['Window_Message_needsNewPage'][_0x5ed23d(0x221)](this,_0x26a847);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x332)]=function(_0x477013){const _0x3927bb=_0x5ba09f;let _0x4a5100=_0x477013[_0x3927bb(0x3ba)];this[_0x3927bb(0x2fc)]={};if(this[_0x3927bb(0x334)]())return _0x4a5100;_0x4a5100=_0x4a5100['replace'](/<POSITION:[ ]*(.*)>/gi,(_0x318ace,_0x2dd397)=>{const _0x5d529c=_0x3927bb,_0x14ccd2=_0x2dd397[_0x5d529c(0x317)](',')[_0x5d529c(0x39b)](_0x1becea=>Number(_0x1becea)||0x0);if(_0x14ccd2[0x0]!==undefined)this[_0x5d529c(0x2fc)]['x']=Number(_0x14ccd2[0x0]);if(_0x14ccd2[0x1]!==undefined)this[_0x5d529c(0x2fc)]['y']=Number(_0x14ccd2[0x1]);if(_0x14ccd2[0x2]!==undefined)this[_0x5d529c(0x2fc)]['width']=Number(_0x14ccd2[0x2]);if(_0x14ccd2[0x3]!==undefined)this[_0x5d529c(0x2fc)]['height']=Number(_0x14ccd2[0x3]);return'';}),_0x4a5100=_0x4a5100[_0x3927bb(0x3d8)](/<COORDINATES:[ ]*(.*)>/gi,(_0x533278,_0x15f671)=>{const _0x64175e=_0x3927bb;if(_0x64175e(0x156)!==_0x64175e(0x344)){const _0x5a5b22=_0x15f671[_0x64175e(0x317)](',')[_0x64175e(0x39b)](_0x3cc974=>Number(_0x3cc974)||0x0);if(_0x5a5b22[0x0]!==undefined)this[_0x64175e(0x2fc)]['x']=Number(_0x5a5b22[0x0]);if(_0x5a5b22[0x1]!==undefined)this[_0x64175e(0x2fc)]['y']=Number(_0x5a5b22[0x1]);return'';}else return 0x0;}),_0x4a5100=_0x4a5100['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x21718c,_0x4cdc26)=>{const _0x19d66d=_0x3927bb,_0x2edf43=_0x4cdc26['split'](',')[_0x19d66d(0x39b)](_0x524b39=>Number(_0x524b39)||0x0);if(_0x2edf43[0x0]!==undefined)this[_0x19d66d(0x2fc)][_0x19d66d(0x273)]=Number(_0x2edf43[0x2]);if(_0x2edf43[0x1]!==undefined)this[_0x19d66d(0x2fc)][_0x19d66d(0x144)]=Number(_0x2edf43[0x3]);return'';}),_0x4a5100=_0x4a5100[_0x3927bb(0x3d8)](/<OFFSET:[ ]*(.*)>/gi,(_0x527880,_0x419135)=>{const _0x53bb09=_0x3927bb,_0x79bc11=_0x419135['split'](',')[_0x53bb09(0x39b)](_0x47431d=>Number(_0x47431d)||0x0);let _0x6d1ab=_0x79bc11[0x0]||0x0,_0x48e56a=_0x79bc11[0x1]||0x0;return $gameSystem['setMessageWindowXyOffsets'](_0x6d1ab,_0x48e56a),'';}),_0x477013[_0x3927bb(0x3ba)]=_0x4a5100;},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3b3)]=function(){const _0x3e78d9=_0x5ba09f,_0x487cf5=$gameSystem[_0x3e78d9(0x220)]();this['x']+=_0x487cf5['x'],this['y']+=_0x487cf5['y'];},Window_Message[_0x5ba09f(0x34d)]['updateForcedPlacement']=function(){const _0x10cb96=_0x5ba09f;this['_forcedPosition']=this[_0x10cb96(0x2fc)]||{};const _0x30fd52=['x','y',_0x10cb96(0x273),_0x10cb96(0x144)];for(const _0xa53264 of _0x30fd52){this[_0x10cb96(0x2fc)][_0xa53264]!==undefined&&(this[_0xa53264]=Number(this[_0x10cb96(0x2fc)][_0xa53264]));}},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x3ef)]=function(_0x3cc68d){const _0x1fac45=_0x5ba09f;this[_0x1fac45(0x408)]=![];let _0x314d5e=_0x3cc68d[_0x1fac45(0x3ba)];_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x39993f=_0x1fac45;return this[_0x39993f(0x1d1)](_0x314d5e,!![],!![]),this[_0x39993f(0x2e8)]('none'),'';}),_0x314d5e=_0x314d5e['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x437e4e=_0x1fac45;return this[_0x437e4e(0x1d1)](_0x314d5e,!![],![]),this['processAutoPosition'](_0x437e4e(0x307)),'';}),_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x1078e7=_0x1fac45;return this[_0x1078e7(0x1d1)](_0x314d5e,![],!![]),this[_0x1078e7(0x2e8)](_0x1078e7(0x307)),'';});if(SceneManager[_0x1fac45(0x2db)]()){if(_0x1fac45(0x1b1)==='WTdwb')_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3a66d3,_0x2d3b06)=>{const _0xbd7f1e=_0x1fac45;if(_0xbd7f1e(0x3d4)===_0xbd7f1e(0x3d4))return this[_0xbd7f1e(0x1d1)](_0x314d5e,!![],!![]),this[_0xbd7f1e(0x2e8)](_0xbd7f1e(0x2a5),Number(_0x2d3b06)||0x1),'';else!_0x306375['drawing']?_0x40841c[_0xbd7f1e(0x34d)]['processEscapeCharacter'][_0xbd7f1e(0x221)](this,_0x506f80,_0xb31513):_0x4da13f['MessageCore'][_0xbd7f1e(0x17a)][_0xbd7f1e(0x221)](this,_0x202944,_0x4442b7);}),_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3cc41b,_0x22cc19)=>{const _0x59b3b3=_0x1fac45;return this[_0x59b3b3(0x1d1)](_0x314d5e,!![],!![]),this['processAutoPosition'](_0x59b3b3(0x325),Number(_0x22cc19)||0x0),'';}),_0x314d5e=_0x314d5e['replace'](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x9ba191,_0xa07432)=>{const _0x2aadca=_0x1fac45;return this[_0x2aadca(0x1d1)](_0x314d5e,!![],!![]),this['processAutoPosition']('battle\x20enemy',Number(_0xa07432)||0x0),'';});else return![];}else SceneManager[_0x1fac45(0x216)]()&&(_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x143bd9,_0x1b3fa0)=>{const _0x1dc16c=_0x1fac45;return this[_0x1dc16c(0x1d1)](_0x314d5e,!![],!![]),this['processAutoPosition']('map\x20player',0x0),'';}),_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2be8fd,_0x245021)=>{const _0x1f763a=_0x1fac45;if(_0x1f763a(0x312)===_0x1f763a(0x312))return this['processAutoSize'](_0x314d5e,!![],!![]),this[_0x1f763a(0x2e8)](_0x1f763a(0x1a6),Number(_0x245021)||0x1),'';else{const _0xd044ae=_0x21b83e['MessageCore'][_0x1f763a(0x3a5)][_0x1f763a(0x221)](this);return _0xd044ae[_0x1f763a(0x1d3)]=this[_0x1f763a(0x1d3)],_0xd044ae;}}),_0x314d5e=_0x314d5e[_0x1fac45(0x3d8)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x55c2b0,_0x519939)=>{const _0x386fa6=_0x1fac45;return this['processAutoSize'](_0x314d5e,!![],!![]),this[_0x386fa6(0x2e8)](_0x386fa6(0x136),Number(_0x519939)||0x0),'';}),_0x314d5e=_0x314d5e['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x52d8c8,_0x1e413c)=>{const _0x12fc82=_0x1fac45;if(_0x12fc82(0x218)==='jWckB')return this[_0x12fc82(0x1d1)](_0x314d5e,!![],!![]),this[_0x12fc82(0x2e8)]('map\x20event',Number(_0x1e413c)||0x0),'';else{if(this['_messageOffsetX']===_0x1ee8e6){const _0x385327=_0x1fb162[_0x12fc82(0x3b4)][_0x12fc82(0x406)][_0x12fc82(0x39e)];this[_0x12fc82(0x371)]=_0x385327['MsgWindowOffsetX'],this[_0x12fc82(0x2af)]=_0x385327['MsgWindowOffsetY'];}return{'x':this[_0x12fc82(0x371)]||0x0,'y':this[_0x12fc82(0x2af)]||0x0};}}));_0x3cc68d[_0x1fac45(0x3ba)]=_0x314d5e;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x1d1)]=function(_0x1c6915,_0x2be2ab,_0x2827be){const _0x2fa4cc=_0x5ba09f;_0x1c6915=_0x1c6915['replace'](Window_Message['_autoSizeRegexp'],''),_0x1c6915=_0x1c6915[_0x2fa4cc(0x3d8)](Window_Message[_0x2fa4cc(0x227)],''),this[_0x2fa4cc(0x22c)]=!![],this['_currentAutoSize']=!![];const _0x159c06=this[_0x2fa4cc(0x25a)](_0x1c6915);if(_0x2be2ab){if(_0x2fa4cc(0x395)===_0x2fa4cc(0x395)){let _0x4339e4=_0x159c06['width']+$gameSystem[_0x2fa4cc(0x1c6)]()*0x2+0x6;const _0x5de7ea=$gameMessage['faceName']()!=='',_0x334246=ImageManager[_0x2fa4cc(0x244)],_0x2f1b77=0x14;_0x4339e4+=_0x5de7ea?_0x334246+_0x2f1b77:0x4;if(_0x4339e4%0x2!==0x0)_0x4339e4+=0x1;$gameSystem[_0x2fa4cc(0x13d)](_0x4339e4);}else _0x2c7b32[_0x2fa4cc(0x33a)]=_0x21c1e1['TextJS'];}if(_0x2827be){let _0x1fec0f=Math['ceil'](_0x159c06[_0x2fa4cc(0x144)]/this[_0x2fa4cc(0x342)]());$gameSystem['setMessageWindowRows'](_0x1fec0f);}this[_0x2fa4cc(0x1ce)](),this[_0x2fa4cc(0x22c)]=![],this[_0x2fa4cc(0x3c0)]=!![];},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x1ce)]=function(){const _0x6f284a=_0x5ba09f;this[_0x6f284a(0x31a)](),this[_0x6f284a(0x3dd)](),this[_0x6f284a(0x1dc)](),this[_0x6f284a(0x29b)](),this[_0x6f284a(0x3a6)][_0x6f284a(0x1b8)](),this['createContents']();},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2e8)]=function(_0x5c47e6,_0xb6e0b2){const _0x2fe93a=_0x5ba09f;switch(_0x5c47e6['toLowerCase']()['trim']()){case _0x2fe93a(0x2a5):this['_autoPositionTarget']=$gameActors[_0x2fe93a(0x1b7)](_0xb6e0b2);break;case'battle\x20party':this[_0x2fe93a(0x321)]=$gameParty[_0x2fe93a(0x2b7)]()[_0xb6e0b2-0x1];break;case'battle\x20enemy':this[_0x2fe93a(0x321)]=$gameTroop[_0x2fe93a(0x2b7)]()[_0xb6e0b2-0x1];break;case'map\x20player':this['_autoPositionTarget']=$gamePlayer;break;case _0x2fe93a(0x1a6):const _0x520188=$gameActors[_0x2fe93a(0x1b7)](_0xb6e0b2)['index']();if(_0x520188===0x0){if('mhHSk'===_0x2fe93a(0x139))this['_autoPositionTarget']=$gamePlayer;else{if(!this[_0x2fe93a(0x276)])return;if(this[_0x2fe93a(0x2c3)]===this[_0x2fe93a(0x273)]&&this[_0x2fe93a(0x2ca)]===this[_0x2fe93a(0x144)])return;this[_0x2fe93a(0x2c3)]=this[_0x2fe93a(0x273)],this['_pictureTextHeight']=this['height'],this[_0x2fe93a(0x357)]={},this[_0x2fe93a(0x276)][_0x2fe93a(0x21d)](0x0,0x0,this[_0x2fe93a(0x273)],this['height']);}}else this['_autoPositionTarget']=$gamePlayer[_0x2fe93a(0x3f0)]()[_0x2fe93a(0x165)](_0x520188-0x1);break;case _0x2fe93a(0x136):if(_0xb6e0b2===0x1)this[_0x2fe93a(0x321)]=$gamePlayer;else{if(_0x2fe93a(0x2a1)==='UmZtK'){const _0x2fa347=_0x379223>=0x1?_0x1e8294[_0x2fe93a(0x1b7)](_0x18ed4c):null,_0x36b2ca=_0x2fa347?_0x2fa347['name']():'',_0x360a79=_0x2fad08(_0x137a9c[_0x2fe93a(0x3b4)][_0x2fe93a(0x406)][_0x2fe93a(0x2c4)][_0x2fe93a(0x1d4)]);return this[_0x2fe93a(0x186)]()&&_0x360a79!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x2fe93a(0x2ae)](_0x360a79,_0x36b2ca):_0x36b2ca;}else this[_0x2fe93a(0x321)]=$gamePlayer[_0x2fe93a(0x3f0)]()['follower'](_0xb6e0b2-0x2);}break;case'map\x20event':this[_0x2fe93a(0x321)]=$gameMap[_0x2fe93a(0x3a0)](_0xb6e0b2);break;}this[_0x2fe93a(0x321)]&&this[_0x2fe93a(0x26f)]();},VisuMZ['MessageCore'][_0x5ba09f(0x29f)]=Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x21c)],Window_Message[_0x5ba09f(0x34d)]['synchronizeNameBox']=function(){const _0x468781=_0x5ba09f;this['updateAutoPosition'](),VisuMZ[_0x468781(0x3b4)]['Window_Message_synchronizeNameBox']['call'](this);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x26f)]=function(){const _0x3c0515=_0x5ba09f;if(!this['_autoPositionTarget'])return;const _0x1eaf25=SceneManager[_0x3c0515(0x2df)];if(!_0x1eaf25)return;if(!_0x1eaf25[_0x3c0515(0x27f)])return;const _0x171ff7=_0x1eaf25[_0x3c0515(0x27f)][_0x3c0515(0x150)](this['_autoPositionTarget']);if(!_0x171ff7)return;let _0x4bc700=_0x171ff7['x'];_0x4bc700-=this[_0x3c0515(0x273)]/0x2,_0x4bc700-=(Graphics[_0x3c0515(0x273)]-Graphics[_0x3c0515(0x3a7)])/0x2,_0x4bc700+=this[_0x3c0515(0x3f4)]();let _0x55cc20=_0x171ff7['y'];_0x55cc20-=this[_0x3c0515(0x144)],_0x55cc20-=(Graphics['height']-Graphics[_0x3c0515(0x3d7)])/0x2,_0x55cc20+=this['autoPositionOffsetY'](),_0x55cc20-=_0x171ff7[_0x3c0515(0x144)]+0x8;const _0x1d34d5=$gameSystem[_0x3c0515(0x220)]();_0x4bc700+=_0x1d34d5['x'],_0x55cc20+=_0x1d34d5['y'],this['x']=Math[_0x3c0515(0x13a)](_0x4bc700),this['y']=Math[_0x3c0515(0x13a)](_0x55cc20),this[_0x3c0515(0x1fd)](!![],![]),this['_forcedPosition']=this[_0x3c0515(0x2fc)]||{},this['_forcedPosition']['x']=this['x'],this[_0x3c0515(0x2fc)]['y']=this['y'],this[_0x3c0515(0x2fc)]['width']=this[_0x3c0515(0x273)],this[_0x3c0515(0x2fc)][_0x3c0515(0x144)]=this['height'],this[_0x3c0515(0x2bc)]['updatePlacement']();},Window_Message['prototype']['autoPositionOffsetX']=function(){return 0x0;},Window_Message['prototype'][_0x5ba09f(0x1c7)]=function(){return 0x0;},Window_Message[_0x5ba09f(0x34d)]['messagePositionReset']=function(){const _0x22aa1a=_0x5ba09f;this[_0x22aa1a(0x3c0)]=![],this['_autoPositionTarget']=undefined,$gameSystem[_0x22aa1a(0x311)](),this[_0x22aa1a(0x1ce)](),this['openness']=0x0;},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x288)]=function(_0x2e15b4){const _0x1b0806=_0x5ba09f;return Window_Base['prototype'][_0x1b0806(0x288)]['call'](this,_0x2e15b4);},Window_Message['prototype'][_0x5ba09f(0x162)]=function(_0x59e5e9){const _0x4ce2ab=_0x5ba09f;return Window_Base[_0x4ce2ab(0x34d)][_0x4ce2ab(0x162)][_0x4ce2ab(0x221)](this,_0x59e5e9);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2ea)]=function(_0x3b111d){const _0x2d453c=_0x5ba09f;this[_0x2d453c(0x2a2)](_0x3b111d),Window_Base[_0x2d453c(0x34d)][_0x2d453c(0x2ea)][_0x2d453c(0x221)](this,_0x3b111d),this[_0x2d453c(0x16b)](_0x3b111d);},Window_Message[_0x5ba09f(0x34d)][_0x5ba09f(0x2a2)]=function(_0x2c27a9){},Window_Message[_0x5ba09f(0x34d)]['postFlushTextState']=function(_0x48d0a2){},Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x186)]=function(){return![];},Window_NameBox['prototype'][_0x5ba09f(0x269)]=function(){const _0x11c0aa=_0x5ba09f;Window_Base[_0x11c0aa(0x34d)][_0x11c0aa(0x269)][_0x11c0aa(0x221)](this),this[_0x11c0aa(0x31e)](this[_0x11c0aa(0x3ab)]());},Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x3ab)]=function(){const _0x237c0f=_0x5ba09f,_0x393c7b=VisuMZ[_0x237c0f(0x3b4)]['Settings'][_0x237c0f(0x39e)][_0x237c0f(0x1ee)];return ColorManager['textColor'](_0x393c7b);},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x3f9)]=Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x3dd)],Window_NameBox['prototype']['updatePlacement']=function(){const _0x726c6d=_0x5ba09f;VisuMZ[_0x726c6d(0x3b4)]['Window_NameBox_updatePlacement'][_0x726c6d(0x221)](this),this['updateRelativePosition'](),this[_0x726c6d(0x22b)](),this[_0x726c6d(0x1fd)](),this[_0x726c6d(0x140)]();},Window_NameBox['prototype'][_0x5ba09f(0x288)]=function(_0x2f4fdd){const _0x36a764=_0x5ba09f;return _0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<LEFT>/gi,this[_0x36a764(0x2a6)][_0x36a764(0x159)](this,0x0)),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<CENTER>/gi,this[_0x36a764(0x2a6)][_0x36a764(0x159)](this,0x5)),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<RIGHT>/gi,this[_0x36a764(0x2a6)][_0x36a764(0x159)](this,0xa)),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<POSITION:[ ](\d+)>/gi,(_0x2c4cbe,_0x58a527)=>this[_0x36a764(0x2a6)](parseInt(_0x58a527))),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<\/LEFT>/gi,''),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<\/CENTER>/gi,''),_0x2f4fdd=_0x2f4fdd[_0x36a764(0x3d8)](/<\/RIGHT>/gi,''),Window_Base[_0x36a764(0x34d)][_0x36a764(0x288)]['call'](this,_0x2f4fdd);},Window_NameBox['prototype'][_0x5ba09f(0x2a6)]=function(_0x10674e){const _0x386f05=_0x5ba09f;return this[_0x386f05(0x2bf)]=_0x10674e,'';},Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x2d3)]=function(){const _0x18f0c6=_0x5ba09f;if($gameMessage[_0x18f0c6(0x1c8)]())return;this['_relativePosition']=this[_0x18f0c6(0x2bf)]||0x0;const _0x2bc663=this[_0x18f0c6(0x2e1)],_0x31fc60=Math[_0x18f0c6(0x2f6)](_0x2bc663[_0x18f0c6(0x273)]*this[_0x18f0c6(0x2bf)]/0xa);this['x']=_0x2bc663['x']+_0x31fc60-Math['floor'](this[_0x18f0c6(0x273)]/0x2),this['x']=this['x'][_0x18f0c6(0x341)](_0x2bc663['x'],_0x2bc663['x']+_0x2bc663[_0x18f0c6(0x273)]-this[_0x18f0c6(0x273)]);},Window_NameBox['prototype'][_0x5ba09f(0x22b)]=function(){const _0x312b6b=_0x5ba09f;if($gameMessage['isRTL']())return;this['_relativePosition']=this['_relativePosition']||0x0;const _0x1cfc36=VisuMZ[_0x312b6b(0x3b4)][_0x312b6b(0x406)]['General'][_0x312b6b(0x2ec)],_0x388ad1=VisuMZ['MessageCore']['Settings'][_0x312b6b(0x39e)][_0x312b6b(0x295)],_0x28240f=(0x5-this[_0x312b6b(0x2bf)])/0x5;this['x']+=Math[_0x312b6b(0x2f6)](_0x1cfc36*_0x28240f),this['y']+=_0x388ad1;},Window_NameBox['prototype']['updateOverlappingY']=function(){const _0x20f413=_0x5ba09f,_0x29f9e9=this['_messageWindow'],_0x338139=_0x29f9e9['y'],_0x5e934e=VisuMZ['MessageCore']['Settings'][_0x20f413(0x39e)][_0x20f413(0x295)];if(_0x338139>this['y']&&_0x338139<this['y']+this[_0x20f413(0x144)]-_0x5e934e){if('jdwsm'===_0x20f413(0x2da)){const _0x551510={'x':this['x'],'y':this['y']};_0x183149['prototype'][_0x20f413(0x30b)][_0x20f413(0x221)](this),this[_0x20f413(0x37f)](_0x551510);}else this['y']=_0x29f9e9['y']+_0x29f9e9['height'];}},VisuMZ[_0x5ba09f(0x3b4)][_0x5ba09f(0x330)]=Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)],Window_NameBox[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)]=function(){const _0x1838ec=_0x5ba09f;this[_0x1838ec(0x2bf)]=0x0,VisuMZ[_0x1838ec(0x3b4)][_0x1838ec(0x330)][_0x1838ec(0x221)](this);},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x334)]=function(){return![];},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x186)]=function(){return!![];},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x267)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList[_0x5ba09f(0x34d)]['maxCols']=function(){const _0x3286d4=_0x5ba09f;return $gameSystem[_0x3286d4(0x21a)]();},Window_ChoiceList[_0x5ba09f(0x34d)]['start']=function(){const _0x339d09=_0x5ba09f;this[_0x339d09(0x20a)](),this[_0x339d09(0x35b)](),this[_0x339d09(0x3b2)](),this[_0x339d09(0x2a3)]();},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x20a)]=function(){const _0x4678b8=_0x5ba09f;this[_0x4678b8(0x237)](),this[_0x4678b8(0x16c)](),this['_messageWindow']&&(_0x4678b8(0x3f8)===_0x4678b8(0x3f8)?(this['updatePlacement'](),this[_0x4678b8(0x3b7)]()):(_0x3d41f1[_0x4678b8(0x352)](_0xd8759f[0x0],_0x1a493c[0x1]),_0x1b8d57[_0x4678b8(0x26e)](_0xe6d1e9[0x2]),_0x296f80[_0x4678b8(0x3e3)](_0x27d2d6[0x3]),_0x5d20f5['setSpeakerName'](_0x1c1b6b[0x4]))),this[_0x4678b8(0x3aa)](),this[_0x4678b8(0x3fe)](),this[_0x4678b8(0x16a)](),Window_Selectable[_0x4678b8(0x34d)][_0x4678b8(0x20a)][_0x4678b8(0x221)](this);},Window_ChoiceList['prototype'][_0x5ba09f(0x16c)]=function(){const _0x58e080=_0x5ba09f,_0x36acf7=$gameMessage['choices']();let _0x3b8a02=0x0;for(let _0x2e5d05 of _0x36acf7){_0x2e5d05=this[_0x58e080(0x1e6)](_0x2e5d05);if(this['isChoiceVisible'](_0x2e5d05)){if(_0x58e080(0x1ca)===_0x58e080(0x20b))_0x1ffb01[_0x58e080(0x3b4)][_0x58e080(0x184)][_0x58e080(0x221)](this),this[_0x58e080(0x22a)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this[_0x58e080(0x37a)](),this[_0x58e080(0x25b)]();else{const _0x326f01=this[_0x58e080(0x193)](_0x2e5d05),_0x57c99a=this[_0x58e080(0x397)](_0x2e5d05);this[_0x58e080(0x1be)](_0x326f01,_0x58e080(0x2fe),_0x57c99a,_0x3b8a02);}}_0x3b8a02++;}},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x1e6)]=function(_0x1db7a1){const _0xda2b69=_0x5ba09f;return Window_Base[_0xda2b69(0x34d)][_0xda2b69(0x328)][_0xda2b69(0x221)](this,_0x1db7a1);},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x402)]=function(_0x1016e6){const _0x50ce9c=_0x5ba09f;if(Imported[_0x50ce9c(0x3c5)])$gameMessage[_0x50ce9c(0x1bd)]();if(_0x1016e6['match'](/<HIDE>/i))return![];if(_0x1016e6[_0x50ce9c(0x25f)](/<SHOW>/i))return!![];if(_0x1016e6[_0x50ce9c(0x25f)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('aXZdM'!==_0x50ce9c(0x153)){if(_0xd1a10b['value'](_0x5f09fd))return!![];}else{const _0x3362f2=RegExp['$1'][_0x50ce9c(0x317)](',')[_0x50ce9c(0x39b)](_0x352faf=>Number(_0x352faf)||0x0);for(const _0x4035fb of _0x3362f2){if(_0x50ce9c(0x14b)===_0x50ce9c(0x3f1)){const _0x3d7147=_0x31bb89(_0x837edf['$1']);_0x3d7147!==_0x65f7a8[_0x1a9cd4][_0x50ce9c(0x25e)]&&(_0x1908b5('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x50ce9c(0x2ae)](_0x5bd9ad,_0x3d7147)),_0x39b3f6[_0x50ce9c(0x14a)]());}else{if(!$gameSwitches['value'](_0x4035fb))return![];}}return!![];}}if(_0x1016e6[_0x50ce9c(0x25f)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x353e91=RegExp['$1']['split'](',')[_0x50ce9c(0x39b)](_0x47ddc6=>Number(_0x47ddc6)||0x0);for(const _0x1d0b75 of _0x353e91){if(_0x50ce9c(0x18c)===_0x50ce9c(0x18c)){if(!$gameSwitches['value'](_0x1d0b75))return![];}else return _0x47b54d=_0x1cb957[_0x50ce9c(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x5b2fa2=_0x36d97d[_0x50ce9c(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x142d8d=_0x4b708c[_0x50ce9c(0x3d8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3b174d=_0x54398a['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3a4035=_0x14664f[_0x50ce9c(0x3d8)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x2026fe;}return!![];}if(_0x1016e6[_0x50ce9c(0x25f)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x50ce9c(0x3a4)===_0x50ce9c(0x3bf)){this[_0x50ce9c(0x264)]=this['x']+_0x264cea,this[_0x50ce9c(0x3a8)]=this['y']+_0x4042d2,this['_moveTargetWidth']=this[_0x50ce9c(0x273)]+(_0x3c27b7||0x0),this[_0x50ce9c(0x3fd)]=this[_0x50ce9c(0x144)]+(_0x576cc5||0x0),this[_0x50ce9c(0x3dc)]=_0x4a5a19||0x1;if(this['_moveDuration']<=0x0)this[_0x50ce9c(0x3dc)]=0x1;this[_0x50ce9c(0x30e)]=this[_0x50ce9c(0x3dc)],this['_moveEasingType']=_0x42ac0d||0x0;if(_0x54f0c<=0x0)this[_0x50ce9c(0x30b)]();}else{const _0x1b98ed=RegExp['$1']['split'](',')['map'](_0x240525=>Number(_0x240525)||0x0);for(const _0x276a8c of _0x1b98ed){if($gameSwitches['value'](_0x276a8c))return!![];}return![];}}if(_0x1016e6[_0x50ce9c(0x25f)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x54ca58=RegExp['$1'][_0x50ce9c(0x317)](',')[_0x50ce9c(0x39b)](_0xd14d46=>Number(_0xd14d46)||0x0);for(const _0x4ecef8 of _0x54ca58){if(_0x50ce9c(0x31f)!==_0x50ce9c(0x35f)){if(!$gameSwitches['value'](_0x4ecef8))return!![];}else{_0x52e94b=_0x434089[_0x50ce9c(0x3d8)](_0x3f0d2a[_0x50ce9c(0x34a)],''),_0x2b5495=_0x29b44b[_0x50ce9c(0x3d8)](_0x5e576f['_autoPosRegExp'],''),this['_autoSizeCheck']=!![],this[_0x50ce9c(0x408)]=!![];const _0x55f84e=this[_0x50ce9c(0x25a)](_0xaa928e);if(_0xcccacc){let _0x4b1cd2=_0x55f84e[_0x50ce9c(0x273)]+_0x13f62a[_0x50ce9c(0x1c6)]()*0x2+0x6;const _0x5a434d=_0x809b2[_0x50ce9c(0x1c0)]()!=='',_0x1dd723=_0x318f84[_0x50ce9c(0x244)],_0x3c869b=0x14;_0x4b1cd2+=_0x5a434d?_0x1dd723+_0x3c869b:0x4;if(_0x4b1cd2%0x2!==0x0)_0x4b1cd2+=0x1;_0x561cf0[_0x50ce9c(0x13d)](_0x4b1cd2);}if(_0x5437fd){let _0x569da6=_0x3c4bff[_0x50ce9c(0x2de)](_0x55f84e[_0x50ce9c(0x144)]/this[_0x50ce9c(0x342)]());_0x2e4674[_0x50ce9c(0x3d9)](_0x569da6);}this[_0x50ce9c(0x1ce)](),this[_0x50ce9c(0x22c)]=![],this[_0x50ce9c(0x3c0)]=!![];}}return![];}if(_0x1016e6[_0x50ce9c(0x25f)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xd9222c=RegExp['$1'][_0x50ce9c(0x317)](',')[_0x50ce9c(0x39b)](_0x59618f=>Number(_0x59618f)||0x0);for(const _0x56f50c of _0xd9222c){if(_0x50ce9c(0x29a)!==_0x50ce9c(0x29a)){if(this[_0x50ce9c(0x32d)]===_0x368167)this['initMessageCore']();if(this[_0x50ce9c(0x32d)][_0x50ce9c(0x2b3)]===_0x1c75ab)this['initMessageCore']();return this[_0x50ce9c(0x32d)][_0x50ce9c(0x2b3)];}else{if(!$gameSwitches[_0x50ce9c(0x3bd)](_0x56f50c))return!![];}}return![];}if(_0x1016e6[_0x50ce9c(0x25f)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x28f5a3=RegExp['$1'][_0x50ce9c(0x317)](',')[_0x50ce9c(0x39b)](_0x3fb126=>Number(_0x3fb126)||0x0);for(const _0x379f34 of _0x28f5a3){if('uqwOe'===_0x50ce9c(0x29e)){if($gameSwitches['value'](_0x379f34))return![];}else{if(this[_0x50ce9c(0x408)])return![];return _0x58fcc9[_0x50ce9c(0x3b4)][_0x50ce9c(0x23f)][_0x50ce9c(0x221)](this,_0x46ca31);}}return!![];}return!![];},Window_ChoiceList['prototype'][_0x5ba09f(0x193)]=function(_0x549c11){const _0x411f0b=_0x5ba09f;let _0x243a7b=_0x549c11;return _0x243a7b=_0x243a7b[_0x411f0b(0x3d8)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x243a7b=_0x243a7b[_0x411f0b(0x3d8)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x243a7b;},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x397)]=function(_0x4d4088){const _0xa44f92=_0x5ba09f;if(Imported[_0xa44f92(0x3c5)])$gameMessage[_0xa44f92(0x1bd)]();if(_0x4d4088['match'](/<DISABLE>/i))return![];if(_0x4d4088[_0xa44f92(0x25f)](/<ENABLE>/i))return!![];if(_0x4d4088['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x113237=RegExp['$1'][_0xa44f92(0x317)](',')[_0xa44f92(0x39b)](_0x4ac770=>Number(_0x4ac770)||0x0);for(const _0x158b8c of _0x113237){if(!$gameSwitches[_0xa44f92(0x3bd)](_0x158b8c))return![];}return!![];}if(_0x4d4088['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xa44f92(0x1ea)===_0xa44f92(0x201))return this[_0xa44f92(0x2c9)]()===0x65&&_0x2695e9['getMessageWindowRows']()>0x4?!![]:this['nextEventCode']()===0x191;else{const _0x30e30f=RegExp['$1'][_0xa44f92(0x317)](',')['map'](_0xf72bc8=>Number(_0xf72bc8)||0x0);for(const _0x10ed09 of _0x30e30f){if(_0xa44f92(0x3d1)!==_0xa44f92(0x217)){if(!$gameSwitches[_0xa44f92(0x3bd)](_0x10ed09))return![];}else return _0x900f9=_0x1771dd[_0xa44f92(0x3d8)](/<COLORLOCK>/gi,_0xa44f92(0x1d6)),_0x2ae501=_0x57bf01[_0xa44f92(0x3d8)](/<\/COLORLOCK>/gi,_0xa44f92(0x3ac)),_0x55b350=_0x4b2d4d[_0xa44f92(0x3d8)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x42833e=_0x3dc04d['replace'](/\)\)\)/gi,_0xa44f92(0x3ac)),_0x148306;}return!![];}}if(_0x4d4088[_0xa44f92(0x25f)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x401735=RegExp['$1'][_0xa44f92(0x317)](',')[_0xa44f92(0x39b)](_0x1ab507=>Number(_0x1ab507)||0x0);for(const _0x15d751 of _0x401735){if($gameSwitches[_0xa44f92(0x3bd)](_0x15d751))return!![];}return![];}if(_0x4d4088['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('GlNru'!=='cxRak'){const _0x19e183=RegExp['$1'][_0xa44f92(0x317)](',')['map'](_0x356e34=>Number(_0x356e34)||0x0);for(const _0x4298b1 of _0x19e183){if(!$gameSwitches[_0xa44f92(0x3bd)](_0x4298b1))return!![];}return![];}else{if(this['_macroBypassWordWrap'])return _0x2d5b20;return _0x269769['prototype'][_0xa44f92(0x2eb)][_0xa44f92(0x221)](this,_0x16d199);}}if(_0x4d4088[_0xa44f92(0x25f)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xa44f92(0x1fe)==='JQMGf'){const _0x10ebf4=_0x2b4629(_0x56b5ce['$1']);_0x10ebf4<_0x44bc4d?(_0x3094f7(_0xa44f92(0x1e0)[_0xa44f92(0x2ae)](_0x46ca57,_0x10ebf4,_0x24fe02)),_0x5390e2[_0xa44f92(0x14a)]()):_0x17a558=_0x3bf6a8[_0xa44f92(0x336)](_0x10ebf4,_0x359b26);}else{const _0x3e9290=RegExp['$1'][_0xa44f92(0x317)](',')[_0xa44f92(0x39b)](_0x432f26=>Number(_0x432f26)||0x0);for(const _0x2aa428 of _0x3e9290){if('tbchj'!==_0xa44f92(0x2d8)){const _0x21aa5d=-(_0x2b64c4[_0xa44f92(0x2f6)](_0x1f90b7['width']-_0x40dee6['boxWidth'])/0x2),_0x1701cf=_0x21aa5d+_0x186205[_0xa44f92(0x273)]-this[_0xa44f92(0x273)],_0x521822=-(_0x14d3f3[_0xa44f92(0x2f6)](_0x6024d2['height']-_0x3af622[_0xa44f92(0x3d7)])/0x2),_0x470a2d=_0x521822+_0xeec687[_0xa44f92(0x144)]-this['height'];this['x']=this['x'][_0xa44f92(0x341)](_0x21aa5d,_0x1701cf),this['y']=this['y'][_0xa44f92(0x341)](_0x521822,_0x470a2d);}else{if(!$gameSwitches[_0xa44f92(0x3bd)](_0x2aa428))return!![];}}return![];}}if(_0x4d4088[_0xa44f92(0x25f)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xa44f92(0x2f3)==='dECpy'){const _0x2d6b39=_0x57f465[_0xa44f92(0x3b4)][_0xa44f92(0x406)][_0xa44f92(0x39e)],_0x241557=_0x4c7bc3[_0xa44f92(0x3b4)][_0xa44f92(0x406)]['WordWrap'];this[_0xa44f92(0x32d)]={'messageRows':_0x2d6b39['MessageRows'],'messageWidth':_0x2d6b39['MessageWidth'],'messageWordWrap':_0x241557[_0xa44f92(0x2d4)],'helpWordWrap':_0x241557[_0xa44f92(0x40d)],'choiceLineHeight':_0x2d6b39[_0xa44f92(0x3cc)],'choiceRows':_0x2d6b39[_0xa44f92(0x3e1)],'choiceCols':_0x2d6b39[_0xa44f92(0x3ea)],'choiceTextAlign':_0x2d6b39[_0xa44f92(0x2f4)]},this[_0xa44f92(0x371)]===_0x3524ef&&(this[_0xa44f92(0x371)]=_0x2d6b39[_0xa44f92(0x1b0)],this['_messageOffsetY']=_0x2d6b39[_0xa44f92(0x3d2)]);}else{const _0xc0f6dd=RegExp['$1']['split'](',')[_0xa44f92(0x39b)](_0x2ed457=>Number(_0x2ed457)||0x0);for(const _0xdd9af1 of _0xc0f6dd){if($gameSwitches[_0xa44f92(0x3bd)](_0xdd9af1))return![];}return!![];}}return!![];},VisuMZ['MessageCore'][_0x5ba09f(0x374)]=Window_ChoiceList['prototype']['updatePlacement'],Window_ChoiceList[_0x5ba09f(0x34d)]['updatePlacement']=function(){const _0x45df89=_0x5ba09f;VisuMZ[_0x45df89(0x3b4)][_0x45df89(0x374)][_0x45df89(0x221)](this),this[_0x45df89(0x1fd)]();},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x3b7)]=function(){const _0x367bee=_0x5ba09f;if(!this[_0x367bee(0x170)])return;const _0x6f14cc=0x8,_0x2dc85f=this[_0x367bee(0x170)],_0x194a02=this['x']+this[_0x367bee(0x273)],_0x239a38=Math[_0x367bee(0x2f6)]((Graphics[_0x367bee(0x273)]-Graphics[_0x367bee(0x3a7)])/0x2);_0x194a02>=Graphics[_0x367bee(0x3a7)]+_0x239a38-_0x2dc85f['width']+_0x6f14cc?_0x2dc85f['x']=-_0x2dc85f[_0x367bee(0x273)]-_0x6f14cc:_0x2dc85f['x']=this[_0x367bee(0x273)]+_0x6f14cc,_0x2dc85f['y']=this['height']/0x2-_0x2dc85f[_0x367bee(0x144)]/0x2;},VisuMZ['MessageCore']['Window_ChoiceList_windowX']=Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x1a5)],Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x1a5)]=function(){const _0x56fd89=_0x5ba09f;return this['_messageWindow']?this['messageCoreWindowX']():VisuMZ[_0x56fd89(0x3b4)][_0x56fd89(0x3cf)][_0x56fd89(0x221)](this);},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x3c8)]=function(){const _0x2af50c=_0x5ba09f,_0x460e4d=$gameMessage[_0x2af50c(0x198)]();if(_0x460e4d===0x1)return(Graphics['boxWidth']-this['windowWidth']())/0x2;else return _0x460e4d===0x2?this['_messageWindow']['x']+this['_messageWindow']['width']-this[_0x2af50c(0x257)]():this[_0x2af50c(0x2e1)]['x'];},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x257)]=function(){const _0x2b2875=_0x5ba09f,_0x403db3=(this[_0x2b2875(0x3eb)]()+this['colSpacing']())*this[_0x2b2875(0x1ac)]()+this[_0x2b2875(0x1e8)]*0x2;return Math[_0x2b2875(0x3fc)](_0x403db3,Graphics[_0x2b2875(0x273)]);},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x335)]=function(){const _0x3ac48f=_0x5ba09f,_0x2107f3=$gameMessage[_0x3ac48f(0x1c3)]()[_0x3ac48f(0x39b)](_0x1ec397=>this[_0x3ac48f(0x1e6)](_0x1ec397))[_0x3ac48f(0x21f)](_0x1ce8e0=>this['isChoiceVisible'](_0x1ce8e0)),_0x448f72=Math[_0x3ac48f(0x2de)](_0x2107f3['length']/this[_0x3ac48f(0x1ac)]());return Math['max'](0x1,Math[_0x3ac48f(0x3fc)](_0x448f72,this[_0x3ac48f(0x306)]()));},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x306)]=function(){const _0x393eb8=_0x5ba09f,_0x1906f5=this[_0x393eb8(0x2e1)],_0x4bf73b=_0x1906f5?_0x1906f5['y']:0x0,_0x2d85d3=_0x1906f5?_0x1906f5[_0x393eb8(0x144)]:0x0,_0x5c0fc0=Graphics[_0x393eb8(0x3d7)]/0x2;if(_0x4bf73b<_0x5c0fc0&&_0x4bf73b+_0x2d85d3>_0x5c0fc0){if(_0x393eb8(0x185)===_0x393eb8(0x3c2)){_0x288fc7[_0x393eb8(0x24a)](_0x325901,_0xe4f7fc);const _0x2276ae=_0x3f4330[_0x393eb8(0x2a7)]||_0xf95512['getMessageWindowRows']()||0x1,_0xe49f65=_0x63d8f6['Width']||_0x13a682[_0x393eb8(0x409)]()||0x1;_0x349df8[_0x393eb8(0x14e)]=!![];const _0x8d81b9=_0x1011a7[_0x393eb8(0x241)][_0x393eb8(0x17e)]();_0x55b83e[_0x393eb8(0x3d9)](_0x2276ae),_0x53c340[_0x393eb8(0x13d)](_0xe49f65);[_0x393eb8(0x2e7),'false'][_0x393eb8(0x3e5)](_0x8d81b9)&&_0x274829['setMessageWindowWordWrap'](_0x4ef3ec(_0x8d81b9));const _0x4f4b24=_0x2e313c[_0x393eb8(0x2df)][_0x393eb8(0x2e1)];_0x4f4b24&&(_0x4f4b24['resetWordWrap'](),_0x4f4b24['updateDimensions'](),_0x4f4b24[_0x393eb8(0x3aa)]());}else return 0x4;}else return $gameSystem[_0x393eb8(0x2fa)]();},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x3eb)]=function(){const _0x14c23f=_0x5ba09f;let _0x403f35=this[_0x14c23f(0x324)]();for(const _0x4b1f12 of this[_0x14c23f(0x172)]){const _0x595cbb=_0x4b1f12[_0x14c23f(0x1ba)],_0x46e9df=this[_0x14c23f(0x283)](_0x595cbb),_0x22756f=this[_0x14c23f(0x25a)](_0x595cbb)[_0x14c23f(0x273)]+_0x46e9df,_0x2892e7=Math[_0x14c23f(0x2de)](_0x22756f)+this[_0x14c23f(0x17d)]()*0x2;_0x403f35=Math[_0x14c23f(0x336)](_0x403f35,_0x2892e7);}return _0x403f35;},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x324)]=function(){const _0x40a88a=_0x5ba09f;let _0x241e9b=0x60;const _0x3f0725=$gameMessage[_0x40a88a(0x1c3)]();for(const _0xb436cc of _0x3f0725){if(_0x40a88a(0x346)!==_0x40a88a(0x346))return this['_messageWindow']['x'];else _0xb436cc[_0x40a88a(0x25f)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&('kIkFa'==='kIkFa'?_0x241e9b=Math[_0x40a88a(0x336)](_0x241e9b,Number(RegExp['$1'])):this[_0x40a88a(0x2fc)][_0x3f27a3]!==_0xf7f0d3&&(this[_0x1489b9]=_0x3a58e3(this[_0x40a88a(0x2fc)][_0x4a1c5e])));}return _0x241e9b;},Window_ChoiceList['prototype']['drawItem']=function(_0x157eb0){const _0xda0127=_0x5ba09f,_0x42ae87=this[_0xda0127(0x223)](_0x157eb0),_0xb2ce2e=$gameSystem[_0xda0127(0x3f2)]()!==_0xda0127(0x329)?_0xda0127(0x365)[_0xda0127(0x2ae)]($gameSystem[_0xda0127(0x3f2)]()):'',_0x459f77=_0xb2ce2e+this[_0xda0127(0x2ef)](_0x157eb0);this['changePaintOpacity'](this[_0xda0127(0x3a9)](_0x157eb0));const _0x477a7d=this[_0xda0127(0x25a)](_0x459f77)[_0xda0127(0x144)],_0x189c5c=_0x42ae87['x']+this[_0xda0127(0x283)](_0x459f77),_0x578b23=Math[_0xda0127(0x336)](_0x42ae87['y'],_0x42ae87['y']+Math[_0xda0127(0x13a)]((_0x42ae87[_0xda0127(0x144)]-_0x477a7d)/0x2));this[_0xda0127(0x382)](_0x459f77,_0x189c5c,_0x578b23,_0x42ae87[_0xda0127(0x273)]);},Window_ChoiceList[_0x5ba09f(0x34d)]['getChoiceIndent']=function(_0x6c85b9){const _0x368c0e=_0x5ba09f;let _0xa0cbb1=0x0;return _0x6c85b9[_0x368c0e(0x25f)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0xa0cbb1=Number(RegExp['$1'])),_0xa0cbb1;},Window_ChoiceList[_0x5ba09f(0x34d)][_0x5ba09f(0x20f)]=function(){const _0x5751a2=_0x5ba09f;$gameMessage[_0x5751a2(0x147)](this[_0x5751a2(0x2d0)]()),this['_messageWindow']['terminateMessage'](),this[_0x5751a2(0x15e)]();};