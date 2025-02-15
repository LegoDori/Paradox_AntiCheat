import { world } from "mojang-minecraft";
import config from "../../data/config.js";
import { disabler, getPrefix } from "../../util.js";

const World = world;

function delhomeHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.delhome) {
        commandStatus = "§6[§4DISABLED§6]§r"
    } else {
        commandStatus = "§6[§aENABLED§6]§r"
    }
    return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"
§4[§6Command§4]§r: delhome
§4[§6Status§4]§r: ${commandStatus}
§4[§6Usage§4]§r: delhome [optional]
§4[§6Optional§4]§r: name, help
§4[§6Description§4]§r: Will delete specified saved home location.
§4[§6Examples§4]§r:
    ${prefix}delhome cave
    ${prefix}delhome help
"}]}`)
}

/**
 * @name delhome
 * @param {object} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function delhome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/delhome.js:8)");
    }

    message.cancel = true;

    let player = message.sender;

    // Check for custom prefix
    let prefix = getPrefix(player);

    // Was help requested
    let argCheck = args[0];
    if (argCheck && args[0].toLowerCase() === "help" || !config.customcommands.delhome) {
        return delhomeHelp(player, prefix);
    }

    // Don't allow spaces
    if (args.length > 1) {
        return player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"text":"No spaces in names please!"}]}`);
    }

    // Find and delete this saved home location
    let verify = false;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            player.removeTag(tags[i])
            player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"text":"You have successfully deleted ${args[0]}!"}]}`)
            break;
        }
    }
    if (verify === true) {
        return;
    } else {
        player.runCommand(`tellraw "${disabler(player.nameTag)}" {"rawtext":[{"text":"\n§r§4[§6Paradox§4]§r "},{"text":"${args[0]} does not exist!"}]}`)
    }
}
