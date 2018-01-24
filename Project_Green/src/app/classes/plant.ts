export class Plant {
    id: number;
    plantgroup_id: number;
    plantsubgroup_id: number;
    name: string;
    desc: string;
    lat: number;
    lng: number;

    constructor(pid: number, name: string, desc: string, plantgroup_id: number, plantsubgroup_id: number, lat: number, lng: number) {
        this.id = pid;
        this.plantgroup_id = plantgroup_id;
        this.plantsubgroup_id = plantsubgroup_id;
        this.name = name;
        this.desc = desc;
        this.lat = lat;
        this.lng = lng;
    }
}
