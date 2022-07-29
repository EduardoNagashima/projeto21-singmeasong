import { jest } from "@jest/globals";

import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";

describe("recommendation", () => {
    it("create new", async () => {
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => { });
        const recommentation = {
            name: 'JoJo Op 5',
            youtubeLink: 'https://www.youtube.com/watch?v=lKDwS2hnQ24'
        }
        await recommendationService.insert(recommentation);
        expect(recommendationRepository.create).toBeCalled();
    })

    it('vote', async () => {
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => { });
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { return 1 });
        await recommendationService.upvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it('downvote', async () => {
        jest.spyOn(recommendationRepository, "updateScore")
            .mockImplementationOnce((): any => { return { score: 5 } });
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { return 1 });
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => { });

        await recommendationService.downvote(1);

        expect(recommendationRepository.updateScore).toBeCalled();
    });


})