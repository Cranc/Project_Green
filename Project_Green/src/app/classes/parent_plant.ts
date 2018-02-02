export class Parent_Plant {
    //basics
    id: string;
    name: string;
    desc: string;
    //ids
    blossom_color_id: number[];
    blossom_shape_id: number[];
    fruit_color_id: number[];
    inflorescence_id: number[];
    leaf_blade_id: number[];
    leaf_edge_id: number[];
    leaf_nerves_id: number[];
    leaf_presentation_id: number[];
    leaf_shape_id: number[];
    location_id: number[];
    plant_blossoms_id: number[];
    plant_flowering_time_id: number[];
    plant_size_id: number[];
    plant_type_id: number[];

    constructor(
        name: string,
        desc: string,
        plant_type_id:              number[],
        blossom_color_id:           number[],
        plant_size_id:              number[],
        plant_flowering_time_id:    number[],
        plant_blossoms_id:          number[],
        location_id:                number[],
        leaf_nerves_id:             number[],
        leaf_blade_id:              number[],
        leaf_presentation_id:       number[],
        leaf_edge_id:               number[],
        blossom_shape_id:           number[],
        leaf_shape_id:              number[],
        fruit_color_id:             number[],
        inflorescence_id:           number[],
    )
        {
        //basics
        this.name = name;
        this.desc = desc;
        //ids
        this.blossom_color_id           = blossom_color_id;
        this.blossom_shape_id           = blossom_shape_id;
        this.fruit_color_id             = fruit_color_id;
        this.inflorescence_id           = inflorescence_id;
        this.leaf_blade_id              = leaf_blade_id;
        this.leaf_edge_id               = leaf_edge_id;
        this.leaf_nerves_id             = leaf_nerves_id;
        this.leaf_presentation_id       = leaf_presentation_id;
        this.leaf_shape_id              = leaf_shape_id;
        this.location_id                = location_id;
        this.plant_blossoms_id          = plant_blossoms_id;
        this.plant_flowering_time_id    = plant_flowering_time_id;
        this.plant_size_id              = plant_size_id;
        this.plant_type_id              = plant_type_id;
    }
}
