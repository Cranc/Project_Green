export class Settings {
    public_plant_pagination_count : number;
    user_plant_pagination_count : number;

    constructor(public_pag_count : number = 10, user_pag_count : number = 10) {
        this.public_plant_pagination_count = public_pag_count;
        this.user_plant_pagination_count = user_pag_count;
    }
}
