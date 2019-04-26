import * as Flat from "flat"
import * as Redis from "redis"
import config from "@config/*";

let _RedisClient = Redis.createClient(config.cache.port, config.cache.host);

const set = (key: string, value: { [key:string]: any }, expireInSeconds: number = undefined) => {

    if(value == null || value == undefined){
        _RedisClient.del(key);
    } else {
        let _objToStock: {[key:string]:string | number} = Flat(value);
        _RedisClient.hmset(key, _objToStock);
        if(expireInSeconds) _RedisClient.expire(key, expireInSeconds);
    }
}

const get = <T = any>(key: string): Promise<T> => {
    return new Promise((resolve, reject) => {
        _RedisClient.hgetall(key, (err, obj) => {
            if(err) reject(err);
            else resolve(Flat.unflatten(obj as any))
        })
    });
}

export const Cache = {
    set, get
}