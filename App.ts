#!/usr/bin/env node

import { Pack } from "./src/Pack/Pack";
import { Publish } from "./src/Publish/Publish";
import { Build } from "./src/build/Build";
import { Create } from "./src/create/Create";

const CPath = process.cwd();
const args = process.argv.slice(2);

switch (args[0]) {
  case "create":
    var sliced = args.slice(1);
    Create.create(sliced);
    break;
  case "pack":
    var sliced = args.slice(1);
    Pack.CreatePack().then((res) => console.log(res));
    break
  case "publish":
    var sliced = args.slice(1);
    Publish.publish();
    break;
  case "build":
    var sliced = args.slice(1);
    Build.build();
    break;
  default:
    break;
}
