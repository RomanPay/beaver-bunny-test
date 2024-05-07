import Scene from "./Scene"
import { readdir } from 'fs/promises'

export class PreloadScene extends Scene
{
    constructor(app)
    {
        super("PreloadScene", app);

        this.init();
        this.resize();
    }

    init()
    {
        this.getDirs();
    }

    getDirs()
    {
        const getDirectories = async source =>
            (await readdir(source, { withFileTypes: true }))
              .filter(dirent => dirent.isDirectory())
              .map(dirent => dirent.name)

        const dirPath = '/path/to/directory';
        const dirs = getDirectories(dirPath);
        console.log(dirs);
    }
}