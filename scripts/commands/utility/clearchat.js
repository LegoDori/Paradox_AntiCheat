import config from "../../data/config.js";
import { crypto, disabler, getPrefix } from "../../util.js";

function clearChatHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.clearchat) {
        commandStatus = "§6[§4DISABLED§6]§r"
    } else {
        commandStatus = "§6[§aENABLED§6]§r"
    }
    return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"
§4[§6Command§4]§r: clearchat
§4[§6Status§4]§r: ${commandStatus}
§4[§6Usage§4]§r: clearchat [optional]
§4[§6Optional§4]§r: help
§4[§6Description§4]§r: Will clear the chat.
§4[§6Examples§4]§r:
    ${prefix}clearchat
    ${prefix}clearchat help
"}]}`)
}

/**
 * @name clearchat
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function clearchat(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./utility/notify.js:7)");
    }

    message.cancel = true;

    let player = message.sender;
    
    // make sure the user has permissions to run the command
    if (!player.hasTag('Hash:' + crypto)) {
        return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"You need to be Paradox-Opped to use this command."}]}`);
    }

    // Check for custom prefix
    let prefix = getPrefix(player);

    // Was help requested
    let argCheck = args[0];
    if (argCheck && args[0].toLowerCase() === "help" || !config.customcommands.clearchat) {
        return clearChatHelp(player, prefix);
    }

    for (let clear = 0; clear < 12; clear++) {
        player.runCommand(`tellraw @a {"rawtext":[{"text":"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}]}`);
    }

    return player.runCommand(`tellraw @a[tag=Hash:${crypto}] {"rawtext":[{"text":"§r§4[§6Paradox§4]§r "},{"text":"Chat has been cleared by "},{"selector":"@s"},{"text":"."}]}`);
}
