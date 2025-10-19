
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {Put,Delete} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateChallengeDto } from 'src/application/challenges/dto/create-challenge.dto';
import { toChallengeDto } from 'src/application/challenges/dto/to-challenge.dto';
import { UpdateChallengeDto } from 'src/application/challenges/dto/update-challenge.dto';
import { CreateChallengeUseCase } from "src/application/challenges/usecases/create-challenge.usecase";
import { DeleteChallengeUseCase } from "src/application/challenges/usecases/delete-challenge.usecase";
import { GetChallengeUseCase } from "src/application/challenges/usecases/get-challenge.usecase";
import { ListChallengeUseCase } from "src/application/challenges/usecases/list-challenge.usecase";
import { UpdateChallengeUsecase } from 'src/application/challenges/usecases/update.challenge.usecase';

@ApiTags('challenges')
@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly createChallenge: CreateChallengeUseCase,
    private readonly getChallenge: GetChallengeUseCase,
    private readonly listChallenges: ListChallengeUseCase,
    private readonly updateChallenge: UpdateChallengeUsecase,
    private readonly deleteChallenge: DeleteChallengeUseCase
  ) {}

  @Post()
  async create(@Body() body: CreateChallengeDto) {
    const challenge = await this.createChallenge.execute(body);
    return toChallengeDto(challenge);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const challenge = await this.getChallenge.execute(id);
    if (!challenge) return { message: 'Challenge not found' };
    return toChallengeDto(challenge);
  }

  @Get()
  async list() {
    const challenges = await this.listChallenges.execute();
    return challenges.map(toChallengeDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateChallengeDto) {
    const challenge = await this.updateChallenge.execute(id, body);
    if (!challenge) return { message: 'Challenge not found' };
    return toChallengeDto(challenge);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.deleteChallenge.execute(id);
    return { success: deleted, message: deleted ? 'Deleted' : 'Not found' };
  }
}