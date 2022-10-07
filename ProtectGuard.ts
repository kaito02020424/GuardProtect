import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { CANCEL } from "bdsx/common";
import * as fs from "fs";
import { CxxString, int32_t } from "bdsx/nativetype";
import { ItemStack } from "bdsx/bds/inventory";
import { readBuilderProgram } from "typescript";
import path, { dirname } from "path";

var a = true;
var masterData: {
  Name: string;
  rb: string;
  block: string;
  x: int32_t;
  y: int32_t;
  z: int32_t;
  date: string;
}[] = [];
const date = new Date();
let jsonObject;
let x;
let y;
let z;

command
  .register("pg", "protect world")
  .overload(
    (param, origin, output) => {
      const actor = origin.getEntity();
      if (actor?.hasTag("inspect")) {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now disabled"}]}`;
        actor?.runCommand("tag @s remove inspect");
        actor?.runCommand(cmd);
      } else {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now enabled"}]}`;
        actor?.runCommand("tag @s add inspect");
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.inspect", "i"),
    }
  )
  .overload(
    (param, origin, output) => {
      const actor = origin.getEntity();
      if (actor?.hasTag("inspect")) {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now disabled"}]}`;
        actor?.runCommand("tag @s remove inspect");
        actor?.runCommand(cmd);
      } else {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now enabled"}]}`;
        actor?.runCommand("tag @s add inspect");
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.inspect2", "inspect"),
    }
  )
  .overload(
    (param, origin, output) => {
      const actor = origin.getEntity();
      let cmd = `tellraw @s {"rawtext":[{"text":"§l§f----§3ProtectGuard§f----\n§3Version: §fProtectGuard v1.0\n§3Data: §f/bedrock_server/ProtectGuard\n§3Download §fhttps://github.com/RuneNight/GuardProtect\n§3Lisense §fMIT"}]}`;
      actor?.runCommand(cmd);
    },
    {
      option: command.enum("ProtectGuard.status", "status"),
    }
  )
  .overload(
    (param, origin, output) => {
      const actor = origin.getEntity();
      var pg = `§l§f----§3ProtectGuard Restore§f----§r\n`;
      let jsi;
      try {
        const jsi: object =
          jsonObject.masterData.filter((item: any) => {
            if (item.Name == param.user && item.block == param.block) return true;
          }) || {};
        let rba = "";
        for (const i in jsi) {
          if (jsi[i].rb == "b") {
            rba = "placed";
            actor?.runCommand(
              "setblock " +
                jsi[i].x +
                " " +
                jsi[i].y +
                " " +
                jsi[i].z +
                " " +
                jsi[i].block
            );
          } else {
            rba = "removed";
            actor?.runCommand(
              "setblock " + jsi[i].x + " " + jsi[i].y + " " + jsi[i].z + " air"
            );
          }
          let cmd =
            `tellraw @s {"rawtext":[{"text":"` +
            pg +
            `§7` +
            jsi[i].Now +
            ` §l§f - §3` +
            jsi[i].Name +
            ` §f` +
            rba +
            ` §3` +
            jsi[i].block +
            ` §r§7(location: ` +
            jsi[i].x +
            `,` +
            jsi[i].y +
            `,` +
            jsi[i].z +
            ` )"}]}`;
          pg = "";
          actor?.runCommand(cmd);
          a = false;
        }
      } catch (e) {
        console.log(e);
      }
      if (a) {
        let cmd =
          `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
          param.user +
          `"}]}`;
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.restore", "restore"),
      user: CxxString,
      block: CxxString
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      var pg = `§l§f----§3ProtectGuard§f----§r\n`;
      a = true;
      let rba = "";
      try {
        jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
      } catch (e) {
        console.log(e);
      }
      try {
        const jsi: object =
          jsonObject.masterData.filter((item: any) => {
            if (item.Name == param.text) return true;
          }) || {};
        for (const i in jsi) {
          if (jsi[i].rb == "b") {
            rba = "placed";
          } else {
            rba = "removed";
          }
          let cmd =
            `tellraw @s {"rawtext":[{"text":"` +
            pg +
            `§7` +
            jsi[i].Now +
            ` §l§f - §3` +
            jsi[i].Name +
            ` §f` +
            rba +
            ` §3` +
            jsi[i].block +
            ` §r§7(location: ` +
            jsi[i].x +
            `,` +
            jsi[i].y +
            `,` +
            jsi[i].z +
            ` )"}]}`;
          pg = "";
          actor?.runCommand(cmd);
          a = false;
        }
      } catch (e) {
        console.log(e);
      }
      if (a) {
        let cmd =
          `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
          param.text +
          `"}]}`;
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.lookup", "lookup"),
      user: command.enum("ProtectGuard.lookup.user", "user"),
      text: CxxString,
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      var pg = `§l§f----§3ProtectGuard Rollback§f----§r\n`;
      a = true;
      let rba = "";
      try {
        jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
      } catch (e) {
        console.log(e);
      }
      try {
        const jsi: object =
          jsonObject.masterData.filter((item: any) => {
            if (item.Name == param.user && item.block == param.block) return true;
          }) || {};
        for (const i in jsi) {
          if (jsi[i].rb == "b") {
            rba = "placed";
            actor?.runCommand(
              "setblock " + jsi[i].x + " " + jsi[i].y + " " + jsi[i].z + " air"
            );
          } else {
            rba = "removed";
            actor?.runCommand(
              "setblock " +
                jsi[i].x +
                " " +
                jsi[i].y +
                " " +
                jsi[i].z +
                " " +
                jsi[i].block
            );
          }
          let cmd =
            `tellraw @s {"rawtext":[{"text":"` +
            pg +
            `§7` +
            jsi[i].Now +
            ` ago §l§f - §3` +
            jsi[i].Name +
            ` §f` +
            rba +
            ` §3` +
            jsi[i].block +
            ` §r§7(location: ` +
            jsi[i].x +
            `,` +
            jsi[i].y +
            `,` +
            jsi[i].z +
            ` )"}]}`;
          pg = "";
          actor?.runCommand(cmd);
          a = false;
        }
      } catch (e) {
        console.log(e);
      }
      if (a) {
        let cmd =
          `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
          param.user +
          `"}]}`;
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.rollback", "rollback"),
      user: CxxString,
      block: CxxString
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      var pg = `§l§f----§3ProtectGuard§f----§r\n`;
      a = true;
      let rba = "";
      try {
        jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
      } catch (e) {
        console.log(e);
      }
      try {
        const jsi: object =
          jsonObject.masterData.filter((item: any) => {
            if (item.x == param.x && item.y == param.y && item.z == param.z)
              return true;
          }) || {};
        for (const i in jsi) {
          if (jsi[i].rb == "b") {
            rba = "placed";
          } else {
            rba = "removed";
          }
          let cmd =
            `tellraw @s {"rawtext":[{"text":"` +
            pg +
            `§7` +
            jsi[i].Now +
            ` §l§f - §3` +
            jsi[i].Name +
            ` §f` +
            rba +
            ` §3` +
            jsi[i].block +
            ` §r§7(location: ` +
            jsi[i].x +
            `,` +
            jsi[i].y +
            `,` +
            jsi[i].z +
            ` )"}]}`;
          pg = "";
          actor?.runCommand(cmd);
          a = false;
        }
      } catch (e) {
        console.log(e);
      }
      if (a) {
        let cmd =
          `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
          param.x +
          `/` +
          param.y +
          `/` +
          param.z +
          `"}]}`;
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.lookup", "lookup"),
      user: command.enum("ProtectGuard.lookup.xyz", "xyz"),
      x: int32_t,
      y: int32_t,
      z: int32_t,
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      var pg = `§l§f----§3ProtectGuard§f----§r\n`;
      a = true;
      let rba = "";
      try {
        jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
      } catch (e) {
        console.log(e);
      }
      try {
        let x = actor?.getPosition().x;
        let x2 = actor?.getPosition().x;
        let y = actor?.getPosition().y;
        let z = actor?.getPosition().z;

        const jsi: object =
          jsonObject.masterData.filter((item: any) => {
            return true;
          }) || {};
        for (const i in jsi) {
          if (jsi[i].rb == "b") {
            rba = "placed";
          } else {
            rba = "removed";
          }
          let cmd =
            `tellraw @s {"rawtext":[{"text":"` +
            pg +
            `§7` +
            jsi[i].Now +
            ` §l§f - §3` +
            jsi[i].Name +
            ` §f` +
            rba +
            ` §3` +
            jsi[i].block +
            ` §r§7(location: ` +
            jsi[i].x +
            `,` +
            jsi[i].y +
            `,` +
            jsi[i].z +
            ` )"}]}`;
          pg = "";
          actor?.runCommand(cmd);
          a = false;
        }
      } catch (e) {
        console.log(e);
      }
      if (a) {
        let cmd =
          `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
          x +
          `/` +
          y +
          `/` +
          z +
          `"}]}`;
        actor?.runCommand(cmd);
      }
    },
    {
      option: command.enum("ProtectGuard.near", "near"),
      r: int32_t,
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      let cmd = `tellraw @s {"rawtext":[{"text":"§l§f---- §3ProtectGuard Help §f----\n§3/pg §7help §f- Display more info for that command.\n§3/pg §7inspect §f - Turns the block inspector on or off.\n§3/pg §7rollback §3<params> §f- Rollback block data.\n§3/pg §7lookup §3<params> §f- Advanced block data lookup.\n§3/pg §7status §f- Displays the plugin status."}]}`;
      actor?.runCommand(cmd);
    },
    {
      option: command.enum("ProtectGuard.help", "help"),
    }
  )
  .overload(
    (param, origin) => {
      const actor = origin.getEntity();
      let cmd = `tellraw @s {"rawtext":[{"text":""}]}`;
    },
    {
      option: command.enum("ProtectGuard.near", "near"),
    }
  );

events.blockDestroy.on((ev) => {
  if (ev.player.hasTag("inspect")) {
    a = true;
    var pg =
      `§l§f----§3ProtectGuard§f---- §r§7(x` +
      ev.blockPos.x +
      `/y` +
      ev.blockPos.y +
      `/z` +
      ev.blockPos.z +
      `)\n`;
    let rba = "";
    try {
      jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
    } catch (e) {
      console.log(e);
    }
    try {
      const jsi: object =
        jsonObject.masterData.filter((item: any) => {
          if (
            item.x == ev.blockPos.x &&
            item.y == ev.blockPos.y &&
            item.z == ev.blockPos.z
          )
            return true;
        }) || {};
      for (const i in jsi) {
        if (jsi[i].rb == "b") {
          rba = "placed";
        } else {
          rba = "removed";
        }
        let cmd =
          `tellraw @s {"rawtext":[{"text":"` +
          pg +
          `§7` +
          jsi[i].Now +
          ` §l§f - §3` +
          jsi[i].Name +
          ` §f` +
          rba +
          ` §3` +
          jsi[i].block +
          ` §r§7(location: ` +
          jsi[i].x +
          `/` +
          jsi[i].y +
          `/` +
          jsi[i].z +
          ` )"}]}`;
        pg = "";
        ev.player.runCommand(cmd);
        a = false;
      }
    } catch (e) {
      console.log(e);
    }
    if (a) {
      var blocks = ev.blockSource
        .getBlock(ev.blockPos)
        .getName()
        .replace("minecraft:", "");
      let cmd =
        `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
        blocks +
        `"}]}`;
      ev.player.runCommand(cmd);
    }
    return CANCEL;
  } else {
    let TYear: string = date.getFullYear().toString();
    var TMonth2: number = date.getMonth() + 1;
    var TMonth: string = TMonth2.toString();
    let TDate: string = date.getDate().toString();
    let THour: string = date.getHours().toString();
    let TMinutes: string = date.getMinutes().toString();
    let TSeconds: string = date.getSeconds().toString();
    var Now: string =
      TYear +
      "," +
      TMonth +
      "," +
      TDate +
      "," +
      THour +
      "," +
      TMinutes +
      "," +
      TSeconds;
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
events.blockPlace.on((ev) => {
  if (ev.player.hasTag("inspect")) {
    a = true;
    var pg =
      `§l§f----§3ProtectGuard§f---- §r§7(x` +
      ev.blockPos.x +
      `/y` +
      ev.blockPos.y +
      `/z` +
      ev.blockPos.z +
      `)\n`;
    let rba = "";
    try {
      jsonObject = JSON.parse(fs.readFileSync("./block.json", "utf8"));
    } catch (e) {
      console.log(e);
    }
    try {
      const jsi: object =
        jsonObject.masterData.filter((item: any) => {
          if (
            item.x == ev.blockPos.x &&
            item.y == ev.blockPos.y &&
            item.z == ev.blockPos.z
          )
            return true;
        }) || {};
      for (const i in jsi) {
        if (jsi[i].rb == "b") {
          rba = "placed";
        } else {
          rba = "removed";
        }
        let cmd =
          `tellraw @s {"rawtext":[{"text":"` +
          pg +
          `§7` +
          jsi[i].Now +
          ` §l§f - §3` +
          jsi[i].Name +
          ` §f` +
          rba +
          ` §3` +
          jsi[i].block +
          ` §r§7(location: ` +
          jsi[i].x +
          `/` +
          jsi[i].y +
          `/` +
          jsi[i].z +
          ` )"}]}`;
        pg = "";
        ev.player.runCommand(cmd);
        a = false;
      }
    } catch (e) {
      console.log(e);
    }
    if (a) {
      var blocks = ev.block.getName().replace("minecraft:", "");
      let cmd =
        `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at ` +
        blocks +
        `"}]}`;
      ev.player.runCommand(cmd);
    }
    return CANCEL;
  } else {
    let TYear: string = date.getFullYear().toString();
    var TMonth2: number = date.getMonth() + 1;
    var TMonth: string = TMonth2.toString();
    let TDate: string = date.getDate().toString();
    let THour: string = date.getHours().toString();
    let TMinutes: string = date.getMinutes().toString();
    let TSeconds: string = date.getSeconds().toString();
    var Now: string =
      TYear +
      "," +
      TMonth +
      "," +
      TDate +
      "," +
      THour +
      "," +
      TMinutes +
      "," +
      TSeconds;
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

events.playerJoin.on((ev) => {
  ev.player.runCommand("tag @s remove inspect");
});
