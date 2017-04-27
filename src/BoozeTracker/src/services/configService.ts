import {DatabaseService} from "./databaseService";

export class ConfigService extends DatabaseService {

    /**
     * Gets the persisted user configuration
     * @return {UserConfig} The last persisted configuration
     */
    getConfig(cb: (u: UserConfig) => void) {
        this.get("settings", (config: any) => {
          cb(new UserConfig(config)) // clone from plain object into UserConfig;
        });
    }

    /**
     * Persist a user configuration
     * @param  {UserConfig} config The configuration to persist
     */
    setConfig(config: UserConfig): void {
        this.set("settings", config)
    }
}


export class UserConfig {
    weight: number = 150;
    height = {
        ft: 5,
        in: 10
    };
    age: number = 30;
    gender: "male" | "female" = "male";

    constructor(config?: UserConfig) {
        //copy constructor to copy an object
        if (config) {
            this.age = config.age;
            this.gender = config.gender;
            this.height.ft = config.height.ft;
            this.height.in = config.height.in;
            this.weight = config.weight;
        }
    }
}
