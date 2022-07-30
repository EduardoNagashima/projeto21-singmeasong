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

    it("create new FAIL", async () => {
        try {
            jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => { });
            const recommentation = {
                name: 'JoJo Op 5',
                youtubeLink: 'https://www.youtube.com/watch?v=lKDwS2hnQ24'
            }
            jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => { return recommentation });
            await recommendationService.insert(recommentation);
        } catch (e) {
            expect(e).toEqual({ message: "Recommendations names must be unique", type: "conflict" });
        }
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

    it('get recommendation by Id', async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { return 1 });
        const recommendation = await recommendationService.getById(1);

        expect(recommendationRepository.find).toBeCalled();
    });

    it('get recommendation by Id FAIL', async () => {
        try {
            jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => { false });
            await recommendationService.getById(1);
        } catch (e) {
            expect(e).toEqual({ type: 'not_found', message: '' })
        }
    });

    it('get all recommentation', async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => { [] });
        await recommendationService.get();
        expect(recommendationRepository.findAll).toBeCalled();
    })

    it('get all recommentation', async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => { [] });
        await recommendationService.getTop(10);
        expect(recommendationRepository.getAmountByScore).toBeCalled();
    })

})