import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { CANCEL } from 'bdsx/common';
import * as fs from 'fs';
import { CxxString } from "bdsx/nativetype";

var list: string[] = [] 
var a=true
const p = "ProtectGuard/block.txt";
 
if( fs.existsSync( p ) ){} else {
fs.mkdir('ProtectGuard', () => {
    fs.writeFile('ProtectGuard/block.txt', '', function () {
        console.log('create ProtectGuard/block.txt');
    });
});
}
command.register('pg', 'protect world')
.overload((param, origin, output) => {
    const actor = origin.getEntity() 
    if(actor?.hasTag("inspect")){
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now disabled"}]}`
        actor?.runCommand("tag @s remove inspect")
        actor?.runCommand(cmd)
    } else {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now enabled"}]}`
        actor?.runCommand("tag @s add inspect")
        actor?.runCommand(cmd)
    }
}, {
    option: command.enum("option.inspect", "i"),
})
.overload((param, origin, output) => {
    const actor = origin.getEntity()
    if(actor?.hasTag("inspect")){
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now disabled"}]}`
        actor?.runCommand("tag @s remove inspect")
        actor?.runCommand(cmd)
    } else {
        let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- Inspect now enabled"}]}`
        actor?.runCommand("tag @s add inspect")
        actor?.runCommand(cmd)
    }
} ,{
    option: command.enum("option.inspect2", "inspect"),
})
.overload((param, origin, output) => {
    const actor = origin.getEntity()
    let cmd = `tellraw @s {"rawtext":[{"text":"§l§f----§3ProtectGuard§f----\n§3Version: §fProtectGuard v1.0\n§3Data: §f/bedrock_server/ProtectGuard\n§3Download §fhttps://github.com/RuneNight/GuardProtect\n§3Lisense §fMIT"}]}`
    actor?.runCommand(cmd)
} ,{
    option: command.enum("option.status", "status"),
})
.overload((param, origin, output) => {
    var block = fs.readFileSync("ProtectGuard/block.txt").toString().split("\n")
    for (var i = 0; i < block.length; i++) {
        if(block[i].includes(param.user)){
            const actor = origin.getEntity()
            if(block[i].includes("removed")){
                actor?.runCommand("setblock "+block[i].split(" ")[4]+" "+block[i].split(" ")[5]+" "+block[i].split(" ")[6]+" "+block[i].split(" ")[2])
            } else {
                actor?.runCommand("setblock "+block[i].split(" ")[4]+" "+block[i].split(" ")[5]+" "+block[i].split(" ")[6]+" air")
            }
        }
    }
} ,{
    option: command.enum("option.rollback", "rollback"),
    user: CxxString
})
.overload((param, origin) => {
    var block = fs.readFileSync("ProtectGuard/block.txt").toString().split("\n")
    var pg = `§l§f----§3ProtectGuard§f----§r\n`
    for (var i = 0; i < block.length; i++) {
        if(block[i].includes(param.user)){
            const actor = origin.getEntity()
            let cmd = `tellraw @s {"rawtext":[{"text":"`+pg+`§70.00/h ago §l§f - `+block[i].split("(((")[0]+"§r§7(x"+block[i].split(" ")[4]+"/y"+block[i].split(" ")[5]+"/z"+block[i].split(" ")[6]+`)"}]}`
            pg =""
            actor?.runCommand(cmd)
        }
    }
} ,{
    option: command.enum("option.lookup", "lookup"),
    user: CxxString
});


events.blockDestroy.on((ev)=>{
    if(ev.player.hasTag("inspect")){
        a=true
        var cancel = "(location: "+ev.blockPos.x+" "+ev.blockPos.y+" "+ev.blockPos.z+" )"
        var pg = `§l§f----§3ProtectGuard§f---- §r§7(x`+ev.blockPos.x+`/y`+ev.blockPos.y+`/z`+ev.blockPos.z+`)\n`
        var block = fs.readFileSync("ProtectGuard/block.txt").toString().split("\n")
        for (var i = 0; i < block.length; i++) {
            if(block[i].includes(cancel)){
                let cmd = `tellraw @s {"rawtext":[{"text":"`+pg+`§70.00/h ago §l§f - `+block[i].split("(((")[0]+`"}]}`
                pg =""
                ev.player.runCommand(cmd)
                a=false
            }
        }
        if(a){
            var blocks = ev.itemStack.getName()
            let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at `+blocks+`"}]}`
                ev.player.runCommand(cmd)
        }
        return CANCEL
    } else {
        var blocks = ev.itemStack.getName().replace("minecraft:","")
        list.push("§l§3"+ev.player.getName()+" §fremoved§3 "+blocks+" (((location: "+ev.blockPos.x+" "+ev.blockPos.y+" "+ev.blockPos.z+" )))")
        fs.appendFile('ProtectGuard/block.txt', list[list.length-1]+"\n", () => {});
    }
})
events.blockPlace.on((ev)=>{
        if(ev.player.hasTag("inspect")){
            a=true
            var cancel = "(location: "+ev.blockPos.x+" "+ev.blockPos.y+" "+ev.blockPos.z+" )"
            var pg = `§l§f----§3ProtectGuard§f---- §r§7(x`+ev.blockPos.x+`/y`+ev.blockPos.y+`/z`+ev.blockPos.z+`)\n`
            var block = fs.readFileSync("ProtectGuard/block.txt").toString().split("\n")
            for (var i = 0; i < block.length; i++) {
                if(block[i].toString().includes(cancel)){
                    let cmd = `tellraw @s {"rawtext":[{"text":"`+pg+`§70.00/h ago §l§f - `+block[i].split("(((")[0]+`"}]}`
                    pg =""
                    ev.player.runCommand(cmd)
                    a=false
                }
            }
            if(a){
                var blocks = ev.block.getName().replace("minecraft:","")
                let cmd = `tellraw @s {"rawtext":[{"text":"§l§3ProtectGuard §f- No block data found at `+blocks+`"}]}`
                    ev.player.runCommand(cmd)
            }
            return CANCEL
    } else {
        var blocks = ev.block.getName().replace("minecraft:","")
        list.push("§l§3"+ev.player.getName()+" §fplaced§3 "+blocks+" (((location: "+ev.blockPos.x+" "+ev.blockPos.y+" "+ev.blockPos.z+" )))")
        fs.appendFile('ProtectGuard/block.txt', list[list.length-1]+"\n", () => {});
    }
})
