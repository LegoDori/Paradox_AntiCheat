import * as Minecraft from "mojang-minecraft";
import { flag } from "../../../util.js";
import config from "../../../data/config.js";
import { setTickInterval } from "../../../timer/scheduling.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

const CrasherA = () => {
    setTickInterval(() => {
        // run as each player
        for (let player of World.getPlayers()) {
            // fix a disabler method
            player.nameTag = player.nameTag.replace("\"", "");
            player.nameTag = player.nameTag.replace("\\", "");

            // Crasher/A = invalid pos check
            if (config.modules.crasherA.enabled && Math.abs(player.location.x) > 30000000 || Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) {
                flag(player, "Crasher", "A", "Exploit", false, false, true, false);
            }
        }
    }, 40) //Executes every 2 seconds
}

export { CrasherA }