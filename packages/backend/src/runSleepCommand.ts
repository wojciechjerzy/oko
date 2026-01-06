import {ExecCb} from "./execCb";
import {execFile} from "child_process";

export function runSleepCommand(cb: ExecCb): void {
    const platform = process.platform;

    // UWAGA: to usypia HOSTA (maszynę z Node)
    if (platform === "win32") {
        execFile(
            "rundll32.exe",
            ["powrprof.dll,SetSuspendState", "0,1,0"],
            (err, stdout, stderr) => cb(err, stdout, stderr)
        );
        return;
    }

    if (platform === "darwin") {
        execFile("pmset", ["sleepnow"], (err, stdout, stderr) =>
            cb(err, stdout, stderr)
        );
        return;
    }

    // Linux (systemd)
    execFile("systemctl", ["suspend"], (err, stdout, stderr) =>
        cb(err, stdout, stderr)
    );
}