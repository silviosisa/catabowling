type Score = { totalScore: number, frameIndex: number };

class BowlingGame {
    private rolls: number[] = []
    private readonly maxScorePerFrame = 10;

    roll(pins: number): void {
        this.rolls.push(pins)
    }
    calculatedTotalScore(){
        const score = this.frames().reduce(this.calculateScorePerFrame, {totalScore: 0, frameIndex: 0});
        return score.totalScore
    }

    private calculateScorePerFrame = ({totalScore, frameIndex}: Score) => {
        if(this.isSpare(frameIndex)){
            return {
                totalScore: totalScore + this.maxScorePerFrame + this.spareBonus(frameIndex),
                frameIndex: frameIndex + 2
            }
        }
        
            return {
                totalScore: totalScore + this.rolls[frameIndex] + this.rolls[frameIndex + 1],
                frameIndex: frameIndex + 2,
            }
    };

    private spareBonus(frameIndex: number) {
        return this.rolls[frameIndex + 2];
    }

    private isSpare(frameIndex: number) {
        return this.rolls[frameIndex] + this.rolls[frameIndex + 1] == this.maxScorePerFrame;
    }

    frames() {
        const numberOfFrames = 10;
        return Array.from({ length: numberOfFrames }).map((_, i) => i);
    }
}
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
        game.roll(5)
        rollMany(17, 0);
        expect(game.calculatedTotalScore()).toBe(20);
    })

    function rollMany(times: number, pins: number) {
        Array.from({length: times}).forEach(_ => game.roll(pins))
    }
});