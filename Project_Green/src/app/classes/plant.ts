export class Plant {
    //basics
    id: string;
    name: string;
    desc: string;
    //map
    lat: number;
    lng: number;
    //ids
    user_id: string;
    parent_plant_id: string;

    constructor(pid: string, name: string, desc: string, lat: number, lng: number, uid: string, ppid) {
        //basics
        this.id = pid;
        this.name = name;
        this.desc = desc;
        //map
        this.lat = lat;
        this.lng = lng;
        //ids
        this.user_id = uid;
        this.parent_plant_id = ppid;
    }

}
