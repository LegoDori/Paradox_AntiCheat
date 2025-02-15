import { world, BlockLocation, MinecraftBlockTypes } from "mojang-minecraft";
import config from "../../../data/config.js";
import { crypto } from "../../../util.js";
// import { flag } from "../../../util.js";

const World = world;

function reacha(object) {
    // Unsubscribe if disabled in-game
    if (config.modules.reachA.enabled === false) {
        World.events.blockPlace.unsubscribe(reacha);
        return;
    }

    // Properties from class
    let { block, player, dimension } = object;

    // Return if player has op
    if (player.hasTag('Hash:' + crypto)) {
        return;
    }
    
    // Block coordinates
    let { x, y, z } = block.location;
    // Player coordinates
    let { x: x1, y: y1, z: z1 } = player.location;
    
    // Calculate the distance between the player and the block being placed
    let reach = Math.sqrt((x - x1)**2 + (y - y1)**2 + (z - z1)**2);

    if(reach > config.modules.reachA.reach) {
        dimension.getBlock(new BlockLocation(x, y, z)).setType(MinecraftBlockTypes.air);
        // flag(player, "Reach", "A", "Placement", false, false "reach", reach.toFixed(3), false, false);
    }
}

const ReachA = () => {
    World.events.blockPlace.subscribe(object => reacha(object));
};

export { ReachA };
