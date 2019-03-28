import { LiteEvent, ILiteEvent } from "@dadoudidou/liteevent"
import { RouteProps } from "react-router";
import merge from "lodash.merge";
import { appendLocalState } from "../Store/Apollo";



export type IPlugin = {
    name: string
    loadRoutes?: () => React.ReactElement<RouteProps>[]
}

type PluginManagerEventName = "AddPlugin" | "RemovePlugin"

export class PluginManager {
    //#region SINGLETON
    private static __instance: PluginManager;
    static GetInstance: () => PluginManager = () => {
        if(!PluginManager.__instance) PluginManager.__instance = new PluginManager();
        return PluginManager.__instance;
    }
    //#endregion

    private __plugins: IPlugin[] = [];
    private readonly onAddPlugin = new LiteEvent<IPlugin>();
    private readonly onRemovePlugin = new LiteEvent<IPlugin>();
    [key: string]: any

    constructor(){ 
    }

    on(eventName: PluginManagerEventName, handler: (data?: any) => void){
        if(this["on" + eventName]){
            this["on" + eventName].on(handler);
        }
    }

    off(eventName: PluginManagerEventName, handler: (data?: any) => void){
        if(this["on" + eventName]){
            this["on" + eventName].off(handler);
        }
    }

    getPlugin(plugin: IPlugin | string){
        let _name = (typeof plugin == "string") ? plugin : plugin ? plugin.name : undefined;
        if(!_name) return undefined;
        return this.__plugins.find(x => x.name == _name);
    }

    add(plugin: IPlugin){
        let _plugin = this.getPlugin(plugin);
        if(!_plugin) {
            this.__plugins.push(plugin);
            this.onAddPlugin.trigger(plugin);
        }
    }

    remove(plugin: IPlugin){
        let _plugin = this.getPlugin(plugin);
        if(!_plugin) return;
        this.__plugins = this.__plugins.filter(x => x.name != plugin.name);
        this.onRemovePlugin.trigger(plugin);
    }

    loadRoutes(): React.ReactElement<RouteProps>[] {
        let _routes: React.ReactElement<RouteProps>[] = [];
        this.__plugins.forEach(x => {
            if(x.loadRoutes){
                _routes = [
                    ..._routes,
                    ...x.loadRoutes()
                ];
            }
        });
        return _routes;
    }

}

export default PluginManager.GetInstance();