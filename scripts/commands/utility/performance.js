import config from "../../data/config.js";
import { crypto, disabler, getPrefix } from "../../util.js";

function performanceHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.performance) {
        commandStatus = "§6[§4DISABLED§6]§r"
    } else {
        commandStatus = "§6[§aENABLED§6]§r"
    }
    return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"
§4[§6Command§4]§r: performance
§4[§6Status§4]§r: ${commandStatus}
§4[§6Usage§4]§r: performance [optional]
§4[§6Optional§4]§r: help
§4[§6Description§4]§r: Shows TPS stats to evaluate performance with Paradox.
§4[§6Examples§4]§r:
    ${prefix}performance
    ${prefix}performance help
"}]}`)
}

/**
 * @name performance
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function performance(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/performance.js:5)");
    }

    message.cancel = true;

    let player = message.sender;

    // Check for custom prefix
    let prefix = getPrefix(player);

    // Was help requested
    let argCheck = args[0];
    if (argCheck && args[0].toLowerCase() === "help" || !config.customcommands.performance) {
        return performanceHelp(player, prefix);
    }
    
    // make sure the user has permissions to run the command
    if (!player.hasTag('Hash:' + crypto)) {
        return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to be Paradox-Opped to use this command."}]}`);
    }

    if (!player.hasTag('performance')) {
        // Allow
        player.addTag('performance');
        player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r You have enabled §6Performance Testing§r!"}]}`);
        return;
    } else if (player.hasTag('performance')) {
        // Deny
        player.removeTag('performance');
        player.runCommand(`tellraw @a[tag=Hash:${crypto}] {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r You have disabled §4Performance Testing§r!"}]}`);
        return;
    }
}
