import { world } from "mojang-minecraft";
import { flag, disabler } from "../../../util.js";
import config from "../../../data/config.js";

const World = world;

function crashera() {
    // Unsubscribe if disabled in-game
    if (config.modules.crasherA.enabled === false) {
        World.events.tick.unsubscribe(crashera);
        return;
    }
    // run as each player
    for (let player of World.getPlayers()) {
        // Crasher/A = invalid pos check
        if (Math.abs(player.location.x) > 30000000 || Math.abs(player.location.y) > 30000000 || Math.abs(player.location.z) > 30000000) {
            flag(player, "Crasher", "A", "Exploit", false, false, false, false, true, false);
            let tags = player.getTags();
            // This removes old ban tags
            tags.forEach(t => {
                if(t.startsWith("Reason:")) {
                    player.removeTag(t);
                }
                if(t.startsWith("By:")) {
                    player.removeTag(t);
                }
            });
            try {
                player.runCommand(`tag "${disabler(player.nameTag)}" add "Reason:Crasher"`);
                player.runCommand(`tag "${disabler(player.nameTag)}" add "By:Paradox"`);
                player.addTag('isBanned');
            } catch (error) {
                player.triggerEvent('paradox:kick');
            }
        }
    }
}

const CrasherA = () => {
    World.events.tick.subscribe(() => crashera());
};

export { CrasherA };