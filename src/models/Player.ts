export class Player{

	name:string;
	sign:string;

	constructor(Name:string, Sign:string)
	{
		this.name = Name;
		this.sign = Sign;
	}

	setPlayerName(Name:string)
	{
		this.name = Name;
	}

}