

export class User {
    id: string;
    nick: string;
    name: string;
    lastname: string;
    mail: string;

    constructor(uid: string, nick: string, name: string, lastname: string, mail: string) {
        this.id = uid;
        this.nick = nick;
        this.name = name;
        this.lastname = lastname;
        this.mail = mail;
      }
}
