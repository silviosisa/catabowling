import {BowlingGame} from "../core/bowlingGame.ts";

describe('The Bowling Game', () => {
    let game = new BowlingGame();

    beforeEach(() => {
        game = new BowlingGame();
    })
    // it("should be able to create a bowling game", () => {
    //     expect(game).toBeInstanceOf(BowlingGame);
    // });
    //
    // it("should be able to roll a ball", () => {
    //     game.roll(0)
    //     expect(game.rolls).toEqual([0])
    // })

    it("calculate the score for a given gutter name", () => {
        rollMany(20, 0);
        expect(game.calculatedTotalScore()).toBe(0);
    })

    it("calculate the score for a given all one games", () => {
        rollMany(20, 1);
        expect(game.calculatedTotalScore()).toBe(20);
    })

    function rollSpare() {
        game.roll(5)
        game.roll(5)
    }

    it("calculate the score for a given spare and extra ball", () => {
        rollSpare();
        game.roll(5);
        rollMany(17, 0);
        expect(game.calculatedTotalScore()).toBe(20);
    })

    it("calculate the score for a given strike and some extra ball", () => {
        game.roll(10);
        game.roll(2);
        game.roll(3);
        rollMany(16, 0);
        expect(game.calculatedTotalScore()).toBe(20);
    })

    it("calculates the score for a given perfect game", () => {
        rollMany(12, 10)

        expect(game.calculatedTotalScore()).toBe(300);
    })

    it("calculates the score for a given all 5-5 spare game", () => {
        Array.from({ length: 10}).forEach(rollSpare);
        game.roll(5)
        expect(game.calculatedTotalScore()).toBe(150);
    })

    it("calculates the score for a given all 8-2 spare game", () => {
        Array.from({ length: 10}).forEach(() => {
            game.roll(8)
            game.roll(2)
        });
        game.roll(8)
        expect(game.calculatedTotalScore()).toBe(180);
    })

    function rollMany(times: number, pins: number) {
        Array.from({length: times}).forEach(_ => game.roll(pins))
    }
});