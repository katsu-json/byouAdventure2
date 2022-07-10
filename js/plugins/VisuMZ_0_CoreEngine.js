//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.60;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.60] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x9eb9ae=_0x5067;(function(_0x237da5,_0x536541){const _0x500af7=_0x5067,_0x4f41e9=_0x237da5();while(!![]){try{const _0x4ea709=-parseInt(_0x500af7(0x2b3))/0x1+-parseInt(_0x500af7(0x696))/0x2*(-parseInt(_0x500af7(0x2ce))/0x3)+-parseInt(_0x500af7(0x561))/0x4*(parseInt(_0x500af7(0x906))/0x5)+-parseInt(_0x500af7(0x835))/0x6*(-parseInt(_0x500af7(0x5f6))/0x7)+-parseInt(_0x500af7(0x909))/0x8*(parseInt(_0x500af7(0x49e))/0x9)+parseInt(_0x500af7(0x68c))/0xa+-parseInt(_0x500af7(0x4ed))/0xb*(-parseInt(_0x500af7(0x362))/0xc);if(_0x4ea709===_0x536541)break;else _0x4f41e9['push'](_0x4f41e9['shift']());}catch(_0x5cd6ce){_0x4f41e9['push'](_0x4f41e9['shift']());}}}(_0x4c77,0xaf743));var label=_0x9eb9ae(0x68b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x9eb9ae(0x641)](function(_0x9f99d6){const _0x9485fe=_0x9eb9ae;return _0x9f99d6[_0x9485fe(0x15f)]&&_0x9f99d6[_0x9485fe(0x241)][_0x9485fe(0x111)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x9eb9ae(0x259)]=function(_0x3f96f1,_0x190530){const _0x40487f=_0x9eb9ae;for(const _0x546468 in _0x190530){if('lasmH'!=='lasmH')this[_0x40487f(0x4df)]()?this['drawGoldItemStyle']():_0x21ef6c[_0x40487f(0x68b)][_0x40487f(0x3c3)][_0x40487f(0x330)](this);else{if(_0x546468[_0x40487f(0x6f5)](/(.*):(.*)/i)){const _0x463a61=String(RegExp['$1']),_0x34b5d6=String(RegExp['$2'])[_0x40487f(0x88e)]()[_0x40487f(0x81c)]();let _0x3f6f38,_0x4e6130,_0x5a02f5;switch(_0x34b5d6){case _0x40487f(0x783):_0x3f6f38=_0x190530[_0x546468]!==''?Number(_0x190530[_0x546468]):0x0;break;case'ARRAYNUM':_0x4e6130=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130[_0x40487f(0xf7)](_0x4105bf=>Number(_0x4105bf));break;case _0x40487f(0x307):_0x3f6f38=_0x190530[_0x546468]!==''?eval(_0x190530[_0x546468]):null;break;case _0x40487f(0x336):_0x4e6130=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130['map'](_0x5ae1bb=>eval(_0x5ae1bb));break;case'JSON':_0x3f6f38=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):'';break;case _0x40487f(0x110):_0x4e6130=_0x190530[_0x546468]!==''?JSON['parse'](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130[_0x40487f(0xf7)](_0x10bee4=>JSON[_0x40487f(0x8aa)](_0x10bee4));break;case _0x40487f(0x90c):_0x3f6f38=_0x190530[_0x546468]!==''?new Function(JSON[_0x40487f(0x8aa)](_0x190530[_0x546468])):new Function(_0x40487f(0x24f));break;case _0x40487f(0x28f):_0x4e6130=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130[_0x40487f(0xf7)](_0x1c46af=>new Function(JSON[_0x40487f(0x8aa)](_0x1c46af)));break;case _0x40487f(0x225):_0x3f6f38=_0x190530[_0x546468]!==''?String(_0x190530[_0x546468]):'';break;case _0x40487f(0x862):_0x4e6130=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130[_0x40487f(0xf7)](_0x425d4f=>String(_0x425d4f));break;case'STRUCT':_0x5a02f5=_0x190530[_0x546468]!==''?JSON[_0x40487f(0x8aa)](_0x190530[_0x546468]):{},_0x3f96f1[_0x463a61]={},VisuMZ[_0x40487f(0x259)](_0x3f96f1[_0x463a61],_0x5a02f5);continue;case _0x40487f(0x44c):_0x4e6130=_0x190530[_0x546468]!==''?JSON['parse'](_0x190530[_0x546468]):[],_0x3f6f38=_0x4e6130[_0x40487f(0xf7)](_0xa0e7f2=>VisuMZ[_0x40487f(0x259)]({},JSON[_0x40487f(0x8aa)](_0xa0e7f2)));break;default:continue;}_0x3f96f1[_0x463a61]=_0x3f6f38;}}}return _0x3f96f1;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x495)]=SceneManager[_0x9eb9ae(0x12d)],SceneManager[_0x9eb9ae(0x12d)]=function(){const _0x3ed7ef=_0x9eb9ae;VisuMZ[_0x3ed7ef(0x68b)][_0x3ed7ef(0x495)][_0x3ed7ef(0x330)](this);if(Utils['RPGMAKER_VERSION']>=_0x3ed7ef(0x115)){if(_0x3ed7ef(0x437)!==_0x3ed7ef(0x57b)){if(typeof nw===_0x3ed7ef(0x70f))nw[_0x3ed7ef(0x887)][_0x3ed7ef(0x10c)]();}else return'';}},(_0x2bb736=>{const _0x36a53d=_0x9eb9ae,_0x605ac1=_0x2bb736[_0x36a53d(0x1e8)];for(const _0x33a1a5 of dependencies){if('kvdcc'===_0x36a53d(0x2ba)){const _0x1eebad=_0x36a53d(0x7e8);this[_0x36a53d(0x3d6)]=this[_0x36a53d(0x3d6)]||{};if(this[_0x36a53d(0x3d6)][_0x1eebad])return this[_0x36a53d(0x3d6)][_0x1eebad];const _0xc0bc5a=_0xcddfd8[_0x36a53d(0x68b)]['Settings'][_0x36a53d(0x867)][_0x36a53d(0x5e9)];return this[_0x36a53d(0x4ea)](_0x1eebad,_0xc0bc5a);}else{if(!Imported[_0x33a1a5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x36a53d(0x468)](_0x605ac1,_0x33a1a5)),SceneManager[_0x36a53d(0x12d)]();break;}}}const _0x3a6fd8=_0x2bb736[_0x36a53d(0x241)];if(_0x3a6fd8['match'](/\[Version[ ](.*?)\]/i)){if(_0x36a53d(0x2db)!=='rhgTA')return _0x4959ae[_0x36a53d(0x2d8)]['ListRect'][_0x36a53d(0x330)](this);else{const _0x51e72e=Number(RegExp['$1']);if(_0x51e72e!==VisuMZ[label][_0x36a53d(0x311)]){if(_0x36a53d(0x5e0)==='rsZHy')alert(_0x36a53d(0xfa)[_0x36a53d(0x468)](_0x605ac1,_0x51e72e)),SceneManager[_0x36a53d(0x12d)]();else{const _0x4057d0=_0x36a53d(0x6fa);this[_0x36a53d(0x3d6)]=this[_0x36a53d(0x3d6)]||{};if(this[_0x36a53d(0x3d6)][_0x4057d0])return this[_0x36a53d(0x3d6)][_0x4057d0];const _0x961fd5=_0x3d00b0[_0x36a53d(0x68b)]['Settings']['Color']['ColorCTGauge2'];return this[_0x36a53d(0x4ea)](_0x4057d0,_0x961fd5);}}}}if(_0x3a6fd8[_0x36a53d(0x6f5)](/\[Tier[ ](\d+)\]/i)){if(_0x36a53d(0x589)===_0x36a53d(0x589)){const _0x242417=Number(RegExp['$1']);_0x242417<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x36a53d(0x468)](_0x605ac1,_0x242417,tier)),SceneManager['exit']()):tier=Math[_0x36a53d(0x713)](_0x242417,tier);}else for(const _0x1589f4 of _0x54b1e4['_commandList']){if(_0x1589f4[_0x36a53d(0x60e)][_0x36a53d(0x330)](this)){const _0x211981=_0x1589f4[_0x36a53d(0x646)];let _0x1036c6=_0x1589f4[_0x36a53d(0x45d)];if(['','Untitled'][_0x36a53d(0x111)](_0x1036c6))_0x1036c6=_0x1589f4['TextJS'][_0x36a53d(0x330)](this);const _0x440873=_0x1589f4[_0x36a53d(0x715)][_0x36a53d(0x330)](this),_0x6a2153=_0x1589f4[_0x36a53d(0x1fd)]['call'](this);this[_0x36a53d(0x39a)](_0x1036c6,_0x211981,_0x440873,_0x6a2153),this[_0x36a53d(0x38a)](_0x211981,_0x1589f4[_0x36a53d(0x1c3)][_0x36a53d(0x3c8)](this,_0x6a2153));}}}VisuMZ[_0x36a53d(0x259)](VisuMZ[label][_0x36a53d(0x1dc)],_0x2bb736[_0x36a53d(0x644)]);})(pluginData),((()=>{const _0x374ed9=_0x9eb9ae;if(VisuMZ[_0x374ed9(0x68b)][_0x374ed9(0x1dc)][_0x374ed9(0x2c7)][_0x374ed9(0x401)]??!![])for(const _0x143e6d in $plugins){const _0x543d55=$plugins[_0x143e6d];_0x543d55[_0x374ed9(0x1e8)][_0x374ed9(0x6f5)](/(.*)\/(.*)/i)&&(_0x543d55['name']=String(RegExp['$2'][_0x374ed9(0x81c)]()));}})()),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x4ca),_0x11fe32=>{const _0x152ce4=_0x9eb9ae;if(!SceneManager[_0x152ce4(0x584)])return;if(!SceneManager[_0x152ce4(0x584)]['_spriteset'])return;VisuMZ['ConvertParams'](_0x11fe32,_0x11fe32);const _0x3c33f7=Math[_0x152ce4(0x74b)](_0x11fe32[_0x152ce4(0x7d1)]),_0x2f404=Math[_0x152ce4(0x74b)](_0x11fe32[_0x152ce4(0x7b9)]);$gameTemp[_0x152ce4(0x4ab)](_0x3c33f7,_0x2f404,_0x11fe32[_0x152ce4(0x5c5)],_0x11fe32['Mirror'],_0x11fe32[_0x152ce4(0x266)]);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x3d1),_0x13bd8b=>{const _0x16f5fc=_0x9eb9ae;if(!$gameTemp[_0x16f5fc(0x8e0)]())return;if(!Utils[_0x16f5fc(0x3ee)]())return;SceneManager[_0x16f5fc(0x584)]['_active']=![],VisuMZ[_0x16f5fc(0x68b)][_0x16f5fc(0x70a)]();}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x14a),_0x491127=>{const _0x1c3e53=_0x9eb9ae;if(!$gameTemp[_0x1c3e53(0x8e0)]())return;if(!Utils[_0x1c3e53(0x3ee)]())return;SceneManager[_0x1c3e53(0x584)]['_active']=![],VisuMZ[_0x1c3e53(0x68b)]['ExportStrFromAllTroops']();}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x30d),_0xe6180a=>{const _0x13155d=_0x9eb9ae;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x13155d(0x864)]()<=0x0)return;VisuMZ[_0x13155d(0x259)](_0xe6180a,_0xe6180a);const _0x30d679=_0x13155d(0x714)[_0x13155d(0x468)]($gameMap[_0x13155d(0x864)]()[_0x13155d(0x7b2)](0x3)),_0x329b1a=VisuMZ[_0x13155d(0x68b)][_0x13155d(0x53b)]($gameMap[_0x13155d(0x864)]());VisuMZ['CoreEngine'][_0x13155d(0x3a0)](_0x329b1a,_0x30d679,!![]);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x4ae),_0x480147=>{const _0x1e34ad=_0x9eb9ae;if(!$gameTemp[_0x1e34ad(0x8e0)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x1e34ad(0x2da)]())return;VisuMZ[_0x1e34ad(0x259)](_0x480147,_0x480147);const _0x32b380='Troop%1'[_0x1e34ad(0x468)]($gameTroop[_0x1e34ad(0x4db)][_0x1e34ad(0x7b2)](0x4)),_0x57f114=VisuMZ['CoreEngine'][_0x1e34ad(0x6d1)]($gameTroop[_0x1e34ad(0x4db)]);VisuMZ[_0x1e34ad(0x68b)][_0x1e34ad(0x3a0)](_0x57f114,_0x32b380,!![]);}),VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x3a0)]=function(_0x2572ef,_0x11ba8e,_0x40220a){const _0x5af42f=_0x9eb9ae,_0x522667=require('fs');let _0xc63126=_0x5af42f(0x682)['format'](_0x11ba8e||'0');_0x522667[_0x5af42f(0x3fb)](_0xc63126,_0x2572ef,_0x14babb=>{const _0x321b8e=_0x5af42f;if(_0x321b8e(0x1ea)!==_0x321b8e(0x1ea))this[_0x321b8e(0x303)]=new _0x275cb2['filters'][(_0x321b8e(0x752))](_0x2c21d2=!![]),this['_backgroundSprite']=new _0x289a50(),this[_0x321b8e(0x6c4)]['bitmap']=_0x4d7c2c[_0x321b8e(0x472)](),this[_0x321b8e(0x6c4)][_0x321b8e(0x731)]=[this['_backgroundFilter']],this[_0x321b8e(0xf5)](this[_0x321b8e(0x6c4)]),this['setBackgroundOpacity'](0xc0),this[_0x321b8e(0x432)](this[_0x321b8e(0x44f)]()),this[_0x321b8e(0x787)]();else{if(_0x14babb){if(_0x321b8e(0x476)===_0x321b8e(0x476))throw err;else return 0x1;}else _0x40220a&&(_0x321b8e(0x7a3)===_0x321b8e(0x36c)?(this[_0x321b8e(0x7a2)]['x']=this['applyEasing'](this[_0x321b8e(0x7a2)]['x'],this[_0x321b8e(0x76e)]['x']),this[_0x321b8e(0x7a2)]['y']=this[_0x321b8e(0x65c)](this[_0x321b8e(0x7a2)]['y'],this[_0x321b8e(0x76e)]['y'])):alert(_0x321b8e(0x627)['format'](_0xc63126)));}});},VisuMZ[_0x9eb9ae(0x68b)]['ExportStrFromAllMaps']=function(){const _0x395e36=_0x9eb9ae,_0x5ca2be=[];for(const _0x388fde of $dataMapInfos){if(!_0x388fde)continue;_0x5ca2be[_0x395e36(0x353)](_0x388fde['id']);}const _0x587dc2=_0x5ca2be['length']*0x64+Math[_0x395e36(0x347)](0x64);alert(_0x395e36(0x781)['format'](_0x587dc2)),this[_0x395e36(0x357)]=[],this['_currentMap']=$dataMap;for(const _0xdbd163 of _0x5ca2be){'cPAUG'!==_0x395e36(0x63f)?VisuMZ[_0x395e36(0x68b)][_0x395e36(0x322)](_0xdbd163):_0x1f48d8+=_0x241a8e;}setTimeout(VisuMZ[_0x395e36(0x68b)][_0x395e36(0x5ae)][_0x395e36(0x3c8)](this),_0x587dc2);},VisuMZ[_0x9eb9ae(0x68b)]['loadMapData']=function(_0x5e6159){const _0x3add79=_0x9eb9ae,_0x18b362=_0x3add79(0x716)[_0x3add79(0x468)](_0x5e6159[_0x3add79(0x7b2)](0x3)),_0x418737=new XMLHttpRequest(),_0x177255=_0x3add79(0xfb)+_0x18b362;_0x418737['open'](_0x3add79(0x7dd),_0x177255),_0x418737[_0x3add79(0x499)](_0x3add79(0x27a)),_0x418737[_0x3add79(0x60c)]=()=>this[_0x3add79(0x1a3)](_0x418737,_0x5e6159,_0x18b362,_0x177255),_0x418737[_0x3add79(0x396)]=()=>DataManager['onXhrError'](_0x3add79(0x4a1),_0x18b362,_0x177255),_0x418737[_0x3add79(0x10e)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x1a3)]=function(_0x4d61a2,_0x3de74d,_0x5c31e9,_0x5cd0ea){const _0x435524=_0x9eb9ae;$dataMap=JSON['parse'](_0x4d61a2['responseText']),DataManager[_0x435524(0x1b0)]($dataMap),this['_storedMapText'][_0x3de74d]=VisuMZ[_0x435524(0x68b)][_0x435524(0x53b)](_0x3de74d),$dataMap=this[_0x435524(0x216)];},VisuMZ[_0x9eb9ae(0x68b)]['exportAllMapStrings']=function(){const _0x66beb7=_0x9eb9ae,_0x37f010='AllMaps';this[_0x66beb7(0x357)][_0x66beb7(0x6d2)](undefined)[_0x66beb7(0x6d2)]('')[_0x66beb7(0x6d2)](null);const _0x1bbde1=this[_0x66beb7(0x357)][_0x66beb7(0x6e1)](_0x66beb7(0x531))[_0x66beb7(0x81c)]();VisuMZ['CoreEngine'][_0x66beb7(0x3a0)](_0x1bbde1,_0x37f010,!![]),SceneManager['_scene'][_0x66beb7(0x103)]=!![];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x53b)]=function(_0x1315f2){const _0x23baca=_0x9eb9ae;if(!$dataMap)return'';let _0x3b2310='█'['repeat'](0x46)+'\x0a\x0a',_0x24c3bf='═'[_0x23baca(0x132)](0x46)+'\x0a\x0a',_0x1d24f7='';this['_commonEventLayers']=0x0;for(const _0x26133c of $dataMap[_0x23baca(0x53d)]){if(!_0x26133c)continue;let _0x25fddc=_0x26133c['id'],_0xed7267=_0x26133c['name'],_0x30a39c=_0x26133c[_0x23baca(0x2ad)];for(const _0x46fa2b of _0x30a39c){const _0x1d8804=_0x30a39c[_0x23baca(0x6ae)](_0x46fa2b)+0x1;let _0x1bf034=_0x24c3bf+_0x23baca(0x236),_0x167ebe=VisuMZ[_0x23baca(0x68b)]['ExtractStrFromList'](_0x46fa2b[_0x23baca(0x371)]);if(_0x167ebe[_0x23baca(0x631)]>0x0){if(_0x23baca(0x2e8)!==_0x23baca(0x2e8))return _0x427ded[_0x23baca(0x41a)]['call'](this);else{if(_0x1d24f7['length']>0x0)_0x1d24f7+=_0x24c3bf+_0x23baca(0x531);else{if(_0x23baca(0x344)===_0x23baca(0x344)){const _0x102b81=$dataMapInfos[_0x1315f2]['name'];_0x1d24f7+=_0x3b2310+_0x23baca(0x75b)[_0x23baca(0x468)](_0x1315f2,_0x102b81||'Unnamed')+_0x3b2310;}else return _0x41d757[_0x23baca(0x68b)][_0x23baca(0x1dc)][_0x23baca(0x8f6)][_0x23baca(0x21f)];}_0x1d24f7+=_0x1bf034['format'](_0x25fddc,_0xed7267,_0x1d8804,_0x167ebe);}}}}return _0x1d24f7[_0x23baca(0x631)]>0x0&&(_0x1d24f7+=_0x24c3bf),_0x1d24f7;},VisuMZ[_0x9eb9ae(0x68b)]['ExportStrFromAllTroops']=function(){const _0x590035=_0x9eb9ae,_0xd09f50=$dataTroops['length']*0xa+Math[_0x590035(0x347)](0xa);alert(_0x590035(0x43f)[_0x590035(0x468)](_0xd09f50));const _0xa80d8b=[];for(const _0x54ce7c of $dataTroops){if(!_0x54ce7c)continue;const _0x5d3410=_0x54ce7c['id'];_0xa80d8b[_0x5d3410]=VisuMZ['CoreEngine'][_0x590035(0x6d1)](_0x5d3410);}setTimeout(VisuMZ[_0x590035(0x68b)][_0x590035(0x384)][_0x590035(0x3c8)](this,_0xa80d8b),_0xd09f50);},VisuMZ['CoreEngine']['ExtractStrFromTroop']=function(_0x50d81a){const _0x1497c8=_0x9eb9ae;if(!$dataTroops[_0x50d81a])return'';let _0x1b0b77='█'[_0x1497c8(0x132)](0x46)+'\x0a\x0a',_0x19ae43='═'[_0x1497c8(0x132)](0x46)+'\x0a\x0a',_0x5459fa='';this['_commonEventLayers']=0x0;const _0x4f2c70=$dataTroops[_0x50d81a];let _0x61aba=_0x4f2c70[_0x1497c8(0x2ad)];for(const _0x1d599a of _0x61aba){const _0x3352ae=_0x61aba[_0x1497c8(0x6ae)](_0x1d599a)+0x1;let _0x51e1ab=_0x19ae43+_0x1497c8(0x59a),_0x1752a2=VisuMZ[_0x1497c8(0x68b)]['ExtractStrFromList'](_0x1d599a['list']);if(_0x1752a2[_0x1497c8(0x631)]>0x0){if(_0x1497c8(0x388)!=='GOtsc')return _0x334c5f[_0x1497c8(0x2d8)][_0x1497c8(0x7d7)][_0x1497c8(0x330)](this);else _0x5459fa['length']>0x0?_0x5459fa+=_0x19ae43+_0x1497c8(0x531):_0x5459fa+=_0x1b0b77+_0x1497c8(0x24c)[_0x1497c8(0x468)](_0x50d81a,_0x4f2c70[_0x1497c8(0x1e8)]||_0x1497c8(0x395))+_0x1b0b77,_0x5459fa+=_0x51e1ab[_0x1497c8(0x468)](_0x3352ae,_0x1752a2);}}return _0x5459fa[_0x1497c8(0x631)]>0x0&&(_0x5459fa+=_0x19ae43),_0x5459fa;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x384)]=function(_0x13e9b8){const _0x4678d7=_0x9eb9ae,_0x1a0952='AllTroops';_0x13e9b8['remove'](undefined)[_0x4678d7(0x6d2)]('')[_0x4678d7(0x6d2)](null);const _0x73f00e=_0x13e9b8[_0x4678d7(0x6e1)](_0x4678d7(0x531))[_0x4678d7(0x81c)]();VisuMZ['CoreEngine'][_0x4678d7(0x3a0)](_0x73f00e,_0x1a0952,!![]),SceneManager[_0x4678d7(0x584)][_0x4678d7(0x103)]=!![];},VisuMZ['CoreEngine']['ExtractStrFromList']=function(_0x35f580){const _0x16410a=_0x9eb9ae;let _0x5972d0='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x348e7c='\x0a'+'┄'[_0x16410a(0x132)](0x46)+'\x0a',_0x280e8c='';for(const _0x590c9c of _0x35f580){if(!_0x590c9c)continue;if(_0x590c9c[_0x16410a(0x75c)]===0x65)_0x16410a(0x692)!==_0x16410a(0x778)?(_0x280e8c+=_0x5972d0+'\x0a',_0x280e8c+=_0x16410a(0x77e),_0x590c9c[_0x16410a(0x644)][0x4]!==''&&_0x590c9c[_0x16410a(0x644)][0x4]!==undefined&&(_0x280e8c+=_0x16410a(0x70e)['format'](_0x590c9c[_0x16410a(0x644)][0x4]))):this[_0x16410a(0x6d4)](_0x4a35f5);else{if(_0x590c9c['code']===0x191)_0x280e8c+=_0x16410a(0x47e)[_0x16410a(0x468)](_0x590c9c[_0x16410a(0x644)][0x0]);else{if(_0x590c9c[_0x16410a(0x75c)]===0x192)_0x280e8c+=_0x5972d0,_0x280e8c+='%1〘Choice\x20%2〙\x20%3%1'[_0x16410a(0x468)](_0x348e7c,_0x590c9c['parameters'][0x0]+0x1,_0x590c9c[_0x16410a(0x644)][0x1]);else{if(_0x590c9c[_0x16410a(0x75c)]===0x193)_0x280e8c+=_0x5972d0,_0x280e8c+=_0x16410a(0x124)[_0x16410a(0x468)](_0x348e7c);else{if(_0x590c9c[_0x16410a(0x75c)]===0x194)_0x280e8c+=_0x5972d0,_0x280e8c+=_0x16410a(0x563)['format'](_0x348e7c);else{if(_0x590c9c[_0x16410a(0x75c)]===0x69)_0x16410a(0x3e8)!==_0x16410a(0x3e8)?this['_inputString']+=_0x502d27:(_0x280e8c+=_0x5972d0+'\x0a',_0x280e8c+=_0x16410a(0x7f8));else{if(_0x590c9c[_0x16410a(0x75c)]===0x6c)_0x280e8c+=_0x5972d0+'\x0a',_0x280e8c+=_0x16410a(0x71f)[_0x16410a(0x468)](_0x590c9c['parameters'][0x0]);else{if(_0x590c9c[_0x16410a(0x75c)]===0x198){if(_0x16410a(0x3d7)!=='oNHjf')_0x280e8c+=_0x16410a(0x47e)['format'](_0x590c9c[_0x16410a(0x644)][0x0]);else return _0x1aa4b1[_0x16410a(0x68b)][_0x16410a(0x2a8)][_0x4a427d]==='integer'?_0x102974:_0x271775((_0x383dca*0x64)[_0x16410a(0x666)](_0x1df9f7))+'%';}else{if(_0x590c9c['code']===0x75){const _0x1c7cf1=$dataCommonEvents[_0x590c9c[_0x16410a(0x644)][0x0]];if(_0x1c7cf1&&this[_0x16410a(0x1e7)]<=0xa){if(_0x16410a(0x7cc)!==_0x16410a(0x2cf)){this[_0x16410a(0x1e7)]++;let _0x294f59=VisuMZ[_0x16410a(0x68b)][_0x16410a(0x64e)](_0x1c7cf1[_0x16410a(0x371)]);_0x294f59['length']>0x0&&(_0x280e8c+=_0x5972d0,_0x280e8c+=_0x348e7c,_0x280e8c+=_0x16410a(0x82f)[_0x16410a(0x468)](_0x1c7cf1['id'],_0x1c7cf1[_0x16410a(0x1e8)]),_0x280e8c+=_0x348e7c,_0x280e8c+=_0x294f59,_0x280e8c+=_0x348e7c,_0x280e8c+=_0x16410a(0x834)['format'](_0x1c7cf1['id'],_0x1c7cf1[_0x16410a(0x1e8)]),_0x280e8c+=_0x348e7c),this[_0x16410a(0x1e7)]--;}else _0x1af678+=_0x4acad1(_0x3fc7d9);}}}}}}}}}}}return _0x280e8c['length']>0x0&&(_0x280e8c+=_0x5972d0),_0x280e8c;},PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x415),_0x38cfe9=>{VisuMZ['ConvertParams'](_0x38cfe9,_0x38cfe9);const _0x3f61e3=_0x38cfe9['URL'];VisuMZ['openURL'](_0x3f61e3);}),PluginManager[_0x9eb9ae(0x7af)](pluginData['name'],_0x9eb9ae(0x705),_0x207f71=>{const _0x1c252c=_0x9eb9ae;VisuMZ['ConvertParams'](_0x207f71,_0x207f71);const _0x26a1c1=_0x207f71['value']||0x0;$gameParty[_0x1c252c(0x529)](_0x26a1c1);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x274),_0x302742=>{const _0x3c93b0=_0x9eb9ae;if(!SceneManager[_0x3c93b0(0x26c)]())return;VisuMZ[_0x3c93b0(0x259)](_0x302742,_0x302742);const _0x4c1a6c=_0x302742[_0x3c93b0(0x33e)];SceneManager['_scene'][_0x3c93b0(0x5c3)](_0x4c1a6c);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x855),_0x2b4de5=>{const _0x19efc4=_0x9eb9ae;if(!$gameTemp[_0x19efc4(0x8e0)]())return;if(!Utils[_0x19efc4(0x3ee)]())return;VisuMZ[_0x19efc4(0x259)](_0x2b4de5,_0x2b4de5);const _0x835980=_0x2b4de5['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x835980;}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x2dc),_0x437798=>{const _0x23a0e7=_0x9eb9ae;VisuMZ[_0x23a0e7(0x259)](_0x437798,_0x437798);const _0x3c4c6e=_0x437798[_0x23a0e7(0x5ef)]||0x1,_0x15db69=_0x437798[_0x23a0e7(0x485)]||_0x23a0e7(0x153),_0x3626de=$gameScreen[_0x23a0e7(0x164)](_0x3c4c6e);_0x3626de&&_0x3626de[_0x23a0e7(0x1a2)](_0x15db69);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x643),_0x4be283=>{const _0x415700=_0x9eb9ae;for(let _0x15ed83=0x1;_0x15ed83<=0x64;_0x15ed83++){$gameScreen[_0x415700(0x48f)](_0x15ed83);}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],'PictureEraseRange',_0x16f778=>{const _0xcd901d=_0x9eb9ae;VisuMZ['ConvertParams'](_0x16f778,_0x16f778);const _0x9721fd=Math[_0xcd901d(0x21c)](_0x16f778['StartID'],_0x16f778[_0xcd901d(0x4c4)]),_0x3cd78f=Math[_0xcd901d(0x713)](_0x16f778[_0xcd901d(0x47c)],_0x16f778[_0xcd901d(0x4c4)]);for(let _0x196073=_0x9721fd;_0x196073<=_0x3cd78f;_0x196073++){$gameScreen['erasePicture'](_0x196073);}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x50b),_0x23711c=>{const _0x5dcc81=_0x9eb9ae;VisuMZ[_0x5dcc81(0x259)](_0x23711c,_0x23711c);const _0x21c129=Math[_0x5dcc81(0x74b)](_0x23711c[_0x5dcc81(0x321)])[_0x5dcc81(0x739)](0x1,0x64),_0x46e75d=_0x23711c['Settings'],_0x21d785=_0x46e75d[_0x5dcc81(0x2a9)][_0x5dcc81(0x739)](0x0,0x1),_0x46c3d1=Math[_0x5dcc81(0x74b)](_0x46e75d[_0x5dcc81(0x5ec)]||0x0),_0x7923b2=Math['round'](_0x46e75d[_0x5dcc81(0x921)]||0x0),_0x5f0fd3=Math[_0x5dcc81(0x74b)](_0x46e75d[_0x5dcc81(0x11b)]||0x0),_0x43b4eb=Math[_0x5dcc81(0x74b)](_0x46e75d[_0x5dcc81(0x63e)]||0x0),_0x3b6cd4=Math['round'](_0x46e75d[_0x5dcc81(0x214)])[_0x5dcc81(0x739)](0x0,0xff),_0xf4bdbb=_0x46e75d[_0x5dcc81(0x480)],_0x46645e=_0x5dcc81(0x3f8),_0x5b751e=_0x23711c[_0x5dcc81(0x81d)]?_0x5dcc81(0x81d):_0x5dcc81(0x45b),_0x5ae180=_0x46645e[_0x5dcc81(0x468)](_0x23711c[_0x5dcc81(0x442)],_0x5b751e);$gameScreen[_0x5dcc81(0x1c1)](_0x21c129,_0x5ae180,_0x21d785,_0x46c3d1,_0x7923b2,_0x5f0fd3,_0x43b4eb,_0x3b6cd4,_0xf4bdbb);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x920),_0x18b213=>{const _0x2e57eb=_0x9eb9ae;VisuMZ['ConvertParams'](_0x18b213,_0x18b213);const _0x5658ef=_0x18b213[_0x2e57eb(0x135)]||_0x2e57eb(0x77f),_0x15f194=_0x18b213['Power'][_0x2e57eb(0x739)](0x1,0x9),_0x8636b8=_0x18b213[_0x2e57eb(0x405)][_0x2e57eb(0x739)](0x1,0x9),_0x1aa210=_0x18b213['Duration']||0x1,_0x356aa7=_0x18b213['Wait'];$gameScreen['setCoreEngineScreenShakeStyle'](_0x5658ef),$gameScreen[_0x2e57eb(0x5d2)](_0x15f194,_0x8636b8,_0x1aa210);if(_0x356aa7){if(_0x2e57eb(0x84c)!==_0x2e57eb(0x350)){const _0x336448=$gameTemp['getLastPluginCommandInterpreter']();if(_0x336448)_0x336448['wait'](_0x1aa210);}else for(const _0x558897 of _0x55faff['_commandList']){if(_0x558897[_0x2e57eb(0x60e)][_0x2e57eb(0x330)](this)){const _0x3cdba2=_0x558897[_0x2e57eb(0x646)];let _0x270f43=_0x558897[_0x2e57eb(0x45d)];if(['',_0x2e57eb(0x66e)][_0x2e57eb(0x111)](_0x270f43))_0x270f43=_0x558897[_0x2e57eb(0x773)][_0x2e57eb(0x330)](this);const _0x58dadd=_0x558897[_0x2e57eb(0x715)][_0x2e57eb(0x330)](this),_0x3973b7=_0x558897[_0x2e57eb(0x1fd)][_0x2e57eb(0x330)](this);this[_0x2e57eb(0x39a)](_0x270f43,_0x3cdba2,_0x58dadd,_0x3973b7),this[_0x2e57eb(0x38a)](_0x3cdba2,_0x558897[_0x2e57eb(0x1c3)]['bind'](this,_0x3973b7));}}}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x710),_0x26a3b4=>{const _0x2fe9b4=_0x9eb9ae;VisuMZ[_0x2fe9b4(0x259)](_0x26a3b4,_0x26a3b4);const _0x34f6e8=_0x26a3b4['option']||0x1;$gameSystem[_0x2fe9b4(0x176)](_0x34f6e8);}),PluginManager[_0x9eb9ae(0x7af)](pluginData['name'],_0x9eb9ae(0x52a),_0x129ca4=>{const _0x168d56=_0x9eb9ae;if($gameParty[_0x168d56(0x2da)]())return;VisuMZ[_0x168d56(0x259)](_0x129ca4,_0x129ca4);const _0x1a73cf=_0x129ca4['option'];if(_0x1a73cf[_0x168d56(0x6f5)](/Front/i))$gameSystem['setSideView'](![]);else _0x1a73cf[_0x168d56(0x6f5)](/Side/i)?_0x168d56(0x250)==='eXENV'?(_0x49aca2[_0x168d56(0x889)](),this[_0x168d56(0x7c7)]('keyboard')):$gameSystem['setSideView'](!![]):$gameSystem['setSideView'](!$gameSystem[_0x168d56(0x52d)]());}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x4b1),_0x5970c3=>{const _0xb6e844=_0x9eb9ae;if($gameParty['inBattle']())return;VisuMZ[_0xb6e844(0x259)](_0x5970c3,_0x5970c3);const _0x372f0f=[_0xb6e844(0x7fe),_0xb6e844(0x24b),'me','se'];for(const _0x3c1d7d of _0x372f0f){if(_0xb6e844(0x4bb)===_0xb6e844(0x4f4))for(const _0x17139c of _0x44118a){this['createFauxAnimationSprite']([_0x17139c],_0x31f892,_0x83b50f,_0x36c533,_0x5ca934),_0x4b2631+=_0x3981b6;}else{const _0x46dba6=_0x5970c3[_0x3c1d7d],_0x73398=_0xb6e844(0x209)[_0xb6e844(0x468)](_0x3c1d7d);for(const _0x26f4b4 of _0x46dba6){AudioManager['createBuffer'](_0x73398,_0x26f4b4);}}}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x836),_0x4710b5=>{const _0x5476bf=_0x9eb9ae;if($gameParty[_0x5476bf(0x2da)]())return;VisuMZ[_0x5476bf(0x259)](_0x4710b5,_0x4710b5);const _0x25e35d=['animations',_0x5476bf(0x3f9),_0x5476bf(0x2f4),_0x5476bf(0x37a),_0x5476bf(0x47b),_0x5476bf(0x8fc),_0x5476bf(0x564),'pictures',_0x5476bf(0x6ff),_0x5476bf(0x7e1),_0x5476bf(0x6aa),'tilesets','titles1',_0x5476bf(0x8af)];for(const _0x581708 of _0x25e35d){if(_0x5476bf(0x1fe)==='bghCb'){if(this['_CoreEngineSettings']===_0xda4758)this['initCoreEngine']();if(this[_0x5476bf(0x649)][_0x5476bf(0x3d8)]===_0x3b94dd)this[_0x5476bf(0x535)]();return this[_0x5476bf(0x649)]['Padding'];}else{const _0x1edb24=_0x4710b5[_0x581708],_0x3d8748=_0x5476bf(0x2f7)['format'](_0x581708);for(const _0xe7cfe2 of _0x1edb24){ImageManager['loadBitmap'](_0x3d8748,_0xe7cfe2);}}}}),PluginManager[_0x9eb9ae(0x7af)](pluginData['name'],_0x9eb9ae(0x811),_0x2bb0a1=>{const _0x46059c=_0x9eb9ae;if($gameParty[_0x46059c(0x2da)]())return;VisuMZ[_0x46059c(0x259)](_0x2bb0a1,_0x2bb0a1);const _0xb70f1b=_0x2bb0a1[_0x46059c(0x156)],_0x865e88=(_0x2bb0a1[_0x46059c(0x2cb)]||0x0)/0x64;for(const _0x5dd05e of _0xb70f1b){const _0x473d78=Math[_0x46059c(0x77f)]()<=_0x865e88;$gameSwitches[_0x46059c(0x34f)](_0x5dd05e,_0x473d78);}}),PluginManager[_0x9eb9ae(0x7af)](pluginData['name'],_0x9eb9ae(0x2fe),_0x567c88=>{const _0x29c511=_0x9eb9ae;if($gameParty['inBattle']())return;VisuMZ[_0x29c511(0x259)](_0x567c88,_0x567c88);const _0x2d33ca=Math[_0x29c511(0x21c)](_0x567c88[_0x29c511(0x47c)],_0x567c88[_0x29c511(0x4c4)]),_0x4032f4=Math[_0x29c511(0x713)](_0x567c88[_0x29c511(0x47c)],_0x567c88[_0x29c511(0x4c4)]),_0x18576c=(_0x567c88['Chance']||0x0)/0x64;for(let _0x22ea9a=_0x2d33ca;_0x22ea9a<=_0x4032f4;_0x22ea9a++){const _0x16976c=Math[_0x29c511(0x77f)]()<=_0x18576c;$gameSwitches['setValue'](_0x22ea9a,_0x16976c);}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x509),_0x37da0c=>{const _0x338408=_0x9eb9ae;if($gameParty['inBattle']())return;VisuMZ[_0x338408(0x259)](_0x37da0c,_0x37da0c);const _0x42ccb6=_0x37da0c[_0x338408(0x156)];for(const _0x444584 of _0x42ccb6){if(_0x338408(0x5bf)!==_0x338408(0x5bf))return _0x338408(0x46e);else{const _0x582b55=$gameSwitches['value'](_0x444584);$gameSwitches['setValue'](_0x444584,!_0x582b55);}}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x777),_0x3fa92c=>{const _0x511b8e=_0x9eb9ae;if($gameParty[_0x511b8e(0x2da)]())return;VisuMZ[_0x511b8e(0x259)](_0x3fa92c,_0x3fa92c);const _0x2e747d=Math['min'](_0x3fa92c[_0x511b8e(0x47c)],_0x3fa92c[_0x511b8e(0x4c4)]),_0x535e6c=Math[_0x511b8e(0x713)](_0x3fa92c[_0x511b8e(0x47c)],_0x3fa92c['EndingID']);for(let _0x2364ce=_0x2e747d;_0x2364ce<=_0x535e6c;_0x2364ce++){if('MRnJE'===_0x511b8e(0x18b))this[_0x511b8e(0x877)]=_0xbd35b[_0x511b8e(0x584)]['getButtonAssistLocation']()!==_0x511b8e(0x32e)?0x0:0x8;else{const _0x5c1ac9=$gameSwitches[_0x511b8e(0x3ad)](_0x2364ce);$gameSwitches[_0x511b8e(0x34f)](_0x2364ce,!_0x5c1ac9);}}}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x8c1),_0x335c77=>{const _0x59091d=_0x9eb9ae;if($gameParty[_0x59091d(0x2da)]())return;VisuMZ[_0x59091d(0x259)](_0x335c77,_0x335c77);const _0x21b4eb=_0x335c77[_0x59091d(0x775)][_0x59091d(0x88e)]()[_0x59091d(0x81c)](),_0x5aef6b=VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x21b4eb);$gameSystem[_0x59091d(0x82e)](_0x5aef6b);}),VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x85d)]=function(_0x3902ae){const _0x4d05a6=_0x9eb9ae;_0x3902ae=_0x3902ae||_0x4d05a6(0x1d7),_0x3902ae=String(_0x3902ae)[_0x4d05a6(0x88e)]()[_0x4d05a6(0x81c)]();switch(_0x3902ae){case'DTB':return 0x0;case _0x4d05a6(0x38f):Imported[_0x4d05a6(0x814)]&&(ConfigManager['atbActive']=!![]);return 0x1;case _0x4d05a6(0x7b5):Imported['VisuMZ_1_OptionsCore']&&(_0x4d05a6(0x618)===_0x4d05a6(0x618)?ConfigManager[_0x4d05a6(0x614)]=![]:_0x398116+=_0x31e2c4);return 0x2;case _0x4d05a6(0x26d):if(Imported[_0x4d05a6(0x550)])return _0x4d05a6(0x26d);break;case _0x4d05a6(0x1fc):if(Imported[_0x4d05a6(0x1b1)])return _0x4d05a6(0x1fc);break;case _0x4d05a6(0x46e):if(Imported[_0x4d05a6(0x234)])return'BTB';break;case _0x4d05a6(0x45f):if(Imported[_0x4d05a6(0x8bc)]){if(_0x4d05a6(0x1f1)===_0x4d05a6(0x3ff)){const _0x4765b7=_0x436c19[_0x4d05a6(0x57c)],_0x4de86f=_0x3d6ed3[_0x4d05a6(0x61d)]['lineHeight'](),_0x4075ba=0x0;let _0x4ad7df=0x0;return this[_0x4d05a6(0x8b5)]()==='top'?_0x4ad7df=0x0:_0x4ad7df=_0x462521[_0x4d05a6(0x18a)]-_0x4de86f,new _0x139682(_0x4075ba,_0x4ad7df,_0x4765b7,_0x4de86f);}else return _0x4d05a6(0x45f);}break;case'OTB':if(Imported[_0x4d05a6(0x47f)]){if('ymMnU'!==_0x4d05a6(0x2ab))this['renderNoMask'](_0x3ce652);else return'OTB';}break;case _0x4d05a6(0x5ab):if(Imported['VisuMZ_2_BattleSystemETB'])return _0x4d05a6(0x8c2)===_0x4d05a6(0x79a)?_0x1a33c5[_0x4d05a6(0x68b)]['Settings']['ButtonAssist'][_0x4d05a6(0x6ee)]:_0x4d05a6(0x5ab);break;case _0x4d05a6(0x500):if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x4d05a6(0x3cd)===_0x4d05a6(0x3cd))return _0x4d05a6(0x500);else{if(!_0x9b9852[_0x4d05a6(0x8e0)]())return;if(!_0x48b033[_0x4d05a6(0x3ee)]())return;if(!_0x223288[_0x4d05a6(0x2da)]())return;_0x1e4b4c[_0x4d05a6(0x259)](_0x1ec659,_0x42f409);const _0xb19e9c='Troop%1'['format'](_0x516621[_0x4d05a6(0x4db)]['padZero'](0x4)),_0x3da3d4=_0x5ecb03[_0x4d05a6(0x68b)]['ExtractStrFromTroop'](_0x5e111a[_0x4d05a6(0x4db)]);_0x5acf5a[_0x4d05a6(0x68b)][_0x4d05a6(0x3a0)](_0x3da3d4,_0xb19e9c,!![]);}}break;}return $dataSystem['battleSystem'];},PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x5eb),_0x15461e=>{const _0x2e1e4f=_0x9eb9ae;VisuMZ[_0x2e1e4f(0x259)](_0x15461e,_0x15461e);const _0x5dc9ce=_0x15461e[_0x2e1e4f(0x775)]||0x1;$gameSystem['setWindowPadding'](_0x5dc9ce);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x78a),_0x374c2e=>{const _0x97bd09=_0x9eb9ae;VisuMZ[_0x97bd09(0x259)](_0x374c2e,_0x374c2e);const _0x3a2e32=_0x374c2e['id']||0x1,_0x5134ee=_0x374c2e[_0x97bd09(0x658)],_0x6e9bb6=_0x374c2e[_0x97bd09(0x389)]||0x0;let _0x1bf455=$gameVariables[_0x97bd09(0x3ad)](_0x3a2e32)||0x0;switch(_0x5134ee){case'=':_0x1bf455=_0x6e9bb6;break;case'+':_0x1bf455+=_0x6e9bb6;break;case'-':_0x1bf455-=_0x6e9bb6;break;case'*':_0x1bf455*=_0x6e9bb6;break;case'/':_0x1bf455/=_0x6e9bb6;break;case'%':_0x1bf455%=_0x6e9bb6;break;}_0x1bf455=_0x1bf455||0x0,$gameVariables[_0x97bd09(0x34f)](_0x3a2e32,_0x1bf455);}),PluginManager[_0x9eb9ae(0x7af)](pluginData[_0x9eb9ae(0x1e8)],_0x9eb9ae(0x23e),_0x425e6f=>{const _0x2d15fc=_0x9eb9ae;VisuMZ[_0x2d15fc(0x259)](_0x425e6f,_0x425e6f);const _0x5ac6c7=_0x425e6f['id']()||0x1,_0x547420=_0x425e6f[_0x2d15fc(0x658)],_0x5a7ee4=_0x425e6f[_0x2d15fc(0x389)]()||0x0;let _0x57e9c6=$gameVariables['value'](_0x5ac6c7)||0x0;switch(_0x547420){case'=':_0x57e9c6=_0x5a7ee4;break;case'+':_0x57e9c6+=_0x5a7ee4;break;case'-':_0x57e9c6-=_0x5a7ee4;break;case'*':_0x57e9c6*=_0x5a7ee4;break;case'/':_0x57e9c6/=_0x5a7ee4;break;case'%':_0x57e9c6%=_0x5a7ee4;break;}_0x57e9c6=_0x57e9c6||0x0,$gameVariables['setValue'](_0x5ac6c7,_0x57e9c6);}),VisuMZ['CoreEngine'][_0x9eb9ae(0x49c)]=Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x55b)],Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x55b)]=function(){const _0x30ca69=_0x9eb9ae;VisuMZ[_0x30ca69(0x68b)]['Scene_Boot_onDatabaseLoaded'][_0x30ca69(0x330)](this),this[_0x30ca69(0x596)](),this[_0x30ca69(0x600)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x30ca69(0x171)](),this[_0x30ca69(0x91d)](),VisuMZ['ParseAllNotetags']();},VisuMZ['CoreEngine'][_0x9eb9ae(0x7be)]={},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x596)]=function(){const _0xfc63b1=_0x9eb9ae,_0x1fd102=[_0xfc63b1(0x505),_0xfc63b1(0x7c8),_0xfc63b1(0x6c0),_0xfc63b1(0x4fd),_0xfc63b1(0x25c),_0xfc63b1(0x3c4),_0xfc63b1(0x621),'LUK'],_0x33243c=[_0xfc63b1(0x879),_0xfc63b1(0x1dd),_0xfc63b1(0x48c),_0xfc63b1(0x200),'MEV',_0xfc63b1(0x727),_0xfc63b1(0x201),_0xfc63b1(0x4bf),_0xfc63b1(0x685),'TRG'],_0x1e5aaf=[_0xfc63b1(0x4aa),'GRD',_0xfc63b1(0x5d9),_0xfc63b1(0x2a6),_0xfc63b1(0x1ac),'TCR',_0xfc63b1(0x4fe),_0xfc63b1(0x2b9),_0xfc63b1(0x1b7),_0xfc63b1(0x902)],_0x2a50fb=[_0x1fd102,_0x33243c,_0x1e5aaf],_0x4fb094=[_0xfc63b1(0x91c),_0xfc63b1(0x67d),_0xfc63b1(0x3b6),_0xfc63b1(0x21a),_0xfc63b1(0x351),_0xfc63b1(0x31f),_0xfc63b1(0x661),_0xfc63b1(0x37c),_0xfc63b1(0x552),_0xfc63b1(0x26a)];for(const _0x3d348f of _0x2a50fb){let _0x57ad15='';if(_0x3d348f===_0x1fd102)_0x57ad15='param';if(_0x3d348f===_0x33243c)_0x57ad15=_0xfc63b1(0x3b8);if(_0x3d348f===_0x1e5aaf)_0x57ad15=_0xfc63b1(0x1ee);for(const _0x18cab3 of _0x4fb094){let _0xd0b6ee=_0xfc63b1(0x896)[_0xfc63b1(0x468)](_0x57ad15,_0x18cab3);VisuMZ[_0xfc63b1(0x68b)][_0xfc63b1(0x7be)][_0xd0b6ee]=[],VisuMZ['CoreEngine'][_0xfc63b1(0x7be)][_0xd0b6ee+'JS']=[];let _0x3b7f9a=_0xfc63b1(0x2e0);if([_0xfc63b1(0x91c),_0xfc63b1(0x37c)]['includes'](_0x18cab3))_0xfc63b1(0x51a)===_0xfc63b1(0x5a3)?_0x56c1ba[_0xfc63b1(0x614)]=![]:_0x3b7f9a+=_0xfc63b1(0x2f3);else{if([_0xfc63b1(0x67d),'Flat1'][_0xfc63b1(0x111)](_0x18cab3))_0x3b7f9a+=_0xfc63b1(0x6ef);else{if(['Plus2',_0xfc63b1(0x26a)][_0xfc63b1(0x111)](_0x18cab3))_0x3b7f9a+='([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>';else{if(_0x18cab3==='Max')'eBCED'!=='QBsNw'?_0x3b7f9a+=_0xfc63b1(0x487):(_0x78d398[_0xfc63b1(0x68b)][_0xfc63b1(0x356)]['call'](this),this[_0xfc63b1(0x66a)]());else{if(_0x18cab3===_0xfc63b1(0x31f))_0x3b7f9a+=_0xfc63b1(0x5a9);else _0x18cab3===_0xfc63b1(0x661)&&(_0x3b7f9a+=_0xfc63b1(0x64a));}}}}for(const _0x2b4fc3 of _0x3d348f){let _0x42dbe2=_0x18cab3[_0xfc63b1(0x8da)](/[\d+]/g,'')[_0xfc63b1(0x88e)]();const _0x1c5d15=_0x3b7f9a[_0xfc63b1(0x468)](_0x2b4fc3,_0x42dbe2);VisuMZ[_0xfc63b1(0x68b)]['RegExp'][_0xd0b6ee][_0xfc63b1(0x353)](new RegExp(_0x1c5d15,'i'));const _0x1b1aff=_0xfc63b1(0x3ce)[_0xfc63b1(0x468)](_0x2b4fc3,_0x42dbe2);VisuMZ[_0xfc63b1(0x68b)]['RegExp'][_0xd0b6ee+'JS']['push'](new RegExp(_0x1b1aff,'i'));}}}},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x600)]=function(){const _0x1b8aba=_0x9eb9ae;if(VisuMZ[_0x1b8aba(0x5c7)])return;},Scene_Boot[_0x9eb9ae(0x61d)]['process_VisuMZ_CoreEngine_Settings']=function(){const _0x49194a=_0x9eb9ae,_0x1fa2c5=VisuMZ[_0x49194a(0x68b)][_0x49194a(0x1dc)];if(_0x1fa2c5[_0x49194a(0x2c7)][_0x49194a(0x623)]){if('RlLgY'!==_0x49194a(0x2de)){if(this[_0x49194a(0x86c)][_0x49194a(0x23a)]())return![];return _0x579d71[_0x49194a(0x68b)][_0x49194a(0x7e0)][_0x49194a(0x330)](this,_0x4eb848);}else VisuMZ[_0x49194a(0x31d)](!![]);}_0x1fa2c5[_0x49194a(0x2c7)]['ModernControls']&&(Input[_0x49194a(0x433)][0x23]='end',Input[_0x49194a(0x433)][0x24]=_0x49194a(0x708));if(_0x1fa2c5['ButtonAssist']){const _0x3af3b9=_0x1fa2c5[_0x49194a(0x452)];_0x3af3b9[_0x49194a(0x5ac)]=_0x3af3b9[_0x49194a(0x5ac)]||_0x49194a(0x298),_0x3af3b9[_0x49194a(0x504)]=_0x3af3b9[_0x49194a(0x504)]||'\x5c}❪TAB❫\x5c{';}if(_0x1fa2c5[_0x49194a(0x57f)][_0x49194a(0x1b6)]){if(_0x49194a(0x8f7)==='IBhSG')Input[_0x49194a(0x433)][0x57]='up',Input[_0x49194a(0x433)][0x41]=_0x49194a(0x5b3),Input['keyMapper'][0x53]=_0x49194a(0x3fe),Input[_0x49194a(0x433)][0x44]=_0x49194a(0x8ea),Input[_0x49194a(0x433)][0x45]=_0x49194a(0x5c9);else return this[_0x49194a(0x6b9)]()&&this[_0x49194a(0x7b4)]<this[_0x49194a(0x662)]*_0xe12dde[_0x49194a(0x68b)][_0x49194a(0x1dc)][_0x49194a(0x5bb)]['CrisisRate'];}_0x1fa2c5[_0x49194a(0x57f)]['DashToggleR']&&(Input[_0x49194a(0x433)][0x52]=_0x49194a(0x247)),_0x1fa2c5[_0x49194a(0x5bb)][_0x49194a(0x6ea)]=_0x1fa2c5['Param'][_0x49194a(0x6ea)][_0x49194a(0xf7)](_0x2069e7=>_0x2069e7[_0x49194a(0x88e)]()['trim']()),_0x1fa2c5['Param'][_0x49194a(0x87e)]=_0x1fa2c5['Param']['ExtDisplayedParams']['map'](_0x298dee=>_0x298dee['toUpperCase']()[_0x49194a(0x81c)]());},Scene_Boot['prototype'][_0x9eb9ae(0x171)]=function(){const _0x3fd36f=_0x9eb9ae;this[_0x3fd36f(0x6f0)]();},Scene_Boot[_0x9eb9ae(0x61d)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0xf122fa=_0x9eb9ae,_0x42ad48=VisuMZ['CoreEngine'][_0xf122fa(0x1dc)][_0xf122fa(0x19c)];for(const _0x4435e8 of _0x42ad48){const _0x5eb023=_0x4435e8[_0xf122fa(0x7eb)][_0xf122fa(0x8da)](/[ ]/g,''),_0x467060=_0x4435e8[_0xf122fa(0x8d8)];VisuMZ[_0xf122fa(0x68b)][_0xf122fa(0x86f)](_0x5eb023,_0x467060);}},VisuMZ['CoreEngine'][_0x9eb9ae(0x86f)]=function(_0x3270a0,_0x1996ef){const _0x43c36e=_0x9eb9ae;if(!!window[_0x3270a0]){if($gameTemp[_0x43c36e(0x8e0)]())console[_0x43c36e(0x517)](_0x43c36e(0x88d)[_0x43c36e(0x468)](_0x3270a0));}const _0x778f2=_0x43c36e(0x4dc)[_0x43c36e(0x468)](_0x3270a0,_0x1996ef);window[_0x3270a0]=new Function(_0x778f2);},Scene_Boot[_0x9eb9ae(0x61d)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x3b582c=_0x9eb9ae,_0x13f79f=VisuMZ[_0x3b582c(0x68b)][_0x3b582c(0x1dc)][_0x3b582c(0x2fc)];if(!_0x13f79f)return;for(const _0x20b56f of _0x13f79f){if(_0x3b582c(0x2ef)===_0x3b582c(0x2ef)){if(!_0x20b56f)continue;VisuMZ[_0x3b582c(0x68b)][_0x3b582c(0x541)](_0x20b56f);}else _0x428d05[_0x3b582c(0x68b)][_0x3b582c(0x85b)][_0x3b582c(0x330)](this,_0x4fe501);}},VisuMZ['CoreEngine'][_0x9eb9ae(0x598)]={},VisuMZ[_0x9eb9ae(0x68b)]['CustomParamIcons']={},VisuMZ[_0x9eb9ae(0x68b)]['CustomParamType']={},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x5aa)]={},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x541)]=function(_0x1a1c16){const _0x5306b9=_0x9eb9ae,_0x36dd46=_0x1a1c16[_0x5306b9(0x158)],_0x50e691=_0x1a1c16[_0x5306b9(0x5c8)],_0x43ff77=_0x1a1c16[_0x5306b9(0x106)],_0x4ee816=_0x1a1c16[_0x5306b9(0x135)],_0x5aa412=new Function(_0x1a1c16[_0x5306b9(0x4f0)]);VisuMZ[_0x5306b9(0x68b)][_0x5306b9(0x598)][_0x36dd46[_0x5306b9(0x88e)]()[_0x5306b9(0x81c)]()]=_0x50e691,VisuMZ[_0x5306b9(0x68b)][_0x5306b9(0x8de)][_0x36dd46['toUpperCase']()[_0x5306b9(0x81c)]()]=_0x43ff77,VisuMZ[_0x5306b9(0x68b)][_0x5306b9(0x2a8)][_0x36dd46[_0x5306b9(0x88e)]()[_0x5306b9(0x81c)]()]=_0x4ee816,VisuMZ[_0x5306b9(0x68b)][_0x5306b9(0x5aa)][_0x36dd46[_0x5306b9(0x88e)]()[_0x5306b9(0x81c)]()]=_0x36dd46,Object[_0x5306b9(0x375)](Game_BattlerBase['prototype'],_0x36dd46,{'get'(){const _0x365b57=_0x5306b9,_0x34cdb2=_0x5aa412['call'](this);return _0x4ee816==='integer'?Math[_0x365b57(0x74b)](_0x34cdb2):_0x34cdb2;}});},VisuMZ[_0x9eb9ae(0x5c7)]=function(){const _0x3dd4f1=_0x9eb9ae;for(const _0x101a12 of $dataActors){if('Bfwio'===_0x3dd4f1(0x6cf)){if(_0x101a12)VisuMZ[_0x3dd4f1(0x235)](_0x101a12);}else return _0x1deeb6;}for(const _0x1da934 of $dataClasses){if(_0x1da934)VisuMZ[_0x3dd4f1(0x3ef)](_0x1da934);}for(const _0x90c91c of $dataSkills){if(_0x3dd4f1(0x34a)!=='ofucS')return _0x19ee9e[_0x3dd4f1(0x68b)]['Game_Action_itemHit'][_0x3dd4f1(0x330)](this,_0x44aa7f);else{if(_0x90c91c)VisuMZ[_0x3dd4f1(0x805)](_0x90c91c);}}for(const _0x3cce5d of $dataItems){if(_0x3dd4f1(0x540)!==_0x3dd4f1(0x57d)){if(_0x3cce5d)VisuMZ[_0x3dd4f1(0x647)](_0x3cce5d);}else{_0x5ec2aa[_0x3dd4f1(0x6f7)]!==0x0?(_0x5036f7[_0x3dd4f1(0x3f5)]=0x0,_0xd028a1[_0x3dd4f1(0x7b1)]=0x0,_0x295314[_0x3dd4f1(0x1b9)]=0x0,_0x52dbd7[_0x3dd4f1(0x6f7)]=0x0):(_0x3170e3[_0x3dd4f1(0x3f5)]=0x64,_0x268af2[_0x3dd4f1(0x7b1)]=0x64,_0x375aa3['meVolume']=0x64,_0x1a8dda[_0x3dd4f1(0x6f7)]=0x64);_0x970ea2['save']();if(this[_0x3dd4f1(0x584)]['constructor']===_0x4e65c7){if(this[_0x3dd4f1(0x584)][_0x3dd4f1(0x8ce)])this['_scene'][_0x3dd4f1(0x8ce)][_0x3dd4f1(0x87f)]();if(this[_0x3dd4f1(0x584)]['_listWindow'])this['_scene'][_0x3dd4f1(0x749)][_0x3dd4f1(0x87f)]();}}}for(const _0x2a6266 of $dataWeapons){if(_0x3dd4f1(0x6bf)!=='hicUc')this['processCursorMoveModernControls'](),this[_0x3dd4f1(0x191)]();else{if(_0x2a6266)VisuMZ[_0x3dd4f1(0x249)](_0x2a6266);}}for(const _0x1d610b of $dataArmors){if(_0x1d610b)VisuMZ[_0x3dd4f1(0x750)](_0x1d610b);}for(const _0x5eef0c of $dataEnemies){if(_0x5eef0c)VisuMZ['ParseEnemyNotetags'](_0x5eef0c);}for(const _0x7f4205 of $dataStates){if(_0x3dd4f1(0x58d)!=='HasSi'){if(_0x7f4205)VisuMZ[_0x3dd4f1(0x175)](_0x7f4205);}else{_0x2bfdb2['ConvertParams'](_0x5efcab,_0x2d49e1);const _0x138a8b=_0x23f92a[_0x3dd4f1(0x558)];_0x3fe143['openURL'](_0x138a8b);}}for(const _0x1c2e28 of $dataTilesets){if(_0x1c2e28)VisuMZ[_0x3dd4f1(0xfd)](_0x1c2e28);}},VisuMZ[_0x9eb9ae(0x235)]=function(_0x17649f){},VisuMZ[_0x9eb9ae(0x3ef)]=function(_0xded502){},VisuMZ[_0x9eb9ae(0x805)]=function(_0x505767){},VisuMZ[_0x9eb9ae(0x647)]=function(_0xa55846){},VisuMZ[_0x9eb9ae(0x249)]=function(_0xd644e2){},VisuMZ[_0x9eb9ae(0x750)]=function(_0x530cf4){},VisuMZ[_0x9eb9ae(0x3a9)]=function(_0x456712){},VisuMZ[_0x9eb9ae(0x175)]=function(_0x4d7af7){},VisuMZ['ParseTilesetNotetags']=function(_0x1e5f86){},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x235)]=VisuMZ[_0x9eb9ae(0x235)],VisuMZ[_0x9eb9ae(0x235)]=function(_0x301604){const _0x2a1973=_0x9eb9ae;VisuMZ['CoreEngine'][_0x2a1973(0x235)][_0x2a1973(0x330)](this,_0x301604);const _0x1ac8f0=_0x301604[_0x2a1973(0x52c)];if(_0x1ac8f0['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x301604[_0x2a1973(0x210)]=Number(RegExp['$1']);if(_0x301604[_0x2a1973(0x210)]===0x0)_0x301604[_0x2a1973(0x210)]=Number[_0x2a1973(0x331)];}if(_0x1ac8f0['match'](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x2a1973(0x281)===_0x2a1973(0x281))_0x301604[_0x2a1973(0x67e)]=Math[_0x2a1973(0x21c)](Number(RegExp['$1']),_0x301604[_0x2a1973(0x210)]);else return _0x10b4f7;}},VisuMZ[_0x9eb9ae(0x68b)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x26ad83){const _0x45da82=_0x9eb9ae;VisuMZ['CoreEngine'][_0x45da82(0x3ef)][_0x45da82(0x330)](this,_0x26ad83);if(_0x26ad83['learnings'])for(const _0x1686df of _0x26ad83[_0x45da82(0x3c6)]){if(_0x1686df[_0x45da82(0x52c)][_0x45da82(0x6f5)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if('NIJrC'!=='NIJrC')for(const _0x298752 of this[_0x45da82(0x6a5)]){this[_0x45da82(0x4dd)](_0x298752);}else _0x1686df[_0x45da82(0x3a3)]=Math[_0x45da82(0x713)](Number(RegExp['$1']),0x1);}}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x3a9)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x9eb9ae(0x3a9)]=function(_0x237930){const _0x1ebc1a=_0x9eb9ae;VisuMZ[_0x1ebc1a(0x68b)][_0x1ebc1a(0x3a9)][_0x1ebc1a(0x330)](this,_0x237930),_0x237930[_0x1ebc1a(0x3a3)]=0x1;const _0x4ce53d=_0x237930[_0x1ebc1a(0x52c)];if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<LEVEL:[ ](\d+)>/i))_0x237930['level']=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<MAXHP:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x0]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<MAXMP:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x1]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<ATK:[ ](\d+)>/i))_0x237930['params'][0x2]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<DEF:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x3]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<MAT:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x4]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<MDF:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x5]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<AGI:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x6]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<LUK:[ ](\d+)>/i))_0x237930[_0x1ebc1a(0x276)][0x7]=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<EXP:[ ](\d+)>/i))_0x237930['exp']=Number(RegExp['$1']);if(_0x4ce53d[_0x1ebc1a(0x6f5)](/<GOLD:[ ](\d+)>/i))_0x237930['gold']=Number(RegExp['$1']);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x7d5)]=Graphics[_0x9eb9ae(0x700)],Graphics[_0x9eb9ae(0x700)]=function(){const _0x514838=_0x9eb9ae;switch(VisuMZ[_0x514838(0x68b)]['Settings'][_0x514838(0x2c7)][_0x514838(0x308)]){case'stretch':return!![];case _0x514838(0x697):return![];default:return VisuMZ['CoreEngine']['Graphics_defaultStretchMode'][_0x514838(0x330)](this);}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x75e)]=Graphics[_0x9eb9ae(0x7d3)],Graphics[_0x9eb9ae(0x7d3)]=function(_0x51bbf6,_0x1d7efc,_0x488862=null){const _0x4a02f2=_0x9eb9ae;VisuMZ[_0x4a02f2(0x68b)][_0x4a02f2(0x75e)][_0x4a02f2(0x330)](this,_0x51bbf6,_0x1d7efc,_0x488862),VisuMZ[_0x4a02f2(0x31d)](![]);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x33f)]=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x203395){const _0x3bf8a2=_0x9eb9ae;VisuMZ[_0x3bf8a2(0x68b)][_0x3bf8a2(0x33f)]['call'](this,_0x203395),this[_0x3bf8a2(0x364)](_0x203395);},Graphics['_centerElementCoreEngine']=function(_0x13ba2b){const _0x2476e9=_0x9eb9ae;if(VisuMZ['CoreEngine']['Settings'][_0x2476e9(0x2c7)][_0x2476e9(0x706)]){if(_0x2476e9(0x653)===_0x2476e9(0x653))_0x13ba2b[_0x2476e9(0x40d)][_0x2476e9(0x35b)]=_0x2476e9(0x35d);else{if(_0x18d944['CoreEngine']['Settings']['UI'][_0x2476e9(0x4e2)]){const _0x51f156=_0x31f16[_0x2476e9(0x792)]-_0x457abd[_0x2476e9(0x57c)]-_0x58878e[_0x2476e9(0x68b)]['Settings']['UI'][_0x2476e9(0x174)]*0x2,_0x8eecfe=_0x19d1fc['prototype'][_0x2476e9(0x340)][_0x2476e9(0x330)](this)*0x4;if(_0x51f156>=_0x8eecfe)_0x1d70b9[_0x2476e9(0x467)](!![]);}}}VisuMZ[_0x2476e9(0x68b)]['Settings'][_0x2476e9(0x2c7)][_0x2476e9(0x721)]&&(_0x13ba2b[_0x2476e9(0x40d)][_0x2476e9(0x257)]=_0x2476e9(0x51d));const _0x6ca60d=Math[_0x2476e9(0x713)](0x0,Math[_0x2476e9(0x83f)](_0x13ba2b[_0x2476e9(0x792)]*this[_0x2476e9(0x58c)])),_0x3bf06a=Math[_0x2476e9(0x713)](0x0,Math[_0x2476e9(0x83f)](_0x13ba2b[_0x2476e9(0x71d)]*this[_0x2476e9(0x58c)]));_0x13ba2b['style']['width']=_0x6ca60d+'px',_0x13ba2b[_0x2476e9(0x40d)]['height']=_0x3bf06a+'px';},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x3f1)]=Bitmap['prototype'][_0x9eb9ae(0x7d0)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)]=function(_0x20f210,_0x5bf668){const _0x5c1702=_0x9eb9ae;VisuMZ[_0x5c1702(0x68b)]['Bitmap_initialize'][_0x5c1702(0x330)](this,_0x20f210,_0x5bf668),this[_0x5c1702(0x138)]=!(VisuMZ['CoreEngine'][_0x5c1702(0x1dc)]['QoL'][_0x5c1702(0x721)]??!![]);},Bitmap[_0x9eb9ae(0x61d)]['markCoreEngineModified']=function(){this['_customModified']=!![];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1e9)]=Sprite[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1b8)],Sprite[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1b8)]=function(){const _0x3499b0=_0x9eb9ae;VisuMZ[_0x3499b0(0x68b)][_0x3499b0(0x1e9)][_0x3499b0(0x330)](this),this[_0x3499b0(0x6e2)]();},Sprite[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6e2)]=function(){const _0x5dc11c=_0x9eb9ae;if(!this[_0x5dc11c(0x7c9)])return;if(!this['bitmap'][_0x5dc11c(0x702)])return;this[_0x5dc11c(0x7c9)][_0x5dc11c(0x72d)]&&!this[_0x5dc11c(0x3a7)]['_baseTexture'][_0x5dc11c(0x11a)]&&this[_0x5dc11c(0x7c9)][_0x5dc11c(0x1b8)]();},VisuMZ['CoreEngine']['Bitmap_resize']=Bitmap[_0x9eb9ae(0x61d)]['resize'],Bitmap['prototype'][_0x9eb9ae(0x52b)]=function(_0x21ac32,_0x2f9f7b){const _0x29ad01=_0x9eb9ae;VisuMZ['CoreEngine']['Bitmap_resize'][_0x29ad01(0x330)](this,_0x21ac32,_0x2f9f7b),this[_0x29ad01(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x206)]=Bitmap['prototype'][_0x9eb9ae(0x1d4)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1d4)]=function(_0x2d10ef,_0x411d04,_0x8f76fc,_0x52917b,_0x157e38,_0x2c5325,_0x1bddbe,_0x347312,_0x2bb854){const _0x146d57=_0x9eb9ae;_0x411d04=Math['round'](_0x411d04),_0x8f76fc=Math[_0x146d57(0x74b)](_0x8f76fc),_0x52917b=Math[_0x146d57(0x74b)](_0x52917b),_0x157e38=Math[_0x146d57(0x74b)](_0x157e38),_0x2c5325=Math[_0x146d57(0x74b)](_0x2c5325),_0x1bddbe=Math[_0x146d57(0x74b)](_0x1bddbe),VisuMZ['CoreEngine'][_0x146d57(0x206)]['call'](this,_0x2d10ef,_0x411d04,_0x8f76fc,_0x52917b,_0x157e38,_0x2c5325,_0x1bddbe,_0x347312,_0x2bb854),this[_0x146d57(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x217)]=Bitmap['prototype'][_0x9eb9ae(0x5be)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5be)]=function(_0x4f81f5,_0x25376a,_0x2745e0,_0x32684a){const _0x5b0791=_0x9eb9ae;VisuMZ[_0x5b0791(0x68b)][_0x5b0791(0x217)][_0x5b0791(0x330)](this,_0x4f81f5,_0x25376a,_0x2745e0,_0x32684a),this[_0x5b0791(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)]['Bitmap_fillRect']=Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6bd)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6bd)]=function(_0x9bc583,_0x4ccab2,_0x4a9d92,_0x39b2d6,_0x137b6b){const _0x4b3e2a=_0x9eb9ae;VisuMZ[_0x4b3e2a(0x68b)][_0x4b3e2a(0x1ce)][_0x4b3e2a(0x330)](this,_0x9bc583,_0x4ccab2,_0x4a9d92,_0x39b2d6,_0x137b6b),this[_0x4b3e2a(0x8e8)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x90e)]=Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x215)],Bitmap['prototype'][_0x9eb9ae(0x215)]=function(_0x20f4e9,_0x505219,_0x179a91,_0x484fdc,_0x49761b){const _0x1026c4=_0x9eb9ae;VisuMZ[_0x1026c4(0x68b)][_0x1026c4(0x90e)]['call'](this,_0x20f4e9,_0x505219,_0x179a91,_0x484fdc,_0x49761b),this[_0x1026c4(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x7e5)]=Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x134)],Bitmap[_0x9eb9ae(0x61d)]['gradientFillRect']=function(_0xc09274,_0x5d6206,_0x1bfab7,_0x411bf4,_0xbf6489,_0x336e1b,_0x446422){const _0x10adce=_0x9eb9ae;VisuMZ[_0x10adce(0x68b)][_0x10adce(0x7e5)][_0x10adce(0x330)](this,_0xc09274,_0x5d6206,_0x1bfab7,_0x411bf4,_0xbf6489,_0x336e1b,_0x446422),this[_0x10adce(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x6b1)]=Bitmap['prototype'][_0x9eb9ae(0x751)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x751)]=function(_0x3194fb,_0x217b7b,_0x4575ca,_0xc52c2c){const _0x594859=_0x9eb9ae;_0x3194fb=Math[_0x594859(0x74b)](_0x3194fb),_0x217b7b=Math[_0x594859(0x74b)](_0x217b7b),_0x4575ca=Math['round'](_0x4575ca),VisuMZ[_0x594859(0x68b)]['Bitmap_drawCircle'][_0x594859(0x330)](this,_0x3194fb,_0x217b7b,_0x4575ca,_0xc52c2c),this[_0x594859(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x54f)]=Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x149)],Bitmap[_0x9eb9ae(0x61d)]['measureTextWidth']=function(_0x441bc3){const _0x238a33=_0x9eb9ae;return Math[_0x238a33(0x23b)](VisuMZ[_0x238a33(0x68b)]['Bitmap_measureTextWidth'][_0x238a33(0x330)](this,_0x441bc3));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x617)]=Bitmap['prototype']['drawText'],Bitmap[_0x9eb9ae(0x61d)]['drawText']=function(_0x2242eb,_0x450d15,_0x5d92db,_0x40bde9,_0x4ec47a,_0x2f8418){const _0x419090=_0x9eb9ae;_0x450d15=Math[_0x419090(0x74b)](_0x450d15),_0x5d92db=Math[_0x419090(0x74b)](_0x5d92db),_0x40bde9=Math['round'](_0x40bde9),_0x4ec47a=Math[_0x419090(0x74b)](_0x4ec47a),VisuMZ[_0x419090(0x68b)]['Bitmap_drawText']['call'](this,_0x2242eb,_0x450d15,_0x5d92db,_0x40bde9,_0x4ec47a,_0x2f8418),this[_0x419090(0x8e8)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x25d)]=Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6d9)],Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6d9)]=function(_0x768fc2,_0xf30ef8,_0x12847a,_0x5bfa6a){const _0x189f22=_0x9eb9ae;VisuMZ[_0x189f22(0x68b)][_0x189f22(0x1dc)]['QoL']['FontShadows']?this[_0x189f22(0x48a)](_0x768fc2,_0xf30ef8,_0x12847a,_0x5bfa6a):VisuMZ[_0x189f22(0x68b)][_0x189f22(0x25d)][_0x189f22(0x330)](this,_0x768fc2,_0xf30ef8,_0x12847a,_0x5bfa6a);},Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x48a)]=function(_0x15ced3,_0x4015ce,_0x4e495e,_0x1681a1){const _0x565997=_0x9eb9ae,_0x42e328=this[_0x565997(0x55f)];_0x42e328[_0x565997(0x738)]=this['outlineColor'],_0x42e328[_0x565997(0x41c)](_0x15ced3,_0x4015ce+0x2,_0x4e495e+0x2,_0x1681a1);},VisuMZ[_0x9eb9ae(0x68b)]['Input_clear']=Input[_0x9eb9ae(0x889)],Input[_0x9eb9ae(0x889)]=function(){const _0x5cb58f=_0x9eb9ae;VisuMZ[_0x5cb58f(0x68b)][_0x5cb58f(0x510)]['call'](this),this[_0x5cb58f(0x544)]=undefined,this[_0x5cb58f(0x4ff)]=undefined,this[_0x5cb58f(0x5b2)]=Input[_0x5cb58f(0x59f)];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x575)]=Input[_0x9eb9ae(0x1ed)],Input[_0x9eb9ae(0x1ed)]=function(){const _0x50b180=_0x9eb9ae;VisuMZ[_0x50b180(0x68b)][_0x50b180(0x575)][_0x50b180(0x330)](this);if(this[_0x50b180(0x5b2)])this[_0x50b180(0x5b2)]--;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x492)]=Input[_0x9eb9ae(0x83b)],Input['_pollGamepads']=function(){const _0x3c3bfe=_0x9eb9ae;if(this[_0x3c3bfe(0x5b2)])return;VisuMZ[_0x3c3bfe(0x68b)]['Input_pollGamepads'][_0x3c3bfe(0x330)](this);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x306)]=Input['_setupEventHandlers'],Input['_setupEventHandlers']=function(){const _0x2e1a63=_0x9eb9ae;VisuMZ[_0x2e1a63(0x68b)]['Input_setupEventHandlers'][_0x2e1a63(0x330)](this),document['addEventListener'](_0x2e1a63(0x45e),this[_0x2e1a63(0x6b3)][_0x2e1a63(0x3c8)](this));},VisuMZ[_0x9eb9ae(0x68b)]['Input_onKeyDown']=Input[_0x9eb9ae(0x7d6)],Input[_0x9eb9ae(0x7d6)]=function(_0x36ab64){const _0x44bfa8=_0x9eb9ae;this['_inputSpecialKeyCode']=_0x36ab64[_0x44bfa8(0x48d)],VisuMZ[_0x44bfa8(0x68b)]['Input_onKeyDown']['call'](this,_0x36ab64);},Input['_onKeyPress']=function(_0x2db5d7){this['_registerKeyInput'](_0x2db5d7);},Input['_registerKeyInput']=function(_0x2c1063){const _0x472a3f=_0x9eb9ae;this['_inputSpecialKeyCode']=_0x2c1063[_0x472a3f(0x48d)];let _0x63b768=String[_0x472a3f(0x2d6)](_0x2c1063['charCode']);if(this['_inputString']===undefined){if(_0x472a3f(0x453)!==_0x472a3f(0x2e2))this['_inputString']=_0x63b768;else{var _0x50f071=_0x4a4f19(_0x4dc66b['$1'])/0x64;_0x4b97cd*=_0x50f071;}}else{if(_0x472a3f(0x6c3)!==_0x472a3f(0x6c3))return _0x3ef697['actor']()[_0x472a3f(0x901)](_0x1a289c);else this[_0x472a3f(0x544)]+=_0x63b768;}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x560)]=Input[_0x9eb9ae(0x12f)],Input[_0x9eb9ae(0x12f)]=function(_0x588513){const _0x2d5796=_0x9eb9ae;if(_0x588513===0x8)return![];return VisuMZ[_0x2d5796(0x68b)][_0x2d5796(0x560)][_0x2d5796(0x330)](this,_0x588513);},Input['isSpecialCode']=function(_0x3ac07f){const _0x4b7768=_0x9eb9ae;if(_0x3ac07f['match'](/backspace/i))return this[_0x4b7768(0x4ff)]===0x8;if(_0x3ac07f[_0x4b7768(0x6f5)](/enter/i))return this[_0x4b7768(0x4ff)]===0xd;if(_0x3ac07f[_0x4b7768(0x6f5)](/escape/i))return this[_0x4b7768(0x4ff)]===0x1b;},Input[_0x9eb9ae(0x165)]=function(){const _0x5d24f8=_0x9eb9ae;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x5d24f8(0x64c)](this['_inputSpecialKeyCode']);},Input[_0x9eb9ae(0x3ae)]=function(){const _0x4b701a=_0x9eb9ae;return[0x25,0x26,0x27,0x28][_0x4b701a(0x64c)](this[_0x4b701a(0x4ff)]);},Input[_0x9eb9ae(0x3e4)]=function(){const _0x44e6d8=_0x9eb9ae;if(navigator[_0x44e6d8(0x802)]){const _0x10fd3f=navigator['getGamepads']();if(_0x10fd3f)for(const _0xe5b6d0 of _0x10fd3f){if(_0xe5b6d0&&_0xe5b6d0[_0x44e6d8(0x455)])return!![];}}return![];},Input['isGamepadTriggered']=function(){const _0x5c91eb=_0x9eb9ae;if(navigator[_0x5c91eb(0x802)]){const _0x58a7d2=navigator[_0x5c91eb(0x802)]();if(_0x58a7d2)for(const _0x6c6cf8 of _0x58a7d2){if(_0x5c91eb(0x566)!==_0x5c91eb(0x145)){if(_0x6c6cf8&&_0x6c6cf8['connected']){if(_0x5c91eb(0x680)==='pfqnl'){if(this[_0x5c91eb(0x539)](_0x6c6cf8))return!![];}else{const _0x10e680=_0x1dd2ac[_0x508b68][_0x5c91eb(0x1e8)];_0x29fb5f+=_0x107085+_0x5c91eb(0x75b)[_0x5c91eb(0x468)](_0x58ed5a,_0x10e680||_0x5c91eb(0x395))+_0x51c407;}}}else return _0x3b45de[_0x5c91eb(0x18a)]-this[_0x5c91eb(0x8cb)]();}}return![];},Input[_0x9eb9ae(0x539)]=function(_0x50cc86){const _0x502c33=_0x9eb9ae,_0x1dd80a=_0x50cc86[_0x502c33(0x87a)];for(let _0x459be7=0x0;_0x459be7<_0x1dd80a[_0x502c33(0x631)];_0x459be7++){if(_0x502c33(0x65b)==='mnfcI')_0x2b487d*=_0x5c00cc(_0x4318c6);else{if(_0x1dd80a[_0x459be7]['pressed'])return!![];}}return![];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x72e)]=Tilemap['prototype'][_0x9eb9ae(0x5f9)],Tilemap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f9)]=function(_0x75054e,_0xf64cf,_0x1bfe0c,_0x593a41){const _0x448c17=_0x9eb9ae;if($gameMap&&$gameMap[_0x448c17(0x3ac)]())return;VisuMZ[_0x448c17(0x68b)][_0x448c17(0x72e)][_0x448c17(0x330)](this,_0x75054e,_0xf64cf,_0x1bfe0c,_0x593a41);},Tilemap[_0x9eb9ae(0x3ab)][_0x9eb9ae(0x61d)][_0x9eb9ae(0x6db)]=function(){const _0x1ab327=_0x9eb9ae;this['_destroyInternalTextures']();for(let _0x46062b=0x0;_0x46062b<Tilemap[_0x1ab327(0x251)][_0x1ab327(0x3e5)];_0x46062b++){if(_0x1ab327(0x39b)!==_0x1ab327(0x39b))this[_0x1ab327(0x2af)]||this[_0x1ab327(0x3dd)]?this[_0x1ab327(0x245)]=0xff:(this[_0x1ab327(0x245)]+=this[_0x1ab327(0x5fd)]?this[_0x1ab327(0x701)]():-0x1*this[_0x1ab327(0x701)](),this[_0x1ab327(0x245)]=_0x36cdd5[_0x1ab327(0x21c)](0xc0,this[_0x1ab327(0x245)]));else{const _0x224fb1=new PIXI['BaseTexture']();_0x224fb1[_0x1ab327(0x782)](0x800,0x800),VisuMZ[_0x1ab327(0x68b)][_0x1ab327(0x1dc)][_0x1ab327(0x2c7)][_0x1ab327(0x721)]&&(_0x224fb1[_0x1ab327(0x1d9)]=PIXI['SCALE_MODES'][_0x1ab327(0x826)]),this[_0x1ab327(0x3c7)][_0x1ab327(0x353)](_0x224fb1);}}},WindowLayer[_0x9eb9ae(0x61d)][_0x9eb9ae(0x17b)]=function(){const _0x30be2d=_0x9eb9ae;if(SceneManager&&SceneManager[_0x30be2d(0x584)])return SceneManager[_0x30be2d(0x584)]['isWindowMaskingEnabled']();else{if('ZIvll'===_0x30be2d(0x58a))return!![];else{if(_0x354125[_0x30be2d(0x2da)]())return;_0x32fbfe[_0x30be2d(0x259)](_0x5b970,_0x11e7e6);const _0x4f63d7=_0x5c5f13['min'](_0xe2e75d[_0x30be2d(0x47c)],_0x529e79[_0x30be2d(0x4c4)]),_0xc38797=_0x4332e4['max'](_0x537d72['StartID'],_0x2d588f[_0x30be2d(0x4c4)]),_0x237915=(_0x2a68b9[_0x30be2d(0x2cb)]||0x0)/0x64;for(let _0x115e86=_0x4f63d7;_0x115e86<=_0xc38797;_0x115e86++){const _0x3c31f6=_0x2b9891['random']()<=_0x237915;_0x31969c[_0x30be2d(0x34f)](_0x115e86,_0x3c31f6);}}}},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x9eb9ae(0x61d)][_0x9eb9ae(0x280)],WindowLayer[_0x9eb9ae(0x61d)]['render']=function render(_0x3d8e1e){const _0x79654f=_0x9eb9ae;this[_0x79654f(0x17b)]()?VisuMZ['CoreEngine'][_0x79654f(0x85b)]['call'](this,_0x3d8e1e):this['renderNoMask'](_0x3d8e1e);},WindowLayer[_0x9eb9ae(0x61d)][_0x9eb9ae(0x169)]=function render(_0x13b88b){const _0x377dd8=_0x9eb9ae;if(!this[_0x377dd8(0x5fd)])return;const _0xb54ef8=new PIXI['Graphics'](),_0x1be25=_0x13b88b['gl'],_0x2416d8=this[_0x377dd8(0x746)][_0x377dd8(0x812)]();_0x13b88b[_0x377dd8(0x461)][_0x377dd8(0x916)](),_0xb54ef8['transform']=this[_0x377dd8(0x8e2)],_0x13b88b[_0x377dd8(0x3eb)]['flush'](),_0x1be25['enable'](_0x1be25['STENCIL_TEST']);while(_0x2416d8['length']>0x0){const _0x1731a4=_0x2416d8[_0x377dd8(0x5df)]();_0x1731a4[_0x377dd8(0x793)]&&_0x1731a4[_0x377dd8(0x5fd)]&&_0x1731a4[_0x377dd8(0x1b3)]>0x0&&(_0x1be25[_0x377dd8(0x7a1)](_0x1be25['EQUAL'],0x0,~0x0),_0x1be25[_0x377dd8(0x913)](_0x1be25[_0x377dd8(0x475)],_0x1be25['KEEP'],_0x1be25[_0x377dd8(0x475)]),_0x1731a4[_0x377dd8(0x280)](_0x13b88b),_0x13b88b['batch']['flush'](),_0xb54ef8['clear'](),_0x1be25['stencilFunc'](_0x1be25[_0x377dd8(0x6b2)],0x1,~0x0),_0x1be25[_0x377dd8(0x913)](_0x1be25[_0x377dd8(0x914)],_0x1be25[_0x377dd8(0x914)],_0x1be25[_0x377dd8(0x914)]),_0x1be25[_0x377dd8(0x608)](_0x1be25['ZERO'],_0x1be25[_0x377dd8(0x194)]),_0xb54ef8[_0x377dd8(0x280)](_0x13b88b),_0x13b88b['batch'][_0x377dd8(0x89d)](),_0x1be25[_0x377dd8(0x608)](_0x1be25['ONE'],_0x1be25[_0x377dd8(0x62b)]));}_0x1be25[_0x377dd8(0x42a)](_0x1be25[_0x377dd8(0x448)]),_0x1be25[_0x377dd8(0x889)](_0x1be25[_0x377dd8(0x1e1)]),_0x1be25[_0x377dd8(0x512)](0x0),_0x13b88b['batch'][_0x377dd8(0x89d)]();for(const _0xccb203 of this[_0x377dd8(0x746)]){!_0xccb203[_0x377dd8(0x793)]&&_0xccb203['visible']&&_0xccb203[_0x377dd8(0x280)](_0x13b88b);}_0x13b88b[_0x377dd8(0x3eb)][_0x377dd8(0x89d)]();},DataManager['isKeyItem']=function(_0x4a2dc4){const _0x442233=_0x9eb9ae;return this[_0x442233(0x1d8)](_0x4a2dc4)&&_0x4a2dc4['itypeId']===0x2;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x88f)]=DataManager[_0x9eb9ae(0x3e0)],DataManager[_0x9eb9ae(0x3e0)]=function(){const _0x4247bf=_0x9eb9ae;VisuMZ[_0x4247bf(0x68b)]['DataManager_setupNewGame'][_0x4247bf(0x330)](this),this[_0x4247bf(0x33c)](),this[_0x4247bf(0x261)]();},DataManager[_0x9eb9ae(0x33c)]=function(){const _0x59c186=_0x9eb9ae;if($gameTemp[_0x59c186(0x8e0)]()){const _0xb98a74=VisuMZ['CoreEngine'][_0x59c186(0x1dc)][_0x59c186(0x2c7)][_0x59c186(0x677)];if(_0xb98a74>0x0)$gameTemp[_0x59c186(0x8f4)](_0xb98a74);}},DataManager[_0x9eb9ae(0x261)]=function(){const _0x57312b=_0x9eb9ae,_0x48672c=VisuMZ[_0x57312b(0x68b)][_0x57312b(0x1dc)]['QoL'][_0x57312b(0x199)]||0x0;if(_0x48672c>0x0)$gameTemp['reserveCommonEvent'](_0x48672c);},DataManager['createTroopNote']=function(_0x360e01){const _0xb52dc5=_0x9eb9ae,_0x474aed=$dataTroops[_0x360e01];if(!_0x474aed)return'';let _0x59a749='';_0x59a749+=_0x474aed[_0xb52dc5(0x1e8)];for(const _0x36d7ad of _0x474aed[_0xb52dc5(0x2ad)]){for(const _0xa96bea of _0x36d7ad[_0xb52dc5(0x371)]){[0x6c,0x198][_0xb52dc5(0x111)](_0xa96bea[_0xb52dc5(0x75c)])&&(_0x59a749+='\x0a',_0x59a749+=_0xa96bea['parameters'][0x0]);}}return _0x59a749;};(VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)]['QoL'][_0x9eb9ae(0x28e)]??!![])&&($scene=null,VisuMZ[_0x9eb9ae(0x68b)]['Scene_Base_create']=Scene_Base[_0x9eb9ae(0x61d)]['create'],Scene_Base[_0x9eb9ae(0x61d)]['create']=function(){const _0x266f90=_0x9eb9ae;VisuMZ[_0x266f90(0x68b)][_0x266f90(0x857)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x8ff)]=Scene_Map['prototype'][_0x9eb9ae(0x7c5)],Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)]=function(){const _0x2e49c0=_0x9eb9ae;VisuMZ[_0x2e49c0(0x68b)][_0x2e49c0(0x8ff)][_0x2e49c0(0x330)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x69e)]=Scene_Battle[_0x9eb9ae(0x61d)]['createSpriteset'],Scene_Battle['prototype'][_0x9eb9ae(0x7c5)]=function(){const _0x36ce8d=_0x9eb9ae;VisuMZ[_0x36ce8d(0x68b)][_0x36ce8d(0x69e)][_0x36ce8d(0x330)](this),$spriteset=this[_0x36ce8d(0x7e4)];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x79c)]=Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cc)],Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cc)]=function(){const _0x3bae03=_0x9eb9ae;VisuMZ['CoreEngine'][_0x3bae03(0x79c)][_0x3bae03(0x330)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x18e)]=BattleManager['update'],BattleManager[_0x9eb9ae(0x1ed)]=function(_0x312bf0){const _0x5f58fb=_0x9eb9ae;VisuMZ[_0x5f58fb(0x68b)][_0x5f58fb(0x18e)][_0x5f58fb(0x330)](this,_0x312bf0),$subject=this[_0x5f58fb(0x63a)],$targets=this[_0x5f58fb(0x399)],$target=this[_0x5f58fb(0x4bd)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x9eb9ae(0x68b)]['Game_Event_start']=Game_Event[_0x9eb9ae(0x61d)][_0x9eb9ae(0x406)],Game_Event[_0x9eb9ae(0x61d)][_0x9eb9ae(0x406)]=function(){const _0x441be8=_0x9eb9ae;VisuMZ[_0x441be8(0x68b)][_0x441be8(0x76b)][_0x441be8(0x330)](this),$event=this;},VisuMZ['CoreEngine'][_0x9eb9ae(0x3b2)]=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ed)],Scene_Map['prototype'][_0x9eb9ae(0x1ed)]=function(){const _0x5c36be=_0x9eb9ae;VisuMZ['CoreEngine'][_0x5c36be(0x3b2)][_0x5c36be(0x330)](this),$gameMap['updateCurrentEvent']();},Game_Map['prototype'][_0x9eb9ae(0x2eb)]=function(){const _0x3acc0d=_0x9eb9ae;!this[_0x3acc0d(0x1e2)]()&&$event!==null&&(_0x3acc0d(0x275)!==_0x3acc0d(0x42c)?$event=null:_0x56e05b[_0x3acc0d(0x577)](_0x3acc0d(0x247))&&(_0x1ab41a[_0x3acc0d(0x881)]=!_0x53fdaa[_0x3acc0d(0x881)],_0x326bfa[_0x3acc0d(0x1f3)]()));},$commonEvent=function(_0x303577){const _0x544578=_0x9eb9ae;if($gameTemp)$gameTemp[_0x544578(0x8f4)](_0x303577);},$onceParallel=function(_0x2cb1a2){const _0x20017d=_0x9eb9ae;if(SceneManager[_0x20017d(0x26c)]()){if(_0x20017d(0x1eb)===_0x20017d(0x8c8)){this[_0x20017d(0x538)]();const _0x3de893=this[_0x20017d(0x22d)];_0x59bd08[_0x20017d(0x68b)][_0x20017d(0x29d)][_0x20017d(0x330)](this),_0x3de893>0x0&&this['_duration']<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x20017d(0x6e8)],this[_0x20017d(0x6ad)]=this['_targetScaleX'],this[_0x20017d(0x240)]=this[_0x20017d(0x16a)],this[_0x20017d(0x6fd)]=this[_0x20017d(0x3a5)],this['_anchor']&&(this[_0x20017d(0x7a2)]['x']=this[_0x20017d(0x76e)]['x'],this[_0x20017d(0x7a2)]['y']=this['_targetAnchor']['y']));}else $scene['playOnceParallelInterpreter'](_0x2cb1a2);}else{if(SceneManager[_0x20017d(0x85c)]()){if(Imported[_0x20017d(0x182)])$scene[_0x20017d(0x5c3)](_0x2cb1a2);else $gameTemp&&$gameTemp[_0x20017d(0x8e0)]()&&alert(_0x20017d(0x860));}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x20017d(0x15d));}});;StorageManager['jsonToZip']=function(_0x4a6060){return new Promise((_0x493bdf,_0x43e052)=>{const _0x262bd6=_0x5067;try{const _0x17bc6a=pako[_0x262bd6(0x655)](_0x4a6060,{'to':_0x262bd6(0x1d2),'level':0x1});if(_0x17bc6a[_0x262bd6(0x631)]>=0xc350){}_0x493bdf(_0x17bc6a);}catch(_0x41692d){_0x43e052(_0x41692d);}});},TextManager[_0x9eb9ae(0x1e4)]=['','','',_0x9eb9ae(0x743),'','',_0x9eb9ae(0x8e3),'','BACKSPACE',_0x9eb9ae(0x5d7),'','','CLEAR','ENTER',_0x9eb9ae(0x794),'',_0x9eb9ae(0x55d),'CTRL',_0x9eb9ae(0x5c1),_0x9eb9ae(0x587),_0x9eb9ae(0x458),_0x9eb9ae(0x725),_0x9eb9ae(0x25b),_0x9eb9ae(0x62a),_0x9eb9ae(0x62f),_0x9eb9ae(0x15e),'',_0x9eb9ae(0x8e4),_0x9eb9ae(0x843),'NONCONVERT',_0x9eb9ae(0x7e3),_0x9eb9ae(0x5f3),_0x9eb9ae(0x4e5),'PGUP',_0x9eb9ae(0x730),'END',_0x9eb9ae(0x479),_0x9eb9ae(0x545),'UP',_0x9eb9ae(0x893),_0x9eb9ae(0x833),'SELECT','PRINT','EXECUTE',_0x9eb9ae(0x5cb),_0x9eb9ae(0x212),_0x9eb9ae(0x780),'','0','1','2','3','4','5','6','7','8','9',_0x9eb9ae(0x590),'SEMICOLON','LESS_THAN','EQUALS',_0x9eb9ae(0x77b),_0x9eb9ae(0x141),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x9eb9ae(0x611),'',_0x9eb9ae(0x806),'',_0x9eb9ae(0x154),'NUMPAD0',_0x9eb9ae(0x10b),_0x9eb9ae(0x219),'NUMPAD3',_0x9eb9ae(0x652),'NUMPAD5','NUMPAD6','NUMPAD7',_0x9eb9ae(0x513),'NUMPAD9',_0x9eb9ae(0x4de),_0x9eb9ae(0x1f8),_0x9eb9ae(0x2c0),_0x9eb9ae(0x7f9),'DECIMAL',_0x9eb9ae(0x32b),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x9eb9ae(0x76f),_0x9eb9ae(0x86b),_0x9eb9ae(0x8a4),'F14','F15',_0x9eb9ae(0x8c5),_0x9eb9ae(0x417),'F18',_0x9eb9ae(0x4ad),_0x9eb9ae(0x27d),_0x9eb9ae(0x309),_0x9eb9ae(0x361),_0x9eb9ae(0x35c),_0x9eb9ae(0x3e9),'','','','','','','','',_0x9eb9ae(0x69f),'SCROLL_LOCK',_0x9eb9ae(0x413),_0x9eb9ae(0x26b),'WIN_OEM_FJ_TOUROKU',_0x9eb9ae(0x304),_0x9eb9ae(0x8e9),'','','','','','','','','',_0x9eb9ae(0x2ed),_0x9eb9ae(0x213),_0x9eb9ae(0x148),_0x9eb9ae(0x3c2),'DOLLAR',_0x9eb9ae(0x69d),_0x9eb9ae(0x13f),_0x9eb9ae(0x81b),_0x9eb9ae(0x477),_0x9eb9ae(0x7d2),_0x9eb9ae(0x5b5),'PLUS',_0x9eb9ae(0x299),_0x9eb9ae(0x76a),_0x9eb9ae(0x117),_0x9eb9ae(0x1be),_0x9eb9ae(0x316),'','','','','VOLUME_MUTE',_0x9eb9ae(0x1ba),_0x9eb9ae(0x911),'','','SEMICOLON',_0x9eb9ae(0x128),_0x9eb9ae(0x16b),_0x9eb9ae(0x607),'PERIOD','SLASH','BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','','OPEN_BRACKET',_0x9eb9ae(0x387),'CLOSE_BRACKET','QUOTE','',_0x9eb9ae(0x6fe),_0x9eb9ae(0x15c),'',_0x9eb9ae(0x4f5),_0x9eb9ae(0x7bd),'','WIN_ICO_CLEAR','','',_0x9eb9ae(0x4bc),'WIN_OEM_JUMP',_0x9eb9ae(0x7fb),_0x9eb9ae(0x4a8),_0x9eb9ae(0x91b),_0x9eb9ae(0x1de),_0x9eb9ae(0x5d4),_0x9eb9ae(0x15a),_0x9eb9ae(0x1d6),_0x9eb9ae(0x40f),_0x9eb9ae(0x5a4),_0x9eb9ae(0x483),_0x9eb9ae(0x532),'ATTN',_0x9eb9ae(0x7a0),'EXSEL',_0x9eb9ae(0x68a),_0x9eb9ae(0x53f),'ZOOM','',_0x9eb9ae(0x2f5),_0x9eb9ae(0x372),''],TextManager[_0x9eb9ae(0x7da)]=VisuMZ['CoreEngine'][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x452)][_0x9eb9ae(0x58e)],TextManager['buttonAssistCancel']=VisuMZ[_0x9eb9ae(0x68b)]['Settings']['ButtonAssist']['CancelText'],TextManager[_0x9eb9ae(0x4ac)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x452)][_0x9eb9ae(0x891)],VisuMZ[_0x9eb9ae(0x68b)]['TextManager_param']=TextManager['param'],TextManager[_0x9eb9ae(0x28b)]=function(_0x54e256){const _0x5a5e0d=_0x9eb9ae;return typeof _0x54e256===_0x5a5e0d(0x609)?VisuMZ[_0x5a5e0d(0x68b)][_0x5a5e0d(0x898)]['call'](this,_0x54e256):this[_0x5a5e0d(0x6e3)](_0x54e256);},TextManager[_0x9eb9ae(0x6e3)]=function(_0x48e050){const _0x4700d4=_0x9eb9ae;_0x48e050=String(_0x48e050||'')[_0x4700d4(0x88e)]();const _0x1b0628=VisuMZ[_0x4700d4(0x68b)]['Settings'][_0x4700d4(0x5bb)];if(_0x48e050===_0x4700d4(0x505))return $dataSystem[_0x4700d4(0x2fb)]['params'][0x0];if(_0x48e050==='MAXMP')return $dataSystem['terms'][_0x4700d4(0x276)][0x1];if(_0x48e050===_0x4700d4(0x6c0))return $dataSystem[_0x4700d4(0x2fb)][_0x4700d4(0x276)][0x2];if(_0x48e050===_0x4700d4(0x4fd))return $dataSystem[_0x4700d4(0x2fb)]['params'][0x3];if(_0x48e050===_0x4700d4(0x25c))return $dataSystem[_0x4700d4(0x2fb)]['params'][0x4];if(_0x48e050==='MDF')return $dataSystem['terms'][_0x4700d4(0x276)][0x5];if(_0x48e050===_0x4700d4(0x621))return $dataSystem[_0x4700d4(0x2fb)][_0x4700d4(0x276)][0x6];if(_0x48e050===_0x4700d4(0x78f))return $dataSystem['terms'][_0x4700d4(0x276)][0x7];if(_0x48e050===_0x4700d4(0x879))return _0x1b0628[_0x4700d4(0x5e5)];if(_0x48e050===_0x4700d4(0x1dd))return _0x1b0628[_0x4700d4(0x850)];if(_0x48e050==='CRI')return _0x1b0628['XParamVocab2'];if(_0x48e050==='CEV')return _0x1b0628[_0x4700d4(0x48b)];if(_0x48e050===_0x4700d4(0x897))return _0x1b0628['XParamVocab4'];if(_0x48e050===_0x4700d4(0x727))return _0x1b0628[_0x4700d4(0x4e1)];if(_0x48e050===_0x4700d4(0x201))return _0x1b0628[_0x4700d4(0x166)];if(_0x48e050===_0x4700d4(0x4bf))return _0x1b0628[_0x4700d4(0x37f)];if(_0x48e050==='MRG')return _0x1b0628[_0x4700d4(0x6f3)];if(_0x48e050===_0x4700d4(0x883))return _0x1b0628['XParamVocab9'];if(_0x48e050===_0x4700d4(0x4aa))return _0x1b0628['SParamVocab0'];if(_0x48e050==='GRD')return _0x1b0628[_0x4700d4(0x5b9)];if(_0x48e050==='REC')return _0x1b0628[_0x4700d4(0x4f2)];if(_0x48e050===_0x4700d4(0x2a6))return _0x1b0628[_0x4700d4(0x4d9)];if(_0x48e050===_0x4700d4(0x1ac))return _0x1b0628[_0x4700d4(0x5f7)];if(_0x48e050===_0x4700d4(0x5cd))return _0x1b0628[_0x4700d4(0x888)];if(_0x48e050==='PDR')return _0x1b0628[_0x4700d4(0x567)];if(_0x48e050===_0x4700d4(0x2b9))return _0x1b0628[_0x4700d4(0x8b9)];if(_0x48e050==='FDR')return _0x1b0628[_0x4700d4(0x328)];if(_0x48e050===_0x4700d4(0x902))return _0x1b0628[_0x4700d4(0x737)];if(VisuMZ[_0x4700d4(0x68b)][_0x4700d4(0x598)][_0x48e050])return VisuMZ[_0x4700d4(0x68b)][_0x4700d4(0x598)][_0x48e050];return'';},TextManager[_0x9eb9ae(0x3ed)]=function(_0x1120d0){const _0x34b474=_0x9eb9ae;if(_0x1120d0===_0x34b474(0x118))_0x1120d0=_0x34b474(0x694);let _0x13ac00=[];for(let _0x32ca78 in Input[_0x34b474(0x433)]){_0x32ca78=Number(_0x32ca78);if(_0x32ca78>=0x60&&_0x32ca78<=0x69)continue;if([0x12,0x20][_0x34b474(0x111)](_0x32ca78))continue;if(_0x1120d0===Input[_0x34b474(0x433)][_0x32ca78]){if('UZuKx'!=='FCPbf')_0x13ac00[_0x34b474(0x353)](_0x32ca78);else var _0x3405fa=_0x4dbea5[_0x34b474(0x638)](_0x4eee7b*0x2-0x1,_0x34b474(0x852))*0.5+0.5;}}for(let _0x426ddf=0x0;_0x426ddf<_0x13ac00[_0x34b474(0x631)];_0x426ddf++){_0x13ac00[_0x426ddf]=TextManager[_0x34b474(0x1e4)][_0x13ac00[_0x426ddf]];}return this[_0x34b474(0x5e7)](_0x13ac00);},TextManager[_0x9eb9ae(0x5e7)]=function(_0x722258){const _0x4fab8c=_0x9eb9ae,_0x4c8704=VisuMZ['CoreEngine'][_0x4fab8c(0x1dc)][_0x4fab8c(0x452)],_0x3383d0=_0x4c8704['KeyUnlisted'],_0x537ff4=_0x722258['pop'](),_0x5439ca='Key%1'['format'](_0x537ff4);return _0x4c8704[_0x5439ca]?_0x4c8704[_0x5439ca]:_0x3383d0[_0x4fab8c(0x468)](_0x537ff4);},TextManager[_0x9eb9ae(0x1db)]=function(_0x2edf35,_0xd5a87b){const _0xa84793=_0x9eb9ae,_0xab48e1=VisuMZ['CoreEngine'][_0xa84793(0x1dc)]['ButtonAssist'],_0x2da0bf=_0xab48e1[_0xa84793(0x18c)],_0x4ec07d=this[_0xa84793(0x3ed)](_0x2edf35),_0x2e553c=this[_0xa84793(0x3ed)](_0xd5a87b);return _0x2da0bf[_0xa84793(0x468)](_0x4ec07d,_0x2e553c);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x686)]=ColorManager[_0x9eb9ae(0x2f1)],ColorManager[_0x9eb9ae(0x2f1)]=function(){const _0x5aa514=_0x9eb9ae;VisuMZ[_0x5aa514(0x68b)][_0x5aa514(0x686)][_0x5aa514(0x330)](this),this[_0x5aa514(0x3d6)]=this[_0x5aa514(0x3d6)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x98752f,_0x55a1ea){const _0x15eccb=_0x9eb9ae;_0x55a1ea=String(_0x55a1ea),this[_0x15eccb(0x3d6)]=this['_colorCache']||{};if(_0x55a1ea[_0x15eccb(0x6f5)](/#(.*)/i))this[_0x15eccb(0x3d6)][_0x98752f]=_0x15eccb(0x6ba)[_0x15eccb(0x468)](String(RegExp['$1']));else{if('AvaIY'!=='KfrGl')this['_colorCache'][_0x98752f]=this[_0x15eccb(0x2d9)](Number(_0x55a1ea));else return _0x1cc720[_0x15eccb(0x68b)][_0x15eccb(0x1dc)][_0x15eccb(0x2c7)][_0x15eccb(0x601)]??!![];}return this[_0x15eccb(0x3d6)][_0x98752f];},ColorManager[_0x9eb9ae(0xf6)]=function(_0x145c0f){const _0x189f47=_0x9eb9ae;return _0x145c0f=String(_0x145c0f),_0x145c0f['match'](/#(.*)/i)?_0x189f47(0x6ba)[_0x189f47(0x468)](String(RegExp['$1'])):this['textColor'](Number(_0x145c0f));},ColorManager[_0x9eb9ae(0x753)]=function(){const _0x34c1e1=_0x9eb9ae;this[_0x34c1e1(0x3d6)]={};},ColorManager['normalColor']=function(){const _0x4a6aca=_0x9eb9ae,_0x560144='_stored_normalColor';this[_0x4a6aca(0x3d6)]=this[_0x4a6aca(0x3d6)]||{};if(this[_0x4a6aca(0x3d6)][_0x560144])return this[_0x4a6aca(0x3d6)][_0x560144];const _0x3c482e=VisuMZ['CoreEngine'][_0x4a6aca(0x1dc)][_0x4a6aca(0x867)][_0x4a6aca(0x393)];return this[_0x4a6aca(0x4ea)](_0x560144,_0x3c482e);},ColorManager[_0x9eb9ae(0x1e3)]=function(){const _0x5a477b=_0x9eb9ae,_0x163d4f='_stored_systemColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x5a477b(0x3d6)][_0x163d4f])return this[_0x5a477b(0x3d6)][_0x163d4f];const _0x21dfa8=VisuMZ[_0x5a477b(0x68b)][_0x5a477b(0x1dc)][_0x5a477b(0x867)][_0x5a477b(0x404)];return this[_0x5a477b(0x4ea)](_0x163d4f,_0x21dfa8);},ColorManager[_0x9eb9ae(0x507)]=function(){const _0x82e098=_0x9eb9ae,_0x57a422=_0x82e098(0x5a6);this['_colorCache']=this[_0x82e098(0x3d6)]||{};if(this[_0x82e098(0x3d6)][_0x57a422])return this[_0x82e098(0x3d6)][_0x57a422];const _0x3b3959=VisuMZ[_0x82e098(0x68b)]['Settings']['Color'][_0x82e098(0x6c6)];return this[_0x82e098(0x4ea)](_0x57a422,_0x3b3959);},ColorManager['deathColor']=function(){const _0xc9cacc=_0x9eb9ae,_0x42a338=_0xc9cacc(0x285);this[_0xc9cacc(0x3d6)]=this[_0xc9cacc(0x3d6)]||{};if(this[_0xc9cacc(0x3d6)][_0x42a338])return this['_colorCache'][_0x42a338];const _0x599ffa=VisuMZ[_0xc9cacc(0x68b)][_0xc9cacc(0x1dc)][_0xc9cacc(0x867)][_0xc9cacc(0x6ca)];return this[_0xc9cacc(0x4ea)](_0x42a338,_0x599ffa);},ColorManager[_0x9eb9ae(0x329)]=function(){const _0x115e63=_0x9eb9ae,_0x4645cf='_stored_gaugeBackColor';this[_0x115e63(0x3d6)]=this[_0x115e63(0x3d6)]||{};if(this[_0x115e63(0x3d6)][_0x4645cf])return this['_colorCache'][_0x4645cf];const _0x5cb455=VisuMZ[_0x115e63(0x68b)]['Settings']['Color'][_0x115e63(0x519)];return this[_0x115e63(0x4ea)](_0x4645cf,_0x5cb455);},ColorManager[_0x9eb9ae(0x85f)]=function(){const _0x3e741c=_0x9eb9ae,_0x2eab10=_0x3e741c(0x2c9);this['_colorCache']=this[_0x3e741c(0x3d6)]||{};if(this[_0x3e741c(0x3d6)][_0x2eab10])return this[_0x3e741c(0x3d6)][_0x2eab10];const _0x6edb7e=VisuMZ[_0x3e741c(0x68b)]['Settings']['Color'][_0x3e741c(0x80f)];return this[_0x3e741c(0x4ea)](_0x2eab10,_0x6edb7e);},ColorManager[_0x9eb9ae(0x7b8)]=function(){const _0x5b7097=_0x9eb9ae,_0x161af3=_0x5b7097(0x3c9);this[_0x5b7097(0x3d6)]=this[_0x5b7097(0x3d6)]||{};if(this[_0x5b7097(0x3d6)][_0x161af3])return this[_0x5b7097(0x3d6)][_0x161af3];const _0x40ad16=VisuMZ['CoreEngine'][_0x5b7097(0x1dc)]['Color'][_0x5b7097(0x89a)];return this['getColorDataFromPluginParameters'](_0x161af3,_0x40ad16);},ColorManager[_0x9eb9ae(0x842)]=function(){const _0x2f9e94=_0x9eb9ae,_0x209d65=_0x2f9e94(0x919);this[_0x2f9e94(0x3d6)]=this[_0x2f9e94(0x3d6)]||{};if(this['_colorCache'][_0x209d65])return this[_0x2f9e94(0x3d6)][_0x209d65];const _0x2d9682=VisuMZ[_0x2f9e94(0x68b)]['Settings'][_0x2f9e94(0x867)][_0x2f9e94(0x488)];return this['getColorDataFromPluginParameters'](_0x209d65,_0x2d9682);},ColorManager[_0x9eb9ae(0xfe)]=function(){const _0x56e74f=_0x9eb9ae,_0x522398=_0x56e74f(0x637);this[_0x56e74f(0x3d6)]=this[_0x56e74f(0x3d6)]||{};if(this[_0x56e74f(0x3d6)][_0x522398])return this[_0x56e74f(0x3d6)][_0x522398];const _0x6fd3f7=VisuMZ['CoreEngine'][_0x56e74f(0x1dc)]['Color']['ColorMPGauge2'];return this[_0x56e74f(0x4ea)](_0x522398,_0x6fd3f7);},ColorManager[_0x9eb9ae(0x65f)]=function(){const _0x8710f9=_0x9eb9ae,_0x4606ad='_stored_mpCostColor';this[_0x8710f9(0x3d6)]=this[_0x8710f9(0x3d6)]||{};if(this[_0x8710f9(0x3d6)][_0x4606ad])return this['_colorCache'][_0x4606ad];const _0x52a5f8=VisuMZ['CoreEngine'][_0x8710f9(0x1dc)]['Color'][_0x8710f9(0x3e6)];return this[_0x8710f9(0x4ea)](_0x4606ad,_0x52a5f8);},ColorManager[_0x9eb9ae(0x1c8)]=function(){const _0x5ac1d4=_0x9eb9ae,_0x498378=_0x5ac1d4(0x84e);this[_0x5ac1d4(0x3d6)]=this[_0x5ac1d4(0x3d6)]||{};if(this[_0x5ac1d4(0x3d6)][_0x498378])return this[_0x5ac1d4(0x3d6)][_0x498378];const _0x5d08c6=VisuMZ['CoreEngine'][_0x5ac1d4(0x1dc)][_0x5ac1d4(0x867)][_0x5ac1d4(0x870)];return this['getColorDataFromPluginParameters'](_0x498378,_0x5d08c6);},ColorManager['powerDownColor']=function(){const _0x5d24e4=_0x9eb9ae,_0x3c2fd2=_0x5d24e4(0x273);this[_0x5d24e4(0x3d6)]=this[_0x5d24e4(0x3d6)]||{};if(this[_0x5d24e4(0x3d6)][_0x3c2fd2])return this[_0x5d24e4(0x3d6)][_0x3c2fd2];const _0x4ee041=VisuMZ[_0x5d24e4(0x68b)][_0x5d24e4(0x1dc)]['Color'][_0x5d24e4(0x42d)];return this[_0x5d24e4(0x4ea)](_0x3c2fd2,_0x4ee041);},ColorManager['ctGaugeColor1']=function(){const _0x12fd81=_0x9eb9ae,_0x218350=_0x12fd81(0x2c1);this['_colorCache']=this[_0x12fd81(0x3d6)]||{};if(this[_0x12fd81(0x3d6)][_0x218350])return this['_colorCache'][_0x218350];const _0x466a01=VisuMZ[_0x12fd81(0x68b)]['Settings'][_0x12fd81(0x867)][_0x12fd81(0x290)];return this[_0x12fd81(0x4ea)](_0x218350,_0x466a01);},ColorManager[_0x9eb9ae(0x397)]=function(){const _0x49e4ec=_0x9eb9ae,_0x499976='_stored_ctGaugeColor2';this[_0x49e4ec(0x3d6)]=this[_0x49e4ec(0x3d6)]||{};if(this[_0x49e4ec(0x3d6)][_0x499976])return this[_0x49e4ec(0x3d6)][_0x499976];const _0x4f6a83=VisuMZ[_0x49e4ec(0x68b)]['Settings']['Color']['ColorCTGauge2'];return this[_0x49e4ec(0x4ea)](_0x499976,_0x4f6a83);},ColorManager[_0x9eb9ae(0x40c)]=function(){const _0x360285=_0x9eb9ae,_0x14afa4='_stored_tpGaugeColor1';this[_0x360285(0x3d6)]=this[_0x360285(0x3d6)]||{};if(this[_0x360285(0x3d6)][_0x14afa4])return this[_0x360285(0x3d6)][_0x14afa4];const _0x180b3a=VisuMZ['CoreEngine']['Settings'][_0x360285(0x867)][_0x360285(0x85e)];return this[_0x360285(0x4ea)](_0x14afa4,_0x180b3a);},ColorManager[_0x9eb9ae(0x79d)]=function(){const _0xb81ea2=_0x9eb9ae,_0x31942b=_0xb81ea2(0x763);this[_0xb81ea2(0x3d6)]=this[_0xb81ea2(0x3d6)]||{};if(this['_colorCache'][_0x31942b])return this[_0xb81ea2(0x3d6)][_0x31942b];const _0x2da3fc=VisuMZ['CoreEngine'][_0xb81ea2(0x1dc)][_0xb81ea2(0x867)]['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0x31942b,_0x2da3fc);},ColorManager[_0x9eb9ae(0x50c)]=function(){const _0x15a96b=_0x9eb9ae,_0x2865b3='_stored_tpCostColor';this[_0x15a96b(0x3d6)]=this[_0x15a96b(0x3d6)]||{};if(this[_0x15a96b(0x3d6)][_0x2865b3])return this[_0x15a96b(0x3d6)][_0x2865b3];const _0x12bc59=VisuMZ[_0x15a96b(0x68b)]['Settings'][_0x15a96b(0x867)][_0x15a96b(0x7d4)];return this[_0x15a96b(0x4ea)](_0x2865b3,_0x12bc59);},ColorManager[_0x9eb9ae(0x7c2)]=function(){const _0x20e9b3=_0x9eb9ae,_0x258f23='_stored_pendingColor';this[_0x20e9b3(0x3d6)]=this[_0x20e9b3(0x3d6)]||{};if(this[_0x20e9b3(0x3d6)][_0x258f23])return this['_colorCache'][_0x258f23];const _0x349885=VisuMZ['CoreEngine'][_0x20e9b3(0x1dc)][_0x20e9b3(0x867)][_0x20e9b3(0x7d4)];return this[_0x20e9b3(0x4ea)](_0x258f23,_0x349885);},ColorManager['expGaugeColor1']=function(){const _0x484965=_0x9eb9ae,_0x52266f=_0x484965(0x642);this[_0x484965(0x3d6)]=this[_0x484965(0x3d6)]||{};if(this[_0x484965(0x3d6)][_0x52266f])return this['_colorCache'][_0x52266f];const _0x1a9e28=VisuMZ[_0x484965(0x68b)][_0x484965(0x1dc)][_0x484965(0x867)]['ColorExpGauge1'];return this[_0x484965(0x4ea)](_0x52266f,_0x1a9e28);},ColorManager['expGaugeColor2']=function(){const _0xd1df6b=_0x9eb9ae,_0x5816d9='_stored_expGaugeColor2';this[_0xd1df6b(0x3d6)]=this[_0xd1df6b(0x3d6)]||{};if(this[_0xd1df6b(0x3d6)][_0x5816d9])return this[_0xd1df6b(0x3d6)][_0x5816d9];const _0x11cace=VisuMZ[_0xd1df6b(0x68b)][_0xd1df6b(0x1dc)]['Color'][_0xd1df6b(0x735)];return this[_0xd1df6b(0x4ea)](_0x5816d9,_0x11cace);},ColorManager[_0x9eb9ae(0x628)]=function(){const _0x7ac46f=_0x9eb9ae,_0x288634=_0x7ac46f(0x7e8);this[_0x7ac46f(0x3d6)]=this[_0x7ac46f(0x3d6)]||{};if(this[_0x7ac46f(0x3d6)][_0x288634])return this[_0x7ac46f(0x3d6)][_0x288634];const _0x2e797f=VisuMZ[_0x7ac46f(0x68b)][_0x7ac46f(0x1dc)][_0x7ac46f(0x867)][_0x7ac46f(0x5e9)];return this[_0x7ac46f(0x4ea)](_0x288634,_0x2e797f);},ColorManager[_0x9eb9ae(0x4b8)]=function(){const _0x2d6986=_0x9eb9ae,_0x3096e1=_0x2d6986(0x52f);this[_0x2d6986(0x3d6)]=this[_0x2d6986(0x3d6)]||{};if(this[_0x2d6986(0x3d6)][_0x3096e1])return this['_colorCache'][_0x3096e1];const _0x23ca57=VisuMZ[_0x2d6986(0x68b)]['Settings'][_0x2d6986(0x867)]['ColorMaxLvGauge2'];return this[_0x2d6986(0x4ea)](_0x3096e1,_0x23ca57);},ColorManager[_0x9eb9ae(0x760)]=function(_0x2fd55a){const _0x18cb69=_0x9eb9ae;return VisuMZ['CoreEngine'][_0x18cb69(0x1dc)][_0x18cb69(0x867)][_0x18cb69(0x381)]['call'](this,_0x2fd55a);},ColorManager[_0x9eb9ae(0x5d8)]=function(_0x23d97d){const _0x304163=_0x9eb9ae;return VisuMZ[_0x304163(0x68b)][_0x304163(0x1dc)][_0x304163(0x867)][_0x304163(0x49d)][_0x304163(0x330)](this,_0x23d97d);},ColorManager[_0x9eb9ae(0x19e)]=function(_0x89bb2a){const _0x4b601b=_0x9eb9ae;return VisuMZ[_0x4b601b(0x68b)][_0x4b601b(0x1dc)][_0x4b601b(0x867)]['ActorTPColor'][_0x4b601b(0x330)](this,_0x89bb2a);},ColorManager[_0x9eb9ae(0x4f7)]=function(_0x588da2){const _0x27d5a2=_0x9eb9ae;return VisuMZ[_0x27d5a2(0x68b)][_0x27d5a2(0x1dc)][_0x27d5a2(0x867)][_0x27d5a2(0x425)]['call'](this,_0x588da2);},ColorManager[_0x9eb9ae(0x30e)]=function(_0x3ab2eb){const _0x495aac=_0x9eb9ae;return VisuMZ['CoreEngine'][_0x495aac(0x1dc)][_0x495aac(0x867)]['DamageColor'][_0x495aac(0x330)](this,_0x3ab2eb);},ColorManager[_0x9eb9ae(0x784)]=function(){const _0x15f1f5=_0x9eb9ae;return VisuMZ[_0x15f1f5(0x68b)][_0x15f1f5(0x1dc)][_0x15f1f5(0x867)][_0x15f1f5(0x473)];},ColorManager['outlineColorDmg']=function(){const _0x5005b7=_0x9eb9ae;return VisuMZ[_0x5005b7(0x68b)]['Settings'][_0x5005b7(0x867)][_0x5005b7(0x3fa)]||_0x5005b7(0x5d0);},ColorManager['outlineColorGauge']=function(){const _0x5a5152=_0x9eb9ae;return VisuMZ['CoreEngine'][_0x5a5152(0x1dc)][_0x5a5152(0x867)][_0x5a5152(0x740)]||_0x5a5152(0x754);},ColorManager['dimColor1']=function(){const _0x1a0b3d=_0x9eb9ae;return VisuMZ['CoreEngine']['Settings'][_0x1a0b3d(0x867)][_0x1a0b3d(0x2ea)];},ColorManager[_0x9eb9ae(0x16f)]=function(){const _0x312dd8=_0x9eb9ae;return VisuMZ[_0x312dd8(0x68b)]['Settings'][_0x312dd8(0x867)][_0x312dd8(0x6fb)];},ColorManager[_0x9eb9ae(0x3df)]=function(){const _0x202bee=_0x9eb9ae;return VisuMZ[_0x202bee(0x68b)]['Settings'][_0x202bee(0x867)]['ItemBackColor1'];},ColorManager[_0x9eb9ae(0x595)]=function(){const _0x3be858=_0x9eb9ae;return VisuMZ['CoreEngine']['Settings'][_0x3be858(0x867)]['ItemBackColor2'];},SceneManager[_0x9eb9ae(0x157)]=[],SceneManager[_0x9eb9ae(0x85c)]=function(){const _0x52e118=_0x9eb9ae;return this['_scene']&&this['_scene'][_0x52e118(0x734)]===Scene_Battle;},SceneManager[_0x9eb9ae(0x26c)]=function(){const _0x227fa8=_0x9eb9ae;return this[_0x227fa8(0x584)]&&this['_scene'][_0x227fa8(0x734)]===Scene_Map;},SceneManager[_0x9eb9ae(0x64b)]=function(){const _0x47e5b6=_0x9eb9ae;return this[_0x47e5b6(0x584)]&&this[_0x47e5b6(0x584)]instanceof Scene_Map;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x5fb)]=SceneManager['initialize'],SceneManager['initialize']=function(){const _0x173aa0=_0x9eb9ae;VisuMZ[_0x173aa0(0x68b)][_0x173aa0(0x5fb)][_0x173aa0(0x330)](this),this[_0x173aa0(0x1a1)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x6d7)]=SceneManager['onKeyDown'],SceneManager[_0x9eb9ae(0x7a4)]=function(_0x20a708){const _0x73a713=_0x9eb9ae;if($gameTemp)this[_0x73a713(0x620)](_0x20a708);VisuMZ[_0x73a713(0x68b)][_0x73a713(0x6d7)][_0x73a713(0x330)](this,_0x20a708);},SceneManager[_0x9eb9ae(0x620)]=function(_0x125573){const _0x55eaee=_0x9eb9ae;if(!_0x125573[_0x55eaee(0x7fc)]&&!_0x125573[_0x55eaee(0x922)])switch(_0x125573[_0x55eaee(0x48d)]){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x55eaee(0x673)]();break;case 0x76:if(Input['isPressed'](_0x55eaee(0x5df))||Input[_0x55eaee(0x4af)](_0x55eaee(0x1f5)))return;this[_0x55eaee(0x6b6)]();break;}},SceneManager[_0x9eb9ae(0x673)]=function(){const _0xaf23a2=_0x9eb9ae;if($gameTemp[_0xaf23a2(0x8e0)]()&&VisuMZ[_0xaf23a2(0x68b)]['Settings']['QoL'][_0xaf23a2(0x416)]){ConfigManager[_0xaf23a2(0x6f7)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0xaf23a2(0x7b1)]=0x0,ConfigManager[_0xaf23a2(0x1b9)]=0x0,ConfigManager[_0xaf23a2(0x6f7)]=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0xaf23a2(0x1b9)]=0x64,ConfigManager[_0xaf23a2(0x6f7)]=0x64);ConfigManager[_0xaf23a2(0x1f3)]();if(this[_0xaf23a2(0x584)][_0xaf23a2(0x734)]===Scene_Options){if(this[_0xaf23a2(0x584)][_0xaf23a2(0x8ce)])this['_scene'][_0xaf23a2(0x8ce)]['refresh']();if(this['_scene'][_0xaf23a2(0x749)])this[_0xaf23a2(0x584)][_0xaf23a2(0x749)]['refresh']();}}},SceneManager[_0x9eb9ae(0x6b6)]=function(){const _0x39d83=_0x9eb9ae;$gameTemp['isPlaytest']()&&VisuMZ[_0x39d83(0x68b)][_0x39d83(0x1dc)][_0x39d83(0x2c7)]['F7key']&&($gameTemp[_0x39d83(0x56c)]=!$gameTemp[_0x39d83(0x56c)]);},SceneManager[_0x9eb9ae(0x272)]=function(){const _0x1f1f77=_0x9eb9ae;if(!$gameTemp[_0x1f1f77(0x8e0)]())return;if(!SceneManager[_0x1f1f77(0x85c)]())return;for(const _0x2d0a28 of $gameParty[_0x1f1f77(0x3e7)]()){if(_0x1f1f77(0x119)===_0x1f1f77(0x288))for(const _0x3f25ce of _0x4c374f){if(_0x3f25ce&&_0x3f25ce['connected']){if(this[_0x1f1f77(0x539)](_0x3f25ce))return!![];}}else{if(!_0x2d0a28)continue;_0x2d0a28[_0x1f1f77(0x1ae)](_0x2d0a28[_0x1f1f77(0x14c)]());}}},SceneManager['initVisuMZCoreEngine']=function(){const _0xc13ee9=_0x9eb9ae;this[_0xc13ee9(0x263)]=![],this[_0xc13ee9(0x1c6)]=!VisuMZ['CoreEngine'][_0xc13ee9(0x1dc)]['UI']['ShowButtons'];},SceneManager[_0x9eb9ae(0x467)]=function(_0x1e2950){const _0x38091a=_0x9eb9ae;VisuMZ[_0x38091a(0x68b)][_0x38091a(0x1dc)]['UI']['SideButtons']&&(this[_0x38091a(0x263)]=_0x1e2950);},SceneManager[_0x9eb9ae(0x2e4)]=function(){const _0x56cfdb=_0x9eb9ae;return this[_0x56cfdb(0x263)];},SceneManager[_0x9eb9ae(0x418)]=function(){const _0x5cbc62=_0x9eb9ae;return this[_0x5cbc62(0x1c6)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x2e38ae=_0x9eb9ae;return this['areButtonsHidden']()||this[_0x2e38ae(0x2e4)]();},VisuMZ[_0x9eb9ae(0x68b)]['SceneManager_isGameActive']=SceneManager[_0x9eb9ae(0x3b4)],SceneManager['isGameActive']=function(){const _0x4797c4=_0x9eb9ae;if(VisuMZ['CoreEngine']['Settings']['QoL']['RequireFocus'])return VisuMZ[_0x4797c4(0x68b)]['SceneManager_isGameActive'][_0x4797c4(0x330)](this);else{if('nOIKD'===_0x4797c4(0x5c6)){let _0x30be10=_0x12e91b;if(_0x30be10[0x0]==='0')return _0x30be10;if(_0x30be10[_0x30be10[_0x4797c4(0x631)]-0x1]==='.')return _0x3a6e1a(_0x30be10)[_0x4797c4(0x3ba)](_0x566309,_0x460a1b)+'.';else return _0x30be10[_0x30be10['length']-0x1]===','?_0xc517bd(_0x30be10)[_0x4797c4(0x3ba)](_0x1fd9bd,_0x56de03)+',':_0x278bec(_0x30be10)[_0x4797c4(0x3ba)](_0x1ba742,_0x3bbf52);}else return!![];}},SceneManager[_0x9eb9ae(0x770)]=function(_0x289b12){const _0x16aed9=_0x9eb9ae;if(_0x289b12 instanceof Error)this[_0x16aed9(0x6d6)](_0x289b12);else{if(_0x289b12 instanceof Array&&_0x289b12[0x0]==='LoadError'){if(_0x16aed9(0x373)!==_0x16aed9(0x373))for(const _0x394395 of _0xf28e5e){this[_0x16aed9(0x4a4)]([_0x394395],_0x1ee989,_0x3c3bfa,_0x13ff2a,_0x502817),_0x6485da+=_0x43c458;}else this['catchLoadError'](_0x289b12);}else this['catchUnknownError'](_0x289b12);}this[_0x16aed9(0x392)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x4c9)]=BattleManager[_0x9eb9ae(0x8c6)],BattleManager[_0x9eb9ae(0x8c6)]=function(){const _0x312cd1=_0x9eb9ae;if(VisuMZ[_0x312cd1(0x68b)][_0x312cd1(0x1dc)][_0x312cd1(0x2c7)][_0x312cd1(0x79b)])this[_0x312cd1(0x4b7)]();else{if(_0x312cd1(0x4e8)!=='ScYXA')return VisuMZ[_0x312cd1(0x68b)][_0x312cd1(0x4c9)][_0x312cd1(0x330)](this);else{let _0x464d58=this[_0x312cd1(0x20d)]();const _0x310dda=this[_0x312cd1(0x748)](),_0xe6125e=this[_0x312cd1(0x4be)]();if(this['isUseModernControls']()&&(_0x464d58<_0x310dda||_0x2ceae5&&_0xe6125e===0x1)){_0x464d58+=_0xe6125e;if(_0x464d58>=_0x310dda)_0x464d58=_0x310dda-0x1;this[_0x312cd1(0x4a7)](_0x464d58);}else!this[_0x312cd1(0x853)]()&&((_0x464d58<_0x310dda-_0xe6125e||_0x445b21&&_0xe6125e===0x1)&&this[_0x312cd1(0x4a7)]((_0x464d58+_0xe6125e)%_0x310dda));}}},BattleManager[_0x9eb9ae(0x4b7)]=function(){const _0x1af340=_0x9eb9ae;return $gameParty[_0x1af340(0x5f2)](),SoundManager[_0x1af340(0x676)](),this[_0x1af340(0x581)](),!![];},BattleManager['isTpb']=function(){const _0x3af98c=_0x9eb9ae;return $gameSystem[_0x3af98c(0x602)]()>=0x1;},BattleManager[_0x9eb9ae(0x885)]=function(){const _0x28b398=_0x9eb9ae;return $gameSystem[_0x28b398(0x602)]()===0x1;},VisuMZ[_0x9eb9ae(0x68b)]['Game_Temp_initialize']=Game_Temp['prototype']['initialize'],Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)]=function(){const _0x597de1=_0x9eb9ae;VisuMZ[_0x597de1(0x68b)][_0x597de1(0x527)][_0x597de1(0x330)](this),this[_0x597de1(0x44a)](),this[_0x597de1(0x516)](),this[_0x597de1(0x562)]();},Game_Temp[_0x9eb9ae(0x61d)]['forceOutOfPlaytest']=function(){const _0x5f4fc3=_0x9eb9ae;VisuMZ[_0x5f4fc3(0x68b)][_0x5f4fc3(0x1dc)]['QoL'][_0x5f4fc3(0x6b8)]&&(this[_0x5f4fc3(0x256)]=![]);},Game_Temp['prototype'][_0x9eb9ae(0x144)]=function(_0x353264){const _0x49aea3=_0x9eb9ae;this[_0x49aea3(0x211)]=_0x353264;},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x797)]=function(){const _0x56ce62=_0x9eb9ae;return this[_0x56ce62(0x211)];},Game_Temp['prototype'][_0x9eb9ae(0x260)]=function(){const _0x3f060b=_0x9eb9ae;this[_0x3f060b(0x1a0)]=undefined,this[_0x3f060b(0x4b2)]=undefined;},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1a7)]=function(_0x323b69){const _0x16a308=_0x9eb9ae;$gameMap&&$dataMap&&$dataMap[_0x16a308(0x52c)]&&this['parseForcedGameTroopSettingsCoreEngine']($dataMap['note']);const _0x406b88=$dataTroops[_0x323b69];if(_0x406b88){let _0x350bbf=DataManager['createTroopNote'](_0x406b88['id']);this[_0x16a308(0x46c)](_0x350bbf);}},Game_Temp['prototype'][_0x9eb9ae(0x46c)]=function(_0x2a2ebd){const _0x45f834=_0x9eb9ae;if(!_0x2a2ebd)return;if(_0x2a2ebd['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x45f834(0x8b6)!==_0x45f834(0x515)?this[_0x45f834(0x1a0)]='FV':_0x306897[_0x45f834(0x68b)][_0x45f834(0x761)][_0x45f834(0x330)](this,_0x49ab4a);else{if(_0x2a2ebd['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x45f834(0x305)===_0x45f834(0x305))this[_0x45f834(0x1a0)]='SV';else{this[_0x45f834(0x80d)]();for(let _0x100a05=0x0;_0x100a05<_0x38815e[_0x45f834(0x251)]['MAX_GL_TEXTURES'];_0x100a05++){const _0x5be094=new _0x642b11['BaseTexture']();_0x5be094[_0x45f834(0x782)](0x800,0x800),_0x5336eb[_0x45f834(0x68b)][_0x45f834(0x1dc)][_0x45f834(0x2c7)][_0x45f834(0x721)]&&(_0x5be094[_0x45f834(0x1d9)]=_0x99d137[_0x45f834(0x73c)]['NEAREST']),this[_0x45f834(0x3c7)]['push'](_0x5be094);}}}else{if(_0x2a2ebd['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x45f834(0x203)!==_0x45f834(0x435)){const _0x3fc1d9=String(RegExp['$1']);if(_0x3fc1d9['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else{if(_0x3fc1d9[_0x45f834(0x6f5)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x45f834(0x2b6)!==_0x45f834(0x823))this['_forcedTroopView']='SV';else return _0x1b564e['CoreEngine'][_0x45f834(0x1dc)][_0x45f834(0x867)]['ParamChange'][_0x45f834(0x330)](this,_0x27e670);}}}else{_0x303d67[_0x45f834(0x68b)]['Settings'][_0x45f834(0x2c7)]['FontSmoothing']&&(_0xdd8338[_0x45f834(0x40d)]['font-smooth']='none');_0x1afbcf[_0x45f834(0x68b)][_0x45f834(0x1dc)]['QoL'][_0x45f834(0x721)]&&(_0x2edc37[_0x45f834(0x40d)][_0x45f834(0x257)]='pixelated');const _0x13357d=_0x51f768[_0x45f834(0x713)](0x0,_0x5c0ed3[_0x45f834(0x83f)](_0x2bee4d[_0x45f834(0x792)]*this[_0x45f834(0x58c)])),_0x3be73b=_0x6099e4[_0x45f834(0x713)](0x0,_0x4876a2[_0x45f834(0x83f)](_0x2401ee[_0x45f834(0x71d)]*this['_realScale']));_0x3f8833[_0x45f834(0x40d)][_0x45f834(0x792)]=_0x13357d+'px',_0x95e41a[_0x45f834(0x40d)][_0x45f834(0x71d)]=_0x3be73b+'px';}}}}if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:DTB)>/i)){if(_0x45f834(0x7df)!==_0x45f834(0x7df)){const _0x55cc6c=_0x22e451[_0x45f834(0x68b)][_0x45f834(0x1dc)][_0x45f834(0x920)];if(_0x55cc6c&&_0x55cc6c[_0x45f834(0x1b4)])return _0x55cc6c[_0x45f834(0x1b4)][_0x45f834(0x330)](this);const _0x52a05a=_0x2709b[_0x45f834(0x1da)]*0.75,_0x151c8e=_0x419378[_0x45f834(0x239)]*0.6,_0x38d1f5=_0x24a8eb[_0x45f834(0x824)];this['y']+=_0x1cef65[_0x45f834(0x74b)](_0x3d4906[_0x45f834(0x347)](_0x52a05a)-_0x5bf7bb[_0x45f834(0x347)](_0x151c8e))*(_0x377c4f[_0x45f834(0x21c)](_0x38d1f5,0x1e)*0.5);}else this['_forcedBattleSys']=0x0;}else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:TPB|ATB)[ ]ACTIVE>/i))_0x45f834(0x59e)!=='nNKNg'?this[_0x45f834(0x4b2)]=0x1:_0x394b60(_0x404c15);else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:TPB|ATB)[ ]WAIT>/i))this['_forcedBattleSys']=0x2;else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:CTB)>/i))Imported[_0x45f834(0x550)]&&(this[_0x45f834(0x4b2)]='CTB');else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:STB)>/i))Imported[_0x45f834(0x1b1)]&&(this[_0x45f834(0x4b2)]=_0x45f834(0x1fc));else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:BTB)>/i)){if(Imported[_0x45f834(0x234)]){if('pleUV'===_0x45f834(0x570)){const _0x4dd83d=this[_0x45f834(0x446)][_0x45f834(0x7c9)],_0x233629=this[_0x45f834(0x792)],_0x19d1a7=this[_0x45f834(0x71d)],_0x1f27e9=this[_0x45f834(0x877)],_0x36b1ce=_0x52b9cc[_0x45f834(0x31b)](),_0x5625d3=_0x37fc27[_0x45f834(0x16f)]();_0x4dd83d[_0x45f834(0x52b)](_0x233629,_0x19d1a7),_0x4dd83d['gradientFillRect'](0x0,0x0,_0x233629,_0x1f27e9,_0x5625d3,_0x36b1ce,!![]),_0x4dd83d[_0x45f834(0x6bd)](0x0,_0x1f27e9,_0x233629,_0x19d1a7-_0x1f27e9*0x2,_0x36b1ce),_0x4dd83d[_0x45f834(0x134)](0x0,_0x19d1a7-_0x1f27e9,_0x233629,_0x1f27e9,_0x36b1ce,_0x5625d3,!![]),this['_dimmerSprite']['setFrame'](0x0,0x0,_0x233629,_0x19d1a7);}else this['_forcedBattleSys']=_0x45f834(0x46e);}}else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:FTB)>/i))Imported[_0x45f834(0x8bc)]&&(this[_0x45f834(0x4b2)]='FTB');else{if(_0x2a2ebd['match'](/<(?:OTB)>/i)){if(_0x45f834(0x1f6)!=='CudxX'){_0x2852b7[_0x45f834(0x61d)]['update'][_0x45f834(0x330)](this),this[_0x45f834(0x3ca)]();if(this[_0x45f834(0x3f4)])this[_0x45f834(0x7ba)]();else this[_0x45f834(0x337)]!==''&&(this[_0x45f834(0x337)]='');}else Imported[_0x45f834(0x47f)]&&(_0x45f834(0x3bd)===_0x45f834(0x34c)?_0x1241bd=_0x17258c[_0x45f834(0x54d)](_0x1fd6df):this[_0x45f834(0x4b2)]=_0x45f834(0x265));}else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:ETB)>/i))_0x45f834(0x426)===_0x45f834(0x426)?Imported[_0x45f834(0x5ca)]&&(_0x45f834(0x463)===_0x45f834(0x840)?this[_0x45f834(0x423)][_0x45f834(0x521)]<=0x60&&(this[_0x45f834(0x423)][_0x45f834(0x521)]+=0x6):this[_0x45f834(0x4b2)]=_0x45f834(0x5ab)):this[_0x45f834(0x1a0)]='SV';else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:PTB)>/i)){if(_0x45f834(0x764)!=='qAKzA')Imported[_0x45f834(0x4e7)]&&(_0x45f834(0x155)!==_0x45f834(0x160)?this[_0x45f834(0x4b2)]=_0x45f834(0x500):(_0x4d7dea[_0x45f834(0x517)](_0x45f834(0x402)),_0x587fea[_0x45f834(0x517)](_0x132509)));else return _0x5f0614['getBattleSystem']()>=0x1;}else{if(_0x2a2ebd[_0x45f834(0x6f5)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x664eba=String(RegExp['$1']);if(_0x664eba[_0x45f834(0x6f5)](/DTB/i))_0x45f834(0x271)===_0x45f834(0x2b7)?this[_0x45f834(0x853)]()&&_0x16dc32&&this['maxCols']()===0x1&&this[_0x45f834(0x20d)]()===0x0?this[_0x45f834(0x4a7)](this['maxItems']()-0x1):_0x2fa578['CoreEngine'][_0x45f834(0x851)][_0x45f834(0x330)](this,_0x398ce0):this[_0x45f834(0x4b2)]=0x0;else{if(_0x664eba[_0x45f834(0x6f5)](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0x45f834(0x594)===_0x45f834(0x7ad)){if(_0x5456fb[_0x45f834(0x631)]>0x0)_0x4802cc+=_0x1681e6+_0x45f834(0x531);else{const _0x38b326=_0x151092[_0x260fe0][_0x45f834(0x1e8)];_0x156095+=_0x276544+_0x45f834(0x75b)[_0x45f834(0x468)](_0x526f41,_0x38b326||_0x45f834(0x395))+_0x273889;}_0x55bb05+=_0x2e8859[_0x45f834(0x468)](_0x2c7926,_0x3bd108,_0x3bdb0f,_0x2da658);}else this[_0x45f834(0x4b2)]=0x1;}else{if(_0x664eba['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x45f834(0x4b2)]=0x2;else{if(_0x664eba[_0x45f834(0x6f5)](/CTB/i)){if(_0x45f834(0x5f4)===_0x45f834(0x5f4)){if(Imported['VisuMZ_2_BattleSystemCTB']){if(_0x45f834(0x335)===_0x45f834(0x335))this['_forcedBattleSys']=_0x45f834(0x26d);else return _0x5a5634[_0x45f834(0x68b)]['TextManager_param'][_0x45f834(0x330)](this,_0x2fbda8);}}else this[_0x45f834(0x19b)][_0x45f834(0x71c)](_0x5754d8[_0x45f834(0x2d8)]['StatusBgType']);}else{if(_0x664eba[_0x45f834(0x6f5)](/STB/i))'hFXjU'===_0x45f834(0x30f)?_0xa292dd[_0x45f834(0x1a5)](!![]):Imported[_0x45f834(0x1b1)]&&(this[_0x45f834(0x4b2)]='STB');else{if(_0x664eba[_0x45f834(0x6f5)](/BTB/i))Imported[_0x45f834(0x234)]&&(this['_forcedBattleSys']=_0x45f834(0x46e));else{if(_0x664eba[_0x45f834(0x6f5)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x45f834(0x4b2)]=_0x45f834(0x45f));else{if(_0x664eba[_0x45f834(0x6f5)](/OTB/i)){if('hKQjN'!==_0x45f834(0x67a))Imported[_0x45f834(0x47f)]&&(this[_0x45f834(0x4b2)]=_0x45f834(0x265));else{const _0x5e6d4b=_0x333b19[_0x45f834(0x158)],_0x50724f=_0x44a6be[_0x45f834(0x5c8)],_0x6f98e8=_0x9e9abe['Icon'],_0xe69704=_0x563d7d['Type'],_0x5c52dc=new _0x51b302(_0x47b6b6['ValueJS']);_0x4f38aa[_0x45f834(0x68b)][_0x45f834(0x598)][_0x5e6d4b[_0x45f834(0x88e)]()['trim']()]=_0x50724f,_0x22b892[_0x45f834(0x68b)][_0x45f834(0x8de)][_0x5e6d4b['toUpperCase']()[_0x45f834(0x81c)]()]=_0x6f98e8,_0x466d79['CoreEngine'][_0x45f834(0x2a8)][_0x5e6d4b['toUpperCase']()['trim']()]=_0xe69704,_0x4bbd3d[_0x45f834(0x68b)][_0x45f834(0x5aa)][_0x5e6d4b[_0x45f834(0x88e)]()[_0x45f834(0x81c)]()]=_0x5e6d4b,_0xcf25ce[_0x45f834(0x375)](_0x3241eb[_0x45f834(0x61d)],_0x5e6d4b,{'get'(){const _0x3363b3=_0x45f834,_0x5b5579=_0x5c52dc[_0x3363b3(0x330)](this);return _0xe69704==='integer'?_0x5ea7ec[_0x3363b3(0x74b)](_0x5b5579):_0x5b5579;}});}}else{if(_0x664eba[_0x45f834(0x6f5)](/ETB/i)){if(_0x45f834(0x2a5)!==_0x45f834(0x1bb))Imported[_0x45f834(0x5ca)]&&(this['_forcedBattleSys']='ETB');else return _0x45f834(0x5ab);}else _0x664eba[_0x45f834(0x6f5)](/PTB/i)&&(Imported[_0x45f834(0x4e7)]&&(this[_0x45f834(0x4b2)]='PTB'));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x516)]=function(){const _0x2339a3=_0x9eb9ae;this[_0x2339a3(0x8a9)]=[];},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3be)]=function(_0x51a592,_0x512e02,_0x2c4269,_0x312466){const _0x410ba5=_0x9eb9ae;if(!this[_0x410ba5(0x7fa)]())return;_0x2c4269=_0x2c4269||![],_0x312466=_0x312466||![];if($dataAnimations[_0x512e02]){const _0x1b552e={'targets':_0x51a592,'animationId':_0x512e02,'mirror':_0x2c4269,'mute':_0x312466};this[_0x410ba5(0x8a9)][_0x410ba5(0x353)](_0x1b552e);for(const _0x5651bf of _0x51a592){if(_0x5651bf[_0x410ba5(0x2d0)]){if(_0x410ba5(0x5e3)===_0x410ba5(0x5e3))_0x5651bf[_0x410ba5(0x2d0)]();else{var _0x34010e=_0x51580a['CoreEngine'][_0x410ba5(0x6bb)][_0x410ba5(0x330)](this,_0x370898,_0x239b47,_0x1fa5ee,_0x2ea5f5);if(this[_0x410ba5(0x1ff)]())_0x34010e[_0x410ba5(0x38e)]=_0x43dcff['GroupDigits'](_0x34010e[_0x410ba5(0x38e)]);return _0x34010e;}}}}},Game_Temp['prototype'][_0x9eb9ae(0x7fa)]=function(){return!![];},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x129)]=function(){const _0x5e779b=_0x9eb9ae;return this[_0x5e779b(0x8a9)]['shift']();},Game_Temp[_0x9eb9ae(0x61d)]['createPointAnimationQueue']=function(){const _0x274147=_0x9eb9ae;this[_0x274147(0x29f)]=[];},Game_Temp['prototype'][_0x9eb9ae(0x4ab)]=function(_0x39868e,_0xd5aae5,_0x55bcac,_0x28a938,_0x56e803){const _0x132615=_0x9eb9ae;if(!this[_0x132615(0x7f7)]())return;_0x28a938=_0x28a938||![],_0x56e803=_0x56e803||![];if($dataAnimations[_0x55bcac]){const _0x41c435={'x':_0x39868e,'y':_0xd5aae5,'animationId':_0x55bcac,'mirror':_0x28a938,'mute':_0x56e803};this[_0x132615(0x29f)]['push'](_0x41c435);}},Game_Temp['prototype']['showPointAnimations']=function(){return!![];},Game_Temp[_0x9eb9ae(0x61d)][_0x9eb9ae(0x386)]=function(){const _0x50e16d=_0x9eb9ae;return this[_0x50e16d(0x29f)][_0x50e16d(0x5df)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x91a)]=Game_System[_0x9eb9ae(0x61d)]['initialize'],Game_System[_0x9eb9ae(0x61d)]['initialize']=function(){const _0x242c5c=_0x9eb9ae;VisuMZ[_0x242c5c(0x68b)][_0x242c5c(0x91a)][_0x242c5c(0x330)](this),this['initCoreEngine']();},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x535)]=function(){const _0x3ce90e=_0x9eb9ae;this[_0x3ce90e(0x649)]={'SideView':$dataSystem[_0x3ce90e(0x7f2)],'BattleSystem':this['initialBattleSystem'](),'FontSize':$dataSystem['advanced']['fontSize'],'Padding':0xc};},Game_System['prototype'][_0x9eb9ae(0x52d)]=function(){const _0x264ae1=_0x9eb9ae;if($gameTemp[_0x264ae1(0x1a0)]==='SV')return!![];else{if($gameTemp[_0x264ae1(0x1a0)]==='FV')return _0x264ae1(0x3cb)==='WkriK'?![]:_0x50674d[_0x264ae1(0x2d8)][_0x264ae1(0x338)][_0x264ae1(0x330)](this);}if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x264ae1(0x649)][_0x264ae1(0x5dc)]===undefined)this[_0x264ae1(0x535)]();return this[_0x264ae1(0x649)]['SideView'];},Game_System['prototype'][_0x9eb9ae(0x1a5)]=function(_0xcb5ac){const _0xb2ac13=_0x9eb9ae;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0xb2ac13(0x649)][_0xb2ac13(0x5dc)]===undefined)this[_0xb2ac13(0x535)]();this[_0xb2ac13(0x649)][_0xb2ac13(0x5dc)]=_0xcb5ac;},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x12b)]=function(){const _0x16b128=_0x9eb9ae;if(this[_0x16b128(0x649)]===undefined)this[_0x16b128(0x535)]();this[_0x16b128(0x649)][_0x16b128(0x2b1)]=this['initialBattleSystem']();},Game_System[_0x9eb9ae(0x61d)]['initialBattleSystem']=function(){const _0xf3b40f=_0x9eb9ae,_0x4121d1=(VisuMZ[_0xf3b40f(0x68b)][_0xf3b40f(0x1dc)]['BattleSystem']||'DATABASE')['toUpperCase']()[_0xf3b40f(0x81c)]();return VisuMZ['CoreEngine'][_0xf3b40f(0x85d)](_0x4121d1);},Game_System['prototype']['getBattleSystem']=function(){const _0x173ce6=_0x9eb9ae;if($gameTemp['_forcedBattleSys']!==undefined)return $gameTemp['_forcedBattleSys'];if(this[_0x173ce6(0x649)]===undefined)this[_0x173ce6(0x535)]();if(this[_0x173ce6(0x649)][_0x173ce6(0x2b1)]===undefined)this['resetBattleSystem']();return this[_0x173ce6(0x649)]['BattleSystem'];},Game_System['prototype'][_0x9eb9ae(0x82e)]=function(_0x4e7118){const _0x9aa19d=_0x9eb9ae;if(this['_CoreEngineSettings']===undefined)this[_0x9aa19d(0x535)]();if(this[_0x9aa19d(0x649)][_0x9aa19d(0x2b1)]===undefined)this[_0x9aa19d(0x12b)]();this[_0x9aa19d(0x649)][_0x9aa19d(0x2b1)]=_0x4e7118;},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x109)]=function(){const _0x388cd8=_0x9eb9ae;if(this['_CoreEngineSettings']===undefined)this[_0x388cd8(0x535)]();if(this[_0x388cd8(0x649)][_0x388cd8(0x7ef)]===undefined)this[_0x388cd8(0x535)]();return this[_0x388cd8(0x649)][_0x388cd8(0x7ef)];},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x176)]=function(_0x4a4060){const _0x3699fb=_0x9eb9ae;if(this[_0x3699fb(0x649)]===undefined)this[_0x3699fb(0x535)]();if(this[_0x3699fb(0x649)]['TimeProgress']===undefined)this[_0x3699fb(0x535)]();this[_0x3699fb(0x649)][_0x3699fb(0x7ef)]=_0x4a4060;},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x102)]=function(){const _0x16f881=_0x9eb9ae;if(this['_CoreEngineSettings']===undefined)this[_0x16f881(0x535)]();if(this[_0x16f881(0x649)][_0x16f881(0x3d8)]===undefined)this[_0x16f881(0x535)]();return this['_CoreEngineSettings']['Padding'];},Game_System[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7bc)]=function(_0x25ec2b){const _0x2c79d1=_0x9eb9ae;if(this[_0x2c79d1(0x649)]===undefined)this['initCoreEngine']();if(this[_0x2c79d1(0x649)][_0x2c79d1(0x1c9)]===undefined)this['initCoreEngine']();this['_CoreEngineSettings']['Padding']=_0x25ec2b;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x827)]=Game_Screen[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)],Game_Screen['prototype'][_0x9eb9ae(0x7d0)]=function(){const _0x3ffbf8=_0x9eb9ae;VisuMZ[_0x3ffbf8(0x68b)][_0x3ffbf8(0x827)][_0x3ffbf8(0x330)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x9eb9ae(0x61d)][_0x9eb9ae(0x45a)]=function(){const _0x3678d6=_0x9eb9ae,_0xea0af0=VisuMZ[_0x3678d6(0x68b)][_0x3678d6(0x1dc)][_0x3678d6(0x920)];this[_0x3678d6(0x438)]=_0xea0af0?.[_0x3678d6(0x2ca)]||_0x3678d6(0x77f);},Game_Screen['prototype'][_0x9eb9ae(0x4d7)]=function(){const _0xc93253=_0x9eb9ae;if(this[_0xc93253(0x438)]===undefined)this[_0xc93253(0x45a)]();return this[_0xc93253(0x438)];},Game_Screen[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6de)]=function(_0x22c337){const _0x2d110e=_0x9eb9ae;if(this[_0x2d110e(0x438)]===undefined)this[_0x2d110e(0x45a)]();this[_0x2d110e(0x438)]=_0x22c337[_0x2d110e(0x19a)]()[_0x2d110e(0x81c)]();},Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x542)]=function(){const _0x3a4f50=_0x9eb9ae;if($gameParty[_0x3a4f50(0x2da)]())return![];return this[_0x3a4f50(0x1e8)]()&&this[_0x3a4f50(0x1e8)]()['charAt'](0x0)==='!';},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x5e6)]=Game_Picture[_0x9eb9ae(0x61d)]['x'],Game_Picture['prototype']['x']=function(){const _0x4d268f=_0x9eb9ae;if(this['isMapScrollLinked']()){if(_0x4d268f(0x5ba)==='TBQYl')return this['xScrollLinkedOffset']();else _0x52ae94[_0x4d268f(0x68b)][_0x4d268f(0x318)][_0x4d268f(0x330)](this);}else return VisuMZ[_0x4d268f(0x68b)][_0x4d268f(0x5e6)][_0x4d268f(0x330)](this);},Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x264)]=function(){const _0x4a8b2c=_0x9eb9ae,_0x30b492=$gameMap[_0x4a8b2c(0x17e)]()*$gameMap['tileWidth']();return this['_x']-_0x30b492;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x466)]=Game_Picture[_0x9eb9ae(0x61d)]['y'],Game_Picture[_0x9eb9ae(0x61d)]['y']=function(){const _0x194a8d=_0x9eb9ae;if(this['isMapScrollLinked']())return this[_0x194a8d(0x8d7)]();else{if(_0x194a8d(0x61c)!==_0x194a8d(0x18f))return VisuMZ[_0x194a8d(0x68b)]['Game_Picture_y'][_0x194a8d(0x330)](this);else _0x29f2b4+=_0x24b184+_0x194a8d(0x531);}},Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8d7)]=function(){const _0x562173=_0x9eb9ae,_0x26cafa=$gameMap[_0x562173(0x880)]()*$gameMap[_0x562173(0x42f)]();return this['_y']-_0x26cafa;},Game_Picture['prototype']['setEasingType']=function(_0x506d6e){const _0x5f50d0=_0x9eb9ae;this[_0x5f50d0(0x121)]=_0x506d6e;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x3a2)]=Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3a1)],Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3a1)]=function(_0x4832ec){const _0x391684=_0x9eb9ae;return this[_0x391684(0x121)]=this[_0x391684(0x121)]||0x0,[0x0,0x1,0x2,0x3][_0x391684(0x111)](this[_0x391684(0x121)])?VisuMZ[_0x391684(0x68b)][_0x391684(0x3a2)][_0x391684(0x330)](this,_0x4832ec):VisuMZ[_0x391684(0x638)](_0x4832ec,this['_coreEasingType']);},VisuMZ['CoreEngine'][_0x9eb9ae(0x2be)]=Game_Action['prototype'][_0x9eb9ae(0x178)],Game_Action[_0x9eb9ae(0x61d)]['itemHit']=function(_0x5d7377){const _0x429619=_0x9eb9ae;if(VisuMZ[_0x429619(0x68b)][_0x429619(0x1dc)][_0x429619(0x2c7)][_0x429619(0x547)]){if(_0x429619(0x4cd)==='rFLgL')return this[_0x429619(0x2fd)](_0x5d7377);else{var _0x3ff923=_0x118c5e(_0x429619(0x2ee))['Window'][_0x429619(0x3a4)]();_0x3ab898[_0x429619(0x91f)]();if(_0x142273)_0x357a80(_0x3ff923[_0x429619(0x3c1)]['bind'](_0x3ff923),0x190);}}else return VisuMZ['CoreEngine'][_0x429619(0x2be)][_0x429619(0x330)](this,_0x5d7377);},Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2fd)]=function(_0x21ee3e){const _0x34d815=_0x9eb9ae,_0x258f08=this[_0x34d815(0x4d5)](_0x21ee3e),_0x2c9104=this[_0x34d815(0x8be)](_0x21ee3e),_0x48570d=this['targetEvaRate'](_0x21ee3e);return _0x258f08*(_0x2c9104-_0x48570d);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x43e)]=Game_Action['prototype'][_0x9eb9ae(0x2bc)],Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2bc)]=function(_0x59ff14){const _0x52a9d5=_0x9eb9ae;if(VisuMZ[_0x52a9d5(0x68b)][_0x52a9d5(0x1dc)]['QoL']['ImprovedAccuracySystem']){if(_0x52a9d5(0x76c)==='kjwyp')return 0x0;else{var _0x189f57=_0x20c8f1-2.25/2.75;return 7.5625*_0x189f57*_0x189f57+0.9375;}}else{if(_0x52a9d5(0x719)!=='CvlmU'){if(this['_mode']===_0x52a9d5(0x619)&&!_0x4427d9[_0x52a9d5(0x3ae)]())return;if(_0x450230['isNumpadPressed']())return;_0x1d122b[_0x52a9d5(0x68b)][_0x52a9d5(0x35a)][_0x52a9d5(0x330)](this,_0x3c8282),this['switchModes'](_0x52a9d5(0xfc));}else return VisuMZ[_0x52a9d5(0x68b)]['Game_Action_itemEva'][_0x52a9d5(0x330)](this,_0x59ff14);}},Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4d5)]=function(_0x1cc214){const _0x4a05b7=_0x9eb9ae;return this[_0x4a05b7(0x6dc)]()[_0x4a05b7(0x17a)]*0.01;},Game_Action['prototype'][_0x9eb9ae(0x8be)]=function(_0x43fdf9){const _0x3dae4c=_0x9eb9ae;if(VisuMZ[_0x3dae4c(0x68b)]['Settings'][_0x3dae4c(0x2c7)]['AccuracyBoost']&&this['isItem']())return 0x1;if(this['isPhysical']()){if(VisuMZ[_0x3dae4c(0x68b)][_0x3dae4c(0x1dc)][_0x3dae4c(0x2c7)][_0x3dae4c(0x629)]&&this[_0x3dae4c(0x2ae)]()['isActor']()){if(_0x3dae4c(0x6c2)===_0x3dae4c(0x6c2))return this[_0x3dae4c(0x2ae)]()[_0x3dae4c(0x28d)]+0.05;else{const _0x13be00=_0x4d2dd8['CoreEngine'][_0x3dae4c(0x1dc)][_0x3dae4c(0x726)];if(!_0x13be00)return![];if(_0x1090e3[_0x3dae4c(0x44b)]>=_0x3dae4c(0x1d3)&&!_0x13be00[_0x3dae4c(0x816)])return![];return _0x13be00[_0x3dae4c(0x3db)];}}else return this[_0x3dae4c(0x2ae)]()[_0x3dae4c(0x28d)];}else return 0x1;},Game_Action['prototype'][_0x9eb9ae(0x267)]=function(_0x1e21e0){const _0x22a624=_0x9eb9ae;if(this['subject']()[_0x22a624(0x736)]()===_0x1e21e0[_0x22a624(0x736)]())return 0x0;if(this[_0x22a624(0x679)]())return VisuMZ['CoreEngine'][_0x22a624(0x1dc)][_0x22a624(0x2c7)][_0x22a624(0x629)]&&_0x1e21e0[_0x22a624(0x394)]()?_0x1e21e0[_0x22a624(0x443)]-0.05:_0x22a624(0x506)!==_0x22a624(0x506)?_0x2fdd1a[_0x22a624(0x2d8)]['NumberRect'][_0x22a624(0x330)](this):_0x1e21e0[_0x22a624(0x443)];else{if(this[_0x22a624(0x4f1)]()){if(_0x22a624(0x1a6)!==_0x22a624(0x491))return _0x1e21e0[_0x22a624(0x205)];else{var _0x5ab54b=_0x168690(_0x1f6bf3['$1']);_0xa8ac25+=_0x5ab54b;}}else return 0x0;}},VisuMZ[_0x9eb9ae(0x68b)]['Game_Action_updateLastTarget']=Game_Action[_0x9eb9ae(0x61d)]['updateLastTarget'],Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x37e)]=function(_0x17d541){const _0x12eec3=_0x9eb9ae;VisuMZ['CoreEngine'][_0x12eec3(0x8a2)][_0x12eec3(0x330)](this,_0x17d541);if(VisuMZ[_0x12eec3(0x68b)][_0x12eec3(0x1dc)][_0x12eec3(0x2c7)][_0x12eec3(0x547)])return;const _0x830ef=_0x17d541[_0x12eec3(0x698)]();if(_0x830ef[_0x12eec3(0x481)]){if(0x1-this['itemEva'](_0x17d541)>this[_0x12eec3(0x178)](_0x17d541)){if(_0x12eec3(0x163)===_0x12eec3(0x163))_0x830ef[_0x12eec3(0x481)]=![],_0x830ef[_0x12eec3(0x5c4)]=!![];else return _0x23c960[_0x12eec3(0x3ed)](_0x12eec3(0x5df));}}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x11f)]=Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6bc)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x3fbe40=_0x9eb9ae;this['_cache']={},VisuMZ[_0x3fbe40(0x68b)]['Game_BattlerBase_initMembers']['call'](this);},VisuMZ['CoreEngine'][_0x9eb9ae(0x671)]=Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x87f)],Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x87f)]=function(){const _0x30d221=_0x9eb9ae;this['_cache']={},VisuMZ[_0x30d221(0x68b)][_0x30d221(0x671)][_0x30d221(0x330)](this);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x905)]=function(_0x4cca6e){const _0x5e0a79=_0x9eb9ae;return this['_cache']=this['_cache']||{},this[_0x5e0a79(0x48e)][_0x4cca6e]!==undefined;},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x64f)]=function(_0x4745a5){const _0xad5941=_0x9eb9ae,_0x3b3700=(_0x577569,_0x14a4ad)=>{const _0x372b6c=_0x5067;if('NFnfF'!==_0x372b6c(0x688)){if(!_0x14a4ad)return _0x577569;if(_0x14a4ad[_0x372b6c(0x52c)]['match'](VisuMZ[_0x372b6c(0x68b)][_0x372b6c(0x7be)][_0x372b6c(0x64f)][_0x4745a5])){var _0x2e2210=Number(RegExp['$1']);_0x577569+=_0x2e2210;}if(_0x14a4ad[_0x372b6c(0x52c)][_0x372b6c(0x6f5)](VisuMZ[_0x372b6c(0x68b)]['RegExp'][_0x372b6c(0x21e)][_0x4745a5])){var _0x321191=String(RegExp['$1']);try{if('VTrel'!==_0x372b6c(0x3e3))_0x577569+=eval(_0x321191);else{const _0x20623f=this[_0x372b6c(0x8ac)](_0xb0aa2,_0xc51660);_0x20623f[_0x372b6c(0x7c9)][_0x372b6c(0x1e0)](_0x4a995a[_0x163ae7],0x0,0x0,_0x21cd80,_0x13e06c,_0x372b6c(0x7ce)),_0x20623f['x']=(_0x28e4f8-(_0x801ba0['length']-0x1)/0x2)*_0x59d9a8,_0x20623f['dy']=-_0x3f7cb9;}}catch(_0x447b41){if($gameTemp[_0x372b6c(0x8e0)]())console['log'](_0x447b41);}}return _0x577569;}else{var _0xcb49bf=_0x5e14d5(_0x3c6b43['$1'])/0x64;_0x45080f*=_0xcb49bf;}};return this[_0xad5941(0x549)]()['reduce'](_0x3b3700,this[_0xad5941(0x1d1)][_0x4745a5]);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x785)]=function(_0x3990d5){const _0x4882ca=_0x9eb9ae;var _0x3293f4='Basic'+(this['isActor']()?_0x4882ca(0x8c4):_0x4882ca(0x1b2))+_0x4882ca(0x7d9)+_0x3990d5;if(this['checkCacheKey'](_0x3293f4))return this[_0x4882ca(0x48e)][_0x3293f4];this[_0x4882ca(0x48e)][_0x3293f4]=eval(VisuMZ[_0x4882ca(0x68b)][_0x4882ca(0x1dc)]['Param'][_0x3293f4]);const _0xa01af4=(_0x111ce4,_0x48d9ee)=>{const _0x52458c=_0x4882ca;if(!_0x48d9ee)return _0x111ce4;if(_0x48d9ee['note'][_0x52458c(0x6f5)](VisuMZ['CoreEngine']['RegExp'][_0x52458c(0x785)][_0x3990d5])){var _0x549f21=Number(RegExp['$1']);if(_0x549f21===0x0)_0x549f21=Number[_0x52458c(0x331)];_0x111ce4=Math[_0x52458c(0x713)](_0x111ce4,_0x549f21);}if(_0x48d9ee[_0x52458c(0x52c)]['match'](VisuMZ['CoreEngine'][_0x52458c(0x7be)][_0x52458c(0x6ce)][_0x3990d5])){var _0xc1c485=String(RegExp['$1']);try{_0x111ce4=Math[_0x52458c(0x713)](_0x111ce4,Number(eval(_0xc1c485)));}catch(_0x4b5844){if('HgZwV'!==_0x52458c(0x6a3)){if($gameTemp[_0x52458c(0x8e0)]())console[_0x52458c(0x517)](_0x4b5844);}else return _0x116f6b[_0x52458c(0x8ef)]()?this[_0x52458c(0x5fc)]():_0x3c4d93[_0x52458c(0x68b)][_0x52458c(0x2c6)][_0x52458c(0x330)](this);}}return _0x111ce4;};if(this[_0x4882ca(0x48e)][_0x3293f4]===0x0)this[_0x4882ca(0x48e)][_0x3293f4]=Number['MAX_SAFE_INTEGER'];return this[_0x4882ca(0x48e)][_0x3293f4]=this['traitObjects']()[_0x4882ca(0x4e6)](_0xa01af4,this['_cache'][_0x3293f4]),this[_0x4882ca(0x48e)][_0x3293f4];},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6d8)]=function(_0x3e4bba){const _0x4a1ada=_0x9eb9ae,_0x448098=this['traitsPi'](Game_BattlerBase[_0x4a1ada(0x554)],_0x3e4bba),_0x177798=(_0x577fb4,_0x38b87b)=>{const _0x3916dc=_0x4a1ada;if(_0x3916dc(0x1fa)==='esObH')this[_0x3916dc(0x651)]();else{if(!_0x38b87b)return _0x577fb4;if(_0x38b87b[_0x3916dc(0x52c)][_0x3916dc(0x6f5)](VisuMZ['CoreEngine']['RegExp'][_0x3916dc(0x42b)][_0x3e4bba])){var _0x33929b=Number(RegExp['$1'])/0x64;_0x577fb4*=_0x33929b;}if(_0x38b87b[_0x3916dc(0x52c)][_0x3916dc(0x6f5)](VisuMZ['CoreEngine'][_0x3916dc(0x7be)]['paramRate2'][_0x3e4bba])){if(_0x3916dc(0x6da)!==_0x3916dc(0x6da))this[_0x3916dc(0x5fd)]=![],this[_0x3916dc(0x245)]=0x0,this['x']=_0x2913f2['width']*0xa,this['y']=_0x14d703['height']*0xa;else{var _0x33929b=Number(RegExp['$1']);_0x577fb4*=_0x33929b;}}if(_0x38b87b[_0x3916dc(0x52c)][_0x3916dc(0x6f5)](VisuMZ[_0x3916dc(0x68b)]['RegExp'][_0x3916dc(0x278)][_0x3e4bba])){var _0xb0c7f1=String(RegExp['$1']);try{_0x577fb4*=eval(_0xb0c7f1);}catch(_0x19229c){if($gameTemp[_0x3916dc(0x8e0)]())console[_0x3916dc(0x517)](_0x19229c);}}return _0x577fb4;}};return this[_0x4a1ada(0x549)]()[_0x4a1ada(0x4e6)](_0x177798,_0x448098);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c1)]=function(_0x36f97a){const _0x1e1a52=_0x9eb9ae,_0xb49034=(_0x2aa1dc,_0x1df5fc)=>{const _0x69f0b7=_0x5067;if(!_0x1df5fc)return _0x2aa1dc;if(_0x1df5fc[_0x69f0b7(0x52c)][_0x69f0b7(0x6f5)](VisuMZ[_0x69f0b7(0x68b)]['RegExp'][_0x69f0b7(0x2e1)][_0x36f97a])){if(_0x69f0b7(0x672)!==_0x69f0b7(0x672)){let _0x3d98d4=_0x3d5e01[_0x69f0b7(0x544)],_0x70badf=_0x3d98d4[_0x69f0b7(0x631)];for(let _0x5a48a4=0x0;_0x5a48a4<_0x70badf;++_0x5a48a4){this[_0x69f0b7(0x181)][_0x69f0b7(0x421)](_0x3d98d4[_0x5a48a4])?_0x1b351a[_0x69f0b7(0x289)]():_0x4081a9[_0x69f0b7(0x3bc)]();}_0xd87d51[_0x69f0b7(0x889)]();}else{var _0x388dde=Number(RegExp['$1']);_0x2aa1dc+=_0x388dde;}}if(_0x1df5fc[_0x69f0b7(0x52c)][_0x69f0b7(0x6f5)](VisuMZ['CoreEngine'][_0x69f0b7(0x7be)]['paramFlatJS'][_0x36f97a])){if(_0x69f0b7(0x196)===_0x69f0b7(0x196)){var _0x595a99=String(RegExp['$1']);try{if(_0x69f0b7(0x8b0)!==_0x69f0b7(0x8b0)){const _0x4aee6d=_0x51a83b[_0x69f0b7(0x6cc)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x69f0b7(0x1e0)](_0x121fdf[_0x69f0b7(0x6cc)](),_0x419818,_0x492c68,_0x342f94);}else _0x2aa1dc+=eval(_0x595a99);}catch(_0x20a071){if($gameTemp[_0x69f0b7(0x8e0)]())console[_0x69f0b7(0x517)](_0x20a071);}}else return 0xc0;}return _0x2aa1dc;};return this[_0x1e1a52(0x549)]()[_0x1e1a52(0x4e6)](_0xb49034,0x0);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x28b)]=function(_0x41ddc8){const _0x350eff=_0x9eb9ae;let _0x4e178b=_0x350eff(0x28b)+_0x41ddc8+_0x350eff(0x2a1);if(this['checkCacheKey'](_0x4e178b))return this[_0x350eff(0x48e)][_0x4e178b];return this['_cache'][_0x4e178b]=Math[_0x350eff(0x74b)](VisuMZ[_0x350eff(0x68b)]['Settings'][_0x350eff(0x5bb)][_0x350eff(0x5fa)][_0x350eff(0x330)](this,_0x41ddc8)),this[_0x350eff(0x48e)][_0x4e178b];},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x90f)]=function(_0x33211f){const _0x2e1142=_0x9eb9ae,_0x1302f0=(_0x3baa93,_0x4070cb)=>{const _0x3f2000=_0x5067;if(!_0x4070cb)return _0x3baa93;if(_0x4070cb[_0x3f2000(0x52c)][_0x3f2000(0x6f5)](VisuMZ[_0x3f2000(0x68b)][_0x3f2000(0x7be)]['xparamPlus1'][_0x33211f])){var _0x48ca1f=Number(RegExp['$1'])/0x64;_0x3baa93+=_0x48ca1f;}if(_0x4070cb[_0x3f2000(0x52c)][_0x3f2000(0x6f5)](VisuMZ[_0x3f2000(0x68b)][_0x3f2000(0x7be)][_0x3f2000(0x2bf)][_0x33211f])){if('YdBsH'!==_0x3f2000(0x745))return _0x39d72f[_0x3f2000(0x68b)][_0x3f2000(0x3b0)][_0x3f2000(0x330)](this,_0x9f92c0,_0x61620c);else{var _0x48ca1f=Number(RegExp['$1']);_0x3baa93+=_0x48ca1f;}}if(_0x4070cb[_0x3f2000(0x52c)]['match'](VisuMZ['CoreEngine'][_0x3f2000(0x7be)][_0x3f2000(0x503)][_0x33211f])){var _0x445027=String(RegExp['$1']);try{if(_0x3f2000(0x2a2)!=='ZTcnD')_0x3baa93+=eval(_0x445027);else return _0x576094[_0x3f2000(0x68b)][_0x3f2000(0x6ab)][_0x3f2000(0x330)](this)||this[_0x3f2000(0x13e)]();}catch(_0x2b2a1e){if($gameTemp[_0x3f2000(0x8e0)]())console['log'](_0x2b2a1e);}}return _0x3baa93;};return this[_0x2e1142(0x549)]()[_0x2e1142(0x4e6)](_0x1302f0,0x0);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cb)]=function(_0x3526e4){const _0x20535a=_0x9eb9ae,_0x37b6e7=(_0x42f8e2,_0x9632a5)=>{const _0x5819fc=_0x5067;if('MwEzj'===_0x5819fc(0x246)){if(!_0x9632a5)return _0x42f8e2;if(_0x9632a5[_0x5819fc(0x52c)]['match'](VisuMZ[_0x5819fc(0x68b)][_0x5819fc(0x7be)][_0x5819fc(0x1f7)][_0x3526e4])){var _0x11350e=Number(RegExp['$1'])/0x64;_0x42f8e2*=_0x11350e;}if(_0x9632a5['note'][_0x5819fc(0x6f5)](VisuMZ[_0x5819fc(0x68b)]['RegExp'][_0x5819fc(0x248)][_0x3526e4])){var _0x11350e=Number(RegExp['$1']);_0x42f8e2*=_0x11350e;}if(_0x9632a5[_0x5819fc(0x52c)][_0x5819fc(0x6f5)](VisuMZ[_0x5819fc(0x68b)][_0x5819fc(0x7be)][_0x5819fc(0x536)][_0x3526e4])){if('lzbxl'!==_0x5819fc(0x8dd)){var _0xe0bd83=String(RegExp['$1']);try{_0x42f8e2*=eval(_0xe0bd83);}catch(_0x514c40){if($gameTemp[_0x5819fc(0x8e0)]())console[_0x5819fc(0x517)](_0x514c40);}}else{if(this['_movementDuration']<=0x0)return;const _0x32c5e0=this[_0x5819fc(0x7a8)],_0x31bb42=this[_0x5819fc(0x565)],_0x4e5399=this[_0x5819fc(0x12a)];this[_0x5819fc(0x90a)]=this[_0x5819fc(0x65c)](this[_0x5819fc(0x90a)],this[_0x5819fc(0x4c6)],_0x32c5e0,_0x31bb42,_0x4e5399),this['_offsetY']=this['applyEasing'](this[_0x5819fc(0x8db)],this[_0x5819fc(0x16c)],_0x32c5e0,_0x31bb42,_0x4e5399),this[_0x5819fc(0x7a8)]--;if(this['_movementDuration']<=0x0)this[_0x5819fc(0x3de)]();}}return _0x42f8e2;}else _0x1c6a76[_0x5819fc(0x68b)]['Window_NumberInput_start'][_0x5819fc(0x330)](this),this[_0x5819fc(0x7a9)](this[_0x5819fc(0x69b)]-0x1),_0x5a0ed3[_0x5819fc(0x889)]();};return this[_0x20535a(0x549)]()['reduce'](_0x37b6e7,0x1);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x687)]=function(_0x1309c7){const _0x4dea8c=_0x9eb9ae,_0x1412cd=(_0x243ecb,_0x580ba4)=>{const _0x5ae2ff=_0x5067;if(!_0x580ba4)return _0x243ecb;if(_0x580ba4[_0x5ae2ff(0x52c)][_0x5ae2ff(0x6f5)](VisuMZ[_0x5ae2ff(0x68b)][_0x5ae2ff(0x7be)][_0x5ae2ff(0x4d1)][_0x1309c7])){if('mNlml'===_0x5ae2ff(0x7a6)){_0x4c2249-=_0x12ad20;if(_0x333b0c<=0x0)_0x3f8ab0=0x0;this['smoothSelect'](_0xc74bef);}else{var _0x4435c9=Number(RegExp['$1'])/0x64;_0x243ecb+=_0x4435c9;}}if(_0x580ba4[_0x5ae2ff(0x52c)]['match'](VisuMZ[_0x5ae2ff(0x68b)][_0x5ae2ff(0x7be)][_0x5ae2ff(0x4f6)][_0x1309c7])){var _0x4435c9=Number(RegExp['$1']);_0x243ecb+=_0x4435c9;}if(_0x580ba4['note'][_0x5ae2ff(0x6f5)](VisuMZ[_0x5ae2ff(0x68b)]['RegExp'][_0x5ae2ff(0x699)][_0x1309c7])){var _0x402c20=String(RegExp['$1']);try{if(_0x5ae2ff(0x254)!==_0x5ae2ff(0x254))return _0x5b9d4f=_0x3f0cb4[_0x5ae2ff(0x8da)](/(\d)/gi,(_0x41aa6b,_0x41715f)=>_0x5ae2ff(0x8c0)[_0x5ae2ff(0x468)](_0x3b0423(_0x41715f))),_0x5ae2ff(0x522)[_0x5ae2ff(0x468)](_0x37a120,_0x4db757,_0x3a649c);else _0x243ecb+=eval(_0x402c20);}catch(_0x516330){if('FPMEB'===_0x5ae2ff(0x4c7)){if(_0x43e4d1[_0x5ae2ff(0x4b2)]!==_0x4389ad)return _0x3547c9['_forcedBattleSys'];if(this[_0x5ae2ff(0x649)]===_0x4a1782)this[_0x5ae2ff(0x535)]();if(this['_CoreEngineSettings'][_0x5ae2ff(0x2b1)]===_0x1d8514)this[_0x5ae2ff(0x12b)]();return this[_0x5ae2ff(0x649)][_0x5ae2ff(0x2b1)];}else{if($gameTemp[_0x5ae2ff(0x8e0)]())console[_0x5ae2ff(0x517)](_0x516330);}}}return _0x243ecb;};return this['traitObjects']()[_0x4dea8c(0x4e6)](_0x1412cd,0x0);},Game_BattlerBase[_0x9eb9ae(0x61d)]['xparam']=function(_0x345277){const _0x4770eb=_0x9eb9ae;let _0x5a3af6=_0x4770eb(0x3b8)+_0x345277+_0x4770eb(0x2a1);if(this[_0x4770eb(0x905)](_0x5a3af6))return this[_0x4770eb(0x48e)][_0x5a3af6];return this[_0x4770eb(0x48e)][_0x5a3af6]=VisuMZ[_0x4770eb(0x68b)][_0x4770eb(0x1dc)][_0x4770eb(0x5bb)][_0x4770eb(0x733)][_0x4770eb(0x330)](this,_0x345277),this[_0x4770eb(0x48e)][_0x5a3af6];},Game_BattlerBase['prototype'][_0x9eb9ae(0x768)]=function(_0x51761a){const _0x1d9758=_0x9eb9ae,_0x483daf=(_0x2e6546,_0x27ff9b)=>{const _0x39eae5=_0x5067;if(!_0x27ff9b)return _0x2e6546;if(_0x27ff9b['note'][_0x39eae5(0x6f5)](VisuMZ['CoreEngine']['RegExp'][_0x39eae5(0x42e)][_0x51761a])){var _0x34b455=Number(RegExp['$1'])/0x64;_0x2e6546+=_0x34b455;}if(_0x27ff9b[_0x39eae5(0x52c)][_0x39eae5(0x6f5)](VisuMZ[_0x39eae5(0x68b)][_0x39eae5(0x7be)][_0x39eae5(0x13a)][_0x51761a])){var _0x34b455=Number(RegExp['$1']);_0x2e6546+=_0x34b455;}if(_0x27ff9b['note']['match'](VisuMZ[_0x39eae5(0x68b)][_0x39eae5(0x7be)][_0x39eae5(0x615)][_0x51761a])){var _0x3814ed=String(RegExp['$1']);try{_0x39eae5(0x6a0)!==_0x39eae5(0x6a0)?this['initialize'](...arguments):_0x2e6546+=eval(_0x3814ed);}catch(_0x91ad33){if($gameTemp[_0x39eae5(0x8e0)]())console['log'](_0x91ad33);}}return _0x2e6546;};return this[_0x1d9758(0x549)]()[_0x1d9758(0x4e6)](_0x483daf,0x0);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x478)]=function(_0x143852){const _0x26a6b3=_0x9eb9ae,_0x3b0ab6=(_0x346020,_0x1ea3c4)=>{const _0x1f6d18=_0x5067;if(!_0x1ea3c4)return _0x346020;if(_0x1ea3c4['note'][_0x1f6d18(0x6f5)](VisuMZ[_0x1f6d18(0x68b)][_0x1f6d18(0x7be)][_0x1f6d18(0x77d)][_0x143852])){var _0x51ca3d=Number(RegExp['$1'])/0x64;_0x346020*=_0x51ca3d;}if(_0x1ea3c4[_0x1f6d18(0x52c)][_0x1f6d18(0x6f5)](VisuMZ[_0x1f6d18(0x68b)][_0x1f6d18(0x7be)][_0x1f6d18(0x79f)][_0x143852])){var _0x51ca3d=Number(RegExp['$1']);_0x346020*=_0x51ca3d;}if(_0x1ea3c4[_0x1f6d18(0x52c)][_0x1f6d18(0x6f5)](VisuMZ[_0x1f6d18(0x68b)][_0x1f6d18(0x7be)][_0x1f6d18(0x87b)][_0x143852])){var _0x4da7b5=String(RegExp['$1']);try{_0x346020*=eval(_0x4da7b5);}catch(_0x15e00d){if($gameTemp[_0x1f6d18(0x8e0)]())console['log'](_0x15e00d);}}return _0x346020;};return this[_0x26a6b3(0x549)]()[_0x26a6b3(0x4e6)](_0x3b0ab6,0x1);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x915)]=function(_0x11286b){const _0xd4210d=_0x9eb9ae,_0x7736fd=(_0x1ccea7,_0x40d3dd)=>{const _0x5747fb=_0x5067;if(!_0x40d3dd)return _0x1ccea7;if(_0x40d3dd['note'][_0x5747fb(0x6f5)](VisuMZ[_0x5747fb(0x68b)][_0x5747fb(0x7be)]['sparamFlat1'][_0x11286b])){var _0x57b7bc=Number(RegExp['$1'])/0x64;_0x1ccea7+=_0x57b7bc;}if(_0x40d3dd[_0x5747fb(0x52c)][_0x5747fb(0x6f5)](VisuMZ['CoreEngine']['RegExp'][_0x5747fb(0x815)][_0x11286b])){var _0x57b7bc=Number(RegExp['$1']);_0x1ccea7+=_0x57b7bc;}if(_0x40d3dd[_0x5747fb(0x52c)]['match'](VisuMZ[_0x5747fb(0x68b)][_0x5747fb(0x7be)]['sparamFlatJS'][_0x11286b])){var _0x2b9a28=String(RegExp['$1']);try{_0x5747fb(0x8e5)===_0x5747fb(0x8e5)?_0x1ccea7+=eval(_0x2b9a28):this[_0x5747fb(0x4a7)](0x0);}catch(_0x218dbe){if(_0x5747fb(0x447)!==_0x5747fb(0x430)){if($gameTemp[_0x5747fb(0x8e0)]())console['log'](_0x218dbe);}else{var _0x64705c=_0x1af9d4(_0x1fc44a['$1']);_0x95a0cc*=_0x64705c;}}}return _0x1ccea7;};return this[_0xd4210d(0x549)]()[_0xd4210d(0x4e6)](_0x7736fd,0x0);},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ee)]=function(_0x250205){const _0x39aac2=_0x9eb9ae;let _0x515f81=_0x39aac2(0x1ee)+_0x250205+'Total';if(this[_0x39aac2(0x905)](_0x515f81))return this['_cache'][_0x515f81];return this[_0x39aac2(0x48e)][_0x515f81]=VisuMZ[_0x39aac2(0x68b)][_0x39aac2(0x1dc)]['Param'][_0x39aac2(0x312)][_0x39aac2(0x330)](this,_0x250205),this[_0x39aac2(0x48e)][_0x515f81];},Game_BattlerBase['prototype'][_0x9eb9ae(0x4a0)]=function(_0x292be7,_0x1bf503){const _0x2b399f=_0x9eb9ae;if(typeof paramId===_0x2b399f(0x609))return this[_0x2b399f(0x28b)](_0x292be7);_0x292be7=String(_0x292be7||'')[_0x2b399f(0x88e)]();if(_0x292be7==='MAXHP')return this[_0x2b399f(0x28b)](0x0);if(_0x292be7==='MAXMP')return this['param'](0x1);if(_0x292be7===_0x2b399f(0x6c0))return this[_0x2b399f(0x28b)](0x2);if(_0x292be7===_0x2b399f(0x4fd))return this[_0x2b399f(0x28b)](0x3);if(_0x292be7===_0x2b399f(0x25c))return this['param'](0x4);if(_0x292be7===_0x2b399f(0x3c4))return this['param'](0x5);if(_0x292be7===_0x2b399f(0x621))return this[_0x2b399f(0x28b)](0x6);if(_0x292be7===_0x2b399f(0x78f))return this[_0x2b399f(0x28b)](0x7);if(_0x292be7===_0x2b399f(0x879))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x292be7===_0x2b399f(0x1dd))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x1)*0x64))+'%':this[_0x2b399f(0x3b8)](0x1);if(_0x292be7===_0x2b399f(0x48c))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x2)*0x64))+'%':this[_0x2b399f(0x3b8)](0x2);if(_0x292be7===_0x2b399f(0x200))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x3)*0x64))+'%':this[_0x2b399f(0x3b8)](0x3);if(_0x292be7===_0x2b399f(0x897))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this['xparam'](0x4)*0x64))+'%':this[_0x2b399f(0x3b8)](0x4);if(_0x292be7===_0x2b399f(0x727))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x5)*0x64))+'%':this[_0x2b399f(0x3b8)](0x5);if(_0x292be7===_0x2b399f(0x201))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x6)*0x64))+'%':this[_0x2b399f(0x3b8)](0x6);if(_0x292be7===_0x2b399f(0x4bf))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x7)*0x64))+'%':this[_0x2b399f(0x3b8)](0x7);if(_0x292be7===_0x2b399f(0x685))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x3b8)](0x8)*0x64))+'%':this[_0x2b399f(0x3b8)](0x8);if(_0x292be7===_0x2b399f(0x883))return _0x1bf503?String(Math['round'](this[_0x2b399f(0x3b8)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x292be7===_0x2b399f(0x4aa))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this['sparam'](0x0)*0x64))+'%':this[_0x2b399f(0x1ee)](0x0);if(_0x292be7===_0x2b399f(0x5da))return _0x1bf503?String(Math['round'](this['sparam'](0x1)*0x64))+'%':this[_0x2b399f(0x1ee)](0x1);if(_0x292be7===_0x2b399f(0x5d9))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x1ee)](0x2)*0x64))+'%':this[_0x2b399f(0x1ee)](0x2);if(_0x292be7===_0x2b399f(0x2a6))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x1ee)](0x3)*0x64))+'%':this[_0x2b399f(0x1ee)](0x3);if(_0x292be7===_0x2b399f(0x1ac))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x1ee)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x292be7===_0x2b399f(0x5cd))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x1ee)](0x5)*0x64))+'%':this[_0x2b399f(0x1ee)](0x5);if(_0x292be7==='PDR')return _0x1bf503?String(Math[_0x2b399f(0x74b)](this['sparam'](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x292be7===_0x2b399f(0x2b9))return _0x1bf503?String(Math['round'](this['sparam'](0x7)*0x64))+'%':this[_0x2b399f(0x1ee)](0x7);if(_0x292be7===_0x2b399f(0x1b7))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this[_0x2b399f(0x1ee)](0x8)*0x64))+'%':this[_0x2b399f(0x1ee)](0x8);if(_0x292be7===_0x2b399f(0x902))return _0x1bf503?String(Math[_0x2b399f(0x74b)](this['sparam'](0x9)*0x64))+'%':this[_0x2b399f(0x1ee)](0x9);if(VisuMZ[_0x2b399f(0x68b)][_0x2b399f(0x5aa)][_0x292be7]){if(_0x2b399f(0x55a)===_0x2b399f(0x29a)){const _0x1a244a=this['paramX']()-this[_0x2b399f(0x5d3)]()*0x2;this[_0x2b399f(0x5d6)](_0x5a42f8,_0x4d670b,_0x1a244a,_0x5cf9df,![]);}else{const _0x5882d2=VisuMZ[_0x2b399f(0x68b)][_0x2b399f(0x5aa)][_0x292be7],_0x514da9=this[_0x5882d2];if(VisuMZ[_0x2b399f(0x68b)]['CustomParamType'][_0x292be7]===_0x2b399f(0x30b))return _0x514da9;else{if(_0x2b399f(0x75a)===_0x2b399f(0x75a))return _0x1bf503?String(Math[_0x2b399f(0x74b)](_0x514da9*0x64))+'%':_0x514da9;else this[_0x2b399f(0x4b2)]=0x0;}}}return'';},Game_BattlerBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x580)]=function(){const _0x3b0809=_0x9eb9ae;return this[_0x3b0809(0x6b9)]()&&this[_0x3b0809(0x7b4)]<this['mhp']*VisuMZ[_0x3b0809(0x68b)][_0x3b0809(0x1dc)]['Param']['CrisisRate'];},Game_Battler['prototype'][_0x9eb9ae(0x6ed)]=function(){const _0x20ca5e=_0x9eb9ae;SoundManager['playMiss'](),this[_0x20ca5e(0x38c)](_0x20ca5e(0x8ad));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x849)]=Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x310)],Game_Actor[_0x9eb9ae(0x61d)]['paramBase']=function(_0x5d9427){const _0x3763bb=_0x9eb9ae;if(this[_0x3763bb(0x3a3)]>0x63)return this['paramBaseAboveLevel99'](_0x5d9427);return VisuMZ['CoreEngine']['Game_Actor_paramBase'][_0x3763bb(0x330)](this,_0x5d9427);},Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x70b)]=function(_0x5eb873){const _0x4718c1=_0x9eb9ae,_0x5f2c56=this['currentClass']()[_0x4718c1(0x276)][_0x5eb873][0x63],_0x1dde8e=this['currentClass']()[_0x4718c1(0x276)][_0x5eb873][0x62];return _0x5f2c56+(_0x5f2c56-_0x1dde8e)*(this[_0x4718c1(0x3a3)]-0x63);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x4ec)]=Game_Actor[_0x9eb9ae(0x61d)]['changeClass'],Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3a6)]=function(_0x19ddf0,_0x50ed2a){const _0x1f9b09=_0x9eb9ae;$gameTemp[_0x1f9b09(0x791)]=!![],VisuMZ[_0x1f9b09(0x68b)][_0x1f9b09(0x4ec)][_0x1f9b09(0x330)](this,_0x19ddf0,_0x50ed2a),$gameTemp[_0x1f9b09(0x791)]=undefined;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x162)]=Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x659)],Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x659)]=function(){const _0xcf0a1d=_0x9eb9ae;VisuMZ[_0xcf0a1d(0x68b)][_0xcf0a1d(0x162)]['call'](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor['prototype'][_0x9eb9ae(0x6f8)]=function(){const _0x281d1e=_0x9eb9ae;this[_0x281d1e(0x48e)]={};if(VisuMZ[_0x281d1e(0x68b)]['Settings']['QoL'][_0x281d1e(0x7ff)])this['_hp']=this[_0x281d1e(0x662)];if(VisuMZ['CoreEngine'][_0x281d1e(0x1dc)][_0x281d1e(0x2c7)]['LevelUpFullMp'])this[_0x281d1e(0x208)]=this[_0x281d1e(0x60a)];},Game_Actor['prototype'][_0x9eb9ae(0x534)]=function(){const _0x260785=_0x9eb9ae;if(this[_0x260785(0x3b7)]())return 0x1;const _0x2c0437=this['nextLevelExp']()-this[_0x260785(0x7ae)](),_0x3edbd7=this['currentExp']()-this[_0x260785(0x7ae)]();return(_0x3edbd7/_0x2c0437)[_0x260785(0x739)](0x0,0x1);},Game_Actor[_0x9eb9ae(0x61d)]['traitObjects']=function(){const _0x49c852=_0x9eb9ae,_0x595134=Game_Battler[_0x49c852(0x61d)][_0x49c852(0x549)]['call'](this);for(const _0x11d0f6 of this['equips']()){if(_0x49c852(0x7b7)===_0x49c852(0x8b2))return _0x48f71c['mainFontSize']()-0x8;else{if(_0x11d0f6){if(_0x49c852(0x49b)!==_0x49c852(0x232))_0x595134['push'](_0x11d0f6);else{if(_0x4adf6a)_0x3588c5['ParseStateNotetags'](_0x5765ac);}}}}return _0x595134['push'](this[_0x49c852(0x3b5)](),this['actor']()),_0x595134;},Object[_0x9eb9ae(0x375)](Game_Enemy[_0x9eb9ae(0x61d)],'level',{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy['prototype'][_0x9eb9ae(0x873)]=function(){const _0xfd22f9=_0x9eb9ae;return this[_0xfd22f9(0x4d2)]()[_0xfd22f9(0x3a3)];},Game_Enemy[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1c5)]=function(){const _0x173790=_0x9eb9ae;!this[_0x173790(0x645)]&&(this[_0x173790(0x53e)]+=Math[_0x173790(0x74b)]((Graphics['height']-0x270)/0x2),this[_0x173790(0x53e)]-=Math[_0x173790(0x83f)]((Graphics[_0x173790(0x71d)]-Graphics[_0x173790(0x18a)])/0x2),$gameSystem['isSideView']()?_0x173790(0x3af)!==_0x173790(0x3af)?_0x29764a['CoreEngine']['Window_Selectable_processCursorMove'][_0x173790(0x330)](this):this['_screenX']-=Math[_0x173790(0x83f)]((Graphics[_0x173790(0x792)]-Graphics[_0x173790(0x57c)])/0x2):this[_0x173790(0x76d)]+=Math[_0x173790(0x74b)]((Graphics[_0x173790(0x57c)]-0x330)/0x2)),this[_0x173790(0x645)]=!![];},Game_Party[_0x9eb9ae(0x61d)]['maxGold']=function(){const _0x3c88b3=_0x9eb9ae;return VisuMZ[_0x3c88b3(0x68b)][_0x3c88b3(0x1dc)][_0x3c88b3(0x23f)][_0x3c88b3(0x6f4)];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x2d2)]=Game_Party[_0x9eb9ae(0x61d)]['consumeItem'],Game_Party['prototype']['consumeItem']=function(_0xf31db){const _0x53b5cf=_0x9eb9ae;if(VisuMZ[_0x53b5cf(0x68b)][_0x53b5cf(0x1dc)]['QoL'][_0x53b5cf(0x548)]&&DataManager['isKeyItem'](_0xf31db))return;VisuMZ[_0x53b5cf(0x68b)]['Game_Party_consumeItem']['call'](this,_0xf31db);},Game_Party[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f8)]=function(){const _0x1c1fb8=_0x9eb9ae,_0x40140e=VisuMZ['CoreEngine'][_0x1c1fb8(0x1dc)][_0x1c1fb8(0x2c7)],_0x7d229a=_0x40140e[_0x1c1fb8(0x5af)]??0x63;let _0x383880=[];(_0x40140e[_0x1c1fb8(0x8cd)]??!![])&&(_0x383880=_0x383880[_0x1c1fb8(0x54d)]($dataItems));(_0x40140e['BTestWeapons']??!![])&&(_0x1c1fb8(0x5b8)!==_0x1c1fb8(0x5b8)?(this[_0x1c1fb8(0x17d)]=new _0x1aeb91(_0x28bbf8[_0x1c1fb8(0x19d)](_0x468bfe[_0x1c1fb8(0x13b)])),this[_0x1c1fb8(0x7ca)]=new _0x14977f(_0x1ad20e[_0x1c1fb8(0x54b)](_0xa999e9[_0x1c1fb8(0x422)])),this[_0x1c1fb8(0xf5)](this['_backSprite1']),this[_0x1c1fb8(0xf5)](this['_backSprite2']),this[_0x1c1fb8(0x17d)][_0x1c1fb8(0x7c9)][_0x1c1fb8(0x56f)](this[_0x1c1fb8(0x3c5)][_0x1c1fb8(0x3c8)](this,this[_0x1c1fb8(0x17d)])),this[_0x1c1fb8(0x7ca)][_0x1c1fb8(0x7c9)][_0x1c1fb8(0x56f)](this['adjustSprite'][_0x1c1fb8(0x3c8)](this,this['_backSprite2']))):_0x383880=_0x383880[_0x1c1fb8(0x54d)]($dataWeapons));(_0x40140e[_0x1c1fb8(0x345)]??!![])&&(_0x383880=_0x383880[_0x1c1fb8(0x54d)]($dataArmors));for(const _0x6dc71d of _0x383880){if(_0x1c1fb8(0x494)===_0x1c1fb8(0x494)){if(!_0x6dc71d)continue;if(_0x6dc71d[_0x1c1fb8(0x1e8)]['trim']()<=0x0)continue;if(_0x6dc71d[_0x1c1fb8(0x1e8)][_0x1c1fb8(0x6f5)](/-----/i))continue;this[_0x1c1fb8(0x27f)](_0x6dc71d,_0x7d229a);}else _0x4d9af4['CoreEngine'][_0x1c1fb8(0x6cd)][_0x1c1fb8(0x330)](this,_0x16e690);}},VisuMZ[_0x9eb9ae(0x68b)]['Game_Troop_setup']=Game_Troop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x41e)],Game_Troop[_0x9eb9ae(0x61d)]['setup']=function(_0x8c496c){const _0xb65aa=_0x9eb9ae;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0xb65aa(0x1a7)](_0x8c496c),VisuMZ[_0xb65aa(0x68b)][_0xb65aa(0x2d1)][_0xb65aa(0x330)](this,_0x8c496c);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x54c)]=Game_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x41e)],Game_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x41e)]=function(_0x2e4ce4){const _0x512fc3=_0x9eb9ae;VisuMZ[_0x512fc3(0x68b)][_0x512fc3(0x54c)]['call'](this,_0x2e4ce4),this[_0x512fc3(0x634)](_0x2e4ce4);},Game_Map['prototype']['setupCoreEngine']=function(){const _0x28ae64=_0x9eb9ae;this[_0x28ae64(0x363)]=VisuMZ[_0x28ae64(0x68b)][_0x28ae64(0x1dc)]['QoL'][_0x28ae64(0x10d)]||![];if($dataMap&&$dataMap[_0x28ae64(0x52c)]){if(_0x28ae64(0x82b)!==_0x28ae64(0x82b))_0x3dbf41['clearForcedGameTroopSettingsCoreEngine'](),_0x1c7925[_0x28ae64(0x1a7)](_0x4aba49),_0x296bee[_0x28ae64(0x68b)]['Game_Troop_setup'][_0x28ae64(0x330)](this,_0x542839);else{if($dataMap['note'][_0x28ae64(0x6f5)](/<SHOW TILE SHADOWS>/i))this[_0x28ae64(0x363)]=![];if($dataMap['note']['match'](/<HIDE TILE SHADOWS>/i))this[_0x28ae64(0x363)]=!![];}}},Game_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3ac)]=function(){const _0x1e4796=_0x9eb9ae;if(this[_0x1e4796(0x363)]===undefined)this[_0x1e4796(0x634)]();return this[_0x1e4796(0x363)];},VisuMZ['CoreEngine'][_0x9eb9ae(0x761)]=Game_Character[_0x9eb9ae(0x61d)]['processMoveCommand'],Game_Character[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2c4)]=function(_0x4b5aad){const _0x43ebce=_0x9eb9ae;try{if(_0x43ebce(0x3e2)!==_0x43ebce(0x6dd))VisuMZ[_0x43ebce(0x68b)][_0x43ebce(0x761)][_0x43ebce(0x330)](this,_0x4b5aad);else return _0xe3b20a['mev'];}catch(_0x244838){if($gameTemp[_0x43ebce(0x8e0)]())console[_0x43ebce(0x517)](_0x244838);}},Game_Player['prototype'][_0x9eb9ae(0x334)]=function(){const _0x4bb899=_0x9eb9ae,_0x10ce7d=$gameMap['encounterStep']();this[_0x4bb899(0x695)]=Math[_0x4bb899(0x347)](_0x10ce7d)+Math['randomInt'](_0x10ce7d)+this[_0x4bb899(0x20a)]();},Game_Player[_0x9eb9ae(0x61d)][_0x9eb9ae(0x20a)]=function(){const _0x38dbb4=_0x9eb9ae;return $dataMap&&$dataMap['note']&&$dataMap['note'][_0x38dbb4(0x6f5)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x38dbb4(0x68b)][_0x38dbb4(0x1dc)][_0x38dbb4(0x2c7)][_0x38dbb4(0x420)];},VisuMZ[_0x9eb9ae(0x68b)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype']['isCollidedWithEvents'],Game_Event[_0x9eb9ae(0x61d)][_0x9eb9ae(0x832)]=function(_0x2af062,_0x3fa448){const _0x3c2321=_0x9eb9ae;return this[_0x3c2321(0x790)]()?this[_0x3c2321(0x6e5)](_0x2af062,_0x3fa448):_0x3c2321(0x43a)===_0x3c2321(0x238)?this[_0x3c2321(0x2ae)]()[_0x3c2321(0x28d)]+0.05:VisuMZ[_0x3c2321(0x68b)][_0x3c2321(0x3b0)][_0x3c2321(0x330)](this,_0x2af062,_0x3fa448);},Game_Event[_0x9eb9ae(0x61d)][_0x9eb9ae(0x790)]=function(){const _0x3d70c2=_0x9eb9ae;return VisuMZ[_0x3d70c2(0x68b)][_0x3d70c2(0x1dc)][_0x3d70c2(0x2c7)][_0x3d70c2(0x358)];},Game_Event[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6e5)]=function(_0x4648ad,_0x5e9e66){const _0x34c24b=_0x9eb9ae;if(!this[_0x34c24b(0x8a1)]())return![];else{const _0x3e5912=$gameMap[_0x34c24b(0x5bd)](_0x4648ad,_0x5e9e66)[_0x34c24b(0x641)](_0x3b0b2e=>_0x3b0b2e[_0x34c24b(0x8a1)]());return _0x3e5912['length']>0x0;}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x876)]=Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6eb)],Game_Interpreter['prototype']['command105']=function(_0xfbbd8c){const _0x4f9cc1=_0x9eb9ae,_0x4c03b3=this['getCombinedScrollingText']();if(_0x4c03b3['match'](/\/\/[ ]SCRIPT[ ]CALL/i))return this['runCombinedScrollingTextAsCode'](_0x4c03b3);else{if(_0x4f9cc1(0x2f9)===_0x4f9cc1(0x52e)){var _0x451ca9=_0x1f3174(_0x372d8f['$1']);_0x8b68d+=_0x451ca9;}else return VisuMZ[_0x4f9cc1(0x68b)][_0x4f9cc1(0x876)]['call'](this,_0xfbbd8c);}},Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x188)]=function(){const _0x8422d2=_0x9eb9ae;let _0x4de8e0='',_0x497c6b=this[_0x8422d2(0x223)]+0x1;while(this[_0x8422d2(0x493)][_0x497c6b]&&this[_0x8422d2(0x493)][_0x497c6b][_0x8422d2(0x75c)]===0x195){_0x4de8e0+=this[_0x8422d2(0x493)][_0x497c6b]['parameters'][0x0]+'\x0a',_0x497c6b++;}return _0x4de8e0;},Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x744)]=function(_0x4a8418){const _0x276ad3=_0x9eb9ae;try{eval(_0x4a8418);}catch(_0x3413f1){$gameTemp['isPlaytest']()&&(console['log'](_0x276ad3(0x402)),console[_0x276ad3(0x517)](_0x3413f1));}return!![];},VisuMZ['CoreEngine'][_0x9eb9ae(0x4c8)]=Game_Interpreter[_0x9eb9ae(0x61d)]['command111'],Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1df)]=function(_0x5b0c1f){const _0x5a44c9=_0x9eb9ae;try{VisuMZ[_0x5a44c9(0x68b)][_0x5a44c9(0x4c8)]['call'](this,_0x5b0c1f);}catch(_0x158d3a){if($gameTemp[_0x5a44c9(0x8e0)]()){if('IWnHs'==='IWnHs')console[_0x5a44c9(0x517)](_0x5a44c9(0x126)),console[_0x5a44c9(0x517)](_0x158d3a);else{if(_0x8a226e[_0x5a44c9(0x8b8)]!==_0x4d5163)return _0x2bf556[_0x5a44c9(0x68b)]['UpdatePictureCoordinates']();return _0x5c8325['CoreEngine'][_0x5a44c9(0x229)][_0x5a44c9(0x330)](this);}}this['skipBranch']();}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command122']=Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x523)],Game_Interpreter['prototype']['command122']=function(_0xd08d74){const _0x3437e6=_0x9eb9ae;try{VisuMZ['CoreEngine'][_0x3437e6(0x3da)][_0x3437e6(0x330)](this,_0xd08d74);}catch(_0x2df39c){$gameTemp['isPlaytest']()&&(_0x3437e6(0x7aa)===_0x3437e6(0x197)?(this[_0x3437e6(0x1d5)](_0x289baf),this['centerSprite'](_0xfdcf1d)):(console[_0x3437e6(0x517)](_0x3437e6(0x346)),console[_0x3437e6(0x517)](_0x2df39c)));}return!![];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x4b5)]=Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7ab)],Game_Interpreter[_0x9eb9ae(0x61d)]['command355']=function(){const _0xbb4a1a=_0x9eb9ae;try{VisuMZ[_0xbb4a1a(0x68b)][_0xbb4a1a(0x4b5)]['call'](this);}catch(_0x87e0f0){if($gameTemp[_0xbb4a1a(0x8e0)]()){if(_0xbb4a1a(0x409)==='JAxfr')console[_0xbb4a1a(0x517)](_0xbb4a1a(0x43b)),console[_0xbb4a1a(0x517)](_0x87e0f0);else{if(!this[_0xbb4a1a(0x7c9)])return;if(!this[_0xbb4a1a(0x7c9)]['_customModified'])return;this[_0xbb4a1a(0x7c9)][_0xbb4a1a(0x72d)]&&!this[_0xbb4a1a(0x3a7)][_0xbb4a1a(0x72d)][_0xbb4a1a(0x11a)]&&this[_0xbb4a1a(0x7c9)][_0xbb4a1a(0x1b8)]();}}}return!![];},VisuMZ[_0x9eb9ae(0x68b)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype']['command357'],Game_Interpreter[_0x9eb9ae(0x61d)]['command357']=function(_0x515213){const _0x51d2a0=_0x9eb9ae;return $gameTemp[_0x51d2a0(0x144)](this),VisuMZ[_0x51d2a0(0x68b)]['Game_Interpreter_PluginCommand'][_0x51d2a0(0x330)](this,_0x515213);},Scene_Base['prototype'][_0x9eb9ae(0x701)]=function(){const _0x388063=_0x9eb9ae;return VisuMZ['CoreEngine']['Settings']['UI'][_0x388063(0x63c)];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x207)]=function(){const _0x243194=_0x9eb9ae;return VisuMZ[_0x243194(0x68b)][_0x243194(0x1dc)]['UI']['BottomHelp'];},Scene_Base['prototype']['isBottomButtonMode']=function(){const _0xf83092=_0x9eb9ae;return VisuMZ[_0xf83092(0x68b)][_0xf83092(0x1dc)]['UI'][_0xf83092(0x470)];},Scene_Base[_0x9eb9ae(0x61d)]['isRightInputMode']=function(){return VisuMZ['CoreEngine']['Settings']['UI']['RightMenus'];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x796)]=function(){const _0xb312e5=_0x9eb9ae;return VisuMZ['CoreEngine'][_0xb312e5(0x1dc)]['UI'][_0xb312e5(0x573)];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1b5)]=function(){const _0x2d953d=_0x9eb9ae;return VisuMZ[_0x2d953d(0x68b)][_0x2d953d(0x1dc)]['UI'][_0x2d953d(0xf9)];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3f2)]=function(){const _0x902665=_0x9eb9ae;return VisuMZ[_0x902665(0x68b)][_0x902665(0x1dc)]['Window'][_0x902665(0x40b)];},VisuMZ[_0x9eb9ae(0x68b)]['Scene_Base_createWindowLayer']=Scene_Base[_0x9eb9ae(0x61d)]['createWindowLayer'],Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x660)]=function(){const _0x3e71f7=_0x9eb9ae;VisuMZ[_0x3e71f7(0x68b)]['Scene_Base_createWindowLayer'][_0x3e71f7(0x330)](this),this[_0x3e71f7(0x80e)](),this[_0x3e71f7(0x5a1)]['x']=Math['round'](this[_0x3e71f7(0x5a1)]['x']),this[_0x3e71f7(0x5a1)]['y']=Math[_0x3e71f7(0x74b)](this[_0x3e71f7(0x5a1)]['y']);},Scene_Base['prototype']['createButtonAssistWindow']=function(){},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x892)]=function(){const _0x571bb2=_0x9eb9ae;return TextManager[_0x571bb2(0x1db)](_0x571bb2(0x593),_0x571bb2(0x5c9));},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x822)]=function(){const _0x79f36f=_0x9eb9ae;return TextManager[_0x79f36f(0x3ed)](_0x79f36f(0x36e));},Scene_Base['prototype']['buttonAssistKey3']=function(){const _0x5e29ba=_0x9eb9ae;return TextManager[_0x5e29ba(0x3ed)](_0x5e29ba(0x5df));},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5e1)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x77a)]=function(){const _0x36e7ae=_0x9eb9ae;return TextManager[_0x36e7ae(0x3ed)](_0x36e7ae(0x118));},Scene_Base['prototype'][_0x9eb9ae(0x8d5)]=function(){const _0x1ff648=_0x9eb9ae;if(this[_0x1ff648(0x73d)]&&this[_0x1ff648(0x73d)]['visible'])return _0x1ff648(0x3ea)==='maCgp'?this[_0x1ff648(0x2fd)](_0xd48844):TextManager[_0x1ff648(0x4ac)];else{if(_0x1ff648(0x603)===_0x1ff648(0x8e1)){var _0x4f247e=_0x953496(_0x364e6e['$1']);_0x47cc51*=_0x4f247e;}else return'';}},Scene_Base[_0x9eb9ae(0x61d)]['buttonAssistText2']=function(){return'';},Scene_Base[_0x9eb9ae(0x61d)]['buttonAssistText3']=function(){return'';},Scene_Base['prototype'][_0x9eb9ae(0x8ba)]=function(){const _0x1b9834=_0x9eb9ae;return TextManager[_0x1b9834(0x7da)];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x376)]=function(){const _0xfd098c=_0x9eb9ae;return TextManager[_0xfd098c(0x7db)];},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x348)]=function(){return 0x0;},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x807)]=function(){return 0x0;},Scene_Base[_0x9eb9ae(0x61d)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x82c)]=function(){return 0x0;},Scene_Base['prototype'][_0x9eb9ae(0x772)]=function(){return 0x0;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x258)]=Scene_Boot[_0x9eb9ae(0x61d)]['loadSystemImages'],Scene_Boot[_0x9eb9ae(0x61d)]['loadSystemImages']=function(){const _0x30674c=_0x9eb9ae;VisuMZ[_0x30674c(0x68b)][_0x30674c(0x258)][_0x30674c(0x330)](this),this[_0x30674c(0x61e)]();},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x61e)]=function(){const _0xc9b0ca=_0x9eb9ae,_0x9e9fc6=[_0xc9b0ca(0x2aa),_0xc9b0ca(0x3f9),_0xc9b0ca(0x2f4),_0xc9b0ca(0x37a),'enemies',_0xc9b0ca(0x8fc),_0xc9b0ca(0x564),_0xc9b0ca(0x871),_0xc9b0ca(0x6ff),_0xc9b0ca(0x7e1),_0xc9b0ca(0x6aa),_0xc9b0ca(0x5ff),'titles1',_0xc9b0ca(0x8af)];for(const _0x4cfff0 of _0x9e9fc6){const _0x729885=VisuMZ[_0xc9b0ca(0x68b)][_0xc9b0ca(0x1dc)][_0xc9b0ca(0x828)][_0x4cfff0],_0x553651=_0xc9b0ca(0x2f7)[_0xc9b0ca(0x468)](_0x4cfff0);for(const _0x3d0fd2 of _0x729885){ImageManager[_0xc9b0ca(0x6a2)](_0x553651,_0x3d0fd2);}}},VisuMZ['CoreEngine']['Scene_Boot_startNormalGame']=Scene_Boot[_0x9eb9ae(0x61d)]['startNormalGame'],Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x68d)]=function(){const _0x5f4f95=_0x9eb9ae;if(Utils['isOptionValid'](_0x5f4f95(0x7e7))&&VisuMZ[_0x5f4f95(0x68b)][_0x5f4f95(0x1dc)][_0x5f4f95(0x2c7)][_0x5f4f95(0x12e)])this[_0x5f4f95(0x61b)]();else{if(_0x5f4f95(0x170)==='XHqvF')VisuMZ[_0x5f4f95(0x68b)][_0x5f4f95(0x318)]['call'](this);else{if(_0x1c653b[_0x5f4f95(0x2da)]())return;_0x439109[_0x5f4f95(0x259)](_0x24af06,_0x3b8da7);const _0x24c875=_0x3a9be1['IDs'];for(const _0x2dc865 of _0x24c875){const _0x459c69=_0x3a263c['value'](_0x2dc865);_0x197c2b[_0x5f4f95(0x34f)](_0x2dc865,!_0x459c69);}}}},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x61b)]=function(){const _0x48a135=_0x9eb9ae;DataManager[_0x48a135(0x3e0)](),SceneManager[_0x48a135(0x7cd)](Scene_Map);},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x320)]=function(){const _0x5d0a74=_0x9eb9ae,_0x272a30=$dataSystem['advanced'][_0x5d0a74(0x800)],_0x920735=$dataSystem[_0x5d0a74(0x8a6)][_0x5d0a74(0x38d)],_0x5d16eb=VisuMZ[_0x5d0a74(0x68b)][_0x5d0a74(0x1dc)]['UI'][_0x5d0a74(0x174)];Graphics[_0x5d0a74(0x57c)]=_0x272a30-_0x5d16eb*0x2,Graphics[_0x5d0a74(0x18a)]=_0x920735-_0x5d16eb*0x2,this[_0x5d0a74(0x23d)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x333)]=Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x152)],Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x152)]=function(){const _0x507c9b=_0x9eb9ae;if(this['isFullDocumentTitle']()){if(_0x507c9b(0x2fa)===_0x507c9b(0x728))return 0x0;else this[_0x507c9b(0x556)]();}else VisuMZ['CoreEngine'][_0x507c9b(0x333)][_0x507c9b(0x330)](this);},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x61a)]=function(){const _0x48d095=_0x9eb9ae;if(Scene_Title[_0x48d095(0x8d0)]==='')return![];if(Scene_Title[_0x48d095(0x8d0)]==='Subtitle')return![];if(Scene_Title[_0x48d095(0x311)]==='')return![];if(Scene_Title['version']===_0x48d095(0x57a))return![];return!![];},Scene_Boot[_0x9eb9ae(0x61d)]['makeDocumentTitle']=function(){const _0x5c9864=_0x9eb9ae,_0x2f1d63=$dataSystem[_0x5c9864(0x136)],_0x282fa6=Scene_Title[_0x5c9864(0x8d0)]||'',_0x38dea9=Scene_Title['version']||'',_0x2242c2=VisuMZ['CoreEngine'][_0x5c9864(0x1dc)][_0x5c9864(0x758)][_0x5c9864(0x431)][_0x5c9864(0x8d1)],_0x51458d=_0x2242c2[_0x5c9864(0x468)](_0x2f1d63,_0x282fa6,_0x38dea9);document[_0x5c9864(0x22b)]=_0x51458d;},Scene_Boot[_0x9eb9ae(0x61d)][_0x9eb9ae(0x23d)]=function(){const _0x391496=_0x9eb9ae;if(VisuMZ[_0x391496(0x68b)]['Settings']['UI'][_0x391496(0x4e2)]){if('LTFJp'===_0x391496(0x31c)){const _0x58edca=_0x391496(0x52f);this['_colorCache']=this['_colorCache']||{};if(this[_0x391496(0x3d6)][_0x58edca])return this[_0x391496(0x3d6)][_0x58edca];const _0x4a1c0b=_0x1d2069[_0x391496(0x68b)][_0x391496(0x1dc)][_0x391496(0x867)]['ColorMaxLvGauge2'];return this[_0x391496(0x4ea)](_0x58edca,_0x4a1c0b);}else{const _0x5d9ff4=Graphics[_0x391496(0x792)]-Graphics[_0x391496(0x57c)]-VisuMZ['CoreEngine'][_0x391496(0x1dc)]['UI'][_0x391496(0x174)]*0x2,_0x2ae358=Sprite_Button[_0x391496(0x61d)]['blockWidth'][_0x391496(0x330)](this)*0x4;if(_0x5d9ff4>=_0x2ae358)SceneManager[_0x391496(0x467)](!![]);}}},Scene_Title['subtitle']=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x9eb9ae(0x431)][_0x9eb9ae(0x27e)],Scene_Title[_0x9eb9ae(0x311)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)]['Title'][_0x9eb9ae(0x8df)],Scene_Title[_0x9eb9ae(0xf8)]=VisuMZ['CoreEngine'][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x2b5)],VisuMZ['CoreEngine'][_0x9eb9ae(0x559)]=Scene_Title[_0x9eb9ae(0x61d)][_0x9eb9ae(0x838)],Scene_Title['prototype']['drawGameTitle']=function(){const _0xab2480=_0x9eb9ae;VisuMZ[_0xab2480(0x68b)]['Settings'][_0xab2480(0x758)][_0xab2480(0x431)][_0xab2480(0x838)][_0xab2480(0x330)](this);if(Scene_Title[_0xab2480(0x8d0)]!==''&&Scene_Title[_0xab2480(0x8d0)]!==_0xab2480(0x27e))this[_0xab2480(0x220)]();if(Scene_Title[_0xab2480(0x311)]!==''&&Scene_Title[_0xab2480(0x311)]!==_0xab2480(0x57a))this[_0xab2480(0x498)]();},Scene_Title['prototype'][_0x9eb9ae(0x220)]=function(){const _0x4e07fa=_0x9eb9ae;VisuMZ[_0x4e07fa(0x68b)]['Settings'][_0x4e07fa(0x758)][_0x4e07fa(0x431)][_0x4e07fa(0x220)][_0x4e07fa(0x330)](this);},Scene_Title[_0x9eb9ae(0x61d)][_0x9eb9ae(0x498)]=function(){const _0x28ad60=_0x9eb9ae;VisuMZ[_0x28ad60(0x68b)]['Settings'][_0x28ad60(0x758)][_0x28ad60(0x431)]['drawGameVersion'][_0x28ad60(0x330)](this);},Scene_Title[_0x9eb9ae(0x61d)]['createCommandWindow']=function(){const _0x3981bc=_0x9eb9ae;this['createTitleButtons']();const _0x335b57=$dataSystem[_0x3981bc(0x365)][_0x3981bc(0x100)],_0x1963f5=this[_0x3981bc(0x400)]();this[_0x3981bc(0x218)]=new Window_TitleCommand(_0x1963f5),this['_commandWindow'][_0x3981bc(0x71c)](_0x335b57);const _0x19b7cc=this[_0x3981bc(0x400)]();this['_commandWindow'][_0x3981bc(0x8d9)](_0x19b7cc['x'],_0x19b7cc['y'],_0x19b7cc[_0x3981bc(0x792)],_0x19b7cc[_0x3981bc(0x71d)]),this[_0x3981bc(0x445)](this[_0x3981bc(0x218)]);},Scene_Title[_0x9eb9ae(0x61d)][_0x9eb9ae(0x221)]=function(){const _0x43228d=_0x9eb9ae;if(this[_0x43228d(0x218)]){if(_0x43228d(0x18d)===_0x43228d(0x18d))return this[_0x43228d(0x218)][_0x43228d(0x748)]();else this['isFullDocumentTitle']()?this[_0x43228d(0x556)]():_0x54c55e['CoreEngine'][_0x43228d(0x333)][_0x43228d(0x330)](this);}else return VisuMZ[_0x43228d(0x68b)]['Settings'][_0x43228d(0x140)][_0x43228d(0x631)];},Scene_Title['prototype'][_0x9eb9ae(0x400)]=function(){const _0x2bbc5e=_0x9eb9ae;return VisuMZ[_0x2bbc5e(0x68b)][_0x2bbc5e(0x1dc)][_0x2bbc5e(0x758)][_0x2bbc5e(0x431)][_0x2bbc5e(0x7d7)][_0x2bbc5e(0x330)](this);},Scene_Title[_0x9eb9ae(0x61d)][_0x9eb9ae(0x108)]=function(){const _0x595b9a=_0x9eb9ae;for(const _0x30adae of Scene_Title[_0x595b9a(0xf8)]){const _0x1f6935=new Sprite_TitlePictureButton(_0x30adae);this[_0x595b9a(0xf5)](_0x1f6935);}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x28c)]=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)],Scene_Map['prototype'][_0x9eb9ae(0x7d0)]=function(){const _0x18d044=_0x9eb9ae;VisuMZ[_0x18d044(0x68b)][_0x18d044(0x28c)]['call'](this),$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),this[_0x18d044(0x81e)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x820)]=Scene_Map[_0x9eb9ae(0x61d)]['updateMainMultiply'],Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x79e)]=function(){const _0x23bb50=_0x9eb9ae;VisuMZ[_0x23bb50(0x68b)][_0x23bb50(0x820)][_0x23bb50(0x330)](this),$gameTemp['_playTestFastMode']&&!$gameMessage[_0x23bb50(0x5ed)]()&&(this['updateMain'](),SceneManager['updateEffekseer']());},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cc)]=function(){const _0x12402a=_0x9eb9ae;Scene_Message[_0x12402a(0x61d)][_0x12402a(0x1cc)][_0x12402a(0x330)](this),!SceneManager[_0x12402a(0x342)](Scene_Battle)&&(_0x12402a(0x66c)!==_0x12402a(0x91e)?(this[_0x12402a(0x7e4)][_0x12402a(0x1ed)](),this[_0x12402a(0x6df)][_0x12402a(0x798)](),this[_0x12402a(0x5a1)][_0x12402a(0x5fd)]=![],SceneManager[_0x12402a(0x7b6)]()):(this[_0x12402a(0x181)]&&this['_editWindow'][_0x12402a(0x71c)](_0x1b131c[_0x12402a(0x2d8)][_0x12402a(0x795)]),this[_0x12402a(0x31a)]&&this[_0x12402a(0x31a)][_0x12402a(0x71c)](_0x1650bd['layoutSettings'][_0x12402a(0x2e9)]))),$gameScreen['clearZoom'](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x6c5)]=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x732)],Scene_Map[_0x9eb9ae(0x61d)]['createMenuButton']=function(){const _0x8046cf=_0x9eb9ae;VisuMZ['CoreEngine'][_0x8046cf(0x6c5)][_0x8046cf(0x330)](this),SceneManager[_0x8046cf(0x2e4)]()&&this[_0x8046cf(0x678)]();},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x678)]=function(){const _0x45cc65=_0x9eb9ae;this[_0x45cc65(0x34b)]['x']=Graphics[_0x45cc65(0x57c)]+0x4;},VisuMZ['CoreEngine']['Scene_Map_updateScene']=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x568)],Scene_Map['prototype'][_0x9eb9ae(0x568)]=function(){const _0x2fba72=_0x9eb9ae;VisuMZ['CoreEngine'][_0x2fba72(0x578)][_0x2fba72(0x330)](this),this['updateDashToggle']();},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x845)]=function(){const _0x2772d2=_0x9eb9ae;Input[_0x2772d2(0x577)](_0x2772d2(0x247))&&(ConfigManager['alwaysDash']=!ConfigManager[_0x2772d2(0x881)],ConfigManager[_0x2772d2(0x1f3)]());},VisuMZ['CoreEngine']['Scene_Map_updateMain']=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7cb)],Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7cb)]=function(){const _0x399d97=_0x9eb9ae;VisuMZ[_0x399d97(0x68b)][_0x399d97(0x356)]['call'](this),this[_0x399d97(0x66a)]();},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x81e)]=function(){const _0x221226=_0x9eb9ae;this[_0x221226(0x133)]=[];},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x66a)]=function(){const _0x225739=_0x9eb9ae;if(!this[_0x225739(0x133)])return;for(const _0x3eb112 of this['_onceParallelInterpreters']){if('ncicC'==='ncicC'){if(_0x3eb112){if(_0x225739(0x414)===_0x225739(0x120)){this[_0x225739(0x1e7)]++;let _0x470144=_0x3365eb[_0x225739(0x68b)][_0x225739(0x64e)](_0x1706ea[_0x225739(0x371)]);_0x470144[_0x225739(0x631)]>0x0&&(_0x159fb3+=_0x2b5a5c,_0x1b7383+=_0x821f38,_0x5855ec+=_0x225739(0x82f)['format'](_0x562e5c['id'],_0x4b0dea['name']),_0x3bc921+=_0x36abc2,_0x42b175+=_0x470144,_0x432f75+=_0xfcde0a,_0x106ca7+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x225739(0x468)](_0xf51fda['id'],_0x35dae1['name']),_0x556b3d+=_0x306635),this[_0x225739(0x1e7)]--;}else _0x3eb112[_0x225739(0x1ed)]();}}else this['bitmap']=_0x2237ea[_0x225739(0x856)](this[_0x225739(0x269)][_0x225739(0x444)]),this[_0x225739(0x7c9)]['addLoadListener'](this[_0x225739(0x6cb)][_0x225739(0x3c8)](this));}},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5c3)]=function(_0xc5922c){const _0x28ce7a=_0x9eb9ae,_0x42fed4=$dataCommonEvents[_0xc5922c];if(!_0x42fed4)return;const _0x33bc5a=new Game_OnceParallelInterpreter();this[_0x28ce7a(0x6a9)](_0x33bc5a),_0x33bc5a[_0x28ce7a(0x403)](_0xc5922c);},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6a9)]=function(_0x39b9da){const _0x34d712=_0x9eb9ae;this[_0x34d712(0x133)]=this[_0x34d712(0x133)]||[],this[_0x34d712(0x133)][_0x34d712(0x353)](_0x39b9da);},Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x635)]=function(_0x3788e1){const _0x53b8c3=_0x9eb9ae;this[_0x53b8c3(0x133)]=this[_0x53b8c3(0x133)]||[],this[_0x53b8c3(0x133)][_0x53b8c3(0x6d2)](_0x3788e1);};function Game_OnceParallelInterpreter(){const _0x53fa70=_0x9eb9ae;this[_0x53fa70(0x7d0)](...arguments);}function _0x5067(_0x475bd8,_0x238eb7){const _0x4c77d6=_0x4c77();return _0x5067=function(_0x506790,_0x1abe43){_0x506790=_0x506790-0xf5;let _0x1e5bf1=_0x4c77d6[_0x506790];return _0x1e5bf1;},_0x5067(_0x475bd8,_0x238eb7);}Game_OnceParallelInterpreter[_0x9eb9ae(0x61d)]=Object[_0x9eb9ae(0x40e)](Game_Interpreter[_0x9eb9ae(0x61d)]),Game_OnceParallelInterpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x734)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x9eb9ae(0x61d)]['setCommonEvent']=function(_0x498600){const _0x1cd260=_0x9eb9ae,_0x588e78=$dataCommonEvents[_0x498600];_0x588e78?this[_0x1cd260(0x41e)](_0x588e78[_0x1cd260(0x371)],0x0):this['terminate']();},Game_OnceParallelInterpreter['prototype']['terminate']=function(){const _0x127ad4=_0x9eb9ae;if(!SceneManager[_0x127ad4(0x26c)]())return;SceneManager['_scene'][_0x127ad4(0x635)](this),Game_Interpreter[_0x127ad4(0x61d)][_0x127ad4(0x1cc)][_0x127ad4(0x330)](this);},VisuMZ[_0x9eb9ae(0x68b)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cf)],Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cf)]=function(){const _0x547459=_0x9eb9ae;let _0x201de8=0x0;if(SceneManager[_0x547459(0x8ef)]())_0x201de8=this['helpAreaTopSideButtonLayout']();else{if(_0x547459(0x7e6)!==_0x547459(0x7e6))return _0x16aa64[_0x547459(0x68b)][_0x547459(0x1dc)][_0x547459(0x867)]['OutlineColor'];else _0x201de8=VisuMZ['CoreEngine'][_0x547459(0x82a)][_0x547459(0x330)](this);}return this[_0x547459(0x349)]()&&this[_0x547459(0x8b5)]()===_0x547459(0x317)&&(_0x201de8+=Window_ButtonAssist[_0x547459(0x61d)]['lineHeight']()),_0x201de8;},Scene_MenuBase['prototype']['helpAreaTopSideButtonLayout']=function(){const _0x1187d0=_0x9eb9ae;if(this[_0x1187d0(0x207)]())return this[_0x1187d0(0x369)]();else{if(_0x1187d0(0x4b9)!==_0x1187d0(0x4b9))this[_0x1187d0(0x7a9)](0x0);else return 0x0;}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x2c6)]=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7f6)],Scene_MenuBase['prototype'][_0x9eb9ae(0x7f6)]=function(){const _0x1864ed=_0x9eb9ae;return SceneManager[_0x1864ed(0x8ef)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x1864ed(0x68b)][_0x1864ed(0x2c6)][_0x1864ed(0x330)](this);},Scene_MenuBase[_0x9eb9ae(0x61d)]['mainAreaTopSideButtonLayout']=function(){const _0x41dc3d=_0x9eb9ae;if(!this[_0x41dc3d(0x207)]())return this[_0x41dc3d(0x668)]();else{if('ypuRJ'!==_0x41dc3d(0x56a))_0x58c9fa+=_0x41dc3d(0x2f3);else return 0x0;}},VisuMZ[_0x9eb9ae(0x68b)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ca)],Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ca)]=function(){const _0x543421=_0x9eb9ae;let _0x522061=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x522061=this[_0x543421(0x1c4)]():_0x543421(0x368)!=='kMfQr'?this[_0x543421(0x60b)][_0x543421(0x6f5)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this[_0x543421(0x56d)](_0x51c401(_0x2e6a0f['$1'])):_0x1e63ec['CoreEngine']['Sprite_Picture_loadBitmap'][_0x543421(0x330)](this):_0x522061=VisuMZ[_0x543421(0x68b)][_0x543421(0x411)][_0x543421(0x330)](this),this['isMenuButtonAssistEnabled']()&&this[_0x543421(0x8b5)]()!==_0x543421(0x32e)&&(_0x522061-=Window_ButtonAssist[_0x543421(0x61d)][_0x543421(0x5f5)]()),_0x522061;},Scene_MenuBase['prototype']['mainAreaHeightSideButtonLayout']=function(){const _0x416e2f=_0x9eb9ae;return Graphics[_0x416e2f(0x18a)]-this['helpAreaHeight']();},VisuMZ[_0x9eb9ae(0x68b)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x74e)],Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x74e)]=function(){const _0x52d006=_0x9eb9ae;this[_0x52d006(0x303)]=new PIXI[(_0x52d006(0x731))]['BlurFilter'](clamp=!![]),this[_0x52d006(0x6c4)]=new Sprite(),this[_0x52d006(0x6c4)][_0x52d006(0x7c9)]=SceneManager[_0x52d006(0x472)](),this[_0x52d006(0x6c4)][_0x52d006(0x731)]=[this[_0x52d006(0x303)]],this[_0x52d006(0xf5)](this[_0x52d006(0x6c4)]),this[_0x52d006(0x432)](0xc0),this[_0x52d006(0x432)](this[_0x52d006(0x44f)]()),this['createCustomBackgroundImages']();},Scene_MenuBase['prototype'][_0x9eb9ae(0x44f)]=function(){const _0x4b08c9=_0x9eb9ae,_0x14c434=String(this[_0x4b08c9(0x734)][_0x4b08c9(0x1e8)]),_0x28bfae=this[_0x4b08c9(0x868)](_0x14c434);return _0x28bfae?_0x4b08c9(0x8ec)===_0x4b08c9(0x1cd)?_0x58ef07[_0x4b08c9(0x3ed)](_0x4b08c9(0x118)):_0x28bfae[_0x4b08c9(0x4eb)]:0xc0;},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x787)]=function(){const _0x17f073=_0x9eb9ae,_0x4a2123=String(this[_0x17f073(0x734)][_0x17f073(0x1e8)]),_0x18dfa0=this[_0x17f073(0x868)](_0x4a2123);_0x18dfa0&&(_0x18dfa0[_0x17f073(0x13b)]!==''||_0x18dfa0[_0x17f073(0x422)]!=='')&&(this[_0x17f073(0x17d)]=new Sprite(ImageManager[_0x17f073(0x19d)](_0x18dfa0[_0x17f073(0x13b)])),this[_0x17f073(0x7ca)]=new Sprite(ImageManager[_0x17f073(0x54b)](_0x18dfa0[_0x17f073(0x422)])),this[_0x17f073(0xf5)](this[_0x17f073(0x17d)]),this['addChild'](this[_0x17f073(0x7ca)]),this['_backSprite1'][_0x17f073(0x7c9)][_0x17f073(0x56f)](this[_0x17f073(0x3c5)][_0x17f073(0x3c8)](this,this['_backSprite1'])),this[_0x17f073(0x7ca)][_0x17f073(0x7c9)][_0x17f073(0x56f)](this[_0x17f073(0x3c5)][_0x17f073(0x3c8)](this,this['_backSprite2'])));},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x868)]=function(_0x495d7f){const _0x32d7c6=_0x9eb9ae;return VisuMZ[_0x32d7c6(0x68b)][_0x32d7c6(0x1dc)][_0x32d7c6(0x8bb)][_0x495d7f]||VisuMZ['CoreEngine'][_0x32d7c6(0x1dc)][_0x32d7c6(0x8bb)]['Scene_Unlisted'];},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3c5)]=function(_0x2c8641){this['scaleSprite'](_0x2c8641),this['centerSprite'](_0x2c8641);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x185)]=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ad)],Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ad)]=function(){const _0x2651e5=_0x9eb9ae;VisuMZ[_0x2651e5(0x68b)]['Scene_MenuBase_createCancelButton'][_0x2651e5(0x330)](this),SceneManager['isSideButtonLayout']()&&this[_0x2651e5(0x486)]();},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x486)]=function(){const _0x28d079=_0x9eb9ae;this[_0x28d079(0x7e2)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x390)]=Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4fa)],Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4fa)]=function(){const _0x1314de=_0x9eb9ae;VisuMZ['CoreEngine'][_0x1314de(0x390)]['call'](this);if(SceneManager['isSideButtonLayout']()){if('XXuPU'!==_0x1314de(0x83d))this['movePageButtonSideButtonLayout']();else{try{_0x341abc[_0x1314de(0x68b)][_0x1314de(0x4b5)][_0x1314de(0x330)](this);}catch(_0x54e0ad){_0x3602fc['isPlaytest']()&&(_0x4cdc8a['log']('Script\x20Call\x20Error'),_0x25e284[_0x1314de(0x517)](_0x54e0ad));}return!![];}}},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x59c)]=function(){const _0x5988ae=_0x9eb9ae;this[_0x5988ae(0x73d)]['x']=-0x1*(this[_0x5988ae(0x73d)][_0x5988ae(0x792)]+this[_0x5988ae(0x2ff)]['width']+0x8),this[_0x5988ae(0x2ff)]['x']=-0x1*(this[_0x5988ae(0x2ff)][_0x5988ae(0x792)]+0x4);},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x349)]=function(){const _0x397397=_0x9eb9ae;return VisuMZ[_0x397397(0x68b)][_0x397397(0x1dc)][_0x397397(0x452)]['Enable'];},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8b5)]=function(){const _0x2f8ece=_0x9eb9ae;if(SceneManager[_0x2f8ece(0x2e4)]()||SceneManager[_0x2f8ece(0x418)]()){if(_0x2f8ece(0x17c)!==_0x2f8ece(0x718))return VisuMZ[_0x2f8ece(0x68b)]['Settings']['ButtonAssist'][_0x2f8ece(0x6ee)];else{if(this[_0x2f8ece(0x5b2)])return;_0x3221fd[_0x2f8ece(0x68b)][_0x2f8ece(0x492)][_0x2f8ece(0x330)](this);}}else return'button';},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x80e)]=function(){const _0x21e332=_0x9eb9ae;if(!this[_0x21e332(0x349)]())return;const _0x4f418b=this[_0x21e332(0x5c0)]();this[_0x21e332(0x45c)]=new Window_ButtonAssist(_0x4f418b),this['addWindow'](this[_0x21e332(0x45c)]);},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5c0)]=function(){const _0x4e3a96=_0x9eb9ae;if(this[_0x4e3a96(0x8b5)]()===_0x4e3a96(0x32e)){if('pypEY'!==_0x4e3a96(0x2b8))return this[_0x4e3a96(0x8a8)]();else{const _0x464042=_0x189835[_0x4e3a96(0x5df)]();_0x464042[_0x4e3a96(0x793)]&&_0x464042[_0x4e3a96(0x5fd)]&&_0x464042['openness']>0x0&&(_0x3dfa52[_0x4e3a96(0x7a1)](_0xa96b6c[_0x4e3a96(0x465)],0x0,~0x0),_0x46716e['stencilOp'](_0x4854c5['KEEP'],_0x6f45a1[_0x4e3a96(0x475)],_0x5b1906['KEEP']),_0x464042[_0x4e3a96(0x280)](_0x49b1ac),_0x3b3e7e[_0x4e3a96(0x3eb)][_0x4e3a96(0x89d)](),_0x34c2c0['clear'](),_0x1edae1[_0x4e3a96(0x7a1)](_0x356ce9[_0x4e3a96(0x6b2)],0x1,~0x0),_0x444700[_0x4e3a96(0x913)](_0x4b090e['REPLACE'],_0x10bef4['REPLACE'],_0x4b9570['REPLACE']),_0x5bbc4a[_0x4e3a96(0x608)](_0x2b166b[_0x4e3a96(0x460)],_0x1c76fa[_0x4e3a96(0x194)]),_0x43c25a[_0x4e3a96(0x280)](_0x1a297c),_0x489f6f[_0x4e3a96(0x3eb)][_0x4e3a96(0x89d)](),_0x379759[_0x4e3a96(0x608)](_0x47dc4f['ONE'],_0x242548['ONE_MINUS_SRC_ALPHA']));}}else return this[_0x4e3a96(0x656)]();},Scene_MenuBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8a8)]=function(){const _0x1c0a01=_0x9eb9ae,_0x297965=ConfigManager[_0x1c0a01(0x78e)]?(Sprite_Button['prototype'][_0x1c0a01(0x340)]()+0x6)*0x2:0x0,_0x97d0c3=this[_0x1c0a01(0x5a5)](),_0x536a05=Graphics[_0x1c0a01(0x57c)]-_0x297965*0x2,_0x4c25d9=this[_0x1c0a01(0x1b5)]();return new Rectangle(_0x297965,_0x97d0c3,_0x536a05,_0x4c25d9);},Scene_MenuBase['prototype']['buttonAssistWindowSideRect']=function(){const _0x1e10dc=_0x9eb9ae,_0x588830=Graphics['boxWidth'],_0x2de1fe=Window_ButtonAssist[_0x1e10dc(0x61d)][_0x1e10dc(0x5f5)](),_0x534450=0x0;let _0x269790=0x0;return this[_0x1e10dc(0x8b5)]()===_0x1e10dc(0x317)?_0x269790=0x0:_0x1e10dc(0x146)===_0x1e10dc(0x569)?this[_0x1e10dc(0x1a0)]='SV':_0x269790=Graphics[_0x1e10dc(0x18a)]-_0x2de1fe,new Rectangle(_0x534450,_0x269790,_0x588830,_0x2de1fe);},Scene_Menu[_0x9eb9ae(0x2d8)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)][_0x9eb9ae(0x8ed)],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1a4)]=Scene_Menu[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)],Scene_Menu['prototype'][_0x9eb9ae(0x40e)]=function(){const _0x358192=_0x9eb9ae;VisuMZ['CoreEngine'][_0x358192(0x1a4)][_0x358192(0x330)](this),this[_0x358192(0x808)]();},Scene_Menu[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0xa587b9=_0x9eb9ae;this[_0xa587b9(0x218)]&&(_0xa587b9(0x574)!==_0xa587b9(0x4fc)?this[_0xa587b9(0x218)]['setBackgroundType'](Scene_Menu[_0xa587b9(0x2d8)][_0xa587b9(0x179)]):(_0xcf7034[_0xa587b9(0x68b)][_0xa587b9(0x3b2)][_0xa587b9(0x330)](this),_0x524566['updateCurrentEvent']()));if(this[_0xa587b9(0x854)]){if('bGbuw'!==_0xa587b9(0x858))this[_0xa587b9(0x854)]['setBackgroundType'](Scene_Menu['layoutSettings'][_0xa587b9(0x198)]);else{this[_0xa587b9(0x59b)]=_0xa587b9(0x712),this[_0xa587b9(0x441)]='nah',this[_0xa587b9(0x6e6)]='nah';const _0x28bcd4=this['windowRect']();_0x34f104[_0xa587b9(0x61d)]['initialize']['call'](this,_0x28bcd4),this['setBackgroundType'](0x2);}}if(this[_0xa587b9(0x19b)]){if(_0xa587b9(0x3b9)!==_0xa587b9(0x3b9))return _0x4ba7fa(_0x269c5a['$1']);else this[_0xa587b9(0x19b)][_0xa587b9(0x71c)](Scene_Menu[_0xa587b9(0x2d8)]['StatusBgType']);}},Scene_Menu[_0x9eb9ae(0x61d)][_0x9eb9ae(0x400)]=function(){const _0x1e322e=_0x9eb9ae;return Scene_Menu[_0x1e322e(0x2d8)][_0x1e322e(0x7d7)][_0x1e322e(0x330)](this);},Scene_Menu[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f3)]=function(){const _0x2d1366=_0x9eb9ae;return Scene_Menu[_0x2d1366(0x2d8)][_0x2d1366(0x313)]['call'](this);},Scene_Menu[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f0)]=function(){const _0x414f20=_0x9eb9ae;return Scene_Menu[_0x414f20(0x2d8)][_0x414f20(0x670)][_0x414f20(0x330)](this);},Scene_Item[_0x9eb9ae(0x2d8)]=VisuMZ['CoreEngine']['Settings'][_0x9eb9ae(0x758)][_0x9eb9ae(0x255)],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1c7)]=Scene_Item[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)],Scene_Item['prototype'][_0x9eb9ae(0x40e)]=function(){const _0x3e916f=_0x9eb9ae;VisuMZ[_0x3e916f(0x68b)][_0x3e916f(0x1c7)][_0x3e916f(0x330)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x9eb9ae(0x61d)]['setCoreEngineUpdateWindowBg']=function(){const _0x230b3d=_0x9eb9ae;this[_0x230b3d(0x6a7)]&&this[_0x230b3d(0x6a7)][_0x230b3d(0x71c)](Scene_Item[_0x230b3d(0x2d8)][_0x230b3d(0x143)]);this['_categoryWindow']&&this[_0x230b3d(0x8fb)]['setBackgroundType'](Scene_Item['layoutSettings']['CategoryBgType']);this[_0x230b3d(0x30a)]&&this[_0x230b3d(0x30a)][_0x230b3d(0x71c)](Scene_Item[_0x230b3d(0x2d8)]['ItemBgType']);if(this['_actorWindow']){if('aUhUD'!==_0x230b3d(0x6af))switch(_0x56aad1[_0x230b3d(0x68b)][_0x230b3d(0x1dc)][_0x230b3d(0x2c7)][_0x230b3d(0x308)]){case'stretch':return!![];case _0x230b3d(0x697):return![];default:return _0x4a3115[_0x230b3d(0x68b)]['Graphics_defaultStretchMode']['call'](this);}else this['_actorWindow'][_0x230b3d(0x71c)](Scene_Item[_0x230b3d(0x2d8)][_0x230b3d(0x2cc)]);}},Scene_Item[_0x9eb9ae(0x61d)][_0x9eb9ae(0x904)]=function(){const _0x5d9da2=_0x9eb9ae;return Scene_Item['layoutSettings'][_0x5d9da2(0x72a)]['call'](this);},Scene_Item[_0x9eb9ae(0x61d)]['categoryWindowRect']=function(){const _0x353f10=_0x9eb9ae;return Scene_Item[_0x353f10(0x2d8)][_0x353f10(0x338)][_0x353f10(0x330)](this);},Scene_Item['prototype']['itemWindowRect']=function(){const _0x582776=_0x9eb9ae;return Scene_Item[_0x582776(0x2d8)][_0x582776(0x674)][_0x582776(0x330)](this);},Scene_Item['prototype'][_0x9eb9ae(0x846)]=function(){const _0xacdce2=_0x9eb9ae;return Scene_Item['layoutSettings'][_0xacdce2(0x786)][_0xacdce2(0x330)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)]['MenuLayout'][_0x9eb9ae(0x551)],VisuMZ[_0x9eb9ae(0x68b)]['Scene_Skill_create']=Scene_Skill['prototype'][_0x9eb9ae(0x40e)],Scene_Skill[_0x9eb9ae(0x61d)]['create']=function(){const _0x2d005c=_0x9eb9ae;VisuMZ[_0x2d005c(0x68b)][_0x2d005c(0x3b1)][_0x2d005c(0x330)](this),this[_0x2d005c(0x808)]();},Scene_Skill[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0x47b751=_0x9eb9ae;this[_0x47b751(0x6a7)]&&this[_0x47b751(0x6a7)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x47b751(0x143)]);this[_0x47b751(0x80c)]&&this[_0x47b751(0x80c)][_0x47b751(0x71c)](Scene_Skill['layoutSettings']['SkillTypeBgType']);this[_0x47b751(0x19b)]&&(_0x47b751(0x3f0)!==_0x47b751(0x3f0)?(this[_0x47b751(0x423)][_0x47b751(0x521)]=this['smallParamFontSize'](),this[_0x47b751(0x423)][_0x47b751(0x1e0)](_0x4831ef,_0x40364b,_0xe61563,_0x22980c,this[_0x47b751(0x139)](),_0x47b751(0x5b3))):this[_0x47b751(0x19b)][_0x47b751(0x71c)](Scene_Skill['layoutSettings'][_0x47b751(0x636)]));this[_0x47b751(0x30a)]&&this[_0x47b751(0x30a)][_0x47b751(0x71c)](Scene_Skill[_0x47b751(0x2d8)]['ItemBgType']);if(this['_actorWindow']){if(_0x47b751(0x12c)!==_0x47b751(0x657))this[_0x47b751(0x771)][_0x47b751(0x71c)](Scene_Skill[_0x47b751(0x2d8)][_0x47b751(0x2cc)]);else return _0x571f96['layoutSettings'][_0x47b751(0x3bf)][_0x47b751(0x330)](this);}},Scene_Skill['prototype'][_0x9eb9ae(0x904)]=function(){const _0x419f3a=_0x9eb9ae;return Scene_Skill[_0x419f3a(0x2d8)]['HelpRect'][_0x419f3a(0x330)](this);},Scene_Skill[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7f1)]=function(){const _0x19ddd3=_0x9eb9ae;return Scene_Skill['layoutSettings']['SkillTypeRect'][_0x19ddd3(0x330)](this);},Scene_Skill[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f0)]=function(){const _0x112251=_0x9eb9ae;return Scene_Skill[_0x112251(0x2d8)][_0x112251(0x670)][_0x112251(0x330)](this);},Scene_Skill[_0x9eb9ae(0x61d)][_0x9eb9ae(0x576)]=function(){const _0x5a8128=_0x9eb9ae;return Scene_Skill[_0x5a8128(0x2d8)][_0x5a8128(0x674)]['call'](this);},Scene_Skill[_0x9eb9ae(0x61d)]['actorWindowRect']=function(){const _0xb136fb=_0x9eb9ae;return Scene_Skill['layoutSettings'][_0xb136fb(0x786)][_0xb136fb(0x330)](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)]['Settings'][_0x9eb9ae(0x758)][_0x9eb9ae(0x8c9)],VisuMZ[_0x9eb9ae(0x68b)]['Scene_Equip_create']=Scene_Equip['prototype']['create'],Scene_Equip[_0x9eb9ae(0x61d)]['create']=function(){const _0x3b8f9e=_0x9eb9ae;VisuMZ[_0x3b8f9e(0x68b)]['Scene_Equip_create']['call'](this),this[_0x3b8f9e(0x808)]();},Scene_Equip[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0x5e7eac=_0x9eb9ae;this['_helpWindow']&&this['_helpWindow']['setBackgroundType'](Scene_Equip[_0x5e7eac(0x2d8)]['HelpBgType']);this[_0x5e7eac(0x19b)]&&this[_0x5e7eac(0x19b)]['setBackgroundType'](Scene_Equip[_0x5e7eac(0x2d8)][_0x5e7eac(0x636)]);this[_0x5e7eac(0x218)]&&this['_commandWindow'][_0x5e7eac(0x71c)](Scene_Equip[_0x5e7eac(0x2d8)][_0x5e7eac(0x179)]);if(this[_0x5e7eac(0x297)]){if('eYUaM'!==_0x5e7eac(0x1aa)){_0x2911a2[_0x5e7eac(0x259)](_0x4c3778,_0x3c2583);const _0x5b7bdc=_0x30a2d0[_0x5e7eac(0x74b)](_0x568543[_0x5e7eac(0x321)])[_0x5e7eac(0x739)](0x1,0x64),_0x4e024b=_0x154d39['Settings'],_0x1029dd=_0x4e024b['Origin'][_0x5e7eac(0x739)](0x0,0x1),_0x1bf3ff=_0x3aefbe['round'](_0x4e024b['PositionX']||0x0),_0x4e0b41=_0x5131a6[_0x5e7eac(0x74b)](_0x4e024b[_0x5e7eac(0x921)]||0x0),_0x2e75ee=_0x346944[_0x5e7eac(0x74b)](_0x4e024b['ScaleX']||0x0),_0x11e1eb=_0x250514['round'](_0x4e024b[_0x5e7eac(0x63e)]||0x0),_0x587ddd=_0x3e25df[_0x5e7eac(0x74b)](_0x4e024b[_0x5e7eac(0x214)])[_0x5e7eac(0x739)](0x0,0xff),_0x199339=_0x4e024b[_0x5e7eac(0x480)],_0x504a04=_0x5e7eac(0x3f8),_0x312baf=_0x50ccbc['Smooth']?'Smooth':_0x5e7eac(0x45b),_0x59013c=_0x504a04[_0x5e7eac(0x468)](_0x40a0c2[_0x5e7eac(0x442)],_0x312baf);_0x200b96[_0x5e7eac(0x1c1)](_0x5b7bdc,_0x59013c,_0x1029dd,_0x1bf3ff,_0x4e0b41,_0x2e75ee,_0x11e1eb,_0x587ddd,_0x199339);}else this['_slotWindow'][_0x5e7eac(0x71c)](Scene_Equip[_0x5e7eac(0x2d8)]['SlotBgType']);}this[_0x5e7eac(0x30a)]&&this[_0x5e7eac(0x30a)][_0x5e7eac(0x71c)](Scene_Equip[_0x5e7eac(0x2d8)][_0x5e7eac(0x689)]);},Scene_Equip[_0x9eb9ae(0x61d)][_0x9eb9ae(0x904)]=function(){const _0x37c949=_0x9eb9ae;return Scene_Equip[_0x37c949(0x2d8)]['HelpRect'][_0x37c949(0x330)](this);},Scene_Equip[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f0)]=function(){const _0x505fe0=_0x9eb9ae;return Scene_Equip[_0x505fe0(0x2d8)]['StatusRect']['call'](this);},Scene_Equip['prototype'][_0x9eb9ae(0x400)]=function(){const _0x2c1ea2=_0x9eb9ae;return Scene_Equip[_0x2c1ea2(0x2d8)][_0x2c1ea2(0x7d7)][_0x2c1ea2(0x330)](this);},Scene_Equip[_0x9eb9ae(0x61d)][_0x9eb9ae(0x28a)]=function(){const _0x4e241d=_0x9eb9ae;return Scene_Equip[_0x4e241d(0x2d8)][_0x4e241d(0x5de)]['call'](this);},Scene_Equip['prototype'][_0x9eb9ae(0x576)]=function(){const _0x47b1e2=_0x9eb9ae;return Scene_Equip[_0x47b1e2(0x2d8)][_0x47b1e2(0x674)][_0x47b1e2(0x330)](this);},Scene_Status['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)]['MenuLayout'][_0x9eb9ae(0x711)],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x283)]=Scene_Status[_0x9eb9ae(0x61d)]['create'],Scene_Status['prototype'][_0x9eb9ae(0x40e)]=function(){const _0x2a3b1a=_0x9eb9ae;VisuMZ['CoreEngine']['Scene_Status_create'][_0x2a3b1a(0x330)](this),this[_0x2a3b1a(0x808)]();},Scene_Status[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0x424a67=_0x9eb9ae;this[_0x424a67(0x67c)]&&this['_profileWindow'][_0x424a67(0x71c)](Scene_Status[_0x424a67(0x2d8)][_0x424a67(0x61f)]),this[_0x424a67(0x19b)]&&this['_statusWindow'][_0x424a67(0x71c)](Scene_Status[_0x424a67(0x2d8)][_0x424a67(0x636)]),this[_0x424a67(0x625)]&&this[_0x424a67(0x625)][_0x424a67(0x71c)](Scene_Status[_0x424a67(0x2d8)][_0x424a67(0x377)]),this[_0x424a67(0x6a8)]&&this[_0x424a67(0x6a8)][_0x424a67(0x71c)](Scene_Status['layoutSettings'][_0x424a67(0x762)]);},Scene_Status[_0x9eb9ae(0x61d)]['profileWindowRect']=function(){const _0x18af17=_0x9eb9ae;return Scene_Status[_0x18af17(0x2d8)]['ProfileRect'][_0x18af17(0x330)](this);},Scene_Status[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f0)]=function(){const _0xce98c7=_0x9eb9ae;return Scene_Status['layoutSettings'][_0xce98c7(0x670)]['call'](this);},Scene_Status[_0x9eb9ae(0x61d)][_0x9eb9ae(0x68f)]=function(){const _0x4588c0=_0x9eb9ae;return Scene_Status[_0x4588c0(0x2d8)][_0x4588c0(0x6c7)]['call'](this);},Scene_Status['prototype'][_0x9eb9ae(0x6b4)]=function(){const _0x3203b1=_0x9eb9ae;return Scene_Status['layoutSettings'][_0x3203b1(0x908)][_0x3203b1(0x330)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)][_0x9eb9ae(0x26f)],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x84f)]=Scene_Options['prototype'][_0x9eb9ae(0x40e)],Scene_Options[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)]=function(){const _0xd2055e=_0x9eb9ae;VisuMZ['CoreEngine'][_0xd2055e(0x84f)][_0xd2055e(0x330)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0x5f5cdc=_0x9eb9ae;if(this[_0x5f5cdc(0x8ce)]){if(_0x5f5cdc(0x2f2)===_0x5f5cdc(0x2f2))this['_optionsWindow'][_0x5f5cdc(0x71c)](Scene_Options['layoutSettings'][_0x5f5cdc(0x319)]);else{const _0x38c666=this[_0x5f5cdc(0x6e4)]();this[_0x5f5cdc(0x4ee)](_0x282ad1[_0x5f5cdc(0x1e3)]());const _0x3b3428=_0x297d3c['CoreEngine'][_0x5f5cdc(0x1dc)]['UI']['ParamArrow'];this[_0x5f5cdc(0x1e0)](_0x3b3428,_0x1fb389,_0x142d89,_0x38c666,_0x5f5cdc(0x7ce));}}},Scene_Options[_0x9eb9ae(0x61d)][_0x9eb9ae(0x818)]=function(){const _0x3aeafe=_0x9eb9ae;return Scene_Options['layoutSettings'][_0x3aeafe(0x326)][_0x3aeafe(0x330)](this);},Scene_Save['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)]['Settings']['MenuLayout'][_0x9eb9ae(0x46b)],Scene_Save[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)]=function(){const _0xeb5d2a=_0x9eb9ae;Scene_File[_0xeb5d2a(0x61d)][_0xeb5d2a(0x40e)][_0xeb5d2a(0x330)](this),this[_0xeb5d2a(0x808)]();},Scene_Save[_0x9eb9ae(0x61d)][_0x9eb9ae(0x808)]=function(){const _0x3541d9=_0x9eb9ae;this[_0x3541d9(0x6a7)]&&(_0x3541d9(0x6c9)!==_0x3541d9(0x6c9)?this['smoothSelect'](_0xc2dc04['min'](this['index'](),0x0)):this[_0x3541d9(0x6a7)][_0x3541d9(0x71c)](Scene_Save[_0x3541d9(0x2d8)][_0x3541d9(0x143)])),this[_0x3541d9(0x749)]&&this[_0x3541d9(0x749)]['setBackgroundType'](Scene_Save[_0x3541d9(0x2d8)][_0x3541d9(0x46a)]);},Scene_Save[_0x9eb9ae(0x61d)][_0x9eb9ae(0x904)]=function(){const _0x1974f5=_0x9eb9ae;return Scene_Save[_0x1974f5(0x2d8)]['HelpRect'][_0x1974f5(0x330)](this);},Scene_Save[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3e1)]=function(){const _0x5c1b8e=_0x9eb9ae;return Scene_Save[_0x5c1b8e(0x2d8)][_0x5c1b8e(0x355)][_0x5c1b8e(0x330)](this);},Scene_Load[_0x9eb9ae(0x2d8)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)][_0x9eb9ae(0x253)],Scene_Load[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)]=function(){const _0x9e0904=_0x9eb9ae;Scene_File[_0x9e0904(0x61d)][_0x9e0904(0x40e)][_0x9e0904(0x330)](this),this[_0x9e0904(0x808)]();},Scene_Load[_0x9eb9ae(0x61d)]['setCoreEngineUpdateWindowBg']=function(){const _0xc24f63=_0x9eb9ae;this[_0xc24f63(0x6a7)]&&this[_0xc24f63(0x6a7)][_0xc24f63(0x71c)](Scene_Load[_0xc24f63(0x2d8)][_0xc24f63(0x143)]),this[_0xc24f63(0x749)]&&this[_0xc24f63(0x749)][_0xc24f63(0x71c)](Scene_Load['layoutSettings']['ListBgType']);},Scene_Load[_0x9eb9ae(0x61d)][_0x9eb9ae(0x904)]=function(){const _0x34ac33=_0x9eb9ae;return Scene_Load['layoutSettings']['HelpRect'][_0x34ac33(0x330)](this);},Scene_Load[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3e1)]=function(){const _0x36a8d2=_0x9eb9ae;return Scene_Load[_0x36a8d2(0x2d8)][_0x36a8d2(0x355)]['call'](this);},Scene_GameEnd[_0x9eb9ae(0x2d8)]=VisuMZ['CoreEngine'][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)]['GameEnd'],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x314)]=Scene_GameEnd[_0x9eb9ae(0x61d)][_0x9eb9ae(0x74e)],Scene_GameEnd[_0x9eb9ae(0x61d)][_0x9eb9ae(0x74e)]=function(){const _0x254dbe=_0x9eb9ae;Scene_MenuBase[_0x254dbe(0x61d)][_0x254dbe(0x74e)][_0x254dbe(0x330)](this);},Scene_GameEnd[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4a9)]=function(){const _0x57efb8=_0x9eb9ae,_0xf612e6=this[_0x57efb8(0x400)]();this[_0x57efb8(0x218)]=new Window_GameEnd(_0xf612e6),this[_0x57efb8(0x218)][_0x57efb8(0x38a)](_0x57efb8(0x118),this['popScene'][_0x57efb8(0x3c8)](this)),this[_0x57efb8(0x445)](this[_0x57efb8(0x218)]),this[_0x57efb8(0x218)][_0x57efb8(0x71c)](Scene_GameEnd[_0x57efb8(0x2d8)][_0x57efb8(0x179)]);},Scene_GameEnd[_0x9eb9ae(0x61d)][_0x9eb9ae(0x400)]=function(){const _0x2f40f8=_0x9eb9ae;return Scene_GameEnd[_0x2f40f8(0x2d8)]['CommandRect']['call'](this);},Scene_Shop[_0x9eb9ae(0x2d8)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)]['MenuLayout'][_0x9eb9ae(0x1ab)],VisuMZ[_0x9eb9ae(0x68b)]['Scene_Shop_create']=Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)],Scene_Shop['prototype'][_0x9eb9ae(0x40e)]=function(){const _0x27d9de=_0x9eb9ae;VisuMZ['CoreEngine'][_0x27d9de(0x270)]['call'](this),this[_0x27d9de(0x808)]();},Scene_Shop['prototype'][_0x9eb9ae(0x808)]=function(){const _0x195452=_0x9eb9ae;this[_0x195452(0x6a7)]&&this[_0x195452(0x6a7)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)]['HelpBgType']);this[_0x195452(0x854)]&&('CmNvv'==='aLxCw'?(_0x4f045a+=_0x1dc6d3,_0x47d663+=_0x14186b,_0x2d617c+=_0x195452(0x82f)[_0x195452(0x468)](_0xd35fec['id'],_0x4cf5a4[_0x195452(0x1e8)]),_0x2133d0+=_0x2c3a4e,_0x26213a+=_0x13c2c8,_0x31b9af+=_0x5839c6,_0x1a8504+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x195452(0x468)](_0x156a53['id'],_0x3484bb[_0x195452(0x1e8)]),_0x41ede7+=_0x3022d4):this[_0x195452(0x854)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x195452(0x198)]));if(this[_0x195452(0x218)]){if('ithZi'!=='ithZi')return[0x25,0x26,0x27,0x28][_0x195452(0x64c)](this[_0x195452(0x4ff)]);else this[_0x195452(0x218)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)][_0x195452(0x179)]);}this[_0x195452(0x64d)]&&this['_dummyWindow']['setBackgroundType'](Scene_Shop[_0x195452(0x2d8)]['DummyBgType']);this['_numberWindow']&&this[_0x195452(0x5a8)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)][_0x195452(0x50f)]);if(this[_0x195452(0x19b)]){if('AQJLd'===_0x195452(0x4d4)){if(this[_0x195452(0x4cb)]==='keyboard')return;if(_0x1977bf['isNumpadPressed']())return;_0x4b8365[_0x195452(0x68b)][_0x195452(0x71a)][_0x195452(0x330)](this),this[_0x195452(0x7c7)](_0x195452(0xfc));}else this[_0x195452(0x19b)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)][_0x195452(0x636)]);}if(this[_0x195452(0x511)]){if('TLXSk'!==_0x195452(0x81f))this[_0x195452(0x511)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)][_0x195452(0x8a7)]);else{if(!_0x5d350b[_0x195452(0x8e0)]())return;if(!_0x157a0d[_0x195452(0x3ee)]())return;_0x3d0d62['ConvertParams'](_0x538afa,_0x12a08a);const _0x5d4024=_0x459979[_0x195452(0x321)]||0x1;_0x58c18d['_pictureCoordinatesMode']=_0x5d4024;}}if(this['_categoryWindow']){if(_0x195452(0x884)!==_0x195452(0x884))return this['_commandWindow']?this[_0x195452(0x218)][_0x195452(0x748)]():_0x3d131f[_0x195452(0x68b)][_0x195452(0x1dc)][_0x195452(0x140)][_0x195452(0x631)];else this[_0x195452(0x8fb)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)]['CategoryBgType']);}this['_sellWindow']&&this[_0x195452(0x8fa)][_0x195452(0x71c)](Scene_Shop[_0x195452(0x2d8)][_0x195452(0x759)]);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x904)]=function(){const _0x1f07c4=_0x9eb9ae;return Scene_Shop[_0x1f07c4(0x2d8)][_0x1f07c4(0x72a)]['call'](this);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f3)]=function(){const _0x2a0754=_0x9eb9ae;return Scene_Shop[_0x2a0754(0x2d8)]['GoldRect'][_0x2a0754(0x330)](this);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x400)]=function(){const _0x6feb99=_0x9eb9ae;return Scene_Shop[_0x6feb99(0x2d8)]['CommandRect'][_0x6feb99(0x330)](this);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x32d)]=function(){const _0x15baf1=_0x9eb9ae;return Scene_Shop[_0x15baf1(0x2d8)][_0x15baf1(0x13c)][_0x15baf1(0x330)](this);},Scene_Shop[_0x9eb9ae(0x61d)]['numberWindowRect']=function(){const _0x3dfed9=_0x9eb9ae;return Scene_Shop[_0x3dfed9(0x2d8)]['NumberRect']['call'](this);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f0)]=function(){const _0x50c513=_0x9eb9ae;return Scene_Shop[_0x50c513(0x2d8)][_0x50c513(0x670)][_0x50c513(0x330)](this);},Scene_Shop[_0x9eb9ae(0x61d)][_0x9eb9ae(0x244)]=function(){const _0x3531d0=_0x9eb9ae;return Scene_Shop[_0x3531d0(0x2d8)][_0x3531d0(0x3d5)][_0x3531d0(0x330)](this);},Scene_Shop['prototype'][_0x9eb9ae(0x1c2)]=function(){const _0x420bf6=_0x9eb9ae;return Scene_Shop[_0x420bf6(0x2d8)]['CategoryRect'][_0x420bf6(0x330)](this);},Scene_Shop['prototype'][_0x9eb9ae(0x287)]=function(){const _0x51850e=_0x9eb9ae;return Scene_Shop[_0x51850e(0x2d8)][_0x51850e(0x243)]['call'](this);},Scene_Name['layoutSettings']=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)]['NameMenu'],VisuMZ['CoreEngine']['Scene_Name_create']=Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)],Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x40e)]=function(){const _0x3ea5fd=_0x9eb9ae;VisuMZ['CoreEngine'][_0x3ea5fd(0x8f5)][_0x3ea5fd(0x330)](this),this[_0x3ea5fd(0x808)]();},Scene_Name['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x4b9da8=_0x9eb9ae;if(this['_editWindow']){if(_0x4b9da8(0x464)==='nxWYS')return this['paramName'](_0x32a939);else this[_0x4b9da8(0x181)][_0x4b9da8(0x71c)](Scene_Name[_0x4b9da8(0x2d8)]['EditBgType']);}if(this['_inputWindow']){if(_0x4b9da8(0x6d0)===_0x4b9da8(0x6d0))this['_inputWindow'][_0x4b9da8(0x71c)](Scene_Name[_0x4b9da8(0x2d8)][_0x4b9da8(0x2e9)]);else{const _0xd91cf2=_0x4b9da8(0x518);this[_0x4b9da8(0x3d6)]=this[_0x4b9da8(0x3d6)]||{};if(this[_0x4b9da8(0x3d6)][_0xd91cf2])return this[_0x4b9da8(0x3d6)][_0xd91cf2];const _0x22e241=_0x22989c[_0x4b9da8(0x68b)][_0x4b9da8(0x1dc)][_0x4b9da8(0x867)]['ColorNormal'];return this[_0x4b9da8(0x4ea)](_0xd91cf2,_0x22e241);}}},Scene_Name['prototype'][_0x9eb9ae(0x8cb)]=function(){return 0x0;},Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x766)]=function(){const _0x453c1d=_0x9eb9ae;return Scene_Name[_0x453c1d(0x2d8)][_0x453c1d(0x40a)][_0x453c1d(0x330)](this);},Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7a7)]=function(){const _0x443994=_0x9eb9ae;return Scene_Name[_0x443994(0x2d8)]['InputRect']['call'](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0x276064=_0x9eb9ae;if(!this[_0x276064(0x31a)])return![];return VisuMZ['CoreEngine'][_0x276064(0x1dc)][_0x276064(0x57f)]['EnableNameInput'];},Scene_Name['prototype'][_0x9eb9ae(0x892)]=function(){const _0x4caebf=_0x9eb9ae;return this[_0x4caebf(0x187)]()?TextManager['getInputButtonString']('tab'):Scene_MenuBase[_0x4caebf(0x61d)][_0x4caebf(0x892)][_0x4caebf(0x330)](this);},Scene_Name['prototype'][_0x9eb9ae(0x8d5)]=function(){const _0x53391a=_0x9eb9ae;if(this['EnableNameInput']()){if('QRqPe'===_0x53391a(0x8b7)){const _0x1e5bdf=VisuMZ[_0x53391a(0x68b)]['Settings'][_0x53391a(0x57f)];return this[_0x53391a(0x31a)][_0x53391a(0x4cb)]===_0x53391a(0x619)?_0x1e5bdf[_0x53391a(0x51b)]||_0x53391a(0x51b):_0x1e5bdf[_0x53391a(0x359)]||_0x53391a(0x359);}else return this[_0x53391a(0x4d2)]()['level'];}else{if(_0x53391a(0x382)===_0x53391a(0x382))return Scene_MenuBase['prototype'][_0x53391a(0x8d5)]['call'](this);else{const _0x5c2040=_0x53391a(0x642);this[_0x53391a(0x3d6)]=this[_0x53391a(0x3d6)]||{};if(this[_0x53391a(0x3d6)][_0x5c2040])return this[_0x53391a(0x3d6)][_0x5c2040];const _0x4cd538=_0x1f1375[_0x53391a(0x68b)][_0x53391a(0x1dc)][_0x53391a(0x867)]['ColorExpGauge1'];return this[_0x53391a(0x4ea)](_0x5c2040,_0x4cd538);}}},VisuMZ['CoreEngine'][_0x9eb9ae(0x27c)]=Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x788)],Scene_Name[_0x9eb9ae(0x61d)]['onInputOk']=function(){const _0x12de4b=_0x9eb9ae;this[_0x12de4b(0x774)]()?this[_0x12de4b(0x112)]():VisuMZ['CoreEngine']['Scene_Name_onInputOk'][_0x12de4b(0x330)](this);},Scene_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x774)]=function(){const _0x3d0b51=_0x9eb9ae,_0x5e803f=VisuMZ[_0x3d0b51(0x68b)][_0x3d0b51(0x1dc)][_0x3d0b51(0x57f)];if(!_0x5e803f)return![];const _0x2739e1=_0x5e803f[_0x3d0b51(0x3cc)];if(!_0x2739e1)return![];const _0x3ec908=this[_0x3d0b51(0x181)][_0x3d0b51(0x1e8)]()['toLowerCase']();for(const _0x1f3495 of _0x2739e1){if(_0x3ec908[_0x3d0b51(0x111)](_0x1f3495['toLowerCase']()))return!![];}return![];},Scene_Name['prototype'][_0x9eb9ae(0x112)]=function(){const _0x4e5f3d=_0x9eb9ae;SoundManager[_0x4e5f3d(0x3bc)]();},VisuMZ['CoreEngine'][_0x9eb9ae(0x3cf)]=Scene_Battle['prototype'][_0x9eb9ae(0x1ed)],Scene_Battle['prototype'][_0x9eb9ae(0x1ed)]=function(){const _0x51bf2c=_0x9eb9ae;VisuMZ[_0x51bf2c(0x68b)][_0x51bf2c(0x3cf)]['call'](this);if($gameTemp[_0x51bf2c(0x56c)])this[_0x51bf2c(0x6f1)]();},Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6f1)]=function(){const _0x582bf7=_0x9eb9ae;!BattleManager[_0x582bf7(0x36a)]()&&!this[_0x582bf7(0x451)]&&!$gameMessage[_0x582bf7(0x5ed)]()&&(_0x582bf7(0x16d)!=='fYBKj'?this['_closing']=![]:(this[_0x582bf7(0x451)]=!![],this[_0x582bf7(0x1ed)](),SceneManager[_0x582bf7(0x3d0)](),this[_0x582bf7(0x451)]=![]));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x50a)]=Scene_Battle[_0x9eb9ae(0x61d)]['createCancelButton'],Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ad)]=function(){const _0x498675=_0x9eb9ae;VisuMZ[_0x498675(0x68b)][_0x498675(0x50a)]['call'](this),SceneManager[_0x498675(0x2e4)]()&&this[_0x498675(0x7bf)]();},Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7bf)]=function(){const _0x41d428=_0x9eb9ae;this[_0x41d428(0x7e2)]['x']=Graphics[_0x41d428(0x57c)]+0x4,this[_0x41d428(0x49f)]()?_0x41d428(0x681)===_0x41d428(0x15b)?this[_0x41d428(0x7a9)](0x0):this['_cancelButton']['y']=Graphics[_0x41d428(0x18a)]-this[_0x41d428(0x1b5)]():this[_0x41d428(0x7e2)]['y']=0x0;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x44d)]=Sprite_Button[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)],Sprite_Button[_0x9eb9ae(0x61d)]['initialize']=function(_0x118a26){const _0x2aea3f=_0x9eb9ae;VisuMZ[_0x2aea3f(0x68b)][_0x2aea3f(0x44d)][_0x2aea3f(0x330)](this,_0x118a26),this[_0x2aea3f(0x300)]();},Sprite_Button['prototype']['initButtonHidden']=function(){const _0x5c3ebc=_0x9eb9ae,_0x92c710=VisuMZ[_0x5c3ebc(0x68b)][_0x5c3ebc(0x1dc)]['UI'];this[_0x5c3ebc(0x21d)]=![];switch(this['_buttonType']){case _0x5c3ebc(0x118):this[_0x5c3ebc(0x21d)]=!_0x92c710[_0x5c3ebc(0x47d)];break;case _0x5c3ebc(0x593):case _0x5c3ebc(0x5c9):this[_0x5c3ebc(0x21d)]=!_0x92c710[_0x5c3ebc(0x654)];break;case _0x5c3ebc(0x3fe):case'up':case _0x5c3ebc(0x177):case _0x5c3ebc(0x524):case'ok':this[_0x5c3ebc(0x21d)]=!_0x92c710['numberShowButton'];break;case _0x5c3ebc(0x819):this[_0x5c3ebc(0x21d)]=!_0x92c710[_0x5c3ebc(0x374)];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2df)],Sprite_Button['prototype'][_0x9eb9ae(0x2df)]=function(){const _0x1a2545=_0x9eb9ae;SceneManager[_0x1a2545(0x418)]()||this[_0x1a2545(0x21d)]?this[_0x1a2545(0x202)]():VisuMZ[_0x1a2545(0x68b)]['Sprite_Button_updateOpacity']['call'](this);},Sprite_Button['prototype'][_0x9eb9ae(0x202)]=function(){const _0x334f03=_0x9eb9ae;this['visible']=![],this[_0x334f03(0x245)]=0x0,this['x']=Graphics[_0x334f03(0x792)]*0xa,this['y']=Graphics[_0x334f03(0x71d)]*0xa;},VisuMZ['CoreEngine'][_0x9eb9ae(0x10a)]=Sprite_Battler[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3dc)],Sprite_Battler[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3dc)]=function(_0x10bd18,_0x52de04,_0x5dbb6e){const _0x4f81c7=_0x9eb9ae;if(this[_0x4f81c7(0x4c6)]!==_0x10bd18||this['_targetOffsetY']!==_0x52de04){if(_0x4f81c7(0x5e8)!=='HfYcB')return _0x3df2f5['layoutSettings'][_0x4f81c7(0x7d7)][_0x4f81c7(0x330)](this);else this[_0x4f81c7(0x116)]('Linear'),this[_0x4f81c7(0x565)]=_0x5dbb6e;}VisuMZ[_0x4f81c7(0x68b)][_0x4f81c7(0x10a)][_0x4f81c7(0x330)](this,_0x10bd18,_0x52de04,_0x5dbb6e);},Sprite_Battler[_0x9eb9ae(0x61d)][_0x9eb9ae(0x116)]=function(_0x3586d9){const _0xa2bcc1=_0x9eb9ae;this[_0xa2bcc1(0x12a)]=_0x3586d9;},Sprite_Battler[_0x9eb9ae(0x61d)][_0x9eb9ae(0x553)]=function(){const _0x419440=_0x9eb9ae;if(this[_0x419440(0x7a8)]<=0x0)return;const _0x594d90=this[_0x419440(0x7a8)],_0x224dfe=this[_0x419440(0x565)],_0x3d252b=this[_0x419440(0x12a)];this[_0x419440(0x90a)]=this['applyEasing'](this[_0x419440(0x90a)],this[_0x419440(0x4c6)],_0x594d90,_0x224dfe,_0x3d252b),this['_offsetY']=this[_0x419440(0x65c)](this['_offsetY'],this['_targetOffsetY'],_0x594d90,_0x224dfe,_0x3d252b),this[_0x419440(0x7a8)]--;if(this[_0x419440(0x7a8)]<=0x0)this['onMoveEnd']();},Sprite_Battler[_0x9eb9ae(0x61d)]['applyEasing']=function(_0x363e66,_0x1dd580,_0xee5647,_0x2006e6,_0x249e49){const _0xb2d89=_0x9eb9ae,_0x23b7d9=VisuMZ[_0xb2d89(0x638)]((_0x2006e6-_0xee5647)/_0x2006e6,_0x249e49||_0xb2d89(0x153)),_0x47c686=VisuMZ[_0xb2d89(0x638)]((_0x2006e6-_0xee5647+0x1)/_0x2006e6,_0x249e49||'Linear'),_0x46cbc1=(_0x363e66-_0x1dd580*_0x23b7d9)/(0x1-_0x23b7d9);return _0x46cbc1+(_0x1dd580-_0x46cbc1)*_0x47c686;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x137)]=Sprite_Actor['prototype']['setActorHome'],Sprite_Actor['prototype'][_0x9eb9ae(0x1d0)]=function(_0x284c68){const _0x4bf903=_0x9eb9ae;if(VisuMZ[_0x4bf903(0x68b)]['Settings']['UI'][_0x4bf903(0x366)]){if('VGOxg'===_0x4bf903(0x3d4))return _0x148c68['layoutSettings'][_0x4bf903(0x674)]['call'](this);else this[_0x4bf903(0x67b)](_0x284c68);}else VisuMZ[_0x4bf903(0x68b)][_0x4bf903(0x137)][_0x4bf903(0x330)](this,_0x284c68);},Sprite_Actor[_0x9eb9ae(0x61d)]['setActorHomeRepositioned']=function(_0x152538){const _0x219c31=_0x9eb9ae;let _0x920037=Math['round'](Graphics[_0x219c31(0x792)]/0x2+0xc0);_0x920037-=Math[_0x219c31(0x83f)]((Graphics[_0x219c31(0x792)]-Graphics[_0x219c31(0x57c)])/0x2),_0x920037+=_0x152538*0x20;let _0x1fb68b=Graphics[_0x219c31(0x71d)]-0xc8-$gameParty[_0x219c31(0x294)]()*0x30;_0x1fb68b-=Math[_0x219c31(0x83f)]((Graphics[_0x219c31(0x71d)]-Graphics['boxHeight'])/0x2),_0x1fb68b+=_0x152538*0x30,this['setHome'](_0x920037,_0x1fb68b);},Sprite_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x301)]=function(){const _0x2c9127=_0x9eb9ae;this[_0x2c9127(0x3dc)](0x4b0,0x0,0x78);},Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1f2)]=function(_0x43362e){const _0xa080ec=_0x9eb9ae;this[_0xa080ec(0x46f)]=_0x43362e;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x222)]=Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x284)],Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x284)]=function(){const _0x56949a=_0x9eb9ae;if(this[_0x56949a(0x46f)])return;VisuMZ['CoreEngine'][_0x56949a(0x222)][_0x56949a(0x330)](this);},VisuMZ['CoreEngine'][_0x9eb9ae(0x37d)]=Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8c7)],Sprite_Animation['prototype'][_0x9eb9ae(0x8c7)]=function(_0xf46dcf){const _0x3ebc3b=_0x9eb9ae;this['isAnimationOffsetXMirrored']()?this['setViewportCoreEngineFix'](_0xf46dcf):VisuMZ['CoreEngine'][_0x3ebc3b(0x37d)][_0x3ebc3b(0x330)](this,_0xf46dcf);},Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x167)]=function(){const _0xa1f574=_0x9eb9ae;if(!this['_animation'])return![];const _0x2dcd5f=this['_animation']['name']||'';if(_0x2dcd5f[_0xa1f574(0x6f5)](/<MIRROR OFFSET X>/i))return!![];if(_0x2dcd5f['match'](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0xa1f574(0x68b)][_0xa1f574(0x1dc)]['QoL'][_0xa1f574(0xff)];},Sprite_Animation['prototype']['setViewportCoreEngineFix']=function(_0x2dfcca){const _0x3cf561=_0x9eb9ae,_0x241135=this[_0x3cf561(0x428)],_0x587d92=this[_0x3cf561(0x428)],_0x200a7b=this[_0x3cf561(0x62c)][_0x3cf561(0x2a0)]*(this[_0x3cf561(0x33d)]?-0x1:0x1)-_0x241135/0x2,_0x4770ab=this['_animation'][_0x3cf561(0x5b4)]-_0x587d92/0x2,_0x5cea79=this[_0x3cf561(0x765)](_0x2dfcca);_0x2dfcca['gl']['viewport'](_0x200a7b+_0x5cea79['x'],_0x4770ab+_0x5cea79['y'],_0x241135,_0x587d92);},Sprite_Animation[_0x9eb9ae(0x61d)][_0x9eb9ae(0x105)]=function(_0x66719e){const _0x4aab9e=_0x9eb9ae;if(_0x66719e[_0x4aab9e(0x7ee)]){}const _0xf82fec=this['_animation']['name'];let _0x199c7e=_0x66719e[_0x4aab9e(0x71d)]*_0x66719e[_0x4aab9e(0x6a4)]['y'],_0x2c3a6c=0x0,_0x150242=-_0x199c7e/0x2;if(_0xf82fec['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x150242=-_0x199c7e;if(_0xf82fec[_0x4aab9e(0x6f5)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x150242=0x0;if(this[_0x4aab9e(0x62c)][_0x4aab9e(0x5b1)])_0x150242=0x0;if(_0xf82fec['match'](/<(?:LEFT)>/i))_0x2c3a6c=-_0x66719e[_0x4aab9e(0x792)]/0x2;if(_0xf82fec[_0x4aab9e(0x6f5)](/<(?:RIGHT)>/i))_0x2c3a6c=_0x66719e[_0x4aab9e(0x792)]/0x2;_0xf82fec[_0x4aab9e(0x6f5)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x2c3a6c=Number(RegExp['$1'])*_0x66719e[_0x4aab9e(0x792)]);_0xf82fec[_0x4aab9e(0x6f5)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x150242=(0x1-Number(RegExp['$1']))*-_0x199c7e);_0xf82fec[_0x4aab9e(0x6f5)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x2c3a6c=Number(RegExp['$1'])*_0x66719e[_0x4aab9e(0x792)],_0x150242=(0x1-Number(RegExp['$2']))*-_0x199c7e);if(_0xf82fec[_0x4aab9e(0x6f5)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x2c3a6c+=Number(RegExp['$1']);if(_0xf82fec[_0x4aab9e(0x6f5)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x150242+=Number(RegExp['$1']);_0xf82fec['match'](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x2c3a6c+=Number(RegExp['$1']),_0x150242+=Number(RegExp['$2']));const _0x598cab=new Point(_0x2c3a6c,_0x150242);return _0x66719e[_0x4aab9e(0x226)](),_0x66719e[_0x4aab9e(0x4c1)]['apply'](_0x598cab);},Sprite_AnimationMV[_0x9eb9ae(0x61d)]['setupRate']=function(){const _0x2a5963=_0x9eb9ae;this[_0x2a5963(0x663)]=VisuMZ[_0x2a5963(0x68b)]['Settings'][_0x2a5963(0x2c7)][_0x2a5963(0x125)]??0x4,this['setupCustomRateCoreEngine'](),this[_0x2a5963(0x663)]=this[_0x2a5963(0x663)][_0x2a5963(0x739)](0x1,0xa);},Sprite_AnimationMV[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f8)]=function(){const _0x24a60f=_0x9eb9ae;if(!this[_0x24a60f(0x62c)]);const _0x5eb323=this[_0x24a60f(0x62c)][_0x24a60f(0x1e8)]||'';if(_0x5eb323[_0x24a60f(0x6f5)](/<RATE:[ ](\d+)>/i)){if(_0x24a60f(0x4a5)==='rOvKm')this['_rate']=(Number(RegExp['$1'])||0x1)[_0x24a60f(0x739)](0x1,0xa);else return _0x1eeea3(_0x3b78e8)[_0x24a60f(0x3ba)](_0x92e1dc,_0x27a8ae)+',';}},Sprite_AnimationMV['prototype']['setMute']=function(_0x63e94a){this['_muteSound']=_0x63e94a;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x62d)]=Sprite_AnimationMV[_0x9eb9ae(0x61d)][_0x9eb9ae(0x632)],Sprite_AnimationMV['prototype'][_0x9eb9ae(0x632)]=function(_0x2a8aa6){const _0x37cf57=_0x9eb9ae;this[_0x37cf57(0x46f)]&&(_0x2a8aa6=JsonEx[_0x37cf57(0x80a)](_0x2a8aa6),_0x2a8aa6['se']&&(_0x37cf57(0x2ac)==='Ajeck'?this['_categoryWindow']['setBackgroundType'](_0x3f4baa[_0x37cf57(0x2d8)]['CategoryBgType']):_0x2a8aa6['se']['volume']=0x0)),VisuMZ[_0x37cf57(0x68b)][_0x37cf57(0x62d)][_0x37cf57(0x330)](this,_0x2a8aa6);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x5ee)]=Sprite_AnimationMV[_0x9eb9ae(0x61d)][_0x9eb9ae(0x865)],Sprite_AnimationMV[_0x9eb9ae(0x61d)][_0x9eb9ae(0x865)]=function(){const _0x45dcb7=_0x9eb9ae;VisuMZ[_0x45dcb7(0x68b)][_0x45dcb7(0x5ee)]['call'](this);if(this[_0x45dcb7(0x62c)][_0x45dcb7(0x4b3)]===0x3){if(this['x']===0x0)this['x']=Math[_0x45dcb7(0x74b)](Graphics[_0x45dcb7(0x792)]/0x2);if(this['y']===0x0)this['y']=Math[_0x45dcb7(0x74b)](Graphics['height']/0x2);}},Sprite_Damage[_0x9eb9ae(0x61d)][_0x9eb9ae(0x73b)]=function(_0xaa7dff){const _0x541f6d=_0x9eb9ae;let _0x503d99=Math[_0x541f6d(0x17f)](_0xaa7dff)[_0x541f6d(0x839)]();this[_0x541f6d(0x147)]()&&(_0x503d99=VisuMZ['GroupDigits'](_0x503d99));const _0x30f1b6=this[_0x541f6d(0x521)](),_0x18b282=Math[_0x541f6d(0x83f)](_0x30f1b6*0.75);for(let _0x2d64d0=0x0;_0x2d64d0<_0x503d99[_0x541f6d(0x631)];_0x2d64d0++){const _0x15c99b=this[_0x541f6d(0x8ac)](_0x18b282,_0x30f1b6);_0x15c99b['bitmap'][_0x541f6d(0x1e0)](_0x503d99[_0x2d64d0],0x0,0x0,_0x18b282,_0x30f1b6,_0x541f6d(0x7ce)),_0x15c99b['x']=(_0x2d64d0-(_0x503d99[_0x541f6d(0x631)]-0x1)/0x2)*_0x18b282,_0x15c99b['dy']=-_0x2d64d0;}},Sprite_Damage[_0x9eb9ae(0x61d)]['useDigitGrouping']=function(){const _0x59b64b=_0x9eb9ae;return VisuMZ[_0x59b64b(0x68b)][_0x59b64b(0x1dc)][_0x59b64b(0x2c7)][_0x59b64b(0x742)];},Sprite_Damage['prototype'][_0x9eb9ae(0x107)]=function(){const _0x292bd8=_0x9eb9ae;return ColorManager[_0x292bd8(0x8dc)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x848)]=Sprite_Gauge[_0x9eb9ae(0x61d)][_0x9eb9ae(0x161)],Sprite_Gauge[_0x9eb9ae(0x61d)][_0x9eb9ae(0x161)]=function(){const _0x205ec5=_0x9eb9ae;return VisuMZ[_0x205ec5(0x68b)][_0x205ec5(0x848)][_0x205ec5(0x330)](this)[_0x205ec5(0x739)](0x0,0x1);},VisuMZ['CoreEngine'][_0x9eb9ae(0x543)]=Sprite_Gauge[_0x9eb9ae(0x61d)]['currentValue'],Sprite_Gauge[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8b3)]=function(){const _0x28d789=_0x9eb9ae;let _0x5af367=VisuMZ[_0x28d789(0x68b)]['Sprite_Gauge_currentValue'][_0x28d789(0x330)](this);return _0x5af367;},Sprite_Gauge['prototype'][_0x9eb9ae(0x8b1)]=function(){const _0x24f46e=_0x9eb9ae;let _0x38775f=this[_0x24f46e(0x8b3)]();this[_0x24f46e(0x147)]()&&(_0x24f46e(0x907)!==_0x24f46e(0x907)?_0x58fe58[_0x24f46e(0x8bc)]&&(this[_0x24f46e(0x4b2)]='FTB'):_0x38775f=VisuMZ[_0x24f46e(0x29c)](_0x38775f));const _0x152940=this[_0x24f46e(0x616)]()-0x1,_0x4d29d3=this['textHeight']?this[_0x24f46e(0x508)]():this[_0x24f46e(0x19f)]();this[_0x24f46e(0x5cc)](),this[_0x24f46e(0x7c9)]['drawText'](_0x38775f,0x0,0x0,_0x152940,_0x4d29d3,'right');},Sprite_Gauge['prototype'][_0x9eb9ae(0x39c)]=function(){return 0x3;},Sprite_Gauge[_0x9eb9ae(0x61d)][_0x9eb9ae(0x147)]=function(){const _0x2c1fa2=_0x9eb9ae;return VisuMZ[_0x2c1fa2(0x68b)][_0x2c1fa2(0x1dc)][_0x2c1fa2(0x2c7)][_0x2c1fa2(0x324)];},Sprite_Gauge[_0x9eb9ae(0x61d)][_0x9eb9ae(0x107)]=function(){const _0x10e468=_0x9eb9ae;return ColorManager[_0x10e468(0x2f0)]();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x537)]=Sprite_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6a2)],Sprite_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6a2)]=function(){const _0x5a885d=_0x9eb9ae;if(this[_0x5a885d(0x60b)]['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i))_0x5a885d(0x63b)===_0x5a885d(0x722)?this[_0x5a885d(0x7e2)]['x']=_0x476a46['boxWidth']+0x4:this[_0x5a885d(0x56d)](Number(RegExp['$1']));else{if(_0x5a885d(0x49a)==='zEnCB')VisuMZ['CoreEngine'][_0x5a885d(0x537)][_0x5a885d(0x330)](this);else return _0x45cbbf[_0x5a885d(0x68b)][_0x5a885d(0x1dc)][_0x5a885d(0x2c7)][_0x5a885d(0x55e)];}},Sprite_Picture['prototype'][_0x9eb9ae(0x56d)]=function(_0x401ff9){const _0x203f50=_0x9eb9ae,_0x39a995=ImageManager[_0x203f50(0x7bb)],_0x5b0dbb=ImageManager[_0x203f50(0x59d)],_0xe9f095=this[_0x203f50(0x60b)][_0x203f50(0x6f5)](/SMOOTH/i);this[_0x203f50(0x7c9)]=new Bitmap(_0x39a995,_0x5b0dbb);const _0x55353e=ImageManager[_0x203f50(0x41b)](_0x203f50(0x4cc)),_0x4778ad=_0x401ff9%0x10*_0x39a995,_0x76df64=Math['floor'](_0x401ff9/0x10)*_0x5b0dbb;this[_0x203f50(0x7c9)][_0x203f50(0x391)]=_0xe9f095,this[_0x203f50(0x7c9)]['blt'](_0x55353e,_0x4778ad,_0x76df64,_0x39a995,_0x5b0dbb,0x0,0x0,_0x39a995,_0x5b0dbb);};function _0x4c77(){const _0xfa2f11=['getLevel','HQKEY','updatePictureAntiZoom','Game_Interpreter_command105','padding','processBack','HIT','buttons','sparamRateJS','IconSParam6','type','ExtDisplayedParams','refresh','displayY','alwaysDash','InputRect','TRG','CUzbu','isActiveTpb','ShitM','App','SParamVocab5','clear','Window_StatusBase_drawActorSimpleStatus','anchorCoreEasing','sceneTerminationClearEffects','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','toUpperCase','DataManager_setupNewGame','IconXParam9','SwitchActorText','buttonAssistKey1','RIGHT','_pictureCoordinatesWindow','CPqVo','%1%2','MEV','TextManager_param','repositionEnemiesByResolution','ColorHPGauge2','vcItI','TranslucentOpacity','flush','OUTCIRC','updateData','refreshDimmerBitmap','isNormalPriority','Game_Action_updateLastTarget','ShowItemBackground','F13','Game_Action_numRepeats','advanced','BuyBgType','buttonAssistWindowButtonRect','_fauxAnimationQueue','parse','setFrame','createChildSprite','evade','sqrt','titles2','VMfoK','drawValue','jKtFF','currentValue','enableDigitGrouping','getButtonAssistLocation','BluUj','QRqPe','_pictureCoordinatesMode','SParamVocab7','buttonAssistText4','MenuBg','VisuMZ_2_BattleSystemFTB','TjSiu','subjectHitRate','updateCoreEasing','PRESERVCONVERSION(%1)','SystemSetBattleSystem','ZStVz','VxbTs','Actor','F16','processEscape','setViewport','hJVLz','EquipMenu','processFauxAnimationRequests','helpAreaHeight','qOmug','BTestItems','_optionsWindow','_upArrowSprite','subtitle','DocumentTitleFmt','win32','EnableNumberInput','Upper\x20Left','buttonAssistText1','MzPcY','yScrollLinkedOffset','CodeJS','move','replace','_offsetY','outlineColorDmg','Tqdib','CustomParamIcons','Version','isPlaytest','TUnVi','transform','HELP','ESC','iQwex','alphabetic','_tempActor','markCoreEngineModified','WIN_OEM_FJ_ROYA','right','substring','AwokO','MainMenu','processCursorMove','areButtonsOutsideMainUI','makeFontSmaller','updateOrigin','OTHSf','goldWindowRect','reserveCommonEvent','Scene_Name_create','Window','IBhSG','setupBattleTestItems','createFauxAnimationSprite','_sellWindow','_categoryWindow','faces','_targetX','KHBxa','Scene_Map_createSpriteset','WSsVJ','canUse','EXR','WFNgp','helpWindowRect','checkCacheKey','335ODNnuH','hQhrx','StatusEquipRect','22256JUsqBf','_offsetX','Scene_Map_createSpritesetFix','FUNC','RevertPreserveNumbers','Bitmap_strokeRect','xparamPlus','zLYFe','VOLUME_UP','INOUTSINE','stencilOp','REPLACE','sparamFlatBonus','forceStencil','rCgIt','_makeFontNameText','_stored_mpGaugeColor1','Game_System_initialize','WIN_OEM_PA3','Plus','process_VisuMZ_CoreEngine_CustomParameters','DpWjV','showDevTools','ScreenShake','PositionY','altKey','addChild','getColor','map','pictureButtons','ButtonHeight','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','data/','default','ParseTilesetNotetags','mpGaugeColor2','AnimationMirrorOffset','background','skillTypes','windowPadding','_active','expGaugeColor1','targetSpritePosition','Icon','valueOutlineColor','createTitleButtons','mainFontSize','Sprite_Battler_startMove','NUMPAD1','quit','NoTileShadows','send','INOUTQUART','ARRAYJSON','includes','onInputBannedWords','globalAlpha','QwertyLayout','1.4.4','setMoveEasingType','OPEN_CURLY_BRACKET','cancel','sEEyt','destroyed','ScaleX','itemLineRect','playCancel','IconXParam7','Game_BattlerBase_initMembers','iINsv','_coreEasingType','originalJS','cursorLeft','%1〘Choice\x20Cancel〙%1','MvAnimationRate','Conditional\x20Branch\x20Script\x20Error','drawParamName','EQUALS','retrieveFauxAnimation','_moveEasingType','resetBattleSystem','Zxxjc','exit','NewGameBoot','_shouldPreventDefault','_windowskin','makeTargetSprites','repeat','_onceParallelInterpreters','gradientFillRect','Type','gameTitle','Sprite_Actor_setActorHome','_smooth','gaugeLineHeight','sparamPlus2','BgFilename1','DummyRect','saTWp','isPointAnimationPlaying','AMPERSAND','TitleCommandList','QUESTION_MARK','qTzxP','HelpBgType','setLastPluginCommandInterpreter','GuEHX','xKfCG','useDigitGrouping','DOUBLE_QUOTE','measureTextWidth','ExportAllTroopText','needsUpdate','maxTp','Window_Base_initialize','removeAllPointAnimations','catchUnknownError','font','getPointAnimationLayer','updateDocumentTitle','Linear','SLEEP','rRmoZ','IDs','_storedStack','Abbreviation','updateClose','WIN_OEM_ATTN','vHHFm','ALTGR','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','HANJA','status','EjCVk','gaugeRate','Game_Actor_levelUp','LXGgk','picture','isNumpadPressed','XParamVocab6','isAnimationOffsetXMirrored','_refreshArrows','renderNoMask','_targetScaleY','COMMA','_targetOffsetY','fYBKj','INQUAD','dimColor2','XHqvF','process_VisuMZ_CoreEngine_Functions','textAlign','UOUZg','BoxMargin','ParseStateNotetags','setMainFontSize','down2','itemHit','CommandBgType','successRate','isMaskingEnabled','TSvDq','_backSprite1','displayX','abs','Window_NameInput_refresh','_editWindow','VisuMZ_1_BattleCore','ytSDy','TextCodeNicknames','Scene_MenuBase_createCancelButton','isAnimationPlaying','EnableNameInput','getCombinedScrollingText','key%1','boxHeight','kPLQN','MultiKeyFmt','WduSk','BattleManager_update','Tilpl','pow','processCursorHomeEndTrigger','targetBackOpacity','applyCoreEasing','ONE','NbAYt','dexcb','nBZdr','GoldBgType','NewGameCommonEventAll','toLowerCase','_statusWindow','jsQuickFunc','loadTitle1','tpColor','bitmapHeight','_forcedTroopView','initVisuMZCoreEngine','setEasingType','storeMapData','Scene_Menu_create','setSideView','qSBTd','applyForcedGameTroopSettingsCoreEngine','onNameOk','OUTELASTIC','eYUaM','ShopMenu','MCR','createCancelButton','gainSilentTp','resetFontSettings','onLoad','VisuMZ_2_BattleSystemSTB','Enemy','openness','vertJS','buttonAreaHeight','WASD','FDR','destroy','meVolume','VOLUME_DOWN','vbGXG','IconXParam0','targetScaleX','CLOSE_CURLY_BRACKET','hwkRt','targetScaleY','showPicture','categoryWindowRect','CallHandlerJS','mainAreaHeightSideButtonLayout','moveRelativeToResolutionChange','_hideButtons','Scene_Item_create','powerUpColor','TimeProgress','mainAreaHeight','xparamRate','terminate','OSQct','Bitmap_fillRect','helpAreaTop','setActorHome','_paramPlus','string','1.3.0','blt','scaleSprite','WIN_OEM_FINISH','DATABASE','isItem','scaleMode','_shakePower','getInputMultiButtonStrings','Settings','EVA','WIN_OEM_WSCTRL','command111','drawText','STENCIL_BUFFER_BIT','isEventRunning','systemColor','stringKeyMap','backspace','open','_commonEventLayers','name','Sprite_destroy','GKXEk','LLfjs','lzVHB','update','sparam','drawCurrencyValue','_refreshPauseSign','nRUdm','setMute','save','fSOZX','ctrl','CudxX','xparamRate1','ADD','makeAutoBattleActions','Yndzl','Enable','STB','ExtJS','EeCtW','useDigitGroupingEx','CEV','CNT','hideButtonFromView','UJcXR','contentsOpacity','mev','Bitmap_blt','isBottomHelpMode','_mp','%1/','encounterStepsMinimum','updateKeyText','processKeyboardHome','index','endAnimation','numActions','maxLevel','_lastPluginCommandInterpreter','INSERT','EXCLAMATION','Opacity','strokeRect','_currentMap','Bitmap_clearRect','_commandWindow','NUMPAD2','Max','createPointAnimationTargets','min','_isButtonHidden','paramPlusJS','ColSpacing','drawGameSubtitle','commandWindowRows','Sprite_Animation_processSoundTimings','_index','PositionJS','STR','updateTransform','_margin','_digitGroupingEx','Game_Interpreter_updateWaitMode','WxYIu','title','INOUTQUINT','_duration','AkpNj','isEnabled','rDYRA','INOUTBACK','EdflI','drawGoldItemStyle','VisuMZ_2_BattleSystemBTB','ParseActorNotetags','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','show','YJYfY','_shakeSpeed','isForFriend','ceil','_pictureContainer','determineSideButtonLayoutValid','VariableJsBlock','Gold','_scaleY','description','_updateFilterArea','SellRect','buyWindowRect','opacity','MwEzj','dashToggle','xparamRate2','ParseWeaponNotetags','setAction','bgs','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','INBOUNCE','setClickHandler','return\x200','AuWFK','Layer','OUTCUBIC','LoadMenu','pvmGq','ItemMenu','_isPlaytest','image-rendering','Scene_Boot_loadSystemImages','ConvertParams','X:\x20%1','EISU','MAT','Bitmap_drawTextOutline','IconXParam8','IconParam0','clearForcedGameTroopSettingsCoreEngine','reserveNewGameCommonEvent','kwbHO','_sideButtonLayout','xScrollLinkedOffset','OTB','Mute','targetEvaRate','SQUYi','_data','Flat2','WIN_OEM_FJ_MASSHOU','isSceneMap','CTB','_opening','OptionsMenu','Scene_Shop_create','YPOCM','playTestCtrlT','_stored_powerDownColor','MapOnceParallel','OFgAX','params','VJfhE','paramRateJS','IconXParam1','application/json','isOptionValid','Scene_Name_onInputOk','F20','Subtitle','gainItem','render','FfWNM','OUTSINE','Scene_Status_create','processSoundTimings','_stored_deathColor','Window_NameInput_cursorDown','sellWindowRect','HsGLk','playOk','slotWindowRect','param','Scene_Map_initialize','hit','ShortcutScripts','ARRAYFUNC','ColorCTGauge1','fgNWQ','setEnemyAction','xCMjR','maxBattleMembers','GbfOm','LPyWb','_slotWindow','\x5c}❪SHIFT❫\x5c{','PIPE','kaYBL','yAGkg','GroupDigits','Game_Picture_updateMove','isSpecialCode','_pointAnimationQueue','offsetX','Total','NsHlD','horzJS','cursorPagedown','AcWJQ','PHA','hXIpW','CustomParamType','Origin','animations','ymMnU','vwHLv','pages','subject','_pressed','IconSParam9','BattleSystem','origin','20702VhKDjo','shake','TitlePicButtons','mJihH','NWSVL','FggqK','MDR','MHYXD','createPointAnimation','itemEva','lWoKx','Game_Action_itemHit','xparamPlus2','SEPARATOR','_stored_ctGaugeColor1','_cacheScaleY','Window_ShopSell_isEnabled','processMoveCommand','slice','Scene_MenuBase_mainAreaTop','QoL','JmVlI','_stored_hpGaugeColor1','DefaultStyle','Chance','ActorBgType','drawTextTopAligned','4090509ljmXyT','zrlEo','startAnimation','Game_Troop_setup','Game_Party_consumeItem','tkThR','isTdF','IconParam2','fromCharCode','ftNOf','layoutSettings','textColor','inBattle','rhgTA','PictureEasingType','_downArrowSprite','RlLgY','updateOpacity','<%1\x20%2:[\x20]','paramFlat','PDpIQ','innerHeight','isSideButtonLayout','updatePositionCoreEngineShakeVert','updatePointAnimations','Window_NameInput_processTouch','SSHrm','InputBgType','DimColor1','updateCurrentEvent','_coreEasing','CIRCUMFLEX','nw.gui','iclon','outlineColorGauge','loadWindowskin','DfdOl','([\x5c+\x5c-]\x5cd+)>','battlebacks2','PA1','IconSParam3','img/%1/','Vavan','rSqgX','svfgH','terms','CustomParam','itemHitImprovedAccuracy','SwitchRandomizeRange','_pagedownButton','initButtonHidden','retreat','setupButtonImage','_backgroundFilter','WIN_OEM_FJ_LOYA','OGSRj','Input_setupEventHandlers','EVAL','AutoStretch','F21','_itemWindow','integer','targetX','ExportCurMapText','damageColor','tmroF','paramBase','version','SParameterFormula','GoldRect','Scene_GameEnd_createBackground','PWKuj','TILDE','top','Scene_Boot_startNormalGame','OptionsBgType','_inputWindow','dimColor1','aKhfk','ShowDevTools','createFauxAnimation','Rate1','adjustBoxSize','PictureID','loadMapData','updatePositionCoreEngine','DigitGroupingGaugeSprites','rwSrh','OptionsRect','XPFeQ','SParamVocab8','gaugeBackColor','isFauxAnimationPlaying','DIVIDE','rkpGM','dummyWindowRect','button','setColorTone','call','MAX_SAFE_INTEGER','addChildToBack','Scene_Boot_updateDocumentTitle','makeEncounterCount','NUsPV','ARRAYEVAL','_battlerName','CategoryRect','smallParamFontSize','updateBackOpacity','Spriteset_Base_initialize','reservePlayTestNewGameCommonEvent','_mirror','CommonEventID','Graphics_centerElement','blockWidth','drawCurrentParam','isNextScene','_width','iKolG','BTestArmors','Control\x20Variables\x20Script\x20Error','randomInt','buttonAssistOffset1','isMenuButtonAssistEnabled','ofucS','_menuButton','NDCSU','OIYKY','INOUTEXPO','setValue','NxrRR','Rate','itemRect','push','ItemStyle','ListRect','Scene_Map_updateMain','_storedMapText','SmartEventCollisionPriority','Manual','Window_NameInput_cursorRight','font-smooth','F23','none','volume','Scene_Base_terminateAnimationClearBugFix','Scene_Map_createSpriteset_detach','F22','24CqsDoz','_hideTileShadows','_centerElementCoreEngine','titleCommandWindow','RepositionActors','IconXParam2','kMfQr','mainAreaBottom','isInputting','Window_NameInput_cursorUp','vbHyH','colSpacing','tab','INOUTCUBIC','removeChild','list','WIN_OEM_CLEAR','OUIrV','menuShowButton','defineProperty','buttonAssistText5','StatusParamsBgType','INSINE','backOpacity','characters','BWtFp','Flat','Sprite_Animation_setViewport','updateLastTarget','XParamVocab7','processTouchModernControls','ActorHPColor','hfNzw','measureText','exportAllTroopStrings','UpdatePictureCoordinates','retrievePointAnimation','BACK_SLASH','GOtsc','operand','setHandler','iiBTS','requestMotion','uiAreaHeight','text','TPB\x20ACTIVE','Scene_MenuBase_createPageButtons','smooth','stop','ColorNormal','isEnemy','Unnamed','onerror','ctGaugeColor2','GetParamIcon','_targets','addCommand','VajDV','valueOutlineWidth','JHRFq','Window_NameInput_initialize','GoldFontSize','ExportString','calcEasing','Game_Picture_calcEasing','level','get','_targetOpacity','changeClass','_bitmap','updateWaitMode','ParseEnemyNotetags','_pauseSignSprite','Renderer','areTileShadowsHidden','value','isArrowPressed','BKbsI','Game_Event_isCollidedWithEvents','Scene_Skill_create','Scene_Map_update','Page','isGameActive','currentClass','Plus2','isMaxLevel','xparam','RGaRx','toLocaleString','rowSpacing','playBuzzer','AwBYT','requestFauxAnimation','ProfileRect','paramWidth','focus','HASH','Window_Gold_refresh','MDF','adjustSprite','learnings','_internalTextures','bind','_stored_hpGaugeColor2','updateShadow','WkriK','BannedWords','mllSB','<JS\x20%1\x20%2:[\x20](.*)>','Scene_Battle_update','updateEffekseer','ExportAllMapText','adjustPictureAntiZoom','resetTextColor','lXVBS','BuyRect','_colorCache','NIiuV','Padding','updatePictureCoordinates','Game_Interpreter_command122','RepositionEnemies','startMove','_hovered','onMoveEnd','itemBackColor1','setupNewGame','listWindowRect','DwaEQ','hcndA','isGamepadConnected','MAX_GL_TEXTURES','ColorMPCost','members','ftXoN','F24','azYYR','batch','IconSParam4','getInputButtonString','isNwjs','ParseClassNotetags','stMUM','Bitmap_initialize','isWindowMaskingEnabled','AntiZoomPictures','_actor','bgmVolume','RGmBK','IconXParam3','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','battlebacks1','OutlineColorDmg','writeFile','UXzva','IconSParam1','down','ctXpa','commandWindowRect','SubfolderParse','Show\x20Scrolling\x20Text\x20Script\x20Error','setCommonEvent','ColorSystem','Speed','start','Spriteset_Base_destroy','textBaseline','JAxfr','EditRect','EnableMasking','tpGaugeColor1','style','create','WIN_OEM_COPY','defaultInputMode','Scene_MenuBase_mainAreaHeight','DamageColor','WIN_OEM_FJ_JISHO','MDjyb','OpenURL','F6key','F17','areButtonsHidden','EpvyS','randomJS','loadSystem','fillText','attackSkillId','setup','HbFrl','EncounterRateMinimum','add','BgFilename2','contents','RenIE','ParamChange','pVjSn','textSizeEx','_viewportSize','cursorRight','disable','paramRate1','xHHiK','ColorPowerDown','sparamPlus1','tileHeight','ELPzQ','Title','setBackgroundOpacity','keyMapper','IconParam5','AllcU','createDimmerSprite','xurYc','_coreEngineShakeStyle','drawIconBySize','YRTCM','Script\x20Call\x20Error','makeCommandList','canAttack','Game_Action_itemEva','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','filterArea','_lastX','IconIndex','eva','PictureFilename','addWindow','_dimmerSprite','pAEDC','STENCIL_TEST','measureTextWidthNoRounding','forceOutOfPlaytest','RPGMAKER_VERSION','ARRAYSTRUCT','Sprite_Button_initialize','INCUBIC','getBackgroundOpacity','FyMSj','_playtestF7Looping','ButtonAssist','WUotO','makeActionList','connected','INEXPO','NpMFN','CAPSLOCK','animationBaseDelay','initCoreEngineScreenShake','Pixelated','_buttonAssistWindow','TextStr','keypress','FTB','ZERO','framebuffer','_balloonQueue','YcznK','VbpuQ','EQUAL','Game_Picture_y','setSideButtonLayout','format','makeCoreEngineCommandList','ListBgType','SaveMenu','parseForcedGameTroopSettingsCoreEngine','ConvertNumberToString','BTB','_muteSound','BottomButtons','targetObjects','backgroundBitmap','OutlineColor','Window_Selectable_cursorDown','KEEP','jVrXR','OPEN_PAREN','sparamRate','HOME','setAttack','enemies','StartID','cancelShowButton','%1\x0a','VisuMZ_2_BattleSystemOTB','BlendMode','missed','isCancelled','WIN_OEM_ENLW','OUTQUINT','easingType','moveCancelButtonSideButtonLayout','(\x5cd+)>','ColorMPGauge1','INOUTELASTIC','_drawTextShadow','XParamVocab3','CRI','keyCode','_cache','erasePicture','setupFont','aJqyp','Input_pollGamepads','_list','aFjOB','SceneManager_exit','jeZfG','drawTextEx','drawGameVersion','overrideMimeType','zEnCB','KnOKa','Scene_Boot_onDatabaseLoaded','ActorMPColor','3987XJMBMZ','isBottomButtonMode','paramValueByName','$dataMap','MckxK','innerWidth','createPointAnimationSprite','rOvKm','guardSkillId','smoothSelect','WIN_OEM_PA2','createCommandWindow','TGR','requestPointAnimation','buttonAssistSwitch','F19','ExportCurTroopText','isPressed','_effectsContainer','SystemLoadAudio','_forcedBattleSys','position','imageSmoothingEnabled','Game_Interpreter_command355','setTargetAnchor','processAlwaysEscape','maxLvGaugeColor2','LfBBT','CShPV','VyILi','WIN_OEM_RESET','_target','maxCols','HRG','LoadError','worldTransform','EPjdx','setSkill','EndingID','IconParam1','_targetOffsetX','TDXyC','Game_Interpreter_command111','BattleManager_processEscape','AnimationPoint','_mode','IconSet','rFLgL','IconSParam8','animationId','Game_Picture_initBasic','xparamFlat1','enemy','onClick','srEmF','itemSuccessRate','IbVez','getCoreEngineScreenShakeStyle','Spriteset_Battle_createEnemies','SParamVocab3','processKeyboardEnd','_troopId','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','removeFauxAnimation','MULTIPLY','isItemStyle','ItemHeight','XParamVocab5','SideButtons','jxfTN','ptPIW','SPACE','reduce','VisuMZ_2_BattleSystemPTB','WFSuC','active','getColorDataFromPluginParameters','SnapshotOpacity','Game_Actor_changeClass','993267DjOOqJ','changeTextColor','tuxcC','ValueJS','isMagical','SParamVocab2','Window_Selectable_itemRect','Sjfln','WIN_ICO_HELP','xparamFlat2','paramchangeTextColor','_commandList','KdOuf','createPageButtons','BtQRc','tIFzw','DEF','PDR','_inputSpecialKeyCode','PTB','knocR','removeAllFauxAnimations','xparamPlusJS','KeyTAB','MAXHP','aQrAd','crisisColor','textHeight','SwitchToggleOne','Scene_Battle_createCancelButton','PictureShowIcon','tpCostColor','vYPMr','Window_Selectable_processTouch','NumberBgType','Input_clear','_buyWindow','clearStencil','NUMPAD8','IconSParam2','Znyzp','createFauxAnimationQueue','log','_stored_normalColor','ColorGaugeBack','HeODR','Keyboard','removePointAnimation','pixelated','Window_NameInput_processHandling','allowShiftScrolling','targetY','fontSize','%2%1%3','command122','up2','Window_NumberInput_start','cursorPageup','Game_Temp_initialize','INOUTQUAD','gainGold','SystemSetSideView','resize','note','isSideView','HCVyw','_stored_maxLvGaugeColor2','Spriteset_Base_update','\x0a\x0a\x0a\x0a\x0a','WIN_OEM_BACKTAB','ButtonFadeSpeed','expRate','initCoreEngine','xparamRateJS','Sprite_Picture_loadBitmap','updateAnchor','isGamepadButtonPressed','exec','ExtractStrFromMap','LvExpGauge','events','_screenY','PLAY','eKtVk','createCustomParameter','isMapScrollLinked','Sprite_Gauge_currentValue','_inputString','LEFT','_timerSprite','ImprovedAccuracySystem','KeyItemProtect','traitObjects','ItemPadding','loadTitle2','Game_Map_setup','concat','cos','Bitmap_measureTextWidth','VisuMZ_2_BattleSystemCTB','SkillMenu','Flat1','updateMove','TRAIT_PARAM','drawNewParam','makeDocumentTitle','animationShouldMirror','URL','Scene_Title_drawGameTitle','ifvRo','onDatabaseLoaded','INOUTBOUNCE','SHIFT','ModernControls','context','Input_shouldPreventDefault','11756CNzdqO','createPointAnimationQueue','%1〘End\x20Choice\x20Selection〙%1','parallaxes','_movementWholeDuration','DoZKe','SParamVocab6','updateScene','Qoxcx','ypuRJ','updateFauxAnimations','_playTestFastMode','loadIconBitmap','iCsku','addLoadListener','RofVa','seRWY','_tilemap','CommandWidth','bYyhH','Input_update','itemWindowRect','isTriggered','Scene_Map_updateScene','Window_Base_update','0.00','ylMyV','boxWidth','WDuUZ','redraw','KeyboardInput','isDying','onEscapeSuccess','IconSParam7','WIRwA','_scene','processHandling','OUTQUAD','PAUSE','ChvaG','PfbPg','ZIvll','DrawIcons','_realScale','vGDcU','OkText','end','COLON','_clickHandler','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','pageup','gqTvX','itemBackColor2','process_VisuMZ_CoreEngine_RegExp','windowRect','CustomParamNames','openingSpeed','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','_lastOrigin','movePageButtonSideButtonLayout','iconHeight','EdgDv','keyRepeatWait','SJRww','_windowLayer','drawCharacter','DuoCp','WIN_OEM_AUTO','buttonY','_stored_crisisColor','checkSubstitute','_numberWindow','(\x5cd+)([%％])>','CustomParamAbb','ETB','KeySHIFT','processKeyboardHandling','exportAllMapStrings','BTestAddedQuantity','darwin','alignBottom','_gamepadWait','left','offsetY','ASTERISK','isMVAnimation','_origin','ZRJRJ','SParamVocab1','TBQYl','Param','OUTQUART','eventsXyNt','clearRect','ucveX','buttonAssistWindowRect','ALT','_blank','playOnceParallelInterpreter','evaded','AnimationID','snAqo','ParseAllNotetags','ParamName','pagedown','VisuMZ_2_BattleSystemETB','PRINTSCREEN','setupValueFont','TCR','asin','DefaultMode','rgba(0,\x200,\x200,\x200.7)','deselect','startShake','itemPadding','WIN_OEM_CUSEL','isTouchedInsideFrame','drawParamText','TAB','mpColor','REC','GRD','isExpGaugeDrawn','SideView','eyJVQ','SlotRect','shift','rsZHy','buttonAssistKey4','_digitGrouping','cWnKu','numRepeats','XParamVocab0','Game_Picture_x','makeInputButtonString','HfYcB','ColorMaxLvGauge1','WDRpt','SystemSetWindowPadding','PositionX','isBusy','Sprite_AnimationMV_updatePosition','pictureId','statusWindowRect','anchor','performEscape','MODECHANGE','XNJrM','lineHeight','2806517ouMUwe','SParamVocab4','setupCustomRateCoreEngine','_addShadow','BasicParameterFormula','SceneManager_initialize','mainAreaTopSideButtonLayout','visible','Sprite_Picture_updateOrigin','tilesets','process_VisuMZ_CoreEngine_Notetags','FontWidthFix','getBattleSystem','qxqOF','updatePadding','IconParam7','enter','MINUS','blendFunc','number','mmp','_pictureName','onload','text%1','ShowJS','_baseSprite','duration','OS_KEY','F7key','onXhrError','atbActive','sparamPlusJS','bitmapWidth','Bitmap_drawText','UXIUM','keyboard','isFullDocumentTitle','startAutoNewGame','xtbKR','prototype','loadGameImagesCoreEngine','ProfileBgType','onKeyDownKeysF6F7','AGI','MIN_SAFE_INTEGER','OpenConsole','GameEnd','_statusParamsWindow','expGaugeColor2','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','maxLvGaugeColor1','AccuracyBoost','JUNJA','ONE_MINUS_SRC_ALPHA','_animation','Sprite_AnimationMV_processTimingData','useFontWidthFix','FINAL','targetOpacity','length','processTimingData','BackOpacity','setupCoreEngine','removeOnceParallelInterpreter','StatusBgType','_stored_mpGaugeColor2','ApplyEasing','_colorTone','_subject','KTqBa','FadeSpeed','updatePositionCoreEngineShakeRand','ScaleY','KzQxd','LINEAR','filter','_stored_expGaugeColor1','PictureEraseAll','parameters','_repositioned','Symbol','ParseItemNotetags','buttonAssistKey%1','_CoreEngineSettings','(\x5cd+\x5c.?\x5cd+)>','isInstanceOfSceneMap','contains','_dummyWindow','ExtractStrFromList','paramPlus','isClosed','processKeyboardDigitChange','NUMPAD4','oAqwc','pagedownShowButton','deflate','buttonAssistWindowSideRect','aNEqr','operation','levelUp','_closing','tGmfe','applyEasing','animationNextDelay','child_process','mpCostColor','createWindowLayer','Rate2','mhp','_rate','enableDigitGroupingEx','CommandList','toFixed','Scene_Battle_createSpritesetFix','helpAreaBottom','lvLat','updateOnceParallelInterpreters','_drawTextBody','rGedl','IconSParam5','Untitled','isHandled','StatusRect','Game_BattlerBase_refresh','zmXkN','playTestF6','ItemRect','split','playEscape','NewGameCommonEvent','moveMenuButtonSideButtonLayout','isPhysical','eGRLp','setActorHomeRepositioned','_profileWindow','Plus1','initialLevel','restore','pfqnl','GkjpG','Exported_Script_%1.txt','coreEngineRepositionEnemies','cursorUp','MRG','ColorManager_loadWindowskin','xparamFlatBonus','kxqjl','ItemBgType','EREOF','CoreEngine','2236720eAjPyI','startNormalGame','zFTMT','statusParamsWindowRect','setAnchor','BgkKM','dgtDo','LATIN1','escape','_encounterCount','2rILYow','normal','result','xparamFlatJS','_height','_maxDigits','_refreshBack','PERCENT','Scene_Battle_createSpriteset','NUM_LOCK','tQgAU','GTvfW','loadBitmap','FEbzp','scale','_fauxAnimationSprites','isKeyItem','_helpWindow','_statusEquipWindow','addOnceParallelInterpreter','system','Spriteset_Base_isAnimationPlaying','itemHeight','_scaleX','indexOf','aUhUD','Window_Base_drawCharacter','Bitmap_drawCircle','ALWAYS','_onKeyPress','statusEquipWindowRect','ITZGc','playTestF7','GoldIcon','ForceNoPlayTest','isAlive','#%1','Window_Base_createTextState','initMembers','fillRect','OUTBOUNCE','hicUc','ATK','IconParam4','jddLJ','GFsgv','_backgroundSprite','Scene_Map_createMenuButton','ColorCrisis','StatusParamsRect','isAnimationForEach','nuuVM','ColorDeath','onButtonImageLoad','nickname','Window_Selectable_drawBackgroundRect','paramMaxJS','Bfwio','EuHZE','ExtractStrFromTroop','remove','drawItem','catchLoadError','Spriteset_Base_updatePosition','catchNormalError','SceneManager_onKeyDown','paramRate','_drawTextOutline','SRnGj','_createInternalTextures','item','uUMkE','setCoreEngineScreenShakeStyle','_mapNameWindow','processTouch','join','destroyCoreEngineMarkedBitmaps','paramName','rightArrowWidth','checkSmartEventCollision','_lastY','Window_EquipItem_isEnabled','_targetY','processKeyboardBackspace','DisplayedParams','command105','IuENt','performMiss','Location','([\x5c+\x5c-]\x5cd+)([%％])>','process_VisuMZ_CoreEngine_jsQuickFunctions','updatePlayTestF7','ParamArrow','XParamVocab8','GoldMax','match','Window_Selectable_processCursorMove','seVolume','levelUpRecovery','skills','_stored_ctGaugeColor2','DimColor2','IconXParam5','_opacity','META','sv_actors','_defaultStretchMode','fadeSpeed','_customModified','Game_Picture_move','yKYCK','GoldChange','FontSmoothing','INOUTCIRC','home','buttonAssistOffset%1','ExportStrFromAllMaps','paramBaseAboveLevel99','Window_NameInput_cursorPagedown','INQUART','【%1】\x0a','object','SystemSetFontSize','StatusMenu','nah','max','Map%1','EnableJS','Map%1.json','DETACH_PICTURE_CONTAINER','UzToq','CvlmU','Window_NameInput_cursorPageup','Scene_Battle_createSpriteset_detach','setBackgroundType','height','drawGauge','》Comment《\x0a%1\x0a','drawActorLevel','PixelateImageRendering','CzAnZ','initCoreEasing','apply','KANA','ScreenResolution','MRF','nECVj','BgType','HelpRect','Game_Picture_show','DtDhg','_baseTexture','Tilemap_addShadow','initBasic','PGDN','filters','createMenuButton','XParameterFormula','constructor','ColorExpGauge2','isActor','SParamVocab9','fillStyle','clamp','createEnemies','createDigits','SCALE_MODES','_pageupButton','currencyUnit','DrawItemBackgroundJS','OutlineColorGauge','aignz','DigitGroupingDamageSprites','CANCEL','runCombinedScrollingTextAsCode','YdBsH','children','sin','maxItems','_listWindow','lJzlJ','round','Window_StatusBase_drawActorLevel','_clientArea','createBackground','setGuard','ParseArmorNotetags','drawCircle','BlurFilter','clearCachedKeys','rgba(0,\x200,\x200,\x201.0)','QGRRw','OUTBACK','Window_Base_drawFace','MenuLayout','SellBgType','YSJOA','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','code','processKeyboardDelete','Graphics_printError','drawActorExpGauge','hpColor','Game_Character_processMoveCommand','StatusEquipBgType','_stored_tpGaugeColor2','BaNds','targetPosition','editWindowRect','drawRightArrow','sparamPlus','OpenSpeed','HYPHEN_MINUS','Game_Event_start','kjwyp','_screenX','_targetAnchor','F11','catchException','_actorWindow','buttonAssistOffset5','TextJS','doesNameContainBannedWords','option','sQjOP','SwitchToggleRange','rGfee','Window_Base_drawIcon','buttonAssistKey5','GREATER_THAN','vertical','sparamRate1','〘Show\x20Text〙\x0a','random','DELETE','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','setSize','NUM','outlineColor','paramMax','ActorRect','createCustomBackgroundImages','onInputOk','drawIcon','VariableEvalReference','drawFace','drawSegment','calcCoreEasing','touchUI','LUK','isSmartEventCollisionOn','_changingClass','width','_isWindow','ENTER_SPECIAL','EditBgType','mainCommandWidth','getLastPluginCommandInterpreter','hide','drawActorSimpleStatus','vIDUe','EscapeAlways','Scene_Base_terminate','tpGaugeColor2','updateMainMultiply','sparamRate2','CRSEL','stencilFunc','_anchor','PGrtZ','onKeyDown','PreserveNumbers','GipDc','inputWindowRect','_movementDuration','select','WRUFy','command355','processPointAnimationRequests','ijVaw','currentLevelExp','registerCommand','GgEUd','bgsVolume','padZero','setActionState','_hp','TPB\x20WAIT','snapForBackground','bhsAH','hpGaugeColor2','pointY','updateMotion','iconWidth','setWindowPadding','WIN_ICO_00','RegExp','repositionCancelButtonSideButtonLayout','nnSIi','paramFlatBonus','pendingColor','LineHeight','CHzBZ','createSpriteset','INCIRC','switchModes','MAXMP','bitmap','_backSprite2','updateMain','uwWTL','goto','center','isOpen','initialize','pointX','CLOSE_PAREN','printError','ColorTPCost','Graphics_defaultStretchMode','_onKeyDown','CommandRect','isRepeated','ParamMax','buttonAssistOk','buttonAssistCancel','djegh','GET','fxkpr','eGSGv','BattleManager_checkSubstitute','sv_enemies','_cancelButton','ACCEPT','_spriteset','Bitmap_gradientFillRect','ifnLw','test','_stored_maxLvGaugeColor1','faceHeight','windowOpacity','FunctionName','processDigitChange','CBWOt','_mainSprite','FontSize','aVULY','skillTypeWindowRect','optSideView','ywtYv','_pointAnimationSprites','playCursor','mainAreaTop','showPointAnimations','〘Scrolling\x20Text〙\x0a','SUBTRACT','showFauxAnimations','WIN_OEM_PA1','ctrlKey','_number','bgm','LevelUpFullHp','uiAreaWidth','INQUINT','getGamepads','isOpenAndActive','Ujqfy','ParseSkillNotetags','CONTEXT_MENU','buttonAssistOffset2','setCoreEngineUpdateWindowBg','_cacheScaleX','makeDeepCopy','textWidth','_skillTypeWindow','_destroyInternalTextures','createButtonAssistWindow','ColorHPGauge1','playCursorSound','SwitchRandomizeOne','clone','INELASTIC','VisuMZ_1_OptionsCore','sparamFlat2','RepositionEnemies130','_animationQueue','optionsWindowRect','menu','cursorDown','UNDERSCORE','trim','Smooth','clearOnceParallelInterpreters','JEwRV','Scene_Map_updateMainMultiply','isPlaying','buttonAssistKey2','rFGya','_shakeDuration','_context','NEAREST','Game_Screen_initialize','ImgLoad','processCursorMoveModernControls','Scene_MenuBase_helpAreaTop','QgXwY','buttonAssistOffset4','inbounce','setBattleSystem','〘Common\x20Event\x20%1:\x20%2〙\x20Start','translucentOpacity','targetContentsOpacity','isCollidedWithEvents','DOWN','〘Common\x20Event\x20%1:\x20%2〙\x20End','6rEvWfQ','SystemLoadImages','OUTEXPO','drawGameTitle','toString','oACsB','_pollGamepads','IconXParam4','hWdBl','updatePositionCoreEngineShakeHorz','floor','FiBBg','mirror','mpGaugeColor1','CONVERT','buttonAssistText%1','updateDashToggle','actorWindowRect','Game_Action_setAttack','Sprite_Gauge_gaugeRate','Game_Actor_paramBase','platform','drawActorNickname','UAMGz','createTextState','_stored_powerUpColor','Scene_Options_create','XParamVocab1','Window_Selectable_cursorUp','outbounce','isUseModernControls','_goldWindow','PictureCoordinatesMode','loadPicture','Scene_Base_create','ZbsQM','DigitGroupingExText','Window_NameInput_cursorLeft','WindowLayer_render','isSceneBattle','CreateBattleSystemID','ColorTPGauge1','hpGaugeColor1','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','DetachMapPictureContainer','ARRAYSTR','GoldOverlap','mapId','updatePosition','actor','Color','getCustomBackgroundSettings','RbzpA','alpha','F12','_action','openURL','isCursorMovable','createJsQuickFunction','ColorPowerUp','pictures','mute'];_0x4c77=function(){return _0xfa2f11;};return _0x4c77();}function Sprite_TitlePictureButton(){const _0x44cb56=_0x9eb9ae;this[_0x44cb56(0x7d0)](...arguments);}Sprite_TitlePictureButton[_0x9eb9ae(0x61d)]=Object[_0x9eb9ae(0x40e)](Sprite_Clickable[_0x9eb9ae(0x61d)]),Sprite_TitlePictureButton['prototype'][_0x9eb9ae(0x734)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)]=function(_0x146941){const _0x567705=_0x9eb9ae;Sprite_Clickable[_0x567705(0x61d)][_0x567705(0x7d0)]['call'](this),this[_0x567705(0x269)]=_0x146941,this[_0x567705(0x591)]=null,this['setup']();},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)]['setup']=function(){const _0x55bc33=_0x9eb9ae;this['x']=Graphics['width'],this['y']=Graphics[_0x55bc33(0x71d)],this[_0x55bc33(0x5fd)]=![],this[_0x55bc33(0x302)]();},Sprite_TitlePictureButton['prototype'][_0x9eb9ae(0x302)]=function(){const _0x59da43=_0x9eb9ae;this[_0x59da43(0x7c9)]=ImageManager[_0x59da43(0x856)](this[_0x59da43(0x269)][_0x59da43(0x444)]),this[_0x59da43(0x7c9)][_0x59da43(0x56f)](this['onButtonImageLoad']['bind'](this));},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6cb)]=function(){const _0x22975a=_0x9eb9ae;this[_0x22975a(0x269)]['OnLoadJS']['call'](this),this[_0x22975a(0x269)][_0x22975a(0x224)]['call'](this),this[_0x22975a(0x24e)](this[_0x22975a(0x269)][_0x22975a(0x1c3)][_0x22975a(0x3c8)](this));},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ed)]=function(){const _0x594021=_0x9eb9ae;Sprite_Clickable[_0x594021(0x61d)]['update'][_0x594021(0x330)](this),this[_0x594021(0x2df)](),this['processTouch']();},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x701)]=function(){const _0x11b801=_0x9eb9ae;return VisuMZ['CoreEngine'][_0x11b801(0x1dc)][_0x11b801(0x758)][_0x11b801(0x431)][_0x11b801(0x533)];},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2df)]=function(){const _0x1acea3=_0x9eb9ae;if(this[_0x1acea3(0x2af)]||this['_hovered']){if(_0x1acea3(0x39d)===_0x1acea3(0x39d))this[_0x1acea3(0x245)]=0xff;else return!![];}else this['opacity']+=this['visible']?this['fadeSpeed']():-0x1*this[_0x1acea3(0x701)](),this[_0x1acea3(0x245)]=Math[_0x1acea3(0x21c)](0xc0,this['opacity']);},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x24e)]=function(_0x11eb69){const _0x5b48cb=_0x9eb9ae;this[_0x5b48cb(0x591)]=_0x11eb69;},Sprite_TitlePictureButton[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4d3)]=function(){const _0x2d3247=_0x9eb9ae;if(this[_0x2d3247(0x591)]){if('oACsB'===_0x2d3247(0x83a))this[_0x2d3247(0x591)]();else return _0x44185b[_0x2d3247(0x2d8)][_0x2d3247(0x7d7)]['call'](this);}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x33b)]=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)]=function(){const _0x4383e8=_0x9eb9ae;VisuMZ[_0x4383e8(0x68b)][_0x4383e8(0x33b)][_0x4383e8(0x330)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x9eb9ae(0x61d)]['initMembersCoreEngine']=function(){const _0x56e445=_0x9eb9ae;this[_0x56e445(0x6a5)]=[],this[_0x56e445(0x7f4)]=[],this[_0x56e445(0x809)]=this['scale']['x'],this[_0x56e445(0x2c2)]=this[_0x56e445(0x6a4)]['y'];},VisuMZ['CoreEngine'][_0x9eb9ae(0x407)]=Spriteset_Base['prototype'][_0x9eb9ae(0x1b8)],Spriteset_Base['prototype'][_0x9eb9ae(0x1b8)]=function(_0x168a21){const _0x2746bd=_0x9eb9ae;this[_0x2746bd(0x502)](),this[_0x2746bd(0x14e)](),VisuMZ['CoreEngine'][_0x2746bd(0x407)]['call'](this,_0x168a21);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x530)]=Spriteset_Base[_0x9eb9ae(0x61d)]['update'],Spriteset_Base['prototype'][_0x9eb9ae(0x1ed)]=function(){const _0x9e33cc=_0x9eb9ae;VisuMZ[_0x9e33cc(0x68b)][_0x9e33cc(0x530)][_0x9e33cc(0x330)](this),this[_0x9e33cc(0x875)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x875)]=function(){const _0x4adb71=_0x9eb9ae;if(!VisuMZ[_0x4adb71(0x68b)][_0x4adb71(0x1dc)][_0x4adb71(0x2c7)][_0x4adb71(0x3f3)])return;if(this[_0x4adb71(0x809)]===this[_0x4adb71(0x6a4)]['x']&&this['_cacheScaleY']===this[_0x4adb71(0x6a4)]['y'])return;this[_0x4adb71(0x3d2)](),this[_0x4adb71(0x809)]=this['scale']['x'],this[_0x4adb71(0x2c2)]=this[_0x4adb71(0x6a4)]['y'];},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3d2)]=function(){const _0x87c56b=_0x9eb9ae;if(SceneManager[_0x87c56b(0x26c)]()&&Spriteset_Map[_0x87c56b(0x717)]){if('isTdF'===_0x87c56b(0x2d4))return;else this[_0x87c56b(0x4b2)]=_0x87c56b(0x26d);}else{if(SceneManager[_0x87c56b(0x85c)]()&&Spriteset_Battle['DETACH_PICTURE_CONTAINER'])return;}this[_0x87c56b(0x6a4)]['x']!==0x0&&(_0x87c56b(0x755)==='JOSSA'?(_0x1744d7[_0x87c56b(0x61d)][_0x87c56b(0x1ed)][_0x87c56b(0x330)](this),this[_0x87c56b(0x89f)]()):(this[_0x87c56b(0x23c)][_0x87c56b(0x6a4)]['x']=0x1/this[_0x87c56b(0x6a4)]['x'],this[_0x87c56b(0x23c)]['x']=-(this['x']/this[_0x87c56b(0x6a4)]['x']))),this[_0x87c56b(0x6a4)]['y']!==0x0&&(this[_0x87c56b(0x23c)]['scale']['y']=0x1/this[_0x87c56b(0x6a4)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x87c56b(0x6a4)]['y']));},VisuMZ[_0x9eb9ae(0x68b)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x9eb9ae(0x61d)]['updatePosition'],Spriteset_Base['prototype'][_0x9eb9ae(0x865)]=function(){const _0x1a950a=_0x9eb9ae;VisuMZ[_0x1a950a(0x68b)][_0x1a950a(0x6d5)][_0x1a950a(0x330)](this),this[_0x1a950a(0x323)]();},Spriteset_Base[_0x9eb9ae(0x61d)]['updatePositionCoreEngine']=function(){const _0x35b73f=_0x9eb9ae;if(!$gameScreen)return;if($gameScreen[_0x35b73f(0x824)]<=0x0)return;this['x']-=Math[_0x35b73f(0x74b)]($gameScreen[_0x35b73f(0x2b4)]());const _0x32f60a=$gameScreen[_0x35b73f(0x4d7)]();switch($gameScreen['getCoreEngineScreenShakeStyle']()){case'original':this['updatePositionCoreEngineShakeOriginal']();break;case'horizontal':this[_0x35b73f(0x83e)]();break;case _0x35b73f(0x77c):this[_0x35b73f(0x2e5)]();break;default:this[_0x35b73f(0x63d)]();break;}},Spriteset_Base[_0x9eb9ae(0x61d)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x509bc2=_0x9eb9ae,_0x49f53d=VisuMZ['CoreEngine'][_0x509bc2(0x1dc)][_0x509bc2(0x920)];if(_0x49f53d&&_0x49f53d[_0x509bc2(0x122)])return _0x49f53d[_0x509bc2(0x122)][_0x509bc2(0x330)](this);this['x']+=Math[_0x509bc2(0x74b)]($gameScreen[_0x509bc2(0x2b4)]());},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x63d)]=function(){const _0x28bcec=_0x9eb9ae,_0x5827b0=VisuMZ[_0x28bcec(0x68b)]['Settings']['ScreenShake'];if(_0x5827b0&&_0x5827b0[_0x28bcec(0x41a)]){if(_0x28bcec(0x4e3)!==_0x28bcec(0x4e3)){if(!this[_0x28bcec(0x133)])return;for(const _0x5e6fc4 of this[_0x28bcec(0x133)]){_0x5e6fc4&&_0x5e6fc4['update']();}}else return _0x5827b0['randomJS'][_0x28bcec(0x330)](this);}const _0x2ef6f9=$gameScreen[_0x28bcec(0x1da)]*0.75,_0x1ff13e=$gameScreen['_shakeSpeed']*0.6,_0x404ac3=$gameScreen[_0x28bcec(0x824)];this['x']+=Math['round'](Math[_0x28bcec(0x347)](_0x2ef6f9)-Math[_0x28bcec(0x347)](_0x1ff13e))*(Math['min'](_0x404ac3,0x1e)*0.5),this['y']+=Math[_0x28bcec(0x74b)](Math[_0x28bcec(0x347)](_0x2ef6f9)-Math[_0x28bcec(0x347)](_0x1ff13e))*(Math[_0x28bcec(0x21c)](_0x404ac3,0x1e)*0.5);},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x83e)]=function(){const _0x44081a=_0x9eb9ae,_0x10e760=VisuMZ['CoreEngine']['Settings']['ScreenShake'];if(_0x10e760&&_0x10e760['horzJS']){if(_0x44081a(0x6ec)!==_0x44081a(0x6ec)){_0x3f0535[_0x44081a(0x68b)][_0x44081a(0x90b)]['call'](this);const _0x12d7a3=this[_0x44081a(0x7e4)][_0x44081a(0x546)];if(_0x12d7a3)this['addChild'](_0x12d7a3);}else return _0x10e760[_0x44081a(0x2a3)][_0x44081a(0x330)](this);}const _0x5647f1=$gameScreen[_0x44081a(0x1da)]*0.75,_0x70a1e8=$gameScreen[_0x44081a(0x239)]*0.6,_0x243e09=$gameScreen[_0x44081a(0x824)];this['x']+=Math[_0x44081a(0x74b)](Math['randomInt'](_0x5647f1)-Math['randomInt'](_0x70a1e8))*(Math[_0x44081a(0x21c)](_0x243e09,0x1e)*0.5);},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2e5)]=function(){const _0x236949=_0x9eb9ae,_0x4cfd74=VisuMZ[_0x236949(0x68b)]['Settings'][_0x236949(0x920)];if(_0x4cfd74&&_0x4cfd74[_0x236949(0x1b4)])return _0x4cfd74['vertJS'][_0x236949(0x330)](this);const _0x35c2c5=$gameScreen[_0x236949(0x1da)]*0.75,_0x45104d=$gameScreen[_0x236949(0x239)]*0.6,_0x565db5=$gameScreen[_0x236949(0x824)];this['y']+=Math['round'](Math['randomInt'](_0x35c2c5)-Math[_0x236949(0x347)](_0x45104d))*(Math['min'](_0x565db5,0x1e)*0.5);},Spriteset_Base['prototype'][_0x9eb9ae(0x56b)]=function(){const _0x5a368b=_0x9eb9ae;for(const _0x4b7dbe of this['_fauxAnimationSprites']){!_0x4b7dbe['isPlaying']()&&(_0x5a368b(0x2d7)===_0x5a368b(0x2d7)?this[_0x5a368b(0x4dd)](_0x4b7dbe):(_0xcff24c+='\x0a',_0x38a737+=_0x3479c2['parameters'][0x0]));}this[_0x5a368b(0x8ca)]();},Spriteset_Base['prototype'][_0x9eb9ae(0x8ca)]=function(){const _0x2496e8=_0x9eb9ae;for(;;){const _0x340d6c=$gameTemp['retrieveFauxAnimation']();if(_0x340d6c)this[_0x2496e8(0x31e)](_0x340d6c);else{if(_0x2496e8(0x4fb)!==_0x2496e8(0x4fb))_0x525ebc=_0x3f66b8[_0x2496e8(0x74b)](_0x43df6f),_0x8d6aba=_0x2f60df[_0x2496e8(0x74b)](_0x520587),_0x5bf587[_0x2496e8(0x68b)][_0x2496e8(0x779)][_0x2496e8(0x330)](this,_0x5a4393,_0x31e834,_0x5a0f2a);else break;}}},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x31e)]=function(_0x3abf41){const _0x16ea11=_0x9eb9ae,_0x4fd05d=$dataAnimations[_0x3abf41[_0x16ea11(0x4cf)]],_0x42a170=_0x3abf41['targets'],_0x24ae50=_0x3abf41[_0x16ea11(0x841)],_0xc5e5af=_0x3abf41[_0x16ea11(0x872)];let _0x20fd52=this['animationBaseDelay']();const _0x499e0d=this[_0x16ea11(0x65d)]();if(this[_0x16ea11(0x6c8)](_0x4fd05d))for(const _0x305dbf of _0x42a170){this['createFauxAnimationSprite']([_0x305dbf],_0x4fd05d,_0x24ae50,_0x20fd52,_0xc5e5af),_0x20fd52+=_0x499e0d;}else this[_0x16ea11(0x8f9)](_0x42a170,_0x4fd05d,_0x24ae50,_0x20fd52,_0xc5e5af);},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f9)]=function(_0x14edc0,_0x38f606,_0x5defa6,_0x32a4a3,_0x47ede8){const _0x3a7baa=_0x9eb9ae,_0x4d95c2=this['isMVAnimation'](_0x38f606),_0x515112=new(_0x4d95c2?Sprite_AnimationMV:Sprite_Animation)(),_0x483dbe=this[_0x3a7baa(0x131)](_0x14edc0);this[_0x3a7baa(0x557)](_0x14edc0[0x0])&&(_0x5defa6=!_0x5defa6),_0x515112[_0x3a7baa(0x471)]=_0x14edc0,_0x515112['setup'](_0x483dbe,_0x38f606,_0x5defa6,_0x32a4a3),_0x515112[_0x3a7baa(0x1f2)](_0x47ede8),this['_effectsContainer'][_0x3a7baa(0xf5)](_0x515112),this[_0x3a7baa(0x6a5)][_0x3a7baa(0x353)](_0x515112);},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4dd)]=function(_0x36bb68){const _0x39ddd5=_0x9eb9ae;this[_0x39ddd5(0x6a5)][_0x39ddd5(0x6d2)](_0x36bb68),this[_0x39ddd5(0x4b0)][_0x39ddd5(0x370)](_0x36bb68);for(const _0x38981f of _0x36bb68['targetObjects']){if(_0x39ddd5(0x5a0)!==_0x39ddd5(0x5a0))return _0x3d3253[_0x39ddd5(0x2d8)][_0x39ddd5(0x882)][_0x39ddd5(0x330)](this);else _0x38981f[_0x39ddd5(0x20e)]&&_0x38981f[_0x39ddd5(0x20e)]();}_0x36bb68[_0x39ddd5(0x1b8)]();},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x502)]=function(){const _0x5aaf0c=_0x9eb9ae;for(const _0x10205c of this['_fauxAnimationSprites']){this[_0x5aaf0c(0x4dd)](_0x10205c);}},Spriteset_Base['prototype'][_0x9eb9ae(0x32a)]=function(){const _0x558613=_0x9eb9ae;return this[_0x558613(0x6a5)]['length']>0x0;},Spriteset_Base['prototype'][_0x9eb9ae(0x2e6)]=function(){const _0x5f3d5d=_0x9eb9ae;for(const _0x504370 of this['_pointAnimationSprites']){!_0x504370[_0x5f3d5d(0x821)]()&&this[_0x5f3d5d(0x51c)](_0x504370);}this[_0x5f3d5d(0x7ac)]();},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7ac)]=function(){const _0x348a8c=_0x9eb9ae;for(;;){const _0xdd78d=$gameTemp[_0x348a8c(0x386)]();if(_0xdd78d)this[_0x348a8c(0x2bb)](_0xdd78d);else break;}},Spriteset_Base['prototype'][_0x9eb9ae(0x2bb)]=function(_0xe02de3){const _0x19a6fb=_0x9eb9ae,_0x1d485e=$dataAnimations[_0xe02de3[_0x19a6fb(0x4cf)]],_0x441432=this[_0x19a6fb(0x21b)](_0xe02de3),_0x3d5f9d=_0xe02de3['mirror'],_0xac914c=_0xe02de3[_0x19a6fb(0x872)];let _0x55aee0=this[_0x19a6fb(0x459)]();const _0x20764b=this[_0x19a6fb(0x65d)]();if(this['isAnimationForEach'](_0x1d485e))for(const _0x50d8f4 of _0x441432){_0x19a6fb(0x7f3)!==_0x19a6fb(0x230)?(this[_0x19a6fb(0x4a4)]([_0x50d8f4],_0x1d485e,_0x3d5f9d,_0x55aee0,_0xac914c),_0x55aee0+=_0x20764b):_0x58919d[_0x19a6fb(0x8e0)]()&&_0x16320e[_0x19a6fb(0x68b)][_0x19a6fb(0x1dc)][_0x19a6fb(0x2c7)][_0x19a6fb(0x612)]&&(_0x185672[_0x19a6fb(0x56c)]=!_0x21b528['_playTestFastMode']);}else{if(_0x19a6fb(0x583)!=='WIRwA')return _0x127b1a[_0x19a6fb(0x2d8)][_0x19a6fb(0x6c7)][_0x19a6fb(0x330)](this);else this[_0x19a6fb(0x4a4)](_0x441432,_0x1d485e,_0x3d5f9d,_0x55aee0,_0xac914c);}},Spriteset_Base[_0x9eb9ae(0x61d)]['createPointAnimationTargets']=function(_0xc58dee){const _0x140b32=_0x9eb9ae,_0x576dab=new Sprite_Clickable();_0x576dab['x']=_0xc58dee['x'],_0x576dab['y']=_0xc58dee['y'],_0x576dab['z']=0x64;const _0x3e125e=this['getPointAnimationLayer']();return _0x3e125e[_0x140b32(0xf5)](_0x576dab),[_0x576dab];},Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x151)]=function(){return this;},Spriteset_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x151)]=function(){const _0x5a3ed1=_0x9eb9ae;return this[_0x5a3ed1(0x572)]||this;},Spriteset_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x151)]=function(){return this['_battleField']||this;},Spriteset_Base[_0x9eb9ae(0x61d)]['createPointAnimationSprite']=function(_0x4ac941,_0x563891,_0x3a4c64,_0x203648,_0x4fd44){const _0xe57cf8=_0x9eb9ae,_0x2e3e03=this[_0xe57cf8(0x5b6)](_0x563891),_0x37d9d6=new(_0x2e3e03?Sprite_AnimationMV:Sprite_Animation)();_0x37d9d6[_0xe57cf8(0x471)]=_0x4ac941,_0x37d9d6[_0xe57cf8(0x41e)](_0x4ac941,_0x563891,_0x3a4c64,_0x203648),_0x37d9d6[_0xe57cf8(0x1f2)](_0x4fd44),this[_0xe57cf8(0x4b0)][_0xe57cf8(0xf5)](_0x37d9d6),this['_pointAnimationSprites'][_0xe57cf8(0x353)](_0x37d9d6);},Spriteset_Base['prototype'][_0x9eb9ae(0x51c)]=function(_0x7b00a8){const _0x15bb90=_0x9eb9ae;this[_0x15bb90(0x7f4)][_0x15bb90(0x6d2)](_0x7b00a8),this['_effectsContainer'][_0x15bb90(0x370)](_0x7b00a8);for(const _0x12cc9f of _0x7b00a8['targetObjects']){if('zLYFe'!==_0x15bb90(0x910)){var _0x3c2196=_0x336ba0(_0x1632cb['$1'])/0x64;_0x67c118+=_0x3c2196;}else{_0x12cc9f[_0x15bb90(0x20e)]&&_0x12cc9f[_0x15bb90(0x20e)]();const _0x5688d2=this['getPointAnimationLayer']();if(_0x5688d2)_0x5688d2[_0x15bb90(0x370)](_0x12cc9f);}}_0x7b00a8[_0x15bb90(0x1b8)]();},Spriteset_Base[_0x9eb9ae(0x61d)]['removeAllPointAnimations']=function(){const _0x3c13ec=_0x9eb9ae;for(const _0x2dc72d of this[_0x3c13ec(0x7f4)]){'XRnJz'==='WUiyb'?(this['_anchor']['x']=this[_0x3c13ec(0x76e)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']):this[_0x3c13ec(0x51c)](_0x2dc72d);}},Spriteset_Base[_0x9eb9ae(0x61d)]['isPointAnimationPlaying']=function(){return this['_pointAnimationSprites']['length']>0x0;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x6ab)]=Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x186)],Spriteset_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x186)]=function(){const _0x373059=_0x9eb9ae;return VisuMZ[_0x373059(0x68b)][_0x373059(0x6ab)][_0x373059(0x330)](this)||this['isPointAnimationPlaying']();},Spriteset_Map['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine']['Settings'][_0x9eb9ae(0x2c7)][_0x9eb9ae(0x861)]||![],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x360)]=Scene_Map['prototype'][_0x9eb9ae(0x7c5)],Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)]=function(){const _0x4df0ed=_0x9eb9ae;VisuMZ[_0x4df0ed(0x68b)]['Scene_Map_createSpriteset_detach']['call'](this);if(!Spriteset_Map[_0x4df0ed(0x717)])return;const _0x2f6280=this[_0x4df0ed(0x7e4)];if(!_0x2f6280)return;this[_0x4df0ed(0x23c)]=_0x2f6280[_0x4df0ed(0x23c)];if(!this[_0x4df0ed(0x23c)])return;this['addChild'](this[_0x4df0ed(0x23c)]);},Spriteset_Battle[_0x9eb9ae(0x717)]=VisuMZ['CoreEngine']['Settings'][_0x9eb9ae(0x2c7)]['DetachBattlePictureContainer']||![],VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x71b)]=Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)],Scene_Battle['prototype'][_0x9eb9ae(0x7c5)]=function(){const _0x463055=_0x9eb9ae;VisuMZ[_0x463055(0x68b)]['Scene_Battle_createSpriteset_detach'][_0x463055(0x330)](this);if(!Spriteset_Battle[_0x463055(0x717)])return;const _0x2ca854=this[_0x463055(0x7e4)];if(!_0x2ca854)return;this[_0x463055(0x23c)]=_0x2ca854['_pictureContainer'];if(!this[_0x463055(0x23c)])return;this[_0x463055(0xf5)](this['_pictureContainer']);},Spriteset_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x74e)]=function(){const _0x9de73f=_0x9eb9ae;this[_0x9de73f(0x303)]=new PIXI['filters']['BlurFilter'](clamp=!![]),this[_0x9de73f(0x6c4)]=new Sprite(),this[_0x9de73f(0x6c4)][_0x9de73f(0x7c9)]=SceneManager['backgroundBitmap'](),this[_0x9de73f(0x6c4)]['filters']=[this[_0x9de73f(0x303)]],this[_0x9de73f(0x60f)]['addChild'](this[_0x9de73f(0x6c4)]);},VisuMZ['CoreEngine'][_0x9eb9ae(0x4d8)]=Spriteset_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x73a)],Spriteset_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x73a)]=function(){const _0xcc4684=_0x9eb9ae;this[_0xcc4684(0x683)]()&&('JEzgX'!==_0xcc4684(0x4a2)?this['repositionEnemiesByResolution']():this[_0xcc4684(0x4b2)]=_0xcc4684(0x1fc)),VisuMZ[_0xcc4684(0x68b)][_0xcc4684(0x4d8)][_0xcc4684(0x330)](this);},Spriteset_Battle[_0x9eb9ae(0x61d)]['coreEngineRepositionEnemies']=function(){const _0x276b7d=_0x9eb9ae,_0x45a13d=VisuMZ['CoreEngine'][_0x276b7d(0x1dc)]['ScreenResolution'];if(!_0x45a13d)return![];if(Utils['RPGMAKER_VERSION']>=_0x276b7d(0x1d3)&&!_0x45a13d[_0x276b7d(0x816)]){if('LIHDg'!==_0x276b7d(0x8c3))return![];else _0x285ac3[_0x276b7d(0x481)]=![],_0xb88eb0[_0x276b7d(0x5c4)]=!![];}return _0x45a13d[_0x276b7d(0x3db)];},Spriteset_Battle['prototype'][_0x9eb9ae(0x899)]=function(){const _0x1c365c=_0x9eb9ae;for(member of $gameTroop[_0x1c365c(0x3e7)]()){if(_0x1c365c(0x2c8)===_0x1c365c(0x8bd)){const _0x293da0=_0x13ddbd('fs');let _0x471cb5=_0x1c365c(0x682)['format'](_0x4b9227||'0');_0x293da0[_0x1c365c(0x3fb)](_0x471cb5,_0x23e329,_0x26e5b0=>{const _0x1c504e=_0x1c365c;if(_0x26e5b0)throw _0x24c62e;else _0x3469b0&&_0x197ae4(_0x1c504e(0x627)[_0x1c504e(0x468)](_0x471cb5));});}else member[_0x1c365c(0x1c5)]();}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x14d)]=Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)],Window_Base[_0x9eb9ae(0x61d)]['initialize']=function(_0x1c8454){const _0x4c6b62=_0x9eb9ae;_0x1c8454['x']=Math[_0x4c6b62(0x74b)](_0x1c8454['x']),_0x1c8454['y']=Math['round'](_0x1c8454['y']),_0x1c8454[_0x4c6b62(0x792)]=Math[_0x4c6b62(0x74b)](_0x1c8454['width']),_0x1c8454[_0x4c6b62(0x71d)]=Math[_0x4c6b62(0x74b)](_0x1c8454['height']),this['initDigitGrouping'](),VisuMZ[_0x4c6b62(0x68b)]['Window_Base_initialize'][_0x4c6b62(0x330)](this,_0x1c8454),this[_0x4c6b62(0x723)]();},Window_Base[_0x9eb9ae(0x61d)]['initDigitGrouping']=function(){const _0x28fd18=_0x9eb9ae;this[_0x28fd18(0x5e2)]=VisuMZ['CoreEngine']['Settings'][_0x28fd18(0x2c7)]['DigitGroupingStandardText'],this[_0x28fd18(0x228)]=VisuMZ[_0x28fd18(0x68b)]['Settings'][_0x28fd18(0x2c7)][_0x28fd18(0x859)];},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f5)]=function(){const _0x16a388=_0x9eb9ae;return VisuMZ[_0x16a388(0x68b)][_0x16a388(0x1dc)][_0x16a388(0x8f6)][_0x16a388(0x7c3)];},Window_Base[_0x9eb9ae(0x61d)]['itemPadding']=function(){const _0x1e175c=_0x9eb9ae;return VisuMZ[_0x1e175c(0x68b)][_0x1e175c(0x1dc)]['Window'][_0x1e175c(0x54a)];},Window_Base['prototype'][_0x9eb9ae(0x33a)]=function(){const _0x4daa24=_0x9eb9ae;$gameSystem[_0x4daa24(0x7ea)]?this[_0x4daa24(0x379)]=$gameSystem['windowOpacity']():_0x4daa24(0x22a)!==_0x4daa24(0x13d)?this[_0x4daa24(0x379)]=VisuMZ['CoreEngine'][_0x4daa24(0x1dc)][_0x4daa24(0x8f6)][_0x4daa24(0x633)]:(this[_0x4daa24(0x6a7)]&&this[_0x4daa24(0x6a7)][_0x4daa24(0x71c)](_0xee0b31['layoutSettings'][_0x4daa24(0x143)]),this[_0x4daa24(0x749)]&&this[_0x4daa24(0x749)][_0x4daa24(0x71c)](_0x211873[_0x4daa24(0x2d8)]['ListBgType']));},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x830)]=function(){const _0x3248e6=_0x9eb9ae;return VisuMZ['CoreEngine'][_0x3248e6(0x1dc)]['Window'][_0x3248e6(0x89c)];},Window_Base['prototype'][_0x9eb9ae(0x599)]=function(){const _0x2f2c57=_0x9eb9ae;return VisuMZ[_0x2f2c57(0x68b)][_0x2f2c57(0x1dc)][_0x2f2c57(0x8f6)][_0x2f2c57(0x769)];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x579)]=Window_Base['prototype'][_0x9eb9ae(0x1ed)],Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ed)]=function(){const _0x1490e3=_0x9eb9ae;VisuMZ[_0x1490e3(0x68b)]['Window_Base_update']['call'](this),this[_0x1490e3(0x8bf)]();},Window_Base['prototype']['updateOpen']=function(){const _0x17a882=_0x9eb9ae;this['_opening']&&(_0x17a882(0x457)!==_0x17a882(0x7f0)?(this[_0x17a882(0x1b3)]+=this[_0x17a882(0x599)](),this[_0x17a882(0x7cf)]()&&(_0x17a882(0x295)===_0x17a882(0x7c0)?(_0x5df73f[_0x17a882(0x889)](),this[_0x17a882(0x4cb)]===_0x17a882(0x619)?this[_0x17a882(0x7c7)](_0x17a882(0xfc)):this[_0x17a882(0x7c7)](_0x17a882(0x619))):this[_0x17a882(0x26e)]=![])):(_0x4d6348[_0x17a882(0x68b)]['Scene_Map_createSpriteset']['call'](this),_0x5630e9=this['_spriteset']));},Window_Base['prototype'][_0x9eb9ae(0x159)]=function(){const _0x467acd=_0x9eb9ae;this[_0x467acd(0x65a)]&&(this[_0x467acd(0x1b3)]-=this['openingSpeed'](),this[_0x467acd(0x650)]()&&(this[_0x467acd(0x65a)]=![]));},VisuMZ[_0x9eb9ae(0x68b)]['Window_Base_drawText']=Window_Base[_0x9eb9ae(0x61d)]['drawText'],Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1e0)]=function(_0xec8204,_0x2b690c,_0x221328,_0x277211,_0x2f0a3f){const _0x4ec459=_0x9eb9ae;if(this[_0x4ec459(0x147)]())_0xec8204=VisuMZ[_0x4ec459(0x29c)](_0xec8204);VisuMZ['CoreEngine']['Window_Base_drawText'][_0x4ec459(0x330)](this,_0xec8204,_0x2b690c,_0x221328,_0x277211,_0x2f0a3f);},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x147)]=function(){return this['_digitGrouping'];},VisuMZ[_0x9eb9ae(0x68b)]['Window_Base_createTextState']=Window_Base[_0x9eb9ae(0x61d)]['createTextState'],Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x84d)]=function(_0x4cdfe4,_0x1517b3,_0x39acd2,_0x3e6957){const _0x246fcd=_0x9eb9ae;var _0x3d18ad=VisuMZ[_0x246fcd(0x68b)]['Window_Base_createTextState'][_0x246fcd(0x330)](this,_0x4cdfe4,_0x1517b3,_0x39acd2,_0x3e6957);if(this['useDigitGroupingEx']())_0x3d18ad[_0x246fcd(0x38e)]=VisuMZ[_0x246fcd(0x29c)](_0x3d18ad[_0x246fcd(0x38e)]);return _0x3d18ad;},Window_Base['prototype'][_0x9eb9ae(0x1ff)]=function(){const _0x38a297=_0x9eb9ae;return this[_0x38a297(0x228)];},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8b4)]=function(_0x134090){const _0x21911d=_0x9eb9ae;this[_0x21911d(0x5e2)]=_0x134090;},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x664)]=function(_0x3e7076){const _0x4997da=_0x9eb9ae;this[_0x4997da(0x228)]=_0x3e7076;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x779)]=Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x789)],Window_Base[_0x9eb9ae(0x61d)]['drawIcon']=function(_0x44ef6,_0x2cd52e,_0x27081a){const _0x238734=_0x9eb9ae;_0x2cd52e=Math[_0x238734(0x74b)](_0x2cd52e),_0x27081a=Math['round'](_0x27081a),VisuMZ[_0x238734(0x68b)][_0x238734(0x779)][_0x238734(0x330)](this,_0x44ef6,_0x2cd52e,_0x27081a);},VisuMZ['CoreEngine']['Window_Base_drawFace']=Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x78b)],Window_Base['prototype'][_0x9eb9ae(0x78b)]=function(_0x406e9c,_0x179fd3,_0xfb1f55,_0x404c08,_0x42146c,_0x4c7ab4){const _0x16a640=_0x9eb9ae;_0x42146c=_0x42146c||ImageManager['faceWidth'],_0x4c7ab4=_0x4c7ab4||ImageManager[_0x16a640(0x7e9)],_0xfb1f55=Math[_0x16a640(0x74b)](_0xfb1f55),_0x404c08=Math[_0x16a640(0x74b)](_0x404c08),_0x42146c=Math[_0x16a640(0x74b)](_0x42146c),_0x4c7ab4=Math['round'](_0x4c7ab4),VisuMZ[_0x16a640(0x68b)][_0x16a640(0x757)][_0x16a640(0x330)](this,_0x406e9c,_0x179fd3,_0xfb1f55,_0x404c08,_0x42146c,_0x4c7ab4);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x6b0)]=Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5a2)],Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5a2)]=function(_0x29c97d,_0x31dce5,_0x219a78,_0x560cec){const _0x52bbdd=_0x9eb9ae;_0x219a78=Math[_0x52bbdd(0x74b)](_0x219a78),_0x560cec=Math[_0x52bbdd(0x74b)](_0x560cec),VisuMZ[_0x52bbdd(0x68b)]['Window_Base_drawCharacter'][_0x52bbdd(0x330)](this,_0x29c97d,_0x31dce5,_0x219a78,_0x560cec);},VisuMZ[_0x9eb9ae(0x68b)]['Window_Selectable_itemRect']=Window_Selectable[_0x9eb9ae(0x61d)]['itemRect'],Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x352)]=function(_0x5bff75){const _0x4fa110=_0x9eb9ae;let _0x4b9621=VisuMZ[_0x4fa110(0x68b)][_0x4fa110(0x4f3)][_0x4fa110(0x330)](this,_0x5bff75);return _0x4b9621['x']=Math[_0x4fa110(0x74b)](_0x4b9621['x']),_0x4b9621['y']=Math[_0x4fa110(0x74b)](_0x4b9621['y']),_0x4b9621['width']=Math[_0x4fa110(0x74b)](_0x4b9621[_0x4fa110(0x792)]),_0x4b9621[_0x4fa110(0x71d)]=Math[_0x4fa110(0x74b)](_0x4b9621['height']),_0x4b9621;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x88a)]=Window_StatusBase[_0x9eb9ae(0x61d)]['drawActorSimpleStatus'],Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x799)]=function(_0x3dc103,_0x3fbe58,_0x2bfe1c){const _0x52ec2e=_0x9eb9ae;_0x3fbe58=Math[_0x52ec2e(0x74b)](_0x3fbe58),_0x2bfe1c=Math[_0x52ec2e(0x74b)](_0x2bfe1c),VisuMZ[_0x52ec2e(0x68b)][_0x52ec2e(0x88a)][_0x52ec2e(0x330)](this,_0x3dc103,_0x3fbe58,_0x2bfe1c);},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x723)]=function(){const _0x3bfb3a=_0x9eb9ae;this[_0x3bfb3a(0x2ec)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x3bfb3a(0x245)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x3bfb3a(0x204)]};},Window_Base[_0x9eb9ae(0x61d)]['updateCoreEasing']=function(){const _0x4a07f3=_0x9eb9ae;if(!this[_0x4a07f3(0x2ec)])return;if(this[_0x4a07f3(0x2ec)][_0x4a07f3(0x610)]<=0x0)return;this['x']=this[_0x4a07f3(0x193)](this['x'],this[_0x4a07f3(0x2ec)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x4a07f3(0x2ec)][_0x4a07f3(0x520)]),this[_0x4a07f3(0x6a4)]['x']=this['applyCoreEasing'](this[_0x4a07f3(0x6a4)]['x'],this[_0x4a07f3(0x2ec)][_0x4a07f3(0x1bd)]),this[_0x4a07f3(0x6a4)]['y']=this[_0x4a07f3(0x193)](this[_0x4a07f3(0x6a4)]['y'],this[_0x4a07f3(0x2ec)]['targetScaleY']),this[_0x4a07f3(0x245)]=this[_0x4a07f3(0x193)](this['opacity'],this[_0x4a07f3(0x2ec)][_0x4a07f3(0x630)]),this[_0x4a07f3(0x379)]=this[_0x4a07f3(0x193)](this['backOpacity'],this[_0x4a07f3(0x2ec)][_0x4a07f3(0x192)]),this[_0x4a07f3(0x204)]=this[_0x4a07f3(0x193)](this['contentsOpacity'],this[_0x4a07f3(0x2ec)][_0x4a07f3(0x831)]),this[_0x4a07f3(0x2ec)][_0x4a07f3(0x610)]--;},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x193)]=function(_0x32b790,_0x7c3dbf){const _0x40752d=_0x9eb9ae;if(!this[_0x40752d(0x2ec)])return _0x7c3dbf;const _0x45ab91=this[_0x40752d(0x2ec)][_0x40752d(0x610)],_0x26dc6f=this[_0x40752d(0x2ec)]['wholeDuration'],_0x327df5=this[_0x40752d(0x78d)]((_0x26dc6f-_0x45ab91)/_0x26dc6f),_0x367206=this[_0x40752d(0x78d)]((_0x26dc6f-_0x45ab91+0x1)/_0x26dc6f),_0x3cff59=(_0x32b790-_0x7c3dbf*_0x327df5)/(0x1-_0x327df5);return _0x3cff59+(_0x7c3dbf-_0x3cff59)*_0x367206;},Window_Base[_0x9eb9ae(0x61d)]['calcCoreEasing']=function(_0x31dd26){const _0x2ae7af=_0x9eb9ae;if(!this['_coreEasing'])return _0x31dd26;return VisuMZ[_0x2ae7af(0x638)](_0x31dd26,this[_0x2ae7af(0x2ec)][_0x2ae7af(0x87d)]||_0x2ae7af(0x640));},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x88b)]=function(_0x354d0b,_0x573366){const _0x4f14af=_0x9eb9ae;if(!this[_0x4f14af(0x2ec)])return;this['x']=this[_0x4f14af(0x2ec)][_0x4f14af(0x30c)],this['y']=this['_coreEasing'][_0x4f14af(0x520)],this['scale']['x']=this['_coreEasing'][_0x4f14af(0x1bd)],this['scale']['y']=this['_coreEasing'][_0x4f14af(0x1c0)],this[_0x4f14af(0x245)]=this[_0x4f14af(0x2ec)][_0x4f14af(0x630)],this[_0x4f14af(0x379)]=this[_0x4f14af(0x2ec)][_0x4f14af(0x192)],this['contentsOpacity']=this['_coreEasing'][_0x4f14af(0x831)],this['setupCoreEasing'](_0x354d0b,_0x573366,this['x'],this['y'],this['scale']['x'],this[_0x4f14af(0x6a4)]['y'],this['opacity'],this['backOpacity'],this[_0x4f14af(0x204)]);},Window_Base['prototype']['setupCoreEasing']=function(_0x225024,_0x30e500,_0x4796ec,_0x3bfcfd,_0x3df67a,_0x560dc9,_0x37f51e,_0x2b7de2,_0x14b8dd){this['_coreEasing']={'duration':_0x225024,'wholeDuration':_0x225024,'type':_0x30e500,'targetX':_0x4796ec,'targetY':_0x3bfcfd,'targetScaleX':_0x3df67a,'targetScaleY':_0x560dc9,'targetOpacity':_0x37f51e,'targetBackOpacity':_0x2b7de2,'targetContentsOpacity':_0x14b8dd};},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ef)]=function(_0x2863d7,_0x5c28ac,_0x923262,_0x2c04fa,_0x3f9078){const _0x460d61=_0x9eb9ae;this['resetFontSettings'](),this[_0x460d61(0x423)][_0x460d61(0x521)]=VisuMZ[_0x460d61(0x68b)][_0x460d61(0x1dc)][_0x460d61(0x23f)]['GoldFontSize'];const _0x37a28a=VisuMZ['CoreEngine'][_0x460d61(0x1dc)]['Gold'][_0x460d61(0x6b7)];if(_0x37a28a>0x0&&_0x5c28ac===TextManager[_0x460d61(0x73e)]){const _0x16192b=_0x2c04fa+(this['lineHeight']()-ImageManager[_0x460d61(0x59d)])/0x2;this[_0x460d61(0x789)](_0x37a28a,_0x923262+(_0x3f9078-ImageManager[_0x460d61(0x7bb)]),_0x16192b),_0x3f9078-=ImageManager[_0x460d61(0x7bb)]+0x4;}else{if(_0x460d61(0x804)!==_0x460d61(0x268))this[_0x460d61(0x4ee)](ColorManager[_0x460d61(0x1e3)]()),this[_0x460d61(0x1e0)](_0x5c28ac,_0x923262,_0x2c04fa,_0x3f9078,'right'),_0x3f9078-=this[_0x460d61(0x80b)](_0x5c28ac)+0x6;else return _0x2c4a32[_0x460d61(0x2d8)][_0x460d61(0x670)]['call'](this);}this['resetTextColor']();const _0x49a7d1=this[_0x460d61(0x80b)](this['_digitGrouping']?VisuMZ[_0x460d61(0x29c)](_0x2863d7):_0x2863d7);if(_0x49a7d1>_0x3f9078)_0x460d61(0x327)===_0x460d61(0x325)?(_0x4015e1=_0x4bfda4[_0x460d61(0x74b)](_0x1ae21c),_0x2d33e7=_0x346b02[_0x460d61(0x74b)](_0x2fc8c0),_0x451392['CoreEngine'][_0x460d61(0x88a)][_0x460d61(0x330)](this,_0x112274,_0x56fe3d,_0x1a3ad0)):this['drawText'](VisuMZ[_0x460d61(0x68b)][_0x460d61(0x1dc)][_0x460d61(0x23f)][_0x460d61(0x863)],_0x923262,_0x2c04fa,_0x3f9078,_0x460d61(0x8ea));else{if(_0x460d61(0x7c4)===_0x460d61(0x183)){var _0x49a1b4=_0x1ead41-1.5/2.75;return 7.5625*_0x49a1b4*_0x49a1b4+0.75;}else this[_0x460d61(0x1e0)](_0x2863d7,_0x923262,_0x2c04fa,_0x3f9078,_0x460d61(0x8ea));}this[_0x460d61(0x1af)]();},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x439)]=function(_0x3a0c37,_0x2b6e35,_0x32f43a,_0x874d8a,_0x3c43d9){const _0x214207=_0x9eb9ae,_0x320ce6=ImageManager[_0x214207(0x41b)](_0x214207(0x4cc)),_0x1cb934=ImageManager[_0x214207(0x7bb)],_0x298c3f=ImageManager[_0x214207(0x59d)],_0x34d611=_0x3a0c37%0x10*_0x1cb934,_0xa3a3b2=Math[_0x214207(0x83f)](_0x3a0c37/0x10)*_0x298c3f,_0x370e8b=_0x874d8a,_0x3f2589=_0x874d8a;this['contents'][_0x214207(0x825)]['imageSmoothingEnabled']=_0x3c43d9,this[_0x214207(0x423)][_0x214207(0x1d4)](_0x320ce6,_0x34d611,_0xa3a3b2,_0x1cb934,_0x298c3f,_0x2b6e35,_0x32f43a,_0x370e8b,_0x3f2589),this[_0x214207(0x423)][_0x214207(0x825)][_0x214207(0x4b4)]=!![];},Window_Base[_0x9eb9ae(0x61d)]['drawGauge']=function(_0x40b3cf,_0x4424f3,_0x56ad90,_0x4a319e,_0x5803fe,_0x29ce3a){const _0x403192=_0x9eb9ae,_0x515c85=Math[_0x403192(0x83f)]((_0x56ad90-0x2)*_0x4a319e),_0x50684e=Sprite_Gauge['prototype']['gaugeHeight'][_0x403192(0x330)](this),_0xa919af=_0x4424f3+this[_0x403192(0x5f5)]()-_0x50684e-0x2;this[_0x403192(0x423)][_0x403192(0x6bd)](_0x40b3cf,_0xa919af,_0x56ad90,_0x50684e,ColorManager['gaugeBackColor']()),this[_0x403192(0x423)][_0x403192(0x134)](_0x40b3cf+0x1,_0xa919af+0x1,_0x515c85,_0x50684e-0x2,_0x5803fe,_0x29ce3a);},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x81a)]=function(_0x4bbb04){const _0x4ed1d9=_0x9eb9ae;let _0x1c4ee4=this[_0x4ed1d9(0x20d)]();const _0x5cfdac=this[_0x4ed1d9(0x748)](),_0x4188d1=this[_0x4ed1d9(0x4be)]();if(this[_0x4ed1d9(0x853)]()&&(_0x1c4ee4<_0x5cfdac||_0x4bbb04&&_0x4188d1===0x1)){_0x1c4ee4+=_0x4188d1;if(_0x1c4ee4>=_0x5cfdac)_0x1c4ee4=_0x5cfdac-0x1;this[_0x4ed1d9(0x4a7)](_0x1c4ee4);}else{if(!this['isUseModernControls']()){if(_0x1c4ee4<_0x5cfdac-_0x4188d1||_0x4bbb04&&_0x4188d1===0x1){if(_0x4ed1d9(0x8d6)===_0x4ed1d9(0x8d6))this[_0x4ed1d9(0x4a7)]((_0x1c4ee4+_0x4188d1)%_0x5cfdac);else{const _0x36d07a=new _0x3a9088();_0x36d07a['x']=_0x2124d5['x'],_0x36d07a['y']=_0x35f3c3['y'],_0x36d07a['z']=0x64;const _0x32a692=this['getPointAnimationLayer']();return _0x32a692['addChild'](_0x36d07a),[_0x36d07a];}}}}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x474)]=Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x81a)],Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x81a)]=function(_0x2b81a5){const _0x1faa97=_0x9eb9ae;this[_0x1faa97(0x853)]()&&_0x2b81a5&&this[_0x1faa97(0x4be)]()===0x1&&this[_0x1faa97(0x20d)]()===this[_0x1faa97(0x748)]()-0x1?this[_0x1faa97(0x4a7)](0x0):VisuMZ['CoreEngine']['Window_Selectable_cursorDown'][_0x1faa97(0x330)](this,_0x2b81a5);},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x684)]=function(_0x5ecc94){const _0x3796df=_0x9eb9ae;let _0x364da7=Math[_0x3796df(0x713)](0x0,this[_0x3796df(0x20d)]());const _0x272476=this[_0x3796df(0x748)](),_0x24d92b=this[_0x3796df(0x4be)]();if(this[_0x3796df(0x853)]()&&_0x364da7>0x0||_0x5ecc94&&_0x24d92b===0x1){_0x364da7-=_0x24d92b;if(_0x364da7<=0x0)_0x364da7=0x0;this[_0x3796df(0x4a7)](_0x364da7);}else!this[_0x3796df(0x853)]()&&((_0x364da7>=_0x24d92b||_0x5ecc94&&_0x24d92b===0x1)&&this['smoothSelect']((_0x364da7-_0x24d92b+_0x272476)%_0x272476));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x851)]=Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x684)],Window_Selectable['prototype'][_0x9eb9ae(0x684)]=function(_0x197fd1){const _0x46c363=_0x9eb9ae;if(this[_0x46c363(0x853)]()&&_0x197fd1&&this['maxCols']()===0x1&&this[_0x46c363(0x20d)]()===0x0){if(_0x46c363(0x291)!==_0x46c363(0x291))return _0x1c854a[_0x46c363(0x4ac)];else this[_0x46c363(0x4a7)](this[_0x46c363(0x748)]()-0x1);}else VisuMZ[_0x46c363(0x68b)][_0x46c363(0x851)]['call'](this,_0x197fd1);},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x853)]=function(){const _0x30397a=_0x9eb9ae;return VisuMZ['CoreEngine']['Settings'][_0x30397a(0x2c7)][_0x30397a(0x55e)];},VisuMZ[_0x9eb9ae(0x68b)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8ee)],Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8ee)]=function(){const _0x5cde=_0x9eb9ae;if(this[_0x5cde(0x853)]())this[_0x5cde(0x829)](),this[_0x5cde(0x191)]();else{if(_0x5cde(0x50d)!==_0x5cde(0x22e))VisuMZ[_0x5cde(0x68b)][_0x5cde(0x6f6)][_0x5cde(0x330)](this);else{const _0x412cbb=_0x2dbb06['Symbol'];let _0x3c72b6=_0x4eb97d[_0x5cde(0x45d)];if(['',_0x5cde(0x66e)][_0x5cde(0x111)](_0x3c72b6))_0x3c72b6=_0xc22f3e[_0x5cde(0x773)][_0x5cde(0x330)](this);const _0x520321=_0x561bfc['EnableJS'][_0x5cde(0x330)](this),_0xd859d6=_0x5cb872[_0x5cde(0x1fd)][_0x5cde(0x330)](this);this[_0x5cde(0x39a)](_0x3c72b6,_0x412cbb,_0x520321,_0xd859d6),this[_0x5cde(0x38a)](_0x412cbb,_0x5b9731[_0x5cde(0x1c3)][_0x5cde(0x3c8)](this,_0xd859d6));}}},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x51f)]=function(){return!![];},Window_Selectable[_0x9eb9ae(0x61d)]['processCursorMoveModernControls']=function(){const _0x1b1fa7=_0x9eb9ae;if(this[_0x1b1fa7(0x86e)]()){const _0x2b8b88=this[_0x1b1fa7(0x20d)]();Input[_0x1b1fa7(0x7d8)]('down')&&('TeUla'===_0x1b1fa7(0x704)?_0x37cd19+=_0x1602d7(_0x143e0e):Input[_0x1b1fa7(0x4af)](_0x1b1fa7(0x5df))&&this['allowShiftScrolling']()?_0x1b1fa7(0x496)!==_0x1b1fa7(0x37b)?this[_0x1b1fa7(0x2a4)]():(this[_0x1b1fa7(0x87f)](),_0x20d38a[_0x1b1fa7(0x289)](),this[_0x1b1fa7(0x4cb)]==='default'?this[_0x1b1fa7(0x7a9)](0x0):this[_0x1b1fa7(0x7a9)](-0x1)):this['cursorDown'](Input['isTriggered'](_0x1b1fa7(0x3fe))));Input['isRepeated']('up')&&(Input['isPressed']('shift')&&this[_0x1b1fa7(0x51f)]()?_0x1b1fa7(0x4d6)===_0x1b1fa7(0x4d6)?this[_0x1b1fa7(0x526)]():this[_0x1b1fa7(0x423)][_0x1b1fa7(0x521)]+=0x6:this[_0x1b1fa7(0x684)](Input[_0x1b1fa7(0x577)]('up')));Input[_0x1b1fa7(0x7d8)](_0x1b1fa7(0x8ea))&&this[_0x1b1fa7(0x429)](Input[_0x1b1fa7(0x577)](_0x1b1fa7(0x8ea)));Input[_0x1b1fa7(0x7d8)](_0x1b1fa7(0x5b3))&&this[_0x1b1fa7(0x123)](Input[_0x1b1fa7(0x577)](_0x1b1fa7(0x5b3)));!this[_0x1b1fa7(0x66f)](_0x1b1fa7(0x5c9))&&Input[_0x1b1fa7(0x7d8)](_0x1b1fa7(0x5c9))&&this[_0x1b1fa7(0x2a4)]();if(!this[_0x1b1fa7(0x66f)]('pageup')&&Input['isRepeated'](_0x1b1fa7(0x593))){if(_0x1b1fa7(0x315)!==_0x1b1fa7(0x776))this['cursorPageup']();else return this[_0x1b1fa7(0x542)]()?this[_0x1b1fa7(0x8d7)]():_0xf32c6c['CoreEngine']['Game_Picture_y'][_0x1b1fa7(0x330)](this);}this[_0x1b1fa7(0x20d)]()!==_0x2b8b88&&(_0x1b1fa7(0x6b5)===_0x1b1fa7(0x450)?this[_0x1b1fa7(0x7c7)](_0x1b1fa7(0xfc)):this[_0x1b1fa7(0x810)]());}},Window_Selectable[_0x9eb9ae(0x61d)]['processCursorHomeEndTrigger']=function(){const _0x39919e=_0x9eb9ae;if(this[_0x39919e(0x86e)]()){const _0x397b98=this[_0x39919e(0x20d)]();Input[_0x39919e(0x577)](_0x39919e(0x708))&&this[_0x39919e(0x4a7)](Math[_0x39919e(0x21c)](this[_0x39919e(0x20d)](),0x0)),Input[_0x39919e(0x577)](_0x39919e(0x58f))&&('XVGSf'==='XVGSf'?this[_0x39919e(0x4a7)](Math[_0x39919e(0x713)](this['index'](),this[_0x39919e(0x748)]()-0x1)):this[_0x39919e(0x4a7)]((_0x381276+_0x20ea0d)%_0x2ffca8)),this[_0x39919e(0x20d)]()!==_0x397b98&&this[_0x39919e(0x810)]();}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x50e)]=Window_Selectable['prototype'][_0x9eb9ae(0x6e0)],Window_Selectable['prototype']['processTouch']=function(){const _0x5abc95=_0x9eb9ae;this[_0x5abc95(0x853)]()?'EvOrD'!==_0x5abc95(0x293)?this[_0x5abc95(0x380)]():_0x4abb33=this['mainAreaHeightSideButtonLayout']():_0x5abc95(0x2d3)===_0x5abc95(0x2d3)?VisuMZ[_0x5abc95(0x68b)][_0x5abc95(0x50e)][_0x5abc95(0x330)](this):this[_0x5abc95(0x749)][_0x5abc95(0x71c)](_0x1059ef[_0x5abc95(0x2d8)][_0x5abc95(0x46a)]);},Window_Selectable[_0x9eb9ae(0x61d)]['processTouchModernControls']=function(){const _0x479404=_0x9eb9ae;VisuMZ[_0x479404(0x68b)][_0x479404(0x50e)][_0x479404(0x330)](this);},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x36d)]=function(){const _0x16cbf9=_0x9eb9ae;return VisuMZ[_0x16cbf9(0x68b)][_0x16cbf9(0x1dc)]['Window'][_0x16cbf9(0x21f)];},Window_Selectable[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3bb)]=function(){const _0x21c713=_0x9eb9ae;return VisuMZ[_0x21c713(0x68b)][_0x21c713(0x1dc)][_0x21c713(0x8f6)]['RowSpacing'];},Window_Selectable['prototype'][_0x9eb9ae(0x6ac)]=function(){const _0x492ee1=_0x9eb9ae;return Window_Scrollable[_0x492ee1(0x61d)][_0x492ee1(0x6ac)][_0x492ee1(0x330)](this)+VisuMZ[_0x492ee1(0x68b)][_0x492ee1(0x1dc)][_0x492ee1(0x8f6)][_0x492ee1(0x4e0)];;},VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect']=Window_Selectable['prototype']['drawBackgroundRect'],Window_Selectable[_0x9eb9ae(0x61d)]['drawBackgroundRect']=function(_0x5d0af4){const _0x500766=_0x9eb9ae,_0x234d09=VisuMZ[_0x500766(0x68b)][_0x500766(0x1dc)][_0x500766(0x8f6)];if(_0x234d09[_0x500766(0x8a3)]===![])return;_0x234d09[_0x500766(0x73f)]?_0x234d09[_0x500766(0x73f)][_0x500766(0x330)](this,_0x5d0af4):VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect'][_0x500766(0x330)](this,_0x5d0af4);},VisuMZ[_0x9eb9ae(0x68b)]['Window_Gold_refresh']=Window_Gold['prototype'][_0x9eb9ae(0x87f)],Window_Gold[_0x9eb9ae(0x61d)][_0x9eb9ae(0x87f)]=function(){const _0x88248e=_0x9eb9ae;if(this[_0x88248e(0x4df)]()){if(_0x88248e(0x89b)===_0x88248e(0x869)){const _0x48a88c=_0x83c2b3['random']()<=_0x115bb6;_0x172409[_0x88248e(0x34f)](_0x79f889,_0x48a88c);}else this[_0x88248e(0x233)]();}else VisuMZ[_0x88248e(0x68b)][_0x88248e(0x3c3)][_0x88248e(0x330)](this);},Window_Gold[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4df)]=function(){const _0xa8fef8=_0x9eb9ae;if(TextManager['currencyUnit']!==this[_0xa8fef8(0x73e)]())return![];return VisuMZ[_0xa8fef8(0x68b)][_0xa8fef8(0x1dc)][_0xa8fef8(0x23f)][_0xa8fef8(0x354)];},Window_Gold[_0x9eb9ae(0x61d)][_0x9eb9ae(0x233)]=function(){const _0x3c1a7a=_0x9eb9ae;this[_0x3c1a7a(0x1af)](),this[_0x3c1a7a(0x423)][_0x3c1a7a(0x889)](),this[_0x3c1a7a(0x423)][_0x3c1a7a(0x521)]=VisuMZ['CoreEngine'][_0x3c1a7a(0x1dc)]['Gold'][_0x3c1a7a(0x39f)];const _0x3e8598=VisuMZ[_0x3c1a7a(0x68b)][_0x3c1a7a(0x1dc)][_0x3c1a7a(0x23f)][_0x3c1a7a(0x6b7)],_0xfaf686=this[_0x3c1a7a(0x11c)](0x0);if(_0x3e8598>0x0){if(_0x3c1a7a(0x296)!=='nUzXq'){const _0x329165=_0xfaf686['y']+(this[_0x3c1a7a(0x5f5)]()-ImageManager[_0x3c1a7a(0x59d)])/0x2;this[_0x3c1a7a(0x789)](_0x3e8598,_0xfaf686['x'],_0x329165);const _0x9ea058=ImageManager[_0x3c1a7a(0x7bb)]+0x4;_0xfaf686['x']+=_0x9ea058,_0xfaf686[_0x3c1a7a(0x792)]-=_0x9ea058;}else this[_0x3c1a7a(0x6a7)][_0x3c1a7a(0x71c)](_0x2bbc4b[_0x3c1a7a(0x2d8)][_0x3c1a7a(0x143)]);}this[_0x3c1a7a(0x4ee)](ColorManager[_0x3c1a7a(0x1e3)]()),this[_0x3c1a7a(0x1e0)](this['currencyUnit'](),_0xfaf686['x'],_0xfaf686['y'],_0xfaf686[_0x3c1a7a(0x792)],_0x3c1a7a(0x5b3));const _0x54949f=this['textWidth'](this['currencyUnit']())+0x6;;_0xfaf686['x']+=_0x54949f,_0xfaf686[_0x3c1a7a(0x792)]-=_0x54949f,this[_0x3c1a7a(0x3d3)]();const _0x2154e4=this[_0x3c1a7a(0x3ad)](),_0x29e4a2=this[_0x3c1a7a(0x80b)](this[_0x3c1a7a(0x5e2)]?VisuMZ[_0x3c1a7a(0x29c)](this[_0x3c1a7a(0x3ad)]()):this['value']());_0x29e4a2>_0xfaf686[_0x3c1a7a(0x792)]?this['drawText'](VisuMZ[_0x3c1a7a(0x68b)][_0x3c1a7a(0x1dc)][_0x3c1a7a(0x23f)][_0x3c1a7a(0x863)],_0xfaf686['x'],_0xfaf686['y'],_0xfaf686['width'],'right'):_0x3c1a7a(0x142)!==_0x3c1a7a(0x1f4)?this[_0x3c1a7a(0x1e0)](this['value'](),_0xfaf686['x'],_0xfaf686['y'],_0xfaf686[_0x3c1a7a(0x792)],_0x3c1a7a(0x8ea)):(_0xa135ac['clear'](),this[_0x3c1a7a(0x878)]()),this[_0x3c1a7a(0x1af)]();},Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5d6)]=function(_0x40fd9b,_0x263b8f,_0x38556c,_0x39ab44,_0x17d9a9){const _0x4863e4=_0x9eb9ae;_0x39ab44=String(_0x39ab44||'')['toUpperCase']();if(VisuMZ[_0x4863e4(0x68b)][_0x4863e4(0x1dc)][_0x4863e4(0x5bb)][_0x4863e4(0x58b)]){const _0x214953=VisuMZ[_0x4863e4(0x398)](_0x39ab44);_0x17d9a9?(this[_0x4863e4(0x439)](_0x214953,_0x40fd9b,_0x263b8f,this[_0x4863e4(0x139)]()),_0x38556c-=this[_0x4863e4(0x139)]()+0x2,_0x40fd9b+=this['gaugeLineHeight']()+0x2):_0x4863e4(0x8f2)!==_0x4863e4(0x8f2)?this['_screenX']+=_0x40169d['round']((_0x30cf4e[_0x4863e4(0x57c)]-0x330)/0x2):(this['drawIcon'](_0x214953,_0x40fd9b+0x2,_0x263b8f+0x2),_0x38556c-=ImageManager[_0x4863e4(0x7bb)]+0x4,_0x40fd9b+=ImageManager[_0x4863e4(0x7bb)]+0x4);}const _0x265597=TextManager[_0x4863e4(0x28b)](_0x39ab44);this[_0x4863e4(0x1af)](),this[_0x4863e4(0x4ee)](ColorManager['systemColor']()),_0x17d9a9?(this['contents']['fontSize']=this[_0x4863e4(0x339)](),this[_0x4863e4(0x423)][_0x4863e4(0x1e0)](_0x265597,_0x40fd9b,_0x263b8f,_0x38556c,this[_0x4863e4(0x139)](),_0x4863e4(0x5b3))):this['drawText'](_0x265597,_0x40fd9b,_0x263b8f,_0x38556c),this[_0x4863e4(0x1af)]();},Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x339)]=function(){const _0x3c568c=_0x9eb9ae;return $gameSystem[_0x3c568c(0x109)]()-0x8;},Window_StatusBase[_0x9eb9ae(0x61d)]['drawActorClass']=function(_0x397c1f,_0x23d7a8,_0x5dd067,_0x249843){const _0x5807eb=_0x9eb9ae;_0x249843=_0x249843||0xa8,this['resetTextColor']();if(VisuMZ[_0x5807eb(0x68b)][_0x5807eb(0x1dc)]['UI']['TextCodeClassNames'])this['drawTextEx'](_0x397c1f[_0x5807eb(0x3b5)]()[_0x5807eb(0x1e8)],_0x23d7a8,_0x5dd067,_0x249843);else{const _0x328404=_0x397c1f['currentClass']()[_0x5807eb(0x1e8)][_0x5807eb(0x8da)](/\\I\[(\d+)\]/gi,'');this[_0x5807eb(0x1e0)](_0x328404,_0x23d7a8,_0x5dd067,_0x249843);}},Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x84b)]=function(_0x4cdffe,_0x2d229b,_0x476bd7,_0x55c544){const _0x4e7e57=_0x9eb9ae;_0x55c544=_0x55c544||0x10e,this[_0x4e7e57(0x3d3)]();if(VisuMZ[_0x4e7e57(0x68b)][_0x4e7e57(0x1dc)]['UI'][_0x4e7e57(0x184)])this['drawTextEx'](_0x4cdffe[_0x4e7e57(0x6cc)](),_0x2d229b,_0x476bd7,_0x55c544);else{const _0x4164f7=_0x4cdffe[_0x4e7e57(0x6cc)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x4e7e57(0x1e0)](_0x4cdffe[_0x4e7e57(0x6cc)](),_0x2d229b,_0x476bd7,_0x55c544);}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x74c)]=Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x720)],Window_StatusBase[_0x9eb9ae(0x61d)][_0x9eb9ae(0x720)]=function(_0x4672b3,_0x124310,_0x4a3896){const _0x1e7261=_0x9eb9ae;if(this[_0x1e7261(0x5db)]())this[_0x1e7261(0x75f)](_0x4672b3,_0x124310,_0x4a3896);VisuMZ[_0x1e7261(0x68b)]['Window_StatusBase_drawActorLevel'][_0x1e7261(0x330)](this,_0x4672b3,_0x124310,_0x4a3896);},Window_StatusBase[_0x9eb9ae(0x61d)]['isExpGaugeDrawn']=function(){const _0x24c51f=_0x9eb9ae;return VisuMZ[_0x24c51f(0x68b)]['Settings']['UI'][_0x24c51f(0x53c)];},Window_StatusBase['prototype'][_0x9eb9ae(0x75f)]=function(_0x45f982,_0xb275ba,_0xe7ebd1){const _0x9011f9=_0x9eb9ae;if(!_0x45f982)return;if(!_0x45f982[_0x9011f9(0x736)]())return;const _0x595a2e=0x80,_0x57fdeb=_0x45f982['expRate']();let _0x4eecc5=ColorManager[_0x9011f9(0x104)](),_0x24789d=ColorManager[_0x9011f9(0x626)]();_0x57fdeb>=0x1&&(_0x4eecc5=ColorManager[_0x9011f9(0x628)](),_0x24789d=ColorManager[_0x9011f9(0x4b8)]()),this[_0x9011f9(0x71e)](_0xb275ba,_0xe7ebd1,_0x595a2e,_0x57fdeb,_0x4eecc5,_0x24789d);},Window_EquipStatus[_0x9eb9ae(0x61d)]['drawAllParams']=function(){const _0x764d13=_0x9eb9ae;let _0x16ea9b=0x0;for(const _0x1d9cb9 of VisuMZ[_0x764d13(0x68b)]['Settings'][_0x764d13(0x5bb)][_0x764d13(0x6ea)]){const _0x3108d2=this['itemPadding'](),_0x41f8c7=this['paramY'](_0x16ea9b);this[_0x764d13(0x6d3)](_0x3108d2,_0x41f8c7,_0x1d9cb9),_0x16ea9b++;}},Window_EquipStatus[_0x9eb9ae(0x61d)][_0x9eb9ae(0x127)]=function(_0x216a98,_0x1348f0,_0x1b8504){const _0x2072ed=_0x9eb9ae,_0x4e0698=this['paramX']()-this['itemPadding']()*0x2;this[_0x2072ed(0x5d6)](_0x216a98,_0x1348f0,_0x4e0698,_0x1b8504,![]);},Window_EquipStatus['prototype'][_0x9eb9ae(0x341)]=function(_0x5f0cb1,_0x3bf0d5,_0x4a8775){const _0x47fc9a=_0x9eb9ae,_0x183e05=this[_0x47fc9a(0x3c0)]();this['resetTextColor'](),this['drawText'](this[_0x47fc9a(0x3f4)]['paramValueByName'](_0x4a8775,!![]),_0x5f0cb1,_0x3bf0d5,_0x183e05,_0x47fc9a(0x8ea));},Window_EquipStatus['prototype'][_0x9eb9ae(0x767)]=function(_0x3e8abf,_0xb5c08c){const _0x5d6e69=_0x9eb9ae,_0x377189=this[_0x5d6e69(0x6e4)]();this[_0x5d6e69(0x4ee)](ColorManager['systemColor']());const _0x17424b=VisuMZ[_0x5d6e69(0x68b)][_0x5d6e69(0x1dc)]['UI'][_0x5d6e69(0x6f2)];this['drawText'](_0x17424b,_0x3e8abf,_0xb5c08c,_0x377189,_0x5d6e69(0x7ce));},Window_EquipStatus[_0x9eb9ae(0x61d)][_0x9eb9ae(0x555)]=function(_0x313b31,_0x11eafb,_0x2e9c26){const _0x5d61fc=_0x9eb9ae,_0x23cd97=this[_0x5d61fc(0x3c0)](),_0x1628a3=this[_0x5d61fc(0x8e7)][_0x5d61fc(0x4a0)](_0x2e9c26),_0x118605=_0x1628a3-this[_0x5d61fc(0x3f4)][_0x5d61fc(0x4a0)](_0x2e9c26);this[_0x5d61fc(0x4ee)](ColorManager[_0x5d61fc(0x4f7)](_0x118605)),this[_0x5d61fc(0x1e0)](this[_0x5d61fc(0x8e7)]['paramValueByName'](_0x2e9c26,!![]),_0x313b31,_0x11eafb,_0x23cd97,_0x5d61fc(0x8ea));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x6e7)]=Window_EquipItem[_0x9eb9ae(0x61d)][_0x9eb9ae(0x22f)],Window_EquipItem['prototype'][_0x9eb9ae(0x22f)]=function(_0x15c592){const _0x1a39b6=_0x9eb9ae;if(_0x15c592&&this[_0x1a39b6(0x3f4)]){if(_0x1a39b6(0x277)===_0x1a39b6(0x277))return this[_0x1a39b6(0x3f4)]['canEquip'](_0x15c592);else{const _0x369fd0=this[_0x1a39b6(0x55f)];_0x369fd0[_0x1a39b6(0x738)]=this[_0x1a39b6(0x784)],_0x369fd0[_0x1a39b6(0x41c)](_0x598160,_0x1f6072+0x2,_0x1c85fd+0x2,_0x5d45dd);}}else{if(_0x1a39b6(0x4e4)===_0x1a39b6(0x173))this['drawIconBySize'](_0x1132d8,_0x560995,_0x4e4bfe,this[_0x1a39b6(0x139)]()),_0x57d7f4-=this[_0x1a39b6(0x139)]()+0x2,_0x17d279+=this['gaugeLineHeight']()+0x2;else return VisuMZ[_0x1a39b6(0x68b)][_0x1a39b6(0x6e7)][_0x1a39b6(0x330)](this,_0x15c592);}},Window_StatusParams['prototype'][_0x9eb9ae(0x748)]=function(){const _0x59c127=_0x9eb9ae;return VisuMZ[_0x59c127(0x68b)][_0x59c127(0x1dc)][_0x59c127(0x5bb)]['DisplayedParams']['length'];},Window_StatusParams[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6d3)]=function(_0x479538){const _0x1c160b=_0x9eb9ae,_0x58d5a2=this[_0x1c160b(0x11c)](_0x479538),_0xcdb0c6=VisuMZ[_0x1c160b(0x68b)][_0x1c160b(0x1dc)][_0x1c160b(0x5bb)]['DisplayedParams'][_0x479538],_0x5385e8=TextManager['param'](_0xcdb0c6),_0x394aad=this[_0x1c160b(0x3f4)][_0x1c160b(0x4a0)](_0xcdb0c6,!![]);this['drawParamText'](_0x58d5a2['x'],_0x58d5a2['y'],0xa0,_0xcdb0c6,![]),this[_0x1c160b(0x3d3)](),this[_0x1c160b(0x1e0)](_0x394aad,_0x58d5a2['x']+0xa0,_0x58d5a2['y'],0x3c,_0x1c160b(0x8ea));};if(VisuMZ['CoreEngine'][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x57f)]['EnableNameInput']){VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x57f)][_0x9eb9ae(0x114)]&&(Window_NameInput[_0x9eb9ae(0x693)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x9eb9ae(0x3b3),'OK']);;VisuMZ['CoreEngine']['Window_NameInput_initialize']=Window_NameInput[_0x9eb9ae(0x61d)]['initialize'],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7d0)]=function(_0x218945){const _0x138aef=_0x9eb9ae;this[_0x138aef(0x4cb)]=this[_0x138aef(0x410)](),VisuMZ[_0x138aef(0x68b)][_0x138aef(0x39e)][_0x138aef(0x330)](this,_0x218945),this[_0x138aef(0x4cb)]===_0x138aef(0xfc)?_0x138aef(0x7ed)===_0x138aef(0x7ed)?this[_0x138aef(0x7a9)](0x0):this[_0x138aef(0x7c7)](_0x138aef(0xfc)):_0x138aef(0x2a7)!=='hXIpW'?(_0x24ddf7+=_0x391056,_0x2e4f39+=_0x138aef(0x563)[_0x138aef(0x468)](_0x1b7cf3)):(Input[_0x138aef(0x889)](),this[_0x138aef(0x5d1)]());},Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x410)]=function(){const _0x279d50=_0x9eb9ae;if(Input[_0x279d50(0x3e4)]())return _0x279d50(0xfc);return VisuMZ[_0x279d50(0x68b)][_0x279d50(0x1dc)]['KeyboardInput'][_0x279d50(0x5cf)]||_0x279d50(0x619);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x51e)]=Window_NameInput[_0x9eb9ae(0x61d)]['processHandling'],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x585)]=function(){const _0x19cd6e=_0x9eb9ae;if(!this['isOpen']())return;if(!this[_0x19cd6e(0x4e9)])return;if(this[_0x19cd6e(0x4cb)]===_0x19cd6e(0x619)&&Input['isGamepadTriggered']())this['switchModes'](_0x19cd6e(0xfc));else{if(Input['isSpecialCode'](_0x19cd6e(0x1e5))){if(_0x19cd6e(0x1bf)===_0x19cd6e(0x1bf))Input[_0x19cd6e(0x889)](),this['processBack']();else return _0xf0a3df[_0x19cd6e(0x68b)]['Settings'][_0x19cd6e(0x2c7)]['KeyItemProtect']&&_0x1013b2[_0x19cd6e(0x6a6)](_0xe50209)?![]:_0x317453['CoreEngine'][_0x19cd6e(0x2c3)]['call'](this,_0x2db430);}else{if(Input['isTriggered'](_0x19cd6e(0x36e)))Input[_0x19cd6e(0x889)](),this[_0x19cd6e(0x4cb)]===_0x19cd6e(0x619)?this['switchModes']('default'):this[_0x19cd6e(0x7c7)](_0x19cd6e(0x619));else{if(this[_0x19cd6e(0x4cb)]===_0x19cd6e(0x619))this[_0x19cd6e(0x5ad)]();else Input[_0x19cd6e(0x29e)](_0x19cd6e(0x694))?(Input[_0x19cd6e(0x889)](),this['switchModes'](_0x19cd6e(0x619))):VisuMZ['CoreEngine'][_0x19cd6e(0x51e)][_0x19cd6e(0x330)](this);}}}},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x2e7)]=Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6e0)],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6e0)]=function(){const _0x9ffbaf=_0x9eb9ae;if(!this[_0x9ffbaf(0x803)]())return;if(this[_0x9ffbaf(0x4cb)]===_0x9ffbaf(0x619)){if(TouchInput[_0x9ffbaf(0x577)]()&&this[_0x9ffbaf(0x5d5)]())this['switchModes']('default');else{if(TouchInput['isCancelled']()){if('HbFrl'===_0x9ffbaf(0x41f))this['switchModes'](_0x9ffbaf(0xfc));else{const _0x45faeb=_0x1973fa['skillId'];if(_0x45faeb===0x1&&this[_0x9ffbaf(0x2ae)]()[_0x9ffbaf(0x41d)]()!==0x1)this[_0x9ffbaf(0x47a)]();else _0x45faeb===0x2&&this[_0x9ffbaf(0x2ae)]()[_0x9ffbaf(0x4a6)]()!==0x2?this[_0x9ffbaf(0x74f)]():this[_0x9ffbaf(0x4c3)](_0x45faeb);}}}}else VisuMZ[_0x9ffbaf(0x68b)][_0x9ffbaf(0x2e7)][_0x9ffbaf(0x330)](this);},Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5ad)]=function(){const _0x53a09b=_0x9eb9ae;if(Input[_0x53a09b(0x29e)](_0x53a09b(0x606)))Input[_0x53a09b(0x889)](),this[_0x53a09b(0x1a8)]();else{if(Input[_0x53a09b(0x544)]!==undefined){if(_0x53a09b(0x4ba)===_0x53a09b(0x4ba)){let _0x3ef863=Input[_0x53a09b(0x544)],_0x268251=_0x3ef863[_0x53a09b(0x631)];for(let _0x557138=0x0;_0x557138<_0x268251;++_0x557138){_0x53a09b(0x588)!==_0x53a09b(0x895)?this['_editWindow']['add'](_0x3ef863[_0x557138])?SoundManager[_0x53a09b(0x289)]():SoundManager[_0x53a09b(0x3bc)]():this['process_VisuMZ_CoreEngine_jsQuickFunctions']();}Input['clear']();}else{const _0x548e15=_0x43af5a(_0x2a4ef6['$1']);_0x548e15<_0x2a3d73?(_0x353cea(_0x53a09b(0x592)[_0x53a09b(0x468)](_0x22387f,_0x548e15,_0x3796b0)),_0x5376cc[_0x53a09b(0x12d)]()):_0xdef0ae=_0x1f87c4[_0x53a09b(0x713)](_0x548e15,_0x37473e);}}}},Window_NameInput['prototype'][_0x9eb9ae(0x7c7)]=function(_0x22d3fd){const _0x49ffb8=_0x9eb9ae;let _0x29ad93=this['_mode'];this[_0x49ffb8(0x4cb)]=_0x22d3fd,_0x29ad93!==this['_mode']&&(this[_0x49ffb8(0x87f)](),SoundManager[_0x49ffb8(0x289)](),this[_0x49ffb8(0x4cb)]===_0x49ffb8(0xfc)?_0x49ffb8(0x38b)===_0x49ffb8(0x1ec)?this[_0x49ffb8(0x2bb)](_0x5b5dae):this[_0x49ffb8(0x7a9)](0x0):this[_0x49ffb8(0x7a9)](-0x1));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x286)]=Window_NameInput['prototype'][_0x9eb9ae(0x81a)],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x81a)]=function(_0x308653){const _0x1c1257=_0x9eb9ae;if(this['_mode']==='keyboard'&&!Input[_0x1c1257(0x3ae)]())return;if(Input[_0x1c1257(0x165)]())return;VisuMZ[_0x1c1257(0x68b)][_0x1c1257(0x286)][_0x1c1257(0x330)](this,_0x308653),this[_0x1c1257(0x7c7)]('default');},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x36b)]=Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x684)],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x684)]=function(_0xf06e3){const _0x5f2b5b=_0x9eb9ae;if(this['_mode']===_0x5f2b5b(0x619)&&!Input[_0x5f2b5b(0x3ae)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5f2b5b(0x68b)][_0x5f2b5b(0x36b)][_0x5f2b5b(0x330)](this,_0xf06e3),this[_0x5f2b5b(0x7c7)](_0x5f2b5b(0xfc));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x35a)]=Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x429)],Window_NameInput['prototype'][_0x9eb9ae(0x429)]=function(_0x276144){const _0x21316e=_0x9eb9ae;if(this[_0x21316e(0x4cb)]===_0x21316e(0x619)&&!Input[_0x21316e(0x3ae)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x21316e(0x68b)]['Window_NameInput_cursorRight'][_0x21316e(0x330)](this,_0x276144),this[_0x21316e(0x7c7)](_0x21316e(0xfc));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x85a)]=Window_NameInput[_0x9eb9ae(0x61d)]['cursorLeft'],Window_NameInput[_0x9eb9ae(0x61d)]['cursorLeft']=function(_0x316c97){const _0x40d77d=_0x9eb9ae;if(this[_0x40d77d(0x4cb)]===_0x40d77d(0x619)&&!Input[_0x40d77d(0x3ae)]())return;if(Input[_0x40d77d(0x165)]())return;VisuMZ['CoreEngine'][_0x40d77d(0x85a)]['call'](this,_0x316c97),this[_0x40d77d(0x7c7)](_0x40d77d(0xfc));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x70c)]=Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2a4)],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2a4)]=function(){const _0x329f57=_0x9eb9ae;if(this[_0x329f57(0x4cb)]==='keyboard')return;if(Input[_0x329f57(0x165)]())return;VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown'][_0x329f57(0x330)](this),this['switchModes'](_0x329f57(0xfc));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x71a)]=Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x526)],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x526)]=function(){const _0x4952bc=_0x9eb9ae;if(this[_0x4952bc(0x4cb)]==='keyboard')return;if(Input[_0x4952bc(0x165)]())return;VisuMZ[_0x4952bc(0x68b)][_0x4952bc(0x71a)][_0x4952bc(0x330)](this),this[_0x4952bc(0x7c7)](_0x4952bc(0xfc));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x180)]=Window_NameInput[_0x9eb9ae(0x61d)]['refresh'],Window_NameInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x87f)]=function(){const _0x2e0e16=_0x9eb9ae;if(this[_0x2e0e16(0x4cb)]===_0x2e0e16(0x619)){if('ClaBR'==='ClaBR'){this[_0x2e0e16(0x423)][_0x2e0e16(0x889)](),this['contentsBack'][_0x2e0e16(0x889)](),this['resetTextColor']();let _0x4cbffd=VisuMZ[_0x2e0e16(0x68b)][_0x2e0e16(0x1dc)]['KeyboardInput']['NameInputMessage'][_0x2e0e16(0x675)]('\x0a'),_0x4887f4=_0x4cbffd[_0x2e0e16(0x631)],_0x595c1c=(this[_0x2e0e16(0x2e3)]-_0x4887f4*this[_0x2e0e16(0x5f5)]())/0x2;for(let _0x593a11=0x0;_0x593a11<_0x4887f4;++_0x593a11){if(_0x2e0e16(0x7b0)!==_0x2e0e16(0x7b0))_0x476e37['endAnimation']&&_0x275371[_0x2e0e16(0x20e)]();else{let _0x4f0582=_0x4cbffd[_0x593a11],_0x58926c=this[_0x2e0e16(0x427)](_0x4f0582)[_0x2e0e16(0x792)],_0x3e40e9=Math[_0x2e0e16(0x83f)]((this['contents'][_0x2e0e16(0x792)]-_0x58926c)/0x2);this['drawTextEx'](_0x4f0582,_0x3e40e9,_0x595c1c),_0x595c1c+=this[_0x2e0e16(0x5f5)]();}}}else return this[_0x2e0e16(0x369)]();}else{if(_0x2e0e16(0x29b)!==_0x2e0e16(0x29b))return _0x18c247[_0x2e0e16(0x68b)][_0x2e0e16(0x1dc)]['UI']['FadeSpeed'];else VisuMZ[_0x2e0e16(0x68b)][_0x2e0e16(0x180)][_0x2e0e16(0x330)](this);}};};VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x2c3)]=Window_ShopSell[_0x9eb9ae(0x61d)][_0x9eb9ae(0x22f)],Window_ShopSell['prototype'][_0x9eb9ae(0x22f)]=function(_0x56b877){const _0x4ec64b=_0x9eb9ae;if(VisuMZ['CoreEngine'][_0x4ec64b(0x1dc)][_0x4ec64b(0x2c7)][_0x4ec64b(0x548)]&&DataManager['isKeyItem'](_0x56b877)){if(_0x4ec64b(0x4f9)!=='KdOuf')_0x502686[_0x4ec64b(0x3bc)]();else return![];}else return VisuMZ[_0x4ec64b(0x68b)][_0x4ec64b(0x2c3)][_0x4ec64b(0x330)](this,_0x56b877);},Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x853)]=function(){return![];};VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x57f)][_0x9eb9ae(0x8d3)]&&(VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x525)]=Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x406)],Window_NumberInput['prototype'][_0x9eb9ae(0x406)]=function(){const _0x2de0bc=_0x9eb9ae;VisuMZ['CoreEngine'][_0x2de0bc(0x525)]['call'](this),this['select'](this['_maxDigits']-0x1),Input[_0x2de0bc(0x889)]();},VisuMZ[_0x9eb9ae(0x68b)]['Window_NumberInput_processDigitChange']=Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7ec)],Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7ec)]=function(){const _0x3e00d0=_0x9eb9ae;if(!this['isOpenAndActive']())return;if(Input['isNumpadPressed']())this[_0x3e00d0(0x651)]();else{if(Input['isSpecialCode']('backspace'))this['processKeyboardBackspace']();else{if(Input[_0x3e00d0(0x4ff)]===0x2e)this[_0x3e00d0(0x75d)]();else{if(Input[_0x3e00d0(0x4ff)]===0x24)_0x3e00d0(0x501)!==_0x3e00d0(0x501)?_0x166280['CoreEngine']['Settings'][_0x3e00d0(0x2c7)]['FontShadows']?this[_0x3e00d0(0x48a)](_0xa32a5,_0x2b3652,_0x5ee8f2,_0xe37f76):_0x2684de['CoreEngine']['Bitmap_drawTextOutline'][_0x3e00d0(0x330)](this,_0x9073f,_0x5c3e26,_0x237ed1,_0x26f317):this['processKeyboardHome']();else Input[_0x3e00d0(0x4ff)]===0x23?this['processKeyboardEnd']():VisuMZ['CoreEngine']['Window_NumberInput_processDigitChange'][_0x3e00d0(0x330)](this);}}}},Window_NumberInput[_0x9eb9ae(0x61d)]['processCursorMove']=function(){const _0x594f44=_0x9eb9ae;if(!this[_0x594f44(0x86e)]())return;Input[_0x594f44(0x165)]()?this[_0x594f44(0x651)]():Window_Selectable[_0x594f44(0x61d)][_0x594f44(0x8ee)]['call'](this);},Window_NumberInput['prototype']['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x651)]=function(){const _0x45ac67=_0x9eb9ae;if(String(this[_0x45ac67(0x7fd)])[_0x45ac67(0x631)]>=this['_maxDigits'])return;const _0x467d03=Number(String(this[_0x45ac67(0x7fd)])+Input[_0x45ac67(0x544)]);if(isNaN(_0x467d03))return;this[_0x45ac67(0x7fd)]=_0x467d03;const _0x3d0e5b='9'[_0x45ac67(0x132)](this[_0x45ac67(0x69b)]);this[_0x45ac67(0x7fd)]=this[_0x45ac67(0x7fd)][_0x45ac67(0x739)](0x0,_0x3d0e5b),Input[_0x45ac67(0x889)](),this[_0x45ac67(0x87f)](),SoundManager[_0x45ac67(0x7f5)](),this[_0x45ac67(0x7a9)](this[_0x45ac67(0x69b)]-0x1);},Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x6e9)]=function(){const _0x5c7608=_0x9eb9ae;this[_0x5c7608(0x7fd)]=Number(String(this[_0x5c7608(0x7fd)])[_0x5c7608(0x2c5)](0x0,-0x1)),this['_number']=Math[_0x5c7608(0x713)](0x0,this[_0x5c7608(0x7fd)]),Input['clear'](),this[_0x5c7608(0x87f)](),SoundManager['playCursor'](),this[_0x5c7608(0x7a9)](this[_0x5c7608(0x69b)]-0x1);},Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x75d)]=function(){const _0x2f2930=_0x9eb9ae;this[_0x2f2930(0x7fd)]=Number(String(this[_0x2f2930(0x7fd)])[_0x2f2930(0x8eb)](0x1)),this[_0x2f2930(0x7fd)]=Math[_0x2f2930(0x713)](0x0,this['_number']),Input[_0x2f2930(0x889)](),this[_0x2f2930(0x87f)](),SoundManager[_0x2f2930(0x7f5)](),this['select'](this[_0x2f2930(0x69b)]-0x1);},Window_NumberInput['prototype'][_0x9eb9ae(0x20c)]=function(){const _0x3af7a4=_0x9eb9ae;if(this[_0x3af7a4(0x20d)]()===0x0)return;Input['clear'](),this[_0x3af7a4(0x87f)](),SoundManager[_0x3af7a4(0x7f5)](),this[_0x3af7a4(0x7a9)](0x0);},Window_NumberInput[_0x9eb9ae(0x61d)][_0x9eb9ae(0x4da)]=function(){const _0x436e19=_0x9eb9ae;if(this[_0x436e19(0x20d)]()===this[_0x436e19(0x69b)]-0x1)return;Input[_0x436e19(0x889)](),this[_0x436e19(0x87f)](),SoundManager[_0x436e19(0x7f5)](),this[_0x436e19(0x7a9)](this[_0x436e19(0x69b)]-0x1);});;Window_TitleCommand[_0x9eb9ae(0x4f8)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)]['TitleCommandList'],Window_TitleCommand['prototype'][_0x9eb9ae(0x43c)]=function(){const _0x584161=_0x9eb9ae;this[_0x584161(0x469)]();},Window_TitleCommand[_0x9eb9ae(0x61d)][_0x9eb9ae(0x469)]=function(){const _0x481ccb=_0x9eb9ae;for(const _0x3700f1 of Window_TitleCommand[_0x481ccb(0x4f8)]){if(_0x481ccb(0x195)==='xmRCS'){if(!this[_0x481ccb(0x14b)]())return;this[_0x481ccb(0x87f)]();}else{if(_0x3700f1['ShowJS'][_0x481ccb(0x330)](this)){const _0x1285f2=_0x3700f1[_0x481ccb(0x646)];let _0x2a9193=_0x3700f1[_0x481ccb(0x45d)];if(['','Untitled'][_0x481ccb(0x111)](_0x2a9193))_0x2a9193=_0x3700f1['TextJS'][_0x481ccb(0x330)](this);const _0x3fb8da=_0x3700f1[_0x481ccb(0x715)][_0x481ccb(0x330)](this),_0x3973e8=_0x3700f1[_0x481ccb(0x1fd)][_0x481ccb(0x330)](this);this['addCommand'](_0x2a9193,_0x1285f2,_0x3fb8da,_0x3973e8),this[_0x481ccb(0x38a)](_0x1285f2,_0x3700f1[_0x481ccb(0x1c3)][_0x481ccb(0x3c8)](this,_0x3973e8));}}}},Window_GameEnd[_0x9eb9ae(0x4f8)]=VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x1dc)][_0x9eb9ae(0x758)][_0x9eb9ae(0x624)][_0x9eb9ae(0x665)],Window_GameEnd[_0x9eb9ae(0x61d)]['makeCommandList']=function(){const _0x4b3a1d=_0x9eb9ae;this[_0x4b3a1d(0x469)]();},Window_GameEnd[_0x9eb9ae(0x61d)][_0x9eb9ae(0x469)]=function(){const _0x5796fa=_0x9eb9ae;for(const _0x48f102 of Window_GameEnd[_0x5796fa(0x4f8)]){if(_0x48f102[_0x5796fa(0x60e)][_0x5796fa(0x330)](this)){if(_0x5796fa(0x874)!==_0x5796fa(0x874))_0x5112aa['setupNewGame'](),_0x38d24e[_0x5796fa(0x7cd)](_0x40cae);else{const _0x238636=_0x48f102[_0x5796fa(0x646)];let _0x2b15e9=_0x48f102['TextStr'];if(['',_0x5796fa(0x66e)]['includes'](_0x2b15e9))_0x2b15e9=_0x48f102['TextJS'][_0x5796fa(0x330)](this);const _0xe307d4=_0x48f102[_0x5796fa(0x715)][_0x5796fa(0x330)](this),_0x1b8780=_0x48f102[_0x5796fa(0x1fd)][_0x5796fa(0x330)](this);this[_0x5796fa(0x39a)](_0x2b15e9,_0x238636,_0xe307d4,_0x1b8780),this[_0x5796fa(0x38a)](_0x238636,_0x48f102['CallHandlerJS'][_0x5796fa(0x3c8)](this,_0x1b8780));}}}};function Window_ButtonAssist(){const _0x153bf3=_0x9eb9ae;this[_0x153bf3(0x7d0)](...arguments);}Window_ButtonAssist[_0x9eb9ae(0x61d)]=Object['create'](Window_Base['prototype']),Window_ButtonAssist[_0x9eb9ae(0x61d)][_0x9eb9ae(0x734)]=Window_ButtonAssist,Window_ButtonAssist[_0x9eb9ae(0x61d)]['initialize']=function(_0x552212){const _0x2113d3=_0x9eb9ae;this['_data']={},Window_Base[_0x2113d3(0x61d)][_0x2113d3(0x7d0)][_0x2113d3(0x330)](this,_0x552212),this[_0x2113d3(0x71c)](VisuMZ[_0x2113d3(0x68b)][_0x2113d3(0x1dc)]['ButtonAssist'][_0x2113d3(0x729)]||0x0),this['refresh']();},Window_ButtonAssist[_0x9eb9ae(0x61d)]['makeFontBigger']=function(){const _0x5d03f0=_0x9eb9ae;this[_0x5d03f0(0x423)][_0x5d03f0(0x521)]<=0x60&&(this[_0x5d03f0(0x423)]['fontSize']+=0x6);},Window_ButtonAssist[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f0)]=function(){const _0x1270d7=_0x9eb9ae;if(this['contents'][_0x1270d7(0x521)]>=0x18){if(_0x1270d7(0x669)!==_0x1270d7(0x56e))this['contents']['fontSize']-=0x6;else return this[_0x1270d7(0x542)]()?this[_0x1270d7(0x264)]():_0x142ad5[_0x1270d7(0x68b)][_0x1270d7(0x5e6)]['call'](this);}},Window_ButtonAssist['prototype'][_0x9eb9ae(0x1ed)]=function(){const _0x172c28=_0x9eb9ae;Window_Base[_0x172c28(0x61d)]['update'][_0x172c28(0x330)](this),this[_0x172c28(0x20b)]();},Window_ButtonAssist[_0x9eb9ae(0x61d)][_0x9eb9ae(0x604)]=function(){const _0x22cb91=_0x9eb9ae;this[_0x22cb91(0x877)]=SceneManager[_0x22cb91(0x584)][_0x22cb91(0x8b5)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x9eb9ae(0x61d)]['updateKeyText']=function(){const _0xd6bdea=_0x9eb9ae,_0x49b4e9=SceneManager[_0xd6bdea(0x584)];for(let _0x5a46d2=0x1;_0x5a46d2<=0x5;_0x5a46d2++){if(_0xd6bdea(0x571)!==_0xd6bdea(0x5dd)){if(this['_data'][_0xd6bdea(0x189)['format'](_0x5a46d2)]!==_0x49b4e9[_0xd6bdea(0x648)[_0xd6bdea(0x468)](_0x5a46d2)]()){if('qOmug'===_0xd6bdea(0x8cc))return this[_0xd6bdea(0x87f)]();else this[_0xd6bdea(0x7e2)]['y']=0x0;}if(this['_data']['text%1'[_0xd6bdea(0x468)](_0x5a46d2)]!==_0x49b4e9[_0xd6bdea(0x844)[_0xd6bdea(0x468)](_0x5a46d2)]())return this[_0xd6bdea(0x87f)]();}else _0x454808[_0xd6bdea(0x5c3)](_0x508af5);}},Window_ButtonAssist[_0x9eb9ae(0x61d)]['refresh']=function(){const _0x577de3=_0x9eb9ae;this['contents'][_0x577de3(0x889)]();for(let _0x12abd=0x1;_0x12abd<=0x5;_0x12abd++){_0x577de3(0x741)!==_0x577de3(0x741)?this['_forcedBattleSys']='OTB':this[_0x577de3(0x78c)](_0x12abd);}},Window_ButtonAssist[_0x9eb9ae(0x61d)]['drawSegment']=function(_0x2a2138){const _0x355446=_0x9eb9ae,_0x3b46c5=this[_0x355446(0x4a3)]/0x5,_0x3f613b=SceneManager[_0x355446(0x584)],_0x368676=_0x3f613b[_0x355446(0x648)[_0x355446(0x468)](_0x2a2138)](),_0x5d78b6=_0x3f613b['buttonAssistText%1'[_0x355446(0x468)](_0x2a2138)]();this[_0x355446(0x269)]['key%1'['format'](_0x2a2138)]=_0x368676,this['_data'][_0x355446(0x60d)['format'](_0x2a2138)]=_0x5d78b6;if(_0x368676==='')return;if(_0x5d78b6==='')return;const _0x4dfdd0=_0x3f613b[_0x355446(0x709)[_0x355446(0x468)](_0x2a2138)](),_0xce66c0=this['itemPadding'](),_0x1b6dd7=_0x3b46c5*(_0x2a2138-0x1)+_0xce66c0+_0x4dfdd0,_0x39904e=VisuMZ[_0x355446(0x68b)]['Settings'][_0x355446(0x452)]['TextFmt'];this[_0x355446(0x497)](_0x39904e[_0x355446(0x468)](_0x368676,_0x5d78b6),_0x1b6dd7,0x0,_0x3b46c5-_0xce66c0*0x2);},VisuMZ[_0x9eb9ae(0x68b)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype'][_0x9eb9ae(0x3a8)],Game_Interpreter[_0x9eb9ae(0x61d)][_0x9eb9ae(0x3a8)]=function(){const _0x2fdff5=_0x9eb9ae;if($gameTemp[_0x2fdff5(0x8b8)]!==undefined)return VisuMZ[_0x2fdff5(0x68b)][_0x2fdff5(0x385)]();return VisuMZ[_0x2fdff5(0x68b)]['Game_Interpreter_updateWaitMode']['call'](this);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x385)]=function(){const _0x38b49=_0x9eb9ae,_0x1e8f9f=$gameTemp[_0x38b49(0x8b8)]||0x0;(_0x1e8f9f<0x0||_0x1e8f9f>0x64||TouchInput[_0x38b49(0x482)]()||Input[_0x38b49(0x577)](_0x38b49(0x118)))&&($gameTemp[_0x38b49(0x8b8)]=undefined,Input[_0x38b49(0x889)](),TouchInput[_0x38b49(0x889)]());const _0x5a9543=$gameScreen[_0x38b49(0x164)](_0x1e8f9f);return _0x5a9543&&(_0x5a9543['_x']=TouchInput['_x'],_0x5a9543['_y']=TouchInput['_y']),VisuMZ[_0x38b49(0x68b)]['updatePictureCoordinates'](),$gameTemp[_0x38b49(0x8b8)]!==undefined;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x3d9)]=function(){const _0xa2178b=_0x9eb9ae,_0x267164=SceneManager['_scene'];if(!_0x267164)return;!_0x267164[_0xa2178b(0x894)]&&(SoundManager['playLoad'](),_0x267164['_pictureCoordinatesWindow']=new Window_PictureCoordinates(),_0x267164[_0xa2178b(0xf5)](_0x267164['_pictureCoordinatesWindow'])),$gameTemp[_0xa2178b(0x8b8)]===undefined&&(SoundManager[_0xa2178b(0x11d)](),_0x267164[_0xa2178b(0x370)](_0x267164[_0xa2178b(0x894)]),_0x267164['_pictureCoordinatesWindow']=undefined);};function Window_PictureCoordinates(){const _0x3f64c1=_0x9eb9ae;this[_0x3f64c1(0x7d0)](...arguments);}Window_PictureCoordinates['prototype']=Object['create'](Window_Base[_0x9eb9ae(0x61d)]),Window_PictureCoordinates['prototype']['constructor']=Window_PictureCoordinates,Window_PictureCoordinates[_0x9eb9ae(0x61d)]['initialize']=function(){const _0x5ae5e7=_0x9eb9ae;this[_0x5ae5e7(0x59b)]='nah',this[_0x5ae5e7(0x441)]=_0x5ae5e7(0x712),this[_0x5ae5e7(0x6e6)]=_0x5ae5e7(0x712);const _0x399e13=this[_0x5ae5e7(0x597)]();Window_Base['prototype'][_0x5ae5e7(0x7d0)]['call'](this,_0x399e13),this[_0x5ae5e7(0x71c)](0x2);},Window_PictureCoordinates[_0x9eb9ae(0x61d)][_0x9eb9ae(0x597)]=function(){const _0x33e248=_0x9eb9ae;let _0x4a88ba=0x0,_0x3d713c=Graphics[_0x33e248(0x71d)]-this['lineHeight'](),_0x487ed5=Graphics['width'],_0x113b3b=this[_0x33e248(0x5f5)]();return new Rectangle(_0x4a88ba,_0x3d713c,_0x487ed5,_0x113b3b);},Window_PictureCoordinates['prototype'][_0x9eb9ae(0x604)]=function(){const _0xbec19e=_0x9eb9ae;this[_0xbec19e(0x877)]=0x0;},Window_PictureCoordinates[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ed)]=function(){const _0x599955=_0x9eb9ae;Window_Base[_0x599955(0x61d)][_0x599955(0x1ed)][_0x599955(0x330)](this),this[_0x599955(0x89f)]();},Window_PictureCoordinates[_0x9eb9ae(0x61d)][_0x9eb9ae(0x89f)]=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x9eb9ae(0x61d)]['needsUpdate']=function(){const _0x2a5c7e=_0x9eb9ae,_0x385115=$gameTemp['_pictureCoordinatesMode'],_0x3f1f8f=$gameScreen[_0x2a5c7e(0x164)](_0x385115);if(_0x3f1f8f){if(_0x2a5c7e(0x74a)!==_0x2a5c7e(0x74a)){const _0x36a106=this[_0x2a5c7e(0x4d5)](_0xdec819),_0x5e53e5=this[_0x2a5c7e(0x8be)](_0x19c458),_0x2c9724=this[_0x2a5c7e(0x267)](_0x4c38b6);return _0x36a106*(_0x5e53e5-_0x2c9724);}else return this[_0x2a5c7e(0x59b)]!==_0x3f1f8f['_origin']||this[_0x2a5c7e(0x441)]!==_0x3f1f8f['_x']||this[_0x2a5c7e(0x6e6)]!==_0x3f1f8f['_y'];}else return![];},Window_PictureCoordinates[_0x9eb9ae(0x61d)][_0x9eb9ae(0x87f)]=function(){const _0xa31e17=_0x9eb9ae;this[_0xa31e17(0x423)][_0xa31e17(0x889)]();const _0x195aae=$gameTemp[_0xa31e17(0x8b8)],_0x15b632=$gameScreen[_0xa31e17(0x164)](_0x195aae);if(!_0x15b632)return;this['_lastOrigin']=_0x15b632['_origin'],this[_0xa31e17(0x441)]=_0x15b632['_x'],this[_0xa31e17(0x6e6)]=_0x15b632['_y'];const _0xa7211c=ColorManager[_0xa31e17(0x3df)]();this[_0xa31e17(0x423)][_0xa31e17(0x6bd)](0x0,0x0,this['innerWidth'],this['innerHeight'],_0xa7211c);const _0x18ca28='\x20Origin:\x20%1'['format'](_0x15b632[_0xa31e17(0x5b7)]===0x0?_0xa31e17(0x8d4):'Center'),_0xf47408=_0xa31e17(0x25a)[_0xa31e17(0x468)](_0x15b632['_x']),_0x1d7606='Y:\x20%1'[_0xa31e17(0x468)](_0x15b632['_y']),_0x348450='%1:\x20Exit\x20'[_0xa31e17(0x468)](TextManager[_0xa31e17(0x3ed)](_0xa31e17(0x118)));let _0x5789c0=Math[_0xa31e17(0x83f)](this[_0xa31e17(0x4a3)]/0x4);this[_0xa31e17(0x1e0)](_0x18ca28,_0x5789c0*0x0,0x0,_0x5789c0),this['drawText'](_0xf47408,_0x5789c0*0x1,0x0,_0x5789c0,'center'),this[_0xa31e17(0x1e0)](_0x1d7606,_0x5789c0*0x2,0x0,_0x5789c0,_0xa31e17(0x7ce));const _0x23fcde=this[_0xa31e17(0x427)](_0x348450)[_0xa31e17(0x792)],_0x2f6d0a=this['innerWidth']-_0x23fcde;this['drawTextEx'](_0x348450,_0x2f6d0a,0x0,_0x23fcde);},VisuMZ[_0x9eb9ae(0x31d)]=function(_0x13fc52){const _0x169267=_0x9eb9ae;if(Utils[_0x169267(0x27b)]('test')){if(_0x169267(0x419)!=='EpvyS')return _0x94345b[_0x169267(0x68b)][_0x169267(0x1dc)]['Color'][_0x169267(0x412)]['call'](this,_0x5ac8b7);else{var _0xf5fb7f=require(_0x169267(0x2ee))[_0x169267(0x8f6)][_0x169267(0x3a4)]();SceneManager[_0x169267(0x91f)]();if(_0x13fc52)setTimeout(_0xf5fb7f[_0x169267(0x3c1)][_0x169267(0x3c8)](_0xf5fb7f),0x190);}}},VisuMZ[_0x9eb9ae(0x638)]=function(_0x42dd55,_0x475439){const _0x42e023=_0x9eb9ae;_0x475439=_0x475439[_0x42e023(0x88e)]();var _0x256385=1.70158,_0x1ae7d9=0.7;switch(_0x475439){case _0x42e023(0x640):return _0x42dd55;case _0x42e023(0x378):return-0x1*Math[_0x42e023(0x54e)](_0x42dd55*(Math['PI']/0x2))+0x1;case _0x42e023(0x282):return Math['sin'](_0x42dd55*(Math['PI']/0x2));case _0x42e023(0x912):return-0.5*(Math[_0x42e023(0x54e)](Math['PI']*_0x42dd55)-0x1);case _0x42e023(0x16e):return _0x42dd55*_0x42dd55;case _0x42e023(0x586):return _0x42dd55*(0x2-_0x42dd55);case _0x42e023(0x528):return _0x42dd55<0.5?0x2*_0x42dd55*_0x42dd55:-0x1+(0x4-0x2*_0x42dd55)*_0x42dd55;case _0x42e023(0x44e):return _0x42dd55*_0x42dd55*_0x42dd55;case _0x42e023(0x252):var _0x190ee6=_0x42dd55-0x1;return _0x190ee6*_0x190ee6*_0x190ee6+0x1;case _0x42e023(0x36f):return _0x42dd55<0.5?0x4*_0x42dd55*_0x42dd55*_0x42dd55:(_0x42dd55-0x1)*(0x2*_0x42dd55-0x2)*(0x2*_0x42dd55-0x2)+0x1;case _0x42e023(0x70d):return _0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55;case _0x42e023(0x5bc):var _0x190ee6=_0x42dd55-0x1;return 0x1-_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6;case _0x42e023(0x10f):var _0x190ee6=_0x42dd55-0x1;return _0x42dd55<0.5?0x8*_0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55:0x1-0x8*_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6;case _0x42e023(0x801):return _0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55;case _0x42e023(0x484):var _0x190ee6=_0x42dd55-0x1;return 0x1+_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6;case _0x42e023(0x22c):var _0x190ee6=_0x42dd55-0x1;return _0x42dd55<0.5?0x10*_0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55*_0x42dd55:0x1+0x10*_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6*_0x190ee6;case _0x42e023(0x456):if(_0x42dd55===0x0)return 0x0;return Math[_0x42e023(0x190)](0x2,0xa*(_0x42dd55-0x1));case _0x42e023(0x837):if(_0x42dd55===0x1)return 0x1;return-Math['pow'](0x2,-0xa*_0x42dd55)+0x1;case _0x42e023(0x34e):if(_0x42dd55===0x0||_0x42dd55===0x1){if(_0x42e023(0x32c)===_0x42e023(0x32c))return _0x42dd55;else{let _0x42b846=0x0;return _0x4466e9[_0x42e023(0x8ef)]()?_0x42b846=this[_0x42e023(0x1c4)]():_0x42b846=_0x30f593[_0x42e023(0x68b)][_0x42e023(0x411)]['call'](this),this[_0x42e023(0x349)]()&&this[_0x42e023(0x8b5)]()!==_0x42e023(0x32e)&&(_0x42b846-=_0xae8ee[_0x42e023(0x61d)]['lineHeight']()),_0x42b846;}}var _0x5920c4=_0x42dd55*0x2,_0x211114=_0x5920c4-0x1;if(_0x5920c4<0x1){if(_0x42e023(0x2f8)!==_0x42e023(0x2f8))this[_0x42e023(0x5e2)]=_0x4d89b3[_0x42e023(0x68b)]['Settings'][_0x42e023(0x2c7)]['DigitGroupingStandardText'],this['_digitGroupingEx']=_0x2a0221[_0x42e023(0x68b)][_0x42e023(0x1dc)][_0x42e023(0x2c7)]['DigitGroupingExText'];else return 0.5*Math['pow'](0x2,0xa*_0x211114);}return 0.5*(-Math['pow'](0x2,-0xa*_0x211114)+0x2);case _0x42e023(0x7c6):var _0x5920c4=_0x42dd55/0x1;return-0x1*(Math[_0x42e023(0x8ae)](0x1-_0x5920c4*_0x42dd55)-0x1);case _0x42e023(0x89e):var _0x190ee6=_0x42dd55-0x1;return Math[_0x42e023(0x8ae)](0x1-_0x190ee6*_0x190ee6);case _0x42e023(0x707):var _0x5920c4=_0x42dd55*0x2,_0x211114=_0x5920c4-0x2;if(_0x5920c4<0x1)return-0.5*(Math[_0x42e023(0x8ae)](0x1-_0x5920c4*_0x5920c4)-0x1);return 0.5*(Math[_0x42e023(0x8ae)](0x1-_0x211114*_0x211114)+0x1);case'INBACK':return _0x42dd55*_0x42dd55*((_0x256385+0x1)*_0x42dd55-_0x256385);case _0x42e023(0x756):var _0x5920c4=_0x42dd55/0x1-0x1;return _0x5920c4*_0x5920c4*((_0x256385+0x1)*_0x5920c4+_0x256385)+0x1;break;case _0x42e023(0x231):var _0x5920c4=_0x42dd55*0x2,_0x42cdc7=_0x5920c4-0x2,_0x1c1f30=_0x256385*1.525;if(_0x5920c4<0x1)return 0.5*_0x5920c4*_0x5920c4*((_0x1c1f30+0x1)*_0x5920c4-_0x1c1f30);return 0.5*(_0x42cdc7*_0x42cdc7*((_0x1c1f30+0x1)*_0x42cdc7+_0x1c1f30)+0x2);case _0x42e023(0x813):if(_0x42dd55===0x0||_0x42dd55===0x1)return _0x42dd55;var _0x5920c4=_0x42dd55/0x1,_0x211114=_0x5920c4-0x1,_0x9a8c48=0x1-_0x1ae7d9,_0x1c1f30=_0x9a8c48/(0x2*Math['PI'])*Math[_0x42e023(0x5ce)](0x1);return-(Math['pow'](0x2,0xa*_0x211114)*Math[_0x42e023(0x747)]((_0x211114-_0x1c1f30)*(0x2*Math['PI'])/_0x9a8c48));case _0x42e023(0x1a9):var _0x9a8c48=0x1-_0x1ae7d9,_0x5920c4=_0x42dd55*0x2;if(_0x42dd55===0x0||_0x42dd55===0x1)return _0x42dd55;var _0x1c1f30=_0x9a8c48/(0x2*Math['PI'])*Math['asin'](0x1);return Math[_0x42e023(0x190)](0x2,-0xa*_0x5920c4)*Math[_0x42e023(0x747)]((_0x5920c4-_0x1c1f30)*(0x2*Math['PI'])/_0x9a8c48)+0x1;case _0x42e023(0x489):var _0x9a8c48=0x1-_0x1ae7d9;if(_0x42dd55===0x0||_0x42dd55===0x1)return _0x42dd55;var _0x5920c4=_0x42dd55*0x2,_0x211114=_0x5920c4-0x1,_0x1c1f30=_0x9a8c48/(0x2*Math['PI'])*Math[_0x42e023(0x5ce)](0x1);if(_0x5920c4<0x1){if(_0x42e023(0x34d)!==_0x42e023(0x691))return-0.5*(Math[_0x42e023(0x190)](0x2,0xa*_0x211114)*Math[_0x42e023(0x747)]((_0x211114-_0x1c1f30)*(0x2*Math['PI'])/_0x9a8c48));else{if(!_0x32339c[_0x42e023(0x26c)]())return;_0x1ea2c0[_0x42e023(0x259)](_0x2ed13a,_0x473191);const _0x109118=_0xf856fe[_0x42e023(0x33e)];_0x270202[_0x42e023(0x584)][_0x42e023(0x5c3)](_0x109118);}}return Math[_0x42e023(0x190)](0x2,-0xa*_0x211114)*Math['sin']((_0x211114-_0x1c1f30)*(0x2*Math['PI'])/_0x9a8c48)*0.5+0x1;case _0x42e023(0x6be):var _0x5920c4=_0x42dd55/0x1;if(_0x5920c4<0x1/2.75)return 7.5625*_0x5920c4*_0x5920c4;else{if(_0x5920c4<0x2/2.75){if(_0x42e023(0x424)!==_0x42e023(0x7dc)){var _0x42cdc7=_0x5920c4-1.5/2.75;return 7.5625*_0x42cdc7*_0x42cdc7+0.75;}else return _0x17a8b8[_0x42e023(0x68b)]['Settings'][_0x42e023(0x452)][_0x42e023(0x1fb)];}else{if(_0x5920c4<2.5/2.75){if(_0x42e023(0x68e)!=='lxbZx'){var _0x42cdc7=_0x5920c4-2.25/2.75;return 7.5625*_0x42cdc7*_0x42cdc7+0.9375;}else this['_numberWindow'][_0x42e023(0x71c)](_0x3791f4['layoutSettings']['NumberBgType']);}else{var _0x42cdc7=_0x5920c4-2.625/2.75;return 7.5625*_0x42cdc7*_0x42cdc7+0.984375;}}}case _0x42e023(0x24d):var _0x262f94=0x1-VisuMZ[_0x42e023(0x638)](0x1-_0x42dd55,_0x42e023(0x852));return _0x262f94;case _0x42e023(0x55c):if(_0x42dd55<0.5){if('NmwAi'!==_0x42e023(0x886))var _0x262f94=VisuMZ['ApplyEasing'](_0x42dd55*0x2,_0x42e023(0x82d))*0.5;else _0xc9c1cd+=_0x3a101c(_0x319793['$1']),_0x1ed6cc+=_0x48192e(_0x5c33d4['$2']);}else var _0x262f94=VisuMZ[_0x42e023(0x638)](_0x42dd55*0x2-0x1,_0x42e023(0x852))*0.5+0.5;return _0x262f94;default:return _0x42dd55;}},VisuMZ[_0x9eb9ae(0x398)]=function(_0x19cafe){const _0x2b88d5=_0x9eb9ae;_0x19cafe=String(_0x19cafe)[_0x2b88d5(0x88e)]();const _0x44ece3=VisuMZ[_0x2b88d5(0x68b)]['Settings']['Param'];if(_0x19cafe===_0x2b88d5(0x505))return _0x44ece3[_0x2b88d5(0x25f)];if(_0x19cafe==='MAXMP')return _0x44ece3[_0x2b88d5(0x4c5)];if(_0x19cafe===_0x2b88d5(0x6c0))return _0x44ece3[_0x2b88d5(0x2d5)];if(_0x19cafe===_0x2b88d5(0x4fd))return _0x44ece3['IconParam3'];if(_0x19cafe===_0x2b88d5(0x25c))return _0x44ece3[_0x2b88d5(0x6c1)];if(_0x19cafe==='MDF')return _0x44ece3[_0x2b88d5(0x434)];if(_0x19cafe===_0x2b88d5(0x621))return _0x44ece3['IconParam6'];if(_0x19cafe===_0x2b88d5(0x78f))return _0x44ece3[_0x2b88d5(0x605)];if(_0x19cafe===_0x2b88d5(0x879))return _0x44ece3[_0x2b88d5(0x1bc)];if(_0x19cafe===_0x2b88d5(0x1dd))return _0x44ece3[_0x2b88d5(0x279)];if(_0x19cafe===_0x2b88d5(0x48c))return _0x44ece3[_0x2b88d5(0x367)];if(_0x19cafe===_0x2b88d5(0x200))return _0x44ece3[_0x2b88d5(0x3f7)];if(_0x19cafe===_0x2b88d5(0x897))return _0x44ece3[_0x2b88d5(0x83c)];if(_0x19cafe===_0x2b88d5(0x727))return _0x44ece3[_0x2b88d5(0x6fc)];if(_0x19cafe===_0x2b88d5(0x201))return _0x44ece3['IconXParam6'];if(_0x19cafe===_0x2b88d5(0x4bf))return _0x44ece3[_0x2b88d5(0x11e)];if(_0x19cafe==='MRG')return _0x44ece3[_0x2b88d5(0x25e)];if(_0x19cafe==='TRG')return _0x44ece3[_0x2b88d5(0x890)];if(_0x19cafe===_0x2b88d5(0x4aa))return _0x44ece3['IconSParam0'];if(_0x19cafe==='GRD')return _0x44ece3[_0x2b88d5(0x3fd)];if(_0x19cafe==='REC')return _0x44ece3[_0x2b88d5(0x514)];if(_0x19cafe==='PHA')return _0x44ece3[_0x2b88d5(0x2f6)];if(_0x19cafe===_0x2b88d5(0x1ac))return _0x44ece3[_0x2b88d5(0x3ec)];if(_0x19cafe==='TCR')return _0x44ece3[_0x2b88d5(0x66d)];if(_0x19cafe==='PDR')return _0x44ece3[_0x2b88d5(0x87c)];if(_0x19cafe===_0x2b88d5(0x2b9))return _0x44ece3[_0x2b88d5(0x582)];if(_0x19cafe===_0x2b88d5(0x1b7))return _0x44ece3[_0x2b88d5(0x4ce)];if(_0x19cafe===_0x2b88d5(0x902))return _0x44ece3[_0x2b88d5(0x2b0)];if(VisuMZ[_0x2b88d5(0x68b)][_0x2b88d5(0x8de)][_0x19cafe]){if(_0x2b88d5(0x6a1)!==_0x2b88d5(0x6a1)){if(_0x5b72a3 instanceof _0x4c008a)this['catchNormalError'](_0x570485);else _0x15d86b instanceof _0x31450d&&_0x178533[0x0]===_0x2b88d5(0x4c0)?this[_0x2b88d5(0x6d4)](_0x2b982f):this[_0x2b88d5(0x14f)](_0x417290);this[_0x2b88d5(0x392)]();}else return VisuMZ[_0x2b88d5(0x68b)]['CustomParamIcons'][_0x19cafe]||0x0;}return 0x0;},VisuMZ[_0x9eb9ae(0x46d)]=function(_0x441dc2,_0x117695,_0x26da09){const _0xcd71af=_0x9eb9ae;if(_0x26da09===undefined&&_0x441dc2%0x1===0x0)return _0x441dc2;if(_0x26da09!==undefined&&[_0xcd71af(0x505),_0xcd71af(0x7c8),'ATK','DEF',_0xcd71af(0x25c),'MDF','AGI',_0xcd71af(0x78f)][_0xcd71af(0x111)](String(_0x26da09)[_0xcd71af(0x88e)]()[_0xcd71af(0x81c)]()))return _0x441dc2;_0x117695=_0x117695||0x0;if(VisuMZ[_0xcd71af(0x68b)][_0xcd71af(0x5aa)][_0x26da09])return VisuMZ[_0xcd71af(0x68b)][_0xcd71af(0x2a8)][_0x26da09]===_0xcd71af(0x30b)?_0x441dc2:String((_0x441dc2*0x64)[_0xcd71af(0x666)](_0x117695))+'%';return String((_0x441dc2*0x64)[_0xcd71af(0x666)](_0x117695))+'%';},VisuMZ[_0x9eb9ae(0x29c)]=function(_0x9adbba){const _0x4ebfff=_0x9eb9ae;_0x9adbba=String(_0x9adbba);if(!_0x9adbba)return _0x9adbba;if(typeof _0x9adbba!==_0x4ebfff(0x1d2))return _0x9adbba;const _0x309e0f=VisuMZ['CoreEngine'][_0x4ebfff(0x1dc)][_0x4ebfff(0x2c7)]['DigitGroupingLocale']||'en-US',_0x25da73={'maximumFractionDigits':0x6};_0x9adbba=_0x9adbba[_0x4ebfff(0x8da)](/\[(.*?)\]/g,(_0xae7669,_0x30d858)=>{return VisuMZ['PreserveNumbers'](_0x30d858,'[',']');}),_0x9adbba=_0x9adbba[_0x4ebfff(0x8da)](/<(.*?)>/g,(_0x1f2abd,_0x1912a0)=>{const _0x4d4c77=_0x4ebfff;return VisuMZ[_0x4d4c77(0x7a5)](_0x1912a0,'<','>');}),_0x9adbba=_0x9adbba[_0x4ebfff(0x8da)](/\{\{(.*?)\}\}/g,(_0x577a81,_0x4f7090)=>{const _0x2d1efd=_0x4ebfff;return VisuMZ[_0x2d1efd(0x7a5)](_0x4f7090,'','');}),_0x9adbba=_0x9adbba[_0x4ebfff(0x8da)](/(\d+\.?\d*)/g,(_0x1ce050,_0x51279f)=>{const _0x16e6f9=_0x4ebfff;if('lWoKx'===_0x16e6f9(0x2bd)){let _0xde0489=_0x51279f;if(_0xde0489[0x0]==='0')return _0xde0489;if(_0xde0489[_0xde0489[_0x16e6f9(0x631)]-0x1]==='.')return Number(_0xde0489)['toLocaleString'](_0x309e0f,_0x25da73)+'.';else{if(_0xde0489[_0xde0489[_0x16e6f9(0x631)]-0x1]===','){if(_0x16e6f9(0x900)===_0x16e6f9(0x900))return Number(_0xde0489)[_0x16e6f9(0x3ba)](_0x309e0f,_0x25da73)+',';else{this['createTitleButtons']();const _0x2515cd=_0x2f41b0[_0x16e6f9(0x365)][_0x16e6f9(0x100)],_0x4d6ae7=this['commandWindowRect']();this[_0x16e6f9(0x218)]=new _0x58c9b1(_0x4d6ae7),this[_0x16e6f9(0x218)][_0x16e6f9(0x71c)](_0x2515cd);const _0x54006f=this[_0x16e6f9(0x400)]();this[_0x16e6f9(0x218)][_0x16e6f9(0x8d9)](_0x54006f['x'],_0x54006f['y'],_0x54006f['width'],_0x54006f[_0x16e6f9(0x71d)]),this['addWindow'](this[_0x16e6f9(0x218)]);}}else return Number(_0xde0489)[_0x16e6f9(0x3ba)](_0x309e0f,_0x25da73);}}else return this[_0x16e6f9(0x264)]();});let _0x3e5bd7=0x3;while(_0x3e5bd7--){_0x9adbba=VisuMZ[_0x4ebfff(0x90d)](_0x9adbba);}return _0x9adbba;},VisuMZ[_0x9eb9ae(0x7a5)]=function(_0x43000f,_0x1b62a9,_0x472c9c){const _0x5dadb7=_0x9eb9ae;return _0x43000f=_0x43000f[_0x5dadb7(0x8da)](/(\d)/gi,(_0x129b0f,_0x21f57d)=>_0x5dadb7(0x8c0)[_0x5dadb7(0x468)](Number(_0x21f57d))),'%2%1%3'[_0x5dadb7(0x468)](_0x43000f,_0x1b62a9,_0x472c9c);},VisuMZ[_0x9eb9ae(0x90d)]=function(_0x666206){const _0x31f008=_0x9eb9ae;return _0x666206=_0x666206[_0x31f008(0x8da)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x1b28c3,_0x49b967)=>Number(parseInt(_0x49b967))),_0x666206;},VisuMZ[_0x9eb9ae(0x86d)]=function(_0x56b6e9){const _0x289bbb=_0x9eb9ae;SoundManager[_0x289bbb(0x289)]();if(!Utils[_0x289bbb(0x3ee)]()){const _0x56d932=window[_0x289bbb(0x1e6)](_0x56b6e9,_0x289bbb(0x5c2));}else{if(_0x289bbb(0x8fe)!==_0x289bbb(0x8fe))return _0x3fda43[_0x289bbb(0x68b)][_0x289bbb(0x2c6)]['call'](this);else{const _0x5d55a4=process['platform']==_0x289bbb(0x5b0)?_0x289bbb(0x1e6):process[_0x289bbb(0x84a)]==_0x289bbb(0x8d2)?_0x289bbb(0x406):'xdg-open';require(_0x289bbb(0x65e))[_0x289bbb(0x53a)](_0x5d55a4+'\x20'+_0x56b6e9);}}},Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5f1)]=function(){const _0x833a53=_0x9eb9ae;return this[_0x833a53(0x7a2)];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x4d0)]=Game_Picture[_0x9eb9ae(0x61d)]['initBasic'],Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x72f)]=function(){const _0x2e6a4f=_0x9eb9ae;VisuMZ[_0x2e6a4f(0x68b)][_0x2e6a4f(0x4d0)][_0x2e6a4f(0x330)](this),this[_0x2e6a4f(0x7a2)]={'x':0x0,'y':0x0},this[_0x2e6a4f(0x76e)]={'x':0x0,'y':0x0};},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x29d)]=Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x553)],Game_Picture['prototype'][_0x9eb9ae(0x553)]=function(){const _0x3f3816=_0x9eb9ae;this[_0x3f3816(0x538)]();const _0x9e576d=this[_0x3f3816(0x22d)];VisuMZ[_0x3f3816(0x68b)][_0x3f3816(0x29d)][_0x3f3816(0x330)](this),_0x9e576d>0x0&&this[_0x3f3816(0x22d)]<=0x0&&(this['_x']=this[_0x3f3816(0x8fd)],this['_y']=this[_0x3f3816(0x6e8)],this['_scaleX']=this['_targetScaleX'],this[_0x3f3816(0x240)]=this[_0x3f3816(0x16a)],this[_0x3f3816(0x6fd)]=this['_targetOpacity'],this[_0x3f3816(0x7a2)]&&(this[_0x3f3816(0x7a2)]['x']=this[_0x3f3816(0x76e)]['x'],this[_0x3f3816(0x7a2)]['y']=this['_targetAnchor']['y']));},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x72b)]=Game_Picture[_0x9eb9ae(0x61d)]['show'],Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x237)]=function(_0x37fe60,_0x16745b,_0x463252,_0x87a5b1,_0x2021a3,_0x154328,_0x3630a4,_0x21780e){const _0x92b687=_0x9eb9ae;VisuMZ['CoreEngine'][_0x92b687(0x72b)][_0x92b687(0x330)](this,_0x37fe60,_0x16745b,_0x463252,_0x87a5b1,_0x2021a3,_0x154328,_0x3630a4,_0x21780e),this[_0x92b687(0x690)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x16745b]||{'x':0x0,'y':0x0});},VisuMZ[_0x9eb9ae(0x68b)]['Game_Picture_move']=Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8d9)],Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8d9)]=function(_0x5c1e12,_0x1c2bdb,_0xf6f66b,_0x428689,_0x4146ab,_0xb76477,_0x40787b,_0x475468,_0xd83dd5){const _0x224078=_0x9eb9ae;VisuMZ[_0x224078(0x68b)][_0x224078(0x703)]['call'](this,_0x5c1e12,_0x1c2bdb,_0xf6f66b,_0x428689,_0x4146ab,_0xb76477,_0x40787b,_0x475468,_0xd83dd5),this[_0x224078(0x4b6)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5c1e12]||{'x':0x0,'y':0x0});},Game_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x538)]=function(){const _0xa820c8=_0x9eb9ae;this[_0xa820c8(0x22d)]>0x0&&(this['_anchor']['x']=this[_0xa820c8(0x65c)](this['_anchor']['x'],this[_0xa820c8(0x76e)]['x']),this[_0xa820c8(0x7a2)]['y']=this[_0xa820c8(0x65c)](this[_0xa820c8(0x7a2)]['y'],this[_0xa820c8(0x76e)]['y']));},Game_Picture[_0x9eb9ae(0x61d)]['setAnchor']=function(_0x2a1cfa){const _0x2a22c9=_0x9eb9ae;this['_anchor']=_0x2a1cfa,this[_0x2a22c9(0x76e)]=JsonEx['makeDeepCopy'](this['_anchor']);},Game_Picture['prototype'][_0x9eb9ae(0x4b6)]=function(_0x2750c5){const _0x4a5bd7=_0x9eb9ae;this[_0x4a5bd7(0x76e)]=_0x2750c5;},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x5fe)]=Sprite_Picture[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8f1)],Sprite_Picture['prototype']['updateOrigin']=function(){const _0x4115ae=_0x9eb9ae,_0x4a2d5c=this['picture']();!_0x4a2d5c[_0x4115ae(0x5f1)]()?VisuMZ[_0x4115ae(0x68b)][_0x4115ae(0x5fe)][_0x4115ae(0x330)](this):(this[_0x4115ae(0x5f1)]['x']=_0x4a2d5c['anchor']()['x'],this[_0x4115ae(0x5f1)]['y']=_0x4a2d5c[_0x4115ae(0x5f1)]()['y']);},Game_Action['prototype'][_0x9eb9ae(0x292)]=function(_0x290466){const _0x21c3f1=_0x9eb9ae;if(_0x290466){const _0x1be9f7=_0x290466['skillId'];if(_0x1be9f7===0x1&&this[_0x21c3f1(0x2ae)]()['attackSkillId']()!==0x1){if('WFNgp'!==_0x21c3f1(0x903)){const _0x4683e2='Map%1.json'[_0x21c3f1(0x468)](_0x2e74cf['padZero'](0x3)),_0xf3de24=new _0x3833a6(),_0x10703b=_0x21c3f1(0xfb)+_0x4683e2;_0xf3de24[_0x21c3f1(0x1e6)](_0x21c3f1(0x7dd),_0x10703b),_0xf3de24[_0x21c3f1(0x499)]('application/json'),_0xf3de24['onload']=()=>this[_0x21c3f1(0x1a3)](_0xf3de24,_0x5150eb,_0x4683e2,_0x10703b),_0xf3de24[_0x21c3f1(0x396)]=()=>_0x2c5af1[_0x21c3f1(0x613)]('$dataMap',_0x4683e2,_0x10703b),_0xf3de24[_0x21c3f1(0x10e)]();}else this[_0x21c3f1(0x47a)]();}else _0x1be9f7===0x2&&this[_0x21c3f1(0x2ae)]()[_0x21c3f1(0x4a6)]()!==0x2?_0x21c3f1(0x5ea)!==_0x21c3f1(0x5ea)?(this[_0x21c3f1(0x46f)]&&(_0x378692=_0x54aa74[_0x21c3f1(0x80a)](_0x4ba9fb),_0x1216a2['se']&&(_0x55838b['se'][_0x21c3f1(0x35e)]=0x0)),_0x4e6425[_0x21c3f1(0x68b)]['Sprite_AnimationMV_processTimingData'][_0x21c3f1(0x330)](this,_0x229943)):this[_0x21c3f1(0x74f)]():this[_0x21c3f1(0x4c3)](_0x1be9f7);}else this[_0x21c3f1(0x889)]();},Game_Actor[_0x9eb9ae(0x61d)]['usableSkills']=function(){const _0x3217fe=_0x9eb9ae;return this[_0x3217fe(0x6f9)]()[_0x3217fe(0x641)](_0x2bd4a8=>this['canUse'](_0x2bd4a8)&&this[_0x3217fe(0x101)]()['includes'](_0x2bd4a8['stypeId']));},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x436)]=function(){const _0x1d53de=_0x9eb9ae;this[_0x1d53de(0x446)]=new Sprite(),this[_0x1d53de(0x446)]['bitmap']=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x1d53de(0x332)](this[_0x1d53de(0x446)]);},Window_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x8a0)]=function(){const _0x352231=_0x9eb9ae;if(this[_0x352231(0x446)]){const _0x338287=this[_0x352231(0x446)][_0x352231(0x7c9)],_0x30cd83=this[_0x352231(0x792)],_0x36db50=this[_0x352231(0x71d)],_0x2a704d=this[_0x352231(0x877)],_0x56d2e2=ColorManager[_0x352231(0x31b)](),_0x32293=ColorManager['dimColor2']();_0x338287[_0x352231(0x52b)](_0x30cd83,_0x36db50),_0x338287[_0x352231(0x134)](0x0,0x0,_0x30cd83,_0x2a704d,_0x32293,_0x56d2e2,!![]),_0x338287[_0x352231(0x6bd)](0x0,_0x2a704d,_0x30cd83,_0x36db50-_0x2a704d*0x2,_0x56d2e2),_0x338287[_0x352231(0x134)](0x0,_0x36db50-_0x2a704d,_0x30cd83,_0x2a704d,_0x56d2e2,_0x32293,!![]),this[_0x352231(0x446)][_0x352231(0x8ab)](0x0,0x0,_0x30cd83,_0x36db50);}},Game_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1f9)]=function(){const _0x51a1a0=_0x9eb9ae;for(let _0x51ee64=0x0;_0x51ee64<this[_0x51a1a0(0x20f)]();_0x51ee64++){if(_0x51a1a0(0x72c)!==_0x51a1a0(0x72c))this[_0x51a1a0(0x245)]=0xff;else{const _0x7b38fc=this[_0x51a1a0(0x454)]();let _0x17153a=Number[_0x51a1a0(0x622)];this[_0x51a1a0(0x24a)](_0x51ee64,_0x7b38fc[0x0]);for(const _0x164fc1 of _0x7b38fc){if(_0x51a1a0(0x3f6)===_0x51a1a0(0x4ef)){const _0x2d62e0=this[_0x51a1a0(0x343)],_0x3ee164=this[_0x51a1a0(0x69a)],_0x5945fe=0x18,_0x4dcc5f=_0x5945fe/0x2,_0x5d8bd0=0x60+_0x5945fe,_0x4a929e=0x0+_0x5945fe;this['_downArrowSprite']['bitmap']=this[_0x51a1a0(0x130)],this['_downArrowSprite'][_0x51a1a0(0x5f1)]['x']=0.5,this[_0x51a1a0(0x2dd)]['anchor']['y']=0.5,this[_0x51a1a0(0x2dd)][_0x51a1a0(0x8ab)](_0x5d8bd0+_0x4dcc5f,_0x4a929e+_0x4dcc5f+_0x5945fe,_0x5945fe,_0x4dcc5f),this[_0x51a1a0(0x2dd)][_0x51a1a0(0x8d9)](_0x2115e6[_0x51a1a0(0x74b)](_0x2d62e0/0x2),_0x57eb6f['round'](_0x3ee164-_0x4dcc5f)),this[_0x51a1a0(0x8cf)][_0x51a1a0(0x7c9)]=this[_0x51a1a0(0x130)],this[_0x51a1a0(0x8cf)][_0x51a1a0(0x5f1)]['x']=0.5,this['_upArrowSprite'][_0x51a1a0(0x5f1)]['y']=0.5,this['_upArrowSprite'][_0x51a1a0(0x8ab)](_0x5d8bd0+_0x4dcc5f,_0x4a929e,_0x5945fe,_0x4dcc5f),this['_upArrowSprite']['move'](_0x12a620[_0x51a1a0(0x74b)](_0x2d62e0/0x2),_0x27e407[_0x51a1a0(0x74b)](_0x4dcc5f));}else{const _0x26e979=_0x164fc1['evaluate']();_0x26e979>_0x17153a&&(_0x17153a=_0x26e979,this[_0x51a1a0(0x24a)](_0x51ee64,_0x164fc1));}}}}this[_0x51a1a0(0x7b3)]('waiting');},Window_BattleItem[_0x9eb9ae(0x61d)][_0x9eb9ae(0x22f)]=function(_0x4c2a9c){const _0x19400d=_0x9eb9ae;return BattleManager[_0x19400d(0x866)]()?BattleManager[_0x19400d(0x866)]()[_0x19400d(0x901)](_0x4c2a9c):Window_ItemList[_0x19400d(0x61d)][_0x19400d(0x22f)][_0x19400d(0x330)](this,_0x4c2a9c);},VisuMZ['CoreEngine'][_0x9eb9ae(0x90b)]=Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)],Scene_Map[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)]=function(){const _0x489fe4=_0x9eb9ae;VisuMZ[_0x489fe4(0x68b)]['Scene_Map_createSpritesetFix'][_0x489fe4(0x330)](this);const _0x5b4922=this[_0x489fe4(0x7e4)]['_timerSprite'];if(_0x5b4922)this['addChild'](_0x5b4922);},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x667)]=Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)],Scene_Battle[_0x9eb9ae(0x61d)][_0x9eb9ae(0x7c5)]=function(){const _0x59b64f=_0x9eb9ae;VisuMZ['CoreEngine']['Scene_Battle_createSpritesetFix'][_0x59b64f(0x330)](this);const _0x6fc22b=this[_0x59b64f(0x7e4)]['_timerSprite'];if(_0x6fc22b)this['addChild'](_0x6fc22b);},Sprite_Actor[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1ed)]=function(){const _0x4a684c=_0x9eb9ae;Sprite_Battler['prototype'][_0x4a684c(0x1ed)][_0x4a684c(0x330)](this),this[_0x4a684c(0x3ca)]();if(this[_0x4a684c(0x3f4)])this['updateMotion']();else this[_0x4a684c(0x337)]!==''&&(_0x4a684c(0x917)!==_0x4a684c(0x917)?this[_0x4a684c(0x233)]():this[_0x4a684c(0x337)]='');},Window[_0x9eb9ae(0x61d)][_0x9eb9ae(0x168)]=function(){const _0x56250f=_0x9eb9ae,_0x2d3d2e=this[_0x56250f(0x343)],_0x197e7e=this['_height'],_0x128de8=0x18,_0x452d01=_0x128de8/0x2,_0x2cd6fa=0x60+_0x128de8,_0xdca60e=0x0+_0x128de8;this[_0x56250f(0x2dd)][_0x56250f(0x7c9)]=this['_windowskin'],this['_downArrowSprite'][_0x56250f(0x5f1)]['x']=0.5,this[_0x56250f(0x2dd)]['anchor']['y']=0.5,this[_0x56250f(0x2dd)][_0x56250f(0x8ab)](_0x2cd6fa+_0x452d01,_0xdca60e+_0x452d01+_0x128de8,_0x128de8,_0x452d01),this[_0x56250f(0x2dd)][_0x56250f(0x8d9)](Math[_0x56250f(0x74b)](_0x2d3d2e/0x2),Math[_0x56250f(0x74b)](_0x197e7e-_0x452d01)),this[_0x56250f(0x8cf)][_0x56250f(0x7c9)]=this[_0x56250f(0x130)],this['_upArrowSprite'][_0x56250f(0x5f1)]['x']=0.5,this[_0x56250f(0x8cf)][_0x56250f(0x5f1)]['y']=0.5,this[_0x56250f(0x8cf)][_0x56250f(0x8ab)](_0x2cd6fa+_0x452d01,_0xdca60e,_0x128de8,_0x452d01),this[_0x56250f(0x8cf)][_0x56250f(0x8d9)](Math[_0x56250f(0x74b)](_0x2d3d2e/0x2),Math['round'](_0x452d01));},Window[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1f0)]=function(){const _0x3c4167=_0x9eb9ae,_0x15c691=0x90,_0x309ad2=0x60,_0x193683=0x18;this[_0x3c4167(0x3aa)]['bitmap']=this[_0x3c4167(0x130)],this[_0x3c4167(0x3aa)][_0x3c4167(0x5f1)]['x']=0.5,this[_0x3c4167(0x3aa)][_0x3c4167(0x5f1)]['y']=0x1,this[_0x3c4167(0x3aa)][_0x3c4167(0x8d9)](Math['round'](this['_width']/0x2),this[_0x3c4167(0x69a)]),this[_0x3c4167(0x3aa)]['setFrame'](_0x15c691,_0x309ad2,_0x193683,_0x193683),this['_pauseSignSprite'][_0x3c4167(0x86a)]=0xff;},Window[_0x9eb9ae(0x61d)][_0x9eb9ae(0x242)]=function(){const _0x4ea21d=_0x9eb9ae,_0x190a94=this[_0x4ea21d(0x74d)][_0x4ea21d(0x4c1)][_0x4ea21d(0x724)](new Point(0x0,0x0)),_0x277236=this['_clientArea'][_0x4ea21d(0x440)];_0x277236['x']=_0x190a94['x']+this[_0x4ea21d(0x2b2)]['x'],_0x277236['y']=_0x190a94['y']+this[_0x4ea21d(0x2b2)]['y'],_0x277236[_0x4ea21d(0x792)]=Math[_0x4ea21d(0x23b)](this['innerWidth']*this[_0x4ea21d(0x6a4)]['x']),_0x277236['height']=Math[_0x4ea21d(0x23b)](this[_0x4ea21d(0x2e3)]*this[_0x4ea21d(0x6a4)]['y']);},Window[_0x9eb9ae(0x61d)][_0x9eb9ae(0x69c)]=function(){const _0x5d9903=_0x9eb9ae,_0x525f7c=this[_0x5d9903(0x227)],_0x2d6369=Math[_0x5d9903(0x713)](0x0,this[_0x5d9903(0x343)]-_0x525f7c*0x2),_0x4de030=Math[_0x5d9903(0x713)](0x0,this['_height']-_0x525f7c*0x2),_0x57f124=this['_backSprite'],_0x410a3f=_0x57f124['children'][0x0];_0x57f124['bitmap']=this[_0x5d9903(0x130)],_0x57f124[_0x5d9903(0x8ab)](0x0,0x0,0x60,0x60),_0x57f124[_0x5d9903(0x8d9)](_0x525f7c,_0x525f7c),_0x57f124[_0x5d9903(0x6a4)]['x']=_0x2d6369/0x60,_0x57f124[_0x5d9903(0x6a4)]['y']=_0x4de030/0x60,_0x410a3f['bitmap']=this['_windowskin'],_0x410a3f[_0x5d9903(0x8ab)](0x0,0x60,0x60,0x60),_0x410a3f[_0x5d9903(0x8d9)](0x0,0x0,_0x2d6369,_0x4de030),_0x410a3f[_0x5d9903(0x6a4)]['x']=0x1/_0x57f124['scale']['x'],_0x410a3f[_0x5d9903(0x6a4)]['y']=0x1/_0x57f124['scale']['y'],_0x57f124[_0x5d9903(0x32f)](this[_0x5d9903(0x639)]);},Game_Temp['prototype'][_0x9eb9ae(0x88c)]=function(){const _0xee324=_0x9eb9ae;this[_0xee324(0x817)]=[],this['_fauxAnimationQueue']=[],this[_0xee324(0x29f)]=[],this[_0xee324(0x462)]=[];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x35f)]=Scene_Base[_0x9eb9ae(0x61d)][_0x9eb9ae(0x1cc)],Scene_Base[_0x9eb9ae(0x61d)]['terminate']=function(){const _0x3ce14f=_0x9eb9ae;if($gameTemp)$gameTemp[_0x3ce14f(0x88c)]();VisuMZ[_0x3ce14f(0x68b)][_0x3ce14f(0x35f)][_0x3ce14f(0x330)](this);},Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x449)]=function(_0xcf2d13){const _0x538a03=_0x9eb9ae,_0x19a57e=this[_0x538a03(0x55f)];_0x19a57e[_0x538a03(0x1f3)](),_0x19a57e[_0x538a03(0x150)]=this[_0x538a03(0x918)]();const _0x3dfcf3=_0x19a57e[_0x538a03(0x383)](_0xcf2d13)[_0x538a03(0x792)];return _0x19a57e[_0x538a03(0x67f)](),_0x3dfcf3;},Window_Message[_0x9eb9ae(0x61d)]['textWidth']=function(_0x25872d){const _0x2b3c0e=_0x9eb9ae;if(this['useFontWidthFix']())return this['contents'][_0x2b3c0e(0x449)](_0x25872d);else{if('ZJZaA'!==_0x2b3c0e(0x262))return Window_Base['prototype'][_0x2b3c0e(0x80b)][_0x2b3c0e(0x330)](this,_0x25872d);else this[_0x2b3c0e(0x218)][_0x2b3c0e(0x71c)](_0x158bc6[_0x2b3c0e(0x2d8)][_0x2b3c0e(0x179)]);}},Window_Message[_0x9eb9ae(0x61d)][_0x9eb9ae(0x62e)]=function(){const _0x8c1eeb=_0x9eb9ae;return VisuMZ[_0x8c1eeb(0x68b)][_0x8c1eeb(0x1dc)][_0x8c1eeb(0x2c7)]['FontWidthFix']??!![];},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x8a5)]=Game_Action['prototype']['numRepeats'],Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x5e4)]=function(){const _0x537630=_0x9eb9ae;if(this[_0x537630(0x6dc)]()){if(_0x537630(0x3fc)===_0x537630(0x3fc))return VisuMZ['CoreEngine']['Game_Action_numRepeats'][_0x537630(0x330)](this);else this[_0x537630(0x7ba)]();}else{if(_0x537630(0x4c2)===_0x537630(0x7de))!this[_0x537630(0x645)]&&(this[_0x537630(0x53e)]+=_0xf7e0a5[_0x537630(0x74b)]((_0x12b16e[_0x537630(0x71d)]-0x270)/0x2),this[_0x537630(0x53e)]-=_0x3da761[_0x537630(0x83f)]((_0x5d2e48['height']-_0x4f429b[_0x537630(0x18a)])/0x2),_0x522f1d[_0x537630(0x52d)]()?this[_0x537630(0x76d)]-=_0x53243e[_0x537630(0x83f)]((_0x461cb1['width']-_0xd3a0ed[_0x537630(0x57c)])/0x2):this[_0x537630(0x76d)]+=_0x517727[_0x537630(0x74b)]((_0x59e58e[_0x537630(0x57c)]-0x330)/0x2)),this[_0x537630(0x645)]=!![];else return 0x0;}},VisuMZ[_0x9eb9ae(0x68b)]['Game_Action_setAttack']=Game_Action['prototype'][_0x9eb9ae(0x47a)],Game_Action[_0x9eb9ae(0x61d)][_0x9eb9ae(0x47a)]=function(){const _0x1adf6b=_0x9eb9ae;if(this[_0x1adf6b(0x2ae)]()&&this[_0x1adf6b(0x2ae)]()[_0x1adf6b(0x43d)]()){if('jMcSM'==='jMcSM')VisuMZ[_0x1adf6b(0x68b)][_0x1adf6b(0x847)][_0x1adf6b(0x330)](this);else{if(this[_0x1adf6b(0x5db)]())this[_0x1adf6b(0x75f)](_0x28f10a,_0x436c77,_0x21b17c);_0x544bc0[_0x1adf6b(0x68b)]['Window_StatusBase_drawActorLevel']['call'](this,_0xad327e,_0x56d1da,_0x4b90d4);}}else'mgVXT'==='rkNXi'?_0x2eadbc+=_0xa8327b(_0x445c32):this[_0x1adf6b(0x889)]();},Sprite_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x19f)]=function(){return 0x24;},Sprite_Name[_0x9eb9ae(0x61d)][_0x9eb9ae(0x57e)]=function(){const _0x4e3474=_0x9eb9ae,_0x415583=this[_0x4e3474(0x1e8)](),_0x7ca6fa=this['bitmapWidth'](),_0x331919=this[_0x4e3474(0x19f)]();this[_0x4e3474(0x490)](),this[_0x4e3474(0x7c9)]['clear'](),this[_0x4e3474(0x7c9)]['drawTextTopAligned'](_0x415583,0x0,0x0,_0x7ca6fa,_0x331919,'left');},Bitmap[_0x9eb9ae(0x61d)][_0x9eb9ae(0x2cd)]=function(_0x12da97,_0x1dd8c7,_0x6450d2,_0x32b883,_0x31af37,_0x367fca){const _0x294bed=_0x9eb9ae,_0x4a35cd=this[_0x294bed(0x55f)],_0x4b74a3=_0x4a35cd[_0x294bed(0x113)];_0x32b883=_0x32b883||0xffffffff;let _0x3e0e65=_0x1dd8c7,_0x590839=Math[_0x294bed(0x74b)](_0x6450d2+0x18/0x2+this[_0x294bed(0x521)]*0.35);_0x367fca===_0x294bed(0x7ce)&&(_0x3e0e65+=_0x32b883/0x2),_0x367fca===_0x294bed(0x8ea)&&(_0x3e0e65+=_0x32b883),_0x4a35cd[_0x294bed(0x1f3)](),_0x4a35cd['font']=this[_0x294bed(0x918)](),_0x4a35cd[_0x294bed(0x172)]=_0x367fca,_0x4a35cd[_0x294bed(0x408)]=_0x294bed(0x8e6),_0x4a35cd[_0x294bed(0x113)]=0x1,this[_0x294bed(0x6d9)](_0x12da97,_0x3e0e65,_0x590839,_0x32b883),_0x4a35cd[_0x294bed(0x113)]=_0x4b74a3,this[_0x294bed(0x66b)](_0x12da97,_0x3e0e65,_0x590839,_0x32b883),_0x4a35cd[_0x294bed(0x67f)](),this[_0x294bed(0x72d)]['update']();},VisuMZ[_0x9eb9ae(0x68b)][_0x9eb9ae(0x7e0)]=BattleManager['checkSubstitute'],BattleManager[_0x9eb9ae(0x5a7)]=function(_0x4255c3){const _0x2db34e=_0x9eb9ae;if(this[_0x2db34e(0x86c)]['isForFriend']())return![];return VisuMZ[_0x2db34e(0x68b)]['BattleManager_checkSubstitute'][_0x2db34e(0x330)](this,_0x4255c3);};