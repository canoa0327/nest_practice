import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
  // Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardService, } from './board.service';
import { ApiTags, } from '@nestjs/swagger';
// import { CreateBoardDto, } from './dto/create-board.dto';
import { UpdateBoardDto, } from './dto/update-board.dto';
import { JwtAuthGuard, } from 'src/auth/jwt-auth.guard';
import { UserInfo, } from 'src/decorators/user-info.decorator';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): object {
    return this.boardService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number): object {
    return this.boardService.find(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @UserInfo() userInfo,
    @Body('contents') contents: string
  ): object {

    if (!userInfo) throw new UnauthorizedException();

    return this.boardService.create({
      userId: userInfo.id,
      contents: contents,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number, 
    @Body(new ValidationPipe()) data: UpdateBoardDto

  ): object {
    return this.boardService.update(userInfo.id, id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number
  ): object {
    return this.boardService.delete(userInfo.id, Number(id));
  }
}
