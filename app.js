#! /usr/bin/env node
import * as readline from "readline";
import chalk from "chalk";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Introduction Message
console.log(chalk.yellow.bold("\nWelcome to the Text-Based Adventure Game!\n"));
console.log(chalk.yellow("You are on a quest to defeat the mighty dragon as a brave warrior."));
console.log(chalk.yellow("You must battle through its minions and ultimately confront the dragon to save the kingdom."));
class Player {
    name;
    health;
    energy;
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.energy = 100;
    }
    getName() {
        return this.name;
    }
    getHealth() {
        return this.health;
    }
    getEnergy() {
        return this.energy;
    }
    decreaseHealth(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            console.log(chalk.red(`${this.name} has been defeated! Game Over.`));
            rl.close();
        }
        else {
            console.log(chalk.yellow(`${this.name} has ${this.health} health remaining.`));
        }
    }
    decreaseEnergy(amount) {
        this.energy -= amount;
        if (this.energy <= 0) {
            console.log(chalk.red(`${this.name} has run out of energy! Game Over.`));
            rl.close();
        }
        else {
            console.log(chalk.yellow(`${this.name} has ${this.energy} energy remaining.`));
        }
    }
}
// Adding Player Input Validation
function validateInput(input) {
    if (input.trim().toLowerCase() === "attack") {
        return true;
    }
    else {
        console.log(chalk.red("Invalid input! Please enter 'attack' to proceed."));
        return false;
    }
}
class Monster {
    name;
    health;
    constructor(name) {
        this.name = name;
        this.health = 50;
    }
    getName() {
        return this.name;
    }
    getHealth() {
        return this.health;
    }
    attack(player) {
        const damage = Math.floor(Math.random() * 10) + 1;
        console.log(chalk.yellow(`${this.name} Attacks ${player.getName()} for ${damage} damage.`));
        player.decreaseHealth(damage);
    }
}
// Adding New Monster Types
class Goblin extends Monster {
    constructor(name) {
        super(name);
        this.health = 30;
    }
}
class Troll extends Monster {
    constructor(name) {
        super(name);
        this.health = 60;
    }
}
class Skeleton extends Monster {
    constructor(name) {
        super(name);
        this.health = 40;
    }
}
const player = new Player("Brave Warrior");
const monster = new Monster("Dragon");
console.log(chalk.green(`A wild ${monster.getName()} appears!`));
// Adding Player Options
function defend(player) {
    // Implement defend logic here
}
function flee(player) {
    // Implement flee logic here
}
function specialAttack(player, monster) {
    // Implement special attack logic here
}
function battle() {
    rl.question(chalk.blue("Press enter to attack: "), () => {
        const playerAttack = Math.floor(Math.random() * 20) + 1;
        const energyConsumption = Math.floor(Math.random() * 10) + 1;
        player.decreaseEnergy(energyConsumption);
        console.log(chalk.yellow(`${player.getName()} attacks ${monster.getName()} for ${playerAttack} damage.`));
        monster.attack(player);
        if (player.getHealth() > 0 && player.getEnergy() > 0) {
            console.log(chalk.yellow(`================================`));
            console.log(chalk.yellow(`Next Round:`));
            console.log(chalk.yellow(`Player's Health: ${player.getHealth()}`));
            console.log(chalk.yellow(`Player's Energy: ${player.getEnergy()}`));
            console.log(chalk.yellow(`Monster's Health: ${monster.getHealth()}`));
            console.log(chalk.yellow(`================================`));
            battle();
        }
        else {
            // Game Over Message
            console.log(chalk.red("Game Over! Thank you for playing!"));
            rl.question(chalk.blue("Would you like to play again? (yes/no): "), (answer) => {
                if (answer.toLowerCase() === "yes") {
                    // Reset game or start new game
                }
                else {
                    rl.close();
                }
            });
        }
    });
}
battle();
