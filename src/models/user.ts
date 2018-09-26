export class UserModel {
    public firstname: string;
    public lastname: string;
    public age: number;

    public constructor(firstname: string, lastname: string, age: number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }
}
