

export class User {
    id: number;
    nick: string;
    name: string;
    lastname: string;

    constructor(uid: number, nick: string, name: string, lastname: string) {
        this.id = uid;
        this.nick = nick;
        this.name = name;
        this.lastname = lastname;
      }
}
