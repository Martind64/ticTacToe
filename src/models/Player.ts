export class Player{

	name:string;
	sign:string;
	score:number = 0;

	constructor(Name:string, Sign:string)
	{
		this.name = Name;
		this.sign = Sign;
	}

	setPlayerName(Name:string)
	{
		this.name = Name;
	}

	setScore(increment:number)
	{
		this.score += increment;
	}

}