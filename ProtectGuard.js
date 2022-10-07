"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const command_1 = require("bdsx/command");
const common_1 = require("bdsx/common");
const fs = require("fs");
const nativetype_1 = require("bdsx/nativetype");
const command_2 = require("bdsx/bds/command");
var a = true;
var masterData = [];
const date = new Date();
let jsonObject;
let x;
let y;
let z;
let cmd;
let jsi;
const RegisterCmd = function () {
    command_1.command
        .register("pg", "protect world")
        .overload((param, origin, output) => {
        const actor = origin.getEntity();
        Inspect(actor);
    }, {
        option: command_1.command.enum("ProtectGuard.i", "i"),
    })
        .overload((param, origin, output) => {
        const actor = origin.getEntity();
        Inspect(actor);
    }, {
        option: command_1.command.enum("ProtectGuard.inspect", "inspect"),
    })
        .overload((param, origin, output) => {
        const actor = origin.getEntity();
        cmd = `tellraw @s {"rawtext":[{"text":"§l§f----§3ProtectGuard§f----\n§3Version: §fProtectGuard v1.0\n§3Data: §f/bedrock_server/ProtectGuard\n§3Download §fhttps://github.com/RuneNight/GuardProtect\n§3Lisense §fMIT"}]}`;
        actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
    }, {
        option: command_1.command.enum("ProtectGuard.status", "status"),
    })
        .overload((param, origin, output) => {
        const actor = origin.getEntity();
        if (param.action == "place" ||
            param.action == "remove" ||
            param.action == "all") {
            var pg = `§l§f----§3ProtectGuard Restore§f----§r\n`;
            a = true;
            let rba = "";
            try {
                jsonObject = readJson();
            }
            catch (e) {
                console.log(e);
            }
            try {
                if (param.action == "place") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user &&
                                    item.block == param.block &&
                                    item.rb == "b")
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user && item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                else if (param.action == "remove") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user &&
                                    item.block == param.block &&
                                    item.rb == "r")
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user && item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                else if (param.action == "all") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user)
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user &&
                                    item.block == param.block &&
                                    item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                for (const i in jsi) {
                    if (jsi[i].rb == "b") {
                        rba = "placed";
                        actor === null || actor === void 0 ? void 0 : actor.runCommand("setblock " +
                            jsi[i].x +
                            " " +
                            jsi[i].y +
                            " " +
                            jsi[i].z +
                            " " +
                            jsi[i].block);
                    }
                    else {
                        rba = "removed";
                        actor === null || actor === void 0 ? void 0 : actor.runCommand("setblock " +
                            jsi[i].x +
                            " " +
                            jsi[i].y +
                            " " +
                            jsi[i].z +
                            " air");
                    }
                    cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                    pg = "";
                    actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
                    a = false;
                }
            }
            catch (e) {
                console.log(e);
            }
            if (a) {
                cmd = Nodata(param.user);
                actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
            }
        }
        else {
            actor === null || actor === void 0 ? void 0 : actor.runCommand(`tellraw @s {"rawtext":[{"text":"§cNoActionParam..."}]}`);
        }
    }, {
        option: command_1.command.enum("ProtectGuard.restore", "restore"),
        user: nativetype_1.CxxString,
        block: nativetype_1.CxxString,
        action: nativetype_1.CxxString,
    })
        .overload((param, origin) => {
        const actor = origin.getEntity();
        var pg = `§l§f----§3ProtectGuard§f----§r\n`;
        a = true;
        let rba = "";
        try {
            jsonObject = readJson();
        }
        catch (e) {
            console.log(e);
        }
        try {
            jsi;
            jsonObject.masterData.filter((item) => {
                if (item.Name == param.text)
                    return true;
            }) || {};
            for (const i in jsi) {
                if (jsi[i].rb == "b") {
                    rba = "placed";
                }
                else {
                    rba = "removed";
                }
                cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                pg = "";
                actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
                a = false;
            }
        }
        catch (e) {
            console.log(e);
        }
        if (a) {
            cmd = Nodata(param.text);
            actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
        }
    }, {
        option: command_1.command.enum("ProtectGuard.lookup", "lookup"),
        user: command_1.command.enum("ProtectGuard.lookup.user", "user"),
        text: nativetype_1.CxxString,
    })
        .overload((param, origin) => {
        const actor = origin.getEntity();
        if (param.action == "place" ||
            param.action == "remove" ||
            param.action == "all") {
            var pg = `§l§f----§3ProtectGuard Rollback§f----§r\n`;
            a = true;
            let rba = "";
            try {
                jsonObject = readJson();
            }
            catch (e) {
                console.log(e);
            }
            try {
                if (param.action == "place") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user &&
                                    item.block == param.block &&
                                    item.rb == "b")
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user && item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                else if (param.action == "remove") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user &&
                                    item.block == param.block &&
                                    item.rb == "r")
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user && item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                else if (param.action == "all") {
                    if (param.block != "all") {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user)
                                    return true;
                            }) || {};
                    }
                    else {
                        jsi =
                            jsonObject.masterData.filter((item) => {
                                if (item.Name == param.user && item.rb == "b")
                                    return true;
                            }) || {};
                    }
                }
                for (const i in jsi) {
                    if (jsi[i].rb == "b") {
                        rba = "placed";
                        actor === null || actor === void 0 ? void 0 : actor.runCommand("setblock " +
                            jsi[i].x +
                            " " +
                            jsi[i].y +
                            " " +
                            jsi[i].z +
                            " air");
                    }
                    else {
                        rba = "removed";
                        actor === null || actor === void 0 ? void 0 : actor.runCommand("setblock " +
                            jsi[i].x +
                            " " +
                            jsi[i].y +
                            " " +
                            jsi[i].z +
                            " " +
                            jsi[i].block);
                    }
                    cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                    pg = "";
                    actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
                    a = false;
                }
            }
            catch (e) {
                console.log(e);
            }
            if (a) {
                cmd = Nodata(param.user);
                actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
            }
        }
        else {
            actor === null || actor === void 0 ? void 0 : actor.runCommand(`tellraw @s {"rawtext":[{"text":"§cNoActionParam..."}]}`);
        }
    }, {
        option: command_1.command.enum("ProtectGuard.rollback", "rollback"),
        user: nativetype_1.CxxString,
        block: nativetype_1.CxxString,
        action: nativetype_1.CxxString,
    })
        .overload((param, origin) => {
        const actor = origin.getEntity();
        var pg = `§l§f----§3ProtectGuard§f----§r\n`;
        a = true;
        let rba = "";
        try {
            jsonObject = readJson();
        }
        catch (e) {
            console.log(e);
        }
        try {
            jsi =
                jsonObject.MasterData.filter((item) => {
                    if (item.x == param.x && item.y == param.y && item.z == param.z)
                        return true;
                }) || {};
            for (const i in jsi) {
                if (jsi[i].rb == "b") {
                    rba = "placed";
                }
                else {
                    rba = "removed";
                }
                cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                pg = "";
                actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
                a = false;
            }
        }
        catch (e) { }
        if (a) {
            let xyz = param.x + `/` + param.y + `/` + param.z;
            cmd = Nodata(xyz);
            actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
        }
    }, {
        option: command_1.command.enum("ProtectGuard.lookup", "lookup"),
        user: command_1.command.enum("ProtectGuard.lookup.xyz", "xyz"),
        x: nativetype_1.int32_t,
        y: nativetype_1.int32_t,
        z: nativetype_1.int32_t,
    })
        .overload((param, origin) => {
        const actor = origin.getEntity();
        var pg = `§l§f----§3ProtectGuard§f----§r\n`;
        a = true;
        let rba = "";
        let x2 = actor === null || actor === void 0 ? void 0 : actor.getPosition().x;
        let y2 = actor === null || actor === void 0 ? void 0 : actor.getPosition().y;
        let z2 = actor === null || actor === void 0 ? void 0 : actor.getPosition().x;
        try {
            jsonObject = readJson();
        }
        catch (e) {
            console.log(e);
        }
        try {
            jsi =
                jsonObject.masterData.filter((item) => {
                    if (x2 != undefined && y2 != undefined && z2 != undefined) {
                        x2 = Math.round(x2);
                        y2 = Math.round(y2);
                        z2 = Math.round(z2);
                        if (item.x < x2 + param.r || item.x < x2 - param.r) {
                            if (item.y < y2 + param.r || item.y < y2 - param.r) {
                                if (item.z < z2 + param.r || item.z < z2 - param.r) {
                                    return true;
                                }
                            }
                        }
                    }
                }) || {};
            for (const i in jsi) {
                if (jsi[i].rb == "b") {
                    rba = "placed";
                }
                else {
                    rba = "removed";
                }
                cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                pg = "";
                actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
                a = false;
            }
        }
        catch (e) {
            console.log(e);
        }
        if (a) {
            let xyz = x2 + "/" + y2 + "/" + z2;
            cmd = Nodata(xyz);
            actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
        }
    }, {
        option: command_1.command.enum("ProtectGuard.near", "near"),
        r: nativetype_1.int32_t,
    })
        .overload((param, origin) => {
        const actor = origin.getEntity();
        cmd = `tellraw @s {"rawtext":[{"text":"§l§f---- §3ProtectGuard Help §f----\n§3/pg §7help §f- Display more info for that command.\n§3/pg §7inspect §f - Turns the block inspector on or off.\n§3/pg §7rollback §3<params> §f- Rollback block data.\n§3/pg §7lookup §3<params> §f- Advanced block data lookup.\n§3/pg §7status §f- Displays the plugin status."}]}`;
        actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
    }, {
        option: command_1.command.enum("ProtectGuard.help", "help"),
    });
};
RegisterCmd();
command_1.command.find("pg").signature.permissionLevel = command_2.CommandPermissionLevel.Operator;
event_1.events.blockDestroy.on((ev) => {
    if (ev.player.hasTag("inspect")) {
        a = true;
        var pg = `§l§f----§3ProtectGuard§f---- §r§7(x` +
            ev.blockPos.x +
            `/y` +
            ev.blockPos.y +
            `/z` +
            ev.blockPos.z +
            `)\n`;
        let rba = "";
        try {
            jsonObject = readJson();
        }
        catch (e) {
            console.log(e);
        }
        try {
            jsi =
                jsonObject.masterData.filter((item) => {
                    if (item.x == ev.blockPos.x &&
                        item.y == ev.blockPos.y &&
                        item.z == ev.blockPos.z)
                        return true;
                }) || {};
            for (const i in jsi) {
                if (jsi[i].rb == "b") {
                    rba = "placed";
                }
                else {
                    rba = "removed";
                }
                cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                pg = "";
                ev.player.runCommand(cmd);
                a = false;
            }
        }
        catch (e) { }
        if (a) {
            cmd = Nodata(ev.blockSource.getBlock(ev.blockPos).getName().replace("minecraft:", ""));
            ev.player.runCommand(cmd);
        }
        return common_1.CANCEL;
    }
    else {
        var Now = TimeNow();
        var data = {
            Name: ev.player.getName(),
            rb: "r",
            block: ev.blockSource
                .getBlock(ev.blockPos)
                .getName()
                .replace("minecraft:", ""),
            x: ev.blockPos.x,
            y: ev.blockPos.y,
            z: ev.blockPos.z,
            date: Now,
        };
        masterData.push(data);
        let masterData2 = JSON.stringify({ masterData }, null, " ");
        fs.writeFileSync("./block.json", masterData2);
    }
});
event_1.events.blockPlace.on((ev) => {
    if (ev.player.hasTag("inspect")) {
        a = true;
        var pg = `§l§f----§3ProtectGuard§f---- §r§7(x` +
            ev.blockPos.x +
            `/y` +
            ev.blockPos.y +
            `/z` +
            ev.blockPos.z +
            `)\n`;
        let rba = "";
        try {
            jsonObject = readJson();
        }
        catch (e) { }
        try {
            jsi =
                jsonObject.masterData.filter((item) => {
                    if (item.x == ev.blockPos.x &&
                        item.y == ev.blockPos.y &&
                        item.z == ev.blockPos.z)
                        return true;
                }) || {};
            for (const i in jsi) {
                if (jsi[i].rb == "b") {
                    rba = "placed";
                }
                else {
                    rba = "removed";
                }
                cmd = Cmd(pg, jsi[i].Now, jsi[i].Name, rba, jsi[i].block, jsi[i].x, jsi[i].y, jsi[i].z);
                pg = "";
                ev.player.runCommand(cmd);
                a = false;
            }
        }
        catch (e) { }
        if (a) {
            cmd = Nodata(ev.block.getName().replace("minecraft:", ""));
            ev.player.runCommand(cmd);
        }
        return common_1.CANCEL;
    }
    else {
        var Now = TimeNow();
        var data = {
            Name: ev.player.getName(),
            rb: "b",
            block: ev.block.getName().replace("minecraft:", ""),
            x: ev.blockPos.x,
            y: ev.blockPos.y,
            z: ev.blockPos.z,
            date: Now,
        };
        masterData.push(data);
        let masterData2 = JSON.stringify({ masterData }, null, " ");
        fs.writeFileSync("./block.json", masterData2);
    }
});
event_1.events.playerJoin.on((ev) => {
    ev.player.runCommand("tag @s remove inspect");
});
const Inspect = function (actor) {
    if (actor === null || actor === void 0 ? void 0 : actor.hasTag("inspect")) {
        cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now disabled"}]}`;
        actor === null || actor === void 0 ? void 0 : actor.removeTag("inspect");
        actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
    }
    else {
        cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now enabled"}]}`;
        actor === null || actor === void 0 ? void 0 : actor.addTag("inspect");
        actor === null || actor === void 0 ? void 0 : actor.runCommand(cmd);
    }
};
const readJson = function () {
    return JSON.parse(fs.readFileSync("./block.json", "utf8"));
};
const Nodata = function (name) {
    return (`tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
        name +
        `"}]}`);
};
const Cmd = function (pg, now, name, rba, block, x, y, z) {
    return (`tellraw @s {"rawtext":[{"text":"` +
        pg +
        `§7` +
        now +
        ` §l§f - §3` +
        name +
        ` §f` +
        rba +
        ` §3` +
        block +
        ` §r§7(location: ` +
        x +
        `/` +
        y +
        `/` +
        z +
        ` )"}]}`);
};
const TimeNow = function () {
    let TYear = date.getFullYear().toString();
    var TMonth2 = date.getMonth() + 1;
    var TMonth = TMonth2.toString();
    let TDate = date.getDate().toString();
    let THour = date.getHours().toString();
    let TMinutes = date.getMinutes().toString();
    let TSeconds = date.getSeconds().toString();
    var Now = TYear +
        "/" +
        TMonth +
        "/" +
        TDate +
        "/" +
        THour +
        "/" +
        TMinutes +
        "/" +
        TSeconds;
    return Now;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdGVjdEd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvdGVjdEd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9DO0FBQ3BDLDBDQUF1QztBQUN2Qyx3Q0FBcUM7QUFDckMseUJBQXlCO0FBQ3pCLGdEQUFxRDtBQUVyRCw4Q0FBMEQ7QUFHMUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ2IsSUFBSSxVQUFVLEdBUVIsRUFBRSxDQUFDO0FBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN4QixJQUFJLFVBQWUsQ0FBQztBQUNwQixJQUFJLENBQVMsQ0FBQztBQUNkLElBQUksQ0FBUyxDQUFDO0FBQ2QsSUFBSSxDQUFTLENBQUM7QUFDZCxJQUFJLEdBQVcsQ0FBQztBQUNoQixJQUFJLEdBQVcsQ0FBQztBQUVoQixNQUFNLFdBQVcsR0FBRztJQUNsQixpQkFBTztTQUNKLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDO1NBQy9CLFFBQVEsQ0FDUCxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDLEVBQ0Q7UUFDRSxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDO0tBQzVDLENBQ0Y7U0FDQSxRQUFRLENBQ1AsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQyxFQUNEO1FBQ0UsTUFBTSxFQUFFLGlCQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FB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