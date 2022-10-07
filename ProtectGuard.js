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
        if (param.action == "+" || param.action == "-" || param.action == "*") {
            var pg = `§l§f----§3ProtectGuard Restore§f----§r\n`;
            try {
                if (param.action == "+") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user &&
                            item.block == param.block &&
                            item.rb == "b")
                            return true;
                    }) || {};
                }
                else if (param.action == "-") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user &&
                            item.block == param.block &&
                            item.rb == "r")
                            return true;
                    }) || {};
                }
                else if (param.action == "*") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user && item.block == param.block)
                            return true;
                    }) || {};
                }
                let rba = "";
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
        if (param.action == "+" || param.action == "-" || param.action == "*") {
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
                if (param.action == "+") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user &&
                            item.block == param.block &&
                            item.rb == "b")
                            return true;
                    }) || {};
                }
                else if (param.action == "-") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user &&
                            item.block == param.block &&
                            item.rb == "r")
                            return true;
                    }) || {};
                }
                else if (param.action == "*") {
                    jsi;
                    jsonObject.masterData.filter((item) => {
                        if (item.Name == param.user && item.block == param.block)
                            return true;
                    }) || {};
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
                        console.log(item.x +
                            "<" +
                            x2 +
                            "-" +
                            param.r +
                            "||" +
                            item.x +
                            "<" +
                            x2 +
                            "-" +
                            param.r);
                        console.log(item.y +
                            "<" +
                            y2 +
                            "-" +
                            param.r +
                            "||" +
                            item.y +
                            "<" +
                            y2 +
                            "-" +
                            param.r);
                        console.log(item.z +
                            "<" +
                            z2 +
                            "-" +
                            param.r +
                            "||" +
                            item.z +
                            "<" +
                            z2 +
                            "-" +
                            param.r);
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