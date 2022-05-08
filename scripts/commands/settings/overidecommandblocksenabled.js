import config from "../../data/config.js";
import { disabler, getPrefix, getScore } from "../../util.js";

function overrideCBEHelp(player, prefix, cmdsscore) {
    let commandStatus;
    if (!config.customcommands.overidecommandblocksenabled) {
        commandStatus = "§6[§4DISABLED§6]§r"
    } else {
        commandStatus = "§6[§aENABLED§6]§r"
    }
    let moduleStatus;
    if (cmdsscore <= 0) {
        moduleStatus = "§6[§4DISABLED§6]§r"
    } else {
        moduleStatus = "§6[§aENABLED§6]§r"
    }
    return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"
§4[§6Command§4]§r: overridecbe
§4[§6Status§4]§r: ${commandStatus}
§4[§6Module§4]§r: ${moduleStatus}
§4[§6Usage§4]§r: overridecbe [optional]
§4[§6Optional§4]§r: help
§4[§6Description§4]§r: Forces the commandblocksenabled gamerule to be enabled or disabled at all times.
§4[§6Examples§4]§r:
    ${prefix}overridecbe
    ${prefix}overridecbe help
"}]}`)
}

/**
 * @name overidecommandblocksenabled
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function overidecommandblocksenabled(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/settings/overideCommandBlocksEnabled.js:7)");
    }

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if (!player.hasTag('paradoxOpped')) {
        return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to be Paradox-Opped to use this command."}]}`);
    }

    let cmdsscore = getScore("cmds", player);

    // Check for custom prefix
    let prefix = getPrefix(player);

    // Was help requested
    let argCheck = args[0];
    if (argCheck && args[0].toLowerCase() === "help" || !config.customcommands.overidecommandblocksenabled) {
        return overrideCBEHelp(player, prefix, cmdsscore);
    }

    if (cmdsscore <= 0) {
        // Allow
        player.runCommand(`scoreboard players set paradox:config cmds 1`);
        player.runCommand(`tellraw @a[tag=paradoxOpped] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"selector":"@s"},{"text":" has set CommandBlocksEnabled §6as enabled!"}]}`);
    } else if (cmdsscore === 1) {
        // Deny
        player.runCommand(`scoreboard players set paradox:config cmds 2`);
        player.runCommand(`tellraw @a[tag=paradoxOpped] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"selector":"@s"},{"text":" has set CommandBlocksEnabled §4as disabled!"}]}`);
    } else if (cmdsscore >= 2) {
        // Force
        player.runCommand(`scoreboard players set paradox:config cmds 0`);
        player.runCommand(`tellraw @a[tag=paradoxOpped] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"selector":"@s"},{"text":" has §etoggled§r Force-CommandBlocksEnabled!"}]}`);
    }
    return player.runCommand(`scoreboard players operation @a cmds = paradox:config cmds`);
}
