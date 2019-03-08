export function toObjectType<T>(Type: new (...args: any[]) => T, object: any) : T {
    let _newClass: any = new Type();
    let _obj = object;

    if(_obj["toJSON"]) _obj = _obj["toJSON"]();
    for(let key in _obj){
        _newClass[key] = _obj[key];
    }

    return _newClass;
	return Object.assign(new Type(), object);
}